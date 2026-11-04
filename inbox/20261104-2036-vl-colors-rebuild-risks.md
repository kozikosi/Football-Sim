SPEAKER: VL | ROLE: Council Advisor | TASK: Colors rebuild risks | DATE: 2026-11-04T20:36Z

VERDICT: risks-identified

CONTEXT (verified where possible):
- Current verified build: Football-Sim-PreColors.html, sha256 40233d6be00e987c, 657,486 B — one self-contained HTML file (AGENTS.md §2/§3).
- w68 = current live shell on origin/gh-pages (commit 72f12a02, "w68 live"), index.html + Football-Sim-Z-post-blue-w*.html builds.
- Colors v1 = Architect's next build on architect/engine-and-seats; Z.ai executes refactoring; Claude architects light.
- Owner's 5 decisions (4 Nov, architect/engine-and-seats): faithful rebuild, no adapter, no storage migration, public MIT repo kozikosi/20-0, separate assets build (SvelteKit/Vite) on Cloudflare Pages.

NOTE: AGENTS.md §3 states "The product is one self-contained HTML file: no paid API, no CDN, no build step for the user, no split into several files." The owner's Colors decision (separate assets, build step, CDN/Pages) contradicts this protected product rule. That contradiction must be resolved before any port begins — it is the single biggest execution risk. Label: UNRESOLVED, Owner/Architect decision required.

---

## 1. Handoff risk: Claude (light architecture) → Z.ai (heavy execution)

WHERE IT BREAKS DOWN IN PRACTICE:

a) **Interface contracts, not diagrams.** Claude will likely hand off architecture as diagrams + narrative (module boundaries, data flow). Z.ai needs concrete, machine-checkable contracts: function signatures, return shapes, error envelopes, event names. Without them, every screen Z.ai builds re-derives the contract and they diverge. Example: if the engine exposes `simulateGame(teamA, teamB)` but doesn't specify whether it mutates inputs or returns a new object, Z.ai screens will each assume differently.

b) **App state design is nobody's job.** The message correctly identifies this as the critical gap. The engine is stateless (pure functions); the app needs memory (chosen team, draft position, week, standings, roster, slot B). In w68 this is tangled in UI globals and scattered localStorage calls. If no one owns the state layer before Z.ai builds screens, each screen invents its own — inconsistent patterns from day one, impossible to test, and no single source of truth for save/load.

c) **View-models unverified as UI API.** view/draftBoard.ts and view/roster.ts exist but were built for engine internals. Whether they suffice as a UI-facing API is unverified. Z.ai will treat them as the API whether or not they're fit. Risk: Z.ai builds screens against view-models that leak engine internals (e.g. raw slot keys, internal OVR math), coupling UI to engine implementation and making the engine impossible to refactor later.

d) **Claude's limited usage.** Claude is the architect but has limited usage/availability. If Z.ai hits a boundary question mid-build and Claude can't answer quickly, Z.ai either blocks or guesses. Guessing = tech debt baked in.

WHAT Z.ai NEEDS FROM CLAUDE (that he might not think to provide):
- A state-layer spec: where app memory lives, how components read/write it, what persists to localStorage vs stays in memory, schema of each stored piece (team id, draft round/pick, current week, standings snapshot, slot A/B/C contents).
- Exact engine→UI function signatures with nullability, mutability, and error behavior.
- A "contract test" — a small runnable script that proves engine and view-model behave as advertised, so Z.ai can verify without running the full sim.
- Decision on framework (Svelte vs React) — unblocking for Z.ai's build.
- A definition of "done" for the engine slice before Z.ai starts (what engine functions must exist, with what signatures).

RISK RATING: HIGH — this is the most likely failure mode of the rebuild.

---

## 2. What's hiding in w68 (tech debt that looks like a feature)

VERIFIED from origin/gh-pages:index.html (w68 shell):

a) **Opaque payloads in envelopes.** The ZPBStorage module (phase 0, w57) validates the envelope header (kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload) but never inspects payload. `validEnvelope` returns null if `'payload' in e` — contents are completely unchecked. So any slot can contain garbage payload and the storage layer reports `ok`. This looks like a robust save system but is actually an unvalidated bucket. A port that copies this pattern inherits the corruption risk.

b) **Storage logic in UI code.** The message says w68 has "globals, scattered localStorage calls." Verified: index.html has ~74 localStorage/setItem/getItem references (vs Pre-Colors' inline script). Theme, tab, base34, and slot keys all written directly to localStorage from UI code, not through a single state layer. A port that replicates this per-screen will reproduce the tangle.

c) **Math.random() sites.** w68 index.html has 43 Math.random occurrences; Pre-Colors has 38 (verified by grep). The w68 shell adds UI randomness (confetti, firework, champion animation) on top of the sim's 38. A faithful rebuild must decide: which random sites are engine (need seeding for reproducibility) vs UI (cosmetic, can stay Math.random). If the port seeds everything, UI animations become deterministic and boring; if it seeds nothing, sim results aren't reproducible for testing.

d) **Theming tangled with gameplay.** w68 uses CSS custom properties (--bg, --text, --accent, --gold, --rose) plus data-theme attributes, with theme persisted to localStorage (`zpb:theme`). The owner wants team-themed near-white tints on every tab except Season. If theming is mixed with gameplay state in the same localStorage keys, a clean separation is harder.

e) **No separation of engine and UI.** w68 is one HTML file (Z-post-blue shell) with engine and UI interleaved. The owner rejected the single-file approach for Colors, but the w68 codebase has no internal module boundary to port from — everything must be disentangled, not just copied.

RISK RATING: HIGH — copying w68 patterns wholesale imports debt; a clean port requires disentangling, not replicating.

---

## 3. Portfolio lens (sports-gaming employers)

WHAT MAKES IT STAND OUT (good):
- A **deterministic, seedable football sim engine** — rare in portfolio pieces. Employers want to see that sim output is reproducible and rules are consistent.
- **Clean architecture separation**: engine (pure functions) vs UI (view layer) vs state layer. Shows senior-level thinking.
- **Envelope-shaped saves with versioning** (schemaVersion, engineVersion, dataVersion) — shows foresight about data migration and compatibility.
- **Public MIT repo** with commit history showing iterative design decisions — shows engineering process, not just a final artifact.

WHAT MAKES IT LOOK AMATEUR (avoid):
- One 1.78MB HTML file with engine+UI+storage interleaved (the very thing being rejected).
- Inconsistent patterns screen-to-screen (each screen invents its own state access).
- Save/load that silently corrupts (opaque payloads, no validation).
- Non-reproducible sim results (unseeded Math.random in engine paths).
- Visuals that match w68 but gameplay that doesn't (look-gate passing, functional gate failing).
- No tests — a repo with screenshots but no verification of draft logic or sim correctness.

RISK RATING: MEDIUM — mitigated by investing in the state layer and testing early.

---

## 4. What we're missing (fresh eyes)

QUESTION NOBODY'S ASKING: **Who owns the state layer, and when?**

The message correctly notes app-state design is "nobody's explicit job." But it doesn't say who should take it, or by when. If it's not assigned before Z.ai writes screen one, the inconsistent-patterns outcome is guaranteed. Recommendation: make app-state design an explicit deliverable with an owner (Claude, since he knows the engine internals; or a council seat if Architect is bandwidth-limited), due before Z.ai builds any screen.

OTHER MISSING QUESTIONS:
- **Framework decision (Svelte vs React)** is open but blocks Z.ai's build. Who decides, by when? A coin flip with a date is better than indefinite debate.
- **Test strategy beyond visuals.** The plan has a look-gate (screenshots vs w68) but no functional parity plan: how to verify draft logic produces correct results, sim outputs match the engine, save/load round-trips. Need a contract/integration test layer.
- **Engine slice "done" definition.** What engine functions must exist with what signatures before Z.ai starts? Without this, Z.ai builds against a moving target.
- **Seed strategy.** Which of the 43 Math.random sites (w68) / 38 (Pre-Colors) are engine vs UI? Which need seeding for reproducibility? This affects both engine design and testability.
- **The Cloudflare Pages / single-file contradiction.** AGENTS.md §3 vs owner's separate-assets decision. Must be resolved; it determines whether the port is a rebuild or a rewrite.

RISK RATING: MEDIUM-HIGH — mostly process gaps, all fixable with explicit ownership and dates.

---

RECOMMENDATION (summary):
1. Resolve the single-file vs separate-assets contradiction (AGENTS.md §3 vs owner decision) before porting.
2. Assign app-state design to an owner with a due date before Z.ai screen one.
3. Claude provides concrete engine→UI contracts (signatures, mutability, errors) + a contract test script.
4. Decide framework (Svelte vs React) with a date.
5. Add functional parity tests (draft logic, sim output, save/load round-trip) alongside the visual look-gate.
6. Classify each Math.random site as engine (seed) vs UI (cosmetic).

EVIDENCE: VERIFIED (gh-pages index.html storage module, Pre-Colors Math.random count, architect/engine-and-seats branch existence). INFERRED (handoff mechanics, portfolio employer preferences — reasoned from context, not run).
