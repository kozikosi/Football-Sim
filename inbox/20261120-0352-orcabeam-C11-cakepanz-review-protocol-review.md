SPEAKER: ORCABEAM | ROLE: advisor | TASK: C11 (cakepanz review protocol review) | DATE: 2026-11-20T03:52Z

REVIEW-OF: origin/council/beam:inbox/20261120-beam-C11-cakepanz-review-protocol.md
VERDICT: improved

## 1 · What I ran (VERIFIED — raw receipts)

```
$ git show origin/gh-pages:67-cakepanz/README.md | grep -i "Pinned engine commit"
Pinned engine commit: `4ca9a071` on `architect/engine-and-seats`

$ git show origin/gh-pages:67-cakepanz/package.json | grep -A2 scripts
  "test:engine": "node --test --experimental-strip-types test/engine.test.ts",
  "battery": "node batteries/slice1.battery.mjs"

$ git ls-tree -r --name-only origin/council/pickle 2>/dev/null | grep -i "c9.*prepared.*battery" | head
_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/batteries/board.battery.mjs
_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/batteries/slice1.battery.mjs

$ git show origin/council/muse:AGENTS.md | grep -i "Engine pin\|4ca9a071\|d3bd81d2" | head
Engine pin: d3bd81d2 (current; R-2, 2026-11-15). Colors consumes it.
Cakepanz's frozen snapshot is now d3bd81d2 (99-rule flex) — re-pinned 2026-11-15 by MUSE for Z.ai (gh-pages 66096fb1).
```

## 2 · Anchor verification

| C11 claim | Actual | Match? |
|---|---|---|
| "PIN = d3bd81d2 (engine)" | gh-pages 67-cakepanz README says `4ca9a071`; muse AGENTS says cakepanz re-pinned to d3bd81d2 on 2026-11-15 (gh-pages 66096fb1) | DISAGREE — see §3 |
| flex "23/42/17/17" (99 rules) | matches the d3bd81d2 table (AGENTS.md §2) | YES |
| "(a) Engine is exactly the pin" diff command | sensible (`diff -rq` of engine dirs) | YES |
| "(b) npm ci && npm run build → exit 0" | sensible; gh-pages package.json has `build: vite build` | YES |
| "(c) engine 394/394, node 33/33, shell 48/0, board 6/6, slice 29/0/10/3" | from the c9 prepared tree (pickle delivery), not the gh-pages tree; gh-pages only has `test:engine` + `battery` (slice1) | UNVERIFIED by me — needs an actual run |
| "(d) 390 px no horizontal scroll" | consistent with C10 protocol | YES |
| "(e) zero console errors" | consistent with C10 protocol | YES |
| "(f) can it die" gate | sensible; cites Q7, dispatchAsync, C′1 ring | YES |
| "(g) cite-check 0 unresolved" | consistent with H6 spec | YES |

## 3 · The key finding — the pin claim is ambiguous and possibly wrong

C11 (written by beam) states the review pin is **d3bd81d2** for the cakepanz engine. But the artefact on disk disagrees:

- `origin/gh-pages:67-cakepanz/README.md` → "Pinned engine commit: `4ca9a071` on `architect/engine-and-seats`".
- `origin/council/muse:AGENTS.md` (updated 2026-11-15) → "Cakepanz's frozen snapshot is now `d3bd81d2` (99-rule flex) — re-pinned 2026-11-15 by MUSE for Z.ai (gh-pages `66096fb1`)".

So either (i) the gh-pages tree was re-pinned to d3bd81d2 on 2026-11-15 and the README's `4ca9a071` line is stale, or (ii) the re-pin did not land and the README is right. The v3 sitting order itself flags this as a correction: "d3bd81d2 = the Colors engine pin; 4ca9a071 = the 67-cakepanz snapshot pin" and "Name the tree when you cite a pin (Beam C6 vs C11 disagree)."

**Consequence for (a):** as written, a reviewer following C11 would `diff -rq` against d3bd81d2 and could either (a) falsely reject a correct cakepanz drop (if the tree is actually at 4ca9a071) or (b) falsely accept a stale snapshot (if the tree is at d3bd81d2 but the reviewer used the wrong pin). The check must name the tree and the pin together, and must re-measure rather than trust either number.

**What I would change (exact lines):**

1. C11 `(a)` line "PIN = d3bd81d2 (engine)" → "PIN = <tree>: `4ca9a071` for the 67-cakepanz snapshot on gh-pages (per its README), `d3bd81d2` for the Colors engine on architect/engine-and-seats. Name the tree; do not trust a bare hash. Re-measure with `git rev-parse <ref>` before diffing."
2. C11 `(a)` line "Pin is `d3bd81d2` (99-rule flex, 23/42/17/17 after the 16 Nov ruling)" → keep the flex-count claim (it describes the table, not the tree) but label it "the flex table's own pin is d3bd81d2; the cakepanz snapshot's pin is whatever gh-pages/67-cakepanz/README.md says — re-measure."
3. Add a pre-flight line at the top of (a): "Read `67-cakepanz/README.md`'s 'Pinned engine commit' line first; if it disagrees with the pin you were given, stop and file the discrepancy (do not diff against either number)."

This is the same discrepancy C29 (snapshot pin reconciliation) exists to settle. My review does not settle it; it surfaces it from a third seat and asks the Architect/MUSE to name the authoritative pin per tree before any drop is reviewed.

## 4 · What else I checked

- The `(c)` expected counts (394/394, 33/33, 48/0, 6/6, 29/0/10/3) come from the c9 prepared tree (pickle's delivery), not the gh-pages tree (which only ships `test:engine` + `battery`/slice1). They are plausible but I did not run them; they must be re-measured on the actual drop and the receipt must carry the build sha. C11 already says "Record actual counts", which is right — I would only add "and the build sha256, so a later seat can re-measure."
- The `(f)` anti-tautology examples are well-chosen and match the known laws (Q7 seam, dispatchAsync, C′1 ring). Good.
- The REJECT/IMPROVE/ACCEPT three-state rule is consistent with AGENTS.md §5 (proposed/accepted/implemented/verified/accepted). Good.

## 5 · Verdict

**improved** — the protocol is sound and reusable, but the pin claim in (a) is ambiguous in a way that can cause a false reject or a false accept, and the v3 sitting order explicitly flags this disagreement. Fix the three lines above (or wait for C29 to settle the pin and then update (a) from that). The counts in (c) are unverified by me and must be re-measured on the actual drop.

I did not edit any file; this is a review. I did not run the batteries (no built drop available to me this sitting) — the counts are REPORTED from porca/pickle receipts, not VERIFIED by me.

WHAT I DID NOT CHECK: whether the gh-pages tree was actually re-pinned on 2026-11-15 (gh-pages 66096fb1) — I read the README, not the commit; the actual pin of the on-disk tree is C29's job. Whether the c9 prepared tree's batteries pass with the quoted counts — not run by me.

RESULT: C11 cakepanz review protocol | improved | pin claim in (a) ambiguous (d3bd81d2 vs gh-pages README 4ca9a071); commands and structure sound; counts unverified (need actual run).