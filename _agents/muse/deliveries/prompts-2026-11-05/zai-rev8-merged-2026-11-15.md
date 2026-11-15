Z.ai (Executor), relayed by the Owner. Date 2026-11-15. Revision 8 — the merged follow-up to the Rev 6 fresh-start delivery. Supersedes Rev 7 (do not send Rev 7). Merges MUSE's Rev 7 with Ernie's and Inkling's Rev 7 drafts; the best of each, disagreements flagged below. Continue from the saved tree (/home/z/my-project/work/).

## Budget — read this first

This is a minimum 30-minute sitting. A reply that arrives without Part A's table is incomplete by construction, because Part A alone is a multi-build task: two store surfaces in two frameworks, measured six ways each. Do not reply until every line of the checklist at the end is ticked or carries a command failure. If you find yourself ready to reply early, you have not done Part A or Part C — go back. Being unable to complete a part is a legitimate outcome. Stopping early is not. "I could not run X, here is the command and its output" is a complete answer; silence is not.

## Deliverable

One zip, same protocol as Rev 6: four pass-through copies on four branches, byte-identical, a VERIFY.txt a stranger can run top to bottom, and a REV-8-ERRATA.md that lists every change from Rev 6 with file, old → new, command, and output. Plus MANIFEST.txt, CHECKSUMS.txt, RECEIPT.md, verified-as-of.json, DELIVERY-NOTE.md.

## Part 0 — Errata (exact; receipts attached)

0.1 — The nested manifest is stale and fails 12 of 358. This is the material one. REV-5.1-addendum/CHECKSUMS.txt was generated before the patch script ran. Ernie gets 346 OK / 12 FAILED (exit 1); Glyph confirms exit 1, 12 did NOT match. The twelve are exactly the patch targets: AUTHORING-COST.md, CATEGORY-WINNERS.md, INNOVATION.md, README.md, SLICE-DONE-PROPOSAL.md, filings/OT-clock-fix-PENDING.txt, framework-two-arm/arm-svelte/src/lib/savesService.ts, framework-two-arm/arm-vue/src/lib/savesService.ts, framework-two-arm/receipts/bundles-pin-d3bd81d2.txt, framework-two-arm/receipts/two-arm-fourslice.txt, framework-two-arm/receipts/two-arm-lines.txt, measurements/AGENTIC-ERGONOMICS-VERDICT.txt. The content is correct (spot-checked: README.md = w89, CATEGORY-WINNERS row 9 = 83/98, savesService.ts = the cast). The manifest is stale. Regenerate it on the patched tree, verify 358/358, and re-cut the four pass-throughs — or land a REV-8-ERRATA.md naming the twelve and stating plainly that the nested file predates the patches. Either is acceptable; leaving it undisclosed is not.
0.2 — Label the repair-cycle scope. RECEIPT.md:73 says "repair cycles svelte 10 vs vue 9". DELIVERY-NOTE.md:6 quotes five numbers per arm. Both are right: 10 vs 9 is the four-slice subtotal (a–d); adding Part B's week-stepper (svelte 1, vue 2) gives 11 vs 11. Change the summary to carry its scope: "repair cycles (4 slices, a–d) svelte 10 vs vue 9; with the Part B week-stepper, 11 vs 11". Do not change the numbers. Change the label. The consequence is worth stating: on the full five-slice count the arms tie exactly, which supports your WASH finding rather than weakening it.
0.3 — The workarounds figure disagrees with your own receipt. DELIVERY-NOTE.md:6 says "fewer workarounds: 4 vs 6"; RECEIPT.md:73 says "svelte 4 vs vue 3". The itemisation at RECEIPT.md:18 supports 4 vs 3 (or 5 vs 4 if the two ! boot guarantees count separately). No reading yields 6. Correct the note to 4 vs 3, and strike "fewer workarounds" as a reason for the Svelte lean — your own receipt says Vue has fewer. The lean survives on first-try greens (2 vs 0) and templates; rest on those.
0.4 — Two files are outside the manifest. MANIFEST.txt covers 635 of the 641 non-vendored files. Missing: football-sim-vue/CLAUDE.md and football-sim-svelte/CLAUDE.md (0 occurrences of "CLAUDE" in the manifest; neither gitignored). Either add them or state the exclusion rule in VERIFY.txt. While you are there: the covering note's "MANIFEST.txt 3,503 sha256 lines" contradicts the shipped file's 3,499 — fix the note.
0.5 — "17/17 asserted patches" cites a script that is not in the zip. REV-5.1-ADDENDUM.md:7 cites scripts/r51_patch.py; the addendum's scripts/ holds only pin-migration-harness.mjs. The table has 9 grouped rows. Ship the applier, or state that the 17/17 is unverifiable from the delivery. Do not leave a citation pointing at an absent file.
0.6 — 867 vs 871. DELIVERY-NOTE.md:3, RECEIPT.md:10 and verified-as-of.json:8 all say the cards screen pins 867 nodes. Both battery JSONs say 871. The claim that matters (ALL EQUAL per screen) is true either way — both arms are 871. Fix the three prose sites to 871, or state which is right and why.
0.7 — The wrapper variant is not build-verified. weekStore-wrappers.svelte.ts says of itself "NOT imported anywhere — compiled and checked only". Confirmed: 0 references anywhere in src/, so the bundler never compiles it and vite build proves nothing about it. Its "also compiles clean" claim rests on svelte-check alone. Import it from a test or a throwaway route and re-run npm run build, then quote the build, not the checker. (This matters beyond bookkeeping: state_invalid_export is raised by the build, not by svelte-check — see Part C1.)
0.8 — The Vue line count is not reproducible. The Vue framework-owned line count (985) has no stated method (RECEIPT.md says only "(wc -l, in-tree)"). State the include/exclude list and the exact command, re-measure, and quote the reproducible number. (Ernie's count, excluding src/engine, is 1,608 — your method must be checkable against it.)
0.9 — The facade comparison is confounded. weekStore.svelte.ts (37 L) holds five getters AND four methods (ensure/go/next/prev); weekStore-wrappers.svelte.ts (29 L) holds five getters with the methods kept outside. The two files measure different things. Restate as a wash: "one facade object costs ~12 lines including its methods; five separate wrappers plus three free functions cost ~12 lines."
0.10 — Delete the dead base.css. football-sim-vue/src/assets/base.css is not imported anywhere and holds 7 hexes outside tokens.css. The palette gate ("0 hex outside tokens") is true of what ships; the file is stale tree weight. Delete it.
0.11 — Fix verified-as-of.json. rev51.file → REV-5.1-addendum/f1-typecheck-rerun.txt (not REV-5.1/). Replace the rev51 claim with a command + exit 0 (do the same for the fidelity claim, switching the value 867→871). Add one entry for the regenerated manifest (hash of CHECKSUMS.txt + file count + date).
0.12 — Re-run both checkers from a clean extract. Your current f1-typecheck-rerun.txt cites /home/z/my-project/... paths — all receipts must cite in-tree relative paths only. Re-run both checkers on the shipped arms from a clean extract (fresh cp -R from source; no node_modules; do not trust your working tree). Re-issue the receipts with exit 0.
0.13 — Fix the a11y warnings. The 3 a11y warnings in svelte-check (aria role on the clickable div) — fix them and re-run both checkers to 0 errors AND 0 warnings on the shipped tree. Do not waive them; the gate-5 strict reading ("0 errors AND 0 warnings") is the question before "clean" is quoted.

## Part A — The class bridge at store-heavy scale (the real work)

This is the question Rev 6 did not answer, and the verdict rests on it. Rev 6's Part B measured the module-level pattern (weekStore.svelte.ts:16-17: let slot = $state.raw(1) + export const week = {…}) and concluded "one facade, paid once". That answers "does a facade cost much?" It does not answer "is a facade needed at all?" — because your own ToyStore (E0) and sim-state.svelte.ts are class bridges, and a class needs none. Two independent seats have now measured the class at store-heavy scale: Ernie (11 fields, 74 L vs Pinia 85 L, 0 facades, 0 diagnostics) and Inkling (2 fields, 21 L vs 19 L). Both found no facade needed. Your tree has not been measured that way.

A1 — the surface. Extend the week-stepper or add a sibling store with at least 11 reactive fields — the shape the real product's saves hydration needs. Suggested fields: slot, ready, view, total, standings (carry E1's derived shape), plus the envelope methods you already have. Reuse the existing engine; do not write new engine code.
A2 — the cells. In the Svelte arm build the same surface twice: class bridge — per your AGENTS.md §2 (".svelte.ts classes with $state holding snapshots"); module-level facade — the Part B pattern. In the Vue arm build it once, with a Pinia setup store.
A3 — measure each cell on six axes. For every cell, record with the command and its output: (1) wc -l of the store file; (2) svelte-check / vue-tsc diagnostics (counts, warnings verbatim); (3) the production build — npm run build, exit code, and the first error if any; (4) repair cycles while authoring (count the stops, name each); (5) first-try green (yes/no); (6) call sites to migrate, counted by grep.
A4 — the deliverable. One table, this shape: pattern | fields | arm | lines | checker | build | repairs | first-try | call sites — with rows class@2, facade@2, facade@11 (svelte) and Pinia@2, Pinia@11 (vue). Ernie already holds three cells (class@2 = +2, Inkling class@2 = +2, class@11 = −11). Your job is to fill the rest and say whether the sign flips and where. Also re-implement Ernie's 11-field season-store measurement (or your own 10+-field equivalent) class-vs-Pinia: one number, three decimals, attributed, method-labelled. If it doesn't reproduce (−11), say so and show your table.
A5 — one line of analysis, not more. State whether the class needs a facade in your tree, and whether the delta's sign depends on pattern or on size. If it depends on both, say so and give the crossover. You do not conclude the framework — emit the table and the derivation; the council does the rest.

## Part B — The sealed-recipe handicap + second-agent handoff (your own named falsifier)

Rev 6's verdict says: "a second agent running the same protocol with the sealed-recipe handicap (C4) on a store-heavy surface" is what would flip it. Four seats have now said the ~55% is an opinion until that runs.

B1 — write the sealed recipe. A step-by-step that fixes the API surface (what the store must expose, what the component must render, what the probe must assert) without giving the code. Complete enough that a competent agent who has never seen your tree can execute it, and blind enough that it does not teach your idioms.
B2 — state its status honestly. If you can run it against a fresh context, run it and report the handicap ratio. If you cannot, say so in one line and ship the recipe — an unrun recipe is a legitimate deliverable; a missing recipe is not.
B3 — attach the falsifier. Restate the number that would flip your pick, and the number that would confirm it. Do not restate them identically; if they are the same number, the test is not falsifiable and you should say so.
B4 — extend the Flip Bench harness with the sealed-recipe handicap, and write a one-page SECOND-AGENT-HANDOFF.md at the fresh-start root: where the repos are, what the seeds are (20261115 order, the 2027 fixture), where ground-zero lives, what passes/fails, which receipt to open first, and the explicit list of "do not touch" files. Prepare the handoff for a second agent (whoever takes it from the queue — no seat named). Do NOT run the protocol yourself. Apply the three amendments from the reviews: (1) §1.1 must point at the fresh-start repos, not the four-slice arms; (2) it must prescribe the class pattern for the Svelte arm (the repo's own AGENTS.md §2 and the only untested store shape); (3) it must require the production build green, not only typecheckers. Also apply the sealed-recipe handicap to E1 itself (not only Flip Bench), so the next sitting's repair-cycle pairs are comparable across agents.

## Part C — The gates

C1 — add the build-green clause to the slice-done proposal. Gate 5 currently reads "both typecheckers clean". That is not sufficient: state_invalid_export ("Cannot export state from a module if it is reassigned") is raised by rolldown at build time, and svelte-check reports 0 errors on the same file. A slice can pass gate 5 completely and fail the build. Amend gate 5 to: "5. Both typecheckers clean AND the production build green, on the shipped tree, after the last edit, under the strictest tsconfig in either arm (name it). Any gate-5 receipt predating the final change is void."
C2 — implement the nested-manifest gate. A script that: (1) finds every CHECKSUMS.txt and MANIFEST.txt in the tree, not only the top-level one; (2) verifies each against the bytes; (3) fails on any mismatch, naming the file and the count. Run it on your Rev 6 tree first and show it failing (it should report the 12/358). Then run it on the Rev 8 tree and show it passing. That before/after is the receipt.
C3 — the numeral gate. A companion script that greps the prose for numerals and checks each against the receipt files. It should flag 867, 4 vs 6 and 3,503 on Rev 6. Ship it, run it on Rev 6, show the hits, then show it clean on Rev 8. The council decides whether to adopt it (that is their Q3 in the Rev 5 adjudication); your job is to build working prototypes and report whether they catch the defects, not to adopt them yourself.

## Part D — The E3 interactive devtools session

Run scripts/e3-devtools-session.mjs in BOTH fresh-start repos and file the E3 receipts (state inspected, value changed, UI updated, or evidence NONE). The script ships in both repos; the session was unrun because the sandbox's dev-server + browser session hung. Run it now and report what happened — including if it hangs again, in which case say so and explain the blocker. Do not claim the devtools row is filled unless the session actually ran.

## Part E — Beauty (label, don't redo)

E1 — label the tokens. tokens.css is "w89-derived, experiment default (dark)". Say so in the file header.
E2 — --tc is invented. w89 has 0 occurrences of --tc and never uses var(--tc…); team colour runs through ZPB_TEAM_COLORS (2 refs) and [data-zpbteam] (22 refs). Either remove --tc, or state in a comment where it comes from and why the w89 remap is not the model.
E3 — strike the C1 fidelity claim. RECEIPT.md C1 says the "w89 dark+gold+team-color language" is carried. It is not, on either count: w89's shipped default is pale-rose light — w89.html:13616/13621: :root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0; … } — and dark is a data-theme="dark" variant (163 references), not the default. Replace the claim with an honest one: the token layer is an experiment default; it is not w89's shipped palette.
Do not redo the tokens. The experiment's beauty gate is "do both arms look alike", and a shared token layer serves that. But dark-vs-light is an unowned product decision, and a dark default in the shared layer silently prejudges it. Labelling fixes that; redoing is not required. Disagreement flagged: Inkling and Beam argue the tokens should be rebuilt to the live w89 language for product use (light default, two-mode, no --tc, [data-zpbteam] remap). That rebuild is queued behind the Owner's beauty-mode ruling (which is pending), not part of this sitting. If you agree with Inkling, say so and label instead of rebuilding — but do not ship the false C1 claim either way.

## Part F — Restate the verdict

One page, replacing the Rev 6 verdict. It must carry: (1) the corrected numbers (Parts 0.2, 0.3, 0.6); (2) the store table from Part A; (3) the sealed-recipe status from Part B — run, or owed with the recipe shipped; (4) a confidence figure with its falsifier attached, and the sentence that would have to be true to flip it; (5) one line on what Rev 8 changed about the Rev 6 verdict — including "nothing", if that is the answer. This is a restatement with the new evidence, not a re-pick: you measure, you build, you receipt; the council adjudicates; the Owner rules. Quote the lean with no number attached until a second agent runs the sealed-recipe handicap (Beam's F-B, seconded by Ernie and Inkling).

## What not to do

- Do not re-run E0–E4. They passed; the batteries are green.
- Do not rebuild the Season Book or the Flip Bench harness (beyond the sealed-recipe extension in Part B).
- Do not touch the engine. It is pinned at d3bd81d2 and byte-identical in both repos.
- Do not edit AGENTS.md, the product HTML, or another seat's work.
- Do not touch the product file, flex, OT-clock (the Architect's — assigned, pending), wave pins, colors/, or another seat's bytes.
- Do not push to the four pass-through branches, gh-pages, or the fresh repos' main — you deliver; KG/MUSE re-cut.
- Do not "fix" a number to make a gate pass. If a gate fails, the gate is the finding.
- Do not re-pick the framework. Restate your verdict with the new evidence (Part F); the council adjudicates; the Owner rules.

## Minimum evidence — the checklist

Tick every line, or write the command and its output beside it. A reply without this block is incomplete.

[ ] 0.1 nested CHECKSUMS.txt regenerated and verified 358/358, or erratum naming the 12
[ ] 0.2 RECEIPT.md:73 carries its 4-slice scope; 11 vs 11 stated
[ ] 0.3 DELIVERY-NOTE.md:6 corrected to 4 vs 3; "fewer workarounds" struck
[ ] 0.4 MANIFEST covers the two CLAUDE.md files, or the exclusion rule is stated; "3,503" fixed
[ ] 0.5 r51_patch.py shipped, or 17/17 declared unverifiable
[ ] 0.6 867 → 871 in all three prose sites, or the discrepancy explained
[ ] 0.7 wrapper variant imported and build-verified
[ ] 0.8 Vue line-count method stated; reproducible number quoted
[ ] 0.9 facade comparison restated as a wash
[ ] 0.10 dead base.css deleted
[ ] 0.11 verified-as-of.json fixed (path + command + manifest entry)
[ ] 0.12 checkers re-run from a clean extract, in-tree relative paths only
[ ] 0.13 a11y warnings fixed to 0 errors AND 0 warnings
[ ] A the 5-row table, every cell with its command; the −11 replication
[ ] B the sealed recipe shipped (run, or declared owed); falsifier attached; SECOND-AGENT-HANDOFF.md
[ ] C1 gate 5 amended with the build-green clause
[ ] C2 nested-manifest gate shipped; failing on Rev 6, passing on Rev 8
[ ] C3 numeral gate shipped; hits on Rev 6, clean on Rev 8
[ ] D E3 session run, or the blocker stated
[ ] E tokens labelled; --tc removed or justified; C1 claim struck
[ ] F the one-page verdict with its falsifier
[ ] Z VERIFY.txt a stranger can run; REV-8-ERRATA.md; four pass-throughs byte-identical

## Verified-as-of (load-bearing premises, stated positively)

- Rev 6 delivery is on four branches, byte-identical; CHECKSUMS.txt sha256 61e0a7d3… on all four.
- Top-level MANIFEST.txt sha256 4cb81387…, 3,499 lines, 635/641 non-vendored files covered.
- REV-5.1-addendum/CHECKSUMS.txt: 358 lines, 346 OK / 12 FAILED (stale, pre-patch).
- Engine pinned d3bd81d2, 57 files, byte-identical both repos.
- svelte-check 0 errors / 3 warnings; vue-tsc exit 0, on the shipped tree.
- Batteries 24/24 PASS both arms, 0 console errors, 0 blocked, on vanilla file:// with the singlefile postbuild.
- Fidelity 6/6 EQUAL (cards 871, stats 457, board 470, feed 125, week 221, settings 39).
- Repair cycles 10 vs 9 (4 slices, a–d); 11 vs 11 with the Part B week-stepper; slice-b excluded (TanStack v9, ecosystem cost): svelte 3 vs vue 9.
- Workarounds receipted 4 vs 3; first-try greens 2/4 vs 0/4; Season Book 44,861 B gz (9× under the 400 KB falsifier).
- Live site is w89 (origin/gh-pages); w89's shipped default is pale-rose light #fdf2f6; --tc absent.
- state_invalid_export is a build error (rolldown), not a svelte-check error.

## Revision ledger

- Rev 8 (2026-11-15): merged work order, supersedes Rev 7 (do not send Rev 7). Merges MUSE's Rev 7 with Ernie's and Inkling's Rev 7 drafts. Adds Part 0.1 (nested-manifest 12/358, the lead erratum), Part 0.4 (CLAUDE.md files), Part C (the two gates with before/after), the 5-row table structure + six axes (Part A), the sealed-recipe + falsifier (Part B), the tick-box checklist, and VERIFY.txt + REV-8-ERRATA.md. Keeps MUSE's E3 session, a11y fix, Vue line-count method, base.css deletion, and facade restatement (not in Ernie's or Inkling's drafts). Disagreements flagged: tokens (Ernie: label, don't redo — adopted as the default while the Owner's beauty-mode ruling is pending; Inkling/Beam: rebuild to live w89 for product use — queued behind that ruling); verdict (Ernie: restate with the new evidence — adopted; Inkling: measurements only, don't re-pick — adopted as the boundary: restate, don't rule).

Innovate freely — you are the builder; think around the issue, brainstorm improvements, and create new ideas. If you see a better way to test the class bridge, a better reconciliation check, or a falsifier that would kill your own verdict, build it and report it. Flag disagreements, don't smooth them away.
