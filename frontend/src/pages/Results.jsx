import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaMapMarkedAlt, FaClipboardList, FaDownload, FaArrowLeft, FaSpinner, FaExclamationCircle, FaTruck, FaGasPump, FaClock } from "react-icons/fa";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRouteDetails, getELDLogs } from "../utils/api";
import ELDLogsDisplay from "../components/ELDLogsDisplay";

const Results = () => {
  const { state } = useLocation();
  const [routeData, setRouteData] = useState(state?.routeData || null);
  const [eldLogs, setEldLogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("route");

  useEffect(() => {
    if (state?.tripId) {
      fetchELDLogs(state.tripId);
    }
  }, [state?.tripId]);

  const fetchELDLogs = async (tripId) => {
    setLoading(true);
    try {
      const response = await getELDLogs();
      setEldLogs(response.data || []);
    } catch (err) {
      console.error("Error fetching ELD logs:", err);
      setError("Failed to load ELD logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="w-full max-w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
          <div className="p-6 text-center">
            <FaExclamationCircle className="text-yellow-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Trip Data</h2>
            <p className="text-gray-600 mb-6">No trip details were provided. Please plan a new trip.</p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Plan New Trip
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { currentLocation, pickupLocation, dropoffLocation, cycleHours } = state;
  const route = state.routeData?.route || routeData?.route;

  return (
    <div className="w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">Trip Results</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Trip Results</h2>
          <p className="mt-1 opacity-90">View your optimized route and ELD logs</p>
        </div>
        
        <div className="p-6">
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === "route" 
                  ? "border-b-2 border-blue-600 text-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("route")}
            >
              Route Details
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === "logs" 
                  ? "border-b-2 border-blue-600 text-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("logs")}
            >
              ELD Logs
            </button>
          </div>
          
          {activeTab === "route" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaTruck className="text-blue-600 mr-2" />
                    <h3 className="font-semibold">Trip Distance</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{route?.total_distance || "N/A"} miles</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaClock className="text-green-600 mr-2" />
                    <h3 className="font-semibold">Total Duration</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{route?.total_duration || "N/A"} hours</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaGasPump className="text-orange-600 mr-2" />
                    <h3 className="font-semibold">Fuel Consumption</h3>
                  </div>
                  <p className="text-2xl font-bold text-orange-700">{route?.fuel_consumption || "N/A"} gallons</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Route Map</h3>
                <Map 
                  currentLocation={currentLocation}
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  routeGeometry={route?.geometry}
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Trip Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Location</p>
                      <p className="font-medium">{currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium">{pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dropoff Location</p>
                      <p className="font-medium">{dropoffLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Cycle Hours</p>
                      <p className="font-medium">{cycleHours} hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {route?.rest_stops && route.rest_stops.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Rest Stops</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {route.rest_stops.map((stop, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {stop.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                stop.type === 'sleep' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {stop.type === 'sleep' ? 'Sleep' : 'Rest'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {stop.duration_hours} {stop.duration_hours === 1 ? 'hour' : 'hours'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {stop.distance_miles} miles
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "logs" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">ELD Logs</h3>
              
              {loading ? (
                <div className="text-center py-12">
                  <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
                  <p className="text-gray-600">Loading ELD logs...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                  <div className="flex">
                    <FaExclamationCircle className="mt-1 mr-2" />
                    <p>{error}</p>
                  </div>
                </div>
              ) : eldLogs && eldLogs.length > 0 ? (
                <ELDLogsDisplay logs={eldLogs} />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No ELD logs available</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-center pt-4 border-t">
            <Link 
              to="/" 
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Plan New Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
