// Z-post-blue v16 verification: the Owner's 17-row flex chart renders in the Guide, engine untouched
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/build_w16.html';
const OUT = '/home/z/my-project/w16ref/evidence';
const fails = [];
const ok = (name, cond, extra = '') => { console.log(`[${cond ? 'ok' : 'FAIL'}] ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fails.push(name); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 200)));
  await page.goto(FILE); await sleep(1500);

  // 1. engine byte-truth inside the live page: flexPenaltyFor still reports OLD math
  const eng = await page.evaluate(() => ({
    qbRB: flexPenaltyFor('QB', 'RB1'),       // old math 6 (new chart has no QB->RB row at all)
    rbFB: flexPenaltyFor('HB', 'FB'),        // old math: natural slot -> 0 (new chart will say -2; Claude's engine lands later)
    teRB: flexPenaltyFor('TE', 'RB2'),       // old math 4 (new chart says -6)
    ssCB: flexPenaltyFor('SS', 'CB1'),       // old math 4 (new chart says -6)
    kP:   flexPenaltyFor('K', 'P'),          // old math 0
    pK:   flexPenaltyFor('P', 'K')           // old math 0 (new chart says -4)
  }));
  ok('engine untouched: QB->RB still 6', eng.qbRB === 6, String(eng.qbRB));
  ok('engine untouched: RB->FB still natural (0)', eng.rbFB === 0, String(eng.rbFB));
  ok('engine untouched: TE->RB still 4', eng.teRB === 4, String(eng.teRB));
  ok('engine untouched: SS->CB still 4', eng.ssCB === 4, String(eng.ssCB));
  ok('engine untouched: K<->P still free', eng.kP === 0 && eng.pK === 0);

  // 2. the Guide tree shows the NEW 17-row chart
  await page.evaluate("document.getElementById('tabGuideBtn').click()"); await sleep(1200);
  const tree = await page.evaluate(() => {
    const ul = document.querySelector('.zpb-flextree');
    if (!ul) return null;
    const fams = [...ul.querySelectorAll(':scope > li > .zpb-ftnode')].map(n => n.textContent.trim());
    const chips = [...ul.querySelectorAll('li .zpb-ftchip')].map(c => c.textContent.replace(/\s+/g, ' ').trim());
    const clsOf = c => [...c.classList].find(x => x.startsWith('zpb-ft-'));
    const rows = [...ul.querySelectorAll(':scope > li')].map(li => ({
      fam: li.querySelector('.zpb-ftnode').textContent.trim(),
      chips: [...li.querySelectorAll('.zpb-ftchip')].map(c => ({ t: c.textContent.replace(/\s+/g, ' ').trim(), cls: clsOf(c) }))
    }));
    return { fams, nChips: chips.length, rows };
  });
  ok('tree renders', !!tree);
  ok('17 families', tree && tree.fams.length === 17, tree && tree.fams.join(' | '));
  const want = {
    'Quarterback': ['−6 · WR, S'],
    'Running Back': ['−2 · FB', '−4 · WR', '−6 · S'],
    'Fullback': ['−4 · RB, TE'],
    'Wide Receiver': ['−4 · RB, TE, S', '−6 · CB'],
    'Tight End': ['−2 · WR, FB', '−6 · RB, C, OG, OT, DE, DT, LB, S'],
    'Offensive Tackle': ['FREE · OG, C', '−4 · DT, FB'],
    'Offensive Guard': ['FREE · C', '−4 · OT, DT, FB'],
    'Center': ['FREE · OG', '−4 · OT, DT, FB'],
    'Defensive Tackle': ['−4 · OG, C, DE, FB', '−6 · OT'],
    'Defensive Edge': ['−2 · DT, WILL, SAM, OLB', '−4 · MIKE, ILB', '−6 · TE, RB'],
    'MIKE / ILB': ['FREE · ILB, WILL, SAM, OLB', '−4 · DT, FB', '−6 · DE, TE, S'],
    'WILL / SAM / OLB': ['FREE · OLB, WILL, SAM', '−2 · MIKE', '−4 · DE', '−6 · DT, TE, S, FB'],
    'Strong Safety': ['FREE · Nickel', '−2 · FS', '−4 · WILL, SAM, OLB', '−6 · CB, MIKE, WR, TE, RB, FB'],
    'Free Safety': ['FREE · Nickel', '−2 · SS', '−4 · CB, WR'],
    'Cornerback': ['FREE · FS, Nickel', '−2 · SS', '−4 · WR'],
    'Kicker': ['FREE · P'],
    'Punter': ['−4 · K']
  };
  let chipOk = true, clsOk = true;
  const clsFor = t => t.startsWith('FREE') ? 'zpb-ft-free' : t.startsWith('−2') ? 'zpb-ft-2' : t.startsWith('−4') ? 'zpb-ft-4' : 'zpb-ft-6';
  (tree ? tree.rows : []).forEach(r => {
    const w = want[r.fam];
    if (!w) { chipOk = false; console.log('   unexpected family:', r.fam); return; }
    const got = r.chips.map(c => c.t);
    if (JSON.stringify(got) !== JSON.stringify(w)) { chipOk = false; console.log('   mismatch', r.fam, JSON.stringify(got)); }
    r.chips.forEach(c => { if (c.cls !== clsFor(c.t)) clsOk = false; });
  });
  ok('every family reads the Owner tiers verbatim', chipOk);
  ok('chip classes map FREE/−2/−4/−6 correctly', clsOk);
  ok('stale old rows gone from DOM', tree && !tree.fams.includes('Full Back') && tree.fams.length === 17);

  // 3. cascade look: gold FREE -> wine −6 (style-guide palette only)
  const colors = await page.evaluate(() => {
    const pick = cls => { const el = document.querySelector('.' + cls); return el ? getComputedStyle(el).backgroundColor : null; };
    return { free: pick('zpb-ft-free'), two: pick('zpb-ft-2'), four: pick('zpb-ft-4'), six: pick('zpb-ft-6') };
  });
  ok('FREE chip colored gold family', colors.free && colors.free !== colors.six, JSON.stringify(colors));

  // 4. screenshots (desktop + mobile) of the chart section
  await page.evaluate("document.querySelector('.zpb-flextree').scrollIntoView({block:'center'})"); await sleep(600);
  await page.screenshot({ path: OUT + '/w16-guide-flextree-desktop.png' });
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, is_mobile: true, has_touch: true });
  mob.on('pageerror', e => errors.push('mobile pageerror: ' + String(e).slice(0, 200)));
  await mob.goto(FILE); await sleep(1500);
  await mob.evaluate("document.getElementById('tabGuideBtn').click()"); await sleep(1200);
  await mob.evaluate("document.querySelector('.zpb-flextree').scrollIntoView({block:'start'})"); await sleep(600);
  await mob.screenshot({ path: OUT + '/w16-guide-flextree-mobile.png' });
  await mob.evaluate("window.scrollBy(0, 700)"); await sleep(600);
  await mob.screenshot({ path: OUT + '/w16-guide-flextree-mobile2.png' });

  ok('zero console errors', errors.length === 0, errors.join(' ; '));
  await browser.close();
  if (fails.length) { console.log('SUITE FAILED: ' + fails.length); process.exit(1); }
  console.log('SUITE PASSED: flex chart live, engine pinned');
})();
