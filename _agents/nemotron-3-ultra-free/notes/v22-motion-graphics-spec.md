# V22 Motion & Graphics Specification
**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: V22 — Motion and Graphics Direction | DATE: 2026-10-22T10:00Z**

---

## 1. Executive Summary

This specification defines the **motion vocabulary**, **graphics direction**, and **animation hooks** for the V22 NFL Draft Simulator. The Owner's directive: *"a lot more motion of graphics coming in and out of the screen, text coming in and out of the screen, and more ideas like the confetti and the banners to make a text based game a lot more exciting."*

**Key deliverables:**
- Motion vocabulary (entrance/exit/settle patterns)
- Gold Champions theme + shimmer mechanics (CSS-only)
- Performance + accessibility rules (respects `prefers-reduced-motion`)
- Exact hooks: CSS classes and JS functions each motion attaches to
- Inventory of existing confetti/banner mechanisms + new proposals

---

## 2. Current State Inventory

### 2.1 Existing Animation Primitives (CSS)

| Animation | Keyframes | Duration | Used By |
|-----------|-----------|----------|---------|
| `fxpop` | scale 0.3→1.08→1.0 + translate Y | 4.2s | `.fxbanner` (toasts, conference/SB banners) |
| `fxshine` | background-position sweep | 1.6s infinite | `.fxbanner` (gold gradient sweep) |
| `fxtoast` | translate Y 20px→0 + fade | ~3s | toast notifications |
| `fxglow` | box-shadow pulse (gold) | 2.2s infinite | `.champion-banner.fxwon` |
| `heroBounce` | translateY + rotate | — | hero elements (unused?) |

### 2.2 Existing JS Animation Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `confetti(n, colors, x0, y0, spread, speed)` | l.6457 | Particle system — creates confetti particles in global `parts[]` array |
| `banner(html)` | l.6473 | Creates `.fxbanner` element, appends to body, auto-removes after 4.3s |
| `FX.play(kind, text)` | l.6478-6485 | High-level: `small` (70 particles), `medium` (220), `conf` (conference champ banner + 2 waves), `sb` (Super Bowl banner + 5 waves of gold confetti) |
| `ensure()` | l.6470 | Initializes canvas (`cv`) + animation loop (`start()`) for confetti |
| `start()` | l.6470 | `requestAnimationFrame` loop rendering `parts[]` to canvas |

### 2.3 Existing Banner Types

| Banner | Trigger | HTML | Confetti |
|--------|---------|------|----------|
| Conference Champions | `FX.play('conf')` | `"CONFERENCE CHAMPIONS!<small>On to the Super Bowl</small>"` | 2×140 + delayed 120 |
| Super Bowl Champions | `FX.play('sb')` | `"🏆 SUPER BOWL CHAMPIONS! 🏆<small>The Lombardi Trophy is yours</small>"` | 5 waves (3×170 gold+colors, 2×200 gold) |
| `.champion-banner` (static) | Season review render | `"🏆 {team} — Super Bowl Champions"` + paragraph | None (but gets `.fxwon` class added 50ms after SB win) |

### 2.4 Current Canvas Confetti System

- **Canvas**: Full-screen `<canvas id="fx">` created lazily by `ensure()`
- **Particles**: Stored in global `parts[]` array with physics (gravity, velocity, rotation, decay)
- **Colors**: `COLORS` array + `GOLD` array (`#ffd700`, `#ffb300`, `#ffea00`, `#fff3b0`, `#ffe066`)
- **Performance**: ~200-400 particles per burst; GPU-accelerated canvas rendering

---

## 3. Motion Vocabulary

### 3.1 Entrance Animations (Elements Coming In)

| Name | CSS Class | Keyframes | Duration | Easing | Use Cases |
|------|-----------|-----------|----------|--------|-----------|
| **slide-up** | `.motion-slide-up` | `translateY(20px) → 0` + `opacity: 0 → 1` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Panels, cards, tables, sections |
| **slide-down** | `.motion-slide-down` | `translateY(-20px) → 0` + `opacity: 0 → 1` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Dropdowns, banners from top |
| **slide-right** | `.motion-slide-right` | `translateX(-30px) → 0` + `opacity: 0 → 1` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Side panels, drawer content |
| **scale-in** | `.motion-scale-in` | `scale(0.92) → 1` + `opacity: 0 → 1` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Buttons, badges, small cards |
| **stagger-children** | `.motion-stagger > *` | Inherits parent + `animation-delay: calc(var(--i) * 60ms)` | — | — | Lists, grids, stat rows |
| **fade-in** | `.motion-fade-in` | `opacity: 0 → 1` | 300ms | `ease-out` | Text blocks, subtle reveals |
| **draw-line** | `.motion-draw` | `stroke-dashoffset: length → 0` | 600ms | `ease-in-out` | Dividers, bracket lines, progress |

### 3.2 Exit Animations (Elements Leaving)

| Name | CSS Class | Keyframes | Duration | Easing | Use Cases |
|------|-----------|-----------|----------|--------|-----------|
| **slide-up-exit** | `.motion-slide-up-exit` | `0 → translateY(-20px)` + `opacity: 1 → 0` | 300ms | `cubic-bezier(0.4, 0, 1, 1)` | Dismissing panels |
| **slide-down-exit** | `.motion-slide-down-exit` | `0 → translateY(20px)` + `opacity: 1 → 0` | 300ms | `cubic-bezier(0.4, 0, 1, 1)` | Closing dropdowns |
| **scale-out** | `.motion-scale-out` | `1 → scale(0.92)` + `opacity: 1 → 0` | 200ms | `cubic-bezier(0.4, 0, 1, 1)` | Removing cards, toasts |
| **fade-out** | `.motion-fade-out` | `opacity: 1 → 0` | 200ms | `ease-in` | Subtle dismissals |

### 3.3 State Change / Emphasis Animations

| Name | CSS Class | Keyframes | Duration | Easing | Use Cases |
|------|-----------|-----------|----------|--------|-----------|
| **pulse** | `.motion-pulse` | `box-shadow: 0 0 0 → 0 0 20px` (accent color) | 1.5s infinite | `ease-in-out` | "Save My Weights" when dirty, new badge |
| **shimmer** | `.motion-shimmer` | `background-position: -200% → 200%` | 2s infinite | `linear` | Gold champion banner, premium elements |
| **glow-pulse** | `.motion-glow` | `box-shadow: 0 0 0 → 0 0 24px` (gold) | 2s infinite | `ease-in-out` | Champion banner `.fxwon` |
| **bounce-in** | `.motion-bounce` | `scale: 0.3 → 1.08 → 1.0` | 500ms | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Draft pick cards, big reveals |
| **number-count** | `.motion-count` | JS-driven: `innerText` interpolation | 800ms | `ease-out` | Win counters, stat numbers |
| **text-reveal** | `.motion-text-reveal` | `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Headlines, key stats |

---

## 4. Application Map — Where Motion Applies

### 4.1 Draft Board

| Element | Entrance | Exit | State Change | Hook |
|---------|----------|------|--------------|------|
| Draft board container | `.motion-slide-up` | `.motion-slide-down-exit` | — | `renderDraftBoard2()` → wrapper |
| Position cards (left) | `.motion-stagger` (60ms) | — | `.motion-pulse` on user's turn | `renderPositionCards()` |
| Player cards (right) | `.motion-slide-right` (staggered) | `.motion-scale-out` on draft | `.motion-bounce` on user pick | `boardEntries()` → row render |
| "On the clock" banner | `.motion-slide-down` | `.motion-slide-up-exit` | — | `renderDraftBoard2()` header |
| Priority bars | `.motion-draw` (width) | — | — | CSS `--pri-width` var |
| Undo button | `.motion-scale-in` | — | `.motion-pulse` when available | `#undoBtn` |

### 4.2 Week Page / Game Preview

| Element | Entrance | Exit | State Change | Hook |
|---------|----------|------|--------------|------|
| Game preview card | `.motion-slide-up` (staggered) | `.motion-fade-out` | — | `renderWeekPage()` |
| Matchup bars | `.motion-draw` (width) | — | — | `matchupBarsHTML()` |
| Unit rating chips | `.motion-scale-in` (staggered) | — | — | `unitRatingChip()` |
| Game plan selector | `.motion-slide-up` | — | `.motion-pulse` on change | `gamePlanSelectorHTML()` |
| "Simulate Week" button | `.motion-scale-in` | — | `.motion-pulse` when ready | `#simWeekBtn` |

### 4.3 Game Recap

| Element | Entrance | Exit | State Change | Hook |
|---------|----------|------|--------------|------|
| Recap container | `.motion-slide-up` | — | — | `generateGameSummary()` wrapper |
| Quarter headers (1st/2nd/3rd/4th) | `.motion-text-reveal` (staggered 100ms) | — | — | `quarterHeaderHTML()` |
| Scoring plays | `.motion-slide-right` (staggered 80ms) | — | `.motion-bounce` on TD | `scoringPlayHTML()` |
| Turnover list | `.motion-fade-in` (staggered) | — | — | `turnoverListHTML()` |
| Stars of the game | `.motion-scale-in` (staggered) | — | `.motion-glow` (gold) on game ball | `starsOfGameHTML()` |
| "How it was decided" | `.motion-slide-up` | — | — | `howItWasDecidedHTML()` |
| Final score banner | `.motion-bounce` | — | `.motion-shimmer` (gold) | `finalScoreBannerHTML()` |

### 4.4 Season Review

| Element | Entrance | Exit | State Change | Hook |
|---------|----------|------|--------------|------|
| Champion banner (large) | `.motion-bounce` + `.motion-shimmer` | — | Persistent `.motion-glow` | `renderSeasonTab()` → champion block |
| Conference standings tables | `.motion-slide-up` (staggered 120ms) | — | `.motion-draw` for rank lines | `renderConferenceStandings()` |
| Playoff bracket | `.motion-draw` (lines) + `.motion-scale-in` (teams) | — | — | `renderBracketHTML()` |
| Awards sections | `.motion-slide-up` (staggered) | — | Gold text for user players | `renderAwardsHTML()` |
| Player stat cards | `.motion-stagger` (60ms) | — | — | `renderPlayerSeasonStats()` |
| "Season Review" button | `.motion-slide-up` | — | `.motion-pulse` (blue) | `#seasonReviewBtn` |
| "100-Season" button | `.motion-slide-up` (delayed) | — | — | `#sim100Btn` |

### 4.5 100-Season Review

| Element | Entrance | Exit | State Change | Hook |
|---------|----------|------|--------------|------|
| Report container | `.motion-slide-up` | — | — | `render100()` wrapper |
| Win distribution chart | `.motion-draw` (bars) + `.motion-stagger` | — | — | `winDistChartHTML()` |
| "Your players / average season" | `.motion-slide-up` | — | Auto-visible (no details click) | `yourPlayersAvgHTML()` |
| Award patterns | `.motion-slide-up` | — | Auto-visible | `awardPatternsHTML()` |
| Advanced stats (collapsed) | `.motion-fade-in` on expand | `.motion-fade-out` on collapse | — | `advancedStatsHTML()` |
| Re-run button | `.motion-scale-in` | — | — | `#sim100Re` |

### 4.6 Banners & Toasts (Global)

| Banner | Trigger | Entrance | Exit | Loop | Hook |
|--------|---------|----------|------|------|------|
| Conference Champions | `FX.play('conf')` | `.fxbanner` + `fxpop` | Auto-remove 4.3s | `fxshine` (gradient) | `FX.play('conf')` |
| Super Bowl Champions | `FX.play('sb')` | `.fxbanner` + `fxpop` | Auto-remove 4.3s | `fxshine` (gold gradient) | `FX.play('sb')` |
| Season complete (champ) | `seasonState.phase==='complete'` | `.motion-bounce` + `.motion-shimmer` | Persistent | `.motion-glow` (2.2s) | `.champion-banner.fxwon` |
| Division/Week win toast | `FX.play('small'/'medium')` | `.fxtoast` + `fxtoast` | Auto-remove 3s | — | `FX.play()` |

---

## 5. Gold Champions Theme & Shimmer Mechanics

### 5.1 Color Palette (CSS Variables)

```css
:root {
  /* Gold champion palette */
  --gold-100: #fff8e1;
  --gold-200: #ffecb3;
  --gold-300: #ffe082;
  --gold-400: #ffd54f;
  --gold-500: #ffca28;   /* Primary gold */
  --gold-600: #ffb300;
  --gold-700: #ffa000;
  --gold-800: #ff8f00;
  --gold-900: #ff6f00;

  /* Gradient definitions */
  --gold-gradient: linear-gradient(100deg, var(--gold-200) 0%, var(--gold-400) 30%, var(--gold-600) 50%, var(--gold-400) 70%, var(--gold-200) 100%);
  --gold-gradient-radial: radial-gradient(circle at 50% 50%, var(--gold-300) 0%, var(--gold-600) 70%, var(--gold-800) 100%);
  --gold-glow: rgba(255, 202, 40, 0.65);
  --gold-glow-strong: rgba(255, 202, 40, 0.9);

  /* Shimmer timing */
  --shimmer-duration: 2s;
  --shimmer-infinite: linear infinite;
}
```

### 5.2 Champion Banner — Enhanced (CSS-Only)

```css
/* Enhanced champion banner — replaces .champion-banner + .fxwon */
.champion-banner--gold {
  position: relative;
  text-align: center;
  padding: 32px 40px;
  background: var(--gold-gradient-radial);
  border: 3px solid var(--gold-500);
  border-radius: 20px;
  margin-bottom: 24px;
  box-shadow: 
    0 0 0 1px rgba(255,202,40,0.3),
    0 20px 60px rgba(255,150,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.2);
  overflow: hidden;
  animation: champion-entrance 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards,
             champion-glow 3s ease-in-out infinite;
}

.champion-banner--gold::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gold-gradient);
  background-size: 200% 100%;
  z-index: -1;
  border-radius: 22px;
  animation: shimmer var(--shimmer-duration) var(--shimmer-infinite);
  opacity: 0.6;
}

.champion-banner--gold h2 {
  margin: 0 0 8px;
  font-size: 2rem;
  font-weight: 900;
  color: #3a2600;
  text-shadow: 0 1px 2px rgba(255,255,255,0.3);
  animation: text-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
}

.champion-banner--gold p {
  margin: 0;
  font-size: 1.1rem;
  color: #5a4300;
  font-weight: 600;
  animation: text-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
}

/* Gold shimmer sweep */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Subtle glow pulse on the banner itself */
@keyframes champion-glow {
  0%, 100% { 
    box-shadow: 
      0 0 0 1px rgba(255,202,40,0.3),
      0 20px 60px rgba(255,150,0,0.3),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }
  50% { 
    box-shadow: 
      0 0 0 1px rgba(255,202,40,0.5),
      0 20px 60px rgba(255,150,0,0.5),
      0 0 40px rgba(255,202,40,0.4),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }
}

/* Entrance: bounce + scale */
@keyframes champion-entrance {
  0% { transform: translateY(30px) scale(0.9); opacity: 0; }
  50% { transform: translateY(-8px) scale(1.02); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
```

### 5.3 "Super Bowl Champions!" Text — Enhanced

```css
.superbowl-champion-text {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  background: var(--gold-gradient);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: 
    shimmer var(--shimmer-duration) var(--shimmer-infinite),
    text-pop-in 700ms cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

@keyframes text-pop-in {
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
```

### 5.4 Gold Accent Utilities

```css
/* Gold divider line — draws in */
.divider--gold {
  height: 3px;
  background: var(--gold-gradient);
  background-size: 200% 100%;
  border-radius: 2px;
  animation: shimmer var(--shimmer-duration) var(--shimmer-infinite),
             draw-line 800ms ease-in-out forwards;
  transform-origin: left;
  transform: scaleX(0);
}

/* Gold badge for user's award winners */
.badge--gold {
  background: var(--gold-gradient);
  color: #3a2600;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 999px;
  box-shadow: 0 2px 12px var(--gold-glow);
  animation: badge-pop 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

@keyframes badge-pop {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
```

---

## 6. Performance & Accessibility Rules

### 6.1 Reduced Motion Compliance

**All motion MUST degrade gracefully under `@media (prefers-reduced-motion: reduce)`:**

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable ALL keyframe animations */
  .motion-slide-up,
  .motion-slide-down,
  .motion-slide-right,
  .motion-scale-in,
  .motion-fade-in,
  .motion-draw,
  .motion-slide-up-exit,
  .motion-slide-down-exit,
  .motion-scale-out,
  .motion-fade-out,
  .motion-pulse,
  .motion-shimmer,
  .motion-glow,
  .motion-bounce,
  .motion-text-reveal,
  .fxbanner,
  .fxtoast,
  .champion-banner--gold,
  .champion-banner.fxwon,
  .superbowl-champion-text,
  .divider--gold,
  .badge--gold {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  /* Instant transitions */
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }

  /* Confetti canvas: stop animation loop */
  #fx { display: none !important; }
}
```

### 6.2 Performance Budgets

| Metric | Budget | Enforcement |
|--------|--------|-------------|
| **Total concurrent animations** | ≤ 12 | CSS `will-change` only on animating elements |
| **Confetti particles (max)** | 400 | `FX.play()` caps per kind |
| **Animation frame budget** | 16.67ms (60fps) | `requestAnimationFrame` loop; `transform`/`opacity` only |
| **Layout thrashing** | 0 | No `offsetWidth`/`getBoundingClientRect` in animation paths |
| **GPU layers** | ≤ 8 promoted | `will-change: transform, opacity` only |

### 6.3 Implementation Rules

1. **Use `transform` and `opacity` only** for animations — never animate `width`, `height`, `top`, `left`, `margin`
2. **Promote layers sparingly**: `will-change: transform, opacity` on elements that actually animate; remove after animation ends
3. **Stagger with CSS custom properties**: `--i` index variable, not JS timeouts
4. **Confetti canvas**: Reuse single canvas; clear via `clearRect`; pool particle objects
5. **No external libraries** — all CSS/JS native

---

## 7. New Motion Proposals — "More Ideas Like Confetti and Banners"

### 7.1 Proposed New Celebration Types

| Name | Trigger | Visual | Confetti | Hook |
|------|---------|--------|----------|------|
| **Division Clinched** | User wins division | Banner: "DIVISION CHAMPIONS!" + team-color gradient | 100 particles (team colors) | `FX.play('div', teamColors)` |
| **Playoff Berth** | User clinches playoffs | Banner: "PLAYOFF BOUND!" + confetti | 80 particles (team primary) | `FX.play('playoffs', teamColors)` |
| **Game Ball Awarded** | Post-game, game ball winner | Star burst + player card highlight | 30 gold particles from card | `FX.play('gameball', playerEl)` |
| **Record Broken** | Player breaks single-season record | Golden record shatter + banner | 60 gold particles | `FX.play('record', recordType)` |
| **Draft Steal** | User picks player >15 spots above ADP | "STEAL!" badge + pulse | 40 particles (team colors) | `FX.play('steal', pickEl)` |
| **Upset Win** | User beats >3 pt favorite | "UPSET!" banner + shake | 50 particles | `FX.play('upset')` |

### 7.2 UI Motion Enhancements

| Enhancement | Description | Hook |
|-------------|-------------|------|
| **Tab morph indicator** | Active tab indicator slides/morphs between tabs | `setActiveTab()` → update indicator position |
| **Stat number counter** | Numbers count up on season review/100-season | `renderSeasonTab()` / `render100()` → `.motion-count` |
| **Bracket line drawing** | Playoff bracket lines draw in sequentially | `renderBracketHTML()` → `.motion-draw` on SVG paths |
| **Card flip** | Player cards flip on hover (desktop) / tap (mobile) | `.player-card` → CSS 3D transform |
| **Progress ring** | Circular progress for "Week X of 17" | `#weekProgress` → SVG `stroke-dashoffset` |
| **Confetti trail on scroll** | Subtle particles follow scroll in season review | `scroll` listener → throttle → `confetti()` |

### 7.3 Text Motion Enhancements

| Enhancement | Description | Hook |
|-------------|-------------|------|
| **Typewriter effect** | Key narrative text types in (game preview, recap intro) | `generateGameSummary()` → `.motion-typewriter` |
| **Word-by-word reveal** | Headlines reveal word-by-word | `.motion-word-reveal` (CSS `animation-delay` per word) |
| **Scroll-reveal** | Sections animate in as they enter viewport | `IntersectionObserver` → add `.motion-slide-up` |

---

## 8. Exact Hooks — Classes & Functions

### 8.1 CSS Classes to Add

```css
/* Entrance */
.motion-slide-up { animation: slideUp 400ms cubic-bezier(0.16,1,0.3,1) forwards; }
.motion-slide-down { animation: slideDown 400ms cubic-bezier(0.16,1,0.3,1) forwards; }
.motion-slide-right { animation: slideRight 400ms cubic-bezier(0.16,1,0.3,1) forwards; }
.motion-scale-in { animation: scaleIn 300ms cubic-bezier(0.16,1,0.3,1) forwards; }
.motion-fade-in { animation: fadeIn 300ms ease-out forwards; }
.motion-draw { animation: drawLine 600ms ease-in-out forwards; }
.motion-text-reveal { animation: textReveal 500ms cubic-bezier(0.16,1,0.3,1) forwards; }
.motion-stagger > * { animation: slideUp 400ms cubic-bezier(0.16,1,0.3,1) calc(var(--i) * 60ms) forwards; opacity: 0; }

/* Exit */
.motion-slide-up-exit { animation: slideUpExit 300ms cubic-bezier(0.4,0,1,1) forwards; }
.motion-scale-out { animation: scaleOut 200ms cubic-bezier(0.4,0,1,1) forwards; }
.motion-fade-out { animation: fadeOut 200ms ease-in forwards; }

/* State */
.motion-pulse { animation: pulse 1.5s ease-in-out infinite; }
.motion-shimmer { animation: shimmer 2s linear infinite; background-size: 200% 100%; }
.motion-glow { animation: glowPulse 2s ease-in-out infinite; }
.motion-bounce { animation: bounceIn 500ms cubic-bezier(0.68,-0.55,0.27,1.55) forwards; }
.motion-count { /* JS-driven */ }
.motion-typewriter { /* JS-driven */ }
.motion-word-reveal { /* JS-driven */ }

/* Champion */
.champion-banner--gold { /* see §5.2 */ }
.superbowl-champion-text { /* see §5.3 */ }
.divider--gold { /* see §5.4 */ }
.badge--gold { /* see §5.4 */ }
```

### 8.2 Keyframes to Add (CSS)

```css
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideRight { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes scaleIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes drawLine { from { stroke-dashoffset: var(--line-length, 100); } to { stroke-dashoffset: 0; } }
@keyframes textReveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes slideUpExit { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-20px); opacity: 0; } }
@keyframes scaleOut { from { transform: scale(1); opacity: 1; } to { transform: scale(0.92); opacity: 0; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 var(--pulse-color, var(--accent)); } 50% { box-shadow: 0 0 20px var(--pulse-color, var(--accent)); } }
@keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 var(--gold-glow); } 50% { box-shadow: 0 0 24px var(--gold-glow-strong); } }
@keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
```

### 8.3 JS Functions to Add / Extend

| Function | Purpose | Parameters | Called From |
|----------|---------|------------|-------------|
| `FX.play(kind, options?)` | **EXTEND** — add new `kind` values | `kind: 'div'|'playoffs'|'gameball'|'record'|'steal'|'upset'`, `options: {colors, element, text}` | Season sim, draft, game recap |
| `FX.confettiBurst(config)` | **NEW** — configurable burst | `{count, colors, origin, spread, speed, gravity, life}` | `FX.play()` |
| `FX.banner(html, options?)` | **EXTEND** — add `duration`, `className`, `onRemove` | `html`, `{duration, className, onRemove}` | `FX.play()`, manual calls |
| `animateNumber(el, from, to, duration)` | **NEW** — number counter | `el`, `from`, `to`, `duration=800` | Season review, 100-season |
| `typewriterText(el, text, speed)` | **NEW** — typewriter effect | `el`, `text`, `speed=30ms/char` | Game preview, recap |
| `revealWords(el, stagger)` | **NEW** — word-by-word reveal | `el`, `stagger=80ms` | Headlines |
| `observeAndReveal(selector, animationClass)` | **NEW** — scroll reveal | `selector`, `animationClass` | Season review sections |
| `drawSVGPath(pathEl, duration)` | **NEW** — draw SVG path | `pathEl`, `duration=600` | Playoff bracket lines |
| `morphTabIndicator(fromTab, toTab)` | **NEW** — tab indicator morph | `fromTab`, `toTab` | `setActiveTab()` |

### 8.4 Integration Points (Where to Call)

```javascript
// In renderDraftBoard2() — after building board HTML:
requestAnimationFrame(() => {
  boardEl.querySelectorAll('.position-card').forEach((el, i) => {
    el.style.setProperty('--i', i);
    el.classList.add('motion-stagger');
  });
});

// In generateGameSummary() — after inserting recap HTML:
requestAnimationFrame(() => {
  recapEl.querySelectorAll('.quarter-header').forEach((el, i) => {
    el.style.animationDelay = `${i * 100}ms`;
    el.classList.add('motion-text-reveal');
  });
  recapEl.querySelectorAll('.scoring-play').forEach((el, i) => {
    el.style.animationDelay = `${i * 80}ms`;
    el.classList.add('motion-slide-right');
  });
});

// In renderSeasonTab() — champion banner:
if (seasonState.champion === user) {
  const banner = container.querySelector('.champion-banner');
  if (banner) {
    banner.classList.remove('champion-banner', 'fxwon');
    banner.classList.add('champion-banner--gold');
  }
}

// In setActiveTab() — tab indicator morph:
const indicator = document.querySelector('.tab-indicator');
if (indicator) morphTabIndicator(indicator.dataset.current, newTabId);
```

---

## 9. Implementation Phases

| Phase | Scope | Dependencies | Est. Effort |
|-------|-------|--------------|-------------|
| **1. Core Vocabulary** | Add CSS keyframes + utility classes + reduced-motion media query | None | 1 session |
| **2. Champion Theme** | Gold banner, shimmer, "Super Bowl Champions!" text | Phase 1 | 1 session |
| **3. Draft Board Motion** | Position cards, player cards, priority bars, on-the-clock | Phase 1 | 1 session |
| **4. Game Preview/Recap Motion** | Quarter headers, scoring plays, stars, final score | Phase 1 | 1 session |
| **5. Season/100-Season Review Motion** | Standings, bracket, awards, stat cards, auto-visible sections | Phase 1 | 1 session |
| **6. New Celebration Types** | Division, playoffs, game ball, record, steal, upset | Phase 1, 2 | 1 session |
| **7. Polish & Performance** | Tab morph, number counter, typewriter, scroll-reveal, budgets | All prior | 1 session |

---

## 10. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | All motion respects `prefers-reduced-motion: reduce` | Toggle in OS settings → all animations instant, confetti hidden |
| 2 | Champion banner has gold gradient + shimmer + glow pulse | Visual inspection; CSS `animation-name` includes `shimmer`, `champion-glow` |
| 3 | "Super Bowl Champions!" text uses gold gradient text + pop-in | Visual; `-webkit-background-clip: text` + `text-pop-in` keyframes |
| 4 | Draft board cards stagger in (60ms) | DevTools Animation inspector; no layout shift |
| 5 | Game recap quarters reveal sequentially | DevTools; `motion-text-reveal` on each quarter header |
| 6 | Season review sections slide up on load | DevTools; `motion-slide-up` on each panel |
| 7 | 100-season win distribution bars draw in | DevTools; `motion-draw` on chart bars |
| 8 | New celebration types trigger correctly | Simulate division clinch → "DIVISION CHAMPIONS!" banner + confetti |
| 9 | No console errors during animations | Browser console clean |
| 10 | 390px viewport: no horizontal overflow during/after animations | `tests/e2e-smoke.mjs` passes |
| 11 | 60fps maintained during max confetti (SB win) | Chrome Performance tab; frame times < 16.67ms |
| 12 | Tab indicator morphs smoothly between tabs | Click tabs → indicator slides, no jump |

---

## 11. Files to Modify (Read-Only Reference for Implementer)

| File | Sections |
|------|----------|
| `merged-patched.html` (or current build) | `<style>` block (add keyframes, classes, gold palette), `<script>` block (extend `FX`, add new animation functions), `renderDraftBoard2()`, `generateGameSummary()`, `renderSeasonTab()`, `render100()`, `setActiveTab()` |

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Reduced-motion not tested on all animations | Medium | High (accessibility fail) | Add automated check in `e2e-smoke.mjs` with `prefers-reduced-motion` emulation |
| Confetti canvas memory leak | Low | Medium | Pool particles; clear `parts[]` on `banner` remove |
| Stagger delays cause visual "pop-in" on slow devices | Medium | Low | Use `requestAnimationFrame` + `IntersectionObserver` for scroll-reveal |
| Gold gradient text not visible in dark mode | Low | High | Test both themes; ensure contrast on `--gold-gradient` |
| Tab indicator morph breaks on mobile | Medium | Medium | Test at 390px; fallback to instant switch if `matchMedia('(max-width: 480px)')` |

---

**END OF SPECIFICATION**

*Reported to MOC via council bulletin. Awaiting Architect (Claude) review and implementation assignment.*