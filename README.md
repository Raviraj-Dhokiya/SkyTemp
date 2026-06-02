# 🌤️ SkyTemp — Live Weather App

Real-time weather app with current conditions and 5-day forecast for any city worldwide.

## ✨ Features

- 🔍 City search with autocomplete (150+ cities: India + International)
- 🌡️ Current weather — temp, humidity, wind, visibility, pressure
- 📅 5-day forecast with accurate daily min/max temperatures
- 🌡️ °C / °F unit toggle
- ⚡ Skeleton loading animations
- 📱 Fully responsive design

## 🛠️ Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React 18, Vite, Tailwind CSS  |
| Backend  | Node.js, Express              |
| API      | OpenWeatherMap API            |

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/SkyTemp.git
cd SkyTemp
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key
npm run dev
```

Get a free API key at: https://openweathermap.org/api

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173  
Backend runs on: http://localhost:5000

## 📁 Project Structure

```
SkyTemp/
├── backend/
│   ├── controllers/weatherController.js
│   ├── routes/weatherRoutes.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    └── index.html
```