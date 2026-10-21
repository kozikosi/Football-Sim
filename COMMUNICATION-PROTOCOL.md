# COMMUNICATION-PROTOCOL.md — how the council talks to the Architect and each other

**Purpose.** Captures the Architect's (Claude's) guidance on council communication, plus the council's own rules. This is the single reference for how to file work, what to ask, and what to verify before anything reaches the Architect. Companions: `AGENTS.md` (operator rules), `COUNCIL-BULLETIN.md` (messages), `SUBMISSIONS.md` (proposals), `QUESTIONS-FOR-THE-ARCHITECT.md` (question pack).

**Adopted:** 20 Oct, from Claude's reply to the Owner's relayed brief.

---

## 1. What worked (keep doing this)

- **Receipt-backed facts.** Hash pins, function diffs, byte counts, command output. Every number the council filed was reproducible by the Architect. This is rare and valuable — it lets the Architect spend time on judgment instead of re-deriving facts.
- **Mechanical verification.** Hashes, byte counts, function diffs, manifest generation. These are the council's highest-value contributions.
- **Regression scans.** "Which functions reference ids that don't exist in this markup" — coupling checks that catch integration failures before they reach the build.

## 2. What cost time (stop doing this)

1. **Wrong claims surviving multiple rounds.** Claims like "14 donor / 1 v20 / 2 synthesize" were checked per-function but never assembled and run. The fix: no plan is "settled" until someone has assembled it and run it once (assembled-build gate).
2. **Stale and contradictory paperwork.** Multiple count tables (408/394/14 vs 17/391), duplicate [BLOCKING] counts (4 vs 10), "one round behind" docs, smoke driver at a different path than cited with no "D" check. The fix: one canonical facts file, overwritten not appended.
3. **Process weight.** Many questions were answerable from the files. The hard questions (markup choice, color-scheme, defect fix) were few. The fix: ask fewer, better questions.

## 3. What the Architect keeps for himself

- Deciding which markup, CSS, and behavior survive the merge.
- Anything touching protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS).
- The merge itself (sole implementer, R3).

## 4. What the Architect delegates to the council

- **Mechanical verification:** hashes, byte counts, function diffs, manifest generation.
- **Scripted E2E driver:** covering draft → season → playoffs → 100-season report → 390px element-level checks → console errors. Missing today; the supplied one covers only 3 checks. MiniMax's `post-merge-smoke.mjs` is the seed.
- **Keeping docs and counts consistent:** one canonical STATUS.md, no duplicate count tables.
- **Regression scans:** "which functions reference ids that don't exist in this markup" — coupling checks.

## 5. Communication rules (from the Architect's guidance)

1. **Ask for verdicts with commands, not consensus.** Every claim carries a command + output, or is labelled *reported/inferred/unverified*. A number without a command is prose.
2. **One canonical facts file, overwritten not appended.** STATUS.md is the single source for build hash, counts, and current state. No duplicate count tables in other files. When a count changes, update STATUS.md — don't append a new table.
3. **Assembled-build gate.** No plan is "settled" until someone has assembled it and run it once. Build it, run the driver, report pass/fail before it reaches the Architect. Per-function analysis is necessary but not sufficient.
4. **At most ~5 questions per brief**, each with: (a) a recommended default, (b) the cost of being wrong. The Architect can then say "go with default" and move on. Do not send 52 questions with 11 BLOCKING tags.
5. **Flag coupling, not just diffs.** "Function X depends on markup Y" is more valuable than "Function X differs between builds." The #glue incident (renderSeasonTabInner assumes viewSeason/tabSeasonBtn/seasonHost that don't exist in v20's markup) is the canonical example.
6. **Fix delivery once.** For a 650 KB build, only a pushed git route is reliable. The Owner pushes bundles, or the Architect pushes through MCP for small files. No paste-text delivery for large artifacts.
7. **English only** (rule 7). Every document, log, message.
8. **Append, never rewrite** (rule 2). Correct via citation, don't erase.
9. **Counts name units** (rule 10). "58 occurrences on 39 lines," not "58."
10. **Next free M-number** (rule 9). Read the tail first; on collision, take the next free and cite the collision.

## 6. How to guide the council (from the Architect's guidance)

- Send the Architect at most ~5 questions, each with a recommended default and the cost of being wrong.
- Have the council flag coupling (function depends on markup X), not just diffs.
- Make every plan pass an assembled-build gate before it reaches the Architect.
- Fix delivery once: Owner pushes bundles, or Architect pushes via MCP for small files.

## 7. On adding new agents

The Owner asked whether to add GPT, Gemini, Kimi, and Z. Recommendation:

- **GPT** is already in the council (S-500s). Its contributions (validate.js spec, CLI contract, dataset contract) are valuable but it is chat-only (no file access). Its claims must be labelled *reported/inferred/unverified* since it cannot run commands.
- **Gemini** is reserved (S-700s, fallback implementer). It has no seat yet. Add it only if the Owner wants a second implementer.
- **Kimi and Z** are new. They can contribute design ideas, critiques, and questions, but they cannot verify claims (no file access, no commands). If added, they should be labelled "design-only" members whose claims are always *reported/inferred/unverified*.
- **The relay burden scales with the number of chat-only agents.** Each one needs the Owner to paste files and relay replies. The council's value comes from receipt-backed verification, which requires file access. More chat-only agents = more unverified claims = more work for the Architect to filter.
- **Recommendation:** add Kimi and Z as "design-only" members with clear scope (design ideas, critiques, questions — not verification). Do not rely on them for mechanical checks. Add Gemini only if a second implementer is needed.

## 8. On the v21 vision

The Architect's merge has priority. But the vision is the destination. The council should:
- Propose, critique, and verify — not implement.
- Challenge the Architect's priority order with receipts, not opinions.
- Think about what makes the simulator worth using for a full season.
- Contribute to `_multi-sport/` for the multi-sport expansion (NBA, all-time, other sports).

## 11. Speaker identification (Owner directive, 20 Oct — house rule 14)

Every message, prompt response, report, correction, status update, and forwarded excerpt must begin
with the exact name or handle of the person or agent who authored it. Use:

`SPEAKER: <exact name/handle> | ROLE: <role> | TASK: <task or run ID> | DATE: <UTC timestamp>`

When forwarding someone else's work, identify both the forwarder and the original speaker:

`FORWARDED BY: <name> | ORIGINAL SPEAKER: <name> | SOURCE: <file/message/PR/run ID>`

Do not rely on writing style or conversation context to make the recipient guess who is speaking.
If the original speaker is uncertain, write `ORIGINAL SPEAKER: Unknown — attribution unconfirmed`; do not guess.
Label each person's contribution separately when a report combines multiple voices.
This applies across OpenChamber, Kilo Code, GitHub, and copied messages so authorship and evidence
provenance remain clear.

## 9. What I (Beam) would add

- **A decision log** (DECISION-LOG.md already created) — searchable index of Architect rulings. Prevents re-asking.
- **A known-issues tracker** (KNOWN-ISSUES.md already created) — lightweight defect list. Prevents duplicate discovery.
- **A verification checklist** (VERIFICATION-CHECKLIST.md already created) — fill-in-the-blanks form for the verifier.
- **A council digest** (COUNCIL-DIGEST.md already created) — per-round compilation for new agents.
- **A merge manifest** (MERGE-MANIFEST.md already created) — single source of truth for the merge surface.
- **A prompt draft space** (PROMPTS-TO-ARCHITECT.md already created) — shared space for drafting prompts to Claude.
- **A v21 roadmap** (_agents/beam/notes/v21-roadmap.md) — priority order for v21, with a call to all agents to add their own vision.
- **A multi-sport expansion plan** (_multi-sport/README.md) — vision, architecture, folder structure, contribution guide, questions for Owner.
- **Player database templates** (_multi-sport/*/data/players-template.*) — structured data templates with schema, examples, validation rules.
- **NBA matchup model spec** (_multi-sport/nba-current/matchup-model.md) — full engine specification.
- **Harness draft scripts** (_agents/beam/notes/harness-drafts/) — phone.js, funcdiff.js, run_all.sh, pw4.js, validate.js.
- **Merge-plan checklist** (_agents/beam/notes/merge-plan.md) — pre-merge, execution, post-merge.

## 10. Encouragement

The council's best output was receipt-backed facts. Keep doing that. The Architect's best input was judgment on those facts. Keep giving him that.

The merge has priority. But the vision is the destination. Let's build it.
