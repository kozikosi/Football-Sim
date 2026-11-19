# FIXLOG.md — what changed each sitting and why · Z.ai · Executor

## The cakepanz-7 sitting (2026-11-18) — Slice 3 (P-316) + the receipt hygiene

### The one-paragraph summary
This sitting closed out Cakepanz-6's two defects and built Slice 3's missing piece: the gate is
now robust to its own receipts (Part A — the receipt layer joined the self-reference exclusion,
mirrored in regen), the two partB receipts were regenerated at the final state (the FAIL lines
are gone), the prepared tree's door sign names its own pin (Part B — README/SHELL-STATUS say
65673a00 / 68 files with the PREPARED-NOT-ACTIVATED banner), the no-arbitrage line was verified
(Part B2 — `bad.length <= 18`, untouched), and Slice 3 landed the boot rehydration of the FULL
AppState with three new node-side laws (Part D — N25 the HYDRATE law, N26 the tooltip, N27 the
needs row; the node battery is 31 laws). The engine snapshot was never edited, at either pin;
the flex table, the protected constants and every Owner ruling stayed untouched.

### Part-I — THE RECEIPT LAW (this package's law, named here as ordered)
**A receipt is the raw stdout of the tool at the final state; if the state changes, the receipt
is rewritten.** Its mechanical half is the gate hardening: receipts are part of the meta-layer
that the integrity system must not verify (they DESCRIBE it), so `deliveries/receipts/` and any
`gate-manifest-*.log` joined the self-reference exclusion that MANIFEST.txt / CHECKSUMS.txt /
ACCEPTANCE-RECEIPTS.txt already ride — in BOTH the gate's converse walk and regen's walk, in
both trees. A receipt written into the tree can therefore never fail the NEXT gate run, and a
receipt is always rewritten to describe the state it certifies. The stress test is two
consecutive gate runs, both PASS, with the receipts present in the tree (VERIFY §19.10 + §20.1).

### The changes, in order
1. **scripts/gate-manifest.mjs + scripts/regen-manifest.mjs (both trees — Part A).** The receipt
   skip beside the existing shots/ skip: `rel.startsWith('deliveries/receipts/')` and a
   `gate-manifest-*.log` basename test (`isReceipt()`), in the gate's manifest loop AND converse
   walk, and in regen's walk. Nothing else changed (the D4 dist law, the boot-target law, the
   SKIP set all stand). Root cause (Beam's, verified against the source): the converse walk
   skipped shots/ but NOT the receipt path, so the cakepanz-6 receipts — written into
   deliveries/receipts/ after their regen — failed the NEXT gate run with
   `MANIFEST FAIL (unlisted): deliveries/receipts/gate-manifest-shipped-PASS-325.log`.
2. **src/lib/port/hydrateApp.ts (NEW, both trees — Part D).** The auto layer over the engine's
   own save contract: `autosaveDraft` / `autosaveWeek` write the WHOLE state enveloped by the
   engine's own `serialize()` to the non-slot keys `sim:nfl:autosave:draft` /
   `sim:nfl:autosave:week`; `readAutosave` classifies with the engine's own `restore()` and
   returns refusals VERBATIM (corrupt-never-repair); `clearAutosaveWeek` kills a stale season
   autosave when a new draft begins. The storage module is injectable (the node battery runs the
   exact path without a browser).
3. **src/App.svelte (both trees — Part D).** The composition only: `hydrateBoot()` on boot (a
   saved draft lands back on the board through the same loadDraft path the Saves panel uses; a
   saved season resumes through sessionFromWeekPayload → seasonFacade.resume and lands on the
   hub), and the autosave writes at every state change (START/LOAD/PICK/UNDO/begin/step/restore/
   manual save). Settings already persisted (port/settings.ts) — settings + draft + season is
   the full AppState. A refresh mid-draft now lands back on the same board.
4. **batteries/node.battery.mjs (both trees — Part D).** N25 (HYDRATE: START a draft, three real
   picks, the autosave read back into a FRESH store — the rendered board + header are
   sha-identical across the reload, the next pick is the user's, the season half resumes to the
   same week, a corrupt autosave is refused verbatim, the composition is asserted on the App
   source), N26 (the tooltip's number IS the engine's own gone chance, row by row; hover AND
   focus; the method names picksBetween/sims and hardcodes no percentage), N27 (the needs row's
   open set IS the engine's openSlots; one pick closes exactly one slot; clickable filter;
   sticky). Node battery 28 → **31 laws**.
4b. **batteries/shell.battery.mjs (both trees — the S29 locator made phase-blind).** With the boot
   rehydration live, the saved week may come back BEFORE the click — the hub resumes from the
   autosave and its restore button reads RESTORE (phase running), not RESTORE A SAVED WEEK (phase
   none). The law's intent is unchanged — the saved week comes back through the real UI — and
   BOTH paths assert the running hub. The pristine-c6 tree with its own unmodified battery
   reproduces the cakepanz-6 green receipt in this sandbox; only the S29 locator changed.
5. **deliveries/slice3/README.md (NEW, both trees — Part D).** The Slice README with the slice
   laws, the build note (what was already built vs what this sitting added) and before/after.
6. **dist/ rebuilt in both trees** (`npm run distfile`): the boot artifact carries the
   rehydration (dist/assets/index-DsG2PtP2.js; the CSS asset unchanged — no CSS moved).
7. **README.md (both trees):** the battery count 28 → 31 with the three new laws named; the
   Slice line now says the board chrome AND the boot rehydration are receipted.
8. **SHELL-STATUS.md (both trees):** the cakepanz-7 sitting named; 31/31; the s3 row carries the
   hydration receipt; port/ is 21 modules.
9. **PART B — the prepared door sign:** cakepanz-4-prepared/README.md:1,3,8 and
   SHELL-STATUS.md:1 name 65673a00 / 68 files, each with the banner ("this is the PREPARED, NOT
   ACTIVATED copy; SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the
   Owner says so"). SNAPSHOT.md was already correct and is untouched. NO pin changed to
   65673a00 in the shipped tree; nothing activated.
10. **VERIFY.txt:** §19.10 (the two partB receipts, rewritten) + §20 (this sitting's block).

### What was verified
Engine suite 394/394 (shipped) + 406/406 (prepared) on Node v24.22.3 AND Node v26.13.1;
battery:node 31/31 both trees both Nodes; the F0–F10 receipt falsifier on both Nodes (F9 + F10
both DIE); the D-1 fresh-clone receipt (clone → npm ci → battery + engine suite) — every command
and its output pasted in VERIFY §20. The M3 logs stand unchanged
(deliveries/receipts/swap-rehearsal-5c808472.log PASS/0, swap-m3-oldpin.log FAIL/2-by-design).

### What remains blocked / open
Nothing new is blocked by this sitting. The standing open list is the cakepanz-6 section below,
unchanged, plus: the deployed gh-pages tree's re-pin placement is PART C of this sitting's
VERIFY (§20.3).

---

## The cakepanz-6 sitting (2026-11-17) — the portability + prepared-re-pin sitting (history)

### The one-paragraph summary
This sitting was discipline work: the portability fixes (D-1/D-2/Part D), the review findings
(D-3, M1, F2/F3), a PREPARED (not activated) re-pin to `65673a00`, the merge-cone re-verification
at both trees, the save-system shell work (the older-build note + the browser-level states probe +
the packs law), the satellites, and a full re-verification — everything receipted in VERIFY.txt.
The engine snapshot was never edited, at either pin.

### The changes, in order

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

### What was verified (the one-command receipt)
`bash scripts/acceptance-run.sh` — staged, exit-coded: npm ci → engine suite → precompile → node
battery → build → distfile → preview-hash → slice battery → shell battery → contrast/motion/count
probes → BOTH falsifier suites → manifest regen + gates + numerals ×2 → optional swap test.
Every step exit 0. Full output: ACCEPTANCE-RECEIPTS.txt.

### What remains blocked / open
- The Part-J table (DELIVERY-DECISIONS.md) — 19 rows, each with its recommendation; the Owner rules.
- P-317's store piece — the §5 filed (MERGE-GUIDE §7 + the inbox file); the picker waits.
- LOADING as a dedicated law; the 2016–2022 override-variant hashes at the prepared pin; the
  state-bucket test before any GLM-default decision — named UNKNOWNs, not hidden ones.

## cakepanz-8 (2026-11-18) — the cakepanz-7 review closure (A1–A9) + Block B (P-337)

### What changed (every change apply-asserted; the anchors live in WHAT-CHANGED.md at the package root)

1. **src/App.svelte (A1, both trees)** — the two-line shape: the `go()` redirect (`board` on a
   done draft → `complete`) and the unconditional `go('hub')` in hydrateBoot (the c7
   `if (!r.draft)` gate deleted). The blank board is gone; the four outcomes are receipted.
2. **batteries/node.battery.mjs (both trees)** — N28 (RESUME) + N29 (DONE-DRAFT) beside N25; the
   battery is 33 laws.
3. **scripts/receipt-falsifier.mjs (both trees)** — F11 (the c7 gate planted → N28 dies) and F12
   (the redirect deleted → N29 dies); the falsifier is F0–F12.
4. **batteries/shell.battery.mjs (both trees, A2)** — S29 split: the boot path MANDATORY when an
   autosave exists; S31 the manual path as its own law; S30 over both. The tautology is closed:
   46/1 with the boot rehydration deleted, 47/0 restored.
5. **src/App.svelte + DraftBoard/BoardRow/BoardFooter .svelte (Block B, both trees)** — the
   late-draft simple board (P-337): the user's-10th-pick flip, the one-number row + gone% + the
   DRAFT control, the "Best available" collapse, the SORT toggle, the honest switch line, the
   FULL BOARD door (sticky full). Render layer only; zero engine files.
6. **batteries/late.battery.mjs (NEW, both trees)** — the six P-337 laws (L1–L6); `npm run
   battery:late`.
7. **scripts/falsify-late.mjs (NEW, both trees)** — F0-late clean baseline + F13-late
   (always-on plant → L1 DIED); two staged builds, PID ports, apply-asserted.
8. **scripts/probe-a1-landing.mjs (NEW, both trees)** — the done-draft boot + DRAFT-nav probe
   (runs with the Part-D register).
9. **scripts/acceptance-run.sh (both trees, A4)** — the stale expectations re-quoted (33/33,
   F0–F12, S1a–S31 47/0) and the late battery (step 8b) + its falsifier (step 13b) joined the
   staged run.
10. **README.md + batteries/slice1.battery.mjs (both trees, A5)** — the stale "284 tests"
    corrected to the measured 394/406.
11. **README.md (both trees, A6)** — the "Run it" shell-battery line carries the REQUIRED
    register; the battery list carries the final counts (33 node laws, 6 late laws).
12. **FIX-RECEIPT.md (×3 copies, A7)** — "ONLY those two files" → "those two files plus this
    receipt"; the zip not re-cut.
13. **Every count-bearing doc (A8)** — SHELL-STATUS's verdict re-quoted at the final state
    (47/0 · 29/0/10/3 · late 6/6 · 33/33 · 394/406 · gates 314/319 ×2); VERIFY gained §21 (this
    sitting's block, every stdout pasted) + dated SUPERSEDED markers on the 319/324/326/330
    prose; MERGE-README carries the c8 addendum.
14. **deliveries/receipts/ (both trees, A3)** — c8-d1-fresh-clone.log REGENERATED at the final
    state (ends green); the old log kept as c7-d1-fresh-clone-attempt1.log; the c8 receipts
    joined (batteries, falsifiers, A2 red/green, A1 probes, gates).
15. **START-OF-CHAT-ZAI.md (A9)** — the three copies byte-identical, the RECEIPT LAW sentence
    ONCE, §2 rewritten for this sitting.
16. **dist/ (both trees)** — rebuilt at the final code state; byte-identical to each other;
    single.html sha256 1529a003…e737. MANIFEST/CHECKSUMS regenerated in the same change as the
    files (314 shipped / 319 prepared), gates PASS ×2 each.

### What was verified (the one-paragraph receipt)
Engine 394/394 + 406/406; node battery 33/33 ×2; shell 47/0 ×2 (46/1 under the A2 mutation);
slice 29/0/10/3 ×2; late 6/6 ×2; falsifiers F0–F12 all DIED ×2 + falsify-late (F0-late 6/6, F13
DIED); A1's four outcomes green; A2's red run red for the RIGHT reason; fresh clone green
end-to-end; gates PASS (314) ×2 shipped and PASS (319) ×2 prepared. VERIFY §21 carries the stdout.

### What remains blocked / open
- Block C (R-13) — opens only after Blocks A and B are pushed (the Owner relays the zip).
- The seven Owner decisions + the Architect's five items (SHELL-STATUS §open lists; unchanged).
- The gh-pages placement (the c7 staged fix; STILL the Owner's click).

## 2026-11-18 — CAKEPANZ-8.1 (the review-closure round; the order: zai-cakepanz-8.1-2026-11-18.md @ 596bd94f)

Fixed, both trees (apply-asserted): 4.1 the simple-row detail (the dead toggle renders — hy4's shape,
`data-testid="cp-simple-detail"`, `aria-controls`), 4.2 the completing-pick handoff (`go('complete')` +
the phase guard in `refresh()`), 4.3 the fullBoard persistence (the ONE port exception: `settings.ts`
additive field; `startDraft` resets, `loadDraft` does not), 4.4 `syncFromHash` rides `go()`, 4.5(i) the
simple row's number tracks the active sort (WINS/PRIO/OVR caption via title+aria-label), 4.6 the Hub
parens, 4.7 the caption rides 4.5, 4.8 the honest line stays verbatim. Hygiene: 5.1 the numerals one-word
fix (CLEAN ×2 ×2 trees — the receipt that was false at the c8 bytes), 5.2 ACCEPTANCE-RECEIPTS regenerated
end-to-end ×2, 5.3 the 21d81b7b… hash corrected (measured 1b9bea5f…, cmp ×3), 5.4 SNAPSHOT 26/26→33/33
+ prepared 25/25→33/33 + its 46/0→47/0, 5.5 f4 renamed attempt1 + f5 annotated, 5.6 the slice per-run JSON
redirected (the delivered copy kept as history; counts hold 314/319), 5.7 the citation audit + transitions
matrix (VERIFY §22). Laws: L7/L8/L9 (late battery 9/9/9/9) + L10; falsifiers F14–F16 (all DIED;
F13's anchor updated for the 4.3 drift, noted). Final-state prints: engine 394/406 · node
33/33 · shell 47/0/47/0 · slice 29/0/10/3/29/0/10/3 · gates PASS
314/319 ×2 · numerals CLEAN ×2 ×2 · dist 670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1 · A2 mutation 46/1 S29 → 47/0 ·
fresh-clone composite green (m1) · the acceptance-run composite STARTED but not completed inside this
sitting's budget — the ONE open item (5.2's pointer fallback applied; the next sitting finishes k1/k2).
Receipts: receipts/partH-c8-1/.
