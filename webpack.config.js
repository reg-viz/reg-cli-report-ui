const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SRC_PATH = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, 'dist');

const common = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [SRC_PATH, 'node_modules'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
    ],
  },

  optimization: {
    moduleIds: 'named',
  },
};

module.exports = (env = {}) => [
  {
    ...common,
    target: 'web',
    entry: path.join(SRC_PATH, 'index.tsx'),
    output: {
      filename: 'report.js',
      sourceMapFilename: 'report.js.map',
      path: DIST_PATH,
      publicPath: '/',
    },
    plugins: [
      ...(IS_PRODUCTION
        ? []
        : [
            new CopyPlugin({
              patterns: [
                {
                  from: path.join(
                    __dirname,
                    'node_modules',
                    'x-img-diff-js',
                    'build',
                    'cv-wasm_browser.*',
                  ),
                  to: '[name].[ext]',
                },
                {
                  from: 'develop',
                  globOptions: {
                    ignore: ['**/index*.html'],
                  },
                },
              ],
            }),
            new HtmlWebpackPlugin({
              template: path.join(
                __dirname,
                'develop',
                env.ENABLED_HUGE ? 'index_large_data.html' : 'index.html',
              ),
            }),
          ]),
    ],
    devServer: {
      contentBase: DIST_PATH,
      port: 8080,
      host: '0.0.0.0',
      watchContentBase: true,
      disableHostCheck: true,
    },
  },

  {
    ...common,
    target: 'webworker',
    entry: path.join(SRC_PATH, 'worker-main.ts'),
    output: {
      filename: IS_PRODUCTION ? 'worker.js' : 'worker-dev.js',
      sourceMapFilename: IS_PRODUCTION ? 'worker.js.map' : 'worker-dev.js.map',
      path: DIST_PATH,
      publicPath: '/',
    },
  },
];
