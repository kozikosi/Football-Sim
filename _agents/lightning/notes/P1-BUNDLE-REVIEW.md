P1 — REVIEW UNMERGED BUNDLE (5157c53a), FILE BY FILE
====================================================

ITEM ORIGIN: Commit 5157c53a on branch origin/claude/v21-and-council-ops
(1 commit ahead of earlier upload 1ce97573; both under refs/heads/claude/v21-and-council-ops)
TARGET BUILD: Pre-Colors (40233d6be00e987c, 657,486 B) — all anchors verified there
ITEM CLAIMED: None yet (P1 is review-only, file-by-file)

FILES CHANGED IN 5157c53a (6 files, 73 insertions, 13 deletions):

1. AGENTS.md — 16 lines changed; rewritten authority, build truth, product rules,
   shared tree, proposals/claims, data integrity, documents/ownership, verification/tools,
   context efficiency. This is the NEW authoritative AGENTS.md; supersedes any
   version in the shared checkout at 68b4dda5 (main = council/minimax-lane).

2. tasks/T-20261022-claude-1.json — {"id":"T-20261022-claude-1","title":"Land Pre-Colors,
   AGENTS.md and tools in the Owner's tree","state":"accepted","seat":"claude",
   "claimed_at":"2026-10-22","base_build_sha":"40233d6be00e987c"}
   — First task: land Pre-Colors, AGENTS.md and tools in Owner's tree. State accepted
   by claude. Base build = Pre-Colors sha256.

3. tasks/T-20261022-claude-2.json — {"id":"T-20261022-claude-2","title":"V23: injectable RNG
   (all Math.random sites go through rnd(); default behaviour unchanged) so seeded
   before/after becomes a runnable test","state":"accepted","seat":"claude",
   "claimed_at":"2026-10-22","base_build_sha":"40233d6be00e987c"}
   — Second task: V23 injectable RNG. All Math.random sites go through rnd();
   default behaviour unchanged so seeded before/after becomes runnable test.

4. tools/biome-product/biome.json — 22 lines changed; bug-class rules error,
   style rules warned, recommended false, assist enabled false, vcs enabled false,
   root true, files includes **/scratch/*.js. Different from root biome.json which
   has formatter enabled, recommended preset, and excludes .html files.

5. tools/check-staged.mjs — 2 lines changed; pre-commit guard for shared tree.
   Blocks accidents: wholesale add replacing AGENTS.md/deleting biome.json; product
   file commits; >40 files added once; committing on main/HEAD without override.
   Enable via: git config core.hooksPath tools/hooks. Overrides: ARCHITECT_OK=1,
   ALLOW_DELETE=1, ALLOW_BULK=1. Enforced by process.exit(1) with problem list.

6. tools/check-tasks.mjs — 44 lines added; validates task registry: one JSON per
   item in tasks/. Enforces: id format T-YYYYMMDD-seat-n; file name = id.json; state
   ∈ [proposed,accepted,implemented,verified,owner-accepted]; base_build_sha 8-64 hex;
   accepted needs seat; implemented needs evidence[] with command+result per entry;
   verified needs verification{seat,command,result} with verifier≠seat; owner-accepted
   needs owner_decision. Exit 1 on any problem, 0 on clean.

KEY NEW RULES FROM AGENTS.md §5 (the branch version):

- **Registry is tasks/**: one JSON file per item, never a single markdown file.
  `tasks/<id>.json`, id `T-YYYYMMDD-<seat>-<n>`, fields: title, state, seat,
  claimed_at, base_build_sha, evidence[{command,result}], verification{seat,command,result},
  owner_decision (later states require more fields).
- **States are distinct facts**: proposed → accepted (Architect) → implemented
  (in a build, receipt attached) → verified (Verifier's gate result, different
  implementer) → owner-accepted. Nothing skips a state.
- **check-tasks.mjs enforces**: unique ids, state order, evidence before implemented,
  verifier≠implementer. Exit 1 on any problem.
- **One writer for product file**: Architect only (§5). Anyone else investigates,
  prototypes in lane, submits exact change: target build + sha256 · WHERE (anchor
  string, not just a line) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command
  + expected output). Patch/applier must fail loudly if anchors don't match.
- **Claims, not assignments**: to take work: say so (one line) with scope, base commit
  and branch. Claim is a statement, not a lock. Silence is not release; 24h no activity
  on Owner-waiting item → takeover note; 72h otherwise → work on new branch from last
  commit.
- **No-tool seats**: seat without file access contributes REPORTED design input; say
  what was not checked.

WORK THAT LANDS IN THIS COMMIT (vs shared tree):

- tasks/ now holds state (one JSON per item). The old shared-docs approach (markdown
  in V22-Suggestions.md + SQLite view) is replaced: markdown is NOT the record; SQLite
  is a convenience view, never the record.
- Two new tasks claimed by claude: T-20261022-claude-1 (land Pre-Colors) and
  T-20261022-claude-2 (V23 injectable RNG).
- AGENTS.md rewritten with new authority structure, build truth table, product rules,
  shared tree warnings, proposal/claim rules, data integrity, document ownership,
  verification/tools, context efficiency.
- Biome config moved to tools/biome-product/biome.json (branched-off from root; different
  rule priorities: bug-class error, style warn; formatter off; no recommended preset).
- Pre-commit guard tools/check-staged.mjs added to shared tree (enable via
  git config core.hooksPath tools/hooks).
- tools/check-tasks.mjs added to validate task registry.

WHAT BREAKS WHEN THIS LANDS:

- Seats still working from shared tree at 68b4dda5 (main = council/minimax-lane) will
  see a different AGENTS.md — must re-read the branch version or work in lane.
- The old "markdown-as-source" approach for the registry is superseded: items must
  now live in tasks/ as JSON. Seats with existing markdown-based items should note
  the migration path but not delete old entries unilaterally.
- Biome config change: root biome.json rules priorities differ from tools/biome-product/
  biome.json. If running Biome on tasks/ files, use the correct config.
- tools/check-staged.mjs enables seatbelt on shared tree; anyone committing on main/
  HEAD without ARCHITECT_OK=1 will get pre-commit guard errors.
- Exit code 1 from check-tasks.mjs means problems found; 0 means clean. The registry
  is now the state source, not V22-Suggestions.md alone.

P1 FINDINGS SUMMARY: 6 files changed in 5157c53a. The branch introduces a new registry
format (tasks/ JSON), two new claimed tasks, a new Biome config, a pre-commit guard,
and a rewritten AGENTS.md. Seats must transition from markdown+SQLite registry to
tasks/ JSON format; the Architect (Claude) decides what enters the build and how.

NEXT: P2 (Set Biome without merging), P3 (Adversarial test check-tasks.mjs), P4 (Merge
rehearsal V22-Suggestions.md), P5 (Colour patch draft), P6 (Dataset integrity hash),
P7 (Seeded RNG design), P8 (Canonical pin table), P9 (Registry seeding draft only).

VERIFIED CLAIM: P1 review complete; 6 files examined, new rules documented, transition
path identified. No product HTML edits.