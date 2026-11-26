SPEAKER: porca | ROLE: council seat (advisor / brainstormer) | TASK: Owner's 2026-11-25 ask — fresh implications and ideas for the Cakepanz UI/UX shell over Claude's engine, after the Wave B folder | DATE: 2026-11-26T01:46Z
FOR: Owner 2026-11-25 task · next Cakepanz screen (seam neutrality P-368 context)
IDEA: advisory only — no product, engine, pin, governance, queue or tools bytes changed; no build, no mock-up, no assignment.

## 0. Grounding and non-duplication
Grounded in the published `zai-s17-continuation-2026-11-25` (commit `4850bb2d`, receipts in `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md`). I do **not** repeat N1–N7 from `inbox/20261125-0021-porca-cakepanz-shell-next-wave.md`, nor the earlier A–F set. Several N-items have now landed in code (the generated Seam Card + dev chip, number-provenance lines, domHooks/statusVM, the pace clamp, the cutover proof and claims index). What is new here is the gap the *Wave B failure* exposes: the shell's honesty surfaces are generated, but nothing binds them to the bytes they describe, and the product has no design language for "PARTIAL".

## 1. Implications (J — VERIFIED or INFERRED, labelled)

1. **J1 (VERIFIED). The Seam Card is a green lie at the delivered bytes.** `seam-card.json` says seal 385 / claims 31 / distHash `8144ae6c…`; the tree says seal 401 / 33 rows with 8 RED / distHash `3f053afd…`. Its pin `408410477` and canary `match` are correct, so the chip looks healthy while three numbers are stale. A generated card without a *byte latch* is worse than no card: it launders stale data through a trusted surface.
2. **J2 (VERIFIED). The failure is generation-order, not maths.** The 69-file engine fence against `408410477` is clean (`diff -rq` exit 0) and every one of the eight REDs is a stale generated surface or a missing receipt. Wave B's code landed after the last gate run and nothing forced a re-run. The lesson for the UI: generated truth has a *time axis*, and the user-facing surface should expose it.
3. **J3 (INFERRED). "PARTIAL" is a real product state with no shell vocabulary.** Z.ai's note calls Wave B honestly PARTIAL. Today the shell has dev-green / dev-red but no neutral, user-legible "this part is not verified yet" state. Under §3 (plain informative language) that state needs words, not just a console.
4. **J4 (VERIFIED). Offline is a promise without a receipt.** `battery:offline` is wired and `batteries/offline.battery.mjs` exists, but `deliveries/receipts/offline-tent.json` does not. Offline is a hard requirement (§2); an unverified promise should not be advertised as a feature.

## 2. Next-wave ideas (B — proposals, not accepted)

### B1. Byte-latched Seam Card (highest leverage; directly repairs J1)
Add one generated field `treeSha` to `seam-card.json`, computed over the same dist/content walk the gate uses. The dev chip compares it to the running build's embedded hash: equal → show the card; unequal or missing → render `UNKNOWN · generated before the last edit` with **no numeric fields at all**. Add a claim that the card's seal/claim-count/distHash must equal the live gate values, so the green chip cannot be manufactured independently of a green gate.
**Why new:** N1 proposed generating one card; B1 proposes that the card be *invalid by default* unless bound to the exact bytes on screen. **Guard:** no default-green fallback; missing field renders UNKNOWN; no hand-typed numbers; Svelte side is one `$derived` over generated JSON, no `document` access in `src/lib` (P-368).

### B2. An epistemic ladder for every displayed number (MEASURED → INTERIM → UNKNOWN)
Wave B already labels the heat-strip confidence `INTERIM` in prose. Promote that to one reusable chip state machine: MEASURED shows the number and its source; INTERIM shows **no numeric delta** and one sentence saying what is missing; UNKNOWN shows neither. Use it on pick confidence, wins estimates and gone% alike.
**Why new:** N2 was a provenance inspector (where a number came from); B2 is about whether a number is allowed to exist yet. It turns §7's no-invented-data rule into a visible design constraint. **Guard:** the state comes from VM metadata, never inferred by a component; `$derived.by` over immutable VM data only.

### B3. "Whose pick was that?" — agency rail in the draft feed
Wave B's takeover tint receipt covers 32 teams × 2 modes but is only an artifact. Render a subtle tint sliver on each draft-feed row plus one plain line from the VM ("user pick"/"CPU pick", named team), and let a tap filter the feed to one team's picks. The colour comes only from the Owner's 32-team table; the agency label comes only from the VM.
**Why new:** N4 was about deriving themes; B3 is about *attribution* — who made a decision — which is the question a first-time viewer asks at the draft board. **Guard:** never infer user-vs-CPU from a colour; reduced-motion drops the cross-fade, keeps the sliver.

### B4. Coach's tape as a three-frame story (with the raw dump still dev-gated)
Keep Wave B's dev-gated tape for diagnosis, but add an opt-in user story built from events already present in the VM: *call → matchup edge → turnover/game ball*. Three frames, plain language, every turnover named, overtime events only in the overtime block.
**Why new:** the tape currently exists as a gate artifact, not as an answer to "why did that drive go nowhere?" **Guard:** no invented causation — if the VM has no edge field for a frame, the frame says `UNKNOWN` rather than guessing; §3 wording rules apply verbatim.

### B5. Offline mode chip backed by the tent receipt (repairs J4)
On `file://` boot, show a quiet `Offline · no network used` only when `offline-tent.json`'s `distHash` equals the shipped dist hash and `externalRequests` is empty; otherwise show `Offline · unverified` and make no claim. Once the missing receipt exists, the chip becomes a factual product promise rather than a dev note.
**Why new:** N7 was a cutover proof page; B5 puts the single hardest requirement (offline) in the product where the user can see its evidence state. **Guard:** the shell itself makes zero external requests; no dev console required to read the state.

### B6. One decision rail, keyboard and screen-reader first
Wave B's `domHooks` / `statusVM` registry emits `data-status-phase` attributes. Build one focusable decision rail that consumes those hooks: arrow-key navigation across picks, a spoken one-line state per pick, and a reduced-motion heat strip. One registry owns all hooks; components do not invent their own `aria-*` labels.
**Why new:** earlier filings asked for keyboard/390px/touch contracts generically; B6 is specific to the *new* decision surface and uses the hook registry that only now exists. **Guard:** `$derived.by` over immutable VM arrays (side-effect free per the Svelte 5 docs); `prefersReducedMotion` from `svelte/motion` for the strip.

## 3. Ranking (my call, reversible)
1. **B1** — fixes a defect that is live in the shipped folder and protects the seam resource.
2. **B2 + B5** — honesty and offline are hard rules; both are cheap once B1's latch pattern exists.
3. **B3** — highest "show someone" value; depends on B2 for honest confidence text.
4. **B4** — good story surface, but only after the underlying receipts are regenerated.
5. **B6** — accessibility parity; should ride the same component pass as B3.

## 4. What I did not do
No code, no mock-up, no dependency, no build, no assignment. These are proposals for the human partner to react to; nothing is accepted until the Architect rules.

## 5. Question carried forward (unchanged, still open)
When you picture the next Cakepanz screen you'll actually show someone, what's the moment you wish it handled better?
