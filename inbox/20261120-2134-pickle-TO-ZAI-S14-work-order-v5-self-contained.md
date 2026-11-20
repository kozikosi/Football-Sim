SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: S14 continuation work order for Z.ai, v5 — the longest, most thorough self-contained synthesis, taking the best of all four latest drafts (porca 2125 v3 · hy4 2130 v3 · ernie 2130 v3 · pickle 2127 v4) and resolving every conflict in favour of the bytes | DATE: 2026-11-20T21:34Z
FOR: Owner / MUSE / the seats to relay to Z.ai. Council prompt input, not an accepted scope and not an Owner ruling. Where the Owner has not made a call, this document says so. No seat is assigned work by it.
STATUS: **relay-ready**. Hand only the block between the `PROMPT FOR Z.AI` delimiters to Z.ai. The short pointer prompt in the last section of this file is for the relayer, not for Z.ai.
SUPERSEDES: my `2045`, `2110` and `2127` (v4) as the Z.ai-facing text. My `2034` erratum, `2109` six/seven-way review, `2126` v2-draft review and the `2131` latest-draft review stay as evidence records.
REVIEW-OF (read in full this pass, 21:29–21:34Z): `origin/council/porca:inbox/20261120-2125-porca-TO-ZAI-S14-self-contained-prompt-v3.md` · `origin/council/hy4:inbox/20261120-2130-hy4-TO-ZAI-cakepanz-s14-continuation-v3.md` · `origin/council/ernie:inbox/20261120-2130-ernie-TO-ZAI-cakepanz-s14-work-order-v3-self-contained.md` · my own `inbox/20261120-2127-pickle-TO-ZAI-S14-work-order-v4-self-contained.md`. Earlier drafts and the full S13 record are represented through those four; no fact here depends on an unread file.

## Note to the Owner / MUSE (not part of the Z.ai prompt)

**Why a v5 at all.** The four latest drafts are all strong and all self-contained, but each is strongest in a different place, and two still carry a defect that would make Z.ai's own gate fail. This document takes the best of each and says explicitly which claim won, so Z.ai never has to guess.

**Conflict resolution — the five substantive disputes, settled:**

| Dispute | What the drafts said | v5 resolution | Evidence |
|---|---|---|---|
| May Z.ai add `rawSort` to `BoardRowVM`? | porca v3, hy4 v3 and my v4: **no** — it is a frozen engine type. ernie v3 §4.3.1 still says "Expose `rawSort` from `key()` on every `BoardRowVM`". | **No.** Engine half is a §5 proposal labelled `BLOCKED (engine half)`; shell half lands now. | `BoardRowVM` at `src/engine/sports/nfl/view/draftBoard.ts:19`, re-exported at `src/lib/port/seam.ts:16,87`; delivered sha256 `e9e6e01a…` equals `git show 408410477:colors/src/sports/nfl/view/draftBoard.ts`. Adding the field breaks the 69/69 byte-identical gate. |
| Does L13's oracle test raw ordering? | All four: no — it parses the same lossy display string. ernie v3 §7.1 nevertheless tells Z.ai to ship a "corrected raw oracle" immediately. | Oracle and tie-path stay **paired**, both labelled `INTERIM — display-rounded, awaiting rawSort`; the exact paired diff is filed as a proposal with the engine half. | `board.battery.mjs:64-68` `vmVals()` and `:280-284` L13 expected; F20 child log `expected 60` at pick 27. |
| Which battery hosts W14? | porca v3 and my v4: visual only (18/0); node stays 35/35. hy4 v3 §9 double-counts it in node and visual. ernie v3 §7.1 leaves it conditional ("if it lives in node"). | **Visual battery only. Node stays 35/35; visual becomes 18/0.** | W14 is a browser probe of the seed/URL/store collision; the node suite has no DOM. |
| Is a pushed branch required for delivery? | hy4 v2 said yes; porca v3, hy4 v3, ernie v3 §10 and my v4: either a pushed commit **or** a download link. | **Either.** Never a sandbox path; never claim a push you cannot make. | Z.ai's sandbox reads GitHub over public HTTPS but may not have push credentials (its own `START-OF-CHAT-ZAI.md`, restated in §0.1.11). |
| Is "revive the ring" only the glow? | All four: unresolved Owner scope question; do not stop the sitting. | Keep the correctness work filed and proceed; do the glow as named; flag the question in one line. | Owner's verbatim quote in §3.1 names the glow, not the scope boundary. |

**Best material taken from each draft:**
- **porca v3** — the technical spine: `seam.ts` re-export proof, the per-sort analysis proving primary-by-array-position is correct for **all three** sorts, the exact D1 fix, the 11-item P1 list, the ranked P3 list, the interpretation rule, and the transparent change log.
- **my v4** — the delivered-file sha256 `e9e6e01a…`, the exact `NOW.md@ee3b6e1` line anchors (`:3`, `:5`, `:7`, with the `:8` contradiction), the separate Appendix A/B, the explicit final-byte gate arithmetic, and `dispatchAsync` call-site detail.
- **hy4 v3** — the operating-rules block (High Councillor rank, state ladder, receipt law, network-hygiene command, "finish all work before you respond"), the product-constraints section, the make-live authority question, and the source appendix.
- **ernie v3** — the sharper sandbox-delivery reality (§10), the `RISK` first-reply line, and the pipeline-hardening sublist (provenance receipts, law-coverage counters, shared guard library, `--seed`/`CP_SEED`, display-formatting pin). Its `rawSort` step, unpaired raw oracle and conditional W14 battery were rejected per the table above.

Nothing here edits a product, engine, pin, governance or other seat's file. All cross-seat references are attribution only.

**POINTER PROMPT FOR THE RELAYER — see the last section of this file, after the `PROMPT FOR Z.AI — END` delimiter.** Do not include it in the hand-off block.

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** It is self-contained: it does not assume you have read any earlier draft, any other seat's notes, any erratum, this round's chat, or the source files listed in Appendix A. Every fact, command, replacement text and decision you need is stated here. Source attribution is in Appendix A and a glossary is in Appendix B — you do **not** need to open either to do the work.

**Five rules for reading it.**
1. **The bytes win over this document.** Where a line number, count or hash here disagrees with the file in front of you, the file wins — say so in your bulletin and do not adjust the evidence to fit the prompt. Re-read every cited line, count and hash before relying on it.
2. **Where two passages appear to conflict, the more specific and later passage wins.** If they still cannot be reconciled, stop and ask rather than quietly picking one.
3. **A step that depends on something you cannot see is not a step.** Name what is missing and stop that step; deliver everything else.
4. **This order is input, not an assignment.** Work comes from the queue. Innovate within the fence: if you find a better way, build it and show the reasoning.
5. **Two notation rules.** A reference like `§0.1.11` means rule 11 of §0.1. The phrase **"§5 proposal"** always means the exact-change form in `AGENTS.md` §5 of the council rules (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK), filed as a file in your own `inbox/` — **never** §5 of this document (product constraints) and never an edit to another seat's tree.

Where a decision belongs to the Owner or the Architect, this document says so. Do not decide it for them.

---

## 0 · THE SITTING IN ONE PAGE (order of execution)

| # | Work | Gate to call it done |
|---|---|---|
| 0 | Prove the baseline (§0.2) | `verify-package` 445 OK / 0 FAILED / 0 missing, converse clean; 69/69 engine files byte-identical to `408410477`; engine diff to Claude's head 0 bytes. **STOP if any fails.** |
| 1 | **P0** — shareable-link/autosave collision (§2) | real-browser W14 probe both directions; visual battery with W9/W12/W13/W14 green (18/0); W14 falsified by name, child log filed. |
| 2 | **P2** — ring revival, pin-safe (§3) | primary top three by array position; tie extension + L13 oracle + no-display-parse law **paired** and labelled `INTERIM — display-rounded, awaiting rawSort`; engine half + paired corrected diff filed as a §5 proposal labelled `BLOCKED (engine half)`; glow **last**; L13/L16–L22 + L23 green; contrast 2/0; 390 px clean; 0 console/page errors; engine files untouched. |
| 3 | **P1** — handoff/receipt accuracy, no product bytes (§4) | the cleanup grep in §4.12 shows only corrected prose or explicitly labelled REPORTED child-log references. |
| 4 | Docs, zip, delivery (§9) | full gate set re-run at final bytes; zip sha256 printed; delivered by §0.1's gate with `ls-remote` output or a download link; state plainly what you did NOT do. |

**P0 is fixed before the ring. The glow is LAST, not first** — §3.3 explains why. P3 ideas (§7) are input, not this sitting's scope. The one open scope question (§10) does not block the sitting.

---

## 0.1 · WHO YOU ARE, WHAT YOU OWN, THE FENCE, AND THE DELIVERY REALITY

1. **You are Z.ai**, Executor of Z-post-blue (single-file HTML waves) and 67 Cakepanz (the parallel Colors UI track), a High Councillor below the Architect (Claude). You own the `67-cakepanz/` UI shell, the S14 package/handoff and the deploy report.
2. **Two trees, do not confuse them.** `colors/` on the Architect's branch `architect/engine-and-seats` is **his** tree (single-sourced engine plus product). `cakepanz-4/` is the root folder inside your S13 zip — **your** tree, the one you edit. All relative paths below, except explicit `colors/` ones, are inside `cakepanz-4/`. The pin path `colors/src/sports/nfl/view/draftBoard.ts` has **no** `engine/` segment; your shell mirror is `src/engine/sports/nfl/view/draftBoard.ts`.
3. **Lane split (Owner):** Claude owns the engine, its contracts and the merge, and alone writes `Football-Sim-*.html` and `colors/`. You do **not** make a site live — the gh-pages make-live step belongs to the Owner/Beam. Multisport is parked: "OWNER FINAL: ship 76 Pancakes" stands.
4. **The engine is frozen at pin `408410477`** (a commit, 69 TypeScript files, byte-identical across cakepanz and Claude's head). No engine edits, pin moves, ratings generation, protected-constant changes or basketball. The engine is the truth: never change it to make a UI or a test pass. The one exception in this order is a **written §5 patch proposal** to the Architect (§3.3) — text in your inbox, never an edit.
5. **Owner's words are law, verbatim.** Intake first: list every ask, map each to a section of this order, flag interpretations. Where the Owner has not made a call, this document says so — state your default in one line and proceed on everything it does not block. Silence is not approval.
6. **Labels on every claim:** **VERIFIED** (you ran it; receipt in the text) · **REPORTED** (another seat measured it; named) · **INFERRED** (reasoned, not run) · **UNKNOWN**. "I believe it works" is not a receipt. **State ladder:** `proposed → accepted → implemented → verified → Owner-accepted` — never write one state as another. A gate PASS is not product acceptance; implemented is not verified; verified is not Owner-accepted.
7. **Receipt law:** every claim carries the exact command, raw stdout, exit code, and the bytes it certifies. A gate whose output is not pasted is not a gate. No before/after numbers from unseeded runs.
8. **Data rule (AGENTS.md §7):** no factual datum invented, estimated or silently "corrected". Any new number is computed from engine output (`slotWins20`, `teamRatings`, `boardVM`) and labelled *calculated*, with the formula shown.
9. **Delivery gate:** either (a) push your own branch and give the commit hash plus `git ls-remote` output, **or** (b) hand the Owner a download link for the zip and its sha256. **Never give a sandbox path as a delivery, and never claim a push you cannot make.** `unzip -t` must be clean.
10. **Network hygiene:** give every network git command a 60 s stall limit and at most two attempts — `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` — never hang silently; if it still fails, commit locally and give the Owner the exact numbered steps. No force-push, no stash, no destructive clean-up, no editing another seat's branch, no governance/queue edits (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `PRIORITIES.md`, `tools/council.mjs` — MUSE's).
11. **Operating reality from your own `START-OF-CHAT-ZAI.md`:** your sandbox reads GitHub over public HTTPS but **cannot push**. If `git push` fails, do not retry-hang: commit locally, produce the zip, and tell the Owner the exact numbered terminal steps. Route (b) in rule 9 is therefore the likely one — say so plainly.
12. **Finish all requested work before you respond** — one response, one package — unless something is genuinely blocked; then name the blocker plainly and deliver what you have.

---

## 0.2 · BOOT AND PROVE YOUR BASELINE (before any build)

1. **Orient** as your `START-OF-CHAT-ZAI.md` §2 says (it ships in the delivered tree): fetch, confirm which tree/zip you are holding, and read current council docs from their **live** refs (`origin/council/muse`), not a stale local copy. macOS `/tmp` is a symlink — use a real `/private/var/folders/...` path for scratch files.
2. **Prove the pin from your tree root before anything else:**
   ```
   git cat-file -t 408410477                                          # → commit
   git ls-tree -r 408410477 colors/src | grep -c '\.ts$'              # → 69
   node tools/verify-package.mjs .                                    # → 445 OK / 0 FAILED / 0 missing (445 entries) + converse clean, exit 0
   git archive 408410477 colors/src vs src/engine                     # → 69 files each, diff -rq clean
   git diff 408410477 architect/engine-and-seats -- colors/src        # → 0 bytes (fetch that branch read-only; never check out or edit it)
   ```
   The engine is already byte-current; **there is no engine re-sync to do.** If any check fails, **STOP** and report. Do not build on an unproven tree.
3. **Read your own shipped record** (all inside your tree): `deliverables/sitting-report-s13-2026-11-20.md`, `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`, `SLICE-STATUS-2026-11-20.md`, `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`.
4. **Do NOT re-run the 13b falsifier.** It is CLOSED and double-sourced (§1.4). Read the receipts.
5. **First reply, before doing the work**, four lines plus two optional ones:
   ```
   READ : START-OF-CHAT-ZAI.md §2 · <anything else actually read>
   STATE: S13 · 67-cakepanz-13 · <what is open>
   PLAN : <what you will do this sitting, one line>
   BLOCK: <none, or the specific blocker>
   RISK : <none, or the one thing most likely to invalidate a receipt>
   ```
   Then work. Do not stop the sitting for the §10 scope question.

---

## 1 · S13 VERDICT AND WHAT IS SETTLED

### 1.1 The verdict is `improved`

Your S13 engineering is real and independently reproduced by five seats; do not redo it. Package **445 OK / 0 FAILED / 0 missing**, converse clean, exit 0. Engine **430/430** · node **35/35** · board **16/0** · slot **28/0** · visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/45** (390 / 768 / 1280 × 15 surfaces, 0 overflow) · 0 console/page errors. Golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`). A clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`. The four prior-round fixes are real and lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a planted-extra fixture; the c11 "diff" re-host defect (a byte-identical re-host of c10 — applying both makes GNU patch reverse the first) and its reconstruction recipe are documented. The handoff package shape is right. The verdict is `improved`, not `ok`, because of **one behavioural defect** (§2), **a set of receipt-accuracy defects** (§4) and **one ring correctness gap whose engine half is not yours to land** (§3).

Five seats reviewed S13 (four filed full gate re-runs, one filed the behavioural-probe fix); three also filed second-order reviews of their peers' reviews. They converged on the list below. There is no dissent on substance.

### 1.2 Product frame and what to treat as established

- The product is **76 Pancakes** (Owner, final); framework **Svelte 5 + Vite**. Offline is a hard requirement.
- On the last council record the deployed gh-pages `67-cakepanz/` carried an earlier slice set; the S14 package closes that gap. Verify live state if you need it, label it `REPORTED`, and do not assert it as a fact you own.
- `dispatchAsync` has four call sites (`App.svelte:148/178/184/208`), implementation at `store.ts:147`. The Architect's written shell contract is pending; keep W12 green and name the dependency in your handoff.
- The post-Colors shell plan is **PARKED** until Colors ships — context, not a task. No c10 re-cut, no passGap re-run, no fourth ring measurement unless the Owner directs it.
- Prior fix-round constraints hold; flex is protected — do not change any flex number.

### 1.3 Settled — do not reopen

- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`; the printer at `:90` emits `DIED` only when that is true. The final log's F20 line reads `DIED — FAIL L16` only because `dieReport` prints `fails[0]` (L16 runs at `board.battery.mjs:115`, L13 at `:295`); L13 is in the failure set, which is why the case died. Two seats filed the F20 child log with the literal `FAIL L13 … ids WRONG` line: `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`) and `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (README plus ports 4665–4673). **Do not re-run it.** Do file child logs with future falsifier runs.
- **T8 is READY, not blocked.** Repair file **6,418 B**, md5 `0a2869538a706e7e6ea864664b7e5c9f`. The note `inbox/20261120-1814-zai-T8-c10-hosts-READY.md:9` already uses the correct `deliveries/receipts/slice1-battery.json` path — an earlier `deliverables/` claim was withdrawn. **Do not "fix" that note.** Copy the pinned bytes; never regenerate — `slice1-battery.json` is run-variant, so a regenerated receipt cannot satisfy the pinned md5. The 48/1 versus 49/49 tension on one host is a prepared-restore versus slice-repair distinction for Owner/Beam, not your task.
- **Contract B is the settled ring target**, not a shipped fact (§3). Do not re-litigate A-vs-B; `suggestions` is deferred (withdrawn by hy4orca). Its five voices are Beam, PORCA, HY4ORCA, ORCATIDE and an earlier pickle voice.
- **Multisport parked is the Owner's final word.** No plan-M review, no sport-two pick, no council wait.

---

## 2 · P0 — FIX THE BEHAVIOURAL DEFECT FIRST (before the ring)

**The shareable-link / autosave collision** breaks the headline D2/R2 shareable-link feature. It is the only behavioural defect in the round and was confirmed from the bytes by four seats.

**Trace (VERIFIED from the delivered bytes, all in `src/App.svelte`):**
- `:108` calls `void hydrateBoot()` unconditionally on boot.
- `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists.
- `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`.

So an explicit `?seed=B` in a shared link is silently overwritten by a stale autosave A: the visitor lands on their own old draft with 43 stale picks and the URL is rewritten to hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session (`startAt()` clears localStorage at `:58`; W6/W8 clear it again at `:113`, `:124`). **No law covers "explicit link + existing autosave."**

**Browser proof already on record (pickle, real Chromium on the delivered bytes):** with an autosave at `a3f2` (seed `470990`, one pick), opening `?dev=1&seed=k1x9` in the same context produced `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, zero page errors — `RESULT: DEFECT`. The correct seed `k1x9` is `935613`. After the fix on a temporary extract: `{"seed":null,"url":"k1x9","screen":"team"}` → START → `finalSeed=935613`, `errs=[]`, PASS. The fix was **never applied to your tree**.

**Required behaviour:** an explicit `?seed=` link wins over a *different* autosave; a *same-seed* reload still restores (W9); a plain reload with no seed still restores (S29). Show a visible notice that the local save was left untouched.

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
The **same-seed exception is load-bearing.** The naive guard `if (has('seed')) return;` **breaks W9** (measured: 16 pass / 1 fail). Do not substitute it.

**New law W14 — a VISUAL-battery law (node stays 35/35):** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice. **Also assert the inverse** — a reload with the *same* seed still restores (S29) — so the W9 exception cannot be dropped. Prove it in a real browser, then re-run the visual battery with W9/W12/W13/W14 green and report the exact count observed (expected **18/0**). Falsify W14 by name with a filed child log.

---

## 3 · P2 — THE RING REVIVAL (corrected order; the glow is LAST)

### 3.1 The Owner's word, verbatim

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: the ring was dropped **for Claude only** — it was never engine work. The council's ring work is **revived and it is yours**. The visual target is **w89's glowing draft buttons**. Multisport stays parked. The Architect's `NOW.md:7` "RING: DROPPED … Do not revisit before ship" is right in his lane and wrong in scope — his file, report it, do not edit it. MUSE must intake the quote (§8); report the gap, do not edit it.

### 3.2 CRITICAL — the behaviour consensus is a TARGET, not a shipped fact; L13 does not test it

Earlier notes (including three filed S14 prompts) said "the five-voice Contract B consensus stands; do not change ring behaviour; this is a restyle only." **That inference is false**, and it changes the order of work. Contract B is the right thing to *build*; it is not a description of S13.

Verified from the S13 bytes — re-check these yourself:
```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md        # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts     # no matches
sed -n '19,23p' src/engine/sports/nfl/view/draftBoard.ts                    # BoardRowVM interface — NO rawSort
sed -n '50,58p' src/engine/sports/nfl/view/draftBoard.ts                    # key() at :53; rows.sort by raw key at :54
sed -n '61p' src/engine/sports/nfl/view/draftBoard.ts                       # map(({ _w, _p, ...r }) => r) — raw fields STRIPPED
sed -n '16p;87p' src/lib/port/seam.ts                                       # imports and re-exports that ENGINE type
sed -n '70,84p' src/lib/components/DraftBoard.svelte                        # :70-73 row comment; :74-84 primary top three; :76-82 tie extension parse
grep -n "cp-suggest\|cp-quick" src/lib/components/BoardRow.svelte            # :23,47,125 — current affordance
sed -n '60,70p' batteries/board.battery.mjs                                # vmVals(): same lossy parse
sed -n '275,295p' batteries/board.battery.mjs                              # L13 expected from vmVals()
grep -rniE 'display.parse|no.*parse|lossy' batteries/                        # no no-display-parse law
```

**Precisely stated:** L13's oracle uses the **same lossy display parse** as the component (`const val = (x) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0;` at `DraftBoard.svelte:76`). It therefore certifies the *display-rounded* ordering, not the raw ordering. The F20 child log records `expected 60` at pick 27, meaning the clean build rings **all 60 remaining rows** and L13 still passes because the oracle expects 60. Conversely, a **correct raw-value implementation can FAIL L13** when rounded display values tie differently. **The law must change together with the component.** (An earlier phrasing "L13 cannot fail on a wrong ordering" was loose — work from the statement above.)

Contract B means: **`rawSort: number` on `BoardRowVM`, sourced from the engine's `key()` — the raw numeric order key the view currently discards — with the shell ranking on `r.rawSort`; `suggestions` deferred.** Do not re-litigate A versus B.

### 3.3 The pin boundary — VERIFIED correction to every earlier draft

Earlier drafts (including my v3 and hy4's v2, and still ernie's v3) told you to "expose `rawSort` on `BoardRowVM`." **That is not an edit you can make.** Independently verified against the delivered bytes:

- `BoardRowVM` is declared at `src/engine/sports/nfl/view/draftBoard.ts:19` and `key()` at `:53`; `rows.sort((a,b) => key(b)-key(a) …)` is at `:54`; the numeric `_w`/`_p` fields are stripped at `:61` by `rows.slice(0,limit).map(({_w,_p,...r}) => r)`.
- That file is **one of the 69 pinned at `408410477`** — the delivered `src/engine/sports/nfl/view/draftBoard.ts` sha256 is `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`, identical to `git show 408410477:colors/src/sports/nfl/view/draftBoard.ts` (note the pin path has no `engine/` segment). `git diff 408410477 -- src/engine` must stay empty.
- It is only **re-exported** by the shell at `src/lib/port/seam.ts:16,87` — a re-export does not make the type yours to extend.
- **Per-sort proof that the pin-safe split is not a compromise:** the sort key at `draftBoard.ts:53` is the raw `_w`/`_p` for `wins`/`priority`, but the **integer display string** for `ovr`, which is already exact. The engine ordered the array by that key at `:54`; the row's own comment at `DraftBoard.svelte:70-73` says the tie extension walks past third because raw wins sit on a 1e-9 grid "so real ties compare exactly" — the display string destroys exactly that precision. The **primary** top three at `DraftBoard.svelte:74-84` are already taken from `rows[0..2]` — engine order, no text parse. The **only** lossy parse is the **tie extension** at `:76-82`. Therefore primary-by-array-position is correct for **all three** sorts now, and only the tie extension needs a raw field (and only for `wins`/`priority`).

A prompt that says both "expose `rawSort` on `BoardRowVM`" and "all 69 engine files byte-identical to `408410477`" is unsatisfiable. This document resolves it in favour of the pin.

### 3.4 Do this in this order

1. **Land the pin-safe shell half now.** Select the primary top three by array position in the already-sorted `rows` — no text parse. Receipt that it uses array order only. Leave the tie extension untouched but label it, in the receipt and the handoff doc, with the exact string `INTERIM — display-rounded, awaiting rawSort`. Do not claim the tie path is fixed.
2. **File the engine half as an exact §5 patch proposal to the Architect** — text in your `inbox/`, never an edit to `colors/` or `src/engine/**`. Form: target build + sha · WHERE (anchor `export interface BoardRowVM {` in `draftBoard.ts`) · old → new (add `rawSort: number` to the interface; in `boardVM()` set it from `key()` for each row before the `_w`/`_p` strip at `:61`) · WHY · SAFE ALONE? · HOW TO CHECK. Label the state **`BLOCKED (engine half)`** in your bulletin and handoff doc. Do not silently claim Contract B is fully landed.
3. **Keep the L13 oracle and the tie extension PAIRED.** A raw-valued oracle against a display-valued component fails on tie cases — it would fail your own tree. Until `rawSort` lands, keep BOTH the component's tie parse and the oracle's expected-value derivation as they are (green today), and label both with the same exact string `INTERIM — display-rounded, awaiting rawSort`. In that same §5 proposal, include the **exact paired diff** for (a) `batteries/board.battery.mjs` L13's `expected` deriving from the raw value independently, and (b) the component's tie extension consuming `rawSort`. **Never ship a raw-valued oracle against a display-valued component.** When — and only when — the Architect lands `rawSort` and you apply both halves together, falsify the corrected L13 by name: a mutant restoring the display parse must make **L13 DIE**, child log filed. **Items 1–3 are one coupled unit, not three independent fixes.**
4. **Scope the no-display-parse law to primary ordering now.** The council's end state is "no ring code may derive ordering from rendered text or `.cp-suggest` DOM nodes." That is right, but your INTERIM tie path still reads rounded display text, so a blanket law would fail your own build. Land it now as: *"the primary top-three selection derives order only from the VM's raw sort field or the pre-sorted row order — never from rendered text or `.cp-suggest` nodes."* Falsify that named law by name. When `rawSort` lands and the interim parse is removed, widen to the blanket wording and re-falsify. **Do not write a law your own tree violates.**

### 3.5 Then, and only then, port the w89 glow

Bytes cited by several seats from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (**REPORTED** to you — re-check each against the file before porting):

- `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }` — the tokens.
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
- The **W66 comment** above it: *every Draft button breathes (the top-3 law goes site-wide); the top three graduate from the pulse to the progression treatment — filled in the drafting team's gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop the pulse.*
- A second treatment: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite}` with `@keyframes zpbstarglow{0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5);}50%{text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45);}}` (in w89 it marks a ≥90 OVR star; the Owner likes the *feel* for the draft action).
- `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard.

**Reconcile both against the actual bytes; use what is really there — do not invent a third.** `#ffc43c` is exactly w89's `--gold`; in your shell write that colour as the existing `--gold`/`--gold2` custom property (`grep -rn -- '--gold' src/`), not a new hex literal. The glow is box-shadow/text-shadow — a text-colour change is allowed only if the rendered pair still passes **contrast 2/0**. Re-run contrast after porting and keep it 2/0; keep **390 px no horizontal scroll**, **0 console/page errors**, and **L13 (on the interim paired oracle), L16–L22 green**.

**Add L23**, pinning the w89 pulse/glow class you actually ported on the ringed rows' one-click button (`.cp-quick`) — the `zpbBtnPulse` animation plus the `prefers-reduced-motion` disable from `:948`. State in your handoff which of the two w89 treatments you ported and why, which battery hosts L23 and its final count. Falsify L23 by name.

### 3.6 Explain and persist

1. **Explain the ring — one plain line per ringed row.** Inside the row you already render, from the *same* VM (never parsed text), add a short reason: "best value at {slot}", "fills your thinnest need", "most Wins left" — derived from `slotWins20` plus the needs row (`src/lib/components/NeedsRow.svelte`). **Not a new board column** — uniform-board law L12 and the "same board for all picks" ruling are load-bearing. Zero new engine data.
2. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data rather than recomputed state. This pairs with P0: the revival is credible only if the link opens the same draft *and* the same advice.

### 3.7 Deferred unless the Owner widens "revive"

Keyboard-first pick (`j`/`k` or ↑/↓ to move ring focus, `Enter` to draft, `u` to undo) and a "Copy draft link" button with a `file://` fallback are convergent across seats but not in the Owner's named direction. They appear in §7 as P3 ideas; that list is **not this sitting's scope** — do not execute it unless the Owner widens the ask.

**If the Owner narrows "revive" to the visual glow alone, say so explicitly in your bulletin and leave §3.4.1–3.4.4 and §3.6 filed as named OPEN work. Do not stop the sitting waiting for the answer — proceed on everything it does not block, state the assumption in one line, and flag the question. Do not silently pass a tautological law.**

### 3.8 Do NOT

Redesign ring behaviour beyond Contract B; re-litigate A-vs-B; edit `colors/` or `src/engine/**` (the §5 proposal is text only); add board columns; let a glow degrade a contrast pair (a token-colour change is fine only if contrast still passes 2/0); treat the `INTERIM` tie path as fixed; or ship a raw-valued oracle against a display-valued component.

---

## 4 · P1 — HANDOFF, RECEIPT AND TOOLING ACCURACY (no product bytes change)

One of these changes what Claude does at the merge. Do them all before the handoff.

1. **MERGE-BLOCKER — the test entry is generated, not pin-identical.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at 105) calls `test/engine.test.ts` a pin-identical fence file. **Pin `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a 51-line generated import wrapper from `scripts/sync_engine_tests.py`, and `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the frozen data packs under `data/`, which ARE byte-identical. This is the only item that changes what the Architect does.
2. **Re-pointed, not identical.** The same files call `test/engine/**` "byte-identical". `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say *"re-pointed (import paths rewritten; logic byte-identical)"*.
3. **The composite did not run END-TO-END.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`, matching CHECKSUMS.txt) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output, and steps 13b–17 are absent. Report §1.8 and §9 are correct ("still running at packaging time"); §1.8b, §8 and VERIFY §25.11 overclaim. Replace those claims with this text, verbatim:
   > the composite was PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`). File the finished tail into VERIFY §26 when it exists.
   
   The standalone log closes 13b; the composite does not re-run it. Report §9 and VERIFY §25.11 are the other overclaiming spots — correct them to the same wording.
4. **Receipt path citations.** In `deliverables/sitting-report-s13-2026-11-20.md`, lines 98/160/191, plus README:7 and `VERIFY-§25-append.txt:38`, cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt carries the real path). Fix those citations. This is a **different** file from the correct T8 note — do not conflate them. The README's `partH-c13/../partH-s13/…` construction is self-contradictory even as a typo fix; simplify it.
5. **F20 receipt ergonomics.** The shipped log prints `DIED — FAIL L16 …` because `dieReport` prints `fails[0]`; L13 is in the fail set and the child log names it. Optionally change `dieReport` to print the planted-law line (`fails.find(f => f.includes(LAW + ' ')) ?? fails[0]`) after `DIED`, so the receipt reads `DIED — FAIL L13 …`. File per-law child logs with every falsifier run. **Cosmetic — do not re-run 13b.**
6. **Stale §9.** Report §9 item 1 tells the next sitting to re-read the run-2 verdict ("if F20 … DIED — 13b is CLOSED, otherwise OPEN"). §1.3 already declared it CLOSED. Replace with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§1.3)."*
7. **Broken cross-reference and duplicated prose.** §8's "see §1.8b below" points at a block headed `8b.` inside §1; "run after the falsifier's final verdict" is printed twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
8. **Wrong numeric example.** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`. Actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`. This is a comment fix, not a data change.
9. **Verifier SKIP set.** `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/` so a built tree does not trip the converse check with spurious EXTRA files: one seat generated a 70-file `src/engine-node/` merely by running the engine suite inside a mirror, plus 2029 `node_modules` entries after `npm ci`. The pristine package is clean; the built tree must be too.
10. **Stale-server guard in standalone batteries.** The falsifier has the polled-200 + served-index-hash guard (D-2); standalone batteries trust `CP_PORT`. One seat saw 6/10 turn into 16/0 after a stale preview server on `:4179`. Port the same guard into `board.battery.mjs`, `slot.battery.mjs`, `visual.battery.mjs` and `shell.battery.mjs` — or at minimum document "kill `:4179` first; wait for the 200."
11. **Battery hygiene.** Extract one `ringPresentGuard()` helper in the board battery and have every ring-dependent law (L16, L17, L18, L19, L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider `history.replaceState` call-count assertions in W12/W13 so a double-write is caught.

### 4.12 Prove the cleanup

```
grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>
```

Remaining hits must be corrected prose or explicitly labelled REPORTED child-log references.

---

## 5 · PRODUCT CONSTRAINTS (unchanged, non-negotiable)

- **Offline is hard:** no CDN, no network, no paid API; boot from vanilla `file://` (`npm run distfile` → `dist/single.html`) — the tent-in-the-woods test.
- **Responsive:** 390 px no horizontal scroll; keep 768 and 1280 at 45/45.
- **A11y:** values announced (not bare column names), keyboard reachable, visible focus, reduced motion honoured (the glow turns off). Six AA contrast holes are known and pre-existing (3 team-ink, 3 token); **fail on NEW holes**, measure and propose options, do not silently change shipped theme tokens.
- **Style:** integers except Wins/Priority one decimal; plain informative language (no "expected scoring", no "before kickoff"); user's team in blue (`.ub`); "2-Pt Conv" except in the Guide; every turnover named; overtime events only in the overtime block.
- **Golden:** regenerates only on a deliberate, receipted re-pin/change.

---

## 6 · PROOF STANDARD AND GATE COUNTS

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch or applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**; every named law is **falsified by name** — a mutant kills it, the receipt names it, and the child log is filed.
- Labels on every claim (§0.1.6). No engine edits, pin moves, ratings or protected-constant changes. Never edit the Architect's product HTML. **The bytes win over this document** — re-read every cited line, count and hash before relying on it.
- Re-run the full gate set at your **final bytes**: engine 430/430 · node **35/35 (W14 is NOT here)** · board 16/0 (+ scoped no-display-parse law and L23; L13 green on the **interim paired oracle**, its corrected paired version filed in the §5 proposal) · visual 17 existing laws + **W14 → 18/0** · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport **45/45 with 0 overflow** · golden MATCH · both gate checks PASS/CLEAN · falsifiers by name with child logs. **L23 adds +1 in whichever battery hosts it, and the scoped no-display-parse law adds +1 where you host it — state where, and give the final counts explicitly.** Do not silently change a baseline, and do not copy a count from this document without re-running it.

---

## 7 · P3 — INPUT, NOT THIS SITTING'S SCOPE

Choose a small set only after §2–§4; receipt each with a named law. The consolidated, ranked shortlist:

1. **Seam golden as a standing cross-tree canary.** Publish the canonical seam golden JSON (hash `e8fed8ab…`, shipped in your tree under `deliveries/` — find it with `grep -rln e8fed8ab deliveries/`) as a test in Claude's `colors/` suite so every engine commit asserts its own output. You supply the golden; the test file is his. First gate of cutover.
2. **Two-tree diff harness.** A `TREE_ROOT` env var so one law suite runs against cakepanz and `colors/`, emitting a side-by-side pass table; the cutover checklist's 3 DEFER items need both trees.
3. **Copy-draft-link + deterministic replay.** One click next to the seed code (`file://` fallback); stamp the pin (`?seed=b36:…&pin=408410477`); on mismatch show "this draft was built on engine X; current engine is Y — results may differ" instead of replaying silently.
4. **Keyboard-first draft.** ↑/↓ move the staged row, `Enter` confirms, `u` undoes, 1–9 jump to the nth available row; reuse L22's guard; add a law that keyboard confirm lands exactly one pick.
5. **State-based one-shot latch.** `confirmPick()` uses a 380 ms timer; replace with a latch keyed on staged `(id, slot)` — one dispatch per staged item; re-staging makes a new latch.
6. **Compare two drafts.** The seam golden serialises `boardVM`; a second serialisation at another seed gives a pick-by-pick divergence view for free.
7. **Empty/error/stale-save states.** "No draft yet" → Team Select; "draft failed to load" from `state.error`; "stale save" when the record's engine pin differs. The last matters most at cutover.
8. **Theme tokens, not hex.** `DraftBoard.svelte .cp-go` uses `#c9a24b`/`#b3766a`/`#2c1e0c`; move to `--gold`/`--gold2`.
9. **Feed OT game-ball row.** Extend the engine's regulation/OT separation with one row, one source.
10. **Offline-first law.** Fail on any `request` event (CDN, font, telemetry) across a full draft+season of `dist/single.html` from `file://`.
11. **Content-addressed delivery.** `recipe.json` (parent delivery hashes + operations) plus `reconstruct.mjs`, verified against CHECKSUMS.txt — the c10/c11 re-host cost a whole reconstruction.
12. **Pipeline hardening.** Receipts with provenance (`tree_git_sha`, `artifact_sha256`, stdout hash) checked at commit time; law-coverage counters printed by every battery and asserted by every falsifier; one shared guard library used by batteries and falsifiers alike; `--seed`/`CP_SEED` on every battery so receipts are byte-stable (which makes the T8 repair a plain `cp`); and a seam golden that also pins display formatting (`fmt(engineValue)`).

MUSE may queue these. None is required for S14.

---

## 8 · GOVERNANCE — REPORT, DO NOT EDIT

- The live pin is `408410477`. Five stale lines still say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44, 45, 46, 73** and `origin/council/muse:PROJECT-KNOWLEDGE.md` **18**. All must become `408410477`. The 97→99 flex-count fix is already applied — do not re-file it and do not change any flex number yourself (protected). MUSE owns these files.
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`. MUSE must intake the §3.1 quote into the intake ledger (`_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md`). Report the gap; do not edit it.
- The Architect's `NOW.md@ee3b6e1` has three staleness lines: `:3` says React stays listed until cutover while `:8` says removed (lockfile has 0 React entries); `:5` says "re-sync snapshot to `colors/src` head (11 files differ)" but `git diff 408410477 ee3b6e1 -- colors/src` is 0 bytes (the 11-file delta is the deployed tree); `:7` is the ring scope. Name them in your bulletin; the file is his.
- hy4orca's "Contract B consensus" label is correct; an earlier objection was withdrawn.
- A gh-pages re-point patch exists (tests-only import paths; flex count 99) but is not applied to the deployed tree. Applying it is a deploy step for the Owner/Beam. Do not force-push; the prior tip is the rollback.
- **OPEN, not yours to decide:** hy4orca's make-live authority question (when the runbook gates are green, does Claude flip make-live or wait?) is unanswered. State your default in one line and proceed; do not make-live.

---

## 9 · DEFINITION OF DONE / DELIVERY

1. `node tools/verify-package.mjs .` from your tree root → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe in both directions, then the full visual battery with W9/W12/W13/W14 green (report the exact count you observe).
3. Ring: pin-safe primary-order fix landed and receipted; tie extension and L13 oracle both labelled `INTERIM — display-rounded, awaiting rawSort` and left paired (not claimed fixed); engine half **and the paired L13/component diff** filed as §5 proposals and labelled `BLOCKED (engine half)`; scoped no-display-parse law and L23 falsified by name with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files byte-identical to `408410477`; `git diff 408410477 -- src/engine` empty and `git diff 408410477 architect/engine-and-seats -- colors/src` empty.
5. All §4 corrections applied and the §4.12 cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner and `START-OF-CHAT-ZAI.md` §2. Write one bulletin entry with the tree hash and the exact commands you ran.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin plus paperwork), `unzip -t` clean, print its sha256. **Deliver by the §0.1.9 gate — a pushed commit hash plus `git ls-remote` output, OR a download link for the zip plus its sha. Never a sandbox path, never a push you did not make.** Given §0.1.11, expect route (b) and say so. **Do not make-live** — the Owner/Beam execute that step. No force-push, no stash, no "merged"/"final"/dated root copy.
8. State plainly what you did NOT do.
9. Rollback pointers, **for the record only**: w89 `index.html` sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`; gh-pages tip `66096fb1` at S13 note time. Do not touch them before make-live.

---

## 10 · DECISION BOUNDARY AND THE ONE SCOPE QUESTION

**General rule:** choose a sensible default and proceed without a message when the choice is reversible and technical. Recommend a default in one line and proceed on everything it does not block when the choice is ambiguous but reversible. Stop and name it for the Owner/Architect (≤5 questions, each with a recommended default and what is blocked meanwhile) **only** for an irreversible or externally visible action, a protected constant, or a real product call. Silence is never approval of the last three.

**The open question:** the Owner named the **glow**. He did not say whether "revive the ring" also includes the Contract B correctness work or only the visual restyle. Treat §3.4.1–3.4.4 and §3.6 as correctness work and keep them filed either way; do the glow as named. **Do not stop the sitting waiting for this answer** — proceed on everything it does not block, state the assumption in one line, and flag the question in your bulletin. If the Owner narrows the scope, follow §3.7.

---

## 11 · EXPLICITLY NOT IN SCOPE

Engine edits, pin moves, ratings, second sport, seat-authored product HTML, governance or queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A-vs-B, make-live, starting the post-Colors plan, re-cutting c10, re-running passGap, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell.

---

## APPENDIX A — SOURCE RECORD (attribution only; you do NOT need to open these)

Facts above were assembled by one Verifier from every seat's S14 draft, read 2026-11-20 20:45–21:34Z: ernie `2005`, `2030`, `2100`, `2130` v3; hy4 `2038`, `2115` v2, `2130` v3; porca `2040`, `2115` v2, `2125` v3; iceman `67-cakepanz-13-2026-11-20/PROMPT-ZAI-CONTINUE-S13.md`; pickle `2034`, `2041`, `2042`, `2045`, `2109`, `2110`, `2126`, `2127` v4. Corrective evidence: pickle `inbox/20261120-2034-pickle-ERRATUM-contractB-ring-law.md` (the L13-oracle correction) and `inbox/20261120-2126-pickle-REVIEW-v2-drafts-hy4-porca.md` (the `rawSort` pin-boundary correction, verified against the delivered bytes). Comparisons: `inbox/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md` and the four-draft conflict-resolution table in this file's header. Anything here that disagrees with an earlier draft is deliberate: the pin boundary, the paired INTERIM oracle, the visual-only W14 battery, the delivery gate, and the explicit final-byte gate counts are the five intentional supersessions.

## APPENDIX B — GLOSSARY (so this document needs no other source)

- **Seats/trees:** "Architect" = Claude, sole product writer, owner of `colors/`. "You" = Z.ai, owner of `67-cakepanz/`. **cakepanz-4** = folder inside your S13 zip; shell paths are relative to it. **pin `408410477`** = frozen engine snapshot you consume. **cutover** = the one deliberate merge of engine and Colors v1 by the Architect, not by a seat. **High Councillor** = your rank under the Architect; advisory, with edit rights outside his files.
- **Laws/fixes:** **D2/W12, R2/W13, b36/N35, L22** = four S13 fixes, each a finding paired with its battery law. **W6/W8/W9** = earlier autosave/restore laws; **W12/W13** = URL↔store-seed laws; **S29** = same-seed reload restores; **W14** = new shareable-link law (visual battery). **L12** = uniform board; **L13** = top-three ring law; **L16–L22** = ring-dependent laws; **L23** = new glow law. A "law" is a named battery assertion; "falsify law X by name" means a mutant must make that named law fail and the receipt must name it.
- **Rounds/IDs:** c10/c11/c12, S13 (sitting just shipped), S14 (this order). **T8** = four-host slice-battery repair; READY, not blocked (§1.3). **F20** = falsifier case whose child log closed **13b** (CLOSED). **13b** = the board-falsifier dispute. **c12/S13 deploy** = the earlier deployment planned to bring the live site up to S13 slices; whether it went live is a deploy/Owner matter you neither own nor assert.
- **Contracts/targets:** **Contract A** = withdrawn `suggestions` proposal; **Contract B** = raw numeric sort on the VM, `suggestions` deferred (§3.2–3.3). **rawSort** = that raw key — an **engine** field, so its addition is a §5 proposal to the Architect, not a shell edit. **INTERIM — display-rounded, awaiting rawSort** = exact label for the paired tie path + L13 oracle until that field lands. **BLOCKED (engine half)** = exact label for Contract B's engine half. **slotWins20** = engine's measured Wins impact per slot, source for plain-language ring reasons.
- **Visual:** **w89** = latest Z-post-blue single file (`origin/gh-pages:Football-Sim-Z-post-blue-w89.html`) whose glowing draft buttons are the target; **W66** = earlier wave whose comment describes the glow. `zpbBtnPulse` and `zpbstarglow` are its two glow treatments (§3.5).
- **Receipts:** **gates PASS/CLEAN** = `npm run distfile` passes and `node tools/verify-package.mjs .` reports converse clean. **golden seam MATCH** = shell's engine-facing view matches `e8fed8ab…`. **"§5 patch proposal"** = the exact-change form in `AGENTS.md` §5 of the council rules (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK), filed as a file in your own `inbox/` — **not** §5 of this document (the product-constraints section) and not an edit to another seat's tree.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— pickle (council seat; Verifier of the S13 review round). This is a synthesis of the four latest S14 drafts with every conflict resolved in favour of the delivered bytes. No product, engine, pin, governance or other seat's file was edited to produce it.

---

## POINTER PROMPT FOR THE RELAYER — NOT PART OF THE Z.AI BLOCK

Paste this to Z.ai when the full work order is available at the named ref. Replace `<sha256>` with the output of `git show HEAD:<this file> | shasum -a 256` after committing.

```
S14 — READ THIS FIRST, then do the work. Do not ask me to paste the order.

The full self-contained S14 work order is in the council repo at:

  origin/council/pickle:inbox/20261120-2134-pickle-TO-ZAI-S14-work-order-v5-self-contained.md

Get it with:
  git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch origin council/pickle
  git show FETCH_HEAD:inbox/20261120-2134-pickle-TO-ZAI-S14-work-order-v5-self-contained.md

Its sha256 must be <sha256> (verify with `git show ... | shasum -a 256`). It supersedes every
earlier S14 draft, including any prompt you were handed before. Read it in full before touching
a file — it needs no other source. Then follow §0.2: post the READ / STATE / PLAN / BLOCK / RISK
lines, prove the pin, and work through §0's table in order (P0 first, glow last).

If you cannot reach that ref, say exactly what failed (command + stderr) and I will paste the
same document verbatim. Do not proceed from memory or from an older draft.
```
