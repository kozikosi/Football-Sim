# DECISIONS.md — the platform decision log

**Append-only.** Every entry states: the decision, who decides it, the evidence it rests on, and
what it changes. A decision that is *proposed* is not a decision; the status column says which it
is. When a decision is reversed, append the reversal — do not edit the original entry.

| id | decision | status | decided by | date | evidence / note |
|---|---|---|---|---|---|
| **D-001** | **The platform shape: one engine, many sport packs; the current NFL sim is pack #1 and keeps shipping untouched.** The migration is staged (stage 1 = dataset indirection inside the existing single file; stage 2 = engine extraction with a hash gate; stage 3+ = new packs; stage 5 = the portal). | **proposed** (MiniMax) — the Architect rules | Architect + Owner | 20 Oct 2026 | `ARCHITECTURE.md` (the six alternatives and why they lose); the four gates already in the football sim are the safety net |
| **D-002** | **The priority order: (1) the current football sim, (2) an all-time football version, (3) an NBA sim, (4) an all-time NBA sim, (5) the other sports.** Priority 1 is a constraint: no expansion work may delay or destabilise the V21 merge. | **in force** (Owner-stated) | Owner | 20 Oct 2026 | `VISION.md` §2 |
| **D-003** | **The data method for council-rated pools: one rubric, a 30-player calibration set per rater, two independent raters per player, the median as the recorded value, a third rater where the spread exceeds 5, and provenance on every record.** | **proposed** (MiniMax) | Owner (the method is a conceptual decision) | 20 Oct 2026 | `DATASET.md` §3; the tools that implement it (`tools/rating-worksheet.mjs`, `tools/validate-dataset.mjs`) |
| **D-004** | **The four gates for every pack: data → static oracle → dynamic gate → the Owner's visual pass.** A pack that has not passed all four is not ready. | **proposed** (MiniMax), extending the existing football gates | Architect | 20 Oct 2026 | the football sim's own gates: `_agents/minimax/tools/candidate-lint.mjs`, `post-merge-smoke.mjs` |
| **D-005** | **The output stays a single self-contained HTML file per simulation.** The source may become multi-file, and a dependency-free plain-Node build assembles the file. The product's promise — "one HTML you can open" — is preserved. | **proposed** (MiniMax) | Architect | 20 Oct 2026 | `ARCHITECTURE.md` §2 rule 3; R1 (no installs, no CDN, $0) |
| **D-006** | **The protected symbols (8 maths functions, 6 constants) stay byte-identical in every pack** until the Owner approves a change. A diff between two packs may show only profile values and data records — never engine code. | **proposed** (MiniMax), extending the existing rule | Owner + Architect | 20 Oct 2026 | `AGENTS.md`'s protected-constant list; the platform's own hash gate, one level up |
| **D-007** | **The all-time pool's composition follows the Owner's "−5" rule**, with the exact semantics answered before any rating begins. | **open** — blocked on `Q-OWNER-13` | Owner | — | `DATASET.md` §2 |
| **D-008** | **The merge surface branch for the football sim** (v20 markup vs the donor's Season surface) — and therefore the shape of the first pack. | **open** — the Architect's call, with three measured branches on the table | Architect | — | bulletin M-66; `_agents/minimax/MERGE-MANIFEST.json` → `measured_branches` |
| **D-009** | **The engine seam** (what moves into `engine/`, what stays in a pack). | **open** — stage 2 | Architect | — | `_agents/minimax/SURFACES.md` is the input |
| **D-010** | **The NBA's unit of value, its flex rules, and its draft shape.** | **open** — the Owner's answers, then the Architect's build | Owner → Architect | — | `Q-OWNER-03`, `Q-OWNER-24`, `Q-OWNER-25` |
| **D-011** | **The NBA's matchup model** (pace, efficiency, 3P%, turnovers, rebounding, rim coverage) and its calibration receipt. | **open** | a council lane, then the Architect | — | `ENGINE-SPEC.md` §2.5 |
| **D-012** | **The NBA2K → record mapping**, its version, and the converter. | **open** — a claimable lane | a council lane | — | `DATASET.md` §4 |
| **D-013** | **The website's shape: an index of single-file sims, or one page with a sport picker.** | **open** | Owner | — | `Q-OWNER-46` |
| **D-014** | **Where the platform lives** (this folder in the existing repo, on a branch) and how it relates to the product's `main`. | **open** | Owner + Architect | — | `ARCHITECTURE.md` §8 |
| **D-015** | **Whether the council may decide platform questions on its own**, or everything structural comes to the Owner. | **open** | Owner | — | `Q-OWNER-49` |

---

## How to use this log

* **Propose** by appending a row with the status `proposed` and your evidence.
* **Ratify** by appending a new row that says the decision is now in force and by whom — or, if the
  Owner prefers, by changing the status of the proposed row (only the Owner or the Architect may do
  that; everyone else appends).
* **Reverse** by appending a row that supersedes the earlier one. History is never rewritten: the
  council's record is the product here, and two reversals in a project are normal, not embarrassing.
* **Every decision names its evidence.** A decision with no receipt is a preference, and it is
  labelled as one.
