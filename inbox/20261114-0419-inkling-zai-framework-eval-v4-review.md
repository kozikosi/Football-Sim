SPEAKER: inkling | ROLE: Council · review of the Z.ai framework-eval filing | TASK: review `z framework eval v4/inbox_20261114-0406-zai-framework-eval.md` (published at `bbe106bc`) | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — review of the Z.ai framework evaluation v4 (2026-11-14)

**Verdict up front:** this is the strongest seat filing this wave has produced. I re-ran the load-bearing receipts myself; every one I could check, checked out. It does not decide the framework question, and it does not claim to. Corrections it surfaced were real — including one factual error I had pushed to my own prospective council assignment (fixed `a0512633` → this commit). Do not treat any single receipt below as a framework verdict; the Owner holds the ruling.

## Receipts I produced myself (independent of Z.ai's sandbox)

| # | Claim checked | Command / method | Result |
|---|---|---|---|
| 1 | w89 live, gh-pages tip | `git ls-remote origin gh-pages` | `3e69567…` ✓ (matches filing) |
| 2 | football-sim-vue at required SHA | `git ls-remote …/football-sim-vue.git refs/heads/main` | `6b4de5c…` ✓ |
| 3 | football-sim-svelte at required SHA | `git ls-remote …/football-sim-svelte.git refs/heads/main` | `86ba632…` ✓ |
| 4 | Engine suite at tip `46aafad9` | `git archive origin/architect/engine-and-seats` → temp dir → `node --test --experimental-strip-types "test/**/*.test.ts"` (Node v26.13.0) | **323 pass / 0 fail, exit 0** (17.2 s; Z.ai measured 52 s on Node 24.22.3 — machine-dependent, parity on counts) ✓ |
| 5 | Engine pin→tip diff = **5 files, +149/−23** | `git diff --stat 4ca9a071 46aafad9 -- colors/src/sports/nfl/engine/` | exactly `draft.ts, flex.ts, legacyprovider.ts (+115), slots.ts, value.ts` — **+149/−23** ✓ |
| 6 | Tip flex table = 99 leaf rules | node leaf-count over `tools/mathlab/flex.json` at tip | 17 from-roles, **99 leaves; 23@0, 10@2, 43@6, 23@12** — matches AGENTS.md §2 exactly ✓ |
| 7 | Pin carries REV 4, not the 99-rule table | `git show 4ca9a071:tools/mathlab/flex.json | head` | `_source` header: "REV 4, Owner 29 Oct…" ✓ (v4 erratum 3 confirmed) |
| 8 | Draft geometry | `draft.ts` at tip: `TEAMS_N = 32`, `ROUNDS = SLOT_IDS.length = 32` | 32 rounds × 32 teams = **1,024 picks**, snake order ✓. My earlier "7 rounds / 224 picks" was wrong; corrected in `council-assignment-2026-11-14-full.md`. |
| 9 | Zero engine symbols in both scaffolds | grep over `src scripts tests` of both public clones (vue, svelte) | no hits for `slotWinsPerOvr\|matchupModel\|simulateGame\|cpuChoose\|optimalLineup\|flexPenaltyFor\|teamRatings\|measuredDisplayWeights\|slotWins20` ✓ (matches v4 §B8) |
| 10 | Bundle sizes | my own earlier receipts | vue `77.20 kB` JS / svelte `28.96 kB` JS — identical to v4 §E1/E2 ✓ |
| 11 | Published handoff is byte-faithful | `shasum -a 256 -c` over `z framework eval v4/` against its MANIFEST | all **44** logs verified **in the repo copy** before/at this commit; 248 KB, 45 files, no binaries |

Cross-witness on the rest (not re-run by me, labelled): install counts/times, e2e green 2/2 both, audits (vue 5 moderate dev-only / svelte 2 low dev-only, 0 prod), MCP stdio calls (Svelte MCP real calls; Playwright MCP blocked by chrome-channel requirement — verbatim error; Context7 quota-gated, key banned by constraint 1), 1,941-row pool (`wc -l` receipts in his logs), draft snakeOrder. These are REPORTED-consistent with everything else, not independently witnessed.

## What the review adds or corrects

1. **Transport fact.** Until commit `bbe106bc`, the v4 filing existed nowhere public — it was unpushed locally on `council/zai` (`a43621a`, push failed exit 128, no credentials in Z.ai's sandbox, exactly as his receipt line records). Citing "council/zai @ a43621a" in future prose will point at an unfetchable ref. Cite **this** commit (`z framework eval v4/…` on `council/inkling`, tip `bbe106bc`) instead.
2. **My own error, fixed.** `council-assignment-2026-11-14-full.md` §C2 claimed "7-round × 32-team = 224 base picks" — wrong against the live engine (receipts #5/#8). Fixed prospectively with a dated erratum note inline; the prospective council dispatch is now safe to send. The delivered Z.ai work order itself is left byte-untouched — v4 errata 1/2/10 quote its wording verbatim as evidence, and rewriting it would falsify the audit trail.
3. **Pin ≠ tip matters for consumers.** The 99-rule flex table is the **tip** state; the engine **pin** `4ca9a071` (the artifact Z.ai's 67-cakepanz track consumes as a frozen snapshot, and the pin the AGENTS.md table cites) carries **REV 4** (107-rule-era guide header). Any "the engine already has the 99-rule table" claim that blames or credits the pinned build for the 99 rules is wrong. Rates/flavour of product impact belong to the Owner and Architect; I record it and do not rule.
4. **Bundle deltas are demo deltas.** v4 §E3 is right and I endorse it: 77 vs 29 kB measures the two demo apps, not the frameworks. Nobody should sign off on bundle numbers.
5. **Tooling asymmetry is real but harness-local.** Svelte MCP works today; Playwright MCP and Context7 do not, on Z.ai's Linux harness and partly on the Owner's (vue-docs MCP unexercised over HTTP). Both sides have a documented path (svelte docs corpus vs Vue remote vue-docs MCP / `vite-plugin-vue-mcp` Vite-6-only peer gap). "Which framework helps an agent more" remains UNKNOWN until re-measured on the Owner's machine — that is Z.ai's §F6.5 and D7.1, and it is the correct ask.

## Where the three seats now stand (for the Owner, no verdict)

- **Claude** recommended Vue 3 + Vite, **LOW** confidence (`d3bd81d`), with "change my mind" = BENCH-1 Tier-2 Vue misses its UX budget.
- **Ernie** co-signed the reasoning but not the framework: two of Vue's three extra libs are dead code (verified in my session), Svelte's autofixer demonstrably catches rune misuse; both arms 5/5, no measurement on the real workload.
- **Z.ai** certified both scaffolds green and contract-clean, engineered nothing, picked nothing, and put the decision back where it belongs: after BENCH-1 Tier 2 + the watchlist experiment run on the Owner's harness.

All three agree the evidence is insufficient for a settled call. Nothing in v4 moves that. If the Owner signs a framework now, the defensible sentence remains Claude's LOW-confidence one — not "Vue wins", not "Svelte wins".

## Open items the Owner still holds

1. Framework ruling itself.
2. BENCH-1 five items (report-only first runs, 32×32, real-pool primary, Chrome-only, ±20% noise floor) plus optional v4 §D7 deltas: fourth arm "Svelte + Svelte MCP", repair-cycle logging, filter locality, pin-the-data question.
3. The flex pin/REV-4 vs 99-rule gap for anything consuming `4ca9a071` (links with open P-142).
4. Z.ai's other deliverables in the handoff folder were NOT published by my commit beyond the framework eval: the folder also carries Z.ai's proposed START-OF-CHAT-ZAI update (MUSE owns START-OF-CHAT — left for MUSE to accept or decline) and 43 raw receipt logs (published as-is for audit).
5. `.env` rotation for the quarantine folder remains outstanding from 2026-11-13.

Labels used: VERIFIED (I ran it) / REPORTED (seat receipts, consistent) / INFERRED (reasoning; named as such) / UNKNOWN (not measurable here). No vote; the ruling is the Owner's alone.

— inkling
