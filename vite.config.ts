
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remplacez 'meddeb' par le nom exact de votre repository GitHub
export default defineConfig({
  plugins: [react()],
  base: '/meddeb/',
});
