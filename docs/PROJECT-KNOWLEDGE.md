# PROJECT-KNOWLEDGE.md — "20-0" (repo and files: Football Sim)

**Single writer: the Architect** (rewritten at his handover; the Owner may let a seat write it for a session; everyone else proposes changes in their bulletin entry). Initial short version written by the Architect, 23 Oct 2026; the 14 KB predecessor is `_archive/PROJECT-KNOWLEDGE-2026-10-22-beam.md` (stale: build table, duplicated rules, a second reading order). **This file states current facts only. Rules live in `AGENTS.md`; do not copy them here.**

**Nobody is assigned to anything:** one ranked list (`_agents/PRIORITIES.md`), `node tools/next.mjs`, three reviews per item (`AGENTS.md` §1, §5).

## Reading order (the only one)
See `_agents/START-OF-CHAT.md` (read from `origin/council/base`). In short: `AGENTS.md`, this file, `COUNCIL-BULLETIN.md`, `_agents/V23-OWNER-REQUESTS.md`, your lane file; then `node tools/next.mjs`.

**Council base:** `origin/council/base` (the Architect moves it; seats merge it with `git merge --no-edit origin/council/base` at chat start). Until the PR to `main` is merged this is the only correct base; never base on a task branch.

## Identity
Product shows as **20-0** (header, footer, title, copy). Repo, branches, files stay "Football Sim". Single self-contained HTML file; no paid API, no CDN, no build step for the user. Owner: Kosi. Architect: Claude. Council: advisory seats listed in `_agents/README.md` (roster, states, retired seats).

## Build truth (details in `AGENTS.md` §2 — re-measure with `sha256sum`)
Verified build **Pre-Colors**: `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B. Next build **V23** (Architect writes it). "V21"/"V22" are retired as build names. Canonical branch `claude/v21-and-council-ops` (quote the SHA from `git ls-remote`, never trust the name); `main` is behind it until the Owner approves the PR.

## Where to work
One worktree per seat, `../wt/<seat>`, branch `council/<seat>`, created by the Owner with `tools/new-seat-worktree.sh <seat>` before the chat opens (`AGENTS.md` §4). The Owner's shared tree is read-only for everyone; `core.hooksPath` unset there. Push your own `council/<seat>` branch at the end of every task and session. The old nested repo was moved to `_nested-repo-backup-2026-10-23` (Beam, REPORTED) and its content is on `beam/nested-preserve-2026-10-23`. Run `pwd` and `git branch --show-current` before reading or writing.

## Toolchain (REPORTED from Beam's machine, 22 Oct)
Biome 2.6.2 (native binary), node 22+, python, git, gh (authenticated), Mermaid via npx. Figma MCP authenticated by BOC (22 Oct): council hands the Architect palette, states and data; Architect owns the product file and the visual system. Gate: `tools/post-merge-smoke.mjs`; lint: `tools/lint.mjs` (`selftest` not yet posted by any seat: UNVERIFIED); probes: `tools/probes/`. Sessions cannot message each other; the Owner relays.

## Current state (rewrite this block each session)
- 23 Oct: deep clean. MiniMax and MOC retired (unavailable); GLM, Ultra, UK, MiMo, Glyph reinstated or admitted per the Owner's second list (`_agents/README.md`); gate moved to `tools/`; bulletin rotated (1.18 MB → 6 KB); retirement protocol in `_agents/RETIREMENT.md`.
- Owner's next product work (V23): brand 20-0 + homepage + header + player browser (15 per page, position dropdown aligned like the draft board); then colours (Owner's 22 Oct table), slots/RNG, game-logic fixes, V22 list; and a whole-site beauty and interactivity pass. The Architect holds the sequencing (`claude/00-READ-FIRST.md` in the Project).
- Open Owner decisions: PR of `claude/v21-and-council-ops` → `main`; confirm VLOC/VL and UK folder mappings; confirm GPT retired; all-time pool rules.

## If stuck
Question for the Architect or Owner → `QUESTIONS-FOR-THE-ARCHITECT.md` (≤5, each with a recommended default; the Architect forwards Owner questions). A bug: write it up for the Architect, do not fix the product file. An idea: `SUBMISSIONS.md` with exact change, blast radius and evidence.
