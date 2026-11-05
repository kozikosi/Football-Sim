SPEAKER: OR | ROLE: Council Advisor | TASK: Colors rebuild — council response to Kosi's briefing | DATE: 2026-11-04T23:51:00Z

FOR: Kosi (Owner)

## Critiques of the plan

**Save envelope disagreement unresolved.** Claude and Z.ai disagree on which fields to include and which hash algorithm to use. This needs to be resolved before freeze — the envelope is a contract that sync (v1.1) depends on. Recommend: Architect declares a draft, Z.ai builds against it, then freeze with Owner sign-off.

**No conflict resolution for sync v1.1.** Laptop→phone continuity with OAuth/D1 means two devices can both save before syncing. The envelope needs a revision field and a conflict-resolution strategy (last-write-wins by revision, or merge). Don't build sync now, but the envelope must not make it impossible later.

**Calibration gap is huge.** Current: 38% playoffs / 3% title. Target: 80% / 25% / 10%. That's not tuning — that's engine redesign territory. The Outcome Lab 440-season baseline must run BEFORE any tuning. Run it first, then establish bands, then tune inside bands. Don't tune to match target numbers without bands.

**Full seed replay deferred but needed for regression.** "Users won't care about replaying the same schedule" — but engineers need replay to reproduce bugs when engine changes break seasons. Deterministic continuation from checkpoint (Q8b) is required; full replay from seed+actions can wait. But without replay, how do you prove an engine change didn't break an old save?

**Fresh repo loses history.** No history mirror means employers can't see iteration — they see only the final state. The portfolio story is "I managed AI agents building a complex product" — that story needs the council discussion threads, ADRs, and decision logs as evidence. Keep them in the repo, not just in council branches.

**Queue bloat: 33 ready + 88 awaiting review.** Most of these were written for single-file shell waves. They don't translate cleanly to Svelte screens. Triages needed: mark single-file-specific items as superseded, batch-review the rest.

**View-model boundary needs explicit ownership.** "View models accept narrow AppState slice, never raw DraftState" — good. But who defines the mapping? If Z.ai invents per-screen patterns, the boundary erodes. Claude should define the first two view models (after draftBoard/roster) and freeze the pattern before Z.ai builds screens.

## Workflow

**Wave system → screen-based units.** Waves were iteration units on one HTML file. For a multi-file Svelte rebuild, the unit of work should be one screen end-to-end (engine → store → view model → component → dispatch). One screen = one PR-equivalent.

**Formal handoff needed.** Claude writes contracts, Z.ai implements. Currently informal. Need documented handoff: ADRs + interface freeze + escalation path when Z.ai finds a contract unbuildable (return to Claude with annotated failure, not improvise).

**Save envelope freeze authority.** Architect (Claude) declares draft freeze; Owner signs off. Post-freeze changes need RFC + Owner approval, not silent edits.

**Review process: tiered.** Three confirmations by different seats is right for contracts (engine, store, envelope). Overkill for UI polish (button colors, copy). Tier by risk: contracts → 3 reviews; UI → 1 review; docs → 0 reviews (self-merge). Prevents bad work through on contracts without slowing visual iteration.

## Svelte/Vite adjustments

**Enforce runes syntax.** $state, $derived, $props. No mixing legacy Svelte ($: reactive statements) with runes. Lint rule to catch legacy patterns. Most AI material is legacy-Svelte or React-flavored — train Z.ai and Claude to reach for runes first.

**View models are framework-free.** Svelte components read from view models via $state subscriptions. Don't leak $state into view models — that's the wrong layer for reactivity.

**No useEffect equivalents.** Svelte $effect, not React useEffect. Don't write React-flavored Svelte.

**Bundle budget.** Svelte 5 is 15 KB gzip. Keep it that way. Vite tree-shakes aggressively — verify dead code elimination in CI.

**Offline-first loading states.** First load downloads assets — need skeleton UI. After first load, no network loading states (service worker cached). Test: load once, disconnect, reload, start season, save, close, reopen, continue.

**Form handling.** Svelte bind:value (uncontrolled), not React controlled inputs. Don't fight the framework.

## Novel ideas

**Document the council process as portfolio evidence.** The unique differentiator isn't "I built a football sim" — it's "I managed AI agents building a complex product." Keep council discussion threads, ADRs, decision logs, and disagreement write-ups in the repo. This is the story employers will remember.

**Streaming results for 100-season sim.** Don't block UI on 440 seasons. Stream results as they complete — shows engineering maturity.

**Save envelope as the portfolio artifact.** The envelope (profileId, saveId, schemaVersion, revision, sport, engineVersion, datasetId, datasetHash, seed, savedAt, createdAt, state) is a real engineering decision employers can read. Document why each field exists.

**Quarterly/halftime saves.** Long-term desire — don't architect against it, but the save envelope should allow mid-game state capture now. One field: `gameState: 'draft' | 'season' | 'playoffs' | 'superbowl'` plus quarter/time if mid-game.

## Testing

**Outcome Lab.** Use it to establish calibration bands BEFORE tuning. Run 440-season baseline on gh-pages. If findings contradict bands, bands might be wrong — flag, don't force the engine.

**Test runners:** Vitest for unit tests (engine, view models), Playwright for E2E (full loop: pick → navigate → save → reload → continue).

**Three test tiers:** engine unit (determinism), store unit (action → state), E2E (visual + save/load round-trip). Don't rely on screenshots — functional parity, not visual parity.

## Ranked recommendations (top 5)

1. **Resolve save envelope freeze.** Claude drafts, Z.ai reviews, Owner signs off. Blocks sync v1.1 and all save/load work.
2. **Run Outcome Lab 440-season baseline.** Establish bands before any engine tuning. Blocks P-250 calibration.
3. **Freeze view-model pattern.** Claude specifies first two view models (after draftBoard/roster). Z.ai builds screens only against the frozen pattern.
4. **Triages the queue.** 33 + 88 items written for single-file shell. Mark single-file-specific items superseded; batch-review the rest as Svelte screens.
5. **Tiered review process.** Contracts → 3 reviews; UI → 1 review; docs → self-merge. Prevents contract rot without slowing visual iteration.

## Cuts (limited usage)

- **Full seed replay** — defer until post-v1. Don't architect against it (deterministic continuation Q8b required), but don't spend v1 effort on replay UI.
- **Quarterly/halftime saves** — long-term. Envelope field only, no UI in v1.
- **Basketball** — post-freeze/post-v1.1. Sport discriminator in envelope, no basketball engine work in v1.
- **OAuth/D1 sync** — v1.1 only. v1 is IndexedDB-only offline.
- **Wave UI work** — don't port waves to Svelte screens 1:1. Rebuild each screen against the new pattern.

## Verdict

The architecture (Engine → Store → View Models → UI) is sound and appropriately decoupled for a rebuild. The three biggest risks are: (1) save envelope not frozen, (2) calibration bands not established before tuning, (3) view-model pattern not frozen before Z.ai builds screens. Address those three first and the rest follows.

Questions back: who has access to run the Outcome Lab (colors/tools/outcomelab/sweep.ts)? Is the 440-season baseline on gh-pages current? Does the envelope disagreement between Claude and Z.ai block anything on Z.ai's critical path right now?