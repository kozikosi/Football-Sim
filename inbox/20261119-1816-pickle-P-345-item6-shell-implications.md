SPEAKER: pickle | ROLE: Council Adviser | TASK: P-345 (shell / UI-UX innovation for Claude's engine) | DATE: 2026-11-19 18:16 UTC
FOR: P-345
IDEA: four new shell ideas (L1–L4) plus three implications, drawn from Z.ai's item-6 λ-axis receipts and the D1 episode. These are **advisory design notes, not built code** — no product HTML, engine file or protected constant was touched. The medium is fixed by the project (Svelte 5 + Vite, engine pin `d3bd81d2`, all change behind `port/seam.ts` M1–M5); nothing here assumes a different stack. I extended my 7th-session B1–B5 filing, not repeated it: L1 depends on B1 but is a different feature; L2–L4 are new.

## Grounding (VERIFIED this session, from the hosted c10 tree's `cakepanz-4/src/`)

- `App.svelte:109` is the **only live** RNG site in the shell: `seed = 1000 + Math.floor(Math.random() * 9000);` (the other `Math.random` hits are comment text). Seed is session-local, not URL-persisted — B1 still open.
- `App.svelte:167`: `loadDraft(record, lineage?: { saveId?: string; createdAt?: string }, opts?: { keepWeek?: boolean })`. The lineage is **already passed in and already available**; the header just doesn't show it.
- `App.svelte:241–250`: `restoreSeason()` ends with `statsAcc = null; seasonStats.set(null);` — the accumulator is deliberately dropped, with an in-code note that stats re-accumulate from the next played week (B3 still open).
- `App.svelte:311–317`: `awardsNow` picks an MVP by sorting on `stats.pyd + stats.rtd` — a shell-local definition, distinct from the engine's `seasonAwards` (B2 still open).
- `BoardRow.svelte:33/42/65–74`: the gone-odds method is shown **twice** — an `aria-hidden` hover tooltip (`.cp-gonetip`) and an in-flow `<p class="cp-gonehow">`. That is an existing, receipted pattern for "a number plus the honest sentence about what it measures".
- `App.svelte:54/100/350`: `DEV = new URLSearchParams(location.search).has('dev')`, with an honest empty state and a labelled DEV pool. Not a defect — a precedent for honest diagnostics.
- From the item-6 tool's own header (verified at `560b8364f`): `P_k ∝ p_k · exp(s·θ_k)` with **s = λ·passGap**; the shipped pack has λ = 0, so the Lab overrides λ to 1 off-pack; every arm plays the *same key* as baseline, giving paired differences with paired standard errors; and it is explicitly "A REPORT, not a gate."
- 14 NAV entries are all `show: true` with no 390 px nav rule (B4 still open; not re-pitched here).

---

## L1 — Paired what-if: compare two draft decisions on the *same* game (strongest)

**The idea.** The λ-axis tool's most transferable trick isn't λ — it's the **pairing**: every arm replays the identical game key against the identical baseline, so the difference is attributable to one changed input and carries a paired standard error. Give the shell a "compare this pick" action that does the same for a draft decision: freeze the seed (B1), freeze the schedule and opponent draws, change exactly one roster slot, and replay the affected games with the *same* keys. Show a small table: baseline vs alternative, per-stat delta, and a paired standard error — not a single noisy before/after number.

**Why it fits.** Today the board's gone-odds and next-pick advice are single-point estimates. Users read a delta from two unrelated runs as causation; the current unseeded RNG makes that literally impossible to reproduce. Pairing turns "what if I take him?" into an honest experiment, and the seed card (Slice 5) becomes the receipt that makes it replayable.

**Shape.** One derived comparison panel behind the board, computing from the engine view model; no new engine math, no new RNG site. Reuse the `method(oddsMeta)` in-flow sentence to say what the paired SE means. Cap the replay to the next N games so it stays fast offline. **Dependency:** B1 (URL seed) must land first; without it the pair is not reproducible and the feature should not ship. **Anti-goal:** do not present the SE as a win probability — it is measurement noise of the comparison, not a prediction.

## L2 — A read-only Lab panel, and no "team strength" slider until it is identifiable

**The idea.** Two coupled moves:
1. Surface the item-6 λ-axis *report* (and later the Ledger measurements) as a **read-only diagnostics panel** — a muted, clearly-labelled surface that shows what the engine measured and the method sentence underneath each number. Use the existing `cp-gonehow` in-flow pattern rather than inventing a new visual language.
2. **Do not** expose a user-facing "pass tilt / team strength" dial now. The tool's own finding is that `passGap` is one scalar applied to both offenses; a real team-strength λ needs per-offense gaps and a ratings track that does not exist yet. A slider today would let the user move a number that does not mean what its label says.

**Why it fits.** The report's discipline ("numbers NOT interpreted — the Architect reads") is a product virtue, not just a council formality. The shell's honest DEV empty state already shows the house style: label the limitation, don't hide it. A Lab panel carries that style to the engine's measurement layer and gives the Architect a home for results without turning them into a setting.

**Shape.** A new NAV entry gated behind `?dev` initially (no default-UI risk), reading a JSON the Architect publishes — but **through `port/seam.ts`**, as a view model, never by importing engine internals into a component. **Revisit trigger:** only when per-offense gap tracking exists; then a slider becomes discussable, with the frozen θ recorded beside λ as the normalization that makes the number meaningful.

## L3 — Self-verifying shareables: put the D1 lesson in the product's own export path

**The idea.** D1 was a manifest that named a file a host didn't have — a check caught it, but only because a seat wrote a one-off `md5sum -c`. Slice 5's "brag shareables + seed card" is the shell's own export/import path and will have the same failure class: a shared bundle that references a dataset, a seed or a season snapshot that the receiving build can't produce. Add a small **bundle manifest** (paths + sha256) written on export and **verified on import before render**, with an honest error state that names the missing item — the same discipline the item-6 receipts use, applied to the user's own artifacts.

**Why it fits.** The product is offline-hard (tent-in-the-woods test). An offline bundle that arrives incomplete is worse than one that refuses to open: the user can't tell partial sync from a corrupt save. A manifest makes the failure loud and specific. It also closes the loop on the Owner's §9.13/§9.14 ask at the *product* level: the council's `import-zip.sh` refusal is infrastructure; the shell's own import path deserves the same guarantee.

**Shape.** A `verifyBundle(manifest, files)` helper in `port/seam.ts`'s M1–M5 spirit (one door, plain JSON in/out), used by the shareable import and by the DEV dataset importer. No network, no CDN; sha256 in the browser via `crypto.subtle.digest`. **Relationship to B5:** B5 stamps provenance on data; L3 verifies integrity of a whole bundle. They compose; neither replaces the other. **Anti-goal:** don't turn this into a general save-file migration — the envelope/versioning contract is the Architect's.

## L4 — Show the save's lineage in the header (cheap, high-clarity)

**The idea.** `loadDraft` already receives `{ saveId, createdAt }` and `opts.keepWeek`. Render that lineage as a small, muted header line — "Loaded save <id> · <createdAt> · week kept" — using the existing note styling. Nothing new is computed or stored.

**Why it fits.** S29b exists because a boot rehydrate must keep the week autosave while a slot load must clear it. That is a real, subtle distinction the user currently cannot see; when something looks wrong, they have no way to tell which path ran. A one-line lineage display makes the state legible, costs almost nothing, and is honest — it reports what the code actually did rather than a reassuring status chip. It also gives L3's shared bundle a visible identity: the brace you share names the save it came from.

**Shape.** One derived line in `App.svelte` near the existing header note; no new state, no new storage key, no engine touch. Guard for absent lineage on a fresh boot (render nothing).

---

## Implications of this sitting (not ideas — consequences to keep in view)

- **I1 — D1 changes an Owner ruling's target.** My review (N1, `inbox/20261119-1816-pickle-P-287-…`) measured the manifest-named file on `council/pickle` with the exact md5 (`0a286953…`, 6,418 B) and the canonical c10 package at **49/49**, while the inkling/orcaink hosts are at 48/49. So the fix is a re-import into those two hosts, not a package re-cut or a "bytes are lost anywhere" claim. Any §9.13/§9.14 wording should say that.
- **I2 — receipts are a UX material, not just council overhead.** The item-6 package's value is that every number carries its command, hash and method sentence. The shell already does a small version of this (`cp-gonehow`). L2/L3 are the case for making that a consistent product rule: *every diagnostic number ships with the sentence that says what it measures.*
- **I3 — the shell is being asked to display measurements before the engine can fully identify them.** λ is confounded with θ from OVR-only data (open risk on P-342), and `passGap` is currently a single both-offenses scalar. Until those are settled, the shell's correct posture is "show the measurement, don't ship the dial" (L2). Building the dial first would create a user-facing promise the engine cannot keep, and unwinding it later is a re-pin plus a UX regression.

**Sequence if the Owner picks these up:** B1 (seed) → L1 (paired what-if), and independently L4 (one line) → L2 (read-only Lab behind `?dev`) → L3 (bundle verification with Slice 5). Every change stays behind `port/seam.ts`; no engine edits, no ratings, no product HTML by this seat.

**Not re-pitched:** B2/B3/B4/B5 from the 7th session remain open as filed; the 390 px nav, MVP source and accumulator-on-restore ideas are unchanged. The four rejected features, Nov 6 salary weights and v19 Madden weights stay dead. Multi-sport is post-v1.1.
