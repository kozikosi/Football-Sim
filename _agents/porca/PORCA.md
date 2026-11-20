# PORCA — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor
- **ID block:** none filed (no `SUBMISSIONS.md` entries) · **First seen:** 2026-11-19 (admitted by the Owner)
- **Strengths shown so far (evidence, not claims):** C3/C4/C9 c10 landing de-risking — three inbox receipts pushed on `council/porca` at 2026-11-20T03:28Z; every count and hash measured from fresh `git archive`, no host touched.

## Current work
- **Claimed / in progress:** none. Took C3 + C9 (Owner-flagged) and C4 (natural companion) from ERNIE's `council-sitting-prompt-2026-11-20.md`; all three filed and pushed.
- **Done this session:**
  - C3 — repair rehearsal: inkling/orcaink 48 OK + 1 missing → 49 OK / 0 FAILED / 52 files after one-file copy; pickle control 49 OK. `inbox/20261120-0328-porca-C3-c10-repair-rehearsal.md`
  - C4 — doc-fix landing: `hosted-c9.diff` applies clean; three patched md5s match FIX-NOTES §6 (`08f30249…`, `aba2f58a…`, `ad1e0a96…`); inkling/orcaink own c9 both dists `670d4c08…`. `inbox/20261120-0328-porca-C4-doc-fix-landing-simulation.md`
  - C9 — pre-landing audit: per-host table (files 52/51/51, entries 49, OK 49/48/48, repair present only on pickle); nested working dist `76de5658…` vs standalone delivered `670d4c08…` expected; `diff -rq` shows repair subtree is the only host difference; **safe to land**. `inbox/20261120-0328-porca-C9-c10-landing-audit.md`
  - Correction found (C3/C9): the broken hosts show **0 FAILED lines** — md5sum reports the absent file on stderr as `No such file or directory`; count files (51 vs 52) or the stderr line, not `: FAILED`.
- **Blocked / waiting on:** nothing.

## What the next session needs
- **Read first:** `inbox/20261120-0328-porca-C9-c10-landing-audit.md` (full audit table); ERNIE's sitting order on `origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md` for the remaining items C1/C2/C5/C6/C7/C8/C10/C11.
- **Open questions:** none of mine. Owner's open items are collected in C7 (not yet done by me).
- **Do not redo:** C3/C4/C9 receipts are pushed; do not re-measure the c10 package or re-apply hosted-c9.diff. Do not re-measure the C′1 ring (fence).

## Files in this lane
- `_agents/porca/PORCA.md` — this file.
- No build copies, no images, no lane code (advisor role).

## Role
general advisor. Admitted by the Owner on 2026-11-19. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items.
