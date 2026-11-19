SPEAKER: beam | TASK: record the handoff process to Z.ai for the council | DATE: 2026-11-19T03:45Z

## The handoff (agreed this sitting)

The Architect (Claude) owns the Colors engine; Z.ai owns the cakepanz UI track. The question was how much of the Architect's verification and ops work Z.ai can absorb. The Architect's answers (full: claude/absorb-work-answer-2026-11-19.md; short version in the Architect's sitting report):

### Tiers

- Tier 1 — pure shell ops: receipts, battery/gate/fresh-clone re-runs, manifest/checksum regeneration, hosts, re-zips. Z.ai takes ALL of it.
- Tier 2 — exact patches under the Architect's diff review: P-317 store wiring; the go()/router fork if ruled; simpleRows if ruled in; cite-check.mjs from a spec; gold2/text display split once contrast is ruled; colors/ snapshot re-pin verification. Z.ai takes these, but the Architect reviews every diff.
- Tier 3 — build-under-spec from written briefs: named Colors v1 surfaces; Z.ai builds, seats verify, the Architect reads the diff. Never direct pushes to the Architect's branch.
- Tier 4 — never (engine semantics, λ, protected constants/re-pins, the unrelated-histories merge, final acceptance, every Owner-gated call). Stays with the Architect.

### Rules that gate the handoff

1. The Architect fences by interface, not by task type. Z.ai owns the UI against a frozen view-model contract that the Architect publishes. The cost: the view-model API must be frozen first. P-317 is the cautionary example — it was labelled "small store wiring" but reached the save format (persistence). Risk follows file paths, not labels.
2. Engine and save paths are fenced with a check: any change touching them requires the Architect's review, regardless of tier.
3. Z.ai never pushes to architect/engine-and-seats. All Tier 2/3 work arrives as inbox snippets or as a separate branch the Architect pulls and reviews.
4. The Architect's capacity is ~3 short engine sittings per week (UNKNOWN, guessed). The Architect will stop running the full suite after tiny edits and hand-writing report tables — that is where the savings live.

### What Z.ai takes this week / next two / never

- This week: per-commit fresh-clone receipts; manifest regeneration; re-runs of items 5 and 6; the numerals-gate fix on prepared (CP_PIN=65673a00).
- Next two weeks: Tier 2 patches under diff review; Tier 3 surfaces once the view-model contract is frozen and the framework question is settled or the work is framework-neutral.
- Never: engine semantics, λ, protected constants/re-pins, the unrelated-histories merge, final acceptance, Owner-gated calls.

### What the seats can prepare to save the Architect's time

- Receipts and re-runs (Tier 1) so the Architect reads results, not raw output.
- The cite-check prototest (every sha and count in VERIFY.txt §22 resolves to a receipt or is flagged).
- The ties/OT census (done — Inkling filed it; Architect carries the tie rate forward, no tuning).
- Fresh-extract manifest tie-break (shipped 314 vs prepared 319).

### Standing constraint

CI green = build gate + pin-watch self-test only. Tests and tsc are report-only, never build evidence. The flex table and the pin stay frozen. λ is dynamic, measurement-only. GLM default stays 0 until it measures. 76 Pancakes ships as ONE cutover; w89 stays live until then.
