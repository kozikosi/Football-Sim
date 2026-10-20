# Consolidated Submission Block Format

## Purpose
One-block text from Claude that the user copies/pastes once, then distributes to the appropriate areas in the workflow. Eliminates multiple separate Claude responses.

## Format Specification

### Structure
```
=== BUILD HASH: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f ===

=== SESSION: GLM ===
[GLM-specific decisions, accept/defer/reject, any SUBMISSIONS.md entries]

=== SESSION: DS (Master Doctrine) ===
[DS-specific decisions, any patch notes, delivery entries]

=== SESSION: NEMO-SUPER ===
[Nemo-specific decisions, any rewrite entries]

=== SESSION: NEMO-ULTRA ===
[Ultra-specific decisions, any patch entries]

=== SESSION: GEMINI ===
[Gemini-specific decisions, if applicable]

=== SESSION: GPT ===
[GPT-specific decisions, if applicable]

=== VERIFICATION REPORT ===
[Five-line verification report, if applicable]

=== ADDITIONAL NOTES ===
[Any other notes, build references, etc.]
```

### Usage Workflow

1. **Claude generates one block** using the format above
2. **User copies the entire block** (one paste only)
3. **User pastes into SUBMISSIONS.md** — the section headers mark where each agent's content goes
4. **User distributes** — each section goes above its respective end-anchor in SUBMISSIONS.md
5. **User updates STATUS.md** with the build hash if changed

### Example Block

```
=== BUILD HASH: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f ===

=== SESSION: GLM ===
Accept S-202, defer S-301, reject S-102 (conflict with SIM-CORE gating).
Build hash updated to 77bb9ed5.

=== SESSION: DS (Master Doctrine)
Approve Patch Notes (DS Flash). delivery-42 committed. Risk #5 downgraded to LOW.

=== SESSION: NEMO-SUPER
Continue S-502 baseline bootstrap. rWeights undefined bug remains open.

=== SESSION: NEMO-ULTRA
Review S-900 integration audit. Council liveness verified on 77bb9ed5.

=== VERIFICATION REPORT
Hash: 77bb9ed5 · E2E: draft→season→playoffs clean · Console: no errors · 390px: no horizontal scroll

=== ADDITIONAL NOTES
All documents published on Git main. NEXT: user pastes into SUBMISSIONS.md sections.
```

### Where Content Goes

**SUBMISSIONS.md** already has per-agent structure per AGENTS.md:
- Each agent writes **only their own section** above their end-anchor
- No agent edits another's file
- The block headers (=== SESSION: GLM ===, etc.) map to the existing section anchors

**STATUS.md** gets the build hash update (one line change).

**Verification five-line report** goes in the designated area (not mixed with agent submissions).

### Benefits

✅ **One Claude response** — no multiple separate interactions  
✅ **One copy/paste** — user pastes once, system sorts itself  
✅ **Clear section boundaries** — headers map to existing SUBMISSIONS.md anchors  
✅ **Build hash included** — always tracked  
✅ **Verification report included** — always in one place  
✅ **All agents covered** — GLM, DS, Nemo, Ultra, Gemini, GPT as needed  
✅ **No breaking changes** — works within existing governance framework  

### Implementation Notes

- Claude outputs the block in a **single message** (no follow-ups required)
- User **copies the entire block** from Claude's response
- User **pastes into SUBMISSIONS.md** above each agent's end-anchor
- User **updates STATUS.md hash** if the block includes a new build hash
- The format is **optional** — existing workflow still works if user prefers

### Migration from Old Workflow

**Old:** Multiple Claude responses → user copies each separately → pastes into different areas  
**New:** One Claude block → user copies once → pastes into SUBMISSIONS.md sections → done

The format is backward-compatible — if Claude only has decisions for one agent, they can output just that section. The headers are optional but recommended for multi-agent sessions.