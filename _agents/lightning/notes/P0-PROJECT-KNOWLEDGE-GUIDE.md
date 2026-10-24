P0 — PROJECT KNOWLEDGE GUIDE (This file is read at the start of every new session/chat for this project)

================================================================================
PROJECT IDENTITY
================================================================================
- Project codename: "20-0" (website/product presentation name)
- Project directory name: "Football Sim" (file names, repo, git)
- Current build reference: NFL Draft Simulator v20 Claude.html (sha256 31b7d61f, 649,032 B)
- Donor build: NFL Draft Simulator.html (sha256 77bb9ed5, 650,127 B) — fixes merged into v20
- Merged build: NFL Draft Simulator merged.html (sha256 044d1759, 656,746 B) — on origin/claude/v21-and-council-ops
- Pre-Colors anchor: Football-Sim-PreColors.html (sha256 40233d6b, 657,486 B) — frozen dataset
- Owner: Kosi (attests all 1,200 player rows, all team colour decisions)
- Architect: Claude (technical authority, decides what enters the build)
- Council: Equal members (GLM, DS, Nemo Super, Nemo Ultra, GPT, Pickle, MOC, Lightning)

================================================================================
HARD PROHIBITIONS (10 — never breach)
================================================================================
1. Do not merge to main. Do not force-push. Do not rewrite history.
2. Do not delete branches, tags, commits, or worktrees.
3. Do not edit the product HTML, AGENTS.md, STATUS.md, COLLECTIVE-PROMPT.md,
   MASTER_GUIDE.md, master_task_list.md, or tasks/ — tasks/ is not merged yet.
4. Do not set core.hooksPath. If already set, unset it: git config --unset core.hooksPath
5. Do not run step 3c as written.
6. Do not run pull, checkout, switch, stash, clean, reset or restore in the shared tree.
   `git add` by path only, and only if you must.
7. Do not work in /Users/kosi/Desktop/FootballSim-architect.
8. Do not touch another seat's lane.
9. English only in all shared documents, messages, and user-facing communication.
10. V23 on hold per Owner §7 — step 3 only, no candidates, no renumbering, no bulletin trimming.

================================================================================
SESSION WORKFLOW (per AGENTS.md & BOC broadcast 22 Oct 2026)
================================================================================
- Read this guide at the start of every new session/chat
- Take highest-priority unclaimed item from Owner's work queue (P1-P9, then NP1-NP8)
- Post to COUNCIL-BULLETIN.md using: SEAT-YYYYMMDD-nn format, one entry per finished item
- Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN with command+output evidence
- Work confined to _agents/<seat>/ lane only
- Never trust a branch name — resolve by SHA always
- Convention: NEVER TRUST A BRANCH NAME. Resolve it, quote the SHA, then work.

================================================================================
TOKEN USAGE & NEW CHAT GUIDELINES
================================================================================
WHEN TO START A NEW CHAT (forceful trigger):
----------------------------------------------
STOP THIS CHAT AND CREATE A NEW ONE when ANY of the following occur:

1. Token count exceeds 80% of the session's available budget AND you have
   unfinished work that will require further context/continuation.

2. The conversation history spans more than 50 single-spaced pages of single-tool
   output (roughly ~8,000+ lines of accumulated text across all tool calls).

3. You have completed a major deliverable (P1-P9, NP1-NP8) and are about to
   start a new item — start fresh to keep each chat's context manageable.

4. Token efficiency drops below 50% (meaning >50% of tokens are in history/context
   rather than new work) — this is the primary trigger.

5. The user explicitly requests a new chat, or you sense the conversation has
   become "way too long" as the user described.

6. You are about to start a different task category (e.g., moving from P1-P3
   review to P4-P9 implementation, or from bundle review to council dispatch).

7. Before any break, pause, or handoff — the user or another session may resume
   in a new chat with fresh context.

HOW TO MEASURE (in this environment):
---------------------------------
- Input tokens: ~15,208,678 total consumed across current session (as of 22 Oct 2026)
- Output tokens: ~403,393 total consumed across current session
- Current session tokens: Track via openchamber session.list → your session ID
- Rough threshold: When the saved output from this chat exceeds ~20,000 words
  (equivalent of a medium novel), start a new chat.

NEW CHAT PROCEDURE:
--------------------
1. User says "new chat" or you determine thresholds above are met
2. Close this chat session (no need to formally "close" — just stop responding
   in this context)
3. User starts a new conversation within the project folder (/Users/kosi/Desktop/Football Sim)
4. The new chat should begin by reading: _agents/lightning/notes/P0-PROJECT-KNOWLEDGE-GUIDE.md
5. All prior context is preserved in the project files but NOT carried forward
   into the new chat's token budget unless explicitly copied.
6. Post a bulletin note: "M-XXXX · Seat · XX Oct — New chat started (VERIFIED)."
   with link to the new chat session.

================================================================================
V23 TASK PARAMETERS (on hold per Owner §7, step 3 only)
================================================================================
- T-20261022-claude-2: Seeded RNG design (38 Math.random → rnd() injection seam)
- No product code changes until Architect returns and merge is complete
- UI/UX improvements (header, player browser, "DRAFT" text) are V23 tasks
- Dataset integrity hash (P6) protects the Owner's ruling permanently
- Registry seeding (P9) uses check-tasks.mjs schema: tasks/<id>.json

================================================================================
UI CHANGES — V23 ONLY (not for this session)
================================================================================
CANNOT BE IMPLEMENTED IN THIS SESSION (hard prohibition on product HTML edits):

1. HOMEPAGE TEXT CHANGES:
   - "Set Up Your Draft" → "DRAFT" (heavy UI emphasis)
   - New subtitle: "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
   - "32 real NFL franchises are shuffled into a random snake draft order..." →
     "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"

2. "Play the season. Seventeen games, a 14-team playoff, then the Super Bowl.
   Each week you can leave your game plan on Auto or set it yourself."
   → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"

3. PLAYER BROWSER SCROLL:
   - Only 15 names visible before needing to reach the header
   - This is a V23 UI redesign task, not fixable in V22

4. HEADER CLICKABLE HOME LINK:
   - Whatever header appears in V23 must be clickable somewhere obvious
   - Takes user back to the homepage
   - This is a V23 UI redesign task

5. HEADER APPEARANCE across all pages:
   - Consistent design across Season, Draft, Player Browser, Team Rankings, etc.
   - V23 task — not this session

================================================================================
RECORDED USER REQUESTS (for V23 — not actionable this session)
================================================================================
- User wants "20-0" emphasized in header/footer/text of website/product
- User wants homepage to present as "20-0" (while file names stay "Football Sim")
- User wants player browser optimized: 15 names visible, quick header access
- User wants header clickable → homepage
- User wants "DRAFT" heavy UI emphasis on homepage
- User wants homepage subtitle: "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
- User wants "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"

================================================================================
DELIVERABLES IN THIS SESSION (P1-P9, NP1-NP5 council dispatch)
================================================================================
All 9 priority items P1-P9 completed and bulletin-verified.
5 council sessions dispatched with NP1-NP5 assignments.
BIOME-F6-LOCATION-SPEC.md verified.
Dataset integrity hash computed (sha256 of 1,200-player array).
Seeded RNG design documented (38 Math.random call sites).
Canonical pin table produced (V20 dual-pin reconciliation).
Colour patch draft (6/7 letter colours flagged for change).
Merge rehearsal for V22-Suggestions.md completed.
Bundle review of 5157c53a completed (6 files, new rules).

================================================================================
NEXT STEPS (when Architect returns from 3-hour absence)
================================================================================
1. Review the bundled change set (origin/claude/v21-and-council-ops:5157c53a)
2. Continue V22-Suggestions.md conflict resolution
3. Apply seven-line colour patch to figma/team-colours.json (after bundle PR)
4. Begin V23 task suite (seeded RNG, UI redesign, registry seeding)
5. Address UI/UX requests: "DRAFT" header, "20-0" emphasis, player browser scroll,
   homepage text changes, clickable header home link
6. Execute check-tasks.mjs adversarial testing on new registry items
7. Compute 100-season validation (pw4.js regression r > 0.6)
8. Verify phone layout at 390px (no horizontal scroll)

================================================================================
END OF GUIDE
================================================================================