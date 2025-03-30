import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // 👈 Caminho relativo importante para Electron
  build: {
    outDir: 'dist', // Mantém como está na tua estrutura
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  }
});
