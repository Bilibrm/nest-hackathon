import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { RobotStatus, OrderTask } from '../types';

// Simulated data
const mockData = {
  robotStatus: {
    status: 'idle',
    battery: 85,
    currentPosition: { x: 3, y: 4 },
  } as RobotStatus,
  completedOrders: 24,
  pendingOrders: 8,
  dailyStats: [
    { time: '00:00', orders: 10 },
    { time: '04:00', orders: 15 },
    { time: '08:00', orders: 30 },
    { time: '12:00', orders: 45 },
    { time: '16:00', orders: 35 },
    { time: '20:00', orders: 20 },
  ],
};

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Robot Status
          </Typography>
          <Typography component="p" variant="h4">
            {mockData.robotStatus.status.toUpperCase()}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Battery: {mockData.robotStatus.battery}%
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Completed Orders
          </Typography>
          <Typography component="p" variant="h4">
            {mockData.completedOrders}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Today
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Pending Orders
          </Typography>
          <Typography component="p" variant="h4">
            {mockData.pendingOrders}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Awaiting processing
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Efficiency Rate
          </Typography>
          <Typography component="p" variant="h4">
            92%
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Last 24 hours
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Orders Overview
          </Typography>
          <Box sx={{ height: 300 }}>
            <LineChart
              series={[
                {
                  data: mockData.dailyStats.map(stat => stat.orders),
                  label: 'Orders',
                },
              ]}
              xAxis={[{ 
                data: mockData.dailyStats.map(stat => stat.time),
                scaleType: 'band',
              }]}
              height={300}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}