// Wave-13 verification: all 20 W13 directives + zero console errors
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html';
const SHOT = '/home/z/my-project/desktop/wt/zai/_agents/zai/evidence/z-post-blue';
const fails = [];
const ok = (name, cond, extra='') => { console.log(`[${cond?'ok':'FAIL'}] ${name}${extra?' — '+extra:''}`); if(!cond) fails.push(name); };
const sleep = ms => new Promise(r=>setTimeout(r,ms));

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport:{width:1280,height:900} });
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1300);

  const src = await page.evaluate(() => document.documentElement.outerHTML);

  // ---- W13-1: series dropdown drives the rankings ----
  await page.click('#tabRankingsBtn'); await sleep(700);
  const s1 = await page.evaluate(() => {
    const sel = document.getElementById('zpbSeriesSel');
    if(!sel) return {err:'no select'};
    const opts = [...sel.options].map(o=>o.textContent);
    return { n: opts.length, first: opts[0], second: opts[1], last: opts[opts.length-1] };
  });
  ok('W13-1 27 entries, MODEL first', s1.n === 27 && s1.first === 'MODEL · ALL SLOTS', JSON.stringify(s1).slice(0,140));
  const allOpts = await page.evaluate(() => [...document.getElementById('zpbSeriesSel').options].map(o=>o.textContent));
  ok('W13-1 entry 1 = "1 QB", entry 2 = "2 QB + CB1"', allOpts[1] === '1 QB' && allOpts[2] === '2 QB + CB1', allOpts[1]+' | '+allOpts[2]);
  ok('W13-1 entry 26 ends at SAM (OLB2 in 3-4)', / \+ SAM$/.test(allOpts[26]||''), (allOpts[26]||'').slice(-40));
  const s1b = await page.evaluate(() => {
    const sel = document.getElementById('zpbSeriesSel');
    sel.value = '2'; sel.dispatchEvent(new Event('change', {bubbles:true}));
    const nz = Object.keys(weights).filter(k=>(weights[k]||0) > 0);
    sel.value = 'all'; sel.dispatchEvent(new Event('change', {bubbles:true}));
    const nzAll = Object.keys(weights).filter(k=>(weights[k]||0) > 0);
    return { step2: nz.sort(), all: nzAll.length };
  });
  ok('W13-1 step 2 leaves exactly QB+CB1 weighted', JSON.stringify(s1b.step2)===JSON.stringify(['CB1','QB']), JSON.stringify(s1b.step2));
  ok('W13-1 MODEL restores the full 34-slot weight set', s1b.all === 34, 'nonzero='+s1b.all);

  // ---- W13-2: base toggle hover titles + no explainer sentence ----
  const s2 = await page.evaluate(() => {
    const b43 = document.querySelector('.zpb-basetoggle button[data-zbase="43"]');
    const b34 = document.querySelector('.zpb-basetoggle button[data-zbase="34"]');
    zpbToggleBase34(true);
    const labels = { DT1: LABELS.DT1, DT2: LABELS.DT2, MIKE: LABELS.MIKE, SAM: LABELS.SAM };
    const note = (document.getElementById('zpb34note')||{}).textContent;
    zpbToggleBase34(false);
    return { t43: b43 && b43.title, t34: b34 && b34.title, labels, note };
  });
  ok('W13-2 4-3 hover title', s2.t43 === '4 Defensive Linemen · 3 Linebackers', s2.t43);
  ok('W13-2 3-4 hover title', s2.t34 === '3 Defensive Linemen · 4 Linebackers', s2.t34);
  ok('W13-2 3-4 relabels NT/OLB1/ILB1/ILB2/OLB2', s2.labels.DT1==='NT' && s2.labels.DT2==='OLB1' && s2.labels.MIKE==='ILB1' && s2.labels.SAM==='OLB2', JSON.stringify(s2.labels));
  ok('W13-2 explainer sentence deleted (note empty)', s2.note === '', JSON.stringify(s2.note));

  // ---- W13-3: weights three-state ----
  const s3 = await page.evaluate(() => {
    const out = {};
    const save = document.getElementById('personalWBtn');
    out.inert = save && save.disabled === true;
    const inp = document.querySelector('#controls input[data-slot]');
    inp.value = '600'; inp.dispatchEvent(new Event('input', {bubbles:true}));
    out.armed = save.disabled === false;
    save.click();
    out.savedBtn = !!document.getElementById('zpbMyWBtn') && document.getElementById('zpbMyWBtn').textContent === 'MY WEIGHTS';
    out.inertAgain = save.disabled === true;
    const wBefore = weights[inp.dataset.slot];
    weights[inp.dataset.slot] = 5;
    document.getElementById('zpbMyWBtn').click();
    out.myLoads = weights[inp.dataset.slot] === wBefore;
    document.getElementById('modelWBtn').click();
    return out;
  });
  ok('W13-3 SAVE inert until manual change', s3.inert === true);
  ok('W13-3 manual change arms SAVE', s3.armed === true);
  ok('W13-3 saving spawns MY WEIGHTS', s3.savedBtn === true);
  ok('W13-3 SAVE re-inerts after save', s3.inertAgain === true);
  ok('W13-3 MY WEIGHTS loads saved weights', s3.myLoads === true);

  // ---- W13-4: welcome cinematic wired ----
  const s4 = await page.evaluate(() => {
    const fn = startDraft2.toString();
    return { wired: /zpbWelcomeCine/.test(fn), hasFn: typeof zpbWelcomeCine === 'function',
             css: [...document.styleSheets].some(sh=>{ try{ return [...sh.cssRules].some(r=>r.cssText && r.cssText.includes('.zpb-fin-welcome')); }catch(e){ return false; } }) };
  });
  ok('W13-4 welcome cine function + hook + css', s4.wired && s4.hasFn && s4.css, JSON.stringify(s4));

  // ---- W13-5: finish cine timing/one-line ----
  const s5 = await page.evaluate(() => {
    const fn = zpbMaybeFinishCine.toString();
    return { hold: /hold = \[1500, 1500, 2900, 3400\]/.test(fn), row: /zpb-fin-row/.test(fn), q: /zpb-fin-q/.test(fn), noRemove: !/classList\.remove\('zpb-fin-in'\)/.test(fn) };
  });
  ok('W13-5 faster first two + 20-0? lingers (hold array)', s5.hold);
  ok('W13-5 one-row layout + q class + words persist', s5.row && s5.q && s5.noRemove);

  // ---- W13-6: lineup cell guards ----
  const s6 = await page.evaluate(() => {
    const bad = lineupCell({X:[null,null,null,84]}, 'X');
    const good = lineupCell({X:['A Name','QB',0,88]}, 'X');
    return { bad: bad.text, good: good.text };
  });
  ok('W13-6 malformed entry renders dash, not undefined', s6.bad === '—' && /A Name/.test(s6.good), JSON.stringify(s6));

  // ---- W13-7: board cluster ----
  const s7 = await page.evaluate(() => {
    const out = {};
    out.noParensNextPick = !/"'\('"\+\(Math\.floor/.test(document.documentElement.outerHTML) && !/txContent = nx>=0 \? '\('/.test(document.documentElement.outerHTML);
    out.noOverall = !document.documentElement.outerHTML.includes('(#${p.overall})');
    out.allnone = !!document.querySelector('.zpb-allnone');
    out.priCinzel = [...document.styleSheets].some(sh=>{ try{ return [...sh.cssRules].some(r=>r.cssText.includes('td.dc-pri')); }catch(e){ return false; } });
    out.segCinzel = [...document.styleSheets].some(sh=>{ try{ return [...sh.cssRules].some(r=>r.cssText.includes('.zpb-seg button')); }catch(e){ return false; } });
    out.optCss = [...document.styleSheets].some(sh=>{ try{ return [...sh.cssRules].some(r=>/^select option/.test(r.selectorText||'')); }catch(e){ return false; } });
    return out;
  });
  ok('W13-7 next-pick parens off', s7.noParensNextPick);
  ok('W13-7 ticker drops (#overall)', s7.noOverall);
  ok('W13-7 all/none centered pair', s7.allnone || src.includes('<span class="zpb-allnone">'));
  ok('W13-7 Cinzel on priority + Table/Cards seg', s7.priCinzel && s7.segCinzel);
  ok('W13-7 dropdown option palette CSS', s7.optCss);

  // ---- W13-8/13/14 CSS presence ----
  const cssAll = await page.evaluate(() => {
    const t = [...document.querySelectorAll('style')].map(s=>s.textContent).join('\n');
    return {
      compress: t.includes('W13-8 panels tighten'),
      simseason: t.includes('.zpb-simseason'),
      playrow: t.includes('.zpb-playrow'),
      leadline: t.includes('.zpb-leadline'),
      tree: t.includes('.zpb-flextree'),
      badges: t.includes('.zpb-bars'),
      hero2: t.includes('.zpb-100hero2'),
      winert: t.includes('.zpb-winert')
    };
  });
  ok('W13-8 compression CSS live', cssAll.compress);
  ok('W13-13 SIM SEASON muted css', cssAll.simseason && cssAll.playrow);
  ok('W13-14 leaders Cinzel css', cssAll.leadline);

  // ---- W13-9: yardage ----
  const s9 = await page.evaluate(() => {
    const a = zpbCineYds({q:2,t:0.5,side:'home',pts:7},'run');
    const b = zpbCineYds({q:1,t:0.1,side:'away',pts:3},'fg');
    return { a, b, ints: /^\d+ yds$/.test(a) && /^\d+ yds$/.test(b) };
  });
  ok('W13-9 yardage strings are integers', s9.ints, s9.a+' / '+s9.b);
  ok('W13-9 replay labeler appends yardage', src.includes("zpbCineYds(e,'fg')") && src.includes("zpbCineYds(e,'pass')") && src.includes("zpbCineYds(e,'run')"));

  // ---- W13-10: POTG caption gone, opposite-color star ----
  ok('W13-10 PLAYER OF THE GAME caption removed', !src.includes('PLAYER OF THE GAME'));
  ok('W13-10 star wears the pack secondary', src.includes("acc2L||col):col"));

  // ---- W13-11: thresholds ----
  ok('W13-11 Giveaway tier in both verdicts', (src.match(/\['Giveaway',/g)||[]).length === 2);
  ok('W13-11 misses chip uses 0.10', src.includes('.filter(r=>r.regret >= 0.10)'));
  ok('W13-11 0.50 tier present', src.includes("r.regret < 0.50 ? ['Costly Miss'") && src.includes("r.regret<0.50 ? ['Costly Miss'"));

  // ---- W13-12: owner-only colors ----
  ok('W13-12 detail colors = your team only', src.includes('renderDepthChartHTML(e.slotmap, e.pickRounds, e.isUser ? e.teamName : \'\')'));

  // ---- W13-13: SIM SEASON ----
  ok('W13-13 SIM SEASON buttons x2', (src.match(/>SIM SEASON</g)||[]).length === 2);
  ok('W13-13 Play-the-X row between panels', src.includes('class="zpb-playrow"'));

  // ---- W13-14: leaders format ----
  ok('W13-14 leaders = #rank label in Cinzel', src.includes('<p class="detail-item zpb-leadline"><b>#${m.rank}</b> ${m.label}</p>'));

  // ---- W13-15: name tiers ----
  ok('W13-15 three name tiers wired', src.includes("window.innerWidth < 1024") && src.includes("charAt(0)+'"));

  // ---- W13-16: flex tree ----
  await page.click('#tabGuideBtn'); await sleep(900);
  const s16 = await page.evaluate(() => {
    const tree = document.querySelector('#guideBody .zpb-flextree') || document.querySelector('.zpb-flextree');
    return { count: document.querySelectorAll('.zpb-flextree').length, li: tree ? tree.querySelectorAll(':scope > li').length : 0, noTable: !document.querySelector('#guideBody .zpb-flextree ~ table, table th') };
  });
  ok('W13-16 flex tree in guide, 11 families', s16.count >= 1 && s16.li === 11, JSON.stringify(s16));
  ok('W13-16 old flex table gone', !src.includes('<th>Player</th><th>Free</th>'));

  // ---- W13-2 regression: base toggle must not corrupt slot math (adj-spec cache fix) ----
  const s2b = await page.evaluate(() => {
    const before = slotWins('QB',90);
    zpbToggleBase34(true);
    const on = slotWins('QB',90);
    zpbToggleBase34(false);
    const after = slotWins('QB',90);
    return { before: Math.round(before*1000)/1000, on: Math.round(on*1000)/1000, after: Math.round(after*1000)/1000 };
  });
  ok('W13-2 toggle leaves default math identical', s2b.before === s2b.after && Math.abs(s2b.before-1.396) < 0.001, JSON.stringify(s2b));

  // ---- W13-17: badges ----
  ok('W13-17 P+ / R+ / three equal bars', src.includes('<b>P+</b>') && src.includes('<b>R+</b>') && src.includes('<span class="zpb-bars"><i></i><i></i><i></i></span>'));

  // ---- W13-18: review header dedup ----
  ok('W13-18 review h3 deduped', !src.includes('Season Review: ${user}'));

  // ---- W13-19: extra bubbles fn ----
  const s19 = await page.evaluate(() => {
    const h = zpb100More([3,9,12,7,10], 5, {po:3});
    return { html: h, bubbles: (h.match(/<div><b>/g)||[]).length, ints: !/\.\d/.test(h.replace(/zpb/g,'')) };
  });
  ok('W13-19 extra bubble row: 5 same-size bubbles, integers', s19.bubbles === 5 && s19.ints);

  // ---- W13-20: strip names removed ----
  ok('W13-20 strip team names removed', !src.includes("'<div><b>'+g.away+'</b><span class=\"narr\">model '") && !src.includes("text-align:right;\"><b>'+g.home+'</b>"));

  // ---- invariants: no white text added by v13 ----
  const whiteAdded = await page.evaluate(() => {
    const t = document.getElementById('zpb-w13');
    return t ? /#fff|#ffffff|color:\s*white/i.test(t.textContent) : null;
  });
  ok('invariant: v13 style block has no white text', whiteAdded === false);

  // ---- invariants: base draft math untouched ----
  const inv = await page.evaluate(() => {
    return {
      qb: Math.round(slotWins('QB',90)*1000)/1000,
      fb: Math.round(slotWins('FB',90)*1000)/1000,
      p: Math.round(slotWins('P',90)*1000)/1000,
      slots: ROSTER_SLOTS.length
    };
  });
  ok('invariant: slot math intact (QB 1.396 / FB 0.034 / P 0.208 / 28 slots)', Math.abs(inv.qb-1.396)<0.001 && Math.abs(inv.fb-0.034)<0.001 && Math.abs(inv.p-0.208)<0.001 && inv.slots===28, JSON.stringify(inv));
  const invDelta = await page.evaluate(() => Math.round((slotWins('QB',90)-slotWins('QB',70))*1000)/1000);
  ok('invariant: QB series delta still 2.541', Math.abs(invDelta-2.541)<0.001, 'delta='+invDelta);

  console.log('\nconsole errors:', errors.length, errors.slice(0,4));
  ok('ZERO console errors end-to-end', errors.length === 0);

  // evidence shots
  try{
    await page.screenshot({ path: SHOT + '/v13-guide-tree.png', fullPage: false });
    await page.click('#tabRankingsBtn'); await sleep(500);
    await page.screenshot({ path: SHOT + '/v13-rankings-series.png', fullPage: false });
  }catch(e){ console.log('shot err', e.message); }

  await browser.close();
  console.log(fails.length ? ('\nFAILURES: ' + fails.length + ' -> ' + fails.join(' | ')) : '\nALL GREEN');
  process.exit(fails.length ? 1 : 0);
})();
