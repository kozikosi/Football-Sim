# BULLETIN-NUMBERING — measurement, scheme, frozen comments

**SPEAKER: LONGCAT | ROLE: Council reviewer (S-2400–2499) | TASK: #15 support — numbering and the frozen-comment rule | DATE: 2026-10-21 (UTC)**

**Assignment:** DS, for the Owner's decision #15. Read-only measurement; **nothing renumbered**. Write-only in `_agents/longcat/`. Pin: `gpt/council-reliability-scorecard` @ `4558e81`, candidate `40233d6b…` (657,486 B).

## (a) Measurement — the current numbering

Command: `grep -cE '^\*\*M-[0-9]+' COUNCIL-BULLETIN.md` and `grep -oE '^\*\*M-[0-9]+' … | sort | uniq -c`.

| Measure                              | Value               |
| ------------------------------------ | ------------------- |
| Entries carrying an M-number         | **223**             |
| Distinct numbers                     | **165**             |
| Excess entries over distinct numbers | **58** (collisions) |
| Duplicated labels                    | **40**              |
| Number range                         | M-9 … **M-316**     |

**The two competing series:**
1. **The live series** — M-1 onward, posted in real time as the board grew.
2. **The recovered series** — GLM's **"RECOVERY BLOCK"** sections (2a/2b, posted 21 Oct) re-appended **pre-loss copies recovered from `stash@{1}`** with their **original** numbers: M-25 · LK, M-26 · Beam, M-27 · OR, M-30 · MiniMax, and others. These land in the same number space as the live postings.

Both series are legitimate history; neither was renumbered on recovery (correct — the Owner's rule). The cost is that a citation like `@M-25` is ambiguous.

**Every collision found (label — line numbers of both/all sides):**

```
M-9    59, 78            M-11   65, 70            M-15   88, 119
M-18   136, 143          M-24   195, 204, 246     M-25   251, 3734, 3768, 3810
M-26   265, 3758         M-27   267, 3762         M-28   269, 458
M-29   271, 470          M-30   367, 472, 3766     M-31   460, 584, 3835, 3847
M-32   2753, 3200, 3871  M-45   3068, 3895        M-51   3147, 3899
M-68   3361, 3932        M-81   678, 805           M-82   680, 839
M-84   923, 978          M-85   1006, 1115         M-88   1170, 1200, 1291, 1293, 1383, 1385
M-89   1297, 1425, 1427  M-92   1488, 1706        M-93   1490, 1502
M-97   1642, 1730        M-100  1736, 1738         M-105  2058, 2139
M-106  2137, 2234        M-107  2163, 2292         M-108  2169, 2350
M-111  2398, 2404        M-113  2486, 2551         M-115  2631, 4076
M-118  2733, 3975        M-122  4019, 4068, 4070   M-129  4237, 4275
M-131  4251, 4302        M-132  4260, 4308         M-135  4357, 4365
M-137  4437, 4462        M-142  4622, 4640         M-143  4671, 4747
M-302  5023, 5226        M-303  5053, 5345         M-306  5091, 5485
```

**Read of the pattern (VERIFIED):** collisions cluster in two places — the **recovery block** (M-25…M-32, where recovered copies meet live postings) and the **concurrent-dispatch bursts** (M-88 ×6, M-302/M-303/M-306, where two coordinators took the same number in the same window). The cause is never a bad counter; it is **two writers assigning one number**, plus **history re-appended with its own numbers**.

## (b) Numbering scheme — recommendation

**Keep the M-number as a global posting counter, and give every entry a mandatory content id.**

```
**M-317 · LongCat · 21 Oct — <title>**
C<sha256(first 8 of the entry block)>
```

**Why this one:**

| Option                              | Verdict         | Reason                                                                                                                                                                                              |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global M-number + content id**    | **RECOMMENDED** | The M-number is the citation handle in hundreds of messages and in the architecture decisions; the content id makes any residual collision unambiguous without breaking a single existing citation. |
| Per-agent prefixed (`M-LongCat-12`) | Rejected        | Self-describing and collision-free, but it **breaks every existing `@M-88` citation** and is unwieldy to say or type.                                                                               |
| Date + author                       | Rejected        | Collision-free, but "the 21 Oct LongCat post" is ambiguous when one agent posts twice, and it too breaks existing `@M-n` citations.                                                                 |
| Drop numbering entirely             | Rejected        | The bulletin is the council's citation substrate; removing the handle removes the ability to point at a message.                                                                                    |

**Per-agent sections and a global counter coexist:** the sections are the _physical layout_ (who owns what, who may edit what); the counter is the _citation handle_. A poster reads the current maximum before posting, exactly as now. The content id is computed from the entry's own bytes, so it needs no coordination at all.

**The recovered block needs one layout change, not a renumber:** move GLM's RECOVERY BLOCK sections into a clearly-marked **appendix** (`## Appendix — recovered pre-loss copies`), keep their original numbers, and add one line at the top of the appendix: _"Numbers in this appendix are the originals from `stash@{1}`; where they coincide with a live number, the live entry is the one in the main list."_ No history is rewritten; the ambiguity becomes documented.

## (c) The frozen-comment mechanism

**Marking.** Every entry carries a content id `C<sha8>`. A comment becomes **frozen** when another message **cites** it:

```
CITES: C3f9a1b2 (M-88 §2), C77e0d44 (M-145)
```

The citing message records the target's content id; a comment is frozen **iff** at least one `CITES:` resolves to it. This is checkable with one command:

```
grep -o 'CITES: C[0-9a-f]{8}' COUNCIL-BULLETIN.md | sort | uniq -c
```

**Who may mark.** Only the **author of the citing message** creates the citation; only the **scribe (GLM)** may add the `FROZEN` banner to the cited entry, and only after the citation exists. An author may not freeze their own entry by citing themselves — a self-citation does not count.

**Recording a reliance so it is checkable.** The banner on the frozen entry names the citing entries:

```
FROZEN · by GLM · 21 Oct · relied upon by M-88 (C3f9a1b2), M-145 (C77e0d44) · do not delete
```

Because the banner sits inside the author's own section, the author can still edit it — so the **enforcement is procedural, not technical**: the banner is a promise, and breaking it is a rule violation the scribe records.

**If an author deletes a frozen comment anyway.** DS's procedure:
1. **Restore** the entry from the mirror or the last commit that contains it (the bulletin is append-only and mirrored; a deleted entry is recoverable).
2. **Post one line** naming the deletion, the deleter, the restoring source, and the citing entries — append-only, no rewriting of the deletion record.
3. **Do not restore silently.** A restored frozen entry that is not recorded is indistinguishable from one that was never deleted, and the next reader cannot tell the history was touched.

The Owner's #15 already names the protected set — DS, Pickle, GLM, Ultra, GPT, MiniMax, Super, OR, VL, Beam. For those seats, step 1 is mandatory and step 2 follows.

## (d) The one-sentence rule

> **Read the tail before you post, take the next free number if yours is taken, and never edit an entry another message cites — unfreeze it first.**

This is the same shape as the M-306 tiebreak (read the tail, take the next free, cite the collision) with the frozen-comment half added. It is one sentence, it needs no tooling, and an agent can apply it mid-task without stopping to ask.

## (e) What to measure next week

| Measure                         | Command                                                                         | Pass condition                             |
| ------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------ |
| New duplicate M-labels          | `grep -oE '^\*\*M-[0-9]+' COUNCIL-BULLETIN.md \| sort \| uniq -c \| awk '$1>1'` | **0 labels created after the restructure** |
| Content ids present             | `grep -c '^C[0-9a-f]\{8\}$' COUNCIL-BULLETIN.md`                                | Every new entry carries one                |
| Citations resolve               | `grep -o 'CITES: C[0-9a-f]\{8\}' …` vs the set of ids present                   | Every `CITES:` target exists               |
| Frozen entries deleted          | bulletin diff vs the mirror                                                     | **0**                                      |
| Recovered block isolated        | appendix header present; no recovered number appears in the main list           | 1 appendix, 0 strays                       |
| Per-agent sections self-managed | each section header present; only the owner edited within it                    | every protected seat has its own section   |

**Labels:** the counts in (a) are **VERIFIED** (commands above, run on `4558e81`). The recommendation in (b) is **INFERRED** from those measurements and from MOC's Q-MOC-3 and M-111 §3. The frozen-comment mechanism in (c) is a **proposal** — it is not yet a rule. **UNKNOWN:** whether DS wants the content id to be a hash of the entry block or of the entry _plus_ its citations (the latter changes on every citation and would churn the id).

**Files written:** `_agents/longcat/notes/BULLETIN-NUMBERING.md` only. Nothing renumbered; no bulletin, shared-doc or product edit.
