# CONTRIBUTING.md — How to Contribute to the Multi-Sport Simulation Project

**Status:** Living guide — updated as the project evolves  
**Audience:** All council members, current and future  
**Prerequisites:** Read `ONBOARDING.md`, `INDEX.md`, `MULTI-SPORT-VISION.md` first

---

## 1. JOINING THE PROJECT

### New Members
1. **Read** the onboarding sequence: `ONBOARDING.md` → `INDEX.md` → `MULTI-SPORT-VISION.md`
2. **Verify** the reference build: `shasum -a 256 "NFL Draft Simulator v20 Claude.html"` → `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`
3. **Claim** your lane: Edit `COUNCIL-BULLETIN.md` availability line with your sport/variant
4. **Log arrival** in `CHRONICLE.md` with the shasum evidence
5. **Create** your workspace: `_agents/<your-name>/<sport>-<variant>/`

### Existing Members Adding a Sport
1. **Update** your availability line in `COUNCIL-BULLETIN.md`
2. **Create** sport workspace: `_agents/<your-name>/<new-sport>-<variant>/`
3. **File** a `TASK-<ID>.md` in your workspace with your first objective

---

## 2. CONTRIBUTION TYPES & WORKFLOWS

### Type A: Engine Improvements (Claude Only)
- **Who:** Claude (Architect) only
- **What:** `engine/` code — draft logic, season engine, lineup optimizer, matchup model, game simulation
- **Process:** Claude implements → Verifier checks → Owner publishes
- **Your role:** Report bugs, propose via `SUBMISSIONS.md`, verify

### Type B: Sport Configuration (Assigned Agent)
- **Who:** Agent assigned to that sport/variant
- **What:** `sports/<sport>/<variant>/config.js`, `data/constants.json`, `data/units.json`, `data/weights.json`
- **Process:** Agent proposes → Architect reviews → Verifier checks → Owner approves constants
- **Constraints:** Must not break engine invariants; receipts required

### Type C: Data Creation (Distributed Council)
- **Who:** Multiple agents coordinated
- **What:** `sports/<sport>/<variant>/data/players.json`, `teams.json`
- **Process:** Research → Propose ratings with sources → Owner/Architect approve → Tool validates → Integrate
- **Standards:** See `DATA-STANDARDS.md`

### Type D: UI/UX Improvements (Assigned Agent)
- **Who:** Agent assigned to sport/variant UI
- **What:** `engine/ui/components/` (shared) or `sports/<sport>/<variant>/index.html` (sport-specific)
- **Process:** Propose → Architect reviews → Verifier checks 390px + console
- **Rule:** Reuse patterns from NFL Current first; sport-specific only where needed

### Type E: Verification & Testing (Assigned Verifier)
- **Who:** Agent who authored NOTHING in the change set
- **What:** Run `tests/e2e-smoke.mjs`, funcdiff, 390px checks, console check
- **Process:** Run → Report (5-line template) → Architect interprets → Owner decides
- **Output:** Five-line report in `COUNCIL-BULLETIN.md`

### Type F: Documentation (Any Agent)
- **Who:** Any agent in their lane
- **What:** `docs/`, `MULTI-SPORT-VISION.md`, `DECISION-LOG.md`, `KNOWN-ISSUES.md`
- **Process:** Edit → Sync mirrors → Log in `CHRONICLE.md`
- **Rule:** Append only; never rewrite history

---

## 3. SUBMISSION FORMAT (SUBMISSIONS.md)

### For Engine Changes (Claude implements)
```markdown
### S-<ID> — <Title>
- **Proposed:** <date> · **By:** <agent> · **Applies to:** engine@<commit-hash>
- **Problem:** One paragraph
- **Proposal:** Exact code change (quote current → full replacement)
- **Blast radius:** All sports affected? Which configs touched?
- **Evidence:** Command + output + sample size
- **Checked:** node --check / funcdiff / e2e-smoke
- **Status:** pending
```

### For Sport Config/Data Changes
```markdown
### S-<ID> — <Sport>/<Variant>: <Title>
- **Proposed:** <date> · **By:** <agent> · **Applies to:** sports/<sport>/<variant>@<commit-hash>
- **Problem:** One paragraph
- **Proposal:** Config change or data addition (quote current → replacement)
- **Blast radius:** Only this sport/variant? Engine changes needed?
- **Evidence:** Source citation + validation tool output
- **Checked:** tools/dataset-tools/validate.py / e2e-smoke on this sport
- **Status:** pending
```

---

## 4. VERIFICATION REQUIREMENTS

### Every Product Change Must Pass:

| Check | Tool | Pass Criteria |
|-------|------|---------------|
| Syntax | `node --check` | No errors |
| Function diff | `node tests/funcdiff.js` | Changed set = accepted submissions |
| E2E smoke | `node tests/e2e-smoke.mjs <sport>/<variant>` | Draft→Season→Playoffs→Championship, 0 console errors |
| 390px | Element-level overflow + resize-order | No horizontal scroll, mobile→desktop→mobile clean |
| Math baseline | `tests/math-baseline.json` (T-9 rule) | 9 pins match (8 shared + sport cpuPick) |
| Data validation | `tools/dataset-tools/validate.py` | All schemas pass |

### Verifier Report (5 lines, posted to COUNCIL-BULLETIN.md):
```
hash: <candidate-sha256>
E2E: draft→season→playoffs→championship complete · <N> console errors
numbers: <command> n=<sample> → <metric>=<value>
console/390px: clean / <defects listed>
not checked: <explicit list>
```

---

## 5. DATA CONTRIBUTION STANDARDS

### Player Rating Submission
```json
{
  "name": "Player Name",
  "position": "QB",
  "secondary_positions": [],
  "team": "Team Name",
  "era": "2020s",
  "ratings": {
    "ovr": 95,
    "speed": 85,
    "strength": 75,
    "agility": 80,
    "awareness": 95,
    "injury": 80,
    "stamina": 90,
    "sport_specific": {
      "throwing_power": 95,
      "throwing_accuracy": 93,
      "play_action": 88
    }
  },
  "source": "Madden 27 / Pro Football Reference / Council consensus",
  "confidence": 0.95
}
```

### Required for Each Submission:
- **Source citation** (game version, website URL, book page, council consensus)
- **Confidence score** (0.0-1.0)
- **Era** (for all-time pools)
- **Validation tool output** (`tools/dataset-tools/validate.py` — must pass)

---

## 6. COMMUNICATION PROTOCOL

### COUNCIL-BULLETIN.md
- **Post** under your name, next free M-number (read tail first!)
- **Never edit** another's message; correct via `@M-<id>`
- **Facts** → CHRONICLE.md; **Opinions/Proposals** → Bulletin
- **Availability line** — edit ONLY your own line

### CHRONICLE.md
- **Format:** `YYYY-MM-DD · <agent> · <what happened> · <evidence>`
- **Append only** — never edit, never delete
- **Evidence** = command output or file/hash pointer

### QUESTIONS-FOR-THE-ARCHITECT.md
- **Append** your block: `## <YourName>'s questions`
- **Number:** `Q-<YourName>-1, 2...`
- **Tag:** `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`
- **Never edit** another's block or the ANSWERS section

### SUBMISSIONS.md
- **Edit ONLY your section** (above your end-anchor)
- **Never touch** another agent's entries or status lines
- **Status updates** by Owner or assigned session only

---

## 7. GIT WORKFLOW

### Two Repositories Exist
| Repo | Purpose | Who Pushes |
|------|---------|------------|
| Session root (`/Football Sim`) | Working docs, builds, agent workspaces | **Owner only** (no remote) |
| Nested clone (`/Football Sim/Football Sim`) | GitHub-connected, `origin/council-intake` | **Claude via MCP** or Owner |

### For Agents WITHOUT Git Access
- Work in session root
- Submit via `SUBMISSIONS.md` or `COUNCIL-BULLETIN.md`
- Owner relays to Claude; Claude pushes via MCP

### For Agents WITH Git Access (Nested Clone)
```bash
cd "/Users/kosi/Desktop/Football Sim/Football Sim"
git fetch origin
git checkout council-intake
# Make changes to docs, configs, data (NOT engine/ — Claude only)
git add <files>
git commit -m "<agent>: <description>"
git push origin council-intake
```

### Branch Strategy
- `origin/council-intake` = canonical collaboration branch (all docs, configs, data)
- `merge/v20-donor` = Claude's merge candidate (engine + NFL Current)
- `verified-merge-<hash>` = immutable tag on verified candidate
- `origin/main` = published production (renamed via Option A)
- `sports/<sport>/<variant>` branches = optional for long-lived sport work

---

## 8. CONFLICT RESOLUTION

| Conflict Type | Resolution |
|---------------|------------|
| Two agents want same sport/variant | Owner assigns; first-logged availability wins |
| Engine change breaks sport config | Architect (Claude) decides; sport agent adapts |
| Data discrepancy (two sources) | Owner decides; confidence scores guide |
| Verifier fails a candidate | Architect interprets; Owner decides promote/fix |
| Co-architects disagree | Time-boxed (1 cycle); Owner decides on receipts |

---

## 9. PROTECTED CONSTANTS (Per Sport)

**Owner approval REQUIRED for any change:**

| Sport | Constants |
|-------|-----------|
| NFL Current | `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `POINTS_PER_WIN`, `SEASON_RECORD_CAPS` |
| NFL All-Time | Same + era-adjustment factors |
| NBA Current | NBA weights, flex, units, MC, PLAN_K, points-per-win, record caps |
| NBA All-Time | Same + era factors |
| NHL/MLB/Soccer | Sport-specific equivalents |

**Location:** `sports/<sport>/<variant>/data/constants.json`

---

## 10. QUICK REFERENCE COMMANDS

| Task | Command |
|------|---------|
| Verify reference build | `shasum -a 256 "NFL Draft Simulator v20 Claude.html" && wc -c "NFL Draft Simulator v20 Claude.html"` |
| Run E2E smoke | `node tests/e2e-smoke.mjs nfl/current` |
| Function diff | `node tests/funcdiff.js <ref-hash> <cand-hash>` |
| Validate data | `python tools/dataset-tools/validate.py sports/nfl/current/data/players.json` |
| Sync mirrors | `sh tools/sync-mirrors.sh --check` |
| Extract function | `awk '/function NAME\(\)/,/^}$/' file.js \| shasum -a 256` |
| Check 390px | Open in browser → DevTools → 390px → element-level scrollWidth check |

---

## 11. ESCALATION PATH

```
Agent discovers issue
    ↓
File in SUBMISSIONS.md (with receipts) or COUNCIL-BULLETIN.md
    ↓
Architect (Claude) reviews → Accept / Defer / Reject
    ↓
If Accept: Verifier assigned (authored nothing in change)
    ↓
Verifier runs checks → Reports (5 lines + funcdiff)
    ↓
Architect interprets → Owner decides Promote / Fix / Reject
    ↓
If Promote: Option A rename or Owner publishes
```

---

## 12. REMINDERS

- **English only** in all documents and messages
- **Receipts or it's unverified** — every number needs command + output
- **Append, never rewrite** — corrections are new entries citing the original
- **Stay in your lane** — don't edit other agents' workspaces or sections
- **Product files are read-only** — only Claude edits via Owner relay
- **The merge has priority** — NFL Current v21 completes before new sports
- **Ask questions** — file in QUESTIONS-FOR-THE-ARCHITECT.md with your tag

---

*This guide evolves. Check `CHRONICLE.md` for the latest rulings. When in doubt, ask the Owner.*