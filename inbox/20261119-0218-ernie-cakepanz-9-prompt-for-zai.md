SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: thorough Cakepanz-9 sitting prompt for Z.ai — close 8.1, fix C1/C2, remove the flip (uniform board), build only the Owner-approved items, answer the absorb-work question, brainstorm the w89 tool opportunity | DATE: 2026-11-19T02:18Z
FOR: P-316 (cakepanz-9), P-342 (R-13 / Block C), P-345 (innovation round) — a DRAFT for the Owner to relay; it binds nobody
STATUS: this is my drafting of the sitting brief. Inkling's `deliveries/zai-cakepanz-9-2026-11-19.md` (v2, `64ae07b7`) already exists and covers Parts A/B/B-bis/C; this prompt follows its approved structure and ADDS two non-blocking sections (Part D: the absorb-work answer; Part E: the w89 tool brainstorm) plus the Owner-ruling verbatim block, so the Owner can relay one self-contained brief. Where this and Inkling's order differ, Inkling's order is the council's and this is my draft.

---

# Z.ai — Cakepanz-9 (the sitting that closes 8.1 and makes the board uniform)

**Who you are.** Z.ai, Executor of 67 Cakepanz (the parallel Colors UI track — your tree, your name). You build first, decide the implementation, and innovate what the track needs — inside 67 Cakepanz only. The engine is Claude's; you do not touch it. **Delivery rule:** you cannot push — complete ALL work before responding, and batch every completed piece into a SINGLE response (a single zip). Do not respond with work outstanding; if a piece is blocked, say so and explain the blocker. There is no "push after every file" — the one zip is the delivery.

**What this sitting is.** Five parts, in budget order, and a sitting may close after any part:
- **Part A — close the 8.1 chain honestly** (doc/receipt fixes; no code).
- **Part B — the two product defects the reviews found** (C1, C2; small code + laws).
- **Part B-bis — remove the late-mode flip; make the board ONE uniform board** (the Owner's explicit ruling; this is the big structural change).
- **Part C — ONLY the remaining Owner-approved items** (three highlighted suggestions; the Complete roster card; the reveal).
- **Part D (non-blocking) — answer the absorb-work question** (four lines, the 4 tiers).
- **Part E (non-blocking) — brainstorm the w89 tool opportunity** (charts / heavy tables / dashboards — a ranked idea list for the NEXT round; it does NOT block this sitting and nothing in it ships here).

**The Owner's rulings that govern this sitting (verbatim where they matter):**
- *"q6 i think i was misinterpreted here. everythng should look and feel the same until the end of the draft. that ruling was about letting players flex to dime and fb for cheap."* + *"q13 no the whole draft board should be the same for all picks."* → **The late-mode flip is UNWANTED and REMOVED. The board is ONE board for picks 1–32. The "simple second half" was always the ENGINE (the flex table: FB costs 0 for every position; DIME costs 0 for SS/FS/CB; NICKEL likewise) — not a UI mode.** P-337/Block B was built on a misreading; removing it is following the Owner's word, not reverting an error.
- *"no explain pick. as long as at least three players' draft buttons highlighted i think the user can speedrun the suggestions that way. all for cinematics and any exciting transitions after an action has been completed or is about to begin."* → **No explain-my-pick line. At least THREE available draft buttons highlighted (top three by the board's active order). Cinematics/transitions after an action are wanted (the Complete reveal, Part C′3).**
- *"i don't think we need any more text on the site that isn't already present in w89."* → **Zero new sentences anywhere. Any label a feature wants that is not already in the w89/package copy inventory goes on a list in your reply for the Owner's one-word pass — never shipped invented.**
- *"w89 stays live at gh pages until 76 pancakes is completed."* → **No public-face updates. The two-file gh-pages fix stays UNPLACED and rides the cutover.**
- *"the 0.40 should be a dynamic number that fluctuates based on the conditions of the simulation."* → λ is dynamic; the λ seam stays the Architect's.
- **The draft is a snake** — verify the engine's draft order actually snakes (the Architect/council check), but do not change it here.

**Read first, in this order (fetch, then read from git):**
1. The 8.1 delivery — `council/inkling @ 5fb4989a` → `_agents/inkling/67-cakepanz-8.1-2026-11-18/`.
2. The 8.1 review filings — pickle · beam · vl · inkling · orcaink (+ ernie's `inbox/20261118-2345-…8.1-review.md` and `inbox/20261119-0105-…all-seats-ideas-compiled.md`).
3. The compiled seats report — `council/inkling:deliveries/cakepanz-seats-reviews-compiled-2026-11-18.md`.
4. Inkling's Cakepanz-9 order (v2) — `council/inkling:deliveries/zai-cakepanz-9-2026-11-19.md` (the council's approved structure; follow it where this prompt defers to it).
5. The Owner's 2026-11-19 memo (both messages, verbatim) — `council/muse:_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt`.

**The state of the world (do not re-derive):**
- **Shipped tree** (`cakepanz-4/`, pin `5c808472`): 8.1 landed, battery-verified by seats. `ACCEPTANCE-RECEIPTS.txt` is the **complete internally coherent 8.1 run** — **18× `EXIT_CODE=0`, ends "ACCEPTANCE RUN COMPLETE"** (I verified) — **mislabeled** by a 9-line pointer claiming it "could not complete" and calling the record below it the cakepanz-7-era record. That pointer is false for shipped.
- **Prepared tree** (`cakepanz-4-prepared/`, pin `65673a00`): `ACCEPTANCE-RECEIPTS.txt` genuinely **stops mid-step-8b**; k2 is 0 bytes; k1 is the one-line outer echo. Prepared is honest and incomplete.
- **pickle's two product defects** (both trees, pre-existing, filed for this round): **C1 (HIGH)** new draft after a finished draft lands on a lying Complete screen with no board; **C2 (MEDIUM)** the Complete heading says "Your draft is complete" while partial, with a live PLAY THE SEASON that errors on click.
- **The numerals gate (F6, three-seat finding):** the prepared `MERGE-GUIDE.md:3` still names `5c808472` and never names its own `65673a00`; `gate-numerals.mjs` with `CP_PIN=65673a00` in the prepared tree **FAILS exit 1** ("MERGE-GUIDE.md never names the CURRENT pin"). The shipped tree's gate is genuinely clean.
- **The late-mode flip** (Block B, P-337): the delivered flip works and is verified, but it is **deprecated by the Owner's ruling** (above). Removing it is deliberate, ordered, and Owner-sanctioned. Every 8.1 doc mention of the flip gets a dated **SUPERSEDED 2026-11-19** marker; history keeps its dates; no measured text is rewritten, only corrected with a dated note.

---

## PART A — close the 8.1 chain (mandatory; do this first)

**A1. Shipped `ACCEPTANCE-RECEIPTS.txt` pointer (the load-bearing fix).** Replace the 9-line pointer at the top with ONE line: the final-state run IS this file, every step exited 0. Re-scope the L10 paragraphs and any "ONE open item" claim to per-tree truth in `README-DELIVERY.md`, `WHAT-CHANGED.md` §5.2, and `VERIFY.txt` §22.2 (shipped complete / prepared open at step 8b until A2 lands).

**A2. Finish the prepared composite.** `bash scripts/acceptance-run.sh` end-to-end in the PREPARED tree at the final bytes, one uninterrupted window; then re-run the same composite in shipped so **both** files are the same fresh record. Paste both in `VERIFY.txt` §22.2. Replace `k1/k2` with the real outer stdout (or delete the stubs — a one-line echo is not a receipt). If the prepared composite cannot complete inside this sitting, say exactly which step it died at and why — do not write a pointer claiming otherwise.

**A3. Prepared `MERGE-GUIDE.md` — the one-line pin mention (the F6 fix).** Line 3 gains ` (prepared sibling: 65673a00 — PREPARED, NOT ACTIVATED; the Owner's word)`. Then run `node scripts/gate-numerals.mjs` **twice per tree** — once bare, once with `CP_PIN=65673a00` — **four runs, all CLEAN, pasted with the exact invocation (command + env) in the receipt.** The old h21 prepared receipts were run without the pin set, which is why they passed while the defect stood.

**A4. Package-root `RECEIPTS.md` banner.** One banner line at the top: everything above the `## partH-c8-1/` section is the c7/c8-era record (it prints c7 numbers 311/316, 46/0, 31/31); the final-state receipts are `receipts/partH-c8-1/` + `VERIFY.txt` §22.

**A5. The remaining doc honesty (from the reviews; all doc-only).**
- **START-OF-CHAT-ZAI.md §5.2 (all three copies):** one bullet says §5.2 both ways ("regenerated end-to-end, exit 0, BOTH trees" and "could not complete inside this sitting's time budget"). Rewrite to one consistent per-tree line (shipped complete / prepared open until A2 lands). **Tell me explicitly in your reply that this file changed again — MUSE re-files it on council/muse.**
- **Mediums:** (a) the pointer's "the L10 row in VERIFY §22.2" cross-ref has no such row — add it or drop it; (b) `WHAT-CHANGED.md:93` stale `21d81b7b…` with no SUPERSEDED marker — mark it; (c) `README-DELIVERY-c8.md:39` prints the old dist hash `1529a003…` as current — mark it; (d) `VERIFY.txt:1001` attaches "L10 (the process law)" to a transitions-matrix row — correct the label; (e) the `RECEIPTS.md` banner names the history line range.
- **Lows:** (a) the malformed heading at START line 13 ("…Basketball is deferred.## 2 · Current state…") — split it; (b) `WHAT-CHANGED.md:116` stale START hash `3c0dfd3f…` — mark it; (c) add the raw `sha256sum` stdout of the START/FIX hashes under `receipts/`.
- **A8:** after edits, `regen-manifest` ×2 trees; `gate-manifest` PASS ×2 each; re-quote every sha/count in README-DELIVERY / WHAT-CHANGED / VERIFY §22 from the tools' own prints.

## PART B — the two product defects (both trees; exact patches; code)

**B1 (pickle C1 · HIGH) — a NEW draft after a finished draft must land on the board.**
`src/App.svelte` `startDraft()`: it calls `go('board')` **before** dispatching START, so the `go()` guard (`if s === 'board' && status === 'done' → 'complete'`) reads the still-done status and rewrites the board to Complete, and nothing re-navigates after START. **Fix:** dispatch START **before** `go('board')`, or re-issue `go('board')` after START. Law **L10** (real-UI: new draft after a done draft → `data-screen="board"`, `status="drafting"`, zero picks, zero page errors). Falsifier **F17** (revert the swap → L10 dies).

**B2 (pickle C2 · MEDIUM) — the Complete screen must not lie in partial state.**
`Complete.svelte`: `:19` sets `data-state={complete ? 'complete' : 'partial'}` but `:20` renders an unconditional `<h1>Your draft is complete</h1>` and `:37` leaves PLAY THE SEASON live, which errors ("the season needs a finished draft") when clicked mid-draft. **Fix:** render the `<h1>` only in the complete branch; the partial branch keeps the existing partial-copy line; the PLAY THE SEASON CTA is absent/disabled unless complete (reuse the existing package string "the season needs a finished draft" as its tip — never invent). Law **L11** (deep-link `#/complete` mid-draft → partial copy renders, no live CTA, zero page errors). Falsifier **F18** (restore static h1/live CTA → L11 dies). Cover both the deep-link and Back paths.

**B3 (low, rides B):** `VERIFY.txt:823/:832` (both trees) still present the removed `simpleOff` as current design — update to the uniform-board design. `BoardRow.svelte:22`'s `aria-controls` references an element that exists only while expanded — make the controlled element exist (or the reference conditional) so the link is never dangling.

## PART B-bis — remove the late-mode flip; make the board ONE uniform board (the Owner's ruling)

**The consequence, stated plainly so nobody re-introduces it:** there is **NO `data-form="simple"`, no `lateMode`, no FULL BOARD door, no flip at any pick, no honest-line-for-the-flip.** The whole board is one board for picks 1–32. The flex table is the whole reason the second half is lighter — not the UI.

Files and changes (both trees):
- `src/App.svelte`: delete the `myPicks` and `lateMode` deriveds; delete `setFullBoard` and any `$settingsStore.fullBoard` reads; `startDraft()` resets no mode flag (it already resets none after B1's fix).
- `src/lib/port/settings.ts`: **remove** the `fullBoard` field from `Settings`, `DEFAULT_SETTINGS`, and the field-by-field loader (the 8.1 port exception ends; the port returns to pre-8.1). The loader's `p.fullBoard === true` read must not throw on an old saved blob and must ignore the unknown key; keep the loader total.
- `src/lib/components/BoardRow.svelte`: delete the `{#if simple}` branch entirely (the shared full row is the only row); keep the WINS/PRIO/OVR caption on the number (drop only the mode-conditional rendering).
- `src/lib/components/DraftBoard.svelte`: delete `data-form`, `lateMode`/`simple`, the FULL BOARD door, the honest switch line. `BoardFooter.svelte` keeps the SORT toggle exactly as before 8.1 (no lateMode hiding). `BoardRow` captions stay.
- `batteries/late.battery.mjs` + `scripts/falsify-late.mjs`: **delete** (the flip and its laws are gone). Add to the shell battery:
  - **L12 (uniform board):** drive picks 1..12 through the real UI; assert `data-form` absent or `"full"` at every pick, zero `.cp-simplerow` elements ever, one row anatomy throughout; zero page errors.
  - **F19** (plant a simple branch/always-on mode anywhere → L12 dies).
- Docs: `VERIFY.txt`, `WHAT-CHANGED.md`, `SHELL-STATUS.md`, `SNAPSHOT.md`, `MERGE-README.md`, `README-DELIVERY.md`, `FIXLOG.md`, `START-OF-CHAT-ZAI.md`: every mention of the flip/simple mode/FULL BOARD/L1–L9 is marked **SUPERSEDED 2026-11-19 (the Owner's ruling; cite this order) with the final state re-quoted**; historical text keeps its dates; no measured text is rewritten. Law counts re-quoted per A8 (shell/slice counts are unchanged in substance — they were never flip-laws; name any removed battery file in the count changes). The `8.1` receipt pointers that reference L1–L9/F13–F16 stay as history in `receipts/partH-c8-1/` (append-only; never deleted, never edited).

## PART C — ONLY the remaining Owner-approved items (the others are dead)

**C′1 — at least THREE draft suggestions highlighted on the uniform board.** (Owner: *"as long as there are at least three players' draft buttons highlighted i think the user can speedrun the suggestions that way."*) In `BoardRow.svelte`, render the top three available rows by the board's active order with a highlighted DRAFT control (gold ring/shimmer per house style — reuse the existing gold tokens; honour `prefers-reduced-motion`; **no new text**). The count may exceed three only if a tie in the underlying order forces it (say so in a code comment). Law **L13** (at each of three sampled pick states — early/mid/late — at least three available players carry the highlight and they are the top three by the active order; zero page errors). Falsifier **F20** (suppress the highlight on two of the three → L13 dies).

**C′2 — Complete prints the roster the engine would field** (data-only, post-draft): `lineupFor` on the record, `effOvr` per slot, the three weakest slots; "incomplete" below 11 fielded; numbers + slot labels only; **no new sentences**. Law **L14**; falsifier **F21**.

**C′3 — the wall-slip reveal at Complete** (Owner: *"all for cinematics and any exciting transitions after an action has been completed or is about to begin"*). On entering Complete, a ≤2 s staggered cascade (title → roster/stats hint → buttons), CSS/Svelte transition only, reduced-motion → instant, **zero new strings**, zero logic changes. Law **L15**; falsifier **F22**.

**DELETED from earlier drafts (do NOT build):** the three-choice card (D1); the explain-my-next-pick caption (D3); the `simpleRows`/`pickCard` port module (D6 — also moot now the board is uniform); the visual-regression harness (D5 — blocked on the tokens ruling). The 60-row uniform board stays, with the three highlights.

**Copy rule (hard):** zero new sentences anywhere. Any label a feature wants that is not already in the w89/package inventory is listed in the delivery reply for the Owner's one-word pass — never shipped invented.

## PART D — answer the absorb-work question (non-blocking; four lines)

The Owner: *"we need to figure out a plan for z.ai to absorb more of claude's remaining work as claude is much more limited by token usage."* Read Inkling's ask in full — `council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md` — then answer in four lines: **(1)** which tiers (or none) you will take (Tier 1 pure shell ops; Tier 2 exact-patch under Architect diff review; Tier 3 build-under-spec from written briefs; Tier 4 never moves — engine semantics, λ, protected constants/re-pins, the unrelated-histories cutover merge, final acceptance, every Owner-gated ruling); **(2)** what breaks in your setup if you take them; **(3)** what must change first (protocol, specs, reviews); **(4)** your honest capacity in sittings per week. Name what you will NOT take (e.g. anything touching the engine). Think beyond the four tiers if a better split gets the engine finished sooner without putting the product at risk — say so plainly, with cost and prerequisites.

## PART E — brainstorm (non-blocking; the w89 tool opportunity — for the NEXT round, nothing here ships)

The Owner wants the site upgraded beyond w89 — awards, season stats, all-team stats, playoff stats, dashboards — and he asked whether outside tools could genuinely improve it. Frame every idea by **use case**, and apply the rule: **a tool earns its place only if it solves a real use case AND beats the framework-native option.** Rank your best ideas with the reasoning. The seeds (all render layer; the engine already computes the data):
- **Charts** (ECharts or unovis, framework-agnostic) — the single biggest gap: "who won MVP and *why*", a player's game-by-game, a team's scoring trend, a PF-vs-PA scatter. Engine data: `seasonAwards()`, `LEADER_KEYS`, `standings.Book` (PF/PA/net/SoS), per-game box scores.
- **Heavy sortable tables** (TanStack Table + Virtual) — season stats (1,953 players), all-team stats (32 rows). Both frameworks have adapters; the Svelte adapter is already installed. **Not the draft board** — the board stays a list + DRAFT button.
- **Icons** (Lucide), **PWA** (vite-plugin-pwa, the offline requirement), **html-to-image** (share card).
- **Do NOT propose:** drag-and-drop on the draft board (the DRAFT button is more efficient — one click, no drag target, no mobile tap problem); a state library (overkill for a snapshot engine); component kits (fight w89's identity).
- **The copy constraint binds here:** any chart/table label must be quoted from w89's existing stat vocabulary; a label that does not exist in w89 goes on the Owner's one-word list.
- **The framework tie-in:** the genuine upgrades (charts, TanStack Table + Virtual, Lucide, PWA, html-to-image) are **framework-agnostic ties** — they do not decide Vue vs Svelte. If the R-13 bench is expanded, it should measure a **heavy-table + dashboard surface** (where the frameworks can differ), not just the Draft Board (where they are equal).

## Budget, acceptance, and what the delivery must contain

- **Budget order:** Part A before Part B before B-bis before Part C; a sitting that completes A and nothing else still ships a coherent package. Parts D and E never displace A/B/B-bis/C.
- **What green looks like:** `test:engine` 394/394 · 406/406; `battery:node` 33/33 both trees (± re-quoted changes); shell **47/0**; slice **29/0/10/3**; `gate-manifest` PASS 314/319 ×2; numerals gate **CLEAN ×2 per tree, both invocations**; both composites exit 0; falsifiers F13–F16 dead-or-superseded + **F17–F22 DIED**; VERIFY §22/§23 updated; both `ACCEPTANCE-RECEIPTS.txt` regenerated by the script; re-zip; sha256 in the reply; `git status` clean.
- **The delivery:** `cakepanz-9/` (one zip) — both fixed trees; `receipts/partH-c9/` raw logs; WHAT-CHANGED.md (one entry per item); the SUPERSEDED markers; VERIFY with the audit table re-pasted; README-DELIVERY/SNAPSHOT/FIXLOG/MERGE-README/RECEIPTS re-quoted; the uniform board; the three highlights; the Complete roster card and reveal; the B1/B2 fixes; **zero `simple`-mode remnants** (`grep -rE "lateMode|fullBoard|data-form" src` returns nothing outside dated historical files/receipts).
- **Not yours (leave alone):** the flex table · the pins · λ · labels · Bodoni · 2PT · the never-Touchdown wording · the 3-4 note · the award-line content · overall-320 · league-size calibration · Block C · gh-pages placement (none until 76 Pancakes ships) · the 10th-pick anything (gone) · the simple mode (gone by the Owner's word — do not resurrect).

**Close.** File your reply as one message with the zip. Name every judgment call you had to make; if an anchor does not match the tree you have, STOP and say so — do not improvise. The two legitimate outputs are the work and the honest report of it.

---

*Filed as a council draft by ERNIE (advisor); it binds nobody; the Owner relays it. Inkling's `zai-cakepanz-9-2026-11-19.md` (v2) is the council's approved order and is followed here; the additions are Part D (absorb-work) and Part E (the w89 tool brainstorm), both explicitly non-blocking.*