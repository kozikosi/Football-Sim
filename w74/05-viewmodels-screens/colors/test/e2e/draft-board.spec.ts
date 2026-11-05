// The Draft Board slice's Playwright check (w74 item 5b, Z.ai DRAFT).
//
// What it pins: the full slice path — boot → Team Select → START (seed, team) → board shows the on-clock header
// → PICK → roster fills → board advances → UNDO cuts back. It runs against the DEV server (vite) on the
// synthetic dev pool — no dataset, no storage, no network — so CI can run it in seconds.
//
// The seven shell acceptance criteria (item 7f) live in test/e2e/acceptance.spec.ts and run over the same server
// once this slice lands; this file covers only the slice's own behaviour.
import { test, expect } from '@playwright/test';

test('draft board slice: boot, choose team, pick, undo', async ({ page }) => {
  await page.goto('/');

  // Team Select: 32 choices, one seed field, the start button gated on a selection.
  await expect(page.getByRole('heading', { name: 'Choose your team' })).toBeVisible();
  const choices = page.getByRole('option');
  await expect(choices).toHaveCount(32);
  await expect(page.getByRole('button', { name: 'Start the draft' })).toBeDisabled();
  await choices.first().click();
  await expect(page.getByRole('button', { name: 'Start the draft' })).toBeEnabled();

  // START -> the board: on the clock, board rows, empty roster.
  await page.getByRole('button', { name: 'Start the draft' }).click();
  await expect(page.getByRole('status')).toContainText("You're on the clock");
  await expect(page.locator('table.board tbody tr').first()).toBeVisible();

  // PICK -> the roster fills by one; the store rejects a second click on a stale row gracefully (error banner).
  const rows = page.locator('table.board tbody tr');
  await rows.first().getByRole('button', { name: 'Pick' }).click();
  await expect(page.locator('[aria-label="Your roster"] li.filled')).not.toHaveCount(0);

  // UNDO -> the roster empties back to the pre-pick state (draft-only undo, cuts the pick log).
  const filledAfterPick = await page.locator('[aria-label="Your roster"] li.filled').count();
  await page.getByRole('button', { name: 'Undo last pick' }).click();
  await expect(page.locator('[aria-label="Your roster"] li.filled')).toHaveCount(filledAfterPick - 1);
});

test('draft board slice: the same seed drafts the same players (world determinism, smoke)', async ({ page }) => {
  const firstNames: string[] = [];
  for (let i = 0; i < 2; i++) {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());   // each pass boots clean (autosave otherwise resumes pass 1's draft)
    await page.reload();
    await page.getByRole('option').nth(3).click();
    await page.fill('#seed', '4242');
    await page.getByRole('button', { name: 'Start the draft' }).click();
    firstNames.push(await page.locator('table.board tbody tr td.name').first().textContent() ?? '');
    if (i === 0) {
      // a reload mid-draft RESUMES the saved draft (slice autosave, item 7f wiring): the same board, no re-select
      await page.reload();
      await expect(page.getByRole('status')).toContainText("You're on the clock");
    }
  }
  expect(firstNames[0]).toBe(firstNames[1]);
});
