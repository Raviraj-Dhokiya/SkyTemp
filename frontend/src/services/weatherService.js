import axios from "axios";

const api = axios.create({
  baseURL: "/api/weather",
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
