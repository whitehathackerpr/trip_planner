import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaMapMarkedAlt, FaSpinner, FaExclamationCircle, FaEye } from "react-icons/fa";
import { getTripHistory } from "../utils/api";

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchTripHistory();
  }, []);

  const fetchTripHistory = async () => {
    setLoading(true);
    try {
      const response = await getTripHistory();
      setTrips(response.data || []);
    } catch (err) {
      console.error("Error fetching trip history:", err);
      setError("Failed to load trip history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    // Date filter
    const dateMatch = tripDate >= startDate && tripDate <= endDate;
    
    // Text filter
    const textMatch = searchTerm === "" || 
      trip.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.dropoff_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.current_location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return dateMatch && textMatch;
  });

  return (
    <div className="w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">Trip History</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Past Trips</h2>
          <p className="mt-1 opacity-90">View your trip history and details</p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="shadow-sm border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  className="shadow-sm border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by location"
                className="shadow-sm border border-gray-300 rounded-md py-2 pl-10 pr-3 w-full md:w-64 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">Loading trip history...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              <div className="flex">
                <FaExclamationCircle className="mt-1 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrips.map((trip, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(trip.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trip.current_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trip.pickup_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trip.dropoff_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.round(trip.distance_miles)} mi
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.round(trip.duration_hours * 10) / 10} hrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/results`}
                          state={{
                            tripId: trip.id,
                            currentLocation: trip.current_location,
                            pickupLocation: trip.pickup_location,
                            dropoffLocation: trip.dropoff_location,
                            cycleHours: trip.cycle_hours,
                            routeData: trip.route_data
                          }}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaMapMarkedAlt className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">No trips found for the selected criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripHistory; 