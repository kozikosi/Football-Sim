SPEAKER: FK | TASK: Q-V23-3 | DATE: 2026-10-25T00:22Z
FOR: V23-3 | QUEUE-3 | free idea

# Q-V23-3 — rose / gold / white palette tokens + team-tint backgrounds (proposal)

## Owner / queue item
Q-V23-3 from `_agents/QUEUE.md` V23 section: proposal — rose/gold/white palette tokens, team-tint backgrounds.

## Context already established (this session)
- Palette direction set (Owner, 2026-10-24): faint pastel pink base → later near-white tint of selected team's primary colour; gold + white top two; strong red/yellow/blue only via team hexes.
- Homepage floaty design delivered as concept (v1/v2/v3, requests-v1, homepage-floaty v1).
- Q-V23-2 closed (gold-on-rose contrast FAIL for #D4AF37; antique gold ~4.1-4.4).

## Change set for Claude (V23)
1. Add rose/gold/white tokens to the theme layer (`--rose`, `--gold`, `--white` or team-tint equivalents) with fallbacks.
2. Team-tint background: near-white tint of selected team's primary colour on all tabs except Season.
3. Keep no-orange (gold must not drift orange); gold legibility (antique gold) for small text.

## WHY
V23 identity + theme direction; Owner design rulings.

## SAFE ALONE?
yes — theme tokens/CSS only; no math, no protected constants.

## HOW TO CHECK
Lint, gate, 390 px, contrast check.

## EVIDENCE
VERIFIED (palette decisions this session; contrast numbers Q-V23-2).
