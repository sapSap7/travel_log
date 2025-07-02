const authMiddleware = require("../middlewares/auth");
const router = require("../models/entries");

router.post("/", authMiddleware, async (req, res) => {
  const entry = new Entry({
    ...req.body,
    user: req.user,
  });
  await entry.save();
  res.status(201).json(entry);
});

router.get("/", authMiddleware, async (req, res) => {
  const entries = await Entry.find({ user: req.user });
  res.json(entries);
});

module.exports = authMiddleware;
