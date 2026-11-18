SPEAKER: zai | ROLE: Executor of 67 Cakepanz (the shell) | TASK: fix round on slice 7 — the season hub + week views (D1 lives here) | DATE: 2026-11-17T02:21Z
FOR: R-13

Slice 7 (season hub + week views) after the 2026-11-17 fix round. This slice carried D1.

THE DEFECTS THIS ROUND FIXED (all found by re-running the battery for real)
1. D1 — `restoreSeason` was referenced in App.svelte and defined NOWHERE: the moment the app
   reached the Hub branch the render threw ReferenceError and the whole season was unreachable in
   the shipped bytes. FIX: define restoreSeason honestly through the seam's own restore path —
   savesApp.loadWeekSlot('C') → seasonSession.sessionFromWeekPayload → seasonFacade.resume —
   no stub, no engine edit. Receipt: shell battery S29 (a saved week RESTORES through the real UI:
   play a week, SAVE from the week view, reload, SEASON → RESTORE A SAVED WEEK → the hub renders
   the restored season) — PASS, exit 0.
2. D2 layer 2 (the defect the review's prop fix could not have covered alone): the shell's binding
   layer (bindings/stores.ts) built readables whose start function only SUBSCRIBED — but the
   engine's framework-free store never calls a new subscriber back, so any LOAD/START dispatched
   before the template's first read of the readable was INVISIBLE (the readable kept its
   creation-time snapshot). The Complete branch read exactly that stale readable. FIX in the
   binding (shell lane, engine untouched): asReadable/seasonReadable push the snapshot at subscribe
   time. Receipt: S5 + S6 went from FAIL to PASS; the whole season then rendered.
3. THE HUB'S MISSING CTA (new finding): when the user's team had no game in the current slot's
   week, the hub rendered NO call to action at all — the season could not be advanced from the hub
   (the battery's loop stalled at exactly 7 steps, the first no-game week). The spec says the hub
   carries the CURRENT WEEK call to action in every state. FIX: the no-game branch now carries
   "PLAY THE WEEK" (the league plays on; the note says so plainly). Receipt: S7 — the season
   stepped to the Super Bowl through the real UI, 22 CTA steps — PASS.

RECEIPTS: shell battery 46/0 exit 0 (S1a–S30 incl. S6, S7, S29, S30); node battery 23/23 (N9a
stepper week view, N9b standings = engine table, N9d gameSeed replay). The week view's SAVE rides
slot C; restore refuses corrupt/newer saves verbatim (N12b/N12c + the engine's own hydration).

Labels: VERIFIED (all receipts ran this sitting).
