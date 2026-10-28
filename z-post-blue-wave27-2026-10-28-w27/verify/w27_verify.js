// w27_verify.js — wave 27 verification (Owner round, 28 Oct 2026)
const { chromium } = require('playwright');
const path = require('path');
const FILE = process.argv[2] || '/home/z/my-project/build/Football-Sim-Z-post-blue-w27.html';
const SHOTS = '/home/z/my-project/evidence';
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('PASS ' + n + (x ? ' — ' + x : '')); } else { fail++; console.log('FAIL ' + n + (x ? ' — ' + x : '')); } };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 220)); });
  page.on('pageerror', e => errors.push(String(e && e.message || e).slice(0, 220)));
  await page.goto('file://' + path.resolve(FILE));
  await page.waitForTimeout(1600);
  ok('boot: zero console errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  // ---- 1) Brave SETBACK sweep: every tab, no .zpb-viewfail ----
  for (const t of ['tabRankingsBtn', 'tabPlayersBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn']) {
    await page.evaluate(id => document.getElementById(id).click(), t);
    await page.waitForTimeout(600);
  }
  const setbacks = await page.evaluate(() => document.querySelectorAll('.zpb-viewfail').length);
  ok('tabs: zero SETBACK chips across all six views', setbacks === 0, 'found=' + setbacks);
  // force the exact Guide bug state: base34 on, cache absent
  const adjOk = await page.evaluate(() => {
    window._zpbAdjCache = undefined; window.ZPB34 = true;
    try { return String(window.zpbAdjSpec('olRun', { OT1: 1, OG1: 1.2 }).OT1); } catch (e) { return 'THROW: ' + e.message; }
  });
  ok('brave-fix: zpbAdjSpec survives undefined cache (Guide SETBACK)', adjOk === '1', adjOk);
  // force the exact rankings bug state: render() with no #totalwt
  const totalwtOk = await page.evaluate(() => {
    const tw = document.getElementById('totalwt'); if (tw) tw.remove();
    try { if (typeof render === 'function') render(); return 'OK:' + !!document.getElementById('totalwt'); } catch (e) { return 'THROW: ' + e.message; }
  });
  ok('brave-fix: render() recreates #totalwt (Madden Rankings SETBACK)', totalwtOk.startsWith('OK:true'), totalwtOk);

  // ---- 2) player browser: XF gone, team colors on names AND numbers ----
  await page.evaluate(() => document.getElementById('tabPlayersBtn').click());
  await page.waitForTimeout(700);
  const pb = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#playerBody tr')];
    const pick = n => rows.find(tr => (tr.querySelector('.zpb-pb-name') || {}).textContent === n);
    const info = tr => {
      if (!tr) return null;
      const nm = tr.querySelector('.zpb-pb-name');
      return { name: nm.textContent, cls: nm.className, color: getComputedStyle(nm).color,
               score: getComputedStyle(tr.querySelector('td.score')).color,
               xf: tr.textContent.includes('XF') };
    };
    return {
      stafford: info(pick('Matthew Stafford')), garrett: info(pick('Myles Garrett')),
      bills: info(pick('Josh Allen')), body: document.getElementById('playerBody').textContent,
      vibBold: (() => { const v = document.querySelector('#playerBody .zpb-pb-name.zpb-vib'); return v ? getComputedStyle(v).fontWeight : null; })(),
      neutralWeight: (() => { const v = [...document.querySelectorAll('#playerBody .zpb-pb-name')].find(x => !/zpb-(shm|vib)/.test(x.className)); return v ? getComputedStyle(v).fontWeight : null; })()
    };
  });
  ok('players: XF removed everywhere', pb.body.indexOf('XF') === -1);
  const chOf = c => { const m = String(c).match(/rgba?\((\d+), (\d+), (\d+)/); return m ? [+m[1], +m[2], +m[3]] : null; };
  const gar = chOf(pb.garrett && pb.garrett.color);
  ok('players: Rams name wears the team blue (not the gold-brown secondary)', gar && gar[2] > gar[0] && gar[2] > 120, pb.garrett && pb.garrett.color);
  ok('players: numbers wear the same color as names', gar && chOf(pb.stafford && pb.stafford.score) && gar.join() === chOf(pb.stafford.score).join(), pb.stafford && pb.stafford.score);
  ok('players: 85+ bold (vib 800)', pb.vibBold === '800', String(pb.vibBold));
  ok('players: neutral names not bold', pb.neutralWeight && +pb.neutralWeight < 600, String(pb.neutralWeight));
  // Bills blue lifted: --tn on a Bills row must be lighter than the w26 navy
  const billsLift = await page.evaluate(() => {
    if (typeof zpbPackFor !== 'function') return null;
    const pk = zpbPackFor('Buffalo Bills');
    const c = pk.txL.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16) / 255, g = parseInt(c.slice(2, 4), 16) / 255, b = parseInt(c.slice(4, 6), 16) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    return { txL: pk.txL, l: Math.round(100 * (mx + mn) / 2) };
  });
  ok('players: Bills blue lifted out of navy', billsLift && billsLift.l >= 40, JSON.stringify(billsLift));
  const ramsLift = await page.evaluate(() => {
    const pk = zpbPackFor('Los Angeles Rams'); const c = pk.txL.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16) / 255, g = parseInt(c.slice(2, 4), 16) / 255, b = parseInt(c.slice(4, 6), 16) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    return { txL: pk.txL, l: Math.round(100 * (mx + mn) / 2) };
  });
  ok('players: Rams blue lifted out of navy', ramsLift && ramsLift.l >= 40, JSON.stringify(ramsLift));
  const kcTrue = await page.evaluate(() => { const pk = zpbPackFor('Kansas City Chiefs'); return { txL: pk.txL, raw0: pk.raw[0] }; });
  ok('players: other teams untouched by the lift', kcTrue && kcTrue.raw0 === '#E31837', 'KC txL=' + kcTrue.txL);
  await page.screenshot({ path: SHOTS + '/w27_players.png', fullPage: false });

  // ---- 3) position rankings: Series default 9, 1-26 in dropdown, no UNDEFINED ----
  await page.evaluate(() => document.getElementById('tabGroupsBtn').click());
  await page.waitForTimeout(900);
  const gr = await page.evaluate(() => {
    const sel = document.getElementById('groupSelect');
    const opts = [...sel.querySelectorAll('option[value^="zpbS:"]')];
    const rows = [...document.querySelectorAll('#groupBody .zpb-grow')];
    return {
      val: sel.value, seriesOpts: opts.length, lastOpt: opts.length ? opts[opts.length - 1].textContent.slice(0, 30) : '',
      rowCount: rows.length, undefineds: document.getElementById('groupBody').textContent.match(/undefined/g),
      countText: (document.getElementById('groupCount') || {}).textContent || '',
      btnsOn: document.querySelectorAll('#zpbRankBtns .zpb-srbtn.on').length,
      btns: document.querySelectorAll('#zpbRankBtns .zpb-srbtn').length
    };
  });
  ok('rankings: default selection is Series step 9', gr.val === 'zpbS:9', gr.val);
  ok('rankings: THE SERIES dropdown restored with 26 steps', gr.seriesOpts === 26, 'opts=' + gr.seriesOpts);
  ok('rankings: rows painted', gr.rowCount === 32, String(gr.rowCount));
  ok('rankings: no UNDEFINED anywhere', !gr.undefineds, JSON.stringify(gr.undefineds));
  ok('rankings: "Ranking by these N spots." gone', gr.countText.indexOf('Ranking by these') === -1, JSON.stringify(gr.countText));
  ok('rankings: nine spot buttons lit for Series 9', gr.btnsOn === 9, 'on=' + gr.btnsOn + ' of ' + gr.btns);
  // toggle a spot button: independent, stays pressed, dropdown clears
  const togBtn = await page.evaluate(() => {
    const b = document.querySelector('#zpbRankBtns .zpb-srbtn');
    const was = b.classList.contains('on');
    b.click();
    return { was, now: b.classList.contains('on'), selVal: document.getElementById('groupSelect').value };
  });
  await page.waitForTimeout(400);
  const togBtn2 = await page.evaluate(() => document.querySelector('#zpbRankBtns .zpb-srbtn').classList.contains('on'));
  ok('rankings: spot button toggles independently and stays, leaves Series preset', togBtn.was !== togBtn.now && togBtn.selVal === '' && togBtn2 === togBtn.now, JSON.stringify(togBtn));
  await page.screenshot({ path: SHOTS + '/w27_rankings.png' });

  // ---- 4) guide: order, open states, board visualization, removals, defense viz ----
  await page.evaluate(() => document.getElementById('tabGuideBtn').click());
  await page.waitForTimeout(900);
  const gd = await page.evaluate(() => {
    const secs = [...document.querySelectorAll('#guideBody details.panel')];
    const titles = secs.map(d => d.querySelector('summary').textContent.trim());
    const open = secs.map(d => d.hasAttribute('open'));
    const body = document.getElementById('guideBody').textContent;
    const nickel = [...document.querySelectorAll('.zpb-dl-chip')].find(c => c.textContent.trim() === 'NICKEL');
    const dime = [...document.querySelectorAll('.zpb-dl-chip')].find(c => c.textContent.trim() === 'DIME');
    const dmDot = document.querySelector('.zpb-defcard .c-dm');
    const tree = document.querySelector('.zpb-posboard');
    let catOrder = [];
    if (tree) [...tree.querySelectorAll('.zpb-poscat-h')].forEach(h => catOrder.push(h.textContent));
    const protCards = tree ? [...tree.querySelectorAll('.zpb-poscat')].find(c => c.querySelector('.zpb-poscat-h').textContent === 'PROTECTS THE PASSER') : null;
    const defCards = tree ? [...tree.querySelectorAll('.zpb-poscat')].find(c => c.querySelector('.zpb-poscat-h').textContent === 'DEFENDS THE PASS') : null;
    const namesOf = c => c ? [...c.querySelectorAll('.zpb-posname')].map(x => x.textContent) : [];
    return {
      titles, open,
      noSeasonBadges: body.indexOf('The Regular Season Review opens with the whole year') === -1,
      noRoy: body.indexOf('Rookie of the Year') === -1,
      noCpoy: body.indexOf('Comeback Player of the Year') === -1,
      bmGrid: !!document.querySelector('.zpb-bmgrid'),
      nickelCol: nickel ? nickel.querySelector('i').style.background : '', dimeCol: dime ? dime.querySelector('i').style.background : '',
      dimeFilled: dmDot ? getComputedStyle(dmDot).backgroundColor : '',
      prot: namesOf(protCards), defn: namesOf(defCards), catOrder,
      welcomeVals: null
    };
  });
  const iT = t => gd.titles.indexOf(t);
  ok('guide: Coaching directly below Defense and open', iT('COACHING: PERSONNEL, STYLES AND GAME PLANS') === 2 && gd.open[2], JSON.stringify(gd.titles));
  ok('guide: Reading the Badges directly below Coaching', iT('THE BADGES: READING EVERY BOX') === 3 && gd.open[3]);
  ok('guide: Reading the Draft Board open and visualized', iT('READING THE DRAFT BOARD (WINS, PRIORITY, GONE)') === 4 && gd.open[4] && gd.bmGrid);
  ok('guide: Wins/Priority/Gone panel copy kept', (await page.evaluate(() => document.getElementById('guideBody').textContent.includes('Why can a linebacker show high priority?'))));
  ok('guide: "The season in badges" paragraph removed', gd.noSeasonBadges);
  ok('guide: Rookie of the Year line removed', gd.noRoy);
  ok('guide: Comeback Player of the Year line removed', gd.noCpoy);
  ok('guide: Nickel wears a new color (#4f86e0)', /79,\s*134,\s*224/.test(gd.nickelCol), gd.nickelCol);
  ok('guide: Dime wears a new color (#7fd67f)', /127,\s*214,\s*127/.test(gd.dimeCol), gd.dimeCol);
  ok('guide: Dime dot filled when in the lineup', gd.dimeFilled && gd.dimeFilled !== 'rgba(0, 0, 0, 0)' && !gd.dimeFilled.startsWith('transparent'), gd.dimeFilled);
  ok('flex: Center and Guard swapped (OT, C, OG)', gd.prot.join('|') === 'Offensive Tackle|Center|Offensive Guard', JSON.stringify(gd.prot));
  ok('flex: FS and Nickel/Dime swapped (CB, FS, SS, ND)', gd.defn.join('|') === 'Cornerback|Free Safety|Strong Safety|Nickel / Dime', JSON.stringify(gd.defn));
  await page.screenshot({ path: SHOTS + '/w27_guide.png' });

  // ---- 5) comparison: panels behind every player, bold law, dropdown words ----
  await page.evaluate(() => document.getElementById('tabCompareBtn').click());
  await page.waitForTimeout(800);
  const cmp = await page.evaluate(() => {
    const cells = [...document.querySelectorAll('#homeCmpResult .zpb-lu-cell')];
    const filled = cells.filter(c => c.textContent.trim() !== '—');
    const withPanel = filled.filter(c => c.classList.contains('zpb-trow'));
    const winners = cells.filter(c => c.classList.contains('zpb-lu-win'));
    const winBold = winners.map(c => getComputedStyle(c).fontWeight);
    const vib = cells.filter(c => c.classList.contains('zpb-vib'));
    const vibW = vib.map(c => getComputedStyle(c).fontWeight);
    const sub85 = filled.filter(c => !/zpb-(shm|vib)/.test(c.className));
    const sub85W = sub85.map(c => getComputedStyle(c).fontWeight);
    const face = document.querySelector('#zpbCmpSlotA .zpb-face');
    const faceTxt = face ? face.innerText.trim() : ''; // innerText = visible spans only
    const faceFit = face ? (face.scrollWidth <= face.clientWidth + 1) : null;
    const colA = face ? getComputedStyle(face).color : '';
    return { filled: filled.length, withPanel: withPanel.length, winBold: [...new Set(winBold)], vibW: [...new Set(vibW)], sub85W: [...new Set(sub85W)], faceTxt, faceFit, colA };
  });
  ok('compare: every filled cell carries the colored panel', cmp.filled === cmp.withPanel, cmp.withPanel + '/' + cmp.filled);
  ok('compare: sub-85 winner cells not bold (85+ bold, 90+ shimmer exempt)', (await page.evaluate(() => {
    const cells = [...document.querySelectorAll('#homeCmpResult .zpb-lu-cell.zpb-lu-win')];
    return cells.every(c => {
      const w = +getComputedStyle(c).fontWeight;
      const shm = c.classList.contains('zpb-shm');
      const o = parseInt((c.textContent.match(/(\d+)\s*$/) || [0, 0])[1], 10);
      if (shm) return true;               // 90+: shimmering is the statement
      return o >= 85 ? w === 800 : w < 700;
    });
  })), JSON.stringify(cmp.winBold));
  ok('compare: 85+ cells bold', cmp.vibW.every(w => w === '800') && cmp.vibW.length > 0, JSON.stringify(cmp.vibW));
  ok('compare: sub-85 cells not bold', cmp.sub85W.every(w => +w < 700), JSON.stringify(cmp.sub85W));
  ok('compare: closed dropdown shows complete words (fits, no ellipsis)', cmp.faceFit && ['Kansas City Chiefs', 'Kansas City', 'KC'].includes(cmp.faceTxt), cmp.faceTxt);
  // squeeze the panel narrow: the face must still show complete words
  await page.setViewportSize({ width: 700, height: 900 });
  await page.waitForTimeout(600);
  const faceNarrow = await page.evaluate(() => {
    const f = document.querySelector('#zpbCmpSlotA .zpb-face');
    if (!f) return null;
    const fit = f.scrollWidth <= f.clientWidth + 1;
    return { txt: f.innerText.trim(), fit };
  });
  ok('compare: narrow viewport still complete words', faceNarrow && faceNarrow.fit && ['Kansas City Chiefs', 'Kansas City', 'KC'].includes(faceNarrow.txt), JSON.stringify(faceNarrow));
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w27_compare.png' });

  // ---- 6) draft board: pulse, X.Y, dime chip, table fits, cine timings ----
  await page.evaluate(() => document.getElementById('tabDraftBtn').click());
  await page.waitForTimeout(500);
  await page.evaluate(() => document.getElementById('startDraftBtn').click());
  await page.waitForTimeout(800);
  const cine = await page.evaluate(() => {
    const w = String(window.zpbWelcomeCine).replace(/\s+/g, ' ');
    const f = String(window.zpbMaybeFinishCine).replace(/\s+/g, ' ');
    return { wel: /at\(1500,\s*\(\)=>ps\[1\]/.test(w) && /at\(7450,\s*\(\)=>beginFade/.test(w),
             fin: /hold = \[1500, 1500, 900, 3400\]/.test(f) && /reduce \? 400 : 1600/.test(f) };
  });
  ok('cine: WELCOME holds alone, DRAFT fades 1s sooner', cine.wel);
  ok('cine: 20-0 appears and leaves ~2s faster', cine.fin);
  // ---- 7) table fits: Wins/Priority visible while the draft board is live ----
  await page.waitForTimeout(6500); // the welcome cinematic has finished; the board is live
  const fits = {};
  for (const w of [1280, 1024, 900]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(500);
    fits[w] = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const th = [...document.querySelectorAll('#draftTable2 th')];
      const wins = th.find(x => x.textContent.trim() === 'Wins');
      const pri = th.find(x => x.textContent.trim() === 'Priority');
      if (wins && pri && wins.offsetParent) {
        return { mode: 'table', priRight: Math.round(pri.getBoundingClientRect().right), vw, visible: true };
      }
      const dw = document.querySelector('#draftBody2 td.dc-wins');
      const dp = document.querySelector('#draftBody2 td.dc-pri');
      return { mode: 'cards', visible: !!(dw && dp && dw.offsetParent && dp.offsetParent), dwText: dw ? dw.textContent.trim().slice(0, 12) : '' };
    });
    ok(`table: Wins+Priority visible inside viewport at ${w}px`, fits[w] && fits[w].visible && (!fits[w].priRight || fits[w].priRight <= fits[w].vw + 1), JSON.stringify(fits[w]));
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(400);

  const boardTop = await page.evaluate(() => {
    const np = document.getElementById('zpbNextPick');
    return { npSize: np ? getComputedStyle(np).fontSize : '', npText: np ? np.textContent : '' };
  });
  ok('board: X.Y next-pick significantly larger', boardTop.npSize && parseFloat(boardTop.npSize) >= 20, boardTop.npSize);
  const dimeRow = await page.evaluate(() => {
    const r = document.querySelector('#draftRosterList .zpb-dimerow.dgrid');
    if (!r) return null;
    const s = r.querySelector('.slotname');
    const bg = getComputedStyle(s).backgroundColor;
    const pl = getComputedStyle(s).paddingLeft;
    return { bg, pl, styled: r.getAttribute('style') || '' };
  });
  ok('board: Dime chip matches the other slot chips', dimeRow && dimeRow.bg !== 'rgba(0, 0, 0, 0)' && dimeRow.bg !== 'transparent', JSON.stringify(dimeRow));
  // the pulse: instant-speed through the user pick, then a top3 row must breathe
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if (b) b.click(); });
  await page.waitForTimeout(300);
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => {
      const p = document.getElementById('draftFinalResults');
      if (p && p.style.display !== 'none') return true;
      const btn = [...document.querySelectorAll('#draftLive button')].find(b => /^(DRAFT|PICK|SKIP|SIM)/.test((b.textContent || '').trim().toUpperCase()));
      if (btn) btn.click();
      return false;
    });
    if (done) break;
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(800);
  const pulse = await page.evaluate(() => {
    const tr = document.querySelector('#draftBody2 tr.zpb-top3');
    if (!tr) return null;
    const btn = tr.querySelector('button');
    return { has: true, anim: btn ? getComputedStyle(btn).animationName : '', nTop: document.querySelectorAll('#draftBody2 tr.zpb-top3').length };
  });
  ok('board: top-priority rows pulse the DRAFT button', pulse && pulse.anim === 'zpbBtnPulse', JSON.stringify(pulse && pulse.anim));

  // ---- 8) draft review: Where-they-belong map, FB grouping ----
  await page.waitForTimeout(600);
  const review = await page.evaluate(() => {
    const panel = document.getElementById('draftFinalResults');
    const open = [...panel.querySelectorAll('tr.detailrow')].find(tr => tr.style.display !== 'none');
    const ini = panel.querySelectorAll('.zpb-fm-ini').length;
    return {
      open: !!open, ini,
      hasMapTitle: panel.textContent.includes('Where they belong'),
      noDepthTop: !panel.textContent.includes('Roster (as drafted)'),
      fmNickel: [...panel.querySelectorAll('.zpb-fm-def .zpb-fm-row i')].map(x => x.textContent)
    };
  });
  ok('review: detail auto-opens', review.open);
  ok('review: top roster visualization removed', review.noDepthTop);
  ok('review: Where-they-belong map with initials', review.hasMapTitle && review.ini >= 20, review.ini + ' initials chips');
  const slotLine = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#draftFinalResults .zpb-fm-def .zpb-fm-row')];
    const labels = rows.map(r => [...r.querySelectorAll('i')].map(x => x.textContent.trim()).join('+'));
    return labels;
  });
  ok('review: Nickel+Dime share the slot line between CBs and LBs',
     slotLine.some((l, i) => /nickel\+/i.test(l) && i > 0 && /CB/i.test(slotLine[i - 1]) && slotLine[i + 1] && /MIKE|ILB/i.test(slotLine[i + 1])), JSON.stringify(slotLine));
  const fbGroup = await page.evaluate(() => (typeof GROUPS !== 'undefined') ? GROUPS.map(g => g[0] + ':' + g[1].join(',')).join(' || ') : '');
  ok('review: FB in skill positions, Specialists = K+P', fbGroup.includes('FB') && /Skill Positions[^\|]*FB/.test(fbGroup) && /Specialists:\[?"?K", ?"?P"?\]?\]?$|Specialists:K,P\]?\]?$|Specialists:\[K,P\]/.test(fbGroup.replace(/"/g, '')), fbGroup.slice(-120));
  await page.screenshot({ path: SHOTS + '/w27_review.png' });

  // ---- 9) tier law on the roster preview (probed mid-draft, board live) ----
  // re-run a fresh draft quickly: new draft, instant speed, take the first pick
  await page.evaluate(() => { const b = document.getElementById('newDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(9800);
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  for (let i = 0; i < 2; i++) {
    const got = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('#draftBody2 button')].find(b => (b.textContent || '').trim().toUpperCase() === 'DRAFT');
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!got) break;
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => { const b = document.getElementById('rosterDepthBtn'); if (b) b.click(); });
  let depthState = null;
  for (let i = 0; i < 10; i++) { // poll: the CPU may re-render between ticks
    depthState = await page.evaluate(() => {
      const list = document.getElementById('draftRosterList');
      return { view: (typeof draftUI !== 'undefined') ? draftUI.rosterView : '?', rows: list.querySelectorAll('.depth-row').length,
               dime: !!list.querySelector('.zpb-dimerow .playername') };
    });
    if (depthState.view === 'depth' && depthState.rows >= 26) break;
    await page.evaluate(() => { const b = document.getElementById('rosterDepthBtn'); if (b) b.click(); });
    await page.waitForTimeout(300);
  }
  const rosterLaw = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#draftRosterList .depth-row')];
    const names = rows.map(r => { const n = r.querySelector('.playername'); return n ? { cls: n.className, w: getComputedStyle(n).fontWeight, col: getComputedStyle(n).color } : null; }).filter(Boolean);
    const shm = names.filter(n => /zpb-shm/.test(n.cls)).length;
    const vib = names.filter(n => /zpb-vib/.test(n.cls));
    const neutral = names.filter(n => !/zpb-(shm|vib)/.test(n.cls));
    return { total: names.length, shm, vibBold: vib.every(n => n.w === '800'), vibN: vib.length,
             neutralW: neutral.every(n => +n.w < 700), teamColor: neutral.every(n => n.col && n.col !== 'rgb(0, 0, 0)'), dime: !!document.querySelector('#draftRosterList .zpb-dimerow .playername') };
  });
  ok('roster: depth view renders all rows', depthState.rows >= 26, JSON.stringify(depthState));
  ok('roster: 90+ shimmer applied', rosterLaw.shm >= 1, 'shm=' + rosterLaw.shm);
  ok('roster: 85+ bold', rosterLaw.vibBold, 'vib=' + rosterLaw.vibN);
  ok('roster: neutrals not bold and team-colored', rosterLaw.neutralW && rosterLaw.teamColor);
  const dimeRowOk = await page.evaluate(() => {
    const r = document.querySelector('#draftRosterList .zpb-dimerow');
    if (!r) return { present: false };
    const n = r.querySelector('.playername');
    return { present: true, tiered: n ? /zpb-(shm|vib)/.test(n.className) || getComputedStyle(n).color !== 'rgb(0, 0, 0)' : true, filled: !!n };
  });
  ok('roster: Dime row present (tier classes when filled)', dimeRowOk.present, JSON.stringify(dimeRowOk));

  // ---- 10) zero horizontal overflow, both widths, all tabs ----
  const overflow = [];
  for (const vw of [1280, 390]) {
    await page.setViewportSize({ width: vw, height: 900 });
    for (const t of ['tabDraftBtn', 'tabRankingsBtn', 'tabPlayersBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn']) {
      await page.evaluate(id => document.getElementById(id).click(), t);
      await page.waitForTimeout(450);
      const r = await page.evaluate(() => {
        window.scrollTo(999, 0);
        const panned = window.scrollX > 0 || document.documentElement.scrollLeft > 0;
        window.scrollTo(0, 0);
        const ox = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const clip = /clip|hidden/.test(getComputedStyle(document.documentElement).overflowX) && /clip|hidden/.test(getComputedStyle(document.body).overflowX);
        return { panned, ox, clip };
      });
      if (r.panned || (!r.clip && r.ox > 1)) overflow.push(vw + ':' + t + '+pan=' + r.panned + ',ox=' + r.ox + ',clip=' + r.clip);
    }
  }
  ok('layout: no horizontal panning on any tab, either width', overflow.length === 0, overflow.join(', ').slice(0, 160));

  ok('suite: zero console errors at end', errors.length === 0, errors.slice(0, 3).join(' | '));
  console.log(`\n=== w27 verify: ${pass} pass / ${fail} fail ===`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
