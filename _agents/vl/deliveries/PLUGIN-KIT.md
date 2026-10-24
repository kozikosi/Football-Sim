# VL — V23 plug-in kit (interactive & beautiful)

Advisory prototypes for Claude's V23 build. Every block below is cosmetic/UI only — no protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`) touched. Source: V22-Suggestions.md P0-18 / P0-19 / P0-29 (Owner-feedback wave 2) plus VL creative extensions. Product: `Football-Sim-V23.html` (Architect writes it).

## How to plug in
1. Copy `:root` token block **first** into V23's `<style>`.
2. Copy each `BLOCK: <item>` CSS + its tiny JS helper into V23's `<style>` / `<script>`.
3. Set `--team-primary/secondary/tertiary` on `:root` when a user team is selected; set `--opp-primary/secondary/tertiary` on matchup load (P0-29 / P8-g.1).
4. Gate all motion on `prefers-reduced-motion` (already in each block).
5. Verify at 390 px (`tests/e2e-smoke.mjs`) and desktop; run seeded A/B to confirm no model movement.

## Block index (V22 item → block → where in product)

| Block | V22 item | What | Where in V23 |
|---|---|---|---|
| `P0-29-tokens` | P0-29 | `:root` team/opp palette tokens + motion tokens | product `<style>`, top |
| `P0-29-draft-header` | P0-29 | Draft header left border + team-name text in user team colors | draft-board header ("Drafting as ...") |
| `P0-29-matchup-colors` | P0-29 / P8-g.1 | Opponent team colors on panels, labels, star tints, game-ball star | matchup UI, game preview/review |
| `P0-19-champion-banner` | P0-19 | Large centered Super Bowl/conference champion banner, shimmer + sparkle, lingers | season review / playoff end |
| `P0-19-bracket` | P0-19 | March Madness playoff bracket: seeded icons, connectors, advancing animation, byes | playoff bracket screen |
| `P0-19-conf-charts` | P0-19 | Conference ranked bar charts 1–16, gold/silver/gray bars | season review / playoff picture |
| `P0-19-score-boxes` | P0-19 / P0-18 | Team-colored score boxes (user/opponent gradients) | game recap |
| `P0-18-clauses` | P0-18 | Retained sentence placeholders (clutch / star-praise / next-round hype) | recap/preview gray boxes |
| `P0-8-player-browser` | P0-8 | ~15 player cards per page, position dropdown, stat-bar micro-graphics, yours highlighted | player browser |
| `P0-9-pos-combos` | P0-9 | Position-ranking combination chips | position rankings |
| `P0-10-team-compare` | P0-10 | Side-by-side team comparison with team-color accents | team comparison |
| `P7-2-motion` | P7-2 | Micro-interactions: hover lift, slide-in picks, badge pop-in, counter roll-up | draft board, weights |
| `P7-4-dark` | P7-4 | Dark polish: softer panels, secondary-text contrast, header gradient, glass modals, accent scrollbar | global `<style>` |
| `P8-graphics-shared` | P8-graphics | Stat card (OVR tier color + +/- bar), bar row (proportional yards), two-column pair (unit meters), gold banner | all four review screens |
| `P8-g.1-preview` | P8-g.1 | Game preview: team tags, matchup advantage meter, 3 matchup cards | game preview |
| `P8-g.3-review` | P8-g.3 | Game review: quarter bars, turnover grid, star carousel, game-ball pulse | game review |
| `P8-g.4-season` | P8-g.4 | Season review: record banner count-up, sparkline, awards carousel, trend indicators | season review |
| `P8-g.5-100season` | P8-g.5 | 100-season: correlation meter, award histogram, skill-vs-luck bars | 100-season review |
| `P8-g.6-playoffs` | P8-g.6 | Playoff bracket + conference charts | playoffs |
| `P8-g.7-ball` | P8-g.7 | Star/ball presentation: game-ball showpiece, star badges, award unlock badges | star/ball screens |
| `VL-whatif` | VL creative | Live "what-if" win-projection slider | season/preseason |
| `VL-week-timeline` | VL creative | Click-to-expand week-by-week recap timeline | season recap |
| `VL-ball-ceremony` | VL creative | Animated pulsing/bouncing football game-ball ceremony | post-game |

## Files
- `_agents/vl/deliveries/interactive-prototype.html` — full self-contained reference; each section carries `<!-- BLOCK: <item> -->` extraction comments.
- `_agents/vl/deliveries/design-tokens.css` — standalone `:root` + component token CSS (P7/P8 graphics round).
- `_agents/vl/VL.md` — lane file (identity + state).

## Receipts
- `git log --oneline -3` on `council/vl`: fe201fd3 (interactive prototype), 747a24b0 (P7/P8 aesthetic), 0a310cab (lane file + first prototype).
- `git ls-remote origin council/vl` → pushed.
- Worktree: `/Users/kosi/Desktop/wt/vl`, branch `council/vl`, merged from `origin/council/base` f4527a26.
