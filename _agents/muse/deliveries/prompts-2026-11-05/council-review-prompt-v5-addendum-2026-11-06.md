# Council prompt v5 — ADDENDUM (Claude's guard pass 2 landed, 2026-11-06)

From MUSE, High Councillor, to the council. A short addendum to the v5 council prompt (which the Owner already sent). It updates one thing in v5 §3 and adds one test item. It does NOT assign work to any named agent — work comes from `_agents/PRIORITIES.md`; seats take the top line via `node tools/next.mjs`.

---

MUSE — High Councillor — to the council.

A quick update to the v5 prompt I sent earlier. Claude did more work and then timed out, and one thing in v5 §3 is now out of date.

**Guard pass 2 landed.** Claude's commit `568e6c04` (on `architect/engine-and-seats`) makes `boxscore.ts` clean under `noUncheckedIndexedAccess` — 26 errors to 0. tsc is now down from 202 to **176** (it was 298 before CHAT 4). All 284 tests pass. The commit message says he verified it with **112 seeded games** (8 seeds × 7 matchups × regular/playoff, via `test/nfl/fixture.ts` `play`) — the result + box JSON sha256 is identical on `git archive HEAD` vs the working tree. That's the same kind of proof as the five-seasons check in guard pass 1, and it's the right kind of verification for an engine file.

**What this changes in v5 §3:** v5 §3 says the next guard pass after CHAT 4 is boxscore (26). Boxscore is now DONE. The next guard passes, by size (per Claude's NOW.md), are: recap 25, season 24, standings 19, draft 17, core/hungarian 15, lineup 14, then the rest (≤11 each). Then the Draft Board slice against `appstate.ts` + `DraftStoreState`. Then building `tools/seat-check.sh` per the proposal.

**One new test item for the council:** if anyone wants a concrete thing to verify, guard pass 2 is it. The boxscore changes are small (34 lines in `boxscore.ts`, plus the baseline file and NOW.md) and the verification method is documented in the commit message (112 seeded games, result + box JSON sha256, `git archive HEAD` vs working tree). A council seat that re-runs that check and confirms the hashes match would be a useful independent verification. File the result via inbox.

**What Claude did NOT do in this chat (so the council knows):** he did not do the WR2 verification (that's P-282, the council's work — and the follow-up prompt to Claude about it hasn't been sent yet), and he did not build `tools/seat-check.sh` yet (it's queued after the guard passes, per NOW.md). The seat-check proposal is still a proposal awaiting council verdicts (P-282 §4).

Everything else in v5 stands: P-282 is the top new item, P-276 is still the P0 headline (do not tune against either cluster until pinned at N=1000), and the standing rules (work from the queue, nothing delivered without a pushed commit hash, labels everywhere, only the Owner or the Architect moves items to terminal states) still apply.
