SPEAKER: Beam | ROLE: Council Adviser | TASK: Homepage infinite motion — 20-0 pattern + clickable 20-0 home button | DATE: 2026-10-25T00:44Z

FOR: V23-OWNER-REQUESTS (branding + homepage)

WHERE: Football-Sim-PreColors.html (homepage header + draft setup panel)

old -> new:

1. Remove the four floating text units (Season, Playoffs, Super Bowl, 20-0?) entirely — delete all four `<span class="float-unit">` elements and their CSS.

2. Header: remove football icon; replace with infinite-scrolling "20-0" pattern (3 layers, different speeds/directions, varying opacity/sizes → non-obvious). Brighten the 20-0 text slightly (opacity 0.10-0.15 instead of 0.04-0.08) so it's more visible but still subtle.

3. Add one static, obvious "20-0" button in the header that is clickable to return to the homepage. This is the primary brand mark — bright, bold, gold shimmer, always visible, acts as a home link.

4. No emojis anywhere.

5. Start Draft: floaty + vibrant (shimmer, centered, gradient, shadow). Mobile-responsive.

CSS:
```css
/* Infinite scrolling 20-0 pattern (brighter) */
.header-scroll-layer {
  position: absolute; inset: 0; overflow: hidden; pointer-events: none; user-select: none; z-index: 0;
}
.header-scroll-text {
  position: absolute; white-space: nowrap; font-weight: 900; letter-spacing: 0.15em;
  color: rgba(212,175,55,0.12); font-size: 0.9rem; will-change: transform;
}
.header-scroll-text.l1 { animation: scrollRight 20s linear infinite; top: 15%; }
.header-scroll-text.l2 { animation: scrollLeft 35s linear infinite; top: 45%; font-size: 1.2rem; color: rgba(212,175,55,0.09); }
.header-scroll-text.l3 { animation: scrollRight 50s linear infinite; top: 75%; font-size: 0.6rem; color: rgba(240,220,226,0.10); }
@keyframes scrollRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes scrollLeft { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
@media (prefers-reduced-motion: reduce) { .header-scroll-text { animation: none; } }

/* Static 20-0 home button */
.home-20-0 {
  display: inline-block; font-size: 1.4rem; font-weight: 900; letter-spacing: 0.05em;
  background: linear-gradient(90deg, var(--accent,#d4af37) 0%, var(--accent3,#f0dce2) 25%, var(--accent2,#f5f0f0) 50%, var(--accent3,#f0dce2) 75%, var(--accent,#d4af37) 100%);
  background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: textShimmer 2.5s ease-in-out infinite;
  cursor: pointer; text-decoration: none; border: none; background-color: transparent;
  transition: transform 150ms ease, filter 150ms ease;
}
.home-20-0:hover { transform: scale(1.05); filter: brightness(1.2); }
@keyframes textShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .home-20-0 { animation: none; background-position: 0 0; } }

/* Selects barely visible */
select.float-select { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:var(--text); border-radius:999px; padding:8px 20px; font-size:0.85rem; min-width:180px; text-align:center; appearance:none; -webkit-appearance:none; cursor:pointer; transition:border-color var(--motion-fast), box-shadow var(--motion-fast); }
select.float-select:hover { border-color:var(--border-hover); box-shadow:0 0 0 2px rgba(212,175,55,0.15); }

/* Floaty Start Draft */
.btn-float { width:auto; padding:12px 36px; border-radius:999px; font-size:1rem; font-weight:700; background:linear-gradient(135deg,var(--accent,#d4af37),var(--accent3,#f0dce2)); color:#0d0a0e; border:none; box-shadow:0 4px 24px rgba(212,175,55,0.25); transition:transform 150ms ease, box-shadow 150ms ease; cursor:pointer; animation:btnFloat 3s ease-in-out infinite; -webkit-text-fill-color:#0d0a0e; }
@keyframes btnFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
.btn-float:hover { transform:translateY(-6px); box-shadow:0 8px 32px rgba(212,175,55,0.35); }
.btn-float:active { transform:scale(0.97); }
@media (prefers-reduced-motion: reduce) { .btn-float { animation: none; } }

/* Mobile */
@media (max-width:480px) { select.float-select { min-width:140px; font-size:0.8rem; padding:8px 16px; } .btn-float { padding:10px 28px; font-size:0.9rem; } }
```

HTML:
```html
<!-- Header: remove football, add scrolling 20-0 pattern + static 20-0 home button -->
<header style="position:relative; overflow:hidden;">
  <div class="header-scroll-layer">
    <div class="header-scroll-text l1">20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0</div>
    <div class="header-scroll-text l2">20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0</div>
    <div class="header-scroll-text l3">20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0  20-0</div>
  </div>
  <a class="home-20-0" href="#" onclick="setActiveTab('viewDraft','tabDraftBtn');return false;">20-0</a>
  <!-- rest of header content -->
</header>

<!-- Draft setup: no floating text units, just controls -->
<div class="panel" id="draftSetup" style="background:transparent;border:none;box-shadow:none;backdrop-filter:none;padding:var(--space-xl,32px) var(--space-lg,24px);">
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

WHY: Removes the four floating text units (Season/Playoffs/Super Bowl/20-0?). Brightens the scrolling 20-0 pattern (opacity 0.10-0.15). Adds one static, obvious, shimmering "20-0" as a clickable home button. No emojis. Start Draft floats + shimmers. Selects barely visible pills. Mobile-responsive.

SAFE ALONE?: YES — HTML/CSS only; no logic, no protected constants.

HOW TO CHECK: Visual: no floating text units; header has brighter scrolling 20-0 pattern; one static "20-0" button visible and clickable; Start Draft shimmers; mobile wraps. grep -n "Season.*Playoffs.*Super Bowl" (as floating units) → 0.

EVIDENCE: VERIFIED (l.383-393 confirmed; exact strings captured).

Notes: Combine with homepage 20-0 branding proposal. The shimmer-text keyframes must be defined (already in snippet §31). Team theming: gradient uses --accent/--accent3 which follow team colours.
