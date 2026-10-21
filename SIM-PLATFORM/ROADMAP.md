# ROADMAP.md — the sequence, and what can start today

**MiniMax (S-1900–1999) · 20 Oct 2026 · advisory · the Owner's priorities 1–5 in order.** Two lanes run
in parallel: the **product lane** (the V21 merge, then the platform refactors) and the **data lane**
(the pools). The data lane is the long pole, so it starts first — but nothing in it can finish before
the Owner's concept answers land.

---

## The shape

```
        ┌─ now ──────────────────────────────────────────────────────────────┐
        │  V21 merge (Architect)      │  Owner answers (question channel)     │
        └───────┬─────────────────────┴──────────────┬───────────────────────┘
                │                                    │
     stage 1    ▼                                    ▼
        dataset indirection in the single file   NFL all-time pool (1,200)
        (active dataset switch + mode toggle)    rated by the group
                │                                    │
                └──────────────┬─────────────────────┘
                               ▼
                          stage 2
                    engine extraction + profiles
                    (hash-gated; NFL becomes pack #1)
                               │
                               ▼
                          stage 3        NBA current (new profile + new matchup model)
                               │
                               ▼
                          stage 4        NBA all-time → MLB → NHL → the football leagues
                               │
                               ▼
                          stage 5        the portal: one page, every sim
```

## Stage by stage

| stage | scope | exit criteria | who |
|---|---|---|---|
| **0 · V21** | the donor's fixes merged into v20 | the four gates green on the merged build; the `verified-merge-*` tag exists; the promotion preconditions satisfied | Architect + verifier |
| **1 · dataset indirection** | inside the single file: named datasets + an active-pool switch + a mode toggle | the football sim still passes the gates with `current` selected; the all-time pool loads and drafts; the 14 protected symbols byte-identical | Architect (from an accepted proposal); data lane supplies the pool |
| **2 · engine + profiles** | `engine/` extracted; `packs/nfl-current` + `packs/nfl-all-time` | a diff of two built packs shows **only** profile values and data; the protected symbols are byte-identical before and after; the single-file output is preserved | Architect |
| **3 · NBA current** | the NBA profile + the NBA matchup model + the NBA data | the NBA pack passes the four gates; its matchup model has its own calibration receipt | profile lane + model lane + data lane + Architect |
| **4 · NBA all-time, then the rest** | one pack per (sport × era × league-set) | same gate, per pack | by claim, per the board |
| **5 · the portal** | a landing page listing every sim | every sim opens from the index | Architect |

## What can start today, without waiting for anything

* **The rubric and the calibration set** (`DATASET.md` §3) — this is the highest-leverage artefact in
  the whole expansion, because it unblocks 1,200 ratings and it must exist before any rating starts.
* **A calibration run** — any seat can rate the 30-player calibration set and produce their own
  offset/spread report. It is practice, it is useful, and it makes the rater calibrated by the time
  the real pool opens.
* **The NBA2K mapping draft** — the Owner can transmit ratings while the mapping is written; the
  converter and the validation are pure work.
* **The engine seam study** — `SURFACES.md` already maps the football sim's surfaces; a seat can
  extend it to a seam proposal for the Architect (what moves into `engine/`, what stays in the pack)
  with function hashes, without touching the product.
* **Reviewing this platform's documents** — the fastest way to find a hole in the plan is to attack
  it, and the plan is not load-bearing yet.

## What is blocked, and on whom

| blocked | waiting for | who |
|---|---|---|
| the all-time NFL pool's ratings | the Owner's answers on the −5 rule and the era-mode questions | the Owner |
| the NBA profile | the Owner's answers on flex, the draft shape, and the era mode | the Owner |
| stage 1 in the build | stage 0 (V21) merged and verified | the Architect |
| any pack's assembly | the Architect's implementation | the Architect |
| the portal | the first two packs | — |

## The rules of the road for the sequence

1. **Priority 1 is a constraint.** No expansion work may delay or destabilise the V21 merge. If the
   two compete for the Architect, the merge wins — it is the reference everything else inherits.
2. **No stage starts before its predecessor's exit criteria are met.** The stages are cheap in this
   order precisely because each one's output is the next one's input.
3. **The data lane is long, so it starts first** — but the rubric, not the ratings, is what unblocks
   the rest.
4. **Every stage ends with a receipt and a green gate.** "It works" is not a stage exit.

## The realistic picture (and why this order is the honest one)

Eight sims is not eight times the work of one sim. It is **one engine** plus **eight profiles** plus
**eight pools**, and the profiles are cheap once the engine is factored; the pools are expensive
once, and reusable as a method. The order above front-loads the expensive, reusable part (the
method), the cheap reusable part (the seam) and the risky part (the new model) in an order where a
failure at any step costs one stage rather than the whole programme.
