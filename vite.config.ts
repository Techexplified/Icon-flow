import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        plugin: 'src/plugin/plugin.ts',
        index: './index.html'
      },
      output: {
        entryFileNames: '[name].js',
      }
    }
  },
  server: {
    port: 5173,
    cors: {
      origin: '*',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    port: 4173,
    cors: {
      origin: '*',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
});
