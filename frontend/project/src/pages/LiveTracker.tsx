import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { RobotStatus, Position } from '../types';

const GRID_SIZE = 10;
const CELL_SIZE = 50;

interface CellProps {
  isRobot: boolean;
  isShelf: boolean;
}

const Cell: React.FC<CellProps> = ({ isRobot, isShelf }) => (
  <Box
    sx={{
      width: CELL_SIZE,
      height: CELL_SIZE,
      border: '1px solid #ccc',
      backgroundColor: isRobot ? 'primary.main' : isShelf ? 'grey.300' : 'transparent',
      transition: 'background-color 0.3s',
    }}
  />
);

const shelves: Position[] = [
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y: 4 },
  { x: 5, y: 2 },
  { x: 5, y: 3 },
  { x: 5, y: 4 },
  { x: 8, y: 2 },
  { x: 8, y: 3 },
  { x: 8, y: 4 },
];

export default function LiveTracker() {
  const [robotPosition, setRobotPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRobotPosition(prev => ({
        x: (prev.x + 1) % GRID_SIZE,
        y: Math.floor(Math.random() * GRID_SIZE),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        const isRobot = robotPosition.x === x && robotPosition.y === y;
        const isShelf = shelves.some(shelf => shelf.x === x && shelf.y === y);
        row.push(
          <Cell
            key={`${x}-${y}`}
            isRobot={isRobot}
            isShelf={isShelf}
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
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Warehouse Layout
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
            }}
          >
            {renderGrid()}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Robot Position: X: {robotPosition.x}, Y: {robotPosition.y}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}