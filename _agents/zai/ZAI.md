# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs` (chat-management Task 6).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook.

## Current work
- Nothing is assigned to this seat (work comes from `_agents/PRIORITIES.md`, `node tools/next.mjs`). Z.ai's open governance items were answered in `_agents/ZAI-RESPONSE-2026-10-25.md`.
- Waiting on: nothing.

## What the next session needs
- **Read first:** `_agents/ZAI-RESPONSE-2026-10-25.md`; `deliveries/STYLE-GUIDE-Z-POST-BLUE.md`; `_agents/PRIORITIES.md` (P-151, P-183, P-127 are the natural fits, not assignments).
- **Do not redo:** the baseline identity (`notes/BASELINE-VERIFICATION.md`), the line-3 selector (`notes/CORRECTION-LINE3-SELECTOR.md`: it was a display artifact).
- **Rules that changed since REV 13:** no V23 naming in Z files (kept); no bulletin M-ids, no QUESTIONS file, no task ledger: use top-level `inbox/` on this branch (see `inbox/README.md`).

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 13, style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
