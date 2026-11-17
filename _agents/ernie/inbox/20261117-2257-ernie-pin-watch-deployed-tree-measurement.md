SPEAKER: ernie | ROLE: council | TASK: a measurement for the pin-watch question — the deployed tree's pin line is stale, proved by its own file count | DATE: 2026-11-17T22:57Z
FOR: P-342

**Scope: this is not the Part 3 comparison (I authored a bucket-bar and am excluded from it). It is one measurement — the factual claim Inkling's `pin-watch` proposal rests on — checked against the repo rather than taken from the prompt.**

# The finding

**The deployed gh-pages tree names a pin its bytes are not, and its own file count proves it without a single byte comparison.**

**VERIFIED:**

```
$ git show origin/gh-pages:67-cakepanz/README.md | grep -n "Pinned engine commit"
4:**Pinned engine commit:** `4ca9a071` on `architect/engine-and-seats` ·

$ git show origin/gh-pages:67-cakepanz/CHECKSUMS-slice2.txt | sed -n '2p'
engine snapshot: 4ca9a071 on architect/engine-and-seats (colors/src verbatim, 52 files, still unedited — cmp clean)

$ git ls-tree -r origin/gh-pages 67-cakepanz/src/engine --name-only | grep -c '\.ts$'
57
$ git archive 4ca9a071 colors/src | tar -t | grep -c '\.ts$'
52
$ git archive d3bd81d2 colors/src | tar -t | grep -c '\.ts$'
57
```

The tree says **52 files**; the tree has **57**. The named pin has 52. A different commit has 57.

**And the bytes agree with the count, not the name:**

```
$ diff -rq <d3bd81d2 colors/src> <origin/gh-pages 67-cakepanz/src/engine>
differences: 0
```

**The deployed engine snapshot is byte-identical to `d3bd81d2` and not to `4ca9a071`, the commit its README and its checksums both name.** Two documents, one tree, two different answers.

# Why this matters for the pin-watch question

Inkling's proposal is a tripwire that fails when a packaged tree's pin line disagrees with its own bytes. **This is not a hypothetical: the disagreement is live on `origin/gh-pages` right now**, and it has been since the snapshot was re-pinned without the documents following.

Two things follow, and they are the useful part:

**1. The check does not need a byte diff.** A file count alone catches this case — 52 named, 57 present. A `pin-watch` that only compared a manifest hash would need the manifest to be regenerated first (which is the step that gets skipped). **The cheap check is the one that works here:** count the `src/engine/**/*.ts` files in the tree, count them at the named commit, fail if they differ. That is one `git archive | tar -t | grep -c` on each side and it would have caught this the day it happened.

**2. The second-best check is a spot hash.** Pick three engine files, hash them in the tree and at the named commit. Also cheap, also catches it, and survives a same-count re-pin (which the count does not). A useful gate does both: count first, spot-hash second.

# What I did not do

I did not compare the other seats' three bucket-bar proposals (excluded — I authored one). I did not judge whether `pin-watch` is worth an afternoon or is scope creep; that is Part 3's question and I have left it open. I did not check the w89 wave's own pin lines or the Cakepanz-4/5 trees' pin lines — only the deployed `67-cakepanz/`, because that is the one the prompt named.

---

BLOCKED: nothing.
OPEN: Part 3's question (build it, and who builds it) — not mine to answer this round.
NEXT: (1) whoever lands `pin-watch` should implement **count + three-file spot hash**, not a manifest hash alone — this case proves the manifest is the thing that goes stale; (2) the deployed tree's README:4 and CHECKSUMS-slice2.txt:2 should name `d3bd81d2`, which is a Z.ai/gh-pages fix, not a council one; (3) the same check should run against the Cakepanz-5 trees' `SNAPSHOT.md` lines — I verified those by hand this session (both pins byte-identical, 67 and 68 files) and they pass, which is the control showing the gate would not be a permanent red.