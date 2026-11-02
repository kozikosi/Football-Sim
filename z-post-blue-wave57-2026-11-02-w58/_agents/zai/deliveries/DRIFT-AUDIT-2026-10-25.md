# DRIFT AUDIT — first live report (25 Oct 2026)

**Tool:** `_agents/zai/tools/drift-audit.sh` v0.2 (proposed addition to the council's harness — read-only, POSIX sh, no dependencies)
**Runner:** Z.ai, seat S-2600–2699 · checkout HEAD `d1a7f62` on `main` · clock note: the audit host reports UTC, so "today" prints as 24 Oct while the Owner's local date is 25 Oct.

## G17 injected-defect proof (a gate that cannot fail is not a gate)

A fixture with deliberately injected defects was built at `_agents/zai/evidence/drift-audit-fixture/` (duplicate M-id, duplicate section header, one S-range claimed by two seats, stale availability lines, a ghost `tests/` reference, a wrong reference-build pin, two byte-identical builds). Full output: `_agents/zai/evidence/drift-audit-fixture-output.txt`.

```
FIXTURE-EXIT=1 — RESULT: 7 finding group(s)   (all injectable checks fired: A1 A2 A3 A4 A5 A6 A7 A8)
```

## Live run — real tree

Full output: `_agents/zai/evidence/drift-audit-2026-10-25-output.txt`. Exit 1. Findings:

| Check | Result | Detail | Severity for the council |
|---|---|---|---|
| A1 M-id duplicates | FINDING | **117 duplicated groups among 498 message headers** (MOC measured 11 on 20 Oct — grown 10× in 5 days) | High — `@M-24`-style citations no longer identify one message |
| A2 duplicate Q-block headers | FINDING | `## Beam's questions` appears **twice** in `QUESTIONS-FOR-THE-ARCHITECT.md` with identical Q-BEAM-1…5 (F3 drift) | Medium — duplicated reading cost; harmless but should collapse |
| A3 contested S-ranges | FINDING | `s-2000: Glyph+VL` — the known 20 Oct collision, resolved by first-logged-wins (Glyph re-blocked to S-2100s); still worth the record | Low — historical, resolved |
| A4 stale joiner prompt | FINDING | ONBOARDING.md says "next free: S-1500s"; chronicle records claims up to **S-2800s** (12 ranges taken since) | High — every cold-landing joiner reads a wrong instruction |
| A5 strip staleness | FINDING | **16 of 21** availability lines carry a date older than today | Medium — house rule 8 makes the line the truth |
| A6 reference pin | OK | STATUS.md's v20 `31b7d61f…` pin matches the file on disk (649,032 B) | — |
| A7 ghost harness files | FINDING | `tests/funcdiff.js`, `tests/run_all.sh` named in AGENTS.md/STATUS.md, absent from `tests/` (G18 discipline holds only if everyone re-checks by hand — this check does it for them) | Medium |
| A8 duplicate build artefacts | FINDING | `NFL Draft Simulator merged.html` (root) ≡ `_agents/pickle/builds/Football-Sim-PreColors.html` (both `40233d6b…`, 657,486 B) — **one artefact, two names** (F3) | High — receipts pin different filenames for the same bytes; this is the Q-ZAI-1 pin-conflict source |
| A9 mirror drift | SKIP | No `Football Sim/` mirror dir in this checkout (Owner-local git infra); root is canonical here | — |

## What was deliberately not checked
- Semantic correctness of chronicle *facts* (only structural drift);
- bulletin *message bodies* (only headers/ids);
- anything in `_reference/`, `_archive/` (frozen);
- the product HTML files' content (read-only hashes only);
- SUBMISSIONS.md / master_task_list.md (not yet parsed — natural v0.3 checks: duplicate S-IDs across submissions, status-column drift).

## Known limitations (stated, per G3)
1. A3 attributes "ID block S-XXXX" claims to seats by positional parsing (bulletin strip marker / chronicle `·`-field 2). Unusual line shapes could mis-attribute; the check counts distinct claimants, so same-seat echoes never fire.
2. A5 compares day-of-month within the current month only; a strip date from a *previous* month always counts stale (safe direction — but a same-month future date would not fire).
3. The audit host's UTC clock may differ from the Owner's local date (visible above); pass `AUDIT_TODAY="DD Mon YYYY"` to pin it.
4. A1 counts the historical collision era too — the 117 groups include the three-way M-9 race the house rules already blessed; the number is a drift *indicator*, not 117 new defects.

## Adoption proposal (Owner's call)
- Run before every shared-doc commit wave (`RESULT: clean` = green), or nightly if the council prefers cadence;
- promoted path: `tools/drift-audit.sh` at root (it is currently a lane tool — one writer: me, until adopted);
- v0.3 candidates: SUBMISSIONS.md status-column audit, ghost-*path* audit for every `file.md` pointer in shared docs, mirror-direction check when `Football Sim/` exists.

— Z.ai, seat S-2600–2699 · receipts: `evidence/drift-audit-2026-10-25-output.txt`, `evidence/drift-audit-fixture-output.txt`

## CORRECTION (25 Oct, later same day) — the A1 headline number was an under-count; tool fixed v0.2 → v0.3

**What changed.** v0.2's A1 extractor (`grep -oE '^\*\*M-[0-9]+'`) truncated date-stamped message ids — `M-20261025-zai` extracted as `M-20261025` — so **distinct same-day messages merged into phantom duplicate groups** (the 73 headers of the `M-20261022-<letter>` family collapsed into one group) while, conversely, two genuinely distinct same-date messages from one seat *created* a phantom group (my own two 25 Oct messages did exactly that, which is what moved the count 117 → 118 and triggered this re-derivation).

**True measurement (v0.3, full-id extraction `M-[0-9]+(-[a-zA-Z0-9]+)*`, 25 Oct after message M-20261025-zai-2):**

```
137 duplicated M-id groups among 500 message headers
```

The "117 duplicated M-id groups among 498 headers" published above and in bulletin M-20261025-zai was therefore an **under-count** — truncation can only merge, never split, so every number v0.2 produced was a floor, not an inflation. The finding's direction (ambiguous `@M-24`-style citations; MOC Q-MOC-3) is unchanged and slightly stronger. Limitation 4's caveat (historical collision era included) still applies to the 137.

**How it was caught.** Exactly one new message was posted between the two runs, yet the header count moved by two and the duplicate-group count by one — occurrence-precise re-derivation per the Q-ZAI-2 strike rule found the bug in *my extraction*, not in the record. Second display/extraction error caught in this lane in two days; the pipeline's re-derivation rule is now 2-for-2 here.

**Fix.** `tools/drift-audit.sh` v0.3, lines 50–51, both copies (lane worktree + shared-tree mirror). Fresh receipt: `evidence/drift-audit-2026-10-25-v03-output.txt`. Prior outputs stand as run (append-only culture); this section is their correction of record.
