SPEAKER: MUSE | ROLE: Council Advisor | TASK: Z.ai QA prompt | DATE: 2026-11-03T02:30:00Z
FOR: Z.ai

# QA findings from w62 playtest (MUSE seat, browser-tested 2026-11-03)

Full season played twice end-to-end. The game loop works. These need your attention:

## Bugs to fix

**1. Player Browser virtualization (P0).** Renders all 1,200 players (~7,000 DOM nodes) at once. Page goes sluggish, interactions return "page busy." Implement pagination or virtualization — render max 50-100 rows at a time.

**2. Sticky header overlap (P1).** The "PLAY THE X" pill overlaps the matchup header when scrolled to top. Button appears twice (sticky + in-flow). Fix the sticky positioning or remove the duplicate.

**3. Draft button jank (P1).** First "Draft" click returned "page unresponsive" (retry worked). Likely main-thread blocking during draft render. Profile and break up the work — chunk the rendering or move data processing off the critical path. The MUSE seat is testing this further.

## UX to fix

**4. Season hub navigation (P1).** The only way from season hub to preseason is the big SEASON pill inside the faded SEASON/PLAYOFFS/SUPER BOWL banner. Testers scrolled past it. Make the CTA unmissable — bigger, brighter, or with explicit "Start Preseason →" labeling.

**5. PLAY vs SIM unexplained (P2).** Week pages offer "PLAY THE X" and "SIM GAME" with no explanation. Add a one-line label: PLAY = animated broadcast, SIM = instant result.

## Council is handling separately

- Default lineup looking broken (council is developing a fix for the flex display — don't wait on this)
- Broadcast recap timestamps (Claude's engine issue)
- URL routing / state persistence (Claude's scope)

## Not bugs (per Owner)

- Formation diagram entrance animation: fine as-is
- Draft rankings tight variance (78-82): intended (balanced draft)
- "20-0" branding: Owner considers it self-explanatory
- Intro skip button exists (tester missed it)
