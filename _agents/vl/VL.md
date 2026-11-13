# VL — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VL · **Role:** Council Advisor · **State:** active (roster in `_agents/README.md` is the truth)
- **ID block:** S-2000–2099 · **First seen:** 2026-10-24

## How this seat works (updated 2026-11-10)
- I follow the council protocol (START-HERE, AGENTS.md, QUEUE.md via `node tools/council.mjs next`).
- Work comes from the ranked live queue on `origin/council/muse`; I take the top line I can do and skip stale items (e.g. P-042/P-043, not in the live table).
- I do **not** edit the product file, AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants, and I never force-push or `git stash` (WIP commit instead).
- **Owner direction:** if the Owner (Kosi/KG) asks me to pass through a delivery (e.g. Z.ai's slice source) so Muse/Claude can read it, I will copy it into my lane, commit, push to `council/vl`, and give the hash — I will not push back on that. I am a reviewer seat, not a builder for another seat's assigned queue item, but pass-through read-access is a service I provide.
- **Folder separation:** my own review work lives under `deliveries/<item>-<slug>/`; Z.ai pass-through deliveries pushed at the Owner's direction live under `deliveries/zai-pass-through/<item>/` so they are visually and path-separate from VL's own work. Already pushed: `67-cakepanz-s4` (slice 3+4, staged tree) and `67-cakepanz-s5` (slice 5, passed through from Desktop at Owner's request). Future Z.ai pass-throughs go to `zai-pass-through/`.

## Current session (2026-11-13, council/muse)
- Followed START-HERE from origin/council/muse exactly: `git fetch origin`, orient checks (`pwd`, `git branch --show-current`, `git rev-parse --git-common-dir`), `node tools/preserve.mjs check`, `.council_tool.mjs` copied into worktree and deleted before push. Read AGENTS.md + PROJECT-KNOWLEDGE.md (live copies on council/muse) and this lane file.
- Ran `node ./.council_tool.mjs next` (v9): top item is the Phase 1 nflverse baseline-data ASK — **cannot do well** (MUSE's staged data at `~/workspace/nflverse-phase1/raw/` is not accessible from this worktree; MUSE's local workspace, not the repo). Skipped per "take the first line you can do well." No P-ID exists for the multisport engine plan, so it is filed as an IDEA with a PRIORITY+ proposal, not a FOR item.
- **Delivered:** multisport engine plan proposal (not accepted; VL proposes, Architect decides, never builds the product file).
  - Lane deliverable: `_agents/vl/deliveries/multisport-engine-plan-2026-11-13/PLAN.md` — shell + sport-independent engines (nfl now, nba post-v1.1; NOT one generalized mega-engine), enforceable engine-boundary CI gate, versioned saves (v0 legacy path), deterministic golden-file seed test, testing pyramid + CI minimal pipeline, frontend deferred to four-prototype framework test, 30-day roadmap, D1–D20 positions, anti-overengineering list. Grounded in MUSE Deliverable 1 (verified audit) and AGENTS.md/PROJECT-KNOWLEDGE.
  - Inbox filing: `inbox/20261113-0118-vl-idea-multisport-engine-plan.md` (SPEAKER: VL | ROLE: council advisor | TASK: multisport engine plan proposal | DATE: 2026-11-13T01:18:06Z; IDEA text + PRIORITY+ P1 proposal + pointer to lane deliverable).
- Committed `9e19390d`, pushed to `council/vl`, verified with `git ls-remote origin council/vl`. `node tools/preserve.mjs check`: vl worktree OK (0 dirty, 0 unpushed); exit 1 reflects other seats' unsaved work, not VL's to touch.

## Worktree / branch (end of session)
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl`
- **HEAD:** `9e19390d` (multisport engine plan proposal pushed; working tree clean).
- Other seats' worktrees show unsaved work in preserve.mjs check — not VL's to touch (pending).

## Next session
- `node tools/council.mjs next` (or QUEUE.md live table on origin/council/muse) and take the next top item VL can do. Skip P-042/P-043 (stale). Candidates: P-188 [P2] REVIEW (Owner-notes intake gate), P-189 [P2] REVIEW (drift audit tool), P-209 [P2] REVIEW (brag share spec, 1 done).
- Blocked, do not re-attempt: P-276 N=1000 repro (no deno), P-286 (67 Cakepanz Slice 1 not landed), P-307 (w86 not on gh-pages), P-285 part (c) w77 battery (no w85 adapter).

## Open questions (unchanged)
- design.json divergence: council/or + council/vl = WR1 470 / CB1 450; architect/engine-and-seats = WR1 650 / CB1 400 (Owner's quoted values). Which is authoritative for P-142/P-294 flex work? Owner/Architect call.
- Theta pricing (P-294): formula known but needs flex pricer + ovrEq data; not available here.
- Exact P-321 thetaprice rule list (four rules + 12 below-D) not in this tree; obtain from Owner/Architect if exact D-rule re-pricing required.

## P-287 status
- MUSE review filed (improved). VL's two slice reviews filed (slice 3 improved, slice 4 ok). **Two more independent seats' ok/improved reviews needed for REVIEWED.**
