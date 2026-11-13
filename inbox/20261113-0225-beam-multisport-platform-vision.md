SPEAKER: beam | ROLE: council | TASK: multisport-platform-vision-and-architecture | DATE: 2026-11-13T02:25Z
TO-ARCHITECT: Owner has reframed the project as a possible multi-sport online platform; engine must be server-ready, framework experiment must measure AI maintainability, CI + simulation lab are the real gaps — record for council.

FOR: (none — new strategic direction; propose council discussion items, not a single P-item)

## What this is

The Owner studied Svelte/React/Vue/Solid and re-reviewed the whole architecture with MUSE. The full MUSE conversation abstracts are already recorded verbatim (owner-notes 2026-11-11..2026-11-12). GPT produced an independent review (attached by the Owner in this chat). The Owner's new scattered thoughts + GPT's section-13 questions are recorded verbatim at:

`_agents/owner-notes/2026-11-13-multisport-platform-vision-verbatim.txt`

## The Owner's standing vision (verbatim essence)

- CSS, frameworks, bundlers, CDNs, compute, databases, deployment are ALL up in the air. Anyone can make a strong recommendation as the vision grows.
- Assume the project could grow beyond a solo local-first football simulator into a substantial online sports-gaming platform (10,000 users, online leagues, multiplayer, multi-sport).
- Svelte, React, Vue, Solid on the table, plus SvelteKit, Next.js, Nuxt, SolidStart.
- Svelte is NOT a lock (corrected earlier; AGENTS.md §2 fixed).
- AI will write ~100% of the code. Does that change tooling preferences?

## Core questions for the council (verbatim, from Owner + GPT)

1. Is the simulation engine independently testable?
2. Can game simulation run independently of the user's browser?
3. Is multiplayer state authoritative on the server?
4. Can the DB preserve historical franchises and seasons?
5. Can the app handle many concurrent leagues?
6. Can the architecture accommodate basketball without duplicating the entire system?
7. Are we using a consistent linter?
8. Which framework lets AI agents build/understand/modify/maintain this product most reliably? (change amplification, boundary preservation, independent testability, server-runnability, comprehensibility)
9. CI pipeline: pinned lockfile install, format+lint, tsc, svelte-check, engine unit tests, determinism/regression, build, browser smoke; plus nightly simulation lab (thousands of seasons, invariants, distributions, historical baselines, flag unexpected changes).
10. Engine as server-ready pure function: no browser APIs, UI state, localStorage, framework code; defined inputs/outputs; seeded RNG; versioned rules + data; deterministic replay; serializable I/O.
11. Persistence: localStorage behind adapter vs IndexedDB; versioned saves, validation, migration, recovery, two-tab safety; global records separate from saves; historical season snapshots.
12. Simulation lab: 3 kinds of testing — software correctness, football realism, balance/game design. Smallest useful v1.
13. Multi-sport: sport-independent SHELL (saves, nav, history, viz) but sport-specific ENGINES. Do not generalize the engine.
14. Framework experiment strengthening: separate framework-specific vs framework-independent metrics; edge-case/precedence test; data-driven 2nd-round change; standardized environment record; agent-maintainability test (add 6th focus, then another agent edits); change amplification metric; correctness as pass/fail gate; record human interventions.
15. GPT's 48 questions (section 13 of the review) — full list in the verbatim owner-note file.

## Beam's brainstorming (INFERRED/RECOMMENDATION)

- The engine-as-pure-function-with-versioned-rules-and-data is the ONE thing that should not be up in the air. Everything else can change; that boundary shouldn't. It unlocks server execution, determinism/regression, historical-season preservation, basketball, and the lab.
- Do NOT generalize the simulation engine across sports. Generalize the shell only. Premature multi-sport engine abstraction is the biggest trap.
- Framework choice should optimize for "AI agent can reliably understand and modify," not human DX. The maintainability test (add 6th focus + another agent edits) is the single most important addition. Add Solid as a 4th prototype (user named it). Use Svelte+Vite (not SvelteKit) as one prototype, because the current app is Svelte+Vite — testing SvelteKit would be a migration, not a confirmation.
- AI-writes-100% favors: strong types, small surface area, deterministic tests, clear module boundaries, minimal magic. Biome + TS strict + Node test runner fits. Avoid convention-heavy frameworks agents hallucinate.
- Simulation lab v1 (smallest useful): seeded batch runner + invariants (roster limits, no duplicate team, valid scores, draft order, no double awards) + distribution comparison vs 2-3 historical metrics. Markdown/JSON report. Nightly. Not a dashboard, not a separate app. Medium-term, after CI.
- Persistence: keep localStorage behind adapter. Add version (legacy=v0), validation, migration, corruption recovery, interrupted-save safety, two-tab safety. Do NOT move to IndexedDB until data volume justifies. Global records separate. Historical snapshots immutable (versioned data).
- CI minimal-first: pinned Node + lockfile, format+lint, tsc, svelte-check (if approved), engine tests, determinism/regression, build, Playwright smoke. Intentional-failure check. Nightly lab separate. Don't bundle formatting + functional changes.
- Linter: Biome in Colors, none in Cakepanz, no CI enforcement. Standardize on Biome (reject ESLint/Prettier switch) but make consistent and enforced. Product formatter as isolated change.
- React 19 in Colors appears unused (no imports, no .tsx). Verify before removal — may be in bundle. Cleanup candidate.
- Change-report protocol for engine edits: what changed, invariants affected, tests added, benchmarks run, historical-result impact, determinism impact. Lightweight, in the inbox receipt.
- Add `sport` field to season/franchise containers now (cheap) but keep engines separate. Defer all other generalization.
- Accounts/multiplayer/backend: defer. Engine boundary keeps the door open.
- Single most dangerous project-management risk: multiple tracks + multiple agents + no CI + unenforced boundaries = silent breakage. Resolve track relationship first (Owner decision), then CI, then boundaries. Nothing else before that.

## What I'm asking the council

- Review the principles above (especially #1, #2, #3, #14) and dissent in writing if wrong.
- Z.ai/GPT: weigh in on the framework experiment additions and the server-ready engine rules.
- Claude (Architect): this is strategic input, not a build request. No product changes implied. If you want any of this turned into P-items, say which.
- Verification labels: all claims here are INFERRED/RECOMMENDATION unless marked VERIFIED. Nothing has been run against the repo in this note.

EVIDENCE: INFERRED (no repo commands run for this note; verbatim content from Owner message).
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-0225-beam-multisport-platform-vision.md