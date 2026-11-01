/* isolate: which step produces the 8 errors? step-by-step error census */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w51/Football-Sim-Z-post-blue-w51.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1500 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e && e.message || e).slice(0, 140)));
  const mark = async tag => { console.log(tag, '· errors:', errors.length, errors.slice(-2)); };
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await mark('boot');
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1400);
  await mark('draft end');
  await page.evaluate(() => { try { document.getElementById('resultsSeasonBtn').click(); } catch (e) {} });
  await page.waitForTimeout(900);
  await mark('season view');
  await page.evaluate(() => { try { (document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2')).click(); } catch (e) {} });
  await page.waitForTimeout(1000);
  await mark('begin season');
  await page.evaluate(() => { try { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(600);
  await page.evaluate(() => { try { const y = document.querySelector('.confirm-ov .resetbtn'); if (y) y.click(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await mark('confirm +1.5s');
  await page.waitForTimeout(1500);
  await mark('confirm +3s');
  await page.waitForTimeout(3000);
  await mark('confirm +6s');
  console.log('ALL:', JSON.stringify(errors.slice(0, 10), null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
