# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git push and no access to the Owner's machine**; work reaches GitHub as an end-of-chat zip the Owner relays (Beam: `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…` here on `council/zai`; or scribe saves the `=== FILE ===` block via `tools/seat-save.mjs zai`). · **State:** **High Councillor** (Owner, 24 Oct 2026).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** Z-post-blue single-file product, 13 waves (headless verify suites v8…v13 in lane `tools/`); FB/Punter slot-wins math (REWEIGHT-BRIEF §7b); style guide, Owner playbook, governance R-ZAI-1…9.

## Current work
- **Wave 13 SHIPPED** — product `Football-Sim-Z-post-blue.html` · **md5 `0cef8bf7a5646bd283c1b687bf740e5c`** · 1,247,161 B: W13-1…20 (rankings series dropdown, real 3-4 personnel swap **+ spec-cache defect fix**, weights 3-state gating, draft/final cinematics, compression guards, integer yardage, POTG secondary-color restyle, pick-analysis tiers incl. `Giveaway`, neutral real-team rosters, leaders/lineup menus, flex-rules tree, package badges, season-review dedupe, report bubbles, preview-strip dedupe). Suites v13+v10+v11+v11-B ALL PASS, zero console errors.
- **Wave 13b (this chat):** built the **workflow pathway** the Owner ordered — `_agents/zai/START-OF-CHAT-ZAI.md` (60-second sandbox orientation + LAST-KNOWN-STATE pin), `_agents/zai/END-OF-CHAT-ZAI.md` (end-of-chat law: lane rewrite, state pin, **zip of everything edited**, seat-save block, links-first reply), this lane file rewritten. Restored 12 docs + 23 tools to the local lane after a sandbox reset. Handoff header → REV 15 (§0f existed; header was stale).
- **Queue: EMPTY** — intake ledger `_agents/OWNER-ROUND-8-INTAKE.md` §A–§F accounts for every Owner line (Rounds 6/7/8 + W13). Awaiting next intake.

## What the next session needs
1. `_agents/zai/START-OF-CHAT-ZAI.md` **§3 LAST-KNOWN-STATE** (the fresh md5/wave/queue — outranks everything)
2. This file, § "What the next session needs" (you are reading it — good)
3. `_agents/OWNER-ROUND-8-INTAKE.md` §F + the 4 veto-flagged interpretations (the Owner may re-cut any of them)

## Do not redo
- Baseline identity (`notes/BASELINE-VERIFICATION.md`), line-3 selector (display artifact, `notes/CORRECTION-LINE3-SELECTOR.md`).
- Rounds 6/7/8 items — shipped and suite-verified; ledger §A–§C + §F is the map.
- `main:z-core/01-html/…` md5 will read `49ea6f05…` (wave-11b) until the Owner pushes the newer zip — that copy is STALE, not a regression.

## Files in this lane (as imported to `council/zai`; newest set in the Owner's latest `z-post-blue-docs-update-2026-10-26.zip`)
- `deliveries/` handoff (REV 15), intake ledger, style guide, playbook, wisdom, governance, reweight brief (REV 2), package index, build report (§18), palette advisory, CLAUDE-START-HERE
- `tools/` zpb_v13.py (current patch builder) + full chain (zpostblue_build, w12_build, css/js payloads, v13/v11b/v11/v10/v9/v8 verify suites, logo fetchers, drift-audit.sh)
- **New this session:** `START-OF-CHAT-ZAI.md`, `END-OF-CHAT-ZAI.md` (this trio = the workflow pathway)

## Rules that changed / reminders
- No V23 naming in Z files (kept); no bulletin M-ids, no QUESTIONS file, no task ledger → use top-level `inbox/` on this branch (`inbox/README.md`).
- Owner's standing laws: verbatim words are law · delivery-first ("Ship link → then talk") · latest finished version linked in EVERY reply · end-of-chat zip of everything edited · 60 s stall limit on network git (`-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60`) · never `git push` from the sandbox (hangs; report `unpushed`).
