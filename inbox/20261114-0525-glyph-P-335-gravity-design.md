SPEAKER: glyph | ROLE: seat (work/design) | TASK: P-335 — Gravity (double teams / usage / offensive + defensive) design proposal | DATE: 2026-11-14T05:25Z
FOR: P-335

# P-335: Gravity — measurement, engine hooks, advanced-stats display, and flex-formula test

**Owner direction (VERIFIED, verbatim refs):** Q8/Q3 — gravity NOW, "might be part of the formula itself." Offensive gravity: WR1/best player/midfielder drawing double teams makes others better; usage and gravity measured. Defensive gravity: rim protector/corner deters high-percentage attempts/passes (value from what opponent does NOT attempt). Include in engine as much as possible AND present in advanced-stats section. Present in almost all sports (not baseball).

**Constraint:** OVR may be only true player input; no per-player STR/speed/intangibles required (Owner Q2/Q14). Position + OVR carry style. Portable/malleable preferred.

## 1) Measurement design (proposal)

### Offensive gravity (football, initial)
- **Double-team draw rate (modeled):** probability a defender allocates extra attention to player `p` on passing/targeted plays: `DT(p) = f_role(target_share_prior, effOVR_p, alignment)` where target share prior comes from role (WR1 vs WR3 vs TE1) and scheme tendencies; no hand-entered per-player trait. **INFERRED** implementable from existing boxscore target/carry shares + ratings.
- **Gravity index (G_off):** expected reduction in coverage quality on others when `p` is on field: `G_off(p) = E[attention(p)] * leverage(role, formation, down)` scaled 0–100 or small integer units for display. Intuition: a 95 OVR WR1 in 3-WR sets draws more help than 75 OVR WR3.
- **Usage coupling:** `usage_share(p)` (targets/carries/routes share) and `gravity_share(p)` reported together; high gravity can exist with moderate usage (decoy) — surface both.
- **Deterrence proxy (offense, opponent response):** opponent shifts coverage shell / reduces single-coverage rate against `p` (modeled), yielding higher expected efficiency for complementary receivers — measured as `lift_others = team_eff_with_p - team_eff_without_p_context` in sim/counterfactual (see hooks).

### Defensive gravity
- **Deterrence (pass):** elite CB (Revis-island) lowers opponent target rate into his zone / lowers completion expectation: `D_pass = avoided_targets_rate * value_per_target + completion_suppression`. Modeled from CB/FS/SS/NICKEL/DIME matchup deltas vs league baseline.
- **Deterrence (run/interior):** DT/MIKE/EDGE reduce opponent choice/value of inside/high-percentage runs: `D_run = avoided_inside_attempts * EPA_equiv` (or yards/points proxy in drive model).
- **Gravity index (G_def):** combined deterrence + attention drawn (e.g. offenses sliding protection to EDGE) with integer display.

**Quantification principle (INFERRED):** prefer **counterfactual deltas** the engine can compute (what opponent does/doesn't attempt or efficiency with/without attention allocated) over "counting" events that drive-level sim doesn't generate. Where play-level Ledger/view exists (P-341/P-342), read actual target/box counts; until then, derive from matchup probabilities and allocation.

## 2) Engine hooks (where gravity feeds behavior)
**INFERRED, consistent with drive/matchup architecture:**
- **Matchup/allocation layer (`matchup.ts` / play-calling inputs):** when computing pass/run success, allocate defensive attention: `attention_i = softmax(a * eff_i_by_role)` subject to 11 defenders; high `eff_i` on offense draws attention => reduce effective coverage on others (`eff_cov_j' = eff_cov_j - k*G_off_i`). Conversely, high defensive gravity reduces offense’s chosen high-value option rate (target/inside-run selection weights).
- **Boxscore/attribution:** distribute targets/carries using gravity-adjusted shares (star draws attention but may still be targeted; others gain efficiency) so advanced stats remain coherent.
- **Team value / season:** gravity enters as a **multiplier on teammates’ effectiveness** in relevant situations (offense) and as **opponent option suppression** (defense), not as a separate "wins" stat unless calibrated — keeps one model.
- **Play-level path (Ledger, P-341):** emit per-play attention/double flags and avoided-attempt counters as event fields (portable: same event schema can carry "double team"/"zone denial" in other sports).

## 3) Advanced-stats display (user-facing, simple integers)
**Proposal (integers, no "slight/real/heavy"):**
- **Per player (game/season):** `GRV` (gravity 0–99 or 0–100 int), `USG%` (usage), `DBL%` (double-team/extra-attention rate, modeled), `LIFT` (estimated points/wins lift to teammates, integer or tenths shown as integer-scaled e.g. +3 = +0.3), `DET` (defensive deterrence, avoided targets/inside runs or value).
- **Sections:** "Offensive Gravity", "Defensive Gravity" in advanced stats; sortable; tooltip/note text plain and informative (per style rules) e.g. "Drew extra attention on X% of snaps; teammates gained Y."
- **Team view:** top gravity players, "attention share" breakdown.
- **Clutch context (ties to P-354):** optionally highlight gravity events in final 5 min narration ("double-team opened X") — modeled/shown, labeled as model-derived if not play-truth.

## 4) Gravity in the flex formula itself — test plan (no verdict)
**Hypothesis (Owner Q3):** a player who draws double teams is worth more; may change guard/value layer, flex price, or team value.
- **Option G1 (inside v):** fold gravity into slot/player value `v` / effective contribution: `v'_p = v_p + α * G(p)` so guard `20*(1 - v_src/v_dst)` (or measured-v form) naturally prices high-gravity players as harder to replace. **Portable-friendly if G is role/usage-derived.** Aligns with "gravity INSIDE v, ideally" (Owner merge note).
- **Option G2 (explicit term):** `price = max(ability, guard, gravity_term)` — only if G cannot be expressed as value; risks extra dial (Owner wary of tuning burden) — **INFERRED less preferred**.
- **Option G3 (team value only):** gravity affects sim outcomes/advanced stats but not flex prices (prices remain ability+value). Test whether flex anomalies (e.g. undervaluing true WR1 deterrence) persist.
- **Experiment (VERIFIED method, NOT RUN):** (a) compute G_off/G_def proxies from existing role+OVR on a roster set; (b) re-rank/value players with/without G1; (c) check correlation with Owner’s 99-rule intuition and with census exploits (does adding gravity change who "should" flex?); (d) report sensitivity, not a single "correct" α. Report whether any flex row’s implied value shifts materially.

## 5) Portability (INFERRED)
Double teams/attention exist in football, basketball, soccer, hockey; define G as `attention allocated beyond 1v1` and `deterrence = actions opponent avoids` — sport provides mapping (box-out/rim protection, midfield press, goalie screens excluded per sport). Baseball excluded per Owner.

## Open questions for Owner/council
- Display scale for GRV (0–99 vs 0–100) — defer to engine natural output per Q2 spirit?
- α / calibration source once play-level or nflverse participation proxies available (P-344 participation/snap data can seed attention priors).

Labels: VERIFIED (Owner refs/directions). INFERRED (formulas/hooks/α). NOT RUN (no engine implementation/sim). No formula verdict imposed.
