
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le nom doit correspondre exactement au nom du repository GitHub (MeddebLab)
export default defineConfig({
  plugins: [react()],
  base: '/MeddebLab/',
});
