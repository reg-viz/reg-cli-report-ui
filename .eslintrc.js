module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-hooks'],
  env: {
    node: true,
    browser: true,
    serviceworker: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-case-declarations': 'off',
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              '{}': false,
            },
          },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/default': 'off',
        'import/order': [
          'error',
          {
            'newlines-between': 'never',
          },
        ],
      },
    },
    {
      files: ['*.test.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'no-empty': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'jest/no-mocks-import': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        camelcase: 'off',
      },
    },
  ],
};
// module.exports = {
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-hooks'],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/eslint-recommended',
//     'plugin:@typescript-eslint/recommended',
//     'prettier',
//     'prettier/@typescript-eslint',
//     'plugin:import/typescript',
//     'plugin:react/recommended',
//   ],
//   rules: {
//     '@typescript-eslint/no-unused-vars': 'off',
//     '@typescript-eslint/prefer-interface': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//     'import/order': [
//       'error',
//       {
//         groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
//         'newlines-between': 'never',
//       },
//     ],
//     'import/newline-after-import': ['error', { count: 1 }],
//     'react/prop-types': 'off',
//     'react/display-name': 'off',
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'error',
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
// };
