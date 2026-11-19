# Engine plan v4 (Architect, 19 Nov 2026): what the measurements change. Amends v3; only differences here. SHIP-FIRST stays first.

Labels: VERIFIED (run or read by me this sitting, `edd56bf` + the two new tools), INFERRED, UNKNOWN.

## 1. Measured today (VERIFIED, 2 vCPU container, Node 22.23.5; machine-dependent, report-only)
- **Throughput** (`colors/tools/throughput.ts`): ~2,350 games/s, ~315k snaps/s, ~470k events/s on the lambda-0 GLM node (pass class active, no tilt; the pooled node plus the GLM's per-snap work), so one 272-game season is ~0.12 s. The v2 proposal (>= 200k plays/s) is met by ~1.5x with no table or struct-of-arrays work. v3's fidelity-ladder fallback (chain-level games for the non-user matches) is NOT needed for the neutral node. UNKNOWN: with rating tilts, lineup solve and the browser/phone.
- **Pairing value** (`colors/tools/crn-efficiency.ts`, current keying = draw coordinate is the event index): the paired counterfactual cuts variance of a tilt difference by x1.5 to x2.8 (points x2.2 at s=0.25, x1.55 at s=1; yards x2.8 / x2.0). The benefit shrinks as the tilt grows, because a changed play shifts every later event index and the two games decouple.
- **Scratch experiment, NOT in the repo:** keying draws by (drive number, play-in-drive) instead of global event index. Like-for-like variance-reduction factors, current to (drive,play): s=0.25 points 2.21 to 2.56 (+16%), yards 2.83 to 3.57 (+26%); s=1 points 1.55 to 1.59 (+3%), yards 1.98 to 2.24 (+13%). So +3% to +26%, largest for small tilts. CORRECTION (council + Ernie, re-derived by me): an earlier line here said "+15-60%"; that mixed metrics and is withdrawn. Means unchanged within noise.

## 2. Decisions (mine; the colors engine is mine)
1. **Structural keying is a good idea and goes into the cutover re-pin, not now.** It re-keys every seeded output (a re-pin-class change, reported not gated, ruling 2), buys nothing for shipping football, and would invalidate the item-5/6 receipts Z.ai is mid-run on. Plan: when the Lab needs many counterfactuals (per-offense gap, ratings track), change the coordinate to `(drive, play)` in `game.ts`/`drive.ts` together with the Python oracle vectors, one commit, one declared `ENGINE_LABEL` bump. Recorded here so it is not re-derived.
2. **Throughput is not a blocker.** Drop "throughput" as a gate on the neutral node; keep the number reported (`throughput.ts`) and re-measure when ratings/lineup enter. Fidelity ladder stays a dormant fallback.
3. **Multisport:** nothing new built. The purity plan (M1-M6) stands as the post-cutover checklist. Insight from the pairing result: any second sport should key draws by its own natural structure (inning/plate appearance, possession) not a global index; that is a sport-module choice, `core/keyedrng.ts` already takes an arbitrary `(eventIndex, tag)` so the kernel needs no change.
4. **Order of work now:** (A) read item-6 JSON when it lands; (7) S3 context-snapshot type and S4 additive async store API, parallel and non-blocking (neither exists in `src`, VERIFIED by grep); then the per-offense `passGap` ratings track, which item 6 showed is the only way to identify lambda.

## 3. Owner rulings recorded (relayed by the council, 19 Nov)
Framework = Svelte 5 + Vite 8 (keep the token "vite 8"). R-13 closed, React out (R-9). `colors/` is already on the decided pair (vite ^8.3.6, plugin ^7.3.1); nothing to change. `react`/`react-dom` stay listed in `colors/package.json` unused: removal is a dependency change, queued for cutover. The w89 HTML retires when 76 Pancakes ships. `?seed=` seam stays open.

## 4. Not doing
No new dependency, no save-format change, no value tuning against history before ship (Owner, 18 Nov).
