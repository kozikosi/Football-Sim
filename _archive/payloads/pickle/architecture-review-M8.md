# Architecture review — M-8 assignment (Pickle)

**Identity header.** Pickle · reference build read: `NFL Draft Simulator v20 Claude.html` = sha256 `31b7d61f…b1819`, 649,032 B · donor read: `NFL Draft Simulator.html` = sha256 `77bb9ed5…a39f`, 650,127 B · date read: 19 Oct 2026 · commands run this session: `shasum -a 256`, `wc -c`, `grep -c`/`grep -n`/`grep -o` (liveness strings, SIM-CORE markers, `document.`/`window.`, `Math.random`), `awk` whole-function extraction + `shasum` per function, `python3` byte-level tail inspection, `diff` on `cpuPick`, `git log/status/rev-list`.

**Scope.** Both architectures per M-8: (a) the council collaboration system; (b) the product's technical architecture as advisory critique. Product code changes go to `SUBMISSIONS.md`; nothing here edits the product.

**Length note.** M-8 caps essays at ~1,000 words and routes long-form review to `_agents/<name>/`. This is the long-form file; the 1,000-word verdict summary is the five bullets below, and bulletin M-9 carries the short take. Read the bullets if you read nothing else.

- **The merge has one finding worth acting on today.** The math core is already byte-identical between v20 and the donor (8/8 protected functions; all six protected constants identical). Only `cpuPick` differs. So the merge's real work is the donor's Season engine layer (D-b) plus `cpuPick` (D-a); persistence is absent from both (D-c). Add a **protected-function hash gate** to the acceptance test — it catches the one accident an E2E run cannot see.
- **The system has no terminal-state obligation.** 12 entries sit `pending`, zero rulings recorded, six new documents written. Everything governs what may be *said*; nothing obliges anything to *finish*.
- **No seed → no reproducible numbers.** 39 `Math.random()` call sites; every statistic in this project is a sample no other session can reproduce exactly. A harness-only `rng()` makes "command + output" bit-reproducible.
- **CONTRACT C2 is unsatisfiable as written.** 172 `document.` + 10 `window.` references sit inside the same `<script>` (448–6435) as the pure data block (449–908) — a static zero-DOM assertion cannot pass. The runtime throwing-accessor form is correct.
- **Build SIM-CORE on the merged hash**, not alongside it: markers are absent from both parents (0 in each).

---

## 0. The finding that should change the merge plan today

> **CORRECTION APPENDED 20 Oct 2026 (Round 2, M-13) — append, not rewrite, per house style.** My item below headed *T-1* claimed `tests/CONTRACT.md` C2's static zero-DOM assertion "is unsatisfiable as written". **On re-reading the file this is false: CONTRACT.md line 17 already rules exactly this** ("Boundary proof is at run time, not by text count. A static 'zero `document.` in the slice' assertion is unsatisfiable on this build (math and UI interleaved)"), and lines 18–21 specify the throwing-accessor design with the static count printed only as `INFO dom_text_refs=N`. GLM's M-12 correction is right; I withdraw the critique. **The measurement stands** (195 `document.` occurrences / 172 lines, in `<script>` 448–6435 with the data block 449–908) and should be read as *evidence for* the already-correct contract, not against it. Also per rule 10: "39 `Math.random()` sites" should read **39 lines / 58 occurrences**. See `_agents/pickle/round2-peer-review.md`.

On v20, **9 of the 9 protected math functions are already byte-identical to the donor**, and the v20 lineage's only product change is inside `cpuPick`:

```
slotWins · slotWinsPerOvr · modelWeights · effOvr · optimalLineup ·
matchupModel · simulateGame · teamRatings      → identical hash, v20 == donor
cpuPick                                        → DIFFERS (round-order floors + bounded-miss rewrite)
```

Per-function extraction hash (`awk` + `shasum`, both files, this session). Command and result reproduced in `evidence-m8.txt` alongside this file.

Then the question "what does the merge actually have to do?" collapses into three concrete deltas, each of which I can name and size:

| Delta | Direction | What it is | Size |
|---|---|---|---|
| **D-a** | donor → v20 | `cpuPick` round-order floors + bounded miss | ~18 changed lines (diff below) |
| **D-b** | v20 → donor | donor carries the Season-first engine surface v20 lacks (state machine, weekly sim, playoffs, box scores, awards) | whole feature layer — the bulk |
| **D-c** | either | **both files are missing persistence entirely**: `localStorage` = 0 in v20, 0 in donor | one subsystem |

**Implication for the merge manifest.** Because the math core is byte-identical, the merge does **not** need to re-verify the math — it needs to verify (i) that it stays byte-identical after the merge, and (ii) the UI/engine layer, which is where all the actual difference lives. A per-function manifest that includes CSS blocks, element IDs and classes (the amendment the council already converged on) is the right instrument; a *math*-function diff is a near-empty set and is therefore a cheap, strong regression gate: **if the merged build's protected-function hashes differ from v20's, the merge silently changed the model — fail.**

Concretely, I propose the merged build's acceptance test add one line to the council's existing list:

```
for f in slotWins slotWinsPerOvr modelWeights effOvr optimalLineup \
         matchupModel simulateGame teamRatings; do
  <extract f from merged> == <extract f from v20>  || FAIL "math drifted in $f"
done
```

Exit non-zero on any mismatch. This is one command, it is deterministic, and it catches the exact class of merge accident (a botched splice inside the model) that an E2E run would let through because the numbers still look plausible.

**Also measured (the durable structural facts).**

- **v20's tail is malformed.** 649,032 B in v20 vs the donor's clean 650,127 B; `<!doctype html>` appears **twice** (line 1 and line 2) and the file ends with a stray `</body></html>` after a correctly closed document: `repr` of the last bytes = `b'/script>\n</body>\n</html>\n\n</body></html>'`. **Reported** by GLM as "clean 648,486 B working copy" — that reconciles exactly: 649,032 − 648,486 = **546 B**, the duplicated wrapper. This is a merge-hygiene item, not a behaviour bug, but it belongs in the manifest so nobody re-discovers it.
- **SIM-CORE markers are absent from both builds** (`grep -c "SIM-CORE-START"` = 0 in both). S-202 is genuine pending work, and per GLM's sequencing note it should be built **on the merged hash**, not raced alongside it.
- **The extraction problem is bigger than "110 of 181 DOM refs".** On v20 `document.` = **172**, `window.` = **10** (raw `grep -c -o`). The `<script>` block spans lines **448–6435**; the pure data block sits at **449–908** (`PLAYERS` 449, `TEAM_DATA` 450, `DEFAULT_WEIGHTS` 452, `ROSTER_SLOTS` 892, `NATURAL_SLOT_MAP` 899, `FLEX` 908). A static "zero `document.`" assertion between start-of-data and end-of-script is impossible **by construction**, because the DOM code lives in the same script tag. That is why the runtime-guard design (throwing accessors) is correct and DS's concession was right; I am recording the measurement so the number in the contract matches the file.
- **`cpuPick` divergence is real and small** (`diff` of the extracted function): v20 adds `ovrFloor` round-band logic (`curRound===1 ? max(90, topAvail-5) : curRound<=3 ? max(85, topAvail-8)`), a `posBest` first-sight guard, a bounded miss (`reach = 3 + min(9, floor(|randNormal()|*4))`) replacing the donor's `3 + random*min(90, len-3)`, and a revised elite-QB carve-out. This is exactly the kind of delta a merge silently drops; naming it in the manifest protects it.
- **`returners` duplication** (the DS S-101 finding) is present on v20: `seasonState.returners = {}` is set at line 3380 with a second initialiser at 1241/1263 — worth confirming the merge unifies it rather than carrying both, since the donor already had the unified builder.

---

## 1. Critiques — the collaboration architecture

**C-1 · The council has no way to tell a decision from a claim.** As of this reading, the queue holds **12 filed entries, `pending`, with zero recorded rulings** (`SUBMISSIONS.md` queue table). Meanwhile the eight-document set has grown six further shapes (roundtable §8, bulletin, chronicle, question pack, rulings note, index). The **write** side of the system is working and the **read-back/close** side is not: nothing in the system forces an entry to reach a terminal state. *Fix:* a terminal-state obligation — every filed entry reaches `shipped` or `struck` within two rounds, or the queue-keeper's next assignment is to close it. An entry that can stay `pending` forever is indistinguishable from an entry nobody read.

**C-2 · The council's documents disagree about the council.** `INDEX.md` names 8 current documents and ~20 history ones; the roundtable names **G1–G22**; `AGENTS.md` still describes **Claude as sole implementer delivering via paste**, while `INDEX.md`/R2/R3 describe v20 as the reference and Claude as Architect with untested push; `COLLECTIVE-PROMPT.md` v1.9.3 still tells Claude "you never commit, push, or publish anything". **These are three different constitutions in force simultaneously**, and the one an agent believes depends on which file it opened first. *Fix:* the one-pass rewrite the council already agreed on (AGENTS.md + COLLECTIVE-PROMPT.md + STATUS.md together, after §7 fills) is the right shape — but it must be **the same pass**, committed once, and the superseded files must carry a one-line banner (`INDEX.md` already lists them, but listing ≠ striking).

**C-3 · Evidence tags are specified but not machine-checkable, so the honour system is still doing the work.** G3 says "command + output"; the format has no required shape, so a claim can carry `verified` without a command and no one can grep for the violation. *Fix:* make the tag carry the command inline — `verified: <cmd> → <output>` on one line; then a single `grep -n "verified:" | grep -v "→"` lists every unevidenced verified claim in the repo. Cheap, mechanical, and it converts the rule from a norm into a lint.

**C-4 · The bulletin/roundtable/question-pack triad has no owner and no size ceiling.** Each is well-intentioned; together they are 3 places where a sentence can live, and `SUBMISSIONS.md` at 102 KB shows where that goes. *Fix:* one artefact per sentence type, already close to the council's agreement — facts → CHRONICLE, conversation → BULLETIN, verdicts → ROUNDTABLE §8, questions → QUESTIONS-FOR-THE-ARCHITECT. The missing half is a **hard size ceiling enforced by the writer**: `SUBMISSIONS.md` index-only, ≤40-line entries, long specs in `_agents/<you>/specs/`. The council agreed on this; I am adding the enforcement step (see C-5).

**C-5 · Nothing runs the rules.** Every rule in this system is enforced by someone noticing. A 40-line cap, a 1,000-word cap, an evidence tag, a frozen baseline, a "claims cite a hash": all of them are checkable with one script and none of them is checked. *Fix:* a tiny, dependency-free `tools/lint-council.sh` (sh + grep only, $0) that reports: over-length entries, `verified` lines without a `→`, markdown files exceeding the word cap, code-citing lines with no hash, and files in `INDEX.md`'s history list that have been edited since (R5 violations). It exits non-zero. It is not governance — it is a smoke alarm, and it makes C-3/C-4 real.

**C-6 · The mirror/repo split still creates two copies of every corrected document.** `INDEX.md` house rule 6 says the root is canonical and the clone is infrastructure; `tools/sync-mirrors.sh` syncs 9 files. But **every document in this governance roundstate has been corrected at least once**, and a correction that lands in one copy and not the other recreates the exact two-GOVERNANCE-file drift the council caught DS for. *Fix:* the sync script should also **verify** (not just copy) and print a per-file hash so a drift is visible in one line; and the round should end with `INDEX.md`'s canonical-path statement made unambiguous — today there are two git repos and "the repo" means different things in different files.

---

## 2. Critiques — the technical architecture

**T-1 · The single-file constraint is being violated in spirit by the harness plan, not in letter.** `tests/CONTRACT.md` C2 requires SIM-CORE markers plus three DOM-free entry points, and C1 puts the scripts in `tests/`. That is correct. The weak point is **C2's zero-DOM assertion**: I measured 172 `document.` references inside the same `<script>` as the data block, so a static assertion is unsatisfiable and a naive implementation will either fail every run or be silently relaxed. *Fix (amend C2):* assert instead that the **extracted slice** evaluates without touching DOM — install throwing accessors on `document`/`window` in the sandbox before `vm.runInNewContext`, and assert no throw on the extraction path. Same intent, satisfiable, and it fails loudly the first time someone calls a UI function from the core.

**T-2 · The math core is 1 source of truth but has 2 potential homes.** With the core already byte-identical across the two lineages, the merge has a rare opportunity: **freeze the protected functions as a hash-pinned block** (a `tests/math-baseline.json` next to the extraction script, written once from v20) so any future round that touches them fails a cheap check and must clear the Owner's approval gate explicitly. This is the same pattern as `tests/baseline.json` for the sim, applied to the model itself. It converts invariant #1 and #9 from prose into a diff.

**T-3 · `SEASON_RECORD_CAPS` hides the tail the council wants to study.** Already measured (DS S-101/S-102): the sack cap rewrites leaders into a 20–21 band while the uncapped model produces 22–24. This is not a bug to fix now — it is an architecture observation: **the display cap and the sim capability are conflated.** *Fix, post-merge:* separate the two — the sim produces the true number, a display layer truncates for realism, and the record caps apply to *reporting*, not to the simulation's internal state. That makes elite-tail questions answerable without touching protected constants.

**T-4 · 39 `Math.random()` call sites and no seed.** `grep -c "Math.random"` = 39 on v20. Every regression claim in this project is therefore **statistical and non-reproducible**: "r = 0.946" cannot be re-derived to the digit by the next session, only re-estimated. That is the deepest structural weakness in the testing architecture and it is not on any list I have read. *Fix, when the harness is built:* a `rng()` indirection with a default `Math.random` and an optional seeded LCG, used only by the harness. Zero product behaviour change (default path identical), and it turns every future "command + output" into a **bit-reproducible** artefact. If the council accepts one technical improvement after the merge, this is the one I would argue for: it is what makes "a claim without a command is not a claim" actually enforceable over time.

**T-5 · The data layer is a single 460-line dense array, and the build is 649 KB in one file.** `PLAYERS` at line 449 is one line; `TEAM_DATA` at 450 is ~1,300 characters × 32 teams on one line. This is fine for the product (single-file is a non-negotiable) but bad for review: no diff of a data change is a diff of anything — it is one enormous line changing. *Fix, advisory only:* keep the product as-is, but have the harness emit a **normalised data digest** (`sha256` of `PLAYERS` normalised one-player-per-line, and of `TEAM_DATA` sorted by key) into the baseline. Data drift becomes a one-line report instead of an unreadable blob diff, and it costs the product nothing.

---

## 3. Improvements I can apply NOW (in my own lanes)

1. **This file** (`_agents/pickle/architecture-review-M8.md`) — the long-form review M-8 asks for.
2. **`_agents/pickle/evidence-m8.txt`** — every command from this pass with its raw output, so the numbers in §0 are reproducible by any session. Written this session, next to this file.
3. **`_agents/pickle/specs/M-8-merge-manifest-addendum.md`** — a paste-ready addendum for the merge manifest: the protected-function hash gate, the D-a/D-b/D-c delta table, and the malformed-tail note. Sits in my own specs folder; the Architect can lift it into his manifest verbatim.
4. **One bulletin message** citing `@M-8` (short take + pointer to this file), and **my availability line** updated to "on duty — M-8 review filed".
5. **My questions block** in `QUESTIONS-FOR-THE-ARCHITECT.md` (`Q-PICKLE-1…`), because the Architect is the only one who can answer them and the pack is the right home for them.
6. **A `CHRONICLE.md` arrival/filing line** with the commands and their output.

## 4. Improvements I would make with Owner permission (R5-gated)

Each is one line to grant; each names the file and the exact change.

| # | File | Exact change | Why |
|---|---|---|---|
| P-1 | `tools/lint-council.sh` *(new)* | Add a dependency-free smoke alarm: over-length entries, `verified:` lines with no `→`, code-citing lines with no hash, R5 edits to history-listed files. Exit non-zero on any finding. | Makes C-5 real; costs nothing; no product impact. |
| P-2 | `tests/CONTRACT.md` | Amend **C2**: replace the static "zero `document.`" assertion with a runtime DOM-guard assertion (throwing accessors in the `vm` sandbox), and record the measured counts (172 `document.`, 10 `window.` inside `<script>` 448–6435; markers absent from both builds). | The static assertion is unsatisfiable on this file; the contract should describe the file that exists. |
| P-3 | `CHRONICLE.md` | Append one line: the protected-function hash result (8/8 identical v20↔donor; `cpuPick` differs) with the command. | This is the single most useful new fact for the merge round; it should be in the facts log, not only my folder. |
| P-4 | `GOVERNANCE-ROUNDTABLE.md` §8 (my block) | Append a dated note recording the §0 delta table as my input to Q6 and the merge manifest. | Keeps my verdicts and my evidence in one place for the Architect. |
| P-5 | `AGENTS.md` (Key Files) | Add the recommendation that, after the merge, the protected-function hashes be pinned in `tests/math-baseline.json` and checked by the harness. | Converts invariant #1/#9 into a diff without touching the constants themselves. |

I will not touch any of these without the Owner's say; the first three are the ones I would ask for first, because they are pure additions to files that already exist and no session's work is rewritten.

---

## 5. Three things the draft is missing (cap: three)

1. **A terminal-state obligation** (C-1). The system governs what may be *said*; it does not govern what must be *finished*. Twelve entries sit `pending` while six new documents were written; the queue needs a rule that entries close, or the queue becomes a museum.
2. **Reproducibility of the sim itself** (T-4). Every numeric claim in this project is a distribution sample, and with 39 unseeded `Math.random()` call sites nobody can reproduce another session's number exactly. Without a seeded RNG in the harness, "command + output" will keep meaning "I ran a thing and got 0.95 ± something."
3. **A written definition of "the product"** for merge purposes. `INDEX.md` names v20 as the reference; `AGENTS.md` Key Files now names v20 too; but the *donor*'s Season engine is the feature layer the user actually asked for, and no document says which of the two lineages owns the product's **behaviour** (as opposed to its reference hash). The merge round should state, in one sentence, what "the product" is after the merge — otherwise the next liveness dispute is already scheduled.

---

*Filed 19 Oct 2026 by Pickle. Reference build v20 `31b7d61f…`, donor `77bb9ed5…`. All numbers reproducible from `_agents/pickle/evidence-m8.txt`. Nothing here edits the product, another session's file, or any document outside my own lanes.*
