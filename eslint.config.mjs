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
    ignores: ['**/dist', 'node_modules/**', '**/*.d.ts', 'packages/cli/templates'],
  },
  {
    files: ['**/*.{ts,js,tsx}'],
    ignores: ['*.js'],
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
      'no-console': 'error',
      'no-require-imports': 'off',
      'no-undef': 'warn',
    }
  }
]