import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req(process.argv[4] === 'vue' ? 'playwright' : 'playwright');
const browser = await pw.chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.goto(pathToFileURL(process.cwd() + '/' + process.argv[2]).href);
await page.waitForSelector('[data-testid="app-shell"]');
await page.click('[data-testid="nav-cards"]');
await page.waitForTimeout(150);
const counts = await page.evaluate(() => {
  const m = {};
  for (const el of document.querySelectorAll('*')) m[el.tagName] = (m[el.tagName] ?? 0) + 1;
  return m;
});
console.log(JSON.stringify(counts));
await browser.close();
