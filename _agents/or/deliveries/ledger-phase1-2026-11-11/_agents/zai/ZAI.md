# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git push — the Owner relays the end-of-chat zip. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 55; headless verify suites v8..v11 + the per-wave live batteries (w46..w55); style guide; FB/Punter math; the PLAYLED play-level prototype and its receipts (receipt A port identity 9.09e-16, MUSE-verified); **the Play Ledger Phase 1 (this session): the staging engine that conserves the REAL drive engine's totals exactly, verified against the engine's own live-read constants**.

## Current work
- **Play Ledger Phase 1 SHIPPED (session 28, 2026-11-11) — the snap ledger, per MUSE's `prompts-2026-11-05/zai-ledger-phase1-2026-11-11.md`.** The PLAYLED prototype re-anchored: the drive engine stays authoritative, plays are staged INSIDE each drive so they sum to its realised totals exactly. Pipeline: `run_engine.ts` (runs the REAL Architect engine read-only via `node --experimental-strip-types`, 1,300 games × 3 cells) → `stage_plays.py` (staging: play types, exact yardage closure, packages, spacers, attribution, gravity) → `ledger.py` (the fold: 32-spot snap shares, package participation, gravity counts, purity) → `measure_ledger.py` (receipts R1–R5 vs live-read engine constants). Headline receipts: countable channels (plays/sacks/points/giveaways) 100.000% pure in 2,600 team-games; yardage 99.61% by volume with a named engine-artifact class (~2.8% of drives, median 5 yds — the engine allocates per-drive yards sometimes no play can carry; surfaced, not hidden); DL5 play-share 31.1% vs the engine's MEASURED 0.33 (agree, −1.9); DIME 6.9% vs DIME_W 0.15 (disagree, −8.1 — flagged for Phase 2, nothing edited); PERS direction Spearman 0.7; weights-vs-shares Spearman 0.80/0.81; FB play-share 12.6% at weight 25, value-per-play-share 198 vs RB1's 321 (the socialism measurement); gravity DT1 32 / DE1 19.4 / WR1 0.15 per team-game (INFERRED placeholders; WR1 undercount finding: the deep-CATCH trigger almost never fires).
- **Engine hygiene:** the Architect's tree was consumed via a read-only git worktree; `git status` clean there; `flex.json`/`flex.ts` untouched; the muse-branch flex copy proved stale (FB 30) and the LIVE table (FB 25, 99 rules) was read from `architect/engine-and-seats` directly.

## What the next session needs
- **Read first:** `deliveries/ledger-phase1-2026-11-11/LEDGER-PHASE1-REPORT-2026-11-11.md` (the receipts + Phase 2 data request + the IDEA list), then `_agents/zai/START-OF-CHAT-ZAI.md` REV 16 §3, then `notes/LEDGER-PHASE1-INTAKE-2026-11-11.md` (the 13-line intake with the I-1..I-5 interpretations the Owner may veto).
- **If the Owner green-lights Phase 2:** the data request is report §7 — per-player snap counts by team-game 2023–25 (the spec-12.1 class), nflverse play-by-play (`personnel_o`/`personnel_d`/`defenders_in_box`) for package validation, paid charting for double teams (Owner decision). Do NOT fetch; the Owner or the council attaches. Tolerance proposed: ±3 pts of play-share per spot at season level.
- **Do not redo:** the PLAYLED rebuild verdict (bars not cleared — council/glyph `0f8deac6`, MUSE review `20261111-0105`); the wave-55 phone laws (§0); the purity law now holds — never "fix" an artifact class by editing totals (the engine is authoritative; surface, don't paper).

## Files in this lane
- `deliveries/ledger-phase1-2026-11-11/` — THIS session's delivery: the four pipeline scripts, the five JSON data-trail files, the report, README, CHECKSUMS (sha256)
- `notes/` prompts, corrections, worklog, the per-wave INTAKE LEDGERS + BUILD REPORTS (W55-* are the product waves; LEDGER-PHASE1-INTAKE-2026-11-11.md is this chat's)
- `tools/` the verify suites (w55 batteries are the product headline; the ledger pipeline lives in deliveries/)
- `builds/` the wave HTML files (NOT product builds; pins in START-OF-CHAT §4)
- `deliveries/` the style guide and playbook + the Claude handoff chain + the earlier PLAYLED/rebuild deliveries
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
