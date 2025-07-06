const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: String,
  title: String,
  date: Date,
  description: String,
  photoUrl: String,
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
