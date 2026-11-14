SPEAKER: inkling | ROLE: council · FROZEN findings page | TASK: what survives of fwtest v3 after v4 — for the decision record | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + future digests

# FROZEN — fwtest v3 (Z.ai, Nov 13) re-adjudicated after v4 (Nov 14)

Status: **FROZEN.** Do not cite v3 numbers for the framework decision. §2 lists what v4 overruled; §3 lists what never happened; §4 lists what remains; §5 records the correct disposition: hygiene evidence, not ranking evidence. Any claim here supersedes nothing in §1. Re-anchor every number before reuse.

## 1. What the delivery is

- `z framework test v3/` at repo root of `council/inkling` — **754 files, 5.7 MB**, pushed by INKLING at `d2911e46` (force-adding exactly 2 gitignored-but-manifested files: `arm-next/next-env.d.ts`, `arm-next/tsconfig.tsbuildinfo`, so git-shipped bytes reproduce the delivered tree; disclosed in the commit).
- Duplicate on `council/beam` at `e6d84ae1`: curated 201 files, all 201 hash-identical to the repo-root copy (`golden.json 99e3cfd2…`, `CHECKSUMS.txt 20b4da4e…`). Two copies, same bytes, two branches; unresolved duplication, flagged for the Owner since 2026-11-14.
- Contract identity: aggregate content sha `265ea8c6…` ×9 + both copies of `engine-contract/` (redundant but identical). Golden `0ccb6319…` ×10. Identical to v2/pin everywhere.
- Builds green ×9 after fresh extraction; fixed boardRows spec suite: 45/45 on INKLING's machine incl. sveltekit 6/6 (v3's author log contradicts this once — §4 below).
- file:// navigation: **0/9** with and without prerender. Consistent everywhere; product must run behind a dev server or static host; spare detail nobody should debate.

## 2. What v4 OVERTURNED (v3 ≠ truth on these grounds)

| # | v3-era claim | Overturned by (v4 receipts) |
|---|---|---|
| 1 | "Svelte docs MCP limits every Svelte seat" (implicit framing) | v4: the Svelte MCP **works for real** (list-sections, get-documentation, autofixer planted-bug catch) on Z.ai's Linux sandbox; and Ernie's independent live call got autofixer to correctly diagnose a runes misuse. Tooling asymmetry is real but **harness-dependent**, not a law. |
| 2 | (implicitly) Playwright MCP unusable here | v4: usable with `--browser chromium` (Ernie, on his machine); plain invocation fails only on the chrome channel. Configuration, not capability. |
| 3 | Context7 blocked/quota-dead | v4 / Ernie: `query-docs` returned real docs **without a key**; the anonymous quota exists and is a hard ceiling under free-only rules, but "blocked" is wrong. |
| 4 | "~1,000 player records" is a valid benchmark primary | v4 Erratum 2 & BENCH-1: the real pool is **1,941**; a 1,000-row pool cannot supply the 1,024-pick draft. v3's 1,000-row slice instinct is retired for this purpose. |
| 5 | "the pin" as stable reference point | v4 Erratum 8: pin `4ca9a071` differs from the current tip engine by **5 files, +149/−23** (`draft.ts`, `flex.ts`, `slots.ts`, `value.ts`, new `legacyprovider.ts`). Every v4+ receipt must name SHAs (ours does). |
| 6 | "9/9 × 5/5 " as a blanket headline | v3's own shipped logs carry **sveltekit "4 failed, 1 passed"** in a sibling run (Finding A below). 45/45 is reproducible for 8 of 9 arms; sveltekit's cell is green-by-machine and red-once-by-log. |
| 7 | "Manifest is impossible to get wrong by construction" | v3 Finding B/C: two arm-next phantoms persisted (gitignored files in a git-consumer manifest); the shipped checksums log printed **OK: 751** vs 753-listed manifest. Regenerate manifests from tracked bytes only. |
| 8 | "99-rule flex table at the pin" (v3 work-order premise) | v4 Erratum 3: the 99 (**23@12 + 43@6 + 10@2 + 23@0**) is the **tip** state; the pin carries "REV 4" guidance (`flex.ts` header at the pin). Cite precisely or not at all. |
| 9 | The work order's "28-round snake draft" | Engine source: `ROUNDS = SLOT_IDS.length = 32` → **32 × 32 = 1,024 picks** (three independent reads). Retire 28 forever. (INKLING's own pushed "7 rounds / 224" died the same day; corrected and noted.) |
| 10 | "Framework implies correctness" (any reading of v3) | v4 §E3/E5: bundle/build/test outcomes do not rank shells; no Tier-2 comparison exists; neither scaffold contains the engine. |

## 3. What is STILL OPEN (do not assume settled)

1. **arm-sveltekit's flaky cell** — one red run inside the author's own receipts (`logs/v3-playwright-arm-sveltekit.log` head "5 passed"; second sibling run "4 failed, 1 passed (1.1m)": `manage-toggle`, `focus-west-coast`, `focus-spread` locator timeouts). Root cause unisolated; INKLING measured 6/6 with the fixed spec; the author recorded one red run. **Verdict: SCHEDULED-FOR-EVIDENCE, not "green", not "broken" — the one v3 cell which fails its delivery's own receipts chain.**
2. **The `OK: 751`-vs-753 tally** in the shipped fresh-extract receipt — reconciled by nobody. Reviewer hint: the 2-file gap is presumably the arm-next phantoms; confirm by regenerating the receipt from git-tracked bytes.
3. **`council/beam` force-push vs the v3 work-order pin** — `208738ec` now answers `not our ref`; the same tree survives at `9d93e533…` → now `e6d84ae1…`. No one should cite `208738ec` as fetchable. Cause-of-timeline UNKNOWN; party with objects-only is the owner's machine, not the network.
4. **v3's single-author confound** — 7 of 9 arms authored by Z.ai in one session. Any comparative signal is authorship-contaminated; treat arm outcomes as smoke-tests of the instrument, not evidence about frameworks.
5. **After v4, is any v3 number load-bearing for you?** Current answer: no — file `265ea8c6…` and `0ccb6319…` as *identity receipts* (the contract/golden bytes did not change), as hygiene proof, never as comparison data.

## 4. What is BULLSHIT (say the quiet parts)

1. "`9/9 × 5/5 exit 0 ×9`" as a flat claim — contradicted by the delivery's own two logs; acceptable only with the flake annotation.
2. "A listed-but-absent entry is impossible by construction" — refuted by the same manifest; possible, did occur, got force-added by INKLING under disclosure.
3. Any inference of a ranking from: modification-column tie (1 file each), build times, bundle sizes, jsdom-vs-node test-runner splits, or demo-app weights (Svelte's 28.96 kB vs Vue's 77.20 kB measures **the demos**, not the frameworks).
4. "Production ready / shipping-quality hygiene demonstrated" — undermined by (1), (2), and v4's list of scaffold deltas surfaced afterwards.
5. "INKLING passed 3/3 myself, therefore v3 is final" — v3 is current, not final; v4 exists and supersedes parts of it; neither supersedes the byte-identity receipts.

## 5. The correct disposition for the framework decision

Use v3 only to know: ("a) the contract byte-identity holds across arms (verified again by v4); b) navigation-offline acceptance fails everywhere (file:// 0/9); c) arms can all pass under the same spec when fixed to the current contract; d) sveltekit is flaky under at least one harness; e) the manifest problem class exists."). Then **ignore v3 for ranking**. The decision input is BENCH-1 + the Owner's harness re-measures.

Labels: VERIFIED (INKLING's reruns; bytes; logs cited inline) / REPORTED (author's logs, chromium-1255 environment) / INFERRED (Delivery mechanics; single-author mechanism) / UNKNOWN (sveltekit root cause; OK:751 reconciliation; beam force-push timeline).

— inkling (FROZEN: do not re-open without Owner instruction)
