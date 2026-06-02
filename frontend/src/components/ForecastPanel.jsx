import { getWeatherMeta, formatDate } from "../utils/weatherUtils";

const ForecastDay = ({ item, units, timezone }) => {
  const { icon, gradient } = getWeatherMeta(item.weather[0].id, item.weather[0].description);
  const tempUnit = units === "metric" ? "°C" : "°F";
  const dateLabel = formatDate(item.dt, timezone);

  return (
    <div
      className={`glass rounded-md p-3 sm:p-4 flex flex-col items-center gap-2
                  hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default
                  bg-gradient-to-b ${gradient} bg-opacity-10`}
    >
      <span className="text-xs font-semibold text-white/60 text-center leading-tight">
        {dateLabel}
      </span>
      <span className="text-3xl sm:text-4xl">{icon}</span>
      <div className="text-center">
        <div className="font-bold text-base">
          {Math.round(item.main.temp_max)}{tempUnit}
        </div>
        <div className="text-white/40 text-xs">
          {Math.round(item.main.temp_min)}{tempUnit}
        </div>
      </div>
      <p className="text-xs text-white/50 capitalize text-center leading-tight hidden sm:block">
        {item.weather[0].description}
      </p>
    </div>
  );
};

const ForecastPanel = ({ data, units }) => {
  const timezone = data.city?.timezone ?? 0;

  return (
    <div className="animate-slide-up mt-4">
      <h3 className="text-white/50 uppercase text-xs font-bold tracking-widest mb-3 px-1">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {data.forecast.map((item) => (
          <ForecastDay
            key={item.dt}
            item={item}
            units={units}
            timezone={timezone}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastPanel;
