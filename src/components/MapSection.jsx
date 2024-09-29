import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapSection = ({ weatherData, city }) => {
  return (
    <>
      {weatherData && (
        <div className="w-full max-w-6xl mt-4">
          <div className="bg-[#2a2a2a] p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-3">City Location</h2>
            <MapContainer
              center={[weatherData.coord.lat, weatherData.coord.lon]}
              zoom={10}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
                <Popup>{city}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default MapSection;
