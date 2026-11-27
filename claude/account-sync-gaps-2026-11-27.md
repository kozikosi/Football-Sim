# Account sync: the remaining gaps (T3), 27 Nov 2026

Planning-era code only: nothing deployed, `colors/src/{core,sports,platform}` unchanged (`ce75f04c` / `a9792de4` / `dcd97f20`).
Adds to `claude/client-sync-module-2026-11-23.md`; its "Not done" items 1, 2, 4 and 7 are answered here. V = I ran it, I = inferred, U = unknown.

## Built (V)
- **Delete:** `notifyDeleted(slot)` after the app removes a slot. Sent with the last seen revision, remembered across reloads. Never destroys a copy this device has not seen.
- **Server history and restore:** `serverHistory(slot)`, `restoreFromServer(slot, archivedSeq)`. A server delete now keeps a restorable copy (contract section 3 asked for it; the server did not do it).
- **Stats and shares:** `stats()`, `shareSave(slot)`, `shareRun(saveId, run)`, `revokeShare(id)`; transport `getShare(token)` for a public share page (not found = null, expired or revoked = `gone`).
- **Backoff jitter:** each wait is between half and all of the doubling step.

## Wiring for the app (Z.ai)
- New optional deps: `onRemoved(slot)` (a delete from another device was applied; `onPulled` fires too), `random()`.
- Call `notifyDeleted` on every user delete. Show `heldSlots()` as "on this device only".
- The transport sends `x-sync-user`. A custom transport should implement `expectUser(id)`.

## Behaviour changes to ratify (contract sections 2, 4, 5)
1. A copy with no local changes follows a newer server copy (including a restore or a replaced game) instead of pushing itself back.
2. A delete made elsewhere removes an unchanged copy here and keeps a local rung-back. A changed copy is pushed back.
3. If the server has not moved since this device last matched it, the device's copy is pushed. Before, a new game over a synced one was copied into a free slot, and an older copy put back by hand was overwritten.
4. After an account switch, saves not imported are **held**: never sent to the new account.
5. The server answers 401 `wrong-user` when the session cookie belongs to a different account than the page is syncing.

## "Keep separate" (definition)
The second account does not sync on this device. Local saves and the sync record are untouched. Per-account local namespaces are **not** built: they would change engine keys.

## Legacy import: not built
- V: the old shell writes `zpb:st:stats` only through `ZPBStorage.stats.applySeason`; across the 71 HTML files at gh-pages `66096fb1`, 45 contain it (definition, test or export only) and 26 do not. No screen calls it.
- I: a new `workers.dev` origin cannot read github.io localStorage, so the key rename in `legacy.ts` cannot reach it there.
- V: the newest Z.ai app (`zai-s17-closeout-continuation-2026-11-24`) records no career counters.

## Faults found and fixed
| Fault | Found by |
|---|---|
| Partial account switch later uploaded the unadopted saves and runs to the new account | probe on the old code (V) |
| A save written while a pull was in flight could be overwritten | test (V) |
| Work started before a sign-in change kept running and could send saves to the next account | random histories (V) |
| A second tab signing in as someone else: the first tab's saves would go to that account | reading the code (I); server test now refuses it |
| A lost server reply, then a delete: the save came back | random histories (V) |
| "Keep both" interrupted before its last write copied the same save again | test (V) |

## Evidence (V)
- colors 534/534, `tsc` 89 pinned, build OK, `test:gate-verify` OK. Server: sqlite 41 pass, 3 skipped; Miniflare D1 44/44; 10/10 server mutants killed. A delete writes 3 rows (Miniflare).
- Client: 34 of 35 deliberate breakages fail a test. The survivor (skipping stale queued work before it starts) is a second layer behind the per-request fence.
- `server/scripts/sync-fuzz.ts`: 20,000 random histories (5,000 each: one device; one device with lost replies; two devices; two accounts) with no violation. On `1681d3a3` the same checker (3,000 each) found 532 and 1,013 one-device failures, 132 account leaks and 13 devices that never agreed; the two-device mode found none.

## Limits
- No independent review: the reviewing agent stopped on a usage limit. The random-history checker was written by the same author as the code.
- A server save in a held slot is not shown on that device.
- A delete made signed out, or in the instant of a sign-in change, is not sent: the save returns.
- After the 30-day purge, a long-offline device pushes a deleted save back.
- Server history keeps 3 copies per slot; older ones drop.
- No client method for `DELETE /api/account`.
- U: two tabs open at once, a real browser, real Cloudflare, Better Auth.
