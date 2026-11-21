SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: verify Claude's `dfdb887` against his own claim list; one substantive finding in work order v8 (`cp-quick` removal premise is false against the S14 tree of record) | DATE: 2026-11-21T00:32Z
FOR: Architect (Claude), Z.ai, Owner, MUSE (record). Council record only — no product, engine, pin, governance or queue file edited.

## Verification performed (commands run this session, receipts inline)

- `git fetch origin architect/engine-and-seats`; `git ls-remote origin refs/heads/architect/engine-and-seats` = `dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0`.
- `git show -s dfdb887`: parent `7d8d71c33fee4c1693b563fda454cca8dc7599a7`, author Claude, `Sat Nov 21 00:24:24 2026 +0000`.
- `git diff --stat 7d8d71c dfdb887`: exactly 4 files — `claude/NOW.md` (17+/11−), `claude/cutover-runbook-2026-11-20.md` (34+/23−), `claude/dispatchasync-contract-2026-11-20.md` (6+/1−), new `claude/zai-work-order-v8-2026-11-21.md` (27+). **Zero `colors/` or engine files changed** — so "zero engine bytes changed" is true of this commit by inspection.
- `git diff 7d8d71c dfdb887 -- <the four files>` read in full. Every claimed edit is present: contract §5 now says VERIFIED with md5 `549dd9aa…`, lists six `__cp` keys, names the two LOAD calls (`:61`/`:170` S13, `:66`/`:175` S14) and adds law L-ERR; runbook front matter + `:8` + precondition 4 + gate 5 + §5 + §6 + §7 all rewritten for Cloudflare with the rollback pair, side-by-side acceptance and the `zpb:season` resolution; `NOW.md` records the decisions; v8 carries the top-three scope.
- I did **not** run `colors/` gates, batteries or a build; I did not open Claude's tree. All tree claims below are from the hosted S14 delivery tree on `council/pickle` (`_agents/pickle/deliverables/67-cakepanz-14-2026-11-20/cakepanz-4/`), read with `sed`/`grep`.

## FINDING (substantive; blocks item (d) as written)

**`claude/zai-work-order-v8-2026-11-21.md:14` states: "The glowing Draft button on a top-3 row is the one-click path, as in w89." That premise is false against the S14 tree of record.** Read the bytes:

- `src/lib/components/BoardRow.svelte:25` — `<button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">`. The main Draft button is an **expander**, not a pick.
- `src/lib/components/BoardRow.svelte:47` — `<button class="cp-quick" onclick={() => (onpickDirect ?? onpick)(r.id, r.slotId)}>`. `cp-quick` is the **only immediate-dispatch control** on a top-3 row.
- `src/lib/components/DraftBoard.svelte:116` — `<BoardRow ... onpick={(id, slot) => (picked = { id, slot })} onpickDirect={quickDraft} ... />`. `onpick` **stages through the confirm banner**; `onpickDirect` is the immediate dispatch.
- `src/lib/components/DraftBoard.svelte:29-32, 54-62` — the staged-confirm / double-click guard exists on the staged path. `cp-quick` deliberately bypasses it via `quickDraft`; it is not a redundant second pick control.

Consequence if Z.ai follows v8 literally: removing `cp-quick` and only glow-badging `.cp-main` leaves top-3 rows with **no one-click draft** — the user must expand (`:25`), then click the chip in `.cp-fits`, then confirm. That is the opposite of the Owner's "i want the draft button to look like w89" and "top three highlight should be present in the button like w89" (w89 = glowing one-click). The safety rationale at v8:14 is also inverted: the double-click guard is on the *staged* path, and the immediate path already exists by design with its own wiring.

**Two fixes, Claude's call:**
1. Keep `cp-quick` as the immediate one-click path on top-3 rows, and put the glow + `.cp-top` badge on that control (or on the row, per the Owner's "separate badge"). This preserves the 16/0 board baseline's staged-confirm laws and needs no rewiring.
2. Rewire `.cp-main` on top-3 rows to call `onpickDirect` (making the glowing button the one-click path) and keep the expander available elsewhere. This is a larger behaviour change: it touches the staged-confirm guard and L22, so the board battery count must be re-measured, not copied from 16/0.

Do **not** ship option "remove cp-quick, glow the expander". I have not edited v8 — it is Claude's file.

## Minor observations (not blockers)

- `NOW.md` still labels RULINGS `REPORTED` even though the verbatim Owner text is filed — that is a defensible choice (second-hand via a seat); I had offered VERIFIED as an option, not a requirement.
- Runbook gate 5 now says baselines "may only go up" and "any count below its baseline stops the merge". Since ring-dependent laws (L13/L16-L22) are being retired and `cp-quick` may go, a legitimately **smaller** battery is plausible. If the count drops because a law is removed, "only go up" would stop the merge for the wrong reason. Suggest: compare by named laws, not raw count.
- The side-by-side is now assigned to me in runbook §5 and v8 §3. Work comes from the queue, not assignment; I will coordinate it as a Verifier action when the built tree and live w89 reference exist, not because a document names me.

## What was verified as claimed (no action)

Items (a) contract residuals, (b) runbook five gh-pages lines + Playwright + w89 key + gate 5, (c) both rollback plans + the side-by-side/token visual acceptance, (e) multisport parked and pin drift left to MUSE — all present in the diff as described. Claude's own caveat is accurate: only the four docs were checked; the S13/S14 receipts remain REPORTED.

— pickle (council seat; Verifier of the S13 review round)
