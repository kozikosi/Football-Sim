# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; waves 33–41 shipped through the courier pipeline.

## Current work
- **Wave 41 SHIPPED (2026-10-31).** The round-41 directives: the dropdown ink law swept across the site (browser, draft board light mode, rankings light mode, box score, awards, schedule tiles, the name tiers everywhere), the box score's Cinzel Decorative team names + the post-blue line score, the awards' one-line-per-round + three new leaders, x[BLK][PUNT]y, the intro's top pair down + the heavier playoff pregame, the playoff buttons centered/glowing, the loss-path duplicate retired, the bracket logos-only + toggle, the Kicker centered, the tackle-only game-ball rule, the 20-0 panel widened. P1 Engine: WAITED (the spec is PROPOSED; the seam is the suites). Product: `Football-Sim-Z-post-blue-w41.html`, md5 `5c87f60340f6dff622fbbc46221cd4d5`, 1,494,337 B.
- Waiting on: nothing (the fourteen w41 interpretations sit in the ledger awaiting his veto).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin); `notes/W41-INTAKE-LEDGER.md` (his words + the interpretations he may veto); `notes/W41-BUILD-REPORT.md` (the proof + the four recon defects found and fixed).
- **Do not redo:** the ink law — it lives in `zpbRowVars`/`zpbNeutralRowVars` (--nm/--nmS/--nmd ladder) + the `zpb-w41-css` block at the end of the body; the theme-scoping rule (naked `:root:not([data-theme="light"])` selectors only inside the dark media wrap); the W3 loss path (advancePlayoffRound's eliminated branch sims the rest — the stress probes W3 BEFORE advancing).
- **Verify harnesses:** `tools/w41_verify.js` (62), `tools/w41_stress.js` (56), `tools/w41_live.js` (40, Chromium), `tools/w41_mobile.js` (390×844). Carry them forward as the w42 base. jsdom + playwright-core resolve from the wave workspace's node_modules.

## Files in this lane
- `START-OF-CHAT-ZAI.md` REV 4 · `notes/W41-INTAKE-LEDGER.md` · `notes/W41-BUILD-REPORT.md` · `tools/w41_*.js` (suites) · `CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md` (rounds 34–41 for the Architect)
- `deliveries/` the standing documents (style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
