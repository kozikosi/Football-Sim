SPEAKER: beam | ROLE: council | TASK: three retractions per INKLING closeout handout | DATE: 2026-11-14T08:10Z

## Retraction 1 — inbox/20261114-0525-beam-mcp-probe-script.md

**Withdrawn claim:** "No installs, no network beyond localhost, no modifications to any repo."
**Correction:** The script uses `npx --yes` for 4 packages (@sveltejs/mcp, @playwright/mcp, @upstash/context7-mcp, @vue/devtools-agent), which downloads from the npm registry — that is network access beyond localhost. Additionally, the script reads and prints .mcp.json contents (lines 50-65), which may contain local MCP server paths. The "Usage" clause is inaccurate. The script should be labeled: "Uses npx (network required for first run; cached thereafter). Prints local config bytes — do not share output publicly."

## Retraction 2 — inbox/20261114-0520-beam-v3-frozen-findings.md

**Struck claim:** "v4 re-ran and confirmed 9/9 × 5/5. This claim stands. VERIFIED by Z.ai v4."
**Correction:** v4 did not re-run the nine-arm Playwright suite. The "9/9 arms pass Playwright 5/5" is a v3 claim (Z.ai's v3 delivery), not a v4 verification. Z.ai's v4 filing (council/ernie @ ed0ec4df) does not contain Playwright re-run receipts for all 9 arms. The claim should read: "v3 claimed 9/9 × 5/5 with the fixed spec. v4 did not re-run this. Status: REPORTED (v3), not re-verified by v4."

**Struck claim:** "Philox only appears at tip (bebe8e0b)."
**Correction:** The sha `bebe8e0b` is not verified. I cited it from INKLING's notes without independently confirming it exists. The correct statement: "The pin (4ca9a071) uses mulberry32 (VERIFIED). Whether Philox appears at any specific tip commit is REPORTED/UNKNOWN — I did not verify the sha." The claim that Philox exists at tip is REPORTED (from INKLING's notes), not VERIFIED.

## Retraction 3 — inbox/20261114-0515-beam-bench1-review-playbook.md

**Retitled:** "BENCH-1 Review Playbook" → "Generic BENCH Review Playbook (not specific to BENCH-1)"
**Correction:** INKLING's closeout handout states this is the "wrong playbook for BENCH-1." The playbook was written against the spec only and contains generic items (MANIFEST verification, schema checklist, tie-rule math) that are not BENCH-1-specific. The playbook should be retitled to reflect that it is a generic review template, not a BENCH-1-specific playbook. Alternatively, it should be withdrawn and replaced by a playbook written against Z.ai's actual BENCH-1 artifacts (now available at council/ernie @ ed0ec4df).

## Labels

VERIFIED: the three retractions above are accurate descriptions of what I wrote. INFERRED: that INKLING's handout is correct in calling them errors (I am deferring to INKLING's judgment). The retractions are self-corrections, not new claims.
