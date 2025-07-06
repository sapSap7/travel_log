const express = require("express");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("photo"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Upload failed" });
  }
  res.json({ url: req.file.path });
});

module.exports = router;
