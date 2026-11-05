// The seven shell acceptance criteria as Playwright specs (w74 item 7f, Z.ai draft) — written BEFORE the first
// screen ships; they run against the slice that landed (folder 05) on the dev server.
//
// The four named in the brief: (1) no sideways scroll at 320→1920, (2) zero console errors, (3) pager works,
// (4) autosave survives reload. The remaining three are INFERRED picks from the w70-era shell batteries (DS's
// exact three are not in this session's record — flagged in the folder README): (5) keyboard-only play,
// (6) focus visible on every interactive element, (7) reduced-motion honored via the a11y boot read (item 5h).
import { test, expect } from '@playwright/test';

test('(1) no sideways scroll from 320 to 1920', async ({ page }) => {
  test.slow();   // five widths × boot + draft start
  for (const width of [320, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    // and the draft board, the densest screen:
    await page.getByRole('option').first().click();
    await page.getByRole('button', { name: 'Start the draft' }).click();
    const boardOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(boardOverflow, `board horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    await page.evaluate(() => localStorage.clear());   // the next width boots clean (autosave would resume)
  }
});

test('(2) zero console errors across boot, team select, draft and a pick', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/');
  await page.getByRole('option').first().click();
  await page.getByRole('button', { name: 'Start the draft' }).click();
  await page.locator('table.board tbody tr').first().getByRole('button', { name: 'Pick' }).click();
  await page.getByRole('button', { name: 'Undo last pick' }).click();
  expect(errors, errors.join('\n')).toEqual([]);
});

test('(3) the pager widens the board', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('option').first().click();
  await page.getByRole('button', { name: 'Start the draft' }).click();
  const rows = page.locator('table.board tbody tr');
  const before = await rows.count();
  await page.getByRole('button', { name: /Show more/ }).click();
  const after = await rows.count();
  expect(after, 'Show more must reveal more rows').toBeGreaterThan(before);
});

test('(4) autosave survives a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('option').first().click();
  await page.fill('#seed', '99');
  await page.getByRole('button', { name: 'Start the draft' }).click();
  await page.locator('table.board tbody tr').first().getByRole('button', { name: 'Pick' }).click();
  const filledBefore = await page.locator('[aria-label="Your roster"] li.filled').count();
  await page.reload();
  await expect(page.getByRole('status')).toContainText("You're on the clock");   // resumed, not back to Team Select
  const filledAfter = await page.locator('[aria-label="Your roster"] li.filled').count();
  expect(filledAfter).toBe(filledBefore);
});

test('(5) the draft is playable keyboard-only', async ({ page }) => {
  await page.goto('/');
  // Keyboard-only: focus + Enter, no pointer events anywhere.
  const team = page.getByRole('option').first();
  await team.focus();
  await page.keyboard.press('Enter');
  const start = page.getByRole('button', { name: 'Start the draft' });
  await start.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText("You're on the clock");
  const pick = page.locator('table.board tbody tr').first().getByRole('button', { name: 'Pick' });
  await pick.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[aria-label="Your roster"] li.filled')).not.toHaveCount(0);
});

test('(6) focus is visible on interactive elements', async ({ page }) => {
  await page.goto('/');
  const team = page.getByRole('option').first();
  await team.focus();
  const outline = await team.evaluate((el) => { el.focus(); const s = getComputedStyle(el); return s.outlineStyle !== 'none' || s.boxShadow !== 'none' || s.textDecorationLine !== 'none'; });
  expect(outline, 'a focused team choice must show a visible indicator').toBe(true);
});

test('(7) reduced motion is read at boot into state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html[data-a11y-reduced-motion="true"]')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await expect(page.locator('html[data-a11y-reduced-motion="false"]')).toHaveCount(1);
});
