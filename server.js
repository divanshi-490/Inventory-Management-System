const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ added
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes (API)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// ✅ FIX: Handle frontend routes (NO MORE "Cannot GET")
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products.html"));
});

app.get("/reports", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reports.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "settings.html"));
});(server.js)
