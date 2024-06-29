/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: ['vitest.setup.ts', '@vitest/web-worker'],
    clearMocks: true,
    environment: 'jsdom',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      include: ['src'],
    },
  },
  base: '/sudoku',
});
