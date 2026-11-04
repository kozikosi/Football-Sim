# w68 Debt Inventory — v1 (first pass)

- **Author:** Z.ai (executor seat, w52–w69). **Reviewer wanted:** Architect (load-bearing accidents).
- **Anchor swept:** `origin/gh-pages:Football-Sim-Z-post-blue-w68.html`, 1,796,935 bytes, sha256 `58f6e75548c1991f…` (pin per BASELINES.md convention).
- **Method:** machine sweep (ripgrep counts + extractions) on the anchor + executor knowledge. Labels: VERIFIED = grep/command evidence in this pass; REPORTED = ship-memory, to confirm in the behavioral pass.
- **Status:** v1 — sweep-level. Behavioral pass (screen-by-screen walkthrough, per-wave diff review w34→w68) is next.

## Headline counts (VERIFIED, ripgrep on anchor)

| Signal | Count | Reading |
|---|---|---|
| `<script>` blocks | 24 | load-order is load-bearing |
| `window.*` assignment sites | 185 | ~40 distinct app globals |
| dunder flags `__zpb*` | 22 distinct | cinematic/test coordination hooks |
| `localStorage` call sites / distinct keys | 12 / 4 | no schema version anywhere |
| `Math.random` | 43 | old-build sim outcomes NOT reproducible |
| `addEventListener` | 209 | fine in itself; port mapping needed |
| `getElementById` / `querySelector` | 250 / 144 | deep DOM coupling |
| `document.*` calls | 440 | — |
| `innerHTML` | 110 | string-built markup |
| `style="` inline | 417 | token bypass |
| `!important` | 201 | override wars |
| `<style>` blocks | 42 | palimpsest: lines 46 → late file |
| `setTimeout/setInterval` | 80 | wall-clock-dependent behavior |
| inline `onclick=` handlers | 0 | (good) |
| embedded `data:image` URIs | 4 | base64 logos in artifact |

## Inventory

| # | Item | Location | Current behavior | Category | Dependencies | Rebuild treatment | How to verify |
|---|---|---|---|---|---|---|---|
| 1 | 24-script load order | whole file | later blocks read earlier blocks' globals; order is load-bearing | replace | all screens | ES module graph; explicit imports | build fails on missing import; no bare global reads left |
| 2 | App window globals | ZPB34, ZPBStorage, ZPB_BLUE_LIFT, zpbDimeOf, zpbBeatOf, zpbLift, _zpbAdjCache, _zpbDW, zpbStagedForm, zpbSimRestOfPlayoffs, zpbPlayoffEndScreen, zpbCineYds… (~18) | cross-screen coordination and helpers live on `window` | replace | store/app-state, VMs | state → store; helpers → modules | `rg "window\."` shows only browser APIs |
| 3 | Dunder coordination flags | `__zpbSilent`, `__zpbPoRunHold`, `__zpbSBFinPending`, `__zpbStoryHold`, `__zpbQuietSim`, `__zpbFxSafety`, `__zpbPoCineSeen`, `__zpbPrematchSeen`, `__zpbSetbackShown`, `__zpbSBReplayHold`, `__zpbSBRewardOwed`, `__zpbSimRestRun`, `__zpbDraftDone`, `__zpb100View`, `__zpbSeriesSteps`, `__zpbLookIO`, `__zpbFxPending`, `__zpbStorageTest`, `__zpbAp1Gold`, `__zpbFitT`, `__zpbRetItems`, `_zpbWel*` (22) | cinematic sequence + sim-mode gating via global flags; some almost certainly gate headless verification runs | **investigate** (top priority) | E2E receipt suites, cinematics | map each: kill, or promote to named store/UI flag with a written reason | per-flag grep + replay of headless receipt runs against rebuilt UI |
| 4 | localStorage keys | `zpb:theme`, `zpb:tab`, `zpb:base34`, `zpbPlayerProfiles` | theme + tab memory; wave-34 feature state; player profiles; unversioned | preserve semantics / replace mechanism | theme module, profiles | typed storage module + `schemaVersion` from day one (parseRecord pattern) | round-trip test; corrupt file → typed error |
| 5 | Unseeded RNG | `Math.random` ×43 | old-build sim outcomes are not reproducible; some uses cosmetic | replace | parity approach | engine is seeded (`core/rng.ts`): port logic, not outcomes; cosmetic RNG seeded too | `rg Math.random` → 0 in rebuilt code |
| 6 | CSS palimpsest | 42 `<style>` blocks spanning the file (lines 46→late), 201 `!important` | 18+ waves of layers never cleaned; override wars | replace | COLORS-V1 token file | one token source + per-screen styles; no raw hex outside tokens; WCAG AA contrast gate | CI check: `!important` ≈ 0; contrast matrix green |
| 7 | Inline styles | `style="` ×417 | per-element styling bypassing tokens | replace | token layer | classes/tokens only | `rg 'style="'` ≈ 0 in components |
| 8 | DOM coupling | getElementById ×250, querySelector ×144, document.* ×440 | logic reaches into the DOM directly | replace | dumb components + events | VM in, events out; no document refs in logic | component spec per `ui/spec/<screen>.md` |
| 9 | innerHTML rendering | ×110 | string-built markup; interpolation hygiene unproven | replace | component templates | audit every site for name/string interpolation during port | `rg innerHTML` → 0 |
| 10 | Timers | setTimeout/setInterval ×80 | cinematic pacing, sim pacing, debounces ride wall-clock | replace/investigate | N3 feed, chunked sim runner | presentation timeline driven by engine events; sim via chunked deterministic runner | golden feed fixtures drive cinematics; no logic timers |
| 11 | E2E control ids | `startDraftBtn`, `speedInstantBtn`, `simToEndBtn`, `draftFinalResults`, `resultsSeasonBtn`, `startSeasonBtn`, `beginSeasonBtn`, `simSeasonBtn`, `sim100Btn`, `simPlayoffsBtn` (CHRONICLE M-80 receipt) | OpenChamber E2E suite couples to these element ids | **preserve** | verification suites | keep ids (or documented map) in rebuilt components | receipt suite passes on rebuild |
| 12 | ZPBStorage wrapper | `window.ZPBStorage` | ad-hoc persistence layer | replace | storage module | single typed module (#4) | all storage calls route through it |
| 13 | Wave-34 layer | `ZPB34` global + `zpb:base34` key | w34 feature state still live in w68; provenance unclear | investigate | tab/profile logic | keep/drop decision documented during port | behavior diff review vs w68 |
| 14 | Team-color computation | inline color math (w70 evidence: gold-on-gold button, faded Browns lineup text) | contrast regressions structurally possible | replace | semantic tokens + CI contrast gate | palette → tokens; no raw hex; every pair checked | axe/WCAG CI gate per theme |
| 15 | Name styling rules | draft-review shimmer applied broadly | Owner rule: 90+ shimmer, 85+ bold, rest neutral 0.50 | replace | VM tone/band fields | VM emits ovr band; UI maps band→class | unit test on band mapping |
| 16 | Inlined assets | `data:image` ×4 | logos base64 in the artifact | replace | Vite assets | `/assets` + content hash | bundle report |
| 17 | matchMedia probes | ×40 | dark-mode/responsive decisions scattered | replace | theme/store module | one subscriber, store-held theme | component code contains no matchMedia |
| 18 | Form staging | `zpbStagedForm` | multi-step form state on window | replace | app state | draft-day flow via store actions | interaction test |
| 19 | Sim pacing controls | speed buttons incl. `speedInstantBtn` | setTimeout-chained stepping | replace | action interface (season scope) | chunked deterministic runner + UI pump | seeded sim-to-end == single engine call |
| 20 | Unversioned saves | `zpbPlayerProfiles` | persisted state, no validation | replace | save envelope | parseRecord-style validation from day one | fuzz/round-trip tests |

## REPORTED (ship memory; verify in behavioral pass)

- Cinematic timing constants (storm/whistle/beats) are tuned against specific timer values — port as data, not scattered literals.
- A few screens have accidental-but-shipped behaviors (overflow quirk on depth chart at narrow widths; tab-restore edge case). To be confirmed screen-by-screen.
- `zpb:tab` may hold UI tab memory only — confirm it is not load-bearing for state.

## For the Architect's review (load-bearing accidents shortlist)

1. All 22 dunder flags (#3) — which gate headless verification vs. pure cinema coordination?
2. E2E control ids (#11) — confirm the receipt suite's coupling list is complete.
3. Timers (#10) — which are logic vs. presentation?
4. `zpb:base34`/`ZPB34` (#13) — live feature or abandoned layer?
5. Old-save semantics (#4/#20) — anything in `zpbPlayerProfiles` the Owner expects carried forward? (Owner has said dev saves don't matter — default: discard.)

## Next pass

Screen-by-screen behavioral walkthrough on the anchor (empty/loading/error/390px states), per-wave diff review w34→w68 for accidental features, and a followup table v2 with classifications finalized. Blocked on nothing; scheduled after Owner relays this v1.
