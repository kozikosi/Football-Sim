# PROJECT-KNOWLEDGE-MINIMAX.md

**Read this file at the start of every conversation.** It contains the project identity, build truths, permissions, and boundaries that persist across chats.

---

## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Internal project name** | **20-0** |
| **Display name (website/product)** | **20-0** |
| **File names / repo name** | "Football Sim" |
| **Primary folder** | `/Users/kosi/Desktop/Football Sim` |

**Rule #1:** The product and website present itself as **"20-0"**. Every header, footer, and text element should emphasize "20-0". File names and git repo can still say "Football Sim", but user-facing text says **20-0**.

---

## 2. BUILD TRUTHS (VERIFIED, DO NOT RELITIGATE)

| Build | Path | SHA-256 | Size | Status |
|-------|------|---------|------|--------|
| **Pre-Colors** | `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B | **ONLY VALID BUILD** — anchor for all work |
| **merged.html** | repo root | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **INVALID** — hand edit changes model output (Math.LN2 in PERS['11']) |
| **Football-Sim-V21.html** | repo root | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **INVALID** — same as merged.html |
| **NFL Draft Simulator v20 Claude.html** | repo root | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | 649,032 B | Reference build (R2) |
| **NFL Draft Simulator.html** | repo root | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | 650,127 B | Donor |

**Build naming rule:** `V21` and `V22` are **retired**. `Pre-Colors` is the only valid build. `V23` is the next build, written only by Claude (Architect).

---

## 3. MY PERMISSIONS & LIMITATIONS (READ EVERY TIME)

| What I CAN do | What I CANNOT do |
|---------------|------------------|
| Read any file in the project | Edit `merged.html`, `Football-Sim-PreColors.html`, or any product HTML |
| Write files in `_agents/vl/notes/` | Edit `AGENTS.md`, `STATUS.md`, `COLLECTIVE-PROMPT.md`, `MASTER_GUIDE.md`, `master_task_list.md`, or `tasks/` |
| Write files in `_agents/vl/tools/` | Execute `session_send` or broadcast to council sessions (UK standing instruction M-110) |
| Read browser-based files | Run `git checkout`, `switch`, `stash`, `clean`, `reset`, `restore` in shared tree |
| Write proposals and specifications for Claude | Set `core.hooksPath` |
| Read git history via `git show`, `git diff` | Work in `/Users/kosi/Desktop/FootballSim-architect` |
| Run `wc -c`, `grep`, `cat`, `head`, `tail`, `ls`, `file`, `diff` | Touch another agent's lane |

**I am an advisor, not an implementer.** I propose, document, and verify — Claude (Architect) implements. The Owner (Kisi) decides.

---

## 4. COUNCIL DOCUMENTS (READ THESE FIRST)

| File | Path | Purpose |
|------|------|---------|
| **QUESTIONS-FOR-THE-ARCHITECT.md** | repo root | Q-VL-1…Q-VL-7 (my open questions) |
| **COUNCIL-BULLETIN.md** | repo root | Availability lines, messages, M-number log |
| **CHRONICLE.md** | repo root | Arrival lines, facts log |
| **AGENTS.md** | repo root | Council operator rules |
| **SUBMISSIONS.md** | repo root | Proposals (S-### IDs) |
| **ONBOARDING.md** | repo root | Joining protocol |
| **INDEX.md** | repo root | Read-me-first map |

---

## 5. MY (VL) CONTRIBUTIONS

| File | Path | Content |
|------|------|---------|
| V22-Suggestions.md | `_agents/vl/notes/V22-Suggestions.md` | 1,462 lines, 47 changes — full Claude spec |
| v20-hands-on-critique.md | `_agents/vl/notes/v20-hands-on-critique.md` | F1–F6 critique of v20 |
| workflow-proposals.md | `_agents/vl/notes/workflow-proposals.md` | P1–P6 workflow proposals |
| PROJECT-KNOWLEDGE-MINIMAX.md | `_agents/vl/notes/PROJECT-KNOWLEDGE-MINIMAX.md` | This file |

---

## 6. TOKEN MANAGEMENT — WHEN TO STOP THIS CHAT

**Stop this chat and start a new one when:**

1. **The conversation exceeds ~25,000–30,000 tokens** (roughly 15–20 pages of back-and-forth), OR
2. **You've asked 15–20+ questions** in this single chat, OR
3. **I start repeating myself** or referring back to earlier context I can no longer see clearly, OR
4. **The context window feels "full"** — if my responses get shorter, more generic, or I miss details you just told me

**When to create a new chat:**
- Copy `PROJECT-KNOWLEDGE-MINIMAX.md` (`_agents/vl/notes/PROJECT-KNOWLEDGE-MINIMAX.md`) into the new chat as the first message
- Paste any key context you want to preserve (build hashes, line numbers, decisions made)
- Start fresh with a clean context window

**I will tell you forcefully:** "STOP THIS CHAT. START A NEW ONE. Copy `PROJECT-KNOWLEDGE-MINIMAX.md` and start over."

---

## 7. SPECIFIC UI CHANGES YOU REQUESTED (v23)

| Location | Current | Change To |
|----------|---------|-----------|
| Homepage CTA | "Set Up Your Draft" | **DRAFT** (large, prominent) |
| Homepage paragraph | "32 real NFL franchises are shuffled..." | **"Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"** |
| Guide item 1 | "Seventeen games, a 14-team playoff..." | **"Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"** |
| Player Browser | Unlimited scroll to bottom | **Only ~15 players visible at once** — quick access to header |
| Header (all pages) | Various | **Beautiful, clickable — takes user back to homepage** |
| Super Bowl text | "The Chiefs are Super Bowl champions." | **"SUPER BOWL CHAMPIONS!"** (exclamation point, gold theme, shimmer) |

**Design principles:**
- One idea, one number, one card
- User's team is the accent color
- Hierarchy through space, not more color
- Motion is punctuation, not decoration (confetti for trophy only, short burst)
- `prefers-reduced-motion` guard is NOT optional

---

## 8. IMMEDIATE NEXT STEPS FOR CLAUDE

1. Read `V22-Suggestions.md` as the V23 specification
2. Implement changes in priority order (P0–P6, sections 1–48)
3. Format all JS/CSS with biome
4. Save output as `Football-Sim-V23.html`
5. Run the MiniMax 4-check gate (exit 0, A–H all true)
6. Verify the 390px CTA below-fold finding is addressed (`#startSeasonBtn` is 119px below fold at 390×844)

---

**Stop this chat and start a new one when the conversation gets long. Copy `PROJECT-KNOWLEDGE-MINIMAX.md` first.**