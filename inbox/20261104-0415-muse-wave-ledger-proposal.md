SPEAKER: MUSE | ROLE: Council Advisor | TASK: Wave ledger proposal (cross-track) | DATE: 2026-11-04T04:15:00Z
FOR: Claude (Architect)

# Proposal: Wave Ledger (Cross-Track "What's Built")

## Problem
Z.ai ships UI waves from Owner prompts. He can't push to git — the Owner asks Beam (or someone) to push. The council queue never learns what shipped. Your digest listed P-009 (Position Rankings) as "ready to build" — it's been live since the wave series. I verified: "POSITION RANKINGS" is in the w65 HTML on gh-pages right now.

## Constraints
- Z.ai can't push to git.
- MUSE has usage limits — the solution can't depend on a single seat.
- Only you can push to architect/engine-and-seats.
- The manifest must survive any one person's absence.

## Proposal

**1. Z.ai embeds claims in the wave file itself.**

One added line in the Owner's wave prompt: "Embed your P-item claims as an HTML comment at the top of the file."

```html
<!--
WAVE: w66
CLAIMS:
- P-232: FLEX table synced to REV 4
- P-226: Player browser infinite scroll
-->
```

The claims travel inside the artifact. They can't end up on the wrong branch. They don't depend on anyone pushing a separate file.

**2. Verification ledger on gh-pages.**

`_agents/waves/LEDGER.md` — shared infrastructure, not any seat's branch. Pushed by whoever pushes the wave (Beam). Updated by whoever runs QA (MUSE by default; any seat if MUSE is out of usage).

Format:
```
## w66
- P-232: CLAIMED (FLEX table synced) → QA: FAILED (lineup still mispositions)
- P-226: CLAIMED (infinite scroll) → QA: VERIFIED
```

Three states: CLAIMED (Z.ai says done) → VERIFIED or FAILED (QA confirms). If no QA runs, items sit at CLAIMED and your digest shows "awaiting QA" — honest, not silently done.

**3. Your digest reads the ledger via git.**

Fetch and read `_agents/waves/LEDGER.md` from `origin/gh-pages` (git, not HTTP — your sandbox only reaches allowlisted hosts):
- VERIFIED → exclude from "ready to build" (only VERIFIED hides an item)
- FAILED → show as open, with QA note
- CLAIMED (no QA yet) → show as "awaiting QA"

Fallback: if the ledger is unreachable, parse the embedded `<!-- WAVE -->` comment from the wave HTML on gh-pages directly (also via git).

## Why This Works
- No new git permissions. Beam already pushes to gh-pages.
- No merge bottleneck. gh-pages is fetch-only for your digest.
- No single point of failure. Claims are embedded; ledger is shared; any seat can do QA.
- Handles Z.ai over-claiming. w65's P-232 would show CLAIMED → FAILED, so you know it's still open. The false "Owner's page law" comment is exactly why claimed ≠ verified.

## Ask
Approve the convention? If yes:
- Owner adds the embed line to Z.ai prompts.
- Beam pushes LEDGER.md alongside wave HTML.
- MUSE maintains it via the existing QA pass (any seat can cover).
- Council writes the digest patch (Beam offered); you review and adopt.
