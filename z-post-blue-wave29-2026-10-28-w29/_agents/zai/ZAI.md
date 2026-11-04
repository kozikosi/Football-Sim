# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built Z-post-blue through wave 29; per-wave jsdom verify suites, season stress sims and agent-browser evidence in `tools/`; intake ledgers that map every Owner line before building.

## Current work
- **Wave 29 shipped** (28 Oct 2026, session 21): `Football-Sim-Z-post-blue-w29.html` md5 7286495bce6eb3ec1af77dd50fba43cf, 1,360,583 B. Round-29 directives: the Where-they-line-up maps rebuilt on one shared grid (defense mirrored below the offense, WRs an extra bubble out, CBs directly across, nickel + dime in the slot gap); the Coaching section draws the Defense-section front cards via a shared kit (DT2 square, ILB2/SAM triangles, colors kept); "Squares are…" paragraph and the Coaching-Philosophy Auto sentence removed; Reading the Draft Board rewritten and centered with boxed [WINS]/[PRIORITY]/[GONE] titles and the verbatim Wins/Priority/Gone/linebacker texts; CPU DRAFT STRATEGY and UNDO panels; **Undo is available every round, once per round** (`draftSim.undoUsedRound`); the game-plan math panel retitled OFFENSE/DEFENSE, balanced first in every section, R+/P+ badges, five verbatim text rewrites; the Team Comparison dropdowns read team nicknames ("Chiefs") with the full name at maximum width and Team B right-aligned; every comparison player sits on a backing panel (a ::before, so 90+ shimmer survives) with the highlighted border reserved for 85+.
- Verified: w29_verify.js 78/78, w28 regression 55/55, season stress 13/13, zero console errors, 9 evidence screenshots.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the anti-amnesia block) and `notes/W29-INTAKE-LEDGER.md` (5 interpretations awaiting veto).
- **Baseline:** w29 (md5 7286495b…). Next wave = **w30**; every html/zip the Owner receives ENDS with the wave tag.
- Verify chain to re-run: `tools/w29_verify.js` (rename product path), w28 suites as regression (`w29_reg28.js`, `w29_stress.js`), then agent-browser screenshots into `notes/evidence/`.
- Known shared kit: `window.zpbDefFrontKit()` builds the 4-3/3-4/NICKEL/DIME front cards for BOTH the Defense section and the Coaching section — do not fork it again.
- **Do not redo:** the w28 sim touches (fga stat, two-defender safeties), the w27 shimmer/bold law, the belong-map grid (w29).
- Rules that still hold: Owner's words verbatim; integers only; no white text; one shimmer; Cinzel Decorative; explanations live in the Guide; no partial words in dropdown faces; the win edge is color, never bold.

## Files in this lane
- `deliveries/` style guide, playbook, reweight brief, handoffs
- `tools/` per-wave build + verify chains (w29_patch*.py, w29_verify.js, w29_stress.js)
- `builds/` pinned Z-post-blue HTML copies (NOT product builds; pins in `BASELINES.md`)
- `notes/` intake ledgers, evidence screenshots, worklog
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
