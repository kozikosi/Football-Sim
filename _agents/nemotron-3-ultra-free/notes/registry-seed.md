# P9 — Registry Seeding (Draft Only)

**Speaker:** Ultra | **Role:** Council Advisor | **Date:** 2026-10-22T17:00:00Z

**Task:** P9 — Registry Seeding (Draft Only)
**Build:** `Football-Sim-PreColors.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)

---

## Registry Seeding — Draft Tasks

Based on the open items in the bulletin and the branch schema (`tools/check-tasks.mjs`), the following tasks need JSON files in `tasks/` ready for the Architect to apply after the merge.

---

## Schema (from `tools/check-tasks.mjs`)

```json
{
  "id": "T-YYYYMMDD-<seat>-<n>",
  "title": "string",
  "state": "proposed|accepted|implemented|verified|owner-accepted",
  "base_build_sha": "sha256 (8-64 hex chars)",
  "seat": "string (required for state >= accepted)",
  "claimed_at": "ISO 8601 date (required when seat is set)",
  "evidence": [{"command": "string", "result": "string"}],
  "verification": {"seat": "string", "command": "string", "result": "string"},
  "owner_decision": "string (required for owner-accepted)"
}
```

---

## Draft Tasks (Ready for Architect)

### T-20261022-ultra-01: P4 Weights — Protected Constants
```json
{
  "id": "T-20261022-ultra-01",
  "title": "P4 Weights — DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS adjustments per Owner",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-02: P5 Platform — localStorage, Palette, Mobile
```json
{
  "id": "T-20261022-ultra-02",
  "title": "P5 Platform — localStorage draft persistence, 32-team palette check, mobile cards",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-03: P3 Implementation — Graphics Round (8 items)
```json
{
  "id": "T-20261022-ultra-03",
  "title": "P3 Graphics — Shared component library (P0-26), Game Preview (P0-27), Game Review (P0-28), Season Review (P0-29), 100-Season (P0-30), Playoff Bracket (P0-31), Star/Ball (P0-32), Guide Visual (P0-33)",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-04: S11/S4/S20 CSS Blocks
```json
{
  "id": "T-20261022-ultra-04",
  "title": "S11/S4/S20 CSS Blocks — .vscard, .teamframe CSS blocks",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-05: P10-1 Flex Rules (Protected Constants)
```json
{
  "id": "T-20261022-ultra-05",
  "title": "P10-1 Flex Rules — LEDG/REDG→EDGE, new flex tables, CB3=0, OLB/WILL/SAM→FS -6 etc.",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-06: P10-2 3-4 Base Defense
```json
{
  "id": "T-20261022-ultra-06",
  "title": "P10-2 3-4 Base Defense — DT2→ILB2 (worth MIKE), OLB2→SAM, DT1=Nose Tackle, label mapping",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-06: P10-3 Coaching Philosophy Unlocked
```json
{
  "id": "T-20261022-ultra-06",
  "title": "P10-3 Coaching Philosophy Unlocked — remove scriptLocked for user team, update description",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-07: S11/S4/S20 CSS Blocks
```json
{
  "id": "T-20261022-ultra-07",
  "title": "S11/S4/S20 CSS Blocks — .vscard, .teamframe CSS blocks",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-08: P0-26 Colour-Identity CSS-Variable Rule
```json
{
  "id": "T-20261022-ultra-08",
  "title": "P0-26 Colour-Identity CSS-Variable Rule — Brand/Display split, token layer, gold banner",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-09: P0-27 Game Preview Redesign
```json
{
  "id": "T-20261022-ultra-09",
  "title": "P0-27 Game Preview Redesign — component layout, team IDs, +x pts removal, defensive labels",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-10: P0-28 Game Review Redesign
```json
{
  "id": "T-20261022-ultra-10",
  "title": "P0-28 Game Review Redesign — GoldBanner, QuarterCard×4, TurnoverLine, StarCard×3, collapsible plans",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-11: P0-29 Season Review Redesign
```json
{
  "id": "T-20261022-ultra-11",
  "title": "P0-29 Season Review Redesign — GoldBanner, Conference charts, March Madness bracket, AwardRow, auto-visible sections",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-11: P0-30 100-Season Report Redesign
```json
{
  "id": "T-20261022-ultra-11",
  "title": "P0-30 100-Season Report Redesign — win dist bars, auto-visible sections, collapsible advanced stats",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-12: P0-31 Playoff Bracket + Conference Charts
```json
{
  "id": "T-20261022-ultra-12",
  "title": "P0-31 Playoff Bracket + Conference Charts — BracketNode, StatCard grid, March Madness style",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-13: P0-32 Star/Ball Presentation
```json
{
  "id": "T-20261022-ultra-13",
  "title": "P0-32 Star/Ball Presentation — StarCard with ✨, thresholds (60 rush/300 pass+3:1 TD:INT/90+ rating), game ball in Key Players",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-14: P0-33 Guide Visual Language
```json
{
  "id": "T-20261022-ultra-14",
  "title": "P0-33 Guide Visual Language — StatCard, BarRow, SectionHead components, fade-into-page typography",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-15: #startSeasonBtn 119px Below-Fold Fix
```json
{
  "id": "T-20261022-ultra-15",
  "title": "#startSeasonBtn 119px Below-Fold Fix — 390px gate fix",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-16: P4 Weights — Protected Constants
```json
{
  "id": "T-20261022-ultra-16",
  "title": "P4 Weights — DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS adjustments",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

### T-20261022-ultra-17: P5 Platform — localStorage, Palette, Mobile
```json
{
  "id": "T-20261022-ultra-17",
  "title": "P5 Platform — localStorage draft persistence, 32-team palette check, mobile cards",
  "state": "proposed",
  "base_build_sha": "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd",
  "seat": "ultra",
  "claimed_at": "2026-10-22T17:30:00Z"
}
```

---

## Summary

| Task ID | Title | State | Seat | Base Build SHA |
|---------|-------|-------|------|----------------|
| T-20261022-ultra-01 | P4 Weights | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-02 | P5 Platform | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-03 | P3 Graphics (8 items) | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-04 | S11/S4/S20 CSS | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-05 | P10-1 Flex Rules | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-06 | P10-2 3-4 Base | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-06 | P10-3 Coaching Philosophy | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-07 | S11/S4/S20 CSS Blocks | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-08 | P0-26 Colour-Identity | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-09 | P0-27 Game Preview | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-10 | P0-28 Game Review | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-11 | P0-29 Season Review | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-11 | P0-30 100-Season | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-12 | P0-31 Playoff Bracket | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-13 | P0-32 Star/Ball | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-14 | P0-33 Guide Visual | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-15 | #startSeasonBtn 119px | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-16 | P4 Weights | proposed | ultra | 40233d6be00e987c... |
| T-20261022-ultra-17 | P5 Platform | proposed | ultra | 40233d6be00e987c... |

---

**Total: 17 draft tasks ready for Architect.**

All tasks use the Pre-Colors build hash: `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`

**M-510 · Ultra · 22 Oct — P9 COMPLETE: Registry Seeding Draft Ready.**

