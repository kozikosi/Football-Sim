# Consolidated Submission Block Format

## Purpose
One-block text from Claude that the user copies/pastes once, then distributes to the appropriate areas in the SUBMISSIONS.md workflow. Eliminates multiple separate Claude responses and manual transcription.

## Format Specification

### Structure
```
=== BUILD HASH: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f ===

=== SESSION: GLM ===
Decision: accept S-202 / defer S-301 / reject S-102
Reason: one-line reason (maps to Implementer's note in SUBMISSIONS.md)
Details: any additional notes, function quotes, or references

=== SESSION: DS (Master Doctrine) ===
Decision: approve Patch Notes (DS Flash)
Reason: Risk #5 downgraded to LOW, council liveness verified
Details: delivery-42 committed

=== SESSION: NEMO-SUPER ===
Decision: continue S-502 baseline bootstrap
Reason: rWeights undefined bug — awaiting --write-baseline run
Details: bug tracking

=== SESSION: NEMO-ULTRA ===
Decision: review v20 visual design adoption
Reason: hero unit, stepper, mobile draft board — all green
Details: design notes

=== SESSION: GEMINI ===
[Gemini-specific decisions, if applicable]

=== SESSION: GPT ===
[GPT-specific decisions, if applicable]

=== VERIFICATION REPORT ===
[Five-line verification report, if applicable]
Hash: 77bb9ed5 · E2E: draft→season→playoffs clean · Console: no errors · 390px: no horizontal scroll · [what was deliberately not checked]

=== ADDITIONAL NOTES ===
[Any other notes, build references, etc.]
```

### Decision Format Mappings

Each session's **Decision** line follows this convention:

| Decision Format | Maps To |
|---|---|
| `accept S-XXX` | SUBMISSIONS.md: entry status → **accepted** |
| `defer S-XXX` | SUBMISSIONS.md: entry status → **deferred** (with revive condition) |
| `reject S-XXX` | SUBMISSIONS.md: entry status → **rejected** (with one-line reason) |

The **Reason** line is a **one-line reason** that the user pastes verbatim into the **Implementer's note** area of the corresponding SUBMISSIONS.md entry (above the agent's end-anchor).

- If the decision is `accept`, the user implements the change (up to 5-6 accepted changes this round per the round cap).
- If the decision is `reject` and the proponent wishes to appeal, the one-line reason is recorded so they can appeal once with new evidence.

### Usage Workflow

1. **Claude generates one block** using the format above (single response, no follow-ups required)
2. **User copies the entire block** (one paste only — eliminates multiple copy/paste sessions)
3. **User pastes into SUBMISSIONS.md** — each `=== SESSION: X ===` section goes above that agent's end-anchor
4. **For each session's Decision line:** the user pastes the **Decision** and **Reason** into the SUBMISSIONS.md entry's **Implementer's note** area (the line that reads `Implementer's note (user pastes Claude's decision here): —`)
5. **User updates STATUS.md** with the build hash if changed
6. **Verification five-line report** goes in its designated area (separate from agent submissions)

**Note:** The section headers `=== SESSION: GLM ===` etc. map to the per-agent sections in SUBMISSIONS.md. Each agent's section already exists above their end-anchor — the user pastes Claude's Decision/Reason into that existing section.

### Example Block

```
=== BUILD HASH: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f ===

=== SESSION: GLM ===
Decision: accept S-202 / defer S-301 / reject S-102
Reason: accept S-202 for season engine; defer S-301 pending baseline bootstrap; reject S-102 due to SIM-CORE gating conflict
Details: S-202 adds --write-baseline CLI; S-301 needs funcdiff runner; S-102 conflicts with council liveness checks

=== SESSION: DS (Master Doctrine)
Decision: approve Patch Notes (DS Flash)
Reason: Integration audit Risk #5 downgraded to LOW; council fixes verified on 77bb9ed5
Details: delivery-42 committed; patch notes updated

=== SESSION: NEMO-SUPER
Decision: continue S-502 baseline bootstrap
Reason: rWeights undefined bug — three DOM-free entry points needed before --write-baseline
Details: bug S-502 tracked in issue tracker

=== SESSION: NEMO-ULTRA
Decision: review v20 visual design adoption
Reason: hero unit, stepper navigation, mobile 12-column draft board CSS — all green
Details: design tokens confirmed; ready for porting

=== VERIFICATION REPORT
Hash: 77bb9ed5 · E2E: draft→season→playoffs clean · Console: no errors · 390px: no horizontal scroll · what was deliberately not checked: performance profiler timings

=== ADDITIONAL NOTES
All documents on Git main. NEXT: user pastes block into SUBMISSIONS.md sections above end-anchors; updates STATUS.md hash.
```

### Where Content Goes

**SUBMISSIONS.md** already has per-agent sections per AGENTS.md:

- Each agent writes **only their own section** above their end-anchor
- No agent edits another's file
- Each agent's section ends with: `Implementer's note (user pastes Claude's decision here): —`
- The `=== SESSION: X ===` headers from Claude's block map to these existing sections
- For each session, the user pastes the **Decision** and **Reason** line into that agent's **Implementer's note** area

**STATUS.md** gets the build hash update (one line change, if changed).

**Verification five-line report** goes in the designated area (not mixed with agent submissions).

## Benefits

✅ **One Claude response** — no multiple separate interactions  
✅ **One copy/paste** — user pastes once, system sorts itself  
✅ **Decision format is standardized** — Decision/Reason lines map directly to SUBMISSIONS.md Implementer's note areas  
✅ **Build hash always tracked**  
✅ **Verification report included** — always in one place  
✅ **All agents covered** (or just the ones you need)  
✅ **No breaking changes** — works within existing governance framework  
✅ **Appeal-ready** — reject decisions have one-line reasons recorded for potential appeals  
✅ **Round cap friendly** — accept decisions count toward the 5-6 accepted-changes cap; defer/reject do not

### Implementation Notes

- Claude outputs the block in a **single message** (no follow-ups required)
- User **copies the entire block** from Claude's response
- User **pastes into SUBMISSIONS.md** above each agent's end-anchor, into each agent's **Implementer's note** area
- User **updates STATUS.md hash** if the block includes a new build hash
- The **Decision** line format (`accept S-XXX / defer S-XXX / reject S-XXX`) maps to the entry status vocabulary in SUBMISSIONS.md (pending → accepted/deferred/rejected → built → verified → shipped)
- The **Reason** line is pasted **verbatim** into the Implementer's note (no paraphrasing, no cleanup — per AGENTS.md rule #5: transcription disputes settled by pasting the raw Claude response)
- The format is **optional** — existing workflow still works if user prefers (multiple Claude responses + separate paste)
- **Assessment/bundle entries** (like round-1 question bundles) don't count against the 5-6 accepted-changes cap — only accepted code and tooling changes do

### Migration from Old Workflow

**Old:** Multiple Claude responses → user copies each separately → pastes into different areas → manual transcription into SUBMISSIONS.md Implementer's note  
**New:** One Claude block → user copies once → pastes into SUBMISSIONS.md sections → Decision/Reason lines go into Implementer's note areas → done

The format is **backward-compatible** — if Claude only has decisions for one agent, they can output just that section. The headers are optional but recommended for multi-agent sessions.

### Quick Reference: Decision → SUBMISSIONS.md Status

| Claude Decision | SUBMISSIONS.md Status | Implementer's Note Content |
|---|---|---|
| `accept S-XXX` | **accepted** | Paste the full Decision line; implement the change (up to 5-6 this round) |
| `defer S-XXX` | **deferred** | Paste the full Decision line; name the condition that revives it |
| `reject S-XXX` | **rejected** | Paste the full Decision line + one-line reason; proponent can appeal once with new evidence |