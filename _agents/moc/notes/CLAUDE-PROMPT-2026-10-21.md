# PASTE-READY PROMPT FOR CLAUDE — council state and questions, 21 Oct 2026

> **Naming (Owner ruling, 22 Oct):** the build Claude is producing is **V22**. Any "V20"/"V21" naming in this document is **historical** and refers to the working file at the time it was written; it is not a name for the current build. Re-measure before citing anything here.

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Owner→Claude brief | DATE: 2026-10-21T09:30:00Z**
_(Everything below the rule is the prompt. Copy from the first line after the rule to the end. Nothing else is needed to read it.)_

---

You are the Architect for the NFL Draft Simulator. The council has worked the project for a full day since
your merge document, and this is everything that changed, what the council can now prove, and what we need
from you. Every number is measured against a named artifact; where something is not proven it says so.

## 0. Pins (verify before you rely on them)

- **Merge candidate:** `NFL Draft Simulator merged.html` — 657,486 B, sha256
  `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, at `merge/v20-donor` @ `ff8c05ae`.
  This is the **V20 merge candidate**, not V21.
- **Reference build:** `NFL Draft Simulator v20 Claude.html` — 649,032 B, `31b7d61f…`. **Donor:**
  `NFL Draft Simulator.html` — 650,127 B, `77bb9ed5…`.
- The candidate is **reproducible byte-for-byte**: `node tools/build-merged.js <v20> <donor> out` → 6,554 lines,
  657,486 B, sha256 `40233d6b…`.
- **The build has no seeded RNG** (58 `Math.random()` sites). Two runs of the same artifact produce different
  drafts and different champions. Any claim of a "stable" result must mean a count, not a roster.

## 1. What the council established since the merge document

1. **The merge is verified and independently reproducible.** A verifier pass drove the candidate through
   draft → season → playoffs → 100-season report with a negative control on v20 (which fails as expected):
   exit 0 on the candidate, 832/832 picks, 272 games, 0 console errors, 0 page errors, 0 viewport offenders.
   A second, independent implementation reproduced the candidate byte-for-byte from the two parents.
2. **The shared council record was lost twice on 20 Oct and recovered.** Both losses were git operations on
   uncommitted shared documents (`stash` → `reset` → `checkout`). The 47 pre-loss messages (M-32…M-79) were
   intact in `stash@{1}` and have been re-filed byte-for-byte; the council verified 76/76 message bodies
   present and 0 pre-loss chronicle lines missing. **Both stashes are untouched.**
3. **The 390 px primary-action defect is real, and a green gate does not cover it.** At 390×844 the preseason
   primary action `#startSeasonBtn` sits at `top: 963` in an 844 px viewport — **119 px below the fold** —
   measured identically by three seats. The shared gate's viewport test is **horizontal only**
   (`tests/e2e-smoke.mjs` l.127), so it reports that element as in-viewport. The spec
   (`tests/openchamber-e2e-v2.spec.js`) carries the stricter `fullyInside && centerUncovered` clause, and that
   is where the finding came from.
4. **The Week 1 of 17 observation is now implemented and passing on the real machine** — the check list
   carries `G_week1Visible: true` and the receipt records
   `week1: { heading: "Week 1 of 17", week: 1, of: 17, visible: true, simWeekBtnVisible: true,
   innerTextMatch: "Week 1 of 17" }`. The earlier reason for the skip ("the build has no persistent week
   indicator") was **wrong**: the build does render the text, as an `<h3>` with no id and no class.
5. **The roster math is settled.** A min-cost assignment over the build's own `flexRule` gives
   **832/832 at total penalty 54** for today's 26-slot roster, and **896/896 at penalty 54** for the
   28-slot FB/P variant. **54 is provably optimal** (11 TE slots covered by a receiver at 4, plus 5 SAM slots
   covered by a lineman at 2 — a lower bound the solutions attain). Six real drafts on the candidate all
   filled 832/832.
6. **The pool supply has three specific holes**, and the fix is the pool, not the rules: **TE 53 for 64 TE
   slots**, **SAM 5 for 32**, and **K 32 for 32 with no cover in either direction** (`FLEX.K = {}`). C is 31
   for 32 but free (an offensive lineman covers it). HB 89 + FB 8 = 97 for 96 backfield slots, so the backfield
   is **not** short.
7. **Two dead code paths were found.** `POSITION_TIER` / `TIER_BONUS` (including the "QB +14" several notes
   cite) are **never read** by the engine. And the team-ratings sliders are **display-only**: they change no
   draft valuation and no game — the draft's `slotWins` is derived from the model tables, not the sliders.
8. **Repo truth:** `main` carries only `AGENTS.md` of the four council documents; the live documents exist in
   three states (root working tree, mirror working tree, git history) and **a push from the mirror ships none
   of the live documents**. A fresh clone needs ~2.87 MB of material that is currently untracked (the pool,
   the work queue, the pool builder and validator, the three E2E suites).

## 2. Questions for you (ten; each with a default and the cost of being wrong)

**Q1 — Do you accept `40233d6b…` as the build of record, with the 390 px preseason defect filed as a V21
P0?** _Default:_ yes to the hash, and the P0 is fixed rather than deferred. _Why it matters:_ every downstream
measurement, receipt and promotion step references a hash; the preseason CTA is the first click of the season
flow, so it is the first thing the Owner meets in play. _Cost of being wrong:_ deferring the P0 means every
green gate keeps meaning "no horizontal overflow" while the primary action is off-screen. _Evidence:_
`_agents/longcat/evidence/p0-390px-startSeason.json`; the gate's `inVp` at `tests/e2e-smoke.mjs` l.127.

**Q2 — The FB/P slot work: do you take it, and with which exact rule set?** The Owner's ruling: **FB and P
become draft-board slots, 28 rounds (896 picks), HB↔FB interchangeable at no flex cost, a kicker may punt at
no flex cost, no existing flex penalty changes.** _Default:_ you build the slot side — `FB1` and `P1` in
`ROSTER_SLOTS`, `HB`/`FB` natural for each other's slots, `P` natural for `P1`, `FLEX.K` gaining `P: 0` — with
labels preserved in the data and on the site. _Cost of being wrong:_ if `P` is also allowed to take `K` (the
symmetric reading of "same logic as the fullback"), the kicking pair becomes mutually coverable; the optimum is
identical either way (896/896, penalty 54) and the difference appears only when a kicker is injured. _Ask us
which reading you want; we have measured both._

**Q3 — The intake composition rules.** The three holes above are supply problems, and the Owner's precedent
(with SAM) is to fix the pool rather than the rules. _Default:_ make **TE, SAM, K and P required positions in
the next intake** with a buffer rather than parity (TE ≥ 64, SAM ≥ 32, K ≥ 40 say), because the 1,500–2,000
headcount alone fixes none of them. _Cost of being wrong:_ the intake becomes composition-aware, so "1,200
candidates" stops guaranteeing a draftable pool — which is the point, but the count will look smaller.

**Q4 — The rating pipeline.** _Default:_ one OVR (integer, public) + internal-decimal attributes with
role-specific unit weights, and **every field must have a consumer in the engine**. _Ask:_ (a) do you want
`POSITION_TIER`/`TIER_BONUS` wired in, or deleted with the notes corrected — they are dead code today, and
several council notes cite a "+14 QB tier bonus" that does not exist; (b) is the −5 adjustment for current
players in an all-time pool still excluded (the Owner says it is **not approved**); (c) the pipeline spec
is at `_agents/pickle/notes/owner-q3-ovr-pipeline.md` — approve, amend, or reject. _Cost of being wrong:_
wiring dead constants changes every draft value; deleting them leaves the notes wrong until corrected.

**Q5 — The canonical E2E suite and the harness fixes.** Three suites exist: `tests/e2e-smoke.mjs` (468 lines,
the fast screen, carries a `receipt_id`), `tests/openchamber-e2e.spec.js` (459 lines, the script that produced
the published evidence), `tests/openchamber-e2e-v2.spec.js` (669 lines, the only one with
`fullyInside && centerUncovered`). _Default:_ v2 is the canonical acceptance suite (after grafting the
`receipt_id` it lacks); the 459-line spec is kept verbatim as the provenance of the published run, retired as a
runner; the smoke driver stays the fast screen. _Three harness fixes are proposed, none touching the
product:_ add a vertical term to `inVp`; split the clip counter so decorative overflow is non-blocking
(the permanent `hiddenClipped: 1` is `header.hero`'s decorative `::after`, not a control); and write receipts
as valid JSON (each `variance-run*.json` is a JSON object **plus** a trailing summary line, and the richest
fields live only in that tail). _Cost of being wrong:_ the next run goes red on the preseason CTA until the
build changes — that is the honest reading of the protocol.

**Q6 — The pool-swap tool.** `SIM-PLATFORM/tools/build-pool-variant.mjs` drops records whose position has no
mapping — currently 52 (P 32, LS 12, FB 8), and after Q2 only the **12 LS** should drop (1,200 → **1,188
draftable**). _Default:_ no rule change; the drop is emergent from the build's own `NATURAL_SLOT_MAP` plus the
taxonomy, so it self-corrects when the build gains the slots. _Ask:_ we want one guard added —
`cands.length && legalCodes.has(cands[0])` — because line 77 currently writes `cands[0]` without checking it
is a legal build code; demonstrated: a taxonomy entry for a non-legal code silently writes 12 pool-invisible
players and reports success. _Cost of being wrong:_ one line in a tool nobody reads but everybody trusts.

**Q7 — Repository topology and what must be committed.** _Ask us to bring you three concrete folder
sketches with tradeoffs, a recommendation, and the cost of choosing wrong_ — we will, and DS's paper is at
`architecture/REPO-ARCHITECTURE-OPTIONS.md`. In the meantime the concrete asks are: (a) confirm the
~2.87 MB manifest (pool 937,366 B + work queue 1,181,912 B + builder 6,030 B + validator 15,556 B + three
suites 73,935 B) may be committed; (b) tell us which branch is the record, given that `main` holds almost
nothing and the live documents are uncommitted in two working trees. _Cost of being wrong:_ another loss
event, or a repo where no fresh clone can reproduce the candidate.

**Q8 — The NBA first pilot.** The Owner's basketball direction: OVR-informed by NBA 2K, integer public
ratings, snake drafts, and "exact roster size, rotation controls, flex penalties and metric formulas not yet
finalized". _Default:_ cap the first pilot at the number of roster slots the pool can fill, with
computer-managed rotations and user-set rotations as an advanced option; positionless with penalties rather
than hard constraints; and metrics chosen because they explain Wins. _Ask us for the concrete options and
their costs — we will bring them._ _Cost of being wrong:_ the first pilot's shape is expensive to change.

**Q9 — Franchise lineage and league eligibility.** _Ask:_ how should historical franchises map to today's
thirty for the simulation while the draft board shows the historical team? (The two different Washington
Senators franchises — 1901–60 to the Twins, 1961–71 to the Rangers — are a trap.) And the soccer decision
needs the Owner's approval of **ranking source, cutoff and league list** before implementation; our default
is a reproducible Elo snapshot with the source and version archived. _Cost of being wrong:_ re-rating a whole
pool.

**Q10 — The shared-record and process changes we have already made, which need your acknowledgement rather
than your decision:** the council now commits the shared documents every round and keeps a mirror in sync;
each batch names **one** coordinator (six concurrent dispatch chains landed on one session and doubled
booked it); and message labels need a content id because the board now carries 24+ duplicated labels.

## 3. Boundaries we did not cross

No product file, protected constant, protocol file or pool was edited by the council. The protected set
(`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`) is untouched, and the
`modelWeights()` ↔ `slotWinsPerOvr()` inverse still holds. The council's own rule: a test PASS is not product
acceptance, and you are the only one who decides what enters the build.

**Evidence index:** `_agents/moc/notes/` (W2–W5, the pool-swap fix, the gate patch proposal), the release
`e2e-evidence-2026-10-20T225702Z`, and the board `COUNCIL-BULLETIN.md` (M-327 through M-33x).
