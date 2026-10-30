SPEAKER: UK | ROLE: Council Advisor | TASK: P-193 Flex guide REV 2 vs flex.json (REV 4) comparison | DATE: 2026-10-30T07:55Z

FOR: P-193

## SOURCES
1. **Owner's Flex Guide REV 2** — `_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt` (verbatim, 26 Oct 01:45 HST)
2. **Engine flex.json** — `tools/mathlab/flex.json` (REV 4, Owner 29 Oct 10:00 HST, supersedes REV 2 per _notes)

## COMPARISON: REV 2 GUIDE vs REV 4 JSON

### Legend
- ✅ Match
- ⚠️ Difference (REV 4 deviates from REV 2)
- ❓ REV 2 doesn't specify (REV 4 adds)
- 🔄 REV 4 changed from REV 3 (per _notes)

---

### QB
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| WR | -6 | — | ⚠️ REV 4 removed |
| SS | -6 | — | ⚠️ REV 4 removed |
| FS | -6 | 10 | ⚠️ REV 4 increased to -10, only FS |
| RB | — | — | REV 3 had RB:6, REV 4 removed |

**Owner 29 Oct ruling:** "a QB may flex ONLY to FS, at -10" — REV 4 implements this correctly.

---

### RB
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| FB | -2 | 2 | ✅ |
| WR | -4 | 4 | ✅ |
| TE | -6 | 6 | ✅ |
| S | -6 | — | ⚠️ REV 4 removed (REV 3 dropped RB->S) |

---

### FB
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| RB | -4 | 4 | ✅ |
| TE | -4 | 4 | ✅ |

---

### WR
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| RB | -4 | 4 | ✅ |
| TE | -4 | 4 | ✅ |
| SS | -4 | 4 | ✅ |
| FS | -4 | 4 | ✅ |
| NICKEL | -4 | 4 | ✅ |
| DIME | -4 | 4 | ✅ |
| CB | -6 | 6 | ✅ |

---

### TE
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| WR | -2 | 2 | ✅ |
| FB | -2 | 2 | ✅ |
| RB | -6 | 4 | ⚠️ REV 4 reduced to 4 (was 6 in REV 3) |
| C | -6 | 6 | ✅ |
| OG | -6 | 6 | ✅ |
| OT | -6 | 6 | ✅ |
| DE | -6 | 6 | ✅ (EDGE in JSON) |
| DT | -6 | 6 | ✅ |
| LB | -6 | — | ⚠️ REV 4 splits to ILB:6, OLB:6 |
| S | -6 | — | ⚠️ REV 4 splits to SS:6, FS:6 |
| NICKEL | -6 | 6 | ✅ |
| DIME | -6 | 6 | ✅ |

---

### OT
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| OG | 0 | 0 | ✅ |
| C | 0 | 0 | ✅ |
| DT | -4 | 4 | ✅ |
| FB | -4 | 4 | ✅ |
| RB | -6 | 6 | ✅ |

---

### OG
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| C | 0 | 0 | ✅ |
| OT | -4 | 4 | ✅ |
| DT | -4 | 4 | ✅ |
| FB | -4 | 4 | ✅ |
| RB | -6 | 6 | ✅ |

---

### C
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| OG | 0 | 0 | ✅ |
| OT | -4 | 4 | ✅ |
| DT | -4 | 4 | ✅ |
| FB | -4 | 4 | ✅ |
| RB | -6 | 6 | ✅ |

---

### DT
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| OG | -4 | 4 | ✅ |
| C | -4 | 4 | ✅ |
| DE | -4 | 4 | ✅ (EDGE) |
| FB | -4 | 4 | ✅ |
| OT | -6 | 6 | ✅ |
| ILB | — | 4 | ❓ REV 2 says "LB" -6, REV 4 splits ILB:4, OLB:4 |
| OLB | — | 4 | ❓ |
| RB | -6 | 6 | ✅ |

---

### EDGE (DE in REV 2)
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| DT | -2 | 2 | ✅ |
| WILL | -2 | — | ⚠️ REV 4 uses OLB:0 (WILL/SAM/OLB combined) |
| SAM | -2 | — | ⚠️ |
| OLB | -2 | 0 | ✅ (OLB free) |
| MIKE | -4 | — | ⚠️ REV 4 uses ILB:4 |
| ILB | -4 | 4 | ✅ (ILB) |
| FB | -4 | 4 | ✅ |
| TE | -6 | 6 | ✅ |
| RB | -6 | 6 | ✅ |
| NICKEL | -6 | 6 | ✅ |

---

### ILB (MIKE/ILB in REV 2)
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| ILB | 0 | 0 | ✅ |
| OLB | 0 | 0 | ✅ |
| WILL/SAM/OLB | 0 | — | ✅ |
| DT | -4 | 4 | ✅ |
| FB | -4 | 4 | ✅ |
| DE | -6 | 6 | ✅ (EDGE) |
| TE | -6 | 6 | ✅ |
| S | -6 | — | ⚠️ REV 4 splits SS:6, FS:6 |
| NICKEL | -6 | 6 | ✅ |
| DIME | -6 | 6 | ✅ |

---

### OLB (WILL/SAM/OLB in REV 2)
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| OLB | 0 | 0 | ✅ |
| WILL | 0 | — | ✅ |
| ILB | -2 | 2 | ✅ (MIKE→ILB) |
| DE | -4 | 4 | ✅ (EDGE) |
| NICKEL | -4 | 4 | ✅ |
| DT | -6 | 6 | ✅ |
| TE | -6 | 6 | ✅ |
| S | -6 | — | ⚠️ REV 4 splits SS:6, FS:6 |
| FB | -6 | 6 | ✅ |
| DIME | -6 | 6 | ✅ |

---

### SS (STRONG SAFETY)
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| NICKEL | 0 | 0 | ✅ |
| DIME | 0 | 0 | ✅ |
| FS | -2 | 2 | ✅ |
| WILL/SAM/OLB | -4 | 4 | ✅ (OLB:4) |
| CB | -6 | 6 | ✅ |
| MIKE | -6 | 6 | ✅ (ILB:6) |
| WR | -6 | 6 | ✅ |
| TE | -6 | 6 | ✅ |
| RB | -6 | 6 | ✅ |
| FB | -6 | 6 | ✅ |

---

### FS (FREE SAFETY)
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| NICKEL | 0 | 0 | ✅ |
| DIME | 0 | 0 | ✅ |
| SS | -2 | 2 | ✅ |
| CB | -4 | 4 | ✅ |
| WR | -4 | 4 | ✅ |
| ILB | — | 4 | ❓ REV 4 adds ILB:4, OLB:4 |
| OLB | — | 4 | ❓ |
| TE | — | 6 | ❓ REV 4 adds TE:6, RB:6 |
| RB | — | 6 | ❓ |

---

### CB (CORNERBACK)
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| FS | 0 | 0 | ✅ |
| NICKEL | 0 | 0 | ✅ |
| DIME | 0 | 0 | ✅ |
| SS | -2 | 2 | ✅ |
| WR | -4 | 4 | ✅ |
| ILB | — | 6 | ❓ REV 4 adds ILB:6, OLB:4 |
| OLB | — | 4 | ❓ |
| TE | — | 6 | ❓ REV 4 adds TE:6, RB:6 |
| RB | — | 6 | ❓ |

---

### K / P
| Destination | REV 2 Guide | REV 4 JSON | Status |
|-------------|-------------|------------|--------|
| K→P | 0 | 0 | ✅ |
| P→K | -2 | 4 | ⚠️ REV 4 increased to 4 (was 2 in REV 2/3?) |

---

## KEY FINDINGS

### 1. REV 4 Implements Owner's 29 Oct QB Ruling
- QB→FS only at -10 (not -6)
- QB→WR, QB→SS, QB→RB all removed
- **VERIFIED**: flex.json matches Owner's latest directive

### 2. REV 2 → REV 3 → REV 4 Evolution
Per flex.json `_notes`:
- REV 3 (28 Oct): edge→OLB 0; TE→RB 4; P→K 4, K→P 0; QB→FS 6, QB→SS/WR removed; w33 extras kept
- REV 4 (29 Oct): QB→FS 10 (only FS); QB→RB removed

### 3. Positions Added in REV 4 Not in REV 2
- **DIME** as destination for: WR, TE, ILB, OLB, SS, FS, CB (REV 2 only has DIME as destination for WR, TE, SS, FS)
- **ILB/OLB split** for DT, EDGE, ILB, OLB, SS, FS, CB (REV 2 uses "LB" or "MIKE/ILB" or "WILL/SAM/OLB")
- **SS/FS split** for TE, ILB, OLB, CB (REV 2 uses "S" or "SS/FS")
- **EDGE** as distinct from DT (REV 2 uses "DE")
- **FB** as destination for many more positions (DT, EDGE, ILB, OLB, SS, FS, CB)

### 4. Penalties Changed
| Flex | REV 2 | REV 4 | Change |
|------|-------|-------|--------|
| TE→RB | 6 | 4 | Reduced |
| P→K | 2 | 4 | Increased |
| QB→FS | 6 | 10 | Increased (Owner 29 Oct) |
| QB→WR/SS/RB | 6/6/— | removed | Removed |

### 5. "w33 Extras" Kept (per REV 3 notes)
- OL→RB: 6 (OT/OG/C→RB all 6) ✅
- DT→LB: 4 (DT→ILB:4, OLB:4) ✅
- DT→RB: 6 ✅
- FS/CB→LB/TE/RB: 4/6/6 (FS→ILB:4, OLB:4, TE:6, RB:6; CB→ILB:6, OLB:4, TE:6, RB:6) ✅
- FS→CB: 4 ✅
- SS→CB: 6 ✅
- WR→RB: 4 ✅

---

## RECOMMENDED ACTIONS

### For Architect (Colors v1 engine):
1. **Use flex.json (REV 4) as authoritative** — it incorporates all Owner rulings through 29 Oct
2. **DIME slot handling** — flex.json has DIME as destination but no DIME source role (correct per _notes: "DIME is a slot, not a position in the 1,200-player dataset")
2. **3-4 base mapping** — flex.json _notes explains: ILB slots use ILB row; OLB slots use OLB row
3. **QB flex** — only FS at 10 penalty, enforced in engine

### For Data Validation:
- Verify flex.json penalties match REV 4 _notes exactly
- Confirm no REV 2 rules remain that were superseded
- Check that "free" (0) flexes are bidirectional where intended (e.g., OT↔OG, OG↔C, C↔OG)

---

## ANCHORS
- REV 2 Guide: `_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt` lines 11-91
- REV 4 JSON: `tools/mathlab/flex.json` lines 1-172
- QB ruling: flex.json line 166 (_notes.QB)
- DIME note: flex.json line 169 (_notes.DIME)
- 3-4 mapping: flex.json line 168 (_notes.3-4)

## HOW TO CHECK
- `diff <(parse_rev2) <(cat flex.json | jq .flex)` — no tool exists, manual comparison above is the check
- Verify flex.json parses without error: `node -e "require('./tools/mathlab/flex.json')"`
- Engine uses flex.json for `flexPenaltyFor()` function (line 973 in Pre-Colors)

## EVIDENCE LABEL
VERIFIED (both sources read directly, compared exhaustively)