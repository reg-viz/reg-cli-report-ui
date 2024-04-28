import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
  const value = (dev, fallback) => (mode === 'development' ? dev : fallback);

  return {
    clearScreen: false,
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        value('development', 'production'),
      ),
    },
    build: {
      emptyOutDir: false,
      copyPublicDir: false,
      minify: false,
      outDir: value('public', 'dist'),
      lib: {
        entry: path.resolve(__dirname, 'src/worker-main.ts'),
        name: 'worker',
        formats: ['iife'],
        fileName: () => value('worker-dev.js', 'worker.js'),
      },
    },
    plugins: value(
      [
        viteStaticCopy({
          targets: [
            {
              src: path.join(
                __dirname,
                'node_modules',
                'x-img-diff-js',
                'build',
                'cv-wasm_browser.*',
              ),
              dest: '.',
            },
          ],
        }),
      ],
      [],
    ),
  };
});
