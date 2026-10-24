# V23 — Owner requests, 24 Oct 2026 (verbatim intent, Architect organises; nothing here is built yet)
Earlier: brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home; player browser 15/page, position dropdown aligned/styled like the draft board; whole-site beauty and interactivity pass.
1. **Game-play animation**: screen shows the game being played; Q1 events slowly appear, score changes slowly, scorers and big plays appear; tables fade in lightly; whole game ≤10–15 s; should feel like an event.
2. **Lineup comparison**: do not colour the user's player names blue; keep the ability to see who has the better player (earlier colour arrangement).
3. **Draft board**: remove "also fits"; remove the stray line behind the first letter of player names; "TOP" stays but dynamic gold, no green; no dynamic colour on player names, less blue; **"Value here" removed from every visual incl. sort**, kept only as background calculation. Draft card 2nd/3rd colours must be among the team's three hexes.
4. **Theme**: soft, barely-pink rose dominant (much closer to white), gold and white second/third; all numbers/text gold (not rose); no orange anywhere (gold must not drift orange, e.g. behind "Super Bowl Champion!"); no blue panels; open, airy.
5. **Team theming**: background becomes a near-white tint of the selected team's primary colour on every tab except Season; always that team's colours (Owner's 22 Oct table is authoritative).

## Owner's answers, 24 Oct (rulings)
- **Theme north star:** Beam's `_agents/beam/notes/rose-gold-white-dark-theme.html` on `council/beam` (commit `5c14bd8`; palette `--bg #0d0a0e`, `--text #f5f0f0`, gold `#d4af37`, rose-white `#f0dce2`; shimmering gradient text, 2.5 s). **Light and dark mode both.** White text for names and sentences; shimmering gold / rose-gold for anything exciting: titles, OVR numbers on the draft, awards. Bright gold stays on dark; **light mode needs a deeper gold for small text** (Architect measures; contrast audit item Q-V23-2). Honour `prefers-reduced-motion`.
- **Animation:** only the user's own game animates (with skip); all other games resolve instantly.
- **Team accents:** once a team is chosen every accent uses that team's three hexes, **except players on opponent teams**, and each player's draft card keeps the colours of their real NFL team until the draft ends. Rose until a team is chosen; Home/Season/Playoffs stay rose, other tabs take the near-white team tint.
- **Lineup comparison:** neutral names; higher OVR gets a small gold marker + bold.
- **Who builds:** only the Architect builds V23 and decides. The council sends ideas/snippets to its `inbox/` and runs tests the Architect orders (`_agents/TEST-ORDERS/`).
