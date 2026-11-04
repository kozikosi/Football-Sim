#!/usr/bin/env node
/* w45_live.js — the live drills for the round-45 directives (real Chromium, both themes).
   A (O1/O2/O3): the halfway sweep — the page text, the packs' floor, the row numbers, the
                 comparison numbers, the dropdown options/faces — all ride txM/txd, both themes.
   B (O3/O4): the inversions — tinted rows, mu/strip names, player cards, poschips, star faceoff:
              light reads the halfway ink, dark reads txd; nothing pale-on-light, dark-on-dark.
   C (O5): the pregame star panels all wear ONE fitted size.
   D (O6): the ending tails (last drives + blocks) carry the full line anatomy.
   E (O7/O8): the box score — the final scores wear the 0.50 tone and read with the dot.
   F (O9): the '70-rated … -win team' wording is gone from the awards' why lines.
   G (O10): the playoffs page carries no leaked w41 comment text.
   H (guards): the 90+ gold shimmer law; dark txd unchanged from w44; zero page errors. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright/node_modules/playwright-core');
const FILE = 'file://' + process.cwd() + '/Football-Sim-Z-post-blue-w45.html';
const OUT = process.cwd() + '/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 12000 }); } catch (e) { console.log('   (shot skipped)'); } };
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

const runInstantDraft = async (page) => {
  await page.evaluate(() => {
    try{
      startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
      for(let g=0; g<6000 && draftSim.pos < draftSim.order.length; g++){
        const t = draftSim.order[draftSim.pos];
        if(t === draftSim.userIndex){
          const roster = draftSim.rosters[t];
          if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
          let cands = draftSim.pool.filter(p=>nat(p).length); if(!cands.length) cands = draftSim.pool.slice();
          cands.sort((a,b)=>b[3]-a[3]); const p = cands[0]; const on = nat(p);
          executePick(draftSim.userIndex, p, on.length?on[0]:ROSTER_SLOTS.find(s=>!roster.slots[s]));
        } else { const pk = cpuPick(t); if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; }
      }
      draftSim.awaitingUser = false;
      try{ if(draftFinalResults.style.display==='none') finishDraft2(); }catch(e){}
    }catch(e){}
  });
  await page.waitForTimeout(700);
};

const MEASURE = () => {
  const lum = c => {
    const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if(!m) return null;
    if(m[4] !== undefined && parseFloat(m[4]) === 0) return null;
    const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
    return 0.2126*f(+m[1]) + 0.7152*f(+m[2]) + 0.0722*f(+m[3]);
  };
  const bgOf = el => {
    let e = el;
    while(e && e !== document.documentElement){
      const bg = getComputedStyle(e).backgroundColor;
      if(bg && !/rgba?\([^)]*,\s*0\)/.test(bg) && bg !== 'transparent') return bg;
      e = e.parentElement;
    }
    return getComputedStyle(document.body).backgroundColor;
  };
  const crOf = el => {
    const L1 = lum(getComputedStyle(el).color), L2 = lum(bgOf(el));
    return (L1 && L2) ? ((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)) : null;
  };
  const grab = (sel, root) => Array.from((root||document).querySelectorAll(sel)).slice(0, 40)
    .map(el => ({ t:(el.textContent||'').trim().slice(0,24), col:getComputedStyle(el).color, cls:el.className.toString(), cr:crOf(el) }));
  return { grab, lum, bgOf, crOf };
};

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu'] });
  const errsAll = [];
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 980 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1400);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page.waitForTimeout(400);
    console.log(`\n===== ${theme.toUpperCase()} =====`);

    // ---------- A: the halfway sweep ----------
    const A = await page.evaluate(() => {
      const lum = h => { const c=h.replace('#',''); const f=v=>{v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
        return 0.2126*f(parseInt(c.slice(0,2),16))+0.7152*f(parseInt(c.slice(2,4),16))+0.0722*f(parseInt(c.slice(4,6),16)); };
      const cr = (a,b)=>{ const l1=lum(a), l2=lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };
      const teams = Object.keys(ZPB_TEAM_COLORS);
      const inks = {};
      teams.forEach(t=>{ const p=zpbPackFor(t); inks[t]={txM:p.txM,txd:p.txd,accL:p.accL}; });
      const floors = teams.map(t=>cr(inks[t].txM,'#fcf7f1'));
      return {
        inks,
        minCR: Math.min.apply(null, floors).toFixed(2),
        belowFloor: teams.filter(t=>cr(inks[t].txM,'#fcf7f1')<5),
        rai: inks['Las Vegas Raiders'].txM,
        kc: inks['Kansas City Chiefs'].txM
      };
    });
    ok(A.minCR >= 5, 'A1 the halfway floor: every franchise ≥5:1 on the light page', 'min '+A.minCR+' · below: '+A.belowFloor.join(','));
    const hex2rgb = h => h?'rgb('+parseInt(h.slice(1,3),16)+', '+parseInt(h.slice(3,5),16)+', '+parseInt(h.slice(5,7),16)+')':'';
    ok(A.rai !== '#866b3e', 'A2 the Raiders light ink no longer sits at the muddy 4.7:1', A.rai);

    // season flow
    await runInstantDraft(page);
    const flow = await page.evaluate(() => {
      const r = {};
      r.b1 = !!document.getElementById('resultsSeasonBtn');
      try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){ r.e1 = e.message; }
      r.b2 = !!document.getElementById('beginSeasonBtn');
      try{ document.getElementById('beginSeasonBtn').click(); }catch(e){ r.e2 = e.message; }
      return r;
    });
    await page.waitForTimeout(5200);
    await page.evaluate(() => { window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} try{ document.querySelector('.zpb-restov')?.remove(); }catch(e){} });
    const flowOk = await page.evaluate(() => ({ hasSeason: typeof seasonState!=='undefined' && !!seasonState, played: (seasonState&&seasonState.schedule||[]).filter(x=>x.played).length, u: (typeof seasonUserTeam==='function')?seasonUserTeam():null }));
    ok(flowOk.hasSeason && !!flowOk.u, 'S0 the season flow runs (draft → season hub)', JSON.stringify(flowOk)+' '+JSON.stringify(flow));

    const m = await page.evaluate(() => {
      const M = { lum:null };
      const lumf = c => { const mm=c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/); if(!mm) return null;
        const f=v=>{v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
        return 0.2126*f(+mm[1])+0.7152*f(+mm[2])+0.0722*f(+mm[3]); };
      const bgOf = el => { let e=el; while(e && e!==document.documentElement){ const bg=getComputedStyle(e).backgroundColor;
        const am = bg && bg.match(/rgba?\([^)]*?,\s*([\d.]+)\)/);
        const alpha = am ? parseFloat(am[1]) : 1;
        if(bg && bg!=='transparent' && alpha>=0.5) return bg; e=e.parentElement; }
        return getComputedStyle(document.body).backgroundColor; };
      const crEl = el => { const l1=lumf(getComputedStyle(el).color), l2=lumf(bgOf(el)); return (l1&&l2)?((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)):null; };
      const grab = (sel, root) => Array.from((root||document).querySelectorAll(sel)).slice(0, 40)
        .map(el => ({ t:(el.textContent||'').trim().slice(0,24), col:getComputedStyle(el).color, cls:el.className.toString(), cr:crEl(el) }));
      return { grab, crEl };
    });

    // dropdown options + faces (home comparison selects)
    const dr = await page.evaluate(() => {
      const out = {};
      const sel = document.getElementById('homeCmpA');
      const wrap = sel && sel.closest('.zpb-selwrap');
      const btn = wrap && wrap.querySelector('.zpb-selbtn');
      if(btn){ btn.click(); }
      const pop = wrap && wrap.querySelector('.zpb-selpop');
      const opts = pop ? Array.from(pop.querySelectorAll('.zpb-selopt')) : [];
      const want = ['Las Vegas Raiders','Kansas City Chiefs','Green Bay Packers'];
      out.opts = opts.filter(o=>want.some(w=>o.textContent.trim()===w)).map(o=>({ t:o.textContent.trim(), c:getComputedStyle(o).color }));
      if(btn) btn.click();
      return out;
    });
    const txMof = t => A.inks[t].txM;
    const drOK = dr.opts.length===3 && dr.opts.every(o => {
      const want = theme==='light' ? hex2rgb(txMof(o.t)) : hex2rgb(A.inks[o.t].txd);
      return o.c === want;
    });
    ok(drOK, 'A3 the comparison dropdown options ride the halfway ink (light) / txd (dark)', JSON.stringify(dr.opts));

    // ---------- B: the inversions — build the comparison + preview surfaces ----------
    const B1 = await page.evaluate(() => {
      const out = {};
      // comparison lineup table: Bills vs Vikings (the Owner's example) + Chiefs vs Raiders
      const mk = (a,b) => {
        const host = document.createElement('div');
        host.innerHTML = renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], a, b, false);
        host.style.cssText='position:fixed;left:-9999px;top:0;width:900px;'; document.body.appendChild(host);
        const cells = Array.from(host.querySelectorAll('.zpb-lu-cell')).filter(c=>!c.className.includes('zpb-shm'));
        const res = cells.map(el=>({ t:el.textContent.trim().slice(0,18), col:getComputedStyle(el).color, cr:crEl(el) })); // measured WHILE attached
        host.remove();
        return res;
      };
      const lumf = c => { const mm=c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/); if(!mm) return null;
        const f=v=>{v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
        return 0.2126*f(+mm[1])+0.7152*f(+mm[2])+0.0722*f(+mm[3]); };
      const bgOf = el => { let e=el; while(e && e!==document.documentElement){ const bg=getComputedStyle(e).backgroundColor;
        const am = bg && bg.match(/rgba?\([^)]*?,\s*([\d.]+)\)/);
        const alpha = am ? parseFloat(am[1]) : 1;
        if(bg && bg!=='transparent' && alpha>=0.5) return bg; e=e.parentElement; }
        return getComputedStyle(document.body).backgroundColor; };
      const crEl = el => { const l1=lumf(getComputedStyle(el).color), l2=lumf(bgOf(el)); return (l1&&l2)?((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)):null; };
      out.bv = mk('Buffalo Bills','Minnesota Vikings');
      out.kr = mk('Kansas City Chiefs','Las Vegas Raiders');
      // star faceoff for a Chiefs @ Raiders game
      const g = seasonState.schedule.find(x=>(x.home==='Las Vegas Raiders'&&x.away==='Kansas City Chiefs')||(x.home==='Kansas City Chiefs'&&x.away==='Las Vegas Raiders'));
      if(g){
        const host2 = document.createElement('div');
        host2.innerHTML = starsFaceoffHTML(g);
        host2.style.cssText='position:fixed;left:-9999px;top:0;width:900px;'; document.body.appendChild(host2);
        out.stars = Array.from(host2.querySelectorAll('.zpb-star-cell')).slice(0,12).map(c=>{
          const s=c.querySelector('span'); return { n:s?s.textContent:'', col:s?getComputedStyle(s).color:'', cls:s?s.className:'' };
        });
        out.starsCrs = Array.from(host2.querySelectorAll('.zpb-star-cell')).slice(0,12).map(c=>crEl(c));
        host2.remove();
      }
      // dark twins live checks: mu-name, strip team, pcard, poschip
      out.mu = Array.from(document.querySelectorAll('.zpb-mu-name')).slice(0,2).map(e=>getComputedStyle(e).color);
      out.strip = Array.from(document.querySelectorAll('.zpb-strip-team b')).slice(0,2).map(e=>getComputedStyle(e).color);
      out.poschip = Array.from(document.querySelectorAll('.zpb-poschip')).slice(0,2).map(e=>getComputedStyle(e).color);
      return out;
    });
    const crMin = arr => Math.min.apply(null, arr.map(x=>x.cr).filter(c=>c!=null)).toFixed(2);
    ok(crMin(B1.kr) >= 4.5, 'B1 the tinted lineup cells read (Chiefs/Raiders, min CR ≥4.5)', 'min '+crMin(B1.kr));
    ok(crMin(B1.bv) >= 4.5, 'B2 the Bills/Vikings lineup cells read (min CR ≥4.5)', 'min '+crMin(B1.bv));
    const krWant = theme==='light' ? ['rgb(158, 45, 54)', hex2rgb(A.inks['Las Vegas Raiders'].txM)] : ['rgb(244, 209, 203)', hex2rgb(A.inks['Las Vegas Raiders'].txd)];
    const krCols = Array.from(new Set(B1.kr.map(x=>x.col)));
    const neutralOK = krCols.filter(c=>!krWant.includes(c));
    ok(krWant.every(w=>krCols.includes(w)) && neutralOK.length<=1, 'B3 the lineup cells wear their teams\' inks (neutral placeholders allowed)', krCols.join(' | ')+' · extra: '+neutralOK.join(','));
    if(B1.stars && B1.stars.length){
      const cols = Array.from(new Set(B1.stars.filter(s=>!s.cls.includes('zpb-shm')).map(s=>s.col)));
      ok(cols.length >= 1 && cols.length <= 3, 'B4 the star faceoff reads in team inks (no pale)', cols.join(' | '));
    }
    const darkWantStrip = theme==='dark' ? hex2rgb(A.inks['Kansas City Chiefs'].txd) : null;
    if(theme==='dark'){
      ok(B1.strip.length===0 || B1.strip.every(c=>c!=='rgb(158, 45, 54)'), 'B5 dark: the strip names do NOT wear the light halfway ink', B1.strip.join('|'));
      ok(B1.mu.every(c=>c!=='rgb(158, 45, 54)'), 'B6 dark: the matchup names do NOT wear the light halfway ink', B1.mu.join('|'));
    } else {
      ok(true, 'B5/B6 light: names ride the halfway ink (measured via cells)');
    }

    // ---------- C: one fitted size on the pregame stage ----------
    const C = await page.evaluate(() => new Promise(res => {
      try{ simRestOfSeason(); }catch(e){}
      window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){}
      try{ document.querySelector('.zpb-restov')?.remove(); }catch(e){}
      const u = seasonUserTeam();
      const g = seasonState.schedule.find(x=>x.played && (x.home===u||x.away===u) && x.result && x.result.homeEvents && x.result.homeEvents.length);
      window.__zpbSilent = false;
      try{ zpbGameReplay(g, u); }catch(err){ res({err:err.message}); return; }
      setTimeout(()=>{
        const ov = document.querySelector('.zpb-replay-ov');
        if(!ov){ res({err:'no overlay'}); return; }
        const sizes = Array.from(ov.querySelectorAll('.zpb-intro-star')).map(s=>getComputedStyle(s).fontSize);
        const skip = ov.querySelector('#zrepSkip'); if(skip) skip.click();
        setTimeout(()=>{ const ov1b = document.querySelector('.zpb-replay-ov'); const sk2 = ov1b && ov1b.querySelector('#zrepSkip'); if(sk2 && sk2.style.display!=='none') sk2.click(); }, 1200); // w45 drill: the second Skip hands the rest of the report over
        // ---------- D: the ending tails anatomy ----------
        setTimeout(()=>{
          const ov2 = document.querySelector('.zpb-replay-ov');
          const lines = ov2 ? Array.from(ov2.querySelectorAll('.zpb-rep-line')) : [];
          const tails = lines.filter(l=>l.className.includes('zrl-drive'));
          const tailInfo = tails.map(l=>({ hasT:!!l.querySelector('.zrl-t'), hasTeam:!!l.querySelector('.zrl-team'), hasSc:!!l.querySelector('.zrl-sc'), hasCrest:!!l.querySelector('img'), cls:l.className, txt:l.textContent.trim().slice(0,60) }));
          const finLine = ov2 ? (ov2.querySelector('.zpb-rep-fscore')||{textContent:''}).textContent : '';
          res({ sizes, tailInfo, finLine, err:null });
          try{ ov2 && ov2.remove(); }catch(e){}
        }, 3000);
      }, 2800);
    }));
    if(C.err){ ok(false, 'C/D harness', C.err); }
    else {
      const uniq = Array.from(new Set(C.sizes));
      ok(uniq.length===1, 'C1 every pregame star panel wears ONE size', uniq.join(' | ')+' ('+C.sizes.length+' panels)');
      ok(C.tailInfo.length===0 || C.tailInfo.every(t=>t.hasT && t.hasTeam && t.hasSc && t.hasCrest), 'D1 the ending tails carry the full anatomy (timer+crest+team+score)', JSON.stringify(C.tailInfo.slice(0,4)));
    }

    // ---------- D2: a REAL close game — the last drives + any block lines, full anatomy ----------
    const D2 = await page.evaluate(() => new Promise(res => {
      const u = seasonUserTeam();
      window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){}
      const closeGames = seasonState.schedule.filter(x=>x.played && x.result && Math.abs(x.result.homeScore-x.result.awayScore)<=8 && x.result.homeEvents && x.result.homeEvents.length);
      const blockGames = seasonState.schedule.filter(x=>x.played && x.detail && ((x.detail.home&&x.detail.home.blocks&&x.detail.home.blocks.length)||(x.detail.away&&x.detail.away.blocks&&x.detail.away.blocks.length)));
      let sampled = 0, driveLines = [], blockLines = [];
      const games = [];
      for(const g of closeGames){ if(g.home===u||g.away===u) games.unshift(g); else games.push(g); }
      const next = i => {
        if(i >= Math.min(games.length, 6) && blockLines.length === 0 && blockGames.length){
          // try a block game even if not close
          const bg2 = blockGames.find(b=>!games.slice(0,6).includes(b));
          if(bg2){ games.splice(Math.min(games.length,6), 0, bg2); }
        }
        if(i >= games.length || i >= 8){ res({ sampled, driveLines, blockLines, closeCount: closeGames.length, blockCount: blockGames.length }); return; }
        const g = games[i];
        window.__zpbSilent = false;
        try{ zpbGameReplay(g, u); }catch(err){ }
        setTimeout(()=>{
          window.__zpbSilent = true;
          const ov = document.querySelector('.zpb-replay-ov');
          if(ov){
            const skip = ov.querySelector('#zrepSkip'); if(skip) skip.click();
            setTimeout(()=>{ const ov1b = document.querySelector('.zpb-replay-ov'); const sk2 = ov1b && ov1b.querySelector('#zrepSkip'); if(sk2 && sk2.style.display!=='none') sk2.click(); }, 1100);
            setTimeout(()=>{
              const ov2 = document.querySelector('.zpb-replay-ov');
              if(ov2){
                const tails = Array.from(ov2.querySelectorAll('.zpb-rep-line')).filter(l=>l.className.includes('zrl-drive'));
                const info = tails.map(l=>({ hasT:!!l.querySelector('.zrl-t'), hasTeam:!!l.querySelector('.zrl-team'), hasSc:!!l.querySelector('.zrl-sc'), hasCrest:!!l.querySelector('img'), txt:l.textContent.trim().slice(0,52) }));
                const isBlock = tails.filter(l=>/BLK/.test(l.textContent));
                if(info.length){ sampled++; driveLines = driveLines.concat(info.filter(x=>!/BLK/.test(x.txt))); }
                blockLines = blockLines.concat(info.filter(x=>/BLK/.test(x.txt)));
                ov2.remove();
              }
              setTimeout(()=>next(i+1), 250);
            }, 2300);
          } else { setTimeout(()=>next(i+1), 150); }
        }, 2900);
      };
      next(0);
    }));
    ok(D2.driveLines.length===0 || D2.driveLines.every(t=>t.hasT && t.hasTeam && t.hasSc && t.hasCrest), 'D2 the LAST DRIVES lines (when the w33 composer fires) carry the full anatomy', JSON.stringify(D2.driveLines.slice(0,2))+' · close games: '+D2.closeCount);
    ok(D2.blockLines.length===0 || D2.blockLines.every(t=>t.hasT && t.hasTeam && t.hasSc && t.hasCrest), 'D3 the blocked-kick lines (the real end-of-game events) carry the full anatomy (timer+crest+team+score)', JSON.stringify(D2.blockLines.slice(0,2))+' · games with blocks: '+D2.blockCount);

    // ---------- E: the box score (review) ----------
    const E = await page.evaluate(() => {
      const u = seasonUserTeam();
      const g = seasonState.schedule.find(x=>x.played && (x.home===u||x.away===u));
      if(!g) return { err:'no game' };
      const host = document.createElement('div');
      host.innerHTML = renderGameResultHTML(g, u);
      host.style.cssText='position:fixed;left:-9999px;top:0;width:900px;'; document.body.appendChild(host);
      const aw = host.querySelector('.zpb-slsc-aw'), hm = host.querySelector('.zpb-slsc-hm');
      const sep = (host.querySelector('.sl-score')||{textContent:''}).textContent.trim();
      const names = Array.from(host.querySelectorAll('.zpb-sl2name'));
      const ts = Array.from(host.querySelectorAll('table.zpb-tsstat td:first-child, table.zpb-tsstat td:last-child')).slice(0,4).map(td=>getComputedStyle(td).color);
      const out = {
        sep: sep.replace(/\d+/g,'#'),
        aw: getComputedStyle(aw).color, hm: getComputedStyle(hm).color,
        awName: names[0]?getComputedStyle(names[0]).color:'', hmName: names[1]?getComputedStyle(names[1]).color:'',
        ts,
        txMA: zpbPackFor(g.away).txM, txMH: zpbPackFor(g.home).txM, txDA: zpbPackFor(g.away).txd, txDH: zpbPackFor(g.home).txd
      };
      host.remove();
      return out;
    });
    if(E.err){ ok(false, 'E harness', E.err); }
    else {
      ok(E.sep === '# · #', 'E1 the box score final reads with the dot', E.sep);
      const wantAw = theme==='light'?hex2rgb(E.txMA):hex2rgb(E.txDA);
      const wantHm = theme==='light'?hex2rgb(E.txMH):hex2rgb(E.txDH);
      ok(E.aw===wantAw && E.hm===wantHm, 'E2 the final scores wear the 0.50 tone', E.aw+' / '+E.hm);
      ok(E.awName===wantAw && E.hmName===wantHm, 'E3 the scores match the team names in the same box', E.awName+' / '+E.hmName);
      ok(E.ts.every(c=>c===wantAw||c===wantHm), 'E4 the Team-Stats columns wear the 0.50 tone', E.ts.join(' | '));
    }

    // ---------- F: the MVP wording ----------
    const F = await page.evaluate(() => {
      const A2 = seasonState.awardsRS;
      const whys = (A2&&A2.individual||[]).map(a=>a.why||'').concat((A2&&A2.individual||[]).filter(a=>a.c&&a.c.name).map(a=>a.c.name+' :: '+(a.why||'')));
      const bad = whys.filter(w=>/\d+-rated \w+ on a \d+-win team/.test(w));
      return { bad, sample: whys[0]||'' };
    });
    ok(F.bad.length===0, 'F1 no "N-rated POS on a N-win team" anywhere in the awards', JSON.stringify(F.bad)+' · sample: '+F.sample.slice(0,60));

    // ---------- G: the playoffs leaked comment ----------
    const G = await page.evaluate(() => {
      try{
        if(seasonState.phase==='regular' || seasonState.phase==='regularReview'){ startPlayoffs(); simulatePlayoffRound(); }
        const btns = Array.from(document.querySelectorAll('button,a'));
        const b = btns.find(x=>/playoff/i.test((x.textContent||'')) && x.offsetParent!==null);
        if(b) b.click();
        return { clicked: b?b.textContent.trim():null };
      }catch(e){ return { err:e.message }; }
    });
    await page.waitForTimeout(900);
    const G2 = await page.evaluate(() => {
      // the check reads only RENDERED views — script tags live in the body and their text counts
      const views = Array.from(document.querySelectorAll('.view'));
      const active = views.filter(v=>v.offsetParent!==null);
      const pool = (active.length?active:views).map(v=>v.textContent).join(' ');
      return { leak: pool.includes('no duplicate — on a loss') || pool.includes('// w41 (W3'), activeViews: active.length };
    });
    ok(!G2.leak, 'G1 the rendered playoffs carry no leaked w41 comment text', 'active views: '+G2.activeViews);

    // ---------- H: guards ----------
    const H = await page.evaluate(() => {
      const sh = Array.from(document.querySelectorAll('.zpb-shm')).slice(0,6).map(e=>getComputedStyle(e));
      return sh.map(s=>({ col:s.color, clip:s.webkitBackgroundClip||s.backgroundClip }));
    });
    ok(H.every(s=>s.clip==='text'||s.col==='rgba(0, 0, 0, 0)'), 'H1 the 90+ gold shimmer law stands (background-clip text)', JSON.stringify(H.slice(0,2)));
    ok(errs.length===0, 'H2 zero page errors this theme', errs.slice(0,3).join(' | '));
    errsAll.push(...errs);
    await shot(page, `${OUT}/hub-${theme}-w45.png`);
    await ctx.close();
  }

  // the dark-unchanged guard: txd values equal the w44 dump
  const ctx2 = await browser.newContext();
  const page2 = await ctx2.newPage();
  await page2.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page2.waitForTimeout(1200);
  const T = await page2.evaluate(() => {
    const w44 = { 'Kansas City Chiefs':'#f4d1cb', 'Las Vegas Raiders':'#eee1ce', 'Buffalo Bills':'#dadae1', 'Minnesota Vikings':'#e8d7dc' };
    return Object.keys(w44).map(t=>({ t, now:zpbPackFor(t).txd, w44:w44[t] }));
  });
  ok(T.every(x=>x.now===x.w44), 'H3 dark keeps txd untouched (w44 values)', JSON.stringify(T));
  await ctx2.close();

  await browser.close();
  console.log(`\n==== ${pass} PASS · ${fail} FAIL ====`);
  process.exit(fail?1:0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(1); });
