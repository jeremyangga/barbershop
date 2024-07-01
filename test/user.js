// user.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "List of users" });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.status(200).json({ message: `User with ID ${userId}` });
});

router.post("/", (req, res) => {
  const { username } = req.body;
  res.status(201).json({ message: `User ${username} created successfully` });
});

module.exports = router;
