SPEAKER: glyph | ROLE: advisor | TASK: answer pickle council ask 20261122-0250 (three high-impact open questions) | DATE: 2026-11-22T11:17Z
FOR: council ask 20261122-0250

## Scope / labels
- **VERIFIED** = I read the byte/command in this sitting.
- **REPORTED** = named seat/doc claim I did not rerun.
- **INFERRED** = reasoned.
- **UNKNOWN** = not established.
- I do not assign work. I pick three questions where my reasoning may change the Owner decision.

## Evidence I verified this sitting
- `git show 5d10336305fc59e81931c4695db18df80cf0cabd:server/src/api.ts` lines 176-194: `POST /api/shares` accepts `kind:'save'` and sets `snapshot = row.envelope`; `kind:'run'` stores a small derived run summary. `GET /api/share/:token` returns `snapshot: JSON.parse(row.snapshot)` (lines 62-67). **VERIFIED**.
- `git show 5d10336305fc59e81931c4695db18df80cf0cabd:server/src/worker.ts`: `/api/auth/*` is forwarded before the Origin check; state-changing non-auth routes get Origin check against `env.BASE_URL`. **VERIFIED**.
- `git show 5d10336305fc59e81931c4695db18df80cf0cabd:server/src/auth.ts`: allowlist includes sign-in/social, callbacks, get-session, sign-out, ok/error; no delete-user route. **VERIFIED**.
- `claude/account-sync-contract-2026-11-21.md` §0/§9 states no "delete my account and data" route and needs Owner word. **VERIFIED** (file read).
- S15 package I pushed earlier (`zai-s15-closeout-2026-11-21/`): `node tools/verify-package.mjs .` => `364 OK / 1 FAILED / 0 missing`; failed on `deliveries/zai-s15-closeout-handover-2026-11-21.md` hash mismatch (expected `7f21609a...`, got `de2d5cc1...`), converse clean. `shots/side-by-side` has 3 PNGs; `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` and `deliveries/receipts/s15-side-by-side.json` missing. **VERIFIED**.

---

## D2. `kind:'save'` shares return the whole envelope (seed included)

### 1) How I would decide
I would decide **A-like: restrict public shares to `kind:'run'` (or an explicitly redacted brag snapshot) before launch; do not expose full save envelopes as public share links by default.** If save-sharing is ever desired, it should be a separate, explicitly Owner-approved feature with clear wording that it shares replayable save data.

### 2) Why
- **VERIFIED bytes:** `server/src/api.ts` stores `snapshot = row.envelope` for `kind:'save'` and serves it publicly by token with GET-only/read-only semantics.
- **Owner ruling/evidence (REPORTED via canonical reference, but directly quoted there):** 1 Nov storage brief says "The challenge is not replay their exact season and matchup... the challenge shouldn't carry a save. it's not a seed challenge. it' a brag share." "no to the hidden full save." "The user shouldn't be exporting anything. That's too much. No downloads." "brag share ... with a link..." 
- **INFERRED:** A full envelope behind a public token is functionally a hidden export/share of save state, including seed/replay-relevant data. Even if not a file download, it violates the intent boundary more than a brag result card. It also increases accidental leakage surface (token forwarding) and makes "no hidden full save" hard to defend.
- **INFERRED:** `kind:'run'` already aligns with the brag-share intent and existing derivation/snapshot shape.

### 3) What would change my mind
- An explicit Owner ruling that says "public save-link sharing is allowed before/at launch" and defines exactly what fields may be exposed (seed? roster? picks? full replay state?), plus the privacy/portfolio copy that explains it.
- Or a redacted `save` snapshot design that provably excludes seed/full replay payload and is reviewed against the 1 Nov "no hidden full save / no seed challenge" words.

### 4) Who owns the call
- **Owner** owns the product/privacy meaning of "no hidden full save" and whether any save snapshot sharing is acceptable.
- **Architect** owns the technical enforcement (schema/route/validation/tests) once the Owner rules.

### 5) What is blocked while it stays open
- Finalizing share API/schema and public-share UX/copy.
- Security/privacy review signoff for account/sync launch.
- Any client "share save" surface (should not be built before ruling).

---

## A1. Does v1 ship with a full account-delete route? (with A2-A4 implications)

### 1) How I would decide
I would decide **A: build `DELETE /api/account` before launch**, with a minimal hard-delete MVP only if the Owner accepts irreversibility and collateral. My preferred shape is **A1=A, A2=A (hard delete) behind explicit confirmation, A3=B-or-A depending library support but never silent, A4=A with clear copy**.

### 2) Why
- **VERIFIED:** The current system has no account-delete route; auth allowlist does not expose Better Auth delete endpoints; account data lives across Better Auth tables and our `saves/save_history/runs/shares` keyed by `user_id` with no cascade from our tables. The gap was created by our own design choices, not an external blocker.
- **Owner/contract context (VERIFIED/REPORTED):** Account capability is mandatory before deploy; sign-in optional to use; privacy/person-facing irreversible action requires Owner word for behavior. Contract §9 flags it as a gap to decide.
- **INFERRED:** Launching accounts/sync without self-service deletion creates avoidable trust debt for a portfolio project aimed at professional review. A manual Owner-run erasure path is a weak fallback because it adds operational burden and private handling of user requests.
- **A2 tradeoff (INFERRED):** Grace window (B) is kinder but adds scheduled job/state/restore complexity and new failure modes. Hard delete (A) is simpler and auditable if confirmation copy is explicit.
- **A3 tradeoff (VERIFIED unknowns):** Deleting local DB rows does not revoke GitHub OAuth grant; revocation needs provider/library support. If unknown, be honest in UI/copy.
- **A4 tradeoff (INFERRED):** Deleting shares/runs is consistent with "delete my data"; keeping orphaned public share rows leaks; carving deleted users out of global aggregates invents special semantics. Accept collateral, document it plainly.

### 3) What would change my mind
- Owner explicitly accepts "no self-service delete at v1" and approves a concrete interim (A6) with published contact/runbook, response SLA, and exact data scope.
- Evidence that Better Auth/Worker stack cannot safely support account deletion before launch (VERIFIED failing spike/tests), making A6 the only defensible short-term path.
- A legal/privacy requirement forcing grace-period/soft-anonymization semantics over hard delete.

### 4) Who owns the call
- **Owner** owns whether v1 can launch without self-service deletion, and the irreversible user-facing behavior/collateral wording.
- **Architect** owns mechanism: transaction boundaries, provider token revocation capability, idempotency/status codes, tests, and safe ordering.

### 5) What is blocked while it stays open
- Account/sync "ready for launch" claim.
- Final privacy/settings UX and support/runbook text.
- Rehearsal checklist item for person-facing data erasure.

---

## B1. How far should the CSRF/Origin fix go?

### 1) How I would decide
I would decide **A: verify Better Auth's own Origin/CSRF behavior for the two allowlisted POST auth routes, then add a narrow Origin/referrer check for `sign-in/social` and `sign-out` if the library does not already enforce it; extend e2e tests to cover both.** I would not move the existing check above the auth branch (agrees with C ruled out).

### 2) Why
- **VERIFIED:** `worker.ts` returns auth-branch responses before the Origin check. Allowlisted POST auth routes include `sign-in/social` and `sign-out`.
- **INFERRED:** Defense in depth is cheap here and protects against future allowlist additions or library behavior changes. Relying on undocumented library behavior leaves an avoidable ambiguity in a security-sensitive path.
- **UNKNOWN:** Whether Better Auth 1.7.x already rejects cross-origin POSTs for these endpoints in this Worker setup. That must be established before claiming "covered by library."

### 3) What would change my mind
- A verified Better Auth doc/source/test proving these specific endpoints enforce Origin/CSRF protections in the deployed Worker configuration; then B (library + tests proving it) is enough.
- Evidence that adding Origin checks breaks legitimate OAuth flows in the real rehearsal environment.

### 4) Who owns the call
- **Architect** (ordinary technical/security decision), with MUSE ensuring claims are labeled VERIFIED/UNKNOWN.

### 5) What is blocked while it stays open
- Calling the auth spike "security-reviewed" rather than "functional spike."
- Closing the S2/B1-style review note with evidence.

---

## E1. When is Z.ai's S15 delivery actually acceptable?

### 1) How I would decide
I would decide **"Composite COMPLETE at unchanged final bytes + side-by-side image pairs/receipt filed + package self-verify clean" is the minimum acceptance bar.** I would also require **one independent Verifier pass after reseal/regeneration** because the package I verified is currently not self-consistent (manifest/handover mismatch) and the side-by-side receipt set is incomplete.

### 2) Why
- **VERIFIED by glyph:** S15 package currently fails its own integrity gate (`verify-package` 364 OK / 1 FAILED, handover hash mismatch) even though converse is clean; side-by-side artifacts are incomplete (3 PNGs, missing receipt/doc). Handover/VERIFY also self-report composite attempt 3 stopped mid step 12 and 13-17b not run.
- **REPORTED by multiple seats/canonical:** eight-seat review consensus was "engineering good, delivery not at done-when bar" (per pickle ask context). I did not re-run those reviews, but the file-level failures I saw align.
- **INFERRED:** For a close-out package, integrity/receipt completeness is part of the deliverable, not paperwork. Resealing after edits can invalidate hashes; acceptance must be measured at final bytes.

### 3) What would change my mind
- Owner/Architect explicitly accepts a narrower delivery form (e.g., code-only handoff without package receipt completeness) and records that waiver. Absent that waiver, I would not lower the bar.
- If an independent Verifier reruns the full required gates at final bytes and all pass, I would drop the need for additional verifier passes.

### 4) Who owns the call
- **Architect** owns technical acceptance criteria for build/package gates.
- **Owner** can waive non-safety acceptance criteria, but should do so explicitly.
- **Verifier** must be a seat who authored none of the bytes being checked.

### 5) What is blocked while it stays open
- Honest "S15 close-out complete / make-live ready" claim.
- Downstream merge confidence and receipt-based audit trail.
- Any cutover decision that cites S15 package as final.

---

## Short FACT candidates (not deep answers)
- **FACT (VERIFIED, 2026-11-22):** `5d10336` `server/src/api.ts` allows public `kind:'save'` shares and stores `snapshot=row.envelope`; `GET /api/share/:token` returns that snapshot. This intersects Owner 1 Nov "no hidden full save / not a seed challenge / no downloads" ruling (D2).
- **FACT (VERIFIED, 2026-11-22):** glyph-pushed `zai-s15-closeout-2026-11-21` currently fails `node tools/verify-package.mjs .` due to handover hash mismatch; side-by-side receipt/doc missing; only 3 side-by-side PNGs present. Delivery is not at self-verify completeness.
