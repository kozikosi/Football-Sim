# W36 BUILD REPORT — Z.ai · session 27 (web chat) · 2026-10-30

## Product
`Football-Sim-Z-post-blue-w36.html` · md5 `d0e06392e359ec0dd95caf95a918852d` · 1,448,116 B — built on the **w34 SECOND-ship package bytes** (`6468c1edb86ab008e45e000572df6930`, 1,447,501 B — CHECKSUMS-verified before the first cut). That second ship is the file the Owner renamed **w35**; the first ship is his **w34**.

## The reconciliation (his first demand)
- **w34** = the round-34 first ship (R1–R7). **w35** = the round-34 second ship (R1–R11 + three stress-caught latent fixes), cumulative on the first by construction: w33 + `w34_patch1..13`, every patch an asserted exact-match stage.
- Proof of no loss: the w34 verify suite (88 assertions) still asserts every R1–R7 directive on the final bytes and passed. **Verdict: the best of the two IS the w35 bytes — w36 starts from them byte-identical.** Nothing needed merging back.
- Naming law: every file this wave ships as **w36**.

## Chain (five asserted stages, all in `_agents/zai/tools/`)
w35 → `w36_patch1` (**R3+R5 root cures**: the `finishDraft2` re-entry guard + its `startDraft2` reset · the `renderSeasonTab` dead-container re-target — the chokepoint every season render passes · the big SEASON button re-queries the live body after `startSeason` · the review's SEASON tab starts the season when none exists · the begin-season wiring null-guarded) →
`w36_patch2` (**R1**: the belong map wears `zpb-fm-wide` — `max-width:none; width:100%` — plus the w36 CSS payload; the YOUR ROSTER tab leads with `WHERE YOUR PLAYERS LINE UP?` + the map in BOTH of its states, with the pick-order register set first and the two-way highlight wired) →
`w36_patch3` (**R2**: the top card set — `zpbDraftCardsFirstHTML`, function and call — is DELETED; the breakdown cards under the map inherit the top cards' exact float-in instructions: `zpb-dfc2` + `data-beat` from `zpbBeatOf`) →
`w36_patch4` (an `<optgroup>` experiment for **R4** — **REVERTED by patch5**, see below) →
`w36_patch5` (**R4 at the real surface**: the suite proved the baseline selects are replaced at wire time by the w33 pick lists, so the optgroup change was dead code — reverted byte-exact; the REAL fix lands in `zpbPickList` item building: the OPEN menu rows read `POS · OVR` (`QB · 91`, measured live), the closed face keeps the w19 name-only law).

## The R3+R5 diagnosis (both filed glitches, one disease, reproduced live)
- **The disease:** `renderDraftResults()` rebuilds `#draftResultsBody` on every call. `startSeason()` internally re-renders the review (the w33 R39 law) — so the stage's big SEASON button painted the preseason view into a DETACHED div and the page threw `TypeError: … null (reading 'addEventListener')` (`beginSeasonBtn` not in the live document). The user saw the review repeat.
- **The trigger:** the boot's draft kickoff timer (`zpbKick → processUntilUserTurn`) fires ~5 s after the draft starts (the welcome cinematic's fade calls it). `processUntilUserTurn` ends with an UNCONDITIONAL `finishDraft2()` — if the draft is already finished (fast picks, sim-to-end, the timer racing the user), it re-finishes: re-runs `optimizeCpuLineups` and re-renders the review, rebuilding the body div under the user's feet. Caught red-handed by instrumentation: `[RENDER] finishDraft2 ← processUntilUserTurn ← zpbKick` at t+4.8 s.
- **R5's exact shape:** the BEGIN handler renders week 1 through its captured container — dead after the straggler rebuild. The SEASON OPENER cinematic hangs on `document.body`, so IT always played… while week 1 sat invisible behind the still-showing preseason page. "Shows a cinematic but then doesn't advance to week 1" — precisely.
- **The cure:** one finish (guarded, reset per draft) + the chokepoint re-target (any season render aimed at a dead div lands on the live surface) + null-guarded begin wiring. The verify AND the stress suites now drive the Owner's own clicks: SEASON tab → preseason page; BEGIN → veil → week 1 stands after the veil clears.

## Verification
- `tools/w36_verify.js` — **136 PASS / 0 FAIL, five consecutive green runs** (nine greens total on the final bytes): all 88 w34 assertions as regression guards + the round-36 directive drills (the review detail leads with the field at its container's edges; the top set gone; the under-map cards carry unique pick-order beats with `delay = beat × 1s`; the SEASON-tab navigation; the closed faces name-only with the open rows `POS · OVR`; the second-finish no-op; BEGIN → veil → week 1; the roster-tab field with 26 pick-order stations). The suite taught itself twice: the pick-list surface (the optgroup dead code) and the pool's full tag set (FB · P · LS — a rare long-snapper flaked the regex, not the product).
- `tools/w36_stress.js` — **50 PASS / 0 FAIL across seven runs** (four seeded: 2031, 777, 424242, 2026 — two of them 51/0 when the elimination path finishes the bracket early; three random): the scripted natural-picks draft, the slot-exactness audit, the SEASON-tab drill, the double-finish no-op, the BEGIN drill through the real click, 17 weeks, the mid-season staged flex round-trip, the weights dropdown, playoffs to a crowned champion, the footer theme block through every phase, zero console errors end to end.
- `tools/w36_probe.js` — **all green live in Chromium**: the map edge-to-edge on the review (1114px at 1280 — the old cap was 560) and on the roster tab (gapL 1px / gapR 1px), `zpbCardIn` with `delay = beat × 1s` computed on the under-map cards, the SEASON-tab landing, the opened pick menu reading `Caleb Williams → QB · 91` with a name-only closed face, the SEASON OPENER veil up and week 1 standing after it clears, 26 pick-order stations on the roster-tab map, zero pageerrors.
- `tools/w36_mobile.js` — mobile 390×844 horizontal overflow **0 px** on all five views.
- Evidence: six shots in `notes/evidence/` (the wide review map, the preseason landing, the open pick menu, the cinematic, week 1 after BEGIN, the roster-tab field).

## Interpretations flagged for veto (see W36-INTAKE-LEDGER.md §Interpretations — eleven items)
1. Reconciliation — the w35 bytes verbatim as "the best of the two" (cumulative chain + 88-assertion proof).
2. R1 — "edges of the greater panel" = the map's outer box on its container's inner content edges; the detail cell's own shared padding stands.
3. R1 — the viz sits at the TOP of the YOUR ROSTER tab, its own panel (he named no position).
4. R2 — "(which they already are)" = the destination was already right; the float-in moves there now.
5. R2 — "in order of when they were selected" governs the animation order (`--beat`); the DOM keeps the position-group layout; unloggable names land after the drafted ones (the register's own rule).
6. R3 — "the Season button" = BOTH season surfaces on the review (the tab AND the stage's big button).
7. R3 — the preseason page renders on the one primary tab; the review chrome above stays — one line retires it if he wants.
8. R4 — the preferred position = the natural tag as the data speaks it (`TAG · effOvr` in the menu row).
9. R4 — the KR/PR returner menus keep name + return rating (the w34 R6 carve-out).
10. R5 — the SEASON OPENER cinematic stays; the fix guarantees week 1 under it, every time.
11. R5 — the double-finish guard is silent (no toast, no note).

## New in the lane this session
- `tools/w36_recon..recon4.js` (the diagnosis instruments), `w36_patch1..5.py`, `w36_verify.js` (+ its builder), `w36_stress.js` (+ its builder), `w36_probe.js`, `w36_mobile.js`
- `notes/W36-INTAKE-LEDGER.md` (the reconciliation + R1–R5 + interpretations) · this report · six evidence shots
- START-OF-CHAT-ZAI.md §3 rewritten for w36 · ZAI.md and END-OF-CHAT-ZAI.md rewritten
