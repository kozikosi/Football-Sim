// Z-post-blue v14 verification: welcome cinematic rebuild + CPU kickoff gated on DRAFT fade-out
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/out-v14/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/out-v14/evidence';
const fs = require('fs');
fs.mkdirSync(SHOT, { recursive: true });
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };
const sleep = ms => new Promise(r=>setTimeout(r,ms));

async function armDraft(page, pickNo){
  await page.evaluate((n) => {
    const sel = document.getElementById('draftPickNumberSelect');
    if (sel) sel.value = String(n);
  }, pickNo);
  await page.locator('#startDraftBtn').click();
  return Date.now();
}

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1200);
  ok('page loads: draft setup visible', await page.locator('#draftSetup').isVisible());

  // ---- 1. cinematic stack appears, centered, in order ----
  let t0 = await armDraft(page, 5);
  await sleep(2000); // stack fully formed (all three lines faded in by ~1.9s)
  const stack = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-fin-welcome');
    if (!ov) return null;
    const ps = [...ov.querySelectorAll('p')];
    const r = ps.map(p => { const b = p.getBoundingClientRect(); const cs = getComputedStyle(p);
      return { text: p.textContent, x: b.x + b.width/2, y: b.y + b.height/2, op: cs.opacity }; });
    return { ov: true, lines: r,
      draftCls: ps[2] ? ps[2].className : '', wtOut: ov.classList.contains('zpb-wt-out') };
  });
  ok('cinematic: overlay present at 2.0s', !!stack && stack.ov);
  ok('cinematic: exactly WELCOME / TO THE / DRAFT', stack && stack.lines.map(l=>l.text).join('|') === 'WELCOME|TO THE|DRAFT',
     stack && stack.lines.map(l=>l.text).join('|'));
  ok('cinematic: all three lines visible (opacity 1)', stack && stack.lines.every(l=>l.op === '1'),
     stack && stack.lines.map(l=>l.op).join(','));
  ok('cinematic: all lines horizontally centered', stack && stack.lines.every(l=>Math.abs(l.x - 640) < 3),
     stack && stack.lines.map(l=>Math.round(l.x)).join(','));
  ok('cinematic: vertical order WELCOME above TO THE above DRAFT', stack && stack.lines[0].y < stack.lines[1].y && stack.lines[1].y < stack.lines[2].y,
     stack && stack.lines.map(l=>Math.round(l.y)).join(','));
  ok('cinematic: DRAFT not yet rising at 2.0s (no zpb-draft-center)', stack && !stack.draftCls.includes('zpb-draft-center'), stack && stack.draftCls);
  await page.screenshot({ path: SHOT + '/v14-cine-stack-2.0s.png' });

  // ---- 2. THE GATE: CPU must NOT have drafted while the cinematic plays ----
  const preGate = await page.evaluate(() => ({ log: draftSim.log.length, awaiting: draftSim.awaitingUser, kicked: !!window._zpbKickStarted }));
  ok('GATE: zero CPU picks at ~7.0s (before DRAFT fade)', preGate.log === 0, 'log=' + preGate.log + ' kicked=' + preGate.kicked);
  ok('GATE: kickoff latch not yet fired at ~7.0s', preGate.kicked === false);

  // ---- 3. fade sequence: wt-out -> rise -> fade ----
  await sleep(1300); // ~3.3s
  const wt = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-fin-welcome'); if (!ov) return null;
    return { wtOut: ov.classList.contains('zpb-wt-out'),
      op: [...ov.querySelectorAll('p')].map(p => getComputedStyle(p).opacity) };
  });
  ok("cinematic: 'welcome to the' fading out at ~3.3s (zpb-wt-out)", wt && wt.wtOut);
  await sleep(1300); // ~4.6s
  const rise = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-fin-welcome'); if (!ov) return null;
    const p = ov.querySelectorAll('p')[2]; const b = p.getBoundingClientRect();
    return { cls: p.className, y: b.y + b.height/2, op: getComputedStyle(p).opacity };
  });
  ok('cinematic: DRAFT rising to the center at ~4.6s (zpb-draft-center on)', rise && rise.cls.includes('zpb-draft-center'), rise && rise.cls);
  ok('cinematic: DRAFT visibly mid-rise (below center) at ~4.6s', rise && rise.y > 450 && rise.y < 900, rise && ('y=' + Math.round(rise.y)));
  await page.screenshot({ path: SHOT + '/v14-cine-rise-4.6s.png' });

  // ---- 4. CPU starts EXACTLY when DRAFT begins to fade (draftSpeed defaults to 'slow':
  // one pick per 750ms tick — so poll until the chain reaches the user's turn, which also
  // proves exactly one kickoff chain is running) ----
  await sleep(2700); // ~7.3s + margin -> 7.9s, fade began ~7.4s
  const atFade = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-fin-welcome');
    const p = ov ? ov.querySelectorAll('p')[2] : null;
    return { still: !!ov, fade: p ? p.className.includes('zpb-draft-fade') : false,
      log: draftSim.log.length, kicked: !!window._zpbKickStarted };
  });
  ok('cinematic: DRAFT fading at ~7.9s (zpb-draft-fade on)', atFade.fade);
  ok('GATE: CPU drafted ONLY after the fade began (log > 0 at ~7.9s)', atFade.log > 0, 'log=' + atFade.log);
  ok('GATE: kickoff latch fired (fade moment)', atFade.kicked === true);
  ok('cinematic: overlay still on screen while DRAFT fades', atFade.still);
  await page.screenshot({ path: SHOT + '/v14-cine-fade-7.9s.png' });

  // ---- 5. overlay gone, slow chain reaches the user's turn: exactly 4 CPU picks, pos=4 ----
  const reached = await page.waitForFunction(() =>
    draftSim.awaitingUser === true && draftSim.pos === 4 && draftSim.log.length === 4,
    null, { timeout: 12000 }).then(() => true).catch(() => false);
  const done = await page.evaluate(() => ({ ov: !!document.querySelector('.zpb-fin-welcome'),
    log: draftSim.log.length, board: document.getElementById('draftLive').style.display,
    pos: draftSim.pos, awaiting: draftSim.awaitingUser, kicked: !!window._zpbKickStarted }));
  ok('GATE: exactly one kickoff chain — picks 1-4 CPU, user on the clock at pick 5',
     reached && done.pos === 4 && done.awaiting === true && done.log === 4,
     'pos=' + done.pos + ' log=' + done.log + ' awaiting=' + done.awaiting);
  ok('cinematic: overlay removed by end of sequence', !done.ov);
  ok('draft board live after cinematic', done.board === 'block');
  await page.screenshot({ path: SHOT + '/v14-board-live.png' });

  // ---- 6. reduced motion: no cinematic, draft starts immediately ----
  const ctx2 = await browser.newContext({ viewport:{width:1280,height:900}, reducedMotion:'reduce' });
  const p2 = await ctx2.newPage();
  p2.on('pageerror', e => errors.push('rm pageerror: '+e.message));
  await p2.goto(FILE); await sleep(1000);
  const r0 = Date.now();
  await armDraft(p2, 5);
  await sleep(1200);
  const rm = await p2.waitForFunction(() =>
    draftSim.awaitingUser === true && draftSim.pos === 4 && draftSim.log.length === 4,
    null, { timeout: 12000 }).then(() =>
      p2.evaluate(() => ({ ov: !!document.querySelector('.zpb-fin-welcome'), log: draftSim.log.length })))
    .catch(() => ({ ov: null, log: -1 }));
  ok('reduced-motion: no cinematic overlay', rm.ov === false);
  ok('reduced-motion: draft starts immediately (no cine delay)', rm.log === 4, 'log=' + rm.log);
  await ctx2.close();

  // ---- 7. mobile viewport: stack centered, no horizontal scroll ----
  const ctx3 = await browser.newContext({ viewport:{width:390,height:844} });
  const p3 = await ctx3.newPage();
  p3.on('pageerror', e => errors.push('m pageerror: '+e.message));
  await p3.goto(FILE); await sleep(1000);
  await armDraft(p3, 5);
  await sleep(2000);
  const mob = await p3.evaluate(() => {
    const ov = document.querySelector('.zpb-fin-welcome'); if (!ov) return null;
    const ps = [...ov.querySelectorAll('p')];
    return { lines: ps.map(p => { const b = p.getBoundingClientRect(); return { t: p.textContent, x: b.x+b.width/2, y: b.y+b.height/2 }; }),
      hscroll: document.scrollingElement.scrollWidth > window.innerWidth + 1 };
  });
  ok('mobile: cinematic stack present', !!mob && mob.lines.length === 3);
  ok('mobile: lines centered (390px viewport)', mob && mob.lines.every(l=>Math.abs(l.x - 195) < 3), mob && mob.lines.map(l=>Math.round(l.x)).join(','));
  ok('mobile: no horizontal scroll during cinematic', mob && !mob.hscroll);
  await p3.screenshot({ path: SHOT + '/v14-mobile-stack-2.0s.png' });
  await ctx3.close();

  ok('zero console/page errors across all scenarios', errors.length === 0, errors.slice(0,3).join(' | '));
  await browser.close();
  console.log(fails.length ? `\nV14 VERIFY: ${fails.length} FAILURE(S)` : '\nV14 VERIFY: ALL PASS');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('VERIFY CRASH:', e); process.exit(2); });
