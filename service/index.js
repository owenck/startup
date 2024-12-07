const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

let users = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/friends/list', async (req, res) => {
    let friends = await DB.getFriendsArray(req.body.userName);
    res.send(friends);
  });

apiRouter.post('/friends', async (req, res) => {
    const friend = req.body.name; 
    const user = req.body.userName;

    
    let friends = await DB.getFriendsArray(user);
    console.log(friends);

    if (!friends.includes(friend)) {
      friends.push(friend);
      await DB.updateFriendsArray(user, friends);
    }
    
    console.log('Friend added:', friend);
    res.status(201).json({
        message: 'Friend added successfully',
        friend: friend,
        allFriends: friends,
    });

});

// API endpoint to increase the score of a user
app.post('/api/friends/increaseScore', async (req, res) => {
  const { email, userName } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Increment the score for the specified user
    DB.updateScore(email);
    DB.updateUserTagState(userName);

    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


});

// API endpoint to retrieve friends' data in bulk
app.post('/api/friends/bulk', async (req, res) => {
  const { friendUsernames } = req.body;

  if (!friendUsernames || !Array.isArray(friendUsernames) || friendUsernames.length === 0) {
    return res.status(400).json({ error: 'Invalid input: friendUsernames must be a non-empty array' });
  }

  try {
    // Call the database function to get bulk friend data
    const result = await DB.getBulkData(friendUsernames);
    res.status(200).json(result);
    console.log("bulkData result: ", result);
  } catch (error) {
    console.error('Error fetching friends data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  apiRouter.post('/users', async (req, res) => {
    try {
        console.log("entered getUsersData Endpoint");

        const user = await DB.getUser(req.body.email);
        
        if (!user) {
            // Send a proper JSON response even if no user is found
            return res.status(404).json({ error: 'User not found' });
        }

        // Send user data as JSON
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        // Send an error response in JSON format
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password, req.body.profilePicture);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

  peerProxy(httpService);