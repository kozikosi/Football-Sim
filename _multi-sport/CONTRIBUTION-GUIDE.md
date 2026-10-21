# CONTRIBUTION-GUIDE.md — how agents contribute to the multi-sport expansion

**Purpose.** A guide for council agents contributing to the multi-sport expansion projects. Companions: `README.md` (master roadmap), `STRUCTURE.md` (folder structure), `QUESTIONS-FOR-OWNER.md` (fundamental concept questions).

---

## 1. Before you start

1. **Read the master roadmap** (`README.md`) — understand the vision, the priority order, and the architecture decision.
2. **Read the structure guide** (`STRUCTURE.md`) — understand the folder structure and the template extraction approach.
3. **Read the NFL sim's AGENTS.md** — the operator rules apply here too (English only, no product edits without Claude, evidence tags, append-only).
4. **Pick a project** from the priority list (or propose a new one).
5. **Read the relevant sport's folder** — understand the data format, the math, and the UI.

## 2. How to contribute

### Step 1: Claim your work

- Check `SUBMISSIONS.md` for existing entries on the same topic.
- Check the bulletin (`COUNCIL-BULLETIN.md`) for in-flight work.
- File a submission in your own section of `SUBMISSIONS.md` (S-### ID, from your ID block).
- Post a bulletin message announcing your claim (read the tail first, take next free M-number).

### Step 2: Do the work

- Work in your own lane (`_agents/<your-name>/` for notes, `_multi-sport/<sport>/` for sport-specific files).
- Follow the NFL sim's patterns (data layer, core math, season engine, playoffs, awards, matchup model).
- Adapt the math for the sport (position weights, flex rules, matchup model coefficients).
- Create the player data (with sources — no invented ratings).
- Create the team data (depth charts, roster slots).
- Adapt the UI (position names, stat columns, award names).

### Step 3: Verify

- Run `node --check` on any JS you write.
- If harness scripts exist, run them.
- Check mobile layout at 390px (element-level overflow, not just `scrollWidth`).
- Tag claims as *verified* / *reported* / *inferred* / *unverified* (rule 11).

### Step 4: Submit

- File your submission in `SUBMISSIONS.md` (your own section, S-### ID).
- Include: build hash (if applicable), exact code, blast radius, evidence, what you checked.
- Post a bulletin message with a summary and a link to your submission.
- Log your work in `CHRONICLE.md` with a command you actually ran.

## 3. Contribution rules

1. **English only** (rule 7). Every document, log, message, and code comment in English.
2. **Append, never rewrite** (rule 2). Never edit another agent's files or messages.
3. **Evidence tags** (rule 11). Every claim carries a command + output, or is labelled *reported/inferred/unverified*.
4. **Counts name units** (rule 10). "58 occurrences on 39 lines," not "58."
5. **Next free M-number** (rule 9). Read the tail first; on collision, take the next free and cite the collision.
6. **No product edits.** The council proposes; Claude implements. Do not edit `sim.html` files directly.
7. **No invented ratings.** Every player rating must be sourced (Owner input, consensus, or cited reference).
8. **No touching protected constants** without Owner approval (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` — or their sport-specific equivalents).
9. **Stay in your lane.** Work in `_agents/<your-name>/` and `_multi-sport/<sport>/`. Do not edit other agents' files or the NFL sim's product files.

## 4. Data contribution guidelines

### Player data

- **Format:** `[name, pos, team, ovr, ...attributes]` (sport-specific attributes)
- **Source:** Owner input (NBA2K ratings, Madden ratings), collective creation (all-time), or cited reference
- **Era adjustment:** for all-time sims, apply the Owner's era adjustment rules (see QUESTIONS-FOR-OWNER.md)
- **Position balance:** ensure roughly equal representation across positions
- **Verification:** every rating must be traceable to a source

### Team data

- **Format:** `{ teamName: { slot: { ovr, name } } }` (NFL) or sport-specific equivalent
- **Source:** real depth charts (current) or constructed (all-time)
- **Verification:** every team must have a complete roster

### Position weights

- **Format:** `{ position: weight }` (e.g., `{ QB: 320, OT: 295 }`)
- **Source:** council consensus, Owner guidance, or analytical derivation
- **Protected:** position weights are protected constants (like DEFAULT_WEIGHTS in the NFL sim) — change only with Owner approval

## 5. Math contribution guidelines

- **Matchup model:** adapt the NFL sim's unit-rating → points model for the sport. Document the formula, the coefficients, and the game-plan adjustments.
- **Season engine:** adapt the NFL sim's 17-game schedule + 14-team playoff bracket for the sport's schedule length and playoff format.
- **Awards:** adapt the NFL sim's awards framework for the sport's awards.
- **Flex rules:** define which positions can play which slots and the rating penalty. Document the flex matrix.
- **Protected constants:** sport-specific equivalents of DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS. Change only with Owner approval.

## 6. Encouragement

**You are building something that doesn't exist yet.** There is no multi-sport draft simulator with real ratings, a full season engine, and a council of AI advisors verifying every claim. The NFL sim is the foundation. The NBA sim is the next step. The all-time sims are the dream.

**Your job is to make it better.** Not by agreeing, but by finding what's wrong, proposing what's missing, and verifying what's claimed. The council's culture — receipts, evidence, append-only, no editing others' work — exists so that disagreement produces better ideas, not worse ones.

**If you're new here:** read `INDEX.md` → `ONBOARDING.md` → `CHRONICLE.md` → `COUNCIL-BULLETIN.md` → `AGENTS.md` → `_multi-sport/README.md` → `_multi-sport/STRUCTURE.md` → `_multi-sport/CONTRIBUTION-GUIDE.md`. Then pick a project and contribute.

**If you're stuck:** post a question in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude). Tag it `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`.

**If you find a bug:** write it up where the Architect can act on it — don't fix it. The council proposes; Claude implements.

**If you have an idea:** file it in `SUBMISSIONS.md` (your own section, S-### ID) with the exact code, blast radius, and evidence. A number without a command is prose.

The merge has priority. But the vision is the destination. Let's build it.
