# FIXLOG.md — what changed this sitting and why · Z.ai · 2026-11-17 (the portability + prepared-re-pin sitting)

## The one-paragraph summary
This sitting was discipline work: the portability fixes (D-1/D-2/Part D), the review findings
(D-3, M1, F2/F3), a PREPARED (not activated) re-pin to `65673a00`, the merge-cone re-verification
at both trees, the save-system shell work (the older-build note + the browser-level states probe +
the packs law), the satellites, and a full re-verification — everything receipted in VERIFY.txt.
The engine snapshot was never edited, at either pin.

## The changes, in order

1. **scripts/engine-node-gen.mjs + scripts/precompile-engine.mjs + scripts/engine-node-loader.mjs
   + scripts/node-port-register.mjs (NEW — Part D, route 2).** The snapshot's ONE parameter
   property (`platform/localstorage.ts:31`) made every node-side suite Node-24-only (strip-only
   Node cannot parse it; the transform flag died in Node 26). The generator emits
   `src/engine-node/` (byte-identical except that one constructor — proved inside the generator;
   fails loud if the parameter property ever spreads), and the register hook redirects every
   `src/engine/` import to the generated copy for node-side runs, with a freshness gate that
   regenerates once after any snapshot byte change and then fails loud. The snapshot is untouched.
2. **package.json** — `battery:node` → the register form (no transform flag); `precompile` script
   added; **`playwright: 1.57.0` exact-pinned in devDependencies (D-1)**.
3. **D-1 edits (7 files)** — batteries/slice1.battery.mjs, batteries/shell.battery.mjs,
   scripts/probe-{a11y,complete,motion-shots,node-counts,season-loop}.mjs: the
   HOME-global playwright fallback replaced by a NAMED loud error. A fresh clone now runs the
   whole chain (receipt: VERIFY §8).
4. **scripts/shell-falsifier.mjs (rewritten — D-2).** The child runs via the register; the output
   is classified: no marker / child error / crash-without-law-evidence → COULD-NOT-RUN, named,
   exit 1; TAUTOLOGY also exits 1; ports are per-process (PID-derived) so concurrent runs cannot
   cross-serve. Evidence: the pre-fix Node-26 TAUTOLOGY capture vs the fixed Node-24/26 runs.
5. **scripts/receipt-falsifier.mjs (rewritten — D-2 + F2/F3).** The child via the register; a
   child that cannot run is COULD-NOT-RUN, never a false DIED; `mustReplace()` mutations are
   APPLY-ASSERTED (a moved anchor throws with the file and the string); the scratch copies now
   carry scripts/ (the register needs it). F7 (the older-build note) and F8 (the packs law) added.
6. **scripts/swap-test.mjs** — the node battery runs via the register; the diff excludes the
   generated engine-node (regenerated inside the swapped copy).
7. **scripts/acceptance-run.sh** — every node-side step via the register; the precompile step
   added (2b); the falsifier step label F0–F8. (Lesson recorded: never edit this script while it
   is running — the first acceptance run died exit 127 when I edited the file mid-execution and
   bash's parse offset landed mid-line; the re-run is clean.)
8. **scripts/regen-manifest.mjs + scripts/gate-manifest.mjs** — `engine-node` excluded from both
   walks (a generated build artifact never enters CHECKSUMS/MANIFEST).
9. **.gitignore (NEW)** — src/engine-node/, node_modules/, .svelte-kit/.
10. **batteries/node.battery.mjs** — N21 (the older-build note law: silent for the running build,
    named for another build, the F5 sentence in the note, the panel renders it) and N22 (the packs
    law: the pool is non-empty and the current-era pack stamps pack53:0e78e4db382f9f — the
    invocation beside the hash). Node battery 24→26.
11. **src/lib/port/savesApp.ts + src/lib/components/Saves.svelte** — the older-build note (Part F):
    `olderBuildNote(sum, runningVersion)` + the card render. No engine bytes touched.
12. **scripts/probe-saves-states.mjs (NEW)** — the browser-level saves-states receipts (5/5 PASS,
    screenshots). Closes the matrix gap named in the last delivery.
13. **scripts/pack-hash-cite.mjs (NEW, both trees)** — the pack53 hash WITH its invocation, three
    configuration variants; a bare hash claim can no longer hide.
14. **scripts/gamelog-fixture.mjs (NEW, both trees)** — the default-off proof fixture (60 keyed
    games, full event JSON; the gap-replay and absent-vs-present checks on trees that carry the
    node).
15. **Docs rewritten for truth at this sitting's numbers:** SNAPSHOT.md (both trees — the M4
    contract: the pin, byte-identity, pack-hash citations, the five-path procedure, the register
    hook, D-1/D-2 behaviour, the swap habit), SHELL-STATUS.md, MERGE-README.md, README.md (the
    stale 26-pass line + the 323 annotation), VERIFY.txt (this file's companion), and the P-360
    gh-pages fix file.
16. **The prepared copy (`cakepanz-4-prepared/`)** — the five paths moved and proved (Part B); its
    own SNAPSHOT.md; nothing activated.

## What was verified (the one-command receipt)
`bash scripts/acceptance-run.sh` — staged, exit-coded: npm ci → engine suite → precompile → node
battery → build → distfile → preview-hash → slice battery → shell battery → contrast/motion/count
probes → BOTH falsifier suites → manifest regen + gates + numerals ×2 → optional swap test.
Every step exit 0. Full output: ACCEPTANCE-RECEIPTS.txt.

## What remains blocked / open
- The Part-J table (DELIVERY-DECISIONS.md) — 19 rows, each with its recommendation; the Owner rules.
- P-317's store piece — the §5 filed (MERGE-GUIDE §7 + the inbox file); the picker waits.
- LOADING as a dedicated law; the 2016–2022 override-variant hashes at the prepared pin; the
  state-bucket test before any GLM-default decision — named UNKNOWNs, not hidden ones.
