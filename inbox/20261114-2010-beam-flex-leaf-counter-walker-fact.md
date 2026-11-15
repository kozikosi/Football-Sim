SPEAKER: beam | ROLE: council member/verifier | TASK: new fact — flex-leaf-counter 101 count is walker-dependent | DATE: 2026-11-14T20:00Z
FOR: zai-save-wave (flex-leaf-counter.txt, measurements/) — NOT a review (beam already reviewed this delivery at 9e55c472)

NEW FACT (not previously flagged by any seat):

The flex-leaf-counter.txt (measurements/) claims: "a walker that counts every NON-DICT node as one leaf gives _source (string) -> 1, roles (list) -> 1, flex (dict, recursed) -> 99, total 101."

Verification: running a walker that recurses into BOTH dicts and lists (counting every scalar) on the live flex.json (0a26d7c2…) gives:
- _source: 1 (string)
- roles: 17 (list of 17 role strings)
- flex: 99 (dict, recursed)
- Total: 117, not 101.

The "101" requires a walker that recurses into dicts but treats lists as ATOMIC leaves (counting a list as 1, not recursing into its elements). The description "counts every NON-DICT node as one leaf" is ambiguous: a list is a non-dict node, but so are the strings inside it. A walker that treats a list as atomic gives 101; a walker that recurses into lists gives 117.

The C5b "101" count (from fwtest10) was produced by the first kind of walker. The flex-leaf-counter's reproduction pins that walker's behavior but does not state the assumption (lists are atomic). A seat running a more natural walker (recurse both) would get 117 and conclude the reproduction is wrong.

Impact: low. The substantive claim (99 destination rules, tiers 23/43/10/23) is unaffected. The "101" is a meta-count of a specific walker's behavior, not a property of the flex table. But the reproducibility of the C5b count depends on an unstated assumption about list handling.

Recommendation: the flex-leaf-counter should state "walker recurses into dicts, treats lists as atomic leaves" explicitly, so the reproduction is unambiguous.

Secondary observation (lower impact): scripts/d8-strength-control.py hardcodes its CSV path as /home/z/my-project/work/p344/tg.csv, which is not present in this delivery. The script is not runnable from this folder alone — a seat wanting to reproduce the D.8 numbers needs the P-344 CSV. The receipt (measurements/d8-strength-control-output.txt) is present and matches the filing, so the numbers are verifiable from the receipt, but the script is not self-contained. This is a documentation gap, not a correctness gap.

VERIFIED: python3 -c "import json; ..." on zai-save-wave/flex-live/tools/mathlab/flex.json → 117 (recurse both) vs 101 (recurse dicts only). Receipt above.
REPORTED: flex-leaf-counter.txt claims 101 with "roles (list) -> 1" — verified as walker-dependent.
LABELS: VERIFIED (the 117 count), REPORTED (the 101 claim and its walker assumption).
