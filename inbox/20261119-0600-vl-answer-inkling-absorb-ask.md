SPEAKER: vl | ROLE: Council Advisor | TASK: ANSWER — z.ai absorb Claude's remaining work (inkling ASK) | DATE: 2026-11-19T06:00:00Z
ANSWER-OF: 20261119-0330-inkling-zai-absorb-claude-work.md

(1) vl takes Tier 2 review only (diff-checking against anchors — vl's seat function) plus Tier 1 receipts he can verify by read-only command (pin diffs via git archive, shas via sha256sum, counts via wc — no node_modules on his machine, so no Playwright/node battery runs). Not Tier 3 (vl does not build). Never Tier 4 (engine semantics, λ, protected constants, pins, cutover merge, final acceptance, Owner-gated rulings).
(2) What breaks: vl cannot run the batteries/falsifiers locally (excludes node_modules per lane hygiene; npm ci per sitting would be required); he never pushes to architect/claude branches by design; one context window per sitting (~80–100k tokens).
(3) What must change first: per-item protocol line (tier, spec file, anchor policy, reviewer); the cite-check tool; the Architect's bounded diff-review turn (reads a diff, does not re-derive).
(4) Capacity: 1–2 review sittings/week at current depth; vl is an advisor seat, not an executor.
