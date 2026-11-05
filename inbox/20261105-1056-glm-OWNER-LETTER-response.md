SPEAKER: GLM | ROLE: council seat, analytics/scribe lane | TASK: Owner letter | DATE: 2026-11-05T10:58Z

FOR: Kosi's open letter (5 Nov, via Muse). Five numbered answers matching the five asks. Labels: VERIFIED (run this session) / REPORTED (other source says; named) / INFERRED (reasoned from evidence shown) / UNKNOWN.

## 1. Critiques of the plan

**1a. The only unsolved risk I see is measurement precision, and it is arithmetic, not opinion. (VERIFIED math, reproducible.)**
The Owner's rule — "don't tune the engine to match target numbers without establishing the bands are correct first" — is right, and it has a hard consequence the plan does not yet name: **at N≈100 drafts per condition, a "80±3%" band is not measurable.** Binomial sampling error is sqrt(p(1-p)/N):

| N | SE at p=0.80 | 95% half-width (±1.96·SE) | SE at p=0.25 | SE at p=0.10 |
|---|---|---|---|---|
| 100 | 4.0 pp | ±7.8 pp | 4.3 pp | 3.0 pp |
| 300 | 2.3 pp | ±4.5 pp | 2.5 pp | 1.7 pp |
| 500 | 1.8 pp | ±3.5 pp | 1.9 pp | 1.3 pp |
| 1000 | 1.3 pp | ±2.5 pp | 1.4 pp | 0.9 pp |

So the Owner's "80% make playoffs / 25% reach SB / 10% win" set of targets, stated at a tolerance smaller than ±2.5 pp, **requires N≈1000 per policy** — and the Outcome Lab already runs 440 seasons in ~5 min (the Owner's letter), so 3 policies × 1000 is ~35 min, one CI fixture. The current measured numbers (greedy 90%/20%, top30 38%/3%, favorites 20%/0% at N=100; REPORTED from the ASK text) are directionally usable but cannot verify any band tighter than ±8 pp; that is the first thing to fix, before any knob is turned.
**Concrete ask:** write the bands as "policy → target ± tolerance → N required", and make the ratio N=ceil(z²p(1-p)/tol²) a literal line in the calibration doc, so nobody re-argues sample size every round.

**1b. Determinism is proven, not institutionalised. (INFERRED from REPORTED claims.)**
"5 games, 3 simulation orders, byte-identical" is the strongest single artifact the rebuild has. The risk is that it was proven once by hand. My ask: it becomes a CI gate (same engine, different action interleavings → same digest), because the thing that silently dies in rebuilds is exactly this property. This is also what makes "no storage migration" safe: a reproducible engine means a save is a fact, not a hope.

**1c. "One user" worry — the layering is NOT overkill, but the AI-assisted development SKILL is the point. (Owner's own words + my read.)**
For one user, three layers look heavy; for an AI-council story where agents argue over contracts, the view-model boundary is what makes seats productive without breaking each other (each seat can test view models in pure TS without launching the app). That same investment is what makes the N1 exhibit legible. Keep it.

**1d. Offline/oauth are correctly sequenced; the tent requirement has a hidden failure mode. (INFERRED.)**
Service worker + localStorage is right, and 248 KB / 4.8% / ~2 ms says the budget is comfortable. The failure mode that will actually bite: **cache coherence after deploy** — the SW caches everything, the code changes, and users' tabs serve a stale engine against new saves (or vice versa). Two cheap defenses: (i) the save envelope already carries a content hash/platform version — make the app refuse to load a save whose envelope version is below the runtime's floor with a plain-language message, (ii) an "airplane-mode" CI run (Playwright with `context.setOffline(true)` + cold reload) asserting the app boots and finishes a draft from cache with the network fully down.

**1e. No storage migration: agree (VERIFIED positionality: no users), with one guard.**
The only data at risk at cutover is the Owner's own saves. Make `colors` export its legacy wXx save read-only (feature-flagged port script), so the Owner can keep his personal history without building a migration path. In the letter's own words: "No users to protect" — but the Owner is one user.

**1f. Sync at v1.1 via OAuth: yes, but it is the single largest liability surface for a free portfolio project (accounts = privacy posture, abuse, moderation). (INFERRED.)**
Consider the intermediate: cross-device save transfer by export/import (QR or file share) at v1.0.0 — zero server trust required, demonstrates the envelope design, and makes v1.1 adding OAuth additive rather than foundational.

## 2. Workflow

**2a. The letter itself is running on stale mechanics — fix the one governance source before anything else. (VERIFIED fact, cheap fix.)**
The letter says `node tools/next.mjs` and "three confirmations by three different seats". `COUNCIL.md` v8 (2 Nov) replaced both: the queue is derived through `tools/council.mjs`, and reviews are continuous-trust (one vote per seat, governed by unique-catch rate, soft cap 8; no fixed count). Two different versions of "how we work" now exist and the Owner letter is the newest one other seats will read first — an admitted seat following the letter would look for tools that no longer exist. Ask: one governance file (COUNCIL.md) remains the single truth; the shareable-letter text gets regenerated from it next time it is edited.
   — Also a budget honesty note: the letter says "33 ready + 88 awaiting review"; most of those 88 are old-shell work under the Colors rebuild. I would run ONE triage pass retiring everything the rebuild supersedes (with proof per the §3 rules) so the live queue measures the project that exists, not the archive.

**2b. The wave unit should die; the slice is already its replacement — formalise it. (INFERRED, proposal.)**
Waves made sense for one mutable HTML file. The project already invented the right unit: the Draft Board reference slice (screen end-to-end). Formalise: a *slice = one screen + its view models + acceptance checks*, named `<screen>-slice-<n>`, with three states (no interim "candidate" state): PROPOSED → CONTRACTED → REVIEWED. The visible progress board is just the existing council tool's board column — no new system needed.

**2c. Contract ↔ implementation handoff: make the contract machine-readable and the conflict channel append-only. (Proposal, fits existing tooling.)**
- The contract file per slice ships with the view-model types AND `npm run contract:check` (fails on: a view model field the UI reads but the engine doesn't produce; a state the view model exposes but the screen never renders).
- Z.ai finding a contract unbuildable does not get an informal pass; Z.ai appends `CONTRACT-CONFLICT: <one screen, one reason, one proposed fix>` to the same contract file (append-only, like the council's retire/revive ops). The Architect's branch is the arbiter; no silent in-place edits of contracts by either side.
- The envelope question the letter names (three fields, hash algorithm) falls naturally under this: whoever ships the *hydration* code is the contract's first consumer; the freeze lands when that consumer passes against the envelope spec. Freeze mechanics: tag the commit, add a conformance test in CI, and make all later envelope changes additive + version-numbered in the envelope header (never rename a field in place). Who declares it frozen: the Architect **writes** the freeze, the Verifier **confirms it with the conformance run**, per the existing "implementer never verifies his own gate" rule.

**2d. Review process:** v8's continuous-trust already removed the three-confirmation bottleneck; the real slowdown found in practice is review count saturation on shell-era items (my own P-008 review today is the 8th standing one). With the old queue triaged away (2a), the remaining Colors slice reviews should be small and fast: one screen at a time reads in minutes.

## 3. Svelte 5 / Vite

Honesty first: I have not shipped a large Svelte 5 app either (UNKNOWN), so what follows is pattern-level and enforcement-ready, not war stories.

**3a. Enforce the runes idiom in CI — this is the answer to "an AI reaches for legacy material". (INFERRED, concrete.)**
Add `svelte-check` + `eslint-plugin-svelte` to the lint gate, configured to **error** on the legacy idioms: `$:` statements, `export let` props, `on:click`/`on:` wrappers vs the `onclick` attribute form, `createEventDispatcher`. Runes-only then stops being a style debate and becomes a red check. This one CI line prevents the stylistic fork the Owner is worried about, because AI Writes follow the gradient of strictness like everyone else.

**3b. The store boundary gives us a testing gift — use it. (INFERRED.)**
Because view models are framework-free, the loud, cheap tests are pure-TS tests of view models (Vitest): the rendering layer then needs only a handful of component tests, not per-component unit tests. The usual Svelte mistake is testing components because they exist; here the contract makes the component test suite tiny by design.

**3c. Watch: Vite chunking × service worker. (INFERRED.)**
Per-route/per-screen code splitting is the default path, but the SW cache then has many small entries with independent invalidation. Keep one cache key per build (collapse chunks by build-time hash), and add the offline CI run from 1d — a stale-chunk bug class is invisible on every dev machine because dev mode bypasses the SW.

## 4. Novel ideas

**4a. The council process is itself an exhibit artifact — and it is already instrumented. (INFERRED, near-free.)**
The review governor computes unique-catch rates per review per seat today; my P-008 review alone re-measured three other seats' work and found one new defect ("the fifth estate audited itself and found one more bug" is a talking point). A static page in the N1 exhibit: catch-rate curves + the decision ledger (owner ruling → council review → build). Costs a small script against existing data; sells the method.

**4b. Name the acceptance ritual. (Portfolio story.)**
"The tent test": one video, off-grid, airplane mode, saving and loading offline. It is the offline requirement made emotionally legible — employers remember the tent, not the service worker.

**4c. Publish the calibration story as a table, not a narrative. (Owner's own style rule, applied to the process.)**
"Numbers not adjectives" is this project's signature rule — the README can carry the exact table from 1a (policy → target ± tolerance → N → measured), updated on main. This quietly demos working with AI against numerical criteria, which is the deep claim of the portfolio story.

## 5. Testing

**Nothing to report from the Outcome Lab this session** — no colors/ in this seat's worktree (as of this session's checks); the ASK it supports (outcome-based CI gate, bands + harness shape) was answered for licensing but not taken for math-estimation; I am proposing to pick it up next session. Today I contributed the sample-size arithmetic in 1a, which that ASK needs regardless.
Meanwhile, one rule-consistency note: the Outcome Lab baseline tagged "440-season baseline on gh-pages" — bands derived at N=440 carry ±1.96·SE ≈ ±3.8–5.2 pp at the relevant p's; fine for sanity checks, not for the final ±2.5 pp targets (same math as 1a).

## Two files already published this session

- `inbox/20261105-1006-glm-P-008-review.md` — P-008 work review (independent 390 px re-run on Pre-Colors; one new finding in the optional extension).
- `inbox/20261105-1031-glm-answer-ASK-data-licensing.md` — the data-licensing ASK (this letter's decisions lean on it: nflverse-data is CC BY 4.0, quoted clause by clause; CBC v. MLBAM precedent; scan of how other repos handled real names: MIT repo with real nflverse data exists; the fictional-default + import path is what the closed-source football-GM-by-the-basketball-GM-team chose).
