# 🌤️ SkyTemp — Live Weather App

Real-time weather app — search any city and get current conditions + 5-day forecast.

---

## 🛠️ Technologies Used

**Frontend**
- [React 18](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — Build tool & dev server
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Axios](https://axios-http.com/) — HTTP requests
- [React Icons](https://react-icons.github.io/react-icons/) — Icons

**Backend**
- [Node.js](https://nodejs.org/) — Runtime
- [Express](https://expressjs.com/) — Web framework
- [Axios](https://axios-http.com/) — API calls to OpenWeatherMap
- [dotenv](https://www.npmjs.com/package/dotenv) — Environment variables
- [CORS](https://www.npmjs.com/package/cors) — Cross-origin support

**API**
- [OpenWeatherMap API](https://openweathermap.org/api) — Weather data

---

## 📁 Project Structure

```
SkyTemp/
│
├── backend/
│   ├── controllers/
│   │   └── weatherController.js   # Weather & forecast logic
│   ├── routes/
│   │   └── weatherRoutes.js       # API route definitions
│   ├── server.js                  # Express server entry point
│   ├── .env.example               # Env variable template
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── SearchBar.jsx       # City search with autocomplete
    │   │   ├── CurrentWeather.jsx  # Current weather card
    │   │   ├── ForecastPanel.jsx   # 5-day forecast grid
    │   │   ├── SkeletonCard.jsx    # Loading skeleton
    │   │   └── UnitToggle.jsx      # °C / °F toggle
    │   ├── pages/
    │   │   └── WeatherPage.jsx     # Main page
    │   ├── services/
    │   │   └── weatherService.js   # API calls
    │   ├── utils/
    │   │   └── weatherUtils.js     # Icons, date formatting
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Raviraj-Dhokiya/SkyTemp.git
cd SkyTemp
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your OpenWeatherMap API key inside .env
npm run dev
```
> Get a free API key at: https://openweathermap.org/api

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:5000  |

---

## ✨ Features

- 🔍 City search with autocomplete (150+ cities worldwide)
- 🌡️ Current weather — temp, feels like, humidity, wind, visibility, pressure
- 📅 5-day forecast with accurate daily min/max temperatures
- 🔄 °C / °F unit toggle (auto re-fetches data)
- ⚡ Skeleton loading animation
- 📱 Fully responsive design