import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import { BiSearch } from 'react-icons/bi';
import { WiDayCloudy, WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiFog, WiSunrise, WiSunset } from 'react-icons/wi';
import WeatherChart from './components/WeatherChart';
import WeeklyForecast from './components/WeeklyForecast'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapSection from './components/MapSection';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null); 
  const [error, setError] = useState('');
  const [isFahrenheit, setIsFahrenheit] = useState(false); 

  const apiKey = '8359b800547f79cc3fc714e8e8f91df2';

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');

      const { lat, lon } = data.coord;
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();
      setWeeklyData(forecastData.daily);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setWeeklyData(null);
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  const toggleTemperatureUnit = () => {
    setIsFahrenheit((prevUnit) => !prevUnit);
  };

  const displayTemperature = (tempInCelsius) => {
    return isFahrenheit
      ? `${convertToFahrenheit(tempInCelsius).toFixed(1)} °F`
      : `${tempInCelsius} °C`;
  };

  const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b] flex flex-col items-center p-4 text-white">
      {/* Header */}
      <header className="w-full max-w-6xl mb-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center p-3 bg-[#2a2a2a] rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-2 md:mb-0 text-[#00ccff]">🌤 Aura-Weather</h1>
          <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
            <input
              type="text"
              className="bg-transparent border border-gray-700 p-2 rounded-l-md focus:outline-none text-white w-full md:w-48"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#00ccff] bg-opacity-50 hover:bg-[#00ccff] p-3 rounded-r-lg flex items-center transition duration-300 ease-in-out"
            >
              <BiSearch size={20} className="text-white" />
            </button>
          </form>
        </div>
      </header>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
          onClick={toggleTemperatureUnit}
           className="bg-blue-500 text-white px-10 py-3 rounded mr-11 mb-5 "
          >
           Switch to {isFahrenheit ? 'Celsius' : 'Fahrenheit'}
          </button>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          
          <WeatherCard
            title="Weather Condition"
            value={weatherData ? weatherData.weather[0].main : ''}
            icon={<WiDayCloudy size={48} className="text-blue-400" />}
          />
          <div>
          <WeatherCard
            title="Temperature"
            value={weatherData ? displayTemperature(weatherData.main.temp) : ''}
            icon={<WiThermometer size={48} className="text-yellow-400" />}
          />
          
          </div>
          <WeatherCard
            title="Humidity"
            value={weatherData ? `${weatherData.main.humidity} %` : ''}
            icon={<WiHumidity size={48} className="text-green-400" />}
          />
          <WeatherCard
            title="Wind Speed"
            value={weatherData ? `${weatherData.wind.speed} m/s` : ''}
            icon={<WiStrongWind size={48} className="text-blue-500" />}
          />
          <WeatherCard
            title="Pressure"
            value={weatherData ? `${weatherData.main.pressure} hPa` : ''}
            icon={<WiBarometer size={48} className="text-purple-400" />}
          />
          <WeatherCard
            title="Visibility"
            value={weatherData ? `${weatherData.visibility / 1000} km` : ''}
            icon={<WiFog size={48} className="text-white" />}
          />
        </div>

        {/* Map Section */}
        <div>
          <MapSection weatherData={weatherData} city={city} />
        </div>

      </div>

      {/* Additional Info Section */}
      <div className="w-full max-w-6xl mt-4">
        <div className="bg-[#2a2a2a] p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-3">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <WeatherCard
              title="Pressure"
              value={weatherData ? `${weatherData.main.pressure} hPa` : ''}
              icon={<WiBarometer size={48} className="text-red-400" />}
            />
            <WeatherCard
              title="Visibility"
              value={weatherData ? `${weatherData.visibility / 1000} km` : ''}
              icon={<WiFog size={48} className="text-white" />}
            />
            <WeatherCard
              title="Sunrise"
              value={weatherData ? convertUnixToTime(weatherData.sys.sunrise) : ''}
              icon={<WiSunrise size={48} className="text-orange-400" />}
            />
            <WeatherCard
              title="Sunset"
              value={weatherData ? convertUnixToTime(weatherData.sys.sunset) : ''}
              icon={<WiSunset size={48} className="text-pink-400" />}
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full max-w-6xl mt-4">
        <div className="bg-[#2a2a2a] p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-3">Weather Data Chart</h2>
          {weatherData && <WeatherChart weatherData={weatherData} />}
        </div>
      </div>

      {/* Weekly Forecast Section */}
      <div className="w-full max-w-6xl mt-4">
        <div className="bg-[#2a2a2a] p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-3">Weekly Forecast</h2>
          {weeklyData && <WeeklyForecast dailyData={weeklyData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
