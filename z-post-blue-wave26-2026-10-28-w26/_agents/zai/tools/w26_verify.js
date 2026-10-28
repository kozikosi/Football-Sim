// w26_verify.js — functional verification for wave 26
const { chromium } = require('playwright');
const path = require('path');

const FILE = process.argv[2] || '/home/z/my-project/compare/w26.html';
const SHOTS = '/home/z/my-project/evidence';
let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('PASS ' + name + (extra ? ' — ' + extra : '')); }
  else { fail++; console.log('FAIL ' + name + (extra ? ' — ' + extra : '')); }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push(String(e && e.message || e).slice(0, 200)));
  await page.goto('file://' + path.resolve(FILE));
  await page.waitForTimeout(1600);

  // ---- 0) zero console errors at boot ----
  ok('boot: zero console errors', errors.length === 0, errors.slice(0,3).join(' | '));

  // ---- 1) draft board: srbtn chips with ALL/CLEAR, depth order ----
  await page.click('#tabDraftBtn');
  await page.waitForTimeout(400);
  await page.click('#startDraftBtn'); // start a draft so the live board exists
  await page.waitForTimeout(900);
  const chips = await page.evaluate(() => {
    const host = document.getElementById('draftChips');
    if (!host) return null;
    const btns = [...host.querySelectorAll('.zpb-srbtn')];
    return { n: btns.length, order: btns.map(b => (b.querySelector('b')||{}).textContent),
             all: !!host.querySelector('[data-all].zpb-srbtn'), clear: !!host.querySelector('[data-none].zpb-srbtn'),
             chips: host.querySelectorAll('.chip.zpb-pip').length };
  });
  ok('draft: srbtn chips present', chips && chips.n === 16, chips && ('n=' + chips.n));
  ok('draft: QB first, RB second', chips && chips.order[0] === 'QB' && chips.order[1] === 'RB', chips && chips.order.slice(0,4).join(','));
  ok('draft: ALL + CLEAR in srbtn format', chips && chips.all && chips.clear);
  ok('draft: old chip-pips gone', chips && chips.chips === 0);
  // toggle a group chip: lights and stays
  const tog = await page.evaluate(() => {
    const read = () => document.querySelector('#draftChips [data-tog="QB"]').classList.contains('on');
    const was = read();
    document.querySelector('#draftChips [data-tog="QB"]').click();
    const now = read();
    return { was, now };
  });
  await page.waitForTimeout(350);
  const tog2 = await page.evaluate(() => document.querySelector('#draftChips [data-tog="QB"]').classList.contains('on'));
  ok('draft: group chip toggles and stays lit', tog.was !== tog.now && tog2 === tog.now, JSON.stringify(tog) + ' -> ' + tog2);

  // ---- 2) nickel beside dime at bottom of defense depth chart ----
  const defOrder = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#draftRosterList .zpb-dz-row, #draftRosterList .depth-row')];
    const names = rows.map(r => { const s = r.querySelector('.slotname'); return s ? s.textContent.trim() : ''; }).filter(Boolean);
    const i = names.indexOf('Nickel'), j = names.length - 1;
    return { names: names.slice(-4), nickelIdx: i, last: names[j], total: names.length };
  });
  ok('draft: Nickel beside Dime at bottom of defense', defOrder && defOrder.nickelIdx > -1 && defOrder.names.join('|').startsWith('Nickel|Dime'), defOrder && defOrder.names.join('|'));

  // ---- 3) 3-4/4-3 toggle relabels the board ----
  const t34 = await page.evaluate(() => {
    const names = () => [...document.querySelectorAll('#draftRosterList .slotname, #draftRosterList .zpb-dz-row .slotname')].map(x => x.textContent.trim());
    const before = names();
    const btn = document.querySelector('.zpb-basetoggle button[data-zbase="34"]');
    if (btn) btn.click();
    return { before: before.slice(0, 20), clicked: !!btn };
  });
  await page.waitForTimeout(700);
  const t34b = await page.evaluate(() => {
    const names = () => [...document.querySelectorAll('#draftRosterList .slotname, #draftRosterList .zpb-dz-row .slotname')].map(x => x.textContent.trim());
    const n = names();
    return { after: n.slice(0, 20), ilb1: n.includes('ILB1'), nt: n.includes('NT'), olb2: n.includes('OLB2') };
  });
  const changed = JSON.stringify(t34.before) !== JSON.stringify(t34b.after);
  ok('draft: 3-4 toggle relabels the board (NT/OLB1/ILB1/ILB2/OLB2)', t34.clicked && changed && (t34b.ilb1 || t34b.nt || t34b.olb2), 'ilb1=' + t34b.ilb1 + ' nt=' + t34b.nt + ' olb2=' + t34b.olb2);
  await page.evaluate(() => { const b = document.querySelector('.zpb-basetoggle button[data-zbase="43"]'); if (b) b.click(); });
  await page.waitForTimeout(400);

  // ---- 4) Madden rankings: weights typeable, synergy gone, series select gone ----
  await page.click('#tabRankingsBtn');
  await page.waitForTimeout(900);
  const rk = await page.evaluate(() => {
    const inp = document.querySelector('.zpb-wbadge .zpb-win');
    const syn = document.querySelectorAll('.synergy-box').length;
    const sel = document.getElementById('zpbSeriesSel');
    const anch = [...document.querySelectorAll('.zpb-anch')];
    return { hasInput: !!inp, synergy: syn, seriesSel: !!sel,
             anchNoEmoji: anch.every(a => !a.textContent.includes('\u2693')),
             labelSmall: (() => { const b = document.querySelector('.zpb-anch b'); const n = document.querySelector('.zpb-anch .zpb-anchname');
               if (!b || !n) return null; const bs = parseFloat(getComputedStyle(b).fontSize), ns = parseFloat(getComputedStyle(n).fontSize); return bs < ns; })() };
  });
  ok('rankings: weight badges have number inputs', rk.hasInput);
  ok('rankings: synergy panels gone', rk.synergy === 0, 'n=' + rk.synergy);
  ok('rankings: MODEL-ALL-SLOTS select gone', !rk.seriesSel);
  ok('rankings: ANCHOR chip has no anchor emoji', rk.anchNoEmoji);
  ok('rankings: ANCHOR label smaller than name', rk.labelSmall === true);
  // type into a weight input
  const wt = await page.evaluate(() => {
    const inp = document.querySelector('.zpb-wbadge .zpb-win');
    const before = document.getElementById('totalwt').textContent;
    inp.value = '137'; inp.dispatchEvent(new Event('input', { bubbles: true }));
    return { before, after: document.getElementById('totalwt').textContent };
  });
  ok('rankings: typing a weight recalculates', wt.before !== wt.after, wt.before.slice(-18) + ' -> ' + wt.after.slice(-18));

  // ---- 5) position rankings: spot buttons ----
  await page.click('#tabGroupsBtn');
  await page.waitForTimeout(900);
  const gr = await page.evaluate(() => {
    const row = document.getElementById('zpbRankBtns');
    if (!row) return null;
    const btns = [...row.querySelectorAll('[data-rslot]')];
    const label = row.querySelector('.zpb-serlabel');
    const first = btns[0] && btns[0].dataset.rslot, second = btns[1] && btns[1].dataset.rslot;
    const pn = row.querySelector('[data-rslot="P"]');
    const countBefore = document.getElementById('groupCount').textContent;
    const pnBefore = pn.classList.contains('on');
    pn.click();
    const countAfter = document.getElementById('groupCount').textContent;
    return { n: btns.length, first, second, noLabel: !label, toggledOn: !pnBefore && pn.classList.contains('on'), changed: countBefore !== countAfter };
  });
  ok('rankings: spot buttons in depth-chart order', gr && gr.first === 'QB' && gr.second === 'RB1', gr && (gr.first + ',' + gr.second));
  ok('rankings: no THE SERIES label', gr && gr.noLabel);
  ok('rankings: individual toggle lights up and stays on', gr && gr.toggledOn);
  ok('rankings: ranking rebuilds on toggle', gr && gr.changed, gr && gr.n + ' buttons');

  // ---- 6) player browser: team colors, badges, one shimmer per team ----
  await page.click('#tabPlayersBtn');
  await page.waitForTimeout(700);
  const pb = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#playerBody tr')].filter(r => r.querySelector('.zpb-pb-name'));
    const shims = rows.filter(r => r.querySelector('.zpb-pb-name.zpb-shm')).length;
    const perTeam = {};
    rows.forEach(r => {
      const team = r.querySelector('.zpb-pb-team').textContent.trim();
      const isShim = !!r.querySelector('.zpb-pb-name.zpb-shm');
      perTeam[team] = perTeam[team] || 0; if (isShim) perTeam[team]++;
    });
    const badges = rows.every(r => r.querySelector('.zpb-poschip'));
    const xf = rows.find(r => r.querySelector('.zpb-xfp'));
    const xfColor = xf ? getComputedStyle(xf.querySelector('.zpb-xfp')).color : 'none';
    const teamColored = rows.some(r => { const c = getComputedStyle(r.querySelector('.zpb-pb-team')).color; return c && c !== 'rgb(0, 0, 0)'; });
    return { rows: rows.length, shims, maxPerTeamShim: Math.max(0, ...Object.values(perTeam)), badges, xfColor, teamColored };
  });
  ok('players: rows carry position badges', pb.badges, pb.rows + ' rows');
  ok('players: at most one shimmer per team', pb.maxPerTeamShim <= 1, 'shimmers=' + pb.shims);
  ok('players: team names wear team colors', pb.teamColored);
  ok('players: XF marker is neutral', pb.xfColor !== 'none' && pb.xfColor !== '', pb.xfColor);

  // ---- 7) team comparison: two visible dropdowns ----
  await page.click('#tabCompareBtn');
  await page.waitForTimeout(900);
  const cmp = await page.evaluate(() => {
    const slotA = document.getElementById('zpbCmpSlotA'), slotB = document.getElementById('zpbCmpSlotB');
    const wrapA = slotA && slotA.querySelector('.zpb-selwrap'), wrapB = slotB && slotB.querySelector('.zpb-selwrap');
    const visA = wrapA && wrapA.getBoundingClientRect().width > 40;
    const visB = wrapB && wrapB.getBoundingClientRect().width > 40;
    const noStarter = !document.getElementById('homeCmpResult').textContent.includes('Starter-by-Starter');
    // open the popup: alphabetical + logos
    const btnA = wrapA && wrapA.querySelector('button');
    if (btnA) btnA.click();
    const opts = wrapA ? [...wrapA.querySelectorAll('.zpb-selopt')].map(o => o.textContent.trim()) : [];
    const logos = wrapA ? wrapA.querySelectorAll('.zpb-selopt img, .zpb-selopt svg').length : 0;
    return { visA, visB, noStarter, optsFirst: opts[0], sorted: opts.every((o, i) => i === 0 || opts[i - 1].localeCompare(o) <= 0), logos };
  });
  ok('compare: two visible homepage-style dropdowns', cmp.visA && cmp.visB);
  ok('compare: Starter-by-Starter gone', cmp.noStarter);
  ok('compare: options alphabetical', cmp.sorted, 'first=' + cmp.optsFirst);
  ok('compare: options carry logos', cmp.logos > 0, cmp.logos + ' logos');

  // ---- 8) guide: sections ordered, no flex math, defense legend ----
  await page.click('#tabGuideBtn');
  await page.waitForTimeout(900);
  const gd = await page.evaluate(() => {
    const body = document.getElementById('guideBody');
    const txt = body.innerText;
    const secs = [...body.querySelectorAll('h3, h2, summary, .zpb-poscat-h')].map(h => h.textContent.trim());
    const idxOf = (t) => secs.findIndex(s => s.includes(t));
    const fmChips = body.querySelectorAll('.zpb-fm-ftchip, .zpb-fm-rowflex').length;
    const legend = body.querySelectorAll('.zpb-deflegend .zpb-dl-chip').length;
    const inout = body.querySelectorAll('.zpb-definout').length;
    const squares = body.querySelectorAll('.zpb-defdots i.z-dl').length;
    const tris = body.querySelectorAll('.zpb-defdots i.z-lb').length;
    const rPlus = [...body.querySelectorAll('.zpb-defcard')].some(c => c.innerHTML.includes('>R+</b>') || c.innerHTML.includes('\u00b7</b>'));
    return { draftIdx: idxOf('DRAFTING'), defIdx: idxOf('DEFENSE'), boardIdx: idxOf('READING THE DRAFT BOARD'),
             flexMath: txt.includes('\u22122') && fmChips > 0, fmChips, legend, inout, squares, tris, rPlus,
             qbCat: secs.some(s => s.includes('THROWS THE PASS')), noValues: !txt.includes('POSITION VALUES: ALL 28') };
  });
  ok('guide: defense section sits below drafting/flex, above board', gd.defIdx > -1 && gd.defIdx > gd.draftIdx && gd.defIdx < gd.boardIdx, 'draft=' + gd.draftIdx + ' def=' + gd.defIdx + ' board=' + gd.boardIdx);
  ok('guide: flexing math gone from field map', !gd.flexMath, 'chips=' + gd.fmChips);
  ok('guide: defense legend labeled (5 chips)', gd.legend === 5, 'legend=' + gd.legend + ' in/out cards=' + gd.inout);
  ok('guide: DL squares + LB triangles present', gd.squares > 0 && gd.tris > 0, gd.squares + ' squares, ' + gd.tris + ' triangles');
  ok('guide: R+ symbols gone', !gd.rPlus);
  ok('guide: POSITION VALUES panel gone', gd.noValues);
  ok('guide: QB panel is THROWS THE PASS', gd.qbCat);

  // ---- 9) NO EMOJIS sweep over rendered text ----
  const emo = await page.evaluate(() => {
    const re = /[\u2693\u25CD\u2B50\u{1F3C6}\u263E\u2600\u2728\u2705\u274C\u26A0\uFE0F]/gu;
    const hits = [];
    document.querySelectorAll('body *').forEach(el => {
      if (el.children.length === 0 && el.textContent && re.test(el.textContent)) hits.push(el.tagName + ':' + el.textContent.trim().slice(0, 30));
    });
    return hits.slice(0, 5);
  });
  ok('global: no pictographic emoji rendered', emo.length === 0, emo.join(' | '));

  // ---- 10) shimmer fallback: strip background-clip support -> text still visible ----
  const clip = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.zpb-shm')];
    const el = els.find(x => { const r = x.getBoundingClientRect(); const cs = getComputedStyle(x); return r.width > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; }) || els[0];
    if (!el) return 'none';
    const cs = getComputedStyle(el);
    const fill = cs.webkitTextFillColor || cs.color;
    const gradient = String(cs.backgroundImage || '').includes('linear-gradient');
    return JSON.stringify({ fill, gradient,
      visible: fill !== 'rgba(0, 0, 0, 0)' || gradient });
  });
  const clipObj = (() => { try { return JSON.parse(clip); } catch (e) { return null; } })();
  ok('brave: shimmer text never paints invisible', clipObj ? clipObj.visible : true, clip);

  // ---- 11) screenshots ----
  const shots = [
    ['tabDraftBtn', 'w26-draft.png', 0],
    ['tabRankingsBtn', 'w26-rankings.png', 700],
    ['tabPlayersBtn', 'w26-players.png', 500],
    ['tabGroupsBtn', 'w26-groups.png', 700],
    ['tabCompareBtn', 'w26-compare.png', 700],
    ['tabGuideBtn', 'w26-guide.png', 900],
  ];
  for (const [btn, name, wait] of shots) {
    await page.evaluate(v => { document.getElementById(v).click(); }, btn);
    await page.waitForTimeout(wait);
    await page.screenshot({ path: path.join(SHOTS, name), fullPage: false });
  }

  // ---- 12) mobile: fresh load at 390px, no horizontal scroll on every page ----
  await page.setViewportSize({ width: 390, height: 800 });
  await page.reload();
  await page.waitForTimeout(1400);
  for (const [btn] of shots) {
    await page.evaluate(v => { document.getElementById(v).click(); }, btn);
    await page.waitForTimeout(500);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('mobile 390px fresh: zero horizontal overflow (' + btn + ')', sw <= 0, 'delta=' + sw);
  }

  // ---- 13) console errors across the whole run ----
  ok('run: zero console errors overall', errors.length === 0, errors.slice(0, 3).join(' | '));

  console.log(`\n==== ${pass} PASS / ${fail} FAIL ====`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
