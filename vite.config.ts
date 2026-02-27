import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Main UI build — React app
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: { main: 'index.html' },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    port: 5173,
    cors: { origin: '*' },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  preview: {
    port: 4173,
    cors: { origin: '*' },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
});
