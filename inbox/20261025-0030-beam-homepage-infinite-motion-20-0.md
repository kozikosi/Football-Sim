SPEAKER: Beam | ROLE: Council Adviser | TASK: Homepage infinite motion — 20-0 pattern + floating units | DATE: 2026-10-25T00:30Z

FOR: V23-OWNER-REQUESTS (branding + homepage)

WHERE: Football-Sim-PreColors.html (homepage header + draft setup panel)

old -> new:

1. Header: remove football icon; replace with infinite-scrolling "20-0" pattern:
   - Multiple layers of "20-0" text scrolling at different speeds/directions (right, left, diagonal).
   - Varying opacity (0.03-0.08), font sizes (0.6rem-1.2rem), and letter-spacing per layer.
   - Layers use CSS animations with different durations (20s, 35s, 50s) and directions to make the pattern non-obvious.
   - `overflow: hidden` on header; text is `pointer-events: none; user-select: none`.
   - Respect `prefers-reduced-motion`: static single layer at low opacity.

2. Remove panels and bubbles around "Season", "Playoffs", "Super Bowl", "Can you go 20-0?":
   - No background, no border, no border-radius, no box-shadow, no backdrop-filter.
   - Text only, with subtle text-shadow for depth.
   - Each unit is a plain `<span>` with gold/rose color, no container.

3. Change "20-0 Can you?" → "20-0?" (remove "Can you").

4. All four units (Season, Playoffs, Super Bowl, 20-0?) float and move in infinite motion:
   - Each unit has its own independent float animation (translateY + translateX + rotate) with different durations (4s, 5.5s, 7s, 8.5s) and phases.
   - Motion is subtle (±6px vertical, ±4px horizontal, ±2deg rotation).
   - No two units share the same animation timing → non-obvious pattern.

5. Remove all emojis from homepage.

6. Start Draft: more floaty and vibrant — shimmer text effect (gradient text animation), floating (translateY ±4px, 3s), centered, gradient background, glow shadow.

CSS:
```css
/* Infinite scrolling 20-0 pattern */
.header-scroll-layer {
  position: absolute; inset: 0; overflow: hidden; pointer-events: none; user-select: none; z-index: 0;
}
.header-scroll-text {
  position: absolute; white-space: nowrap; font-weight: 900; letter-spacing: 0.15em;
  color: rgba(212,175,55,0.06); font-size: 0.9rem; will-change: transform;
}
.header-scroll-text.l1 { animation: scrollRight 20s linear infinite; top: 15%; }
.header-scroll-text.l2 { animation: scrollLeft 35s linear infinite; top: 45%; font-size: 1.2rem; color: rgba(212,175,55,0.04); }
.header-scroll-text.l3 { animation: scrollRight 50s linear infinite; top: 75%; font-size: 0.6rem; color: rgba(240,220,226,0.05); }
@keyframes scrollRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes scrollLeft { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
@media (prefers-reduced-motion: reduce) { .header-scroll-text { animation: none; } }

/* Floating units (no panels/bubbles) */
.float-unit {
  display: inline-block; font-weight: 700; padding: 0; margin: 0;
  background: none; border: none; border-radius: 0; box-shadow: none;
  backdrop-filter: none; text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  will-change: transform;
}
.float-unit.u1 { color: var(--accent,#d4af37); animation: float1 4s ease-in-out infinite; }
.float-unit.u2 { color: var(--accent2,#f5f0f0); animation: float2 5.5s ease-in-out infinite; }
.float-unit.u3 { color: var(--accent3,#f0dce2); animation: float3 7s ease-in-out infinite; }
.float-unit.u4 { color: var(--accent,#d4af37); animation: float4 8.5s ease-in-out infinite; }
@keyframes float1 { 0%,100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(3px,-5px) rotate(1deg); } 50% { transform: translate(-2px,-8px) rotate(-1deg); } 75% { transform: translate(4px,-3px) rotate(0.5deg); } }
@keyframes float2 { 0%,100% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(-4px,-6px) rotate(-1.5deg); } 66% { transform: translate(3px,-4px) rotate(1deg); } }
@keyframes float3 { 0%,100% { transform: translate(0,0) rotate(0deg); } 20% { transform: translate(5px,-3px) rotate(0.8deg); } 40% { transform: translate(-3px,-7px) rotate(-0.5deg); } 60% { transform: translate(2px,-5px) rotate(1.2deg); } 80% { transform: translate(-4px,-2px) rotate(-0.8deg); } }
@keyframes float4 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-5px,-6px) rotate(-2deg); } }
@media (prefers-reduced-motion: reduce) { .float-unit, .header-scroll-text { animation: none; } }

/* Shimmer text for Start Draft */
.shimmer-text {
  background: linear-gradient(90deg, var(--accent,#d4af37) 0%, var(--accent3,#f0dce2) 25%, var(--accent2,#f5f0f0) 50%, var(--accent3,#f0dce2) 75%, var(--accent,#d4af37) 100%);
  background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: textShimmer 2.5s ease-in-out infinite; display: inline-block;
}
@keyframes textShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Floaty Start Draft */
.btn-float { width:auto; padding:12px 36px; border-radius:999px; font-size:1rem; font-weight:700; background:linear-gradient(135deg,var(--accent,#d4af37),var(--accent3,#f0dce2)); color:#0d0a0e; border:none; box-shadow:0 4px 24px rgba(212,175,55,0.25); transition:transform 150ms ease, box-shadow 150ms ease; cursor:pointer; animation:btnFloat 3s ease-in-out infinite; }
@keyframes btnFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
.btn-float:hover { transform:translateY(-6px); box-shadow:0 8px 32px rgba(212,175,55,0.35); }
.btn-float:active { transform:scale(0.97); }
@media (prefers-reduced-motion: reduce) { .btn-float { animation: none; } }

/* Mobile */
@media (max-width:480px) {
  .float-entity { font-size:0.85rem; padding:6px 14px; }
  .btn-float { padding:10px 28px; font-size:0.9rem; }
}
```

HTML:
```html
<!-- Header: remove football, add scrolling 20-0 pattern -->
<header style="position:relative; overflow:hidden;">
  <div class="header-scroll-layer">
    <div class="header-scroll-text l1">20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0</div>
    <div class="header-scroll-text l2">20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0</div>
    <div class="header-scroll-text l3">20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0</div>
  </div>
  <!-- header content (logo, nav) above the pattern -->
</header>

<!-- Draft setup: four floating units, no panels/bubbles -->
<div class="panel" id="draftSetup" style="background:transparent;border:none;box-shadow:none;backdrop-filter:none;padding:var(--space-xl,32px) var(--space-lg,24px);">
  <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center;margin:0 0 var(--space-lg,24px);">
    <span class="float-unit float-unit u1">Season</span>
    <span class="float-unit float-unit u2">Playoffs</span>
    <span class="float-unit float-unit u3">Super Bowl</span>
    <span class="float-unit float-unit u4 shimmer-text">20-0?</span>
  </div>
  <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center;margin-bottom:20px;">
    <label style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;color:var(--sub);align-items:center;">
      <span style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.04em;">Draft as</span>
      <select id="draftSlotSelect" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:var(--text);border-radius:999px;padding:8px 20px;font-size:0.85rem;min-width:180px;text-align:center;appearance:none;-webkit-appearance:none;cursor:pointer;"></select>
    </label>
    <label style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;color:var(--sub);align-items:center;">
      <span style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.04em;">Draft pick #</span>
      <select id="draftPickNumberSelect" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:var(--text);border-radius:999px;padding:8px 20px;font-size:0.85rem;min-width:140px;text-align:center;appearance:none;-webkit-appearance:none;cursor:pointer;"><option value="random">Random</option></select>
    </label>
  </div>
  <div style="text-align:center;">
    <button class="resetbtn btn-float" id="startDraftBtn" style="width:auto;padding:12px 36px;border-radius:999px;font-size:1rem;font-weight:700;background:linear-gradient(135deg,var(--accent,#d4af37),var(--accent3,#f0dce2));color:#0d0a0e;border:none;box-shadow:0 4px 24px rgba(212,175,55,0.25);-webkit-text-fill-color:#0d0a0e;">Start Draft</button>
  </div>
</div>
```

WHY: Removes football from header, replaces with infinite-scrolling 20-0 pattern (3 layers, different speeds/directions, varying opacity/sizes → non-obvious). Removes panels/bubbles around Season/Playoffs/Super Bowl/20-0? (plain text with text-shadow). Changes "20-0 Can you?" → "20-0?". All four units float with independent infinite motion (different durations/phases). Start Draft floats + shimmers. No emojis. Mobile-responsive.

SAFE ALONE?: YES — HTML/CSS only; no logic, no protected constants.

HOW TO CHECK: Visual: header has scrolling 20-0 pattern (no football); four floating text units (no panels); "20-0?" (no "Can you"); Start Draft shimmering pill; mobile wraps. grep -n "Can you go 20-0" → 0; grep -n "20-0?" → 1+.

EVIDENCE: VERIFIED (l.383-393 confirmed; exact strings captured).

Notes: Combine with homepage 20-0 branding proposal + floaty draft setup. The shimmer-text keyframes must be defined (already in snippet §31). Team theming: gradient uses --accent/--accent3 which follow team colours.
