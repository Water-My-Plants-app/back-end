const express = require("express");
const router = express.Router();
const Users = require("../models/users-model");

const { checkUserID } = require("../middleware/authUsers-middleware");

//GET /api/users
router.get("/", (req, res, next) => {
  Users.getUsers()
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: `no users found` });
    })
    .catch((err) => {
      res.status(500).json({ message: "500 server error, can't get users" });
    });
});

//GET /api/users/:id
router.get("/:id", checkUserID(), (req, res, next) => {
  //import user from middleware-stacks
  res.status(200).json(req.user);
});

module.exports = router;