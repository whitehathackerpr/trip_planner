import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { FaHome, FaRoute, FaClipboardList, FaChartLine, FaCog, FaBars, FaTimes, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/history", label: "Trip History", icon: <FaHistory /> },
    { path: "/results", label: "Trip Results", icon: <FaRoute /> },
    { path: "/logs", label: "ELD Logs", icon: <FaClipboardList /> },
    { path: "/analytics", label: "Analytics", icon: <FaChartLine /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Trip Planner</h1>
          <p className="text-indigo-200 text-sm">Driver Management System</p>
        </div>
        
        {/* User info */}
        <div className="px-6 py-4 border-t border-b border-indigo-800">
          <div className="flex items-center">
            <div className="bg-indigo-700 rounded-full p-2 mr-3">
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="font-medium">{user.username || "Driver"}</p>
              <p className="text-xs text-indigo-300">{user.role || "Driver"}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 hover:bg-indigo-800 ${
                    location.pathname === item.path ? "bg-indigo-800" : ""
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full border-t border-indigo-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-4 text-left hover:bg-indigo-800 transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
          <p className="text-sm text-indigo-300 p-6 pt-2">© 2025 Trip Planner</p>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-indigo-600 text-white"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 w-full bg-white">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 