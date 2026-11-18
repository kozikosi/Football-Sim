# PROJECT-KNOWLEDGE.md — 76 Pancakes (Football Sim)

**Single writer: MUSE** (council-infrastructure owner, Owner 2026-11-09). This file states current facts only. Rules live in `AGENTS.md`; do not copy them here. **The live copy is on `origin/council/muse`** — the `council/base` copy is a stale October snapshot; do not use it.

**Nobody is assigned to anything:** one ranked list (`_agents/PRIORITIES.md`, live on `origin/council/muse`), `node tools/council.mjs next` (v9, from `origin/council/muse:tools/council.mjs`), three reviews per item (`AGENTS.md` §1, §5).

## Reading order (the only one)
See `_agents/START-HERE.md` (read from `origin/council/muse`). In short: `AGENTS.md`, this file, `COUNCIL-BULLETIN.md`, your lane file; then `node tools/council.mjs next`.

## Identity
Product: **76 Pancakes** (Owner, 2026-11-05). "20-0" is the season record, not the product name. Framework: **Svelte 5 + Vite**. Public data: real player names/teams with non-EA ratings. Ratings generation is the Owner's alone, later. Owner: Kosi. Architect: Claude (product/engine only). Council infrastructure owner + queue custodian: MUSE. Executor: Z.ai. Second sport (basketball) is post-v1.1. License: MIT. Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect).

## Build truth
- **Pre-Colors** (`Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B): frozen reference build. The engine-math reference.
- **Z-post-blue waves** (`Football-Sim-Z-post-blue-wNN.html` on `origin/gh-pages`): Z.ai's single-file HTML wave series. Latest published: **w87** (dropdown house + recalculated Wins table, 1,900,033 B, md5 `bffdccac…`). Live `index.html` is w85 — a wave is "live" only when `index.html` is replaced with it (the Owner/Beam make-live step).
- **67 Cakepanz** (`67-cakepanz/` on `origin/gh-pages`, Svelte app): Z.ai's parallel Colors/UI track. Slices: 1 Draft Board (done), 2 Team Select (done, being revised per P-317 — must add a draft-position picker, slot 1–32), 3 hydration + board chrome (queued, P-316), 4 feed, 5 shareables.
- **Colors v1 (Claude's)** (`colors/` on `architect/engine-and-seats`): the Architect's tree. Cutover ships it when it is fully functioning.
- **Engine pin: `4ca9a071`.** The frozen engine snapshot every track consumes. Never edit the engine to match a UI.

## Model-first (Owner, 2026-11-08)
Weights come out of the engine's measured impact (slotWins20), not from a table. The measured Engine Value is the default display; the Owner Preset is one click away. The Nov 6 salary weights are dead. The v19 Madden weights are dead as a sim reference — judge the engine by the Owner's doctrine (corner singularity, run-stopping matters) and current engine state.

## Flex (Owner, 2026-11-09)
The flex table is the 97-rule D-picks table (19 at 12, 32 at 6, 16 at 2, 30 at 0), built by Claude at `35ce4e98`. Nine corrections are pending (EDGE cluster + snapping rules to 6, OG>C to 2; C>OG stays 6). The table lives in `tools/mathlab/flex.json` / `colors/src/sports/nfl/engine/flex.ts`.

## Calibration (Owner, 2026-11-05)
Average skilled drafter: **90% playoffs, ~35% Super Bowl appearance, 25% title**; going 20-0 about **1–2%** possible. "Skilled" = selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) every draft round. Current anchor: N=300 skilled 47% playoffs / 6% SB — the game is too hard; do not tune until the protocol is pinned at N=1000.

## Current state (rewrite this block when it changes)
- 2026-11-09: MUSE owns council infrastructure (Owner directive). `tools/council.mjs` v9 fixed (macOS /tmp silent failure, CONFIRM-as-note restoring VL's P-008 review, fetch-failure banner, `next` fallback). The live queue and docs are on `council/muse`; `council/base` is a stale ghost (last moved 2026-11-02).
- 2026-11-09: P-314 (Slice 2 review) REVIEWED ✓✓✓ (MUSE, Super, Iceman, Inkling). Slice 2 is NOT accepted as-is — P-317 (draft-position picker) waits on the Architect's store change. Z.ai Slice 3 (P-316) is queued and unblocked.
- 2026-11-09: New seats Iceman and Inkling are working. Crouton and CK are ignored indefinitely (Owner) — Crouton's model isn't working.
- 2026-11-09: The flex corrections prompt is the next Claude prompt (before guard passes, then adopt-measurement, then P-318). The retire citation was corrected (`_agents/RETIRES-CITATION-CORRECTION-2026-11-09.md`): the "Owner-approved retire (KG 2026-11-05)" citation was unverifiable; the sweep was authorized by the Owner's standing queue-hygiene directive (2026-11-03).
- Open Owner decisions: none pending on the queue — the Owner decides product direction when asked, and does not read or sweep `PRIORITIES.md` manually.

## Where to work
One worktree per seat, `../wt/<seat>`, branch `council/<seat>`, created by the Owner with `tools/new-seat-worktree.sh <seat>` before the chat opens (`AGENTS.md` §4). The Owner's shared tree is read-only for everyone. Push your own `council/<seat>` branch at the end of every task and session. Run `pwd` and `git branch --show-current` before reading or writing.

## If stuck
Question for the Architect or Owner → `QUESTIONS-FOR-THE-ARCHITECT.md` (≤5, each with a recommended default; the Architect forwards Owner questions). A question about council infrastructure, the queue, or the tool → tell MUSE in your bulletin entry. A bug: write it up for the Architect, do not fix the product file. An idea: `SUBMISSIONS.md` with exact change, blast radius and evidence.
