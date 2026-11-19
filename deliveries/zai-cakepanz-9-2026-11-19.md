# WORK ORDER — 67 Cakepanz round 9 (Z.ai) — v4 (2026-11-19): the sitting, consolidated once, for the Owner to relay

SPEAKER: INKLING | TASK: one self-contained brief for Z.ai's next sitting — close 8.1 to `ok` honestly (Part A), fix the two product
defects (Part B), remove the flip and make the board uniform (Part B-bis, the Owner's ruling), build ONLY the Owner-approved items
(Part C), answer the absorb-work question (Part D, non-blocking), and brainstorm — not build — the w89 tool opportunity (Part E, non-blocking)
| DATE: 2026-11-19 | English only

**Revision note (v4):** v4 supersedes v3 (`252bc556`), v2 (`64ae07b7`), both MUSE 8.2 drafts, AND Ernie's well-made draft
(`council/ernie:inbox/20261119-0218-ernie-cakepanz-9-prompt-for-zai.md`, which is absorbed — thanks, Ernie) in their entirety. There is
exactly one brief, this file. v4 absorbs Ernie's two additions as full sections (Part D — the absorb-work answer; Part E — the w89 tool
brainstorm), adds the missing snake-verification note, and fixes two of his factual edges (see §7).

**For:** Z.ai, Executor of 67 Cakepanz (your tree). If an anchor below does not match the tree you have, STOP and say so — do not
improvise. If any instruction collides with an Owner ruling, flag it and leave it alone. This order does not re-litigate rounds 8/8.1; it
closes them.

---

## 0 · Charter (nothing moved)

1. **The engine is the truth.** Never the reverse. If a number looks wrong, the engine is right and the UI is wrong.
2. **Zero engine files.** `src/engine/` untouched. `src/lib/port/` gains NOTHING (Part B-bis restores the pre-8.1 port).
3. **Pins stay put.** Shipped `5c808472` / prepared `65673a00` (PREPARED — NOT ACTIVATED; re-pin happens once, on the Architect's
   post-re-bake call + the Owner's word).
4. **The flex table, slots, minClassPool, mode weights** — untouched (99 rules {0:17, 2:17, 6:42, 12:23}). Any DIME broadening is a
   protected constant with the Owner's exact values, built by the Architect, re-pinned — never here.
5. **Owner-gated decisions stay untouched** (labels, Bodoni Moda, 2PT, overall-320, league-size calibration, Block C, gh-pages placement,
   the cap-70 sign disagreement, the Guide graphics P-144, the "also fits" disposition).
6. **One zip, one response, nothing else rides.** Nothing to gh-pages — Owner (2026-11-19): **no updates to any public face until
   Colors / 76 Pancakes merges and ships**; w89 stays live; the two-file `gh-pages-fix` stays UNPLACED and rides the cutover.
7. **Receipts are raw stdout at the final state.** Anything else is REPORTED, named as such, and thin. The L10 lesson (8.1) is law: if a
   run does not finish, the receipt says so plainly naming the step; nobody hand-writes a "COMPLETE" pointer over an unfinished run.
8. **Apply-asserted patching.** Every patch carries its anchor; a moved anchor throws; fix the anchor, note the drift, never widen.
9. **English only; plain informative language.**
10. **Budget sealed:** A → B → B-bis → C → D → E. If the window closes, Part A completes first; a sitting that completed A and nothing else
    still ships a coherent package. Parts D and E never displace A/B/B-bis/C.

**The Owner's rulings (verbatim, 2026-11-19; saved `council/muse:_agents/owner-notes/2026-11-19-*.txt`):**

> "*q6 i think i was misinterpreted here. everythng should look and feel the same until the end of the draft. that ruling was about letting players flex to dime and fb for cheap.*"
> "*q13 no the whole draft board should be the same for all picks.*"
→ **The late-mode flip is UNWANTED and REMOVED. The board is ONE board for picks 1–32.** The "simple second half" was always the ENGINE
(the flex table: FB costs 0 for every position; DIME costs 0 for SS/FS/CB; NICKEL likewise) — not a UI mode. P-337/Block B was built on a
misreading; removing it is following the Owner's word, not reverting an error.

> "*no explain pick. as long as at least three players' draft buttons highlighted i think the user can speedrun the suggestions that way. all for cinematics and any exciting transitions after an action has been completed or is about to begin.*"
→ **No explain-my-pick line. At least THREE available draft buttons highlighted** (top three by the board's active order). Cinematics and
transitions after an action completes — or before one begins — are wanted (Part C′3).

> "*i don't think we need any more text on the site that isn't already present in w89.*"
→ **Zero new sentences anywhere.** Any label a feature wants that is not already in the w89/package inventory goes on a list in your reply
for the Owner's one-word pass — never shipped invented.

> "*w89 stays live at gh pages until 76 pancakes is completed.*" → **No public-face updates.**
> "*the 0.40 should be a dynamic number that fluctuates based on the conditions of the simulation*" → λ is dynamic; the λ seam stays the Architect's.

**The snake note (Owner asked twice why the board would differ by pick — he is right to, and this is the check):** the draft IS a snake
(rounds alternate the league order). Whether the engine's actual `snakeOrder()` output snakes identically to the Owner's expectation is a
verification item for the Architect/council against the ruling — **you never change the order; you confirm it and report.** (If the engine
does not snake as ruled, that is the Architect's defect, filed separately.)

## 1 · Read first, in this order (fetch, then read from git)

| # | What | Where |
|---|---|---|
| 1 | The 8.1 delivery itself | `council/inkling @ 5fb4989a` — `_agents/inkling/67-cakepanz-8.1-2026-11-18/` |
| 2 | The 8.1 review filings | pickle · beam · vl · inkling · orcaink (paths as in all prior drafts) |
| 3 | The compiled seats report | `council/inkling:deliveries/cakepanz-seats-reviews-compiled-2026-11-18.md` |
| 4 | The Owner's 2026-11-19 memos (verbatim) | `council/muse:_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt` + `-board-uniform-verbatim.txt` |
| 5 | The tools/opportunities ASK (for Part E seeds) | `council/inkling:inbox/20261119-0236-inkling-tools-and-w89-opportunities.md` |

## 2 · The state of the world (do not re-derive)

- **Shipped tree** (`cakepanz-4/`, pin 5c808472): 8.1 landed; `ACCEPTANCE-RECEIPTS.txt` is a **complete internally coherent 8.1 record**
  (steps 1–17, all `EXIT_CODE=0`, ends "ACCEPTANCE RUN COMPLETE") mislabeled by its 9-line pointer ("could not complete"…"cakepanz-7-era
  record") — false for shipped.
- **Prepared tree** (`cakepanz-4-prepared/`, pin 65673a00): the file genuinely **stops mid-step-8b**; `k2` is 0 bytes; `k1` (52 B) is the
  script's one-line echo — neither is a receipt.
- **pickle's two product defects** (both trees): **C1 (HIGH)** new draft after a finished draft lands on a lying Complete screen —
  `startDraft()` calls `go('board')` before dispatching START; the done-guard rewrites the board to Complete; nothing re-navigates.
  **C2 (MEDIUM)** `Complete.svelte` renders "Your draft is complete" unconditionally; PLAY THE SEASON stays live in partial state.
- **The flip (Block B, P-337):** works, is verified — and is **deprecated by the Owner's ruling** (§0). Removing it is deliberate and
  ordered; every 8.1 doc mention gets a dated **SUPERSEDED 2026-11-19** marker; nothing measured is rewritten; history keeps its dates.

## 3 · PART A — close the 8.1 chain honestly (mandatory; first; both trees where named)

**A1. Shipped pointer (the load-bearing fix).** Replace the 9-line pointer at the top of `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` with ONE
line: `>>> CAKEPANZ-8.1 (final bytes): this file IS the completed final-state acceptance record (steps 1–17, all exit 0; ends "ACCEPTANCE
RUN COMPLETE"). Prepared sibling: see its own top pointer.` Keep everything below — never edited.
**A2. Both: scope the L10 claims per tree.** `README-DELIVERY.md` (verdict line + the "ONE open item" paragraph): shipped = closed by the
on-disk record (cite `k1` honestly as the outer echo); prepared = open until A2's composite lands (§B). Same in `WHAT-CHANGED.md` (§5.2,
Block 3, "ONE open item") and `VERIFY.txt` §22.2 (add the L10 row if absent).
**A3. Prepared `MERGE-GUIDE.md` line 3** gains ` (prepared sibling: \`65673a00\` — PREPARED, NOT ACTIVATED; the Owner's word)` — then run
`gate-numerals.mjs` **twice per tree under both invocations** (`node scripts/gate-numerals.mjs` and `CP_PIN=65673a00 …` in prepared) — four
runs, all CLEAN, all four pasted in `VERIFY.txt` §22 with **the invocation (command + env) in the receipt**. The old receipts ran the
default invocation only — which is why the defect stood.
**A4. `RECEIPTS.md` (package root) top banner:** everything above the `## partH-c8-1/` section is the c7/c8-era record (it prints 311/316,
46/0, 31/31); the final-state receipts are `receipts/partH-c8-1/` + `VERIFY.txt` §22.
**A5. `k1`/`k2`:** regenerate from the real runs (item B), or delete. A one-line echo is not "raw stdout". Do not hand-write them.
**A6. `START-OF-CHAT-ZAI.md` §5.2 bullet (all three copies):** one consistent per-tree line (shipped complete / prepared open until the
§B composite lands). **Tell the Owner explicitly in your reply that this file changed again — the Owner/MUSE re-files it on council/muse.**
The three copies stay byte-identical (`cmp` ×2, sha recorded).
**A7. Mediums:** (a) add the missing L10 row to VERIFY §22.2 (or drop the cross-reference); (b) `WHAT-CHANGED.md:93` stale `21d81b7b…` —
mark `SUPERSEDED; measured 1b9bea5f…`; (c) `README-DELIVERY.md:37` claims the old dist hash is marked in the c8 README — it isn't
(`README-DELIVERY-c8.md:39` prints `1529a003…e737` as current) — mark it in the c8 README; (d) `VERIFY.txt:1001` — remove "L10 (the process
law)" from the transitions-matrix row 11 label (that row's laws are L8/L9-family; L10 is the acceptance-run law); (e) the banner names its
history line range.
**A8. Lows:** (a) all three START copies carry a malformed heading at line 13 (`…Basketball is deferred.## 2 · Current state…` on one line) —
split it, §2 becomes a header; (b) `WHAT-CHANGED.md:116` stale `3c0dfd3f…` — mark `SUPERSEDED; 8ef3b18d…`; (c) raw `sha256sum` stdout of the
START/FIX hashes under `receipts/`; (d) **VERIFY.txt `:823`/`:832` (both trees)** — replace the `simpleOff`-as-current design prose with the
post-B-bis reality (uniform board; cite this order); (e) **BoardRow `aria-controls="cp-fit-{r.id}"`** — the referenced element exists only
when open; make the controlled element always exist (hidden container, same id) or gate the reference on open — pick one, say which.
**A9. Prepared `MERGE-README.md` line 16:** one dated marker sentence — the paragraph is the 2026-11-17 sitting's verdict, superseded;
current state rides `SNAPSHOT.md` + `VERIFY.txt` §22.
**A10. Re-verify and re-zip:** `regen-manifest` ×2; `gate-manifest` PASS ×2 each; `diff -rq` the trees (expected diffs: the engine delta +
this sitting's named docs); `git status` clean; sha256 in the reply.

## 4 · PART B — the two product defects (both trees; exact patches)

**B1 (pickle C1 · HIGH) — a NEW draft after a finished draft must land on the board.**
`src/App.svelte` `startDraft()` (~lines 111–115): dispatch `START` BEFORE `go('board')` (or re-issue `go('board')` after START — say which).
Law **L10** (real-UI: finish a draft → TEAM nav → Team Select → same team → DRAFT AS … → `data-screen="board"`, `status="drafting"`, zero
picks, zero page errors). Falsifier **F17**.
**B2 (pickle C2 · MEDIUM) — the Complete screen must not lie in partial state** (render layer): the `<h1>` renders only in the complete
branch; the partial branch keeps the existing partial-copy line; PLAY THE SEASON absent/disabled unless complete (tip = the existing
package string "the season needs a finished draft" — never invent). Law **L11** (deep-link `#/complete` mid-draft → partial copy, no live
CTA, zero page errors; Back path covered too). Falsifier **F18**.

## 5 · PART B-bis — remove the late-mode flip; ONE uniform board (the Owner's ruling)

**There is no `data-form="simple"`, no `lateMode`, no `simpleOff`, no `setFullBoard`, no FULL BOARD door, no flip at any pick.** Mechanics
(both trees):
- `src/App.svelte`: delete the `myPicks`/`lateMode` deriveds; delete `setFullBoard` and `$settingsStore.fullBoard` reads; `startDraft()`
  resets no mode flag.
- `src/lib/port/settings.ts`: delete `fullBoard` from `Settings`/`DEFAULT_SETTINGS`/loader (the 8.1 exception ends; port returns to pre-8.1).
  The loader stays total — unknown `p.fullBoard` in an old blob is ignored, never throws.
- `BoardRow.svelte`: delete the `{#if simple}` branch (the shared full row is the only row). Keep the WINS/PRIO/OVR caption (drop only mode-conditional rendering); say which in the reply.
- `DraftBoard.svelte` / `BoardFooter.svelte` / `ModeSwitch.svelte`: delete `data-form`, `lateMode`/`simple`, the door, the line; `BoardFooter`
  reverts to the pre-8.1 SORT-toggle placement.
- `batteries/late.battery.mjs` + `scripts/falsify-late.mjs`: **delete**. Add to the shell battery: **L12** (uniform board: picks 1..12,
  `data-form` absent at every pick; **zero** `.cp-simplerow`/`.cp-fullbtn` nodes ever; one anatomy; zero page errors). Falsifier **F19**
  (plant a simple branch anywhere → L12 dies).
- Docs: every flip mention marked **SUPERSEDED 2026-11-19 (the Owner's ruling; cite this order)**, final state re-quoted; dated history kept
  (the 8.1 receipts are append-only — never edited or deleted). Law counts re-quoted per the A8 rule.

## 6 · PART C — only the Owner-approved items (the rest are dead or blocked)

**C′1 — ≥3 draft suggestions highlighted on the uniform board.** Owner: *"as long as at least three players' draft buttons highlighted
i think the user can speedrun the suggestions that way."* `BoardRow.svelte`: the top three available rows by the board's **active** order
render with a highlighted DRAFT control (gold ring/shimmer in the house tokens; honour `prefers-reduced-motion`; **no new text**). More than
three only on an order tie (code comment says so). Law **L13** (sampled early/mid/late picks: ≥3 highlights, exactly the top three by the
active order; zero page errors). Falsifier **F20**.
**C′2 — Complete prints the roster the engine would field** (post-draft; data-only): `lineupFor` on the record, `effOvr` per slot, the three
weakest slots; "incomplete" below 11 fielded; numbers + existing slot labels only; **no new sentences**. Law **L14**; falsifier **F21**.
**C′3 — the wall-slip reveal at Complete** (Owner: *"all for cinematics and any exciting transitions after an action has been completed or
is about to begin"*): ≤2 s staggered cascade on entering Complete (title → stats hint → buttons); CSS/Svelte transition only; reduced-motion
→ instant; zero strings; zero logic changes. Law **L15**; falsifier **F22**.
**C′4 — Ernie's F3: swap the late-surface gold literals onto the tokens** (both trees; measured): `BoardRow.svelte` 9, `DraftBoard.svelte` 4,
`BoardFooter.svelte` 3, `Feed.svelte` 2, `Saves.svelte` 2 — 20 literals, hard-coded `#e8c87e`/`#8a5f18`/`rgba(217,169,76,…)`. Swap each for
the matching token (`var(--gold2)`/`var(--gold3)`/`color-mix(in srgb, var(--goldm) N%, transparent)`); never the reverse; the dark tokens' own
values (the w89 reference, lines 112/120 of `tokens-w89.css`) are the spec — untouched. Contrast re-receipts (`probe-contrast.mjs`) pasted
after; the measured floors never regress.
**C′5 — NOT built this sitting:** the stats/awards dashboards (separate brief; six Owner questions pending); Guide graphics P-144 (your pick);
"also fits" (slot+flex is the sanctioned "Flex x (-y)" shape per V23 §3 — Owner + Architect rule on OR's flag, nothing changes here); P-317
(Architect's store); cap-70 sign (Owner); MIT/PWA/analytics anything.

## 7 · PART D — answer the absorb-work question (non-blocking; four lines)

The Owner: *"we need to figure out a plan for z.ai to absorb more of claude's remaining work as claude is much more limited by token
usage."* Read `council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md` in full, then answer in four lines: **(1)** which
tiers (or none) you will take (Tier 1 pure shell ops — receipts/batteries/fresh-clone/manifest re-zips; Tier 2 exact patches under Architect
diff review; Tier 3 build-under-spec; Tier 4 never — engine semantics, λ, protected constants/re-pins, cutover merge, final acceptance,
Owner-gated rulings); **(2)** what breaks in your setup if you take them; **(3)** what must change first (protocol, specs, reviews);
**(4)** your honest capacity in sittings per week. Name what you will not take. Think beyond the four tiers if a better split gets the
engine finished sooner without risking the product — say so plainly, with cost and prerequisites.

## 8 · PART E — brainstorm (non-blocking; for the NEXT round; nothing here ships)

The Owner asked for better awards/stats/dashboards beyond w89 and whether outside tools genuinely help — ideas framed by **use case**.
Rank your best, with reasoning. House-honesty applies: data that exists today is buildable; data that doesn't stays the Architect's.
Seeds (all render layer; see also `council/inkling:inbox/20261119-0236-inkling-tools-and-w89-opportunities.md`, the standing ASK):

- **Charts (ECharts or Unovis — framework-agnostic).** "Who won MVP and *why*" (leaders + award line), a team's scoring trend, a
  PF-vs-PA scatter (all inputs exist: `seasonAwards()`, `LEADER_KEYS`, table PF/PA). A per-week win-probability series does NOT exist in
  the VM — do not propose charts that need it until the Architect says so.
- **Heavy sortable tables** (TanStack Table, headless) — season stats (1,900+ drafted players), all-team stats (32 rows). **Correction to
  the Ernie draft: neither scaffold installs the adapter** (`arm-svelte` has none; the 8.1 Svelte manifest has none) — a build-item for this
  brief either way, never claimed as already-present. **Not the draft board** — the board stays a list + DRAFT button.
- **Lucide icons** (awards/nav polish) · **html-to-image** (the share card, if Part C′2's roster card ships — then the card is inline, and
  html-to-image may not be needed) · **PWA (vite-plugin-pwa)** — the Owner-challenge-worthy candidate for the offline story, but **an Owner
  ruling, not yours**; this product's saves are its sync story and a service worker risks stale-cache incidents; mark it for him, build nothing.
- **Do NOT propose:** drag-and-drop on the board (the DRAFT button is more efficient — your predecessor seats were corrected on exactly
  this), a state library (a snapshot engine needs a snapshot; a second store is a bug farm), UI kits (they fight w89's identity — GPT agrees).
- **Framework tie-in (for the Architect, not for you):** if the R-13 bench is expanded, it should measure a **heavy-table + dashboard
  surface** — where the frameworks can differ — not the Draft Board, where they tie. Whether the bench expands is the Owner's/Architect's call.
- **Copy constraint binds here too:** every chart/table label must be quoted from w89's existing vocabulary; anything else goes on the
  Owner's one-word list.

## 9 · Acceptance set (verbatim for this sitting)

`test:engine` **394/394 shipped · 406/406 prepared**; `battery:node` **33/33 both trees**; shell **47/0** (or 48/0 — say where L11/L13/L15
landed and re-quote); slice **29/0/10/3**; `gate-manifest` **PASS 314/319 ×2**; numerals gate **CLEAN ×2 per tree, both invocations (×4)**;
falsifiers F13–F16 superseded with the flip + **F17–F22 DIED**; VERIFY §22/§23 updated; **both composites exit 0** (prepared first — it's the
missing one — then shipped re-run for parity); both `ACCEPTANCE-RECEIPTS.txt` regenerated BY THE SCRIPT; re-zip; sha256 in the reply;
`git status` clean; START-OF-CHAT byte-identical ×3; no gh-pages; no pin movement; zero engine files.

## 10 · Not yours (leave alone)

The flex table · the pins · λ · labels · Bodoni · 2PT · the never-Touchdown wording · the 3-4 note · the award-line content · overall-320 ·
league-size calibration · Block C · gh-pages placement · the stats/awards brief · Guide graphics P-144 · the "also fits" disposition · the
simple mode (dead by the Owner's word — do not resurrect, do not hide behind a flag, do not leave its laws green) · P-317 · the cap-70 sign call.

## 11 · Hand-over and the copy rule (hard, again)

If the window closes: **A → B → B-bis → C → D → E**, in that order; a sitting that completed only A is a good sitting. Zero new sentences;
anything text-like not in the w89/package inventory ships as a listed question for the Owner, never as invented copy. Name every judgment
call you made. If an anchor does not match the tree, STOP and say so. The two legitimate outputs are the work and the honest report of it.

SPEAKER: INKLING — written 2026-11-19, v4. Supersedes v3/v2/both 8.2 drafts/Ernie's draft in full; thanks, Ernie — the structure, Part D/E
and the snake note are yours (his draft is `council/ernie:inbox/20261119-0218-ernie-cakepanz-9-prompt-for-zai.md`). Filed as a council work
order, not as a chat; it binds nobody; the Owner relays it.
