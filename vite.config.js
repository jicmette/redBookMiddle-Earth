import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        characters: resolve(__dirname, 'src/characters/index.html'),
        cinema: resolve(__dirname, 'src/shire_cinema/index.html'),
        elven: resolve(__dirname, 'src/elven-lore/index.html'),
      }
    }
  }
});
