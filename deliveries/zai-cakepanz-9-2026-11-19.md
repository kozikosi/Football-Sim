# WORK ORDER — 67 Cakepanz round 9 (Z.ai) — post-8.1: close the chain, fix the two new defects, ship the Owner-approved shell round

SPEAKER: INKLING (MUSE delegation) | TASK: brief for Z.ai's next sitting — finish cakepanz-8.1 honestly (Part A), close the two
product defects pickle filed on the 8.1 review (Part B), and build the Owner-approved Part D shell features (Part C, per the Owner's
2026-11-19 rulings) | DATE: 2026-11-19 | English only

**For:** Z.ai. If an anchor below does not match the tree you have, STOP and say so — do not improvise. If any instruction collides
with an Owner ruling, flag it and leave it alone. **This order does not re-litigate rounds 8/8.1; it closes them.**

**Standing rulings that ride this order (Owner, verbatim, 2026-11-19; saved `_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt` on `council/muse`):**
- **No updates to gh-pages live until colors / 76 Pancakes is merged and complete.** w89 stays live; the two-file `gh-pages-fix` stays
  UNPLACED; this sitting ships a zip to the repo mirrors only. Publishing anything publicly is OUT OF SCOPE.
- **"Whatever is best for contrast and fulfills my general style guidelines"** — contrast work is approved; rose/gold/white, open airy;
  no orange; gold must not drift orange.
- **"i don't think we need any more text on the site that isn't already present in w89."** — every string you render must be quoted
  from the w89 inventory or the package (README-DELIVERY, Guide, Complete, the existing method tooltips). Nothing may be invented.
  Any sentence a feature wants that is not in the inventory is listed in the delivery reply for the Owner's one-word pass — do not ship it.
- **The flip at the user's 10th pick** — the Owner asked why it differs from the rest of the rounds (his item 6: "This should be a snake draft"). It differs only as presentation (no engine rule, no draft-order rule); it is NOT to be changed, removed or re-thresholded without his word; do not treat this sitting's work as approving any change to it.
- **λ is dynamic and condition-dependent** (Owner, repeated) — the lambda seam is the Architect's; it does not appear in this sitting.
- Hosting: redundant copies on any seat's branch are fine; the Owner does not want a single-host rule.

---

## 0 · Charter (the same as 8.1; nothing moved)

1. **The engine is the truth.** Never the reverse. If a number looks wrong, the engine is right and the UI is wrong.
2. **Zero engine files.** `src/engine/` untouched; `src/lib/port/` gains NOTHING except a one-line import into `Complete.svelte`'s host
   if needed for the engine-fielded roster (or zero — see D2; the import lives in `App.svelte`, the port already exports `lineupFor`).
   Port changes beyond that are out of scope.
3. **Pins stay put.** Shipped `5c808472` (67 files) / prepared `65673a00` (68 files, PREPARED — NOT ACTIVATED, and it stays that way;
   the re-pin is the Architect's post-re-bake call).
4. **The flex table, slots, minClassPool, mode weights** — untouched (census 99 {0:17, 2:17, 6:42, 12:23}).
5. **Owner-gated decisions stay untouched** (contrast sign-off, labels, Bodoni Moda, 2PT, overall-320 vs 10th-pick flip, league-size
   calibration, Block C, gh-pages placement).
6. **One zip, one response, nothing else rides.** No second zip, no gh-pages cut, no re-litigation of c8/c8.1 findings in prose.
7. **Receipts are raw stdout at the final state.** Anything else is REPORTED, named as such, and thin.
8. **Apply-asserted patching.** Every patch carries an anchor; moved anchor → the script throws → fix the anchor, note the drift,
   never widen silently.
9. **English only; plain informative language; the standing Owner style rules.**
10. **Seal the budget before you start** (see §8): this sitting is scoped to Part A (mandatory), Part B (mandatory), and as much of
    Part C as the window holds — in that order. Never let the Paperless Part A/B close broken.

## 1 · Read first, in this order (fetch, then read from git)

| # | What | Where |
|---|---|---|
| 1 | The 8.1 delivery itself (the trees you fix) | `council/inkling @ 5fb4989a` — `_agents/inkling/67-cakepanz-8.1-2026-11-18/` (or your own hosted copy — they are byte-identical) |
| 2 | The five 8.1 review filings (what five seats verified and caught) | `council/pickle:inbox/20261118-1415-pickle-P-316-cakepanz81-review.md`; `council/beam:inbox/20261118-2320-beam-67-cakepanz-8.1-review.md`; `council/vl:_agents/vl/inbox/20261118-2332-vl-cakepanz81-review.md`; `council/inkling:inbox/20261118-2344-inkling-cakepanz-8.1-review.md`; `council/orcaink:inbox/20261118-2353-orcaink-P-337-cakepanz-8.1-review.md` |
| 3 | DS's cakepanz-9 brief (Part D's source and exact texts) | `council/ds:inbox/20261118-1956-ds-R-13-cakepanz-shell-innovations.md` (ideas 1–10); `council/ds:inbox/20261118-2027-ds-P-337-cakepanz-9-order.md` (the superset order, Part C/D) |
| 4 | The compiled seats report (the census this order came from) | `council/inkling:deliveries/cakepanz-seats-reviews-compiled-2026-11-18.md` |
| 5 | The Owner's 2026-11-19 memo (the rulings that ride this order) | `council/muse:_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt` |

If a file you need cannot be read, say so before starting.

## 2 · The state of the world (so you do not re-derive it)

- **Shipped tree** (`cakepanz-4/`): pin `5c808472`. The 8.1 fixes landed; batteries green at my re-runs (33/33 node, 47/0 shell,
  29/0/10/3 slice, 9/9 late); `ACCEPTANCE-RECEIPTS.txt` contains a **complete, internally coherent 8.1 acceptance record** (steps
  1–17, all `EXIT_CODE=0`, ends `== ACCEPTANCE RUN COMPLETE ==`). It is mislabeled by the 9-line pointer on its top, which calls the
  file "the cakepanz-7-era record" and says the composite "could not complete" — false for this tree.
- **Prepared tree** (`cakepanz-4-prepared/`): pin `65673a00`. Same fixes; `ACCEPTANCE-RECEIPTS.txt` genuinely **stops mid-step-8b**
  (command printed, no output, no `EXIT_CODE`); `receipts/partH-c8-1/k2-acceptance-run-prepared.log` is **0 bytes**. Prepared is honest
  and incomplete.
- **L10 (the round's one "open item") is therefore two facts: shipped = CLOSED by its on-disk record; prepared = OPEN at step 8b.**
  Four reviewers (pickle, orcaink, inkling) and one partial (beam) independently confirmed from the bytes; the delivery's prose flags
  it open for both (overclaim).
- **k1** = `acceptance run complete → ACCEPTANCE-RECEIPTS.txt` (the script's one-line outer echo; NOT raw stdout). **k2** = empty.
- `MERGE-GUIDE.md` in the prepared tree contains **0** occurrences of `65673a00` — the numerals gate under its documented prepared
  invocation (`CP_PIN=65673a00`) fails on it. **`RECEIPTS.md`** carries c7-era numbers under final-state framing, outside the gate's list.
- **pickle's two new product defects** (filed 2026-11-18T14:15Z, static-verified in both trees; see §4):
  - **C1/B1 (HIGH, pre-existing in 8.0):** starting a NEW draft after a finished draft lands on a lying Complete screen — no board.
    `App.svelte startDraft()` calls `go('board')` **before** `store.dispatch({ type: 'START' … })`; the done→complete guard inside
    `go()` rewrites `board`→`complete` on the still-done state; nothing re-navigates after the dispatch. Nothing in L8/L9 covers it.
  - **C2/B2 (MEDIUM, pre-existing):** `Complete.svelte` renders an unconditional `<h1>Your draft is complete</h1>` regardless of the
    `data-state={partial|complete}` branch, and the PLAY THE SEASON button stays live in partial state (its click errors "the season
    needs a finished draft").
- **Worktree hygiene:** your prior hosted copies are byte-faithful; keep the two trees in this sitting byte-identical outside the
  expected engine delta (`sim/game.ts` + `sim/passclass.ts` — unchanged by this sitting).

## 3 · PART A — close the 8.1 chain (mandatory; do this first)

**A1. Shipped tree — reconcile the receipt with the bytes.**
- Replace the 9-line pointer block at the top of `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` with ONE line:
  `>>> CAKEPANZ-8.1 (final bytes): this file IS the completed final-state acceptance record (steps 1–17, all exit 0; ends
  >>> "ACCEPTANCE RUN COMPLETE"). RECEIPTS law: raw stdout, both trees. Prepared sibling: see its top pointer.`
  (Keep everything below the pointer — it is real stdout. Do NOT paste fake lines.)
- `README-DELIVERY.md`: re-scope the L10 paragraph — shipped: **closed by the on-disk final-state record** (cite `k1` correctly:
  the outer completion echo; the record is the file); prepared: **closed at <time>** after §A2. Delete the "could not complete" both-trees
  claim; the Verdict line gets one clause: "the acceptance run completes at the final bytes in both trees".
- `WHAT-CHANGED.md` (§5.2 / Block 3 / the "ONE open item" line) and `VERIFY.txt` §22.2 (the L10 row) — same re-scope, per tree.
- If anything above is not how the bytes actually read when you open them, STOP and report — do not edit the bytes.

**A2. Prepared tree — finish the run; regenerate both receipts from final bytes.**
- In `cakepanz-4-prepared/`: `bash scripts/acceptance-run.sh` — **one uninterrupted window**, at the final bytes, with the numerals
  steps in it. Expect exit 0 end to end; when it completes, it rewrites `ACCEPTANCE-RECEIPTS.txt` itself. Paste its final line in
  `VERIFY.txt` §22.2.
- Then run the same composite in `cakepanz-4/` (shipped) so **both** files are the same fresh, complete record. (The shipped run
  already exists; re-running makes the two mutually consistent and byte-paired — it also re-proves the gates after §A3/A4's doc edits.)
- `receipts/partH-c8-1/`: replace `k1/k2` with the two runs' raw outer stdout (or delete the stubs; §5.2 allows either — deletion is
  the cleaner end state). **Do not hand-write k1/k2.**

**A3. The prepared-pin gap in MERGE-GUIDE.md (+ one line, zero meaning change).**
- `cakepanz-4-prepared/MERGE-GUIDE.md` line 3: after "written against: `5c808472`" add
  ` (prepared sibling: \`65673a00\` — PREPARED, NOT ACTIVATED; see SNAPSHOT.md — the Owner's word)`.
- Then run the numerals gate **twice per tree, both invocations** (`node scripts/gate-numerals.mjs`, and
  `CP_PIN=65673a00 node scripts/gate-numerals.mjs` in the prepared tree) — four runs, all must print CLEAN, paste all four in
  `VERIFY.txt` §22.1/§22.2. (Under the default invocation the prepared tree already passes; under the documented one it failed on
  MERGE-GUIDE — this closes it honestly.)

**A4. RECEIPTS.md — a superseded banner, nothing else.**
- Top of `RECEIPTS.md` (package root), above the `# ERNIE · cakepanz-7 review receipts…` heading line:
  `>>> EVERYTHING ABOVE THE "## partH-c8-1/" SECTION IS THE c7/c8-ERA REVIEW RECORD. The current final-state receipts are
  >>> receipts/partH-c8-1/ + VERIFY.txt §22 (suites 394/406, node 33/33, shell 47/0, slice 29/0/10/3, late 9/9, gates 314/319).`

**A5. Re-verify, re-zip, re-quote.**
- `CHECKSUMS.txt`/`MANIFEST.txt` regenerate (`node scripts/regen-manifest.mjs`) in both trees; `gate-manifest` ×2 each tree PASS;
  `CHECKSUMS-c8.1` recounted (or the note "counts hold 314/319" re-verified).
- Re-run the numerals gate at the final bytes (it scans the files you just edited) — ×2 per tree, both invocations, exit 0.
- `diff -rq` the two trees again — the only expected diffs are the engine delta plus this sitting's named docs.
- Re-zip; `sha256`; the reply carries it. START-OF-CHAT-ZAI.md does **not** change this sitting — if any §A edit forces it to, keep ×3
  byte-identical and MUSE is told in the reply.
- `git status` clean except the intended deltas; **nothing** from this sitting goes to gh-pages; the zip goes to the repo mirrors only.

## 4 · PART B — the two product defects (mandatory; both trees; exact patches)

**B1 (pickle C1 · HIGH) — a NEW draft after a finished draft must land on the board.**
- Anchor: `src/App.svelte`, `startDraft()`. **Old:**
  ```
  setTeam(TEAMS[teamIndex].name, slot);
  go('board');
  store.dispatch({ type: 'START', seed, userTeam });
  ```
  **New:**
  ```
  setTeam(TEAMS[teamIndex].name, slot);
  store.dispatch({ type: 'START', seed, userTeam });   // B1: START first — the done→complete guard in go() must read the NEW state
  go('board');
  ```
  WHY: as ordered today, `go()` runs while the previous record is `done`; the guard rewrites `board`→`complete`; the dispatch after it
  never re-navigates; the user sits on a lying Complete screen with no board behind the DRAFT nav. (`loadDraft` already does it this way —
  dispatch LOAD first, then `go('board')` — this makes `startDraft` consistent with it.)
- Law (**L10**, both trees, in `batteries/late.battery.mjs` or `batteries/shell.battery.mjs` — say which, and update the law counts
  everywhere per the A8 rule): finish a draft, then through the **real UI** request a new draft (TEAM nav → Team Select → pick the same
  team → DRAFT AS …); assert `data-screen="board"`, `status="drafting"`, zero picks on the record, zero page errors.
- Falsifier (**F17**): revert the two lines to the ordered form → the law must die, exit 1, with the named red.
- HOW TO CHECK: the L10 leg inside the composite run you do for §A2.

**B2 (pickle C2 · MEDIUM) — the Complete screen must not lie in partial state.**
- Anchor: `src/lib/screens/Complete.svelte`, the `{#if complete}/{:else}` sub block and the CTA row.
- **New:** render the `<h1 class="cp-done-h1">` only in the complete branch; in the partial branch render the partial copy that already
  exists in the file ("The draft has {showInt(picks)} of 1,024 picks in…"); **disable or do not render** the PLAY THE SEASON button
  unless `complete` (if disabled, its `title` = the existing package string "the season needs a finished draft", which the app already
  prints — reuse it, never invent it). No new sentences.
- Law (**L11**, both trees): with a mid-draft record in localStorage, open `#/complete` (deep link); assert the partial copy renders,
  the CTA is absent-or-disabled (and does not navigate), zero page errors.
- Falsifier (**F18**): restore the unconditional h1/live CTA → L11 must die, exit 1.

## 5 · PART C — the cakepanz-9 Block D superset — Owner-ruled "all of these" (2026-11-19), with explanations

Plain words (the Owner asked for explanations; these are them):

- **D1 — the three-choice card.** For picks 11+, instead of the 60-row board, one card of three one-tap options:
  **Best available** (the board's top row), **Best at a slot you're missing** (the top row among your open slots — `openSlots`),
  **Best value that won't last** (the top row that likely expires before your next pick — wins × urgency band). Beneath it:
  `Show the full board` (the existing FULL BOARD door, unchanged) and the existing honest switch line. Presentation only; moves no
  engine number; every candidate is a row of the same VM.
  - Anchor: `DraftBoard.svelte`, the `lateMode` branch. Derive the card from the same `vm.rows` projection (sha-check: card ids == VM
    row ids; card-picks produce the identical store state as picking that row on the board).
  - Law (**L12**): in simple mode the card renders exactly three options, each a distinct VM row; picking "Best available" produces
    the same store state as picking that row on the board; the board is reachable in one click and returns; 390 px clean; the honest
    line still present (existing string).
  - Falsifier (**F19**): plant the card with a fourth candidate / a non-VM row → L12 must die; plant a one-way door → L12 must die.
  - Copy: zero new sentences. (The three option titles — "Best available", etc. — are NOT in the w89 inventory: they ride the delivery
    reply as a question for the Owner, or render as existing index/label-style strings only if one fits. Do not ship them invented.)
- **D2 — Complete prints the roster the engine would field.** After the draft, the Complete screen also shows the engine's own
  4-3 lineup for the record (`lineupFor`) with `effOvr` per slot and the **three weakest slots**; it prints "incomplete" for fewer
  than 11 fielded players. This answers the Owner's "a decent roster" requirement (his words: the second half must need no complex
  math to make a decent roster) with the engine's own answer.
  - Anchor: `Complete.svelte` (new prop `lineup` computed in `App.svelte` — `lineupFor` is already imported in `App.svelte` for the
    advice panel; pass the derived summary down; same call, same inputs as `$advice`).
  - Law (**L13**): the printed lineup equals `lineupFor` by sha of the VM; the three weakest slots are the three smallest `effOvr`s;
    fewer than 11 → the word "incomplete" renders (existing word) and no inventory line renders.
  - Falsifier (**F20**): print a four-weak-slots variant / a wrong lineup → L13 must die.
  - Copy: zero new sentences; numbers + slot labels only (slot labels exist already).
- **D3 — "Explain my next pick".** One tiny caption above the first candidate in the simple form: index by the active sort
  (`WINS`/`PRIO`/`OVR`, the existing 4.5(i) REC map), `% gone` from the row, `fills {slotLabel}` from the row — numbers and existing
  slot labels only. The **full sentence** version is blocked on the Owner's copy (see the no-new-text ruling) and is NOT shipped this
  sitting; the delivery reply lists the proposed sentence for his one-word pass.
  - Law: the caption renders on the first candidate row with the same values the row already carries; absent on non-candidate rows.
- **D4 — wall-slip reveal (ceremony).** On entering Complete, a ≤2 s staggered reveal of the existing Complete content (title → roster
  hint → buttons), CSS/Svelte transition only, `prefers-reduced-motion` collapses to instant, zero new strings, zero logic changes.
  - Law (**L14**): reduced-motion → zero animation time; normal → reveal completes ≤2 s; zero page errors; the CTA is clickable at
    reveal end (and not during).
  - Falsifier (**F21**): remove the reduced-motion branch → L14 must die.

**Explicitly NOT this sitting (do not build; do not re-open):** the `simpleRows(vm)`/`pickCard` port module — **blocked on the
Architect's port ruling**; the visual-regression harness — **blocked on the Architect's tokens ruling (the gold2/text split)**; the
three-choice-card's full "explain" sentence — **blocked on the Owner's copy pass**; the flip-threshold ruling; labels; Bodoni; 2PT;
Block C; gh-pages placement (Owner: none until 76 Pancakes merges and ships); the pins; λ (the Architect's); the flex table.

## 6 · What green looks like (the acceptance set, verbatim)

- `npm run test:engine` → **394/394 shipped · 406/406 prepared**, exit 0;
- `npm run battery:node` → **33/33 both trees** (+ any laws you add, re-quote);
- Browser legs (re-run all four, both trees): shell **47/0** (or 48/0 if L11 lands in the shell battery — say where), slice
  **29/0/10/3**, late **9/9** (or 12/12 with L10–L12); shell/slice/late receipts h-series refreshed;
- Falsifiers: F0-late green; **F13–F16 still DIED**; **F17–F21 DIED** (the new ones);
- `gate-numerals.mjs` ×2 per tree **both invocations → CLEAN ×4**; `gate-manifest` → **PASS 314/319 ×2**;
- `bash scripts/acceptance-run.sh` → **exit 0 in both trees, one uninterrupted window each** (the 8.1 §6.4 discipline —
  and the 8.1 lesson: if it does not finish, the receipt says so in plain words naming the unfinished step; you never hand-edit a
  pointer);
- `VERIFY.txt` §22 gains the new rows (B/C receipts) and the signature audit table is re-pasted at the final bytes;
- `git status` clean except the named deltas; START-OF-CHAT unchanged ×3; the zip sha in the reply.

## 7 · Receipts, honestly (the L10 lesson, said once)

Raw stdout at the final state, or it did not happen. `k*` files are the script's outer echo, never raw per-step stdout. If the budget
closes mid-run: STOP, write the one-line pointer the script would have written (naming the exact unfinished step), keep it honest, and
hand over — never paper over it. This is the class of failure the council found four times in one package; it does not ship twice.

## 8 · Budget and hand-over

Time-box honestly (your 8.1 sitting hit the cutoff mid-composite). If the window closes: **Part A before Part B before Part C, in order;
never let A ride on C's desk.** Hand over what exists, plainly marked WIP, `k*`/receipts truthful, in the delivery reply. Do not
start what you cannot finish.

## 9 · What the delivery must contain

`cakepanz-9/` (one zip; the Owner places it nowhere; repo mirrors only):
- `cakepanz-4/`, `cakepanz-4-prepared/` — both fixed, both composites complete, both receipts regenerated;
- `receipts/partH-c9/` — raw logs for every command this sitting produced (A2's two composites included);
- `WHAT-CHANGED.md` — one entry per Part A/B/C item, anchors and receipts as before;
- `README-DELIVERY.md`, `VERIFY.txt` (§22/§23), `RECEIPTS.md`, `SNAPSHOT.md`, `FIXLOG.md`, `MERGE-README.md` — every count re-quoted;
- the C1/C2 fixes with their laws and falsifiers; the Part C items with theirs.

## 10 · The Owner's calls you must not answer (leave alone)

The 10th-pick flip threshold · labels (Engine/Model/Owner Preset) · the contrast ruling beyond "do the AA work you can defend" ·
Bodoni Moda · 2PT · the never-Touchdown wording · the 3-4 note · the award-line content · overall-320 · league-size calibration ·
λ · Block C · gh-pages placement · the pins · the flex table.

## 11 · What is actually yours to decide

Nothing, literally — this is an execution brief, not a design brief. If something forces a judgment call inside the charter, say it in
the reply; the Architect or the Owner rules. Your two legitimate outputs are the work, and the honest report of it.

SPEAKER: INKLING (MUSE delegation) — written 2026-11-19 from the 8.1 review corpus, the five-seat convergence, and the Owner's 2026-11-19 memo; filed as a council work order, not as a chat; it binds nobody; the Owner relays it.
