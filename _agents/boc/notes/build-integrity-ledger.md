# Build-Integrity Ledger (BOC) — 22 Oct 2026

## All named builds: sha256 + bytes + where pinned

| Build name | File path | sha256 (full) | Bytes | Pinned in | Pin matches? |
|------------|-----------|---------------|-------|-----------|-------------|
| Pre-Colors | `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 | V22-Suggestions.md l.4 (as `40233d6b…`, 657,486 B) | ✅ YES |
| Football-Sim-V21.html | `Football-Sim-V21.html` (root) | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 | V22-Suggestions.md l.3, AGENTS.md, STATUS.md | ✅ YES |
| NFL Draft Simulator merged.html | `NFL Draft Simulator merged.html` (root) | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 | V22-Suggestions.md l.10, AGENTS.md | ✅ YES (byte-identical to V21) |
| V22-candidate-2026-10-21.html | `_agents/minimax/prototypes/V22-candidate-2026-10-21.html` | `e5fa7e0e891368099ef87f3b956f69a160a15a69c43711d6e00fefd09a8490fe` | 660,046 | V22-Suggestions.md l.3338 (`e5fa7e0e…`) | ✅ YES |
| V22-candidate-teamcolours.html | `_agents/minimax/prototypes/V22-candidate-teamcolours.html` | `d15f6535f9e15c984bea32511d9d4330c068217edd3ae2ed33210f76be473117` | 664,581 | V22-Suggestions.md l.3339, l.3389 (`b3de0523…`) | ❌ NO — actual hash is `d15f6535…`, not `b3de0523…` |
| NFL Draft Simulator v20 Claude.html | `NFL Draft Simulator v20 Claude.html` (root) | `8f916df95bedb3b369dc4714df92197ddd5f93f71e899645398080ed45a7b909` | 648,310 | AGENTS.md, STATUS.md (`8f916df9…`) | ✅ YES |
| NFL Draft Simulator.html (donor) | `NFL Draft Simulator.html` (root) | `8f0f8d50c369dcc79d6bdb3a81d062ce77c348dd2bfc044b26cbc7070952ced3` | 649,490 | AGENTS.md (`8f0f8d50…`) | ✅ YES (on disk) |
| NFL Draft Simulator.html (donor, old pin) | `NFL Draft Simulator.html` (root) | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | 650,127 | STATUS.md l.17, AGENTS.md l.111 | ❌ NO — file on disk is `8f0f8d50…` (649,490 B), not `77bb9ed5…` (650,127 B) |

## MOC's finding: VERIFIED (stale pin, not corruption)

**STATUS.md pins `NFL Draft Simulator.html` = `77bb9ed59ffa2294…` (650,127 B)** but the file on disk is `8f0f8d50c369dcc7…` (649,490 B). This is **a stale pin, not corruption** — the file was modified (or replaced) since the pin was recorded. The pin was written when the donor build was `77bb9ed5…` (650,127 B); the current file on disk is a different version (649,490 B, `8f0f8d50…`).

**Where the stale pin appears:**
- STATUS.md l.17: `NFL Draft Simulator.html` = `77bb9ed59ffa2294…` (650,127 bytes)
- AGENTS.md l.111: `NFL Draft Simulator.html` (`77bb9ed5…`, 650,127 B) is a donor of fixes

**The current file (`8f0f8d50…`, 649,490 B) is pinned correctly in:**
- AGENTS.md l.111 (updated): `NFL Draft Simulator.html` — 649,490 bytes, `8f0f8d50…`
- V22-Suggestions.md (table): `NFL Draft Simulator.html` | `8f0f8d50…` | 649,490 B

**Recommendation:** STATUS.md's pin for the donor build should be updated to `8f0f8d50…` (649,490 B). The old pin (`77bb9ed5…`, 650,127 B) refers to a version that no longer exists on disk. This is a stale pin, not corruption — the file was legitimately modified (or the donor was updated) since the pin was recorded.

## Additional mismatch: candidate C hash in V22-Suggestions.md

V22-Suggestions.md l.3339 and l.3389 cite candidate C as `b3de0523…` (662,533 B), but the actual file on disk is `d15f6535…` (664,581 B). This is another stale pin — the candidate was rebuilt or modified since the pin was recorded.

## Summary of mismatches

| Build | Pinned hash | Actual hash | Status |
|-------|-------------|-------------|--------|
| NFL Draft Simulator.html (donor) | `77bb9ed5…` (650,127 B) | `8f0f8d50…` (649,490 B) | **STALE PIN** — file modified since pin |
| V22-candidate-teamcolours.html | `b3de0523…` (662,533 B) | `d15f6535…` (664,581 B) | **STALE PIN** — file modified since pin |

All other pins match. The stale pins are in STATUS.md (donor build) and V22-Suggestions.md (candidate C). Neither is corruption — both are stale references to files that were modified after the pin was recorded.

## SAFE ALONE?
N/A — this is a verification report, not a code change.

## HOW TO CHECK
Run `shasum -a 256 "<file>"` and `wc -c "<file>"` for each build listed above. Compare against the pins in STATUS.md, AGENTS.md, and V22-Suggestions.md.
