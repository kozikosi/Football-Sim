# OWNER QUESTIONS — Consolidated (All Open Questions for Kosi)

**TO: OWNER (KOSI)**
**FROM: UK (Council Advisor)**
**DATE: 2026-10-23T10:30:00Z**
**SUBJECT: All Open Questions Requiring Your Decision**

---

## ⚠️ URGENT (Answer Now — Blocks Work)

| # | Question | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 1 | **Quarantine invented ratings?** `sports/football/ratings.json` + `sports/basketball/all_time_draft.json` have invented ratings (Stephen Curry in NFL, Mahomes 97.8 decimals). Tool ready. | **YES — quarantine now** | Hard-rule violation ships in product |
| 2 | **47-message recovery?** 47 lost messages recoverable from `stash@{1}`. | **YES — append with content IDs** | Board hole vs larger board |
| 3 | **Freeze shared docs?** Second loss event today. Commit every round to `council-record` branch. | **YES — GLM as sync owner** | Third loss event |

## HIGH (Answer This Week)

| # | Question | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 4 | **Promotion criteria?** What gate must pass before `verified-merge-<hash>` tag? | **REQUIRE E2E v2 PASS** (Week 1 + 390px CTA) | Promoting PARTIAL candidate |
| 5 | **Label collisions?** Adopt content IDs (sha256(body)[:8]) as mandatory header? | **YES** | Continued collisions; untraceable messages |
| 6 | **Pool size?** Per-sport (1,500 football / 500 basketball / etc.) or flat 1,200? | **Per-sport (R-16)** | Under-built pool or wasted effort |
| 7 | **Architecture: repos or folders?** Separate repos or clear folders in one repo? | **Provisional: folders in one repo** (protect NFL, per-sport rules, self-contained HTML, engine extracted after reuse) | Premature extraction delays V22; late forces rework |
| 8 | **E2E harness archive?** Archive previous run before starting new? | **YES** | Lose verified evidence (65.9 MB trace) |
| 9 | **PR #5 contributor discovery?** Deem inert due to mis-attribution hazard? | **YES** | Mis-attribution propagates |
| 10 | **Default tab?** Draft (current) or Season-first (donor)? | **Season-first** (matches donor + instructions) | One line change |

## MEDIUM (Answer When Convenient)

| # | Question | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 11 | **CB3 flex value?** 0 (free) or 2 (penalty)? | **0 (free)** | Flex matrix shape changes |
| 12 | **All-time adjustment (-5)?** Not approved. Purpose? Eligible players? Calibration? | **No -5 until decided** | Mis-calibrated ratings across all-time pools |
| 13 | **3-4 real front vs label?** Relabel (UI only) or real front (changes roster/slots)? | **Relabel for V22, real front for V23** | Roster/depth chart/draft order changes |
| 14 | **Game ball tie rule?** Confirm "by wins" = lowest OVR (not fewest wins)? | **Confirm reading A** | Needs per-player wins plumbing (reading B) |
| 15 | **Defender star criteria?** Confirm perfGrade ≥ 90 (not p.ovr ≥ 90)? | **perfGrade ≥ 90** | Different threshold, different stars |
| 16 | **Architecture: repos vs folders?** (already asked) | **Folders in one repo** | Premature extraction delays V22 |
| 17 | **Pool size:** 1,500 football / 500 basketball / 1,500 hockey / 1,500 soccer / 2,000 baseball | **Per-sport (R-16)** | Under-built pool or wasted effort |
| 18 | **SAM scarcity:** 5 records for 32 teams in all-time intake? | **Yes — SAM required** | 27-player deficit in every all-time draft |
| 19 | **Default tab:** Draft (current) or Season-first (donor)? | **Season-first** | One line change |
| 20 | **Promotion criteria:** What gate must pass before `verified-merge-<hash>` tag? | **REQUIRE E2E v2 PASS** | Promoting PARTIAL candidate |

## Decision Boundary
- **Owner-only:** Product concept, permissions, publishing, protected constants, architecture repos vs folders
- **Architect-only:** Technical choices (biome fix, gate scope, merge manifest, default tab, POSITION_TIER deletion, E2E driver adoption)
- **Council recommendation:** Proposals that can be reviewed while implementation waits
- **Agent follow-up:** Evidence gathering, test repair, source checking, doc cleanup

## Questions Already Answered (Do Not Re-ask)
- **Math.LN2:** UNKNOWN author, Pre-Colors clean, effect documented
- **Build pins:** 4 pins verified (V20, donor git, donor disk, Pre-Colors, V21)
- **auto-approve-handoff.js, dispatch_gate.py, lane_commons_gate.py:** Files DO NOT EXIST — aspirational names only
- **Biome 2.6.2:** Installed but config has deprecated `recommended` field; lint.mjs parser has 3 bugs
- **Registry:** Small structured file (JSON), one per item — already implemented in `tools/check-tasks.mjs`

---

**SPEAKER: UK | ROLE: Council Advisor | TASK: Owner Questions | DATE: 2026-10-23T10:30:00Z**