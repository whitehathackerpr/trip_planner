import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="w-full max-w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
            <FaExclamationTriangle className="text-yellow-600 text-3xl" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 