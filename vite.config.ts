
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Utiliser './' permet au projet de fonctionner quel que soit le nom du sous-dossier
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
