# OWNER QUESTIONS — Consolidated (≤5 per brief)

**SPEAKER: UK | ROLE: Council Advisor | TASK: Owner Questions | DATE: 2026-10-23T06:30:00Z**

---

## Owner Questions (10 total, grouped by urgency)

### URGENT (answer now)

| # | Question | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 1 | **Quarantine invented ratings?** `sports/football/ratings.json` + `sports/basketball/all_time_draft.json` have invented ratings (Stephen Curry in NFL, Mahomes 97.8 decimals). Tool ready. | **YES — quarantine now** | Hard-rule violation ships in product |
| 2 | **47-message recovery?** 47 lost messages recoverable from `stash@{1}`. | **YES — append with content IDs** | Board hole vs larger board |
| 3 | **Freeze shared docs?** Second loss event today. Commit every round to `council-record` branch. | **YES — GLM as sync owner** | Third loss event |

### HIGH (answer this week)

| # | Question | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 4 | **Promotion criteria?** What gate must pass before `verified-merge-<hash>` tag? | **REQUIRE E2E v2 PASS** (Week 1 + 390px CTA) | Promoting PARTIAL candidate |
| 5 | **Label collisions?** Adopt content IDs (sha256(body)[:8]) as mandatory header? | **YES** | Continued collisions; untraceable messages |
| 6 | **Pool size?** Per-sport (1,500 football / 500 basketball / etc.) or flat 1,200? | **Per-sport (R-16)** | Under-built pool or wasted effort |

### MEDIUM (answer when convenient)

| # | Question | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 7 | **Architecture: repos or folders?** Separate repos or clear folders in one repo? | **Provisional: folders in one repo** (protect NFL, per-sport rules, self-contained HTML, engine extracted after reuse) | Premature extraction delays V22; late forces rework |
| 8 | **E2E harness archive?** Archive previous run before starting new? | **YES** | Lose verified evidence (65.9 MB trace) |
| 9 | **PR #5 contributor discovery?** Deem inert due to mis-attribution hazard? | **YES** | Mis-attribution propagates |
| 10 | **Default tab?** Draft (current) or Season-first (donor)? | **Season-first** (matches donor + instructions) | One line change |

### Decision Boundary
- **Owner-only:** Product concept, permissions, publishing, protected constants, architecture repos vs folders
- **Architect-only:** Technical choices (biome fix, gate scope, merge manifest, default tab, POSITION_TIER deletion, E2E driver adoption)
- **Council recommendation:** Proposals that can be reviewed while implementation waits
- **Agent follow-up:** Evidence gathering, test repair, source checking, doc cleanup

### Questions Already Answered (Do Not Re-ask)
- **Math.LN2:** UNKNOWN author, Pre-Colors clean, effect documented (kicker becomes highest-weighted slot)
- **Build pins:** 4 pins verified (V20, donor git, donor disk, Pre-Colors, V21)
- **Who authored Math.LN2:** 5 commits, none a single clean edit — unrecoverable
- **auto-approve-handoff.js, dispatch_gate.py, lane_commons_gate.py:** These files DO NOT EXIST — aspirational names only
- **Biome 2.6.2:** Installed but config has deprecated `recommended` field; lint.mjs parser has 3 bugs
- **Registry:** Small structured file (JSON), one per item — already implemented in `tools/check-tasks.mjs`

---

**SPEAKER: UK | ROLE: Council Advisor | TASK: Owner Questions | DATE: 2026-10-23T06:30:00Z**
