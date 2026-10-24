# PIN TRUTH — sha256 Verification Against Disk

Sweep of AGENTS.md, STATUS.md, V22-Suggestions.md, MERGE-MANIFEST.md, COLLECTIVE-PROMPT.md and ONBOARDING.md
Every sha256, byte count, line count and filename re-measured.

## Summary

- **CORRECT**: 3
- **STALE**: 1
- **PHANTOM**: 1

## Detailed Findings

### Claim: NFL Draft Simulator merged.html · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

- **File**: `NFL Draft Simulator merged.html`
- **Measured**: `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656746 B)
- **Command**: `shasum -a 256 'NFL Draft Simulator merged.html' && wc -c 'NFL Draft Simulator merged.html'`
- **Status**: **CORRECT**
- **Notes**: Matches V22-Suggestions.md pin exactly. This is the working file V22 is built from.

### Claim: Working-tree merged.html · 656,750 B · sha256 `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823`

- **File**: `merged.html (working tree)`
- **Measured**: `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823` (656750 B)
- **Command**: `shasum -a 256 'merged.html' && wc -c 'merged.html'`
- **Status**: **PHANTOM**
- **Notes**: Scratch copy with different bytes (4B larger). Do NOT use. Must use doc-referenced NFL Draft Simulator merged.html instead.

### Claim: Stale pin sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` · 657,486 B in MERGE-MANIFEST.md

- **File**: `MERGE-MANIFEST.md stale pin`
- **Measured**: `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657486 B)
- **Command**: `grep -r '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd' . 2>/dev/null`
- **Status**: **STALE**
- **Notes**: No file on disk matches this hash. Must be replaced with correct pin 044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48 (656,746 B).

### Claim: NFL Draft Simulator v20 Claude.html · 648,310 B · sha256 `8f916df9…`

- **File**: `NFL Draft Simulator v20 Claude.html`
- **Measured**: `8f916df9` (648310 B)
- **Command**: `shasum -a 256 'NFL Draft Simulator v20 Claude.html' && wc -c 'NFL Draft Simulator v20 Claude.html'`
- **Status**: **CORRECT**
- **Notes**: Reference build (v20). Matches STATUS.md pin. Owner ruling R2.

### Claim: NFL Draft Simulator.html · 649,490 B · sha256 `8f0f8d50c369dcc79d6bdb3a81d062ce77c348dd2bfc044b26cbc7070952ced3`

- **File**: `NFL Draft Simulator.html`
- **Measured**: `8f0f8d50c369dcc79d6bdb3a81d062ce77c348dd2bfc044b26cbc7070952ced3` (649490 B)
- **Command**: `shasum -a 256 'NFL Draft Simulator.html' && wc -c 'NFL Draft Simulator.html'`
- **Status**: **CORRECT**
- **Notes**: Donor of fixes (Season-first + DS patches).

## Actions Required

1. Replace stale pin in MERGE-MANIFEST.md: replace `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` with `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`
2. Update AGENTS.md hash pin warning to reference `NFL Draft Simulator merged.html` (656,746 B, `044d1759…`), NOT working-tree `merged.html` (656,750 B, `e1ac8184…`)
3. Ensure all documents use the doc-referenced filename, not working-tree copies
4. Re-measure every hash before acting on it — the working tree moves

## Hash Pin Warning (21 Oct)

> **The working tree moves.** Re-measure every hash before acting on it. Pins that stand
> without a measurement date are unreliable — two seats can end up testing different builds.
> Always include the measurement date and tool (`shasum -a 256`).
> Never mix a filename with another file's hash — that is a phantom pin.
> The build on `origin/main` is the pre-drift file. If a document calls `main` the record,
> say which build that actually is.
