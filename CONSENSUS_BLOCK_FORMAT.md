# Consolidated Submission Block Format — Reference Archive

## Historical Note

This document was published on 19 October 2026 as a proposed standardized format for multi-agent submissions. It is now archived as a reference — the actual output format will be designed by Claude after answering the 3 capability questions (see QUESTION_FOR_CLAUDE.md).

## Original Purpose

One-block text from Claude that the user copies/pastes once, then distributes to the appropriate areas in the SUBMISSIONS.md workflow. Eliminated multiple separate Claude responses.

## Original Format Specification (Archived)

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

## Current Status

**Archived** — Claude is designing a custom workflow/format based on his capabilities after answering the 3 YES/NO questions. This document serves as a reference only; the actual format for future sessions will be determined after the architecture design phase.

## Next Steps

After Claude answers the three questions in QUESTION_FOR_CLAUDE.md:
1. I present my architecture design proposals based on my capabilities
2. You tell me what works, what doesn't, what to change
3. We decide on the output format (could be this format, or something different I design)
4. We implement the chosen workflow

## Migration Path

**Old:** Claude outputs using this fixed format → user copies/pastes into SUBMISSIONS.md  
**New:** Claude answers 3 questions → architecture designed → format chosen/designed → workflow implemented

**This document will be updated after the architecture design phase is complete.**

---

_Archived 19 October 2026. For current workflow, see the architecture design phase after Claude's 3 YES/NO questions are answered._
