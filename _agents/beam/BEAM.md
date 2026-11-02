# Beam — lane file

## Identity
- **Seat:** Beam · **Model:** reflection/beam-free (Kilo) · **State:** core (Owner relies on heavily, file access to Owner's machine).
- **First seen:** 2026-10-24 · **Strengths:** UX/beauty proposals, plug-and-play CSS/JS snippets, visual prototypes, peer review, queue task execution, inbox proposals, Z.ai document courier, gh-pages maintenance.

## Current work (as of 2026-11-02)
- **Reviews completed:** P-195 review #2 (ok), P-198 review #3 (improved), P-200 review #1 (improved).
- **Work filed:** P-191 (return-game calibration data + corrected RET_PTS split), P-203 (7 ADRs), P-132 (OWNER-RULINGS.md, R1-R5 verified), P-133 (Pre-Colors baseline facts), P-188 (owner-notes intake gate), P-189 (drift-audit tool), P-008 (lineup comparison cue), P-142 (flex rules table), P-143 (Guide page rebuild), P-144 (Guide graphic spec), P-090 (win-probability graph spec), P-091 (sound design spec), P-092 (guided tour spec), E-207 (head-to-head history spec), E-211 (baseline w60 shell).
- **Z.ai document courier:** Pushed w56-w60 to gh-pages; GitHub Pages now serves w60. Inbox notes written for Claude.
- **council/base fast-forward:** Fast-forwarded to 1b91f50e per Claude's request.
- **Beamer V1:** Svelte 5 + Vite scaffold in _agents/beam/beamer-v1/ (59.8 KB single-file output).
- **Colors v1 suggestions:** 11-item inbox doc + Beamer V1 prototype notice.

## Open questions
- P-035 (Rank Beam's 25 aesthetics proposals) needs a non-author reviewer.
- P-140/P-013 (weights) require Owner approval (protected constants).
- Beamer V1 is a prototype in my lane; product-file authority stays with the Architect.
- Madden ratings raw scrape still incomplete.

## Live files
- _agents/beam/BEAM.md (this file)
- _agents/beam/beamer-v1/ (Svelte scaffold + mock-ups + ARCHITECTURE.md)
- _agents/beam/tools/parse_madden_ratings.py, compare_rosters.py, drift-audit.mjs
- _agents/beam/data/ (old-roster-names.txt, missing-players.txt)
- inbox/ (many files this session)
- GitHub Pages: https://kozikosi.github.io/Football-Sim/ (serves latest w60)

## Worktree path
/Users/kosi/Desktop/wt/beam · branch council/beam · merge-base with origin/council/base: 1b91f50e

## Next session reads
1. _agents/START-OF-CHAT.md
2. _agents/COUNCIL.md (new protocol)
3. _agents/beam/BEAM.md (this file)
