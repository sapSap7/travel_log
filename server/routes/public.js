const express = require("express");
const router = express.Router();
const Entry = require("../models/JournalEntry");

router.get("/all", async (req, res) => {
  try {
    const entries = await Entry.find()
      .populate("user", "username")
      .populate("comments.user", "username")
      .sort({ date: -1 }); // סדר מהחדש לישן
    res.json(entries);
  } catch (error) {
    console.error("Error loading logs", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
