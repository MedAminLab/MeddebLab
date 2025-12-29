
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Utilise des chemins relatifs pour fonctionner partout
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
