import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './App.css';

function App() {
  const [geolocationData, setGeolocationData] = useState(null);

  useEffect(() => {
    fetchGeolocationData();
  }, []);

  const fetchGeolocationData = async () => {
    try {
      const response = await fetch('http://localhost:5000/info'); // Change to your API endpoint
      const data = await response.json();
      setGeolocationData(data.geolocationData);
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Geolocation Information</h1>
      {geolocationData ? (
        <div >
          <p>IP Address: {geolocationData.ip}</p>
          <p>Country: {geolocationData.country}</p>
          <p>City: {geolocationData.city}</p>
          {/* Display other relevant information */}
          <div className='parent'>
            {geolocationData && geolocationData.latitude && geolocationData.longitude && (
              <LoadScript  googleMapsApiKey={process.env.GOOGLE_MAP_API}>
                <GoogleMap
                  mapContainerStyle={{ width: '400px', height: '300px' }}
                  center={{ lat: parseFloat(geolocationData.latitude), lng: parseFloat(geolocationData.longitude) }}
                  zoom={10}
                >
                  <Marker position={{ lat: parseFloat(geolocationData.latitude), lng: parseFloat(geolocationData.longitude) }} />
                </GoogleMap>
              </LoadScript>
            )}
          </div>
        </div>
      ) : (
        <p>Loading geolocation data...</p>
      )}
    </div>
  );
}

export default App;
