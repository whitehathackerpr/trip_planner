import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaTruck, FaCalendarAlt, FaSpinner, FaArrowRight, FaClipboardList } from "react-icons/fa";
import { submitTripDetails } from "../utils/api";

const Home = () => {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    cycle_hours: "11"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!tripDetails.current_location || !tripDetails.pickup_location || !tripDetails.dropoff_location) {
      setError("Please fill in all location fields");
      return;
    }
    
    setLoading(true);
    try {
      const response = await submitTripDetails(tripDetails);
      navigate("/results", { 
        state: {
          ...tripDetails,
          routeData: response.data
        }
      });
    } catch (err) {
      console.error("Error submitting trip details:", err);
      setError("Failed to plan trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <h2 className="text-2xl font-bold">Trip Planner</h2>
              <p className="mt-1 opacity-90">Enter your trip details to get started</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                    Current Location
                  </label>
                  <input
                    type="text"
                    name="current_location"
                    value={tripDetails.current_location}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your current location"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                    <FaTruck className="mr-2 text-blue-600" />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickup_location"
                    value={tripDetails.pickup_location}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter pickup location"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                    Dropoff Location
                  </label>
                  <input
                    type="text"
                    name="dropoff_location"
                    value={tripDetails.dropoff_location}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter dropoff location"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" />
                    Available Cycle Hours
                  </label>
                  <select
                    name="cycle_hours"
                    value={tripDetails.cycle_hours}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="11">11 hours (Standard)</option>
                    <option value="8">8 hours (Short Cycle)</option>
                    <option value="14">14 hours (Extended)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Planning Trip...
                    </>
                  ) : (
                    <>
                      Plan Trip
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
              <h2 className="text-xl font-bold">Features</h2>
              <p className="mt-1 opacity-90">What our trip planner offers</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <FaMapMarkerAlt className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-blue-600">Optimized Routes</h4>
                  <p className="text-sm text-gray-600">Find the most efficient routes for your trips</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                  <FaCalendarAlt className="text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-green-600">HOS Compliance</h4>
                  <p className="text-sm text-gray-600">Stay compliant with hours of service regulations</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                  <FaTruck className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-purple-600">Rest Stop Planning</h4>
                  <p className="text-sm text-gray-600">Automatically plan required rest stops</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                  <FaClipboardList className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-blue-600">Track Logs</h4>
                  <p className="text-sm text-gray-600">Generate and export ELD logs for your trips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
