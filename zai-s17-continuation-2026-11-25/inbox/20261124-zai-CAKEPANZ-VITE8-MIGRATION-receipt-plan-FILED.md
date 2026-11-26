# Cakepanz Vite-8 migration receipt plan (filed 2026-11-24 · renamed from the R-13 label 2026-11-25 · NO dependency change applied)

FOR: Owner (ruling) · Architect (the merge-day pairing) · council (record). STATUS: **plan only —
the tree's `package.json` still pins `vite ^7.3.6` + `@sveltejs/vite-plugin-svelte ^6.2.1`**, per
the standing rule that a stack move is explicit, compatible, and receipted, never silent. This
filing replaces the 2026-11-22 byte-check note as the plan of record for the migration path.

## The 2026-11-25 rename (the work order A5 correction)

**R-13 is CLOSED** (Owner 2026-11-19, Svelte 5 + Vite 8 FINAL; `origin/council/muse:AGENTS.md:34`).
Calling this filing "R-13" presented a closed framework question as open. The correct name is the
**Cakepanz Vite-8 migration receipt plan** — this is migration work (moving the shell's own tree to
the ruled stack), not an open framework question. The dependency is NOT bumped before cutover
unless it fixes a security finding: a bump would invalidate the 374-entry seal, the 41 captures,
the dist fingerprints and the composite for zero behavioural gain (the Architect's `colors/`
product build, `vite ^8.3.6` + plugin `^7.3.1`, already carries the migration receipt on its side).

## The state of the drift (restated, with the orcads correction on record)

- R-13 (Owner, 2026-11-19) settles **Svelte 5 + Vite 8** as the final stack. The shipped tree
  builds on Vite 7 with plugin 6.2.x (the P-286 fix chose plugin 6 to satisfy Vite 7's peer
  range — `npm ci` clean, no `--legacy-peer-deps`, innovation #5 in README).
- orcads F1 corrected their own earlier hypothesis in writing: the `7.3.6` is **Vite itself**
  (the Architect's colors tree carries the plugin at `^7.3.1` — different package, similar
  number). The shell's exact lines: `package.json` devDeps `"vite": "^7.3.6"`,
  `"@sveltejs/vite-plugin-svelte": "^6.2.1"`.
- Consequence if cutover shipped these bytes unchanged: the public tree would contradict a final
  Owner ruling. Either R-13 is amended (Owner's word) or the migration below runs FIRST.

## The compatibility receipt plan (one sitting, on the Owner's word — not before)

Every step receipts; any step failing FILES and stops (the merge-guide rule — never route around):

1. **Prepare (no install):** write down the expected peer matrix — `vite@^8` demands
   `@sveltejs/vite-plugin-svelte@^7` (or the fork the Architect names); `svelte@^5.57.3` stays.
   Confirm on npm's registry pages at run time, not from memory — print the resolved peer ranges
   as the first receipt line.
2. **The bump, one commit-shaped edit:** `package.json` → `vite: ^8…`, plugin → the resolved
   major; `rm -rf node_modules package-lock.json`; `npm install` (regenerated lockfile).
   Receipt: the `npm ls vite @sveltejs/vite-plugin-svelte svelte` tree + the exit code.
3. **The P-286 re-proof:** `npm ci` from the NEW lockfile must succeed with NO
   `--legacy-peer-deps` and no force flags. Receipt: the clean-`npm ci` stdout tail + exit 0.
4. **Build + distfile:** `npm run build` + `npm run distfile` green. Receipt: build stdout tail;
   NEW dist asset names + sha256s printed into the hand-over (the OLD dist hashes RETIRE — the
   seal, SHELL-STATUS and every doc citation re-pin to the new bytes in the same sitting).
5. **The battery wall, in order:** `npm run test:engine` (430/430 — the pin's suite is
   stack-independent) → `npm run battery:node` (37/37) → `npm run battery` (29/0/10/3) →
   shell 53/0 → board 24/0 → slot 28/0 → visual 18/0 → contrast 2/0 → viewport 45/45. The S35
   brag-URL law, the S26–S28 file:// laws and the S33 panel law re-run against the NEW build.
   Receipt: one `bash scripts/acceptance-run.sh` at the migrated bytes —
   `ACCEPTANCE RUN COMPLETE` or the migration does not land.
6. **The falsifier wall:** F0–F14, FA–FF, F15–F31, F-S1 all DIE by name at the new bytes (the
   gauntlet is in the composite; zero TAUTOLOGY, zero COULD-NOT-RUN).
7. **The seam golden:** N34 must MATCH (or the re-pin regenerates with `--write` and receipts the
   diff — but a Vite bump that moves the VM output is a RED FLAG, not a re-gen: file it).
8. **The reseal chain:** regen-manifest → gate-manifest (boot target re-asserted on the new
   assets) → gate-numerals ×2 → verify-package → check-claims (the claims.json dist/seal values
   re-measured — the T2 protocol makes the count drift a named RED, never a silent pass).
9. **The docs:** SNAPSHOT/README/SHELL-STATUS/hand-over hash citations re-pinned; the migration
   receipt table appended to VERIFY; the s17-package note's "what supersedes what" updated.
10. **The rollback:** keep the previous `package.json` + lockfile + dist/ in the sitting's
    archive receipt (`deliveries/receipts/`); the revert is one file-copy + one reseal.

## What this filing deliberately does NOT do

- No version bump, no lockfile regen, no dist rebuild outside the plan above.
- No ruling: R-13 stays Owner-final; "amend" and "migrate" are both legitimate outcomes and only
  the Owner picks one. Silence = the shipped Vite 7 tree stays exactly as sealed.
- No Cloudflare/workers work (the standing no-deploy law stands).
