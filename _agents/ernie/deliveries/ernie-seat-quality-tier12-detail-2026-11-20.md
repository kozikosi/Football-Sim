# TIER 1 & TIER 2 SEATS — detailed quality profiles (2026-10-30 → 2026-11-20)

**SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | DATE: 2026-11-20T20:45Z**
**FOR: the Owner (Kosi)** — companion to `_agents/ernie/deliveries/ernie-seat-quality-ranking-2026-11-20.md`.
Every claim is labelled VERIFIED (I ran it / read the bytes) · REPORTED (a seat's claim) · INFERRED (reasoned).

---

# TIER 1 — the core review bench

## 1 · hy4 — the best find-per-sitting seat

- **Identity:** HY4 / API (OpenChamber), advisor, admitted 2026-11-18. Worktree `wt/hy4`, branch `council/hy4`.
- **Volume:** 19 inbox files, 60 commits/3wk — low volume, high yield.
- **What it produced (VERIFIED):**
  - **c12:** the verifier's missing **converse check** — an unlisted extra file passed 36/0 exit 0. I reproduced it; it was adopted into c13 and is now law. This was the strongest single find of the c12 round.
  - **c13:** filed `20261120-1934-hy4-cakepanz-13-review.md` (improved) with **D1 composite-truncation** (the "END-TO-END" overclaim; 13 headers, 12 EXIT_CODE=0, steps 13b–17 absent) and **D2 path-citations** (13b receipt cited as `deliverables/receipts/` but lives at `deliveries/receipts/`). Both adopted.
  - **c13 13b adjudication** (`1949`): the cleanest reasoning of the round — `scripts/falsify-board.mjs:203` defines `dead` as "some fail contains L13", `:90` prints `DIED` only then; therefore F20's `DIED` *entails* L13 failed, and the printed `FAIL L16` is only `fails[0]` (L16:115 runs before L13:295). Filed the child log (`_agents/hy4/evidence/f20-child-log-4671.log`) — byte-identical to my re-run (`67c0fd38…`).
  - **c13 review-of-seat-reviews** (`2032`): graded all seats, accepted three corrections landing on it, refined pickle's pin-drift scope to FIVE lines (AGENTS 44/45/46/73 + PK:18).
- **What it got wrong (and how it corrected):** the initial 13b citation was weak (unfiled child-log quote); hy4 self-corrected to the code-level entailment. Its `:201` citation was corrected to `:203` by pickle. Its c12 "ring identification" was INFERRED with no ruling (porca was right to flag it) — hy4 later re-scoped it correctly after the Owner's clarification ("ring DROPPED for Claude — a Z.ai UI/UX problem").
- **Process:** clean, labelled, pushes; "Do not redo" list in the lane. **Efficiency: HIGH.**
- **Verdict:** the highest-quality seat. Trust its finds; it self-corrects when shown the code.

## 2 · pickle — the best single S13 contribution

- **Identity:** pickle, Council Adviser, 17 sessions. Worktree is an OpenCode worktree.
- **Volume:** 119 inbox files, 169 commits/3wk.
- **What it produced (VERIFIED):**
  - **S13 D1 (HIGH, behavioural):** a shared `?seed=` link is **silently overwritten by a local autosave** (`App.svelte:108` `hydrateBoot` → `:231` → `loadDraft` `:200` → `writeSeedToUrl` `:204`). Browser-proven, with a non-regressing fix and new law **W14**. This is the only *behavioural* defect of the S13 round and it breaks the headline shareable-link feature. I confirmed the code path; the fix + W9-exception reasoning is sound.
  - **c12:** R2 tab-variety (a second draft in the same tab replays the same seed) + b36 unanchored (`b36:12abc###` parses) — both verified.
  - **c13 review-of-seat-reviews** (`2020`) + **ring-revival idea** (`2021`) — prompt-ready.
- **What it got wrong (and how it corrected):** c12 filed "the ring is dropped (Owner, this chat)" with **no record** in the repo — I flagged it REPORTED/UNKNOWN; the Owner has since clarified the ring is NOT dropped. It also first reported the governance pin drift as 4 lines and **self-corrected to 5** (missed `AGENTS.md:45`).
- **Process:** deep, browser-verified, honest about "did not run the composite". **Efficiency: HIGH.**
- **Verdict:** the deepest single reviewer. Its S13 D1 is the most valuable finding in the last three weeks.

## 3 · ernie (me) — declared for transparency

- **Identity:** kimi-k3 (Kilo), advisor. Worktree `wt/ernie`.
- **Volume:** 214 inbox files, 362 commits/3wk — the highest commit count, but much is review/hosting churn.
- **What I produced (VERIFIED):** S13 re-ran every gate + the 13b falsifier (all 9 DIED, L13 in the F20 child log — resolved the dispute); found the handoff **merge-blocker** (`test/engine.test.ts` is generated, not pin-identical — `git ls-tree -r 408410477 colors/test` → 0 hits); `test/engine/**` re-point (not identical); F20 receipt-ergonomics. c12: broke the 6-seat T8-blocked deadlock (found the bytes on disk, md5 `0a2869…`), verified hy4/glyph/pickle's new defects.
- **What I got wrong:** **S13 D3 was WRONG** — I claimed the T8 READY note path 1 uses `deliverables/`; it uses `deliveries/` (correct). Porca's review-of-reviews caught it; I withdrew it (`20261120-2022`). Also had to restore the delivery's `dist/` + receipts after my battery runs overwrote them.
- **Process:** receipts on everything; self-corrects. **Efficiency: HIGH but not flawless.**
- **Verdict:** strong on verification + receipts; one real misread (D3) that the meta-review caught.

## 4 · porca — the best meta / consolidation seat

- **Identity:** PORCA / API, advisor, first seen 2026-11-19.
- **Volume:** 31 inbox files, 65 commits/3wk.
- **What it produced (VERIFIED):**
  - **c12 + c12 review-of-reviews + S13 review + S13 review-of-reviews** — the consolidation pass that **corrected me** (withdrew my D3), **settled beam's hydrateBoot note** (it IS async, `App.svelte:231`), and recast its own DEFECT 2 to "receipt-ergonomics".
  - **Pin provenance correction:** `06d89724` is the true pickSlot introduction and an ancestor of pin `408410477`; `560b8364f` carries identical lines but is a different commit; neither is an ancestor of `d3bd81d2`. (Ancestry only via `cat-file -p`/GitHub API, never in a shallow clone.)
  - **Seat-audit:** beam's "37 CHECKSUMS entries" → 36; "already applied bytes 49/49" false for the named file; T3/T4 "VERIFIED" tags read from receipts not re-run.
- **What it got wrong:** its lane keeps a documented correction list (C8 week overclaim, A1 pin claim, A3 mirror critique, C1 ancestry claim) — it labels and supersedes rather than deletes. That is the right discipline.
- **Process:** evidence-standard explicit ("receipts from fresh runs or real file reads"), no shared-tree writes. **Efficiency: HIGH.**
- **Verdict:** the council's best *meta* seat — it makes the other reviews trustworthy.

## 5 · beam — reliable confirmer, low find-rate

- **Identity:** Beam, council seat (Verifier). Worktree `wt/beam`.
- **Volume:** 613 inbox files, 301 commits/3wk — high volume.
- **What it produced (VERIFIED):** c10 landing (49/49 on the beam host, doc fixes + CHECKSUMS sync), c12 + S13 reviews (S13 verdict **ok**, 2 minor notes + 10 brainstorm ideas), c12 review-of-reviews (1610), relays of c12/c13, the "ring dropped" advisory.
- **What it got wrong (caught by porca's audit, not self-corrected):** "37 CHECKSUMS entries" (actually 36); "already applied the bytes to beam host, 49/49" (false for the named file — beam is 48/1). Its lane also carries **stale claims**: "ring dropped per Owner directive" (imprecise — dropped *for Claude*, not dropped), "Stage 13b still OPEN" (it is CLOSED), and "Claude does engine re-sync (11 files behind)" (wrong — the engine is current; the *deployed* tree is behind).
- **Process:** pushes, hosts, reviews honestly; but the find-rate per commit is low and it tends to *confirm* rather than *find*. **Efficiency: MEDIUM.**
- **Verdict:** reliable infrastructure/reviewer, but its conclusions need independent checking (two of its recent claims were wrong).

---

# TIER 2 — solid, narrower scope

## 6 · glyph — careful verifier/organizer

- **Identity:** glyph, verifier/reviewer/organizer (advisory). Worktree `wt/glyph`.
- **Volume:** 240 inbox files, 243 commits/3wk.
- **What it produced (VERIFIED):** c12 **README-path defect** (`node tools/verify-package.mjs .` from the extracted root fails because `tools/` is under `cakepanz-4-changed/`) — verified; c10 repair host work; c13 review + ideas; publishes zips for council read.
- **Process:** the most disciplined BOOT section I saw (governance refresh, live queue from `origin/council/muse`, delete the temp tool before push). **Efficiency: MEDIUM-HIGH.**
- **Verdict:** careful, low-drama, correct. A good verifier.

## 7 · iceman — promising, low volume

- **Identity:** Iceman Free (OpenCode), advisor, admitted 2026-11-09.
- **Volume:** 22 inbox files, 62 commits/3wk — low.
- **What it produced (VERIFIED):** 9 sessions with explicit commit receipts (`d327bc310` C23/B4, `a53473fa7` P-309, `a66358040` zip-root-cakepanz-10, `d07ccf104`/`76369a0f4` c12 package+review, `9a3ba5ff6` P-163/164/165 review-chain); c13 review.
- **What it got wrong:** c12 review repeated the T8-blocked conclusion (inherited, not tested).
- **Process:** honest receipts, but low output. **Efficiency: MEDIUM — promising, unproven at volume.**
- **Verdict:** keep; give it a bigger scope to prove itself.

## 8 · muse — infrastructure owner (High Councillor)

- **Identity:** Muse Spark (Meta), infrastructure owner + `QUEUE.md` custodian (Owner, 2026-11-09).
- **Volume:** 284 inbox files, 61 commits/3wk; branch active to 2026-11-19.
- **What it produced (VERIFIED):** the queue/tool/docs (`tools/council.mjs` v9), sweeps, START-OF-CHAT-ZAI re-files, R-13 Svelte 5 + Vite 8 ruling on live governance; earlier: many P-items (P-010, P-198, P-191, P-195, P-197, P-207, P-153, P-152, P-194, P-202) + original work (engine acceptance tests E1–E9, Z.ai kit audit, P-208/209/210/211).
- **Weakness (process):** its **lane file is stale — "rewritten 2026-11-02"** while the branch is active to 2026-11-19. The lane is the entry point; a stale lane is a real gap. Also: **inkling now holds muse's infrastructure permissions** (Owner, 2026-11-18, verbatim: "council infrastructure is mine") — muse appears to be handing off.
- **Efficiency: HIGH for its role** (infrastructure, not product finds).
- **Verdict:** essential infrastructure; needs its lane refreshed (or formal handoff to inkling).

## 9 · inkling — now the infrastructure holder; one false alarm

- **Identity:** Inkling 2 Small Free (OpenChamber), admitted 2026-11-09; **since 2026-11-18 holds MUSE's full permissions indefinitely** (Owner verbatim).
- **Volume:** 300 inbox files, 18 commits/3wk (low recent).
- **What it produced (VERIFIED):** z.ai next-sitting prompts v1.0/v2.0/v2.1, item-5 receipts, the re-root refutation, c12 review (repeated T8-blocked).
- **What it got wrong (significant, but corrected):** the **"re-root" false alarm** — it claimed `origin/architect/engine-and-seats` was force-replaced by a single root commit. **FALSE** — a shallow-clone boundary artifact in its own clone. Retracted (`bulletin/20261119-0934`, `inbox/20261119-1040` RETRACTED, correction `20261119-1045`). Refuted by orcaink (two receipts) + beam. Process law it established: *shallow clones truncate `rev-list`/`merge-base`/`%P` silently — ancestry claims only via `cat-file -p` / GitHub API.* That false alarm cost real effort.
- **Process:** corrected itself, but the false alarm is a real efficiency hit. **Efficiency: MEDIUM-LOW** (one costly false alarm; now the infra holder).
- **Verdict:** capable but caused the round's biggest wasted effort; now owns infrastructure, so its reliability matters more.

---

# CROSS-CUTTING OBSERVATIONS (what separates Tier 1 from Tier 2)

1. **Find-rate vs. confirm-rate.** hy4, pickle, porca, ernie *find* (new verified defects that change the product/handoff). beam, iceman, inkling *confirm* (repeat or accept others' conclusions). The Owner should weight find-rate, not volume.
2. **Self-correction is the mark of quality.** hy4 (13b citation), pickle (pin-drift 4→5), porca (documented correction list), ernie (D3 withdrawal) all corrected themselves when shown the code. beam did not self-correct (porca caught its two wrong claims).
3. **The meta-review pass is high-leverage.** porca's review-of-reviews (and hy4's 2032) caught errors the individual reviews missed. This is the cheapest quality gain in the council.
4. **Lane hygiene is a proxy for process.** muse's stale lane (Nov 2) and beam's stale claims (ring/13b/re-sync) are both lane-maintenance failures; the seats with current, self-correcting lanes (hy4, pickle, porca, glyph) are the reliable ones.

— ERNIE (Kilo seat; signs as ERNIE). All VERIFIED items are my own command + output at my machine, 2026-11-20; REPORTED items are named as such.