import { useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastPanel from "../components/ForecastPanel";
import SkeletonCard from "../components/SkeletonCard";
import UnitToggle from "../components/UnitToggle";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherService";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [units, setUnits] = useState("metric");
  const [lastCity, setLastCity] = useState("");

  const search = useCallback(
    async (city, overrideUnits) => {
      const activeUnits = overrideUnits ?? units;
      setLoading(true);
      setError("");

      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchCurrentWeather(city, activeUnits),
          fetchForecast(city, activeUnits),
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
        // Bug #5 fix: only remember city on success
        setLastCity(city);
      } catch (err) {
        const msg =
          err.response?.data?.message || "Something went wrong. Please try again.";
        setError(msg);
        setWeather(null);
        setForecast(null);
        // Bug #5 fix: clear lastCity so unit toggle doesn't retry a failed city
        setLastCity("");
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
    if (lastCity) search(lastCity, newUnit);
  };

  return (
    <main className="min-h-screen bg-mesh flex flex-col items-center px-4 py-10 sm:py-16">
      {/* Header — relative + high z-index so dropdown floats above everything */}
      <header className="w-full max-w-2xl mb-8 animate-fade-in" style={{ position: 'relative', zIndex: 100 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gradient">
              SkyTemp
            </h1>
            <p className="text-white/40 text-sm mt-0.5 font-medium">
              Real-time weather worldwide
            </p>
          </div>
          <UnitToggle units={units} onChange={handleUnitChange} />
        </div>
        <SearchBar onSearch={search} loading={loading} />
      </header>

      {/* Content — lower z-index so search dropdown overlaps it */}
      <section className="w-full max-w-2xl space-y-2" style={{ position: 'relative', zIndex: 1 }}>
        {/* Error State */}
        {error && !loading && (
          <div className="animate-slide-up glass rounded-lg p-6 text-center">
            <div className="text-5xl mb-3">😞</div>
            <p className="text-red-400 font-semibold text-lg">{error}</p>
            <p className="text-white/40 text-sm mt-1">
              Try checking the city name spelling.
            </p>
            {/* Bug #12 fix: show popular city shortcuts so user can quickly try a valid city */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {["Mumbai", "London", "New York", "Tokyo", "Dubai"].map((c) => (
                <button
                  key={c}
                  onClick={() => search(c)}
                  className="px-4 py-2 rounded-md glass text-sm font-medium text-white/60
                             hover:text-white hover:bg-white/10 transition-all duration-200
                             hover:scale-105 active:scale-95"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && <SkeletonCard />}

        {/* Weather Results */}
        {!loading && weather && (
          <>
            <CurrentWeather data={weather} units={units} />
            {forecast && <ForecastPanel data={forecast} units={units} />}
          </>
        )}

        {/* Empty State */}
        {!loading && !weather && !error && (
          <div className="animate-fade-in text-center py-20">
            <div className="text-8xl mb-4 animate-pulse-slow">🌍</div>
            <h2 className="text-2xl font-bold text-white/70 mb-2">
              Discover the Weather
            </h2>
            <p className="text-white/30 text-base max-w-sm mx-auto">
              Search for any city to see live weather conditions and a 5-day
              forecast.
            </p>
            {/* Popular cities */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Mumbai", "London", "New York", "Tokyo", "Dubai"].map((c) => (
                <button
                  key={c}
                  onClick={() => search(c)}
                  className="px-4 py-2 rounded-md glass text-sm font-medium text-white/60
                             hover:text-white hover:bg-white/10 transition-all duration-200
                             hover:scale-105 active:scale-95"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-12 text-white/20 text-xs text-center">
        Powered by OpenWeatherMap API
      </footer>
    </main>
  );
};

export default WeatherPage;
