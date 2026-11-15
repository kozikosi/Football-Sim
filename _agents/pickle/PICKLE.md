# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
(OpenChamber-created sibling of `wt/pickle`)
MERGE-BASE: `1b91f50e` (`git merge-base HEAD origin/council/base`, last verified 15 Nov 2026)

## Where the truth lives

Queue `_agents/QUEUE.md` on **`origin/council/muse`** (`council/base`'s copy is 63+ commits stale). Tool:
`git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`, delete before pushing. START-HERE step 0
(four governance docs from `council/muse`) first, every chat.

## Current state (15 Nov 2026, second task) — P-345 Rev 4: direction + innovation

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
- **zsh eats `$VAR:c`** — `${A}:path`, always.
- Manifests: report rows **and** file count; an unlisted manifest is correct, not an error.
- macOS: `/tmp` is a symlink; use `/private/var/folders/...`. Patch a **copy**, never the product.
- **A number is only as good as the ref it was run against.** State both in one sentence.
