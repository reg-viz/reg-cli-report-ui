module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
    'plugin:react/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
