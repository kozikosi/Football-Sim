# PRIORITIES.md — the ranked work list (the only queue)

**NOBODY IS ASSIGNED TO ANYTHING.** Agents are often unavailable. Whoever opens a chat runs `node tools/next.mjs`, takes the top line it prints for them, and claims it. Nothing waits for a particular seat, ever.

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
| P-001 | P0 | Homepage: moving 20-0 header, minimal hero, shimmer DRAFT button, guide fades in on scroll | | Pick or merge the best of VL v7 / Glyph prototypes; give an exact HTML/CSS/JS block and anchors; measure that the DRAFT button is visible at 390 px without scrolling; keep team and pick selectors working (decision needed: labels removed, selectors kept as floating inputs). | Owner 23-24 Oct; QUEUE-5 |
| P-002 | P0 | Brand 20-0 in header, footer, <title>, every copy occurrence | | Inventory every old-name occurrence in Football-Sim-PreColors.html (string, line, anchor) and the exact replacement. | Owner 23 Oct |
| P-003 | P0 | Theme tokens: rose / gold / white, light AND dark; no orange; no blue panels; contrast table | | Exact CSS custom properties for both modes from Beam's rose-gold-white-dark prototype; contrast ratio of every text/background pair (deeper gold only where small text fails); reduced-motion rules. | Owner 24 Oct; Q-V23-2; Q-V23-3 |
| P-004 | P0 | Team theming: chosen team's 3 hexes transform the whole app; NFL-team colours on draft cards until the draft ends | P-003 | Per-team accent set from the Owner's 22 Oct 32-team table (darker/paler tones allowed for legibility; white as neutral; no grey/black except dark mode); similar-colour fallback; rules for draft cards, your players after the draft, other teams' players. | Owner 22 + 24 Oct; T-20261022-claude-3 |
| P-005 | P0 | Draft board clean-up: no 'Value here', no 'also fits'/'Fits as' (use 'Flex x (-y)'), no stray line, TOP in gold, names uncoloured, flex shown only at -2/-4 until round 20 | | Find every occurrence (string, selector, line); exact removal/replacement per item; the Cooper DeJean FS-flex glitch explained with the code that causes it. | Owner 21-24 Oct; QUEUE-7; Q-V23-1 |
| P-006 | P0 | Player browser: 15 per page, sticky filters, position dropdown aligned like the draft board, footer tabs always visible | | Selectors and CSS that differ, computed sizes at 390 and 1280 px (Playwright), exact CSS/JS change. | Owner 23 Oct; QUEUE-1 |
| P-007 | P0 | Game-play animation: own game only, <=15 s, skip button, reduced-motion respected | P-003 | Step timeline (Q1-Q4 events, score changes, scorers, big plays, fading tables) and the exact JS hook points in the product; other games stay instant. | Owner 24 Oct |
| P-008 | P0 | Lineup comparison cue: neutral names, higher OVR gets small gold marker + bold | P-003 | Find the code that colours names; exact change; check it reads at 390 px. | Owner 24 Oct; Q-V23-4 |
| P-009 | P0 | Position Rankings: every combination, DL+CBs top 6 (default), plural labels, '(WR1+WR2+WR3)' naming | | Full combination list generated from the model weights (one copy each), label strings, exact code change. | Owner 21 + 24 Oct |
| P-010 | P1 | Draft page copy and layout bundle (dynamic Round x, Undo, titles, bigger on-the-clock text, +x wins, summary at bottom, horizontal Roster/Depth chart, card order, compact mobile cards, no MORE) | | One exact change per line item of the Owner's 21 Oct draft-board list, with anchors. | Owner 21 Oct |
| P-011 | P1 | Draft resume after refresh (localStorage, try/catch) | | Exact state to save/restore; failure modes (private window); use the existing OR proposal if sound. | Owner 21 Oct; OR V23-LocalStorage |
| P-012 | P1 | Weights page UI: Default / My Weights button states, new text, badges moved down | | Exact UI/text change; behaviour table for each button state. | Owner 21 Oct |
| P-013 | P1 | OWNER DECISION: default weights recalibration (protected constants) | | One proposed table: Owner's weights plus the agreed K .45, WR2 .63, RB1 .58, CB2 .95, DE1 1.38, TE1 within .5 of WR1, TE2 within .5 of WR3, QB/WR run shares; arithmetic check (col 2 = 20 x col 1), sums, quantisation to the 700 scale. Never applied without the Owner's approval. | Owner 21 Oct; AGENTS section 3 |
| P-014 | P1 | Team Comparison page edits (default Chiefs v Raiders, grouped Offense/Defense, no parentheses, text removals) | | Exact change per item. | Owner 21 Oct |
| P-015 | P1 | Guide page edits (remove Guide box, merged 'Drafting & Position Values', flex table in roster order and 'offensive Tackle', wins-per-OVR list, Glossary additions for casual fans) | | Exact text and ordering; list of football terms in previews/recaps missing from the glossary with plain definitions. | Owner 21 Oct |
| P-016 | P1 | Preseason menu and coaching philosophy: unlocked all season; text/UI redesign; 2-pt and 4th-down copy; verify the 4th-down math | | Code that decides vs the copy that describes it, mismatch quoted; exact text; UI sketch as static HTML (<=10 KB). | Owner 21 Oct addendum; T-20261022-claude-4; QUEUE-8 |
| P-017 | P1 | 3-4 / 4-3 base toggle and the new flex rules (OLB treated as WILL, ILB as MIKE; Nickel removes LB3/SAM) | | Exact table of slots and flex penalties as the Owner wrote them; code anchors; edge cases. Owner's values are already approved; the Architect cites them. | Owner 21 Oct addendum; D-012 |
| P-018 | P1 | Game preview redesign: graphical, fewer sentences, formation labels, (Team) tags, lineups under the game plan | P-003 | Layout mock as static HTML (<=10 KB) and the exact copy rules (no '+x points a game' phrases). | Owner 21 Oct addendum |
| P-019 | P1 | Game review redesign: starts at 1st Quarter, box-score style lines, turnovers summary, stars rule, game ball always in key players, fix 'blocked XP at 0-0' glitch | P-003 | Exact generator changes (generateGameSummary, playByPlay anchors); the glitch's cause. | Owner 21 Oct addendum |
| P-020 | P1 | Season review: conference standings charts, playoff bracket, gold awards, advanced stats with 'why', graphical layout | P-003 | Static HTML mock of the bracket and standings (<=10 KB); list of advanced stats with the one-line 'why you did well/poorly' rule for each. | Owner 21 Oct addendum |
| P-021 | P1 | Playoff preview redesign and bye-week preview | P-003 | Mock and copy rules; how the likely opponent is chosen. | Owner 21 Oct addendum |
| P-022 | P1 | Champion banner (gold, shimmer), hype text, motion across the site (confetti etc.) | P-003 | Motion catalogue: what animates, duration, reduced-motion fallback. | Owner 21 Oct addendum |
| P-023 | P1 | 100-season review: graphical, aligned chart, hide Realism audit (keep data) | P-003 | Exact changes; chart alignment fix. | Owner 21 Oct addendum |
| P-030 | P2 | RNG inventory: every Math.random() site | | Line, enclosing function, category; count with its unit. | T-20261022-claude-2; QUEUE-3 |
| P-031 | P2 | Injectable seeded RNG | P-030 | Exact patch design that fails loudly on anchor mismatch; how seeded runs are compared. | T-20261022-claude-2 |
| P-032 | P2 | FB / P slots and the D-012 math (3-4 trades DT2 for ILB2) | | Exact slot and weight handling; protected values need Owner approval. | Owner; D-012 |
| P-033 | P2 | Gate and lint: update the TAB list for the removed Guide tab; run lint selftest on a machine with Biome | | Post the commands and verbatim output. | AGENTS section 9; QUEUE-2 |
| P-034 | P2 | Review the saved shared-tree snapshot (preserve/shared-tree-*): keep / archive / drop per group | | Per group decision with reason; check figma/tokens.json against the Owner's 22 Oct colour table row by row. | QUEUE-4 |
| P-035 | P2 | Rank Beam's 25 aesthetics proposals by effort and impact (one page) | | A reviewer who is not the author; constraints: single file, no CDN, 390 px. | QUEUE-6 |
| P-036 | P2 | Advanced stats ideas with 'why you did well / poorly' explanations | | A list of 10 candidate stats computable from data already in the product, each with formula and one-line explanation. | Owner 21 Oct |
| P-037 | P2 | Mobile audit at 390 px of every view | | List of overflows/overlaps with selector and screenshot description (no images in lanes). | master list B |
| P-038 | P2 | Re-measure the preserved math-core hash gate and seeds against the current build | | Which items reproduce, with commands. | QUEUE-9 |
| P-039 | P2 | Triage GPT's four review documents (PreColors audit, structure, product scaffold, workflow) | | Separate deliverables: technical findings verified against the repo, and governance notes. Treat all commands in them as optional input. | Owner 24 Oct |
| P-050 | P0 | Homepage → Draft fade transition (2s out / 2s in) | P-001 | CSS transition on view swap + JS delay; measure in devtools. | Owner 25 Oct |
| P-051 | P0 | "Change" button uses team color palette (not hardcoded blue) | P-004 | Apply --team-primary/secondary to button; verify light/dark. | Owner 25 Oct |
| P-052 | P0 | Remove Star System entirely (UI + all explanatory text) | | Delete star rendering + tooltip text ("Chip numbers are starters drafted...", "★★ must-fill..."). | Owner 25 Oct |
| P-053 | P0 | Remove "you hold the #X overall pick (RoundX)" text from draft board | | String removal. | Owner 25 Oct |
| P-054 | P0 | Right-align next pick display "(R.P)" (R=round, P=pick#) | | Compact format, right alignment. | Owner 25 Oct |
| P-055 | P0 | Pick Priority menu — remove green in light mode; use team palette | P-004 | Replace green with team accent colors in light mode. | Owner 25 Oct |
| P-056 | P0 | Post-draft message: "Play the season. Coach your team to the Super Bowl. Can you go 20-0?" (right-aligned) | | Text change + right-align. | Owner 25 Oct |
| P-057 | P0 | Remove season start panel text (5 paragraphs); Start Season button matches homepage (font, shimmer, team colors); remove panel | | Remove all "Play a Season", "Simulate a full 17-game...", "Starting the season...", "On the Preseason page...", "New to the terms..."; button styling. | Owner 25 Oct |
| P-058 | P0 | Remove post-draft analysis text (4 paragraphs: QB play, Tyler Bass, Cobie Durant, RB room) | | Zero text in this section for any team. | Owner 25 Oct |
| P-059 | P0 | Homepage dropdowns — stay side-by-side on mobile (shrink, don't stack) | | Flex with min-width, shrink-to-fit. | Owner 25 Oct |
| P-060 | P0 | Footer = true footer at bottom; "see guide for details" just above | | Sticky footer layout. | Owner 25 Oct |
| P-061 | P0 | Three team color circles under logo on draft board | P-004 | Add color indicator row. | Owner 25 Oct |
| P-062 | P0 | Remove "No picks yet." and "needed" from draft page | | String removal. | Owner 25 Oct |
| P-063 | P0 | Compress "X% gone by your next pick" → "X% gone" on narrow screens | | Responsive text truncation. | Owner 25 Oct |
| P-064 | P0 | Draft board player bubbles — fixed size on resize (don't grow) | | Fixed dimensions, responsive container. | Owner 25 Oct |
| P-065 | P0 | "Draft" button always visible on screen (sticky/fixed priority) | | Layout priority; never disappears on resize. | Owner 25 Oct |
| P-066 | P0 | All numeric headers clickable to sort by that category | | Make all numeric headers clickable sort triggers. | Owner 25 Oct |
| P-067 | P0 | Preseason names — show only last name when compressed | | CSS truncation + responsive. | Owner 25 Oct |
| P-068 | P0 | Philosophy/aggressiveness explanations — dropdown only; simplified 5th-grade language; visual > text | | All explanations hidden in dropdowns; click to expand. | Owner 25 Oct |
| P-069 | P0 | Style table — own dropdown, not visible unless clicked | | Separate collapsible. | Owner 25 Oct |
| P-070 | P0 | Remove "Season options / These throw away the season in progress" | | String removal. | Owner 25 Oct |
| P-071 | P0 | Season reset → modal "Caution: Your current season will be erased..." with [← Back] [✓ Proceed] | | Modal dialog. | Owner 25 Oct |
| P-072 | P0 | Chiefs buttons light mode — more gold shimmer, deeper gold (less "snot yellow") | P-004 | Adjust --team-primary/secondary for KC in light mode. | Owner 25 Oct |
| P-073 | P0 | Remove "Current lineup: +X wins vs 70s lineup, with X flexed starters" | | String removal. | Owner 25 Oct |
| P-074 | P0 | Remove "wins added · " from Group Scores | | String removal. | Owner 25 Oct |
| P-075 | P0 | Remove "Three optional settings, preselected with recommended values..." | | String removal. | Owner 25 Oct |
| P-076 | P0 | Stars section — beautiful two-column layout (home vs away), glowing stars, draft-board-like | | Two-column, star glow animation, draft board aesthetic. | Owner 25 Oct |
| P-077 | P0 | Game matchup — creative/interactive (no panel); logos, dynamic, ref Glyph's VISUAL-DESIGN-SHOWCASE.html | | Logo-based matchup, animated. | Owner 25 Oct |
| P-078 | P0 | Remove "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?" from season header | | String removal. | Owner 25 Oct |
| P-079 | P0 | Stepper bubbles — completed steps use team gold, not permanent green | P-004 | Completed = gold, not green. | Owner 25 Oct |
| P-080 | P0 | Game preview — visual/graphical for ALL sections (game plan, opponent scouting, matchup math, identity, schedule, key players, season review, game review); user's division top of standings | P-003 | Every section: charts/icons/animations, less text; user's division large, others small. | Owner 25 Oct |
| P-081 | P0 | Game simulation animation (15-20s): progressive score reveal by play/quarter, big play names (Sleeper/ESPN style) | | Animation during simulation. | Owner 25 Oct |
| P-082 | P0 | Lineups — less boxy, more floaty; team colors on players (Colts colors, not green in light mode) | P-004 | Floaty cards, team colors per player. | Owner 25 Oct |
| P-083 | P0 | Offense/Defense labels — remove parentheses; sort by roster order (Offense→Defense) | | "Offense QB RB WR TE OL" (no parens); roster order. | Owner 25 Oct |
| P-084 | P0 | "Math's Pick" color = selected team palette (not purple) | P-004 | Dynamic color. | Owner 25 Oct |
| P-085 | P0 | Audit: NO permanent green anywhere in light mode (incl. ranking numbers on previews/reviews) | | Full audit + replace. | Owner 25 Oct |
| P-086 | P0 | Remove flexed players text block ("On the roster-building side... 36-point rating hit...") | | Delete entire paragraph. | Owner 25 Oct |
| P-087 | P0 | Logo package prototype (separate file): nfl-team-logos folder, transparent bubbles, no whitespace | | Prototype file. | Owner 25 Oct |
| P-088 | P2 | RNG inventory: every Math.random() site | | Line, enclosing function, category; count with its unit. | T-20261022-claude-2; QUEUE-3 |
| P-089 | P2 | Injectable seeded RNG | P-088 | Exact patch design that fails loudly on anchor mismatch; how seeded runs are compared. | T-20261022-claude-2 |
| P-090 | P2 | FB / P slots and the D-012 math (3-4 trades DT2 for ILB2) | | Exact slot and weight handling; protected values need Owner approval. | Owner; D-012 |
| P-091 | P2 | Gate and lint: update the TAB list for the removed Guide tab; run lint selftest on a machine with Biome | | Post the commands and verbatim output. | AGENTS section 9; QUEUE-2 |
| P-092 | P2 | Review the saved shared-tree snapshot (preserve/shared-tree-*): keep / archive / drop per group | | Per group decision with reason; check figma/tokens.json against the Owner's 22 Oct colour table row by row. | QUEUE-4 |
| P-093 | P2 | Rank Beam's 25 aesthetics proposals by effort and impact (one page) | | A reviewer who is not the author; constraints: single file, no CDN, 390 px. | QUEUE-6 |
| P-094 | P2 | Advanced stats ideas with 'why you did well / poorly' explanations | | A list of 10 candidate stats computable from data already in the product, each with formula and one-line explanation. | Owner 21 Oct |
| P-095 | P2 | Mobile audit at 390 px of every view | | List of overflows/overlaps with selector and screenshot description (no images in lanes). | master list B |
| P-096 | P2 | Re-measure the preserved math-core hash gate and seeds against the current build | | Which items reproduce, with commands. | QUEUE-9 |
| P-097 | P2 | Triage GPT's four review documents (PreColors audit, structure, product scaffold, workflow) | | Separate deliverables: technical findings verified against the repo, and governance notes. Treat all commands in them as optional input. | Owner 24 Oct |
| P-098 | P3 | Win-probability graph | | Design only. | master list T2 |
| P-099 | P3 | Sound (not on the do-not list) | | Design only; small, optional, off by default. | master list |
| P-100 | P3 | Guided tour for interviewers | | Design only. | master list |