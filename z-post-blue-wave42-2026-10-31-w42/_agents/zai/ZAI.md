# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; waves 33–42 shipped through the courier pipeline.

## Current work
- **Wave 42 SHIPPED (2026-10-31).** The round-42 directives: the ONE-INK law (the homepage dropdown's dark-mode team ink is the ONLY team-scoped text ink in the project, in BOTH themes — the browser, the rankings, the board, the box score, the schedule, the standings, the depth charts, the All-Pro honors and the All-Playoff team off the vivid vars; the light-mode dropdown reads the dark ink, white-on-white by his own design), the look-gate (the draft review's positions and the WHERE YOUR PLAYERS LINE UP? map enter when the user LOOKS at them; the cinematic skip releases everything, even gates caught behind the veil; the 26s beat tail compresses to ~4s), the VS. ACTUAL NFL TEAMS tab swept (draft review only, enforced after every render), the Super Bowl winner cinematic mounting in the SAME paint as the page (the 450ms flash window is gone). Product: `Football-Sim-Z-post-blue-w42.html`, md5 `94474a4d636cdd0a209824f661e876f6`, 1,500,122 B.
- Waiting on: nothing (the five w42 interpretations sit in the ledger awaiting his veto).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin); `notes/W42-INTAKE-LEDGER.md` (his words + the interpretations he may veto); `notes/W42-BUILD-REPORT.md` (the proof + the deliberate spares).
- **Do not redo:** the ONE-INK law — it lives in `zpbRowVars`/`zpbNeutralRowVars` (every text token from `txd`) + the dropdown builder's `--zaL` + the `zpb-w42-css` straggler lines at the end of the body; the look-gate — the `zpb-w42` script block (`zpbWireLookIn` / `zpbReleaseLookGate` / `zpbSweepNflTab`, the `.zpb-seen` CSS, the `--dfc-cine` var); a fresh draft resets `_zpbFinDone` so the opening cinematic re-runs and the gate holds for it (the w37 union — do not "fix" it).
- **Verify harnesses:** `tools/w42_verify.js` (47), `tools/w42_stress.js` (52), `tools/w42_live.js` (27, Chromium). jsdom + playwright-core resolve from the wave workspace's node_modules. The site BOOTS DARK — light drills need explicit `data-theme="light"`; jsdom does not serialize CSSOM-set custom properties through `getAttribute('style')` — read them with `el.style.getPropertyValue`.
- The w41 carried suite scores 58/62 against the w42 bytes — the four fails are the superseded per-theme ink mechanics (intended replacements; see the build report).

## Files in this lane
- `START-OF-CHAT-ZAI.md` REV 5 · `notes/W42-INTAKE-LEDGER.md` · `notes/W42-BUILD-REPORT.md` · `notes/evidence/` (the wave-42 screenshots) · `tools/w42_*.js` (suites) · `CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md` (rounds 34–41 for the Architect — rounds 42 deltas live in this package's UPDATE-README)
- `deliveries/` the standing documents (style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
