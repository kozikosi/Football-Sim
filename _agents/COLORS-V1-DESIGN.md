# COLORS V1: design and build plan (Architect, 28 Oct 2026). Supersedes the "transplant into the w33 shell" plan in COLORS-V1-INTEGRATION-PLAN.md.
Owner, 28 Oct 21:57: w33 is buggy; do not rely on it for architecture or function; Colors is mine; verbatim in `owner-notes/2026-10-28-colors-creative-freedom-verbatim.txt`. I build from scratch, with the Owner's two fixed style points (team-tinted neutral colours; rose/gold fallback) and his page-level notes.

## Architecture (decided; ordinary, reversible)
- `colors/`: TypeScript source, no runtime dependencies. `src/engine/` is pure (no DOM, no Math.random, seeded `Rng`), `src/ui/` is the page, `build/build.mjs` strips types (TypeScript's own `transpileModule`) and emits **one self-contained `Football-Sim-Colors-v1.html`** (the delivered artifact stays one file; AGENTS.md §3 reading confirmed by the Owner's earlier answer).
- Tests: `node --test --experimental-strip-types "test/*.test.ts"` (VERIFIED working, 10 pass). `npm install` is unreachable in this sandbox (registry ENOTFOUND, VERIFIED), so no esbuild/Vitest; the global TypeScript is enough.
- Data: `data/madden27-ratings.csv` (1,941) + `data/free-agents-old-ratings.csv` (12) compiled into the build; players are identified by `name|pos|team`, never name alone (3 duplicate names).
- Colour: the 32-team table (3 hexes each, Owner's 22 Oct table; read from `ZPB_TEAM_COLORS` in w33 and checked against the Owner's table before use). Per-team UI palette: neutral, tinted, brightened when dark; the algorithm is a port of w33's `zpbPackFor` so the homepage dropdown colours match, tested for contrast. Fallback theme: soft rose near-white, gold accents. Light/dark toggle fixed in the footer on every page.

## Engine order (each step has a test that can fail)
1. Seeded RNG (done, 3 tests). 2. Kicking model: in-season rating (done; 82 who goes 2/4 -> 78.5, a 78 who goes 7/7 with two from 55+ -> 81.6). 3. Data loader + player identity (done). 4. 32-spot table, REV 3 flex, optimal lineup, 3-4 / 4-3 base, NICKEL/DIME fields (**done 29 Oct**: `slots.ts`, `flex.ts`, `hungarian.ts`, `lineup.ts`, `test/lineup.test.ts`, 27 tests; see "Step 4 notes"). 5. Team ratings + matchup model + game: ported from the lab's fitted literals. 6. **Drive generator** (no penalties; clock; 3&O/4&O real; overtime with the current rules, playoff overtime gives both teams a possession). 7. Season, standings, tiebreakers, playoffs. 8. CPU draft (GM traits, round-1 floors, no busts). 9. Awards and recaps built from the same drives.
Identities asserted in tests: drive points = final score; drive yards = team yards; punts, takeaways, sacks in the drives = the box score; clock sums to 60 minutes (+ overtime).

## UI (my design; Owner's fixed points above)
Cinematic: scene transitions, text that arrives and leaves, the draft room, game days as a live drive ticker, a champion's night. Mobile first (390 px, no sideways scroll). Details are decided as screens are built; w33's screenshots are the general style reference only.

## Council work (requests in PRIORITIES.md, not blocking)
P-204 real field-goal accuracy by distance, P-205 real drive statistics, P-206 current overtime rules and outcomes. Later: Playwright screenshots at 390 and 1280 px of each screen and a verifier run of every test order.

## Step 4 notes (Architect, 29 Oct 2026)
- **Flex source is `tools/mathlab/flex.json` REV 3 (108 rules), not `results/flex-compiled.json`**, which is still REV 2 (QB may still play WR/SS there). `flex.ts` is a typed copy; a test compares it with flex.json rule by rule. Per the 28 Oct rulings QB may flex only to RB and FS (6); AGENTS.md section 3 was corrected to match.
- **Objective:** sum of spot weight x (OVR - flex penalty), solved exactly. Priorities in `lineup.ts`: a QB is never forced into an unlisted spot; every rostered player plays before any empty spot gets a 70 replacement; fewest -8 emergency fills; then value. Verified against brute force (60 random small cases) and a greedy baseline on three real rosters.
- **Real data (VERIFIED, `lineupFor` on all 32 rosters, rosters of 56-67):** 0 emergency fills in 4-3 and in 3-4; 64 lineups in 0.29 s.
- **Finding, for step 5 and the Owner:** the totals of the two formations are not comparable. The spec's rule "OLB rated as WILL, ILB as MIKE" gives 3-4 a spot SAM (30 -> 240) and DT2 (300 -> 260), so a flat roster is worth 170 x 70 more in 3-4 before any flex. A CPU "pick the higher total" base choice would always pick 3-4, so `bestBase` was removed; the base is to be chosen by team rating in step 5. Whether the model should give a 3-4 OLB2 the full WILL value is a product call to confirm with the Owner (default: yes, as the Owner wrote it).
- Not checked: DL5 under a 3-4 (kept as a rotational lineman, INFERRED); how the draft UI will present the swapped spots; diffctx (PyPI unreachable here).
