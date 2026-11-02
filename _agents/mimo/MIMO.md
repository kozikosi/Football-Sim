# MIMO — lane file

## Identity
- **Seat:** MiMo (`mimo`) · **Model / how reached:** MiMo-V2.6-Flash-Free via OpenCode · **State:** **probation (reinstated)** — `_agents/README.md`. Not in `_agents/RETIRED.txt`.
- **ID block:** none (no submission ids filed) · **First seen:** 2026-10-22
- **Strengths shown so far (evidence, not claims):** independent re-measurement that corrected three premises in the A2b colour brief (`notes/A2b-colour-provenance.md`); independent dataset hash (`notes/DATASET-HASH-CROSSCHECK.md`); toolchain + pool-impact audits; caught the invented-quarter bug behind the Owner's "blocked XP at 0-0" report; caught the protected-constant edit inside Z-post-blue w33.
- **Worktree:** `/Users/kosi/Desktop/wt/mimo` · **Branch:** `council/mimo` · **merge-base HEAD ↔ `origin/council/base`:** `d7a05a2770bad6b1d2cc31c759bbf64e28a5cf4d` (= base tip; `git rev-list --count HEAD..origin/council/base` = 0, fully synced) · **HEAD / pushed:** `9c4169e2` (VERIFIED by `git ls-remote origin refs/heads/council/mimo`).

## This session (1–2 Nov) — orientation only, no task work
- `git fetch` + `git show origin/council/base:_agents/START-OF-CHAT.md` → followed. Location VERIFIED (`pwd` = `/Users/kosi/Desktop/wt/mimo`, branch `council/mimo`, git-common-dir = `…/Football Sim/.git`).
- `git show origin/council/base:tools/sync-base.sh | sh` → `merged council/base cleanly -> 9c4169e2`; pushed (`c68e325e..9c4169e2`).
- AGENTS.md updated mid-session (§2: **"V23" retired, next build is `Football-Sim-Colors-v1.html`**, plan `_agents/COLORS-V1-INTEGRATION-PLAN.md`, building on `architect/engine-and-seats`; §3: **QB may flex ONLY to FS at -10** (Owner 29 Oct, flex REV 4), `tools/mathlab/flex.json` governs, engine never re-lineups the user's team — `adviseLineup` advice only; §7: **the 1,200-player set is retired**, replaced by the Owner's 28 Oct Madden ratings set, frozen once supplied).
- `node tools/preserve.mjs check` → exit 1, all findings in OTHER worktrees (see pending); my worktree 0 dirty / 0 unpushed.
- No `next.mjs` run and no claim taken this session (ended at orientation).

## Carried work and state (from 28–31 Oct, all pushed on `council/mimo`)
1. **P-019 review #3 of 3** (`inbox/20261028-2231-mimo-P-019-review.md`) — VERDICT `improved`. Beam's premise "recap starts with turnovers" false: `[p1, p2full, p2stars, p3]` (l.3220), chronological pbp already in `p1` (l.3179). Real glitch: `buildDefenseDetail` pushes `blocks.push({kind, name})` with **no quarter** (l.2616) and the recap invents one (`hashPick(g,'bq'+s+i,[1,2,3,4])`, l.3020) → a blocked extra point can sort into Q1 before any TD (the Owner's report). Two patches filed: game-ball-in-stars (`d.mvp` is already a player object, l.2684) + TD-quarter floor for extra-point blocks. `playByPlay` already Q1-first (l.3067). VERIFIED.
2. **P-023 review #3 of 3** (`inbox/20261029-0310-mimo-P-023-review.md`) — VERDICT `improved`, four patches. Corrected anchors vs Pre-Colors: `render100` **6043**, `histHTML` **6051**, `unitRows` **6067**, `sec` **6119**, audit **6131-6132**, button **6142**, `--gold` **217**, `--accent2` **16**. Found: `tr(lab,r)` at **6061 is dead code** (0 call sites); glossary still explains "Realism audit" at **5022** though the section is hidden; league-row highlight hardcoded blue `rgba(120,120,255,.12)` at **6070**. VERIFIED (byte-exact node probe).
3. **Returner rating (Architect's direct question)** (`inbox/20261031-0352-mimo-returner-rating-idea.md`) — premise "data has only OVR/SPD/STR" **false**: `PCOLS` (l.721) = `name,pos,team,ovr,spd,str,agi,cod,inj,awr` + `xf`. `returnerRating` **already exists** (l.2622): `0.50*SPD + 0.20*AGI + 0.20*COD + 0.10*AWR`, `||70` fallbacks, used by `autoReturner`. Recommendation: keep it; the Architect's "neutral 82" ≠ the formula's `||70`. KR/PR split = INFERRED, needs Owner. VERIFIED.
4. **Z-post-blue w33 vs Pre-Colors (Owner's question)** (`inbox/20261031-0355-mimo-w33-vs-precolors-critique.md`) — w33 = `68d105f0100db3eb`, 1,440,296 B (2.19×), 7 script blocks. Protected constants byte-identical **except `DEFAULT_WEIGHTS`**: adds `"TE3": 5`, contains `"DL5": 5` twice (dup key; effective table otherwise unchanged) → needs Owner approval or restore. +57 `zpb*` functions; `generateDraftRecap` deleted cleanly (3→0 refs); `Math.random` 56→62, **no seedable RNG in either build**; frozen PLAYERS rows unchanged (1,199 separators both). Owner strings: `also fits` 1→0 ✓, `Value here` label gone ✓, `2-Pt Conv` 16→16 ✓, `expected scoring` 1→1 (glossary). VERIFIED.

## What the next session needs
1. Run `node tools/next.mjs`, take the top line, **claim first** (`inbox/<UTC>-mimo-<ID>-claim.md`), REVIEW beats new work at the same tier.
2. Base is synced at `9c4169e2`; re-run `tools/sync-base.sh` at chat start anyway (base moves often).
3. Next build is **Colors v1** (`Football-Sim-Colors-v1.html`, does not exist yet) — anchors above are measured on **Pre-Colors** `40233d6be00e987c`; re-measure before quoting them against any newer file.

## Open questions
1. **MOC's canonical PLAYERS hash** — compare to `e9030c9e…`; verdict **UNKNOWN** until received (row-separator count identical, 1,199, between Pre-Colors and w33: not a hash).
2. **`core.hooksPath`** — commits print `hint: The 'tools/hooks/pre-commit' hook was ignored because it's not set as executable`: configured repo-wide but never executable, so it never runs. Fix is one `chmod +x tools/hooks/pre-commit` by whoever owns `tools/`. Flagged, not mutated.
3. Old per-seat `session.send` fan-out vs open-queue rule — never answered.
4. **Review-chain formatting defect:** Beam's and OR's P-019/P-023 reviews lack a `SPEAKER:` header (open with `REVIEW-OF:`), so `tools/next.mjs` does not count them. If it is a tool bug the fix belongs in `tools/` (Architect's file).

## Do not redo
Copy-band counts, A2b provenance counts, pool/weight audits (`notes/FB-P-*`), `TOOLCHAIN-CHECK.md`, `V22-AESTHETICS-TRIAGE.md`, dataset hash. Do not re-derive `40233d6b…` (pinned). P-019/P-023 anchors above are re-measured — reuse them.

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
