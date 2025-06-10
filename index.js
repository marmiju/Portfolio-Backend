require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB, client } = require("./Config/Db");
const userRoutes = require("./routes/routes");

const port = process.env.PORT || 5000;
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", userRoutes);
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
