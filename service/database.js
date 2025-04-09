const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const apiURL = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(apiURL);
const db = client.db("movie-pick-cluster");
const userCollection = db.collection("users");

// Asynchronous function to test the connection
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return await userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  console.log("Getting user by token:", token); // Log the token being searched for
  const user = await userCollection.findOne({ token: token });
  console.log("User found:", user); // Log the user found by token
  return user; // Return the user object
}

async function addUser(userData) {
  const result = await userCollection.insertOne(userData);
  console.log("User added:", result); // Log the added user
  return { ...userData, _id: result.insertedId }; // Return the created user
}

async function updateUser(user) {
  delete user._id; // Remove the _id field from the user object
  const result = await userCollection.updateOne(
    { email: user.email },
    { $set: user }
  );
  console.log("Update result:", result); // Log the result of the update operation
  return result.modifiedCount > 0 ? user : null; // Return true if the user was updated
}

async function getAllUsers() {
  const cursor = userCollection.find({});
  return await cursor.toArray(); // Return all users
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getAllUsers,
};
