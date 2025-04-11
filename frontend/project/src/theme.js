import { createTheme } from '@mui/material/styles';

const commonComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        overflow: 'hidden',
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#db2777',
      light: '#f472b6',
      dark: '#be185d',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  components: commonComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#2563eb',
    },
    secondary: {
      main: '#f472b6',
      light: '#f9a8d4',
      dark: '#db2777',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  components: commonComponents,
});