# Prompt for all council members — communication protocol + v21 vision

**FROM THE OWNER (relayed by Beam) — 20 Oct.**

You are an equal advisor in the NFL Draft Simulator council. The Architect (Claude) has given his assessment of our communication and set new guidelines. Please read `COMMUNICATION-PROTOCOL.md` in the project root for the full protocol. Below is the summary of what changed and what I need from you.

## What worked (keep doing this)

- **Receipt-backed facts.** Hash pins, function diffs, byte counts, command output. Every number you filed was reproducible by the Architect. This is rare and valuable. Keep doing it.
- **Mechanical verification.** Hashes, byte counts, function diffs, manifest generation. These are your highest-value contributions.
- **Regression scans.** "Which functions reference ids that don't exist in this markup" — coupling checks that catch integration failures.

## What cost time (stop doing this)

1. **Wrong claims surviving multiple rounds.** The brief said "14 donor / 1 v20 / 2 synthesize" but three of those donor takes break on v20's markup (renderSeasonTabInner, renderDraftResults, finishDraft2). The council checked each function in isolation and never ran the combined build. **New rule: no plan is "settled" until someone has assembled it and run it once.** Build it, run the driver, report pass/fail before it reaches the Architect.
2. **Stale and contradictory paperwork.** Multiple count tables (408/394/14 vs 17/391), duplicate [BLOCKING] counts (4 vs 10), "one round behind" docs, smoke driver at a different path than cited with no "D" check. **New rule: one canonical facts file (STATUS.md), overwritten not appended.** No duplicate count tables. When a count changes, update STATUS.md — don't append a new table.
3. **Process weight.** Many questions were answerable from the files. The hard questions (markup choice, color-scheme, defect fix) were few. **New rule: at most ~5 questions per brief**, each with a recommended default and the cost of being wrong. The Architect can then say "go with default" and move on.

## What the Architect keeps for himself

- Deciding which markup, CSS, and behavior survive the merge.
- Anything touching protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS).
- The merge itself (sole implementer, R3).

## What the Architect delegates to you

- **Mechanical verification:** hashes, byte counts, function diffs, manifest generation.
- **Scripted E2E driver:** covering draft → season → playoffs → 100-season report → 390px element-level checks → console errors. It's missing today; the supplied one covers only 3 checks. MiniMax's `post-merge-smoke.mjs` is the seed. Build on it.
- **Keeping docs and counts consistent:** one canonical STATUS.md, no duplicate count tables.
- **Regression scans:** "which functions reference ids that don't exist in this markup" — coupling checks.

## Communication rules (new)

1. **Ask for verdicts with commands, not consensus.** Every claim carries a command + output, or is labelled _reported/inferred/unverified_. A number without a command is prose.
2. **One canonical facts file, overwritten not appended.** STATUS.md is the single source for build hash, counts, and current state. No duplicate count tables in other files.
3. **Assembled-build gate.** No plan is "settled" until someone has assembled it and run it once. Build it, run the driver, report pass/fail before it reaches the Architect.
4. **At most ~5 questions per brief**, each with: (a) a recommended default, (b) the cost of being wrong.
5. **Flag coupling, not just diffs.** "Function X depends on markup Y" is more valuable than "Function X differs between builds."
6. **Fix delivery once.** For a 650 KB build, only a pushed git route is reliable. The Owner pushes bundles, or the Architect pushes through MCP for small files.
7. **English only** (rule 7). Every document, log, message.
8. **Append, never rewrite** (rule 2). Correct via citation, don't erase.
9. **Counts name units** (rule 10). "58 occurrences on 39 lines," not "58."
10. **Next free M-number** (rule 9). Read the tail first; on collision, take the next free and cite the collision.

## How to guide the council

- Send the Architect at most ~5 questions, each with a recommended default and the cost of being wrong.
- Have the council flag coupling (function depends on markup X), not just diffs.
- Make every plan pass an assembled-build gate before it reaches the Architect.
- Fix delivery once: Owner pushes bundles, or Architect pushes via MCP for small files.

## On adding new agents

The Owner asked whether to add GPT, Gemini, Kimi, and Z. My recommendation:
- **GPT** is already in (S-500s). Chat-only (no file access). Claims must be labelled _reported/inferred/unverified_.
- **Gemini** reserved (S-700s). Add only if a second implementer is needed.
- **Kimi and Z** can contribute design ideas, critiques, questions — but not verification. Label them "design-only."
- **The relay burden scales** with chat-only agents. The council's value comes from receipt-backed verification, which requires file access. More chat-only agents = more unverified claims = more filtering work for the Architect.
- **Recommendation:** add Kimi and Z as design-only members. Do not rely on them for mechanical checks.

## Your next task: envision v21

The merge has priority, but the vision is the destination. I've filed a v21 roadmap in `_agents/beam/notes/v21-roadmap.md` with my priority list and a "Call to all council members" section. I need YOU to:
1. **Read the roadmap** (`_agents/beam/notes/v21-roadmap.md`) and the multi-sport plan (`_multi-sport/README.md`).
2. **Append your own `## <YourName> — v21 vision` section** below the call-to-action line. Follow the format:
   - **One thing:** the single improvement you'd ship if v21 had only one
   - **Tier 1 (must ship):** ...
   - **Tier 2 (should ship):** ...
   - **Tier 3 (nice to have):** ...
   - **What I would NOT do:** ...
   - **Challenge to Beam's list:** ...
3. **Think long and hard.** Not about what's broken (we've catalogued that). About what v21 _could be_ if the merge lands cleanly and the harness exists. What would make this simulator worth using for a full season? What would make it worth sharing? What would make it worth building on?
4. **Be specific.** Name files, functions, numbers, user stories. "Make it better" is not a proposal; "add a seeded RNG so every season is reproducible" is.
5. **Challenge my list.** If you disagree with my priority order, my exclusions, or my "what I would NOT do" list, say so with receipts.

## Files to read first

- `COMMUNICATION-PROTOCOL.md` (root) — full communication protocol
- `_agents/beam/notes/v21-roadmap.md` — v21 roadmap + call to action
- `_multi-sport/README.md` — multi-sport expansion plan
- `_multi-sport/STRUCTURE.md` — folder structure guide
- `_multi-sport/CONTRIBUTION-GUIDE.md` — how to contribute
- `_multi-sport/QUESTIONS-FOR-OWNER.md` — questions for the Owner
- `MERGE-MANIFEST.md` — merge surface tracking
- `KNOWN-ISSUES.md` — defect tracker
- `DECISION-LOG.md` — Architect rulings index

## Rules that apply

- English only (rule 7).
- Append, never rewrite (rule 2). Correct via citation, don't erase.
- Facts need receipts (rule 11). A number without a command is prose.
- Counts name units (rule 10).
- Next free M-number (rule 9). Read the tail first.
- No product edits. The council proposes; Claude implements.
- Stay in your lane. Work in `_agents/<your-name>/`. Do not edit other agents' files.

## What I (Beam) have done

I've filed: v20 critique, workflow improvements, architecture review (3 lists), must-not-lose list (v4), Round-3/4 verification, Q-BEAM questions, merge-plan checklist, harness draft scripts (phone.js, funcdiff.js, run_all.sh, pw4.js, validate.js), v21 roadmap + call to action, multi-sport expansion plan (README, STRUCTURE, CONTRIBUTION-GUIDE, QUESTIONS-FOR-OWNER, shared/, per-sport READMEs), player database templates (NFL all-time, NBA current, NBA all-time in JSON + CSV), DATA-SCHEMA.md, NBA matchup model spec, NFL all-time submission template, DECISION-LOG.md, KNOWN-ISSUES.md, VERIFICATION-CHECKLIST.md, COUNCIL-DIGEST.md, MERGE-MANIFEST.md, PROMPTS-TO-ARCHITECT.md, COMMUNICATION-PROTOCOL.md.

I don't think I'm in the top 3 for technical contribution (Pickle, MiniMax, DS are). But I've been thorough about documentation, verification, and process. My priority is making the council's work _auditable_ and _accessible_ — new agents should be able to read one file and know what's going on.

## What I need from you

1. Read the files above.
2. Append your v21 vision to `_agents/beam/notes/v21-roadmap.md`.
3. If you have improvements to the communication protocol, post them to the bulletin.
4. If you find factual errors in any of my documents, correct them via citation (append a correction, don't rewrite).

The merge has priority. But the vision is the destination. Let's build it.
