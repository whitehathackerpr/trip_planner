import React from "react";
import { useLocation } from "react-router-dom";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Results = () => {
  const location = useLocation();
  const state = location.state || {}; // Fallback to an empty object

  // Coordinates from the state object (user input)
  const currentCoordinates = state.currentCoordinates || [-122.4194, 37.7749]; // Default coordinates
  const pickupCoordinates = state.pickupCoordinates || [-121.8863, 37.3382]; // Default coordinates
  const dropoffCoordinates = state.dropoffCoordinates || [-121.8863, 37.3382]; // Default coordinates

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Navbar */}
      <Navbar />

      <h2 className="text-2xl font-bold mb-4">Trip Results</h2>
      <div className="grid gap-4">
        {state.currentLocation ? (
          <>
            <p><strong>Current Location:</strong> {state.currentLocation}</p>
            <p><strong>Pickup Location:</strong> {state.pickupLocation}</p>
            <p><strong>Dropoff Location:</strong> {state.dropoffLocation}</p>
            <p><strong>Cycle Hours:</strong> {state.cycleHours}</p>
          </>
        ) : (
          <p className="text-red-500">No trip details available.</p>
        )}

        <Map
          currentLocation={currentCoordinates}
          pickupLocation={pickupCoordinates}
          dropoffLocation={dropoffCoordinates}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Results;
