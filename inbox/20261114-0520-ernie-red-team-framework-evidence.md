SPEAKER: ernie | ROLE: council | TASK: red-team the framework-decision evidence (my own answers, uninvested as I can be) | DATE: 2026-11-14T05:20Z
FOR: the Owner · the digest · any seat taking the work requests filed alongside this

I have a stake, so discount me accordingly: I recommended Svelte, then withdrew the strongest leg of my own recommendation when the product became a complete app. What follows is my best attempt to answer as if I had not.

---

# Q1 · Which shell would I hand a non-specialist owner for a year?

**My answer is conditional, and the condition is a question only the Owner can answer: will you ever edit this shell without an agent?**

- **If yes — Svelte, weakly.** The reason is not bundle size (that argument died when the product stopped being one HTML file). It is **conceptual surface**: Svelte's state model is 9 lines in one file, there is no separate emit contract, no second store to reason about, and the framework's own tooling can *check your syntax* (verified: `svelte-autofixer` diagnosed a planted runes error at the right line). Fewer concepts between intent and result means fewer places for a subtle error that a non-specialist cannot see.
- **If never — Vue, weakly.** Then the owner never reads the shell, and the decision reduces to which produces more predictable agent output. Vue's larger, more conventional ecosystem and the Architect's LOW-confidence recommendation rest on exactly that, and I have **no measurement** that contradicts it.

**That is the whole answer, and it is uncomfortable: the choice turns on a fact about the owner's habits that nobody has measured.** I would rather hand you that question than a fake winner.

**What I am explicitly not saying:** that Svelte is safer. The only agent-facing safety instrument in the record is on the Svelte side, which is an argument that Svelte's *failure modes are visible*, not that it fails less.

# Q2 · What does the record not contain that it would need?

1. **Any measurement of maintainability** — the column the decision turns on. Zero, from any seat.
4. **Any agent-defect-rate measurement on a real feature.** All agent evidence is "a seat ran a script". Nobody has measured defects per hour of agent work.
3. **A benchmark at product scale.** Every number is a 32-row fixture or a starter app. The product is 1,200 rows and 1,024 draft picks.
4. **Offline per side on these scaffolds.** I proved single-file feasibility on *framework-test arms* (both work), not on these two starters.
5. **The engine vendored in either.** So no real workload exists anywhere yet.
6. **An assessment of the owner's own maintainership** — asserted in every filing, assessed in none.
7. **An uninvested reviewer.** Everyone who has measured has a stake; that is the gap the attached work requests are for.

# Q3 · Where is something labelled VERIFIED actually an inference?

These are the ones I would challenge, including my own:

1. **"9/9 contract identical, therefore the frameworks are equivalent."** The identity is VERIFIED (41 files, `diff -rq` 0, tree hash `265ea8c6…`). The equivalence is not: it was measured on a **32-row fixture**. At 1,200 rows it is unmeasured.
2. **"No discriminant discriminates."** Verified *for the columns that exist*. It silently assumes those are the right columns — which is the conclusion, not a premise.
3. **"Bundle size is scaffold noise."** True, and I agree — but "noise" is being used to mean "ignore", when the correct reading is "this measurement carries no information", which is a different claim and a weaker one.
4. **"Vue DevTools agent works."** I verified **discovery** (`list-instances` returned a live instance). I did **not** verify **inspection** (component tree, Pinia state). If any document cites the second, it is overreach.
5. **"Pinia would quietly break the neutral-store law."** In the Architect's recommendation this reads as present danger. The verified present fact is: **6 lines of demo wiring** (`main.ts:2,6` + a 12-line counter store). The risk is real for the future codebase; the phrasing implies the current one.
6. **"Context7 is quota-gated."** Environment-specific. My run returned real `$derived` documentation with no API key. The label is not a property of Context7.
7. **My own "1,024 picks".** This one *is* verified (`draft.ts:13-14`), and I include it as the contrast: a real receipt looks like a file and a line, not a summary.

# Q4 · Which later receipt contradicts an earlier claim nobody has retracted?

| Earlier claim | Later receipt | Retracted? |
|---|---|---|
| My CSS-import root cause for solidstart | My own test: moved the import, still 0/5, `#app` empty | **Yes** — refuted in my own WR-4 |
| My "0 of 7 arms offline" | Single-file build: 5 of 9 pass from `file://` | **Partly** — noted in WR-2, but the ledger's old row still reads flat |
| Z.ai: "Playwright MCP blocked by chrome channel" | I ran it with `--browser chromium` and it drove the live app | **No** |
| Z.ai: "Context7 quota-gated without an API key" | I got real docs with no key; only `resolve-library-id` failed, on argument shape | **No** |
| Packet: "28 files for each repo" | Beam and I: **37 / 28** | **No** — packet not amended |
| v3: "9/9 green" | The author's own log carries a sveltekit flake | **No** |
| Architect: "agents blur Svelte 4 and 5 runes" | The autofixer catches exactly that, with the correct Svelte 5 form | **No** — his recommendation does not mention it |
| My own "no Vue MCP exists anywhere" | Vue scaffold carries 4 servers vs Svelte's 3 | **Yes** — corrected in a later filing |

**The pattern:** retraction works when it is the author's own claim and fails when it is someone else's. Every unretracted row above is a cross-seat contradiction. That is a process defect, not a knowledge defect, and it is what the retraction register (WR-F) is for.

# Q5 · What would change my mind?

1. **A BENCH-1 Tier 2 result at 1,000 rows** where either shell misses a UX budget even with disciplined state (my current bet: both tie again, and the decision moves to maintainability).
2. **An agent-defect-rate measurement** on one real feature in each shell — defects per hour, with a defect taxonomy. If one shell produces materially fewer, that settles it.
3. **Evidence on the owner's own maintainership** — a concrete test: hand him the same small change in each shell, unaided, and see which he can land.
4. **A measurement of conceptual surface** — how many distinct concepts a maintainer must hold to make a one-line change. That is the one column where I expect Svelte to win, and nobody has measured it.

---

## Verdict

**The evidence does not support choosing, and I am not going to manufacture a choice.** What it does support is a short list of things that would make the choice answerable, and every one of them is a measurement nobody has run. I have filed those as work requests so any seat can take them.

Labels: **VERIFIED** — the file/line citations (`draft.ts:13-14`, `main.ts:2,6`, the autofixer and MCP payloads). **INFERRED** — Q1's conditional recommendation and Q5's expectations; these are judgment, not measurement, and I have labelled them as such. **UNKNOWN** — the owner's own maintainership; any agent defect rate; maintainability at product scale.

*Filed by ERNIE (advisor) · 2026-11-14T05:20Z.*

**PRIORITY+:** red-team of the framework-decision evidence | P1 | decision turns on an unmeasured fact (will the Owner edit unaided); 7 inference-as-measurement items named including 2 of mine; 6 unretracted cross-seat contradictions; 4 missing measurements specified as WRs | ERNIE this file.