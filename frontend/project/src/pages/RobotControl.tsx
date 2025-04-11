import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Stop as StopIcon,
  Home as HomeIcon,
  Battery90 as BatteryIcon,
} from '@mui/icons-material';
import { RobotStatus } from '../types';

const initialRobotStatus: RobotStatus = {
  status: 'idle',
  battery: 85,
  currentPosition: { x: 0, y: 0 },
};

export default function RobotControl() {
  const [robotStatus, setRobotStatus] = useState<RobotStatus>(initialRobotStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartRobot = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRobotStatus({ ...robotStatus, status: 'moving' });
      setIsLoading(false);
    }, 1000);
  };

  const handleStopRobot = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRobotStatus({ ...robotStatus, status: 'idle' });
      setIsLoading(false);
    }, 1000);
  };

  const handleHomeRobot = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRobotStatus({
        ...robotStatus,
        status: 'moving',
        currentPosition: { x: 0, y: 0 },
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Robot Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BatteryIcon color="primary" sx={{ mr: 1 }} />
            <Typography>
              Battery Level: {robotStatus.battery}%
            </Typography>
          </Box>
          <Typography gutterBottom>
            Status: {robotStatus.status.toUpperCase()}
          </Typography>
          <Typography gutterBottom>
            Position: X: {robotStatus.currentPosition.x}, Y: {robotStatus.currentPosition.y}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Controls
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<StartIcon />}
              onClick={handleStartRobot}
              disabled={isLoading || robotStatus.status === 'moving'}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<StopIcon />}
              onClick={handleStopRobot}
              disabled={isLoading || robotStatus.status === 'idle'}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<HomeIcon />}
              onClick={handleHomeRobot}
              disabled={isLoading}
            >
              Return Home
            </Button>
          </Box>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}