import comments from '@eslint-community/eslint-plugin-eslint-comments';
import globals from 'globals';
import imports from 'eslint-plugin-import-x';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import type { ESLint } from 'eslint';

import { emitLint } from '@kekkai/blueprint';
import blueprint from './blueprint.config.mjs';

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
  },
  // Structural rules, metric gates and per-layer overrides compiled from
  // blueprint.config.mjs. Goes last: later entries win in flat config, so the
  // blueprint's per-layer tuning stays alive over the broad presets above.
  ...emitLint(blueprint, {
    typescript: tseslint.plugin,
    // Stylistic supports ESLint 10 at runtime but publishes legacy rule-context types.
    stylistic: stylistic as ESLint.Plugin,
    imports,
  }),
  // Anti-bypass guard — a bare eslint-disable routes around every rule above,
  // so each one has to carry a scope and a `-- reason`.
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@eslint-community/eslint-comments': comments,
    },
    rules: {
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
      '@eslint-community/eslint-comments/require-description': 'error',
    },
  },
]);
