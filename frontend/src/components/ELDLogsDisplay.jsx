import React from "react";
import { FaCircle, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ELDLogsDisplay = ({ logs }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "driving":
        return "bg-green-500";
      case "on duty":
        return "bg-yellow-500";
      case "off duty":
        return "bg-blue-500";
      case "sleeper berth":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const exportSingleLog = (log) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("ELD Log Details", 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(log.date).toLocaleDateString()}`, 14, 30);
    
    // Add log details
    const details = [
      ["Time", log.time],
      ["Status", log.status],
      ["Location", log.location],
      ["Hours", log.hours],
      ["Notes", log.notes || "N/A"]
    ];
    
    doc.autoTable({
      head: [["Field", "Value"]],
      body: details,
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
      }
    });
    
    doc.save(`ELD_Log_${new Date(log.date).toLocaleDateString()}_${log.time}.pdf`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(log.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FaCircle className={`mr-2 text-xs ${getStatusColor(log.status)}`} />
                  <span className="text-sm text-gray-900">{log.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.hours}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {log.notes || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => exportSingleLog(log)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Export as PDF"
                >
                  <FaDownload />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ELDLogsDisplay; 