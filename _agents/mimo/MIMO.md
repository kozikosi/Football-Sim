# MIMO — lane file

## Identity
- **Seat:** MiMo (`mimo`) · **Model / how reached:** MiMo-V2.6-Flash-Free via OpenCode · **State:** **probation (reinstated)** — `_agents/README.md`. Not in `_agents/RETIRED.txt`.
- **ID block:** none (no submission ids filed) · **First seen:** 2026-10-22
- **Strengths shown so far (evidence, not claims):** independent re-measurement that corrected three premises in the A2b colour brief (`notes/A2b-colour-provenance.md`); independent dataset hash (`notes/DATASET-HASH-CROSSCHECK.md`); toolchain + pool-impact audits; caught the invented-quarter bug behind the Owner's "blocked XP at 0-0" report; caught the protected-constant edit inside Z-post-blue w33.
- **Worktree:** `/Users/kosi/Desktop/wt/mimo` · **Branch:** `council/mimo` · **merge-base HEAD ↔ `origin/council/base`:** `1b91f50e` (base tip at session start; `tools/sync-base.sh` → "up to date") · **HEAD (local, NOT pushed this round):** `baaa24e2` + lane commit — 8 Nov briefing ordered "push nothing; produce a zip"; push when the window ends (see "What the next session needs"). Last pushed HEAD before this round: `4d22cad2`.

## This session (7–8 Nov) — P-284 delivered + fit-bias audit; NOT pushed (briefing order: zip instead)

- START-HERE re-read from `origin/council/muse` as commanded; base synced (`up to date with council/base (1b91f50e)`).
- **P-284 delivered** → `inbox/20261108-0326-mimo-P-284-32-slot-weights-report.md`: full 32-slot table (colors reveal · ranks vs Owner table · DEFAULT rank/gap/flag · salary · recommended), **recommendation = Owner's 6 Nov salary table is final**, 5 receipts (284/284 engine tests; CHECK1 32/32 exact; CHECK2 ±50 32/32 both fronts, worst DE1 +23.3; CHECK3 salary×25 22/32 + 10 named tweaks; CHECK5 cross-engine Spearman 0.712; sweep reproduced; calibrate-draft N=40 with Wilson CIs). VERIFIED.
- **Fit-bias audit (answers the Owner's 7-Nov bias question, completes Z.ai's Q2)** → `inbox/20261108-0326-mimo-fit-bias-audit-and-engine-truth-protocol.md`: legacy fit echoes the old personal table at **Spearman 0.817 with an identical 18.7% secondary share** (Owner's suspicion confirmed, VERIFIED); current fit lands at **0.992 / mean |dev| 7.1** vs his table — circular by construction; 6-Nov refit bent the curve mean 66.0 pts. `spec-diff.mts`: **19 parameters moved** (all 7 RATING_SPECS groups, all 5 DEF_SPECS packages, PERS_REC×4, RB_HEAVY×2, MC.kick ÷4; rec/rb scaled UP ×25–43, defense DOWN ×4–8). Methodology advice + revised Claude-facing prompt + T-item status + H-A/B/C pre-registration proposals are inside.
- **Tools built (lane, read-only):** `_agents/mimo/tools/owner-weights-test.mts` (P-284 table), `fit-delta.mts` (three-era effect audit), `spec-diff.mts` (Q2 parameter diff; asserts legacy swap restores). Run: `node --experimental-strip-types _agents/mimo/tools/<tool>.mts /tmp/mimo-p284/colors [sweep.json]`.
- Extraction for testing: `git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/mimo-p284` (sandbox, not delivered work).
- **Not pushed this round** (8 Nov briefing: "push nothing; file in lane+inbox; produce a zip"). Local commit `baaa24e2` (5 files, 520 insertions). `tools/import-zip.sh` referenced by the briefing does NOT exist on any branch I could see (UNKNOWN where it will land); zip produced with repo-relative paths at worktree root: `mimo-import-20261108.zip`.
- Beam's T-items: T1/T4/T6 blocked (data / RNG); T3 advanced (fit-era anchor columns); T12 applied (Wilson CIs). Beam's `raw-curve-witness.mjs`/`triangulation.mjs`/`uncertainty.mjs` = REPORTED (his branch, not re-run by me).
- Calibration observation (INFERRED, N=40, wide CIs): greedy 92.5% playoffs [80.1, 97.4] vs 80/25/10 target — NOT a tuning basis (P-276).
- Flex: experiments at commits 74e2a706/fed34124/949627a6 marked "not adopted" — flex values NOT settled; do not treat as law.

## Carried work and state (from 28–31 Oct, all pushed on `council/mimo`)
1. **P-019 review #3 of 3** (`inbox/20261028-2231-mimo-P-019-review.md`) — VERDICT `improved`. Beam's premise "recap starts with turnovers" false: `[p1, p2full, p2stars, p3]` (l.3220), chronological pbp already in `p1` (l.3179). Real glitch: `buildDefenseDetail` pushes `blocks.push({kind, name})` with **no quarter** (l.2616) and the recap invents one (`hashPick(g,'bq'+s+i,[1,2,3,4])`, l.3020) → a blocked extra point can sort into Q1 before any TD (the Owner's report). Two patches filed: game-ball-in-stars (`d.mvp` is already a player object, l.2684) + TD-quarter floor for extra-point blocks. `playByPlay` already Q1-first (l.3067). VERIFIED.
2. **P-023 review #3 of 3** (`inbox/20261029-0310-mimo-P-023-review.md`) — VERDICT `improved`, four patches. Corrected anchors vs Pre-Colors: `render100` **6043**, `histHTML` **6051**, `unitRows` **6067**, `sec` **6119**, audit **6131-6132**, button **6142**, `--gold` **217**, `--accent2` **16**. Found: `tr(lab,r)` at **6061 is dead code** (0 call sites); glossary still explains "Realism audit" at **5022** though the section is hidden; league-row highlight hardcoded blue `rgba(120,120,255,.12)` at **6070**. VERIFIED (byte-exact node probe).
3. **Returner rating (Architect's direct question)** (`inbox/20261031-0352-mimo-returner-rating-idea.md`) — premise "data has only OVR/SPD/STR" **false**: `PCOLS` (l.721) = `name,pos,team,ovr,spd,str,agi,cod,inj,awr` + `xf`. `returnerRating` **already exists** (l.2622): `0.50*SPD + 0.20*AGI + 0.20*COD + 0.10*AWR`, `||70` fallbacks, used by `autoReturner`. Recommendation: keep it; the Architect's "neutral 82" ≠ the formula's `||70`. KR/PR split = INFERRED, needs Owner. VERIFIED.
4. **Z-post-blue w33 vs Pre-Colors (Owner's question)** (`inbox/20261031-0355-mimo-w33-vs-precolors-critique.md`) — w33 = `68d105f0100db3eb`, 1,440,296 B (2.19×), 7 script blocks. Protected constants byte-identical **except `DEFAULT_WEIGHTS`**: adds `"TE3": 5`, contains `"DL5": 5` twice (dup key; effective table otherwise unchanged) → needs Owner approval or restore. +57 `zpb*` functions; `generateDraftRecap` deleted cleanly (3→0 refs); `Math.random` 56→62, **no seedable RNG in either build**; frozen PLAYERS rows unchanged (1,199 separators both). Owner strings: `also fits` 1→0 ✓, `Value here` label gone ✓, `2-Pt Conv` 16→16 ✓, `expected scoring` 1→1 (glossary). VERIFIED.

## What the next session needs
1. Re-read `_agents/START-HERE.md` from `origin/council/muse`; sync base; run `node tools/next.mjs` / `tools/council.mjs next` for the top queue line — REVIEW beats new work at the same tier.
2. **If pushing resumes:** push `baaa24e2` (+ lane commit) to `council/mimo` and verify with `git ls-remote` — this round's two inbox filings and 3 tools are local-only until then. The P-284 filing and the bias-audit filing are written for the Architect's digest and the Owner's question; both are complete as filed.
3. Next build is **Colors v1** (`Football-Sim-Colors-v1.html`, does not exist yet) — anchors above are measured on **Pre-Colors** `40233d6be00e987c` and on `architect/engine-and-seats@949627a6`; re-measure before quoting them against any newer file.
4. Open follow-ups I can take next: H-C gameplay check (current vs legacy coefficients on identical rosters); real-data T1/T3 once a hash-pinned source is approved; re-run fit-delta after any future refit (it is the standing fit-audit gate candidate).

## Open questions
1. **MOC's canonical PLAYERS hash** — compare to `e9030c9e…`; verdict **UNKNOWN** until received (row-separator count identical, 1,199, between Pre-Colors and w33: not a hash).
2. **`core.hooksPath`** — commits print `hint: The 'tools/hooks/pre-commit' hook was ignored because it's not set as executable`: configured repo-wide but never executable, so it never runs. Fix is one `chmod +x tools/hooks/pre-commit` by whoever owns `tools/`. Flagged, not mutated.
3. Old per-seat `session.send` fan-out vs open-queue rule — never answered.
4. **Review-chain formatting defect:** Beam's and OR's P-019/P-023 reviews lack a `SPEAKER:` header (open with `REVIEW-OF:`), so `tools/next.mjs` does not count them. If it is a tool bug the fix belongs in `tools/` (Architect's file).

## Do not redo
Copy-band counts, A2b provenance counts, pool/weight audits (`notes/FB-P-*`), `TOOLCHAIN-CHECK.md`, `V22-AESTHETICS-TRIAGE.md`, dataset hash. Do not re-derive `40233d6b…` (pinned). P-019/P-023 anchors above are re-measured — reuse them.

## Files in this lane
- `_agents/mimo/MIMO.md` — this file
- `tools/owner-weights-test.mts` — P-284 32-slot table generator (checks 1–5; receipt in inbox filing)
- `tools/fit-delta.mts` — three-era fit-bias audit (personal / legacy / current / Owner table; Spearman, secondary share, per-slot bend)
- `tools/spec-diff.mts` — Q2 parameter diff (legacy vs current specs; asserts swap restoration)
- `notes/DATASET-HASH-CROSSCHECK.md` — control hash, verdict pending MOC
- `notes/A2b-colour-provenance.md` + `A2b-colour-provenance-table.md` — 32-team source table
- `notes/FB-P-POOL-IMPACT.md`, `FB-P-28ROUND-IMPACT.md` — pool/kicking/backfield maths
- `notes/TOOLCHAIN-CHECK.md` — biome/mermaid/figma availability
- `notes/V22-AESTHETICS-TRIAGE.md` — 13 P7 headings triaged
- `notes/SOCCER-CUTOFF-DECISION.md`, `owner-soccer-ranking-options.md` — soccer cutoff work
- `notes/nba-draft-rotation-comparison.md`, `nba-draft-rotation-receipts.md`, `nba-pick-economy-m1.md` — NBA work
- `notes/quarantine-execution.md` — VLOC quarantine receipt
- `tools/hash-dataset.mjs` — the independent hash implementation
