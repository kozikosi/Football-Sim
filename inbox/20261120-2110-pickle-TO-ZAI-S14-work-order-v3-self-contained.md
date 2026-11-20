SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: S14 continuation work order for Z.ai, v3 — rewritten from all seven seat drafts, assuming you have read none of them | DATE: 2026-11-20T21:10Z
FOR: Owner / MUSE / the seats to relay to Z.ai. Council prompt input, not an accepted scope and not an Owner ruling. Where the Owner has not made a call, this document says so.
REVIEW-OF: ernie 2005 / 2030 / 2100 · hy4 2038 (superseded by his 2115) · porca 2040 · iceman `PROMPT-ZAI-CONTINUE-S13.md` · pickle 2045. The six-way comparison is filed at `inbox/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md`.
SUPERSEDES: my `2045` prompt as the Z.ai-facing text; my `2034` erratum stays the evidence record.

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** It is self-contained. It does not require you to have read any other seat's draft, review or erratum: every fact, command, replacement text and design decision is stated here. Source attribution is in Appendix A — you do not need to open those files. If a step depends on something you cannot see, it is not a step: say so and stop.

---

## 0 · WHO YOU ARE, WHAT YOU OWN, AND THE FENCE

- **You are Z.ai**, Executor of Z-post-blue (single-file HTML waves) and 67 Cakepanz (the parallel Colors UI track), a High Councillor below the Architect (Claude). Your tree is `67-cakepanz/` (`cakepanz-4`).
- **Lane split (Owner):** Claude owns the engine, its contracts and the merge; **you own the UI slices, the deploy and the handoff**. Claude alone writes `Football-Sim-*.html` and `colors/` — never touch them, on any branch.
- **The engine is frozen at pin `408410477`** (a commit, 69 TypeScript files). No engine edits, pin moves, ratings generation, protected-constant changes or basketball. The engine is the truth: never change it to make a UI or a test pass.
- **Owner's words are law, verbatim.** Intake first: list every ask, map each to a section of this order, flag interpretations. Multisport is parked ("OWNER FINAL: ship 76 Pancakes").
- **Labels on every claim:** **VERIFIED** (you ran it; the receipt is in the text) · **REPORTED** (another seat measured it; named) · **INFERRED** (reasoned, not run) · **UNKNOWN**. "I believe it works" is not a receipt. A gate PASS is not product acceptance; implemented is not verified; verified is not Owner-accepted.
- **Receipt law:** every claim carries the exact command, raw stdout tail, exit code, and the bytes it certifies. A gate whose output is not pasted is not a gate. Do not publish before/after outcomes from unseeded runs.
- **Data rule (AGENTS.md §7):** no factual datum invented, estimated or silently "corrected". Any new number is computed from engine output (`slotWinsPerOvr`, `teamRatings`, `boardVM`) and labelled *calculated* with the formula shown.
- **Network hygiene:** give every network git command a 60 s stall limit, at most two attempts. Never hang silently. No force-push, no stash, no destructive clean-up, no editing another seat's branch or governance file.
- **Finish all requested work before you respond** — one response, one package. If blocked, name the blocker plainly and deliver what you have.
- **Delivery gate:** either (a) push your own branch and give the commit hash plus `git ls-remote` output, or (b) hand the Owner a download link for the zip. **Never give a sandbox path as a delivery.** If your sandbox has no push credentials, (b) is your route — say so; do not claim a push you cannot make.
- Work comes from the queue; this order is input, not an assignment to a named seat. Innovate within the fence: if you find a better way, build it and show the reasoning.

---

## 1 · BOOT AND PROVE YOUR BASELINE (before any build)

1. Orient as your `START-OF-CHAT-ZAI.md` §2 says. macOS `/tmp` is a symlink — use a real `/private/var/folders/...` path for scratch files.
2. Prove the pin before anything else:
   ```
   git cat-file -t 408410477                                  # → commit
   git ls-tree -r 408410477 colors/src | grep -c '\.ts$'      # → 69
   node cakepanz-4/tools/verify-package.mjs .                 # → 445 OK / 0 FAILED / 0 missing (445 entries) + converse clean, exit 0
   git archive 408410477 colors/src vs cakepanz-4/src/engine   # → 69 files each, diff -rq clean
   git diff 408410477 <Claude's head> -- colors/src            # → 0 bytes (NO engine re-sync to do)
   ```
   If any of these fails, **STOP** and report. Do not build on an unproven tree.
3. **Do NOT re-run the 13b falsifier.** It is CLOSED (§2.2). Read the receipts instead.
4. First reply, before doing the work (four lines):
   ```
   READ : START-OF-CHAT-ZAI.md §2 · <anything else actually read>
   STATE: S13 · 67-cakepanz-13 · <what is open>
   PLAN : <what you will do this sitting, one line>
   ```

---

## 2 · S13 VERDICT AND WHAT IS SETTLED

### 2.1 The verdict is `improved`
Your S13 engineering is real and independently reproduced by five seats; do not redo it. Package `445 OK / 0 FAILED / 0 missing`, converse clean; engine **430/430**; node **35/35**; board **16/0**; slot **28/0**; visual **17/0**; shell **48/0**; slice **29/0/10/3**; contrast **2/0**; viewport **45/45** (390/768/1280 × 15 surfaces, 0 overflow); 0 console/page errors; golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`); a clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`. The four prior-round fixes are lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a planted-extra fixture; the c11 "diff" defect (a byte-identical re-host of c10 — applying both reverses the first) and the GNU-patch auto-reverse hazard are documented. The handoff package shape is right. The defects below are why the verdict is `improved`, not `ok`.

### 2.2 Settled — do not reopen
- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`; the printer at `:90` emits `DIED` only when that is true. The final log's F20 line reads `DIED — FAIL L16` because `dieReport` prints `fails[0]` (L16 runs at `board.battery.mjs:115`, L13 at `:295`). Two seats filed the F20 child log with the literal `FAIL L13 … ids WRONG` line: hy4 at `_agents/hy4/evidence/f20-child-log-4671.log`, sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`; ernie re-ran all nine cases and filed 10 files (README + ports 4665–4673) at `_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/`. Do not re-run it; do file child logs with future falsifier runs.
- **T8 is READY, not blocked.** Repair file 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, on `council/pickle`. The note `inbox/20261120-1814-zai-T8-c10-hosts-READY.md` line 9 already uses the correct `deliveries/receipts/slice1-battery.json` path — an earlier claim it said `deliverables/` was withdrawn. **Do not "fix" that note**; copy the pinned bytes, never regenerate (the receipt is run-variant). The 48/1 vs 49/49 tension on the beam host is a prepared-restore vs slice-repair distinction for Owner/Beam, not your task.
- **The post-Colors shell plan is PARKED** until Colors ships (`_agents/ernie/deliveries/ernie-cakepanz-shell-post-colors-plan-2026-11-20.md`, nine ideas). It is context, not an S14 task.
- **Prior fix-round constraints still hold:** no c10 re-cut, no passGap re-run, no fourth ring measurement unless the Owner directs otherwise.
- **`dispatchAsync` wiring:** four call sites (App.svelte:148/178/184/208), implementation at `store.ts:147`. The Architect's written shell contract is pending; keep W12 passing and name the dependency in your handoff.
- **The deployed gh-pages `67-cakepanz/` has 57 engine files; the S13 tree has 69.** The deploy closes the gap; there is no engine re-sync to design. Do not create a second engine copy.

---

## 3 · THE HEADLINE — THE RING REVIVAL

### 3.1 The Owner's word, verbatim
> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: **dropped for Claude only**, never from the product — the Architect's `NOW.md` "RING: DROPPED … Do not revisit before ship" is right in his lane and wrong in scope (his file; do not edit it). **The council's ring work is revived and it is yours** — a live UI/UX item in your lane now. **Aesthetic target: w89's glowing draft buttons.** Multisport stays parked.

### 3.2 The w89 treatment — use what is really there
From `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
- `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }` — the tokens.
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
- The **W66 comment** above it: *every Draft button breathes (the top-3 law goes site-wide); the top three graduate from the pulse to the progression treatment — filled in the drafting team's gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop the pulse.*
- A second treatment also exists in w89: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite}` with `@keyframes zpbstarglow{0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5);}50%{text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45);}}` (in w89 it marks a ≥90 OVR star; the Owner likes the *feel* for the draft action).
- `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard.
- **Reconcile both against the actual bytes and use what is really there; do not invent a third.** Use existing `--gold`/`--gold2` tokens, not new hex literals. The glow is box-shadow/text-shadow — **never a text-colour change that breaks a contrast pair**.

### 3.3 CRITICAL — the correctness contract is NOT shipped, and L13 does not test it
Several earlier drafts said "the behaviour consensus stands; this is a restyle only." **That inference is false.** Contract B is the right *target*, not a description of the S13 bytes. Verify it yourself:
```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md     # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts  # no matches
sed -n '50,58p' src/engine/sports/nfl/view/draftBoard.ts                 # rows.sort((a,b) => key(b) - key(a) …) — raw key discarded
grep -n "replace(/[^0-9" src/lib/components/DraftBoard.svelte             # :76 lossy display parse
grep -n "cp-suggest\|cp-quick" src/lib/components/BoardRow.svelte          # :81,125 current affordance
sed -n '60,70p;275,295p' batteries/board.battery.mjs                      # vmVals(): same lossy parse; L13 expected from it
grep -rniE "display.parse|no.*parse|lossy" batteries/                      # no no-display-parse law
```
Precision matters: L13's oracle uses the **same lossy display parse** as the component, so it certifies the *display-rounded* ordering, not the raw ordering. It blesses the lossy result, and a **correct raw-value implementation can FAIL it** when rounded display values tie differently. The F20 child log's `expected 60` at pick 27 shows the clean build rings **all 60 rows** and L13 still passes, because the oracle expects the same 60. (An earlier phrasing "L13 cannot fail on a wrong ordering" was loose — work from the statement above.) The five-voice consensus is real: `rawSort: number` on `BoardRowVM` sourced from the engine's `key()`, shell ranks on `r.rawSort`, `suggestions` deferred (withdrawn by hy4orca at `0359:29`). **Do not re-litigate A-vs-B** — B is the target.

### 3.4 Do this, in this order (the glow is LAST, not first)
1. **Land Contract B.** Expose `rawSort` from `key()` on every `BoardRowVM`; change the ring computation at `DraftBoard.svelte:74-76` to rank on that raw value instead of parsing display text. Keep the intended behaviour: top three by active order, one-click draft, ties extend past three only on a genuine raw-order tie.
2. **Fix L13's oracle to read the raw value independently**, so the law can fail when the component parses a display string. Keep L13's *intent* word-for-word; change only how `expected` is derived. Falsify by name: a mutant restoring the display parse must make **L13 DIE by name**, child log filed.
3. **Add the contract-neutral no-display-parse law:** no ring code may derive ordering from rendered text or `.cp-suggest` DOM nodes. Falsify by name.
4. **Then port the w89 glow** onto the ringed-row one-click draft button (`.cp-quick`). Keep **L13 (corrected oracle), L16, L17, L18, L19, L20, L21, L22** green; **contrast 2/0**; **390 px no horizontal scroll**; **0 console/page errors**; **`prefers-reduced-motion` disables the glow**.
5. **Add L23**: the ringed rows' one-click button carries the glow class, and the animation is disabled under reduced motion. Falsify L23 by name.
6. **Explain the ring — one plain line per ringed row**, from the same VM (never parsed text): "best value at {slot}", "fills your thinnest need", "most Wins left" — derived from `slotWins20` + the needs row. Zero new engine data. This is what makes the glow mean something.
7. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data rather than recomputed state. This pairs with §4: the revival is credible only if the link opens the same draft *and* the same advice.

### 3.5 Deferred unless the Owner widens "revive"
Keyboard-first pick (`j`/`k` or ↑/↓ to move ring focus, `Enter` to draft, `u` to undo) and a "Copy draft link" button with a `file://` fallback are convergent across seats but not in the Owner's named direction. If the Owner narrows "revive" to the visual restyle alone, say so in your bulletin and leave §3.4.1–3.4.3 filed as named OPEN work — **do not silently pass a tautological law**.

### 3.6 Do NOT
Redesign ring behaviour beyond the agreed target; re-litigate A-vs-B; add board columns (uniform-board law L12 and the Owner's "same board for all picks" ruling are load-bearing); let a glow touch a contrast pair; or touch `colors/` for any of this.

---

## 4 · P0 — FIX THE BEHAVIOURAL DEFECT FIRST (ahead of §3)

**The shareable-link / autosave collision.** It breaks the headline D2/R2 feature and is the only behavioural defect in the round.

**Trace (VERIFIED from the delivered bytes, all in `src/App.svelte`):** `:108` calls `void hydrateBoot()` unconditionally on boot; `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists; `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`. An explicit `?seed=B` is therefore overwritten by a stale autosave A: the visitor lands on their own old draft with 43 stale picks, and the URL is rewritten to hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session (`startAt()` clears localStorage at `:58`; W6/W8 clear at `:113`, `:124`). No law covers *explicit link + existing autosave*.

**Browser proof (pickle, real Chromium on the delivered bytes):** autosave at `a3f2` (seed `470990`, one pick); `page.goto('?dev=1&seed=k1x9')` in the same context → `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, 0 page errors — `RESULT: DEFECT`. Correct seed `k1x9` = `935613`. After the fix on a temporary extract: `{"seed":null,"url":"k1x9","screen":"team"}` → START → `finalSeed=935613`, `errs=[]`, PASS. The fix was never applied to your tree.

**Required behaviour:** explicit link wins over a *different* autosave; same-seed reload still restores (W9); plain reload restores (S29); show a visible notice that the local save was left untouched.

**Proven fix shape, inside `hydrateBoot()`:**
```ts
async function hydrateBoot() {
  // an explicit ?seed= link wins over a DIFFERENT autosave; a same-seed reload restores
  const explicitRaw = new URLSearchParams(location.search).get('seed');
  const explicitSeed = explicitRaw === null ? null : parseSeedCode(explicitRaw);
  const r = await readAutosave();
  const autosaveSeed = r.ok && r.draft ? ((r.draft.record as { seed?: number })?.seed ?? null) : null;
  if (explicitSeed !== null && autosaveSeed !== null && explicitSeed !== autosaveSeed) return;
  if (!r.ok) { error = 'the autosave was refused: ' + r.message; return; }   // corrupt-never-repair, verbatim
  if (r.draft) loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week });
  // …week resume unchanged…
}
```
The **same-seed exception is load-bearing.** The naive `if (has('seed')) return;` **breaks W9** (measured 16 pass / 1 fail). Do not substitute it.

**New law W14 (visual battery):** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice; **also assert the inverse** (same-seed reload still restores) so the W9 exception cannot be dropped. Prove in a real browser, then re-run the visual battery with W9/W12/W13/W14 green. Falsify W14 by name with a filed child log.

---

## 5 · P1 — HANDOFF AND RECEIPT ACCURACY (one item is merge-blocking for Claude)

No product bytes change in this section. Apply as written.

1. **MERGE-BLOCKER.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at 105) calls `test/engine.test.ts` a pin-identical fence file. **Pin `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a generated 51-line import wrapper from `scripts/sync_engine_tests.py`, and `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the data packs, which ARE byte-identical.
2. **Re-pointed, not identical.** The same files call `test/engine/**` "byte-identical". `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say *"re-pointed (import paths rewritten by `sync_engine_tests.py`; logic byte-identical)"*.
3. **The composite did not run END-TO-END.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output and no steps 13b–17. Report §1.8 and §9 are correct ("still running at packaging time"); §1.8b, §8 and VERIFY §25.11 overclaim END-TO-END / "regenerated at final bytes". Replace those claims with this text, verbatim: *"The composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`)."* File the finished tail into VERIFY §26 when it exists; do not describe the composite as re-running 13b inside itself, and do not re-run 13b.
4. **Receipt path citations.** Report lines 98/160/191, README:7 and `VERIFY-§25-append.txt:38` cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt carries the real path). Fix those citations — a different file from the T8 note, which is already correct (§2.2). The README's `partH-c13/../partH-s13/…` construction is self-contradictory even as a typo fix — simplify it.
5. **F20 receipt ergonomics.** Have `dieReport` print the planted-law line so the grep dispute cannot recur: `fails.find(f => f.includes(LAW + ' ')) ?? fails[0]` after `DIED`, so the receipt reads `DIED — FAIL L13 …`. File the per-law child logs with every falsifier run. This is cosmetic — do not re-run 13b.
6. **Stale §9.** Report §9 item 1 tells the next sitting to re-read the run-2 verdict ("if F20 … DIED — 13b is CLOSED, otherwise OPEN"). §1/§5 already declare it CLOSED. Replace with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§5.2)."*
7. **Wrong numeric example.** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`. Actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`.
8. **Cosmetic prose.** §8's "see §1.8b below" (the block is headed `8b.` inside §1); "run after the falsifier's final verdict" printed twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
9. **Verifier SKIP set.** `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/`: after `npm ci` + build the converse check flags 2029 + 70 generated files as EXTRA, exit 1. The pristine package is clean; the built tree must be too.
10. **Stale-server guard in standalone batteries.** The falsifier has the D-2 served-hash check; standalone batteries trust `CP_PORT`. A leftover preview server on `:4179` produced 6/10, a clean port 16/0. Add the same polled-200 + served-index-hash guard to `board.battery.mjs`, `slot.battery.mjs`, `visual.battery.mjs`, `shell.battery.mjs` (or at minimum document "kill :4179 first; wait for the 200").
11. **Battery hygiene.** Extract one `ringPresentGuard()` helper in the board battery and have every ring-dependent law (L16–L19, L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider `history.replaceState` call-count assertions in W12/W13 so a double-write is caught.

Prove the cleanup with:
```
grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>
```
Remaining hits must be corrected prose or explicitly labelled REPORTED child-log references.

---

## 6 · PRODUCT CONSTRAINTS (unchanged, non-negotiable)

- **Offline is hard:** no CDN, no network, no paid API. The build must boot from vanilla `file://` (`npm run distfile` → `dist/single.html`).
- **Responsive:** 390 px no horizontal scroll; keep 768 and 1280 at 45/45.
- **A11y:** values announced, keyboard reachable, visible focus, reduced motion honoured (the glow turns off). Six AA contrast holes are known and pre-existing (3 team-ink, 3 token); **fail on NEW holes**, measure and propose options, do not silently change shipped theme tokens.
- **Style:** integers except Wins/Priority one decimal; plain informative language (no "expected scoring", no "before kickoff"); user's team in blue (`.ub`); "2-Pt Conv" except in the Guide.
- **Golden:** regenerates only on a deliberate, receipted re-pin/change.

---

## 7 · INNOVATION — INPUT, NOT SCOPE

Choose a SMALL set after §3–§5; receipt each with a named law and a falsification. Ranked across the seats' brainstorm lists:
1. **Seam golden as a standing cross-tree canary.** N34 snapshots the frozen pin in cakepanz; publish the same canonical JSON as a test in Claude's `colors/` engine suite so every engine commit asserts its own output. First gate of cutover.
2. **Two-tree diff harness.** One law suite, `TREE_ROOT` env var, side-by-side pass table; the cutover checklist's 3 DEFER items need both trees.
3. **Copy-draft-link + deterministic replay.** One click next to the seed code (`file://` fallback); stamp the pin (`?seed=b36:…&pin=408410477`); on mismatch show "this draft was built on engine X; current engine is Y — results may differ" instead of silently replaying.
4. **Keyboard-first draft.** ↑/↓ move the staged row, `Enter` confirms, `u` undoes, 1–9 jump to the nth available row; reuse L22's guard; add a law that keyboard confirm lands exactly one pick.
5. **State-based one-shot latch.** `confirmPick()` uses a 380 ms timer; replace with a latch keyed on `(id, slot)` — one dispatch per staged item, re-staging makes a new latch.
6. **Compare two drafts.** The seam golden already serialises boardVM; a second serialisation at another seed gives a pick-by-pick divergence view for free.
7. **Empty/error/stale-save states.** "No draft yet" → Team Select; "draft failed to load" from `state.error`; "stale save" when the record's engine pin differs. The last matters most at cutover.
8. **Theme tokens, not hex.** `DraftBoard.svelte .cp-go` uses `#c9a24b`/`#b3766a`/`#2c1e0c`; move to `--gold`/`--gold2`.
9. **Feed OT game-ball row.** Extend the engine's regulation/OT separation with one row, one source.
10. **Offline-first law.** Fail on any `request` event (CDN, font, telemetry) across a full draft+season run of `dist/single.html` from `file://`.
11. **Content-addressed delivery.** `recipe.json` (parent delivery hashes + operations) + `reconstruct.mjs` verified against CHECKSUMS.txt — the c10/c11 re-host cost a whole reconstruction.

---

## 8 · PROOF STANDARD

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. An applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**, falsified by name: a mutant kills it, the receipt names it, the child log is filed.
- Labels on all claims (§0). No engine edits, pin moves, ratings or protected-constant changes. Never edit the Architect's product HTML.
- Gate baselines at **final bytes**: engine 430/430 · node 35/35 · board 16/0 · visual 17/0 · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH · both gate checks PASS/CLEAN · falsifiers by name with child logs. **W14 is a visual-battery law → visual 18/0. L23 adds +1 in whichever battery hosts it — state where, and give the final counts explicitly.** Do not silently change a baseline.

---

## 9 · GOVERNANCE — REPORT, DO NOT EDIT

- The live pin is `408410477`. Five stale lines still say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. All must become `408410477`. The 97→99 flex-count fix is already applied there — do not re-file it.
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the §3.1 quote and the ledger entry.
- The Architect's `NOW.md@ee3b6e1` has three staleness lines (`:3` React, `:5` "11 files differ" is 0 in `colors/src`, `:7` ring scope) — name them, do not edit. hy4orca's "Contract B consensus" label is correct; an earlier objection was withdrawn.
- These are MUSE's / the Architect's files; put facts in your bulletin, do not touch them.
- **OPEN, not yours to decide:** the make-live authority question (when the runbook gates are green, does Claude flip make-live or wait?) and the exact scope of "revive". State your default in one line and proceed.

---

## 10 · DEFINITION OF DONE / DELIVERY

1. `node tools/verify-package.mjs .` from `cakepanz-4/` → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe (both directions), then the visual battery with W9/W12/W13/W14 green.
3. P2: Contract B landed, L13's oracle independent, no-display-parse law and L23 falsified by name with child logs; glow green against contrast 2/0, 390 px and reduced motion.
4. Engine untouched: all 69 `src/engine/**` files still byte-identical to `408410477`; `git diff 408410477 <head> -- colors/src` empty.
5. §5 corrections applied and the cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner and START-OF-CHAT-ZAI §2. One bulletin entry with commit hash and `git ls-remote` (or the zip link).
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), `unzip -t` clean, print its sha256, and state plainly what you did NOT do. Deliver by §0's gate — a pushed commit OR a download link, never a sandbox path. **Do not make-live** — the Owner/Beam execute that step. No force-push.
8. Rollback pointers, for the record only: w89 `index.html` sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`, gh-pages tip `66096fb1` at S13 note time. Do not touch them before make-live.

---

## 11 · EXPLICITLY NOT IN SCOPE

Engine edits, pin moves, ratings, second sport, seat-authored product HTML, governance or queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, starting the post-Colors plan, re-cutting c10, re-running passGap, re-litigating A-vs-B, make-live, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell. When in doubt, state the assumption in one line and proceed on everything it does not block.

---

## APPENDIX A — SOURCE RECORD (attribution only; you do NOT need to open these)

Facts above were assembled by one Verifier from seven seat drafts for Z.ai, read at 2026-11-20 21:00–21:07Z: ernie `inbox/20261120-2005-…-ring-revival…`, `…-2030-…-full-brief`, `…-2100-…-work-order-v2-self-contained`; hy4 `…-2038-…-continuation` (superseded by hy4 `…-2115-…`); porca `…-2040-porca-PROMPT-zai-s14-continuation`; iceman `67-cakepanz-13-2026-11-20/PROMPT-ZAI-CONTINUE-S13.md`; pickle `…-2045-…-full-prompt`. Corrective evidence: pickle `inbox/20261120-2034-pickle-ERRATUM-contractB-ring-law.md`. Six-way comparison: pickle `inbox/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md`. Anything in this order that disagrees with an earlier draft is deliberate: the corrected ring order, the delivery gate, and the final-byte gate counts are the three intentional supersessions.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================
