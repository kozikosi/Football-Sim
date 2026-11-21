SPEAKER: porca | ROLE: advisor | TASK: implications + innovation for Cakepanz and the UI/UX shell around Claude's engine, informed by Z.ai's S14 delivery | DATE: 2026-11-20T23:48Z
FOR: (no queue item — Owner's brainstorm request; MUSE may queue any of these)
IDEA: a ranked shortlist that EXTENDS `inbox/20261120-2003-porca-IDEA-cakepanz-s13-implications.md` and `inbox/20261120-1615-porca-IDEA-cakepanz-shell-leverage.md`. Those two lists are not repeated here. Nothing in this file is a build request, a ruling, or an edit to anyone's product; I am an advisor.

**What S14 changed, in one paragraph (my read).** The three defects the council named after S13 were attacked: the shareable-link/autosave collision now has W14 + a real-browser probe, the two evidence overclaims ("END-TO-END composite", "F20 FAIL L13 literal") were rewritten and child logs were shipped, and the ring came back pin-safe with a scoped no-display-parse law (L24), a paired INTERIM tie path, a persisted `suggestIds[]` (L25), the w89 glow (L23), and a BLOCKED §5 proposal for the one engine half (`rawSort`) that only the Architect can land. That is real progress. It also creates four NEW structural debts, listed below in priority order.

## 1. Decide `rawSort` before cutover — the correctness debt is now a scheduled one

The tie extension and the L13 oracle are deliberately display-rounded and labelled `INTERIM — display-rounded, awaiting rawSort`. The exact paired diff is already filed (`inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md`, labelled BLOCKED). The risk is not the code, it is the *decision*: if the Architect rules at cutover under time pressure, the paired landing has to happen while the gate is being run. Recommendation (my call, not the Owner's): rule `rawSort` **before** the cutover gate starts, land the pair, widen L24 from "primary" to the blanket wording, and re-falsify F24/F13→F20 in the same sitting. If the ruling is NO, then cutover acceptance must say in plain words that tie ordering is display-rounded, so nobody later discovers it in a draft. Either outcome is fine; an undecided INTERIM at cutover is not.

## 2. A state-precedence matrix for boot, not one law per incident

W14 fixes "explicit seed B beats a different autosave" and keeps the load-bearing same-seed exception. That is one row of a state machine. The tree already carries three save-state shots (`shots/saves-states-corrupt-A.png`, `saves-states-newer-B.png`, `saves-states-older-C.png`). Proposal: one small `BOOT-STATES.md` table — explicit seed present/absent × autosave absent/same seed/different seed/corrupt/newer schema — with the expected action for each (restore / refuse / keep URL / notice / migrate), and one visual-battery law per row named after the row. The naive `if (has seed) return` mutant (F23-w14) is exactly the failure a table prevents: it passes the single case and breaks W9. Cost: one doc + a few laws; no engine bytes.

## 3. Version the shell-owned extension inside the engine envelope

`suggestIds[]` now rides in the autosave. Z.ai verified `parseRecord` rebuilds known fields and ignores extras, so the engine stays clean — but that also means the extension has no schema or version. If the shell later changes its shape (e.g. stores reasons or a raw-sort snapshot), an older autosave will silently lose the ring, or a newer one will be handed to an older shell. Proposal: a shell envelope version field beside the engine record, a migration function, and a law that a save with no/unknown `suggestIds` still boots and shows an honest empty ring. This is the offline portability requirement (play on device A, continue on B) applied to a real field instead of a hypothetical one.

## 4. Make the composite resumable and the handoff counts generated

Two sittings in a row (S13, S14) shipped a PARTIAL composite and promised the tail "next sitting". S14's own `START-OF-CHAT-ZAI.md` §2 says the next sitting's FIRST command is `bash scripts/acceptance-run.sh`; that is a hope, not a mechanism. Proposal: `acceptance-run.sh` writes a machine-readable step ledger (`step, command, sha256_of_tree_at_step, exit_code, stdout_sha`) and can resume from the last green step; `scripts/package-delivery.sh` REFUSES to zip unless every step 1–17 is green at the same tree hash. That closes the "prose outran artifact" class permanently instead of correcting it one paragraph per sitting.

A concrete instance, VERIFIED by me this sitting: the cutover handoff is internally stale. `deliverables/CUTOVER-CHECKLIST.md` says "Every number below is VERIFIED this sitting at the final bytes" while its Gate B table still carries S13 numbers (board **16/0**, visual **17/0**); `deliverables/CUTOVER-ONE-PAGER.md:31,33` still tells the reader to expect **16/0** and **17/0**. The README and START doc correctly say board **19/0**, visual **18/0**. A person following the handoff sheet rather than the README would judge a correct tree as broken. Generating these tables from the receipts (idea 4) removes the whole class. I filed this as a review finding rather than fixing it — it is Z.ai's file.

## 5. Small user-facing moves now that P0 is out of the way

- **Copy / paste the draft link.** The `b36:` code and URL round-trip are proven (W10/N35), and the collision is fixed. A "Copy draft link" button and a paste-a-code home input are now safe to expose; they were previously the viral loop with a broken front door. Both were P3 in S14's order; I would promote paste-a-code first because it needs no new law (W9/W10/W14 already cover it).
- **Persistent Undo for one-click draft.** The ringed-row draft commits immediately with a 2.6 s Undo. On a phone that is a mis-tap with a vanishing escape hatch. Keep the one-tap speed, add a small always-visible undo chip until the next pick lands.
- **Glow fallback and a contrast receipt.** The glow rides `color-mix(--goldm 28%)` and a reduced-motion guard (L23). `color-mix` is modern-browser only; offline use on an older device would lose the effect, not the function. Add an `@supports` fallback to a flat token and a contrast measurement for the glowing state (the delivered contrast battery is 2/0 at the static tokens). This is a legibility guard, not a restyle.

## 6. The pin-string drift gate

The handoff pins `408410477` and proves it byte-for-byte, but the governance docs in `council/muse` still carry five stale `d3bd81d2` lines (`AGENTS.md:44,45,46,73`; `PROJECT-KNOWLEDGE.md:18`). That mismatch already cost this round review time. Proposal: one check in the cutover gate that reads the pin string from the governance docs and fails if it differs from the pin proven by the tree. MUSE owns those files; I only propose the check.

## Ruled out (unchanged guardrails)

No engine edits, no pin moves, no ratings generation, no basketball, no product-file writes by me. No new candidate build or dated root copy. No re-pitch of the four rejected features. I did not re-run browser/node/engine batteries (no `node_modules` in the relay tree); the gate numbers above are labelled by what I ran versus what the receipts report in the accompanying review.

## One question that would re-rank this list

Is the shell's next bottleneck the correctness/decision path (items 1–4) or the player-facing phone experience (item 5)? I have ordered it on the correctness hypothesis because S14's own evidence still shows a partial composite and a stale handoff sheet; if the Owner says the phone board is what actually hurts, move item 5 to the top and defer 2–4. That is my call, not a ruling attributed to him.

## Superseding correction (2026-11-20T23:59Z, filed by this seat)

Item 1 ("decide `rawSort` before cutover") is superseded: with the ring removed by the Owner's 22:30Z ruling (hy4 `20261120-2230-hy4-OWNER-RULING-ring-removed-cloudflare.md`, pickle `20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md`), `rawSort` has no subject and should be WITHDRAWN, not decided. Items that existed only to support the ring (the state-precedence matrix's ring rows, the `suggestIds[]` envelope version, the persistent-Undo ring chip, the glow fallback) are re-scoped or dropped accordingly; the P0 intent-precedence idea and the pin-string drift gate survive. The re-ranking question above is unchanged. Full cross-seat review: `inbox/20261120-2359-porca-review-of-seats-s14.md`.

## Second superseding correction (2026-11-21T00:26Z, filed by this seat)

The Owner's later answers (pickle `inbox/20261121-0018-pickle-OWNER-RULINGS-top-three-stays-why-copy-stays.md`, `622b70a`) refine the withdrawal above: the top-three highlight **stays**, in the Draft button like w89, with a separate "top" badge and the top-3 why copy kept; only the ring visual is gone. Item 1 therefore becomes "Architect to rule `rawSort` for exact top-three ordering" (REOPENED, not withdrawn), and the top-3-scoped reasons are a kept feature, not a dropped one. See `inbox/20261121-0026-porca-REVIEW-architect-dfdb887.md`.
