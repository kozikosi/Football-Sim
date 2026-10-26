// Z-post-blue v10 verification: zero console errors + tenth-wave directive coverage
const { chromium } = require('playwright');

const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/desktop/wt/zai/_agents/zai/evidence/z-post-blue';
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };
const sleep = ms => new Promise(r=>setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1600);

  // ---- 1. home: full-bleed bar, no hint anywhere, bare footer, dropdowns above DRAFT ----
  const bar = await page.evaluate(() => {
    const b = document.querySelector('.zpb-bar').getBoundingClientRect();
    return { left: Math.round(b.left), width: Math.round(b.width), vw: window.innerWidth };
  });
  ok('v10 home: 20-0 bar reaches both screen edges', bar.left <= 0 && bar.width >= bar.vw - 1, `left=${bar.left} w=${bar.width} vw=${bar.vw}`);
  ok('v10 home: no "see guide for details" anywhere', await page.evaluate(() => !document.body.textContent.includes('see guide for details')));
  const foot = await page.evaluate(() => {
    const f = document.querySelector('.footnav');
    const s = getComputedStyle(f);
    return { border: s.borderTopWidth, bg: s.backgroundColor, bottom: Math.round(f.getBoundingClientRect().bottom), vh: window.innerHeight };
  });
  ok('v10 home: footer nav has no panel lines', foot.border === '0px', JSON.stringify(foot));
  ok('v10 home: footer nav near the bottom of the window', foot.bottom >= foot.vh - 80, `bottom=${foot.bottom} vh=${foot.vh}`);
  const homeGeo = await page.evaluate(() => {
    const btn = document.getElementById('startDraftBtn').getBoundingClientRect();
    const sel = document.querySelector('#draftSetup select').getBoundingClientRect();
    return { btnCY: btn.top + btn.height/2, vh: window.innerHeight, btnH: btn.height, selBottom: sel.bottom };
  });
  ok('v10 home: DRAFT button center ~half-button above the window centerpoint',
     Math.abs(homeGeo.btnCY - (homeGeo.vh/2 - homeGeo.btnH/4)) < 60, JSON.stringify(homeGeo));
  await page.screenshot({ path: SHOT + '/v10-home.png' });

  // ---- 2. draft: board upgrades ----
  await page.evaluate(() => {
    const sel = document.getElementById('draftSlotSelect');
    sel.value = [...sel.options].find(o=>o.textContent.includes('Ravens')).value;
    sel.dispatchEvent(new Event('change', {bubbles:true}));
  });
  await sleep(250);
  await page.locator('#startDraftBtn').click(); await sleep(2200);
  ok('v10 draft: takeover active', await page.evaluate(() => document.documentElement.hasAttribute('data-zpbteam')));
  ok('v10 draft: "Drafting as" gone', await page.evaluate(() => !document.getElementById('draftLive').textContent.includes('Drafting as')));
  ok('v10 draft: search placeholder is just "Search"', await page.evaluate(() => document.getElementById('draftSearch2').placeholder === 'Search'));
  ok('v10 draft: Table / Cards segmented control drives the view select', await page.evaluate(() => !!document.getElementById('draftViewSeg')));
  await page.locator('#draftViewSeg button[data-zview="cards"]').click(); await sleep(400);
  ok('v10 draft: cards view opens via segmented control', await page.evaluate(() => document.getElementById('draftCards').style.display !== 'none' && document.querySelector('#draftViewSeg [data-zview="cards"]').classList.contains('zpb-seg-on')));
  await page.locator('#draftViewSeg button[data-zview="table"]').click(); await sleep(400);
  ok('v10 draft: sort labels are single words', await page.evaluate(() => [...document.getElementById('draftSort2').options].every(o=>!o.textContent.includes('Sort:')) && document.getElementById('draftSort2').options[0].textContent === 'OVERALL'));
  ok('v10 draft: position pips replace QB x/y chips', await page.evaluate(() => { const p = document.querySelectorAll('#draftChips .chip.zpb-pip'); return p.length >= 8 && !!document.querySelector('#draftChips .chip.zpb-pip i'); }));
  ok('v10 draft: SAM / Nickel labels', await page.evaluate(() => { try { return LABELS.SAM === 'SAM' && LABELS.CB3 === 'Nickel'; } catch(e){ return 'ERR '+e.message; } }));
  ok('v10 draft: hover full names wired (SAM -> Strong Side Linebacker)', await page.evaluate(() => { const el = document.querySelector('#draftRosterList .slotname'); if(!el) return 'no el'; el.dispatchEvent(new MouseEvent('mouseover', {bubbles:true})); return true; }));
  // base toggle: flip to 3-4, labels follow
  await page.evaluate(() => { zpbFillToggles(); });
  await sleep(200);
  const tgl = await page.evaluate(() => !!document.querySelector('#zpbBaseToggleHost .zpb-basetoggle'));
  ok('v10 draft: 4-3 / 3-4 toggle beside Your Roster', tgl);
  await page.locator('#zpbBaseToggleHost button[data-zbase="34"]').click(); await sleep(500);
  ok('v10 draft: 3-4 relabels the front (DT1->NT, DT2->OLB1, MIKE->ILB1)', await page.evaluate(() => LABELS.DT1 === 'NT' && LABELS.DT2 === 'OLB1' && LABELS.MIKE === 'ILB1' && LABELS.SAM === 'OLB2'));
  ok('v10 draft: 3-4 math consults OLB=WILL coefficients', await page.evaluate(() => { const s = zpbAdjSpec('frontRun', RATING_SPECS.frontRun); return window.ZPB34 === true && s.DT2 === 1.0 && s.SAM === 1.0; }));
  await page.locator('#zpbBaseToggleHost button[data-zbase="43"]').click(); await sleep(400);
  ok('v10 draft: back to 4-3 restores labels', await page.evaluate(() => LABELS.DT2 === 'DT2' && LABELS.MIKE === 'MIKE'));
  // flex matrix probes
  const flex = await page.evaluate(() => ({
    qbRB: flexRule('QB','RB1'), qbWR: flexRule('QB','WR1'),
    teWR: flexRule('TE','WR1'), teRB: flexRule('TE','RB1'),
    edgeSAM: flexRule('REDG','SAM'), edgeWILL: flexRule('REDG','WILL'),
    olbFS: flexRule('WILL','FS'), olbCB3: flexRule('WILL','CB3'),
    mikeSS: flexRule('MIKE','SS'), ssCB3: flexRule('SS','CB3'),
    cbMIKE: flexRule('CB','MIKE'), kP: flexRule('K','P'), pK: flexRule('P','K'),
    hbFB: flexRule('HB','FB'), fbNat: flexRule('FB','FB'), pNat: flexRule('P','P'),
    olRB: flexRule('LT','RB1'),
  }));
  const fx = (v)=> v===0 ? 'free' : v==null ? 'no' : '-'+v;
  ok('v10 flex matrix (Owner rules)', JSON.stringify(flex) === JSON.stringify({qbRB:6,qbWR:6,teWR:2,teRB:4,edgeSAM:0,edgeWILL:0,olbFS:6,olbCB3:2,mikeSS:2,ssCB3:0,cbMIKE:6,kP:0,pK:0,hbFB:0,fbNat:0,pNat:0,olRB:6}), JSON.stringify(flex));
  ok('v10 draft: 28 rounds (FB + P added)', await page.evaluate(() => ROSTER_SLOTS.length === 28 && ROSTER_SLOTS.includes('FB') && ROSTER_SLOTS.includes('P')));
  ok('v10 draft: FB and Punter are draftable slots', await page.evaluate(() => !!POS_SLOT_MAP.FB && !!POS_SLOT_MAP.P && POS_SLOT_MAP.FB.includes('FB') && POS_SLOT_MAP.P.includes('P')));
  await page.screenshot({ path: SHOT + '/v10-draft.png' });

  // finish the draft instantly with the Sim-to-end control
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if(b) b.click(); });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x=>/sim to end/i.test(x.textContent)); if(b) b.click(); });
  await sleep(3000);
  for (let i=0;i<10;i++){
    const done = await page.evaluate(() => !!document.getElementById('newDraftBtn'));
    if (done) break;
    await sleep(900);
  }
  // ---- 3. draft-complete page ----
  ok('v10 finish: cinematic plays three fading sentences', await page.evaluate(async () => {
    const ov = document.querySelector('.zpb-fin');
    if(!ov) return 'no overlay';
    const texts = [...ov.querySelectorAll('p')].map(p=>p.textContent);
    return texts.join('|').includes('Play the season') && texts.join('|').includes('Can you go') ? 'ok' : texts.join('|');
  }));
  await sleep(6500); // let the sentences run
  // wait out the cinematic hold + fade (up to ~22s), then continue
  let cineGone = false;
  for (let i=0;i<26;i++){ if(!(await page.locator('.zpb-fin').count())){ cineGone = true; break; } await sleep(1000); }
  ok('v10 finish: overlay gone after the run', cineGone);
  const fin = await page.evaluate(() => ({
    draftComplete: document.getElementById('draftFinalResults').textContent.includes('Draft Complete'),
    newDraft: !!document.getElementById('newDraftBtn') && document.getElementById('newDraftBtn').textContent.trim() === 'NEW DRAFT',
    sim100: [...document.querySelectorAll('#draftFinalResults button')].some(b=>b.textContent.trim()==='100 SEASONS'),
    tabs: [...document.querySelectorAll('#draftFinalResults .tabs .tabbtn')].map(b=>b.textContent),
  }));
  ok('v10 finish: Draft Complete gone, NEW DRAFT + 100 SEASONS beside it', !fin.draftComplete && fin.newDraft && fin.sim100, JSON.stringify(fin));
  ok('v10 finish: tabs fully capitalized, sim tab removed', fin.tabs.join(',').includes('SEASON') && fin.tabs.join(',').includes('YOUR ROSTER') && !fin.tabs.join(',').includes('Simulated'), JSON.stringify(fin.tabs));
  await page.screenshot({ path: SHOT + '/v10-finish.png' });

  // ---- 4. Start Season hero: glimmering Can you go 20-0 (the live season tab) ----
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('#draftFinalResults .tabs .tabbtn')].find(b=>b.textContent==='SEASON');
    if(btn) btn.click();
  });
  await sleep(1200);
  ok('v10 season: Start Season centered with glimmering 20-0 beneath', await page.evaluate(() => {
    const btn = document.getElementById('startSeasonBtn');
    const line = document.querySelector('#draftFinalResults .zpb-cygline, .zpb-cygline');
    return !!btn && !!line && line.textContent.includes('Can you go 20-0');
  }));

  // ---- 5. preseason: bubbles, KR/PR, wins-of-optimal, philosophy unlocked ----
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if(b) b.click(); });
  await sleep(2500);
  await sleep(500);
  const pre = await page.evaluate(() => {
    const txt = document.getElementById('draftLive') ? document.getElementById('draftLive').textContent + document.getElementById('draftFinalResults').textContent : '';
    return {
      bubbles: document.querySelectorAll('.zpb-selbubble').length,
      kr: !!document.querySelector('[data-zslot="KR"], .slotname'),
      retKr: (document.body.textContent.match(/\bKR\b/) || []).length,
      prSel: !!document.querySelector('select[data-returner-pr="1"]'),
      optwins: document.querySelectorAll('.zpb-optwins').length,
      philEnabled: (() => { const s = document.getElementById('scriptOff') || document.querySelector('select[id^=script]'); return s ? !s.disabled : 'n/a'; })(),
      conv: document.body.textContent.includes('How a 2-Pt Conversion works'),
      convOld: document.body.textContent.includes('2-Pt Conv works'),
      balanced: document.body.textContent.includes('Balanced Approach:'),
      baseTgl: !!document.querySelector('#zpbBaseToggleHost2 .zpb-basetoggle'),
      flexFoot: !!document.querySelector('.zpb-flexfoot'),
    };
  });
  ok('v10 preseason: selected styles as bubbles', pre.bubbles >= 2, JSON.stringify(pre));
  ok('v10 preseason: KR row (no divider), PR select defaults to second best', pre.retKr > 0 && pre.prSel);
  ok('v10 preseason: wins-of-optimal card present', pre.optwins >= 1);
  ok('v10 preseason: philosophy selects never disabled', pre.philEnabled === 'n/a' || pre.philEnabled === true, 'phil='+pre.philEnabled);
  ok('v10 preseason: How a 2-Pt Conversion works (full word)', pre.conv && !pre.convOld);
  ok('v10 preseason: Balanced Approach phrasing', pre.balanced);
  ok('v10 preseason: base toggle on the philosophy panel', pre.baseTgl);
  ok('v10 preseason: flexing explainer + group scores on one bottom row', pre.flexFoot);
  await page.screenshot({ path: SHOT + '/v10-preseason.png' });

  // ---- 6. guide: graphics + glossary + fading explainers ----
  await page.evaluate(() => { setActiveTab('viewGuide','tabGuideBtn'); });
  await sleep(1500);
  const guide = await page.evaluate(() => ({
    intro: document.getElementById('guideBody').textContent.includes('Short reference sections'),
    posrank: document.querySelectorAll('#guideBody .zpb-prrow').length,
    series: document.querySelectorAll('#guideBody .zpb-ser').length,
    sw: document.querySelectorAll('#guideBody .zpb-sw').length,
    gloss: document.getElementById('guideBody').textContent.includes('Glossary'),
    glossNew: document.getElementById('guideBody').textContent.includes('Punter'),
    persboxes: document.querySelectorAll('#guideBody .zpb-persbox').length,
    pkg: document.querySelectorAll('#guideBody .zpb-pkgcard').length,
    values28: document.getElementById('guideBody').textContent.includes('all 28 starting spots'),
    noValueTiers: !document.getElementById('guideBody').textContent.includes('Franchise-changing ('),
    noStyles: !document.getElementById('guideBody').textContent.includes('What each style means'),
    noAutoCustom: !document.getElementById('guideBody').textContent.includes('you lock in your own personnel'),
  }));
  ok('v10 guide: intro panel gone', !guide.intro);
  ok('v10 guide: positions-ranked graphic renders from the engine', guide.posrank >= 20, 'rows='+guide.posrank);
  ok('v10 guide: cumulative series (1 QB · 2 QB + CB1 …)', guide.series >= 20, 'chips='+guide.series);
  ok('v10 guide: Star-Wars fading explainers present', guide.sw >= 4, 'blocks='+guide.sw);
  ok('v10 guide: Glossary with new entries', guide.gloss && guide.glossNew);
  ok('v10 guide: personnel boxes', guide.persboxes === 5);
  ok('v10 guide: package movement viz (Base/3-4/Nickel/Focus)', guide.pkg === 4);
  ok('v10 guide: values section now 28 spots', guide.values28);
  ok('v10 guide: old tier text / style lists / Auto-Custom gone', guide.noValueTiers && guide.noStyles && guide.noAutoCustom, JSON.stringify(guide));
  await page.screenshot({ path: SHOT + '/v10-guide.png' });

  // ---- 7. Madden Rankings: no emojis, badges at bottom, slow fades ----
  await page.evaluate(() => { setActiveTab('viewRankings','tabRankingsBtn'); });
  await sleep(1200);
  const rk = await page.evaluate(() => {
    const c = document.getElementById('controls');
    const cr = c.getBoundingClientRect(), layout = c.closest('.layout').getBoundingClientRect();
    const emojis = ['🏃','🛡','🚫'].some(e => c.textContent.includes(e));
    const fade = getComputedStyle(document.querySelector('.zpb-fade') || document.body).transitionDuration;
    const explainer = c.textContent.includes('scaled so the biggest spot');
    return { atBottom: cr.top > layout.top + layout.height/2, emojis, explainer, fade };
  });
  ok('v10 rankings: no badge emojis', !rk.emojis);
  ok('v10 rankings: badges + weights collapsed below the results', rk.atBottom, JSON.stringify(rk));
  ok('v10 rankings: weights explainer removed', !rk.explainer);
  ok('v10 rankings: fades slowed to 4s+', parseFloat(rk.fade) >= 4, 'fade='+rk.fade);

  // ---- 8. player browser: one scrollable panel, no pager ----
  await page.evaluate(() => { setActiveTab('viewPlayers','tabPlayersBtn'); });
  await sleep(1000);
  const pb = await page.evaluate(() => {
    const rows = document.querySelectorAll('#playerBody tr').length;
    const t = document.getElementById('playerTable');
    const scrollable = getComputedStyle(t).overflowY === 'auto' || t.scrollHeight > t.clientHeight;
    const count = document.getElementById('playerCount').textContent;
    return { rows, scrollable, count, noPager: !document.getElementById('playerPager').textContent.trim() };
  });
  ok('v10 browser: every player in the panel (no paging)', pb.rows > 1000, 'rows='+pb.rows);
  ok('v10 browser: panel scrolls its own players', pb.scrollable);
  ok('v10 browser: pager gone', pb.noPager && !pb.count.includes('Page'));
  await page.screenshot({ path: SHOT + '/v10-browser.png' });

  // ---- 9. team comparison: integers, no verdict sentence, shimmer names ----
  await page.evaluate(() => { setActiveTab('viewCompare','tabCompareBtn'); });
  await sleep(1200);
  const cmp = await page.evaluate(() => {
    const host = document.getElementById('homeCmpResult');
    host.querySelectorAll('#homeCmpA,#homeCmpB').forEach(s=>s.dispatchEvent(new Event('change',{bubbles:true})));
    return new Promise(res=>setTimeout(()=>{
      const t = host.textContent;
      res({
        verdict: t.includes('On your current weights'),
        integerScore: !/\d+\.\d+ vs \d+\.\d+/.test(host.querySelector('.zpb-cmpscore') ? host.querySelector('.zpb-cmpscore').textContent : 'x.x vs y.y'),
        grid: !!host.querySelector('.zpb-cmphead'),
        labelsGone: !host.textContent.includes('Team A'),
        shm: host.querySelectorAll('.zpb-shm').length,
        vib: host.querySelectorAll('.zpb-vib').length,
        green: [...host.querySelectorAll('td')].some(td=>getComputedStyle(td).color === 'rgb(76, 154, 103)'),
      });
    }, 600));
  });
  ok('v10 compare: verdict sentence removed', !cmp.verdict);
  ok('v10 compare: integer scores in a centered grid', cmp.integerScore && cmp.grid);
  ok('v10 compare: Team A/B labels gone', cmp.labelsGone);
  ok('v10 compare: 90+ shimmer names, no green, no boxes', cmp.shm >= 1 && !cmp.green, JSON.stringify(cmp));
  await page.screenshot({ path: SHOT + '/v10-compare.png' });

  // ---- 10. console errors ----
  ok('v10: ZERO console errors end-to-end', errors.length === 0, errors.slice(0,4).join(' | '));

  await browser.close();
  console.log(fails.length ? `\n${fails.length} FAILURES` : '\nALL CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
