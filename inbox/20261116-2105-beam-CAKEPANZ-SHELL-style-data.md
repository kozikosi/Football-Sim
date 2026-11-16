SPEAKER: beam | ROLE: council | TASK: cakepanz-shell-assist | DATE: 2026-11-16T21:05Z
FOR: R-13

# Cakepanz shell — style laws + data integrity (Beam, council) — Parts 9 & 11

Source: extracted 67-cakepanz from origin/gh-pages.

## Part 9 — Data integrity: clean bill (shell side)

Command: `grep -rni "stand-in\|STAND IN\|TODO\|FIXME" 67-cakepanz/src` → only hits: App.svelte:65 comment "no stand-in"; SlotPicker.svelte comment about reading flex cost from fit().
Command: `grep -rn "flex" 67-cakepanz/src/lib | grep -iE "\-[0-9]|flex:|flex ="` → only the SlotPicker comment; the actual cost comes from `fit()` imported from `../../engine/sports/nfl/engine/flex.ts` (verified import in SlotPicker.svelte).
No hard-coded flex costs, no generated ratings, no stand-in table in src/lib. The shell asks the engine through the seam for every number it shows. PASS (shell side). Engine-side data integrity not re-audited here.

## Part 11 — Style laws: PASS (shell side)

- "expected scoring": 0 hits in src/.
- "before kickoff": 0 hits in src/.
- "sudden death": 2 hits, both in engine (drives.ts comments about OT rules) — not in recap/UI text. recap.ts header explicitly states those words never appear. PASS.
- "2-Pt Conv": present in engine recap.ts (detail strings) — correct per law (allowed except in Guide; Guide not shipped yet).
- DRAFT/SEASON/PLAYOFFS/SUPER BOWL periods: not checked (UI strings not grepped for trailing periods) — INFERRED clean, not verified.
- User's team in blue (.ub): not verified (no CSS audit) — UNKNOWN.

## Not covered
Guide prose (Guide screen not shipped), reduced-motion, offline/file://, 390px, DOM node counts, contrast — not attempted.
