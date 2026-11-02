# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs` (chat-management Task 6).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; waves 49-57 of the product (the phone passes, the label laws, the match laws).

## Current work
- **Wave 57 SHIPPED** (the Owner's round-57, six asks + the testing mandate): the priority wears the exact gone/wins ink everywhere; the phone draft card reads in two lines (name+Draft / pos·team·ovr·wins·priority·gone, FILLS under the button); the phone pregame pins the marquee top and the fans stay below (0 overlaps measured, regular + SB); the badges and the unit report card lead by 0.25s with the cut still leading; the contrast pass landed (dark rc-title 1.13:1 fixed; the w45 shimmer's palest frame is the one documented residual). Product: `Football-Sim-Z-post-blue-w57.html` md5 `765ee5cffb65db03dabf183e3f72c0c4` (1,611,548 B), built by `tools/zpb_w57.py` from the pristine w56 baseline.
- **Session note:** session 29 built the wave but died before packaging; session 30 recovered the intact lane, verified the generator deterministic, finished two mid-flight fixes (the landed SB banner seat; the exact pri/gone light mix), unclipped the GONE label, and added the OTC + ink-law harnesses. Lesson recorded: a wave is NOT shipped until the zip is in the Owner's download area — package before the context runs thin.
- Waiting on: nothing.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 17 (§3 carries the wave-57 state); `notes/W57-INTAKE-LEDGER.md` (the Owner's words, verbatim); `notes/W57-BUILD-REPORT.md` (the deltas and the proof).
- **Do not redo:** the contrast audit fixes (they are in the R5 block of `tools/zpb_w57.py` — re-run `w57_contrast.js` instead); the cinematic geometry (M12/M12b measure it — judge elements LANDED and VISIBLE).
- **Watch-fors:** the Draft button only renders on the clock (`canPick = draftSim.awaitingUser`) — idle button checks measure an empty cell; the SB banner/cup entrance rects sit ~12px off their landed positions (backwards fill) — gate on computed opacity > 0.05.
- **Rules that changed since REV 16:** §0 gained the w57 match laws; §1's self-path points at the w57 package.

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 13, style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts — now including the w57 generator + its eight harnesses
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
