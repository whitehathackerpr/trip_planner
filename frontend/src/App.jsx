import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Header from "./components/Header"; // Import the Header component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header /> {/* Add the Header component here */}
        <div className="pt-20">
          {/* Add padding to prevent content from being hidden under the fixed header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;