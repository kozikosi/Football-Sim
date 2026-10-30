const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file:///home/z/my-project/w36/Football-Sim-Z-post-blue-w36.html');
  await page.waitForTimeout(1500);
  for (const [b, v] of [['tabDraftBtn','draft'],['tabGroupsBtn','groups'],['tabPlayersBtn','browser'],['tabCompareBtn','compare'],['tabGuideBtn','guide']]) {
    await page.evaluate(x => document.getElementById(x).click(), b);
    await page.waitForTimeout(600);
    const ov = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    console.log(`${v}: overflow=${ov}px ${errs.length ? 'pageerrors:' + errs.length : ''}`);
  }
  await browser.close();
  process.exit(errs.length ? 1 : 0);
})();
