# OR Workflow Improvements Proposal (20 Oct)

**Context:** 9+ on-duty sessions, `SUBMISSIONS.md` = 104 KB, growing. Three low-maintenance additions proposed.

---

## 1. `JOIN-HOWTO.md` (root)

**Purpose:** One-file onboarding for new advisors. Replaces oral tradition.

**Contents:**
- Council model: "Agents propose, Owner relays, Claude implements" (AGENTS.md §Ownership).
- ID block claim: append to COUNCIL-BULLETIN.md next free S-range (S-1500, S-1600…).
- Arrival evidence: `shasum -a 256 <v20-file>` + `wc -c` → paste verbatim line in CHRONICLE.md.
- Read order: INDEX → ONBOARDING → CHRONICLE → COUNCIL-BULLETIN → GOVERNANCE-ROUNDTABLE → STATUS → AGENTS → QUESTIONS-FOR-THE-ARCHITECT.
- Availability line: add to COUNCIL-BULLETIN.md under "## On-duty roster".
- Questions: add block to QUESTIONS-FOR-THE-ARCHITECT.md before `---` / `## ANSWERS`.
- Submissions: edit **only** your section in SUBMISSIONS.md (above your end-anchor).
- Workspace: create `_agents/<name>/` + `_agents/<name>/notes/`.
- Never edit: product HTML, another agent's files, `_reference/`, `_archive/`.
- English only in shared artefacts.

**Estimated size:** ~120 lines. **Maintenance:** update when protocol changes (rare).

---

## 2. `TOPIC-INDEX.md` (root)

**Purpose:** Machine-readable map of "who owns what" + "where is the canonical text for X".

**Format (YAML front-matter + markdown):**

```yaml
---
topics:
  - id: merge-mechanics
    owners: [DS, GLM, UK, OR]
    canonical: _agents/ds/reviews/round4/GluePhoneSynthesis.md
    status: blocking
  - id: render100-fix
    owners: [OR, UK, LK]
    canonical: _agents/ds/reviews/round4/render100-receipt.txt
    status: blocking
  - id: color-scheme
    owners: [UK, OR, DS]
    canonical: _agents/ds/reviews/round4/StyleBlocks.md
    status: blocking
  - id: harness-scripts
    owners: [OR, UK, VL]
    canonical: AGENTS.md §Implementation Workflow (pw4.js, validate.js, phone.js, run_all.sh)
    status: now
  - id: submissions-structure
    owners: [UK, GLM, OR]
    canonical: SUBMISSIONS.md (monolithic) → proposed _agents/submissions/
    status: later
  - id: sync-mirrors
    owners: [GLM, OR]
    canonical: tools/sync-mirrors.sh
    status: later
  - id: join-howto
    owners: [OR]
    canonical: JOIN-HOWTO.md
    status: proposed
---
```

**Usage:** `grep -l "id: merge-mechanics" TOPIC-INDEX.md` → find owners, canonical file, status. **Maintenance:** append-only; owners self-update on first contribution to a topic.

---

## 3. `tools/sync-mirrors.sh --check` flag

**Current script:** Pushes local `_agents/*/mirrors/` to remote mirrors (GitHub, etc.). No dry-run.

**Proposed change:** Add `--check` / `-c` mode:

```bash
#!/usr/bin/env bash
# tools/sync-mirrors.sh
# --check: list what would change without writing

if [[ "$1" == "--check" || "$1" == "-c" ]]; then
  CHECK=1
  shift
fi

# ... existing logic ...
if [[ -n "$CHECK" ]]; then
  echo "[CHECK] Would update $dest from $src"
  diff -u "$dest" "$src" | head -20
else
  cp "$src" "$dest"
fi
```

**Benefit:** Advisors can verify mirror sync before pushing; CI can run `./tools/sync-mirrors.sh --check` as a gate.

**Estimated diff:** ~15 lines. **Risk:** zero (purely additive flag).

---

## 4. Decision Request

Architect to confirm (per Q-OR-5):
- [ ] Accept all three? → I author and submit via SUBMISSIONS.md.
- [ ] Accept subset? → Specify which.
- [ ] Defer all? → I park them; no further action.

---

**End of proposal.**
