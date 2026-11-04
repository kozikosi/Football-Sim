/* w68_owner.js — the Owner's w68 round, live on the built bytes.
   S1 · item 1: full names for the key players at full size (+ the lock heals).
   S2 · item 2: the dash/dot law on the season review (badges, tiles) + the retired convert.
   S3 · item 3: the season-awards summary paragraph is gone; the award cards remain.
   S4 · item 4: the user's award winners glow (cards, chips, the rail) — the synthetic awards render.
   S5 · item 5: the run-ends screen is gone — every sim-playoffs path lands on the SB page.
   S6 · item 6: each run-cine round waits for its Continue (the auto-advance is dead).
   S7 · item 7: the victory page — the won-SB handshake, the layers, the score dashes, the release. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w68/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

let page;
const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = 0;
  page.on('pageerror', e => { pageErrs++; console.log('   PAGE-ERROR: ' + e.message); fail++; });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // ============ boot the draft as Jacksonville, then the season ============
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Jacksonville Jaguars'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400);
  await closeOv();
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }

  // ============ S1 · item 1 · the name ladder at full size ============
  console.log('== S1 · item 1 · full names at full size ==');
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(3200);
  await closeOv();
  await page.waitForTimeout(900);
  const readNames = () => page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.zpb-pvwrap .zpb-pcard-hd b').forEach(b => out.push({ shown: b.textContent, full: b.getAttribute('data-nmfull') || b.textContent }));
    return out;
  });
  for (const W of [1280, 1440, 1025]) {
    await page.setViewportSize({ width: W, height: 940 });
    await page.waitForTimeout(600);
    const rows = await readNames();
    const short = rows.filter(r => r.shown !== r.full);
    ok(rows.length >= 4 && short.length === 0, `S1 W=${W} (full size): every preview key-player card reads its FULL name`, short.length ? JSON.stringify(short.slice(0, 3)) : `${rows.length} cards, all full`);
  }
  { // below the full-size floor the w60 narrow law rules — no ellipsis, rungs legal
    await page.setViewportSize({ width: 768, height: 940 });
    await page.waitForTimeout(600);
    const rows = await readNames();
    const legal = rows.filter(r => r.shown === r.full || r.full.replace(/[^A-Za-z'. -]/g, '').split(/\s+/).map(t => t[0]).join('').toUpperCase().startsWith(r.shown.replace(/[^A-Za-z]/g, '').toUpperCase()) || r.full.toUpperCase().includes(r.shown.toUpperCase()) || /^[A-Z]{1,3}$/.test(r.shown));
    ok(rows.length >= 4 && legal.length === rows.length && rows.every(r => !r.shown.includes('…')), 'S1 W=768 (narrow): the w60 ladder rungs stay legal and no ellipsis ever paints', JSON.stringify(rows.filter(r => r.shown !== r.full).slice(0, 3)));
  }
  // the lock heals: shrink a name to initials, fire a resize, the fixed avail regrows it (at full size the floor forces the full name back)
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.waitForTimeout(500);
  const healed = await page.evaluate(() => {
    const b = document.querySelector('.zpb-pvwrap .zpb-pcard-hd b');
    if (!b) return null;
    const full = b.getAttribute('data-nmfull') || b.textContent;
    b.textContent = 'CL';
    window.dispatchEvent(new Event('resize'));
    return new Promise(res => setTimeout(() => res({ full, after: b.textContent }), 400));
  });
  ok(healed && healed.after === healed.full, 'S1 the lock heals: a stale-shortened name regrows on the next scan (the self-measure lock is dead)', JSON.stringify(healed));
  const el = await page.$('.zpb-pvwrap');
  if (el) await el.screenshot({ path: SH + '/w68-preview-fullnames-1280.png' });

  // ============ sim the season to the review ============
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const y = document.querySelector('[data-ss="yes"]'); if (y) y.click(); });
  await page.waitForTimeout(1800);
  await closeOv();
  await page.waitForTimeout(700);

  // ============ S2 · item 2 · the dash/dot law on the review ============
  console.log('== S2 · item 2 · the dash/dot law ==');
  const s2 = await page.evaluate(() => {
    const get = k => { const b = Array.from(document.querySelectorAll('.zpb-sbadge')).find(x => (x.querySelector('i') || {}).textContent === k); return b ? b.querySelector('b').textContent : null; };
    const tiles = Array.from(document.querySelectorAll('.zst-res')).map(x => x.textContent);
    return {
      phase: seasonState.phase,
      rec: get('RECORD'), home: get('AT HOME'), road: get('ON THE ROAD'),
      one: get('ONE SCORE'), div: get('VS DIVISION'), po: get('VS PLAYOFF TEAMS'),
      ppg: get('PTS SCORED PER GAME'),
      tiles: tiles.slice(0, 6),
    };
  });
  ok(/^(\d+)-(\d+)(-\d+)?$/.test(s2.rec || ''), 'S2 the RECORD badge reads DASHES (ties included)', s2.rec);
  ok(/^(\d+)-(\d+)$/.test(s2.home || ''), 'S2 AT HOME reads dashes', s2.home);
  ok(/^(\d+)-(\d+)$/.test(s2.road || ''), 'S2 ON THE ROAD reads dashes', s2.road);
  ok(s2.one === null || /^(\d+)-(\d+)$/.test(s2.one), 'S2 ONE SCORE reads dashes (W-L)', s2.one);
  ok(s2.div === null || /^(\d+)-(\d+)$/.test(s2.div), 'S2 VS DIVISION reads dashes (W-L)', s2.div);
  ok(s2.po === null || /^(\d+)-(\d+)$/.test(s2.po), 'S2 VS PLAYOFF TEAMS reads dashes (W-L)', s2.po);
  ok(s2.ppg && s2.ppg.includes(' · #'), 'S2 the per-game line keeps the middle dot (other data)', s2.ppg);
  ok(s2.tiles.length && s2.tiles.every(t => /^\d+ - \d+[WLT]$/.test(t)), 'S2 the schedule tiles read dashes (the live tile renderer)', JSON.stringify(s2.tiles));
  await page.screenshot({ path: SH + '/w68-review-1280.png' });

  // ============ S3 · item 3 · the awards summary is gone ============
  console.log('== S3 · item 3 · the awards summary retires ==');
  const s3 = await page.evaluate(() => {
    const det = Array.from(document.querySelectorAll('details.panel')).find(d => (d.querySelector('summary') || {}).textContent?.includes('REGULAR-SEASON AWARDS'));
    if (!det) return { got: false };
    const text = det.textContent || '';
    const firstChild = det.children.length ? det.children[det.children.length - 1] : null;
    return {
      got: true,
      hasCounts: /First-Team All-Pro\s*·\s*\d+\s*·/.test(text) || /\d+ First-Team All-Pro\s*·\s*\d+ Second-Team All-Pro\s*·\s*\d+ Pro Bowl/.test(text) || /:\s*\d+ First-Team All-Pro,/.test(text),
      hasStaff: text.includes('coaching staff  ·  Coach of the Year') || text.includes('coaching staff · Coach of the Year'),
      cards: det.querySelectorAll('.zpb-awcard').length,
      startsWithRows: !!det.querySelector('.zpb-awrows'),
      leadP: (det.querySelector('p.narr') || {}).textContent || null,
    };
  });
  ok(s3.got, 'S3 the awards details render', JSON.stringify(s3).slice(0, 120));
  ok(!s3.hasCounts, 'S3 the counts sentence ("1 First-Team All-Pro · 1 Second-Team All-Pro · ...") is GONE');
  ok(!s3.hasStaff, 'S3 the "coaching staff · Coach of the Year" honor line is GONE');
  ok(s3.startsWithRows && s3.cards > 0 && !s3.leadP, 'S3 the award cards + tables remain and no <p> leads the panel', `cards=${s3.cards} leadP=${JSON.stringify(s3.leadP)}`);

  // ============ S4 · item 4 · the user's award winners glow ============
  console.log('== S4 · item 4 · the golden celebration ==');
  const s4 = await page.evaluate(() => {
    const user = seasonUserTeam();
    const A = {
      individual: [
        { title: 'Most Valuable Player', c: { name: 'MVP Guy', team: user, rec: null }, badges: [] },
        { title: 'Most Valuable Player', c: { name: 'MVP Rival', team: 'Kansas City Chiefs', rec: null }, badges: [] },
        { title: 'Coach of the Year', team: user, coach: 'Tom Coach', badges: [] },
      ],
      stat: [{ title: 'Passing Yards Leader', name: 'Stat Guy', team: user, rec: null, winKey: null }],
      allPro: { first: { QB: [{ name: 'AP1 Guy', team: user }, { name: 'AP1 Rival', team: 'Buffalo Bills' }] }, second: { CB: [{ name: 'AP2 Guy', team: user }] } },
      proBowl: { AFC: { WR: [{ name: 'PB Guy', team: user }] }, NFC: {} },
      userSummary: { mine: [], ap1: 1, ap2: 1, pb: 1 },
    };
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-9999px;top:0;';
    document.body.appendChild(host);
    host.innerHTML = renderRegularAwardsHTML(A, true);
    const card = (nm) => Array.from(host.querySelectorAll('.zpb-awcard')).find(c => (c.querySelector('.zpb-awm b') || {}).textContent === nm);
    const chip = (nm) => Array.from(host.querySelectorAll('.zpb-apchip')).find(c => (c.querySelector('b') || {}).textContent === nm);
    const out = {
      mvpMine: card('MVP Guy')?.className || '', mvpRival: card('MVP Rival')?.className || '',
      coty: card('Tom Coach · ' + user)?.className || card('YOU · ' + user)?.className || Array.from(host.querySelectorAll('.zpb-awcard')).map(c => c.querySelector('.zpb-awm b')?.textContent).join('|'),
      statMine: card('Stat Guy')?.className || '',
      ap1Mine: chip('AP1 Guy')?.className || '', ap1Rival: chip('AP1 Rival')?.className || '',
      ap2Mine: chip('AP2 Guy')?.className || '', pbMine: chip('PB Guy')?.className || '',
      ap1MineShm: chip('AP1 Guy')?.querySelector('b')?.className || '', pbMineShm: chip('PB Guy')?.querySelector('b')?.className || '',
    };
    host.remove();
    return out;
  });
  ok(s4.mvpMine.includes('zpb-mygold'), 'S4 the user’s MVP card wears the golden border + glow', s4.mvpMine.slice(0, 60));
  ok(!s4.mvpRival.includes('zpb-mygold'), 'S4 a rival’s MVP card does NOT glow', s4.mvpRival.slice(0, 60));
  ok(s4.statMine.includes('zpb-mygold'), 'S4 the user’s statistical champion glows', s4.statMine.slice(0, 60));
  ok(s4.ap1Mine.includes('zpb-mygold') && s4.ap1MineShm.includes('zpb-shm'), 'S4 the user’s First-Team chip glows and shimmers', `${s4.ap1Mine.slice(0, 40)} / ${s4.ap1MineShm}`);
  ok(!s4.ap1Rival.includes('zpb-mygold'), 'S4 a rival’s First-Team chip does NOT wear the user gold', s4.ap1Rival.slice(0, 40));
  ok(s4.ap2Mine.includes('zpb-mygold') && s4.ap2Mine.includes('zpb-shm') === false ? true : s4.ap2Mine.includes('zpb-mygold'), 'S4 the user’s Second-Team chip glows (any award)', s4.ap2Mine.slice(0, 40));
  ok(s4.pbMine.includes('zpb-mygold') && s4.pbMineShm.includes('zpb-shm'), 'S4 the user’s Pro Bowl chip glows and shimmers', `${s4.pbMine.slice(0, 40)} / ${s4.pbMineShm}`);
  const s4css = await page.evaluate(() => {
    const own = (document.querySelector('#zpb-w68-css') || {}).textContent || '';
    let shonor = null;
    for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      for (const r of rules) { if ((r.selectorText || '').includes('.zpb-shonor') && (r.cssText || '').includes('box-shadow')) { shonor = r.cssText; break; } }
      if (shonor) break;
    }
    return { mine: (own.match(/\.zpb-mygold\{[^}]*\}/) || [null])[0], shonor };
  });
  ok(!!(s4css.mine && s4css.shonor), 'S4 the golden-border + the honor-glow CSS live', ((s4css.mine || '') + ' | ' + (s4css.shonor || '')).slice(0, 110));

  // ============ force the user into the bracket, then SIM PLAYOFFS ============
  console.log('== S5/S6 · the run cine + the SB page ==');
  await page.evaluate(() => {
    const user = seasonUserTeam(), conf = (user === 'Jacksonville Jaguars') ? 'AFC' : 'AFC';
    if (!seasonState.seeds.AFC.concat(seasonState.seeds.NFC).some(x => x.team === user)) {
      const arr = seasonState.seeds.AFC;
      const weakest = arr.reduce((a, b, i) => (arr[i].seed > arr[a].seed ? i : a), 0);
      arr[weakest] = { ...arr[weakest], team: user };
    }
  });
  await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); });
  await page.waitForTimeout(1100);
  const s6a = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-porun');
    if (!ov) return { got: false };
    return { got: true, kicker: (ov.querySelector('.zpb-porun-kicker') || {}).textContent, hasGo: !!ov.querySelector('.zpb-porun-go'), sbPending: !!window.__zpbSBFinPending };
  });
  ok(s6a.got && s6a.hasGo, 'S6 the run cine mounts with a Continue button on the card', JSON.stringify(s6a));
  if (s6a.got) {
    const hold = await page.evaluate(() => new Promise(res => setTimeout(() => { const ov = document.querySelector('.zpb-porun'); res({ kicker: (ov?.querySelector('.zpb-porun-kicker') || {}).textContent, still: !!ov }); }, 4300)));
    ok(hold.still && hold.kicker === s6a.kicker, 'S6 the card HOLDS past the old 3400ms auto-advance window (the gate is real)', JSON.stringify(hold));
    await page.screenshot({ path: SH + '/w68-porun-card.png' });
    // walk the rounds by Continue; count the clicks to the finish
    let clicks = 0, sbPage = false, porunGone = false;
    for (let i = 0; i < 5; i++) {
      const hasGo = await page.evaluate(() => !!document.querySelector('.zpb-porun-go'));
      if (!hasGo) break;
      await page.evaluate(() => { document.querySelector('.zpb-porun-go').click(); });
      clicks++;
      await page.waitForTimeout(900);
      const st = await page.evaluate(() => ({ porun: !!document.querySelector('.zpb-porun'), sb: !!document.querySelector('.zpb-sbfin'), pofin: !!document.querySelector('.zpb-pofin') }));
      if (st.sb) { sbPage = true; porunGone = !st.porun || st.porun; break; }
    }
    await page.waitForTimeout(700);
    const fin = await page.evaluate(() => ({ porun: !!document.querySelector('.zpb-porun'), sb: !!document.querySelector('.zpb-sbfin.zpb-sbfin-in'), pofin: !!document.querySelector('.zpb-pofin'), champ: seasonState.champion, kicker: (document.querySelector('.zpb-sbfin-kicker') || {}).textContent, score: (document.querySelector('.zpb-sbfin-score') || {}).textContent, noElim: !document.body.textContent.includes('YOUR RUN ENDS IN') }));
    ok(clicks >= 1, 'S6 the rounds advanced ONLY via Continue', `clicks=${clicks}`);
    ok(fin.sb && !fin.pofin && fin.noElim, 'S5 the run lands on the Super Bowl page — the run-ends screen is gone', JSON.stringify({ sb: fin.sb, pofin: fin.pofin, kicker: fin.kicker }));
    ok(/-/.test(fin.score || '') && !(fin.score || '').includes('·'), 'S5 the SB page score reads the DASH', fin.score);
    await page.screenshot({ path: SH + '/w68-sb-page.png' });

    // ============ S7 · the victory handshake ============
    console.log('== S7 · item 7 · the victory page ==');
    await page.evaluate(() => { seasonState.champion = seasonUserTeam(); window.__zpbSBRewardOwed = true; }); // forge the user's title for the handshake leg
    await page.evaluate(() => { const b = document.querySelector('.zpb-sbfin-go'); if (b) b.click(); });
    await page.waitForTimeout(1000);
    const s7a = await page.evaluate(() => {
      const v = document.querySelector('.zpb-victory');
      if (!v) return { got: false, sbGone: !document.querySelector('.zpb-sbfin') };
      return {
        got: true, sbGone: !document.querySelector('.zpb-sbfin'),
        kicker: (v.querySelector('.zpb-victory-kicker') || {}).textContent,
        name: (v.querySelector('.zpb-victory-name') || {}).textContent,
        rings: v.querySelectorAll('.zpb-victory-ring').length,
        conf: v.querySelectorAll('.zpb-victory-conf i').length,
        embers: v.querySelectorAll('.zpb-victory-embers i').length,
        score: (v.querySelector('.zpb-victory-score') || {}).textContent,
        mvp: (v.querySelector('.zpb-victory-mvp') || {}).textContent,
        go: !!v.querySelector('.zpb-victory-go'),
      };
    });
    ok(s7a.got && s7a.sbGone, 'S7 the SB page’s Continue mounts the victory page (the storm is covered, not flashed)', JSON.stringify(s7a).slice(0, 160));
    ok(s7a.got && s7a.rings === 3 && s7a.conf >= 60 && s7a.embers >= 20, 'S7 the drama is layered: three burst rings, confetti, embers', `rings=${s7a.rings} conf=${s7a.conf} embers=${s7a.embers}`);
    ok(s7a.got && /\d+-\d+/.test((s7a.score || '')) && !(s7a.score || '').includes('·'), 'S7 the victory score reads the DASH (flex-gap spaced)', s7a.score);
    ok(s7a.got && s7a.go, 'S7 the gold Continue waits on the victory page');
    await page.waitForTimeout(900);
    await page.screenshot({ path: SH + '/w68-victory-1280.png' });
    await page.evaluate(() => { const b = document.querySelector('.zpb-victory-go'); if (b) b.click(); });
    await page.waitForTimeout(900);
    const s7b = await page.evaluate(() => ({ gone: !document.querySelector('.zpb-victory'), fx: !!document.querySelector('#fxCanvas') || !!document.querySelector('.fxbanner'), banner: (document.querySelector('.fxbanner') || {}).textContent || null }));
    ok(s7b.gone, 'S7 the victory Continue releases the season');
    ok(s7b.fx, 'S7 the SUPER BOWL CHAMPIONS reward plays on release', s7b.banner || '');
    await page.screenshot({ path: SH + '/w68-after-victory.png' });
    await closeOv();
  }

  // ============ S7c · the lost-SB leg: no victory page ============
  const s7c = await page.evaluate(() => {
    seasonState.champion = 'Seattle Seahawks'; seasonState.sbFinal = { away: 'Seattle Seahawks', home: seasonUserTeam(), as: 25, hs: 21, mvp: { name: 'Rival Player', group: 'RB' } };
    window.__zpbSBFinPending = true;
    zpbPostSuperBowlCine();
    return new Promise(res => setTimeout(() => {
      const b = document.querySelector('.zpb-sbfin-go');
      if (b) b.click();
      setTimeout(() => res({ sbGone: !document.querySelector('.zpb-sbfin'), victory: !!document.querySelector('.zpb-victory') }), 700);
    }, 800));
  });
  ok(s7c.sbGone && !s7c.victory, 'S7c a lost Super Bowl releases directly — no victory page', JSON.stringify(s7c));
  await closeOv();

  // ============ static laws + zero page errors ============
  console.log('== static laws ==');
  const fs = require('fs');
  const src = fs.readFileSync('/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html', 'utf8');
  ok(!src.includes('zpbPlayoffElimCine = function') && !src.includes('YOUR RUN ENDS IN ') && !src.includes('.zpb-pofin{'), 'S5 static: the run-ends screen left no trace (the retirement notes aside)');
  ok(!/\(\\d\)\\s\*-\\s\*\(\\d\)\/g/.test(src), 'S2 static: the blanket digit-dash-digit convert is retired');
  ok(src.includes('zst-score">${fs}-${os}'), 'S2 static: the tile score carries the dash at source');
  ok(src.includes('</b><i>-</i><b style="color:\' + (pkH'), 'S2 static: the SB page score separator is the dash');
  ok(src.includes('a typical range of ${q(0.1).toFixed(0)}·${q(0.9).toFixed(0)}'), 'S2 static: ranges keep the middle dot (other data)');
  ok(src.includes('zpbSuperBowlVictoryCine'), 'S7 static: the victory page lives');
  ok(pageErrs === 0, 'zero page errors across the whole battery', `${pageErrs} errors`);

  console.log(`\nRESULT: ${pass} pass / ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
