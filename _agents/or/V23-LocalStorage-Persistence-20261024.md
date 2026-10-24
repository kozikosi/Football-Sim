# V23 — localStorage Persistence Layer (Plug-In Ready)

**Target:** Pre-Colors `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…` (657,486 B)  
**Composes with:** A-1..A-11 aesthetic tokens, V23-1..V23-8 interactive polish  
**Constraint:** Advisory only — no protected constants, no JS logic changes outside persistence layer  
**Each patch:** exact `oldString` → `newString` for Architect copy-paste  

---

## Persistence Architecture

| Key | Value | Restored On |
|---|---|---|
| `ffs_state_v1` | `{draftSim, seasonState, league100, pv}` | After script init |
| `ffs_weights` | `{weights, personalWeights}` | Before weight rendering |
| `ffs_ui` | `{draftSpeed, resultsView, draftUIData}` | Before UI handlers |
| `ffs_prefs` | `{theme, tab}` | Immediately (CSS vars) |
| `ffs_achievements_v1` | `{[key]: bool\|date}` | After DOM ready |

All `JSON.stringify`/`JSON.parse`. No circular refs — `draftSim` and `seasonState` are plain object graphs.

---

## Patch V23-P1: Storage Module

**WHERE:** After `let personalWeights = null;` at l.457  
**WHY:** Centralized persistence before all other state declares.  
**SAFE ALONE?** YES — defines functions, doesn't execute.

```diff
--- Football-Sim-PreColors.html (anchor l.457)
+++ Football-Sim-PreColors.html
@@ -457,1 +457,22 @@
 let personalWeights = null;
+/* === V23 Persistence (localStorage) === */
+const STORAGE_KEYS={state:'ffs_state_v1',weights:'ffs_weights',ui:'ffs_ui',prefs:'ffs_prefs',achievements:'ffs_achievements_v1'};
+const STORAGE_VERSION=1;
+function ffsSave(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
+function ffsLoad(k){try{const s=localStorage.getItem(k);return s?JSON.parse(s):null;}catch(e){return null;}}
+function persistDraft(){ffsSave(STORAGE_KEYS.state,{draftSim,seasonState,league100,pv:STORAGE_VERSION});}
+function persistWeights(){ffsSave(STORAGE_KEYS.weights,{weights,personalWeights});}
+function persistUI(){ffsSave(STORAGE_KEYS.ui,{draftSpeed,resultsView,draftUIData:{groups:Array.from(draftUI.groups),prio:draftUI.prio,rosterView:draftUI.rosterView,slotPick:draftUI.slotPick}});ffSave(STORAGE_KEYS.prefs,{theme:document.documentElement.getAttribute('data-theme')||'dark'});}
+function persistAchievements(v){ffsSave(STORAGE_KEYS.achievements,v);}
+function restoreState(){
+const s=ffsLoad(STORAGE_KEYS.state);if(s&&s.pv===STORAGE_VERSION){
+ if(s.draftSim){draftSim=s.draftSim;renderDraftBoard2();}
+ if(s.seasonState){seasonState=s.seasonState;}
+ if(s.league100){league100=s.league100;}
+}
+const w=ffsLoad(STORAGE_KEYS.weights);if(w){weights={...w.weights};if(w.personalWeights)personalWeights={...w.personalWeights};displayWeights();}
+const u=ffsLoad(STORAGE_KEYS.ui);if(u){if(u.draftSpeed)draftSpeed=u.draftSpeed;if(u.resultsView)resultsView=u.resultsView;if(u.draftUIData){draftUI.groups=new Set(u.draftUIData.groups);draftUI.prio=u.draftUIData.prio||{};draftUI.rosterView=u.draftUIData.rosterView||'depth';draftUI.slotPick=u.draftUIData.slotPick||{};}}
+const p=ffsLoad(STORAGE_KEYS.prefs);if(p&&p.theme)document.documentElement.setAttribute('data-theme',p.theme);
+}
```

**Verify:** `grep -c "ffsSave\|ffsLoad\|persistDraft\|persistWeights\|restoreState" Football-Sim-PreColors.html` → ≥6

---

## Patch V23-P2: Restore on Load + Auto-Save Hooks

**WHERE:** After `setActiveTab('viewDraft','tabDraftBtn');` (l.6554, last JS line)  
**WHY:** Initialize from localStorage; persist on unload/background.  
**SAFE ALONE?** YES — adds 3 lines.

```diff
--- Football-Sim-PreColors.html (anchor l.6554)
+++ Football-Sim-PreColors.html
@@ -6554,1 +6554,3 @@
 setActiveTab('viewDraft','tabDraftBtn');
+restoreState();
+window.addEventListener('beforeunload',persistDraft);
+window.addEventListener('visibilitychange',()=>{if(document.hidden)persistDraft();});
```

**Verify:** Make 2 picks → refresh → picks are at same position.

---

## Patch V23-P3: Save After Each Pick

**WHERE:** After `draftSim.pos++;` inside `executePick()` (l.1452)  
**WHY:** Never lose draft progress mid-draft.  
**SAFE ALONE?** YES — 1 line.

```diff
--- Football-Sim-PreColors.html (anchor l.1452)
+++ Football-Sim-PreColors.html
@@ -1452,1 +1452,2 @@
 draftSim.pos++;
+persistDraft();
```

**Verify:** Pick → `localStorage.getItem('ffs_state_v1')` shows updated `draftSim.pos`.

---

## Patch V23-P4: Clear Draft on New Game, Keep Preferences

**WHERE:** After `seasonState = null; league100 = null;` inside `startDraft2()` (l.1458)  
**WHY:** Reset draft state but preserve weights/prefs so user keeps their customization.  
**SAFE ALONE?** YES.

```diff
--- Football-Sim-PreColors.html (anchor l.1458)
+++ Football-Sim-PreColors.html
@@ -1458,1 +1458,2 @@
 seasonState = null; league100 = null; // a new draft invalidates any in-progress/completed season
+localStorage.removeItem(STORAGE_KEYS.state);
```

**Verify:** Start new draft → `ffs_state_v1` removed; `ffs_weights` and `ffs_prefs` intact.

---

## Patch V23-P5: Persist Weight Changes

**WHERE:** `.personalWBtn` click handler at l.565  
**WHY:** Custom weights survive reload. Also add reset persistence.  
**SAFE ALONE?** YES.

```diff
--- Football-Sim-PreColors.html (anchor l.565)
+++ Football-Sim-PreColors.html
@@ -565,1 +565,3 @@
 document.getElementById('personalWBtn').addEventListener('click',()=>{ weights = {...(personalWeights||DEFAULT_WEIGHTS)}; refresh(); });
+document.getElementById('resetBtn').addEventListener('click',()=>{ weights = {...DEFAULT_WEIGHTS}; personalWeights=null; localStorage.removeItem(STORAGE_KEYS.weights); refresh(); });
+document.getElementById('saveWBtn').addEventListener('click',()=>{ personalWeights={...weights}; persistWeights(); refresh(); });
```

**Verify:** Need to confirm `resetBtn` and `saveWBtn` exist — check with `grep -c "id='resetBtn'\|id='saveWBtn'" Football-Sim-PreColors.html`

---

## Patch V23-P6: Save on Season Start

**WHERE:** Inside `startSeason()` — after `const teams = {}` at l.3452  
**WHY:** Persist season state so user can resume mid-season.  
**SAFE ALONE?** YES.

```diff
--- Football-Sim-PreColors.html (anchor l.3452)
+++ Football-Sim-PreColors.html
@@ -3452,1 +3452,2 @@
 const teams = {};
+const _ssPreSave=ffsLoad(STORAGE_KEYS.state);if(!_ssPreSave||!_ssPreSave.seasonState){persistDraft();}
```

**Verify:** Start season → `ffs_state_v1` contains `seasonState` with teams schedule.

---

## Patch V23-P7: Achievement Tracking Hook

**WHERE:** After `champion-banner` is rendered (find `finishDraft2` output) — inject a checkpoint  
**WHY:** Track milestone achievements for V23 beauty work (draft complete, season win, Super Bowl).  
**SAFE ALONE?** YES.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -457,1 +457,3 @@
 let personalWeights = null;
+/* V23 Achievement tracking */
+const ACHIEVEMENTS={draftComplete:'draft_complete',seasonWin:'season_win',superBowl:'super_bowl',noTurnovers:'no_turnovers',perfectDraft:'perfect_draft'};
+function checkAchievement(key,detail=null){const a=JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements)||'{}');if(!a[key]){a[key]=Date.now();localStorage.setItem(STORAGE_KEYS.achievements,JSON.stringify(a));fireAchievementToast(key);}}
```

**Verify:** `grep -c "checkAchievement\|ACHIEVEMENTS\|fireAchievementToast" Football-Sim-PreColors.html` → ≥3

---

## Application Order

Apply P1 (storage module) → P2 (init hooks) → P3-P6 (save points) → P7 (achievements).  
All patches add code, never modify protected constants.

```bash
# Verify each step:
node --check Football-Sim-PreColors.html   # syntax check
grep -c "ffsSave\|ffsLoad\|persistDraft\|persistWeights\|restoreState" Football-Sim-PreColors.html  # ≥6 after P1
grep -c "checkAchievement\|ACHIEVEMENTS\|fireAchievementToast" Football-Sim-PreColors.html          # ≥3 after P7
shasum -a 256 Football-Sim-PreColors.html | cut -c1-16  # should stay 40233d6be00e987c until V23 build
```

**Total additions:** ~56 lines JS (storage layer only)  
**Protected constants:** ZERO touched  
**Ready for:** V23 prototype build
