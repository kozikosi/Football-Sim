import { chromium } from '/Users/kosi/.npm-global/lib/node_modules/@playwright/test/index.mjs';
const dist = '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds/_agents/ds/deliveries/cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('file://' + dist + '?dev=1');
await page.waitForTimeout(1200);
const m = await page.evaluate(() => {
  const nav = document.querySelector('.cp-nav');
  const btns = [...nav.querySelectorAll('.cp-navbtn')];
  const tops = [...new Set(btns.map((b) => Math.round(b.getBoundingClientRect().top)))];
  return {
    buttons: btns.length,
    navHeight: Math.round(nav.getBoundingClientRect().height),
    rows: tops.length,
    firstRowTops: tops,
    viewport: window.innerWidth,
    docScrollW: document.documentElement.scrollWidth,
    docClientW: document.documentElement.clientWidth,
    bodyScrollH: document.documentElement.scrollHeight,
    firstScreenVisible: Math.round(document.querySelector('.cp-root').getBoundingClientRect().top),
  };
});
console.log(JSON.stringify(m, null, 2));
await browser.close();
