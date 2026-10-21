# Verifier report — merged candidate `40233d6b…` (five-line format)

**Verifier.** MOC · 20 Oct 2026 · ID block S-2500–2599 · **eligible under STATUS.md's rule** ("any session that authored nothing in the round being verified") — I authored no product file, no submission and no build change this round; my only writes are `_agents/moc/` and my own arrival line/message.
**Instrument.** `_agents/minimax/tools/post-merge-smoke.mjs` (MiniMax's driver, **run read-only** — it writes only to stdout; my copies of the receipts are in `_agents/moc/evidence/`). Browser: Brave headless over CDP, `Chrome/151.0.7922.137`, viewports 1280×900 and 390×844.

---

## The five lines

1. **Hash.** `NFL Draft Simulator merged.html` = `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B, at `merge/v20-donor @ ff8c05ae0ef8`. Independently reproduced from the two parent builds: `node tools/build-merged.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html" /tmp/moc-merged-repro.html` → 6,554 lines, 657,486 B, sha256 `40233d6b…` — **byte-identical to the committed candidate** (`cmp` → no difference).
2. **E2E driven.** Yes — `node _agents/minimax/tools/post-merge-smoke.mjs "NFL Draft Simulator merged.html"` → **exit 0, verdict PASS**, checks A/B/C/D all true. Negative control: the same command on v20 `31b7d61f…` → **exit 1, verdict FAIL** (A false, B false, C false, D true). A gate that cannot fail is not a gate; this one failed on the known-bad build.
3. **Numbers re-measured (command + sample size).** Candidate: draft **832/832** picks; season **272** games; playoffs complete, champion **Houston Texans**; 100-season report rendered (`reportPath: ui-button`, `reportStalled: false`); **0** viewport offenders; **0** page errors; `documentScrollWidth` **390** = viewport width. v20 control: 832/832 picks, 272 games, champion Green Bay Packers, report **stalled** (`rWeights is not defined` at v20:6018), **7,208** overflowing elements, **1** page error. Function diff: `node _agents/ds/tools/funcdiff-full.js <v20> <donor>` → A 409 / B 412 named functions, **common 408 | identical 390 | differing 18**, A-only 1 (`updateStepper`), B-only 4 (`goSeason`, `meetingInfo`, `meetingTagText`, `seasonToast`).
4. **Console / 390 px.** Console: **0** uncaught page errors on the candidate; 1 on v20 (the `rWeights` ReferenceError). 390 px: **0** offending elements after a 390 → 1280 → 390 sequence (element-level check, not a naive scroll-width check — v20's `documentScrollWidth` is also 390, which is exactly why the naive check would false-pass).
5. **Deliberately not checked.** (a) **No seeded RNG** — the build has 58 `Math.random()` sites, so this run is **not reproducible by seed** and a second run can legitimately differ in champion/schedule; (b) **no real-browser visual pass** — headless only, no human look at light/dark rendering (the Owner's visual pass is still required); (c) **not** the 100-season win-correlation regression (`pw4.js`, target r > 0.6) — that harness does not exist yet; (d) **not** the protected-function hash gate (`tests/math-baseline.json`) — the candidate's protected functions are pinned by `tools/build-merged.js`'s donor-take list, which I did not re-derive independently; (e) **not** the accessibility, performance or persistence concerns; (f) the champion differs from MiniMax's M-80 receipt (**Houston Texans** here vs **New England Patriots** there) — expected, given (a).

## Receipts

| file | what |
|---|---|
| `_agents/moc/evidence/gate-merged-candidate.json` | candidate run — exit 0, PASS, A/B/C/D true |
| `_agents/moc/evidence/gate-v20-negative-control.json` | v20 negative control — exit 1, FAIL |
| `_agents/moc/evidence/forensics-receipts.txt` | the loss-event receipts (separate note) |

## Verdict

**The merged candidate `40233d6b…` passes the council's E2E gate with a negative control, and it is reproducible byte-for-byte from the two parent builds.** In my judgment the two pending promotion steps — the `verified-merge-<hash>` tag and the canonical `STATUS.md` hash line — are unblocked by this report. I have **not** taken either step: the tag and the `STATUS.md` line are the Owner's/Architect's call, and `STATUS.md` is R5-gated to an Owner-assigned session.

**Note for the record.** This report verifies the *candidate*, not the *decision behind it* — the surface-branch question MiniMax raised (v20 markup 11/4/2 vs 12/3/2 vs the donor's Season surface) is still open, and the candidate I drove is the one built from GPT's `tools/build-merged.js` oracle. A green gate on the oracle's own output cannot tell the Architect which branch is right; it can only tell them the artifact they already have is not broken.
