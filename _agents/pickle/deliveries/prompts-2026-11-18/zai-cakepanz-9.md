# CONTINUATION PROMPT — Z.ai / 67 Cakepanz, the round-9 sitting (proposed 2026-11-18 by Pickle)

**Authority:** proposed at the Owner's request by Pickle (council adviser), not issued by MUSE or the
Architect. It does **not** supersede Inkling's work order v2 (`deliveries/zai-cakepanz-8-2026-11-18.md`
@ `origin/council/inkling` `ae303ded`, blob `58a8269013e33274f87a53eef96b77a34765e14e`). Everything
below is an addendum that rides on that order's rules, plus the findings of my independent review.
The Owner or MUSE relays it; if a successor work order contradicts any line here, the successor wins.

**One-line brief:** cakepanz-8 is a sound delivery — I re-ran its engine/gate/node facts and they all
reproduce, and A1–A9 are closed — but P-337 (Block B) shipped three render-layer defects that its own
brief forbids. Fix those three with new laws and falsifiers, re-cut **one** zip as `67-cakepanz-9-…`,
and then hold at the Block C gate until the Owner rules on it. Do not re-open the pin, the flex table,
or the engine.

---

## 0 · Read first, in this order (all refs are blobs; print what you resolved)

1. The round-8 work order, in full: `git show origin/council/inkling:deliveries/zai-cakepanz-8-2026-11-18.md`
   (blob `58a82690`, identical at `ae303ded` and the current inkling tip — I checked). §1 is the
   baseline, §2 is A1–A9, §3 is Block B, §4 is Block C, §5 is the standing rules, §7 is disagreement.
2. **My hosted copy of your delivery and my review**, both pushed to `council/pickle` (remote tip
   `6e47d7ea` at the time of writing):
   - `_agents/pickle/deliveries/zai-cakepanz-8-2026-11-18/` — byte-identical to your Desktop folder
     (1006 files, 35 MB, canonical manifest `9a01358217139f9b89920167429d3b311baa45acb50810c7c999dd598f6d0d7b`).
   - `inbox/20261118-1953-pickle-P-316-cakepanz8-review.md` — VERDICT **improved**; §3 has the three
     defects with anchors and fixes, §4 has the implications, §5 names what I did not run.
3. The two prior reviews your order already named: Inkling's `20261118-0745-inkling-cakepanz7-review.md`
   (ok-with-notes) and Ernie's `20261118-0758-ernie-P-316-cakepanz-7-review.md` (**improved**, the
   order's author). Ernie's is the one who will re-check §1 and the A1/A2 mutations when your zip lands.
4. `RECEIPTS.md` at the package root (Ernie's c7 receipt) and `WHAT-CHANGED.md` at the c8 package root.

Do not re-derive the baseline from prose. If any number below differs from a tool you run, **your
number wins — with the command and its raw stdout attached**.

---

## 1 · State of the world, verified before this prompt was written

All of the following I ran myself on the hosted copy (Node v26.13.0, 18 Nov 2026) unless labelled:

| Fact | Result |
|---|---|
| Shipped engine | `src/engine` byte-identical to pin `5c808472`, **67 files**, `diff -rq` exit 0 |
| Prepared engine | byte-identical to pin `65673a00`, **68 files**, exit 0; **PREPARED, NOT ACTIVATED** |
| Flex | byte-identical to both pins (`cmp` exit 0 ×2); census **99 rules {0:17, 2:17, 6:42, 12:23}**, `SS>NICKEL=0`, `FB>TE=2` |
| Engine suites | **394/394** shipped · **406/406** prepared, fail 0 |
| Node battery | **33/33** both trees (N28 RESUME + N29 DONE-DRAFT) |
| Gates | shipped **PASS (314)** · prepared **PASS (319)** |
| Cross-tree | `src/` outside `src/engine` byte-identical; `dist/` byte-identical; `single.html` sha `1529a003763459aa78ab7ef92917a136f9cc9f0d841afe1915218bde2742e737` (526,576 B) |
| Falsifier | I re-ran `node scripts/receipt-falsifier.mjs`: F0 baseline OK, **F1–F12 ALL DIED** |
| A1–A9 | anchors present in **both** trees; A3's cloned log ends green; three `START-OF-CHAT-ZAI.md` copies byte-identical (`3c0dfd3f…`) |
| Not re-driven by me | browser legs (shell 47/0, slice 29/0/10/3, late 6/6), `falsify-late` (F13-late DIED), `npm ci` rebuild, `acceptance-run.sh` composite — **REPORTED** from your receipts, not measured here |

Context, not instructions: Architect tip `57fb83c` (the pools-node down-preserving fix; delta from
`65673a00` is two source files plus tests); live site is **wave 89** (`origin/gh-pages` `66096fb`);
deployed `67-cakepanz` still names `4ca9a071` and carries 277/9 against its own suite (REPORTED);
the staged two-file gh-pages fix is **still not placed** — that is the Owner's click.
Your c8 zip sha `ced094f1…5fae` is REPORTED from your report; I did not have the zip itself.

---

## 2 · SCOPE OF THIS SITTING

Two things, in this order:

- **Block B-prime:** close B1, B2 and B3 (below) in both trees, with laws and falsifiers, and re-cut
  the delivery as `67-cakepanz-9-<date>/`. This closes P-337 properly.
- **Block C:** remain **NOT STARTED** unless and until the Owner rules that the push of Blocks A and B
  to `council/pickle` satisfies the round-8 §4 gate ("only after Blocks A and B are pushed"). That
  ambiguity is named in my review §4.1; it is a ruling, not a seat's assumption. If the ruling is
  "not yet", say so in the delivery and stop at Block B-prime.

One sitting, one zip, nothing else rides.

---

## 3 · BLOCK B-PRIME — the three defects, with exact fixes

Common rules for all three: apply-asserted patches in **both** trees (an anchor that moved throws,
F2/F3 lesson); render layer only; zero engine files, zero engine semantics, zero `port/` changes;
`src/` outside `src/engine` must remain byte-identical between the two trees; every result is raw
stdout at the final state.

### B1 — the FULL BOARD choice is lost on a mid-draft refresh [defect, medium; fix first]

**Where** (`src/App.svelte`, both trees): `:67` `let simpleOff = $state(false);` · `:119`
`simpleOff = false;` (in `startDraft`) · `:320`
`const lateMode = $derived(myPicks >= 10 && $draftState?.status !== 'done' && !simpleOff);` ·
`:371` `onfullboard={() => { simpleOff = true; }}`. Read path: `hydrateBoot()` at `:194-203` and
`src/lib/port/hydrateApp.ts:22` (`AUTO_DRAFT_KEY = sportKey('nfl','autosave:draft')` →
`sim:nfl:autosave:draft`), `:25` `AutosaveLineage`, `:33` `autosaveDraft`, `:54` `readAutosave`.

**Shown defect:** a user who takes FULL BOARD at pick 11, refreshes mid-draft (the flow Slice 3
supports), comes back in **simple** form, because `simpleOff` is pure in-memory state and is
recomputed as `false` on boot. That contradicts the round-8 §3 line "the FULL BOARD door returns the
full form and **stays** for the rest of the draft".

**Fix, in this shape:**

1. Persist the preference in a **shell-owned** localStorage key scoped to the save, e.g.
   `sim:nfl:ui:fullBoard:<saveId>` holding a boolean. **Do not add a field to `AutosaveLineage` or
   the engine's serialize/restore envelope** — that envelope is frozen and "the engine is the truth".
   The save id is already available from `metaNow()` / `draftSaveId`; if the key cannot be written
   before `draftSaveId` exists, write it at the same moment `autosaveDraftNow()` first runs.
2. Initialise `simpleOff` from that key **synchronously at component setup**, not inside the async
   `hydrateBoot()` — otherwise the first post-reload render still computes `lateMode` with `false`.
   Guard it by save id: a key from a previous save must never re-apply to a new draft.
3. Keep `simpleOff = false` in `startDraft()` and clear/ignore the old key there.
4. Preserve the current behaviour that `lateMode` is `false` once `status === 'done'`.
5. Correct L3's overstated detail string: either rename it to say what it actually proves (full stays
   across further picks **in one session**) or let the new L7 carry the "rest of the draft" claim.

**New law L7** in `batteries/late.battery.mjs`: take FULL BOARD at the user's 11th pick → assert
`data-form === 'full'` → reload the page with the draft autosave present (mirror S29's reload
discipline: read `localStorage.getItem('sim:nfl:autosave:draft')` before reload, require the board to
rehydrate) → assert `data-form === 'full'` again, with the same user team and pick count, and zero
page errors. A refresh in simple mode is the control: it must still come back simple.

**New falsifier F14-late** in `scripts/falsify-late.mjs`: delete the persistence restore in a throwaway
copy; L7 must die with a named `FAIL L7 …`. Keep the D-2 law: a case that cannot run is a FAILURE,
never a "DIED"; apply-assert every mutation.

**Receipt:** `receipts/partI-c9/b1-before-probe.log` (the defect reproduced pre-fix),
`b1-after-probe.log`, `late-battery-final-{shipped,prepared}.log` (now **7 pass · 0 fail**),
`falsify-late-final-shipped.log` (F0-late 7/7 + F14 DIED), and an A1 re-proof log (the new read at
boot must not regress mid-season hub landing).

### B2 — the simple row's expand button is a dead affordance [defect, low]

**Where:** `src/lib/components/BoardRow.svelte` — the `{#if simple}` branch at `:13-23` renders
`<button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>` but has
**no** `{#if open}` detail block. The detail (flex options + primary DRAFT chip) exists only in the
full branch at `:34-45`.

**Fix:** render that same detail inside the simple branch when `open` is true, so the round-8 promise
"one click from the full detail" is true for the row itself as well as for the FULL BOARD door. Keep
the single-number row unchanged when closed — L2's anatomy law must still pass. If you judge that
reintroduces too much complexity into the simple form, the alternative is to remove the toggle and
`aria-expanded` from the simple row and say so explicitly in `WHAT-CHANGED.md` — but do not leave a
control that changes state with no visible result.

**Extend L2:** after clicking a simple row's main button, assert the chip/detail block is visible and
the closed form still has exactly one recommendation number + gone% + DRAFT. Add a falsifier case
(F15-late) that removes the detail from the simple branch and must kill the extended L2.

### B3 — sort and the single number can disagree [defect, low]

**Where:** `src/lib/components/BoardFooter.svelte:11-15` (SORT toggle reveals `SortControls` in simple
mode) · `src/lib/components/BoardRow.svelte:18` (`<span class="cp-num cp-rec">{r.wins}</span>` — always
wins) · `src/App.svelte:58` (`let sort: BoardSort = 'wins'`) and `:148` (`setSort`).

**Defect:** changing sort in simple mode reorders `vm.rows`, but the only number shown stays wins, so
the single number no longer explains the order.

**Fix (recommended):** pass the active `sort` into `BoardRow` and display the matching field with a
short label (`WINS` / `PRIO` / `GONE%`), with the method tooltip staying on gone%. Alternative, if the
label crowds 390 px: reset `sort = 'wins'` when simple mode engages and put the other sorts behind
the FULL BOARD door only — but then remove the SORT toggle from the simple footer, do not leave both.
**No new jargon** (the Owner's rule) and no engine number moves: L4's VM-sha invariance must stay green.

**Extend L2 or add L8:** change sort in simple mode, assert the displayed number/label tracks the
active sort and the row order matches it; assert 390 px stays clean with the longest label.

### Cross-cutting acceptance for Block B-prime

- late battery **7/7 or 8/8** as built (quote the tool's own print, not a guessed count), both trees;
  falsifier cases DIED, each naming its law; F0-late clean baseline green.
- shell **47/0**, slice **29/0/10/3**, node **33/33**, engine **394/406**, gates **314/319** (or the
  numbers the tools print at the final state — if a new file changes a manifest, re-quote it and say
  why), dist byte-identical across trees with its new sha, zero page errors across every flip.
- `WHAT-CHANGED.md` gains one c9 entry per defect with anchors, before/after, receipt names; `VERIFY.txt`
  gains §22 with the raw stdout; README/SHELL-STATUS/SNAPSHOT/FIXLOG/MERGE-README counts re-quoted.
  Do **not** gratuitously touch `START-OF-CHAT-ZAI.md`; if you do, all three copies stay byte-identical.

---

## 4 · THE ZIP (one, and only one)

- Name `67-cakepanz-9-<date>/`, same layout as c8: two fixed trees, `receipts/` (raw logs, one per
  command, each ending green or explicitly named as a first attempt), `WHAT-CHANGED.md`,
  `README-DELIVERY.md` (c8's kept beside it), `VERIFY.txt` §22, updated status docs.
- Every count-bearing line carries the number the tool printed at the **final** state; dated
  corrections are fine for history, wrong as current claims (that was A8, keep the discipline).
- One zip → sha256 → Owner places it. **Push nothing** unless the Owner has explicitly granted you
  push access in this round's brief; if he has, `git ls-remote origin refs/heads/<your-branch>` must
  equal `git rev-parse HEAD` after every push, and never force-push.
- Never hand the Owner a sandbox path as a deliverable.

---

## 5 · BLOCK C — R-13, the framework round (gated; do not start without the ruling)

Preconditions, all three: Blocks A and B pushed/placed as the Owner rules; the three B-prime fixes
receipted; an explicit Owner/MUSE "go" on the gate ambiguity named in §2 above.

Carry the round-8 §4 **verbatim** into the c9 work order when it opens; its substance:

- The ruling (Owner, 2026-11-15): Vue 3 + Vite vs Svelte 5 + Vite, **measurement decides**; React is
  out and to be removed (R-9). You build both arms.
- **Do not port the 12-slice shell.** Port **one sealed slice**: the Draft Board (the 60-row table,
  sort, slot picker, pick confirm, needs row) against the **same TS core, unchanged**
  (`src/lib/port/**` — 21 modules — plus `src/lib/valuation.ts`; zero framework, zero `document`).
  The measurement is about the render layer, not the port.
- **Counterbalance:** a first-arm 2:1 advantage is a learning artefact, not a framework effect. Same
  builder, same slice, twice, in reverse order (Svelte→Vue, then Vue→Svelte); report both runs.
- Report exactly these, side by side, with commands: render-layer lines (`.svelte` vs `.vue`);
  production bundle bytes and gzip bytes; boot-to-first-paint, median of 5 runs, both arms, both
  orders; the acceptance battery's pass count on each arm (same battery, same assertions); the TS
  core diff between arms — must be **empty**, or say what moved and why.
- **No verdict beyond the numbers.** The Owner decides. The queue says 50/50 and not to re-litigate.

---

## 6 · Standing rules (inherited; violation reopens the item)

1. **Your tree only** — `67-cakepanz` and the waves you publish to `origin/gh-pages`. Never edit
   `colors/` (the Architect's). Never edit another seat's files or another seat's branch.
2. **No re-pin on your own.** Shipped `5c808472`, prepared `65673a00` stay exactly as they are;
   Architect tip `57fb83c` is context only. GLM stays OFF. If a re-pin is ordered later: the five
   paths, byte-identical, verified in the same commit; never bundle it into B-prime.
3. **The engine is the truth.** If a UI number looks wrong, the engine is right and the UI is wrong.
   Never edit the engine to match a UI; never edit flex, slots, `minClassPool`, mode weights, or any
   engine semantics for a render-layer fix.
4. **Receipt law.** Every claim carries a receipt: command + raw stdout at the final state. Anything
   else is `REPORTED`, named. `REPORTED` is not `VERIFIED`; never write one as the other.
5. **Falsifier law (D-2).** A case that could not run is a FAILURE, never green and never "DIED".
   Every mutation is apply-asserted; if the anchor moved, throw with file and anchor. A clean baseline
   runs first.
6. **The Owner's seven open decisions are not yours to settle:** the light-gold2 contrast, the dark
   `--text` contrast, the award line content, the `Model Value` label (both live labels currently;
   picking one is the Owner's), the 3-4 note, the "never print Touchdown" law, and the prepared
   re-pin. Flag them; do not fix them.
7. **The Architect's five open items are not yours either:** the P-317 store, the OT `clock()`, the
   `localStorage.ts:31` parameter property, `deviceId`, gravity/double-teams.
8. **Thread/receipt hygiene:** `receipts/partC/gh-pages-fix/` remains staged and unplaced; do not
   re-cut that zip. The 9 stale flex expectations on the deployed tree are an Owner/Architect call,
   untouched by you. Keep every count-bearing doc line honest (A8's rule).
9. **English only**, every document and every receipt. Label every claim VERIFIED / REPORTED /
   INFERRED / UNKNOWN.

---

## 7 · What to flag, not decide (≤5 questions, each with my recommended default)

1. **B4 threshold** — keep the flip on the **user's own 10th pick**. Arithmetic: overall pick
   `288 + slot` → 289 at slot 1, 320 at slot 32; the "overall 320" alternative would give a slot-1
   user 31 extra deep picks after round 10, which does not match Q6's "first ten rounds". Nothing is
   blocked; flag it in `README-DELIVERY.md` as the Owner's call.
2. **Block C gate** — recommend: treat the `council/pickle` push as closing A1–A9 and B-prime for
   review, but require an explicit Owner "go" before R-13 starts. R-13 is blocked until then.
3. **gh-pages placement** — recommend the Owner place the staged two-file fix; the deployed tree is
   stale and no c8/c9 fix reaches a user until he does. Placement is blocked on his click.
4. **Prepared re-pin** — recommend leaving `65673a00` unactivated and shipped at `5c808472`.
5. **Reviewers for c9** — three seats who wrote none of it. Pickle authored this prompt and the c8
   review, so Pickle is **not** eligible to review c9; say so in the delivery rather than assigning
   anyone (nobody is assigned to anything in this council).

---

## 8 · What to report back (exact shape, so the next reviewer can check it)

```
SPEAKER: ZAI | ROLE: executor, 67 Cakepanz | TASK: c9 — B-prime fixes (+ Block C only if ruled open) | DATE: <UTC>
READ: <the work order, my review, the two prior reviews — with the refs/shas you resolved>
STATE: wave <n> live · pins untouched (<shipped> / <prepared>) · Block B-prime <closed/open> · Block C <not started / opened by ruling>
PLAN: <one zip, sha256 below, nothing pushed>
```

Then: **reading checks** (what you fetched, bytes/hashes matched); **what ran** (all six sections of
§3 with commands and raw stdout, late battery's own count, falsifier deaths, A1 re-proof, gates ×2
per tree, cross-tree dist sha); **what you did not run** (named, with the reason — no vague "all green");
**the blocked list** (the five questions above, verbatim, plus anything the Owner/Architect holds);
**deliverable** (the zip path at final state + sha256 + entry count).

If you disagree with any line here, **file the disagreement** — do not silently do something else.
The places I expect legitimate pushback are the B1 persistence shape (a separate shell-owned key vs
extending the lineage — I chose the key because the envelope is frozen), the B3 label crowding 390 px,
and whether the `council/pickle` push already opens Block C. One sitting, one zip, nothing else rides.
