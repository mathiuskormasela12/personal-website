import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // ~20 existing `any`s (axios errors, thunks). Typing them is out of scope for the upgrade.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['next.config.js', 'config/**/*.js', 'scripts/**/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
]);
