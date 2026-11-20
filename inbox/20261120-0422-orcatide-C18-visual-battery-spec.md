SPEAKER: orcatide | ROLE: council advisor | TASK: C18 — the seeded visual battery spec (for Z.ai's T5) | DATE: 2026-11-20T04:22Z

CONTEXT (for the Author): the c10 package (the 67-Cakepanz-10 trees — "the c10 package (pickle's, inkling's, orcaink's — identical bytes" per FIX-NOTES §2) carries the board ring — the C12 law: `ring == first3(sortBy(rawKey)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }` where rawKey is the raw numeric the engine sorted on (`r._p` priority, `r._w` wins, `Number(r.ovr)` OVR), recomputed in the view, never by parsing the DOM or the formatted string. The shell adds: the board's top-three-by-order rows carry the suggestion ring on their pick control (the C′1 Owner ruling — the pickle c9 comment: "the top three rows by the board's active order get the suggestion ring"). The spec is written so T5's battery can be implemented without asking a question.

ASSERTIONS (law, selector, expected):

1. Ring at pick 1 — law: "at the pick-1 state, exactly 3 rows carry the suggestion ring and they are contiguous from index 0 of the board's rows (DOM order = `vm.rows` order)".
   - selector: `.cp-suggest` (the c10 BoardRow wires it as `class:cp-suggest={suggest}` on the row div).
   - expected: `[0, 1, 2]` — the first three rows in DOM order, no more, no gaps before the third.
2. One-click Draft on a ringed row — law: "one click on a ringed row's Draft control lands exactly one pick" (the C19 button on the ringed row).
   - action: click the Draft control on `document.querySelectorAll('.cp-suggest')[0]`.
   - expected: `record.picks.length + 1`; the picked player id is on the user's roster; the ring then shifts by the C12 law (recompute: the new ring is the first three of the raw sort over the remaining rows + ties).
3. No horizontal scroll at 390 — law: "at viewport 390 px, the document does not scroll horizontally".
   - check: `document.documentElement.scrollWidth <= window.innerWidth` and `document.body.scrollWidth <= window.innerWidth`.
   - expected: true.
4. Zero console errors — law: "no `console.error` during the run".
   - check: spy on `console.error` before the run; expected: 0 calls.
5. Seed code displayed and matches `?seed=` — law: "the board displays the seed code and it equals the `?seed=` parameter value".
   - check: the seed-code element's text vs `new URLSearchParams(location.search).get('seed')` — expected: equal (or, until T1 lands, equal to the launch-time seed — label which).
6. Ring is 3 (or 3 + ties) at every measure — law: "at every checkpoint, the ring size is 3, or > 3 only when the raw key of the row after the third equals the third's raw key (the C12 law: `rawKey(row_4) == rawKey(row_3)`)".
   - checkpoints: pick 1 (early), mid-draft, late (the pick-27 state).
   - selector: `.cp-suggest`; expected: `3` or `3 + k` with `k` rows tied at the third raw value.

SEEDS (name them; at least three; S3 is the collapse seed — see below):
- S1 = 17 — early-positive picks; verify the ring is `[0, 1, 2]` at pick 1.
- S2 = 42 — mid-draft walk; checkpoints at picks 12/27.
- S3 = the collapse seed — the pick-27 state where the ring is the whole visible board (the sitting's "the 60-row collapse"; the exact seed value is UNKNOWN to me — not measured here). Measure it: sweep seeds (`?seed=<s>`), reach pick 27, and take the first `s` where the ring size == the visible row count.

How to run / PASS: the Author writes `batteries/visual.battery.mjs` (the c10 package's `batteries/`); PASS = all 6 assertions pass at all three seeds.

WHAT I RAN (receipts):
- the C12 adjudication file `inbox/20261120-0342-orcatide-C12-ring-fix-adjudication.md` (A — `vm.suggestions.ids` per the law);
- the law text from `origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md` §4 (the law quoted);
- the c10 BoardRow wiring (`.cp-suggest` on the row div) — `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte | head -45` (receipt above: `class:cp-suggest={suggest}`, `data-id={r.id}`).

DONE WHEN: a spec another seat can implement without asking a question: the 6 assertions with law/selector/expected, the seed list with the collapse seed handled honestly (UNKNOWN-labelled until measured).
