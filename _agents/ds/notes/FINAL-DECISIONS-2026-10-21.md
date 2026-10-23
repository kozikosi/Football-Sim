# Final decisions — 2026-10-21

SPEAKER: DS | ROLE: Council reviewer (advisory) | TASK: publish the collaborative decisions for #8, #15, #16 | DATE: 2026-10-21

Pin: `gpt/council-reliability-scorecard` @ `4558e81` · `NFL Draft Simulator merged.html`, 657,486 B,
sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`.

This file supersedes the provisional positions in `OWNER-DECISIONS-2026-10-21.md` where the council
found me wrong. Inputs: Pickle (co-decider), MOC, LongCat, Ultra, BOC, GLM.

---

## #8 — Architecture. Ratified provisionally; Claude reviews and decides.

**Decision: Option A — one repository, one folder per simulation, `shared/` deliberately empty behind
a written trigger, and the shipping file never moves.** Pickle co-signs.

**The root is authoritative.** The product is one self-contained HTML at root, and the governing layer
the council actually runs on lives there too.

**The destination is `sims/`, with four names fixed** (Pickle's addition, adopted):

```
sims/nfl-current/     sims/nfl-alltime/     sims/nba-current/     sims/nba-alltime/
  product/   pool/   README.md
```

Four names because they match the Owner's priority order and reuse names already present in
`SIM-PLATFORM/projects/`. A fifth naming scheme is how the sixth directory gets created.

**Declared non-authoritative, each by measurement:**

| Directory   | Files | Why                                                                                                                                              |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `core/`     | 0     | never populated, never tracked; `FOLDER_STRUCTURE_RECOMMENDATION.md` describes it as the shared engine all sports use. It has never held a file. |
| `Sim/`      | 0     | never populated; the one-letter rival of `sims/`                                                                                                 |
| `sports/`   | 2     | quarantined stubs, `records: []`, originals preserved in `_fixtures/example-ratings/quarantined-originals/`                                      |
| `datasets/` | 1     | a schema, superseded by `SIM-PLATFORM/data/schema/`                                                                                              |
| `shared/`   | 0     | empty **by design** — see the trigger below                                                                                                      |

**`SIM-PLATFORM/` is a correction to my own earlier position.** I told the Owner it was "authoritative
for platform work today". Pickle measured 48 files and classified it as a **research/proposal layer,
not the product**, and he is right: `SIM-PLATFORM/ARCHITECTURE.md` describes a staged `engine/` +
`packs/` design that is Option B and unstarted, and should say so rather than read as settled. So:
**authoritative for platform research, not authoritative for layout or naming.** Both statements are
true at once and confusing them is how a sixth topology appears.

**The extraction trigger, in writing.** `shared/` stops being empty only when one of these is true
_and_ recorded in `shared/README.md` with the evidence:
1. the same defect is fixed in two or more sims within one round;
2. a third sim needs >70 % of its functions unchanged from an existing sim;
3. a hash pin or validation receipt must be repeated verbatim for a second sport.

**Pickle's fourth condition, adopted — a circuit-breaker:** even if 1–3 fire, `shared/` stays empty
when extraction would require a protected constant or the matchup model to move first. A shared module
that forces `RATING_SPECS` to split is not ready, however much duplication it removes.

**Nothing moves this round.** A path is half a build's identity; a sim folder receives a copy, never a
move.

**Claude reviews this and may overrule any part of it without further Owner approval.** The clause
appears verbatim in every document produced under this decision.

---

## #16 — Repository truth. DS decides.

### `main` is the record — and `main` is nearly empty

**`main` holds 29 root entries.** Among the seven governance documents, **only `AGENTS.md` is there.**
`STATUS.md`, `MERGE-MANIFEST.md`, `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md` and
`INDEX.md` are all absent — they live on 9 / 6 / 9 branches, never on the default one. The merge
candidate is absent too. `SIM-PLATFORM/` and all three E2E suites are 404 on all 10 branches.

### The pool goes in git — with Pickle's disagreement recorded

**MOC:** zlib-9 takes the 937,366 B pool to **50,231 B (5.4 %)** and the 1,181,912 B queue to
**53,856 B (4.6 %)**; 50 revisions ≈ 2.5 MB of history; JSON diffs line by line; a clone without it
cannot rebuild the variant it cites.

**Pickle, dissenting:** the pool is already out of git by practice, two evidence-release tags already
exist, and the pool is a build input versioned like the build — so ship it as a tagged release asset
referenced by sha256, and let git carry the reference and the schema.

**I side with MOC, on the numbers rather than the principle.** 2.5 MB across fifty revisions is not
bloat, and the decisive property is immutability: a release asset can be deleted or re-uploaded under
a stable URL, while a commit cannot change. The only reason `b2e097f2879a8928` is checkable is that
its bytes cannot move underneath it.

**Pickle's caveat, adopted in full:** the pin must be a **hash in the build manifest, not a path**. A
path-based reference rots the moment an asset moves.

**Release assets remain correct** for the 65.9 MB trace and the 19.7 MB screenshots archive. Commit
the pool at approved-pool milestones, not per record.

### Canonical suite: `tests/openchamber-e2e-v2.spec.js`

MOC and Pickle reached this independently, and **Pickle corrects the council's record:** the published
artifact carries 13 step ids including `report-back` and `responsive-390-audit`; `openchamber-e2e.spec.js`
carries 11 of them, **v2 carries all 13**. The run came from **v2**. That corrects M-310, LongCat's L1
and Lightning's Run B closure, all of which named the other file. The build attribution stands; only
the suite file was wrong.

**One graft first:** v2 has no `receipt_id`, which exists only in `e2e-smoke.mjs`. Graft it.

`e2e-smoke.mjs` stays as the fast screen. `openchamber-e2e.spec.js` is **kept, not deleted** — it
produced the published evidence and deleting it strips that evidence of a reproducible origin, but it
is retired as a runner. **Two suites are defensible; three are not.** There is no `playwright.config`,
so "canonical" must be written into `tests/CONTRACT.md`.

### Commit manifest — 2,875,882 B ≈ 2.87 MB

`SIM-PLATFORM/data/nfl/current.json` (937,366) · `SIM-PLATFORM/data/nfl/candidate-work-queue.json`
(1,181,912) · `SIM-PLATFORM/tools/build-pool-variant.mjs` (6,030) ·
`SIM-PLATFORM/tools/validate-dataset.mjs` (15,556) · `tests/openchamber-e2e-v2.spec.js` (27,551) ·
`tests/openchamber-e2e.spec.js` (18,173) · `tests/e2e-smoke.mjs` (28,211).

**Trap:** the E2E result's `artifactPath` points at the _untracked_ `merged.html`, byte-identical to
the tracked `NFL Draft Simulator merged.html` (`cmp` identical). Point the spec at the tracked name.
**Byte pins are already safe** — `.gitattributes` carries `* text=auto` and `*.html -text`; the
candidate's blob size equals its file size.

### Two clones, not three

Root `.` is clone #1, authoritative, on `gpt/council-reliability-scorecard`. `Football Sim/` is clone
#2, a **mirror**, on `council-intake` @ `caace3e`, and it is **gitignored** (`.gitignore` l.10).
`Football Sim/Football Sim/` has **no `.git` at all** — it is a plain directory. `AGENTS.md` l.116
claims the mirror is on `main`; it is not.

**The real break:** live documents exist in three states — root working tree, mirror working tree, and
git history (`4558e81` vs `caace3e`). A push from the mirror ships none of them; a push from the root
ships a branch the remote has never seen. Sessions tell them apart by toplevel path, never by
directory name: `git rev-parse --show-toplevel`.

---

## #15 — Bulletin and decision record. DS decides and executes.

### Two outputs, because one does not fix the other

A partition fixes the log. It does not produce a decision record. So: **partitioned bulletin _and_
`DECISIONS.md` at root**, append-only, one line per decision: date · decision · who approved ·
evidence · what it supersedes.

### Design, merged from Ultra and LongCat

**Single file, named sections.** Ultra is right that the Owner's wording — "their own space **on the
bulletin**", singular — implies sections in one document, not a file per agent. Each section opens
`## AGENT: <name>`; all lines to the next section belong to that agent; a session may edit or delete
only inside its own.

**M-numbers stay global and immutable.** LongCat is right that per-agent prefixes and date+author both
break every existing `@M-n` citation. The counter is the citation handle; the section is the layout;
they coexist.

**Every entry gets a mandatory content id `C<sha8>`.** A comment is **frozen iff** another message
cites it (`CITES: C<sha8>`); only the author of the citing message creates a citation; self-citations
do not count. If a frozen comment is deleted: restore from the mirror and post one line naming the
deletion and the restoring source — never restore silently.

**GLM's recovered block is moved to a marked appendix with its original numbers**, plus one line
stating that the live entry wins where numbers coincide. One layout change, not a renumber.

**The rule in one sentence:** read the tail before you post, take the next free number if yours is
taken, and never edit an entry another message cites — unfreeze it first.

### Correction to Ultra's measurement

Ultra reported **119 M-numbers with ≥2 entries**. Measured directly on the live file: **228 entries,
169 distinct numbers, 45 duplicated numbers, 59 excess entries, 18 authors.** LongCat's independent
count (223 / 165 / 40) is the correct one, differing only because the file grew between measurements.
Ultra's 119 is inflated — his own table repeats rows (M-31, M-30, M-303, M-133, M-115, M-142 each
appear twice). The design is sound; the collision count is not.

### Execution is deliberately deferred

The file was being appended to **12 seconds before this decision was written**. Restructuring a live
append-only log is how history is lost, and the Owner's one non-negotiable is that nothing is deleted.
Execution order when all sessions are idle:
1. copy to `COUNCIL-BULLETIN.md.pre-partition-<ts>.bak` and record its sha256;
2. split into `## AGENT:` sections, preserving every byte, with the M-numbers untouched;
3. verify entry count before and after is identical;
4. append the partition footer, then publish `DECISIONS.md` seeded with the five Owner decisions.

---

## #12 — Standing: one word still needed

The Owner's instruction is recorded verbatim in `OWNER-DECISIONS-2026-10-21.md` §12 and in
`CLAUDE-HANDOFF-2026-10-21.md`. The ambiguity between "no flex cost" (FB) and "no draft cost" (P)
is resolved to **Reading A — both slots drafted, 28 rounds, 896 picks** — as the working default, with
Reading B recorded as the alternative.

**BOC's trap stands and is not optional:** the pool swap drops exactly 32 P + 8 FB + 12 LS = 52
records _because_ no slot code matches them. Under either reading, **40 become draftable**, so the
swap must be updated in the same change or it starts silently dropping players the draft needs.

---

## What this file does not do

No product edit. No protected constant changed. No commit, push, branch or tag. No byte of the
bulletin deleted or moved. #7 and #12 are Claude's to build; this records instruction, measurement and
foundations.
