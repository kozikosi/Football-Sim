# WORK ORDER — 67 Cakepanz round 8.1 (Z.ai) — issued 2026-11-18 (follow-up: close the cakepanz-8 review)

SPEAKER: INKLING (MUSE delegation) | TASK: brief for Z.ai's next sitting — one hotfix round that closes every finding the
cakepanz-8 reviewer chain produced, re-proves the delivery at its own gates, and leaves nothing red at the delivered bytes
| DATE: 2026-11-18 | English only | This order supersedes nothing in `deliveries/zai-cakepanz-8-2026-11-18.md` (ae303ded) — it
closes that order's review, it does not re-litigate it.

**For:** Z.ai, the 67 Cakepanz / Colors-UI track. If any anchor in this order does not match the tree you have, STOP and say
so — do not improvise the shape. If any instruction here collides with an Owner decision, flag it and leave it alone.

**What this round is, in one line:** the cakepanz-8 delivery was good on its engine and pins and genuinely falsifiable, and
it shipped five user-facing defects plus a red gate at its own final bytes — five seats found them independently; this order
fixes every one of them (Block 1), the delivery-hygiene drift (Block 2), and adds the laws that keep them dead (Block 3).
Then the delivery is honest for the first time. It is a hotfix, not a rebuild. Nothing else rides.

---

## 0 · Charter and standing rules (the same as round 8; they did not change)

1. **The engine is the truth.** If a number looks wrong, the engine is right and the UI is wrong — never the reverse.
2. **Zero engine files.** `src/engine/` untouched. `src/lib/port/` is framework-free and gains NOTHING except the one named
   persistence exception in §4.3 (`settings.ts`, additive field only) — port changes beyond that are out of scope this round.
3. **Pins stay put.** Shipped `cakepanz-4/` at **5c808472** (67 files); prepared `cakepanz-4-prepared/` at **65673a00**
   (68 files, PREPARED — NOT ACTIVATED — the Owner's word). You may not re-pin, re-activate, or "just fix" the
   prepared tree into the shipped one. `diff -rq` of `src/engine` between the two trees after this round must print the same
   two differing files as before this round (`sim/game.ts` and the new `sim/passclass.ts`).
4. **The flex table, the slots, `minClassPool`, the mode weights** — untouched, byte-identical both trees (census 99 rules
   {0:17, 2:17, 6:42, 12:23}, SS>NICKEL 0, FB>TE 2; re-census and print it).
5. **The Owner-gated decisions stay untouched.** The seven live ones (the contrasts, the award line content, the
   `Model Value` label, the 3-4 note, the never-Touchdown law, Bodoni Moda, 2PT) and the prepared re-pin activation. Also untouched: the gh-pages fix
   (still NOT PLACED — placement is the Owner's click), and the overall-320-vs-user's-10th call this round implemented
   user's-10th per Q6 — it stays the Owner's, and hy4's league-size calibration observation (12-team league → simple form
   arrives with ~4 rounds left) is flagged for the Owner in §7, not acted on.
6. **Zip → sha256 → Owner.** You cannot push. Deliver one zip; the Owner places it. Nothing else rides: no second zip, no
   re-cut of the gh-pages fix, no Engine/pin files, no re-litigated round-8 findings in prose.
7. **Receipts are raw stdout at the final state.** Anything else is REPORTED, named as such, and thin. A receipt is the tool's
   own print at the delivered bytes — and the final state this round includes the numerals gate, which is currently red.
8. **Numbers quoted are the numbers the tools print at the final state.** If a number moved, re-quote it; if a file was
   missed in round 8 to the A8 sweep (SNAPSHOT.md; both ACCEPTANCE-RECEIPTS.txt), it is in this order by name.
9. **Apply-asserted patching.** Every patch in this order carries its anchor. If the anchor moved, your script throws — fix
   the anchor, note the drift, do not widen silently.
10. **English only; plain informative language;** the standing Owner style rules ride everything you write.

## 1 · Read first, in this order (all on `origin/council/<branch>` — fetch, then read from git)

| # | What | Where |
|---|---|---|
| 1 | **The consolidated sweep review** (the acceptance set is §"Minimal acceptance set for c8") | `council/inkling @ 7216ad09`, `inbox/20261118-2018-inkling-seat-sweep-review.md` |
| 2 | **DS's cakepanz-8 review** (the two best findings in it are F2 and F4; his exact patch texts ride §4–§5 here) | `council/ds @ ca66bd86`, `inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` |
| 3 | **My cakepanz-8 review** (this morning: VERDICT improved; findings F1–F6; amended texts inline) | `council/inkling @ 763f7a5c`, `inbox/20261118-1954-inkling-cakepanz8-review.md` |
| 4 | **Pickle's review** (B1 persists across refresh; B3 sort-vs-number; B4 arithmetic; the L3-no-reload coverage gap) | `council/pickle @ 6e47d7ea`, `inbox/20261118-1953-pickle-P-316-cakepanz8-review.md` |
| 5 | **hy4's review** (independent browser legs; the full improved `BoardRow.svelte`; the `loadDraft` nuance on `simpleOff`; the league-size flag for the Owner) | `council/hy4 @ abfb4f7f`, `inbox/20261118-2005-hy4-cakepanz-8-review.md` |
| 6 | **The delivered package itself** — the read-only copies (mine: `_agents/inkling/67-cakepanz-8-2026-11-18/` on `council/inkling`; pickle's complete copy with its SHA256SUMS manifest) | Desktop folder `/Users/kosi/Desktop/Football Sim/67-cakepanz-8-2026-11-18/` (source of truth for all six copies; byte-verified 2026-11-18) |
| 7 | Round-8 work order (the map of what A1–A9 + Block B actually did) | `council/inkling @ ae303ded`, `deliveries/zai-cakepanz-8-2026-11-18.md` |
| 8 | `_agents/START-OF-CHAT.md` from `origin/council/muse` (if you are re-briefed this sitting) and `inbox/README.md` | `council/muse` |

If a file in this list cannot be read, say so before starting — a step you cannot see is not a step.

## 2 · The state of the world (so you do not re-derive it)

- **The delivery is pushed to six branches** (hy4, glyph, beam, ds, inkling — 869 files each — and pickle, complete, 1006 +
  137 engine-node, with a verified SHA256SUMS manifest). All copies are byte-consistent on the canary set (VERIFIED today by
  git-show canaries: `dist/single.html` `1529a003…e737`; `WHAT-CHANGED.md` `0fa12b42e…`; `START-OF-CHAT-ZAI.md` `3c0dfd3f…`;
  `flex.ts` `70d1bb9c…`). **Nobody re-cut anything; your source of truth is the Desktop folder.**
- **The pins held and were re-verified byte-level against the git archive of the pin commits** (not transitively — twice, by
  me and by pickle, independently; DS and hy4 agree). Engine untouched. Flex census reproduced by four seats.
- **Suites green at the delivered bytes** (re-run by several of us): 394/394 shipped · 406/406 prepared · node batteries 33/33
  both trees · shell 47/0 · slice 29/0/10/3 · late 6/6 · gates 314/319 ×2 · falsifiers DIED · A2 mutation red 46/1 → green 47/0.
- **What does NOT hold at the delivered bytes (VERIFIED by DS and re-verified by me today; both trees):**
  - `node scripts/gate-numerals.mjs` → **exit 1, "NUMERALS FAIL: VERIFY.txt presents the stale pin as current"** — and the
    delivered `ACCEPTANCE-RECEIPTS.txt` in both trees claims `gate-numerals: CLEAN ×2` / "ACCEPTANCE RUN COMPLETE". The
    delivery contradicts itself at its own final bytes. The `acceptance-run.sh` it advertises stops at step 16/17.
  - The three `FIX-RECEIPT.md` copies measure **`1b9bea5f…`**; `WHAT-CHANGED.md:93` and `VERIFY.txt:793` both quote
    **`21d81b7b…`** — the pre-A7 bytes. (Both trees + package root must be corrected and dated.)
  - `cakepanz-4/SNAPSHOT.md:115` says **`26/26`**; **`cakepanz-4-prepared/SNAPSHOT.md:104` says `25/25 on BOTH`**; the final
    number is 33/33. Both `ACCEPTANCE-RECEIPTS.txt` files end stale/red (shipped: "STOPPED AT 16"; prepared: "COMPLETE" at
    305 entries).
- **Five seats independently found the simple-row dead control** (inkling, pickle, hy4, glyph, ds — Beam missed it)
  and **three found the simpleOff refresh-loss** (pickle B1, hy4, ds F3). **DS alone found the two load-bearing items:** F2
  (the completing-pick → stale board → "it is not your pick" trap — the transition door A1 did not cover) and F4 (the numerals
  gate). **My sweep supersedes Beam's "ok-with-nits, merge as-is" recommendation** — the convergent evidence holds, and Block C
  does not open on this delivery as it stands.
- **The review chain is satisfied numerically (≥4 improved)**; acceptance is the Architect's and the Owner's call, and it
  requires this 8.1 round to pass its own gate.

## 3 · The baseline (quote only these; they are the tool prints; re-measure anything that moves)

| Claim | Value at delivered bytes |
|---|---|
| shipped pin / prepared pin | `5c808472` (67 files) / `65673a00` (68 files, prepared-not-activated) |
| flex | 99 rules `{0:17, 2:17, 6:42, 12:23}`; SS>NICKEL 0; FB>TE 2; C>OG 6; OG>C 2; the six 16-Nov 0→2 landings at 2 |
| engine suites | `npm run test:engine` → 394/394 shipped · 406/406 prepared |
| node battery | 33/33 both trees |
| gate-manifest | `PASS (314 entries verified, dist/ covered, converse clean)` shipped · `PASS (319 …)` prepared |
| **gate-numerals** | **FAIL exit 1, both trees (today)** — this is the baseline to fix, not a number to inherit |
| dist/single.html | `1529a003…e737` (both trees) — **will change after this round's code edits; re-measure and quote the new one** |
| node-port register | fail-loud freshness gate; engine-node regenerates if missing/stale — keep that behavior |
| receipt falsifier | F0–F12 all DIED (both trees) |
| late battery | 6/6 both trees (L1–L6) |
| gh-pages | tip `66096fb`; deployed tree names `4ca9a071`/52 files; 277/9; **NOT PLACED** |
| live wave | 89 |

## 4 · BLOCK 1 — product / render layer (zero engine; the §0 port exception only)

Apply in **both trees** unless named. Each item: anchor → old → new → WHY → HOW TO CHECK. All snippets are the amended
texts already filed by the reviewers; you may adjust shape only with a receipt and a note.

### 4.1 — [DS F1 · 5-seat convergence] The simple row's "one click away" detail does not exist (the row toggle is dead)
**Anchor:** `src/lib/components/BoardRow.svelte`, the `{#if simple}` branch.
**Old:** the branch renders `<button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}>…` and **no detail block** — while `WHAT-CHANGED.md` says the flex chips live one click away in the row detail (they do not); the full branch's `{#if open}<div class="cp-fits">…` block renders only in full mode.
**New (the amended text to implement):**
```svelte
{#if simple}
<div class="cp-row cp-{r.tone} cp-simplerow">
  <button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
    …unchanged cells (name, pos, cp-rec wins, gone% + tooltip)…
  </button>
  <button class="cp-pickbtn" onclick={() => onpick(r.id, r.slotId)}>DRAFT</button>
  {#if open}
    <div class="cp-fits" id="cp-fit-{r.id}" data-testid="cp-simple-detail">
      <span class="cp-fitlbl">Fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
      {#each r.alsoFits as f}
        <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)}>{f.slotLabel} <i>{f.flex}</i></button>
      {/each}
      <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
    </div>
  {/if}
</div>
{:else} … unchanged … {/if}
```
(render spans the row box: `.cp-simplerow { … flex-wrap: wrap; } .cp-simplerow .cp-fits { flex-basis: 100%; }` — the L2 collapsed-row anatomy keeps passing: chips render only on `open`.)
**WHY:** the delivery's honest line overpromises; every recorded reviewer-hit found this; L2 counts absence and cannot see it.
**HOW TO CHECK:** browser probe (or the shell battery): pick 11, click `.cp-mainsimple`, assert exactly one `.cp-fits[data-testid="cp-simple-detail"]` becomes visible with chips > 0, `aria-expanded === "true"`, collapse → hidden, collapsed row carries **0** chips. Encode this as **L7** (§6).

### 4.2 — [DS F2 · the best finding of the round] The completing pick hands nothing over — stale board, "it is not your pick"
**Anchor:** `src/App.svelte`, `pick()`.
**Old:**
```diff
   function pick(playerId: string, slot: string) {
     store.dispatch({ type: 'PICK', playerId, slot } as any);
     refresh();
     void autosaveDraftNow();
   }
```
**New:**
```diff
   function pick(playerId: string, slot: string) {
     store.dispatch({ type: 'PICK', playerId, slot } as any);
     refresh();
     void autosaveDraftNow();
     // the pick that completes the draft hands the screen to Complete — never a stale board
     if (store.getState().status === 'done') go('complete');
   }
```
And in `refresh()` (delivered ~130–134), replace the phase-blind swallow:
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
**WHY:** the user's own 32nd pick always completes the draft (the CPU picks stop); the A1 fix covered refresh and DRAFT-nav; **the transition was never covered and it is the one every user takes.** It also surfaces developer-language to the user.
**HOW TO CHECK:** drive the draft to the user's 32nd pick **through the UI** (not store dispatches), then assert: `data-screen="complete"`, the record rendered, `not-your-pick` never rendered, zero page errors. Encode as **L8** (§6).

### 4.3 — [DS F3 = pickle B1 = hy4 RISK · 3-seat convergence] FULL BOARD choice does not survive a refresh
**Anchor:** `src/App.svelte`, `let simpleOff = $state(false);` + `lateMode` derivation + the door button; `src/lib/port/settings.ts` (`Settings`).
**New default shape (DS's patches, recommended):** persist in the settings model (one additive boolean; the settings file is the one port-layer exception this round allows):
```diff
 // src/lib/port/settings.ts
 export interface Settings {
   …
   draftSlot: number | null;     // P-317: the chosen draft position 1..32 (persisted with the team)
+  fullBoard: boolean;           // P-337: the user took the full board back this draft
 }
 export const DEFAULT_SETTINGS: Settings = { …, draftSlot: null, fullBoard: false, };
@@ field-by-field validation
       draftSlot: …,
+      fullBoard: p.fullBoard === true,
```
(plus a `setFullBoard(v)` mirroring the existing setters; **`startDraft`/`startNewDraftFlow` calls `setFullBoard(false)` so a NEW draft offers the flip again** — on `loadDraft` the choice must **persist**, per hy4's nuance: loading a saved late draft must not silently re-lock simple mode.)
```diff
-  let simpleOff = $state(false);   // P-337 …
-  const lateMode = $derived(myPicks >= 10 && $draftState?.status !== 'done' && !simpleOff);
+  const lateMode = $derived(myPicks >= 10 && $draftState?.status !== 'done' && !$settingsStore.fullBoard);
   …onfullboard={() => setFullBoard(true)}   /* was: () => { simpleOff = true; } */
```
**WHY:** the order's own promise — "returns to full and STAYS for the rest of the draft" — is session-scoped today; a refresh (the flow Slice 3 exists to support) discards it. pickle's alternative (persist on the draft autosave meta, one boolean beside `saveId`) is also correct; **do not do both; if you pick the autosave route, get it reviewed before re-cutting — it touches the port save lineage, the settings route does not.**
**HOW TO CHECK:** take FULL BOARD at the 11th pick, **reload**, assert `data-form="full"`, then start a NEW draft and assert `data-form="simple"` at the flip again. Encode as **L9** (§6).

### 4.4 — [INKLING F3 · my review, this morning] `syncFromHash()` bypasses the A1 done-board redirect
**Anchor:** `src/App.svelte` `syncFromHash()`.
**Old:** `function syncFromHash() { const r = currentRoute(); if (r) screen = r.screen; }`
**New:** `function syncFromHash() { const r = currentRoute(); if (r) go(r.screen, r.param); }`
(one line; `go()` owns the redirect; the extra hashchange converges on `#/complete`. The deeper fix — parse-time normalization in `router.ts` so `#/board` with a done record never matches — is the Architect's to rule on; note the fork in the delivery, do not build it this round.)
**WHY:** A1 closed two of three write paths to `screen`; this is the third (Back button / hand-edited hash / bookmark → blank board again).
**HOW TO CHECK:** browser probe: finish a draft, set `location.hash = '#/board'`, fire `hashchange`, assert Complete renders and `#/board` (or the redirected hash) never yields a blank page; the probe belongs in the node battery or beside L8 — **do not add an S32 to the shell battery without re-quoting the law count everywhere** (the A8 rule; the shell battery prints are quoted as 47/0 in this order).

### 4.5 — [PICKLE B3] The shown number and the active sort can disagree
**Anchor:** `src/lib/components/BoardRow.svelte` (`cp-rec`), `SortControls.svelte`, `BoardFooter.svelte`.
**Fix — pick one and say which:** (i) pass `sort` into the row and render the matching field with a 3-letter caption (`WINS`/`PRIO`/`GONE%`), or (ii) when the user changes sort, reset `sort = 'wins'` as the toggle closes and keep the wins number, with a one-line note ("other sorts are in FULL BOARD").
**WHY:** a row sorted by priority showing an unlabelled wins number makes the one number a lie about the order.
**HOW TO CHECK:** simple form, change sort behind the SORT toggle, assert the shown number matches the active sort (or the reset happened); extend **L2** if you take (i).

### 4.6 — [INKLING F6 · nit] `Hub.svelte` unparenthesised `&&`/`||`
**Anchor:** `Hub.svelte`, the `cp-wk` `class:cp-played` expression.
**Fix:** parenthesize or derive a named boolean (`const played = n <= season.slot - 1 || (n < season.slot && !season.atLastPlayed);` — whichever matches the intended semantic; state which).
**WHY:** precedence traps; zero cost.

### 4.7 — [INKLING F4 · calibration, zero Owner cost] The recommendation number is unlabeled on-screen
**Fix (default):** `title="Wins — what the board ranks by"` on `.cp-rec` (as ride-along of 4.1) and/or visually-hidden `WINS` caption; the Guide already explains Wins/Priority — one line, no wording invention. If the Owner wants different wording, his word wins; flag, don't invent.
**HOW TO CHECK:** grep the simple-row rec cell carries the caption/title; L2 may assert its presence non-visually.

### 4.8 — [INKLING F5 · wording] The honest switch line must be true after 4.1
After 4.1 lands, "every number is still one click away" is **literally true** (fits/advice render one click on the row in both forms). Keep the line verbatim; cite L7 in WHAT-CHANGED. If 4.1 is implemented as the static-row alternative (no detail block at all), the line must instead read "everything else is one click away on the full board" — you pick the branch per 4.1, and say which.

## 5 · BLOCK 2 — receipt / documentation hygiene (the delivery's own law; every line re-verified 2026-11-18)

Apply in both trees + package root where named. Re-quote with dates, keep history where ordered.

### 5.1 — [DS F4 · VERIFIED by two seats today] `gate-numerals` is red; `acceptance-run.sh` stops at step 16/17
**Root cause:** `gate-numerals.mjs`'s `stalePin()` requires `stale|old|was|→|->|superseded|correction` within ~90/100 chars of the hit; `VERIFY.txt:553–554` (the §20.3 unplaced gh-pages paragraph) says "name `4ca9a071` / 52 files" with none — a hit without a keyword.
**New (one word, zero meaning change; both trees + package copy):**
`…line 9 name the **stale** pin \`4ca9a071\` / 52 files…` (and same on the CHECKSUMS line). Then re-run steps 16+17 twice on each tree, paste both runs in **VERIFY §22**, and add a `c8-numeral-gate-*.log` receipt.
(Alternative: widen the heuristic to accept `defect|NOT PLACED|deployed`. If you take this instead, the script changes and you must re-run the whole falsifier set + say so explicitly. The one-word edit is preferred. Do not do both; this rides the Architect's perf, not yours to widen silently.)

### 5.2 — [DS F4/F7] The `ACCEPTANCE-RECEIPTS.txt` files contradict the delivered bytes
**Shipped copy:** ends "ACCEPTANCE RUN STOPPED AT: 16 … (exit 1)" with a post-script asserting the gate "is FIXED … CLEAN ×2" — false at the final bytes. **Prepared copy:** ends "ACCEPTANCE RUN COMPLETE" at stale 305 entries; stale pin-context numerals lines.
**Fix:** after 5.1, **regenerate both files** by re-running the composite `bash scripts/acceptance-run.sh` now-with-green steps (one sitting, one uninterrupted window — it is no longer blocked), OR replace each with one honest pointer line ("the final-state run is `receipts/partH-c8-1/` + VERIFY.txt §22; this file is kept as the c7/c8-era record"). Regeneration is preferred; do not ship a red or self-contradicting receipt.

### 5.3 — [DS F5 · VERIFIED today] The quoted FIX-RECEIPT hash is stale
**`WHAT-CHANGED.md:93` and `VERIFY.txt:793` (both trees + package):** `21d81b7b…` → `1b9bea5f…` (re-measured 2026-11-18, after the A7 edit changed the file; the three copies remain byte-identical — re-`cmp` and print it). Prefer dropping the hash entirely and keeping the three-copy `diff` as the claim, dated.

### 5.4 — [DS F6 · VERIFIED today] `SNAPSHOT.md` node-battery counts stale
**Shipped `SNAPSHOT.md:115`:** `26/26` → `33/33` (keep "the count was 26 at the cakepanz-6 sitting" history).
**Prepared `SNAPSHOT.md:104`:** `battery:node 25/25 on BOTH` → `33/33 on BOTH` (same history note).
Re-grep the whole package for `\b(26|25)/(26|25)\b` node-battery claims with the same hold; report what you fix.

### 5.5 — [INKLING F3 (morning)] The f4/f5 red tails cited as final evidence
`receipts/partH-c8/f4-a1-postfix-probes.log` ends in a Node-v24 crash (the Architect's `localStorage.ts:31` open item, at the wrong path); `f5-late-and-a1-final-shipped.log` carries the pre-fix L4 red (5/6) unlabeled.
**Fix:** rename `f4…probes.log` → `f4-…-attempt1.log` with a one-line header marker; annotate `f5…log` header `# pre-fix L4 red run kept for the trail; final state = f7-late-battery-final-shipped.log (6/6)`; **WHAT-CHANGED's A1/Block-B entries point at the green A1 block of f5 and at f7**. No bytes of game logic change; this is naming and pointers.

### 5.6 — [DS F8 · informational] `slice1-battery.json` dirties the delivered tree
**Fix:** stop writing it into the tree (write under `deliveries/receipts/` — receipt-excluded — or gitignore it in both trees); state which; confirm `git status` is clean after a battery run.

### 5.7 — The A8 sweep keeps its rule
Any document that states a count states the tool printout at the final state — after this round: **the number of new laws (L1–L9), the batteries' counts, the gates, the dist sha, the suites** — all re-printed, nothing inherited. `VERIFY.txt` gains **§22 (THIS SITTING, 2026-11-18+)**: every command + stdout pasted, REPORTED/NOT RUN ledger (acceptance-run.sh now runs, by order, end-to-end), and the corrected hashes.

## 6 · BLOCK 3 — laws and falsifiers so this cannot recur (same discipline as round 8)

New laws go in `batteries/late.battery.mjs` (both trees), same exit discipline, `npm run battery:late`:

- **L7 — the detail is one click away:** simple form, row 11th pick, click `.cp-mainsimple` → assert exactly one `.cp-fits[data-testid="cp-simple-detail"]` visible with ≥1 chip, `aria-expanded === "true"`; click again → hidden with 0 chips. (L2 keeps passing — it counts the collapsed state.)
- **L8 — the last pick lands on Complete:** drive to the user's 32nd pick **through the UI**; assert `data-screen="complete"` (or the Complete screen rendered), record rendered, `not-your-pick` never rendered, zero page errors.
- **L9 — the mode choice survives a reload:** at the simple form, take the FULL BOARD door; **reload**; assert `data-form="full"`; start a NEW draft; assert the flip offers simple again at the 11th user pick.
- Keep **L1–L6 green** unchanged. If L1–L6 were ever to move, that is a regression this round must not introduce.

**Falsifiers** (extend `scripts/falsify-late.mjs`, clean-baseline-first, apply-asserted plants, `red = 1` on any could-not-run):

- **F14-late** — plant the dead toggle again (simple branch without the `{#if open}` block) → **L7 must die.**
- **F15-late** — delete the `go('complete')` handoff in `pick()` → **L8 must die.**
- **F16-late** — delete the reload-restore of `fullBoard` → **L9 must die.**
- (F0-late baseline green required before any plant means anything — as before.)

`scripts/acceptance-run.sh` gains steps for L7–L9 + F14–F16 + the numerals gates (16/17) and the fresh-clone log includes them.

## 7 · Explicitly OUT of scope this round (do not build; do not re-open)

- **Block C / R-13 (framework round).** It opens only when THIS 8.1 zip passes its gate and the Architect/Owner rule it. It is
  not yours to open, and nothing in this order advances it except a green final state.
- The **three-choice card** (DS's R-13 note, item 1), **Complete printing the roster the engine would field** (item 2), the
  **`simpleRows(vm)` port module** (item 6), **"Explain my next pick"**, **wall-slip reveal**, **visual-regression harness** — the strongest shell ideas on the table, all filed, **all for the next round**, none for 8.1.
- **League-size calibration** (hy4's flag: 12-team league → simple form at ~4 rounds left; 32-team → ~6) — flagged for the Owner; **do not re-tune the flip**. The threshold stays the user's own 10th pick.
- **The overall-320 alternative** — the Owner's call; unchanged; hy4's and pickle's arithmetic rides the record.
- gh-pages placement; prepared re-pin activation; λ (0.40-as-labelled-convention remains the glm/vl/vloc recommendation, his word); labels; contrasts; Bodoni Moda; 2PT; the 3-4 note; the never-Touchdown law.
- MUSE re-filing `START-OF-CHAT-ZAI.md` on `council/muse` — MUSE's job (none of the three copies changes this round unless your §5/§6 changes force them; if they change, they stay byte-identical ×3 and MUSE gets told explicitly, in the delivery).

## 8 · What to run, in order (and what green looks like)

1. §1 reads (git fetch; read the files; say if any cannot be read).
2. Baseline re-verify exactly as round 8 §1 (pins via `git archive`, flex census, suites, node battery, gates incl. **numerals**, dist sha).
3. Apply §4 patches, both trees, apply-asserted; keep the diff minimal: render + the one port exception (§0.2) + docs/tests.
4. §5 patches both trees + package root; re-hash; re-`cmp` the three FIX-RECEIPT copies (byte-identical ×3).
5. `npm run test:engine` → **394/394 · 406/406**; `npm run battery:node` → **33/33**; `npm run distfile` → **diff `dist/` across trees exit 0; new single.html sha quoted everywhere**; `node scripts/gate-manifest.mjs` ×2 each tree → **PASS 314 / 319**; **`node scripts/gate-numerals.mjs` ×2 each tree → CLEAN exit 0** (this is the receipt that was false last time; two runs, two trees, pasted).
6. Browser legs: shell **47/0** · slice **29/0/10/3** · late **9/9 (L1–L9)** — all re-run; A2 mutation re-run once (shipped tree only) → **46/1 red with S29 for the right reason, restored 47/0**; falsifiers → **F0–F12 + F14–F16 all DIED**.
7. Fresh-clone composite, one uninterrupted run, **now including the numerals steps**: npm ci → precompile → node → engine → distfile → slice → late → shell → regen 314/319 → gate PASS 314/319 → numerals CLEAN ×2. Paste the whole log, ends green.
8. `bash scripts/acceptance-run.sh` **end-to-end, one run, exit 0** — this time it must complete. Paste it.
9. `git status` clean except the intended deltas; no engine-node committed; no `screenshot`/`node_modules` riding the zip; `ACCEPTANCE-RECEIPTS.txt` truthful at final bytes; CHECKSUMS/MANIFEST regenerated; zip → sha256 → reply.

## 9 · What the delivery must contain

`67-cakepanz-8.1-<yyyy-mm-dd>/` (one zip; the Owner places it; naming may ride the Owner's preference):

- `cakepanz-4/`, `cakepanz-4-prepared/` — fixed trees (new laws, rebuilt dist, regenerated manifests, regenerated CHECKSUMS)
- `receipts/partH-c8-1/` — raw logs for every §8 command this sitting produced (ends green)
- `WHAT-CHANGED.md` — one entry per §4–§6 item with anchor/before/after/receipt names (the same discipline as round 8)
- `README-DELIVERY.md` — one paragraph, the pins, the gates, suites as the **final-state tools print them**
- `SNAPSHOT.md`, `FIXLOG.md`, `SHELL-STATUS.md`, `MERGE-README.md`, `VERIFY.txt` (§22 added) — every count re-quoted
- the corrected hashes; the three byte-identical START-OF-CHAT-ZAI.md copies (untouched unless forced — see §7)

## 10 · What "done" looks like (the acceptance set, verbatim)

A reviewer who has read nothing else can, on a fresh machine: run the seven round-8 commands plus the **numerals gate twice in each tree (must exit 0)** — get the same numbers; find the simple row's detail one click away; find the completing-pick trap replaced by landing on Complete; find the FULL BOARD choice surviving a reload; find `acceptance-run.sh` completing; and find `VERIFY.txt` §22 containing the raw stdout of all of it. Two seats' ok/improved on **this** 8.1 closes the round-8 chain properly.

## 11 · If you disagree

File it; do not silently do something else. Expected legitimate disagreements and where they go:
- **§4.3's persistence route** (settings model vs autosave meta) — the settings route is the default; the autosave route needs the Architect's ack before re-cutting.
- **§4.4's alternative** (parse-time normalization) — note the fork; do not build it this round.
- **§5.1's one-word vs heuristic-widen** — the one word is the default; widening is a script change and your call only if the one word is wrong, in which case say so and re-run the falsifiers.
- **§5.2's regenerate-vs-pointer** — regeneration preferred; pointer honest only if the composite cannot run in this sitting, and then the pointer says when it will.
- Anything else: ask the Owner first, via the inbox. One sitting, one zip, nothing else rides.

## 12 · The quiet part, said once

You built A1–A9 and Block B against an order that said "done looks like two ok/improved on THIS delivery" — it got four, and it
still carried a dead control, a state-restoration bug, a transition nobody covered, a red gate wearing a green receipt, and a
hash that named its own previous bytes. The chain worked. This round exists so that the delivery at the far end of it is what
the chain proved it was not yet. Make it boring: every claim green, every number printed, nothing red at the final bytes.

SPEAKER: INKLING (MUSE delegation) — this order written 2026-11-18 from the seat-sweep evidence (`council/inkling @ 7216ad09`), filed as a
council work order, not as a chat; it binds no one; the Owner relays it.
