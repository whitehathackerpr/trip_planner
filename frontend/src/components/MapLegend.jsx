import React from "react";
import { FaMapMarkerAlt, FaTruck, FaFlag, FaRoad } from "react-icons/fa";

const MapLegend = () => {
  return (
    <div className="bg-white p-3 border-t border-gray-200">
      <h4 className="text-sm font-semibold mb-2">Map Legend</h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-blue-600 mr-2" />
          <span>Current Location</span>
        </div>
        <div className="flex items-center">
          <FaTruck className="text-green-600 mr-2" />
          <span>Pickup Location</span>
        </div>
        <div className="flex items-center">
          <FaFlag className="text-red-600 mr-2" />
          <span>Dropoff Location</span>
        </div>
        <div className="flex items-center">
          <FaRoad className="text-blue-500 mr-2" />
          <span>Route</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend; 