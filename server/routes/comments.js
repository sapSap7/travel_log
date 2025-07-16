const express = require("express");
const router = express.Router();
const Entry = require("../models/JournalEntry");
const User = require("../models/User");
const authMiddleware = require("../middlewares/auth");

router.post("/id/comments", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "שדה תגובה נדרש" });
    }

    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "טיול לא נמצא" });
    }

    const user = req.user;

    const comment = {
      text,
      user,
      date: new Date(),
    };

    entry.comments.push(comment);
    await entry.save();

    const fullComment = await Entry.findById(entry._id)
      .populate("comments.user", "username")
      .then((entryWithUser) => {
        return entryWithUser.comments[entryWithUser.comments.length - 1];
      });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error("שגיאה בהוספת תגובה:", error);
    res.status(500).json({ message: "שגיאת שרת" });
  }
});

module.exports = router;
