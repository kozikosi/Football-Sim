# Interactive & Beautiful UI - Integration Guide

Drop these in to add motion, polish, and interactivity per P11.

## Files
- `INTERACTIVE-BEAUTY-PLUGINS.js` - Motion, confetti, animations, helpers
- (Uses existing styles/animations from build where possible)

## Quick Integration

### 1. Add Script
Add to `<script>` block:
```html
<script src="INTERACTIVE-BEAUTY-PLUGINS.js"></script>
```
Or paste contents. Auto-inits on DOMContentLoaded.

### 2. Champion Banner (P11-10)
When showing champion:
```js
styleChampionBanner();
const banner = document.querySelector('.champion-banner');
if(banner){
  banner.classList.add('fx-glow');
  launchConfetti(60);
}
```

### 3. Staggered Cards
After rendering a view:
```js
// Stagger panels/cards
staggerCards('.panel, .pcard, .kp-card, .teamframe, .bracket-game');
```

### 4. Toasts
```js
showToast('Draft complete!');
showToast('Playoffs locked in!');
```

### 5. Count-up Scores
```js
const scoreEl = document.querySelector('.score-big');
animateNumber(scoreEl, finalScore);
```

### 6. Highlight User Team
```js
highlightUserPicks(userTeamName);
```

### 7. Promote Season Review Button (P11-12)
```js
promoteSeasonReviewButton();
// Optionally move it to top
const topBar = document.querySelector('.hero, .viewhead');
const btn = document.getElementById('seasonReviewBtn');
if(topBar && btn) topBar.appendChild(btn);
```

### 8. Manual Confetti
```js
launchConfetti(50); // Super Bowl win
```

## CSS Classes Available
- `.fx-rise` - fade up
- `.fx-swipe` - slide in from left
- `.fx-pop` - scale in
- `.fx-delay-1` through `.fx-delay-4` - stagger delays

## Design Notes (from P11)
- Motion only for arrivals/big moments (banner, trophy, final score, awards)
- One thing moves at a time
- Confetti only for trophy/Super Bowl win
- Always respect `prefers-reduced-motion`
- Text stays readable
