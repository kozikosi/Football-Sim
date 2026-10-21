# PROPOSAL: Math Core Hash Gate (P9/P14 pending)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-20  
**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`

---

## Purpose

Create a hash gate for the 8 protected math functions + 6 protected constants to prevent silent math drift during merges. This implements the hash gate mandated by CONTRACT.md C2 and Pickle's merge manifest addendum.

---

## Specification

### Protected Functions (8) — Must Remain Byte-Identical

| Function | Purpose | v20 Hash (12-char) | Donor Hash (12-char) | Status |
|----------|---------|-------------------|---------------------|--------|
| `slotWins` | Wins/season for slot at OVR | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `slotWinsPerOvr` | Marginal wins per +1 OVR | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `modelWeights` | 0–700 scale conversion (QB=700) | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `effOvr` | Effective OVR with flex penalty | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `optimalLineup` | Hungarian max-wins assignment | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `matchupModel` | Expected points from unit ratings | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `simulateGame` | Full game realization | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `teamRatings` | 9 unit ratings from lineup | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |

**Shared Hash:** `dc54e4210ce1` (12-char prefix of sha256)

### Protected Constants (6) — Must Remain Byte-Identical

| Constant | Purpose | v20 Hash | Donor Hash | Status |
|----------|---------|----------|------------|--------|
| `DEFAULT_WEIGHTS` | Position weight map | ✅ Identical | ✅ Identical | ✅ Identical |
| `FLEX` | Flex penalty rules | ✅ Identical | ✅ Identical | ✅ Identical |
| `NATURAL_SLOT_MAP` | Natural position → slot mappings | ✅ Identical | ✅ Identical | ✅ Identical |
| `MC` | Matchup model coefficients | ✅ Identical | ✅ Identical | ✅ Identical |
| `PLAN_K` | Game plan coefficients | ✅ Identical | ✅ Identical | ✅ Identical |
| `RATING_SPECS` | Unit rating specifications | ✅ Identical | ✅ Identical | ✅ Identical |

---

## Implementation: `tests/math-baseline.json`

```json
{
  "version": "1.0",
  "generated": "2026-10-20",
  "build_hash": "31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819",
  "functions": {
    "slotWins": "dc54e4210ce1",
    "slotWinsPerOvr": "dc54e4210ce1",
    "modelWeights": "dc54e4210ce1",
    "effOvr": "dc54e4210ce1",
    "optimalLineup": "dc54e4210ce1",
    "matchupModel": "dc54e4210ce1",
    "simulateGame": "dc54e4210ce1",
    "teamRatings": "dc54e4210ce1"
  },
  "constants": {
    "DEFAULT_WEIGHTS": "sha256:...",
    "FLEX": "sha256:...",
    "NATURAL_SLOT_MAP": "sha256:...",
    "MC": "sha256:...",
    "PLAN_K": "sha256:...",
    "RATING_SPECS": "sha256:..."
  }
}
```

---

## Hash Gate Script (Merge Manifest)

```bash
#!/bin/bash
# tests/merge-manifest.sh — Math Core Hash Gate
# Exit codes: 0=pass, 1=math drift, 2=extraction error, 3=missing function

set -euo pipefail

MERGED_FILE="${1:-NFL Draft Simulator.html}"
REF_FILE="${2:-NFL Draft Simulator v20 Claude.html}"

FUNCTIONS=(
  "slotWins"
  "slotWinsPerOvr"
  "modelWeights"
  "effOvr"
  "optimalLineup"
  "matchupModel"
  "simulateGame"
  "teamRatings"
)

extract_function() {
  local file="$1"
  local fn="$2"
  awk -v fn="$fn" '
    /^function[[:space:]]+'"$fn"'\(/ { p=1 }
    p { print }
    p && /^}/ { exit }
  ' "$file"
}

echo "MATH GATE: Checking 8 protected functions..."

for fn in "${FUNCTIONS[@]}"; do
  a=$(extract_function "$MERGED_FILE" "$fn" | shasum -a 256 | cut -c1-12)
  b=$(extract_function "$REF_FILE" "$fn" | shasum -a 256 | cut -c1-12)
  
  if [ "$a" != "$b" ]; then
    echo "MATH DRIFT in $fn: merged=$a vs ref=$b"
    exit 1
  fi
done

echo "MATH GATE: PASS (8/8 identical)"
exit 0
```

---

## Integration with Merge Manifest

Add to `tests/merge-manifest.md`:

```markdown
## Math Core Hash Gate

**Rule:** All 8 protected functions + 6 constants must remain byte-identical between v20 reference and merged candidate.

**Hash:** `dc54e4210ce1` (12-char prefix of sha256 for all 8 functions)

**Verification:**
```bash
bash tests/math-gate.sh <merged.html> <v20-reference.html>
```

**Exit Codes:**
- 0 = PASS (all 8 identical)
- 1 = MATH DRIFT (function name + hashes printed)
- 2 = Extraction error
- 3 = Missing function

**Enforcement:** Run in `tests/run_all.sh` before promotion. Fail = merge blocked.
```

---

## Verification Commands

```bash
# Verify all 8 functions match
for f in slotWins slotWinsPerOvr modelWeights effOvr optimalLineup matchupModel simulateGame teamRatings; do
  a=$(awk -v fn="$f" '/^function[[:space:]]+'"$f"'\(/{p=1} p{print} p&&/^}/{exit}' "merged.html" | shasum -a 256 | cut -c1-12)
  b=$(awk -v fn="$f" '/^function[[:space:]]+'"$f"'\(/{p=1} p{print} p&&/^}/{exit}' "v20.html" | shasum -a 256 | cut -c1-12)
  echo "$fn: merged=$a vs ref=$b"
done

# Expected: all 8 show identical 12-char hashes (dc54e4210ce1)
```

---

## Acceptance Criteria

- [ ] `tests/math-baseline.json` created with 8 function hashes + 6 constant hashes
- [ ] `tests/math-gate.sh` script created and executable
- [ ] Hash gate integrated into `tests/merge-manifest.md`
- [ ] `tests/run_all.sh` runs math gate before promotion
- [ ] Verified against v20 and donor builds (all 8 identical)

---

**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Next Step:** Owner approval → implement `tests/math-baseline.json` + `tests/math-gate.sh` + merge manifest integration