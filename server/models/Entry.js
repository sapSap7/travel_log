const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Entry", entrySchema);
