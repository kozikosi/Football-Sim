# ROLLBACK — the restore points if a cutover gate fails · Z.ai · 2026-11-20

**The rule (the S13 order §5):** a rollback note naming the sha256 restored on index.html and the
gh-pages tree if a gate fails. Make-live is the Owner's call; nothing below executes until then.

## The restore points (measured this sitting, VERIFIED)

- **The live site today is still w89.** `origin/gh-pages` tip `66096fb1` — its `index.html` is
  byte-identical to `Football-Sim-Z-post-blue-w89.html`, **sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`**
  (the c12 sitting measured the identity; this sitting re-verified the TIP pointer via
  `git ls-remote` — `66096fb1…` — and the c12 sitting's index.html identity is the measurement of
  record; REPORTED by c12, re-checked here at the tip level only).
- The relay should NOT touch `index.html` or the w89 file at any point before make-live — the
  two relay items (the test re-point patch, the c12/S13 tree landing into `67-cakepanz/`) are
  SUBPATH operations on `67-cakepanz/…`; w89's root files are untouched by both.

## If a gate fails, in order of increasing scope

1. **A shell battery gate fails at the merged tree** — the merge stops, colors/ keeps the pre-
   merge state (git: the merge commit is not made; the working tree resets). Nothing public
   changed; w89 stays live. The failing law's stdout is the bug report.
2. **The gh-pages test re-point (the two test files) misbehaves post-push** — the patch is
   tests-only; the rollback is `git revert` of the two-file commit on gh-pages (or re-applying
   the inverse patch), leaving `67-cakepanz/` byte-identical to before and w89 untouched.
3. **The c12/S13 tree lands into `67-cakepanz/` and a gate fails there** — the deployed
   `67-cakepanz/` reverts to its pre-landing tree (the Owner's git keeps the prior tip; the
   landing commit is reverted, NOT force-pushed). The suite on the reverted bytes returns to
   277/286 — that is the HONEST pre-patch state, not a defect.
4. **Make-live goes wrong (w89 replaced and Colors misbehaves)** — restore the two root files
   from the w89 record: `index.html` ← the file whose sha256 is
   `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c` (verify after restore with
   `shasum -a 256 index.html`); if the whole branch must move, reset gh-pages to a tip whose
   `index.html` hashes to that value (the c12 sitting's record ties it to the w89 file bytes).
   The 67-cakepanz/ subtree is independent of this restore and can stay.

## What this sitting did NOT touch (the rollback's premise)

- No engine bytes (`src/engine/` byte-identical to the pin — 69/69 files).
- No ratings, no `Football-Sim-*.html`, no AGENTS/CLAUDE/QUEUE/CHRONICLE, no governance files.
- No pushes of any kind (no credentials — the zip rides the Owner's relay).

**One unknown, stated plainly:** this sandbox cannot read the LIVE gh-pages site over the wire
to re-hash the deployed index.html; the `dbb8c27a…` identity is the c12 sitting's measurement
(REPORTED here, VERIFIED by that sitting's receipt) plus this sitting's tip-level check.
