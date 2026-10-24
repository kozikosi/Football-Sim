# P1 — LEDG/REDG Audit (BOC) — 22 Oct 2026

Build: `NFL Draft Simulator merged.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Question
Do REDG/LEDG feed any left/right math decision anywhere? (Owner: "We don't care about left or right.")

## Findings

### 1. NATURAL_SLOT_MAP (l.934)
```
REDG:['DE1','DE2'], LEDG:['DE1','DE2'],
```
Both map to the same slots. No branching.

### 2. FLEX (l.944)
```
REDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6},
```
Identical flex penalties. No branching.

### 3. _POSITION_TIER (l.983)
```
REDG:2, LEDG:2,
```
Same tier. No branching.

### 4. POS_DISPLAY (l.985)
```
REDG:'EDGE', LEDG:'EDGE',
```
Same display label. No branching.

### 5. WV_TAG_GROUP (l.1316)
```
REDG:'EDGE', LEDG:'EDGE',
```
Same tag group. No branching.

### 6. GROUP_DEFS slots (l.1372)
```
REDG:['DE1','DE2'], LEDG:['DE1','DE2'],
```
Same slot assignment. No branching.

### 7. DEFAULT_WEIGHTS (l.452)
No REDG/LEDG keys. Edge rushers are valued through DE1/DE2 slots. No branching.

### 8. Code search for branching
- `grep` for `REDG ===`, `LEDG ===`, `pos === 'REDG'`, `pos === 'LEDG'`, `case 'REDG'`, `case 'LEDG'`: **zero matches**.
- `grep` for `if (` / `else` / `switch` containing REDG/LEDG: **zero matches**.

## Verdict: VERIFIED — No left/right math anywhere

REDG and LEDG are treated identically in every code path: same slots, same flex, same tier, same display, same tag group, same GROUP_DEFS. The only difference is the player data label ("REDG" vs "LEDG" in the PLAYERS array). No valuation, weight, flex, or math branches on left-vs-right edge.

## Implication for V22
The Owner's ruling ("LEDG/REDG don't matter, we don't care about left or right") is already satisfied by the existing code. No changes needed. The unified "EDGE" display label (POS_DISPLAY, WV_TAG_GROUP) already reflects this. If Claude wishes to further unify, the PLAYER data labels could be changed to "EDGE" (data change, not math change), but this is optional.

## Also note
- GROUP_DEFS already has a unified "EDGE" team unit: `{"key":"EDGE","label":"Edge Rushers (DE1+DE2)","pos":["REDG","LEDG"],"n":2}`.
- The 2-DE structure (DE1, DE2) means there are always 2 edge slots regardless of left/right labeling.

## What was deliberately not checked
- Whether any UI text or CSS class names reference "left"/"right" for edges (cosmetic, not math).
- Whether the draft board or depth chart displays L/R labels (display-only, not math).
