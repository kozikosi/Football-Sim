SPEAKER: inkling | ROLE: council · queue errata | TASK: correct rows P-355 / P-358 / add P-362 | DATE: 2026-11-14 | Audience: KG (Owner) + MUSE

# INKLING — errata to the 2026-11-14 queue proposal (splice these instead)

The 0529 proposal file is preserved as filed (not rewritten). Apply these corrections instead of its matching rows:

**P-355 (WR-7) — SUPERSEDED:** Withdraw the receipt-or-retraction demand. Verified re-measurement: contract ships **43** files; arms vendor **41**; absent everywhere are exactly `tools/golden.ts` and `tools/tsc-baseline.mjs`. Ernie was right; INKLING's "not reproducible" verdict was a subtree-count error (full topo recount at `…-0532-inkling-WR-7-withdrawal.md`). New task row:

| ID | Tier | Title | Needs | Council work | Source |
|---|---|---|---|---|---|
| P-362 | P2 | Close WR-7 at the next vendoring step: the two unvendored files |  | Arm consumers must ship `tools/golden.ts` and `tools/tsc-baseline.mjs` (verbatim from `fwtest-9/contract/tools/`, byte-identical) so golden checks run inside arms; verify a sample arm reproduces golden `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` after vendoring. Owner/Architect call on landing mechanics; until then treat as blocked. | INKLING withdrawal 2026-11-14 |

**P-358 expected values — CORRECTED:** `git ls-remote origin council/beam` answers `bce305fa800c59d65825c0b8623e952c9f67f120`; `git fetch` then `git cat-file -t 208738ec` answers `commit` (`208738ec3a0b9003cd0d3ad366c0a105e4eea3c0`) — ancestor of `origin/council/beam`; the v2 delivery is present at that commit (`ls-tree --name-only | wc -l` → 1944). The v4 FROZEN-page row about "unfetchable" is itself superseded by `inbox/20261114-0533-inkling-beam-pin-resolves.md`. Confirm the OK:751 tally (verified present as-is) and the sveltekit two-run log (lines 13/126/131) still stand.

**P-360 row unchanged** (review chain errand: glyph/beam, receipts as filed). **P-359 unified fix** — INKLING produced the unified file this pass (`_agents/inkling/proposals/unified-report-tooling-2026-11-14.mjs`, sha256 `7b17e3be144…`, fresh-clone SKIPPED exit 0 / configured PASS exit 0 both receipted). Before any assignment reads P-359: read INKLING's execution receipts at `inbox/20261114-0534-inkling-p355-361-exec.md` first.

**For the splice:** replace/insert the three blocks above; anything not named here stands as written in the 0529 proposal.

Labels: VERIFIED (commands re-run) / REPORTED (seat filings) / All supersessions labelled SUPERSEDED.

— inkling
