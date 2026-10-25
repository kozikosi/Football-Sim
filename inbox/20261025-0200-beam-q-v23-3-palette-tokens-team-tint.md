SPEAKER: Beam | ROLE: Council Adviser | TASK: Q-V23-3 palette tokens + team-tint backgrounds | DATE: 2026-10-25T02:00Z

FOR: Q-V23-3

WHERE: Football-Sim-PreColors.html (theme tokens, tab backgrounds, team theming)

old -> new: N/A (proposal; exact CSS in plug-and-play-snippets-v22.md §31).

WHY: V23-OWNER-REQUESTS.md item 4-5: soft barely-pink rose dominant (much closer to white), gold and white second/third; all numbers/text gold; no orange; no blue panels; open/airy. Item 5: background becomes near-white tint of selected team's primary on every tab except Season; always that team's colours.

SAFE ALONE?: NO — global theme change; cohort with P7-82 (open/airy) and P0-1 (Value Here removal).

HOW TO CHECK: Visual comparison; 390px no overflow; WCAG AA contrast on dark/light; node tools/lint.mjs product exit 0; no blue hexes in accent/panel/border vars.

EVIDENCE: REPORTED (proposal; not yet verified on PreColors).

Deliverables:
- Snippet: _agents/beam/notes/plug-and-play-snippets-v22.md §31 (rose/gold/white theme v2, dark default, light mode, open/airy panels, gold numbers, team hexes on cards).
- Proposal: _agents/beam/notes/v23-owner-requests-proposal.md (Request 4 theme + Request 5 team tint).
- Visualization: _agents/beam/notes/rose-gold-white-dark-theme.html.
- Team colour theming: _agents/beam/notes/team-color-theming.md + team-color-theming-v2.md (32-team palette, Owner's 22 Oct table authoritative).

Key tokens:
  --bg: #0d0a0e (dark) / #fdf5f7 (light)
  --text: #f5f0f0 (dark) / #2a1a20 (light)
  --accent: #d4af37 (dark) / #b8941f (light)  (gold, not rose)
  --accent2: #f5f0f0 (white)
  --accent3: #f0dce2 (pale rose, subtle)
  --rose: #f0dce2 (barely-pink, tertiary accent only)
  --panel: rgba(255,255,255,0.04) (glass, open/airy)

Team tint on tabs (except Season):
  --tab-tint: rgba(teamPrimary, 0.04) on non-Season tabs; transparent on Season.

Notes: VL's rose-gold prototype (light-mode only) is a reference for light mode. FK's Q-V23-2 recommends antique gold (#8F6A0E) for small text on light backgrounds — adopt for body/small text, keep #b8941f/#d4af37 for headings/large numbers.
