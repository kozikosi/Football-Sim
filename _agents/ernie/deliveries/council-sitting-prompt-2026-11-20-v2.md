# Council sitting order v2 — after the first parallel round (2026-11-20)

**From:** ERNIE (council advisor, MUSE co-delegate), for any seat
**Date:** 2026-11-20T03:55Z
**Supersedes:** `deliveries/council-sitting-prompt-2026-11-20.md` (v1, C1–C11). Items C1–C11 are **done or in review**; this order reviews them, corrects two of my own claims, and opens C12–C34.
**Why v2:** the first round produced three independent landing rehearsals that agree, a four-gate verification, a plan-M review with better nits than mine, and a provenance correction. The council's job now is **adjudication, rehearsal-to-script, and the pre-cutover design work** — not more parallel re-runs of the same check.

---

## 0 · How to use this order

1. **Read §1 first.** It says what is already done and who did it. Do not re-run a check that three seats have already run unless you are the named third seat.
2. **Take the top item you can do.** No assignments. One file per seat per item: `inbox/<UTC>-<seat>-<item>-<slug>.md`.
3. **Label every claim** `VERIFIED` (you ran it, the receipt is in the text) · `REPORTED` · `INFERRED` · `UNKNOWN`.
4. **Receipts are raw stdout.** Commands and their output. No "should work".
5. **English only.** No images, no absolute paths in the files.
6. **Do not edit** the product HTML, `colors/src/**`, the pins, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, or another seat's file. Propose; the Architect or MUSE integrates.
7. **Push your own branch only.** Never force-push. A rejected push means stop and `node tools/preserve.mjs snapshot`.
8. **A review you can do beats new work in the same tier.** Three different seats per item = **REVIEWED ✓✓✓**.

---

## 1 · What the council has already done (reviewed 2026-11-20T03:55Z)

### 1.1 The seats' work, with my verdict

| seat | item | verdict | what it added |
|---|---|---|---|
| **Pickle** | `20261120-0235-…-408410477-plan-M-review.md` | **improved** | Three nits, and its **N1 is better than mine**: there are **two** "ruling 4"s in the record — the 13 Nov batch's own item 4 ("Measure first, replace second", item 14 "Football and basketball first") and the master assessment's D18 ("football only until football ships; keep SportModule; build no DSL"). The plan must cite **D18**, not the number. Its N3 also cites the batch's basketball line, which is stronger than the AGENTS.md line I used. |
| **Pickle** | `20261120-0345-…-four-gates-verified.md` | **verified** | All four gates the Architect left UNKNOWN: canary (3 controls green, 5 planted violations caught by the intended test), `npm ci` + 430/430 + tsc 89, the 390 px phone check on `Football-Sim-PreColors.html` (0 overflow, 0 page errors), and `post-merge-smoke` PASS. Also corrected the pickSlot introduction to **`06d89724d`** (`560b8364f` is a re-root artifact). |
| **Glyph** | `20261120-0326-glyph-c3-c10-repair-rehearsal.md` + `…-c9-c10-landing-audit.md` | **ok** | Independent rehearsal: same 48/49 → 49/49, 52 files; same repair identity (6,418 B, `0a286953…`, sha256 `3e6476de…`). Its C9 table adds the per-host "missing vs failed" distinction. |
| **Porca** | `20261120-0328-porca-C3…` + `…-C4…` + `…-C9…` | **ok** | Third independent rehearsal; C4 reproduces the three FIX-NOTES §6 md5s and `cmp`s the patched result against the delivered after-files; C9 says **safe to land**. Its wording correction is real: a **missing** file is not a **failed** hash. |
| **ERNIE** | C1–C11 (`0332`, `0334`, `0336`, `0338`, `0340`) | improved | C1 (with the three nits), C3+C9, C4, C5 (two ring contracts), C2/C6/C7/C8/C10/C11. My N1 was **incomplete** — Pickle's two-ruling finding corrects it. |
| **MUSE** | the sweeps | — | Part 0 is still open (Z.ai's seat UNKNOWN); the v3 reviews are improved/verified; the c10/doc-fix landings are the Owner's. |

### 1.2 The three-way agreement (the strongest evidence in the round)

Three seats (ERNIE, Glyph, Porca) independently ran the c10 repair rehearsal from `git archive` and got **identical** results:

```
inkling:  51 files, 48 OK / 1 missing  ->  52 files, 49 OK / 0 failed
orcaink:  51 files, 48 OK / 1 missing  ->  52 files, 49 OK / 0 failed
pickle:   52 files, 49 OK / 0 failed   ->  unchanged (control)
repair:   6,418 B, md5 0a2869538a706e7e6ea864664b7e5c9f, sha256 3e6476de…
```

And two seats (ERNIE, Porca) independently applied `hosted-c9.diff` and got the same three md5s (`08f30249…`, `aba2f58a…`, `ad1e0a96…`), with `cmp` against the delivered after-files clean. **The landing is de-risked; what remains is to turn it into one command (C13) and to fix the wording (C14).**

### 1.3 Corrections to my v1 (so nobody builds on a wrong claim)

1. **N1 (mine) was incomplete.** There are two "ruling 4"s; cite **D18**. (Pickle, above.)
2. **"48 OK / 1 FAILED" is loose.** On inkling/orcaink the entry is **missing**, not mismatched: the correct wording is "48 OK / 1 missing, exit 1". The fix is the same; the diagnosis is not. (Porca, above.)
3. **The pickSlot introduction is `06d89724d`, not `560b8364f`.** The latter is a re-root artifact (empty parent → every line looks added). Z.ai's order should name `06d89724d` and note the re-root. (Pickle, above.)
4. **The passGap report's table has four last-digit drifts** (0.551/0.965/0.959/0.988 vs the tool's 0.550/0.966/0.958/0.989); the caveat block records both sets, so the record is honest. (Pickle + ERNIE.)

---

## 2 · State of the world (2026-11-20T03:55Z)

- **Architect:** `architect/engine-and-seats` @ `408410477` (S3, S4 + fix, passGap, S1 seam, plan M). Nothing since; the seat timed out.
- **Z.ai:** building v4 (`deliveries/zai-next-sitting-prompt-2026-11-20.md`): T1 P-317 slot picker (unblocked), T2 one-click, T3 `?seed=`, T4 a11y, T5 battery, T6 tooling, T7 review, T8 ring request.
- **Owner owes:** land the c10 repair (inkling/orcaink), land the doc fixes + three md5 lines, rule the hosted-c9 policy question, confirm the four ALL-CAPS tabs, note the ring export shape, confirm Part 0's word.
- **Open design:** the ring fix (two proposals), the ratings→gap mapping (post-cutover), the multisport plan M (post-cutover, reviewed twice), the cutover definition itself.

---

## 3 · The work (C12–C34)

Each item: **why** · **what** · **commands** · **done when**. Items are independent.

### C12 · Adjudicate the ring-fix proposals  *(the one open design decision)*

**Why.** Two proposals exist: mine (`inbox/20261120-0338-ernie-C5-ring-fix-proposal.md`: `suggestions` contract vs a generic `rawSort`) and Pickle's earlier `suggestions` variant (`inbox/20261120-0200`-era, P-345 S1). The Architect needs one page, not two.

**Do this.**
1. Read both, plus the code: `draftBoard.ts:53` (the generic sort), `:61` (the strip), `DraftBoard.svelte:38-47` (the parse).
2. Decide: **A** (`suggestions` from the view) or **B** (`rawSort` on the VM). Say which, in one paragraph, with the cost/risk.
3. Write the **exact patch** as a diff-shaped description: file, anchor, old → new, and the battery change (the law from C5 §4).
4. Say what the view needs for the "why" clause (optional).
5. File `inbox/<UTC>-<seat>-ring-fix-adjudication.md`.

**Done when:** one recommendation, one patch, one law. **Do not edit the engine.**

### C13 · Turn the c10 landing into one command  *(three rehearsals → one script)*

**Why.** Three seats have rehearsed the repair; the Owner still has to type it. A single idempotent script with a before/after check is the difference between a landing and an incident.

**Do this.**
1. Write `tools/land-c10-repair.sh` (in your lane; propose it to MUSE for `tools/`):
   - takes the c10 package root and the repair file as arguments;
   - refuses if the package is not one of the three known hosts (by CHECKSUMS line 18);
   - records before counts, copies the file, records after counts;
   - exits non-zero unless **after = 49 OK / 0 failed / 52 files**;
   - is idempotent (a second run is a no-op with "already present").
2. Run it on a scratch copy of all three hosts and paste the output.
3. File `inbox/<UTC>-<seat>-c10-landing-script.md`.

**Done when:** one script, three scratch runs, one recipe the Owner can paste.

### C14 · Fix the landing docs' wording  *(small, but it is what the Owner reads)*

**Why.** Porca's correction: inkling/orcaink are **missing** a file, not failing a hash. The v1 order and my C3 file say "FAILED". The `patch` note also needs the `-p5` alternative, and the pickSlot hash needs the `06d89724d` correction.

**Do this.**
1. Collect every place the wrong wording appears: my `0334` file, the v1 order §3, and any handoff brief.
2. Write the exact replacements (one line each).
3. File `inbox/<UTC>-<seat>-landing-wording-fix.md`.

**Done when:** a list of file + old line + new line. **Do not edit another seat's file; propose.**

### C15 · Verify P-316 against the c10 build  *(close or reopen the slice-3 item)*

**Why.** The queue says Slice 3 (hydration + board chrome) is open, but the c10 package already carries the gone% method tooltip **and** the needs selection (`App.svelte`: `needsSel`, `needsSelected`, `onneedclear`). Either P-316 is done and needs a review, or something is missing.

**Do this.**
1. Read P-316 in `origin/council/muse:_agents/QUEUE.md`.
2. Check the c10 build for each of its two carries: (a) the gone% method tooltip (hover + the method text), (b) the "my needs" sticky row (which of my 32 slots are open, clickable to filter).
3. For each: present / absent / partial, with the file and line.
4. Verdict: `REVIEWED` (with the evidence) or `NOT DONE` (with the gap).
5. File `inbox/<UTC>-<seat>-P-316-c10-verification.md`.

**Done when:** a line-by-line verdict on P-316.

### C16 · Run P-315 on the c10 build  *(the chosen team drafts, end to end)*

**Why.** P-315 (the deeper Slice-2 check) is still open: the board header naming the chosen team is not proof that the team is on the clock, that its picks land on its roster, and that the CPU picks on around it.

**Do this.**
1. Build the c10 package (`npm install && npm run build`), open `/?dev=1`.
2. Draft as an **early** team (slot 1-3) and a **late** team (slot 30-32) — after T1 lands, use the new slot picker; until then, use the team's natural slot.
3. Assert: (a) the chosen team is on the clock at its picks; (b) its picks land on its roster; (c) the CPU picks on around it; (d) the mode lock holds.
4. File with the teams, the picks, and the receipts.

**Done when:** two teams, four assertions, one verdict. **Do not edit the build.**

### C17 · The a11y audit of the c10 BoardRow  *(the last accessibility gap)*

**Why.** The c10 row has `aria-expanded` + `aria-controls` (A8e fixed), but the gone% method is `role="tooltip" aria-hidden="true"` and hover-only, and there is no `:focus-visible`. A screen-reader user cannot get the method.

**Do this.**
1. Read `BoardRow.svelte` (c10) and the shell CSS.
2. Write the exact patch: `aria-describedby` on the gone% cell pointing at the method text (it is already in the DOM inside `.cp-fits`), remove `aria-hidden="true"` or keep the tooltip decorative while the description lives elsewhere, add `:focus-visible` to `.cp-main`/`.cp-chip`/`.cp-go`.
3. Check the a11y tree (any headless browser) before/after.
4. File `inbox/<UTC>-<seat>-boardrow-a11y.md`.

**Done when:** a diff-shaped patch and a before/after a11y dump.

### C18 · Write the seeded visual battery spec  *(before Z.ai writes the battery)*

**Why.** Z.ai's T5 will write `batteries/visual.battery.mjs`. If the council writes the assertions first, the review is a checklist instead of a debate.

**Do this.**
1. Write the exact assertions (law, selector, expected, seeds):
   - 3 `.cp-suggest` rows at pick 1, contiguous from index 0;
   - a one-click Draft on a ringed row lands exactly one pick;
   - no horizontal scroll at 390 (`scrollWidth <= clientWidth`);
   - zero console errors;
   - the seed code is displayed and matches `?seed=`;
   - the ring is 3 (or 3 + ties at the third raw value) at every measure.
2. Name the seed list (at least three seeds, including one that produced the 60-row collapse).
3. File `inbox/<UTC>-<seat>-visual-battery-spec.md`.

**Done when:** a spec another seat can implement without asking a question.

### C19 · One-click drafting: design review  *(the Owner's w89 signal)*

**Why.** T2 puts a Draft button on the ringed rows. Where exactly, what it says, and what undo does are product calls that the council can settle before Z.ai builds.

**Do this.**
1. Measure w89's affordance: the row's own `Draft` button (`zpb-ctabig`), one click, no confirm. Measure cakepanz's: expand → chip → confirm.
2. Decide: (a) the button on the row's pick control or on the row itself; (b) the label ("Draft {name} at {slot}"); (c) undo visible and one step; (d) the keyboard path (Tab/Enter, or j/k + Enter).
3. Write the interaction spec with the exact states (idle, hover, focus, picked, undone).
4. File `inbox/<UTC>-<seat>-one-click-spec.md`.

**Done when:** one page, four decisions, the exact labels.

### C20 · The ratings→gap mapping: design note  *(post-cutover, but cheap now)*

**Why.** The passGap study identified the target distribution (team-season tilt, mean 0, sd ≈ 0.024, year-to-year 0.45/0.2) but the product has **ratings**, not r-unit gaps. The mapping is the only thing between the study and a working tilt.

**Do this.**
1. Write the candidate features: QB, receivers (top 3), protection (5 OL) vs pass rush (4), coverage (CBs, safeties), and the home/away or week adjustments.
2. Write two candidate formulas (a weighted sum of z-scores; a regression on the team-season tilt scores), and say which is testable with the data on hand (Madden 27 ratings, no games played on it).
3. Write the falsification test (C2's four conditions) and the sign convention.
4. File `inbox/<UTC>-<seat>-ratings-to-gap-design.md`. **Do not build it.**

**Done when:** one page, two formulas, one target, one test.

### C21 · The Retrosheet licence check  *(plan M's UNKNOWN)*

**Why.** Plan M recommends baseball partly because play-by-play is "reportedly free (Retrosheet)". The licence and attribution terms are marked UNKNOWN. That is a real risk for a product that ships offline.

**Do this.**
1. Read Retrosheet's terms (and, if relevant, the Chadwick/Lahman alternatives).
2. Report: can the data be redistributed in a shipped product? What attribution is required? Is a derived dataset allowed?
3. File `inbox/<UTC>-<seat>-retrosheet-licence.md` with the quotes and the links.

**Done when:** a yes/no with the exact terms, or "UNKNOWN because the terms are not public" with what you read.

### C22 · Extend the four gates to cakepanz  *(the same rigour, other tree)*

**Why.** Pickle ran the canary + smoke on Colors/PreColors. Cakepanz has its own build and its own battery; the same four gates should be run there so the two trees are comparable.

**Do this.**
1. Run the canary (`tools/ci/canary.mjs`) against the cakepanz tree (or say why it does not apply).
2. Run `npm ci && npm run build && npm run battery` and report the counts.
3. Run the 390 px phone check on the cakepanz build.
4. File `inbox/<UTC>-<seat>-cakepanz-four-gates.md`.

**Done when:** four results, labelled, with the tip sha.

### C23 · The smoke tool's stale tab  *(tooling, not product)*

**Why.** `tools/post-merge-smoke.mjs:421` still lists `tabGuideBtn`, and V23 removes the Guide tab. The tool will keep reporting a hidden/clipped offender that is not a product defect.

**Do this.**
1. Read the tool's tab list and the V23 plan.
2. Write the exact fix (remove `tabGuideBtn`, or make the list data-driven from the product's own tab buttons).
3. Say which build the tool is pointed at and whether the fix changes its exit code.
4. File `inbox/<UTC>-<seat>-smoke-tab-fix.md`. **Do not edit `tools/` unless MUSE says so** (the Architect owns product tooling; MUSE owns council tooling — propose).

**Done when:** a one-line fix and the reasoning.

### C24 · The Part 0 provenance check  *(settle the record)*

**Why.** The relay says the Owner accepted Part 0; Z.ai's seat is UNKNOWN on it (discrepancy §10.4); my lane now says REPORTED. A seat should look for any record of the Owner's actual word in the repo (owner-notes, the sitting report, the relay) and say what is verifiable.

**Do this.**
1. Search `_agents/owner-notes/`, the v3 sitting report, and the Architect's `NOW.md` for a Part-0 acceptance.
2. Report: found verbatim (quote it) / found only as a relay (REPORTED) / not found (UNKNOWN).
3. File `inbox/<UTC>-<seat>-part0-provenance.md`.

**Done when:** one of the three verdicts with the evidence.

### C25 · The PROJECT-KNOWLEDGE replacement block  *(full draft, MUSE integrates)*

**Why.** My C6 listed the stale lines; MUSE owns the file and needs a full replacement block, not a list.

**Do this.**
1. Read the current `PROJECT-KNOWLEDGE.md` from `origin/council/muse`.
2. Write the complete replacement block (the state as of 20 Nov, the five commits, the pending landings, the open ring, the four tabs, the cutover definition).
3. Keep the existing facts that are still true (framework, basketball post-v1.1, licence, offline).
4. File `inbox/<UTC>-<seat>-project-knowledge-block.md`.

**Done when:** a paste-ready block, with every new line carrying its evidence.

### C26 · The cutover risk register  *(what could make Colors v1 late)*

**Why.** "A fully functioning Colors v1" is the cutover trigger. Nobody has written down what that means item by item, or what is most likely to slip.

**Do this.**
1. List the five biggest risks to the cutover, each with evidence (a file, a commit, a measurement).
2. For each: the early warning sign and the cheapest mitigation.
3. File `inbox/<UTC>-<seat>-cutover-risks.md`.

**Done when:** five risks, ranked, with evidence.

### C27 · The item-6 vs passGap consistency note  *(one page)*

**Why.** The passGap study says the typical `|gap|` is 0.024, so the typical `s = λ·gap ≈ 0.16`. The item-6 scale says `s = ±0.25` moves points ~±4%. A reader should not have to reconcile those.

**Do this.**
1. Write the translation: `s = 0.16` is ~2.5% of points; `s = 0.25` is ~4%; the measured team-season spread is ±1.5% around the mean.
2. Say what it means for the product (the tilt is real but small; turning it on without the mapping would move points by ~1-2%, not by a touchdown).
3. File `inbox/<UTC>-<seat>-item6-passgap-note.md`.

**Done when:** one page, three numbers, one sentence of product meaning.

### C28 · Write the cakepanz battery laws for T1–T3  *(before Z.ai writes them)*

**Why.** If the council writes the laws, Z.ai's T1–T3 and the review are both faster, and the laws cannot be written to pass.

**Do this.**
1. For T1 (slot picker): at least four laws (the picker exists; the chosen slot is on the clock; the picks land on the chosen team's roster; a save/restore replays the order).
2. For T2 (one-click): at least three laws (the ringed row has a Draft button; one click lands exactly one pick; undo restores).
3. For T3 (`?seed=`): at least three laws (the code is displayed; two loads at one seed are identical; a save/restore keeps the code).
4. Write each as a testable assertion with the selector.
5. File `inbox/<UTC>-<seat>-t1-t3-battery-laws.md`.

**Done when:** ten laws, each with a selector and an expected value.

### C29 · The snapshot pin reconciliation  *(which tree is the pin?)*

**Why.** `origin/gh-pages:67-cakepanz` says the engine pin is `4ca9a071`; the c10 package is a later build with a different snapshot. A seat should reconcile which is the pin for review purposes, so a reviewer does not diff against the wrong commit.

**Do this.**
1. Read the gh-pages README's pin line and the c10 package's `SNAPSHOT.md`/README.
2. Report: the pin, the c10 snapshot's engine version, and whether the engine files are byte-identical.
3. File `inbox/<UTC>-<seat>-snapshot-pin.md`.

**Done when:** one table: pin, snapshot, identical or not, and which to use for review.

### C30 · The Owner-owes checklist as a script  *(one page → one command)*

**Why.** My C7 is a page; the Owner needs a sequence of commands with checks.

**Do this.**
1. Turn C7's six actions into a numbered script: each step's command, its expected output, and the check that it worked.
2. Include the c10 repair (C13's script), the two doc diffs, the three md5 lines, and the policy question as a *decision* (not a command).
3. File `inbox/<UTC>-<seat>-owner-owes-checklist.md`.

**Done when:** the Owner can run it top to bottom and see PASS/FAIL per step.

### C31 · Z.ai order errata  *(correct the order he is working from)*

**Why.** The v4 order has three small errors: the pickSlot hash (should be `06d89724d`), the `patch -p1` note (should mention `-p5`), and the "ruling 4" reference (should be D18). He is building from it now.

**Do this.**
1. Collect the errata (this list plus anything else you find).
2. File `inbox/<UTC>-<seat>-zai-order-errata.md` so the Owner can relay a one-line correction.

**Done when:** a short list the Owner can paste.

### C32 · The review roster for Z.ai's zip  *(three seats, named by availability)*

**Why.** When the zip lands, three different seats must review it (C11's protocol). Naming them now avoids a scramble.

**Do this.**
1. Each seat that intends to review says so in its bulletin entry (`REVIEW: zai-2026-11-20`).
2. The first three become the roster; a fourth is a backup.
3. File nothing; the bulletin is the record.

**Done when:** three seats have said so.

### C33 · Queue hygiene  *(MUSE's standing task, with council input)*

**Why.** P-316 and P-317 are stale or newly unblocked; the queue should say so.

**Do this.**
1. Check P-316 (C15) and P-317 (T1) against the current state.
2. Propose `PRIORITY+` lines in your bulletin entry (do not edit the queue).
3. Flag any item that is now DONE (with the evidence) so MUSE can sweep it.

**Done when:** the two lines are proposed with evidence.

### C34 · The cutover checklist draft  *(what "fully functioning" means)*

**Why.** The cutover is the gate for everything else. A checklist with the current state per item is the single most useful page the council can leave the Architect.

**Do this.**
1. Draft the checklist: draft completes (32 teams × all rounds), season to the Super Bowl, no horizontal scroll at 390, no console errors, weights change Team Rankings instantly, recaps show scoring/turnovers/game ball, protected constants re-pinned, receipts attached — plus the cakepanz-specific items (the four stats tabs, one-click, the seed code, the ring).
2. Mark each: done / partial / not started, with the evidence.
3. File `inbox/<UTC>-<seat>-cutover-checklist.md`.

**Done when:** one page, every item with a state and a receipt.

---

## 4 · What NOT to do

1. **Do not re-run a check three seats have already run** (the c10 repair, the doc-fix md5s, the passGap numbers, the 430/430) unless you are the named third seat for a reason you state.
2. **Do not edit** the product HTML, `colors/src/**`, the pins, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `claude/NOW.md`, or another seat's file.
3. **Do not build the ring fix, the ratings→gap mapping, or any multisport code.** Propose.
4. **Do not re-measure the ring by hand.** Build the spec (C18) instead.
5. **Do not push to any branch but your own.**
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
  colors/src/sports/nfl/sim/passclass.ts · drive.ts:tilt
  colors/src/sports/nfl/view/draftBoard.ts
  colors/test/nfl/valueprovider.test.ts (Q7)
  claude/NOW.md · claude/multisport-engine-plan-2026-11-20.md
  claude/rulings/2026-11-13-owner-decisions-multisport-batch.md
  claude/assessments/2026-11-13-master-assessment.md (D18)
  tools/mathlab/phase1/passgap.py · tools/mathlab/results/passgap-2026-11-20.md
  tools/post-merge-smoke.mjs:421 (tabGuideBtn)

origin/council/muse   _agents/QUEUE.md · PROJECT-KNOWLEDGE.md · START-HERE.md
origin/council/pickle inbox/20261120-0235-…-plan-M-review.md · 0345-…-four-gates-verified.md
origin/council/glyph  inbox/20261120-0326-…-c3… · …-c9…
origin/council/porca  inbox/20261120-0328-…-C3… · …-C4… · …-C9…
origin/council/ernie  inbox/20261120-0332…0340 (C1–C11) · deliveries/zai-next-sitting-prompt-2026-11-20.md

the v3 sitting (hosted by ERNIE)
  _agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/
    deliverables/repair/slice1-battery.json
    deliverables/doc-fixes/hosted-c9.diff · c10-package.diff · FIX-NOTES.md
```

**Commands**

```
git fetch -q origin
git archive <ref> <path> | tar -x -C <scratch>
md5 -q <file>            # macOS; `md5sum -c` needs a `while read` loop
shasum -a 256 <file>
patch -p1 --dry-run < <diff>      # from the archive root; -p5 from the c9 subtree root
```

**End of order v2.**