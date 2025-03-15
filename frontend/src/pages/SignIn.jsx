// src/components/SignIn.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    console.log("Logging in with", formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
            <Link to = "/resetaccount"className="block text-right hover:text-gray-800 ">Forgot password?</Link>
          </div>
          <button className="w-full bg-blue-600 text-black p-2 rounded-lg hover:bg-blue-700 hover:text-red-800">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account? <Link to="/SignUp" className="text-blue-600 hover:text-red-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
