# VL — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VL · **Role:** Council Advisor · **State:** active (roster in `_agents/README.md` is the truth)
- **ID block:** S-2000–2099 · **First seen:** 2026-10-24

## Current session (2026-11-09, council/muse relay of Owner's P-321 question)
- Followed START-HERE from origin/council/muse exactly: `git fetch origin`, sync base (1b91f50e, up to date), preserve check (vl = 0 dirty).
- Took P-321 (slotWins20 spread question: is +/-5 right, or +/-3/+/-7, or does spread not matter?).
- Built deterministic Node harness reproducing the engine's pure math (slotWinsTable/slotWins/slotWinsPerOvr + matchupModel/teamRatings from Football-Sim-PreColors.html) and measured the MUSE local-slope proposal per slot at h = 3/5/7/10, center = position pool average from data/madden27-ratings.csv (1,941 players; means match MUSE proposal exactly).
- Deliverable: `inbox/20261109-2221-vl-P-321-slotwins20-spread.md` + harness `_agents/vl/deliveries/slotwins20-local-slope-harness.mjs`. Both committed f75ee5ee and pushed to council/vl (ls-remote verified = HEAD).
- Findings (see inbox for full table): slope is FLAT across +/-3/5/7/10 for every slot (maxDelta <= 0.0036 wins/OVR for RB2, 0.0029 for QB, ~0 otherwise; +/-10 check shows only QB mild edge curvature +2.3%). Spread does NOT materially change D (representative D deltas <= 0.15 across spreads) or measured weights (QB pinned 700; depth-spot shifts come from the baseline change, not the spread). OLD 70->90 cross-checked vs engine witness for build 40233d6be00e987c (within ~5% all slots).
- Recommendation: adopt +/-5 (any of +/-3/5/7 is equivalent); the material P-321 decision is the baseline change to per-position pool-grounded centers (re-weights depth spots WR2/WR3 up, RB2/TE2 down), not the +/-3 vs +/-5 choice.
- Prior reviews this seat delivered and pushed (unchanged): P-285 (improved, 1235c510), E-207 (ok → REVIEWED, a6c5e3bd), P-115 (ok, c4632df4), P-294 (ok, ce9e5311; theta/price gap flagged), P-288 (ok, f0d2b6ec; Colors suite 290/290), P-142 (improved → 1/2, cb7f525b). P-285 needs one more seat review to reach REVIEWED (I cannot self-review).

## Worktree / branch (end of session)
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl`
- **HEAD:** `f75ee5ee22ad1067398ce596a821bc8eb5d42a0e` · `git merge-base HEAD origin/council/base` = `1b91f50e161fa10d0607c8e09330115ffa27f1ff` (up to date)
- **Working tree:** clean (0 dirty). Pushed to origin (ls-remote verified = HEAD).
- Other seats' worktrees show unsaved work in preserve.mjs check — not VL's to touch (pending).

## Next session
- `node tools/council.mjs next` (or PRIORITIES.md live table) and take the next top item VL can do.
- Blocked, do not re-attempt: P-276 N=1000 repro (no deno), P-286 (67 Cakepanz Slice 1 not landed), P-307 (w86 not on gh-pages), P-285 part (c) w77 battery (no w85 adapter).

## Open questions
- design.json divergence: council/or + council/vl = WR1 470 / CB1 450; architect/engine-and-seats = WR1 650 / CB1 400 (Owner's quoted values). Which is authoritative for P-142/P-294 flex work? Owner/Architect call.
- Theta pricing (P-294): formula known but needs flex pricer + ovrEq data; not available here.
- Exact P-321 thetaprice rule list (four rules + 12 below-D) not in this tree; obtain from Owner/Architect if exact D-rule re-pricing required.
