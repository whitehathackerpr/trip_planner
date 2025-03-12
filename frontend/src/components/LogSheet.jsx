import React from "react";
import { Bar } from "react-chartjs-2";

const LogSheet = ({ logs }) => {
  const data = {
    labels: logs.days,
    datasets: [
      {
        label: "Driving Hours",
        data: logs.hours,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default LogSheet;
