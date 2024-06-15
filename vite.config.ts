/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: ['vitest.setup.ts'],
    clearMocks: true,
    environment: 'jsdom',
  },
  base: '/sudoku',
});
