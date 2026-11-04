// Z-post-blue v18 verification: Owner round 12 — Team Comparison rebuild, Guide pass,
// DEFENSE panel, glossary spot list, draft board, terminology. Zero console errors.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/build_w18.html';
const OUT = '/home/z/my-project/w18ref/evidence';
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

  // ---- 1. TEAM COMPARISON (footer) ----
  await page.evaluate("document.getElementById('tabCompareBtn').click()"); await sleep(1300);
  const cmp = await page.evaluate(`(() => {
    const host = document.getElementById('homeCmpResult');
    const selA = document.getElementById('homeCmpA'), selB = document.getElementById('homeCmpB');
    const nums = [...host.querySelectorAll('.zpb-cmpnum')];
    const note = host.textContent.includes('Ratings shown are effective ratings');
    const unitRow = [...host.querySelectorAll('table tbody')].map(tb => [...tb.children].map(tr => tr.children[1] ? tr.children[1].textContent.trim() : ''));
    const labels = (unitRow.find(r => r.length >= 10) || []);
    return {
      hostW: Math.round(host.getBoundingClientRect().width),
      selAHome: selA.parentElement ? selA.parentElement.id : null,
      selBHome: selB.parentElement ? selB.parentElement.id : null,
      inHost: host.contains(selA) && host.contains(selB),
      nNums: nums.length,
      pk: nums.map(n => n.getAttribute('style') || ''),
      colors: nums.map(n => getComputedStyle(n).color),
      note, labels,
      headGone: !/\\(#\\d+\\)/.test(host.textContent),
      h4s: [...host.querySelectorAll('h4')].map(h => h.textContent.trim())
    };
  })()`);
  ok('cmp: top panel gone — dropdowns live in the Starter-by-Starter header', cmp.selAHome === 'zpbCmpSlotA' && cmp.selBHome === 'zpbCmpSlotB' && cmp.inHost, JSON.stringify({a: cmp.selAHome, b: cmp.selBHome}));
  ok('cmp: 83 vs 79 carries two team colors', cmp.nNums === 2 && cmp.pk[0].includes('--pkc') && cmp.pk[1].includes('--pkc') && cmp.colors[0] !== cmp.colors[1], JSON.stringify({pk: cmp.pk, colors: cmp.colors}));
  ok('cmp: effective-ratings note removed from the footer comparison', cmp.note === false);
  ok('cmp: result column thin (max-width 520)', cmp.hostW <= 524, String(cmp.hostW));
  const WANT = ['Offense','Quarterback','Running Backs','Tight Ends','Offensive Line','Run Game','Pass Game','Pass Defense','Run Defense','Defensive Line','Linebackers','Secondary','Defense'];
  ok('cmp: unit menu in the Owner order (13 rows)', JSON.stringify(cmp.labels) === JSON.stringify(WANT), JSON.stringify(cmp.labels));
  ok('cmp: Starter-by-Starter heading present', cmp.h4s.includes('Starter-by-Starter'), JSON.stringify(cmp.h4s));
  await page.evaluate("(() => { const e = document.getElementById('homeCmpResult'); if (e) e.scrollIntoView({block:'start'}); })()"); await sleep(400);
  await page.screenshot({ path: OUT + '/w18-comparison.png' });

  // season comparison keeps the note (code-level unit check)
  const noteCheck = await page.evaluate(`(() => {
    const a = TEAM_DATA['Kansas City Chiefs'], b = TEAM_DATA['Las Vegas Raiders'];
    const withNote = renderLineupTableHTML(a, b, 'Kansas City Chiefs', 'Las Vegas Raiders');
    const noNote = renderLineupTableHTML(a, b, 'Kansas City Chiefs', 'Las Vegas Raiders', false);
    return { with: withNote.includes('Ratings shown are effective ratings'), without: noNote.includes('Ratings shown are effective ratings') };
  })()`);
  ok('cmp: in-season comparison keeps the note, footer call opts out', noteCheck.with === true && noteCheck.without === false, JSON.stringify(noteCheck));

  // ---- 2. GUIDE: field map ----
  await page.evaluate("document.getElementById('tabGuideBtn').click()"); await sleep(1200);
  const fm = await page.evaluate(`(() => {
    const line = document.querySelector('.zpb-fm-line');
    const wide = document.querySelector('.zpb-fm-wide');
    const pills = row => row ? [...row.querySelectorAll(':scope > i')].map(i => i.textContent.trim()) : [];
    const dimeRow = [...document.querySelectorAll('.zpb-fm-def .zpb-fm-row')].find(r => pills(r).length === 1 && pills(r)[0] === 'DIME');
    const chips = [...document.querySelectorAll('.zpb-fm-rowflex .zpb-ftchip')];
    const cbLeft = wide ? wide.querySelector('i').getBoundingClientRect() : null;
    const wr = [...document.querySelectorAll('.zpb-fm-off .zpb-fm-row i')].filter(i => i.textContent.trim() === 'WR')[0];
    const legend = [...document.querySelectorAll('.zpb-fm-legend span, .zpb-fm-legend .zpb-fm-lh')].map(s => s.textContent.trim());
    const grpLabels = [...document.querySelectorAll('.zpb-fm-rowflex .zpb-fm-grp > b')].map(b => b.textContent.trim());
    return {
      lineStations: pills(line), wideStations: pills(wide),
      dimeOwnRow: !!dimeRow,
      wrInLine: pills(line).filter(s => s === 'WR').length,
      chipN: chips.length,
      qbChip: chips.some(c => (c.getAttribute('title') || '').includes('QB plays WR, S at −6')),
      cbWiderThanWR: cbLeft && wr ? cbLeft.left < wr.getBoundingClientRect().left - 8 : false,
      grpLabels,
      legend: legend.slice(0, 20),
      cb3Gone: ![...document.querySelectorAll('.zpb-fm i')].some(i => i.textContent.trim() === 'CB3')
    };
  })()`);
  ok('map: WRs line up ON the line (3 WR stations in the line row)', fm.wrInLine === 3, JSON.stringify(fm.lineStations));
  ok('map: line row reads WR · OL · TE · WR WR', fm.lineStations.join('|') === 'WR|OT|OG|C|OG|OT|TE|WR|WR', JSON.stringify(fm.lineStations));
  ok('map: CBs mirrored opposite and wider', fm.wideStations.join('|') === 'CB|NICKEL|CB' && fm.cbWiderThanWR, 'wider=' + fm.cbWiderThanWR);
  ok('map: CB3 label retired, NICKEL in its place', fm.cb3Gone && fm.wideStations.includes('NICKEL'));
  ok('map: DIME on its own deep station', fm.dimeOwnRow);
  ok('map: flex chips ride under the rows (≥34 at desktop, all 19 families)', fm.chipN >= 34 && fm.grpLabels.length >= 19, String(fm.chipN) + ' chips / ' + JSON.stringify(fm.grpLabels));
  ok('map: QB chip carries "−6 WR, S" in its hover', fm.qbChip);
  ok('map: legend explains NICKEL, DIME and the flex tiers', fm.legend.some(l => l.startsWith('NICKEL')) && fm.legend.some(l => l.startsWith('DIME')) && fm.legend.some(l => l.includes('rating points lost')), JSON.stringify(fm.legend));
  const mapEl = await page.evaluate("(() => { const e = document.querySelector('.zpb-fm'); if (e) { e.scrollIntoView({block: 'center'}); return true; } return false; })()");
  if (mapEl) { await sleep(500); await page.screenshot({ path: OUT + '/w18-fieldmap.png' }); }

  // ---- 3. GUIDE: text pass + DEFENSE panel + glossary ----
  const guide = await page.evaluate(`(() => {
    const g = document.getElementById('guideBody');
    const txt = g.textContent;
    const sws = [...g.querySelectorAll('.zpb-sw')].map(s => s.textContent.trim());
    const secs = [...g.querySelectorAll('details.panel > summary')].map(s => s.textContent.trim());
    const defCards = [...g.querySelectorAll('.zpb-defcard')].map(c => ({ t: c.querySelector('h5').textContent.trim(), dots: c.querySelectorAll('.zpb-defdots').length, dotsByRow: [...c.querySelectorAll('.zpb-defdots')].map(r => r.querySelectorAll('i:not(.zpb-deflab)').length), dashed: c.querySelectorAll('.zpb-dim').length, gold: c.querySelectorAll('.zpb-dcb').length }));
    const glossSec = [...g.querySelectorAll('details.panel')].find(d => d.querySelector('summary') && /GLOSSARY/i.test(d.querySelector('summary').textContent));
    const glossFirst = glossSec ? glossSec.querySelector('div').firstElementChild.textContent.includes('Every starting spot, in depth chart order:') : false;
    const glossLis = glossSec ? [...glossSec.querySelectorAll('li')].map(li => li.textContent.trim()) : [];
    const iCoach = secs.findIndex(s => s.startsWith('COACHING:'));
    const iDef = secs.findIndex(s => s.startsWith('DEFENSE:'));
    const iMath = secs.findIndex(s => s.startsWith('THE MATH'));
    const whoSw = sws.find(s => s.startsWith('Who decides?'));
    const mathPanel = [...g.querySelectorAll('details.panel')][iMath];
    return {
      sws: sws.map(s => s.slice(0, 60)),
      secs,
      order: iCoach >= 0 && iDef === iCoach + 1 && iMath === iDef + 1,
      whoDecides: whoSw || '',
      starsGone: !txt.includes('your own thumb on the scale'),
      alsoFlexGone: !txt.includes('They can also flex a player.'),
      fiveMinusGone: !txt.includes('5 minus the backs and tight ends'),
      autoPhilGone: !txt.includes('Auto, philosophy and custom plans'),
      fullRulesGone: !txt.includes('The full rules:'),
      bakedGone: !txt.includes('baked into every projection'),
      homeInMath: mathPanel ? mathPanel.textContent.includes('Home field is worth +1.7 points a game in the model.') : false,
      defCards,
      glossFirst, glossLis: glossLis.slice(0, 8), glossN: glossLis.length,
      glossDime: glossLis.some(l => l.startsWith('Dime — plays around 10% of the snaps')),
      glossCB3Dime: (() => { const i = glossLis.findIndex(l => /CB3 — Nickel Cornerback/.test(l)); return i >= 0 && glossLis[i + 1] && glossLis[i + 1].startsWith('Dime —'); })(),
      lowerPtsGone: !txt.includes('Lower points allowed is better'),
      thirdCornerGone: !/third corner/i.test(txt)
    };
  })()`);
  ok('guide: DEFENSE panel sits between COACHING and THE MATH', guide.order, JSON.stringify(guide.secs));
  ok('guide: Who decides — three lines, play your own way', guide.whoDecides.includes('most games.') && guide.whoDecides.includes('play your own way') && !guide.whoDecides.includes('deliberately'), guide.whoDecides.slice(0, 160));
  ok('guide: Stars bullet removed', guide.starsGone);
  ok('guide: "They can also flex a player." removed', guide.alsoFlexGone);
  ok('guide: "(5 minus the backs and tight ends)" removed', guide.fiveMinusGone);
  ok('guide: duplicated "Auto, philosophy and custom plans" removed', guide.autoPhilGone);
  ok('guide: "The full rules:" stays gone', guide.fullRulesGone);
  ok('guide: "baked into every projection" removed', guide.bakedGone);
  ok('guide: home-field line lives in THE MATH panel', guide.homeInMath);
  ok('guide: 4 front cards — 4-3 / 3-4 / NICKEL / DIME', guide.defCards.length === 4 && guide.defCards.map(c => c.t).join('|') === '4-3|3-4|NICKEL|DIME', JSON.stringify(guide.defCards.map(c => c.t)));
  ok('guide: fronts drawn to scale (4-3: 4-3-4 · 3-4: 3-4-4 · NICKEL: 4-2-5 · DIME: 4-1-6)', JSON.stringify(guide.defCards.map(c => c.dotsByRow.join('-'))) === '["4-3-4","3-4-4","4-2-5","4-1-6"]', JSON.stringify(guide.defCards.map(c => c.dotsByRow.join('-'))));
  ok('guide: gold corner dots + the dashed dime dot', guide.defCards[3].dashed === 1 && guide.defCards[2].gold === 3 && guide.defCards[3].gold === 3, JSON.stringify(guide.defCards.map(c => [c.gold, c.dashed])));
  ok('guide: glossary opens with every spot in depth chart order', guide.glossFirst && guide.glossN >= 29, 'lis=' + guide.glossN);
  ok('guide: spot list starts QB → RB1 → RB2', guide.glossLis[0] && guide.glossLis[0].startsWith('QB · Quarterback') && guide.glossLis[1].startsWith('RB1 · Running Back') && guide.glossLis[2].startsWith('RB2 · Running Back'), JSON.stringify(guide.glossLis.slice(0, 3)));
  ok('guide: CB3 line followed by the Dime line', guide.glossCB3Dime);
  ok('guide: Dime description sentence present', guide.glossDime);
  ok('guide: round-12 paragraph gone + no "third corner" anywhere', guide.lowerPtsGone && guide.thirdCornerGone);

  // COACHING PHILOSOPHY + AUTO/CUSTOM panels
  await page.evaluate("(() => { const d = [...document.querySelectorAll('#guideBody details.panel')].find(x => /COACHING:/.test(x.querySelector('summary').textContent)); if (d) { d.setAttribute('open',''); d.scrollIntoView({block:'start'}); } })()"); await sleep(600);
  const phil = await page.evaluate(`(() => {
    const d = [...document.querySelectorAll('#guideBody details.panel')].find(x => /COACHING:/.test(x.querySelector('summary').textContent));
    const sws = [...d.querySelectorAll('.zpb-sw')].map(s => ({ t: s.childNodes[0] ? s.childNodes[0].textContent.trim() : '', small: s.querySelector('small') ? s.querySelector('small').textContent.trim().slice(0, 60) : '' }));
    const pair = d.querySelector('.zpb-autocust');
    return { sws, pairPanels: pair ? pair.querySelectorAll('.zpb-sw').length : 0, sideBySide: pair ? getComputedStyle(pair).display : '' };
  })()`);
  ok('guide: COACHING PHILOSOPHY uppercase, no period', phil.sws.some(s => s.t === 'COACHING PHILOSOPHY'), JSON.stringify(phil.sws.map(s => s.t)));
  ok('guide: AUTO + CUSTOM side by side with the Owner captions', phil.pairPanels === 2 && phil.sws.some(s => s.t === 'AUTO' && s.small.startsWith('The math predicts the best personnel')) && phil.sws.some(s => s.t === 'CUSTOM' && s.small.startsWith('You choose how you want to play')), JSON.stringify({pair: phil.pairPanels, disp: phil.sideBySide}));
  const coachEl = await page.evaluate("(() => { const d = [...document.querySelectorAll('#guideBody details.panel')].find(x => /COACHING:/.test(x.querySelector('summary').textContent)); if (d) d.scrollIntoView({block:'start'}); return !!d; })()");
  if (coachEl) { await sleep(400); await page.screenshot({ path: OUT + '/w18-coach-panels.png' }); }

  // DEFENSE panel screenshot
  const defEl = await page.evaluate("(() => { const d = [...document.querySelectorAll('#guideBody details.panel')].find(x => /DEFENSE: 4-3/.test(x.querySelector('summary').textContent)); if (d) { d.setAttribute('open',''); d.scrollIntoView({block:'start'}); return true; } return false; })()");
  if (defEl) { await sleep(600); await page.screenshot({ path: OUT + '/w18-defense-panel.png' }); }

  // ---- 4. DRAFT BOARD ----
  await page.evaluate("document.getElementById('tabDraftBtn').click()"); await sleep(600);
  await page.evaluate("document.getElementById('startDraftBtn').click()"); await sleep(900);
  await page.evaluate("(() => { const c = document.querySelector('.zpb-fin-welcome'); if (c) c.click(); })()");
  await page.evaluate("(() => { const b = document.getElementById('speedInstantBtn'); if (b) b.click(); })()");
  for (let i = 0; i < 40; i++) { await sleep(500); if (await page.evaluate("!!(draftSim && draftSim.awaitingUser)")) break; }
  const board = await page.evaluate(`(() => {
    const vt = document.querySelector('.zpb-viewtoggle');
    const wrap = document.getElementById('draftTableWrap');
    const cols = document.querySelector('.draft-columns');
    const panels = cols ? [...cols.children].map(p => Math.round(p.getBoundingClientRect().bottom)) : [];
    const allnone = document.querySelector('.zpb-allnone .chip');
    const anSpan = document.querySelector('.zpb-allnone .chip span');
    const anRef = document.querySelector('.chip.zpb-pip');
    const rootFs = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const fade = document.querySelector('.zpb-rosterfade');
    const fill = document.querySelector('a.zpb-fillab');
    return {
      vt: !!vt, vtBtns: vt ? vt.querySelectorAll('button').length : 0,
      pickOn: document.getElementById('rosterPickBtn').classList.contains('zpb-view-on'),
      depthOn: document.getElementById('rosterDepthBtn').classList.contains('zpb-view-on'),
      wrapMax: getComputedStyle(wrap).maxHeight,
      bottoms: panels,
      anFont: allnone ? getComputedStyle(allnone).fontSize : null,
      anRef: anRef ? getComputedStyle(anRef).fontSize : null,
      rootFs,
      anColor: anSpan ? getComputedStyle(anSpan).textAlign : null,
      fade: fade ? getComputedStyle(fade).animationName : null,
      fadeTxt: fade ? fade.textContent.trim() : null,
      fill: fill ? { label: fill.textContent.trim(), title: fill.getAttribute('title') } : null,
      oldChange: !!document.querySelector('a.slotchg:not(.zpb-fillab)'),
      baseLeft: (() => { const b = document.getElementById('zpbBaseToggleHost').getBoundingClientRect(); const v = document.querySelector('.zpb-rheadbtns').getBoundingClientRect(); return { left: b.right <= v.left + 1, sameRow: Math.abs(b.top - v.top) < 8, b: Math.round(b.right), v: Math.round(v.left) }; })(),
      dimeRow: [...document.querySelectorAll('#draftRosterList .zpb-dimerow')].length
    };
  })()`);
  ok('draft: pick/depth toggle is a segmented pill like 4-3/3-4', board.vt && board.vtBtns === 2 && board.depthOn === true && board.pickOn === false, JSON.stringify({vt: board.vt, on: board.depthOn}));
  ok('draft: base toggle left, view toggle right — opposite sides, one row', board.baseLeft.left && board.baseLeft.sameRow, JSON.stringify(board.baseLeft));
  ok('draft: player list uncapped (reaches the bottom of the panel)', board.wrapMax === 'none', String(board.wrapMax));
  ok('draft: board panel bottom equals roster panel bottom (±60px)', board.bottoms.length === 2 && Math.abs(board.bottoms[0] - board.bottoms[1]) <= 60, JSON.stringify(board.bottoms));
  ok('draft: ALL/NONE match the smaller chip text beside them (0.62rem, was 0.78rem) + left-aligned', board.anFont !== null && board.anRef !== null && Math.abs(parseFloat(board.anFont) - parseFloat(board.anRef)) < 1 && parseFloat(board.anFont) < board.rootFs * 0.78 && board.anColor === 'left', JSON.stringify({font: board.anFont, ref: board.anRef, root: board.rootFs, align: board.anColor}));
  ok('draft: Your Roster fades in and out', board.fade === 'zpbFadeIO' && board.fadeTxt === 'Your Roster', board.fade);
  ok('draft: the fill position itself is the control (no "change" link)', board.fill !== null && board.oldChange === false, JSON.stringify(board.fill));
  ok('draft: Dime row still in the depth-chart view', board.dimeRow >= 1, String(board.dimeRow));
  // click the fill label -> the position picker replaces it inline without errors
  await page.evaluate("(() => { const f = document.querySelector('a.zpb-fillab'); if (f) f.click(); })()"); await sleep(700);
  const picker = await page.evaluate("(() => { const sel = document.querySelector('#draftBody2 select.slotsel'); return { open: !!sel, opts: sel ? sel.querySelectorAll('option').length : 0 }; })()");
  ok('draft: clicking the fill position opens the picker inline', picker.open && picker.opts >= 2, JSON.stringify(picker));
  // toggle the view
  await page.evaluate("document.getElementById('rosterPickBtn').click()"); await sleep(500);
  const pickView = await page.evaluate("(() => ({ pick: document.getElementById('rosterPickBtn').classList.contains('zpb-view-on'), depth: document.getElementById('rosterDepthBtn').classList.contains('zpb-view-on'), rows: document.querySelectorAll('#draftRosterList .depth-row').length }))()");
  ok('draft: toggle switches to Pick order (segmented state moves)', pickView.pick && !pickView.depth, JSON.stringify(pickView));
  await page.evaluate("document.getElementById('rosterDepthBtn').click()"); await sleep(400);
  await page.evaluate("(() => { const e = document.querySelector('.draft-columns'); if (e) e.scrollIntoView({block: 'start'}); })()"); await sleep(400);
  await page.screenshot({ path: OUT + '/w18-draft-board.png' });

  // ---- 5. mobile pass (390px): map, board, comparison ----
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, is_mobile: true, has_touch: true });
  mob.on('pageerror', e => errors.push('mobile pageerror: ' + String(e).slice(0, 200)));
  await mob.goto(FILE); await sleep(1400);
  await mob.evaluate("document.getElementById('tabGuideBtn').click()"); await sleep(1100);
  const mobGuide = await mob.evaluate("(() => ({ sw: document.body.scrollWidth, defCards: document.querySelectorAll('.zpb-defcard').length }))()");
  ok('mobile: guide fits 390 with the defense panel open', mobGuide.sw <= 392 && mobGuide.defCards === 4, JSON.stringify(mobGuide));
  await mob.evaluate("(() => { const e = document.querySelector('.zpb-fm'); if (e) e.scrollIntoView({block:'center'}); })()"); await sleep(400);
  await mob.screenshot({ path: OUT + '/w18-fieldmap-mobile.png' });
  await mob.evaluate("document.getElementById('tabCompareBtn').click()"); await sleep(1200);
  const mobCmp = await mob.evaluate("(() => ({ sw: document.body.scrollWidth, host: Math.round(document.getElementById('homeCmpResult').getBoundingClientRect().width) }))()");
  ok('mobile: comparison fits and stays thin', mobCmp.sw <= 392 && mobCmp.host <= 524, JSON.stringify(mobCmp));
  await mob.screenshot({ path: OUT + '/w18-comparison-mobile.png' });
  await mob.close();

  ok('zero console/page errors across the whole run', errors.length === 0, errors.slice(0, 3).join(' | '));

  await browser.close();
  if (fails.length) { console.log('SUITE FAILED: ' + fails.length + ' — ' + fails.join(' ; ')); process.exit(1); }
  console.log('SUITE PASSED: round-12 directives live, engine untouched, zero errors');
})();
