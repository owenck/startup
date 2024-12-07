const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup');
const userCollection = db.collection('user');

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
      tagState: true,
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

  async function getBulkData(friendUsernames) {
    if (!Array.isArray(friendUsernames) || friendUsernames.length === 0) {
      throw new Error('Invalid input: friendUsernames must be a non-empty array');
    }
  
    if (!userCollection) {
      throw new Error('Database not initialized');
    }
  
    try {
      // Query the database for all friends in the provided array
      const friendsData = await userCollection.find({ email: { $in: friendUsernames } }).toArray();
      // Map and return the relevant data fields
      return friendsData.map(friend => ({
        email: friend.email,
        score: friend.score,
        tagState: friend.tagState,
      }));
    } catch (error) {
      console.error('Error fetching friends data:', error);
      throw error; // Throw error to be handled by the calling function
    }
  }

  async function updateScore(email) {
    await userCollection.findOneAndUpdate(
      { email }, // Find the user by username
      { 
       $inc: { score: 1 }, // Increment the score by 1
       $set: { tagState: false } // Set tagState to false
      } 
    );
  }

  async function updateUserTagState(userName) {
    await userCollection.updateOne(
      { email: userName }, // Find the current user by email
      { $set: { tagState: true } } // Set tagState to true
    );
  }

  module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addScore,
    getImage,
    getFriendsArray,
    updateFriendsArray,
    getBulkData,
    updateScore,
    updateUserTagState,
  };