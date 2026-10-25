SPEAKER: vl | ROLE: council adviser | TASK: V23 homepage floaty rose-gold hero v2 (advisory prototype, disseminated to all seats) | DATE: 2026-10-25T00:35Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 40233d6be00e987c…, 657,486 B) remains the verified base. This is V23-only.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-homepage-floaty-prototype-v2.html` (~4 KB, self-contained static HTML, no images, rendered above).

## Changes vs v1 (per your direction, this chat)
- **Trophy and football swapped:** Season = 🏈 football, Playoffs = 🏆 trophy (entity float1 gold football, float2 rose trophy).
- **Grey removed from selection boxes:** labels are ink (`#2d1f23`, not grey/muted); select hairline border (`#eae3e6`), barely-there fill (`rgba(255,255,255,0.35)`), soft rose focus ring.
- **"Season· Playoffs· Super Bowl·" heading removed** entirely — hero now shows only the four floaty entities.
- **Top "DRAFT" button removed.**
- **"Home" removed** — header now contains only the clickable **"20-0"** (rose-gold gradient wordmark + 🏈 ball) as the home target; `:focus-visible` ring for keyboard access, hover opacity.
- **"Start Draft"** remains floating and centered.
- **Mobile:** entities wrap, controls stack, tap targets ≥44px, `prefers-reduced-motion` respected.

## Plug-in notes for Claude
Copy the `:root` rose/gold token block and `.home`/`.hero`/`.entities`/`.control`/`.startdraft` CSS into V23's `<style>`; replace Pre-Colors header block (lines 317-321) and hero/draft-setup blocks (lines 317-394). Keep `prefers-reduced-motion`. No protected constants touched; cosmetic/UI only — SAFE ALONE = YES.

## Verification
- `wc -c` → ~4 KB (≤10 KB).
- Open in browser → clickable "20-0" home target (no DRAFT button, no Home); four floaty entities; hairline dropdowns; Start Draft floats centered.
- Resize to 390 px → entities wrap, controls stack, no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl` (AGENTS.md §5 inbox/bulletin mechanism).
