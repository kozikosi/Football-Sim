# MERGE-README.md — engine, ready to merge (the handoff cover)

**CAKEPANZ-8 ADDENDUM (2026-11-18) — the current state of this tree pair** (the 2026-11-17
verdict below stands as that sitting's dated receipt; the numbers of record NOW, the tools' own
final prints): engine 394/394 shipped · 406/406 prepared; node battery **33/33** both trees
(N28 the RESUME law + N29 the DONE-DRAFT law joined); shell **47/0** both trees (S1a–S31 — the
A2 split: the boot path MANDATORY when an autosave exists, S31 the manual path); slice
29/0/10/3 both trees; **late battery 6/6** both trees (P-337, the late-draft simple board —
render layer only); falsifiers **F0–F12 ALL DIED** both trees + falsify-late (F0-late 6/6,
F13-late DIED); A1's blank-board defect FIXED (mid-season refresh → the running hub; done-draft
refresh and the DRAFT nav → Complete) with N28/N29 beside N25–N27; gates **PASS (314) ×2**
shipped and **PASS (319) ×2** prepared; dist/ rebuilt byte-identical across the trees,
single.html sha256 1529a003…e737. Full stdout: cakepanz-4/VERIFY.txt §21; per-item anchors:
WHAT-CHANGED.md (package root).

**Seat:** Z.ai · 67 Cakepanz · 2026-11-17 (the portability + prepared-re-pin sitting) · **Pin (shipped tree):** `5c808472` · **Prepared next pin (NOT activated):** `65673a00` · **Verdict:** the shipped tree is green end-to-end at its pin — engine 394/394, node 26/26, slice 29/0/10/3, shell 46/0 (the whole season played through the UI), gates PASS (310 entries), every falsifier shown to die (F0–F8 + FA/FB/FC, zero tautologies, zero could-not-run) — and the prepared copy carries the re-pin to `65673a00` with 406/406, 26/26, 29/0/10/3, 46/0, gates PASS (317 entries), both proven on Node v24.22.3 AND v26.13.1. Merge-ready behind one open store item (P-317, the Architect's).

## The one-line merge
Replace `67-cakepanz/src/engine/` with the pin's `colors/src/**` snapshot — and move the other
FOUR paths WITH it (`tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`, the
`data/packs/*.json` fixtures the carried suite reads): one green commit (SNAPSHOT.md is the
contract; the five-path re-pin procedure is printed there, including the blob:none-worktree
equivalent of `git archive`, plus `sync_engine_tests.py` + `precompile-engine.mjs`). Then re-run
the receipts — one command: `bash scripts/acceptance-run.sh` (staged, exit-coded, falsifiers
included). `CP_REPO=<clone> CP_ENGINE_SRC=<worktree>/colors/src node scripts/swap-test.mjs <sha>`
rehearses any future re-pin as one command.

## What THIS sitting changed (truthfully)
1. **The re-pin to `65673a00` is PREPARED, NOT ACTIVATED** (Part B — the four council drafts'
   convergent position; the Owner decides). The prepared copy (`cakepanz-4-prepared/` in the zip)
   carries all FIVE paths moved and proved: snapshot byte-identical to the tip (68 files; the one
   addition is `passclass.ts`), flex table byte-identical across both pins (99 rules, 17/17/42/23,
   the six Owner rules at 2, SS→NICKEL 0), the carried suite 406/406 with **no expectation
   changed** (the 12 new pass-class tests ride in green), four pack files byte-identical to the
   tip (the two pool packs also byte-identical to the old pin — carried, not re-baked). Its own
   SNAPSHOT.md is the contract; **activation is one step, on the Owner's word.**
2. **The default-off guarantee is PROVEN, not assumed** (Part B step 5): 60 keyed games — the
   old-pin and prepared-tree logs byte-identical (full event JSON, `scripts/gamelog-fixture.mjs`);
   lambda-0 tilt a no-op (60/60 with `passGap: 7` identical to absent); the control (node ON)
   differs 60/60. The shell passes `passClass`/`passGap` NOWHERE (grep EMPTY). The node never
   becomes the default on my word — sacks/drives shift explanation and the Owner rule it.
3. **D-1 fixed** — `playwright@1.57.0` is a declared devDependency (exact pin, the version the
   receipts' chromium-1200 matches); the HOME-global fallback is GONE from all seven entry
   points; a missing install fails loud with a named error. **Proven the way Inkling proved the
   defect: a fresh clone — `npm ci && npm run build && npm run battery` → 29/0/10/3 exit 0, no
   MODULE_NOT_FOUND; `npm run battery:node` → 26/26; `npm run test:engine` → 394/394.**
4. **D-2 fixed** — the shell falsifier now runs the child via the Part-D register (no transform
   flag on any Node) and classifies its output: no marker / child error / crash-without-law-
   evidence → COULD-NOT-RUN, named, **exit 1**; TAUTOLOGY also exits 1. Ports are per-process
   (PID-derived) so concurrent runs cannot cross-serve. **Proven both ways: on Node 24 all three
   cases die (FA/FB/FC → DIED, exit 0); the PRE-FIX tool under Node 26 reported TAUTOLOGY on all
   three and exited 0 — captured as the defect demonstration (its child printed `bad option` and
   the old code called that "not tested"); the FIXED tool under Node 26 runs the cases correctly.**
   The receipt-falsifier got the same law (a child that cannot run is COULD-NOT-RUN, never a
   false DIED) and APPLY-ASSERTED mutations (a moved target string throws with the file and the
   anchor — the F2/F3 lesson can never silently no-op again).
5. **D-3 fixed** — README line: the slice battery counts are 29/0/10/3 (was 26/10); the 323-test
   line is annotated as the PREVIOUS pin's count; the manifest gate prints **310 entries** at the
   shipped tree (VERIFY §6 said 300 — corrected to the number the gate prints; the prepared copy
   prints 317); CHECKSUMS/MANIFEST regenerated; `scripts/package-delivery.sh` read — it does what
   it claims (zip + unzip -t + sha256 roundtrip + gate re-run) but carried stale paths; it is
   refreshed as this sitting's packaging tool.
6. **Part D BUILT** — `scripts/precompile-engine.mjs` emits `src/engine-node/` (byte-identical to
   the snapshot except the ONE parameter property, proved inside the generator; gitignored,
   excluded from CHECKSUMS/MANIFEST); every node-side TS entry runs through
   `node --import ./scripts/node-port-register.mjs`; the register fails loud on a stale copy and
   regenerates once after any snapshot byte change. **The Node 24 / Node 26 table (VERIFY §D):
   `npm run battery:node` 26/26 on v24.22.3 AND v26.13.1; the shell battery 46/0 on BOTH;
   `npm run test:engine` 394/394 (shipped) and 406/406 (prepared) on BOTH.** The snapshot is
   never edited (diff against the pin = 0).
7. **F2/F3 re-derived, not carried** (Part C): the receipt falsifier ran fresh this sitting —
   F2 (N14 no-CDN) and F3 (N12a roundtrip) DIE on fresh copies with apply-asserted targets. The
   earlier settlement holds on this tree; Beam's "targets moved" concern is closed by the
   apply-assert guard (a moved target now throws; it can never report a false green).
8. **Part F (the saves lane)** — F5–F10 audited with file:line receipts (all six were already
   done; nothing redone). The one visible gap BUILT: **the older-build note** — a slot card whose
   save was written by another build now says so ("this save came from build X (running: Y) —
   logged picks hold; un-made picks may differ" — the F5 sentence, on the screen). Node law N21 +
   falsifier F7 kill it. **The browser-level states gap CLOSED**: `scripts/probe-saves-states.mjs`
   plants corrupt / newer-version / older-build saves in the REAL UI and receipts the verbatim
   refusals and the note with screenshots (5/5 PASS; shots/saves-states-*.png). The packs law
   (Ernie §6.5) landed: **N22** — the sim boots on a non-empty pool and the current-era pack
   stamps `pack53:0e78e4db382f9f` (invocation beside the hash); falsifier **F8** removes the pack
   and the law dies. Node battery 24→26 (N21, N22).
9. **The M3 swap ran BOTH directions at THIS sitting's pins** — the tip into the shipped tree:
   everything green (this tip is additive-default-off and the flex table is identical — last
   sitting's red-goldens outcome does NOT repeat here, and that is a measured fact, not a
   relaxation); the old pin into the prepared tree: the shell SURVIVES (node 26/26, build green,
   slice 29/0/10/3) and the tip-asserting suite fails its LOAD (passclass.ts missing → 228 ms
   load death). `diff -rq` outside src/engine CLEAN both ways. Receipts in VERIFY.txt §M3.
10. **P-360 refreshed** (the gh-pages README now also names the prepared pin and the 29-law
    battery), **P-254 confirmed standing** (ENVELOPE-FREEZE.md unchanged; `deviceId` still
    reserved, line 42), **P-363 re-proven fresh** (S26–S28 inside this sitting's shell-battery
    runs), **P-364 left at 430px** (the 560 figure exists nowhere; flagged again),
    **P-365/P-368 confirmed landed** (N14b/N19 green, case-insensitive TOKEN law, the bindings
    split with the EMPTY greps).

## The M3 swap test at this sitting's pins — both directions
- Tip (`65673a00`, 68 files) → shipped tree: engine suite 394/394 exit 0 (the old expectations
  pass against the new engine — the pools node did not change), node battery exit 0, build green,
  slice 29/0/10/3, diff CLEAN → VERDICT PASS. (Last sitting's rehearsal went red-by-design
  because THAT tip moved the flex/formation layer; this tip does not.)
- Old pin (`5c808472`, 67 files) → prepared tree: engine suite fails at LOAD (the tip-asserting
  suite imports `passclass.ts` — dead in 228 ms), node battery 26/26 exit 0, build green, slice
  29/0/10/3, diff CLEAN → VERDICT FAIL BY DESIGN (exit 2), the load failure being the red from
  the other side. Do not edit the law; do not edit the snapshot; the re-pin is the five-path move.

## The merge-readiness verdict (one line per screen, no euphemisms — receipts TRUE this sitting)
- **Draft Board** — perfect: 21 board laws + S25b (390px) + N15/N19/N20/N22; the needs row and the
  method tooltip have laws now.
- **Team Select + P-317** — the UI is done and receipted (team AND slot, same screen); the STORE
  cannot carry a custom order yet — the Architect's piece (§5 filed, exact old→new + HOW TO CHECK).
- **Saves** — good enough, improved this sitting: slots A·B·C, verbatim refusals, the restore law
  (S29/S30), and the NEW older-build note + the browser-level refusal screenshots.
- **Draft Complete / Hub / Week / Standings / Bracket / Book / Awards / Review / Stats / Guide /
  Cards / Settings / Share / Feed** — every one renders through the REAL season run (46/0), the
  season laws are proven node-side, the 390px walk is clean on all 14 screens, and the
  corrupt/newer refusals are the engine's own parse path. Honest label: the DOM fidelity is one
  screen-level assertion per screen (coarser than the board's); one more pass for pixel law.
- **Restore (the season's save/load)** — S29/S30 PASS through the real UI; the FB falsifier kills
  it when the definition is deleted (fresh receipt this sitting).

## What I do not know (UNKNOWN)
- Whether award grades ≥90 occur in a receipted season (the shimmer is wired; none observed).
- The w89 "90+ shimmer" source law (no source on disk).
- The Svelte-vs-Vue cutover cost delta (the Owner's measurement says tie — REPORTED, Owner).
- The override-variant pack hashes at the prepared pin are measured for the 2023–2025 pack only
  (the three invocations above); the 2016–2022 pack's override variants were not re-measured —
  UNKNOWN without running them (the as-baked value IS cited with its invocation).

## Open Owner questions (flagged, NOT fixed — the ruling is the Owner's)
1. **Light gold2 contrast — 1.51:1 on pale rose (1.65:1 on white) — FAIL** (AA 4.5; measured last
   sitting, unchanged bytes).
2. **Dark --text — the rose ink on plum = 3.17:1 — FAIL** at AA normal (large text passes).
3. Awards-brag content (MVP only as implemented).
4. The "Engine Value" vs "Model Value" label (ships "Model Value"; UNTOUCHED).
5. The 3-4 one-liner on Team Select (PROPOSED below; not shipped).
6. **P-364 wording** — the queue row says "board grid collapse under 560px"; the built (and
   falsified) law is the board's phone-grid collapse at **430px** (S25b + the FC falsifier). The
   560 figure appears nowhere in the tree. Named, not silently changed.
7. **The prepared re-pin** — activate or hold (the Owner's word; silence = this pin stands).

## Open Architect items (§5 filings in MERGE-GUIDE.md §7)
1. **P-317 store** — filed with exact anchors this sitting (START `order?`, the payload slot
   stamp, `restoreDraft` `rec.order ?? snakeOrder()`; SAFE ALONE + HOW TO CHECK per change) ·
   2. **OT clock()** (unchanged) · 3. **The parameter property** — STILL PRESENT (re-checked at
   both pins); after Part D it costs the node suites NOTHING (the precompile handles it); route 3
   would let the precompile step become a no-op and be deleted · 4. **The gravity/double-teams
   measurement** (unchanged) · 5. **The awards grades** (unchanged) · 6. **`deviceId?: string`** —
   reserved (P-254), the freeze text unchanged.

## Proposed copy (NOT shipped — the Ernie §9 one-liner, the Owner's word makes it settled)
Team Select, when a 3-4 is chosen: *"A 3-4 turns linebacker depth into a starting spot and does
not need a premium second tackle."* No number, no re-pricing — the gap ruling stands.

---

## cakepanz-6 verdict (2026-11-18 · this sitting · pin 5c808472 UNCHANGED, the re-pin NOT activated)

The shipped tree is green end-to-end at its pin **with the takeover wired**: engine 394/394, node
**28/28** (N23 the takeover law + N24 the strays law added), slice 29/0/10/3, shell 46/0 (the
390px walk green WITH the new slogan + wordmark), gates **PASS 319 entries** (the gate's own
line pasted in VERIFY §19.4), falsifiers **F0–F10 + FA/FB/FC all DIED** on Node v24.22.3 AND
v26.13.1. The prepared copy carries the same shell over the 65673a00 five paths: 406/406, 28/28,
29/0/10/3, 46/0, gates **PASS 324 entries** (the F-5 manifest FAIL fixed by regen-in-the-same-
change), falsifiers all DIED. D-1 re-proven from a clean clone (deliveries/receipts/
d1-fresh-clone.log); M3 both directions shipped under the cited names (swap-rehearsal-
5c808472.log = PASS exit 0; swap-m3-oldpin.log = FAIL BY DESIGN exit 2). The takeover ships with
its pixels: 38 in-browser laws + 16 screenshots (two teams × two modes × two viewports) + a
32-team contrast receipt with NO new failing text pair. Reported for the Owner: the label
questions (deliveries/partE-label-questions.md) and the gh-pages finding — the deployed
67-cakepanz tree's docs still name the OLD pin 4ca9a071 while its bytes are d3bd81d2 (the pin line was stale, the bytes were not), and its carried suite
runs 277/286 (the 9 reds are pre-re-pin flex expectations) — fix staged in
deliveries/gh-pages-fix/, the suite re-point is the Owner/Architect's call.
