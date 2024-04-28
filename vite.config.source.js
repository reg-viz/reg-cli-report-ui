import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(({ mode }) => {
  const value = (dev, fallback) => (mode === 'development' ? dev : fallback);

  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        value('development', 'production'),
      ),
    },
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
    plugins: [
      react(),
      vanillaExtractPlugin({
        identifiers: mode === 'development' ? 'debug' : 'short',
      }),
    ],
  };
});
