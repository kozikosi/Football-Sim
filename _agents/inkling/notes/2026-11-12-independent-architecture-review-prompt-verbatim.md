# Verbatim — the Owner's "Independent Architecture, Simulation Quality, and Project Strategy Review" prompt

Recorded by INKLING, 2026-11-13T02:25Z, as received in the Owner's message to this seat (2026-11-12). It is recorded so the council can read what the Owner sent to (or had drafted for) GPT. **Not on `council/muse` (VERIFIED 2026-11-13, `git grep -l` for its distinguishing phrases found nothing there).** The Owner's earlier scattered-thoughts message and GPT's §§1–10 assessment ARE already recorded by MUSE at `_agents/owner-notes/2026-11-12-platform-vision-and-architecture-verbatim.txt` (31,931 B, includes the "add 4th in the test design" and sim-as-design-platform addendum) — this file is the *remaining* material from the same message. Typos and formatting preserved as received. Labels in the source are the source's own.

Provenance note (INKLING): this prompt is addressed to a reviewer ("You are participating in an independent technical, product, and simulation-design review of Football-Sim"). Whether GPT has already run it is UNKNOWN to this seat; the Owner's message presents it as "gpt's full recommendations" alongside Muse's abstracts. It is recorded, not endorsed. My positions on it are in `_agents/inkling/notes/2026-11-12-multisport-engine-overarching-plan.md` and `inbox/20261113-0225-inkling-multisport-engine-note.md` (TO-ARCHITECT).

--- Begin verbatim (KG, 2026-11-12) ---

# Football-Sim: Independent Architecture, Simulation Quality, and Project Strategy Review

## Your role and mission

You are participating in an independent technical, product, and simulation-design review of **Football-Sim**, a football simulation project being developed with substantial assistance from AI coding agents.

Your task is not simply to recommend a modern technology stack, review code quality, or produce a generic software architecture document. Your task is to help determine how this project can become a genuinely good, reliable, maintainable, and distinctive football simulation while remaining feasible for its owner to direct and develop with AI assistance.

I want you to think like a combination of:

- A senior software architect responsible for making sound, proportionate technical decisions.
- A simulation engineer concerned with deterministic behavior, statistical validity, and model credibility.
- A football analytics researcher who understands the difficulty of translating real football into a simulation.
- A product designer concerned with the actual experience and usefulness of the finished application.
- A technical project manager who can turn architectural recommendations into a realistic sequence of work.
- An adversarial reviewer who actively searches for weaknesses in the prevailing assumptions, including the assumptions of the other AI agents.

I want independent judgment, not agreement for its own sake.

You should be willing to tell me that an existing idea is misguided, that a proposed technology is unnecessary, that a part of the project needs to be rebuilt, or that something important has been overlooked. Equally, do not recommend a major rewrite merely because a different architecture is fashionable or theoretically cleaner.

**The objective is to make the product better, not to maximize architectural sophistication.**

---

# 1. About the owner and how to approach this project

I am the product owner and primary decision-maker. I have a strong interest in football, simulation design, analytics, and the conceptual architecture of software, but I am not a professional software engineer.

I use AI coding agents to help design, inspect, implement, test, and maintain the project. I want to become better at directing these agents and making good technical decisions, not turn myself into a full-time programmer.

This distinction matters. A theoretically excellent system that requires constant infrastructure management, complicated deployment, paid services, extensive debugging, or a professional engineering team may be a worse choice than a simpler system that I can understand, operate, and maintain.

My priorities are:

1. Build a genuinely good football simulation.
2. Make the project sufficiently reliable that I can trust its outputs and continue developing it.
3. Establish a clean, understandable architecture that supports future improvements.
4. Use AI agents effectively without allowing them to create architectural disorder.
5. Produce a credible portfolio project that demonstrates the ability to conceive, organize, and deliver a complex software product.
6. Preserve the option of expanding into other sports eventually, without allowing that possibility to distort the football product today.

### Important constraints

- Future tools and services should be free to use.
- Prefer free, open-source, or included tooling.
- Do not assume I want to pay for APIs, model access, hosting, databases, monitoring, analytics, or developer services.
- Prefer local-first operation and static hosting where practical.
- Avoid unnecessary accounts, backends, databases, authentication systems, infrastructure, and operational responsibilities.
- Do not make me dependent on a complicated professional development workflow.
- Do not assume I want to become a programmer or infrastructure engineer.
- Do not recommend rewriting the frontend in Python. The current project is a TypeScript/Svelte project; an engine extraction or performance-oriented implementation should be justified by actual evidence.
- Do not confuse a good portfolio project with a project that needs enterprise architecture.
- Prefer a small number of dependable tools over a large ecosystem of overlapping tools.

I am willing to invest substantial thought into the architecture and simulation methodology. I am not interested in unnecessary engineering work that does not improve the actual product.

---

# 2. Project background

The project began as a single-file NFL Draft Simulator and evolved into a more ambitious football simulation.

The original application was approximately 650 KB and contained more than 1,200 player ratings. Its functionality included:

- NFL player ratings and rosters.
- A 32-team CPU-controlled snake draft.
- Team-building and roster-selection decisions.
- A 17-game regular season.
- Playoffs.
- Game simulations and box scores.
- Player and team awards.
- Draft and season results.

The original concept has evolved considerably. The project now needs to be evaluated as a serious football simulation product rather than merely a draft simulator.

The central question is whether its simulation engine, player-rating model, team-building logic, and game outcomes can become credible enough to be interesting and useful beyond the novelty of running a season.

### Product identity

For now, **NFL football is the primary product**.

Basketball is a possible second sport after the football product is mature. Do not prematurely generalize the architecture around multiple sports. Identify where genuinely reusable infrastructure makes sense, but do not allow an abstract multi-sport framework to complicate football development.

Keep three ideas distinct:

- **Football-Sim:** the actual product.
- **Reusable simulation infrastructure:** architecture that may make sense to share across simulation projects.
- **A generalized multi-sport platform:** a possible future product direction, not a present requirement.

I want your opinion on whether these distinctions are architecturally useful, how much generalization is justified now, and what should be deferred.

### Portfolio objective

The project is also intended to demonstrate my ability to direct a complex AI-assisted software project.

I would like it to communicate more than an attractive interface. Ideally, it demonstrates:

- A well-conceived simulation model.
- Thoughtful player and team evaluation.
- Reproducible game and season simulations.
- Statistical validation and calibration.
- Sound software architecture.
- Effective AI-agent orchestration.
- A disciplined development and testing process.
- A finished experience that someone can actually use.

Assess whether the current project can credibly demonstrate these abilities and what additions would have the greatest portfolio value.

Do not assume that adding more technical infrastructure makes the portfolio stronger. A well-validated simulation may be more impressive than a sophisticated but unnecessary deployment architecture.

---

# 3. Existing project and repository context

The following information reflects the project state and decisions reported in previous discussions. **Treat it as a working baseline, not an unquestionable description of the current repository. Verify every material claim against the actual files, branches, package manifests, commits, and available tools.**

## Repository and development tracks

The primary repository is:

`https://github.com/kozikosi/Football-Sim`

There has also been a separate Next.js project associated with a friend:

`aled1027/football-sim-nextjs`

Do not confuse that separate project with the current Svelte application.

The project has developed along two named tracks:

- **Colors:** an engine-focused development track.
- **Cakepanz:** a UI-focused development track.

The reported locations include:

- Colors: `architect/engine-and-seats`
- Cakepanz: `origin/gh-pages`
- Governance material: `origin/council/muse`
- A frozen pre-Colors HTML reference, referred to as Pre-Colors.

These branch names, relationships, and states must be checked against the current repository. Do not assume that a branch is authoritative simply because it has a descriptive name.

Cakepanz is reported to use **Svelte and Vite**, not Next.js. The Next.js project mentioned above is a separate project.

The most important unresolved question in this entire review is:

**What exactly is the current relationship between Colors and Cakepanz, and which one represents the product we are actually building?**

Do not silently choose one.

## Reported technology

The project has used or currently uses:

- TypeScript.
- Svelte 5.
- Vite.
- npm.
- Biome 2.6.2.
- The Node built-in test runner.
- Local browser storage for persistence.

The reported Vite versions differ between Colors and Cakepanz: Colors has been associated with Vite 8.x and Cakepanz with Vite 7.x. Verify this.

React 19 and `react-dom` were reportedly present in Colors despite appearing unused. Verify whether they are genuinely unused before proposing removal.

The Cakepanz track reportedly lacks complete type-checking and test scripts. Svelte diagnostics have also been identified as a possible gap.

Do not assume any of these findings remain current without inspection.

## Engine and determinism

The Colors engine was designed with an emphasis on deterministic simulation and separation from the UI.

An important correction to earlier project descriptions:

**The reported RNG implementation is Philox2x32, not mulberry32.**

Treat that as the current known description, but inspect the actual implementation before making claims about its properties, stream handling, or statistical suitability.

The intended architectural direction is for the simulation engine to be independent of the frontend framework and browser environment.

The Colors work has reportedly sought to avoid uncontrolled dependencies on:

- `Math.random()`
- `Date.now()`
- `new Date()`
- Browser globals.
- Network access.
- Framework-specific imports.

Verify what is actually enforced and what is merely a convention.

There has been interest in seeded random streams and reproducible simulation behavior. Determine whether the current implementation achieves this across game simulations, draft decisions, season simulations, and any other relevant processes.

Do not confuse the existence of a deterministic RNG with proof that the entire simulation is reproducible. Examine every source of nondeterminism.

## Historical data

A historical nflverse data collection was reportedly staged for analytical and validation work.

The reported inventory was approximately:

- 30 files.
- 484,000 play-by-play rows.
- Seasons 2016–2025.
- SHA-256 hashes recorded for the source data.

Verify the exact files, data provenance, data structure, coverage, licensing or usage constraints, and whether the material is actually integrated into any analysis or simulation workflow.

Do not assume the presence of historical data means the simulation is calibrated against it.

## Testing and quality

Previous project discussions identified:

- Approximately 318 of 320 Colors tests passing at one point.
- Two failing tests that needed investigation.
- No complete CI workflow.
- No comprehensive browser automation.
- No established nightly simulation laboratory.
- No complete performance benchmark suite.
- An engine boundary that is described architecturally but may not be enforced mechanically.

These figures are historical and must be checked against the current repository.

Do not claim tests pass unless you actually ran them. Identify the command, working directory, and result.

## Persistence and deployment

The current direction is local-first, without accounts or a backend.

Cloudflare Pages has been considered for static hosting, but deployment status and current suitability must be verified.

There is no established requirement for:

- User authentication.
- A hosted database.
- A paid API.
- Analytics.
- A monitoring service.
- A complex backend.
- An account system.

Do not introduce these by default.

---

# 4. Product and persistence requirements

The following are previously stated product preferences. Treat them as important design inputs, but identify anything that needs clarification rather than silently changing it.

## Save behavior

The desired direction has included:

- Three save slots, if practical.
- Local persistence.
- Global records and statistics surviving the deletion of an individual save.
- No conventional export/import system.
- A shareable text representation of results where useful.
- Stable player identifiers.
- Completed seasons preserving the player names, ratings, and other historical details that existed when the season was played.
- New drafts using the current player database.
- Historical seasons remaining meaningful even after the underlying player ratings or player database change.

Evaluate whether these requirements fit together cleanly and propose the simplest robust implementation.

## Save safety

Previous analysis identified save-versioning and recovery as important missing safeguards.

A new save should carry a schema version. However, **an older save without a version field should be treated as a legacy version (v0) and handled through a deliberate migration or recovery path**, not rejected automatically.

Consider:

- Schema validation.
- Migration from older formats.
- Protection against accidental overwriting.
- Recovery from corrupted or incomplete data.
- Safe autosaving.
- Separation of global records from individual saves.
- Preservation of historical season snapshots.
- Tests for migration and recovery.

Do not build a general-purpose persistence framework unless the actual product requires one.

## User experience

Evaluate the project as a product someone would want to use repeatedly.

Consider:

- Draft usability.
- Roster management.
- Season management.
- Simulation presentation.
- Box scores and statistical summaries.
- Historical records.
- Clarity of player ratings and team strengths.
- Navigation and overall information architecture.
- How much information is presented at once.
- Whether the interface makes the underlying simulation more understandable and interesting.

Do not assume that the most technically elegant interface architecture is the best product experience.

---

# 5. The most important immediate question: Colors versus Cakepanz

This is the first issue I want investigated.

Previous discussions have identified this as a potentially foundational ambiguity. If the relationship between the two tracks is misunderstood, almost every subsequent technical recommendation may be misdirected.

Before recommending a framework replacement, merging branches, standardizing dependencies, or changing the application architecture, establish the actual state.

Produce a concise, evidence-based **Colors/Cakepanz Track Brief**.

It should answer:

1. What is Colors today?
2. What is Cakepanz today?
3. Which repository, branch, and directory contain each?
4. What can each application actually do?
5. Which one contains the authoritative simulation engine?
6. Which one contains the most complete or desirable UI?
7. Are they competing implementations, successive stages, separate components, or something else?
8. What code, data, functionality, and design are shared?
9. What has been duplicated?
10. Which one currently builds and runs?
11. What test suites exist for each?
12. Which one has the most complete application experience?
13. What is the status of the Pre-Colors reference?
14. Is either track deployed or used as the current product?
15. What would be lost by selecting one as the primary application?
16. What would be gained by keeping both?
17. What are the realistic costs and risks of integrating them?
18. Does the current branch structure reflect intentional architecture or historical development artifacts?

Provide evidence for your answers: branch names, file paths, package manifests, source files, commits, scripts, or actual command results.

Then provide three possible paths:

- Continue with Colors as the primary product.
- Continue with Cakepanz as the primary product.
- Deliberately integrate selected parts of both.

For each, explain the practical consequences, advantages, disadvantages, and implementation cost.

**Do not make this decision for me.** Recommend a path, explain your confidence, and identify the exact reasons I should choose differently.

This is an Owner decision.

Do not begin a merger or major rewrite before this issue is resolved.

---

# 6. Critically examine the previous audit and AI recommendations

There has already been substantial discussion of the project with multiple AI systems.

The previous work includes:

- Muse's questionnaire and response.
- A technical audit and target-stack discussion.
- A list of unresolved architectural decisions, D1–D20.
- A draft of implementation and agent-governance rules.
- Follow-up perspectives from Gemini, DeepSeek, Grok, and Q.
- A subsequent synthesis identifying disagreements and additional priorities.

Use these materials as inputs if they are supplied alongside this prompt. If a particular document or message is not available to you, say so rather than inventing its contents.

The existing audit document has been treated as the primary project inventory. **Do not create a second, competing repository inventory or another parallel stack audit.** Review the existing work, correct it where necessary, and keep one authoritative source of truth.

## Previous findings that deserve particular scrutiny

### DeepSeek's most valuable contribution: clarify the product track first

DeepSeek identified that choosing between Colors and Cakepanz may be more fundamental than many of the individual stack decisions.

This is a strong observation. Investigate it carefully.

DeepSeek also emphasized:

- Explicit decision rights.
- Agents recommend; the Owner decides.
- Avoiding endless rounds of analysis.
- One authoritative source for agent rules.
- Clear implementation receipts.
- Staged remediation rather than attempting everything at once.

Evaluate and improve these ideas.

### Gemini's practical engineering recommendations

Gemini highlighted several potentially useful hygiene tasks:

- Verify whether React dependencies are unused and remove them only if confirmed.
- Investigate the Vite version divergence.
- Enable Biome formatting for product code.
- Add missing Cakepanz type-checking and test scripts.
- Consider Svelte diagnostics.
- Establish CI.
- Improve save versioning and validation.

Assess each individually.

Important qualifications:

- Do not blindly upgrade everything to the newest Vite version.
- Separate tracks may legitimately have different dependency requirements.
- Removing React requires verification.
- Enabling product formatting should be done in a separate, reviewable formatting change rather than mixed with functional changes.
- Adding `svelte-check` introduces a dependency and should follow the project's dependency-approval rules.
- Do not confuse adding a test command with creating meaningful test coverage.

### Grok's execution-oriented recommendations

Grok emphasized phased implementation and concrete success criteria over abstract architecture discussion.

Evaluate its proposals, particularly:

- A staged remediation plan.
- A defined initial implementation period.
- Measurable completion criteria.
- Explicit checks before integrating changes.

Important qualifications:

- Do not automatically standardize on the newer Vite version.
- Do not merge Colors and Cakepanz without resolving their relationship.
- Do not block legacy saves simply because they lack a version field.
- Verify actual CI commands and working directories before writing workflows.

### Q's agent-coordination recommendations

Q emphasized requiring agents to provide an acknowledgment, list the files they intend to modify, and state their plan before significant execution.

Consider adopting this as a standard for consequential work, without making every small task burdened by unnecessary process.

## Resolve disagreements explicitly

Do not simply summarize these perspectives. Evaluate where they agree, where they conflict, and which conclusions are best supported by evidence.

At minimum, address the following:

| Issue | Required position |
|---|---|
| Colors versus Cakepanz | Investigate and recommend; Owner decides. |
| React dependencies | Verify actual usage before removal. |
| Vite versions | Investigate the reason for divergence; do not upgrade blindly. |
| Biome | Retain unless evidence argues otherwise; enable product formatting through an isolated, reviewable change if appropriate. |
| Svelte diagnostics | Assess value and dependency cost; obtain approval for new dependencies. |
| Existing failing tests | Verify and resolve or explicitly quarantine them before treating the baseline as healthy. |
| CI | Use commands and directories that actually exist and have been tested. |
| Save versioning | Version new saves; support unversioned legacy saves as v0. |
| Engine boundaries | Enforce meaningful architectural rules without building an elaborate enforcement system. |
| Framework choice | Compare actual candidate architectures and product tasks, not abstract popularity. |
| CSS and design system | Recommend based on present product needs; major changes remain Owner decisions. |
| Multi-sport architecture | Preserve future flexibility without prematurely generalizing the football product. |

If you disagree with a previous recommendation, explain why. If you agree, explain what evidence would make the recommendation actionable.

---

# 7. Simulation quality: the most important long-term technical challenge

I want you to spend serious attention on the simulation itself.

A clean frontend and an impressive codebase are not sufficient if the football simulation produces implausible results.

The central product challenge is creating a simulation that translates football ability, player attributes, roster composition, strategy, and game situations into credible outcomes.

I am particularly interested in whether the current project has a coherent methodology for evaluating the quality of its simulation, rather than relying on intuition, isolated examples, or subjective judgments.

## Evaluate the current simulation model

Inspect how the engine represents and uses:

- Player ratings.
- Positional differences.
- Team strength.
- Offensive and defensive quality.
- Roster composition.
- Player matchups.
- Play selection and strategy.
- Passing and rushing outcomes.
- Turnovers.
- Sacks and other negative plays.
- Penalties, if modeled.
- Field position.
- Scoring.
- Game state and situational strategy.
- Player availability, injuries, or fatigue, if modeled.
- Game-to-game and season-to-season variation.

Identify what is currently modeled, what is approximated, what is absent, and what is merely implied.

Do not assume every feature must be simulated at the same level of detail. Recommend an appropriate level of abstraction for a compelling football simulation.

## Player ratings and football validity

Evaluate whether the player-rating system makes meaningful distinctions between positions and player types.

Questions to investigate include:

- Are ratings connected to observable football performance?
- Are ratings sufficiently differentiated by position?
- Are player attributes independent, correlated, or redundant in ways that matter?
- Does the model distinguish between traits and outcomes?
- Can two players with similar overall ratings behave differently in meaningful ways?
- Do player ratings translate into realistic positional value?
- Do roster construction decisions reward the right combinations of players?
- Does the engine distinguish elite players from merely good starters, adequate backups, and replacement-level players?
- Are ratings calibrated against real football data or primarily assigned by intuition?
- Can a rating be explained in terms of its influence on simulation outcomes?

Pay particular attention to whether the engine has a coherent causal or probabilistic model connecting player attributes to game events.

## Statistical validation

The historical nflverse data may offer a valuable foundation, but verify what data is actually available and usable.

Evaluate a validation methodology that compares simulated output with real NFL football at multiple levels:

**Play level**
- Passing and rushing outcomes.
- Completion and failure rates.
- Yards gained.
- Sacks.
- Turnovers.
- Explosive plays.
- Negative plays.
- Situational outcomes.

**Game level**
- Points scored.
- Total yards.
- Plays and drives.
- Turnover counts.
- Score distributions.
- Game margins.
- Win probabilities and upset frequency.
- Home-field effects, if included.

**Season level**
- Team win distributions.
- Scoring distributions.
- Offensive and defensive rankings.
- Passing and rushing production.
- Player statistics.
- Awards and leaderboards.
- Playoff qualification and outcomes.

These are examples, not a demand to model every category immediately. Determine which metrics most directly measure whether the current simulation is credible.

Do not compare only league averages. A model can produce plausible average scores while producing unrealistic distributions, correlations, variance, or extreme outcomes.

Consider:

- Means, medians, variances, and percentiles.
- Distribution shapes and tails.
- Conditional outcomes by down, distance, field position, score, and other important contexts.
- Relationships between team strength and game outcomes.
- Relationships between player ratings and individual production.
- Correlations among offensive, defensive, and special-teams outcomes.
- The frequency of unusual but realistic events.
- Whether simulated teams and players behave plausibly over an entire season.

## Calibration and out-of-sample validation

Recommend a methodology that prevents the project from simply tuning itself to one historical sample.

Consider dividing historical seasons into:

- Calibration or development seasons.
- Validation seasons.
- Held-out seasons for out-of-sample evaluation.

Explain how to prevent data leakage, how to assess whether the model generalizes, and how frequently recalibration should occur.

Discuss whether the project should use:

- Deterministic regression tests.
- Statistical distribution tests.
- Monte Carlo simulation.
- Parameter sensitivity analysis.
- Historical replay or reconstruction.
- Scenario testing.
- Automated regression comparisons.

Give recommendations appropriate to the present scale of the project. Do not prescribe an expensive research infrastructure.

## The Simulation Laboratory

I have been considering a dedicated **Simulation Laboratory**: a collection of tools and repeatable experiments for investigating the behavior of the engine.

I want your assessment of this idea.

The laboratory could eventually support:

1. Repeated simulations with controlled seeds.
2. Large batches of games and seasons.
3. Historical comparisons.
4. Distribution and calibration analysis.
5. Player-rating sensitivity tests.
6. Positional-value experiments.
7. Roster-construction experiments.
8. Offensive and defensive strategy experiments.
9. Regression comparisons between engine versions.
10. Performance measurements.

Determine what the smallest useful first version would be.

Please distinguish between:

- Tests that should run as part of ordinary development.
- Offline analytical experiments.
- Longer-running batch simulations.
- A possible visual dashboard for inspecting results.

Do not immediately turn the laboratory into a separate application or a complex analytics platform.

I would prefer the simplest useful implementation, potentially using existing TypeScript tooling and static analytical outputs where practical.

I want to know:

- Which questions the laboratory should answer first.
- Which metrics should be measured.
- How experiments should be reproducible.
- How to compare model versions fairly.
- How to detect regressions.
- How to distinguish a genuine model improvement from random variation.
- How to prevent overfitting to historical NFL data.
- How much simulation volume is appropriate.
- What should be automated and what should remain exploratory.

Most importantly, tell me whether this is the right next major investment for the project and why.

---

# 8. Architecture and technology decisions

Review the current stack in the context of the actual product and repository.

I do not want an automatic migration to the most fashionable framework or a large collection of dependencies.

The question is not "What stack would you choose for a new application today?"

The question is:

**What is the simplest, most maintainable architecture that can support this particular simulation, its UI, its analytical tools, and its future development?**

## Current architectural direction to evaluate

The provisional direction has been:

- TypeScript.
- Svelte 5.
- Vite.
- A framework-independent simulation engine.
- A local-first application.
- Static deployment, potentially Cloudflare Pages.
- Plain CSS and design tokens unless there is evidence for something more.
- Hand-built components where appropriate.
- Biome for formatting and linting.
- Node's built-in test runner where sufficient.

Treat these as provisional positions, not decisions that cannot be challenged.

## Framework comparison

Assess whether the existing Svelte/Vite architecture is appropriate.

Consider:

- Svelte 5 with Vite.
- SvelteKit.
- Other plausible alternatives only when there is a concrete reason to consider them.

Be precise about the distinction between Svelte plus Vite and SvelteKit. Do not compare them as though they were identical.

Evaluate actual product requirements, including:

- Static deployment.
- Client-side simulation.
- Local persistence.
- Routing and navigation.
- Potentially long-running simulations.
- Analytical views.
- Browser compatibility.
- Offline operation.
- Testability.
- Ease of AI-assisted development.
- Long-term maintenance.

If you propose a framework experiment, define a small, fair comparison using actual product tasks. Do not build a second application or conduct an abstract benchmark merely to validate a preference.

Explain what evidence would justify switching and what evidence would justify staying.

## Engine and frontend separation

I favor an architecture in which the simulation engine is independent of the user interface.

Evaluate:

- Whether the engine has a genuine framework-independent boundary.
- Whether UI code can import engine logic without creating reverse dependencies.
- Whether the engine can run in Node for testing and analytical experiments.
- Whether it can run in a browser without modification.
- How random number generation and time are controlled.
- How game and season results are represented.
- How the application passes data into and out of the engine.
- How changes to the engine are tested against historical expectations.

Recommend practical ways to enforce the boundary.

Do not create an elaborate package or monorepo structure unless it solves a demonstrated problem.

## Performance and Web Workers

The project may eventually run large numbers of games or seasons.

Assess whether the current architecture is capable of doing so efficiently.

However:

- Establish a baseline before optimizing.
- Identify actual bottlenecks.
- Profile representative workloads.
- Distinguish engine performance from UI rendering and data processing.
- Consider Web Workers only when their complexity is justified by measured performance or responsiveness.
- Avoid premature parallelization.

A future option might be to keep the Svelte/TypeScript frontend while extracting or isolating engine computation more aggressively. Assess that option only if the evidence supports it.

Do not recommend rewriting the frontend in Python.

---

# 9. Review every unresolved decision: D1–D20

A previous audit identified the following unresolved decisions. Review all twenty.

For each one, state:

1. What the decision actually means.
2. The project's current state.
3. The realistic alternatives.
4. Your recommended choice.
5. The evidence or reasoning supporting that recommendation.
6. The cost and risk of changing it.
7. Whether it needs an Owner decision now or can be deferred.
8. What would cause you to reconsider it.

Do not treat all twenty as equally urgent.

| ID | Decision |
|---|---|
| D1 | Frontend framework |
| D2 | SvelteKit versus Svelte + Vite |
| D3 | CSS architecture and styling system |
| D4 | Component library versus hand-built components |
| D5 | Icon library |
| D6 | Charting and visualization library |
| D7 | Biome versus ESLint/Prettier or another tooling arrangement |
| D8 | Whether and how to enable product-code formatting |
| D9 | Continuous integration |
| D10 | Database choice, including whether any database is necessary |
| D11 | Authentication, including whether authentication is necessary |
| D12 | Hosting and deployment |
| D13 | Mechanical enforcement of the engine boundary |
| D14 | Save versioning, validation, migration, and recovery |
| D15 | Web Workers and parallel computation |
| D16 | Removal or retention of the React dependency |
| D17 | Whether the Vite version divergence between tracks should be reconciled |
| D18 | Whether the project should eventually become a generalized multi-sport platform |
| D19 | PWA and offline functionality |
| D20 | Error monitoring and analytics |

### Provisional principles

Use these as starting hypotheses to challenge:

- Keep Svelte 5 and Vite unless evidence demonstrates a meaningful problem.
- Do not move to SvelteKit merely because it is more comprehensive.
- Plain CSS and design tokens may be sufficient.
- Hand-built components may be preferable to a large component library at this stage.
- Keep Biome unless there is a demonstrated reason to replace it.
- Enable product formatting as an isolated, reviewable change.
- Introduce CI with a small, reliable verification pipeline.
- Avoid a database and authentication for the initial local-first product.
- Consider free static hosting.
- Enforce the engine boundary with lightweight, meaningful checks.
- Add save safeguards without building a generalized persistence framework.
- Defer Web Workers until profiling establishes a need.
- Remove React only after verifying it is genuinely unused.
- Reconcile Vite versions only when the tracks' relationship and dependency requirements justify it.
- Defer multi-sport generalization.
- Assess PWA functionality based on actual user needs.
- Do not introduce monitoring or analytics services without a compelling reason.

A good decision register should explicitly label decisions as:

- **Decide now**
- **Implement now**
- **Defer**
- **Investigate**
- **Owner decision required**

I would rather have ten sensible decisions and ten deliberate deferrals than twenty premature commitments.

---

# 10. Testing, quality assurance, and continuous integration

Assess the project's present verification capabilities and recommend a practical quality system.

I want to know how an AI agent can make a change without accidentally damaging:

- The simulation engine.
- Deterministic behavior.
- Player ratings.
- Draft logic.
- Season simulation.
- Historical results.
- Save compatibility.
- The UI.
- The build.

## Proposed minimum verification pipeline

Evaluate a minimal CI pipeline that may include:

- Clean dependency installation.
- Type checking.
- Svelte diagnostics.
- Existing automated tests.
- Engine tests.
- Production build.
- Relevant architectural boundary checks.

Use the actual scripts and package locations. Do not assume that `npm test`, `npm run build`, or any other command works at the repository root.

Where the repository contains multiple applications or packages, identify the correct working directory for each command.

Consider pinning the Node version so local and CI environments behave consistently.

If a proposed diagnostic tool requires a new dependency, explain why it is worth adding and what it costs.

## Test priorities

Prioritize tests for:

1. Deterministic RNG and seeded reproducibility.
2. Core game simulation behavior.
3. Draft and roster construction.
4. Season scheduling and outcomes.
5. Player and team statistical aggregation.
6. Save creation, loading, migration, and recovery.
7. Engine/frontend boundaries.
8. Critical user flows.

Do not equate the number of tests with the quality of testing.

Consider property-based or invariant testing where it has a clear benefit, but do not introduce a testing framework simply because it is popular.

Distinguish:

- Unit tests.
- Integration tests.
- Browser or end-to-end tests.
- Statistical simulation tests.
- Performance tests.
- Manual acceptance checks.

Explain which types are necessary now and which should wait.

## Baseline and failed tests

Investigate the previously reported two failing Colors tests.

Determine whether they are genuine defects, obsolete expectations, flaky tests, or environment issues.

Do not conceal or silently delete failures to create a green test suite.

If a test must be quarantined, document why and define what is required to restore it.

---

# 11. AI-agent governance and development workflow

This project relies heavily on AI coding agents. I want an operating model that lets multiple agents contribute without losing architectural consistency or control.

This is not a theoretical concern. Multiple models may inspect the repository, write code, create documentation, propose architectural changes, and modify overlapping files.

The workflow must protect the project from:

- Conflicting implementations.
- Duplicate documentation.
- Agents misunderstanding the current architecture.
- Unapproved dependency additions.
- Inconsistent coding conventions.
- Destructive refactors.
- Changes that pass one agent's tests but break another track.
- Agents treating earlier AI-generated claims as established facts.
- Excessive parallelism and integration work.
- A proliferation of branches, tools, and competing sources of truth.

## Decision rights

Establish a clear distinction between recommendations and authorization.

**I am the final decision-maker.**

Agents can:

- Inspect.
- Investigate.
- Critique.
- Recommend.
- Prototype when authorized.
- Implement clearly scoped tasks.
- Review other agents' work.

Agents cannot independently authorize consequential changes.

The following should require explicit Owner approval:

- Selecting Colors or Cakepanz as the primary product track.
- Merging the tracks.
- Replacing the frontend framework.
- Introducing a database or backend.
- Introducing authentication.
- Adding paid services or dependencies with meaningful long-term costs.
- Major changes to the simulation engine or data model.
- Large changes to the CSS architecture or product direction.
- Changing save compatibility in a way that risks existing data.
- Generalizing the product around multiple sports.

Routine, clearly authorized cleanup may proceed without a separate approval for each tiny change.

## Canonical documentation

Avoid a documentation explosion.

The proposed canonical documents are:

- `PROJECT-KNOWLEDGE.md` — concise project context, goals, terminology, and current state.
- `ARCHITECTURE.md` — actual system boundaries and architectural structure.
- `TECH-STACK.md` — approved technologies, versions, and rationale.
- `TESTING.md` — verification commands, coverage, and testing conventions.
- `AGENTS.md` — authoritative agent instructions.
- `DECISIONS.md` — durable decisions, rejected alternatives, and deferred questions.

The final set may be smaller if some documents add no independent value.

There should be **one authoritative source for agent rules**. Any specialized agent instruction files should link to or inherit from that source rather than duplicate it.

Do not recreate material that already exists in the audit or other canonical files. Inspect what is there, identify gaps, and update the authoritative document.

## Agent coordination

For work involving multiple agents:

- Give each task a clearly defined owner.
- Avoid having multiple agents independently modify the same file.
- Use separate branches or worktrees where appropriate.
- Identify integration responsibility.
- Define acceptance criteria before implementation.
- Require review for consequential changes.
- Keep the work small enough to verify.

Consider a division of responsibility among:

- Architect or integrator.
- Implementation agent.
- Independent reviewer.
- Test or validation agent.
- Simulation analyst.

Do not require all roles for every task. Use independent review where the risk warrants it.

## Implementation receipts

Every consequential implementation task should produce a brief, standardized receipt.

It should include:

1. Task completed.
2. Responsible agent.
3. Branch or working tree.
4. Files modified.
5. Dependencies added or removed.
6. Commands actually run.
7. Actual test and build results.
8. Known failures or limitations.
9. Effects on determinism.
10. Effects on save compatibility.
11. Architectural consequences.
12. Remaining work.

Agents must not claim to have tested something they did not test.

For important changes, require an explicit review of the diff and actual execution results.

## Before significant implementation

For consequential tasks, the responsible agent should first provide:

- Its understanding of the task.
- The files it expects to modify.
- The proposed approach.
- Dependencies or assumptions.
- Risks.
- Verification plan.

Wait for approval when the change falls within an Owner-controlled decision.

Do not make this process burdensome for harmless, narrowly scoped work.

---

# 12. A practical remediation strategy

I want a staged plan, not a simultaneous overhaul.

The following sequence is a provisional framework. Adjust it if repository evidence demonstrates a better order.

## Stage 0: Establish the real project state

- Inspect the repository and relevant branches.
- Establish the Colors/Cakepanz relationship.
- Identify which code is working, authoritative, duplicated, or abandoned.
- Verify the current package and tool versions.
- Verify test and build commands.
- Identify existing documentation and decision records.
- Produce a concise track decision brief.

Do not modify code in this stage.

## Stage 1: Stabilize existing development practices

After the primary track and intended scope are clear:

- Verify and resolve or document existing failing tests.
- Confirm dependency hygiene, including React usage.
- Investigate Vite version differences.
- Establish consistent Node expectations.
- Enable product-code formatting in a controlled change if appropriate.
- Add missing type-checking and diagnostic commands where justified.
- Establish minimal CI using verified commands.
- Ensure CI can detect an intentional failure.

Do not combine formatting, functional refactoring, dependency upgrades, and architecture changes into one large commit.

## Stage 2: Protect the simulation engine

- Verify deterministic behavior.
- Inspect all sources of randomness and time.
- Establish clear engine input and output boundaries.
- Remove accidental framework or browser dependencies from the engine.
- Add meaningful architectural checks.
- Strengthen tests for core simulation behavior.
- Establish reproducible regression cases.

Do not rewrite the engine simply to achieve a theoretically pure architecture.

## Stage 3: Protect persistence

- Version newly written saves.
- Handle unversioned legacy saves as v0.
- Validate data before use.
- Protect against accidental overwriting.
- Add recovery and migration tests.
- Preserve global records independently of individual saves.
- Preserve historical player and season snapshots.

Prioritize data safety and compatibility over generalized persistence infrastructure.

## Stage 4: Build the Simulation Laboratory

Start with the smallest useful experiments.

Establish:

- Repeatable seeded simulation batches.
- A baseline of important output distributions.
- Comparisons against appropriate historical data.
- A way to compare engine versions.
- A way to investigate player-rating and roster-construction sensitivity.
- A method of detecting statistically meaningful regressions.

Only build more elaborate dashboards or analytical tooling after the experiments prove useful.

## Stage 5: Make larger architectural and product decisions

Once the product track and basic reliability are established:

- Decide whether the framework needs to change.
- Finalize the styling and component strategy.
- Improve the application architecture where necessary.
- Assess offline functionality.
- Evaluate performance and parallelism.
- Refine the deployment and release process.
- Consider whether reusable simulation infrastructure merits more formal separation.

Do not let this stage become an excuse for endless redesign.

---

# 13. Specific questions I want you to answer

In addition to the audit and recommendations above, I want independent opinions on the following broader questions.

## Product direction

1. What is the most compelling version of Football-Sim that is realistically achievable?
2. What should the product do exceptionally well?
3. What should it deliberately not attempt to do?
4. Is the current scope too ambitious, too narrow, or appropriately sized?
5. What is the smallest coherent version that would be satisfying to use?
6. Which features would most improve the actual product?
7. Which features are distractions?
8. What is the most convincing way to demonstrate the project's value to someone evaluating it as a portfolio piece?
9. Should the application primarily be a draft simulator, a season simulator, a roster-building sandbox, a simulation laboratory, or some coherent combination?
10. How should those experiences relate to one another?

## Simulation design

11. What is the most important weakness to investigate in a football simulation of this kind?
12. What level of football detail is worth modeling?
13. Which attributes have the greatest influence on realistic player behavior?
14. How should overall player ratings relate to position-specific value?
15. How should player ratings influence team strength?
16. How should positional scarcity and roster construction affect draft and team-building decisions?
17. How do we avoid the simulation being dominated by a small number of arbitrary formulas?
18. How should randomness, skill, strategy, and variance interact?
19. How should we evaluate realistic player statistics without merely reproducing league averages?
20. What would convince you that the simulation is genuinely credible?

## Software architecture

21. Is the current separation between UI and engine sufficient?
22. What architecture best fits the actual product?
23. Which abstractions are justified today?
24. Which abstractions should wait?
25. What are the most likely sources of future technical debt?
26. What is the simplest useful deployment architecture?
27. What should be tested at the engine, integration, and browser levels?
28. How should data and player identifiers evolve across seasons?
29. What is the most robust local-first persistence model that remains simple?
30. At what point would Web Workers or other performance changes become worthwhile?

## AI development workflow

31. How should I organize work across multiple AI coding agents?
32. What should be centralized, and what can remain agent-specific?
33. How do I minimize context loss and contradictory assumptions?
34. What should an agent know before it begins a task?
35. How much planning and approval is appropriate?
36. How should reviewers verify work performed by other agents?
37. How should repository branches and worktrees be managed?
38. How do I avoid generating more documentation than the project can maintain?
39. What should the standard implementation receipt contain?
40. What are the most dangerous failure modes of an AI-assisted development process?

## Long-term direction

41. What capabilities would most distinguish this project from an ordinary hobby simulation?
42. What parts could eventually be reusable for another sport?
43. What should remain football-specific?
44. What should be completed before basketball or another sport is considered?
45. What should be the next major investment after basic technical stability?
46. What should I stop doing?
47. What am I underestimating?
48. What important question have I not asked?

You should add questions of your own wherever you identify a material gap.

---

# 14. Council structure and independent review

If you have access to multiple agents, use them to investigate distinct areas independently before producing a synthesis.

Do not have every agent produce the same generic architecture review.

Suggested roles:

### Agent A — Repository and architecture investigator

Examine the actual codebase, branches, package structure, dependencies, build process, and existing architecture.

Primary questions: What exists? What works? What is authoritative? What is duplicated? What is risky?

### Agent B — Simulation and football analytics specialist

Examine the engine, player ratings, statistical assumptions, simulation design, historical data, and validation methodology.

Primary questions: How do we know the football simulation is credible? What should the laboratory measure?

### Agent C — Frontend and product architect

Examine the Svelte/Vite application, UI architecture, user experience, styling, routing, persistence interface, and deployment needs.

Primary questions: Which application track should become the product? What is the minimum viable architecture?

### Agent D — Tooling, testing, and reliability specialist

Examine dependencies, Node versions, formatting, type checking, diagnostics, testing, CI, persistence reliability, and performance.

Primary questions: What changes provide the greatest reliability improvement for the least cost?

### Agent E — Adversarial reviewer and project strategist

Challenge all major recommendations. Consider the owner's constraints, implementation burden, portfolio value, and opportunity cost.

Primary questions: What are we overengineering? What are we missing? Which decisions are being made prematurely?

### Council chair / integrator

The coordinating agent should:

- Collect independent findings.
- Identify contradictions.
- Ask agents to substantiate disputed claims.
- Reject unsupported recommendations.
- Resolve technical disagreements where evidence permits.
- Preserve disagreements where evidence is insufficient.
- Produce one prioritized recommendation rather than five disconnected plans.

The council must not treat majority opinion as proof.

A single agent with strong repository evidence may be more correct than several agents repeating an assumption.

If you cannot actually access multiple agents, perform the roles sequentially and clearly distinguish independent analysis from synthesis.

---

# 15. Required output and deliverables

I want substantive work, but I do not want another massive report that leaves me with no clear next action.

Organize your response into the following deliverables.

## Deliverable 1 — Executive assessment

Give me your candid assessment of:

- The project's current condition.
- Its strongest assets.
- Its biggest weaknesses.
- Its most important unresolved architectural question.
- Its most important simulation-quality challenge.
- Its most dangerous project-management risk.
- Its best opportunity.

Tell me whether the project is currently on a sound path, a salvageable but disorganized path, or a path that requires significant correction.

Be specific.

## Deliverable 2 — Colors/Cakepanz Track Brief

This is the first priority.

Provide the evidence-based investigation described in Section 5.

End with a clear recommendation and a statement of what I must decide.

Do not implement a track merger or replacement.

## Deliverable 3 — Assessment of prior AI recommendations

Evaluate Muse's existing audit and recommendations, along with the Gemini, DeepSeek, Grok, and Q contributions when available.

Identify:

- Recommendations worth adopting.
- Recommendations that need modification.
- Recommendations that should be rejected.
- Important issues they missed.
- Disagreements that remain unresolved.

Avoid repeating the entire audit. Concentrate on the most consequential judgments.

## Deliverable 4 — Prioritized remediation queue

Give me a short, ordered list of the most valuable immediate improvements.

For each item, specify:

- Why it matters.
- Which files or areas are likely involved.
- Dependencies on other work.
- Risk.
- Expected outcome.
- How completion will be verified.
- Whether it needs Owner approval.

Separate genuinely necessary work from optional improvement.

## Deliverable 5 — Recommended target architecture

Describe the architecture you recommend for the actual product after the track question is resolved.

Include:

- Frontend.
- Simulation engine.
- Data model.
- Persistence.
- Testing.
- Analytical tools.
- Hosting and deployment.
- Performance strategy.
- Boundaries between these components.

Use a simple diagram or tree if helpful.

For every component, explain what it does and why it belongs.

Distinguish the architecture that is appropriate now from an architecture that might become appropriate at a much larger scale.

## Deliverable 6 — D1–D20 decision register

Address all twenty decisions.

For each, include:

- Current state.
- Recommendation.
- Rationale.
- Cost and risk.
- Priority.
- Owner decision required or not.
- Reconsideration trigger.

Clearly identify which decisions should remain deferred.

## Deliverable 7 — Simulation Laboratory specification

Describe a realistic first version of the Simulation Laboratory.

Include:

- Primary research questions.
- Historical data requirements.
- Simulation workload.
- Reproducibility.
- Statistical metrics.
- Calibration and validation methodology.
- Regression testing.
- Sensitivity analysis.
- Performance measurement.
- Initial deliverables.

Separate the first useful version from the long-term vision.

## Deliverable 8 — AI-agent operating model

Define the practical workflow for agents.

Include:

- Canonical documentation.
- Decision rights.
- Branch/worktree strategy.
- Task ownership.
- Implementation receipts.
- Review and verification.
- Dependency approval.
- Conflict resolution.
- Context management.

Keep the operating model small enough that I will actually use it.

## Deliverable 9 — Implementation roadmap

Provide a phased roadmap.

For each phase, define:

- Objective.
- Work included.
- Work excluded.
- Dependencies.
- Acceptance criteria.
- Risks.
- What must be true before proceeding.

Provide an initial 30-day plan that is realistic for one owner directing AI agents, not a full-time engineering team.

Do not pretend that every task can be completed on an arbitrary schedule. Estimate effort in relative terms where precise estimates would be speculative.

## Deliverable 10 — Documentation and change plan

Identify which existing documents should be:

- Preserved.
- Updated.
- Consolidated.
- Replaced.
- Created.

Avoid duplicate sources of truth.

For each proposed document, explain its purpose and ownership.

Produce proposed content or implementation tasks only where genuinely useful. Do not create documentation just to satisfy a checklist.

## Deliverable 11 — Final Owner decision list

End with a concise list of decisions that genuinely require my judgment.

For each decision, provide:

- The question.
- Your recommendation.
- The alternative.
- The consequence of choosing differently.
- Whether the decision is urgent or can wait.

Do not ask me to decide things that can be resolved through repository inspection or straightforward technical analysis.

---

# 16. Evidence, accuracy, and research standards

This review must be evidence-driven.

Every material statement should be classified implicitly or explicitly as one of:

- **Verified fact:** supported by repository contents, command output, documentation, or reliable data.
- **Reported context:** supplied by previous project discussions but not independently verified.
- **Inference:** a conclusion drawn from available evidence.
- **Recommendation:** your proposed course of action.
- **Unknown:** something that cannot presently be established.

Do not present an inference as a repository fact.

Do not invent:

- File paths.
- Package versions.
- Test commands.
- Test results.
- Branch relationships.
- Deployment status.
- Data coverage.
- Performance measurements.
- Simulation capabilities.
- Feature completeness.

When inspecting code, identify the relevant files.

When running a command, report the command and working directory.

When a command fails, distinguish an actual code defect from an environment or configuration problem.

When you cannot inspect something, say so and explain what evidence would be needed.

If you use web research to make claims about current framework behavior, software versions, hosting limits, or free-tier availability, use current authoritative sources and distinguish those findings from repository evidence.

Do not browse simply to make the report look researched.

---

# 17. Explicit anti-overengineering rules

These are important.

Do not recommend the following without a demonstrated, specific need:

- A hosted database.
- Authentication.
- A custom backend.
- Microservices.
- Docker or Kubernetes.
- Redis.
- GraphQL.
- A complex state-management library.
- A monorepo migration.
- Multiple package managers.
- A paid analytics or monitoring platform.
- Paid APIs.
- An elaborate plugin system.
- Generalized multi-sport abstractions.
- Web Workers before performance evidence.
- A wholesale framework rewrite.
- A large component library.
- A sophisticated design system before the product needs it.
- A custom build system.
- An elaborate simulation platform before a useful laboratory baseline exists.

A recommendation to introduce any of these must answer:

1. What concrete problem does it solve?
2. Why can the current stack not solve that problem?
3. What is the simplest alternative?
4. What is the maintenance burden?
5. What is the cost?
6. What evidence shows that the complexity is worthwhile?

Likewise, do not dismiss a useful technology solely because it is more sophisticated. Evaluate the actual problem and trade-offs.

---

# 18. Immediate operating instructions: how to begin

This section is especially important.

I do not want the first response to be another exhaustive theoretical report followed by no practical action.

**Begin with investigation, not implementation.**

Your first response should prioritize:

1. A concise inventory of the evidence and repository access you actually have.
2. The Colors/Cakepanz Track Brief.
3. A ranked list of the five to ten most important remediation items.
4. The major points on which the previous AI recommendations agree or disagree.
5. The decisions that genuinely require my input.

You may continue with the broader strategic analysis in the same response where evidence supports it, but do not bury the track question or the practical priorities under dozens of pages of general observations.

Do not make code changes, merge branches, upgrade frameworks, add dependencies, modify save formats, or create new infrastructure during this initial review.

For any subsequent implementation proposal, specify the exact scope, files, acceptance criteria, and verification process before execution. Obtain my approval for consequential decisions.

### Stop conditions

Stop and seek an Owner decision before:

- Selecting the primary application track.
- Merging Colors and Cakepanz.
- Replacing the framework.
- Introducing major dependencies or services.
- Making destructive architectural changes.
- Altering save compatibility in a way that risks existing data.
- Changing the product's fundamental scope.

Do not stop merely because a minor detail is unknown. Make a reasonable, clearly labeled assumption where appropriate and continue the investigation.

---

# 19. What a successful review looks like

At the end of this exercise, I should understand:

1. What the current project actually consists of.
2. What Colors and Cakepanz represent and how they relate.
3. Which track should become the primary product, with the final decision left to me.
4. What architecture is appropriate for the product.
5. Which technical changes are necessary now.
6. Which apparent problems are minor hygiene issues rather than architectural crises.
7. How the engine can be tested and protected.
8. How the simulation can be evaluated against real football.
9. How to build a useful Simulation Laboratory without overengineering it.
10. How to organize AI agents without losing control of the project.
11. Which decisions I should make now and which should remain deferred.
12. What the next practical sequence of work should be.

Most importantly, I should come away with a clear understanding of **how to make Football-Sim a better football simulation**, not simply a more elaborate software repository.

Be candid. Be specific. Challenge assumptions. Prefer evidence over convention, simplicity over ceremony, and a working, credible product over architectural perfection.

Your job is to help me make better decisions and get this project finished.

--- End verbatim ---

**Recording notes (INKLING, not verbatim):**
- The earlier message in the same thread (scattered thoughts + GPT §§1–10 + "My overall verdict" + the "add 4th in the test design" / sim-design-platform addendum) is already recorded by MUSE on `council/muse` at `_agents/owner-notes/2026-11-12-platform-vision-and-architecture-verbatim.txt` (VERIFIED 2026-11-13, read it from `origin/council/muse`). This file holds the remaining material only.
- Also already recorded there: `2026-11-12-server-ready-engine-verbatim.txt`, `2026-11-12-stack-audit-questionnaire-verbatim.txt`, `2026-11-12-svelte-not-a-lock-verbatim.txt`, `2026-11-12-focus-pregame-halftime-auto-verbatim.txt`, dynamic-engine and fluctuating-dial verbatims.
- The Owner's message presents the §1–19 document as "gpt's full recommendations." Whether GPT has run it, or it is a prompt awaiting him, is UNKNOWN to this seat; MUSE's records describe GPT having been *sent* a tooling-and-stack state document and the framework-test design, not necessarily this prompt with its output. If GPT's output lands, it belongs in `_agents/owner-notes/` via MUSE with the same verbatim treatment.
