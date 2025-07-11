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
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid token" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid token" });
  }

});

module.exports = router;
