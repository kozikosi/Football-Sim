# PROJECT KNOWLEDGE — Football Sim (20-0)

**Created:** 2026-10-22  
**Author:** UK (Council Advisor)  
**Last Updated:** 2026-10-23T09:46:21Z  
**Purpose:** Persistent project context for all future sessions. Read this FIRST before any work.

---

## ⚠️ TOKEN EFFICIENCY RULES (READ BEFORE EVERY PROMPT)

### When to Start a New Conversation
1. **Token usage exceeds ~50% of context window** → Stop and create new chat
2. **After 5+ consecutive prompts in same session** → Consider new chat
3. **After any major milestone** (merge, release, V22→V23) → Start new chat
4. **When responses start repeating or losing context** → New chat immediately
5. **When you find yourself re-reading files you already read** → New chat

### Warning Signs (Forceful Reminder)
- If you're about to write "I already mentioned..." → New chat
- If you're about to ask "What was the build hash again?" → New chat
- If you're about to say "As I mentioned earlier..." → New chat
- If the conversation feels like it's "drifting" → New chat
- If you've been given 3+ separate prompts without a new chat → New chat

### How to Start a New Conversation
1. **Copy this file's path** into the new chat: `PROJECT_KNOWLEDGE.md`
2. **Reference the Owner's latest prompt** in the new chat
3. **Do NOT re-explain the entire project** — just reference this file
4. **Start with the task at hand** — the project context is here

### Token Budget Guidance
- **Context window:** ~200K tokens
- **Safe zone:** 0-50% (0-100K tokens) — work freely
- **Caution zone:** 50-75% (100K-150K tokens) — start wrapping up
- **Danger zone:** 75-100% (150K-200K tokens) — STOP, start new chat
- **If unsure:** Start new chat. Better safe than sorry.

---

## 🏈 PROJECT IDENTITY

### **Product Name: "20-0"**
- **File name:** Football Sim (keep for file names)
- **Website/product name:** **20-0** (heavily emphasized in header, footer, text, UI)
- **Brand identity:** "Can you go 20-0?" — the ultimate challenge

### **What It Is**
A single-file HTML NFL Draft Simulator with:
- 1,200+ real Madden NFL 27 player ratings
- 32 team depth charts
- 32-team snake draft with CPU GMs
- Full season engine: 17 weeks, 14-team playoff bracket, Super Bowl, awards
- Matchup model: 9 unit ratings → exponential yardage/points model

### **Current Build**
- **V21 (live):** `Football-Sim-V21.html` (sha256 `044d1759…`, 656,746 B)
- **V22 (in progress):** `V22-Suggestions.md` → `Football-Sim-V22.html` (after verification)
- **Work order:** `V22-Suggestions.md` (3368+ lines, all feedback incorporated)

---

## 📋 OWNER'S PRODUCT DIRECTION (Priority Order)

1. **Improve current NFL sim + V21 polish** — highest priority
2. **Add all-time NFL simulation** — ~1,500 candidate players
3. **Build current NBA simulation** — basketball-specific math
4. **Build all-time NBA simulation** — based on NBA system
5. **Expand to MLB, NHL, soccer leagues** — current + all-time each

**Broader goal:** 8+ simulations for 4 major American sports (current + all-time), plus soccer leagues ranked above MLS + MLS.

**Data rules:**
- ~1,500-2,000 candidate players per sport (Owner approval required)
- Public data: integers only; internal: decimals OK
- No invented ratings — source + provenance required
- -5 all-time adjustment NOT approved
- Today's franchises in simulations; historical team context in draft board
- Keep person identity, player-season, team/franchise, career status, source, simulation rating distinct

**Modern rules for all-time players:** "They had a year to train under modern rules" — can support reasonable reevaluation, not automatic formulas.

---

## 🏗️ ARCHITECTURE (Provisional — Owner decision pending)

- **Per-sport rules and math** — optimize simulation math for each sport
- **Self-contained HTML per simulation** — one file per sport/variant
- **Shared engine extracted only after** NFL all-time or NBA proves real reuse
- **Snake drafts** for all sports
- **Pool only needs enough players** to fill positions/rosters
- **Flexible, positionless thinking** — flex system is guideline, not copy
- **Optimize math per sport** — reuse where it fits
- **NBA:** up to 10 players per team; computer-managed rotations (initial); user-set rotations (advanced)
- **Visible stats:** explain Wins; basketball might show TS+ on draft board
- **Soccer/baseball** closer to football draft structure; **hockey** more like basketball

---

## 📁 PROJECT STRUCTURE

### **Key Files**
| File | Purpose |
|------|---------|
| `V22-Suggestions.md` | Work order (3368+ lines) — all changes for V22 |
| `CLAUDE_PROMPT_V21_CHANGES.md` | Concise prompt for Claude |
| `PROJECT_KNOWLEDGE.md` | This file — persistent context |
| `STATUS.md` | Canonical facts (overwrite each cycle) |
| `COUNCIL-BULLETIN.md` | Council messages (append-only) |
| `CHRONICLE.md` | Facts log (append-only) |
| `SUBMISSIONS.md` | Proposals (S-### IDs) |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | Question pack |
| `AGENTS.md` | Operator rules |
| `ONBOARDING.md` | Joiner protocol |
| `MERGE-CHECKLIST.md` | 3-phase merge audit |
| `VERIFICATION-TEMPLATE.md` | 5-line report + funcdiff |
| `DECISION-LOG.md` | Architect rulings index |
| `KNOWN-ISSUES.md` | Defect tracker |
| `ROADMAP.md` | Phase 0-4 milestones |
| `ADVISOR-PLAYBOOK.md` | Quick reference for advisors |

### **Builds**
| File | Hash | Size | Purpose |
|------|------|------|---------|
| `Football-Sim-V21.html` | `044d1759…` | 656,746 B | Current live build |
| `NFL Draft Simulator v20 Claude.html` | `31b7d61f…` | 649,032 B | V20 reference |
| `NFL Draft Simulator.html` (donor) | `77bb9ed5…` | 650,127 B | Donor build |
| `merged.html` | `40233d6b…` | 657,486 B | V21 candidate (V20 + donor fixes) |
| `V22-candidate-2026-10-21.html` | `e5fa7e0e…` | — | Owner's first 3 briefs |
| `V22-candidate-teamcolours.html` | `b3de0523…` | — | + 32-team palette |

### **Protected Constants (Owner approval required)**
- `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `POINTS_PER_WIN`, `SEASON_RECORD_CAPS`

### **Critical Invariants (Never Break)**
1. `modelWeights()` = inverse of `slotWinsPerOvr()` (700 scale, QB=700)
2. CPU draft replacement floor = 76 OVR
3. `effOvr(player, slot)` used everywhere
4. User + CPU both use `optimalLineup()` (Hungarian, flex-aware)
5. Game plans independent: offense/defense scored vs expected opponent
6. `POINTS_PER_WIN = 32.5` · `SEASON_RECORD_CAPS` at real NFL records
7. NFL tiebreakers in `sortStandings()` (H2H → div → conf → point diff)

---

## 📋 LATEST OWNER FEEDBACK (Oct 23)

### **Branding: "20-0"**
- **Product name:** "20-0" (heavily emphasized in header, footer, text, UI)
- **File name:** Keep "Football Sim" for file names
- **Tagline:** "Can you go 20-0?"

### **Homepage Changes**
- "Set Up Your Draft" → "DRAFT" (heavy emphasis on UI)
- Remove: "32 real NFL franchises are shuffled... Read the guide below the setup before you start."
- New text: "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
- "1 Play the season..." → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"

### **Player Browser**
- Only 15 names visible so quick scroll to header
- Footer tabs always visible at bottom
- Header: clickable (at least somewhere obvious) → back to homepage
- Open to complete header rework if it becomes more beautiful

### **Other Changes**
- Player Browser: 15 names max on desktop, less on mobile
- Header: clickable → homepage (at least somewhere obvious)
- Open to complete header rework

---

## 🎨 AESTHETICS & BEAUTY (V22 Priority)

### **Team-Color Theming**
- Draft board header: user's team colors (border, gradient)
- Position cards: team primary/secondary left border
- Player rows: subtle team color on hover
- Badges/buttons: team accent colors
- Opponent panels: their team colors throughout matchup
- 32-team color map already in P11-5

### **Motion & Graphics**
- Confetti, banners, shimmer, transitions
- Text animating in/out
- More beautiful game previews/reviews
- Gold theme + shimmer for Super Bowl champion banner

### **Tools Available to Claude**
- Figma (read designs, pull screenshots, generate diagrams)
- Mermaid (renders in markdown)
- Biome (code formatting/linting)
- Git (version control)

---

## 📊 CURRENT STATUS

### **Verified Build**
- **V21 (live):** `Football-Sim-V21.html` (`044d1759…`, 656,746 B)
- **V22 (in progress):** `V22-Suggestions.md` → `Football-Sim-V22.html` (after verification)

### **E2E Verification**
- **MiniMax smoke:** EXIT 0 (A–F all true) — receipt `b2246138066e`
- **OpenChamber E2E v2:** PARTIAL — Week 1 PASS, 390px preseason CTA FAIL
- **MOC verifier sign-off:** EXIT 0 (based on smoke, NOT E2E spec)

### **Key Findings**
- Week 1 display EXISTS (build line 3891) — SKIP was locator bug
- 390px preseason CTA FAIL (`#startSeasonBtn` at `top=963.03` in 844px)
- Result.json hand-edited (11th step, wrong SKIP reason)
- Pool variant seam DEMONSTRATED (3 variants tested)
- Taxonomy translation WORKING (778 records translated)
- Receipt IDs added (12-hex fingerprint)

### **Hard-Rule Violations**
- Invented ratings: ✅ QUARANTINED (records emptied, originals deleted)
- Result.json hand-edit: ✅ PROPOSED CORRECTION (`result.v2.proposed.json`)
- Label collisions: ✅ PROPOSED FIX (content IDs)

---

## 📋 OPEN OWNER DECISIONS (Consolidated)

| # | Decision | Recommended Default | Urgency |
|---|----------|---------------------|---------|
| 1 | 47-message recovery | YES — append from `stash@{1}` | HIGH |
| 2 | Freeze shared docs | YES — GLM as sync owner | HIGH |
| 3 | Quarantine invented ratings | YES — URGENT | URGENT |
| 4 | Promotion criteria | REQUIRE E2E v2 PASS | BLOCKS PROMOTION |
| 5 | Label collisions / content IDs | YES | HIGH |
| 6 | E2E harness archive | YES | HIGH |
| 7 | PR #5 contributor discovery | YES — deem inert | MEDIUM |
| 8 | Architecture: repos or folders | Provisional: folders in one repo | BLOCKS priorities 2-5 |
| 9 | Pool size | Per-sport (R-16) | Before all-time pool |
| 10 | Default tab | Season-first (matches donor) | Before promotion |

---

## 🔧 OPEN ARCHITECT DECISIONS

| # | Decision | Recommended Default |
|---|----------|---------------------|
| 1 | Biome config fix | Migrate `recommended` → `preset` |
| 2 | lint.mjs parser fix | Read `d.message`, `d.location.start.line`, `d.location.path` |
| 3 | 390px preseason CTA | PRODUCT FIX — move CTA into viewport |
| 4 | Gate `E_viewportUsable` scope | Add `inViewport` + probe preseason |
| 5 | Default tab | Season-first |
| 6 | POSITION_TIER/TIER_BONUS | DELETE |
| 7 | E2E driver adoption | `tests/e2e-smoke.mjs` (GPT spec + MiniMax exec) |
| 8 | Promotion criteria | REQUIRE E2E v2 PASS |
| 9 | Merge manifest | Adopt 11/4/2 split |

---

## 🔧 TOKEN EFFICIENCY RULES (READ BEFORE EVERY PROMPT)

### When to Start a New Conversation
1. **Token usage exceeds ~50% of context window** → Stop and create new chat
2. **After 5+ consecutive prompts in same session** → Consider new chat
3. **After any major milestone** (merge, release, V22→V23) → Start new chat
4. **When responses start repeating or losing context** → New chat immediately
5. **When you find yourself re-reading files you already read** → New chat

### Warning Signs (Forceful Reminder)
- If you're about to write "I already mentioned..." → New chat
- If you're about to ask "What was the build hash again?" → New chat
- If you're about to say "As I mentioned earlier..." → New chat
- If the conversation feels like it's "drifting" → New chat
- If you've been given 3+ separate prompts without a new chat → New chat

### How to Start a New Conversation
1. **Copy this file's path** into the new chat: `PROJECT_KNOWLEDGE.md`
2. **Reference the Owner's latest prompt** in the new chat
3. **Do NOT re-explain the entire project** — just reference this file
4. **Start with the task at hand** — the project context is here

### Token Budget Guidance
- **Context window:** ~200K tokens
- **Safe zone:** 0-50% (0-100K tokens) — work freely
- **Caution zone:** 50-75% (100K-150K tokens) — start wrapping up
- **Danger zone:** 75-100% (150K-200K tokens) — STOP, start new chat
- **If unsure:** Start new chat. Better safe than sorry.

---

## 📋 WORK ORDER REFERENCE

| File | Purpose | Size |
|------|---------|------|
| `V22-Suggestions.md` | Full work order (all changes for V22) | 3368+ lines |
| `CLAUDE_PROMPT_V21_CHANGES.md` | Concise prompt for Claude | ~200 lines |
| `PROJECT_KNOWLEDGE.md` | This file — persistent context | ~300 lines |
| `STATUS.md` | Canonical facts (overwrite each cycle) | ~50 lines |

---

## 🔗 KEY REFERENCES

- **Live build:** `Football-Sim-V21.html` (`044d1759…`, 656,746 B)
- **V20 reference:** `NFL Draft Simulator v20 Claude.html` (`31b7d61f…`, 649,032 B)
- **Donor build:** `NFL Draft Simulator.html` (`77bb9ed5…`, 650,127 B)
- **Merged candidate:** `merged.html` (`40233d6b…`, 657,486 B)
- **V22 candidates:** `V22-candidate-2026-10-21.html`, `V22-candidate-teamcolours.html`

---

## ⚠️ IMPORTANT REMINDERS

1. **Never edit product HTML directly** — only Claude edits via Owner relay
2. **Never edit another agent's workspace** — read-only for others
3. **Always provide receipts** — every number needs command + output
4. **Append, never rewrite** — corrections are new entries
5. **English only** — all documents and messages
6. **Receipts or it's unverified** — no claim without evidence
7. **The merge has priority** — NFL Current v21 completes before new sports
8. **Ask questions** — file in QUESTIONS-FOR-THE-ARCHITECT.md with your tag

---

**Last Updated:** 2026-10-23T09:46:21Z  
**Author:** UK (Council Advisor)  
**Version:** 1.0EOF
echo "PROJECT_KNOWLEDGE.md created"