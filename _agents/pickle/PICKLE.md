# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
(OpenChamber-created sibling of `wt/pickle`)
MERGE-BASE: `1b91f50e` (`git merge-base HEAD origin/council/base`, re-verified 15 Nov 2026)

## Where the truth lives

Queue `_agents/QUEUE.md` on **`origin/council/muse`** (`council/base`'s copy is 63+ commits stale). Tool:
`git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`, delete before pushing. START-HERE step 0
(four governance docs from `council/muse`) first, every chat.

## Current state (15 Nov 2026) — P-345 Part A: the three-list comparison, and the λ dial closed by arithmetic

Prompt taken: `_agents/inkling/deliveries/prompt-ds-pickle-glm-innovate-inkling-2026-11-14.md` v2 @
`council/inkling` `a231c7e8` (Parts A + H + one stop; B/C/E are other seats').

- `inbox/20261115-1135-pickle-P-345-axis-comparison.md` — **the deliverable.** 24-row dedup table (axes only),
  7 collapses, the same-name/different-axis hazard, a species taxonomy (fluctuation / rule-regime /
  already-built design / ruled / policy / arithmetic), and the λ answer.
- `inbox/20261115-1136-pickle-stop-doing.md` — one stop (re-confirming closed facts in full filings; the 69/72
  is settled five times), one rule, and the honest answer on parallel Owner prompts.
- `_agents/pickle/deliveries/p345-axis-comparison-2026-11-14/{axis-bounds.py,RUN-axis-bounds.txt,inputs/}` —
  rerunnable: `python3 axis-bounds.py inputs/merge_prototype.py inputs/flex-99-live.json`. Inputs are Z.ai's
  shipped prototype + the **live** flex table (`0a26d7c2…`, same sha as `architect/engine-and-seats`).

**Findings that matter more than the table:**
- **λ(context) is dead as a dial by arithmetic, not policy.** Window `[0.3902, 0.4032)`; lower edge `WR>NICKEL`,
  upper `TE>SS`; `0.39` misses by **0.0002 λ = 0.001 raw**; tier vector identical across the whole window. The
  acceptance test needs `SE(λ̂) ≤ 0.003` (0.81% rel); the only route with a receipt (P-347 between-team, 32
  team-units) gives **12.7% rel → 15.7× short ≈ 248 seasons**. Fold count is not the variable.
- **The three lists are not one kind of object**: Claude's 8 + GLM's 6 = axes; Z.ai D.1–D.7 = features;
  D.8 = evidence; D.9 = code-read axes. Comparing them as one list is why BEAM's §2.1 went wrong twice.
- **Focus is a container, not four axes**: D.1's `FOCUSES` table already hosts Claude #3 (tempo), #4 (style),
  GLM #1 (policy). The reconciliation is Claude's registry slot taxonomy, not a merged list.
- **Engine walk (at `9acf1992`) reorders four rows:** no 4th-down decision layer exists and the 2-pt choice is a
  **0.22 coin** (`drives.ts:123`); pace is INFERRED constants (`drives.ts:9`); blowout compression is **built as
  a design** (`drives.ts:132-135`, margins unchanged by construction); the margin is a **quantile coupling**
  (`margin.ts`), so "σ 6.0" names neither the margin's parameter nor one site. `EMERGENCY_PENALTY` is `flex.ts:34`.

## Earlier sessions (compressed; detail in git history)

- **14 Nov** — P-355 second pass (`inbox/20261114-1631-…engine-doctrine.md`): Z.ai blobs 255/255 + 20/20; D16/D1
  contradicted/superseded; AGENTS.md l.50 vs l.73 self-contradiction; doc-sync re-derived; λ feasibility.
- **13 Nov** — platform-vision probe + self-correction + review of the round's four filings. My probe had used a
  stale local ref; the re-run killed two of my own "corrections". **Lesson kept: state the ref in the same
  sentence as the number.**
- **12 Nov** — P-346 third review (69/72, CRLF mechanism); P-347 λ budget 3.63 pts/SD, band [2.50, 3.63].
- **11 Nov** — P-141 third review; `playerWar` = 0 for every FB and P (real defect, still unfixed AFAIK).

## What the next session needs

1. **Check whether MUSE acted** on the `PRIORITY+` (AGENTS.md l.73 REV 4 / QB −10 vs live 99-table QB→FS 12;
   `PROJECT-KNOWLEDGE.md` 97 → 99). Every seat still reads the stale line.
2. **The λ question needs a second seat.** I cannot close my own number: ask a verifier to re-run
   `axis-bounds.py` and the 15.7×/248-season arithmetic. Until then §6 of the filing is REPORTED-by-me.
3. **Part B is still unclaimed** (GLM's). My `[NEW]` rows 22–23 (rivalry as play-calling; opponent's structure)
   are stated only well enough to be killed — if nobody takes B, they die by default.
4. **P-355 is still two passes, not a register.** My rows + ERNIE's addendum + INKLING's three. A different seat
   should merge, not me.

## Open questions (to the Architect / Owner, never to a seat)

- Architect: is the λ acceptance rule "a context cell may not make a second row unsatisfiable" (a count), rather
  than "λ(context) beats fixed"? The count version is cheap and fold-free.
- Architect: strike or mark D1/D16 in the 13 Nov assessment? Both are advice the Owner has since contradicted.
- MUSE: AGENTS.md l.73 — delete the REV 4 sentence or rewrite to 99 rules (QB→FS 12)?
- Owner (from P-347): λ default 3.6 (NFL parity) or lower for upsets? Band [2.50, 3.63].
- Owner (from P-141): punters valued/drafted as kickers under "K↔P free"?

## Live files

- `inbox/20261115-1135-pickle-P-345-axis-comparison.md` · `inbox/20261115-1136-pickle-stop-doing.md`
- `_agents/pickle/deliveries/p345-axis-comparison-2026-11-14/` (axis-bounds, inputs, RUN)
- `_agents/pickle/deliveries/p345-lambda-followup-2026-11-13/{dial-feasibility.py,RUN.txt}`
- `_agents/pickle/deliveries/p345-lambda-budget-2026-11-12/` · `platform-vision-2026-11-12/` ·
  `p141-engine-harness.mjs`
- `tools/mathlab/flexrebuild.mjs`, `flexverify.mjs`, `flex-owner-2026-11-09.json` (mine, this branch)
- **No product HTML edits, ever.** Work → `inbox/`; code → `_agents/pickle/deliveries/`.

## Standing recipes

- **Blob-first**: `git show <ref>:<path>` / `git archive <ref> -- <dir>` → temp dir. Print the sha you resolved;
  refs move mid-session (`council/ernie` moved `218bbafa`→`b5b6da5b` while I worked).
- **zsh eats `$VAR:c`** — `${A}:path`, always.
- Manifests: report rows **and** file count; an unlisted manifest is correct, not an error.
- macOS: `/tmp` is a symlink; use `/private/var/folders/...`. Patch a **copy**, never the product.
- **A number is only as good as the ref it was run against.** State both in one sentence.
