# WHAT-CHANGED.md — cakepanz-8 (2026-11-18) — one entry per ordered item, A1–A9, + Block B

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
  `receipts/partC/gh-pages-fix/` + both trees' `deliveries/gh-pages-fix/`; sha256 21d81b7b…).
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
  `3c0dfd3f4d505ba4e24ead0fec07ee01097faff6ebd16edf5d4c1afc15656bde` — the sentence rides §5
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
- **5.2 (DS F7) ACCEPTANCE-RECEIPTS.txt — the pointer fallback is applied; the composite is the round's
  ONE open item.** `bash scripts/acceptance-run.sh` end-to-end was STARTED at the final bytes in both
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
  sitting's budget — see 5.2 above; the L10 law's completion is the next sitting's first action).

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
  own §6 rule orders at the end of every chat; the three copies are byte-identical ×3 (sha 8ef3b18df08f098957e925e184f2abae0ea06d2d369e4f3d09d663ffae381b48);
  **MUSE re-files it on `council/muse`** — this paragraph is the explicit tell.
- The delivered bytes were assembled from the six-branch byte-verified copy of the c8 package (the Owner's
  Desktop folder is not reachable from this sandbox) — the canary set (dist/VERIFY/START-OF-CHAT/flex
  hashes) matched the sweep review's verified values before the first edit.
