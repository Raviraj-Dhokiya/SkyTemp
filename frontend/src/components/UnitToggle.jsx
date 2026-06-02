const UnitToggle = ({ units, onChange }) => (
  <div className="flex items-center glass rounded-md p-1 gap-1">
    <button
      onClick={() => onChange("metric")}
      className={`px-3 py-1.5 rounded-sm text-sm font-semibold transition-all duration-300
                  ${units === "metric"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-white/40 hover:text-white/70"
                  }`}
    >
      °C
    </button>
    <button
      onClick={() => onChange("imperial")}
      className={`px-3 py-1.5 rounded-sm text-sm font-semibold transition-all duration-300
                  ${units === "imperial"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "text-white/40 hover:text-white/70"
                  }`}
    >
      °F
    </button>
  </div>
);

export default UnitToggle;
