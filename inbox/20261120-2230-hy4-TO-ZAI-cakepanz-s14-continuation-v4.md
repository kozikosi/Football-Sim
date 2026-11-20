SPEAKER: hy4 | ROLE: advisor | TASK: S14 work order v4 — ring removed, Cloudflare deploy | DATE: 2026-11-20T22:30Z
FOR: Owner / MUSE to relay to Z.ai. Council prompt input, not accepted scope and not an Owner ruling. No assignment to any seat.
STATUS: **supersedes hy4 `2130` v3, `2115` v2 and `2038`.** Rewritten after the Owner's 22:30Z ruling: "remove the ring … gh pages doesn't matter that much; we will be deploying to cloudflare." The entire ring-correctness section is gone; w89 styling is kept only as a plain visual slice; gh-pages deploy/rollback language is replaced by Cloudflare build artifacts. Self-contained: Z.ai is assumed to have read none of the drafts or this round's chat.

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** Every fact is stated here. **The bytes win over this document:** re-read any cited line, count or hash before relying on it; if it disagrees, the file wins and you say so in your bulletin. A step that depends on something you cannot see is not a step — name what is missing. Where two passages seem to conflict, the more specific and later one wins; if they still cannot be reconciled, stop and ask.

## 0 · The sitting in one page

| # | Work | Done when |
|---|---|---|
| 1 | Prove the baseline (§2) | verifier 445 OK / converse clean; 69/69 engine files byte-identical to `408410477`; diff to Claude's head 0 bytes. STOP if any fails. |
| 2 | **P0** — shareable-link/autosave collision (§4) | real-browser W14 probe both directions; visual battery green with W9/W12/W13/W14; W14 falsified by name, child log filed. |
| 3 | **Visual slice** — w89-style Draft buttons, no ring (§6) | every Draft button carries the pulse; no `.cp-suggest`, no `suggestIds`, no ring-only one-click button; contrast 2/0; 390 px clean; 0 console/page errors; a named law falsified by name. |
| 4 | **P1** — handoff/receipt accuracy, no product bytes (§5) | the §5.12 cleanup grep shows only corrected prose. |
| 5 | Docs, build artifact, delivery (§11) | full gates at final bytes; Cloudflare-ready static build + sha256 printed; delivered by §1.8's gate. |

## 1 · Who you are, the fence, and the new deploy target

1. **You are Z.ai**, Executor of Z-post-blue and 67 Cakepanz, a High Councillor below the Architect (Claude). Your tree is `cakepanz-4/` (the root folder inside the S13 zip). `colors/` on `origin/architect/engine-and-seats` is Claude's tree — read it read-only; never check it out or edit it.
2. **Lane split:** Claude owns the engine, its contracts and the merge; he alone writes `Football-Sim-*.html` and `colors/`. You own the UI slices and the S14 build/package.
3. **Deployment is Cloudflare Pages, not gh-pages.** The Owner ruled on 4 Nov 2026 that the product emits separate static assets on Cloudflare Pages with offline via service worker (`_agents/ARCHITECTURE-DIRECTION.md:3`, `_agents/COLORS-V1-DESIGN.md:5` in Claude's tree); he reaffirmed on 20 Nov that gh-pages "doesn't matter that much". **Do not build a gh-pages swap, a `index.html` make-live step, or a gh-pages rollback.** Produce the Cloudflare-ready static build and report its exact path + sha256. There is no `wrangler.toml` or deploy script in the repo yet (VERIFIED by tree listing) — deployment mechanics are UNKNOWN; report what you need rather than inventing them.
4. **The engine is frozen at pin `408410477`** (a commit; 69 TypeScript files). No engine edits, pin moves, ratings, protected-constant changes or basketball. The engine is the truth; never change it to make a UI or a test pass.
5. **The ring is REMOVED by Owner ruling (20 Nov 2026).** Do not revive it, restyle it as a ring, or file ring-correctness work. See §6 for what replaces it. Multisport stays parked: "OWNER FINAL: ship 76 Pancakes".
6. **Labels on every claim:** **VERIFIED** (you ran it; receipt in text) · **REPORTED** (another seat measured it; named) · **INFERRED** · **UNKNOWN**. "I believe it works" is not a receipt. A gate PASS is not product acceptance; implemented is not verified; verified is not Owner-accepted. State ladder: `proposed → accepted → implemented → verified → Owner-accepted`.
7. **Receipt law:** exact command, raw stdout, exit code, bytes certified. No before/after numbers from unseeded runs.
8. **Data rule (AGENTS.md §7):** no factual datum invented, estimated or silently corrected; new numbers are calculated from engine output (`slotWins20`, `teamRatings`, `boardVM`) and labelled *calculated* with the formula.
9. **Delivery gate:** hand the Owner the Cloudflare-ready build artifact path and sha256, plus a pushed commit hash with `git ls-remote` if you have credentials, **or** a download link. **A sandbox path alone is not delivery.** Never claim a push you cannot make.
10. **Network hygiene:** 60 s stall limit on network git commands (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most two attempts; then commit locally and give exact steps instead of hanging. No force-push, no stash, no destructive clean-up, no other-seat or governance-file edits.
11. **Finish all requested work before you respond** — one response, one package. First reply (four lines):
    ```
    READ : START-OF-CHAT-ZAI.md §2 · <anything else actually read>
    STATE: S13 · 67-cakepanz-13 · <what is open>
    PLAN : <what you will do this sitting, one line>
    ```
12. Work comes from the queue; this order is input, not an assignment. Innovate within the fence.

## 2 · Boot and prove the baseline

1. Orient as your `START-OF-CHAT-ZAI.md` §2 says. macOS `/tmp` is a symlink — use a real `/private/var/folders/...` scratch path.
2. Prove the pin before anything else:
   ```
   git cat-file -t 408410477                                            # → commit
   git ls-tree -r 408410477 colors/src | grep -c '\.ts$'                # → 69
   node tools/verify-package.mjs .                                      # from your tree root → 445 OK / 0 FAILED / 0 missing + converse clean, exit 0
   git archive 408410477 colors/src vs src/engine                        # → 69 files each, diff -rq clean
   git diff 408410477 architect/engine-and-seats -- colors/src           # → 0 bytes (fetch read-only; never check out or edit)
   ```
   If any fails, STOP. There is no engine re-sync to do.
3. Read your own shipped record: `deliverables/sitting-report-s13-2026-11-20.md`, `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`, `SLICE-STATUS-2026-11-20.md`, `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`, `deliverables/CUTOVER-CHECKLIST.md`.
4. **Do NOT re-run the 13b falsifier** — CLOSED and double-sourced (§3.3).

## 3 · S13 verdict and settled facts

### 3.1 Verdict: `improved` — do not redo the engineering
Package 445 OK / converse clean; engine **430/430** · node **35/35** · board **16/0** · slot **28/0** · visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/45** · golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`); clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`. The four prior-round fixes are lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a planted-extra fixture; the c11 diff re-host defect and GNU-patch auto-reverse hazard are documented. Five seats converged on the remaining list.

### 3.2 Established context
- `dispatchAsync` is defined at `colors/src/sports/nfl/app/store.ts:147` (comment `:142`, exposed `:154`). The Architect's contract `claude/dispatchasync-contract-2026-11-20.md` is **published** at `dac331e` — a precondition of merge, not pending. Its §2 table is anchored to the deployed tree (3 sites at `App.svelte:56/80/84`); **your c12 tree has 4** (`:148 START` with `pickSlot`, `:178 PICK`, `:184 UNDO`, `:208 LOAD`). Do not map the deployed line numbers onto your file; four seats filed the correction to the Architect.
- The post-Colors shell plan is PARKED until Colors ships. No c10 re-cut, no passGap re-run. Flex is protected — change no flex number.
- The "15/0" shorthand is the c12 baseline for board and visual only. `deliverables/CUTOVER-CHECKLIST.md:20-22` gives board 15/0 → 16/0, slot 28/0 → 28/0, visual 15/0 → 17/0. "26 pass" is from an old-pin swap test (FAIL verdict); final S13 is 29/0/10/3.

### 3.3 Settled — do not reopen
- **13b CLOSED, double-sourced.** `scripts/falsify-board.mjs:203` defines `dead = v.fails.some(f => f.includes('L13 '))`; printer `:90` emits `DIED` only when true, so F20's `DIED` entails L13 was in the fail set; `FAIL L16` is just `fails[0]`. Two seats filed the child log with the literal `FAIL L13 … ids WRONG` line: `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256 `67c0fd38…`) and `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (README + ports 4665–4673). Do not re-run it; file child logs with future falsifier runs.
- **T8 is READY.** The note `inbox/20261120-1814-zai-T8-c10-hosts-READY.md:9` already uses the correct `deliveries/receipts/slice1-battery.json` path — do not "fix" it. Repair file 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`; copy pinned bytes, never regenerate (run-variant). With Cloudflare as the deploy target the four-host repair is no longer a deployment gate — report its status as historical, do not execute it as part of S14.

## 4 · P0 — fix the shareable-link / autosave collision first

The only behavioural defect in the round; it breaks the headline D2/R2 feature. Confirmed from the bytes by four seats.

**Trace (`src/App.svelte`):** `:108` calls `void hydrateBoot()` unconditionally on boot; `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists; `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`. An explicit `?seed=B` is overwritten by stale autosave A: the visitor lands on their own old draft with 43 stale picks and the URL is rewritten. W12/W13 prove "URL seed === store seed" only in a fresh session (`startAt()` clears localStorage at `:58`; W6/W8 at `:113`, `:124`). No law covers *explicit link + existing autosave*.

**Browser receipt (real Chromium on delivered bytes):** autosave at `a3f2` (seed `470990`, one pick); `page.goto('?dev=1&seed=k1x9')` in the same context → `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, 0 page errors — `RESULT: DEFECT`. Correct seed `k1x9` = `935613`. After the fix on a temporary extract: `{"seed":null,"url":"k1x9","screen":"team"}` → START → `finalSeed=935613`, `errs=[]`, PASS.

**Required behaviour:** explicit link wins over a *different* autosave; same-seed reload restores (W9); plain reload restores (S29); visible notice that the local save was left untouched.

**Proven fix shape, inside `hydrateBoot()`:**
```ts
async function hydrateBoot() {
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
The **same-seed exception is load-bearing**: `if (has('seed')) return;` breaks W9 (16 pass / 1 fail). Do not substitute it.

**New law W14 (visual battery):** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice; **also assert the inverse** (same-seed reload restores, S29). Prove in a real browser; falsify W14 by name with a filed child log.

## 5 · P1 — handoff, receipt and tooling accuracy (no product bytes change)

1. **MERGE-BLOCKER.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 calls `test/engine.test.ts` a pin-identical fence file. Pin `408410477` has no `colors/test/engine.test.ts` — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/`/`nfl/`, no entry. Yours is a 51-line generated wrapper from `scripts/sync_engine_tests.py`; `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the data packs.
2. `test/engine/**` is called "identical"; `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say "re-pointed (import paths rewritten; logic byte-identical)".
3. **Composite overclaim.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output, no steps 13b–17. Replace §1.8b/§8/VERIFY §25.11's END-TO-END claim with: *"The composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`)."* File the tail into VERIFY §26 when it exists; do not re-run 13b.
4. **Receipt paths.** Report lines 98/160/191, README:7, `VERIFY-§25-append.txt:38` cite `deliverables/receipts/partH-s13/…`; the tree has only `deliveries/receipts/…`. Fix them. Simplify the README's self-contradictory `partH-c13/../partH-s13/…`. Do not touch the correct T8 note.
5. **F20 ergonomics.** Optionally make `dieReport` print the planted-law line (`fails.find(f => f.includes(LAW + ' ')) ?? fails[0]` after `DIED`); file per-law child logs. Cosmetic — do not re-run 13b.
6. **Stale §9.** Replace item 1 with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§5.2)."*
7. `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`; actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`.
8. Cosmetic prose: §8's "see §1.8b below" (block headed `8b.` inside §1); "run after the falsifier's final verdict" twice at `:222–223`; `:88`'s duplicated `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
9. `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and generated build output so the converse check does not flag a built tree as EXTRA.
10. The falsifier has the D-2 served-hash guard; standalone batteries trust `CP_PORT` (a stale `:4179` gave 6/10 vs 16/0). Port the polled-200 + served-hash guard into the battery scripts, or document "kill :4179 first; wait for the 200".
11. `state.error` is never cleared by a failed action — the shell must clear it itself; give this a named law, not just a comment. Extract one shared guard helper used by every battery (the old ring laws each grew their own unguarded locator and reintroduced the crash-before-L13 class).
12. Prove the cleanup: `grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>` — remaining hits must be corrected prose or labelled REPORTED child-log references.

## 6 · Visual slice — w89-style Draft buttons, ring removed (Owner ruling)

**The ring is gone.** Remove `.cp-suggest` from `BoardRow.svelte:23` and its CSS (`:125-132`), remove `suggestIds`/`val()` from `DraftBoard.svelte:74-76`, and remove the `.cp-quick` one-click button that renders only on ringed rows (`BoardRow.svelte:47`). The board reverts to the staged row → Confirm path, which already carries L22's double-click guard. Retire the ring-dependent law names (L13, L16–L22) from the gate set — do not leave them green on a feature that no longer exists. A separate Owner confirmation is owed on whether the old top-three highlight is also retired; proceed on the default **yes, all of it** and flag the assumption in your bulletin.

**Port the w89 button treatment as a plain visual slice on every Draft button.** Verified from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (read-only reference):
- `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }`
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
- W66 comment: every Draft button breathes; hero buttons keep the sheen and drop the pulse.
- `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard (cakepanz already has `cp-suggest-shimmer`'s guard to copy).
- A second treatment exists: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite}` with text-shadow keyframes. Reconcile both against the actual bytes; do not invent a third.
- Use cakepanz's existing tokens (`--gold2: #e6c67d`, `--goldm: #ad7f2e`, `--gold3: #9a6b1f`, verified in `src/lib/assets/tokens-w89.css:45-47`), not new hex literals. The effect is box-shadow/text-shadow — **never a text-colour change that breaks a contrast pair**. Keep **contrast 2/0**, **390 px no horizontal scroll**, **0 console/page errors**.

**New named law** (pick the next free number in the visual battery): every Draft button carries the glow/pulse class; the animation is disabled under `prefers-reduced-motion`; no row-level ring class or three-row highlight remains. Falsify it by name with a filed child log. State the exact final battery counts — do not assert a universal number.

## 7 · Product constraints
Offline hard: no CDN/network/paid API; the Cloudflare-ready static build must still boot from vanilla `file://`. Responsive: 390 px no horizontal scroll; keep 768/1280. A11y: values announced, keyboard reachable, visible focus, reduced motion. Style: integers except Wins/Priority one decimal; plain informative recaps; user's team in blue (`.ub`); "2-Pt Conv" except in the Guide. Golden regenerates only on a deliberate, receipted re-pin.

## 8 · Innovation — input, not this sitting's scope
Ranked: (1) seam golden as a standing cross-tree canary in Claude's `colors/` suite; (2) two-tree diff harness (`TREE_ROOT`); (3) copy-draft-link with a pin stamp and a visible "built on engine X, current engine Y" warning; (4) keyboard-first draft (↑/↓, Enter, u) with a one-pick law; (5) state-based one-shot latch keyed on `(id, slot)` replacing the 380 ms `confirmPick()` timer; (6) compare-two-drafts from the seam golden; (7) empty/error/stale-save states; (8) theme tokens, not hex, in `.cp-go`; (9) feed OT game-ball row; (10) offline-first law failing on any `request` event; (11) `recipe.json`/`reconstruct.mjs` content-addressed delivery. MUSE may queue these. None is required for S14.

## 9 · Proof standard and gate counts
- Every change: **target build + sha256 · WHERE (anchor string, not a line) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. An applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**, falsified by name: a mutant kills it, the receipt names it, the child log is filed.
- Labels on all claims (§1.5). No engine edits, pin moves, ratings or protected-constant changes. Never edit the Architect's product HTML.
- Gate baselines at final bytes: engine 430/430 · node 35/35 (+W14) · board 16/0 ring-free · visual 17 existing + W14 + the new glow law (**state the exact count you observe**) · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH · both checks PASS/CLEAN · falsifiers by name with child logs. Do not silently change a baseline; retire ring laws only with the Owner's ruling recorded in §1.5/§6.

## 10 · Governance — report, do not edit
- Live pin `408410477`. Five stale lines say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44/45/46/73** and `PROJECT-KNOWLEDGE.md` **18**. Flex is already 99 and protected — do not re-file it.
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the **ring-removal + Cloudflare** ruling and the earlier w89 direction. Report the gap; do not edit it.
- Claude's `NOW.md` `architect/engine-and-seats:NOW.md` will need its ring line corrected again — it now reads "revived in Z.ai's lane", which the Owner has just reversed to "removed". Name it; his file.
- Open and not yours to decide: Cloudflare deploy ownership and rollback, Playwright as a dev dependency, and the make-live/deploy gate. State your default in one line and proceed.

## 11 · Definition of done / delivery
1. `node tools/verify-package.mjs .` → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe both directions, then the visual battery with W9/W12/W13/W14 green.
3. Visual: ring classes and `suggestIds` gone; w89 pulse on Draft buttons; the new glow law falsified by name; contrast 2/0 and 390 px green.
4. Engine untouched: all 69 `src/engine/**` files byte-identical to `408410477`; `git diff 408410477 -- src/engine` empty.
5. §5 corrections applied and the cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, README banner and START-OF-CHAT-ZAI §2. One bulletin entry with the exact commands.
7. Produce the **Cloudflare-ready static build** and `67-cakepanz-14-<date>.zip` (tree + paperwork), `unzip -t` clean, sha256 printed. Deliver by §1.9's gate — artifact path + sha, and a pushed commit or link if available. **No gh-pages index swap, no w89 retirement note, no gh-pages rollback pointers.** Rollback plan for Cloudflare is UNKNOWN — ask, do not invent.
8. State plainly what you did NOT do.

## 12 · Decision boundary / explicitly out of scope
Choose a sensible default and proceed when a choice is reversible and technical; recommend a default in one line and proceed on everything it does not block when ambiguous but reversible; stop and name it for the Owner/Architect only if irreversible, externally visible, a protected constant, or a real product call. Silence is not approval of the last three.
**Out of scope:** the ring and all ring-correctness work (Contract B, rawSort, L13 oracle, no-display-parse law, L23-ring), gh-pages deploy/make-live/host repairs, engine edits, pin moves, ratings, second sport, seat-authored product HTML, governance/queue edits, "candidate" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A-vs-B, the post-Colors plan, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell.

## APPENDIX A — source record (attribution only; do NOT need to open these)
Facts assembled from every seat's S14 draft (ernie 2005/2030/2100/2130; pickle 2034/2041/2042/2045/2109/2110/2126/2127; porca 2040/2115/2125/2210; hy4 2038/2115/2130/2209/2214/2230; iceman CONTINUE-S13) and the Owner's 22:30Z ruling recorded at `origin/council/hy4:inbox/20261120-2230-hy4-OWNER-RULING-ring-removed-cloudflare.md`. Intentional supersessions of earlier drafts: the ring is removed, deployment is Cloudflare, and the pin-boundary/call-site corrections no longer apply because their subject (the ring) is gone.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— hy4 (advisor). Rewritten from the Owner's 22:30Z ruling. No product, engine, pin, governance or other seat's file was edited.
