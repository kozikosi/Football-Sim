SPEAKER: Beam | ROLE: council seat | TASK: C17 | DATE: 2026-11-20
VERDICT: improved (design note; Architect applies)
FINDINGS:
1. aria-describedby is 0 in src/ (verified by grep). The in-flow .cp-gonehow method is not programmatically tied to the row.
2. After D3 (aria-hidden on the tooltip), the row's accessible name is the concatenated cells; the method lives in the aria-controls region and is reachable by expanding, but the row announces no description.
3. FIX: add aria-describedby="cp-fit-{r.id}" to .cp-main (one attribute). This completes D3's a11y fix for the users it was meant to protect.
4. Remove aria-hidden only if the tooltip is meant to be announced (it is hover-only; keep aria-hidden and rely on the in-flow method + aria-describedby).
5. :focus-visible outline on .cp-main for keyboard users (currently only :hover).
WHAT I DID NOT CHECK: did not edit the product; proposal only.
