# INKLING — lane file (rewrite at the end of every session; never append)

## Identity
- **Seat:** INKLING · **Model / how reached:** Inkling 2 Small Free (opencode/inkling-2-small-free), via OpenChamber · **State:** advisor
- **First seen / admitted:** 2026-11-09 (Owner)
- **Strengths shown (evidence, not claims; most recent first):** P-020/P-041/P-045/P-058/P-067/P-069/P-074 reviews (2026-11-10; anchors re-verified against PreColors, e.g. P-041 setActiveTab is l.832 not ~3936; P-058 `--gold` IS defined at l.217 `#ffc43c`) · P-008 review (664efe7e) · P-314 review — 284/284 engine tests VERIFIED (200df0f6) · P-322 skill-profile design — 97/105 exact vs Owner's final flex table (a3366dc5) · P-021 review (a3366dc5)

## Current work
- **Claimed / in progress:** nothing.
- **Done this session (2026-11-10T01:12–01:31Z):** seven P0-tier NEEDS-REVIEW items from `council.mjs next`, all filed to `inbox/` on `council/inkling`, all `VERDICT: improved`:
  - `inbox/20261110-0122-inkling-P-020-review.md` (commit f5eb6708; +fix 64cb618d-era amend pending commit) — VLOC season-review mock: ≤10 KB ✓, CSS-var fidelity ✓, index math ✓ (9/9 recomputed), 390 px render ✓; findings: gold awards absent, cross-conference Conf. Champ., bracket vs standings contradiction, 4/8 divisions, "charts" vs tables.
  - `inbox/20261110-0126-inkling-P-041-review.md` (0240aaa2) — BEAM homepage→draft fade: replacement setActiveTab would delete 6 side effects; wrong selector (.tabbtn vs .footlink footnav buttons); fade-in never runs; reduced-motion 2 s dead delay; scope applies to all 6 tabs.
  - `inbox/20261110-0127-inkling-P-045-review.md` (7f8958d3) — BEAM next-pick "(x.y)": element does not exist; candidates misread (.dc-pri is not a pick indicator; `.dwar` centred claim false — l.262 forces left !important); draftRecentPicks already has R3.04 format.
  - `inbox/20261110-0128-inkling-P-058-review.md` (36d693dd) — UK gold buttons: `--gold:#ffc43c` already defined (l.217) — likely the "snot yellow"; white-on-#fff8e1 contrast omission; dead background-position transition; `left`-animating shimmer; P-004 `[data-team]` absent (0).
  - `inbox/20261110-0129-inkling-P-067-review.md` (19a720a3) — UK lineup redesign: anchors off ~450 lines (lineupPanelHTML l.5125, lineupEditorHTML l.1277); real green is lineupScoresHTML l.1266 inline var(--good), not `.dwar`; reskin-not-rebuild of wireLineupEditor/movePlayerToSlot; hardcoded "11 Personnel"/"Base 4-3".
  - `inbox/20261110-0129-inkling-P-069-review.md` (2b0bac83) — BEAM footer: l.874 JS is a no-op; fix fails Owner's short-page ask (needs flex-column 100vh + margin-top:auto); l.258 mobile override fights the change; "See guide for details" string absent (l.5011 is about Preseason).
  - `inbox/20261110-0130-inkling-P-074-review.md` (64cb618d) — BEAM team bubbles: `applyTeamColors` does not exist; `--team-*` 0 occurrences; fallback red/gold/silver matches no team; new markup silently deletes the "#N overall pick" text.
- **Blocked / waiting on:** Architect rulings on P-322 (options A/B/C) and P-323 (items 3+7 build verification); P-004 (team-colour theming, blocks P-058/P-067/P-074 colour work); MUSE retire/REVIEWED moves on the seven items above (2 seats or Architect move them).

## What the next session needs
- **Read first:** this file; `bulletin/20261110-0131-inkling.md`; the seven review files above; `inbox/20261110-0104-inkling-P-322-skill-profile-design.md` if touching flex.
- **Do not redo:** any of the seven anchor greps (all receipts in the review files); the P-322 construction; P-314 tests.
- **Watch:** P-323 (verify items 3+7 build: 105 rules, 23/40/16/26) once the Architect lands it; whether MUSE marks P-020/P-041/P-045/P-058/P-067/P-069/P-074 REVIEWED; P-324 (Z.ai w88) when it lands.
- **Open for the Architect:** P-322 option A vs C; whether no-white-text law covers new gold buttons.

## Files in this lane
(none — this file only; work is in `inbox/`)

## Role
general advisor. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items.

- **worktree:** `/Users/kosi/Desktop/wt/inkling` (must stay on `council/inkling`)
- **branch:** `council/inkling` · tip `64cb618d` at rewrite · `git merge-base HEAD origin/council/base` = `1b91f50e`
