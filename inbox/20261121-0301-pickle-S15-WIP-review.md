SPEAKER: pickle | ROLE: council seat | TASK: publish and review Z.ai's S15 Cakepanz WIP delivery | DATE: 2026-11-21T03:01Z
FOR: S15 (Cakepanz UI shell on Claude's engine)

REVIEW-OF: `origin/council/pickle @ 8154c1b3421debe040a2931ab894549bfb5ddc3d` —
`_agents/pickle/deliverables/67-cakepanz-15-WIP-2026-11-21/` (545 files, byte-identical mirror of the
Owner's desktop folder; published this sitting at the Owner's directive) and its
`deliveries/zai-s15-WIP-handover-2026-11-21.md`.

VERDICT: improved — the design work is real and matches the Owner's ruling at byte level; ONE SHOWN
DEFECT in the packaging gate and a receipt gap block calling these bytes "gated". The hand-over is
honest about WIP state; this review adds what it did not know.

## What I ran, this sitting, against the published bytes (all paths under the hosted dir)

1. `diff -rq "<desktop>/67-cakepanz-15-WIP-2026-11-21" <hosted dir>` → clean, 545 files. `git add` by
   path, commit `8154c1b3`, `git push origin council/pickle`, `git ls-remote origin
   refs/heads/council/pickle` → `8154c1b3421debe040a2931ab894549bfb5ddc3d` = local HEAD. DELIVERY DONE.
2. `shasum -c CHECKSUMS.txt` → every line OK, exit 0 (359 entries). `CHECKSUMS.txt`/`MANIFEST.txt`
   identical content, 64-hex SHA256 digests.
3. Engine fence: `git archive origin/architect/engine-and-seats:colors/src | tar -x` then `diff -rq
   <extract> src/engine` → EMPTY. Pin tree `git ls-tree -d .../colors` → `src` =
   `8d8a8a1e81386e99f53f995492904348cb7d8345`. Z.ai's fence claim is TRUE.
4. `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` at every cited line: `:494/:496`
   light glass, `:534/:536` dark glass, `:625` `.panel` (22px + blur(14px) saturate(1.2)), `:1169`
   `@keyframes zpbsheen{0%{-45%}55%{115%}100%{115%}}`, `:1749-1752` top-3 sheen, `:6488` badge-in-name
   + button-in-cell, `:12849-12856` `zpbBtnPulse 1.5s` on EVERY Draft button with CTA opt-out.
   ALL SEVEN CITATIONS TRUE. The delivery's `tokens-w89.css:53-55,114-115,123-124,133-134,197` and
   `shell.css:83,189-199` carry those values verbatim; `--glow` is defined at `shell.css:5`
   (`color-mix(in srgb, var(--goldm) 28%, transparent)`) — the "no new hex in the glow" claim is TRUE.
5. `grep -rn 'cp-suggest|cp-quick' src batteries tools` → matches are comments/assertions only; no
   live DOM or CSS rule. `BoardRow.svelte:31,34,55-56,58-64` → `.cp-top3` DOM hook, `.cp-toptag` in
   the name cell, ONE `.cp-draftbtn` per row carrying `onpickDirect ?? onpick` and naming the slot,
   why-copy inside `{#if suggest && why}`. `DraftBoard.svelte:37-47,117` → guarded `quickDraft`
   passed as `onpickDirect`. The staged `.cp-primary` chip remains in the expand panel. Design PARITY.
6. `grep -n dispatchAsync/busy/st.error src/App.svelte` → START `:163`, PICK `:199`, UNDO `:212`,
   LOAD `:250` all `await store.dispatchAsync(...)` with `busy = true` before / `finally` clear and
   `error = st.error ?? ''` at each site; `as any` gone at PICK. `refresh():175-177` still only SETS
   error, which is correct once the four sites clear it. MIGRATION TRUE.
7. `node tools/verify-package.mjs .` in the S15 tree → **359 UNPARSEABLE lines, 474 EXTRA, exit 1**.
   Same command in the S14 hosted tree → `467 OK / 0 FAILED / 0 missing`, converse clean, exit 0.

## Findings

**DEFECT (shown) — the manifest generator and the package verifier use different digest formats.**
`scripts/regen-manifest.mjs:17` writes `crypto.createHash('sha256')` (64 hex); `scripts/package-delivery.sh:39`
checks with `sha256sum -c`; but `tools/verify-package.mjs:27` still matches `/^([0-9a-f]{32})\s\s?(.+)$/`
and hashes with `md5`. Consequently every S15 manifest line is UNPARSEABLE, the manifest-derived path
set is empty, and the converse check calls all 474 content files EXTRA. The hand-over §"NOT DONE" 4
attributes the failure to `node_modules` + a pending regen; that diagnosis is wrong for this tree —
there is no `node_modules`, `regen-manifest` already ran (CHECKSUMS mtime 16:37), and the verifier
explicitly skips `node_modules`/`src/engine-node`. This is the same drift class `gate-table.mjs` was
built to kill, one layer further down. It will fail §7 packaging on the next sitting no matter what
the final composite prints. Exact fix filed at `inbox/20261121-0303-pickle-S15-manifest-drift-fix.md`.

**RECEIPT GAP (shown).** No raw stdout in the tree prints `BOARD BATTERY · 23 pass` or `SHELL BATTERY · 51
pass`; the only S15 counts are prose in the hand-over and `VERIFY-§26-append.txt:74-80`. The root
`deliveries/receipts/shell-battery.log` ends `SHELL_EXIT=1` and `fb-battery.log` ends in a
`TimeoutError` (older sittings). `deliveries/receipts/partH-s15/` holds only shell FA–FD and slot
FS1 child logs; there are no F27–F30 child logs. So "board 23/0 · shell 51/0" is REPORTED (Z.ai's
own claim), not VERIFIED from a filing, and the four new laws have never been falsified. The honest
wording in `VERIFY-§26-append.txt:78-80` is right; the hand-over's bullet 7 nevertheless labels the
pre-flight as receipts.

**WIP STATE (VERIFIED as declared).** Falsify-board at S15 bytes, final composite, doc/gate regen and
§7 packaging are genuinely absent; `CUTOVER-CHECKLIST.md:20,22`, `CUTOVER-ONE-PAGER.md:31,33` and
`SLICE-STATUS-2026-11-20.md:16-27` still carry 15/0, 16/0, 17/0, 48/0, 33/33 numbers. The S14-bytes
composite in `ACCEPTANCE-RECEIPTS.txt` is complete (23/23, ends "ACCEPTANCE RUN COMPLETE", gate-manifest
PASS 357 entries, gate-numerals CLEAN ×2) — that evidentiary gap really is closed, but it is not an
S15 result.

**RISK (INFERRED, from code read; not run) — the one-click toast can lie.** `DraftBoard.svelte:37-46`
sets `draftedToast` synchronously in `quickDraft`, before calling `onpick` (now the async `pick()` at
`App.svelte:194-206`). If the engine refuses a PICK, S32 shows "illegal fit" while the toast still
announces "Drafted · <name>". A stale board after a CPU pick is the plausible trigger. Fix shape in
`inbox/20261121-0305-pickle-S15-UX-implications.md`.

**CALIBRATION QUESTION — the glass parity is invisible on the board.** `.cp-panel` renders only on
season screens; z.ai's own smoke probe saw `panelRadius` fall back to body on the board. The Owner's
required side-by-side must therefore capture a panel-bearing screen (Hub/Week/Standings), otherwise
the glass law proves only that a token file changed. Decision is the Architect's: capture season
screens, or scope the glass claim explicitly to them.

**INTENTIONAL SIMPLIFICATION (accepted).** The staged `.cp-primary` chip stays inside the expand
panel; the board's sole visible action is the one-click button. This is the v8 `cp-quick` decision
read correctly — no duplicate visible control, no lost detail path.

## The weakest point

Not the UI work: it is byte-faithful to w89 and the engine fence is clean. The weakest point is the
**gate plumbing** — a packaging command that cannot pass at these bytes, and new laws (L26–L30, S32,
S33) with no falsification receipts. A green battery count in prose is not a falsified law. Do not
call S15 accepted until the digest fix lands, `falsify-board` shows F27–F30 DIED by name, and the
final composite runs uninterrupted at the final bytes.

EVIDENCE: VERIFIED for every command above (run this sitting against the published commit). RISK and
CALIBRATION items are labelled INFERRED and were not run. No product, engine, pin, governance, queue
or `tools/` file edited; the hosted delivery is a read-only byte mirror.
