P7 — SEEDED RNG DESIGN FOR T-20261022-claude-2
================================================

GOAL: Inject a deterministic RNG (rnd()) through all 38 Math.random() call sites
so that two simulator runs with the same seed produce identical outputs. Default
behaviour (rnd() === Math.random()) must be unchanged.

INJECTION SEAM:
---------------

Create a single injectable RNG function:

  function rnd() { return Math.random(); }

Then replace every Math.random() call site with rnd(). The seam is transparent
at runtime when rnd() is left as the identity wrapper, but can be replaced with
a seeded PRNG by setting:  rnd = seededPRNG(seed);

All 38 call sites (line numbers reference Pre-Colors build):

  1. L1015: shuffleArr — j = Math.floor(rnd()*(i+1))
  2. L1077:  const flip = rnd()<0.5;
  3. L1392: b[group] = rnd()<0.33 ? 0.003+rnd()*0.03 : rnd()<0.35 ? 5+rnd()*8 : Math.exp(0.5*randNormal())
  4. L1396: draftSim.noiseSd[teamIndex] = 0.1 + Math.pow(rnd(),1.0)*4.0;
  5. L1397: draftSim.missP[teamIndex] = Math.pow(rnd(),0.9)*0.95;
  6. L1431: if(cands.length>8 && rnd() < cpuMiss(teamIndex))
  7. L1460: if(userTeamName==='__random'){ const all = Object.keys(TEAM_DATA); userTeamName = all[Math.floor(rnd()*all.length)]; }
  8. L1466: for(let i=shuffled.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]; }
  9. L1471: for(let i=others.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [others[i],others[j]]=[others[j],others[i]]; }
  10. L1835: pick(arr) { return arr[Math.floor(rnd()*arr.length)]; }
  11. L1920: function randNormal(){ let u=0,v=0; while(u===0) u=rnd(); while(v===0) v=rnd(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
  12. L1922: function poisson(lambda){ if(lambda<=0) return 0; const L=Math.exp(-lambda); let k=0,p=1; do{ k++; p*=rnd(); }while(p>L); return k-1; }
  13. L1926: let r = rnd()*total;
  14. L1980: u = rnd(); S.aggr[t] = S.teams[t].isUser ? 'balanced' : (u<0.22?'cautious':u>0.78?'aggressive':'balanced');
  15. L2171: if(s===1) return rnd()<0.5 ? 0 : 3;
  16. L2173: if(s===4) return rnd()<0.5 ? 3 : 6;
  17. L2174: if(s===5) return rnd()<0.5 ? 6 : 3;
  18. L2321: if(homeScore===awayScore && (isPlayoff || rnd()>0.08))
  19. L2322: ot = true; const homeWinsOT = rnd() < normCdf((homeProj-awayProj)/9), add = rnd()<0.35 ? 7 : 3;
  20. L2330: (otAdd.side==='home'?homeEvents:awayEvents).push({pts:otAdd.add, type:otAdd.add===7?'TD':'FG', q:5, t:0.5+rnd()*0.3});
  21. L2495: if(rnd()<passTDprob && catchers.length){
  22. L2511: if(!made){ if(ev.tpTry===undefined) ev.tpTry = ev.forced ? true : rnd()<Math.min(0.9, 0.38*(AGGR_INFO[ev.ag||'balanced'].two)); if(!ev.tpTry) return; }
  23. L2512: if(rnd()<0.55 && catchers.length && qb){
  24. L2527: if(rnd()<0.52 && qb){
  25. L2586:   const rs = rnd()<0.5 ? s : weightedPick(Object.keys(recW).filter(x=>bySlot[x]).map(x=>({item:x, w:recW[x]})));
  26. L2593: (extra.oppOwnFum||[]).forEach(()=>{ if(rnd()<0.5){ const cands = Object.keys(ffW).filter(x=>bySlot[x]); if(!cands.length) return; const s = weightedPick(cands.map(x=>({item:x, w:ffW[x]}))); const p = P(bySlot[s].e, s); p.st.ff = (p.st.ff||0)+1; } });
  27. L2637: for(let i=0;i<krN;i++) kry += clampNum(Math.round(19.5*f*Math.exp(gaussNoise(0.32)) + (rnd()<0.012?55:0)), 6, 104);
  28. L2638: for(let i=0;i<prN;i++) pry += clampNum(Math.round(7.4*f*Math.exp(gaussNoise(0.55)-0.1) + (rnd()<0.01?45:0)), -3, 90);
  29. L2645: const defTDn = (evs, oppTO)=>{ const tds = evs.filter(e=>e.type==='TD').length; let n=0; for(let i=0;i<oppTO;i++) if(rnd()<0.085) n++; return Math.min(n, tds); };
  30. L2663: causes.forEach(c=>{ if(rnd()<share[c]){ const x = pickOL(); x.st.sa = (x.st.sa||0)+1; x.st.pa = (x.st.pa||0)+1; } });
  31. L2665:  for(let i=0;i<press;i++){ if(rnd()<0.85){ const x = pickOL(); x.st.pa = (x.st.pa||0)+1; } }
  32. L2742: events.forEach(e=>{ e.ag = ag||'balanced'; e.q = weightedPick([{item:1,w:1},{item:2,w:1.05},{item:3,w:1},{item:4,w:1.15}]); e.t = rnd(); });
  33. L3473:  if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAPS[k]) rec.st[k] = Math.max(before[k], SEASON_RECORD_CAPS[k] - Math.floor(rnd()*35)); });
  34. L5243: let hi = Math.floor(rnd()*HOT_T.length), ci = Math.floor(rnd()*COLD_T.length);
  35. L5559: const i = (pool.length?pool:T.map((t,j)=>j))[Math.floor(rnd()*(pool.length||T.length))];
  36. L6456: function confetti(n, colors, x0, y0, spread, speed){ for(let i=0;i<n;i++){ const a = (-Math.PI/2) + (rnd()-.5)*spread, v = speed*(0.5+rnd()); parts.push({x:x0, y:y0, vx:Math.cos(a)*v, vy:Math.sin(a)*v, g:0.18+rnd()*0.08, w:5+rnd()*6, h:3+rnd()*5, r:rnd()*6, vr:(rnd()-.5)*.35, c:colors[(rnd()*colors.length)|0], life:1, decay:0.0035+rnd()*0.004, kind:'c'}); } }
  37. L6457: function firework(x, y, colors){ const n = 70; for(let i=0;i<n;i++){ const a = Math.PI*2*i/n + rnd()*0.1, v = 2.5+rnd()*3.8; parts.push({x, y, vx:Math.cos(a)*v, vy:Math.sin(a)*v, g:0.05, w:2.6, h:2.6, r:0, vr:0, c:colors[(rnd()*colors.length)|0], life:1, decay:0.012+rnd()*0.01, kind:'f'}); } }
  38. L6483:   [300,900,1500,2100,2700,3300].forEach(t=>setTimeout(()=>{ if(!cv) ensure(); firework(W*(0.15+rnd()*0.7), H*(0.15+rnd()*0.35), GOLD.concat(['#4f8cff'])); start(); }, t));

TEST PLAN: Proving two runs with the same seed match
--------------------------------------------------

STEP 1 — Define a seeded PRNG (xorshift128+ is recommended, or a simple LCG):

  // xorshift128+ — fast, high-quality, simple state
  let x = 123456789, y = 362436069, z = 521288629, w = 88675123;
  function xorshift128plus() {
    let t = x ^ (x << 11);
    x = y; y = z; z = w;
    w = w ^ (w >>> 19) ^ t ^ (t >>> 8);
    return (w >>> 0) / 4294967295;  // returns [0,1) floating point
  }

STEP 2 — Replace the seam:

  rnd = function(seed) {
    // Initialize xorshift state from seed
    x = seed >>> 0;
    y = (seed * 1103515245 + 12345) >>> 0;
    z = (y * 1103515245 + 12345) >>> 0;
    w = (z * 1103515245 + 12345) >>> 0;
    // Override rnd to use the seeded PRNG
    return function() {
      let t = x ^ (x << 11);
      x = y; y = z; z = w;
      w = w ^ (w >>> 19) ^ t ^ (t >>> 8);
      return (w >>> 0) / 4294967295;
    };
  };

  // Or more simply, just assign:
  // rnd = seededFn;  where seededFn() returns [0,1) values

STEP 3 — Test procedure:

  a. Set rnd = seededPRNG(42);  // or any integer seed
  b. Run the full simulator from the same initial state
  c. Capture the full output (draft order, season results, playoff bracket, awards)
  d. Set rnd = seededPRNG(42);  // same seed
  e. Run the full simulator again from the same initial state
  f. Compare all output artifacts: they must be byte-identical

STEP 4 — Verification claims:

  - CLAIM: Two simulator runs with the same integer seed produce identical outputs.
  - EVIDENCE: Run the test procedure above with at least 3 different seeds (e.g., 42, 123, 99999).
  - For each seed, run the simulator twice and confirm output match.
  - Label each claim as VERIFIED (if tested and matching) or UNKNOWN (if not yet tested).

STEP 5 — Seam compatibility:

  - When rnd() is the identity function (rnd = Math.random), the simulator produces
    identical output to the pre-existing unseeded behavior. No regression.
  - When rnd is replaced with a seeded PRNG, the mathematical behavior is
    unchanged in distribution (the PRNG approximates U[0,1] just as Math.random does),
    but becomes deterministic given the seed.

IMPLEMENTATION NOTES (design only, no product code changes):

  - The `rnd()` function must be defined early in the script (before any
    gameplay code runs) and must be the sole entry point for all randomness.
  - 38 call sites must be audited and updated; missing one breaks the seeded
    repeatability guarantee.
  - The `rnd` override must work in the same JavaScript scope as the existing
    `Math.random` references.
  - The seeded PRNG function signature should be compatible: `rnd(seed)` returns a
    new `()` function, or `rnd` is simply reassigned to a `()` function.
  - No other global RNG sources may be used outside the `rnd()` seam.

DELIVERABLE: Design document P7-SEEDED-RNG.md (this file) — no product HTML edits.
Test plan to be executed by the Architect after the injectable RNG seam is coded.