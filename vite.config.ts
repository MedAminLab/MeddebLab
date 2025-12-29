
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Doit correspondre exactement au nom de votre repository GitHub
  base: '/MeddebLab/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 3000,
  }
});
