# V22 Graphics Round — Item 7: Star/Ball Presentation (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Objective
Make the star and game ball presentation more visual and beautiful, per Owner's brief.

## Owner's brief (§4.4)
- "The star heading becomes a star — maybe glittering?"
- "The slots are reserved for 90+ rating performances (60+ rushing yards; a QB needs 300+ yards and a 3:1 TD/INT ratio), rating never shown."
- "Your own players are gold, including the game ball winner."
- "Awards — a lot more beautiful, and your own players are gold."

## Current state

### Stars (starsParagraph, l.3027-3054)
- Stars are text lines: "X (Team) was the difference: 25/35 for 320 yards, 3 TDs and 1 INT"
- Filter: `impact>=1.0`, no yardage threshold
- No visual distinction for user's players
- No glitter/shimmer effect

### Game ball (l.3190-3195)
- Game ball is a text line: "X (Team Group) earned the game ball: stat line"
- No visual distinction
- No gold treatment for user's players

### Awards (renderRegularAwardsHTML, renderPlayoffAwardsHTML)
- Tables with player names
- No gold treatment for user's players

## Proposed changes

### GR-7a · Star heading with glitter

**WHERE** l.3053 (`<b>Stars of the game:</b>`)
**WHAT** Replace with a glittering star heading:
```html
<div class="star-heading">
  <span class="star-icon">⭐</span>
  <span class="star-text">Stars of the game</span>
</div>
```
**CSS:**
```css
.star-heading{display:flex;align-items:center;gap:6px;margin-bottom:8px;}
.star-icon{font-size:1.2rem;animation:glitter 2s ease-in-out infinite;}
@keyframes glitter{0%,100%{filter:brightness(1);transform:scale(1);}50%{filter:brightness(1.5) drop-shadow(0 0 4px gold);transform:scale(1.1);}}
@media (prefers-reduced-motion: reduce){.star-icon{animation:none;}}
.star-text{font-weight:700;font-size:1rem;}
```
**WHY** Owner: "The star heading becomes a star — maybe glittering?"
**SAFE ALONE?** Yes — CSS + HTML.
**HOW TO CHECK** `node --check` → exit 0. Visual check: glitter visible, stops with reduced motion.

### GR-7b · Star entries as cards with gold for user's players

**WHERE** l.3035-3049 (starsParagraph lines)
**WHAT** Replace prose star lines with cards:
```html
<div class="star-card ${p.team===user?'star-card-user':''}">
  <div class="sc-player">${p.name} <span class="sc-team">(${nick(team)})</span></div>
  <div class="sc-stat">${statLine}</div>
  <div class="sc-verb">${verb}</div>
</div>
```
**CSS:**
```css
.star-card{background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;margin-bottom:6px;}
.star-card.star-card-user{border-color:#ffd700;background:linear-gradient(135deg,rgba(255,215,0,0.08),rgba(255,165,0,0.04));}
.star-card .sc-player{font-weight:700;font-size:0.9rem;}
.star-card .sc-team{font-weight:400;color:var(--sub);font-size:0.8rem;}
.star-card .sc-stat{font-size:0.8rem;color:var(--sub);margin-top:2px;}
.star-card .sc-verb{font-size:0.85rem;margin-top:4px;font-style:italic;}
```
**WHY** Owner: "Your own players are gold, including the game ball winner." Cards make each star visually distinct.
**SAFE ALONE?** Yes — replaces string concatenation with HTML.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-7c · Game ball as gold card

**WHERE** l.3190-3195 (`ball` variable and `p2stars`)
**WHAT** Replace prose game ball with a gold card:
```html
<div class="game-ball-card ${mvp.team===user?'gb-user':''}">
  <div class="gb-icon">🏈</div>
  <div class="gb-content">
    <div class="gb-title">Game Ball</div>
    <div class="gb-player">${mvp.name} <span class="gb-team">(${nick(mvp.team)})</span></div>
    <div class="gb-stat">${mvp.line}</div>
    ${loserBall ? `<div class="gb-note">Rare: game ball to the losing side — ${mvp.name}'s performance was too dominant to ignore.</div>` : ''}
  </div>
</div>
```
**CSS:**
```css
.game-ball-card{display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(255,215,0,0.12),rgba(255,165,0,0.06));border:2px solid #ffd700;border-radius:12px;padding:12px 16px;margin:8px 0;}
.game-ball-card .gb-icon{font-size:2rem;}
.game-ball-card .gb-title{font-weight:800;font-size:0.9rem;color:#ffd700;text-transform:uppercase;letter-spacing:.05em;}
.game-ball-card .gb-player{font-weight:700;font-size:1rem;margin-top:2px;}
.game-ball-card .gb-team{font-weight:400;color:var(--sub);font-size:0.85rem;}
.game-ball-card .gb-stat{font-size:0.82rem;color:var(--sub);margin-top:4px;}
.game-ball-card .gb-note{font-size:0.78rem;color:var(--accent2);margin-top:4px;font-style:italic;}
```
**WHY** Owner: "your own players are gold, including the game ball winner." Gold card makes the game ball visually prominent.
**SAFE ALONE?** Yes — replaces string concatenation with HTML.
**HOW TO CHECK** `node --check` → exit 0. Visual check at 390px.

### GR-7d · Award tables with gold for user's players

**WHERE** `renderRegularAwardsHTML()` and `renderPlayoffAwardsHTML()`
**WHAT** Add gold highlighting for user's players in award tables:
```html
<tr class="${player.team===user?'award-user':''}">
  <td>${player.name}</td>
  <td>${player.team}</td>
  <td>${player.stat}</td>
</tr>
```
**CSS:**
```css
tr.award-user{background:rgba(255,215,0,0.1);font-weight:700;}
tr.award-user td:first-child::before{content:'★ ';color:#ffd700;}
```
**WHY** Owner: "Awards — a lot more beautiful, and your own players are gold."
**SAFE ALONE?** Yes — CSS + conditional class.
**HOW TO CHECK** `node --check` → exit 0. Visual check: user's players highlighted in gold.

### GR-7e · Star threshold enforcement (visual indicator)

**WHERE** starsParagraph (l.3027-3031)
**WHAT** Add a visual indicator for the star threshold (60 yards for skill players, 300+ yards + 3:1 for QBs):
```html
<div class="star-threshold">
  <span class="st-icon">📊</span>
  <span class="st-text">Stars require 60+ yards (skill) or 300+ yards + 3:1 TD:INT (QB)</span>
</div>
```
**CSS:**
```css
.star-threshold{font-size:0.72rem;color:var(--sub);margin-bottom:8px;padding:4px 8px;background:var(--panel);border-radius:6px;display:inline-flex;align-items:center;gap:4px;}
```
**WHY** Owner: "The slots are reserved for 90+ rating performances (60+ rushing yards; a QB needs 300+ yards and a 3:1 TD/INT ratio), rating never shown." Makes the threshold visible to the user.
**SAFE ALONE?** Yes — adds HTML. No math changes.
**HOW TO CHECK** `node --check` → exit 0.

### GR-7f · Glittering star glyph (optional enhancement)

**WHERE** CSS
**WHAT** Add a glitter effect to star glyphs (⭐) throughout the UI:
```css
.star-glyph{display:inline-block;animation:glitter 2s ease-in-out infinite;}
@keyframes glitter{0%,100%{filter:brightness(1);}50%{filter:brightness(1.5) drop-shadow(0 0 6px gold);}}
@media (prefers-reduced-motion: reduce){.star-glyph{animation:none;}}
```
**WHY** Owner: "maybe glittering?" Adds a subtle sparkle to star icons.
**SAFE ALONE?** Yes — CSS only.
**HOW TO CHECK** Visual check: glitter visible, stops with reduced motion.

## What stays as sentences (per Owner's criterion)
- Star praise text — "was the difference", "played a big role", etc.
- Game ball stat line — "25/35 for 320 yards, 3 TDs"
- Award citation text

## SAFE ALONE?
Yes — all changes replace string concatenation with HTML components or add CSS. No math changes, no protected constants.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: all components render at 390px (no horizontal overflow)
3. Glitter animation visible and respects reduced-motion
4. User's players highlighted in gold in stars, game ball, and awards

## What was deliberately not checked
- Whether the glitter animation works on all browsers
- Whether the star cards should link to player season stats
- Whether the award tables should be sortable
