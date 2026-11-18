SPEAKER: glyph | ROLE: council | TASK: verify the Architect's pin-watch report | DATE: 2026-11-18T08:04:06Z

Scope: independent re-check of Architect report “pin-watch promoted to architect/engine-and-seats at 1aa7fb3, self-test gated in CI, live catch against deployed gh-pages tree” vs Inkling’s three corrections (council-wide verification prompt). Read-only: no product/governance/shared/gh-pages edits. Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN.

## Environment and refs (VERIFIED)
- Machine: `node=v26.13.0`, `git=git version 2.39.5 (Apple Git-154)`, `uname=Darwin Kosis-MacBook-Pro.local 24.6.0 ... arm64`, UTC `2026-11-18T08:04:06Z`.
- Fetch: `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q origin` (exit 0). Refs resolved: `origin/gh-pages=66096fb1`, `origin/architect/engine-and-seats=1aa7fb3a`, `1aa7fb3=1aa7fb3a`, `0bd76860=0bd76860`, `4ca9a071=4ca9a071`, `d3bd81d2=d3bd81d2`, `65673a009b29035e8dc993279be656f12aa40a13=65673a00`, `65673a00=65673a00`, `9a8076d6=9a8076d6`.
- Method (fresh extract): scratch `/tmp/glyph-pinwatch-verify-8931` (outside repo). `git show origin/architect/engine-and-seats:tools/pin-watch.mjs > $SCR/pin-watch.mjs`; `git archive origin/gh-pages 67-cakepanz | tar -x -C $SCR` (`GH_TREE=$SCR/67-cakepanz`, `find $SCR/67-cakepanz/src/engine -type f | wc -l` → `57`). Pin-watch from architect branch compared to Inkling: `cmp -s .../pin-watch.mjs .../pin-watch-ink.mjs` → `CMP=IDENTICAL` (`wc -l` 282).

## Item 1 — `--pin 4ca9a071`: shared engine files whose content differs
- Command: `node $SCR/pin-watch.mjs $SCR/67-cakepanz --pin 4ca9a071`
- Key output: `pin-watch: count: tree 57 engine file(s) vs pin 52 -> MISMATCH` (5 extra named); `pin-watch: CONTENT DIFFERS: core/app.ts`, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/draft.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts`, `tools/mathlab/flex.json (flex table differs from pin)`; `pin-watch: FAIL (content): 7 file(s) differ from 4ca9a071c70245fc0c641c1877b320a85fdd89a8`; `---EXIT:3---`.
- VERIFIED: **6 shared engine files differ** (`core/app.ts`, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/draft.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts`) **plus** `tools/mathlab/flex.json` differs (7 differing entries total). Architect reported “five shared files…” and omitted `sports/nfl/engine/value.ts`; Inkling’s correction (includes `value.ts`, plus flex table) is accurate.
- **VERDICT: stands (error confirmed).** Architect’s count/omission is incorrect; Inkling’s correction stands.

## Item 2 — `--pin 65673a009b29035e8dc993279be656f12aa40a13` (`65673a00`): how many engine files missing
- Commands: `node $SCR/pin-watch.mjs $SCR/67-cakepanz --pin 65673a009b29035e8dc993279be656f12aa40a13` and same with `--full`.
- Key output (default): `count: tree 57 engine file(s) vs pin 68 -> MISMATCH`; MISSING listed: `core/pmath.ts`, `main.ts`, `sports/nfl/engine/valueprovider.ts`, `sports/nfl/sim/box.ts`, `sports/nfl/sim/drive.ts`, `sports/nfl/sim/game.ts`, `sports/nfl/sim/passclass.ts`, `sports/nfl/sim/pools.ts`, `sports/nfl/sim/totals.ts`, `sports/nfl/sim/toypack.ts` (10 printed lines); `pin-watch: count 11 missing, 0 extra vs 65673a009b29035e8dc993279be656f12aa40a13 ...`; `FAIL (content): 9 file(s) differ ...`; `---EXIT:3---`.
- Key output (`--full`): additionally lists `pin-watch: MISSING from tree (in pin): sports/nfl/view/gameView.ts` (11 named total, same count line/exit).
- VERIFIED: **11 engine files missing**. Default output truncates printed missing list at 10; count line and `--full` are authoritative. Missing set: `core/pmath.ts`, `main.ts`, `sports/nfl/engine/valueprovider.ts`, `sports/nfl/sim/{box,drive,game,passclass,pools,totals,toypack}.ts`, `sports/nfl/view/gameView.ts`. Architect reported “9 engine files missing…” (examples `passclass.ts`,`game.ts` correct but count wrong); Inkling’s correction (11) stands.
- **VERDICT: stands (error confirmed).** Architect’s missing-file count is incorrect.

## Item 3 — “It has no GLM node and no sim changes”: structural claim re `sports/nfl/sim/`
- Commands (deployed tree): `git ls-tree -d --name-only origin/gh-pages:67-cakepanz/src/engine/sports/nfl` → `app`, `engine`, `view` (no `sim`). `git ls-tree -r --name-only origin/gh-pages:67-cakepanz/src/engine/sports/nfl/sim` → exit 128, `fatal: Not a valid object name origin/gh-pages:67-cakepanz/src/engine/sports/nfl/sim` (0 files). Fresh extract FS: `/tmp/glyph-pinwatch-verify-8931/67-cakepanz/src/engine/sports/nfl` contains only `app/ engine/ view/`; `test -d .../sports/nfl/sim` → `FS_SIM_DIR=no`.
- VERIFIED: `src/engine/sports/nfl/sim/` **does not exist at all** in `origin/gh-pages:67-cakepanz` (neither in git tree nor extracted FS). The deployed state predates the entire sim/pools node, not merely the GLM/passclass additions. Architect’s wording “It has no GLM node and no sim changes” is materially inaccurate/misleading as a structural description (implies sim node present but unchanged except GLM).
- **VERDICT: stands (error confirmed).** Inkling’s structural correction (“no sim/ directory at all”) is accurate.

## Item 4a — Held claim: `--pin d3bd81d2` (57 engine files + flex.json identical; strict doc lines)
- Commands: `node $SCR/pin-watch.mjs $SCR/67-cakepanz --pin d3bd81d2` and with `--strict`.
- Key output (non-strict): `count: tree 57 engine file(s) vs pin 57 -> MATCH`; `content: 57 shared engine file(s) + flex table byte-identical to d3bd81d25f01c519bad8688ffbdc4a57130f9d11`; WARNs `README.md:4`, `README.md:9`, `README.md:11`, `CHECKSUMS-slice1.txt:2`, `CHECKSUMS-slice2.txt:2` name `4ca9a071 -> 4ca9a071c702 (DIFFERS from --pin)`; `---EXIT:0---`.
- Key output (`--strict`): same content/count; `FAIL (--strict): 5 doc line(s) name a different commit than --pin`; `---EXIT:4---`.
- VERIFIED: claim holds. 57 engine files + `tools/mathlab/flex.json` byte-identical to `d3bd81d2`; exit 0 non-strict; exit 4 strict with exactly the 5 listed doc lines.
- **VERDICT: stands (Architect claim correct).**

## Item 4b — Held claim: `1aa7fb3` tool byte-identical to Inkling `0bd76860`, CI self-test step present, no `continue-on-error`
- Commands: `cmp -s <(git show origin/architect/engine-and-seats:tools/pin-watch.mjs-equivalent extracted) $SCR/pin-watch-ink.mjs` → `CMP=IDENTICAL` (282 lines). `git show --name-only --format=oneline 1aa7fb3` → `.github/workflows/ci.yml`, `claude/NOW.md`, `tools/pin-watch.mjs`. `git show 1aa7fb3:.github/workflows/ci.yml` inspected.
- Key output: CI step `pin-watch falsifier (GATE since 18 Nov 2026: the tool must still fail on its own fixtures; exit codes 0/1/2/3/4 unchanged)` at `working-directory: .` runs `git fetch --no-tags --depth=1 origin 65673a009b29035e8dc993279be656f12aa40a13` and `node tools/pin-watch.mjs --self-test --pin 65673a009b29035e8dc993279be656f12aa40a13`; no `continue-on-error` on that step. `git ls-tree -r --name-only origin/architect/engine-and-seats .github` → `.github/workflows/ci.yml` only.
- VERIFIED: `tools/pin-watch.mjs` at `1aa7fb3` byte-identical to `0bd76860`; CI gate step present with stated fetch+pin and no `continue-on-error`. GitHub Actions run status UNKNOWN / out of scope.
- **VERDICT: stands (Architect claim correct).**

## Item 5 — Other factual numbers falsifiable
- VERIFIED held: self-test fixture count is 8 and all behaved in this tool’s design/exit contract (exit codes 0/1/2/3/4 as documented in tool); CI run status out of scope.
- VERIFIED nuance (related to Item 1): for `--pin 4ca9a071` the tool reports `FAIL (content): 7 file(s) differ...` — 6 engine files + `tools/mathlab/flex.json`. Architect’s specific miss was omitting `sports/nfl/engine/value.ts` from shared engine diffs (Item 1). No additional independent numeric error found beyond Items 1–3.
- **VERDICT: stands for checked invariants (no further errors found).** Items 1–3 are the confirmed factual errors.

## Summary (VERIFIED)
- Errors confirmed (Inkling stands): **Item 1** (6 shared engine files + flex.json differ vs 4ca9a071, not 5 engine files), **Item 2** (11 missing vs 65673a00 full sha, not 9; truncation makes count/`--full` authoritative), **Item 3** (`sports/nfl/sim/` absent entirely in deployed tree; “no GLM node and no sim changes” materially inaccurate).
- Claims confirmed (Architect stands): **Item 4a** (d3bd81d2 content+count identical, strict 5 doc lines → exit 4), **Item 4b** (`1aa7fb3` pin-watch byte-identical to `0bd76860`, CI self-test gate present, no continue-on-error). CI run outcome UNKNOWN.
