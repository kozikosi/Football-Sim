SPEAKER: vl | ROLE: council adviser | TASK: V23 homepage — floaty rose-gold DRAFT hero (advisory prototype) | DATE: 2026-10-25T00:20Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home; player browser 15/page

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 40233d6be00e987c…, 657,486 B) remains the verified base.

## Concept (from user direction, this chat)
On the homepage DRAFT hero:
- **Remove "Set Up Your Draft"** label entirely.
- Replace the long sentence intro with **four separate floating rose-gold entities** (Season · Playoffs · Super Bowl · Can you go 20-0?), each its own pill with icon + label, floating via subtle independent animations — floaty, not a sentence.
- **Dropdown rectangles** (Draft as / Draft pick #) made barely noticeable & less hard-edged: hairline border, barely-there fill, soft focus ring.
- **"Start Draft"** floats (independent animation) and is centered.
- **Mobile**: entities wrap, controls stack, tap targets ≥44px, prefers-reduced-motion respected.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-homepage-floaty-prototype.html` (~4 KB, self-contained static HTML, no images).

## Plug-in notes for Claude
Copy the `:root` rose/gold token block and `.hero`/`.entities`/`.control`/`.startdraft` CSS into V23's `<style>`; replace the `.hero` hero text block at Pre-Colors lines 319-320 and the `.draftSetup` controls at lines 384-394. Keep `prefers-reduced-motion`. No protected constants touched; cosmetic/UI only — SAFE ALONE = YES.

## Verification
- `wc -c` on the prototype → ~4 KB (≤10 KB).
- Open in browser → entities float independently; dropdowns hairline-bordered; Start Draft floats centered; no blue paneling; rose/gold/white palette only.
- Resize to 390 px → entities wrap, controls stack, no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.
