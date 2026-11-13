# The engine contract — one page (frozen before any prototype was built)

**The test measures UI + wiring. The engine is shared, identical, and a black box: every prototype consumes THIS package, and may import only `./engine-contract` (the index). The leakage scan enforces it.**

## Public API (`src/index.ts`)

```ts
// engine (vendored verbatim from the pin 4ca9a071)
makeRng(seed): Rng          forkSeed(seed, label)     Rng = { next, int, normal, pick, fork }
SLOT_IDS: SlotId[]          // 32 slots
teamRatings(spots): Ratings          leagueBaseline(list): Ratings
matchupModel(off, def, league, plan): Matchup
simulateGame(mh, ma, rng, opts): GameResult
slotWins20(slot, base): number       // the static truth

// the offensive focus feature (the contract's own module)
FOCUSES: readonly FocusDef[]         // v1-4f: west-coast | deep-passing | rpo | ground-pound
FOCUS_VERSION: string
priorityBoard(slots, focusId): PriorityRow[]   // { slot, ovr, wins, priority } — wins NEVER move
autoPickFocus(state): string                   // the auto default (deterministic by situation)
automatics(state, userFocusId): AutoDecision[] // the Q4 automatics (go-for-2, fourth-down, strat-override)
canChangeAtHalftime(focusId): boolean
formArrow(formZ): 'hot' | 'cold' | null
simulateWithFocus(input: SimInput): SimOutput  // real engine sim + the automatics layer
```

## The feature's rules (PROPOSAL interpretation, frozen for the test — the Owner has not ruled these details)

1. **Priority-not-Wins:** `wins` per slot = `slotWins20` — identical under every focus, on every screen. `priority` = wins + the focus adjustment (integer display). The focus NEVER writes to wins.
2. **Matchup-aware:** the adjustment scales by `matchupFactor` ∈ [0.5, 1.5] — stronger against a weaker opposing unit (cov axis for pass focuses, front axis for run focuses).
3. **Pre-game + halftime:** the user picks before the game; one change at halftime; `auto` is the default and auto users are never prompted at halftime; a toggle enables halftime changes for active managers. `canChangeAtHalftime` is per-focus data (v2 adds a focus where it is false).
4. **4th-quarter automatics** (fire regardless of the user's selection): `go-for-2` (trailing by 8–16 in Q4), `fourth-down-aggression` (trailing in Q4) — both REPORTED decisions (the pin engine does not yet take these as inputs; the UI surfaces them, the wiring is an Architect change, not a prototype change); `strat-override` (per-focus trigger, `appliedInSim: true`) — the one the engine can take, applied by a documented whole-game re-run approximation (per-quarter plan switching is filed for the Architect).
5. **Form arrows:** binary hot/cold from a form z-score (±1.0 threshold); the UI resolves the palette color. No emoji, no text labels.
6. **CPU focuses:** away team takes an explicit focus or `'auto'` (deterministic situational pick).

## Fixtures and goldens

- `fixtures/golden.json` — two teams (strongPass, strongFront), priority boards per focus, 9 games (3 matchup configs × 3 seeds) with scores, Q4-start diff, focusLog, box-score stats, and the auto-pick examples. Regenerate: `npm run golden`. Deterministic: same seed ⇒ same output.
- Prototypes render from the contract at runtime; the Playwright specs assert display wiring against the SAME contract values (not against screenshots or brittle literals).

## The rules every prototype must satisfy (checked by the leakage scan + review)

1. Import only `./engine-contract` (the index) — no deep imports into vendored engine files.
2. No engine logic in the prototype: no RNG, no slot math, no priority formulas outside the contract.
3. The focus list comes from `FOCUSES` — no hard-coded focus count, no `length === 4`, no per-focus switch statements in the UI.
4. Wins are rendered from `wins`; Priority from `priority`. No prototype computes either.
5. Halftime eligibility from `canChangeAtHalftime`; automatics display from `automatics`/`focusLog`. No prototype re-derives them.
