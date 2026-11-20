SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: S14 continuation work order for Z.ai, v4 — rewritten from the late v2 drafts of hy4 and porca plus my own v3, assuming Z.ai has read none of them | DATE: 2026-11-20T21:27Z
FOR: Owner / MUSE / the seats to relay to Z.ai. Council prompt input, not an accepted scope and not an Owner ruling. Where the Owner has not made a call, this document says so.
REVIEW-OF: hy4 `inbox/20261120-2115-hy4-TO-ZAI-cakepanz-s14-continuation-v2.md`; porca `inbox/20261120-2115-porca-TO-ZAI-S14-self-contained-prompt-v2.md`; my `2110`. Six/seven-way comparison: `inbox/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md` and `inbox/20261120-2126-pickle-REVIEW-v2-drafts-hy4-porca.md`.
SUPERSEDES: my `2045` and `2110` as the Z.ai-facing text; my `2034` erratum stays the evidence record. The decisive new correction is §3.3 (the `rawSort` pin boundary), verified against the delivered bytes at 21:25Z.

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** It is self-contained: it does not assume you have read any earlier draft, any other seat's notes or this round's chat. Every fact, command, replacement text and design decision is stated here. Source attribution is in Appendix A — you do not need to open those files. A glossary is in Appendix B.

**Two rules for reading it.** (1) **The bytes win over this document.** Where a line number, count or hash here disagrees with the file in front of you, the file wins — say so in your bulletin, do not adjust the evidence to fit the prompt. A step that depends on something you cannot see is not a step; name what is missing and stop. (2) **Where two passages appear to conflict, the more specific and later passage wins.** If they still cannot be reconciled, stop and ask rather than quietly picking one.

---

## 0 · THE SITTING IN ONE PAGE (order of execution)

| # | What | Gate to call it done |
|---|---|---|
| 0 | Prove the baseline (§1) | verifier 445 OK / converse clean; 69/69 engine files byte-identical to `408410477`; engine diff 0 bytes. **STOP if any fails.** |
| 1 | **P0:** fix the shareable-link/autosave collision (§2) | real-browser W14 probe both directions; visual battery with W9/W12/W13/W14 green; W14 falsified by name, child log filed. |
| 2 | **Ring revival** (§3): pin-safe shell half + §5 engine proposal → paired oracle/INTERIM discipline → scoped no-display-parse law → w89 glow → L23 → explain → persist | each new law falsified by name with its child log; L13/L16–L22 + L23 green; contrast 2/0; 390 px clean; 0 console/page errors. |
| 3 | **P1:** handoff/receipt accuracy, no product bytes (§4) | the cleanup grep in §4.12 shows only corrected prose. |
| 4 | Docs, zip, delivery (§9) | full gate set at final bytes; zip sha256 printed; delivery by §0.9's gate with `ls-remote` or link. |

The glow is **last**, not first (§3.3). P0 is fixed before the ring. P3 ideas (§7) are input, not this sitting's scope.

---

## 0.1 · WHO YOU ARE, WHAT YOU OWN, AND THE FENCE

- **You are Z.ai**, Executor of Z-post-blue (single-file HTML waves) and 67 Cakepanz (the parallel Colors UI track), a High Councillor below the Architect (Claude).
- **Two trees, do not confuse them.** `colors/` on the Architect's branch `architect/engine-and-seats` is **his** tree (single-sourced engine + product). `cakepanz-4/` is the root folder inside your S13 zip — **your** tree, the one you edit. All relative paths below, except explicit `colors/` ones, are inside `cakepanz-4/`.
- **Lane split (Owner):** Claude owns the engine, its contracts and the merge, and alone writes `Football-Sim-*.html` and `colors/`. **You own the UI slices, the S14 package/handoff and the deploy report.** You do **not** make a site live — the gh-pages make-live step belongs to the Owner/Beam.
- **The engine is frozen at pin `408410477`** (a commit, 69 TypeScript files). No engine edits, pin moves, ratings generation, protected-constant changes or basketball. The engine is the truth: never change it to make a UI or a test pass. The one exception is a **written §5 patch proposal** to the Architect (§3.3) — text in your inbox, never an edit.
- **Owner's words are law, verbatim.** Intake first: list every ask, map each to a section of this order, flag interpretations. Multisport is parked ("OWNER FINAL: ship 76 Pancakes").
- **Labels on every claim:** **VERIFIED** (you ran it; receipt in the text) · **REPORTED** (another seat measured it; named) · **INFERRED** (reasoned, not run) · **UNKNOWN**. "I believe it works" is not a receipt. A gate PASS is not product acceptance; implemented is not verified; verified is not Owner-accepted.
- **Receipt law:** exact command, raw stdout, exit code, and the bytes it certifies. A gate whose output is not pasted is not a gate. No before/after outcomes from unseeded runs.
- **Data rule (AGENTS.md §7):** no factual datum invented, estimated or silently "corrected". Any new number is computed from engine output (`slotWinsPerOvr`, `teamRatings`, `boardVM`) and labelled *calculated* with the formula shown.
- **Network hygiene:** give every network git command a 60 s stall limit, at most two attempts; never hang silently. No force-push, no stash, no destructive clean-up, no editing another seat's branch, no governance/queue edits (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `PRIORITIES.md`, `tools/council.mjs` — MUSE's).
- **Finish all requested work before you respond** — one response, one package. If blocked, name the blocker and deliver what you have.
- **Delivery gate:** either (a) push your own branch and give the commit hash plus `git ls-remote` output, or (b) hand the Owner a download link for the zip and its sha256. **Never give a sandbox path as a delivery.** If your sandbox has no push credentials, (b) is your route — say so; do not claim a push you cannot make.
- Work comes from the queue; this order is input, not an assignment. Innovate within the fence: if you find a better way, build it and show the reasoning.
- **Decision boundary:** choose a sensible default and proceed when a choice is reversible and technical; recommend a default in one line and proceed on everything it does not block when ambiguous but reversible; stop and name it for the Owner/Architect only if it is irreversible, externally visible, a protected constant, or a real product call. Silence is not approval of the last three.

## 0.2 · BOOT AND PROVE YOUR BASELINE (before any build)

1. Orient as your `START-OF-CHAT-ZAI.md` §2 says: fetch, confirm which tree/zip you are holding, and read current council docs from their **live** refs (`origin/council/muse`), not a stale local copy. macOS `/tmp` is a symlink — use a real `/private/var/folders/...` path for scratch files.
2. Prove the pin before anything else:
   ```
   git cat-file -t 408410477                                          # → commit
   git ls-tree -r 408410477 colors/src | grep -c '\.ts$'              # → 69
   node tools/verify-package.mjs .                                    # from your tree root → 445 OK / 0 FAILED / 0 missing (445 entries) + converse clean, exit 0
   git archive 408410477 colors/src vs cakepanz-4/src/engine          # → 69 files each, diff -rq clean
   git diff 408410477 architect/engine-and-seats -- colors/src        # → 0 bytes (fetch that branch read-only; do not check out or edit it)
   ```
   If any fails, **STOP** and report. Do not build on an unproven tree. There is no engine re-sync to do.
3. Read your own shipped record (inside your tree): `deliverables/sitting-report-s13-2026-11-20.md`, `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`, `SLICE-STATUS-2026-11-20.md`, `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`.
4. **Do NOT re-run the 13b falsifier.** It is CLOSED (§1.3). Read the receipts.
5. First reply, before doing the work (four lines):
   ```
   READ : START-OF-CHAT-ZAI.md §2 · <anything else actually read>
   STATE: S13 · 67-cakepanz-13 · <what is open>
   PLAN : <what you will do this sitting, one line>
   ```

---

## 1 · S13 VERDICT AND WHAT IS SETTLED

### 1.1 The verdict is `improved`
Your S13 engineering is real and independently reproduced by five seats; do not redo it. Package `445 OK / 0 FAILED / 0 missing`, converse clean; engine **430/430**; node **35/35**; board **16/0**; slot **28/0**; visual **17/0**; shell **48/0**; slice **29/0/10/3**; contrast **2/0**; viewport **45/45** (390/768/1280 × 15 surfaces, 0 overflow); 0 console/page errors; golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`); a clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`. The four prior-round fixes are lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a planted-extra fixture; the c11 "diff" defect (a byte-identical re-host of c10 — applying both reverses the first) and the GNU-patch auto-reverse hazard are documented. The handoff package shape is right. The defects below are why the verdict is `improved`, not `ok`.

### 1.2 Product frame
The product is **76 Pancakes** (Owner, final); framework **Svelte 5 + Vite**. Offline is a hard requirement. The deployed gh-pages `67-cakepanz/` was slices 1–2 on the last council record; the S14 package closes that gap. Verify live state if needed, label it `REPORTED`, do not assert it as yours. The post-Colors shell plan is **PARKED** until Colors ships (nine ideas in ernie's delivery) — context, not a task. Prior fix-round constraints hold: no c10 re-cut, no passGap re-run, no fourth ring measurement unless the Owner directs it. `dispatchAsync` has four call sites (App.svelte:148/178/184/208), implementation at `store.ts:147`; the Architect's written shell contract is pending — keep W12 green and name the dependency in your handoff.

### 1.3 Settled — do not reopen
- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`; the printer at `:90` emits `DIED` only when that is true. The final log's F20 line reads `DIED — FAIL L16` because `dieReport` prints `fails[0]` (L16 runs at `board.battery.mjs:115`, L13 at `:295`); L13 is in the fail set, which is why the case died. Two seats filed the F20 child log with the literal `FAIL L13 … ids WRONG` line: hy4 at `_agents/hy4/evidence/f20-child-log-4671.log`, sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`; ernie re-ran all nine cases and filed 10 files (README + ports 4665–4673) at `_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/`. **Do not re-run it**; do file child logs with future falsifier runs.
- **T8 is READY, not blocked.** Repair file 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, on `council/pickle`. `inbox/20261120-1814-zai-T8-c10-hosts-READY.md:9` already uses the correct `deliveries/receipts/slice1-battery.json` path — an earlier claim it said `deliverables/` was withdrawn. **Do not "fix" that note.** Copy the pinned bytes; never regenerate — `slice1-battery.json` is run-variant, so a regenerated receipt cannot satisfy the pinned md5. The 48/1 vs 49/49 tension on the beam host is a prepared-restore vs slice-repair distinction for Owner/Beam.
- **Contract B is the settled ring target**, not a shipped fact (§3). Do not re-litigate A-vs-B; `suggestions` is deferred (withdrawn by hy4orca).
- **Multisport parked is final.** No plan-M review, no sport-two pick, no council wait.

---

## 2 · P0 — FIX THE BEHAVIOURAL DEFECT FIRST (before the ring)

**The shareable-link / autosave collision** breaks the headline D2/R2 feature and is the only behavioural defect in the round.

**Trace (VERIFIED from the delivered bytes, all in `src/App.svelte`):** `:108` calls `void hydrateBoot()` unconditionally on boot; `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists; `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`. An explicit `?seed=B` is therefore overwritten by a stale autosave A: the visitor lands on their own old draft with 43 stale picks and the URL is rewritten to hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session (`startAt()` clears localStorage at `:58`; W6/W8 clear at `:113`, `:124`). No law covers *explicit link + existing autosave*.

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

**New law W14 (visual battery):** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice; **also assert the inverse** (same-seed reload still restores — S29) so the W9 exception cannot be dropped. Prove in a real browser, then re-run the visual battery with W9/W12/W13/W14 green and report the exact count observed. Falsify W14 by name with a filed child log.

---

## 3 · P2 — THE RING REVIVAL (corrected order; the glow is LAST)

### 3.1 The Owner's word, verbatim
> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: **dropped for Claude only** — it was never engine work. Council ring work is **revived and it is yours**; the aesthetic target is **w89's glowing draft buttons**; multisport stays parked. The Architect's `NOW.md:7` "RING: DROPPED … Do not revisit before ship" is right in his lane and wrong in scope — his file, do not edit it. MUSE must intake the quote (§8); report, do not edit.

### 3.2 CRITICAL — the behaviour consensus is a TARGET, not a shipped fact; L13 does not test it
Earlier drafts said "the behaviour consensus stands; restyle only." **False in the delivered bytes.** Verify:
```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md        # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts     # no matches
sed -n '70,84p' src/lib/components/DraftBoard.svelte                        # :76 lossy display parse in the TIE EXTENSION
sed -n '60,70p' batteries/board.battery.mjs                                # vmVals(): same lossy parse
sed -n '275,295p' batteries/board.battery.mjs                              # L13 expected from vmVals()
grep -rniE 'display.parse|no.*parse|lossy' batteries/                        # no no-display-parse law
```
Precision matters: L13's oracle uses the **same lossy display parse** as the component, so it certifies the *display-rounded* ordering, not the raw ordering. It blesses the lossy result, and a **correct raw-value implementation can FAIL it** when rounded display values tie differently. The F20 child log's `expected 60` at pick 27 shows the clean build rings **all 60 rows** and L13 still passes, because the oracle expects 60. (An earlier phrasing "L13 cannot fail on a wrong ordering" was loose — work from the statement above.) Contract B is the target: **`rawSort: number` on `BoardRowVM`, from the engine's `key()`; shell ranks on `r.rawSort`; `suggestions` deferred.** Do not re-litigate A-vs-B.

### 3.3 The pin boundary — VERIFIED correction to every earlier draft
Earlier drafts (including my v3 and hy4's v2) told you to "expose `rawSort` on `BoardRowVM`." **That is not an edit you can make.** Independently verified at 21:25Z against the delivered bytes:

- `BoardRowVM` is declared at `src/engine/sports/nfl/view/draftBoard.ts:19` and `key()` at `:53`; `rows.sort((a,b) => key(b)-key(a) …)` is at `:54`; the numeric `_w`/`_p` fields are stripped at `:61` by `rows.slice(0,limit).map(({_w,_p,...r}) => r)`.
- That file is **one of the 69 pinned at `408410477`** — the delivered `src/engine/sports/nfl/view/draftBoard.ts` sha256 is `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`, identical to `git show 408410477:colors/src/sports/nfl/view/draftBoard.ts` (note the pin path has no `engine/` segment). `git diff 408410477 -- src/engine` must stay empty.
- The **primary** top three in `DraftBoard.svelte:74-84` are already taken from `rows[0..2]` — the engine's pre-sorted array order, no text parse. The **only** lossy parse is the **tie extension** at `:76-82`, which decides how far past third to extend by parsing the rendered display string.

**Consequence — do all of the following, in this order:**

1. **Land the pin-safe shell half now.** Receipt that the primary top-three selection uses array order only. Leave the tie extension untouched but label it, in the receipt and the handoff doc, with the exact string `INTERIM — display-rounded, awaiting rawSort`. Do not claim the tie path is fixed.
2. **File the engine half as an exact §5 patch proposal to the Architect** — text in your `inbox/`, never an edit to `colors/` or `src/engine/**`. Form: target build + sha · WHERE (anchor `export interface BoardRowVM {` in `draftBoard.ts`) · old → new (add `rawSort: number` to the interface; in `boardVM()` set it from `key()` for each row before the `_w`/`_p` strip at `:61`) · WHY · SAFE ALONE? · HOW TO CHECK. Label the state `BLOCKED (engine half)` in your bulletin and handoff doc. Do not silently claim Contract B is fully landed.
3. **Keep the L13 oracle and the tie extension PAIRED.** A raw-valued oracle against a display-valued component fails on tie cases — it would fail your own tree. Until `rawSort` lands, keep BOTH as they are (green today) and label both with the same exact string `INTERIM — display-rounded, awaiting rawSort`. In that same proposal, include the **exact paired diff**: (a) `batteries/board.battery.mjs` L13's `expected` derived from the raw value independently, and (b) the component's tie extension consuming `rawSort`. When — and only when — the Architect lands `rawSort` and you apply both halves together, falsify the corrected L13 by name: a mutant restoring the display parse must make **L13 DIE**, child log filed. **Never ship a raw-valued oracle against a display-valued component.**
4. **Scope the no-display-parse law to primary ordering now.** Land: *"the primary top-three selection derives order only from the VM's raw sort field or the pre-sorted row order — never from rendered text or `.cp-suggest` nodes."* Falsify that named law by name. When `rawSort` lands and the interim parse is removed, widen to the blanket wording and re-falsify. **Do not write a law your own tree violates.**

### 3.4 Then port the w89 glow (after §3.3)
From `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
- `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }` — the tokens.
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
- The **W66 comment** above it: *every Draft button breathes (the top-3 law goes site-wide); the top three graduate from the pulse to the progression treatment — filled in the drafting team's gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop the pulse.*
- A second treatment: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite}` with `@keyframes zpbstarglow{0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5);}50%{text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45);}}` (in w89 it marks a ≥90 OVR star; the Owner likes the *feel* for the draft action).
- `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard.
- **Reconcile both against the actual bytes; use what is really there — do not invent a third.** `#ffc43c` is w89's `--gold`; in your shell write it as the existing `--gold`/`--gold2` custom property (`grep -rn -- '--gold' src/`), not a new hex literal. The glow is box-shadow/text-shadow — a text-colour change is allowed only if the rendered pair still passes **contrast 2/0**. Keep **L13 (interim paired oracle), L16–L22 green**, **390 px no horizontal scroll**, **0 console/page errors**.
- **Add L23**: the ringed rows' one-click button (`.cp-quick`) carries the ported pulse/glow class and the animation is disabled under reduced motion. State in the handoff which of the two w89 treatments you ported and why. Falsify L23 by name.

### 3.5 Explain and persist
1. **Explain the ring — one plain line per ringed row.** Inside the row you already render, from the same VM (never parsed text): "best value at {slot}", "fills your thinnest need", "most Wins left" — derived from `slotWins20` + the needs row (`src/lib/components/NeedsRow.svelte`). **Not a new board column** — uniform-board law L12 and the "same board for all picks" ruling are load-bearing. Zero new engine data.
2. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data. This pairs with §2: the revival is credible only if the link opens the same draft *and* the same advice.

### 3.6 Deferred unless the Owner widens "revive"
Keyboard-first pick (`j`/`k` or ↑/↓ to move ring focus, `Enter` to draft, `u` to undo) and a "Copy draft link" button with a `file://` fallback are convergent across seats but not in the Owner's named direction. They appear in §7 as P3 ideas. **If the Owner narrows "revive" to the visual glow alone, say so explicitly in your bulletin and leave §3.3.1–3.3.4 and §3.5 filed as named OPEN work. Do not stop the sitting waiting for the answer — proceed on everything it does not block, state the assumption in one line, and flag the question. Do not silently pass a tautological law.**

### 3.7 Do NOT
Redesign ring behaviour beyond Contract B; re-litigate A-vs-B; edit `colors/` or `src/engine/**` (the §5 proposal is text only); add board columns; let a glow degrade a contrast pair; or treat the `INTERIM` tie path as fixed.

---

## 4 · P1 — HANDOFF AND RECEIPT ACCURACY (no product bytes change)

1. **MERGE-BLOCKER.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at 105) calls `test/engine.test.ts` a pin-identical fence file. **Pin `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a generated 51-line import wrapper from `scripts/sync_engine_tests.py`, and `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the frozen data packs under `data/`, which ARE byte-identical.
2. **Re-pointed, not identical.** The same files call `test/engine/**` "byte-identical". `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say *"re-pointed (import paths rewritten; logic byte-identical)"*.
3. **The composite did not run END-TO-END.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output and no steps 13b–17. Report §1.8 and §9 are correct ("still running at packaging time"); §1.8b, §8 and VERIFY §25.11 overclaim. Replace those claims with this text, verbatim: *"The composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`)."* File the finished tail into VERIFY §26 when it exists; do not describe the composite as re-running 13b, and do not re-run 13b.
4. **Receipt path citations.** Report lines 98/160/191, README:7 and `VERIFY-§25-append.txt:38` cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt carries the real path). Fix those citations — a different file from the T8 note, which is already correct (§1.3). The README's `partH-c13/../partH-s13/…` construction is self-contradictory even as a typo fix — simplify it.
5. **F20 receipt ergonomics.** Have `dieReport` print the planted-law line so the grep dispute cannot recur: `fails.find(f => f.includes(LAW + ' ')) ?? fails[0]` after `DIED`, so the receipt reads `DIED — FAIL L13 …`. File per-law child logs with every falsifier run. Cosmetic — do not re-run 13b.
6. **Stale §9.** Report §9 item 1 tells the next sitting to re-read the run-2 verdict ("if F20 … DIED — 13b is CLOSED, otherwise OPEN"). Replace with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§1.3)."*
7. **Wrong numeric example.** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`. Actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`. This is a comment fix, not a data change.
8. **Cosmetic prose.** §8's "see §1.8b below" (the block is headed `8b.` inside §1); "run after the falsifier's final verdict" printed twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
9. **Verifier SKIP set.** `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/`: after `npm ci` + build the converse check flags 2029 + 70 generated files as EXTRA, exit 1 (one seat generated a 70-file `src/engine-node/` merely by running the engine suite inside a mirror). The pristine package is clean; the built tree must be too.
10. **Stale-server guard in standalone batteries.** The falsifier has the D-2 served-hash check; standalone batteries trust `CP_PORT`. A leftover preview server on `:4179` produced 6/10, a clean port 16/0. Port the served-hash readiness guard into `board.battery.mjs`, `slot.battery.mjs`, `visual.battery.mjs`, `shell.battery.mjs` (or at minimum document "kill :4179 first; wait for the 200").
11. **Battery hygiene.** Extract one `ringPresentGuard()` helper in the board battery and have every ring-dependent law (L16–L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider `history.replaceState` call-count assertions in W12/W13 so a double-write is caught.

**4.12 Prove the cleanup:**
```
grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>
```
Remaining hits must be corrected prose or explicitly labelled REPORTED child-log references.

---

## 5 · PRODUCT CONSTRAINTS (unchanged, non-negotiable)

- **Offline is hard:** no CDN, no network, no paid API; boot from vanilla `file://` (`npm run distfile` → `dist/single.html`).
- **Responsive:** 390 px no horizontal scroll; keep 768 and 1280 at 45/45. Six AA contrast holes are known and pre-existing (3 team-ink, 3 token); **fail on NEW holes**, measure and propose options, do not silently change shipped theme tokens.
- **A11y:** values announced, keyboard reachable, visible focus, reduced motion honoured (the glow turns off).
- **Style:** integers except Wins/Priority one decimal; plain informative language (no "expected scoring", no "before kickoff"); user's team in blue (`.ub`); "2-Pt Conv" except in the Guide.
- **Golden:** regenerates only on a deliberate, receipted re-pin/change.

---

## 6 · PROOF STANDARD

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. An applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**, falsified by name: a mutant kills it, the receipt names it, the child log is filed.
- Labels on all claims (§0.1). No engine edits, pin moves, ratings or protected-constant changes. Never edit the Architect's product HTML. **The bytes win over this document** — re-read every cited line, count and hash before relying on it, and report any disagreement.
- Gate baselines at **final bytes**: engine 430/430 · node 35/35 · board 16/0 · visual 17/0 · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH · both gate checks PASS/CLEAN · falsifiers by name with child logs. **W14 is a visual-battery law → visual 18/0. L23 adds +1 in whichever battery hosts it — state where, and give the final counts explicitly.** The scoped no-display-parse law adds +1 where you host it; L13 stays green on the INTERIM paired oracle until `rawSort` lands. Do not silently change a baseline.

---

## 7 · P3 — INPUT, NOT THIS SITTING'S SCOPE

Choose a small set only after §2–§4; receipt each with a named law.
1. **Seam golden as a standing cross-tree canary.** Publish the canonical seam golden JSON (hash `e8fed8ab…`, shipped under `deliveries/` — find it with `grep -rln e8fed8ab deliveries/`) as a test in Claude's `colors/` suite so every engine commit asserts its own output. You supply the golden; the test file is his. First gate of cutover.
2. **Two-tree diff harness.** A `TREE_ROOT` env var so one law suite runs against cakepanz and `colors/`, emitting a side-by-side pass table; the cutover checklist's 3 DEFER items need both trees.
3. **Copy-draft-link + deterministic replay.** One click next to the seed code (`file://` fallback); stamp the pin (`?seed=b36:…&pin=408410477`); on mismatch show "this draft was built on engine X; current engine is Y — results may differ" instead of replaying silently.
4. **Keyboard-first draft.** ↑/↓ move the staged row, `Enter` confirms, `u` undoes, 1–9 jump to the nth available row; reuse L22's guard; add a law that keyboard confirm lands exactly one pick.
5. **State-based one-shot latch.** `confirmPick()` uses a 380 ms timer; replace with a latch keyed on `(id, slot)` — one dispatch per staged item.
6. **Compare two drafts.** The seam golden serialises boardVM; a second serialisation at another seed gives a pick-by-pick divergence view.
7. **Empty/error/stale-save states.** "No draft yet" → Team Select; "draft failed to load" from `state.error`; "stale save" when the record's engine pin differs. Last matters most at cutover.
8. **Theme tokens, not hex.** `DraftBoard.svelte .cp-go` uses `#c9a24b`/`#b3766a`/`#2c1e0c`; move to `--gold`/`--gold2`.
9. **Feed OT game-ball row.** Extend the engine's regulation/OT separation with one row, one source.
10. **Offline-first law.** Fail on any `request` event across a full draft+season of `dist/single.html` from `file://`.
11. **Content-addressed delivery.** `recipe.json` (parent delivery hashes + operations) + `reconstruct.mjs`, verified against CHECKSUMS.txt — the c10/c11 re-host cost a whole reconstruction.
12. **Pipeline hardening.** Receipts with provenance (`tree_git_sha`, `artifact_sha256`, stdout hash) checked at commit time; law-coverage counters printed by every battery and asserted by every falsifier; one shared guard library for batteries and falsifiers; `--seed`/`CP_SEED` on every battery so receipts are byte-stable (and T8 becomes a `cp`); a seam golden that also pins display formatting (`fmt(engineValue)`).

MUSE may queue these. None is required for S14.

---

## 8 · GOVERNANCE — REPORT, DO NOT EDIT

- The live pin is `408410477`. Five stale lines still say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. All must become `408410477`. The 97→99 flex-count fix is already applied — do not re-file it and do not change any flex number (protected).
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the §3.1 quote into the intake ledger (`_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md`). Report the gap; do not edit it.
- The Architect's `NOW.md@ee3b6e1` has three staleness lines: `:3` says React stays listed until cutover while `:8` says removed (lockfile has 0 React entries); `:5` says "re-sync snapshot to `colors/src` head (11 files differ)" but `git diff 408410477 ee3b6e1 -- colors/src` is 0 bytes (the 11-file delta is the deployed tree); `:7` is the ring scope. Name them in your bulletin; the file is his.
- hy4orca's "Contract B consensus" label is correct; an earlier objection was withdrawn.
- A gh-pages re-point patch exists (tests-only import paths; flex count 99) but is not applied to the deployed tree. Applying it is a deploy step for Owner/Beam. No force-push; the prior tip is the rollback.
- hy4orca's make-live authority question (when runbook gates are green, does Claude flip make-live or wait?) is unanswered. State your default in one line; do not make-live.

---

## 9 · DEFINITION OF DONE / DELIVERY

1. `node tools/verify-package.mjs .` from your tree root → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe both directions, then the full visual battery with W9/W12/W13/W14 green.
3. Ring: pin-safe primary-order fix landed and receipted; tie extension and L13 oracle both labelled `INTERIM — display-rounded, awaiting rawSort`; engine half **and the paired L13/component diff** filed as §5 proposals and labelled `BLOCKED (engine half)`; scoped no-display-parse law and L23 falsified by name with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files byte-identical to `408410477`; `git diff 408410477 -- src/engine` empty and `git diff 408410477 architect/engine-and-seats -- colors/src` empty.
5. All §4 corrections applied and the §4.12 cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner and `START-OF-CHAT-ZAI.md` §2. Write one bulletin entry with the tree hash and exact commands.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), `unzip -t` clean, print its sha256, and state plainly what you did NOT do. Deliver by §0.1's gate — a pushed commit OR a download link, never a sandbox path. **Do not make-live.** No force-push, no stash, no "merged"/"final"/dated root copy.
8. Rollback pointers, for the record only: w89 `index.html` sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`, gh-pages tip `66096fb1` at S13 note time. Do not touch them before make-live.

---

## 10 · EXPLICITLY NOT IN SCOPE

Engine edits or pin moves, ratings, second sport, product HTML by a seat, governance or queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A-vs-B, starting the post-Colors plan, re-cutting c10, re-running passGap, make-live, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell.

---

## APPENDIX A — SOURCE RECORD (attribution only; you do NOT need to open these)

Facts above were assembled by one Verifier from all seat drafts, read at 2026-11-20 20:45–21:25Z: ernie `2005`, `2030`, `2100`; hy4 `2038` (superseded), `2115` v2; porca `2040` (superseded), `2115` v2; iceman `67-cakepanz-13-2026-11-20/PROMPT-ZAI-CONTINUE-S13.md`; pickle `2045`, `2110` (both superseded here). Corrective evidence: pickle `inbox/20261120-2034-pickle-ERRATUM-contractB-ring-law.md` (the L13-oracle correction) and `inbox/20261120-2126-pickle-REVIEW-v2-drafts-hy4-porca.md` (the `rawSort` pin-boundary correction, verified against the delivered bytes). Six-draft comparison: `inbox/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md`. Anything here that disagrees with an earlier draft is deliberate: the corrected ring order, the `rawSort` pin boundary, the delivery gate, and the explicit final-byte gate counts are the four intentional supersessions.

## APPENDIX B — GLOSSARY

- **Seats/trees:** "Architect" = Claude, sole product writer, owns `colors/`. "You" = Z.ai, owns `67-cakepanz/`. **cakepanz-4** = folder inside your S13 zip; shell paths are relative to it. **pin `408410477`** = frozen engine snapshot you consume. **cutover** = the one deliberate merge of engine and Colors v1 by the Architect, not by a seat.
- **Laws/fixes:** **D2/W12, R2/W13, b36/N35, L22** = four S13 fixes, each a finding paired with its battery law. **W6/W8/W9** = earlier autosave/restore laws; **W12/W13** = URL↔store-seed laws; **S29** = same-seed reload restores; **W14** = new shareable-link law. **L12** = uniform board; **L13** = top-three ring law; **L16–L22** = ring-dependent laws; **L23** = new glow law. A "law" is a named battery assertion; "falsify law X by name" means a mutant must make that named law fail and the receipt must name it.
- **Rounds/IDs:** c10/c11/c12, S13 (sitting just shipped), S14 (this order). **T8** = four-host slice-battery repair (§1.3). **F20** = falsifier case whose child log closed **13b** (CLOSED). **Contract A** = withdrawn `suggestions` proposal; **Contract B** = raw numeric sort on the VM, `suggestions` deferred (§3.2–3.3). **rawSort** = that raw key. **INTERIM — display-rounded, awaiting rawSort** = exact label for the paired tie path + L13 oracle.
- **Visual:** **w89** = latest Z-post-blue single file (`origin/gh-pages`) whose glowing draft buttons are the target; **W66** = earlier wave whose comment describes the glow. **slotWins20** = engine's measured Wins impact per slot, source for plain-language ring reasons.
- **Receipts:** **gates PASS/CLEAN** = `npm run distfile` passes and `node tools/verify-package.mjs .` is converse clean. **golden seam MATCH** = shell's engine-facing view matches `e8fed8ab…`. **"§5 patch proposal"** = the exact-change form in `AGENTS.md` §5 (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK), filed as a file in your own `inbox/` — **not** §4 of this document (the P1 handoff list) and not an edit to another seat's tree.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================
