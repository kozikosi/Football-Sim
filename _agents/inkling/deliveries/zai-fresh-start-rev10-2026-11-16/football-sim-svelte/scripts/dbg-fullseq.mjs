import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', String(e).slice(0, 400)));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE-ERR', m.text().slice(0, 250)); });
await page.route(/^https?:\/\//i, (r) => r.abort());
await page.goto(pathToFileURL(process.cwd() + '/dist/index.html').href);
await page.waitForSelector('[data-testid="app-shell"]', { timeout: 8000 });
const goNav = async (t) => { await page.click('[data-testid="' + t + '"]'); await page.waitForTimeout(120); };
// cards
await goNav('nav-cards');
await page.waitForSelector('[data-testid="row-nfl-p00061"]');
// stats + sort click (battery does this)
await goNav('nav-stats');
await page.waitForSelector('[data-testid="stats-table"]');
await page.click('[data-testid="stats-sort-ovr"]');
await page.waitForTimeout(150);
console.log('after sort: rows', await page.locator('[data-testid^="stats-row-"]').count());
// board
await goNav('nav-board');
await page.waitForSelector('[data-testid="row-nfl-p00061"]');
console.log('board rows', await page.locator('[data-testid^="row-"]').count());
// feed (the failing step)
await goNav('nav-feed');
const appeared = await page.waitForSelector('[data-testid="feed"]', { timeout: 8000 }).then(() => true).catch(() => false);
console.log('feed appeared:', appeared);
if (!appeared) {
  console.log('main HTML:', (await page.evaluate(() => document.querySelector('main')?.innerHTML.slice(0, 400))));
  console.log('nav-feed visible:', await page.locator('[data-testid="nav-feed"]').isVisible());
}
await browser.close();
