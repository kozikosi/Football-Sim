# Council — the open question round: think, don't execute

**From:** MUSE (High Councillor) · **To:** the council · **Date:** 2026-11-11 (HST)

**Read this first, because it is different from every prompt before it: there is no work list in this document. No queue items. No reviews to file. No checklist. No items to close. This prompt asks you to think — about the questions nobody has answered yet — and to file what you find. That is the whole job.**

## §0 — Who this is for, and what "done" means

This prompt is for the seats who do the deepest thinking. You know the standard because you set it in the last two days: the estimator notes that proved a method biased and then built a better one; the convergence gate that gave two builders one artifact to pass; the protocol that turned three arguing positions into one; the portability analysis that showed a 97/97 fit is really one Owner ruling in disguise. Any seat may take this up. The bar is the thinking, not the name.

**Done means:** one inbox filing per idea, when the idea is ready — not before. There is no deadline and no count. A single filing that changes how we think is worth more than ten that restate what we know. If you spend a whole session on one question and file one page, that is a good session. If a question defeats you, file what you tried and where it broke — a good negative result is a filing too.

**Disagreement is the point.** The best filing in this round is the one that tells the council it is wrong about something it currently believes. Do not soften a dissent to be polite. State it, show the receipt, and let the next seat answer it.

## §1 — Where things stand (so nobody re-litigates settled ground)

Briefly, because the record is in the queue and the inbox:

- **Z.ai's Phase 2 v3 delivery is REVIEWED** — nine reviews (3 ok, 6 improved), the substance verified by byte-identical re-runs, the three open numbers closed (2020 FB 0.0887, λ-conditioning n 544, gravity 10/10 exact). The checksum question is settled: 69/72 on the pushed bytes, 72/72 on the desktop zip — both true, different bytes, one line-ending conversion in the shipping pipeline. The REV 4 pass (LF writers, re-run the step on shipped bytes) is owed to Z.ai, and DS found one more small defect since (the C2 D4 field is mislabelled — a drive-count R², not D4). That is Z.ai's job, not this round's.
- **The estimator protocol has converged** — two-gap Lab (gaps 10 and 20, report R = Wins20/Wins10 first), conditional-moment validation on held-out 2023–2025, margin shape gate, no dispersion matching ever. DS's ANOVA estimator is a no-simulator cross-check, not a replacement. What is NOT settled: the λ objective (0.40 exact tiers vs 0.20 mean error — a Pareto frontier, the Owner's call) and what λ *means*.
- **Claude's Phase 1 baseline has landed and passes the ~10% totals bar** on held-out 2023–2025 (points +8.3/+2.9/+2.4%, drives +2.9/+6.3/+8.7%, plays +1.4/+2.9/+4.9%). He has adopted the two-gap protocol for Phase 2. His findings: drift is policy and success, not clock (the pack must be era-aware); neutral play leaves a variance budget (points SD 9.98 real vs 9.20 sim); penalties-off is measured (−2.8% points, +4.4% plays). The baseline still needs a council review round — that is queue work, not this round.
- **The merged derivation sits at V2 96/97, V3 97/97** — and the one-row difference is the per-slot C>OG ruling (does the Owner's 6 mean the cheaper guard spot or either spot?). The λ objective is the other open Owner call.
- **The P-345 triage (P-347..P-353) is proposed, awaiting Owner ratification** — estimator protocol, drive-budgeted staging, two-view spec, gravity in the event log, dual positions, gate panel, folds as product surface. Think about them; do not assume they are ratified.

## §2 — The questions (eight of them; take any one, or one nobody has asked)

These are genuinely unanswered. There is no right answer in the queue, no filing that already settles them, and no seat who owns them. Pick the one that pulls at you.

### Q1. Is max-of-two-layers the shape, or is there a single more beautiful formula hiding in the merge?

The merged derivation prices a flex move as `max(ability, exposure × guard)` — a football price and a time price, fused by a max. It works (96/97, 97/97 per-slot, zero under-priced rows). But is the max the final shape, or a scaffolding? What would a single formula look like that keeps both properties — the ability layer's fit and the guard's zero-under-priced structure — without the max? Or is the max itself the beautiful answer, because it says plainly that a move costs the worse of what it is and what it risks? Show your work on the 97 either way: a candidate formula must be demonstrated, not asserted.

### Q2. Ledger vs rebuild — do they converge, or does one win?

Claude is building his own play-level engine (design `a0ddc584`, Phase 0 kernel REVIEWED, Phase 1 baseline landed). Z.ai is building his Ledger (drive engine authoritative, plays staged inside drives). They are drifting in parallel, and the convergence artifact on the table is one shared gate panel both must pass on the same data. Is that the right convergence mechanism — or is it a truce that papers over a real fork? What would make you change your mind about which shape wins? What does the gate panel need to contain for a pass to mean something, and what happens if they diverge on it? If you think one shape should win outright, say so and say what the loser costs.

### Q3. What does λ mean — and which objective should the fit serve?

The estimator is settled; the objective is not. 0.40 orders the slots exactly (97/97) but mis-measures the gaps (mae 1.311); 0.20 measures the gaps better (mae 1.076) but mis-orders some slots (86/97). They are a Pareto frontier, not one number — and the Owner has not ruled. But deeper than the choice: what *is* λ? Is it a real quantity (a property of how ratings move wins) or a dial (a knob the Owner turns until the board looks right)? Does the answer change if the fit is judged on the draft board (ordering) versus on trades and value (gaps)? And is DS's ANOVA estimator — no simulator, exactly unbiased for balanced panels — a better estimator than the two-gap Lab, or a useful cross-check that should stay a cross-check? The Owner decides the objective; this round should tell him what the choice costs, in product terms, not in fit terms.

### Q4. What is gravity, really?

Gravity is now, and it may be part of the formula. We have a first measurement (the top receiver's share of team deep targets, 30–33% all decade) and a second (the deep-target Herfindahl, 0.18–0.21, top two receivers ~54% of deep shots). But what *is* gravity — attention, fear, a double team, a usage share, a thing a defense does or a thing an offense earns? How does it enter the formula: inside v (so the guard moves with it), as a fold (so it is measured and shown), as a stat (so the user sees it)? What else measures attention that we have not measured — and what would falsify the claim that a player *has* gravity? Think about it for basketball too: what is gravity when there are five players and no line of scrimmage?

### Q5. What breaks when the formula meets basketball?

Basketball is the second sport, deferred as a build until football is done — but design thinking is welcome now, and this is the question that tests whether the formula is truly portable. The derivation takes five inputs (positions, duties, HAVE matrix, NEED profiles, weights + λ + cuts + floor). For basketball: what are the positions and duties (rim protection, ball handling, 3pt shooting — what else)? What is the HAVE/NEED split for a point guard, a center? What is the analogue of exposure — minutes share? What is the analogue of a flex move — a guard playing forward, a center playing power forward? And what does the formula need that football never asked for — a new term, a new measurement, a new idea? If you think the formula ports cleanly, show the basketball duty table. If you think it breaks, show exactly where.

### Q6. What makes the game delightful?

Flexing is kept partly because it is FUN — the board should make trying a second-favourite quarterback at free safety, or Tee Higgins at corner, visible and delightful. But fun is not a fit metric. What makes a player *try* a flex they would not otherwise try? What makes the draft tense, the season worth finishing, the 20-0 chase worth attempting? What is the most fun the engine could produce that it does not yet — a moment, a decision, a surprise? This is not a feature list. It is a question about what the game *feels like* to play. If you have played it (or watched someone play it), say what you felt. If you have an idea for a moment the game should create, describe the moment, not the mechanism.

### Q7. What does the game look like when anyone in the world can open and play it?

The project is at a scale inflection: from a sim for twenty friends toward something anyone can open and play. What is missing for that stranger? What would make them stay past the first screen, past the first draft, past the first season? What would confuse them, bore them, or lose them — and what would make them tell a friend? Think about the first five minutes, not the hundredth hour. This question is about the product, not the engine — and it is the one the engine-first council is most likely to under-think.

### Q8. What is the question nobody is asking?

The blind spot. Every round has one: the assumption nobody has challenged, the measurement nobody has taken, the idea nobody has filed because it sounds wrong. What is it? Name it, say why nobody has asked it, and take a first run at answering it — or show why it cannot be answered yet and what would be needed.

## §3 — How to file

- One inbox filing per idea: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: P-345` (this round is the innovation round; use P-345 unless your idea belongs to a different item, in which case say so). Then `IDEA:` text. Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**, with the receipt in the text.
- Code or scripts longer than ~150 lines stay in your lane (`deliveries/`); the inbox file names the path and commit.
- Push often — commit and push after every finished filing, not just at session end. A timed-out chat loses unpushed work; a pushed commit survives it.
- **Do not file a review of another seat's work as part of this round.** Reviews belong to the queue. If another seat's filing in this round changes your mind, say so in your own filing and cite it — that is how the round converges.
- **Do not create queue items.** If your idea becomes a piece of work, say so in the filing ("this could become a P-item") and the custodian will sort it. This round produces ideas; the queue produces work. Keep them separate.

## §4 — The bounds (the Owner's decisions that frame the thinking)

Think freely inside these; do not re-litigate them in this round (if you believe one is wrong, file that as its own idea with the receipt, and the Owner decides):

- **No gates, no floor, no named exceptions, no pair tables, no per-player style labels, no intangibles.** OVR + preferred position are the only true inputs. Display is simple integers; the 0/2/6/12 system is not necessary; no slight/real/heavy labels; the user-facing scale is deferred until the engine's natural output is seen.
- **The 99 flex rules are a guide, not a target.** The most portable and beautiful formula wins; hitting 99/99 is not the goal.
- **Ratings generation is the Owner's alone, later.** Do not design a ratings system.
- **Basketball is design-only until football is done.** No basketball build in this round.
- **The ~10% totals bar** (points, drives, plays, yards, TOP) is the Owner's bar for the engine; the margin distribution is shape/properties at Phase 1, binding at Phase 2.
- **The per-slot C>OG ruling and the λ objective are the Owner's open calls.** Think about what they cost and what they decide; do not decide them.
- **The wasted-capability term/tax is not to be promoted or broadcast** (Owner's words: he does not like it). Do not build on it.
- **Punters must play every game; FB and CB4/Dime should play ~10% of snaps.** The engine must model punting. (P-308 — the Architect's job, not this round's.)

## §5 — Innovate (this IS the job, so it gets the full section)

Think around the issue. Brainstorm. Improve. Create new ideas. The prompt tells you what is settled and what is open — not how to think. The strongest filing in this round is the one that surprises the council: a formula nobody proposed, a measurement nobody took, a question nobody asked, a dissent nobody filed. Be specific where the idea touches numbers (show the receipt, or say what receipt would settle it), and be honest where it is a hunch (label it INFERRED and say what would make it VERIFIED). If your idea needs data that does not exist yet, say what data and how it would be got. If your idea kills another idea, say which one and why — a good kill is a contribution.

Do not execute the queue in this round. Do not file a review. Do not close an item. Think.

— MUSE (High Councillor) · inviting, not ordering · 2026-11-11
