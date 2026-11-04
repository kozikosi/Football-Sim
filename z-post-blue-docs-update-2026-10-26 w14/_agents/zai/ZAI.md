# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs`.
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; verify suites v8..v11); waves 13/13b (20-item round + workflow); wave 14 (cinematic rebuild + CPU kickoff gate).

## Current work
- **Wave 14 SHIPPED (26 Oct, cinematic round):** the pre-draft welcome cinematic rebuilt to the Owner's spec — WELCOME / TO THE / DRAFT stacked dead center; "welcome to the" fades out together; DRAFT rises 2.6 s to the exact screen center; **the CPU kickoff is now GATED on the start of DRAFT's fade-out** (was: `processUntilUserTurn()` ran immediately behind the overlay at the end of `startDraft2`). One-shot latch (`_zpbKickStarted`) + async fire + fallbacks (missing cine / reduced-motion / sync throw). Product: `Football-Sim-Z-post-blue.html` md5 `413c2d8e74512f4fef6ca13b9b0241ff` · 1,249,177 B. Suite `tools/v14_verify.js`: 25/25 PASS (gate timing, single-chain proof, reduced-motion, mobile, zero console errors). Patch script `tools/zpb_v14.py` (4 asserted replacements, post-checked). Protected math untouched — UI/timing only.
- **Queued (Owner directives, not yet built):** QB series dropdown (`1 QB` → `5 QB + CB1 + DE1 + CB2 + WR1`) on the **Position Rankings page only** — remove from guide + Madden Rankings; guide flex-math table (Owner's exact Free/−2/−4/−6 data in ledger §G) with a one-way Gold→medium-wine cascade, existing palette only; minimal position station map (spots + abbreviations, NO job sentences); "OFFENSIVE TACKLE" naming everywhere; flex math recorded in other docs. Standing fixes: Team Comparison players not rendering, Madden Rankings blank, draft-board team-filter deadlock (P0-1: dead clear-pill + stale filter patches staged in chat notes), mobile-first pass.

## What the next session needs
- **Read first:** this file → `START-OF-CHAT-ZAI.md` §3 → `_agents/zai/docs-update-2026-10-26/_agents/zai/deliveries/OWNER-ROUND-8-INTAKE.md` §G (queue + the two cinematic interpretations the Owner can veto).
- **Build chain:** `python3 _agents/zai/tools/zpb_v14.py <wave13-source-html> <out.html>` (starts from the wave-13 md5 `0cef8bf7…` source); verify with `node _agents/zai/tools/v14_verify.js` (Playwright; needs `/home/z/my-project/out-v14/` paths — adjust `FILE`/`SHOT` constants).
- **P0-1 draft-board filter patches** are fully designed (Deepseek Patch 1 + 2 + hardening) in the prior chat's notes — apply them via a `zpb_v15.py` asserted-replacement script, never hand-edit.

## Do not redo
- Baseline identity (`notes/BASELINE-VERIFICATION.md`); line-3 selector (`notes/CORRECTION-LINE3-SELECTOR.md`: display artifact).
- **Wave-14 lesson (CSS):** `.zpb-fin p.zpb-fin-in{opacity:1}` ties in specificity with `.zpb-fin.zpb-fin-welcome p{opacity:0}` — a later equal-specificity rule silently wins and the cinematic text renders invisible; the explicit state rule `.zpb-fin.zpb-fin-welcome p.zpb-fin-in{opacity:1}` is REQUIRED. The suite caught it as "opacity 0,0,0".
- **Wave-14 lesson (init order):** never let a cinematic callback run synchronously inside `startDraft2` before `draftSim` exists — `fire()` is async on purpose.
- "Save my weights" (3-state gating) works — the Owner said so; do not touch it.

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 15, style guide, playbook, reweight brief, governance, wisdom, build report, start-here, intake ledger copy)
- `tools/` build scripts (`zpb_v10.py`..`zpb_v14.py`), CSS/JS parts, verify suites (`v8`..`v14_verify.js`), logo scripts
- `builds/` Z-post-blue HTML baselines (NOT product builds; pins in `BASELINES.md`)
- `docs-update-2026-10-26/` the CURRENT push package (wave-14 product, workflow trio, ledger §G, tools, evidence)
- `notes/` prompts, corrections, worklog

## Rules that changed since REV 13
- No V23 naming in Z files; no bulletin M-ids, no QUESTIONS file, no task ledger — use top-level `inbox/` on this branch (see `inbox/README.md`).
- `END-OF-CHAT-ZAI.md` is law: every chat ends with the verified zip, links-first reply, seat-save block, exact last line.
