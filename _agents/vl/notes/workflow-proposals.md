# VL — workflow proposals for multi-agent contribution without blocking the Architect

**Date:** 20 Oct 2026 · **Session:** VL · **Status:** advisory proposal, ready for Architect review.
**Principle:** cheap to add, cheap to maintain beats elaborate. No new permanent shared documents.

## Context

`QUESTIONS-FOR-THE-ARCHITECT.md` already holds 50+ questions across GLM, DS, Nemo Super, Nemo Ultra, Pickle, Cohere/Beam, LK, MiniMax, and now VL (Q-VL-1…7). DS counted 11 `[BLOCKING]` among the earlier set — most are not actually blocking anything. `SUBMISSIONS.md` is ~102 KB and growing. The Architect's reading cost is the binding constraint; every proposal should aim to cut it, not add to it.

## Proposals

### P1 — Merge checklist (one file, append-only, ≤ 60 lines)

One shared file with three columns: `finding · evidence · status`. Advisors append rows; the Architect ticks `done` / `defer` / `reject`. Cheaper than re-reading 50+ questions and 12 pending proposals per round. Lives in `_agents/vl/` pending Architect approval of the format.

### P2 — One-line finding format

Every advisory finding uses exactly this shape:

```
build hash · file:line · repro command · observed vs expected
```

The Architect can paste those lines straight into the merge checklist without re-deriving anything. This is the single change that most cuts his reading cost.

### P3 — No new shared documents

Everything an advisor produces lives in that session's `_agents/<name>/` folder. The only shared surface an advisor needs is the questions block and one bulletin availability line. No new `.md` files at root level without Owner assignment.

### P4 — Shared dependency-free browser probe

`_agents/kilo/tools/cdp-phone-check.mjs` already exists: Node built-in WebSocket CDP driver, no npm packages, no Playwright, no installs (council rule). Every session reuses it instead of writing its own setup. Exit codes follow `tests/CONTRACT.md` v2 style (0 = clean, 1 = findings, 4 = usage error).

### P5 — Tag discipline

A `[BLOCKING]` question must name the decision it unblocks in one clause; otherwise it is `[NOW]`. DS counted 11 `[BLOCKING]` among 52 questions — most block nothing. This tag is for the Architect's triage, not for emphasis.

### P6 — Optional pre-review stage (Q-VL-7)

Advisors review each other's `SUBMISSIONS.md` entries before they reach Claude. Only if the Architect wants it; shape TBD by him (one checklist file? a §8-style verdict block per entry?).

## What these do NOT do

- They do not create new shared documents at root level.
- They do not change `AGENTS.md`, `STATUS.md`, `COLLECTIVE-PROMPT.md`, `ONBOARDING.md`, or `QUESTIONS-FOR-THE-ARCHITECT.md` beyond my own questions block.
- They do not touch the product file or any other session's `_agents/` folder.
- They do not propose changes to `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, or `RATING_SPECS` (protected constants).

## Attribution

This proposal lives in `_agents/vl/` only. Attribution lives in git commits and `_agents/` folders — never in filenames (AGENTS.md §Ownership & Write Protocol 6).
