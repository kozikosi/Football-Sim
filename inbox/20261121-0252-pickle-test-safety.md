SPEAKER: pickle | ROLE: council seat | TASK: test-only safety work — P-033 tab list, Biome selftest, D13/pin-watch, releases.md schema | DATE: 2026-11-21T02:52Z
FOR: P-033 (supplementary work order item 5)

## 1 · Biome selftest — RAN IT, and it FAILS (the headline)

I have Biome **2.6.2** on this machine (`/Users/kosi/.local/bin/biome`; `biome --version` → `Version: 2.6.2`). I took the LIVE tool bytes from `origin/council/muse:tools/lint.mjs`, `:tools/biome-product/biome.json`, `:tools/biome-product/biome.json` + `:tools/lint-baseline.json` into scratch (NOT editing any tree's `tools/`) and ran:

```
$ node tools/lint.mjs selftest
UNVERIFIED: could not read Biome's JSON report. Raw output follows; this is not a pass.
<…>/tools/biome-product/biome.json:18:13 deserialize  DEPRECATED
  i The use of the recommended field has been deprecated, and will removed in the next major version of Biome. Use preset instead.
…
  × Found a nested root configuration, but there's already a root configuration.
  i The other configuration was found in <scratch root>.
  × Biome exited because the configuration resulted in errors. Please fix them.
EXIT=3
```

**Verdict: NOT A PASS — exit 3, UNVERIFIED by the tool's own definition.** Reproduced three ways: (a) isolated scratch with only the product config; (b) isolated scratch with the repo-root `biome.json` too; (c) my real worktree with the live tool bytes copied in (restored afterwards — `git diff -- tools/` is clean). So AGENTS.md §9's "UNVERIFIED until a seat posts a passing selftest" still stands — in fact a seat HAS now run it and it does **not** pass.

Two causes are visible in the raw output, both in `tools/biome-product/biome.json` (Architect-owned product/build tooling per §8):
- **Fatal:** "Found a nested root configuration" — the product config declares `"root": true` and Biome 2.6.2 also discovers a config at the cwd root. I tried dropping `"root": true` and pointing `--config-path` at the file instead of the dir, in scratch copies; neither cleared it. (INFERRED root cause — further diagnosis is the Architect's/MUSE's, and `tools/` is not mine to edit.)
- **Non-fatal warning:** `"recommended": false` is deprecated in 2.6.2 ("Use preset instead").

This is a finding, not a fix. I did not edit `tools/`, add a `biome-ignore`, or claim a pass. **Do not treat `node tools/lint.mjs product …` output as VERIFIED on 2.6.2 until the selftest passes.**

## 2 · P-033 tab list — status, no new claim

Verified again this sitting: `tools/post-merge-smoke.mjs:421` on `origin/council/muse` and on `origin/architect/engine-and-seats` still carries `const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];`. iceman's REVIEWED work (`council/iceman:inbox/20261120-0354-iceman-C23-smoke-tabguidebtn.md`) already supplies the exact old→new (drop `'tabGuideBtn',`) and three check commands. I add nothing; P-033 is REVIEWED and awaits the Architect/MUSE applying the tool edit. Functional smoke needs a target build path, which does not exist yet.

## 3 · D13 purity test and pin-watch CI — PROPOSALS only (no files created)

IDEA D13: add a test that asserts `colors/src/sports/nfl/engine/core/**` and the engine entrypoints contain no DOM/Svelte/browser imports (no `document`, `window`, `localStorage`, no `*.svelte` imports). HOW TO CHECK (proposed): `grep -rInE "from ['\"].*\.svelte|document\.|window\.|localStorage" colors/src/sports/nfl/engine/ || echo PASS`. This is the automated form of the frozen-engine rule; a green result on the S14 tree is `INFERRED` until run by a seat with the tree checked out.

IDEA pin-watch: a CI/test step that fails if `git show <pin>:colors/src/<file>` sha differs from the working tree for all 69 engine files (the loop already written in `inbox/20261121-0246-pickle-S15-handover-checklist.md` §2 is the exact body). Pin `408410477`. Both proposals are test-only and safe under a frozen pin; neither touches engine bytes. They belong in the Architect's lane — I file the idea, not the implementation.

## 4 · `claude/releases.md` schema — PROPOSAL for the Architect's file

IDEA: one table, one row per make-live/rehearsal, columns:
`date (UTC) · source commit (architect sha) · Pages deployment id · production URL · dist/ sha256 · dist/single.html sha256 · zip sha256 · seam golden e8fed8ab… (MATCH) · side-by-side file (path + hash) · gate receipt (path) · deployer · rollback target id`.
Rationale: Claude's fallback rollback (pinned dist + zip sha) and my Cloudflare finding (inbox/20261121-0248) — that the first good production deployment id is the ONLY rollback target at cutover — both need this record to exist BEFORE make-live. It is Claude's file; I do not create it.

EVIDENCE: selftest and all commands VERIFIED (I ran them, raw output quoted); D13/pin-watch/schema are INFERRED proposals; P-033 state VERIFIED from the two refs. No product, engine, pin, governance, queue or `tools/` file edited.
