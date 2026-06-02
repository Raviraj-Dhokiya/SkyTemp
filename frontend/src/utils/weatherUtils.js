/**
 * Returns a weather icon emoji and a Tailwind gradient class based on condition code.
 */
export const getWeatherMeta = (code, description = "") => {
  const desc = description.toLowerCase();

  if (code >= 200 && code < 300)
    return { icon: "⛈️", gradient: "from-slate-700 to-slate-900", label: "Thunderstorm" };
  if (code >= 300 && code < 400)
    return { icon: "🌦️", gradient: "from-slate-600 to-blue-900", label: "Drizzle" };
  if (code >= 500 && code < 600)
    return { icon: "🌧️", gradient: "from-blue-800 to-slate-900", label: "Rain" };
  if (code >= 600 && code < 700)
    return { icon: "❄️", gradient: "from-blue-200 to-blue-600", label: "Snow" };
  if (code >= 700 && code < 800)
    return { icon: "🌫️", gradient: "from-gray-500 to-gray-800", label: "Mist" };
  if (code === 800)
    return { icon: "☀️", gradient: "from-amber-400 to-orange-600", label: "Clear" };
  if (code === 801 || code === 802)
    return { icon: "⛅", gradient: "from-blue-500 to-indigo-700", label: "Partly Cloudy" };
  if (code >= 803)
    return { icon: "☁️", gradient: "from-gray-500 to-gray-700", label: "Cloudy" };

  return { icon: "🌤️", gradient: "from-blue-600 to-indigo-800", label: desc };
};

export const formatDate = (dt, timezone = 0) => {
  const date = new Date((dt + timezone) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const formatTime = (dt, timezone = 0) => {
  const date = new Date((dt + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};
