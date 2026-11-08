# Slot-pair flex penalty comparison

product: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super/Football-Sim-PreColors.html (sha256 40233d6be00e987c) · ovr: 80

| from → to | Owner (REV 4) | REV-5 cap 10 | Proposal (QB->FS = 6) | OVR-cost proxy |
|---|---|---|---|---|
| QB→FS | 10 | 10 | 6 | 30 |
| TE→WR1 | 2 | 2 | 2 | — |
| CB→WR1 | 4 | 4 | 4 | — |
| CB→FS | 0 | 0 | 0 | — |
| RB→WR1 | 4 | 4 | 4 | — |
| WR→TE | 4 | 4 | 4 | — |
| TE→RB | 4 | 4 | 4 | — |
| OT→OG | 0 | 0 | 0 | — |
| SS→CB | 6 | 6 | 6 | — |
| FS→CB | 4 | 4 | 4 | — |

## Note

QB->FS: Owner REV 4 = 10, REV-5 cap = 10, proposal = 6 (QB->FS set to 6 instead of 10). Product FLEX.QB = {} => any QB flex = EMERGENCY_PENALTY 8 (mismatch, D-010).

Proposal: penalty = min(slot-pair-specific penalty, cap). QB->FS set to 6 (rare but usable) instead of 10 (prohibitive). TE->WR1 at ~6 is meaningful but not prohibitive (Owner REV 4 -10 under-prices it at 0.63 wins).
