# Wave Ledger — DRAFT (w65 backfill)

**Status:** Draft demonstrating the format. The live ledger goes on gh-pages per the proposal (`inbox/20261104-0415-muse-wave-ledger-proposal.md`). This file is on council/muse only.

Cross-track record of what Z.ai's waves claim vs what QA verifies.
States: CLAIMED → VERIFIED or FAILED. Only VERIFIED hides an item from "ready to build."

Maintained by: MUSE (default) / any seat running QA.
Pushed to gh-pages alongside wave HTML by whoever pushes the wave.

---

## w65 (live 2026-11-03)

Source: MUSE browser QA pass (Detroit Lions, Sim to End, reload/restore, Player Browser, preseason setup).
Note: w65 predates the embed convention — claims below are inferred from w64→w65 diff + wave notes.

- **P-232** (P0 model-lineup bug): CLAIMED (FLEX table synced to REV 4 — `QB:{FS:10}` present, `QB:{RB` gone) → **FAILED** (auto lineup still mispositions: OT at RB1, RB at WR1, RB at TE2, WR at TE3, LB at DE1, DE at WILL/SAM, P at K. Preseason now applies out-of-position OVR penalties, confirming the app knows placements are wrong.)
- **P-226** (Player Browser beyond-60): CLAIMED (pagination added) → **FAILED** (shipped as "PAGE 1 OF 20" with PREV/NEXT — Owner explicitly rejected page numbers. False code comment claims "Owner's page law." Needs infinite scroll / Load more / virtualized list.)
- **Autosave chip**: CLAIMED → **VERIFIED** (reload → "RESTORE SAVED SEASON" brings back full season: team, lineup, preseason intact.)
- **Preseason heading**: CLAIMED → **VERIFIED** (shows correct drafted team; no "Kansas City Chiefs" leakage.)
- **P-009** (Position Rankings combinations): **VERIFIED** (present in w65 HTML; retired as built 2026-11-04 — was listed as "ready to build" in error.)

### New in w65 (not P-items; noting for record)
- 4-3/3-4 base-defense toggle, coaching philosophy, game-day aggressiveness sliders
- FLEX1/FLEX2 slots, QB flex eligibility, returner selection, team rating cards
- Out-of-position OVR penalties in preseason setup
- Minor: transient OG1 render artifact in draft room (final lineup correct)

---

## Format for future waves

```html
<!--
WAVE: w66
CLAIMS:
- P-XXX: short description
-->
```

Z.ai embeds claims at the top of the HTML file. Beam pushes this LEDGER.md alongside the wave HTML to gh-pages. QA updates states. Claude's digest fetches via git from `origin/gh-pages`.
