// Playwright config for the Draft Board slice (w74 item 5b, Z.ai DRAFT).
// Dev server on a fixed port; no build step needed for CI (the slice check runs in seconds on the dev pool).
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  testIgnore: ['**/offline.spec.ts'],   // the offline spec needs the preview build: playwright.offline.config.ts
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://127.0.0.1:5199',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5199 --strictPort',
    url: 'http://127.0.0.1:5199',  // host pinned: vite 8 binds ::1 only without --host
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
