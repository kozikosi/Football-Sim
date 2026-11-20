SPEAKER: hy4 | ROLE: advisor | TASK: final rewrite of the S14 Z.ai work order from ALL seat updates | DATE: 2026-11-20T21:30Z
FOR: Owner / MUSE to relay to Z.ai. Council prompt input, not accepted scope and not an Owner ruling. No assignment to any seat.
STATUS: **supersedes hy4 `2115` v2**, which superseded `2038`. Built from a fresh read of every newer seat update: pickle `2109` (six-way review), pickle `2110` (v3 self-contained), porca `2115` (v2 self-contained), plus ernie `2100`, porca `2040`, my own `2115` v2, and the earlier drafts those absorbed. **Self-contained: Z.ai is assumed to have read none of them.**

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** It is self-contained: it does not assume you have read any other seat's draft, review, erratum or this round's chat. Every fact, command, replacement text and decision is stated here. Source attribution is in Appendix A — you do NOT need to open those files. **The bytes win over this document:** re-read every cited line, count and hash before relying on it; if a number here disagrees with the file, the file wins, and you say so in your bulletin. Where two passages seem to conflict, the more specific and later one wins; if they cannot be reconciled, stop and ask rather than quietly picking one. A step that depends on something you cannot see is not a step — name what is missing.

## 0 · The sitting in one page

| # | Work | Done when |
|---|---|---|
| 1 | Prove the baseline (§2) | verifier 445 OK / converse clean; 69/69 engine files byte-identical to `408410477`; engine diff to Claude's head 0 bytes. STOP if any fails. |
| 2 | **P0** — shareable-link/autosave collision (§4) | real-browser W14 probe both directions; visual battery green with W9/W12/W13/W14; W14 falsified by name, child log filed. |
| 3 | **Ring** — shell half + engine proposal, paired oracle, scoped law, glow last, L23, explain, persist (§5) | each new law falsified by name with child log; L13/L16–L22/L23 green on the *interim paired* oracle; contrast 2/0; 390 px clean; 0 console/page errors; no engine file edited. |
| 4 | **P1** handoff/receipt accuracy, no product bytes (§6) | the §6 cleanup grep shows only corrected prose. |
| 5 | Docs, zip, delivery (§11) | full gate set at final bytes; zip sha256 printed; delivered by §0.6's gate; state what you did NOT do. |

P0 is fixed before the ring. The glow is **last**, not first (§5.3).

## 1 · Who you are, the fence, and the delivery reality

1. **You are Z.ai**, Executor of Z-post-blue and 67 Cakepanz, a High Councillor below the Architect (Claude). Your tree is `cakepanz-4/` (the root folder inside the S13 zip). `colors/` on `architect/engine-and-seats` is Claude's tree — read it read-only; never check it out or edit it.
2. **Lane split (Owner):** Claude owns the engine, its contracts and the merge; he alone writes `Football-Sim-*.html` and `colors/`. You own the UI slices, the package and the handoff. You do **not** make a site live — that is the Owner/Beam's step. Multisport is parked: "OWNER FINAL: ship 76 Pancakes" stands.
3. **The engine is frozen at pin `408410477`** (a commit; 69 TypeScript files, byte-identical across cakepanz and Claude's head). No engine edits, pin moves, ratings, protected-constant changes, or basketball. The engine is the truth: never change it to make a UI or a test pass. **The one exception in this order is a text proposal in your own inbox (§5.3), never an edit.**
4. **Owner's words are law, verbatim.** Intake first: list every ask, map each to a section of this order, flag interpretations. Where the Owner has not made a call, this document says so — state your default in one line and proceed on everything it does not block; silence is not approval.
5. **Labels on every claim:** **VERIFIED** (you ran it; receipt in the text) · **REPORTED** (another seat measured it; named) · **INFERRED** (reasoned, not run) · **UNKNOWN**. "I believe it works" is not a receipt. A gate PASS is not product acceptance; implemented is not verified; verified is not Owner-accepted. The state ladder is `proposed → accepted → implemented → verified → Owner-accepted`.
6. **Receipt law:** every claim carries the exact command, raw stdout tail, exit code, and the bytes it certifies. No before/after numbers from unseeded runs.
7. **Data rule (AGENTS.md §7):** no factual datum invented, estimated or silently corrected. Any new number is computed from engine output (`slotWins20`, `teamRatings`, `boardVM`) and labelled *calculated*, with the formula shown.
8. **Delivery gate:** either (a) push `council/zai` and give the commit hash plus `git ls-remote` output, **or** (b) hand the Owner a download link for the zip plus its sha256. **A sandbox path alone is not delivery.** If your sandbox has no push credentials, (b) is your route — say so; never claim a push you cannot make. `unzip -t` must be clean.
9. **Network hygiene:** give every network git command a 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most two attempts; if it still fails, commit locally and give the exact numbered steps instead of hanging. No force-push, no stash, no destructive clean-up, no editing another seat's branch or a governance file.
10. **Finish all requested work before you respond** — one response, one package. First reply, before the work (four lines):
    ```
    READ : START-OF-CHAT-ZAI.md §2 · <anything else actually read>
    STATE: S13 · 67-cakepanz-13 · <what is open>
    PLAN : <what you will do this sitting, one line>
    ```
11. Work comes from the queue; this order is input, not an assignment to a named seat. Innovate within the fence: if you find a better way, build it and show the reasoning.

## 2 · Boot and prove the baseline (before any build)

1. Orient as your `START-OF-CHAT-ZAI.md` §2 says (it ships in your tree). macOS `/tmp` is a symlink — use a real `/private/var/folders/...` path for scratch files.
2. Prove the pin before anything else:
   ```
   git cat-file -t 408410477                                 # → commit
   git ls-tree -r 408410477 colors/src | grep -c '\.ts$'     # → 69
   node tools/verify-package.mjs .                           # → 445 OK / 0 FAILED / 0 missing (445 entries) + converse clean, exit 0
   git archive 408410477 colors/src vs your src/engine        # → 69 files each, diff -rq clean
   git diff 408410477 architect/engine-and-seats -- colors/src # → 0 bytes (NO engine re-sync to do)
   ```
   If any fails, STOP and report. Do not build on an unproven tree.
3. Read your own shipped record (all inside your tree): `deliverables/sitting-report-s13-2026-11-20.md`, `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`, `deliverables/SLICE-STATUS-2026-11-20.md`, `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`.
4. **Do NOT re-run the 13b falsifier.** It is CLOSED (§3.3). Read the receipts.

## 3 · S13 verdict and settled facts

### 3.1 Verdict: `improved`
Your S13 engineering is real and independently reproduced by five seats; do not redo it. Package `445 OK / 0 FAILED / 0 missing`, converse clean; engine **430/430** · node **35/35** · board **16/0** · slot **28/0** · visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/45** (390/768/1280 × 15 surfaces, 0 overflow) · 0 console/page errors; golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`); a clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`. The four prior-round fixes are real and lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a planted-extra fixture; the c11 "diff" re-host defect (a byte-identical re-host of c10 — applying both makes GNU patch reverse the first) and its reconstruction recipe are documented. The handoff package shape is right. The remaining defects are one behavioural bug, receipt-accuracy defects and a ring correctness gap.

### 3.2 What to treat as established
- The deployed gh-pages `67-cakepanz/` carried an earlier slice set at the last council record; the S14 package closes the gap. Verify live state if needed, label it REPORTED, do not assert it as a fact you own.
- `dispatchAsync` has four call sites (App.svelte:148/178/184/208), implementation at `store.ts:147`. The Architect's written shell contract is pending; keep W12 passing and name the dependency.
- The post-Colors shell plan is **PARKED** until Colors ships. No c10 re-cut, no passGap re-run, no fourth ring measurement unless the Owner directs it.
- Prior fix-round constraints hold; flex is protected — do not change any flex number.

### 3.3 Settled — do not reopen
- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`; printer `:90` emits `DIED` only when true. The final log's F20 line prints `DIED — FAIL L16` only because `dieReport` prints `fails[0]` (L16 at `board.battery.mjs:115`, L13 at `:295`). Two seats filed the F20 child log with the literal `FAIL L13 … ids WRONG` line: `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`) and `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (README + ports 4665–4673). Do not re-run it; do file child logs with future falsifier runs.
- **T8 is READY, not blocked.** Repair file 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`. The note `inbox/20261120-1814-zai-T8-c10-hosts-READY.md:9` already uses the correct `deliveries/receipts/slice1-battery.json` path — an earlier "deliverables/" claim was withdrawn. **Do not "fix" that note.** Copy the pinned bytes; never regenerate (`slice1-battery.json` is run-variant). The 48/1 vs 49/49 tension on one host is a prepared-restore vs slice-repair distinction for Owner/Beam.
- **Contract B is the settled ring target** — do not re-litigate A vs B. What was wrong was the claim it had already shipped (§5.2). Multisport parked is final.

## 4 · P0 — fix the shareable-link / autosave collision first

The **only behavioural defect** in the round; it breaks the headline D2/R2 feature. Confirmed from the bytes by four seats.

**Trace (all in `src/App.svelte`):** `:108` calls `void hydrateBoot()` unconditionally on boot; `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists; `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`. So an explicit `?seed=B` is silently overwritten by stale autosave A: the visitor lands on their own old draft with 43 stale picks and the URL is rewritten to hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session (`startAt()` clears localStorage at `:58`; W6/W8 clear at `:113`, `:124`). No law covers *explicit link + existing autosave*.

**Browser proof (real Chromium on the delivered bytes):** autosave at `a3f2` (seed `470990`, one pick); `page.goto('?dev=1&seed=k1x9')` in the same context → `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, 0 page errors — `RESULT: DEFECT`. Correct seed `k1x9` = `935613`. After the fix on a temporary extract: `{"seed":null,"url":"k1x9","screen":"team"}` → START → `finalSeed=935613`, `errs=[]`, PASS. The fix was never applied to your tree.

**Required behaviour:** explicit link wins over a *different* autosave; same-seed reload still restores (W9); plain reload restores (S29); visible notice that the local save was left untouched.

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
The **same-seed exception is load-bearing**: the naive `if (has('seed')) return;` breaks W9 (measured 16 pass / 1 fail). Do not substitute it.

**New law W14 (visual battery):** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice; **also assert the inverse** (same-seed reload still restores, S29) so the W9 exception cannot be dropped. Prove in a real browser; re-run the visual battery with W9/W12/W13/W14 green; falsify W14 by name with a filed child log.

## 5 · P2 — the ring revival (corrected, with the pin boundary)

### 5.1 The Owner's word, verbatim
> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: dropped **for Claude only** — the ring was never engine work. Council ring work is **revived and it is yours**. Visual target: **w89's glowing draft buttons**. Multisport stays parked. Claude's `NOW.md` "RING: DROPPED … Do not revisit before ship" is right in his lane and wrong in scope — his file, report it, do not edit it.

### 5.2 CRITICAL — Contract B is a target, not shipped; L13 does not test it
Earlier drafts said "ring behaviour is settled; restyle only." **False in the delivered bytes.** Re-check:
```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md        # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts     # no matches
sed -n '50,58p' src/engine/sports/nfl/view/draftBoard.ts                    # key() :53; rows.sort by raw key :54
sed -n '61p' src/engine/sports/nfl/view/draftBoard.ts                       # rows.slice(...).map(({_w,_p,...r})=>r) — raw values STRIPPED
grep -n "replace(/[^0-9" src/lib/components/DraftBoard.svelte               # :76 lossy display parse
grep -n "cp-suggest\|cp-quick" src/lib/components/BoardRow.svelte           # current affordance
sed -n '60,70p;275,295p' batteries/board.battery.mjs                        # vmVals(): same parse; L13 expected from it
grep -rniE "display.parse|no.*parse|lossy" batteries/                        # no no-display-parse law
```
**L13's oracle uses the same lossy display parse as the component.** It certifies the *display-rounded* ordering, not raw ordering. The F20 child log's `expected 60` at pick 27 shows the clean build can ring all 60 rows and still pass, because the oracle expects 60. A *correct* raw-value implementation can FAIL L13 when rounded display values tie differently. The law must change **together with** the component.

### 5.3 THE PIN BOUNDARY — the one place the earlier drafts contradicted the bytes
`BoardRowVM` is defined at `src/engine/sports/nfl/view/draftBoard.ts:19`, and `key()` at `:53` — both inside a **frozen engine file** (one of the 69 pinned at `408410477`; `git diff 408410477 -- src/engine` must stay empty). You therefore **cannot add `rawSort` to `BoardRowVM` yourself**. The engine already sorts rows by raw `key()` at `:54` and returns them in that order, but strips `_w`/`_p` at `:61`, so the shell receives correct *order* but no raw *values*. Two coupled actions follow — do both:

- **Engine half — proposal only (BLOCKED on the Architect).** File an exact §5 patch proposal in your own inbox/WHERE anchor `export interface BoardRowVM {` in `draftBoard.ts`, old → new (add `rawSort: number` to the interface; in `boardVM()` set it from `key()` per row before the strip at `:61`), WHY, SAFE ALONE?, HOW TO CHECK. **Do not edit `colors/` or `src/engine/**`.** Label Contract B's engine half `BLOCKED (engine half)` in your bulletin and handoff doc. Include in the same proposal the **exact paired diff** for (a) `batteries/board.battery.mjs` L13's `expected` to derive from the raw value independently, and (b) the component's tie extension to consume `rawSort`. **Never ship a raw-valued oracle against a display-valued component** — that mismatch makes L13 fail on tie cases.
- **Shell half — do now, pin-safe.** The primary top three can be selected **by array position** in the already-sorted `rows` with no text parse at all: that is a complete fix you can land now. The **tie extension past three** genuinely needs the raw value; until `rawSort` lands, leave the tie parse unchanged but label it and L13 with the exact string `INTERIM — display-rounded, awaiting rawSort` in the receipt and handoff doc. Do not claim the tie path is fixed before `rawSort` exists.

### 5.4 Do this in this order
1. Land the shell half (§5.3) and file the engine half + paired L13/component diff as a proposal; label the engine half BLOCKED.
2. Keep L13's oracle and the component's tie path **paired in the same commit** (both interim, both labelled). When — and only when — the Architect lands `rawSort` and you apply both halves together, falsify the corrected L13 by name: a mutant restoring the display parse must make **L13 DIE**, child log filed.
3. Add the **no-display-parse law scoped to primary ordering now**: "the primary top-three selection derives order only from the VM's raw sort field or the pre-sorted row order — never from rendered text or `.cp-suggest` nodes." A blanket law would fail your own interim tie path. Falsify the scoped law by name; widen it when `rawSort` lands and re-falsify.
4. **Then port the w89 glow.** Verified from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
   - `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }`
   - `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
   - `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
   - W66 comment: every Draft button breathes; the top three graduate to the drafting team's gradient + sheen sweep, as PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop the pulse.
   - A second treatment exists: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite}` with text-shadow keyframes. `#ffc43c` is exactly w89's `--gold` token; in your shell use the existing `--gold`/`--gold2` custom property (locate with `grep -rn -- '--gold' src/`), not a new hex literal. Reconcile both against the actual bytes; do not invent a third.
   - `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — add the same guard for the pulse.
   - Keep L13 (interim paired oracle), L16–L22 green; **contrast 2/0** (re-run it after porting); **390 px no horizontal scroll**; **0 console/page errors**.
5. Add **L23**: the ringed rows' one-click button carries the glow class and the animation is disabled under reduced motion. Falsify by name.
6. **Explain the ring — one plain line per ringed row** inside the row you already render (not a new column — L12 and "same board for all picks" hold): "best value at {slot}", "fills your thinnest need", "most Wins left", from `slotWins20` + the `NeedsRow` (`src/lib/components/NeedsRow.svelte`). Zero new engine data; never parse display text or `.cp-suggest` nodes.
7. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data. This pairs with §4: the revival is credible only if the link opens the same draft *and* the same advice.

### 5.5 Deferred / do not
Keyboard-first pick and "Copy draft link" with a `file://` fallback are convergent but not in the Owner's named direction (they appear in §8). If the Owner narrows "revive" to the visual glow alone, say so in your bulletin and leave §5.4.1–5.4.3 filed as named OPEN work — **do not silently pass a tautological law.** Do not redesign behaviour beyond Contract B, re-litigate A-vs-B, add board columns, let a glow degrade contrast, or edit `colors/`/`src/engine/**` (the proposal in §5.3 is text only).

## 6 · P1 — handoff, receipt and tooling accuracy (no product bytes change)

1. **MERGE-BLOCKER.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at 105) calls `test/engine.test.ts` a pin-identical fence file. Pin `408410477` has **no** `colors/test/engine.test.ts` — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a 51-line generated wrapper from `scripts/sync_engine_tests.py`; `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the frozen data packs.
2. `test/engine/**` is called "identical"; `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say "re-pointed (import paths rewritten; logic byte-identical)".
3. **Composite overclaim.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output; steps 13b–17 are absent. Replace §1.8b/§8/VERIFY §25.11's END-TO-END claim with this verbatim text: *"The composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`)."* File the finished tail into VERIFY §26 when it exists; do not describe the composite as re-running 13b, and do not re-run 13b.
4. **Receipt paths.** Report lines 98/160/191, README:7 and `VERIFY-§25-append.txt:38` cite `deliverables/receipts/partH-s13/…`; the tree has only `deliveries/receipts/…`. Fix those. The README's `partH-c13/../partH-s13/…` construction is self-contradictory — simplify it. Do not touch the correct T8 note.
5. **F20 receipt ergonomics.** Optionally make `dieReport` print the planted-law line: `fails.find(f => f.includes(LAW + ' ')) ?? fails[0]` after `DIED`, so it reads `DIED — FAIL L13 …`. File per-law child logs with every falsifier run. Cosmetic — do not re-run 13b.
6. **Stale §9.** Replace item 1 with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§5.2)."*
7. `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`; actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`.
8. Cosmetic prose: §8's "see §1.8b below" (block headed `8b.` inside §1); "run after the falsifier's final verdict" twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
9. `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/`: after `npm ci` + build, the converse check flags generated files as EXTRA, exit 1. The pristine package is clean; the built tree must be too.
10. The falsifier has the D-2 served-hash check; standalone batteries trust `CP_PORT` (a stale `:4179` gave 6/10, a clean port 16/0). Port the polled-200 + served-index-hash guard into `board.battery.mjs`, `slot.battery.mjs`, `visual.battery.mjs`, `shell.battery.mjs` (or at minimum document "kill :4179 first; wait for the 200").
11. Battery hygiene: extract one `ringPresentGuard()` helper and have every ring-dependent law (L16–L19, L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider `history.replaceState` call-count assertions in W12/W13.

Prove the cleanup:
```
grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>
```
Remaining hits must be corrected prose or explicitly labelled REPORTED child-log references.

## 7 · Product constraints (non-negotiable)
- **Offline is hard:** no CDN, no network, no paid API; boot from vanilla `file://` (`npm run distfile` → `dist/single.html`).
- **Responsive:** 390 px no horizontal scroll; keep 768 and 1280 at 45/45.
- **A11y:** values announced, keyboard reachable, visible focus, reduced motion honoured (the glow turns off). Six AA contrast holes are known and pre-existing (3 team-ink, 3 token); **fail on NEW holes**; measure and propose options, do not silently change shipped theme tokens.
- **Style:** integers except Wins/Priority one decimal; plain informative language (no "expected scoring", no "before kickoff"); user's team in blue (`.ub`); "2-Pt Conv" except in the Guide.
- **Golden:** regenerates only on a deliberate, receipted re-pin/change.

## 8 · Innovation — input, not this sitting's scope
Choose a small set after §4–§6; receipt each with a named law. Ranked: (1) seam golden as a standing cross-tree canary in Claude's `colors/` suite (you supply the golden whose hash is `e8fed8ab…`, in your tree under `deliveries/`); (2) two-tree diff harness (`TREE_ROOT` env var, side-by-side table); (3) copy-draft-link with a pin stamp (`?seed=b36:…&pin=408410477`) and a visible "built on engine X; current engine Y" mismatch warning; (4) keyboard-first draft (↑/↓, Enter, u, 1–9) reusing L22's guard; (5) state-based one-shot latch keyed on `(id, slot)` replacing the 380 ms `confirmPick()` timer; (6) compare-two-drafts from the seam golden; (7) empty/error/stale-save states; (8) theme tokens, not hex (`DraftBoard.svelte .cp-go` uses `#c9a24b`/`#b3766a`/`#2c1e0c`); (9) feed OT game-ball row — one row, one source; (10) offline-first law failing on any `request` event across a full draft+season from `file://`; (11) content-addressed delivery (`recipe.json` + `reconstruct.mjs` verified against CHECKSUMS.txt). MUSE may queue these; do not execute them unless the Owner widens the ask.

## 9 · Proof standard and gate counts
- Every change: **target build + sha256 · WHERE (anchor string, not a line) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. An applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**, falsified by name: a mutant kills it, the receipt names it, the child log is filed.
- Labels on all claims (§1.5). No engine edits, pin moves, ratings or protected-constant changes. Never edit the Architect's product HTML. The bytes win over this document (re-read every number).
- Gate baselines at **final bytes**: engine 430/430 · node 35/35 (+W14) · board 16/0 (+ scoped no-display-parse law and L23; L13 green on the interim paired oracle, corrected paired version filed as a proposal) · visual 17 existing + W14 (**state the exact count you observe, e.g. 18/0**) · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH · both gate checks PASS/CLEAN · falsifiers by name with child logs. Do not silently change a baseline.

## 10 · Governance — report, do not edit
- Live pin `408410477`. Five stale lines say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. The 97→99 flex-count fix is already applied — do not re-file it and do not change any flex number (protected).
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the §5.1 quote into the ledger. Report the gap; do not edit it.
- The Architect's `NOW.md` (`architect/engine-and-seats:NOW.md`) has three staleness lines: React "stay listed until cutover" vs "removed"; "re-sync snapshot to colors/src head" while the diff is 0 bytes; and the ring scope. Name them in your bulletin; that file is his.
- A gh-pages re-point patch (tests-only import paths) exists but is not applied; applying it is a deploy step for Owner/Beam. Do not force-push; the prior tip is the rollback.
- **OPEN, not yours to decide:** make-live authority (when the runbook gates are green, does Claude flip make-live or wait?) and the exact scope of "revive". State your default in one line and proceed; flag both in your bulletin.

## 11 · Definition of done / delivery
1. `node tools/verify-package.mjs .` from your tree root → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe both directions, then the visual battery with W9/W12/W13/W14 green.
3. P2: shell half landed with the pin-safe primary fix; tie path and L13 oracle labelled `INTERIM — display-rounded, awaiting rawSort` and left paired; engine half + paired corrected diff filed as a proposal and labelled BLOCKED; scoped no-display-parse law and L23 falsified by name with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files byte-identical to `408410477`; `git diff 408410477 -- src/engine` empty, and `git diff 408410477 architect/engine-and-seats -- colors/src` empty.
5. §6 corrections applied and the cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner and `START-OF-CHAT-ZAI.md` §2. One bulletin entry with the tree hash and exact commands.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), `unzip -t` clean, sha256 printed. **Deliver by §1.8:** a download link (and sha), or a pushed commit hash plus `git ls-remote` if you have credentials — never a sandbox path. **Do not make-live** — Owner/Beam execute that step. Rollback pointers, record only: w89 `index.html` sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`; gh-pages tip `66096fb1` at S13 note time. Do not touch them before make-live.
8. State plainly what you did NOT do.

## 12 · Decision boundary / explicitly not in scope
Choose a sensible default and proceed when a choice is reversible and technical. Recommend a default in one line and proceed on everything it does not block when ambiguous. Stop and name it for the Owner/Architect only if it is irreversible, externally visible, a protected constant, or a real product call. Silence is not approval of the last three.
**Out of scope:** engine edits, pin moves, ratings, second sport, seat-authored product HTML, governance/queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A-vs-B, make-live, the post-Colors plan (parked), c10 re-cut, passGap re-run, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell.

## 13 · Glossary (so this document needs no other source)
- **Trees/seats:** "Architect" = Claude, sole product writer, owner of `colors/`. "You" = Z.ai, owner of the `67-cakepanz/` shell. **cakepanz-4** = the folder inside your S13 zip; shell paths are relative to it. **pin `408410477`** = the frozen engine snapshot. **cutover** = the one deliberate merge of Claude's engine tree and completed Colors v1, done by the Architect; not by a seat.
- **Laws/reviews:** **D2/W12, R2/W13, b36/N35, L22** = the four fixes shipped in S13 (review finding paired with its battery law); **W6/W8/W9** = earlier autosave/restore laws; **W12/W13** = URL↔store-seed laws; **W14** = new shareable-link law; **S29** = existing same-seed reload restores; **L12** = uniform-board law; **L13** = top-three ring law; **L16–L22** = existing ring-dependent laws; **L23** = new glow law. A "law" is a named battery assertion; "falsify law X by name" means a mutant makes that named law fail and the receipt names it.
- **Rounds/IDs:** c10/c11/c12/S13/S14 = successive review rounds and sitting numbers (S13 = just shipped; S14 = this order). **T8** = the four-host slice-battery repair. **F20** = the falsifier case whose child log closed **13b** (the board-falsifier dispute, CLOSED).
- **Ring terms:** **Contract A** = withdrawn proposal adding a `suggestions` field; **Contract B** = agreed target (raw numeric sort on the VM, `suggestions` deferred); **rawSort** = that key. **W89** = latest Z-post-blue build whose glowing draft buttons are the visual target; **W66** = earlier wave whose comment describes the glow. **slotWins20** = engine's measured Wins impact per slot (source for plain-language ring reasons). **INTERIM — display-rounded, awaiting rawSort** = the exact label for the paired tie path/oracle until the engine half lands.
- **Receipts:** **gates PASS/CLEAN** = `npm run distfile` passes and `node tools/verify-package.mjs .` is converse clean; **golden seam MATCH** = the shell's engine-facing view matches `e8fed8ab…`. **"§5 patch proposal"** = the exact-change form in `AGENTS.md` §5 of the council rules (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK), filed as a file in your own `inbox/` — not §6 of this document and not an edit to another seat's tree.

## APPENDIX A — source record (attribution only; do NOT need to open these)
Facts above were assembled from every seat's S14 draft, read 2026-11-20 20:30–21:25Z: ernie `2005`/`2030`/`2100`; pickle `2034`/`2041`/`2042`/`2045`/`2109`/`2110`; porca `2040`/`2115`; hy4 `2038`/`2115`; iceman `PROMPT-ZAI-CONTINUE-S13.md`. Six-way comparison: pickle `2109`. Intentional supersessions of earlier drafts: the corrected ring order, the pin-boundary/paired-oracle split, the delivery gate, and the final-byte gate counts. Anything here that disagrees with an earlier draft is deliberate.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— hy4 (advisor). Rewritten from every seat update after reviewing them this sitting; the pin-boundary correction and paired-oracle rule are independently re-verified against the S13 bytes. No product, engine, pin, governance or other seat's file was edited.
