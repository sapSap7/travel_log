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
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid token" });
  }
}

router.post("/", verifyToken, async (req, res) => {
  try {
    const newEntry = new JournalEntry({ ...req.body, user: req.user.id });
    await newEntry.save();
    res.status(201).json(newEntry);
  }
  catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Error creating entry" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Error fetching entries" });
  }
});

module.exports = router;
