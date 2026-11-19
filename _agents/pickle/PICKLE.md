# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
MERGE-BASE: `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (`git merge-base HEAD origin/council/base`, re-verified 19 Nov 2026)
HEAD at session end: the final lane+bulletin commit of this session. Last pushed report commit before
  it: `a974fabc6` (the P-345 brainstorm filing).

## Current state (19 Nov 2026, seventh session) — c10 hosting, review, brainstorm

Owner's task: host Z.ai's `67-cakepanz-10-2026-11-19` close-out package on `council/pickle` so any
seat can read it; review it thoroughly and push the review; then brainstorm implications and
improvements to Cakepanz / the UI-UX shell for Claude's engine. All three done and pushed.

- **Hosted (commit `338e9d868`):** `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/` — 52 files
  / 1.8 MB, byte-for-byte from `/Users/kosi/Desktop/Football Sim/67-cakepanz-10-2026-11-19`.
  `md5sum -c CHECKSUMS.txt` → 49 OK; zip sha `54b63123a7d4008870326f7c4b6d36335e1edadb7daf27d998bf0036e2a17555`
  (754,277 B) matches; extracted zip `diff -rq` source → exit 0; staged blobs `cmp`-equal 0 mismatches;
  `SHA256SUMS` 52/52 OK. Wrote `.PROVENANCE.md`; extended lane `.gitattributes` with
  `zai-cakepanz-10-2026-11-19/** -text` to stop CRLF rewriting.
- **Review (commit `8e82489a7`):** `inbox/20261119-0906-pickle-P-287-cakepanz10-closeout-review.md`,
  `FOR: P-287`, VERDICT **improved**. Re-ran/re-checked: k1 18 × `EXIT_CODE=0` + COMPLETE, gates PASS
  314/319, numerals CLEAN ×2 under both invocations, S29b/L7b law receipts (12/12 chip hits), item-5
  preflight shas byte-exact vs the Architect's recipe, tools numbers vs DS `MEASUREMENTS.txt`, w89 Q1
  label absence (independent), 5,104-byte parity, five-path fence. Findings: **R1** the cite-check
  log's own L7b counter reads `0` where the report claims 12/12 (underlying claim TRUE, named receipt
  is wrong/REPORTED-bad); **R2** "26 edited lines across 9 files" mislabels 26 replacements / 11 file
  copies / 8 names; **R3** the one-revert strike claim assumes an unpushed lane. Resolve R1 before
  citing the package as a receipt-backed close-out.
- **Brainstorm (commit `a974fabc6`):** `inbox/20261119-0911-pickle-P-345-cakepanz10-shell-innovation.md`,
  `FOR: P-345` — five ranked ideas (B1 URL-seed the single RNG site, B2 feed Share's MVP from the
  engine's `seasonAwards`, B3 re-derive the stats accumulator on restore, B4 collapse the 14-button
  flat nav on phone, B5 stamped dataset provenance) plus five implications of the c10 sitting.
  Load-bearing VERIFIED receipts: exactly ONE live `Math.random()` in the whole shell
  (`App.svelte:109`; the other four hits are two comment pairs); 14 NAV entries all `show: true` and
  no 390px nav rule; two different MVP definitions (shell `pyd+rtd` sort vs engine `seasonAwards`);
  accumulator explicitly cleared on `restoreSeason()`; `port/seam.ts` M1–M5 one-door contract.
  The `DEV` gate is a runtime `?dev` query param and already renders an honest empty state — **not**
  a defect; do not "fix" it.
- **Disclosure:** I hosted this package at the Owner's request and wrote its provenance; I authored
  none of its content. This session's review and brainstorm are my own, labelled VERIFIED/REPORTED/
  INFERRED/UNKNOWN. No product bytes, engine files, protected constants or queue rows were edited.
- **Queue path correction:** the live ranked list is `_agents/QUEUE.md` on `origin/council/muse`
  (P-287 and P-345 both live there), **not** `_agents/PRIORITIES.md` (stale/absent on muse).
- **Not run:** c10's ~40-minute composite suite, browser/Playwright legs, any dist runtime. Findings
  are from reading receipts and re-running the short checks, not from executing the shipped bundle.

### Prior sessions (compressed history, all pushed and VERIFIED)

- **Sixth:** `inbox/20261119-0438-pickle-R-13-tools-and-framework-verdict.md` — ranked five tools,
  rejected ten, recommendation Svelte 5 + Vite ~70/30 (advisory; R-13 stands 50/50 until Owner rules).
  Registry corrections: `@tanstack/svelte-table@9.3.2` declares `svelte: ^5.0.0`; `@lucide/svelte@1.75.0`
  is ISC. Svelte autofixer 5.57.3 returned `issues: [], suggestions: []` on the snippet.
- **Fifth:** hosted c9 (`bcc89ca1`, 5,104 files byte-identical, `.SHA256SUMS` 5,104 OK); c9 review
  (`49b1c9d1`, verdict improved, H1–H6); c9 shell brainstorm (`e6bd44cb`).

## Next session needs

1. Do not re-review c9/c10 or re-litigate R-13. Take a NEW top item from `_agents/QUEUE.md` on
   `origin/council/muse` with the v9 tool: `node tools/council.mjs next`, run from a real path
   (`/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/council.mjs`), never `/tmp`
   (macOS symlink makes v8 silently no-op).
2. If the Owner/Architect picks up the shell ideas, B1–B3 are the sequence: seed → one awards source →
   accumulator survives restore. Keep every change behind `port/seam.ts`; no engine edits.
3. Keep the stat-provenance law in view: sort on raw engine numbers, never parsed display text; carry
   `round` on in-memory boxes so playoff rows split honestly (L17).
4. MUSE: resolve c10 finding R1 (the cite-check log's counter) before the package is cited as a
   receipt-backed close-out; relay the P-287 review to Z.ai; pin eligible reviewers (Pickle is not one).
5. Keep the hosted c9 and c10 copies as the read sources for any later check; both are byte-identical
   to their zips.
6. Run `node tools/preserve.mjs check` on any clean-up; do NOT touch other seats' unsaved worktrees.

## Open questions (Owner / Architect / MUSE — never a seat)

- Owner: which (if any) of the five shell ideas becomes a real P-item; cutover timing; whether to run
  the R-13 heavy-table bench before cutover (my advice: run once on the four-dashboard slice, do not gate).
- Architect: whether to re-point Share's MVP through `seasonAwards` before cutover (B2); how to persist
  `SeasonStats` across restore without enlarging the engine envelope (B3); whether to promote the
  cite-check gate / seam-conformance ideas into `tools/`.
- MUSE: resolve c10 R1; re-file any corrected cite-check receipt; note the other seats' unsaved
  worktrees listed in the session bulletin.

## Live files

- `inbox/20261119-0911-pickle-P-345-cakepanz10-shell-innovation.md` — this session's brainstorm.
- `inbox/20261119-0906-pickle-P-287-cakepanz10-closeout-review.md` — c10 review (R1–R3).
- `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/` + `.PROVENANCE.md` + `.SHA256SUMS` — c10 host.
- `bulletin/20261119-0912-pickle.md` — this session's bulletin.
- Earlier: `inbox/20261119-0438-pickle-R-13-tools-and-framework-verdict.md`,
  `inbox/20261119-0435-pickle-P-316-cakepanz9-review.md`,
  `inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md`,
  `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/`.
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
