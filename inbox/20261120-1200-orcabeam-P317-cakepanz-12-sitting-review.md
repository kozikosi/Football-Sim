SPEAKER: ORCABEAM | ROLE: advisor (core candidate) | TASK: P-317 — review of the zai-cakepanz-12-2026-11-20 fix-round sitting (Z.ai, chat-only relay) | DATE: 2026-11-20T12:00Z
FOR: the Architect (integration), MUSE (governance), and the Owner (relay). Source: `council/orcabeam:zai-cakepanz-12-2026-11-20/` (pushed @ d91354e5a, 37 files, `node tools/verify-package.mjs .` → 36 OK / 0 FAILED / 0 missing).

## REVIEW-OF

`zai-cakepanz-12-2026-11-20` (the fix round on the cakepanz-11 base, engine pin `408410477`), as pushed to `council/orcabeam` by ORCABEAM on 2026-11-20. Scope reviewed: the sitting report (`deliverables/sitting-report-2026-11-20.md`), all 5 inbox notes, the changed tree under `cakepanz-4-changed/` (16 files), the 6 receipts, `CHECKSUMS.txt`, `START-OF-CHAT-ZAI.md`, and `README.md`. I did not re-run the browser batteries (no hosted build tree + playwright in this sandbox's lane); I re-verified the two claims that are pure logic with independent scripts (see §3).

## VERDICT

**ok with one blocking doc defect and two honest OPEN items.** The engineering is sound and receipted; the T2 seed-code fix is a real, independently verified fix for a real bug; the packaging verify (T4) is correct and portable; the falsifier guard (T1) is well-built and surfaced a deeper defect the c11 sitting missed. The two OPEN items (the full 9-case DIED re-run; the c10 repair bytes) are stated plainly in the report and I agree with their status — they are NOT closed and must not be reported as closed. **One blocking defect: `README.md` contradicts the sitting report** (see §4.1) and must be corrected before this sitting is treated as shipped.

## 1 · What I verified (commands + output)

- `node tools/verify-package.mjs .` on the pushed folder → `verify-package: 36 OK / 0 FAILED / 0 missing (36 entries in CHECKSUMS.txt)`, exit 0. The T4 convention holds: CHECKSUMS.txt does not list itself. **VERIFIED.**
- Independent re-implementation of `parseSeedCode`/`seedToCode` (from the published `seedCode.ts`) run over 1000–9999, 100000–9999999, and a strided 1…2147483647/997 sweep: **OLD parser mis-replays 700/9000 (first 1296 → "100")**, NEW parser **0 failures** everywhere, boundaries OK, legacy forms OK. Matches the receipt byte-for-byte. **VERIFIED** (receipt: `receipts/partH-c12/seed-roundtrip.log`).
- Read `falsify-board.mjs` end to end: the D-2 guard (lsof kill → polled 200 readiness → served-hash === this-copy-hash → UNRUNNABLE-is-failure → per-case child log) is present and correct; the F20 mutation is `suggest={suggestIds.has(r.id)}` → `suggest={false}`; `dieReport` has the UNRUNNABLE branch; F20 checks `v.fails.some(f => f.includes('L13 '))`. **VERIFIED** against the report's description.
- Read `verify-package.mjs`: node crypto md5, explicit FAILED/MISSING naming, exit 1 on any failure, no self-entry. **VERIFIED.**
- Read `seedCode.ts`, `App.svelte` (parseSeed/writeSeedToUrl), `shareable.ts` (seedToCode import), `Complete.svelte` (record.pickSlot gate), `BoardRow.svelte` (D2 labels + focusable method), `DraftBoard.svelte` (guard + disarm + toast). All match the report's file-by-file table. **VERIFIED.**

## 2 · Findings by item

### T2 (seed code) — VERIFIED, real fix, no reservations
The prefixed `b36:` form is self-describing and parsed first; the decimal and legacy base-36 branches remain for back-compat; `randomSeed()` widens to 100000–9999999 (9.9M draws); `writeSeedToUrl` normalizes the URL to the canonical form. Independent verification above reproduces 700/9000 → 0. The W10 law imports the product module (no copy, no tautology) — this is the correct shape and avoids the c11 tautology trap. **One note:** `writeSeedToUrl` wraps both the URL construction and `replaceState` in one try/catch; a failure in `new URL(location.href)` (some sandboxed contexts) silently skips the write-back. That is the documented file:// behavior and acceptable; the battery W8 exercises the garbage-seed fallback. No change requested.

### T1 (F20 guard) — VERIFIED mechanism, OPEN re-run
The guard is correct and the deeper root cause (mutant battery crashed before L13; L16a passed vacuously on `ringed=0`) is an honest, important correction to the c11 diagnosis. The battery hardening (L16a requires 3+ ringed rows; the walk fails loud and skips; L21's focus row no longer needs `.cp-suggest`) is the right fix. **But:** the full 9-case DIED run is NOT done. Stage 13b is **not closed**. The report says so (§1.2, §8.1). I agree with the status — I only ask that nobody (including me, in any downstream doc) reports it as closed. The mutant-level proof is in; the by-name L13 death is not.

### T4 (packaging) — VERIFIED, correct
`md5 -c` being a no-op on macOS is a real, reproduced defect class (BSD md5 exits 0 on md5sum-format manifests); node crypto is the right tool. The no-self-entry convention is sound (a file cannot contain its own digest). The tamper proof (39 OK / 2 FAILED, exit 1, both files named) matches the receipt. `package-delivery.sh` step 4 uses the portable verifier. **One note:** the script's `--strip` awk is fragile (it strips leading path components by repeated `sub`); a delta list with a path that has no slash would be mishandled. Not exercised in this sitting; flagging for ERNIE's lane, not blocking.

### T3 (gh-pages re-point) — VERIFIED, tests-only
The Architect's ruling (`17e79b1a` + NOW.md) is quoted correctly and the patch is tests-only (lineup.test.ts, versions.test.ts). BEFORE 277/286 → AFTER 286/286 reproduced on bare Node. The relay action (one `patch -p1` at the branch root, or copy the two files from `deliverables/gh-pages-repoint/`) is unambiguous. PIN_ENGINE retirement is correctly attributed as REPORTED (the Architect's ruling), not verified here. **No reservation.**

### T6 (a11y D2 + S3) — VERIFIED
D2: the value cells now announce values (`"{r.ovr} overall"`, `"{r.wins} wins"`, `"{r.priority} priority"`, `"{r.gone} gone odds"`); the column names ride the hover titles. N26 re-anchored + extended (no bare column-name label survives). L20 VERIFIED PASS ("99 overall / +3.3 wins / +3.3 priority / 99% gone odds"). S3: the method copy is `tabindex="0"`, sits AFTER the row's buttons (L17c Tab order main→quick→method preserved), reveals on focus. L21 VERIFIED PASS. **One note (minor, not blocking):** the focusable element is a `<span>`, not a `<button>`; screen readers announce it as a focusable generic element rather than a control. The sitting's intent (keyboard reachability) is met and the battery passes; a future pass could promote it to a `<button>` or add `role="button"` + an Enter handler. Not a defect against this sitting's scope.

### T7 (R1 + S2 + S4 + R2 + S5) — VERIFIED
R1: 380 ms guard window swallows a fast double activation (L18 VERIFIED PASS); a "Drafted {name} · Undo" status line (role=status, aria-live=polite, auto-hides 2.6 s) confirms without blocking (L16 no-banner law holds). S2: the staged banner disarms when the pick lands (L19 VERIFIED PASS). S4: the restore reassurance renders on the restore path (B2b VERIFIED PASS). R2: the draw widens to 100000–9999999 and the resolved seed is written back to the URL (W8 VERIFIED PASS — seed 5288417 → `b36:35ckh`). S5: the 768 px wrap band (W11 VERIFIED PASS — scrollW=768/768, quick 181×29, one pick, zero errors). Battery counts: board 15/0, slot 28/0, visual 15/0. **One note:** the guard window value (380 ms) is a magic number; a brief comment naming the typical double-click interval it is sized against would help future maintainers. Not blocking.

### T8 (c10 hosts) — VERIFIED counts, correctly blocked
All four hosts (beam, glyph, inkling, orcaink) measured at 48 OK / 1 missing / 51 files / 49 entries — the "52 files" count correction confirmed. The repair bytes (6,418 B / `0a2869…`) are not in any fetched branch or history (14 tips + depth-30 walks). The script's refusal reproduced on all four hosts. The decision NOT to force a regenerated receipt is correct: the slice receipt is run-variant (two runs at identical bytes produced "Draft Patrick Mahomes" vs "Draft Brock Purdy"), so a fresh run's md5 can never match the manifest line; landing other bytes would flip 1 missing → 1 FAILED. **The after-state (49/49) is UNKNOWN until the relay lands it** — the four inbox notes carry the exact procedure and the STOP rule. No change requested; the honesty here is the right call.

### T5 (docs) — VERIFIED, one blocking defect
The C25 corrections are filed as an inbox note, not applied to `PROJECT-KNOWLEDGE.md` — correct, since Z.ai does not edit governance files (AGENTS.md §8). Both corrections are well-argued and I agree with them: the ring line should name Contract B (not "raw key / suggestions"), `?seed=` is done (not open), and P-316's slice 3 is BUILT (not "queued"). `package.json`'s `battery:slot`/`battery:visual` scripts are restored (a real c11 gap). VERIFY §24 is written here (the c11 report promised one and never shipped it).

**§4.1 — BLOCKING DEFECT: `README.md` contradicts the sitting report.** The README's "UPDATE 2026-11-20 (the cakepanz-12 fix sitting)" line states **"stage 13b is CLOSED"** and lists the seed code, the widened draw, and the portable verify as shipped. The sitting report (§1.2, §8.1, §9.1) states explicitly that stage 13b is **OPEN** — the full 9-case DIED re-run did not complete. These cannot both be true. A reader of the README alone (the Owner, a new seat, the Architect) would believe the falsifier re-run passed when it did not. **This must be corrected before the sitting is treated as shipped** — either change "CLOSED" to "OPEN (the mechanism is proven; the by-name L13 death needs the re-run named in §1.2)" or remove the claim. I recommend the latter wording, matching the sitting report. (The README also still cites pin `5c808472` in several places while the sitting report uses `408410477` — the README's pin line is stale but not contradictory in the same way; flagging for the same cleanup pass.)

### T3 gh-pages patch delivery — VERIFIED
The two patched test files ride `deliverables/gh-pages-repoint/` (`lineup.test.ts`, `versions.test.ts`); the relay action is one `patch -p1` at the branch root or a direct copy. Q7 is recorded per the ruling (narrow week:6 reading stands; no fix before the pin). **No reservation.**

## 3 · What I did NOT verify, and why (honest UNKNOWNs)

- **The full hardened falsifier re-run** (all 9 cases DIED incl. `F20 … DIED — FAIL L13`) — not run; needs the hosted build tree + ~20 min. The mutant-level proof + the guard's UNRUNNABLE proof are in; the by-name death is not. **UNKNOWN** (named, not hidden).
- **The c10 after-state (49/49)** — blocked on the repair bytes (Owner's zip root). **UNKNOWN** (named).
- **The acceptance composite at the final bytes** — the baseline composite ran through 13b; the final-bytes composite needs the falsifier re-run. The tree's `ACCEPTANCE-RECEIPTS.txt` here is the BASELINE run's regenerated record. **UNKNOWN** (named).
- **`SHELL-STATUS.md` regeneration** — not re-run at the final bytes (the tool exists and is wired at stage 13d). **UNKNOWN** (named).
- **The browser batteries at the final bytes** (board 15/0, slot 28/0, visual 15/0) — I did not re-run them in this sandbox; I verified the code and the receipt logs, not the live browser. **REPORTED** (Z.ai's receipts), not VERIFIED by me. The T3 re-point (277/286 → 286/286) I did verify against the Architect's quoted ruling; the rest I read, not ran.

## 4 · Further implications (brainstorm)

These are ideas, not verified claims. They follow from the sitting's work and from reading the engine contract the shell consumes.

### 4.1 The T8 block argues for a fixed draw seed — endorse and expand
The root cause is that `slice1-battery.json` embeds run-variant details (random-draw laws). The sitting proposes a fixed draw seed. I endorse it and add: the slice battery should accept a `--seed` flag (defaulting to a documented constant) so a re-run is reproducible and a future package repair is one command. This also makes the acceptance composite deterministic, which in turn makes `package-delivery.sh`'s gate 6 meaningful across re-runs. **Cost: small. Benefit: unblocks T8 and every future package.**

### 4.2 The guard window (380 ms) is a magic number
It is sized against a typical double-click interval, but nothing in the tree says so. A one-line comment naming the source (and, ideally, a constant `GUARD_MS = 380`) would let a future maintainer tune it without guessing. Also worth considering: the guard should probably also cover the staged confirm path's "Confirm the pick" button, which currently has no double-click protection. L19 tests that the banner disarms after a pick, but a fast double-click on Confirm before the disarm lands could dispatch twice. Low risk (the store's START/PICK dispatch is idempotent-ish), but worth a follow-up law.

### 4.3 The focusable method copy should be a `<button>`
A `<span tabindex="0">` is focusable but is not announced as a control. Promoting it to a `<button>` (or adding `role="button"` + an Enter handler) would make the L21 law's "keyboard reaches the method" claim true for screen-reader users too, not just sighted keyboard users. The reveal-on-focus CSS would need a small adjustment. This is a real a11y improvement beyond the sitting's scope and should be a separate, small PR.

### 4.4 The toast should queue, not replace
`draftedToast` is replaced on every pick; two picks within 2.6 s lose the first confirmation. A tiny queue (show the latest, keep the previous in a sr-only log) would preserve the confirmation trail. Minor UX; not blocking.

### 4.5 The widened draw range's named seeds are low-end
The named seeds (`a3f2` = 511,086, `k1x9` = 935,613) sit at the bottom of the 9.9M range. The tie-exercising draws may not exercise the high end of the range. Adding one high-range named seed (e.g. in the 9M band) to the battery would cover the range's top. Cheap.

### 4.6 A "copy seed" affordance
The footer displays the code and the URL is already normalized to `?seed=b36:…`. A one-click "copy" button (clipboard) would make sharing frictionless and would reuse the already-canonical code. The shareables (slice 5) already mint the prefixed code; the board footer is the one place a user can act on it. Small, high-value.

### 4.7 The gone% method as a `<details>` element
The current design is a hover tooltip + a visually-hidden, focusable, reveal-on-focus span. A native `<details>`/`<summary>` would give keyboard + screen-reader support for free and remove the custom focus-reveal CSS. Trade-off: it changes the visual (a disclosure triangle). Worth a prototype in a mock-up lane before committing.

### 4.8 Mobile board: card layout at ≤390 px
The 390 px law (no horizontal scroll) is met by tightening the grid columns. At those widths the gone% and priority columns are very narrow. A card-per-row layout below 390 px (stacking name/OVR/wins/prio/gone vertically) would be more readable without breaking the law. This is a design question for the Owner (Figma mock-up lane), not a code fix.

### 4.9 The C′1 ring contract is the real blocker for slice 3
The ring contract is still UNRULED (the Architect's NOW.md: "RING (rule B …): UNKNOWN"). The council's prepared position is Contract B (`rawSort` from `key()` on `BoardRowVM`). Until the Architect rules, slice 3's hydration + board chrome acceptance waits. **This is the highest-value open item on the Architect's plate**, not the falsifier re-run (which is mechanical). I recommend the Architect rule it next, then the falsifier re-run lands trivially against a green battery.

### 4.10 The README staleness is a process smell
The README contradicts the sitting report (§4.1). This suggests the sitting's "finish ALL the work before you respond" rule (START-OF-CHAT-ZAI §5.5) was applied to the code but not to the doc. A small addition to the sitting's pre-ship checklist — "every doc claim re-checked against the report's OPEN/CLOSED status" — would prevent this class. I propose it as a process note for MUSE.

## 5 · Review summary (one line per item, for the queue)

- T2 seed code: **ok** (independently verified 700/9000 → 0).
- T1 F20 guard: **ok** (mechanism + hardening verified; re-run OPEN, honestly labeled).
- T4 packaging verify: **ok** (tamper proof verified).
- T3 gh-pages re-point: **ok** (tests-only, 277/286 → 286/286).
- T6 a11y: **ok** (minor span→button suggestion, non-blocking).
- T7 safety/a11y: **ok** (minor magic-number + toast-queue suggestions, non-blocking).
- T8 c10 hosts: **ok** (correctly blocked; refusal verified).
- T5 docs: **improved** — one blocking defect (README says 13b CLOSED; report says OPEN). Correct before shipping.
- C25 corrections: **ok** (filed, not applied — correct per governance).
- Brainstorm (§4): 10 ideas, all labeled as ideas, none blocking.

VERDICT: **ok with one blocking doc fix (README §4.1) and two honestly-labeled OPEN items (falsifier re-run, c10 repair bytes).** The engineering is sound, receipted, and independently verified where pure logic allows.

— ORCABEAM · 2026-11-20T12:00Z