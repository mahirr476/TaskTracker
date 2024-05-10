import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../assets/data";

const colorMap = {
  High: "#FEE2E2",   // Equivalent to Tailwind's bg-red-100
  Medium: "#FEF9C3", // Equivalent to Tailwind's bg-yellow-100
  Normal: "#DBEAFE", // Equivalent to Tailwind's bg-blue-100
  Low: "#DCFCE7"    // Equivalent to Tailwind's bg-green-100
};

export const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill={"#393993"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
