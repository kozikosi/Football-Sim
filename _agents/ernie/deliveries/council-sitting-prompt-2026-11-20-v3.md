# Council sitting order v3 — all seats, four tracks (2026-11-20)

**From:** ERNIE (council advisor, MUSE co-delegate), for any seat
**Date:** 2026-11-20T03:50Z
**Supersedes:** v1 (`council-sitting-prompt-2026-11-20.md`, C1–C11) and v2 (`…-v2.md`, C12–C34). It keeps what v2 opened, folds in Beam's H/Z/X register, and **reviews the whole first round** so nobody re-runs a settled check.
**How long:** long on purpose. §1 is the review (read it first); §2 is the corrections; §3 is the work (four tracks, ~35 items); §4–§8 are the rules.

---

## 0 · How to use this order

1. **Read §1 and §2 first.** They say what is settled, what was wrong, and what not to repeat.
2. **Take the top item you can do in the track that matches your seat.** No assignments. One file per seat per item: `inbox/<UTC>-<seat>-<item>-<slug>.md`.
3. **Label every claim** `VERIFIED` (you ran it, receipt in the text) · `REPORTED` · `INFERRED` · `UNKNOWN`.
4. **Receipts are raw stdout.** Commands and their output. "Should work" is not a receipt.
5. **English only.** No images, no absolute paths in deliverables.
6. **Do not edit** the product HTML, `colors/src/**`, the pins, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `claude/NOW.md`, or another seat's file. Propose; the Architect or MUSE integrates.
7. **Push your own branch only** (`council/<seat>`, except MUSE). Never force-push.
8. **Three different seats per item = REVIEWED ✓✓✓.** A review you can do beats new work in the same tier.

---

## 1 · Review of the first round (what is settled, who did it, where they disagree)

### 1.1 The seats' work

| seat | items | verdict | what it added |
|---|---|---|---|
| **Pickle** | plan-M review, 92f87f7e/ed16fd8f/aa4f9b3d verifications, four gates | **improved / verified** | The two-"ruling 4" finding (batch item 4 vs **D18**); N2's exact tilt location; N3's basketball citation (batch item 14/15); the four gates (canary, `npm ci` 430/430 + tsc 89, 390 px phone, smoke); the pickSlot correction (**`06d89724d`**, not `560b8364f`). |
| **Beam** | C1–C11 + the H/Z/X register | **improved / ok** | Five plan-M amendments (extraction commit must not move a seeded hash; basketball paper-pass before baseball code; three missing contract items; a mechanical calibration gate); a 10-item Owner-owes page (adds the gh-pages two-file fix, the contrast split, the cite-check spec, the P-317 shell spec); C10/C11 protocols with exact counts; the H/Z/X register. |
| **Porca** | C1–C11 | **improved / ok** | C3/C4/C9 receipts (agree); C8 found the **same week/season gap** I did and added "the provider list is hand-maintained"; C7 has one wrong path (see §2). |
| **Glyph** | C3, C4, C9 | **ok** | Independent rehearsal and audit; same numbers; adds the per-host missing-vs-failed distinction. |
| **ERNIE** | C1–C11, C13 | **improved / ok** | C1–C11; C13's idempotent landing script (`deliveries/tools/land-c10-repair.sh`), tested on three hosts; the Q7 week gap (C8); the ring proposal (C5); the Owner-owes page (C7). |
| **MUSE** | sweeps | — | Part 0 still open (Z.ai's seat UNKNOWN); the c10/doc-fix landings and the four tabs are Owner actions. |

### 1.2 The three-way agreement (the strongest result of the round)

ERNIE, Glyph and Porca independently ran the c10 repair from `git archive` and got **identical** results:

```
inkling:  48 OK / 1 missing / 51 files -> 49 OK / 0 missing / 52 files
orcaink:  48 OK / 1 missing / 51 files -> 49 OK / 0 missing / 52 files
pickle:   49 OK / 0 missing / 52 files -> unchanged
repair:   6,418 B, md5 0a2869538a706e7e6ea864664b7e5c9f, sha256 3e6476de…
```

ERNIE, Beam, Porca and Glyph independently applied `hosted-c9.diff` and got the same three md5s (`08f30249…`, `aba2f58a…`, `ad1e0a96…`). **The landing is de-risked; it needs one script (C13, done) and one wording fix (C14).**

### 1.3 Where the seats disagree (and who is right)

1. **The engine pin.** Beam's C6 says replace `d3bd81d2` with `4ca9a071`; Beam's C11 uses `d3bd81d2`; the gh-pages README says `4ca9a071`; `PROJECT-KNOWLEDGE.md` says `d3bd81d2`. **Both are right about different trees**: `d3bd81d2` is the Colors engine pin (the 99-rule flex), `4ca9a071` is the 67-cakepanz *snapshot* pin. The review protocol must name which tree it is diffing. → **C29**.
2. **Q7 test.** Beam's C8 says "no concrete gap"; ERNIE's C8 and Porca's C8 both found the **week/season** gap (neutral and loaded share `season`/`week`/`packHash`/`engineVersion`). Two seats vs one: the gap is real, and the fix is `week: 6` in the loaded snapshot. → **C8b**.
3. **The c10 repair destination.** Porca's C7 says "into each host's `batteries/` folder"; the manifest path is `cakepanz-4/deliveries/receipts/`. Porca's C3 receipt uses the right path; its C7 prose does not. → **C14**.
4. **P-316.** Beam's C6 says slice 2 revised; the queue says slice 3 (P-316) queued; the c10 build already has the tooltip + needs. → **C15** (verify against the build).

### 1.4 Corrections to the record (do not repeat the old wording)

- **"Owner ruling 4" is ambiguous** — the 13 Nov batch's item 4 is "Measure first, replace second"; the no-DSL defer is **D18** (`claude/assessments/2026-11-13-master-assessment.md:142`). Cite D18.
- **inkling/orcaink are MISSING a file, not failing a hash** — "48 OK / 1 missing, exit 1".
- **The pickSlot introduction is `06d89724d`** (`560b8364f` is a re-root artifact).
- **Part 0 is REPORTED, not accepted** (Z.ai's seat UNKNOWN, discrepancy §10.4).
- **The passGap table has four last-digit drifts** (0.551/0.965/0.959/0.988 vs the tool's 0.550/0.966/0.958/0.989); the caveat block records both sets.
- **The c10 repair destination is `cakepanz-4/deliveries/receipts/`**, not `batteries/`.

---

## 2 · State of the world (2026-11-20T03:50Z)

- **Architect:** `architect/engine-and-seats` @ `408410477` (S3, S4 + fix, passGap, S1 seam, plan M). Nothing since; the seat timed out.
- **Z.ai:** building v4 (T1 P-317 slot picker — unblocked; T2 one-click; T3 `?seed=`; T4 a11y; T5 battery; T6 tooling; T7 review; T8 ring request).
- **Owner owes:** land the c10 repair, land the doc fixes + three md5 lines, rule the hosted-c9 policy question, confirm the four ALL-CAPS tabs, note the ring export shape, confirm Part 0's word, click the gh-pages two-file fix.
- **Open design:** the ring fix (three proposals), the ratings→gap mapping (post-cutover), plan M (post-cutover, reviewed three times), the cutover definition itself.

---

## 3 · The work — four tracks

Each item: **why** · **what** · **commands** · **done when**. Items are independent. Take one.

### TRACK A — unblock the Architect (H1–H9)

#### A1 · H1 — pin-watch self-test on the live branch
**Why.** CI honesty depends on pin-watch catching a re-pin; nobody has run it since the last commit.
**Do.** Clone at `408410477`, `npm ci`, `npm run pin-watch` and `npm run pin-watch:selftest`; capture exit codes + the sha lines.
**Done when.** Two exit codes and the pin values, VERIFIED.

#### A2 · H2 — Q7 law adversarial expansion
**Why.** The Q7 test pins form/focus/flags neutrality for two providers; two seats found the week/season gap, one did not. Settle it.
**Do.** Read `colors/test/nfl/valueprovider.test.ts` and `valueprovider.ts`; try: a provider reading `snapshot.week`, one reading `form` for one slot, a constant slot, a base where the providers differ. Write the case + the one-line test, or say why each holds.
**Done when.** A concrete gap + test, or a list of tried cases with why they hold. (A2 must state whether it agrees with A8b.)

#### A3 · H3 — `?seed=` store-seam feasibility (design only)
**Why.** `App.svelte:109` is `Math.random()`; bit-reproducible UI walks are the precondition for goldens/axe/palette.
**Do.** Read `hydrateApp.ts`, `stores.ts`, `seasonSession.ts`; write one page: the exact line, the three lines of change, the autosave interaction, the battery impact (L13 tie-breadth becomes reproducible). No edit.
**Done when.** One page, one diff sketch, zero engine bytes.

#### A4 · H4 — engine-asks register (docs)
**Why.** Three months of ad-hoc asks; a published table converts them into a queue.
**Do.** Collect from the v3 report, the stats brief, DS's notes: league-rank cache, per-game player log (grep 0), season team totals, `round` on box + `splitSS`, context-aware provider. Columns: ask · consumer · owner · status.
**Done when.** One table, one row per ask.

#### A5 · H5 — P-317 shell-slot spec (design only)
**Why.** The store side landed at `06d89724d`; the shell side waits on a written spec.
**Do.** Read `store.ts` pickSlot/draftOrder/SaveRecord and `selectors.ts`; draft: input state, exact commands, expected output, rollback; flag ambiguities.
**Done when.** A one-page spec the Architect can review in one turn.

#### A6 · H6 — cite-check tool spec (design only)
**Why.** The cite-check is manual (25 tokens, 0 unresolved); a tool makes receipts machine-checked.
**Do.** Specify inputs (files, token shape), outputs (named booleans, never bare counts), exit codes, the L7b counter fix. One page.
**Done when.** A spec the Architect can implement.

#### A7 · H7 — multisport MS-2 paper pass (design only, post-cutover)
**Why.** MS-2 paper-tests baseball AND basketball against the six-part contract; the Owner picks sport two.
**Do.** For each sport, walk the six parts (events, step, pack, keying, slots/ratings, league shell) and list where the contract bends. One page per sport.
**Done when.** Two short lists of bends, each traceable to a line.

#### A8 · H8 — contrast audit of the two AA holes
**Why.** Light gold2 (1.51/1.65:1) and dark rose-ink (3.17:1) are the largest legibility debt.
**Do.** Reproduce the `probe-contrast.mjs` logic (or read the receipt); list every token pair below 4.5:1, name the team + token.
**Done when.** A table of failing pairs with values.

#### A9 · H9 — `?seed=` impact analysis (design)
**Why.** Once the seam lands, L13 tie-breadth, goldens and axe become deterministic.
**Do.** Trace which batteries/laws become bit-reproducible; which stay unseeded (`Math.random` in sim); the autosave interaction. One page.
**Done when.** A list of "becomes deterministic" / "stays unseeded" with file:line.

### TRACK B — unblock Z.ai (Z1–Z8)

#### B1 · Z1 — run the measurement protocol (C10) once on the live board
**Why.** The protocol exists (Beam, ERNIE); it needs two more seats to run it.
**Do.** Follow C10: build, preview, 1180×900 and 390×320, count rows/ring, check overflow and console errors. File the receipt.
**Done when.** A receipt with the numbers.

#### B2 · Z2 — dry-run the cakepanz review protocol (C11) on the c9 package
**Why.** The protocol exists; a dry run proves it works before Z.ai's zip lands.
**Do.** Run C11's checklist against the c9 package (pin, build, battery, 390 px, console, "can it die", report-vs-artifacts).
**Done when.** A dry-run receipt with the counts.

#### B3 · Z3/Z4 — c10 repair + doc-fix receipts
**Status.** Done by ERNIE, Glyph, Porca, Beam. **Do not re-run.** If you are the named third seat for a reason, say so.

#### B4 · Z5 — ring-fix proposal: concur or dissent
**Why.** Three proposals exist (ERNIE C5, Beam C5, Porca C5); all recommend Contract A (`suggestions`). A seat that has not filed one should concur or dissent with evidence.
**Do.** Read the three; say which is right and why; add anything missing (e.g. the law's exact wording).
**Done when.** A short concurrence or dissent.

#### B5 · Z6 — innovation pass on the cakepanz shell
**Why.** Z.ai asked for brainstorming; the council can produce named, law-able proposals.
**Do.** One proposal per seat: cost (bytes), the law it implies, who must rule it, the falsifier. Candidates: provenance badge, byte budget, touch-target floor, debug overlay, export/import saves, tie-band ring, seeded goldens.
**Done when.** One proposal file per seat with cost + law + ruler + falsifier.

#### B6 · Z7 — review the w89→Colors tools report
**Why.** The most consequential shell design doc; it needs a third seat.
**Do.** Read `deliverables/zai-w89-colors-tools-framework-report-2026-11-19.md` (on pickle's c10 package); verify the gz numbers against DS's `MEASUREMENTS.txt`; check the licence claims (ISC Lucide, MIT TanStack, Apache-2.0 ECharts); file ok/improved.
**Done when.** A review with verified numbers.

#### B7 · Z8 — review the framework verdict
**Why.** Svelte 5 + Vite at ~85/15; a third seat should concur or dissent.
**Do.** Read §4; check 15,490 vs 15,511 (0.14%); check the Vue MCP lane claim; name the F1–F3 reopening conditions.
**Done when.** A review file.

#### B8 · Z9 (new) — the cakepanz battery laws for T1–T3 (write them before Z.ai)
**Why.** If the council writes the laws, Z.ai's T1–T3 and the review are both faster, and the laws cannot be written to pass.
**Do.** T1: the picker exists; the chosen slot is on the clock; the picks land on the chosen team; a save/restore replays the order. T2: the ringed row has a Draft button; one click lands one pick; undo restores. T3: the code is displayed; two loads at one seed are identical; a save/restore keeps the code.
**Done when.** Ten laws, each with a selector and an expected value.

### TRACK C — close the council's own record (C12–C34 leftovers)

#### C12 · Ring-fix adjudication
Three proposals exist; the Architect needs one page. Read ERNIE C5, Beam C5, Porca C5; recommend Contract A or B; write the exact patch and the law. **Do not edit the engine.**

#### C14 · Landing-doc wording fixes
Replace "FAILED" with "missing" in ERNIE's C3 and v1 §3; add the `-p5` alternative; fix Porca's C7 path (`batteries/` → `cakepanz-4/deliveries/receipts/`); use `06d89724d`. One file.

#### C15 · Verify P-316 against the c10 build
The tooltip and the needs selection already exist. Present / absent / partial, line by line; verdict `REVIEWED` or `NOT DONE`.

#### C16 · Run P-315 (chosen team drafts end-to-end)
Two teams (early + late slot), four assertions (on the clock, picks land, CPU picks on, mode lock), receipts.

#### C17 · BoardRow a11y patch
`aria-describedby` on the gone% cell; remove `aria-hidden="true"` or keep the tooltip decorative while the description lives elsewhere; `:focus-visible`. Before/after a11y dump.

#### C18 · The seeded visual battery spec
Assertions, seeds, thresholds (3 ringed rows; one-click lands one; 390 px no scroll; zero console errors; the code matches `?seed=`). Name at least three seeds, including the 60-row one.

#### C19 · One-click drafting interaction spec
Button placement (row vs pick control), label ("Draft {name} at {slot}"), undo one step, keyboard (Tab/Enter or j/k + Enter), the states (idle/hover/focus/picked/undone). Measure w89's affordance vs cakepanz's.

#### C20 · Ratings→gap design note (post-cutover)
Features (QB, receivers, protection vs pass rush, coverage), two formulas, the target distribution (mean 0, sd 0.024, persistence 0.45/0.2), the falsification test, the sign convention. Do not build.

#### C21 · Retrosheet licence check
Read the terms; can the data be redistributed in a shipped product? Attribution? Derived datasets? Quotes + links.

#### C22 · Extend the four gates to cakepanz
Canary (or why it does not apply), `npm ci && npm run build && npm run battery`, the 390 px phone check, and the smoke on the cakepanz build. Four results, labelled.

#### C23 · The smoke tool's stale tab
`tools/post-merge-smoke.mjs:421` lists `tabGuideBtn`; V23 removes the Guide tab. Write the fix; say which build the tool points at.

#### C24 · Part 0 provenance
Search `_agents/owner-notes/`, the v3 report, `claude/NOW.md` for a Part-0 acceptance. Verdict: verbatim / relay only / not found.

#### C25 · The PROJECT-KNOWLEDGE replacement block
Full paste-ready block (state 20 Nov, five commits, pending landings, the ring, the four tabs, the cutover definition), with evidence per line. MUSE integrates.

#### C26 · Cutover risk register
Five risks, ranked, each with evidence, an early warning, and the cheapest mitigation.

#### C27 · item-6 vs passGap consistency note
`s ≈ 0.16` typical vs ±4% at 0.25; what it means for the product (a small, real effect). One page.

#### C28 · The T1–T3 battery laws (see B8)

#### C29 · Snapshot pin reconciliation
`d3bd81d2` (Colors engine) vs `4ca9a071` (67-cakepanz snapshot): which tree, which pin, are the engine files byte-identical, which to use for review. One table.

#### C30 · Owner-owes as a runnable checklist
Turn C7 (ERNIE or Beam) into numbered commands with expected output and a PASS/FAIL per step.

#### C31 · Z.ai order errata
`06d89724d`, the `-p5` note, D18, the missing-vs-failed wording. A short list the Owner can relay.

#### C32 · Review roster for Z.ai's zip
Each seat says `REVIEW: zai-2026-11-20` in its bulletin; the first three are the roster.

#### C33 · Queue hygiene
Propose `PRIORITY+` lines for P-316/P-317; flag DONE items with evidence.

#### C34 · Cutover checklist draft
"Fully functioning Colors v1", item by item, with the current state and a receipt per item.

### TRACK D — cross-cutting (X1–X6)

#### D1 · X1 — the delivery-integrity tool (spec)
`tools/verify-delivery.mjs <dir>`: post-apply tree gate, DEL list or whole-tree re-zip, `.gitignore` + `dist/` presence, publish receipt. Three rounds had a packaging defect; a 150-line script prevents the class. Design only.

#### D2 · X2 — the law-mapping doc
One table: cakepanz law · Colors v1 assertion · the plant that kills it · owner. Candidates: N26, N28, L7b, L12, L13, L14, L15.

#### D3 · X3 — the engine-asks register (same as A4)

#### D4 · X4 — the boot-contract one-pager
Three rules: boot may add (autosave keys, revision counters); delete only an autosave branch whose owning session is being deliberately replaced; every delete names its keep-law; every keep-law boots twice and asserts both keys survive.

#### D5 · X5 — one-name tokens
Four names for one thing (76 Pancakes / 67 Cakepanz / Z-post-blue / 20-0). Name the `--brand-name` token, the consumers (`<title>`, Guide, shareables, CSS), and the gate. One paragraph.

#### D6 · X6 — saves export/import as JSON (Tier 3)
File download + file input, zero new state, refuse-on-corrupt (never repair, verbatim), ~150 lines. Owner's word needed. One page with the refuse-on-corrupt law.

---

## 4 · What NOT to do

1. **Do not re-run a settled check** (the c10 repair, the doc-fix md5s, passGap, 430/430, the four gates) unless you are the named third seat with a reason.
2. **Do not edit** the product HTML, `colors/src/**`, the pins, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `claude/NOW.md`, or another seat's file.
3. **Do not build** the ring fix, the ratings→gap mapping, or any multisport code. Propose.
4. **Do not re-measure the C′1 ring by hand.** Write the spec (C18) or the proposal (C12).
5. **Do not push** to any branch but your own. Never force-push.
6. **Do not turn a review into a rewrite.** Cite the line.

---

## 5 · Deliverable format

`inbox/<UTC>-<seat>-<item>-<slug>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <item> | DATE: <UTC>`, then:

```
VERDICT: ok | improved | rejected | N/A
WHAT I RAN: the commands
WHAT I FOUND: the output, labelled
WHAT I WOULD CHANGE: the exact lines
WHAT I DID NOT CHECK: the UNKNOWNs
```

No images, no absolute paths, no build copies.

---

## 6 · The review chain

- Three **different** seats per item = **REVIEWED ✓✓✓**. A seat may not review the same item twice.
- A rejection reopens the item and needs the evidence.
- The queue is `origin/council/muse:_agents/QUEUE.md`; propose with `PRIORITY+:` in your bulletin entry.

---

## 7 · Done checklist

- [ ] One item taken, one file pushed.
- [ ] Every claim labelled; every number has a command.
- [ ] No edits outside `inbox/`.
- [ ] Your branch pushed; `git ls-remote` shows your tip.
- [ ] A one-line summary in your bulletin entry.

---

## 8 · Where things are

```
origin/architect/engine-and-seats @ 408410477
  colors/src/core/snapshot.ts · envelope.ts · keyedrng.ts · pack.ts
  colors/src/sports/nfl/app/store.ts (pickSlot, draftOrder, SaveRecord)
  colors/src/sports/nfl/app/selectors.ts · colors/src/sports/nfl/engine/valueprovider.ts
  colors/src/sports/nfl/sim/passclass.ts · drive.ts:tilt (50-51, gap :78, use :93)
  colors/src/sports/nfl/view/draftBoard.ts (:53 sort, :61 strip)
  colors/test/nfl/valueprovider.test.ts (Q7)
  claude/NOW.md · claude/multisport-engine-plan-2026-11-20.md
  claude/assessments/2026-11-13-master-assessment.md (D18)
  claude/rulings/2026-11-13-owner-decisions-multisport-batch.md
  tools/mathlab/phase1/passgap.py · tools/mathlab/results/passgap-2026-11-20.md
  tools/post-merge-smoke.mjs:421 (tabGuideBtn)

origin/council/muse   _agents/QUEUE.md · PROJECT-KNOWLEDGE.md · START-HERE.md
origin/council/ernie  inbox/20261120-0332…0344 (C1–C11, C13) ·
                      deliveries/council-sitting-prompt-2026-11-20-v3.md ·
                      deliveries/tools/land-c10-repair.sh
origin/council/pickle inbox/20261120-0235…0345 (plan-M, four gates)
origin/council/beam   inbox/20261120-beam-* (C1–C11, the H/Z/X register)
origin/council/porca  inbox/20261120-0328…0333 (C1–C11)
origin/council/glyph  inbox/20261120-0326…0333 (C3, C4, C9)

the v3 sitting (hosted by ERNIE)
  _agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/
    deliverables/repair/slice1-battery.json
    deliverables/doc-fixes/hosted-c9.diff · c10-package.diff · FIX-NOTES.md
```

**Commands**

```
git fetch -q origin
git archive <ref> <path> | tar -x -C <scratch>
md5 -q <file>                 # macOS; md5sum -c needs a while-read loop
shasum -a 256 <file>
patch -p1 --dry-run < <diff>  # from the archive root; -p5 from the c9 subtree root
sh land-c10-repair.sh <c10-root> <repair>   # ERNIE's C13 script
```

**End of order v3.**