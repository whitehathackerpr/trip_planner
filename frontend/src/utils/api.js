import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Trip planning
export const submitTripDetails = (tripDetails) => {
  // For demo purposes, we'll mock the API response
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        data: {
          trip: {
            id: Math.floor(Math.random() * 10000),
            current_location: tripDetails.current_location,
            pickup_location: tripDetails.pickup_location,
            dropoff_location: tripDetails.dropoff_location,
            cycle_hours: tripDetails.cycle_hours,
            date: new Date().toISOString(),
            distance_miles: Math.floor(Math.random() * 1000) + 200,
            duration_hours: Math.floor(Math.random() * 20) + 5,
          },
          route: {
            total_distance: Math.floor(Math.random() * 1000) + 200,
            total_duration: Math.floor(Math.random() * 20) + 5,
            fuel_consumption: Math.floor(Math.random() * 100) + 20,
            rest_stops: [
              {
                location: "Rest Area - Mile 120",
                duration_hours: 1,
                type: "rest",
                distance_miles: 120
              },
              {
                location: "Truck Stop - Exit 250",
                duration_hours: 8,
                type: "sleep",
                distance_miles: 250
              },
              {
                location: "Service Plaza - Mile 380",
                duration_hours: 1,
                type: "rest",
                distance_miles: 380
              }
            ],
            geometry: {
              type: "LineString",
              coordinates: [
                [-74.006, 40.7128], // NYC
                [-75.1652, 39.9526], // Philadelphia
                [-77.0369, 38.9072], // Washington DC
                [-78.6382, 35.7796], // Raleigh
                [-80.1917, 25.7617]  // Miami
              ]
            }
          }
        }
      };
      resolve(mockResponse);
    }, 1000);
  });
};

// Get route details
export const getRouteDetails = (tripId) => {
  // For demo purposes, we'll mock the API response
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        data: {
          route: {
            total_distance: Math.floor(Math.random() * 1000) + 200,
            total_duration: Math.floor(Math.random() * 20) + 5,
            fuel_consumption: Math.floor(Math.random() * 100) + 20,
            rest_stops: [
              {
                location: "Rest Area - Mile 120",
                duration_hours: 1,
                type: "rest",
                distance_miles: 120
              },
              {
                location: "Truck Stop - Exit 250",
                duration_hours: 8,
                type: "sleep",
                distance_miles: 250
              },
              {
                location: "Service Plaza - Mile 380",
                duration_hours: 1,
                type: "rest",
                distance_miles: 380
              }
            ],
            geometry: {
              type: "LineString",
              coordinates: [
                [-74.006, 40.7128], // NYC
                [-75.1652, 39.9526], // Philadelphia
                [-77.0369, 38.9072], // Washington DC
                [-78.6382, 35.7796], // Raleigh
                [-80.1917, 25.7617]  // Miami
              ]
            }
          }
        }
      };
      resolve(mockResponse);
    }, 1000);
  });
};

// Get trip history
export const getTripHistory = () => {
  // For demo purposes, we'll mock the API response
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        data: [
          {
            id: 1001,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            current_location: "New York, NY",
            pickup_location: "Boston, MA",
            dropoff_location: "Washington, DC",
            distance_miles: 450,
            duration_hours: 8.5,
            cycle_hours: 11,
            status: "completed"
          },
          {
            id: 1002,
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            current_location: "Chicago, IL",
            pickup_location: "Detroit, MI",
            dropoff_location: "Indianapolis, IN",
            distance_miles: 320,
            duration_hours: 6,
            cycle_hours: 11,
            status: "completed"
          },
          {
            id: 1003,
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            current_location: "Dallas, TX",
            pickup_location: "Houston, TX",
            dropoff_location: "New Orleans, LA",
            distance_miles: 510,
            duration_hours: 9,
            cycle_hours: 11,
            status: "completed"
          }
        ]
      };
      resolve(mockResponse);
    }, 1000);
  });
};

// Get ELD logs
export const getELDLogs = () => {
  // For demo purposes, we'll mock the API response
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        data: [
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            time: "08:00 AM",
            status: "On Duty",
            location: "New York, NY",
            hours: "0.5",
            notes: "Pre-trip inspection"
          },
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            time: "08:30 AM",
            status: "Driving",
            location: "New York, NY to Philadelphia, PA",
            hours: "2.0",
            notes: ""
          },
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            time: "10:30 AM",
            status: "On Duty",
            location: "Philadelphia, PA",
            hours: "1.0",
            notes: "Loading cargo"
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            time: "11:30 AM",
            status: "Driving",
            location: "Philadelphia, PA to Washington, DC",
            hours: "2.5",
            notes: ""
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            time: "02:00 PM",
            status: "Off Duty",
            location: "Rest Area - I-95",
            hours: "0.5",
            notes: "Lunch break"
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            time: "02:30 PM",
            status: "Driving",
            location: "Rest Area to Washington, DC",
            hours: "1.5",
            notes: ""
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            time: "04:00 PM",
            status: "On Duty",
            location: "Washington, DC",
            hours: "1.0",
            notes: "Unloading cargo"
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            time: "05:00 PM",
            status: "Off Duty",
            location: "Washington, DC",
            hours: "1.0",
            notes: "End of shift"
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            time: "06:00 PM",
            status: "Sleeper Berth",
            location: "Truck Stop - Washington, DC",
            hours: "10.0",
            notes: "10-hour rest period"
          },
          {
            date: new Date().toISOString(),
            time: "04:00 AM",
            status: "On Duty",
            location: "Washington, DC",
            hours: "0.5",
            notes: "Pre-trip inspection"
          },
          {
            date: new Date().toISOString(),
            time: "04:30 AM",
            status: "Driving",
            location: "Washington, DC to Richmond, VA",
            hours: "2.0",
            notes: ""
          }
        ]
      };
      resolve(mockResponse);
    }, 1000);
  });
};

export default api;
