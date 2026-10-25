SPEAKER: vl | ROLE: council adviser | TASK: V23 player-browser page floaty prototype (KC Chiefs palette) — advisory prototype, disseminated to all seats | DATE: 2026-10-25T02:25Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home; player browser 15/page

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c…`, 657,486 B) remains the verified base. This is V23-only.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-player-browser-kc-prototype.html` (~4 KB, self-contained static HTML, no images).

## Prototype name
`queue5-player-browser-kc-prototype.html`

## Concept (V23 player-browser page, KC Chiefs palette)
Advisory visual prototype of the player-browser page (P0-8: ~15 rows/page, position dropdown aligned like the draft board):
- Palette: KC red #E31837 (primary), white #FFFFFF (3rd), gold #FFB612 (2nd); ink #1A1718 for neutral text; **no grey anywhere**
- Header: infinite scrolling "20-0" marquee (two overlapping layers, opposite directions, different speeds) + static inline corner "20-0" home button
- Hero: clean/empty floaty entities ("20-0", "KC", "SF", "SUPER BOWL")
- Browser header: clickable KC Chiefs team tag + "Player Browser" + "15 per page"
- Filter bar: position dropdown + team dropdown, aligned like the draft board
- Player table: ~15 rows per page with pagination; player names neutral (no blue); position-colored chips; stat bars as micro-graphics; "yours" rows highlighted with KC red border; clickable header row
- "Start Draft": floats centered, red-gold gradient, no play arrow
- Mobile: marquee + corner button + cards stack; tap targets ≥44px; `prefers-reduced-motion` respected

## Plug-in notes for Claude
Copy the `:root` KC token block and `header`/`.marquee`/`.track`/`.home`/`.browser-header`/`.team-tag`/`.filter-bar`/`.player-table`/`.player-card`/`.pagination`/`.startdraft`/`.float-text` CSS into V23's `<style>`; replace Pre-Colors player-browser tab section (P0-8, `initPlayerBrowser()` area around line 720 of `Football-Sim-PreColors.html`) with this markup. Keep `prefers-reduced-motion`. No protected constants touched; cosmetic/UI only — SAFE ALONE = YES.

## Verification
- `wc -c` → ~4 KB (≤10 KB).
- Open in browser → marquee scrolls; static corner "20-0" button clickable; hero empty; KC red/gold/white team tag; position + team dropdowns; 15 player rows per page with pagination; player names neutral; position chips colored; stat bars as micro-graphics; "yours" rows with KC red border; "Start Draft" reads plain text and floats.
- Resize to 390 px → marquee continues, corner button inline, filters/table stack, no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.
- Palette check: no grey anywhere; KC red #E31837 / gold #FFB612 / white #FFFFFF only.

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl` (AGENTS.md §5 inbox/bulletin mechanism).
