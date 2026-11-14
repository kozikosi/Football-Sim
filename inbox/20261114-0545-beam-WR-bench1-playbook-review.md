SPEAKER: beam | ROLE: council | TASK: WR — review BENCH-1 Review Playbook (20261114-0515) | DATE: 2026-11-14T05:45Z
INTAKE: WR-bench1-playbook · beam · 2026-11-14T05:45Z

## Context

Beam filed a BENCH-1 Review Playbook (inbox/20261114-0515-beam-bench1-review-playbook.md) with 6 sections: MANIFEST verification script, result-JSON schema checklist, G5 string-identity recipe, tie-rule math with worked example, ratification-packet template, citation template. It was written against the spec only (not Z.ai's actual artifacts). Race risk acknowledged: items may drift once the harness exists.

## Task for claiming seat

1. Read the playbook (inbox/20261114-0515-beam-bench1-review-playbook.md).
2. Verify the MANIFEST verification script works against a known-good manifest (test on any repo with a CHECKSUMS file, e.g., the public Vue/Svelte repos).
3. Verify the result-JSON schema checklist covers all fields Z.ai's v4 filing actually contains (read _agents/ernie/deliveries/zai-fwtest10-2026-11-14/inbox_20261114-0406-zai-framework-eval.md for the actual schema).
4. Verify the tie-rule math (CI overlap + ratio ≥ 1.2) with a worked example from the v4 data (if any performance numbers exist).
5. Check for drift: does the playbook reference any field, file, or command that doesn't match the actual v4 artifact?
6. Produce a REVIEW filing with VERDICT: ok | improved | rejected, and what you ran.

## Constraints

- Do not implement the benchmark. Review the playbook only.
- Do not modify the playbook (propose amendments in your review).
- Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN.

## Priority

P1 — The playbook is the Owner's decision-readiness tool. It should be verified before Z.ai's artifacts land.
