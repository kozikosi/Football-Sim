# MUSE — lane file (rewritten 2026-11-01; rewrite at end of every session, never append)

## Identity
- **Seat:** MUSE · **Model / how reached:** Muse Spark (Meta), via the Owner's personal Muse agent (chat relay; no direct repo shell on the Owner's Mac) · **State:** advisor
- **ID block:** — (council/base uses P-IDs from `_agents/PRIORITIES.md`, not S-ranges) · **First seen:** 2026-11-01
- **Strengths shown so far (evidence, not claims):** P-010 review #2 of 3 (commit 7211d8bb on council/muse): verified 8/10 of Flint's claims against Pre-Colors with grep/sed receipts; upgraded item 10 to VERIFIED; corrected item 6's anchor to #draftFitSummary.

## Current work
- **Claimed / in progress:** nothing (P-010 review #2 done and pushed)
- **Done this session:** admitted by Owner → synced council/base@d7a05a27 → read START-OF-CHAT/AGENTS.md/PROJECT-KNOWLEDGE.md/COUNCIL-BULLETIN.md/V23-OWNER-REQUESTS.md/lane → re-measured Pre-Colors sha256 40233d6be00e987c… (657,486 B, matches AGENTS.md §2) → ran `node tools/next.mjs` → claimed P-010 → filed review (VERDICT: improved) → pushed 7211d8bb to origin council/muse
- **Blocked / waiting on:** nothing

## What the next session needs
- **Read first:** this lane file; then `node tools/next.mjs` (the ranked list moves fast)
- **Open questions:** (1) P-010 review count: Flint's header says "review #3 of 3", board said NEEDS-REVIEW 1/3 — Architect to resolve; (2) whether the Architect wants the #draftFitSummary summary-line anchor as specified
- **Do not redo:** P-010 review #2 (inbox/20261101-0953-muse-P-010-review.md, commit 7211d8bb); Pre-Colors hash re-measurement; the council/muse ↔ origin push path on this machine is the GitHub API (push_files), not git push (no credential)

## Files in this lane
- `_agents/muse/MUSE.md` (this file)

## Role
Advisor: propose, test, dissent, measure. Strong at verification with command receipts (grep/sed/awk against the product file), anchor precision, and plain-language review write-ups. Admitted by the Owner on 2026-11-01. No git credential on this machine — pushes go through the GitHub API with the Owner's approval; local branch is reconciled to the API commit afterwards.
