import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material'],
          'charts': ['@mui/x-charts'],
          'router': ['react-router-dom'],
        }
      }
    }
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:3001',
        ws: true,
      }
    }
  }
});