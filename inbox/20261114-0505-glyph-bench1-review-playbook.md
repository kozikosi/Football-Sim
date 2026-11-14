SPEAKER: glyph | ROLE: seat (preparation) | TASK: BENCH-1 review playbook for ruling day | DATE: 2026-11-14T05:05Z
FOR: Owner / reviewers (when Z.ai or benchmark artifacts land)

# BENCH-1 Review Playbook (decision-preparation checklist)

**Status:** PREP / CHECKLIST (no runs, no measurements, no framework verdict). Based on `origin/architect/engine-and-seats:claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` (sha256 `1e4df36c45a6b82dac0994b67db19235547d3ca4cb3f18ec3248e80bfe70fbbf`, 75 lines, PROPOSAL: "Nothing in this document has been run") and `origin/council/inkling:_agents/inkling/prompts-2026-11-13/zai-bench1-run-2026-11-14.md` (sha256 `77814e002122cd2d19dc12242c4619c910e568d1f3a73e52df89653f563e8a15`). **Drift risk:** written against spec/prompt only; correct against actual harness/artifacts before execution.

## 0. Ground rules (must hold during review)
- [ ] Labels everywhere: VERIFIED / REPORTED / INFERRED / UNKNOWN. No invented/padded numbers.
- [ ] No framework ranking/scoring/"gut-feel" winner. BENCH-1 produces measurements + tie rule; **no verdict from speed alone** (spec §1). Evidence informs; Owner rules.
- [ ] No weight/output pinning gate: determinism is run-vs-run (same code/seed twice; Node 22 vs 24 where applicable), not vs committed numbers (spec §1).
- [ ] Tier 2 numbers never compared with Tier 1 numbers (spec §5).
- [ ] Engine consumed, not edited (`colors/`, `architect/engine-and-seats` read-only intent); protected constants untouched.

## 1. MANIFEST / handoff integrity (recompute; adapt Ernie-style)
- [ ] Identify artifact root (zip extract / delivery path / branch+path). Record ref/commit/path context.
- [ ] Locate `MANIFEST.txt` (or equivalent) and recompute sha256 for every listed entry from actual bytes in that tree.
  - Pattern (zsh-safe): `python3 - <<'PY'` parse lines `<sha>  <path>`, `hashlib.sha256(open(fullpath,'rb').read()).hexdigest()` (or `git show ref:path` for remote), report `OK/MISMATCH/MISSING`.
- [ ] Confirm manifest covers filing/report, raw logs, result JSONs, environment fingerprint, DESIGN-LOG (if present), and expected receipts. No "summary passed" without raw receipt.
- [ ] Record: `entry_count`, `OK`, `MISMATCH`, `MISSING`, manifest sha256, filing/report sha256+size. Any mismatch/missing = **VERIFIED defect**; do not trust affected claims until resolved.
- [ ] External zip hash (e.g. relay-cited) verifiable only if zip bytes exist locally; else mark **UNVERIFIABLE from this clone** and cite verified file-level hashes.

## 2. Reproducibility envelope & protocol checks (spec §2, §4, §5)
- [ ] Environment fingerprint per result: OS, CPU/RAM (if available), Node/npm/Chromium versions, commit SHAs, tool versions.
- [ ] Data: primary real pool `data/nfl/madden27-ratings.csv` (1,941 rows, proposed) as used? P-SYN only for board scaling sweep if used; generator code+seed recorded (output hash reported, not gated).
- [ ] Draft sizes/seeds: D-5R (160) and D-32R (1,024) as applicable; seeds 1-5 (Tier 1), seed 1 (Tier 2); user team index 0 and 31 (record deviations).
- [ ] Measurement: 3 warm-up discarded, 20 measured per cell; arms interleaved A-B-C... for 5 rounds; report median, p95, MAD, bootstrap 95% CI of median.
- [ ] Tier 2 DOM contract/testids as specified or as-documented (`board-row`, `sort-wins|ovr|priority`, `filter-pos`, `pick`, `roster-panel` — check drift). Timing = interaction start to frame after DOM reflects new VM (double `requestAnimationFrame`), Chromium headless, fixed viewport.
- [ ] First three baseline runs **report-only** for budgets; ratification required before any budget can fail.

## 3. Result JSON / schema checklist (map to spec §3, §5, §7; names may vary)
- [ ] **Identity/envelope:** run id, timestamp, commit sha, arm/framework, tier, environment fingerprint.
- [ ] **Workload:** W1–W5 (or equivalent), pool identity/hash, draft size D-5R/D-32R, seed(s), user team index, policy, sampled round(s).
- [ ] **Determinism:** data hash, record hash/seed, table hash, summary-rows hash, board rows/VM text hash, DOM-text hash (Tier 2), A1/A2/A3 outcomes.
- [ ] **Timing:** per-interaction/pick/game/draft/season ms as applicable; raw samples or summaries (median, p95, MAD, bootstrap 95% CI). Warm-up/measured counts recorded.
- [ ] **Correctness gates:** W1 (0 dup ids, hash stable 22/24) / W2 (32 slots filled, no duplicate player, legal fits) / W3 (record hash stable, replay/restore byte-identical summary, size/budget fields) / W4 (17 regular games/team, W+L+T, PF==PA, fixtures counts incl playoffs as asserted, per-game regen from `gameSeed(seed,week,home)` identical) / W5 (VM string-identical, sort incl id tie-break, PICK+UNDO restores VM).
- [ ] **Budgets:** provisional values, measured medians, REPORT-ONLY/pass/fail status, rerun counts (1.5x baseline median in 2/3 reruns applies only after ratification).
- [ ] **Deviations:** DESIGN-LOG / delta notes vs spec/prompt.

## 4. G5 string-identity (DOM-text-hash) verification recipe (per interaction)
1. [ ] Capture engine/store VM board representation for the state (rows/text/order as defined).
2. [ ] Assert rendered board text is **string-identical** to VM in that arm.
3. [ ] Compute normalized DOM-text hash of rendered board region (document normalization: whitespace, text nodes/order, included/excluded attributes — consistent across arms).
4. [ ] Assert DOM-text hash is **identical across all arms** for same state/interaction (shared VM => difference = framework-side bug).
5. [ ] Run per interaction (sort, filter, select, pick) and per sampled round/cell; record mismatches with arm, interaction, seed, round, expected vs observed hash/text.

## 5. Tie-rule application math (spec §5) + worked example
**Rule:** Arm "beats" another on a metric only if CIs **do not overlap** AND ratio **>= 1.2**. Otherwise **tie** (record ties). Tier 2 compared only within Tier 2.

**Procedure:**
1. [ ] For metric/cell get bootstrap 95% CI of median for A `[A_lo,A_hi]`, B `[B_lo,B_hi]`, medians `A_m`,`B_m`.
2. [ ] Overlap: `A_lo <= B_hi` and `B_lo <= A_hi`.
3. [ ] Ratio (lower latency better): `slower_median / faster_median >= 1.2` in the non-overlapping direction.
4. [ ] **beats** only if non-overlapping AND ratio >= 1.2; else **tie**.

**Worked examples (illustrative, NOT measurements):**
- Svelte median 18 ms CI [16,20], Vue 24 ms CI [22,26]: no overlap (20<22), ratio 24/18=1.333 >=1.2 => **Svelte beats Vue**.
- A [16,23], B [21,28]: overlap (21<=23) => **tie**.
- A [16,18], B [21,22]: no overlap, ratio 21/16=1.3125 >=1.2 => **A beats B**. If ratio were 1.167 with no overlap => **tie**.

## 6. Ratification-packet mechanics (Owner per-budget rows)
- [ ] First three baseline runs are **report-only** (spec §4). Present real numbers next to provisional budgets.
- [ ] Per-budget table: **budget | provisional value | run1 | run2 | run3 | summary (median/p95/MAD/CI) | proposed disposition (KEEP/RELAX/ TIGHTEN/REPORT-ONLY/REJECT) | rationale** — proposed rows labeled **PROPOSAL**.
- [ ] Include UX-1/2/3, ENG-1/2/3, SAVE-1, Heap (report-only) as applicable.
- [ ] After Owner ratification only: fail when median exceeds **1.5x stored baseline median** on same runner class in **2 of 3 reruns** (one noisy run never fails). Pre-ratification misses = findings.

## 7. Determinism gates (spec §6)
- [ ] **A1 (hard):** same (seed, team, policy) twice => identical record/table/summary hashes.
- [ ] **A2 (hard):** Node 22.23 vs 24.22 => identical (spec notes existing suite green as REPORTED context; reverify if claimed).
- [ ] **A3 (report-only, UNKNOWN today):** Chromium vs Firefox vs WebKit => identical season/draft hashes; record capability/result. Promote to gate only if identical and Owner approves.

## 8. Decision-note citation template (one paragraph)
> "BENCH-1 review of `<artifact/ref, commit/path, MANIFEST sha256, date>`: integrity `<OK/MISMATCH/MISSING>` (VERIFIED/REPORTED). Protocol `<conforms/deviates>` vs spec `1e4df36c...` (workloads, seeds, warmup/measures, interleaving). Determinism A1/A2/A3: `<pass/fail/report-only/unknown + hashes>`. Tier 1: `<W1–W5 outcomes>`. Tier 2: `<cells measured, G5 string-identity/dom-hash outcomes, tie-rule results with CI+ratio evidence — ties/beats only as evidenced>`. Budgets: `<report-only/ratified dispositions>`. Limitations: `<runner variance, missing browsers, spec drift, unverified items>`. Evidence only; framework decision remains the Owner's."

## 9. Likely drift items to recheck against actual artifacts
- [ ] Filter home (selector vs UI-local) and `selectBoard` contract/`limit`.
- [ ] Final DOM `data-testid` names (scaffolds may differ).
- [ ] Whether arms mount `store.ts` as-is.
- [ ] Actual result JSON schema/field names/layout (`tools/bench/` or delivery structure).
- [ ] Z.ai/Architect DESIGN-LOG deviations.
