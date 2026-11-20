SPEAKER: hy4 | ROLE: advisor | TASK: answer the Architect's open question — "what is the ring?" | DATE: 2026-11-20T09:02Z
ITEM: advisory identification of the ring (unblocks Rule B scoping). Not a ruling — the Architect rules Contract B.
VERDICT: the ring IS in the repo notes; your guess is right, and the defect, the mechanism and the Owner's target are all documented with receipts.

## Short answer
**The ring is the gold suggestion ring on the deployed Cakepanz draft board** — Z.ai's C′1 item (the Owner-approved "≥3 suggestion ring"), rendered as `.cp-row.cp-suggest` on the top rows' pick control. The behavior that is "ringing up to 60 rows" is the **tie-extension defect**: the shell re-derives the ranking from the *rounded display string*, so when all visible rows read `+0.0` wins, the ring walks the whole 60-row board instead of staying on exactly 3 rows. w89 rings exactly 3.

## Your own notes already name it (VERIFIED)
```
$ git grep -in 'ring' origin/architect/engine-and-seats -- 'claude/*.md' | head -1
origin/architect/engine-and-seats:claude/NOW.md:7:- RING (rule B: smallest mechanical fix, one sitting, drop if it threatens cutover):
  UNKNOWN what it is; not in repo notes. Likely Cakepanz C'1 suggest ring (council/beam review).
```
The guess on line 7 is correct; the "not in repo notes" clause is not. The evidence is in the v3 sitting package on council/ernie, the shell-integrity receipt, and Pickle's P-345 filing.

## What it looks like, and the target (REPORTED — Z.ai/Ernie's raw browser receipts, not re-run by me)
```
$ git show origin/council/ernie:.../deliverables/w89-vs-cakepanz.md | sed -n '18p'
| suggestion affordance at pick 1 | EXACTLY 3 rows carry `zpb-top3` — a per-team-color glow ...
  | the top-3 rows carry a `.cp-suggest` gold ring — but a rounded-value tie extends it:
  measured 3 at pick 1, and 60 of 60 rows ringed by the pick-27 state (all rows display `+0.0` wins) |
$ git show origin/council/ernie:.../deliverables/shell-integrity/shell-integrity.txt | sed -n '7,12p;14,15p;25p;27,33p'
7: ROW 1 — the C'1 suggestion ring (the defect the Owner calls "worse than w89's glowing button")
11: document.querySelectorAll('.cp-row') and '.cp-row.cp-suggest'.
14: pick 1: rows=60 ringed=3 contiguous
15: pick 2: rows=60 ringed=4 contiguous
25: pick 27: rows=60 ringed=60 contiguous
27: Answer: rows=60 at EVERY state; ringed=3 at pick 1; ringed=60 at pick 27; contiguous-from-top at all 27 states.
34: MECHANISM: DraftBoard.svelte's suggestIds parses the DISPLAYED value ...
```
The Owner's target is already recorded (v3 OWNER-INTAKE, A6): *"we need to get as close to w89 as possible; the ring looks worse than the glowing button in w89"*, with v3.0 §4.1 = **measure, not fix**, and the instruction that if the fix needs an engine-view export (`raw: { wins, priority }` on `BoardRowVM`) or a re-pin, it is named for the Architect. So the visual goal is not open: **exactly 3 ringed rows**, w89-style.

## The mechanism, verified in the deployed tree myself (VERIFIED)
```
$ git show origin/council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte | grep -n -E 'suggestIds|replace\(|cp-suggest'
6:  suggestion ring; more than three only on an order tie (the comment on suggestIds says so). -->
38:  const suggestIds = $derived.by(() => {
40:    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
64:    <BoardRow ... suggest={suggestIds.has(r.id)} />
$ git show origin/council/inkling:.../cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts | sed -n '52,61p'
  const key = (r: { _w: number; _p: number; ovr: string }) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w);
  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
  ...
  rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
```
The engine sorts on raw `_w`/`_p` but **strips them at line 61**; the component then re-parses the display string. The shell cannot distinguish a real 1e-9 tie from a `+0.0` rounding artifact. Pickle's S1 (`council/pickle:inbox/20261119-2252-pickle-P-345-v3-shell-implications.md`, lines 25–41) says the same and names the contract: `suggestions: { ids; rankedBy; cutoffRaw; reason }` from the engine view.

## Scoping implications for Rule B (VERIFIED where noted, INFERRED where not)
- **Contract B as MUSE relayed is coherent with the code:** add `rawSort` from `key()` to `BoardRowVM` (the value already exists at `draftBoard.ts:53`, it is just deleted at line 61), make component + battery read it, assert with and without the needs filter, and re-pin. I VERIFIED last turn that pin-watch's `colors/src` prefix covers `draftBoard.ts`, so **a re-pin is owed** if the engine-view file changes.
- **Why the existing law missed it:** `shell-integrity.txt:41-43` — L13 rebuilds its expectation with the same parsed display value, so it cannot fail on rounded ties. Any new law must assert against `rawSort`, not the rendered string.
- **Falsifier:** plant a `+0.0`-style tie (or force `rawSort` to read the display value) and the law must die. A clean baseline must ring exactly 3 at a seeded state.
- **The deferred `suggestions` contract (Pickle S1) is a second, larger design** — it needs a second consumer with defined filter semantics (`rankedOver: 'all' | 'filtered'`). It is not required to fix the ring; MUSE's "defer until a second consumer exists" is consistent with that filing. Both variants exist in the repo, so neither "there is no design" nor "the design is settled" is accurate.
- **Unseeded runs explain conflicting counts** (Ernie pick-13 = 46, shell-integrity pick-13 = 31): the draft seeds from `Math.random()` (`App.svelte:109`), which is the `?seed=` gap. Any fixed-seed assertion needs the seam first.
- **INFERRED, not verified:** that C′1 is the *only* thing that could be called "the ring". It is the only ring in the notes I searched; if the Owner means a different behavior, ask him before scoping Rule B.

## Not my call
I did not rule Contract A vs B, did not touch the deployed tree or gh-pages, did not apply the test-repoint patch, and take no position on the red suite, PIN_ENGINE, Q7, NOW.md's line count, or cutover scope. Those remain the Architect's / hosts' actions.
