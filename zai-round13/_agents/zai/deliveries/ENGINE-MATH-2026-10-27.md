# ENGINE MATH — solved for round 13 · 2026-10-27 · Z.ai (High Councillor)

**FOR: the Owner (this is the "solve the math problems for the engine" delivery) · FOR: P-141, P-030, P-133 council files · BASE: `Football-Sim-PreColors.html` sha256 `40233d6be00e987c…` (657,486 B, the BASELINES.md pin), cross-checked on `Football-Sim-Z-post-blue-w24.html` (1,337,764 B).**
Every number below was produced by headless Chromium runs on the pinned bytes; the raw outputs live in `_agents/zai/evidence/round13/` in this package. Labels: VERIFIED = I ran it; REPORTED = source says so; INFERRED = my reading.

---

## 1 · "What happened when I clicked Simulate Season?" — the exact chain (VERIFIED)

The friend's question, answered precisely for the Pre-Colors build:

```
"Sim Rest of Season ▸ Review" (simSeasonBtn, rendered at :3891/:3905)
  → simRestOfSeason()  [:3555]
      while phase==='regular':
        simulateCurrentWeek()  [:3543]   ← plays EVERY unplayed game of the week
          games.forEach(g => playGame(g, false))  [:3479]
            simulateGame(homeSM, awaySM, …)  [:2286]   ← the game model (below)
            buildGameDetail(g, …)  [:2642]             ← player-level stats FROM that game
            accumulatePlayerStats(...)  [:3464]        ← season stat book accumulates per game
        advanceWeek()  [:3562]   ← week++ ; at week 17 → standings → seeds → awards
```

- **It simulates every game, one at a time.** Stats are not generated elsewhere: each game's box score is realized by the game model and then distributed to players by `buildOffenseDetail`/`buildDefenseDetail`, and the season leaderboards/awards read that accumulated book. The "shortcut" question: the only shortcut in the product is the reverse — the **100-season loop** reuses the *same* `simulateGame` core via `liteSeason()` [:5916]; there is no cheaper statistical fake anywhere.
- **The game model itself** (`matchupModel` :2100 + `simulateGame` :2286): expected rush/pass yards are log-linear in unit deltas (`expRush = 105·exp(Σ coeffs·Δ)` with tanh soft-caps as guardrails), turnovers and sacks are Poisson (`λ = 1.2, 2.2` baselines), points are `21.5 + 0.040·(rush−105) + 0.070·(pass−220) − 3.0·(TO−1.2) − 0.8·(sacks−2.2) + kick + returns − planCost + noise`, clamped 0–58, home field **+1.7**. Plans (personnel/strategy, nickel/dime packages) move the coefficients; the late-game script re-opens the trailing team. Wins↔points conversion: **32.5 points per win** (Pythagenpat, :4865).
- **Where the draft fits in**: the season is played with whatever the 32 rosters hold after the draft (`startSeason` builds `seasonState.teams[t].slotmap` from `draftSim.rosters`).

## 2 · "Upper limit to how many simulations it can run?" — measured (VERIFIED)

| Measurement | Number | How |
|---|---|---|
| One game (`simulateGame`, warm) | ≈ 0.65–1.1 ms | 272 games ≈ 176–291 ms per full `liteSeason` (3 runs: 290.8 / 219.7 / 175.7 ms), stage-4 evidence |
| One full season (272 reg. games + 4 playoff rounds + awards + aggregation) | ≈ 0.18–0.29 s | stage-4e evidence JSON |
| Shipped 100-season loop, wall clock | ≈ 20–40 s in a focused tab; measured 31.2 s for 10 seasons under headless timer-throttling (stage-4d) — the loop is compute-bound, not throttled in a visible tab | `runLeague100` :5989 time-slices at 120 ms/chunk with a progress bar |
| Memory | bounded: each season overwrites `L.schedule`/`L.playerStats`; only the aggregates (`agg`) grow | read of `liteSeason` |
| Practical ceiling in-page | ~2–5 seasons/sec single-thread → **100 per run is the right UX cap** (already shipped: every entry point passes N=100, rerun button re-rolls) | measured |

**Recommendation (no code change needed now):** keep 100 per run; when the engine moves to a Web Worker (architecture memo §4, Phase A), raise to 1,000-season runs for the P-140 sensitivity work (≈ 3–6 min). A 1,000-season run needs the seeded RNG from §5 so the Owner can pin a run and compare old-vs-new weights honestly.

## 3 · SOLVED — the Drake Maye "appeared as a WR" class (P-133 work, VERIFIED + not-reproduced)

**What I tested:** 6 complete 832-pick drafts (3 on PreColors, 3 on w24), every one of the 32×26 (and 32×28) placements audited against `POS_SLOT_MAP` legality:

- **Zero illegal placements. Zero QB ever in a non-QB slot.** Drake Maye (pool: QB, NE, 89 OVR — VERIFIED) landed at **QB, penalty 0** in every w24 run (stage-2/stage-3 evidence).
- `POS_SLOT_MAP['QB'] = ['QB']` in both lineages (FLEX.QB is `{}`) — **the flexing math cannot legally put a QB at WR** (VERIFIED by construction and by scan).
- The emergency paths are guarded: the user's interactive emergency excludes QB (`eligibleOpen` :1659, `p[1]!=='QB'`), and `optimalLineup` refuses illegal assignments (BIG-cost guard :1214).
- `effOvr` math confirmed: any player forced out of position pays **EMERGENCY_PENALTY = 8** (test player 95 OVR → 87 at WR1, VERIFIED in-page).

**The only two code paths that can EVER produce "QB in a WR row" (INFERRED, anchors quoted):**
1. `cpuPick`'s last-resort fallback [:1432]: `if(!best){ const s = firstOpenSlotAny(roster); … best = st.pool[0]; bestSlot = s; }` — reachable only when *no remaining pool player legally fits any open slot of that roster*, which the 1,148-player eligible pool makes practically unreachable (0 hits in 6 drafts). Note it has **no QB exclusion** — unlike the user path. Also `slotForUser` :1174's identical fallback.
2. A **display surface that labels a player by his slot instead of his natural position**. In PreColors every player-attached badge I audited uses `POS_DISPLAY[p[1]]||p[1]` (roster table :1766, board sort :1678, recap :1859/:5650, returner pickers :1274/:1284) — clean. Slot rows (depth chart, lineup comparison) correctly show the *slot's* name — a flexed player sitting in a WR-family row reads as "WR" to a viewer; that is the most likely thing the friend saw, plus the flex chips in the Z-post-blue line.

**The fix I propose (so the Owner never has to wonder again):** a one-line **badge law** + a standing **legality test** —
- Badge law: wherever a player's name renders, the position chip is `POS_DISPLAY[p[1]]||p[1]` (natural), never the slot family; the slot lives in its own column/row label. (Snippets in the P-133 work file; SAFE ALONE: yes.)
- Standing test (10 lines, goes in the verify suite): after any full draft, assert `for every roster slot: POS_SLOT_MAP[p[1]].includes(slot)` and assert every badge template matches `POS_DISPLAY\[?[a-z]` — a run that violates either fails loudly. Add the QB-exclusion to the `cpuPick`/`slotForUser` fallbacks for belt-and-braces (`best = st.pool.find(p=>p[1]!=='QB') || st.pool[0]`).

## 4 · SOLVED — the cpuPick keep-direction question (KI-005) is settled for this lineage (VERIFIED)

KI-005 recorded "donor has floors+bounded; v20 has cap+92-deep" as unresolved. **Pre-Colors carries the floors+bounded semantics** — quote [:1409-1413]: round-1 floor `max(90, topAvail−5)` (QB exception `min(88, floor)` during a run), rounds 2–3 `max(85, topAvail−8)`, per-position scan cap 16, and the "miss" path bounded: `reach = 3 + min(9, |randNormal()|·4)` with a hard value gate (`curRound===1 ? 88 : topAvail−9`). Recommend KI-005 be marked **resolved for PreColors** (the "cap+92-deep" variant is not in this build); the floors are also why the draft never degenerates late (my 6-draft scan found zero empty slots).

## 5 · SOLVED — seeded RNG design (P-030 inventory delivered · P-031 design)

**Inventory (P-030, VERIFIED, full table in `_agents/zai/evidence/round13/stage7-rng-inventory.txt`): 38 lines / 56 sites.** By category:
- **Game model (seed first):** `randNormal`(2), `poisson`(1), `realisticScore`(3), `simulateGame`(4), `buildOffenseDetail`(4), `buildDefenseDetail`(2), `addReturns`(2), `buildGameDetail`(2), `makeScoringEvents`(1), `weightedPick`(1), `aggrOf`(1) — 24 sites.
- **Draft/CPU (seed second):** `cpuBias`(4), `cpuNoise`(1), `cpuMiss`(1), `cpuPick`(1), `startDraft2`(3), `shuffleArr`(1) — 11 sites.
- **Schedule:** `buildFullSchedule`(1) (the home/away flip — seed with the draft group).
- **Records guard:** `accumulatePlayerStats`(1) (cap-shaving jitter so two capped records don't tie).
- **Narrative/cosmetic (seed last or never):** `pick`(1), `formBits`(2), `edgeLine`(1), FX confetti/fireworks(15).

**P-031 patch design (drop-in, fails loudly):** replace the `Math.random` *call sites* with `RNG.u()`, `RNG.n()` (normal), `RNG.int(n)`, `RNG.pick(arr)` where:

```js
let RNG = { seed:null, s:0, calls:0,
  arm(seed){ this.seed=seed; this.s=seed>>>0 || 1; this.calls=0; },
  u(){ this.calls++; if(this.seed==null) return Math.random();
       let t = this.s += 0x6D2B79F5; t = Math.imul(t ^ t>>>15, t|1);
       t ^= t + Math.imul(t ^ t>>>7, t|61); return ((t ^ t>>>14)>>>0)/4294967296; },
  n(){ let u=0,v=0; while(u===0) u=this.u(); while(v===0) v=this.u();
       return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
};
```

Unseeded (`seed==null`) it *is* `Math.random()` — zero behaviour change until armed. `arm(12345)` makes an entire draft+season reproducible; a seeded run records `calls`, and a changed call-order (someone touched the math) shifts every downstream number — that IS the loud failure. Migration order: game-model sites → draft sites → schedule; narrative/FX keep `Math.random` (they must never consume the stream or summaries drift across seeds). Keep `hashPick`/`hashInt` as-is (already deterministic). This single patch unlocks: pinned verify runs, P-140 old-vs-new sensitivity runs, and "share your seed" as an interview talking point.

## 6 · CLOSED for this lineage — KI-006 `rWeights is not defined` (VERIFIED absent)

`grep rWeights Football-Sim-PreColors.html` → **0 hits**; the 100-season aggregation on PreColors completed 10 full seasons in-page with no error (stage-4d). The v20:6018 defect does not exist in the PreColors bytes. (I also ran `node --check` on the extracted script: clean.)

## 7 · P-141 — FB and Punter math validated on w24 (VERIFIED, numbers re-measured)

The 28-slot engine on the repo carries the wave-11 §7b wiring intact: `WV_OFF_SLOTS` includes FB (:4890), `olRun` spec has `FB:0.30` (:5610), `PUNT_PTS = 1.6` (:5641) and the punt term sits in `structPts` (:5815/:5835). Measured on w24 bytes:

| Spot | 70 OVR | 80 | 90 | 70→90 swing |
|---|---|---|---|---|
| FB | −0.032 | 0 | **+0.034** | 0.066 (≈ **10 %** of RB1's 0.665) |
| P | −0.167 | 0 | **+0.208** | 0.375 (P90 = **58 %** of K90's 0.361) |
| K | −0.361 | 0 | +0.361 | 0.722 |
| RB1 | −0.267 | 0 | +0.398 | 0.665 |

Units hold (wins per season vs an all-80 league, `POINTS_PER_WIN=32.5`), the sums are the model's own (no display special-casing — FB/P flow through `slotWinsTable` like every slot), and the §7b claims reproduce within rounding. **P-141's second half — "tell every doc that FB and P are draft slots"** — the pool already carries FB(8)/P(32)/LS(12) players and w24's `NATURAL_SLOT_MAP` has `FB:['FB']`, `P:['P']` (VERIFIED). Remaining doc drift: PreColors' `TOTAL_ROUNDS` comment still says **26 — starters only … no P/FB** (:928) while the Z-post-blue line is 28 — one line to fix wherever docs land for V23. LS (12 players) is still dead pool in both lines — either give LS a slot one day or filter it from the pool; today it is invisible (0 drafts of FB/P/LS on PreColors, VERIFIED).

## 8 · Bonus — the value hierarchy re-measured on w24 (baseline for P-140)

Full 28-slot table (70→90 wins per spot) is in `_agents/zai/evidence/round13/stage6-w24-hierarchy.txt`. Headline: QB 2.541 → CB1 1.443 → DE1 1.301 → CB2 1.177 → WR1 1.103 → DE2 1.101 → OT 1.025 … K 0.722 → RB1 0.665 → WR2 0.601 → P 0.375 → RB2 0.220 → TE2 0.144 → SAM 0.074 → FB 0.066. This matches REWEIGHT-BRIEF §3 exactly — **the P-140 rebalance is still fully open** (EDGE1 above CB1, CB2 → 0.95, K → 0.45, WR2 above RB1, DT1 up, TE2 plan-gated ≈ 0, RB1 receiving share light), and §5's seeded RNG is what makes the required 1,000-season old-vs-new sensitivity run trustworthy. One model subtlety surfaced and worth keeping: **TE2's value is plan-gated** (TE2 at 70 OVR costs exactly 0.000 — he only enters via 12/13-personnel), which is why the TE2 row "looks zeroed" in the Owner's analysis — that is the model being honest, not a bug.

## 9 · Realism receipt (for the friend's "does it pass the smell test")

10-season aggregate, 2,720 games (stage-4d): **22.6 points/team** (NFL 2024: ≈22.6) · **home wins 55.8 %** (real ≈55 %) · ties 0.44 % · one-score games 26.7 % · blowouts (21+) 8.9 % · **pass 208 yds/team, rush 125 yds/team** (real ≈210/122) · turnovers 2.42/game (real ≈2.2) · sacks 4.5/team-game (real ≈4.3). The engine is calibrated inside a few percent of the real league on every headline number.

— Z.ai · read → verify → build → verify → zip · round 13
