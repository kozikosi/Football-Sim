SPEAKER: hy4orca | ROLE: advisor | TASK: implications + brainstorm — improving 67 Cakepanz / the UI-UX shell for Claude's engine, from the cakepanz-12 review | DATE: 2026-11-20T16:05Z
FOR: the Owner (direction) · the Architect (engine/shell seam rulings) · Z.ai (next sitting) · MUSE (cutover tracking)

IDEA set, highest leverage first. Each item is a proposal for the council to evaluate — none is a build instruction, and none edits a protected file.

## 0 · The implication that outranks the ideas: re-scope after the ring drop
The Architect's current tip `ee3b6e1db` NOW.md says "RING: DROPPED by Owner (20 Nov). Do not revisit before ship." Every ringed-one-click law in c12 (L16a, L18, L19, W11's quick-button step, F20, Contract B `rawSort`) is gated by `{#if suggest}` and will go dark when the ring goes. Before more hardening, get a one-line scope ruling: **does "ring dropped" mean the suggest highlight AND its one-click path are out of v1?** Recommended default: treat the confirm path as the shipped pick path and port the safety work there (idea 1); keep the ring code behind its flag, unowned, not deleted. Blocked meanwhile: nothing reversible — the package is already hosted; only the *next sitting's order* waits. Label: VERIFIED (doc line) + INFERRED (scope).

## 1 · One guarded commit path, with a store-level idempotency key
`DraftBoard.svelte` guards only `quickDraft`; the confirm button (line 84) can take two picks on a fast double activation (review F2). A 380 ms timer is UX polish, not correctness — a slow double-click (>380 ms) or two tabs still double-picks. Proposal: the shell calls a single `commitPick(id, slot, key)` where `key = ${draftId}:${pickNumber}:${playerId}`; the store refuses a duplicate key. The timer remains only for the toast. This makes "one interaction = one pick" a store invariant the engine can test without a browser.
- *Blast radius:* touches the store action contract (Architect's engine seam) — propose, do not build. The shell-side half (one `commitPick` for both buttons) is safe alone.
- *How to check:* node law that calls `commitPick` twice with the same key on the real store → roster grows by exactly one; plus board law L18b on the confirm button.
- Label: VERIFIED defect, INFERRED fix shape.

## 2 · "Never compute from a display string" as an enforceable law
Review F3: `suggestIds` regex-strips `BoardRowVM.wins` ("+3.3 wins") to recover a sort value, while the engine already holds raw `_w`/`_p`. Generalise: the seam should guarantee the VM carries typed raw values (`rawSort: number`) and a static battery law should **fail** if any `src/**/*.svelte` contains `replace(/[^0-9.\-]/g, …)` on a VM field or `parseFloat`/`Number(String(...))` of a formatted cell. This is the durable version of Contract B: it survives the ring being dropped and protects the next feature (advice, filters, rankings) from inheriting the same parse bug.
- *Blast radius:* one optional VM field (engine view) + one grep-based law; tiny, reversible.
- *How to check:* the law on current `src/` → red at line 60 today; after adding `rawSort` → green.
- Label: VERIFIED (field types + current parse).

## 3 · Freeze the slice-battery fixture so receipts become reproducible
Z.ai's own §5.2 finding is the single highest-value infrastructure fix: `slice1-battery.json` embeds run-variant random-draw detail, so a manifest-pinned md5 can never be regenerated — that is why T8 (four c10 hosts, 48/1/51/49) is BLOCKED. Proposal: give the slice battery a fixed `FIXTURE_SEED`, record `{fixtureSeed, enginePin, nodeVersion, utc}` inside the receipt, and add a law that two consecutive runs are **byte-identical**. Then any future package repair is `copy + verify`, not a treasure hunt through 14 branch tips.
- *Blast radius:* battery tooling only; no product or engine bytes.
- *How to check:* run the battery twice → `sha256(slice1-battery.json)` equal; then the repair-file md5 can be reproduced and T8 unblocks.
- Label: VERIFIED (run-variance demonstrated by Z.ai with "Mahomes vs Purdy" at identical bytes); ENDORSED.

## 4 · Receipts must name the artifact they certify
Review F4: the T4 proof was run on a 41-entry tree while the shipped manifest has 36 entries. Mechanism proved, provenance broken. Proposal: every receipt embedded in a sitting zip prints the sha256 of the manifest/file it verifies, the file count, and the Node version — and `verify-package.mjs` gains a mode that checks a receipt's self-declared digest against the actual `CHECKSUMS.txt`. A receipt that cannot name its artifact is labelled REPORTED, never VERIFIED. Cheap, and it permanently kills "verified against a different tree".
- *How to check:* run the new mode on this zip → it must flag the current `t4-verify-package-proof.log` as mismatched (36 vs 41), then pass after regeneration.
- Label: VERIFIED gap.

## 5 · A shareable replay envelope, not just a human stamp
`shareable.ts` now mints `b36:` codes and writes `?seed=` to the URL — good. The brag card's stamp is still prose. Proposal: each generated card carries a tiny machine-readable block, e.g. `<script type="application/json" id="replay">{"seed":5288417,"code":"b36:35ckh","engine":"<pin>","flex":"<pin>","v":1}</script>`. Then a shared card can be dropped onto the shell (`?seed=` from the card) and re-run identically once idea 3 lands; a law round-trips card → parse → same seed + pins. This turns shareables from a screenshot into a replayable, verifiable artifact — the natural payoff of the seed work.
- *Blast radius:* `shareable.ts` only (port, node-testable); no engine change.
- *How to check:* node law over all five card stages; W10-style round-trip against the real module.
- Label: INFERRED design, low risk.

## 6 · Accessibility beyond the focus target: a persistent "what just happened"
The `role=status` toast auto-hides at 2.6 s; with the confirm path as the shipped path, the Undo affordance vanishes quickly and a screen-reader announcement may be missed or re-announced on re-render. Proposal: keep a small, dismissible "Recent picks" list (last 3, with Undo on each) instead of a vanishing toast; keep the live region for the announcement but make the list the durable source. Also addresses review F7 by using explicit hidden text rather than `aria-label` on generic spans.
- *Blast radius:* shell only (`DraftBoard.svelte` + one CSS block); law: after three picks, three undo controls exist and each reverses the right pick.
- Label: INFERRED (not screen-reader tested) — validate with the a11y seat before landing.

## 7 · A cutover-parity matrix as a one-page artefact
The Architect's NOW.md names the cutover gap: "re-sync snapshot to colors/src head (11 files differ), UI slices 3–5". Cakepanz work lands on `67-cakepanz`, not `colors/`, so a receipted slice can still be invisible to the cutover bar. Proposal: a tiny `SHELL-PARITY.md` matrix — slice × implemented-on-cakepanz × receipt × present-in-colors × in-the-hosted-build — maintained by whoever lands each slice. It makes the difference between "built and receipted" (C25 correction #2) and "ships" explicit, and stops the council spending a sitting on a feature the cutover does not consume. No product bytes; a documentation convention for MUSE/the Architect to accept or ignore.
- Label: INFERRED process idea.

## 8 · Keep the advice channel typed (a future envelope, not a vote to build)
Reaffirming my earlier c11 ideas note: when suggestions return (only on a new Owner ruling), the engine should emit `{playerId, slot, wins, reason, code}` objects and the shell should render them — never parse a formatted cell. This is the same invariant as idea 2, applied to advice rather than sorting, and it is the clean way to reintroduce a one-click path without resurrecting F2/F3. Explicitly **not** a request to build Contract A or the ring now.
- Label: INFERRED / future.

## Cross-cutting note on labels
Ideas 0–4 are conclusions I can support with commands (see the companion review `inbox/20261120-1604-hy4orca-cakepanz12-review.md`); ideas 5–8 are design proposals and are marked INFERRED. None of them changes a protected constant, an engine pin, or the product file.

— hy4orca (advisor)
