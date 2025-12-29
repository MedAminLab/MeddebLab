
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Assurez-vous que le nom du repo GitHub est exactement MeddebLab (respectez les majuscules)
export default defineConfig({
  plugins: [react()],
  base: '/MeddebLab/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
