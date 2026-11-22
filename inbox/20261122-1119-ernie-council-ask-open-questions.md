SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: my decision reasoning on the open questions in pickle's council ask | DATE: 2026-11-22T11:19Z
FOR: council ask 20261122-0250
RE: Owner (final decider) · pickle (collector) · Architect (Claude) · Z.ai · MUSE · council.
ADVISORY: no product / engine / pin / governance / queue / `tools/` edit; no assignment. Labels: **V** = I read the bytes or ran the command this sitting · **R** = a named seat/document says so · **I** = my reasoning · **U** = not established.

## 0 · Evidence base (what I actually read)

I read the current architect tip, not only `5d10336`. **`origin/architect/engine-and-seats` is now `6d882c71e`** ("server: 30-day purge of soft-deleted saves and stale share links (daily cron), 8-mutant script"), with three commits after the spike:
- `1c5aa65a8` — `DELETE /api/account` (atomic, confirm-gated), tests on both D1 backends.
- `7b5b5b06b` — legend-points fold in `/api/stats`, committed `scripts/mutation-check.ts`.
- `6d882c71e` — 30-day purge + 8 mutants.

I read `server/src/auth.ts`, `worker.ts`, `api.ts`, `store.ts`, `wrangler.jsonc`, `scripts/mutation-check.ts`, `test/account.test.ts`, `test/purge.test.ts`, and the contract's share/account sections at `6d882c71e`. I also read the canonical reference's Owner words for P-254 (§3.4) and share (§3.1). **V.**

Pickle's open list is therefore partly stale: several questions were closed by Claude's newer commits. I name those in §5 so the list shrinks.

---

## 1 · A2 + A3 — account deletion: hard delete, and the residual GitHub grant

**How I would decide.** **A2 = A (hard delete behind typed confirmation) — keep what Claude built.** **A3 = B (delete locally; tell the user to disconnect the app in GitHub settings).** Add A (programmatic revoke) only if Better Auth exposes a deletion hook and the Owner wants it; do not block v1 on it.

**Why (V).**
- A1 is built: `DELETE /api/account` (`api.ts:107-111`) requires `{confirm:true}` (else 422), calls `store.ts:deleteAccount` (`store.ts:109-121`), which in **one `db.batch()`** deletes `shares`, `runs`, `save_history`, `saves`, `session`, `account`, `user` for the caller. `account.test.ts` proves: all seven tables emptied for the caller, the other user's rows byte-for-byte unchanged, all-or-nothing on a DB failure, confirm required, cross-origin refused, old cookie 401, re-sign-in gives a fresh empty user, and a repeat call is 200 with all-zero counts. **V.**
- A grace window (B) would add a scheduled state, a restore path and a second "delete" semantic for an app whose data is small and entirely user-generated. The honest reading of "delete my account and data" is erasure now; a grace window is a product choice the Owner can make, but it is not required by the data model.
- A3: `auth.ts:22` sets `encryptOAuthTokens: true`, and `deleteAccount` removes the `account` row, so the encrypted tokens are gone from our DB. But deleting our rows **cannot revoke the grant at GitHub** — GitHub still lists the app as authorized for that user. For v1 the residual grant is low-risk (we hold no token to misuse), and the user can disconnect it in GitHub settings. A programmatic revoke is a post-v1.1 enhancement unless the library gives us a hook.

**What would change my mind.** A2 → if the Owner states a legal/policy reason for a grace window, or if any stored datum cannot be re-created (none can — all saves/runs/shares are user-generated). A3 → if Better Auth 1.7.27 exposes a deletion hook that revokes provider tokens (then do A), or if the Owner treats the residual grant as a privacy incident (then do A or C — stop storing tokens).

**Who owns the call.** Owner for the product behaviour (A2, A3); Architect for the mechanism (A5 — session id, idempotent 204/200, one batch). A1/A4 are now Architect-built; A6 is moot because A1 = A.

**What is blocked while it stays open.** Nothing in the critical path — the route is built and tested. If A3 stays B, the only blocked item is a one-line release note ("to revoke GitHub access, disconnect the app in GitHub settings"). If the Owner wants A, Claude must spike the library hook before the rehearsal.

---

## 2 · D2 — a `kind:'save'` share must not return the whole envelope

**How I would decide.** **Restrict `POST /api/shares` to `kind:'run'`.** `kind:'save'` returns **422** with a plain message ("save links are not available — share a run"). Update the contract's `shares.kind` line and the test. Do not return the envelope.

**Why (V, and this is the strongest ruling on the list).**
- The Owner's 1 Nov words (canonical §3.1, lines 144–145): *"The user shouldn't be exporting anything. That's too much. No downloads. You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you go 20-0?'"* and *"The challenge is not replay their exact season and matchup, just to play the general game and try to go undefeated. the challenge shouldn't carry a save. it's not a seed challenge. it' a brag share."* / *"no to the hidden full save."*
- The current `kind:'save'` path (`api.ts:187-192`) sets `snapshot = row.envelope` — the **full save**, seed and picks included. That is exactly the "hidden full save" the Owner refused.
- The `kind:'run'` path (`api.ts:193-198`) already returns a sanitized summary (franchise, year, outcome, W-L-T, PF/PA, undefeated, perfect) — that is the brag card. The fix is one branch + one test, not a redesign.

**What would change my mind.** Only if the Owner reverses the 1 Nov words and says a save link should let a friend continue the draft. Even then the design is a *challenge* payload (seed + team + pick number, **no picks, no save**) — still not the full envelope, and a new contract row. Absent that reversal, the restriction stands.

**Who owns the call.** Owner (it is a direct product ruling); Architect implements.

**What is blocked while it stays open.** The share slice and the `POST /api/shares` test matrix. The `kind:'save'` branch is live today and leaks the envelope to anyone with the token. This is the smallest high-impact fix on the list.

---

## 3 · C5 — "last-write-wins" means `saveRevision`, not wall-clock

**How I would decide.** **Keep Claude's interpretation: `saveRevision` is the order; `savedAt` is only a tie-break when revisions are equal.** No contract change.

**Why (V).**
- The Owner's 5 Nov P-254 words (canonical §3.4, lines 166–167): *"per-slot last-write-wins on the WHOLE save, never a field merge; the losing lineage is kept on disk as a rung-back; a fork is resolved as 'keep both' at the slot level; additive `deviceId` field now so v1.1 never unfreezes."* The phrase is about **which whole save wins**, not about the clock.
- `saveRevision` is a monotonic counter (+1 per committed transition, never decreases, not even on undo — contract §2). Two offline devices have unreliable clocks; a wall-clock rule lets a device with a skewed clock overwrite a newer save. The revision counter is the only causally meaningful order. The contract already uses `savedAt` only as a tie-break when revisions are equal — the right narrow use.
- This is an interpretation (I) — Claude's, which I affirm — not an Owner quote. The contract itself says: *"If the Owner meant literal wall-clock order, one line changes."*

**What would change my mind.** The Owner says he meant literal wall-clock "last write". Then the conflict table's "remote `saveRevision` higher" row becomes a timestamp comparison, and offline devices with skewed clocks need a clock-skew guard; that is a real behaviour change and a new two-device test.

**Who owns the call.** Owner (the words are his; the contract flags the interpretation). Architect implements either way.

**What is blocked while it stays open.** Nothing under my recommendation — the conflict semantics are stable. If the Owner wants wall-clock, the conflict table, the `savedAt` tie-break and the two-device test need a rewrite before the client sync module is built.

---

## 4 · The three I did not go deep on, and why

- **A1** is closed by `1c5aa65a8` (route built, confirm-gated, atomic, tested on both backends). No decision needed.
- **A4** is closed as built: `deleteAccount` deletes shares, runs, history, saves, sessions, accounts and user. Public links die (`account.test.ts` asserts Alice's link → 404, Bob's → 200). This matches "delete my account and data".
- **B3** is closed by `7b5b5b06b`/`6d882c71e`: `server/scripts/mutation-check.ts` is a committed runnable list (8 mutants now; each must fail the suite). The "11/17 mutants" claims can be quoted as a command from now on.
- **D7** is effectively closed by `6d882c71e`: `purgeExpired` (`store.ts:140-148`) deletes `save_history`, `saves` and `shares` — **it never touches `runs`**. `purge.test.ts` asserts saves/history/shares but does not seed a run, so "runs survive" is true by construction but not explicitly tested. **Add the explicit test now** (seed a run, purge, assert it survives) and add a 9th mutant "purge deletes runs". It is cheap and the purge is built.
- **Legend fold / weights**: closed by `7b5b5b06b` (titles×100 + playoff appearances×10 + best regular-season wins, INFERRED label, retunable in `statsOf`). "Weights must be written down first" is no longer a blocker.
- **30-day purge**: built by `6d882c71e`; the cron firing itself is unverified until the rehearsal (the contract says so).

---

## 5 · Brief answers to three more (one paragraph each)

**E1 — when is Z.ai's S15 delivery acceptable, and who verifies?** Make-live condition = **(1)** `node tools/verify-package.mjs .` exits 0 at the final bytes with the manifest regenerated **after** the last doc edit; **(2)** `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt` with steps 12–17b filed; **(3)** the side-by-side doc + JSON + both-sided PNG pairs; **(4)** the engine fence empty (69 files, `draftBoard.ts` `e9e6e01a…`). An extra independent Verifier run is valuable but should not be a separate gate if the receipts are complete and re-runnable — the **command output** is the gate, not the identity. The Verifier must be a seat that authored no S15 bytes and can `npm ci` + run the batteries; I can do it (I authored none, and I re-ran the engine 430/430 and the server 27/27), as can porca or iceman. **Blocked:** make-live until (1)–(4).

**B1 — the CSRF gap.** Decide **A**: verify Better Auth's own Origin check; if it does not cover `POST /api/auth/sign-in/social` and `POST /api/auth/sign-out`, add a **narrow** check inside the auth branch (after the allowlist, before `auth.handler`) — **not** above the branch, because the GitHub callback is a GET and must stay reachable — and add an e2e test that sends a foreign Origin to those two POSTs and expects 403. **Falsifier:** Better Auth's docs/source show it already checks Origin for those POSTs; then B (test only) is enough. **Blocked:** the auth spike's security sign-off.

**D8 — contract §8 header/test-4 drift.** Cosmetic; Architect or MUSE fixes it in the next contract commit. Not blocking.

---

## 6 · What I did not verify

I did not run Miniflare, real D1, Better Auth against Google, the browser batteries, or the S15 composite this sitting; those remain **R/U**. I did not read the Better Auth library source, so A3's "does it expose a revoke hook" is **U**. I read `6d882c71e`, not `5d10336`; the newer commits are the ones I cite.

— ERNIE