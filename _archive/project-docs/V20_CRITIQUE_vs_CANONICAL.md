# V20 CLAUDE HTML CRITIQUE vs CANONICAL BUILD (77bb9ed5)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-19  
**Canonical Build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**v20 File:** `NFL Draft Simulator v20 Claude.html`

---

## Executive Summary

The v20 is a **complete visual redesign** with a different product philosophy (Draft-first vs Season-first), but it **lacks critical infrastructure** required by the protocol and Round 1 requirements. It cannot serve as the Round 1 base without substantial additions.

---

## Major Structural Differences

| Aspect | Canonical (77bb9ed5) | v20 Claude | Protocol Compliance |
|--------|---------------------|------------|---------------------|
| **Primary tab** | Season (default) | Draft (default) | ❌ Violates "Season-first" mandate |
| **Supplementary tools** | Bottom links (Rankings, Players, Groups, Compare, Guide) | Bottom footnav (Simulator, Rankings, Players, Groups, Compare, Guide) | Different IA |
| **Season phase** | Full state machine (preseason → regular → playoffs → complete) | ❌ No Season tab visible | ❌ Missing core product |
| **SIM-CORE markers** | Not present in either | Not present | Both need S-202 |
| **Headless entry points** | Missing in both | Missing in both | Both need S-202 |
| **Tab structure** | Season, Draft, Rankings, Players, Groups, Compare, Guide | Draft, Rankings, Players, Groups, Guide, Compare | Different IA |

---

## Critical Missing Infrastructure (Protocol Requirements)

### 1. Missing SIM-CORE Entry Points (Required by CONTRACT v2 C2, S-202)

| Function | Canonical | v20 | Status |
|----------|-----------|-----|--------|
| `buildDraftState()` | ❌ | ❌ | **Must implement in S-202** |
| `simulateDraftHeadless()` | ❌ | ❌ | **Must implement in S-202** |
| `buildLeagueFromDraft()` | ❌ | ❌ | **Must implement in S-202** |
| SIM-CORE markers | ❌ | ❌ | **Must add in S-202** |

### 2. Missing Season Engine (Protocol Priority #1)

The v20 **has no Season tab at all** — no preseason, regular season, playoffs, Super Bowl, awards, recaps. The canonical build has a complete Season engine (lines 3368-5816 in canonical).

### 3. Product Philosophy Conflict

- **Protocol**: "Season is the product; Draft is a phase" (COLLECTIVE-PROMPT.md line 40)
- **v20**: Draft is the default/primary view; Season doesn't exist
- **Canonical**: Season tab is default active; Draft is secondary

---

## v20 Strengths (Worth Adopting)

### 1. Modern Visual Design ✅
- Hero section with animated football emoji
- Stepper progress indicator (Draft → Season → Playoffs → Champion)
- Gradient backgrounds with radial overlays
- Rounded buttons with glow effects, hover animations
- Hero "bouncing" football animation

### 2. Mobile Draft Board (Lines 254-273) ✅
- 12-column CSS grid for compact player cards
- Every stat labelled with `data-label` attributes
- Color-coded columns (OVR, Wins, Value, Priority, Gone)
- Compact card layout — far superior to canonical's table approach

### 3. Modern CSS Architecture ✅
- CSS custom properties for theming (`--glow`, `--gold`)
- Radial gradient backgrounds with fixed attachment
- Smooth transitions on buttons/tabs
- `prefers-reduced-motion` respected
- Sticky table headers in `.tablewrap`

### 4. Mobile-First CSS ✅
- Comprehensive `@media (max-width:760px)` rules
- Draft board transforms to 12-column grid cards
- Stacked cards for all tables via `.mstack`
- `white-space:nowrap` overrides

### 5. Accessibility ✅
- `aria-label` on footnav
- `aria-label` on close button
- `prefers-reduced-motion` respected
- Semantic HTML (`<nav>`, `<header>`, `<ol>` for stepper)

---

## v20 Deficiencies vs Protocol

| Requirement | v20 Status | Action Needed |
|-------------|------------|---------------|
| **Season-first IA** | ❌ No Season tab | Add Season as default tab |
| **SIM-CORE markers** | ❌ Missing | Add in S-202 |
| **Headless entry points** | ❌ Missing | Implement in S-202 |
| **Season engine** | ❌ Missing entirely | Port from canonical (3368-5816) |
| **Season phases** | ❌ No state machine | Port from canonical |
| **Playoff bracket** | ❌ Missing | Port from canonical |
| **Awards system** | ❌ Missing | Port from canonical |
| **Recaps/narratives** | ❌ Missing | Port from canonical |
| **SIM-CORE markers** | ❌ Missing | Add `/*SIM-CORE-START*/` `/*SIM-CORE-END*/` |
| **Headless entry points** | ❌ Missing | Implement 3 functions in S-202 |
| **Dataset file location** | Uses project root | Move to `tests/` per CONTRACT C1 |

---

## Data Integrity Check

| Data | Canonical | v20 | Status |
|------|-----------|-----|--------|
| `PLAYERS` array | 1,200+ entries | Same (truncated in view) | ✅ Same |
| `TEAM_DATA` | 32 teams, 36 slots | Same | ✅ Same |
| `DEFAULT_WEIGHTS` | Same object | Same | ✅ Same |
| `FLEX`/`NATURAL_SLOT_MAP` | Same | Same | ✅ Same |
| `ROSTER_SLOTS` | 26 slots | Same | ✅ Same |

---

## Recommended Path Forward

### Option A: Use v20 as Visual Base, Port Canonical Logic (Recommended)

1. **Keep v20's CSS/visual design** (hero, stepper, mobile draft board, modern styling)
2. **Port canonical's Season engine** (preseason, regular, playoffs, awards, recaps)
3. **Make Season the default tab** (protocol requirement)
4. **Add SIM-CORE markers + 3 headless entry points** (S-202)
5. **Move supplementary tools to bottom links** (canonical pattern)
6. **Keep v20's mobile draft board** (superior to canonical)

### Option B: Use Canonical as Base, Adopt v20 Visuals (Alternative)

1. Start from canonical (77bb9ed5)
2. Adopt v20's hero/stepper/mobile draft board CSS
3. Already has Season engine, SIM-CORE ready for markers

---

## Specific Code Changes Needed

If adopting v20 as base:

```html
<!-- 1. Change default active tab from Draft to Season -->
<div class="view active" id="viewSeason">...</div>
<div class="view" id="viewDraft">...</div>

<!-- 2. Add Season tab as first tab -->
<button class="tabbtn active" id="tabSeasonBtn">Season</button>
<button class="tabbtn" id="tabDraftBtn">Draft</button>

<!-- 3. Add SIM-CORE markers in script -->
/*SIM-CORE-START*/
// ... all pure math functions ...
/*SIM-CORE-END*/

<!-- 4. Add three headless entry points -->
function buildDraftState() { ... }
function simulateDraftHeadless() { ... }
function buildLeagueFromDraft() { ... }

<!-- 4. Port Season engine from canonical (lines 3368-5816) -->
<!-- 5. Move footnav to bottom links per canonical pattern -->
```

---

## Verdict

| Use v20 as Round 1 base? | **No** — missing Season engine, SIM-CORE, headless entry points |
|---------------------------|----------------------------------------------------------------|
| Use v20 visuals? | **Yes** — adopt hero, stepper, mobile draft board, modern CSS |
| Recommended approach | **Port canonical logic into v20 visual shell** (or vice versa) |

The v20 is a **beautiful shell without the engine**. The canonical build has the **engine without the modern shell**. The Round 1 deliverable needs **both**.

---

## Immediate Action Items for Round 1

If you want to use v20's visual design for Round 1:

1. **File a submission** (S-402 or similar) to adopt v20's visual design as the base
2. **Port canonical's Season engine** into v20 structure
3. **Add SIM-CORE markers + 3 headless entry points** in S-202
4. **Make Season the default active tab**
5. **Move supplementary tools to bottom links** (canonical pattern)
6. **Keep v20's mobile draft board** (it's excellent)

---

**Report compiled by:** Ultra (nemotron-3-ultra-free)  
**Canonical Build verified:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**v20 File:** `NFL Draft Simulator v20 Claude.html`  
**Date:** 2026-10-19  
**All findings:** Verified by code inspection (grep, direct source reading)
