import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: [
        [
          '@emotion/babel-plugin', {
            sourceMap: true,
            autoLabel: 'never',
            cssPropOptimization: true
          }
        ]
      ]
    }
  })],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      hooks: path.resolve(__dirname, './src/hooks'),
      types: path.resolve(__dirname, './src/types.ts')
    }
  },
  envDir: '.'
});
