# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
MERGE-BASE: `864a6aa1` (`git merge-base HEAD origin/council/base`, re-verified 19 Nov 2026)
HEAD at session end: the final lane+bulletin commit of this session; last pushed review commit before
  it was `49b1c9d1` (VERIFIED by `git ls-remote` on `council/pickle`).

## Current state (19 Nov 2026, fifth session) — Cakepanz-9 hosting + review + brainstorm

Owner's explicit task: host Z.ai's `67-cakepanz-9-2026-11-19` folder on `council/pickle`, review it
thoroughly, push the review, and brainstorm improvements to the Cakepanz shell for Claude's engine.

- **Hosted (commit `bcc89ca1`, pushed + `git ls-remote` VERIFIED):**
  `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/` — 5,104 files / 208,428,690 B, byte-identical
  to the published zip `/Users/kosi/Downloads/67-cakepanz-9-2026-11-19.zip` (sha `0d362203…`) and to
  the Desktop source. Manifest `zai-cakepanz-9-2026-11-19.SHA256SUMS` (5,104 rows, 5,104 OK / 0 FAILED,
  sha `056af57d…`), provenance in the sibling `.PROVENANCE.md`. Lane `.gitattributes` prevents the
  repo's `text=auto` from CRLF-normalising 14 dependency files; node_modules included because the zip
  contains them. Reading the hosted copy is preferred over re-reading the Desktop source.
- **Brainstorm (commit `e6bd44cb`, pushed + VERIFIED):**
  `inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md` — ten ranked shell ideas led by a
  cite-check gate, law registry, receipt freshness stamps, staged composite aggregator, one draft view
  model, seam conformance, offline tent test, VM goldens + axe-core, cutover shell-behaviour contract,
  reviewer-in-a-box. Includes a reply to Z.ai's Part E. All INFERRED; no product bytes edited.
- **Review (commit `49b1c9d1`, pushed + VERIFIED):**
  `inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` — VERDICT **improved**, six of seven product
  claims hold, H1–H6:
  - H1 (HIGH): shipped k1 composite unrun (52 B log) while nine sites claim both composites done.
  - H2 (HIGH): `START-OF-CHAT-ZAI.md` true hash `15f088c7…`; docs name `8ef3b18d…` and `f31bdf51…`;
    MUSE's live copy still `8ef3b18d…`.
  - H3 (MED): intake ledger rows 5/7/8/23 mark the unmet §9 items done.
  - H4 (MED): delivered `gate-manifest.mjs` exits 1 (`MANIFEST FAIL (missing): .gitignore`); regen
    yields 313/318, not the claimed 314/319.
  - H5 (MED): C′1 tie extension parses rounded display text (`DraftBoard.svelte:40`), not the engine's
    raw `_w`/`_p`; the battery repeats the same parse, so L13 is self-referential on ties.
  - H6 (MED): the ring is on the row toggle `.cp-main` (`BoardRow.svelte:82`), not the draft chip.
  - PASS with anchors: B1, B2, B-bis, C′2, C′3, C′4, engine byte-invariance, real falsifiability.
  - Mechanical re-runs (Node v26.13.0): pins 5c808472/65673a00 67/68 files diff 0; flex 99 rules
    `76c02c65…`; engine 394/406; node 33/33 ×2; numerals CLEAN ×2; dist `670d4c08…` both trees.
- **Not run:** the ~40-min shipped k1 composite (honest open item in `VERIFY §23.7`); Playwright/browser
  legs. Falsifier logs read as files and quoted, not re-executed. All such claims labelled REPORTED.
- **Disclosure filed:** I wrote the c9 prompt and the c8.1 review, so this is a spec-conformance and
  evidence review against work-order v4, not a blind independent design review.
- **Preservation gate at session end:** `council/pickle` 0 dirty / 0 local-only commits OK. Other seats'
  worktrees `mimo`, `q`, `vloc` reported UNSAVED — not mine to touch; listed as pending.

## Next session needs

1. **Do not re-review c9** (review filed, prompt authored here). Take a new top item from the live queue
   via `node tools/council.mjs next` on `origin/council/muse`, or a fresh review by another seat.
2. **MUSE:** re-file `START-OF-CHAT-ZAI.md` at measured `15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec`
   on `council/muse`; correct the quoted hashes (H2); finish or delete the shipped k1/k2 logs (H1).
3. **Z.ai / Architect:** resolve H1 (finish one 40-min composite), H4 (manifest on final bytes), and
   H5/H6 (ring on the draft chip, ties from engine raw keys); do not cite this package for cutover yet.
4. **Keep the hosted c9 copy as the read source** for any later check; it is byte-identical to the zip.
5. Run `node tools/preserve.mjs check` on any clean-up; do not touch the other seats' unsaved work.

## Open questions (Owner / Architect / MUSE — never a seat)

- Owner: cutover timing once c9's H1/H4/H5/H6 are resolved; λ convention (0.40 recommended); whether to
  un-gate Block C from the round-9 prompt.
- Architect: whether to promote the cite-check gate / seam conformance ideas into `tools/`; whether the
  C′1 fix needs an engine VM change (raw `rank` exposed) rather than a shell-only patch.
- MUSE: re-file the bootstrap hash, relay the c9 review to Z.ai, pin eligible c9 reviewers (Pickle is
  not one), and note the other seats' unsaved worktrees.

## Live files

- `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/` + `.PROVENANCE.md` + `.SHA256SUMS` + lane
  `.gitattributes` — hosted c9 delivery.
- `inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` — c9 review (H1–H6).
- `inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md` — c9 brainstorm.
- `bulletin/20261119-0426-pickle.md` — this session.
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
