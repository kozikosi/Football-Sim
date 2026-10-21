# PROPOSAL: DS Arch-Probe Metrics (L10 pending)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-20  
**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Source:** DS's `_agents/ds/tools/arch-probe.js` (40 metrics, read-only)  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)

---

## Purpose

Document the 40 metrics measured by DS's `arch-probe.js` read-only probe against both v20 and donor builds. This provides the canonical metrics baseline for all future architecture reviews and regression detection.

---

## Probe Specification

**File:** `_agents/ds/tools/arch-probe.js`  
**Type:** Read-only Node.js script  
**Input:** Build HTML file (v20 or donor)  
**Output:** JSON with 40 metrics  
**Execution:** `node _agents/ds/tools/arch-probe.js <build.html>`

---

## Metrics Catalog (40 Metrics)

### 1. File Structure (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `file_size_bytes` | Total file size in bytes | 649,032 | 650,127 |
| `file_sha256` | SHA256 hash of entire file | `31b7d61f...` | `77bb9ed5...` |
| `script_tag_count` | Number of `<script>` tags | 1 | 1 |
| `style_tag_count` | Number of `<style>` tags | 2 | 1 |

### 2. Data Layer (6 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `players_count` | PLAYERS array length | 1,200+ | 1,200+ |
| `teams_count` | TEAM_DATA keys | 32 | 32 |
| `data_block_start_line` | Line where PLAYERS array begins | 449 | 449 |
| `data_block_end_line` | Line where data block ends | 908 | 908 |
| `data_block_size_bytes` | Bytes in PLAYERS + TEAM_DATA | 126,222 | 126,222 |
| `data_block_lines` | Lines in data block | 460 | 460 |

### 3. DOM References (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `document_refs_total` | Total `document.` references | 195 | 172 |
| `document_refs_lines` | Lines containing `document.` | 172 | 157 |
| `window_refs_total` | Total `window.` references | 11 | 10 |
| `window_refs_lines` | Lines containing `window.` | 10 | 9 |

### 3. Event Listeners (2 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `event_listeners_count` | `addEventListener` calls | 87 | 87 |
| `event_listener_lines` | Lines with `addEventListener` | 87 | 87 |

### 4. Function Census (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `named_functions_total` | Named functions (`function name()`) | 409 | 412 |
| `function_declarations` | `function name()` declarations | 409 | 412 |
| `arrow_functions` | Arrow function expressions | 0 | 0 |
| `nested_functions` | Functions inside functions | 12 | 12 |

### 5. Math Core (8 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `math_functions_identical` | Identical math functions (of 8) | 8 | 8 |
| `slotWins_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `slotWinsPerOvr_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `modelWeights_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `effOvr_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `optimalLineup_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `matchupModel_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `simulateGame_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |
| `teamRatings_hash` | sha256 prefix (12-char) | `dc54e4210ce1` | `dc54e4210ce1` |

### 4. DOM-Manipulation Functions (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `document_write_count` | `document.write` calls | 0 | 0 |
| `innerHTML_assignments` | `innerHTML =` assignments | 12 | 12 |
| `querySelector_calls` | `querySelector` / `querySelectorAll` | 45 | 45 |
| `getElementById_calls` | `getElementById` calls | 28 | 28 |

### 5. Randomness & Reproducibility (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `math_random_calls` | `Math.random()` occurrences | 58 | 58 |
| `math_random_lines` | Lines containing `Math.random()` | 39 | 39 |
| `math_random_sites` | Unique call sites | 39 | 39 |
| `seeded_rng_present` | Seeded RNG indirection present | false | false |

### 5. Persistence & Storage (2 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `localStorage_refs` | `localStorage` references | 0 | 0 |
| `sessionStorage_refs` | `sessionStorage` references | 0 | 0 |

### 6. SIM-CORE & Harness (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `sim_core_markers` | `SIM-CORE-START`/`END` markers | 0 | 0 |
| `headless_entry_points` | `buildDraftState`/`simulateDraftHeadless`/`buildLeagueFromDraft` | 0 | 0 |
| `harness_scripts_present` | `pw4.js`/`validate.js`/`phone.js`/etc. | false | false |
| `tests_directory_exists` | `tests/` directory exists | false | false |

### 6. Code Quality / Debt (4 metrics)
| Metric | Description | v20 | Donor |
|--------|-------------|-----|-------|
| `dead_functions` | Unreferenced functions | 10 | 10 |
| `dead_css_classes` | Unreferenced CSS classes | 13 | 13 |
| `dead_code_blocks` | Unreachable code blocks | 0 | 0 |
| `duplicate_code_blocks` | Duplicated code blocks | 2 | 2 |

---

## Output Format (JSON)

```json
{
  "build_hash": "31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819",
  "file_size_bytes": 649032,
  "timestamp": "2026-10-20T...",
  "metrics": {
    "file_structure": { ... },
    "data_layer": { ... },
    "dom_references": { ... },
    "event_listeners": { ... },
    "function_census": { ... },
    "math_core": { ... },
    "dom_manipulation": { ... },
    "randomness": { ... },
    "persistence": { ... },
    "sim_core": { ... },
    "code_quality": { ... }
  },
  "checks": {
    "sim_core_markers_present": false,
    "headless_entry_points_present": false,
    "harness_scripts_present": false,
    "seeded_rng_present": false,
    "persistence_present": false,
    "math_core_identical": true
  }
}
```

---

## Usage

```bash
# Run probe on v20
node _agents/ds/tools/arch-probe.js "NFL Draft Simulator v20 Claude.html" > v20-metrics.json

# Run probe on donor
node _agents/ds/tools/arch-probe.js "NFL Draft Simulator.html" > donor-metrics.json

# Compare
diff -u v20-metrics.json donor-metrics.json
```

---

## Acceptance Criteria

- [ ] Probe runs on both builds without error
- [ ] All 40 metrics populated for both builds
- [ ] JSON output valid and parseable
- [ ] Math core hashes match (8/8 identical)
- [ ] SIM-CORE markers = 0 in both builds
- [ ] Headless entry points = 0 in both builds
- [ ] Math.random() = 58 on 39 lines (both)
- [ ] Persistence = 0 in both
- [ ] Output saved to `_agents/ds/reviews/arch-probe-metrics.json`

---

**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Next Step:** Owner approval → probe already exists at `_agents/ds/tools/arch-probe.js` → document metrics in this spec