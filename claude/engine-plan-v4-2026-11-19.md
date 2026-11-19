# Engine plan v4 (Architect, 19 Nov 2026): what the measurements change. Amends v3; only differences here. SHIP-FIRST stays first.

Labels: VERIFIED (run or read by me this sitting, `edd56bf` + the two new tools), INFERRED, UNKNOWN.

## 1. Measured today (VERIFIED, 2 vCPU container, Node 22.23.5; machine-dependent, report-only)
- **Throughput** (`colors/tools/throughput.ts`): ~2,350 games/s, ~315k snaps/s, ~470k events/s on the neutral pooled node, so one 272-game season is ~0.12 s. The v2 proposal (>= 200k plays/s) is met by ~1.5x with no table or struct-of-arrays work. v3's fidelity-ladder fallback (chain-level games for the non-user matches) is NOT needed for the neutral node. UNKNOWN: with rating tilts, lineup solve and the browser/phone.
- **Pairing value** (`colors/tools/crn-efficiency.ts`, current keying = draw coordinate is the event index): the paired counterfactual cuts variance of a tilt difference by x1.5 to x2.8 (points x2.2 at s=0.25, x1.55 at s=1; yards x2.8 / x2.0). The benefit shrinks as the tilt grows, because a changed play shifts every later event index and the two games decouple.
- **Scratch experiment, NOT in the repo:** keying draws by (drive number, play-in-drive) instead of global event index gave x2.6/x3.6 (s=0.25) and x1.6/x2.2 (s=1) on points/yards: roughly +15-60% more pairing, because a change in one drive no longer re-keys the next drives. Means unchanged within noise.

## 2. Decisions (mine; the colors engine is mine)
1. **Structural keying is a good idea and goes into the cutover re-pin, not now.** It re-keys every seeded output (a re-pin-class change, reported not gated, ruling 2), buys nothing for shipping football, and would invalidate the item-5/6 receipts Z.ai is mid-run on. Plan: when the Lab needs many counterfactuals (per-offense gap, ratings track), change the coordinate to `(drive, play)` in `game.ts`/`drive.ts` together with the Python oracle vectors, one commit, one declared `ENGINE_LABEL` bump. Recorded here so it is not re-derived.
2. **Throughput is not a blocker.** Drop "throughput" as a gate on the neutral node; keep the number reported (`throughput.ts`) and re-measure when ratings/lineup enter. Fidelity ladder stays a dormant fallback.
3. **Multisport:** nothing new built. The purity plan (M1-M6) stands as the post-cutover checklist. Insight from the pairing result: any second sport should key draws by its own natural structure (inning/plate appearance, possession) not a global index; that is a sport-module choice, `core/keyedrng.ts` already takes an arbitrary `(eventIndex, tag)` so the kernel needs no change.
4. **Order of work now:** (A) read item-6 JSON when it lands; (7) S3 context-snapshot type and S4 additive async store API, parallel and non-blocking (neither exists in `src`, VERIFIED by grep); then the per-offense `passGap` ratings track, which item 6 showed is the only way to identify lambda.

## 3. Not doing
No new dependency, no save-format change, no value tuning against history before ship (Owner, 18 Nov).
