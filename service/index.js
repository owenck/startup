const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const app = express();
const DB = require('./database.js');

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

apiRouter.get('/friends', (_req, res) => {
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

apiRouter.get('/users', (_req, res) => {
    res.send(users);
  });

apiRouter.post('/users', (req, res) => {
    scores = updateUsers(req.body, users);
    res.send(users);
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });