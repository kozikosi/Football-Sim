# Z.ai's contract review — architect/engine-and-seats @ 551af1b (the Colors rebuild contracts)

**From:** Z.ai, High Councillor, executor seat · **Date:** 2026-11-05 (w73) · **Scope:** every type in `core/app.ts`, `core/envelope.ts`, `core/saver.ts`, `core/hash.ts`, `core/keys.ts`, `sports/nfl/app/appstate.ts`, `sports/nfl/app/saves.ts`, `sports/nfl/app/store.ts`, `sports/nfl/app/versions.ts`, read in full this session.
**Question answered:** is anything ambiguous, unbuildable, or inconsistent with my w72 answers (ADR-1..12)? Verdict up front: **buildable — I can start the N1 drafts.** Twelve findings below: two structural, five real gaps, five small. None blocks the Draft Board slice. The envelope stays a moving target until Kosi's three discrepancies come back ruled.

## What is right (verified against my w72 answers)

| Contract | My w72 position | Status |
|---|---|---|
| `StorageModule` async-native, localStorage impl completes inside the call | ADR-4: sync dispatch + async storage, pagehide flush reliable, write ≈ 2 ms measured | ✓ matches |
| `Saver` strict FIFO per slot, newest-wins, stale-revision drop, bounded retry, `settled()` | ADR-4's race design, near clause for clause | ✓ matches |
| `envelope.saveRevision` integer ≥ 1, never decreases even on undo | my §2 revision law | ✓ matches |
| `parseEnvelope` 'newer-version' never overwritten; forward-only migration | ADR-2/legacy ruling (no migration, old saves orphaned by design) | ✓ matches |
| `hash.ts` canonical SHA-256 (NFC, trim, sorted by id, schema marker) | my §2 datasetHash canonicalization spec, almost word for word | ✓ matches |
| `run` in week/season payloads only; never touches the game stream | my §1 runCounter definition | ✓ matches |
| `RUN_IT_BACK` mints a new saveId (new lineage), `run + 1`, same roster | my §9 envelope field split | ✓ matches |
| Undo = cut the pick log, draft only | Kosi's ruling, E4's "cut the log back to just before the user's last pick" | ✓ matches |
| `PlanState { offense; defense; note? }` typed | my §6 flagged the `Record<string, unknown>` hole | ✓ closed |
| Keys: one scheme `sim:` / `sim:<sport>:`; shell's `zpb:*` moved once by legacy.ts | my §2 namespace; VL's w67 audit proved the shell values are already envelope-shaped | ✓ rename-safe |
| No network anywhere in core; all I/O behind modules | my ADR-5 offline/SW plan rides on top unchanged | ✓ no conflict |

## Findings

### F1 · Two AppState/Action unions live in the same tree (structural)
`store.ts` declares its own local `AppState`/`Action` (draft-era: START/PICK/UNDO/LOAD) while `appstate.ts` declares the full app-wide pair (BOOT/LOAD/SAVE/season flow/NAVIGATE). Same type names, different shapes, one directory. The appstate comment says "reducers live next to the store" — but the store has its own. When the Team Select / Season / Standings view models land, a reader cannot tell which pair is the law. **Ask:** retire or rename the store.ts pair (e.g. `DraftStoreState`) and state in one line that `appstate.ts` is the only AppState. Otherwise the slice gets built against the wrong one.

### F2 · The season review has no payload home for its data (real gap)
`WeekPayload` carries `ratings` (team ratings, engine-opaque), `scores`, `schedule` — but no player stat book, no awards, no unit grades. `SeasonPayload` prunes to table/userResults/champion/userOutcome. My season review page — the Unit Report Card, the stats tabs, the awards, and the new w73 Fix-It Board (worst rooms, worst contributor seasons) — is built on a per-player season stat book keyed `team|name` (gp, st, `_rating`, `_rank`) plus `unitRatings`/`unitRanks`/`league`. None of that has a field in any payload. Either the summary screen of the rebuild accepts being thinner than the shell's review, or a `stats` structure joins the season/week payloads before the summary slice. **Ask Claude to rule which.** (The Fix-It Board's inputs, for the record: unit OVR vs league per unit, unit rank, per-player OVR + season `_rating`, contributor floor ~40 % of games.)

### F3 · StorageModule cannot enumerate keys (real gap for my lane)
`read/write/remove` only. The legacy one-time move (`zpb:*` → `sim:*`) and my storage dump harness both need listing. Either legacy.ts is allowed to touch `localStorage` directly for the move (breaking the seam for one migration), or StorageModule grows `keys(prefix)` / `entries(prefix)`. **Ask:** add the enumerate method now — it is one line pre-ship and impossible to add cleanly once implementations exist.

### F4 · `notice.kind: 'dataset-changed'` has no producing action (real gap)
LOAD_FAILED's union is `'corrupt' | 'newer-version' | 'storage-unavailable'` — no dataset path, and no action in the union can set a 'dataset-changed' notice. The drift detection exists (`versions.ts` Drift) but the state machine cannot express the result. **Ask:** either a `BOOT_DRIFT` action or drop the kind until it exists.

### F5 · Resume determinism is build-scoped — say it in the docs (spec gap)
E4's resume replays logged picks and draws only un-happened picks from seed forks — but the CPU draw runs through the CURRENT engine's fit/role tables (`roleOf`, FLEX, slots). `engineVersion` is declared "informational on resume; never blocks". So a save resumed on a later build with changed tables diverges from the uninterrupted run of the old build. Within one build the proof holds (Claude's every-week-cut test). **Ask:** one sentence in the docs — "resume determinism holds within the build that wrote the save; across builds, logged picks hold and un-made picks may differ" — or freeze the role table bytes per save. I prefer the sentence.

### F6 · SaveStatus is global; the saver tracks per key (small)
Three slots share one `SaveStatus`; a failed slot-C write lights a chip that cannot say which slot. `notice` carries `slot`, `SaveStatus` does not. **Ask:** add `slot` to the failed/saving variants, or document global-on-purpose.

### F7 · `WeekPayload.plan` is `Record<string, unknown> | null` while `AppState.plan` is `PlanState | null` (small)
The typed PlanState exists but the payload does not use it. One import fixes the drift.

### F8 · Envelope slot ↔ storage key agreement is unchecked (small)
`saver.enqueue(key, …)` accepts any key; an A-slot envelope could land under the slot-B key. One assertion in the save service (envelope.slot === slotOf(key)) closes it forever.

### F9 · `retriable` is always true today (small)
The failed variant carries `retriable: boolean` but every failure sets true. Fine for v1 — note it so quota-class failures (non-retriable) have somewhere to land later.

### F10 · `ui.boardSort: string` while every sibling is a union (small)
One-line consistency nit.

### F11 · The bundled-default dataset contradicts the Owner's real-names ruling (open — flagged upstream already)
`DatasetLoader`'s default is "the bundled fictional seeded league"; Kosi has ruled real names and real teams with non-EA ratings as the public default. The fallback needs a ruling: independently generated real-name ratings, or fictional-with-warning. Not mine to close; it rides the council ask.

### F12 · Envelope discrepancies (saveId/createdAt shipped now; no datasetId; SHA-256 over cyrb53) — awaiting Kosi
Already posed back to Claude by the Owner. My seat's technical note while it is open: the SHA-256 path is async (Web Crypto) — computed once at dataset load, kept in state, never inside a reducer; that is exactly how my w72 §2 specced it, so the swap is safe where cyrb53 was sync. Do not build the sync/export UI against the envelope until the ruling lands.

## N1 verdict
The contracts are clean enough to document. **I am clear to start the N1 drafts this cycle** — the exhibit records how the council works (intake → law → build → proof), not the envelope's final field list, so none of the open flags gate it.
