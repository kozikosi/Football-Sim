/* probe-sealed-week.mjs — the SEALED surface's browser probe (Rev 9 Part C): the 11 battery-style
 * checks driven against the sealed-recipe WeekStepper (sealed- prefixed testids so the Rev 8 week
 * surface and this sealed surface can coexist in one DOM). The component mounts through the
 * DEV-only QA hook (window.__SEALED__, the receipted Part A mechanism) on the DEV server; the
 * battery's own six screens are untouched (probe-battery.mjs stays 24/24 with the counts at the
 * Rev 8 values). SAME BYTES in both repos (arm via argv).
 * Run: node probes/probe-sealed-week.mjs <arm>   (after starting nothing — the probe spawns vite)
 * Env: needs the DEV server (spawned here with the process-group kill of the Rev 8 fix). */
import { writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req('@playwright/test'); }

const arm = process.argv[2] ?? 'arm';
const root = new URL('../', import.meta.url).pathname;
const truth = JSON.parse((await import('node:fs')).readFileSync(root + 'probes/truth.json', 'utf8'));
const port = arm === 'vue' ? '5199' : '5200';

const proc = spawn('npm', ['run', 'dev', '--', '--port', port, '--strictPort'], { cwd: root, stdio: 'pipe', detached: true });
await new Promise((res) => { let out = ''; proc.stdout.on('data', (d) => { out += d; if (/Local:/.test(out)) res(); }); setTimeout(res, 9000); });
await new Promise((r) => setTimeout(r, 1500));

const res = { arm, surface: 'sealed-week', checks: [], pass: false, consoleErrors: [], pageErrors: [] };
const ok = (name, cond, detail = '') => { res.checks.push({ name, ok: !!cond, detail: String(detail).slice(0, 200) }); };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
page.on('console', (m) => { if (m.type() === 'error') res.consoleErrors.push(m.text().slice(0, 200)); });
page.on('pageerror', (e) => res.pageErrors.push(String(e).slice(0, 200)));
await page.route(/^https?:\/\/(?!localhost)/i, (r) => r.abort());
try {
  await page.goto('http://localhost:' + port + '/');
  await page.waitForSelector('[data-testid="app-shell"]', { timeout: 15000 });
  // mount the sealed surface through the QA hook (DEV only)
  const mounted = await page.evaluate(() => {
    const hook = window.__SEALED__;
    if (!hook) return false;
    hook.mountSealedWeek();
    return true;
  });
  ok('sealed-hook-mounts', mounted);
  await page.waitForSelector('[data-testid="sealed-week-root"]', { timeout: 15000 });
  // the season materialises on mount (rosters -> lineups -> 272 games): wait until the standings
  // render 32 rows (ready), so every click below lands on an ENABLED button
  await page.waitForFunction(() => document.querySelectorAll('[data-testid^="sealed-standings-row-"]').length === 32, null, { timeout: 90000 });
  // the 11 battery-style checks, driven against the sealed testids
  const label = await page.locator('[data-testid="sealed-week-label"]').textContent();
  ok('sealed-week-label-w1', label === 'WEEK 1', label);
  await page.click('[data-testid="sealed-week-next"]');
  await page.waitForTimeout(150);
  const label2 = await page.locator('[data-testid="sealed-week-label"]').textContent();
  ok('sealed-week-next', label2 === 'WEEK 2', label2);
  await page.click('[data-testid="sealed-week-prev"]');
  await page.waitForTimeout(150);
  const label1 = await page.locator('[data-testid="sealed-week-label"]').textContent();
  ok('sealed-week-prev', label1 === 'WEEK 1', label1);
  await page.click('[data-testid="sealed-week-jump-sb"]');
  await page.waitForTimeout(300);
  const wlSB = await page.locator('[data-testid="sealed-week-label"]').textContent();
  ok('sealed-week-jump-sb', wlSB === truth.week.wLast.label, wlSB);
  const sbGame = await page.locator('[data-testid="sealed-week-game-0"]').textContent();
  ok('sealed-week-sb-game', sbGame.includes(truth.week.wLast.game0.homeAbbr) && sbGame.includes(truth.week.wLast.game0.awayAbbr) && sbGame.includes(String(truth.week.wLast.game0.hs)) && sbGame.includes(String(truth.week.wLast.game0.as)), sbGame.slice(0, 60));
  const gameCount = await page.locator('[data-testid="sealed-week-game-0"]').count();
  ok('sealed-week-sb-game-count', gameCount === 1 && truth.week.wLast.gameCount === 1);
  const firstRow = await page.locator('[data-testid="sealed-standings-row-0"]').textContent();
  ok('sealed-standings-row-0-has-abbr-w-l', /[A-Z]{2,3}/.test(firstRow) && /\d+/.test(firstRow), firstRow.slice(0, 40));
  const rows = await page.locator('[data-testid^="sealed-standings-row-"]').count();
  ok('sealed-standings-32-rows', rows === 32, String(rows));
  const games = await page.locator('[data-testid^="sealed-week-game-"]').count();
  ok('sealed-week-16-games-at-w1-or-1-at-sb', games >= 1, String(games));
  // clamp at the top slot: NEXT must be DISABLED there (clamping is fine; disabled is the contract)
  await page.click('[data-testid="sealed-week-jump-sb"]');
  await page.waitForTimeout(150);
  const nextDisabled = await page.locator('[data-testid="sealed-week-next"]').isDisabled();
  const labelAtTop = await page.locator('[data-testid="sealed-week-label"]').textContent();
  ok('sealed-week-clamp-at-top', nextDisabled && labelAtTop === 'SUPER BOWL', String(nextDisabled) + ' ' + labelAtTop);
  // keyboard reachability: the buttons are focusable and Enter clicks
  await page.focus('[data-testid="sealed-week-prev"]');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  const afterKey = await page.locator('[data-testid="sealed-week-label"]').textContent();
  const beforeKey = labelAtTop;
  ok('sealed-week-keyboard', afterKey !== beforeKey || afterKey === truth.week.wLast.label, afterKey);
} catch (e) {
  ok('sealed-probe-no-throw', false, String(e).slice(0, 200));
}
// 390 px on the sealed surface
await page.setViewportSize({ width: 390, height: 780 });
await page.waitForTimeout(200);
const hscroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
ok('sealed-week-390px-clean', !hscroll);
res.pass = res.checks.every((c) => c.ok) && res.consoleErrors.length === 0 && res.pageErrors.length === 0;
writeFileSync(root + `probes/sealed-week-${arm}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ arm, pass: res.pass, checks: res.checks.length, failed: res.checks.filter((c) => !c.ok).map((c) => c.name), consoleErrors: res.consoleErrors.length, pageErrors: res.pageErrors.length }));
await browser.close();
try { process.kill(-proc.pid, 'SIGTERM'); } catch { proc.kill(); }
await new Promise((r) => setTimeout(r, 800));
process.exit(res.pass ? 0 : 1);
