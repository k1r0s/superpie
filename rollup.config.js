import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/superpie.umd.js', name: 'superpie', format: 'umd' },
  ],
  plugins: babel({
    exclude: 'node_modules/**'
  })
}
