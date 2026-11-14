SPEAKER: inkling | ROLE: council · execution | TASK: BENCH-1 ratification audit — INKLING-verified rows, PROPOSAL dispositions | DATE: 2026-11-14 | Audience: KG (Owner) + Architect

# INKLING — BENCH-1 Lane-G packet, row by row, against the package bytes at `37c15d12`

Scope law restated: INKLING presents receipts and proposals; the **ratification signature is the Owner's alone**. Every VERIFIED row below was re-derived this pass from the raw receipts (`receipts/tier1-run{1,2,3}.json`, `receipts/tier2-run1|2.json`, `DESIGN-LOG.md`, `REPORT.md`); nothing is taken from the summary text.

## Row-by-row receipts

| # | Budget (BENCH-1 §4) | Provisional | Measured (re-derived) | Verdict |
|---|---|---|---|---|
| W1 | pool parse+freeze | ≤ 250 ms | 9.2–9.7 ms ×3 (W1.parseMs) | **ratify as-is (≈26× headroom)** |
| ENG-1 | D-32R full draft | ≤ 10 s | 792–873 ms ×10 cells-ish (cells list 792–873; worst cell 873) | **ratify as-is (≈11.5× headroom)** |
| SAVE-1 | record ≤ 250 KB | 250 KB | 187,078 B (75% of budget) STABLE across runs | **ratify as-is** |
| ENG-2 | season ≤ 10 s | ≤ 10 s | 335–350 ms ×3 | **ratify as-is (≈29× headroom)** |
| ENG-3 | one game p95 ≤ 20 ms | ≤ 20 ms | 0.058–0.090 ms p95 | **ratify as-is (>>100× headroom)** |
| UX-1 | PICK→paint p50 ≤ 100 ms / p95 ≤ 250 ms, every round 1–32 | p50/p95 | Live curve (run 2, seed 1): both arms p50 ≈ 145.4 ms, p95 ≈ 2,194 ms, max 2,329 ms; **11 of 32 user picks >1 s in both arms**; run 1 (natural wiring) same pattern with vue max 15.8 s | **provisional budget fails at goneOdds-heavy picks — not ratifiable as drafted; Owner sign-and-re-architect or split the rule (see below)** |
| UX-2 | sort→paint p95 ≤ 50 ms (60 rows) | ≤ 50 ms | `W5-r1-u0`: 1.276–1.321 s across sort-wins/ovr/priority (all three > 1,300 ms — 26–50× over budget); at pick-last cells (r16-u0/r32-u0), 62–63 ms (parity both arms); filters 0.1 ms; `pickMs` 42.8 ms | **same verdict — binary on the replay window; needs the engine answer, not the budget's** |
| Heap | report only | — | heapAfterW1 11.2 MB used; W5 post-draft heapAfterW5 available in run 3 (check `heapAfterW3/W4/W5` if the Owner wants the trajectory) | informational |

**Corroborated extras:** gates 104/104 ×3, hash set identical run-against-run (A1 ← VERIFIED); 284/285 season games regenerate byte-identically from `gameSeed` with `fixtures()`-correct replay, including exact 13-playoff count; synthetic 1,000/1,941/5,000-row sweeps measured (`PSYN-*` cells, 512-pick partial drafts; sizing logic logged in DESIGN-LOG — a 1,000-row pool cannot hold a 1,024-pick draft).

**Not receipted inside the package, standing open (UNKNOWN, not INFERRED):**

1. `receipts/a3.json` — cited by REPORT §5 as VERIFIED Chromium/Node parity; **absent**. A3 = UNKNOWN until a re-vendor produces it.
2. `receipts/*-analysis.json` — cited by REPORT §4/§8; **absent**. The bootstrap-CI/tie-rule application at analysis time is UNKNOWN; the TIE reading for run 2 (r16-u31 sort ratio 1.01, p95 equal) stands only on INKLING's recomputed medians, which are arithmetic facts, not the package's applied rule.
3. Node 22 (A2) — never available in Z.ai's sandbox; INKLING's 3-process A1 covers 3× (not a substitute for the cross-runtime gate).

## PROPOSAL rows (to sign, relax, re-architect, or reject — each initials, each row)

1. W1 — ratify as-is.
2. ENG-1 — ratify as-is.
3. SAVE-1 — ratify as-is.
4. ENG-2 — ratify as-is.
5. ENG-3 — ratify as-is.
6. UX-1 — **do not ratify as drafted**; decide between: (a) relax to "p95 ≤ 250 ms at picks not in the goneOdds-heavy window; budget must be re-drafted once the engine question lands", (b) ratify anyway and accept budget-false by design, or (c) hold and ratify only after the Architect's replay-cost answer (preferred reading per W5 cells — but the Owner's call, not INKLING's).
7. UX-2 — same structure; resolve only after the UX-1 conversation; the engine's goneOdds design is the binding item.
8. A3 — obtain the receipt from Z.ai (prompt en route) or mark UNKNOWN on the record.

## The binding item, one sentence each

- The provisional UX budgets cannot close until either (i) the Architect re-designs how `selectBoard` behaves under heavy odds replays (candidates discussed in the Architect ask file), or (ii) they are relaxed by the Owner with eyes open.
- `G5 → vmText == domText` held 600/600 ×2 runs — framework is not the constraint; budget semantics are.
- FLEX/protected constants never touched (arms = tip byte-for-byte).

Labels: VERIFIED (every row above re-derived) / REPORTED (author's $preview) / INFERRED (one #2/#3) / UNKNOWN (a3, analysis artifacts, Node 22).

— inkling (INKLING does not rate frameworks; nothing here is a framework signal)
