import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
  if (!weatherData || !weatherData.main) {
    return <p>Loading chart data...</p>;
  }
  const data = {
    labels: ['Temp', 'Humidity', 'Wind Speed', 'Pressure'], 
    datasets: [
      {
        label: 'Weather Stats',
        data: [
          weatherData.main.temp,
          weatherData.main.humidity,
          weatherData.wind.speed,
          weatherData.main.pressure
        ],
        fill: false,
        borderColor: 'rgba(0, 204, 255, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;