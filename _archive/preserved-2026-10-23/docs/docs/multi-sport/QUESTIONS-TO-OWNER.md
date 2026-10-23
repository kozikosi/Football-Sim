# QUESTIONS-TO-OWNER.md — Fundamental Concept Guidance Template

**Purpose:** Structured template for council members to elicit Owner guidance on fundamental design concepts. Each question block follows a standard format for consistent, answerable responses.

**Usage:** When a council member needs Owner guidance on a fundamental concept, copy the template below, fill in the brackets, append to `QUESTIONS-FOR-THE-ARCHITECT.md` under your agent's section, and notify the Owner via `COUNCIL-BULLETIN.md`.

---

## Question Template

```
## [AGENT NAME] — [CONCEPT NAME] [TAG]

**Context:** [1-2 sentences: what system/feature this affects, why it matters now]

**Current Behavior:** [What the code currently does, with file/function references if applicable]

**Proposed Options:**
- **Option A:** [Description] — Pros: [list] / Cons: [list]
- **Option B:** [Description] — Pros: [list] / Cons: [list]
- **Option C:** [Description] — Pros: [list] / Cons: [list]

**My Recommendation:** [Option X] — [1-2 sentence justification with evidence]

**Cost of Being Wrong:** [What happens if we choose wrong? Quantify if possible.]

**Verification Plan:** [How will we verify the decision works? Commands, test cases, etc.]

**Blocking?** [BLOCKING / NOW / LATER / OPEN]

**Tags:** [CONCEPT TAGS — e.g., FLEX, MATH, UI, DATA, RULES]
```

---

## Example: Flex Rules (NFL)

```
## Nemo Ultra — Flex Rules [BLOCKING]

**Context:** The NFL sim's flex system allows players to play out of position with rating penalties. Current rules allow significant cross-position play (e.g., WR→RB at -6, OT→OG free). Need Owner guidance on whether this flexibility is intended as a strategic feature or an exploit to be constrained.

**Current Behavior:** 
- `FLEX` object defines cross-position penalties (e.g., `WR:{TE:4, SS:4, FS:4, CB:4, RB:6}`)
- `NATURAL_SLOT_MAP` defines natural positions per slot
- `effOvr()` applies penalty via `flexPenaltyFor()`
- QB cannot flex (`QB:{}`)

**Proposed Options:**
- **Option A (Current):** Keep generous flex — strategic depth, roster flexibility
- **Option B (Restricted):** Tighten penalties by +2 across board; WR→RB becomes -8
- **Option C (Position-Locked):** Only adjacent positions allowed (OG↔C, CB↔SS, etc.)

**My Recommendation:** Option A — Flex is a strategic feature, not exploit. Current penalties already make bad flexes costly. Council review in v21 can reassess.

**Cost of Being Wrong:** If too permissive, draft becomes "collect best players, flex everywhere." If too restrictive, reduces roster creativity and draft strategy depth.

**Verification:** Draft sims with council members; measure flex usage rate and win impact.

**Blocking?** [NOW]

**Tags:** FLEX, NFL, DRAFT, BALANCE
```

---

## Standard Question Categories

### MATH / VALUATION

- Weight derivations, slot values, replacement levels
- Model coefficients (MC, PLAN_K, RATING_SPECS)
- Slot win calculations, marginal value

### FLEX / POSITIONING

- Position eligibility, penalty severity
- Natural slot mappings, cross-position eligibility
- Emergency flex rules (last resort)

### GAME ENGINE / SIMULATION

- Matchup model coefficients (MC, PLAN_K)
- Game plan system (personnel, strategy, defensive packages)
- Game simulation parameters (pace, variance, OT rules)

### DRAFT ENGINE

- CPU logic (cpuPick, cpuBias, cpuNoise, cpuMiss)
- User board (Value here, Priority, Gone%)
- Draft order, snake order, keeper rules

### SEASON ENGINE

- Schedule generation, standings, tiebreakers
- Playoff bracket, tiebreakers, home-field
- Injury system, fatigue, morale (if implemented)

### RECAPS / NARRATIVE

- Recap generation, play-by-play, game summaries
- Turnover/play enumeration, star performances
- Awards logic (MVP, OPOY, DPOY, etc.)

### UI / UX

- Mobile breakpoints, table patterns, card layouts
- Draft board layout, priority charts, player cards
- Mobile 390px behavior, touch targets

### DATA / RATINGS

- Player attribute schemas, rating scales
- Historical/era adjustments
- Dataset creation, validation, sources

### RULES / PENALTIES

- Penalty system, fouls, ejections
- Rule variations by era/league
- Penalty enforcement consistency

### PERSISTENCE / DATA

- LocalStorage schema, migration, versioning
- Auto-save triggers, conflict resolution
- Export/import format

---

## Submission Checklist

Before posting a question, verify:
- [ ] Question follows the template exactly
- [ ] Context explains WHY this matters NOW
- [ ] Current behavior described with file/function refs
- [ ] At least 2 options presented with pros/cons
- [ ] Clear recommendation with evidence
- [ ] Cost of being wrong stated
- [ ] Verification plan included
- [ ] Tagged correctly ([BLOCKING]/[NOW]/[LATER]/[OPEN])
- [ ] Tagged with relevant concept tags
- [ ] Posted in `QUESTIONS-FOR-THE-ARCHITECT.md` under your agent section
- [ ] Bulletin message posted citing `@M-<next-free-number>`

---

## Response Protocol (Architect/Owner)

When answering, the Owner/Architect should:
1. **Reply inline** in the question block (preserve question)
2. **Format:** `**Decision:** [Option X] — [1-line rationale]`
3. **If deferring:** `[DEFERRED] — Reason: [reason]. Reviving condition: [condition]`
4. **If rejecting:** `[REJECTED] — Reason: [reason]`
5. **Always include:** Receipt command or reference to existing decision
6. Update `DECISIONS.md` with new entry
7. Update `RFC-LOG.md` if new ruling

---

## Example Response Format

```
**Decision:** Option A — Flex remains generous. Current penalties already make bad flexes costly; restricting further reduces strategic depth without clear evidence of exploit.

**Receipt:** `grep -n "FLEX" NFL Draft Simulator v20 Claude.html` shows current penalties.

**Cost if Wrong:** If exploit exists, draft meta shifts to "collect best players, flex everywhere" within 2 rounds of playtesting. Cost: ~2 rounds to detect, 1 round to patch.

**Verification:** Run 100 draft sims with council members; track flex usage rate and win correlation. Threshold: >30% flex usage in top-10 picks triggers review.
```

---

## Contribution Guidelines for Council Members

1. **Read first** — Check `QUESTIONS-FOR-THE-ARCHITECT.md` for existing questions on your topic
2. **Use the template** — Don't improvise format
3. **One question per block** — Split complex topics
4. **Cite receipts** — Every factual claim needs a command
5. **Be specific** — "Fix flex" is not a question; "Should WR→RB penalty increase from -6 to -8?" is
6. **Tag correctly** — [BLOCKING] only if merge/sprint blocked
7. **Own your section** — Only edit your agent's section
8. **Log in CHRONICLE** — `2026-10-XX · Agent · Question filed: [topic] · Q-XXXX · receipt`

---

**Document Location:** `docs/multi-sport/QUESTIONS-TO-OWNER.md`  
**Linked From:** `QUESTIONS-FOR-THE-ARCHITECT.md` (each agent's block)  
**Owner Review:** Weekly or when `[BLOCKING]` items accumulate
