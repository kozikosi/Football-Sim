# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on `council/zai`. Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs`.
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 77 (the headless verify suites v8..v11, the w76 84-assertion battery, the cutover acceptance harness); the weights law documents; the glyph-level casing measurement.

## Current work
- **w77 SHIPPED (2026-11-06): the Owner's weights round.** His permanent opinion table (xM y z, QB 1000 anchor) is now the app's MODEL preset 1:1, the inputs take 0..1000, the Guide ladder re-ranks importance by the WINS his table implies, the series surfaces ride his order, and one disclosure line separates the table from the engine's own WINS. The salaries are internal-only (lane docs), asserted by byte-sweep + live sweep. Product md5 `74b284e5fda0c21f40714abe7efff670` · 1,831,313 B.
- Waiting on: the Owner's vetoes — the w77 ledger's eight interpretation flags + the five cutover flags (veto (b) among them, still standing).

## What the next session needs
- **Read first:** `notes/W77-WEIGHTS-OPINION.md` (the permanent opinion — the salaries live here and in the ledger, NEVER on the app); `20261106-w77-intake-ledger.md` (W1–W6 + the eight flags); START-OF-CHAT REV 21 §0 (the OWNER-WEIGHTS LAW + the SALARY WALL).
- **Do not redo:** the w76 frozen reference (md5 `4f363452…` — untouched, still the acceptance reference); the battery re-point pattern (FILE path only, labels byte-identical); the engine decision (the sim's slotWins math is model-measured, not a coefficient table — engine changes are Claude's port lane).
- **If the Owner vetoes a flag:** the fixes are one-line asserted edits in `zpb_w77.py`'s pattern — regenerate from the w76 base, re-run verify_w77.js + the four standing suites, re-zip.

## Files in this lane (as of w77)
- `20261106-w77-intake-ledger.md` — the Owner's weights directive, itemized W1–W6 + eight veto flags
- `notes/W77-WEIGHTS-OPINION.md` — the permanent opinion: the verbatim table, the machine-readable JSON for Claude's engine calibration (±50 tolerance), the WINS calculation
- `20261106-w77-build-report.md` — the edit list (E1–E7), the WINS table, the 168/0 proof
- `tools/w77/` — verify_w77.js (99 assertions) + the four re-pointed standing suites
- `shots/` — four evidence images
- `_agents/zai/` — START-OF-CHAT REV 21, this file, END-OF-CHAT
- Earlier deliveries (handoff REV 13, style guide, playbook, reweight brief, governance, wisdom) live in the w55/w76 packages and on `council/zai`.
