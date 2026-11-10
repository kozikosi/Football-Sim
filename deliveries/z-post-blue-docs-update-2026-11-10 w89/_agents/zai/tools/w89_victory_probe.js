/* victory probe v2: inject a champion seasonState, mount zpbSuperBowlVictoryCine, assert the laws */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w89.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  const injected = await page.evaluate(() => {
    try {
      const user = 'San Francisco 49ers';
      const gg = (h, a, hs, as) => ({ home: h, away: a, result: { homeScore: hs, awayScore: as } });
      const sched = [];
      const foes = ['Chicago Bears','Dallas Cowboys','Green Bay Packers','Detroit Lions','Minnesota Vikings','Atlanta Falcons','Carolina Panthers','New Orleans Saints','Tampa Bay Buccaneers','Arizona Cardinals','Los Angeles Rams','Seattle Seahawks','Buffalo Bills','Miami Dolphins','New York Jets','New England Patriots','Cleveland Browns'];
      foes.forEach(f => sched.push(gg(user, f, 28, 17)));
      const pr = {
        wildcard: [gg(user, 'Washington Commanders', 31, 14)],
        divisional: [gg(user, 'Philadelphia Eagles', 24, 20)],
        champ: [gg(user, 'Dallas Cowboys', 34, 27)],
        superbowl: [gg(user, 'Kansas City Chiefs', 31, 24)]
      };
      seasonState = { champion: user, sbFinal: { away: 'Kansas City Chiefs', home: user, as: 24, hs: 31, mvp: { name: 'Brock Purdy', group: 'QB' } }, schedule: sched, playoffRounds: pr, teams: { 'San Francisco 49ers': { isUser: true } } };
      if (typeof window.zpbSuperBowlVictoryCine !== 'function') return { ok: false, why: 'no fn' };
      window.zpbSuperBowlVictoryCine();
      return { ok: true };
    } catch (e) { return { ok: false, why: String(e).slice(0, 160) }; }
  });
  ok(injected.ok, 'V1 · the victory cine mounts on an injected champion season', JSON.stringify(injected));
  await page.waitForTimeout(1200);
  const laws = await page.evaluate(() => {
    const el = document.querySelector('.zpb-victory');
    if (!el) return { up: false };
    const dyn = el.querySelector('.zpb-victory-dyn');
    const spans = dyn ? [...dyn.querySelectorAll('span')] : [];
    const delays = spans.map(s => (s.getAttribute('style').match(/animation-delay:([\d.]+)s/) || [])[1]);
    return {
      up: true,
      kicker: el.querySelector('.zpb-victory-kicker') ? el.querySelector('.zpb-victory-kicker').textContent : '',
      sub: el.querySelector('.zpb-victory-sub') ? el.querySelector('.zpb-victory-sub').textContent : '',
      name: el.querySelector('.zpb-victory-name') ? el.querySelector('.zpb-victory-name').textContent : '',
      final: el.querySelector('.zpb-victory-final') ? el.querySelector('.zpb-victory-final').textContent : '',
      mvp: el.querySelector('.zpb-victory-mvp') ? el.querySelector('.zpb-victory-mvp').textContent.replace(/\s+/g, ' ').trim() : '',
      dynCount: spans.length,
      delays,
      firstDyn: spans[0] ? spans[0].textContent : '',
      hasGo: !!el.querySelector('.zpb-victory-go'),
      confetti: el.querySelectorAll('.zpb-victory-conf i').length,
      embers: el.querySelectorAll('.zpb-victory-embers i').length
    };
  });
  ok(laws.up, 'V2 · the victory page is up', JSON.stringify(laws).slice(0, 300));
  ok(laws.up && laws.kicker === 'YOU WON THE SUPER BOWL', 'V3 · the kicker reads YOU WON THE SUPER BOWL', laws.kicker || '');
  ok(laws.up && laws.sub === 'THE FINAL WHISTLE', 'V4 · THE FINAL WHISTLE sub-line rides under the kicker', laws.sub || '');
  ok(laws.up && laws.dynCount === 3 && laws.delays[0] === '6.2' && laws.delays[1] === '9.2' && laws.delays[2] === '12.2', 'V5 · three dynamic lines staggered on second-long delays (6.2/9.2/12.2)', JSON.stringify(laws.delays));
  ok(laws.up && laws.firstDyn === 'PERFECTION · 20-0', 'V6 · a 20-0 season reads PERFECTION · 20-0 (the dynamic lines are real)', laws.firstDyn || '');
  ok(laws.up && laws.hasGo, 'V7 · the Continue door is present');
  ok(laws.up && laws.confetti >= 70 && laws.embers >= 20, 'V8 · the storm (confetti + embers) is heavy', `confetti=${laws.confetti} embers=${laws.embers}`);
  await page.screenshot({ path: '/home/z/my-project/work/evidence/w89-victory.png' });
  await page.waitForTimeout(7400);
  await page.screenshot({ path: '/home/z/my-project/work/evidence/w89-victory-settled.png' });
  ok(errors.length === 0, 'V9 · zero page errors during the victory play', errors.join(' | ').slice(0, 120));
  console.log(errors.length ? 'errors: ' + errors.join(' | ') : 'errors: clean');
  console.log(`\n${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('PROBE FAIL', e.message); process.exit(1); });
