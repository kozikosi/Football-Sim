SPEAKER: VL | ROLE: Council Advisor | TASK: Colors rebuild briefing review (Muse to Claude) | DATE: 2026-11-04T23:48Z

FOR: P-198 (review ARCHITECTURE-DIRECTION.md — staged path from one HTML file to interviewable project)

VERDICT: input-with-concerns

This is council input to the Architect (Claude) on Muse's briefing. It is not a work item to build; it is a review of the briefing itself. Every claim labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.

---

## 1. WHAT I'D CHANGE — MAJOR ISSUES

### Issue A: The single-file contradiction (blocking, must be resolved first)

Muse's briefing says: "Not single-file. Your last reply said 'the product still ships as one self-contained HTML file; only the source is split.' Reversed. Kosi rejected single-file. The build uses separate assets on Cloudflare Pages. Update COLORS-V1-DESIGN.md, AGENTS.md §2, PROJECT-KNOWLEDGE.md, CLAUDE.md."

PROBLEM: AGENTS.md §3 states verbatim: "The product is one self-contained HTML file: no paid API, no CDN, no build step for the user, no split into several files." This is a protected product rule (AGENTS.md §3, also listed in §8 under Architect-owned files).

Muse proposes updating AGENTS.md §2, §3-equivalent, PROJECT-KNOWLEDGE.md, CLAUDE.md — but AGENTS.md §8 assigns ALL of those to the Architect only, and §9 says "Do not change the product to make a linter or test pass; fix the cause or record the finding." A change to the single-file rule is a protected-constant-level governance change that requires the Owner's approval (the Owner decides product direction; AGENTS.md §1).

WHAT I'D CHANGE: Remove the instruction to "update AGENTS.md §2, PROJECT-KNOWLEDGE.md, CLAUDE.md" from the briefing. The correct path: Claude proposes the split to the Owner as an explicit re-open of a protected rule; the Owner decides; only then does AGENTS.md get updated by the Architect. Until that reversal is Owner-approved, the Colors v1 build remains single-file per AGENTS.md §2 table (Pre-Colors is the current verified build).

RISK RATING: CRITICAL — building split-assets before the rule is reversed produces work that must be thrown away.

### Issue B: Data strategy — Madden ratings provenance (AGENTS.md §7)

Muse says: "Real NFL names stay. Madden ratings are private dev reference only. The public repo needs independently generated ratings, a permissive source, or user-supplied file. Document provenance."

PROBLEM: AGENTS.md §7 states: "no factual data is invented, estimated or silently 'corrected'" and "if provenance of embedded data cannot be established, report that instead of treating it as verified." The Owner replaced the 1,200-player set with new Madden ratings (28 Oct); that file is frozen once supplied.

WHAT I'D CHANGE: The briefing should explicitly state that the Madden dataset cannot ship in the public MIT repo unless the Owner supplies it with provenance. The engine interface must accept an externally supplied dataset (user-supplied file or permissive source) — not bundled proprietary ratings. This is a data-integrity requirement, not a nice-to-have.

RISK RATING: HIGH — shipping scrambled Madden ratings as "independently generated" violates §7 and could expose the project to IP claims.

### Issue C: "No separate adapter module" vs "view-model layer is the translation boundary"

Muse says: "No separate adapter module. The view-model layer is the translation boundary: it accepts a clean framework-agnostic AppState slice, maps internally to engine shapes, never leaks DraftState to UI."

INFERRED: This is self-contradictory. A view-model that "maps internally to engine shapes" IS an adapter — it's just not called one. The distinction matters because if Z.ai builds per-screen adapters inside each view-model, you get the inconsistent patterns Muse is trying to avoid.

WHAT I'D CHANGE: Rename it honestly: "a single, framework-agnostic view-model contract layer (one module, not per-screen adapters)." Define one contract, not seven. The view-model layer accepts AppState, returns framework-agnostic view data, and dispatches typed actions. One implementation, reused by all screens.

RISK RATING: MEDIUM — naming ambiguity leads to per-screen adapter reinvention.

---

## 2. MY TAKES ON Q8–Q11 (answer first)

### Q8 — Determinism, three levels

(a) Seed storage: required. (b) Deterministic continuation from saved checkpoint (RNG state, not just seed): required for v1. (c) Full replay from seed + action history: design for it, defer implementation.

MY TAKE:
- Single RNG stream, not multiple. Multiple streams make checkpoint serialization and replay harder. One `seed` + `rngState` (the generator's internal state, serialized as part of the save envelope) is sufficient for (a) and (b).
- (c) replay from seed + action history: design the action log shape now (typed AppAction[]), but defer the replay engine. Cheap to design, expensive to implement — defer as Muse suggests.
- No remaining Math.random in engine paths. All engine randomness goes through the injected RNG. UI-only randomness (confetti, firework, champion animation) may keep Math.random — but classify explicitly (see Debt Inventory below).
- RNG state must be serializable to JSON (part of the save envelope) for checkpoint continuation.

### Q9 — Async actions (Promise<Result> from Day 1)

MY TAKE: YES. Zero-cost Web Worker migration later is a real benefit, but the stronger reason is error handling: typed actions with Promise<Result> force every dispatch to handle failure explicitly (invalid pick, save conflict, quota exceeded). w68's global-state hacks silently swallow errors. A Promise<Result> contract is the foundation for Undo, replay, and sync later.

Cost is near-zero: wrap the synchronous engine result in `Promise.resolve({ok: true, ...})` or `{ok: false, reason: ...}`. Do it now, not later.

### Q10 — Sport-neutrality (sport discriminator in SaveState/AppAction)

MY TAKE: ARGUE AGAINST IT. Premature abstraction is forbidden per the briefing itself. Adding `sport: 'nfl' | 'nba'` to root types before basketball exists (post-v1.1) couples NFL view-models to a basketball shape that doesn't exist yet. You cannot design a sport-neutral envelope without knowing what basketball needs.

WHAT I'D CHANGE: Build NFL-specific SaveState and AppAction types now. Add a `version` or `schema` discriminator if you want forward compatibility, but do not add a `sport` union until basketball is actually being built. When basketball arrives (post-v1.1), introduce the discriminator then — it's a one-line type change if the envelope is versioned.

RISK RATING: LOW cost to defer, HIGH cost to get wrong now (couples NFL to an unknown shape).

### Q11 — Sequencing

Muse's preference: (a) SaveState/AppAction contracts, (b) close engine items (P-222, step-9, injectable RNG) mapping to those contracts, (c) full detailed batch.

MY TAKE: AGREE, with one caveat: P-222 / injectable RNG fundamentally alters the state shape because `rngState` must live in the save envelope (for checkpoint continuation). So (a) and (b) are not cleanly separable — the contract must reserve a slot for serialized RNG state before it's finalized.

WHAT I'D CHANGE: Fold injectable RNG into step (a): the SaveState contract includes `seed` and `rngState` fields from day one. Then (b) implements the engine side. Don't treat them as sequential phases with a hard boundary.

---

## 3. QUESTIONS THE BRIEFING DOESN'T ASK

### Q-new-1: Who owns app-state design, and by when?

The briefing correctly notes app-state is "nobody's explicit job" but doesn't assign it. If Claude doesn't own it (he's engine-limited), which council seat does? Without an owner and a due date, Z.ai will invent per-screen state on day one — exactly the inconsistent-patterns outcome the briefing fears.

RECOMMENDATION: Claude owns app-state design (he knows engine internals), due before Z.ai builds screen one. If Claude's usage is too limited, a council seat takes it with Claude's review.

### Q-new-2: Framework decision — who, by when?

Svelte 5 vs React is undecided and blocks Z.ai. The briefing says "assume the framework choice affects contracts unless you can articulate why it doesn't" — but doesn't set a decision date or owner.

RECOMMENDATION: Owner decides (Kosi), or Claude recommends + Owner approves. Due before the reference vertical slice (Deliverable 4). Rank both on execution speed, conventions, deployment friction, portfolio signal (Deliverable 7 already asks this).

### Q-new-3: What is "done" for the engine slice before Z.ai starts?

The briefing says "Interface freeze" (Deliverable 5) but doesn't define which engine functions must exist with which signatures. Without this, Z.ai builds against a moving target.

RECOMMENDATION: Define the freeze surface explicitly: simulateGame, buildGameDetail, teamRatings, matchupModel, slotWins family, cpuPick, modelWeights/computeScore, season scaffolding, awards — exactly as E-212's seam watch already tracks. Add function-body hashes so changes are detectable.

### Q-new-4: Where does the 1,941-player dataset live at build time?

Muse says "bundled as a static build-time import (JSON/TS), instant synchronous access." But AGENTS.md §7 says the Madden dataset is private dev reference; the public repo needs independently generated ratings. If the dataset is bundled, it's part of the repo — which dataset?

RECOMMENDATION: Specify that the dataset interface accepts an externally loaded file (user-supplied or permissive source) with a fallback to a small synthetic/default set for the public repo. Engine and UI never import proprietary ratings directly.

### Q-new-5: Test runner and functional parity

The briefing mentions a "look-gate" (screenshots vs w71) and "functional test matrix green" but names no runner. Vitest? Playwright? The engine must run headless (N4 Outcome Lab requires it).

RECOMMENDATION: Vitest for engine + view-model unit tests (headless, fast); Playwright for the look-gate and save/load round-trip (needs browser). Specify both in the Definition of Done.

---

## 4. DELIVERABLE CRITIQUE

| Deliverable | Assessment | Change |
|---|---|---|
| 1. App-state + action design | Correct priority; missing owner/date | Assign owner (Claude or council seat), due date |
| 2. View-model boundary | Good direction; "adapter" naming contradiction | Rename to single contract layer |
| 3. View-model pattern + first two | Fine; remaining seven as follow-on | Specify pattern in COLORS-V1-UI-ARCHITECTURE.md first |
| 4. Reference vertical slice (Draft Board) | Good; Svelte 5 reference | Note: if React wins, pattern ports — document the port |
| 5. Interface freeze | Missing freeze surface definition | Use E-212 seam-watch function list + body hashes |
| 6. Debt inventory review | Good; classify 43 Math.random | Also classify 42 style blocks, 185 window.* sites, 4 localStorage families |
| 7. Framework impact | Good ranking request | Add decision owner + date |

---

## 5. CUTS FOR LIMITED USAGE / MINIMUM VIABLE CONTRACT SET

With Claude token-limited, propose cuts:

**CUT: Full replay from seed + action history (Q8c).** Design the action log shape, defer the replay engine. Saves weeks; checkpoint continuation (Q8b) covers v1 needs.

**CUT: Basketball sport discriminator (Q10).** Defer to post-v1.1. Saves coupling NFL to an unknown shape.

**CUT: Cloudflare Workers + D1 + OAuth sync design.** v1.1 only. v1 envelope must be sync-ready (fields present) but no sync implementation.

**CUT: All seven follow-on view-models.** Build two (Draft Board + one more), freeze the pattern, let Z.ai build the rest.

**MINIMUM VIABLE CONTRACT SET:**
1. SaveState type (profileId, saveId, schemaVersion, revision, sport/'nfl', engineVersion, datasetId, datasetHash, seed, rngState, savedAt, createdAt, current state)
2. AppAction type (typed discriminated union: draftPick, setWeights, advanceWeek, save, load, undo, etc.)
3. dispatch(action): Promise<Result>
4. Engine functions: simulateGame, buildGameDetail, teamRatings, matchupModel, slotWins family, cpuPick, modelWeights/computeScore
5. View-model contract: (AppState slice) -> view data + actions
6. Envelope validation (required fields, types — no payload inspection)

Everything else defers.

---

## 6. VERIFIED VS INFERRED

VERIFIED:
- AGENTS.md §3: "one self-contained HTML file: no split into several files" (read from file)
- AGENTS.md §8: AGENTS.md, CLAUDE.md, PROJECT-KNOWLEDGE.md are Architect-owned (read from file)
- AGENTS.md §7: data integrity rule, no invented/estimated/silently-corrected data (read from file)
- PRIORITIES.md P-198: review ARCHITECTURE-DIRECTION.md staged path (read from file)
- PRIORITIES.md P-207: review storage contract (envelope shape, facade API, versioning) (read from file)
- PRIORITIES.md E-212: seam watch function list (simulateGame, buildGameDetail, teamRatings, matchupModel, slotWins family, cpuPick, modelWeights/computeScore, season scaffolding, awards) (read from file)
- Pre-Colors sha256 40233d6be00e987c, 657,486 B, current verified build (AGENTS.md §2)

INFERRED:
- "No separate adapter module" means one contract layer, not per-screen adapters (reasoned from briefing text)
- Claude's limited usage means app-state owner may need to be a council seat (reasoned from briefing)
- Framework choice affects contracts unless proven otherwise (briefing's own framing; reasoned)

UNKNOWN:
- Whether Owner has formally approved the single-file reversal (not in briefing; not in AGENTS.md)
- What dataset the 1,941 players will be in the public repo (Madden is private; replacement source TBD)
- Whether P-222 / step-9 / injectable RNG are completed or pending on architect/engine-and-seats
- Exact E-211 baseline results for newest wN

---

## 7. FLAG: ANYTHING I BELIEVE IS WRONG IN THE BRIEFING

1. **"Update AGENTS.md §2, PROJECT-KNOWLEDGE.md, CLAUDE.md"** — WRONG. Only the Architect edits those (§8), and the single-file rule reversal needs Owner approval first. Remove this instruction.
2. **"No separate adapter module"** — partially wrong; the view-model-as-translation-boundary IS an adapter. Rename it honestly.
3. **"sport: 'nfl' | 'nba' discriminator in root types"** — wrong to include pre-basketball. Defer to post-v1.1.
4. **"Full replay from seed + action history: design for it"** — design the shape, but don't promise the engine. Defer implementation as the briefing itself says, but make the deferral explicit in the contract.

---

## 8. RECOMMENDED NEXT STEPS (ranked)

1. Resolve the single-file reversal with the Owner (protected rule). Until resolved, Colors v1 remains single-file.
2. Claude (or assigned council seat) produces app-state + action design with SaveState/AppAction contracts, including `seed` and `rngState` in the envelope.
3. Answer Q8–Q11 with my takes above (single RNG, Promise<Result> yes, no sport discriminator, fold RNG into step (a)).
4. Define interface freeze surface using E-212 function list + body hashes.
5. Set framework decision owner + date (Svelte 5 vs React).
6. Cut Q8c, Q10 basketball, v1.1 sync implementation, five follow-on view-models.
7. File ADRs for each decided contract (Deliverable 5).

EVIDENCE: VERIFIED (AGENTS.md, PRIORITIES.md read directly). INFERRED (handoff mechanics, portfolio signal — reasoned from briefing context).
