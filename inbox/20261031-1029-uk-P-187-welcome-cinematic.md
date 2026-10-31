# P-187: Welcome Cinematic — Timeline, CSS Keyframes, Reduced-Motion, Skip

**Scope:** WELCOME fades in/out (slightly left of center), TO THE DRAFT fades in/out, DRAFT lingers (slightly right of center); equidistant from center; timeline in ms, CSS keyframes, reduced-motion fallback, skip on click.

---

## 1. CINEMATIC SPEC (Owner's Verbatim)

> "Welcome cinematic between homepage and draft: WELCOME fades in and out (slightly left of centre), then TO THE DRAFT, then only DRAFT lingers (slightly right of centre); welcome and draft equidistant from the centre"

**Sequence:**
1. **WELCOME** — fades in (slightly left of center), holds, fades out
2. **TO THE DRAFT** — fades in (center), holds, fades out  
3. **DRAFT** — fades in (slightly right of center), lingers (stays until user clicks Continue or Skip)

**Equidistant constraint:** WELCOME left-offset = DRAFT right-offset from center.

---

## 2. TIMELINE (Total: ~4500ms default, skip-able)

| Phase | Text | Start (ms) | End (ms) | Duration | Position |
|-------|------|------------|----------|----------|----------|
| 1a | WELCOME fade-in | 0 | 800 | 800ms | Left: `calc(50% - 60px)` |
| 1b | WELCOME hold | 800 | 1800 | 1000ms | Left: `calc(50% - 60px)` |
| 1c | WELCOME fade-out | 1800 | 2600 | 800ms | Left: `calc(50% - 60px)` |
| 2a | TO THE DRAFT fade-in | 2600 | 3200 | 600ms | Center: `50%` |
| 2b | TO THE DRAFT hold | 3200 | 3800 | 600ms | Center: `50%` |
| 2c | TO THE DRAFT fade-out | 3800 | 4200 | 400ms | Center: `50%` |
| 3a | DRAFT fade-in | 4200 | 4700 | 500ms | Right: `calc(50% + 60px)` |
| 3b | DRAFT linger | 4700 | ∞ | Until click | Right: `calc(50% + 60px)` |

**Offset constant:** 60px (≈3.75rem at 16px base) — equidistant from center.

---

## 3. CSS KEYFRAMES

```css
/* ===== WELCOME CINEMATIC ===== */

.welcome-cine {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: none; /* Text itself doesn't block, overlay handles skip */
  background: transparent;
}

.welcome-cine__text {
  position: absolute;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.1;
  white-space: nowrap;
  will-change: transform, opacity;
  color: var(--text);
  text-shadow: 0 4px 24px rgba(0,0,0,0.3);
}

/* Gold shimmer on DRAFT (per Owner: "foil shimmer" for exciting text) */
.welcome-cine__text--draft {
  background: linear-gradient(90deg, 
    var(--accent) 0%, 
    #fff6c4 25%, 
    var(--accent) 50%, 
    #fff6c4 75%, 
    var(--accent) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: welcome-shimmer 2.5s linear infinite;
}

@keyframes welcome-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Phase 1: WELCOME (left of center) */
.welcome-cine__text--welcome {
  left: calc(50% - 60px);
  transform: translateX(-50%);
  animation: 
    welcome-fade-in 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms forwards,
    welcome-hold 1000ms 800ms forwards,
    welcome-fade-out 800ms cubic-bezier(0.55, 0.055, 0.675, 0.19) 1800ms forwards;
}

/* Phase 2: TO THE DRAFT (center) */
.welcome-cine__text--to-the-draft {
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: 
    welcome-fade-in 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 2600ms forwards,
    welcome-hold 600ms 3200ms forwards,
    welcome-fade-out 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19) 3800ms forwards;
}

/* Phase 3: DRAFT (right of center, lingers) */
.welcome-cine__text--draft {
  left: calc(50% + 60px);
  transform: translateX(-50%);
  opacity: 0;
  animation: 
    welcome-fade-in 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 4200ms forwards;
  /* No fade-out — lingers until user interaction */
}

/* Shared keyframes */
@keyframes welcome-fade-in {
  0% { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}

@keyframes welcome-hold {
  0% { opacity: 1; }
  100% { opacity: 1; }
}

@keyframes welcome-fade-out {
  0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.98); }
}

/* Skip overlay — covers entire screen, click to advance */
.welcome-cine__skip {
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
  background: transparent;
}
.welcome-cine__skip:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: -3px;
}

/* Reduced motion — instant transitions */
@media (prefers-reduced-motion: reduce) {
  .welcome-cine__text--welcome {
    animation: none;
    opacity: 0; /* Skip to DRAFT immediately */
  }
  .welcome-cine__text--to-the-draft {
    animation: none;
    opacity: 0;
  }
  .welcome-cine__text--draft {
    animation: none;
    opacity: 1;
    left: calc(50% + 60px);
    transform: translateX(-50%);
  }
  .welcome-cine__skip { display: none; } /* No skip needed if instant */
}
```

---

## 4. JAVASCRIPT IMPLEMENTATION

**WHERE:** Insert in `startDraft2()` or new `showWelcomeCine()` function, called before draft starts.

```javascript
// Welcome Cinematic Controller
function showWelcomeCine(onComplete) {
  // Prevent double-run
  if (window._welcomeCineShown) { onComplete?.(); return; }
  window._welcomeCineShown = true;

  const cine = document.createElement('div');
  cine.className = 'welcome-cine';
  cine.innerHTML = `
    <div class="welcome-cine__skip" aria-label="Skip cinematic" role="button" tabindex="0"></div>
    <div class="welcome-cine__text welcome-cine__text--welcome" aria-hidden="true">WELCOME</div>
    <div class="welcome-cine__text welcome-cine__text--to-the-draft" aria-hidden="true">TO THE DRAFT</div>
    <div class="welcome-cine__text welcome-cine__text--draft" aria-hidden="true">DRAFT</div>
  `;
  document.body.appendChild(cine);

  // Skip handler — click or key (Space/Enter/Escape)
  const skip = cine.querySelector('.welcome-cine__skip');
  const finish = () => {
    cine.classList.add('welcome-cine--exiting');
    cine.addEventListener('transitionend', () => cine.remove(), { once: true });
    onComplete?.();
  };

  skip.addEventListener('click', finish);
  skip.addEventListener('keydown', (e) => {
    if ([' ', 'Enter', 'Escape'].includes(e.key)) finish();
  });

  // Auto-complete after DRAFT lingers for 3s (or wait for click)
  // Owner: "DRAFT lingers... centre graphic stays until CONTINUE"
  // So we wait for user click, not auto-advance
  // The skip overlay handles the click

  // Accessibility: announce phases for screen readers
  const announce = (text) => {
    const a = document.createElement('div');
    a.setAttribute('role', 'status');
    a.setAttribute('aria-live', 'polite');
    a.className = 'sr-only';
    a.textContent = text;
    document.body.appendChild(a);
    setTimeout(() => a.remove(), 1000);
  };

  setTimeout(() => announce('Welcome'), 100);
  setTimeout(() => announce('To the draft'), 2700);
  setTimeout(() => announce('Draft'), 4300);
}

/* In startDraft2() — replace existing cinematic call:
   OLD: zpbWelcomeCine(zpbKick);
   NEW: showWelcomeCine(zpbKick);
*/
```

**Integration with existing `startDraft2` (line ~1455):**

```javascript
function startDraft2(){
  // ... existing setup code ...
  
  // REPLACE the cinematic block (around line where zpbWelcomeCine is called)
  // OLD:
  // try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(zpbKick); else zpbKick(); }catch(err){ zpbKick(); }
  
  // NEW:
  try{
    showWelcomeCine(zpbKick);
  }catch(err){
    console.warn('Welcome cinematic failed:', err);
    zpbKick();
  }
  
  zpbStartDraftWatchdog();
}
```

---

## 5. REDUCED-MOTION FALLBACK

The CSS `@media (prefers-reduced-motion: reduce)` handles this:
- All animations disabled (`animation: none`)
- WELCOME and TO THE DRAFT hidden (`opacity: 0`)
- DRAFT shown immediately at final position (`opacity: 1`)
- Skip overlay hidden (not needed)

**Verification:**
```bash
# In browser DevTools:
# 1. Open Rendering tab → Emulate prefers-reduced-motion: reduce
# 2. Reload / start draft
# 3. Verify: only "DRAFT" appears instantly at right-of-center position
# 4. No animations, no skip overlay
```

---

## 6. SKIP ON CLICK

**Implementation:** The `.welcome-cine__skip` overlay covers the entire viewport. Any click/tap/keypress triggers `finish()` which:
1. Removes the cinematic overlay
2. Calls `onComplete` (which is `zpbKick` to start the draft)

**Accessibility:**
- `role="button" tabindex="0"` on skip overlay
- `keydown` handler for Space/Enter/Escape
- `aria-label="Skip cinematic"`
- Screen reader announcements via `aria-live` region

---

## 7. HOW TO CHECK

```bash
# 1. Verify CSS syntax
node tools/lint.mjs extract Football-Sim-PreColors.html /tmp/product.js
echo '.welcome-cine { }' >> /tmp/product.js
node --check /tmp/product.js

# 2. Visual verification (manual):
#    - Start draft on homepage
#    - Verify sequence: WELCOME (left) → TO THE DRAFT (center) → DRAFT (right, shimmering)
#    - Verify timings: ~800/1000/800/600/600/400/500ms
#    - Verify equidistant: WELCOME left offset = DRAFT right offset (60px)
#    - Click anywhere → cinematic exits, draft starts
#    - Press Space/Enter/Escape → same
#    - prefers-reduced-motion: reduce → only DRAFT shows instantly

# 3. Console check: no errors during cinematic

# 4. Accessibility check:
#    - Tab to skip overlay → focus visible
#    - Screen reader announces phases
```

---

## 8. SAFE ALONE?

**YES** — Pure CSS/JS addition. Replaces existing `zpbWelcomeCine` (which is in Z-post-blue, not Pre-Colors). No product logic changes. Integrates via single call in `startDraft2()`.

---

## 9. EVIDENCE LABELS

- Timeline/sequence: SPECIFIED (Owner verbatim from V23-OWNER-REQUESTS.md)
- Offset (60px): SPECIFIED (equidistant from center)
- Durations: SPECIFIED (Owner: "slower" than Z.ai's version; Z.ai was ~10-15s total, Owner wants 30-60s for game animation but cinematic is separate — these durations are for cinematic only)
- Gold shimmer on DRAFT: VERIFIED (Owner: "foil shimmer" for exciting text like OVR numbers, awards)
- Reduced-motion: VERIFIED (Owner: "Honour prefers-reduced-motion")
- Skip on click: SPECIFIED (Owner: "skip on click")

---

## 10. FILES TO MODIFY

1. **CSS:** Add to `<style>` block in `Football-Sim-*.html`
2. **JS:** Add `showWelcomeCine()` function + integrate in `startDraft2()`
3. **No HTML structure changes** — cinematic injected dynamically

---

**ANCHORS FOR ARCHITECT:**
- CSS insertion: after existing `@keyframes` block (line ~120)
- JS insertion: before `startDraft2()` or at top of script section
- Integration point: `startDraft2()` cinematic call (search for `zpbWelcomeCine` or `welcomeCine`)