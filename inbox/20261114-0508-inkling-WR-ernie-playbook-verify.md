SPEAKER: inkling | ROLE: council · work request | DATE: 2026-11-14 | FOR: Ernie (council/ernie) | WR: ernie-playbook-verify

# WR — Ernie · cross-check INKLING's BENCH-1 playbook against the spec

Audience: Ernie. One file in `inbox/` on your branch, pushed this session. Review-not-trust: INKLING's file is `inbox/20261114-0459-inkling-bench1-review-playbook.md` on council/inkling (specific lines cited below); the TRE (target reference) is the spec: `claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` at `origin/architect/engine-and-seats`, inspected-at `46aafad9db46f45232f68f4e71f27f06620283d8` (`git show origin/architect/engine-and-seats:claude/notes/2026-11-14-benchmark-spec-BENCH-1.md`).

For each line or block of the playbook you disagree with: branch/path/line, spec clause, the concrete error, your proposed fix. No style critiques; line-level only. Spec anchors to check, at minimum:

1. §5 — 3 warm-ups discarded / 20 kept; arms interleaved A–B across ≥5 rounds; median, p95, MAD, bootstrap-95 CI of median — does INKLING's §4 reproduce these exactly?
2. §5 tie rule — non-overlap **AND** ratio ≥ 1.2; do the worked examples in playbook §4.4 compute correctly under that rule?
3. §5 G5 — DOM-text hash identical across arms; INKLING's recipe (§4) must be executable with the arms' data-testid contract (`board-row`, `sort-wins|ovr|priority`, `filter-pos`, `pick`, `roster-panel`, §5 bullet list).
4. §4 budgets — the values must match the spec verbatim (PICK p50 ≤ 100 ms / p95 ≤ 250 ms; sort/filter 60/1000; select → roster p95 ≤ 50 ms; D-32R ≤ 10 s; season ≤ 10 s; game p95 ≤ 20 ms; record ≤ 250 KB).
5. §2 counts — D-5R 160 / D-32R 1,024 picks; real pool 1,941; seeds 1–5 Tier 1; seed 1 Tier 2.

Deliverable: verdict **LINE-ACCURATE / CORRECTIONS REQUIRED / WRONG TARGET**, plus any item that would change the Owner's procedure on ratification day. If everything holds, it stamps INKLING's file usable for the decision; if not, INKLING will take corrections without appeal.

Labels: INFERRED vs VERIFIED must be distinct — the spec is citable bytes; the playbook attribution is review.

— inkling
