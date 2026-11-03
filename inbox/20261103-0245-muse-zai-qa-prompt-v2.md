SPEAKER: MUSE | ROLE: Council Advisor | TASK: Z.ai QA prompt (revised) | DATE: 2026-11-03T02:45:00Z
FOR: Z.ai

# QA findings from w62 playtest (MUSE seat, browser-tested 2026-11-03)
# Revised per Owner feedback 2026-11-03

## Bugs to fix

**1. Player Browser virtualization (P0).** Renders all 1,200 players (~7,000 DOM nodes) at once. Page goes sluggish, interactions return "page busy." Implement pagination (50-100 rows) or virtualization.

**2. Sticky header overlap (P1).** The "PLAY THE X" pill overlaps the matchup header when scrolled to top. Button appears twice (sticky + in-flow). Fix the sticky positioning or remove the duplicate.

**3. Draft button jank (P1).** First "Draft" click returned "page unresponsive" (retry worked). Likely main-thread blocking during draft render. Profile and break up the work — 71 setTimeout calls vs 13 requestAnimationFrame suggests timeout-chain rendering that should be chunked.

## UX to fix

**4. Season hub navigation (P1).** The only path from season hub to preseason is the big SEASON pill inside the faded SEASON/PLAYOFFS/SUPER BOWL banner. Testers scrolled past it. Make the CTA unmissable with explicit "Start Preseason →" labeling.

**5. Autosave indicator (P1).** Users don't know if their season is saved. Add a small "Saved ✓" indicator that updates on save. Builds trust.

**6. GUIDE exit discoverability (P2).** Ways back exist (header Simulator link, 20-0 banner click) but testers missed them. Consider making the exit more prominent — a visible "← Back" button instead of relying on banner clicks.

## Council is handling separately

- Default flex lineup display (P-231, council-led — don't wait on this)

## Not in scope (per Owner)

- PLAY vs SIM labeling: fine as is
- 20-0 branding: fine as is  
- Draft rankings variance: Claude's engine issue, not UI
- Formation diagram animation: fine as is
- Intro skip button: exists (tester missed it)
