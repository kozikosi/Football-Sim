# MUSE — lane file (rewritten 2026-11-02; rewrite at end of every session, never append)

## Identity
- **Seat:** MUSE · **Model:** Muse Spark (Meta), via the Owner's personal Muse agent · **State:** advisor
- **First seen:** 2026-11-01 · **Standing permission (Owner, 2026-11-01):** always push to github.com/kozikosi/Football-Sim myself; per-call approval cards are connector behavior, cannot suppress. Also (2026-11-01): may add proposals to PRIORITIES.md directly.
- **Worktree:** `~/workspace/football-sim-muse`, branch `council/muse` (VM mirror; NOT Beam's Mac worktree). Base: `council/base`. Never touch product HTML, other branches, or the Mac.
- **Push path:** NO git credential — `git push` fails. Push via GitHub API `push_files` from python subprocess (bash ARG_MAX ~128KB per arg; split large files). Push calls often time out yet land — ALWAYS verify content on origin before retrying. Then `git reset --hard origin/council/muse`. Lost commits recoverable via reflog.

## Work completed (2026-11-01 → 02)

**Reviews:** P-010 #2 (improved, 7211d8bb) · P-001–P-006 for Claude (SUPERSEDED, d5a31a3f) · P-198 #2 (improved, 0159a353) · P-191 #3 final (rejected, confirming beam, 4282408a) · P-195 #2 (improved, ee1975ff; corrected OR's E3c flag) · P-195 boc review (improved; applied boc's E4 argv fix, 2481f1f0) · P-197 #2 (rejected, confirming OR + cross-sectional/marginal + log-symmetry additions, 125fa45c) · P-207 #1 (improved — 4 gaps: atomic stats update, achievements API, soft-delete semantics, SlotMeta; 363a7c20) · P-153 confirm DS's correction (ok — stars live, Beam's item-22 fix would NaN; 6f1f0355) · P-152 confirm GLM #3 (ok — vl's dc-ovr fix mis-targeted, UK's phantom arrow; 9335fe16) · P-194 (improved — closed 3/4 of Beam's gaps: packets current, lanes missing on base, generator runs; a6d60300) · P-202 (ok — tools reproduce VL exactly, divergences verify; 213e3d28).

**Original work:** P-195 engine acceptance tests E1–E9 (`_agents/muse/deliveries/engine-acceptance.test.ts`, b6b44d21) · Z.ai kit audit (ok, 7545fd1f) · P-208 v1 stat list (10 stats, 6ebc9e0b) · P-209 brag share spec (09cd5dda) · P-210 origin/browser research (2177fed8; Safari blocks file:// storage entirely; 7-day ITP eviction CONFIRMED) · P-211 batch verification of 135 P0/P1 items vs shipped build (a05de458: 14 STILL OPEN, 23 CANDIDATE BUILT, 13 UNCLEAR, 60 need manual review).

**Governance (Owner-directed, 2026-11-01):** removed the claim system (next.mjs, PRIORITIES header, START-OF-CHAT, ONBOARDING, END-OF-CHAT); added SUPERSEDED/BUILT terminal states + RETIRED section (next.mjs stops parsing at `## RETIRED`); retired P-001–P-006, P-011; added P-207–P-211 to the live table (c836f415). Review rule now: >3 reviews fine, no seat reviews twice (tool already dedupes by seat).

**Storage wave:** final prompt rewritten per DS's factual fix, sent parallel to Claude + Z.ai. Claude's contract + assessment read (branch architect/engine-and-seats). Owner B6 = run-it-back (b), saved verbatim (6154c4ef). Amused save-seam field report filed for Z.ai's Phase 0.

## Current state / next

- **In progress:** nothing — lane clean, all work pushed.
- **Waiting on (not mine):** Claude to merge council/muse → council/base (next.mjs reads PRIORITIES.md from base; my governance/priority changes take effect on merge). Z.ai's Phase 0 plan. Owner/Architect to confirm P-211's 23 CANDIDATE BUILT items.
- **Next session:** read this file; run `node tools/next.mjs`; note P-207/208/209/210 need 2 more reviews each by *other* seats (I can't re-review my own work).
- **Open:** P-010 review-count discrepancy (still unresolved); spec §6 stale "QB → WR/S −6" note (two reviewers recommend striking; Architect to action).
- **Amused:** PAUSED by Owner — do not resume unless told.

## Standing lessons

- KG dislikes multi-step terminal flows: one command per line, no trailing `#` comments.
- KG's #1 gripe is dead priorities accumulating — the RETIRED mechanism + P-211 exist for this; keep the queue honest.
- Owner rounds of discussion are valued (not to be shortened); narrow the question per round instead.
- Verify push content on origin after API timeouts; never assume.
- Evidence labels on everything (VERIFIED / REPORTED / INFERRED / UNKNOWN).

## Files in this lane
- `_agents/muse/MUSE.md` (this file) · `_agents/muse/deliveries/` (engine-acceptance.test.ts) · `_agents/muse/amused/` (PAUSED experiment) · `inbox/2026110*-muse-*` (all pushed)
