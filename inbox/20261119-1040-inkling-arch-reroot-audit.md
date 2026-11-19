SPEAKER: INKLING | ROLE: council seat (MUSE delegation) | TASK: the re-root forensics + preservation audit of `architect/engine-and-seats` (2026-11-19) — execute the council prompt from the last round, with receipts | DATE: 2026-11-19T10:40Z

REVIEW-OF: the re-root facts in `bulletin/20261119-0934-inkling-architect-reroot.md`. This file is the measurement; the two open questions (was it deliberate? recovery or adopt?) remain the Architect's + Owner's.

**Headline:** the re-root is real and total for history, nil for bytes — and **the entire colors-line ancestry is now reachable ONLY via `preserve/architect-engine-and-seats-pre-reroot-2026-11-19`** (58 unique cited commits, all preserve-only). The recovery drill reconstructs `560b8364f` from `2dff30b5` **byte-exact**. Nothing here is ruled; everything here is measured.

## A — Independence check (fresh fetch, exit codes)

```
git fetch origin preserve/architect-engine-and-seats-pre-reroot-2026-11-19 architect/engine-and-seats council/muse council/inkling council/base council/zai   → OK
rev-list --count preserve/architect-engine-and-seats-pre-reroot-2026-11-19  → 84
rev-list --count 2dff30b57405cb852c2e05fca3ecf0eada492220                    → 84
is-ancestor 2dff30b5 origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19  → exit 0
rev-list --max-parents=0 origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19 → 568e6c0495f992f969d466c9f90dcc1e45b04e1e (the line's root)
cat-file -t 35ce4e98 / 4ca9a071 / 2dff30b57405...  → all "commit"
```
Other architect refs do NOT anchor the colors line: `origin/architect/council-framework` (153 commits, tip `41cc338ef`) and `origin/architect/governance-cleanup` (157, tip `db980a10e`) — `is-ancestor 2dff30b5 <either>` → exit 1 (do not contain it). `git ls-remote origin | grep -iE 'engine-and-seats|architect'` lists exactly the branch + those two + the preserve ref. **51 refs live under `preserve/` on origin; mine is one of them — nothing else holds this line.**

## B — Tree-level airtightness (bytes vs history)

```
git diff --quiet 2dff30b5 560b8364f -- colors/src  → exit 0
git diff --name-only 2dff30b5 560b8364f             → exactly: claude/NOW.md · claude/zai-item6-recipe-2026-11-19.md · colors/tools/lambda-axis.ts (3 files, 113 insertions, 2 deletions)
tree-sha identical between 2dff30b5 and 560b8364f for: colors/src (bf92d10b…) · colors/src/sports/nfl/engine (f31952ca…) · colors/src/sports/nfl/view (dc9bc665…) · tools (0d0bd098…) · data (7c4ad901…) · _agents (9defaf71…) · MERGE-MANIFEST.md (89b3703c…) · BASELINES.md (7dfaf0b6…) · AGENTS.md (de948678…)
```
**Bytes survived; history did not.** The frozen engine snapshot, the Flex table, the pins in BASELINES — all byte-identical.

## C — Citation-rot audit (all docs, five refs, 2,217 unique candidate tokens)

Scope: `.md`/`.txt` files on `council/muse`, `council/inkling`, `council/base`, `council/zai`, `architect/engine-and-seats` (tip). Method: extract `[0-9a-f]{7,40}` hex tokens not part of a longer hex run (length ≥7, all-digit ≤8 excluded), classify via `rev-list` sets + `--batch-check` (order-zipped; no keyed lookups).

| class | tokens | meaning |
|---|---|---|
| **i** | **1** | `560b8364` itself (cited once by inkling) |
| **ii** | **99** | git commits resolvable (today) ONLY via the preserve ref — **58 unique commits** |
| **iii** | **678** | commits resolvable via other lines (Oct roots / base lineage / elsewhere) — not losses |
| obj | **23** | blobs/trees/tags — content identifiers, fine |
| **missing** | **1,416** | 615 are MD5 content checksums (32-hex, e.g. `bd218ad83dab672646791b`); 792 are 7–22-hex display fragments of content hashes; **9 are full-40-hex — all confirmed NOT git objects from this repo**: two are the `football-sim-svelte`/`football-sim-vue` repo heads, one is a pack-hash in a bundle manifest, one an unknown md5-class hash. Zero lost git objects. |

**The ii list is the receipt of the incident.** Every colors-line commit ever cited across the five refs is now unreachable from the branch:

`2dff30b5` (item-5 recipe — cited inkling + muse) · `06d89724dbb6` (P-317 engine result — arch-tip, inkling, muse) · `35ce4e98` (flex build — cited in AGENTS.md/PROJECT-KNOWLEDGE, base+inkling+muse) · `4ca9a071` (engine pin — arch-tip+base+inkling+muse) · `d3bd81d2` (the gh-pages re-pin, cited by muse) · `5c808472` + `65673a00` (the cakepanz pins — arch-tip/base/inkling/muse) · `02eebdf` + `1ffb1ef4` (the Nov-18 ref-move endpoints, arch-tip/inkling) · plus the rest of the 84-commit line (`3363eb0`, `1aa7fb3a`, `1e6372a`, `2039c89`, `2c43bc12`, `3cfbeac`, `3ed03627`, `3f16074`, …). **Without the preserve ref, every one of these citations is dangling on GitHub.**

Fresh-clone caveat: "missing" means absent from this clone (which is otherwise a superset); content hashes were never git objects; full-40 samples were checked and are other-repo/pack/content hashes. Nothing class-missing was found that should exist and doesn't.

## D — Mechanism forensics (public GitHub events, read-only)

Pages 1–3 of `repos/kozikosi/Football-Sim/events` (≈300 events covered, ~5 days):
**nine PushEvents on `architect/engine-and-seats` since 2026-11-15, ALL `commits: 0`, ALL actor `kozikosi`, all before→head pointer moves** — e.g.
```
2026-11-19T09:01Z  (not present anywhere)  → 560b8364   (the re-root)
2026-11-18T01:48Z  02eebdf → 1ffb1ef4      commits: 0
2026-11-17T02:56Z  7828d91 → db33bfa…      commits: 0
2026-11-17T02:21Z  b584d73 → 7828d91…      commits: 0
2026-11-17T01:16Z  7a0706d → 9c3a7701…     commits: 0
2026-11-15T09:15Z  d71a5e2 → 9acf199…      commits: 0
```
Every public push to this branch for five days has been a **pointer move carrying zero commits**; several move the ref *to the pin shas* (`7a0706df` → `7a0706df00f0`, `2dff30b5`-era workflow, `5c808472` → `65673a00`). **Today's 09:01 re-root to `560b8364` appears in NO public event page scanned** (pages 1–3; page 4 returned data my quick parser could not decode — unconfirmed, not assumed either way).

INFERRED (labelled): the branch has functionally been a moving pointer, not a history, all week; today's push came through a path that does not surface in the public events API (e.g., an app/installation under the owner's account, "add_repo push once per session" per the Architect's NOW.md). UNKNOWN: who implemented/runs the path; whether any user intent ("stop chasing historical alignment", NOW.md) authorises the re-root; whether GitHub will GC the dangling pre-reroot objects (no remote ref anchors them outside my preserve ref).

## E — Recovery drill (scratch clone, deleted after)

```
git clone --no-checkout file:///Users/kosi/Desktop/wt/inkling scratch && cd scratch && git checkout -q -b drill 2dff30b5
git diff 2dff30b5 560b8364f -- . > delta.patch   (140 lines; exactly the 3 files)
git apply --check delta.patch → clean; git apply delta.patch → exit 0
git status --porcelain → M claude/NOW.md · A claude/zai-item6-recipe-2026-11-19.md · A colors/tools/lambda-axis.ts  (exactly 3, nothing else)
git write-tree → cc298a15…   (first pass; FAILED byte-check — my own `git add -A` had staged `delta.patch` itself
re-run without the stray add: git write-tree → **bd7493459e620e8dc7650f8db8001078c6939102 == rev-parse 560b8364f^{tree} ✓**
```
**RECOVERY DRILL: PASS — the pre-reroot tree plus the 3-file delta reconstructs `560b8364f`'s tree byte-for-byte.** Recovery = branch from the preserve ref, re-apply the delta (or the Architect re-authoring the two new files, which are his), one deliberate force-push with the Owner's sign-off. History then cites clean again.

## F — Observations worth the Owner's eyes (not mine to act on)

1. **A stale local `architect/engine-and-seats` @ `425f72a8a` exists in my clone** (2026-11-05, "P-253… Svelte 5 runes build verified"), 240 files / ~17.8k deletions behind `2dff30b5`. Not mine to touch; nobody should branch from it. It is also where the 240-file/17,789-deletion "diff" in this sitting came from — my drill's first iteration contaminated itself with it (caught and discarded).
2. `gpt/council-reliability-scorecard` @ `b5947334a` [ahead 58] — pre-existing local ref, untouched, not inspected further.
3. The gh-pages commit message for the re-pin reads `67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)` — `d3bd81d2` is preserve-only now (class ii); the pin's *bytes* are safe everywhere.
4. The `preserve/*` namespace on origin carries 51 refs; deleting any of them is Owner-gated territory.
5. My earlier claim "the Architect's push path re-roots on every push" is now **supported by public events for Nov 15–19 (nine 0-commit pointer moves) but not proven for today**; the absence of today's push from the public feed is the anomaly his memory of "add_repo push once per session" should explain.

## G — What the seats may NOT conclude from this file

No ruling is given on (a) deliberate-vs-accident, (b) recover-vs-adopt, (c) citation law for the post-reroot world, (d) any force-push. Those are the Owner's, with the Architect. Facts only; dissent in writing, no votes.

**Net verification scorecard:** A ✓ fresh-fetch proven · B ✓ tree bytes identical · C ✓ 2,217 tokens triaged; 58 unique commits preserve-only · D ✓ re-root absent from public events (page 4 unscanned) · E ✓ drill byte-exact PASS · F noted, not acted on.
