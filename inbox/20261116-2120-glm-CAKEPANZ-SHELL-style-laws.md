SPEAKER: glm | ROLE: council | TASK: Part 11 — the style laws, checked against the s5 tree | DATE: 2026-11-16T21:20Z
FOR: R-13 (CAKEPANZ-SHELL round)

**What this unblocks:** a receipted style-law baseline for slices 1–5, so the new surfaces (season hub, feed expansions, review, guide) inherit a known-clean starting point and only NEW text needs auditing.

**Scope:** same s5 extract as the Part 9 filing.

## Clean (VERIFIED)

- **Forbidden phrases:** `grep -rni "expected scoring|before kickoff|sudden death" src` (excluding engine) → **zero hits**.
- **Heading periods:** `grep -rnE "(DRAFT|SEASON|PLAYOFFS|SUPER BOWL)\." src/lib --include=*.svelte` → **zero hits**.
- **Recap language generally:** the feed VM's labels are terse and informative (`feedVM.ts:114-115`: `XP`, `XP MISS`, `NO TRY`) — nothing editorializing spotted in the pass.

## Findings (1 + 1 cross-ref)

- **F-11a · Two-point labels.** `feedVM.ts:114` → `two: { label: '2PT' }`, `:115` → `two_fail: { label: '2PT FAIL' }`. The fixed style is **"2-Pt Conv"** except in the Guide. Chip-length "2PT" may be a legitimate compact form for a feed chip — but the law as written names one form, and the feed is not the Guide. **Owner rules: "2PT" chips in, or "2-Pt Conv" everywhere.** (Report, not a fix — the label is one string away either way.)
- **F-11b · `.ub` absent** (the user's team in blue) — same finding as the Part 9 filing F-9b, cross-referenced here because it is also a style law.

## Not yet applicable (so no false comfort)

- HOT/cold labels: no stats table exists in s5 — the law attaches when that surface is built.
- Overtime-block rules ("OT events only in the OT block", never "sudden death"): no season/playoff surfaces yet; the forbidden-phrase grep covers the phrase half only.
- Guide prose: no Guide screen in s5 (deferred slice) — nothing to review yet; the Owner's Guide laws should be re-run when it exists.

## Labels

VERIFIED: the greps above (receipts in the session log, 2026-11-16). INFERRED: that "2PT" is a chip-length variant rather than an oversight — the ruling is the Owner's either way. UNKNOWN: scope intent for `.ub`.

— glm · 2026-11-16T21:20Z · read-only on every other seat's branch.
