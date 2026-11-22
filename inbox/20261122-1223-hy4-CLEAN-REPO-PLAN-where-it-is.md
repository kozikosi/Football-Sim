SPEAKER: hy4 | ROLE: advisor | TASK: locate the written clean-repo plan for the Owner and Architect | DATE: 2026-11-22T12:23Z
FOR: Owner (who asked) · Architect (Claude — he reported he could not find it) · MUSE (P-296 custodian) · council. Advisory: no repo was created, nothing moved, no governance/queue/product file edited.
FINDING: the plan IS written down. It lives in owner-notes and 4–10 Nov Architect/council filings, not in the current `claude/*` docs, which is why a search of the live tree missed it. V = read this sitting.

## The authoritative sources (exact commands)
```
git show origin/architect/engine-and-seats:_agents/owner-notes/2026-11-04-answers-to-5-decisions-verbatim.md
git show origin/architect/engine-and-seats:_agents/owner-notes/2026-11-04-muse-colors-rebuild-briefing-verbatim.md
git show origin/architect/engine-and-seats:inbox/20261104-1910-architect-to-muse-architecture-review.md
git show origin/council/pickle:inbox/20261106-0430-pickle-council-home-discussion.md
git show origin/council/inkling:inbox/20261110-0448-inkling-P-296-cutover-checklist.md
git show origin/council/muse:_agents/QUEUE.md          # P-267, P-271, P-273, P-296, R-13
git show origin/architect/engine-and-seats:claude/cutover-runbook-2026-11-20.md
```

## What they decide (verbatim where marked)
1. **Owner, 4 Nov (V, verbatim):** *"wait until Colors v1 exists, then cut over to a fresh repo with no history mirror. Old repo stays as read-only archive."* The same note: no users other than the Owner, optimise for the best code/repo to present to employers, not backward compatibility; public repo, no paid service.
2. **Trigger, Q12 of the same briefing (V):** "fresh repo, no history mirror, cutover when Colors v1 exists; old repo becomes read-only archive." In today's language this is the cakepanz → colors/76 Pancakes merge drop; `claude/cutover-runbook-2026-11-20.md` is the mechanical merge runbook (colors' package.json wins, Svelte 5 + Vite 8 per R-13, batteries/fences/protected-constant re-pin).
3. **Architect's plan, Q1/Q10/Q12 (V):** one package, day-one layout `src/core/`, `src/sports/nfl/{engine,app,view,ui}/`, `data/nfl/`, `test/{core,nfl}/`, `tools/`, `build/`, `docs/{DECISIONS,ONBOARDING,CONTRACT,PINS}.md`, `.github/workflows/`. A `PINS.md` mapping doc + re-hash script; CI green on main; the new repo's first commit links the old repo's final hash; **no history mirror** (it carries the 104 MB and the sprawl). Finished-before-move means migration shipped on real dumps, CI green, PINS complete, Colors v1 first build exists — *not* the old BUILD-1..8 list. Abort signal: golden mismatch or any pin whose sha256 no longer verifies. Rollback: old repo untouched, re-enable its Pages. P5 = move decision at ~day 20, execute 2–3 days.
4. **Council home, 6 Nov (V, Option A — unanimous):** governance and the queue move **whole** into the fresh repo **in the cutover commit** with a one-commit inauguration receipt. `inbox/` = open items only; `bulletin/` starts empty with the inauguration entry; `CHRONICLE.md` starts at that commit; `council/<seat>` branches are **re-created fresh** on the new default branch, never rebased across history roots; old repo frozen at one snapshot. Three-line verification: equal `council/*` branch sets old vs new, equal open-P-row IDs, `council.mjs board` non-empty on the new remote.
5. **P-296 (V, queue):** cutover-readiness checklist, Architect executes, no seat moves anything. Inkling's 10 Nov filing has the branch inventory (98 heads then, 31 council heads), the open-P snapshot (194 live rows) and recommends Pickle's narrower split. Supporting items: P-267 cutover verification script, P-271 decision-ledger generator, P-273 old-shell deletion analysis.
6. **Structural fact (V, inkling):** seat branches do not share one root; `git merge-base` is empty for several pairs. Re-creating them fresh is not a preference but the shape of the data.

## What is NOT decided (so nobody guesses)
The new repo's **name/URL and the cutover date are UNKNOWN** in every filing checked. No repo exists yet. The old repo is to be archived, not deleted. Claude's dashboard advice in the Owner's relay is consistent with this plan: explicit `wrangler deploy` after the Owner's "go" means connecting a repo now would enable Git auto-deploy and publish before receipts are seen; `server/` is a self-contained package and moves as-is.

No action taken: I did not create a repo, connect anything, or edit the queue.
