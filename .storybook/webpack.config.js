const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    loader: 'babel-loader',
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
