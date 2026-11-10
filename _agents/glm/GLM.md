# GLM — lane file (rewritten 2026-11-09, end of flexrebuild session)

Identity: council seat `glm` — analytics / scribe lane. IK realm; direct runs against primary
sources preferred. Labels on every claim: VERIFIED (ran/fetched) · REPORTED (named source) ·
INFERRED (shown math) · UNKNOWN.

Worktree: `/Users/kosi/Desktop/wt/glm` · branch `council/glm` · merge-base with
`origin/council/base` = `1b91f50e` · tip pushed: `67651912` (ls-remote VERIFIED 9 Nov).

## Current work (9 Nov window — P-294 follow-up: flexrebuild.mjs)

**`tools/mathlab/flexrebuild.mjs` — the deterministic flex rebuild, built + VERIFIED + pushed.**
The muse relay (council-zai-prompt-D-custom-table) asked for it; Claude's manual rebuild had
timed out. D values in (thetaprice .md or .json), theta-1.0 rounding (tiers 0/2/6/12, cutoffs
1/4/9, >= cutoff goes up), the Owner's D-picks override/removal list encoded; emits flex.json +
spliced flex.ts + move-by-move report; writes only `--out-dir`; runs from any cwd.
`--keep-base` applies an Owner pass to an already-built table; `--overrides-file` is a flat JSON
(base rules = overrides, absent rules = additions). Selftest OK.

Key receipts (all in `inbox/20261109-1525-glm-P-294-flexrebuild.md`, push `67651912`):
- **Script == Architect:** on the `35ce4e98` base with the committed pre-bump thetaprice D, my
  output is byte-equal to Claude's built D-picks table (zero diffs). The rebuild is reproducible.
- D-picks candidate: 97 rules {0:30, 2:16, 6:32, 12:19}; the 30 zeros match the Owner's stated
  count exactly. FLEXCHECK OK. flex.json = flex.ts (LS row kept).
- **Final-105 candidate** (`_agents/glm/deliveries/flexrebuild/final-105/`): base `728b2c53` +
  items 3+7 verbatim (`items-3-7-overrides.json`) = exactly 10 moves; 105 rules
  {12:23, 6:40, 2:16, 0:26} — the Owner's expected counts exactly. flexcheck fails ONLY on SAM
  dest — the checker's dest set needs SAM when items 3+7 land (Architect's file, not edited).
- **flexeval table-only delta** (scratch colors/, un-bumped engine, measured weights, P-310
  seeds; baseline reproduced EXACTLY first: fresh 626/112, tune 1212): fresh encouraged
  626 -> 913, via-12 112 -> 68, flex/lineup 4.251 -> 3.024; tune 1212 -> 1753. Count report,
  not a verdict; the Owner's `728b2c53` corrections (EDGE>ILB/OG/OT/RB/NICKEL, DT>C, DT>OG,
  EDGE>C -> 6; OG>C -> 2) resolved the dramatic free-EDGE moves my diff surfaced.
- **D-011-PROPOSED** (`_agents/glm/deliveries/discrepancy-register-glm.json`, OR's schema for
  intake): the WILL/C 150->200 bump as a SLOTS[].weight edit is a NO-OP for theta D —
  slotWins20() never reads weight; derivedWeights WILL 155.29 / C 147.72 are model-fitted;
  thetaprice output was byte-identical after the edit (scratch run). Post-bump D needs the spec
  re-fit (protected RATING_SPECS/DEF_SPECS, Architect-only, re-pin). Weight-only edit also
  breaks the design.json pin (witness test) and flips the witness verdict to ECHO for C
  (dev 52.3 > 50). Until then P-311's check (2) is unsatisfiable as stated.

## What the next session needs

- **P-323 verification:** when items 3+7 build (SAM dest lands in slots.ts), run flexcheck (with
  SAM added to its dest set) + flexeval against `final-105/flex.json` — it is the ready-made
  diffable reference. Do NOT run flexeval on it before the SAM dest exists (SAM rules would be
  inert; numbers misleading).
- The **post-bump D run**: once the Architect lands the WILL/C spec re-fit, re-run thetaprice in
  a scratch and feed `--d=<post-bump file>` to flexrebuild; the PENDING-POST-BUMP rules (8 at 0:
  OG>C, C>FB, DT>C, EDGE>OLB, ILB>OLB, OLB>OLB, OLB>FB, OLB>TE) re-round then.
- **E-207 review** — still open (timed out two windows running).
- The un-run **N=400 probe** (carried over; command pattern in `_agents/glm/tests/`).
- M5-by-OVR (Madden27 join), defense-EPA pbp join, M3 data-only fit — unblocked by my anchor
  pack; anyone may take them (no assignment).

## Open questions (carried)

- DT2 salary deviation (10M -> 300): Owner's taste or a typo?
- Is 23.3 max deviation (hot pass rush / cold WR1) accepted as final, or refit?
- The skill-profile IDEA (P-322): Owner said "I SUPPORT THIS... MY FLEX TABLE IS MERELY A GUIDE
  FOR YOU TO UNDERSTAND HOW I WOULD LIKE THE ENGINE TO WORK" — highest-leverage open design.

## Prior sessions — receipts that remain true (condensed)

- 8 Nov P-013: hash-pinned nflverse 2024 anchor pack (`019594fa`): T1 ladder level 3
  (`pbp-level3-2024.json`: completion%/INT%/YAC by air-yard bucket; pressure-proxy->sack 44.8%),
  M4 volume anchors (`group-shares-2024.json`); Beam's M4 findings upgraded REPORTED -> VERIFIED
  (within 0.3pp); `_agents/glm/tests/heldout-lint.mjs` (exits 0/1/2); data-map correction
  (defense EPA is a pbp-join task). Raw 19MB nflverse CSVs stay UNTRACKED at
  `_agents/glm/anchors/raw/` (re-downloadable; source hashes in `anchors/README.md`).
- 7 Nov owner-weights reveal: 32/32 inside ±50 (max DE1 +23.3, WR1 −18; DT2 10M→300 is +50 over
  salary×25, Owner's call). Tests on my bench: lineup 34/34, matchup 19/19, versions 7/7.
  Report `inbox/20261107-0200-glm-OWNER-WEIGHTS-report.md`, push `099561e1`.
- 6 Nov: ASK outcome-CI gate answered (`5ca6c747`,`010db8a3`); P-261 DATA-LICENSE (`ac1b9e12`);
  P-263 review posted; P-262 retire op pending quorum (`83079d6c`); tip-side N=100 VERIFIED
  reproduces ASK; probe tool `_agents/glm/tests/outcome-band-probe.mts` (N=400 un-run, ~40 min).
- Environment receipt: node v26.13.0; the engine scratch lives OUTSIDE the repo at
  `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/glm-flexrebuild`
  (colors/ + tools/mathlab extracted from architect tips; refresh:
  `git archive origin/architect/engine-and-seats colors tools/mathlab data | tar -x -C <scratch>`).

## Standing rules I work under

Pre-register -> measure -> label; nothing silently resolved. All window work stays in
`_agents/glm/` + `inbox/` + `tools/mathlab/flexrebuild.mjs` — no product files, no protected
constants, no cross-seat edits, add by path only. Deliveries are pushed commits (never sandbox
paths). Network git gets the 60s stall limit, max twice.
