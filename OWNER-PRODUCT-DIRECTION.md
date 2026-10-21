# Owner Product Direction and Decision Record

**Owner direction received:** 2026-10-21  
**Status:** Shared working record. Items marked “Owner direction” should guide work; items marked “open” still need a concrete proposal or Owner decision. This document records the Owner’s statements and does not authorize production-code changes.

## Product vision and priority

The Owner’s goal is a website with many accessible draft-season simulations:

1. Current NFL simulation.
2. All-time NFL simulation.
3. Current NBA simulation.
4. All-time NBA simulation.
5. Current and all-time MLB simulations.
6. Current and all-time NHL simulations.
7. A current and all-time simulation for each selected soccer league ranked above MLS, plus MLS.

The four major American sports therefore imply at least eight simulations: current and all-time versions for NFL, NBA, MLB, and NHL. The number of soccer simulations depends on the league list.

Priority is:

1. Improve the current Football Sim and make V21 as polished and sophisticated as possible.
2. Add an all-time version of the Football Sim.
3. Build the current NBA simulation.
4. Build the all-time NBA simulation.
5. Expand to other sports and soccer leagues.

Do not let future-platform planning derail V21. Also avoid choices that needlessly make the later projects difficult.

## Architecture: provisional preference and question still open

The Owner has not settled the repository or folder structure and has asked for concrete questions and options because the earlier question was too abstract.

**Provisional Owner preference:** protect the current NFL product; build distinct sport simulations with sport-specific math; keep a self-contained HTML output for each simulation; extract shared simulation-engine pieces only after NFL all-time or NBA work proves that they are genuinely reusable.

This is a starting point, not a final architecture decision. Before asking the Owner to choose, the Architect should inspect the current repository and present a small number of concrete options. Each option should show a folder/repository sketch, what is shared, what stays separate, migration cost, and the cost of being wrong. Do not assume that every project must either copy the whole Football Sim or be forced into a universal engine.

## All-time player pool and approval

- Target roughly **1,500–2,000 player candidates per sport**. The Owner believes a larger pool is unnecessary absent a specific demonstrated need.
- All council members may collaborate on building and reviewing the candidate pools.
- The Owner gives final approval to each final player pool.
- Keep Owner-supplied notes as source material. Do not silently turn a fan list, ranking, or source mention into an approved player-season or production rating.
- The earlier proposed current-player adjustment of approximately −5 remains **unapproved**. Do not apply it until its eligibility rules, scope, and calibration are explicitly settled.
- The Owner may provide NBA 2K and FIFA rating material. Preserve source, game/version, season, scale, and any mapping. Treat the provided ratings as inputs, not as permission to skip review.
- The Owner permits NBA 2K ratings to inform basketball OVR. The Owner will approve the final NBA pool and may adjust all-time rankings using personal judgment.
- NFL all-time ratings will need a transparent method developed by the group, with the Owner approving the final pool and approach.
- Keep person identity, player-season, sport, position, historical team, current franchise, career status, source provenance, and simulation rating distinguishable.
- Do not invent decimal public ratings or add fields that the engine does not use. Public-facing player ratings and other published data should be integers. Internal calculations may use decimals where useful, as the NFL “Wins” calculation does, but show the public result as an integer unless the Owner explicitly approves another display.

## Franchises, eras, and modern rules

**Owner direction:** use today’s franchises for all simulations, including all-time simulations. Historical franchise information can appear as context on the draft board—for example, Oscar Robertson may be identified as having played for the Cincinnati Royals while being drafted to the current Sacramento Kings franchise.

Simulation rules should be based on modern/current sport rules and strategy. When evaluating former players, use the Owner’s modeling assumption that each has had one year to practice and train under modern rules. This allows evidence-informed reassessment of skills: for example, the Owner considers it reasonable to explore Kevin Garnett becoming at least a league-average three-point shooter after modern training because of his long-two profile. Conversely, the Owner considers very poor free-throw shooting a reason not to assume that players such as Chuck Hayes, Ben Wallace, or DeAndre Jordan would become strong three-point shooters after one year.

These are examples of the Owner’s intended historical reevaluation, not fixed formulas. Claude, the Owner, and council members should make recommendations with supporting evidence and keep assumptions explicit.

## Draft and simulation principles

- All drafts should be **snake drafts** and should resemble the football simulation’s draft experience where practical.
- There should be enough candidates to fill the required positions/rosters, but a draft does not need to consume the entire pool. Leaving many eligible players undrafted is expected.
- Simulation math should be optimized for each sport. Reuse mathematical approaches where they fit; do not copy football-specific assumptions into basketball, hockey, baseball, or soccer without evidence.
- The Owner favors player flexibility and positionless thinking across sports. Football’s flex rules are a design guideline, not a rule to copy verbatim. Flexing should be possible when plausible, with sport- and position-specific penalties or hard constraints where needed.
- The exact modern flex rules, eligibility limits, and penalties for each sport remain design work and require concrete examples before implementation.
- The Owner wants the statistics that explain “Wins” and other outcomes to be visible. Basketball may expose additional draft-board statistics such as TS+; the exact metric list, definitions, data sources, and presentation remain open.

## Beta and human review

The simulations are beta projects with no active users. The Owner will personally play every simulation and decide whether it works as a product.

Automated tests are useful as a safety net—especially for total breakdowns, null results, and fringe cases the Owner might not notice in ordinary play—but passing a suite is not a prerequisite for continuing development or automatically sufficient for Owner acceptance. Keep test results accurate: a partial or failed run must not be called a pass. Automated checks complement the Owner’s hands-on review; they do not replace it.

## Council assessment and evidence

The Owner agrees with using the contribution assessment as a decision aid, with an important limit: it may help the group make sense of conflicting or contrasting results, but it must not become a strict rule that mechanically decides whose answer is correct.

Use direct receipts, same-artifact comparisons, and independent reproduction as the primary way to settle factual claims. When the evidence remains incomplete or the results are genuinely difficult to compare, relevant task-specific history and the contribution assessment may help decide whose interpretation to investigate next or how to weigh an unsupported report. Neither rank nor consensus may override stronger reproducible evidence or change anyone’s authority.

The official name is **Council Contribution Assessment and Assignment Guide**. Its provisional qualitative order is for assignment guidance and context, not a scientific measurement of intelligence or a determination of character, honesty, loyalty, or sabotage risk. The former numerical scores and formulas are withdrawn; the numeric draft is archival history only.

Use exact speaker labels in every contribution. For original work, begin with:

`SPEAKER: <exact name or handle> | ROLE: <role> | TASK: <task or run ID> | DATE: <UTC timestamp>`

For forwarded text, preserve the original speaker and add a separate `FORWARDED BY: <exact forwarder>` line. If attribution is unclear, say so rather than inferring from style. Missing attribution is a provenance-format issue, not evidence of intent.

## Sport-specific starting points

### NBA

The Owner’s basketball direction is recorded in [NBA Owner Design Direction](./_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md). In brief: use an OVR-oriented model informed by NBA 2K, keep public ratings integer, account for basketball’s smaller lineups and greater positional flexibility, use a snake draft, expose useful outcome statistics, and apply the modern-rules/one-year-training assumption to historical evaluations. Exact roster size, rotation controls, flex penalties, and metric formulas are not yet finalized.

### Baseball, hockey, and soccer

The Owner’s starting intuition is that baseball and soccer may resemble football in draft structure; hockey may be closer to basketball, but that is uncertain. Treat these as research hypotheses. Develop sport-specific evidence and concrete simulations before locking those choices.

For soccer, the Owner intends to include leagues ranked above MLS plus MLS, each with current and all-time versions. Before implementation, ask the Owner to approve the ranking source, date/cutoff, and league eligibility list.

## Current source-intake status

PR #4 is a research intake, not a canonical player pool. It preserves eight NFL and one NBA Owner-supplied notes, records provenance, and includes a first source-backed omission pass of 17 NFL candidates plus NBA candidate Sam Jones. The additions remain proposed and unrated. The Owner’s final approval is still required.

The intake’s integrity review notes that some reported malformed records (including Curry, Brady, and Mahomes examples) were not found in these new raw intake files. Identify the specific other file and branch before claiming those records were corrected. Keep the raw Owner files unchanged.

## Questions to answer with concrete choices

1. What repository/folder structure best protects V21 while making the next NFL and NBA projects straightforward? Show two or three options and recommend one.
2. For NBA, what should the first pilot decide about roster size (the Owner floated up to ten players), computer-managed rotations versus optional user-set rotations, position flexibility, and visible metrics?
3. What does an OVR-centered, integer-public rating pipeline look like for NBA 2K inputs and collaboratively assembled NFL ratings? Which attribute inputs materially improve the OVR or position-fit decision?
4. What minimal safety checks are most valuable for this beta project without making E2E completion a gate to all further work?
5. Which future choices truly need the Owner, and how can the council present them as clear options with a recommended default and the cost of being wrong?
