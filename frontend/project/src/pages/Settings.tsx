import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { WarehouseSettings } from '../types';

const defaultSettings: WarehouseSettings = {
  shelfHeight: 200,
  firstShelfHeight: 50,
  numberOfShifts: 2,
};

export default function Settings() {
  const { enqueueSnackbar } = useSnackbar();
  const [settings, setSettings] = useLocalStorage<WarehouseSettings>(
    'warehouseSettings',
    defaultSettings
  );

  const [formValues, setFormValues] = useState<WarehouseSettings>(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formValues);
    enqueueSnackbar('Settings saved successfully!', { variant: 'success' });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Warehouse Settings
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Shelf Height (cm)"
              type="number"
              name="shelfHeight"
              value={formValues.shelfHeight}
              onChange={handleChange}
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              fullWidth
              label="First Shelf Height (cm)"
              type="number"
              name="firstShelfHeight"
              value={formValues.firstShelfHeight}
              onChange={handleChange}
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              fullWidth
              label="Number of Shifts"
              type="number"
              name="numberOfShifts"
              value={formValues.numberOfShifts}
              onChange={handleChange}
              margin="normal"
              InputProps={{ inputProps: { min: 1, max: 3 } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Save Settings
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}