SPEAKER: glyph | ROLE: council seat | TASK: EMERGENCY constant defect — reproduce, real-pool test, failing test + §5 patch | DATE: 2026-11-16T02:36:00Z
FOR: P-333

## Scope / setup
- Read-only analysis on extracted commits: `6dcf13b294a7243aad61dc11b9c22bdc4da34e53` and architect HEAD `86f22d107850b39fa2b6b8ea7cf45c814da443b1` (`git archive ...` to `/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/arch-6dcf`, `.../arch`). Temp copies for experiments: `/private/tmp/glyph-round/d-100k`, `/private/tmp/glyph-round/d-1e9` (only `colors/src/sports/nfl/engine/lineup.ts` constant changed in copies). No engine/product files in repo edited. (VERIFIED)

## Scale re-measurement (MEASURED provider, 6dcf13b, 4-3)
Command (cwd `.../arch-6dcf/colors`):
`node --experimental-strip-types -e "import {measuredValues} from './src/sports/nfl/engine/valueprovider.ts'; import {fieldSlots} from './src/sports/nfl/engine/slots.ts'; import {WINS_PER_UNIT} from './src/sports/nfl/engine/lineup.ts'; const v=measuredValues(); const slots=fieldSlots('4-3'); const units=slots.map(f=>v.winsPerOvr(f.row,'4-3')/WINS_PER_UNIT); const sum=units.reduce((a,b)=>a+b,0); const max=Math.max(...units); console.log(JSON.stringify({sum,max,maxSwing:max*99,whole:sum*99,count:units.length}));"`

Output (VERIFIED): `{"sum":8628.552141732287,"max":999.3087086614173,"maxSwing":98931.56215748031,"whole":854226.6620314964,"count":32}`.
- 32 spot values sum (fitted-weight units) = **8628.552141732287**
- largest single spot value = **999.3087086614173** (QB)
- largest single-spot swing (value×99 OVR) = **98,931.56215748031**
- largest whole-lineup value (sum×99) = **854,226.6620314964**
- shipped `EMERGENCY = 1e5` (`lineup.ts`): **1.0108×** single-spot swing, **0.11707×** whole-lineup value. (VERIFIED arithmetic)

## Synthetic 300-seed reproduction (prompt’s construction family)
Roster generator used (VERIFIED script `/private/tmp/glyph-round/d_run.mjs`): `mulberry32(seed)`; for each of 32 players `role = pick(rng, ['QB','WR','TE','CB','SS','FS','RB','OT','OG','C','ILB','OLB','EDGE','DT'])`, `ovr = 55 + floor(rng()*41)` (55–95), ids/names fixed per seed. Solved with `optimalLineup(roster, fieldSlots('4-3'), {base:'4-3'})`.

Results (300 rosters, seeds 0–299): (VERIFIED)
| Variant | EMERGENCY | mean emergency fills | total emergency fills | first 5 seeds (0–4) | seed 0 |
|---|---:|---:|---:|---|---|
| shipped | 100,000 | **1.6566667** | 497 | 1,2,1,2,2 | 1 fill: `P<-SS@58 (eff 50, pen 8)` |
| strict | 1,000,000,000 | **0.0** | 0 | 0,0,0,0,0 | 0 |

**Differs from prompt’s stated ~1–2 → 0.000 in mean magnitude (I observe mean 1.657 on this generator).** Seed-0 concrete construction matches prompt shape qualitatively: seed 0 has **1** avoidable emergency fill under shipped EMERGENCY and **0** under strict EMERGENCY. (VERIFIED; numbers differ — generator/roster distribution matters)

## Real 1,953-player pool (32 team rosters)
Data (6dcf13b): `data/nfl/madden27-ratings.csv` 1942 lines (1941 rows + header), `data/nfl/free-agents-old-ratings.csv` 13 lines (12 rows + header), `data/nfl/player-ids.csv` present; `buildPool(...)` returned **1953 players**, **33 team labels** (32 NFL teams + “Free Agent”, 12 players). (VERIFIED)

Command/script `/private/tmp/glyph-round/d_real.mjs`: for each team label, `optimalLineup(pool.filter(team), fieldSlots('4-3'), {base:'4-3'})`.

Results (VERIFIED): **both EMERGENCY=100,000 and EMERGENCY=1,000,000,000 produced `totalEmergency=0` and `teamsWithEmergency=[]` for all 33 groups** (including “Free Agent”: 12 players, 0 emergency fills reported by optimizer over 32-slot table as filled by its logic).

**Conclusion (VERIFIED on this pool/run):** On the 32 real NFL team rosters in this dataset, the shipped constant shows **0 avoidable emergency fills**, same as strict. The defect demonstrated on synthetic rosters is **not observed on real team rosters here** — synthetic roster composition was the artefact for this pool. (Plainly stated as requested.)

## §5 patch proposal (test + fix) — draft, not applied
**Target build:** `colors/src/sports/nfl/engine/lineup.ts` (and new test file) at `6dcf13b294a7243aad61dc11b9c22bdc4da34e53` / current architect tip `86f22d10` (verify anchors). **Do not edit engine; Architect integrates.**

### Proposed fix (derive ladder from provider)
**WHERE anchor:** `const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;` and `const unitsOf = ...` / use inside `optimalLineup`.

**Old → new (conceptual, exact numbers derived):**
```ts
// replace fixed constants with provider-derived scale
function priorityScale(units: readonly number[]): number {
  const sum = units.reduce((a,b)=>a+b,0);
  return sum * 99; // largest whole-lineup value in fitted-weight*OVR units
}
// inside optimalLineup after units v computed:
const scale = priorityScale(v);
const ILLEGAL = 1000 * (1000 * scale);
const PLAYS = 1000 * scale;
const EMERGENCY = 2 * scale;
```
(Alternatively keep ILLEGAL very large absolute if desired, but EMERGENCY must be > any achievable value gain under priority 4 so it cannot be “bought out”; PLAYS >> EMERGENCY >> max value delta across assignments.) **Rationale:** with `scale = (sum of spot values)*99`, any single-assignment value delta is <= `scale`, so `EMERGENCY=2*scale` strictly dominates value. (INFERRED correctness of ladder; not fully re-run on whole suite here)

### Proposed failing test (demonstrates avoidable fill on current tree)
**New test (e.g. `colors/test/nfl/lineup-emergency-priority.test.ts`):**
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { optimalLineup } from '../../src/sports/nfl/engine/lineup.ts';
import { fieldSlots } from '../../src/sports/nfl/engine/slots.ts';

function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; } }
const roles = ['QB','WR','TE','CB','SS','FS','RB','OT','OG','C','ILB','OLB','EDGE','DT'];
test('optimizer must not accept an avoidable emergency fill (seed-0 synthetic roster)', () => {
  const rng = mulberry32(0);
  const roster = Array.from({length:32}, (_,i)=>{ const role=roles[Math.floor(rng()*roles.length)]; const ovr=55+Math.floor(rng()*41); return {id:`s0_p${i}|${role}`,name:`p${i}`,pos:role,role,team:'T',ovr,spd:70,str:70,freeAgent:false}; });
  const l = optimalLineup(roster, fieldSlots('4-3'), { base:'4-3' });
  assert.equal(l.emergencyFills, 0);
});
```
**Expected:** **FAILS on current tree** (`emergencyFills` observed 1 for this construction) and **PASSES with strictly-scaled constants** (observed 0). (VERIFIED in temp copies; not added to repo)

**WHY:** Priority 3 (“as few emergency fills as possible”) must strictly dominate priority 4 (value). Fixed `EMERGENCY=1e5 < 854,226.662` whole-lineup scale allows value tradeoffs on synthetic/edge rosters.

**SAFE ALONE?** Fix is localized to cost constants in `optimalLineup`; requires validating no behavioral regressions where emergency fills were previously unavoidable (should be equal or better). Test is additive. (INFERRED)

**HOW TO CHECK:** 
- Before fix: `node --test --experimental-strip-types colors/test/nfl/lineup-emergency-priority.test.ts` → fails with `emergencyFills 1 !== 0` for seed-0 roster.
- After fix: same test passes (0). 
- Full suite: `cd colors && node --test --experimental-strip-types` → report counts (I did **not** run full suite with fix applied; **UNKNOWN**).

**Ledger:** VERIFIED scale numbers, synthetic 300-seed comparison (1.657 vs 0), seed-0 case (1 vs 0), real-pool 1953/33-team comparison (0 vs 0). REPORTED prompt’s ~1–2 figure not reproduced exactly. INFERRED ladder correctness/impact; UNKNOWN full-suite result with proposed fix.
