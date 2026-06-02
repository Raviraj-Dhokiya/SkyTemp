import { getWeatherMeta } from "../utils/weatherUtils";

const StatBadge = ({ label, value, icon }) => (
  <div className="glass rounded-md p-3 flex flex-col items-center gap-1 hover:bg-white/10 transition-all duration-300">
    <span className="text-xl">{icon}</span>
    <span className="text-xs text-white/50 font-medium uppercase tracking-wide">{label}</span>
    <span className="text-sm font-bold text-white">{value}</span>
  </div>
);

const CurrentWeather = ({ data, units }) => {
  const { icon, gradient } = getWeatherMeta(data.weather[0].id, data.weather[0].description);
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div
        className={`rounded-lg p-6 sm:p-8 bg-gradient-to-br ${gradient} 
                    relative overflow-hidden mb-4`}
      >
        {/* Background blur orb */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-black/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📍</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                {data.name}
                {data.sys?.country && (
                  <span className="text-white/60 text-lg ml-2">, {data.sys.country}</span>
                )}
              </h2>
            </div>
          </div>

          {/* Temp + Icon */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-7xl sm:text-8xl font-black leading-none tracking-tighter">
                {Math.round(data.main.temp)}
                <span className="text-4xl font-light text-white/70">{tempUnit}</span>
              </div>
              <p className="mt-2 text-white/80 capitalize text-lg font-medium">
                {data.weather[0].description}
              </p>
              <p className="text-white/50 text-sm mt-1">
                Feels like {Math.round(data.main.feels_like)}{tempUnit}
              </p>
            </div>
            <div className="text-7xl sm:text-8xl drop-shadow-2xl animate-pulse-slow select-none">
              {icon}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        <StatBadge icon="💧" label="Humidity" value={`${data.main.humidity}%`} />
        <StatBadge icon="🌬️" label="Wind" value={`${data.wind.speed} ${windUnit}`} />
        <StatBadge icon="👁️" label="Visibility" value={`${(data.visibility / 1000).toFixed(1)}km`} />
        <StatBadge icon="📊" label="Pressure" value={`${data.main.pressure}hPa`} />
        <StatBadge icon="🌡️" label="Min" value={`${Math.round(data.main.temp_min)}${tempUnit}`} />
        <StatBadge icon="🌡️" label="Max" value={`${Math.round(data.main.temp_max)}${tempUnit}`} />
      </div>
    </div>
  );
};

export default CurrentWeather;
