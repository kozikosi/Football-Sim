SPEAKER: muse | ROLE: council advisor | TASK: Repo cleanup — path fixes needed in AGENTS.md + tools/ after the 2026-11-05 reorganization | DATE: 2026-11-06T03:05Z

FOR: Architect (Claude) — next chat, small package. Do this BEFORE the next cold start that needs these paths, or as the first item in the next chat.

## What happened

The Owner directed a repo cleanup ("No loose files. everything in folders.") on council/muse. I moved the documents. The root now has only the harness files (AGENTS.md, CLAUDE.md, SOUL.md, IDENTITY.md, USER.md) + the product HTML + config + the new README.md/LICENSE. Everything else is in folders:

- 12 live docs → `docs/` (BASELINES.md, CHRONICLE.md, COLLECTIVE-PROMPT.md, COUNCIL-BULLETIN.md, GOVERNANCE-ROUNDTABLE.md, INDEX.md, MERGE-MANIFEST.md, ONBOARDING.md, PROJECT-KNOWLEDGE.md, QUESTIONS-FOR-THE-ARCHITECT.md, STATUS.md, SUBMISSIONS.md).
- 28 frozen Oct-era docs → `_archive/project-docs/`.
- V22-Suggestions.md → `_archive/v22-suggestions.md` (intact, not split).
- tasks/ → `_archive/tasks/`; council-brief/ → `_archive/council-brief/`; tests/ → `_archive/tests/`; _agents-payload/ → `_archive/payloads/`; _reference/ → `_archive/reference/`.
- council/scorecard/ → `_agents/scorecard/` (scripts/build_council_scorecard.py line 17 updated to the new path).

I updated the references I could (in _agents/PRIORITIES.md, _agents/README.md, _agents/RETIREMENT.md, scripts/build_council_scorecard.py). The references below are in files I do not own (AGENTS.md + tools/) and now dangle. Fix them by prefixing the new folder.

## Fix list (exact)

In **AGENTS.md**, update these references (root path → new path):
- BASELINES.md → docs/BASELINES.md
- MERGE-MANIFEST.md → docs/MERGE-MANIFEST.md
- ONBOARDING.md → docs/ONBOARDING.md
- PROJECT-KNOWLEDGE.md → docs/PROJECT-KNOWLEDGE.md
- STATUS.md → docs/STATUS.md
- V22-Suggestions.md → _archive/v22-suggestions.md
- COUNCIL-BULLETIN.md → docs/COUNCIL-BULLETIN.md
- SUBMISSIONS.md → docs/SUBMISSIONS.md
- CHRONICLE.md → docs/CHRONICLE.md

In **tools/sync-mirrors.sh**, update these references (→ docs/):
- COLLECTIVE-PROMPT.md, GOVERNANCE-ROUNDTABLE.md, QUESTIONS-FOR-THE-ARCHITECT.md, INDEX.md, ONBOARDING.md, STATUS.md, COUNCIL-BULLETIN.md, SUBMISSIONS.md, CHRONICLE.md

In **tools/retire-seat.mjs**, update these references:
- V22-Suggestions.md → _archive/v22-suggestions.md (the :79 tombstone string)
- COUNCIL-BULLETIN.md → docs/COUNCIL-BULLETIN.md
- SUBMISSIONS.md → docs/SUBMISSIONS.md
- CHRONICLE.md → docs/CHRONICLE.md

In **tools/build-seat-packets.mjs**: INDEX.md → docs/INDEX.md.
In **tools/admit-seat.sh**: PROJECT-KNOWLEDGE.md → docs/PROJECT-KNOWLEDGE.md.

## Held (NOT moved — needs your call)

- **Harness files** (AGENTS.md, CLAUDE.md, SOUL.md, IDENTITY.md, USER.md) stay at root. Moving them needs the boot-doc update (`claude/00-READ-FIRST.md` + the Project boot doc) to the new paths in the SAME change, or your next cold start breaks. If you want them in docs/ too, do the move + boot-doc update as one package.
- **Football-Sim-PreColors.html** stays at root. It is pinned by sha256 (AGENTS.md/BASELINES.md); moving it needs a re-pin. It may simply be deleted at cutover (approved, latest-wave anchor + archive tag).

## Verification

After the fixes, `grep -r "V22-Suggestions.md\|CHRONICLE.md\|SUBMISSIONS.md" AGENTS.md tools/` should show only the new paths (docs/ or _archive/). The root should still have only the 5 harness files + the product HTML + config + README.md/LICENSE.
