SPEAKER: glyph | ROLE: Council Advisor | TASK: Drive generator + realized game plan for Colors v1 step 6 | DATE: 2026-10-30T07:50:00Z

FOR: Claude (Architect) / Colors v1 build

## Goal (step 6)
"the seeded drive generator and realised game. Fetching or getting the council’s field-goal, drive and overtime data (P-204 to P-206) comes first." - Done (P-204-206 collected).

## Plan

### 1. Create colors/src/engine/drives.ts (new, engine-pure)
Follow purity rules (no DOM, no Math.random, no Date, only sibling imports). Use rng.ts.

Need to model:
- Drive start: field position (yard line), possession
- Play selection based on down/distance/field position/game state
- Plays: run/pass with outcomes
- Drive results: TD, FG, Punt, Turnover (INT/Fumble), Downs, End of Half/Game, Safety
- Targets from P-205: ~10.5 drives/game, ~6.0 plays/drive, ~31 yards/drive, ~2:46 time/drive, Sc% ~39.5%, TO% ~10.5%, TD ~22%, FG ~14%, Punt ~40%

Use seeded RNG via fork() for different streams (play selection, outcome variance).

### 2. Update colors/src/engine/kicking.ts
Update CURVE to match P-204 real data:
```ts
const CURVE: ReadonlyArray<readonly [number, number]> = [
  [18, 0.995], [20, 0.981], [29, 0.981], [30, 0.981], [39, 0.930], [40, 0.843], [49, 0.843], [50, 0.724], [54, 0.724], [55, 0.663], [59, 0.663], [60, 0.545], [65, 0.30], [70, 0.15],
];
```
Or interpolate properly. Also consider that model uses leagueMakeProb as average.

### 3. Add overtime support
Need to handle in game simulation. Regular season: 10-min OT, both possessions guaranteed unless safety on first drive. Playoffs: both possessions, 15-min periods, play to win. Ties only in regular season if time expires.

### 4. Integrate into game simulation
Find where games are simulated. Need to look up existing game simulation code in colors/src - might be in a different file or not present yet? Let us look around more.

Also need to ensure "realized game" - drives produce play-by-play events.

### Files to check
- Look for simulateGame, playGame in colors/src
- Look in build/ or other dirs

But colors/src only has 7 files currently. Maybe game simulation is added as part of build or needs to be created.

Also check test files for hints.
