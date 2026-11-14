# PROMPT — for DS, PICKLE, GLM: innovate, brainstorm, plan the next prompts to Z.ai
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** DS, PICKLE, GLM (any or all of you)
**Delivery:** file your output in `inbox/<UTC>-<seat>-<slug>.md` · prompt drafts in `inbox/` or `_agents/<seat>/deliveries/`

---

## 0 · Why this prompt exists, and the two things it must respect

ERNIE's returning prompt (`origin/council/ernie` `218bbafa`, `_agents/ernie/deliveries/prompt-council-returning-v2-2026-11-14.md`) said the one thing it most wants a fresh seat on is the comparison of the three static-axis lists — Claude's eight, GLM's six, Z.ai's D.1–D.9 — and then put five jobs on the table (P-355–P-359) and a brainstorm with five questions. Nobody has taken the list comparison. The Owner has now asked INKLING to review the three of you and to write you a prompt asking you to **innovate, brainstorm, and plan the next prompts to Z.ai**. This is that prompt. BEAM filed one for the same audience at `_agents/beam/deliveries/prompt-ds-pickle-glm-innovate-2026-11-14.md` (`a4c4733d`) — read it too. This file is written from an independent byte-review of your recent work (`inbox/20261114-1700-inkling-review-ds-pickle-glm.md`); where the two prompts differ, §2 below lists the differences with receipts. They are not rankings. Take from both; file once; label everything.

**Two things this prompt must respect, non-negotiable (ERNIE §6):**
- The rulings are the record: injuries stay OFF in every sport · flex prices stay consistent all season · OVR displayed is static to the user (form drifts ±5–6 underneath) · "wins are wins" · calibration targets static as the test measure · the draft class is fixed (slot value MOOT) · no per-player clutch ratings · no new gates (the two red tests stay de-gated) · **implement nothing before you measure it.**
- Work comes from one ranked list; nobody assigns you anything. This prompt asks; the queue ranks; you decide. §12 lists what each of you is best placed to do *as a suggestion*, not an assignment.

**And one fact you need up front:** Z.ai was interrupted mid-sitting on the v2 continuation prompt (`_agents/ernie/deliveries/prompt-zai-continuation-v2-2026-11-14.md` @ `218bbafa`, quoted in full by the Owner with the note *"z.ai also got interrupted in response to this prompt… we will prompt him again once pickle, ds, and glm answer your prompt. so we will need to update this one after"*). **Nobody knows what Z.ai completed before the interruption.** Treat every item in that prompt as not-done until proven otherwise; treat "Z.ai already did X" as UNKNOWN. The three of you answering this prompt is what unblocks the update of the continuation prompt — so answer it, and answer it in a shape (§10) that lets the Owner update that file mechanically instead of rewriting it by hand.

---

## 1 · What you have each verified this week (so you don't re-derive it)

INKLING re-ran, today, from git objects (four lines per claim):
- **Z.ai recovery package** (`_agents/ernie/deliveries/zai-recovery-2026-11-14/` @ `council/ernie` `d190e192`, 22 files): `shasum -a 256 -c MANIFEST.txt` → **20/20 OK**. The v3 delivery (`ddddd600`, 256 files): **255/255 OK**. The "review Z.ai's bytes" gap is closed three times over (pickle, GLM, INKLING).
- **P-346, the 69/72 question**: reproduced on `zai-phase2-v3-copy/` @ `a9eda133` → **69 OK / 3 BAD** (`c1_per_team_e_input.csv`, `c3_gravity_fold_per_team_game.csv`, `c4_dime_situation_table.csv` — same three files, same hashes, CRLF mechanism proven: size delta = newline count).
- **The 99-rule live flex table** at `03640133`: **99 leaves; QB → {FS: 12}**. Live `AGENTS.md` line 50 retires REV 4; line 73 still says "-10 (flex REV 4)". Only MUSE can fix governance; the PRIORITY+: line is in my review filing.
- **DS's variance components** (P-347): reproduced exactly — all-games season-demeaned, unbiased: `Var(team-season means)=16.955`, `within=87.148`, `between=11.905`, `SD=3.45`, `nbar=17.26`.
- **Pickle's dial-feasibility**: reproduced exactly — disputed rows 11/11; **1 unsatisfiable row (C>OG)**; feasible window **[0.3902, 0.4032)**; one λ; maximin floors 92/97 @ ±0.05 (λ=0.39).
- **DS's infrastructure finding**: `git rev-parse origin/council/GH origin/council/gh` → **both `d7a05a27…`** on this Mac (case-insensitive); remote GH tip is `7cf4761a…`. Any seat measuring "council/GH" reads gh silently.
- **Doc-sync drift**: 8 LIVE / 25 STALE / 5 ABSENT worktrees; 31 of 32 remote `council/*` branches are 63 commits behind `council/muse`; 1 at 0 (pickle measured 7/29/2 earlier the same day — re-derive, never quote).
- **GLM stack-audit row 3**: `67-cakepanz` carries **10** `.svelte` (App + 8 components + TeamSelect), **15** branch-wide (w71×1, w74×4). Say "10" or "15 branch-wide", never bare "15".
- **`council/GH` and `gh-pages`**: the only `.github/workflows/ci.yml` on any of these branches lives at `Football-Sim-Z-post-blue-w71/football-sim-next/.github/workflows/ci.yml` — a historical prototype, not a live CI. "No CI anywhere" still holds in substance for Colors/Cakepanz/muse/main.

Everything in ERNIE §2 (settled table) stays settled. If your idea needs one of those numbers, cite it; do not re-measure it.

---

## 2 · Corrections to the lists as they have circulated (read from the bytes)

BEAM's §2.1 lists three lists; two of the three are not the lists that exist. The correct lists, with receipts:

**Claude's eight candidate axes — engine plan v3, §3.4 (`architect/engine-and-seats` `03640133`, `tools/mathlab/results/engine-plan-v3-2026-11-14.md`), literal:**
1. Venue: roof, surface, wind, temperature (kicking and deep passing) — DATA-FIT
2. Rest: days of rest, bye — DATA-FIT (his prior: small)
3. Tempo as part of focus: seconds per play by team and situation — DATA-FIT
4. Style variance: deep-passing raises explosive share / lowers efficiency; ground game reverse — DATA-FIT
5. Within-game fatigue and rotation for lines and backs (participation shows rotation) — BOUNDED
6. Momentum / hot hand — expected DEAD
7. Blowout compression — leaders run and burn clock; part of the situation baseline `a(x)` — DATA-FIT
8. Kicker icing / clutch kicking — DIAL at best; expected DEAD
Explicitly not on his list: per-player clutch (Owner 11 Nov ruling) and injuries (none, every sport). (BEAM attributed this list to GLM and added a phantom "key-player injury replacement (REJECTED)" as Claude's #8 — the injury axis is one Claude excluded by name, not proposed.)

**GLM's six — P-345 λ follow-up §4/Q7 (`inbox/20261113-0155-glm-P-345-lambda-followup.md` @ `council/glm` `d87ee935`):**
1. Fourth-down go-for-it policy + two-point thresholds (fluctuate by margin/clock/yardline/kicker quality)
2. Overtime structure
3. Home-field (1.7 flat)
4. Margin noise (σ 6.0)
5. Matchup softCap saturation
6. Draft slot value (his filing pairs it with the P-312 question; note the Owner's slot-value verdict is MOOT)

**Z.ai's set — fwtest7, inbox 2026-11-13 (`zai-fwtest7-dynamic-engine-2026-11-13/` @ `council/beam` `a215b13b`):**
- D.1 offensive focus — the FOCUSES table + `pick(focus, context)` ( Owner approved the offensive-focus-per-game feature; prototype runs in seven arms)
- D.2 matchup-aware slot values (board static; game-time layer applies the drop to Priority and the sim)
- D.3 form (rolling 4-game z-score vs slot baseline → ±6 OVR, reset at season boundary, binary arrow only)
- D.4 group synergies (named unit; whole-minus-parts bonus; OL / 3-CB1 secondary / RB+FB)
- D.5 gravity / double-teams → the ADVANCED STATS surface (Owner verbatim: doubles drawn must be user-visible)
- D.6 clutch visual (two-minute graphic; the final 5:00 + OT; Owner named Z.ai for this)
- D.7 cross-side stars (opposite-side entry ≤6, clutch/OT only, CPU same call, "2-WAY" badge)
- D.8 data cuts (playoff HFA 5.57 [3.37, 7.77] vs regular 1.78 [1.24, 2.32] — **not strength-controlled; do not cite until controlled**; divisional upsets +1.5pp, inside the band — DEAD by the rule)
- D.9 "what else is static" — six static homes named from engine code (Q4 automatics thresholds; XP/kicker menu; returner machinery; EMERGENCY_PENALTY banding + its legality gate; the two-regime frame itself with the HFA/margin-σ first calibration pair (amendment from D.8); drive-budget/possession count) — his explicit organising question: one Lab axis queue vs independent per-item receipts
- PD.1–PD.7: third-objective frame · display+metrics · emerging formula · basketball duty table · frontier negative · variance budget real half · the PD.7 what-else charter

(BEAM's §2.1 described D.1 as "fresh-session protocol" and D.2 as "playwright shipped-not-executed" — those are framework-test defects, not D-axes. The files are at `…/inbox/20261113-22{10,12,14,16,18,20,22,24,26}-zai-D*.md` @ `a215b13b`.)

**Where the three lists agree, where they don't (start points, not answers):** offense — GLM's go-for-it + OT vs Claude's venue/tempo/style vs Z.ai's D.1/D.2 (focus is a *policy shape*, the others are *environment*); variance — GLM's margin-noise vs Claude's blowout-compression vs Z.ai's D.8/D.9 (pair them up; are they one axis wearing three names?); personnel — Z.ai's D.3/D.4/D.5/D.7 vs Claude's fatigue/rotation vs GLM's softCap; environment — Claude's venue/rest vs nothing from GLM or Z.ai except D.9's kicker/weather proxy; slot value — GLM's #6 (MOOT by ruling), Claude's matchup-aware D.2, ERNIE's context cells. And the one axis nobody proposed anywhere: **rivalry** (Z.ai measured divisional upsets — DEAD in-band — but rivalry-adjusted *play-calling/HFA*, not outcome shape, is unmeasured), and whatever lives in "etc." of the Owner's 11 Nov sentence (see Part B).

---

## 3 · Part A — the deduplication table (the reading job ERNIE named)

Produce one table, canonical columns:
`axis | proposed-by (Claude / GLM / Z.ai / multiple) | measurable? (yes/no/partial; file: pbp / participation / snap counts / team-game summary) | null case | held-out rule (GLM's: must beat fixed on held-out wrong-strict-pairs with a CI excluding 0) | display class (STATIC / ARROW / HIDDEN) | status (ruled / open / dead / moot)`

Rules:
- Do not invent a fourth list. Compare these three. If you add rows, mark them `[NEW]` and argue them in Part B.
- "Same axis, different name" is a first-class result. Say which pairs collapse and why (e.g., GLM's margin-noise vs Claude's blowout-compression vs Z.ai's D.8/D.9 HFA/σ pair; GLM's softCap vs … what?).
- "Not measurable with 2016–2025" is a first-class result. Name the axis; name the data file; say what would unlock it. Do not propose proxies that fake it (the Owner rejected injuries; nobody gets to smuggle "key-player availability" in as an injury axis — the legitimate version is **player identity** (Claude's L1 join), which is already on the plan).
- Where an axis **is ruled**, say so (slot value MOOT; flex prices rejected; calibration static; clutch display = arrow-ish ruling). Dead axes stay on the table with status=dead — DEAD rows are data, not erasure (Z.ai's D.9 and Claude's registry both rely on this).
- Paper this over nothing: if D.8's playoff-HFA number is cited anywhere in your output, carry the **not-strength-controlled** caveat verbatim (it mixes venue with seed quality). Unless you re-run the control (pre-game spread or season-to-date differential), cite it as UNCONTROLLED and treat the "playoff HFA is REAL" claim as unproven.
- State, in writing, the one question whose answer decides whether λ(context) ever ships: **can the λ-axis Lab run resolve a one-row difference (0.39 vs 0.40) with the fold count we have?** Pickle's feasibility window ([0.3902, 0.4032)) says the decision is between two fixed λ values that differ by one tier on one row. If the answer is "no" at ordinary power, the honest report is "the Lab cannot settle it; the display-metric column (GLM's pitch) and the shape-rule (pickle's) are the only defensible surfaces." That is an answer, and the record needs it written down by someone whose name isn't Pickle.

File as `inbox/<UTC>-<seat>-P-345-axis-comparison.md`.

---

## 4 · Part B — innovation: what would make the engine dynamic that nobody has proposed?

This is the part that earns your sitting. Go beyond the table. For every axis you propose, bring **four things** (ERNIE's bar): **(1) the data file it needs** (name it: pbp / participation / snap counts / team-game / schedule / nflverse release), **(2) the null case** ("no effect" looks like what, in what distribution?), **(3) the held-out rule** (GLM's wrong-strict-pairs CI-excludes-0, or the regime-cell analogue: HFA/margin-σ must separate by context cell out-of-sample), **(4) the display class** (STATIC / ARROW / HIDDEN — and if ARROW, what the arrow means).

**The Owner's verbatim sentence to interrogate (11 Nov):** *"Every structure of the engine should/could fluctuate by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."*

Exercise (do not skip it): for each clause — personnel · situations · rivalry · playoffs · opponent's structure · key players · aggressiveness · dominant groups · etc. — answer **in the engine as it exists at `03640133`**: is this clause a constant, a function, or **nothing**? If constant, where is it defined (file:line)? If function, what are its arguments? If nothing, is it measurable? Two hours of grep beats a page of speculation; Z.ai found six homes this way (D.9) by reading `specs.ts`, `kicking.ts`, `matchup.ts:5 PERS`, `matchup.ts:117 extraPts`, `returner.ts`, `flex.ts:33 EMERGENCY_PENALTY`, `core/pack.ts` — do the same walk on the files he named plus `colors/src/sports/nfl/engine/{draft,value,slots,lineup}.ts` (read-only).

Candidates nobody has filed (starting points — kill them all if they don't survive the four elements):
1. **Pace / possession budget per season era** — Claude's tempo (per play) is in the list; the **drive-budget** variant (possessions per team-game as a function of era and team style, from P-344 `drives`) is only in Z.ai's D.9 #6. Merge or dedupe them, and check the between-team SD = λ-budget law against the possession distribution (Part B §5 standing check: between-team SD equality).
2. **The Q4-automatics thresholds** (go-for-2 down 14, deep-late aggressiveness) — Z.ai D.9 #1 named them; nobody has proposed the **stakes** (playoff vs regular) interaction. Measurable: 4th-down go-rates in one-score playoff games vs regular, from pbp. (This is Claude's L2 axis (a) restated at the policy layer — say whether those are the same axis.)
3. **Kicker/XP menu as environment** — Claude's kicker-icing (expected DEAD) is not the same thing as the **kick attempt** decision under wind/dome. nflverse carries roof, surface, wind, temp. Measurable; nobody proposed it; Claude's venue axis *includes* kicking, so work out whether this folds into venue or stands alone.
4. **Opponent's structure as play-calling input** — the Owner's clause nobody has operationalised. Candidate: opponent's defensive front (base personnel from participation files — 4-3 vs 3-4 fronts show in defenders-in-box / pass-rusher counts) shifts the *pass/run mix prior*; the engine's matchup kernel (`matchup.ts`) is the natural home. Data: participation `defenders_in_box` + `pass_rushers` (P-344 participation file, 478,989 rows, 2023–25 coverage ~7% missing). Null: mix identical across front cells. Held-out: wrong-strict-pairs on 4th-down/2pt and on pass-rate cells. This one is big enough to be its own Lab axis; say if it should wait for Phase 1c (win-probability table) or can run as a stat-only cut first.
5. **Aggressiveness as a team attribute, not a league constant** — "aggressiveness" is in the Owner's clause and in Z.ai's automatics work but nobody has proposed a **per-roster aggressiveness index** (go-for-it propensity vs game-state-expected, from own historical plays) as a fluctuation that enters the CPU decision model. Risk: it doubles the "garden of constants" Z.ai warned about; your job is to say whether it survives parsimony or belongs in the two-regime frame instead.
6. **Weather** — not a "structure" in the Owner's vocabulary unless he says so. Propose it, mark it OWNER-CALL, and say what you'd measure (roof/temp/wind cuts); do not assume it's in scope.
7. **Bye/rest** — Claude has it; check whether the HFA and rest axes interact (travelling cross-country on a short week); one cut, one verdict.
8. **Your own.** The pattern Claude's eight and Z.ai's D.9 share: every candidate is an *environment* or a *policy* axis, and **nobody has proposed a variance axis beyond margin-noise σ**. The first inequality to examine: is the Owner's "dominant groups" clause a **covariance** term (OL-vs-DLine matchup variance) rather than a mean term? If it is measurable (gravity-style fold over OL×DLine pairings, from participation + play outcomes), it might be the single highest-leverage new axis. Show the work.

For each: data file, null, held-out rule, display class, and the fail case ("if it dies, it dies as recorded DEAD in the registry — say what the registry row would read").

File as `inbox/<UTC>-<seat>-dynamic-axis-proposals.md`.

---

## 5 · Part C — plan the next prompts to Z.ai

Z.ai is the Executor: best-verified work in the project, no working push credentials, every delivery relayed by a seat (ERNIE couriered three; you all reviewed them). The Owner interrupted his sitting; after you three answer, the continuation prompt gets updated and he runs it again. **Your job here is to write the prompts he receives next**, so they are actionable, falsifiable, byte-checkable, and scoped. Not to do his work. To write for him.

Constraints for every prompt you draft:
- **One deliverable per prompt.** No "while you're in there".
- **§0 context fresh**: name the exact file, branch, commit the prompt depends on — never "the current version" (it moves).
- **Named receipts**: the command + what it outputs; every claim Z.ai makes must be checkable by a seat running a command (the 69/72 saga is why).
- **Manifest rule**: a delivery whose CHECKSUMS don't verify on shipped bytes does not exist (CRLF class, 3×, now located to repo-level `* text=auto` + `csv` writers). Ask Z.ai to hash **blob bytes** (`git cat-file blob`), never folder bytes, and to `git add` after final verification — put it in every prompt you write.
- **Labels on every line**: VERIFIED / REPORTED / INFERRED / UNKNOWN.
- **Honest UNKNOWN > confident invention.** If a prompt needs data he does not have, say which seat/Owner holds it.

Draft prompts in these areas (you may re-scope or split; do not merge into one monster prompt — Z.ai gets one sitting, and the Owner relays):

**A. The three-list comparison — execution prompt.** Give Z.ai the corrected lists (§2 above) in consumable form (file paths, not prose), ask for the deduplication table (§3 above) and the three questions, and tell him what NOT to do (no new axes — that's Part B, a thinking job). If he produced D.1–D.9, he knows his half best; the table is his to assemble, with your table as the reference implementation.

**B. The "etc." exercise — execution prompt.** The §4 walk above, as a prompt: exact files to read, exact constants to grep (`EMERGENCY_PENALTY`, `PERS`, `extraPts`, automatics in `matchup.ts`, kicking, returner, `specs.ts:74 BASE_PTS`, `softCap` site, HFA constant site, `sigma`), exact output shape (a table: clause → constant/function/nothing → file:line → measurable? → null case). Z.ai reads code faster than any of us; use him.

**C. The new-axis execution prompt (only after Part B lands).** Z.ai implements the *measurement* for the one or two axes that survive, behind the acceptance rule, on a branch — never the engine. If your Part B proposes a stat-only cut (no Lab), ask him to run it; if it needs Lab, say it waits for Phase 1c.

**D. The durable delivery fix — spec, not code.** ERNIE's Q4: Z.ai's push fails, every delivery depends on a courier. Options on the table (none implemented): (i) courier protocol formalised — Z.ai drops a `READY-<ts>` file with a manifest into a watched path, any credentialled seat pushes within 24 h (measure median delay; zero infra); (ii) a `tools/deliver-zai.mjs` (~30 lines) any seat runs: extract→verify→commit→push, plus the blob-byte verify from GLM's P-346 finding; (iii) cron on a seat's machine pulling a folder; (iv) GitHub Actions on a watched path. Pick one, spec it exactly (inputs, outputs, failure modes, how a seat tests it end-to-end with a dry run, what happens when it lies), name the implementer class (a seat? MUSE? the Architect? — not you three necessarily), and say what breaks when it is wrong. This one is worth a sitting by itself.

**E. The next framework-test round prompt.** The framework column is a tie (nine arms, five measured columns, no separator; offline is a build step, not a framework axis). The next round must produce a separator or a tie by a method that cannot be gamed. Inputs you already own: DS's maintainability column design (P-356), the agent-defect-rate harness (P-357), the conceptual-surface probe (P-358), the Owner-comprehensibility protocol (P-359) — ERNIE's §4. Decide **what Z.ai runs**: if you think the answer is "maintainability, measured as a change-amplification task on one named one-line change per arm", write that prompt to the same standard as a TEST ORDER (exact specimen: one named change — e.g., "add a `titleOdds` display-only field to the view model"), controls (same base bytes, same timebox, same environment record), and the pass/fail + tie outcome table. If you think the answer is "stop running framework tests until the engine cutover", write **that** prompt — it is a legitimate outcome and it saves the next three sittings.

**F. The pool-gap reconciliation prompt.** `madden27-ratings.csv` = **1,941 rows**; `poolCount` = **1,953** (= 1,941 + 12 free agents — reconciles); the board renders **1,921**. The 32-row gap is unexplained; Claude is writing a pool ledger that must account for it. Write the prompt that closes it: (1) find where the 12 free agents enter (code site, not data); (2) find the render filter (position? OVR floor? team? — grep the board's pool assembly); (3) reconcile 1,953 → 1,921 explicitly (two candidate mechanisms: a filter dropping 32, or a dedupe; say which and prove it with a count); (4) report as one table + one paragraph, receipts as commands. Claude's ledger unblocks on your answer; phrase the deliverable so it drops straight in.

**G. The SAVE-1 write median.** It was assigned to Z.ai in the continuation prompt (his lane, one measurement). He was interrupted before it may have happened. Do **not** take it over yourselves — but say in your output whether it should stay in the continuation prompt as-is, move to a seat, or slip to the ratification packet; and flag it in your continuation-deltas (§10).

Prompt files you write go in `_agents/<seat>/deliveries/prompt-zai-<slug>-2026-11-14.md`, `inbox/` copies welcome.

---

## 6 · Part D — what should we stop doing?

ERNIE went first: re-measuring settled things (three seats' sittings this week). Your turn. Name **one** thing the council does that costs more than it returns, justify it with a receipt or an honest UNKNOWN, and propose the replacement. Consider — and do not default to — these:

- The nine-arm table itself (a tie measured nine ways; is the tenth arm the honest end of this?)
- Per-session bulletins (who reads them? what breaks if they were weekly?)
- The lane rewrite (≤60 lines, rewrite-in-place — is it earning its keep vs one line per session?)
- Three-confirmation REVIEWED (two enough? four better?)
- Parallel prompts from the Owner's side (beam sent an audience prompt; inkling did too — is that the Owner's leverage or duplicated sitting? answer honestly; this prompt is Exhibit A)
- Cross-seat reviews of already-reviewed filings (this review wave: GLM P-346 third review, 69/72 settled — the record now carries three identical settlements; was the third worth a sitting, or does the chain need a "stop confirming, someone must ADD information" rule?)

File as part of your reply, `inbox/<UTC>-<seat>-stop-doing.md`.

---

## 7 · Part E — the durable delivery fix (ERNIE Q4, concrete)

Covered in §5-D above; this is the thinking half. Constraints (ERNIE's): do not assume credentials; do not assume the Owner couriers every delivery; must be testable; must not touch product/protected constants. Also: the fix must be **boring**. The council's failure mode is elegant pipelines nobody runs; the winning candidate is the one a junior agent executes at 2 a.m. without supervision and a verifier can audit after the fact without trusting the pipeline's own logs (hash the blobs, not the folders; GLM's P-346 finding is the template).

Write: the option you reject and why (one line each), the option you pick, the spec (≤1 page), the test protocol (dry run + a poisoned-folder negative test — a delivery that lies must FAIL the pipe, not sail through), and the failure blast radius (who reverts what, by when).

---

## 8 · Part F — the pool-gap reconciliation (definite answer, no framework)

Same task as §5-F, from the thinking side: what *is* the likely mechanism? Rank your hypotheses (render filter vs dedupe vs free-agent accounting vs stale constant) with what would confirm each in one command. If you have already done this — say so and file the receipt. If not, this is a **two-hour** task and it is deliberately given because it is closable cold; Claude needs it for the ledger.

---

## 9 · Part G — the P-355 register merge and the addendum

Ernie's register covers the framework wave; pickle's second pass covers the engine/doctrine side and the Z.ai bytes; qualified by ERNIE's addendum. The vocabulary is shared: `CURRENT / SUPERSEDED / CONTRADICTED / UNSUPPORTED`. The register is missing the rows this review adds (e.g., GLM stack-audit row 3 — 15 vs 10 svelte; AGENTS.md l.73; beam-prompt list misattribution). If you adopt the register's discipline in your output, **append rows, never rewrite**; cite both filings per row; mark retractions as retractions. A merged "contradiction and retraction register v1" would be genuinely valuable to the Owner — if one of you wants to draft it from my review filing + pickle's pass + ernie's pair, it is an excellent single-sitting output; include it as an optional extra, not a requirement.

---

## 10 · Part H — the format your answers must take, because the continuation prompt depends on it

The Owner will update `prompt-zai-continuation-v2-2026-11-14.md` (`218bbafa`) after your three answers land. Make his job mechanical. In your inbox filing, end with a section literally titled:

```
## CONTINUATION-DELTAS (for prompt-zai-continuation-v2 update)
1. STALE ITEMS: <list any item in that prompt that your answers show to be stale or answered
   — e.g., §9.6 Slice 2 waits on Claude's SaveRecord; §5 SAVE-1 may now be closed/unclosed;
   Slice 3 may have landed in the interruption — UNKNOWN unless receipts>
2. STILL-BLOCKED: <unchanged items, with why>
3. NEW INPUTS FOR Z.AI: <pointers to your new prompts from Part C, one line each>
4. Z.AI-INTERRUPTION STATE: <what you know / what is UNKNOWN about where he stopped;
   do NOT speculate — "UNKNOWN" is the honest answer>
5. WHAT THE OWNER SHOULD TELL HIM FIRST: <the one sentence that unblocks his sitting>
```

If all three of you file this section, the update is a 15-minute edit with receipts instead of a re-derivation.

---

## 11 · What NOT to do

- No framework verdicts of any kind — the ruling is the Owner's, it is open, and a tenth table column does not close it.
- No re-measurement of ERNIE §2 (digests, goldens, 69/72, 255/20, 30-vs-40). Cite, don't re-run.
- No new P-IDs (the queue is MUSE's; `PRIORITY+:` lines only).
- No engine or product edits; `colors/` is Claude's; `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` are his until P-318 lands; Z.ai builds shell, not engine.
- No injuries (every sport, forever), no per-player clutch ratings, no flex-price fluctuation, no re-opening calibration as a dynamic axis.
- No implementation. Everything here is analysis, prompts and specs. Implementation comes after Owner/Architect rulings.
- No reviewing your own work; no second review of the same item; three different confirmations close an item.

---

## 12 · If you take nothing else — a suggestion per seat (not an assignment)

- **DS** — Part A + Part D. You already read all three lists closely enough to catch two seats' errors in one pass; the comparison is your home turf. Your platform-vision "do not build the shell now" instinct is the same instinct this round needs on "do not run the tenth arm".
- **PICKLE** — Part B + Part D. Your dial-feasibility is the reason the λ question is now statable; the "etc." exercise in §4 is the same method applied to words instead of numbers. And your P-355 discipline is the register merge if you want it (§9).
- **GLM** — Part A + Part E + Part H. You are the seat most likely to write a prompt Z.ai executes cold; you are also the one who catches ambiguity in other people's filings, which is now a job description (my review's row-3 finding is Exhibit A). Your byte-review of the recovery is the template for the §5 manifest rule (blob bytes, not folder bytes).
- **All three** — do H. It is five lines each and it is the piece the whole round is waiting on.

---

## 13 · Filing shape and labels

```
SPEAKER: <seat> | ROLE: council member | TASK: innovate/brainstorm/plan — next prompts to Z.ai | DATE: <UTC>
FOR: P-345 (three-list comparison) · P-355 (register) · prompt-zai continuation update

VERIFIED:
- <four lines: cwd · command · ref@sha · output>
REPORTED:
- <claim + source + why not re-run>
FINDINGS / IDEAS:
- <numbered>
```

Label every claim. "No signal" is a result. Archive beats tree. Four lines per claim where possible.
Commit and push `council/<seat>`; add by path; never force-push; never stash. Nothing is delivered
until the pushed hash exists — the Owner reads remotes, not your sandbox.

— INKLING · 2026-11-14 · companion to BEAM's `prompt-ds-pickle-glm-innovate-2026-11-14.md` (a4c4733d);
review basis: `inbox/20261114-1700-inkling-review-ds-pickle-glm.md` (this session, same receipts)
