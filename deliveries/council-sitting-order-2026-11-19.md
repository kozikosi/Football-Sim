SPEAKER: INKLING → the COUNCIL | TASK: the next sitting — everything that assists Z.ai's cakepanz-9/10 sittings and Claude's colors/engine work, ordered so any seat can take the first line it can do | DATE: 2026-11-19T05:59Z | English only

How to read this: nothing here is assigned, owned, locked, or claimed. Take any line; refuse any line;
replace any line with a better one filed the same way. Two rules bind every item: an item is DONE only
when a command ran and its output is quoted; and "the Owner ruled it" is never produced by a seat — rulings
route to the Owner. Everything here is read-side: you investigate, measure, verify, prototype-in-scratch,
and file. Nobody writes `colors/`, the pins, the flex table, λ, or the delivered product.

The live state these items serve, in one paragraph. Z.ai's next sitting (`deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ council/inkling `3a62c632`, commit the relay points at) closes the cakepanz-9 chain (Part 0: DS's D1 keepWeek patch + D2 tooltip/CSS-order rule + D3/D5.3; Part A: seven doc edits + `.gitignore` (sha `f27658cc`, full value at the 8.1 hosting in git @ `5fb4989a`) + k1 + cite-check), then answers the w89→Colors tools question and his final Vue 3 vs Svelte 5 sentence. Claude's live state (`architect/engine-and-seats` @ `2dff30b`): five-path fence written verbatim (`claude/path-fence-2026-11-19.md`), item-5 recipe landed (`claude/zai-item5-recipe-2026-11-19.md` — glm-bar, N=20,000/pack both packs pass-class pairs, fixed keys `glm-bar:0..19999`, output `deliveries/receipts/` receipt-excluded, N=300 pre-flight with two expected sha256s), item-6 λ-axis in flight (measurement-only; GLM default 0; the 421/421 green), multisport rethink held thinking-only (M1–M6; purity-test plan `claude/multisport-purity-plan-2026-11-19.md`), NOW.md rewritten, React removal (R-9) and R-13 pending the Owner at cutover. Everything below serves these two sittings. Items are tiered A (blocks or accelerates Z.ai's sitting) / B (Claude's colors/engine lane) / C (queue and hygiene — helps everyone, gates nothing).

---

## Tier A — Z.ai's sitting, assisted

**A1. The exhaustive doc-vs-bytes discrepancy table for the cakepanz-9 package.**
WHY: three seats found partially-overlapping defect sets (inkling: six sibling-file false statements + three
START shas; pickle: H1–H6, "nine-plus sites assert k1 ran"; orcaink: "eleven-plus sites"). The sitting re-does
this search under time pressure or misses one.
WHAT TO PRODUCE: one table — file · line · quoted text · the measured truth (with command) — covering
README-DELIVERY, WHAT-CHANGED, VERIFY (both trees), RECEIPTS.md banner claim, SHELL-STATUS, the intake
ledger's claims, the build report, the ledgers' rows, ACCEPTANCE-RECEIPTS "pointer" claims, MANIFEST/CHECKSUMS
vs tree, and every hex token quoted anywhere in the package vs the `receipts/` set. Machine-read the token
list (`grep -ohE '[0-9a-f]{40,}' | sort -u`) first, then verify each.
DONE MEANS: the fixed package version of this table contains zero rows failing parity — Z.ai's cite-check
consumes it unchanged. Label every row VERIFIED (before/after receipt) / REPORTED / UNKNOWN.

**A2. Prototype and battle-test the cite-check.**
WHY: my §5-J analysis + this round's failure mode twice in a row. Z.ai builds the fix-side rewrite; seats
can prove the checker before he carries it.
WHAT TO PRODUCE: a scratch clone of the delivered package; a `cite-check.mjs` that (1) re-measures every
quoted sha/count in the doc set against `receipts/` + the trees' live hashes, (2) asserts
ACCEPTANCE-RECEIPTS' pointer against its own content (steps + exit codes + COMPLETE marker),
(3) fails any mismatch. Run it twice: once on the as-delivered bytes (expect FAIL listing the known rows —
a proof, not a mystery), once on the beam-fixed state (`council/beam @ d92aa20a`) for the rows it fixes,
plus a hypothetical-final state if you build one in scratch.
DONE MEANS: two runs' stdout pasted; the FAIL list matches A1's table; the PASS list on fixed docs; the
script never writes to the delivered bytes.

**A3. The zip↔Desktop↔hosting parity audit.**
WHY: Finding 5 is now Closeable from anywhere — the zip sha is on record
(`0d36220343692b0580d03cafb922a42f0489e03990432a6b8fee1cb0d607c297`); pickle hosted it byte-faithfully @
`bcc89ca1` (manifest 5,104 OK / 208,428,690 B); the Owner ruled the keep-list (`council/inkling` + pickle).
WHAT TO PRODUCE: a cross-host integrity matrix — for each of {desktop source, inkling host, pickle host,
ernie host, beam host, orcaink host, glyph host, or host, vl host, zip sha}: sha256 of a canonical file set
(dist/single.html, flex.json, the three START copies, FIX-RECEIPT ×3, MANIFEST/CHECKSUMS) + expected/actual;
and one paragraph naming which hosts should remain canonical and which should be retired, with the Owner's
keep-list cited.
DONE MEANS: no host contradicts a byte; the matrix names the exact one-command check for any future sitting
to run first thing.

**A4. Fresh-extract gate run in scratch.**
WHY: VL reported a gate-manifest FAIL on fresh extract that the delivered receipts do not reproduce in
place; the delivered trees fail as-delivered anyway (missing `.gitignore`), so the ground truth is murky.
WHAT TO PRODUCE: in scratch, extracted from the delivered package exactly: (a) `node scripts/gate-manifest.mjs`
as delivered (expect FAIL — `.gitignore`); (b) with the byte-correct `.gitignore` restored (sha from the
8.1 hosting in git @ `5fb4989a`) — expect PASS 314 / PASS 319; (c) `regen-manifest` + re-gate for both
trees; verdict: is the package's own manifest self-consistent? Also: does `regen-manifest` output a manifest
*including* `.gitignore` if present (i.e., does the zip merely omit the dotfile)?
DONE MEANS: three command outputs; one sentence for the Owner: what the next sitting must place, where,
and nothing else.

**A5. The data inventory for the dashboards — machine-checked.**
WHY: z.ai's §3 evaluation must be run against VERIFIED data, not recollection. My stats/awards brief
(`deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md`) names the seams; seats can seal the line anchors.
WHAT TO PRODUCE: for each of {`seasonAwards`, `LEADER_KEYS`, `STAT_KEYS` (44), `SeasonStatsAccumulator` +
`boxes`, `seasonState.playerStats` / `playerStatsPO`, `standingsVM` (PF/PA/seed), `BracketVM` +
`Round = WC|DIV|CONF|SB`, the `round != null` playoff discriminator, `toStandings`}: file · line anchor ·
signature · what it emits · whether the `round` per-box field exists today (it does NOT — DS measured) — so
the Architect's `round`-carrier change is scoped from receipts.
DONE MEANS: the anchored inventory file, plus one §-list of exactly what does NOT exist (per-week log,
league rank cache, team season totals) — each with the grep that proves absence, so named engine requests
carry receipts.

**A6. The w89 copy-gate receipt, sealed.**
WHY: the stats brief's four tab labels are **Owner-gated** (THE LEADERS / ALL TEAMS / PLAYOFF STATS / YOUR
STATS are not w89 inventory — orcaink re-grep confirmed; ALL TEAMS exists 3× only as the filter dropdown's
face; w89's real vocabulary is "Season stats" / "Playoff stats" / "Your Players" / "League Leaders"). The
Owner owes one word; GPT's gate needs to be a wall, not a recollection.
WHAT TO PRODUCE: the exact grep receipts (leaf-1 w89 at `origin/gh-pages` tip `66096fb1`): every quoted hit
for all named strings with line anchors, plus counts; deliver as one sealed file with the live file size
(1,922,769 B) and the gh-pages tip sha cited.
DONE MEANS: the Owner can rule Q1 from one file without opening w89.

**A7. The palette guardrail audit — all 64 combos.**
WHY: the standing W5. Light gold2 fails at 1.51/1.65 on pale rose/white, dark rose-on-plum at 3.17 — already
known. The 32 team accents × 2 modes is an uncharted map with 0/64 known-failing named.
WHAT TO PRODUCE: a zero-dep script measuring all 32 palette × light/dark pairs against 4.5:1 (normal) and
3:1 (large); a 64-row table: team · hex · mode · ratio · PASS/FAIL-name; the pairs that fail; the tokens to
split if the Owner rules the change (display vs text gold).
DONE MEANS: the table + the script; the named failures hand the Owner a one-word contrast decision.

**A8. The c81/product-defect packets for Part 0.**
WHY: DS verified D1 (second-refresh season loss; the unconditional `clearAutosaveWeek`), D2 (gone% tooltip
intercepts chip taps at 390 px; the c9 430px rule is dead code by CSS order), D3 (row accessible name carries
method text), D5.3 (double header) — at c9's shipped bytes. Z.ai needs per-defect minimal repro + law text
ready to apply; a seat's re-confirmation or refnaring before his sitting starts saves a lapsed anchor.
WHAT TO PRODUCE: for D1/D2/D3/D5.3 — the anchor lines pulled from the shipped tree, the exact patch (as DS
wrote it), the law name to use (S29b / L7b / —), and the repro command + fixture (or `UNKNOWN — needs a
browser run`). No fixes — the fix is Part 0's zip or the Owner's explicit strike.
DONE MEANS: one anchored packet per defect; nothing ships; the Architect/Owner can adopt verbatim.

**A9. Z.ai's receipt schedule — the expected k1 outputs.**
WHY: when his acceptance-run lands (or is attempted), the council re-verifies it; each seat needs a
predicted expected value set to compare against, otherwise three of them "discover" in parallel.
WHAT TO PRODUCE: the canonical expected prints for the 18-step composite (engine 394/394, node 33/33, slice
29/0/10/3, shell 48/0 + L12, board 6/6, falsifiers ALL DIED exit 0, gate-manifest PASS 314/319, numerals
CLEAN ×2/invocation, k2 complete echo, ends "ACCEPTANCE RUN COMPLETE") with the log line shapes from
`receipts/partH-c9/` so a PASS/FAIL can be decided without re-deriving.
DONE MEANS: the schedule posted once, seats cite it instead of re-runing baselines.

---

## Tier B — Claude's colors/engine lane, prepared

**B1. The five-path fence — pinned file table + five-plant proof design.**
WHY: the paths are named verbatim (`claude/path-fence-2026-11-19.md`: `colors/src/core/**`,
`colors/src/sports/nfl/engine/**`, `app/saves.ts · appstate.ts · hydrate/versions/envelope`, `data/**`,
`tools/mathlab/**`) but the fence check is unproven. The Owner's constraint: the check isn't real
until one planted change per line each FAILS it.
WHAT TO PRODUCE (seats write no colors/ bytes; Claude runs them): (a) the pinned table — path → sha256 →
re-verified — re-run against the live architect ref tip (`2dff30b`), folded into the fence doc by Claude;
(b) FIVE planted-change designs, one per line: anchor strings, replacement (minimal, semantically plausible
bugs), expected failure line/style of the by-product check, revert procedure; (c) the scratch-clone
prototype of the check itself (a standalone script — NOT committed to colors/ by seats), dry-tested:
it (i) catches each of the five plants (verified on scratch), (ii) passes the named-clean files untouched,
(iii) misses nothing tracked under the five paths (count the walked set; name the count).
DONE MEANS: the five plants each fail on scratch, receipts pasted; the walked-file count; the check never
names a violation that wouldn't die in the real tree (method: you never run it on colors/; the Architect does).

**B2. Multisport purity — the M1–M6 plans, detailed.**
WHY: the Owner ruled the multisport rethink thinking-only until post-v1.1; the plan exists
(`claude/multisport-purity-plan-2026-11-19.md`); the detail layer (per-module wording, ratchet lists,
probe shapes) is seat-sized, not Architect-sized.
WHAT TO PRODUCE: for M1 (discover sport folders), M2 (registry↔folder consistency), M3 (second-sport canary),
M4 (sport-word ratchet in core), M5 (import-direction graph pinned), M6 (type-level probe): the check's
exact intent, the input, the expected output on today's tree, the failure mode, the footgun (what today's
code accidentally permits), and the pseudocode. The sport-word ratchet list (e.g. football-specific identifiers
in core — enumerate from the bytes, don't invent).
DONE MEANS: one section per M, each with the grep/command to derive the word list; the Architect reorders
without editing seats' prose.

**B3. The item-5/item-6 input pack — vetted under glass.**
WHY: Claude will paste z.ai's hashes against his pre-flight expectations; the cleanest possible input is a
pack the council pre-audited so his ~minute-long verification can't surprise him.
WHAT TO PRODUCE (read-only, scratch): for the two packs (fit2016-2022, fit2023-2025) — row counts, dup IDs,
null columns, sha256 vs the pins on `2dff30b`, the pass-class pair mapping (offense/defense rows per pack),
name/team/position token coverage vs `players.ts` expectations; and a rehearsal of the glm-bar N=300
pre-flight command's parseability (what columns does the output carry? — the recipe landed an optional
JSON-output flag; verify it is documented and parseable, or flag the missing flag — never invent one).
DONE MEANS: clean/dirty verdict per pack with the command; zero content writes.

**B4. R-13 preparation — the four-dashboard slice defined precisely.**
WHY: DS proposed the verdict signature (the four-dashboard slice, never the Draft Board): all five tests
per sealed arm green, L15–L17/F23–F25, zero console errors, no 390 overflow, self-contained bytes + line
counts recorded, no new text — and the statsTable.ts framework-free view model as the hedge that makes R-13
measure shells, not data plumbing. The Architect needs the input ruled in my brief but priced, and the
standing question list needs its evidence pack ready either way the Owner rules.
WHAT TO PRODUCE: (a) the sealed-bench v2 spec — exact screen list, fixture (a seeded draft + season +
playoff run), viewport/reduced-motion matrix, byte-compare procedure, verdict table template; (b) the
statsTable.ts VM type sketch (columns: key, label, align, kind; rows: id, cells, detail) with the badge law
(CAR, RUSHY, PASSY, RECY, SK, PRSS — never SKS) encoded once, flagged for the Architect's layer; (c) the
F1–F3 falsification conditions (timed same-spec build materially faster in Vue; the Owner wants
spreadsheet-class redesign for v1; a required capability missing from the Svelte 5 MIT set) — each with the
measurement plan to discharge it.
DONE MEANS: the spec is one document the Architect adopts as-is or edits in place; no product bytes written.

**B5. The React-removal inventory (R-9) filed ready.**
WHY: whatever R-13 says, React's retirement from `colors/package.json` was filed with R-9; the census needs
to exist before the verdict word.
WHAT TO PRODUCE: every React reference in the colors tree with file · line · nature (dep, devDep, import,
comment); every tooling/doc that assumes it; the expected post-removal `npm test`/`tsc`/`build` outcome
(re-derived from the pin state — never run on the live tree).
DONE MEANS: the census file; the diff of what `git rm` would leave; no changes.

**B6. w89 w87 w85 and the two-file fix — lineage sealed.**
WHY: gh-pages stays/fruition until cutover; the two-file fix stays UNPLACED; the w-waves' lineage from
w87→w89 (dropdown house + recalculated Wins table) is receipts-only away from acceptance; the Owner's
decide-when-cutover path needs the byte story anyway.
WHAT TO PRODUCE: a lineage map — w85 (live)/w87/w89 vs `d3bd81d2` fix zip README contents — with the exact
byte strategy at cutover (what replaces, what stays, one command per file, and the parity check re-run).
No decisions; options only.
DONE MEANS: the map; the Owner can rule cutover in minutes, not meetings.

---

## Tier C — hygiene and the queue, so nothing rots while they work

**C1. Queue hygiene proposal — the dead items, with retire evidence.**
WHY: the live queue has accreted. `node tools/council.mjs board` is the view; retiring needs proof; P0/P1
leaves only with two-seat confirmation (or the Architect's).
WHAT TO PRODUCE: the list of provably-built/superseded queue items from the 2026-11-19 wave (e.g. any
cabepanz-8.1/9 acceptance rows, shipped-package checks now closed by receipts), each with its evidence
(commit + receipt), framed as a proposal to the Architect/MUSE for the retire commands — seats do not
execute P0/P1 retirements unilaterally.
DONE MEANS: the file with the evidence table; zero P0/P1 work erased by a seat alone.

**C2. Cross-reference lint for the three new briefs.**
WHY: my briefs (this file, the z.ai v3, my c9 review/pointer @ 22c4150b/e5a384db) reference MANY paths/shas;
a broken shas in any brief poisons every future fetch.
WHAT TO PRODUCE: every path/ref/sha cited in the three files, re-fetched live this session with PASS/FAIL;
no fix-then-ship without re-noting — corrections come as new commits on this branch with the correction
flagged.
DONE MEANS: zero broken refs; the FAIL list named for the Owner.

**C3. The canonical-host spec (one page, KISS).**
WHY: seven-to-eight hosted copies of the 2026-11-19 c9 package now exist; the Owner blessed inkling +
pickle; the rest are redundant weight in the repo's 2026 wave.
WHAT TO PRODUCE: a one-page canonical-host spec — which host stays canonical for which artifact (package
delivery, per-seat lane files, the zip sha registry, per-sitting manifests), the one-command integrity
check for any future round, and the retirement procedure for the redundant copies (patch-note format for
the seats that host them).
DONE MEANS: the spec; nothing deleted by a seat.

**C4. The closing seal: receipts for the run when z.ai's zip lands.**
WHY: his zip is on a timer; when the fixed zip lands (Part A in it), the council's falsify-board +
gate-manifest + engine/node batteries are cheap to re-run and expensive to take on faith.
WHAT TO PRODUCE (after his delivery, not before): the standing template for the re-verification report —
command list, expected outputs, and the parity checks (Desktop ≡ zip ≡ both hosts; `.gitignore` present;
manifest regenerates clean). One file now; executed on arrival.
DONE MEANS: the template filed; the execution receipts attached when the round closes.

---

## Non-goals (any seat finds themselves writing these, they stop)

- No engine bytes anywhere (`colors/src/sports/nfl/engine/**` is the Architect's; the delivered shell is
  z.ai's to fix only under Part 0).
- No pins, no flex cells, no λ, no BODONI, no labels, no Bodoni, no 2PT, no league-size calibration.
- No gh-pages, no public anything, no w89 copy edits, no review of the Architect's build-by-review.
- No retiring P0/P1 queue items unilaterally; no seat admits/retires itself; no force-push; no stash.
- No ruling on R-13/framework labels/gold2/Q1–Q6/pins/gh-pages/the cutover — rulings route to the Architect
  (who routes to the Owner).
- No fixes by seats into the delivered package; the package is fixed by its owner or under Part 0.
- No invented numbers. Every quoted count/sha is re-measured this session or labeled REPORTED.

## Order of play

A1 → A2 → A8 → A4 → A3 → A6 → A9 → A7 → A5 · B1 → B3 → B4 → B2 → B5 → B6 · C1 → C2 → C3 → C4.
A-items before B-items; a seat may take the next line of any tier without asking; two seats on A1 please
(the tables should agree or the disagree's must be named). If a seat has already filed something that
covers an item better, say so on its item (file the cross-reference) rather than duplicating.

## Receipts and registration

English; verbatim first line `SPEAKER: … | TASK: … | DATE: …`; pushed to your own branch; your branch is
the only branch you push; cite the item ID (A2, B1…) in the commit subject. Nothing ships except git.
The Owner reads; the Architect consumes; nobody launders a REPORTED claim into a VERIFIED verdict.

— INKLING, 2026-11-19T05:59Z. Filed as a relayable order; the Owner may strike any line — striking A8/A1/A2
is permitted without explanation with one consequence: those pieces ride z.ai's sitting instead.
