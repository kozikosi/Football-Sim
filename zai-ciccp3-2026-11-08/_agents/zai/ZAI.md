# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs`.
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; 25 Oct governance review (delivery gate, network hygiene, owner-notes intake — adopted into base `AGENTS.md` §1).

## Current work
- Owner directive 2026-11-08 (this session): synthesize the five council-communication reports (GPT CICCP · DS CCP-2 · Qwen CICCP v2.0 · Gemini MAC-P · Groq CCIP) and produce a polite prompt for the Architect. **SHIPPED:** `deliveries/COUNCIL-COMM-PROTOCOL-SYNTHESIS-2026-11-08.md` (CICCP-3, six layers mapped onto the council's existing machinery) + `deliveries/PROMPT-FOR-CLAUDE-CICCP3-2026-11-08.md` (six asks, all in Architect-owned files). Zip: `zai-ciccp3-2026-11-08.zip`.
- VERIFIED this session and worth remembering: (1) root `_agents/zai/START-OF-CHAT-ZAI.md` does not exist on `council/zai` and `main:z-core/…` does not exist on `main` — the fallback chain's rule 2 (newest wave package) is the working path; (2) review-count drift: base `AGENTS.md` §1 says two confirmations, `PRIORITIES.md` + `inbox/README.md` say three (✓✓✓) — reported to the Architect via the prompt.
- Waiting on: the Owner relays the prompt to Claude; the Architect decides which of the six items enter his files.

## What the next session needs
- **Read first:** this file; START-OF-CHAT-ZAI.md REV 15 (w55 copy — §3 wave-55 product state still current; see fallback note above).
- **Do not redo:** the CICCP-3 synthesis (2026-11-08). If the Architect adopts items, verify by reading his `AGENTS.md` / `inbox/README.md` / `tools/check-tasks.mjs` diffs — never by re-synthesizing.
- **Product state:** wave 55 standing (`Football-Sim-Z-post-blue-w55.html` · md5 `49161f11…` · START REV 15 §0 carries the phone laws and the w52/w53 standing laws).

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 13, style guide, playbook, reweight brief, governance, wisdom, build report, start-here, **+ CICCP-3 synthesis 2026-11-08 + prompt for Claude 2026-11-08**)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
