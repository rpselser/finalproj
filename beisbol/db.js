const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB (native driver)");
  }
  return db;
}

module.exports = { connectDB };
