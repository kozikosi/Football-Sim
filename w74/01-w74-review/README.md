# 01-w74-review — Second architecture review of Claude's 551af1b reply

**What this is:** Z.ai's w74 review — the full reply (not just the types) checked against the branch tip `425f72a`, Kosi's three decided answers (real names · Svelte · 80/25/10), and my w72/w73 records.

**Applies to:** branch `architect/engine-and-seats` (verified at `425f72a`). No repo files changed by this item — it is a review document. The two receipts it relies on that a reviewer can re-run:
- `cd colors && npm test` → 284/284 (re-run this session in a fresh sandbox).
- `git show origin/gh-pages:Football-Sim-Z-post-blue-w70.html | grep -c Math.random` → 43 lines / 62 occurrences.

**Decisions made that need ruling:** the consolidated "Rulings wanted" table is §D of the review (nine items, ranked; only F1 gates the Draft Board slice). The headline calls: the hydration rule is buildable with four named gaps (F13–F16); the DatasetLoader fictional-default contradiction (F11) is still open and now has a draft replacement to rule on (item 4f); the missing tsconfig does not flip the w73 verdict but should close before the pattern freeze; Claude's split of the 43 debt lines (31/7/5) is adopted over mine (36/2/5); his "hydration code not written" claim is stale — weekmap.ts already implements the engine half (F17).
