# PICKLE — seat identity

SEAT: pickle
ROLE: Council Adviser
BRANCH: council/pickle
WORKTREE: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle
MERGE-BASE: 1b91f50e161fa10d0607c8e09330115ffa27f1ff (origin/council/base, 3 Nov 2026)

## Current work and state

**Session 2026-11-04 (this one).**
- Took the top line: **E-211 REVIEW 2/2** — the browser half VL could not run. Wrote
  `inbox/20261103-0202-pickle-E-211-review.md`, verdict **improved**, pushed. That makes E-211
  REVIEWED (2/2) and it should now be in the Architect's READY TO BUILD.
- VERIFIED by running Z.ai's own batteries on the unmodified w55 shell (only three absolute
  paths changed: playwright, chrome-headless-shell, input HTML, plus the shots dir):
  - `w55_nodecheck.js` → `13 scripts parse · 0 fail` (reproduces VL).
  - `w55_live.js` (1280px) → **12 pass · 0 fail**, exit 0, twice.
  - `w55_mobile.js` (390px + 320px) → **22/0 four times, 21/1 twice**. The flaky assertion is
    `M7 · a DIME pick stages a real move`: it always clicks the **last** picker row
    (`rows[rows.length-1].click()`), and with an unseeded roster that row is sometimes the man
    already in DIME, so `zpbStageCount` does not rise. `menuRows` varied 9/10/12 across runs.
    Measured flake rate 2 in 6 (~1 in 3), macOS + chromium-1248 only.
  - sha256 `59f41eadd5c004b166d2a7cf3351aabb5309d1a8bd2af2b1c361d53884e70541`, md5
    `49161f118e587701f1d639346e22d4d2`, 1,592,738 B — all match VL and the w55 README.
- **Correction to the record (VERIFIED):** `Math.random` in w55 is **62 occurrences on 43
  lines**. VL's "43" is the line count, labelled "occurrences"; OR's review repeats it. Any
  occurrence pattern (`Math.random`, `Math.random()`, `\b`) gives 62.
- Started the next line, **P-143 review 1/2** (beam's Guide rebuild), and did **not** finish it
  — no review file written, so no verdict exists and the item is still 1/2 from another seat.
  The measurements are under "P-143 partial findings" below.

## P-143 partial findings (VERIFIED on Pre-Colors, sha 40233d6be00e987c; no verdict)

- `function renderGuideHTML(){` is at **line 5029** — beam's anchor is correct.
- Exist exactly as beam quotes: the `Guide` intro panel and "Short reference sections for the
  terms the sim uses."; `<b>When to wait.</b>`; `<b>Do not forget you can flex.</b>`;
  `<b>Where the wins come from</b>`; the `sec(...)` list with the 8 sentence-case titles.
- Current section titles are **sentence case**: How the site works · Drafting: which positions
  matter · Reading the draft board (Wins, Value here, Priority, Gone, stars) · Flexing players,
  explained · Position values: **all 26 starting spots** · Coaching: personnel, styles and game
  plans · The math of every game-plan choice · Football and site terms.
- `Back to Simulator` → **0 occurrences** in Pre-Colors: that brief item is already satisfied,
  so beam's removal item 6 is a no-op (worth saying, not doing).
- Brief items beam does **not** cover: the Draft/Preseason/Play/Review paragraphs (they are the
  four `<li>` of the `how` ordered list) and "the duplicate 'Who decides'" (`Who decides` → 1
  occurrence, still present).
- **Data-rule problem in beam's glossary:** "Dime: 6 defensive backs (situational, **~10% of
  snaps**)" — an invented statistic with no source (AGENTS.md §7). Must go or be sourced.
- "Nickel … (CB3 comes on, SAM comes off in **4-3**)" names the base, so it satisfies D-012,
  but D-012 also has the 3-4 case (nose tackle DT1 off); the entry is incomplete.
- **Open conflict for P-143 vs P-144:** the live string says **26** starting spots, P-144 says
  **28 positions**. Unresolved — count the slots before either ships.
- "the whole Stars section": the only Guide-side hits are the stars *column* explanation
  (`<li><b>Stars</b> (★★ / ★ / ☆)` ~line 4994) and the game-recap "Stars of the game" (~3053);
  there is no standalone Stars section. Calibration question for the Architect, not a defect.

## What the next session needs

1. Finish **P-143 review 1/2** with the findings above (they are measurements, not a verdict);
   `node /private/tmp/council.mjs show P-143` for the brief, and re-run `next`.
2. Reuse `/private/tmp/council.mjs` — but **run it by its real path**: on macOS `/tmp` is a
   symlink, so `node /tmp/council.mjs` silently prints nothing (the `import.meta.url ===
   file://${argv[1]}` guard fails). Copy it into the worktree or use `/private/tmp/...`.
3. The w55 batteries are runnable here: playwright 1.64.1 at `/Users/kosi/node_modules/playwright`,
   browsers in `~/Library/Caches/ms-playwright` (chromium_headless_shell-1248). Any other E-item
   that was "blocked: no browser" can be taken.
4. If the Architect wants the M7 flake fixed, it is a **test** change (choose a row that is not
   the current occupant), not a product change — worth a P2 `add` rather than a P0.

## Open questions

- For the Architect (not a claim): should Z.ai's `w55_mobile` M7 click a row that is guaranteed
  to be a real move? The product is not shown broken; the battery is.
- For the Architect: 26 vs 28 starting spots (P-143 vs P-144) — which is the Owner's number?

## Live files

- `inbox/20261103-0202-pickle-E-211-review.md` (pushed, review 2/2)
- `inbox/20261103-0145-pickle-P-195-review.md`, `inbox/20261103-0145-pickle-P-195-claim.md`
- `inbox/20261102-0337-pickle-P-198-p1-p6-evidence.md`
- this lane file
- No product HTML edits, ever; everything lands in `inbox/`.

## Last session

2026-11-04: E-211 review 2/2 pushed — ran w55_live (12/0) and w55_mobile (flaky M7, 2 in 6);
Math.random corrected to 62 occurrences on 43 lines. P-143 review started, not finished.
