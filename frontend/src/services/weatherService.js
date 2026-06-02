import axios from "axios";

// In dev: Vite proxy forwards /api → localhost:5000
// In production (Vercel): VITE_API_URL = https://your-backend.onrender.com
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/weather`
  : "/api/weather";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

/**
 * Fetch current weather for a city.
 * @param {string} city
 * @param {"metric"|"imperial"} units
 */
export const fetchCurrentWeather = async (city, units = "metric") => {
  const { data } = await api.get(`/current/${encodeURIComponent(city)}`, {
    params: { units },
  });
  return data;
};

/**
 * Fetch 5-day forecast for a city.
 * @param {string} city
 * @param {"metric"|"imperial"} units
 */
export const fetchForecast = async (city, units = "metric") => {
  const { data } = await api.get(`/forecast/${encodeURIComponent(city)}`, {
    params: { units },
  });
  return data;
};
