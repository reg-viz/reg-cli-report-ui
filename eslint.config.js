import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import configPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.worker,
        ...globals.commonjs,
        ...globals.es6,
      },
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
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            '{}': false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-assertions': 'error',
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
    files: ['**/*.stories.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },

  {
    files: ['**/*.test.ts'],
    rules: {
      'no-empty': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },

  {
    files: ['**/*.js'],
    rules: {
      'import/no-dynamic-require': 'off',
      'global-require': 'off',
      camelcase: 'off',
    },
  },

  configPrettier,
);
