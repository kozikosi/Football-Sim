SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: A2 — Architect resumption pack (one-page delta on the existing return order) | DATE: 2026-11-20T04:30Z

FOR: the Architect (Claude), the Owner
VERDICT: **ready to hand over.** The return order at `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md` is the base; this is the delta the council has verified since it was written. Do not re-run the four gates — they are VERIFIED.

---

## 1 · What is already VERIFIED (do not re-run)

| gate | receipt |
|---|---|
| canary (`tools/ci/canary.mjs`) | Pickle, 3 controls green, 5 planted violations caught by the intended test |
| `npm ci && npm test` | **430/430**, `tsc:check` **89/89** (Pickle, ERNIE) |
| 390 px phone check on Pre-Colors `40233d6b…` | 0 offenders, 0 page errors (Pickle) |
| `post-merge-smoke` on the same pin | PASS, exit 0, `ux=CLEAN` (Pickle) |

These are **gate PASSes, not product acceptance**. Browser throughput is UNKNOWN (nobody timed it).

## 2 · The delta (nine items, each one line)

1. **NOW.md is 16 lines against its own ≤15 rule.** Merge the 7th/8th-sitting DONE lines; no content is lost.
2. **N1 — "Owner ruling 4" is ambiguous.** The 13 Nov batch's item 4 is "Measure first, replace second"; the no-DSL defer is **D18** (`claude/assessments/2026-11-13-master-assessment.md:142`). Cite D18.
3. **N2 — name the implementation.** `colors/src/sports/nfl/sim/passclass.ts` (`theta` :19, `lambda` :20) and `colors/src/sports/nfl/sim/drive.ts:50-51` (`tilt()`, `s = lambda * gap`), gap at `:78`, applied at `:93`. The plan's §4 formula is that function, not a new idea.
4. **N3 — baseball is a recommendation against the recorded line.** `AGENTS.md:34` / `PROJECT-KNOWLEDGE.md:11`: "Second sport (basketball) is post-v1.1"; the 13 Nov batch item 14/15 says basketball after football ships. Plan M's §6 recommends baseball; §10 leaves the pick to the Owner at MS-2 and MS-0 builds nothing. Say so in §6; the Owner settles it.
5. **S1 — the ring fix ruling.** Three seats filed C12/C5; all recommend **Contract A**: the engine view returns `suggestions: { ids, rankedBy, cutoffRaw, reason }`, computed from the raw key before the VM strip (`draftBoard.ts:61`), and the component renders the fact. The non-tautological law: the ring equals the first three by the raw key plus the ties at the third, **recomputed from the engine's sort, never from the DOM/display string** (`DraftBoard.svelte:40/42`; `board.battery.mjs:52` currently rebuilds its expectation from the same parse). One ruling unblocks Z.ai's T2/T5 and the most visible defect.
6. **Q7 test — one-line fix.** The neutral and loaded snapshots share `season`/`week`/`packHash`/`engineVersion`; a provider that prices by `snapshot.week` passes. Set `week: 6` in the loaded snapshot (ERNIE + Porca, with a runnable proof).
7. **The published slice's engine suite is RED.** `origin/gh-pages:67-cakepanz` at its current commit: **277/286, 9 failures** — six flex tests still written for **REV 4** (penalties 0/2/4/6, WR pays 4, NICKEL/DIME free) while the engine carries the **99-rule** table; two base-total tests; and `PIN_ENGINE` still `nfl1.0e237387b2647f` while the tree computes `nfl1.14a4e9333e888a`. Update the flex/base tests and the pin in the same commit, or every review will see a red suite (ERNIE C16).
8. **The stale smoke tab.** `tools/post-merge-smoke.mjs:421` still lists `tabGuideBtn`; V23 removes the Guide tab. Skip a tab whose click fails (durable), and drop the id when V23 lands. The tool is the Architect's/MUSE's; the council proposes.
9. **The pin wording.** `d3bd81d2` = the Colors engine pin; `4ca9a071` = the 67-cakepanz snapshot pin; the gh-pages README names `4ca9a071` but its tree carries `d3bd81d2` (57/57 blobs, ERNIE C29). Name the tree when you cite a pin.

## 3 · What the council is NOT asking for

- No product change from this pack. It is a resumption checklist.
- No re-run of the four gates, the c10 repair, the doc-fix md5s, or passGap — all settled with receipts.
- No new Owner asks. The Owner-owes list is separate (C30).

## 4 · If you only do three things

1. Rule the ring contract (item 5) — it unblocks the most visible defect.
2. Update the flex tests + `PIN_ENGINE` (item 7) — the published suite is red and every review inherits it.
3. Fix the Q7 fixture (item 6) — one line, and the law becomes enforceable.