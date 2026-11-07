# Madden Rankings dropdown cleanup (UI proposal)

Problem: dropdowns on Madden Rankings page are messy; order differs from depth chart.

Fix:
- Add the same button family as the draft board (`.zpb-selwrap` / `.zpb-selbtn` / `.zpb-selpop`) to every select on the Madden Rankings page.
- Reorder options to match depth-chart order (DEPTH_CHART_GROUPS order), keeping position groups.
- Keep position groups as optgroups/sections.

Anchor: search for `maddenRankings` / `renderMadden` / position group renders. Apply via patch after Architect locates anchors.
