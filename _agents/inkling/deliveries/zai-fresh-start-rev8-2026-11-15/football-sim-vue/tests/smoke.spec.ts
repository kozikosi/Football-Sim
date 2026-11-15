import { test, expect } from '@playwright/test';

test('smoke: app boots and exposes __pinia', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('http://localhost:5173');
  expect(res?.status()).toBe(200);

  const hasHook = await page.evaluate(() => typeof (window as any).__pinia !== 'undefined');
  expect(hasHook).toBe(true);
  expect(errors).toEqual([]);
});
