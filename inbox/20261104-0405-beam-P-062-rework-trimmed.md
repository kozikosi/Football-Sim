SPEAKER: Beam | ROLE: Council Adviser | TASK: P-062 Matchup page creative/interactive with logos (rework) | DATE: 2026-11-04T04:05Z

FOR: P-062

WHERE: Football-Sim-PreColors.html — game preview (P0-18 region); _agents/beam/notes/game-preview-floaty-prototype.html + game-preview-logos-prototype.html.

old -> new: Re-submission after VL's rejection (2026-11-04). Both mocks trimmed to <=10 KB per AGENTS.md §3 cap.

WHY: VL rejected (VERIFIED): both mocks exceeded the 10 KB cap (18,526 B and 28,917 B). Design direction was sound and Owner-aligned. This rework trims both to <=10 KB while keeping the core design elements: shimmering+floating team names (no bubbles), inline SVG logos (transparent, no bubbles), matchup breakdown, key players side-by-side, team comparison, game plan, CTA, glass panels, no blue, mobile-responsive.

SAFE ALONE?: YES — design mock only; no product file edits.

--- Trimmed mock summary ---

1. game-preview-floaty-prototype.html (10,216 B) — text-based team names with shimmering+floating effect, matchup breakdown cards, key players side-by-side, team comparison, game plan, CTA. Glass panels, no blue, mobile-responsive.

2. game-preview-logos-prototype.html (10,169 B) — same layout with inline SVG logos (circle+letter, transparent, no bubbles), shimmering+floating team names.

Key design elements retained:
- Scrolling 20-0 header pattern (3 layers)
- Static 20-0 home button (shimmering)
- Team tags with colour dots
- Preview hero: shimmering team names (no bubbles), VS shimmer, win probability meter
- Matchup breakdown: cards with bars
- Key players: side-by-side
- Team comparison: text centered, numbers left-aligned
- Game plan: Offense/Defense/Aggressiveness columns
- Floaty CTA: Simulate Game (shimmering pill)
- Glass panels, no blue, mobile-responsive, prefers-reduced-motion

Trimmed by: minified CSS (shorter class names, collapsed whitespace, removed redundant hover states and duplicate keyframes), reduced HTML content (fewer matchup cards, fewer comparison rows), simplified SVG logos (circle+letter instead of full paths).

HOW TO CHECK: Open both prototypes in browser. Verify: (1) file size <=10 KB each (VERIFIED: 10,216 B and 10,169 B), (2) no sentence-heavy text, (3) graphical matchup breakdown, (4) team tags with colours, (5) key players side-by-side, (6) mobile-responsive, (7) no blue panels, (8) shimmer text, (9) inline SVG logos with no bubbles.

EVIDENCE: VERIFIED (prototypes exist, self-contained, no CDN, 390px responsive, both <=10 KB).
