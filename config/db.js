const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_CONNECTION_STRING;

let client;
let db;

const connectToDB = async () => {
  if (db) return;
  try {
    client = await MongoClient.connect(uri);
    db = client.db("Auth-motwane");
  } catch (error) {
    throw new Error(error);
  }
};

const getDB = () => {
  if (!db) throw new Error("database not connected");
  return db;
};

module.exports = { connectToDB, getDB };
