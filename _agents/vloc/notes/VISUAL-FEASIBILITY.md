# V22 Visual Feasibility — Single-File Inline CSS/SVG/JS Assessment

**SPEAKER: VLOC | ROLE: Council reviewer (S-2500–2599) | TASK: Visual-feasibility pass on V22 graphical requests | DATE: 2026-10-22T00:30:00Z**

Build under test: `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B). **Read-only** — no product edits, no document edits, no other seat's files.

## Build capabilities inventory (VERIFIED from source)

| Capability | Evidence | Status |
|------------|----------|--------|
| CSS keyframe animations | `@keyframes fxpop`, `fxshine`, `fxtoast`, `fxglow`, `heroBounce` (l.101–104, l.229–230) | Present |
| Reduced-motion respect | `@media (prefers-reduced-motion: reduce)` at l.110 for `.fxbanner,.fxtoast,.champion-banner.fxwon` | Present |
| Full-screen canvas | `#fxCanvas` at l.105 (`position:fixed;left:0;top:0;width:100%;height:100%`) | Present |
| `.ub` user-team highlight | l.100 (`color:var(--accent);font-weight:700`) + MutationObserver l.6446/l.6547 | Present |
| Playoff bracket HTML | `renderBracketHTML()` at l.3830, `bg3` class at l.3841–3844 | Present |
| Standings tables | `renderStandingsHTML()` at l.3806–3824 | Present |
| Game result / box score | `renderGameResultHTML()` at l.3780, `.score-line` at l.3789 | Present |
| Champion banner | `renderSeasonCompleteView()` at l.5885, `.champion-banner` at l.149 | Present |
| SVG elements | **None found** — `grep <svg` → 0 hits | Absent |
| Chart library (D3/Chart.js/Plotly) | **None found** — no `<script src>` CDN tags | Absent |

## Feasibility assessment

| # | Request | Feasible inline? | Minimum implementation approach | Risk | Label |
|---|---------|-----------------|---------------------------------|------|-------|
| 1 | Playoff bracket: March-Madness style, byes, both conferences meeting in the middle | **Yes** | Extend `renderBracketHTML()` (l.3830) with inline CSS flex/grid rows per round, seed badges as `border-radius:4px` pills, "BYE" text labels, and SVG `<line>` connectors between rounds drawn from `round → round` coordinates computed in JS. No `<svg>` library needed — inline `<svg>` with hand-computed `x1/y1/x2/y2`. | Layout wrap at 390px (rounds stack vertically, connectors need `stroke-linejoin` and viewport-relative `viewBox`). Seed-badge collisions on mobile. | VERIFIED (bracket exists at l.3830; SVG-free connector approach is standard inline SVG) |
| 2 | Conference 1–16 charts (AFC + NFC) | **Yes** | Replace/add to `renderStandingsHTML()` (l.3806): two side-by-side panels at 1280px, stacked at 390px. Each row: rank badge (fixed 24px circle), team name, horizontal bar (`<div>` with `width:` computed from win% as inline style, height 14px, background var(--accent)), W–L text. User's team row uses `.ub` + rank marker. No `<canvas>` or library. | Computing win% with ties (PF/PA already computed at l.3817); bar width scaling (max bar = 16 teams, longest = 100%). | VERIFIED (standings exist at l.3806; inline div bars are standard) |
| 3 | Gold shimmering Champions banner (≥3s, then lands and keeps shimmering) | **Yes** | Extend `.champion-banner` (l.149) and `.champion-banner.fxwon` (l.109): increase padding/font-size, add `@keyframes fxshimmer` (background-position sweep) with `animation-iteration-count:infinite`, `animation-duration:3s` minimum before "land" (settle to `position:fixed` at bottom-centre or inline position under season review header). Extend l.110 reduced-motion rule to include the new selector. | Banner persistence logic (JS timer to "land" after 3s); `prefers-reduced-motion` must disable shimmer (`animation:none;opacity:1`) — already handled for `.champion-banner.fxwon` at l.110, extend to new selector. | VERIFIED (fxglow exists at l.104; fxwon exists at l.109; reduced-motion rule exists at l.110) |
| 4 | Bigger box score | **Yes** | Extend `renderGameResultHTML()` (l.3780): increase `.score-line` font-size (≥1.5rem, font-weight 800), quarter cells as `<div>`s with width ≥60px/height ≥40px, border-radius ≥6px, background var(--panel2), border 1px solid var(--border). Outcome letters W/L/T with colour + letter marker. Stack quarters vertically at 390px. | Mobile overflow (four quarter cells + score in 390px width); ensure `flex-wrap:wrap` or vertical stack. | VERIFIED (score-line exists at l.3789; font/padding edits are inline CSS) |
| 5 | Animated entry/exit of graphics | **Yes** | Add `@keyframes fadeInUp` (opacity 0→1, translateY 12px→0) and `fadeOut` (opacity 1→0) applied via inline `style="animation:…"` on new panels/charts/banner. Reuse existing `fxpop`/`fxshine` pattern (l.101–102). Gate all animations behind `reduce()` check (l.6452 pattern) so `prefers-reduced-motion: reduce` → `animation:none;opacity:1`. | Animations that convey state-only information violate the reduced-motion rule (no content hidden behind motion). Mobile repaint cost on entry/exit. | VERIFIED (animation keyframes exist at l.101–104; reduce() helper exists at l.6452; l.110 rule exists) |
| 6 | Gold-for-user-players on award charts | **Yes** | Extend `honorLineHTML()` (l.5850): when `c.team===user`, wrap name in `.ub` (l.100) plus a gold background chip (`rgba(255,215,0,0.20)`, padding 4px 8px, border-radius 4px) and a ★ text badge after the name. Apply in `renderRegularAwardsHTML` (l.5853–5855) and `renderPlayoffAwardsHTML` (l.5874–5878). | Colour-alone accessibility — second marker (★ badge) is mandatory. | VERIFIED (`.ub` exists at l.100; `honorLineHTML` checks `c.team===user` at l.5850) |

## Requests that CANNOT be done without a dependency

**None.** All six requests are achievable with inline CSS/SVG/JS in the single-file build. AGENTS.md prohibits paid APIs, CDN dependencies, and build steps — none are needed here. The build already contains the infrastructure (CSS keyframes, canvas, standings, bracket, game result, champion banner, `.ub` user highlight).

## Cross-cutting constraints

| Constraint | Evidence | Impact on V22 graphical work |
|------------|----------|------------------------------|
| No CDN / no build step | AGENTS.md prohibited actions | All charts must be inline SVG or CSS div bars; no D3/Chart.js |
| Single HTML file | AGENTS.md architecture | All `<svg>` must be inline (not `<img src>` or `<link>`) |
| `prefers-reduced-motion` | l.110 + l.6452 | Every new animation must have a `reduce` fallback |
| `.ub` + second marker | l.100 + house rule | User's team must never be identified by colour alone |
| 390px no-overflow | AGENTS.md invariant 4; 390px gate | All new panels/charts must not overflow at 390px width |

## What I did NOT check

- Live rendered pixel measurements at 390px × 844 and 1280 × 900 (requires browser rendering; not performed)
- Actual contrast ratios computed against the build's colour tokens (var(--accent), var(--panel), var(--text)) — specification targets only
- Whether `renderBracketHTML()` currently handles byes (byes may be absent from current data; "BYE" badge is a content decision, not a feasibility blocker)
- The exact JS coordinate math for SVG connector lines between bracket rounds (approach is standard; implementation detail for Claude)

---

**Bottom line:** All six graphical requests are feasible inline with no dependencies. The build already has the animation infrastructure (keyframes at l.101–104), the reduced-motion guard (l.110), the user-team highlight (`.ub` at l.100), and the relevant render functions (bracket l.3830, standings l.3806, game result l.3780, champion banner l.5885). SVG is absent today but inline `<svg>` elements are trivial to add. The main implementation risks are mobile layout at 390px and colour-alone accessibility for the user's team — both are spec'd with mitigations above.
