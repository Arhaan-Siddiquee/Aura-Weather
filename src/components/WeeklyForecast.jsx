import React from 'react';

const WeeklyForecast = ({ dailyData }) => {
  console.log(dailyData); // Log the data to see its structure
  if (!Array.isArray(dailyData)) {
    return <div>No data available</div>; // Handle the case where dailyData is not an array
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {dailyData.map((day, index) => (
        <div key={index} className="bg-[#3a3a3a] p-4 rounded-md shadow-md text-center">
          <h3 className="font-bold">{new Date(day.dt * 1000).toLocaleDateString()}</h3>
          <p>{day.weather[0].main}</p>
          <p>Temp: {day.temp.day} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
          />
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
