import { test, expect } from '@playwright/test';

test('smoke: app boots and exposes __SIM_STATE__', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('http://localhost:5174');
  expect(res?.status()).toBe(200);

  await page.waitForFunction(() => typeof (window as any).__SIM_STATE__ !== 'undefined');
  expect(errors).toEqual([]);
});
