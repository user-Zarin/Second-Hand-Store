import React from "react";
import { LineGraph } from "./LineChart.jsx";
import { PieChart } from "./PieChart.jsx";
const Progress = () => {
  return (
    <div className="text-center h-[90vh] fixed w-[90vw] items-center">
      <div className="text-2xl pt-4 font-sans ">
        <p>PROGRESS REPORT</p>
      </div>
      <div className="flex flex-wrap justify-around p-7 items-center">
        <LineGraph />
        <PieChart />
      </div>
    </div>
  );
};

export default Progress;
