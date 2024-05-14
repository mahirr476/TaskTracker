// KPI.jsx
import React, { useState, useEffect } from 'react';
import { calculateKPIs, calculateOverallGrade } from '../utils/kpi';
import { tasks, users, weekData } from '../assets/data'; // Ensure data is correctly imported
import { CircularProgress, Typography, Paper, Grid } from '@mui/material';
import LineCH from '../components/charts/LineCH';
import Title from '../components/Title';

const KPI = ({  }) => {
  const userId = users[1]._id;
  const [kpiData, setKpiData] = useState(null);
  const [overallGrade, setOverallGrade] = useState(0);
  const [weeklyGrades, setWeeklyGrades] = useState([]);

  useEffect(() => {
    const data = calculateKPIs(userId, tasks, users[1].totalUtilization);
    setKpiData(data);
    const grade = calculateOverallGrade(data);
    setOverallGrade(grade);

    // Simulate weekly data for the graph
    const grades = weekData.map(week => ({
      week: week.day,
      grade: Math.random() * 100
    }));
    setWeeklyGrades(grades);
  }, [userId]);

  if (!kpiData) {
    return <CircularProgress />;
  }

  return (
    <div className='w-full md:px-1 px-0 my-6'>
      <div className='flex flex-col justify-between mb-8'>
          <Title title={"User Performance Dashboard"}/>
      </div>
      <Grid container spacing={4}>
        {Object.entries(kpiData).map(([key, value]) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Paper elevation={3} className="p-4 flex flex-col items-center justify-center rounded-lg shadow-lg">
              <Typography variant="h6" className="capitalize mb-2" color="#d69600"><div>{key.replace(/([A-Z])/g, ' $1')}</div></Typography>
              <Typography variant="h5" className="font-bold">
                {typeof value === 'number' ? `${value.toFixed(2)}${key.includes('Rate') ? '%' : ''}` : value}
              </Typography>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h6" className="mb-2">
              <div>Overall Performance Grade: {overallGrade.toFixed()}%</div>
            </Typography>
            <LineCH data={weeklyGrades} />
          </Paper>
        </Grid>
      </Grid>
    </div>

  );
};

export default KPI;
