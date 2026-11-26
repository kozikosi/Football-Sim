SPEAKER: hy4 | ROLE: advisor (brainstorm, no assignments, no implementation) | TASK: implications of Wave A/B for cakepanz and the UI-UX shell over Claude's frozen engine | DATE: 2026-11-26T01:47Z

FOR: Owner, Claude (Architect), Z.ai, MUSE, council — advisory only. Nothing built, no engine byte, no pin, no law weakened. Extends `inbox/20261125-0020-hy4-cakepanz-s17-implications-and-ideas.md`.

## 0. What changed in the conversation
Wave A proved my last filing's mechanisms work: `freshness.json` + `acceptanceSha`, the sealed `receipt-attestation.json`, structured non-vacuity, generated state blocks, `statusVM` and `domHooks` are all real code, not proposals. Wave B then demonstrated the *operating* problem: those gates correctly went RED, but the close-out chain wasn't re-run, so the tree ships green prose over RED gates. The next idea is not more machinery — it is a rule that a sitting may not end with generated artifacts from an earlier byte state.

## Ranked ideas (shell-side; engine stays frozen at 408410477)

1. **Stale-pin immune laws — the big lesson of this sitting.** N26/N27 (node battery) and W1a (Wave B battery) all died because they pin an exact source string or an exact seal count that legitimate refactors/reseals move. This is the T2 "match the format the tool actually prints" class applied to *source literals and counts*. Fix: derive expectations from the artifact at generation time and store them in a signed contract re-pinned in the same commit as the refactor; better still, assert behavior through the store/`window.__cp` probe instead of literal text. A law that dies on a cosmetic edit is a law that will be ignored.

2. **Deterministic epoch for generated state blocks.** `gen-state-block.mjs` embeds `new Date()`, so a re-run at another second always drifts — `state-blocks-fresh` can never reach a stable fixed point by regeneration alone. Use `receipt-attestation.json`'s `log_sha256` or `tree_sha_end` as the epoch string instead of wall-clock time. Then "regenerate at final bytes" is reproducible, not a race.

3. **Close-out as one atomic commit.** The tree currently mixes Wave A sealed receipts with Wave B code. Rule: a sitting that changes any input to a generated artifact must run `gen-freshness → shell-status → gen-state-block → regen-manifest → gate-manifest → gate-numerals → verify-package → check-claims FULL` and commit the results together. Add a claim that every generated file's epoch equals the current tree hash. This is the operating fix for N2/N3.

4. **Whitelist inert URLs in the offline static law.** W4 flagged 16 Svelte error-code strings and the W3C XHTML namespace in `single.html` — inert text, never fetched. Keep the network-blocked tent as the authority; make the static law flag only URLs in fetchable positions (`href`, `src`, `url(`, `fetch(`). A gate that cries wolf on its own runtime's error messages teaches reviewers to ignore it.

5. **32-team contrast audit as a cutover gate (W8).** The Wave B tint pair degraded contrast for Arizona Cardinals — on the Owner's authoritative colour table. Fix that pair, then make the full 32-team × light/dark audit a named packaging claim with the three known holes named, so a new tint cannot regress silently.

6. **Make `domHooks` actually single-source (W3).** The registry exists but the board battery still inlines selectors. Add the new surfaces (`heatStrip`, `heatCell`, `confidence`, `stateOrigin`, `seamChip`, `statusChip`) to `SCENES`, have every driver import `HOOKS`, and keep a grep-law that fails on inlined core selectors. A registry that isn't used by the drivers is documentation, not a contract.

7. **Attest every generated artifact, not just the acceptance log.** `receipt-attestation.json` is the right pattern. Extend it to `freshness.json`, the state blocks, `SHELL-STATUS.md`, `seam-card.json` and the dist manifest: one small sealed file with `{log_sha256, tree_sha_end, generator_version, generated_at}`. Stale generated files then fail cryptographically rather than needing a per-file input list.

8. **statusVM precedence (N7).** Restore-empty drafts currently get `phase: 'fresh'` with a "Restored" label — the DOM hook and the visible text disagree. Check `restoredFrom` before `picks === 0`, or add a distinct `restored-empty` phase. This is a small, real UX bug in the newly landed theme #3.

9. **Provenance that a player can actually read.** Wave B extended the aria-labels with "— provenance in the tooltip" and the dev-gated `seam-card` chip. Keep the chip dev-only, but give the board row one visible "why this number" affordance sourced from `whyFor`/the seam card — the same text the autosave reason uses — so the Owner's "prove the number" ask is answerable in one tap without opening dev tools.

10. **Heat strip → play-call card (pfd-02 bridge).** Wave B #5 made the decision surface pure VM functions (`heatStrip`, `confidence`). That is the right foundation: clicking a heat cell should open the 2–3 candidate plans with their `planWhy` reasons as badges. Pure functions mean no new data and no engine change — the Owner's play-calling north star becomes a shell view over frozen truth. Post-v1.1, P3, no faces/scouting/GM.

11. **Seam golden as a live drift alarm (W6).** The contract golden currently holds no `boardVM` shape. Add it and promote the golden to a packaging claim: a re-pin or a port change that silently alters the VM then fails before the Owner's first draft, not at cutover.

12. **The tent is a portfolio artifact.** The offline tent (`battery:offline`) is the direct evidence for the Owner's "tent-in-the-woods" requirement. Once it runs at final bytes, put its receipt hash on `CUTOVER-PROOF.md` and the shareable card — offline is a promise to customers, not just a gate.

## Standing next steps (not mine)
Run the close-out chain at Wave B bytes (fix N1–N5 first), get one full composite at those bytes, then request a fresh independent Verifier. That Verifier must run at the final sealed bytes — Wave A's green receipts cannot certify Wave B's code. No engine/pin/dependency/governance change; no assignment; nothing built by me.
