const { NODE_ENV } = process.env;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: NODE_ENV === 'test' ? 'commonjs' : false,
      },
    ],
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
  ],
};
