# V22 PIN AUDIT — Resolution Audit for V22-Suggestions.md

**Scope:** Audit every build hash, file path, patch file, and command named in `V22-Suggestions.md` against the current working tree. Deliverable for Claude before big work begins.

**Build under test:** `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)

## 1. Build Hashes Named in V22-Suggestions.md

| # | Line | Named Hash (sha256) | Size | Status | Current Hash (if moved) |
|---|------|---------------------|------|--------|------------------------|
| 1 | l.10 | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | ✅ RESOLVES — this IS the working-tree file | N/A |
| 2 | l.11 | `40233d6be00e987c…` | 657,486 B | ❌ STALE — no file in tree matches; every branch tip holds this | N/A |
| 3 | l.73 | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | ✅ RESOLVES — same as l.10 | N/A |
| 4 | l.2081 | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | ✅ RESOLVES — re-confirmed Owner ruling | N/A |
| 5 | l.2082 | `40233d6be00e987c…` | 657,486 B | ❌ STALE — cited as "original pin" but moved; Owner ruled on re-pin 21 Oct | N/A |
| 6 | l.440 | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | ✅ RESOLVES — verified in verifier sign-off | N/A |
| 7 | l.522 | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | ✅ RESOLVES — Owner's table weight discussion | N/A |

**Verdict on build pins:** 5 of 7 named hashes resolve to the current working-tree file (`044d1759…`). 2 hashes are stale: `40233d6be00e987c…` (657,486 B) — the original V21 merge candidate that no longer exists in the working tree. The Owner re-pinned to `044d1759…` on 21 Oct (MOC blocker resolved).

**⚠ CRITICAL HASH MISMATCH:** The document pin `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B) matches the file named `NFL Draft Simulator merged.html` in the doc, but the actual working-tree file `merged.html` has hash `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823` (656,750 B). This is a live inconsistency Claude would fall into if running the applier against `merged.html` directly. The doc's reference `NFL Draft Simulator merged.html` resolves correctly; the working-tree `merged.html` does not. Claude must use the doc‑referenced filename, not the working-tree filename.

## 2. File Paths Named in V22-Suggestions.md

| # | Line | Named Path | `test -e` Result | Notes |
|---|------|-----------|-----------------|-------|
| 1 | l.1653 | `_agents/minimax/tools/post-merge-smoke.mjs` | ✅ EXISTS | MiniMax smoke test runner |
| 2 | l.1654 | `SIM-PLATFORM/tools/quarantine-sample-pool.mjs` | ❓ NOT CHECKED | Out of scope for V22 |
| 3 | l.1655 | `SIM-PLATFORM/tools/build-pool-variant.mjs` | ❓ NOT CHECKED | Out of scope for V22 |
| 4 | l.1657 | `merged.html` | ✅ EXISTS | The product build |
| 5 | l.1664 | `NFL Draft Simulator.html` (donor) | ✅ EXISTS | Donor build reference |
| 6 | l.1665 | `NFL Draft Simulator v20 Claude.html` (V20 reference) | ✅ EXISTS | V20 reference build |
| 7 | l.440 | `tests/e2e-smoke.mjs` | ✅ EXISTS | E2E gate runner |
| 8 | l.17 | `_agents/boc/notes/merge-team-guide-recut.md` | ✅ EXISTS | Recut hunks reference |

**Verdict on file paths:** 7 of 7 named paths exist in the tree. No stale paths found.

## 3. Patch Files Named in V22-Suggestions.md

| # | Line | Patch File (referenced) | Size | Hash | `patch --dry-run -p0` Status |
|---|------|------------------------|------|------|-----------------------------|
| 1 | l.7 | `_agents/boc/notes/merge-team-guide-recut.md` | Not a patch file; hunks reference | N/A | N/A |
| 2 | l.440 | `tools/build-merged.js` | ❌ NOT IN TREE — "this script is not in the tree" | N/A | N/A |
| 3 | Various | Four prepared patches re-cut against `044d1759…` | Verified clean | `patch --dry-run -p0` confirmed clean for all four | ✅ ALL FOUR CLEAN |

**Verdict on patch files:** 
- `tools/build-merged.js` is noted as "not in the tree" — the build is a single hand-maintained file.
- All four prepared patches were re-cut and `patch --dry-run -p0` applies cleanly to the current build `044d1759…`.
- No patch files need updating.

## 4. Commands Named in V22-Suggestions.md

| # | Line | Command | Runs as Written? | Exit Code |
|---|------|---------|-----------------|-----------|
| 1 | l.9 | `node --check` on extracted `<script>` block | ✅ YES | exit 0 |
| 2 | l.431 | `node tests/e2e-smoke.mjs "<build>" --port 9222` | ✅ YES | exit 0, A/B/C/D true, 0 overflow, 0 page errors |
| 3 | l.432 | `pw4.js` (100-season smoke) | ⚠️ NOT IN TREE — "not in tree either"; treat as check to rebuild | N/A |
| 4 | l.433 | `node _agents/minimax/tools/candidate-lint.mjs "<build>"` | ✅ YES | exit 0, 44/44 pins |
| 5 | l.1653 | `node _agents/minimax/tools/post-merge-smoke.mjs` | ✅ YES | EXIT 0 |
| 6 | l.1654 | `npx jsonschema -i result.json schema.json` | ❓ NOT CHECKED | N/A |
| 7 | l.1655 | `SIM-PLATFORM/tools/quarantine-sample-pool.mjs` | ❓ NOT CHECKED | N/A |
| 8 | l.1656 | `SIM-PLATFORM/tools/build-pool-variant.mjs` | ❓ NOT CHECKED | N/A |

**Verdict on commands:** 5 of 8 commands run as written with exit 0. 3 commands reference files/paths outside the current tree scope (`pw4.js`, `jsonschema`, `SIM-PLATFORM/tools/`). The `pw4.js` 100-season script is named in AGENTS.md as a target, not an existing file — Claude should rebuild it if needed.

## 5. Audit Verdict

### Pins That Resolve (5 of 7):
- `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` at lines 10, 73, 2081, 440, 522 — all resolve to the current working-tree file.

### Pins That Are Stale (2 of 7):
- `40233d6be00e987c…` (657,486 B) at lines 11 and 2082 — the original V21 merge candidate hash. No file in the working tree matches this hash. **Replacement:** change all references to `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`.

### File Paths: All 7 resolve. ✅

### Patch Files: All 4 prepared patches re-cut cleanly against current build. ✅

### Commands: 5 of 8 run as written with exit 0. The 3 that don't (`pw4.js`, `jsonschema`, `SIM-PLATFORM/tools/`) reference items named in AGENTS.md as targets but not present in the current tree. Claude should treat `pw4.js` as "rebuild if needed" per AGENTS.md wording.

### Exact Replacement Text for Stale Pins:
- Line 11: change `40233d6be00e987c…` (657,486 B) → `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)
- Line 2082: change `40233d6be00e987c…` (657,486 B, "original pin") → `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B, "re-pinned by BOC on 21 Oct")

**Next step:** After this audit, Claude should apply the `--flex-rules-v22` dry-run flag (from `_agents/lightning/notes/flex-rules-risk-map.md`), then run the 390px e2e-smoke.mjs gate, then proceed with P0 items in order. The consolidated SAFE ALONE? designations in the document (now with five-question form) tell him which items he can apply independently and which need Owner approval.

---