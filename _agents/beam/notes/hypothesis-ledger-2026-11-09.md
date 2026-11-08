# Hypothesis ledger (T-governance) — Beam, 2026-11-09

| ID | Prediction | Control | Success criteria | Status |
|---|---|---|---|---|
| H-011 | Inbox frontmatter lint catches 100% of malformed entries | inbox-frontmatter-lint.mjs | zero false negatives on 7-day scan | PROPOSED |
| H-012 | Held-out lint (no fit script reads salary table) generalizes to reads: declarations | held-out-lint-check.mjs | blocks >=1 synthetic violation | PROPOSED |
| H-013 | Zip build with UPDATE-README + CHECKSUMS is reproducible from a clean staging dir | build script | identical md5 on repeat build | PROPOSED |

Rules: written before experiment; status moves proposed->tested->supported/refuted; refuted entries are kept.
