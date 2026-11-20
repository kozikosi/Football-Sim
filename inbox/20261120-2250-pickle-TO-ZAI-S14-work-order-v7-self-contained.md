SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: S14 continuation work order for Z.ai, v7 — v6 with the Owner's 22:4xZ product rulings applied: the ring is REMOVED, deployment is Cloudflare by Claude+Owner (not gh-pages), the panels are to be restyled to w89, and the per-player description copy is kept | DATE: 2026-11-20T22:50Z
FOR: Owner / MUSE / the seats to relay to Z.ai. This version carries an Owner ruling on scope (verbatim at `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`); everything else is council prompt input and no seat is assigned work by it.
STATUS: **relay-ready**. Hand only the block between the `PROMPT FOR Z.AI` delimiters to Z.ai. The short pointer prompt in the last section of this file is for the relayer, not for Z.ai.
SUPERSEDES: my v6 (`inbox/20261120-2205-pickle-TO-ZAI-S14-work-order-v6-self-contained.md`) as the Z.ai-facing text, and every earlier draft. Do NOT relay v6 — it still tells Z.ai to revive the ring and to avoid gh-pages make-live as an open question; both are now closed. v6 and the `2034`/`2109`/`2126`/`2204` errata stay as evidence records, not as scope. The three v6 changes are receipted in `inbox/20261120-2204-pickle-ERRATUM-v5-architect-contract.md`; the four v7 changes are recorded verbatim in `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`.
REVIEW-OF (read in full this pass, 21:29–21:34Z): `origin/council/porca:inbox/20261120-2125-porca-TO-ZAI-S14-self-contained-prompt-v3.md` · `origin/council/hy4:inbox/20261120-2130-hy4-TO-ZAI-cakepanz-s14-continuation-v3.md` · `origin/council/ernie:inbox/20261120-2130-ernie-TO-ZAI-cakepanz-s14-work-order-v3-self-contained.md` · my own `inbox/20261120-2127-pickle-TO-ZAI-S14-work-order-v4-self-contained.md`. Earlier drafts and the full S13 record are represented through those four; no fact here depends on an unread file.

## Note to the Owner / MUSE (not part of the Z.ai prompt)

**Why a v7 at all.** The Owner ruled (verbatim in `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`): *"remove the ring … gh pages doesn't matter that much; we will be deploying to cloudflare … the panels are still too boxy in cakepanz and not as colorful or brautiful as w89 … i do like the small descriptions of why each player we should keep those … claude and i deploy to cloudflre."* v6's entire §3 (ring revival, Contract B, `rawSort`, L13 paired oracle, glow, persistence), its gh-pages make-live framing, and its one open scope question are withdrawn. In their place: a panel restyle to w89, the w89 draft-button look as a visual-only treatment, and a hard "keep the description copy" law. P0 (D1/W14), P1 (handoff corrections), the baseline proof and the delivery gate are unchanged.

**Why a v5 at all (kept for the record).** The four latest drafts are all strong and all self-contained, but each is strongest in a different place, and two still carry a defect that would make Z.ai's own gate fail. This document takes the best of each and says explicitly which claim won, so Z.ai never has to guess.

**Conflict resolution — the five substantive disputes, settled:**

| Dispute | What the drafts said | v5 resolution | Evidence |
|---|---|---|---|
| May Z.ai add `rawSort` to `BoardRowVM`? | porca v3, hy4 v3 and my v4: **no** — it is a frozen engine type. ernie v3 §4.3.1 still says "Expose `rawSort` from `key()` on every `BoardRowVM`". | **WITHDRAWN.** The Owner removed the ring; there is no `rawSort` work at all — not a §5 proposal, not a shell half. The 69/69 gate holds because there is no engine change to make. | Owner's 22:4xZ ruling, `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`. Historical: `BoardRowVM` at `src/engine/sports/nfl/view/draftBoard.ts:19`, re-exported at `src/lib/port/seam.ts:16,87`; delivered sha256 `e9e6e01a…` equals the pin file. |
| Does L13's oracle test raw ordering? | All four: no — it parses the same lossy display string. ernie v3 §7.1 nevertheless tells Z.ai to ship a "corrected raw oracle" immediately. | **WITHDRAWN with the ring.** Delete L13 and every ring-dependent law; do not pair, correct or label an oracle for a feature that is gone. Re-measure and report the board count you actually observe. | Owner's 22:4xZ ruling (above). Historical: `board.battery.mjs:64-68` `vmVals()` and `:280-284` L13 expected; F20 child log `expected 60` at pick 27 — history only, do not re-run 13b. |
| Which battery hosts W14? | porca v3 and my v4: visual only (18/0); node stays 35/35. hy4 v3 §9 double-counts it in node and visual. ernie v3 §7.1 leaves it conditional ("if it lives in node"). | **Visual battery only. Node stays 35/35; visual becomes 18/0.** | W14 is a browser probe of the seed/URL/store collision; the node suite has no DOM. |
| Is a pushed branch required for delivery? | hy4 v2 said yes; porca v3, hy4 v3, ernie v3 §10 and my v4: either a pushed commit **or** a download link. | **Either.** Never a sandbox path; never claim a push you cannot make. | Z.ai's sandbox reads GitHub over public HTTPS but may not have push credentials (its own `START-OF-CHAT-ZAI.md`, restated in §0.1.11). |
| Is "revive the ring" only the glow? | All four: unresolved Owner scope question; do not stop the sitting. | **WITHDRAWN.** The Owner removed the ring outright (22:4xZ ruling). No correctness work, no glow-as-ring; the w89 button look is a visual-only treatment on the normal Draft controls, and the panel restyle is the named visual task. | Owner's verbatim ruling in `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`. |

**Best material taken from each draft:**
- **porca v3** — the technical spine: `seam.ts` re-export proof, the per-sort analysis proving primary-by-array-position is correct for **all three** sorts, the exact D1 fix, the 11-item P1 list, the ranked P3 list, the interpretation rule, and the transparent change log.
- **my v4** — the delivered-file sha256 `e9e6e01a…`, the exact `NOW.md@ee3b6e1` line anchors (`:3`, `:5`, `:7`, with the `:8` contradiction), the separate Appendix A/B, the explicit final-byte gate arithmetic, and `dispatchAsync` call-site detail.
- **hy4 v3** — the operating-rules block (High Councillor rank, state ladder, receipt law, network-hygiene command, "finish all work before you respond"), the product-constraints section, and the source appendix. Its make-live authority question is now CLOSED by the Owner: deployment is Cloudflare, by Claude + the Owner.
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
| 2 | **P2** — w89 panel + draft-button look (§3), ring REMOVED | w89 glass panel treatment and rounded radii ported to the cakepanz shell (light + dark tokens); w89 draft-button treatment on the existing Draft controls; **per-player description copy kept verbatim** (new named law, falsified); no ring, no `cp-suggest`/`cp-quick`, no `rawSort`, no paired INTERIM oracle, no L13 ring law; contrast 2/0; 390 px clean; 0 console/page errors; engine files untouched. Re-measure and state the board/visual counts you actually observe — do not copy a number from here. |
| 3 | **P1** — handoff/receipt accuracy, no product bytes (§4) | the cleanup grep in §4.12 shows only corrected prose or explicitly labelled REPORTED child-log references. |
| 4 | Docs, zip, delivery (§9) | full gate set re-run at final bytes; zip sha256 printed; delivered by §0.1's gate with `ls-remote` output or a download link; state plainly what you did NOT do. |

**P0 is fixed first. There is no ring and no glow-last ordering in this version** — the Owner removed the ring; §3 is now a panel/button restyle. P3 ideas (§7) are input, not this sitting's scope. There is no open scope question (§10).

---

## 0.1 · WHO YOU ARE, WHAT YOU OWN, THE FENCE, AND THE DELIVERY REALITY

1. **You are Z.ai**, Executor of Z-post-blue (single-file HTML waves) and 67 Cakepanz (the parallel Colors UI track), a High Councillor below the Architect (Claude). You own the `67-cakepanz/` UI shell, the S14 package/handoff and the deploy report.
2. **Two trees, do not confuse them.** `colors/` on the Architect's branch `architect/engine-and-seats` is **his** tree (single-sourced engine plus product). `cakepanz-4/` is the root folder inside your S13 zip — **your** tree, the one you edit. All relative paths below, except explicit `colors/` ones, are inside `cakepanz-4/`. The pin path `colors/src/sports/nfl/view/draftBoard.ts` has **no** `engine/` segment; your shell mirror is `src/engine/sports/nfl/view/draftBoard.ts`.
3. **Lane split (Owner):** Claude owns the engine, its contracts and the merge, and alone writes `Football-Sim-*.html` and `colors/`. **Deployment is Cloudflare, by Claude + the Owner (Owner ruling 22:4xZ).** You do **not** deploy and do **not** make a site live; gh-pages is no longer the target and the make-live question is closed. Multisport is parked: "OWNER FINAL: ship 76 Pancakes" stands.
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
   Then work. There is no open scope question in this version — the Owner closed it on 22:4xZ.

---

## 1 · S13 VERDICT AND WHAT IS SETTLED

### 1.1 The verdict is `improved`

Your S13 engineering is real and independently reproduced by five seats; do not redo it. Package **445 OK / 0 FAILED / 0 missing**, converse clean, exit 0. Engine **430/430** · node **35/35** · board **16/0** · slot **28/0** · visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/45** (390 / 768 / 1280 × 15 surfaces, 0 overflow) · 0 console/page errors. Golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`). A clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`. The four prior-round fixes are real and lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a planted-extra fixture; the c11 "diff" re-host defect (a byte-identical re-host of c10 — applying both makes GNU patch reverse the first) and its reconstruction recipe are documented. The handoff package shape is right. The verdict is `improved`, not `ok`, because of **one behavioural defect** (§2) and **a set of receipt-accuracy defects** (§4). The former ring correctness gap is withdrawn by the Owner (§3.1); it is not part of this verdict or this scope.

Five seats reviewed S13 (four filed full gate re-runs, one filed the behavioural-probe fix); three also filed second-order reviews of their peers' reviews. They converged on the list below. There is no dissent on substance.

### 1.2 Product frame and what to treat as established

- The product is **76 Pancakes** (Owner, final); framework **Svelte 5 + Vite**. Offline is a hard requirement.
- On the last council record the deployed gh-pages `67-cakepanz/` carried an earlier slice set; the S14 package closes that gap. Verify live state if you need it, label it `REPORTED`, and do not assert it as a fact you own.
- `dispatchAsync` is defined at `colors/src/sports/nfl/app/store.ts:147` (pin `408410477`). **Two trees, two call-site counts — re-check which one you hold:** the DEPLOYED `origin/gh-pages:67-cakepanz/src/App.svelte` has **3** sync sites (`:56 START`, `:80 PICK`, `:84 UNDO`, zero `dispatchAsync`); your **S13 c12 tree** has **4** (`:148 START`, `:178 PICK`, `:184 UNDO`, `:208 LOAD`). Build slices 3-5 on the c12 tree. **The Architect's contract `claude/dispatchasync-contract-2026-11-20.md` is PUBLISHED** on `origin/architect/engine-and-seats` at `dac331e` — read it verbatim; its §2 table cites the deployed 3 sites, so map them to your c12 4 sites when you edit. Its §5 is self-corrected: `slice1.battery.mjs` has no `dispatch`/`getState`/`__cp` references, so it drives the built UI and needs timing changes only. Keep W12 green and name the dependency in your handoff.
- The post-Colors shell plan is **PARKED** until Colors ships — context, not a task. No c10 re-cut, no passGap re-run, no ring work of any kind (the Owner removed it).
- Prior fix-round constraints hold; flex is protected — do not change any flex number.

### 1.3 Settled — do not reopen

- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`; the printer at `:90` emits `DIED` only when that is true. The final log's F20 line reads `DIED — FAIL L16` only because `dieReport` prints `fails[0]` (L16 runs at `board.battery.mjs:115`, L13 at `:295`); L13 is in the failure set, which is why the case died. Two seats filed the F20 child log with the literal `FAIL L13 … ids WRONG` line: `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`) and `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (README plus ports 4665–4673). **Do not re-run it.** Do file child logs with future falsifier runs.
- **T8 is READY, not blocked.** Repair file **6,418 B**, md5 `0a2869538a706e7e6ea864664b7e5c9f`. The note `inbox/20261120-1814-zai-T8-c10-hosts-READY.md:9` already uses the correct `deliveries/receipts/slice1-battery.json` path — an earlier `deliverables/` claim was withdrawn. **Do not "fix" that note.** Copy the pinned bytes; never regenerate — `slice1-battery.json` is run-variant, so a regenerated receipt cannot satisfy the pinned md5. The 48/1 versus 49/49 tension on one host is a prepared-restore versus slice-repair distinction for Owner/Beam, not your task.
- **Contract A and Contract B are both WITHDRAWN** by the Owner's 22:4xZ ruling (§3.1). Do not re-litigate A-vs-B and do not file a `rawSort`/Contract B proposal. The five historical voices were Beam, PORCA, HY4ORCA, ORCATIDE and an earlier pickle voice — history only, not scope.
- **Multisport parked is the Owner's final word.** No plan-M review, no sport-two pick, no council wait.

---

## 2 · P0 — FIX THE BEHAVIOURAL DEFECT FIRST (before the visual restyle)

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

## 3 · P2 — THE W89 LOOK: PANELS + DRAFT BUTTONS, RING REMOVED

### 3.1 The Owner's word, verbatim — and what it overrides

> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare. the panels are still too boxy in cakepanz and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

Full context and the earlier quote it supersedes are in the council record `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`. Read literally:

1. **The ring is REMOVED.** Not deferred, not renamed, not "correctness filed for later." Delete it from this sitting. This supersedes the earlier S14 direction to revive it. The Architect's `NOW.md:7` "RING: DROPPED … Do not revisit before ship" is now right in scope as well as in lane — do not edit his file, and stop treating that line as a conflict.
2. **The visual target is still w89** — "i want the draft button to look like w89" from the same exchange stands. So: port the w89 look to the draft board, but as plain visual styling on the controls you already have, not as a selection/suggestion mechanism.
3. **The panels are the named complaint.** "Too boxy … not as colorful or beautiful as w89." This is a real, receipted task, not a vibe. §3.2 gives the exact, measured gap and the replacement.
4. **The small per-player descriptions stay.** "i do like the small descriptions of why each player we should keep those." Lock them with a named law (§3.5) so a future restyle cannot quietly strip them.
5. **Deployment is Cloudflare by Claude + Owner.** You do not deploy. gh-pages make-live is closed, not open.

### 3.2 The measured boxiness gap (VERIFIABLE — re-check each line before you edit)

w89 (`origin/gh-pages:Football-Sim-Z-post-blue-w89.html`, bytes at the hash verified this round):

```
sed -n '625,626p' Football-Sim-Z-post-blue-w89.html
# .panel{background:var(--glass);border:1px solid var(--glassbd);border-radius:22px;box-shadow:var(--shadow);
#  backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);}
sed -n '494,497p' ...   # light root: --glass:rgba(255,255,255,.58); --glassbd:rgba(178,124,96,.16);
                        #            --fieldbg:rgba(255,255,255,.5); --shadow:0 10px 34px rgba(163,113,84,.10);
sed -n '534,537p' ...   # dark root: --glass:rgba(38,28,33,.55); --glassbd:rgba(233,196,160,.12);
                        #           --fieldbg:rgba(255,255,255,.05); --shadow:0 10px 34px rgba(0,0,0,.38);
```

cakepanz c12 (your tree):

```
sed -n '80p' src/lib/assets/shell.css
# .cp-panel { background: var(--panel); border: 1px solid var(--hairline); border-radius: var(--r-md); padding: 14px; margin: 0 0 14px; }
grep -n 'r-md' src/lib/assets/tokens-w89.css      # :69  --r-md: 8px
grep -c 'var(--r-md)' src/lib/assets/shell.css     # 7 panel/card users
grep -n 'glass\|shadow' src/lib/assets/tokens-w89.css   # NO matches: c12 has no --glass/--glassbd/--shadow at all
```

So the gap is concrete: **8px flat solid fill, no shadow, no blur** versus **22px glass, hairline glass border, 34px soft shadow, 14px backdrop blur**. That is the boxiness. There is no colour gap in tokens alone — c12 already carries w89's rose/gold family (`--panel2:#f9e9f0`, `--sub:#885261`, `--gold2`, `--rosehair`) — the flat fill and 8px corners are what read as "not beautiful."

### 3.3 Do this — panel restyle, shell only

1. **Add the three missing tokens to `src/lib/assets/tokens-w89.css`, in BOTH the light and dark roots.** Use w89's values, adapted to c12's existing palette (do not invent hexes): glass fill from the existing light panel at 58% alpha, glass border from `--rosehair` at reduced alpha, shadow from the existing token shadow family. State each resolved value and the c12 token it derives from in your receipt. Label the derivation **calculated** (AGENTS.md §7): `color-mix(in srgb, var(--panel) 58%, transparent)` and `color-mix(in srgb, var(--rosehair) 45%, transparent)` are acceptable if they resolve to the same visual family — verify in both themes.
2. **Restyle the panel family in `shell.css`**: `.cp-panel`, `.cp-empty`, `.cp-gamecard`, `.cp-pcard`, `.cp-chipstat`, `.cp-champbanner`, `.cp-award`, `.cp-shareprev`, `.cp-brackround` (they already share `var(--r-md)`). Use the new `--glass`/`--glassbd`/`--shadow` tokens and a 22px radius for the large panels; keep 12–16px for small chips so a 390px row still fits. Add `backdrop-filter:blur(14px) saturate(1.2)` with the `-webkit-` twin, exactly as w89 does.
3. **Do not change a protected constant, an engine file, or any board column.** This is `src/lib/assets/**` and component styles only. `git diff 408410477 -- src/engine` must stay empty, and `colors/src` stays byte-identical.
4. **Contrast is the gate, not the vibe.** Re-run the contrast battery and keep it **2/0**. If a glass fill breaks a text pair, fix the text token for that surface and re-measure — never silently darken a shipped pair. 390px no-horizontal-scroll and 0 console/page errors are unchanged hard gates.

### 3.4 Then the draft-button look (visual only, no ring)

Port the w89 CTA treatment from `Football-Sim-Z-post-blue-w89.html:700–740` — Cinzel-style caps, the 6-stop liquid-metal gradient, the travelling `::after` sheen (`fxshine`/`zpbsheen`), the cream text halo and the 38px shadow — onto the **existing** Draft controls in your shell (`BoardFooter`/`BoardHeader` draft button and Team Select's `cp-ts-go`), using your existing `--gold`/`--gold2` custom properties, not new hex literals. Reconcile against the file's real bytes, do not invent a third treatment. Keep `prefers-reduced-motion` disabling the sheen (w89 `:948` pattern). This is styling on controls that already exist — **no new button, no suggestion affordance, no `cp-quick`**.

### 3.5 Keep-the-descriptions law and the removals

1. **New named law — "DESC-1 the per-player explanation copy is present and readable on every row."** Assert, from the rendered DOM at a sampled early/mid/late pick, that each available row still shows: the `CAP` captions (`BoardRow.svelte:14–18`), the gone% method copy (`:39` tooltip, `:53` screen-reader source, `:61` expanded explanation), the "Fills …" label (`:56`) and the w89-equivalent `.narr` copy. Falsify DESC-1 by name: a mutant that removes or hides any of those strings must make **DESC-1 DIE**, child log filed. This is the Owner's "keep those" ruling made enforceable. Report which battery hosts it and its final count.
2. **Remove the ring wiring, receipt the absence.** Delete `suggestIds` and the `suggest` prop in `DraftBoard.svelte` (`:6`, `:69–84`, `:108`), the `cp-suggest`/`cp-quick` branch and CSS in `BoardRow.svelte` (`:23`, `:42–48`, `:81–88`, `:121–132`), and re-point every ring-dependent law in `batteries/board.battery.mjs` (L13 `:275–295`, L16, and whichever of L17/L18/L19/L21/L22 assert a `cp-suggest`/`cp-quick` node). Do not leave a `cp-suggest` locator in a law whose feature is gone — that is a dead test, not a green one. Re-measure the board battery and state the exact count you observe; do not carry forward 16/0 or invent a replacement number. File a `grep` receipt showing no `cp-suggest`/`cp-quick`/`suggestIds`/`rawSort` remains in `src/lib` or `batteries`.
3. **No engine proposal.** Do not file a `rawSort`/Contract B §5 proposal — that work is withdrawn, not blocked. The pin stays byte-identical because there is no engine change to make.

### 3.6 Deferred / not in this scope

Keyboard-first pick, copy-draft-link and the other §7 P3 ideas remain input, not scope. Do not execute them.

### 3.7 Do NOT

Re-introduce a ring or a one-click suggest button under another name; edit `colors/` or `src/engine/**`; file a rawSort proposal; add board columns or new hex literals; let the restyle break contrast 2/0, the 390px law, or 0 console/page errors; treat a gate PASS as product acceptance; deploy anywhere (Cloudflare is Claude + Owner).

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
11. **Battery hygiene after the ring removal.** With `cp-suggest`/`cp-quick` gone (§3.5), delete the ring-present guard and the ring-dependent laws rather than re-using them; a `ringPresentGuard()` helper has nothing left to guard. Add one shared DOM/visibility guard for the new DESC-1 description-copy law so it cannot pass on a hidden node. Consider `history.replaceState` call-count assertions in W12/W13 so a double-write is caught. Also correct the §4.5 F20 example: its `DIED — FAIL L16` wording describes a law that no longer exists; keep the historical log as REPORTED history and do not re-run 13b.

### 4.12 Prove the cleanup

```
grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>
```

Remaining hits must be corrected prose or explicitly labelled REPORTED child-log references.

---

## 5 · PRODUCT CONSTRAINTS (unchanged, non-negotiable)

- **Offline is hard:** no CDN, no network, no paid API; boot from vanilla `file://` (`npm run distfile` → `dist/single.html`) — the tent-in-the-woods test.
- **Responsive:** 390 px no horizontal scroll; keep 768 and 1280 at 45/45.
- **A11y:** values announced (not bare column names), keyboard reachable, visible focus, reduced motion honoured (the w89 sheen/pulse turns off). Six AA contrast holes are known and pre-existing (3 team-ink, 3 token); **fail on NEW holes**, measure and propose options, do not silently change shipped theme tokens.
- **Style:** integers except Wins/Priority one decimal; plain informative language (no "expected scoring", no "before kickoff"); user's team in blue (`.ub`); "2-Pt Conv" except in the Guide; every turnover named; overtime events only in the overtime block.
- **Golden:** regenerates only on a deliberate, receipted re-pin/change.

---

## 6 · PROOF STANDARD AND GATE COUNTS

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch or applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**; every named law is **falsified by name** — a mutant kills it, the receipt names it, and the child log is filed.
- Labels on every claim (§0.1.6). No engine edits, pin moves, ratings or protected-constant changes. Never edit the Architect's product HTML. **The bytes win over this document** — re-read every cited line, count and hash before relying on it.
- Re-run the full gate set at your **final bytes**: engine 430/430 · node **35/35 (W14 is NOT here)** · board = the S13 board laws MINUS the ring-dependent ones you removed, re-measured · visual = the 17 S13 laws + **W14** + **DESC-1** and the panel-restyling law, re-measured · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast **2/0** · viewport **45/45 with 0 overflow** · golden MATCH · both gate checks PASS/CLEAN · falsifiers by name with child logs. **Do not copy a count from this document.** The S13 baselines were board 16/0, slot 28/0, visual 17/0 (`deliverables/CUTOVER-CHECKLIST.md` Gate B); they are the *starting point*, not the answer — §3.5 removes ring laws and adds DESC-1, so the final board/visual numbers must be the ones you actually observed. The Owner's "15/0" phrase was the **c12 baseline for board and visual only** (slot was never 15/0). The `26 pass` slice figure in the Architect's runbook is from `deliveries/receipts/swap-test.log` at the OLD pin `7a0706df…`; the S13 final-bytes receipts (`c8-slice-battery.log:45`) report **29/0/10/3**. State where DESC-1 and the panel law are hosted and give every final count explicitly.

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
- NOW.md at `dac331e`: the false "11 files differ" lane error is gone; React is gone. Its `NOW.md:7` "RING: DROPPED … Do not revisit before ship" is now correct in scope too (the Owner removed the ring). `MERGE-CHECKLIST.md` is banner-marked SUPERSEDED by `claude/cutover-runbook-2026-11-20.md`. The remaining UNKNOWNs are the Architect's lane: name them in your bulletin, do not edit them. The authoritative cutover gates are 1–10 in that runbook; its §5 rollback is a procedure the Architect executes, not text to copy into your work order.
- hy4orca's "Contract B consensus" label is **history only** — both contracts are withdrawn by the Owner (§3.1). An earlier objection was withdrawn; the whole dispute is closed, not won.
- A gh-pages re-point patch exists (tests-only import paths; flex count 99) but is not applied to the deployed tree. **gh-pages is no longer the target**: deployment is Cloudflare by Claude + the Owner (§3.1). Do not apply the patch as a deploy step, do not force-push; the prior tip is the rollback pointer only.
- **w89 save-key collision — CHECKED, no collision.** In `Football-Sim-Z-post-blue-w89.html`, `KEY='zpb:season'` at `:18080`; other keys are `zpb:tab`, `zpb:tabAt`, `zpb:theme`, `zpb:base34`, `zpbPlayerProfiles`. `grep -c 'sim:nfl' w89` → `0`. The new build's `sim:nfl:draft` envelope does not overlap any w89 key. Label VERIFIED (grep of that file); keep the runbook's check as belt-and-braces if another w89 build exists.
- **CLOSED by the Owner (§3.1):** hy4orca's make-live authority question is moot — gh-pages make-live is no longer the deployment path. Claude + the Owner deploy to Cloudflare; you neither deploy nor make anything live. State that in your bulletin; do not re-open the question.

---

## 9 · DEFINITION OF DONE / DELIVERY

1. `node tools/verify-package.mjs .` from your tree root → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe in both directions, then the full visual battery with W9/W12/W13/W14 green (report the exact count you observe).
3. Panel + button look (§3): w89 glass panel treatment and 22px radii on the shell panels (light + dark tokens derived from c12's existing palette), the w89 draft-button treatment on the existing Draft controls, **DESC-1 green** (description copy proven present at early/mid/late picks and falsified by name), the ring and every `cp-suggest`/`cp-quick`/`suggestIds` locator removed from `src/lib` and the batteries with a `grep` receipt; no engine proposal, no `rawSort`, no INTERIM labels; contrast 2/0, 390 px clean, 0 console/page errors. State every final count you observed.
4. Engine untouched: all 69 `src/engine/**` files byte-identical to `408410477`; `git diff 408410477 -- src/engine` empty and `git diff 408410477 architect/engine-and-seats -- colors/src` empty.
5. All §4 corrections applied and the §4.12 cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner and `START-OF-CHAT-ZAI.md` §2. Write one bulletin entry with the tree hash and the exact commands you ran.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin plus paperwork), `unzip -t` clean, print its sha256. **Deliver by the §0.1.9 gate — a pushed commit hash plus `git ls-remote` output, OR a download link for the zip plus its sha. Never a sandbox path, never a push you did not make.** Given §0.1.11, expect route (b) and say so. **Do not deploy and do not make-live** — Claude + the Owner deploy to Cloudflare (§3.1); the gh-pages/Beam step is closed. No force-push, no stash, no "merged"/"final"/dated root copy.
8. State plainly what you did NOT do (no engine/pin/governance edits, no deployment, no ring, no second sport).
9. Rollback pointers, **for the record only**: w89 `index.html` sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`; gh-pages tip `66096fb1` at S13 note time. These are history now that Cloudflare is the target; do not touch them.

---

## 10 · DECISION BOUNDARY — NO OPEN SCOPE QUESTION

**General rule:** choose a sensible default and proceed without a message when the choice is reversible and technical. Recommend a default in one line and proceed on everything it does not block when the choice is ambiguous but reversible. Stop and name it for the Owner/Architect (≤5 questions, each with a recommended default and what is blocked meanwhile) **only** for an irreversible or externally visible action, a protected constant, or a real product call. Silence is never approval of the last three.

**There is no open scope question in this version.** The Owner closed the only one on 22:4xZ: remove the ring, restyle the panels toward w89, keep the per-player descriptions, deploy to Cloudflare (Claude + Owner). Proceed on all of §0's table. The one interpretation recorded in `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md` is that the w89 *button* treatment is a visual style, not a ring — keep it, but if the Owner says otherwise that single line can be retracted without affecting anything else already built. Do not stop the sitting.

---

## 11 · EXPLICITLY NOT IN SCOPE

Engine edits, pin moves, ratings, second sport, seat-authored product HTML, governance or queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A-vs-B, **any ring/suggest/`rawSort` work**, deploying or making-live anywhere (Cloudflare is Claude + Owner), starting the post-Colors plan, re-cutting c10, re-running passGap, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell.

---

## APPENDIX A — SOURCE RECORD (attribution only; you do NOT need to open these)

Facts above were assembled by one Verifier from every seat's S14 draft, read 2026-11-20 20:45–21:34Z: ernie `2005`, `2030`, `2100`, `2130` v3; hy4 `2038`, `2115` v2, `2130` v3; porca `2040`, `2115` v2, `2125` v3; iceman `67-cakepanz-13-2026-11-20/PROMPT-ZAI-CONTINUE-S13.md`; pickle `2034`, `2041`, `2042`, `2045`, `2109`, `2110`, `2126`, `2127` v4. Corrective evidence: pickle `inbox/20261120-2034-pickle-ERRATUM-contractB-ring-law.md` (the L13-oracle correction) and `inbox/20261120-2126-pickle-REVIEW-v2-drafts-hy4-porca.md` (the `rawSort` pin-boundary correction, verified against the delivered bytes). Comparisons: `inbox/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md` and the four-draft conflict-resolution table in this file's header. Anything here that disagrees with an earlier draft is deliberate: the pin boundary, the visual-only W14 battery, the delivery gate and the explicit final-byte gate counts are the intentional supersessions. v7 adds a sixth, decisive one: the Owner's 22:4xZ ruling (`inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`) withdraws the ring/Contract B/rawSort/INTERIM-oracle chain, closes gh-pages make-live in favour of Cloudflare, names the panel restyle, and locks the description copy — all previous ring scope is history, not deferred work.

## APPENDIX B — GLOSSARY (so this document needs no other source)

- **Seats/trees:** "Architect" = Claude, sole product writer, owner of `colors/`. "You" = Z.ai, owner of `67-cakepanz/`. **cakepanz-4** = folder inside your S13 zip; shell paths are relative to it. **pin `408410477`** = frozen engine snapshot you consume. **cutover** = the one deliberate merge of engine and Colors v1 by the Architect, not by a seat. **High Councillor** = your rank under the Architect; advisory, with edit rights outside his files.
- **Laws/fixes:** **D2/W12, R2/W13, b36/N35, L22** = four S13 fixes, each a finding paired with its battery law. **W6/W8/W9** = earlier autosave/restore laws; **W12/W13** = URL↔store-seed laws; **S29** = same-seed reload restores; **W14** = new shareable-link law (visual battery). **L12** = uniform board. **L13, L16–L23, `cp-suggest`/`cp-quick`** = the ring/glow laws and selectors — REMOVED by the Owner (§3.1); history only, do not re-create. **DESC-1** = the new keep-the-descriptions law (§3.5). **F20/13b** = closed falsifier history. A "law" is a named battery assertion; "falsify law X by name" means a mutant must make that named law fail and the receipt must name it.
- **Rounds/IDs:** c10/c11/c12, S13 (sitting just shipped), S14 (this order). **T8** = four-host slice-battery repair; READY, not blocked (§1.3). **F20** = falsifier case whose child log closed **13b** (CLOSED). **13b** = the board-falsifier dispute. **c12/S13 deploy** = the earlier deployment planned to bring the live site up to S13 slices; whether it went live is a deploy/Owner matter you neither own nor assert.
- **Contracts/targets:** **Contract A** = withdrawn `suggestions` proposal; **Contract B** = withdrawn raw-numeric-sort-on-VM proposal; **rawSort**, **INTERIM — display-rounded, awaiting rawSort**, **BLOCKED (engine half)** = labels belonging to that withdrawn chain — history only, do not use them as scope. **slotWins20** = engine's measured Wins impact per slot, source for the per-player explanation copy that DESC-1 protects.
- **Visual:** **w89** = latest Z-post-blue single file (`origin/gh-pages:Football-Sim-Z-post-blue-w89.html`) whose glass panels (`.panel` at `:625`, 22px radius + `--glass`/`--glassbd`/`--shadow`) and CTA buttons (`:700–740`) are the restyle target; **W66** = earlier wave whose comment describes the button treatment. `zpbBtnPulse` and `zpbstarglow` are its two button treatments — styling references only, not a selection ring. **Deployment** = Cloudflare, by Claude + the Owner (22:4xZ); gh-pages make-live is closed history.
- **Receipts:** **gates PASS/CLEAN** = `npm run distfile` passes and `node tools/verify-package.mjs .` reports converse clean. **golden seam MATCH** = shell's engine-facing view matches `e8fed8ab…`. **"§5 patch proposal"** = the exact-change form in `AGENTS.md` §5 of the council rules (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK), filed as a file in your own `inbox/` — **not** §5 of this document (the product-constraints section) and not an edit to another seat's tree.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— pickle (council seat; Verifier of the S13 review round). This is a synthesis of the four latest S14 drafts with every conflict resolved in favour of the delivered bytes. No product, engine, pin, governance or other seat's file was edited to produce it.

---

## POINTER PROMPT FOR THE RELAYER — NOT PART OF THE Z.AI BLOCK

Paste this to Z.ai when the full work order is available at the named ref. Replace `<sha256>` with the output of `git show HEAD:<this file> | shasum -a 256` after committing (a file cannot contain its own hash).

```
S14 — READ THIS FIRST, then do the work. Do not ask me to paste the order.

The full self-contained S14 work order is in the council repo at:

  origin/council/pickle:inbox/20261120-2250-pickle-TO-ZAI-S14-work-order-v7-self-contained.md

Get it with:
  git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch origin council/pickle
  git show FETCH_HEAD:inbox/20261120-2250-pickle-TO-ZAI-S14-work-order-v7-self-contained.md

Its sha256 must be <sha256> (verify with `git show ... | shasum -a 256`). It supersedes every
earlier S14 draft, including v6 and any prompt you were handed before. Read it in full before
touching a file — it needs no other source. Then follow §0.2: post the READ / STATE / PLAN /
BLOCK / RISK lines, prove the pin, and work through §0's table in order (P0 first, then the
panel/button restyle). **The Owner has removed the ring — build none of it. Deployment is
Cloudflare by Claude + the Owner; you do not deploy.**

If you cannot reach that ref, say exactly what failed (command + stderr) and I will paste the
same document verbatim. Do not proceed from memory or from an older draft.
```
