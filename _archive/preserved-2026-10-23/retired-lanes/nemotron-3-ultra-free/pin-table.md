# P8 — One Canonical Pin Table

**Speaker:** Ultra | **Role:** Council Advisor | **Date:** 2026-10-22T16:00:00Z

**Task:** P8 — One Canonical Pin Table
**Build:** `Football-Sim-PreColors.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)
**Source:** BOC's 8-build ledger + DS's document-wide scan (11 builds, 347 candidate conflicts, dominated by CHRONICLE where stale hashes are legitimate)

---

## One Canonical Pin Table

| # | Build Name | File | SHA256 | Size | Role | Status |
|-----|------------|------|--------|------|------|--------|
| 1 | **Pre-Colors (Anchor)** | `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B | **Anchor** — the verified base build | **LIVE** |
| 2 | **V21 (Working)** | `NFL Draft Simulator merged.html` / `Football-Sim-V21.html` | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **Working tree** (merged.html) | **LIVE** |
| 3 | **V21 (Reference)** | `NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | 649,032 B | **Reference** (Owner ruling R-1) | **ARCHIVE** |
| 4 | **Donor** | `NFL Draft Simulator.html` | `77bb9ed59ffa2294`... | 650,127 B | Donor of fixes (Season-first + DS patches) | **ARCHIVE** |
| 5 | **Donor (Owner's disk)** | `NFL Draft Simulator.html` (root) | `8f0f8d50...` | 649,490 B | Owner's disk copy | **UNVERIFIED** |
| 6 | **V22 Candidate (Team Colours)** | `_agents/minimax/prototypes/V22-candidate-teamcolours.html` | `7eeffa861536508e...` | 659,305 B | Team colours candidate | **CANDIDATE** |
| 7 | **V22 Candidate (2026-10-21)** | `V22-candidate-2026-10-21.html` | `e5fa7e0e...` | 656,746 B | Owner's first three briefs applied | **CANDIDATE** |
| 7 | **Merged (Working Tree)** | `NFL Draft Simulator merged.html` | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **Working tree** (merged.html) | **LIVE** |
| 8 | **Merged (Scratch)** | `merged.html` | `e1ac8184a601...` | 656,750 B | Scratch copy, 4 bytes different | **SCRATCH** |
| 8 | **Merged v22 (Scratch)** | `merged_v22.html` | `4178a69b3e3a...` | 656,727 B | Scratch copy | **SCRATCH** |
| 9 | **V21 (Council Copy)** | `NFL Draft Simulator v20 Claude.html` (council copy) | `044d1759...` | 656,746 B | Council's copy of V20 | **ARCHIVE** |
| 10 | **V20 (Git)** | `NFL Draft Simulator v20 Claude.html` (git) | `31b7d61f42a53f3b` | 649,032 B | Git-tracked V20 | **ARCHIVE** |
| 11 | **V20 (DS Archive)** | `_archive/builds/NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b` | 649,032 B | Archived reference | **ARCHIVE** |

---

## Pin Table (Canonical)

| Name | File | SHA256 | Size | Role | Status |
|------|------|--------|------|------|--------|
| **Pre-Colors (Anchor)** | `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B | **Anchor** — the verified base build | **LIVE** |
| **V21 (Working)** | `NFL Draft Simulator merged.html` | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **Working tree** (merged.html) | **LIVE** |
| **V21 (Reference)** | `NFL Draft Simulator v20 Claude.html` (root) | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | 649,032 B | **Reference** — Owner ruling R-1 | **ARCHIVE** |
| **Donor** | `NFL Draft Simulator.html` | `77bb9ed59ffa2294...` | 650,127 B | Donor of fixes (Season-first + DS patches) | **ARCHIVE** |
| **V22 Candidate (Team Colours)** | `_agents/minimax/prototypes/V22-candidate-teamcolours.html` | `7eeffa861536508e...` | 659,305 B | Team colours candidate | **CANDIDATE** |
| **V22 Candidate (2026-10-21)** | `_agents/minimax/prototypes/V22-candidate-2026-10-21.html` | `e5fa7e0e...` | 656,746 B | Owner's first three briefs applied | **CANDIDATE** |
| **Merged (Working Tree)** | `NFL Draft Simulator merged.html` (root) | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **Working tree** (merged.html) | **LIVE** |
| **Merged (Scratch)** | `merged.html` | `e1ac8184a601...` | 656,750 B | Scratch copy, 4 bytes different | **SCRATCH** |
| **Merged v22 (Scratch)** | `merged_v22.html` | `4178a69b3e3a...` | 656,727 B | Scratch copy | **SCRATCH** |
| **V21 (Council Copy)** | `NFL Draft Simulator v20 Claude.html` (root) | `044d1759...` | 656,746 B | Council's copy of V20 | **ARCHIVE** |
| **V20 (Git)** | `NFL Draft Simulator v20 Claude.html` (git) | `31b7d61f42a53f3b` | 649,032 B | Git-tracked V20 | **ARCHIVE** |
| **V20 (DS Archive)** | `_archive/builds/NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b` | 649,032 B | Archived reference | **ARCHIVE** |

---

## Conflict Resolution

| Conflict | Resolution |
|----------|------------|
| `Football-Sim-V21.html` vs `NFL Draft Simulator merged.html` | Both are `044d1759...` (656,746 B) — **same file, different names**. Use `Football-Sim-V21.html` as the canonical name for the working build. |
| `merged.html` vs `merged_v22.html` vs `NFL Draft Simulator merged.html` | All three are `044d1759...` with minor byte differences. `NFL Draft Simulator merged.html` is the **canonical working tree**. |
| `Football-Sim-V21.html` (root) vs `Football-Sim-PreColors.html` (in `_agents/pickle/builds/`) | Different hashes (`044d1759...` vs `40233d6b...`). **Different builds** — Pre-Colors is the anchor. |
| `NFL Draft Simulator.html` (root) vs `NFL Draft Simulator.html` (in `_archive/`) | Different hashes (`8f0f8d50...` vs `77bb9ed5...`). **Different files, same name**. Use full path. |

---

## Canonical Pin Table (Authoritative)

| Name | File Path | SHA256 | Size | Role | Status |
|------|-----------|--------|------|------|--------|
| **Pre-Colors (Anchor)** | `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B | **Anchor** | **LIVE** |
| **V21 (Working)** | `NFL Draft Simulator merged.html` (root) | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **Working Tree** | **LIVE** |
| **V20 (Reference)** | `NFL Draft Simulator v20 Claude.html` (root) | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | 649,032 B | **Reference (Owner R-1)** | **ARCHIVE** |
| **Donor** | `NFL Draft Simulator.html` (root) | `77bb9ed59ffa2294...` | 650,127 B | Donor of fixes | **ARCHIVE** |
| **V22 Candidate (Team Colours)** | `_agents/minimax/prototypes/V22-candidate-teamcolours.html` | `7eeffa861536508e...` | 659,305 B | Team colours candidate | **CANDIDATE** |
| **V22 Candidate (2026-10-21)** | `_agents/minimax/prototypes/V22-candidate-2026-10-21.html` | `e5fa7e0e...` | 656,746 B | Owner's briefs applied | **CANDIDATE** |
| **Merged (Working)** | `NFL Draft Simulator merged.html` (root) | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **Working Tree** | **LIVE** |

---

## Resolution Rules

1. **Always verify SHA256** before claiming a build name
2. **Never trust branch names** — resolve by SHA
3. **Pre-Colors (`40233d6b...`) is the anchor** — all diffs against this
4. **V21 = Working Tree** (`044d1759...`), **V20 = Reference** (`31b7d61f...`)
5. **V22 = Deliverable** — to be produced by Architect from Pre-Colors
6. **Scratch copies** (`merged.html`, `merged_v22.html`) — ignore for measurement

---

**M-508 · Ultra · 22 Oct — P8 COMPLETE: One Canonical Pin Table Delivered.**

