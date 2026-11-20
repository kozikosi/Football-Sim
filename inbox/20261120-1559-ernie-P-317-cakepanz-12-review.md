SPEAKER: ernie | ROLE: Kilo seat (advisor) | TASK: independent review of Z.ai's 67-cakepanz-12 fix-round zip (T1–T8) + the T8 blocker check | DATE: 2026-11-20T15:59Z
REVIEW-OF: `deliverables/sitting-report-2026-11-20.md` + 18 changed files + 2 deliverable test files + 6 inbox notes + 7 receipts, hosted read-only at `_agents/ernie/deliveries/zai-cakepanz-12-2026-11-20/`
FOR: P-317 (chain: my cakepanz-11 review `20261120-0450-ernie-P-317-cakepanz-11-review.md`) · relates P-287 / P-355
VERDICT: improved

## What I actually ran (commands + results — everything else is labelled)

1. **Package integrity — VERIFIED.** `node cakepanz-4-changed/tools/verify-package.mjs .` from the extracted root → **`36 OK / 0 FAILED / 0 missing` (36 entries), exit 0**. The T4 convention holds: 37 files, `CHECKSUMS.txt` does not list itself.
2. **The seed round-trip (T2) — VERIFIED.** `node --experimental-strip-types scripts/seed-roundtrip-receipt.mjs` in `cakepanz-4-changed/` → **BEFORE 700 / 9000** (first=1296, "1296 displayed '100' replayed 100"), **AFTER 0** over 1000–9999, **0** over the widened 100,000–9,999,999, **0** on the strided 1…2^31-1 sweep, boundaries OK, legacy forms OK, **exit 0**. This is the one number that mattered and it reproduces exactly.
3. **T3 (the gh-pages test re-point) — VERIFIED independently.** Extracted `origin/gh-pages` `67-cakepanz/` (166 files), ran `node --test --experimental-strip-types test/engine.test.ts` → **tests 286 · pass 277 · fail 9**. Applied the two files from `deliverables/gh-pages-repoint/` (tests-only — I diffed them: only `test/engine/nfl/lineup.test.ts` + `versions.test.ts` change, zero product/engine bytes), re-ran → **tests 286 · pass 286 · fail 0, exit 0**. The Architect's 277→286 number is real and the patch is safe to relay.
4. **T8 before-counts — VERIFIED, and the "BLOCKED" is WRONG (see D1).** Extracted `council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19/`; `verify-package.mjs` → **48 OK / 1 missing / 51 files / 49 entries**, the missing line 18 = `slice1-battery.json` md5 `0a2869…`. Then I **found the repair bytes on the Owner's own disk** and landed them on a scratch copy → **49 OK / 0 FAILED / 0 missing, exit 0, 52 files**.
5. **The falsifier guard (T1) — VERIFIED from source + the shipped receipts.** `falsify-board.mjs` carries the D-2 guard (per-case `lsof` kill :56, polled readiness :61-64, **served-hash === this-copy-hash :66-68**, UNRUNNABLE→`red=1` :85-89). `board.battery.mjs` L16a now requires the ring (`ringPresent = ringBefore.length >= 3`, :110) and the ring-dependent walk FAILS LOUD + skips instead of crashing (:121-125). The mutant receipt shows the laws dying by name with no crash.
6. **What I did NOT re-run.** The full cakepanz-12 tree (src/, engine/, node_modules) is not in the zip — only the delta. The board/slot/visual/shell/slice/contrast/node battery counts (15/0, 28/0, 15/0, 48/0, 29/0/10/3, 2/0, 33/33) and the engine 430/430 are **REPORTED by Z.ai**; the receipts are internally consistent and the code paths I read match them. I ran the two receipts that are self-contained (T2, T4) and the two that need only public branches (T3, T8).

## Findings

### D1 — DEFECT IN THE REPORT (the one that unblocks four hosts): T8 is NOT blocked. The repair bytes are on the Owner's disk.
Z.ai's report §1.8 / §6.2 and all four host notes say the repair bytes "live only in the Owner's original zip root (`~/Desktop/Football Sim/zip-root-cakepanz-10`)" and are "NOT in any branch/history". **That search looked in the wrong folder.** The exact bytes exist, twice, on the Owner's Desktop:

```
/Users/kosi/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
  → 6418 bytes · md5 0a2869538a706e7e6ea864664b7e5c9f   (VERIFIED: ls + wc -c + md5 -q)
/Users/kosi/Desktop/Football Sim/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
  → 6418 bytes · md5 0a2869538a706e7e6ea864664b7e5c9f   (identical)
```

`zip-root-cakepanz-10` has no `slice1-battery.json`; the **unzipped** `67-cakepanz-10-2026-11-19/` package root does — it is the c10 host package the four branches were cut from. I proved the landing end-to-end on a scratch copy of the inkling host:

```
before: 48 OK / 1 missing / 51 files / 49 entries
cp <repair> <pkg>/_agents/pickle/.../receipts/slice1-battery.json
after : verify-package: 49 OK / 0 FAILED / 0 missing (49 entries), exit 0, 52 files
```

**Action:** the T8 relay is **READY, not blocked**. The Owner (or the next sitting) copies that one file to each of the four hosts (`land-c10-repair.sh <pkg> <repair>` → 49/49, STOP on any host that misses). The four host notes' "BLOCKED" line should be corrected to "READY — source located at `<path>`, md5 0a2869…". This is the highest-value finding in the review: it converts an OPEN item into a one-command relay.
**Process fix:** a "blocked / not found" claim should name the search scope (which roots, which depths). "Not in any branch" was true and "not on disk" was never checked — the scope gap is what cost the item.

### D2 — DEFECT (R2 shareability): `loadDraft` sets the seed but never writes it to the URL, so a restored draft is NOT shareable by URL.
`App.svelte:183` `seed = rec.seed; userTeam = rec.userTeam;` — and the only `writeSeedToUrl(seed)` call is in `startDraft` (:120). The boot rehydrate path (`hydrateBoot` → `loadDraft`, :212) and the Saves-panel load (`onloaddraft={loadDraft}`, :428) both leave the address bar on the OLD (or missing) `?seed=`. So the R2 claim "the resolved seed is written back to the URL — every draft is always shareable" **fails on the restore path**: reload mid-draft, and the URL no longer identifies the draft you are looking at. W9 passes because it reads `store.getState().seed`, not `location.search` — the gap is exactly the one the law does not look at.
**Fix (one line):** in `loadDraft`, after `seed = rec.seed`, add `writeSeedToUrl(seed);` (the `try/catch` inside it already protects `file://`).
**Law to add (W12):** after a reload-restore, `new URL(page.url()).searchParams.get('seed') === seedToCode(store.getState().record.seed)`.

### D3 — CONTRADICTION (docs): the README banner says "stage 13b is CLOSED" while the report says it is OPEN.
`cakepanz-4-changed/README.md:5` — "**UPDATE 2026-11-20 (the cakepanz-12 fix sitting): stage 13b is CLOSED** … the F20 false TAUTOLOGY … is resolved to DIED with the failing law named." But the report §1.2 / §8 and `VERIFY §24.6` say the **full 9-case hardened re-run did not run**: "Stage 13b is therefore **not yet closed** — labeled OPEN", and "the one missing act is the re-run". Those cannot both be true. What IS closed is the *false-green class* (the guard makes F20 a failure by construction); what is OPEN is the by-name `F20 … DIED — FAIL L13` receipt. The README overstates it.
**Fix:** README line 5 → "stage 13b is GUARDED (the false-green is closed by construction; the guard + battery hardening make F20 fail loudly); the full 9-case DIED re-run is the next sitting's first command — OPEN." The report is the honest one; the banner should match it.

### D4 — ROBUSTNESS (minor): `parseSeedCode` is lenient on malformed prefixed input.
`seedCode.ts` `parseInt(s.slice(4), 36)` accepts trailing junk after a valid base-36 run: `b36:1.5` → 1, `b36:12 34` → 435. No displayed code produces this (`seedToCode` is canonical), so it is not a defect today — but a hand-edited or truncated link would silently load a *different* seed rather than falling back to the random draw. **Fix (optional, 1 line):** anchor the payload — `if (!/^[0-9a-z]+$/i.test(s.slice(4))) return null;` before the `parseInt`.

### D5 — PORTABILITY (minor, and the README's own justification is stale on this OS): `package-delivery.sh` still GENERATES with `md5sum`.
Step 4 verifies with node (`verify-package.mjs`), but step 3 (`package-delivery.sh:60`) still pipes through `xargs md5sum > CHECKSUMS.txt`. On a macOS without GNU coreutils that generate step fails even though the verify is portable. Two notes: (a) on **this** Mac `md5sum` IS present (`/sbin/md5sum`, `md5sum (Darwin) 1.0` — VERIFIED `md5sum --version`), so the README/VERIFY line "GNU md5sum is absent on a stock Mac" is **outdated on the current OS**; the portability argument still holds for older macOS. (b) the clean fix is a `--write` mode in `verify-package.mjs` (node crypto) used by step 3, so the tool is portable end-to-end.
Also VERIFIED (supports T4): BSD `md5 -c` on an md5sum-format file with a **missing** target → **exit 0** (a silent false-green), exactly as claimed.

### D6 — NOTE (test design): N26 is a source-string assertion, not behaviour.
`node.battery.mjs` N26 reads `BoardRow.svelte` as text and asserts substrings (`aria-label="{r.ovr} overall"`, the `.cp-sr:focus` rule, the DOM order). It pins the D2/S3 fix against regression, but it cannot catch a *rendering* regression and it breaks on a harmless reformat. It is backed by the behavioural board L20/L21, so the class is covered — N26's value is the pin, not the proof. No change needed; naming it so the next reader does not mistake it for a rendered check.

### Nits
- `README.md:1/5/12` still say pin `5c808472` / 67 files while line 3 says re-pinned to `408410477` and the report says 69 files. Line 3's disclaimer ("every pin string below this line is historical") technically covers it, but line 5 is a *new* cakepanz-12 block that reads as current — one clause ("was 5c808472/67, now 408410477/69") would remove the ambiguity.
- `parseSeed` still reads `location.search` only (my cakepanz-11 R3) — a code after the `#` is ignored. The share text should say "before the #", or read `hash` too.

## What is genuinely strong (keep doing this)
- **The T2 fix is the real thing.** A displayed code that replays a *different* seed 7.8% of the time is a data-integrity bug in a shareable handle; the `b36:`-prefix-first parse kills the whole class, keeps back-compat for legacy links, and the receipt is a true before/after (700→0), not a restated claim. The law imports the PRODUCT module (no tautology).
- **The F20 root-cause correction is honest and deeper than the c11 sitting's.** "The mutant CRASHED before L13 and L16a passed vacuously" is the correct diagnosis; the battery hardening (require the ring, fail loud, skip) is the right shape. Shipping it as OPEN rather than a green is the correct call.
- **The T4 verifier is a genuine class-kill** (node crypto, explicit failure, no self-entry) and I reproduced both the clean and tamper paths.
- **T6/T7 are well-scoped**: D2 (values announced), S3 (focus-revealed method), R1 (guard + Undo toast), S2 (banner disarm), S4 (restore reassurance), R2 (widened draw + URL), S5 (768px band) — each has a named law and a receipt, and each closes a specific item from my cakepanz-11 review. This sitting is unusually responsive to prior review.
- **The two-file gh-pages re-point is correctly tests-only** and independently reproduces 277→286.

## One-line summary
The fix round is sound and closes my cakepanz-11 D2/R1/R2 items with real receipts; the one thing that changes the plan is **D1 — T8 is not blocked, the repair bytes are on the Owner's disk and I landed them to 49/49** — and the one thing to correct before the Owner reads it is **D3 — the README says 13b is CLOSED while the report correctly says OPEN**.