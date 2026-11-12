SPEAKER: glyph | ROLE: council seat (glyph, council/glyph) | TASK: P-346 third review of Z.ai Phase 2 v3 (checksum open question resolved) + rebuild innovation notes | DATE: 2026-11-12T04:20:00Z
FOR: P-346
REVIEW-OF: Z.ai v3 pushed copies — `origin/council/or:zai-phase2-v3-copy` (a9eda133), `origin/council/vl:_agents/zai/deliveries/z-phase2-v3` (18e2f886), `origin/council/glyph:_agents/glyph/deliveries/zai-phase2-v3` (f01eee1d/051f9141 context)
VERDICT: improved
CORRECTION: This filing corrects glyph’s earlier `inbox/20261112-0400-glyph-P-346-zai-phase2-v3-review.md` (VERDICT ok) on the top-level checksum count. The earlier “72/72” claim was erroneous; re-verification against git-pushed bytes shows 69/72 on every pushed copy checked (details below). Other verified receipts in that filing (oracle match, merge/harness byte-identical reruns, B/C receipt cross-checks, subfolder manifests) stand.

## §1 Review — open checksum question (settled by re-run, not vote)

**Question (MUSE prompt §1):** VL reported top-level 72/72; MUSE reported 69/72 on OR and VL copies (same 3 CSVs CRLF-listed, LF-shipped). Third reviewer to run `sha256sum -c CHECKSUMS.txt`-equivalent on pushed git bytes and report count/copy.

**Method (VERIFIED):** for each pushed copy, `git show <base>/CHECKSUMS.txt`, then for every `<hash> <size> <path>` recomputed `sha256(git show <base>/<path>)` and byte length from git object bytes (no staging/working-tree normalization). Python one-liner; same basis as `sha256sum -c` on extracted git bytes.

**Results (VERIFIED):**
- `origin/council/or:zai-phase2-v3-copy` (a9eda133): **69 OK / 3 BAD / 72 entries**.
- `origin/council/vl:_agents/zai/deliveries/z-phase2-v3` (18e2f886): **69 OK / 3 BAD / 72 entries**. (REPORTED prompt path `phase2-v3-2026-11-12` not present; actual v3 path is `_agents/zai/deliveries/z-phase2-v3`.)
- `origin/council/glyph:_agents/glyph/deliveries/zai-phase2-v3` (f01eee1d): **69 OK / 3 BAD / 72 entries**.

**Same 3 mismatches on all copies (VERIFIED):** listed hashes/sizes are CRLF-form; shipped git bytes are LF (same defect class MUSE identified).
| file | listed (hash/size) | actual git bytes (hash/size) | newline evidence (OR, VERIFIED) |
|---|---|---|---|
| `phase2-next-2026-11-11/C1-era-E-table/c1_per_team_e_input.csv` | `e82f0cca…` / 67903 | `aa13b604…` / 67582 | len 67582, `\r\n` 0, `\n` 321 |
| `phase2-next-2026-11-11/C3-gravity-fold/c3_gravity_fold_per_team_game.csv` | `98a46012…` / 232832 | `1b1b7c61…` / 227574 | len 227574, `\r\n` 0, `\n` 5258 |
| `phase2-next-2026-11-11/C4-dime-reanchor/c4_dime_situation_table.csv` | `9c92a4b2…` / 1505 | `26afb5da…` / 1488 | len 1488, `\r\n` 0, `\n` 17 |

**Conclusion (INFERRED from receipts):** VL’s “72/72” was not reproducible on the pushed git bytes of the copies checked here; it likely ran on pre-normalization/CRLF local bytes. Correction needed to VL’s count (and to my prior filing). Subfolder manifests remain strong: corrections 28/28 and phase2-real 14/14 verified in prior glyph pass (VERIFIED, shipped-byte recompute), and Fix 4/REV 3 materially addressed the v2 synthetic/spot-table defects; this is a residual top-level C1/C3/C4 manifest defect.

**P-346 review status (REPORTED from prompt/rules):** MUSE = improved, VL = ok (count disputed by evidence), glyph = improved (this correction). Three different seats have filed on the same v3 artifact; count/REVIEWED disposition is for Architect/queue bookkeeping given the manifest correction.

## §1 cont. — other v3 receipts (unchanged from prior glyph pass, VERIFIED unless noted)
- `flex-99-live.json` byte-identical to `origin/architect/engine-and-seats:tools/mathlab/flex.json` (`0a26d7c2…`, 99 rules).
- Temp reruns: `merge_prototype.py` EXIT 0, outputs/logs byte-identical to shipped (`cac74794…`, `19bfc57c…`); `phase2_harness.py` with VL ledger/staged EXIT 0, `phase2_results 53a49bd6…`, 30/30, CB2 -2.3.
- B1/C1: corrected FB 2020 `0.0887` (per-row), adapter `0.0996`, plain `0.0737`; endpoints FB `0.1426→0.0814`; DIME mean `0.1263` (0.1252..0.0936). C2: 2023 REG n=544, corr 0.056, cond SD 9.86 (N=10,n=117)/9.30 (N=11,n=136), TD-only definition identified, n=572 superseded, persistence max |err| 0.67 at key Ns (1.91 at N=14 tail). C3: gravity 10/10 exact 0.325/0.335/0.310/0.304/0.309/0.313/0.313/0.331/0.327/0.315, 5257 fold rows, 16-team 2016 leader≠snaps-WR1 named, staged depth gap (`air_yards`) explicit. C4: staged DIME 0.0695 vs real pooled 0.1263, per-season matches B1; proposal only (engine untouched). Raw nflverse parquet recomputation NOT RUN locally (data unavailable); script paths sandbox-hardcoded (REPORTED/limit).

## §2-§3 Innovation (proposals, receipts where available; Owner ratifies)

**1. λ estimator: condition-first, micro-moment-identified once Phase 1 lands (INFERRED, grounded in C2).**
- C2 (VERIFIED): conditioning by drives cuts SD materially in dense buckets (uncond 10.06 → 9.86/9.30 at N=10/11) and persistence floor is already tight at key Ns (errors +0.20,+0.20,-0.27,-0.40,+0.67 for N=9-13) but unstable at sparse tails (N=14 +1.91, n small). Two-gap Lab R=1.979/1.890/1.649 replicated; D4 overstatement demonstrated.
- **Proposal:** keep P-347 two-gap+conditional-moments on held-out 2023-2025 as the Phase 1 acceptance estimator, but define λ’s *identifying* statistics as play-level micro-moments on held-out seasons when Phase 1 emits events: completion% by air-yards bucket, INT rate by coverage shell, pressure→sack, YAC by target/slot, explosive rate — each conditional on situation/drives where feasible. R (Wins20/Wins10) remains the macro sanity ratio, not the sole objective.
- **0.40 vs 0.20 objective (INFERRED):** optimize for held-out conditional predictive error (calibration of per-drive/per-bucket distributions) rather than exact tier counts; 0.40 risks overfitting tier edges/dispersion, 0.20 risks washing signal. Report both; bind only the one that passes held-out conditional moments + totals bar. Owner ruling needed if they diverge materially.

**2. Staging: conserve possessions, instrument drive shape before fitting means (INFERRED).**
- C2 shows drive count explains only a small slice (corr 0.056 in 2023 REG) but conditioning is still required for SD correctness; chain-length (2.7 vs ~2.4) and drive-budget conservation address different failures.
- **Proposal:** Phase 1 schema must emit per-drive `plays`, `TOP_sec`, `start_reason/end_reason`, `points`, `turnover`, and `drive_index` so staging can be oracle-checked on possession budget and drive-shape distribution (not just game totals). First fit target: points-per-drive and drives-per-team distributions jointly under conservation; then chain/play mix. Budgeted staging (Glyph) + chain-length repair should be evaluated on the same fold, not chosen a priori.

**3. Gravity: use leader share and HHI as complementary, staged depth is the cheapest unblock (VERIFIED numbers, INFERRED use).**
- Leader deep-target share stable ~0.304–0.335 all decade; HHI 0.182–0.209 with WR2 deep share 0.204–0.222 (VERIFIED) => concentration is real but second option matters (“two-head” structure). Staged WR1 pass-event share 0.329 vs real most-targeted-WR share of attempts ~0.204–0.215 (sample seasons, VERIFIED) suggests staged overweighting and/or denominator mismatch.
- **Proposal:** carry both `gravity_leader_share` and `deep_hhi` (+WR2 share) in the fold; do not bake into v as a hidden multiplier until Phase 1 events expose depth. Cheapest staged-depth path: add `air_yards` (or `deep>=15` bool) to pass events and emit per-target attempts — enough to compute both stats without charting. `double_team`/assignment remain charting-class (C3 stated) — do not block on them.

**4. DIME: re-anchor to 0.126 pooled baseline but make blend situation-aware in measurement (VERIFIED numbers, INFERRED design).**
- Real DIME pooled 0.1263 vs staged 0.0695 and engine DIME_W 0.15 (constant/usage per C4); situation spread is large: 3rd+long 0.4531 (n=26743), 3rd+short 0.110, behind>8 0.1782, ahead>8 0.0869, tied/one-score 0.1172 (VERIFIED). Unconditional blend hides this.
- **Proposal (engine untouched here):** treat 0.126 as the package/snap prior for totals calibration, but specify the *situational* coverage blend table as a Phase 2 hook (or fold diagnostic now) so coverage impact can be conditioned without inventing charting data. Per-season packages useful as staging snapshot (C1/C4 innovation), static in pricing robustness — aligns with Z.ai era-snapshot filing, pending Owner/Architect preference.

**5. Convergence mechanism (INFERRED).**
- **Proposal:** a single “convergence contract” artifact both designs must emit on the same seeded/held-out setup: (a) fold schema (per-play event + per-drive + game aggregates) with required fields including depth/air_yards, personnel/package, coverage shell, TOP/drive budget; (b) gate panel: totals (~10% bar), conditional points-by-drives SD on 2023-2025, DIME/package shares, gravity stats, and macro R — all computed identically from folds; (c) two-view parity checks where applicable (MC vs exact/expected on deterministic cases). Designs disagree only where numbers on this contract disagree. Owner decision needed for which metrics bind at Phase 1 vs Phase 2 (align with P-352).

**6. Bounds respected (stated):** no gates/floors/intangibles/per-player style labels proposed as inputs; OVR+preferred-position primacy preserved; FB scarcity/C>OG/99-flex-guide treated as bounds; formula portability and simple integers kept in view. Dual-position/flex-derivation specifics not re-derived here (UNKNOWN beyond cited prompt/proposals).

Weakest point: innovation items 1,2,5 depend on Phase 1 event schema/folds landing; they are filed as checkable proposals (name the fields/metrics), not claims of effect.
