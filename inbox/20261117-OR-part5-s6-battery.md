SPEAKER: OR | ROLE: council | TASK: Part 5 — §6 acceptance battery, written now | DATE: 2026-11-17 | FOR: P-342

§6 ACCEPTANCE BATTERY (outcome-first; the Architect lands §6, this battery grades the outcome)

CONVENTION (§0): every inc:downs figure names its denominator. Per-incompletion: pools ~68%, GLM ~24%. Per-4th-down-pass-play: pools ~24%, GLM ~8.8%. Same fix target, different denominators.

STALE ANCHOR: pools.ts:77-90 does NOT exist (VERIFIED: `git ls-files colors/src/**/pools.ts` → empty; zero grep hits for "pools" in colors/src/ or colors/test/). The §6 bound ("fallback walk bounded by the level the pools node would choose, never coarser") must be re-anchored by the Architect to the actual sampler-site code in his tree before this battery can be graded against a file+line. The BATTERY below is anchor-independent; it grades outcomes.

BATTERY (every check: command · N · bar)

1. inc:downs per-4th-down-pass-play — outcome-first. Command: bucket-bar harness (Part 6) over the 120k paired keys, filtered to 4th-down pass plays. Bar: GLM rate within [20%, 28%] (≈24% pools-like; today ~8.8%). N=120,000 paired keys.
2. inc:downs per-incompletion — same harness, denominator = incompletions on 4th-down pass plays. Bar: GLM rate ≥ 60% (pools-like ~68%). N=120,000.
3. Drives within ±0.3%: paired drive-count delta, GLM vs pools. Bar: |delta| ≤ 0.3%. N=120,000.
4. Sacks within ±0.5%: paired sack-rate delta. Bar: |delta| ≤ 0.5%. N=120,000.
5. Suite 406/406: `npm test` (or the engine suite command) must show 406/406 passing. Bar: 406/406, zero failures.
6. Ernie's fault plant: inject the known fault the §6 fix is supposed to remove; the battery must FAIL (exit non-zero, name the check). Bar: non-zero exit, check named.
7. Missing sampler-level test: a test that the sampler-level bound (not the outcome) is enforced — the fallback walk never leaves the level the pools node would choose. Command: unit test on the sampler (Architect names the site). Bar: the test fails when the bound is removed, passes with it.
8. Inkling sharpenings:
   a. Class-absent-within-bound behaviour defined: when the target class is absent within the bound, the sampler must do X (Architect defines X; default = fall to the coarser class, never below the pools level). Bar: defined + testable.
   b. holes[5]: a new holes counter for the class-absent-within-bound case; hole accounting must grow (sum of holes = total fallbacks). Bar: accounting identity holds in the harness.

GRADING TARGET — SETTLED HERE
Glyph's termination battery grades against perfect termination; Ernie's §6 grades against pools parity. They differ; a fix can pass one and fail the other. RECOMMENDATION: the battery grades against POOLS PARITY (checks 1–4 above are pools-parity bars); PERFECT TERMINATION is the reported stretch (reported alongside, not graded). Reason: the Owner's product question is "does the GLM node change outcomes vs pools", not "does it terminate perfectly"; a perfect-termination bar would green-light a node that ends every drive early. The stretch is reported so the Architect sees it without being gated by it.

TWO ONE-LINERS (filed here, same filing, per Part 5 instruction)
- VL names the −0.1173 metric: it is the DRIVES diff in VL's own table (not the sack rate). (VERIFIED against the round prompt's own arithmetic note; the raw VL table is not in-repo, so this is INFERRED-from-prompt, not VERIFIED-from-file.)
- Inkling cites the pin-watch path or says it is not written yet: NOT WRITTEN (VERIFIED: no tools/pin-watch.mjs anywhere in the repo; Part 6 builds it).

D3 filing question: resolved, no ask (see Part 3 filing).

WHAT I RAN / DID NOT RUN
- Ran: pools.ts existence check (absent); pin-watch existence check (absent).
- Did NOT run: the 120k outcome numbers (no bucket-bar harness yet — Part 6; raw data git-ignored). Explicitly not run.

BLOCKED: bucket-bar harness (Part 6) not built; Architect must re-anchor §6 bound to the real sampler site (pools.ts does not exist).
OPEN: Owner decision — GLM default (waits on §6 fix + re-measurement); Architect's A4 band naming.
NEXT: Part 6 — build pin-watch.mjs + bucket-bar.ts with falsifiers; this battery then becomes runnable.