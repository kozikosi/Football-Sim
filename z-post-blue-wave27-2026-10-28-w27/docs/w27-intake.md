# W27 INTAKE LEDGER — Owner message, 28 Oct 2026 (wave 27 round)

Baseline: w26 `5f947bccf2a9392a85fe01ef11164622` (verified byte-identical to council/zai @183fe05).
Law: Owner's words verbatim; conflicts resolve in favor of the NEWER directives.

| # | Owner line (abridged) | Target | Fix |
|---|---|---|---|
| 1 | Brave Madden Rankings SETBACK "Cannot set properties of null (setting 'textContent')" | render() #totalwt | create-if-missing guard + boot retry; #groupCount/#groupBody guarded too |
| 2 | Brave Guide SETBACK "Cannot read properties of undefined (reading 'olRun:34:…')" | zpbAdjSpec cache | `window._zpbAdjCache` init at function entry + at base34 restore |
| 3 | Player Browser: remove "XF" | row template | XF span removed |
| 4 | Player Browser: numbers same color as names | score/stat tds | td.num + td.score wear --tn/--tnd |
| 5 | Some players colored, some aren't (Stafford blue, Garrett not) | .zpb-vib in browser + dark override | names always team primary (--tn light / --tnd dark); vib keeps bold |
| 6 | Bills blue + Rams blue too dark | zpbPackFor | targeted eng lightness lift (hue 195-255, l<0.45 → 0.47) for Bills/Rams only |
| 7 | Remove LEAK emoji (Madden Rankings) | chip | w26 already removed both symbols; verified text-only; noted to Owner (stale-cache hint) |
| 8 | Rankings buttons: "UNDEFINED" after correct player | zpbRenderCustomRankings 3-tuple vs p[3] | 4-tuple + defensive ovr fallback in zpbGroupPlayerHTML |
| 9 | Default selection = Series #9; THE SERIES back in dropdown 1-26 (dropdown only) | groupSelect | options re-enabled; boot sets zpbS:9; buttons stay individual toggles |
| 10 | Remove "Ranking by these 1 spots." | groupCount text | cleared in custom mode |
| 11 | WELCOME alone an extra second; DRAFT fade 1s sooner after centering | zpbWelcomeCine | beats 1500/1850/4450/5150/7450/9350 |
| 12 | Postdraft: 20-0 appears ~2s faster; all text disappears ~2s faster | zpbMaybeFinishCine | hold[2] 2900→900; tail 3600→1600; fade 1.6→1.2s |
| 13 | Roster Preview + Team Comparison: 90+ shimmer, 85+ bold/vibrant, else neutral NOT bold, in team colors | CSS + lu-win + playername | .zpb-vib bold; .zpb-lu-win unbolded; roster playername team color, weight 500 |
| 14 | Comparison dropdown static text: never a partial word | zpb select enhancer face | width-aware label: full → city-only → abbr, JS-measured |
| 15 | Comparison: colored panel behind EVERY player | lu cells | uniform tint + hairline on every filled cell (winner cells included) |
| 16 | Comparison: unbold sub-85 | lu-win | font-weight removed |
| 17 | WINS + PRIORITY missing in Brave only | draft table width | desktop-compact media rules (≤1280 gentle, ≤1080 stronger), nowrap heads |
| 18 | X.Y top-right of top panel significantly larger | .zpb-nextpick | 1.55rem, team accent, bold |
| 19 | DIME on depth chart: different color + too far left | .zpb-dimerow overrides | standard gold chip restored on dgrid rows; zones version keeps no-box look |
| 20 | DRAFT button alternates static/hover look for TOP players | board rows | zpb-top3 class on row + pulse keyframes (reduced-motion aware) |
| 21 | Draft Review: FB in skill positions, not Specialist | GROUPS | FB moved to Quarterback & Skill Positions |
| 22 | Draft Review: remove top roster visualization; keep cards | wireRowClicks detail | renderDepthChartHTML removed; breakdown badges stay |
| 23 | Visualize draft pick like "Where they line up" with players' initials | NEW zpbBelongMapHTML | field map + initials chips; Nickel+Dime row between CBs and LBs, same line |
| 24 | Guide flex menu: swap C and OG; swap FS and Nickel/Dime | zpbFlexTree CATS | [OT,C,OG]; [CB,FS,SS,ND] |
| 25 | Defense viz: Nickel another color, Dime another color, Dime filled when in lineup | zpbDefGuideHTML | NICKEL #4f86e0, DIME #7fd67f, .z-db.c-dm filled |
| 26 | Player panel example values (3rd repeat) | zpbBadgesGuideHTML schips | PassY 5,000 · TD 50 · INT 15 · 20-0 158.3 · RushY 250 · SK 25 · QBR 100 · W 20 |
| 27 | Remove "The season in badges" h5 + Regular-Season-Review paragraph | zpbBadgesGuideHTML | removed |
| 28 | Remove Rookie of the Year + Comeback Player of the Year glossary lines | glossary extra | removed |
| 29 | Guide: Coaching below Defense, open by default; Reading the Badges below Coaching | renderGuideHTML | order: DRAFTING, DEFENSE, COACHING(open), BADGES(open), BOARD(open+visualized), MATH, GLOSSARY |
| 30 | Reading the Draft Board open + visualize the text like other panels | boardMathHTML | Wins/Priority/Gone as three badge cards + scarcity callout, all text kept |

Open interpretations (Owner may veto): (a) "same horizontal line as them" read as Nickel+Dime sharing one slot row; (b) belong-map replaces the depth chart for every team's detail row, not only the user's; (c) ★/✕ typographic glyphs kept (not emoji presentation); (d) series dropdown option labels keep "1 QB + CB1 + …" cumulative format.
