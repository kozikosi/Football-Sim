# VL — P-232 investigation: stale FLEX table (QB flex only to FS per REV 4)

SPEAKER: VL | ROLE: Council seat | TASK: P-232 (model lineup out of position — stale FLEX table root cause) | DATE: 2026-11-10

## What P-232 alleges (root cause, MUSE 2026-11-03)

Z.ai's w62 embeds a STALE FLEX table: `QB:{RB:6, WR:6}` — but Owner's REV 4 (29 Oct) says QB flexes ONLY to FS at -10 (QB->RB and QB->WR removed). This lets the model lineup put RB1 at QB-adjacent skill slots, WILL at DL, etc. (P-232 examples: RB1=Jon Runyan OG, TE1=Kenneth Walker RB, WILL=Dexter Lawrence DL). Fix: sync the embedded FLEX table to `tools/mathlab/flex.json` REV 4.

## Part 1 — REV 4 confirmed (VERIFIED)

Source: `tools/mathlab/flex.json` @ `origin/architect/engine-and-seats` sha `97d7e9d`, sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` (99 rules). Extracted to `_agents/vl/deliveries/zai-d1-verify/flex-99-live.json` during the ZAI-D1 verification (P-322).

QB row: `{"FS": 12}` — QB flexes to **FS only**, at tier 12. No `QB:RB`, no `QB:WR`. No role lists QB as a destination (nothing flexes TO QB).

This matches the Owner's REV 4 rule (QB flexes ONLY to FS). REV 4 side is confirmed.

## Part 2 — live Pre-Colors build: embedded FLEX does NOT match REV 4 (VERIFIED)

`Football-Sim-PreColors.html` (current verified build, sha256 `40233d6be00e987c`) embeds `const FLEX = {...}` at line 940. The QB entry (line 951):
```
QB:{}    // QB flexes to NOTHING
```
So in the shipped live product, QB cannot flex to ANY slot — not even FS. REV 4 requires QB->FS at tier 12. **MISMATCH: the embedded live FLEX table is not synced to REV 4.**

This is the same class of problem P-232 identifies (embedded FLEX table out of sync with REV 4), though the live build's specific deviation is `QB:{}` rather than `QB:{RB:6, WR:6}`.

## Part 3 — could not locate Z.ai's "w62" build (BLOCKER for exact claim)

P-232's specific claim is that Z.ai's w62 build has `QB:{RB:6, WR:6}`. I searched `origin` for `w62` and for builds whose embedded flex table has QB flexing to both RB and WR. `w62` matched only image filenames (false positives); no build named w62 or a `Football-Sim-...-w62.html` was found. I could not extract/confirm Z.ai's w62 embedded flex table.

So I **cannot confirm** the exact `QB:{RB:6, WR:6}` stale table claim. What I **can** confirm: REV 4 = QB->{FS:12} only, and the live Pre-Colors embedded FLEX = QB:{} (also not REV 4). Either way, an embedded FLEX table that allows QB->RB/QB->WR (or omits QB->FS) contradicts REV 4 and must be synced.

## Proposal (for Architect / Z.ai integration — seat proposes, does not edit builds)

Sync every embedded FLEX table (Z.ai's w62 and any other build) to `tools/mathlab/flex.json` REV 4 so that QB flexes ONLY to FS at tier 12 and QB->RB/QB->WR are removed. The `flexRule(pos,slot)` function (`Football-Sim-PreColors.html:955`) reads `FLEX[pos]`, so correcting the embedded `FLEX` object fixes the model lineup's out-of-position placement at the source.

## HOW TO CHECK

- `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` → confirm `QB:{"FS":12}` only (99 rules, sha `0a26d7c2...`).
- `grep -n "^  QB:{}" Football-Sim-PreColors.html` → line 951, confirms live build QB flexes to nothing (mismatch vs REV 4).
- After sync: confirm no `QB:RB`/`QB:WR` and `QB:FS` present in any embedded FLEX table; model lineup no longer assigns RBs/WRs/DLs to QB/skill slots they don't naturally play.

## Labels

VERIFIED: REV 4 flex.json QB row (`{"FS":12}`) and live Pre-Colors embedded FLEX `QB:{}` mismatch. BLOCKER (not a negative finding): Z.ai's specific "w62" build not located, so its exact `QB:{RB:6, WR:6}` table could not be re-extracted. No invented data.
