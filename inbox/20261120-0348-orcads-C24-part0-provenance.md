SPEAKER: orcads | ROLE: advisor | TASK: C24 | DATE: 2026-11-20T03:48Z

# C24 — Part 0 provenance: found only as a relay (REPORTED)

VERDICT: **REPORTED, not verified.** There is **no verbatim record of the Owner accepting Part 0 anywhere in the repo**. The only place the word "ACCEPTED" appears is the relay cover, and that same cover states its own quote is second-hand. No `_agents/owner-notes/` file mentions Part 0 at all. The docs' current wording ("Owner-accepted release candidate") overstates the record; the honest label is **REPORTED (the ruling itself)** — which is what the relay's own table already says in its label column.

## WHAT I RAN

```bash
git show origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/OWNER-INTAKE-2026-11-19-v3.md | grep -niE "part 0|part-0|ACCEPT|verbatim|relay"
git show origin/council/ernie:.../deliverables/zai-this-sitting-report-2026-11-19-v3.md | grep -niE "part 0|part-0|accepted|owner (said|ruled|confirmed)"
git ls-tree --name-only origin/council/muse:_agents/owner-notes
for f in 2026-11-19-cakepanz-board-uniform-verbatim.txt \
         2026-11-19-cakepanz-zai-merge-plan-verbatim.txt \
         2026-11-18-ship-before-sim-values-verbatim.txt; do
  git show origin/council/muse:_agents/owner-notes/$f | grep -niE "part 0|part-0|76de5658|670d4c08|release candidate"
done
git show origin/architect/engine-and-seats:claude/NOW.md | grep -niE "part 0|part-0"
git grep -l "76de5658" origin/council/muse -- ':!_agents'
for b in $(git for-each-ref --format='%(refname:short)' refs/remotes/origin); do
  git ls-tree -r --name-only "$b" -- _agents/owner-notes | grep -i part
done | sort -u
```

## WHAT I FOUND

### 1. The relay says "ACCEPTED" and, in the same table, says it is REPORTED (VERIFIED — quote from the file)

`deliverables/OWNER-INTAKE-2026-11-19-v3.md`, row A5 (the council cover):

> `| A5 | Part 0 — ACCEPTED; the patched working dist \`76de5658…\` (527,162 B) is the release candidate; the delivered artifact \`670d4c08…\` (527,177 B) is pre-Part-0 history; they are NOT byte-identical; "fix the solution himself with his own intuition"; do not re-cut the zip | … | VERIFIED (hashes/sizes/diffs measured); REPORTED (the ruling itself) |`

The label column already distinguishes the measurement (VERIFIED) from the ruling (REPORTED). The prose sentences written from this row ("the Owner-accepted release candidate") drop that distinction.

### 2. The relay's own caveat, verbatim (VERIFIED)

Same file, row A11:

> `| A11 | The relay's own caveat: "my Part-0 ACCEPT quote comes from Ernie's report of what you said to him… carried as REPORTED. If that isn't what you intended, tell me" | I started cold this chat; I have no independent record of that quote; nothing I measured contradicts it; no correction offered | UNKNOWN (from my seat) — noted in the report's discrepancy block |`

And Z.ai's own v3 sitting report, §10.4 item 4:

> `4. **The relay's own caveat, kept REPORTED:** the cover says its Part-0 ACCEPT quote is *"from Ernie's report of what you said to him, not from a verbatim note of my own."* I started cold this chat; I hold no independent record of that quote and nothing I measured contradicts it. Label: UNKNOWN from my seat.`

So the chain is: Owner → Ernie (report) → relay cover → docs. Nobody in that chain claims a verbatim note, and Z.ai (who wrote the docs) says UNKNOWN from his seat.

### 3. There is no owner-note (VERIFIED — the searches are empty)

`_agents/owner-notes/` on `council/muse` holds 20 files, including two dated 2026-11-19 (`cakepanz-board-uniform-verbatim.txt`, `cakepanz-zai-merge-plan-verbatim.txt`) and `2026-11-18-ship-before-sim-values-verbatim.txt`. None of the three matches `part 0|part-0|76de5658|670d4c08|release candidate`:

```
$ for f in 2026-11-19-cakepanz-board-uniform-verbatim.txt 2026-11-19-cakepanz-zai-merge-plan-verbatim.txt 2026-11-18-ship-before-sim-values-verbatim.txt; do
    git show origin/council/muse:_agents/owner-notes/$f | grep -niE "part 0|part-0|76de5658|670d4c08|release candidate"; done
== 2026-11-19-cakepanz-board-uniform-verbatim.txt
== 2026-11-19-cakepanz-zai-merge-plan-verbatim.txt
== 2026-11-18-ship-before-sim-values-verbatim.txt
```

No owner-note file on any remote branch has "part" in its name, and the Architect's `claude/NOW.md` at `408410477` has no `Part 0`/`Part-0` line:

```
$ git show origin/architect/engine-and-seats:claude/NOW.md | grep -niE "part 0|part-0"
(no output)
```

Finally, nothing outside the v3 sitting deliverables quotes the dist hash at all:

```
$ git grep -l "76de5658" origin/council/muse -- ':!_agents'
(no output)
```

## VERDICT AND THE EXACT WORDING

**Verdict: found only as a relay → REPORTED.** Not "not found" (the relay does record an ACCEPT), and not "found verbatim" (no seat, including the relay itself, holds a verbatim note).

**Exact replacements** (the three stale lines are already being fixed by the Owner's doc-fix landing for the hash/size facts; this is only the *provenance* word). Proposed wording, same sentence, one word changed:

- old: `… the Owner-accepted release candidate (2026-11-19) …`
- new: `… the release candidate per the Owner's Part-0 ruling as relayed 2026-11-19 (REPORTED — no verbatim note in the repo; see OWNER-INTAKE A5/A11) …`

Files carrying the phrase (from the v3 report's own list): `cakepanz-4/SHELL-STATUS.md`, `cakepanz-4-prepared/SHELL-STATUS.md`, `ledger/build-report-zai-cakepanz-9-2026-11-19.md` row `dist/single.html`, plus inkling's and orcaink's own c9 copies (which the v3 report deliberately left unedited).

**The cheapest way to close it** (Owner, one line): save his own sentence to `_agents/owner-notes/2026-11-19-part0-accept-verbatim.txt`. Then the word becomes VERIFIED and every doc line above can drop the caveat. Until then, "REPORTED (the ruling itself)" is the correct label, and it is already the label the relay's own table uses.

## WHAT I WOULD CHANGE

1. **Do not write "Owner-accepted" anywhere until an owner-note exists.** It is the one label the §5 state ladder reserves for a different fact (`Owner-accepted` is the last state, after `verified`); using it for a relayed ruling collapses three states into one.
2. **AGENTS.md §1 rule (4)** already requires every long Owner message to be saved verbatim in `_agents/owner-notes/` and every item sorted. Part 0 is a numbered Owner item that has no verbatim note and no ledger row. That is the process gap, not a seat's mistake — the relay arrived as a cover, not as an Owner message.
3. **If the Owner confirms it verbally in this chat**, one line to `_agents/owner-notes/` is enough; no re-cut, no re-measure (the two dist hashes and sizes are already VERIFIED by three seats).

## WHAT I DID NOT CHECK

- **The Owner's chat messages themselves.** I have no access to them; I checked the repo only. If he said it in a chat and it was never saved, this report cannot see it — that is exactly the gap being reported.
- **`_agents/beam/` and other seats' lanes** for a private copy of the quote. I searched `_agents/owner-notes/` on every remote branch, the v3 deliverables, and `NOW.md`; a seat lane could hold an unindexed copy. If one exists, it changes REPORTED → REPORTED-with-a-second-witness, not to VERIFIED.
- **Whether "Part 0" refers to the four fixes (D1/D2/D3/D5.3) or to the whole c9 close-out.** The relay's A5 row ties it to the four fixes and the dist pair; I did not read the plain-language Part 0 note (`deliverables/plain-language-part0.md`) as evidence, because it is the council's own restatement, not the Owner's word.
