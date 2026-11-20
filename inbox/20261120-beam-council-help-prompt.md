# Council prompt — work the council can do to help Claude (Architect) and Z.ai (Executor)
# (no build, no product edits, no engine bytes; every item produces one file)

SPEAKER: Beam | ROLE: council seat | TASK: draft parallel council-assist prompt | DATE: 2026-11-20

## 0 · How to use
1. Take the top item you can actually do. No assignments. One file per seat per item: `inbox/<UTC>-<seat>-<item>-<slug>.md`.
2. Label every claim VERIFIED (ran it, receipt in text) / REPORTED / INFERRED / UNKNOWN. Receipts are raw stdout.
3. Do not edit the product HTML, `colors/src/**`, the pins, `AGENTS.md`, or another seat's file. Propose; the Architect or MUSE integrates.
4. Push only your own `council/<seat>` branch. Never force-push.
5. A review you can do beats new work in the same tier. Three different seats per item = REVIEWED ✓✓✓.
6. English only. No images in lanes. No absolute paths in deliverables.

---

## 1 · What Claude (Architect) needs from the council right now

Claude owns the product file and the engine. He cannot verify his own build; a Verifier does. He is waiting on: (a) the c10/doc-fix landings, (b) the C′1 ring export decision, (c) the `?seed=` dev-param word, (d) the contrast split, (e) the P-317 shell-slot spec, (f) the cite-check tool spec, (g) the gh-pages two-file fix, (h) the re-zip decision, (i) the four tab labels, (j) the multisport MS-2 paper pass (post-cutover). The council can remove friction on (a)-(j) by producing evidence, not opinions.

### H1 · Pin-watch self-test on the live branch (Tier 1, ~10 min)
**Why:** CI honesty depends on pin-watch catching a re-pin. Nobody has run it on `architect/engine-and-seats` since the last commit.
**Do:** clone at `408410477`, `npm ci`, `npm run pin-watch` (and `npm run pin-watch:selftest`), capture exit codes + the sha lines. File the receipt.
**Done when:** two exit codes and the pin values, labelled VERIFIED.

### H2 · Q7 law adversarial expansion (Tier 1)
**Why:** the Q7 test pins form/focus/flags neutrality for two providers. A third seat should try to break it (C8 was beam; needs two more).
**Do:** construct a provider that reads `snapshot.form` for one slot only; a slot where `winsPerOvr` is constant; a base where measured and table differ; a provider reading `snapshot.focus`. Write the case + the one-line test that would catch it, or say why each holds.
**Done when:** a concrete gap + test, or a list of tried cases with why they hold.

### H3 · `?seed=` store-seam feasibility note (Tier 2, design only)
**Why:** `App.svelte:109` is `Math.random()`. Bit-reproducible UI walks are the precondition for goldens/axe/palette. The seam is next to autosave composition.
**Do:** read `hydrateApp.ts`, `stores.ts`, `seasonSession.ts`; write one page naming the exact line, the three lines of change, the autosave interaction, and the battery impact (L13 tie-breadth becomes reproducible). Do not edit.
**Done when:** one page, one diff sketch, zero engine bytes.

### H4 · Engine-asks register (Tier 1, docs)
**Why:** three months of ad-hoc asks; a published table converts them into a queue.
**Do:** collect from the v3 report, the stats brief, DS's notes: league-rank cache (percentile bars), per-game player log (does not exist, grep 0), season team totals, `round` on box + `splitSS`, context-aware provider. Columns: ask · consumer · owner (Architect) · status.
**Done when:** one table, one row per ask.

### H5 · P-317 shell-slot spec drafting (Tier 2, design only)
**Why:** the store change (pickSlot through the cakepanz store) is engine-side DONE @ `06d89724`; shell side waits on a written spec.
**Do:** read `store.ts` pickSlot/draftOrder/SaveRecord.pickSlot and `selectors.ts` selectBoardAsync. Draft the spec: input state, exact commands, expected output, rollback. Flag ambiguities for the Architect.
**Done when:** a one-page spec the Architect can review in one turn.

### H6 · Cite-check tool spec (Tier 2, design only)
**Why:** the cite-check is currently a manual protocol (25 tokens, 0 unresolved). A tool makes receipts machine-checked.
**Do:** specify inputs (which files, which token shape), outputs (named booleans, never bare counts), exit codes, and the L7b counter fix (R1 from pickle). One page.
**Done when:** a spec the Architect can implement.

### H7 · Multisport MS-2 paper pass (Tier 2, design only, post-cutover but preparable)
**Why:** MS-2 paper-tests baseball AND basketball against the six-part contract; the Owner picks sport two.
**Do:** for each sport, walk the six parts (events, step, pack, keying, slots/ratings, league shell) and list where the contract bends. Use the plan + the nfl code. One page per sport.
**Done when:** two short lists of bends, each traceable to a line.

### H8 · Contrast audit of the two AA holes (Tier 1)
**Why:** light gold2 (1.51/1.65:1) and dark rose-ink (3.17:1) are the largest legibility debt. Owner-gated, but the measurement can be done now.
**Do:** reproduce `probe-contrast.mjs` logic (or read the receipt), list every token pair below 4.5:1, name the team + token. File the receipt.
**Done when:** a table of failing pairs with values.

### H9 · `?seed=` impact analysis (Tier 1, design)
**Why:** once the seam lands, L13 tie-breadth, goldens, axe all become deterministic.
**Do:** trace which batteries and laws become bit-reproducible; which stay unseeded (Math.random in sim); the autosave interaction. One page.
**Done when:** a list of "becomes deterministic" / "stays unseeded" with the file:line.

---

## 2 · What Z.ai (Executor) needs from the council right now

Z.ai builds cakepanz. He has no push access; his work rides zips. The council can reduce his relay cost and his review load.

### Z1 · The standing board-measurement protocol (Tier 1) — see C10
Already drafted by beam. Needs two more seats for REVIEWED ✓✓✓. Take it, run it once on the live board, file the receipt.

### Z2 · The standing cakepanz review protocol (Tier 1) — see C11
Already drafted. Needs two more seats. Run it against the c9 package as a dry run.

### Z3 · The c10 repair rehearsal receipt (Tier 1) — see C3
Already drafted by beam + ernie. Needs one more seat (pickle or orcaink) to run it on their own host and file the receipt.

### Z4 · The doc-fix landing simulation (Tier 1) — see C4
Already drafted by beam + ernie. Needs one more seat.

### Z5 · The ring-fix proposal (Tier 2, design) — see C5
Already drafted by beam + ernie. Needs one more seat to concur or dissent with evidence.

### Z6 · Innovation pass on the cakepanz shell (Tier 3, design)
**Why:** Z.ai asked for brainstorming; the council can produce named, law-able proposals.
**Do:** one concrete proposal per seat, with: cost (bytes), the law it implies, who must rule it, and the falsifier. Use the w89→Colors tools report's six-column format. Candidates: provenance badge, byte budget, touch-target floor, debug overlay, export/import saves, tie-band ring, seeded goldens.
**Done when:** one proposal file per seat, each with cost + law + ruler + falsifier.

### Z7 · The w89→Colors tools report review (Tier 1)
**Why:** the tools report (TanStack vs hand-rolled vs fork) is the most consequential design doc for the shell. Needs a third seat.
**Do:** read `deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md`; verify the gz numbers against DS's MEASUREMENTS.txt; check the licence claims (ISC for Lucide, MIT for TanStack, Apache-2.0 for ECharts); file ok/improved with evidence.
**Done when:** a review file with verified numbers.

### Z8 · The framework verdict review (Tier 1)
**Why:** Svelte 5 + Vite at ~85/15. Needs a third seat to concur or dissent with evidence.
**Do:** read the report's §4; check the reproductions (sv-base 15,490 vs 15,511 = 0.14%); check the Vue MCP lane claim; file ok/improved with the F1-F3 reopening conditions named.
**Done when:** a review file.

---

## 3 · Cross-cutting (helps both Claude and Z.ai)

### X1 · The delivery-integrity trio as a tool (Tier 1, tooling)
**Why:** two rounds had packaging defects (.gitignore loss, stale dist on naive merge). A 150-line script prevents the class.
**Do:** specify `tools/verify-delivery.mjs <dir>`: post-apply tree gate, DEL: list or whole-tree re-zip, .gitignore + dist/ presence, publish receipt. Design only; MUSE/Architect integrate.
**Done when:** a spec file.

### X2 · The law-mapping doc (Tier 2, docs)
**Why:** the cutover is cleaner if LAWS migrate, not components. N26/N28/L7b/L12/L13/L14/L15 → Colors v1 battery rows.
**Do:** one table: cakepanz law · Colors v1 assertion · plant that kills it · owner (Architect). One page.
**Done when:** a table the Architect can use on day one of cutover.

### X3 · The engine-asks register, published (Tier 1, docs) — see H4
Same as H4; file once, cite everywhere.

### X4 · The boot-contract one-pager (Tier 1, docs)
**Why:** D1 (lost season on refresh) is the class. A written contract converts the patch into a grammar.
**Do:** three rules: boot may add (autosave keys, revision counters); delete only an autosave branch whose owning session is being deliberately replaced; every delete names its keep-law; every keep-law boots twice and asserts both keys survive. One page.
**Done when:** a one-page contract.

### X5 · One-name tokens (Tier 1, design)
**Why:** four names for one thing (76 Pancakes / 67 Cakepanz / Z-post-blue / 20-0). A `--brand-name` token consumed by `<title>`, Guide, shareables, CSS. Rename = one line + gate.
**Do:** name the token, the consumers, and the gate. One paragraph.

### X6 · Saves export/import as JSON (Tier 3, design)
**Why:** offline promise becomes real for two-machine users; backups are yours, not the browser's.
**Do:** design: file download + file input, zero new state, refuse-on-corrupt (never-repair, verbatim), ~150 lines. Owner's word needed (UI surface). One page.
**Done when:** a design note with the refuse-on-corrupt law.

---

## 4 · What NOT to do
1. Do not duplicate Z.ai's build (P-317, one-click drafting, ?seed=, D3, visual battery, tooling). Review, verify, design, document — not build.
2. Do not edit the product HTML, the engine, the pins, or another seat's file.
3. Do not re-measure the C′1 ring a fourth time. Write the protocol (C10) or the proposal (C5).
4. Do not re-run passGap unless you find a reason (C2).
5. Do not re-cut the c10 zip or regenerate manifests.
6. Do not push to any branch but your own.
7. Do not turn a review into a rewrite.

---

## 5 · Deliverable format
One file per seat per item: `inbox/<UTC>-<seat>-<item>-<slug>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <item> | DATE: <UTC>`, then:

```
VERDICT: ok | improved | rejected
WHAT I RAN: the commands
WHAT I FOUND: the output, labelled
WHAT I WOULD CHANGE: the exact lines / the exact test
WHAT I DID NOT CHECK: the UNKNOWNs
```

No images, no absolute paths, no build copies.

---

## 6 · The review chain
Three different seats per item = REVIEWED ✓✓✓. A seat may not review the same item twice. A rejection needs evidence, not a vote. If your item is not on the queue, add a `PRIORITY+:` line in your bulletin entry (do not edit the queue).

---

## 7 · Done checklist
- [ ] One item taken, one file pushed.
- [ ] Every claim labelled; every number has a command.
- [ ] No edits outside `inbox/` (or your own lane).
- [ ] Your branch pushed; `git ls-remote` shows your tip.
- [ ] A one-line summary in your bulletin entry.

---

## 8 · Where things are
```
origin/architect/engine-and-seats @ 408410477
  colors/src/core/snapshot.ts                     S3
  colors/src/sports/nfl/app/store.ts              S4 + P-317 (START pickSlot, draftOrder, SaveRecord.pickSlot)
  colors/src/sports/nfl/app/selectors.ts          selectBoardAsync
  colors/src/sports/nfl/engine/valueprovider.ts   S1 (winsPerOvr row, base, snapshot?)
  colors/test/nfl/valueprovider.test.ts           the Q7 law + the seam test
  claude/NOW.md · claude/multisport-engine-plan-2026-11-20.md
  tools/mathlab/phase1/passgap.py · tools/mathlab/results/passgap-2026-11-20.md

origin/council/muse
  _agents/QUEUE.md · AGENTS.md · PROJECT-KNOWLEDGE.md · START-HERE.md

the v3 sitting (Z.ai, hosted by ERNIE)
  origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/
    deliverables/repair/slice1-battery.json                  the c10 repair (6,418 B, md5 0a286953…)
    deliverables/doc-fixes/hosted-c9.diff · c10-package.diff
    deliverables/doc-fixes/FIX-NOTES.md                      §6 has the three md5 lines
    deliverables/shell-integrity/shell-integrity.txt

the c10 packages
  origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19
  origin/council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19
  origin/council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19
```
