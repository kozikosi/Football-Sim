# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **IM chat only: no git push from the sandbox**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Alternatively the Owner pushes directly (he did: w27 + docs landed at 9c985f5).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built Z-post-blue waves 8–28; per-wave patch chains with asserted edits; headless suites (jsdom verify + stress, agent-browser screenshot evidence).

## Current work
- **WAVE 28 SHIPPED (session 20, 28 Oct 2026).** Product: `Football-Sim-Z-post-blue-w28.html` · md5 `84e1f8a8236d4c340bc99a1de1840651` · 1,356,317 B · built from w27 (`b2adf669…`, repo 9c985f5) via 47 asserted edits in 3 patch stages + 1 hotfix.
- W28 scope (Owner round 28): NFL-tab first-review-only gating; preview name-copy removal + season-rating order; replay turnover lines rewritten (one player per line, FF&FR combo, no "gives it up" — root cause was cross-wired takeaway queues); safeties carry two defenders; the badge law everywhere (C, RUSHY, PASSY, RECY, Y, SK/SKS, SAF, PRSS, TD/INT, C/RUSHY, FG x/y, KR/PR x/y); leaders trims + Raw-stat button + rating-explainer paragraph removed; FG-attempt stat added to the sim (scoreboard untouched); key-players MVP cross-team leak fixed (kicker-dup + wrong-team card); TEAM STATS paints open; panel titles capitalized; Guide Mike/Will/Sam + C; comparison verdict sentence removed; comparison opens on your biggest rival (32-team table, SIM team).
- **Verify (all green, final bytes):** `w28_verify.js` 55/55 · `w28_stress.js` 13/13 (full instant season, 3 replays, all TO lines named) · agent-browser screenshot evidence (10 shots) · zero console errors.

## What the next session needs
- **Wave naming law (Owner, round 28): every html/zip the chat delivers ENDS with `wX`; the next wave is w29.** Update this file and START-OF-CHAT §3 every end-of-chat.
- **Read first:** `_agents/zai/notes/W28-INTAKE-LEDGER.md` (every Owner line mapped + the 4 interpretations flagged for veto) and the build report next to it.
- **Build chain law:** never hand-edit; patch scripts with asserted exact replacements (`scripts/w28_patch*.py` pattern in the zip) + jsdom verify + stress + browser screenshots.
- **Watchdog patterns (learned this wave):** (1) a `// comment` appended INSIDE a template literal renders as text — put comments outside backticks; (2) display tooling eats `[m` sequences — trust real bytes via python probes, not terminal reads; (3) later `renderX = function` assignments override earlier function declarations — patch the LAST definition.
- **Do not redo:** the w27 fixes (Belong map, flex tree, Series dropdown, cinematic retiming, tier law) — all intact in w28.

## Files in this lane (as shipped in the w28 zip)
- `Football-Sim-Z-post-blue-w28.html` — the product (top level of the zip)
- `notes/W28-INTAKE-LEDGER.md`, `notes/W28-BUILD-REPORT.md`, `notes/evidence-*/` screenshots
- `tools/w28_patch.py`, `tools/w28_patch2.py`, `tools/w28_patch3.py`, `tools/w28_verify.js`, `tools/w28_stress.js`
- `START-OF-CHAT-ZAI.md` — §3 rewritten for session 20
