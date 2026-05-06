const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   CORS CONFIG (FIXED)
========================= */
const corsOptions = {
  origin: [
    "https://blog-in8pqmq20-ertagooos-projects.vercel.app",
    "https://blog-api-two-sigma.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

/* =========================
   MIDDLEWARE (ORDER IS IMPORTANT)
========================= */
app.use(cors(corsOptions));

// IMPORTANT: FIX for Render + Node 24 (NO "*")
app.options(/.*/, cors(corsOptions));

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});