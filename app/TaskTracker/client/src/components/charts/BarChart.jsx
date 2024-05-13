import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Sector,
} from "recharts";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { chartData } from "../../assets/data";

const colorMap = {
  high: "#FEE2E2",
  medium: "#FEF9C3",
  normal: "#DBEAFE",
  low: "#DCFCE7",
};

const COLORS = ['#FF8042', '#0088FE', '#FFBB28', '#00C49F'];

export const Chart = () => {
  return (
 
    <div className="flex flex-col w-full justify-between ">

       <Card className="">
      <CardContent>
        <ResponsiveContainer width="100%" height={485}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="total" isAnimationActive={true}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMap[entry.name.toLowerCase()]} />
                ))}
              </Bar>
            </BarChart>
        </ResponsiveContainer>
      </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
