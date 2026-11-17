SPEAKER: vl | ROLE: council | TASK: follow-up to the GLM round — verify 4th-down reversal, compare yards batteries, bucket-bar proposals, D3 landing set, P-317/S3-S4 checks | DATE: 2026-11-17T22:36:00Z
FOR: P-342

Council prompt — follow-up to the GLM round: verify the 4th-down reversal, compare the three yards batteries, the three bucket-bar proposals, and the D3 landing set

You are the council — reviewers and measurers for 76 Pancakes, a football draft simulator. The Architect (Claude) builds the engine. You investigate, propose, test, and dissent in writing. You do not build the product. You do not decide Owner questions. This prompt is self-contained: you need only this prompt and the repo. It supersedes the short reversal prompt (same three questions, now with the full round behind them) — send this one, not both.

The state — what is true as of this writing (all labels are MUSE's, not yours to upgrade)

The node. The pass-class GLM node (the Architect's tip 65673a00 on origin/architect/engine-and-seats) models which of four pass outcomes happens — complete, incomplete, sack, interception — from 15 state features, then draws the outcome detail from the pool restricted to that class. It is REVIEWED: six seat verifications (Beam, Inkling, VL, Ernie, Glyph, GLM) plus MUSE's verification. Suite 406/406. It is off by default; the default itself is the Owner's decision, not yours.

The sacks shift is SETTLED — Camp A wins. The paired comparison shows sacks down and drives down under the GLM node. Three seats adjudicated the mechanism independently and agree: the sack-rate gap is a per-state rate effect, about 97% (Ernie's cells: rate −0.0965 points, mix −0.0034 points, of a −0.0998 point gap). Inkling located it on the score-state axis — the GLM conditions on score and the pools node does not, its predictions match its realized rates within 0.11 points per bucket, and the sign flip (more sacks while trailing big, fewer while winning big) is what conditioning on score has to produce. GLM ran it at 120,000 paired games: the state-mix term is +0.01 points (refuted), and the 2016–2022 pack shows what real drift looks like (a uniform −0.673 points) — the default pack has none. DS agrees. Do not re-litigate the sacks mechanism.

The 120,000-game refinement — state your N. GLM's 120,000-game run moved the headline numbers: sacks −1.07% (not the 12,000-game −1.72%), drives −1.05% (real), points +0.19% (not significant). The 12,000-game figures were partly key-domain noise. When you report a number in this round, state your N; if you run at 12,000, say so.

The reversal — the one open mechanism question. Ernie reversed his own verdict (filing _agents/ernie/inbox/20261117-2101-ernie-glm-driveshift-mechanism.md on council/ernie, 21:01Z — read it in full). He says the drives shift is a 4th-down cell-selection artifact, and it does block the default. The mechanism: the class sampler needs the class sub-pool to hold 25 plays; on thin 4th-down cells it leaves the down-aware cell (it uses the finest level 8.06% of the time under the GLM vs 65.51% under the pools node) and falls to levels that drop the down entirely, so a 4th-down incompletion ends the drive 24.3% of the time under the GLM vs 68.3% under the pools node — 3,601 extra drives that should have ended across 12,000 games. The hole counter cannot see this fallback (it reads all zeros on both nodes). His fix proposal (§6): bound the fallback by the level the pools node itself would have chosen. No other seat has addressed it — Glyph, GLM, and Inkling all filed after it and none mention it; Inkling says the drives shift got no decomposition of its own. That is Part 1, and it is the headline of this round.

The residual split (sacks only). Ernie-now, Inkling, and GLM say the ~1% sack residual needs no separate pass (fit the model parameters; it is calibrated and football-honest; a calibration note, not a change). Beam says it needs one more pass on the sack class before defaulting for long-run statistics. Glyph says not clearly required, but worth an explicit check if season sack aggregates are decision-critical. Your Part 1 verdict should say where you stand on this too — but the headline question is the drives artifact, not the residual.

Three yards batteries filed — Part 2 compares them. The Architect's next node models yards on a completion (and by extension the other classes) rather than drawing them from the pool's within-class mix. Three seats filed acceptance batteries: Beam (inbox/20261117-2056-beam-P-342-yards-battery.md, 7 checks), Inkling (inbox/20261117-2130-inkling-P-342-yards-node-battery.md, kill criterion: held-out log-loss beating the mix by ≥2 standard errors), GLM (inbox/20261117-2132-glm-P-342-yards-node-acceptance-battery.md, headline: calibration-improvement ratio ≤0.9× on 120,000 paired games). They agree on the shape — beat the mix or don't ship, mean completion yards within 0.5 yards, default-off, fault plants including the shared uniform, no refitting anything protected. They differ on the headline bar: Inkling's needs the raw data (not in the repo); GLM's runs from the repo alone. The Architect picks the stronger one and says why.

Three bucket-bar proposals filed — Part 3 compares them. Ernie's (six bucketings, with a falsifier), Beam's (a coarser duplicate with dead placeholder code), Glyph's (the most complete — context buckets and calibration tables, full code in his filing inbox/20261117-2134-glyph-glm-mechanism-adjudication.md). The Architect lands one. Inkling also proposed a stale-pin gate (tools/pin-watch.mjs) — a tripwire that fails when a packaged tree's pin line disagrees with its own bytes (the deployed tree's README and checksums still name pin 4ca9a071 while the bytes are d3bd81d2).

The D3 landing set — Part 4 reviews it. Four box-score mutations survive the engine suite (punt yards, touchdowns, first downs, the interception spot). Three seats filed the test-only assertions: Ernie (with a probe test — all four die under his probe), Beam, Inkling (exact inserts, plus a fifth survivor — safeties scored — and two more named: extra-point makes/attempts and the punt count).

Two checklists filed for the Architect — Part 5 reviews them. Inkling filed nine acceptance checks for the Team Select store change (the draft-position slot — the restore path drops the saved order; that is the verified defect) and six-plus-seven checks for the save-system engine contract (the snapshot type and the async store, which have not landed yet).

Settled — do not reopen. The F2/F3 falsifier dispute (both laws die on Node 24; the Node-26 portability fix is Z.ai's Cakepanz-5 job, not this round). The deployed tree's 9 suite failures (measured twice — all stale carried expectations, zero engine regressions; the re-pin is the Architect's). The sacks mechanism (above).

Part 1 — Verify Ernie's 4th-down reversal (the headline)

Who answers: any seat except Ernie — he authored the finding and cannot verify his own work. Ernie: do not file a Part 1 verification of your own finding; if you have a correction or a refinement, file it as an addendum to your filing and say so.

Three questions, in order.

Is Ernie's mechanism right? Reproduce it with independently written code: the level histogram on 4th-down pass plays (GLM finest-level share 8.06% vs pools 65.51%), and the incompletion-ends-drive share under both nodes (24.3% vs 68.3%). Run at 120,000 paired keys where you can; if you run at 12,000, say so. Note: Ernie's shipped decomposition script is not runnable from a clean tip extract (it expects his own /tmp pass logs and a log export the tip does not have) — reproduce the formula independently, as Glyph did for the sacks decomposition, and say so. If you cannot reproduce it, say so with your numbers.

Does it block the default? Ernie says yes, on the ground that a 4th-down incompletion failing to end the drive three times out of four is a state machine disagreeing with football, not a residual bias you document and accept. Vote, with your reasoning. Say whether the sacks finding (within-bucket bias) and the drives finding (cell artifact) can both be true — for example, the sack shift is bias and the drives shift is the artifact — or whether one is wrong.

Does Ernie's §6 bound fix it? Read his proposal (bound the fallback walk by the level the pools node itself would have chosen, never coarser). Say whether you accept it, prefer another fix, or think no fix is needed. Do not land code yourself; the Architect lands it.

This is the check the default decision waits on. Do not file a verdict on the default without it. The Owner decides the default itself.

Part 2 — Compare the three yards batteries

Who answers: seats who did NOT author a battery. Beam, Inkling, and GLM authored the three — you may each file a one-paragraph defence or concession of your own bar, but not the comparison.

Read all three batteries in full (paths in the state section). Compare them on: the headline bar (Inkling's ≥2 standard errors on held-out data vs GLM's ≤0.9× calibration ratio on 120,000 paired games — which is the right gate, or should the battery carry both, one as the in-repo gate and one as the held-out standard?); the fault plants (is four enough, and does GLM's tag-separation plant under both node settings add anything Inkling's misses?); the constraints (anything missing — for example, does any battery say what happens to the score-state decomposition the class node's story lived on?); and what each battery gets wrong, if anything. Recommend one battery, or a merged set with the stronger line from each, with reasons. The Architect picks the stronger one and says why — your comparison is the input to that pick, not the pick itself.

Part 3 — Compare the three bucket-bar proposals, and judge the pin-watch gate

Who answers: seats who did NOT author a proposal. Ernie, Beam, and Glyph authored the three — you may each file a one-paragraph defence or concession, but not the comparison.

Read all three proposals in full (Ernie's in his adjudication filing, Beam's in his, Glyph's with full code in his). Compare them on: bucketing coverage (does the tool reproduce both the fine-cell decomposition and the context redistribution?); calibration output (does it print predicted vs realized per bucket?); the falsifier (Ernie's includes one — is it part of the tool or a separate check?); and runnability (does it run from a clean tip extract on Node 24 and Node 26?). Recommend which to land, or a merge — the obvious candidate is Glyph's content with Ernie's falsifier; test that claim, do not assume it. Then judge Inkling's pin-watch gate idea (tools/pin-watch.mjs, in his innovations filing): is it worth building as a council tool, and who builds it? A council tool needs no Owner decision to build — if you think it is worth an afternoon, say so and name what it must check; if you think it is scope creep on the re-pin, say so.

Part 4 — Review the D3 landing set

Who answers: seats who did NOT author a D3 filing. Ernie, Beam, and Inkling authored the three — you may each file a one-paragraph note, but not the review.

Read all three filings in full. Check each assertion's anchor and HOW TO CHECK. Check Inkling's fifth survivor (safeties scored) and his two extras (extra-point makes/attempts, the punt count) — are they the same class of mutation, and do they belong in the same commit as the four? Say whether the three filings agree or differ and which is stronger. Recommend the exact landing set — which assertions, in which file, at which anchors — so the Architect lands it in one test-only commit. Do not change the engine yourself.

Part 5 — Review the P-317 slot checks and the S3/S4 contract

Who answers: one more seat for each (or one seat for both). Inkling authored both checklists; he does not review his own.

Read Inkling's filings in full (inbox/20261117-2155-inkling-team-select-slot-acceptance.md for the draft-position slot; inbox/20261117-2200-inkling-save-contract-S3-S4.md for the save-system contract). Verify the defect claims against the tip, don't take them on trust: read the store code and confirm the restore path drops the saved order; read the tree and confirm the snapshot type and the async store have not landed. Say what is missing or too weak in each checklist, and file the improved checklist (or your concurrence with the improvements) as a §5-form proposal. If you agree with a checklist as written, say so with the reason — a concurrence with evidence is a filing, not a rubber stamp.

Part 6 — Innovate: what would make the work better? (lighter, for the council)

Two questions, short answers. First: this round produced 13 filings from 3 seats, and the 12,000-vs-120,000 noise lesson only surfaced because one seat ran ten times the keys — should the house standard for paired comparisons be 120,000 keys, or is 12,000 the right default with 120,000 reserved for the headline numbers? Second: the council is now producing tools (the bucket-bar, the merge gate, the pin-watch gate) as well as reviews — is that the right shape, or should tools go through a different door than filings? Think around the question; a good idea here is worth more than a correct verdict elsewhere. Do not let this part eat the round — two paragraphs each, then file.

Part 7 — Filing rules (read before you file)

One file per seat per part, in your own inbox/ directory: inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md. First line: SPEAKER: <seat> | ROLE: council | TASK: <what you did> | DATE: <UTC>, then FOR: P-342 for Parts 1–3, FOR: P-356 for Part 4, FOR: P-317 for the slot checks and FOR: S3/S4 for the save contract in Part 5, FOR: P-342 for Part 6. Label every claim VERIFIED (you ran it) / REPORTED (someone else ran it; name them) / INFERRED / UNKNOWN. End with BLOCKED, OPEN, NEXT. Push after every finished file, on your own branch only. Work comes from this prompt; do not assign work to a named seat — if a part needs a voice it does not have, say so in your filing and leave it open. If you disagree with anything in this prompt, say so in your filing and do what you think is best, inside your lane.

Two notes on the choices inside it. First, the authorship exclusions in Parts 1–5 are the Verifier rule — a seat can't verify its own work — not assignments to named seats; I checked them against the house rules before writing. Second, I kept the macro prompt separate: this one is only the follow-up to the round that just landed. Say the word if you want Pickle's merge-gate question folded in instead.

This follow-up supersedes the short reversal prompt — its Part 1 asks the same three questions with the full round behind them, so send this one, not both. The macro prompt stays separate and unsent. The file is unpushed. The push offer covers five files: my GLM verification filing, the long council prompt, the macro prompt, and this follow-up — the short reversal prompt is superseded, so it stays off the list.
