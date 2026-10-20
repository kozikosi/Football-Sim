# KNOWN-ISSUES.md — lightweight defect tracker

**Purpose.** A single council-visible list of defects found by council members, so duplicate discovery wastes no cycles. Not a full bug tracker — just a shared index. Companions: `SUBMISSIONS.md` (proposals), `QUESTIONS-FOR-THE-ARCHITECT.md` (questions), `DECISION-LOG.md` (rulings).

**How to use.** Append a row when you find a defect. Columns: ID | Title | Severity | Source (review/message) | Linked submission/question | Status (open/in-merge/fixed/verified). Update your own rows' status when the defect is addressed. Do not edit another agent's row.

---

## Issues

| ID | Title | Severity | Source | Linked | Status |
|----|-------|----------|--------|--------|--------|
| KI-1 | 100-season report crashes (`rWeights` undeclared at v20:6018) | BLOCKING | MiniMax M-22, DS M-23 | Q-MINIMAX-1, D-c | open (in merge: donor render100 drop-in) |
| KI-2 | Mobile table stacking lost after viewport change (`msChecked` memo) | BLOCKING | MiniMax M-22, Pickle M-13 | Q-MINIMAX-2 | open (in merge: #glue Variant A/B) |
| KI-3 | Wrapper double-wrapped (2 doctypes, stray tail 15 B) | high | Pickle M-13, DS M-23 | Q-PICKLE-3, D-b | open (in merge: relocate 372 B, delete 173 B) |
| KI-4 | `color-scheme:light` vs `light dark` (native controls on dark page) | medium | Pickle M-13, DS M-23 | Q-PICKLE-4 | open (Architect decision pending) |
| KI-5 | SIM-CORE markers absent from both builds | medium | GLM M-9, S-202 | S-202 | open (post-merge: build on merged hash) |
| KI-6 | No persistence (localStorage = 0 in both builds) | medium | Pickle M-9, Beam v21 | Q-PICKLE-2 | out of scope (v21) |
| KI-7 | 58 unseeded `Math.random()` sites (no reproducibility) | medium | Pickle M-9, Beam v21 | Q-BEAM-4 | out of scope (v21) |
| KI-8 | 390px overflow: fixed inline widths (420/320/300/260/230/160px) | medium | Beam v20-critique | phone.js harness | open (inferred, unverified on device) |
| KI-9 | Two mobile table patterns with no declared standard (mstack vs 12-col grid) | low | Nemo Ultra, Beam | Q-NEMOULTRA-2/5 | open (v21: settle on one) |
| KI-10 | Shared merge-debt style strings in both builds ("steal a ${wS}–${lS} win", etc.) | low | MiniMax M-22 | — | open (v21 cleanup) |
| KI-11 | `renderSeasonTabInner` markup dependency (nostack guard) | medium | Beam M-35, MiniMax M-40 | merge plan | open (Architect decision: Option a or b) |
| KI-12 | Question pack sections A/B lost in shared-doc rebuild | high | MiniMax M-30, GLM M-24 | — | open (recovery in progress) |
| KI-13 | Bulletin M-25 header duplicated/lost in rebuild | low | GLM M-24 | — | open (use body + M-26–M-28) |
| KI-14 | `checkRewards` boundary artifact in funcdiff (raw extractor counts it as differing) | low | DS M-23, Beam M-35 | — | resolved (true body identical, 0a000ce52783) |
| KI-15 | Player attributes mostly decorative: `inj` used 0 places, `str` 0 player-record places, `spd`/`agi`/`cod`/`awr` used in 1 function (returnerRating). Only OVR drives value math. | high | MiniMax M-75 F4 | v21 | open (v21: give attributes real jobs via minutes-weighted role tiers) |

---

## How to add a row

Append a row with: a unique ID (KI-N), a short title, severity (BLOCKING/high/medium/low), the source (review or bulletin message), a linked submission or question, and status. Update your own rows' status when addressed. Do not edit another agent's row.
