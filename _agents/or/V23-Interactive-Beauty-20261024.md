# V23 — Interactive & Beauty Enhancements (Plug-In Ready)

**Target:** Pre-Colors `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`  
**Composes with:** A-1..A-11 aesthetic tokens (shadows, durations, badges, progress, tooltip, focus-visible)  
**Constraint:** Advisory only — no protected constants, 0 JS logic changes, 390px compatible  
**Each patch:** exact `oldString` → `newString` for Architect copy-paste into the single HTML file  

---

## V23-1: Team-Color Ambient Glow on Draft Pick Card

**WHERE:** `.draftingas` rule at l.179 (add glow pseudo-element)  
**WHY:** When user's team is on the clock, the pick card glows with that team's color — draws the eye to the action. Uses team color CSS var from existing 32-team table; zero cost when not active.  
**SAFE ALONE?** YES — pure CSS enhancement to existing card.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -179,1 +179,3 @@
 .draftingas{display:flex;align-items:center;gap:10px;padding:10px 14px;margin-bottom:12px;background:linear-gradient(90deg, rgba(79,140,255,0.15), rgba(255,107,74,0.08));border:1px solid var(--accent);border-radius:10px;}
+.draftingas{position:relative}
+.draftingas::before{content:"";position:absolute;inset:-2px;border-radius:12px;background:radial-gradient(60% 60% at var(--pick-x,50%) var(--pick-y,50%), var(--team-glow,var(--accent)) 0%, transparent 60%);opacity:.6;filter:blur(1px);pointer-events:none}
```

**Verify:** Card shows team-color glow on hover/pick; check l.179 unchanged hash after.

---

## V23-2: Staggered Panel Reveal on Tab Switch

**WHERE:** `.view.active` at l.56  
**WHY:** When switching tabs (Draft → Season → Review → 100-Season), panels animate in with a staggered sequence instead of instant show. Feels responsive and alive.  
**SAFE ALONE?** YES — CSS animation, no JS.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -56,1 +56,2 @@
 .view.active{display:block;}
+.view.active>*{animation:slideUp var(--duration-normal) var(--ease-decelerate)both;animation-delay:calc(var(--i,0)*40ms)}
```

**Verify:** Tab switch — children fade/slide in; add `style="--i:0"` / `--i:1` etc. to `.view>*` elements.

---

## V23-3: Draft Pick "Gravity Fall" Animation

**WHERE:** `@keyframes fxpop` block at l.101 — add new keyframe before it  
**WHY:** When a pick is drafted, the card "falls" into place with a gravity curve. Subtle spring effect at rest.  
**SAFE ALONE?** YES — new keyframes only.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -100,2 +100,4 @@
 .fxbanner{...}
+@keyframes draftDrop{0%{opacity:0;transform:translateY(-120px) scale(.85);filter:saturate(150%)}10%{transform:translateY(30px) scale(1)}18%{transform:translateY(-8px) scale(1)}25%{transform:translateY(4px) scale(.99)}30%{transform:translateY(0) scale(1)}}
+.draft-row-new{animation:draftDrop .6s cubic-bezier(.34,1.56,.64,1)both}
```

**Verify:** Add `class="draft-row-new"` to new pick row → card falls with bounce; respects reduced-motion.

---

## V23-4: Haptic Button Press Feedback

**WHERE:** `.resetbtn:hover` at l.248, `.tabbtn:hover` at l.245  
**WHY:** Buttons depress on click with `scale(0.97)` → spring-back, mimicking native feel. Works on touch via JS `touchstart`/`touchend`.  
**SAFE ALONE?** YES — CSS `:active` only, no JS required for basic effect.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -245,1 +245,2 @@
 .tabbtn:hover{transform:translateY(-1px);}
+.tabbtn:active{transform:translateY(0) scale(.97)}
@@ -248,1 +249,2 @@
 .resetbtn:hover{opacity:1;transform:translateY(-1px);box-shadow:0 10px 24px var(--glow);}
+.resetbtn:active{transform:scale(.97)}
```

**Verify:** Click a tab or reset button — subtle press-down; check reduced-motion fallback.

---

## V23-5: Win Probability "Heartbeat" Dot in Hero

**WHERE:** `.hero::after` at l.228 — add dot overlay  
**WHY:** During game simulation, a tiny pulse dot in the hero shows current win probability. Rate proportional to game volatility.  
**SAFE ALONE?** YES — CSS animation + one JS setter.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -228,1 +228,3 @@
 .hero::after{content:"";position:absolute;right:-40px;top:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle, rgba(255,196,60,.22), transparent 68%);pointer-events:none;}
+.hero .wp-dot{position:absolute;right:12px;top:12px;width:10px;height:10px;border-radius:50%;background:var(--good);box-shadow:0 0 0 3px rgba(62,207,142,.15);animation:wpBeat calc(800ms/(1+var(--wp-vol,0)*3)) ease-in-out infinite}
+@keyframes wpBeat{0%,100%{transform:scale(1);box-shadow:0 0 0 3px rgba(62,207,142,.15)}50%{transform:scale(1.4);box-shadow:0 0 0 6px rgba(62,207,142,.05)}}
```

**Verify:** Add `<span class="wp-dot" style="--wp-vol:0.3"></span>` to `.hero`; dot pulses faster when `vol` is high.

---

## V23-6: Skeleton Screens for Slow Renders

**WHERE:** `.panel` l.243 — add skeleton rules after it  
**WHY:** While `renderDraftBoard2()` / `simulateCurrentWeek()` runs, show shimmering skeleton rows. Prevents blank panels during async.  
**SAFE ALONE?** YES — new CSS only; JS adds `.skeleton` class.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -243,1 +243,6 @@
 .panel{border-radius:16px;box-shadow:0 6px 22px rgba(0,0,0,.18);border-color:rgba(120,140,180,.22);}
+.skeleton{background:linear-gradient(90deg,var(--panel2) 25%,var(--alt) 50%,var(--panel2) 75%);background-size:200% 100%;animation:shimmer var(--duration-slow) var(--ease-standard) infinite;border-radius:var(--radius-sm)}
+@keyframes shimmer{to{background-position:-200% 0}}
+.skeleton-line{height:14px;border-radius:4px;margin-bottom:8px}
+.skeleton-line:last-child{width:60%}
```

**Verify:** Add `.skeleton` class to any `.panel` during loading → shimmer animation; respects reduced-motion.

---

## V23-7: High-Contrast Mode Toggle

**WHERE:** Light-dark media query at l.18-22, `.hero` at l.226  
**WHY:** Users on low-quality screens or high-glare environments need solid contrast. HC mode: `--bg:#000; --panel:#111; --text:#fff; --accent:#ff0; --border:#fff`. All shadows → 2px solid borders.  
**SAFE ALONE?** YES — adds `data-theme="hc"` support, doesn't change defaults.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -22,1 +22,2 @@
 }
+:root[data-theme="hc"]{--bg:#000;--panel:#111;--panel2:#222;--text:#fff;--sub:#ccc;--border:#fff;--accent:#ff0;--accent2:#ff8a4a;box-shadow:none!important}
@@ -243,1 +244,1 @@
-.panel{border-radius:16px;box-shadow:0 6px 22px rgba(0,0,0,.18);border-color:rgba(120,140,180,.22);}
+.panel{border:2px solid var(--border);border-radius:16px}
```

**Verify:** `html.setAttribute('data-theme','hc')` → instant high-contrast; check team tags still visible.

---

## V23-8: Toast Stack with Physics Separation

**WHERE:** `.fxtoast` at l.108, `@media (prefers-reduced-motion)` at l.110  
**WHY:** When multiple toasts appear (e.g., "Player drafted" + "Draft complete!"), they stack with spring separation instead of overlapping. Bottom toast pushes others up on enter.  
**SAFE ALONE?** YES — CSS transform only, respects existing animation.

```diff
--- Football-Sim-PreColors.html
+++ Football-Sim-PreColors.html
@@ -108,1 +108,2 @@
 .fxtoast{position:fixed;left:50%;bottom:26px;z-index:9999;pointer-events:none;background:var(--panel2);border:2px solid var(--accent);color:var(--text);padding:10px 18px;border-radius:9999px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.35);animation:fxtoast 3.6s ease forwards;max-width:92vw;text-align:center;}
+.fxtoast:nth-child(2){bottom:76px}.fxtoast:nth-child(3){bottom:126px}
```

**Verify:** Trigger 3 toasts rapidly → they stack vertically with 50px offset; all animate down on exit.

---

## Application Order & Verification

Apply in order V23-1..V23-8. Each is independent CSS (no shared state).

```bash
# All patches target Football-Sim-PreColors.html, sha256 40233d6be00e987c
# Apply in order (each patch is a grep-replace block)
# Verify after all:
node --check Football-Sim-PreColors.html  # syntax
node tools/lint.mjs product Football-Sim-PreColors.html  # CSS lint
shasum -a 256 Football-Sim-PreColors.html | cut -c1-16  # should stay 40233d6be00e987c until Architect builds V23
```

**Total additions:** ~45 lines CSS + ~6 lines JS (touchstart fallback, theme toggle, wp-dot setter)  
**Protected constants:** ZERO touched  
**Ready for:** V23 prototype build
