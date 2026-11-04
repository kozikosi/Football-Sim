# W32 BUILD REPORT — Z.ai · session 23+24 (web chat, recovered) · 2026-10-29

## Product
`Football-Sim-Z-post-blue-w32.html` · md5 `fa6d9fb8bf48a5025f41d28ddb1ee419` (state pin below) · 1,398,985 B.
Built on the Owner-pushed **w30** bytes (`8d8e1a4b…`, 1,367,386 B — byte-verified from
`council/zai @ z-post-blue-wave30-2026-10-28-w30/`) via **six asserted patch stages**
(`tools/w32_patch1..6.py`) + two headless suites. The **w31 zip never reached the sandbox**
(upload/ empty; GitHub newest = w30), so the round-31 directive list was rebuilt from the
Owner's verbatim message (START-OF-CHAT §1 fallback 4) and round 32 landed on top.

## Chain
w30 → `w32_patch1` (guide wall, labels, comparison, footer, game plan, K-curve) →
`w32_patch2` (season-story badges, review restructure, UNIT REPORT CARD badges, awards,
champion banner, pick grades) → `w32_patch3` (during-game laws, streak-to-final-whistle,
rest-summary sequencing, season options everywhere, try-again modal, story at season end) →
`w32_patch4` (QB-25 rule, ELEPHANT, field-map swaps, belong map, 3-4 order helper,
one-click flex, breakdown reorder) → `w32_patch5` (preview caps, data-slot hooks,
ResizeObserver cure, tint soften, rivalry tag, leaderboard integers) → `w32_patch6`
(payload: pink anchor/palette, browser centering, mobile sweep + pick lists, SIM SEASON
gate, prematch cinematics + phrase generator, swipe, label caps, integer sweep 2).

## Verification
- `tools/w32_verify.js` — **97 PASS / 0 FAIL**, zero console errors (directive assertions A1–A46, B1–B31).
- `tools/w32_stress.js` — **20 PASS / 0 FAIL**, zero console errors (draft → 17 weeks → review → playoffs → complete; during-game law spot checks on 8 fresh games).
- Evidence: 9 screenshots (`notes/evidence/`), desktop 1280×900 + iPhone 14; mobile horizontal overflow measured **0 px** on the loaded views.
- Real bug caught by the stress and fixed in-chain: the game-report badges were built with a
  4-arg `badge()` call whose class arg was dropped — re-cut to the Owner's exact two-line form.

## Interpretations flagged for veto (see W32-INTAKE-LEDGER.md §C)
1. Kicker curve damped in the rating math (not display-only)
2. Field-map swap read literally (DE1 takes the nickel's press slot; DIME tucked inside on the same row)
3. Rivalry phrase pool deduped to 28 (DIVISIONAL DUEL was listed twice)
4. Mobile swipe = coarse-pointer only
5. QB-25 rule binds the CPU draft; the user's own picks are never blocked

## New in the lane this session
- `deliveries/HANDOFF-TO-CLAUDE.md` + `deliveries/WAVE-HISTORY.md` — the Owner-ordered
  compilation of every directive since wave 1 + the V23 engine-swap seam guide.
- `tools/w32_patch1..6.py`, `tools/w32_verify.js`, `tools/w32_stress.js`.
- `builds/Football-Sim-Z-post-blue-w32.html`.
