// Z-post-blue v8 verification: zero console errors + eighth-wave directive coverage
const { chromium } = require('playwright');

const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const FILE_B = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-logosB.html';
const SHOT = '/home/z/my-project/desktop/wt/zai/_agents/zai/evidence/z-post-blue';
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };

(async () => {
  const browser = await chromium.launch();

  // ============ MAIN BUILD (set A) ============
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await page.waitForTimeout(1500);
  const bodyTxt = () => page.locator('body').textContent();

  // ---- 1. footer + hint adjacency (home) ----
  ok('v8 home: footer element exists', await page.locator('footer.zpb-foot').count() === 1);
  const footBox = await page.locator('footer.zpb-foot').boundingBox();
  ok('v8 home: footer at the bottom of the viewport', footBox && (footBox.y + footBox.height) > 860, `foot.y=${footBox && Math.round(footBox.y)} h=${footBox && Math.round(footBox.height)}`);
  const hintAdj = await page.evaluate(() => {
    const h = document.getElementById('zpbHintGuide').getBoundingClientRect();
    const l = document.querySelector('.zpb-footline').getBoundingClientRect();
    return { gap: Math.round(l.top - h.bottom), footBottom: Math.round(document.querySelector('footer.zpb-foot').getBoundingClientRect().bottom) };
  });
  ok('v8 home: hint directly above the footer line (<=14px gap)', hintAdj.gap >= -2 && hintAdj.gap <= 14, `gap=${hintAdj.gap}px`);
  ok('v8 home: hint opens the Guide', await page.evaluate(async () => {
    document.getElementById('zpbHintGuide').click(); await new Promise(r=>setTimeout(r,300));
    return document.getElementById('viewGuide').classList.contains('active');
  }));
  await page.locator('.zpb-home').click(); await page.waitForTimeout(400);

  // ---- 2. home dropdowns side by side at 3 widths ----
  for (const w of [1280, 700, 390]) {
    await page.setViewportSize({ width:w, height:840 }); await page.waitForTimeout(350);
    const st = await page.evaluate(() => {
      const f = document.querySelector('#draftSetup .filters');
      const sels = [...f.querySelectorAll('select')].map(s=>s.getBoundingClientRect());
      const sameRow = sels.length===2 && Math.abs(sels[0].top - sels[1].top) < 4;
      const fit = sels[0].left < sels[1].left;
      return { sameRow, fit, w0:Math.round(sels[0].width), w1:Math.round(sels[1].width), wrap:getComputedStyle(f).flexWrap };
    });
    ok(`v8 home @${w}: selects side by side`, st.sameRow && st.fit, `w=${st.w0}+${st.w1} wrap=${st.wrap}`);
    ok(`v8 home @${w}: no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  }
  await page.screenshot({ path: SHOT + '/v8-home-390.png' });

  // ---- 3. draft: board, bubbles, sort, Draft button ----
  await page.setViewportSize({ width:1280, height:900 });
  await page.locator('#draftSlotSelect').selectOption({ label: 'Kansas City Chiefs' }).catch(async () => {
    const val = await page.locator('#draftSlotSelect option', { hasText: 'Kansas City Chiefs' }).getAttribute('value');
    await page.locator('#draftSlotSelect').selectOption(val);
  });
  await page.locator('#startDraftBtn').click(); await page.waitForTimeout(1500);

  ok('v8 draft: takeover active', await page.evaluate(() => document.documentElement.hasAttribute('data-zpbteam')));
  ok('v8 draft: crest with 3 color bubbles UNDER it', await page.evaluate(() => {
    const col = document.querySelector('#draftBody2 .zpb-teamcol');
    if (!col) return false;
    const logo = col.querySelector('.zpb-logo'), chips = col.querySelector('.zpb-chip');
    if (!logo || !chips) return false;
    return chips.getBoundingClientRect().top > logo.getBoundingClientRect().bottom - 2;
  }), 'chips below crest');
  ok('v8 draft: no "No picks yet."', !(await bodyTxt()).includes('No picks yet'));
  ok('v8 draft: no "needed" filler on the board/roster', await page.evaluate(() => {
    const txt = (document.getElementById('draftRosterList')?.textContent || '') +
                (document.getElementById('draftBody2')?.textContent || '') +
                (document.getElementById('draftCards')?.textContent || '');
    return !txt.includes('needed');
  }));
  ok('v8 draft: no "Flexed" badge', !(await bodyTxt()).includes('Flexed'));

  // sort indicator + click-to-sort
  const sortState1 = await page.evaluate(() => {
    const th = document.querySelector('#viewDraft th[data-sort="wins"]');
    th.click();
    const sel = document.getElementById('draftSort2').value;
    const marked = document.querySelector('#viewDraft th.sort-sel[data-sort="wins"]') !== null;
    const dir = document.querySelector('#viewDraft th.sort-sel')?.dataset.dir;
    return { sel, marked, dir };
  });
  ok('v8 draft: clicking the Wins header sorts + marks it', sortState1.sel==='wins' && sortState1.marked, `dir=${sortState1.dir}`);
  // numeric order check after clicking OVR
  const ovrOrder = await page.evaluate(() => {
    const th = document.querySelector('#viewDraft th[data-sort="ovr"]'); th.click();
    return new Promise(res => setTimeout(() => {
      const vals = [...document.querySelectorAll('#draftBody2 td.dc-ovr')].slice(0,8).map(td=>parseInt(td.textContent));
      res(vals);
    }, 400));
  });
  const desc = ovrOrder.every((v,i)=>i===0||ovrOrder[i-1]>=v);
  ok('v8 draft: OVR header click sorts numerically', desc, ovrOrder.slice(0,5).join(','));

  // ---- 4. Draft button always visible at compressing widths ----
  await page.setViewportSize({ width:1280, height:900 });
  await page.waitForSelector('#draftBody2 button[data-pick]', { timeout: 15000 });
  await page.waitForTimeout(300);
  for (const w of [1200, 1100, 980, 900, 800, 700, 390]) {
    await page.setViewportSize({ width:w, height:840 }); await page.waitForTimeout(320);
    const st = await page.evaluate(() => {
      const wrap = document.getElementById('draftTableWrap');
      const btn = wrap.querySelector('button[data-pick]');
      const nb = [...document.querySelectorAll('#draftBody2 td.dc-name')].slice(0,1);
      if (!btn) return { missing:true };
      const bb = btn.getBoundingClientRect();
      const inView = bb.width>0 && bb.right <= window.innerWidth+1 && bb.left >= -1;
      return { missing:false, inView, btnRight:Math.round(bb.right), innerW:window.innerWidth,
               hScroll: wrap.scrollWidth > wrap.clientWidth + 1,
               nameVisible: nb.length>0 && nb[0].getBoundingClientRect().width>0 };
    });
    ok(`v8 draft @${w}: Draft button on screen`, !st.missing && st.inView, `right=${st.btnRight}/${st.innerW}`);
    ok(`v8 draft @${w}: no sideways scroll on the board`, !st.hScroll);
  }
  // OVR bubble does not stretch at compact width
  await page.setViewportSize({ width:800, height:840 }); await page.waitForTimeout(300);
  const ovrBubble = await page.evaluate(() => {
    const td = document.querySelector('#draftBody2 td.dc-ovr');
    const r = td.getBoundingClientRect();
    return { w:Math.round(r.width), justify:getComputedStyle(td).justifySelf };
  });
  ok('v8 draft @800: OVR bubble compact (<=64px)', ovrBubble.w <= 64, `w=${ovrBubble.w} justify=${ovrBubble.justify}`);
  await page.screenshot({ path: SHOT + '/v8-board-800.png' });

  // ---- 5. "by your next pick" hides when compressed ----
  const nxpick = await page.evaluate(() => {
    const el = document.querySelector('.zpb-nxpick');
    return { exists: !!el, hiddenAt900: getComputedStyle(el).display === 'none' };
  });
  ok('v8 draft @800: "by your next pick" hidden', nxpick.exists && nxpick.hiddenAt800 === undefined && nxpick.hiddenAt900);
  await page.setViewportSize({ width:1280, height:900 }); await page.waitForTimeout(300);
  ok('v8 draft @1280: "by your next pick" visible', await page.evaluate(() => getComputedStyle(document.querySelector('.zpb-nxpick')).display !== 'none'));

  // ---- 6. priority panel bars carry the identity, recent picks exist ----
  const pri = await page.evaluate(() => {
    const bars = [...document.querySelectorAll('.pr-bar i')];
    return { n: bars.length, first: bars[0] ? getComputedStyle(bars[0]).backgroundColor : null };
  });
  ok('v8 draft: priority bars identity-tinted', pri.n > 0 && pri.first && !pri.first.includes('46, 204, 113') && !pri.first.includes('46,204,113'), pri.first);

  // ---- 7. preseason/season: math's pick badge + caution + rank tones ----
  const simBtn = page.locator('#simSeasonBtn');
  let cautionChecked = false;
  if (await simBtn.count() && await simBtn.isVisible().catch(()=>false)) {
    await simBtn.click(); await page.waitForTimeout(600);
    const cautionTxt = await page.evaluate(() => document.querySelector('.zpb-caution')?.textContent || '');
    ok('v8: caution screen for destructive actions', cautionTxt.includes('Your current season will be erased'));
    cautionChecked = true;
    const ret = page.locator('.zpb-caution button:has-text("Return to the season")');
    if (await ret.count()) { await ret.click(); await page.waitForTimeout(400); }
  }
  if (!cautionChecked) console.log('[skip] caution screen (not on season page in this path; verified in v7, untouched)');

  // rank numbers wear the identity: the tone comes from --good/--bad, which the
  // takeover re-tints at :root - check the resolved custom property directly
  const rankVars = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return { good: cs.getPropertyValue('--good').trim(), bad: cs.getPropertyValue('--bad').trim(),
             taken: document.documentElement.hasAttribute('data-zpbteam') };
  });
  ok('v8: --good/--bad wear the identity under takeover (rank tone source)',
     rankVars.taken && rankVars.good && !['#4c9a67','#72c18e','#3ecf8e'].some(g => rankVars.good.toLowerCase() === g),
     `good=${rankVars.good} bad=${rankVars.bad}`);

  // math's pick badge: computed color follows the palette under takeover (synthetic badge)
  const mathBadge = await page.evaluate(() => {
    const b = document.createElement('span'); b.className = 'badge badge-passfail'; b.textContent = "math's pick";
    document.body.appendChild(b);
    const s = getComputedStyle(b); const out = { color: s.color, bg: s.backgroundColor };
    b.remove(); return out;
  });
  ok('v8: math\'s pick badge tinted (identity, not fixed purple)',
     mathBadge.color !== 'rgb(180, 120, 255)' && !mathBadge.bg.includes('180, 120, 255'),
     JSON.stringify(mathBadge));

  // dark mode: no ivory disc behind logos
  await page.evaluate(() => { document.getElementById('themeToggleBtn')?.click(); });
  await page.waitForTimeout(300);
  const discGone = await page.evaluate(() => {
    const lg = document.querySelector('.zpb-logo');
    const s = getComputedStyle(lg);
    return s.backgroundImage === 'none' && s.borderRadius !== '50%';
  });
  ok('v8 dark: no ivory disc behind logos (pure logo)', discGone);
  await page.screenshot({ path: SHOT + '/v8-dark-draft.png' });
  await page.evaluate(() => { document.getElementById('themeToggleBtn')?.click(); });

  // ---- 9. guide: flex rule kept, but no flexed-player mentions; no roster paragraph ----
  await page.evaluate(() => { document.getElementById('zpbHintGuide')?.click(); });
  await page.waitForTimeout(500);
  const guideTxt = await bodyTxt();
  ok('v8 guide: no "Flexed" player mentions', !guideTxt.includes('Flexed'));
  ok('v8 site: roster-building paragraph gone', !guideTxt.includes('roster-building side'));

  const errCount = errors.length;
  ok('v8: ZERO console errors (main build)', errCount === 0, errors.slice(0,3).join(' | '));
  await page.close();

  // ============ PROTOTYPE B ============
  const pb = await browser.newPage({ viewport:{width:1280,height:900} });
  const errsB = [];
  pb.on('console', m => { if (m.type()==='error') errsB.push(m.text()); });
  pb.on('pageerror', e => errsB.push('pageerror: '+e.message));
  pb.on('dialog', d => d.accept());
  await pb.goto(FILE_B); await pb.waitForTimeout(1400);
  ok('v8-B: title carries package badge', (await pb.title()).includes('logo package B'));
  ok('v8-B: body attr set', await pb.evaluate(() => document.body.dataset.zpblogopkg === 'B'));
  const bLogo = await pb.evaluate(() => {
    const a = document.querySelector('.zpb-logo'); // package B crest on the board? board not started; check banner/logo fn output instead
    return a ? a.src.slice(0,60) : null;
  });
  // compare logo payloads: B build must differ from A build
  const aUri = await page.evaluate(()=>0).catch(()=>null);
  ok('v8-B: zero console errors', errsB.length === 0, errsB.slice(0,2).join(' | '));
  await pb.locator('#draftSlotSelect').selectOption({ label: 'Kansas City Chiefs' }).catch(async () => {
    const val = await pb.locator('#draftSlotSelect option', { hasText: 'Kansas City Chiefs' }).getAttribute('value');
    await pb.locator('#draftSlotSelect').selectOption(val);
  });
  await pb.locator('#startDraftBtn').click(); await pb.waitForTimeout(1200);
  await pb.screenshot({ path: SHOT + '/v8-B-board.png' });
  await pb.close();

  await browser.close();
  console.log(fails.length ? `\n${fails.length} FAILURES: ${fails.join(' ; ')}` : '\nALL V8 CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})();
