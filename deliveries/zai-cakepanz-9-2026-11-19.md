# WORK ORDER — 67 Cakepanz round 9 (Z.ai) — post-8.1, v2 (2026-11-19, after the Owner's clarification)

SPEAKER: INKLING (MUSE delegation) | TASK: brief for Z.ai's next sitting — close 8.1 honestly (Part A), close the two product
defects pickle filed (Part B), remove the late-mode flip and make the board uniform (Part B-bis, on the Owner's explicit ruling), and
build ONLY the remaining Owner-approved items (Part C) | DATE: 2026-11-19 | English only

**Revision note (v2):** supersedes v1 (`deliveries/zai-cakepanz-9-2026-11-19.md @ dad3a9c8`) in PART C only, after the Owner's second
2026-11-19 message. The Owner's words, verbatim:

> "q6 i think i was misinterpreted here. everythng should look and feel the same until the end of the draft. that ruling was about
> letting players flex to dime and fb for cheap."
> "q13 no the whole draft board should be the same for all picks."
> "no explain pick. as long as there are at least three players' draft buttons highlighted i think the user can speedrun the
> suggestions that way. all for cinematics and any exciting transitions after an action has been completed or is about to begin."

**Read plainly:** the flip (the simple form at the user's 10th pick, Block B of cakepanz-8/8.1) is UNWANTED and is REMOVED by this
order. The "simple second half" is achieved by the ENGINE (the flex table: FB costs 0 for every position; DIME costs 0 for SS/FS/CB;
NICKEL likewise) — that is what the Owner's ruling always meant; P-337/Block B was built on a misreading. The whole draft board is
ONE board for all picks. Everything else in v1 stands (Part A, Part B, the budget/receipt laws, the Owner's no-new-text ruling).

**For:** Z.ai. If an anchor below does not match the tree you have, STOP and say so — do not improvise. If any instruction collides
with an Owner ruling, flag it and leave it alone. This order does not re-litigate rounds 8/8.1; it closes them.

---

## 0 · Charter (the same as 8.1; nothing moved)

1. **The engine is the truth.** Never the reverse. If a number looks wrong, the engine is right and the UI is wrong.
2. **Zero engine files.** `src/engine/` untouched. `src/lib/port/` gains NOTHING (the one 8.1 settings exception — `fullBoard` — is
   REMOVED by Part B-bis; the port returns to its pre-8.1 state).
3. **Pins stay put.** Shipped `5c808472` / prepared `65673a00` (PREPARED — NOT ACTIVATED; re-pin only on the Architect's post-re-bake
   call + the Owner's word).
4. **The flex table, slots, minClassPool, mode weights** — untouched (census 99 {0:17, 2:17, 6:42, 12:23}). If the Owner ever wants DIME
   broadened beyond {SS:0, FS:0, CB:0} toward "cheap for everyone", that is a protected-constant change with his exact value, built by
   the Architect, re-pinned — NOT here; not without his word.
5. **Owner-gated decisions stay untouched** (contrast ruling beyond best-AA-within-style, labels, Bodoni Moda, 2PT, overall-320,
   league-size calibration, Block C, gh-pages placement).
6. **One zip, one response, nothing else rides.** Nothing to gh-pages. The Owner's ruling, 2026-11-19 (item 9): **no updates to any
   public face until Colors / 76 Pancakes merges and ships**; w89 stays live as-is; the two-file `gh-pages-fix` stays UNPLACED and
   rides the cutover.
7. **Receipts are raw stdout at the final state.** Anything else is REPORTED, named as such, and thin.
8. **Apply-asserted patching.** Every patch carries an anchor; a moved anchor throws; fix the anchor, note the drift, never widen.
9. **English only; plain informative language.**
10. **Budget sealed before you start** — see §6. Part A before Part B before Part B-bis before Part C; a sitting may close after A even if nothing else landed; Part C may never displace Part A/B/B-bis.

## 1 · Read first, in this order (fetch, then read from git)

| # | What | Where |
|---|---|---|
| 1 | The 8.1 delivery itself | `council/inkling @ 5fb4989a` — `_agents/inkling/67-cakepanz-8.1-2026-11-18/` |
| 2 | The five 8.1 review filings | pickle · beam · vl · inkling · orcaink (paths as in v1 §1) |
| 3 | The compiled seats report | `council/inkling:deliveries/cakepanz-seats-reviews-compiled-2026-11-18.md` |
| 4 | The Owner's 2026-11-19 memo (both messages, verbatim) | `council/muse:_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt` |

## 2 · The state of the world (so you do not re-derive it)

- **Shipped tree** (`cakepanz-4/`, pin 5c808472): 8.1 landed and was battery-verified by seats; `ACCEPTANCE-RECEIPTS.txt` contains a
  **complete internally coherent 8.1 acceptance record** (steps 1–17, all `EXIT_CODE=0`, ends "ACCEPTANCE RUN COMPLETE") mislabeled by a
  9-line pointer claiming the run "could not complete" — false for shipped.
- **Prepared tree** (`cakepanz-4-prepared/`, pin 65673a00): `ACCEPTANCE-RECEIPTS.txt` genuinely **stops mid-step-8b**; k2 is 0 bytes;
  k1 is the script's one-line outer echo. Prepared is honest and incomplete.
- **pickle's two new product defects** (both trees, both filed 2026-11-18T14:15Z after this round's review):
  - **C1/B1 (HIGH, pre-existing):** a NEW draft after a finished draft lands on a lying Complete screen — no board (see §4).
  - **C2/B2 (MEDIUM, pre-existing):** `Complete.svelte` renders an unconditional `<h1>Your draft is complete</h1>` in partial state and a
    live PLAY THE SEASON button that errors on click (see §4).
- **The late-mode flip (Block B, P-337) is deprecated by the Owner's ruling (see the revision note).** The DELIVERED flip works and is
  verified; removing it is deliberate, ordered, and Owner-sanctioned — it is not a revert of an "error", it is following his word. The
  8.1 docs mention the flip (WHAT-CHANGED, VERIFY §21/§22, README-DELIVERY, SHELL-STATUS, SNAPSHOT, MERGE-README, the batteries' headers);
  every such mention gets marked SUPERSEDED-with-date, latest claim respected, history kept.
- **Worktree hygiene:** trees stay byte-identical outside the expected delta; no unrelated churn.

## 3 · PART A — close the 8.1 chain (mandatory; do this first) — UNCHANGED FROM V1

**A1.** Shipped: replace the 9-line pointer at the top of `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` with ONE line (the file IS the complete
final-state record); re-scope the L10 paragraphs and the "ONE open item" claims to per-tree truth in `README-DELIVERY.md`, `WHAT-CHANGED.md`,
`VERIFY.txt` §22.2.
**A2.** Prepared: `bash scripts/acceptance-run.sh` at final bytes, one uninterrupted window; then re-run the same composite in shipped so
**both** files are the same fresh record. Paste both in `VERIFY.txt` §22.2. Replace `k1/k2` with the real outer stdout (or delete the stubs).
**A3.** `cakepanz-4-prepared/MERGE-GUIDE.md` line 3 gains ` (prepared sibling: \`65673a00\` — PREPARED, NOT ACTIVATED; the Owner's word)`;
then numerals gate ×2 per tree under BOTH invocations (`node scripts/gate-numerals.mjs` and
`CP_PIN=65673a00 node scripts/gate-numerals.mjs`) — four runs, all CLEAN, pasted.
**A4.** Package-root `RECEIPTS.md` gains a top banner: everything above the `## partH-c8-1/` section is the c7/c8-era record; the
final-state receipts are `receipts/partH-c8-1/` + `VERIFY.txt` §22.
**A5.** `regen-manifest` ×2 trees; `gate-manifest` PASS ×2 each; `git status` clean except the named deltas; re-zip; sha256 in the reply.
START-OF-CHAT-ZAI.md does not change this sitting unless forced (×3 byte-identical; MUSE told in the reply if it changes).

## 4 · PART B — the two product defects (mandatory; both trees; exact patches) — UNCHANGED FROM V1

**B1 (pickle C1 · HIGH) — a NEW draft after a finished draft must land on the board.**
`src/App.svelte` `startDraft()`: dispatch START before `go('board')` (anchors as v1 §B1). Law **L10** (real-UI new draft after a done
draft → `data-screen="board"`, `status="drafting"`, zero picks, zero page errors); falsifier **F17** (revert the swap → L10 dies).
**B2 (pickle C2 · MEDIUM) — the Complete screen must not lie in partial state.**
`Complete.svelte`: the `<h1>` renders only in the complete branch; the partial branch keeps the existing partial-copy line; the
PLAY THE SEASON button is absent/disabled unless complete (reuse the existing package string "the season needs a finished draft" as its
tip — never invent). Law **L11** (deep-link `#/complete` mid-draft → partial copy renders, no live CTA, zero page errors); falsifier
**F18** (restore static h1/live CTA → L11 dies).

## 5 · PART B-bis — remove the late-mode flip; make the board one uniform board (Owner's ruling, verbatim at the top)

**The consequence, stated plainly so nobody re-introduces it by accident:** there is NO `data-form="simple"`, no `lateMode`, no FULL
BOARD door, no flip at any pick, no honest-line-for-the-flip. The whole board is one board for picks 1–32. The flex table
(above) is the whole reason the second half is lighter — not the UI.

Files and changes (both trees):
- `src/App.svelte`: delete the `myPicks` and `lateMode` deriveds; delete `setFullBoard` and any `$settingsStore.fullBoard` reads;
  restore `startDraft()` to not reset any mode flag.
- `src/lib/port/settings.ts`: **remove** the `fullBoard` field from `Settings`, `DEFAULT_SETTINGS`, and the field-by-field loader (the
  port exception ends; the port returns to pre-8.1). The saved settings blob from existing installs carries an unknown key — the loader's
  `p.fullBoard === true` read must not throw and must be ignored; keep the loader total.
- `src/lib/components/BoardRow.svelte`: delete the `{#if simple}` branch entirely (the shared full row is now the only row); delete the
  `REC` map + `sort` prop if unused after the deletion (the sort prop fed 4.5 captions — keep the caption logic ONLY if the uniform row
  wants the WINS/PRIO/OVR title on the number; the Owner's words say the number shows without mode splits — keep the captions, drop the
  mode-conditional rendering).
- `src/lib/components/DraftBoard.svelte`: delete `data-form`, `lateMode`/`simple`, the FULL BOARD door, the honest switch line; `BoardFooter.svelte`
  keeps the SORT toggle exactly as it was before 8.1 (no lateMode hiding) — slim change; `BoardRow` captions stay.
- `batteries/late.battery.mjs` + `scripts/falsify-late.mjs`: **delete** (the flip and its laws are gone); the batter(s) gains:
  - **L12 (uniform board):** drive picks 1..12 through the real UI; assert `data-form` absent or `"full"` at every pick, zero `.cp-simplerow`
    elements ever, one row anatomy throughout; zero page errors.
  - **L13 (three suggestions highlighted):** at each of three sampled pick states (early/mid/late), assert **at least three** available
    players carry the suggestion highlight (see Part C′) and they are the top three by the board's active order; zero page errors.
- Falsifiers: **F19** (plant a simple branch/always-on mode anywhere → L12 dies).
- `VERIFY.txt`, `WHAT-CHANGED.md`, `SHELL-STATUS.md`, `SNAPSHOT.md`, `MERGE-README.md`, `README-DELIVERY.md`, `FIXLOG.md`,
  `START-OF-CHAT-ZAI.md`: every mention of the flip/simple mode/FULL BOARD/L1–L9 is marked **SUPERSEDED 2026-11-19 (the Owner's ruling; cite this
  order) with the final state re-quoted**; historical text keeps its dates; no rewriting of what was measured — corrections are dated notes.
- Law counts re-quoted everywhere per the A8 rule (node battery, shell/slice counts unchanged in substance — they were never flip-laws; any
  battery file removed is named in the count changes).
- The `8.1` receipt pointers that reference L1–L9/F13–F16 stay as history in `receipts/partH-c8-1/` (append-only; never deleted, never edited).

## 6 · PART C — ONLY the remaining Owner-approved items (v2; the others are dead)

- **C′1 — at least THREE draft suggestions are highlighted on the uniform board.** (The Owner: "as long as there are at least three
  players' draft buttons highlighted i think the user can speedrun the suggestions that way.") Implementation: in `BoardRow.svelte`,
  render the top three available rows by the board's active order with a highlighted DRAFT control (gold ring/shimmer per the house
  style — reuse the existing gold tokens; honour `prefers-reduced-motion`; **no new text**). The count may exceed three only if a tie in
  the underlying order forces it (say so in the code comment).
  - Law: covered by **L13** (§5). Falsifier: **F20** (suppress the highlight on two of the three → L13 dies).
- **C′2 — Complete prints the roster the engine would field** (unchanged from v1 Part D2, post-draft, data-only): `lineupFor` on the
  record, `effOvr` per slot, the three weakest slots; "incomplete" below 11 fielded; numbers + slot labels only; law **L14**; falsifier
  **F21**.
- **C′3 — the wall-slip reveal at Complete** (the Owner: "all for cinematics and any exciting transitions after an action has been
  completed or is about to begin"). On entering Complete, a ≤2 s staggered cascade (title → roster/stats hint → buttons), CSS/Svelte
  transition only, reduced-motion → instant, zero new strings, zero logic changes. Law **L15**; falsifier **F22**.
- **DELETED from v1 (do not build):** the three-choice card (D1); the explain-my-next-pick caption (D3); the `simpleRows`/`pickCard`
  port module (D6, still blocked on the Architect anyway); the visual-regression harness (D5, still blocked on the tokens ruling). The
  60-row uniform board stays, with the three highlights.

**Copy rule (hard):** zero new sentences anywhere. Any label a feature wants that is not already in the w89/package inventory is listed
in the delivery reply for the Owner's one-word pass — never shipped invented.

## 7 · What green looks like (the acceptance set, verbatim)

`test:engine` 394/394 · 406/406; `battery:node` 33/33 both trees (± re-quoted changes); shell **47/0**; slice **29/0/10/3**;
`gate-manifest` PASS 314/319 ×2; numerals gate **CLEAN ×2 per tree both invocations**; both composites exit 0; falsifiers F13–F16 dead
(or marked superseded with the flip removed — the removal itself must not print stale expectations) + **F17–F22 DIED**; VERIFY §22/§23
updated; both `ACCEPTANCE-RECEIPTS.txt` regenerated by the script; re-zip; sha256 in the reply; `git status` clean.

## 8 · Budget and hand-over

If the window closes: **Part A before Part B before B-bis before C, in that order; a sitting that completed A and nothing else still
ships a coherent package.** Never hand-edit a receipt pointer; if something cannot run, the receipt says exactly what did not run and
why, naming the step.

## 9 · What the delivery must contain

`cakepanz-9/` (one zip; the Owner places it nowhere; repo mirrors only): both fixed trees; `receipts/partH-c9/` raw logs; WHAT-CHANGED.md
(one entry per item); the SUPERSEDED markers; VERIFY with the audit table re-pasted; README-DELIVERY/SNAPSHOT/FIXLOG/MERGE-README/RECEIPTS
re-quoted; the uniform board; the three highlights; the Complete roster card and reveal; the B1/B2 fixes; zero `simple`-mode remnants
(grep for `lateMode|fullBoard|DATA-form|data-form` returns nothing outside dated historical files/receipts).

## 10 · NOT yours (leave alone)

The flex table · the pins · λ · labels · Bodoni · 2PT · the never-Touchdown wording · the 3-4 note · the award-line content ·
overall-320 · league-size calibration · Block C · gh-pages placement (none until 76 Pancakes ships) · the 10th-pick anything (gone) ·
the simple mode (gone by your Owner's word — do not resurrect).

## 11 · What is actually yours to decide

Nothing, literally — this is an execution brief. If something forces a judgment call inside the charter, say it in the reply; the
Architect or the Owner rules. Your two legitimate outputs are the work, and the honest report of it.

SPEAKER: INKLING (MUSE delegation) — written 2026-11-19 (v2) from the Owner's 2026-11-19 clarification and the seats' review corpus; filed as a council work order, not as a chat; it binds nobody; the Owner relays it.
