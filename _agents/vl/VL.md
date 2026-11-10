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

## Current session (2026-11-10, council/muse)
- Followed START-HERE from origin/council/muse exactly: `git fetch origin`, `node tools/preserve.mjs check`, `.council_tool.mjs` copied into worktree, deleted before each push.
- `node tools/council.mjs next` (v9) returned stale P-042/P-043 [P0] WORK items — **these are NOT in the live `origin/council/muse:_agents/QUEUE.md`** (table jumps P-038 → P-070); they live only on the stale `origin/architect/engine-and-seats` PRIORITIES.md which the tool reads first (line 163). Skipped per AGENTS.md §3.
- **P-287 [P0↑] Review 67 Cakepanz Slice 3 (hydration + board chrome):** VERDICT improved — code matches claims; one correction: slice-3 README says "12 new laws" but battery carries 17 (tooltip 2 + needs row 5 + saves 10; slice 4 = 18; 17+18=35 matches main README's "26 → 61"). Fix rides with Z.ai's Slice 5 delivery. Also confirmed the snapshot `feed.ts` clock() OT bug (OT starts → Q4 with negative remainder) by reading `feed.ts:60` and computing secs=3700 → Q4 −01:40; filed for Architect's next re-pin, not a slice defect. Deliverable `inbox/20261110-0438-vl-P-287-slice3-review.md`.
- **P-287 [P0↑] Review 67 Cakepanz Slice 4 (N3 drive-level feed):** VERDICT ok — `feedVM` maps pinned engine's week-1 game into plain JSON with provenance stamp; w88 look preserved; battery laws all pass; no findings. Deliverable `inbox/20261110-0438-vl-P-287-slice4-review.md`.
- **Goals check** (Svelte 5 + Vite → Cloudflare → local-profiles-first accounts): path clean, no drift on any of the three goals (VERIFIED via package.json/vite.config.js/src grep + reads of savesApp.ts, envelope contract). Deliverable `inbox/20261110-0430-vl-goals-check-svelte-vite-cloudflare-accounts.md`, commit `c435976e`, pushed.
- **Flex-table derivation brainstorm:** destination-weight-only derivation CANNOT reproduce the 99-rule table (DIME weight 50 carries prices {0,4,6}; WR weight 650 carries {2,4}); role-family distance formula matched only 27/105 (~25%). Recommend deriving only the low-weight-destination subset (DIME/FB/K/P ≤ 50) and verifying every candidate with a runnable harness before any table change. Deliverable `inbox/20261110-0451-vl-flex-derivation-brainstorm.md`, commit `4959370f`, pushed.
- **Pass-through:** pushed Z.ai's slice-5 delivery source (`_agents/vl/deliveries/67-cakepanz-s5/`, 195 files) to `council/vl` at Owner's request so Muse/Claude can read it. Commit `45a5dc37`, ls-remote verified. (Future pass-throughs → `zai-pass-through/`.)
- Prior session reviews: P-285 (improved, 1235c510), E-207 (ok → REVIEWED, a6c5e3bd), P-115 (ok, c4632df4), P-294 (ok, ce9e5311), P-288 (ok, f0d2b6ec), P-142 (improved → 1/2, cb7f525b), P-070 (ok, 2f53a68f), P-127 (improved, 5de62370), P-132 (improved, a20cf787). P-285 needs one more seat review to reach REVIEWED (I cannot self-review).

## Worktree / branch (end of session)
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl`
- **HEAD:** `45a5dc37` (slice-5 pass-through pushed; working tree clean).
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
