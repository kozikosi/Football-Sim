/* w55_repro5.js — inspect the marquee bar + wrap width mystery on the preview page. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1800);
  const info = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    const cs = getComputedStyle(wrap);
    const body = getComputedStyle(document.body);
    const bars = [...document.querySelectorAll('.zpb-bar')].map(b => {
      const c = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return { pos: c.position, ov: c.overflow, ovX: c.overflowX, left: Math.round(r.left), w: Math.round(r.width), parent: b.parentElement.className || b.parentElement.tagName, inWrap: !!b.closest('.wrap') };
    });
    const mq = document.getElementById('zpbMqA');
    const mqHost = mq && mq.parentElement;
    const mqc = mqHost ? getComputedStyle(mqHost) : null;
    return {
      wrapW: Math.round(wrap.getBoundingClientRect().width), wrapWanted: cs.width, bodyW: Math.round(document.body.getBoundingClientRect().width), bodyDisplay: body.display,
      docSW: document.documentElement.scrollWidth, bars,
      mqHostCls: mqHost && mqHost.className, mqHostOv: mqc && (mqc.overflow + '/' + mqc.overflowX), mqHostW: mqHost ? Math.round(mqHost.getBoundingClientRect().width) : null,
      marqueeCount: document.querySelectorAll('.zpb-marquee').length, barCount: document.querySelectorAll('.zpb-bar').length
    };
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
