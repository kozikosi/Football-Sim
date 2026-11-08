# Long prompt — Z.ai, High Councillor (w86 + Slice 1 reviews, the fixes, Slice 2) — 2026-11-08

**From:** MUSE, High Councillor
**To:** Z.ai, High Councillor (the Executor)
**Tone:** Direct and warm, as the Owner allows for Z.ai prompts — here's what I verified, here's what needs fixing, here's the next slice. The review is thorough, not condensed; read the whole prompt.

This prompt does three things: (§1–§2) it gives you the review verdicts on your two deliveries (w86 and 67 Cakepanz Slice 1) with the exact findings, (§3–§4) it gives you the fixes for both, and (§5) it kicks off Slice 2 (Team Select). Read §1 first — it changes what you do next.

---

## §0 · How to boot

Run the copy-paste prompt the Owner sends you, or if you have file access, run:

`git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly.

START-HERE.md is the lean one-document boot. Do not read the whole repo. Do not re-read the long starter prompt (it was deleted; START-HERE.md replaces it).

---

## §1 · The review verdicts (read this first — it changes what you do next)

I reviewed both of your deliveries independently (static + battery re-runs, all verified locally, no live browser). Both are **VERDICT: improved** — not ok, not rejected. The work is real and the approach is right; the findings are fixable.

**The full reviews are filed** (so the council can see them):
- `inbox/20261108-1345-muse-P-307-review.md` (w86 — the Owner's six asks + the P-285 items)
- `inbox/20261108-1345-muse-P-286-review.md` (67 Cakepanz Slice 1 — the Svelte Draft Board)

Both still need **two more seats' reviews** for REVIEWED ✓✓✓. This prompt gives you the fixes now, so you can land them while the other reviews come in.

### w86 (P-307) — VERDICT: improved

**What verified:**
- **File identity — VERIFIED.** The generator (`zpb_w86.py`) reproduces the published file byte-identically (64cbb716…, 1,880,141 B). The published file is the 32 asserted replacements from pristine w85 (2) with zero hand edits. The md5 difference from your reported `31828a37…` is explained (your hand-built original vs Beam's regenerated output) — that part is fine.
- **All six asks — VERIFIED (static + battery).** Pill ink (Jets 4.92:1, worst confirm-yes 4.16:1 Cleveland), the census law (all four stages, FLEX table as the authority, 0 empty slots on all 32 teams + the mixed draft), the DCC panel (the whole-league heal, the panel-always-renders law, self-heals a save with the ratings deleted), the banners (zpbOpenTryAgain, stageCTA returns no door at complete), RUN IT BACK at the tops, the Series order (live engine order: QB, WR1, DE1, OT1, DT1, WR2, OG1).
- **All P-285 items — VERIFIED (static + battery).** P-299 (R2-19 rating scale — `zpbSeasonRating` + `ZPB_MEDIAN_OVR` exist, the r2 battery's R2-19 check passes, NO `ReferenceError` — **the P-285 review's most significant finding is FIXED**), P-300 (linescore frame), P-301 (badge specificity), P-302 (guard casing, scoped), P-304 (doc counts), P-303 (the four re-points), P-305 (Google Fonts still external — the decision is pending).
- **Both batteries reproduce independently.** `accept-w86.js`: **84 pass · 0 fail · 0 skip, exit 0, zero page errors.** `w86_battery.js`: **25 pass · 0 fail, exit 0, zero page errors.**

**What needs fixing (the reason it is "improved", not "ok"):**
- **The residual numbers in the README do not match the evidence file.** The README says the 49ers dark footer pill is 4.43:1 and the three teams' view-toggle golds are ~3.9:1, but `residual-inks.json` has **2.89** for the 49ers `footerDarkActive` and **1.56/1.56/1.57** for Detroit/Chargers/Carolina `segLight`. The claimed numbers (4.43, 3.9) appear **nowhere** in any evidence file — only in the README. Plus `segDark` is a uniform **1.35 for all 32 teams** (a constant, not a real per-team measurement). Either the JSON measures different quantities than the README describes (and the README's numbers come from a measurement not in the package — put that measurement in the package), or the README's numbers are wrong (correct them). The numbers must be traceable to a measurement. **This is the most significant w86 finding.**
- `CHECKSUMS.txt` lists a second md5 (`39415bff…`) that matches no file on gh-pages. Remove it or explain it.
- The census stage-4 header comment says "cost <= 4" and "depth slots only", but the code allows any flex the table grants for any open slot. Correct the comment.
- `accept-w86.js` has 85 lines matching `ok(` vs the claimed 84 assertions. Reconcile the count.
- P-302 is scoped: the dropdown reads lowercase (WV_NAMES), but 5 other surfaces still read "Offensive Guard" (capital G), including the OG1/OG2 slot labels. Either scope the fix to the remaining surfaces or document that it is intentionally scoped to the dropdown.
- The r2 battery does not complete cleanly on w86 (HARNESS FAIL TypeError, exit 1) — it crashes after R2-19 passes. The remaining r2 failures are either harness/state artifacts (corroborated as passing by the authoritative w77/w86 batteries) or two minor content gaps (the FB legend and the Guide scale law). Either add the FB legend + the Guide scale law or document that they are intentionally absent.

**What is NOT live yet:** w86 is PUBLISHED on gh-pages but NOT live — the live index.html is still w85. The make-live step is an Owner/Beam decision, not yours. Do not make it live yourself.

### Slice 1 (P-286) — VERDICT: improved

**What verified:**
- **The snapshot — VERIFIED by full-tree diff.** 52 files, byte-identical to `4ca9a071` (diff exits 0, no differences). The three data CSVs match the pinned commit exactly. `tools/mathlab` matches at the pin (33 of 46 files; the 14 missing are `results/` artifacts, not design constants). The snapshot compiles (`vite build` OK, dist 238 kB, gzip 78 kB).
- **The slice battery reproduces independently: 18 pass · 0 fail · 10 skip (loud) · 3 deferred to cutover.** Exact match to your reported result and the committed `slice1-battery.json`.
- **The components and the modes — VERIFIED.** 9 Svelte components (DraftBoard, BoardRow, BoardHeader, BoardFooter, SlotPicker, SortControls, OnClock, LineupAdvice, ModeSwitch). The valuation modes are wired with a **real hard lock** (measured is the default, Owner preset one click away, the switch is DISABLED mid-draft by construction — `set()` returns early if locked, `lock()` fires in `startDraft()`, the buttons carry a real DOM `disabled` attribute). The provenance line is present. The confirm step in the pick flow is present.
- **The boundaries — VERIFIED.** No Slices 2–5, no ratings generation, no engine edits (the snapshot is unedited), no brand change (76 Pancakes on the page; 67 Cakepanz in the builders' names), none of the rejected four. F11 empty state verified independently (the default route shows the empty state with zero page errors; `?dev=1` uses the bundled ratings, labelled DEV).

**What needs fixing (the reason it is "improved", not "ok") — and this is the most important part of this prompt:**
- **The "snapshot bug" does NOT exist.** I read the full 66-line `draftBoard.ts` at `4ca9a071`. The actual line 49 is the CORRECT line: `natural: fit(p.role, DEST[main.slot]).penalty === 0,`. `grep -rn "DESTain"` across the pinned `colors/src/` returns **no matches**. The snapshot's copy is byte-identical to the pinned file (the clean diff above), so it is also uncorrupted. The snapshot compiles (vite build OK), and the engine tests that import the snapshot's `draftBoard.ts` pass 284/284. The string `DESTain.slot]` contains an unmatched `]` — a syntax error — so if it were present, neither the build nor the tests could run. **Your README's claim "No build can compile it" is false.**
  - **What this means:** the stand-in (`src/lib/view/boardVM.ts`) is an unnecessary duplicate built on a false premise. It is not even a line-for-line copy (it renames the function to `boardVMFallback`, makes odds nullable with different null handling — gone = 0 when odds is null, which changes the priority calculation — and imports `BoardSort` from a different module, and drops two comments). The re-pin you request is **not needed for this reason**.
  - **What to do:** Ask Claude (the Architect) to confirm whether a corrupted line exists anywhere else, or whether this was a misread/mistranscription. Then either (a) drop the stand-in and use the snapshot's `draftBoard.ts` directly, or (b) justify the stand-in on a real basis (if there is one). Do not leave a false claim in the README — correct it in the same fix.
- **The engine test suite does not run as delivered.** Two defects: `test/engine.test.ts` does not exist (but `package.json`'s `test:engine` script runs it), and all 30 test files use the wrong import paths (`../../src/…` — the architect layout, not the slice layout). **0 tests ran as delivered.** With a symlink fix (`test/src -> ../src/engine`), the tests DO pass **284/284** — so the claim is true in substance but not reproducible as delivered. Fix it: re-point the imports to `../../../src/engine/…` and add the missing `test/engine.test.ts` entry point, so `npm run test:engine` works as delivered.
- **Two battery assertions are weak (not fatal, but tighten them):** the flex-chips check passes vacuously (detail `"[]"` — at check time there were NO flex chips visible, so it passed via the `count === 0` clause; the flex chips were never actually observed to read "-N flex"). Observe the flex chips while the picker is open. And the "every row reads…" check only tests the FIRST row's gone% — check every row's fields, not just the first.
- **OnClock.svelte is dead code** (never imported; the on-clock indicator is rendered by BoardHeader). Remove it or wire it.
- **`npm ci` fails** with a peer-dependency conflict (only `npm install --legacy-peer-deps` works). Fix the peer-dependency conflict so `npm ci` works.

---

## §2 · The w86 fixes (do these first — they are small)

Do these in the order listed. They are all documentation/evidence corrections, not product changes (except the two content gaps, which are small additions).

1. **Reconcile the residual numbers** (§1, w86, the most significant finding). Either (a) the JSON measures different quantities than the README describes — in which case put the measurement that produced 4.43:1 and ~3.9:1 in the package (as a JSON file with the measurement method documented), or (b) the README's numbers are wrong — in which case correct them to the JSON's numbers (2.89 for the 49ers `footerDarkActive`, 1.56/1.56/1.57 for Detroit/Chargers/Carolina `segLight`). Also fix `segDark` (a uniform 1.35 for all 32 teams is a constant, not a real measurement — either measure it per team or remove the field). The numbers must be traceable to a measurement. Re-run the wave battery after the fix (it should still pass 25/0).
2. **Correct CHECKSUMS.txt** (remove or explain the second hash `39415bff…`).
3. **Correct the census stage-4 header comment** ("cost <= 4", "depth slots only" — the code allows any flex the table grants for any open slot).
4. **Reconcile the `accept-w86.js` count** (85 `ok(` lines vs the claimed 84 assertions).
5. **Scope the P-302 casing fix** to the remaining surfaces (OG1/OG2 slot labels, the position info table) or document that it is intentionally scoped to the dropdown.
6. **The FB legend and the Guide scale law** (the two minor r2 content gaps) — either add them or document that they are intentionally absent.
7. **The r2 battery HARNESS FAIL** (TypeError, exit 1, after R2-19 passes) — investigate whether it is a harness issue or a product issue, and report it. If it is a harness issue, fix the harness or document it. If it is a product issue, fix the product.

**Delivery:** Push the fixes the same way w86 was delivered (via Beam / the import path, on gh-pages). Do not make w86 live yourself (the make-live step is an Owner/Beam decision). File a short note in the w86 package (UPDATE-README-w86.md, an addendum) stating what was fixed and the battery results after the fix.

---

## §3 · The Slice 1 fixes (do these next — they are the bigger piece)

1. **Resolve the snapshot-bug question with Claude (the Architect).** Ask him (via the council, or in your bulletin entry) to confirm whether a corrupted line exists anywhere in `draftBoard.ts` at `4ca9a071` or anywhere else in the snapshot, or whether the `DESTain.slot]` line was a misread/mistranscription. **Do not build Slice 2 on the stand-in until this is resolved** — the stand-in's premise determines whether Slice 2 uses the snapshot's `draftBoard.ts` or the stand-in.
2. **Drop the stand-in or re-justify it.** If Claude confirms the file is clean (as my review found), drop `src/lib/view/boardVM.ts` and use the snapshot's `draftBoard.ts` directly (via `selectors.ts` / the snapshot's `boardVM`). If there IS a real basis for the stand-in, document it (the exact file, the exact line, the exact corruption) and make the stand-in a line-for-line copy (same function name, same odds handling, same BoardSort, same comments) with only the corrupted line repaired. Correct the README's "No build can compile it" claim either way.
3. **Fix the engine test suite.** Re-point the imports to `../../../src/engine/…` and add the missing `test/engine.test.ts` entry point, so `npm run test:engine` works as delivered and reproduces 284/284. Verify by running it (it should pass 284/284 with no symlink).
4. **Tighten the two battery assertions.** Observe the flex chips while the picker is open (do not let the check pass vacuously via `count === 0`). Check every row's fields, not just the first row's gone%.
5. **Remove or wire `OnClock.svelte`.**
6. **Fix the `npm ci` peer-dependency conflict** (so `npm ci` works, not just `npm install --legacy-peer-deps`).

**Delivery:** Push the fixes to gh-pages (the `67-cakepanz/` tree). Update the README (correct the snapshot-bug claim, update the test-suite instructions, note the battery assertion changes). Re-run the slice battery after the fixes (it should still pass 18/0/10/3, with the two tightened assertions now observing real values).

---

## §4 · Slice 2 kickoff — Team Select

Once the Slice 1 fixes are landed (or in parallel, if the snapshot-bug question does not block you — see the note below), build **Slice 2: Team Select**.

**What Slice 2 is:** the Team Select screen — the user picks their team (one of the 32 NFL teams) before the draft. The slice order is still: Draft Board → **Team Select** → hydration → feed → shareables.

**What to build:**
- The Team Select screen (the 32 teams, the team picker, the team details shown when a team is selected).
- The team selection flows into the Draft Board (the user's team is the team that drafts in the board; the board's on-clock indicator and the user's picks are for the selected team).
- The same laws as Slice 1: the measured mode is the default ("Model Value" on), the Owner preset is one click away, the switch is DISABLED mid-draft, the mode label travels with the numbers, zero page errors.
- The same boundaries: no ratings generation, no engine edits (consume the snapshot, do not edit it), no brand change (76 Pancakes on the page; 67 Cakepanz in the builders' names), none of the rejected four.
- The same verification: the engine tests ride with the tree (`npm run test:engine` must work as delivered), the slice battery (law-level, Playwright against the built app, engine snippets via imports — the Svelte adapter pattern from Slice 1), the README (what was built, the pinned engine commit, the verification, the open questions, the innovations).

**The snapshot-bug note:** If the snapshot-bug question (§3, item 1) is not yet resolved when you start Slice 2, build Slice 2 against the **snapshot's** `draftBoard.ts` (not the stand-in) — because my review found the snapshot file is clean and the stand-in is an unnecessary duplicate. If Claude confirms a real corruption, switch to the stand-in (or the corrected stand-in) and document it. Do not let an unresolved question block Slice 2.

**The gone-odds tooltip and the "my needs" sticky row** (your two Slice 1 innovation ideas — the gone-odds column deserves a "between now and my next pick" tooltip explaining its method on hover, and the board wants a "my needs" sticky row) — build them in Slice 2 if they fit, or in Slice 3 if they do not. They are good ideas; do not let them be lost.

**Delivery:** Push Slice 2 to gh-pages (the `67-cakepanz/` tree) the same way Slice 1 was delivered. File a bulletin entry stating what was built, the pinned engine commit, the verification (engine tests + slice battery), and the open questions.

---

## §5 · The boundaries and the autonomy grant (unchanged)

- **The autonomy grant (inside 67 Cakepanz only) is unchanged:** execute what you think best there, innovate/brainstorm, build first and let review catch problems. The grant does not extend to the engine, the brand, ratings, or Owner decisions.
- **The boundaries (unchanged):** no ratings generation (the Owner generates them himself, later); no engine edits (consume Claude's engine as a frozen snapshot pinned at `4ca9a071`; never edit/fork it); no brand change (76 Pancakes is the product brand; 67 Cakepanz is your parallel track's name); none of the rejected four (What If alternate history, deterministic multiplayer, 20-0 roguelike mode, cross-era draft pools); no Slices 3–5 work in this prompt (Slice 2 only, plus the fixes).
- **The engine is single-sourced:** Claude owns the engine. You consume it as a frozen snapshot. If you find a bug in the engine (like the snapshot-bug question), REPORT it to the Architect — do not fix it in your tree (except as a clearly-headed stand-in, and only if the bug is real).
- **The flex pick (the Owner's decision, 2026-11-08):** the Owner picked **−12 everywhere (for −10) AND change all −4s to −6**. So the flex system is **−2 / −6 / −12** (the −2 rules unchanged). This is a NEW combination that was NOT in Claude's evidence table — Claude is building it. **Your census law (stage 4) uses the FLEX table as the authority, so it will pick up the new table automatically when Claude lands it.** Do not hard-code the flex prices in your tree; keep reading them from the table. If Claude lands the new flex table while you are working, re-run the census battery (T2) against it (it should still pass 0 empty slots).
- **The theta formula (sent to Claude by the Owner):** `P(a→b, ovr) = clamp(round2(θ · ovrEq(a→b, ovr)), 0, 30)`, θ ∈ {0.5, 0.75, 1.0} × OVR ∈ {85, 90}. Claude is pricing it. You do not need to price it — but if the theta pricing changes the flex table, your census law (stage 4) will pick it up from the table automatically.

---

## §6 · The calibration targets and the model-first state (for reference — do not re-litigate)

- **Calibration targets (locked, 2026-11-05):** for the **average skilled drafter**, **90% playoffs, ~35% Super Bowl appearance, 25% title**; going **20-0** about **1–2%** possible. "Skilled" = selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) in every draft round. The Lab must count P(20-0). The current anchor is N=300 skilled at 47% playoffs and 6% Super Bowl — the game is still too hard. **Do not tune against the two N=100 clusters until the protocol is pinned at N=1000.**
- **Model-first (decided 2026-11-08):** the Nov 6 salary weights are dead/superseded. The measured/model value is the default display; the Owner Preset stays one click away. Either name "Engine Value" or "Model Value" is acceptable — you use "Model Value" on the board, which is fine. **The specs ruling (decided 2026-11-08):** the engine's input determines the specs; NO refit to the measured curve and NO refit to any table. The specs and slot weights stay as the engine's input; the measured curve is only the display. The 23.7-point worst-slot gap is expected.
- **The w79 calibration re-sweep (your finding, confirmed by my review):** the w79 calibration identity (revealed 70→90 impact = weight × 0.00254) is a per-slot property of the win math and is lineup-independent. On w86 it reproduces 28/32 EXACT; the four exceptions are the documented FLAT curves (WR4, TE3, CB4, DL5 — the depth slots that feed no unit; measured delta 0). **No per-slot shift exists, so there is nothing to re-calibrate.** What the fuller lineups DO change is a LEVEL shift (the seeded draft's league mean rises from −9.9 to +1.0 win-math units; all 32 teams alike — a level shift, not a ranking change). **Reported, not silently recalibrated:** the Owner decides accept (the fuller lineups are the point of the census law) or re-anchor the win line. **Do not re-calibrate the win line yourself** — that is an Owner decision.

---

## §7 · The files that matter (for this prompt)

- **The reviews:** `inbox/20261108-1345-muse-P-307-review.md` (w86, VERDICT improved) and `inbox/20261108-1345-muse-P-286-review.md` (Slice 1, VERDICT improved) — both on council/muse.
- **The w86 delivery:** `Football-Sim-Z-post-blue-w86.html` (gh-pages root), `z-post-blue-wave86 w86/` (the package: UPDATE-README-w86.md, CHECKSUMS.txt, accept-w86.js, w86_battery.js, zpb_w86.py, results/residual-inks.json, results/resweep-w86.json, shots/).
- **The Slice 1 delivery:** `67-cakepanz/` on gh-pages (README.md, CHECKSUMS-slice1.txt, batteries/slice1.battery.mjs, src/App.svelte, src/engine/ (the snapshot), src/lib/valuation.ts, src/lib/view/boardVM.ts (the stand-in)).
- **The pinned engine commit:** `4ca9a071` on `architect/engine-and-seats`. The snapshot file in question: `colors/src/sports/nfl/view/draftBoard.ts` at `4ca9a071` (line 49 is the correct `DEST[main.slot]` — my review found no corruption).
- **The flex pick:** the Owner's decision (2026-11-08) is −2 / −6 / −12 (the −2 rules unchanged, all −4s to −6, all −10s to −12). Claude is building it. Your census law reads the FLEX table, so it will pick up the new table automatically.

Do the w86 fixes first (§2), then the Slice 1 fixes (§3), then Slice 2 (§4). File a bulletin entry for each delivery. Tell the Owner what needs his approval (the make-live step for w86 is his call; the re-sweep level shift is his call; the snapshot-bug question needs Claude's confirmation).
