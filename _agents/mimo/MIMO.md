# MIMO — lane file

## Identity
- **Seat:** MiMo (`mimo`) · **Model / how reached:** MiMo-V2.6-Flash-Free via OpenCode · **State:** **probation (reinstated)** — `_agents/README.md` row 23. Not in `_agents/RETIRED.txt`.
- **ID block:** none (no submission ids filed) · **First seen:** 2026-10-22
- **Strengths shown so far (evidence, not claims):** independent re-measurement that corrected three premises in the A2b colour brief (`notes/A2b-colour-provenance.md`); independent dataset hash (`notes/DATASET-HASH-CROSSCHECK.md`); toolchain + pool-impact audits; **this session: caught the invented-quarter bug behind the Owner's "blocked XP at 0-0" report, and the protected-constant edit inside Z-post-blue w33.**
- **Worktree:** `/Users/kosi/Desktop/wt/mimo` · **Branch:** `council/mimo` · **merge-base with `origin/council/base`:** `db980a10eb27dc62c9448771a5ecbff3de5b22d6` · **pushed head this session:** `15f0c6a9`

## Worktree repair — done 26 Oct (the thing the next session must know first)
`wt/mimo` had a **broken registration**: its `.git` file pointed at `Football Sim/.git/worktrees/mimo`, and that admin dir **did not exist**. Fixed by recreating only what git itself writes — `.git/worktrees/mimo/{commdir→../.., gitdir→…/wt/mimo/.git, HEAD→ref: refs/heads/council/mimo}` — then `git read-tree HEAD`. **`read-tree` mattered:** with no index git reported 283 staged deletions; committing then would have destroyed the tree. `read-tree` touches only the index. (Healthy since; no repeat needed.)

## This session (28–31 Oct) — everything pushed on `council/mimo`
1. **P-019 review #3 of 3** (`inbox/20261028-2231-mimo-P-019-review.md`, `ee168a5d`) — VERDICT `improved`. Beam's premise "recap starts with turnovers" is **false**: `[p1, p2full, p2stars, p3]` (l.3220) with the chronological pbp already inside `p1` (l.3179). **The real glitch mechanism:** `buildDefenseDetail` records `blocks.push({kind, name})` with **no quarter** (l.2616) and the recap invents one (`hashPick(g,'bq'+s+i,[1,2,3,4])`, l.3020) — so a blocked *extra point* can sort into Q1 before any TD, which is what the Owner saw. Two patches filed: game-ball-in-stars (uses `d.mvp`, which is already a player object, l.2684) and a TD-quarter floor for extra-point blocks. Also: game ball already always renders (l.3188-3195); `playByPlay` already Q1-first with `q:Math.min(it.q||1,5)` (l.3067). VERIFIED.
2. **P-023 review #3 of 3** (`inbox/20261029-0310-mimo-P-023-review.md`, `a09eb0bc`) — VERDICT `improved`, four patches (aligned SVG histogram, correlation bars via the existing `tr()` helper, hiding Realism audit + model check, reduced-motion line). Corrected anchors: `render100` **6043** (not 5596), `histHTML` **6051** (not 6062), `unitRows` **6067** (not 6079), `sec` **6119**, audit **6131-6132**, button **6142**, `--gold` **217**, `--accent2` **16**. Found: `tr(lab,r)` at **6061 is dead code** (0 call sites) — exactly the bar markup the proposal duplicates; the glossary still explains "Realism audit" at **5022** after the section is hidden; league-row highlight is hardcoded blue `rgba(120,120,255,.12)` at **6070**. VERIFIED; all quoted old strings re-checked byte-exact with a node probe.
3. **Returner rating — the Architect's direct question** (`inbox/20261031-0352-mimo-returner-rating-idea.md`, `15f0c6a9`). **The premise "the data has only OVR, SPD and STR" is false.** `PCOLS` (l.721) = `['name','pos','team','ovr','spd','str','agi','cod','inj','awr']` + `xf`, destructured at l.811 (ovr 3, spd 4, str 5, agi 6, cod 7, inj 8, awr 9). And `returnerRating` **already exists** at l.2622: `0.50*SPD + 0.20*AGI + 0.20*COD + 0.10*AWR` with `||70` fallbacks, used by `autoReturner`. Recommendation: keep it, don't add OVR/STR/INJ; note the Architect's "neutral 82" doesn't match the formula's own `||70`. KR/PR split filed as INFERRED design for Owner sign-off. VERIFIED.
4. **Z-post-blue w33 vs Pre-Colors — the Owner's question** (`inbox/20261031-0355-mimo-w33-vs-precolors-critique.md`, `15f0c6a9`). w33 = `68d105f0100db3eb`, **1,440,296 B (2.19×), 7 inline script blocks**. Protected constants all byte-identical **except `DEFAULT_WEIGHTS`**: w33 adds **`"TE3": 5`** and contains **`"DL5": 5` twice** (duplicate key; effective table otherwise unchanged) — needs Owner approval or a restore. +57 new functions, all `zpb*` theming; **`generateDraftRecap` deleted cleanly** (3 refs → 0); `Math.random` 56 → 62, still **no seedable RNG in either build**; frozen PLAYERS rows unchanged (1,199 separators both). Owner strings: `also fits` 1 → 0 ✓, draft-board `Value here` label gone in w33 ✓, `2-Pt Conv` 16 → 16 ✓, `expected scoring` 1 → 1 (inherited glossary line). VERIFIED.

## Open questions for the next session
1. **MOC's canonical PLAYERS hash** — compare to `e9030c9e…`; verdict **UNKNOWN** until received. New data point this session: row-separator count identical (1,199) between Pre-Colors and w33, so w33 did not touch the dataset. Still not a hash.
2. **`core.hooksPath`** — every commit this session printed `hint: The 'tools/hooks/pre-commit' hook was ignored because it's not set as executable`. So the hook is *configured repo-wide but not executable*: it never runs for anyone. I never set it; the fix is one `chmod +x tools/hooks/pre-commit` by whoever owns `tools/`. Flagged, not mutated.
3. The old per-seat `session.send` fan-out vs the open-queue rule was never answered.
4. **Two review chains are stalled by the same formatting defect:** Beam's P-019/P-023 reviews and OR's P-019/P-023 reviews have **no `SPEAKER:` header line** (they open with `REVIEW-OF:`), so `tools/next.mjs` does not count them. If that is a tool bug rather than a seat bug, the fix belongs in `tools/` (Architect's file).

## Do not redo
Copy-band counts, A2b provenance counts, pool/weight audits (`notes/FB-P-*`), `TOOLCHAIN-CHECK.md`, `V22-AESTHETICS-TRIAGE.md`, dataset hash. Do not re-derive `40233d6b…`; it is pinned. The four P-023 anchors and the P-019 anchors above are re-measured — reuse them.

## Files in this lane
- `_agents/mimo/MIMO.md` — this file
- `notes/DATASET-HASH-CROSSCHECK.md` — control hash, verdict pending MOC
- `notes/A2b-colour-provenance.md` + `A2b-colour-provenance-table.md` — 32-team source table
- `notes/FB-P-POOL-IMPACT.md`, `FB-P-28ROUND-IMPACT.md` — pool/kicking/backfield maths
- `notes/TOOLCHAIN-CHECK.md` — biome/mermaid/figma availability
- `notes/V22-AESTHETICS-TRIAGE.md` — 13 P7 headings triaged
- `notes/SOCCER-CUTOFF-DECISION.md`, `owner-soccer-ranking-options.md` — soccer cutoff work
- `notes/nba-draft-rotation-comparison.md`, `nba-draft-rotation-receipts.md`, `nba-pick-economy-m1.md` — NBA work
- `notes/quarantine-execution.md` — VLOC quarantine receipt
- `tools/hash-dataset.mjs` — the independent hash implementation
