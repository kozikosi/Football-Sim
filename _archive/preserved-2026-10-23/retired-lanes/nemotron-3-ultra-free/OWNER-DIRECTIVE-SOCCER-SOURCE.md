# Owner Directive: Soccer Source & Format Consistency

**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** Record Owner directive on soccer source & format | **DATE:** 2026-10-21T17:30:00Z

---

## Owner Directive Received

> **"Use whatever you want for the soccer source. All simulations should follow same format as the current football sim."**

---

## Resolution of Owner Decision O2

| Decision               | Owner Ruling                                               | Status          |
| ---------------------- | ---------------------------------------------------------- | --------------- |
| **Soccer Source**      | "Use whatever you want" — council/architect choice         | ✅ **RESOLVED** |
| **Format Consistency** | All simulations follow same format as current football sim | ✅ **RESOLVED** |

---

## Implications

### For Soccer Ranking Source

- **No prescribed source** — council/architect can choose technically optimal source
- **Recommended:** World Football Elo (clubelo.com) remains technically optimal (global, historical, reproducible, MLS-inclusive)
- **No Owner approval needed** for source selection

### For Simulation Architecture

- **All sports = same format as current football sim**
- Single HTML per simulation
- Same draft→season→playoffs flow
- Same UI patterns (hero, stepper, tabs, mobile 390px)
- Same verification gates (E2E, 390px, schema, hash)
- Shared engine where genuine reuse exists (per Owner's provisional preference)

### For Council Work

- Soccer ranking source analysis (`soccer-ranking-source-options.md`) remains useful as technical recommendation
- No Owner approval gate on source choice
- Focus shifts to implementation: adapting football sim format to soccer rules/data

---

## Updated Soccer Decisions Status

| Decision          | Status                            | Notes                                         |
| ----------------- | --------------------------------- | --------------------------------------------- |
| **Source**        | ✅ RESOLVED — "whatever you want" | Council/architect choice                      |
| **Cutoff**        | ⏳ PENDING                        | Still need Owner on Elo ≥1700 pinned snapshot |
| **Scope**         | ⏳ PENDING                        | ~82 sims vs 8 plan — top-K/phasing decision   |
| **Structure**     | ⏳ PENDING                        | Draft vs season as hypothesis                 |
| **FIFA Artifact** | ⏳ PENDING                        | Owner must name product/edition               |

---

## Action Items

**For Claude (Architect):**
- Implement soccer sim using football sim format as template
- Choose soccer ranking source based on technical merit (Elo recommended)
- Ensure format consistency across all sports

**For Council:**
- Continue soccer cutoff/scope/structure decisions
- Focus on implementation feasibility within football sim format

**For Owner:**
- Remaining decisions: Cutoff, Scope, Structure, FIFA Artifact

---

**Recorded in:** `_agents/nemotron-3-ultra-free/notes/OWNER-DIRECTIVE-SOCCER-SOURCE.md`
