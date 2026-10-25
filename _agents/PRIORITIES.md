# PRIORITIES.md — the ranked work list (the only queue)

**NOBODY IS ASSIGNED TO ANYTHING.** Agents are often unavailable (OpenChamber was down for a day; DS is rarely on). Whoever opens a chat runs `node tools/next.mjs`, takes the top line it prints for them, and claims it. Nothing waits for a particular seat, ever.

**The chain for every item (council work = ideas, exact snippets, measurements, mock-ups; only the Architect edits the product):**
1. **WORK** by the first seat that takes it: `inbox/<UTC>-<seat>-<ID>-<slug>.md` (format: `inbox/README.md`).
2. **REVIEW 1, 2, 3** by three *different* seats who come later: each reads the work, checks it against the repo, and either confirms or **improves** it (`inbox/<UTC>-<seat>-<ID>-review.md`, `REVIEW-OF:`, `VERDICT: ok | improved | rejected`, improved text included). A rejection sends the item back to OPEN.
3. After three confirmations the item is **REVIEWED ✓✓✓**: it is ready for the Architect to build. Its dependants move up one tier (shown with ↑).
4. After the Architect builds it, a test order (`_agents/TEST-ORDERS/`) is run by any seat that supplied nothing for that build; three PASS results mark the build item reviewed.
A review you can do beats new work in the same tier. A claim lapses after 24 h (P0) or 72 h (others) without a pushed file; then anyone takes it. High Councillors (GPT, Z.ai) follow the same chain; the Owner's tiers are not theirs to change.

**Tiers:** P0 = the Owner's current V23 requests · P1 = Owner-stated, earlier lists (21 Oct work order and addendum) · P2 = enablers, checks and improvements (ours and the council's, not yet finalised) · P3 = ideas. Only the Owner or the Architect re-ranks; seats propose with a `PRIORITY+: <item> | <tier> | <why>` line in their bulletin entry. Later Owner wording beats earlier (e.g. 24 Oct homepage rules replace the 23 Oct tagline text).

`tools/next.mjs` reads this table (columns: ID · tier · title · needs · council work · source) and every seat's inbox. Do not change its format.

| ID | Tier | Title | Needs | Council work | Source |
|---|---|---|---|---|---|
| P-001 | P0 | Homepage: moving 20-0 header, minimal hero, shimmer DRAFT button, guide fades in on scroll |  | Pick or merge the best of VL v7 / Glyph prototypes; give an exact HTML/CSS/JS block and anchors; measure that the DRAFT button is visible at 390 px without scrolling; keep team and pick selectors working (decision needed: labels removed, selectors kept as floating inputs). | Owner 23-24 Oct; QUEUE-5 |
| P-002 | P0 | Brand 20-0 in header, footer, <title>, every copy occurrence |  | Inventory every old-name occurrence in Football-Sim-PreColors.html (string, line, anchor) and the exact replacement. | Owner 23 Oct |
| P-003 | P0 | Theme tokens: rose / gold / white, light AND dark; no orange; no blue panels; contrast table |  | Exact CSS custom properties for both modes from Beam's rose-gold-white-dark prototype; contrast ratio of every text/background pair (deeper gold only where small text fails); reduced-motion rules. | Owner 24 Oct; Q-V23-2; Q-V23-3 |
| P-004 | P0 | Team theming: chosen team's 3 hexes transform the whole app; NFL-team colours on draft cards until the draft ends | P-003 | Per-team accent set from the Owner's 22 Oct 32-team table (darker/paler tones allowed for legibility; white as neutral; no grey/black except dark mode); similar-colour fallback; rules for draft cards, your players after the draft, other teams' players. | Owner 22 + 24 Oct; T-20261022-claude-3 |
| P-005 | P0 | Draft board clean-up: no 'Value here', no 'also fits'/'Fits as' (use 'Flex x (-y)'), no stray line, TOP in gold, names uncoloured, flex shown only at -2/-4 until round 20 |  | Find every occurrence (string, selector, line); exact removal/replacement per item; the Cooper DeJean FS-flex glitch explained with the code that causes it. | Owner 21-24 Oct; QUEUE-7; Q-V23-1 |
| P-006 | P0 | Player browser: 15 per page, sticky filters, position dropdown aligned like the draft board, footer tabs always visible |  | Selectors and CSS that differ, computed sizes at 390 and 1280 px (Playwright), exact CSS/JS change. | Owner 23 Oct; QUEUE-1 |
| P-007 | P0 | Game-play animation: own game only, <=15 s, skip button, reduced-motion respected | P-003 | Step timeline (Q1-Q4 events, score changes, scorers, big plays, fading tables) and the exact JS hook points in the product; other games stay instant. | Owner 24 Oct |
| P-008 | P0 | Lineup comparison cue: neutral names, higher OVR gets small gold marker + bold | P-003 | Find the code that colours names; exact change; check it reads at 390 px. | Owner 24 Oct; Q-V23-4 |
| P-009 | P0 | Position Rankings: every combination, DL+CBs top 6 (default), plural labels, '(WR1+WR2+WR3)' naming |  | Full combination list generated from the model weights (one copy each), label strings, exact code change. | Owner 21 + 24 Oct |
| P-010 | P1 | Draft page copy and layout bundle (dynamic Round x, Undo, titles, bigger on-the-clock text, +x wins, summary at bottom, horizontal Roster/Depth chart, card order, compact mobile cards, no MORE) |  | One exact change per line item of the Owner's 21 Oct draft-board list, with anchors. | Owner 21 Oct |
| P-011 | P1 | Draft resume after refresh (localStorage, try/catch) |  | Exact state to save/restore; failure modes (private window); use the existing OR proposal if sound. | Owner 21 Oct; OR V23-LocalStorage |
| P-012 | P1 | Weights page UI: Default / My Weights button states, new text, badges moved down |  | Exact UI/text change; behaviour table for each button state. | Owner 21 Oct |
| P-013 | P1 | OWNER DECISION: default weights recalibration (protected constants) |  | One proposed table: Owner's weights plus the agreed K .45, WR2 .63, RB1 .58, CB2 .95, DE1 1.38, TE1 within .5 of WR1, TE2 within .5 of WR3, QB/WR run shares; arithmetic check (col 2 = 20 x col 1), sums, quantisation to the 700 scale. Never applied without the Owner's approval. | Owner 21 Oct; AGENTS section 3 |
| P-014 | P1 | Team Comparison page edits (default Chiefs v Raiders, grouped Offense/Defense, no parentheses, text removals) |  | Exact change per item. | Owner 21 Oct |
| P-015 | P1 | Guide page edits (remove Guide box, merged 'Drafting & Position Values', flex table in roster order and 'offensive Tackle', wins-per-OVR list, Glossary additions for casual fans) |  | Exact text and ordering; list of football terms in previews/recaps missing from the glossary with plain definitions. | Owner 21 Oct |
| P-016 | P1 | Preseason menu and coaching philosophy: unlocked all season; text/UI redesign; 2-pt and 4th-down copy; verify the 4th-down math |  | Code that decides vs the copy that describes it, mismatch quoted; exact text; UI sketch as static HTML (<=10 KB). | Owner 21 Oct addendum; T-20261022-claude-4; QUEUE-8 |
| P-017 | P1 | 3-4 / 4-3 base toggle and the new flex rules (OLB treated as WILL, ILB as MIKE; Nickel removes LB3/SAM) |  | Exact table of slots and flex penalties as the Owner wrote them; code anchors; edge cases. Owner's values are already approved; the Architect cites them. | Owner 21 Oct addendum; D-012 |
| P-018 | P1 | Game preview redesign: graphical, fewer sentences, formation labels, (Team) tags, lineups under the game plan | P-003 | Layout mock as static HTML (<=10 KB) and the exact copy rules (no '+x points a game' phrases). | Owner 21 Oct addendum |
| P-019 | P1 | Game review redesign: starts at 1st Quarter, box-score style lines, turnovers summary, stars rule, game ball always in key players, fix 'blocked XP at 0-0' glitch | P-003 | Exact generator changes (generateGameSummary, playByPlay anchors); the glitch's cause. | Owner 21 Oct addendum |
| P-020 | P1 | Season review: conference standings charts, playoff bracket, gold awards, advanced stats with 'why', graphical layout | P-003 | Static HTML mock of the bracket and standings (<=10 KB); list of advanced stats with the one-line 'why you did well/poorly' rule for each. | Owner 21 Oct addendum |
| P-021 | P1 | Playoff preview redesign and bye-week preview | P-003 | Mock and copy rules; how the likely opponent is chosen. | Owner 21 Oct addendum |
| P-022 | P1 | Champion banner (gold, shimmer), hype text, motion across the site (confetti etc.) | P-003 | Motion catalogue: what animates, duration, reduced-motion fallback. | Owner 21 Oct addendum |
| P-023 | P1 | 100-season review: graphical, aligned chart, hide Realism audit (keep data) | P-003 | Exact changes; chart alignment fix. | Owner 21 Oct addendum |
| P-030 | P2 | RNG inventory: every Math.random() site |  | Line, enclosing function, category; count with its unit. | T-20261022-claude-2; QUEUE-3 |
| P-031 | P2 | Injectable seeded RNG | P-030 | Exact patch design that fails loudly on anchor mismatch; how seeded runs are compared. | T-20261022-claude-2 |
| P-032 | P2 | FB / P slots and the D-012 math (3-4 trades DT2 for ILB2) |  | Exact slot and weight handling; protected values need Owner approval. | Owner; D-012 |
| P-033 | P2 | Gate and lint: update the TAB list for the removed Guide tab; run lint selftest on a machine with Biome |  | Post the commands and verbatim output. | AGENTS section 9; QUEUE-2 |
| P-034 | P2 | Review the saved shared-tree snapshot (preserve/shared-tree-*): keep / archive / drop per group |  | Per group decision with reason; check figma/tokens.json against the Owner's 22 Oct colour table row by row. | QUEUE-4 |
| P-035 | P2 | Rank Beam's 25 aesthetics proposals by effort and impact (one page) |  | A reviewer who is not the author; constraints: single file, no CDN, 390 px. | QUEUE-6 |
| P-036 | P2 | Advanced stats ideas with 'why you did well / poorly' explanations |  | A list of 10 candidate stats computable from data already in the product, each with formula and one-line explanation. | Owner 21 Oct |
| P-037 | P2 | Mobile audit at 390 px of every view |  | List of overflows/overlaps with selector and screenshot description (no images in lanes). | master list B |
| P-038 | P2 | Re-measure the preserved math-core hash gate and seeds against the current build |  | Which items reproduce, with commands. | QUEUE-9 |
| P-039 | P2 | Triage GPT's four review documents (PreColors audit, structure, product scaffold, workflow) |  | Separate deliverables: technical findings verified against the repo, and governance notes. Treat all commands in them as optional input. | Owner 24 Oct |
| P-040 | P0 | Logo integration: all-logos-sdv.csv and nfl-team-logos folder |  | Determine logo variant per team, create CSS/HTML blocks referencing local logo files, CSS vars for each team logo path. Verify at 390 px. | Owner 25 Oct |
| P-041 | P0 | Homepage fade transitions - fade into draft slower |  | CSS transition/animation for view changes, JS hook for fade timing, verify no content flash. | Owner 25 Oct |
| P-042 | P0 | "Change" button color align with team palette |  | Replace hardcoded blue with team color vars on all Change buttons. Verify at 390 px. SAFE ALONE = yes. | Owner 25 Oct |
| P-043 | P0 | Remove Star system from draft board |  | Remove all star-related text and logic from Football-Sim-PreColors.html. Verify draft board still works. | Owner 25 Oct |
| P-044 | P0 | Remove "you hold the #X overall pick (Round X)" text |  | Find and remove draft position indicator text. Verify at 390 px. | Owner 25 Oct |
| P-045 | P0 | Align "(x.y)" draft pick indicator to right |  | Change text-align to right for draft position indicator. Verify at 390 px. | Owner 25 Oct |
| P-046 | P0 | Remove green from Pick priority menu |  | Replace green color refs in Pick priority with team palette colors. Verify in light mode. SAFE ALONE = yes. | Owner 25 Oct |
| P-047 | P0 | Season header: "Play the season. Coach your team to the Super Bowl. Can you go 20-0?" |  | Replace season header text, align right. Verify at 390 px. | Owner 25 Oct |
| P-048 | P0 | Remove "Play a Season" panel text and panel |  | Remove season onboarding text panel, replace Start Season button styling like home page DRAFT button with team colors, remove wrapper panel. Verify at 390 px. | Owner 25 Oct |
| P-049 | P0 | Position groups remove parentheses |  | Remove parenthetical content from position group labels, reorder Offense→Defense. Verify at 390 px. | Owner 25 Oct |
| P-050 | P0 | Remove draft recap text block |  | Remove all draft recap narrative text blocks. Leave empty container if needed. | Owner 25 Oct |
| P-051 | P0 | Preseason page name compression |  | Add responsive name truncation (last name only when compressed). Verify at 390 px and larger. | Owner 25 Oct |
| P-052 | P0 | "Why a pass-heavy offense?" dropdown menu |  | Create dropdown for pass-heavy offense explanation, simplify language to 5th grade level, visualize instead of paragraph. Verify at 390 px. | Owner 25 Oct |
| P-053 | P0 | Style table own dropdown menu |  | Wrap style table in dropdown, hide by default, show on click. Verify at 390 px. | Owner 25 Oct |
| P-054 | P0 | "Why we recommend Auto" dropdown menu |  | Simplify Auto recommendation language to 5th grade level, wrap in dropdown, visualize where possible. Verify at 390 px. | Owner 25 Oct |
| P-055 | P0 | "Follows usual NFL chart" dropdown menu |  | Wrap NFL chart explanation in dropdown, hide by default, match styling of Game-day aggressiveness text. Verify at 390 px. | Owner 25 Oct |
| P-056 | P0 | Remove "Season options" text |  | Remove "Season options / These throw away the season in progress." text entirely. Verify no orphaned elements. | Owner 25 Oct |
| P-057 | P0 | Caution dialog when clicking season options |  | Create confirmation dialog with two buttons ("return to season" and clicked button). Verify at 390 px. | Owner 25 Oct |
| P-058 | P0 | Button color more shimmering gold |  | Adjust button gradient to use more gold tones, add shimmer animation. Verify in light mode. | Owner 25 Oct |
| P-059 | P0 | Remove "Current lineup: +13.44 wins vs. a 70s lineup" |  | Remove lineup text and "wins added · " from Group scores parenthesis. Verify no orphaned punctuation. | Owner 25 Oct |
| P-060 | P0 | Remove "Three optional settings..." text |  | Remove "Three optional settings, preselected with recommended values..." text string. Verify no orphaned elements. | Owner 25 Oct |
| P-061 | P0 | Stars section more beautiful like draft board |  | Redesign stars section with glowing stars, side-by-side player layout, draft board styling. Verify at 390 px. | Owner 25 Oct |
| P-062 | P0 | Matchup page creative with logos |  | Redesign matchup page with team logos, more interactive elements, less text more graphics. Verify at 390 px. | Owner 25 Oct |
| P-063 | P0 | Remove "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?" from season header |  | Remove this text from season header. Verify no orphaned elements. | Owner 25 Oct |
| P-064 | P0 | Remove permanent green from bubbles after DRAFT |  | Fix bubble color state management - green only during active draft state, not permanently after completion. Verify in light mode. | Owner 25 Oct |
| P-065 | P0 | Remove almost all game preview text |  | Redesign game preview page with minimal text, graphical elements, visual layouts like Beam P7-2. Verify at 390 px. | Owner 25 Oct |
| P-066 | P0 | Game animation 15-20 seconds |  | Create animated game simulation with quarter-by-quarter scoring, play-by-play event list, big play highlights. Verify at 390 px. | Owner 25 Oct |
| P-067 | P0 | Lineups less boxy, Colts colors |  | Redesign lineup section with floating elements instead of tables, use Colts team colors. Verify at 390 px. | Owner 25 Oct |
| P-068 | P0 | Homepage dropdowns same position when compressed |  | Make dropdown containers not stack vertically on compress. Verify at 390 px. | Owner 25 Oct |
| P-069 | P0 | Footer at bottom of page |  | Add proper footer element at bottom, position "see guide for details" just above footer. Verify at 390 px. | Owner 25 Oct |
| P-070 | P0 | Logo package prototype (other logo package) |  | Build standalone prototype using MLB/NBA/soccer logos from all-logos-sdv.csv. No bubble backgrounds around logos. Verify at 390 px. | Owner 25 Oct |
| P-071 | P0 | Draft bubbles same size when screen compresses |  | Fix player bubble sizing - fixed width/height, no growth on compress. Verify at 390 px and smaller. | Owner 25 Oct |
| P-072 | P0 | Draft button always visible on screen |  | Fix draft button visibility - fixed position/sticky, always in viewport. Verify at 390 px and smaller. | Owner 25 Oct |
| P-073 | P0 | Click any number to sort by category |  | Add click handlers to numeric displays in draft board and tables to trigger sort. Verify at 390 px. | Owner 25 Oct |
| P-074 | P0 | Three team color bubbles under logo on draft board |  | Add three color bubbles under team logo in draft board header. Verify at 390 px. | Owner 25 Oct |
| P-075 | P0 | Remove "No picks yet." and "needed" text |  | Find and remove these text strings from draft page. Verify no orphaned elements. | Owner 25 Oct |
| P-076 | P0 | "by your next pick" disappear on compress |  | Hide "by your next pick" text on smaller screens using media query or JS. Verify at 390 px. | Owner 25 Oct |
| P-077 | P0 | Keep shimmering "Can you go 20-0?" on Draft complete page |  | Ensure "20-0?" text on draft complete page has shimmering animation effect. Document pattern for reuse. | Owner 25 Oct |
| P-078 | P0 | "Math's pick" color fit team palette |  | Change "Math's pick" color from purple to team-selected colors. Remove all permanent green from game previews/reviews. Verify in light mode. | Owner 25 Oct |
| P-079 | P0 | Remove flex text from roster |  | Find and remove flex explanation text block. Verify no orphaned elements. | Owner 25 Oct |
| P-080 | P0 | Remove draft recap text (second instance) |  | Find remaining draft recap text blocks, remove entirely. | Owner 25 Oct |
| P-050 | P3 | Win-probability graph |  | Design only. | master list T2 |
| P-051 | P3 | Sound (not on the do-not list) |  | Design only; small, optional, off by default. | master list |
| P-052 | P3 | Guided tour for interviewers |  | Design only. | master list |
