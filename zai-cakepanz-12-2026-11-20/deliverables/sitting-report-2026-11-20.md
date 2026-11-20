# SITTING REPORT — Z.ai · 67 Cakepanz 12 · 2026-11-20 (the fix round)

**Seat:** Z.ai · chat-only (no push credentials — this zip rides the Owner's relay).
**Base:** cakepanz-11 (the zip-root-cakepanz-10 sitting) at engine pin `408410477`, reconstructed byte-verified from the c9 full tree (inkling's hosted copy) + the c10 delta overlay + the c11 diffs — validated by reproducing every c11 REPORTED count before any fix was applied: engine 430/430 · node 33/33 · contrast 2/0 · slice 29/0/10/3 · shell 48/0 · board 11/0 · slot 27/0 · visual 13/0 · and stage 13b stopped on the F20 TAUTOLOGY exactly as the c11 report said (receipt: `receipts/partH-c12/baseline-13b-tautology.log`).

## 1 · What I did

1. **T2/Item1 (P0, the seed-code round-trip)** — FIXED with option (a): the displayed code is now the **prefixed `b36:…` form**, parsed FIRST. New `src/lib/port/seedCode.ts` (`seedToCode`, `parseSeedCode`, `randomSeed`, `writeSeedToUrl`, the R2 range constants); `App.svelte`'s `parseSeed`/`seedCode` use it; the shareable stamp and Complete's prov line mint the prefixed code; `?seed=<integer>` and legacy alpha base-36 codes still parse (back-compat). **Receipt (VERIFIED):** the old parser mis-replays **700 / 9000** (seed 1296 displays "100", replays 100); the new parser: **0 failures** over 1000–9999, **0 failures** over the widened range 100,000–9,999,999, **0** on a strided sweep of the full 1…2^31-1 parse contract, boundaries + legacy forms OK (`scripts/seed-roundtrip-receipt.mjs`, receipt `receipts/partH-c12/seed-roundtrip.log`). The law is W10 in the visual battery and imports the PRODUCT's module (no copy, no tautology).
2. **T1/Item2 (P0, the F20 guard)** — the D-2 stale-server guard is carried into `scripts/falsify-board.mjs` (per-case lsof kill, polled readiness, served-hash === this-copy-hash, killGroup, UNRUNNABLE-is-a-failure; the child log is kept per case). **Running it surfaced a SECOND, deeper defect the c11 sitting misread as a stale-server problem:** with `suggest={false}` the board battery CRASHED at the ring-dependent click (TimeoutError) BEFORE L13 could evaluate, and L16a passed VACUOUSLY (ringed=0, an empty `every()`). Fixed battery-side (no product change): L16a now REQUIRES the ring (3+, C′1's minimum), the one-click walk FAILS LOUDLY and skips (never crashes), L21's focus row no longer requires `.cp-suggest`. **VERIFIED against a planted mutant** (suggest={false}, built, served, battery run): L16 fails "the one-click button NEVER APPEARED — the ring is dead", the walk skips clean, later laws evaluate — no crash (`receipts/partH-c12/falsify-board-13b.log` carries the full guarded run at the pre-hardening bytes: F20 = RED ELSEWHERE with exit 1, i.e. a FAILURE, never a green).
   **OPEN (stated plainly):** the full 9-case falsifier re-run with the hardened battery (expecting ALL DIED incl. `F20 … DIED — FAIL L13`) takes ~20 min and did NOT complete inside this sitting's window. The mutant run + the guard's UNRUNNABLE proof establish the mechanism; the next sitting's first command is `node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` at the final bytes. Stage 13b is therefore **not yet closed** — labeled OPEN with the reason, not shipped as done.
3. **T4/Item3 (P0, packaging)** — NEW `tools/verify-package.mjs`: node-crypto md5, identical on macOS and Linux, explicit failure path (names each FAILED/MISSING file, exit 1). `package-delivery.sh` step 4 now uses it (refuse-to-emit kept); the manifest convention is documented: **CHECKSUMS.txt never lists itself** (a file cannot contain its own digest — the old empty-string self-line hashed nothing). **Receipt (VERIFIED):** tampered tree (a byte appended to README.md) → `39 OK / 2 FAILED / 0 missing`, **exit 1**, both files named; pristine tree minus the self-line → **40 OK / 0 FAILED / 0 missing**, exit 0 (`receipts/partH-c12/t4-verify-package-proof.log`).
4. **T3 (engine suite RED — the Architect ruled it)** — the ruling EXISTS: `architect/engine-and-seats` tip `17e79b1a` + `claude/NOW.md` ("red suite 277/286 (deployed tree `67-cakepanz` on gh-pages, 9 stale tests) → 286/286 via `claude/patches/cakepanz-test-repoint-2026-11-20.patch` (tests only)… NOT applied: I push only my branch; **Z.ai/Owner apply to gh-pages**"). Aligned with it: the patch dry-run applies clean on a fresh gh-pages extract, **BEFORE: 286 tests / 277 pass / 9 fail**, **AFTER: 286/286, exit 0** (bare node, no npm needed) — receipts `receipts/partH-c12/t3-ghpages-repoint.log`; the two patched test files ride `deliverables/gh-pages-repoint/`. The relay applies to gh-pages (one `patch -p1` from the branch root). Q7: recorded per the ruling (narrow week:6 reading stands; no fix before the pin).
5. **T6/Item5 (a11y D2 + S3)** — D2: the value cells' `aria-label`s now ANNOUNCE THE VALUES (`"{r.ovr} overall"`, `"{r.wins} wins"`, `"{r.priority} priority"`, `"{r.gone} gone odds"` — the column names ride the hover titles; the describedby form is preserved). S3: the gone% method copy is now FOCUSABLE (`tabindex="0"`), moved AFTER the row's buttons (the L17c Tab order main→quick is preserved) and REVEALS on focus (`.cp-sr:focus` → static, outlined). **Laws:** node-battery N26 re-anchored + extended (no bare column-name label survives — the defect class is extinct); board battery **L20** (VERIFIED PASS: the accessible names read "99 overall / +3.3 wins / +3.3 priority / 99% gone odds") and **L21** (VERIFIED PASS: Tab walks main→quick→method, the method reveals on focus).
6. **T7 (R1 + S2 + S4 + R2 + S5)** — R1: the one-click path carries a **380 ms guard window** (two activations in one task land EXACTLY ONE pick — law **L18**, VERIFIED PASS) plus a non-blocking **"Drafted {name} · Undo" status line** (`role=status`, aria-live=polite, auto-hides 2.6 s — the L16 no-banner law holds). S2: the staged confirm banner **DISARMS when the pick lands** (law **L19**, VERIFIED PASS: staged=1 → bannerAfterPick=0, one pick). S4: the restore-replay reassurance now renders on the RESTORE path (the gate reads `record.pickSlot` too) — law **B2b** in the slot battery, VERIFIED PASS ("You drafted at slot 2 — …"). R2: the random draw is WIDENED to **100,000–9,999,999** (9.9 M drafts, 1,237× the old 8,000; codes stay 4–5 base-36 chars; the battery's named seeds a3f2/k1x9 sit inside; the parse contract 1…2^31-1 is unchanged) and **the resolved seed is written back to the URL** (`?seed=b36:…`, replaceState, dev-params preserved, try/catch for file://) — W8 VERIFIED PASS (the garbage draw's URL now carries `b36:35ckh` for seed 5,288,417). S5: law **W11** — the 768 px wrap band: no horizontal scroll, the quick button renders (181×29) and lands one pick, zero page errors (VERIFIED PASS). Battery counts: board **15/0**, slot **28/0**, visual **15/0** — all re-run green at the final bytes.
7. **T5/Item4 (docs)** — README carries the fix banner, the new battery counts and the portable verify; VERIFY.txt gains §24 (below); SHELL-STATUS.md regenerates by the tool; ACCEPTANCE-RECEIPTS.txt is regenerated BY THE SCRIPT at final bytes (the 13b stdout ships inside it). The C25 project-knowledge corrections are FILED, not edited (inbox note for MUSE/INKLING: the ring line says Contract B — `rawSort` from `key()` on `BoardRowVM` — and `?seed=` is done; P-316's slice 3 is BUILT and receipted, not "queued"). `package.json`'s promised-but-never-shipped `battery:slot`/`battery:visual` scripts are restored (a c11 gap found while reconstructing).
8. **T8 (the c10 hosts)** — before-counts VERIFIED on ALL FOUR hosts from fresh fetches: **48 OK / 1 missing / 51 files / 49 entries** each (the count correction confirmed: NOT 52). The missing file is the manifest's line-18 entry. **BLOCKED (named):** the repair bytes (6,418 B / md5 `0a2869…`) are the c10 sitting's own run receipt and are NOT in any branch tip or history (14 tips searched + depth-30 walks of inkling/beam) — they live only in the Owner's zip root. A regenerated receipt is NOT a substitute: the slice receipt embeds run-variant details (random-draw laws — VERIFIED: two runs at the same bytes differ: "Draft Patrick Mahomes" vs "Draft Brock Purdy"), so no fresh run can match the manifest. Landing other bytes would flip 1 missing → 1 FAILED. The script's refusal path was VERIFIED on all four hosts (wrong-bytes candidate → `REFUSE … exit 2`, nothing written). Four inbox notes carry the per-host before-state and the exact relay procedure (COPY, not patch; idempotent; STOP on any host not reaching 49/49).

## 2 · Verified with raw output (receipts in `receipts/partH-c12/`)

- `baseline-13b-tautology.log` — the reconstructed tree reproduces the c11 stop state exactly.
- `seed-roundtrip.log` — BEFORE 700/9000 · AFTER 0 everywhere · exit 0.
- `t4-verify-package-proof.log` — tampered FAILS (exit 1, files named) · clean 40/0/0 (exit 0).
- `t3-ghpages-repoint.log` — 277/286 → 286/286 (the Architect's patch, tests only).
- `t8-host-counts-and-refusal.log` — four hosts 48/1/51/49 + the refusal on all four.
- `falsify-board-13b.log` — the GUARDED run at the pre-hardening bytes: F0-board 15/0 + F0-shell 48/0 baselines green, F15/F17/F18/F19/F21/F22 DIED, F20 = RED ELSEWHERE (a FAILURE, exit 1 — the stale-server false-green is dead; the by-name L13 death needs the one hardened re-run listed in §1.2's OPEN item).
- The batteries at the final bytes: board 15/0 · visual 15/0 · slot 28/0 · node 33/33 · slice 29/0/10/3 · contrast 2/0 — each re-run this sitting (stdout in this report and the receipts file).

## 3 · Built, file-by-file (whole files ride `cakepanz-4-changed/` — NEW marked)

| file | change |
|---|---|
| `src/lib/port/seedCode.ts` | NEW — the seed↔code contract (b36: prefix, parser order, R2 range, URL write-back) |
| `src/App.svelte` | parseSeed → the contract module; seedCode → seedToCode; writeSeedToUrl at START |
| `src/lib/port/shareable.ts` | the stamp mints the prefixed code (+ the import) |
| `src/lib/screens/Complete.svelte` | the prefixed code; S4: the note gate reads record.pickSlot too |
| `src/lib/components/BoardRow.svelte` | D2 labels ×4; the focusable method copy after the quick button + reveal-on-focus CSS |
| `src/lib/components/DraftBoard.svelte` | quickDraft (guard + disarm + the Drafted·Undo status line); the toast CSS |
| `batteries/board.battery.mjs` | +L18/L19/L20/L21; L16a requires the ring; the walk fails loud, never crashes |
| `batteries/node.battery.mjs` | N26 re-anchored + the D2/S3 asserts (no bare column-name label) |
| `batteries/visual.battery.mjs` | W6/W8 re-anchored to the prefixed code + the R2 range + the URL write-back; +W10 the round-trip law; +W11 the 768px band |
| `batteries/slot.battery.mjs` | +B2b the restore-path reassurance law |
| `scripts/falsify-board.mjs` | the D-2 guard; dieReport's UNRUNNABLE branch; F20's anchor re-pointed (quickDraft) |
| `scripts/acceptance-run.sh` | the count comments (15/0, 28/0) + the 13b description |
| `scripts/seed-roundtrip-receipt.mjs` | NEW — the standalone T2 receipt tool |
| `tools/verify-package.mjs` | NEW — the portable package verifier |
| `tools/package-delivery.sh` | step 4 portable verify; the no-self-entry convention documented |
| `package.json` | +battery:slot, +battery:visual (the c11 gap restored) |
| `README.md` | the fix banner, the battery counts, the portable verify |

## 4 · Did NOT do, and why

- **No push** — no credentials; the zip is the delivery.
- **No engine edits, no pin moves** — `src/engine/` untouched (the pin stays `408410477`); `diff -rq` clean.
- **No ring build, no multisport, no re-cut of c10, no passGap re-run** — per the orders.
- **The c10 copy not landed** — blocked on the repair bytes (T8 above); refused to force.
- **No governance-file edits** — the C25 corrections are an inbox note.

## 5 · Found that changes the plan

1. **F20's real root cause was NOT (only) the stale server.** The guard's clean-served run still read TAUTOLOGY because the mutant battery CRASHED before L13 and L16a passed vacuously (empty `every()`). The c11 sitting's diagnosis was incomplete; the battery hardening (this sitting) + the guard (this sitting) together close it. The one missing act is the re-run named in §1.2.
2. **The slice battery's receipt JSON is run-variant** (random-draw details) — any receipt whose md5 is manifest-pinned can never be regenerated; it must be preserved. This is why T8 is blocked, and it argues for an engine-side: the slice battery deserves a FIXED draw seed — proposed for the next sitting (it makes `slice1-battery.json` deterministic and repairs future packages trivially).
3. **The c11 zip's promised §24 never shipped** (the delivered VERIFY.txt ends at §23) — this sitting's VERIFY §24 is written here; the tree copy rides `cakepanz-4-changed/` as `VERIFY-§24-append.txt` (paste at the end).
4. **c11's package.json scripts never shipped** (battery:slot/visual) — restored.

## 6 · The Owner must do

1. **Gh-pages:** apply `claude/patches/cakepanz-test-repoint-2026-11-20.patch` to `67-cakepanz/` (one `patch -p1` at the branch root; the two files also ride `deliverables/gh-pages-repoint/`); expect the engine suite 286/286.
2. **The c10 repair relay:** from the zip root, take `slice1-battery.json` (6,418 B / md5 `0a2869…`), verify the md5 FIRST, then `sh land-c10-repair.sh <host-pkg> <repair>` per host (inkling, orcaink, beam, glyph) — 49/49 or STOP. The per-host notes are in `inbox/`.
3. **The MUSE/INKLING C25 integration:** apply the two corrections (inbox note).
4. **Land this sitting's delta** (`cakepanz-4-changed/`) onto the hosted tree; the first command on the hosted bytes is the falsifier re-run (§1.2's OPEN item).

## 7 · The Architect must do

1. **Rule the C′1 ring contract** (still open; the council's prepared position is Contract B).
2. Note the F20 root-cause correction (the battery, not only the server) — no engine action needed.

## 8 · Could not verify (UNKNOWN), and why

- **The full hardened falsifier re-run** (all 9 cases DIED incl. F20 by name) — the sitting's window closed first; the mutant-level proof is in, the full run is the first command of the next sitting.
- **The c10 after-state (49/49)** — blocked on the repair bytes (the Owner's zip root).
- **The acceptance composite at the final bytes** — partially run (the baseline composite is complete through 13b; the final-bytes composite needs the falsifier re-run to pass); the tree's ACCEPTANCE-RECEIPTS.txt here is the BASELINE run's regenerated record.
- **SHELL-STATUS.md regeneration** — not re-run at the final bytes (the tool exists and is wired at stage 13d; the file on record is the c11 regeneration).

## 9 · Next sitting's first three items

1. `node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` at the final bytes — expect ALL DIED with `F20 … DIED — FAIL L13 …`; then `bash scripts/acceptance-run.sh` for the closing composite.
2. The poison-proof receipt (a stale server on the falsifier's port → UNRUNNABLE, exit non-zero) — the guard is in place; the demonstration run is one command.
3. The slice battery's fixed-draw seed (makes `slice1-battery.json` deterministic; unblocks future package repairs) + the T8 landing once the Owner confirms the repair bytes' md5.

## 10 · The zip's own checksums

`CHECKSUMS.txt` at the zip root: md5 + path, **no self-entry** (the T4 convention), verified `node tools/verify-package.mjs` → N OK / 0 FAILED / 0 missing; `unzip -t` clean. The zip's sha256 is printed in the chat reply for the relay record.
