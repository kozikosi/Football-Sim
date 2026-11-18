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
