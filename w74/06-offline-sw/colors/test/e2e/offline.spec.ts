// Offline acceptance: airplane-mode CI run (w74 item 6b, Z.ai DRAFT — GLM's 1d proposal).
//
// What it pins: with the network FULLY DOWN, a cold load boots the app from the service worker's precache and
// the draft is playable (GLM's bar: "assert the app boots and finishes a draft from cache"). Runs against the
// PREVIEW server (the production build with the generated sw.js), never the dev server — the SW only exists in
// builds. Preconditions: `npx playwright test` starts `vite preview` (see config note below); the SW registers
// on load, so the test first loads ONLINE to install the SW, then goes offline and cold-reloads.
import { test, expect } from '@playwright/test';

test('airplane mode: the app boots and the draft is playable from cache', async ({ page, context }) => {
  // 1. Warm pass (online): boot, start a draft, pick once — the SW installs during this load.
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Choose your team' })).toBeVisible();
  const swReady = await page.evaluate(async () => {
    if (!navigator.serviceWorker) return false;
    await navigator.serviceWorker.ready;
    // Poll for the precache to EXIST (direct, no messaging dependency): the generated SW names its cache
    // colors-<buildHash>-v<manifestVersion> and fills it during install (tools/vite-plugin-sw.mjs).
    for (let i = 0; i < 20; i++) {
      const keys = await caches.keys();
      const mine = keys.find((k) => k.startsWith('colors-'));
      if (mine) {
        const c = await caches.open(mine);
        const n = (await c.keys()).length;
        if (n >= 2) return true;                      // shell + assets are in
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    return false;
  });
  expect(swReady, 'service worker precache did not report ready').toBe(true);

  await page.getByRole('option').first().click();
  await page.fill('#seed', '1717');
  await page.getByRole('button', { name: 'Start the draft' }).click();
  await expect(page.getByRole('status')).toContainText("You're on the clock");
  await page.locator('table.board tbody tr').first().getByRole('button', { name: 'Pick' }).click();
  await expect(page.locator('[aria-label="Your roster"] li.filled').first()).toBeVisible();

  // 2. Airplane mode ON, COLD reload: no network at all — the shell, the JS and the assets come from cache.
  //    The slice autosave resumes the in-progress draft (the strongest version of GLM's bar: not just boot —
  //    the draft you were playing continues from cache).
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('status')).toContainText("You're on the clock", { timeout: 15_000 });

  // 3. The draft is playable offline: two picks and an undo — engine, store and UI all ran from the cache.
  const rows = page.locator('table.board tbody tr');
  await rows.first().getByRole('button', { name: 'Pick' }).click();
  await rows.first().getByRole('button', { name: 'Pick' }).click();
  await page.getByRole('button', { name: 'Undo last pick' }).click();
  await expect(page.locator('[aria-label="Your roster"] li.filled')).toHaveCount(1);
});
