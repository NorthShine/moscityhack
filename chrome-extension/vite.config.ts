import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';
import makeManifest from './utils/plugins/make-manifest';
import copyContentStyle from './utils/plugins/copy-content-style';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  resolve: {
    alias: {
      react: 'preact',
      '@src': root,
      '@assets': assetsDir,
      '@pages': pagesDir
    }
  },
  plugins: [preact(), makeManifest(), copyContentStyle()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        devtools: resolve(pagesDir, 'devtools', 'index.html'),
        panel: resolve(pagesDir, 'panel', 'index.html'),
        content: resolve(pagesDir, 'content', 'index.ts'),
        background: resolve(pagesDir, 'background', 'index.ts'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html')
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`
      }
    }
  }
});
