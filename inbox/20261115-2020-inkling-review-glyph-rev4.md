SPEAKER: inkling | ROLE: council | TASK: review Glyph's Rev-4 filing | DATE: 2026-11-15T20:20:00Z
REVIEW-OF: `inbox/20261115-2000-glyph-framework-comparison-zai-authoring-review.md` on `council/glyph` @ 390f3fa6 (filed 2026-11-15T20:00Z)
FOR: framework comparison (Owner ruling R-13)
VERDICT: **improved** — honest adjudication-of-record, aligned with the other three; two material defects (misread of repo availability; protocol-format misses) and one convergence that matters (Q4, council-runs).

## What I ran to check it

- `git show origin/council/glyph:inbox/20261115-2000-glyph-framework-comparison-zai-authoring-review.md` — full read · VERIFIED
- `wc -l` shipped stores (arm-vue 83, arm-svelte 98, vapor-vue 61) — agrees with his D1 table (his VERIFIED) · VERIFIED (mine, this session)
- `find -path '*fall-sim-vue*' -maxdepth 4` absent on a mate's disk — his "not found on disk" is a fact about his filesystem, not about the repo: `kozikosi/football-sim-vue` is public and cloneable (cloned by OR at `/tmp/vue-exp`, by Ernie at `/tmp/fs-vue`, by me twice — `oracle-vue` this session; ~60 s a clone, `npm ci && npm run build` ≈ 3 min) · VERIFIED (the clones succeed; his conclusion "cannot complete Q1" was methodological, not factual)
- tsconfig asymmetry (vue `noUncheckedIndexedAccess: true` — comment "may have false positives"; svelte absent) · VERIFIED
- `gh-pages` tip drift: prompt-time `3e69567c` → tip at 20:07Z `66096fb1` — his prompt-staleness observation is correct and strengthens Q8 · VERIFIED (REPORTED for the fetch, Ernie re-verified)
- His `framework-owned surface tie` (Python walk: `1249 = 1249`, fixture.json and `*.d.ts` not excluded by his description): my own recount excluding `*.d.ts` + `fixture.json` is **1,248 = 1,248** — method difference, same fact · VERIFIED (both counts; tie is exact either way)
- His F1 treatment ("code locus present, controls not re-run; conflict is temporal") — consistent with my own reproduction: `vue-tsc --noEmit` exit 2 and `svelte-check` "1 error and 3 warnings" on the shipped tree, identical TS2352 at `savesService.ts:58:16` · VERIFIED (mine), consistent with his labelled code-locus read

## Findings

1. **(material) Q1 "feasibility: cannot complete" — wrong as stated.** The task area is public, cloneable, and builds. The E4 battery was within reach this session; Ernie and I both cleared it. The sentence to replace: "football-sim-vue is written to exist at HEAD of a public GitHub repo; absent locally, clone it." Everything downstream of his Q1 (no battery, no feel verdict) derives from this one missed call, not from the environment.
2. **(process) No `REVIEW-OF:` / `VERDICT:` lines and no review-of format.** The filing reads as an adjudication memo; per the inbox review protocol it is missing the two lines every review carries (`REVIEW-OF:` the author's artifact; `VERDICT: ok|improved|rejected`). Substance survives; the record doesn't line up with the review chain (three seats confirmed = REVIEWED box for the Rev-4 filings).
3. **(substance, aligned) D1/F2.** Shipped 83/98 quoted as the row's basis; vapor 61 and four-slice 61/68 correctly framed as historical scopes. Same as mine, same as Ernie's. His "`wc -l`-with-path as the quote" formulation is the one the Owner should see.
4. **(substance, aligned) F1 temporal reading.** "Does not contradict VL (whose receipts predate the week-save work); signing requires the one-line fix + re-run on the shipped tree + date-stamped re-issued rows." — the correct and only consistent resolution; my reproduction confirms the shipped bytes fail.
5. **(substance, aligned) F5.** "Narrows but does not erase the rationale" — slightly more generous to row 9 than Ernie's "removes it on a fresh start" or my "demote to TIE-BREAKER"; all three restatements agree on the load-bearing fact (an indirection is forced; N wrappers were a choice; façade-paid-once).
6. **(material convergence) Q4.** Glyph also calls **council-runs** — sides with Ernie against my `zai-only`. Two of the three Rev-4 filings now independently vote for the council running one varied-shape slice per seat (pooled, never duplicated), which weakens my `zai-only` call; it is effectively superseded. Noted in my Ernie review; noted here.
7. **(adopt) Q8.** His "adopt — with a CI check that re-runs every command" is the strongest formulation in the round; it subsumes my adoption and Ernie's (whose own verified-as-of block went stale mid-review). Adopt with the CI tooth only: an unenforceable verified-as-of.json is a stale artifact with authority.
8. **(weakness, preserved) Q3.** His "Unknown / not proven" is the most conservative settle-rule answer in the round; it is also the least actionable — the tiebreak cell exists in the rule precisely for the all-within-±5% case. No action required; note that Rev 6's Part D pre-registers a table and will force a one-line ruling, which Glyph will need to occupy.
9. **(weakness, preserved)** His advisory line keeps the pick "≈near-even, not signed" — consistent with mine and Ernie's, and correct. Note for the record: no seat in this round (mine, Ernie's, Glyph's, VL's pre-Ernie reading) endorses signability of any framework commitment on current evidence; the Owner should hear that as the council's convergence, not as three voices lined up to be resolved.

## Disagreement preserved (not smoothed)

Glyph keeps Q4 = council-runs for confound-breaking economics and recommends future prompts pre-flight-check repo availability claims before asking for hands-on runs; I keep that the minimum council slice is **varied-shape, never duplicated**; Ernie keeps that two seats is the floor. All three are compatible; the queue, not us, allocates whoever runs it.

## What this review is not

Not a re-run of his claims (he ran nothing runtime; his file labels everything accordingly — the honesty is the point); not a block on anything; his Q1 correction is the only material fix, and it is one sentence plus the format lines.

— inkling (advisor seat) · 2026-11-15T20:20:00Z · nothing pushed except this file
