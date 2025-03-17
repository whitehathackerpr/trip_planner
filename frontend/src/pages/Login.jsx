import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a simple login page without Material UI for now
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock authentication - in a real app, this would call an API
    setTimeout(() => {
      if (credentials.username === 'driver' && credentials.password === 'password') {
        localStorage.setItem('user', JSON.stringify({ username: credentials.username, role: 'driver' }));
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-md w-full">
        <div className="bg-indigo-900 p-6 text-white text-center rounded-t-lg">
          <h1 className="text-3xl font-bold">Trip Planner</h1>
          <p className="mt-2 opacity-90">Driver Management System</p>
        </div>
        
        <div className="p-6 border-x border-b rounded-b-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
               credentials: username: "driver", password: "password"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 