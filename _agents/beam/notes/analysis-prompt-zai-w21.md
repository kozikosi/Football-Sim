# Prompt to Z.ai — w21 bug analysis request

You are Z.ai, High Councillor of Z-post-blue. Bootstrap yourself: clone https://github.com/kozikosi/Football-Sim shallow and read _agents/zai/START-OF-CHAT-ZAI.md from origin/council/zai. w21 is your latest pushed build (commit 2bb0016e on council/zai; local file Football-Sim-Z-post-blue-w21.html).

## What Beam found (static analysis of w21, 1.32 MB, 10858 lines)

1. Syntax: `node --check` on the extracted inline script PASSES. No parse errors.
2. No `NaN` or `undefined`-string renders detected in the script text.
3. Console: only two `console.warn` sites (draft watchdog + draft tick error) — no swallowed errors beyond those.
4. Draft flow: `buildSnakeOrder` (26 rounds × 32 teams = 832 picks) looks correct. `processUntilUserTurn` and `stepSlow` both handle the user turn. `simRecs()` now runs on every render (w19 Owner change) — this is expensive but structurally fine.
5. `boardEntries()` → `mkEntry()` populates `pri`, `gone`, `score`. The table render at l.3199 reads `r.pri` and `r.gone`. So priority/gone should display IF `sim` is non-null. `simRecs()` returns a sim whenever there are open slots. If `sim` is null, pri/gone show "—"/"—". Check whether `simRecs()` ever returns null in practice (it returns `{pos, trials, c0, fm, later, gap}` whenever open>=0; trials=[] if no next user pick).
6. `renderDraftLive()` sets `draftStatusText` to '' (Owner retired the on-the-clock text) and updates `zpbNextPick`. The "ticker not moving" might be because the ticker element id changed or was removed.

## Likely bug areas to investigate in a browser
- Priority/gone columns showing "—" for every row → `sim` is null or `sim.later` is all zero. Check `simRecs()` return value in console during a live draft.
- Draft selection ticker not advancing → check `draftSim.pos` increments in `executePick`; check `processUntilUserTurn` loop termination (`pos < order.length`).
- Picks out of order → check `buildSnakeOrder` reverse on odd rounds and that `userIndex` is set correctly in `startDraft2`.
- DIME in a weird box with "—" → search for "DIME" rendering; likely a CSS box around a missing flex calc.
- Players dropping from panels → likely a re-render race; check `renderDraftBoard2` try/catch (it has a fallback board).

## Style violations Beam noticed (for correction)
- `color: #fff` still appears in CSS (confetti, champion stepper, wp-home, round-tag) — violates the no-white-text rule. Replace with `var(--text)` or a palette tint.
- `#fff8e1`, `#fff0f0`, `#ffad37` near-white/orange backgrounds in the 100-season correlation bars and grade badges.
- `#3a2600` on the champion stepper (dark brown) — use `var(--text)`.

## What I could not verify without a browser
- Runtime null dereferences, layout overflow at 390 px, animation timing, and the actual "players gone" rendering. Please run the build in a browser, open devtools, and report the console errors and the specific panel where players vanish.

## Suggested fix order
1. Reproduce the draft deadlock (priority/gone "—", ticker stuck) in devtools; log `draftSim.pos`, `draftSim.awaitingUser`, and `simRecs()` return.
2. Fix the no-op Skip button (wire to cancel timers + synchronous resolve).
3. Brighten dark team colours on the replay panel (Chicago etc.).
4. Sweep `#fff`/near-white out of CSS.
