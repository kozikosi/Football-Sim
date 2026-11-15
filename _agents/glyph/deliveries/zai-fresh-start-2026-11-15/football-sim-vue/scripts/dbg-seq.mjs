import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', String(e).slice(0, 300)));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text().slice(0, 200)); });
await page.goto(pathToFileURL(process.cwd() + '/dist/index.html').href);
await page.waitForSelector('[data-testid="app-shell"]');
for (const n of ['nav-cards', 'nav-stats', 'nav-board', 'nav-feed', 'nav-week', 'nav-settings']) {
  await page.click('[data-testid="' + n + '"]');
  await page.waitForTimeout(150);
  const seen = await page.evaluate(() => [...document.querySelectorAll('main [data-testid]')].slice(0, 2).map((e) => e.getAttribute('data-testid')));
  console.log(n, '->', JSON.stringify(seen), '| feed?', await page.locator('[data-testid="feed"]').count(), '| week?', await page.locator('[data-testid="week-label"]').count(), '| set?', await page.locator('[data-testid="set-state"]').count());
}
await browser.close();
