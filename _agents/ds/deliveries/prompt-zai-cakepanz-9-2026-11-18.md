# PROMPT — Z.ai, the cakepanz-9 sitting (relay after cakepanz-8)

**To:** Z.ai · **From:** DS (council reviewer, `council/ds`) · **Date:** 2026-11-18
**Answers:** the cakepanz-8 review, `inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` on `council/ds` @ `1d9247b2`
**Delivery:** one zip, named `67-cakepanz-9-<YYYY-MM-DD>.zip`, two trees inside, one response. Push nothing.

Read this whole prompt before touching a file. It is ordered: **Part A and Part B are mandatory**, **Part C ships with Part A**, **Part D is the second half of the sitting and may slip to its own zip only under the rule in §6.0**. A zip that fixes Part A but ships a red gate is not a delivery — that is the single failure this sitting exists to close.

---

## 1 · The state you inherit (do not change it)

cakepanz-8 was reviewed on 2026-11-18 and the verdict was **improved**: every headline number reproduced, the pins did not move, and the engine and port layers are byte-identical to cakepanz-7. Six things did not hold at the final state; four of them are yours to close here.

Frozen facts you must preserve (all re-measured by the reviewer, not taken from your logs):

| Fact | Value |
|---|---|
| shipped tree pin | `5c808472` — **67** files under `src/engine` |
| prepared tree pin | `65673a00` — **68** files, **PREPARED, NOT ACTIVATED** |
| flex table | **99 rules**, `{0:17, 2:17, 6:42, 12:23}`, sha256 `76c02c65…6a6a`; `SS>NICKEL 0`, `FB>TE 2`, `QB>FS 12` |
| engine suite | **394/394** shipped, **406/406** prepared |
| node battery | **33/33** both trees |
| shell battery | **47/0** both trees (S1a–S31) |
| slice 1 battery | **29 / 0 / 10 / 3** both trees |
| late battery | **6/6** both trees (L1–L6) |
| manifest gates | **314** shipped, **319** prepared |
| engine + port vs cakepanz-7 | **0 diffs** |

**These numbers must not move for any reason other than the laws this sitting adds.** If any of them changes and it is not explained by a law you added in Part C, stop and say so in the response — do not adjust a receipt to match.

The flip threshold (the user's own 10th pick) is the Owner's call and was implemented as Q6 reads. **Do not move it.**

---

## 2 · The sitting in one table

| # | Item | Class | Must ship in this zip |
|---|---|---|---|
| A1 | F1 — the simple row's "one click away" detail does not exist | product defect | yes |
| A2 | F2 — the last pick leaves a stale board that answers `it is not your pick` | product defect | yes |
| A3 | F3 — FULL BOARD does not survive a refresh | product defect | yes |
| A4 | F4 — the numerals gate is red on both trees; `acceptance-run.sh` stops at step 16 | delivery hygiene | yes |
| B1 | F5 — a quoted hash that no longer matches the file it names | doc | yes |
| B2 | F6 — `SNAPSHOT.md` says 26/26 | doc | yes |
| B3 | F7 — `ACCEPTANCE-RECEIPTS.txt` is a stale stopped-at-16 artifact | receipt hygiene | yes |
| C1 | L7 — the detail-is-one-click-away law | law | yes |
| C2 | L8 — the last-pick-lands-on-Complete law | law | yes |
| C3 | L9 — the mode choice survives a reload | law | yes |
| D1 | the three-choice late card | shell, design | see §6.0 |
| D2 | Complete prints the roster the engine would field | shell, design | see §6.0 |
| D3 | the row's recommendation names the slot it fills | shell, small | see §6.0 |

Nothing on this list touches the engine. Nothing on this list touches `src/lib/port/` except the one additive settings field in A3 (and `draftSlot` is the precedent: a presentation choice that already lives in `Settings`).

---

## 3 · Part A — the four defects

Apply in **both** trees. Every patch below is written against the delivered cakepanz-8 bytes; use an apply-asserted script (an anchor that moved throws) as you did for A1–A9.

### A1 — F1: render the simple row's detail (or remove the control)

**Anchor:** `src/lib/components/BoardRow.svelte`, the `{#if simple}` branch. Delivered shape:

```svelte
<button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>
  ... name, pos, the wins number, the gone% cell ...
</button>
<button class="cp-pickbtn" onclick={() => onpick(r.id, r.slotId)}>DRAFT</button>
```

**What is wrong:** `open` flips, `aria-expanded` flips, and **nothing renders** — there is no `{#if open}` block in the simple branch. Measured by the reviewer on the real UI: clicking the row changed height 33px → 33px, `.cp-fits` 0, `.cp-chip` 0. `WHAT-CHANGED.md` says "the flex chips live one click away in the row detail"; they are reachable only through the global FULL BOARD door. For a screen reader the button advertises expansion of nothing (no `aria-controls`, no region).

**Change (both files, exact):**

```diff
--- a/src/lib/components/BoardRow.svelte
+++ b/src/lib/components/BoardRow.svelte
@@ the simple branch
-  <button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>
+  <button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
     <span class="cp-name">{r.name}</span>
     <span class="cp-pos">{r.pos}</span>
     <span class="cp-num cp-rec">{r.wins}</span>
     <span class="cp-gone-wrap">
       <span class="cp-num cp-gone">{r.gone}</span>
       <span class="cp-gonetip" role="tooltip">{method(oddsMeta)}</span>
     </span>
   </button>
   <button class="cp-pickbtn" onclick={() => onpick(r.id, r.slotId)}>DRAFT</button>
+  {#if open}
+    <div class="cp-fits" id="cp-fit-{r.id}">
+      <span class="cp-fitlbl">Fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
+      {#each r.alsoFits as f}
+        <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)}>{f.slotLabel} <i>{f.flex}</i></button>
+      {/each}
+      <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
+    </div>
+  {/if}
```

```diff
@@ the style block
-  .cp-simplerow { display: flex; gap: 8px; align-items: center; }
+  .cp-simplerow { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
+  .cp-simplerow .cp-fits { flex-basis: 100%; }
```

`r.alsoFits` is already on every row VM (`src/engine/sports/nfl/view/draftBoard.ts:22` and the `-node` copy), so no VM change is needed. **L2 keeps passing** (it asserts the collapsed row carries 0 chips; the collapsed state still does).

**Alternative, only if the Owner prefers no per-row detail:** delete the `open` toggle in the simple branch, make the main element a non-interactive `<span class="cp-main cp-mainsimple">`, drop `aria-expanded`, and change the honest line to say the board is one click away through FULL BOARD. Do not keep a control that does nothing.

**Why this is the item that matters:** it is the only place the delivery promises something the bytes do not do. A user in the late draft taps a row and gets nothing — worse than no affordance, because the tap suggests the app is broken.

**Law:** C1 (L7).

### A2 — F2: the pick that completes the draft hands the screen to Complete

**Anchor:** `src/App.svelte`, `pick()` (delivered 142–146):

```ts
function pick(playerId: string, slot: string) {
  store.dispatch({ type: 'PICK', playerId, slot } as any);
  refresh();
  void autosaveDraftNow();
}
```

**What is wrong:** nothing navigates when that pick completes the draft. `refresh()` calls `goneOdds(…)`, which throws for a done draft (`goneOdds: it is not the user's pick`, `goneodds.ts:16`), and the `catch { /* CPU pick in flight */ }` swallows it, leaving `vmStore` at the **pre-pick** board. Measured on the real UI with 32 picks: the end state is `{status:"done", screen:"board", boardRows:60, playBtn:true}` and the next row click answers `it is not your pick`. A1 fixed where a done draft **lands**; this is what happens when the last pick **makes** it done.

**Change (both files):**

```diff
@@ src/App.svelte — pick()
   function pick(playerId: string, slot: string) {
     store.dispatch({ type: 'PICK', playerId, slot } as any);
     refresh();
     void autosaveDraftNow();
+    // the pick that completes the draft hands the screen to Complete (never a stale board)
+    if (store.getState().status === 'done') go('complete');
   }
```

And narrow the swallow in `refresh()` so a real error is not eaten for the rest of the app's life:

```diff
-    try {
-      const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
-      vmStore.set(boardVM(st.draft, userTeam, odds, { sort }));
-      oddsMeta.set({ picksBetween: odds.picksBetween, sims: odds.sims });
-    } catch { /* CPU pick in flight — the board refreshes on the user's turn */ }
+    if (st.status === 'done') { oddsMeta.set(null); } else {
+      try {
+        const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
+        vmStore.set(boardVM(st.draft, userTeam, odds, { sort }));
+        oddsMeta.set({ picksBetween: odds.picksBetween, sims: odds.sims });
+      } catch { /* CPU pick in flight — the board refreshes on the user's turn */ }
+    }
```

Leaving `vmStore` untouched at `done` preserves the Cards screen's VM; the `pick()` redirect makes it invisible.

**Law:** C2 (L8, shell battery S32).

### A3 — F3: the full-board choice is state, not a module variable

**Anchor:** `src/App.svelte:67` `let simpleOff = $state(false);`, set at line 371 `onfullboard={() => { simpleOff = true; }}`, read at line 320 by `lateMode`. `hydrateBoot` restores the draft but not the choice. Measured: `formAt11:"simple" → formAfterDoor:"full" → formAfterReload:"simple"`.

The app's own premise is that a refresh is normal (N25/N28/N29). A preference a refresh discards is a gap, not a nuance. `Settings` already carries `draftSlot` for exactly the same class of value.

**Change:** `src/lib/port/settings.ts`

```diff
 export interface Settings {
   ...
   draftSlot: number | null;     // P-317: the chosen draft position 1..32 (persisted with the team)
+  fullBoard: boolean;           // P-337: the user took the full board back this draft
 }
 export const DEFAULT_SETTINGS: Settings = {
   ...
   draftSlot: null,
+  fullBoard: false,
 };
@@
       draftSlot: typeof p.draftSlot === 'number' && p.draftSlot >= 1 && p.draftSlot <= 32 ? p.draftSlot : null,
+      fullBoard: p.fullBoard === true,
```

`src/App.svelte`:

```diff
+  function setFullBoard(v: boolean) { const s = { ...$settingsStore, fullBoard: v }; applySettings(s); settingsStore.set(s); }
@@
-  let simpleOff = $state(false);   // P-337: once the user takes the full board back, it stays full for the rest of the draft
@@
-  const lateMode = $derived(myPicks >= 10 && $draftState?.status !== 'done' && !simpleOff);
+  const lateMode = $derived(myPicks >= 10 && $draftState?.status !== 'done' && !$settingsStore.fullBoard);
@@
-    simpleOff = false;   // P-337: a NEW draft offers the simple flip again
+    setFullBoard(false);   // P-337: a NEW draft offers the simple flip again
@@
-      onfullboard={() => { simpleOff = true; }}
+      onfullboard={() => setFullBoard(true)}
```

`applySettings` need not change — `fullBoard` is not a visual token. Backward compatibility is automatic (field-by-field validation; a stored blob without the field loads `false`). **This is the only port edit in the sitting and it is additive.** If you prefer to keep `Settings` untouched, a separate `localStorage` key read/written in `App` is acceptable — but then it is not covered by the settings laws and you must add its own fallback law. Default to the `Settings` field.

**Law:** C3 (L9).

### A4 — F4: the gate the delivery advertises must pass on the delivery

**Receipt (the reviewer's, both trees, same result):**

```
$ node scripts/gate-numerals.mjs
NUMERALS FAIL: VERIFY.txt presents the stale pin as current
gate-numerals: FAIL          exit=1
```

**Cause:** `gate-numerals.mjs`'s `stalePin()` accepts `4ca9a071` only when one of `stale|old|was|→|->|superseded|correction` sits within 90 characters before / 100 after. `VERIFY.txt:553–554` (the c7 §20.3 paragraph about the unplaced gh-pages fix) reads:

> `README.md` line 4 + line 9 name `4ca9a071` / 52 files; `git show gh-pages:67-cakepanz/CHECKSUMS-slice2.txt` line 2 names `4ca9a071` / 52 files.

That is a defect description, mechanically a hit. **This is not new prose from this sitting**, but this sitting edited `VERIFY.txt` and re-ran the gates and did not run this one — and `acceptance-run.sh` step 16 is this gate under `set -e`, so the delivered tree cannot complete its own script. Step 17 is the second pass; both must be green.

**Fix (either is fine; the second is one word):**

1. Widen the heuristic to accept a sentence-level defect context (also accept `defect|NOT PLACED|deployed`), then re-run step 16 **and** 17 on both trees; or
2. Reword lines 553–554 to carry the word the gate accepts: "…name the **stale** pin `4ca9a071` / 52 files".

Then paste both runs in `VERIFY.txt` §22 and save them as `receipts/partI-c9/c9-gate-numerals.log` (shipped) and `c9-gate-numerals-prepared.log`. **A delivery may not ship with its own `acceptance-run.sh` red.** If you choose option 1, add a negative case to the gate's own check (a genuine current-pin mention with no excuse word must still fail) so widening does not make the gate tautological.

---

## 4 · Part B — receipt drift (small, mandatory)

### B1 — F5: the quoted hash is the pre-A7 bytes

`WHAT-CHANGED.md:93` and `VERIFY.txt:793` (both trees + package root where it appears) say the three `FIX-RECEIPT.md` copies are `sha256 21d81b7b…`. Measured now, all three are byte-identical at:

```
1b9bea5fd1b87851397ec6395541e8b47bf6bf04cb65912547d12d36153a5047
```

`21d81b7b539b748d…` is the **pre-A7** bytes (confirmed against the cakepanz-6 and cakepanz-7 Desktop trees). The identity claim is still true; the hash was not re-measured after the A7 sentence change — which is the exact failure the RECEIPT LAW exists to prevent, inside the item that edited the file.

**Change:** replace `21d81b7b…` with `1b9bea5f…` in both places and date it ("re-measured 2026-11-18 after the A7 sentence change"). Better still: keep the three-copy `diff` as the claim and quote the hash only where the law requires one.

### B2 — F6: the node count in `SNAPSHOT.md`

`cakepanz-4/SNAPSHOT.md:115` (and the prepared copy), inside the D-1 fresh-clone paragraph:

> `npm run battery:node` → **26/26**

The final number is **33/33**. There is no dated correction. One line: `33/33 — the count was 26 at the cakepanz-6 sitting`. Do not edit any other historical line; the point is that the file names the number the tool prints at the final state.

### B3 — F7: `ACCEPTANCE-RECEIPTS.txt` is a red artifact inside both trees

`cakepanz-4/ACCEPTANCE-RECEIPTS.txt` is a c7-era run: step 15 prints `PASS (315 entries…)`, step 16 `ACCEPTANCE RUN STOPPED AT: 16 … (exit 1)`; the prepared copy's last gate line is `PASS (305 …)`. Both were left at Nov 18 09:45 and are excluded from `CHECKSUMS` by `SELF_REF`, so no gate sees them. A reader who opens the file the README calls "the whole receipt set in one staged run" finds a stopped run at a count that matches neither tree.

**Change:** fix A4 first, then **run `bash scripts/acceptance-run.sh` at the final state in each tree** — that regenerates the file honestly and is exactly the artifact the README promises. It must end green through step 17. Do not hand-edit the file and do not ship a red one.

---

## 5 · Part C — the laws (mandatory, ships with Part A)

Every law below must be able to fail. For each new law, add a mutation to the falsifier file that owns that battery, and show it dying in the same run — this is D-2 and the cakepanz-8 A2 lesson: **a law that cannot fail is not a law.**

### C1 — L7: the detail is one click away (late battery)

At picks 11+ in the simple form:

1. assert every `.cp-simplerow` carries **0** `.cp-chip` and **0** `.cp-fits`;
2. click the first row's `.cp-main`; assert **exactly one** `.cp-fits` is visible, its chip count equals that row's `alsoFits.length + 1`, `aria-expanded="true"`, and `aria-controls` names an element that exists in the DOM;
3. click again; assert 0 `.cp-fits` visible;
4. at 390px, with a row open, assert `scrollWidth === clientWidth` (the existing board-at-390 law must keep holding with a detail region open).

**Mutation that must kill it:** delete the `{#if open}` block (the cakepanz-8 state) → L7 red. This mutation is the receipt that the law would have caught the shipped defect.

### C2 — L8: the last pick lands on Complete (shell battery, next free S-label)

Drive the draft through the UI to the user's **32nd** pick:

1. assert `data-screen="complete"` and the record lines render;
2. assert the text `it is not your pick` / `not your pick` never appears;
3. assert zero page errors over the run;
4. assert the board is not the visible screen and no board row is clickable.

This leg is slow (32 real picks). Give it its own timeout and keep it out of the per-law timing budget so the battery does not flake. It is the only law that proves the transition, and the transition is what every user takes.

**Mutation that must kill it:** remove the `go('complete')` line → L8 red.

### C3 — L9: the mode choice survives a reload (late battery)

1. reach the simple form; click FULL BOARD; assert `data-form="full"`;
2. reload; assert `data-form="full"`;
3. start a NEW draft; assert the stored settings blob carries `fullBoard:false` (and, if cheap, that the new draft's 11th pick shows the simple form again);
4. backward compatibility: a stored blob **without** `fullBoard` loads as `false`; a corrupt blob falls back to defaults (the existing settings laws cover the corrupt case — assert the missing-field case).

**Mutation that must kill it:** make `onfullboard` write a module `$state` again → L9 red.

### Numbering and counts

Keep labels per file: `falsify-late` already owns `F13`, so its new cases are `F14` (kills L7) and `F15` (kills L9); `shell-falsifier` continues its own sequence for L8. The late battery becomes **6 → 8** laws; the shell battery **47 → 48**. **Do not pre-write these counts in README, VERIFY or SNAPSHOT** — run the tools and paste what they print. If a count differs from what this prompt predicts, the tool's print is the truth and the difference must be explained in the response.

---

## 6 · Part D — the shell's second half (the design half)

### 6.0 Shipping rule

Part D is **ordered for this sitting** unless the Owner's relay says otherwise. If the sitting runs long, split: ship cakepanz-9 = A + B + C, and open cakepanz-10 for D — but **never ship a Part D item without its law in the same zip**, and never let Part D delay Part A. A green A is worth more than a pretty card.

Both D1 and D2 are **render-layer only**: no engine number is invented, no port change, and every value shown is one the engine already computed.

### D1 — the three-choice card (the Owner's Q6 read literally)

**What.** For the user's picks 11+, make the **default** late-draft view a card of **three options**, each one button:

- **Best available** — the top row by the board's own ranking (`vm.rows[0]`, i.e. the engine's Wins).
- **Best at a need** — the first row whose `slotId` is in `openSlots`, or whose `alsoFits` contains one (the needs-filter predicate already in `DraftBoard.svelte`).
- **Best value at risk** — among rows with `gone ≥ 50%`, the highest wins; if none qualify, show **two** options (do not invent a third).

Each option prints: name, pos, the wins number, the gone% with the existing method tooltip, **the slot it would fill** (`slotLabel`, plus `(flex)` when `!natural`), and a DRAFT button that calls the existing `onpick(id, slotId)`.

Under the card: **Show all players** (reveals the 60-row simple list, which keeps the A1 detail) and **FULL BOARD** (the existing door, now persisted by A3). Keep the honest line, adjusted to what exists: "the board simplified — three choices, and every player is one click away."

**Why.** "Simple decisions" is a choice among three, not a scan of sixty. A single sortable table with one number per row is still a table.

**Implementation constraints:**

- derive the three candidates **from the passed `BoardVM`** — no new engine call, no `goneOdds` re-run, no reordering of the engine's numbers;
- **"best available" is `vm.rows[0]` at the default sort**: entering the card view sets the board's sort to `'wins'` (the VM's own default, `draftBoard.ts:33`), so the first row is the engine's Wins ranking by construction. Do not parse the formatted `wins` string and do not sort a copy yourself. The SORT toggle stays available in the list view;
- if the user's needs filter is empty, **"best at a need" uses `openSlots`**; if `openSlots` is empty, the option is not shown (two options, not an invented one);
- no new file in `src/lib/port/` (the Architect has not ruled on the `port/simpleRows` proposal; keep the helper shell-side, e.g. `src/lib/lateCard.ts`);
- `data-card="late"` on the card for the law;
- the card must be clean at 390px: one column, each option a full-width button, the slot token wrapping rather than truncating;
- the list view must still satisfy L7.

**Law:** the card's three candidates are **rows of the same VM** (ids and wins equal to the VM's), picking from the card yields the same store state as picking that row on the list (compare `status`, the user's pick count, and the next board's row ids), the card appears at picks 11+ and never at 10 or below, and **Show all players** reveals the list in one click and the card returns in one click.

### D2 — Complete prints the roster the engine would field

**What.** On Complete (and only there — not the Share card, not the Book), show the lineup the engine itself would start, with `effOvr` per slot, **the three weakest slots**, and one line naming the mode: "the simple board was on for picks 11–32" (when it was; you have the record and the settings).

**Why.** Q6's goal is an outcome — "a decent roster". Today nothing in the shell says whether the roster is decent. The engine already computes the best lineup; printing it turns the promise into a visible result and gives the Owner the evidence to judge simple mode (and, later, to set the "decent" bar).

**How (reuse, do not reinvent):**

```ts
import { rostersOfRecord } from '../port/feedVM.ts';   // exported; thaws the pool, builds the 32 rosters
import { lineupFor } from '../port/seam.ts';           // already imported by App
const roster = rostersOfRecord(record)[record.userTeam];
const best = lineupFor(roster, '4-3');                 // placements carry effOvr
```

Nothing changes in `Complete.svelte`'s props — it already receives `record`.

**Constraints:** one line + the three weakest slots (details stay behind the existing CARDS/BOOK doors); if the record has fewer than 11 players for the user's team, print **incomplete** and name how many are missing — never invent a lineup; no new number that the engine did not compute.

**Law:** the printed lineup equals `lineupFor(rostersOfRecord(record)[userTeam], '4-3')` by projection (slot → player id → effOvr, compared exhaustively); the three weakest are the three smallest `effOvr` in that lineup; an incomplete record prints `incomplete` and a count.

### D3 — the recommendation names the slot (small, recommended)

In the simple **list** row, print the slot the DRAFT button will fill next to the position (`CB · CB2`), and mark it when it is one of the user's open slots (`· open`). `BoardRowVM` already carries `slotId`, `slotLabel`, `natural`; `openSlots` is already a prop of `DraftBoard`. ~15 lines, render only.

**Law:** the printed slot equals the slot the DRAFT button dispatches; the `open` mark agrees with `openSlots`; 390px stays clean.

---

## 7 · The verification protocol (what must exist before you zip)

### 7.1 The one uninterrupted run

`bash scripts/acceptance-run.sh` must end **green through step 17** in **each** tree. That is the definition of done for this sitting. The script writes `ACCEPTANCE-RECEIPTS.txt`; keep it, it is now a true artifact. Step 6 intentionally kills any listener on 4179 — that is the script's own zombie guard, not a failure.

### 7.2 Receipts to add under `receipts/partI-c9/` (shipped) and mirrored names for prepared

| File | What it is |
|---|---|
| `c9-gate-numerals.log` | step 16 + 17 output, both trees |
| `c9-l7-detail.log` | the detail open/close assertions, incl. the 390px line |
| `c9-l8-last-pick.log` | the 32-pick run, assert lines + zero page errors |
| `c9-l9-persist.log` | simple → full → reload → new draft → `fullBoard:false` |
| `c9-mutations.log` | L7/L8/L9 dying under their plants, one line each |
| `c9-dist.log` | `distfile` sha + size at the final state |
| `c9-d1-card.log` (if D1) | the card's three candidates vs the VM, the pick-equivalence |
| `c9-d2-lineup.log` (if D2) | the printed lineup vs `lineupFor`, the three weakest |

### 7.3 Numbers that will move, and the rule for them

The **dist sha will change** (you are changing render output) — recompute and quote the new one; never carry `1529a003…e737` forward. The **manifest counts will move** if any new file is added; run `regen-manifest` then `gate-manifest` **twice consecutively** per tree and quote the counts the tool prints. The **battery counts move only by the laws you add** (C1–C3); if anything else moves, explain it.

**The rule:** every count and every hash in `README-DELIVERY`, `WHAT-CHANGED.md`, `VERIFY.txt`, `SNAPSHOT.md` and the `CHECKSUMS*.txt` files is the **tool's print at the final state of this sitting**. Two of the cakepanz-8 findings were stale numbers inside the delivery that corrected stale numbers. Do not repeat that class.

### 7.4 Fresh-clone log

Regenerate the D-1 fresh-clone receipt at the final state, once, uninterrupted, ending green (it is the receipt that proves the delivered bytes build from nothing). Keep the old one beside it, dated.

---

## 8 · Self-check before you zip

Run this list and paste the outputs. If any line is not what it says, the sitting is not finished.

```bash
# in each tree, at the final code state
node scripts/gate-numerals.mjs; echo "exit=$?"          # twice, both clean
node scripts/gate-manifest.mjs; echo "exit=$?"           # PASS, dist covered
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs | tail -3
node --import ./scripts/node-port-register.mjs batteries/late.battery.mjs  | tail -3
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs  | tail -3
node --import ./scripts/node-port-register.mjs batteries/slice1.battery.mjs | tail -3
node --test --experimental-strip-types test/engine.test.ts | tail -4
npm run distfile && sha256sum dist/single.html            # quote the NEW size + sha
git status --porcelain                                    # EMPTY: no run artifact may dirty the tree
```

**On `git status`:** cakepanz-8's `batteries/slice1-battery.json` is a per-run artifact — running the slice battery rewrote it (75 → 82 flex chips), so a reviewer cannot leave the tree clean. Make the run artifact land in the excluded receipt layer (or gitignore it) so a clean run leaves `git status --porcelain` empty. That is the `F8` item and it is worth one line of work.

**On `pin-watch`:** the delivered tree names both pins in its own docs, so the canonical tool emits a wall of pin-line WARNs on the shipped tree. The RESULT line is correct and exit 0 — do not "fix" the tree by deleting the prepared sibling's references. If a `--allow-pin` flag exists by now, use it; otherwise say so in the response.

---

## 9 · The delivery package

Same shape as cakepanz-8 (it worked; keep it):

```
67-cakepanz-9-<date>/
  README-DELIVERY.md          # verdict, the numbers the tools printed, one line per item
  README-DELIVERY-c8.md       # keep the previous one beside it
  WHAT-CHANGED.md             # one entry per ordered item, anchor → before → after → laws → receipts
  RECEIPTS.md                 # the map: item → log file → exit code
  START-OF-CHAT-ZAI.md        # this sitting's §2 rewritten; byte-identical in all three places
  receipts/partI-c9/          # the raw logs named in §7.2
  cakepanz-4/                 # shipped tree, pin 5c808472 (67 files)
  cakepanz-4-prepared/        # prepared tree, pin 65673a00 (68 files) — NOT ACTIVATED
```

One zip, one response, no pushes. The two trees keep their pins: **do not activate 65673a00**, and do not let the prepared tree drift from the shipped one in any file other than the engine snapshot.

---

## 10 · Rules

1. **No engine changes.** `src/engine/**` and `src/engine-node/**` are the pin's bytes. If a fix seems to need an engine change, stop and file it instead.
2. **No flex changes.** 99 rules, `{0:17, 2:17, 6:42, 12:23}`. The Owner's table.
3. **No port changes** except the additive `Settings.fullBoard` field in A3.
4. **No new runtime dependency, no network, no CDN, no telemetry.** The single-file dist must stay one self-contained blob.
5. **No invented numbers.** Every displayed value is one the engine produced; every quoted count is a tool's print; every quoted hash is re-measured at the final state.
6. **Every new law must be falsifiable**, with its mutation dying in the same run. A law that cannot fail is not a law.
7. **Apply-asserted patches.** An anchor that moved throws; do not hand-edit a file and hope.
8. **Do not re-cut a zip to fix a sentence.** If you find a doc error after cutting, fix it in the next sitting and say so — the cakepanz-8 A7 precedent is the honest shape.
9. **Do not move the flip threshold.** The user's 10th pick stands unless the Owner says otherwise.
10. **Do not change what the honest line promises** without changing what exists to match it.

---

## 11 · What the council will check when the zip returns

So you know the bar, not to pre-empt it:

1. the pins, by content (count + spot hashes + `diff -rq`), on both trees;
2. `gate-numerals` ×2 and `gate-manifest` ×2, run by the reviewer, not read from your log;
3. the L7/L8/L9 plants, re-run: each law must go red when the fix is removed;
4. the A1/A2 legs again (a regression here would be the worst outcome of the sitting);
5. the last-pick transition through the real UI, because it is the one defect a receipt cannot fully prove;
6. `git status --porcelain` after a full battery run;
7. every quoted number in the delivery against the tool that prints it.

A review that finds a stale count or a hash that moved is not hostile — it is the receipt law working. The cakepanz-8 review found six such things and still called the delivery **improved**; the next one should find none.

---

## 12 · Questions you must not answer yourself

Name them in the response and proceed on everything they do not block.

- **D1's third option** ("best value at risk") is a presentation heuristic over the engine's gone%. If the Owner would rather the card show two options only, that is his call — build the three, flag the threshold (gone ≥ 50%) as the reversible default.
- **The "decent roster" bar** is not yours to set. D2 prints the evidence; the Owner sets the bar later.
- **The `go()` redirect's side effect** (any `go('board')` on a done record lands on Complete) forecloses a future "draft recap board". It is right for this build; the Architect rules on the general rule.
- **`port/simpleRows`** (moving the late-mode projection into the port) is the Architect's to rule on. Do not do it in this sitting.

---

## 13 · One-line summary for the response

End the response with one line per item in this shape, so the council can read the state without opening the zip:

```
A1 | fixed | receipts/partI-c9/c9-l7-detail.log | exit 0
A2 | fixed | receipts/partI-c9/c9-l8-last-pick.log | exit 0
...
```

Verdicts are `fixed`, `fixed-with-note`, `deferred` (with the reason), or `blocked` (with what blocks it). No other vocabulary.
