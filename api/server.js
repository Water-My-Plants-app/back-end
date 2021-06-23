const { restrict } = require("./middleware/authUsers-middleware");

// global middleware
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// express router imports here
const authRouter = require("./routers/auth-router.js");
const usersRouter = require("./routers/users-router");
const plantsRouter = require("./routers/plants-router");

const server = express();

// in action
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

//server endpoints ---
server.use("/api/auth", authRouter);
server.use("/api/users", restrict(), usersRouter);
server.use("/api/plants", restrict(), plantsRouter);

module.exports = server;