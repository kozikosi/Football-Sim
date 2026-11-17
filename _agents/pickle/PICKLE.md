# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
(OpenChamber-created sibling of `wt/pickle`)
MERGE-BASE: `1b91f50e` (`git merge-base HEAD origin/council/base`, last verified 15 Nov 2026)

## Where the truth lives

Queue `_agents/QUEUE.md` on **`origin/council/muse`** (`council/base`'s copy is 63+ commits stale). Tool:
`git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`, delete before pushing. START-HERE step 0
(four governance docs from `council/muse`) first, every chat.

## Current state (17 Nov 2026) — P-333 macro: three judgements, one tool proposed

Session was one prompt: the Owner's macro question (what matters most next), answered
without reading DS's or GLM's filings. **`inbox/20261117-2050-pickle-P-333-macro-what-matters.md`**,
pushed `ee75775d`. Anchors:

- **The problem is the missing join, not the next node.** No tree is newest-shell · current-pin ·
  green at once (deployed 277/286, `s5` at the wrong pin, seam unbuilt). One read-only
  `tools/merge-gate.mjs <tree> --pin <sha>` makes "mergeable" countable: pin integrity by blob
  hash · flex equal to the pin's copy (multiset read from the pin, never hardcoded) · suite green
  with a test count · the tree's own pin line honest · zero engine imports outside the seam.
  Today it fails the deployed tree on 2 checks and `s5` on 1. **Not built — proposed.**
- **Direction (A) on the 4-3/3-4 gap is a target its own principles forbid.** Zeroing the table
  gap (~700 units ≈ 0.09 wins/season) leaves ~947 of measured real-roster bias — more than the
  ~720 measured today — so closing the real gap requires making 3-4 cheaper than 4-3 by ~950
  units. Stated as INFERRED from KG's four numbers; if they are wrong, that correction is the finding.
- **Wins has never been calibrated.** The user is told Wins = wins added. Nobody has measured
  whether drafting by Wins wins more, by the predicted margin, or printed the 20-0 rate. One
  afternoon at 3,900 games/s; it decides whether the three numbers in the UI mean anything.
- Prompt defects reported to MUSE before its push: the CI-gate contradiction (preamble
  "still advisory" vs Part 5 "REAL"), and `FOR: P-342` on the GLM review when P-342 is the
  1b-mutation/formation label. Also: the 99-rule multiset is stated two ways (prompt 17/17/42/23;
  AGENTS.md §2 23/43/10/23) — UNKNOWN which is in the file; read it from the pin.

## Earlier (16 Nov 2026) — CAKEPANZ-SHELL / R-13: five filings, four of them measurable

Round: prompt v4-2 (council assist for the 67 Cakepanz shell finish). Took the parts that settle with a command.

- **`inbox/20261116-2109-pickle-CAKEPANZ-SHELL-pin-and-suite.md` — Part 10 + M3.** There are **two trees at two pins**:
  `origin/gh-pages:67-cakepanz/` (`66096fb1`) carries `d3bd81d2` 57/57 by blob hash (README still says `4ca9a071`,
  "52 TypeScript files"); s5 (`council/inkling` delivery) carries `4ca9a071` 52/52 with a correct README. **The deployed
  tree fails 9 of its own 286 engine laws** (`node --test --experimental-strip-types test/engine.test.ts` → 277/9);
  s5 is 284/284. The nine are the Owner's flex/formation rulings (tests still assert REV 4) + the E5 stamp. Cause: a
  re-pin that moved `src/engine/` and `tools/mathlab/flex.json` but not the carried expectations. GLM's Part 10
  ("the READMEs are correct, AGENTS.md is stale") is right about s5 and wrong about the deployment — my R-3.
- **`inbox/20261116-2120-pickle-CAKEPANZ-SHELL-cone-one-door.md` — Parts 1–2 (M1/M2/M4/M5).** One door NOT met:
  **65 engine import statements in 15 files** (29 type-only → **36 runtime imports in 10 files**, 32 module paths),
  9 `.svelte` files (App + 8 in `src/lib`) reach in; the prompt's own grep returns 15 hits, not zero. M2 fails (15 files break, not one). M4 fails (no `SNAPSHOT.md`/`MERGE-*.md`/`SHELL-STATUS`).
  Proposal: six domain seam modules (`board/roster/league/season/saves/core`), zero logic moved, then M1's grep passes.
  Reconciled with GLM's 14/55/24 baseline — different split, same tree.
- **`inbox/20261116-2134-pickle-CAKEPANZ-SHELL-neutrality.md` — Part 3.** Neutral core holds: 7 of 8 `src/lib/*.ts`
  framework-free, runes only in `.svelte` (14 files; `$state` 8/21, `$derived` 4/7, `$effect` 2/2, `$props` 12/12;
  `{#snippet}` 0, transitions 0). Two defects: `draftStore.ts` (20 lines, deliberate adapter — belongs in `bindings/`);
  `bragCard.ts:155` `document.createElement('canvas')` breaks the node-side render claim for shareables.
- **`inbox/20261116-2147-pickle-CAKEPANZ-SHELL-boxscore-mutations.md` — Part 6, settled by command.** `86f22d10` is a
  **descendant** of the pin and `colors/src/sports/nfl/sim/` **does not exist at either pin commit** → Z.ai's harness
  could not have caught the survivors (Inkling's scoping position, now a command). But the four survivors are **live at
  today's tip `a062597f`**: four one-line mutations (firstDowns, puntYards, touchdowns, turnover spot) leave the suite
  **378/378 green**. New fifth: the turnover spot *is* computed (`drive.ts:136` `next.ydl`) and unasserted — refines
  GLM's "not even computed". Four assertions proposed to the Architect, written as identities over the event log.
- Part 17 (label hygiene) went to the bulletin per the round's own rule: **zero** `FOR: P-345` filings on 16 Nov
  (101 files: 58 R-13, 43 other queue IDs, 0 unlabelled); the claimed "8 Inkling + 4 Ernie" mislabels do not exist —
  Inkling self-corrected at 20:05 on 15 Nov. Only real nit: glyph's two prompt files carry `FOR: CAKEPANZ-SHELL`
  (a round name) instead of a queue ID, with P-316/P-317 in parentheses.

Not done (open to any seat): Parts 4 (blockers — beam and vl filed), 5 (ideas — vl), 7 (battery gap-find), 8
(non-functional laws — needs a build+browser), 12 (node counts — needs a build), 13–16.

## Earlier (15 Nov 2026) — P-345 Rev 4: direction + innovation

Prompt: `_agents/muse/deliveries/prompts-2026-11-05/council-direction-innovation-2026-11-15.md` (Rev 4/4.1 — assess
ERNIE's `f3551218` rather than redo it). Deliverable: **`inbox/20261115-1147-pickle-direction-innovation.md`** (335 lines,
Q1–Q8 in order, §0 correction first, labels in §9).

**The five things in it worth a reviewer's time:**
- **§0 is wrong: the live site serves w89, not w85** (VERIFIED by fetch, `origin/gh-pages` `3e69567c`, 2026-11-10). Every
  "w89 vs w85" comparison in the round is against the wrong baseline. AGENTS.md §2 still carries the stale sentence.
- **Q1.1 — the one-dial design has an untested coupling**: λ is pinned by matchup dispersion, team strength by parity;
  nobody has shown one kappa lands in both. The falsifying run is a kappa sweep recording (λ̂, win-SD, title rate) — the
  single most valuable unscheduled Lab run, and cheap.
- **Q7.4 — the engine stamp has a coverage hole** (VERIFIED): `rulesText()` omits `OT_RATE_PCT`, the four kicking
  constants, `EMPTY_OVR`, `WINS_PER_UNIT`/`WEIGHT_UNIT_WINS`, `LAST_REGULAR_WEEK`, `TEAMS_N`. Change any and
  `engineVersion()` does not move. Fix: add them, plus a test that scans `engine/*.ts` for numeric `export const` and
  requires each to be covered or dated-exempt.
- **Q7.2 — the de-gated lineup total should be derived, not pinned**: gap = Σ unit(slot)×penalty to 1.21e-10. Ernie's
  rewrite re-pins four flex numbers the Owner has moved twice; those numbers are already asserted twice by the flex tests.
- **Q3 — do not run another authoring build.** The four-slice receipts already contain the answer (store gap = 8 lines of
  Svelte getter workaround − 1 Vue re-export ≈ 0 idiomatic difference); the metric that settles it is *forced workarounds
  per slice*, countable from the edit record in a morning. Framework: Vue, LOW confidence; weights 40/20/15/15/5/5.

## Earlier this session — P-345 Part A: the three-list comparison, and the λ dial closed by arithmetic

- `inbox/20261115-1135-pickle-P-345-axis-comparison.md` — 24-row dedup table, 7 collapses, species taxonomy, λ answer.
- `inbox/20261115-1136-pickle-stop-doing.md` — one stop, one rule.
- `_agents/pickle/deliveries/p345-axis-comparison-2026-11-14/{axis-bounds.py,RUN-axis-bounds.txt,inputs/}` — rerunnable.
- **λ(context) is dead as a dial by arithmetic**: window `[0.3902, 0.4032)`; `0.39` misses `WR>NICKEL` by 0.0002 λ;
  acceptance needs `SE(λ̂) ≤ 0.003`; the only receipted estimator is 15.7× short (~248 seasons).
- The three lists are not one kind of object (axes / features / evidence / code-read axes); focus is a container.

## Earlier sessions (compressed; detail in git history)

- **14 Nov** — P-355 second pass (`inbox/20261114-1631-…engine-doctrine.md`): Z.ai blobs 255/255 + 20/20; D16/D1
  contradicted/superseded; AGENTS.md l.50 vs l.73 self-contradiction; doc-sync re-derived; λ feasibility.
- **13 Nov** — platform-vision probe + self-correction + review of the round's four filings. My probe had used a
  stale local ref; the re-run killed two of my own "corrections". **Lesson kept: state the ref in the same
  sentence as the number.**
- **12 Nov** — P-346 third review (69/72, CRLF mechanism); P-347 λ budget 3.63 pts/SD, band [2.50, 3.63].
- **11 Nov** — P-141 third review; `playerWar` = 0 for every FB and P (real defect, still unfixed AFAIK).

## What the next session needs

0. **`tools/merge-gate.mjs` is the thing to build** (17 Nov filing §Q2): five checks over
   commands already proven by hand this week, read-only, council-owned. It is what turns
   "is this tree mergeable?" from a judgement per seat into an exit code — and the deployed
   tree being 277/286 while nothing refused it is the defect it closes
   (`inbox/20261116-2109-…-pin-and-suite.md` for the red tree itself).
1. **Read the Rev 4 round's other filings before reviewing mine** — the value is in the disagreements (Ernie on
   "improvable", MUSE on the boot evidence, Claude on the framework call). A review that agrees adds nothing.
2. **Re-run my two numeric claims if you doubt them** — the derived-gap identity (§7.2) and the stamp coverage list
   (§7.4). Both are read-only over `origin/architect/engine-and-seats`; receipts are in the filing's §9.
3. **The kappa↔λ↔win-SD sweep is still unscheduled** and it is the cheapest thing that can falsify the engine plan.
4. **P-355 is still two passes, not a register.** A different seat should merge, not me.
5. **Part B is still unclaimed.** My `[NEW]` rows 22–23 die by default if nobody takes it.

## Open questions (to the Architect / Owner, never to a seat)

- Architect: is the λ acceptance rule "a context cell may not make a second row unsatisfiable" (a count), rather
  than "λ(context) beats fixed"? The count version is cheap and fold-free.
- Architect: strike or mark D1/D16 in the 13 Nov assessment? Both are advice the Owner has since contradicted.
- Architect: does the `file://` requirement bind Cakepanz's dev dist or only the shipped product? That answer decides
  whether Slice 3 is really un-called (Ernie's un-calling, verified by MUSE).
- MUSE: AGENTS.md §2 "Live `index.html` is w85" is false (w89, VERIFIED 15 Nov); l.73 still says REV 4 / QB −10.
- Owner (from P-347): λ default 3.6 (NFL parity) or lower for upsets? Band [2.50, 3.63].
- Owner (from P-141): punters valued/drafted as kickers under "K↔P free"?

## Live files

- `inbox/20261117-2050-pickle-P-333-macro-what-matters.md` (17 Nov — macro answer) ·
  `bulletin/20261117-2350-pickle.md`
- `inbox/20261116-2109-pickle-CAKEPANZ-SHELL-pin-and-suite.md` · `-2120-…-cone-one-door.md` ·
  `-2134-…-neutrality.md` · `-2147-…-boxscore-mutations.md` (16 Nov round)
- `inbox/20261115-1147-pickle-direction-innovation.md` (Rev 4 deliverable)
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
- **Test the Architect's tree without touching it**: `git archive origin/architect/engine-and-seats colors data/nfl
  tools/mathlab | tar -x -C $TMP`, then `node --test --experimental-strip-types test/nfl/*.test.ts` from `$TMP/colors`.
  **Extract `data` AND `tools/mathlab` too** — without them the suite shows a false red (16 Nov: 13 test files failed on
  `ENOENT .../tools/mathlab/design.json` and `../../../data/nfl/*.csv`; with them, 363/363 green). A red baseline is not
  a finding until the harness is proven able to be green.
- **Prove a survivor with a mutation, not a grep**: `cp -R` the extract, one `perl -pi -e` substitution, `diff` to prove
  exactly one line changed (`grep -c '^>'` = 1), then the whole `test/` tree. `mutated-lines=0` means the substitution
  never applied and the run proves nothing — that happened first on 16 Nov and the result was thrown away.
- **zsh eats `$VAR:c`** — `${A}:path`, always.
- Manifests: report rows **and** file count; an unlisted manifest is correct, not an error.
- macOS: `/tmp` is a symlink; use `/private/var/folders/...`. Patch a **copy**, never the product.
- **A number is only as good as the ref it was run against.** State both in one sentence.
