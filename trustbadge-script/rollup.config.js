import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/script.js',
  output: {
    file: 'dist/script.js',
    format: 'iife',
  },
  plugins: [buble({ objectAssign: true, transforms: { asyncAwait: false } }), terser({ compress: { evaluate: false } })],
};