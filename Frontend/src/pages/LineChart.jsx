import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Yearly Sales",
    },
  },
};

const labels = [2019, 2020, 2021, 2022, 2023, 2024];

export const data = {
  labels,
  datasets: [
    {
      label: "Years",
      data: [13000, 10000, 15000, 20000, 22000, 23000],
      borderColor: "rgb(75,192,192)",
    },
  ],
};

export function LineGraph() {
  return (
    <div className="w-[50vw] h-[40vh]">
      <Line options={options} data={data} />
    </div>
  );
}
