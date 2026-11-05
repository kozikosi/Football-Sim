# Outcome Lab — Model Report (v0)

Generated 2026-11-05T17:08:14.459Z by `colors/tools/outcomelab/sweep.ts` (Z.ai seat, w71 tooling wave).

What this is: Monte Carlo evidence about the game the engine actually ships. The engine is
called headless through its public API exactly as the golden tests call it; nothing in `src/` is touched.

Three populations, one question each:
- **Mode A (fixed drafted league):** the game as shipped — one CPU draft off the real Madden
  ratings, frozen, then many season seeds. This is what a player's season plays out inside.
- **Mode B (fresh draft per seed):** talent-world variation included.
- **Mode C (test synthetic population):** the season.test.ts league (OVR 80 ± 2.5) — the
  population the Q7 bands were most plausibly measured on. It isolates "engine off band" from
  "population off band".

Bands marked **[R]** are the Architect's stated simulation invariants (architect branch,
`inbox/20261104-1910-architect-to-muse-architecture-review.md` §Q7); re-deriving them from the
nflverse snapshots in `_agents/data/` is the pending v1 item. Every FAIL below is a finding
for the Architect to rule on — this tool never touches the engine.

---

### Mode A — fixed league (one seeded CPU draft off the real Madden ratings), 200 season seeds

- Seasons swept: **200** · 901 ms/season · engine called headless via public API, unmodified
- Zero-sum: wins vs losses **54052 / 54052** (tie records 696) → **EXACT — invariant holds**
- Mean wins per team: **8.446** → tie-adjusted expectation 8.446 (8.5 − ties/32; with 1.74 tied games/season, 8.500 is unreachable by arithmetic) → **PASS**
- Points per team-game: **22.86** → band [R] 22.8 ± 0.7 → **PASS**
- Home win rate: **55.3%** (95% CI ±0.4%) → band [R] 53.2% ± 1.5pp → **FAIL**
- Parity: mean SD of team wins **2.20** (per-season range 1.32–3.00) → band [R] 3.0–3.5 → **FAIL**
- Seasons with a 15+-win team: **8.5%** (95% CI ±3.9%) → report-only, band pending nflverse re-derivation
- Seasons with a ≤2-win team: **8.0%** (95% CI ±3.8%) → report-only, band pending nflverse re-derivation
- Tied games per season (mean): **1.74**
- Determinism (same league + same season seed twice → identical table and champion): **PASS**

Super Bowl winners — 31 different champions in 200 seasons. Top 10:

| Team | Titles | Share |
|---|---|---|
| Tennessee Titans | 24 | 12.0% |
| Indianapolis Colts | 15 | 7.5% |
| Chicago Bears | 15 | 7.5% |
| Houston Texans | 12 | 6.0% |
| NY Jets | 12 | 6.0% |
| Arizona Cardinals | 12 | 6.0% |
| Denver Broncos | 12 | 6.0% |
| Atlanta Falcons | 11 | 5.5% |
| Seattle Seahawks | 10 | 5.0% |
| NY Giants | 10 | 5.0% |

Champion by seed: seed 1 39.0% · seed 2 17.0% · seed 3 11.0% · seed 4 11.5% · seed 5 7.0% · seed 6 9.0% · seed 7 5.5%

Champion by conference: AFC **55.0%** · NFC **45.0%**

---

### Mode B — fresh CPU draft per seed (talent worlds included), 40 seasons

- Seasons swept: **40** · 881 ms/season · engine called headless via public API, unmodified
- Zero-sum: wins vs losses **10816 / 10816** (tie records 128) → **EXACT — invariant holds**
- Mean wins per team: **8.450** → tie-adjusted expectation 8.450 (8.5 − ties/32; with 1.60 tied games/season, 8.500 is unreachable by arithmetic) → **PASS**
- Points per team-game: **22.87** → band [R] 22.8 ± 0.7 → **PASS**
- Home win rate: **55.4%** (95% CI ±0.9%) → band [R] 53.2% ± 1.5pp → **FAIL**
- Parity: mean SD of team wins **2.17** (per-season range 1.46–2.79) → band [R] 3.0–3.5 → **FAIL**
- Seasons with a 15+-win team: **5.0%** (95% CI ±6.8%) → report-only, band pending nflverse re-derivation
- Seasons with a ≤2-win team: **5.0%** (95% CI ±6.8%) → report-only, band pending nflverse re-derivation
- Tied games per season (mean): **1.60**
- Determinism (same league + same season seed twice → identical table and champion): **PASS**

Super Bowl winners — 24 different champions in 40 seasons. Top 10:

| Team | Titles | Share |
|---|---|---|
| Miami Dolphins | 4 | 10.0% |
| NY Jets | 3 | 7.5% |
| Indianapolis Colts | 2 | 5.0% |
| New Orleans Saints | 2 | 5.0% |
| Carolina Panthers | 2 | 5.0% |
| Arizona Cardinals | 2 | 5.0% |
| Chicago Bears | 2 | 5.0% |
| Pittsburgh Steelers | 2 | 5.0% |
| New England Patriots | 2 | 5.0% |
| Denver Broncos | 2 | 5.0% |

Champion by seed: seed 1 30.0% · seed 2 22.5% · seed 3 7.5% · seed 4 10.0% · seed 5 17.5% · seed 6 7.5% · seed 7 5.0%

Champion by conference: AFC **52.5%** · NFC **47.5%**

---

### Mode C — synthetic population of test/nfl/season.test.ts (OVR base 80 ± 2.5), 200 season seeds

- Seasons swept: **200** · 34 ms/season · engine called headless via public API, unmodified
- Zero-sum: wins vs losses **54117 / 54117** (tie records 566) → **EXACT — invariant holds**
- Mean wins per team: **8.456** → tie-adjusted expectation 8.456 (8.5 − ties/32; with 1.42 tied games/season, 8.500 is unreachable by arithmetic) → **PASS**
- Points per team-game: **22.87** → band [R] 22.8 ± 0.7 → **PASS**
- Home win rate: **54.7%** (95% CI ±0.4%) → band [R] 53.2% ± 1.5pp → **FAIL**
- Parity: mean SD of team wins **3.10** (per-season range 2.33–3.86) → band [R] 3.0–3.5 → **PASS**
- Seasons with a 15+-win team: **60.0%** (95% CI ±6.8%) → report-only, band pending nflverse re-derivation
- Seasons with a ≤2-win team: **63.0%** (95% CI ±6.7%) → report-only, band pending nflverse re-derivation
- Tied games per season (mean): **1.42**
- Determinism (same league + same season seed twice → identical table and champion): **PASS**

Super Bowl winners — 32 different champions in 200 seasons. Top 10:

| Team | Titles | Share |
|---|---|---|
| NY Giants | 10 | 5.0% |
| NY Jets | 10 | 5.0% |
| Jacksonville Jaguars | 10 | 5.0% |
| San Francisco 49ers | 10 | 5.0% |
| Tampa Bay Buccaneers | 9 | 4.5% |
| Los Angeles Chargers | 9 | 4.5% |
| Las Vegas Raiders | 9 | 4.5% |
| Los Angeles Rams | 9 | 4.5% |
| Cleveland Browns | 8 | 4.0% |
| New England Patriots | 8 | 4.0% |

Champion by seed: seed 1 44.0% · seed 2 16.5% · seed 3 11.5% · seed 4 8.5% · seed 5 11.0% · seed 6 3.5% · seed 7 5.0%

Champion by conference: AFC **52.0%** · NFC **48.0%**
