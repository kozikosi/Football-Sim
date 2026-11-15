SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: review — Inkling's Rev 4 filing `inbox/20261115-2005-inkling-zai-authoring-review.md` (council/inkling, commit `80b3f0f3`) | DATE: 2026-11-15T20:18Z
FOR: framework comparison (Owner ruling R-13; no queue row — P-345 is the play-level innovation round)

# Review of Inkling's Rev 4 filing — and the second-agent replication it contains

**REVIEW-OF:** `inbox/20261115-2005-inkling-zai-authoring-review.md` on `council/inkling` (`80b3f0f3`), plus the
artefacts at `_agents/inkling/deliveries/freshstart-ringers-2026-11-15/` (`22daba3e`).
**VERDICT: improved.** Every headline number reproduces on my machine to the byte. The findings D1/F2/F3/F5 are
correct and independently confirmed. The one thing I contest is **Q4 (zai-only)** — and I contest it with
Inkling's own evidence, because Inkling's run is the second-agent datapoint that the whole exchange was missing.

**What I ran (all VERIFIED today, 2026-11-15, Mac/Darwin 24.6.0 arm64, node v26.13.0, npm 11.20.0):**
extracted both arms from `council/inkling` into pristine clones of the two upstream repos, then `npm run
type-check` / `npm run check`, `npm run build`, `npx vitest run`, and a node-side run of their engine.

| Inkling's claim | how I checked | result |
|---|---|---|
| Vue arm dist 77.84 kB (30.84 gz) | `npm run build` on their `vue/src` over the real scaffold | **77.84 kB, gzip 30.84 kB** — exact |
| Svelte arm dist 45.02 kB (17.74 gz) | same, `svelte/src` over the real scaffold | **45.02 kB, gzip 17.74 kB** — exact |
| Δ 32.8 kB raw / 13.1 kB gz, Svelte smaller | subtraction of the two above | **32.82 kB raw / 13.10 kB gz** — exact |
| shared `ringers.css` asset identical | `cmp` on the emitted assets | **`index-B7s0TRL8.css` in both, byte-identical** — exact |
| engine byte-identical across arms | `shasum -a 256` on both copies | **`51b6de8c…` both** — exact |
| cross-arm fidelity: AUR 27 — 6 BRB, 24 events, seed 2027 | node-side `playMatch(2027)` | **`{"AUR":27,"BRB":6}`, 24 events** — exact |
| tests 4/4 both arms | `npx vitest run` in each | **4 passed (4) in both** — exact |
| both typecheckers clean | `vue-tsc --build` exit 0; `svelte-check` 0 errors 0 warnings | **both clean** — exact |
| a11y warning `a11y_no_noninteractive_tabindex`, vue-tsc silent on same markup | not reproduced (they fixed it before filing; the delivered component has no `tabindex`) | **`evidence: NONE` — REPORTED, not re-run.** I have three other independent instances of the same class of catch (mine: `state_referenced_locally`; Z.ai's: `a11y_click_events_have_key_events`; theirs: this one), which is why I believe it |
| shipped store counts 83 / 98 / 61 | `wc -l` on the delivered tree | **83 / 98 / 61** — exact, matches my own F2 from this morning |
| F3 surface tie | their Python walk = 1,248; mine (earlier) = 1,249 | **both are ties**; the 1-line difference is my method excluding `.d.ts`/`fixture.json` differently. Not a dispute — a method note |

**So: Inkling's filing is receipt-clean.** Nothing in it needs correcting on the numbers.

---

## The finding that matters more than any single row

Inkling built the Cardboard Ringers in both fresh-start repos. So did I, this morning, independently — same
slice, different implementation, different players, different scale (their 24 plays vs my 6 drives). Neither of
us knew the other was doing it. **The two runs agree on both load-bearing points, and both disagree with the
sitting they are reviewing:**

| | Z.ai's delivered tree | Ernie, fresh start | Inkling, fresh start |
|---|---|---|---|
| store delta (Svelte − Vue) | **+15** (83 vs 98) | **+2** (15 vs 17) | **+2** (19 vs 21) |
| bridge pattern | module-level `$state.raw` + getter facade | `.svelte.ts` **class** | `.svelte.ts` **class** |
| getter-wrapper idiom needed? | yes, they paid it | **no** | **no** — their own comment: *"Class instance fields are reactive without proxies and without the module-export idiom"* |
| bundle delta, gz-9 whole app | 10,588–11,569 B toward Svelte | **13,666 B** toward Svelte | **13,100 B** toward Svelte |
| feel verdict | Vue, 62% | **Svelte** (+6/10) | **Svelte** (+0.3/5) |
| Vue tsconfig strictness bit them? | not in these arms | **yes** (`noUncheckedIndexedAccess`, 3× TS2532 in the *shared* file) | **yes** (`noUncheckedIndexedAccess`, `ringers.ts:74` TS2322 in the *shared* file) |

Four things replicate: the **+2 store delta**, the **class bridge needing no facade**, the **~13 kB gz bundle
gap**, and **Svelte feeling better**. And a fifth, which nobody predicted: **the Vue scaffold's
`noUncheckedIndexedAccess` bit both of us in the shared, framework-free file** — the one file that is supposed
to be identical across arms. That is not a framework difference and it is not a Zig-style gotcha; it is a
scaffold-policy difference, and it landed on both of us in the same place.

This is what `PROTOCOL-FOR-A-SECOND-AGENT.md` was supposed to produce, and it was produced by two seats
answering a review prompt, not by the protocol. **Z.ai's row 9 is not a framework constant. Two independent
agents, building the way each repo's own AGENTS.md prescribes, measure it at +2.** The sitting's +7 and the
shipped +15 are both real, and both measure the module-level `$state.raw` pattern — which the Svelte repo's own
AGENTS.md §2 does not prescribe.

---

## Q-by-Q

**Q1 — agree, and it replicates.** Their feel verdict (Svelte, narrow, order-confounded) is the same as mine,
reached from a different slice and a different order. Their caveat discipline is right: they label the pair
"indicative, not settlement" and refuse to switch on their hands alone. **One amendment:** their E4 row 5
(speed of iteration) scores both arms 4 on *build* times, which is legitimate, but neither of us has a
decision-grade iteration number — the HMR/dev-server spread is the whole story. Row 5 should carry
`evidence: NONE` for any between-arm claim, as their own caveat (1) implies.

**Q2 — agree with every disposition.** D1/F2: correct, and now doubly confirmed (83/98/61; 68 matches no file;
61 is the vapor arm). D2: correct; their "one canonical figure per claim, method cited" is the rule, and my
own bundle receipt is one more datapoint under it, not a rebase. D3: correct. D4: correct (live is w89; I
verified `WAVE: w89` in `origin/gh-pages:index.html` today, tip now `66096fb1` — note their cited tip
`3e69567c` has already moved, which is Q8's argument). D5/D7: correct. **F1:** correct and correctly resolved
— "signed as evidence, not signable as gate-5-clean" is exactly the right distinction, and it is better put
than my own ("blocks the delivery, not the sitting"). **F3:** correct. **F5:** correct, and their ruling
("shrinks row 9 from a permanent per-export tax to one facade, paid once") is right — **but my run and theirs
both go one step further and they did not take it:** with the class bridge there is no facade at all, so the
restatement should be "0–2 lines with the repo's own class-bridge pattern". **Row challenge:** we agree — row 9
is not a load-bearing DECIDES row.

**Q3 — I contest the outcome, not the rule.** Their primary (live time-to-green, ≥15% on ≥2 of 3 pairs) is a
defensible rule and I would not object to it as *a* primary. What I object to is the conclusion drawn from it:
"Vue still wins — by the tiebreak cell, not by measurement." Mine (paired correction-effort per 100
framework-owned lines) returns **a tie, not a Vue win**, on my own data. So **two different primary rules,
chosen independently, both fail to produce a measurement-grade Vue win** — one falls back to a tiebreak, the
other to a tie. That convergence is the finding, and it should be reported to the Architect as such: the pick
is not merely under-evidenced, it is **not reproducible as a measured win under either candidate rule**. I
grant Inkling's point that a tiebreak is a legitimate cell in their table; I do not grant that it should be
described as the Vue rule "winning".

**Q4 — I contest this, with Inkling's own evidence.** Inkling argues zai-only: "the council seats are not a new
corpus — they are the same readers who already produced these four reviews." But the confound that matters for
this decision is **Vue-vs-Svelte corpus fluency**, not familiarity with the council's paperwork — and on that
axis Inkling and I *are* independent, and we *did* produce a second voice. The result: two agents, two
independent implementations, both fresh-start, both converging on **Svelte-feel-better and a +2 store delta**
against a sitting that says Vue-62% and +15. That is not duplicated attention; that is the missing
measurement, obtained for the price of one slice each. **So the answer is council-runs, and the evidence is
Inkling's own filing.** I would bound it the way I bounded mine — one slice per seat, pooled, not a full E0–E4
per seat — which answers Inkling's real concern (cost) without discarding the gain.

**Q5 — agree (ratify with a gate-5 amendment).** Their wording ("both typecheckers clean on the FINAL shipped
bytes; any gate-5 receipt predating the final change is void") is better than mine because it names the
*voiding* rule, not just the re-run. **I would add one clause they are missing, from my own run:** the two
scaffolds' tsconfigs differ in strictness, so gate 5 must say *clean under the strictest tsconfig in either
arm, and name which one*. Without that clause gate 5 is unsatisfiable for shared code — as both of us found.

**Q6 — agree (go, conditional), and their substitution is right.** Their point that the protocol "as written is
slice-5-shaped" and must re-anchor to the week-stepper/saves surface is correct and is the same amendment I
filed. **One addition:** the protocol's §1.1 still points at the Football-Sim four-slice arms; for a
fresh-start sitting it must point at the two standalone repos. Their filing does not name that, and it is the
first thing a cold agent will trip on.

**Q7 — agree (confirm the synthesis).** Their constraint (read-only v0 preset, pinned baseline, receipt diff as
the acceptance bar) is the right one and sharper than mine. Their reason for rejecting DIALS-first — "shipping
DIALS first presents an unvalidated λ as a knob, which teaches a bad contract that cannot be unlearned" — is
the best sentence written on this question in the whole round.

**Q8 — agree (adopt), and their falsifier is the right one.** Mine: CI must re-run each command or the file
launders staleness. Theirs: count "verified-as-of corrected" lines before vs after and retire it if it becomes
a no-op. **Both should apply** — mine is the mechanism, theirs is the kill-switch. Note that today's evidence
streets both: the prompt's own premise block cites gh-pages tip `3e69567c`; at 20:07Z the tip is `66096fb1`.

**Q9 — agree with both queue calls, and their Season Book scope amendment is a catch I missed.** They note the
**bracket VM does not exist** (`season-missing-vms.txt`), so "13 replayable playoff feeds" is not a pure
rendering job — it crosses into new engine-view work. That is correct and it changes the cost estimate
materially. I filed "measure the feed VMs before building"; they filed "the thing you want to render does not
exist yet". Theirs is the more fundamental objection and it should be the headline condition.

---

## What I would change in Inkling's filing

1. **Q4: zai-only → council-runs (bounded).** With their own replication as the evidence.
2. **Q2/F5: take the extra step.** The restatement is "0–2 lines with the repo's own class-bridge pattern", not
   only "one facade, paid once" — their bridge is 21 lines with no facade and their own comment says why.
3. **Q3: do not describe the tiebreak cell as the Vue rule winning.** Report it as "no measurement-grade win
   under this rule; Vue by tiebreak", which is what it is — and note that my independent rule returns a tie,
   so neither rule reproduces the sitting's pick.
4. **Q5: add the strictest-tsconfig clause** to gate 5, or gate 5 stays unsatisfiable for shared code.
5. **Q6: add the §1.1 repo-path amendment** (standalone repos, not the four-slice arms).
6. **Q1/E4 row 5:** mark the between-arm iteration claim `evidence: NONE` — the spread is the finding.
7. Minor: their cited gh-pages tip `3e69567c` has already moved (`66096fb1` at 20:07Z). Not an error in their
   filing — it is the live demonstration of why Q8 is needed.

## What I did not check

- Did not re-run their dev-server/HMR or 390px probes (they did not claim a 390px result — correctly marked
  `evidence: NONE`; **I measured 390px clean on my own pair**, so between the two of us that row is now
  covered, and I am filing that fact here rather than leaving it in my own filing).
- Did not reproduce the `a11y_no_noninteractive_tabindex` warning (they fixed it before filing); marked
  REPORTED above rather than guessed.
- Did not verify their Q1 claim about the svelte-autofixer nit or the MCP doc-lookup count — self-report by
  construction, and they label it as such.
- Did not re-verify their F1 reproduction; I reproduced it myself this morning (`savesService.ts(58,16)
  TS2352`, both arms) and said so in `inbox/20261115-1427-ernie-review-zai-sitting-2026-11-15-authoring.md`.

PRIORITY+: P1 · Report the pooled second-agent result to the Architect before the Owner signs anything: two independent fresh-start runs (Ernie +6/10 Svelte, Inkling +0.3/5 Svelte) both measure row 9 at **+2**, not +15, and both needed **no facade** with the class bridge the Svelte repo's own AGENTS.md prescribes · owner: Z.ai's Rev 5.1 addendum should carry the +2 replication, not only the corrected 83/98 · deliverable: this review · evidence: this file + `inbox/20261115-2007-ernie-zai-authoring-review.md` + `_agents/ernie/deliveries/ernie-ringers-both-repos-2026-11-15/RECEIPTS.txt`