/* w69_probe1.js — reproduce all six Owner items live on the w68 bytes. Measure, don't guess. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w69/Football-Sim-Z-post-blue-w68.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // boot the draft as the Steelers (item 1's team), instant sim to the end
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
  console.log('draft done; errors so far:', errs.length);

  // ================= ITEM 4 · preseason dropdowns clip =================
  console.log('\n== ITEM 4 · preseason dropdowns (aggrSel / scriptOff / scriptDef) ==');
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  const i4 = await page.evaluate(() => {
    const out = {};
    for (const id of ['aggrSel', 'scriptOff', 'scriptDef']) {
      const s = document.getElementById(id);
      if (!s) { out[id] = null; continue; }
      const r = s.getBoundingClientRect();
      const cs = getComputedStyle(s);
      const o = s.options[s.selectedIndex];
      out[id] = {
        selected: o ? o.textContent : null,
        clientW: s.clientWidth, scrollW: s.scrollWidth,
        rectL: Math.round(r.left), rectR: Math.round(r.right),
        paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight,
        textAlign: cs.textAlign, fontFamily: cs.fontFamily.slice(0, 40), fontW: cs.fontWeight,
        labelClipped: s.scrollWidth > s.clientWidth,
        parentFlex: cs.display, minW: cs.minWidth, maxW: cs.maxWidth, width: cs.width
      };
    }
    return out;
  });
  console.log(JSON.stringify(i4, null, 1));
  await page.screenshot({ path: '/home/z/my-project/work/w69/shots/probe-preseason-light.png', fullPage: false });

  // ================= ITEM 5 · inventory every dropdown =================
  console.log('\n== ITEM 5 · dropdown inventory ==');
  const i5 = await page.evaluate(() => {
    const sels = Array.from(document.querySelectorAll('select')).map(s => ({
      id: s.id || null, dataLineup: s.getAttribute('data-lineup'), dataReturner: s.getAttribute('data-returner'),
      dataReturnerPr: s.getAttribute('data-returner-pr'), enhanced: !!s.dataset.zpbCmpSel,
      inDom: !!s.closest('body'), optCount: s.options.length,
      firstOpt: s.options[0] ? s.options[0].textContent.slice(0, 44) : null,
      visible: !!(s.offsetWidth || s.offsetHeight)
    }));
    return sels;
  });
  console.log(JSON.stringify(i5, null, 1));

  // the lineup editor player select (on this very page) — measure face + check family
  const i5b = await page.evaluate(() => {
    const s = document.querySelector('select[data-lineup]');
    if (!s) return null;
    const cs = getComputedStyle(s);
    return { dataLineup: s.getAttribute('data-lineup'), opts: Array.from(s.options).slice(0, 3).map(o => o.textContent.slice(0, 50)),
      font: cs.fontFamily.slice(0, 44), color: cs.color, w: s.clientWidth, h: s.clientHeight, enhanced: !!s.dataset.zpbCmpSel };
  });
  console.log('lineup select:', JSON.stringify(i5b, null, 1));

  // ================= ITEM 2 · field map ink, Steelers + Browns, light + dark =================
  console.log('\n== ITEM 2 · field map inks ==');
  // the draft review page (resultsView=mine shows the map; also the breakdown)
  await page.evaluate(() => { resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults(); });
  await page.waitForTimeout(900);
  for (const mode of ['light', 'dark']) {
    for (const team of ['Pittsburgh Steelers', 'Cleveland Browns']) {
      await page.evaluate(({ m, t }) => {
        document.documentElement.setAttribute('data-theme', m);
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(t);
        resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults();
      }, { m: mode, t: team });
      await page.waitForTimeout(700);
      const ink = await page.evaluate(() => {
        const cells = Array.from(document.querySelectorAll('.zpb-fm .zpb-fm-ini')).slice(0, 30);
        return cells.map(c => {
          const b = c.querySelector('b'), i = c.querySelector('i');
          const csB = b ? getComputedStyle(b) : null, csI = i ? getComputedStyle(i) : null, csC = getComputedStyle(c);
          return { slot: c.getAttribute('data-slot'), nameInk: csB ? csB.color : null, posInk: csI ? csI.color : null,
            bg: csC.backgroundColor, name: b ? b.textContent : null };
        });
      });
      console.log(`--- ${mode} / ${team}`);
      ink.slice(0, 8).forEach(x => console.log('   ', JSON.stringify(x)));
      // composite: what the bubble actually paints over the panel
      const comp = await page.evaluate(() => {
        const cell = document.querySelector('.zpb-fm .zpb-fm-ini');
        if (!cell) return null;
        const cs = getComputedStyle(cell);
        const panel = getComputedStyle(cell.closest('.panel') || document.body).backgroundColor;
        return { bubbleBg: cs.backgroundColor, panelBg: panel };
      });
      console.log('    composite:', JSON.stringify(comp));
    }
  }
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme('Pittsburgh Steelers'); });

  // ================= ITEM 3 · the draft review card names =================
  console.log('\n== ITEM 3 · draft review card name tiers ==');
  await page.evaluate(() => { resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults(); });
  await page.waitForTimeout(900);
  const i3 = await page.evaluate(() => {
    const out = [];
    // every <b> that carries a player name on the review page cards
    document.querySelectorAll('.zpb-pcard .zpb-pcard-hd b, .zpb-dbk b.zpb-gname, .zpb-dz-row .zpb-dz-name, .zpb-pg-name').forEach(b => {
      const cs = getComputedStyle(b);
      out.push({ text: b.textContent.slice(0, 26), cls: b.className, color: cs.color, anim: cs.animationName + ' ' + cs.animationDuration, bgclip: cs.webkitBackgroundClip || cs.backgroundClip });
    });
    return out.slice(0, 40);
  });
  console.log(JSON.stringify(i3, null, 1));

  // ================= ITEM 1 · the 20-0 button (need the review) =================
  console.log('\n== ITEM 1 · TRY AGAIN TO GO 20-0 button ink ==');
  const i1 = await page.evaluate(() => {
    const b = document.getElementById('zpbTryAgainBtn');
    if (!b) return { present: false };
    const shine = b.querySelector('.zpb-shine');
    const csB = getComputedStyle(b), csS = shine ? getComputedStyle(shine) : null;
    return { present: true, btnBg: csB.backgroundImage.slice(0, 90), btnColor: csB.color,
      shineColor: csS ? csS.color : null, shineBg: csS ? csS.backgroundImage.slice(0, 120) : null,
      clip: csS ? (csS.webkitBackgroundClip || csS.backgroundClip) : null };
  });
  console.log(JSON.stringify(i1, null, 1));
  const btnEl = await page.$('#zpbTryAgainBtn');
  if (btnEl) { await page.evaluate(() => document.getElementById('zpbTryAgainBtn').scrollIntoView({ block: 'center' })); await page.waitForTimeout(400); await btnEl.screenshot({ path: '/home/z/my-project/work/w69/shots/probe-20-0-steelers.png' }); }

  console.log('\npage errors total:', errs.length, errs.slice(0, 4));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
