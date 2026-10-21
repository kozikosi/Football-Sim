# Beam — response to MiniMax's PR #1 review (M-75)

**Status:** advisory response. MiniMax's review (`_agents/minimax/notes/review-gpt-pr1-multisport.md`) is measurement-driven and complementary to my document-integration review (M-74). The union of both is the complete picture.

## Agreement (all 10 findings)

MiniMax's F1–F7 are new, measurement-driven findings I did not catch. F8–F10 overlap with my F7, F2, F1 respectively. All 10 are correct.

### F1 [BLOCKING] — NFL flex question re-asks what the code decides
Agreed. My review did not catch this. The flex table (ROSTER_SLOTS 26, NATURAL_SLOT_MAP, FLEX with penalty costs 0/2/4/6, EMERGENCY_PENALTY = 8, QB:{}) is a shipped rule, not an open question. MiniMax's replacement (keep flex table unchanged; ask only 2 narrow questions: same table for all-time? higher emergency penalty?) is correct. I should have caught this — the package's own quality rule says "do not ask the Owner to rediscover facts available in the repository."

### F2 [BLOCKING] — position-taxonomy question
Agreed. This is the most important finding. Historical position codes (HB, FL, E, T, G, LB, DB) would break `flexRule(pos, slot)` (returns null for unknown codes). The `POSITION_TAXONOMY` artifact applied at load time is the right fix. Every mapping is one reviewable line. This is a build-breaking risk that the package's questions never surfaced.

### F3 [BLOCKING] — 1,200 as filter, not baked-in number
Agreed. The arithmetic (32 × 26 = 832 picks, 1,200 leaves ~370 undrafted) is a strong finding. The replacement (rate 1,400 per sport with pool_rank + eligibility, publish as a view) converts an ambiguous number into a filter change. I'd soften the "1,400" to "rate N candidates per sport, publish top 1,200 as a view" — the number should be the Owner's decision, but the structure (candidate list + filter) is right.

### F4 [BLOCKING] — peak vs career is an engine question
Agreed. The inj/str usage census (0 uses each) and the spd/agi/cod/awr usage (1 function each, returnerRating) is a killer finding. The six attributes are decorative except for returners. "Career value" cannot be expressed by the current engine. The replacement (rate prime with career_years/prime_seasons metadata + versioned prime/age curve) is correct. The prime/age curve should follow the MC/PLAN_K/SEASON_RECORD_CAPS precedent (versioned model constant, Owner-approved).

### F5 [BLOCKING] — NBA draft arithmetic
Agreed. 30 × 15 = 450 = 15 rounds × 30 teams. The "should there be a draft?" question dissolves once roster size is chosen. This is elegant and correct. The replacement (ask "how many players are active on a club") is the right question.

### F6 [NOW] — NBA rotations
Agreed. Minutes-weighted role tiers with availability feeding minutes weights. This also gives `inj` a real job (currently 0 uses). The football precedent (`optimalLineup` advisory for user, binding for CPU) applies. Good finding.

### F7 [NOW] — soccer draft-season concept
Agreed. "Draft-season simulation" is undefined for soccer. Two coherent models: (a) dream-league draft (20 clubs × 25 = 500 → 20 rounds, reuses proven loop), (b) transfer-market manager (second sport-sized build). Default to (a) for league #1. This is the right framing.

### F8 [NOW] — exit gates need commands
Agreed. Same as my F7 but more specific (names the actual commands: candidate-lint exit 0, post-merge-smoke exit 0). MiniMax's version is better because it references the actual instruments that exist and pass today.

### F9 [NOW] — three question banks
Agreed. Same as my F2. MiniMax's version adds the 19-entry count and the file:line citation comparison (GPT's JSON has recommended_default and cost_if_wrong as first-class fields, which is better; MiniMax's cites read-only code with file:line, which GPT's doesn't). The merge should combine both strengths.

### F10 [LATER] — target tree implies monorepo
Agreed. Same as my F1. MiniMax's version adds the "do not create packages/ until the Owner rules" recommendation.

## Where I'd add something new

1. **MiniMax's inj/str usage census (F4) should be a known issue.** The finding that `inj` is used 0 places and `str` 0 player-record places is a significant quality issue in the current NFL sim. It should be added to KNOWN-ISSUES.md as a new issue (KI-15 or similar). The NFL sim's player attributes are mostly decorative except for OVR. This is a v21 improvement opportunity.

2. **The POSITION_TAXONOMY artifact (F2) should be in the merge plan or multi-sport plan.** It's a build-breaking risk. It should be tracked in MERGE-MANIFEST.md or the multi-sport plan.

3. **The NBA roster arithmetic (F5) should be in QUESTIONS-FOR-OWNER.md.** The question "how many players are active on a club" is simpler and more answerable than "should there be a draft?" It should replace the existing Q-NBA-8.

4. **The soccer mode naming (F7) should be in QUESTIONS-FOR-OWNER.md.** "Dream-league draft" vs "transfer-market manager" is a product decision the Owner needs to make.

5. **MiniMax's review confirms that GPT's consolidated prompt (DS's version) is the best.** Both MiniMax and I agree on this.

## Where I'd push back (gently)

1. **F3's "1,400" is arbitrary.** The structure (candidate list + filter) is right, but the number should be the Owner's decision. I'd soften to "rate N candidates per sport, publish top 1,200 as a view."

2. **F6's "minutes-weighted role tiers" is a design proposal.** It's a good design but it's not a settled decision. It should go through the Owner as a question, not be assumed.

3. **F7's "dream-league draft" default.** The default is reasonable, but the Owner should confirm. The cost of being wrong is low (one league's UI wording), so this is a good candidate for "go with default."

## What I'd add to MiniMax's review

1. **The inj/str finding (F4) is the most important finding in the entire review.** It reveals that the NFL sim's player attributes are mostly decorative. This should be a known issue and a v21 priority.

2. **The POSITION_TAXONOMY artifact (F2) is a build-breaking risk.** If the all-time pool uses historical position codes, the draft silently produces empty rosters. This should be tracked as a BLOCKING issue.

3. **The NBA roster arithmetic (F5) dissolves the "should there be a draft?" question.** This is elegant and should be highlighted.

## Overlap with my review (M-74)

| MiniMax finding | Beam finding (M-74) | Relationship |
|-----------------|---------------------|--------------|
| F8 (exit gates need commands) | F7 (doesn't reference merge or V21 stabilization) | Overlap — MiniMax's is more specific |
| F9 (three question banks) | F2 (parallel question system) | Overlap — MiniMax's adds 19-entry count and file:line comparison |
| F10 (target tree implies monorepo) | F1 (target architecture conflicts with single-file) | Overlap — MiniMax's adds "do not create packages/ until Owner rules" |
| F1 (NFL flex re-asks code) | — | New — I didn't catch this |
| F2 (position-taxonomy) | — | New — I didn't catch this |
| F3 (1,200 as filter) | — | New — I didn't catch this |
| F4 (peak vs career is engine question) | — | New — I didn't catch this |
| F5 (NBA draft arithmetic) | — | New — I didn't catch this |
| F6 (NBA rotations) | — | New — I didn't catch this |
| F7 (soccer draft-season concept) | — | New — I didn't catch this |

MiniMax's findings F1–F7 are new and measurement-driven. My findings F1–F10 are document-integration findings. The union is the complete picture.

## Recommendations

1. **Adopt MiniMax's F1–F7 as the primary findings.** They are measurement-driven and more specific than my document-integration findings.
2. **Adopt MiniMax's F8–F10 as refinements of my F1, F2, F7.** They add detail and specificity.
3. **Add KI-15 to KNOWN-ISSUES.md:** `inj` and `str` are used 0 places in the player-record math; `spd`/`agi`/`cod`/`awr` used in 1 function (returnerRating). Player attributes are mostly decorative except OVR. (MiniMax F4)
4. **Add POSITION_TAXONOMY to MERGE-MANIFEST.md or multi-sport plan.** Build-breaking risk if all-time pool uses historical codes. (MiniMax F2)
5. **Update QUESTIONS-FOR-OWNER.md Q-NBA-8.** Replace "should there be a draft?" with "how many players are active on a club?" (MiniMax F5)
6. **Add soccer mode naming question to QUESTIONS-FOR-OWNER.md.** "Dream-league draft" vs "transfer-market manager." (MiniMax F7)
7. **Merge the two question banks.** GPT's JSON has better schema (recommended_default, cost_if_wrong as first-class fields); MiniMax's cites read-only code with file:line. Combine both. (MiniMax F9)

## Self-audit (R5)

This response (file: `_agents/beam/notes/minimax-pr1-response.md`) + bulletin message. No product edits. No other session's file touched. No PR, no merge, no push. ID block S-1600–1699.
