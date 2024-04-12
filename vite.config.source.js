import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'report',
      formats: ['umd'],
      fileName: () => 'report.js',
    },
  },
  plugins: [react()],
});
