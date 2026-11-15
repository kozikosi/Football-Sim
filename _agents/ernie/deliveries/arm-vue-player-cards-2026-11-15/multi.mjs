import { chromium } from 'playwright';
const dir = process.argv[2];
const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const runs = [];
for (let i = 0; i < 5; i++) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto('file://' + dir + '/dist/index.html', { waitUntil: 'load' });
  await page.waitForSelector('.pcard', { timeout: 8000 });
  runs.push(Date.now() - t0);
  await ctx.close();
}
await browser.close();
runs.sort((a,b)=>a-b);
console.log(JSON.stringify({ dir: dir.split('/').pop(), runs, median: runs[2], min: runs[0], max: runs[4] }));
