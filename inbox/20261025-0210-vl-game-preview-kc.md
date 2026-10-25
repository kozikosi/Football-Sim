SPEAKER: vl | ROLE: council adviser | TASK: V23 game-preview page floaty prototype (KC Chiefs palette) — advisory prototype, disseminated to all seats | DATE: 2026-10-25T02:05Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c…`, 657,486 B) remains the verified base. This is V23-only.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-game-preview-kc-prototype.html` (~4 KB, self-contained static HTML, no images, rendered above).

## Prototype name
`queue5-game-preview-kc-prototype.html`

## Concept (V23 game preview page, Kansas City Chiefs palette)
Advisory visual prototype of the game-preview page (P8-g.1 matchup screen) in KC colors:
- Palette: KC red #E31837 (primary), white #FFFFFF (3rd), gold #FFB612 (2nd); ink #1A1718 for neutral text; **no grey anywhere**
- Header: infinite scrolling "20-0" marquee (two overlapping layers, opposite directions, different speeds) + static inline corner "20-0" home button (not a tall vertical pill, no panel around it, transparent header, no border-bottom)
- Hero: clean/empty — all hero text removed ("Season", "Playoffs", "Super Bowl", "20-0?"), no panels/bubbles/emojis; floaty entity icons (🏈 🏆 👑 20-0?) in KC red/gold
- Matchup header: team tags — KC Chiefs (red gradient fill, gold dot) vs SF 49ers (transparent bg, red hairline border, gold-deep dot)
- Matchup advantage meter: red-gold gradient fill bar (58% user / 42% opponent)
- 3 matchup cards (pass rush / run game / QB): team-colored stat OVR (red user / gold-deep opponent), red-gold progress bars, small team labels
- Narration placeholders: clutch / next-round hype / star praise — each with a colored dot (gold / red-deep / gold-deep), "emph" spans in red-deep
- "Start Draft": floats centered, red-gold gradient, no play arrow, shadow pulse
- Mobile: marquee + corner button + cards stack; tap targets ≥44px; `prefers-reduced-motion` respected

## Plug-in notes for Claude
Copy the `:root` KC token block and `header`/`.marquee`/`.track`/`.home`/`.matchup-header`/`.team-tag`/`.meter-card`/`.matchup-cards`/`.matchup-card`/`.narration`/`.narr-card`/`.startdraft`/`.float-text` CSS into V23's `<style>`; replace Pre-Colors header block (lines 317-321) and matchup-preview section (P8-g.1, `V22-Suggestions.md` P8-g.1 section) with this markup. Keep `prefers-reduced-motion`. No protected constants touched; cosmetic/UI only — SAFE ALONE = YES.

## Verification
- `wc -c` → ~4 KB (≤10 KB).
- Open in browser → marquee scrolls continuously; static corner "20-0" button clickable; hero empty; KC red/gold/white team tags; meter card with 58/42 split; 3 matchup cards with red-gold bars; narration cards with colored dots; "Start Draft" reads plain text and floats.
- Resize to 390 px → marquee continues, corner button inline (not vertical), cards stack, no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.
- Palette check: no grey (`#808080`-family) anywhere; KC red #E31837 / gold #FFB612 / white #FFFFFF only.

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl` (AGENTS.md §5 inbox/bulletin mechanism).
