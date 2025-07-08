const express = require("express");
const jwt = require("jsonwebtoken");
const JournalEntry = require("../models/JournalEntry");
const router = express.Router();

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing Token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.userId };
    next();
  } catch {
    console.error("Token verification failed:", err);
    res.status(403).json({ message: "Invalid token" });
  }
}

router.post("/", verifyToken, async (req, res) => {
  try {
    const newEntry = new JournalEntry({ ...req.body, user: req.user });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Failed to save log" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
});

module.exports = router;
