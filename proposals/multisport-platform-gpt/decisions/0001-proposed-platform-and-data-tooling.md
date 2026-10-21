# Decision record proposal 0001: platform boundaries and data tooling

**Status:** Proposed for joint review; not accepted  
**Proposed:** 2026-10-20  
**Proposed by:** GPT, Owner-appointed co-architect  
**Decision owners:** Owner and Claude, with council critique  
**Scope:** Repository layout, source/delivery format, sport boundaries, player-data intake, and acceptance evidence

## Context

The Owner’s priority is to finish and protect the current NFL simulator and V21, then add NFL all-time, current NBA, and NBA all-time simulations. The longer-term website may include MLB, NHL, and soccer. The Owner’s current planning signal is 1,500–2,000 all-time candidates for each of NFL and NBA, because an undersized pool can force fabricated players or poor role/flex coverage.

The Owner has not chosen whether products should be separate repositories, whether every simulation must remain one standalone HTML file, or whether source code may be split and bundled. The existing AGENTS.md describes an NFL-only, single-file application and bars other agents from implementing. This proposal does not change those instructions.

The project also has a shared OpenChamber Playwright suite under review. The browser suite can keep running in OpenChamber while deterministic data checks run locally and in GitHub Actions.

## Options considered

### Repository

1. Keep each sport in a separate repository. This isolates releases but duplicates the web shell, product workflow, and governance while the projects share one Owner and product family.
2. Keep simulations in one repository with separate sport engines, data, and mode boundaries.
3. Move immediately to a more complex multi-repository or workspace arrangement.

### Source and delivery format

1. Keep each complete app as a hand-edited monolithic HTML file.
2. Split source into modules and produce a self-contained HTML file for each simulation.
3. Move to a server-backed application and deploy separate hosted services.

### Sport model

1. Copy the NFL engine and add conditionals for NBA, MLB, NHL, and soccer.
2. Give each sport an independent engine while sharing only proven web components and a small run/result contract.
3. Duplicate the entire website and engine for every sport and mode.

### Data and verification

1. Store player names and final ratings directly in each app with minimal source notes.
2. Keep versioned, sport/mode-specific data with provenance and validate it with a small no-dependency script.
3. Add a database and paid data or validation services before the first new sport is modeled.

## Recommendation

1. **One repository for the foreseeable first four projects.** Keep the product family and simulation data together with obvious sport and mode boundaries. Revisit separate repositories only when a concrete release, access-control, ownership, licensing, or maintenance need outweighs one shared record.
2. **Keep a self-contained HTML artifact as the near-term delivery contract for each simulation if it remains useful to the Owner.** Do not require all source to remain in one giant HTML file. After V21 is accepted, evaluate small source modules that produce a self-contained HTML deliverable. Do not begin extraction until current output constraints are documented and a reproducible, no-cost bundling method is reviewed.
3. **Keep sport-specific simulation logic separate.** Share navigation, accessible controls, responsive presentation, common run metadata, and other components only after at least two real sports demonstrate the same need. NFL flex and roster construction, NBA minutes and rotation, and other sport rules remain domain-specific.
4. **Separate data by sport and mode.** Preserve player identity, source observation, rating transformation, and simulation-ready values as distinct concepts. A source rating can remain unrated, provisional, or on its original scale until the domain model and mapping are approved.
5. **Use the no-dependency Node intake validator now.** It checks structure, declared roles, statuses, source references, unique identifiers, and scale bounds. It does not author ratings or establish truth.
6. **Keep OpenChamber as the shared UI test runner for now.** Store the browser protocol and per-run evidence in Git/PR artifacts. Use a narrow GitHub Actions job for deterministic Node data checks only. Do not add another Playwright installation or a paid service.

## Consequences

- V21 remains the active product implementation and is not refactored by this tooling proposal.
- New simulations can share user-facing patterns without forcing shared sport math.
- A standalone deliverable can remain possible while source maintainability is evaluated separately.
- The 1,500–2,000 count is a planning range, not permission to pad the pool or create unsupported player records.
- The validator accepts incomplete candidate records when unknowns are explicit. Human source review remains required.
- Figma may help with screen exploration but is optional; Markdown diagrams and Git decision records remain authoritative.
- Existing governance instructions may need an Owner/Claude update before the proposal becomes the normal repository rule.

## Open questions for the decision owners

1. Confirm whether one repository is preferred, or whether Claude sees a concrete reason to separate a sport.
2. Confirm whether each simulation should remain deliverable as a self-contained HTML file.
3. If HTML remains a deliverable, approve evaluating modular source plus a deterministic bundling step after V21 rather than preserving one-file source forever.
4. Confirm when the all-time pool target is satisfied: candidates collected, sourced records reviewed, or fully rated simulation-ready players.
5. Decide which file becomes the canonical location for accepted ADRs and data status after current proposals are reviewed.

## Revisit triggers

Revisit this proposal if a second sport demonstrates that the proposed shared shell or run contract is wrong; a product needs distinct release/access control; standalone HTML proves impractical; bundling adds meaningful cost or fragility; or data licensing and provenance requirements call for different storage.
