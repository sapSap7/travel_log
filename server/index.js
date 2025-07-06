const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const entryRoutes = require("./routes/entries");
app.use("/api/entries", entryRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const logsRoute = require("./routes/logs");
app.use("/api/logs", logsRoute);

const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);
