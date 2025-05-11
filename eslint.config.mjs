import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/node_modules', '**/.next', './environment.d.ts']),
  {
    extends: compat.extends(
      'next/core-web-vitals',
      'next/typescript',
      'plugin:react/recommended',
      'plugin:@next/next/recommended',
      'plugin:@typescript-eslint/recommended'
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'simple-import-sort/imports': 1,
      'simple-import-sort/exports': 1,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/interface-name-prefix': 0,
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 0,
      'react/self-closing-comp': 1,
      'react/prop-types': 0,
      'react/jsx-no-bind': 0,
      'react/jsx-no-duplicate-props': 1,
      'react/jsx-uses-vars': 1,
      'react/jsx-props-no-multi-spaces': 1,
      'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
      'react/jsx-curly-newline': 1,
      'react/jsx-max-props-per-line': 1,

      'react/jsx-curly-spacing': [
        1,
        {
          when: 'always',
          children: true,
        },
      ],

      'object-curly-spacing': [1, 'always'],
      'jsx-quotes': [1, 'prefer-single'],
      quotes: [1, 'single'],
      eqeqeq: 1,
      'no-unused-vars': 1,
      'no-undef': 1,
      'no-unneeded-ternary': 1,
      'no-extra-bind': 2,
      'no-console': 1,

      'no-trailing-spaces': [
        1,
        {
          skipBlankLines: true,
        },
      ],

      'comma-spacing': [
        1,
        {
          before: false,
          after: true,
        },
      ],

      semi: 2,
      'semi-spacing': 1,
      'semi-style': [1, 'last'],
      'keyword-spacing': 1,
      'key-spacing': 1,
      'array-bracket-spacing': 1,
      'arrow-parens': [1, 'as-needed'],
      'arrow-spacing': 1,
      'block-spacing': 1,
      'func-call-spacing': 1,

      'brace-style': [
        1,
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],

      'space-before-blocks': 1,
      'space-before-function-paren': [1, 'never'],
      'space-in-parens': 1,
      'space-infix-ops': 1,

      'space-unary-ops': [
        1,
        {
          words: true,
          nonwords: false,

          overrides: {
            '+': true,
          },
        },
      ],

      'spaced-comment': 1,
      'rest-spread-spacing': 2,

      'no-multiple-empty-lines': [
        1,
        {
          max: 1,
          maxEOF: 0,
        },
      ],

      'newline-per-chained-call': 1,

      'object-curly-newline': [
        1,
        {
          ImportDeclaration: {
            multiline: true,
            minProperties: 5,
          },

          ExportDeclaration: {
            multiline: true,
            minProperties: 5,
          },
        },
      ],

      indent: [
        1,
        2,
        {
          SwitchCase: 1,
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      '@typescript-eslint/no-shadow': ['error'],
      'no-shadow': 'off',
      'no-undef': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(@|components)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
    },
  },
]);
