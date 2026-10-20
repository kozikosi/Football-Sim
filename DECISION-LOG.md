# DECISION-LOG.md — searchable index of Architect decisions

**Purpose.** One place where every ruling Claude (the Architect) has made is recorded, so no agent re-asks an answered question. Companions: `QUESTIONS-FOR-THE-ARCHITECT.md` (the question pack), `COUNCIL-BULLETIN.md` (discussion), `CHRONICLE.md` (facts/events).

**How to use.** Append a row when Claude answers a question or makes a ruling. Columns: Date | Question ID | Decision | One-line reason | Build hash when applied. Separate from CHRONICLE (which is facts/events) — this is Architect decisions only.

**Status:** Seed entries from council records (M-19…M-57). Full transcription pending Owner pasting Claude's answers into QUESTIONS-FOR-THE-ARCHITECT.md ANSWERS section.

---

## Decisions

| Date | Question ID | Decision | One-line reason | Build hash |
|------|-------------|----------|-----------------|------------|
| 19 Oct | R1 | Internal project, deployment out of scope | Owner ruling | — |
| 19 Oct | R2 | v20 = reference build; donor = merge donor | Owner ruling | 31b7d61f… |
| 19 Oct | R3 | Claude holds technical authority; no outvoting | Owner ruling | — |
| 19 Oct | R4 | No rank/deputy; assignments rotate | Owner ruling | — |
| 19 Oct | R5 | No editing another agent's files without Owner permission | Owner ruling | — |
| 20 Oct | D-a | Keep donor's `cpuPick` (94b878605b73 vs v20 3dc9d12f500a) | Donor has credible-GM round floors; v20 has seen>16 skips + 92-deep misses | 31b7d61f… |
| 20 Oct | D-b | Wrapper: relocate 372 B base style, delete 173 B duplicate markup | v20 is double-wrapped; 546 B figure counts base style as duplication | 31b7d61f… |
| 20 Oct | D-c | Donor `render100` drop-in (cc1016eacc78) | v20 uses undeclared `rWeights`; donor removes the crash | 31b7d61f… |
| 20 Oct | Color-scheme | `light dark` (donor's) | App is dark-default; `light` forces light native controls on dark page | 31b7d61f… |
| 20 Oct | #glue | Variant A recommended (nostack guard) | Preserves #draftTable2 pre-set labels; DS recommends A, Pickle baseline B | 31b7d61f… |
| 20 Oct | Persistence | Out of scope for merge | Absent from both builds; post-merge work | — |
| 20 Oct | Transport | MCP push to kozikosi/Football-Sim (provisional) | Claude's provisional answer; council proposes branch → verifier → main | — |
| 20 Oct | House rules v2 | Adopted (rules 3, 4, 6, 8, 7, 11, R-f) | Owner directive M-26 | — |
| 20 Oct | Rule 12 | Disavowed by Owner (M-38) | Superseded by rule 13 (direct collaboration) | — |
| 20 Oct | Rule 13 | Direct collaboration is live | Owner ruling M-38 | — |

---

## How to add a row

When Claude answers a question or makes a ruling, append a row with: the date, the question ID (from QUESTIONS-FOR-THE-ARCHITECT.md or a ruling reference), the decision, a one-line reason, and the build hash when the decision is applied. Do not edit existing rows — append corrections as new rows citing the original.

## House rules that apply

English only (rule 7). Append, never rewrite (rule 2). Facts need receipts (rule 11). Counts name units (rule 10).
