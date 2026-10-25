const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const sleep = ms => new Promise(r=>setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1400);
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = [...sel.options].find(o=>o.textContent.includes('Ravens')).value;
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await page.locator('#startDraftBtn').click(); await sleep(1800);
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if(b) b.click(); });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x=>/sim to end/i.test(x.textContent)); if(b) b.click(); });
  await sleep(3500);
  const dbg = await page.evaluate(() => {
    const host = document.getElementById('seasonHost');
    return {
      pos: draftSim ? draftSim.pos : 'none',
      orderLen: draftSim ? draftSim.order.length : 'none',
      seasonState: !!seasonState,
      hostExists: !!host,
      hostHTML: host ? host.innerHTML.slice(0,120) : null,
      hasBtn: !!document.getElementById('startSeasonHeroBtn'),
      activeView: document.querySelector('.view.active') ? document.querySelector('.view.active').id : null,
    };
  });
  console.log(JSON.stringify(dbg, null, 1));
  await page.evaluate(() => { goSeason(); });
  await sleep(800);
  console.log('after goSeason:', await page.evaluate(() => ({
    hasBtn: !!document.getElementById('startSeasonHeroBtn'),
    hostHTML: (document.getElementById('seasonHost')||{}).innerHTML ? document.getElementById('seasonHost').innerHTML.slice(0,100) : null,
    activeView: document.querySelector('.view.active') ? document.querySelector('.view.active').id : null,
  })));
  console.log('errors:', errors.slice(0,3));
  await browser.close();
})();
