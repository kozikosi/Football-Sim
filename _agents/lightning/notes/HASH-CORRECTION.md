SPEAKER: DS | ROLE: Council reviewer | TASK: Hash correction record | DATE: 2026-10-21

## HASH CORRECTION — `tests/openchamber-e2e.spec.js`

### 1. The Two Hashes and the Date Boundary

| Hash                                                               | Lines | Bytes    | Corresponds to                                                             | Date                                          |
| ------------------------------------------------------------------ | ----- | -------- | -------------------------------------------------------------------------- | --------------------------------------------- |
| `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` | 442   | 17,184 B | `tests/openchamber-e2e.spec.js` **before** BOC's Week 1 locator fix        | Pre-21 Oct 2026 (original / archived version) |
| `6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744` | 459   | 18,173 B | `tests/openchamber-e2e.spec.js` **after** BOC's Week 1 locator fix (M-132) | 21 Oct 2026 (BOC modification)                |

### 2. They Do NOT Contradict Each Other

These are **the same file at two points in time**, not two different files with conflicting hashes.
- The **original hash** `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` identifies the file as it existed **before** BOC's Week 1 locator fix. At this point the file had 442 lines and 17,184 B. It made no assertion about `Week 1 of 17` visibility and had no `week-1-display` step.

- The **modified hash** `6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744` identifies the file **after** BOC's Week 1 locator fix (M-132, 21 Oct). The BOC inserted a new step `week-1-display` immediately after `begin-season` that asserts `page.getByText(/Week 1 of 17/)` is visible and `seasonState.currentWeek === 1`. The file now has 459 lines (the addition plus surrounding context) and 18,173 B.

- **The change**: A single editorial insertion — a new Playwright test step was added. No logic was changed, no coefficients were adjusted, no product code was modified. The `node --check` pass status is preserved in both versions.

- **DS's error**: DS previously wrongly reported the original hash as "an error" or "contradiction" relative to the modified hash, telling the Owner there was a hash conflict where none existed. That error is now in the public record (CHRONICLE.md, COUNCIL-BULLETIN.md, M-109, M-132) and needs this durable note so it stops recurring.

### 3. Current File's Measured Hash (with command + output)

The file currently on disk has the **modified** hash, because the BOC's Week 1 locator fix has been applied.

**Command + output:**

```bash
sha256sum tests/openchamber-e2e.spec.js
6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744  tests/openchamber-e2e.spec.js
```

**Verification:**

```bash
node --check tests/openchamber-e2e.spec.js
# Output: no errors
```

The current file on disk is the **post-fix** version (hash `6a781e71…`). The original version (hash `ee9aaa44…`) is the pre-fix archival version.

### 4. Every Place in the Tree That Cites Either Hash

#### A. Citing the **original hash** `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` (pre-fix, 442 lines)

These references identify the file as it existed before the Week 1 locator fix. They are **not** errors — they describe the archival state.

**In CHRONICLE.md and COUNCIL-BULLETIN.md:**
- `"test-script.spec.js sha256 ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757"` — used to verify byte-identicality between the run copy and the script
- `"Script: tests/openchamber-e2e.spec.js SHA-256 ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757"` — bulletin M-97, M-100, M-108, M-110
- `"the run copy and tests/openchamber-e2e.spec.js are byte-identical at ee9aaa44…"` — CHRONICLE.md M-109
- `"Script used: tests/openchamber-e2e.spec.js, SHA-256 ee9aaa44… (byte-identical to the archived test-script.spec.js)"` — COUNCIL-BULLETIN.md M-97
- `"script sha256 ee9aaa44…"` — verified that run copy and script are byte-identical
- `"hashed the run copy **and** tests/openchamber-e2e.spec.js"` — COUNCIL-BULLETIN.md reconciliation table

**In _agents/ bocal notes:**
- `_agents/boc/notes/week1-locator-fix.md`: "Original hash: ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757 (17,184 B)"
- `_agents/boc/notes/e2e-reconciliation.md`: references the original hash in the superseded-history section

**In _agents/moc notes:**
- `_agents/moc/notes/result.v2.proposed.json`: references the original hash as the script identity
- `_agents/moc/notes/W3-protocol-to-script-matrix.md`: references the script hash
- `_agents/moc/notes/W5-run-reconciliation-index.md`: references the script hash

**In _agents/lightning notes:**
- `_agents/lightning/notes/RUN-B-VERDICT.md`: "Script sha256: ee9aaa44… — VERIFIED (matches test-script.spec.js)"
- `_agents/lightning/notes/ARTIFACT-PROVENANCE.md`: "test-script.spec.js (sha256 ee9aaa44…) — MUST BE COMMITTED"

**In _agents/longcat notes:**
- `_agents/longcat/evidence/week1-locator-verification.json`: "sha256": "6a781e71814ee99b..." (this is the **modified** hash, not the original)

#### B. Citing the **modified hash** `6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744` (post-fix, 459 lines)

These references identify the file as it exists **after** BOC's Week 1 locator fix.

**In COUNCIL-BULLETIN.md (M-132):**
- `"Script hash: shasum -a 256 tests/openchamber-e2e.spec.js → 6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744, exactly BOC's reported value, changed from ee9aaa44…."`
- `"Spec under test: tests/openchamber-e2e.spec.js sha256 6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744 (18,173 B; BOC's modification, untracked)"`

**In _agents/boc notes:**
- `_agents/boc/notes/week1-locator-fix.md`: "Modified hash: 6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744"
- `_agents/boc/notes/week1-locator-fix.md`: Documents the change: insertion of `week-1-display` step after `begin-season`

**In _agents/longcat evidence:**
- `_agents/longcat/evidence/week1-locator-verification.json`: `"sha256": "6a781e71814ee99b678fa8ce8474ff4b470cd61209ff85b21379dbf698ab0744"`, `"bytes": 18173`

**In CHRONICLE.md and COUNCIL-BULLETIN.md (reconciliation):**
- References to the modified hash in the context of the Week 1 locator fix verification

### 4. One-Paragraph Rule for Future Provenance Notes

> **Cite the hash of the file as run, and say when it was taken.** When reporting a script or test‑file sha256, always include (a) the exact hash value, (b) the file path it belongs to, and (c) the date or editorial context of the snapshot (e.g. "original, pre‑fix" or "after BOC Week 1 locator fix (M-132, 21 Oct)"). Never report a hash without its temporal or revision context; the hash identifies the file **at that moment**, not the file in perpetuity. If a file has been modified since the run was recorded, note the modification and recompute the hash for the current version.

### 5. "Do Not Repeat" List — Specific Misreading to Avoid

- ❌ **Do not say** `"the script hash ee9aaa44… is wrong because the current file hash is 6a781e71…"` — they are the same file at different times, not contradicting hashes.
- ❌ **Do not say** `"the run used the wrong script"` when the only difference is a Week 1 locator step insertion — the build, artifact, and E2E results are unchanged.
- ✅ **Do say** `"the script was at hash ee9aaa44… at the time of the original run; it was later modified (M-132) to hash 6a781e71…; both are the same file, and the E2E run tested the version on which it was based."`
- ✅ **Do say** `"the Week 1 locator fix (M-132) added a step but did not change the acceptance rule or the build's behavior"`.

---

## Correction Record

This note was written to stop the recurring claim that the two hashes contradict each other. They do not — they are the same file (`tests/openchamber-e2e.spec.js`) at two points in time: before and after BOC's Week 1 locator fix (M-132, 21 Oct 2026). DS itself wrongly reported the first as an error in the second and informed the Owner; that correction is now documented here so no future reviewer needs to re-learn it.

**Read-only everywhere except `_agents/lightning/`** — this file must not be edited in any other lane or shared document.

---

**SPEAKER: DS | ROLE: Council reviewer | TASK: Hash correction record | DATE: 2026-10-21**
