# Round 3 — rules & language audit, adversarial verification, lists v3, must-not-lose v3 (Pickle)

**Identity.** Pickle · reference v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 B) · donor `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 B) · admitted via M-9, ID block **S-800–899** · 20 Oct 2026 · English only.
**Methods.** Every number below has a command in `_agents/pickle/evidence-round3.txt`, written this session.

---

## 1. RULES-AND-LANGUAGE AUDIT

**One-line confirmation of shared read (required).** I operate from the same read as the rest of the council: Owner rulings R1–R5 in `_agents/ds/notes/Owner-Rulings-19-Oct.md` (R1 deployment out of scope, R2 v20 is the reference and canonical is the donor, R3 Claude is the technical authority, R4 no deputy and no rank-by-being-online, R5 never edit another session's file), plus bulletin M-1 (flat council) and M-7 (English only) and house rules 1–10 as they stand at the head of `COUNCIL-BULLETIN.md` — the same seven-non-negotiables read every other session read.

**Ambiguous wording found, with the exact fix.**
1. **Rule 3 vs rule 9 (numbering).** House rule 3 says "Number your message `M-<n>`, next in sequence"; rule 9 says "if your number is taken, take the next free and cite the collision". Those are two different instructions on the same action, and the 19 Oct three-way M-9 race is the proof they collide. **Fix:** amend rule 3 to read "Number your message `M-<n>`, **the next free number after reading the tail** (rule 9)" — i.e. make rule 9 the primary and rule 3 the pointer. One-line edit; not mine to make (R5).
2. **Rule 6 evidence standard is a preference, not a required shape.** "best the full sha256 line of the reference build" — "best" tells a joiner it is optional; nothing states the _minimum_. Two joiners this week logged arrival without a hash line and neither was rejected. **Fix:** "At minimum the arrival line carries one command and its output **including the build hash you measured**; a line without a hash does not satisfy rule 6." Turns a preference into a gate.
3. **R2's "reference build" vs rule 5's "the canonical root".** R2 says v20 is the build everyone reviews; rule 6 and `INDEX.md` say the root filesystem is canonical. Both are true, but "canonical" now means two things (canonical _documents_ at root, canonical _build_ = v20). This is the seed of the next liveness dispute. **Fix:** in `INDEX.md` line 5, write "v20 is the canonical **build**; the root directory holds the canonical **documents**" — one clause, kills the ambiguity.
4. **R1 vs everyone's critiques.** R1 puts deployment out of scope; Ultra's C7 re-raised it one round later, and DS's M-11 O-list does not touch it. Not a wording ambiguity — a _compliance_ gap: nothing marks a critique as "withdrawn by Rn". **Fix:** ask the queue-keeper to add a one-line `[WITHDRAWN-BY-R<n>]` tag convention for entries and critiques; then a withdrawn item is visibly retired instead of silently ignored.

**SELF-AUDIT — every file I edited or posted in since Round 1 (R5 discipline).** My lane is `_agents/pickle/` + my own sections. Complete list:

| File                                                  | What I did                                                                                   | Whose section          | R5 clean? |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------- | --------- |
| `_agents/pickle/architecture-review-M8.md`            | created (M-9); appended one dated correction note (Round 2)                                  | my own file            | yes       |
| `_agents/pickle/evidence-m8.txt`                      | created                                                                                      | my own file            | yes       |
| `_agents/pickle/evidence-round2.txt`                  | created                                                                                      | my own file            | yes       |
| `_agents/pickle/evidence-round3.txt`                  | created this round                                                                           | my own file            | yes       |
| `_agents/pickle/round2-peer-review.md`                | created                                                                                      | my own file            | yes       |
| `_agents/pickle/specs/M-8-merge-manifest-addendum.md` | created (M-9); amended in place this round with a dated header                               | my own file            | yes       |
| `_agents/pickle/round3-review.md`                     | created this round                                                                           | my own file            | yes       |
| `COUNCIL-BULLETIN.md`                                 | posted **M-9**, **M-13**, **M-20**; edited only my availability line                         | message list + my line | yes       |
| `CHRONICLE.md`                                        | appended 8 lines, all signed `Pickle` (M-9 pass, round-2 seeds, wrapper finding, correction) | facts log, append-only | yes       |
| `QUESTIONS-FOR-THE-ARCHITECT.md`                      | added `Q-PICKLE-1…9`; appended an amendment note under Q-PICKLE-1 this round                 | my own block           | yes       |

**I have never edited**: the product file (either build), `AGENTS.md`, `STATUS.md`, `GOVERNANCE-ROUNDTABLE.md`, `SUBMISSIONS.md`, `INDEX.md`, or any other session's file or lane. **One honest flag against myself:** my `_agents/pickle/architecture-review-M8.md` and `specs/…addendum.md` were _edited in place_ this round (correction notes) rather than appended as new files. Both are my own files so R5 is not in question, but bulletin rule 2's spirit ("post a correction, do not rewrite") is better served by append; I have kept the original text visible under an amendment header rather than deleting it, which I believe satisfies the rule — flagging it so the Owner can rule if she disagrees.

**Cross-file governance check (not mine to edit, but relevant):** EVIDENCE — `grep -c "B1" AGENTS.md` = 0 — Ultra's C2 ("AGENTS.md claims B1–B4 adopted") is still true as a _document_ defect: `tests/CONTRACT.md` line 5 says "amended by the implementer's Round-1 pre-dispatch rulings (B1–B4 …)" and line 17–21 quote B1's ruled semantics, but `AGENTS.md` never mentions B1–B4. This is a real, cheap fix (one line in AGENTS.md) that would retire Ultra's C2 and DS's C3 in the same edit. It belongs in the Owner's queue.

---

## 2. ADVERSARIAL VERIFICATION (command output only)

### 2a. DS's funcdiff — **CONFIRMED, exactly**

I ran DS's own tool and, separately, re-implemented the diff independently (python3, project-style close on a lone `}`); both agree to the number and the sets.

```
$ node _agents/ds/tools/funcdiff-probe.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html"
   409 top-level functions (v20)
   412 top-level functions (donor)
common 408 | identical 394 | differing 14
A-only 1: updateStepper
B-only 4: seasonToast, goSeason, meetingInfo, meetingTagText
```

My independent re-run: `v20 funcs: 409 · donor funcs: 412 · common 408 | identical 394 | differing 14 · v20-only ['updateStepper'] · donor-only ['goSeason','meetingInfo','meetingTagText','seasonToast']`. **The sets match DS's exactly.** (My first attempt gave 315/298/17 — that was _my_ extractor truncating functions whose body contains a nested block closing at column 0; the project style closes with a lone `}`, which is what DS's probe uses. The correct unit is **named functions per file**, and it is 409/412. Recording this because it is the second time this week a method difference, not a file difference, produced a fake conflict.)

### 2b. The `cpuPick` DIRECTION — **I was wrong; the DONOR is the keep target**

Command output from my own extraction (this session):

```
hash v20:   fa6d752969e4
hash donor: a2b8190e98f8
token            donor  v20
curRound           4     0
topAvail           4     0
posBest            2     0
ovrFloor           2     0
donor miss:  const reach = 3 + Math.min(9, Math.floor(Math.abs(randNormal())*4));
v20   miss:  const c = cands[3 + Math.floor(Math.random()*Math.min(90, cands.length-3))];
```

The donor carries the credible-GM machinery (`curRound`/`topAvail`/`ovrFloor`, first-sight `posBest` gating rounds ≤3) and a **bounded, floor-checked** miss (`reach` ≤ 12 deep, accepted only if the reached player clears the round floor). v20 has none of those tokens and a miss up to **92 deep** (`min(90, len-3)`), with no floor check. **Verdict: the keep target is the donor's `cpuPick` (`a2b8190e98f8`).** My M-13 #2 ("keep v20's") was **BACKWARDS** and is hereby withdrawn; DS (M-16) caught it and I confirm it against my own command output.

### 2c. Math gate re-verified (unchanged from Round 2)

`simulateGame` `dc54e4210ce1` **both** builds; `slotWins`, `slotWinsPerOvr`, `modelWeights`, `effOvr`, `optimalLineup`, `matchupModel`, `teamRatings` **all IDENTICAL**; `localStorage` 0/0. The eight-function hash gate stands; the only change is that it must now also assert the **donor's** `cpuPick` hash as a _keep_ condition.

---

## 3. Updated three lists — deltas marked

### Critiques (council)

| #             | Critique                                                                                                                                 | Δ since R2                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| C-1           | No terminal-state obligation: entries stay `pending` with no close rule                                                                  | unchanged                                                                                                  |
| C-2           | Three constitutions in force (AGENTS vs R2/INDEX vs COLLECTIVE-PROMPT); **add: AGENTS never states the B1–B4 rulings CONTRACT.md cites** | **extended** (concrete, one-line fix)                                                                      |
| C-3           | Evidence tags not machine-checkable                                                                                                      | **narrowed further** — rules 9/10 now cover numbering + units; the tag-shape half remains                  |
| C-4           | No size ceiling enforced                                                                                                                 | unchanged                                                                                                  |
| C-5           | Nothing runs the rules (lint)                                                                                                            | **strengthened** — three concrete lints already proposed by DS (O1/O5/O8); mine folds them into one script |
| C-6           | The wrapper fix as written was unsafe (now corrected)                                                                                    | **resolved** — DS withdrew P2 in M-16; my wrapper finding accepted                                         |
| **C-7 (new)** | **The rules themselves contradict each other** (rule 3 vs 9; rule 6 "best" vs a gate; "canonical" = two things)                          | **new this round** — §1 above                                                                              |
| **C-8 (new)** | **No `[WITHDRAWN-BY-R<n>]` convention**, so superseded critiques keep being re-raised (Ultra C7)                                         | **new this round**                                                                                         |

### Technical critiques

| #             | Critique                                                                      | Δ since R2                                                                                                                                                                                                                                            |
| ------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-2           | Math core byte-identical → pin hashes                                         | **confirmed**; gate now adds the donor-`cpuPick` keep condition                                                                                                                                                                                       |
| T-4           | 58 `Math.random()` occurrences / 39 lines, no seed                            | unchanged (DS: donor is 56/38 — both builds unseeded)                                                                                                                                                                                                 |
| T-5           | Data is 126,222 B in two lines (DS P1)                                        | unchanged, unrefuted                                                                                                                                                                                                                                  |
| T-6           | v20 double-wrapped + double-closed; two different `color-scheme` declarations | **confirmed**; DS accepted in M-16                                                                                                                                                                                                                    |
| T-7           | No engine-layer presence gate                                                 | **kept but narrowed** — with the merge at 14+5 functions, the "engine layer" is not a feature layer; the presence gate now covers the **four donor-only helpers** (`goSeason`, `meetingInfo`, `meetingTagText`, `seasonToast`), not a whole subsystem |
| **T-8 (new)** | **Keep-oracle must be per-function and hash-pinned**, not prose               | **new** — the `cpuPick` reversal is proof that prose "keep X" is not enough                                                                                                                                                                           |
| T-1           | CONTRACT C2 "unsatisfiable"                                                   | **withdrawn (R2)**                                                                                                                                                                                                                                    |

### Improvements applied now

1. This file + `evidence-round3.txt`.
2. **Revised my own addendum** (`specs/M-8-merge-manifest-addendum.md`): D-a corrected to "take the donor's `cpuPick`"; D-b corrected to "14 + 5, not a feature layer"; math gate now asserts the donor hash for `cpuPick`; §5 marked withdrawn. Cornerstone of task (a).
3. Appended the dated amendment to `Q-PICKLE-1` (task (c)).
4. Bulletin **M-20**; availability line updated.
5. CHRONICLE lines for the confirmation + the reversal.

### With Owner permission (updated)

| #             | File                              | Exact change                                                                                                           | Δ                                  |
| ------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| P-1           | `tools/lint-council.sh` (new)     | one dependency-free smoke alarm covering rules 3/6/9/10 + evidence-tag shape                                           | unchanged                          |
| P-2           | `tests/CONTRACT.md`               | append under C2.4 the measured `INFO dom_text_refs` baseline (172 lines / 195 occurrences) — **no semantic change**    | unchanged                          |
| P-3           | `CHRONICLE.md`                    | hash-gate + wrapper lines                                                                                              | **refreshed** with the R3 receipts |
| P-4           | `GOVERNANCE-ROUNDTABLE.md` §8     | dated note: M-9 #2 reversed                                                                                            | unchanged                          |
| P-5           | `AGENTS.md` Key Files             | pin protected hashes (`tests/math-baseline.json`), **donor hash for `cpuPick`**                                        | **updated**                        |
| **P-6 (new)** | `COUNCIL-BULLETIN.md` house rules | rule 3 → "next free after reading the tail (rule 9)"; rule 6 → minimum = one command + its output incl. the build hash | **new**                            |
| **P-7 (new)** | `AGENTS.md`                       | one line stating the B1–B4 rulings + a pointer to `tests/CONTRACT.md`, retiring Ultra C2 / DS C3                       | **new**                            |

---

## 4. MUST-NOT-LOSE v3 (deltas from v2 marked)

1. **The math gate (8 functions) — unchanged, still first.** `simulateGame` `dc54e4210ce1` both; eight protected functions byte-identical. _(Pickle M-9; reproduced R3)_
2. **CHANGED: keep the DONOR's `cpuPick` (`a2b8190e98f8`), not v20's.** _[was: keep v20's — WRONG]_ The donor has `curRound`/`topAvail`/`ovrFloor`/`posBest` (0 in v20) and a bounded floor-checked miss; v20's reaches 92 deep. The gate must assert the donor hash as a _keep_ condition. _(correction of Pickle M-13 #2; DS M-16; my receipt §2b)_
3. **NEW: the merge surface is 14 differing functions + 5 set diffs + wrapper/CSS** — not a Season feature layer. Donor-only helpers to preserve: `goSeason`, `meetingInfo`, `meetingTagText`, `seasonToast`; v20-only to preserve: `updateStepper`. _(DS M-16; my independent re-run)_
4. **Wrapper: v20 is double-wrapped and double-closed, and the two prefixes declare different `color-scheme` (`light` vs `light dark`).** Remove the _duplicate_ wrapper + _duplicate_ close, keep the donor's structured header; the Architect decides the `color-scheme`. Do **not** "relocate-then-delete". _(Pickle M-13; DS accepted M-16)_
5. **Persistence is new work, not a merge regression** — `localStorage` 0/0; declare it out of scope in the manifest or its absence reads as a bug. _(4-way; unchanged)_

_(Six items would be needed to keep a presence gate; since the merge is now 14+5, I fold the donor-only-helper preservation into #3 rather than list it separately — honesty over volume.)_

---

## 5. Five-bullet input for the consolidated brief (Super assembles, DS's format)

- **Build state:** v20 `31b7d61f…` 649,032 B is the reference; donor `77bb9ed5…` 650,127 B donates fixes; merge surface = **14 differing functions + 5 set diffs + wrapper/CSS** (409/412 named functions, 408 common, 394 identical).
- **Merge gate (the one command that matters):** assert the eight protected math functions byte-identical to v20 **and** `cpuPick` byte-identical to the **donor** (`a2b8190e98f8`); both are one loop and catch the two silent-merge accidents.
- **Keep-oracle:** per-function, hash-pinned — the `cpuPick` reversal (three posts recommended "keep v20's") is proof that prose is not enough; the merged manifest must carry a take-this-parent line per differing function.
- **Wrapper:** v20 double-wrapped + double-closed; the two prefixes disagree on `color-scheme` (`light` vs `light dark`) — remove the duplicate, keep the donor's header, Architect calls the theme.
- **Blocked/absent, declare in the manifest:** persistence is **new work** (`localStorage` 0 in both), SIM-CORE markers are **absent in both** (build them once on the merged hash), and the harness does not exist yet — no statistical gate may be claimed until it does.

---

_Filed 20 Oct 2026 by Pickle. All numbers reproducible from `_agents/pickle/evidence-round3.txt`. My M-13 #2 is withdrawn and corrected at source (addendum §2 D-a, Q-PICKLE-1 amendment, must-not-lose v3 #2). Nothing here edits the product, another session's file, or any document outside my own lanes._
