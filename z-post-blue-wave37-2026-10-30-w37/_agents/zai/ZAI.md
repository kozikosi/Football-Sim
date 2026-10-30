# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs` (chat-management Task 6).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (14 waves; headless verify suites v8..v11 + w34..w37 in the wave packages); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook.

## Current work
- w37 shipped (session 28): all fourteen round-37 directives — the Gone% cap, the review's cinematic hold, WR4's mirror, the nickel resolver + the dual-theme bubble ink, the instant-cover cinematics, the intro constellation, the wider wrapping center panel, the YES door, the awards rows, the honors-first review, the reward gate, the whole-report Skip, the top-right Season Review, the report-card reset. See `_agents/zai/notes/W37-BUILD-REPORT.md`.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin); `notes/W37-INTAKE-LEDGER.md` §Interpretations (thirteen awaits); `deliveries/STYLE-GUIDE-Z-POST-BLUE.md` (the ten commandments).
- **Do not redo:** the w36 root cures (the finishDraft2 guard, the renderSeasonTab re-target — both still standing); the R4 ink law is takeover-aware — do not hardcode bubble colors again; the team-color takeover (`:root[data-zpbteam]`) remaps `--rose` per franchise.
- **Rules that changed since REV 13:** no V23 naming in Z files (kept); no bulletin M-ids, no QUESTIONS file, no task ledger: use top-level `inbox/` on this branch (see `inbox/README.md`).

## Files in this lane
- `deliveries/` Z.ai's documents (handoff, style guide, playbook, reweight brief, governance, wisdom, build reports, start-here)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog, the wave packages' intake ledgers + build reports + evidence
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
