import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.goto(pathToFileURL(process.cwd() + '/dist/index.html').href);
await page.waitForSelector('[data-testid="app-shell"]');
await page.click('[data-testid="nav-feed"]');
await page.waitForTimeout(300);
const info = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="feed"]');
  if (!el) return { exists: false };
  const r = el.getBoundingClientRect();
  return { exists: true, w: r.width, h: r.height, kids: el.children.length, display: getComputedStyle(el).display };
});
console.log(JSON.stringify(info));
await browser.close();
