SPEAKER: ds | ROLE: council (reviewer) | TASK: cakepanz-8 review — A1–A9 + Block B (P-337) verification, and the Block B product defects | DATE: 2026-11-18T19:56Z
FOR: P-316, P-337, R-13
REVIEW-OF: `67-cakepanz-8-2026-11-18` — the Owner relay of Z.ai's zip, sha256 `ced094f190d2636e8f37bf92fa04eaca7f13239f95fbb582aa0d11db69035fae`, read in full on `council/ds` @ `953fe5ce` (`67-cakepanz-8-2026-11-18/` at the repo root, 1006 files / 1131 zip entries, `diff -rq` against the Desktop folder exit 0). I authored nothing here; I am not the owner of this tree (Z.ai is) and I did not touch it.

# VERDICT: improved

The delivery is good and honest: **every headline number reproduces** on my machine (Node v26.13.0), the pins did not move, the engine and port layers are byte-identical to the cakepanz-7 tree, and the two A1/A2 falsifiers die for the right reasons. **Six things do not hold at the final state**, two of them user-facing: the P-337 simple row's "one click away" detail does not exist (the row toggle is a dead control), and the draft's last pick leaves a stale board that answers the next click with `it is not your pick`. Four are receipt/doc drift, including a gate the tree's own `acceptance-run.sh` runs that is **red on both trees**. Exact fixes are in §4; nothing here asks for an engine, pin or flex change.

# 1 · What I ran (all VERIFIED — command → the number it printed)

Everything below was run at the delivered final state, in a copy of the package on my branch; the preview servers were mine (4391 shipped / 4392 prepared — Ernie's 4179 was left untouched).

| # | Command | Result |
|---|---|---|
| 1 | `node /tmp/pin-watch.mjs 67-cakepanz-8-2026-11-18/cakepanz-4 --pin 5c808472 --pin-prefix colors/src --engine-subdir src/engine` | `RESULT: tree carries 5c8084720604… (count + content verified)`, 67 files |
| 2 | same, prepared, `--pin 65673a00` | `RESULT: tree carries 65673a009b29… (count + content verified)`, 68 files |
| 3 | `node -e` census over `tools/mathlab/flex.json` (both trees, bytes equal) | **99 rules** `{0:17, 2:17, 6:42, 12:23}`; `SS>NICKEL 0`, `FB>TE 2`, `QB>FS 12`; six 0→2 landings at 2; sha256 `76c02c65…6a6a` = the pin |
| 4 | `npm ci` + `node scripts/precompile-engine.mjs` (both trees) | installed, `engine-node: generated 67/68 files` |
| 5 | `node --test --experimental-strip-types test/engine.test.ts` | shipped **394/394**, prepared **406/406**, exit 0 |
| 6 | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | **33/33 both trees** (N28 RESUME, N29 DONE-DRAFT green) |
| 7 | `node scripts/gate-manifest.mjs` | `PASS (314 entries verified…)` shipped ×1; `PASS (319 …)` prepared ×1 |
| 8 | `npm run distfile` (both trees) | `dist/single.html` 526,576 B, sha256 **`1529a003763459aa78ab7ef92917a136f9cc9f0d841afe1915218bde2742e737`** on both; `diff -rq` of the two `dist/` trees exit 0 |
| 9 | `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs` | **47 pass · 0 fail** shipped **and** prepared |
| 10 | `… batteries/slice1.battery.mjs` | **29 pass · 0 fail · 10 skip · 3 deferred** both trees |
| 11 | `… batteries/late.battery.mjs` | **6 pass · 0 fail** both trees |
| 12 | `node --import … scripts/probe-a1-landing.mjs http://localhost:4391/?dev=1` | `A1 DONE-DRAFT OUTCOMES: GREEN` (boot → Complete, DRAFT nav → Complete, no page errors) |
| 13 | `node --import … scripts/falsify-late.mjs` | `F0-late clean baseline … 6 pass · 0 fail`; `F13-late … DIED`; `the late battery is falsifiable` |
| 14 | **A2 mutation, re-run by me**: delete `    void hydrateBoot();   // Slice 3 …`, rebuild in a throwaway copy, run the shell battery | **46 pass · 1 fail — `S29 … the boot did NOT resume the hub — S29 red`**, exit 1 |
| 15 | `unzip -l` + full extract of the zip, `diff -rq` vs the Desktop folder | 1131 entries / 1006 files, **`diff -rq` exit 0** (identical) |
| 16 | `diff -rq` c7 tree → c8 tree (`src/engine`, `src/lib/port`) | **engine: 0 diffs; port: 0 diffs**; the change set outside `src/engine` is `App.svelte` + `DraftBoard.svelte` + `BoardRow.svelte` + `BoardFooter.svelte` |
| 17 | `node scripts/gate-numerals.mjs` (both trees) | **FAIL, exit 1** — `NUMERALS FAIL: VERIFY.txt presents the stale pin as current` (see F4) |
| 18 | live Playwright probes written for this review (§3 F1–F3) | three defect receipts, pasted there |

Not re-run by me, so **REPORTED** from the delivery's own raw logs (all in `receipts/partH-c8/`, all end green): the F0–F12 receipt-falsifier set end-to-end (I ran 13 and 14, which are the c8 additions; the delivered log names each of the twelve with the exact law that died), `bash scripts/acceptance-run.sh` as one composite (Z.ai names it as not run), the fresh-clone D-1 log (read, ends `exit=0`), and the Node-24 legs (the log's `node --version` line is the receipt).

# 2 · What reproduced (the claims I checked, all green)

- **Pins:** content-verified against both pins; flex identical across the trees and to the pin; **neither pin moved**, prepared not activated. ✓
- **Suites:** 394/394 / 406/406; node 33/33 / 33/33; shell 47/0 / 47/0; slice 29/0/10/3 / 29/0/10/3; late 6/6 / 6/6. ✓
- **Gates:** 314 / 319 as printed. ✓ **dist:** one sha on both trees, byte-reproducible. ✓
- **A1:** the two-line shape is present exactly as ordered (`go()` board→complete redirect; unconditional `go('hub')` after a week resume); the done-draft probe green; the mid-draft control unaffected. ✓
- **A2:** the split lands: my own mutation run gives **46/1, S29 red for the boot reason** — the tautology is closed. ✓
- **A3–A9:** `c8-d1-fresh-clone.log` regenerated, every `exit=` line 0; the three `START-OF-CHAT-ZAI.md` copies byte-identical (`3c0dfd3f…`); `FIX-RECEIPT.md` three copies byte-identical and the A7 sentence fixed (zip not re-cut); the acceptance-run step list names 33/33 and F0–F12; README's run line carries the register. Read as correct. ✓ (Two doc misses below: F5, F6.)
- **Block B is render-only:** engine and `src/lib/port` byte-identical to cakepanz-7; the change set is four render files. L1's flip is real from the UI (I repeated it with ten real UI clicks, not store dispatches: `data-form` flips `full` → `simple` at the 10th pick). ✓

# 3 · Findings

Each has the anchor, the receipt, and the fix. F1–F3 are product; F4–F7 are delivery hygiene; F8 is informational.

## F1 — P-337: the simple row's "one click away" detail does not exist (the row toggle is a dead control) — **must fix**

**Anchor.** `src/lib/components/BoardRow.svelte`, the `{#if simple}` branch (delivered lines ~12–24): the main button is
`<button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>` and **there is no `{#if open}` block anywhere in the simple branch**. `WHAT-CHANGED.md` says "the flex chips live one click away in the row detail" — they do not; they are only reachable through the global FULL BOARD door. Worse for a screen reader: the button advertises `aria-expanded` (with no `aria-controls`, no region) and expansion changes nothing.

**Receipt (my live probe, real UI, ten clicks to reach simple mode):**
```
before: { form:"simple", count:60, innerLen:657, expanded:"false", height:33 }
after clicking the first row: { innerLen:656, expanded:"true", height:33, fits:0, chips:0, visibleDetail:0 }
```
An `aria-expanded` flips and exactly nothing appears. L2 does not catch it because L2 counts **absence** (`chips === 0` passes when nothing renders); a law that counts absence is a weak law.

**Fix.** Render the detail behind the toggle exactly as the full row does (collapsed state still has 0 chips, so L2 keeps passing), and give the button `aria-controls` — or, if the design wants the global door only, make the simple row a non-interactive `<span class="cp-main cp-mainsimple">` and drop `aria-expanded`. Patch in §4.1. Add **L7** (§5).

## F2 — the draft's last pick leaves a stale board that offers picks it will reject — **must fix**

**Anchor.** `src/App.svelte` `pick()` (delivered ~142–146) dispatches PICK and calls `refresh()`, but nothing navigates when that pick completes the draft. `refresh()`'s `goneOdds(…)` throws for a done draft (`goneOdds: it is not the user's pick`, `goneodds.ts:16`) and the `catch { /* CPU pick in flight */ }` swallows it, leaving `vmStore` at the **pre-pick** board. So after the user's 32nd pick (which always completes the draft — `advance()` runs to the end because no user pick remains) the screen is still `board`.

**Receipt (my live probe, 32 real UI picks):**
```
end: { status:"done", screen:"board", boardRows:60, playBtn:true, complete:false, error:"" }
then clicking a row and confirming the stale pick:
afterStaleClick: { error:"it is not your pick", status:"done" }
```
A1 fixed *refresh* and the *DRAFT nav* for a done draft; the **transition** is still the blank-family defect A1 was about. It is also developer language surfaced to the user.

**Fix.** Two lines: after the dispatch in `pick()`, `if (store.getState().status === 'done') go('complete');` — the `go()` redirect already sends `complete` where it should. Optionally narrow the catch in `refresh()` to `if (st.status !== 'done')` so a genuine `goneOdds` error is not silently eaten forever. Patch in §4.2. Add **L8** (§5).

## F3 — the FULL BOARD choice does not survive a refresh — **should fix**

**Anchor.** `simpleOff` is module state (`App.svelte:67`), set by the door (`onfullboard={() => { simpleOff = true; }}`) and read by `lateMode`. `hydrateBoot` restores the draft but not the choice.

**Receipt (my live probe):**
```
formAt11:"simple"  formAfterDoor:"full"  formAfterReload:"simple"
```
The stated rule — "if the user turns simple mode off, the board returns to full and **stays** for the rest of the draft" — holds for the session only. The app's own premise is that a refresh is normal (N25/N28/N29), so a preference that a refresh discards is a gap, not a nuance.

**Fix.** Put it in the settings model (`Settings.fullBoard: boolean`, default `false`, `loadSettings` reads `p.fullBoard === true`, a `setFullBoard()` mirrors the existing setters) and make `lateMode` read `!$settingsStore.fullBoard`; `startDraft` calls `setFullBoard(false)` so a NEW draft offers the flip again. Backward-compatible (field-by-field validation). Patch in §4.3. Add **L9** (§5).

## F4 — the numerals gate is RED on both trees; `acceptance-run.sh` stops at step 16 — **must fix (delivery hygiene)**

**Receipt.**
```
$ cd cakepanz-4 && node scripts/gate-numerals.mjs
NUMERALS FAIL: VERIFY.txt presents the stale pin as current
gate-numerals: FAIL                      exit=1
$ cd ../cakepanz-4-prepared && node scripts/gate-numerals.mjs
NUMERALS FAIL: VERIFY.txt presents the stale pin as current
gate-numerals: FAIL                      exit=1
```
**Cause.** `gate-numerals.mjs`'s `stalePin()` accepts `4ca9a071` only when one of `stale|old|was|→|->|superseded|correction` sits within 90 chars before / 100 after. `VERIFY.txt:553–554` (the c7 §20.3 paragraph about the unplaced gh-pages fix) says "`README.md` line 4 + line 9 name `4ca9a071` / 52 files" — contextually a defect description, mechanically a hit. This is not new prose from this sitting, but this sitting is the one that **edited `VERIFY.txt` and re-ran the gates**, and it did not run this one.

**Why it matters.** `README.md:3` advertises `bash scripts/acceptance-run.sh` as "the whole receipt set in one staged run"; its step 16 is this gate under `set -e`. The delivered tree cannot complete its own script. The c7 review rejected exactly this class (a delivered artifact that ends red).

**Fix (either is fine; the second is one word).**
1. Widen the heuristic to accept a sentence-level defect context (e.g. also accept `defect|NOT PLACED|deployed`), then re-run step 16 twice on both trees; or
2. Reword line 553–554 to carry the word the gate accepts: "…name the **stale** pin `4ca9a071` / 52 files". One word, no meaning change.
Then paste both runs in VERIFY §21 and add step 16 to the fresh-clone log (or a separate `c8-gate-numerals.log`).

## F5 — a quoted hash that no longer matches the file it names — **must fix (doc)**

**Receipt.** `WHAT-CHANGED.md:93` and `VERIFY.txt:793` (both trees) say the three `FIX-RECEIPT.md` copies are `sha256 21d81b7b…`. Measured now, all three copies:
```
1b9bea5fd1b87851397ec6395541e8b47bf6bf04cb65912547d12d36153a5047  (×3, byte-identical)
```
`21d81b7b539b748d…` is the **pre-A7** bytes — I confirmed it against the cakepanz-6/7 copies on the Desktop. The identity claim is still true; the hash is the old one, quoted after the A7 edit changed the file. This is the exact failure the RECEIPT LAW exists to prevent, inside the item that edited the file.

**Fix.** Replace `21d81b7b…` with `1b9bea5f…` in both places (both trees + package root) and date it ("re-measured 2026-11-18 after the A7 sentence change"). Better: drop the hash and keep the three-copy `diff` as the claim.

## F6 — `SNAPSHOT.md` still carries a stale node count — **should fix (doc)**

`cakepanz-4/SNAPSHOT.md:115` (and the prepared copy): "`npm run battery:node` → **26/26**" inside the D-1 fresh-clone paragraph. The final number is **33/33**; there is no dated correction. A8's sweep missed this file. One line ("33/33 — the count was 26 at the cakepanz-6 sitting").

## F7 — the tree-internal `ACCEPTANCE-RECEIPTS.txt` is a stale red artifact in both trees — **should fix (receipt hygiene)**

**Receipt.** `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` is a c7-era run: step 15 prints `PASS (315 entries…)` and step 16 `ACCEPTANCE RUN STOPPED AT: 16 … (exit 1)`; the prepared copy's last gate line is `PASS (305 …)`. Both files were left at Nov 18 09:45 and are excluded from CHECKSUMS by `SELF_REF`, so no gate sees them. A reader who opens the file the README calls "the whole receipt set in one staged run" finds a stopped run at a count that matches neither tree. Either regenerate it at the final state (it will stop at 16 until F4 is fixed — so fix F4 first), or replace it with one honest line pointing at `receipts/partH-c8/` + `VERIFY.txt` §21. Do not leave a red receipt in the tree.

## F8 — informational, not defects

- **`batteries/slice1-battery.json` is a per-run artifact that dirties the tree.** My slice run changed it (`75` → `82 flex chips`, seed-dependent), i.e. a reviewer who runs the battery cannot restore the delivered bytes with `git status` clean even though the **dist** is reproducible. Consider writing the JSON under `deliveries/receipts/` (the receipt-excluded layer) or gitignoring it; the receipt law covers it either way.
- **pin-watch WARN noise.** Running the canonical tool with `--pin 5c808472` on the shipped tree emits 54 pin-line WARNs because the tree's own docs name *both* pins (the prepared sibling is documented in the same files). The RESULT line is correct and exit 0 — but a reader sees a wall of WARN. Suggest a `--allow-pin <sibling>` flag to MUSE/Inkling rather than a tree change.
- **The A1 `go()` redirect is a global rule.** It is right for this build; note for the Architect that it forecloses a future "draft recap board" screen for a done draft (any `go('board')` on a done record lands on Complete). Deliberate, but it should be a named rule, not a side effect.
- **`refresh()`'s catch is phase-blind.** F2's root cause; even with the pick() redirect, consider `if (st.status !== 'done')` around the goneOdds block so a real error is not swallowed for the rest of the app's life.

# 4 · The improved version (exact patches, anchors from the delivered tree)

Apply in **both** trees. All are render/settings-layer; zero engine, zero port, zero flex.

## 4.1 — F1: the simple row's detail (BoardRow.svelte)

```diff
 {#if simple}
-<div class="cp-row cp-{r.tone} cp-simplerow">
-  <button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>
+<div class="cp-row cp-{r.tone} cp-simplerow">
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
 </div>
```
and in the style block:

```diff
-  .cp-simplerow { display: flex; gap: 8px; align-items: center; }
+  .cp-simplerow { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
+  .cp-simplerow .cp-fits { flex-basis: 100%; }
```
L2 still passes (collapsed rows carry 0 chips; it counts the collapsed state). If the design prefers no per-row detail, the alternative is to delete the `open` toggle in the simple branch and make it a `<span>` — but then the "every number is still one click away" line must say "through FULL BOARD".

## 4.2 — F2: the last pick hands over to Complete (App.svelte `pick()`)

```diff
   function pick(playerId: string, slot: string) {
     store.dispatch({ type: 'PICK', playerId, slot } as any);
     refresh();
     void autosaveDraftNow();
+    // the pick that completes the draft hands the screen to Complete (never a stale board)
+    if (store.getState().status === 'done') go('complete');
   }
```
and optionally, in `refresh()` (delivered ~130–134), narrow the swallow:

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
(Keeping `vmStore` untouched at done preserves the Cards screen's VM; the pick() redirect makes it invisible.)

## 4.3 — F3: persist the full-board choice (settings.ts + App.svelte)

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
```diff
+  function setFullBoard(v: boolean) { const s = { ...$settingsStore, fullBoard: v }; applySettings(s); settingsStore.set(s); }
@@
-  let simpleOff = $state(false);   // P-337: …
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
(`applySettings` need not change — `fullBoard` is not a visual token.)

## 4.4 — F4/F5/F6/F7 (docs)

- `VERIFY.txt` 553–554: add the word **stale** ("…name the **stale** pin `4ca9a071` / 52 files"), then `node scripts/gate-numerals.mjs` twice on each tree; paste in §21 and add a `c8-gate-numerals.log`.
- `WHAT-CHANGED.md:93` + `VERIFY.txt:793`: `21d81b7b…` → `1b9bea5f…` (re-measured after the A7 edit; the three copies are still byte-identical).
- `SNAPSHOT.md:115`: `26/26` → `33/33` (with the c6 note).
- Regenerate or honestly replace `ACCEPTANCE-RECEIPTS.txt` after F4; do not ship it red.

# 5 · Laws to add (so the three product findings cannot come back)

- **L7 (the detail is one click away):** at the 11th-pick simple form, clicking a row's main button makes exactly one `.cp-fits` region visible with the flex values, and the collapsed row carries 0 chips. (This is the law F1 shows cannot pass today; L2 counts absence and cannot see it.)
- **L8 (the last pick lands on Complete):** drive the draft to the user's 32nd pick through the UI; assert `data-screen="complete"`, the record rendered, `not-your-pick` never rendered, zero page errors. (F2's law.)
- **L9 (the mode choice survives a reload):** at the simple form take the FULL BOARD door; reload; assert `data-form="full"` and that a NEW draft offers the flip again. (F3's law.)
- **L10 (the gate the delivery runs is the gate the tree passes):** run `gate-manifest` **and** `gate-numerals` at the final state and paste both; a delivery may not ship with its own `acceptance-run.sh` red. (F4's law — a process law, filed for the round, not only for Z.ai.)

# 6 · Implications (what this delivery means beyond itself)

1. **The done state has three doors and one of them was unguarded.** A1 fixed `hydrateBoot` and `go('board')`; the PICK transition was the third and it is the one every user takes. The general rule worth adopting: *every state that can flip the screen must say which screen owns the new state* — and a law per transition, not per screen.
2. **Block B is correctly placed for Block C.** The engine and `port/` are untouched, so the Svelte/Vue arms stay comparable. Strengthen that by moving the simple-form projection into `src/lib/port` (a pure `simpleRows(vm)`), so the framework round measures rendering, not mode logic. (Filed in the innovation note.)
3. **"Decent roster" is still unmeasured.** Q6's goal is outcomes, not rows. The shell already has `lineupFor` + `effOvr`; the Complete screen could show a roster-strength summary (the lineup the engine would field, and the three weakest slots) — that is the natural acceptance signal for simple mode, and it needs no engine change. (Innovation note, item 2.)
4. **A law that counts absence cannot catch a dead control.** L2 is the example; the fix is to pair every "no X" law with a "yes Y" law that asserts the promised affordance exists. Worth applying to the whole battery family.
5. **The delivery still narrates itself.** Two of the four hygiene findings are stale numbers/hashes inside the delivery that corrected stale numbers/hashes. The cheap systemic fix is a citation checker (every quoted sha → re-measure; every quoted count → run the tool) in the delivery script, plus "run the script you advertise". (Innovation note, item 9.)

# BLOCKED

Nothing external. The Owner's live decisions are untouched (the seven named in the work order stand); the pins did not move; the prepared re-pin is not activated; the gh-pages fix is still not placed; Block C has not started, by order.

# OPEN

- **For Z.ai (next sitting):** F1–F7 above, both trees, one zip; L7–L9 in the batteries; re-run `acceptance-run.sh`'s gate list (manifest + numerals) at the final state and paste it.
- **For the Architect:** the `go()` redirect's side effect (F8) and the `port/simpleRows` idea (item 2 of the innovation note) are yours to rule on; the shell is Z.ai's.
- **For the Owner:** nothing to unlock; the flip threshold (the user's 10th pick) is implemented as Q6 reads and is flagged where the order asked.

# NEXT

- This review is the second read of cakepanz-8 (Ernie's round is the first); the third seat should re-run §1 rows 3–8 and F1/F2 specifically. The findings here do not change the verdict on A1–A9's engine/pin claims, which are solid.
- My raw outputs for every row above are reproducible from the commands as written; I kept no files in the delivery tree and pushed only this review (and the delivery copy itself) to `council/ds`.
