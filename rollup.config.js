import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './dist/kor-util.js',
  output: {
    file: './dist/kor-util.js',
    format: 'umd',
    name: 'korUtil',
  },
  plugins: [
    resolve(),
    commonjs({
      dynamicRequireTargets: [
        './dist/kor-util.*.js',
      ],
    })],
};
