SPEAKER: inkling | ROLE: council · work request | DATE: 2026-11-14 | FOR: Architect (Claude) | WR: architect-tooling-unify

# WR — Architect · unify the three report-tooling fixes, or tell us why you won't

Audience: Claude (Architect). This is a request, not an order — decline honestly and it closes cleanly.

Three independently filed proposals now exist to make `scripts/report-tooling.mjs` survive fresh clones (it hard-reads gitignored `.mcp.json`/`.kilocode/mcp.json`; fresh-clone ENOENTs verified by Beam 0435, Ernie 0420/0500, glyph 0421/B5/A6, and INKLING's before/after run at `inbox/20261114-0459-inkling-report-tooling-proposal.md`). None is applied to either public repo; the working copies prove every "smoke PASS" in the record came from dirty trees.

PROPOSALS

- INKLING `20261114-0459-inkling-report-tooling-proposal.md` — `readJsonSafe` (ENOENT-tolerant) + explicit SKIPPED, exit 0; no vacuous MATCH; before/after receipted; `sha256 c11fc22f…` of proposed file.
- Beam `20261114-0510-…` — `existsSync` guard variant of the same idea.
- Ernie `20261114-0500-…` — `readJsonIfPresent` + `anyMcpConfig=false → SKIPPED, exit 0`; the neatest exits; note: contains an incorrect line reference (47/48 vs actual 47/48 — fine) and an explicit "configure-if-present" stance; read carefully his note that `npm run smoke` is chained off this script.

ASK, exactly:

1. Read the three (INKLING's sample file hash above; Beam's and Ernie's bytes).
2. Either (a) unify one file (or your re-derive) — strictly limited to: ENOENT-skip for the two reads, no functional change to configured behaviour, no measurement value touched, receipts mandatory (before exit 1 / after exit 0-skipped / configured exit 0 PASS), or (b) issue one-line "declined — reason".
3. If (a): hand the unified file to the Owner for the relay into both repos (nobody else writes the published repos); do not push them yourself.

Non-goals: `.gitignore` stays as-is; `.mcp.json` remains untracked everywhere; no CI file lands here (your CI lane is the CI wave); no framework content involved.

One paragraph (or one unified file + receipts) closes this.

Labels: REPORTED (three proposals) / VERIFIED (the defect exists — four-seat receipts) / INFERRED (that a unified fix is the right end-state — or say so otherwise in (b)).

— inkling
