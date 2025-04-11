import React, { useState, memo } from 'react';
import { Paper, Typography, Box, Grid, Chip, Button, Alert } from '@mui/material';
import { LocalShipping, Storage, Warning } from '@mui/icons-material';
import { useWebSocket } from '../hooks/useWebSocket';

const GRID_SIZE = 12;
const CELL_SIZE = 60;

const Cell = memo(({ isRobot, isShelf, isObstacle, isPath }) => (
  <Box
    sx={{
      width: CELL_SIZE,
      height: CELL_SIZE,
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: 1,
      backgroundColor: isRobot 
        ? 'primary.main' 
        : isShelf 
        ? 'grey.200'
        : isObstacle
        ? 'error.light'
        : isPath
        ? 'primary.light'
        : 'background.paper',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 2,
      },
    }}
  >
    {isRobot && <LocalShipping sx={{ color: 'white' }} />}
    {isShelf && <Storage />}
    {isObstacle && <Warning />}
  </Box>
));

const shelves = [
  { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
  { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 },
  { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 },
];

const obstacles = [
  { x: 3, y: 7 }, { x: 7, y: 5 },
];

export default function LiveTracker() {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState([]);
  const [status, setStatus] = useState('idle');

  const { isConnected, emit } = useWebSocket('robot-position', (data) => {
    setRobotPosition(data.position);
    setPath(data.path || []);
    setStatus(data.status);
  });

  const handleSendOrder = () => {
    emit({ type: 'new-order', destination: { x: 8, y: 4 } });
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        const isRobot = robotPosition.x === x && robotPosition.y === y;
        const isShelf = shelves.some(shelf => shelf.x === x && shelf.y === y);
        const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
        const isPath = path.some(pos => pos.x === x && pos.y === y);
        
        row.push(
          <Cell
            key={`${x}-${y}`}
            isRobot={isRobot}
            isShelf={isShelf}
            isObstacle={isObstacle}
            isPath={isPath}
          />
        );
      }
      grid.push(
        <Box key={y} sx={{ display: 'flex' }}>
          {row}
        </Box>
      );
    }
    return grid;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {!isConnected && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            WebSocket connection lost. Trying to reconnect...
          </Alert>
        )}
        <Paper 
          sx={{ 
            p: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Live Robot Tracker
            </Typography>
            <Chip
              label={status.toUpperCase()}
              color={status === 'moving' ? 'primary' : 'default'}
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.05)' 
                  : 'rgba(0,0,0,0.02)',
                p: 2,
                borderRadius: 2,
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              {renderGrid()}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendOrder}
                disabled={status === 'moving' || !isConnected}
              >
                Send New Order
              </Button>
              <Typography variant="body2" color="text.secondary">
                Robot Position: X: {robotPosition.x}, Y: {robotPosition.y}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}