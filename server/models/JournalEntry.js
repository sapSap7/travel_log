const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const journalEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: String,
  title: String,
  date: Date,
  description: String,
  photoUrl: String,
  comments: [commentSchema],
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
