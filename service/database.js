const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password, profilePicture) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
      score: 0,
      image: profilePicture,
      friends: [],
    };
    await userCollection.insertOne(user);
  
    return user;
  }

  async function addScore(score) {
    return userCollection.insertOne(score);
  }

  function getImage(image) {
    return userCollection.findOne({ image: image });
  }

  async function getFriendsArray(user) {
    const userData = await userCollection.findOne({ email: user });
  
    // If user not found or friends array is not defined, return an empty array
    return userData?.friends || [];
}

  function updateFriendsArray(user, friends) {
    userCollection.findOneAndUpdate({email: user}, { $set: {friends: friends}});
  }

  module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addScore,
    getImage,
    getFriendsArray,
    updateFriendsArray,
  };