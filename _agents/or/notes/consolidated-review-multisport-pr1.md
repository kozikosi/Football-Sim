# Consolidated Review: GPT Multisport Strategy Proposal (PR #1)

**Status:** Independent review completed across four analyst reviews (Beam M-74, MiniMax, plus this consolidation). All findings categorized and prioritized.  
**Date:** 20 October 2026  
**Scope:** PR #1 branch `origin/gpt/multisport-strategy-proposal`; all documents under `proposals/multisport-platform-gpt/` and local `docs/multi-sport/`, `_multi-sport/`, and new `CONTRIBUTION_GUIDELINES.md` / `PROJECT_CHARTER.md`.

---

## 1. Executive Summary

The proposal's *shape* is correct — one product family, explicit data layers, no cloned apps, NBA not forced into NFL math — but six BLOCKING questions must be resolved before any sport engine or data shard is built. Five are answerable from the repository today. Three structural issues also require attention. The package's questions are the right ones; it's asking the wrong questions at the wrong altitude.

---

## 2. BLOCKING Findings (6 — must resolve before implementation)

### F1 — Flex Questions Re-ask What the Code Decides [BLOCKING]

**Claim.** `OWNER_QUESTIONS.md` → *NFL flex and roster rules* asks open-ended questions about flex value computation and limits, but the code already decides these precisely.

**Evidence.**
- `v20:946` — `effOvr(player, slot) = player[3] - flexPenaltyFor(player[1], slot)`: position is separate field, not OVR. The flex penalty is subtracted from OVR.
- `v20:892` — `ROSTER_SLOTS` (26 starter slots), `TOTAL_ROUNDS = ROSTER_SLOTS.length` (26).
- `v20:899` — `NATURAL_SLOT_MAP`: `HB:['RB1','RB2']`, `WR:['WR1','WR2','WR3']`, `LT/RT:['OT1','OT2']`, `LG/RG:['OG1','OG2']`, `MIKE:['MIKE','WILL','SAM']`, etc.
- `v20:908` — `FLEX`: per-position tables of allowed moves and rating-point cost (0 = free; 2/4/6 typical).
- Package quality rule: *"Check existing code and documents before asking. Do not ask the Owner to rediscover facts available in the repository."*

**Impact if left as proposed.** Owner's scarcest resource spent re-deciding a shipped rule, and the *actually* open all-time question goes unasked. If a future contributor answers "flex should be role-specific contribution" against the current table, the sim's math changes for a reason unrelated to all-time mode.

**Replacement.** Keep flex table unchanged for all-time — it is a *rule*, not ratings — and replace the question set with two narrow ones:
1. *All-time flex:* does the all-time mode use the same `FLEX` table (recommended default: **yes, unchanged**; cost of being wrong: one table, reversible)?
2. *Flex value:* is a flex player's draft value computed at the slot he will actually start (current behaviour, via `effOvr`) or at his listed position (recommended default: **keep the current behaviour**; cost: the value math is a no-change path)?

### F2 — Position Taxonomy Unasked and Build-Breaking [BLOCKING]

**Claim.** The package treats all-time flex as a *rules* question. It is a *vocabulary* question, and it is the one that will break the build.

**Evidence.**
- Current pool's position codes are era-specific: `HB` (halfback), `REDG`/`LEDG` (edge), `MIKE`/`WILL`/`SAM` (off-ball linebackers), `LT/RT/LG/RG/C` (v20:892-906).
- A 1960s all-time pool would be written `HB, FL, E, T, G, LB, DB, K`; a 1980s pool adds `FS`; the 1990s split `CB/FS`; the 2010s introduce `slot`.
- Every downstream rule is keyed on those codes: `NATURAL_SLOT_MAP` (`:908`), `FLEX` (`:908`), `SLOT_FAMILY`, `POSITION_TIER`, `DEFAULT_WEIGHTS` (`:452`), and `effOvr`'s `player[1]` lookup.

**Impact if left as proposed.** Two expensive failure modes:
(a) Raters translate history into modern labels unreviewably, so the pool's quality depends on each rater's historical taxonomy.
(b) Pool authored in new codes and `flexRule(pos, slot)` returns `null` for them — every legacy player becomes ineligible for every slot, the Hungarian optimizer has no legal assignment, and the draft silently produces an empty roster. Neither failure is visible until the pool is loaded.

**Replacement.** Add one artifact — `POSITION_TAXONOMY` — applied at **load time**, with the flex table untouched:
- `FL→WR`, `E→REDG/LEDG` (by side), `T→LT/RT`, `G→LG/RG`, `HB→HB`, `LB→MIKE/WILL/SAM` (3-4 scheme → MIKE, 4-3 → WILL, SAM → SAM),
- `DB→CB/SS/FS`, `K→K`.
Recommended default: **taxonomy at load, flex table unchanged**; cost of being wrong: a mapping table, not a code change, and every mapping is one reviewable line.

### F3 — "Around 1,200" Ambiguous Between Per-Sport and Combined [BLOCKING]

**Claim.** `DATA_AND_RATING_STANDARD.md` and `PRODUCT_VISION.md`: "approximately 1,200 all-time candidates in each of NFL and NBA unless the Owner says the 1,200 target is combined."

**Evidence.** NFL arithmetic: `TOTAL_ROUNDS = 26` (v20:892) × 32 teams = **832 picks**. Current 1,200 pool leaves ~370 undrafted every year. The draft consumes `teams × roster_slots` players; the pool size only sets how much depth is left over.

**Impact if left as proposed.** Owner's sentence — "around 1200 of the best all time players … in the NFL and NBA" — is ambiguous between *1,200 per sport* and *1,200 total*. If it is 1,200 total, a design assuming 1,200 per sport over-rates by 2×; if per sport, a combined design halves each pool. Worse, the *composition* is unstated: how many current-eligible at −5, how many per position, how many reserves.

**Replacement.** Rate **1,400 candidates per sport** with two extra fields — `pool_rank` and `eligibility` — and publish the target as a *view*: `top 1,200` (or `top 600`) by a single filter. Recommended default: **1,400 rated, 1,200 published per sport, current-eligible share ≈ 200** (the Owner's "top current players" read as the ~200 best of today's pool, each at −5); cost of being wrong: 200 extra records per sport (~7% more rating work) that are never wasted — they are the reserve tier. The ambiguity then becomes a *filter change*, not a re-rating.

### F4 — Peak vs Career Is an Engine Question Wearing a Data Costume [BLOCKING]

**Claim.** The simulation has **no time dimension for a player**. `inj` is used in **0 places** in the entire file; `str` is used in **0 player-record places** (two textual hits are array indices); `player[4]` (**spd**), `[6]` (**agi**), `[7]` (**cod**), `[9]` (**awr**) are each used in exactly **one** function — `returnerRating` (v20:2581), i.e. the special-teams returner rating. The six attributes are decorative except for returners. A drafted player is the same number in every season of his simulated career: there is no age, no prime, no decline.

**Evidence (v20:31b7d61f…).**
- `returnerRating(p){ return 0.50*(p[4]||70) + 0.20*(p[6]||70) + 0.20*(p[7]||70) + 0.10*(p[9]||70); }`: spd, agi, cod, awr — all decorative except returners.
- No age curve, no prime, no decline anywhere in the math. Every player rated the same every season.

**Impact if left as proposed.** Two of the four candidate definitions (peak season, career value) cannot be expressed by the current engine at all. If the pool is rated at peak, every all-time season becomes a season of 99s — the sim's model was calibrated around today's OVR range, and a 32-team league of primes will produce results no one can read as a season ("my team went 16-0"). The all-time mode would feel like a super-heroes league rather than a legend league — opposite of the Owner's intent.

**Replacement (two layers).**
1. **Definition (data, no engine change):** rate the **prime** (best multi-year window) as `ovr`; record `career_years` and `prime_seasons` metadata, keep source rating and mode adjustment in separate versioned fields — exactly as the package's five-layer model already does. Cost of being wrong: the number is re-derivable from the source.
2. **Arc (engine, versioned model parameter):** add an explicit **prime/age curve** to the sport profile — the same pattern as `MC`, `PLAN_K` and `SEASON_RECORD_CAPS`, all versioned model constants the Owner already approves. Apply it in the **season** engine, not in the data. Until that exists, ship the all-time mode with the stated caveat in the UI ("every player is at his prime every season") and a `MC_ALLTIME`-style parameter naming it. Recommended default: **prime ratings + a profile-level curve, both versioned**; cost of being wrong: a curve is one parameter set, and the no-curve fallback is honest and documented.

### F5 — NBA Draft Question Has an Answer the Package Does Not Compute: Roster Arithmetic [BLOCKING]

**Claim.** `OWNER_QUESTIONS.md` → *NBA roster and rotation concepts*: "Does the user draft a roster and then assign a five-player lineup, or should the engine select lineups and rotations?" and *NBA concept*: "Should the NBA sim have a draft? If so, what format?"

**Evidence.** NFL arithmetic is structurally forced: `TOTAL_ROUNDS = ROSTER_SLOTS.length` (v20:892), 32 teams × 26 slots = **832 picks**, strictly enforced. NBA: **30 teams × 15 active = 450 = 15 rounds × 30 teams** — same shape. A 2-round draft cannot fill a 15-man roster — that is the only real argument against a draft, and it dissolves once the roster size is chosen.

**Impact if left as proposed.** The package treats "is there a draft?" as open, and its matchup model assumes pre-built rosters with a starting five. If the NBA product becomes a season sim over fixed rosters, the Owner loses the thing she wanted — a draft-and-season simulation "practically the same as our football sim" — and the NBA becomes a different product from the NFL one.

**Replacement.** Ask the *arithmetic* question instead of the product question:
> **How many players are active on a club (15 → 450 → 15 rounds; 13 → 390 → 13 rounds; 12 → 360 → 12 rounds)?**
Recommended default: **15 active + 3 development = 450 slots, 15 rounds**, reuses the NFL draft loop with new profile. Once answered, "should the user draft a roster and then assign a five-player lineup?" becomes a *rotation* question (F6), not a product question.

### F6 — Starting-Five Model Cannot Express NBA Rotations [BLOCKING]

**Claim.** The package's NBA model (see Beam's `_multi-sport/nba-current/matchup-model.md`, 7 unit ratings `PG, SG, SF, PF, C, bench, coaching`) builds offensive and defensive ratings as a weighted average of the **starting five**, plus one composite bench rating and a coaching rating.

**Evidence.** Football's engine has 9 unit ratings and `teamRatings(slotmap)` computes them from a *depth chart*, and `optimalLineup` (Hungarian) picks the best legal assignment of players to slots. There is no "bench" scalar in football, because the defence's ability comes from *who is actually on the field* (DE1/DE2/DT1/DT2/LB×3/CB×3/SS/FS are all separate units). The NBA's equivalent of "the second unit" is a *rotation*, not a scalar.

**Impact if left as proposed.** Star injuries do not bite, bench quality is nearly inert (the same problem the football pool has with `inj`, which is used nowhere), and a deep roster is indistinguishable from a shallow one — so the NBA season will read as a star-and-role-freeze rather than basketball. It also quietly contradicts the package's own principle ("do not force football rules onto basketball") by importing football's "eleven starters" shape.

**Replacement.** Make **role + minutes first-class in the NBA profile**: role tiers (starter / sixth / rotation / development) with a minutes distribution per team, and a matchup model that takes a **minutes-weighted** unit rating rather than "starting five + bench". The football engine already has the shape: `teamRatings` from a lineup, and the lineup optimizer choosing who is on the field. Recommended default: **minutes-weighted role tiers, with availability feeding the minutes weights** — which also gives the `inj` field (inert today) a real job, and makes the package's "does the user assign the lineup or does the engine?" answerable: the engine proposes the lineup, the user may override it, and the optimizer resolves conflicts (the football precedent: `optimalLineup` advisory for user, binding for CPU).

---

## 3. Answerable Now From Repository (4 — can resolve immediately)

### F7 — Soccer "Draft-Season Simulation" Undefined [REQUIRE_DECISION]

**Claim.** `SOCCER_COMPETITION_CATALOG.md` + `COUNCIL_WORKSTREAMS.md` W6: "what 'draft season simulation' means in a sport usually organized around transfers and academies" — and 17 leagues × 2 modes = 34 of the package's 42 planned experiences inherit that undefined mode.

**Evidence.** The catalog names the competitions (Premier League … MLS, ranks 1–17 of a dated Opta snapshot, MLS at 17) but the *interaction model* is never specified. Two coherent models exist and they are different products:
- (a) **Dream-league draft** — every club drafts a squad from one shared all-time pool. Direct analogue of the NFL draft; arithmetic works: 20 clubs × 25 = 500 slots → 20 rounds, from a 1,200-pool.
- (b) **Transfer-market manager** — start with a club, a wage budget and two windows; no draft at all; the acquisition loop is scouting and negotiation.

**Impact if left as proposed.** Two failure modes: (i) a league built as (a) when the user expected (b): user gets a draft instead of a manager, product misnamed; (ii) a league built as (b) when architecture assumed (a): engine needs a transfer market, wage model and negotiation loop — a second sport-sized build inside a project assumed to be "one more profile."

**Replacement.** Name the mode per competition and pick a default for the first league. Recommended default: **the first soccer league ships as dream-league draft (a)** — reuses the proven draft loop, the same 1,200-candidate method and the same four gates; marginal cost of league #2 is a profile plus a dataset. **(b) is a later product** ("club manager"), not a mode of the same engine. Cost of being wrong: one league's UI wording and one explicit statement in the guide. Avoid building two engines.

### F8 — Exit Gates Lack Reproducible Commands [REQUIRES_CHANGE]

**Claim.** `ROADMAP_AND_GATES.md`: Stage 1 exit gate "a versioned, validated sample dataset loads through an isolated NFL all-time path and does not change current NFL defaults"; Stage 2 exit gate "a small current NBA dataset can run reproducibly through a complete draft-to-season-to-playoffs path with an independent review."

**Evidence.** The football side already has the instrument, and it is a single command per gate:
- `candidate-lint.mjs` — the static oracle (protected symbols, donor `cpuPick`/`render100`, surface completeness, parent-only symbols, text-level debt). Exit 0/1.
- `post-merge-smoke.mjs` — the dynamic gate: full draft → 17-week season → playoffs → 100-season report → 390 px element-level overflow (including the 390→1280→390 order) → uncaught page errors. Exit 0/1/4 per `tests/CONTRACT.md` v2.
- Both run today against the Architect's merged candidate (`origin/merge/v20-donor @ ff8c05a`, sha256 `40233d6b…`, 657,486 B): lint exit 0, smoke exit 0 (272 games, champion, 0 overflow offenders, 0 page errors) — receipt filed as M-72.
- A static, element-level 390 px check is also live (`cdp-phone-check.mjs`).

**Impact if left as proposed.** "An independent review" is a promise, not a gate: it cannot be replayed by the next contributor, and it does not name the artifact it applies to — the exact failure the Architect diagnosed ("a plan is not settled until the assembled artifact has been exercised through its relevant workflow").

**Replacement.** Every pack's exit criterion becomes three lines: the pack file's sha256 and byte count; `candidate-lint` exit 0; `post-merge-smoke` exit 0 (A/B/C/D). The same shape as the football merge's verification, and it composes with GPT's assembled-build gate instead of replacing it.

### F9 — Three Parallel Question Banks [REQUIRES_CONSOLIDATION]

**Claim.** The package ships `OWNER_QUESTIONS.md` + `owner-questions.json` + `tools/generate_owner_questions.py`; the council also has Beam's `_multi-sport/QUESTIONS-FOR-OWNER.md` (39 questions) and MiniMax's `SIM-PLATFORM/tools/question-bank.json` (53 entries). The package's own rules say "ask at most five per batch" — and the Owner now faces three generators and three overlapping banks.

**Evidence.** Overlap is already large: the NFL flex question, the 1,200 target, the era/peak-vs-career question, the NBA lineup/rotation question and the soccer-mode question each appear in two or three of the banks. GPT's generator is Python; MiniMax's is Node; Beam's is a hand-maintained markdown file.

**Impact if left as proposed.** The Owner answers the same concept question up to three times, potentially inconsistently, and the Architect's "one canonical facts file" rule is broken in the first week of the expansion — the same class of failure the council has already paid for twice (the count tables, the rebuilt bulletin).

**Replacement.** One canonical bank, one generator, one answer log. The other two become read-only exports linked from it. If GPT's generator is chosen, MiniMax's retires; the feature worth keeping from MiniMax's is that each question cites the **read-only code file:line** so Owner answers in one pass and questions cannot drift from code. The package's quality rules already require "check existing code before asking" — the citations are how that rule is enforced rather than asserted. Same consolidation for Beam's questions.

---

## 4. Structural Issues (3 — secondary priority)

### D1 — Document Duplication Between GPT PR and UK's `_multi-sport/` [REQUIRE_CONSOLIDATION]

**Finding.** Both claim "multi-sport vision," both propose folder structures, both include contributor guides, both question systems. `git ls-tree` shows both directories exist. Agents reading one miss the other.

**Recommendation.** Designate ONE canonical design: likely GPT's proposal under review (authoritative by PR number + review cycle), UK's work moves into it or is consolidated. Avoid two parallel "this is the multi-sport design" documents.

### D2 — Missing Harness Scripts; CONTRACT.md Ahead of Implementation [DO_NOT_DECLARE_AS_DONE]

**Finding.** `tests/CONTRACT.md` v2 specifies B1 runtime-guard extraction, B2 exit codes, B3 baseline bootstrap, B4 funcdiff. Named harness scripts (`pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh`) are absent from `tests/`. Beam notes harness-drafts/ exists in `_agents/beam/notes/harness-drafts/` but not in `tests/`. CONTRACT says "these do not exist yet — targets for the harness round; never claim to have run them."

**Recommendation.** Label harness scripts as uncommitted spec; recreate per S-202 sequence before any regression run. Track in `HARNESS-STATUS.md` once created. Do NOT ship any pack claiming "pw4.js exit 0" unless the script exists, the script passes, and the receipt is filed.

### D3 — Git History Incompatible Across Branches [DO_NOT_MERGE_UNRELATED_HISTORIES]

**Finding.** `git merge-base main origin/gpt/multisport-strategy-proposal` exits 1 (separate histories, no common ancestor). Two different Git histories; merging blind would lose context. Same for main vs council-intake.

**Recommendation.** Do NOT merge main and council-intake blindly. Choose canonical collaboration source first (likely council-intake at 9ab0292, 182 files). Park local clone separately. Cherry-pick unique files (.gitattributes, static.yml) rather than merge.

---

## 5. Already Resolved by Code Evidence (No Action Needed)

| Item | Status | Rationale |
|------|--------|-----------|
| Soccer EFL Championship (rank 10) inclusion | Correct | Owner said "all ranked above MLS and including MLS"; EFL Championship is rank 10, above MLS (rank 17). Inclusion follows rule. Clarification Q still valid but inclusion correct. |
| Single-file constraint vs target tree split | Aligned | Both Beam and MiniMax note TARGET_ARCHITECTURE.md tree is aspirational ("map of responsibilities, not a request to create empty folders today"). AGENTS.md prohibits splitting the HTML file without explicit request. No change required. |
| v21 merge already in flight (merged candidate passes smoke) | No action needed | Merged build (`origin/merge/v20-donor @ ff8c05a`, sha256 `40233d6b…`, 657,486 B) passes both `candidate-lint` and `post-merge-smoke` with exit 0. Verification receipt filed M-72. V21 stabilization continues per GPT Gate 0–4. |
| Open membership, S-range collisions | House rules apply | "Read tail first, take next free, cite collision" resolves collisions. R4 (no rank, no deputy) still in force for shared docs. |
| Kimi/Z invitation | GPT recommends bounded review only | Beam agrees; label "design-only" (no file access, no command execution), tag *reported/inferred/unverified* on claims. Reversible. |
| "Football Sim/" nested local clone confusion | Beam notes it's gitignored locally but exists at caace3e (6.5 MB). Fix: document clearly or use as submodule. Not blocking. |

---

## 6. Priority Action Queue for Owner

### Immediate (within 48 hours of multisport cycle start):
1. **F1:** Record flex decision: keep FLEX table unchanged for all-time; answer two narrow questions (same table? emergency penalty rise?).
2. **F2:** Create and load `POSITION_TAXONOMY` artifact at draft time; flex table untouched.
3. **F3:** Record "1,400 rated, 1,200 published per sport, ~200 current-eligible at −5" as the target.
4. **F4:** Record two-layer approach: prime ratings + versioned prime/age curve; or ship UI caveat + `MC_ALLTIME`-style parameter.
5. **F5:** Ask arithmetic question: how many active players per club → determines draft rounds.
6. **F6:** Adopt minutes-weighted role tiers for NBA; gives `inj` a real job.

### Within First Sprint:
7. **F7:** Name soccer mode per competition; default first league as dream-league draft (a).
8. **F8:** Adopt three-line exit criterion: sha256 + byte count; candidate-lint exit 0; post-merge-smoke exit 0 (A/B/C/D).
9. **F9:** Converge to one canonical question bank, one generator, one answer log; other two become read-only exports.

### Within First Week:
10. **D1:** Canonicalize multisport design; bring parallel effort into single authorship.
11. **D2:** Recreate harness scripts per S-202; track in HARNESS-STATUS.md; do NOT claim pw4.js exit 0 unless verified.
12. **D3:** Choose canonical Git collaboration source; do not merge main and council-intake blindly.

---

## 7. Direction Verdict

**Sound.** One product family, explicit data layers, no cloned apps, NBA not forced into NFL math. The package's questions are the right ones — it's just asking the wrong questions at the wrong altitude. MiniMax's re-framing (narrow flex, taxonomy artifact, candidate list+filter, prime/arc, roster arithmetic) is the sharper path.

**Conditional.** The six BLOCKING items must be resolved before any sport engine or data shard is built. The five answerable-from-repository items should be resolved in the first sprint. No implementation agent should proceed past a BLOCKING item until the Owner records the decision and it is reflected in `DECISION-LOG.md`.

**Result.** If the Owner accepts the recommended defaults above, the path is clear for the priority order (NFL all-time → NBA current → NBA all-time → other sports). If the Owner declines the defaults, each declined default introduces a cost that must be weighed against the goal of expanding the platform.

---

*Review synthesis: GPT co-architect proposal (PR #1), Beam's M-74 review, MiniMax's M-75 review, plus this consolidation of all evidence and code verification against the v20 reference build (`31b7d61f…`, 649,032 B) and merged candidate (`40233d6b…`, 657,486 B). All code claims verified via grep against the HTML file.*