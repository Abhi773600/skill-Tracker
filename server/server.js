require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const skillRoutes = require("./routes/skillRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});