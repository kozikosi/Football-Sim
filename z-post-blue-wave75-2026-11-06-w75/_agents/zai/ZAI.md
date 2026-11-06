# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026). Architect and builder of Z-post-blue; since w72 also the execution lead on the Colors rebuild's volume/verification/tooling — never engine math, never contract design.
- **How its work reaches GitHub:** the sandbox can read GitHub but never push; **the push is the end-of-chat zip**, relayed by the Owner (or Beam via `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…` on `council/zai`).

## Current work
- **Wave 75 SHIPPED (6 Nov 2026) — the Owner's full w73 review as the final shell wave before the 76 Pancakes transition.** Product: `Football-Sim-Z-post-blue-w75.html` · md5 `9f990ab74fb0acba9e55b82395e60647` · 1,826,882 B (base: the latest wave with a product HTML on gh-pages = w73 `8b72bf72…`, re-verified; w74 shipped docs/lab only).
- The sixteen Owner asks shipped whole: the filled selected chip (both themes) · the chip law rebuilt (buttons off initially, board full; on = on, off = off, all off = full) · the four preseason headers plain like the reference · 2 point conversion (preseason + guide; in-season labels kept) · (x teams run it) removed · SIM SEASON = SIM GAME neutrals · no dark pregame player cards in light mode (the W68 gradient swapped for the site wash; dark untouched) · the box score wears the score's border · the 0.60 award-ink preset (`txM60`/`--nm60`, light only) · the per-round playoff cinematics recovered on the SIM PLAYOFFS door (the storm waits for the last Continue) · DRAFT COMMAND CENTER (every room below B best→worst as small report cards, no gauges; CUTDOWN DAY with the three-line cut list and the pulsing CUT badge) · the rating display scale translated (median OVR of the database = 76 centered; backend math untouched) · BACK TO <STAGE> top and bottom of the five footer pages · the guide ladder at all 32 slots (TE3, DIME, WR4, DL5) · OFFENSIVE GUARD everywhere a name label speaks · the fills read `x (-y)` with no FLEX word and no side scroll (measured at 1280/390).
- Proof: **134 pass / 0 fail** (w75 battery 65 · w69 owner 33 · w69 dropdowns 14 · w68 names 14 · w67 teams 8), zero page errors, 25 script blocks node-checked, md5 pinned. Muse's w75 items answered in `20261106-zai-answers-to-muse-w75.md` (M1/M6/M7/M9/M11/M14 answered; M2–M5/M8 blocked one line each with pre-registrations).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (REV 18) → the w75 intake ledger (`20261106-w75-intake-ledger.md`) → the w75 build report.
- The Owner owes: the veto points in the intake ledger (the slot-picker `−10 FLEX` chip, the cutdown games floor, the scale's translation door).
- The Colors track owes: nothing from this seat until the freeze; the Lab pre-registrations (M2–M5) wait for a runnable harness.

## Do not redo
- The baseline identity (`notes/BASELINE-VERIFICATION.md`), the line-3 selector, the w73 soloBase machine (retired in w75 — the chip law is the toggle model now), the W68 dark pregame gradient (it STAYS in dark mode; only light swaps).

## Files in this lane
- `deliveries/` style guide, playbook, handoff, wisdom · `tools/` build + verify suites (now including the w75 chain) · `builds/` early prototypes (pins in BASELINES.md) · `notes/` worklog · wave packages live on gh-pages as `z-post-blue-wave<N>-<date>-w<N>/`.

## Rules that changed since REV 17
- The chip law: the initial all-lit board is NO LONGER law — buttons off, board full (Owner, w75).
- The rating DISPLAY scale: never show a raw `_rating` to the user; ride `zpbDR` (median-centered integers).
- Light mode: no dark panels in the game cinematics' player cards; the award names ride `--nm60`.
- Every footer page carries BACK TO <STAGE> top and bottom while the simulator has started.
- The fills never print the word FLEX; the draft board must never side-scroll (measured, not guessed).
