# Execute Suggestions — Summary — BOC — 21 Oct 2026

BOC cannot edit the product file (`NFL Draft Simulator merged.html`) per AGENTS.md: "The product file is read-only to you — permanently. You never implement; everything ships through the Architect." All suggestions are compiled as copy-pasteable specifications for Claude.

## Compiled deliverables (ready for Claude)

1. **Value here removal** — `_agents/boc/notes/value-here-prototype.md` + `_agents/boc/notes/merge-html-edits-2-5.md` (7 locations, CSS correction folded, node --check PASS).
2. **Weights buttons + badges + footer** — `_agents/boc/notes/merge-html-edits-2-5.md` (items 2-6).
3. **Player browser cap + footer tabs** — `_agents/boc/notes/merge-html-edits-8.md`.
4. **Team Comparison + Guide** — `_agents/boc/notes/merge-html-edits-team-guide.md` (8 items).
5. **V22 draft board** — `_agents/boc/notes/merge-html-edits-v22-draftboard.md` (16 items).
6. **Team colors spec** — `_agents/boc/notes/team-colors-spec.md` (recipe + mechanism + fallback).
7. **FB/Punter slot foundations** — `_agents/boc/notes/FB-P-SLOT-FOUNDATIONS.md` (10-step change set).
8. **V21 stats surface** — `_agents/boc/notes/v21-stats-that-explain-wins.md` (proposal).
9. **V22 Suggestions consolidated** — `_agents/boc/notes/V21-Suggestions.md` (9 sections, all Owner directives).
10. **V22 canonical shape** — `_agents/boc/notes/v22-canonical-shape.md` (five-minute header, P0/P1/P2, section order, cut/keep).
11. **Mermaid map** — `_agents/boc/notes/v22-mermaid-map.md` (3 diagrams).
12. **Biome house rules** — `_agents/boc/notes/biome-house-rules.md` (proposed config, verified rule names).
13. **NBA 2027 pool** — `_agents/boc/notes/nba_2027_pool.json` (538 records, schema shape).
14. **Cooper DeJean glitch** — `_agents/boc/notes/cooper-dejean-glitch.md` (root cause + 3-fix proposal).
15. **A7 invented-ratings provenance** — `_agents/boc/notes/invented-ratings-provenance.md` (origin UNKNOWN, quarantine recommended).
16. **E2E reconciliation** — `_agents/boc/notes/e2e-reconciliation.md` (superseded history, schema validation, durable locations).
17. **Week 1 locator fix** — `_agents/boc/notes/week1-locator-fix.md` (step added, SKIP, node --check PASS).
18. **Week-label verdict** — `_agents/boc/notes/WEEK-LABEL-VERDICT.md` (LABEL CORRECT BUT MISLEADING).
19. **Lechler recheck** — `_agents/boc/notes/lechler-claim-recheck.md` (transcription slip, CSV says P).
20. **Applier verification** — `_agents/boc/notes/applier-verification.md` (value-here-applier complete, merge-html-applier rough draft).
21. **Trap plain language** — `_agents/boc/notes/TRAP-PLAIN.md` (harmless, stale-count problem).
22. **Smoke test inventory** — `_agents/boc/notes/smoke-test-inventory.md` (read-only).
23. **Guide review** — `_agents/boc/notes/guide-review-moc.md` (ENDORSE with 2 corrections).
24. **Section 5 evidence/repo truth** — `_agents/boc/notes/section5-evidence-repo-truth.md` (6 items).

## Prompt for Claude
The compiled prompt is in `_agents/boc/notes/prompt-for-claude-final.md` (full progress + 71 numbered questions + 5 Owner questions).

## What BOC cannot do
- Edit the product file (`NFL Draft Simulator merged.html`) — read-only per AGENTS.md.
- Change protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS) — requires explicit approval (Owner has provided weights; Claude decides).
- Create git commits/branches/PRs — requires Owner authorization.
- Push to remote — requires Owner credentials.
- Invent player ratings, team assignments, or statistical outputs.

## What BOC recommends the Owner do next
1. Share the prompt-for-claude-final.md file with Claude (paste or push).
2. Authorize Claude to implement the changes (Claude is sole implementer).
3. Provide NBA 2K ratings source + version for the 2027 pool.
4. Decide: quarantine vs delete invented ratings files.
5. Decide: archived session contributions deletion scope.
