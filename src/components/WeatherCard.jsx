import React from 'react';

const WeatherCard = ({ title, value, icon, button }) => {
  return (
    <div className="bg-[#2a2a2a] rounded-md p-6 flex flex-col items-center justify-center shadow-md ">
      {icon}
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{value || '---'}</p>
      {/* Render the button passed as a prop */}
      {button && <div className="mt-4">{button}</div>}
    </div>
  );
};

export default WeatherCard;
