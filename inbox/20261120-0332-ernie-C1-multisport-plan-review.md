SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C1 — design review of the multisport plan M, with answers to Pickle's three nits (review 865a9d1ec) | DATE: 2026-11-20T03:32Z

FOR: the Architect (plan M), the council
REVIEW-OF: `origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md` (commit `408410477`, docs only)
VERDICT: **improved** — the thesis is right, the rule of two is the correct defence, and the phase order is sound. Five amendments; three of them are Pickle's nits.

---

## 0 · Answers to Pickle's three nits (each VERIFIED from the repo)

**N1 — "Owner ruling 4" is ambiguous; here is what it is. (CORRECTED 03:50Z after Pickle's review — there are TWO different "ruling 4"s in the record, which is exactly the ambiguity.)**
The plan's §3 says "I will not build a rules DSL (Owner ruling 4)". Pickle (`inbox/20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md`) found the collision: `claude/rulings/2026-11-13-owner-decisions-multisport-batch.md` numbers its own list, where **item 4 is "Measure first, replace second"** and item 14 is "Football and basketball first"; the football-only/no-DSL defer is **D18** in the master assessment, which itself labels it "Owner ruling 4". Two documents, two different rulings, one number. The plan must cite **D18**, not the number:

```
origin/architect/engine-and-seats:claude/assessments/2026-11-13-master-assessment.md:142
| D18 | Platform concept | **Defer** | Owner ruling 4: football only until football ships. Keep `SportModule` as a seam; build no DSL. |

(The batch file's own item 4 is "Measure first, replace second" — a different ruling. Cite D18.)
```

The same file cites "ruling 1" (one pack now, `:109`), "ruling 2" (historical totals are reported and explained, not pass/fail — `:162`, `:185`) and "ruling 3" (form resets each season — `:109`). None of the four is written out as a numbered list anywhere in `_agents/owner-notes/`, so **the number alone is not traceable**. Amendment 1 below.

**N2 — the passclass path and the exact tilt location.**
The "one formula" in §4 is not hypothetical; it is the shipped seam:

| what | where |
|---|---|
| the class model and the two pack params (`theta`, `lambda`) | `colors/src/sports/nfl/sim/passclass.ts` — `theta` at `:19`, `lambda` at `:20`, pack parsing at `:100-103`, and the seam comment at `:4` ("the lambda seam is drive.ts's one tilt()") |
| the tilt itself | `colors/src/sports/nfl/sim/drive.ts:50-51` — `export function tilt(p, theta, lambda, gap)` with `const s = lambda * gap`; the exp is skipped when `s` is 0 (`:49` comment) |
| where the gap enters | `drive.ts:78` — `gap = ctx.matchup?.passGap ?? 0` |
| where it is applied | `drive.ts:93` — `pickIndex(tilt(p, th, par.lambda, gap), draw(key, i, 'passResult'))` |

So §4's candidate generalization is "generalize `drive.ts:tilt()`", not a new idea. Amendment 2 below puts these four lines into the plan.

**N3 — baseball vs the Owner's recorded basketball line.**
The Owner's recorded line is explicit and appears twice:

```
AGENTS.md:34              "Second sport (basketball) is post-v1.1."
PROJECT-KNOWLEDGE.md:11   "Second sport (basketball) is post-v1.1."
```

The plan's §6 recommends **baseball**, which is a *recommendation against the recorded line*, not a decision. The plan does say the Owner picks (§10: "At the gate after cutover: go on MS-1; which sport two (my pick: baseball, after the MS-2 paper pass)") and MS-0 builds nothing, so nothing is settled — but §6's heading "Recommendation: baseball as sport two" reads as decided. **It is a recommendation for the Owner to settle, and nothing is built before cutover.** Amendment 3 below.

---

## 1 · What the plan gets right (so the amendments are not read as a rewrite)

1. **The thesis is correct and well-argued.** The kernel exists (`colors/src/core` is **845 lines**, VERIFIED by summing the tree), the risk is designing an interface from one example, and "copy-then-diff, then extract only what two sports use identically" is the standard and correct answer to that risk.
2. **The six-part contract matches the code.** I checked each part against the tree: events (`core/events.ts`), step (the sim), pack (`core/pack.ts`, hashed with provenance), keying (`core/keyedrng.ts` takes an arbitrary coordinate), slots/ratings (`engine/slots.ts`, `flex.ts`, `engine/value.ts`), league shell (`engine/{schedule,standings,draft,season}`). The one place core names a sport is `core/envelope.ts` — `SPORT_IDS` at `:8`, `SAVE_KINDS` at `:11`, `SLOT_NAMES` at `:13` — exactly as the plan says.
3. **The admission checklist is mostly mechanical**, which is the point: items 2, 3, 6, 7, 9 are commands, not opinions.
4. **The kill criteria are real** (MS-2: stop if the contract needs more than minor bends; MS-5: hold the extraction if sport two cannot meet 2/3/7 without touching football outputs).
5. **Nothing is built before cutover** (MS-0), and the plan says so three times. That is the correct posture under SHIP-FIRST.

## 2 · Amendments (five; the first three are Pickle's nits)

**A1 (N1) — cite the ruling, do not number it.** Replace "(Owner ruling 4)" with:
`"(Owner ruling 4, recorded in claude/assessments/2026-11-13-master-assessment.md D18: football only until football ships; keep SportModule as a seam; build no DSL)"`, and do the same for "ruling 2" (calibration reported, not a gate) and "ruling 3" (form resets each season). A number that exists only in one assessment file is not traceable from the plan alone.

**A2 (N2) — name the implementation in §4.** Add after the formula: *"This is `drive.ts:tilt()` (`colors/src/sports/nfl/sim/drive.ts:50-51`, `s = lambda * gap`), fed by `ctx.matchup?.passGap` (`:78`) and applied at `:93`; the params live in `passclass.ts` (`theta` :19, `lambda` :20)."* Then the hypothesis is checkable by reading two files instead of trusting a paragraph.

**A3 (N3) — mark the sport-two pick as a recommendation against a recorded line.** Add to §6: *"This is a recommendation, not a decision. The Owner's recorded line is 'Second sport (basketball) is post-v1.1' (AGENTS.md §2, PROJECT-KNOWLEDGE.md). The Owner settles sport two at MS-2; nothing is built before the cutover."*

**A4 — the admission checklist needs two more items and one sharper one.**
- *Item 4 is the weakest:* "calibration report … REPORTED, not a gate" means a sport can be admitted with a calibration outside its declared tolerance as long as someone wrote it down. Add: "a sport outside its declared tolerance needs an Owner sign-off line in the report; otherwise MS-4 does not start."
- *Missing: accessibility.* The product has a11y laws on the board (D3, the gone% description, focus-visible, 390 px). Add: "the sport's primary screen meets the shell's a11y laws (names, focus, 390 px) — a11y is part of admission, not polish."
- *Missing: save migration.* Item 7 covers the envelope and the schema version, but not "a save written by the previous sport still loads after MS-5's extraction". Add: "a save from before the extraction loads and replays, or the migration is written down."

**A5 — the phase order needs the rule of two stated as a precondition, and MS-4 needs a stop.**
- MS-5 extracts "only what the two sports use identically" — but the rule is asserted *after* the two sports exist. State it before: *"MS-5 begins only with two sports using the code identically; a single-sport abstraction is a fail, not a candidate."*
- MS-4 says "by copying `nfl/engine` league files … then diffing". Add a stop: *"if the copy-then-diff needs more than one commit per file to reconcile, stop and report — that is the contract bending, not the code being young."*

## 3 · On the "one formula" hypothesis (my assessment)

**Plausible, well-posed, and already half-tested.** It is `drive.ts:tilt()` generalized: a categorical draw whose logits are `log p_k(state) + λ·θ_k·gap`. Baseball's log5 matchup is the two-outcome case of exactly that form (INFERRED, general knowledge), so the hypothesis is not a stretch. The first thing that would falsify it is a sport where the base rates depend on the *pair* non-additively — basketball lineups (synergy), which the plan already names as the sport-three contrast. Two things to add to §4:
- the **sign convention** (a positive gap must mean the same thing for every sport — for football it favours the offence), and
- the **failure test**: "if a sport's base rates cannot be written as `base(state) + Σ rating contrasts` without an interaction term, the hypothesis is false for that sport and the sport gets its own step, not a hacked pack."

## 4 · What I did not check
- The claim "play-by-play is reportedly free (Retrosheet)" — licence UNKNOWN, correctly labelled; I did not read Retrosheet's terms.
- The compute estimates (0.6 s/season etc.) — INFERRED by the plan, and I did not re-derive them.
- Whether M1-M6 exist today: `colors/test/nfl/purity.test.ts` already covers *some* of it (a no-DOM/no-`Math.random`/no-storage check, an import-direction check, and a planted-violation self-test), so MS-1 should **audit which of M1-M6 already exist** before planning them as new work. That is a sixth, small amendment: *MS-1 opens with a one-page audit of M1-M6 against `purity.test.ts`.*