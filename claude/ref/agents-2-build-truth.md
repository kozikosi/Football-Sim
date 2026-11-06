# AGENTS ref §2 — Build truth (loaded on demand; core is AGENTS.md)

**Two histories exist (VERIFIED 25 Oct).** `council/base` and every seat branch descend from root commit `474eb52`; `origin/main` descends from a different root `268fd56` and holds what the Owner pushes directly (Z.ai's package in `z-core/`, the logo folders, `CLAUDE-START-HERE.md`). They do not merge cleanly into each other. Read `main` files with `git show origin/main:<path>` (never merge or check out `main` in a seat worktree). The Architect will reconcile the two with one deliberate unrelated-histories merge when Colors v1 ships; the Owner need do nothing now.

**Status note (6 Nov 2026).** The product is the `colors/` app, not a single HTML file; the `Football-Sim-*.html` rows below are frozen references and history. A name is bound to one sha256. If the bytes differ, it is not that build.

| Name | File | sha256 (first 16) | Bytes | State |
|---|---|---|---|---|
| **Pre-Colors** | `Football-Sim-PreColors.html` | `40233d6be00e987c` | 657,486 | **Frozen reference build** (INFERRED from the 6 Nov NOW.md: the engine is measured against it; it is no longer the shipping product). Historically \"the current verified build\". Every anchor, patch and gate starts here. Rebuildable: `node tools/build-merged.js "<v20>" "<donor>" out.html` (inputs in `_archive/builds/`). |
| **Colors v1** | `colors/` (Svelte 5 + TypeScript, Vite; `colors/package.json`, VERIFIED 6 Nov) | — | — | **The product.** The source tree at a commit is the truth, not a file hash. Test: `cd colors && npm test`; type-check: `npx tsc --noEmit` (needs typescript, see NOW.md); build: `npm run build`. There is no `Football-Sim-Colors-v1.html`. |
| V20 | `_archive/builds/NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b` | 649,032 | Archived reference (re-measured 22 Oct from the file in git). |
| Donor | `_archive/builds/NFL Draft Simulator.html` | `77bb9ed59ffa2294` | 650,127 | Archived. The Owner's disk copy of this name has been reported as `8f0f8d50…` (649,490 B): two different files under one name, UNKNOWN which carries which patches. Irrelevant for new work, because Pre-Colors already contains the patches. |
| "V21" (council copy) | — | `044d1759…` | 656,746 | **Retired name, not a build.** An unverified modified copy (hand edit changes model output). Findings measured against it are `REPORTED` until re-anchored to Pre-Colors. |
| **Z-post-blue** | — | — | — | Z.ai's working copy, formerly labelled "Football-Sim-V23.html" anywhere it appears. **Not a build**: `REPORTED` until diffed against Pre-Colors; only the Architect's file may be called V23. |
| "V22" | — | — | — | **Retired as a build name.** It survives only as the title of the work order (`V22-Suggestions.md`) and in lane file names such as `V22-candidate-*`. Those candidates were built on the council copy, not on Pre-Colors. |

Never call a build by another name, never create a "merged", "final" or dated copy in the root; candidates live in a lane and are named `<seat>-<what>-<date>`. A note that quotes a hash says which file and when it was measured; re-measure with `sha256sum` before relying on one. Anything not built by the Architect is `REPORTED` until diffed against Pre-Colors.

