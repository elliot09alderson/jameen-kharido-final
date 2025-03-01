import React, { useState } from "react";

const GetUserLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");

  const getExactLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError("");
        },
        (err) => {
          setError("Error getting location: " + err.message);
        },
        {
          enableHighAccuracy: true, // Use GPS if available
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // Prevent using cached data
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15`;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Find Restaurants Near You</h2>
      <button
        onClick={getExactLocation}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        Get My Location
      </button>

      {location.latitude && location.longitude && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Latitude:</strong> {location.latitude}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Longitude:</strong> {location.longitude}
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
          >
            Open in Google Maps
          </a>
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default GetUserLocation;
