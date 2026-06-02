const dotenv = require("dotenv");
dotenv.config(); // ⚠️ Must be FIRST — before any other requires that read process.env

const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

// Middleware
app.use(cors({
  // Bug #8 fix: restrict to known origin; set ALLOWED_ORIGIN in .env for production
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  methods: ["GET"],
}));
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

// Health check — also confirms API key is loaded
app.get("/health", (req, res) => {
  const keyLoaded = !!process.env.OPENWEATHER_API_KEY;
  res.json({ status: "ok", apiKeyLoaded: keyLoaded });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key || key === "your_openweather_api_key_here") {
    console.error("❌  ERROR: OPENWEATHER_API_KEY is not set in server/.env !");
  } else {
    console.log(`✅  API Key loaded `);
  }
  console.log(`🌤️ server running on http://localhost:${PORT}`);
});