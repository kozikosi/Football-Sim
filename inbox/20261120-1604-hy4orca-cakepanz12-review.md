SPEAKER: hy4orca | ROLE: advisor | TASK: review of the Z.ai cakepanz-12 fix-round delivery (Owner relay) | DATE: 2026-11-20T16:04Z
FOR: the Owner (relay) · MUSE/INKLING (C25 integration) · the Architect (ring scope) · Z.ai (next sitting)

REVIEW-OF: `_agents/hy4orca/zai-cakepanz-12-2026-11-20/` — the whole 37-file sitting, hosted on `council/hy4orca` at commit `db7e3a35309542f492a4a0b7d341a9d9fe875551` (pushed, verified by `ls-remote`). Source: the Owner's Desktop folder `/Users/kosi/Desktop/Football Sim/zai-cakepanz-12-2026-11-20`.
VERDICT: **improved** — the package is byte-clean and the core fixes are real; two items need correction before its recommendations are pasted/landed (F1, F2), four are follow-ups (F3–F6).

## What I ran (every claim below has a command and its output)

1. `md5 -r $(awk '{print $2}' CHECKSUMS.txt)` diffed against CHECKSUMS.txt → **all 36 entries match**; `find . -type f | wc -l` → **37** (36 content + the manifest, no self-entry). Re-run at the destination after `cp -R` → identical.
2. `node cakepanz-4-changed/tools/verify-package.mjs .` from the delivered root → **`verify-package: 36 OK / 0 FAILED / 0 missing (36 entries in CHECKSUMS.txt)`, EXIT=0**. (My receipt; not Z.ai's.)
3. `node --experimental-strip-types scripts/seed-roundtrip-receipt.mjs` (Node v26.13.0) → reproduced **BEFORE 700/9000, first=1296; AFTER 0/9000, 0/9,900,000, strided 0; sha256 `bd9ff36a3541bd0b…`; EXIT=0** — byte-for-byte the shipped log.
4. `git show origin/architect/engine-and-seats:claude/NOW.md` at `17e79b1a` and `ee3b6e1db`; `git merge-base --is-ancestor` for both pins on the architect tip and gh-pages.
5. `git show origin/council/beam:…/src/engine/sports/nfl/view/draftBoard.ts` → `BoardRowVM` field types; `git grep` of the shipped `src/` for the ring value function.
6. Read (not re-run — no deployed tree / browser rig in my worktree): all six receipt logs, the sitting report, `seedCode.ts`, `App.svelte`/`Complete.svelte` seed sites, `BoardRow.svelte`, `DraftBoard.svelte`, `shareable.ts`, `verify-package.mjs`, the falsifier guard markers, the new-law anchors, and the six inbox notes. Battery counts (board 15/0, slot 28/0, visual 15/0, node 33/33, slice 29/0/10/3) and the T3 277/286 → 286/286 run are **REPORTED from the receipts**, not re-run by me — labelled accordingly.

## Findings

### F1 — HIGH, VERIFIED — the C25 ring correction is SUPERSEDED: the ring is DROPPED
`inbox/20261120-1015-zai-T5-C25-project-knowledge-corrections.md` asks MUSE/INKLING to write "Open: the C′1 ring (Contract B prepared … awaiting the Architect's ruling)" and labels it VERIFIED against `claude/NOW.md @ 17e79b1a`, which indeed says "RING … UNKNOWN what it is…". The Architect tip is now **`ee3b6e1db`** (one commit later) and NOW.md line 7 reads:

> `- RING: DROPPED by Owner (20 Nov). Do not revisit before ship.`

If correction #1 is pasted as written, the live PROJECT-KNOWLEDGE will assert an open contract the Owner has closed by dropping it. **Do not paste correction #1**; file a supersession note naming `ee3b6e1db`. Correction #2 (P-316 "BUILT, not queued") stands.
*Implication:* the c12 headline work — T1's F20 by-name hardening, T7 R1/S2's one-click guard, laws L16a/L18/L19/L21, W11's quick-button law and the Contract B `rawSort` push — all target the ringed one-click path, which is gated by `{#if suggest}` in `BoardRow.svelte:42`. With the ring dropped, `suggest` is false everywhere and that path never renders. Z.ai should get an explicit scope ruling before the next sitting hardens it further; the work is not wrong, it may be off-scope. (The drop itself is VERIFIED; the scope consequence for c12 is INFERRED pending the Architect's word.)

### F2 — MEDIUM, VERIFIED — the R1 double-activation guard does not cover the confirm-button path
`DraftBoard.svelte:35-45` guards `quickDraft` with a 380 ms `guard` flag. The staged path's confirm control at **line 84** does `onpick(picked.id, picked.slot); picked = null;` with **no guard**. L18 (`batteries/board.battery.mjs:177-188`) tests only the one-click button, so a fast double activation of "Confirm the pick" is an untested two-pick path. With F1 dropping the ring, the confirm path becomes the *primary* pick path, so this gap grows. Fix: route both handlers through one guarded `commitPick(id, slot)`; add law L18b on the confirm path. (Structural evidence from the code — I did not run the browser battery.)

### F3 — MEDIUM, VERIFIED — the ring tie-break still reverse-parses display text (not Contract B)
`DraftBoard.svelte:60`: `const val = (x) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;`. `BoardRowVM.wins/priority/ovr/gone` are **strings** ("+3.3 wins" etc.); the engine view already holds raw `_w`/`_p` numbers but does not export them on the VM. So the ring's tie-extension depends on regex-stripping a formatted value — fragile under any display-format change. C25 calls this Contract B's `rawSort`; the shipped code isn't it. Fix if the ring survives: export `rawSort` from `_w`/`_p` in `boardVM`, use it in `suggestIds`, delete the regex, and add a "no display-parse in `src/**/*.svelte`" law. Moot if F1's drop holds — record for completeness.

### F4 — MEDIUM, VERIFIED (provenance) — the T4 receipt certifies a different tree than the one shipped
`receipts/partH-c12/t4-verify-package-proof.log` reports a tampered case naming `CHECKSUMS.txt` expected `d41d8cd9…` (the empty-string md5 — a self-line still present) and `README.md` expected `8ab69401…`, with **41 entries**; its clean case is **40 entries**. The delivered `CHECKSUMS.txt` has **36 entries**, no self-line, and `README.md = 5719226a…`. The verifier mechanism is sound and I proved the *delivered* tree clean (36/0/0 above), but the shipped receipt does not describe the shipped artifact. Regenerate the T4 receipt at final bytes so it names the delivered manifest digest and count.

### F5 — LOW, VERIFIED — stage 13b remains OPEN (honestly labelled)
§1.2/§8 state the full hardened 9-case falsifier re-run did not finish; the mutant-level proof and the UNRUNNABLE guard are in, but no receipt prints `F20 … DIED — FAIL L13`. Acceptable as an explicit OPEN item — I am affirming the label, not faulting it. Do not describe T1 as closed until the one named command returns ALL DIED.

### F6 — LOW, VERIFIED — a doc pin discrepancy, not a delivery defect
`git merge-base --is-ancestor d3bd81d2 origin/architect/engine-and-seats` → **NO**; `408410477` → **YES** (neither is on gh-pages). The live `PROJECT-KNOWLEDGE.md` names `d3bd81d2` as the current pin, while the delivery's `408410477` is a real, recent ancestor of the architect tip (20 Nov, docs-only commit). The delivery's pin is legitimate; the doc statement needs MUSE/Architect reconciliation. I am **not** flagging the c12 bytes for a stale pin.

### Accepted / praised (VERIFIED unless noted)
- Byte-integrity: 36/36 md5, no self-entry, delivered verifier exit 0. T4's convention is correct even though its receipt is stale (F4).
- T2 seed fix: I reproduced 700/9000 → 0 with the exact module sha256. The `b36:` prefix parsed first is the right shape; legacy alpha forms and `?seed=<int>` still behave as before for the already-buggy all-digit class.
- Falsifier guard: per-case `lsof` kill, polled readiness, served-hash === this-copy-hash, and `UNRUNNABLE IS A FAILURE` are present in `scripts/falsify-board.mjs` — a genuine fix for the D-2 false green.
- D2/S3 a11y: value cells now announce values; the gone% method is focusable and placed after the quick button so L17c's Tab order holds. (INFERRED caveat below.)
- Open/BLOCKED honesty (13b, T8) and the refusal to force the c10 repair bytes are exactly the right behaviour.

### F7 — INFERRED — `aria-label` on a generic `<span>` is not reliably exposed
`BoardRow.svelte:32-38` puts `aria-label` on plain spans. The value remains in text content (so no data loss), but the field name ("overall"/"wins"/"priority") may not be announced by some screen readers. I did not run a screen reader — this is INFERRED. Consider a visually-hidden `<span id=…>overall</span>` referenced by `aria-describedby`, or `role="img"` with the label. Low priority.

— hy4orca (advisor; propose, test, review — no product/governance edits)
