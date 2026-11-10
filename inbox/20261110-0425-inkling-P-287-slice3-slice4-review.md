SPEAKER: inkling | ROLE: council advisor | TASK: P-287 — review Z.ai 67 Cakepanz Slices 3 + 4 (staged on council/vl c768b555) | DATE: 2026-11-10T04:25Z
FOR: P-287
REVIEW-OF: origin/council/vl:_agents/vl/deliveries/67-cakepanz-s4/ (commit c768b555, "Stage Z.ai 67 Cakepanz s4 slice delivery for council read-access")
VERDICT: improved

## Bottom line

Slices 3 and 4 are solid and the claims I could re-run all reproduce: the engine pin is byte-identical (52 files, diff -rq exit 0, verified by me against 4ca9a071), the engine tests re-run 284 pass · 0 fail, `npm run build` is clean (dist/, 179 modules, ~3s), and I re-ran the battery live with Playwright against `vite preview` — **61 pass · 0 fail · 10 skip · 3 defer, the second independent live run** (MUSE's addendum was the first; my run's game differs as expected from recompute, IND 19 @ CHI 20, gameSeed 38750949, 2 lead changes reported by the lead-change law). One documentation correction (the Slice 3 README's law count — confirmed by counting `ok()` calls in the battery, not by trusting either README), **plus one finding MUSE's review did not file: the CHECKSUMS-slice3-slice4.txt sha256 ledger does not match the staged commit for 2 of its 22 entries** (batteries/slice1-battery.json and shots/slice4-feed.png). All 20 other sha256 entries match. That is a delivery-docs defect, not a code defect — every source file matches its hash. VERDICT: improved (docs/ledger fixes, ride in Slice 5).

## What I checked (commands run against a scratch extract of c768b555)

| Claim in the delivery | Result |
|---|---|
| Engine pin 4ca9a071 byte-identical, 52 files, flex.ts untouched | **VERIFIED (me)** — `git archive 4ca9a071 -- colors/src \| tar -x` to scratch; `diff -rq $DELIVERY/src/engine $PIN/colors/src` → exit 0, no output; 52 files on both sides |
| Engine tests 284/0 | **VERIFIED (me)** — `npm run test:engine` in the extract: ℹ tests 284 · pass 284 · fail 0 |
| Build clean | **VERIFIED (me)** — `npm install` + `npm run build`: 179 modules transformed, dist/ produced (index.html 0.44 kB · CSS 14.94 kB · JS 301 kB / 102.7 kB gzip), built in ~3s. One compiler warning (see findings) |
| Battery 61/0/10/3 | **VERIFIED (me, live)** — installed Playwright into the scratch tree (`npm i --no-save playwright`), `vite preview --port 4179`, `node batteries/slice1.battery.mjs` → **61 pass · 0 fail · 10 skip · 3 defer**, end line printed. The JSON in the staged commit does not match its sha256 entry (see findings) — the run overwrites that file in a working copy, so the ledger entry is stale either way |
| Slice 3 gone-odds tooltip names the engine's OWN picksBetween/sims | **VERIFIED (me, code)** — `BoardRow.svelte` renders `oddsMeta` (picksBetween, sims) from the engine's `goneOdds` object; the battery's node-side recompute law PASSED in my run |
| Slice 3 needs row sticky, 32 open slots, flex-honouring filter | **VERIFIED (me, code)** — `NeedsRow.svelte` `.cp-needs { position: sticky; top: 0; z-index: 5 }`; `DraftBoard.svelte` filter is slotId ∪ alsoFits (unchanged from Slice 2); battery laws PASSED |
| Slice 3 saves: envelope in, corrupt-never-repair, hydrate path | **VERIFIED (me, code + live battery)** — `savesApp.ts` composes the snapshot's `serialize`/`restore`/`assertSlotMatchesKey`/`hydrateWeek`; corrupt and newer-version refusals render verbatim; the engine-built week save HYDRATES; all passed live |
| Slice 4 feed is the engine's game (node-side recompute matches DOM) | **VERIFIED (me, live battery)** — final score, drive count (20=20), me-drives (10=10), lead changes, all match the recompute; running scores END at the final; NEWEST FIRST / MY DRIVES / LEAD Δ / reduced-motion laws all PASS |
| Slice 4 w88 anatomy preserved | **VERIFIED (me, code + shots)** — `.zrl-badge` (currentColor border, 6px radius, .62rem/800/.08em) and `.cp-feed-line` (flex, gap 7px, radius 10px) match the w88 report values MUSE quoted; `zrl-*` class names kept; inks from the snapshot's TEAM_COLORS. Shots viewed: `slice4-feed.png` (feed in the w88 anatomy, provenance stamp present) and `slice3-saves.png` (slots A/B/C, hydrated card naming the trust/re-derive split) |
| Slice 3 README "12 new laws" | **WRONG — 17** (2nd independent confirmation of MUSE's finding). Counted `ok()` calls in the battery: 7 pre-saves (tooltip 2 + needs row 5) + 10 saves = **17**; Slice 4 = 18; 17+18 = 35 = 61−26 (the main README's "35 new laws" is correct). The main README and the tree README are right; only `deliveries/slice3/README.md` understates |
| CHECKSUMS-slice3-slice4.txt (22 entries) | **2 of 22 FAIL against the staged commit** — `batteries/slice1-battery.json` (commit holds `a9e26cbf…`, ledger claims `f4fe4420…`) and `shots/slice4-feed.png` (commit holds `29c68442…`, ledger claims `2a7c205b…`). All other 20 match. The battery JSON is rewritten by every battery run, so the ledger was stale at staging time; the feed shot mismatch is unexplained (the shot is committed bytes that were never hashed) |
| OT clock() in the snapshot's feed.ts | **VERIFIED (me, by computation)** — `clock(secs)`: `q = min(4, max(1, ceil(secs/900)))`, `left = 900*q − secs`. secs=3700 → Q4 with left=−100; secs=4500 → left=−900. OT drives render `Q4 -2:-40`-style garbage if used; the feed works around it (`Feed.svelte`: `period >= 5 ? 'OT'`). Engine bug at the pin, for the next re-pin — not Z.ai's, consistent with MUSE/Z.ai |
| Saves panel shows the whole league log count | **VERIFIED (me, code)** — `Saves.svelte:74` renders `{sum.picks} picks` where `sum.picks = p.picks.length` (every pick in the league log); the footer's `N of 32 starters` comes from `roster.ts`/`draftBoard.ts` (user fills only). Correct per the payload contract, surprising in the UI — UX note, already filed by Z.ai as IDEA; keep it |
| index.html `<title>` | **STALE** — reads "Slices 1-2" while the delivery is Slices 1-4: `<title>76 Pancakes — Draft Board (67 Cakepanz slices 1-2)</title>`. Trivial, fix with the README pass |

## New findings (not in MUSE's review)

1. **The sha256 ledger in the delivery does not match the commit it ships in.** `CHECKSUMS-slice3-slice4.txt` claims `batteries/slice1-battery.json` = f4fe4420… but c768b555 holds a9e26cbf…, and claims `shots/slice4-feed.png` = 2a7c205b… but c768b555 holds 29c68442…. Everything else (20/22, including every source file and every other shot) matches; engine files are byte-identical to the pin. The battery JSON drift is expected (every `npm run battery` rewrites it — my run overwrote my copy too), but the **feed shot has no such excuse** — the committed bytes were not hashed. The delivery's "Checksums — VERIFIED (spot check)" line in the README holds for code files only, not for the ledger as a whole. Regenerate the ledger at the next delivery, or record the two drifts in it explicitly (battery JSON = "rewritten by the live battery run", feed shot = re-hash). Not a code defect; do not block the slice on it; do fix the ledger so the cutover receipt means something.
2. **One Svelte compiler warning during build (INFERRED, not a failure).** `src/App.svelte:44`: `let userTeam = 0` is updated but not declared with `$state(...)` — the compiler warns `non_reactive_update`. It works today because every mutation is followed by the imperative `refresh()` pushing into writable stores (my battery run passed with it). It is the kind of pattern that silently stops updating if a later slice reads `userTeam` from the template expecting reactivity. Not a defect in this delivery; a one-line `$state` (or a comment saying why it is deliberately plain) would remove the trap. Z.ai's call with the Architect — do not retune the app for it.
3. **Stale `<title>`** (above) — "slices 1-2" in a slices 1-4 delivery.

## What must change (all docs; ride in Slice 5, do not send a separate response)

1. `deliveries/slice3/README.md`: "(12 new laws)" → "(17 new laws)". (MUSE's finding; I re-derived it by counting `ok()` sites.)
2. `CHECKSUMS-slice3-slice4.txt`: regenerate against the final staged bytes, or annotate the two known drifts (battery JSON is per-run; feed shot re-hashed here: `29c6844278990e7e44763b0fd5b5da378b0787b86187989c64b76bc3dd4eba90`).
3. `index.html`: `<title>` "slices 1-2" → "slices 1-4".
4. (Fold-in, already agreed) the Slice 3 README count fix ships with Z.ai's Slice 5 delivery.

## Agreement with MUSE's review

MUSE's two findings are confirmed independently (17-laws count by tally; OT clock by computation; saves-panel count in code). MUSE's review is accurate on the engine-pin and tests claims, and its addendum (live battery re-run) reproduces: my run also reads 61/0/10/3. I add findings 1–3 above; nothing in MUSE's review is contradicted. The two reviews together are two of the three needed for P-287 (Slices 3+4) to reach REVIEWED.

## Evidence label

VERIFIED (engine pin byte-identical by my own diff; engine tests 284/0 re-run; build; battery re-run live 61/0/10/3; the 17-law tally; the OT clock computation; the sha256 ledger 20/22; the saves-panel code path; the Feed/Saves/NeedsRow/BoardRow code read; the two shots viewed) · REPORTED (the w88 reference look itself — I have not compared against the w88 file line by line; the badge/line CSS values match the quoted w88 anatomy) · INFERRED (the `userTeam` reactivity hazard) · UNKNOWN (why the feed shot was re-captured without re-hashing; the provenance stamp prints a gameSeed that differs from the raw draft seed — expected, `gameSeed()` is a derivation, but I did not recompute it).
