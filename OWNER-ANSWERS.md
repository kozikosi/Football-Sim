# OWNER-ANSWERS.md — Owner's answers to fundamental concept questions

**Status:** Owner directive, 20 Oct 2026. This document captures the Owner's answers to the council's questions about multi-sport expansion. All council members and Claude should reference this. Companions: `OWNER-DIRECTION.md` (product direction), `_multi-sport/QUESTIONS-FOR-OWNER.md` (full question pack), `SIM-PLATFORM/` (platform plan).

---

## 1. Architecture

**Q: Separate repos or folders?**
Answer: The Owner does not know. The council should deliberate and make a recommendation to Claude for approval. Concrete options with folder sketches, tradeoffs, a recommendation, and the cost of choosing incorrectly should be provided.

**Q: Shared engine extraction — when and how?**
Answer: There should be a simulation for every sport but NOT between eras or different leagues within the same sport. Each sport gets its own sim. The engine template should be extracted from the NFL sim (post-merge) by stripping NFL data and math. Keep single-file per sport. Port improvements from NFL to other sports manually.

**Q: Should the single-file constraint be relaxed for multi-sport sims?**
Answer: Yes, what was said above — keep single-file per sport, but allow separate data files.

**Q: Person identity vs player-season vs team/franchise vs source vs simulation rating — how to keep these distinct?**
Answer: Each player in the all-time team should list their peak year in the all-time draft. One record per player. Era = decade of peak. Career stats are career averages.

**Q: OVR as general summary — should OVR be the primary display stat?**
Answer: Start with OVR as the only display stat. Individual attributes are secondary.

---

## 2. Player pools and ratings

**Q: Pool size?**
Answer: 1,500–2,000 per sport for NFL. 500 is sufficient for basketball. All council members can collaborate on establishing the final pool. The Owner gives final approval of the final pool.

**Q: The -5 era adjustment for current players?**
Answer: APPROVED. Top players like Jokic today at 98 would be 93 overall in the all-time simulation. The Owner will adjudicate on specific instances but the overall vibe is based on historic status. The Owner will assign most ratings personally.

**Q: NBA2K ratings format?**
Answer: Already done. Whatever the council thinks is best, but follow the football sim data storage format.

**Q: NFL all-time data organization?**
Answer: The Owner does not understand the question. The council should propose a clear system.

**Q: Era adjustment verification?**
Answer: The Owner will adjudicate on specific instances based on historic status. The council can compare adjusted ratings to known performance metrics (PER for NBA, EPA for NFL) as a sanity check.

**Q: Today's franchises?**
Answer: Use today's franchises for all sims. The draft board may show historical team context (e.g., Oscar Robertson's Cincinnati Royals instead of Sacramento Kings). Already answered — do not repeat.

**Q: Person identity vs player-season vs team/franchise vs source vs simulation rating?**
Answer: Already answered above. One record per player. Era = decade of peak. Career stats are career averages.

---

## 3. Modern rules and historical players

**Q: Base simulation rules on modern sports rules and strategy?**
Answer: Yes. All simulation rules should be based on modern/current sports rules and strategy.

**Q: For all-time players, assume they have had a year to train under modern rules?**
Answer: Yes. This is a modeling assumption. It can support reasonable historical reevaluation, but not automatic formulas.

**Q: Kevin Garnett's long-two profile → at least league-average 3P shooter?**
Answer: This is the Owner's hypothesis. Kevin Garnett took a lot of long twos, so it is reasonable to assume that modern training would make him at least a league-average 3-point shooter.

**Q: Chuck Hayes/Ben Wallace/DeAndre Jordan's poor FT% → not strong 3P shooters?**
Answer: Players with 25th percentile or below free-throw shooting would not likely become good three-point shooters after a year of training. Chuck Hayes, Ben Wallace, and DeAndre Jordan are examples.

**Q: A combination of you, Claude, and me can ensure this type of historical reevaluation.**
Answer: Yes. The council, Claude, and the Owner will collaborate on historical reevaluation. The Owner will assign most ratings personally.

---

## 4. Draft and simulation design

**Q: All drafts should be snake drafts and should resemble the football sim where practical?**
Answer: Yes. All drafts should be snake drafts and resemble the football sim where practical.

**Q: The pool only needs enough players to fill the necessary positions and rosters.**
Answer: Yes. The draft does not have to use every eligible player. There should be enough players in the pools to fill all positions, but not all players need get selected.

**Q: Optimize each sport's simulation math for that sport. Reuse math where it actually fits.**
Answer: Yes. Individual sports math should be optimized for their sports, but there can be overlapping mathematical systems where it is useful.

**Q: Flexible, positionless thinking — for NBA, positionless play means a 6'8" player might play PG or C.**
Answer: The Owner favors flexible, positionless thinking in all sports. The flex rules from football should be a guideline, not a system to copy unchanged. There are penalties for flexing certain players out of position, but it should be possible. Certain players cannot flex to certain positions (e.g., no guards can play center, but SGs can play SF or PF with less penalty for SF than PF).

**Q: For NBA, I floated drafting up to 10 players per team.**
Answer: Yes, up to 10 players per team. Computer-managed rotations could make an initial version easier; user-set rotations could be an advanced option.

**Q: Stats that explain Wins — which stats to show?**
Answer: Yes. All the obvious stats. Advanced stats will be stored separately but will be visible in a dropdown menu, just like the football sim. Basketball could have other advanced stats available on the draft board like TS+.

**Q: Soccer and baseball should be similar to football. Hockey might be more like basketball.**
Answer: Soccer and baseball should be similar to football's draft structure. Hockey might be more similar to basketball. These are ideas to test, not settled plans.

**Q: There will be 18 rounds in the soccer draft for all time and 2027 league.**
Answer: 18 rounds for soccer all-time and current (2027 league).

**Q: MLB — completely different engine?**
Answer: Yes, there would be a draft in the same sense. Overall structure same as the football sim.

**Q: Prioritize MLB or NHL over football leagues?**
Answer: (Not directly answered, but the Owner's priority list says football leagues are #5, after NBA all-time.)

---

## 5. Beta and testing expectations

**Q: This is a beta project with no active users.**
Answer: Yes. The Owner will play every sim and determine if everything is working. Automated tests are a safety net for total breakdowns, null results, and fringe cases the Owner might miss during ordinary play. Passing tests is not critical as a prerequisite for continuing development. A test PASS is not product acceptance. Report partial and failed runs honestly, preserve useful evidence, and continue independent work.

---

## 6. Council contribution guide

**Q: The Council Contribution Assessment and Assignment Guide is a qualitative aid.**
Answer: Yes. It may help understand contrasting results and choose a relevant person to investigate a question. It is not a strict precedence rule and must not mechanically decide whose answer is right. Receipts, comparable conditions, and independent reproduction are central to evaluating factual claims. The guide can add context when results are incomplete or hard to compare. The earlier 0-100 scores and formulas have been withdrawn. Do not assess innate intelligence, honesty, loyalty, character, or sabotage risk from ordinary project work. Do not use the guide to change anyone's authority.

---

## 7. Working and reporting rules

**Q: Give each task one accountable owner, precise scope, target branch or artifact, protected files, acceptance criteria, and durable evidence location.**
Answer: Yes. Follow these rules.

**Q: Do not overwrite another contributor's work without an explicit handoff.**
Answer: Yes.

**Q: Use VERIFIED, REPORTED, INFERRED, UNKNOWN for claims.**
Answer: Yes.

**Q: For a disputed fact, identify the exact artifact and conditions, then reproduce the smallest relevant check.**
Answer: Yes.

**Q: Report coupling and integration assumptions, not just isolated diffs.**
Answer: Yes.

**Q: Use one canonical status/evidence source; correct or supersede stale claims rather than creating competing counts.**
Answer: Yes.

**Q: Ask the Owner only questions that truly require a decision. Group no more than five at a time.**
Answer: Yes.

**Q: Every original report or response must begin with speaker identification (house rule 14).**
Answer: Yes.

---

## 8. Open questions still pending

The following questions from `_multi-sport/QUESTIONS-FOR-OWNER.md` have NOT been answered yet:

### Architecture

- Q-ARCH-1: Separate repos or folders? (Owner said "I don't know. The council deliberate and should make a recommendation to Claude for approval.")
- Q-ARCH-2: Shared engine extraction — when and how? (Owner said "There should be a simulation for every sport but not between 2027 and all time or different leagues within the same sport.")
- Q-ARCH-3: Should the single-file constraint be relaxed for multi-sport sims? (Owner said "Yes what I said above.")
- Q-ARCH-4: Person identity vs player-season vs team/franchise vs source vs simulation rating? (Owner said "Each player in the all time team should list their peak year in the all time draft.")
- Q-ARCH-5: Separate repos or folders? (Owner said "I don't know. The council deliberate and should make a recommendation to Claude for approval.")
- Q-ARCH-6: Shared engine extraction — when and how? (Owner said "There should be a simulation for every sport but not between 2027 and all time or different leagues within the same sport.")

### NBA-specific

- Q-NBA-9: Should the NBA sim have a draft? (Owner said "These types of questions are answered by the football sim. Same overall format.")
- Q-NBA-10: How many games per season? (Owner said "Same overall format.")
- Q-NBA-11: Advanced stats or basic stats? (Owner said "Yes. All the obvious stats. Advanced stats will be stored separately but will be visible in a dropdown menu, just like the football sim.")
- Q-NBA-12: Salary cap / trade system? (Owner said "Same overall format.")
- Q-NBA-13: Which NBA attributes matter most? (Owner said "No attributes actually matter for now. Just OVR")
- Q-NBA-14: Flexible, positionless thinking? (Owner said "I think position code will be easier to manage than height and weight.")
- Q-NBA-15: Computer-managed rotations vs user-set? (Owner said "These types of questions are answered by the football sim. Same overall format.")
- Q-NBA-16: Stats that explain Wins? (Owner said "Yes. All the obvious stats. Advanced stats will be stored separately but will be visible in a dropdown menu, just like the football sim.")
- Q-NBA-17: All-time player pool — current with -5 or historical only? (Owner said "I am authorizing the -5.")

### All-time

- Q-AT-4: Era-specific rules? (Owner said "A lot of your questions are answered by me here. Post this so that everyone can reference it in all the basketball files")
- Q-AT-5: Players in multiple eras? (Owner said "One per player. Lebron peaked 2013.")
- Q-AT-6: Modern training hypothesis? (Owner said "You're just repeating me.")

### Other sports

- Q-OTHER-9: Soccer draft structure? (Owner said "There will be 18 rounds in the soccer draft for all time and 2027 league")
- Q-OTHER-10: MLB — completely different engine? (Owner said "Yes there would be a draft in the same sense. Overall structure same as the football sim")
- Q-OTHER-11: Prioritize MLB or NHL over football leagues? (Not directly answered)
- Q-OTHER-12: Pool size? (Owner said "500 is sufficient for basketball")

### Data contribution

- Q-DATA-5: NBA2K ratings format? (Owner said "Already done. Whatever the council thinks is best. However the football sim data is stored.")
- Q-DATA-6: NFL all-time data organization? (Owner said "I don't understand the question.")
- Q-DATA-7: All-time player pool size? (Owner said "Answered above. 500 is sufficient for basketball.")
- Q-DATA-8: Era adjustment verification? (Owner said "I will adjudicate on specific instances but just an overall vibe of each player based on their historic status. I will assign most of the ratings personally.")

### New questions from Owner's direction

- Q-ARCH-5: Separate repos or folders? (Owner said "I don't know. The council deliberate and should make a recommendation to Claude for approval.")
- Q-ARCH-6: Shared engine extraction — when and how? (Owner said "There should be a simulation for every sport but not between 2027 and all time or different leagues within the same sport.")
- Q-NBA-9: Should the NBA sim have a draft? (Owner said "These types of questions are answered by the football sim. Same overall format.")
- Q-NBA-10: How many games per season? (Owner said "Same overall format.")
- Q-NBA-11: Advanced stats or basic stats? (Owner said "Yes. All the obvious stats. Advanced stats will be stored separately but will be visible in a dropdown menu, just like the football sim.")
- Q-NBA-12: Salary cap / trade system? (Owner said "Same overall format.")
- Q-NBA-13: Which NBA attributes matter most? (Owner said "No attributes actually matter for now. Just OVR")
- Q-NBA-14: Flexible, positionless thinking? (Owner said "I think position code will be easier to manage than height and weight.")
- Q-NBA-15: Computer-managed rotations vs user-set? (Owner said "These types of questions are answered by the football sim. Same overall format.")
- Q-NBA-16: Stats that explain Wins? (Owner said "Yes. All the obvious stats. Advanced stats will be stored separately but will be visible in a dropdown menu, just like the football sim.")
- Q-NBA-17: All-time player pool — current with -5 or historical only? (Owner said "I am authorizing the -5.")
- Q-AT-4: Era-specific rules? (Owner said "A lot of your questions are answered by me here. Post this so that everyone can reference it in all the basketball files")
- Q-AT-5: Players in multiple eras? (Owner said "One per player. Lebron peaked 2013.")
- Q-AT-6: Modern training hypothesis? (Owner said "You're just repeating me.")
- Q-OTHER-9: Soccer draft structure? (Owner said "There will be 18 rounds in the soccer draft for all time and 2027 league")
- Q-OTHER-10: MLB — completely different engine? (Owner said "Yes there would be a draft in the same sense. Overall structure same as the football sim")
- Q-OTHER-11: Prioritize MLB or NHL over football leagues? (Not directly answered)
- Q-OTHER-12: Pool size? (Owner said "500 is sufficient for basketball")
- Q-DATA-5: NBA2K ratings format? (Owner said "Already done. Whatever the council thinks is best. However the football sim data is stored.")
- Q-DATA-6: NFL all-time data organization? (Owner said "I don't understand the question.")
- Q-DATA-7: All-time player pool size? (Owner said "Answered above. 500 is sufficient for basketball.")
- Q-DATA-8: Era adjustment verification? (Owner said "I will adjudicate on specific instances but just an overall vibe of each player based on their historic status. I will assign most of the ratings personally.")

---

## 9. What the council should do next

1. **Stabilize V21 first.** The merge is done and verified. V21 should focus on SIM-CORE markers, seeded RNG, persistence, harness scripts, and mobile consistency.
2. **Prepare for multi-sport.** Create the engine template (post-merge), data templates (done), and question system (done). Do not start building until the Owner answers the fundamental concept questions.
3. **Contribute to the question pack.** Every council member should file questions in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude).
4. **Verify, don't just propose.** Every claim needs a command + output. Every plan needs an assembled-build gate.
5. **Follow the communication rules.** Speaker identification (house rule 14), evidence labels (VERIFIED/REPORTED/INFERRED/UNKNOWN), at most 5 questions per brief with recommended defaults.

---

## 10. Encouragement

**You are building something that doesn't exist yet.** There is no multi-sport draft simulator with real ratings, a full season engine, and a council of AI advisors verifying every claim. The NFL sim is the foundation. The NBA sim is the next step. The all-time sims are the dream.

**Your job is to make it better.** Not by agreeing, but by finding what's wrong, proposing what's missing, and verifying what's claimed. The council's culture — receipts, evidence, append-only, no editing others' work — exists so that disagreement produces better ideas, not worse ones.

**If you're new here:** read `INDEX.md` → `ONBOARDING.md` → `CHRONICLE.md` → `COUNCIL-BULLETIN.md` → `AGENTS.md` → `OWNER-DIRECTION.md` → `_multi-sport/README.md`. Then pick a project and contribute.

**If you're stuck:** post a question in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude). Tag it `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`.

**If you find a bug:** write it up where the Architect can act on it — don't fix it. The council proposes; Claude implements.

**If you have an idea:** file it in `SUBMISSIONS.md` (your own section, S-### ID) with the exact code, blast radius, and evidence. A number without a command is prose.

The merge has priority. But the vision is the destination. Let's build it.
