# Owner decisions — 2026-10-21

SPEAKER: DS | ROLE: Council reviewer (advisory) | TASK: record the Owner's answers to the five open items | DATE: 2026-10-21

Pin: branch `gpt/council-reliability-scorecard` @ `4558e81` · artefact `NFL Draft Simulator merged.html`,
657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (the V20 merge candidate).

This file records what the Owner said, what it unblocks, and who acts. It is not a proposal.

---

## #7 — Below-fold navigation

**Owner:** "Pinned navigation and a pinned primary action."

**Decision:** approved. This is a product change and only Claude implements it.

**Unblocks:** the defect measured at y=1939 on a 1280×900 desktop, at 963–1007 on a 390×844 phone,
and at the foot of a 7,483 px preseason page.

**Deliverable to Claude:** a pinned-navigation specification — what is pinned, at which breakpoints,
scroll behaviour, collision rules against the build's four `position:fixed` rules and one `sticky`,
and the accessibility minimum. Commissioned from VLOC (`PINNED-NAV-SPEC.md`), measured by Super
at 390×844.

**Status:** specification in flight. No product edit made or implied by this file.

---

## #8 — Architecture ratification

**Owner:** "You decide for now but also in every document let claude know what you did and that
claude needs to review your changes and decide on the final architecture."

**Decision:** DS decides provisionally. **Every document produced under this decision must carry a
clause stating that Claude reviews it and makes the final architecture call.** That clause is not
optional and not decorative — a document that omits it is non-compliant with this decision.

**Required clause, verbatim, in every affected document:**

> **Provisional.** This layout decision was taken by DS with Pickle as co-signatory under the Owner's
> instruction of 2026-10-21. Claude reviews it and makes the final architecture decision. Claude may
> reverse or amend any part of it without further Owner approval.

**Unblocks:** six competing directories, the `Sim/` vs `sims/` near-homonym, and
`FOLDER_STRUCTURE_RECOMMENDATION.md` describing a `core/` that has never held a file.

**Who acts:** Pickle co-signs the ratification (`ARCHITECTURE-RATIFICATION.md`), GLM designs the
enforcement mechanism (`LAYOUT-ENFORCEMENT.md`), Claude reviews and rules.

---

## #12 — FB and Punter slots

**Owner, verbatim:**

> "FB and Punter need to be created as slots on the draft board. Do not alter any player position
> descriptions. Any Running back (RB) or full back (FB) or Tight End (TE) are available to play FB at
> no flex cost. Kickers (K) and Punters (P) are available to be punters at no draft cost. The
> underlying math for how they work will be created by Claude, but maybe other agents can help set
> the foundations for him."

**Non-negotiables, extracted:**

1. FB and P become slots on the draft board.
2. **No player position description changes.** A player's listed position is never rewritten.
3. RB, FB and TE may play the FB slot at **no flex cost** — zero rating penalty.
4. K and P may play the punter slot at **no draft cost**.
5. Claude writes the underlying math. Other agents lay foundations only.

**One genuine ambiguity, flagged rather than silently resolved.** "No flex cost" and "no draft cost"
are different phrases, and the difference is load-bearing:

- *Reading A (parallel):* both sentences govern **who may fill the slot and at what penalty**. "No
  draft cost" is a synonym slip for "no flex cost". Then both slots are drafted → **28 rounds,
  896 picks**.
- *Reading B (literal):* "no draft cost" means the punter **costs no draft pick** — auto-filled after
  the draft from the K/P pool. Then only FB adds a round → **27 rounds, 864 picks**, and the punter
  slot exists on the roster but not on the board.

The Owner's first sentence says both "need to be created as slots **on the draft board**", which
favours Reading A. DS adopts **Reading A as the working default** and records Reading B as the
alternative. Claude resolves it when building; the Owner may correct it in one word.

**The trap both readings share.** The pool swap that produces `b2e097f2879a8928` drops exactly
52 records — 32 P, 12 LS, 8 FB. Under either reading, 40 of those 52 become draftable. The swap then
stops being behaviourally inert and starts dropping players the draft needs. **The swap must be
updated in the same change, not after it.**

**Foundations laid:** BOC, `_agents/boc/notes/FB-P-SLOT-FOUNDATIONS.md` — verified line numbers for
`ROSTER_SLOTS` (l.924, 26 entries), `NATURAL_SLOT_MAP` (l.932–938, no FB/P), `FLEX` (l.940–952, no
FB/P keys), `SLOT_FAMILY` (l.931), `POS_SLOT_MAP` (l.962–970), `effOvr` (l.978), `optimalLineup`
(l.1206), `teamRatings` (l.1988), `replacementLevels` (l.1352). Arithmetic support from MiMo.

**Who acts:** Claude builds. Protected constants are not changed by anyone else.

---

## #15 — The decision record and the bulletin

**Owner, verbatim:**

> "You can decide and execute the necessary changes but don't delete any comments or contributions
> from DS, Pickle, GLM, Ultra, GPT, MiniMax, Ultra, Super, OR, VL, or Beam. If no one can read the
> whole append-only bulletin, then each agent needs their own space on the bulletin where they can
> delete and edit their own responses but cannot edit anyone else's. Agents should be encouraged to
> delete clearly antiquated comments but preserve any comments that were relied upon and directly
> referenced by others or that made their way into the ultimate architecture."

**Decision:** DS decides and executes.

**Two distinct things are being fixed here, and conflating them is the trap:**

1. **The bulletin is unreadable.** Measured this session: **792,193 bytes, 5,487 lines**, append-only,
   with two competing M-number series and at least two recorded collisions.
2. **There is no readable record of decisions.** `STATUS.md` line 16 still reads *"the merged result
   has no hash yet"* while the merged result has had a hash for days.

A per-agent partition fixes (1). It does not fix (2) — a partitioned bulletin is still a log, not a
decision record. So this decision has **two outputs**: a partitioned bulletin, and one append-only
`DECISIONS.md` at root carrying date · decision · who approved · evidence · what it supersedes.

**Deletion rule, as instructed:** no contribution by DS, Pickle, GLM, Ultra, GPT, MiniMax, Super, OR,
VL or Beam may be deleted. Authors may delete or edit their own clearly antiquated comments. Anything
another agent relied on, referenced, or that entered the architecture is frozen and survives its
author's deletion. The mechanism for "frozen" is being specified by LongCat
(`BULLETIN-NUMBERING.md`); the partition structure by Ultra (`BULLETIN-PARTITION.md`).

**Execution order:** policy now, mechanical restructure after the current batch closes. The bulletin is
being appended to by ten sessions as this is written; restructuring it mid-flight is how history gets
corrupted, and history is the one thing the Owner said must not be lost.

---

## #16 — What is actually in the repository

**Owner:** "You decide."

**Decision: `main` is the record.** Not a branch, not a working disk. The rule that follows from it:

> **Correction, 2026-10-21 — DS made the same error twice.** DS first claimed player data and testing
> protocol were "already in the repository", then claimed `AGENTS.md`, `STATUS.md`,
> `MERGE-MANIFEST.md` and `COUNCIL-BULLETIN.md` were all on `main`. **Only `AGENTS.md` is.** Both
> errors have one cause: DS measured a *local checkout* and called it `main`. `git cat-file -e
> HEAD:STATUS.md` answers a question about the current branch, never about `main`. The only command
> that answers "is it in the repository" is `gh api repos/…/contents/<path>?ref=main`, and MOC
> re-ran every claim independently to catch it.
>
> `main` holds **29 root entries**. Among the seven governance documents, `AGENTS.md` is there and
> `STATUS.md`, `MERGE-MANIFEST.md`, `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md` and
> `INDEX.md` are all absent. The remote has **10 branches**; `STATUS.md` lives on 9 of them,
> `MERGE-MANIFEST.md` on 6, `COUNCIL-BULLETIN.md` on 9. None on `main`.
>
> This makes the #15 finding worse, not better: the record of decisions is not merely unreadable, it
> is **not on the default branch at all**.

- **The product of record** — the candidate build — lives on `main` at a stable path.
- **The test of record** — one canonical suite on `main`. The other two are retained only until their
  unique assertions are merged into it.
- **The data of record** — the pool that the evidence pins were measured against, on `main`.

**Why the pool goes in git rather than release assets.** A release asset is mutable: it can be
deleted or re-uploaded, and its URL survives a content change. A commit is immutable by hash. The
whole reason `b2e097f2879a8928` is checkable is that the bytes cannot move underneath it. Publishing
the pool as an asset would make the pin advisory rather than binding. Sizes measured today:
`candidate-work-queue.json` 1,181,912 B, `current.json` 937,366 B — both far below any git limit.
**Revisit only if the dataset passes ~10 MB or the history passes ~50 versions**, and record the
revisit then rather than deciding it now.

**The two-clone problem — corrected by MOC.** There are exactly **two** clones on this disk, and a
third path that is not one:

| Path | What it is | Branch | Dirty |
|---|---|---|---|
| `.` (the root) | clone #1 | `gpt/council-reliability-scorecard` @ `4558e81` | 130 |
| `Football Sim/` | clone #2 | `council-intake` @ `caace3e` | 14 |
| `Football Sim/Football Sim/` | **a plain directory, no `.git`** | — | — |

`AGENTS.md` l.116 claims the `Football Sim/` clone is "checked out on `main`". It is on
`council-intake` @ `caace3e`. Decision: **`origin` is authoritative, the root working tree is the
working copy, and the `Football Sim/` clone is declared non-authoritative.** Nothing is deleted —
it holds 14 uncommitted files that are not mine to discard.

**The real break MOC identified:** the shared documents exist in three states — root working tree
(live), mirror working tree (a stale copy), and git history (root `4558e81` vs mirror `caace3e`). A
push from the mirror ships none of the live documents; a push from the root ships a branch the remote
has never seen. A session tells the clones apart with the *toplevel path*, not the directory name,
because both are called "Football Sim":
`git rev-parse --show-toplevel`.

**Commit manifest, measured by MOC — 2,875,882 B ≈ 2.87 MB to add:**

`SIM-PLATFORM/data/nfl/current.json` (937,366) · `SIM-PLATFORM/data/nfl/candidate-work-queue.json`
(1,181,912) · `SIM-PLATFORM/tools/build-pool-variant.mjs` (6,030) · `SIM-PLATFORM/tools/validate-dataset.mjs`
(15,556) · `tests/openchamber-e2e-v2.spec.js` (27,551) · `tests/openchamber-e2e.spec.js` (18,173,
kept for provenance — it produced the published evidence) · `tests/e2e-smoke.mjs` (28,211).

**Pool compression measured, which settles the git question better than my own argument did:** zlib-9
takes the 937,366 B pool to **50,231 B (5.4 %)** and the 1,181,912 B queue to **53,856 B (4.6 %)**.
Fifty pool revisions ≈ 2.5 MB of history. Commit at approved-pool milestones, not per record. Release
assets stay right for the 65.9 MB trace and the 19.7 MB screenshots zip.

**One trap before committing:** the E2E result's `artifactPath` points at the *untracked*
`merged.html`, byte-identical to the tracked `NFL Draft Simulator merged.html` (both `40233d6b…`,
`cmp` identical). Point the spec at the tracked name rather than committing a second 657 KB copy.

**Byte pins are already safe:** `.gitattributes` carries `* text=auto` **and** `*.html -text`, so the
candidate's blob size equals its file size (657,486 = 657,486). Verified, not assumed.

**Who executes:** commits on `main` require the Owner's word under AGENTS.md, which this decision is
not treated as granting for the *push* itself. The decision fixes what belongs there; the commit
manifest is being verified independently by MOC (`REPO-TRUTH-VERIFIED.md`) before anything moves.

---

## What this file does not do

It does not edit the product. It does not commit, push, branch or tag. It does not modify the
bulletin. Every product change in #7 and #12 belongs to Claude; this records the instruction and the
foundations, which is what the Owner asked for.
