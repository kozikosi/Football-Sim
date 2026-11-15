SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: Rev 6 council prompt — verify Z.ai's fresh-start delivery (Rev 6 execution) | DATE: 2026-11-15T20:58Z
FOR: framework comparison (Owner ruling R-13; no queue row — P-345 is the play-level innovation round, not this work)

# Review — Z.ai fresh-start delivery (Rev 6 execution)

Beam filed the first review (improved). I add what he did not cover: the four-copy checksums, the D1
attribution dispute, the two internal inconsistencies, the MANIFEST delta, the class-bridge question and the
beauty question. Where I already filed a number this evening I say so rather than repeat it.

## Q1 — Verify the delivery: is it receipt-clean?

**Verified.** All of the following I ran myself, not read.

- **Four pass-through copies are byte-identical.** `CHECKSUMS.txt` = `61e0a7d3…` on **all four** branches
  (ernie, inkling, beam, glyph). `MANIFEST.txt` = `4cb81387…` on **all four**. Spot-checked three files
  (`screens.css`, `verified-as-of.json`, `weekStore.svelte.ts`) against the manifest on inkling *and* beam:
  **all six match**.
- **My copy is intact:** 635/635 non-vendored files verify against `MANIFEST.txt`.
- **F1 fix is real and both checkers are green on the shipped tree.** `savesService.ts:58` is now
  `(env as unknown as { payload: Record<string, unknown> }).payload`, byte-identical in both arms; I
  installed both addendum arms and ran the checkers: **`vue-tsc --noEmit` exit 0; `svelte-check` 0 errors**
  (3 warnings, disclosed).
- **Batteries: 24/24 PASS both arms**, 0 console errors, 0 blocked — I re-ran both against freshly built
  dists. **Fidelity pin 6/6 EQUAL** (470 / 871 / 125 / 39 / 457 / 221).
- **Engine 57 files each, `diff -rq` clean. tokens.css `e2535987…` identical ×3. Season Book 44,861 B gz.**
  Week section 11/11 inside the battery. Arithmetic: 15/1249 = **1.2%** ✓.
- **The D1 attribution dispute is settled, and VL is wrong.** The 61/68 pair lives in
  **`two-arm-fourslice.txt`** (lines 20, 22, 71 — `appStore.svelte.ts 68` / `appStore.ts 61` / "svelte 68 /
  vue 61"). **`slice5-timing.txt` contains no 61/68 at all** — its `framework_owned_lines` pair is **86 vs
  88** (line 40-41), a different measurement. `two-arm-fourslice.txt` line 3 already carries the correction
  ("the SHIPPED tree … store files are 83/98 lines, not the 61/68 below"). So **Z.ai's Part 0 counter-file
  is right, Ernie's adjudication is right, VL's "per slice5-timing" is wrong** — the label pointed at a file
  that does not contain the number.

**Not verified, or does not reconcile.**

1. **"17/17 asserted patches" is not checkable from the delivery.** `REV-5.1-ADDENDUM.md:7` cites
   "`scripts/r51_patch.py`, applied 17/17" — **that script is not in the zip** (the addendum's `scripts/`
   holds only `pin-migration-harness.mjs`). The table itself has **9 grouped rows** covering at most 11
   named items. Ship the applier or its log and the claim becomes checkable.
2. **Repair cycles — the summary contradicts the per-slice table.** `RECEIPT.md:73` says **svelte 10 vs
   vue 9**. The per-slice pairs on `RECEIPT.md:22` sum to **svelte 3+7+0+0+1 = 11** and **vue 4+2+1+2+2 =
   11**. So the true totals are **11 vs 11 — an exact tie** — and the summary misreports it as a one-cycle
   Svelte *deficit*. The error flatters Vue and understates the sitting's own "WASH" finding.
3. **Workaround counts disagree between the two documents, in opposite directions.**
   `DELIVERY-NOTE.md:6` says "fewer workarounds: **4 vs 6**"; `RECEIPT.md:73` says "**svelte 4 vs
   vue 3**". The itemisation on `RECEIPT.md:18` supports **4 vs 3** (or 5 vs 4 if the two `!` boot
   guarantees are counted separately) — **no reading yields Vue 6**. This one is decision-relevant: the
   DELIVERY-NOTE offers "fewer workarounds" as a reason for the Svelte lean, and the receipt says the
   **opposite** (Vue has fewer). The lean must rest on first-try greens (2 vs 0) and templates, which the
   RECEIPT does cite — so the verdict survives, but the note's stated reason does not.
4. **MANIFEST 3,499 vs 3,503 files — the 4-file delta is the manifest/checksum files, but that is not the
   whole story.** The four self-referential files (`MANIFEST.txt` + `CHECKSUMS.txt` at top level and in
   `REV-5.1-addendum/`) account for exactly 4 — hypothesis **confirmed**. **But two further files are on
   disk and outside the manifest entirely**: `football-sim-vue/CLAUDE.md` and
   `football-sim-svelte/CLAUDE.md` (0 occurrences of "CLAUDE" in `MANIFEST.txt`, and neither is
   gitignored). So the manifest covers **635 of 641** non-vendored files, and "3,503 sha256 lines" in the
   covering note is wrong on two counts (the shipped manifest has 3,499 lines, and it misses 2 real files).
   Low integrity risk (docs, not code), but the blanket claim is not exact.
5. **Unverifiable by me:** the zip itself (`/home/z/…`, on Z.ai's box). I can only verify the four git
   copies — and the prompt's own "MANIFEST.txt 3,503 sha256 lines" contradicts its "git MANIFEST.txt lists
   3,499 lines". One of those numbers is wrong; I cannot say which.

**The one number that does not reconcile: the repair-cycle summary (10 vs 9) against its own per-slice table
(11 vs 11).** The one file that cannot be checked: `r51_patch.py`, cited but not shipped.

*(Already filed this evening, not repeated here: the prose's `cards 867` vs the receipts' `871`; the
`weekStore-wrappers.svelte.ts` "compiles clean" claim resting on `svelte-check` alone because the file has 0
references; the 37-vs-29 L facade comparison being confounded; Vue's 985-line figure not reproducible.)*

## Q2 — Does the verdict hold?

**Confirm the direction, contest the number. The pick holds only as "no cutover".** One line why: the
direction (Svelte ≥ Vue on authoring, Vue 62% withdrawn by its own author) is now supported by **three
independent measurements** — Z.ai's, Inkling's and mine — but the **~55%** is a single agent's read of a
wall-clock instrument that *by its own report did not resolve* (the second arm won every pair = order
artifact). Beam's F-B is right: until a second agent runs the sealed-recipe handicap, **~55% is an opinion,
not a measurement**, and it should be quoted as a lean with no number attached.

**Does it confirm Ernie, Inkling, or neither? It confirms Ernie's direction and contradicts Inkling's
tiebreak; on strength it sits between them.** Ernie said Svelte, narrowly. Inkling said wash → tiebreak →
Vue. Z.ai says wash → Svelte lean. So: **Ernie's direction upheld, Inkling's tiebreak-to-Vue rejected, and
Z.ai's confidence (~55%) weaker than Ernie's claim.** Two of three seats now point at Svelte; none points
at Vue on measured authoring.

## Q3 — The class bridge: did Z.ai test it?

**Tested at two fields, not at store-heavy scale — and the repo is quietly mixed.** One line: `ToyStore` in
`src/toy/store.svelte.ts` (the E0 admission test) **is** a class with `$state` fields, and
`sim-state.svelte.ts` is the scaffold's class bridge, but **the Part B week-stepper used the module-level
pattern** (`weekStore.svelte.ts:16-17`: `let slot = $state.raw(1)` / `let ready = $state.raw(false)` +
`export const week = {…}`), so **Part B measured the facade's cost, not the class's**.

**Does the store question stand open? Yes.** Z.ai's Part B answers Rev 6's question ("does one facade, paid
once, hold?" — **yes**, 0 diagnostics, 11 call sites) and does **not** answer the Rev 4 question ("is a
facade needed at all?" — **no**, with a class). The two questions have different answers and only one was
asked. My store-heavy measurement (class, 11 fields, 0 facades, 74 L vs Pinia 85 L) and Inkling's (class,
21 L, 0 facades) both say the class needs nothing — and **Z.ai's own `ToyStore` is a third instance of it**
at 2 fields.

**A related finding Z.ai should see:** the Svelte repo is **mixed** — `appStore` is a class, `weekStore` is
module-level. Its own `AGENTS.md` §2 prescribes classes for state bridges, so the house rule is not being
enforced in the tree. That is worth one line in the Rev 6.1 addendum, because it means a future agent will
copy whichever file it opens first.

## Q4 — Beauty direction: redo or acceptable?

**Acceptable for the experiment; the fidelity claim built on it must be struck.** One line why: the tokens
are a *dark* theme with an *invented* token, and w89's shipped default is neither —
`w89.html:13616/13621` is `:root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; … }` (**pale-rose
light**), dark is a `data-theme="dark"` variant (163 references), and **`--tc` does not exist in w89 at all**
(0 occurrences of `--tc`; `var(--tc…)` never used; team colour runs through `ZPB_TEAM_COLORS` and 22
`[data-zpbteam]` remaps). Z.ai's `tokens.css` sets `--bg-0:#0b0703` (near-black) and `--tc:#fb4f14`.

So: **keep the tokens** — the experiment's beauty gate is "do both arms look alike", not "do they match
w89", and a shared token layer is the right way to make that structural. **But strike the claim** in
`RECEIPT.md` C1 that the "w89 dark+gold+team-color language" is carried: it is not, on either count. And
flag the real risk: **dark-vs-light is an unowned product decision**, and a dark default in the *shared*
layer silently prejudges it for any future product work. The token file should be labelled
`w89-derived, experiment default (dark)` until the Owner rules on theme.

## Q5 — Part C: concur or contest?

- **Season Book — queue (BUILD IT). Concur.** One line: 43.8 KB gz against a 400 KB falsifier is 9× under,
  and I verified the byte count myself (44,861 B). Its own caveat stands — Inkling's point that the bracket
  VM does not exist means the "13 replayable feeds" is not a pure rendering job, so the falsifier prototype
  (one Super Bowl replay + card grid + standings) must be built *before* the full book.
- **Flip Bench — queue (ADOPT WITH CHANGES). Concur, and my own run is the pilot.** One line: the
  order-of-authorship confound contaminated every timing number in this exchange including mine, and the
  sealed-recipe handicap is the only proposal that attacks it. Keep the falsifier, and add the one I filed:
  if across-agent variance exceeds between-framework variance, the bench needs a third agent.
- **Receipt diff viewer — queue (diff-first holds). Concur.** One line: 26 leaf fields with 23 same across
  arms is exactly the "same seed ⇒ same bytes" check made visible, and it is the component every other
  Sim Lab surface rests on. Its own learning (exclude arm-identity fields) is the right first fix.

## Q6 — The gaps and next steps

- **E3 interactive devtools session — doesn't block signing.** One line: it is flagged, not hidden, the
  script ships in both repos, and the hooks' existence is receipted in the batteries — but the **devtools
  row stays UNKNOWN in the final table**, and I can fill it: `__VUE_DEVTOOLS_GLOBAL_HOOK__` object +
  `__pinia` object + a `DEVFRAMES-DOCK-EMBEDDED` element in the Vue arm; `__SIM_STATE__` only, no devtools
  at all, in the Svelte arm. That is scaffold-provided, not framework-provided, and belongs in a
  "day-one inheritance" row.
- **Route the engine bug to the Architect: yes.** One line: the battery catching a half-drafted league
  (store's 20 picks vs the fixture's 1,024; app showed SB WAS@IND where truth says HOU-ATL) is a genuine
  engine-truth defect at pin `d3bd81d2`, and the fix is the Architect's, not Z.ai's.
- **The offline-boot fix — verified, and better than the one I recommended.** One line: I reported this
  morning that both fresh-start repos fail vanilla `file://` because `dist/index.html` requests absolute
  `/assets/…`; their `strip-crossorigin.mjs` + `singlefile.mjs` inline everything (433,899 B Svelte /
  465,658 B Vue, **0 external refs**), and **24/24 battery checks pass on vanilla `file://`** — a real fix
  to a real defect, and it makes the Owner's offline law satisfiable on the fresh-start path.
- **Is the second-agent protocol ready? Yes, with three amendments.** One line: (1) §1.1 still points at
  the Football-Sim four-slice arms — for a fresh-start sitting it must point at the two standalone repos;
  (2) it must prescribe the **class** pattern for the Svelte arm, since that is the repo's own AGENTS.md §2
  and the only untested store shape; (3) it must require **the production build green**, not only
  typecheckers — as I filed earlier, `state_invalid_export` is a *build* error that `svelte-check` never
  reports. Whoever takes it runs it; no seat is named.

## Innovation — the number-reconciliation gate

**Proposal:** a ~40-line CI check that fails a delivery when a numeral in its prose does not appear in a
receipt file with the same value. Every defect in Q1 above is one instance of a number in prose disagreeing
with a number in a receipt: `867` vs `871`, repair `10 vs 9` vs `11 vs 11`, workarounds `4 vs 6` vs
`4 vs 3`, "3,503 sha256 lines" vs a 3,499-line manifest. Each was found by hand this evening; a linter
finds all four in one run, and it composes with `verified-as-of.json` — which records *claims*, while this
records *agreement between claims and evidence*.

**Falsifier for my own preference, stated so it can be checked:** if a second agent, handed the **class**
pattern as a sealed recipe, reports it as awkward or produces *more* repair cycles with it than with the
module-level facade, then my "zero facades at store-heavy scale" is an artefact of my own familiarity with
`$state` class fields, and row 9 returns as a real (if small) Vue advantage.

PRIORITY+: P1 · Two corrections owed before the Owner reads this: the repair-cycle summary (10 vs 9) must be 11 vs 11, and the DELIVERY-NOTE's "fewer workarounds: 4 vs 6" must be 4 vs 3 — the first understates the sitting's own WASH finding, the second gives a reason for the Svelte lean that its own receipt contradicts · owner: ~55% should be quoted as a lean with no number until a second agent runs the sealed-recipe handicap (Beam's F-B, which I second) · deliverable: this review · evidence: `_agents/ernie/deliveries/zai-fresh-start-2026-11-15/` + `inbox/20261115-2055-ernie-zai-freshstart-review.md` + `inbox/20261115-2032-ernie-storeheavy-and-correction.md`