SPEAKER: inkling | ROLE: council | TASK: Part 2 of the superseding council prompt — the acceptance battery the yards-given-class node must pass (proposal only; the node is not built and I do not build it) | DATE: 2026-11-17T21:30Z
FOR: P-342 (the pass-class GLM node lineage; the yards node is its sibling — the bead rides the same item)

# Yards-given-class node — the acceptance battery (§5-form proposal)

**Authority:** the Owner green-lit the Architect building the yards node (2026-11-17, per the superseding prompt). This filing is the test-only contract for it; the Architect picks his implementation, and if two seats file batteries he picks the stronger one and says why — that is the process, not a conflict.

**Target build:** the yards node, when it lands — against `65673a00` + the node's own commit; the battery lands in `test/nfl/` (next to `passclass.test.ts`) and in `tools/` (next to `glm-bar.ts`). **WHERE anchor:** none exists yet by design — the anchor is the battery's command lines (below); the Architect names the commit hash here when it lands. **WHY:** the class node proved the pattern (classes modelled, within-class outcomes drawn from the pool restricted to the class); the yards node extends it; nothing about it should be free-form — every check below is binary, run, or FAIL. **SAFE ALONE?** Yes — test-only + one report tool; the node is off by default; the pool packs and the class node are byte-untouched. **HOW TO CHECK:** run the commands; expected outputs in each section.

## 0. What the yards node is allowed to be (naming, not prescription)

Yards on an outcome (completion, and by extension int/sack/fumble return yards if modelled), conditional on (class, game state) — modelled, not drawn from the pool's within-class mix. The class node is the precedent: a proper model, keyed by (game key, event index, tag), off by default, with the pool restricted to the modelled dimension. If the Architect lands a quantile node, a distributional head, or a larger-but-still-keyed lookup, this battery does not care — every section below is written to survive implementation choice.

## 1. Conformance — the oracle, the vectors, the tolerance

**Oracle: the lab's Python evaluator, same standard as the class node** (`tools/mathlab/phase1/` — the shape is the Architect's; I do not create it). The vectors for the class node live at `test/nfl/passclass-vectors.json` (407 states; features + probabilities checked hex-for-hex). The yards battery demands the same discipline:

- **Vectors, bit-for-bit (preferred):** the lab evaluator emits `test/nfl/yards-vectors.json` covering ≥ 407 (class × state) points — for each, the node's per-candidate-outcome pmf (or quantile function, if quantile-modelled) must match the evaluator to 1e-12 relative (hex-for-hex where the same float ops are used; state the tolerance in the file header with the reason, exactly as the class node does).
- **Held-out paired bar (required in either case):** the lab's report (`…/yards-yards-YYYY-MM-DD.md`) must show the paired held-out log-loss/CRPS **beats the pool's within-class mix by ≥ 2 SE** on 2023–2025, positive in each season, with 2021–2022 used only for selection (the class-node protocol; the report's own header must say so or the selection is INFERRED, as it was for the class node). **This is the kill criterion: if the yards node does not clear ≥ 2 SE against the mix on held-out data, it does not ship.** A negative result is a result — the within-class mix is the default reality and the burden of proof is on the node, not on the mix.
- **Tolerance floor for the mean (never loosened):** mean completion yards under the yards node must match the pool node within **0.5 yards or 6 SE of the estimator, whichever is stricter** (the class-node test, `passclass.test.ts:125–128`; ~6 SE of this estimate; a broken coupling shifts it whole yards — keep it). A "yards node" that moves the within-class mean has invalidated the class node's own proof of non-distortion.

## 2. Within-class fidelity (the point of class-then-tuple)

The design exists so the class draw does not distort the within-class outcome. The yards node must keep that property end to end:

- **Test named:** `class-then-tuple keeps the within-class outcome distribution: mean completion yards match the pool node` (mirror of `passclass.test.ts:125`; same 0.5-yard/6-SE bound; same 60–300-drive sample discipline).
- **Extend it to the other classes** (required addition): mean yards per **interception return** and per **sack** must match the pool node within the same 6-SE bound (or a stated, justified bound if returns are too rare to estimate tightly — in which case say so and carry the completion bound alone).
- **The chi-square discipline carries over:** sampled class frequencies equal GLM probabilities (the existing `passclass.test.ts:77` test stays green; the yards node must not touch `passClassProbs`).

## 3. No new holes

The class node closed the pool's probability-0 hole (0.027% of real outcomes had P=0 in the pools; the GLM gave every class ≥ 7.42e-03). The yards node must not reopen or create a hole class:

- **Support test (new, required):** for every class pool in the fit-2023–2025 pack, every distinct yards value reachable from the pool's candidate tuples must have non-zero probability under the yards node — OR the dropped values are **listed, named, and justified in the report** (e.g., "the model refuses > 99 yards on a completion; the pool holds 3 such plays; the exception is accepted because …" — no silent drops, ever).
- **Zero-hole gate (existing, keep):** the game-level `a.holes[4] === 0` assertions stay green; `holes 0` in the 12,000-key run.
- **A yard value outside the pool's range accepted silently is a FAIL** (see fault plant C in §6).

## 4. Paired comparison inside the bar

The 12,000-key paired protocol, unchanged (`tools/glm-bar.ts` or its successor `glm-yards-bar.ts`, same `glm-bar:`-key prefix so the numbers stay comparable):

- Every `METRICS` row inside the **~10% totals bar** — same bar as the class node; print it next to the class node's.
- **Any yards-node shift bigger than the class node's (drives −1.07%, sacks −1.72%, points +0.60%) must be named and explained in the report before it ships** — and specifically re-measured on the **score-state axis**, because the class node's story lived there: the party-line decomposition of Part 1 of this round (down×ytg, field position, score state buckets, glm-pred vs realized per bucket) must be re-run for the yards node. If the yards node widens the trail-8+ sack effect or the blowout visit flips, that is a product fact the Owner sees before defaulting.
- ~~10% bar as a hard gate for totals~~ — the bar is a reporting bar, not an auto-fail; a bigger shift may ship only with its explanation attached and the Owner's explicit acceptance, exactly as the class node's disposition.

## 5. Default-off

- **Without the yards-node option (e.g. `{ yards: M }` / whatever the Architect names it), the game runs bit-for-bit as the pools/class node before it** — the same assertion pattern as `passclass.test.ts:97` (`the default (no passClass) is still the pools record node, bit for bit`) and `pools-game`'s determinism tests. Name it: `the default (no yards option) is still the class-then-tuple pools node, bit for bit — log hashes equal`.
- **The class node itself is byte-identical** with the yards node on: same `passclass.test.ts` vectors, same pack, same class draws. The yards node rides *inside* the tuple draw's payload, not across the class draw's tag.

## 6. Fault plants (minimum four; the battery must catch each)

| # | Fault | Caught by |
|---|---|---|
| A | Yards drawn from the **wrong class's** distribution (e.g. completions sampled from the sack yards distribution) | the within-class mean test (shift of whole yards, ≫ 0.5) |
| B | **Shared uniform** between the class draw and the yards draw (the fault that slipped through at 5.8 vs 11.3 mean completion yards) | the within-class mean test + the chi-square test (`passclass.test.ts:77`); if the shared-tag coupling is reintroduced here, BOTH die — the plant must be repeated for the yards tag, not only for `passClass` |
| C | A **yard value outside the pool's range accepted silently** (e.g. −3-yard completion emitted by a sloppier-than-pool model; or 140) | the new support test (§3) — FAIL on any out-of-support emission; this is the test the pools never needed and the yards node cannot ship without |
| D | Yards node silently **refits** class probabilities, lambda, or slot values (any protected constant) | class-node vectors stay hex-for-hex; protected-constant check on `RATING_SPECS`/`SLOTS` (Creator's-digest unchanged); `git diff` of the pinned pack files is empty under the yards node |
| E (bonus) | Yards node adds a new class-pool **hole** (a pulled yard/outcome that has no candidate) | holes counters stay 0 (§3); a fault plant deleting one candidate tuple must die against the holes assertion |

Each plant is shown failing with the fault in and passing with it out, in the PR/report — the class node's Part 5 discipline. "The test exists" is not the receipt; the receipt is the failing run.

## 7. What the yards node must NOT do (the constraint written where the builder reads it)

1. **Must not refit slot values** — Owner ruling 8 Nov: slot values stay outputs, never refitted; a yards node that nudges EDGE/DT/OLB slot values has overstepped the ruling regardless of how good its receipts are.
2. **Must not change the class node** — not `passclass.ts`, not the fit packs, not the `passClass` sampler; the yards node consumes the class node, it does not edit it.
3. **Must not touch the pool packs** — `nfl-pools-fit*.json` unchanged; the yards draw rides the tuple draw restricted to the class.
4. **Must not become the default** without an Owner decision (and the λ/default sequence stays untouched — λ = 0 is honest today; the λ-objective ruling is a separate, unmade call).
5. **Must not pin football numbers as targets** — no yards total, no TDs-per-game, nothing; the discipline the passclass test file already holds (`// no football number is pinned here`), and for the same reason.
6. **Must not run inside the cutover question** — the yards node is a sim fact; 76 Pancakes' default is the Owner's, after the bucket-bar question is his to weigh.

## 8. My recommendation (INFERRED, falsifiable — the prompt asked)

**Keep the yards node, ship it only if it beats the mix.** The within-class mix is exactly what it is (the real 2023–2025 within-class distribution); the class node bought its 6.6 SE by modelling the class dimension. Yards is the same shape of question: much higher variance (completion-yards sd ≈ 10+, not 60/25), more conditional structure to exploit (state, score-state, down—same features), so there is **more headroom, and also more rope**. If the Architect's held-out paired report shows the yards model beating the mix by ≥ 2 SE — ship with the score-state decomposition attached. If it shows < 2 SE — **do not ship, and say so with the number; that is the experiment working, not a failure.** If the node is a quantile head with an attractive shape but the mix is already within noise of it, the answer is "the mix wins, the node waits for a better feature", not "ship it anyway". A quantile node is a legitimate implementation (Pinball loss, quantile crossing checks) — it is not required; the distributional head the class node used is equally legitimate. What is NOT legitimate is shipping a different feel without the paired bar to justify it. (INFERRED throughout; the numbers in the report are the Architect's to produce and MUSE's to verify — not mine to pre-empt.)

## Filing discipline

Everything above is the battery spec for the Architect; I did not build, edit, or run anything this section requires (there is nothing yet to run). Evidence cited from the tip: `passclass.test.ts` lines named; `pools-game.test.ts` determinism pattern; Part 1 of this round (the score-state decomposition) for §4. Commands named in §1, §5, §6 are the acceptance invocations — they fail today (the node does not exist), which is the correct red state for an acceptance battery.

**BLOCKED:** the node itself (Architect). **OPEN:** the kill-criterion bar (≥ 2 SE) — recommend adopting it verbatim; the Owner may loosen it to "≥ 1 SE" if he wants, but the sign stays. **NEXT:** (1) Architect builds the node behind the option, test-only; (2) the battery lands with it in one commit; (3) whoever verifies runs §1–§6 and posts RESULT lines; (4) the default question reopens only after this battery is green AND the score-state decomposition is attached.
