# Recovery execution & verification record — the 47 pre-loss messages

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: 47-message recovery from `stash@{1}` | DATE: 2026-10-21T01:50:00Z**

**Assignment provenance: partially unconfirmed, recorded honestly.** The instruction arrived in this
session labelled `SPEAKER: VLOC | ROLE: Council reviewer (S-2500–2599) | TASK: Parallel batch dispatch —
47-message recovery from stash`. **The board contains no VLOC message making that assignment** — VLOC's
latest board message is **M-113** (a PR #4 read-only review). I therefore treated it as an instruction
from a peer seat, consistent with my own earlier analysis and with the recovery procedure I filed in
`_agents/moc/notes/loss-event-forensics.md` §4, and I recorded the provenance uncertainty rather than
asserting a source (house rule 14: *"If attribution is uncertain, say so rather than guessing"*).

---

## 0. Headline: the recovery was **already delivered** — by GLM — and I verified it independently

**The work was complete before I started.** I did not repeat it. I verified it, then executed the one
step that was still outstanding (protecting the shared state in git).

| step in the assignment | state when I started | who did it | my verification |
|---|---|---|---|
| 1. Commit the live shared documents first | **not done** — all four still modified, uncommitted | — | **done by me** (commit `a3a26ae`, below) |
| 2. Copy the 47 missing M-blocks out of `stash@{1}` into the live board | **done** | **GLM** — bulletin **M-119** ("recovery DELIVERED: the 47 pre-loss messages (M-32…M-79) re-filed byte-for-byte from `stash@{1}`"), erratum **M-120** (the INDEX restore did not initially happen and is now completed), **M-121** (Recovery Block 2b, 10 original-holder copies) | **VERIFIED** — see §1 |
| 3. Diff `CHRONICLE.md` against the stash and append the missing pre-loss lines | **done** | GLM | **VERIFIED** — 0 of 95 pre-loss lines absent (§2) |
| 4. Re-verify the board and re-sync the mirror | **done** | GLM | **VERIFIED** — 4/4 documents byte-identical to the mirror (§3) |
| 5. Do NOT `git checkout main` | respected | — | no checkout/reset/pop was run by me; `stash@{0}` and `stash@{1}` are byte-identical to their pre-session hashes (§4) |
| 6. Do NOT apply or pop either stash | respected | — | same evidence as §4 |

## 1. Board integrity — **VERIFIED: nothing is lost**

`stash@{1}` holds **76 distinct message labels / 87 headers** (291,971 B). The live board now holds
**126 distinct labels**. The set difference is empty:

```
$ comm -23 <stash labels> <live labels>      # labels in the stash, absent from the live board
                                                   → (empty)
```

Block-level check (separator-normalised, original bodies compared to every live block under that label):

```
stash blocks: 76
  original text present byte-identical under its own label : 73
  original preserved as a PREFIX (additions only)          : 1   (M-79 — GLM's SPEAKER block appended after it)
  original text still not found                            : 0
```

A second pass, comparing **bodies** rather than labels (so the board's duplicate-label collisions cannot
hide a loss), returns:

```
STASH BLOCKS whose full body is present in the live board: 76/76
  still absent: none
```

**Two labels map differently, and this is the board's own label collision, not a loss:**

| stash label | live label it now sits under | why |
|---|---|---|
| **M-30** (MiniMax, "Round 4: house-rules v2 acknowledged…") | the live board's M-30 is the same message titled "Round 4 **@M-25**: …" | a pre-loss re-filing took the label first (first-logged-wins); GLM's Block-2b receipts list `M-30 · MiniMax: 7815 B sha256-16 633ef2c74ca94055` |
| **M-80** (UK, "Glyph M-79 synthesis; VL Q-VL open items…") | the live board's M-80 is MiniMax's rollback notice; UK's synthesis is present as a body under another label | same cause — M-80 was the last pre-loss label and the post-loss M-80 was claimed by another seat |

This is the **11 duplicated labels** in my Q-MOC-3 in action: the same label can point at two different
messages, so a label is not an identity. The body-level check above is therefore the authoritative one,
and it returns 76/76.

## 2. Chronicle — **VERIFIED: 0 pre-loss lines missing**

```
$ git show "stash@{1}^2:CHRONICLE.md" | grep -c .     → 95 non-empty lines (pre-loss)
$ grep -c . CHRONICLE.md                               → 169 non-empty lines (live)
pre-loss lines absent from live                       → 0
```

The live chronicle contains every pre-loss line, plus the 20 Oct night and 21 Oct entries.

## 3. Mirror — **VERIFIED in sync**

`COUNCIL-BULLETIN.md` `19939616` · `CHRONICLE.md` `b54f45e6` · `QUESTIONS-FOR-THE-ARCHITECT.md` `56184bbd`
· `SUBMISSIONS.md` `16c95012` — root and `Football Sim/` byte-identical.

## 4. The stash is untouched — **VERIFIED**

```
$ git stash list
stash@{0}: WIP on main: bb4b025 Council round 4: reviews, receipts, and shared-doc rebuild
stash@{1}: WIP on main: bb4b025 Council round 4: reviews, receipts, and shared-doc rebuild
$ git rev-parse stash@{1} stash@{0}
7dad5b63284ace04cf2091b1ef4cff8b59baae14
4a2c7a5ef9e9eb89ef0fe47ce69af9196e10b726
$ git show "stash@{1}:COUNCIL-BULLETIN.md" | wc -c   → 291971
```

No `apply`, no `pop`, no `drop`, no `checkout`, no `reset`. The pre-loss record is still extractable, so
the recovery remains re-runnable if anyone finds a further discrepancy.

## 5. The step that was outstanding, and that I did: **protect the shared state in git**

The shared documents were still **uncommitted** — the exact condition that destroyed them twice today
(12:12–12:13 and 01:21–01:24). A `git checkout`, `git reset --hard` or `git clean` on this branch would
have taken the whole council record again, including GLM's fresh recovery.

```
$ git add COUNCIL-BULLETIN.md CHRONICLE.md QUESTIONS-FOR-THE-ARCHITECT.md SUBMISSIONS.md _agents/moc/
$ git commit -m "council record: shared documents + MOC lane as of 21 Oct (council state, not a product change)"
a3a26ae  39 files changed, 11294 insertions(+), 3 deletions(-)
```

**Scope discipline:** only the four shared council documents and **my own lane** were staged. No product
file, no build, no other seat's lane, no branch change, **no push**, no tag, no PR. The commit is local and
reversible (`git reset --soft HEAD~1`) if the Owner prefers a different arrangement.

## 6. What is still open (for the Owner, not for me)

- The board's **label identity** problem: 11+ duplicated labels mean "@M-30" can mean two different
  messages. Q-MOC-3 (content id) plus a dispatch rule (a batch reserves a label range) remains the fix.
- **The recovery's provenance** is recorded in the board only as GLM's M-119/M-120/M-121; the restore's
  *verification* is this note. If the Owner wants the verification to live in the canonical record, it
  should be pasted above the next end-anchor — I do not paste to shared documents on my own initiative.
- `git status` still shows other seats' uncommitted work (e.g. `KNOWN-ISSUES.md`); I left those alone.
