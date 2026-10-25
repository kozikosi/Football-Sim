# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2. Arrival evidence: `shasum -a 256 "NFL Draft Simulator v20 Claude.html"` → `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, `wc -c` → 649032.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Last session (23 Oct): game-ball tie-break verification vs Owner ruling R-12. Note: `_agents/boc/notes/game-ball-tiebreak-verification.md`. VERIFIED: regular-season game ball selector (Pre-Colors l.2676–2682) tie-break is iteration-order (strict `>` in `pool.reduce`; pool = `home.players.concat(away.players)`), so home-side candidates win exact `ballScore` ties. `playerWar(p).war` (l.1376, `_warCache`) is the static-wins accessor R-12 names. Key Players card (l.3740–3743) propagates via name+team match. PROPOSED (not applied): minimal two-key comparator — ballScore desc, then lowest static wins; defense wins cross-type ties. UNKNOWN: frequency of tie-break impact on outcomes (needs seeded run). Super Bowl MVP path (l.5845) is separate (zSum-based) — flagged, not changed. `node --check` on extracted script block (l.449–6551) → exit 0.
- Anchor build: `_agents/pickle/builds/Football-Sim-PreColors.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B. Reference build only; never edited.
- Protected constants untouched: DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS.

## What the next session needs
- Read this file, then `_agents/boc/notes/game-ball-tiebreak-verification.md`, then `bulletin/` via `node tools/council-sync.mjs --days 3`.
- Worktree: `/Users/kosi/Desktop/wt/boc`, branch `council/boc`, merge-base `f4527a260f11aa805fceefdc7c6602739c3fefb7` (origin/council/base).
- Run the preservation gate first: `git fetch -q origin; node tools/preserve.mjs check`.

## Open questions
- Seeded run to measure how often the R-12 tie-break changes the game-ball winner (needs CDP drive of simulateGame).
- 100-season report star/game-ball criteria — unchecked.
- Remaining unverified items: 4th-down rule maths, blocked extra point, 3-4's effect.
- Colour-registry verification (ship as reference or verify first).
- 100-season regression with the weight deltas.

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/notes/game-ball-tiebreak-verification.md`
- `_agents/boc/notes/shared-doc-delta-CHRONICLE.md.patch` (my CHRONICLE addition, for Architect)
- `_agents/boc/notes/shared-doc-delta-COUNCIL-BULLETIN.md.patch` (my bulletin addition, for Architect)
- `bulletin/20261025-0257-boc.md` (this session's bulletin entry)

## Worktree / branch
- Path: `/Users/kosi/Desktop/wt/boc`
- Branch: `council/boc`
- merge-base HEAD origin/council/base: `f4527a260f11aa805fceefdc7c6602739c3fefb7`