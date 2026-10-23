# PROJECT-KNOWLEDGE.md — "20-0" (repo and files: Football Sim)

**Single writer: Beam** (rewrite at session end; everyone else posts to their lane file and the bulletin). Initial short version written by the Architect, 23 Oct 2026; the 14 KB predecessor is `_archive/PROJECT-KNOWLEDGE-2026-10-22-beam.md` (stale: build table, duplicated rules, a second reading order). **This file states current facts only. Rules live in `AGENTS.md`; do not copy them here.**

## Reading order (the only one)
1. `AGENTS.md` (rules, build truth §2, ownership §8). 2. This file. 3. Your lane file `_agents/<seat>/<SEAT>.md` (create from `_agents/TEMPLATE-LANE.md` if absent). 4. Tail of `COUNCIL-BULLETIN.md` (it is short; the old rounds are archived and not read by default). 5. The work order: lines 1–120 of `V22-Suggestions.md` and only the section of your item.

## Identity
Product shows as **20-0** (header, footer, title, copy). Repo, branches, files stay "Football Sim". Single self-contained HTML file; no paid API, no CDN, no build step for the user. Owner: Kosi. Architect: Claude. Council: advisory seats listed in `_agents/README.md` (roster, states, retired seats).

## Build truth (details in `AGENTS.md` §2 — re-measure with `sha256sum`)
Verified build **Pre-Colors**: `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B. Next build **V23** (Architect writes it). "V21"/"V22" are retired as build names. Canonical branch `claude/v21-and-council-ops` (quote the SHA from `git ls-remote`, never trust the name); `main` is behind it until the Owner approves the PR.

## Where to work
One worktree per seat **outside** the repo folder: `git worktree add ../wt/<seat> -b <seat>/<task> <base>` (rule: `AGENTS.md` §4.1). The Owner's shared tree is read-mostly; `core.hooksPath` unset there. `Football Sim/Football Sim` (a nested second repo on `council-intake`) is stale: do not read or write it. Run `pwd` and `git branch --show-current` before reading or writing.

## Toolchain (REPORTED from Beam's machine, 22 Oct)
Biome 2.6.2 (native binary), node 22+, python, git, gh (authenticated), Mermaid via npx. Figma MCP authenticated by BOC (22 Oct): council hands the Architect palette, states and data; Architect owns the product file and the visual system. Gate: `tools/post-merge-smoke.mjs`; lint: `tools/lint.mjs` (`selftest` not yet posted by any seat: UNVERIFIED); probes: `tools/probes/`. Sessions cannot message each other; the Owner relays.

## Current state (rewrite this block each session)
- 23 Oct: deep clean. MiniMax, MOC, GLM, Ultra, UK retired to tombstones; gate moved to `tools/`; bulletin rotated (1.18 MB → 6 KB); retirement protocol in `_agents/RETIREMENT.md`.
- Owner's next product work (V23): brand 20-0 + homepage + header + player browser (15 per page, position dropdown aligned like the draft board); then colours (Owner's 22 Oct table), slots/RNG, game-logic fixes, V22 list; and a whole-site beauty and interactivity pass. The Architect holds the sequencing (`claude/00-READ-FIRST.md` in the Project).
- Open Owner decisions: PR of `claude/v21-and-council-ops` → `main`; confirm VLOC/VL and UK folder mappings; confirm GPT retired; all-time pool rules.

## If stuck
Question for the Architect or Owner → `QUESTIONS-FOR-THE-ARCHITECT.md` (≤5, each with a recommended default; the Architect forwards Owner questions). A bug: write it up for the Architect, do not fix the product file. An idea: `SUBMISSIONS.md` with exact change, blast radius and evidence.
