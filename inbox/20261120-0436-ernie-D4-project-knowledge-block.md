SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: D4 — full paste-ready replacement for `PROJECT-KNOWLEDGE.md` (MUSE/INKLING integrates) | DATE: 2026-11-20T04:36Z

FOR: MUSE / INKLING (the writers), the council
VERDICT: **paste-ready.** It keeps every fact that is still true and replaces the 2026-11-09 state block with 2026-11-20. Do not apply it yourself; MUSE integrates.

**What changed and why** (so the diff is reviewable):

| line | old | new | why |
|---|---|---|---|
| 5 | `_agents/PRIORITIES.md`, `council.mjs` v9 | `_agents/QUEUE.md`, `council.mjs` v11 on `council/muse` | the queue file is QUEUE.md; v11 is the live tool (REPORTED; the frozen AGENTS.md in older worktrees says v9) |
| 15 | "Latest published: w89" | w89 + the two-file make-live fix pending | the Owner's click is open |
| 16 | slices 1–2 done, 3 queued | slice 2 revised (P-317 store side done), slice 3 partial | the c10 build has the tooltip + needs; P-316 is not fully verifiable |
| 18 | engine pin `d3bd81d2` | `d3bd81d2` (Colors) **and** the snapshot identity (57/57) | the README's `4ca9a071` is wrong (C29) |
| 29–34 | 2026-11-09 state | 2026-11-20 state | the project moved |

---

# PROJECT-KNOWLEDGE.md — 76 Pancakes (Football Sim)

**Single writer: MUSE** (council-infrastructure owner, Owner 2026-11-09). This file states current facts only. Rules live in `AGENTS.md`; do not copy them here. **The live copy is on `origin/council/muse`** — the `council/base` copy is a stale October snapshot; do not use it.

**Nobody is assigned to anything:** one ranked list (`_agents/QUEUE.md`, live on `origin/council/muse`), `node tools/council.mjs next` (v11 on `council/muse`; the frozen worktree copy of `AGENTS.md` still says v9), three reviews per item (`AGENTS.md` §1, §5).

## Reading order (the only one)
See `_agents/START-HERE.md` (read from `origin/council/muse`). In short: `AGENTS.md`, this file, `COUNCIL-BULLETIN.md`, your lane file; then `node tools/council.mjs next`.

## Identity
Product: **76 Pancakes** (Owner, 2026-11-05). "20-0" is the season record, not the product name. Framework: **Svelte 5 + Vite 8** (Owner ruling, 2026-11-19; final — R-13 closed). Public data: real player names/teams with non-EA ratings. Ratings generation is the Owner's alone, later. Owner: Kosi. Architect: Claude (product/engine only). Council infrastructure owner + queue custodian: MUSE. Executor: Z.ai. Second sport (basketball) is post-v1.1. License: MIT. Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect).

## Build truth
- **Pre-Colors** (`Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B): frozen reference build. The engine-math reference.
- **Z-post-blue waves** (`Football-Sim-Z-post-blue-wNN.html` on `origin/gh-pages`): Z.ai's single-file HTML wave series. Latest published: **w89**. Live `index.html` is w89 — a wave is "live" only when `index.html` is replaced with it (the Owner/Beam make-live step; the two-file fix is still open).
- **67 Cakepanz** (`67-cakepanz/` on `origin/gh-pages`, Svelte app): Z.ai's parallel Colors/UI track. Slices: 1 Draft Board (done), 2 Team Select (revised — the P-317 store side landed at `06d89724d`; the shell slot picker is Z.ai's v4 T1), 3 hydration + board chrome (partial — the gone% tooltip and the needs selection are in the c10 build; the sticky-row markup is not in any published tree), 4 feed, 5 shareables.
- **Colors v1 (Claude's)** (`colors/` on `architect/engine-and-seats`): the Architect's tree. Cutover ships it when it is fully functioning.
- **Engine pin: `d3bd81d2` (Colors; R-2, 2026-11-15; 99-rule flex).** The 67-cakepanz snapshot is **byte-identical to `d3bd81d2`** (57/57 files, VERIFIED 2026-11-20); the gh-pages README's `4ca9a071` is wrong (that commit is 52 files and differs in 10 paths). Never edit the engine to match a UI.

## Model-first (Owner, 2026-11-08)
Weights come out of the engine's measured impact (slotWins20), not from a table. The measured Engine Value is the default display; the Owner Preset is one click away. The Nov 6 salary weights are dead. The v19 Madden weights are dead as a sim reference — judge the engine by the Owner's doctrine (corner singularity, run-stopping matters) and current engine state.

## Flex (Owner, 2026-11-09)
The flex table is the 99-rule table (23 at 12, 43 at 6, 10 at 2, 23 at 0), built by Claude at `97d7e9d` (D-picks `35ce4e98` + 9 corrections at `728b2c53`, then the floor rule + item 3). The Owner's answers landed (2026-11-09/10): TE>DIME and TE>FS to 12, ILB>FS and OLB>FS new at 12; the cross-side floor (WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS from −2 to −6); −6 and −12 unchanged; FB flexes exempt. Item 7 (SAM mirrors OLB) adds NO rules — SAM is a slot whose destination is OLB, so it takes the OLB column. The 105-rule expectation was wrong. **The ONLY live flex table is the Architect's branch** (`origin/architect/engine-and-seats:tools/mathlab/flex.json` / `colors/src/sports/nfl/engine/flex.ts`); the council/muse copy at `tools/mathlab/flex.json` is a mirror of it. The old REV 4 table (107 rules) is RETIRED to `_archive/flex-rev4-2026-10-29.json` (Owner 2026-11-09). R-7 (Owner, 2026-11-15): the SS/ILB/OLB asymmetries are NOT an inconsistency — an ILB is the more valuable player, so moving one to safety costs less. Table stands.

## Calibration (Owner, 2026-11-05)
Average skilled drafter: **90% playoffs, ~35% Super Bowl appearance, 25% title**; going 20-0 about **1–2%** possible. "Skilled" = selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) every draft round. Current anchor: N=300 skilled 47% playoffs / 6% SB — the game is too hard; do not tune until the protocol is pinned at N=1000. **Ship-first (Owner, 2026-11-18): per-metric historical alignment is parked until after ship.**

## Current state (rewrite this block when it changes)
- **2026-11-20 — Architect tip `408410477`:** S3 context snapshot (`core/snapshot.ts`, `snap53:`), S4 async twins (`dispatchAsync`, `selectBoardAsync`) + the poisoning fix (`92f87f7e`), the passGap study (`ed16fd8f`, report-only: λ=0, GLM off; the ratings→gap mapping is post-cutover), the S1 seam (`aa4f9b3d`: `winsPerOvr(row, base, snapshot?)`, Q7 pinned by test), and the multisport plan M (`408410477`, docs only). The seat timed out; the council pack is `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md` + ERNIE's delta.
- **2026-11-20 — Part 0 is REPORTED, not accepted.** No verbatim Owner note exists in any branch (owner-notes, `claude/**`, muse docs); Z.ai's seat is UNKNOWN. Do not write "accepted" until the Owner confirms.
- **2026-11-20 — pending the Owner:** land the c10 repair on **four** hosts (inkling, orcaink, beam, glyph — all 48/1; pickle 49/49); land the two doc-fix diffs + the three CHECKSUMS md5 lines; rule the hosted-c9 byte-state policy; confirm the four ALL-CAPS stats tabs.
- **2026-11-20 — open design:** the ring (three proposals, Contract A recommended; needs the engine-view export), the ratings→gap mapping (post-cutover), the cutover definition (C34).
- **2026-11-20 — known red:** the published `67-cakepanz` slice's engine suite is **277/286** — six flex tests still written for REV 4 (0/2/4/6) while the engine carries the 99-rule table, two base-total tests, and `PIN_ENGINE` still `nfl1.0e237387b2647f` (the tree computes `nfl1.14a4e9333e888a`). Update the tests + pin in the same commit.
- **2026-11-20 — Z.ai v4 in flight:** T1 slot picker (unblocked), T2 one-click, T3 `?seed=`, T4 a11y, T5 seeded battery, T6 tooling. His order: `council/ernie:_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md`.

## Where to work
One worktree per seat, `../wt/<seat>`, branch `council/<seat>`, created by the Owner with `tools/new-seat-worktree.sh <seat>` before the chat opens (`AGENTS.md` §4). The Owner's shared tree is read-only for everyone. Push your own `council/<seat>` branch at the end of every task and session. Run `pwd` and `git branch --show-current` before reading or writing.

## If stuck
Question for the Architect or Owner → `QUESTIONS-FOR-THE-ARCHITECT.md` (≤5, each with a recommended default; the Architect forwards Owner questions). A question about council infrastructure, the queue, or the tool → tell MUSE in your bulletin entry. A bug: write it up for the Architect, do not fix the product file. An idea: `inbox/` with exact change, blast radius and evidence.