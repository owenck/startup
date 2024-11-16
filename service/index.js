const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let friends = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/friends', (_req, res) => {
    res.send(friends);
  });

apiRouter.post('/friends', (req, res) => {
    scores = updateFriends(req.body, Friends);
    res.send(friends);
});

apiRouter.get('/users', (_req, res) => {
    res.send(users);
  });

apiRouter.post('/users', (req, res) => {
    scores = updateUsers(req.body, users);
    res.send(users);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });