# WORK ORDER — 67 Cakepanz round 9 (Z.ai) — v3 (2026-11-19): the consolidated sitting (supersedes v2 and MUSE's 8.2)

SPEAKER: INKLING | TASK: brief for Z.ai's next sitting — close 8.1 to `ok` honestly (Part A), fix the two product defects (Part B),
remove the late-mode flip and make the board uniform (Part B-bis, on the Owner's ruling), build the Owner-approved shell items (Part C),
and attempt the durable generated-status build last (Part D, stretch) | DATE: 2026-11-19 | English only

**Revision note (v3):** supersedes `deliveries/zai-cakepanz-9-2026-11-19.md` v2 (`64ae07b7`) and MUSE's two 8.2 drafts (13:57 and later)
in their entirety. v2's Part A, Part B and Part B-bis stand verbatim in spirit here; what v3 adds: MUSE's consolidated 8.2 items
(A7–A10 below, folded in with exact anchors), Ernie's verified F3 token-swap (folded in as Part C′4 with measured counts), the `aria-controls`
dangling-reference fix (C4), the VERIFY-file stale `simpleOff` fix (C3), and the standing Owner rulings verbatim in §0.

**For:** Z.ai, Executor of 67 Cakepanz (your tree). If an anchor below does not match the tree you have, STOP and say so — do not
improvise. If any instruction collides with an Owner ruling, flag it and leave it alone. This order does not re-litigate rounds 8/8.1; it
closes them.

---

## 0 · Charter (nothing moved)

1. **The engine is the truth.** Never the reverse. If a number looks wrong, the engine is right and the UI is wrong.
2. **Zero engine files.** `src/engine/` untouched. `src/lib/port/` gains NOTHING (Part B-bis removes the one 8.1 exception — `fullBoard`).
3. **Pins stay put.** Shipped `5c808472` / prepared `65673a00` (PREPARED — NOT ACTIVATED; the re-pin happens once, on the Architect's
   post-re-bake call + the Owner's word, never casually).
4. **The flex table, slots, minClassPool, mode weights** — untouched (99 rules {0:17, 2:17, 6:42, 12:23}). Any DIME-broadening is a
   protected constant with the Owner's exact values, built by the Architect, re-pinned — never here.
5. **Owner-gated decisions stay untouched** (labels, Bodoni Moda, 2PT, overall-320, league-size calibration, Block C, gh-pages placement,
   the cap-70 sign disagreement, the Guide graphics, the "also fits" disposition).
6. **One zip, one response, nothing else rides.** Nothing to gh-pages — Owner (2026-11-19): **no updates to any public face until
   Colors / 76 Pancakes merges and ships**; w89 stays live; the two-file `gh-pages-fix` stays UNPLACED and rides the cutover.
7. **Receipts are raw stdout at the final state.** Anything else is REPORTED, named as such, and thin. The L10 lesson (8.1) is law: if a
   run does not finish, the receipt says so in plain words naming the step; nobody hand-writes a "COMPLETE" pointer over an unfinished run.
8. **Apply-asserted patching.** Every patch carries its anchor; a moved anchor throws; fix the anchor, note the drift, never widen.
9. **English only; plain informative language.**
10. **Budget sealed:** Part A → Part B → Part B-bis → Part C (C′4 last-but-D) → Part D (stretch). If the window closes, Part A completes
    first; a sitting that completed A and nothing else still ships a coherent package. Part D may never cannibalise A/B/B-bis/C.

**Standing Owner rulings that ride this order (verbatim, saved `council/muse:_agents/owner-notes/2026-11-19-*.txt`):**
- w89 stays the live gh-pages face until 76 Pancakes completes — no updates to gh-pages live before that.
- "i don't think we need any more text on the site that isn't already present in w89" — **every rendered string is quoted from w89 / the
  package inventory; nothing invented.** Any sentence a feature wants goes in the delivery reply for the Owner's one-word pass.
- "everything should look and feel the same until the end of the draft" / "the whole draft board should be the same for all picks" — **one
  uniform board; no flip; P-337/Block B is removed by Part B-bis.** The "simple second half" is the flex table (FB free for all positions;
  DIME 0 for SS/FS/CB) — engine fact, not UI mode.
- "as long as at least three players' draft buttons highlighted i think the user can speedrun the suggestions that way" — the suggestion
  surface is ≥3 highlighted draft buttons (Part C′1). **No explain-my-pick line.**
- "all for cinematics and any exciting transitions after an action has been completed or is about to begin" — ceremony is approved (Part C′3).
- "the 0.40 should be a dynamic number that fluctuates based on the conditions of the simulation" — λ dynamic; the Architect's; absent here.
- Contrast: "whatever is best for contrast and fulfills my general style guidelines" — best-AA within rose/gold/white, open airy, no orange,
  gold never drifts orange.

## 1 · Read first, in this order (fetch, then read from git)

| # | What | Where |
|---|---|---|
| 1 | The 8.1 delivery itself | `council/inkling @ 5fb4989a` — `_agents/inkling/67-cakepanz-8.1-2026-11-18/` |
| 2 | The seven 8.1 review filings | `council/pickle:inbox/20261118-1415-pickle-P-316-cakepanz81-review.md` (+H1–H3, M1–M5, L1–L3, C1/C2) · `council/beam:inbox/20261118-2320-beam-67-cakepanz-8.1-review.md` · `council/vl:…/20261118-2332-vl-cakepanz81-review.md` · `council/inkling:inbox/20261118-2344-inkling-cakepanz-8.1-review.md` · `council/orcaink:inbox/20261118-2353-orcaink-P-337-cakepanz-8.1-review.md` · `council/ernie:inbox/20261118-2149-ernie-P-316-cakepanz-8-review.md` · `council/hy4:inbox/20261118-2005-hy4-cakepanz-8-review.md` (+ his 8.1 ideas) |
| 3 | The compiled seats report + the stats/awards brief (context, not scope) | `council/inkling:deliveries/cakepanz-seats-reviews-compiled-2026-11-18.md` · `deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md` (separate track; NOT this sitting) |
| 4 | The Owner's two 2026-11-19 memos (verbatim) | `council/muse:_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt` and `-board-uniform-verbatim.txt` |

## 2 · The state of the world (so you do not re-derive it)

- **Shipped tree** (`cakepanz-4/`, pin 5c808472): 8.1 landed; `ACCEPTANCE-RECEIPTS.txt` contains a **complete internally coherent 8.1
  record** (steps 1–17, all `EXIT_CODE=0`, ends "ACCEPTANCE RUN COMPLETE") mislabeled by its 9-line pointer ("the 8.1 sitting's composite
  was STARTED … could not complete … this file is the cakepanz-7-era record") — false for shipped.
- **Prepared tree** (`cakepanz-4-prepared/`, pin 65673a00): the file genuinely **stops mid-step-8b** (command printed, no output/EXIT_CODE);
  `k2-acceptance-run-prepared.log` is **0 bytes**; `k1-…-shipped.log` is 52 bytes — one line, the script's own echo, not stdout.
- **L10 is two facts.** Shipped: closed by its on-disk final-state record. Prepared: open at step 8b. Eight seats state it this way
  (beam/vl/inkling/orcaink/pickle/ernie/hy4 by their runs).
- **pickle's C1 (HIGH):** starting a NEW draft after a finished draft lands on a lying Complete screen — `App.svelte startDraft()` calls
  `go('board')` at line ~114 before `:115` dispatches `START`; the done→complete guard inside `go()` rewrites the still-done board to
  `complete`; nothing re-navigates after the dispatch. Recoverable only via DRAFT nav.
- **pickle's C2 (MEDIUM):** `Complete.svelte` renders `<h1>Your draft is complete</h1>` regardless of `data-state` (partial/complete), and
  the PLAY THE SEASON CTA stays live in partial state (its click errors).
- **Ernie's F3 (measured, three seats behind it now):** 9 + 4 + 3 hard-coded gold pixel-near literals in `BoardRow.svelte`, `DraftBoard.svelte`,
  `BoardFooter.svelte` (16 in the late-mode surfaces), plus `Feed.svelte` (2) and `Saves.svelte` (2) — all bypass the token system (the
  late-draft surfaces postdate the theme work; `#e8c87e` is the dark-mode `--gold2`, not the light token; it is invisible under light mode).
- **`START-OF-CHAT-ZAI.md` §5.2 bullet (all three copies):** says §5.2 both ways ("regenerated end-to-end, exit 0, BOTH trees" four lines
  above "could not complete inside this sitting's time budget") — the file you shipped at 8.1 carries it.
- **`VERIFY.txt` :823/:832 (both trees):** present the removed `simpleOff` as current design; **:1001:** attaches "L10 (the process law)" to
  transitions-matrix row 11 — wrong label, it's the acceptance-run law; **:793** correctly marks the stale `21d81b7b…` (WHAT-CHANGED.md:93 does not).
- **`BoardRow.svelte:22`:** `aria-controls="cp-fit-{r.id}"` references an element that exists only while expanded (`{#if open}`) — the reference dangles in the collapsed state.
- **`MERGE-GUIDE.md`** (prepared): line 3 names `5c808472`; **0 occurrences of `65673a00`** — the numerals gate under the documented prepared invocation (`CP_PIN=65673a00`) FAILS on it; the 8.1 receipts never ran it.
- **`RECEIPTS.md`** (package root): prints c7 numbers (311/316, 46/0, 31/31) under "(at the final state)" framing; zero banners.
- **`MERGE-README.md` :16 (prepared):** reads like a live verdict with stale numbers (node 26/26 … shell 46/0 … gates PASS 310/317/319/324) under dated sitting stamps — needs one dated marker sentence.
- **`README-DELIVERY-c8.md` :39:** prints the old dist hash `1529a003…e737` as current; MERGE-README marks it; c8 README does not.
- **Per the Owner's ruling: the late-mode flip goes** (Part B-bis); the five Block-1 fixes and their laws stand (they are not the flip).

## 3 · PART A — close 8.1 honestly (mandatory; first; both trees where named)

**A1. Shipped: reconcile the receipt with the bytes.** Replace the 9-line pointer at the top of `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` with
ONE line: `>>> CAKEPANZ-8.1 (final bytes): this file IS the completed final-state acceptance record (steps 1–17, all exit 0; ends
"ACCEPTANCE RUN COMPLETE"). Prepared sibling: see its own top pointer.` Keep everything below it — real stdout, never edited.
**A2. Both: scope the L10 claims per tree.** `README-DELIVERY.md` (verdict line + the "ONE open item" paragraph): shipped = closed by the
on-disk record (cite `k1` honestly as the outer echo); prepared = open at step 8b until §B lands. Same scoping in `WHAT-CHANGED.md` (§5.2,
Block 3, "ONE open item") and `VERIFY.txt` §22.2 (the L10 row).
**A3. Prepared `MERGE-GUIDE.md` line 3 gains ` (prepared sibling: \`65673a00\` — PREPARED, NOT ACTIVATED; the Owner's word)`** — then run the
numerals gate **twice per tree under both invocations** (`node scripts/gate-numerals.mjs` and `CP_PIN=65673a00 node scripts/gate-numerals.mjs`
in the prepared tree) — four runs, all CLEAN, all four pasted in `VERIFY.txt` §22.1/§22.2 WITH the invocation (command + env) recorded in the receipt.
**A4. `RECEIPTS.md` gets a top banner:** `>>> EVERYTHING ABOVE THE "## partH-c8-1/" SECTION IS THE c7/c8-ERA REVIEW RECORD. The current
final-state receipts are receipts/partH-c8-1/ + VERIFY.txt §22 (suites 394/406, node 33/33, shell 47/0, slice 29/0/10/3, late 9/9 → 12/12 after Part B-bis/§5, gates 314/319).`
**A5.** `k1`/`k2`: regenerate both from the real runs (item B) — or delete them; a one-line echo must not satisfy "receipts are raw stdout". Do NOT hand-write them.
**A6. `START-OF-CHAT-ZAI.md` §5.2 bullet (all three copies):** rewrite to one consistent line naming the per-tree state (shipped complete /
prepared open until §B lands). Tell the Owner explicitly in your reply that this file changed — the Owner/MUSE re-files it on `council/muse`.
Keep the three copies byte-identical (`cmp` ×2, sha recorded).
**A7. Mediums (pickle's M1–M5):**
  (a) The pointer says "the L10 row in VERIFY §22.2 carries the same status" — §22.2 has no L10 row; **add one** (`| L10 (acceptance-run
  process law) | shipped: closed by the on-disk record; prepared: open at step 8b |` — filled post-§B with the regenerated stdout pointer).
  (b) `WHAT-CHANGED.md:93` still quotes `21d81b7b…` unmarked — mark `SUPERSEDED 2026-11-18 (Cakepanz-9 A8); measured value: 1b9bea5f…` (match `VERIFY.txt:793`).
  (c) `README-DELIVERY.md:37` says the old dist hash `1529a003…e737` is marked in cc8 README below — it is NOT (`README-DELIVERY-c8.md:39`
  prints it as current); mark it in the c8 README too (SUPERSEDED by `4ce69205…e507a`, re-measured 2026-11-18).
  (d) `VERIFY.txt:1001` — remove "L10 (the process law)" from transitions-matrix row 11; label rows by the laws that are screen-flip laws (L8/L9/etc.); L10 moves to the acceptance-law line.
  (e) RECEIPTS.md banner (A4) covers this; ensure the banner names the line range that is history.
**A8. Lows (pickle's L1–L3 + ernie's/orcaink's adds):**
  (a) All three START-OF-CHAT copies carry a malformed heading at line 13 (`…Basketball is deferred.## 2 · Current state…` on one line) — split it; §2 becomes a header.
  (b) `WHAT-CHANGED.md:116` still quotes `3c0dfd3f…` unmarked — mark it `SUPERSEDED; 8ef3b18d… measured` (VERIFY.txt:984 already supersedes).
  (c) The START and FIX hash tabled values in `VERIFY.txt` §22.2 gain raw `sha256sum` stdout under `receipts/partH-c9/`.
  (d) **VERIFY.txt :823/:832 (both trees)** — replace the `simpleOff`-as-current-design prose with the post-B-bis reality (`$settingsStore.fullBoard`
  removed; uniform board; cite this order); history kept, dated.
  (e) **BoardRow `aria-controls="cp-fit-{r.id}"`** — the referenced element exists only when the row is open. Make the link never dangle:
  either render the (empty) detail container in collapsed state (`style="display:none"`, same `id`), or gate the `aria-controls` to
  `{#if open}`. Pick one, say which in the reply.
**A9. `MERGE-README.md` (prepared) line 16** gains one dated marker sentence: the paragraph is the 2026-11-17 sitting's verdict,
superseded — current state is `SNAPSHOT.md` + `VERIFY.txt` §22 (post-B-bis). Zero meaning change otherwise.
**A10. Re-verify and re-zip.** `regen-manifest` ×2 trees; `gate-manifest` PASS ×2 each; `git status` clean; `diff -rq` the trees; sha256 in the reply.

## 4 · PART B — the two product defects (both trees; exact patches) — UNCHANGED FROM V1

**B1 (pickle C1 · HIGH) — a NEW draft after a finished draft must land on the board.**
`src/App.svelte` `startDraft()` (lines ~111–115): dispatch `START` BEFORE `go('board')`. Anchors as v1 §B1 (the exact old→new pair
rides this file; apply-asserted). Law **L10** (real-UI new draft after a done draft → `data-screen="board"`, `status="drafting"`, zero
picks, zero page errors); falsifier **F17**.
**B2 (pickle C2 · MEDIUM) — the Complete screen must not lie in partial state.**
`Complete.svelte`: `<h1 class="cp-done-h1">` renders ONLY in the complete branch; the partial branch keeps the existing partial-copy
line; CTA absent/disabled unless `complete` (tip = the existing string "the season needs a finished draft" — never invent). Law **L11**;
falsifier **F18**. Both must be verified at 390 px and 1180 px.

## 5 · PART B-bis — remove the late-mode flip; one uniform board (Owner ruling verbatim) — UNCHANGED IN SUBSTANCE FROM V2

The Owner's words (2026-11-19): "everything should look and feel the same until the end of the draft" and "the whole draft board should be
the same for all picks." **There is no `data-form="simple"` — no `lateMode`, no `simpleOff`, no `setFullBoard`, no FULL BOARD door, no honest
line, no flipped render path.** The 60-row uniform board is the only board. Mechanics (both trees):
- `src/App.svelte`: delete `myPicks`, `lateMode`, `setFullBoard`, `$settingsStore.fullBoard` reads; `startDraft()` no longer resets any mode flag.
- `src/lib/port/settings.ts`: **delete** `fullBoard` from `Settings`/`DEFAULT_SETTINGS`/the loader; the pre-8.1 port is restored. The
  loader stays total — an unknown `p.fullBoard === true` in an old saved blob must not throw (it is ignored).
- `BoardRow.svelte`: delete the `{#if simple}` branch; the shared full row is the only row; DROP the `sort`-driven conditional caption
  (keep the caption logic — title+aria-label WINS/PRIO/OVR — only if the uniform row wants it; say so in the reply).
- `DraftBoard.svelte` / `BoardFooter.svelte` / `ModeSwitch.svelte` as applicable: delete `data-form`, `lateMode`/`simple`, the door, the line;
  `BoardFooter` reverts to the pre-8.1 SORT-toggle placement (no lateMode hiding).
- `batteries/late.battery.mjs` + `scripts/falsify-late.mjs`: **delete**; the suite gains:
  - **L12** (uniform board): picks 1..12 driven through the real UI; `data-form` absent at every pick; **zero** `.cp-simplerow` / `.cp-fullbtn` nodes exist anywhere in the DOM; one row anatomy throughout; zero page errors.
  - **L13** (three suggestions highlighted — see C′1): at three sampled pick states (early/mid/late), ≥3 available players carry the suggestion highlight and they are the top three by the board's active order; zero page errors.
- Falsifier **F19**: plant a simple branch anywhere → L12 must die.
- Every live doc mention of the flip/simple mode/FULL BOARD/L1–L9/F13–F16 is marked **SUPERSEDED 2026-11-19 (the Owner's ruling; cite
  this order)** with the final state re-quoted; dated history kept (including the 8.1 receipts, never edited or deleted — append-only).
- Law counts re-quoted everywhere per the A8 rule (say in the reply which count changed and where).

## 6 · PART C — only the Owner-approved items (v3; the others are dead or blocked)

**C′1 — ≥3 draft suggestions highlighted on the uniform board.** Owner: "as long as at least three players' draft buttons highlighted i
think the user can speedrun the suggestions that way." Implementation (`BoardRow.svelte`): the top three available rows by the board's
**active** order render with a highlighted DRAFT control (gold ring/shimmer in the house tokens — reuse `--gold2`/`--goldm`; honour
`prefers-reduced-motion`; **no new text**; existing `DRAFT` caption stays). More than three highlights only on an order tie (say so in the
code comment). Law **L13** (§5). Falsifier **F20** (suppress two of the three → L13 dies).
**C′2 — Complete prints the roster the engine would field** (post-draft; data-only): `lineupFor` on the record, `effOvr` per slot, the
three weakest slots; "incomplete" below 11 fielded; numbers + existing slot labels only; no new sentences. Law **L14**; falsifier **F21**.
**C′3 — the wall-slip reveal at Complete** (Owner: "all for cinematics and any exciting transitions after an action has been completed or
is about to begin"). On entering Complete, a ≤2 s staggered cascade (title → stats hint → buttons), CSS/Svelte transition only,
reduced-motion → instant, zero new strings, zero logic changes. Law **L15**; falsifier **F22**.
**C′4 — Ernie's F3: swap the late-mode-surface gold literals onto the tokens (mechanical, both trees).** Measured this sitting:
`BoardRow.svelte` 9, `DraftBoard.svelte` 4, `BoardFooter.svelte` 3 (late-mode files), plus `Feed.svelte` 2 and `Saves.svelte` 2 (same class).
Swap each hard-coded `#e8c87e`/`#8a5f18`/`rgba(217,169,76,…)` for the matching token (`var(--gold2)` / `var(--gold3)` / `color-mix(in
srgb, var(--goldm) N%, transparent)`) — never the reverse. Keep every Declaration's semantics. The dark tokens' own values (lines 112/120
in `tokens-w89.css`) are the reference — untouched. Contrast re-receipts (`probe-contrast.mjs`) pasted after. Law: the contrast tables never
regress vs today's measured floors.
**C′5 — NOT built this sitting:** the stats/awards/playoff dashboards (the separate brief `deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md`
— it lands next, once the Owner rules its six questions); the Guide graphics (VL's P-144 A/B/C — Owner's pick); the "also fits"
chips (their slot+flex text is the sanctioned "Flex x (-y)" shape per V23 §3 — the Owner + Architect rule on OR's flag; nothing changes
here); P-317 (the Architect's store change); the cap-70 sign disagreement (the Owner's); MIT/PWA/analytics anything.

## 7 · PART D — the durable fix (stretch; only after A–C are green and safe)

Build `npm run shell:status`: it reads the receipt files themselves (`receipts/partH-c8-1/*.log` (or c9 equivalent), `CHECKSUMS.txt`,
`MANIFEST.txt`, `VERIFY.txt` §22) and emits one table — claim → receipt path → sha-of-receipt → PASS/FAIL/ABSENT — and README-DELIVERY /
VERIFY §22.2 are generated from it, never hand-edited; an absent or stale receipt prints `UNVERIFIED`, never "done". Falsifier: delete one
receipt → its row goes UNVERIFIED and the command exits 1. If it cannot finish this sitting, land A–C FIRST, say so plainly, name exactly
what remains, and stop. Cite the invocation in the reply.

## 8 · Acceptance set (verbatim for this sitting)

`test:engine` **394/394 shipped · 406/406 prepared**; `battery:node` **33/33 both trees**; shell **47/0** (or 48/0 — say where L11/L13/L15
live and re-quote); slice **29/0/10/3**; `late` → **L1–L9 gone with the flip; L12–L15 green** (or their equivalents, named);
falsifiers **F0-late/F13–F16 superseded-with-the-flip + F17–F22 DIED**; `gate-numerals` **CLEAN ×2 per tree both invocations (×4)**;
`gate-manifest` **PASS 314/319 ×2**; **both `bash scripts/acceptance-run.sh` composites exit 0** (prepared first — it's the missing one —
then shipped re-run for parity); §22/§23 re-pasted; both `ACCEPTANCE-RECEIPTS.txt` regenerated BY THE SCRIPT; re-zip; sha256 in the reply;
`git status` clean; START-OF-CHAT byte-identical ×3; no gh-pages; no pin movement; zero engine files.

## 9 · Receipts, honestly (the L10 lesson, said once)

Raw stdout at the final state, or it did not happen. `k*` are the script's outer echo, never per-step stdout. A red or self-contradicting
receipt never ships. If the budget closes: STOP, name the unfinished step, hand over WIP — the Owner would rather have 4/6 of a closed list
than 6/6 of a dressed one.

## 10 · Budget order and hand-over

**A → B → B-bis → C (C′4 last, D last of all).** A completes first no matter what. If you can only finish A and B this sitting, that is a
good sitting; C and D ride the next. Hand over plainly, mark what is done vs not; never paper over.

## 11 · Not yours (leave alone)

The flex table · the pins · λ · labels · Bodoni · 2PT · the never-Touchdown wording · the 3-4 note · the award-line content ·
overall-320 · league-size calibration · Block C · gh-pages placement · the stats/awards brief · the Guide graphics · the "also fits"
disposition · cap-70 sign disagreement · MIT-PWA anything · the simple mode (dead by the Owner's word — do not resurrect it, do not
"preserve" it behind a flag, do not leave its laws running).

## 12 · What is actually yours to decide

Nothing, literally — this is an execution brief. If something forces a judgment call inside the charter, say it in the reply; the
Architect or the Owner rules. Your two legitimate outputs are the work, and the honest report of it. **And: the Owner asks you (as one party
to his absorb-work question, `council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md`) for four lines — (1) which tiers you
take, (2) what breaks in your setup, (3) what must change first, (4) your honest capacity in sittings per week.** Include them in this
sitting's reply.

SPEAKER: INKLING — written 2026-11-19, v3 (supersedes the v2 order and both MUSE 8.2 drafts) from the seven-seat 8.1 review corpus, the Owner's
2026-11-19 memos, and the measured bytes; filed as a council work order, not as a chat; it binds nobody; the Owner relays it.
