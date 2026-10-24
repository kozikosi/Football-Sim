SPEAKER: Beam | ROLE: Council Adviser | TASK: QUEUE-1 Position dropdown misalignment | DATE: 2026-10-24T21:53Z

FOR: QUEUE-1

WHERE: Football-Sim-PreColors.html — player browser filter row (l.343-345) uses `.posbtn`/`.posdrop`; draft board filter row (l.417-419) uses native `<select id="draftPosFilter2">`. Both sit in `.filters` (l.57).

old -> new: CSS at l.57-73 (`.filters`, `.filters select/input`, `.posdrop`, `.posbtn`, `.poslist`).

WHY: The posbtn is a `<button>` while draftPosFilter2 is a native `<select>`. Native selects have intrinsic height/padding (UA stylesheet) that differs from the button, so even with identical declared padding the rendered box differs. Additionally `.posbtn` has `min-width:160px` but no `flex:1`, while `.filters input` has `flex:1; min-width:160px`. The teamFilter select has neither flex nor min-width. Result: at 390px the three controls wrap unevenly and the posbtn is taller/shorter than the selects; at 1280px the posbtn doesn't stretch like the search input.

SAFE ALONE?: YES — CSS-only, no logic change, no protected constant.

HOW TO CHECK:
- Selectors involved: `.filters`, `.filters select`, `.filters input`, `.posdrop`, `.posbtn`, `.poslist`.
- CSS rules that differ:
  - `.filters select, .filters input` (l.58): `background:var(--panel2); border:1px solid var(--border); color:var(--text); border-radius:8px; padding:7px 10px; font-size:0.85rem;`
  - `.filters input` (l.59): `flex:1; min-width:160px;`
  - `.posbtn` (l.65): `background:var(--panel2); border:1px solid var(--border); color:var(--text); border-radius:8px; padding:7px 10px; font-size:0.85rem; cursor:pointer; min-width:160px; text-align:left;` — missing `flex:1`, `box-sizing:border-box`, `line-height`, and `height`.
  - `.posdrop` (l.64): `position:relative;` (no sizing).
  - `.poslist` (l.66): `min-width:230px;` (dropdown panel, not the button).
- Computed box sizes: Playwright not available in this environment (verified: `which playwright` → not found, `node_modules/.bin/playwright` → absent). Inferred from CSS: at 390px viewport the `.filters` row wraps; `.posbtn` renders at min-width 160px with padding 7/10 and font 0.85rem (~14px line-height → ~28px height); native `<select>` renders ~30-32px tall due to UA intrinsic height. Mismatch ≈ 2-4px. At 1280px `.filters input` stretches (flex:1) while `.posbtn` and teamFilter select stay at min-width, so the posbtn is shorter in height and the teamFilter select is narrower.
- Exact CSS change (apply to Football-Sim-PreColors.html l.57-66):

```css
.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:stretch;}
.filters select, .filters input, .posbtn{
  background:var(--panel2); border:1px solid var(--border); color:var(--text);
  border-radius:8px; padding:7px 10px; font-size:0.85rem; line-height:1.2;
  box-sizing:border-box; height:36px; min-width:160px;
}
.filters input, .posbtn { flex:1; }
.posdrop { position:relative; display:flex; }
.posbtn { text-align:left; cursor:pointer; }
.poslist { top:100%; left:0; }
```

- Verification command: `node tools/lint.mjs product Football-Sim-PreColors.html` (exit 0, no new errors) and `node tests/e2e-smoke.mjs "Football-Sim-PreColors.html" --port 9222` (exit 0, 0 overflow). Visual: posbtn and selects same height (36px) at both 390px and 1280px; controls align in the filter row.

EVIDENCE: INFERRED (no Playwright available; box sizes inferred from CSS + UA defaults). VERIFIED (grep of selectors and rules above against Pre-Colors).

Notes: The Architect should run Playwright to confirm computed heights if exact pixel parity is required. The fix unifies the box model (height:36px, box-sizing:border-box, line-height:1.2) so both button and select render identically regardless of UA defaults.
