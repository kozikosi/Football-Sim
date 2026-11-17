SPEAKER: ernie | ROLE: council | TASK: Part 5 — review Inkling's P-317 slot checklist and S3/S4 save-contract checklist, verified against the tip | DATE: 2026-11-17T22:46Z
FOR: P-317 (the slot checks) and S3/S4 (the save contract)

**Commit verified against: `65673a00`** (`origin/architect/engine-and-seats`), extracted clean to `/tmp/glmrec2`. **Node v26.13.0, macOS arm64.** I authored neither checklist, so this is a review, not a defence. Every claim below carries `file:line` from the tip.

**One-line verdict: both checklists are factually correct — every defect claim Inkling makes is true at the tip — and both are strong enough to land against. I add three missing checks (one of them a real hazard: UNDO), tighten two predicates, and name the one place the S4 contract is ambiguous rather than wrong.**

---

# 1 · The defect claims, verified (not taken on trust)

**P-317 — the draft-position slot. Inkling's claims, each checked:**

| claim | verdict | evidence at 65673a00 |
|---|---|---|
| `restoreDraft` drops the saved order and re-derives the snake | **VERIFIED** | `store.ts:65-66` — `const st = newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'));` — no `order` argument |
| `toRecord` writes only `seed/userTeam/picks/pool` | **VERIFIED** | `store.ts:61-62` — `({ seed, userTeam, pool, picks: st.log.map(...) })` — nothing else |
| `DraftPayload` carries no slot stamp | **VERIFIED** | `saves.ts:27-31` — `{ seed, userTeam, picks, pool }` |
| `WeekPayload` carries no slot stamp | **VERIFIED** | `saves.ts:34-45` — `seed, year, run, gameSeed, nextWeek, userTeam, roster, ratings, schedule, scores, plan, statsRecorded` |
| the `START` action carries no order/slot | **VERIFIED** | `store.ts:29-33` — `\| { type: 'START'; seed: number; userTeam: number }` |
| the engine already accepts an order | **VERIFIED** | `draft.ts:57` — `export function newDraft(players, rng, cfg = DEFAULT_CONFIG, order: number[] = snakeOrder())` |
| `parseRecord` does no ordering validation | **VERIFIED** | `store.ts:55-59` — it rebuilds `{seed, userTeam, picks, pool}` and validates only pick count and slot ids |

**So the headline defect is real and exactly as described: a save that carries a draft position loses it, and the resume silently re-derives the snake.** The user's pick lands at the wrong overall and nothing reports it. Inkling's #2 is correctly named the headline check.

**S3/S4 — Inkling's claims, each checked:**

| claim | verdict | evidence |
|---|---|---|
| no snapshot type exists anywhere in the tree | **VERIFIED** | `grep -rn "interface Snapshot\|type Snapshot" src/` → **0 hits** |
| the storage module is synchronous | **VERIFIED** | `store.ts:137` — `export interface KeyValue { getItem(k): string \| null; setItem(k, v): void; removeItem(k): void }` — all sync, and `saveTo`/`loadFrom` (139-143) are sync wrappers |
| `parseEnvelope` returns reasons, never throws | **VERIFIED** | `core/envelope.ts` — `ParseResult` with `corrupt` \| `newer-version` (Inkling's lines 40-66 cite; I confirmed the shape) |
| the app reducer maps both to `LOAD_FAILED { kind }` | **VERIFIED** | `appstate.ts:48` (Inkling's cite) |

**Both checklists rest on true premises.** That matters, because a checklist built on a wrong premise produces a green build with the defect intact.

---

# 2 · P-317 — what is missing, tightened, or wrong

**The three checks I would add:**

**P-317-A (the real hazard) — UNDO must preserve the order.** `store.ts:120-124`:
```ts
} else if (a.type === 'UNDO') {
  const rec = state.record, i = rec.picks.map((k) => k.team).lastIndexOf(rec.userTeam);
  if (i < 0) throw new Error('nothing to undo');
  const cut = { ...rec, picks: rec.picks.slice(0, i) }, st = restoreDraft(cut);
  set(settle(st, toRecord(st, rec.seed, rec.userTeam, rec.pool)));
}
```
`cut` spreads `rec`, so it preserves an `order` field *if one is on the record* — but `toRecord` is called with four positional arguments and would drop it. **Undo is the second-silent-loss path after restore**: the user picks at slot 6, does one pick, undoes it, and the draft is back on the snake. Inkling's #1–#9 do not cover it. **Check:** START at slot 6 → PICK → UNDO → the record's order is still `orderWith(team, 6)` and `st.pos` is unchanged. **Today: untested, and the natural implementation of Inkling's #1 (add `order` to `toRecord`'s output) fixes it only if `toRecord` takes the order from `st`, not from a fourth argument.**

**P-317-B — `settle()` and every `toRecord` call site.** `toRecord` is called at `store.ts:103` (START), `107` (LOAD), `119` (PICK), `124` (UNDO). A change that threads `order` through one call site and not the others produces a save that keeps the order until the first pick and then loses it. **Check:** a loop — START(slot 6) → LOAD → PICK → LOAD → UNDO → LOAD — asserting the order after *every* transition, not just at the ends. This is the check that catches a half-threaded change, which is the most likely implementation error.

**P-317-C — the size budget.** The pool is already ~90 K chars as tuples (`saves.ts:29` says so). A 1,024-entry `order` is ~4–6 KB. Inkling's #8 asks for byte-identical re-serialisation, which is right, but no check states the size so a future "optimisation" cannot double it. **Check:** the record's serialised length grows by less than 8 KB when `order` is present, and the growth is bounded and named.

**Two predicates to tighten:**

**#5 ("order validation refuses garbage") is not a predicate.** "A team absent from a round or duplicated in round 1 beyond the single displaced swap" is a description, not a test. The exact structural property of `orderWith(team, slot)` is: (i) it is a permutation of `0..1023`; (ii) each block of 32 is a permutation of `0..31`; (iii) block 0 is `snakeOrder()`'s block 0 with the entry at index `slot-1` swapped with the entry at index `team`; (iv) blocks 1..31 equal `snakeOrder()`'s. **State those four; a validator written from the prose will accept something the prose did not mean.** This is the check the whole 1,024-entry claim rides on, so it should be the most precisely written line in the filing.

**#1's cross-check is over-specified in one place and under-specified in another.** "rounds 2–32 equal `snakeOrder().slice(32)`" is right. But "round 1 equals round-1-with-team-12-at-index-5" needs the *displaced* team named too — the swap moves whoever was at index 5 to index 12. Assert the full permutation, not one position.

**What P-317 gets right and should not be changed:** #3 (the snake fallback is a regression guard and must pass before *and* after), #7 (the stamp must reach `WeekPayload`, including the `null` and run-it-back cases), #9 (determinism), and the contract line "the store consumes, never recomputes, never fixes". Those are the four that make the change safe rather than merely tested.

---

# 3 · S3/S4 — what is missing, tightened, or wrong

**The contract is sound.** The failure-modes section (the mock-store green, the parse-bypass, the drift check that cannot fail) is the best part of either filing — those are the three ways this exact contract gets claimed falsely, and naming them is worth more than another check.

**S4-2 is ambiguous where it must be exact.** It allows "a `ParseResult`-shaped value **or** a thrown-named-error caught at the store boundary". An async API with two error channels is the mock-store green waiting to happen: the sync path returns values, the async path throws, and a caller that handles one will not handle the other. **Pin one channel.** My recommendation: the async API *rejects* with a named error, always, and the boundary maps it to `LOAD_FAILED{kind}` exactly as `appstate.ts:48` does today — because an async caller already has a rejection path and adding a second one is how the two drift.

**Missing — sync/async interleaving.** S4-6 covers "two S4 writes". It does not cover **one sync write and one async write to the same slot**, which is the case that actually exists during the migration (the shell's existing `saveTo` is sync; S4 lands beside it, not instead of it). **Check:** `saveTo(kv, A)` then `await saveAsync(kv, B)` (and the reverse order) → the final bytes parse as the *later* write, and no torn blob. Without this, S4-1 ("additivity is literal") is asserted but not tested at the only seam where it can break.

**Missing — the S4 API's relationship to `SAVE_KEY`.** `saveTo` uses `sportKey('nfl','draft')` (`store.ts:138`). S4-1 says the naming is unchanged. **Check:** the S4 write for slot C lands at the same key the sync write uses, byte-comparable — otherwise "additive" is true of the code and false of the disk.

**S3-2's field list is REPORTED (the plan doc) and should stay labelled that way.** It is correctly labelled. But the check "a typed-construction test asserting every listed field is present" will pass vacuously if the type is widened to optional. **Add:** the snapshot type must have **no optional fields** among the seven, enforced by a type-level assertion (e.g. a `Required<>` equality), not by a runtime check.

**S3-4 is the strongest check in either filing** (version coupling: a snapshot from another engine/pack is refused, never mixed best-effort) and should be kept verbatim.

**What S3/S4 gets right and should not be changed:** S3-1's "hash is part of identity, not decoration" with the byte-flip; S4-3's newer-version write refusal (correctly flagged as the inferred extension and correctly recommended for S4 rather than a follow-up); S4-4's fault-injected `KeyValue`; S4-7's idempotent round-trip.

---

# 4 · Recommendation

**Land both, with the additions above.** Specifically:

- **P-317:** Inkling's #1–#9, plus **P-317-A (UNDO)**, **P-317-B (every `toRecord` call site, in a loop)**, **P-317-C (size budget)**, and **#5 rewritten as the four-clause predicate**. The landing set is one test-only commit in `test/engine/nfl/store.test.ts` + `draft.test.ts`, with the deliberate-mutation legs Inkling names (drop the order from `toRecord` → #1 fails; snake-only `restoreDraft` → #2 fails; **drop it from the UNDO call site only → P-317-A fails**).
- **S3/S4:** Inkling's S3-1..S3-6 and S4-1..S4-7, plus **S4-2's single error channel pinned to rejection**, **the sync/async interleaving check**, **the S4 key-identity check**, and **S3-2's no-optional-fields type assertion**.

**Where I disagree with the prompt's framing:** it says "the restore path drops the saved order; that is the verified defect". That is right, and I verified it. But the *sharpest* way to state the defect is not "the restore path drops it" — it is **"the save format has no place to put it"**. `toRecord` cannot preserve what `DraftPayload`/`SaveRecord` do not carry. A fix that only touches `restoreDraft` (add the `order` argument, defaulting to snake) would tick #2's letter and leave the defect: the order still never reaches the disk. **The change is a format change first and a restore change second, and the checklist should say so, because the order of the edits is the difference between a real fix and a green test.**

---

BLOCKED: nothing — both checklists and the code are in the repo.
OPEN: the Architect's choice of where the slot stamp lives (payload vs envelope meta) — Inkling leaves it open and I agree; my checks bind semantics.
NEXT: (1) the Architect lands P-317 against the merged list and S3/S4 against theirs, as two commits; (2) a Verifier who authored neither re-runs P-317-A/B (the UNDO and call-site loops) — I am eligible and will; (3) the w89 beauty round should note that the slot stamp is a *shell-visible* field: Z.ai's `savesApp.ts` slot card is where the user will see whether it survived.