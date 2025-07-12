const express = require("express");
const authMiddleware = require("../middlewares/auth");
const Entry = require("../models/JournalEntry");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const entry = new Entry({
      ...req.body,
      user: req.user,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Failed to create entry" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Entry.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, user: req.user });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ message: "Failed to fetch entry" });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(updatedEntry);
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ message: "Failed to update entry" });
  }
});

module.exports = router;
