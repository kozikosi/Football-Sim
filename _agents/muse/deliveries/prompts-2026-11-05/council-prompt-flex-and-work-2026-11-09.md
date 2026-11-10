# Council prompt — flex answers, a timed-out Architect, and open work (2026-11-09)

This is a prompt for the council (all seats). Read it, then take work from the queue. There is plenty to do — including open-ended brainstorming and improvement work, not just assigned items. Nobody is assigned to anything; work comes from one ranked list.

## Where to start

1. Read `_agents/START-HERE.md` from `origin/council/muse` (the live start-of-chat — it is always current). It tells you how to orient, what to read, and how to find work.
2. Run `node tools/council.mjs next` (v9, from `origin/council/muse:tools/council.mjs`). Take the first line you can do well. If the tool fails, read `_agents/PRIORITIES.md` on `origin/council/muse` (the live queue) and take the top OPEN item.
3. The live queue, the live tool, and the live docs are all on `origin/council/muse`. `council/base` is a stale snapshot — do not take work from it.

## Current state (what has happened)

- **The flex table is settled in principle but not yet built.** The Owner answered Claude's six flex questions (plus a seventh, SAM mirrors OLB) and the answers are stored verbatim in `origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/claude-reply-flex-answers-2026-11-09.md`. The key decisions: FB stays free; C>OG stays 6 and OG>C is 2 (guards are better athletes; snapping costs less than the athletic gap); TE>DIME goes to 12 and TE>FS goes to 12 with two new rules ILB>FS 12 and OLB>FS 12 (all linebackers and tight ends can play FS for −12); TE>NICKEL and TE>SS stay at 6; WR>DB is cheap because receivers can catch and DBs can't; EDGE>OLB and EDGE>DT stay free (intended); ILB>ILB and OLB>OLB stay in the table as documentation (ILB=MIKE, OLB=WILL; SAM is separate and lesser). SAM mirrors OLB exactly (six new rules: EDGE>SAM 0, FS>SAM 6, ILB>SAM 0, OLB>SAM 0, SS>SAM 2, TE>SAM 6). Expected counts once built: 23 at 12, 40 at 6, 16 at 2, 26 at 0 — 105 rules.
- **Claude timed out applying items 3 and 7.** The flex corrections (9 rules, `728b2c53`, tests 290/290) HAVE landed on the Architect's branch, but the TE/SAM changes have NOT — Claude was working on them and timed out. The table on the Architect's branch is still the `728b2c53` version (19/40/15/23, 97 rules). The 3-4 base total is 2400, not the 3600 predicted, because the lineup optimizes differently (TE at DIME, natural FB at TE3, spare DT at FB free). The TE3 weight is 50, not 100.
- **The flex table is retired to one live copy (Owner, 2026-11-09).** The old REV 4 table (107 rules, Owner 29 Oct) is RETIRED to `_archive/flex-rev4-2026-10-29.json` (historical record only). The **only** live flex table is the Architect's branch (`origin/architect/engine-and-seats:tools/mathlab/flex.json`, 97 rules, D-picks + 9 corrections, `728b2c53`; becoming 105 rules once items 3+7 land). The council/muse copy at `tools/mathlab/flex.json` is a mirror of it. `colors/src/engine/flex.ts` and `tools/mathlab/results/flex-compiled.json` on council/muse are RETIRED pointers. Do not use any other flex table. GLM's `final-105` is a candidate/reference for the pending 105-rule table, not the live table.
- **The skill-profile IDEA.** Claude proposed, and the Owner supports, replacing the 97 hand-set flex rules with a per-role skill profile (blocking, coverage, snapping, rushing) that produces flex prices from one place. The Owner's flex table is a guide for the Architect to understand how he wants the engine to work. This is an engine direction, not a build order — but it is the most important design question in the project right now.
- **Flexing is fun, not just accurate.** The Owner is keeping flexing despite its complexity because it is fun for the user — they will want to see their second-favorite QB playing FS even if it is less efficient, or wonder how Tee Higgins would play at CB. That principle should shape the UI and the engine.
- **MUSE owns council infrastructure now (Owner, 2026-11-09).** Claude owns the product/engine only. The queue is on `council/muse`, the tool is `tools/council.mjs` v9 (macOS /tmp silent failure fixed, CONFIRM files classify as notes — VL's P-008 review is restored, REVIEWED — failed fetches print a warning, `next` always prints a fallback). The Owner does not read or sweep the queue manually; queue hygiene is the custodian's (MUSE's) standing job under standing permission. The retire citation was corrected (`_agents/RETIRES-CITATION-CORRECTION-2026-11-09.md`).
- **Z.ai Slice 3 (P-316) is queued** — hydration + board chrome (gone-odds tooltip, my-needs sticky row). The prompt is on `council/muse` (`zai-slice3-2026-11-09.md`) with a full flex briefing. Z.ai consumes the engine snapshot pinned at `4ca9a071` and does not chase the moving flex table in Slice 3.
- **New seats:** Iceman and Inkling are working. Crouton and CK are ignored indefinitely (Owner). P-314 (Slice 2 review) is REVIEWED ✓✓✓.

## Work to take (from the queue — take the top line you can do)

The queue holds the ranked work. Highlights (read the rows themselves for the briefs):
- **P-315** — Slice 2 deeper verification: prove the board drafts as the CHOSEN team end-to-end (not just the header name).
- **P-312** — flex edge-case playtest: hunt weird flex edge cases and inconsistencies.
- **P-313** — calibration re-run vs the anchor (N=300 skilled 47% playoffs / 6% SB); report only, do not tune.
- **P-311** — draft-scan comparison vs the P-310 baseline (fresh 626 / tune 1212).
- **P-322** — design the per-role skill profile (the IDEA): how would blocking/coverage/snapping/rushing profiles produce the Owner's flex prices? A design, not a build.
- **P-323** — verify the flex answers (items 3 + 7) once the Architect builds them: counts (23/40/16/26, 105 rules), the base total, the tests.
- **P-324** — review Z.ai w88 (position values in WINS, the NEW localWins20 measurement) when it lands.
- **P-325** — resolve the WR3 question + Colors/PreColors fidelity: why does WR3 move on PreColors but not on Colors? Reconcile SAM and CB1 too.
- **P-326** — recheck the localWins20 math + improve the method (SAM spread sensitivity, OT1 boundary, centers, ±5 vs ±3/±7, slope×20 vs centered 20-span, the name).
- **P-327** — fix the council/muse flex tooling (Super P-193): `flexcheck.mjs` rejects penalty 12 (it only accepts [0,2,4,6] + QB=10), so it cannot validate the tier-12 table items 3+7 require; `flexengine.js` spot checks are stale vs REV 4. Update both.
- **P-276** — the N=1000 reproduction (VL in flight); **P-289, P-290, P-293, P-296, P-303, P-306** — open review/build items. Take the top line of `next` and do it.

## Recent council work (read it — it changes things)

- **Super, P-193 flex-guide data review** (`inbox/20261110-0055-super-P-193-flex-guide-data-review.md`): the flex guide data lives in three inconsistent versions (council/muse REV 4, 107 rules; architect branch, 97 rules; Owner's expected post-items-3+7, 105 rules). Items 3+7 are not applied to either live version. Blockers: the council/muse `flexcheck.mjs` rejects penalty 12, and `flexengine.js` spot checks are stale. P-327 is the fix.
- **GLM, final-105 candidate** (`_agents/glm/deliveries/flexrebuild/final-105/`): GLM built the 105-rule table (base `728b2c53` + items 3+7 verbatim = exactly 10 moves) and it lands at **105 rules {12:23, 6:40, 2:16, 0:26} — the Owner's expected counts exactly**. This independently confirms the flex-answers counts. His `flexcheck` fails only on the SAM destination (the same blocker Super found).
- **Iceman, P-309 grid reconcile** (`inbox/20261110-0054-iceman-P-309-grid-reconcile.md`): 11/11 theta-grid cells reproduced straight from the frozen engine (including QB>FS@90 θ1.0 = 24.45). The ×20 discrepancy existed only in Super's superseded version. The D-picks foundation is solid.
- **Inkling, w87 live verification**: w87 verified live (receipt in bulletin + lane). w88 builds on a verified w87.
- **OR, P-116 review** (improved, 6 findings D-013–D-018). **VLOC, P-167 review** (improved — retire as superseded by w52–w62). **Glyph, E-208 review** (improved — aggregation/source precision; Glyph is filing again).
- **The seat ranking** (`_agents/muse/deliveries/seat-ranking-2026-11-09.md`, MUSE): GPT's ranking method revisited — qualitative tiers, confidence labels, receipt-backed above volume, verified vs reported, temporal bias noted. Read it and critique it, especially the MUSE and GPT self-assessments. The ranking is provisional; a decision-changing finding moves a seat up.

## Brainstorm, innovate, improve (even if you take no queue item)

If you have a chat and no queue item fits you, do this work instead — it is real work, and the Owner wants it:

- **The skill profile.** Design it. What skills does each role need (blocking, coverage, snapping, rushing, catching, range)? What would the scores be for the Owner's key cases (WR>TE 6 for lack of blocking; TE>DIME 12; QB>FS 12; FB free)? Where does the profile produce a price the Owner would disagree with, and why? File it as a P-322 proposal or a review of one. This is the highest-leverage thinking in the project.
- **The flex table.** Read it (`tools/mathlab/flex.json` on the Architect's branch, `728b2c53`). Find inconsistencies, edge cases, or prices that don't match the Owner's stated reasons. Playtest the weird flexes (a DT at FB, a TE at DIME, a QB at FS). File what you find (P-312 is the home for edge cases; a new proposal is fine too).
- **The base total.** The 3-4 base total is 2400, not the 3600 predicted. Reproduce it. Explain the cheapest arrangement in plain football terms. Predict what items 3 + 7 will do to it. File it.
- **SAM.** SAM mirrors OLB as a destination (item 7). Is that right? Are there flexes where SAM should differ from WILL (SAM comes off the field for the nickel; WILL stays)? Say so with evidence.
- **The fun principle.** How should the UI make flexing delightful (not just correct)? What would make a user try a weird flex? Propose it — a mock-up, a snippet, or a written proposal.
- **The queue and the tool.** You use them every chat. If `council.mjs` or the docs mislead you, say so in your bulletin entry (MUSE owns them and fixes them). If a P-item is dead, stale, or superseded, propose its retirement with evidence.

## How to work (the rules that matter)

- **Push as often as possible.** Council prompts are long and seats time out on them (the Architect timed out on a big prompt, and the Owner has seen it happen). **Commit and push after every finished file/task — not just at session end.** A timed-out chat loses unpushed work; a pushed commit survives it. If you finish a review, a proposal, or a verification, push it before you start the next thing. If you are mid-task and the chat is getting long, push what you have (even as a WIP commit) and say so in your bulletin entry.
- **The council prompt's highlights are the priority; `next` is the fallback.** The Work section above lists the items that matter now. Take one of those first. Use `node tools/council.mjs next` when no highlight fits you — it surfaces old P0 reviews that still need done, but the highlights are the current work.
- **Review template.** When you review someone's work, use this format so the next reviewer (and the Architect) can follow it without guessing:
  ```
  SPEAKER: <seat> | ROLE: council advisor | TASK: <P-ID> review | DATE: <UTC>
  FOR: <P-ID>
  REVIEW-OF: <branch>:<path> (the file you reviewed)
  VERDICT: ok | improved | rejected

  ## What I checked (commands run against <branch>:<file>)
  | Claim in the author's file | Result |
  |---|---|
  | <claim> | VERIFIED / WRONG / REPORTED — <command + output> |
  ...
  ## Bottom line
  <one paragraph: is the work correct, what is the verdict, what happens next>
  ## What must change (if improved/rejected)
  <numbered list>
  ## Evidence label
  VERIFIED (...) · REPORTED (...) · INFERRED (...) · UNKNOWN (...)
  ```
  **Include the exact command for every claim**, so a reviewer can copy-paste to re-run it. Fetch shared files once per session (e.g. Pre-Colors, flex.json, boxscore.ts) into /tmp and reuse them across reviews — do not re-fetch the same file for every review. Batch 2–4 reviews per push, and verify once per batch.
- **Design proposals must include a runnable script.** If your design claims numbers (a fit, a count, a price), commit the script that computes them alongside the design, so a reviewer can re-run it instead of hand-computing. A number that cannot be re-run is REPORTED, not VERIFIED.
- Nobody is assigned to anything. Work comes from the queue; you take the top line you can do, or you pick a brainstorming item above. Never wait for a particular seat, and never tell another seat what to do.
- Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. "Done" needs a command and its output.
- Write your work to `inbox/<UTC>-<seat>-<ID>-<slug>.md` on your own `council/<seat>` branch, commit, and push after every finished file. Never force-push, never `git stash`.
- Reviews: read the author's file, check every claim against the repo with commands, write `inbox/<UTC>-<seat>-<ID>-review.md` (`REVIEW-OF:`, `VERDICT: ok|improved|rejected`, what you ran). You may not review your own work or the same item twice. Three ok/improved from three seats = REVIEWED.
- A file that only confirms a claim (`CONFIRM:`) is a note, not work — it does not make you an author.
- Do not edit the product file, `AGENTS.md`, `CLAUDE.md`, `PRIORITIES.md`, `STATUS.md`, `CHRONICLE.md`, `PROJECT-KNOWLEDGE.md`, or protected constants. Do not assign work to a named seat.

## Innovate

You are reviewers and advisors, so the innovation ask is lighter than for the builders — but it is still real. When you read a proposal, a table, or a build, ask: what is missing, what is inconsistent, what would be better, what would make this more fun or more true? Bring a new idea, not just a verdict. If the skill profile, the flex table, or the board chrome opens a better way to think about the problem, say so — with evidence, in writing, in your inbox file. That is how the council earns its keep.
