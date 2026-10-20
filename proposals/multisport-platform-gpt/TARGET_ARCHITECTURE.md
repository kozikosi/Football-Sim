# Target Architecture Proposal

**Status:** Direction for critique. It is not a refactor instruction and does not describe the repository’s verified current structure.

## Recommendation

Keep one repository and one user-facing product family, with explicit boundaries for:

- The shared website shell and common interaction patterns.
- Each sport’s simulation engine and rule model.
- Each competition’s configuration and roster data.
- Current versus all-time datasets and rulesets.
- Reproducible run metadata and evidence.

Do **not** create four independent copies of the whole NFL app for NFL current, NFL all-time, NBA current, and NBA all-time. Do **not** make NBA a disguised NFL engine either. Reuse should happen at the level of tested contracts and product components; sport-specific behavior belongs to a sport-specific engine.

## Why this is the safest direction

A cloned app makes every UI fix, accessibility improvement, and bug fix expensive to repeat. A single universal engine risks coupling unrelated rules and turning every new sport into a maze of conditionals. A shared shell with separate sport engines gives the team a practical middle path.

The current NFL app is the working reference. V21 should remain in its existing shape unless Claude’s implementation plan and the Owner approve a focused change. First identify stable seams and contracts from the real code. Do not split files, add a framework, or migrate data just because the target tree below contains folders.

## Conceptual target tree

This tree is a map of responsibilities, not a request to create empty folders today.

    apps/
      web/
        sport and competition selection
        shared navigation and accessibility
        shared simulation setup and results shell
    packages/
      simulation-contracts/
        run identity, result envelope, seeded randomness, validation interfaces
      web-components/
        reusable controls and visual patterns
      sports/
        nfl/
          engine, rulesets, roster model
        nba/
          engine, rulesets, rotation model
        mlb/
          engine, rulesets, roster model
        nhl/
          engine, rulesets, roster model
        soccer/
          engine, rulesets, roster model
    data/
      nfl/current/
      nfl/all-time/
      nba/current/
      nba/all-time/
      mlb/current/
      mlb/all-time/
      nhl/current/
      nhl/all-time/
      soccer/<competition-id>/current/
      soccer/<competition-id>/all-time/
    docs/
      product/
      decisions/
      data/
      council/
      evidence/

A competition should usually be represented by a stable competition identifier plus configuration, not its own copied engine. If a league has genuinely different rules or needs a distinct model, document the divergence and make it explicit.

## Architecture boundaries

### Shared website layer

Appropriate shared responsibilities include routing, sport/competition selection, navigation, accessibility behavior, responsive layout primitives, error and loading states, run metadata display, and common simulation workflow steps where the user experience truly matches.

### Simulation contract layer

A small shared contract can standardize how an engine receives a validated scenario and returns a reproducible result. Candidate shared concepts include:

- Sport and competition identifiers.
- Mode identifier such as current or all-time.
- Ruleset and data version.
- Input validation result.
- Random seed and run identifier.
- Result status, summary, and diagnostics.

The contract should not prescribe the internal math or roster representation of every sport. A league-specific engine should be free to use the domain model that expresses that sport clearly.

### Sport engine layer

Each sport owns its domain rules, rating interpretation, roster construction, schedule, scoring model, season progression, playoff structure, and validation. For example, an NFL flex rule is not a generic roster-slot rule until the team demonstrates that the generalization is useful and semantics stay clear. NBA lineup, minutes, usage, and rotation decisions should be designed around basketball.

### Data layer

Keep source records, normalized records, transformed ratings, and simulation-ready data distinguishable. Every shipped dataset needs a version and a schema validation path. All-time and current modes may share a player record where identity and ratings allow it, but should not silently share season-specific attributes or adjustments.

## Evolution path

1. **Inventory current V21.** Record source files, major functions, protected constants, current test and build paths, and existing documentation. Treat existing AGENTS.md and repository instructions as binding.
2. **Stabilize the current product.** Add only narrow seams needed for explicit behavior, testing, or V21 acceptance. Do not launch a broad extraction during visual polish.
3. **Write an NFL all-time adapter/data contract.** Demonstrate how the same NFL engine could consume a separate roster and ruleset without changing current NFL defaults.
4. **Build NBA as a new sport engine.** Reuse the website shell and validated run contract after they prove useful; write basketball math and rules independently.
5. **Add all-time mode as a dataset/ruleset using the NBA engine.** Keep era translation and current-player adjustments explicit and versioned.
6. **Expand using evidence.** Add MLB, NHL, or soccer only after the first multi-sport boundary has reduced duplicate work rather than merely moved it around.

## Decision tests for any proposed abstraction

Before sharing a component or engine concept, answer:

- Which two or more implemented use cases need it today?
- What concrete duplication or inconsistency does it remove?
- Does the abstraction keep sport-specific terms understandable?
- Can one sport change its rules without surprising another?
- Can each implementation be tested with its own domain fixtures?
- Does adopting it keep V21 within its agreed scope?
- If a competition is configured rather than forked, which behaviors are configuration and which require a unique ruleset?

If these answers are not known, keep the behavior local and revisit after a second use case exists.
