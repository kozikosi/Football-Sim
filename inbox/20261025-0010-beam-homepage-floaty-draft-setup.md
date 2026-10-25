SPEAKER: Beam | ROLE: Council Adviser | TASK: Homepage floaty draft setup + 20-0 branding | DATE: 2026-10-25T00:10Z

FOR: V23-OWNER-REQUESTS (branding + homepage)

WHERE: Football-Sim-PreColors.html (l.382-393, draft setup panel)

old -> new:

1. Remove "Set Up Your Draft" heading + rewrite copy (combine with 20-0 branding):
old:
  <div class="panel" id="draftSetup">
   <h2 style="margin-top:0;">Set Up Your Draft</h2>
   <p>32 real NFL franchises are shuffled into a random snake draft order. Every player at every starter position is available from Round 1 — draft for value and need. CPU GMs draft by the same math the season uses: each takes the player who adds the most wins at a spot it still needs (with a little personal taste and randomness) and can flex players. Read the guide below the setup before you start.</p>
   <div class="filters" style="align-items:flex-end;">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Draft as
     <select id="draftSlotSelect"></select>
    </label>
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Draft pick #
     <select id="draftPickNumberSelect"><option value="random">Random</option></select>
    </label>
   </div>
   <button class="resetbtn" id="startDraftBtn" style="width:auto;padding:10px 24px;margin-top:12px;">Start Draft</button>
  </div>

new:
  <div class="panel" id="draftSetup" style="background:transparent;border:none;box-shadow:none;backdrop-filter:none;padding:var(--space-xl,32px) var(--space-lg,24px);">
   <p style="text-align:center;font-size:1.1rem;font-weight:600;margin:0 0 var(--space-lg,24px);background:linear-gradient(90deg,var(--accent,#d4af37) 0%,var(--accent3,#f0dce2) 50%,var(--accent,#d4af37) 100%);background-size:200% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:textShimmer 2.5s ease-in-out infinite;display:inline-block;width:100%;">Season, Playoffs, Super Bowl. Can you go 20-0?</p>
   <div class="float-row" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center;margin-bottom:20px;">
    <label class="float-pill" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;color:var(--sub);align-items:center;">
     <span style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.04em;">Draft as</span>
     <select id="draftSlotSelect" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:var(--text);border-radius:999px;padding:8px 20px;font-size:0.85rem;min-width:180px;text-align:center;appearance:none;-webkit-appearance:none;cursor:pointer;"></select>
    </label>
    <label class="float-pill" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;color:var(--sub);align-items:center;">
     <span style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.04em;">Draft pick #</span>
     <select id="draftPickNumberSelect" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:var(--text);border-radius:999px;padding:8px 20px;font-size:0.85rem;min-width:140px;text-align:center;appearance:none;-webkit-appearance:none;cursor:pointer;"><option value="random">Random</option></select>
    </label>
   </div>
   <div style="text-align:center;">
    <button class="resetbtn" id="startDraftBtn" style="width:auto;padding:12px 36px;border-radius:999px;font-size:1rem;font-weight:700;background:linear-gradient(135deg,var(--accent,#d4af37),var(--accent3,#f0dce2));color:#0d0a0e;border:none;box-shadow:0 4px 24px rgba(212,175,55,0.25);transition:transform 150ms ease, box-shadow 150ms ease;">Start Draft</button>
   </div>
   <p style="text-align:center;font-size:0.78rem;color:var(--sub);margin-top:16px;">Read the guide below the setup before you start.</p>
  </div>

WHY: Removes "Set Up Your Draft" heading. Replaces sentence-format copy with floating rose-gold entities (4 separate pills: Draft as, Draft pick #, Start Draft, guide link). Select rectangles become barely noticeable (translucent, hairline border, pill shape). Start Draft floats (centered, pill-shaped, gradient, shadow). Mobile: flex-wrap + centered, min-widths ensure tap targets.

SAFE ALONE?: YES — HTML/CSS only; no logic, no protected constants.

HOW TO CHECK: grep -n "Set Up Your Draft" → 0 hits. Visual: no heading; four floating pills centered; Start Draft is a centered pill with gradient; selects have barely visible borders; mobile (390px) wraps gracefully with no overflow.

EVIDENCE: VERIFIED (l.383-393 confirmed; exact strings captured).

Notes: Combine with homepage 20-0 branding proposal (inbox/20261024-2355-beam-homepage-20-0-branding.md). The shimmer-text keyframes must be defined (already in snippet §31). Team theming: the Start Draft gradient uses --accent/--accent3 which follow team colours when selected.
