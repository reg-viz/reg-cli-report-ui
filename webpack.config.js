const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

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
    filename: '[name].js',
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
      new HtmlWebpackPlugin({
        template: 'index.html',
        excludeChunks: ['worker'],
      }),
      new ScriptExtHtmlWebpackPlugin({
        defer: ['vendor', 'report'],
        preload: /\.js$/,
      }),
      new CopyPlugin([{ from: 'sample', to: DIST_PATH }]),
    ],

    optimization: {
      splitChunks: {
        chunks: 'initial',
        minSize: 1,
        minChunks: 1,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            enforce: true,
          },
        },
      },
      concatenateModules: true,
    },

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
