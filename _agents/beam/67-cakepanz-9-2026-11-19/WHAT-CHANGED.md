# WHAT-CHANGED.md — cakepanz-8 (2026-11-18; + the cakepanz-9 sitting, 2026-11-19 — its section rides at the end) — one entry per ordered item, A1–A9, + Block B

Every change below was applied by an apply-asserted patch script (an anchor that moved throws —
the F2/F3 lesson); every receipt is the raw stdout of the tool at the final state, mirrored in
`receipts/partH-c8/` and in the trees' `deliveries/receipts/c8-*.log`. Block C (R-13) is NOT in
this zip: it opens after Blocks A and B are pushed (the Owner relays this zip).

---

## A1 — PRODUCT DEFECT: a mid-season refresh lands on a blank draft board — CLOSED

- **Anchor:** `src/App.svelte` (both trees) — `go()` (the c7 one-liner) and `hydrateBoot()`'s
  `if (!r.draft) go('hub');`.
- **Before:** mid-season both autosaves exist, so `loadDraft()` had already routed to the board
  and the hub branch never fired; `refresh()`'s `try/catch` swallowed `goneOdds`'s done-draft
  throw ("goneOdds: it is not the user's pick"), `vmStore` stayed null, and
  `{:else if screen === 'board' && $vmStore}` rendered nothing — topbar + nav + an empty page.
- **After (the ordered two-line shape):**
  - `go()` gains `if (s === 'board' && store.getState().status === 'done') s = 'complete';`
    (a finished draft has no board: the Complete screen owns it);
  - `hydrateBoot()`'s conditional becomes unconditional `go('hub');` (a resumed season always
    lands home).
- **Laws:** N28 (RESUME — both autosaves land the running hub; the c7 gate asserted GONE) and
  N29 (DONE-DRAFT — a done draft with no week reloads DONE and the redirect + Complete branch
  are asserted) beside N25 in `batteries/node.battery.mjs`; the battery is 31 → **33/33** on
  both trees.
- **Falsifiers:** F11 plants the c7 gate back → ✖ N28 DIED; F12 deletes the redirect →
  ✖ N29 DIED (`scripts/receipt-falsifier.mjs`, F0–F12 all DIED, exit 0, both trees).
- **Outcome receipts (pre-fix red → post-fix green):**
  - pre-fix mid-season: `{"screen":"board","rows":0,"storeStatus":"done","picks":1024}` —
    `receipts/partH-c8/b8-a1-reproduce.log`;
  - pre-fix mid-draft control: rows 60, drafting — `receipts/partH-c8/b8b-middraft-control.log`;
  - post-fix: mid-season → `{"screen":"hub","hub":1}` (+ the real running season through the
    SEASON nav); done-draft → complete, record rendered; DRAFT nav → complete again;
    mid-draft control unchanged — `receipts/partH-c8/f4-a1-postfix-probes.log` +
    `f5-late-and-a1-final-shipped.log` (probe: `scripts/probe-a1-landing.mjs`, NEW, register-run).

## A2 — LAW TAUTOLOGY: S29 could not fail — SPLIT

- **Anchor:** `batteries/shell.battery.mjs` (both trees), the S29 block.
- **Before:** S29's locator was phase-blind — it passed via the manual RESTORE A SAVED WEEK
  fallback even with `void hydrateBoot();` deleted (Ernie's measurement: 46/0 over a broken boot).
- **After:** S29 = the BOOT path, MANDATORY when an autosave exists (the autosave keys are read
  before the reload; no manual fallback in the law); S31 = the manual path, its own law (both
  keys cleared, reload, RESTORE A SAVED WEEK brings the hub back); S30 = zero page errors over
  both legs. The battery is 46 → **47 laws (S1a–S31)**.
- **Receipts (the runs the order asked to be pasted):** with the boot rehydration deleted and
  rebuilt — `FAIL S29 … the boot did NOT resume the hub` → **46 pass · 1 fail**; restored and
  rebuilt — **47 pass · 0 fail**. `receipts/partH-c8/f8-a2-red-shell-battery.log` (red) +
  `f8-a2-green-shell-battery.log` (green). The mutation ran on the shipped tree; the prepared
  tree receipts the green 47/0 (`g2-shell-battery-final-prepared.log`).

## A3 — RECEIPT: the D-1 fresh-clone log ended exit=1 — REGENERATED

- **Anchor:** `cakepanz-4/deliveries/receipts/c7-d1-fresh-clone.log` — its tail carried the
  FIRST-ATTEMPT browser legs (`ERR_CONNECTION_REFUSED`, `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`).
- **After:** the whole fresh-clone receipt re-run ONCE, uninterrupted, on a fresh copy of the
  FINAL shipped tree: npm ci → precompile → node battery → engine suite → distfile → slice
  29/0/10/3 → late 6/6 → shell 47/0 → regen 314 → gate PASS (314) — EVERY leg exit 0, the log
  ends green: `deliveries/receipts/c8-d1-fresh-clone.log`
  (mirror: `receipts/partH-c8/f12-d1-fresh-clone-final.log`).
- The old log is kept, renamed `c7-d1-fresh-clone-attempt1.log` (history, honestly named); the
  c7 browser re-run log is untouched.

## A4 — DOC: acceptance-run.sh printed stale expectations — FIXED

- **Anchors:** `scripts/acceptance-run.sh` (both trees) lines "expect 24/24: 23 carried + N20 the
  F8 law" and "the receipt falsifiers F0–F8"; also the S1a–S30/46/0 step label.
- **After:** "expect 33/33: 31 carried + N28 the RESUME law + N29 the DONE-DRAFT law — the
  cakepanz-8 A1 laws"; "the receipt falsifiers F0–F12 (… F11/F12 the cakepanz-8 A1 falsifiers)";
  "the shell battery S1a–S31 (… 47/0 …)". The late battery joined the staged run as step 8b and
  its falsifier as step 13b (`npm run battery:late` / `scripts/falsify-late.mjs`).

## A5 — DOC: "284 tests" survived in two live files — FIXED

- **Anchors:** `README.md` §4 ("the pinned commit's 284 tests") and
  `batteries/slice1.battery.mjs:12` header (both trees).
- **After:** README §4 → "394 tests at the shipped pin 5c808472, 406 at the prepared pin
  65673a00 (the stale 284 line corrected, cakepanz-8 A5)"; slice battery header → "394/394 at
  the shipped pin, 406/406 at the prepared pin". `CHECKSUMS-slice*.txt` and
  `deliveries/gh-pages-fix/README.md` left alone (per-slice history), as ordered.

## A6 — DOC: the README's shell-battery line omitted the register — FIXED

- **Anchor:** `README.md` "Run it" (both trees): `node batteries/shell.battery.mjs`.
- **After:** `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`, with
  the reason named (without the register, any Node dies with ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX
  at the engine's parameter property).

## A7 — DOC: FIX-RECEIPT said "ONLY those two files" — FIXED (zip NOT re-cut)

- **Anchor:** the sentence in all THREE byte-identical copies (package
  `receipts/partC/gh-pages-fix/` + both trees' `deliveries/gh-pages-fix/`; sha256 21d81b7b… — **SUPERSEDED; measured 1b9bea5f… (the cakepanz-9 order's A7b — the mark the 8.1 ledger claimed at :217, now actually in place)**).
- **After:** "the zip carries those two files plus this receipt (three files total; the c8 A7
  correction — the F3 listing says the same)". The zip `67-cakepanz-gh-pages-fix-c6.zip` is
  untouched.

## A8 — FULL SWEEP of the gate-count prose — DONE

- **Anchors:** `SHELL-STATUS.md` §battery-verdict (the 319/324 lines), `VERIFY.txt` §6 (:69–71),
  §19.2 (:328), §19.4 (the "(FINAL)" 326/330 prose), §20.2 (the 316 gate line), §19.10 (the
  311/316 pastes), plus the README's node-law count.
- **After:** every one of those lines now carries a dated CAKEPANZ-8 CORRECTION/SUPERSEDED
  marker pointing at the final state, and `VERIFY.txt` gained **§21** — this sitting's block,
  with the gates' own output pasted: shipped **regen 314 → PASS (314) ×2**, prepared
  **regen 319 → PASS (319) ×2**; README's node battery count 31 → **33** (N28/N29 named).
  Dated history left alone per the order: CHECKSUMS-slice*.txt, deliveries/gh-pages-fix/
  README.md, MERGE-README's c5/c6 receipt lines (a c8 addendum carries the current numbers).

## A9 — DOC: the RECEIPT LAW sentence doubled — NORMALIZED

- **Anchor:** the package-root `START-OF-CHAT-ZAI.md` (== the shipped-tree copy) carried the
  sentence twice in §5 rule 3 plus a stray blank line; the prepared copy carried it once; the
  three copies differed.
- **After:** all three copies are byte-identical — sha256
  `3c0dfd3f4d505ba4e24ead0fec07ee01097faff6ebd16edf5d4c1afc15656bde` — **SUPERSEDED; the measured three-copy sha is 15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec (the cakepanz-9 order's A8b)** — the sentence rides §5
  rule 3 ONCE, and §2 is rewritten for this sitting (MUSE re-files it on `council/muse`).

## BLOCK B — P-337: the late draft should be simple — BUILT (render layer only)

- **The flip:** the USER's own 10th pick — `myPicks = record.picks.filter(p => p.team ===
  userTeam).length`, `lateMode = myPicks >= 10 && status !== 'done' && !simpleOff` (a user
  picking at 1.32 still gets ten deep rounds; the overall-320 reading is flagged for the Owner
  in README-DELIVERY — the order's §7 anticipated the question; the user-experience reading is
  implemented).
- **Files (both trees):** `src/App.svelte` (the mode state + the sticky FULL override + the
  vmStore exposure for the sha law + the advice-panel condition), `src/lib/components/
  DraftBoard.svelte` (`data-form`, the honest switch line, the "Best available" collapse, the
  FULL BOARD door), `src/lib/components/BoardRow.svelte` (the simple one-number row + the DRAFT
  control; gone% and its method tooltip stay; the flex chips live one click away in the row
  detail), `src/lib/components/BoardFooter.svelte` (the other sorts behind a SORT toggle).
  **Zero engine files, zero engine semantics, zero port/ changes.**
- **Laws:** `batteries/late.battery.mjs` (NEW) — L1 the 10th/11th flip (from the real UI),
  L2 the simple row anatomy (one rec number + the pick control; no flex chip; no advice panel;
  gone% on every row), L3 the FULL BOARD door (one click, stays full), L4 the board VM sha
  identical across the mode flip at a frozen state (the N25 pattern), L5 390px clean in BOTH
  forms, L6 zero page errors. **6 pass · 0 fail** on both trees (and inside the fresh clone).
- **Falsifier:** `scripts/falsify-late.mjs` (NEW) — F0-late clean baseline 6/6; F13-late
  (simple-mode planted ALWAYS-ON) → `FAIL L1 …` DIED; exit 0.
- **Not touched:** the flex table, the slots, minClassPool, the mode weights, any engine file,
  engine semantics anywhere (the trees' `src/` outside `src/engine` are identical to each other
  outside this sitting's shared edits).


---

# CAKEPANZ-8.1 (2026-11-18) — the review-closure round: one entry per ordered item

The order: `deliveries/zai-cakepanz-8.1-2026-11-18.md` @ `596bd94f` (INKLING, v2). Everything below was
applied to BOTH trees (`cakepanz-4/`, `cakepanz-4-prepared/`) by apply-asserted patch scripts (every
anchor matched exactly; a moved anchor throws). Zero engine files; the pins untouched; the one port
exception is `src/lib/port/settings.ts`' additive `fullBoard` field (the order's §0.2). Raw receipts:
`receipts/partH-c8-1/`. The working source for the delivered bytes was the byte-verified branch copy of
the cakepanz-8 package (the c8 folder was pushed to six branches and canary-verified by three seats;
the Owner's Desktop folder is not reachable from this sandbox) — stated here per the receipt law.

## Block 1 — product / render layer

- **4.1 (DS F1 · 5-seat convergence) the simple row's detail is real.** `BoardRow.svelte` simple branch:
  the button gains `aria-controls="cp-fit-{r.id}"`; the `{#if open}` detail block renders inside the
  simple row — hy4's preferred shape (the `OVR … · priority … · fills …` fitlbl + the chips + the primary
  chip), `data-testid="cp-simple-detail"`; style gains `flex-wrap: wrap` + `.cp-simplerow .cp-fits {
  flex-basis: 100%; }`. Before: the branch toggled `aria-expanded` and rendered NOTHING (the dead control).
  **Law: L7** (its presence pair). Receipts: h7b/h16b L7 PASS; F14-late DIED (the dead toggle re-planted →
  L7 red). The full branch is unchanged.
- **4.2 (DS F2) the completing pick lands on Complete.** `App.svelte` `pick()`: after the dispatch +
  refresh + autosave — `if (store.getState().status === 'done') go('complete');`; and `refresh()` no longer
  swallows a done-draft `goneOdds` throw: `if (st.status === 'done') { oddsMeta.set(null); } else { try …
  catch }`. Before: the user's 32nd pick left the stale board answering "it is not your pick". **Law: L8**
  (driven through the real UI, 21 pick-button + confirm clicks, plus the hash-door leg). Receipts:
  h7b/h16b L8 PASS; F15-late DIED (the handoff deleted → L8 red).
- **4.3 (DS F3 = pickle B1 = hy4) the FULL BOARD choice survives a reload.** `settings.ts` gains the
  additive `fullBoard: boolean` (default false; field-by-field validation `p.fullBoard === true`) — the
  order's ONE port exception; `App.svelte`: `setFullBoard(v)` beside the other setters, `simpleOff` is
  DELETED, `lateMode` reads `!$settingsStore.fullBoard`, `startDraft` calls `setFullBoard(false)` (a NEW
  draft offers the flip again), `loadDraft` does NOT clear it (hy4's nuance), the door calls
  `setFullBoard(true)`. **Law: L9** (reload → full; NEW draft → the flip again). Receipts: h7b/h16b L9
  PASS; F16-late DIED (the restore deleted → L9 red).
- **4.4 (INKLING F2) syncFromHash rides go().** `App.svelte` one line: `if (r) go(r.screen, r.param);`
  (was: `screen = r.screen`). The Back button / a hand-edited `#/board` on a done draft converges on
  `#/complete` — the third write path to `screen` is closed. Covered inside **L8** (the hash-door leg:
  set `#/board` + hashchange → Complete renders) per the order's HOW TO CHECK ("beside L8", not an S-law).
  The parse-time normalization fork (router.ts owns the redirect) is NOTED for the Architect — not built.
- **4.5 (PICKLE B3) the shown number tracks the active sort — took option (i).** `BoardRow.svelte` gains
  the `sort` prop (`DraftBoard` passes `sort={vm.sort}`) and renders the matching field with a
  visually-hidden caption (`title` + `aria-label`: **WINS** / **PRIO** / **OVR** — the order's caption list
  said GONE%, but gone% is not a SortControls option; the caption set matches the ACTUAL sorts, stated
  here). L2 extended: the battery sorts by Priority through the real SORT toggle and asserts the row's
  number equals the VM's first-row priority, then restores Wins. Receipts: h7b/h16b L2 PASS (detail line
  carries the sort walk).
- **4.6 (INKLING F6) Hub.svelte parens.** `class:cp-played={(n < (season.slot + 0) && season.atLastPlayed ===
  false) || n <= season.slot - 1}` — the parens state the `(a && b) || c` semantic exactly (zero behavior
  change); noted for the record: the first clause is subsumed by `n <= season.slot - 1`, so the guard is
  equivalent to `n < season.slot` — left as-is (presentation row styling; the Architect may simplify later).
- **4.7 (INKLING) the recommendation number is captioned.** Rides 4.5(i)'s `title` + `aria-label` (the
  visually-hidden WINS caption); the Guide's own Wins/Priority wording is unchanged (no wording invention).
- **4.8 (INKLING) the honest switch line stays verbatim.** 4.1 implemented the detail-block branch (NOT the
  static-row alternative), so "the board simplified — every number is still one click away" is literally
  true; cited as **L7** here.

## Block 2 — receipt / documentation hygiene

- **5.1 (DS F4) the numerals gate is fixed at its root.** `VERIFY.txt` §20.3 (both trees): "name the
  **stale** pin `4ca9a071` / 52 files" ×2 — the one-word edit (the order's default; the heuristic NOT
  widened). There is no package-root VERIFY.txt in this package (the doc lives per-tree only) — the order's
  "both trees + package copy" resolves to both trees, stated here. Receipts: h21 ×4 CLEAN + k1/k2 steps
  16–17 + m1 steps 12–13 (all CLEAN ×2). VERIFY §22.1 pastes the raw stdout.
- **5.2 (DS F7) ACCEPTANCE-RECEIPTS.txt — the pointer fallback is applied; the composite was the round's
  ONE open item — **SCOPED PER TREE (the cakepanz-9 order's A2): SHIPPED was closed by its on-disk
  record (the file IS the completed record; k1 was the outer echo); PREPARED was genuinely open
  (stopped mid-step-8b). CAKEPANZ-9 (2026-11-19): prepared composite ran END-TO-END (k2); the
  shipped k1 re-run is the one open item (VERIFY §23.7).**** `bash scripts/acceptance-run.sh` end-to-end was STARTED at the final bytes in both
  trees but could not complete inside this sitting's time budget (the fresh-clone composite m1 DID
  complete green with the numerals steps inside). Per the order's §5.2 fallback, each tree's
  ACCEPTANCE-RECEIPTS.txt now carries the honest pointer at its top (the c7-era record kept as history
  below it; nothing red or self-contradicting ships). The next sitting finishes the composite at these
  bytes — k1/k2 then land in receipts/partH-c8-1/ and both copies are regenerated as the final-state
  output.
- **5.3 (DS F5) the stale FIX-RECEIPT hash.** `VERIFY.txt:793` (both trees) + `WHAT-CHANGED.md:93` (this
  package root): the pre-A7 bytes 21d81b7b… are marked SUPERSEDED and the measured hash rides §22.2b:
  **1b9bea5fd1b87851397ec6395541e8b47bf6bf04cb65912547d12d36153a5047**, cmp byte-identical ×3, re-measured 2026-11-18. (The order preferred dropping the hash;
  the stronger form was taken — the hash AND the dated three-copy cmp, since the file is frozen after this
  round — stated here per §11.)
- **5.4 (DS F6) the SNAPSHOT counts.** Shipped `SNAPSHOT.md`: `26/26` → **33/33** with
  the dated history note; prepared `SNAPSHOT.md`: `25/25` → **33/33** AND its same-line
  `shell battery 46/0` → **47/0** (a live-doc count the round-8 A8 sweep missed; the A8 rule + §0.8 force
  the re-quote — stated here). Re-grep of the package for `\b(26|25)/(26|25)\b` node-battery claims: the
  remaining hits are DATED receipts of the c5/c6/c7 sittings (VERIFY §3/§8/§10/§M3, MERGE-README :46/:68/:88
  — VERIFY §19.2's own note names them history) — kept under the same hold, reported here.
- **5.5 (INKLING F3) the f4/f5 tails named honestly.** `f4-a1-postfix-probes.log` →
  `f4-a1-postfix-probes-attempt1.log` with the one-line header marker (the Node-24 crash at the port
  parameter-property is the Architect's open item; the final-state receipts are f5's green A1 block + f7);
  `f5-late-and-a1-final-shipped.log` carries the pre-fix header note (final state = f7, 6/6 in that
  sitting). WHAT-CHANGED's c8 A1/Block-B entries already pointed at the green blocks — the markers make the
  tails self-describing.
- **5.6 (DS F8) slice1-battery.json.** Took the redirect option (the order's first): the battery now writes
  `deliveries/receipts/slice1-battery.json` (the receipt-excluded layer per regen-manifest's isReceipt),
  `.gitignore` gains the path in both trees; the delivered copy at `batteries/slice1-battery.json` stays
  UNTOUCHED as per-slice history (the CHECKSUMS-slice*.txt convention) — so the manifest counts stay
  **314/319** exactly as §8.5 expects, a battery run never dirties a manifest-covered file,
  and `git status` is clean after a run. Stated: redirect + gitignore; the stale copy kept as history.
- **5.7 (DS L10) the citation audit + the transitions matrix.** VERIFY **§22** (both trees): §22.2 is the
  audit table (every quoted sha + count with its tool + receipt), §22.3 the transitions matrix (11 rows;
  row 6's direct-loadDraft leg NAMED and flagged for the next round), §22.4 points at the absence audit
  below. `cite-check.mjs` is NOT built (the Architect's/MUSE's tooling call, noted per the order).
- **5.8 (DS's rule) the absence-law audit** — see the table below.
- **5.9 (DS's rule) the transitions matrix** — VERIFY §22.3 (above).

## Block 3 — laws and falsifiers

- **L7 the detail is one click away** · **L8 the last pick lands on Complete (through the real UI, with the
  §4.4 hash-door leg)** · **L9 the mode choice survives a reload (reload → full; NEW draft → the flip
  again)** — in `batteries/late.battery.mjs`, both trees byte-identical, same exit discipline; the battery
  prints **9/9**. L1–L6 kept green unchanged (L6 moved LAST so the zero-error assertion covers the reload +
  the 21-pick UI walk; its assertion is untouched). **L10 the process law** — acceptance-run.sh completes
  exit 0 at the final bytes (k1/k2), named in the ledger.
- **Falsifiers** (`scripts/falsify-late.mjs`, clean-baseline-first, apply-asserted): **F14-late** (the dead
  toggle re-planted → L7 DIED), **F15-late** (the go('complete') handoff deleted → L8 DIED), **F16-late**
  (the fullBoard restore deleted → L9 DIED). **F13-late's anchor drifted** (4.3 moved the tail from
  `!simpleOff` to `!$settingsStore.fullBoard`) — the falsifier's anchor updated, the drift NOTED here per
  §0.9 (the F0-late baseline is 9/9; F13 still kills L1). Receipt: h10b (all DIED, exit 0).
- **acceptance-run.sh** gained the 8.1 expectations: step 8b (9/9, L1–L9 named), step 13b (F0-late 9/9 +
  F13–F16). Its end-to-end composite is the round's ONE open item (started, not completed in this
  sitting's budget — see 5.2 above; **cakepanz-9 (2026-11-19): prepared composite ran END-TO-END (k2);
  the shipped k1 re-run is the one open item (VERIFY §23.7)**).

## The absence-law audit (5.8 — the written audit)

| Absence assertion (grep shape) | Where | What it guards | Its presence pair |
|---|---|---|---|
| `chips === 0` / `adv === 0` (collapsed simple rows) | late L2 | no chips/advice in the default row anatomy | **L7** (NEW 8.1): exactly one visible detail with chips ≥ 1 on open; + L1's `adv === 1` full-form half |
| `note === 0` (full half of the flip) | late L1 | the switch line absent before the flip | L1's own `note === 1` simple half; + L9's `note11 === 1` on the NEW draft |
| `closed.n === 0 && closed.chips === 0` | late L7 | collapse hides the detail | L7's own open half (regions=1, chips ≥ 1, aria-expanded true) — one law, both halves |
| `errs.length === 0` (zero page errors) | late L6; shell S15/S16/S24/S25c/S27/S28/S30 | no page errors / blocked requests | the same flows assert rendered CONTENT (S29's resumedHub, S31's manual restore, L8's `.cp-done` + h1, L7's fitlbl) — the presence is in the flow, the absence in the tail |
| `offenders === []` (no framework refs below the render layer) | node M1 | port purity | M1b's presence row: `hits === [seam.ts]` (the ONE door exists) |
| `bare === 0` (dark-takeover selector) | node tokens law | no bare selector | the same assertion's `wrapped === 1` (presence) |

L2 keeps its shape; **L7/L8/L9 are the presence pair** this round ships. No absence assertion was found
whose promise is not either paired or scoped in this table.

## Charter compliance (§0) and drift notes

- Zero engine files touched (`diff -rq` of both `src/engine`s vs the `git archive` of the pins exit 0 —
  h22; the engine delta between the trees is exactly `sim/game.ts` + `sim/passclass.ts`, unchanged). The
  flex table byte-identical to both pins (cmp ×2 exit 0 — h22), census re-printed (h22). Both pins stay
  put; prepared stays NOT ACTIVATED. Owner-gated items untouched. One zip, nothing else rides.
- **§8.5's gate counts hold at 314/319** — possible only because 5.6 kept the delivered JSON as history
  (the redirect adds no tree file). Stated in 5.6 above.
- **The receipt-law catch of the sitting (named for the record):** L9's first implementation passed
  for the WRONG reason — the battery's store-dispatch pick path (`pickUser`) skips `autosaveDraftNow`,
  so the reload restored the `startDraft` 0-pick autosave and the restored board was trivially FULL
  (myPicks = 0). Caught by F16's plant returning TAUTOLOGY instead of DIED (a false green is worse
  than a red — the absence-law lesson again, one level up). Fixed in the battery: L9 lands one REAL
  UI pick (row → chip → confirm, the autosaving path) before the reload and asserts the restored
  record's user picks ≥ 10 alongside the form. F16 now kills L9 for the right reason; F14's case
  also surfaced a battery crash-under-plant (a null-unsafe visibility probe in L7 — a law must FAIL,
  never crash, when its subject is missing) — fixed. Both fixes ride in `batteries/late.battery.mjs`
  (byte-identical ×2 trees) and are covered by the h7b/h16b/h10b receipts.
- **The MUSE note (the order's §7):** START-OF-CHAT-ZAI.md changed this round — the §2 rewrite the file's
  own §6 rule orders at the end of every chat; the three copies are byte-identical ×3 (sha 15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec);
  **MUSE re-files it on `council/muse`** — this paragraph is the explicit tell.
- The delivered bytes were assembled from the six-branch byte-verified copy of the c8 package (the Owner's
  Desktop folder is not reachable from this sandbox) — the canary set (dist/VERIFY/START-OF-CHAT/flex
  hashes) matched the sweep review's verified values before the first edit.

---

# CAKEPANZ-9 (2026-11-19) — the uniform-board round — one entry per ordered item

The order: `council/inkling @ c7c83853` — `deliveries/zai-cakepanz-9-2026-11-19.md` (v4; supersedes
v3/v2/both MUSE 8.2 drafts/Ernie's absorbed draft). The Owner's rulings (verbatim,
`council/muse:_agents/owner-notes/2026-11-19-cakepanz-*.txt`) are quoted in the brief's §0 and are
followed as written. Every patch below was applied by an apply-asserted script (`round9-patch.py`,
`round9-docs.py`, `round9-verify23.py` — an anchor that moved throws); every receipt is the raw
stdout of the tool at the final state, mirrored in `receipts/partH-c9/` and the trees' VERIFY §23.

## Part A — close the 8.1 chain honestly

- **A1 (the load-bearing fix).** The shipped tree's `ACCEPTANCE-RECEIPTS.txt` 9-line pointer was
  replaced with the ONE truthful line (the file IS the completed final-state acceptance record;
  the prepared sibling pointer named). Then the composite regeneration at the final bytes rewrote
  both trees' files BY THE SCRIPT (the cakepanz-9 order's §9) — the pointer edit is subsumed by the
  regenerated record and lives in the pre-composite state (noted in the intake ledger).
- **A2 (L10 scoped per tree).** `README-DELIVERY.md` (the cakepanz-9 top block + the ONE-open-item
  paragraph rewritten per tree: shipped closed by its on-disk record with `k1` honestly cited as the
  outer echo; prepared genuinely open until this sitting's composite) — then CLOSED by the
  composites. `WHAT-CHANGED.md` §5.2 + Block 3 scoped the same way. `VERIFY.txt` §22.2 gained the
  L10 row (absent at the 8.1 bytes — pickle M1) with the per-tree finding and the cakepanz-9 closure.
- **A3 (the prepared pin + the numerals gate under BOTH invocations).** Prepared
  `MERGE-GUIDE.md` line 3 gained `(prepared sibling: 65673a00 — PREPARED, NOT ACTIVATED; the
  Owner's word)`. The gate ran FOUR times with the invocation in the receipt (`receipts/partH-c9/
  a3-gate-numerals-x4.log`): shipped default ×2, prepared default ×2, prepared
  `CP_PIN=65673a00` ×2 — ALL CLEAN, exit 0 ×6. The 8.1 receipts ran the default only — the gap that
  let the MERGE-GUIDE defect stand (inkling's finding 3 / ernie's addendum) is closed at the root.
- **A4 (RECEIPTS.md banner).** The package-root `RECEIPTS.md` carries the top banner: the c7/c8-era
  record above the `## partH-c8-1/` section prints 311/316, 46/0, 31/31 — true THEN; the
  final-state receipts are `receipts/partH-c8-1/` (+ partH-c9/) + the trees' VERIFY §22/§23.
- **A5 (k1/k2).** Regenerated from the REAL runs: `k1-acceptance-run-shipped.log` and
  `k2-acceptance-run-prepared.log` are the composites' raw stdout (prepared first — it was the
  missing one — shipped re-run for parity), each ending with the run's own verdict line and exit
  code. Nothing hand-written.
- **A6 (START §2).** The §5.2 bullet now carries ONE consistent per-tree line (shipped complete /
  prepared open → closed at cakepanz-9), and §2 is rewritten for this sitting (the file's own §6
  rule). **The three copies are byte-identical ×3 — sha256
  15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec — and MUSE IS TOLD EXPLICITLY
  HERE: MUSE re-files the updated file on `council/muse`.**
- **A7 (the citation-audit edges).** (a) the L10 row rides §22.2 (above); (b) `WHAT-CHANGED.md:93`
  stale `21d81b7b…` marked SUPERSEDED with the measured `1b9bea5f…`; (c) `README-DELIVERY-c8.md:39`
  now actually marks the old dist sha (the 8.1 README's :37 claim was false — pickle M3);
  (d) `VERIFY.txt` transitions-matrix row 11 no longer cites "L10 (the process law)" (that row's
  laws were L3/L9-family; L10 is the acceptance-run law) and the row carries the SUPERSEDED marker;
  (e) the RECEIPTS banner names its history line range (the lines above `## partH-c8-1/`).
- **A8 (the lows).** (a) the malformed `…Basketball is deferred.## 2 ·…` heading is split in all
  three START copies (§2 is a header again); (b) `WHAT-CHANGED.md:116` stale `3c0dfd3f…` marked
  SUPERSEDED with the measured `8ef3b18d…`; (c) the raw `sha256sum` stdout of the START/FIX hashes
  rides `receipts/partH-c9/a8c-raw-shas.log` (START ×3 byte-identical, FIX-RECEIPT ×3
  byte-identical, cmp exit 0); (d) `VERIFY.txt`'s BLOCK B design prose is marked SUPERSEDED and the
  post-B-bis reality (the uniform board; the order §5 cited) rides beside it; (e) the BoardRow
  `aria-controls` fix — the controlled element ALWAYS exists (a hidden container with the same id,
  `.cp-fits[hidden] { display: none; }`); the "pick one, say which" pick: always-exists container.
- **A9.** Prepared `MERGE-README.md` line 16 carries the dated marker (that paragraph is the
  2026-11-17 sitting's verdict; the current state rides SNAPSHOT.md + VERIFY §22/§23).
- **A10.** Re-verified and re-zipped: regen ×2 + gate-manifest ×2 ×2 trees (inside the composites),
  `diff -rq` trees, `git status` clean, sha256 in the reply.

## Part B — the two product defects (both trees; exact patches)

- **B1 (pickle C1 · HIGH).** `src/App.svelte` `startDraft()`: the START dispatch now runs BEFORE
  `go('board')` (the "say which": reordered, not re-issued — the done-guard then reads the FRESH
  drafting state). Law **L10** (the board battery): finish a draft → TEAM nav → Team Select → same
  team → DRAFT → `data-screen="board"`, `status="drafting"`, zero USER picks (the standard order's
  CPU picks run ahead of the user's slot — the fresh 1,024-pick record is gone), no stale Complete
  headline, zero page errors. Falsifier **F17**: the order reverted → L10 DIED.
- **B2 (pickle C2 · MEDIUM).** `src/lib/screens/Complete.svelte`: the `<h1>` renders ONLY in the
  complete branch; the partial branch keeps the existing partial-copy line; PLAY THE SEASON is
  DISABLED unless complete (the "absent/disabled" pick: disabled — the layout stays stable and the
  tooltip carries the existing App string "the season needs a finished draft" verbatim; nothing
  invented). Law **L11**: deep-link `#/complete` mid-draft → partial copy, no live CTA, zero page
  errors; the Back path (the hash door) covered. Falsifier **F18**: the unconditional h1 + the live
  CTA re-planted → L11 DIED.

## Part B-bis — the flip removed; ONE uniform board (the Owner's ruling)

- **App.svelte:** the `myPicks`/`lateMode` deriveds deleted; `setFullBoard` deleted; the
  `setFullBoard(false)` call in `startDraft` deleted; the DraftBoard props cleaned;
  `LineupAdvice` renders unconditionally (it was mode-conditional).
- **`src/lib/port/settings.ts`:** `fullBoard` deleted from the interface, the defaults and the
  loader — the port returns to the pre-8.1 shape (the order §0.2's exception ends). The loader
  stays TOTAL: an old blob's unknown `fullBoard` key is ignored, never throws (the loader reads
  only its known keys).
- **BoardRow.svelte:** the `{#if simple}` branch DELETED (the shared full row is the only row).
  The WINS/PRIO/OVR captions KEPT (the 8.1 REC strings now name the uniform row's three numeric
  cells — "drop only mode-conditional rendering", said here per the order). The detail container
  always exists (hidden when closed) so `aria-controls` always resolves (the A8e pick).
- **DraftBoard.svelte:** `data-form` deleted; the late note, the "Best available + FULL BOARD"
  door and their CSS deleted; the `simple` props deleted. **BoardFooter.svelte:** the
  `simple`/`sortsOpen` machinery deleted; SortControls ALWAYS (the pre-8.1 SORT placement). Note
  per §0.9: **ModeSwitch.svelte** is named in the order's B-bis list but carries NO flip code (it
  is the valuation-mode switch) — nothing to change there, stated here.
- **batteries/late.battery.mjs + scripts/falsify-late.mjs: DELETED** (both trees). The shell
  battery gains **L12** (picks 1..12: `data-form` absent at every pick, zero `.cp-simplerow`
  /`.cp-fullbtn`/`.cp-late-note` nodes ever, one anatomy, every pick lands, zero page errors) —
  shell 47/0 → **48/0**. The NEW `batteries/board.battery.mjs` (the late battery's successor)
  carries L13/L8/L14/L15/L10/L11 — **6/6**. Falsifier **F19**: the simple branch planted anywhere
  (`data-form` + a `.cp-simplerow` node) → L12 DIED.
- **Docs:** every flip mention carries the dated **SUPERSEDED 2026-11-19 (the Owner's ruling; the
  order §5)** marker with the final state re-quoted (README ×2, MERGE-README ×2, SHELL-STATUS ×2,
  VERIFY BLOCK B + transitions row 11, WHAT-CHANGED history, README-DELIVERY/-c8); the 8.1
  receipts stay append-only. The law counts re-quoted per the A8 rule (shell 48/0, board 6/6,
  late deleted, falsify-late → falsify-board).

## Part C — only the Owner-approved items

- **C′1 (≥3 draft suggestions highlighted).** `DraftBoard.svelte` computes `suggestIds` — the top
  THREE available rows by the board's ACTIVE order; the extension walks past the third row ONLY
  while its sort value ties (the code comment says so; the wins values sit on the engine's 1e-9
  grid so real ties compare exactly — but the VM's wins display rounds to one decimal, so the late
  rounds' ties are broad: at the mid/late checkpoints 38 and 60 rows highlight — the observation
  and the one-word call ride the reply). `BoardRow.svelte` renders the ring on the row's pick
  control (`.cp-suggest`, gold ring + shimmer in the house tokens, `prefers-reduced-motion`
  honoured, `body.cp-reduced` honoured, zero new text; `data-id` rides the row for the law's exact
  assertion). Law **L13** (sampled early/mid/late; ids exact vs the VM incl. the tie extension);
  falsifier **F20** (`suggest={false}` → L13 DIED).
- **C′2 (the Complete roster print).** `Complete.svelte` (complete branch only) prints the roster
  the engine would field: `rostersOfRecord` + `lineupFor(mine, '4-3')` on the record, the effOvr
  per slot, the three weakest marked — REUSING the advice panel's anatomy and heading (the
  existing component; the additive optional `weak` prop; zero new sentences; "incomplete" rides as
  the `data-lineup` attribute value and is on the Owner's one-word list, never shipped visible).
  Law **L14** (sha-exact rows vs the VM, the three weakest match, the 11-fielded state asserted);
  falsifier **F21** (the roster block deleted → L14 DIED).
- **C′3 (the wall-slip reveal).** `Complete.svelte` CSS only: `.cp-done > *` cascades (title 0 s →
  sub/prov/roster 0.18 s → buttons 0.36 s; 0.5 s each — 0.86 s total ≤ 2 s); `@media (prefers-
  reduced-motion: reduce)` and `body.cp-reduced` render it instant; zero strings, zero logic
  changes. Law **L15** (the staggered cascade asserted + the reduced-motion instant half);
  falsifier **F22** (the cascade keyframes deleted → L15 DIED).
- **C′4 (Ernie's F3 — the gold literals onto the tokens).** Measured at the 8.1 bytes: BoardRow 9
  lines, DraftBoard 5 (the order said 4 — the fifth is `:57 #d9a94c`, the opaque member of the
  same rgba(217,169,76) family; swapped and noted), BoardFooter 3, Feed 2, Saves 2. After B-bis
  deleted the simple branch and the door, 6 BoardRow lines + 2 DraftBoard lines died WITH their
  branches; the surviving 16 lines ALL swapped: `#e8c87e` → `var(--gold2)`, `#8a5f18` →
  `var(--gold3)`, `rgba(217, 169, 76, N)` → `color-mix(in srgb, var(--goldm) N%, transparent)`,
  `#d9a94c` → `var(--goldm)`; never the reverse. The dark tokens' own values (the w89 reference,
  lines 112/120 of `tokens-w89.css`) are the spec — UNTOUCHED. `probe-contrast.mjs` re-run after
  the swap, identical ×2 trees (`receipts/partH-c9/c4-contrast-rerun-*.log`) — the floors are the
  token values' own, unchanged; the two Owner-gated open rulings (the light gold2 AA failure, the
  dark rose ink) stay open, nothing was ruled here.
- **C′5 — NOT built this sitting:** the stats/awards dashboards (the separate brief; six Owner
  questions pending); Guide graphics P-144; "also fits"; P-317 (the Architect's store piece);
  cap-70 (Owner); MIT/PWA/analytics anything.

## Part D / Part E (non-blocking; answered in the reply + the intake ledger, nothing ships)

- **Part D** — the absorb-work answer, four lines, in the sitting's reply (tiers taken/broken/
  needed/capacity; the Architect's word gates Tier 2/3).
- **Part E** — the ranked w89 tool ideas, seeds only, in the reply; NOTHING from Part E ships this
  sitting.

## The verification set (the order's §9, at the final bytes)

- `test:engine` **394/394 shipped · 406/406 prepared** (exit 0 ×2); `battery:node` **33/33 both
  trees**; slice **29/0/10/3** ×2; shell **48/0 ×2** (S1a–S31 + L12); board battery **6/6 ×2**
  (L13/L8/L14/L15/L10/L11); receipt falsifier **F0–F12 ALL DIED**; shell falsifier **FA/FB/FC ALL
  DIED**; **falsify-board: F0-board 6/6 + F0-shell 48/0 clean baselines, F15-board/F17/F18/F19/
  F20/F21/F22 ALL DIED, exit 0**; gate-manifest PASS ×2 ×2 trees (inside the composites);
  **gate-numerals CLEAN ×2 per tree under both invocations (×4, exit 0 ×6)**; the falsifiers
  F13–F16-late SUPERSEDED with the flip; VERIFY §22 kept + **§23 added** (both trees);
  **the composites: PREPARED ran END-TO-END, exit 0, its ACCEPTANCE-RECEIPTS.txt regenerated BY THE
  SCRIPT (k2 — the missing one, done); the SHIPPED k1 re-run for parity is the sitting's ONE open
  item (the window closed first — VERIFY §23.7 names the step; the shipped L10 closure stands on its
  completed 8.1 on-disk record + the per-tool re-runs of every composite step at the final bytes)**;
  `dist/single.html` **670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1**
  byte-identical across the trees (the 8.1 sha 4ce69205…057a superseded); re-zip + sha256 in the
  reply; `git status` clean; START-OF-CHAT byte-identical ×3 (15f088c7…); no gh-pages push; no pin
  movement (the pins re-verified via `git archive` diff ×2, exit 0); zero engine files.
