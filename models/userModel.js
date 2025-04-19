const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const { ERROR } = require("../constants");

const findUserByEmail = async (email) => {
  const db = await getDB();
  return db.collection("users").findOne({ email });
};

const createUser = async ({ name, email, password }) => {
  const db = await getDB();
  const result = await db
    .collection("users")
    .insertOne({ name, email, password });
  return result;
};

const findUserById = async (userId) => {
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: ERROR.INVALID_USERID });
  }
  const db = await getDB();

  return db.collection("users").findOne({ _id: new ObjectId(userId) });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
