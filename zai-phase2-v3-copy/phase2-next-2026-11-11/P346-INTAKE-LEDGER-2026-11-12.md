# INTAKE LEDGER — the Owner's P-346 follow-up prompt (Phase 2 v2 corrections + three open numbers + four builds)

**From:** Z.ai (seat ZAI) · **Date:** 2026-11-12 · **Verbatim source:** the Owner's IM message (MUSE-formatted P-346 follow-up), received at chat start.
**Rule (START-OF-CHAT §5.1):** the Owner's message is law, verbatim. Every item below is carried into the delivery or answered in the final report.

## §1 Standing bounds (noted, not re-litigated)
1. FB = scarcity (FB>RB 2, FB>TE 6; guard 18 NOT used for FB); C>OG 6 ("nonissue"); ~10% totals bar for Phase 1; basketball deferred until football is done; historical Madden ratings deferred.
2. λ dual-reported: ships 0.40, 0.20 reported everywhere; no Owner ruling on the λ objective.
3. V3 stays a variant pending the per-slot C>OG answer.
4. Read-only: `colors/src`, `flex.json`, `flex.ts`, the product file. Build in my lane only.
5. Flex oracle: live 99-rule table (`flex-99-live.json`, byte-identical to `architect/engine-and-seats:tools/mathlab/flex.json`).

## §2 Batch rule
- One response when ALL work is complete (every response costs the Owner a publish step). Blocked pieces are named with the blocker, not held.
- Every delivery ships `CHECKSUMS.txt`, algorithm labelled sha256, **hashing the files exactly as shipped** (the CRLF slip has bitten twice — root-cause fix required, not just entries).

## §3 Part A — Fix 4 (CHECKSUMS)
- [ ] Update two stale entries in `corrections/CHECKSUMS.txt` (synthetic_pbp.csv → bc59cc1c…/3,071,585; synthetic_snap_counts.csv → 94ca85d3…/990,279).
- [ ] Same two + spot-table line in top-level CHECKSUMS.txt (spot_table_staged_vs_real.csv → LF 4,372; content verified identical, line endings only).
- [ ] Root-cause fix: the checksum step hashes the shipped bytes; the step is stated in the REV 3 note so the next reviewer can check it.
- [ ] Re-verify: corrections 27/27, top-level 45/45 by manual sha256sum; command + output quoted in REV 3.
- [ ] Every corrected file quotes MUSE's review verdict line inline (Fixes 1–3, 5–9 format).
- [ ] Add `phase2-real-2026-11-11/CHECKSUMS.txt` OR correct the README's claim (top-level coverage exists either way).

## §4 Part B — three open numbers (each with a receipt, not an assertion)
- [ ] **B1** 2020 FB share: mine 0.0996 vs MUSE 0.0736 (all-FB play share, 11×FB-labeled offense snaps / team offense snaps, REG, league mean over 32, 0.0 when no FB). Say which players/rows differ between my adapter and a plain `position == 'FB'` filter, and which number is right.
- [ ] **B2** λ conditioning n: mine 572 vs 2023 REG population 544 (272×2). (a) what the 572 counts; (b) ship the conditioning script (~40 lines) — the script is the receipt.
- [ ] **B3** 2016 gravity: mine 0.325 vs MUSE 0.383. Which teams/players drive the gap; denominator stated explicitly in filing + JSON (ALL team deep targets, not WR-only).

## §5 Part C — four builds (one zip)
- [ ] **C1** era-anchored E table: E[role][season] 2016–2025 from the P-344 files (same seat-share machinery, every seat key emitted); Owner's tiers re-derived per season; league-snapshot generalization; static/per-season/per-era recommendation with costs. **Settle: first two rows reproduce FB 0.1426→0.0814 and DIME 0.094–0.159 (mean 0.1263) exactly.**
- [ ] **C2** conditional-λ validation: two-gap Lab fit (gaps 10/20, R = Wins20/Wins10 first); fitted λ → conditional-SD table N∈{9,11,13}, holdout 2023–2025 fit on 2016–2022, max |SD error|; unconditional cross-check (D4: unconditional lands 23–75% higher). Engine not in my lane → validate against the engine's own dispersion stand-in and say so.
- [ ] **C3** gravity fold: emit `gravity_index` per team-game (fold or staging post-pass); staged vs real 0.304–0.335 per season (staged | real | Δ); event-schema spec (`double_team` bool charting-class — state that; `coverage_assignment`; `usage_share`). Staged side not producible → say exactly which field is missing; build real table + fold stub; **settle: real side reproduces b2_gravity_index.json exactly.**
- [ ] **C4** DIME re-anchor: re-anchor package tables to measured share (static ~0.12–0.13 or per-season; recommendation + costs); DIME_W re-derivation target **0.126 league-mean, not 0.15**; re-derived situation blend, staged | real | Δ per season. Do NOT touch the engine's DIME_W (Architect's file) — deliver as proposal.

## §6 Innovate (standing Owner rule, in full)
- Ideas with receipts, strong enough to become P-items; file in inbox with receipts, not verdicts. (per-era guard form, sharper moment than Var(points|drives=N), second gravity stat, package-table shape.)

## §7 Delivery shape
- One zip, one response: `corrections/` (REV 3), `phase2-next-2026-11-11/` (C1–C4, each with deterministic script, results JSON, run log, at-a-glance table), `inbox/` (B1/B2/B3 notes), `README-DELIVERY` (per part: what verified, what is open), `CHECKSUMS.txt` (sha256 on shipped bytes, 100% manual verify, command + output quoted).

## §8 Session log
- Bootstrap: cloned repo shallow; `council/zai` START-OF-CHAT-ZAI.md read (wave-55 REV 15, fallback chain item 2 — newest wave package; the root-level `_agents/zai/START-OF-CHAT-ZAI.md` does not exist on the branch, the wave packages carry it); GLYPH.md (lane state, P-322-era) read.
- Environment: P-344 raw 30/30 fetched + sha256-verified against the manifest (log shipped); P-1 ledger.json + staged.json from council/vl (staged hash `0f749ea5…` verified = the review's file hash); harness + prototype + flex-99-live.json from the v2 delivery copies.
- Regression gate: `phase2_real.py` (patched paths only) re-run --reg-only → JSON IDENTICAL to shipped `phase2_real_results_reg.json` on the fresh files.
