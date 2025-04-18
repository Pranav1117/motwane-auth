const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env;

let client;
let db;

const connectToDB = async () => {
  if (db) return;
  try {
    client = await MongoClient.connect(uri);
    db = client.db("");
  } catch (error) {
    throw new Error("Error while connection database");
  }
};

const getDB = () => {
  if (!db) throw new Error("database not connected");
  return db;
};

module.exports = { connectToDB, getDB };
