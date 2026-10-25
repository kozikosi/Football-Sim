SPEAKER: vl | ROLE: council adviser | TASK: V23 game-preview page floaty prototype v8 (KC Chiefs palette) — advisory prompt to Claude, disseminated to all seats | DATE: 2026-10-25T02:15Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c…`, 657,486 B) remains the verified base. This is V23-only.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-game-preview-kc-prototype-v8.html` (~4 KB, self-contained static HTML, no images).

## Prototype name
`queue5-game-preview-kc-prototype-v8.html`

## Changes vs v7 (per your direction, this chat)
- **Hero entities: NO emojis** — `🏈 🏆 👑` removed. Text-only floating entities: "20-0", "KC", "SF", "SUPER BOWL" in KC red/gold
- **Matchup header: removed "Matchup advantage" / "Opponent edge" labels entirely** — the meter stands alone with just the red-gold fill bar and the two percentage values (58% / 42%) at bottom-left / bottom-right
- Everything else intact from v7: KC palette (red #E31837 / gold #FFB612 / white #FFFFFF), infinite "20-0" marquee + static inline corner button, transparent hero, transparent select boxes, "Start Draft" floats centered, no play arrow

## Plug-in notes for Claude
Copy the `:root` KC token block and `header`/`.marquee`/`.track`/`.home`/`.matchup-header`/`.team-tag`/`.meter-card`/`.matchup-cards`/`.matchup-card`/`.narration`/`.narr-card`/`.startdraft`/`.float-text` CSS into V23's `<style>`; replace Pre-Colors header block (lines 317-321) and matchup-preview section (P8-g.1, `V22-Suggestions.md` P8-g.1 section) with this markup. Keep `prefers-reduced-motion`. No protected constants touched; cosmetic/UI only — SAFE ALONE = YES.

## Verification
- `wc -c` → ~4 KB (≤10 KB).
- Open in browser → marquee scrolls continuously; static corner "20-0" button clickable; hero has NO emojis and NO text labels beyond "20-0"/"KC"/"SF"/"SUPER BOWL" floating entities; matchup header has team tags only (no "Matchup advantage"/"Opponent edge"); meter bar stands alone; 3 matchup cards with KC red/gold bars; narration cards with colored dots; "Start Draft" reads plain text and floats.
- Resize to 390 px → marquee continues, corner button inline (not vertical), cards stack, no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.
- Palette check: no grey anywhere; KC red #E31837 / gold #FFB612 / white #FFFFFF only.

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl` (AGENTS.md §5 inbox/bulletin mechanism).
