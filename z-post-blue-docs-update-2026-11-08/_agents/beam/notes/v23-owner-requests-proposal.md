# V23 Owner Requests — Beam's Creative Proposals (advisory)

Source: `_agents/V23-OWNER-REQUESTS.md` (Owner, 24 Oct, verbatim intent). Anchors re-verified against Pre-Colors `40233d6be00e987c`. Advisory only — Architect owns the product file.

## Request 1 · Game-play animation (screen shows the game being played)

**WHERE:** game recap / live game view (P0-18 region); new animation layer over existing recap DOM.
**WHAT:** A "live game" mode: Q1 events appear one at a time (~1.5s apart), score increments animate, scorer names fade in, big plays get a subtle highlight pulse, tables fade in lightly. Total ≤ 10–15s. Feels like an event, not a dump.

Design:
- Drive from the existing play-by-play log (already computed) — no new sim math.
- Reveal plays sequentially with `setTimeout`/`requestAnimationFrame`, ~400ms per play, ~1.5s per quarter break.
- Score: animate the number (count-up) when it changes; scorer name fades in (opacity 0→1, 300ms).
- Big plays (TD, turnover, sack): row gets a brief highlight pulse (background flash, 600ms) then settles.
- Tables (box score, stats): fade in after the final play (opacity 0→1, 400ms).
- Controls: "Skip" button (instant full reveal), "Replay" button, speed toggle (1x/2x).
- Respect `prefers-reduced-motion`: instant reveal (no animation).
- No new simulation logic; pure presentation over existing data.

**SAFE ALONE?** NO — touches game recap rendering and timing; cohort with P0-18. But the animation layer is additive (new CSS + a reveal scheduler); core recap data unchanged.
**HOW TO CHECK:** full game reveals in ≤15s at 1x; skip works; reduced motion → instant; `node --check` passes; e2e smoke exit 0; no console errors.

## Request 2 · Lineup comparison colour (no blue on user names)

**WHERE:** lineup comparison / team comparison (P0-10, l.~3364 region).
**WHAT:** Remove blue from user's player names. Keep the "who has the better player" cue via: (a) a subtle gold left-border on the user's better row, (b) a small "▲" indicator next to the better stat, (c) team-colour accents (not global blue). Earlier colour arrangement: user's players in a neutral warm colour, opponent's in their team colour, better stat highlighted in gold.

**SAFE ALONE?** YES — CSS + small JS, no data change.
**HOW TO CHECK:** no blue on user names; better-player cue visible; contrast OK; 390px no overflow.

## Request 3 · Draft board refinements

**WHERE:** draft board (P0-1, P0-12), player name render (l.~1766), "also fits" line (P10-2), "TOP" badge.
**WHAT:**
- Remove "also fits" line entirely (P10-2 superseded).
- Remove stray line behind first letter of player names (CSS: `text-decoration`/border artefact on first char — likely a `::first-letter` or padding issue; remove).
- "TOP" badge stays but dynamic gold, no green (currently green; change to gold shimmer or solid gold).
- No dynamic colour on player names (use `--text`, warm white) — less blue.
- "Value Here" removed from every visual incl. sort (already P0-1; ensure sort option label changed to "Sort: slot value" and the `<th>` removed).
- Draft card 2nd/3rd colours must be among the team's three hexes (P0-29): border-left = team primary, badge = team secondary, accent dot = team tertiary. No global blue.

**SAFE ALONE?** P0-1 and P0-12 are SAFE ALONE individually; this is a coordinated pass. YES for the cosmetic bits.
**HOW TO CHECK:** grep confirms "also fits" 0, "Value here" 0 in visuals; "TOP" gold not green; no blue on names; team hexes only on cards.

## Request 4 · Theme (already in progress)

Covered by P7-83/P7-84 + snippet §31. Dark theme, white text, gold numbers, no orange, open/airy. See `rose-gold-white-dark-theme.html`.

## Request 5 · Team theming: near-white tint of team primary on tabs (except Season)

**WHERE:** tab backgrounds (Draft, Rankings, Players, Groups, Compare, Guide) — not Season.
**WHAT:** Each tab's background becomes a near-white tint of the selected team's primary colour (e.g., `rgba(teamPrimary, 0.04)` over the base bg). Season tab keeps the neutral dark bg. This ties the whole UI to the user's team without heaviness.

**SAFE ALONE?** YES — CSS var + background tint, no logic.
**HOW TO CHECK:** tint visible on non-Season tabs; Season tab neutral; team switch updates tint; reduced motion OK.

## Plug-and-play code

### Game-play animation (Request 1)
CSS:
```css
.play-row { opacity: 0; transform: translateY(6px); transition: opacity 300ms ease, transform 300ms ease; }
.play-row.revealed { opacity: 1; transform: translateY(0); }
.play-row.big { background: rgba(212,175,55,0.08); border-left: 3px solid var(--gold,#b8941f); }
.play-row .scorer { opacity: 0; transition: opacity 300ms ease 100ms; }
.play-row.revealed .scorer { opacity: 1; }
.score-tick { transition: transform 200ms ease; }
.score-tick.bump { transform: scale(1.3); }
.table-fade { opacity: 0; transition: opacity 400ms ease; }
.table-fade.show { opacity: 1; }
.game-controls { display: flex; gap: 8px; margin: 8px 0; }
.game-controls button { background: var(--panel,#141a26); border: 1px solid var(--border,#2a3142); color: var(--text,#f5f0f0); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
```
JS:
```js
function playGameAnimated(plays, speed = 1) {
  const host = document.getElementById("playLog");
  host.innerHTML = "";
  const delay = 400 / speed;
  let i = 0;
  const tables = document.querySelectorAll(".table-fade");
  tables.forEach((t) => t.classList.remove("show"));
  function step() {
    if (i >= plays.length) {
      tables.forEach((t) => t.classList.add("show"));
      return;
    }
    const p = plays[i];
    const row = document.createElement("div");
    row.className = "play-row" + (p.big ? " big" : "");
    row.innerHTML = `<span>${p.text}</span> <span class="scorer">${p.scorer || ""}</span>`;
    host.appendChild(row);
    requestAnimationFrame(() => row.classList.add("revealed"));
    if (p.scoreChange) {
      const sc = document.getElementById(p.scoreChange.el);
      if (sc) { sc.textContent = p.scoreChange.val; sc.classList.add("bump"); setTimeout(() => sc.classList.remove("bump"), 200); }
    }
    i++;
    setTimeout(step, delay);
  }
  step();
}
function skipGame() { /* instant reveal all */ }
```

### Lineup comparison (Request 2)
CSS:
```css
.lineup-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid var(--border,rgba(255,255,255,0.08)); }
.lineup-row .name { color: var(--text,#f5f0f0); } /* no blue */
.lineup-row.better .stat { color: var(--accent,#d4af37); font-weight: 700; }
.lineup-row.better::before { content: "▲"; color: var(--accent,#d4af37); margin-right: 4px; font-size: 0.7rem; }
.lineup-row.user { border-left: 2px solid var(--team-primary,#e31837); padding-left: 6px; }
```

### Draft board refinements (Request 3)
CSS:
```css
/* Remove stray line behind first letter */
.dc-name { text-decoration: none; border: none; padding-left: 0; }
.dc-name::first-letter { text-decoration: none; border: none; }
/* TOP badge: dynamic gold, no green */
.top-badge { background: var(--accent,#d4af37); color: #0d0a0e; font-weight: 700; padding: 1px 6px; border-radius: 4px; font-size: 0.65rem; }
/* No dynamic colour on player names */
.dc-name { color: var(--text,#f5f0f0); }
/* Team hexes only on card accents */
.draft-card { border-left: 3px solid var(--team-primary); }
.draft-card .badge { background: var(--team-secondary); }
.draft-card .accent { background: var(--team-accent); }
```
JS (remove "also fits" + "Value Here" from sort):
```js
// Remove "also fits" line: delete the block that renders `also fits: ...`
// Remove "Value Here" sort option: remove <option value="value">Sort: value here</option>
// Keep r.v computed but never displayed
```

### Team tint on tabs (Request 5)
CSS:
```css
.tab-panel { background: var(--tab-tint, transparent); transition: background 300ms ease; }
.tab-panel.season { background: transparent; } /* Season stays neutral */
```
JS:
```js
function setTabTint(teamPrimary) {
  const tint = teamPrimary ? hexToRgba(teamPrimary, 0.04) : "transparent";
  document.documentElement.style.setProperty("--tab-tint", tint);
}
```

## Open questions for the Architect
1. Game animation: auto-play on recap open, or "Play" button? (Spec: should feel like an event — recommend auto-play with Skip.)
2. Lineup comparison: show "better" cue as gold triangle (▲) or as a subtle row highlight?
3. Draft card 2nd/3rd colours: confirm team secondary/tertiary hexes (from Owner's 22 Oct table) are the right source.
4. Team tint on tabs: apply to all non-Season tabs or only Draft? (Spec: every tab except Season.)
5. Animation speed: 1x default, 2x toggle, or user-configurable?

## What I will not do
No edits to `Football-Sim-*.html`, protected constants, or shared governance files. Proposal + plug-and-play code only, per AGENTS.md §5.
