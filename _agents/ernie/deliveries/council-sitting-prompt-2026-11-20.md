# Council sitting order — parallel work while Z.ai builds (2026-11-20)

**From:** ERNIE (council advisor, MUSE co-delegate), for any seat
**Date:** 2026-11-20T03:20Z
**Why this exists:** Z.ai is building (order `deliveries/zai-next-sitting-prompt-2026-11-20.md`). The council's job while he works is the work only the council can do: **review, verify, design, and prepare the decisions**. None of it duplicates his build; all of it produces a file.
**Length:** long on purpose. Read §1 (state) and §3 (not-do) before you start; §2 is the work.

---

## 0 · How to use this order

1. **Take the top item you can actually do.** There are no assignments. Do one, push it, and the next seat takes the next.
2. **One file per seat per item:** `inbox/<UTC>-<seat>-<item>-<slug>.md`. Never edit another seat's file; append a reply in your own.
3. **Label every claim** `VERIFIED` (you ran it, receipt in the text) · `REPORTED` · `INFERRED` · `UNKNOWN`.
4. **Receipts are raw stdout.** A command and its output. "It should work" is not a receipt.
5. **English only.** No images in lanes.
6. **Do not edit** the product HTML, `colors/src/**`, the pins, `AGENTS.md`, or another seat's lane. Propose; the Architect or MUSE integrates.
7. **Push your own branch** (`council/<seat>`). Never force-push. If a push is rejected, stop and run `node tools/preserve.mjs snapshot`.
8. **A review you can do beats new work in the same tier.** If an item already has two reviews, a third is welcome; a fourth seat should take the next item.

---

## 1 · State of the world (verified 2026-11-20T03:20Z)

### 1.1 The Architect's branch — `architect/engine-and-seats` @ `408410477`

| commit | what | status |
|---|---|---|
| `da0cf927` | S3 context snapshot + S4 async twins | **VERIFIED** by ERNIE (427/427, 89/89; 421/421 at parent) |
| `92f87f7e` | `dispatchAsync` poisoning fix | **VERIFIED** by ERNIE + Pickle (428/428; test dies without the fix) |
| `ed16fd8f` | passGap study (report-only) | **VERIFIED** by ERNIE (full re-run) + Pickle (four rounding nits) |
| `aa4f9b3d` | S1 seam: `winsPerOvr(row, base, snapshot?)` + Q7 test | **VERIFIED** by ERNIE (430/430, 89/89) + Pickle |
| `408410477` | multisport plan M (docs only) | read, not yet reviewed by the council |

### 1.2 The build in flight

Z.ai's order (T1–T8): P-317 slot picker, one-click drafting, `?seed=` + visible code, D3 a11y, the seeded visual battery, three tooling items, a review file, the ring request. His deliverable will be a zip; the Owner relays it.

### 1.3 Open and owned elsewhere (do not duplicate)

| item | owner |
|---|---|
| c10 repair landing on inkling/orcaink (one file) | Owner |
| the three stale doc lines + the three md5 lines | Owner |
| C′1 ring export shape | Architect |
| ratings→gap mapping; context-aware provider | Architect, post-cutover |
| multisport build | Architect, post-cutover |

---

## 2 · The work

Each item: **why** · **what to do** · **commands** · **done when** · **evidence to cite**. Items are independent; any seat can take any item.

### C1 · Design review of the multisport plan M  *(the biggest open design question)*

**Why.** `claude/multisport-engine-plan-2026-11-20.md` (docs only) proposes: kernel + thin sport modules, the **rule of two**, baseball as sport two, basketball/hockey as sport three, phases MS-0..7, and a six-part sport contract. It has not been reviewed by the council. A design review now is cheap; after MS-3 it is expensive.

**Do this.**
1. Read the plan and the code it cites: `colors/src/core/` (845 lines: events, fold, keyedrng, pack, snapshot, envelope/saver/profile, hungarian, pmath) and `colors/src/sports/nfl/{engine,sim,app,view}`.
2. Answer, with evidence:
   - Is the **rule of two** the right threshold? What would a *premature* extraction look like, and does the plan's defence (one commit per extraction, both suites green) actually prevent it?
   - Is **baseball** the right sport two? The plan's reasons are structural cousinliness and free play-by-play. What does a cousin *under*-test, and is the sport-three contrast (continuous flow, lineup interaction) enough to catch it?
   - Is the **six-part contract** complete? Name what is missing (candidates: a11y, save migration, data licence, a "no sport words in core" ratchet, a deterministic replay law, a performance budget).
   - Is the **admission checklist** (10 items) sufficient? Which item is weakest, and what would make it mechanical rather than a judgement call?
   - Does the **additive-logit hypothesis** survive contact with baseball's matchup method, and what is the first thing that would falsify it?
   - Is the **phase order** right? Is MS-1 (purity checks) correctly before MS-2 (paper pass), and does anything need to move?
3. File `inbox/<UTC>-<seat>-multisport-plan-review.md` with a verdict `ok` / `improved` and **at most five concrete amendments**, each with the sentence to change and why.

**Done when:** a verdict and ≤5 amendments exist, each traceable to a line of the plan or a file in the repo. **Do not build anything.**

### C2 · Review the passGap study as a *decision* document  *(not a re-run)*

**Why.** The numbers are verified twice (ERNIE, Pickle). What is not yet reviewed is whether the **decision** that rests on them is right: product stays λ=0, GLM off; the open item is the ratings→gap mapping; the post-cutover fit should match the measured distribution.

**Do this.**
1. Read `tools/mathlab/results/passgap-2026-11-20.md` and `claude/NOW.md`.
2. Answer:
   - Is **λ=0 with GLM off** the right call *given* a repeatable tilt exists? What would have to be true to turn it on, and is the report's "unmeasured mapping" reason sufficient?
   - Is the **post-cutover fit spec** ("match mean 0, sd ≈ 0.024, and the 0.45/0.2 persistence") testable as written? What exactly would be fit, against what target, and what would falsify it?
   - Does the **θ-dependence** caveat fully protect the number from being read as a constant? Is there a sentence the report still needs?
   - Does anything in the study conflict with the **item-6** scale (s=±0.25 → points ±4%) or with the **Owner's 18 Nov** ruling (ship first)?
3. File `inbox/<UTC>-<seat>-passgap-decision-review.md`, verdict + ≤5 points.

**Do not re-run the study.** If you find a reason to, fetch fresh data (Beam's local copy is the stale 12 Nov revision) and say why in the file.

### C3 · Rehearse the c10 repair on a scratch copy  *(de-risks the Owner's landing)*

**Why.** The Owner must add one file to inkling and orcaink (both 48/49). The fix is one file (6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, sha256 `3e6476de…`), and it is in Z.ai's v3 zip at `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json`. A rehearsal turns "should work" into a receipt the Owner can follow.

**Do this.**
1. Extract each host to a scratch dir (never the shared tree):
   - `origin/council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19`
   - `origin/council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19`
2. Run `md5sum -c CHECKSUMS.txt` **before** (expect 48 OK / 1 FAILED, the failure being `…/cakepanz-4/deliveries/receipts/slice1-battery.json`).
3. Copy the repair file to the manifest's path.
4. Run the check **after** (expect **49 OK / 0 FAILED, 52 files**).
5. Record the exact commands and output; note the file count and the path.
6. Do the same for `origin/council/pickle` as a control (49 OK before and after; 52 files).

**Done when:** a file with the four command blocks and their raw output, and a one-line "the Owner can run these three commands" recipe. **Do not commit to the hosts.** Scratch only.

### C4 · Verify the doc-fix end to end, on the third host  *(the landing simulation)*

**Why.** The doc fixes touch three files in two byte-states. ERNIE verified both diffs apply and reproduce the delivered after-files; Pickle verified the c10 side. What is not yet verified is the **hosted c9** side on a fresh checkout, and whether the three replacement md5 lines in `FIX-NOTES.md` §6 are the ones a landing will produce.

**Do this.**
1. Extract `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19` (the hosted c9).
2. Apply `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff` with `patch -p1` from the c9 subtree root (the diff is rooted at `_agents/pickle/…`, so `-p1` from the parent works; `-p5` from the subtree root works too).
3. `md5` the three files; compare with FIX-NOTES §6 (`08f30249…`, `aba2f58a…`, `ad1e0a96…`).
4. Also check the two **byte-true** copies (inkling's and orcaink's own c9 trees): the sentence is true there, so they should be left alone. Confirm by measuring both dists in each (`670d4c08…` in both trees) and saying so.
5. File the receipt.

**Done when:** three md5s match FIX-NOTES §6 (or a discrepancy with the numbers), and the two byte-true copies are named with their measurements.

### C5 · Write the ring-fix proposal the Architect can apply  *(design, not build)*

**Why.** The ring is the most user-visible open defect, and it is blocked on an engine-view decision. The council can reduce that decision to one page: the contract, the view-side change, the battery law, and the migration.

**Do this.**
1. Read the root cause: `draftBoard.ts:61` (strips `_w`/`_p`) and `:53` (sorts on them); the component parse at `DraftBoard.svelte:38-47` on `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/`.
2. Write the two candidate contracts side by side:
   - **A (Pickle):** the engine view returns `suggestions: { ids, rankedBy, cutoffRaw, reason }`; the component renders a fact.
   - **B (minimal):** one generic `rawSort: number` on `BoardRowVM`, set by the view; the component ranks on it.
   - For each: the exact files, the exact fields, what breaks, and what the battery law becomes.
3. State which you would build against and why (one paragraph).
4. Include the **non-tautological law** (ERNIE's I29 / Pickle's S2): the ring must equal the first three by the raw key plus the ties at the third, computed by re-running the engine's sort on raw values — never by parsing the DOM.
5. File `inbox/<UTC>-<seat>-ring-fix-proposal.md`. Do not edit the engine.

**Done when:** one page, two contracts, one recommendation, one law. **The Architect decides; you propose.**

### C6 · Propose the PROJECT-KNOWLEDGE.md update  *(the council's doc, MUSE integrates)*

**Why.** The live project has moved a lot since PROJECT-KNOWLEDGE.md was last rewritten: the framework is decided (Svelte 5 + Vite 8), Part 0 is accepted, S3/S4/S1 landed, passGap is a report-only study, multisport plan M is docs-only, and the c10/doc-fix landings are pending. A stale knowledge file is how the next seat starts from a false premise.

**Do this.**
1. Read the current `PROJECT-KNOWLEDGE.md` from `origin/council/muse` and list every line that is now false or stale.
2. Write the replacement lines (not the whole file — the diff), each with the evidence (commit, date, command).
3. File `inbox/<UTC>-<seat>-project-knowledge-update.md`. MUSE owns the file; your file is the proposal.

**Done when:** a list of stale lines with exact replacements. **Do not edit `PROJECT-KNOWLEDGE.md` yourself.**

### C7 · One page: everything the Owner owes  *(a single list, not five)*

**Why.** The last three sittings left Owner actions scattered across reports: land the c10 repair, land the doc fixes + three md5 lines, rule the hosted-c9 policy question (three byte-true copies; one edited), the four ALL-CAPS tab strings, and the ring export decision. A single page is the difference between "the Owner does it" and "everyone assumes someone did".

**Do this.**
1. Collect every open Owner action from: the v3 sitting report, Z.ai's order §5, the passGap report's decision block, and the c10/doc-fix files.
2. For each: what it is, the exact command or file, what it unblocks, and the risk of not doing it.
3. File `inbox/<UTC>-<seat>-owner-owes-2026-11-20.md`. Keep it to one page.

**Done when:** one page, one line per action, each with a command or a path.

### C8 · Third-seat check on the Q7 test  *(the seam's weakest point)*

**Why.** The Q7 law is pinned by one test that asserts measured and table providers return identical values for neutral and loaded snapshots, every slot and base. A third seat should try to break it: is there a provider or a slot where the test would pass while the law is violated?

**Do this.**
1. Read `colors/test/nfl/valueprovider.test.ts` (the two new tests) and `colors/src/sports/nfl/engine/valueprovider.ts`.
2. Try to construct a failing case: a provider that reads `snapshot.form` for one slot only; a provider that reads `snapshot.focus`; a slot where `winsPerOvr` is constant so the test cannot tell; a base where the two providers differ.
3. If you find one, write the case and the one-line test that would catch it. If not, say so and say what you tried.
4. File `inbox/<UTC>-<seat>-q7-test-review.md`.

**Done when:** either a concrete gap + a test, or a list of the cases you tried and why they hold.

### C9 · Pre-landing integrity audit of the c10 package  *(the last gate before the Owner lands)*

**Why.** Three rounds had a packaging defect. A single audit that checks every host, every count and every hash is the cheapest way to make the landing uneventful.

**Do this.**
1. For each host (pickle, inkling, orcaink), from a fresh `git archive`, report: file count, CHECKSUMS entries, OK/FAILED counts, and the presence of `…/cakepanz-4/deliveries/receipts/slice1-battery.json`.
2. Report the dist state of each tree (`cakepanz-4` and `cakepanz-4-prepared`): sha256 + bytes, and whether the two trees match.
3. Confirm the package's nested c9 copy vs the standalone hosted c9 (pickle) are different trees with different dists (`76de5658…` vs `670d4c08…`) — and that this is expected, not a defect.
4. File `inbox/<UTC>-<seat>-c10-landing-audit.md` with a table and a go/no-go line.

**Done when:** a table with every host, every count, every hash, and one line: "safe to land" or "do not land because …".

### C10 · Write the standing "how to measure the board" protocol  *(so no one re-derives it)*

**Why.** Three seats measured the ring three different ways (rows, ringed, viewports) and the measurements agreed only after the method was written down. A protocol page makes the next measurement a lookup, not a research project.

**Do this.**
1. Write the protocol: build, preview, the two viewports (1180×900, 390×320), the fixed seed, what to count (`.cp-row`, `.cp-suggest`, the ring contiguity, the pick counter), and the zero-console-error check.
2. Include the exact Playwright/agent-browser commands you would use, and the pass thresholds.
3. File `inbox/<UTC>-<seat>-board-measurement-protocol.md`.

**Done when:** a page another seat can follow without asking a question.

### C11 · Standing review protocol for Z.ai's incoming zip  *(prepare it now, use it when it lands)*

**Why.** The cakepanz slices are reviewed the same way every time (P-314/P-316): snapshot byte-identical to the pin, battery green, boundaries, 390 px, zero console errors. Write it down once; then three seats can review the new zip without inventing a method.

**Do this.**
1. Write the checklist: (a) the snapshot/engine files byte-identical to the pin (name the pin and the command); (b) `npm run build` clean; (c) the battery PASS with the counts; (d) 390 px no horizontal scroll; (e) zero console errors; (f) the new laws actually fail without the change (the "can it die" test); (g) the README/report matches the artifacts.
2. Say what a **reject** looks like vs an **improve**.
3. File `inbox/<UTC>-<seat>-cakepanz-review-protocol.md`.

**Done when:** a checklist the next three reviewers can run verbatim.

---

## 3 · What NOT to do

1. **Do not duplicate Z.ai's build.** He owns the cakepanz changes in flight. Review, verify, design, document — not build.
2. **Do not edit the product HTML, the engine, the pins, or another seat's file.**
3. **Do not re-measure the C′1 ring a fourth time.** Three measurements exist. Write the protocol (C10) or the proposal (C5) instead.
4. **Do not re-run passGap** unless you find a reason (C2); if you do, fetch fresh — Beam's copy is the stale 12 Nov revision.
5. **Do not re-cut the c10 zip** or regenerate its manifests.
6. **Do not push to any branch but your own.**
7. **Do not turn a review into a rewrite.** If you think a line is wrong, say which line and why; the owner of the file decides.

---

## 4 · Deliverable format

One file per seat per item: `inbox/<UTC>-<seat>-<item>-<slug>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <item> | DATE: <UTC>`, then:

```
VERDICT: ok | improved | rejected        (reviews)
WHAT I RAN: the commands
WHAT I FOUND: the output, labelled
WHAT I WOULD CHANGE: the exact lines / the exact test
WHAT I DID NOT CHECK: the UNKNOWNs
```

No images, no absolute paths, no build copies.

---

## 5 · The review chain

- Three **different** seats per item = **REVIEWED ✓✓✓**. A seat may not review the same item twice.
- A rejection reopens the item; the rejection needs the evidence, not a vote.
- Reviews are files; the queue is `origin/council/muse:_agents/QUEUE.md`. If your item is not on the queue, add a `PRIORITY+:` line in your bulletin entry (do not edit the queue).

---

## 6 · Done checklist

- [ ] One item taken, one file pushed.
- [ ] Every claim labelled; every number has a command.
- [ ] No edits outside `inbox/` (or your own lane).
- [ ] Your branch pushed; `git ls-remote` shows your tip.
- [ ] A one-line summary in your bulletin entry.

---

## 7 · Where things are

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

Z.ai's order (for context, not yours to do)
  origin/council/ernie:_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md
```

**Commands you will need**

```
git fetch -q origin
git archive <ref> <path> | tar -x -C <scratch>          # never the shared tree
md5 -q <file>            # macOS; `md5 -c` is silent on failure
shasum -a 256 <file>
patch -p1 --dry-run < <diff>                            # then without --dry-run
```

**End of order.**