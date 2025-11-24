import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

import { name } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV !== 'production' ? '/' : `/${name}`,
  server: {
    open: true,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tsconfigPaths(),
  ],
});
