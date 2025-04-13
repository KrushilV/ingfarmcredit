import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Cloud, Droplets, Thermometer } from 'lucide-react';

function Dashboard() {
  const weatherData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [22, 24, 25, 23, 22, 24, 26],
      borderColor: 'rgb(96, 230, 161)',
      tension: 0.1
    }]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Farm Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Cloud className="text-blue-500" />
            <h2 className="text-xl font-semibold">Weather Forecast</h2>
          </div>
          <Line data={weatherData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Droplets className="text-blue-500" />
            <h2 className="text-xl font-semibold">Soil Moisture</h2>
          </div>
          <div className="text-4xl font-bold text-center text-blue-600">78%</div>
          <p className="text-center text-gray-600 mt-2">Optimal Range</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Thermometer className="text-red-500" />
            <h2 className="text-xl font-semibold">Soil Health Index</h2>
          </div>
          <div className="text-4xl font-bold text-center text-green-600">8.5/10</div>
          <p className="text-center text-gray-600 mt-2">Excellent Condition</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Farm Location & GIS Data</h2>
        <div className="h-96">
          <MapContainer center={[23.049736, 72.511726]} zoom={5} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[23.049736, 72.511726]}>
              <Popup>Sample Farm Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;