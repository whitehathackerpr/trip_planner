import React, { useState } from "react";
import { FaChartLine, FaCalendarAlt, FaTruck, FaGasPump, FaClock, FaRoad, FaMoneyBillWave } from "react-icons/fa";

const Analytics = () => {
  const [period, setPeriod] = useState("month");
  
  // Mock data for analytics
  const analyticsData = {
    week: {
      totalTrips: 5,
      totalMiles: 1250,
      avgMilesPerDay: 178,
      fuelConsumption: 187,
      drivingHours: 42,
      restHours: 28,
      revenue: 2450
    },
    month: {
      totalTrips: 18,
      totalMiles: 4800,
      avgMilesPerDay: 160,
      fuelConsumption: 720,
      drivingHours: 168,
      restHours: 112,
      revenue: 9600
    },
    year: {
      totalTrips: 210,
      totalMiles: 52000,
      avgMilesPerDay: 142,
      fuelConsumption: 7800,
      drivingHours: 1820,
      restHours: 1215,
      revenue: 104000
    }
  };
  
  const data = analyticsData[period];
  
  return (
    <div className="w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Performance Dashboard</h2>
          <p className="mt-1 opacity-90">Track your driving metrics and efficiency</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg ${
                  period === "week" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setPeriod("week")}
              >
                Week
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200 ${
                  period === "month" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setPeriod("month")}
              >
                Month
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg ${
                  period === "year" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setPeriod("year")}
              >
                Year
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaTruck className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Total Trips</h3>
                  <p className="text-3xl font-bold text-blue-600">{data.totalTrips}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Completed trips</span>
                <span className="text-green-600">+{Math.floor(data.totalTrips * 0.1)} from previous {period}</span>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaRoad className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Total Miles</h3>
                  <p className="text-3xl font-bold text-green-600">{data.totalMiles.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Miles driven</span>
                <span>Avg: {data.avgMilesPerDay} per day</span>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaMoneyBillWave className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
                  <p className="text-3xl font-bold text-purple-600">${data.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total earnings</span>
                <span className="text-green-600">${Math.round(data.revenue / data.totalTrips)} per trip</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaClock className="mr-2 text-blue-600" />
                Time Distribution
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(data.drivingHours / (data.drivingHours + data.restHours)) * 100}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-1"></span>
                  <span className="text-gray-700">Driving: {data.drivingHours} hours</span>
                </div>
                <div>
                  <span className="inline-block w-3 h-3 bg-gray-200 rounded-full mr-1"></span>
                  <span className="text-gray-700">Rest: {data.restHours} hours</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Driving Hours Breakdown</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Morning (6AM-12PM)</span>
                      <span>{Math.round(data.drivingHours * 0.35)} hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Afternoon (12PM-6PM)</span>
                      <span>{Math.round(data.drivingHours * 0.45)} hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Evening (6PM-12AM)</span>
                      <span>{Math.round(data.drivingHours * 0.15)} hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Night (12AM-6AM)</span>
                      <span>{Math.round(data.drivingHours * 0.05)} hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-700 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaGasPump className="mr-2 text-orange-600" />
                Fuel Consumption
              </h3>
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{data.fuelConsumption}</p>
                  <p className="text-sm text-gray-600">Gallons</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{Math.round(data.totalMiles / data.fuelConsumption * 10) / 10}</p>
                  <p className="text-sm text-gray-600">MPG</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">${Math.round(data.fuelConsumption * 3.5)}</p>
                  <p className="text-sm text-gray-600">Fuel Cost</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Efficiency Trends</h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Improving
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        +3% from last {period}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden text-xs bg-green-200 rounded">
                    <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-2">Fuel-saving tips:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Maintain steady speeds on highways</li>
                    <li>Reduce idling time when possible</li>
                    <li>Keep tires properly inflated</li>
                    <li>Plan routes to avoid traffic congestion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaChartLine className="mr-2 text-indigo-600" />
              Performance Summary
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current {period}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous {period}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Trips Completed</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.totalTrips}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(data.totalTrips * 0.9)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+10%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Miles Driven</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.totalMiles.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(data.totalMiles * 0.95).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+5%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fuel Efficiency (MPG)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(data.totalMiles / data.fuelConsumption * 10) / 10}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(data.totalMiles / data.fuelConsumption * 10 * 0.97) / 10}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+3%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Revenue</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(data.revenue * 0.88).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+12%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 