import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        plugin: 'src/plugin/plugin.ts',
        main: 'index.html'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'plugin' ? 'plugin.js' : 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
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
