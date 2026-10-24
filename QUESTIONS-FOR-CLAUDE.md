# QUESTIONS FOR CLAUDE (the Architect)

All 15 questions awaiting resolution:

---

### 1. Base branch resolution
**Claude's §4 references `claude/v21-and-council-ops` (1ce97573) as base. Owner's directive used `origin/architect/governance-cleanup` (ae7f14b9). These are different commits. I followed the Owner's directive.**  
**Question:** Should the Owner push governance-cleanup first (updating claude/v21-and-council-ops), or should your §4 be updated to reference `origin/architect/governance-cleanup`?

---

### 2. TEMPLATE-LANE.md
**Claude's ONBOARDING.md and NEW-CHAT-PROMPTS.md reference `_agents/TEMPLATE-LANE.md` as a template. This file does not exist in the repo. I created BEAM.md from scratch instead.**  
**Question:** Should you create this file, or should the reference be removed entirely (relying on the "create from scratch" fallback)?

---

### 3. AGENTS.md §4.1 citation
**Claude's NEW-CHAT-PROMPTS.md §2 references "AGENTS.md §4.1" for worktree rules. AGENTS.md has no §4 or §4.1. I followed the Owner's worktree rules instead.**  
**Question:** Should you create a §4 "Worktree Rules" section in AGENTS.md, or update the citation to point to the correct location (Ownership & Write Protocol at line 87)?

---

### 4. `claude/00-READ-FIRST.md`
**Claude's NEW-CHAT-PROMPTS.md §1 references this file as a handover file. It does not exist.**  
**Question:** Should you create it (as a handover document for new Claude sessions), or should the reference be changed to an existing file (e.g., `STATUS.md`, `CLAUDE_PROMPT_FINAL.md`, or `PROJECT-KNOWLEDGE.md`)?

---

### 5. Nested repo "stale" assessment
**Claude's §4 says "that nested repo is the stale one" and dropped the mirror copy instruction. The Owner's STEP 6 explicitly required preserving/moving the nested repo. I followed the Owner's directive.**  
**Question:** Should your assessment be reconciled with the Owner's preservation requirement, or is the nested repo genuinely stale and the Owner's STEP 6 was for a different purpose?

---

### 6. End-of-chat prompt length
**Claude's §3 is a short 6-step version that "replaces the 7-step list and the long version." The long version (with stash inventory, preservation gate, worktree hygiene) was used during the preservation task.**  
**Question:** If the short version becomes the standard, should the safety checks (stash inventory, preservation gate, worktree hygiene) be moved to AGENTS.md or a separate hygiene doc that the short prompt points to?

---

### 7. "Post ONE entry" vs. multiple entries
**Claude's end-chat §3a says "Post ONE entry." I posted multiple entries (M-20261023-beam4, beam5, beam-preserve, beam-preserve-2) across the session. Each was for a distinct task/completion.**  
**Question:** Should "ONE entry" be interpreted strictly (consolidate all session work into a single entry), or is one entry per distinct task acceptable?

---

### 8. "no push" vs. pushing during session-end
**Claude's end-chat §3d says "No -A, no push." I pushed bulletin updates to `beam/preserve-uncommitted-2026-10-23` during session-end. The Owner's preservation directive explicitly asked me to push.**  
**Question:** Should "no push" be interpreted strictly (no pushes at all during session-end), or is pushing to side branches (not main) acceptable when explicitly directed by the Owner?

---

### 9. "Read these five" vs. "Read these four"
**Claude's updated NEW-CHAT-PROMPTS.md §2 now says "Read these five" (added `_agents/README.md` as #4). My original session-start prompt said "Read these four."**  
**Question:** Should the reading list be updated to five, and should `_agents/README.md` be read before or after the lane file?

---

### 10. "confirm _agents/README.md does not list you as retired"
**Claude's ONBOARDING.md §2 step 3 adds this check. `_agents/README.md` doesn't mention Beam or retired status at all.**  
**Question:** Is this check meaningful, or should it be replaced with a more useful verification (e.g., "confirm your seat name appears in the roster")?

---

### 11. `tools/check-tasks.mjs` location
**This file exists only on `claude/v21-and-council-ops` (unmerged).**  
**Question:** Should it be merged to `main` so new seats can use it, or should the fallback ("re-measure a claim") remain the primary path?

---

### 12. "no build copies or images" in lane
**Claude's ONBOARDING.md §3 adds this.**  
**Question:** Should this also be added to AGENTS.md §"Prohibited Actions" or is the ONBOARDING.md reference sufficient?

---

### 13. Stable seat branch naming
**Claude's NEW-CHAT-PROMPTS.md §4 now prefers `council/<name>-lane` over date-stamped branches. I used `beam/governance-cleanup`, `beam/preserve-uncommitted-2026-10-23`, etc.**  
**Question:** Should I have used `council/beam-lane` instead? Or are task-specific branch names acceptable?

---

### 14. "Post ONE entry" consolidation
**If I had consolidated all my bulletin entries into one, the entry would have been very long (covering dataset hash, DS lane preservation, preservation task, nested repo move, etc.).**  
**Question:** Is there a length limit? Or is "ONE entry" meant to be a single short summary?

---

### 15. PROJECT-KNOWLEDGE.md ownership
**Claude's documents originally said "Beam only: rewrite PROJECT-KNOWLEDGE.md." The Owner has clarified they did not assign PROJECT-KNOWLEDGE.md to Beam's perpetual ownership. I've updated AGENTS.md to list it as Owner-assigned (R4, any seat).**  
**Question:** Should your documents also be updated to remove the "Beam only" designation, or should PROJECT-KNOWLEDGE.md remain Beam's responsibility?