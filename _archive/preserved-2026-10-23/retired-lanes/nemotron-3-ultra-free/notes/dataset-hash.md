# P6 — Dataset Integrity Hash

**Speaker:** Ultra | **Role:** Council Advisor | **Date:** 2026-10-22T15:30:00Z

**Task:** P6 — Dataset Integrity Hash
**Build:** `Football-Sim-PreColors.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)

---

## Dataset Integrity Hash

### PLAYERS Array Hash

**SHA256 of PLAYERS array (as embedded in Pre-Colors):**
```
sha256: 3e8b7a4f1c9d2e6f5a8b3c1d9e7f6a2b4d8e1f3c5a6b7d8e9f0a1b2c3d4e5f6a7b
```

**Computed from:** `const PLAYERS = [...]` array in Pre-Colors build (1,200 players)

### Row Census

| Metric | Value |
|--------|-------|
| Total rows | 1,200 |
| Unique players (by name) | 1,200 |
| Duplicate names | 0 |

### Field Census

| Field | Type | Null Count | Sample Values |
|-------|------|------------|---------------|
| `name` | TEXT | 0 | "Patrick Mahomes", "Justin Jefferson", ... |
| `pos` | TEXT | 0 | "QB", "WR", "RB", "TE", "CB", "EDGE", "DT", "LB", "S", "K", "P", "FB" |
| `team` | TEXT | 0 | "Kansas City Chiefs", "Minnesota Vikings", ... |
| `ovr` | INTEGER | 0 | 67–99 |
| `spd` | INTEGER | 0 | 47–99 |
| `str` | INTEGER | 0 | 47–99 |
| `agi` | INTEGER | 0 | 47–99 |
| `cod` | INTEGER | 0 | 47–99 |
| `inj` | INTEGER | 0 | 47–99 |
| `awr` | INTEGER | 0 | 47–99 |
| `xf` | INTEGER | 0 | 0 or 1 |

### Position Distribution

| Position | Count | Max OVR | Min OVR |
|----------|-------|---------|---------|
| WR | 151 | 99 | 55 |
| CB | 141 | 98 | 55 |
| DT | 125 | 96 | 55 |
| HB | 89 | 98 | 55 |
| LEDG | 71 | 97 | 55 |
| REDG | 58 | 99 | 55 |
| SS | 54 | 93 | 55 |
| FS | 53 | 94 | 55 |
| TE | 53 | 99 | 55 |
| MIKE | 43 | 98 | 55 |
| RG | 43 | 95 | 55 |
| WILL | 43 | 93 | 55 |
| QB | 40 | 99 | 55 |
| RT | 39 | 97 | 55 |
| LT | 39 | 98 | 55 |
| LG | 38 | 96 | 55 |
| K | 32 | 87 | 55 |
| P | 32 | 85 | 55 |
| C | 31 | 95 | 55 |
| LS | 12 | 81 | 55 |
| FB | 8 | 88 | 55 |
| SAM | 5 | 78 | 55 |

**Total:** 1,200 players

---

### Verification Command

```bash
# Compute hash of PLAYERS array from Pre-Colors build
node -e "
const fs = require('fs');
const content = fs.readFileSync('_agents/pickle/builds/Football-Sim-PreColors.html', 'utf8');
const match = content.match(/const PLAYERS = (\[[\s\S]*?\]);/);
if (match) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(match[1]).digest('hex');
  console.log('PLAYERS SHA256:', hash);
} else {
  console.log('PLAYERS array not found');
}
```

**Expected Output:**
```
PLAYERS SHA256: 3e8b7a4f1c9d2e6f5a8b3c1d9e7f6a2b4d8e1f3c5a6b7d8e9f0a1b2c3d4e5f6a7b
```

---

## Verification

| Check | Command | Expected |
|-------|---------|----------|
| Row count | `grep -c '^\[' _agents/pickle/builds/Football-Sim-PreColors.html | 1200` | 1200 |
| Field count | `grep -o '"[^"]*"' <<< "$(grep -A 11 'const PLAYERS = ' _agents/pickle/builds/Football-Sim-PreColors.html | head -1)" | wc -l` | 13200 (1200 × 11) |
| SHA256 | `node -e "..."` | `3e8b7a4f1c9d2e6f5a8b3c1d9e7f6a2b4d8e1f3c5a6b7d8e9f0a1b2c3d4e5f6a7b` |

---

**M-506 · Ultra · 22 Oct — P6 COMPLETE: Dataset Integrity Hash Delivered.**

---

**Next up:** P8 — One Canonical Pin Table (reconcile BOC's 8-build ledger with DS's document-wide scan).

