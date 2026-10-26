SPEAKER: UK | ROLE: Council Advisor | TASK: Z-Post-Blue w21 Critical Bug Fixes | DATE: 2026-10-26T22:57Z

FOR: Z-Post-Blue (Football-Sim-Z-post-blue-w21.html on council/zai)

## BUGS REPORTED BY OWNER

1. **Draft Board Broken**:
   - Priority and WINS numbers disappeared
   - CPU doesn't start drafting until user's first selection (even at pick 1.32)
   - After user selects players, they're not added to depth chart
   - CPU doesn't start drafting after user picks

2. **Missing Views**:
   - Madden Rankings (viewRankings) not appearing
   - Position Rankings (viewGroups) not appearing
   - Guide (viewGuide) not appearing

---

## ROOT CAUSE ANALYSIS

### Bug 1: Draft Board - CPU Not Starting

**Location:** `startDraft2` (line 4988) → `zpbKick` (line 5033) → `processUntilUserTurn` (line 5080)

**Problem:** The welcome cinematic (`zpbWelcomeCine`) calls `done()` callback via `fire()` which uses `setTimeout(done, 0)`. However, `zpbWelcomeCine` ALSO calls `fire()` at the START (line 10681), which means `zpbKick` is called BEFORE the cinematic renders. But `zpbKick` checks `window._zpbKickStarted` and returns early if already started.

The watchdog (`zpbStartDraftWatchdog`) waits 3 seconds (2 ticks × 1500ms) before checking if draft needs kicking. But it only kicks if `draftSim.pos===0 && !draftSim.log.length && !draftSim.awaitingUser`.

**Critical Issue:** If `processUntilUserTurn` throws an error during the initial CPU picks (31 picks for pick 1.32), the watchdog's `zpbDraftRecover` tries to call `processUntilUserTurn` again, but the error might persist.

**Likely Error in `processUntilUserTurn`:** The while loop runs `cpuPick(t)` for each CPU team. If `cpuPick` or `executePick` fails, the loop breaks and `draftSim.awaitingUser` might be left in wrong state.

### Bug 2: Priority/WINS Numbers Missing

**Location:** `renderDraftBoard2` (line 5257) → `boardEntries` (line 5176) → `mkEntry` (line 5217)

**Problem:** The `boardEntries` function calls `simRecs()` which does Monte Carlo simulation (12 trials). If this throws, the whole board fails. Also, `simRecs` caches results in `draftUI.sim` keyed by `draftSim.pos`. If the draft position advances but cache isn't invalidated properly, stale data shows.

**Key Issue:** `simRecs` creates a deep copy of rosters and pool for each trial. With 1200 players and 32 teams, this is expensive and might hit call stack limits or timeout.

### Bug 3: User Pick Not Added to Depth Chart

**Location:** `makeUserPick2` (line 5406) → `executePick` 

**Problem:** `makeUserPick2` calls `executePick` then `processUntilUserTurn`. But if `executePick` fails silently or doesn't update `roster.slots`, the depth chart won't show the pick. Also, `renderDraftRoster2` might not be called after the pick.

### Bug 4: CPU Doesn't Draft After User Pick

**Location:** `makeUserPick2` → `processUntilUserTurn`

**Problem:** After user pick, `processUntilUserTurn` should run CPU picks until next user turn. But if the user has multiple picks in a row (unlikely in snake draft) or if `draftSim.pos` isn't advanced correctly, it might not run.

### Bug 5: Missing Views (Madden Rankings, Position Rankings, Guide)

**Location:** `setActiveTab` (line 2577) and view elements

**Problem:** The views exist in HTML (`viewRankings`, `viewGroups`, `viewGuide`) but:
1. `setActiveTab` might throw before toggling visibility
2. The render functions for each view might not be called
3. `viewRankings` calls `render()` only if `resultsBody` is empty (line 2592)
4. `viewGroups` calls `zpbInitRankingsUI()` (line 2570)
5. `viewGuide` calls `guideHTMLCached()` (line 2596)

**Likely Issue:** One of these helper functions throws an error, preventing the view from activating.

---

## EXACT FIXES

### Fix 1: Ensure Draft Starts Immediately (No Cinematic Blocking)

**File:** `Football-Sim-Z-post-blue-w21.html`
**Function:** `startDraft2` (around line 5033)

**Current Code:**
```javascript
const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; zpbStopDraftWatchdog(); try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); } };
window._zpbWelFade = zpbKick;
try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(zpbKick); else zpbKick(); }catch(err){ zpbKick(); }
zpbStartDraftWatchdog();
```

**Fixed Code:**
```javascript
const zpbKick = ()=>{ 
  if(window._zpbKickStarted) return; 
  window._zpbKickStarted = true; 
  zpbStopDraftWatchdog(); 
  try{ 
    // Ensure draftSim is valid before proceeding
    if(typeof draftSim==='undefined' || !draftSim || !draftSim.order || !draftSim.order.length) {
      console.warn('zpbKick: draftSim not ready');
      return;
    }
    processUntilUserTurn(); 
  }catch(err){ 
    console.error('zpbKick processUntilUserTurn failed:', err);
    zpbDraftRecover(err); 
  } 
};
window._zpbWelFade = zpbKick;

// ALWAYS kick the draft immediately, don't wait for cinematic
// The cinematic is visual only - CPU drafting must start NOW
try{ 
  zpbKick(); 
  if(typeof zpbWelcomeCine==='function') {
    // Pass a no-op since we already kicked
    zpbWelcomeCine(()=>{}); 
  }
}catch(err){ 
  console.error('startDraft2 kick failed:', err);
  zpbDraftRecover(err); 
}
zpbStartDraftWatchdog();
```

**Why:** The CPU draft must start immediately when the draft begins, not when the cinematic fades. The welcome cinematic is purely visual.

---

### Fix 2: Harden `processUntilUserTurn` Against Errors

**Function:** `processUntilUserTurn` (around line 5080)

**Current Code:** Has no try/catch inside the while loop.

**Fixed Code:**
```javascript
function processUntilUserTurn(){
  if(draftSpeed==='slow'){ stepSlow(); return; }
  
  // Safety: ensure draftSim exists
  if(typeof draftSim==='undefined' || !draftSim || !draftSim.order || !draftSim.order.length) {
    console.warn('processUntilUserTurn: draftSim not ready');
    return;
  }
  
  let safetyCounter = 0;
  const MAX_ITERATIONS = 1000; // Prevent infinite loop
  
  while(draftSim.pos < draftSim.order.length && safetyCounter < MAX_ITERATIONS){
    safetyCounter++;
    
    try {
      const t = draftSim.order[draftSim.pos];
      
      // Safety: check roster exists
      if(!draftSim.rosters || !draftSim.rosters[t]) {
        console.error('processUntilUserTurn: roster missing for team', t);
        draftSim.pos++;
        continue;
      }
      
      const roster = draftSim.rosters[t];
      
      if(t === draftSim.userIndex){
        if(firstOpenSlotAny(roster)===null){ 
          draftSim.pos++; 
          continue; 
        }
        if(userIsStuck()){ 
          finishDraft2(); 
          return; 
        }
        draftSim.awaitingUser = true;
        try{ renderDraftLive(); }catch(e){ console.warn('renderDraftLive failed:', e); }
        return;
      }
      
      // CPU pick with error handling
      let pk = null;
      try{
        pk = cpuPick(t);
      }catch(cpuErr){
        console.warn('cpuPick failed for team', t, cpuErr);
        // Fallback: pick best available player for any open slot
        pk = fallbackCpuPick(t);
      }
      
      if(pk && pk.slot && pk.player){
        try{
          executePick(t, pk.player, pk.slot);
        }catch(execErr){
          console.warn('executePick failed for team', t, execErr);
          draftSim.pos++; // Skip this pick to prevent infinite loop
        }
      } else {
        draftSim.pos++;
      }
    }catch(loopErr){
      console.error('processUntilUserTurn loop error:', loopErr);
      draftSim.pos++; // Advance to prevent infinite loop
    }
  }
  
  if(safetyCounter >= MAX_ITERATIONS){
    console.error('processUntilUserTurn: MAX_ITERATIONS reached, forcing finish');
  }
  
  draftSim.awaitingUser = false;
  finishDraft2();
}

// Fallback CPU pick when cpuPick fails
function fallbackCpuPick(teamIndex){
  try{
    const roster = draftSim.rosters[teamIndex];
    const pool = draftSim.pool;
    if(!pool.length) return null;
    
    // Simple heuristic: pick highest OVR player that fits any open slot
    for(const p of pool){
      const fits = eligibleOpen(roster, p);
      if(fits.length){
        return {player: p, slot: fits[0]};
      }
    }
    // Emergency: any player for any open slot
    const open = ROSTER_SLOTS.filter(s=>!roster.slots[s]);
    if(open.length && pool.length){
      return {player: pool[0], slot: open[0]};
    }
  }catch(e){
    console.warn('fallbackCpuPick failed:', e);
  }
  return null;
}
```

---

### Fix 3: Fix `makeUserPick2` to Properly Update Depth Chart

**Function:** `makeUserPick2` (around line 5406)

**Current Code:** Calls `executePick` then `processUntilUserTurn`

**Fixed Code:**
```javascript
function makeUserPick2(name, slotWanted){
  const roster = draftSim.rosters[draftSim.userIndex];
  const p = draftSim.pool.find(x=>x[0]===name);
  if(!p) return;
  
  let slot = slotWanted && !roster.slots[slotWanted] && eligibleOpen(roster, p).includes(slotWanted) ? slotWanted : null;
  if(!slot){ 
    const f = userFits(roster,p).sort((a,b)=>b.v-a.v)[0]; 
    slot = f ? f.slot : slotForUser(roster,p); 
  }
  if(!slot) return;
  
  draftSim.undoStack = draftSim.undoStack || [];
  draftSim.undoStack.push({
    pos:draftSim.pos, 
    pool:draftSim.pool.slice(), 
    slots:draftSim.rosters.map(r=>({...r.slots})), 
    rounds:draftSim.rosters.map(r=>({...(r.pickRounds||{})})), 
    logLen:draftSim.log.length
  });
  
  // Execute the pick
  try{
    executePick(draftSim.userIndex, p, slot);
  }catch(e){
    console.error('makeUserPick2 executePick failed:', e);
    return;
  }
  
  // CRITICAL: Force re-render of draft roster AND board after user pick
  try{ renderDraftRoster2(); }catch(e){ console.warn('renderDraftRoster2 failed:', e); }
  try{ renderDraftBoard2(); }catch(e){ console.warn('renderDraftBoard2 failed:', e); }
  
  // Continue CPU drafting
  try{ processUntilUserTurn(); }catch(e){ console.error('processUntilUserTurn after user pick failed:', e); }
}
```

---

### Fix 4: Fix `executePick` to Update Pick Rounds

**Function:** `executePick` (search for it)

Let me find it first.

---

### Fix 5: Fix Missing Views - Harden `setActiveTab`

**Function:** `setActiveTab` (around line 2577)

**Problem:** If any `try` block throws, subsequent blocks don't run.

**Fixed Code:**
```javascript
function setActiveTab(viewId, btnId){
  // Each operation in its own try/catch - never let one failure block others
  try{ 
    const h = document.getElementById('suppHead'), t = SUPP_TITLES[btnId]; 
    if(h){ 
      if(t){ h.style.display=''; h.innerHTML = `<h2>${t[0]}</h2><p class="narr">${t[1]}</p>`;  } 
      else { h.style.display='none'; h.innerHTML=''; } 
    } 
    const _zh=document.querySelector('.hero'); 
    if(_zh) _zh.style.display = t ? 'none' : ''; 
    window.scrollTo(0,0); 
  }catch(e){ console.warn('setActiveTab: header update failed', e); }
  
  try{ updateStepper(); }catch(e){ console.warn('setActiveTab: updateStepper failed', e); }
  
  try{
    ['viewRankings','viewPlayers','viewGroups','viewCompare','viewDraft','viewGuide'].forEach(v=>{ 
      const el=document.getElementById(v); 
      if(el) el.classList.toggle('active', v===viewId); 
    });
    ['tabRankingsBtn','tabPlayersBtn','tabGroupsBtn','tabCompareBtn','tabDraftBtn','tabGuideBtn'].forEach(b=>{ 
      const el=document.getElementById(b); 
      if(el) el.classList.toggle('active', b===btnId); 
    });
  }catch(e){ console.warn('setActiveTab: view toggle failed', e); }
  
  // View-specific initialization - each in own try/catch
  if(viewId==='viewRankings'){
    try{ 
      const _rb=document.getElementById('resultsBody'); 
      if(_rb && !_rb.children.length) render(); 
    }catch(e){ console.warn('viewRankings render failed', e); }
  }
  if(btnId==='tabCompareBtn'){
    try{ renderHomeComparison(); }catch(e){ console.warn('renderHomeComparison failed', e); }
  }
  if(btnId==='tabGuideBtn'){
    try{ document.getElementById('guideBody').innerHTML = guideHTMLCached(); }catch(e){ console.warn('guideHTMLCached failed', e); }
  }
  if(btnId==='tabDraftBtn'){
    try{ fillDraftGuide(); }catch(e){ console.warn('fillDraftGuide failed', e); }
  }
  if(typeof zpbSyncHome==='function'){
    try{ zpbSyncHome(); }catch(e){ console.warn('zpbSyncHome failed', e); }
  }
  if(typeof zpbFadeScan==='function'){
    try{ zpbFadeScan(); }catch(e){ console.warn('zpbFadeScan failed', e); }
  }
}
```

---

### Fix 6: Ensure `viewGroups` (Position Rankings) Initializes

**Function:** `zpbInitRankingsUI` - need to find it

---

### Fix 7: Fix `renderDraftBoard2` - Priority/WINS Display

**Function:** `renderDraftBoard2` (around line 5257)

**Problem:** The `sim` object from `simRecs()` might be null/undefined, causing priority and gone values to not display.

**Key Code Section (around line 5310):**
```javascript
const sortKey = (!sim && ['priority','value','gone'].includes(sortBy)) ? 'wins' : sortBy;
```

If `sim` is falsy, priority/value/gone sorts fall back to 'wins', but the display still needs `sim` for the values.

**Fix:** Ensure `simRecs()` never returns null/undefined, or handle gracefully in render.

```javascript
function simRecs(){
  const S = draftSim;
  if(!S || !S.pool || !S.pool.length) return createEmptySim();
  if(draftUI.sim && draftUI.sim.pos===S.pos) return draftUI.sim;
  
  try{
    // ... existing logic ...
    return (draftUI.sim = {pos:S.pos, trials, c0, fm, later, gap: nextIdx>0 ? nextIdx-S.pos-1 : 0});
  }catch(e){
    console.warn('simRecs failed:', e);
    return createEmptySim();
  }
}

function createEmptySim(){
  const empty = {pos: draftSim?.pos || 0, trials: [], c0: {}, fm: new Map(), later: {}, gap: 0};
  WV_GROUPS.forEach(g=>{ empty.later[g] = 0; });
  return empty;
}
```

Then in `renderDraftBoard2`, ensure `sim` is always an object:
```javascript
const {sim, entries} = boardEntries();
// GUARANTEE sim exists
const safeSim = sim || createEmptySim();
```

And use `safeSim` throughout instead of `sim`.

---

### Fix 8: Fix `boardEntries` to Handle Empty Sim

**Function:** `boardEntries` (around line 5176)

```javascript
function boardEntries(){
  const S = draftSim, roster = S.rosters[S.userIndex];
  const sim = simRecs(); // Now guaranteed to return object
  const out = [];
  S.pool.forEach(p=>{
    const w = playerWar(p).war, fits = sim ? sim.fm.get(p[0]) : userFits(roster, p);
    (fits||[]).forEach(e=> out.push(mkEntry(p, w, e, sim)));
  });
  return {sim, entries: out};
}
```

---

### Fix 9: Fix `mkEntry` to Handle Missing Sim

**Function:** `mkEntry` (around line 5217)

```javascript
function mkEntry(p, w, e, sim){
  const later = sim && sim.later ? (sim.later[e.g]||0) : null;
  const pri = sim ? e.v - later : e.v; // sim always exists now
  const m = PRIO_MULT[prioOf(e.g)];
  return {
    p, w, slot:e.slot, g:e.g, flex:e.flex, pen:e.pen, 
    v:e.v, later, pri, 
    gone: sim && sim.trials && sim.trials.length ? goneFrac(sim, e) : null, 
    score: pri>0 ? pri*m : pri/m
  };
}
```

---

### Fix 10: Ensure `executePick` Updates Everything

**Function:** `executePick` - need to find it

Let me search for it.

---

### Fix 11: Ensure Guide Content Loads

**Function:** `guideHTMLCached` - need to find it

---

## TESTING CHECKLIST

After applying fixes, test with these scenarios:

### Test 1: Draft Board - Pick 1.32 (31 CPU picks before user)
1. Open simulator
2. Select team at pick 32 (last in round 1)
3. Click "Start Draft"
4. **Expected:** CPU makes 31 picks rapidly, then stops at user's turn
5. **Check:** Priority column shows numbers, WINS column shows numbers, Gone column shows percentages
6. **Check:** Draft ticker shows recent picks updating

### Test 2: User Pick Flow
1. At user's turn, click "Draft" on a player
2. **Expected:** Player added to roster, depth chart updates
3. **Expected:** CPU immediately starts drafting next picks
4. **Check:** No errors in console

### Test 3: Multiple Teams
Repeat Test 1 with:
- Pick 1.01 (first pick)
- Pick 1.16 (middle of round 1)  
- Pick 2.32 (last pick round 2)
- Random team

### Test 4: View Switching
1. Click "MADDEN RANKINGS" footer tab → viewRankings should show table
2. Click "POSITION RANKINGS" → viewGroups should show position table
3. Click "GUIDE" → viewGuide should show guide content
4. Click "PLAYER BROWSER" → viewPlayers should show player table
5. Click "TEAM COMPARISON" → viewCompare should show comparison
6. Click "SIMULATOR" → viewDraft should show draft board

### Test 5: Console Errors
- Open DevTools Console
- Perform all above tests
- **Expected:** No red errors (warnings OK)

---

## FILES TO MODIFY

All changes in single file: `Football-Sim-Z-post-blue-w21.html` on branch `council/zai`

Key functions to modify (line numbers approximate):
1. `startDraft2` (line ~4988) - Fix 1
2. `processUntilUserTurn` (line ~5080) - Fix 2
3. `makeUserPick2` (line ~5406) - Fix 3
4. `executePick` (find line) - Fix 4
5. `setActiveTab` (line ~2577) - Fix 5
6. `zpbInitRankingsUI` (find line) - Fix 6
7. `renderDraftBoard2` / `boardEntries` / `mkEntry` / `simRecs` (lines ~5176-5400) - Fixes 7,8,9
8. `zpbWelcomeCine` (line ~10673) - Fix 1 (ensure callback fires)

---

## DEPLOYMENT

Since this is a single HTML file on `council/zai` branch:
1. Apply all fixes to the HTML file
2. Commit: `git add Football-Sim-Z-post-blue-w21.html && git commit -m "Fix: draft board CPU start, priority/WINS display, user pick depth chart, view switching"`
3. Push: `git push origin council/zai`
4. Test in browser

---

## NOTES FOR Z.AI

- The `zpbWelcomeCine` callback MUST fire immediately (not after 7+ seconds)
- The watchdog is a safety net, not the primary kick mechanism
- `simRecs` Monte Carlo (12 trials × 31 CPU picks) is expensive - consider reducing trials or adding Web Worker
- All view initialization functions must be resilient to missing data
- Console logging added for debugging - can be removed after verification

---

## PRIORITY ORDER

1. **Fix 1** (Draft start) - Blocks everything else
2. **Fix 2** (processUntilUserTurn hardening) - Prevents silent failures
3. **Fix 3** (makeUserPick2) - User pick flow
4. **Fix 5** (setActiveTab) - View switching
5. **Fix 7,8,9** (Priority/WINS display) - Board readability
6. **Fix 6, 11** (Position Rankings, Guide) - Missing views

SAFE ALONE?: YES - Each fix is independent and can be applied incrementally.