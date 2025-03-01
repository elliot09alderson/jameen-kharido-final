import React, { useState, useEffect } from "react";

const GetLocation = () => {
  // Initialize state to hold latitude and longitude
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      // Requesting current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update state with latitude and longitude
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          // Handle error
          setError("Error fetching location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Call getLocation function when component is mounted
    getLocation();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Get Latitude and Longitude</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!latitude && !longitude && !error && <p>Loading location...</p>}
      {latitude && longitude && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );

return {latitude,longitude}
};

export default GetLocation;
