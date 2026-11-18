# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
MERGE-BASE: `864a6aa1` (`git merge-base HEAD origin/council/base`, verified 18 Nov 2026)
HEAD at session end: `a9968bb5` (pushed; `git ls-remote` VERIFIED)

## Where the truth lives

Queue `_agents/PRIORITIES.md` on **`origin/council/muse`** (`council/base`'s copy is stale). Tool:
`git show origin/council/muse:tools/council.mjs > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/pickle-round/council.mjs`,
then run it with cwd = this worktree and an absolute tool path. Running it from `/tmp` silently no-ops
(`import.meta.url` guard); `/tmp` is a symlink here — use `/private/var/folders/...`.

## Current state (18 Nov 2026) — the Cakepanz-6 parallel round

Filed and pushed, one file per item, all on `council/pickle`:

| Filing | Part | Verdict / contribution |
|---|---|---|
| `inbox/20261118-0000-pickle-P-347-P-353-lambda-ratification.md` | 8 | RATIFY WITH CHANGES. Current-table sha `76c02c65` (vs cached `0a26d7c2`) has an **EMPTY** λ band `[0.3902, 0.2195)`, 7 unsatisfiable rows, min dial count 2, exact/97 at λ=0.40 is 89. Ship 0.40 as labelled convention, not measurement. Re-scope P-347 to the discrete unsatisfiable-row count. |
| `inbox/20261118-0005-pickle-P-342-seven-drafts-not-pushed.md` | 1 | BLOCKED: the seven named MUSE drafts (`20261117-2257…2303-muse-*.md`) are absent from **all** fetched refs; `origin/council/muse` tip `11ca6fde`. Cannot verify or substitute. |
| `inbox/20261118-0010-pickle-P-345-P-333-innovation-workflow-future.md` | 9 | Six workflow/platform proposals + a measurable acceptance test for the 99-rule "guide, not target" direction. |
| `inbox/20261118-0015-pickle-R-13-cakepanz6-signup.md` | 10 | Signed up for the prepared-manifest + pin-honesty gate on both trees when the zip lands. |
| `inbox/20261118-0020-pickle-P-333-corrected-merge-gate.md` | 7 | Claim 1 only: corrected five-check gate spec (all four MUSE fixes accepted). **Must say:** "no Owner decision, no engine edit" is true for *writing* the tool, false for *passing 5/5*. Supplement added: Ernie struck his own 947 "floor" (+334 measured); Inkling filed the other two questions. |
| `inbox/20261118-0006-pickle-P-189-pin-watch-drift-gate.md` | 6 (mis-addressed ID) | Built a third pin-watch implementation + falsifier. **The `FOR: P-189` address is a mistake** — the round's item is P-355. Keep as history; use the next filing. |
| `inbox/20261118-0015-pickle-P-355-pin-watch-peer-check.md` | 6 + Part 5 one-liner | Correct filing. Independently ran Inkling's `tools/pin-watch.mjs` (`council/inkling` @ `fab6969f`): self-test 6/6 PASS; live tree 57 vs 52 count FAIL; with `--pin d3bd81d2` count+content MATCH but 5 doc WARNs; `--strict` FAIL. **Correction:** deployed bytes are d3bd81d2; the docs are stale, not the engine tampered. The Part 5 one-liner is answered: the path is written. |

Lane code: `_agents/pickle/deliveries/p345-pin-watch-2026-11-18/{pin-watch.mjs,falsify.sh}` — a full-file
comparison tool whose clean 52-file fixture PASSes and three injected defects FAIL with the check named.

**Round status:** Parts 1–4 (verify seven MUSE drafts; ratify yards battery; D3 landing; P-317/S3/S4
consolidation) were BLOCKED on the missing drafts. Other seats filed Parts 5, 6, 7, 8, 9 and 10
(Inkling's §6 battery, Beam's §6 battery, Ernie's and Inkling's pin-watch, Inkling's three macro answers,
Inkling's seven-proposal λ filing). Verify their work rather than redo it.

## Earlier (17 Nov 2026) — P-333 macro answer

`inbox/20261117-2050-pickle-P-333-macro-what-matters.md` (pushed `ee75775d`). Core claim: the problem is the
**missing join** — no tree is newest-shell · current-pin · green at once (deployed 277/286, `s5` at the wrong pin,
seam unbuilt). A read-only `tools/merge-gate.mjs <tree> --pin <sha>` makes "mergeable" countable. **Not built —
proposed**; the corrected spec is now in the 18 Nov filing above.

## Earlier (16 Nov 2026) — CAKEPANZ-SHELL / R-13

- `inbox/20261116-2109-…-pin-and-suite.md` — two trees at two pins: deployed `66096fb1` carries `d3bd81d2`
  57/57 while README says `4ca9a071`; fails 9 of its own 286 engine laws (277/9). s5 carries `4ca9a071` 52/52,
  284/284. **Superseded detail:** the deployed bytes are the d3bd81d2 re-pin (see 18 Nov correction).
- `inbox/20261116-2120-…-cone-one-door.md` — one door NOT met: 65 engine imports in 15 files (36 runtime in 10).
- `inbox/20261116-2134-…-neutrality.md` — neutral core mostly holds; `draftStore.ts` and `bragCard.ts:155` defects.
- `inbox/20261116-2147-…-boxscore-mutations.md` — four one-line box-score mutations leave the suite green;
  the harness at `86f22d10` predates `colors/src/sports/nfl/sim/`, which does not exist at either pin.

## Earlier (15 Nov 2026) — P-345 Rev 4 and axis comparison

- `inbox/20261115-1147-pickle-direction-innovation.md` — live site is **w89**, not w85 (VERIFIED 10 Nov);
  stamp coverage hole; derived-gap identity; κ↔λ↔win-SD sweep still unscheduled.
- `inbox/20261115-1135-pickle-P-345-axis-comparison.md` — 24-row dedup table, 7 collapses, λ window.
- `inbox/20261115-1136-pickle-stop-doing.md` — one stop, one rule.

Compressed history: 14 Nov P-355 doctrine; 13 Nov platform probe + self-correction (lesson: state the ref in the
same sentence as the number); 12 Nov P-346 third review and λ budget; 11 Nov P-141 third review
(`playerWar` = 0 for every FB and P).

## What the next session needs

1. **The seven MUSE drafts.** Check `origin/council/muse` again; if they still do not exist, do not verify from
   prose. If they land, I am eligible for drafts 1, 2, 3, 5, 7 (I filed no yards battery, P-317 set, GLM
   verification, mechanism adjudication or Cakepanz-5 review). I am **not** eligible for draft 4 (D3) or 6
   (my own claims).
2. **Cakepanz-6 zip:** take the prepared-manifest + pin-honesty gate (Part 10 signup). Re-run Inkling's
   pin-watch with `--strict` on both trees; do not activate the re-pin.
3. **`tools/merge-gate.mjs` is still unbuilt** on any ref. Corrected spec is filed; it is council tooling
   (MUSE/Architect to promote).
4. **Do not re-review Cakepanz-5.** It is reviewed.
5. **A new round prompt (Cakepanz-8) was prepared by Ernie** (`3dbb67fb`, on his branch) with Inkling's
   `ed72c629` still live with a stale §1. Which one supersedes is MUSE/Owner's call, not a seat's.

## Open questions (Owner / Architect / MUSE — never a seat)

- Owner: λ convention value (0.40 recommended), P-347–P-353 ratification, prepared re-pin activation.
- Architect: no-arbitrage restatement for merge-gate check 3; Node-24 runner; which pin-watch implementation
  enters `tools/`; the lab estimator round's scope.
- MUSE: push or restate the seven drafts; resolve the two competing Cakepanz-8 prompt files.

## Live files

- `inbox/20261118-*` — seven filings this round (table above).
- `_agents/pickle/deliveries/p345-pin-watch-2026-11-18/` — tool + falsifier.
- `bulletin/20261118-1932-pickle.md` — this session.
- Earlier filings and deliveries: `inbox/20261117-2050-…`, `inbox/20261116-21*` (four), `inbox/20261115-11*`,
  `_agents/pickle/deliveries/p345-axis-comparison-2026-11-14/`, `p345-lambda-followup-2026-11-13/`,
  `p345-lambda-budget-2026-11-12/`, `platform-vision-2026-11-12/`, `p141-engine-harness.mjs`.
- `tools/mathlab/flexrebuild.mjs`, `flexverify.mjs`, `flex-owner-2026-11-09.json` (mine, this branch).
- **No product HTML edits, ever.** Work → `inbox/`; code → `_agents/pickle/deliveries/`.

## Standing recipes

- **Blob-first**: `git show <ref>:<path>` / `git archive <ref> -- <dir>` → temp dir; print the sha you resolved.
  Refs move mid-session.
- **Test the Architect's tree without touching it**: `git archive origin/architect/engine-and-seats colors data/nfl
  tools/mathlab | tar -x -C $TMP`, then `node --test --experimental-strip-types test/nfl/*.test.ts` from `$TMP/colors`.
  Extract `data` AND `tools/mathlab` or the suite gives false reds.
- **Prove a survivor with a mutation**: one substitution, `diff` to prove exactly one line changed, then the whole
  test tree. `mutated-lines=0` means the run proves nothing.
- **zsh eats `$VAR:c`** — use `${A}:path`. Manifests: report rows **and** file count; an unlisted manifest is
  correct, not an error.
- macOS: `/tmp` is a symlink; use `/private/var/folders/...`. Patch a **copy**, never the product.
- **A number is only as good as the ref it was run against.** State both in one sentence.
