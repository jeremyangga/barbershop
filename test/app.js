// app.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.get("/about", (req, res) => {
  res.status(200).json({ message: "About us" });
});

app.post("/user", (req, res) => {
  res.status(201).json({ message: "User created successfully" });
});

module.exports = app;
