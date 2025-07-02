const express = require("express");
const router = express.Router();
const Entry = require("./Entry");

router.post("/", async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
