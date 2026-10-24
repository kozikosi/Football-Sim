# P5 — 3-4 DT-for-LB Toggle Audit (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Question
3-4 DT-for-LB swap: existing base selector + where a toggle attaches.

## Current state

### 1. Defensive scheme options (l.2057)
```js
['base','nickel'].forEach(k=>['run','neutral','pass'].forEach(f=>DEF_OPTS.push({pkg:k, focus:f})));
```
Only two defensive packages: `base` (4 DL, 3 LB) and `nickel` (5 DB, 2 LB). No 3-4 option.

### 2. Base defense description (l.2221)
```
'base defense': {pkg:'base', focus:'neutral', desc:'Four down linemen and three linebackers. Stronger against the run, a little thinner in pass coverage.'}
```
Base is 4-3 (4 DL, 3 LB). No 3-4 variant.

### 3. Nickel substitution (l.2224)
```
'nickel defense': {pkg:'nickel', focus:'neutral', desc:'Five defensive backs: the third cornerback replaces a linebacker. Better in coverage, a little softer against the run. The modern default.'}
```
Nickel replaces a LB with a CB (CB3). This is the 4-3 nickel.

### 4. Base defense selector UI (l.4811)
```js
${sel('planPkg','Defensive package',[['base','Base'],['nickel','Nickel']],u.pkg)}
```
Only two options: Base and Nickel. No 3-4 toggle.

### 5. Team ratings (teamRatings function)
The teamRatings function uses the lineup's slot assignments. The 3-4 would require:
- DT2 → ILB2 (converted slot, worth MIKE)
- SAM → OLB2 (worth WILL)
- No SAM in 3-4 (the SAM role is played by OLB2)

### 6. Does any code reference 3-4 or 4-3?
No. The codebase has no concept of base defense type (3-4 vs 4-3). The defensive scheme is only base vs nickel.

## Owner's directive
"the 3-4 allows the user to swap out a DT for another Linebacker. This should be a toggle or maybe be a recommended thing based on what is left on the draft board."

## Proposed implementation (for Claude)

### Option A: Toggle on draft/preseason page
Add a "Base defense: 4-3 / 3-4" toggle on the preseason lineup page. When 3-4 is selected:
- DT2 slot becomes ILB2 (worth MIKE)
- SAM slot becomes OLB2 (worth WILL)
- The user's DT2 player moves to ILB2
- The 3-4 allows an extra LB instead of a DT

### Option B: Board-driven recommendation
During the draft, if the user has drafted more LBs than DTs, recommend 3-4. If more DTs than LBs, recommend 4-3. Show as a suggestion, not a forced choice.

### Option C: Combined (recommended)
Toggle on preseason page + recommendation during draft. The toggle is the primary mechanism; the recommendation is advisory.

## Where the toggle attaches
- Preseason lineup page (where coaching philosophy is chosen)
- Could also be on the draft board (as a recommendation)
- The toggle affects teamRatings() and matchupModel() (different slot assignments)

## What was deliberately not checked
- Whether the 3-4 should also affect the nickel substitution (in 3-4, nickel replaces the nose tackle, not SAM)
- Whether the 3-4 should be available as a game-plan option (defensive package) in addition to base/nickel
- Whether the 3-4 affects the CPU's optimalLineup() (should use the same slot assignments)
