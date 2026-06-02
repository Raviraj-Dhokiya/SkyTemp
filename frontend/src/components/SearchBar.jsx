import { useState, useRef } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

// Comprehensive list of cities worldwide with region labels
const CITIES = [
  // India - Major & Tier 2 Cities
  ...[
    "Agartala", "Agra", "Ahmedabad", "Ahmednagar", "Aizawl", "Ajmer", "Akola",
    "Aligarh", "Allahabad", "Alwar", "Ambala", "Ambattur", "Amravati", "Amritsar",
    "Anand", "Anantapur", "Ananthnag", "Arrah", "Asansol", "Aurangabad",
    "Bahraich", "Ballari", "Barabanki", "Bareilly", "Bathinda", "Belgaum",
    "Bellary", "Bengaluru", "Berhampur", "Bettiah", "Bhagalpur", "Bharatpur",
    "Bhavnagar", "Bhilai", "Bhilwara", "Bhiwandi", "Bhiwani", "Bhopal",
    "Bhubaneswar", "Bidar", "Bihar Sharif", "Bikaner", "Bilaspur", "Bokaro",
    "Bongaigaon", "Brahmapur", "Bulandshahr",
    "Chandigarh", "Chennai", "Chittoor", "Coimbatore", "Cuttack",
    "Daman", "Darjeeling", "Davangere", "Dehradun", "Delhi", "Dhanbad",
    "Dharwad", "Dibrugarh", "Durgapur",
    "Eluru", "Erode",
    "Faridabad", "Farrukhabad", "Fatehpur", "Firozabad",
    "Gandhinagar", "Gangtok", "Ghaziabad", "Ghazipur", "Gorakhpur",
    "Gulbarga", "Guntur", "Gurgaon", "Gurugram", "Guwahati", "Gwalior",
    "Haldia", "Hapur", "Haridwar", "Hassan", "Hisar", "Hosur", "Howrah", "Hubli", "Hyderabad",
    "Ichalkaranji", "Imphal", "Indore", "Itanagar",
    "Jabalpur", "Jaipur", "Jalandhar", "Jalgaon", "Jammu", "Jamnagar",
    "Jamshedpur", "Jhansi", "Jodhpur", "Junagadh",
    "Kakinada", "Kalyan", "Kannur", "Kanpur", "Karimnagar", "Karnal",
    "Katni", "Kharagpur", "Khora", "Kochi", "Kohima", "Kolhapur", "Kolkata",
    "Kollam", "Korba", "Kota", "Kozhikode", "Kurnool",
    "Latur", "Loni", "Lucknow", "Ludhiana",
    "Madurai", "Maheshtala", "Malegaon", "Mangalore", "Mathura", "Meerut",
    "Mirzapur", "Moradabad", "Mira-Bhayandar", "Muzaffarnagar", "Muzaffarpur",
    "Mumbai", "Mysore",
    "Nagpur", "Nanded", "Nashik", "Navi Mumbai", "Nellore", "New Delhi", "Noida",
    "Panipat", "Panjim", "Panvel", "Patna", "Pimpri", "Pondicherry",
    "Pune", "Purnia",
    "Raipur", "Rajkot", "Rajahmundry", "Rajpur Sonarpur", "Rampur", "Ranchi",
    "Raurkela", "Rohtak", "Rourkela",
    "Sagar", "Saharanpur", "Salem", "Sangli", "Satna", "Shahjahanpur",
    "Shimla", "Shillong", "Sikar", "Siliguri", "Silvassa", "Solapur",
    "Sonipat", "Srinagar", "Surat",
    "Thane", "Thiruvananthapuram", "Thrissur", "Tirunelveli", "Tirupati",
    "Tiruppur", "Tiruchirappalli", "Tiruvottiyur",
    "Udaipur", "Ujjain", "Ulhasnagar",
    "Vadodara", "Varanasi", "Vasai-Virar", "Vellore", "Vijayawada", "Visakhapatnam",
    "Warangal", "Yamunanagar",
  ].map((name) => ({ name, region: "India" })),

  // International - Asia
  ...[
    "Abu Dhabi", "Bangkok", "Beijing", "Colombo", "Dhaka", "Doha",
    "Dubai", "Hong Kong", "Istanbul", "Jakarta", "Karachi", "Kathmandu",
    "Kuala Lumpur", "Kuwait City", "Lahore", "Manila", "Muscat",
    "Riyadh", "Seoul", "Shanghai", "Singapore", "Taipei", "Tehran",
    "Tokyo", "Ulaanbaatar",
  ].map((name) => ({ name, region: "Asia" })),

  // International - Europe
  ...[
    "Amsterdam", "Athens", "Barcelona", "Berlin", "Brussels", "Budapest",
    "Copenhagen", "Dublin", "Edinburgh", "Florence", "Frankfurt", "Geneva",
    "Hamburg", "Helsinki", "Kiev", "Lisbon", "London", "Luxembourg",
    "Madrid", "Milan", "Moscow", "Munich", "Oslo", "Paris",
    "Prague", "Rome", "Stockholm", "Vienna", "Warsaw", "Zurich",
  ].map((name) => ({ name, region: "Europe" })),

  // International - Americas
  ...[
    "Atlanta", "Austin", "Bogota", "Boston", "Buenos Aires", "Calgary",
    "Chicago", "Dallas", "Denver", "Houston", "Las Vegas", "Lima",
    "Los Angeles", "Mexico City", "Miami", "Montreal", "New York",
    "Phoenix", "Sao Paulo", "Seattle", "San Francisco", "Santiago",
    "Toronto", "Vancouver", "Washington DC",
  ].map((name) => ({ name, region: "Americas" })),

  // International - Africa & Oceania
  ...[
    "Accra", "Addis Ababa", "Auckland", "Cairo", "Cape Town", "Casablanca",
    "Johannesburg", "Lagos", "Melbourne", "Nairobi", "Perth", "Sydney",
  ].map((name) => ({ name, region: "Africa & Oceania" })),
];

const SearchBar = ({ onSearch, loading }) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Filter cities based on input (match anywhere in name, not just start)
  const filtered = input.length > 0
    ? CITIES.filter((c) =>
        c.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestion = (cityName) => {
    setInput(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ zIndex: 50 }}>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg pointer-events-none" />
          <input
            ref={inputRef}
            id="city-search"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowSuggestions(false);
                inputRef.current?.blur();
              }
            }}
            placeholder="Search any city worldwide... (e.g. Mumbai, London, Tokyo)"
            autoComplete="off"
            className="w-full pl-12 pr-4 py-4 rounded-md glass text-white placeholder-white/30
                       focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60
                       transition-all duration-300 text-base font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-4 rounded-md bg-gradient-to-r from-blue-500 to-violet-600
                     hover:from-blue-400 hover:to-violet-500 disabled:opacity-40
                     font-semibold text-white transition-all duration-300
                     hover:scale-105 active:scale-95 disabled:scale-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500/60 whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              <span className="hidden sm:inline">Searching</span>
            </span>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <ul
          className="absolute top-full left-0 right-16 mt-2 rounded-md overflow-hidden shadow-2xl animate-fade-in"
          style={{
            background: "rgba(15, 23, 42, 0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            zIndex: 9999,
          }}
        >
          {filtered.map((city) => (
            <li key={city.name}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // prevent blur from firing first
                  handleSuggestion(city.name);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 text-left
                           hover:bg-white/10 transition-colors duration-150 text-sm font-medium text-white"
              >
                <FiMapPin className="text-blue-400 shrink-0" />
                <span>{city.name}</span>
                <span className="ml-auto text-white/30 text-xs">{city.region}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
