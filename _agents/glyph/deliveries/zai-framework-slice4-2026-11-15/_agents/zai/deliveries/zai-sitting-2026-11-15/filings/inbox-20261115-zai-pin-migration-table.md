SPEAKER: zai | ROLE: High Councillor · Executor | TASK: THE PIN MIGRATION TABLE — one fixed draft on BOTH pins, old-vs-new observable differences + the gains/loses statement | DATE: 2026-11-15
FOR: the Architect (Claude) — R-2 has ruled the pin `d3bd81d2`; this table is yours to migrate with. I do not touch the engine (§3).
PIN: old `4ca9a071` (the app tree's vendored `src/engine`, 52 files, vendor contract intact) · new `d3bd81d2` (R-2; byte-identical to tip `03640133` on `colors/src`, 57 files, empty diff — re-verified this sitting)
HARNESS: `scripts/pin-migration-harness.mjs` · raw receipt `measurements/pin-migration-run.txt` (the full stdout, both engines' JSON) · env: node v24.22.3, linux 5.10.134 x86_64

## The fixed draft (identical inputs, both pins)

- **Seed 1115** (fixed; the app's own mint range is 1000..9999) · **user team: Chicago Bears** (league index 20, `TEAMS` order) · **pool: `buildPool` over THIS delivery's three CSVs** (`data/nfl/madden27-ratings.csv` 1,941 rows + 12 free agents + player-ids) — the same byte-identical CSV strings are fed to both engines.
- Pool read back by each engine: **1,953 raw / 1,921 draftable (LS filtered) at BOTH pins** — the pool itself does not move.
- The driver replicates the store's own flow verbatim (no edits to either engine, both read-only): draft = `newDraft(pool, makeRng(1115).fork('draft'))`; CPU = `makeRng(1115).fork('cpu')`, each pick `cpuChoose(st, team, cpu.fork('p' + st.pos))` until the user is on clock; the user takes **`candidates(st, userTeam)[0]`** — the engine-advised top, the same rule `batteries/probe-slice4.mjs` drives through the real store reducer. 32 user turns, 1,024 picks total at both pins.

## (a) The old-vs-new table — the observable differences

| # | Observable | OLD pin `4ca9a071` | NEW pin `d3bd81d2` |
|---|---|---|---|
| 1 | **QB→FS flex penalty** (`FLEX.QB.FS`) | **10** | **12** |
| 2 | **User pick order** (player+slot, 32 user turns) | **1/32 identical · 31/32 differ.** First user pick (overall 21): Jaxon Smith-Njigba WR→WR1, eff 99, wins 17,550 | **1/32 identical · 31/32 differ.** First user pick (overall 21): **Josh Allen QB→QB, eff 99, wins 26,000** — the whole advice order re-roots |
| 3 | **effOvr for flexed players** | **24** flexed user picks; RB→WR −4 (Henry: 94−4=90), C→OT −4 (Frazier: 89−4=85), WR→CB −6, DT→C −4 | **21** flexed user picks; **RB→WR −12** (Gibbs: 97−12=85), **C→OT −12** (Brewer: 90−12=78), RB→FS −12 (Croskey-Merritt: 80−12=68) — the 10 Nov cross-side floor repriced the whole cross-side band 4→12 |
| 4 | **Same player, same slot, both pins** | Demetrius Knight Jr OLB→DE2 at overall 917 (the one identical pick): eff 70, **wins −900** | same player, same slot, same flex price (OLB→EDGE −4): eff 70, **wins −3,300** — a pure replacement-level effect, same penalty, 2,400 wins-units apart |
| 5 | Draft shape | 1,024 picks, 32 rounds | 1,024 picks, 32 rounds (unchanged) |

**The mechanism (the diff hunk is the receipt):** `draft.ts` `replacement()` — OLD `if (st.pos - st.replAt < 6) return st.repl` (a 6-pick cache) → NEW `if (st.pos === st.replAt) return st.repl` (the cache serves only the pick that made it; every other pick recomputes replacement from the live pool). Replacement level now tracks the pool tick-by-tick, so every candidate's `wins = WEIGHT × (eff − repl)` re-prices from the first CPU pick on, and the advice order re-roots. `flex.ts` moves 10→12 on QB→FS and reprices the cross-side rows; `slots.ts` differs in comments only (weights untouched); `value.ts` is additive (`measuredDisplayWeights`, never read back into the engine). Five files exist only on the new pin (`core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `engine/legacyprovider.ts` — the 52→57).

**Honest note:** no user pick at seed 1115 exercised QB→FS (0 of 32), so row 1 is read off both pins' tables (`FLEX.QB.FS`), not observed through a pick. The RB→WR and C→OT repricings ARE exercised (rows 3).

## (b) What the product gains and loses

**Gains:** the Owner-ruled 99-rule flex table with the 10 Nov cross-side floor (R-7: the asymmetries are deliberate); replacement level that follows the pool tick-by-tick instead of in 6-pick steps (a CPU bank of picks no longer stale-prices the board for six picks); the `ValueProvider` seam (`legacyprovider.ts`) plus `events/fold/keyedrng/pack` — the seam §2.5c leans on.

**Loses: comparability with every Cakepanz measurement taken before the move.** The numbers that become old-engine numbers, named:
1. **The w88/w89 Wins table** — `ZPB_SLOTS_WINS` (QB 2.4706, DE1 1.7097, …, FB 0.0626; the P-324 32/32 audit) was measured at the old engine. R-2 does not move the SHELL, but any Cakepanz re-derive under the new pin no longer vouches for those 32 numbers byte-for-byte.
2. **The Phase 2 v2 real-data runs** — B1 DIME real mean **0.1263**, B2 WR1 staged over-concentration vs real **7.0–7.7 targets/team-game**, B3 **FB scarcity confirmed** — all ran the engine's lineup/value paths at the old pin.
3. **The battery's engine-derived receipts** — `slice1-battery.json`'s goneOdds recompute (between=22, sims=30 on its run), the flex-chip observation (44 chips at its seed), 61/0/10/3 — re-runnable (they re-derive live), but the shipped JSON describes the old-pin run, as its own per-run caveat already says.
4. **D.8 playoff-HFA** (+1.3522, CI [−0.93, +3.682], t=1.17 — recorded-dead) was a shell-era measurement; its "recorded-dead" status is a finding about the shell engine, not re-testable against the new pin without a re-run.
5. **The golden baselines** (`matchup-precolors.json`, `teamPacks.w54.json`, the 284-test suite) are pinned artifacts — they move WITH the pin (the new pin ships its own), so the engine stays self-consistent; what is lost is cross-pin equality, not integrity.
**Not affected (named, so nobody over-scopes the loss):** the pool study (1,921/1,953 — `buildPool` over CSVs, verified identical at both pins this sitting); the player-game join and the λ Lab (253,107 rows of nflverse data — the Lab has produced no fitted λ yet, so there is nothing to de-compare); SAVE-1 write medians (payload shape unchanged; the envelope carries the same pool+pick shapes).

## (c) Boundary

The migration is the Architect's. This seat edited no engine file at either pin; the harness reads both (`git archive` for the new pin into a temp dir; the app tree's vendored `src/engine` untouched — vendor contract intact). Three numbers, kept straight: **12** = live and now the pin · **10** = the old pin `4ca9a071` · **−10** = stale prose in `AGENTS.md` l.73 (MUSE's to fix; not implemented anywhere by this seat).

LABELS: VERIFIED — every number above is printed in `measurements/pin-migration-run.txt` (the harness's full stdout), the diff hunks are `git diff 4ca9a071 d3bd81d2 -- colors/src/sports/nfl/engine/{draft,slots,value,flex}.ts`, the FLEX constants read at both pins, the pool counts. INFERRED — the mechanism sentence (the cache-cadence reading of the two-line diff; the outputs it explains are VERIFIED). UNKNOWN — none for the table; QB→FS at other seeds is UNKNOWN-by-seed (honest note above).
