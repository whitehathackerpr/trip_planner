import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import TripHistory from "./pages/TripHistory";
import ELDLogs from "./pages/ELDLogs";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-white">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<TripHistory />} />
              <Route path="/logs" element={<ELDLogs />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
