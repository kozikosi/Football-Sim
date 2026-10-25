SPEAKER: Beam | ROLE: Council Adviser | TASK: Design template — Season Review prototype (Owner-approved) | DATE: 2026-10-25T05:20Z

FOR: ALL (council-wide dissemination)

WHERE: _agents/beam/notes/season-review-floaty-prototype.html

old -> new: N/A (design template announcement).

WHY: Owner (Kosi) approved the Season Review floaty prototype as the canonical design template for V23. "I love the season review page — please publish and spread that more as specifically recommended as a good example and template of how to design."

SAFE ALONE?: YES — documentation/announcement only; no product file edits.

HOW TO CHECK: Open _agents/beam/notes/season-review-floaty-prototype.html in a browser. It demonstrates: dark rose/gold/white theme, open/airy glass panels, shimmering gradient text on titles, team-colour theming (KC Chiefs), record banner, sparkline, playoff bracket, conference standings, gold awards, champion banner, advanced stats, star cards, no blue, no orange, mobile-responsive.

--- DESIGN TEMPLATE SPECIFICATION (canonical for V23) ---

Palette (dark default):
  --bg: #0d0a0e (dark warm) / #fdf5f7 (light)
  --panel: rgba(255,255,255,0.04) (glass)
  --text: #f5f0f0 (white)
  --sub: #c9b8bc
  --accent: #d4af37 (gold — all numbers/texts)
  --accent2: #f5f0f0 (warm white)
  --accent3: #f0dce2 (pale rose, subtle)
  --gold: #d4af37 (clean gold, not orange)
  --team-primary/secondary/accent: from Owner's 22 Oct 32-team table

Typography:
  - Titles: shimmer-text (gradient text animation, gold/rose)
  - Body: warm white (#f5f0f0), line-height 1.6
  - Numbers: gold (#d4af37), tabular-nums
  - Labels: uppercase, 0.7rem, letter-spacing 0.04em, --sub colour

Panels:
  - Glass: rgba(255,255,255,0.04) + backdrop-filter blur(8px)
  - Hairline border: rgba(255,255,255,0.08)
  - Radius: 16px
  - Padding: 20px
  - No drop shadow by default; shadow on hover
  - Flattened nesting (panel .panel = transparent)

Spacing:
  - Gap between sections: 24px
  - Card padding: 16-20px
  - Generous whitespace (no dense packing)

Motion:
  - Shimmer on gold text (2.5s ease-in-out infinite)
  - Sparkle on gold elements (2s ease-in-out infinite)
  - Pop-in on banners (0.5s ease-bounce)
  - Hover: translateY(-1px to -2px) + shadow
  - All animations respect prefers-reduced-motion

Team theming:
  - Global rose/gold/white is default
  - When team selected, --team-primary/secondary/accent override
  - Team colours on team-specific elements only (tags, score boxes, avatars)
  - No blue anywhere

Value Here: removed from all visuals (background calc only).

No emojis. No orange. No blue panels. Open/airy.

--- DRAFT BOARD FEEDBACK ---
The draft board prototype (draft-board-floaty-prototype.html) needs revision: players are too big. Recommend compact card layout with smaller fonts, tighter spacing, and horizontal scroll for the table on mobile. The season review template should guide the compaction.

EVIDENCE: VERIFIED (prototype file exists, self-contained, no CDN, 390px responsive).
