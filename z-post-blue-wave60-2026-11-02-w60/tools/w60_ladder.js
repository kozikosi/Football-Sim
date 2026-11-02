/* w60_ladder.js — the name ladder's pure law, unit-tested in the real page.
   Owner: full → vertical → last name → initials; JR. is never a last name; words never split. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w60.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).slice(0, 90)));
  await page.goto(FILE); await page.waitForTimeout(700);
  const R = await page.evaluate(() => {
    const L = window.zpbNameFit.ladder;
    const out = {};
    const wide = t => true;                       // everything fits
    const never = t => false;                     // nothing fits
    const wNarrow = t => t.length <= 6;           // only short tokens fit
    const wMid = t => t.length <= 10;             // medium tokens fit
    out.full = L('Rhamondre Stevenson 88', wide);
    out.wrap = L('Rhamondre Stevenson 88', wMid);
    out.last = L('Constantine Opoku Jr. 91', wNarrow);
    out.ini = L('Rhamondre Stevenson', never);
    out.jr = L('Constantine Opoku Jr.', wNarrow);
    out.hyph = L('Jaxon Smith-Njigba 93', never);
    out.hyph2 = L('Jaxon Smith-Njigba 93', wNarrow);
    out.team = L('Green Bay Packers', t => t.length <= 7);
    out.num = L('Stevenson 88', wide);
    return out;
  });
  ok(R.full.mode === 'one' && R.full.text === 'Rhamondre Stevenson 88', 'L1 full fits → full, one line', JSON.stringify(R.full));
  ok(R.wrap.mode === 'wrap' && R.wrap.text === 'Rhamondre Stevenson 88', 'L2 full too wide, words fit → full vertical (whole words)', JSON.stringify(R.wrap));
  ok(R.last.mode === 'one' && R.last.text === 'Opoku 91', 'L3 words too wide → LAST NAME (suffix stripped, rating kept)', JSON.stringify(R.last));
  ok(R.ini.mode === 'one' && R.ini.text === 'RS', 'L4 last name too wide → INITIALS', JSON.stringify(R.ini));
  ok(R.jr.mode === 'one' && R.jr.text === 'Opoku', 'L5 JR. is never the last name → Opoku', JSON.stringify(R.jr));
  ok(R.hyph.mode === 'one' && R.hyph.text === 'JS 93', 'L6a nothing fits at all → initials', JSON.stringify(R.hyph));
  ok(R.hyph2.mode === 'wrap' && R.hyph2.text === 'Jaxon Smith-Njigba 93', 'L6b hyphen parts fit → full vertical, never a letter split', JSON.stringify(R.hyph2));
  ok(R.team.mode === 'wrap' && R.team.text === 'Green Bay Packers', 'L7 team names follow the same ladder (vertical here)', JSON.stringify(R.team));
  ok(R.num.mode === 'one' && R.num.text === 'Stevenson 88', 'L8 already-short name stays whole', JSON.stringify(R.num));
  ok(errs.length === 0, 'L9 zero page errors', errs.join(' | '));
  await browser.close();
  console.log(`w60_ladder: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})();
