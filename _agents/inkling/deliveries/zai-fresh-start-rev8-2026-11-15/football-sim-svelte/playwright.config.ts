import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['tests/**/*.spec.ts'],
  use: {
    baseURL: 'http://localhost:5174'
  },
  webServer: {
    command: 'npm run dev -- --port 5174 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: false
  }
});
