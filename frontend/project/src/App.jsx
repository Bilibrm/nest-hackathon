import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { lightTheme, darkTheme } from './theme';
import Layout from './components/Layout';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const RobotControl = lazy(() => import('./pages/RobotControl'));
const LiveTracker = lazy(() => import('./pages/LiveTracker'));
const Settings = lazy(() => import('./pages/Settings'));

const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    bgcolor={(theme) => theme.palette.background.default}
  >
    <CircularProgress />
  </Box>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <SnackbarProvider 
        maxSnack={3} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <BrowserRouter>
          <Layout toggleTheme={toggleTheme}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/robot-control" element={<RobotControl />} />
                <Route path="/live-tracker" element={<LiveTracker />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;