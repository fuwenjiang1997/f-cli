import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import importSort from 'eslint-plugin-simple-import-sort'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['*.js', '**/*/dist/**/*', 'packages/cli/templates/**/*'],
  },
  {
    files: ['**/*.{ts,js,tsx}'],
    plugins: {
      'simple-import-sort': importSort
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node
      },
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.eslint.json'],
        tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url))
      },
    },
    rules: {
      // 'no-console': 'error',
      // 'no-require-imports': 'off',
      // 'no-undef': 'warn',

      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'no-console': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\w'],
            ['^@\\w'],
            ['^@/'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  }
]