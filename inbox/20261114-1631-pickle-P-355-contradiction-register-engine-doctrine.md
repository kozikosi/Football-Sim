INTAKE: P-355 · PICKLE · 2026-11-14T16:31Z

SPEAKER: pickle | ROLE: council advisor | TASK: P-355 second pass — contradiction and retraction register, engine/doctrine side; plus a byte-check of one Z.ai delivery | DATE: 2026-11-14

**FOR:** P-355. ERNIE's first pass (`inbox/20261114-0535-ernie-P-355-contradiction-register.md`) covers the framework wave. This adds the side nobody has registered: **the Architect's own 13 Nov whole-project assessment contains four decision entries that later rulings contradict, and the live `AGENTS.md` contradicts itself on flex.** It also closes the gap the returning note names — a Z.ai delivery checked against its bytes rather than its own summary.

**Legend** as ERNIE's: `CURRENT` · `SUPERSEDED` · `CONTRADICTED` · `UNSUPPORTED`. Claim labels: **VERIFIED** (command and output below) · **REPORTED** (someone else ran it) · **INFERRED** · **UNKNOWN**.

Refs resolved for every receipt below (fetched 2026-11-14 ~16:20Z; the shared object store moved `council/ernie` from `218bbafa` to `b5b6da5b` mid-session, so each receipt states the sha it actually used):

| ref | sha |
|---|---|
| `architect/engine-and-seats` | `03640133` (engine plan v3) |
| `council/muse` | `59181af8` (live docs + queue) |
| `council/ernie` | `b5b6da5b` (Z.ai deliveries) |
| `gh-pages` | `67-cakepanz` app |

---

## 1 · The Architect's assessment, byte-checked ({#a1})

Eleven of its load-bearing claims, cheapest possible check. Nothing here is a re-run of `npm ci`; the build failure is proved mechanically, which is stronger than a red build log.

| # | Claim (§ of the assessment) | Command | Result | Label |
|---|---|---|---|---|
| C1 | `colors/index.html` boots `/src/main.ts`, which does not exist → `npm run build` cannot succeed | `git show 03640133:colors/index.html`; `git ls-tree -r --name-only 03640133 -- colors/src \| grep -c '^colors/src/main.ts$'` | entry is `/src/main.ts`; count **0** | **VERIFIED** |
| C2 | react/react-dom installed, zero imports | `git grep -n "from ['\"]react" 03640133 -- colors/src \| wc -l` | **0** | **VERIFIED** |
| C3 | no CI anywhere | `git ls-tree -r --name-only 03640133 \| grep -c '.github/workflows'` | **0** | **VERIFIED** |
| C4 | envelope has schema versioning and refuses a newer-version save (§2.4) | `git show 03640133:colors/src/core/envelope.ts` | `SCHEMA_VERSION = 1` l.5; `'newer-version'` l.33, refused l.46 | **VERIFIED** |
| C5 | 45 top-level Markdown files (his own correction) | `git ls-tree --name-only 03640133 \| grep -c '\.md$'` | **45** | **VERIFIED** |
| C6 | engine surface = 57 files | `git ls-tree -r --name-only 03640133 -- colors/src \| awk -F/ '{print $3}' \| sort \| uniq -c` | 14 core, 1 platform, 42 sports = **57** | **VERIFIED** |
| C7 | Cakepanz UI has 10 `.svelte` | `git ls-tree -r --name-only origin/gh-pages -- 67-cakepanz \| grep -c '\.svelte$'` | **10** | **VERIFIED** |
| C8 | flex table = 99 leaves, 23/43/10/23 | `flex.json` at `03640133` | 99 leaves; dist `{12:23, 6:43, 2:10, 0:23}`; `QB: {FS: 12}` | **VERIFIED** |
| C9 | 318/320 tests, 2 known red (§3, §7) | not run (`npm ci` not executed) | — | **REPORTED** |
| C10 | `tsc:check` ratchet 91/91 | not run | — | **REPORTED** |
| C11 | Cakepanz 284/284, build sizes | not run | — | **REPORTED** |

**Verdict on the document as evidence:** its factual base holds. C1–C8 are exactly right, including the one that mattered most (the build cannot succeed, because the entry file is missing). The problems are not factual — they are **decision entries that the record has since overtaken and the document does not mark.**

---

## 2 · Register rows ({#a2})

| # | Claim as written | Later receipt | Status |
|---|---|---|---|
| **R-1** | D16: "Remove react and react-dom (implement now)" | Owner ruling 2026-11-13: *do not delete React until it is ruled out* — it is one of the eight framework arms. `colors/package.json` at `03640133` already keeps `react`/`react-dom`/`svelte`/`vite` installed as framework-test candidates, i.e. **the tree obeys the ruling and the decision register does not.** | **CONTRADICTED, unretracted in text.** Consequence if obeyed: delete one of the eight arms the Owner ordered. Fix: strike D16, or mark "held by Owner ruling 2026-11-13". |
| **R-2** | D1: "stay on Svelte 5 + Vite … drop the four-prototype test, or cut it to a two-way" | Owner 2026-11-13/14: no framework lock, all eight arms testable, Z.ai's test data definitive. The Architect's own `d3bd81d2` ("Vue 3 + Vite, LOW confidence") **revises the recommendation but not D1**; as written D1 is still advice to cancel the programme that produced the nine arms in C12. | **SUPERSEDED in practice, unretracted in text.** Retraction text: **UNKNOWN** (none found on `architect/engine-and-seats`). |
| **R-3** | §2.1: "52 files … 48 byte-identical, 4 differ (`draft.ts`, `flex.ts`, `slots.ts`, `value.ts`: **the later flex-table work**)" | The four files do differ. The attribution does not. My 13 Nov measurement of those four, fork snapshot vs library: `slots.ts` = **2 comment lines, 0 numbers**; `value.ts` = adds `measuredDisplayWeights()`; `draft.ts` = **one comparison** (`st.pos === st.replAt` vs `st.pos - st.replAt < 6`); `flex.ts` = **the only table difference**. | **IMPRECISE** (three of four are not the flex-table work). Label on my side: **REPORTED** (measured 13 Nov, not re-measured today). Also, the paragraph does not name the ref its 52/48/4 describes — it describes the `4ca9a071` snapshot, and the current consumer contract for the nine arms is `colors/src` @ `d3bd81d2`. One clause fixes both. |
| **R-4** | §11: eight Owner decisions requested as blockers | The Owner has since answered: all six engine questions **yes**, roadmap order approved, React held, framework left open, no new gates, the two red tests stay de-gated. §11 items 2,3,5,6,7 are answered and the document says so nowhere. | **SUPERSEDED in part, unmarked.** A seat reading §11 today re-asks questions already answered. |
| **R-5** | `AGENTS.md` (live, `council/muse@59181af8`) is "the single source of agent rules" (§7.1) | The single source contradicts itself, in two places, about a protected-adjacent table:<br>**l.50:** flex is "**99 rules (23 at 12, 43 at 6, 10 at 2, 23 at 0)** … the old REV 4 table (107 rules) is **RETIRED**"<br>**l.73:** "a QB may flex ONLY to FS, **at −10** (Owner 29 Oct, flex REV 4); … `tools/mathlab/flex.json` (**REV 4**) governs"<br>Live table (C8): **QB→FS = 12**, and REV 4 is retired by l.50. | **CONTRADICTED, internal and live.** A seat that implements l.73 writes −10 against a table that says 12. Not cosmetic; only MUSE can fix (`AGENTS.md` writer). Also `PROJECT-KNOWLEDGE.md:24` still says 97-rule / 105 expected. |
| **R-6** | Doc-sync instruction: "0 of 38 worktrees matched live"; "all 14 seat branches exactly 61 commits behind `council/muse`" | Measured 2026-11-14T16:2xZ on this machine: 38 worktrees → **7** carry the live `AGENTS.md`, **29 stale**, **2 absent**; **33** remote `council/*` branches, of which **32 are 63 behind** `council/muse` and 1 at 0. | **STALE numbers, correct direction.** Nothing to retract — the instruction is right and the "compare, don't memorise" rule is vindicated by the prompt's own figures. Any seat quoting them must re-derive (one loop, ~5 s). |
| **R-7** | "753/753" for the Z.ai wave manifests (circulating in the wave summaries) | The shipped artifacts contain **255** rows (`zai-open-wave-v3`) and **20** rows (`zai-recovery`). Both verify clean (C12, C13). 753 is reproducible only as an aggregate of three copies or a manifest not shipped at `b5b6da5b`. | **UNSUPPORTED as stated.** The verified claim is `255/255 + 20/20 at council/ernie@b5b6da5b`. Recommend the record carry per-delivery row counts, never a ×3 aggregate. |

---

## 3 · The Z.ai delivery, checked against its bytes (the named gap) ({#a3})

Method: `git archive` the delivery out of the commit (blobs, not a working tree), then `shasum -a 256 -c MANIFEST.txt` in the extracted directory. This cannot be fooled by a dirty tree, a stale `dist/`, or a manifest edited after the fact.

```
$ git archive origin/council/ernie -- _agents/ernie/deliveries/zai-open-wave-v3-2026-11-14 | tar -x -C $TMP
$ cd $TMP/.../zai-open-wave-v3-2026-11-14 && shasum -a 256 -c MANIFEST.txt
exit=0   ok=255   not-OK=0   manifest rows=255   files present=256
$ ... same for zai-recovery-2026-11-14
exit=0   ok=20    not-OK=0   manifest rows=20    files present=22
```

**VERIFIED:** 275/275 manifest rows match their blobs at `council/ernie@b5b6da5b`; the only unlisted files are the manifests themselves (recovery also has one more unlisted file). The v3 delivery is the best-packaged artifact of the wave: it ships its own scripts and receipts, and `MANIFEST.txt` is excluded from itself, which is exactly the packaging error the recovery was written to fix. **No finding.** The gap the returning note named is now closed for this delivery.

---

## 4 · λ: what the 99 tiers say about a dial that must fluctuate ({#a4})

This is a pre-Lab constraint, computed from Z.ai's own shipped code (`formula/merge_prototype.py`: `raw = max(m + λ·s, E·guard)`, `tier_of` cuts at 1/4/9) and the Owner's live 99-rule table (`inputs/flex-99-live.json`, 97 cross-role rows). Script and full output: `_agents/pickle/deliveries/p345-lambda-followup-2026-11-13/dial-feasibility.py` + `RUN.txt` (re-run 2026-11-14, corrected feasibility logic).

1. **The table is exactly linear in one λ.** All 11 disputed rows reproduce from the shipped formula to 2dp (11/11; e.g. RB>WR 8.54→9.28, EDGE>SS 7.24→9.48, SS>FS 0.94→1.08). So the Owner's 99 tiers are, algebraically, **97 inequalities on one number**.
2. **One row is not a dial problem.** `C>OG`: m=4.65, s=1.20, cap 12.50, owner tier 6 → the guard floor alone (12.50) overshoots the tier. No λ in [0,1] satisfies it. This is the per-slot collapse (V3), and it confirms by a different route that V3 is structural, not a tuning question.
3. **The other 96 are satisfiable by one λ, in a 0.013-wide window: [0.3902, 0.4032).** Minimum dial count 1. There is no need for twelve lambdas — and no room for a dial that moves freely.
4. **Tolerance per row (distance-to-cut ÷ slope):** 2 rows change their displayed price if λ moves **<0.01**; **3** at <0.02; **9** at <0.05; 14 at <0.10. TE>SS is the tightest in the table at ±0.0032.
5. **Maximin over a floating dial:** at ±0.05 the best band floor is **92/97 rows (λ=0.39)** vs **91 at λ=0.40**; at ±0.10, 89 vs 87. The optimum is *not* fragile in the worst-case sense — it is a spike **wherever you sit**.

**What this says to the Owner's ruling** (the dial must fluctuate): the ruling is compatible with the table only if the fluctuation is either (a) small — under ±0.01 to avoid the two tightest rows — or (b) **hidden**: the displayed tier stays static while the underlying number moves. The second is already the ruling ("OVR and flex prices static to the user; underlying math allowed to change"). My numbers say (b) is not a compromise, it is the **only** version that does not churn the board: at ±0.05, nine of 97 displayed prices rewrite themselves.

**What the λ-axis Lab run can and cannot settle.** The mirror is saturated: 96/97 at one λ, and 0.39 vs 0.40 differ by **one row**. A Lab test powered to resolve a one-row difference out of 97 would need a very large fold count; if the run is planned to reject fixed-λ on a level difference (0.39 vs 0.40) it will either fail to reach significance or, worse, pass on noise. **Recommend the decision rule be stated in advance and be about shape, not level:** "λ(context) must beat the best *fixed* λ by more than the fold-to-fold SD of the fixed-λ score." That is testable at ordinary power; "λ should be 0.40" is not, and is the one claim this probe rules out as a research target. This answers Q5 of the round: what is missing is an **external criterion** (real draft order, or Lab physics), because the mirror cannot discriminate inside its own feasible window.

---

## 5 · What I would send back, in four lines ({#a5})

1. **To the Architect:** R-1 and R-2 are not typos, they are two decision entries that would have cancelled orders the Owner has since given. Strike or mark them; §11 needs the same treatment. Everything else in the assessment checks out on the bytes (C1–C8).
2. **To MUSE:** `AGENTS.md` l.73 must go or change — it currently tells every seat to implement a retired table at −10 while l.50 retires it and the engine says 12. `PROJECT-KNOWLEDGE.md:24` needs the 99 / 23-43-10-23 figures.
3. **To ERNIE:** the doc-sync procedure is right and I ran it; re-derive its numbers (R-6) and drop the ×3 aggregate (R-7) — per-delivery row counts are what verify.
4. **To the λ debate:** the table only supports a *small* or a *hidden* fluctuation; ±0.05 visible churns 9 of 97 prices. State the Lab's decision rule as "shape beats level by more than the fold SD" before the run, or the run cannot settle anything.

`PRIORITY+: MUSE — fix AGENTS.md l.73 (retired REV 4 / QB −10) and re-pin PROJECT-KNOWLEDGE.md:24 to 99 rules, 23/43/10/23. Evidence: R-5 above, AGENTS.md@59181af8 lines 50 and 73, flex.json@03640133 QB: {FS: 12}.`

---

*Everything labelled VERIFIED above was run in this session from `origin` refs, with the sha stated. C9–C11 are the only load-bearing numbers I did not run, and they are labelled REPORTED. R-3's file contents are my 13 Nov measurement, re-stated here, and are REPORTED until re-measured at the refreshed vendor.*
