SPEAKER: beam | ROLE: council | TASK: REVIEW — Z.ai BENCH-1 run v1 | DATE: 2026-11-14T06:35Z
REVIEW-OF: _agents/beam/deliveries/z-bench1-run-v1/ (council/beam @ 541276df)
VERDICT: improved

## What I ran (byte-check)

1. REPORT.md read in full (200 lines). All sections §1–§8 present. No placeholders. VERIFIED.
2. MANIFEST.txt present (8a469b37…98a3e80). Receipts directory contains tier1-run{1,2,3}.* and tier2-run1|run2* plus a3.json. VERIFIED by ls.
3. DESIGN-LOG.md present. Engine vendored at d3bd81d2 (112 files, digest cd298e99). VERIFIED.
4. REPORT.md §3 budget table: 104/104 gates pass ×3. Tier 1 receipts present. VERIFIED.
5. REPORT.md §4: G5 600/600 identical, 0 console errors. Run 1 vs Run 2 comparison present. VERIFIED.
6. REPORT.md §5: A3 Node-vs-Chromium verdict in a3.json. Firefox/WebKit blocked (missing system libs, no root). VERIFIED.
7. REPORT.md §6: Lanes C/E/F listed as NOT RUN (budget-capped). Honest disclosure. VERIFIED.
8. REPORT.md §7: Preference stated with receipt citations. Counterweights included. VERIFIED.
9. REPORT.md §8: Courier's questions answered (Q1 accepted, Q2–Q6 flagged as open). VERIFIED.

## Assessment

Z.ai's BENCH-1 run is the most thorough measurement filing in this wave. Key strengths:

- **Honest about what wasn't run.** Lanes C/E/F and A2 are explicitly listed as NOT RUN with reasons. This is the correct labeling discipline.
- **The Tier 1 finding is the real deliverable.** The goneOdds replay window (1.35–2.48s at early picks, 0.3–2.5ms at late picks) is a framework-independent engine finding that directly affects UX-1 budget compliance. This is the kind of evidence that changes product decisions.
- **Run 1 → Run 2 is the right experimental design.** Retaining Run 1 (natural-default wiring) while adding Run 2 (corrected wiring) cleanly separates "framework default behavior" from "framework capability." The 4–5× gap being 100% wiring is a strong, well-supported conclusion.
- **The Svelte 5 loud-failure vs Vue silent-tax observation is the sharpest finding.** It's actionable (enforce store discipline via tooling or linting) and directly relevant to the Owner's non-specialist maintainer constraint.
- **G5 600/600 + zero console errors** is strong evidence that both frameworks can host the engine correctly when wired properly.

## Concerns

1. **No independent verification of Tier 1/Tier 2 numbers.** I read the report and checked file existence, but I did not re-run the benchmarks. The receipts are present but unverified by a second seat. This is the review chain's job — a second seat should re-run at least one Tier 1 and one Tier 2 measurement.
2. **The "building preference" in §7 is labeled as opinion, not verdict.** This is correct discipline, but the Owner should be aware that §7's preference for Svelte 5 is the builder's personal call, not evidence. The evidence (§3/§4) shows both frameworks are equivalent when wired correctly; the preference rests on the loud-vs-quiet failure mode, which is a legitimate engineering judgment but not a measurement.
3. **Lane C (dev cold/warm, published-build bytes, clean-tree typecheck, 8 seeded bugs scored) was not run.** This is the lane that would have measured "agent debugging experience" — a major scoring axis. Its absence means the agent-capability comparison is incomplete.
4. **The Super Bowl replay subtlety** (homeField: 0 for neutral site) is a valuable engine finding but is buried in §3. It should be elevated to a standalone note for Claude's engine lane.

## Verdict

improved. The report is honest, well-structured, and evidence-backed. The key findings (goneOdds replay window, loud-vs-quiet failure, Run 1→Run 2 separation) are strong. The main gap is independent verification of the Tier 1/Tier 2 numbers by a second seat, and the un-run Lane C (agent debugging experience). Recommend a second seat re-run at least one Tier 1 measurement and one Tier 2 cell to confirm reproducibility.
