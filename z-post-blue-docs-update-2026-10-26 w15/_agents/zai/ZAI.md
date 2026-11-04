# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs`.
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** Z-post-blue prototype (12 waves; verify suites v8..v11); waves 13/13b (20-item round + workflow); wave 14 (cinematic rebuild + kickoff gate); wave 15 (15-item fix-list round, instant Skip, intro star acts, vanish root-cause).

## Current work
- **Wave 15 SHIPPED (26 Oct, fix-list round):** all 14 Owner items actioned — heading renamed to YOUR MOST VALUABLE POSITIONS; cinematic stretched to the Owner's beats (WELCOME alone ~3 s / rest ~3 s / rise 3.6 s / linger 3 s / fade 2.4 s; CPU still gated on DRAFT's fade) and **saved separately** in `deliveries/CINEMATIC-WELCOME-SPEC.md`; game Skip = instantly sims the rest (flushes all remaining plays, exact final score, full log, Continue exits); `LV @ KC` always `@`; playoff/SB intros now 8.5 s / 11.5 s content acts highlighting each side's best 2 players on their own side (30 s/60 s dead waits gone); extra SIM PLAYOFFS button after elimination removed; MODEL · ALL SLOTS entry removed; **vanishing-players ROOT CAUSE fixed** (scroll-fade was opacity-0 + 4.2 s + toggled off on scroll-away → now add-only/1.6 s/first-pixel); key-players grid back to 2 columns; comparison headline scores in team colors; dark accents brightened on the game panel (Chicago #0b162a → #8a8f99); every turnover line names players (up to three: fumbled/forced/recovered). Product: `Football-Sim-Z-post-blue.html` md5 `71b31da8e931ed65b54f2d30a5ef0d7a` · 1,254,062 B. Suite `v15_verify.js`: 31/31 PASS. Council questions broadcast: `inbox/zai-questions-2026-10-26.md` (Q1 series-vs-Position-Rankings math conflict needs an Owner decision; Q2 tkQ side convention audit; Q3 mobile fade verification; Q4 dash-cell representation).
- **Queued (Owner directives, still open):** guide flex-math table (Owner's exact Free/−2/−4/−6 data, ledger §G) with Gold→medium-wine cascade (existing palette only); position station map (no job sentences); OFFENSIVE TACKLE naming; flex math recorded in other docs; QB-series relocation per Q1 outcome; board team-filter P0-1 patches (staged); mobile-first pass.

## What the next session needs
- **Read first:** this file → `START-OF-CHAT-ZAI.md` §3 → `inbox/zai-questions-2026-10-26.md` (council answers?) → ledger §G+§H.
- **Build chain:** `python3 _agents/zai/tools/zpb_v15.py <wave14-source-html> <out.html>` (wave-14 source md5 `413c2d8e…`); verify `node _agents/zai/tools/v15_verify.js` (+ `v15_probe.js` for ad-hoc DOM probes). Playwright constants point at `/home/z/my-project/out-v15/`.
- **The cinematic is PINNED:** `deliveries/CINEMATIC-WELCOME-SPEC.md` — restore from there if any build drifts. Never re-derive it.

## Do not redo
- Baseline identity (`notes/BASELINE-VERIFICATION.md`); line-3 selector (display artifact).
- **Wave-14 lessons:** (CSS) an equal-specificity later rule silently wins — the explicit `.zpb-fin.zpb-fin-welcome p.zpb-fin-in{opacity:1}` is required or the cinematic text renders invisible; (init order) a cinematic callback must never run synchronously inside `startDraft2` before `draftSim` exists — `fire()` is async on purpose.
- **Wave-15 lessons:** (vanish) any opacity-0-initial + scroll-toggled system WILL read as "players disappear" — fades must be add-only; (test order) read elements only after the state that creates them exists (badge probe during a 5 s intro found nothing); (replay) `cursor` + shared `renderStep` is what makes Skip = instant sim — keep both if you touch `runEvents`.
- "Save my weights" (3-state gating) and the new-season-same-roster button: Owner-approved, do not touch.

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 15, style guide, playbook, reweight brief, governance, wisdom, build report, start-here, intake ledger copy, **CINEMATIC-WELCOME-SPEC.md**)
- `tools/` build scripts (`zpb_v10.py`..`zpb_v15.py`), verify suites (`v8`..`v15_verify.js`, `v15_probe.js`), logo scripts
- `builds/` Z-post-blue HTML baselines (NOT product builds; pins in `BASELINES.md`)
- `docs-update-2026-10-26/` the CURRENT push package (wave-15 product, workflow trio, ledger §G+§H, tools, evidence, `inbox/` questions)
- `notes/` prompts, corrections, worklog

## Rules that changed since REV 13
- No V23 naming in Z files; no bulletin M-ids, no QUESTIONS file, no task ledger — open questions go to top-level `inbox/` (see `inbox/README.md`).
- `END-OF-CHAT-ZAI.md` is law: every chat ends with the verified zip, links-first reply, seat-save block, exact last line.
