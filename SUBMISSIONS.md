# SUBMISSIONS.md — the shared proposals document

**The workflow in one line:** every AI session *proposes*; no agent edits the product file or publishes anything; the user carries this document to **Claude**; **Claude alone decides** what to implement and how; the user brings Claude's finished build back; a session verifies it read-only; the user publishes when satisfied.

## Who may write what
- **Each agent session** (GLM, DS, Nemo Super, Nemo Ultra, GPT — OpenClaw withdrawn 19 Oct) writes **only inside its own section** below, inserting new entries **above its section's end-anchor**. Never touch another agent's section, another agent's entries, or anyone's Status line.
- **The user** (or a session acting at the user's request) updates Status lines and adds Claude's decision notes. Rulings are recorded **verbatim** — including rejection reasons, so proponents can appeal. If a session disputes a transcription, the user pastes the raw Claude response to it directly.
- **Claude** never writes here directly — its decisions arrive as notes the user (or the applier session, at the user's request) pastes under each entry.
- **Chat-only sessions** (no file access — Claude, GPT, possibly OpenClaw) cannot read or write files at all: they receive paste text and deliver their entries **as paste text**. The user relays it, and it is transcribed **verbatim** into their section (above their end-anchor) by the user or a session acting at the user's request — no paraphrasing, no cleanup. A transcription dispute is settled by pasting the session's raw reply.

## Rules for a good submission
1. **Use your ID block** — pre-allocated so parallel batches never collide: **DS S-100–199 · GLM S-200–299 · Nemo Super S-300–399 · Nemo Ultra S-400–499 · GPT S-500–599 · Gemini S-700–799** (reserved — fallback implementer, not an advisor) (S-0xx is reserved for examples). *(OpenClaw withdrew from the roster 19 Oct, user decision — block S-600–699 kept reserved in case it returns.)*
2. **State the build** — the hash from `STATUS.md` your proposal applies to.
3. **Be self-contained** — Claude sees only what the user pastes. Quote the *exact current code* being replaced (whole functions, with their names), then give the *full replacement code*. A bare diff is not enough. **Exception (amended 19 Oct):** if the build file is attached to the round, the *current* code of any function may be referenced by name + line range + build hash instead of quoted, **regardless of length** — the replacement and all NEW code are still always quoted in full. Without an attached build, quote the current code in full, unless the function is *moved unchanged* — then name + line range + hash suffices. Re-quoting hundreds of lines the implementer already has is waste (DS).
4. **Blast radius** — name what else calls this code and what could regress (check your callers before writing).
5. **Evidence** — how any numerical claim was produced: the command, the sample size, the code path. A number without these is **prose** and must be marked as such; measured risks outrank prose ones in the pre-sort. Two sessions citing the same code path is **not** independent confirmation (DS, adopted 19 Oct).
6. **Say what you checked** — `node --check` result, any simulation you ran, or "untested". Never claim results you don't have.
7. **One topic per entry** — a bug fix and a feature are two entries. Exception granted only to the Round-1 assessment bundles declared in the assignment packet; from Round 2 on, each actionable item is its own entry.
8. **Conflicts are Claude's call** — if two submissions collide, Claude chooses; note the collision in your entry if you see it.
9. **Stand-ins don't self-rule** — a session serving as implementer for a round has its own pending entries for that round deferred to the next (queue maintainer enforces; adopted with the implementer-succession decision, 19 Oct).

## Status vocabulary
**pending** → **accepted** / **deferred** (must name the condition that revives it) / **rejected** (one-line reason; may be appealed **once**, only with new evidence) → **built** (name the round whose build contains it, e.g. `built R1`) → **verified** (a session's verification report passes on that build) → **shipped** (published; hash recorded). Two exits off the main line: **withdrawn** (the proponent retracts — one line why; retractions are recorded, not folklore) and **superseded** (a newer entry on the same topic replaces this one; name it by ID). Nothing can look live that isn't decided *and* built *and* verified (DS, adopted 19 Oct).

## Standing prompt for the implementer (the user copies this + the document below)

> Send **`COLLECTIVE-PROMPT.md`** first — it is the standing system prompt (role, invariants, delivery contract). Then send this round prompt with the document below.

> You are the sole implementer for the NFL Draft Simulator (single-file HTML app). You have no file access — I copy and paste, and your complete builds reach me as downloaded artifacts. Below are proposals from five AI sessions, made against the build whose hash is in STATUS.md (current file: 650,127 bytes; I attach it to the conversation when you're editing at scale — if your view of it truncates, work from the submissions' full function quotes and say so). For every submission: decide **accept / defer / reject** with a one-line reason, and implement at most **5–6 accepted changes this round** (cap — defer the rest with the condition that revives them). Deliver: (1) a decision list for the queue, (2) **one complete updated HTML file as a single artifact** (fallback: anchor-based replacement blocks per the delivery contract in COLLECTIVE-PROMPT.md) — I save it as a candidate; verification gates it before anything goes live, (3) a short note per accepted submission on what changed, (4) the structural manifest. Where proposals conflict, you decide and say so. Where a proposal is ambiguous, give me your questions instead of guessing.

## Queue
*All Round-1 entries apply to build `77bb9ed5…`. Maintained by the GLM session during assembly (the pre-sort); a row appears the moment an entry is filed. Round cap: assessment/question entries don't count against the 5–6 accepted-changes cap — only accepted code and tooling changes do (Nemo Super, adopted 19 Oct).*

| ID | Title | By | Type | Status |
|----|-------|----|------|--------|
| S-101 | DS assessment: SIM-CORE not runnable as specced; r-gate a no-op; caps hide the sack tail | DS | assessment | pending |
| S-102 | pw4.js spec: baseline-drift gates, three DOM-free entry points, CLI + checks | DS | improvement | pending |
| S-201 | GLM assessment: untestable invariants / out-of-phase starters / sack cap | GLM | assessment | pending |
| S-202 | Harness architecture: SIM-CORE markers + extraction + manifest check | GLM | improvement | pending |
| S-300 | Nemo Super assessment: mobile px widths, inverse invariant, no harness | Nemo Super | assessment | pending |
| S-301 | tests/run_all.sh composite runner + mobile acceptance thresholds | Nemo Super | improvement | pending |
| S-400 | Nemo Ultra assessment: min-widths, fixed grid tracks, class nowrap | Nemo Ultra | assessment | pending |
| S-401 | phone.js spec: static 390px overflow lint | Nemo Ultra | improvement | pending |
| S-501 | GPT assessment: specs ≠ verified; gates can be permissive; interface boundaries | GPT | assessment | pending |
| S-502 | validate.js spec: external 2025 validation — two-layer gates, dataset contract, fixtures | GPT | improvement | pending |
| S-103 | tests/funcdiff.js: function-level build differ (sixth component) | DS | improvement | pending |
| S-203 | tests/2025_standings.js — real-2025 standings dataset for validate.js (took over the withdrawn OpenClaw assignment) | GLM | improvement | pending |
| S-6xx | OpenClaw entries — assessment + real-2025 dataset | OpenClaw | — | withdrawn (user decision 19 Oct — OpenClaw out of the process; dataset reassigned → GLM S-203) |

**Implementer adjudication — Round 1 pre-dispatch (Claude, 19 Oct; verbatim source `rulings_r1_predispatch.md`, recorded by GLM at the user's instruction):** Contract v2 (B1–B4) applied to `tests/CONTRACT.md` — entry-wins repealed for exit codes/status grammar (phone.js: findings → `1`, usage/parse → `4`; S-301's exit-2 amendment superseded), runtime-guard extraction baseline becomes binding, baseline bootstrap/freeze and verifier-only funcdiff defined. Construction order: **1A = S-202 → S-203 → S-103 → S-102 → S-301; 1B = S-502 + S-401** (no U-series in Round 1). Status **pending dispatch** — Claude must first receive build `77bb9ed5…` (GitHub push or attachment) and read S-102/S-103/S-401 in full; the per-entry accept/defer/reject list lands after. Queue rows stay `pending` until that list is in.

---
<!-- ════════════════ AGENT SECTIONS — append above your own anchor only ════════════════ -->

## GLM

*Example entry (format reference — not a real submission):*

### S-000 — EXAMPLE ENTRY — format reference only (⚠️ this fix already shipped in build `77bb9ed5…` — do NOT resubmit it)
- **Proposed:** 2026-10-19 · **By:** GLM (example) · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** bug fix
- **Problem / idea:** `meetingInfo()` listed future meetings as "already met" in Week-2 previews.
- **Proposal:** order all meetings on one clock — weeks 1–17, then playoff rounds in fixed order — and only describe meetings strictly before the one previewed.
- **Code:** *(quote the current `meetingInfo()` in full, then the full replacement)*
- **Blast radius:** every preview tag that calls `meetingInfo()` (division games, playoff previews); nothing else consumes it.
- **Evidence:** reproducible: one full season sim; the failing Week-2 tag text before, the correct one after.
- **Checked:** `node --check` clean; full draft → season → playoffs run in Chromium; Week-2 preview now reads "the first of 2 meetings"; console clean.
- **Status:** shipped (`77bb9ed5…`)
- **Implementer's note (user pastes Claude's decision here):** —

### S-201 — GLM assessment: three structural risks, rank them (round-2 priority question)
- **Proposed:** 2026-10-19 · **By:** GLM · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** assessment (question — bundle is deliberate for round 1)
- **Problem / idea:** three risks, of which (a) blocks all testing:
  - **(a) The model's invariants are currently untestable.** No regression harness exists (`pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh`). Weight↔wins inverse, the 76-OVR replacement floor, Hungarian lineup consistency — all prose claims until a script can check them. Every future submission defaults to "untested".
  - **(b) 141 of 832 starters line up out of phase** under `optimalLineup()` (≈4.4/team): crossovers like C at DT, WR at CB. A realism error at the model's core. Any phase guard touches `FLEX`/`NATURAL_SLOT_MAP` → the user's explicit approval required (invariant 9). The user should declare a philosophy position: is offense↔defense flex a bug or intended flexibility?
  - **(c) Elite sack seasons under-produced.** Post-v10 audit: 17.1 avg / 21 max vs real record 22.5. Suspects: `cpuMiss()`/`cpuNoise()` variance, `rlow = 76` floor compressing spread. **CORRECTED same day (DS S-101, measured uncapped):** the "21 max" is the record cap itself — `SEASON_RECORD_CAPS.sack = 21` rewrites leaders into a 20–21 band; with the cap lifted the sim produces **max 24 and 22**. The live risk is not under-production but **the cap hiding elite sacks**. The "third-session independent tally" in the Evidence line is retracted — it read the same capped code path, so it was never independent confirmation.
- **Proposal:** no code this entry — Claude **ranks (a)/(b)/(c)** with a one-line reason each and confirms Round 1 = the harness (S-202), making (b) and (c) measurable in Round 2.
- **Blast radius:** none (no code).
- **Evidence:** (b) from the DS v10 patch-notes audit; (c) from that audit and **corrected by DS's uncapped measurement** (S-101: capped leader max 21 = the cap itself; uncapped 24/22) — prose figures, no rerunnable procedure exists yet, which is precisely what (a) fixes. The earlier "third-session independent tally" is withdrawn (same capped code path).
- **Checked:** no code; citations only.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

### S-202 — regression harness architecture (GLM's component; pairs with DS/GPT/Nemo Super/Nemo Ultra component specs)
- **Proposed:** 2026-10-19 · **By:** GLM · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** improvement
- **Problem / idea:** four validation scripts are named in the docs but absent — the "Checked" field of every future submission is hollow, and Claude has no reproducible acceptance test.
- **Proposal (architecture — Claude implements within the single-file, no-dependency constraints):**
  1. **SIM-CORE extraction**: the product file gains two marker comments delimiting a DOM-free core — `/*SIM-CORE-START*/ … /*SIM-CORE-END*/` — around the pure math (weights, valuation, lineup, schedule, game sim, standings). Claude moves the pure functions inside the markers **without changing behavior**, E2E-verified before/after in the same round.
  2. **`pw4.js`**: node script — reads `NFL Draft Simulator.html`, slices the SIM-CORE block, evaluates it in isolation, runs 100 headless seasons, correlates per-team projected wins (roster valuation) vs simulated wins; **require r > 0.6**; prints sack-leader avg/max per season (feeds risk (c)); exits non-zero on regression.
  3. **`validate.js`**: same extraction; simulates the 2025 season against a **real-2025 wins table embedded in the script** (32 teams × 17 games, hardcoded, no network); targets **r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6**.
  4. **`phone.js`**: static 390px lint, no DOM, no installs — flags horizontal-overflow risks: fixed px widths > 390, grid/table min-widths, `white-space: nowrap` on stat tables, missing `@media (max-width:760px)` rules. Declared honestly: a lint, not a render check — the browser 390px pass remains the authority.
  5. **`tests/run_all.sh`**: `node --check` on the extracted script → pw4 → validate → phone; non-zero exit on any failure.
  6. **Structural-manifest check** (guards complete-file delivery): `tests/manifest.txt` lists top-level function names; `run_all.sh` greps the current product file for each — a vanished function fails CI-style, even if the demo works.
  **Amendment (same day — from DS's measured probes, S-101/S-102; these four points change the spec above):**
  - The `r > 0.6` gate in item 2 would be a **no-op**: pooled r measured 0.946–0.959 on this build (margin ~0.35), while per-season r means 0.38–0.50. Primary gate becomes **drift against a recorded baseline** (`tests/baseline.json`, written once from the certified build, then frozen); `r > 0.60` stays only as a sanity floor. Report both pooled and per-season r — the per-season statistic is the sensitive one.
  - Markers must enclose **data, module-level state and caches — not just functions**: `PLAYERS`, `TEAM_DATA`, `DEFAULT_WEIGHTS`, `ROSTER_SLOTS`, `FLEX`/`NATURAL_SLOT_MAP`/`SLOT_GROUP`, `POS_SLOT_MAP`, `SEASON_RECORD_CAPS`, `PER_GAME_CAP`, `POINTS_PER_WIN`, plus `seasonState`, `draftSim`, `weights`, `_wTable` and friends — the engine reads the `seasonState` global (the app itself swaps it in and out around its own 100-season loop). Markers around functions alone give Claude a block with **no entry point**.
  - Three **DOM-free entry points** are required inside the core — straight moves of already-DOM-free code, no new logic: `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft` (DS's S-102 carries the full current/replacement code).
  - The harness must assert the marked block contains **0 `document.`/`window.` references** — the boundary claim becomes checkable instead of prose. Measured today: 0 across the engine (lines ~1900–2400). Known inconsistency to baseline while marking: `startSeason` sets `returners`, the 100-season league did not (DS found it; S-102's unified builder fixes it — baseline the 100-season report before/after).
- **Blast radius:** the only product-file change is the marker comments (and any function moves they imply). Everything calling into the marked core must stay resolved — Claude must E2E-verify before/after within the round. Scripts live outside the HTML; product behavior unchanged when marked correctly.
- **Evidence:** none — this is new tooling; its job is to make everyone else's claims reproducible.
- **Checked:** no product change yet, entry is spec-only; targets cited from AGENTS.md.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

### S-203 — tests/2025_standings.js: real-2025 NFL standings dataset (validate.js ground truth; took over the withdrawn OpenClaw assignment)
- **Proposed:** 2026-10-19 · **By:** GLM · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** improvement — new test data + a new test file; **no product-file change**
- **Problem / idea:** GPT's S-502 (`validate.js`) has exactly one external input: a hardcoded real-2025 standings table. That dataset was OpenClaw's round-1 assignment (S-602, never filed); the user withdrew OpenClaw from the process before it filed anything (19 Oct). GLM has web access, so this session took the component over and compiled the dataset the same turn.
- **Proposal:** Claude creates **`tests/2025_standings.js`** with exactly the content below (one new file, nothing else). The format follows GPT's S-502 contract verbatim — `module.exports` is an array of `[teamName, wins, losses, ties, pointDiff]`, `teamName` matching `TEAM_DATA` keys **exactly**, so validate.js needs zero name mapping and its 10 integrity checks run on load as specified.
- **Code (full file content — NEW data, quoted in full per rule 3):**

```js
// tests/2025_standings.js — real 2025 NFL regular-season standings; ground truth for validate.js (S-502).
// Row: [teamName, wins, losses, ties, pointDiff]. teamName == TEAM_DATA keys exactly.
// Compiled 2026-10-19 by the GLM session (S-203). Two independent sources fetched the same day;
// they agree on W-L-T-PF-PA for all 32 teams (no uncertain rows):
//   1. NFL.com league standings, season 2025 regular season — https://www.nfl.com/standings/league/2025/REG
//   2. Wikipedia, "2025 NFL season", § 6 Regular season standings
// Scope: the 2025 NFL regular season only (Sep 4, 2025 – Jan 4, 2026). pointDiff = PF − PA per source.
// Integrity (S-203 log): 32 rows · every row 17 team-games (272 games total) · ΣW=ΣL=271 · ΣT=2 (DAL, GB) · ΣPF=ΣPA=12,519 · Σnet=0.
module.exports = [
  ["Arizona Cardinals", 3, 14, 0, -133],
  ["Las Vegas Raiders", 3, 14, 0, -191],
  ["NY Jets", 3, 14, 0, -203],
  ["Tennessee Titans", 3, 14, 0, -194],
  ["NY Giants", 4, 13, 0, -58],
  ["Cleveland Browns", 5, 12, 0, -100],
  ["Washington Commanders", 5, 12, 0, -95],
  ["Cincinnati Bengals", 6, 11, 0, -78],
  ["Kansas City Chiefs", 6, 11, 0, 34],
  ["New Orleans Saints", 6, 11, 0, -77],
  ["Dallas Cowboys", 7, 9, 1, -40],
  ["Miami Dolphins", 7, 10, 0, -77],
  ["Atlanta Falcons", 8, 9, 0, -48],
  ["Baltimore Ravens", 8, 9, 0, 26],
  ["Carolina Panthers", 8, 9, 0, -69],
  ["Indianapolis Colts", 8, 9, 0, 54],
  ["Tampa Bay Buccaneers", 8, 9, 0, -31],
  ["Detroit Lions", 9, 8, 0, 68],
  ["Green Bay Packers", 9, 7, 1, 31],
  ["Minnesota Vikings", 9, 8, 0, 11],
  ["Pittsburgh Steelers", 10, 7, 0, 10],
  ["Chicago Bears", 11, 6, 0, 26],
  ["Los Angeles Chargers", 11, 6, 0, 28],
  ["Philadelphia Eagles", 11, 6, 0, 54],
  ["Buffalo Bills", 12, 5, 0, 116],
  ["Houston Texans", 12, 5, 0, 109],
  ["Los Angeles Rams", 12, 5, 0, 172],
  ["San Francisco 49ers", 12, 5, 0, 66],
  ["Jacksonville Jaguars", 13, 4, 0, 138],
  ["Denver Broncos", 14, 3, 0, 90],
  ["New England Patriots", 14, 3, 0, 170],
  ["Seattle Seahawks", 14, 3, 0, 191]
];
```

- **Blast radius:** none on `NFL Draft Simulator.html`. Sole consumer is `tests/validate.js` (S-502, also new tooling). Row order is the NFL.com league-table order (ascending win%) — validation is order-independent; the order just makes row-by-row source auditing easy.
- **Evidence:** both sources fetched 2026-10-19 (league context from the same sources: Seattle beat New England in Super Bowl LX, Feb 8, 2026; top seeds Seattle/Denver/New England all 14-3; two ties league-wide, Dallas and Green Bay). Note on tooling honesty: the `websearch` tool cancelled itself repeatedly this turn; the two fetches above succeeded directly (search authorization was granted mid-turn but not needed).
- **Checked:** mechanical integrity run on the compiled table this session (node): 32 rows; name set byte-equal to the `TEAM_DATA` key set — the only renames needed from the omnibus source names are `NY Giants`/`NY Jets`, exactly the pitfall GPT's spec predicted; every row W+L+T = 17; ΣW = ΣL = 271; ΣT = 2; 272 games total = 544 team-games (= 32 × 17); **ΣPF = ΣPA = 12,519** (each game counted from both sides — the conservation check); Σnet = 0; pointDiff = PF − PA holds for every row. PF/PA pairs and their nets were kept during compilation and dropped from the export per GPT's 5-field contract.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

<!-- glm:end -->

## DS (DeepSeek Flash)

### S-101 — DS assessment: three build risks; Round 2 should fix the harness precondition first
- **Proposed:** 2026-10-19 · **By:** DS · **Applies to build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes, `shasum -a 256` verified against `STATUS.md`)
- **Type:** assessment
- **Problem / idea:** three risks. (1) blocks the round-1 harness itself; (2) means the acceptance rule as drafted cannot fail; (3) means the elite-sack question cannot be answered by the audit as it stands.

  **(1) The SIM-CORE as specced in S-202 is not runnable — the core is global-state coupled and every entry point is DOM-coupled.**
  - `startDraft2()` reads the form before it builds any state: `document.getElementById('draftSlotSelect').value` (line 1401) and `draftPickNumberSelect` (1403). The DOM-free construction is exactly lines **1404–1425**, but it is not callable on its own.
  - `simToEnd()` (1480) is DOM-free in its loop, but ends in `finishDraft2()` (6125), which calls `optimizeCpuLineups()` (6126) and `applyLineup(user, optimalLineup(user.slots))` (6131–6132) and then renders.
  - `liteSeason(L, agg)` (5857) is DOM-free, but it calls `playGame` (3420), which reads the **global** `seasonState` (`seasonState.teams` / `.league` / `.runDir` / `.ratingsDirty`, 3421–3428), and `computeRegularSeasonAwards()` (5711+), which reads `seasonState` directly. That is why `runLeague100` has to swap the global in and out around the loop (5944–5946). The core is **not** a pure function of its arguments — markers around it give Claude a block of code with no entry point.
  - The same league bootstrap is written **twice** — `startSeason` 3392–3400 and `runLeague100` 5935–5939 — and the two copies already disagree in one field (`returners` is set by `startSeason` but absent from the 100-season league, so the report sims seasons with no returners while a real season has them).
  - Consequence: pw4 must either reimplement the draft/league bootstrap (harness diverges from the product — the exact failure the harness exists to prevent) or the product gains three small DOM-free entry points. See S-102's "Product precondition".

  **(2) `r > 0.6` is a no-op gate, and its value is an artefact of averaging, not of model quality.**
  - Measured with the product's own functions (no reimplementation), three independent drafts: pooled r — projected `lineupWins(optimalLineup(slotmap))` vs mean simulated wins — = **0.946** (40 seasons), **0.954** (80 seasons), **0.959** (80 seasons). Minimum margin over the 0.60 floor: **0.346**.
  - The per-season statistic is a different animal: mean r **0.382** / **0.453** per draft, min 0.043/0.192, max 0.623/0.723 — clearing 0.6 in only **3 of 40** and **5 of 40** seasons. So the same build passes or fails the gate depending purely on whether the script averages.
  - The arithmetic is consistent: within-team season-to-season σ = **1.99** wins, between-team talent σ ≈ **0.84–1.14** projected / **0.96–1.14** realised. Per-season r ≈ 1.0/√(1.0²+1.99²) ≈ **0.45** (measured 0.38–0.50 ✓); averaged over 100 seasons r ≈ 1.0/√(1.0²+1.99²/100) ≈ **0.98** (measured 0.95 ✓). The snake draft deliberately equalises talent, so pooling 100 seasons — not any model improvement — is what produces the high number.
  - Recommendation: pw4 gates on **drift against a recorded baseline** captured from the verified build (`tests/baseline.json`), with `r > 0.60` kept only as a sanity floor. It should report both r definitions, and re-draft (`--drafts K`): a valid r here has **n = 32 rosters from one draft**, and seasons are not i.i.d. — in both probe drafts the second 40-season block scored **+0.05** higher on per-season r than the first, with no change to the model (state/`planCache` warms across seasons).

  **(3) `SEASON_RECORD_CAPS` distorts the exact tail the elite-sack question (S-201c) asks about.**
  - `accumulatePlayerStats()` clamps the running regular-season total (3411–3414): once a cumulative stat passes the cap it is rewritten to `Math.max(before, CAP - Math.floor(Math.random()*35))`. `SEASON_RECORD_CAPS.sack = 21` (3419).
  - Measured: capped sack-leader max = **21, 21** (the cap, exactly, in both drafts) with ≥20 counts of 10/40 and 6/40. With the cap lifted in-harness (`SEASON_RECORD_CAPS.sack = 9999` — the `const` binding blocks rebinding, not property writes) the max is **24** and **22**, ≥20 counts 6/40 and 5/40. The sim *does* produce 22–24 sack seasons; the audit rewrites them and parks leaders in the 20–21 band. "17.1 avg / 21 max" is therefore a property of the cap, not of the model, and (c) cannot be decided until it is measured uncapped. (The ≥20 count moving *down* when the cap is lifted is suggestive but confounded by block order — see risk 2.)
  - Withdrawn: I previously suspected the DL-only sack-leader filter (`agg.leaders.sack` 5908, thresholds 5915) hides linebacker leaders. Across **160 measured seasons no linebacker ever led the league**, so I withdraw it as a live defect; the one-season observation that prompted it did not hold up.
  - Bonus for the harness: **0 score/event mismatches** in 160 seasons (~45,600 games, regular + playoffs) — the v10 fix holds on the `liteSeason` path; and headless cost is **~75 ms/season** (80 seasons ≈ 6 s), so the app's 45–60 s for 100 seasons is the `setTimeout` yielding loop (5945–5949), not the math. The harness can afford far more seasons and drafts than planned.
- **Proposal:** no product code in this entry. **Round 2 should attack (1)** — it is the only item that blocks the others, it is a behaviour-preserving move of already-DOM-free line ranges rather than new logic, and pw4 cannot exist without it. Risk (3) then folds into pw4's design for free (`--caps both`); risk (2) changes pw4's acceptance rule, not its plumbing. S-102 carries the spec.
- **Blast radius:** none (no code). If (1) is accepted, the blast radius is the three callers named in S-102 plus the `returners` field, which is the one delta that could shift the 100-season report's numbers — baseline the report before and after.
- **Evidence:** all figures from read-only probe scripts run against this exact file over `file://` in Chromium, using the product's own functions (`buildDraftState` equivalents, `liteSeason`, `newAgg`, `lineupWins`, `pearson`) — never a reimplementation. 4 independent drafts, 40/80 seasons each, ~30,000 simulated games; 0 page errors. Commands: `node ds_pw4_probe.js`, `node ds_pw4_probe2.js` (temp dir, not in the project). Analytic r values cross-check the measured ones as shown above.
- **Checked:** read-only. No file edited; no claim of `pw4.js` existing; all line numbers cited from the current build.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

### S-102 — pw4.js: internal 100-season regression (DS component)
- **Proposed:** 2026-10-19 · **By:** DS · **Applies to build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`
- **Type:** improvement
- **Problem / idea:** the harness needs a script whose failure means something. As drafted (S-202 item 2), pw4 runs 100 seasons and requires r > 0.6 — on this build that passes with a 0.35 margin (S-101 risk 2), so it detects nothing. This spec keeps the r check but makes **drift against a recorded baseline** the gate, adds a second sensitive r statistic, measures the sack tail uncapped, and asserts the two structural invariants that are cheap and exact.
- **Proposal:**

  **CLI** (`node tests/pw4.js [file] [options]`; `[file]` defaults to `../NFL Draft Simulator.html`):
  | flag | default | meaning |
  |---|---|---|
  | `--seasons N` | 100 | seasons per block |
  | `--drafts K` | 2 | fresh headless drafts (each is a new roster sample) |
  | `--seed S` | 20261019 | seeds the sandbox PRNG — runs are reproducible |
  | `--caps on\|off\|both` | both | `on` = as shipped; `off` = record caps lifted; `both` = run a capped block then an uncapped block per draft |
  | `--baseline P` | tests/baseline.json | drift reference |
  | `--write-baseline` | — | write `P` from this run (only on the build being certified) |
  | `--json` | off | one JSON object per draft, then a `summary` object |
  | `--quiet` | off | summary + failures only |
  Exit codes: **adopt `tests/CONTRACT.md` C2/C4 in full, superseding the earlier 0/1/2 mapping** — 0 pass · 1 regression · 2 data/artefact integrity (manifest mismatch, **missing `baseline.json` without `--write-baseline`** — a fresh clone must not silently skip the gate) · 3 extraction failure (missing/blank markers, or the core touching `document.`/`window.`) · 4 usage / product file not found. Rationale for the change: a boundary failure must look the same in every `tests/` script, and a missing baseline must not read as a product regression.

  **Checks and thresholds**
  | id | check | kind | threshold |
  |---|---|---|---|
  | C1 | `modelWeights()[s] / slotWinsPerOvr()[s]` constant across slots (AGENTS invariant 1: the 700-scale is the inverse) | hard | relative spread < 1e-6 |
  | C2 | min starter OVR per CPU roster at draft end (records the 76-OVR floor's effect) | drift | within ±2 of baseline |
  | C3 | Hungarian optimality: for 5 teams, every single-slot and pairwise swap among starters must not improve `lineupWins` | hard | 0 improving swaps |
  | M1 | pooled r — `lineupWins(optimalLineup(slotmap))` vs mean wins | floor | ≥ 0.60 |
  | M2 | pooled r | drift | \|Δ\| ≤ 0.05 |
  | M3 | per-season r mean (the sensitive statistic — changes far more than M1) | drift | \|Δ\| ≤ 0.05 |
  | M4 | sack leader avg (as shipped) | drift | \|Δ\| ≤ 0.75 |
  | M5 | sack leader max, and count ≥22 **uncapped** (answers S-201c) | drift | max within ±2; count within ±2 |
  | M6 | ties rate; home-win rate; points/game; OT rate | drift | within ±0.3 pp / ±1.0 pt of baseline |
  | M7 | leader avg/max for pass, rush, rec yards | drift | within ±120 yd (records the caps' effect) |
  | M8 | score/event invariant: every played game's events sum to its final score, regular and playoffs | hard | 0 mismatches |
  | M9 | out-of-phase starters (slot phase ≠ player phase, via `SLOT_GROUP`/`NATURAL_SLOT_MAP`) per draft | report + drift | makes S-201(b) measurable instead of anecdotal |
  | M10 | boundary, proved at run time not by grep: evaluate the marked core in a scope whose `document`/`window` throw on any property access; every function named in `tests/manifest.txt` present | hard | 0 touches / all present |
  | M11 | draft realism — the U-12 evidence: per draft, round-1 picks under 90 OVR (count + share, with QB picks called out separately), the OVR gap to the best player still on the board at each pick (median / p90 / max), and the share of bottom-tier-position picks (K, TE, RB2…) that were the best available at that position. Computed from `draftSim.log`, which already records `{round, pickInRound, overall, teamIndex, player, slot}` — no product change, no extra simulation | report + drift | no pass threshold in Round 1; U-12 sets the targets once the first baseline exists |

  Baseline is written **once**, from the build whose hash `STATUS.md` certifies, and is then frozen; every later run compares against it. `--write-baseline` on an uncertified build is the one way to disarm the gate, so it prints a loud warning and the build hash it recorded.

  **Output (human)**
  ```
  pw4 · NFL Draft Simulator.html · sha256 77bb9ed5… · 650,127 bytes
  core · markers ok · 1,2xx lines · DOM refs 0 · 38 functions checked
  run  · 2 drafts × 100 seasons · caps both · seed 20261019 · 31.4 s
  draft 1 · r 0.951  per-season r 0.41 (min 0.04 max 0.72, >0.6  6/100)
          · sack 17.7/21 capped · 17.8/24 uncapped (22+ 1) · ties 0.31% · out-of-phase 4.4/team
  draft 2 · r 0.956  per-season r 0.46 (min 0.19 max 0.72, >0.6  9/100)
          · sack 17.6/21 capped · 17.3/22 uncapped (22+ 1) · ties 0.29% · out-of-phase 4.5/team
  games · 57,000/57,000 events sum to final score · points/game 44.2 · OT 6.1%
  C1 ok · C3 ok (0 improving swaps in 10 teams) · C2 77.4 (baseline 77.9)
  PW4: r=0.951 PASS
  PASS · floor 0.60 · drift within tolerance vs tests/baseline.json
  ```
  Failure line, e.g.: `FAIL · M2 pooled r 0.951 → 0.842 (Δ 0.109 > 0.05)`. The `PW4: r=<value> PASS|FAIL` line exists so Nemo Super's `tests/run_all.sh` (S-301) can parse it; `r` = minimum pooled r across drafts.

  **Code sketch — node side** (no dependencies; `vm` is in node core):
  ```js
  const fs = require('fs'), vm = require('vm');
  const src = fs.readFileSync(FILE, 'utf8');
  const core = src.split('/*SIM-CORE-START*/')[1].split('/*SIM-CORE-END*/')[0];
  if (!core) die(2, 'MISSING: SIM-CORE markers');
  if (/\bdocument\.|\bwindow\./.test(core)) die(2, 'core is not DOM-free');
  const sb = { console, Math: Object.create(Math), Date, JSON };
  sb.globalThis = sb;
  const mulberry32 = a => () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  sb.Math.random = mulberry32(SEED);                      // products' 38 Math.random sites become deterministic
  vm.createContext(sb);
  vm.runInContext(core + '\n;globalThis.__PW4__ = function(cfg){/* driver, below */};', sb, { filename: 'sim-core.js' });
  const report = sb.__PW4__({ seasons: SEASONS, drafts: DRAFTS, caps: CAPS });
  ```
  The driver is **appended to the same source** (not a second `runInContext`) because the core's top-level `const`/`let` — `SEASON_RECORD_CAPS`, `seasonState`, `draftSim`, the caches — are lexical bindings of that script; appended code sees them, and `globalThis.__PW4__` carries results back out.

  **Code sketch — driver side** (the loop; all calls are the product's own):
  ```js
  globalThis.__PW4__ = function (cfg) {
    const out = [];
    for (let d = 0; d < cfg.drafts; d++) {
      simulateDraftHeadless('__random__', 'random');     // fresh 32-team CPU draft, no DOM
      const { L, names } = buildLeagueFromDraft();       // same builder the app uses
      const user = names.find(n => L.teams[n].isUser), agg = newAgg(names, user);
      const proj = {}; names.forEach(n => proj[n] = lineupWins(L.teams[n].slotmap));
      const px = names.map(n => proj[n]);
      const prev = seasonState; seasonState = L;          // the core reads this global
      const block = (n) => {
        const perR = [], sack = [], bad = [];
        for (let i = 0; i < n; i++) {
          liteSeason(L, agg);
          perR.push(pearson(px, names.map(x => agg.teams[x].w[i])));
          const rows = Object.values(L.playerStats).filter(r => r.group === 'DL' || r.group === 'LB')
            .sort((a, b) => (b.st.sack || 0) - (a.st.sack || 0));
          sack.push(rows[0] ? (rows[0].st.sack || 0) : 0);
          L.schedule.concat(['wildcard','divisional','champ','superbowl'].flatMap(k => (L.playoffRounds[k] || [])))
            .forEach(g => { const r = g.result; if (!r || !r.homeEvents) return;
              const h = r.homeEvents.reduce((t, e) => t + e.pts, 0), a = r.awayEvents.reduce((t, e) => t + e.pts, 0);
              if (h !== r.homeScore || a !== r.awayScore) bad.push([g.home, g.away]); });
        }
        return { perR, sack, bad };
      };
      const capped = block(cfg.seasons);
      const cap0 = SEASON_RECORD_CAPS.sack; SEASON_RECORD_CAPS.sack = 9999;   // const object: property write is allowed
      const uncapped = block(cfg.seasons);
      SEASON_RECORD_CAPS.sack = cap0; seasonState = prev;
      out.push({ draft: d + 1, pooled: pearson(px, names.map(n => mean_(agg.teams[n].w))), capped, uncapped });
    }
    return out;
  };
  ```
  Note on `--caps both`: the two blocks run in order, and block order itself shifted per-season r by ~+0.05 in both probe drafts with no model change — so the cap delta is reported per block and never attributed to the cap alone without that caveat. If Claude prefers, run the blocks in alternating order (capped, uncapped, uncapped, capped) and report the pair.

  **Product precondition (S-101 risk 1).** pw4 needs three DOM-free entry points inside SIM-CORE. Each is a straight move of already-DOM-free code; no logic added. Current code below is referenced by **line range against build `31b7d61f…`** (v20 — the Owner's reference build since 19 Oct; canonical `77bb9ed5…` ranges noted alongside). Rule 3 as amended, build attached; the three new functions and all three replacements are quoted in full.

  *New:*
  ```js
  // DOM-free draft bootstrap — the state-building half of startDraft2 (was lines 1404-1425, verbatim).
  function buildDraftState(userTeamName, pickChoice){
   const teamNames = Object.keys(TEAM_DATA);
   let shuffled, userIndex;
   if(pickChoice === 'random'){
    shuffled = teamNames.slice();
    for(let i=shuffled.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]; }
    userIndex = shuffled.indexOf(userTeamName);
   } else {
    userIndex = parseInt(pickChoice,10)-1;
    const others = teamNames.filter(t=>t!==userTeamName);
    for(let i=others.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [others[i],others[j]]=[others[j],others[i]]; }
    shuffled = new Array(32);
    shuffled[userIndex] = userTeamName;
    let oi=0;
    for(let i=0;i<32;i++){ if(i!==userIndex) shuffled[i]=others[oi++]; }
   }
   const rosters = [];
   for(let i=0;i<32;i++) rosters.push({slots:{}, isUser:i===userIndex, teamName: shuffled[i]});
   return { userIndex, rosters, teamNames: shuffled,
    pool: PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).sort((a,b)=>(b[3]-a[3])||(a[0]<b[0]?-1:1)),
    order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false };
  }

  // DOM-free draft + the lineup finalization finishDraft2 does (was simToEnd 1482-1486 + finishDraft2 6126-6132).
  function simulateDraftHeadless(userTeamName, pickChoice){
   draftSim = buildDraftState(userTeamName, pickChoice);
   while(draftSim.pos < draftSim.order.length){
    const t = draftSim.order[draftSim.pos];
    const pk = cpuPick(t);
    if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
   }
   draftSim.awaitingUser = false;
   optimizeCpuLineups();
   const user = draftSim.rosters[draftSim.userIndex];
   applyLineup(user, optimalLineup(user.slots));
   return draftSim;
  }

  // DOM-free league construction — one builder for startSeason, runLeague100 and the harness.
  function buildLeagueFromDraft(opts){
   opts = opts || {};
   const base = seasonState;
   const entries = draftSim ? draftSim.rosters.map(r=>({teamName:r.teamName, slotmap:r.slots, isUser:r.isUser})) : null;
   if(!entries) return null;
   const teams = {}; entries.forEach(e=>{ teams[e.teamName] = {pool:Object.values(e.slotmap).filter(Boolean), slotmap:e.slotmap, isUser:e.isUser}; });
   const names = Object.keys(teams), league = leagueBaseline(names.map(n=>teams[n].slotmap));
   const unitRatings = {}; names.forEach(n=>{ unitRatings[n] = teamRatings(teams[n].slotmap); });
   const L = {teams, schedule:buildFullSchedule(names), currentWeek:1, weekSimulated:false, phase:'regular',
    playerStats:{}, playerStatsPO:{}, league, unitRatings, unitRanks:computeUnitRanks(unitRatings), identity:{},
    planCache:(base&&base.planCache)||{}, userPlan:{mode:'auto',pers:'auto',strat:'auto',pkg:'auto',focus:'auto'},
    scriptLocked:false, preseason:!!opts.preseason};
   names.forEach(n=>{ L.identity[n] = teamIdentity(unitRatings[n], league); });
   L.returners = {}; names.forEach(n=>{ L.returners[n] = autoReturner(teams[n].slotmap); });
   return {L, names};
  }
  ```

  *Changed —* `startDraft2()` — current code: **lines 1408–1446** of build `31b7d61f…` (v20, 39 lines; canonical `77bb9ed5…`: 1397–1435). 1410/1412/1414 are the DOM reads; **1415–1436** is the state-building half that moves verbatim into `buildDraftState()`; 1437–1445 is the banner/panel/`processUntilUserTurn()` tail, unchanged.
  *Replacement:*
  ```js
  function startDraft2(){
   draftUI = newDraftUI();
   { const d=(id,v)=>{ const e=document.getElementById(id); if(e) e.value=v; }; d('draftSort2','ovr'); d('draftView2','table'); d('draftPosFilter2','all'); d('draftSearch2',''); }
   seasonState = null; league100 = null; // a new draft invalidates any in-progress/completed season
   let userTeamName = document.getElementById('draftSlotSelect').value;
   if(userTeamName==='__random'){ const all = Object.keys(TEAM_DATA); userTeamName = all[Math.floor(Math.random()*all.length)]; }
   const pickChoice = document.getElementById('draftPickNumberSelect').value;
   draftSim = buildDraftState(userTeamName, pickChoice);
   if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }
   setSpeedButtons();
   const abbr = TEAM_ABBR[userTeamName] || userTeamName.slice(0,3).toUpperCase();
   document.getElementById('draftingAsBanner').innerHTML =
    `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${draftSim.userIndex+1} overall pick (Round 1)</div>`;
   document.getElementById('draftSetup').style.display='none'; { const gh = document.getElementById('draftGuideHost'); if(gh) gh.style.display='none'; }
   document.getElementById('draftFinalResults').style.display='none';
   document.getElementById('draftLive').style.display='block';
   processUntilUserTurn();
  }
  ```

  *Changed —* `startSeason()` — current code: **lines 3371–3381** of build `31b7d61f…` (v20, 11 lines; canonical `77bb9ed5…`: 3391–3401). Its body *is* the bootstrap that moves into `buildLeagueFromDraft()`; the only call-site specifics are `planCache: {}` (base is `null` here, so the builder's `(base && base.planCache) || {}` gives the same) and `preseason: true`, which the `{preseason:true}` argument preserves.
  *Replacement:*
  ```js
  function startSeason(){
   const built = buildLeagueFromDraft({preseason:true});
   if(!built) return;
   seasonState = built.L;
  }
  ```
  (`buildResultEntries()` is untouched — its `draftEntries` map `slotmap/pool/teamName/isUser` to exactly what `buildLeagueFromDraft` builds, and nothing else in the season path reads them.)

  *Changed —* `runLeague100()` — current code: **lines 5880–5903** of build `31b7d61f…` (v20, 24 lines; canonical `77bb9ed5…`: 5930–5953). 5885–5889 are the duplicated bootstrap this replaces (they become `buildLeagueFromDraft()`); 5891–5902 — the progress panel, the `seasonState` swap, the `liteSeason` loop and the `render100` handoff — are reproduced unchanged in the replacement below.
  *Replacement:*
  ```js
  function runLeague100(N, container){
   const built = buildLeagueFromDraft();
   if(!built) return;
   const L = built.L, names = built.names;
   const user = names.find(n=>L.teams[n].isUser), agg = newAgg(names, user);
   container.innerHTML = `<div class="panel"><h3 style="margin-top:0;">Simulating 100 seasons…</h3><div style="background:var(--border,#ccc);height:10px;border-radius:5px;overflow:hidden;"><div id="sim100Bar" style="height:10px;width:0%;background:var(--accent);"></div></div><p class="narr" id="sim100Txt">Starting…</p></div>`;
   let done = 0;
   const step = ()=>{
    const prev = seasonState; seasonState = L;
    try{ const t0 = Date.now(); while(done<N && Date.now()-t0<120){ liteSeason(L, agg); done++; } }
    finally{ seasonState = prev; }
    const bar = document.getElementById('sim100Bar'), txt = document.getElementById('sim100Txt');
    if(bar) bar.style.width = (done/N*100)+'%'; if(txt) txt.textContent = `Season ${done} of ${N}…`;
    if(done<N) setTimeout(step, 0);
    else { league100 = {agg, L:{unitRatings:L.unitRatings, unitRanks:L.unitRanks, league:L.league, identity:L.identity, teams:L.teams, names}, user, N, scores:null}; render100(container); }
   };
   setTimeout(step, 20);
  }
  ```

  **Optional, same round:** widen the 100-season progress slice (5945, `Date.now()-t0<120`) — headless the same work runs at ~75 ms/season, so the freeze users see is the yielding loop, not the math.
- **Blast radius:** creates `tests/pw4.js` + `tests/baseline.json` only. The three product edits (plus three additions) are behaviour-preserving with one exception to verify: the unified builder gives the 100-season league a `returners` map and `preseason/weekSimulated/scriptLocked/schedule` keys it previously lacked — `preseason:false` and the others are falsy/unused as before, but `returners` could change return-yard/TD figures in the 100-season report. Record that report before and after the refactor; if it shifts, that is the (previously invisible) inconsistency being fixed, and the baseline must be captured from the post-refactor build. Callers of `runLeague100`/`startSeason`/`startDraft2` and of `buildResultEntries()` are unchanged; `liteSeason`, `playGame`, `simulateGame`, `matchupModel`, `slotWinsTable`, `optimalLineup` and `cpuPick` are not touched at all.
- **Evidence:** the numbers in the sample output are DS's measured values, not guesses (S-101's Evidence field names the probes and sample sizes: pooled r 0.946/0.954/0.959, per-season r 0.38–0.50, capped sack max 21/21, uncapped 24/22, 0 event mismatches in 160 seasons, ~75 ms/season). Every function pw4 calls was exercised read-only in-browser over `file://` before this entry was written.
- **Checked:** untested — `pw4.js` does not exist, so nothing here has been run as written; the sketched logic (extraction-free part: draft → league → 100 seasons → metrics → caps lifted) was executed by hand against this build with 0 page errors. No product file was edited. `node --check` cannot be reported for code that has not been created.
- **Overlap (Claude arbitrates):** with GLM **S-202** — S-202 owns the markers and the manifest; this entry owns pw4's CLI, metrics and gates, and adds three requirements to the marker boundary: (i) the marked core must contain the embedded data (`PLAYERS`, `TEAM_DATA`, `DEFAULT_WEIGHTS`, `ROSTER_SLOTS`, `FLEX`/`NATURAL_SLOT_MAP`/`SLOT_GROUP`, `POS_SLOT_MAP`, `SEASON_RECORD_CAPS`, `PER_GAME_CAP`, `POINTS_PER_WIN`) and the module-level state and caches (`seasonState`, `draftSim`, `weights`, `_wTable` and friends); (ii) the boundary must be proved at run time, not by a text check: the core is evaluated in a scope whose `document`/`window` throw on any access, and all three entry points plus the 100-season loop must finish without one touch (M10). A static "no `document.` inside the markers" assertion is **not achievable on this build**: 110 of its 181 `document.`/`window.` references sit between the data block (401–456) and line 3942, interleaved with core math — `buildControls()` calls `document.getElementById` at 459, and `renderHomeComparison`/`wireStatsTabs`/`wireScheduleClicks` (3328/3609/3815) sit between core functions. Making a contiguous span text-clean would mean moving ~40 UI functions, which is not a Round-1 change; (iii) markers alone are not enough — the three entry points above are required. With Nemo Super **S-301** — `run_all.sh` owns the composite runner; my output deliberately includes the `PW4: r=<value> PASS|FAIL` line S-301 parses, where `r` is the minimum pooled r. Confirms and makes measurable GLM **S-201(b)** (out-of-phase count, M9) and **(c)** (uncapped sack tail, M5).
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

### S-103 — tests/funcdiff.js: function-level build differ (sixth component)
- **Proposed:** 2026-10-19 · **By:** DS · **Applies to build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)
- **Type:** improvement
- **Problem / idea:** a whole-file delivery has no diff, so the verifier can confirm that *what was asked for* is present but not that *nothing else* changed. The structural manifest (S-202 item 6) catches a **deleted** function; it cannot catch a **mutated** one. This round is the concrete case: S-102 proposes edits to six functions in a 650 KB artifact, and today the only check is a human reading it. `funcdiff` turns that into a set comparison: the functions whose text changed in the new build must be exactly the functions the round was allowed to touch.
- **Proposal:**

  **CLI** — `node tests/funcdiff.js <old.html> <new.html> [options]`
  | flag | default | meaning |
  |---|---|---|
  | `--expect LIST\|FILE` | — | names the round was allowed to touch. Comma-separated, or a path (one name per line, `#` comments). Pseudo-units are nameable: `#markup`, `#style0`, `#style1`, `#glue` |
  | `--allow-unchanged` | off | downgrade "expected but did not change" from FAIL to NOTE (Claude may implement a submission differently than the proponent described; the verification report must then say why) |
  | `--json` | off | one JSON object, no human table |
  | `--normalize` | off | additionally hash with whitespace runs collapsed; cosmetic-only changes carry `~` and do not change the verdict |
  | `--no-const` | off | do not index top-level `const/let/var` (they are indexed by default — that is how `PLAYERS`/`TEAM_DATA` edits become visible) |
  | `--manifest PATH` | — | write the new build's unit list (`name`, line range, bytes, sha256) for `run_all.sh`'s manifest check |
  | `--self-test` | — | run the scanner's own fixture suite and exit (no file arguments needed) |
  | `--quiet` | off | verdict and failures only |
  | `--max-report N` | 40 | cap each section's listing, print `… and N more` |

  **Units indexed.** Every top-level `function NAME(…) {…}` and every top-level `const/let/var NAME = …;` in the script block, plus four pseudo-units that close the holes:
  - `#markup` — the HTML with `<script>`/`<style>` *contents* removed (attributes, structure and the document shell included). This is the class of bug that bit us in v10 (duplicate document shell) and that no function-level diff can see.
  - `#style0`, `#style1` — each `<style>` element's contents (v20 has two: 372 B and 25,872 B; canonical `77bb9ed5…`: 377 B and 20,186 B).
  - `#glue` — script text outside every unit (top-level wiring, event listeners, IIFEs). Without it, a delivery could change `document.addEventListener(...)` at top level and every unit would still hash identical.

  The v20 reference indexes to **541 units** (409 functions + 128 declarations + 4 pseudo); the canonical merge parent `77bb9ed5…` indexes to 543. `funcdiff` prints the counts it found, so a scanner regression cannot hide: a plausible-looking run with 200 units is a harness error, not a clean build.

  **Output — human (pass):**
  ```
  funcdiff · old  backup-before-reorg/NFL Draft Simulator (GLM verified build).html   8,742,113 B  sha256 3a41c9e0…
           · new  NFL Draft Simulator.html                                            650,127 B  sha256 77bb9ed5…
  units · 543 new (412 fn · 127 decl · 4 pseudo) · 543 old · 536 unchanged · 0 anomalies
  changed (5)
    simulateGame           1204–1240 → 1204–1243   +3 ln     +612 B
    accumulatePlayerStats  3405–3418 → 3405–3421   +3 ln     +180 B
    startSeason            3391–3401 → 3391–3396   −5 ln     −640 B
    runLeague100           5930–5953 → 5932–5955   +2 ln     +402 B
    #style0                   4–4    →   4–4        +0 ln        +9 B   ~
  added (2)
    buildDraftState           —      → 1404–1425   +22 ln   +1,046 B
    buildLeagueFromDraft      —      → 3391–3420   +30 ln   +1,271 B
  removed (0)
  EXPECT ok · 7/7 expected names touched · 0 unexpected · 0 absent
  FUNCDIFF: PASS
  ```
  **Output — human (fail):**
  ```
  FUNCDIFF: FAIL · unexpected change: render100 (not in --expect)
                · removed: simToEnd (expected by no submission)
  ```
  Notes that the samples encode deliberately: bytes are always printed because the two biggest units are **single lines** (`PLAYERS` line 401, 83,716 B; `TEAM_DATA` line 402, 42,506 B) — a line-range delta of `0` there means nothing; a `+1,200 B` means a rating table changed. And `~` appears only with `--normalize`, so "the CSS was reindented" never masquerades as a logic change.

  *The sample uses the canonical build as "new" for continuity. Under R2 the reference is v20: 541 units (409 + 128 + 4), style blocks 372 B + 25,872 B, `PLAYERS` at line 449.*

  **Verdict logic** (this is the whole point of the tool):
  1. `unexpected = (changed ∪ added ∪ removed) − expect` → non-empty ⇒ **FAIL**.
  2. `absent = expect − names(new)` → non-empty ⇒ **FAIL** (an expected function that no longer exists is a deletion, not a no-op).
  3. `missed = expect ∩ names(new) − changed` → **FAIL** by default (AGENTS.md: the sets must be *equal*), **NOTE** with `--allow-unchanged`.
  4. Without `--expect`: report only, exit 0 — the tool is then a differ, not a gate.
  5. If `old.sha256 === new.sha256`: print `identical` and assert 0 changes (built-in round-trip check).

  **Exit codes:** `0` clean · `1` verdict failure · `2` harness error (file unreadable, no script block, scanner anomaly, unknown `--expect` name that is also not a pseudo-unit, `--self-test` failure).

  **Scanner contract.** This is the only part that can silently lie, so it is specified and self-checked rather than hand-waved:
  - Walk the script block with a **mode stack** and record which byte positions are *code*: skip `//` and `/* */` comments, `'…'` and `"…"` strings (with escapes), template literals — a `` ` `` pushes `tpl`, `${` pushes `code`, the matching `}` pops back to `tpl`, so `${…}` bodies are code and template text is not — and regex literals, entered only where a value cannot end (`/[\w$)\]}`"']/` heuristic).
  - Track brace depth over code positions only. At depth 0, match `function\s+NAME\s*\(` (not preceded by a value char) and slice from the keyword to the brace that closes its body; match `^(const|let|var)\s+NAME\s*=` and slice to the next depth-0 `;`.
  - Use sticky regexes with `lastIndex` (no `slice()` allocation per candidate — 539 matches over 620 KB).
  - **Self-checks, hard failures:** every unit's braces balance; spans are disjoint and inside the block; `Σ spans + Σ gaps === block.length` (nothing silently dropped); no duplicate names; every unit non-empty.
  - **`--self-test`** ships ~8 synthetic fixtures inside the file and asserts the expected verdict on each: nested braces · brace inside a template literal · brace inside a regex literal · the word `function` inside a comment and inside a string · an arrow function in a `const` · a single-line const object · a nested function (must be attributed to its parent, not indexed separately) · a template with `${ {a:1} }` inside.

  **Code sketch** (plain node; `crypto` for hashing — no dependencies):
  ```js
  const fs = require('fs'), crypto = require('crypto');
  const sha = s => crypto.createHash('sha256').update(s).digest('hex');

  // 1. split the file into blocks, keeping byte offsets so lines can be reported
  function blocks(html) {
    const out = { js: [], css: [], markup: html };
    for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) out.js.push({ at: m.index + m[0].indexOf('>') + 1, text: m[1] });
    for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))             out.css.push({ at: m.index + m[0].indexOf('>') + 1, text: m[1] });
    return out;
  }

  // 2. mark every byte that is real code (see contract above)
  function codeMap(js) { /* mode stack: comments · '…' · "…" · `tpl ${ code }` · /regex/ */ }

  // 3. recover top-level units: [name, start, end]
  function units(js, code) {
    const list = []; let depth = 0, i = 0;
    while (i < js.length) {
      if (!code[i]) { i++; continue; }
      if (depth === 0) {
        const fn = /function\s+([A-Za-z_$][\w$]*)\s*\(/y; fn.lastIndex = i;
        const m = fn.exec(js);
        if (m) { const end = closeBrace(js, code, js.indexOf('{', fn.lastIndex));
                 list.push({ name: m[1], start: i, end }); i = end; continue; }
        const dc = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/y; dc.lastIndex = i;
        const d = dc.exec(js);
        if (d && INCLUDE_CONST) { const end = semiAtDepth0(js, code, dc.lastIndex);
                                  list.push({ name: d[1], start: i, end }); i = end; continue; }
      }
      if (js[i] === '{') depth++; else if (js[i] === '}') depth--;
      i++;
    }
    return list;
  }

  // 4. units that moved show as changed; that is correct — the diff is about text,
  //    and a function that moved without changing is reported with `=` for equal hash
  //    and its new line range, never as added+removed (match by name, not by position).
  ```
  The last comment matters for the verifier's expectations: **matching is by name, not by byte position**, so a round that moves code (like S-102's hoists) produces `changed` entries with new line ranges plus `added` entries for the new helpers — never a spurious `removed`+`added` pair for the same name.

  **JSON shape** (`--json`):
  ```json
  {"old":{"file":"…","bytes":8742113,"sha256":"…","units":543},
   "new":{"file":"…","bytes":650127,"sha256":"…","units":543},
   "changed":[{"name":"simulateGame","oldLines":[1204,1240],"newLines":[1204,1243],
               "oldBytes":8122,"newBytes":8734,"whitespaceOnly":false}],
   "added":[{"name":"buildLeagueFromDraft","newLines":[3391,3420],"newBytes":1271}],
   "removed":[],
   "pseudo":[{"name":"#markup","changed":false},{"name":"#style0","changed":true,"whitespaceOnly":true}],
   "expect":{"list":["simulateGame","…"],"missed":[],"unexpected":[],"absent":[]},
   "verdict":"PASS"}
  ```

  **How the verifier uses it** (ties to AGENTS.md §Test obligations, item 5):
  ```bash
  node tests/funcdiff.js "backup-before-reorg/NFL Draft Simulator (GLM verified build).html" \
                         "NFL Draft Simulator.html" \
       --expect runLeague100,startSeason,startDraft2,accumulatePlayerStats,#glue
  ```
  Exit 0 is the verification report's sixth line; exit 1 is the finding. With no previous build on disk (first round after a baseline reset), run `--manifest tests/manifest.txt` instead and hand the names to `run_all.sh`.
- **Blast radius:** creates `tests/funcdiff.js` only; no product-file change; reads two HTML files read-only. It validates *delivery*, not *correctness*: a build where every changed function was expected can still be wrong, and `funcdiff` will pass it — that is pw4/validate/phone's job, and the verifier's report must not conflate them. It also cannot see changes outside the file (nothing to see) or judge whether a changed function was changed *well*.
- **Evidence:** unit counts and block sizes measured on v20 `31b7d61f…` (`grep -c '^function '` → 409; `^(const|let|var) ` → 128; `^(if|for|while|switch)\(` → 0, which is what makes depth-0 `;` slicing unambiguous; 1 script block; 2 style blocks 372 B + 25,872 B; `PLAYERS` line 449 = 83,716 B, `TEAM_DATA` line 450 = 42,506 B on single lines — hence byte deltas in the output; canonical `77bb9ed5…` measures 412 / 127, 377 B + 20,186 B, lines 401/402, same data bytes). The need is evidenced by this round: S-102 touches six functions in a 649 KB artifact, and the current contract gives the verifier no way to prove that only those six moved.
- **Checked:** untested — the script does not exist, so no run is claimed. The structural facts above are measured; the scanner contract and `--self-test` fixtures are the design's answer to "how do we know the scanner is right".
- **Overlap (Claude arbitrates):** with GLM **S-202** item 6 — the structural manifest becomes *generated* (`--manifest`) instead of hand-maintained, and the marker block's unit list falls out of the same scan; if S-202's markers are rejected, `funcdiff` still works on the whole script block, so this entry does not depend on them. With Nemo Super **S-301** — `run_all.sh` gains one optional step (`funcdiff` when a previous build is supplied); my `FUNCDIFF: PASS|FAIL` line is greppable like `PW4:` and `VALIDATE:`. Ordered before the behavioural gates is deliberate: it is the cheapest check and it fails on the class of error that no behavioural gate can see.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

<!-- ds:end -->

## Nemo Super

### S-300 — Assessment: three build risks, harness first
- **Proposed:** 2026-10-19 · **By:** Nemo Super · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** assessment
- **Problem / idea:** three risks blocking reliable iteration:
  - **(a) No regression harness exists.** pw4.js, validate.js, phone.js, tests/run_all.sh are named in AGENTS.md but absent (ONBOARDING.md §Testing truth). Every submission's "Checked" field defaults to "untested"; Claude has no reproducible acceptance gate. This is the meta-risk that makes every other risk invisible.
  - **(b) Mobile layout has hardcoded px widths that overflow at 390px.** CSS carries fixed widths outside the @media (max-width:760px) block: `.wrap{max-width:1200px}` (line 27), `.layout{grid-template-columns:340px 1fr}` (line 30), `.filters input{min-width:160px}` (line 59), `.posbtn{min-width:160px}` (line 65), `.poslist{min-width:230px}` (line 66), `.cardgrid{minmax(250px,1fr)}` (line 202), inline `grid-template-columns:1fr 1fr` at multiple `.draft-columns` instances (lines 1208, 1233, 3650, 3750, 3897, 5344, 5805). The @media block exists but is incomplete for a 390px viewport.
  - **(c) modelWeights() ↔ slotWinsPerOvr() inverse invariant is untested.** cpuPick (line 1342) depends on slotWinsTable() → slotWins() → slotWinsPerOvr() → modelWeights(). If the inverse drifts, CPU draft valuation and season simulation diverge silently. cpuPick also carries new round-order floors (lines 1348–1358, v10 patch) that need regression coverage.
- **Proposal:** no code in this entry — Claude **ranks (a)/(b)/(c)** with a one-line reason each and confirms Round 2 = the harness first, making (b) and (c) measurable.
- **Blast radius:** none (no code).
- **Evidence:** CSS line numbers from the current build read read-only; risk (c) function chain from cpuPick() → slotWinsTable() → modelWeights() read read-only; (a) confirmed absent by directory listing (no pw4.js/validate.js/phone.js/tests/).
- **Checked:** read-only reads only; no code executed.
- **Status:** pending
- **Implementer's note:** —

### S-301 — tests/run_all.sh composite runner + mobile acceptance criteria
- **Proposed:** 2026-10-19 · **By:** Nemo Super · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** improvement
- **Problem / idea:** Round 1 needs a single composite runner that gates the build hash. pw4.js (DS), validate.js (GPT), phone.js (Nemo Ultra) do not exist yet; this spec defines run_all.sh's contract and the mobile-acceptance thresholds it should enforce once those scripts exist.
- **Proposal:** `tests/run_all.sh` — a shell script with this CLI and output contract:
  - CLI: `./tests/run_all.sh [product_html]`
  - Steps in order, non-zero exit on first failure:
    1. `node --check` on the extracted script block (SIM-CORE block per GLM's S-202 markers, or the whole inline `<script>` if markers absent). Output: `CHECK: OK` or `CHECK: FAIL <stderr>`.
    2. `node pw4.js` — 100-season internal regression; require r > 0.6; output: `PW4: r=<value> PASS/FAIL` plus sack-leader avg/max per season.
    3. `node validate.js` — real-2025 external validation; targets r≈0.66, ρ≈0.69, RMSE≈2.6; output: `VALIDATE: r=<value>, rho=<value>, rmse=<value> PASS/FAIL`.
    4. `node phone.js` — static 390px lint; output: `PHONE: <n> overflow risks PASS/FAIL` with each risk listed (file:line:pattern).
  - Exit code: 0 if all pass, 1 if any fail. Prints `RUN_ALL: PASS` or `RUN_ALL: FAIL (<first failing step>)`.
  - Mobile acceptance thresholds (enforced by phone.js output, interpreted by run_all.sh): (i) no fixed `width:` > 390px outside `@media (max-width:760px)`; (ii) no `grid-template-columns`/`min-width` > 390px outside `@media (max-width:760px)`; (iii) no `white-space: nowrap` on stat-table cells without a 760px override; (iv) every `grid-template-columns:1fr 1fr` inline style on `.draft-columns` must be collapsed to `1fr` at 390px via `@media (max-width:760px)`; (v) tap targets ≥ 44×44 px at 390px; (vi) data-label attributes present on every `table.mstack` td.
  - Dependencies: none beyond node. pw4/validate/phone are declared as required siblings; run_all.sh fails gracefully (exit 1, message `MISSING: <script>`) if any is absent rather than crashing.
  - **phone.js exit contract (amendment):** exit 0 = clean lint, exit 1 = lint findings found, exit 2 = usage/parse error — a hard build failure, not a lint finding (contract note: `tasks/ROUND-1.md`).
- **Blast radius:** creates new file `tests/run_all.sh` only; no product-file changes; references GLM’s SIM-CORE markers but does not add them.
- **Evidence:** current build has no tests/ directory; component specs for pw4/validate/phone are in SUBMISSIONS.md (DS S-1xx, GPT S-5xx, Nemo Ultra S-4xx).
- **Checked:** untested (no scripts exist yet); read-only directory listing confirms absence.
- **Status:** pending
- **Implementer's note:** —

### S-303 — Re-base S-300/S-301 evidence citations from `77bb9ed5…` to v20 `31b7d61f…`
- **Proposed:** 2026-10-19 · **By:** Nemo Super · **Applies to build:** `31b7d61f…` (v20 reference per R2) — amendment to S-300/S-301, which cited `77bb9ed5…`
- **Type:** improvement (administrative)
- **Problem / idea:** Owner ruling R2 made v20 `31b7d61f…` the reference build and `77bb9ed5…` a donor of fixes. My S-300 risk citations (cpuPick line 1342, slotWinsTable 1268, slotWins 1283, slotWinsPerOvr 1288) and S-301's harness target were measured on `77bb9ed5…`. Under R2 they measure the donor, not the reference. No proposal content changes; only the build hash each entry measures.
- **Proposal:** File this amendment; no code. Future citations in my section name `31b7d61f…` unless explicitly measuring the donor for comparison.
- **Blast radius:** none (metadata only).
- **Evidence:** STATUS.md line 14 (reference build v20 `31b7d61f…`, 649,032 bytes) and line 15 (donor `77bb9ed5…`, 650,127 bytes); CHRONICLE lines 10–11 (R2 ruling); both files verified via `shasum -a 256` this session.
- **Checked:** read-only `shasum -a 256` on both files; `wc -c`; command output recorded above.
- **Status:** pending
- **Implementer's note:** —

### S-304 — phone.js exit-code alignment with contract v2
- **Proposed:** 2026-10-20 · **By:** Nemo Super · **Applies to build:** `31b7d61f…` (v20 reference per R2) — amendment to S-301
- **Type:** improvement (administrative)
- **Problem / idea:** My S-301 amendment assigned phone.js exit 2 = usage/parse error (hard build failure). CONTRACT v2 C4 assigns exit 2 = data-integrity violation, exit 4 = usage error. Entry-wins rule (CONTRACT C4) says my entry governs phone.js, but contract text was applied to `tests/CONTRACT.md`. Align S-301 with contract v2.
- **Proposal:** Replace S-301's exit-code line with: exit 0 = clean lint, exit 1 = lint findings found, exit 4 = usage/parse error or missing file.
- **Blast radius:** none (S-301 text edit only, my own section).
- **Evidence:** `tests/CONTRACT.md` lines 17–21 (exit-code league); SUBMISSIONS.md S-301 line 607 (my original amendment).
- **Checked:** read-only read of `tests/CONTRACT.md`; S-301 text in SUBMISSIONS.md line 607.
- **Status:** pending
- **Implementer's note:** —

<!-- nemosuper:end -->

## Nemo Ultra

### S-400 — Nemo Ultra assessment: three mobile/layout risks in the current build
- **Proposed:** 2026-10-19 · **By:** Nemo Ultra · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** assessment
- **Problem / idea:** the v10 build passed a manual 390px browser check, but a static audit reveals structural patterns that will regress on the next CSS edit. Three risks ranked by blast radius:
  1. **(a) Fixed min-widths > 390px on critical inputs** — `.filters input { min-width: 160px }`, `.posbtn { min-width: 160px }`, `.poslist { min-width: 230px }`, `table.linescore { min-width: 320px }`, `.confirm-box { max-width: 420px }`. These are not guarded by `@media (max-width:760px)` overrides and will force horizontal scroll on 390px viewports. The current browser pass may have missed them because they only trigger in specific view states (filter dropdown open, position list open, linescore table, confirm dialog).
  2. **(b) Grid-template-columns with fixed px tracks** — `.layout { grid-template-columns: 340px 1fr }`, `.draft-columns { grid-template-columns: 1fr 300px }`, `.metricrow { grid-template-columns: 140px 1fr 40px }`, `.bracket-game.bg3 { grid-template-columns: 1fr 78px 1fr }`, `.kp-grid { grid-template-columns: 1fr 1fr }`. Only `.layout` and `.draft-columns` have `@media (max-width:860px)` overrides; the rest lack any mobile breakpoint and will exceed 390px when content expands.
  3. **(c) Inline `white-space: nowrap` on data-bearing elements** — `.poslist label { white-space: nowrap }`, `.needslabel { white-space: nowrap }`. These are wrapped by `@media (max-width:760px) [style*="white-space:nowrap"] { white-space: normal !important }` but only for inline `style` attributes — the class-based rules on `.poslist label` and `.needslabel` are **not** overridden, so long labels in the position dropdown and needs checkbox will still force overflow.
- **Proposal:** no code this entry. Recommendation for Round 2: attack (a) first — it is the most user-visible (filter bar, position dropdown, confirm dialog) and the fix is purely additive CSS in the existing `@media (max-width:760px)` blocks. (b) and (c) require auditing all 12+ inline grid-template-columns usages across the JS template literals.
- **Blast radius:** none (assessment only).
- **Evidence:** manual grep of the current build (lines 30, 37, 59, 65, 66, 93, 106, 108, 118, 121, 132, 144, 152, 159, 163, 211, 215–251, 5022, plus inline `style="grid-template-columns:…"` at lines 1233, 3650, 3750, 3897, 5344, 5805, 6066, 6068).
- **Checked:** `node --check` on the current product file passes; manual 390px browser pass was clean at v10 ship time; this assessment identifies patterns that regress on CSS edits without a static lint.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

### S-401 — phone.js: static 390px overflow lint (Nemo Ultra component for regression harness)
- **Proposed:** 2026-10-19 · **By:** Nemo Ultra · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** improvement
- **Problem / idea:** the regression harness needs a static phone lint that runs in plain Node (no DOM, no installs, no browser). The current mobile CSS audit is manual and regresses silently. `phone.js` will be a lint, not a render check — it parses the product HTML's `<style>` block and inline `style` attributes, flags horizontal-overflow patterns, and exits non-zero on findings. The browser 390px pass remains the authority; this is a pre-commit guard.
- **Proposal (spec for the `phone.js` script):**

**CLI:** `node phone.js <path-to-NFL Draft Simulator.html>` — single positional argument; exits 0 if clean, 1 if any finding.

**Checks (all operate on raw HTML source, no evaluation):**

| Check | Pattern | Threshold / Logic | Exit on |
|-------|---------|-------------------|---------|
| 1. Fixed px `width` / `min-width` / `max-width` > 390 | Regex on `<style>` + inline `style=` | Any value `> 390` not inside `@media (max-width: ≤760px)` block | First occurrence |
| 2. Grid `grid-template-columns` with fixed px track | Regex on `<style>` + inline `style=` | Any track like `340px`, `300px`, `140px`, `40px`, `78px`, `28px`, `46px`, `56px`, `36px`, `14px` not inside `@media (max-width: ≤760px)` | First occurrence |
| 3. Table `min-width` > 390 | Regex | `min-width: 320px` (linescore) etc. | First occurrence |
| 4. `white-space: nowrap` on stat/data elements | Regex on class rules + inline | `white-space: nowrap` not overridden by `@media (max-width: ≤760px)` for that selector | First occurrence |
| 5. Missing mobile breakpoint for grids with fixed tracks | Heuristic: any `grid-template-columns` with a fixed px track that lacks a corresponding `@media (max-width: ≤760px)` rule targeting the same selector (or a wildcard `[style*="grid-template-columns"]`) | Warning (exit 0 but stderr) |
| 6. `max-width` on fixed-position overlays > 90vw | `.fxbanner { max-width: 90vw }`, `.fxtoast { max-width: 92vw }` | OK — viewport-relative; flag only if `max-width` uses px > 390 | — |

**Output format (stdout, one line per finding):**
```
PHONE-LINT: <file>:<line>:<check-id>: <description>
```
Example:
```
PHONE-LINT: NFL Draft Simulator.html:30:GRID-FIXED: .layout uses grid-template-columns: 340px 1fr (fixed track 340px > 390px viewport)
PHONE-LINT: NFL Draft Simulator.html:59:MIN-WIDTH: .filters input min-width: 160px (unguarded at ≤760px)
```

**Exit codes:**
- `0` = no findings (clean)
- `1` = one or more findings (fail)
- `2` = usage error / file not found / parse error

**Implementation notes:**
- Pure Node, zero dependencies. Parse HTML with regex/string ops (no JSDOM, no cheerio).
- Extract `<style>` block: match `/<style>([\s\S]*?)<\/style>/` and inline `style="…"` attributes.
- Track media-query nesting: maintain a stack of active `@media` conditions while scanning the `<style>` block line-by-line.
- For inline `style=` attributes on elements generated by JS template literals, scan the raw HTML for `style="grid-template-columns:` and `style="white-space:nowrap"` patterns.
- **Honest declaration:** this is a lint. It cannot measure actual rendered width, flex-wrap behavior, or content-driven overflow. The browser 390px pass remains the gate.

**Integration:** `tests/run_all.sh` runs `node --check <extracted-script> && node pw4.js && node validate.js && node phone.js`; any non-zero exit fails the round.

- **Blast radius:** new file `phone.js` at project root; no product-file change; no dependencies.
- **Evidence:** the patterns above are drawn from the current build grep (see S-400). No prior lint exists — this creates the first reproducible mobile check.
- **Checked:** `node --check` on the current product file passes. This spec is untested code — the implementation will be written by Claude if accepted.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —

<!-- nemoultra:end -->

## GPT

### S-501 — Three Process Risks in the Collective Review Protocol

**1. ID + title:** S-501 — Three Process Risks in the Collective Review Protocol

**2. Proposed:** 2026-10-19 · By: GPT · Applies to build: 77bb9ed59ffa (see STATUS.md)

**3. Type:** assessment

**4. Problem / idea**

This is a protocol-level assessment of the collective's collaboration architecture, submission workflow, verification gates, delivery contract, round structure, and separation of responsibilities. It is not a code-level assessment. The product file and shared project documents were not available for inspection.

Three process risks warrant attention:

1. **Specifications can be accepted without executable verification.** A submission may define an interface, test, or threshold precisely while still containing implementation errors. Because submissions are transcribed between sessions and the project is divided among multiple contributors, a correct-looking specification does not establish that the resulting script actually runs against the product.
2. **Regression gates can create false confidence.** Internal reproducibility and agreement with a frozen baseline do not establish real-world accuracy. Conversely, an external validation test can technically pass while being too permissive to detect a meaningful deterioration. Different gates can all pass without collectively establishing that the product is correct.
3. **Cross-session interfaces can fail at integration boundaries.** Contributors work from partial context and cannot necessarily inspect the same files. A script may assume different marker names, team identifiers, output formats, function signatures, or exit-code semantics from those implemented by another contributor. Verbatim transcription preserves the submission but cannot resolve contradictory assumptions.

**5. Proposal**

Address these risks in the following priority order.

**Priority 1 — Round 2 should attack executable integration and verification first.**

Require a single, reproducible integration run against the actual assembled project before accepting a round as complete. The integration report should identify the exact build, commands executed, exit codes, and results of each gate. Distinguish a specification being accepted from its implementation being verified.

For each component, establish three separate states:

- **Specified:** The expected behavior and interface are documented.
- **Implemented:** The component exists in the assembled project.
- **Verified:** The component was executed against that project, and its actual behavior was checked.

Only the third state constitutes a passing implementation gate.

**Priority 2 — Audit gate discrimination.**

Require every numerical gate to explain its baseline, sample size, threshold, and failure sensitivity. A test that passes almost any plausible implementation should not be treated as meaningful evidence of correctness. Where possible, verify that deliberately introduced defects are caught.

**Priority 3 — Establish explicit integration contracts before parallel implementation.**

Maintain a shared interface contract specifying filenames, data schemas, function signatures, output formats, error semantics, and ownership. Each contributor should identify assumptions that depend on another contributor's unfinished work. Resolve incompatibilities before the integration run rather than after failures occur.

For Round 1 specifically, the five-script architecture is a useful separation of concerns, but the composite runner must not substitute for checking whether the individual gates meaningfully discriminate correct from incorrect behavior.

**6. Code**

No product or script code proposed. This entry concerns collaboration and verification protocol.

Suggested integration-report format:

```text
BUILD: 77bb9ed59ffa
COMPONENT: <name>
SPECIFIED: PASS|FAIL
IMPLEMENTED: PASS|FAIL
EXECUTED: PASS|FAIL
EXIT: <0|1|2>
RESULT: PASS|FAIL|UNVERIFIED
EVIDENCE: <command and concise result>
```

Interpretation:

- `PASS`: The component was executed and met its acceptance criteria.
- `FAIL`: Execution or an acceptance criterion failed.
- `UNVERIFIED`: Execution or sufficient evidence is absent.

An exit code of `2` indicates a harness error for scripts following the Round 1 contract. A missing execution result must never be reported as a pass.

**7. Blast radius**

This proposal affects the collective's acceptance process, not the product's runtime behavior. It may add integration work to each round, but should reduce the risk of accepting incompatible scripts or ineffective regression gates. Existing component ownership, settled product-interface decisions, and the Round 1 scope remain unchanged.

**8. Evidence**

Protocol-level reasoning based on the collaboration architecture and constraints in the assignment packet.

No source files, executable scripts, or shared project documents were inspected. No empirical failure rate is claimed. The three risks are qualitative assessments supported by the concrete failure scenarios described above, not measured frequencies.

**9. Checked**

The assignment packet and its stated collaboration constraints were reviewed. The actual repository, product file, submission ledger, and assembled scripts were not accessible. No implementation or integration test was executed.

**10. Status:** pending

- **Implementer's note (user pastes Claude's decision here):** —

### S-502 — `validate.js`: Discriminating Team-Level Validation Against the 2025 NFL Season

**1. ID + title:** S-502 — `validate.js`: Discriminating Team-Level Validation Against the 2025 NFL Season

**2. Proposed:** 2026-10-19 · By: GPT · Applies to build: 77bb9ed59ffa (see STATUS.md)

**3. Type:** improvement

**4. Problem / idea**

The regression suite needs an external validation gate that measures whether the simulator's estimates correspond to actual NFL results, rather than merely checking whether the simulator continues to reproduce its own previous outputs.

The existing engine generates its own schedule. Therefore, directly comparing its simulated games with actual 2025 matchups is not appropriate for this component.

The proposed comparison is between:

- A model-generated, per-team estimate of wins for the 32 teams using the shipped 2025 team ratings.
- The actual number of regular-season wins earned by each of those teams in 2025.

The validation script must address four risks:

1. **Undefined statistics.** Correlation and error metrics are meaningless unless the prediction, target, sample, and aggregation method are specified.
2. **Trivial thresholds.** A test can pass while having little power to detect model deterioration.
3. **Data-interface failures.** Missing teams, mismatched team names, or inconsistent standings can invalidate the comparison.
4. **False confidence from correlated checks.** Pearson correlation, Spearman correlation, and RMSE provide different views of model performance, but they are not independent confirmations because they use the same teams and predictions.

The published reference targets are approximately `r = 0.66`, `rho = 0.69`, and `RMSE = 2.6`. These must be defined precisely and treated as reference points until the actual shipped-roster results are measured.

**5. Proposal**

Implement a dependency-free Node.js script, `validate.js`, which extracts the DOM-free simulation core, computes one expected-win estimate per team, validates those estimates against a separately maintained 2025 standings dataset, and prints one machine-readable summary line.

The script must not modify the product file. The only product-file change permitted in this round remains the agreed `SIM-CORE` marker insertion.

### A. CLI contract

From the project root:

```bash
node validate.js
```

Optional diagnostic mode:

```bash
node validate.js --verbose
```

The default invocation must emit exactly one summary line to standard output, suitable for consumption by `tests/run_all.sh`.

Verbose mode may emit diagnostics to standard error. It must still emit the same summary line to standard output.

No external packages, network access, installations, paid services, or additional product-file changes are permitted.

The script resolves its input files relative to its own directory, not the caller's current working directory.

Required inputs:

```text
NFL Draft Simulator.html
validate.js
tests/2025_standings.js
```

The standings file is a data-only JavaScript file. It must not import modules, execute external commands, or perform network requests.

If the agreed dataset is delivered under another filename, the dataset filename must be updated consistently in the script and integration contract before acceptance.

### B. Dataset contract

OpenClaw's S-602 supplies the actual 2025 standings. This specification does not invent or prepopulate the results.

Required file: `tests/2025_standings.js`

Required format:

```javascript
'use strict';

module.exports = [
  // One entry per NFL team, using the exact TEAM_DATA key.
  // [teamName, wins, losses, ties, pointDiff]
];
```

Each entry has exactly five fields:

| Field | Type | Meaning |
|---|---|---|
| `teamName` | String | Exact key in the product's `TEAM_DATA` object |
| `wins` | Integer | Actual 2025 regular-season wins |
| `losses` | Integer | Actual 2025 regular-season losses |
| `ties` | Integer | Actual 2025 regular-season ties |
| `pointDiff` | Integer | Actual regular-season points scored minus points allowed |

**Name matching policy:** The dataset must use `TEAM_DATA` keys exactly. No implicit aliases, fuzzy matching, normalization, or guessed abbreviations are permitted. If OpenClaw's source uses a different name, the dataset author must resolve it explicitly before submission.

Point differential is retained for traceability and potential later analysis. It is not used in the primary acceptance statistics.

**Required integrity checks:**

1. The dataset file exists and loads successfully.
2. It contains exactly 32 rows.
3. Every row has exactly five fields.
4. Team names are nonempty strings and unique.
5. Every team name matches exactly one key in `TEAM_DATA`.
6. Wins, losses, and ties are nonnegative integers.
7. For every team, `wins + losses + ties === 17`.
8. Point differential is an integer.
9. All 32 expected `TEAM_DATA` teams appear exactly once.
10. The resulting prediction vector contains exactly 32 finite numeric values.

Although the 2025 regular season is expected to have no ties, the script must verify the supplied table rather than silently assume that fact. If a team has a nonzero tie count, report it as a dataset inconsistency requiring review; do not silently change its wins or losses.

A missing file, malformed row, duplicate team, unmatched team, incomplete dataset, invalid record, or internally inconsistent record is a **harness error**: exit code `2`.

The dataset author should separately preserve source URLs and cross-check evidence in the project's submission or evidence ledger. The machine-readable file need not embed provenance into each numerical field.

### C. Define the prediction being validated

**Primary prediction: projected wins derived from shipped team ratings.**

For each team, derive a strength value from the actual team slot map in `TEAM_DATA` using the DOM-free functions available in the agreed simulation core.

Use the following functions as the initial interface contract:

- `teamRatings(slotmap)`
- `leagueBaseline(slotmaps)`
- `optimalLineup(slotmap)`
- `lineupWins(slotmap)`
- `computeUnitRanks`

The exact signatures and return shapes must be confirmed against the actual `SIM-CORE` implementation during integration. They cannot be established from the assignment packet alone.

The preferred prediction is the model's **deterministic expected-win estimate** for each team's shipped roster, calibrated to a 17-game season. It should not be a single randomly simulated season.

Why:

- A single season's win total includes substantial schedule and game-level randomness.
- The actual 2025 standings are a noisy realization of team strength, not a direct measurement of roster quality.
- A deterministic prediction makes the validation reproducible and makes observed changes more attributable to model changes rather than random draws.

If `lineupWins(slotmap)` already returns the intended projected wins, use it after verifying its semantics and inputs.

Otherwise, derive projected wins from the team's relative strength using the existing core's intended win-estimation method. Do not invent a new win model inside `validate.js` merely to make the metrics pass.

If the available functions cannot produce a defensible deterministic win estimate without additional, unapproved product changes, stop and report a harness error. Do not silently substitute a one-season simulation or manufacture an estimate.

### D. Metric definitions

Let `n = 32`.

For each team `i`:

- `pᵢ` = deterministic projected wins.
- `aᵢ` = actual 2025 regular-season wins.

Compute the following three statistics.

**Pearson correlation (`r`)**

The Pearson product-moment correlation between the 32-element vectors `p` and `a`:

`r = cov(p, a) / (sd(p) × sd(a))`

Use the standard sample covariance and sample standard deviations consistently. The divisor convention cancels in the correlation coefficient.

This measures the linear association between projected and actual wins.

**Spearman rank correlation (`rho`)**

The Pearson correlation between the ranks of `p` and `a`.

Use average ranks for tied values. Sort ascending for both vectors; reversing both rankings would produce the same correlation.

This measures whether the model ranks stronger and weaker teams correctly, including nonlinear relationships between ratings and wins.

**Root mean squared error (`RMSE`)**

`RMSE = sqrt(sum((pᵢ - aᵢ)²) / 32)`

Use all 32 teams and divide by 32, not 31.

This measures the magnitude of win-estimation error in wins per team.

All statistics must use the same 32 teams and the same prediction vector.

If either vector has zero variance, or any prediction is nonfinite, return a harness error rather than reporting undefined or misleading statistics.

### E. Acceptance thresholds and reference targets

The reference targets from AGENTS.md are:

| Metric | Reference target | Initial acceptance threshold |
|---|---:|---|
| Pearson `r` | 0.66 | `r >= 0.60` |
| Spearman `rho` | 0.69 | `rho >= 0.63` |
| RMSE | 2.6 wins | `RMSE <= 3.0` |

These are proposed initial thresholds, not empirically calibrated guarantees. They are intended to prevent accepting a model that materially misses the reference targets while avoiding the assumption that rounded target values are exact requirements.

**Critical limitation:** The thresholds must be checked against the actual shipped-roster predictions before they are accepted as a useful regression gate. No execution has established whether they pass, fail, or provide meaningful discrimination.

If the current model passes these thresholds with substantial margin, the collective must not interpret that as proof of strong validation. The thresholds must be recalibrated using measured baseline results and an explicit sensitivity test.

For a stronger acceptance test, record the initial three metrics as the reference baseline and compare future builds against that frozen result. A proposed deterioration gate is:

- Pearson correlation must not fall by more than `0.03`.
- Spearman correlation must not fall by more than `0.03`.
- RMSE must not increase by more than `0.15` wins.

These values are provisional engineering tolerances, not statistically estimated confidence limits. They should be finalized only after observing baseline stability and determining whether meaningful defects can exceed them.

**Recommended two-layer decision:**

1. **Absolute plausibility gate:** Require the three initial thresholds above.
2. **Frozen-baseline regression gate:** Require the three deterioration limits above, once an accepted baseline has been recorded.

The baseline must be generated from an explicitly accepted build, reviewed, and frozen in a committed file. It must not be regenerated automatically on every run, because doing so would allow regressions to redefine the expected result.

If no approved baseline exists, the script may run the absolute gate but must report that the regression gate has not yet been established. For the first accepted integration, baseline creation should be an explicit maintainer action, not an implicit side effect of ordinary validation.

The product requirements for the primary external metrics remain the reference points; the frozen-baseline check adds regression sensitivity rather than replacing external validation.

### F. Extraction and sandboxing

Follow the same extraction architecture as DS's `pw4.js`.

1. Read `NFL Draft Simulator.html` as text.
2. Locate the exact opening marker `/*SIM-CORE-START*/`.
3. Locate the exact closing marker `/*SIM-CORE-END*/` after the opening marker.
4. Extract the source between the markers.
5. Fail with exit code `2` if either marker is missing, duplicated unexpectedly, or incorrectly ordered.
6. Append a validation driver to the extracted source so it can access the core's top-level lexical bindings.
7. Evaluate the combined source using Node's `vm` module.
8. Return the computed results using `globalThis.__VALIDATE__`.

The extracted core is expected to include the embedded data, state, caches, and DOM-free entry points agreed for this round. The script must not execute the full page or depend on `document`, `window`, DOM events, or browser layout.

**Reproducibility:** Replace `Math.random` in the VM context with a deterministic seeded pseudorandom generator, using the same seed convention as `pw4.js` where possible. The deterministic projected-win calculation should not depend on random numbers, but fixed seeding protects any initialization or internal operations that do.

The exact seed must be documented in the script.

**Sandbox limitations:** Node's `vm` provides a separate JavaScript context but is not a security boundary for executing malicious code. Here it is an execution-isolation mechanism for trusted, locally supplied product source, not a claim that arbitrary untrusted JavaScript is safely sandboxed.

Use a bounded execution timeout where supported. Do not expose filesystem or network capabilities to the evaluated core.

The driver should fail if any required function or data binding is missing, and it must verify the shape and finiteness of its output before assigning it to `globalThis.__VALIDATE__`.

Because top-level `const` and `let` declarations in the evaluated source are lexical bindings, the driver must be appended to the same source rather than relying on a second `vm.runInContext` invocation to access them.

### G. Code sketch

The following is a structural sketch, not a verified drop-in implementation. Exact signatures and return shapes of the product's DOM-free functions must be confirmed during integration.

```javascript
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = __dirname;
const HTML_PATH = path.join(ROOT, 'NFL Draft Simulator.html');
const DATA_PATH = path.join(ROOT, 'tests', '2025_standings.js');

const START = '/*SIM-CORE-START*/';
const END = '/*SIM-CORE-END*/';

function fail(message) {
  throw new Error(message);
}

function extractCore(html) {
  const first = html.indexOf(START);
  const last = html.indexOf(END);

  if (first < 0 || last < 0 || last <= first) {
    fail('Missing or invalid SIM-CORE markers');
  }

  if (
    html.indexOf(START, first + START.length) !== -1 ||
    html.indexOf(END, last + END.length) !== -1
  ) {
    fail('Duplicate SIM-CORE markers');
  }

  return html.slice(first + START.length, last);
}

function validateStandings(rows, teamKeys) {
  if (!Array.isArray(rows) || rows.length !== 32) {
    fail('2025 standings must contain exactly 32 teams');
  }

  const keys = new Set(teamKeys);
  const seen = new Set();

  for (const row of rows) {
    if (!Array.isArray(row) || row.length !== 5) {
      fail('Each standings row must have exactly five fields');
    }

    const [name, wins, losses, ties, pointDiff] = row;

    if (typeof name !== 'string' || !name.length) {
      fail('Invalid team name');
    }

    if (seen.has(name)) {
      fail(`Duplicate team: ${name}`);
    }

    if (!keys.has(name)) {
      fail(`Unknown TEAM_DATA key: ${name}`);
    }

    for (const value of [wins, losses, ties]) {
      if (!Number.isInteger(value) || value < 0) {
        fail(`Invalid W-L-T value for ${name}`);
      }
    }

    if (wins + losses + ties !== 17) {
      fail(`W-L-T does not sum to 17 for ${name}`);
    }

    if (!Number.isInteger(pointDiff)) {
      fail(`Invalid point differential for ${name}`);
    }

    seen.add(name);
  }

  for (const name of keys) {
    if (!seen.has(name)) {
      fail(`Missing standings row for ${name}`);
    }
  }
}

function pearson(x, y) {
  if (x.length !== y.length || x.length < 2) {
    fail('Invalid Pearson inputs');
  }

  const mx = x.reduce((a, b) => a + b, 0) / x.length;
  const my = y.reduce((a, b) => a + b, 0) / y.length;

  let numerator = 0;
  let dx2 = 0;
  let dy2 = 0;

  for (let i = 0; i < x.length; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;

    numerator += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }

  if (dx2 === 0 || dy2 === 0) {
    fail('Correlation undefined: zero-variance vector');
  }

  return numerator / Math.sqrt(dx2 * dy2);
}

function averageRanks(values) {
  const order = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);

  const ranks = new Array(values.length);
  let i = 0;

  while (i < order.length) {
    let j = i + 1;

    while (
      j < order.length &&
      order[j].value === order[i].value
    ) {
      j++;
    }

    const averageRank = ((i + 1) + j) / 2;

    for (let k = i; k < j; k++) {
      ranks[order[k].index] = averageRank;
    }

    i = j;
  }

  return ranks;
}

function computeMetrics(predicted, actual) {
  if (
    predicted.length !== 32 ||
    actual.length !== 32 ||
    !predicted.every(Number.isFinite) ||
    !actual.every(Number.isFinite)
  ) {
    fail('Invalid prediction or target vector');
  }

  const r = pearson(predicted, actual);

  const rho = pearson(
    averageRanks(predicted),
    averageRanks(actual)
  );

  const rmse = Math.sqrt(
    predicted.reduce(
      (sum, value, i) => sum + (value - actual[i]) ** 2,
      0
    ) / 32
  );

  return { r, rho, rmse };
}
```

**Important implementation note:** The sketch covers extraction and metric mechanics, but deliberately omits the model-specific driver because the exact core function signatures and return shapes have not been verified. The final implementation must resolve those interfaces against the assembled core, not guess them.

The production script must also implement deterministic seeding, baseline loading and comparison, CLI parsing, output formatting, and robust error handling.

### H. Exact output and exit codes

The composite runner requires this summary format:

```text
VALIDATE: r=<value>, rho=<value>, rmse=<value> PASS
```

or:

```text
VALIDATE: r=<value>, rho=<value>, rmse=<value> FAIL
```

Format each metric to three decimal places.

Example of the **format only**, not a claim about actual results:

```text
VALIDATE: r=0.000, rho=0.000, rmse=0.000 FAIL
```

For a harness error, emit a parseable summary line with unavailable metrics represented as `NA`:

```text
VALIDATE: r=NA, rho=NA, rmse=NA FAIL
```

Write the diagnostic to standard error.

Exit codes:

- `0`: Metrics computed successfully and all active acceptance gates passed.
- `1`: Metrics computed successfully, but at least one active acceptance gate failed.
- `2`: Harness error, including missing files, malformed standings, marker errors, missing core functions, invalid prediction output, undefined metrics, or baseline corruption.

The script must never exit `0` merely because it could not calculate the metrics.

A valid numerical failure must report the actual computed metrics. A harness error must not fabricate numeric results.

### I. Required pre-acceptance sensitivity checks

Before treating this as an effective gate, verify the following against the assembled project:

1. **Perfect-prediction fixture:** Identical prediction and actual vectors produce `r = 1`, `rho = 1`, and `RMSE = 0`.
2. **Reversed-ranking fixture:** A strictly reversed ranking produces `r = -1` and `rho = -1`.
3. **Tied-rank fixture:** Equal values receive average ranks, and Spearman correlation remains correct.
4. **Malformed standings fixture:** A 31-team dataset, duplicate team, unknown team name, or invalid W-L-T record exits `2`.
5. **Missing-marker fixture:** Missing or malformed extraction markers exit `2`.
6. **Deterministic repeat:** Two executions on the same build and data produce identical metrics and the same exit code.
7. **Meaningful regression fixture:** A controlled change to the predictions that materially worsens the metrics is rejected by at least one active gate.

The controlled-defect test is essential. Merely executing the script successfully demonstrates functionality, not gate quality.

The fixture tests should exercise the metric functions independently where practical. They must not modify the shipped product or weaken the production thresholds.

### J. Acceptance sequence

The proposed integration sequence is:

1. Receive OpenClaw's S-602 standings file and source evidence.
2. Confirm exact team-name compatibility with `TEAM_DATA`.
3. Confirm the actual core function signatures and deterministic expected-win semantics.
4. Implement `validate.js` against those verified interfaces.
5. Run the malformed-input and metric fixtures.
6. Run the external validation against the shipped rosters.
7. Record the resulting baseline metrics and compare them with the reference targets.
8. Evaluate whether the absolute thresholds and frozen-baseline tolerances catch controlled regressions.
9. Accept the script only when both its execution behavior and its discrimination have been demonstrated.

If the actual shipped-roster results make the absolute thresholds trivial, tighten the acceptance design based on measured behavior and controlled defects. Do not claim that the target metrics have been achieved before executing the script.

**6. Code**

The code sketch in Section G is the proposed implementation outline. The final `validate.js` must be a complete, executable script satisfying Sections A–I. No product-file code change is proposed.

**7. Blast radius**

`validate.js` depends on the SIM-CORE markers, the exact `TEAM_DATA` key set, the headless API, the standings dataset, and the composite runner's output contract.

Potential regressions include:

- False failures caused by team-name mismatches.
- Invalid predictions caused by assumptions about the core's return values.
- False passes caused by overly permissive thresholds.
- Baseline drift if the reference file is regenerated without review.
- Misleading statistics if teams are omitted or paired in the wrong order.
- Nondeterministic results if initialization or prediction generation uses uncontrolled randomness.

The script must remain external to the product file. Its failure must not alter simulation behavior or stored product data.

**8. Evidence**

Evidence currently available:

- The assignment packet specifies a 32-team, 17-game regular-season validation.
- The assignment packet identifies the DOM-free functions and embedded `TEAM_DATA` required for the calculation.
- The assignment packet supplies the reference targets `r ≈ 0.66`, `rho ≈ 0.69`, and `RMSE ≈ 2.6`.

No empirical validation metrics are claimed. The product source, actual standings dataset, and function implementations were not inspected or executed. The initial thresholds and regression tolerances are proposals, not measured results.

When implemented, the script's evidence record should include the exact command, build identifier, dataset identity, team count, computed metrics, threshold decisions, baseline identity, and sensitivity-test outcomes. Pearson and Spearman correlation and RMSE must not be described as independent confirmations; they are complementary statistics computed from the same 32 observations.

**9. Checked**

The proposed data contract, extraction method, metric definitions, threshold structure, output contract, and failure semantics have been reviewed against the assignment packet.

The code sketch has not been executed. Its integration with the actual product core is unverified. The 2025 standings have not been supplied in this conversation, and no claims about actual team records or model performance are made.

**10. Status:** pending

- **Implementer's note (user pastes Claude's decision here):** —

<!-- gpt:end -->

## UK

### S-UK-1 — v20 critique: structural issues documented across Round-1/2/3 reviews (assessment)
- **Proposed:** 2026-10-20 · **By:** UK · **Applies to build:** `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (v20, 649,032 B, per STATUS.md)

**Summary of documented issues (synthesized from Pickle M-13/M-14/M-20, DS M-11/M-16, MiniMax M-22, OR M-22, VL, Nemo Ultra M-10/M-14, Beam Q-BEAM-1…5):**

**Must keep exactly (v20 soul):**
- Hero/stepper visual shell — polished onboarding flow
- Mobile draft board pattern (12-column CSS grid with `data-nostack="1"` opt-out) — Nemo Ultra documents this as superior to mstack approach
- CSS variable system (`--glow`, `--gold`, radial-gradient backgrounds)
- Draft board layout and "Value here" column with flex penalties visible
- Typography and visual hierarchy

**Must fix (documented structural debt):**
1. **Wrapper malformation** (Pickle M-13, Beam Q-BEAM-2): dual `<!doctype html>`, double `<html>`, `<head>`, `<body>`, duplicate `</body></html>` — 544-byte delta vs clean 648,486 B
2. **Dual `<style>` blocks with conflicting `color-scheme`** (Pickle M-13): line 1 `color-scheme:light` vs donor header `color-scheme:light dark` — Architect must decide
3. **No SIM-CORE markers** (Pickle, DS, MiniMax, OR, VL all confirm 0 in v20) — S-202 pending; CONTRACT.md v2 mandates `/*SIM-CORE-START*/` + three headless entry points
4. **58 unseeded `Math.random()` occurrences / 39 lines** (Pickle Round-2) — no reproducibility; Pickle Q-PICKLE-4 proposes harness-only `rng()` indirection
5. **No persistence** (`localStorage` = 0 in both builds) — Pickle Q-PICKLE-2
6. **126,222 B of data in two lines** (DS M-11) — `PLAYERS` array + `TEAM_DATA` on single lines; blocks streaming/parsing
7. **18 mutable globals; `seasonState` 188 refs** (DS M-11) — global state sprawl
8. **195 DOM refs + 87 listeners inside math zone** (DS M-11) — DOM contamination violates CONTRACT C2's intent
9. **10 dead functions, 13 dead CSS classes** (DS M-11) — dead code
10. **100-season report crashes** `ReferenceError: rWeights is not defined` at v20:6018 (MiniMax M-22) — merge-debt from donor's intact report
11. **Mobile table stacking lost after viewport change** (MiniMax M-22, VL) — v20:6416 keeps stale `dataset.msChecked` memo; 7,208 elements overflow after mobile→desktop→mobile

**Drop entirely:**
- The malformed wrapper entirely — replace with donor's clean structured header
- Duplicate `<style>` block — keep one (Architect decides `color-scheme`)
- Any dead code identified by arch-probe

**Evidence:** All findings cross-verified by Pickle (Round-2/3 independent extraction), DS (arch-probe 40 metrics + funcdiff), MiniMax (headless Chromium E2E + phone probe), OR (Playwright E2E), VL (E2E + phone). Evidence files in `_agents/pickle/evidence-round2.txt`, `_agents/pickle/evidence-round3.txt`, `_agents/ds/reviews/Peer-Review-Round2.md`, `_agents/minimax/evidence/`, `_agents/ds/tools/arch-probe.js`.

**Checked:** `node --check` on extracted functions (Pickle, DS); E2E draft→season→playoffs→Super Bowl (MiniMax, OR, VL — 0 console errors); 390px phone pass (MiniMax, VL, OR — page-level clean, 2 defects noted); funcdiff v20↔donor (DS: 408 common / 394 identical / 14 differ; Pickle: exact reproduction).

**Status:** pending

---

### S-UK-2 — Workflow improvement: ADVISOR-PLAYBOOK.md (improvement)
- **Proposed:** 2026-10-20 · **By:** UK · **Applies to build:** `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`

**Problem:** New agents spend hours reading 8+ protocol docs to learn "how we work." The ONBOARDING.md is a joiner prompt, not a reference. Common patterns (how to write a submission, how to extract a function for hashing, how to file a question, how to read CHRONICLE) are scattered.

**Proposal:** Create `ADVISOR-PLAYBOOK.md` (2–3 pages) in project root — a quick-reference for common operations:
- Submission template with examples (self-contained quote+replace, blast radius, evidence format)
- Function extraction cheat-sheet: `awk` patterns for whole-function extract + `shasum`
- Question filing: tag guide (`[BLOCKING]`/`[NOW]`/`[LATER]`/`[OPEN]`), where to place block
- CHRONICLE reading: how to trace a decision, find build hash for a claim
- Verification checklist: `node --check`, E2E steps, 390px test, console check
- Mirror sync: `tools/sync-mirrors.sh --check` when editing shared docs

**Blast radius:** New file only; no product changes; no existing doc modified.

**Evidence:** GLM's M-8 created `tools/sync-mirrors.sh` and `INDEX.md` as in-lane improvements; ONBOARDING v2.1 already points to "cheap, low-maintenance documents" as the scaling model.

**Checked:** N/A (document proposal only)

**Status:** pending

---

### S-UK-3 — Workflow improvement: MERGE-CHECKLIST.md (improvement)
- **Proposed:** 2026-10-20 · **By:** UK · **Applies to build:** `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`

**Problem:** The v20↔donor merge is the largest structural change yet; no checklist exists. Pickle Q-PICKLE-1/3/7/8, DS Q-DS-4, Beam Q-BEAM-2, Ultra Q-NEMOULTRA-1/2 all ask about merge resolution details. Without a checklist, the Architect must hold the entire merge state mentally.

**Proposal:** Create `MERGE-CHECKLIST.md` (1 page) with three phases:
- **Pre-merge:** protected-constant hash comparison (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS), function manifest diff (arch-probe), wrapper audit (doctype/html/head/body/style count), data-layer identity check (PLAYERS/TEAM_DATA byte-identical)
- **During merge:** keep-list tracking per function (take-parent or hybrid), CSS block tracking (ID/class coverage per Pickle), wrapper resolution (which header survives, color-scheme decision)
- **Post-merge:** verifier assignment, hash bump in STATUS.md, CHRONICLE entry with merged hash, mirror sync

**Blast radius:** New file only; no product changes.

**Evidence:** DS Round-2 keep-oracle (M-16) is the closest existing artifact but not a reusable checklist.

**Checked:** N/A (document proposal only)

**Status:** pending

---

### S-UK-4 — Workflow improvement: VERIFICATION-TEMPLATE.md (improvement)
- **Proposed:** 2026-10-20 · **By:** UK · **Applies to build:** `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`

**Problem:** AGENTS.md §5 requires a five-line verifier report + function-diff, but no template exists. Verifiers (Ultra for 1A, DS/GLM for 1B) must reconstruct the format each round.

**Proposal:** Create `VERIFICATION-TEMPLATE.md` (1 page) with:
- Five-line report template with filled example:
  ```
  hash: <sha256>
  E2E: draft→season→playoffs→Super Bowl complete, 0 console errors
  numbers: <command> n=<sample> → <metric>=<value> (e.g., pw4.js n=100 → r=0.67)
  console/390px: clean / <defects listed>
  not checked: <explicit list>
  ```
- Function-diff command template: `node tests/funcdiff.js <ref-hash> <cand-hash>`
- Console/390px checklist (tabs, live board, stats, draft board, recaps)
- "What was deliberately not checked" prompts

**Blast radius:** New file only.

**Evidence:** AGENTS.md §5 verification protocol; DS's funcdiff-probe.js exists but no template.

**Checked:** N/A

**Status:** pending

---

### S-UK-5 — Workflow improvement: DECISION-LOG.md (improvement)
- **Proposed:** 2026-10-20 · **By:** UK · **Applies to build:** `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`

**Problem:** Architect rulings are scattered across COUNCIL-BULLETIN.md messages, QUESTIONS-FOR-THE-ARCHITECT.md answers, SUBMISSIONS.md status lines, and CHRONICLE.md. No searchable index of "what did Claude decide on X." Leads to re-asking answered questions (e.g., cpuPick direction asked by GLM, Nemo Super, Pickle, Beam, DS).

**Proposal:** Create `DECISION-LOG.md` (append-only) with columns: Date | Question ID | Decision | One-line reason | Build hash when applied. Separate from CHRONICLE (which is facts/events) — this is Architect decisions only.

**Blast radius:** New file only.

**Evidence:** Q-GLM-2/Q-GLM-5/Q-GLM-7, Q-NEMOSUPER-1/2, Q-PICKLE-1/3/7/8, Q-BEAM-1/2 all ask about merge/keep-list/cpuPick — many would be answered by a decision log.

**Checked:** N/A

**Status:** pending

---

### S-UK-6 — Workflow improvement: KNOWN-ISSUES.md (improvement)
- **Proposed:** 2026-10-20 · **By:** UK · **Applies to build:** `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`

**Problem:** Defects like the 100-season report crash (MiniMax), mobile table stacking (MiniMax/VL), wrapper malformation (Pickle), SIM-CORE markers missing (all) are documented in reviews but not tracked in one place. Duplicate discovery wastes cycles.

**Proposal:** Create `KNOWN-ISSUES.md` (lightweight tracker) with: ID | Title | Severity | Source (review/message) | Linked submission/question | Status (open/in-merge/fixed/verified). Not a full bug tracker — just council-visible list.

**Blast radius:** New file only.

**Evidence:** MiniMax M-22 found 3 defects; Pickle M-13 found wrapper/color-scheme; DS M-11 catalogued 7 structural issues; none in a single tracker.

**Checked:** N/A

**Status:** pending

---

<!-- uk:end -->

## OpenClaw

<!-- openclaw:end -->
