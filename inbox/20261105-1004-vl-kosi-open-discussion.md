SPEAKER: VL | ROLE: Council Advisor | TASK: Kosi's Colors rebuild open discussion | DATE: 2026-11-05T10:04Z

VERDICT: input-with-concerns

This is my response to Kosi's open discussion prompt (via Muse). It is council input, not assigned work. Every claim labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.

---

## 1. CRITIQUES OF THE PLAN

### Contradiction: single-file vs separate assets (CRITICAL, UNRESOLVED)

Kosi says the rebuild uses Svelte 5 + Vite with separate assets on Cloudflare Pages. But AGENTS.md §3 states verbatim: "The product is one self-contained HTML file: no paid API, no CDN, no build step for the user, no split into several files." AGENTS.md §2 table names Pre-Colors (sha256 40233d6be00e987c) as "The current verified build." This reversal is a protected product rule change. It needs Owner approval before any split-assets work begins; otherwise work will be thrown away.

### Contradiction: determinism (needs reconciliation)

Kosi says: (a) "Full seed replay: not a v1 priority" and (b) "If you save mid-season and reload, you get the exact same results as if you never saved." These are in tension. (b) requires checkpoint continuation — serialized RNG state in the save envelope — which is effectively seed replay at the session level. Either (b) is required (then RNG state serialization is v1 work) or it's not (then reload may diverge). These need to be made consistent. My take: keep (b) as required (it's fundamental to offline saves), treat full replay-from-history as post-v1.

### Svelte 5 + Vite: execution risk

Kosi says Svelte 5 + Vite is locked; both Claude and Z.ai ranked it #1. But Kosi also says "nobody in the council has shipped a large Svelte 5 app, and most Svelte material an AI reaches for is legacy-Svelte or React-flavored." This is a real risk. Svelte 5 runes ($state, $derived, $props, $effect) are a significant mental model shift from Svelte 3/4. If the team drifts into legacy patterns, the codebase forks stylistically and the "framework-free engine/store/view-model" separation gets blurred by framework leakage.

My take: Svelte 5 is fine for a small team, but the lock-in needs enforcement — a runes-only lint rule, a Svelte 5 style guide, and at least one reviewer who has read the Svelte 5 migration docs. Without that, legacy Svelte patterns will creep in.

### "No storage migration — old saves orphaned" — acceptable for v1, document it

Fine for v1 (no users to protect). But the save envelope must be versioned (schemaVersion) so v1.1 sync doesn't break on old local saves. This is already in the brief; just don't cut it.

### 80/25/10 calibration targets — good, but need measurement bands first

Kosi's rule: "don't tune the engine to match target numbers without establishing the bands are correct first." This is exactly right. P-250 (calibration experiments) should first establish what the engine *actually* produces across 440 seeded seasons, then compare to 80/25/10, then tune. The Outcome Lab is the right tool for this. Don't reverse-engineer the engine to hit the targets.

### Mid-game quarterly/halftime saves — defer

Kosi lists this as a "long-term desire." Good call to keep it out of v1. Mid-game saves complicate the RNG state serialization and the "exact same results on reload" guarantee. Defer to post-v1.

### Engine determinism claim — small sample, needs more

Kosi says Z.ai "ran 5 games in 3 different simulation orders and got byte-identical results." 5 games is a smoke test, not proof. The Outcome Lab (440 seasons in ~5 minutes) should be used to validate determinism at scale before the engine is declared "proven deterministic." Byte-identical on 5 games doesn't prove it on 440.

---

## 2. WORKFLOW — HOW WE WORK TOGETHER

### Wave system doesn't fit multi-file rebuild

The wave system (w52–w71) was built for iterating on one HTML file. For a multi-file Svelte rebuild, the unit of work should shift from "wave = visual UI iteration" to something contract-based: e.g. "view-model contract + component + action + test." A wave that produces six static HTML files doesn't map to a Svelte component tree. Recommend retiring the wave system as the primary unit and adopting per-screen or per-contract work items in PRIORITIES.md.

### Claude→Z.ai handoff needs formalization

"Claude writes contracts, Z.ai implements them" — what happens if Z.ai finds a contract unbuildable? There needs to be a formal escalation: Z.ai files a "contract-breach" inbox item, Claude revises, and the contract is re-frozen. Without this, Z.ai either blocks (wasting unlimited usage) or guesses (baking in tech debt). The contract freeze should have a declared owner (Claude) and a change process (RFC + Owner approval post-freeze).

### Save envelope freeze governance

Who declares it frozen? What happens if someone wants to change it after? Recommend: Claude declares the freeze (he's the contract designer), changes require an inbox ADR + Owner approval, and the freeze is documented in COLORS-V1-DESIGN.md. Z.ai builds against the frozen surface; post-freeze changes go through version bump + RFC.

### Queue backlog: 33 ready to build, 88 awaiting review

That's a lot of unresolved work. Recommend active triage: retire items superseded by the rebuild (single-file UI items are mostly obsolete now), keep only items that map to the new architecture, and re-tier. P-211 (batch-verify V23 text-removal items) is relevant here — many of those items may be moot in the rebuild.

### Three-confirmation review process

Risk: it slows P0/P1 items. Risk: two reviews may not catch architectural unsoundness. Recommend tiered review — P0/P1 items need two reviews but one must be a seat with architectural context (Claude or a High Councillor); P2/P3 items can be two council seats. Rejected items reopen; that's working as designed.

---

## 3. ADJUSTING TO SVELTE 5 + VITE

### Enforce runes-only

Svelte 5 runes ($state, $derived, $props, $effect, $inspect) must be the enforced idiom. Legacy Svelte (let x: $store, reactive statements $: ) should be prohibited by lint. Most AI training data is pre-runes Svelte, so Z.ai will naturally emit legacy patterns unless told otherwise.

### Framework-free boundary is the real win

The engine, store, and view models don't depend on any framework. This is the correct architecture — it means the Svelte choice is UI-only and can be revisited. Protect this boundary: view models accept framework-agnostic AppState slices, return plain data, dispatch typed actions. No Svelte stores leaking into the engine. No engine imports in .svelte files.

### Vite specifics

Vite is a good choice for Cloudflare Pages deployment. Watch out for: service worker registration (offline-first requires a properly scoped SW), asset hashing/cache busting, and the build output directory matching Pages' expectations. The 248 KB save size (4.8% of budget) Kosi mentions — verify that's gzipped or raw; either way it's small enough for localStorage/IndexedDB.

### Portfolio signal

Svelte 5 + runes is a stronger portfolio signal than React for this project because it shows the team chose a modern, less-common framework deliberately. But only if the codebase actually uses runes idiomatically. A React-flavored Svelte codebase looks worse than clean React.

---

## 4. NOVEL IDEAS

### The council process IS the portfolio artifact

Kosi says the story is "I managed AI agents building a complex product." That means the way we work together matters as much as the game. The council's collaboration model (ranked queue, inbox reviews, ADRs, preserved worktrees) is itself demonstrable work. Document it: N1 council exhibit (six files) is a good start, but also document the decision process itself — how disagreements were resolved, how contracts were frozen, how the queue was triaged. That's what employers will actually find interesting.

### Use the Outcome Lab for calibration, not just testing

The Lab runs 440 seasons in ~5 minutes headless. Use it for P-250 calibration: establish the baseline bands (what does the engine *actually* produce?), then compare to 80/25/10, then tune. Also use it to validate determinism at scale (more than 5 games).

### "Quarterly/halftime saves" as a portfolio feature

Mid-game tactical saves are actually a strong portfolio story — it shows the state layer is granular enough to checkpoint mid-simulation. But defer to post-v1 per Kosi's instinct; don't let it complicate v1.

### Second sport (basketball) as a contract stress-test

The `sport` discriminator should be deferred to post-v1.1, but the envelope and action types should be designed so adding basketball is additive (new schemaVersion, new action types), not breaking. That's the real test of the architecture's flexibility.

---

## 5. TESTING

### Outcome Lab is the right tool

colors/tools/outcomelab/sweep.ts, 440-season baseline on gh-pages. Headless, no browser, ~5 minutes. Use it for:
- Determinism validation at scale (440 seasons, not 5 games)
- Calibration bands (establish actual output before tuning to 80/25/10)
- "What if" engine hypotheses (Q-new from my earlier review: corner philosophy, late-game script, etc.)

### Rule: don't tune to bands without establishing them first

Kosi's rule is correct. If a finding contradicts a band, flag the band — don't force the engine. This preserves engineering integrity.

### Functional tests beyond visuals

The look-gate (screenshots vs w70) is visual parity only. Add functional tests: draft logic correctness, sim output vs engine, save/load round-trip. Vitest for engine/view-model unit tests; Playwright for the look-gate and round-trip.

---

## 6. SUMMARY — RANKED RECOMMENDATIONS

1. **Resolve single-file reversal with Owner** before any split-assets work (AGENTS.md §3 contradiction).
2. **Reconcile determinism:** checkpoint continuation (RNG state in envelope) required for v1; full replay-from-history deferred.
3. **Enforce Svelte 5 runes-only** via lint + style guide; protect the framework-free engine/store/view-model boundary.
4. **Formalize Claude→Z.ai handoff:** contract-breach escalation path, freeze owner (Claude), change process (RFC + Owner approval).
5. **Triage the queue:** retire single-file-superseded items, re-tier, keep only architecture-mapped work.
6. **Tiered review:** P0/P1 needs architectural-context reviewer; P2/P3 can be two council seats.
7. **Outcome Lab first:** establish calibration bands at scale (440 seasons) before tuning to 80/25/10; validate determinism beyond 5 games.
8. **Document the process:** the council's collaboration model is the portfolio artifact, not just the game.

EVIDENCE: VERIFIED (AGENTS.md §3 single-file rule, Pre-Colors sha256, PRIORITIES.md queue state, Kosi's prompt claims about Svelte/Outcome Lab). INFERRED (handoff mechanics, wave-system fit, portfolio signal — reasoned from prompt context and AGENTS.md).
