const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SRC_PATH = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, 'dist');

const common = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : '#source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [SRC_PATH, 'node_modules'],
  },

  output: {
    filename: path.join('[name].js'),
    sourceMapFilename: '[name].js.map',
    path: DIST_PATH,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [new webpack.NamedModulesPlugin()],
};

module.exports = [
  {
    ...common,
    target: 'web',
    entry: {
      report: path.join(SRC_PATH, 'index.tsx'),
    },

    plugins: [
      ...common.plugins,
      ...(IS_PRODUCTION
        ? []
        : [
            new CopyPlugin([
              {
                from: path.join(__dirname, 'node_modules', 'x-img-diff-js', 'build', 'cv-wasm_browser.*'),
                to: path.join(DIST_PATH),
                flatten: true,
              },
              { from: 'detector.wasm', to: DIST_PATH },
              { from: 'sample', to: DIST_PATH },
            ]),
            new HtmlWebpackPlugin({ template: 'index.html' }),
          ]),
    ],

    devServer: {
      contentBase: DIST_PATH,
      inline: true,
      hot: true,
      port: 8080,
    },
  },

  {
    ...common,
    target: 'webworker',
    entry: {
      worker: path.join(SRC_PATH, 'worker-main.ts'),
    },
  },
];
