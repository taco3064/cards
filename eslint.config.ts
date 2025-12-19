import globals from 'globals';
import imports from 'eslint-plugin-import';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import structure from './eslint.structure';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      import: imports,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: 'const', next: 'expression' },
        { blankLine: 'always', prev: 'let', next: 'expression' },
        { blankLine: 'always', prev: 'class', next: '*' },
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
        { blankLine: 'always', prev: 'multiline-let', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
        { blankLine: 'always', prev: '*', next: 'multiline-const' },
        { blankLine: 'always', prev: '*', next: 'multiline-let' },
        { blankLine: 'always', prev: '*', next: 'break' },
        { blankLine: 'always', prev: '*', next: 'continue' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'throw' },
      ],
    },
  },
  ...structure.createConfig({
    appAlias: '~app',
    files: (folder) => [`src/${folder}/**/*.ts`, `src/${folder}/**/*.tsx`],
    folders: [
      'components',
      'containers',
      'contexts',
      'hooks',
      'icons',
      'layouts',
      'pages',
      'styles',
    ],
    dependencyRules: {
      components: ['containers', 'contexts', 'layouts', 'pages'],
      containers: ['layouts', 'pages'],
      hooks: ['components', 'containers', 'icons', 'layouts', 'pages', 'styles'],
      icons: ['components', 'containers', 'contexts', 'hooks', 'layouts', 'pages'],
      layouts: ['pages'],
      styles: [
        'components',
        'containers',
        'contexts',
        'hooks',
        'icons',
        'layouts',
        'pages',
      ],
      contexts: {
        overrideRules: {
          'react-refresh/only-export-components': 'off',
        },
        disableFolderImports: [
          'components',
          'containers',
          'hooks',
          'icons',
          'layouts',
          'pages',
          'styles',
        ],
      },
    },
    packageImportRules: [
      {
        name: 'react',
        importNames: ['createContext'],
        disableFolderImports: [
          'components',
          'containers',
          'hooks',
          'icons',
          'layouts',
          'pages',
          'styles',
        ],
      },
      {
        name: 'react',
        importNames: ['useContext'],
        disableFolderImports: [
          'components',
          'containers',
          'contexts',
          'icons',
          'layouts',
          'pages',
          'styles',
        ],
      },
      {
        name: 'react-router-dom',
        disableFolderImports: ['components', 'icons'],
      },
      {
        name: 'zustand',
        disableFolderImports: [
          'components',
          'containers',
          'contexts',
          'icons',
          'layouts',
          'pages',
          'styles',
        ],
      },
    ],
  }),
]);
