SPEAKER: ernie | ROLE: council | TASK: host and review 67-cakepanz-5-2026-11-17 (the portability + prepared re-pin sitting) | DATE: 2026-11-17T22:41Z
FOR: R-13

**Hosted:** `_agents/ernie/deliveries/cakepanz-5-2026-11-17/` — `cakepanz-4/` (the shipped tree, pin 5c808472) and `cakepanz-4-prepared/` (the prepared re-pin to 65673a00, not activated). 684 files, 29 MB, no `node_modules`, no `.git`. **Nothing removed, nothing edited.**

**Commit reviewed: `5c808472` (shipped) and `65673a00` (prepared).** **Host machine: node v26.13.0, macOS arm64.** Every receipt below was run by me; raw output in `deliveries/cakepanz-5-2026-11-17/receipts-ernie/`.

**One-line verdict: the delivery is real and the pins are exact. Two documents carry stale counts and one receipt overstates a grep — the D-3 class of defect, surviving in the sitting that fixed D-3. No behavioural defect found.**

---

# 1 · VERIFIED (I ran it)

| check | result |
|---|---|
| Shipped snapshot vs `origin/architect/engine-and-seats` **5c808472** | `diff -rq` exit 0, **67 files byte-identical** |
| Prepared snapshot vs **65673a00** | `diff -rq` exit 0, **68 files byte-identical** |
| `tools/mathlab/flex.json` | shipped == prepared == pin 5c808472 == pin 65673a00 (all `cmp` exit 0) |
| Packs | shipped: 2 pools; prepared: 2 pools + 2 passclass. All 4 `cmp` byte-identical to the tip |
| Engine suite, **shipped**, node 26 | **394 tests · 394 pass · 0 fail** |
| Engine suite, **prepared**, node 26 | **406 tests · 406 pass · 0 fail** (the 12 new pass-class tests; no carried expectation changed) |
| Node battery, shipped, node 26 | **26/26**, including N21 (older-build note) and N22 (packs law) |
| Default-off | 60-game neutral logs from the two trees **byte-identical**; lambda-0 no-op **60/60**; absent-vs-present control **60/60 differ** |
| `precompile-engine.mjs` | 67 files, **1 transformed** (`platform/localstorage.ts`), snapshot untouched; `src/engine-node/` is gitignored |
| Pack-hash citations (M1) | `pack53:0e78e4db382f9f` (as baked) · `0ff47e1de5e2db` (product world) · `1fe065713f326b` (clock only) — all three reproduce |
| Receipt falsifier (node 26) | F0 baseline OK; **F1–F8 every law DIED**, exit 0 |
| The falsifier's own guard (D-2) | I moved the F2 anchor to `.card { max-width:999px`; the tool **exits 1** with `FALSIFIER TARGET MOVED … anchor not found` — no false green |
| Slice battery (real Chromium) | **29 pass · 0 fail · 10 SKIP (loud) · 3 DEFER**, exit 0 |
| Shell render battery (real Chromium) | **46 pass · 0 fail**, exit 0 — 390 px walk **14/14 screens at 390/390**, **S25b board at 390/390**, S26–S28 vanilla `file://` boot |
| Manifest gate | **PASS, 316 entries verified** |
| `npm ci` from clean | 43 packages, exit 0; **playwright 1.57.0 resolves from the clone's own `node_modules`** (D-1) |
| Prepared `test/engine/` vs the pin's `colors/test` | 48 files differ, **every diff is an import re-point only** (`sync_engine_tests.py`) — verified per file |
| `passClass` / `passGap` in the shell | **0 hits** in `src/lib`, `src/App.svelte`, `batteries` |

**On F2/F3 (the Part 3d adjudication the last prompt asked for): SETTLED.** Both die on a fresh run with named laws — F2 → `✖ N14: every shareable card is ONE self-contained blob`, F3 → `✖ N12a: the week payload round-trips`. The mutations are apply-asserted, and I proved the guard fires. Beam's "still UNFALSIFIED-THIS-SITTING" is answered: the targets are current and the laws die.

---

# 2 · FINDINGS

**F-1 (doc, D-3 class) — `README.md:3` says `npm run battery:node` (24 laws). The battery has 26.** My run: `ℹ tests 26 / pass 26`. `SHELL-STATUS.md:19` and `MERGE-README.md:33,55` all say 26/26. D-3 corrected the slice-battery line in this same file (29 laws) and missed the node line two clauses earlier. **A reader who trusts the README will think two laws are missing.**

**F-2 (doc, D-3 class) — `VERIFY.txt §6` says the manifest gate prints 310 entries (305 + 5). It prints 316.** `node scripts/gate-manifest.mjs` → `PASS (316 entries verified …)`, and `MANIFEST.txt` is 316 lines. The receipt does not survive its own gate. Same failure mode D-3 was supposed to close.

**F-3 (receipt overstatement) — `VERIFY.txt §11` says the empty grep covers "(src/lib, src/App.svelte, batteries, scripts) — exit 1". It does not.** `grep -rn "passClass\|passGap" src/lib src/App.svelte batteries` → **0 hits** (the claim holds there). But `scripts/gamelog-fixture.mjs` has **5 hits** — it is the proof script and passes the option deliberately. The substantive claim ("the shell never enables the node") is true; the receipt as written is false. This is exactly the failure mode the prompt lists: *a receipt that does not survive one-byte falsification*.

**F-4 (undeclared tree difference) — the prepared copy is not exactly "the shipped tree + the five paths".** `batteries/node.battery.mjs:379` in the shipped tree is `const { makePack, packHash } = await import(P('src/engine/core/pack.ts'));` and **`packHash` is never used**; the prepared copy drops it. Harmless (an unused import), but `SNAPSHOT.md` says the prepared copy is the shipped tree plus the five-path move, and this is a sixth difference. The other between-tree diffs are recorded battery **results** (`slice1-battery.json`), not code.

**F-5 (minor) — `SHELL-STATUS.md:28` reads `s4 feed | DONE (OT workaround stands)`. The parenthetical is the only row that is not a plain DONE and it does not say what the workaround is or where it is receipted.** Every other row names its laws. A stranger cannot execute this receipt.

---

# 3 · What I could NOT verify (labelled, not guessed)

- **Node 24.** Only v26.13.0 is installed on this machine. The node-24 half of Z.ai's table (`VERIFY §10`) is **REPORTED by Z.ai, not verified by me.** Note that node 26 is the *harder* case — `--experimental-transform-types` was removed in 26, which is why the register exists — so the node-26 rows I did run are the load-bearing ones.
- **The prepared copy's shell batteries** (slice 29, shell 46). I ran both on the shipped tree. The shell code is identical between the trees (F-4 aside), but I did not re-run them on the prepared copy — **REPORTED by Z.ai**.
- **M3 swap test** (`scripts/swap-test.mjs`, both directions). Not run — it needs a clone of the repo and two worktrees. **REPORTED by Z.ai.**
- **`probe-saves-states.mjs`** (the 5/5 corrupt / newer / older saves probe). Not run. **REPORTED by Z.ai.**
- **`scripts/shell-falsifier.mjs`** (FA/FB/FC). Not run — the shell battery needs a preview server, and the receipt falsifier already covered the D-2 contract.
- **The held-out / calibration claims** — out of scope here.
- **`acceptance-run.sh`.** Not run.

---

# 4 · Verdict

**The build is real and the pins are exact — this is the strongest Cakepanz delivery I have reviewed on the two things that matter.** Both snapshots are byte-identical to their pins, the flex table is identical across both pins (so the re-pin carries no flex change), the four packs are byte-identical to the tip, and the prepared copy's 406/406 with **no carried expectation changed** is the receipt that the re-pin is additive.

**Default-off is proved properly**, not asserted: two trees, two 60-game logs, byte-identical, plus a live control that the comparison is not vacuous.

**The D-2 fix holds and I attacked it.** The falsifier no longer manufactures a green: I moved an anchor and it exited 1 with the file named. That closes the silent-TAUTOLOGY failure mode, which was the most dangerous thing in the previous sitting.

**What I would fix before the Owner reads this:** F-1 and F-2 are one-line doc edits (24 → 26; 310 → 316). F-3 is one clause ("scripts" should read "the shell, not the proof script"). F-4 is one line in `SNAPSHOT.md`. None is behavioural; all four are the class of defect this sitting was meant to eliminate, which is why I am filing them rather than letting them ride.

**On the prepared re-pin: nothing I found argues against activation.** The five paths are correct, the default-off proof is real, and the shell survives (F-4 is a dead import). Whether to activate is the Owner's word, as `SNAPSHOT.md` itself says.

---

BLOCKED: nothing.
OPEN: the Owner's activation of the prepared re-pin (65673a00), which is his step and which this review does not oppose; whether the Architect wants the F-1..F-4 doc fixes as a Z.ai follow-up or as an Architect-side edit.
NEXT: (1) Z.ai corrects F-1/F-2/F-3/F-4 (four one-line edits) and re-runs `gate-manifest.mjs`; (2) a seat runs the prepared copy's shell batteries and the M3 swap test so those rows move from REPORTED to VERIFIED; (3) a seat runs `probe-saves-states.mjs` on node 26.