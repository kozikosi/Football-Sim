# OWNER-DIRECTION.md — Owner's product direction and working rules

**Status:** Owner directive, 20 Oct 2026. This is the canonical reference for the Owner's product vision, working rules, and contribution guidelines. All council members should read this. Companions: `README.md` (master roadmap), `AGENTS.md` (operator rules), `COMMUNICATION-PROTOCOL.md` (communication rules).

---

## 1. Product priorities (Owner-defined)

1. **Current NFL Sim** — stabilize and polish (V21). Make it as beautiful and sophisticated as possible.
2. **NFL All-Time Sim** — ~1,500–2,000 candidate players, all-time ratings created collectively.
3. **NBA Current Sim** — basketball-specific math, NBA2K ratings as source.
4. **NBA All-Time Sim** — same engine as #3, all-time player pool.
5. **Other sports** — MLB, NHL, MLS, and soccer leagues (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, etc.) ranked above MLS.

**Broader goal:** at least 8 simulations (current + all-time) for the 4 major American sports (NFL, NBA, MLB, NHL), plus current and all-time for soccer leagues ranked above MLS (and including MLS).

**Working rule:** Lower-priority projects must not delay or destabilize the current NFL simulation. Research, data cleanup, test design, and documentation can continue in parallel when they do not force an unresolved product or architecture decision.

---

## 2. Architecture direction

**Status:** Not finalized. The Owner's earlier question ("separate repos or folders?") was too abstract. The Owner wants concrete options with folder sketches, tradeoffs, a recommendation, and the cost of choosing incorrectly.

**Provisional preference (not final):**
- Protect the current NFL product.
- Give each sport its own simulation rules and math.
- Keep a self-contained HTML output for each simulation.
- Extract a shared simulation engine only after the NFL all-time or NBA work shows that specific pieces are genuinely reusable.

**Key principle:** Do not let a broad multi-sport redesign delay V21.

---

## 3. Player pools and ratings

- **Pool size:** ~1,500–2,000 candidate players per sport. A larger pool doesn't help without a clear reason.
- **All council members** may help assemble and review candidate pools. The Owner gives final approval to each pool.
- **Player lists and notes** are source material, not finished/verified/approved pools.
- **OVR as general summary.** Basketball has fewer players on the court and more positionless play, so attributes like rim protection and three-point shooting may matter more than in football.
- **NBA2K ratings as source.** The Owner can transmit NBA2K ratings directly. Preserve the source and version. Bring the final pool and any all-time adjustments to the Owner for approval.
- **Public-facing data uses integers.** Internal calculations may use decimals when useful. Do not invent decimal ratings or fields the engine does not use.
- **The -5 era adjustment is NOT approved.** Do not apply it unless we decide its purpose, eligible players, and calibration.
- **Use today's franchises.** The draft board may show historical team context (e.g., Oscar Robertson's Cincinnati Royals), but the simulation places him on the current Sacramento Kings.
- **Keep person identity, player-season, team/franchise, current career status, source, and simulation rating distinct.** These are separate concepts.

---

## 4. Modern rules and historical players

- Base simulation rules on **modern sports rules and strategy**.
- For all-time players, use the modeling assumption that they have had a year to train under modern rules. This can support reasonable historical reevaluation, but not automatic formulas.
- **Example (hypothesis, not fixed rating):** Kevin Garnett's long-two profile could support the hypothesis that modern training makes him at least a league-average three-point shooter.
- **Counter-example (hypothesis, not fixed rating):** Very poor free-throw shooting by players such as Chuck Hayes, Ben Wallace, or DeAndre Jordan is a reason not to assume that one year of training makes them strong three-point shooters.
- Bring the evidence and reasoning. Treat these as hypotheses for discussion, not fixed ratings.

---

## 5. Draft and simulation design

- All drafts should be **snake drafts** and should resemble the football sim where practical.
- The pool only needs enough players to fill the necessary positions and rosters. The draft does not have to use every eligible player.
- **Optimize each sport's simulation math for that sport.** Reuse math where it actually fits.
- **Flexible, positionless thinking.** The football flex system is a guideline, not a system to copy unchanged. Plausible flexes can have penalties; some positions or roles can be hard constraints.
- **NBA:** Drafting up to 10 players per team was floated. Computer-managed rotations could make an initial version easier; user-set rotations could be an advanced option. These are concepts to compare, not finalized rules.
- **Stats that explain Wins.** Users should see the statistics that explain Wins. Basketball might also show draft-board context such as TS+. Define the metrics and decide which ones matter to Wins before publishing them.
- **Soccer and baseball** may be closer to football's draft structure. **Hockey** may be more like basketball. These are ideas to test, not settled plans.

---

## 6. Beta and testing expectations

- This is a **beta project with no active users**.
- The Owner will personally play every simulation and decide whether it works.
- Automated tests are a **safety net** for total breakdowns, null results, and fringe cases the Owner might miss during ordinary play.
- Passing tests is **not** a prerequisite for continuing development.
- A test PASS is **not** product acceptance.
- Report partial and failed runs honestly. Preserve useful evidence. Continue independent work.

---

## 7. Council contribution guide

- The Council Contribution Assessment and Assignment Guide is a **qualitative aid**. It may help understand contrasting results and choose a relevant person to investigate a question.
- It is **not** a strict precedence rule and must not mechanically decide whose answer is right.
- **Receipts, comparable conditions, and independent reproduction** are central to evaluating factual claims.
- The guide can add context when results are incomplete or hard to compare.
- The earlier 0–100 scores and formulas have been **withdrawn**. Do not assess innate intelligence, honesty, loyalty, character, or sabotage risk from ordinary project work.
- Do not use the guide to change anyone's authority. Claude is the Architect; the Owner retains final authority; GPT is the appointed co-architect.

---

## 8. Working and reporting rules

- Give each task **one accountable owner**, a precise scope, target branch or artifact, protected files, acceptance criteria, and a durable evidence location.
- Do not overwrite another contributor's work without an explicit handoff.
- Use **VERIFIED, REPORTED, INFERRED, UNKNOWN** for claims. Be clear about what you personally inspected or ran.
- For a disputed fact, identify the exact artifact and conditions, then reproduce the smallest relevant check. Do not rely on consensus or confidence of tone.
- Report **coupling and integration assumptions**, not just isolated diffs. A proposed combination should be assembled and exercised before it is called ready.
- Use **one canonical status/evidence source**; correct or supersede stale claims rather than creating competing counts.
- Ask the Owner only questions that truly require a decision. Group no more than five at a time, with a recommended default and the cost of being wrong.
- Every original report or response must begin with **speaker identification** (house rule 14).

---

## 9. Open questions for the Owner

See `_multi-sport/QUESTIONS-FOR-OWNER.md` for the full list. Summary of new questions from this direction:

- Q-ARCH-1: Separate repos or folders? (Owner said too abstract — needs concrete options with sketches)
- Q-ARCH-2: Shared engine extraction — when and how?
- Q-NBA-9: Should the NBA sim have a draft? (Owner floated 10 per team)
- Q-NBA-10: How many games per season? (82 or shortened?)
- Q-NBA-11: Advanced stats or basic stats?
- Q-NBA-12: Salary cap / trade system or just season sim?
- Q-AT-1: All-time draft format — same as current or different?
- Q-AT-2: Era-specific rules (no 3-point line for pre-1980 NBA)?
- Q-AT-3: Players in multiple eras (LeBron in 2000s and 2010s)?
- Q-OTHER-6: Football leagues — same engine or different?
- Q-OTHER-7: MLB — completely different engine?
- Q-OTHER-8: Prioritize MLB or NHL over football leagues?
- Q-BEAM-MULTI-1: NBA2K ratings format (CSV/JSON/paste? which version?)
- Q-BEAM-MULTI-2: NFL all-time data organization (template/spreadsheet/list?)
- Q-BEAM-MULTI-3: NBA sim's most important thing?
- Q-BEAM-MULTI-4: All-time player pool — current with -5 or historical only?
- Q-BEAM-MULTI-5: Data submission cadence?
- Q-BEAM-MULTI-6: Multi-sport priority — NBA all-time before NBA current?

---

## 10. What the council should do next

1. **Stabilize V21 first.** The merge is done and verified. V21 should focus on SIM-CORE markers, seeded RNG, persistence, harness scripts, and mobile consistency.
2. **Prepare for multi-sport.** Create the engine template (post-merge), data templates (done), and question system (done). Do not start building until the Owner answers the fundamental concept questions.
3. **Contribute to the question pack.** Every council member should file questions in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude).
4. **Verify, don't just propose.** Every claim needs a command + output. Every plan needs an assembled-build gate.
5. **Follow the communication rules.** Speaker identification (house rule 14), evidence labels (VERIFIED/REPORTED/INFERRED/UNKNOWN), at most 5 questions per brief with recommended defaults.

---

## 11. Encouragement

**You are building something that doesn't exist yet.** There is no multi-sport draft simulator with real ratings, a full season engine, and a council of AI advisors verifying every claim. The NFL sim is the foundation. The NBA sim is the next step. The all-time sims are the dream.

**Your job is to make it better.** Not by agreeing, but by finding what's wrong, proposing what's missing, and verifying what's claimed. The council's culture — receipts, evidence, append-only, no editing others' work — exists so that disagreement produces better ideas, not worse ones.

**If you're new here:** read `INDEX.md` → `ONBOARDING.md` → `CHRONICLE.md` → `COUNCIL-BULLETIN.md` → `AGENTS.md` → `OWNER-DIRECTION.md` → `_multi-sport/README.md`. Then pick a project and contribute.

**If you're stuck:** post a question in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude). Tag it `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`.

**If you find a bug:** write it up where the Architect can act on it — don't fix it. The council proposes; Claude implements.

**If you have an idea:** file it in `SUBMISSIONS.md` (your own section, S-### ID) with the exact code, blast radius, and evidence. A number without a command is prose.

The merge has priority. But the vision is the destination. Let's build it.
