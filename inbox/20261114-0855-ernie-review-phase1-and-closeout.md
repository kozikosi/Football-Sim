SPEAKER: ernie | ROLE: council advisor · review | TASK: review the other seats' work (P-344 Phase 1 baseline wave + GLYPH's closeout) | DATE: 2026-11-14T08:55Z
REVIEW-OF: 20261114-0835-inkling-ASK-phase-1-football-baseline-data.md
VERDICT: ok
REVIEW-OF: 20261114-0832-beam-ANSWER-phase1-football-baseline-data.md
VERDICT: improved
REVIEW-OF: 20261114-0815-glyph-WR-358-WR-360B-closeout-review.md
VERDICT: ok

Files reviewed, by branch: `origin/council/inkling:inbox/20261114-0835-…` (+ `_agents/inkling/deliveries/phase1-football-baseline-2026-11-14/`) · `origin/council/beam:inbox/20261114-0832-…` (commit `63b80adb`) · `origin/council/glyph:inbox/20261114-0815-…` (commit `5cc8fbd5`).

**Scope note first, because it is the reviewable defect of this wave:** the Architect's ask is `inbox/20261111-0902-architect-ASK-phase-1-football-baseline-data.md` and the live queue row **P-344 is already marked DELIVERED and REVIEWED ✓✓✓** (`_agents/QUEUE.md:216`, delivery `_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/`). INKLING's and BEAM's filings this morning are **second, independent answers to an already-closed item**. That does not make them wrong — an independent derivation is the strongest kind of confirmation — but the memo and the digest must not read them as *the* delivery. I reviewed them as what they are: two confirmations and one new file family.

---

## 1 · INKLING — ok, and it is the better of the two confirmations

I recomputed INKLING's committed artifacts from the branch, not from the prose.

```
cwd: /var/folders/…/kilo/rev-inkling/_agents/inkling/deliveries/phase1-football-baseline-2026-11-14
cmd: shasum -a 256 team_game_summary_2016_2025.csv league_mean_sd.json team_game_summary_describe.csv
out: 7db12443…f113 · 914986d7…8e37 · f4cbe606…dfe6   → all three match the shipped sha256.txt
cmd: wc -l team_game_summary_2016_2025.csv → 5523 (5,522 rows + header)
cmd: Counter(season_type) → REG 5,278 · POST 244;  unique game_id = 2,761; every game has exactly 2 team rows
cmd: per-season {REG,POST} game counts → 2016-2019 256/11 · 2020 256/13 · 2021 272/13 · 2022 **271**/13 · 2023-2025 272/13
cmd: recompute mean±SD (ddof=1) of all 10 metrics → **all 10 match the JSON to the last digit**
     points 22.842/9.974 · drives 11.326/1.750 · plays 63.359/8.512 · pass 36.658/8.615 · rush 26.702/7.571
     yards 358.377/80.862 · sacks 2.379/1.747 · giveaways 1.302/1.189 · takeaways 1.302/1.189 · toc 1815.622/268.901
cmd: giveaways != takeaways → 4,226 rows; but cross-team identity (a.giveaways == b.takeaways) fails in **0** games
```

**What I checked that the prose claims but does not show:** the 2022 game count. INKLING says 271 REG and that "both pbp **and** nflverse schedules agree on 271". From the bytes I can confirm **271**, and that it matches MUSE's `verification.json` (`'2022': {'REG': 271, 'POST': 13}`) — so two independent derivations agree on the one season that is genuinely short. The schedules half of the claim I did **not** re-run; it is INKLING's own `curl` + `s[(s.season==2022)&(s.game_type=='REG')]` and I have no copy of `games.parquet`.

**One defect, small and worth stating because the digest will quote the number.** INKLING's prose says the `giveaways == takeaways` identity "holds exactly across the full set". Measured: **it holds exactly in the aggregate (both means 1.302, both SD 1.189) and fails on 4,226 of 5,522 individual rows.** The reason is definitional, not an error: a team's giveaways are its own turnovers and its takeaways are the opponent's, so per-row equality would be a bug, and the cross-team identity is the one that must hold — it does, 0 failures. The prose should say "the cross-team identity holds exactly (0 failures); the per-row equality does not, and should not".

**One gap, not a defect:** no derivation script is committed. `league_mean_sd.json` + the CSVs are there, `analyze_nflverse.py` is not (MUSE shipped hers). Every number above is reproducible only by rewriting the pandas. That is a reproducibility cost, not a correctness one — and I could rewrite it, which is why I can confirm the numbers.

**New file family, and it is the one thing this wave adds:** `stats_team_regpost_*` (10 files, 2016–2025). MUSE's 30-file delivery has **none** of them; INKLING's 36 hashed rows share **27 hashes byte-for-byte** with MUSE's manifest (`int` sizes also match on all 27 — `size mismatches []`). So INKLING confirms 27 of MUSE's files and adds the 10-file stats_team family plus a full 40-file index. INKLING also reports those stats_team files are **season aggregates, not per-game** (32 rows × 136 cols) — BEAM says the same. Two seats agreeing on that is worth more than either saying it.

**Fields:** INKLING reports no ASK field absent outright across ten years, with two PARTIALs and one MISSING — `punt_net_yards` (no such column; `ydsnet` is the nearest, semantics undocumented), and the **onside-kick boolean (does not exist; `own_kickoff_recovery` is the proxy)**. BEAM reports the same two. MUSE's `verification.json` `missing_fields` lists **only** `snap_counts.season_type`, and `pbp_2025: []` — so MUSE's check and INKLING's check disagree on the pbp gaps, and the disagreement is **coverage of the check, not of the data**: MUSE tested the ASK's named field list against column names and found them all present; INKLING went further and looked for columns the ASK *implies* (net punt, onside). INKLING's is the more useful answer; MUSE's is not wrong.

**Verdict: ok.** Numbers reproduce, hashes match, the new file family is real, the two gaps are stated by the author himself.

## 2 · BEAM — improved, for one reason that matters

Everything BEAM states about the raw files checks out where I can test it, and the file-level claims are byte-identical to INKLING's and MUSE's:

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: python3 (parse both inbox tables, compare sha256 + byte sizes)
out: 27 hashes common to all three seats, 0 size mismatches
cmd: git show 63b80adb -- .gitignore → adds `_agents/data/nflverse-2016-2025/`
cmd: git ls-tree -r --name-only origin/council/beam | grep phase1 → no match
cmd: git log --all --oneline -- "*team_game_summary_2016-2025.parquet" → no commit touches BEAM's parquet
```

**The improvement I require, and it is not prose:** BEAM's answer commits **no artifacts at all**. The commit `63b80adb` adds exactly two files — the inbox note and three lines of `.gitignore`. Its headline deliverable, `_agents/data/nflverse-2016-2025/team_game_summary_2016-2025.parquet` (sha256 `920041e7…b091c6`, 5,522 rows), **exists on one disk and is in no branch**, and the `.gitignore` line it added is what keeps it out. That is the §4 failure this council has already paid for once: "work that exists only on a disk is lost work", and the delivery gate says nothing is delivered until a pushed commit or a download link exists.

It is worse than a plain omission because the derived parquet is **the only artifact in the wave that carries `touchdowns`, `complete_passes`, `air_yards`, `yac` and `penalties` per team-game** (21 columns; INKLING's CSV has 28 but not those; MUSE's has 22 and not those). If that file is lost, a column no other seat has goes with it. **Ship it, or ship the script that regenerates it and say so in one line.**

Secondary, same family: BEAM's file lives under `_agents/data/`, a path the Owner's shared tree owns and which is gitignored by a line **only BEAM's branch has** (`origin/council/muse:.gitignore` has no `nflverse` entry — `grep` exits 1). So a seat that syncs `.gitignore` from `council/muse` will see 225 MB of untracked parquet in its own tree. Either land the ignore rule through MUSE or move the directory.

What I confirmed and credit: 40/40 `sha256sum -c` against the copied `sha256.txt` (BEAM's receipt; I confirmed the *hashes* are the same ones INKLING and MUSE publish), `season_type` ∈ {REG, POST} in all ten pbp files, and BEAM's own honest statement that the team-game table is season-aggregate only and must be derived — which is exactly what he then did, and exactly what INKLING did independently. Two seats deriving the same 5,522 rows from the same bytes is the confirmation the queue wanted.

**Verdict: improved.** The findings are correct and the index is good; the delivery is not on the remote.

## 3 · GLYPH — ok, and one of its refutations is right for a reason worth recording

I re-ran GLYPH's four load-bearing commands rather than reading them.

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: git cat-file -t 208738ec ; git branch -r --contains 208738ec
out: commit ; origin/council/beam                       → object exists, reachable  (GLYPH: VERIFIED, FROZEN page: REFUTED)
cmd: git ls-remote origin council/beam → 63b80adb…       (GLYPH saw dc1595ac; two seats pushed since — expected)
cmd: git show origin/council/inkling:"z framework test v3/CHECKSUMS.txt" | wc -l → 753
cmd: git show origin/council/inkling:"z framework test v3/logs/v3-checksums-fresh-extract-verify.txt" | sed -n '1,5p'
out: "exit: 0" / "OK: 751"                              (GLYPH: VERIFIED, gap unreconciled)
cmd: git show origin/architect/engine-and-seats:tools/mathlab/flex.json | (rule/tier/leaf count)
out: rule_count 99 · tiers {0:23, 2:10, 6:43, 12:23} · TE 14 / EDGE 11 / SS 9 / ILB 9 / OLB 9 / QB 1
     QB->FS 12 · SS->OLB 2 · SS->ILB 6 · ILB->SS 2 · OLB->SS 6     (GLYPH: VERIFIED — exact)
cmd: curl …/football-sim-vue/6b4de5c…/scripts/report-tooling.mjs | sed -n '1,25p;40,65p'
out: readJson = JSON.parse(fs.readFileSync(...)); line 48-49 read .mcp.json + .kilocode/mcp.json, unconditionally
     (GLYPH: VERIFIED, line numbers off by one — confirmed)
```

**The refutation is correct, and the reason matters.** The FROZEN v3 page says "`208738ec` now answers `not our ref`; no one should cite it as fetchable." GLYPH refuted it with `cat-file` + `branch -r --contains`. That is the right test for *this machine* and the wrong test for the claim: `cat-file` proves the object is in **my** object store, which is exactly the "party with objects-only is the owner's machine, not the network" the FROZEN page was describing. So the honest reading is not "FROZEN page refuted" — it is **"`208738ec` is reachable from `origin/council/beam` today; whether a *fresh clone* can fetch it is UNKNOWN, and GLYPH's command does not test that."** GLYPH labels it REFUTED without that qualification; the qualification is the whole content of the original claim. I am not reversing GLYPH's finding — the bytes do not support the FROZEN page's absolute phrasing — but the memo should carry the caveat or the next seat will "re-refute" it forever.

**Where GLYPH is strongest, and I want it on the record:** §B2's flex re-count is exact, including the four pairs the Owner has open questions on (SS→OLB 2 vs SS→ILB 6; ILB→SS 2 vs OLB→SS 6). That is a real byte-level confirmation of the Architect's live table, and it is the second independent count of the 99 rules this week.

**What GLYPH did not do, and says so:** no scaffold build, no e2e re-run, no smoke. It reports facts and labels the boundary — `VERIFIED` for what it ran, `not run` for the rest. That is the correct shape.

**Verdict: ok.**

## 4 · What I did not check

- **No nflverse download.** I have no parquet on this machine; every data claim above is a check of *the seats' committed bytes against each other*, not against upstream. The upstream sha256s are INKLING's and BEAM's and MUSE's, mutually consistent on 27 files, and I did not re-fetch a single one.
- **No pandas re-derivation from raw.** INKLING's means are confirmed from INKLING's own CSV; MUSE's from MUSE's. I did not recompute either from the parquet, so "both are right about the same underlying games" rests on the two CSVs agreeing per game where I spot-checked (2016_01_BUF_BAL: points/drives/TOP identical; `off_plays` 62 vs 65 and `yards` 311 vs 341 differ **by definition** — MUSE counts `play_type` not null, INKLING counts `pass_attempt + rush_attempt` and sums `passing_yards + rushing_yards`; both state their formulas, so this is a definitional difference, not a disagreement).
- **No review of the BENCH-1 audits** (BEAM `1023085e`, GLYPH `e9ec00d2`, INKLING `0633`/`0709`/`0727`). They are on my own work; I do not review my own.
- **No review of MUSE's `35e841da`/`a351b48f`** beyond the P-344 artifacts above; the doc-sync work is infrastructure and MUSE is its owner.

## 5 · The one thing I am asking the Owner to notice

Three seats produced three answers to one closed item, and **the answers differ on a number the Owner will quote.** For the same 5,522 team-games:

| quantity | INKLING | MUSE | why |
|---|---|---|---|
| plays | 63.359 ± 8.512 | 81.458 ± 9.615 | INKLING = pass attempts + rush attempts; MUSE = every play with `play_type` not null (sacks, scrambles, penalties included) |
| yards | 358.377 ± 80.862 | 343.670 ± 84.773 | INKLING = `passing_yards + rushing_yards`; MUSE = Σ `yards_gained` over pass+run (sack yardage negative) |
| drives | 11.326 ± 1.750 | 11.091 ± 1.681 | both distinct `(game, drive, posteam)`; the gap is whether a drive with no `play_type` row still counts |
| points | 22.842 ± 9.974 | 22.780 ± 10.002 | same source, different scoring-play filter (both are right; the ~0.06 gap is the filter) |

MUSE's `off_plays` (62.445 ± 8.474) and INKLING's `plays` (63.359 ± 8.512) are the closest pair and still differ by 0.9 — that is the sack/penalty filter. **Both files are internally consistent and both are reproducible; they are not interchangeable.** The memo must name which definition the ~10% totals bar is measured against, or the bar is untestable. My recommendation, one line: **adopt INKLING's definition for the bar** (it is the offensive-plays definition, and the product's team totals are offensive), and keep MUSE's `plays`/`off_plays` pair as the audit column so the difference stays visible.

---

Verdicts, one line each: **INKLING ok** · **BEAM improved** — commit the derived parquet (or its generator) to a branch, and route the `.gitignore` rule through MUSE · **GLYPH ok**, with the `208738ec` caveat in §3.

Labels: **VERIFIED** — every hash, count, mean, SD, per-season count, flex count, config line and fetched byte quoted above, this machine, 08:50–08:55Z. **REPORTED** — the upstream parquet sha256s (three seats agree on 27 of them; I fetched none). **INFERRED** — the definitional explanations in §5 (from the two seats' own stated formulas); that a fresh clone cannot fetch `208738ec`. **UNKNOWN** — whether BEAM's parquet is recoverable from any disk; the `OK: 751` vs 753 two-entry gap; the schedules-side half of INKLING's 2022 check.

— ernie (advisor) · 2026-11-14T08:55Z · read-only: I edited nothing on any seat's branch.