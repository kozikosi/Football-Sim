# PICKLE — seat identity

SEAT: pickle
ROLE: Council Adviser
BRANCH: council/pickle
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
(OpenChamber-created sibling of `wt/pickle`)
MERGE-BASE: `1b91f50e161fa10d0607c8e09330115ffa27f1ff` (`git merge-base HEAD origin/council/base`, re-verified 14 Nov 2026)

## Where the truth lives

Queue: `_agents/QUEUE.md` **on `origin/council/muse`** (`council/base`'s copy is stale by 63 commits).
Council tool v9: `git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`, run with
`timeout 300000`, **delete before pushing**. Sync the four governance docs from `council/muse` at chat
start (START-HERE step 0), commit them separately.

## Current state (14 Nov 2026)

**P-355 second pass filed — engine/doctrine contradictions + a Z.ai delivery byte-checked.**
`inbox/20261114-1631-pickle-P-355-contradiction-register-engine-doctrine.md` (pushed `b406e46b`).
ERNIE's first pass covered the framework wave; nobody had registered the Architect's own 13 Nov
assessment. What I added:

- **Z.ai verified from blobs, not summaries:** `git archive` each delivery out of the commit →
  `shasum -a 256 -c MANIFEST.txt` → **255/255 OK** (`zai-open-wave-v3`, 256 files, manifest correctly
  unlisted) and **20/20 OK** (`zai-recovery`) at `council/ernie@b5b6da5b`. No finding. The circulating
  "753/753" is not that artifact (255 + 20 rows shipped) — per-delivery counts verify, ×3 aggregates don't.
- **Register rows:** D16 "remove react (implement now)" **CONTRADICTED** by the Owner's hold and by
  `colors/package.json` (which keeps react as a framework arm — tree obeys, register doesn't); D1 "drop
  the four-prototype test" **SUPERSEDED in practice, unretracted in text** (his `d3bd81d2` revises the
  recommendation, not D1); §2.1 calls all four drifted files "the flex-table work" when only `flex.ts`
  is a table (others: 2 comment lines / `measuredDisplayWeights()` / one comparison); §11's blockers are
  mostly answered and unmarked.
- **Live `AGENTS.md` contradicts itself:** l.50 = 99 rules (23/43/10/23), REV 4 RETIRED; l.73 = "QB may
  flex ONLY to FS, at −10 … `flex.json` (REV 4) governs". Table says QB→FS = **12**. MUSE's to fix;
  `PRIORITY+` filed. (`PROJECT-KNOWLEDGE.md:24` still 97-rule / 105.)
- **Doc-sync numbers re-derived:** 7 of 38 worktrees carry the live `AGENTS.md` (prompt says 0), 33 remote
  `council/*` branches with 32 at 63 behind (prompt says 14 at 61). Direction right, counts stale.
- **λ probe re-run with corrected feasibility** (`_agents/pickle/deliveries/p345-lambda-followup-2026-11-13/`):
  the Owner's 99 tiers are 97 inequalities on one λ. `C>OG` is structural (m 4.65, s 1.20, guard cap 12.50
  vs tier 6) — no λ fixes it, so V3 again by a second route. The other 96 admit one λ in a **0.013-wide**
  window **[0.3902, 0.4032)**. Tolerance: 2 rows flip at Δλ<0.01, 9 at <0.05. Maximin ±0.05 = 92 rows
  (λ=0.39) vs 91 (λ=0.40). **A fluctuating dial must be small (<±0.01) or hidden** — and "hidden" is what
  the Owner already ruled. Corollary: 0.39 vs 0.40 differ by 1 row of 97, so the λ-axis Lab must state its
  rule as "λ(context) beats the best fixed λ by more than the fold SD", never "λ should be 0.40".

Verified cheap this session (each has a command + output in the filing): `colors/index.html` boots
`/src/main.ts` and there is no `src/main.ts` (count 0 → build cannot succeed); 0 react imports in
`colors/src`; 0 `.github/workflows`; `envelope.ts` `SCHEMA_VERSION = 1` + `newer-version` refusal l.46;
45 root `.md`; engine surface 57 files (14 core + 1 platform + 42 sports); Cakepanz 10 `.svelte`.

## Earlier sessions (compressed; details in git history)

- **13 Nov** — platform-vision filing + its correction + review of the round's four filings
  (`inbox/20261113-0118-…`, `inbox/20261113-0145-pickle-review-platform-vision-filings.md`). My probe had
  named a local ref 8 days stale; the re-run at `bebe8e0b` changed four numbers (320 tests / 318 pass /
  2 fail; drift 52 shared / 4 differing; `design.json` identical) and killed two of my own audit
  "corrections" (no-philox was wrong; "284 not 318/320" was wrong). Verdicts: DS improved · GLM ok ·
  VL improved · or v2 improved. Fork vendored engine = library minus exactly 5 files (`events`, `fold`,
  `keyedrng`, `pack`, `legacyprovider`), and the repo's own `E5 pins` test is red.
- **12 Nov** — P-346 third review (69/72 on all three pushed copies; mechanism = CRLF manifest over LF
  commits, `.gitattributes` normalises on commit) + P-347 λ variance budget **3.63 pts/SD**, band
  **[2.50, 3.63]**, D4 dispersion bias +175% naive / +18% season-mean on real data (`b0cceaa5`).
- **11 Nov** — P-141 third review: re-ran Z-post-blue's engine in node (`deliveries/p141-engine-harness.mjs`,
  23/23 PASS). P math exact; FB/RB1 baselines mislabelled; K 0.45 does not reproduce; **NEW: `playerWar`
  = 0 for every FB and P** (Wins column + season grading), `gradeOf` peers pool FB+P+LS (`ebea4466`).

## Standing recipes that work here

- **Blob-first.** Measure with `git show <ref>:<path>` / `git archive <ref> -- <dir>` → temp dir. Never a
  working tree, never a summary. Print the sha you resolved; the shared object store moves refs mid-session
  (`council/ernie` went `218bbafa`→`b5b6da5b` while I worked).
- **zsh eats `$VAR:c`** — `$A:colors` becomes `engine-and-seatsolors`. Always `${A}:path`.
- Manifest checks: `git archive` out, then `shasum -a 256 -c MANIFEST.txt`; report rows AND file count,
  because "manifest excludes itself" is the correct shape and an unlisted manifest is not an error.
- macOS: `/tmp` is a symlink; use `/private/var/folders/...` absolute. Playwright at
  `/Users/kosi/node_modules/playwright`; patch a **copy**, never the product.
- Evidence discipline that this seat keeps getting tested on: a number from a probe is only as good as the
  ref it was run against. State the ref in the same sentence as the number.

## What the next session needs

1. **Check whether MUSE acted** on the `PRIORITY+` (AGENTS.md l.73 REV 4 / −10 vs the live 99 table at 12;
   `PROJECT-KNOWLEDGE.md:24` 97 → 99). If not, it is a stale doctrine line every seat reads.
2. **P-355 is open** — ERNIE's register + mine are two passes, not a finished register. Unregistered areas:
   the nine framework arms' own claims (benchmarks, latency, dist sizes) against their bytes; MUSE's audit
   corrections; and whether D1/D16 were ever struck. Reading `origin/council/ernie:_agents/QUEUE.md` P-355
   row first is cheaper than guessing.
3. **The framework round is where the queue is** (`council/ernie` P-355…P-359). The λ work is a
   *pre-Lab* constraint now, not a live research thread: hand the numbers to whoever runs the Lab, do not
   re-derive them.

## Open questions (all addressed to the Architect or the Owner, not to a seat)

- Architect: does the λ-axis Lab decision rule get written down **before** the run (shape vs level, fold SD)?
  Without it the run cannot settle anything — 0.39 and 0.40 differ by one row.
- Architect: strike or mark D1 and D16 in the assessment? Both are advice the Owner has since contradicted.
- MUSE: AGENTS.md l.73 — delete the REV 4 sentence or rewrite it to the 99-rule table (QB→FS 12). Which?
- Owner (still open from P-347): λ default 3.6 (NFL parity) or lower for upsets? Band [2.50, 3.63].
- Owner (open from P-141): are punters meant to be valued and drafted as kickers under "K↔P free"? (D5)

## Live files

- `inbox/20261114-1631-pickle-P-355-contradiction-register-engine-doctrine.md` — this session
- `_agents/pickle/deliveries/p345-lambda-followup-2026-11-13/{dial-feasibility.py,RUN.txt}` — λ feasibility,
  tolerance, maximin; rerunnable, needs only Z.ai's `merge_prototype.py` + `flex-99-live.json`
- `inbox/20261113-0145-pickle-review-platform-vision-filings.md`, `inbox/20261113-0118-…value-manifest.md`
- `_agents/pickle/deliveries/platform-vision-2026-11-12/{track-probe.mjs,RUN.txt}` — Colors/Cakepanz probe
- `_agents/pickle/deliveries/p345-lambda-budget-2026-11-12/{lambda-budget.mjs,RUN.txt}` — λ budget 3.63
- `_agents/pickle/deliveries/p141-engine-harness.mjs` — engine-in-node harness, 23/23
- `tools/mathlab/flexrebuild.mjs`, `flexverify.mjs`, `flex-owner-2026-11-09.json` (mine, this branch)
- No product HTML edits, ever. Everything lands in `inbox/`; code in `_agents/pickle/deliveries/`.
