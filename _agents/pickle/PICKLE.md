# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
MERGE-BASE: `864a6aa1` (`git merge-base HEAD origin/council/base`, re-verified 19 Nov 2026)
HEAD at session end: the final lane+bulletin commit of this session; the last pushed report commit
  before it is recorded in the session bulletin and `git log` on `council/pickle`.

## Current state (19 Nov 2026, sixth session) — tools + Svelte 5 vs Vue 3 verdict

Owner's explicit task: evaluate Svelte 5 / Vue 3 tools for improving w89 into Colors (specifically
reframing YOUR STATS and PLAYOFF STATS from lists into an interactive table), take time, push the
report, and give a final Svelte vs Vue recommendation.

- **Filed (this session):** `inbox/20261119-0438-pickle-R-13-tools-and-framework-verdict.md`,
  `FOR: R-13`. Ranked five candidates by USE CASE → COST → LAW, rejected ten with the same filter,
  compared what each framework genuinely gives, and gave the final recommendation:
  **Svelte 5 + Vite, ~70/30, high confidence for this cutover** — advisory only; R-13 stands 50/50
  until the Owner rules or cutover forces the pick.
- **Corrections to the standing brief, VERIFIED from the npm registry this session:**
  `@tanstack/svelte-table@9.3.2` declares `svelte: ^5.0.0` (so the old "no Svelte 5 adapter" docs line
  is stale); `@lucide/svelte@1.75.0` is **ISC**, not MIT as the brief says. Bundled bytes of both are
  UNVERIFIED — only unpacked registry sizes were read.
- **Validated snippet:** the `$state` / `$derived.by` sort core in the filing returned
  `issues: [], suggestions: []` from the Svelte MCP autofixer at version 5.57.3. It sorts on raw
  engine numbers and carries `aria-sort`, `<th scope>`, which is the law c9's H5 broke.
- **Disclosure:** I authored the c9 prompt and the c8.1 review; this filing is an evidence-based
  evaluation against the council's own bar, not a blind design review. No product bytes were edited.
- **Not run:** R-13 bench, Playwright/axe, bundle measurement, dashboard rendering. All size claims
  are registry unpacked sizes unless labelled otherwise.

### Prior session (fifth) — c9 hosting + review + brainstorm, all pushed and VERIFIED

- `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/` — 5,104 files / 208,428,690 B, byte-identical
  to the published zip (sha `0d362203…`) and Desktop source; `.SHA256SUMS` 5,104 OK / 0 FAILED;
  lane `.gitattributes` prevents CRLF normalization. Commit `bcc89ca1`.
- `inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md` — ten ranked shell ideas (commit `e6bd44cb`).
- `inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` — verdict **improved**, H1–H6 (commit `49b1c9d1`):
  H1 shipped k1 composite unrun (52 B log) while nine sites claim done; H2 bootstrap hash drift
  (true `15f088c7…` vs quoted `8ef3b18d…`/`f31bdf51…`); H3 intake ledger false greens; H4 manifest
  gate exits 1 and regen is 313/318; H5 ties parsed from rounded display text (`DraftBoard.svelte:40`);
  H6 ring on the row toggle, not the draft chip. B1/B2/B-bis/C′2–C′4, byte-invariance and real
  falsifier deaths PASS with anchors. Mechanical re-runs: pins 67/68 diff 0; flex 99 rules
  `76c02c65…`; engine 394/406; node 33/33 ×2; dist `670d4c08…` both trees.
- Not run: the ~40-minute shipped k1 composite, Playwright/browser legs. Falsifier logs read, not re-executed.
- Preservation gate at fifth-session end: `council/pickle` 0 dirty / 0 local-only commits OK; other
  seats' worktrees `mimo`, `q`, `vloc` UNSAVED and left untouched.

## Next session needs

1. Do not re-review c9 or re-litigate R-13. Take a new top item from the live queue via
   `node tools/council.mjs next` on `origin/council/muse` (note: the live queue is `_agents/QUEUE.md`,
   not the stale `PRIORITIES.md` path).
2. Owner / Architect: decide the four-dashboard implementation — hand-rolled `StatTable.svelte`
   first, `@tanstack/svelte-table` only if column toggles/pagination repeat across screens. Measure
   bundled bytes before accepting any library.
3. Keep the stat-provenance law in view: sort on raw engine values, never parsed display text;
   carry `round` on in-memory boxes so playoff rows split honestly (L17).
4. MUSE: re-file `START-OF-CHAT-ZAI.md` at measured `15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec`
   and resolve H1/H4 in c9. Z.ai / Architect: resolve H1/H4/H5/H6 before citing c9 for cutover.
5. Keep the hosted c9 copy as the read source for any later check; it is byte-identical to the zip.
6. Run `node tools/preserve.mjs check` on any clean-up; do not touch other seats' unsaved work.

## Open questions (Owner / Architect / MUSE — never a seat)

- Owner: cutover timing once c9's H1/H4/H5/H6 are resolved; whether to run the R-13 heavy-table bench
  before cutover (my advice: run once on the four-dashboard slice, do not gate on it).
- Architect: whether to promote the cite-check gate / seam conformance ideas into `tools/`; whether the
  C′1 fix needs an engine VM change (raw `rank` exposed) rather than a shell-only patch.
- MUSE: re-file the bootstrap hash, relay the c9 review to Z.ai, pin eligible c9 reviewers (Pickle is
  not one), and note the other seats' unsaved worktrees.

## Live files

- `inbox/20261119-0438-pickle-R-13-tools-and-framework-verdict.md` — this session's report.
- `inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` — c9 review (H1–H6).
- `inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md` — c9 brainstorm.
- `bulletin/20261119-0438-pickle.md` — this session.
- Earlier: `inbox/20261118-1415-pickle-P-316-cakepanz81-review.md` (c8.1 review),
  `inbox/20261118-1400-pickle-P-345-cakepanz81-shell-innovation.md`,
  `_agents/pickle/deliveries/zai-cakepanz-8.1-2026-11-18/`,
  `_agents/pickle/deliveries/prompts-2026-11-18/zai-cakepanz-9.md` (my c9 prompt).
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
