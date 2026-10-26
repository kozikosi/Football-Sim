// v15 probe: quantify 'vanishing players' on Team Comparison (static) + fade behavior + 3-4 toggle effect
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/work-v15.html';
const sleep = ms => new Promise(r=>setTimeout(r,ms));
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:1280,height:2400} });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.goto(FILE); await sleep(900);

  // open Team Comparison via the footer
  await page.locator('#tabCompareBtn').click(); await sleep(900);

  const scan = () => page.evaluate(() => {
    const cells = [...document.querySelectorAll('#homeCmpResult .zpb-lu-cell')];
    const dash = cells.filter(c => c.textContent.trim()==='—').length;
    const panels = [...document.querySelectorAll('#homeCmpResult .panel')].map(p => ({
      cls: p.className.includes('zpb-fade'), op: getComputedStyle(p).opacity }));
    const names = cells.filter(c => c.textContent.trim()!=='—').length;
    return { total: cells.length, dash, names, panels };
  });

  const base = await scan();
  console.log('BASE (4-3):', JSON.stringify(base));

  // try every pair quickly: count dash cells per team across all 32 (render each team as A)
  const perTeam = await page.evaluate(async () => {
    const teams = [...document.querySelectorAll('#homeCmpA option')].map(o=>o.value);
    const out = [];
    const selA = document.getElementById('homeCmpA');
    for(const t of teams){
      selA.value = t; selA.dispatchEvent(new Event('change',{bubbles:true}));
      await new Promise(r=>setTimeout(r,30));
      const cells = [...document.querySelectorAll('#homeCmpResult .zpb-lu-cell')];
      const left = cells.filter(c=>c.classList.contains('zpb-lu-l'));
      out.push([t, left.filter(c=>c.textContent.trim()==='—').length]);
    }
    return out;
  });
  console.log('DASH CELLS PER TEAM (left column):', JSON.stringify(perTeam));

  // 3-4 toggle effect (persisted in localStorage)
  await page.evaluate(() => { localStorage.setItem('zpbBase34','1'); });
  await page.reload(); await sleep(900);
  await page.locator('#tabCompareBtn').click(); await sleep(900);
  const b34 = await scan();
  console.log('3-4 ON:', JSON.stringify(b34));
  await page.evaluate(() => { localStorage.removeItem('zpbBase34'); });

  // fade probe: scroll down and back up fast on the compare page, then check opacities
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(200);
  const fadeState = await page.evaluate(() =>
    [...document.querySelectorAll('.zpb-fade')].map(el => ({ op: getComputedStyle(el).opacity, in: el.classList.contains('zpb-fade-in'), tag: (el.querySelector('h4')||{}).textContent || el.className.slice(0,30) })));
  console.log('FADE ELEMENTS ON PAGE:', JSON.stringify(fadeState));

  console.log('PAGE ERRORS:', errors.length ? errors.slice(0,5) : 'none');
  await browser.close();
})().catch(e => { console.error('PROBE CRASH:', e); process.exit(2); });
