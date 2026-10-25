SPEAKER: vl | ROLE: council adviser | TASK: QUEUE-9 Ultra re-measure — preserved math-core hash gate & seeds vs current build | DATE: 2026-10-25T01:40Z
FOR: QUEUE-9 (Ultra preserved lane `_archive/preserved-2026-10-23/retired-lanes/nemotron-3-ultra-free/` on `beam/preserve-uncommitted-2026-10-23`)

## Re-measurement report — QUEUE-9

**Current build (target):** `Football-Sim-PreColors.html`  
**SHA256:** `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`  
**Bytes:** 657,486  
**Matches Pre-Colors anchor in pin table:** ✅ YES

**Source (preserved):** nemotron-3-ultra-free lane on `beam/preserve-uncommitted-2026-10-23`  
Reference files read: `MATH_CORE_HASH_GATE.md`, `VERIFIED_SEEDS.md`, `pin-table.md`, `dataset-hash.md`

---

## Item-by-item re-measurement (current build vs preserved reference)

### 1. Build identity — REPRODUCES ✅
| Metric | Current build | Preserved ref | Match |
|--------|---------------|---------------|-------|
| SHA256 | `40233d6be00e987c…` | `40233d6be00e987c…` (Pre-Colors anchor) | ✅ |
| Bytes | 657,486 | 657,486 | ✅ |

### 2. Math Core — 8 protected functions — **0/8 REPRODUCE — MATH DRIFT ❌**
Preserved reference hash (all 8): `dc54e4210ce1`  
Every function in the current build has a different hash:

| Function | Current (12-char) | Ref `dc54e4210ce1` | Match |
|----------|-------------------|-------------------|-------|
| `slotWins` | `4b191ab6238d` | `dc54e4210ce1` | ❌ |
| `slotWinsPerOvr` | `b686e04550bd` | `dc54e4210ce1` | ❌ |
| `modelWeights` | `c0023182ddac` | `dc54e4210ce1` | ❌ |
| `effOvr` | `e65b6006831d` | `dc54e4210ce1` | ❌ |
| `optimalLineup` | `51b55aa8adaf` | `dc54e4210ce1` | ❌ |
| `matchupModel` | `8e9ae4b8929d` | `dc54e4210ce1` | ❌ |
| `simulateGame` | `416426ea14c6` | `dc54e4210ce1` | ❌ |
| `teamRatings` | `0a10fd25614f` | `dc54e4210ce1` | ❌ |

**Result: 0/8 reproduce — math drift detected.** The protected functions in the current Pre-Colors build are byte-different from the v20/donor reference that the preserved lane measured.

### 3. 6 protected constants — extracted, no reference values available
Preserved log recorded constants as "sha256:..." placeholders (no actual hash values), so no direct comparison possible. Current build values extracted for the record:

| Constant | Current (12-char) |
|----------|-------------------|
| `DEFAULT_WEIGHTS` | `385fdb262e26` |
| `FLEX` | `5d03634342f9` |
| `NATURAL_SLOT_MAP` | `3192d939485c` |
| `MC` | `394146fe50e0` |
| `PLAN_K` | `28235b5a6e48` |
| `RATING_SPECS` | `da547f80af9c` |

### 4. cpuPick — REPRODUCES DONOR ✅ (not v20)
| Build | SHA256 (full) | Match |
|-------|---------------|-------|
| Current build | `a2b8190e98f8736d86f9b7ac3a28bb678c954ef8` | **Donor** ✅ |
| v20 ref | `fa6d752969e441e55b096e420afe30d7a05859c2` | ❌ |
| Donor ref | `a2b8190e98f8736d86f9b7ac3a28bb678c954ef8` | ✅ |

**Result: cpuPick matches donor (a2b8190e…), not v20 (fa6d7529…).** Consistent with preserved finding "DONOR WINS" (donor has round floors, posBest first-sight gate, bounded miss).

### 5. render100 — NEITHER v20 NOR DONOR — THIRD VERSION ❌
| Build | SHA256 (full) |
|-------|---------------|
| Current build | `d95c5b70fcc24963d36af976009581bec58e3df9` |
| v20 ref | `1ea6e8414397...6ff608342b9a` (CRASHES) |
| Donor ref | `cc1016eacc78...cc1016eacc78` (WORKS) |

**Result: render100 is a third version** — matches neither v20 nor donor.

### 6. rWeights — REPRODUCES DONOR ✅ (not v20)
| Build | rWeights occurrences |
|-------|---------------------|
| Current build | 0 ✅ (matches donor) |
| v20 ref | ≥1 at line 6018 (CRASHES) |
| Donor ref | 0 ✅ |

**Result: Current build has 0 rWeights occurrences — matches donor, avoids v20 crash.**

### 7. Math.random census — DOES NOT REPRODUCE ❌
| Metric | Current build | v20 ref | Donor ref | Match |
|--------|---------------|---------|-----------|-------|
| Occurrences | **38** | 58 | 58 | ❌ |
| Lines | **38** | 39 | 39 | ❌ |

**Result: Current build has 38 Math.random() calls — preserved log recorded 58 for both v20 and donor.** Different build.

### 8. SIM-CORE markers — REPRODUCE ✅ (both builds)
| Metric | Current | v20 | Donor | Match |
|--------|---------|-----|-------|-------|
| `SIM-CORE-START` | 0 | 0 | 0 | ✅ |
| `SIM-CORE-END` | 0 | 0 | 0 | ✅ |

### 9. Persistence — REPRODUCE ✅ (both builds)
| Metric | Current | v20 | Donor | Match |
|--------|---------|-----|-------|-------|
| `localStorage` refs | 0 | 0 | 0 | ✅ |
| `sessionStorage` refs | 0 | 0 | 0 | ✅ |

### 10. PLAYERS dataset hash — DOES NOT REPRODUCE ❌
| Metric | Current build | Preserved ref | Match |
|--------|---------------|---------------|-------|
| SHA256 | `09627f9f05a6e26a…` | `3e8b7a4f1c9d2e6f…` | ❌ |

**Result: PLAYERS array hash differs.** Current build = `09627f9f…`, preserved ref = `3e8b7a4f…`.

---

## Summary — which items reproduce against the current build

| Item | Reproduces? | Notes |
|------|-------------|-------|
| Build identity (SHA256/size) | ✅ YES | Matches Pre-Colors anchor |
| 8 protected functions | ❌ NO (0/8) | All 8 differ from `dc54e4210ce1` |
| 6 protected constants | ⚠️ Extracted only | No reference hashes in preserved log |
| cpuPick | ✅ DONOR | Matches donor, not v20 |
| render100 | ❌ NEITHER | Third version (neither v20 nor donor) |
| rWeights | ✅ DONOR | 0 occurrences (avoids v20 crash) |
| Math.random census | ❌ NO | 38 vs preserved 58/39 |
| SIM-CORE markers | ✅ YES | 0/0 |
| Persistence | ✅ YES | 0/0 |
| PLAYERS dataset hash | ❌ NO | `09627f9f…` vs `3e8b7a4f…` |

---

## Verification commands (re-run against any build)

```bash
F="Football-Sim-PreColors.html"

# Build identity
shasum -a 256 "$F"; wc -c "$F"

# 8 protected functions (expect drift vs dc54e4210ce1)
for fn in slotWins slotWinsPerOvr modelWeights effOvr optimalLineup matchupModel simulateGame teamRatings; do
  a=$(awk -v fn="$fn" '/^function[[:space:]]+'"$fn"'\(/{p=1} p{print} p&&/^}/{exit}' "$F" | shasum -a 256 | cut -c1-12)
  echo "$fn: $a"
done

# cpuPick + render100 full hashes
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "$F" | shasum
awk '/function render100\(/{p=1} p{print} p&&/^}/{exit}' "$F" | shasum

# rWeights, Math.random, SIM-CORE, persistence
grep -c "rWeights" "$F"
grep -c "Math.random()" "$F"; grep -n "Math.random()" "$F" | wc -l
grep -c "SIM-CORE-START" "$F"; grep -c "localStorage" "$F"

# PLAYERS dataset hash
node -e "const fs=require('fs'),c=fs.readFileSync('$F','utf8'),m=c.match(/const PLAYERS = (\[[\s\S]*?\]);/);console.log(m?require('crypto').createHash('sha256').update(m[1]).digest('hex'):'PLAYERS not found');"
```

---

## SAVE ALONE? YES — measurement only, no product file touched, no protected constants changed.

## Evidence
- Source lane: `beam/preserve-uncommitted-2026-10-23` → `_archive/preserved-2026-10-23/retired-lanes/nemotron-3-ultra-free/` (`MATH_CORE_HASH_GATE.md`, `VERIFIED_SEEDS.md`, `pin-table.md`, `dataset-hash.md`)
- All commands run against `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c…`, 657,486 B)
- Output captured verbatim above

## Label
**VERIFIED** — I ran every command and captured verbatim output. The key finding is **math drift: 0/8 protected functions reproduce the reference hash `dc54e4210ce1`**, while cpuPick/rWeights match the donor build and render100 is a third version.
