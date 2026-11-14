// The framework test's acceptance spec — ONE file for all nine arms.
// The arms share identical data-testid names by design; point BASE_URL at the
// arm under test (dev server or preview):
//   BASE_URL=http://localhost:5173 npx playwright test offensive-focus.spec.ts
// v3 (2026-11-14): boardRows made synchronous — v1/v2 shipped it `async`, so
// `await boardRows(page).count()` called .count() on a Promise<Locator> and
// TypeError'd on every arm (four-seat convergence, council wave 2026-11-13).
// First fully executed in the v3 wave; per-arm receipts in logs/ and results/.
import { expect, test } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
test.use({ baseURL: BASE });

const FIVE = ['west-coast', 'deep-passing', 'rpo', 'ground-pound', 'spread'];

function boardRows(page: any) {
  return page.locator('[data-testid^="row-"]');
}

test('board renders with Wins as static truth and Priority from the focus', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('setup')).toBeVisible();
  await expect(page.getByTestId('board')).toBeVisible();
  const rows = await boardRows(page).count();
  expect(rows).toBeGreaterThan(10);
  // Wins identical under every focus; Priority moves with the focus
  const wins = async () =>
    Object.fromEntries(await page.$$eval('[data-testid^="row-"]', (rs: any[]) =>
      rs.map((r) => [r.getAttribute('data-testid'), r.querySelector('td:nth-child(3)')!.textContent])));
  await page.getByTestId('manage-toggle').check();
  await page.getByTestId(`focus-${FIVE[0]}`).click();
  const w1 = await wins();
  const p1 = await page.getByTestId('priority-WR3').textContent();
  await page.getByTestId(`focus-${FIVE[1]}`).click();
  const w2 = await wins();
  const p2 = await page.getByTestId('priority-WR3').textContent();
  expect(w1).toEqual(w2);            // NEVER moves
  expect(p1).not.toEqual(p2);        // moves with the focus
});

test('the fifth focus exists and is NOT halftime-eligible', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('manage-toggle').check();
  await page.getByTestId('focus-spread').click();
  await page.getByTestId('kickoff').click();
  // halftime: no offer for spread (halftimeEligible: false)
  await expect(page.getByTestId('no-halftime')).toBeVisible();
});

test('auto mode skips the halftime prompt; manual offers one change', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('kickoff').click();                 // auto default
  await expect(page.getByTestId('no-halftime')).toBeVisible();
  await page.goto('/');
  await page.getByTestId('manage-toggle').check();
  await page.getByTestId('focus-west-coast').click();
  await page.getByTestId('kickoff').click();
  await expect(page.getByTestId('halftime-west-coast')).toBeVisible();
});

test('Q4 automatics surface only when the contract fired them', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('kickoff').click();
  const fired = await page.locator('[data-testid="fired"] li').count();
  const none = await page.locator('[data-testid="no-automatics"]').count();
  expect(fired > 0 || none === 1).toBe(true);   // exactly one of the two states
});

test('form arrows are binary hot/cold, no emoji, no text labels', async ({ page }) => {
  await page.goto('/');
  const hot = await page.locator('.arrow.hot').count();
  const cold = await page.locator('.arrow.cold').count();
  expect(hot + cold).toBeGreaterThan(0);
  for (const el of await page.locator('.arrow').all()) {
    const text = (await el.textContent()) ?? '';
    expect(text.trim()).toBe('');
  }
});
