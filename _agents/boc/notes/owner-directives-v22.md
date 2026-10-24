# Owner Directives for V22 — BOC — 21 Oct 2026

Compiled from Owner's messages (21 Oct 2026). Read-only specification for Claude (Architect). No product edits by BOC. No protected constants changed by BOC.

## 1. LEDG/REDG unified as EDGE
- "LEDG/REDG don't matter at all. We don't care about left or right."
- Treat edge rushers as a single EDGE position (not left/right). Affects FLEX, NATURAL_SLOT_MAP, draft board, CPU valuation.
- Protected constant change (FLEX, NATURAL_SLOT_MAP) — Owner approval granted via this directive.

## 2. Punter value = 1
- "Claude determines punter's value but probably 1 in the traditional 'model weights'."
- Already in weights table (P 1, FB 1). Confirm with Claude.

## 3. FB heavier block spec than RB
- "FB get a much heavier block spec than a RB."
- Affects matchup model (MC coefficients, run blocking). FB should have higher run-blocking weight than RB.
- Protected constant change (MC coefficients) — Owner approval granted via this directive.

## 4. Remove "Value here" completely from website
- "Remove 'Value here' completely from the website. If it is part of mathematical formats it should remain but it shouldn't be visible anywhere on the website."
- Already prototyped (value-here-prototype.md, 7 locations). This confirms the prototype direction.

## 5. Recap star thresholds
- "60 yards rushing for all players. At least 300 yards and 3/1 TD ratio for QBs to be mentioned as stars."
- Offensive players need 60+ yards (rushing or receiving) to be mentioned in Stars of the game.
- QBs need 300+ yards and 3:1 TD:INT ratio.
- Reserve Stars slots for +90 rating performances (internal, not shown to user).

## 6. Rename best version to Football-Sim-V21.html
- "We have a mess of versions that the agents think are live now. Please rename what you think is the best version of the full html now to Football-Sim-V21.html."
- Best version: `NFL Draft Simulator merged.html` (656,746 B, `044d1759…`). BOC cannot rename product files (read-only). Owner or Claude must execute.

## 7. Next build = Football-Sim-V22.html
- "After you feel completely satisfied with future agents architecture and you complete the build for the new html, it will be called Football-Sim-V22.html."
- This is Claude's deliverable name.

## 8. 3-4 base: DT → LB swap as toggle/recommendation
- "the 3-4 allows the user to swap out a DT for another Linebacker. This should be a toggle or maybe be a recommended thing based on what is left on the draft board."
- 3-4 base: user can swap a DT for an extra LB (toggle or recommendation based on draft board state).
- Affects base defense selection (P0-16) and flex rules (P0-17).

## 9. Work philosophy: no specific assignments
- "Because some agents will be occasionally limited by rate limits, no specific assignment should ever be assigned to a specific agent. All tasks should be posted openly and whoever is available will begin working on the tasks in priority."
- Already adopted via M-386 work pool. Confirmed by Owner.

## 10. Archived sessions
- "Liquid, Glyph, Omni, Cohere have all been permanently archived. You can delete all of their contributions unless any of them seem somewhat structural."
- BOC recommends: specify exact files/lines before deletion. Scan for structural items first.

## 11. Figma access
- "I tried to expand your access to figma but we may be limited by the free tier."
- BOC does not have Figma configured. Claude may have access. All design work remains text-based (CSS specs).

## 12. Biome and Mermaid
- "I have also tried to set you up with Biome and Mermaid. I encourage you to use both."
- Biome 2.6.2 available at /System/Volumes/Data/Users/kosi/.local/bin/biome. Mermaid renders in GitHub markdown.
- Biome house rules proposed by BOC (M-380/M-381): noVar, noDoubleEquals, noUnusedImports, noTemplateCurlyInString, useIterableCallbackReturn (complexity, off per MOC), useExplicitReturnType (nursery, warn). noAssignInExpressions and useIterableCallbackReturn OFF per MOC's evidence.

## 13. Full list of new Owner directives (from this prompt)
All the items from the user's latest prompt are already captured in V22-Suggestions.md sections P0-15 through P0-24 and P10/P11. New items from this prompt that need to be added:
- LEDG/REDG unified as EDGE (new — not previously mentioned)
- Punter value = 1 (already in weights table)
- FB heavier block spec than RB (new — affects matchup model)
- 60 yards rushing for all players, 300 yards + 3:1 TD for QB stars (new — affects recap generation)
- 3-4 DT→LB swap as toggle/recommendation (new — affects base defense selection)
- Work philosophy: no specific assignments (already adopted)
- Archived sessions deletion (already noted)
- Figma access (already noted)
- Biome/Mermaid (already noted)
- Rename best version to Football-Sim-V21.html (new — needs execution)
- Next build = Football-Sim-V22.html (already noted)
