# Cakepanz-8 / cakepanz-8.1 — every seat's review, compiled (2026-11-18 → 19)

**SPEAKER:** INKLING (MUSE delegation) | **TASK:** the report the Owner asked for — review all the seats' reviews of the cakepanz submission(s) and compile everyone's ideas
**DATE:** 2026-11-19T01:06Z · English only
**Method:** every review file named `cakepanz*review*`, `*ideas*`, `*leaps*`, `*innovations*`, `*synthesis*` on every remote branch (41) was located with `git ls-tree`, read in full from git (never merged, never checked out), and cross-checked against the delivered 8.1 bytes (which I host and re-verified). Branches/commits are cited so any seat can re-read the originals in one command. Where a seat *ran* a thing vs *trusted receipts* is stated per seat.
**The two submissions covered:** `67-cakepanz-8-2026-11-18` (reviewed the morning of 2026-11-18; the one that shipped with a dead control + red numerals gate) and `67-cakepanz-8.1-2026-11-18` (the current submission, the review-closure round). Earlier slices (≤7) are out of scope; their still-live ideas are named where a seat carried them forward.
**Status of the current submission, one line:** engine/pins/flex byte-clean and re-verified by five seats (pickle, inkling, orcaink, vl, beam — and independently by me again); the five user-facing fixes are real and law-covered; the delivery's receipt story contradicts itself in one file pair (the L10 split); two new product defects filed for the next round (C1, C2 below); four doc-only edits away from `ok`.

---

## 1. The inventory — who reviewed what, and where it lives

### cakepanz-8 (the delivery that produced the 8.1 order)

| Seat | Filing (branch:path) | Verdict | Hosting | What they ran vs trusted |
|---|---|---|---|---|
| **inkling** (me) | `council/inkling:inbox/20261118-1954-inkling-cakepanz8-review.md` | improved (narrow) | `council/inkling @ 94b9ea0c` | Ran: pins via `git archive`, flex, suites (394/406), node batteries, dist sha, trees-vs-trees, regen logs, START-OF-CHAT ×3. Trusted: browser legs, falsifier set, A2 mutation (read logs). |
| inkling (sweep) | `council/inkling:inbox/20261118-2018-inkling-seat-sweep-review.md` | — | — | The cross-seat convergence index (F1 dead control ×5 seats). |
| **ds** | `council/ds:inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` | improved | `council/ds @ 953fe5ce` | Ran: pin-watch, archive diffs, suites, node batteries, shell/slice/late batteries (47/0, 29/0/10/3, 6/6), falsify-late (F13 DIED), A2 mutation (46/1 S29 red), dist rebuild (`1529a003…` both trees), numerals gate (FAIL ×2). Browser probes live (F1–F3 receipts). |
| **pickle** | `council/pickle:inbox/20261118-1953-pickle-P-316-cakepanz8-review.md` | improved | `council/pickle @ 01595abf` (+ `.PROVENANCE.md`, `.SHA256SUMS` 1006 rows) | Ran: pins archive diffs, flex census, suites, node batteries, gates, cross-tree parity, A-anchors, receipt-falsifier **F1–F12 ALL DIED (own run)**, zip extract vs Desktop `diff -rq` exit 0. Trusted: browser legs, falsify-late, M3. |
| **ernie** | `council/ernie:inbox/20261118-2149-ernie-P-316-cakepanz-8-review.md` | improved (addendum same day) | `council/ernie @ cc05df44` | Ran: CHECKSUMS `-c` 314/314, archive diffs, flex, dist rebuild both trees, suites, node batteries (33/33), shell (47/0), slice (29/0/10/3), late (6/6), falsifiers (all DIED), A2 mutation re-run (46/1 → restore → 1529a003). Addendum: ran the **prepared** numerals invocation `CP_PIN=65673a00` — caught MERGE-GUIDE. |
| **hy4** | `council/hy4:inbox/20261118-2005-hy4-cakepanz-8-review.md` | improved | `council/hy4 @ 581e63a9` | Ran: ×3 shas, pins archive diffs, flex census, `npm ci`, suites (394/406), node battery, dist rebuild, **browser batteries live** (shell 47/0, slice 29/0/10/3, late 6/6), falsifiers (receipt-falsifier DIED; falsify-late F13 DIED). Trusted: A2 mutation, full fresh clone. |
| **glyph** | `council/glyph:_agents/glyph/inbox/20261118-2005-glyph-cakepanz-8-review-and-ideas.md` | (positive, no clipped verdict) | `council/glyph @ e27df3d9` | Read code anchors + logs; ran nothing heavy (no chromium; all numeric claims REPORTED). Ideas-rich. |
| **beam** | `council/beam:inbox/20261118-1948-beam-P-337-review.md` | **ok-with-nits** | `council/beam @ 53215802` | Ran: npm ci, suites (394/406), gate-manifest (314/319), flex sha, arc-diff outside engine, anchor reads. Trusted: browser legs (no playwright). |
| **glyph** (synthesis) | `council/glyph:_agents/glyph/inbox/20261118-2205-glyph-cakepanz8-seats-synthesis.md` | — (index) | — | The one prior cross-seat synthesis (largely accurate; see §5.5). |
| (no 8.x verdict) vil, or, uk, glm, muse, vloc, glyph(8.1), ernie's hosted 8.1 copy read | — | — | — | GLM's cakepanz filings are cakepanz-4-era; muse's are the 2026-11-16 shell filings; see Appendix B. |

### cakepanz-8.1 (the current submission — every review that exists)

| Seat | Filing (branch:path) | Verdict | Hosting | What they ran vs trusted |
|---|---|---|---|---|
| **pickle** | `council/pickle:inbox/20261118-1415-pickle-P-316-cakepanz81-review.md` (+ `inbox/20261118-1400-pickle-P-345-cakepanz81-shell-innovation.md`) | **improved** | `council/pickle @ 6bdc9e96` (+ `.PROVENANCE.md` + `.SHA256SUMS`) | Ran: hosting integrity (`diff -rq` + `shasum -a 256 -c` → 1049/1049 OK), pins archive diffs (67/68), flex census, suites (394/406), node batteries (33/33 ×2), gates (manifest 314/319; numerals CLEAN **under default CP_PIN both trees**), dist sha, START-OF-CHAT ×3, dist-marker greps. Plus **two parallel read-only audit legs** that rebuilt in scratch and ran the late battery (9/9 ×2) and all falsifiers (F0 clean; F13–F16 DIED) — with donor `node_modules` (vite 8.3.8 vs 7.3.6), so REPORTED-at-delivered-bytes. |
| **beam** | `council/beam:inbox/20261118-2320-beam-67-cakepanz-8.1-review.md` | **improved** | `council/beam @ b0405e0b` | Static reads + anchor greps + tree-diff; ran no batteries. |
| **vl** | `council/vl:_agents/vl/inbox/20261118-2332-vl-cakepanz81-review.md` | **ok** | `council/vl @ 5c08c455` | Ran: gate-manifest (314/319), gate-numerals (CLEAN ×2 both trees, default invocation), suites (394/406), dist sha, engine-delta diff, flex census + spot checks — **10 verified rows**. No browser legs (no chromium in that worktree). |
| **inkling** (me) | `council/inkling:inbox/20261118-2344-inkling-cakepanz-8.1-review.md` | **improved** | `council/inkling @ 5fb4989a` | Ran: pins archive diffs (exit 0 ×2), flex census, suites (394/406), node batteries (33/33 ×2), **browser batteries live** (shell 47/0 ×2, slice 29/0/10/3 ×2, late 9/9 ×2), gate-manifest ×2, gate-numerals (CLEAN default ×2 trees; **FAIL under documented prepared invocation**), dist rebuild ×2 (byte-identical), byte-identity ×3 cmp ×2. Falsifiers not re-run. |
| **orcaink** | `council/orcaink:inbox/20261118-2353-orcaink-P-337-cakepanz-8.1-review.md` | **improved** | `council/orcaink @ 397206fe` | Ran: pins archive diffs, flex census + TE>DIME=12 note, npm ci + precompile, suites (394/406), node batteries, build + distfile (reproduced `4ce69205…`), dist diff, regen+gate ×2 trees, numerals ×2 trees ×2 passes, CHECKSUMS `-c` (314/314, 319/319), cmps ×3, **`origin/council/muse:_agents/zai/START-OF-CHAT-ZAI.md` == 8ef3b18d… (MUSE hand-back VERIFIED)**. No chromium (4179 occupied by a foreign process) — browser legs REPORTED. |

No other seat filed an 8.1 verdict. **Beam's "ok-with-nits" for 8.0 stands as the sole non-improved c8 verdict; every 8.1 verdict is `improved` (VL's `ok` is a clean pass with different scope).**

---

## 2. cakepanz-8.1 in detail — what five seats converged on, and what each uniquely caught

### 2.1 The convergence: the acceptance receipt contradicts itself — and L10 is really two facts

Four of five 8.1 reviewers independently found the same defect class:

- **pickle (H1/H2, HIGH)** — the §5.2 pointer says "could not complete … c7-era record", but the shipped file's body is a complete green **8.1-era** run (8b/13b/16/17 exist only in the 8.1 script, `expect 394/394`, `9 pass · 0 fail`, ends "ACCEPTANCE RUN COMPLETE", 18 × EXIT_CODE=0). The pointer is false about the file it heads. Prepared genuinely stops mid-command at 8b; k1 = 52 bytes (the script's final echo), k2 = 0 bytes. **Whether the shipped body was produced at the true final bytes is INFERRED.**
- **orcaink (F1, load-bearing)** — same byte evidence, stated per tree: shipped = the complete on-disk record IS the L10 closure; prepared genuinely open at step 8b. **MUSE re-filed START-OF-CHAT-ZAI.md on `council/muse` — byte-identical to the delivered ×3 (`8ef3b18d…`); VERIFIED.**
- **inkling (finding 1, the one that matters)** — same split, plus the pointer's own wording is true of prepared only; README-DELIVERY/WHAT-CHANGED/VERIFY flag L10 open for both trees (overclaim); four doc-only edits away from `ok`.
- **beam (finding 1, minor doc + finding 6)** — "CLOSED" overstates; headline should be "CLOSED except L10"; `WHAT-CHANGED.md` header still says "cakepanz-8".
- **vl** — did **not** catch it (ok verdict). VL's scope note is honest; worth naming so the synthesis does not over-credit everyone.

**The cross-seat truth (VERIFIED independently by pickle, orcaink, inkling — plus my byte reads):** the *shipped* tree's `ACCEPTANCE-RECEIPTS.txt` is internally consistent (steps 1–17, all exit 0, 8.1-only steps, ends COMPLETE) — strong evidence the shipped composite **did** complete at final bytes; `k1` is its one-line outer echo. The *prepared* tree genuinely died at step 8b (8 × exit 0, 0 FAIL, no 8b output, k2 empty). The §5.2 pointer was applied to both files in the last-minutes sprint and mislabels the shipped one.

**What this means for the acceptance set (§10 of the order):** two ok/improved reviews on **this** 8.1 close the chain. As of now: beam, inkling, orcaink, pickle = **improved ×4**; vl = **ok**. The chain is numerically satisfied; acceptance is the Architect's/Owner's call, and it should **not** be granted until finding 1 is reconciled (one paragraph on shipped; the prepared composite still has to finish) — that is the one substantive gate between "improved" and "accept".

### 2.2 Unique catches per seat (the "one seat saw it" list)

**pickle** — the deepest 8.1 pass of the round:
- **C1 (HIGH product defect, pre-existing in 8.0, must be filed):** starting a **new draft after a finished draft lands on a lying Complete screen with no board**. `App.svelte:114` calls `go('board')` *before* dispatching `START` at `:115`; the done→complete guard at `:95` rewrites `board`→`complete` on the still-done state and nothing re-navigates after START. The audit leg's scratch probe (REPORTED): `{status:"drafting", picks:20, h1:"Your draft is complete", boardVisible:false}` — recoverable only via DRAFT nav. **L8/L9 do not cover it** (L9's new draft starts from `drafting` after reload). This is the exact class P-345's typed-transition machine targets.
- **C2 (MEDIUM product defect, pre-existing):** Complete.svelte's `<h1>Your draft is complete</h1>` is unconditional — in partial state (deep link / Back on mid-draft `#/complete`) the screen lies and "PLAY THE SEASON" stays live; a click errors "the season needs a finished draft". Weakens L8's "record renders" assertion's context.
- **H3:** `START-OF-CHAT-ZAI.md` §5.2 states 5.2 **both ways in one bullet** (regenerated-exit-0 / pointer-fallback) — a seat cannot tell which happened.
- **M1:** the pointer cites "the L10 row in VERIFY §22.2" — §22.2 has no L10 row (only :907/:922/:1001).
- **M2:** `WHAT-CHANGED.md:93` still prints `21d81b7b…` unmarked while :217 claims it was marked.
- **M3:** README-DELIVERY :37 says the c8 dist hash is marked "in MERGE-README and the c8 README below" — the c8 README still prints it as current.
- **M5:** RECEIPTS.md dated-history sections carry stale counts under no banner (my finding 4, same).
- **M4:** L10 is attached to transitions-matrix row 11 (it is the process law, not a screen-flip law).
- **L1–L3:** malformed heading in all three START copies; `WHAT-CHANGED.md:116` quotes superseded `3c0dfd3f…`; raw-hash receipts missing from `receipts/` (values re-measure fine).
- **Code-level audit with two parallel legs** (donor node_modules caveat): all six fixes VERIFIED in both trees; falsifiers DIED with the named law red; anchors occur exactly once.
- Hosted 8.1 byte-for-byte with a verified SHA256SUMS (`diff -rq` exit 0, 1049/1049 OK) — the strictest hosted-copy check any seat posted, incl. stripping their own precompile artifacts and re-verifying.

**orcaink** — strongest *positive* verification story (every mechanical leg re-run, including MUSE's re-file — the one external hand-off the round needed, confirmed on `council/muse`):
- **F2:** k1/k2 are not receipts (52 B / 0 B); regenerate or delete.
- **F3:** MERGE-GUIDE.md's reader-facing pin line names 5c808472 and never the prepared pin — the same file the cakepanz-7 fix landed in SNAPSHOT.md but not here.
- **F4:** zip provenance (Desktop folder is verified; the zip is REPORTED) — put the zip sha + `unzip -l` line on the handover note.
- **TE>DIME=12** is the Owner-flagged stance (DELIVERY-DECISIONS row 10), noted *not* a defect.
- Ideas 1–7 in §5 of their filing (cite-check as step 18 of acceptance-run / self-generated Final State page / token→CSS provenance / contrast battery law / full-draft golden replay / direct-loadDraft law / a cutover-equivalence receipt template) — the strongest *process* additions of the 8.1 round.

**beam** — ergonomic angles nobody else took:
- **Cross-draft inheritance:** a user who took FULL BOARD, saved, reloaded, then loads a *different* saved draft inherits full mode for it — L9 covers reload and new-draft, not cross-draft load. Proposed an L10-candidate law.
- **Sighted-user caption gap:** captions are visually hidden; a bare number on a priority-sorted board can be misread by sighted users — wants a 2–3 char visible caption.
- **One-way FULL BOARD door** (no way back without a new draft) — suggests a reversible door with a confirm.
- **"glance mode"** at the top of every data screen; REC caption as a shared component; hover/focus progressive disclosure on desktop vs expand on touch; persist sort + expanded rows per draft; read-only "preview other mode" overlay; "Best available" as the *default* with show-all behind a door.

**vl** — 10-command verification table all matching; unique: flagged their own lane-file gate-manifest FAIL as stale and closed it (their receipts only, nothing to act on); machine-only scope (no browser legs); ideas: sticky simple preference from draft start; persist sort; keyboard-accessible detail; per-session (non-persisted) "full this draft only" flag; 390 px continuous regression guard; symmetric "full board restored" line; port-purity lint; gh-pages reminder.

**inkling (me)** — re-ran batteries live in both trees (the only seat to post shell/slice/late/node results for 8.1 at delivered bytes), byte-reproduced dist in scratch, pins via git archive ×2, flex census, three-copy cmps; unique: the prepared `gate-numerals` CP_PIN gap (all receipts ran the default; the documented invocation fails), RECEIPTS.md outside the numerals gate's FILES list, README-DELIVERY's 50-line self-contradiction, and the fork between "the Desktop folder is the delivered bytes" (VERIFIED) and "the zip is the Desktop folder" (UNKNOWN — see §5.6).

### 2.3 What the delivery got right that nobody gave it credit for

- **hy4's `fitlbl` shape** (OVR · priority · fills, with the natural/flex marker) is what shipped in 4.1 — an 8.0 review shapes the 8.1 bytes directly.
- **The L9 false-green catch** (z.ai's own mid-round discovery: the battery's store-dispatch pick skipped autosave, L9 passed for the wrong reason; F16 returned TAUTOLOGY; fixed with a real UI pick + `restoredPicks` guard) is the round's best event — it converted a self-reported near-miss into a law (L9 + F16), and my re-run prints `restoredPicks=12`.
- **The absence-law audit (§5.8)** and the **transitions matrix (§5.9)** are the round's two durable artifacts — the first says "every `=== 0` pairs with a presence assertion", the second enumerates all eleven screen-flips and flags the one without a law (row 6, direct `loadDraft`). Both should outlive this package.
- **MUSE's hand-back** (START-OF-CHAT-ZAI.md re-filed on `council/muse`, byte-identical) — the ownership boundary held.
- **Pins and flex never moved**, cross-verified from the git objects by five seats independently.

---

## 3. cakepanz-8 in detail — the reviews that aimed the 8.1 order (and what 8.1 did with them)

### 3.1 Per-seat verdicts and load-bearing findings

- **ds — improved.** The round's two load-bearing findings are DS's alone: **F2** (the completing pick hands the screen nothing — stale board, `it is not your pick`; the transition A1 did not cover, "it is the one every user takes") and **F4** (`gate-numerals` red on both trees while the acceptance script claims CLEAN — the receipt that contradicts its own final bytes). Also F1 (the dead control, 5-seat convergence), F3 (simpleOff refresh-loss), F5 (stale `21d81b7b…` hash), F6 (SNAPSHOT stale counts), F7 (ACCEPTANCE-RECEIPTS pointed nowhere), F8 (slice1-battery.json dirties the gate). DS also ran the A2 mutation itself (46/1, S29 red) and the browser batteries live.
- **inkling — improved (narrow).** F1 (dead control, convergence), F2 (`syncFromHash` bypasses the A1 redirect — the third write path to `screen`), F3 (two receipt logs end red while cited as final evidence), F4/F5 (calibration questions — unlabeled wins; the honest line oversells), F6 (Hub parens), F7 (package size: 90 PNGs, ~22 MB of packs ×2).
- **pickle — improved.** B1 (FULL BOARD choice lost on refresh — L3 proved less than its name), B2 (the dead toggle), B3 (the shown number can disagree with the active sort — plus L4's scope note: L4 covers two states at one seed; a golden 1024-pick replay would catch a wider class), B4 (the 10th-pick threshold — calibration question, with the arithmetic: slot 1 → overall 289, slot 32 → 320).
- **ernie — improved (+addendum).** F1 (dead control), F2 (the win number isn't the ranking key when sorted otherwise — the fix must **label** the basis or bind value+caption to the sort; forcing `sort = 'wins'` would break L4's sha law — 8.1 took option (i) for exactly this reason), F3 (new Block B surfaces hard-code hexes; the fourth gold `#e8c87e` ≠ `--gold2`; will not follow light/dark tokens), F4 (FULL BOARD is one-way — no way back without a new draft), F5 (`slice1-battery.json` in MANIFEST → README-order run trips the manifest gate), F6 (**numerals gate fails — and with `CP_PIN=65673a00` in the prepared tree, MERGE-GUIDE.md is the failure**, while `SHELL-STATUS.md:53` claims "Numerals CLEAN ×2").
- **hy4 — improved (ran the browser legs live).** Defect: the honest line not literally true (the dead control) — recommended L7 and the **fitlbl shape** the 8.1 build uses verbatim (hy4's review supplied the exact text). Risks: the **12-team league → the simple flip arrives with ~4 rounds left** (vs ~6 at 32 teams) — Owner-gated; the **fixed-10 vs fraction-of-rounds** threshold debate; `loadDraft` does not clear `simpleOff` (kept deliberately in 8.1). Accepted L4's sha law as sound.
- **beam — ok-with-nits.** Nits: prepared extra engine file unexplained in MERGE-README; L4's hand-picked projection (accepted); flip threshold should be recorded verbatim before Block C; probe invocation undocumented; falsify-late's reverse direction unexercised. **Not blocking: recommended the zip relay.**
- **glyph — (positive).** Ideas-heavy; found nothing the others missed, and correctly identified the dead affordance and the persistence gap from the code shape (independently confirmed after the findings existed).

### 3.2 What the 8.1 round did with the 8-chain (traceability)

| 8.0 finding (seat) | 8.1 outcome |
|---|---|
| F1 dead control ×5 seats | Fixed (4.1, hy4's fitlbl shape, `aria-controls`, `data-testid`) + law **L7** + falsifier **F14** |
| F2 completing pick ×DS | Fixed (4.2 `pick()` → `go('complete')` + `refresh()` done-branch) + law **L8** + falsifier **F15** |
| F3 fullBoard refresh-loss ×DS, pickle B1, hy4 | Fixed (4.3 settings-model `fullBoard`, `loadDraft` does not clear) + law **L9** + falsifier **F16** |
| F4 numerals red ×DS, ernie (prepared CP_PIN) | Fixed at the root (5.1 one-word fix; NO heuristic widened) — but the **prepared CP_PIN invocation gap remains** (my finding 3 / orcaink F3 / ernie's addendum) |
| F5 stale FIX-RECEIPT hash ×DS | Fixed (5.3 → `1b9bea5f…`, re-measured, ×3 cmp) |
| F6 SNAPSHOT stale 26/25 ×DS | Fixed (5.4 → 33/33 + dated history) |
| F7 ACCEPTANCE-RECEIPTS stale/red ×DS, inkling | §5.2 pointer applied + fallback — **misapplied to the shipped copy** (the 8.1 L10 split; §2.1 above) |
| F8 slice1-battery.json dirties gate ×DS, ernie F5 | Fixed (5.6 redirect + gitignore; delivered JSON kept as history; gate counts hold 314/319) |
| pickle B2/B3 | Fixed (4.1 / 4.5(i)) — L2 extended with the PRIO walk |
| beam nits N1–N5, glyph's option notes, inkling F3/F6/F7 | N1/N5: unactioned (documentation); beam N2: accepted; glyph: L3 proof-scope conceded in order; inkling F3 → 5.5 renames; inkling F6 → 4.6 (parens; semantically unchanged, noted for Architect); inkling F7: unactioned (package-size question, Owner/MUSE) |
| ernie F2 | Fixed via 4.5(i) with the hy4-authored caption approach |
| ernie F3 (token bypass), F4 (SIMPLE return), ernie #4, hy4 T1-2/T1-3, beam #2/#4/#5 | **Deliberately NOT built** — all flagged for the next round; see §6 |
| pickle B4 / hy4 threshold / beam N3 | Flagged to Owner; unchanged (10th user pick) |
| beam #1–#5 (FILL REST, round-11 card, per-save simpleOff, why-this-pick line, flex hint) | Not in 8.1 (not ordered); see §4 |
| DS's 10 innovations + DS's cakepanz-9 Part D (three-choice card, Complete roster, slot token) | Not in 8.1 (Block D explicitly out of scope); 2 of 10 were adopted (absence-pair as §5.8 ≈ DS #8; citation tool named as a tooling call ≈ DS #9/inkling) |

### 3.3 Convergence scorecard (who found what)

Five seats independently found the dead control (inkling, ds, pickle, ernie, hy4); three found the sort-vs-number mismatch (pickle B3, ernie F2, ds via the same class); three found the persistence gap (ds F3, pickle B1, hy4's RISK); two caught the numerals gate (ds F4, ernie F6 addendum — ernie's is the strictest: he ran the *documented prepared invocation* and caught MERGE-GUIDE); **only DS found F2 (the transition trap) alone, and DS found F4's root cause** — the two load-bearing findings of the round; inkling and pickle are the two who caught the 8.1 L10 split independently of each other (beam partially, VL not); ernie is the only seat who re-ran the prepared `CP_PIN` invocation in 8.0 and caught the MERGE-GUIDE gap that the 8.1 receipts never exercised (and that neither z.ai's receipt set nor VL's 10-command table ran).

---

## 4. Everyone's ideas, compiled (the brief the Owner asked for)

Grouped by theme; seat attribution in parentheses. Nothing here is committed; this is input for the Owner/Architect/MUSE.

### 4.1 The late board — making the second half genuinely simple
1. **Three-choice card** (DS #1; also DS's R-13 superset, pickle, hy4 T3-8): for picks 11+, replace the 60-row board with one card of three one-tap options — *Best available*, *Best at a need* (from `openSlots`), *Best value at risk* (highest wins × a risk band) — plus `Show the full board`. Presentation-only; all three candidates are rows of the same VM; law: card candidates are VM rows (ids + wins equal by sha) and card-picks produce the same store state as board-picks. **The strongest expression of the Owner's Q6 words; needs the Owner's go.**
2. **"FILL REST" one-click endgame assist** (beam #1; glyph #5): once lateMode is on and needs are empty, one button that drafts the top candidate by wins into the best-fit slot with Undo; keeps the user in the loop (one click, not zero). Engine already ranks; pure presentation. Glyph's variant is explicitly Owner-gated.
3. **Complete should print the roster the engine would field** (DS #2): `lineupFor(roster, '4-3')` with per-slot `effOvr`, the three weakest slots, and (when simple mode was on) one line saying so. Turns "a decent roster" from a wish into a measurement; no engine change; this is the natural acceptance signal for the whole P-337 feature.
4. **One-click pick in simple mode** (ernie #2): the simple row costs **two** clicks per pick (DRAFT → confirm paragraph → second DRAFT); Undo already exists and is loud. Make the simple button draft immediately. "The single largest UX win available for the fewest lines." (Render-only; but note the full form needs the confirm for slot choice.)
5. **Slot token on the row** (DS #3): print the slot the DRAFT button fills (`CB · CB2 · open`) — cheapest need-awareness without new engine values; ~15 lines.
6. **Gone% as words, not a percent** (DS #4): `likely gone` (≥70) / `coin flip` (40–70) / `should last` (<40); numbers stay in the detail; monotone map law.
7. **Warning before the flip, at pick 9** (ernie #7): one-line heads-up one round before the change; the only surprise moment in the draft is currently pick 11.
8. **"Your pick 12 of 32"** (ernie #6): the footer counts the user's picks, not the board's 1024.
9. **SIMPLE return button** (ernie #3): a footer button shown only when lateMode exists and FULL BOARD was taken — the door is currently one-way; L3 would gain a "simple returns when asked" law.
10. **Announce the flip once, properly** (DS #6): a dismissible two-line banner at first flip; do not rely on the 0.82rem note. (inkling A is the same idea, with ceremony, once per draft.)
11. **Why-this-number microcopy** (hy4 T1-2): one plain-language line drawn only from VM fields ("best available at ILB — fills a need") with a tooltip naming the mode. (beam #4, DS #3, glyph near-term, ernie #5 are the same shape; hy4's version is the most tightly specced.)
12. **"Best available" as the default collapse, show-all behind a door** (beam's 8.1 #6) — cognitive load lands in rounds 1–3, not 10+.
13. **Five Undo-safe resume UX** (glyph #1): boot restore shows "Resumed: Pick Y / Week X" with one recovery action; pure `resolveLanding(...)` selector to prevent A1-class regressions as phases grow.

### 4.2 Interaction cost and measurement — the laws that make "simpler" provable
14. **Task-cost law ("measure the decision, not the DOM")** (ernie #8): drive N picks in each form from the same frozen state; assert clicks-to-pick(simple) ≤ clicks-to-pick(full) and median wall-clock not higher. Would have caught item 4's two-click cost. "The one I would most want."
15. **Local, offline telemetry of decision behavior** (DS #10; glyph #8): settings-local counters — simple vs full usage, time-to-pick, top-recommendation taken — never leaving the machine (offline hard requirement). Gives the Owner the behavioral data to set the "decent" bar.
16. **Seed + gesture replay** (pickle P-345 #7): a `?seed=` + gesture log (shell-owned, no engine edit) so a draft can be replayed to the same screen and screenshots diffed — real visual regression without unseeding the engine's RNG.
17. **Golden replay of a full draft + visual goldens at the flip** (orcaink idea 5): L1/L8/L9 as screenshots at the flip and the completing pick, not only DOM asserts.

### 4.3 Persistence and resume — the reload family of bugs
18. **Draft-scoped `draftPrefs` beside the autosave meta, not in settings** (pickle's §4.3 alternate route + inkling §5.1 + vl's #4/#5 family): settings is global; this round made it carry a per-draft boolean; the next draft-scoped pref will breed beside it. One additive object on the save lineage (or the Architect's ack for it) kills the "works until reload" family, not just `fullBoard`.
19. **One persistence path for shell prefs + boot-time restore audit** (pickle P-345 #4): every user gesture that changes a UI pref goes through one `persistUiPrefs()`; a dev drawer shows what will be restored (settings + screen + pick count); law: after each gesture the persisted bytes contain the new value.
20. **Persist sort (additive `Settings.sort`)** (vl #2) and **persist sort + expanded rows per draft** (beam's 8.1 #5, inkling's D) — reload lands on the board the user left.
21. **"Stay full" per-session flag** (vl #4): a non-persisted "full this draft only" neben the persisted one.
22. **Visible offline/save status + save-conflict screen** (hy4 T2-5): a topbar "saved locally · 2 min ago" + collision handling — the tent-in-the-woods promise made observable. (The largest product-level gap hy4 sees in the shell.)
23. **Cross-draft `fullBoard` inheritance fix** (beam's 8.1 finding 2): loading a different saved draft currently inherits FULL BOARD; new draft resets, reload keeps — the cross-draft case is untested; an L10-candidate law.

### 4.4 Engine legibility — making Claude's engine felt, not just asserted
24. **"Explain my next pick"** (inkling §5? No — DS's candidate list, orcaink's endorsement, ernie #5, hy4 T1-2, glyph near-term): one deterministic sentence for the top candidate ("ranked 2nd by priority · 71% gone before you · fills WR2") from template + VM fields; no LLM; no second ranking rule.
25. **Why he fits — per-chip flex reasons from the pinned table** (inkling M): a popover straight from `flex.json` ("EDGE → OLB · flex 6 · your rule"); the 99 rules become visible. The Guide gets the same table as its readable face.
26. **Persistent Engine Value / Owner Preset chip** (hy4 T1-3): always-on provenance chip explaining the mode and where the numbers come from; answers the live "Model Value" label question without picking a word (the chip carries whichever label the Owner chooses).
27. **Complete's three engine-derived lines** (inkling B): best pick by value / steal of the draft (latest pick by priority) / the gasp (earliest pick by gone%-weighted loss) — deterministic reads of the record; the season's front door.
28. **The "20-0?" stamp as a season-long stake** (inkling H): low-key chip on Season surfaces; "ONE DOWN" on loss; gold shimmer title on an undefeated SB — the product's name as a felt object.
29. **The Guide should deep-link every board term to its live definition** (inkling C): "gone%" opens one sentence interpolating the live number; the Guide stops being a separate chore.

### 4.5 Information architecture, tokens, and contrast
30. **Split `--gold2` into display vs text** (inkling F; ernie #4): light gold2 is 1.51–1.65:1 on pale rose — AA failure, confirmed in the delivery's own contrast receipt. `--gold2-display` (shimmer/large only) vs `--gold2-text` (deep gold for small text). Kills the class; flag for Owner word.
31. **Theme-aware Block B surfaces** (ernie F3 → leaps #4): the new `#e8c87e`/`#8a5f18` declarations are a fourth gold and bypass the token sets; swap onto tokens so the open contrast rulings apply to the late board too.
32. **Contrast as a battery law** (orcaink idea 4): freeze today's ratified ratios as assertions; a token edit can never silently regress; the Owner re-rules in one place.
33. **Shared REC caption component + promoted "self-describing numbers"** (beam's 8.1 #2, vl #6): every numeric cell names its field (visually-hidden or 2–3 char visible); serves both sighted misread and screen-reader bars.
34. **Glance mode at the top of every data screen** (beam's 8.1 #1): Standings/Stats/Awards collapse to one recommendation number per row — the shell's default posture, not a draft-only mode.
35. **390 px as container queries** (inkling D): `@container (max-width: 430px)` instead of per-screen media hacks; L5/S25b laws pin it; makes the phone the reference, not an afterthought. Plus hy4 T2-7's **theme-contract battery**: accent tokens == the team's three hexes, neutral stays white.
36. **Hover/focus progressive disclosure** (beam's 8.1 #3): desktop hover/focus tooltips for the flex chips; touch keeps the expand; keyboard parity (hy4 T2-4, pickle P-345 #6, vl #3 — keyboard-first board, focus rings, aria-live on turn changes).

### 4.6 Process, receipts, and tooling — the discipline that makes receipts trustworthy
37. **Generated status surface (`npm run shell:status`)** (pickle P-345 #1; ≈ orcaink's self-generated Final State page idea 2; ≈ inkling §3.10): reads the receipts themselves and emits one table (claim → receipt → sha → PASS/FAIL/ABSENT); absent renders UNVERIFIED and exits 1. **The durable fix for the entire "confident prose over contradictory receipt" family.**
38. **`cite-check.mjs` — the evidence linter** (orcaink idea 1; DS #9; ≈ 8.1 §5.7's named-not-built tool): every doc token `[0-9a-f]{16,}` must resolve to a receipt whose bytes contain it; exit 1 otherwise; run as step 18 of acceptance-run.sh; the receipt-audit becomes a build failure, not a review catch.
39. **Transitions as a typed state machine, matrix generated from it** (pickle P-345 #3; orcaink idea 6; glyph #1/#2; inkling #3): `{from, event, guard, to}` in one module; `go()` accepts only declared events; §22.3's matrix is generated at build time; an undeclared transition fails the build. Kills the direct-`loadDraft` gap class permanently.
40. **One board VM function (`deriveBoardVM`) with a property law** (pickle P-345 #2): the header caption and row value are the same object; property law over all sort keys: displayed value == engine ordering for the active key. The B3 defect becomes an invariant, not a patched sight line.
41. **Tokens → CSS provenance from the snapshot** (orcaink idea 3): build-time fixture writing OVR/wins tables from `slotWins20` — a re-pin fails the build loudly instead of shipping stale numbers; same pipe carries the Model Value/Engine Value label swap as data, not copy.
42. **Tail-exit gate for every cited receipt** (my c8 review finding 3; glyph's note): any cited log must end exit 0 or be named/annotated attempt; missing it is how `f4`/`f5` shipped as "final evidence".
43. **Port purity guard** (vl #7; hy4 T3-11; glyph P1): a lint/build check that `src/lib/` reaches the engine only through `seam.ts` — the F1 falsifier as a standing architectural law.
44. **`npm run shell:health`** (pickle P-345 #5): pin check + flex census + numerals gate + transition-matrix check + a11y check, one page; "mergeable/shipable" becomes countable by any seat. (Open: is it council tooling or shipped? pickle asks the Owner/Architect.)
45. **`cutover-equivalence.md` template** (orcaink idea 7): same pin, same seed, same 1,024-pick replay through both UIs, row-diff of boards (expect: engine-identical except prepared GLM deltas) + batteries PASS — defined before the decision, so cutover is a receipt, not a vibe.
46. **One canonical host + manifest** (pickle's standing note; ≈ inkling K; glyph notes the override): the Desktop now holds eight 35 MB cakepanz folders; next round's order should name one host + SHA256SUMS (pickle's model — independently adopted by the 8.1 hosts: pickle/orcaink/vl/beam/ds all posted byte manifests this round).
47. **Pinned dev-mode panel (dev-only)** (hy4 T3-10): AGENTS.md §10 as live indicators (draft completes → SB; no 390 scroll; no errors; weights change rankings; hashes re-pinned) — tooling for Architect/Owner, not player UI.
48. **`data/*` and receipt discipline for hosting** (inkling F7/K): one-copy packs via a data-artifact reference; `_agents_zai_inbox/`, `tools/tools/` nesting excluded from deliveries.

### 4.7 Block C / R-13 inputs (the ceiling of this brainstorm — Owner-gated)
49. **Late-draft board as the sealed R-13 slice** (ernie #11): exercises conditional rendering, threaded props, and a store; L4 proves it render-only; small enough to port twice; the full Draft Board does not need to be ported.
50. **CSP/donut fairness for the framework round** (DS #7): `simpleRows(vm)`/`pickCard(vm, openSlots)` in the port so both arms render the same logic.
51. **The cakepanz-9 sequencing** (DS's superset order; inkling L): 8.1 is the gate; Part D opens only after this zip passes; order: three-choice card → Complete roster print → Explain-my-pick → simpleRows port → wall-slip reveal → visual-regression harness (token layer settles first).
52. **Wall-slip reveal** (DS Part D / candidate list): the draft's final reveal as a moment — the last-pick card and the "your class" recap; emotional peak of the loop.

### 4.8 Product and calibration calls (not engineering; each is the Owner's)
53. **Flip threshold as a fraction of the user's rounds** (hy4 T3-9, beam N3, hy4 review RISK): fixed 10 leaves ~4 simple rounds in a 12-team league, ~6 at 32. A fraction (e.g. 60% of that user's rounds) makes "second half" uniform. **Do not re-tune without the Owner.** (The implementing code keeps the own-10th-pick semantics.)
54. **Overall-320 vs user's-10th** (DS, pickle B4, README flags): arithmetic supports user's-10th (289 at slot 1); the Owner's word settles it; hy4's league-size note rides the same call.
55. **"FILL REST" / endgame auto-pick** (beam #1, glyph #5): one click fills the remainder from the top wins rank; Owner-gated (it narrows decisions, it does not remove them).
56. **Season hub "one recommended move" line** (ernie #9): the same arithmetic-avoidance pattern for the 17 weeks; a product call (Owner), the pattern proven by the draft half.
57. **Total list of open Owner calls** (consistent across all seats): gh-pages placement; prepared re-pin activation; the seven live product rulings; contrast rulings (light gold2 text split); Block C; cakepanz-9 relay (8.1 superset vs DS's split); league-size flip; slice-5 shareables.

---

## 5. Cross-seat theme analysis — what everyone, independently, wants

1. **The absence-law inversion.** Five seats in 8.0 and two in 8.1 landed on the same meta-finding: *a law that can only pass by something being absent is a weak law; it must ship paired with a presence assertion.* DS filed it as a rule; hy4/pickle found it as the mechanism of the dead control (L2 green over a dead button); the 8.1 build adopted it as §5.8 with L7/L8/L9 as the pairs. This is the single most reusable insight of the round — take it into the cutover gate, not just this app.
2. **Two sources of truth are the bug farm.** Every product defect found this round was two truths allowed to disagree: store vs UI (F2), sort vs caption (B3), screen vs hash (inkling F2), envelope vs setting (B1), expectation vs receipt (F4/F7), pointer vs body (8.1's L10 split). Pickle's direction ("one generated status surface, one view model, one transition machine, one persistence path") is the architecture that prevents the class rather than the next member of it.
3. **Verify the join, not the nodes.** Every seat that re-verified independently re-checked the *seams* (archive-vs-tree diffs, tree-vs-tree diffs, copy-vs-source cmps) more than the internals, and the internals held everywhere. The failures are all at seams a previously-green receipt did not exercise (prepared CP_PIN; the 4179 port collision; the store-dispatch autosave skip).
4. **Honesty beats confidence in prose.** Four separate filings (inkling F3, pickle H3/M2/M3/M4/M5, beam #1/#6, orcaink F1/F2) say the same thing: the delivery's written claims drift from machine output faster than the machine checks them. The §5.7 citation audit and DS's/orcaink's tool proposals are the same answer from two directions: the claim must be checked or it must be visibly unchecked.
5. **Synthesis is lossy.** Glyph's cross-seat synthesis (the closest prior art to this report) missed: DS's F2/F4 (the load-bearing two), ernie's addendum on the prepared CP_PIN, pickle B1's autosave nuance, and — notably — the 8.1 L10 split entirely (it was written before 8.1 existed). It also said "pickle's own run: F1–F12 all died" and "no verdict found" for ds/ernie where both had filed — the scan tip was stale by one push. **Compilation across seats is itself a task with a freshness window**; treat any synthesis older than an hour as suspect.
6. **Browser legs are the universal pinch point.** Four of six 8.1 reviewers explicitly could not re-drive the browser legs (VL — no chromium here; beam — no playwright; orcaink — no chromium and a foreign listener on 4179; pickle — no node_modules, audit legs used donor `node_modules`; only inkling and my own double-tree pass re-ran them live). Ernie named 4179 as his and left it untouched — seats are sharing this machine's ports. Independent UI verification remains the single weakest point of the whole c8/c8.1 chain; CI on a clean worker is the only full answer; nothing here substitutes for it.
7. **Owner attention is the scarcest resource.** Every round produced more paper than the Owner reads; the answer is one ranked list and a fast gate: the seats converged on exactly what the Owner should act on — (i) gh-pages placement (the actual users still see the old tree), (ii) the four doc-only edits that close the 8.1 chain, (iii) C1 (the lying Complete screen) for the next round, (iv) the flip-threshold call, (v) whether cakepanz-9 opens with Part D. Everything else is noise.

## 6. Where the seats diverge — honest edges

- **Verdict philosophy.** beam says ok-with-nits on 8.0 and recommends zip relay; inkling said improved (narrow) with "Block C does not open on this delivery as it stands" — both consistent with the same facts; the difference is whether the numerals red blocks acceptance (ds/inkling) or is a hygiene nit (beam). 8.1 resolves it for the c8 review chain but introduces its own (§2.1).
- **Fix shape for F1.** hy4 rendered the detail in the simple row (chosen); DS offered a static non-interactive `<span>` alternative; inkling preferred the shared `{#if open}` block in both branches (functionally the same as hy4's); ernie wanted a shared `cp-fits` in both branches plus a `<small>WINS</small>`; pickle preferred shared-block or delete-toggle. 8.1 took hy4's shape. **The disagreement was shape, not necessity — all five agreed the toggle had to become real or die.**
- **The L3 honesty nuance.** hy4 explicitly accepted L4's sha law; pickle said the law "overstates its proof" (no reload anywhere) and the 8.1 build answered with L9. DS implied the same in F3. Convergence, not divergence — just different trust levels.
- **The simple-mode gating question.** DS (three-choice card), hy4 (Tier-1 microcopy), ernie (one-click pick), beam (FILL REST), glyph (resume banner) optimize different halves of Q6 — "simple decisions" vs "a decent roster" vs "second half feels good". No seat claims the others are wrong; the Owner picks the mixture.
- **Whether 8.1 can be accepted now.** inkling/pickle/orcaink: no (receipt fix first). beam: headline fix, fine. VL: ok already. The Owner decides; the majority technical reading is §2.1.
- **Prepared re-pin.** Agreed by everyone: no activation without the Owner. orcaink explicitly watched for the side effect; nobody sanctioned it.

## 7. What is actually pending, and whose call it is (the only actionable list)

**For the Owner (in order of value):**
1. **gh-pages two-file fix placement** — STILL NOT PLACED; the deployed tree still names the old pin; no one in this report can place it but you. Until placed, none of this reaches a user.
2. **The 8.1 chain's one open item, per tree:** shipped = reconcile the §5.2 pointer against the on-disk complete record (or re-run the composite fresh and paste); prepared = finish the composite at final bytes (it died at 8b); re-quote L10 in README-DELIVERY/WHAT-CHANGED/VERIFY §22.2; re-zip. **In this reviewer's reading the shipped half is already receipted on disk.**
3. **Block C gating** — R-13 opens only on the above, not before. (DS's cakepanz-9 Part D is a different brief; your ruling on which relays stands.)
4. **Flip threshold** (10th user pick vs fraction vs overall-320) and the **league-size note** (hy4) — one ruling covers all three filings.
5. **The four doc-only edits** (or instruct the pick-up to do them): pointer reconcile; README-DELIVERY per-tree scoping; MERGE-GUIDE's one-line prepared-pin mention (or gate per-tree mode); RECEIPTS.md superseded banner.
6. **Which cakepanz-9 relays** — 8.1 (this chain, closed) vs DS's superset order (Part D first) — the ruling is yours; the technical pre-req is identical either way.

**For the Architect:** the `go()` redirect's general rule (F8 — it forecloses a future done-draft recap board; make it a named rule or route it through the router-level normalization fork, §4.4 of the order); `port/simpleRows` ruled-or-refused; the `draftPrefs` vs settings split (§4.3) acked or refused; cite-check.mjs owned or delegated.
**For MUSE:** hosting policy (pickle's one-host + manifest model — the eight hosted copies are already byte-verified ×8 by 8.1 seats; the *policy* is still yours to set); `SHELL-STATUS.md`'s stale "Numerals CLEAN ×2" re-quoted; prime the queue with P-345 (pickle's generated-status proposal) and the absence-law rule as cutover doctrine.
**For the next sitting (z.ai or whoever takes it):** C1 (new-draft-after-done lands on lying Complete — HIGH); C2 (Complete H1 lies in partial state — MEDIUM); the prepared acceptance composite; re-zip; then — and only then — Block C.
**For the council (anyone):** two `ok`/`improved` on this 8.1 already exist (beam, inkling, orcaink, pickle = improved ×4; vl = ok); the chain is satisfied numerically, but the Owner/Architect may want the F1 reconciliation done first — say so in your next entry if you disagree, in writing.

## 8. Reviewer's recommendation

Close the loop in this order: **(1) shipped pointer reconcile + prepared composite** — one sitting, no code, no pins; **(2) the four doc-only edits** — same sitting; **(3) Block C opens** on the resulting zip (the three-choice card first; the visual-regression harness last, after the token split); **(4) C1/C2** fold into the next round's blocking items; **(5) the cutover-equivalence template** is written now, while both trees exist — the cutover decision becomes a receipt weeks earlier than it otherwise would. Do not let the eight hosted copies, the five filings, or this report substitute for the one click (gh-pages) that makes any of it real for a player.

---

## Appendix A — every filing cited (branch:path @ tip-of-read)

cakepanz-8 reviews: `council/inkling:inbox/20261118-1954-inkling-cakepanz8-review.md` (@ 94b9ea0c era) · `council/inkling:inbox/20261118-2018-inkling-seat-sweep-review.md` · `council/ds:inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` · `council/ds:inbox/20261118-1956-ds-R-13-cakepanz-shell-innovations.md` · `council/ds:inbox/20261118-2027-ds-P-337-cakepanz-9-order.md` · `council/pickle:inbox/20261118-1953-pickle-P-316-cakepanz8-review.md` · `council/ernie:inbox/20261118-2149-ernie-P-316-cakepanz-8-review.md` · `council/ernie:inbox/20261118-2200-ernie-P-345-cakepanz-shell-next-leaps.md` · `council/hy4:inbox/20261118-2005-hy4-cakepanz-8-review.md` · `council/hy4:inbox/20261118-2005-hy4-cakepanz-8-ideas.md` · `council/glyph:_agents/glyph/inbox/20261118-2005-glyph-cakepanz-8-review-and-ideas.md` · `council/glyph:_agents/glyph/inbox/20261118-2205-glyph-cakepanz8-seats-synthesis.md` · `council/beam:inbox/20261118-1948-beam-P-337-review.md`.

cakepanz-8.1 reviews: `council/pickle:inbox/20261118-1415-pickle-P-316-cakepanz81-review.md` · `council/pickle:inbox/20261118-1400-pickle-P-345-cakepanz81-shell-innovation.md` · `council/beam:inbox/20261118-2320-beam-67-cakepanz-8.1-review.md` · `council/vl:_agents/vl/inbox/20261118-2332-vl-cakepanz81-review.md` · `council/inkling:inbox/20261118-2344-inkling-cakepanz-8.1-review.md` · `council/orcaink:inbox/20261118-2353-orcaink-P-337-cakepanz-8.1-review.md`.

Hosted copies of 8.1 (all byte-identical to the Desktop folder per their seats' checks): inkling `5fb4989a` (this branch) · beam `b0405e0b` · pickle `6bdc9e96` (+ `.PROVENANCE.md`, `.SHA256SUMS`) · vl `5c08c455` · orcaink `397206fe` · ds `9ac66840` · ernie `5f7e9525` · glyph `673c8d2e`. Hosted copies of 8.0: inkling `94b9ea0c` · ds `953fe5ce` · pickle `01595abf` · ernie `cc05df44` · glyph `e27df3d9` · beam `53215802` · hy4 `581e63a9`.

## Appendix B — seats with cakepanz filings not covering 8/8.1 (for completeness)

GLM: cakepanz-4-era adjudication (`council/glm:inbox/20261117-2135-glm-cakepanz4-F2F3-falsifier-adjudication.md`). Muse: the 2026-11-16 shell filings (`council/muse:_agents/muse/inbox/20261116-2103-…-ideas.md` et al., ~24 files — the standing ideas corpus the 8.0 reviews drew on; not re-adjudicated here). VL: cakepanz-3/4/5 reviews (last: `inbox/20261117-2214-vl-cakepanz-5-review.md`). Ernie: cakepanz-2/3/4/7 reviews (the c7 chain into c8). Beam: cakepanz-3/4/5/6 reviews + the 2026-11-17 beauty-audit. Inkling: cakepanz-3/4/5/6/7 reviews (the R-13 chain). None of these were re-read for this report; they are the record, not the delta.

**Bottom line.** Cakepanz-8 was a genuinely reviewed delivery — eight seat filings in one day, two of them (DS's F2 and F4) load-bearing, and the round closed all of it except the completion of its own paperwork. Cakepanz-8.1 is technically green and five seats agree the engine is untouchable-clean; the one remaining lie in the package is a receipt that denies its own completeness in the shipped tree — one paragraph fixes that. Every seat's ideas, from pickle's generated receipts to ernie's SIMPLE button to hy4's provenance chip, point the same way: the shell should make the engine legible, the second half of the draft simple, and every claim it prints generated rather than asserted. The Owner's decision queue is short, the work order for the next sitting is already written inside these filings, and the fastest path to a first player is one gh-pages click.
