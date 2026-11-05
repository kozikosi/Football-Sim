# The council — how this project is built

Football Sim is built by a small structured council of AI seats under a human Owner.
This exhibit shows how that works, with receipts: every claim below links to a commit,
a file, or a pinned artifact in the repository. It exists because "can you run AI-assisted
development without it becoming slop?" is a real hiring question in 2026 — and the answer
is process, not prompts.

## The seats

| Role | Owns | May not touch |
|---|---|---|
| **Owner** (human) | The directives. His words are the law, taken verbatim into an intake ledger. | — |
| **Architect** | The engine, the contracts (state, actions, save envelope), the product build, `tools/`. | The Owner's rulings; he implements them, never edits them. |
| **Executor** | Waves, verification batteries, measurement and proof scripts, reviews of the Architect's contracts. | Engine math and the product file (ships code as reviewed deliveries, never pushes). |
| **Councillors** (advisors) | Research, statistics, proposals, reviews of everything. | The product, `AGENTS.md`, the queue table; they never assign work to a named seat. |

## The loop

```
Owner directive (verbatim)
      │
      ▼
INTAKE LEDGER ── the Owner's words, item by item, with veto flags for ambiguities
      │
      ▼
LAW ─────────── rulings land as verbatim owner-notes / ADRs (the envelope, the style laws)
      │
      ▼
BUILD ───────── patch generators with asserted replacements; engine work behind contracts
      │
      ▼
PROOF ───────── verify batteries, headless sweeps, pinned hashes; every claim labeled
      │           VERIFIED / REPORTED / INFERRED / UNKNOWN
      ▼
SHIP ────────── a hashed artifact (md5 pinned in BASELINES.md) + a build report
      │
      ▼
AUDIT ───────── a later wave re-checks the claims; overclaims become incidents (see
                incidents.md) and feed new gates — the class of bug, not just the bug
```

## Three laws

1. **The Owner's word is law, verbatim.** Directives are transcribed into an intake ledger
   before any build starts; ambiguities are flagged as veto items, never silently resolved.
2. **Every claim carries a label** — VERIFIED (command + output), REPORTED (witnessed, not
   re-derived), INFERRED (reasoned, unproven), UNKNOWN (nobody knows). "Done" without a
   command and its output does not count.
3. **Every chat ends with a pinned, hashed artifact.** The deliverable is a file with a
   verified md5, recorded in `BASELINES.md` — a work report without a hash is not a report.

## How a decision becomes a build (the decision ledger, with real instances)

The pipeline is always: **Owner ruling → council review → build → proof.** Real examples,
each link live in the archive:

| Owner ruling (verbatim source) | Council review | Build + proof |
|---|---|---|
| Real player names and real teams, non-EA ratings, public default (owner note, 4 Nov) | Executor review F11 flagged the bundled-fictional fallback as contradicting the ruling | Fallback reworked to an empty state + import path; ruling on the open variant still with the Architect |
| Svelte 5 + Vite confirmed for v1 (owner answer, 5 Nov) | Executor ADR-1 (measured 15.05 KB gzip shell) + Architect's ranking agreed | Vite + Svelte 5 verified in-tree, commit `425f72a` |
| Top-30 pickers: 80 % playoffs / 25 % Super Bowl / 10 % title (owner answer, 5 Nov) | Executor calibration methodology (CALIBRATION.md); bands vs measured on one curve | 3,000-season measured curve + tuning ladder (`tools/outcomelab/`) |
| "No migration; dev saves don't matter" (owner decision, 4 Nov) | Muse's briefing flagged the conflict with the earlier "copy verbatim" ruling | `legacy.ts` scheduled for deletion (P-258); no migration code shipped |
| Super Bowl must be PLAYED — "the storm waits for the whistle" (owner law, w52) | Standing battery asserts the sequence | Ported as a law, not code, into the rebuild's regression set |

## Where to read next

- **[seat-protocol.md](seat-protocol.md)** — what each seat owns and how work moves.
- **[how-a-wave-ships.md](how-a-wave-ships.md)** — one wave, end to end, including the audit that caught us overclaiming.
- **[incidents.md](incidents.md)** — the honest register.
- **[timeline.md](timeline.md)** — the compressed history, hash-linked.
- **[metrics.md](metrics.md)** — generated numbers, not hand-written ones.
- **[telemetry.html](telemetry.html)** — how much the review process itself catches, per seat.
