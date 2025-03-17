import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaDownload, FaSpinner, FaExclamationCircle, FaFilter, FaSearch } from "react-icons/fa";
import { getELDLogs } from "../utils/api";
import ELDLogsDisplay from "../components/ELDLogsDisplay";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ELDLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await getELDLogs();
      setLogs(response.data || []);
    } catch (err) {
      console.error("Error fetching ELD logs:", err);
      setError("Failed to load ELD logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    // Date filter
    const dateMatch = logDate >= startDate && logDate <= endDate;
    
    // Text filter
    const textMatch = filter === "" || 
      log.status.toLowerCase().includes(filter.toLowerCase()) ||
      log.location.toLowerCase().includes(filter.toLowerCase());
    
    return dateMatch && textMatch;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("ELD Logs Report", 14, 22);
    
    // Add date range
    doc.setFontSize(12);
    doc.text(`Date Range: ${dateRange.startDate} to ${dateRange.endDate}`, 14, 30);
    
    // Create table
    const tableColumn = ["Date", "Time", "Status", "Location", "Hours", "Notes"];
    const tableRows = filteredLogs.map(log => [
      new Date(log.date).toLocaleDateString(),
      log.time,
      log.status,
      log.location,
      log.hours,
      log.notes
    ]);
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [66, 135, 245],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }
    });
    
    doc.save(`ELD_Logs_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">ELD Logs</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Electronic Logging Device Records</h2>
          <p className="mt-1 opacity-90">View and export your driving logs</p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="shadow-sm border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  className="shadow-sm border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <FaFilter className="mr-2 text-blue-600" />
                  Filter
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Filter by status or location"
                    className="shadow-sm border border-gray-300 rounded-md py-2 pl-10 pr-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
            
            <button
              onClick={exportPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
              disabled={loading || filteredLogs.length === 0}
            >
              <FaDownload className="mr-2" />
              Export PDF
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">Loading ELD logs...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              <div className="flex">
                <FaExclamationCircle className="mt-1 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          ) : filteredLogs.length > 0 ? (
            <ELDLogsDisplay logs={filteredLogs} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No ELD logs found for the selected criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ELDLogs; 