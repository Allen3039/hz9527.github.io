const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const resolve = (p = '') => path.join(__dirname, '../', p);

module.exports = {
  inputOpt: {
    input: resolve('/src/index.js'),
    plugins: [
      babel(),
      nodeResolve(),
      commonjs()
    ]
  },
  outputOpt: {
    file: resolve('/dist/index.js'),
    format: 'cjs',
    sourcemap: true,
  }
}
