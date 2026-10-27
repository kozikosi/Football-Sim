#!/usr/bin/env python3
# w23 patch 1 — draft integrity + views + homepage dropdown (Z.ai, 2026-10-27)
# In:  Football-Sim-Z-post-blue-w22.html  (md5 555a8df1591fb31b2f1384755afb8b4d)
# Out: download/Football-Sim-Z-post-blue-w23.html
# Every replacement is asserted; any mismatch aborts with no output written.
import sys, hashlib

SRC = '/home/z/my-project/w22.html'
DST = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html'

src = open(SRC, encoding='utf-8').read()
md5_in = hashlib.md5(src.encode()).hexdigest()
assert md5_in == '555a8df1591fb31b2f1384755afb8b4d', 'input md5 mismatch: ' + md5_in

R = []  # (old, new, expected_count, label)

# ---------- P1 · Homepage dropdown: sort teams by city/place name (Owner) ----------
R.append((
 "const TEAMS = Object.keys(TEAM_DATA);",
 "const TEAMS = Object.keys(TEAM_DATA).sort((a,b)=>a.localeCompare(b)); // w23 (Owner): the dropdown reads in city order",
 1, 'P1 TEAMS sort'))

# ---------- P2a · Deterministic draft startup (GPT T9 / roq / UK Fix 1) ----------
R.append((
""" // W14 gate (restored) + W15 self-healing: the CPU draft starts exactly when DRAFT begins to fade —
 // and a watchdog guarantees it can never silently stall (throttled timers, stuck overlay, thrown render)
 const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; zpbStopDraftWatchdog(); try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); } };
 window._zpbWelFade = zpbKick;
 try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(zpbKick); else zpbKick(); }catch(err){ zpbKick(); }
 zpbStartDraftWatchdog();""",
""" // W23: the draft engine starts on its own engine-owned timer, never behind the welcome cinematic —
 // a hidden tab, a throttled animation or a slow machine can no longer delay or stall the CPU draft.
 // The cinematic is decoration only; the watchdog stays as the belt-and-braces backstop.
 const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; zpbStopDraftWatchdog(); try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); } };
 window._zpbWelFade = zpbKick;
 setTimeout(zpbKick, 350);
 try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(()=>{}); }catch(err){}
 zpbStartDraftWatchdog();""",
 1, 'P2a engine-owned kick'))

# ---------- P2b · Watchdog: force-close a stuck cinematic after 6 s; catch post-kick stalls ----------
R.append((
"""   if(window._zpbKickStarted || typeof draftSim==='undefined' || !draftSim){ zpbStopDraftWatchdog(); return; }
   const cine = document.querySelector('.zpb-fin-welcome');
   if(cine){ if(Date.now()-t0 > 25000){ try{ cine.remove(); }catch(e){} } else return; } // a stuck cinematic is force-closed after 25 s
   if(ticks < 2) return; // give the normal gate a beat before stepping in
   if(draftSim.pos===0 && !draftSim.log.length && !draftSim.awaitingUser){
    window._zpbKickStarted = true; zpbStopDraftWatchdog();
    try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); }
   } else zpbStopDraftWatchdog();""",
"""   if(typeof draftSim==='undefined' || !draftSim){ zpbStopDraftWatchdog(); return; }
   const cine = document.querySelector('.zpb-fin-welcome');
   if(cine){ if(Date.now()-t0 > 6000){ try{ cine.remove(); }catch(e){} } else if(ticks < 6) return; } // a stuck cinematic is force-closed after 6 s (w23, was 25 s)
   if(ticks < 5) return; // give the engine-owned kick a beat before stepping in (w23)
   if(draftSim.pos===0 && !draftSim.log.length && !draftSim.awaitingUser){
    zpbStopDraftWatchdog();
    try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); }
   } else zpbStopDraftWatchdog();""",
 1, 'P2b watchdog tightening'))

# ---------- P2c · Prefetch all CPU front-office judgments at draft start (GPT T5) ----------
R.append((
"""  order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false
 };
 if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }""",
"""  order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false
 };
 // W23: pre-roll every front office's judgment at draft start. Hypothetical forecasts (Priority / Gone)
 // now READ these preferences without ever writing to the live draft, so a forecast can no longer
 // shape real CPU behavior (audit GPT-T5).
 draftSim.bias = {}; draftSim.noiseSd = {}; draftSim.missP = {};
 for(let pi=0;pi<32;pi++){
  draftSim.bias[pi] = {};
  WV_GROUPS.forEach(g=>{ draftSim.bias[pi][g] = Math.random()<0.33 ? 0.003+Math.random()*0.03 : Math.random()<0.35 ? 5+Math.random()*8 : Math.exp(0.5*randNormal()); });
  draftSim.noiseSd[pi] = 0.1 + Math.pow(Math.random(),1.0)*4.0;
  draftSim.missP[pi] = Math.pow(Math.random(),0.9)*0.95;
 }
 if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }""",
 1, 'P2c prefs prefetch'))

# ---------- P3 · CPU preference access: forecasts read live prefs, never write them (GPT T5) ----------
R.append((
"""function cpuBias(teamIndex, group){
 draftSim.bias = draftSim.bias || {};
 const b = draftSim.bias[teamIndex] = draftSim.bias[teamIndex] || {};
 if(b[group]==null) b[group] = Math.random()<0.33 ? 0.003+Math.random()*0.03 : Math.random()<0.35 ? 5+Math.random()*8 : Math.exp(0.5*randNormal());   // each front office hyper-values some groups and nearly ignores others
 return b[group];
}
// every front office has its own judgment: some draft close to the board, some reach and miss, which spreads the 32 rosters
function cpuNoise(teamIndex){ draftSim.noiseSd = draftSim.noiseSd || {}; if(draftSim.noiseSd[teamIndex]==null) draftSim.noiseSd[teamIndex] = 0.1 + Math.pow(Math.random(),1.0)*4.0; return draftSim.noiseSd[teamIndex]; }
function cpuMiss(teamIndex){ draftSim.missP = draftSim.missP || {}; if(draftSim.missP[teamIndex]==null) draftSim.missP[teamIndex] = Math.pow(Math.random(),0.9)*0.95; return draftSim.missP[teamIndex]; }""",
"""// W23: each helper takes the draft state it acts on. Live picks create preferences on the live draft;
// hypothetical forecasts read the live franchise preferences (pre-rolled at startDraft2) and, if one is
// missing, keep the temporary value on the simulated state instead of writing to the live draft.
function cpuBias(teamIndex, group, st){
 const host = (st && st !== draftSim) ? st : draftSim;
 if(host !== draftSim && draftSim.bias && draftSim.bias[teamIndex] && draftSim.bias[teamIndex][group]!=null) return draftSim.bias[teamIndex][group]; // forecasts read, never write (w23)
 host.bias = host.bias || {};
 const b = host.bias[teamIndex] = host.bias[teamIndex] || {};
 if(b[group]==null) b[group] = Math.random()<0.33 ? 0.003+Math.random()*0.03 : Math.random()<0.35 ? 5+Math.random()*8 : Math.exp(0.5*randNormal());   // each front office hyper-values some groups and nearly ignores others
 return b[group];
}
// every front office has its own judgment: some draft close to the board, some reach and miss, which spreads the 32 rosters
function cpuNoise(teamIndex, st){
 const host = (st && st !== draftSim) ? st : draftSim;
 if(host !== draftSim && draftSim.noiseSd && draftSim.noiseSd[teamIndex]!=null) return draftSim.noiseSd[teamIndex];
 host.noiseSd = host.noiseSd || {};
 if(host.noiseSd[teamIndex]==null) host.noiseSd[teamIndex] = 0.1 + Math.pow(Math.random(),1.0)*4.0;
 return host.noiseSd[teamIndex];
}
function cpuMiss(teamIndex, st){
 const host = (st && st !== draftSim) ? st : draftSim;
 if(host !== draftSim && draftSim.missP && draftSim.missP[teamIndex]!=null) return draftSim.missP[teamIndex];
 host.missP = host.missP || {};
 if(host.missP[teamIndex]==null) host.missP[teamIndex] = Math.pow(Math.random(),0.9)*0.95;
 return host.missP[teamIndex];
}""",
 1, 'P3 pref isolation'))

R.append(("  const nz = Math.max(0.02, 1 + cpuNoise(teamIndex)*randNormal());",
          "  const nz = Math.max(0.02, 1 + cpuNoise(teamIndex, st)*randNormal());", 1, 'P3 cpuNoise st'))
R.append(("   const v = w*cpuBias(teamIndex, g)*nz + 0.002*p[3];",
          "   const v = w*cpuBias(teamIndex, g, st)*nz + 0.002*p[3];", 1, 'P3 cpuBias st'))
R.append((" if(cands.length>8 && Math.random() < cpuMiss(teamIndex)){",
          " if(cands.length>8 && Math.random() < cpuMiss(teamIndex, st)){", 1, 'P3 cpuMiss st'))

# ---------- P4 · executePick: transactional, validated (GPT T2) ----------
R.append((
"""function executePick(teamIndex, player, slot){
 const idx = draftSim.pool.findIndex(p=>p[0]===player[0]);
 if(idx>-1) draftSim.pool.splice(idx,1);
 const round = Math.floor(draftSim.pos/32)+1;
 draftSim.rosters[teamIndex].slots[slot] = player;
 draftSim.rosters[teamIndex].pickRounds = draftSim.rosters[teamIndex].pickRounds || {};
 draftSim.rosters[teamIndex].pickRounds[slot] = round;
 draftSim.log.push({round, pickInRound:(draftSim.pos%32)+1, overall:draftSim.pos+1, teamIndex, isUser:teamIndex===draftSim.userIndex, player, slot});
 draftSim.pos++;
}""",
"""// W23 (audit GPT-T2): fully validated before any mutation — a rejected pick leaves every bit of
// state untouched. Player identity is the pool object itself, never the name string.
function executePick(teamIndex, player, slot){
 const S = draftSim;
 if(!S || !S.order) throw new Error('no active draft');
 if(S.pos >= S.order.length) throw new Error('draft is complete');
 if(S.order[S.pos] !== teamIndex) throw new Error('team ' + teamIndex + ' is out of turn at pick ' + (S.pos+1));
 if(!player) throw new Error('no player given');
 if(S.pool.indexOf(player) === -1) throw new Error((player[0]||'?') + ' is not in the pool');
 if(!slot || ROSTER_SLOTS.indexOf(slot) === -1) throw new Error('unknown slot ' + slot);
 const roster = S.rosters[teamIndex];
 if(!roster) throw new Error('no roster for team ' + teamIndex);
 if(roster.slots[slot]) throw new Error(slot + ' is already filled');
 const fits = (POS_SLOT_MAP[player[1]] || []).indexOf(slot) > -1 ||
  !S.pool.some(p=>(POS_SLOT_MAP[p[1]]||[]).some(sl=>!roster.slots[sl])); // emergency: nothing legal left anywhere
 if(!fits) throw new Error((player[1]||'?') + ' cannot legally fill ' + slot);
 const idx = S.pool.indexOf(player);
 if(idx>-1) S.pool.splice(idx,1);
 const round = Math.floor(S.pos/32)+1;
 roster.slots[slot] = player;
 roster.pickRounds = roster.pickRounds || {};
 roster.pickRounds[slot] = round;
 S.log.push({round, pickInRound:(S.pos%32)+1, overall:S.pos+1, teamIndex, isUser:teamIndex===S.userIndex, player, slot});
 S.pos++;
}""",
 1, 'P4 executePick transactional'))

# ---------- P5 · Fault system + guarded CPU pick + hardened processUntilUserTurn (GPT T3) ----------
R.append((
"""function processUntilUserTurn(){
 if(draftSpeed==='slow'){ stepSlow(); return; }
 while(draftSim.pos < draftSim.order.length){
  const t = draftSim.order[draftSim.pos];
  if(t === draftSim.userIndex){
   const roster = draftSim.rosters[t];
   if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
   if(userIsStuck()){ finishDraft2(); return; }
   draftSim.awaitingUser = true;
   renderDraftLive();
   return;
  }
  const pk = cpuPick(t);
  if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
 }
 draftSim.awaitingUser = false;
 finishDraft2();
}""",
"""// W23 (audit GPT-T3): a failed pick never advances the board. The loop stops, reports the team,
// round and reason, and one controlled retry runs only because executePick is transactional
// (a rejected pick leaves the state exactly as it was, so a retry cannot double-pick).
function zpbDraftFault(sub, teamIndex, err){
 const S = draftSim; if(!S) return;
 S._fault = {sub, teamIndex, pos:S.pos, msg:String(err && err.message || err)};
 try{ console.error('Z-post-blue draft paused [' + sub + '] ' + (S.teamNames ? S.teamNames[teamIndex] : ('team ' + teamIndex)) + ' at pick ' + (S.pos+1) + ': ' + S._fault.msg); }catch(e){}
 try{
  const feed = document.getElementById('draftRecentPicks');
  if(feed && !String(feed.innerHTML).includes('draft engine paused'))
   feed.innerHTML = '<div class="narr">The draft engine paused at pick ' + (S.pos+1) + ' (' + S._fault.msg + ') — resuming\u2026</div>' + feed.innerHTML;
 }catch(e){}
 if(!S._faultRetry){ S._faultRetry = setTimeout(()=>{ S._faultRetry = null; try{ processUntilUserTurn(); }catch(e){} }, 1200); }
}
// One CPU pick, fully guarded. Returns true when the board advanced (or legitimately skipped), false when the loop must stop.
function executeCpuPickSafely(teamIndex){
 const S = draftSim;
 let pk = null;
 try{ pk = cpuPick(teamIndex); }
 catch(err){ zpbDraftFault('cpuPick', teamIndex, err); return false; }
 if(pk && pk.slot){
  try{ executePick(teamIndex, pk.player, pk.slot); S._fault = null; return true; }
  catch(err){
   // the suggested pick was rejected (transactional): take the best legal fill instead, else stop cleanly
   try{
    const roster = S.rosters[teamIndex];
    const alt = S.pool.find(p=>(eligibleOpen(roster, p)||[]).length);
    if(alt){ const s = eligibleOpen(roster, alt)[0]; executePick(teamIndex, alt, s); S._fault = null; return true; }
   }catch(e2){}
   zpbDraftFault('executePick', teamIndex, err); return false;
  }
 }
 const roster = S.rosters[teamIndex];
 if(!S.pool.length || firstOpenSlotAny(roster)===null){ S.pos++; return true; } // nothing left to fill: a legitimate skip
 zpbDraftFault('cpuPick', teamIndex, new Error('no pick chosen with open slots remaining')); return false;
}
function processUntilUserTurn(){
 if(draftSpeed==='slow'){ stepSlow(); return; }
 if(!draftSim || !draftSim.order || !draftSim.order.length) return;
 let guard = 0; const maxIter = draftSim.order.length + 8; // hard stop against any hypothetical loop
 while(draftSim.pos < draftSim.order.length && guard < maxIter){
  guard++;
  const t = draftSim.order[draftSim.pos];
  if(t === draftSim.userIndex){
   const roster = draftSim.rosters[t];
   if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
   if(userIsStuck()){ finishDraft2(); return; }
   draftSim.awaitingUser = true;
   try{ renderDraftLive(); }catch(e){ try{ zpbFallbackBoard(e); }catch(e2){} }
   return;
  }
  if(!executeCpuPickSafely(t)) return;
 }
 if(draftSim.pos >= draftSim.order.length){ draftSim.awaitingUser = false; finishDraft2(); }
}""",
 1, 'P5 processUntilUserTurn + fault system'))

# ---------- P6 · stepSlow: same guard, no pos++ on errors ----------
R.append((
"""  draftSim.awaitingUser = false;
  const pk = cpuPick(t);
  if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
  draftSim._errs = 0;
 }catch(err){
  draftSim._errs = (draftSim._errs||0)+1;
  try{ console.warn('draft tick error', err); }catch(e){}
  if(draftSim._errs >= 3) draftSim.pos++; // one bad pick never freezes the whole draft
 }""",
"""  draftSim.awaitingUser = false;
  if(!executeCpuPickSafely(t)){ slowTimer = setTimeout(stepSlow, 2000); return; } // w23: fault — report, wait, retry; never skip a team
 }catch(err){
  zpbDraftFault('stepSlow', draftSim && draftSim.order ? draftSim.order[draftSim.pos] : -1, err);
 }""",
 1, 'P6 stepSlow hardening'))

# ---------- P7 · simToEnd: same guard ----------
R.append((
"""function simToEnd(){
 if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }
 while(draftSim.pos < draftSim.order.length){
  const t = draftSim.order[draftSim.pos];
  const pk = cpuPick(t);
  if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
 }
 draftSim.awaitingUser = false;
 finishDraft2();
}""",
"""function simToEnd(){
 if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }
 let guard = 0; const maxIter = draftSim.order.length + 8;
 while(draftSim.pos < draftSim.order.length && guard < maxIter){
  guard++;
  const t = draftSim.order[draftSim.pos];
  if(!executeCpuPickSafely(t)) return; // w23: stop and report; never skip a team to recover
 }
 draftSim.awaitingUser = false;
 finishDraft2();
}""",
 1, 'P7 simToEnd hardening'))

# ---------- P8 · renderDraftLive: roster render failure logged ----------
R.append((
""" try{ renderDraftBoard2(); }catch(err){ try{ zpbFallbackBoard(err); }catch(e2){} }
 try{ renderDraftRoster2(); }catch(err){}""",
""" try{ renderDraftBoard2(); }catch(err){ try{ zpbFallbackBoard(err); }catch(e2){} }
 try{ renderDraftRoster2(); }catch(err){ zpbErr('renderRoster2', err); } // w23: logged, and the board still stands""",
 1, 'P8 renderDraftLive logging'))

# ---------- P9/P10 · zpbErr helper + fallback board with Wins column (roq) ----------
R.append((
"""function zpbFallbackBoard(err){
 try{
  const S = draftSim; if(!S) return;
  const roster = S.rosters[S.userIndex];
  const rows = S.pool.slice(0,60).map(p=>{
   const slot = findAssignableSlot(roster, p[1]);
   const btn = slot ? `<button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${p[0].replace(/"/g,'&quot;')}" data-slot="${slot}">Draft</button>` : '';
   return `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(p[2]):''}"><td class="dc-name">${p[0]}</td><td data-label="Pos">${POS_DISPLAY[p[1]]||p[1]}</td><td data-label="Team">${TEAM_ABBR[p[2]]||p[2]}</td><td class="score dc-ovr" data-label="OVR">${p[3]}</td><td class="narr" colspan="4">${slot?('Fills '+(LABELS[slot]||slot)):''}</td><td class="dc-btn">${btn}</td></tr>`;
  }).join('');
  document.getElementById('draftBody2').innerHTML = rows || '<tr><td colspan="10" class="narr">No players match.</td></tr>';
 }catch(e){}
}""",
"""// w23: minimal error reporter — details in the console, never a silent empty section (audit GPT-T8)
function zpbErr(scope, err){ try{ console.warn('[zpb:' + scope + ']', err && err.message || err); }catch(e){} }
function zpbFallbackBoard(err){
 try{ console.warn('draft board fallback:', err && err.message || err); }catch(e){}
 try{
  const S = draftSim; if(!S) return;
  const roster = S.rosters[S.userIndex];
  const rows = S.pool.slice(0,60).map(p=>{
   const slot = findAssignableSlot(roster, p[1]);
   const btn = slot ? `<button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${p[0].replace(/"/g,'&quot;')}" data-slot="${slot}">Draft</button>` : '';
   return `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(p[2]):''}"><td class="dc-name">${p[0]}</td><td data-label="Pos">${POS_DISPLAY[p[1]]||p[1]}</td><td data-label="Team">${TEAM_ABBR[p[2]]||p[2]}</td><td class="score dc-ovr" data-label="OVR">${p[3]}</td><td class="score dc-wins" data-label="Wins">${fmtWar(playerWar(p).war)}</td><td class="narr" colspan="3">${slot?('Fills '+(LABELS[slot]||slot)):''}</td><td class="dc-btn">${btn}</td></tr>`;
  }).join('');
  document.getElementById('draftBody2').innerHTML = rows || '<tr><td colspan="10" class="narr">No players match.</td></tr>';
 }catch(e){ zpbErr('fallbackBoard', e); }
}""",
 1, 'P10 fallback board + zpbErr'))

# ---------- P11 · boardEntries: a failed forecast degrades, never kills the board ----------
R.append((
"""function boardEntries(){
 const S = draftSim, roster = S.rosters[S.userIndex];
 const sim = simRecs(); // w19 (Owner): priority and gone live from the first render, not just on your turn""",
"""function boardEntries(){
 const S = draftSim, roster = S.rosters[S.userIndex];
 let sim = null; // w23: a failed forecast degrades to Wins-only — the board itself must never die
 try{ sim = simRecs(); }catch(err){ zpbErr('simRecs', err); }""",
 1, 'P11 boardEntries guard'))

# ---------- P12 · simRecs: correct hypothetical rounds (T4) + cache signature (T6) ----------
R.append((
""" if(draftUI.sim && draftUI.sim.pos===S.pos) return draftUI.sim;
 const me = S.userIndex, roster = S.rosters[me];""",
""" const sig = S.pool.length+'|'+S.log.length+'|'+Object.keys(S.rosters[S.userIndex].slots).length; // w23 (audit GPT-T6): invalidate on any state change, not just the pick index
 if(draftUI.sim && draftUI.sim.pos===S.pos && draftUI.sim.sig===sig) return draftUI.sim;
 const me = S.userIndex, roster = S.rosters[me];""",
 1, 'P12a cache signature'))
R.append((
"""   const sim = {pool:S.pool.slice(), rosters:S.rosters.map(r=>({slots:Object.assign({},r.slots)})), repl:null};
   for(let i=S.pos+1;i<nextIdx;i++){
    const ti = S.order[i], pk = cpuPick(ti, sim);""",
"""   const sim = {pool:S.pool.slice(), rosters:S.rosters.map(r=>({slots:Object.assign({},r.slots)})), repl:null, pos:S.pos};
   for(let i=S.pos+1;i<nextIdx;i++){
    const ti = S.order[i]; sim.pos = i; const pk = cpuPick(ti, sim); // w23 (audit GPT-T4): every hypothetical pick sits at its real board position, so round-order floors apply""",
 1, 'P12b sim.pos fix'))
R.append((
""" return (draftUI.sim = {pos:S.pos, trials, c0, fm, later, gap: nextIdx>0 ? nextIdx-S.pos-1 : 0});""",
""" return (draftUI.sim = {pos:S.pos, sig, trials, c0, fm, later, gap: nextIdx>0 ? nextIdx-S.pos-1 : 0});""",
 1, 'P12c sim sig stored'))

# ---------- P13 · makeUserPick2: turn ownership + guaranteed refresh (GPT T1 / roq) ----------
R.append((
"""function makeUserPick2(name, slotWanted){
 const roster = draftSim.rosters[draftSim.userIndex];
 const p = draftSim.pool.find(x=>x[0]===name);
 if(!p) return;
 let slot = slotWanted && !roster.slots[slotWanted] && eligibleOpen(roster, p).includes(slotWanted) ? slotWanted : null;
 if(!slot){ const f = userFits(roster,p).sort((a,b)=>b.v-a.v)[0]; slot = f ? f.slot : slotForUser(roster,p); }
 if(!slot) return;
 draftSim.undoStack = draftSim.undoStack || [];
 draftSim.undoStack.push({pos:draftSim.pos, pool:draftSim.pool.slice(), slots:draftSim.rosters.map(r=>({...r.slots})), rounds:draftSim.rosters.map(r=>({...(r.pickRounds||{})})), logLen:draftSim.log.length});
 executePick(draftSim.userIndex, p, slot);
 processUntilUserTurn();
}""",
"""function makeUserPick2(name, slotWanted){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.order) return;
 // w23 (audit GPT-T1): a selection is only accepted when the board is actually waiting on the user
 if(!draftSim.awaitingUser || draftSim.order[draftSim.pos] !== draftSim.userIndex){
  try{ if(typeof FX!=='undefined' && FX.toast && !draftSim._turnToast){ draftSim._turnToast = true; FX.toast('The CPU is picking \u2014 your board lights up when it is your turn'); setTimeout(()=>{ if(draftSim) draftSim._turnToast = false; }, 1500); } }catch(e){}
  return;
 }
 const roster = draftSim.rosters[draftSim.userIndex];
 const p = draftSim.pool.find(x=>x[0]===name);
 if(!p) return;
 let slot = slotWanted && !roster.slots[slotWanted] && eligibleOpen(roster, p).includes(slotWanted) ? slotWanted : null;
 if(!slot){ const f = userFits(roster,p).sort((a,b)=>b.v-a.v)[0]; slot = f ? f.slot : slotForUser(roster,p); }
 if(!slot) return;
 draftSim.undoStack = draftSim.undoStack || [];
 draftSim.undoStack.push({pos:draftSim.pos, pool:draftSim.pool.slice(), slots:draftSim.rosters.map(r=>({...r.slots})), rounds:draftSim.rosters.map(r=>({...(r.pickRounds||{})})), logLen:draftSim.log.length});
 try{ executePick(draftSim.userIndex, p, slot); }
 catch(err){ // transactional rejection: state untouched — drop the undo snapshot, tell the user, redraw
  draftSim.undoStack.pop();
  try{ if(typeof FX!=='undefined' && FX.toast) FX.toast('That pick is no longer legal \u2014 the board was refreshed'); }catch(e){}
  zpbErr('userPick', err);
  try{ renderDraftLive(); }catch(e2){ try{ zpbFallbackBoard(err); }catch(e3){} }
  return;
 }
 draftSim.awaitingUser = false;
 try{ renderDraftLive(); }catch(e){ try{ zpbFallbackBoard(e); }catch(e2){} } // w23: the depth chart and board always refresh, even if the CPU resume hiccups
 try{ processUntilUserTurn(); }catch(err){ zpbDraftFault('resume', draftSim.userIndex, err); }
}""",
 1, 'P13 makeUserPick2'))

# ---------- P14 · STATIC_SLOTS: FB and P exist (roq) ----------
R.append((
""" CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'], K:['K']};""",
""" CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'], K:['K'], P:['P'], FB:['FB']}; // w23: FB and P are real roster spots — their wins were always 0.00 by omission""",
 1, 'P14 STATIC_SLOTS FB/P'))

# ---------- P15 · SLOT_FAMILY: complete the map ----------
R.append((
"""const SLOT_FAMILY = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'WILL',SAM:'SAM',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',K:'K'};""",
"""const SLOT_FAMILY = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'WILL',SAM:'SAM',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',K:'K',P:'P',FB:'FB'}; // w23: FB/P complete the family map""",
 1, 'P15 SLOT_FAMILY FB/P'))

# ---------- P16 · setActiveTab: logged failures, rankings re-init, born-visible view ----------
R.append((
"""function setActiveTab(viewId, btnId){
 // resilience: a throw in any helper must never leave the user stuck on the wrong view
 try{ { const h = document.getElementById('suppHead'), t = SUPP_TITLES[btnId]; if(h){ if(t){ h.style.display=''; h.innerHTML = `<h2>${t[0]}</h2><p class="narr">${t[1]}</p>`;  } else { h.style.display='none'; h.innerHTML=''; } } const _zh=document.querySelector('.hero'); if(_zh) _zh.style.display = t ? 'none' : ''; window.scrollTo(0,0); } }catch(e){}
 try{ updateStepper(); }catch(e){}
 try{
  ['viewRankings','viewPlayers','viewGroups','viewCompare','viewDraft','viewGuide'].forEach(v=>{ const el=document.getElementById(v); if(el) el.classList.toggle('active', v===viewId); });
  ['tabRankingsBtn','tabPlayersBtn','tabGroupsBtn','tabCompareBtn','tabDraftBtn','tabGuideBtn'].forEach(b=>{ const el=document.getElementById(b); if(el) el.classList.toggle('active', b===btnId); });
 }catch(e){}
 try{ if(viewId==='viewRankings'){ const _rb=document.getElementById('resultsBody'); if(_rb && !_rb.children.length) render(); } }catch(e){}
 try{ if(btnId==='tabCompareBtn') renderHomeComparison(); }catch(e){}
 try{ if(btnId==='tabGuideBtn') document.getElementById('guideBody').innerHTML = guideHTMLCached(); }catch(e){}
 try{ if(btnId==='tabDraftBtn') fillDraftGuide(); }catch(e){}
 try{ if(typeof zpbSyncHome==='function') zpbSyncHome(); }catch(e){}
 try{ if(typeof zpbFadeScan==='function') zpbFadeScan(); }catch(e){}
}""",
"""function setActiveTab(viewId, btnId){
 // resilience: a throw in any helper must never leave the user stuck on the wrong view (w23: failures are logged, never silent)
 try{ { const h = document.getElementById('suppHead'), t = SUPP_TITLES[btnId]; if(h){ if(t){ h.style.display=''; h.innerHTML = `<h2>${t[0]}</h2><p class="narr">${t[1]}</p>`;  } else { h.style.display='none'; h.innerHTML=''; } } const _zh=document.querySelector('.hero'); if(_zh) _zh.style.display = t ? 'none' : ''; window.scrollTo(0,0); } }catch(e){ zpbErr('tabHead', e); }
 try{ updateStepper(); }catch(e){ zpbErr('tabStepper', e); }
 try{
  ['viewRankings','viewPlayers','viewGroups','viewCompare','viewDraft','viewGuide'].forEach(v=>{ const el=document.getElementById(v); if(el) el.classList.toggle('active', v===viewId); });
  ['tabRankingsBtn','tabPlayersBtn','tabGroupsBtn','tabCompareBtn','tabDraftBtn','tabGuideBtn'].forEach(b=>{ const el=document.getElementById(b); if(el) el.classList.toggle('active', b===btnId); });
 }catch(e){ zpbErr('tabToggle', e); }
 try{ if(viewId==='viewRankings'){ const _rb=document.getElementById('resultsBody'); if(_rb && !_rb.children.length) render(); } }catch(e){ zpbErr('tabRankings', e); }
 try{ if(btnId==='tabCompareBtn') renderHomeComparison(); }catch(e){ zpbErr('tabCompare', e); }
 try{ if(btnId==='tabGuideBtn') document.getElementById('guideBody').innerHTML = guideHTMLCached(); }catch(e){ zpbErr('tabGuide', e); }
 try{ if(btnId==='tabDraftBtn') fillDraftGuide(); }catch(e){ zpbErr('tabDraftGuide', e); }
 try{ if(btnId==='tabGroupsBtn'){ zpbInitRankingsUI(); const _gb=document.getElementById('groupBody'); if(_gb && !_gb.childElementCount) zpbRenderRankings(); } }catch(e){ zpbErr('tabGroups', e); } // w23: position rankings rebuild on open if empty
 try{ if(typeof zpbSyncHome==='function') zpbSyncHome(); }catch(e){ zpbErr('tabSyncHome', e); }
 try{ if(typeof zpbFadeScan==='function') zpbFadeScan(); }catch(e){ zpbErr('tabFadeScan', e); }
 try{ const _av=document.getElementById(viewId); if(_av) _av.querySelectorAll('.zpb-fade').forEach(el=>el.classList.add('zpb-fade-in')); }catch(e){ zpbErr('tabReveal', e); } // w23: a view must never open blank
}""",
 1, 'P16 setActiveTab hardened'))

# ---------- P17 · zpbFadeScan: content born visible (roq root cause 1) ----------
R.append((
"""  if(el.dataset.zpbfade) return;
  el.dataset.zpbfade = '1';
  el.classList.add('zpb-fade');
  zpbFadeIO.observe(el);""",
"""  if(el.dataset.zpbfade) return;
  el.dataset.zpbfade = '1';
  el.classList.add('zpb-fade');
  el.classList.add('zpb-fade-in'); // w23: content is born visible — the observer only fades per scroll from here on
  zpbFadeIO.observe(el);""",
 1, 'P17 fade born-visible'))

# ---------- P18 · CSS: fade durations 2s/4.2s → 0.7s ----------
R.append((
 ".zpb-fade{opacity:0;transform:translateY(26px);transition:opacity 2s ease,transform 2s ease;}",
 ".zpb-fade{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease;}",
 1, 'P18a fade css 0.7s'))
R.append((
 ".zpb-fade{transition-duration:4.2s !important;}",
 ".zpb-fade{transition-duration:.7s !important;}",
 1, 'P18b fade css !important 0.7s'))
R.append((
 ".zpb-guidefade{transition-duration:4.2s !important;}",
 ".zpb-guidefade{transition-duration:.7s !important;}",
 1, 'P18c guidefade css 0.7s'))

# ---------- P19 · T17: remove the overly broad mobile attribute rule ----------
R.append((
""" [style*="grid-template-columns"]{grid-template-columns:1fr !important;}
 [style*="white-space:nowrap"]{white-space:normal !important;}""",
""" [style*="white-space:nowrap"]{white-space:normal !important;} // w23 (audit GPT-T17): the broad grid attribute rule is gone — every real two/three-column block carries .draft-columns, which stacks at its own breakpoint""",
 1, 'P19 narrow mobile css'))

# ---------- P20 · goSeason: no hardcoded 32*26 ----------
R.append((
""" if(draftSim && draftSim.pos >= 32*26){""",
""" if(draftSim && draftSim.pos >= draftSim.order.length){ // w23: no hardcoded 32*26 — the board is 28 rounds""",
 1, 'P20a goSeason gate'))
R.append((
"""${(draftSim && draftSim.pos < 32*26) ? '<button class="tabbtn" id="goDraftResumeBtn">Continue draft in progress</button>' : ''}""",
"""${(draftSim && draftSim.pos < draftSim.order.length) ? '<button class="tabbtn" id="goDraftResumeBtn">Continue draft in progress</button>' : ''}""",
 1, 'P20b goSeason resume gate'))

# ---------- P21 · zpbInitRankingsUI: report, never silently blank ----------
R.append((
"""  zpbSyncRankingsUI();
  zpbRenderRankings();
 }catch(e){}
}""",
"""  zpbSyncRankingsUI();
  zpbRenderRankings();
 }catch(e){ zpbErr('initRankingsUI', e); } // w23: a failed rankings init is reported, never silently blank
}""",
 1, 'P21 rankings init logging'))

# ---------- P22 · undoUserPick: recommendations recompute (GPT T6) ----------
R.append((
""" draftSim.log.length = u.logLen; draftSim.repl = null; draftSim.awaitingUser = true;""",
""" draftSim.log.length = u.logLen; draftSim.repl = null; draftSim.awaitingUser = true;
 draftUI.sim = null; // w23 (audit GPT-T6): recommendations recompute against the restored state""",
 1, 'P22 undo cache invalidation'))

# ---------- apply ----------
applied = 0
for old, new, cnt, label in R:
    n = src.count(old)
    assert n == cnt, f'[{label}] expected {cnt} occurrence(s), found {n}'
    src = src.replace(old, new)
    applied += 1
    print(f'  ok  {label}')

open(DST, 'w', encoding='utf-8').write(src)
md5_out = hashlib.md5(src.encode()).hexdigest()
print(f'applied {applied}/{len(R)} replacements')
print('IN :', md5_in, f'({len(src):,} bytes in)')
print('OUT:', DST)
print('MD5:', md5_out, f'({len(src):,} bytes)')
