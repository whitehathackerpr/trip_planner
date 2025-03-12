import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Home = () => {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({
    currentLocation: "",
    pickupLocation: "",
    dropoffLocation: "",
    cycleHours: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validate inputs
      if (
        !tripDetails.currentLocation ||
        !tripDetails.pickupLocation ||
        !tripDetails.dropoffLocation ||
        !tripDetails.cycleHours
      ) {
        setError("All fields are required.");
        return;
      }

      // Fetch coordinates from Mapbox Geocoding API
      const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      const { data: currentData } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          tripDetails.currentLocation
        )}.json?access_token=${mapboxToken}`
      );
      const { data: pickupData } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          tripDetails.pickupLocation
        )}.json?access_token=${mapboxToken}`
      );
      const { data: dropoffData } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          tripDetails.dropoffLocation
        )}.json?access_token=${mapboxToken}`
      );

      const currentCoordinates = currentData.features[0]?.center;
      const pickupCoordinates = pickupData.features[0]?.center;
      const dropoffCoordinates = dropoffData.features[0]?.center;

      if (!currentCoordinates || !dropoffCoordinates || !pickupCoordinates) {
        setError("Unable to fetch coordinates for one or more locations.");
        return;
      }

      // Navigate to the results page with state
      navigate("/results", {
        state: {
          ...tripDetails,
          currentCoordinates,
          pickupCoordinates,
          dropoffCoordinates,
        },
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setError("An error occurred while fetching location data.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">

      /**Navbar */
      <Navbar />

      <div className="bg-white text-black p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Trip Planner</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="currentLocation" className="block text-lg font-medium mb-2">
              Current Location:
            </label>
            <input
              type="text"
              id="currentLocation"
              name="currentLocation"
              value={tripDetails.currentLocation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your current location"
            />
          </div>
          <div>
            <label htmlFor="pickupLocation" className="block text-lg font-medium mb-2">
              Pickup Location:
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={tripDetails.pickupLocation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter the pickup location"
            />
          </div>
          <div>
            <label htmlFor="dropoffLocation" className="block text-lg font-medium mb-2">
              Dropoff Location:
            </label>
            <input
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              value={tripDetails.dropoffLocation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter the dropoff location"
            />
          </div>
          <div>
            <label htmlFor="cycleHours" className="block text-lg font-medium mb-2">
              Current Cycle Hours (Hrs):
            </label>
            <input
              type="number"
              id="cycleHours"
              name="cycleHours"
              value={tripDetails.cycleHours}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter hours used"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Plan Trip
          </button>
        </form>
      </div>

      /**footer */
      <Footer />
      
    </div>
  );
};

export default Home;
