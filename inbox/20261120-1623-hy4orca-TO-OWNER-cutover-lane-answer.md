SPEAKER: hy4orca | ROLE: advisor | TASK: how to answer Claude's "re-sync or UI slices?" — the merge lane | DATE: 2026-11-20T16:23Z
FOR: the Owner (copy-paste reply below) · Architect · Z.ai · MUSE (record)

## Playback of what I heard
You want Claude to own the merge and the engine, Z.ai to finish the UI slices, and cutover to be the only gate. Nothing else (multisport, ring, historical alignment, council process) gets time before 76 Pancakes ships. Claude asked a binary question that assumes two jobs are his. Both halves of that question are wrong on the facts — I verified this, not just read it.

## The facts that decide the answer (VERIFIED by me this session)
- `git diff --stat 408410477 ee3b6e1 -- colors/src` → **empty**. The engine is already at Z.ai's pin; commits since are a test nit, a tests-only patch and react removal. **There is no re-sync for Claude to do.**
- `colors/` contains **0 `.svelte` files**. The UI is Z.ai's cakepanz tree (10 components on gh-pages). The cutover is a **merge of that UI into `colors/`**, not a UI build by Claude.
- gh-pages cakepanz has **57** engine files vs **69** in `colors/` — the "11 files behind" is the *deployed* tree. Z.ai's c12 delivery reconstructs the 69-file engine, so **landing c12 closes it**. That is Z.ai's deploy, not Claude's re-sync.
- `dispatchAsync` already exists at `colors/src/sports/nfl/app/store.ts:147`, with the serialisation contract documented at :142–150. Claude's job is to publish that contract, not build it.
- Engine green is already claimed by Claude and corroborated by Pickle/Ernie (430/430, tsc 89/89, CI gates, react gone). Cutover is the gate; the engine side is done.

## Copy-paste reply to Claude

> Neither. That's a false choice, and I checked both halves.
>
> The re-sync is a no-op: `git diff 408410477 ee3b6e1 -- colors/src` is empty — your engine is already byte-identical to Z.ai's pin, and the commits since are a test nit, a tests-only patch and react removal. The "11 files behind" is the deployed gh-pages cakepanz (57 engine files vs your 69); Z.ai's c12 delivery reconstructs the 69-file engine, so landing c12 closes it. That's Z.ai's deploy. And the UI slices aren't yours — `colors/` has zero Svelte files; the UI lives in the cakepanz tree, and cutover is a merge of that UI into `colors/`, not a UI build by you.
>
> Start on the merge you own:
> 1. Write the cutover runbook: how Z.ai's `src/lib`, `App.svelte` and build config land in `colors/`; the engine stays single-sourced at `colors/src` and cakepanz's engine copy is deleted; the exact gates (engine 430/430, tsc 89, board/slot/visual batteries, 390 px, no console errors); the rollback; and the **exact Z.ai commit hash you merge** — a merge from a moving tree isn't a gate.
> 2. Publish the contract Z.ai builds slices 3–5 against: the `dispatchAsync` signature (`store.ts:147`, `(action) => Promise<DraftStoreState>`, serialised) with the exact shell calls that move from `dispatch` to `dispatchAsync`, plus the seam exports (`boardVM`, `goneOdds`, `lineupFor`, `fit`, `SLOTS`, the ValueProvider/S1 shape). Freeze it so he builds against a stable API.
> 3. Change nothing on gh-pages, build no UI, push only your branch.
>
> Fold the council's c12 corrections into the runbook as **pre-merge gates** — do not fix them yourself, they ride Z.ai's delta: correct the README's "13b CLOSED" line (it is OPEN); write the resolved seed back to the URL on draft restore; add the verifier's converse check (an unlisted file currently verifies clean); guard the confirm button against double activation; replace the focusable `<span>` with a real button. The T8 repair bytes are on disk (6,418 B / md5 `0a2869…`) — Z.ai can land them now; nothing is blocked.
>
> You were right on: multisport parked, react gone, CI gates, the tests-only re-point, Q7 logged, NOW trimmed, ring dropped. The one lane error in your note was "cutover needs building the remaining UI slices" — the UI is Z.ai's; your cutover is the merge, and it waits on his slices 3–5, not on UI work from you.

## Addendum to Z.ai (send alongside)
Finish slices 3–5 against pin `408410477` and get slice 3's acceptance review, not just its build; apply the Architect's gh-pages test re-point (277/286 → 286/286, already VERIFIED); land c12 with the exact repair bytes and the README correction; retire w89 at make-live. Keep the engine copy byte-identical to the pin until Claude merges, and report the commit hash of the tree he should take.

## Why this is the right split (brainstorm, not just process)
- **Two moving parts, one freeze point.** Z.ai's UI keeps moving while Claude writes the runbook. Naming the merged commit is what turns "merge when ready" into a testable gate; without it the runbook certifies a tree that no longer exists.
- **The contract is the handoff artifact.** Claude cannot merge a shell that calls a half-defined async API. Publishing `dispatchAsync` + the seam exports first lets Z.ai build slices 3–5 in parallel instead of waiting for the merge — this is the only genuine parallelism left before cutover.
- **Don't let verification theater become the gate.** The council round found six ways the c12 proofs can lie (stale receipt tree, no converse check, vacuous law, source-string law, "13b CLOSED", ring laws for a dropped ring). Put those in the runbook as gates on *Z.ai's* delta, so Claude's merge certifies behaviour rather than inheriting someone else's green.
- **Keep the irreversible action explicit.** Claude must not touch gh-pages or make a wave live; the Owner/Z.ai do that at cutover. The reply says so.

## The one thing I'd ask you
When the runbook's gates are all green, does Claude flip make-live himself, or does he stop and wait for your word? I've written the reply assuming he waits — tell me if you want that line changed.

— hy4orca (advisor; no product/governance edits)
