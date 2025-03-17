import React, { useState } from "react";
import { FaSave, FaUserCog, FaBell, FaShieldAlt, FaGlobe, FaCheck } from "react-icons/fa";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    display: {
      darkMode: false,
      compactView: true,
      language: "english"
    },
    account: {
      name: "John Driver",
      email: "driver@example.com",
      phone: "(555) 123-4567"
    }
  });
  const [saved, setSaved] = useState(false);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
    setSaved(false);
  };

  const handleDisplayChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [name]: type === "checkbox" ? checked : value
      }
    }));
    setSaved(false);
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      account: {
        ...prev.account,
        [name]: value
      }
    }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to an API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold">User Settings</h2>
          <p className="mt-1 opacity-90">Customize your experience</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {saved && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700 flex items-center">
              <FaCheck className="mr-2" />
              <p>Settings saved successfully!</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Settings */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaUserCog className="mr-2 text-blue-600" />
                Account Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={settings.account.name}
                    onChange={handleAccountChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.account.email}
                    onChange={handleAccountChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={settings.account.phone}
                    onChange={handleAccountChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
                <FaShieldAlt className="mr-2 text-blue-600" />
                Security
              </h3>
              
              <div className="space-y-4">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Change Password
                </button>
                
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Two-Factor Authentication
                </button>
              </div>
            </div>
            
            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaBell className="mr-2 text-blue-600" />
                Notification Preferences
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email"
                    name="email"
                    checked={settings.notifications.email}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="email" className="ml-2 block text-gray-700">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sms"
                    name="sms"
                    checked={settings.notifications.sms}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sms" className="ml-2 block text-gray-700">
                    SMS Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="push"
                    name="push"
                    checked={settings.notifications.push}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="push" className="ml-2 block text-gray-700">
                    Push Notifications
                  </label>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
                <FaGlobe className="mr-2 text-blue-600" />
                Display Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="darkMode"
                    name="darkMode"
                    checked={settings.display.darkMode}
                    onChange={handleDisplayChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="darkMode" className="ml-2 block text-gray-700">
                    Dark Mode
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="compactView"
                    name="compactView"
                    checked={settings.display.compactView}
                    onChange={handleDisplayChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="compactView" className="ml-2 block text-gray-700">
                    Compact View
                  </label>
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={settings.display.language}
                    onChange={handleDisplayChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center"
            >
              <FaSave className="mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 