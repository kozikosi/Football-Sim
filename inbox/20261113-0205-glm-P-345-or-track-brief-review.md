SPEAKER: GLM | ROLE: council seat | TASK: review of OR's Colors/Cakepanz Track Brief (platform-vision round) | DATE: 2026-11-13
FOR: P-345 (platform-vision round — no P-number exists yet for the stack/platform item; note OR's `FOR: P-354` is a mislabel: QUEUE.md P-354 is the penalties+clutch item. Re-file under the platform item once numbered.)

# Review of `inbox/20261113-0117-or-colors-vs-cakepanz-track-brief.md` — VERDICT: improved

The recommendation (Colors = authoritative track, Cakepanz = framework-testing surface) is the right direction and matches the Owner's Track-Brief ask. But the evidence is taken from trees that are not the product's current state, so the brief needs re-anchoring before the Owner decides on it. Every claim below is VERIFIED at the named refs unless labelled.

## What verifies (agrees with my independent receipts)

- Colors engine purity: 0 `.svelte` in `colors/` at tip `bebe8e0b` (my ls-tree count; DS's identical). React AND svelte both unimported in `colors/src` (my greps — OR's React receipt is right and understated: both frameworks are unused).
- No CI anywhere; no `.github` on any of the four branches (my receipt).
- Pre-Colors hash `40233d6be00e987c` — consistent with AGENTS.md §2 (REPORTED, unchanged).

## Corrections (each changes the brief's evidence)

1. **The Colors layout OR describes does not exist at tip.** He lists `src/engine/` 28 files, `src/app/` (store.ts, selectors.ts), `src/view/` (draftBoard.ts, roster.ts, teamColors.ts, theme.ts). At `bebe8e0b`, `colors/src` = **core/ 14 files, platform/ 1, sports/nfl/ 42** (my `git ls-tree` count; DS's filing matches exactly). OR read a stale tree (his local worktree, which the preserve gate shows dirty). All counts, filenames and the "213 passing tests" figure need re-anchoring to a named commit.
2. **"No Vite usage — both use esbuild" is wrong at tip.** Colors' `build` script is `vite build`; `colors/build/build.mjs` exists but its own header says "UNVERIFIED: written without esbuild in the sandbox" — it is a prototype bundler, not the build path (my read of the file). The fork is Vite end-to-end (`67-cakepanz/package.json`: dev/build/preview all vite, vite ^7.3.6). The dual-bundler story in the Colors package.json description is stale prose, not build truth.
3. **Wrong Cakepanz tree.** OR describes `council/GH` (7 `colors/src` files, 66 tests) as Cakepanz. The Cakepanz application is **`origin/gh-pages:67-cakepanz/`**: own `index.html`, own `package.json` (vite ^7.3.6, svelte ^5.57.3), 15 `.svelte` components, a full test tree (`test/engine.test.ts` + `test/engine/**`, data copied in-package). `council/GH` is a seat-branch copy (7 files), not the product. The brief's Cakepanz section must be rewritten against gh-pages.
4. **"Cakepanz is a deliberate subset... same purity contract" needs the Owner's confirmation (INFERRED, not established)** — and Pickle's drift history (31/32 slots differed at his 5-Nov Colors pin; re-measured: the fork now carries the same 650-table but lacks the 8-Nov provenance note and the entire Phase-0 kernel — my tree diff, see my Pickle review) shows the vendored copy is a liability regardless of intent.
5. **The premise needs one hard fact added: Colors cannot build an application today.** `colors/index.html` loads `/src/main.ts`; no commit contains `colors/src/main.ts` (VERIFIED by ls-tree at tip; Pickle found it at his pin, still true at tip). So "Colors = primary product track" is true today only as *authoritative engine + app-state + view-models library*; **the runnable application is the fork**. The Owner decision OR correctly demands should be phrased with that distinction — and Pickle's §9.3 (rebase the fork: delete the vendored `src/engine/`, import the library) is the concrete path that makes "Colors primary" literally true.

## Verdict

**improved.** Direction sound; evidence unanchored (stale layout, wrong Cakepanz tree, bundler misread, unanchored test counts) and the FOR line mislabelled. With §1–§3 corrections applied and the engine-vs-app distinction stated, this becomes the Track Brief the Owner asked for.
