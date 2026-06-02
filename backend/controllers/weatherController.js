const axios = require("axios");

const BASE_URL = "https://api.openweathermap.org/data/2.5";


// GET /api/weather/:city — current weather
const getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const { units = "metric" } = req.query;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units },
    });

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const owmMsg = error.response?.data?.message || error.message;
    console.error(`[Weather] Error for city: ${req.params.city} | Status: ${status} | OWM: ${owmMsg}`);
    const message =
      status === 404
        ? "City not found. Please check the city name."
        : `Error fetching weather data: ${owmMsg}`;

    res.status(status).json({ message });
  }
};

// GET /api/weather/forecast/:city — 5-day / 3-hour forecast
const getForecast = async (req, res) => {
  try {
    const { city } = req.params;
    const { units = "metric" } = req.query;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units },
    });

    // Group by day — aggregate true daily min/max, use noon slot for condition/icon
    const list = response.data.list;
    const grouped = {};
    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const hour = item.dt_txt.split(" ")[1];

      if (!grouped[date]) {
        // First slot for this day — initialise with its actual temp as min/max seed
        grouped[date] = {
          representative: item,   // best slot for weather condition (prefer noon)
          temp_min: item.main.temp,
          temp_max: item.main.temp,
        };
      }

      // Bug #6+7 fix: track true daily min/max across every 3-hour slot
      grouped[date].temp_min = Math.min(grouped[date].temp_min, item.main.temp);
      grouped[date].temp_max = Math.max(grouped[date].temp_max, item.main.temp);

      // Prefer the noon slot as the representative for condition/icon
      if (hour === "12:00:00") {
        grouped[date].representative = item;
      }
    });

    const dailyForecast = Object.values(grouped).slice(0, 5).map(({ representative, temp_min, temp_max }) => ({
      ...representative,
      main: {
        ...representative.main,
        temp_min: Math.round(temp_min * 10) / 10,
        temp_max: Math.round(temp_max * 10) / 10,
      },
    }));
    res.json({ city: response.data.city, forecast: dailyForecast });
  } catch (error) {
    const status = error.response?.status || 500;
    const owmMsg = error.response?.data?.message || error.message;
    console.error(`[Forecast] Error for city: ${req.params.city} | Status: ${status} | OWM: ${owmMsg}`);
    const message =
      status === 404
        ? "City not found. Please check the city name."
        : `Error fetching forecast data: ${owmMsg}`;

    res.status(status).json({ message });
  }
};

module.exports = { getWeather, getForecast };