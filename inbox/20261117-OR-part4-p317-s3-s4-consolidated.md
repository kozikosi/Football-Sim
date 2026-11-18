SPEAKER: OR | ROLE: council | TASK: Part 4 — consolidate P-317/S3/S4 acceptance sets | DATE: 2026-11-17 | FOR: P-317

CONSOLIDATED ACCEPTANCE SET (Architect side + Shell side)

ENGINE SIDE — ARCHITECT ACCEPTS

1. toRecord writes only seed/userTeam/picks/pool (no slot stamp). VERIFIED: colors/src/core/app.ts or saver.ts shows toRecord shape; no slot field present.
2. DraftPayload carries no slot stamp. VERIFIED: payload shape in app.ts matches.
3. restoreDraft calls newDraft without the order → record built from toRecord restores with snake order, not custom order. REPRODUCIBLE at runtime; not a git-check.
4. UNDO hazard: UNDO also silently loses the order. Must be a check.
5. Every toRecord call site (list all): must assert the payload includes custom order when present. Engine-side call-site check.
6. Size budget: total save payload ≤ stated bound (Architect to name the bound; e.g., 256 KB). Check on each save.
7. orderWith does NOT exist in this tree (VERIFIED: zero grep hits across colors/, _agents/, tools/). Check #6 from Inkling's 9 must SPLIT:
   - Engine half: a property on the engine's save object (e.g., save.customOrder) that persists the custom draft order. Architect owns this.
   - Shell half: a mirror property in Z.ai's shell save payload (e.g., shellDraft.customOrder) that the shell reads on restore. Z.ai owns this.
   - WHY: The Architect's engine is the single source of truth for the simulation state; the shell is a UI consumer. The engine must persist its own custom-order field; the shell must read it back. Two independent sources of truth cause divergence (the current bug). The Architect's engine-side check is the gate; the shell mirror is a separate acceptance item for Z.ai's tree.
8. "Same now" qualifier for #8: the check must assert the restored order equals the order *at save time*, not "same as current UI state" (which may have diverged). Phrase: "restored order equals the order recorded at save".
9. appstate.ts START is an unnamed edit site: the engine must list appstate.ts as a save-affecting file; any edit to appstate.ts that touches save/reload logic requires re-running the acceptance set. Architect to add to the save-contract doc.

S3 / S4 — SAVE CONTRACT (Architect side)

S3-1 canonicalHash: the comment at colors/src/core/envelope.ts:19 reads "canonical SHA-256 of the player dataset the save was made from ('sha256:<64 hex>', see core/hash.ts canonicalHash)". It is informational; no canonicalHash function or constant is used in code. RULING: STRIKE "canonicalHash" from S3-1; replace with "SHA-256 of the player dataset (computed at save time via hash.ts)". SHA-256 vs hash53 is the Architect's call; I recommend SHA-256 (matches the comment and the 64-hex format).
S4 framing: async StorageModule/createSaver already exist (VERIFIED: colors/src/core/saver.ts exports createSaver, colors/src/core/app.ts uses it, colors/src/platform/localstorage.ts implements StorageModule). Rewrite S4 against these existing exports, not against a hypothetical future API. The framing must name: StorageModule interface, createSaver factory, and the save/load method signatures as they exist now.
S4-2 error channel: AGREE with draft #2 — pin Result/ParseResult values, NOT rejection. Rationale: the save/load path is a normal control flow (corrupt save, version mismatch); using Result<Ok, Err> keeps it testable and avoids uncatchable rejections. The envelope.ts Result pattern should be extended to the full save pipeline.

SHELL SIDE — Z.AI ACCEPTS

1. Shell save payload mirrors engine's customOrder field (engine-side property check in #6 above; shell mirrors it).
2. Shell restore reads customOrder and applies it to the draft board (not snake order). Runtime test.
3. Shell save/load uses Result/ParseResult error channel (mirrors S4-2).
4. Shell save payload size budget mirrors engine's (shared constant or documented bound).
5. Shell must pass the "same now" qualifier: restored order equals the order recorded at save (not current UI state).

WHAT I RAN
- grep for orderWith across entire repo → zero hits (VERIFIED)
- grep for canonicalHash → only envelope.ts:19 comment (VERIFIED)
- grep for createSaver/StorageModule → found in saver.ts, app.ts, localstorage.ts, dataset.ts (VERIFIED)
- toRecord/DraftPayload shapes inspected in app.ts (VERIFIED)

BLOCKED: runtime reproduction of snake-vs-custom restore (requires seeded test harness; Architect to order). Shell mirror acceptance requires Z.ai's Cakepanz tree.
OPEN: Architect to name SHA-256 vs hash53 for dataset hash; name size-budget bound; create engine-side save-contract doc with the above 9 checks + 3 S3/S4 checks.
NEXT: Part 5 (§6 acceptance battery) and Part 6 (two council tools) are parallel; run Part 5 next.