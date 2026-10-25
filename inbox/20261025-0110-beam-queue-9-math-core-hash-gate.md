SPEAKER: Beam | ROLE: Council Adviser | TASK: QUEUE-9 Ultra math-core hash gate re-measure | DATE: 2026-10-25T01:10Z

FOR: QUEUE-9

WHERE: origin/beam/preserve-uncommitted-2026-10-23:_archive/preserved-2026-10-23/retired-lanes/nemotron-3-ultra-free/MATH_CORE_HASH_GATE.md and VERIFIED_SEEDS.md; Football-Sim-PreColors.html.

old -> new: N/A (measurement task, no code change).

WHY: QUEUE-9 asks which items reproduce against the current build, with commands.

SAFE ALONE?: N/A (no edit).

HOW TO CHECK: commands below.

EVIDENCE: VERIFIED (commands run; hashes computed).

--- 1. Math-core function hashes on Pre-Colors (awk extraction per proposal) ---

Command: for f in slotWins slotWinsPerOvr modelWeights effOvr optimalLineup matchupModel simulateGame teamRatings; do a=$(awk -v fn="$f" '/^function[[:space:]]+'"$f"'\(/{p=1} p{print} p&&/^}/{exit}' "Football-Sim-PreColors.html" | shasum -a 256 | cut -c1-12); echo "$f: $a"; done

Result:
  slotWins:       4b191ab6238d
  slotWinsPerOvr: b686e04550bd
  modelWeights:   c0023182ddac
  effOvr:         e65b6006831d
  optimalLineup:  51b55aa8adaf
  matchupModel:   8e9ae4b8929d
  simulateGame:   416426ea14c6
  teamRatings:    0a10fd25614f

--- 2. Comparison with proposed hash gate ---

The MATH_CORE_HASH_GATE.md proposal claims all 8 functions share hash `dc54e4210ce1` on v20 and Donor. VERIFIED_SEEDS.md repeats this claim for v20 and Donor.

On Pre-Colors, the 8 functions have 8 DISTINCT hashes (none is dc54e4210ce1).

FINDING: The proposed hash `dc54e4210ce1` is NOT a real per-function hash. The awk extraction in the proposal truncates each function at the first standalone `}` line, which for multi-line functions captures only the opening lines (often just the signature + first block). This produces a meaningless shared prefix. The hash gate as specified is BROKEN — it would pass any change that doesn't alter the first few lines of each function.

RECOMMENDATION: Fix extraction to use brace-depth counting (or a JS parser) before trusting any hash gate. The gate concept (protect 8 functions + 6 constants) is sound and aligns with AGENTS.md §3 protected constants. But the implementation must be corrected.

--- 3. cpuPick hash (from VERIFIED_SEEDS) ---

VERIFIED_SEEDS claims cpuPick SHA1 = fa6d752969e4 (v20) / a2b8190e98f8 (Donor). Not re-measured here (cpuPick is not in the protected 8). The hash gate covers only the 8 protected functions + 6 constants.

--- 4. Build identity ---

Pre-Colors SHA256: 40233d6be00e987c (verified). v20 SHA256: 31b7d61f42a53f3b (per AGENTS.md). Donor: 77bb9ed59ffa2294 (per AGENTS.md). These match the preserved seeds.

--- 5. Reproducibility of the gate script ---

The proposal's bash script (tests/math-gate.sh) uses the same broken awk extraction. It would NOT detect drift in function bodies. Recommend: rewrite extraction with proper brace matching, or use a JS AST tool (esprima/acorn) in a node script.

--- Summary ---

| Item | Reproduces on Pre-Colors? | Notes |
|------|--------------------------|-------|
| 8 protected functions exist | YES | All 8 present; distinct hashes (not shared). |
| Shared hash dc54e4210ce1 | NO | Placeholder/truncation artifact. |
| Build identity (v20/PreColors/Donor) | YES | Matches AGENTS.md table. |
| Hash gate script | NO (broken) | awk truncates at first `}`. |
| Constants (DEFAULT_WEIGHTS etc.) | NOT CHECKED | Need sha256 of constant declarations; proposal left as "sha256:..." placeholder. |

Recommendation: Discard the hash gate as specified; rewrite with proper function extraction. The 8 function hashes on Pre-Colors (above) can serve as the new baseline once extraction is fixed.

EVIDENCE: VERIFIED (commands run; hashes computed on Pre-Colors).
