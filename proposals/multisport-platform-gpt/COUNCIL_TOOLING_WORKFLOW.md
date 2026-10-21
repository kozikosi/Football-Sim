# Council tooling and contribution workflow

**Status:** GPT-authored proposal for the Owner, Claude, and council to review. It does not update standing AGENTS.md instructions or grant anyone new authority.

## What this proposal adds

- A dependency-free player intake validator and Node tests.
- A small GitHub Actions workflow that runs the same tests and checks future player data.
- GitHub issue and pull-request templates that capture owner, branch/base, allowed paths, acceptance criteria, and evidence.
- This council workflow and a proposed platform/data decision record.
- An update to the multisport proposal recording the Owner’s 1,500–2,000 all-time candidate planning range per sport for NFL and NBA.

No player names or ratings are added. No product HTML, protected constants, Claude-authored implementation, or AGENTS.md is changed.

## AGENTS.md conflicts found before work

I reviewed the repository’s AGENTS.md before making changes. These are the specific conflicts; I have not rewritten the file.

1. **Product boundary:** it describes an NFL-only, single-file Madden simulator. The Owner’s stated goal now includes current and all-time NFL and NBA products first, with MLB, NHL, and soccer later.
2. **Implementation authority:** it says Claude is the sole implementer and other sessions must submit proposals instead of editing code. The Owner separately appointed GPT co-architect and authorized this GPT-authored tooling work. This task-specific authorization supports the current branch, but durable role wording still needs Owner and Claude agreement.
3. **Publishing workflow:** it says no branch or pull request unless asked, and says the Owner publishes. The Owner explicitly asked GPT to implement and publish this proposal, so this branch is authorized. That should not be generalized into permission to publish every future change.
4. **Build restriction:** it prohibits adding build steps. This proposal adds only a Node validation workflow; it adds no product build, package install, network call, or runtime dependency. Clarify the rule before any future compile or bundle step.
5. **Older data and role notes:** some repository documents refer to 1,200-player targets and older role arrangements. This proposal records the Owner’s newer 1,500–2,000 planning range. Role and instruction changes remain open for joint review.

Claude and the Owner should decide whether to update AGENTS.md and adjacent role records. Until that review, follow the most specific current task instruction, preserve the existing product file, and do not treat this proposal as an accepted rewrite of governance.

## GitHub work queue

Use one GitHub issue for each bounded task and one pull request for each isolated change set. The issue template prompts contributors to record the accountable owner, reviewer, workstream, exact branch and base, allowed/protected paths, acceptance criteria, dependencies, and expected evidence. The PR template carries those facts into review and records exact test commands and results.

Keep a task to one primary purpose. Do not bundle a candidate data shard, a V21 interface change, and an architecture review just because one contributor owns them. Link evidence to the claim it supports.

The GitHub connector available in this session can create branches, files, issues, and pull requests, but it does not expose a Project-board creation tool. If the Owner wants a board, create one in GitHub’s web interface with Status, Priority, Workstream, Task type, Accountable owner, Target branch/base, Evidence, and Owner decision needed. Useful views are an active board, priority-sorted backlog, and “Owner decision needed.” Issues and PRs alone remain a complete free-to-start workflow; do not add Linear or Notion as a second source of truth.

## Architecture records and diagrams

Keep accepted decisions in Git with history and review. Use the proposal’s existing decision-record template. Each record should state the question, constraints, options, recommendation, decision maker, status, rationale, consequences, evidence, and a revisit trigger.

The workflow diagram is stored below in Mermaid, so anyone can review it in Markdown or GitHub. Figma is optional. If an existing Figma workspace is available, use FigJam for navigation and screen-flow exploration, link its frames to the relevant Issue or PR, and keep accepted decisions in Git. Do not buy a design plan or add a plugin just to start; the Mermaid diagram is sufficient for technical architecture.

~~~mermaid
flowchart TD
    A[Owner or council identifies a question] --> B[Create a bounded GitHub Issue]
    B --> C[Assign one accountable contributor and allowed paths]
    C --> D[Work on one named branch]
    D --> E[Run local checks and collect receipts]
    E --> F[Open a focused pull request]
    F --> G[Independent review of assembled result]
    G --> H{Acceptance criteria met?}
    H -- No --> I[Record defect, owner decision, or partial result]
    I --> D
    H -- Yes --> J[Owner and Architect accept the relevant product decision]
    J --> K[Merge through the agreed Git workflow]
    K --> L[Update canonical status or decision record]
~~~

## Player-data workflow

1. Capture names, status, roles, seasons, and source notes. Unknown facts stay unknown.
2. Keep each sport and mode in its own dataset; do not duplicate full records just to maintain separate lists.
3. Preserve source ratings exactly as received, including scale and edition. Store transformations separately and version them.
4. Run the local validator. Fix structural errors; review warnings without treating every repeated name as a duplicate person.
5. Ask another contributor to check identity, position/status, source support, and rating transformation.
6. Promote the reviewed data only after the Owner accepts the policy. A validator PASS means structurally consistent, not true or approved.

Run the validator using the instructions in tools/player-data/README.md.

## OpenChamber and Playwright

OpenChamber remains the runner for the shared browser suite. Do not install Playwright into the product repository merely to duplicate it. The shared NFL suite is documented in open [PR #3](https://github.com/kozikosi/Football-Sim/pull/3); use its versioned protocol and result schema when accepted into the working branch.

Each browser run should identify the exact product commit and file hash, suite revision, runner/browser version, steps, errors, mobile measurements, skipped checks, screenshots, and trace. Preserve PARTIAL as PARTIAL. A run on the V20 donor or merge candidate is not evidence that V21 passed.

This proposal’s GitHub Actions workflow only runs Node’s built-in validator tests and validates files named players.json under data/. It does not launch a browser, install Playwright, or replace OpenChamber evidence. If a free CLI browser runner becomes reliable later, assess it separately before adding another execution path.

## No-cost operating rule

The work introduced here has no package dependency, API key, hosted database, paid tracker, or browser dependency. Run the validator locally. GitHub Actions can be disabled without losing the local check. Figma is optional and should use an already available account. Do not add a service with a paid tier or usage meter without the Owner’s explicit decision.
