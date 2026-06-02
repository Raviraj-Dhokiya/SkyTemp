const express = require("express");
const router = express.Router();
const { getWeather, getForecast } = require("../controllers/weatherController");

// Current weather by city name
router.get("/current/:city", getWeather);

// 5-day forecast by city name
router.get("/forecast/:city", getForecast);

module.exports = router;