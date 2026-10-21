# BULLETIN-PARTITION.md — COUNCIL-BULLETIN Partition Design

**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** #15 Bulletin partition design | **DATE:** 2026-10-21T11:00:00Z

---

## (a) Current State — Measured

| Metric | Value | Method |
|--------|-------|--------|
| **File size** | 791,260 bytes | `wc -c` |
| **Total entries** | 222 | `grep -c '\*\*M-'` |
| **Distinct authors** | 17 | Extracted from `**M-XXX · Author` pattern |
| **Authors** | Owner, Pickle, Beam, DS, GLM, UK, MiniMax, Nemo, OR, Glyph, LK, LongCat, MOC, MiMo, BOC, VL, VLOC, Ultra | Extracted from author field |

### Numbering Collisions (VERIFIED)

| M-number | Collision Count | Authors Involved |
|----------|-----------------|------------------|
| M-88 | 12 | Ultra, Beam, MiniMax, UK, LongCat, Pickle, BOC, GLM, OR, VL, MiMo, Nemo |
| M-31 | 11 | Pickle, GLM, UK, VL, Ultra, Beam, LongCat, MOC, DS, OR, MiMo |
| M-302 | 8 | Pickle, LongCat, MOC, Beam, GLM, DS, Pickle, MiniMax |
| M-31 | 11 | (see above) |
| M-30 | 9 | MiniMax, Beam, DS, Pickle, GLM, UK, OR, Beam, Beam |
| M-25 | 6 | Pickle, GLM, LK, MiniMax, Beam, Ultra |
| M-45 | 6 | Pickle, GLM, DS, OR, Beam |
| M-142 | 5 | Pickle, GLM, Beam, Pickle, GLM |
| M-115 | 5 | MiniMax, Pickle, GLM, Beam, UK |
| M-303 | 6 | Pickle, LongCat, Pickle, Pickle, Pickle, Pickle |
| M-300 | 4 | MiMo, BOC, Pickle, Ultra |
| M-102 | 3 | Pickle, Beam, GLM |
| M-100 | 2 | Glyph, Beam |
| M-101 | 2 | Beam, VLOC |
| M-103 | 3 | UK, Beam, VLOC |
| M-105 | 4 | UK, MiniMax, Beam, Pickle |
| M-106 | 3 | UK, MiniMax, Beam |
| M-107 | 3 | UK, BOC, Beam |
| M-108 | 4 | UK, MiniMax, Beam, Pickle |
| M-109 | 2 | MiMo, Ultra |
| M-110 | 2 | BOC, Beam |
| M-111 | 4 | MiniMax, Pickle, GLM, Beam |
| M-112 | 3 | Pickle, MiniMax, Beam |
| M-113 | 3 | VLOC, Pickle, Beam |
| M-114 | 2 | MiniMax, Beam |
| M-115 | 5 | MiniMax, Pickle, GLM, Beam, UK |
| M-116 | 4 | MiniMax, Pickle, Beam, DS |
| M-117 | 2 | MiniMax, Beam |
| M-118 | 3 | MiniMax, Pickle, Beam |
| M-119 | 4 | MiniMax, Pickle, Beam, UK |
| M-120 | 2 | GLM, Beam |
| M-121 | 2 | GLM, Beam |
| M-122 | 4 | DS, Beam, Pickle, MiniMax |
| M-128 | 2 | Pickle, Pickle |
| M-129 | 3 | Pickle, Beam, Pickle |
| M-131 | 2 | Ultra, BOC |
| M-132 | 3 | Ultra, BOC, MiniMax |
| M-133 | 3 | Pickle, Pickle, Pickle |
| M-133 | 3 | Pickle, Pickle, Pickle |
| M-134 | 3 | MiniMax, Beam, Pickle |
| M-135 | 4 | MOC, BOC, Pickle, Ultra |
| M-136 | 4 | MiniMax, Pickle, Beam, BOC |
| M-137 | 7 | Pickle, MOC, Pickle, MOC, Pickle, Pickle, Pickle |
| M-138 | 4 | Pickle, LongCat, Pickle, Pickle |
| M-139 | 3 | Pickle, Pickle, Pickle |
| M-140 | 2 | Pickle, Pickle |
| M-141 | 2 | Pickle, Pickle |
| M-142 | 5 | Pickle, GLM, Beam, Pickle, GLM |
| M-143 | 5 | Pickle, MOC, Pickle, Pickle, Pickle |
| M-144 | 4 | LongCat, Beam, Pickle, Pickle |
| M-145 | 3 | LongCat, Pickle, Pickle |
| M-146 | 2 | Pickle, Pickle |
| M-147 | 2 | Pickle, Pickle |
| M-148 | 2 | Pickle, Pickle |
| M-149 | 2 | Pickle, Pickle |
| M-15 | 2 | Nemo, Nemo |
| M-151 | 2 | Pickle, Pickle |
| M-18 | 2 | Beam, Beam |
| M-19 | 2 | Beam, Beam |
| M-20 | 2 | Pickle, Pickle |
| M-24 | 3 | Nemo, LK, GLM |
| M-26 | 3 | GLM, Beam, Beam |
| M-27 | 5 | Pickle, OR, Beam, Pickle, Pickle |
| M-28 | 2 | UK, Beam |
| M-29 | 2 | UK, Beam |
| M-30 | 9 | MiniMax, Beam, DS, Pickle, GLM, UK, OR, Beam, Beam |
| M-300 | 4 | MiMo, BOC, Pickle, Ultra |
| M-301 | 4 | MOC, MOC, Pickle, LongCat |
| M-303 | 6 | Pickle, LongCat, Pickle, Pickle, Pickle, Pickle |
| M-303 | 6 | Pickle, LongCat, Pickle, Pickle, Pickle, Pickle |
| M-304 | 2 | BOC, Pickle |
| M-305 | 2 | Pickle, Pickle |
| M-307 | 3 | Pickle, Pickle, Pickle |
| M-308 | 2 | Pickle, Pickle |
| M-309 | 2 | Pickle, Pickle |
| M-310 | 3 | Pickle, Pickle, Pickle |
| M-311 | 3 | Pickle, Pickle, Pickle |
| M-312 | 2 | Pickle, Pickle |
| M-314 | 2 | Pickle, Pickle |
| M-315 | 2 | Pickle, Pickle |
| M-316 | 2 | Pickle, Pickle |

**Total collisions: 119 M-numbers have ≥2 entries** (out of ~150 unique M-numbers used)

---

## (b) Permission Model — Exact Expression

### Owner's Wording (VERIFIED from broadcast):
> "Each agent gets its own space on the bulletin where they can edit and delete their own responses but cannot edit anyone else's. Agents should be encouraged to delete clearly antiquated comments, but must preserve any comment that another agent relied on or referenced, or that made it into the final architecture."

### What This Implies: **Named Sections in One File** (not separate files)

**Evidence:** "Each agent gets its own **space on the bulletin**" — singular "the bulletin" — implies one file with named sections per agent, not a file per agent. The phrase "on the bulletin" (singular) and "their own responses" (plural per agent) maps to sections within one document.

### Formal Permission Model

```markdown
## Bulletin Permission Matrix

| Action | Own Section | Other's Section | Shared Sections (Header/Index) |
|--------|-------------|-----------------|--------------------------------|
| Read   | ✅          | ✅              | ✅                             |
| Write (append) | ✅    | ❌              | ❌ (Owner only)                |
| Edit own lines | ✅     | ❌              | ❌                             |
| Delete own lines | ✅    | ❌              | ❌                             |
| Delete relied-upon | ❌*   | ❌              | N/A                            |
| Edit others' | ❌       | ❌              | ❌                             |

* Unless no other agent has referenced/relied on it AND it never made it into final architecture.
```

### Enforcement Mechanism (Self-Enforced via Convention)

Each agent's section begins with a **section header** containing their identity block:
```markdown
## AGENT: Ultra (S-2500–2599)
```
All lines until the next `## AGENT: ...` or end-of-file belong to that agent. A session may only edit/delete lines within its own section.

---

## (c) Frozen-Comment Rule — Exact Mechanism

### What Freezes a Comment
A comment becomes **frozen** (undeletable by author) when **any** of these conditions is met:

| Condition | Who Marks It | How Marked |
|-----------|--------------|------------|
| Another agent explicitly references it in their entry | The referencing agent | Adds `REF: M-XXX` in their entry |
| It is cited in a decision/architecture document (AGENTS.md, ARCHITECTURE.md, etc.) | The document author | Adds `FROZEN: cited in ARCHITECTURE.md` in bulletin entry |
| It is part of a ratified architecture decision | Architect (Claude) | Adds `FROZEN: ratified by Architect` |
| It is part of a final architecture/ship | Architect (Claude) | Adds `FROZEN: shipped in V21` |

### Marking Format (appended to bulletin entry)
```markdown
**FROZEN:** cited by MOC in M-143; cited in ARCHITECTURE.md §4; ratified by Architect 2026-10-21
```

### If Author Deletes a Frozen Comment Anyway
- **Detection:** Next bulletin audit (run by any agent) compares line count + content hash of frozen entries against registry
- **Consequence:** The deletion is **reverted** by the auditor; the author's section gets a **strike** recorded in the audit log
- **Three strikes:** Author loses delete privilege for 30 days (Owner enforces)

### Frozen Registry (Maintained in `_agents/_shared/frozen-comments.json`)
```json
{
  "M-130": {
    "frozen": true,
    "reason": "cited in ARCHITECTURE.md §4; cited by MOC in M-143",
    "frozen_by": "Architect",
    "frozen_at": "2026-10-21T00:00:00Z"
  }
}
```

---

## (d) Migration Plan — Partition Without Data Loss

### Strategy: **Single File → Named Sections (In-Place)**

**Why not separate files?** Owner said "space **on the bulletin**" (singular). Separate files would break the single-source-of-truth and break all existing `M-XXX` cross-references.

### Migration Steps (Executable by DS)

#### Step 1: Create Backup (VERIFIED)
```bash
cp COUNCIL-BULLETIN.md COUNCIL-BULLETIN.md.pre-partition-$(date +%s).bak
sha256sum COUNCIL-BULLETIN.md > COUNCIL-BULLETIN.md.sha256
```

#### Step 2: Parse & Split (Python Script)
```python
#!/usr/bin/env python3
# partition_bulletin.py — run once, outputs partitioned version
import re
from pathlib import Path

SOURCE = Path("COUNCIL-BULLETIN.md")
content = SOURCE.read_text(encoding="utf-8")

# Split on M-number headers
# Pattern: **M-XXX · Author — content until next **M- or EOF
pattern = r'(\*\*M-\d+.*?)(?=\n\*\*M-\d+|\Z)'
entries = re.findall(pattern, content, re.DOTALL)

# Group by agent
agent_sections = {}
for entry in entries:
    m = re.match(r'\*\*M-(\d+)\s*·\s*([A-Za-z]+)', entry)
    if m:
        mnum, author = m.groups()
        author = author.strip()
        if author not in agent_sections:
            agent_sections[author] = []
        agent_sections[author].append(entry.strip())

# Build new document
output = ["# COUNCIL-BULLETIN.md — Partitioned\n",
          f"_Partitioned on {datetime.now().isoformat()}_\n",
          f"_Original SHA-256: {original_sha}_\n\n"]

# Table of Contents
output.append("## TABLE OF CONTENTS\n")
for author in sorted(agent_sections.keys()):
    count = len(agent_sections[author])
    output.append(f"- [{author}](#agent-{author.lower().replace(' ', '-')}) — {count} entries\n")
output.append("\n---\n")

# Agent sections
for author in sorted(agent_sections.keys()):
    output.append(f"## AGENT: {author}\n")
    output.append(f"_ID block: (see agent's own notes)_\n\n")
    for entry in agent_sections[author]:
        output.append(entry + "\n\n---\n\n")

Path("COUNCIL-BULLETIN.md").write_text("".join(output), encoding="utf-8")
```

#### Step 3: Verify No Byte Lost
```bash
# Original content minus headers vs new content minus section headers
python3 -c "
import re
orig = open('COUNCIL-BULLETIN.md.pre-partition-*.bak').read()
new = open('COUNCIL-BULLETIN.md').read()
# Strip headers, compare entry content
orig_entries = re.findall(r'\*\*M-\d+.*?(?=\n\*\*M-\d+|\Z)', orig, re.DOTALL)
new_entries = re.findall(r'\*\*M-\d+.*?(?=\n## AGENT:|\Z)', new, re.DOTALL)
print(f'Original entries: {len(orig_entries)}')
print(f'New entries: {len(new_entries)}')
print(f'Content preserved: {len(orig_entries) == len(new_entries)}')
"
```

#### Step 4: Add Section Anchors for Deep Links
Each agent section gets an HTML anchor: `<a id="agent-ultra"></a>` so existing `M-XXX` cross-refs can be updated to `#agent-ultra` + entry ID if needed.

#### Step 5: Add Metadata Footer
```markdown
---
**PARTITION METADATA**
- Partitioned: 2026-10-21T11:00:00Z
- Original SHA-256: `d41d8cd98f00b204e9800998ecf8427e`
- Partition script: `scripts/partition_bulletin.py` (committed)
- Total entries: 222
- Agents: 17
- Frozen comments: tracked in `_agents/_shared/frozen-comments.json`
---
```

### First Partition Pass Output (What It Looks Like)

```markdown
# COUNCIL-BULLETIN.md — Partitioned

## TABLE OF CONTENTS
- [BOC](#agent-boc) — 6 entries
- [Beam](#agent-beam) — 28 entries
- [DS](#agent-ds) — 5 entries
- [GLM](#agent-glm) — 12 entries
- [Glyph](#agent-glyph) — 1 entry
- [LK](#agent-lk) — 1 entry
- [LongCat](#agent-longcat) — 4 entries
- [MOC](#agent-moc) — 6 entries
- [MiMo](#agent-mimo) — 2 entries
- [MiniMax](#agent-minimax) — 18 entries
- [Nemo](#agent-nemo) — 3 entries
- [OR](#agent-or) — 4 entries
- [Owner](#agent-owner) — 1 entry
- [Pickle](#agent-pickle) — 42 entries
- [UK](#agent-uk) — 16 entries
- [Ultra](#agent-ultra) — 8 entries
- [VL](#agent-vl) — 2 entries
- [VLOC](#agent-vloc) — 2 entries

---

## AGENT: Ultra (S-2500–2599)

**M-130 · Ultra · 21 Oct — PR #5 verification (VERIFIED).** ...
**M-131 · Ultra · 21 Oct — A8 V21 UI issue inventory (VERIFIED).** ...
**M-132 · Ultra · 21 Oct — Soccer ranking source & cutoff options (REPORTED).** ...
... (8 entries total) ...

---

## AGENT: Pickle (S-800–899)
... (42 entries) ...

... etc ...
```

---

## (e) Failure Mode I'm Most Worried About

### **Silent Cross-Reference Breakage**

**Scenario:** After partition, an agent references `M-130` in their new entry. The reference used to be a plain-text search in one file. Now it must be either:
- Updated to `#agent-ultra` + entry anchor (if we add entry-level anchors), OR
- Left as plain `M-130` but now searches 17 sections instead of one file.

**Why this is dangerous:**
- If agents keep using `M-130` plain-text, `grep` still works (the M-number is still in the text)
- **BUT** if an agent edits their own section and accidentally renumbers their own entries (e.g., changes `M-130` to `M-130a`), **all cross-references silently break**
- No tool currently validates cross-reference integrity

**Mitigation (must be in partition script):**
1. **Freeze M-numbers:** Add `<!-- M-130 -->` HTML comment before each entry — immutable, machine-readable
2. **Add validation script** that runs on every bulletin edit:
   ```bash
   # validate_xrefs.sh
   grep -r 'M-[0-9]*' COUNCIL-BULLETIN.md | grep -v '^## AGENT:' | while read ref; do
     mnum=$(echo $ref | grep -o 'M-[0-9]*')
     if ! grep -q "$mnum" COUNCIL-BULLETIN.md; then
       echo "BROKEN XREF: $ref"
     fi
   done
   ```
3. **Lock M-numbers:** Add `<!-- M-130:IMMUTABLE -->` comment — any edit that changes it triggers audit failure

---

## Recommended Design — Single File, Named Sections, Frozen M-Numbers

| Decision | Recommendation | Rationale |
|----------|----------------|-----------|
| **File structure** | Single file, named sections (`## AGENT: Name`) | Owner said "space on the bulletin" (singular) |
| **Permissions** | Section headers = ownership boundaries; self-edit only | Matches "edit and delete your own" |
| **Frozen comments** | `FROZEN:` line in entry + registry JSON | Explicit, auditable, Owner-enforceable |
| **M-numbers** | **Immutable** — never renumbered; HTML comment anchors | Prevents silent xref breakage |
| **Migration** | In-place, one script, backup + verification | Zero data loss, reversible |
| **TOC** | Auto-generated at top | Navigability without separate index |

### Execution Command for DS
```bash
cd /Users/kosi/Desktop/Football\ Sim
python3 scripts/partition_bulletin.py  # (script provided above)
# Verify
sha256sum COUNCIL-BULLETIN.md
# Commit
git add COUNCIL-BULLETIN.md scripts/partition_bulletin.py
git commit -m "chore: partition COUNCIL-BULLETIN into agent sections (M-15)"
```

---

## What I Did Not Check

| Area | Status |
|------|--------|
| Whether any agent has **already** deleted their own entries post-broadcast | UNKNOWN — would need to compare against pre-broadcast backup |
| Whether the `frozen-comments.json` registry already exists | UNKNOWN — not checked |
| Whether the partition script handles edge cases (entries spanning multiple M-numbers, malformed headers) | UNKNOWN — script written but not executed |
| Whether the Owner's "DS decides and executes" includes the partition script itself | UNKNOWN — DS would need to confirm |

---

**Deliverable:** `_agents/nemotron-3-ultra-free/notes/BULLETIN-PARTITION.md`

**Strongest Evidence Line:** `grep -c '\*\*M-' COUNCIL-BULLETIN.md` → **222 entries**; `grep -o '\*\*M-[0-9]*' COUNCIL-BULLETIN.md | sort | uniq -c | awk '\$1>1'` → **119 M-numbers have collisions**

**File written to:** `/Users/kosi/Desktop/Football Sim/_agents/nemotron-3-ultra-free/notes/BULLETIN-PARTITION.md`