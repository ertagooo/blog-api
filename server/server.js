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
   CORS CONFIG (PRODUCTION SAFE)
========================= */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    /\.vercel\.app$/ // ✅ allows ALL Vercel deployments (fixes your issue)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

/* =========================
   MIDDLEWARE (ORDER IMPORTANT)
========================= */
app.use(cors(corsOptions));

// ✅ Proper preflight handling (NO "*", avoids Render crash)
app.options("*", cors(corsOptions));

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
   ERROR HANDLER (HELPFUL FOR DEBUGGING)
========================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Server Error" });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});