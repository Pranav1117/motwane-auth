const express = require("express");
const { connectToDB } = require("./config/db");
const router = require("./router/authRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to home page");
});
app.use("/api/v1/", router);
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
