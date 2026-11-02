const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const sleep = ms => new Promise(r=>setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.goto(FILE); await sleep(1400);
  await page.evaluate(() => setActiveTab('viewGuide','tabGuideBtn'));
  await sleep(1500);
  const out = await page.evaluate(() => {
    const g = document.getElementById('guideBody');
    const sums = [...g.querySelectorAll('summary')].map(s=>s.textContent.trim());
    return { sums, has28: g.textContent.includes('all 28'), has26: g.textContent.includes('all 26') };
  });
  console.log(JSON.stringify(out, null, 1));
  console.log('errors:', errors.slice(0,3));
  await browser.close();
})();
