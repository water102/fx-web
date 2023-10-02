import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: 'json' }
const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs', // CommonJS format for Node.js
      sourcemap: true,
    },
    {
      file: 'dist/index.mjs',
      format: 'es', // ES module format for modern browsers
      sourcemap: true,
    },
  ],
  plugins: [
    image(),
    json(),
    replace({
      exclude: 'node_modules/**',
      preventAssignment: true,
      values: {
        _ENV_: JSON.stringify(process.env.NODE_ENV || 'development'),
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion__: () => JSON.stringify(pkg.version),
        __packageName__: () => JSON.stringify(pkg.name),
      }
    }),
    eslint({
      exclude: ['src/styles/**'],
    }),
    nodeResolve(),
    commonjs(),
    typescript(),
    isProduction && terser({
      mangle: {
        toplevel: true,
      }
    }),
  ],
};
