# 20-0 Branding + Clickable Header Verification (BOC) — 22 Oct 2026

Build: `Football-Sim-PreColors.html` · 657,486 B · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`

## Owner directives (from Owner, 22 Oct)

1. **Project name:** "20-0" (website/product), "Football Sim" (file names)
2. **Header/footer/text:** heavily emphasize "20-0"
3. **Homepage:** "Set Up Your Draft" → "DRAFT" (heavy UI)
4. **Remove text:** "32 real NFL franchises are shuffled..." → "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
5. **Rewrite:** "Play the season. Seventeen games..." → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"
6. **Player browser:** only 15 names visible (pagination)
7. **Header:** clickable → back to homepage (open to Figma rework)

## Verification: display strings that must change

### Title (l.7)
```
<title>NFL Draft Simulator</title>
```
**Must change to:** `<title>20-0 — Football Sim</title>` or `<title>20-0</title>`

### Hero h1 (l.319)
```
<div class="hero-text"><h1>NFL Draft Simulator</h1><div class="tagline">Draft your team. Play the season. Win the Super Bowl.</div></div>
```
**Must change to:** `<h1>20-0</h1>` with tagline "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"

### Draft setup heading (l.384)
```
<h2 style="margin-top:0;">Set Up Your Draft</h2>
```
**Must change to:** `<h2 style="margin-top:0;">DRAFT</h2>` (heavy UI emphasis)

### Draft setup paragraph (l.385)
```
<p>32 real NFL franchises are shuffled into a random snake draft order. Every player at every starter position is available from Round 1 — draft for value and need. CPU GMs draft by the same math the season uses: each takes the player who adds the most wins at a spot it still needs (with a little personal taste and randomness) and can flex players. Read the guide below the setup before you start.</p>
```
**Must change to:** `<p>Draft, Season, Playoffs, Super Bowl. Can you go 20-0?</p>`

### Season guide text (l.5034)
```
<li><b>Play the season.</b> Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>
```
**Must change to:** `<li><b>Play the season.</b> Season, Playoffs, Super Bowl. Can you go 20-0?</li>`

### Header (l.317-321)
```
<header class="hero">
  <div class="hero-ball">🏈</div>
  <div class="hero-text"><h1>NFL Draft Simulator</h1>...</div>
  <ol class="stepper" id="stepper">...</ol>
</header>
```
**Must change:** Header must be clickable (at least somewhere obvious) and take you back to homepage. Currently no click handler on the header.

### Footer (l.439-445)
```
<nav class="footnav" aria-label="More tools"><span class="footlabel">More</span>
  <button class="footlink active" id="tabDraftBtn">Simulator</button>
  ...
</nav>
```
**Must change:** Footer should emphasize "20-0" branding. Currently says "Simulator".

### "20-0" occurrences
`grep -n "20-0\|20–0\|go 20" Pre-Colors` → 0 matches. The string "20-0" does not appear anywhere in the build. It needs to be added to: title, h1, tagline, footer, and potentially other places.

## Player browser pagination (not yet addressed)

**Current state (l.791-810):** `renderPlayers()` renders ALL matching players (up to 1,200) into `#playerBody`. No pagination, no cap.

**Owner's request:** "Only 15 names should be visible so it is quick to get to the header."

**Proposed fix:** Add pagination with 15 per page (see `_agents/boc/notes/player-browser-header-proposal.md`).

## Clickable header (not yet addressed)

**Current state:** Header is not clickable. No click handler on `.hero` or `.hero-text`.

**Owner's request:** "whatever header appears in V23, It needs to be clickable (at least somewhere quite obvious on it) and takes you back to the homepage."

**Proposed fix:** Make the logo/title area clickable:
```js
document.querySelector('.hero-text').addEventListener('click', () => {
  setActiveTab('viewDraft', 'tabDraftBtn');
  window.scrollTo(0,0);
});
```

## SAFE ALONE?
Yes — all changes are display text + one click handler. No math changes, no protected constants.

## HOW TO CHECK
1. `grep -c "20-0" Pre-Colors` → should be > 0 after changes
2. `grep -n "Set Up Your Draft" Pre-Colors` → should be 0 after changes
3. `grep -n "32 real NFL franchises" Pre-Colors` → should be 0 after changes
4. Visual check: header clickable, returns to homepage
5. Visual check: player browser shows 15 rows + pagination
6. `node --check` → exit 0

## What was deliberately not checked
- Whether the header redesign should use Figma (now available)
- Whether "20-0" should appear in the title tag or just the visible UI
- Whether the player browser pagination should use virtual scrolling
