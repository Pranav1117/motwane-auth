const express = require("express");
const { connectToDB } = require("./config/db");
const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(3000, () => {
      console.log("server running on 3000");
    });
  } catch (error) {
    console.log("Error occured while connecting database");
  }
};

startServer();
