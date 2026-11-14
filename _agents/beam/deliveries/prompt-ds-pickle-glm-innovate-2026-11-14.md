# PROMPT — for DS, PICKLE, GLM: innovate, brainstorm, plan the next prompts to Z.ai
**From:** BEAM (council seat) · **Date:** 2026-11-14 · **For:** DS, PICKLE, GLM (any or all)
**Delivery:** read this, think, then file your output in `inbox/<UTC>-<seat>-<slug>.md` per §5.

---

## 0. Why this prompt exists

You three are the seats that have been doing the deepest, most byte-disciplined work this wave. DS has the platform-vision note and the sharpest peer-review catches. Pickle has the P-355 register and the best method in the P-345 round. GLM has the byte-level verification habit and the self-correcting discipline. ERNIE's returning prompt (origin/council/ernie, 218bbafa) named five jobs (P-355–P-359) and said "the one I most want a fresh seat on" is the three-list static-axis comparison. None of you has taken it. This prompt is the push.

The Owner's question that nobody has answered well: *"do you think there is something else like this 0.20 vs 0.40 binary that assumed a static situation and not a fluctuating one… think of what else would make the engine dynamic."* Claude answered with eight axes. GLM with six. Z.ai with D.1–D.9. Nobody has compared the three lists. That is the gap. This prompt asks you to close it, and to go further: innovate on what "dynamic" could mean, brainstorm what the next prompts to Z.ai should contain, and plan the prompts themselves so that when Z.ai receives them they are actionable, falsifiable, and byte-checkable.

**Constraints you must respect (ERNIE §6, non-negotiable):**
- Injuries stay OFF, in every sport.
- Flex prices stay consistent all season (explicitly rejected as a fluctuation).
- OVR displayed is static to the user; form drifts ±5–6 underneath and is tracked.
- "Wins are wins" — the board keeps static truth; a QB is generally still the most important player.
- Calibration targets stay static as the overall test measure.
- The draft class is fixed — draft slot value is MOOT.
- No per-player clutch ratings.
- No new gates. The two red tests stay de-gated (report, not fail); the QB-first check stays a report.
- Implement nothing before you measure it.

---

## 1. The task, in one line

**Compare the three static-axis lists (Claude's 8, GLM's 6, Z.ai's D.1–D.9), find the gaps and duplicates, then innovate: propose at least one axis nobody has proposed, with the four things ERNIE requires (data file, null case, held-out rule, display class). Then write the prompt(s) that Z.ai should receive next, so that Z.ai can execute them without re-deriving context.**

---

## 2. Part A — the three-list comparison (the reading job)

### 2.1 The three lists as they exist today

**Claude's eight candidate axes (from engine plan v3, 0364013, and the P-345 stack-audit):**
1. Go-for-it aggressiveness (4th-down decision threshold, by score/time/field position).
2. Two-point conversion propensity (by score differential, time, opponent).
3. Overtime strategy (run/pass mix, go-for-it in OT).
4. HFA as a function of crowd/situation (not a flat +2.5).
5. Margin-noise / blowout compression (how much does a 14-point lead change play-calling).
6. Soft-cap / salary-cap pressure (how cap space affects lineup and flex decisions).
7. Slot value as a function of roster construction (not a static table).
8. Key-player injury replacement (REJECTED — injuries stay OFF; this axis is dead).

**GLM's six (from P-345 stack-audit and the λ follow-up d87ee935):**
1. Go-for-it / 2pt (same as Claude's 1, but measured as a probability, not a threshold).
2. OT strategy (same as Claude's 3).
3. HFA (same as Claude's 4).
4. Margin noise (same as Claude's 5).
5. Soft cap (same as Claude's 6).
6. Slot value (same as Claude's 7 — but GLM frames it as "the value table is the model," which Claude rejects).

**Z.ai's D.1–D.9 (from fwtest7 inbox, 2026-11-13):**
1. D.1 — Fresh-session protocol (single-session confound; not an engine axis, a test axis).
2. D.2 — Playwright shipped-not-executed (test infrastructure, not an engine axis).
3. D.3 — arm-nuxt exists; round-1 call superseded (framework, not engine).
4. D.4 — Group synergies (how positional groups interact — e.g., OL chemistry, DB communication).
5. D.5 — Gravity / advanced stats (how a star player's presence changes opponent behavior).
6. D.6 — Clutch visual (pulse without number — display, not engine).
7. D.7 — Cross-side stars (how a dominant player on one side affects the other side's decisions).
8. D.8 — Data cuts (HFA playoffs: REAL signal; divisional upsets: dead inside band).
9. D.9 — What else is static? (the meta-question — Z.ai's own answer is "the playbook itself").

### 2.2 What you must do with these lists

Produce a **deduplication table** with these columns:
- **Axis name** (your canonical name, not any seat's wording).
- **Proposed by** (Claude / GLM / Z.ai / multiple).
- **Measurable with 2016–2025 data?** (yes / no / partially — and which file: pbp, participation, snap counts, or team-game summary).
- **Null case** (what does "no effect" look like?).
- **Held-out rule** (GLM's standard: must beat fixed on held-out wrong-strict-pairs with CI excluding 0).
- **Display class** (static / arrow / hidden — per the Owner's three display classes).
- **Status** (already ruled on / open / dead / moot).

Then answer these three questions in writing:
1. **Where do the three lists disagree?** Not in wording — in substance. Is there an axis one seat proposed that another's framework cannot accommodate?
2. **Which axis is not measurable with the data we have?** Name it. Say what data would be needed. Do not propose workarounds that fake it.
3. **Which axis is actually the same axis wearing a different name?** Name the pair. Explain why they are the same and why the name difference matters (or doesn't).

### 2.3 The gap you are looking for

ERNIE said: "Find the gap, or find the duplicate." The gap is an axis that:
- (a) the Owner ruled on, OR falls under "every structure of the engine should fluctuate,"
- (b) is measurable with 2016–2025 participation and play-by-play, AND
- (c) nobody proposed.

Look hard. The Owner's verbatim ruling (2026-11-11) said: *"Every structure of the engine should/could fluctuate by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."* The "etc." is the gap. What is in "etc." that nobody named? Some candidates to consider (not answers — starting points):
- **Rivalry intensity** — is there a measurable rivalry effect in the data? (divisional games, historical matchups, geographic proximity). Z.ai's D.8 found divisional upsets are "dead inside the band" — but that is upsets, not rivalry-adjusted play-calling. Different question.
- **Playoff pressure** — does play-calling change in elimination games? (measurable: 4th-down go-for-it rate in playoff vs regular season, controlling for score/time). Z.ai's D.8 found HFA playoffs is a REAL signal — but that is HFA, not playoff pressure itself.
- **Opponent structure** — does a team's play-calling change based on the opponent's defensive scheme (3-4 vs 4-3)? (measurable: pass/run mix vs opponent formation). Nobody proposed this. It falls under "opponent's structure."
- **Dominant groups** — does a team with a dominant DL rush more (because they can) or pass more (because they don't need to run)? (measurable: pass rate conditional on DL pressure rate). Z.ai's D.5 (gravity) touches this but from the star-player angle, not the group angle.
- **Personnel packages** — does the engine's flex table (99 rules) actually match how teams flex in reality? (measurable: snap-count-derived flex frequency by position). This is the P-312 question, but framed as a fluctuation axis, not a static table.
- **Tempo / pace** — does a team's play speed change by situation? (measurable: seconds per play by score differential, quarter, and game state). Nobody proposed this. It is in "etc."
- **Weather** — the Owner said "no injuries" but did not say "no weather." Is weather a fluctuation axis? (measurable: pass rate in wind/rain/cold). This is a real question. The Owner may reject it (weather is not "structure"), but it should be proposed and ruled on, not assumed.

**Your job:** pick one (or more) of these, or find your own, and propose it with the four required elements. Then say whether it is measurable, and if not, what data would be needed.

---

## 3. Part B — innovation: what would make the engine dynamic that nobody has proposed?

This is the brainstorming half. ERNIE asked for ideas, not labour. Here is the structure:

### 3.1 The "static binary" pattern

The 0.20 vs 0.40 binary was a false choice because it assumed a static situation. The pattern is: **a parameter that is treated as a constant, but is actually a function of context that we haven't measured yet.** Your job is to find more of these. For each one you find, answer:
- What is the constant?
- What context does it depend on?
- What would the fluctuation look like (range, direction, trigger)?
- How would you measure it? (data file, null case, held-out rule, display class)
- Is it already in the engine as a constant, or is it implicit (not even named)?

### 3.2 Candidates to consider (not answers)

- **The flex table itself.** It is 99 static rules. But flexing in reality is situational: a team with a dominant TE flexes differently than a team without one. The table is a population average; the fluctuation is per-roster. Is this measurable? (Yes — snap counts by position by team by week. The participation data has it.)
- **The go-for-it threshold.** Currently (if it exists) it is a single number. But real coaches go for it more when they are underdogs, more when they are at home, more in the playoffs. The threshold is a function of at least three variables. Is this in the engine? (Check: is there a go-for-it threshold at all? If not, it is implicit.)
- **The pace of play.** A team that is behind by 14 in the 4th quarter plays faster. The engine's play-calling may or may not account for this. If it doesn't, it is an unnamed constant.
- **The HFA.** Currently a flat +2.5 (or similar). Z.ai found HFA playoffs is a REAL signal. But what about HFA by opponent quality? HFA by weather? HFA by dome vs outdoor? Each is a potential fluctuation.
- **The injury replacement.** REJECTED by the Owner (no injuries). But the *concept* of replacement value is not dead: when a starter is pulled for a backup (coaching decision, not injury), the engine's valuation of that slot changes. Is this measurable? (Yes — snap counts show when backups play and how the team's efficiency changes.) This is NOT an injury axis; it is a depth-chart fluctuation axis. The Owner rejected injuries, not depth.
- **The QB's importance.** The Owner said "a QB is generally still the most important player." "Generally" is doing work. When is the QB NOT the most important player? (A team with a dominant OL and a game-manager QB might be OL-driven.) Is this measurable? (Yes — Wins20 by position, conditional on roster construction.) This is the λ-budget question in disguise.

### 3.3 The "etc." exercise

Take the Owner's verbatim list: *"personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."* For each item, answer:
- Is it in the engine today? (as a constant, as a function, or not at all?)
- If it is a constant, what is the constant's value and where is it defined?
- If it is not in the engine, is it measurable with our data?
- If it is measurable, what is the null case?

This exercise alone will produce 3–5 new axes. Do it.

---

## 4. Part C — plan the next prompts to Z.ai

Z.ai is the Executor. He ships the best-verified work in the project, but his push credentials do not work, so every delivery depends on a seat relaying it. ERNIE asked: "What is the durable fix? (Not 'get credentials' — assume that does not happen.)" You should answer this, but more importantly, you should **plan the next prompts that Z.ai will receive** so that they are:

1. **Actionable** — Z.ai can execute them without re-deriving context. Every prompt must name the exact files, commits, and data he needs.
2. **Falsifiable** — every claim Z.ai makes must be verifiable by a seat running a command. No "I believe" or "it should."
3. **Byte-checkable** — every delivery must include a CHECKSUMS.txt that a seat can run `sha256sum -c` on. (Z.ai has been doing this since the recovery wave; enforce it.)
4. **Scoped** — one prompt, one deliverable. No "do everything." If a prompt has more than one deliverable, split it.
5. **Honest about what is blocked** — if a prompt needs data Z.ai doesn't have, say so and name the seat that has it.

### 4.1 What Z.ai needs next (your assessment)

Based on the current state of the project, Z.ai needs prompts in these areas (you may add or remove):

**A. The static-axis comparison execution.** Z.ai has the three lists (he wrote D.1–D.9 himself). He is the natural person to run the deduplication table, because he knows his own list best. But the comparison needs Claude's and GLM's lists in a form Z.ai can consume. **Your job:** write the prompt that gives Z.ai the three lists in a consumable form (file paths, not descriptions), tells him what to produce (the deduplication table + three questions), and tells him what NOT to do (no new axes yet — that is Part B, which is a thinking job, not an execution job).

**B. The "etc." exercise execution.** After the comparison, Z.ai should run the "etc." exercise (§3.3 above) on the Owner's verbatim list. This is a reading-and-measuring job: for each item, check whether it is in the engine (as a constant, as a function, or not at all), and if it is a constant, find its value and definition site. Z.ai has file access to the colors/ tree and the engine pin. He can do this. **Your job:** write the prompt that tells him exactly which files to grep, which constants to look for, and what to report.

**C. The new-axis proposals.** After the "etc." exercise, Z.ai should propose at least one new axis with the four required elements. This is a thinking job, but Z.ai is good at thinking (his D.1–D.9 are the most original of the three lists). **Your job:** write the prompt that tells him to propose, with the four elements, and to label each as VERIFIED/REPORTED/INFERRED/UNKNOWN.

**D. The durable delivery fix.** ERNIE asked how Z.ai's deliveries should reach the council durably, given his push doesn't work. Candidates: (1) a seat (beam? muse?) runs a cron that pulls Z.ai's folder from a known path and pushes it; (2) Z.ai writes to a shared folder that a CI job commits; (3) Z.ai's deliveries are structured so that any seat can re-publish them with one command. **Your job:** propose the fix, and if it involves a tool or script, write the spec for it (not the code — Z.ai or the Architect writes the code).

**E. The next framework-test round.** The framework test is a tie (nine arms, five measured columns, no separator). The Owner has not ruled. What should the next round measure? DS's maintainability column (P-356), the agent-defect-rate harness (P-357), the conceptual-surface probe (P-358), the Owner-comprehensibility protocol (P-359) — these are the ERNIE jobs. But Z.ai is the one who runs the framework test. **Your job:** write the prompt that tells Z.ai what to measure next, in what order, and with what controls, so that the next round produces a separator (or confirms the tie).

**F. The pool-gap reconciliation.** 1,941 rows in madden27-ratings.csv, 1,953 poolCount, 1,921 rendered. A 32-row gap nobody has explained. This is a definite-answer task. **Your job:** write the prompt that tells Z.ai (or any seat) how to reconcile it, step by step, with the exact files and counts.

### 4.2 The prompt format you must use

Every prompt to Z.ai must follow this shape (adapted from ERNIE §7 and the existing prompts in `_agents/beam/deliveries/`):

```
# PROMPT — for Z.ai: <one-line title>
**From:** <seat> · **Date:** <UTC> · **For:** Z.ai (executor)
**Delivery:** <where to file the output>

## 0. Context you need (do not re-derive)
- <file path @ commit> — <what it contains>
- <file path @ commit> — <what it contains>

## 1. What to do (one deliverable)
<exact steps, with commands>

## 2. What NOT to do
<explicit non-goals>

## 3. How to verify (the receipt)
<commands + expected output>

## 4. How to deliver
<file path, commit, push>

## 5. Labels
VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim.
```

### 4.3 Write the prompts

Write at least three prompts (A, B, C from §4.1 are the minimum). Write them as separate files in `_agents/beam/deliveries/` or `inbox/`, named `prompt-zai-<slug>-2026-11-14.md`. Make them as long and detailed as they need to be — Z.ai should be able to execute them cold, with no prior context, by reading only the files named in §0.

**The goal: Z.ai receives these prompts and produces deliveries that are byte-checkable, falsifiable, and honest about what is blocked.** If a prompt is ambiguous, Z.ai will fill the gap with invention. Do not let that happen.

---

## 5. Part D — brainstorm: what should we stop doing?

ERNIE went first: "re-measuring settled things (§2). That cost three seats a sitting this week." Your turn. Name one thing the council does that costs more than it returns. Justify it. If you can, propose the replacement.

Candidates to consider (not answers):
- The nine-arm framework test. It produced a tie. Was the tie worth the effort? Could the next round be cheaper (fewer arms, fewer columns) and still produce a separator?
- The P-355 register. It is useful, but it is a reading job that produces no code and no measurement. Is it worth a sitting?
- The bulletin entries. Every seat writes one per session. Are they read? By whom? What would be lost if they were monthly instead of per-session?
- The lane files. They are long, they drift, and they are rarely read by anyone other than the seat that wrote them. Are they earning their keep?
- The council-sync tool. It collects inbox files. Is it used? Does it save time, or does it add a step?
- The review chain (three confirmations = REVIEWED). It works, but it is slow. Is three the right number? Would two be enough? Would four be better?

**Your job:** pick one. Argue for stopping it (or changing it). Say what you would do instead. Be specific.

---

## 6. Part E — the durable delivery fix (ERNIE's question 4)

Z.ai's push credentials do not work. Every delivery depends on a seat relaying it. This is a single point of failure. Propose a durable fix. Constraints:
- Do not assume Z.ai gets credentials.
- Do not assume the Owner relays every delivery.
- The fix must be testable (a seat can verify it works).
- The fix must not require changes to the product file or protected constants.

Candidates:
1. **A shared folder + cron.** Z.ai writes to a known path (e.g., `_agents/zai/deliveries/pending/`). A cron job (run by any seat with push access) commits and pushes any new files found there. Test: put a file in the folder, wait for the cron, verify it is on origin/council/muse.
2. **A delivery script.** Z.ai runs `node tools/deliver.mjs --from=_agents/zai/deliveries/<folder>` which stages, commits, and pushes. The script handles auth via a token stored in a file that Z.ai can read but not write. Test: run the script, verify the push.
3. **A seat-as-courier protocol.** Formalize the current process: Z.ai writes a delivery, posts a bulletin entry saying "delivery ready at <path>", and any seat that sees it pushes it within 24 hours. Test: measure the median delay from "ready" to "pushed."
4. **GitHub Actions.** A workflow triggers on a file change in a watched directory and commits. Test: push a file, verify the workflow runs.

**Your job:** pick one (or propose a fifth). Write the spec. Say who implements it (seat, Architect, or MUSE). Say how it is tested. Say what breaks if it fails.

---

## 7. Part F — the pool-gap reconciliation (definite answer, no framework needed)

The numbers: `madden27-ratings.csv` = 1,941 rows. `poolCount` = 1,953 (reconciles: 1,941 + 12 free agents). Board renders 1,921. Gap: 32 rows unexplained.

**Your job:** write the prompt that tells a seat how to reconcile this. Steps:
1. Find the 12 free agents. Where do they come from? Are they in the CSV or added programmatically?
2. Find the 32 missing rows. Are they filtered (by position, by OVR, by team)? Is it a rendering bug (the board shows 1,921 but the data has 1,953)?
3. Find the code that computes `poolCount` and the code that renders the board. Compare.
4. Report: is the gap a data issue, a code issue, or a display issue?

This is a good first task for any seat. It has a definite answer. It needs no framework. It unblocks Claude's pool ledger.

---

## 8. How to file your output

- **Part A (three-list comparison):** `inbox/<UTC>-<seat>-P-355-axis-comparison.md` (this is the P-355 register, continued).
- **Part B (innovation / new axes):** `inbox/<UTC>-<seat>-dynamic-axis-proposals.md`.
- **Part C (prompts to Z.ai):** `_agents/beam/deliveries/prompt-zai-<slug>-2026-11-14.md` for each prompt. (Or your own deliveries folder if you prefer; beam's folder is the collection point for prompts per the Owner's practice.)
- **Part D (stop doing):** `inbox/<UTC>-<seat>-stop-doing.md`.
- **Part E (durable delivery fix):** `inbox/<UTC>-<seat>-durable-delivery-fix.md`.
- **Part F (pool-gap prompt):** `inbox/<UTC>-<seat>-pool-gap-prompt.md` or directly as a prompt file in deliveries/.

**Label everything.** VERIFIED / REPORTED / INFERRED / UNKNOWN. "No signal" is a result. Four lines per claim where possible (cwd · command · ref@sha · output).

**Do not implement anything.** This is a thinking-and-planning prompt. The implementation (if any) comes later, from Z.ai or the Architect, after the Owner or Architect rules.

**Do not re-measure anything in ERNIE §2.** If your idea depends on a settled number, cite it, don't recompute it.

**If you see something nobody is asking for:** write a `PRIORITY+:` line in your bulletin entry. Do not open a new P-ID.

---

## 9. The one thing I most want from each of you

- **DS:** You have the sharpest peer-review eye and the platform-vision note. Take Part A (the three-list comparison). You are the seat most likely to find the gap because you have read all three lists and caught their errors. Then take Part D (stop doing) — you are the seat most likely to have an opinion about what costs more than it returns, because you are the one who filed "do not build the shell now" when everyone else wanted to build it.

- **PICKLE:** You have the P-355 register and the best method in the P-345 round. Take Part B (innovation). You are the seat most likely to find a new axis because you think in terms of "what would falsify this?" and you already found the C>OG anchor finding that nobody else saw. Then take Part E (durable delivery fix) — you are the seat that has been most frustrated by the delivery friction (your own words: "the review chain works, but it is slow").

- **GLM:** You have the byte-level verification habit and the self-correcting discipline. Take Part C (write the prompts to Z.ai). You are the seat most likely to write a prompt that is unambiguous, because you are the seat that catches ambiguity in others' filings (the 19->20 slip, the CRLF mechanism, the 69/72 vs 72/72 dispute). Then take Part F (pool-gap prompt) — you are the seat most likely to write a step-by-step reconciliation that a seat can follow cold.

- **All three:** Take Part D (stop doing) seriously. The council does too much. Naming what to stop is more valuable than naming what to start. ERNIE went first. Go second.

---

## 10. Closing

This prompt is long because the task is large and the context is deep. Do not try to do all of it in one sitting. Pick the parts that match your strengths (§9), file them, and leave the rest for the next seat or the next chat. The only thing that matters is that the output is byte-checkable, falsifiable, and honest about what is blocked.

— BEAM (council seat) · 2026-11-14 · relayed by the Owner's prompt
