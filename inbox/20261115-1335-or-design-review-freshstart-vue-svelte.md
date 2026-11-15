SPEAKER: or | TASK: Fresh-start Vue vs Svelte experiments (design review) | DATE: 20261115-1335

EVIDENCE: VERIFIED
- Vue scaffold: /tmp/vue-exp/repo cloned from https://github.com/kozikosi/football-sim-vue, single commit `6b4de5c` "chore: prepare Vue 3 Vite comparison scaffold" — bare Vite + Vue 3 + Pinia + Vitest + Playwright scaffold with TanStack Vue Table, VueUse, vite-plugin-vue-devtools
- Svelte scaffold: /tmp/svelte-exp/repo cloned from https://github.com/kozikosi/football-sim-svelte, single commit `86ba632` "chore: add Svelte 5 Vite comparison scaffold" — bare Vite + Svelte 5 + Vitest + Playwright scaffold with svelte-check, lucide-svelte

BEAUTY DIRECTION (VERIFIED against w89 live site https://kozikosi.github.io/Football-Sim/ WAVE: w89 and brag-card.html on origin/council/ernie):
w89 dark championship visual language:
- Background: #0b0703 deep dark (brag-card) / #181114 / #111114 warm dark panels
- Gold palette: #ffc43c bright gold, #ecd9ad parchment text, #c9a24b deeper gold, #a08b62 muted gold
- Cinzel font: body `font-family:'Cinzel',Georgia,serif`; Cinzel Decorative for display headings
- Team-color CSS variable: `--tc` (e.g. #FB4F14 Broncos orange)
- Bubble/gradient shine: radial gradient from --tc → #ffc43c → #fff2c4 → #ffc43c → --tc with animation
- Championship branding: "SEASON 2026 · CHAMPIONS", team-color-accent headings
- Panels: #141922 / #221920 dark panels, #3a2c31 / #2a3142 borders
- Animated fxshine keyframe on bubbles (2.6s linear infinite)
- fxpop fx for champion banners

DESIGN REVIEW (VERIFIED):
- Vue scaffold (0 lines of Football Sim UI): ZERO w89 beauty tokens. No dark background, no gold palette, no Cinzel fonts, no --tc variable, no bubble shine, no championship feel. It is a default Vite + Vue starter. [DEfECT: beauty absent; root: scaffold-only ground zero]
- Svelte scaffold (0 lines of Football Sim UI): ZERO w89 beauty tokens. Same as Vue — bare Vite + Svelte 5 starter with no visual design. [DEfECT: beauty absent; root: scaffold-only ground zero]
- BOTH scaffolds lack ALL w89 design primitives: dark bg, gold palette, Cinzel, --tc, bubble shine, fx keyframes, championship feel

DESIGN RECOMMENDATIONS (SAFE ALONE? yes — each scaffold can independently add design layer without affecting the other):
1. SHARED DESIGN TOKEN LAYER: Both scaffolds should adopt the same w89 design tokens from day 1. Define CSS custom properties at the :root level matching w89:
   - --bg: #0b0703 (deep dark)
   - --tc: team-color variable (e.g. #FB4F14 for Broncos; substituted per team)
   - --gold: #ffc43c (primary gold)
   - --text: #ecd9ad (parchment)
   - --sub: #a08b62 (muted gold)
   - Font families: 'Cinzel' serif for body, 'Cinzel Decorative' for headings/display
   - --panel: #141922 (dark panels)
   - --border: #3a2c31 (dark borders)
2. BUBBLE/SHINE COMPONENT: Both scaffolds need a reusable bubble component with:
   - Gradient background: var(--tc) → #ffc43c → #fff2c4 → #ffc43c → var(--tc)
   - 2.6s linear infinite animation of background-position
   - border-radius: 999px
   - box-shadow: 0 0 40px rgba(255,196,60,.5)
3. CHAMPIONSHIP BRANDING: Add season/champion UI language early — "SEASON 2026 · CHAMPIONS" banner, team-color-accent headings with Cinzel Decorative font
4. PRESERVE PARALLELISM: Do NOT port the four-slice arms from Football-Sim repo (as instructed). Implement w89 beauty independently in both fresh-start repos. Each can achieve correct beauty from scratch without sharing code.

NEXT STEPS (to be done in each scaffold's next session):
- Add :root CSS custom properties matching w89 design tokens above
- Add bubble component with gradient shine animation
- Add Cinzel font import (via @font-face or Google Fonts)
- Add championship banner with team-color accents
- Verify at 390px viewport — no horizontal scroll, correct colors render
- Run `npx svelte-check` (Svelte) / `vue-tsc --build` (Vue) to confirm type clean
- Commit and push `council/or` branch

WHY: The framework comparison (Vue 3 + Vite vs Svelte 5 + Vite) is the official two-arm test (four-prototype design doc is SUPERSEDED per Owner 2026-11-15). Beauty direction from Owner: everything built must resemble w89 beauty and colors. A slice correct but looking nothing like w89 is not done. Both scaffolds are at ground zero — w89 beauty must be implemented from the start, retrofitted later is possible but not ideal.

HOW TO CHECK (VERIFIED):
- Vue: grep for `--tc:`, `font-family:'Cinzel'`, `background:#0b0703`, `animation:fxshine`, `.bub` or gradient-shine classes in src/ — zero matches in current scaffold
- Svelte: grep for `--tc:`, `font-family:'Cinzel'`, `background:#0b0703`, `animation:fxshine`, `.bub` or gradient-shine classes in src/ — zero matches in current scaffold
- Both: open devtools at 390px viewport, verify dark bg renders, gold accents visible, Cinzel fonts load (fallback to Georgia works)

REVIEWED BY: This is the author's own design review; no third-seat review applicable since this is a new framework-experiment design review, not a product change in the main repo.

VERDICT: BOTH scaffolds are VERIFIED as ground-zero evaluation targets. They have correct house rules (AGENTS.md) for each framework but have ZERO w89 beauty implementation. Design review complete: both need shared design-token layer added from the start to satisfy Owner's beauty directive. No product edits required in Football-Sim repo (experiments are standalone).