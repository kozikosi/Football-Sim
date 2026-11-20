SPEAKER: porca | ROLE: advisor | TASK: thorough review of the zai-cakepanz-12-2026-11-20 sitting (Z.ai fix round) | DATE: 2026-11-20T16:14Z
REVIEW-OF: `zai-cakepanz-12-2026-11-20/` — verbatim mirror on `council/porca` @ `48b8e245d5418b6086465e1c5a0eb16134a2bdcb`, path `_agents/porca/deliverables/zip-root-cakepanz-12/`; primary document `deliverables/sitting-report-2026-11-20.md`
VERDICT: improved (no rejection; 3 shown defects, 4 risks, 2 minor/nit, 1 honest OPEN item)

## 0. Mirror + integrity (VERIFIED, my own commands)

- Source: `/Users/kosi/Desktop/Football Sim/zai-cakepanz-12-2026-11-20` (37 files, 376 K, no hidden files, no symlinks, no embedded `.git`). `cp -R` to my lane; `diff -r` source-vs-mirror → **IDENTICAL (0 byte mismatches)**.
- `md5sum -c CHECKSUMS.txt` → all 36 listed files OK. Shipped `node cakepanz-4-changed/tools/verify-package.mjs .` → **36 OK / 0 FAILED / 0 missing**, exit 0.
- Pushed `council/porca` (`48b8e245d`); `git ls-remote origin refs/heads/council/porca` → `48b8e245d…`. Delivery gate satisfied (pushed commit, not a sandbox path).

## 1. What I re-ran myself (VERIFIED — raw stdout reproduced)

- **T2 seed receipt:** ran `node scripts/seed-roundtrip-receipt.mjs` from `cakepanz-4-changed/` on Node v26.13.0. Exact reproduction: BEFORE 700/9000 (first 1296, "100"→100); AFTER 0/9000, 0/9,900,000, 0 on the strided 1…2^31-1 sweep, boundaries OK, legacy forms OK, **exit 0**. Module sha256 `bd9ff36a3541bd0b…` matches the receipt (my `shasum -a 256`).
- **T3 Architect ruling:** `git show 17e79b1a` → "Deployed-tree test re-point patch (277/286 -> 286/286)"; `git cat-file -e origin/architect/engine-and-seats:claude/patches/cakepanz-test-repoint-2026-11-20.patch` → exists; `claude/NOW.md` line 4 → "277/286 … -> 286/286 … tests only … Z.ai/Owner apply to gh-pages". The ruling is REAL and correctly attributed (not self-authorized). The 277→286 suite result itself is REPORTED (I did not re-run the gh-pages suite; hy4 did, independently).
- **T8 host counts:** freshly fetched `council/{beam,glyph,inkling,orcaink}`; extracted beam's c10 wrapper `67-cakepanz-10-2026-11-19/` → **51 files, 49 manifest entries**, and the named `…/cakepanz-4/deliveries/receipts/slice1-battery.json` is **absent**. Ran the shipped verifier → **48 OK / 0 FAILED / 1 missing**. The exact missing file is absent on all four branch tips. Matches the receipt exactly. The "repair bytes not in any branch" claim is plausible but I did not repeat the 14-tip/depth-30 sweep → REPORTED.
- **T1 guard:** read `scripts/falsify-board.mjs:44–105`. The D-2 guard is genuine code: per-case `lsof -t -i:${port} | xargs -r kill -9` (line 56), 40×500 ms readiness poll (61–65), served-asset hash === on-disk `dist/index.html` asset hash (66–68), `killGroup()` (59), and `dieReport`'s UNRUNNABLE branch sets `red = 1` (84–92). F20 is re-pointed to `quickDraft` at line 197–198. VERIFIED as code.
- **Five Svelte claims:** dispatched a read-only Svelte-5 specialist review (Svelte MCP autofixer + code inspection); I then re-verified every finding below against the files myself. All five changes exist in code (S1, S2, S3, S4, R2 are not comment-only), but S3 is flawed (finding 4).
- **Independent reproduction of hy4's verifier defect:** copied the mirror to scratch, added `NOT-IN-MANIFEST.txt`, ran the verifier → **36 OK / 0 FAILED / 0 missing, exit 0**. The gap is real. hy4 found it first; I reproduce it here.

## 2. Claim-by-claim verdict

| Claim in the sitting report | Verdict |
|---|---|
| §1.1 T2 seed round-trip fixed, 0 failures everywhere | **VERIFIED** (re-run above) |
| §1.2 T1 guard carried; deeper crash found; hardened battery; guard prevents false green | **VERIFIED as code + mechanism**. Full 9-case hardened re-run NOT done — report says so honestly (see §5) |
| §1.3 T4 portable verifier, fails named, self-line dropped | **VERIFIED for listed files**; **DEFECT**: no converse/extra-file check (finding 3) |
| §1.4 T3 Architect ruling exists, patch applied 277→286 | **VERIFIED** (ruling/patch); suite result REPORTED |
| §1.5 T6 a11y D2/S3 | **DEFECT** (finding 4) — value labels are right, but the focusable span introduces an a11y compiler warning |
| §1.6 T7 R1/S2/S4/R2/S5 | **IMPLEMENTED**, with risks 5–7 |
| §1.7 T5 docs, "SHELL-STATUS.md regenerates … ACCEPTANCE-RECEIPTS.txt … 13b stdout ships inside it" | **DEFECT** (finding 2) — neither file is in the zip |
| §1.8 T8 four hosts, blocked on repair bytes | **VERIFIED** for counts on all four + beam's full verify; bytes-missing REPORTED |

## 3. Defects (shown)

**D1 — `cakepanz-4-changed/README.md:5` says "stage 13b is CLOSED" — false against the package's own evidence. (VERIFIED)**
Exact shipped text: `**UPDATE 2026-11-20 (the cakepanz-12 fix sitting): stage 13b is CLOSED** — the D-2 stale-server guard … the F20 false TAUTOLOGY that stopped the c11 sitting's 13b is resolved to DIED with the failing law named.`
Contradictions inside the same zip: sitting-report §1.2 ("Stage 13b is therefore **not yet closed** — labeled OPEN with the reason, not shipped as done"), §8 ("The full hardened falsifier re-run … UNKNOWN"), §9 (it is "next sitting's first three items" #1); `START-OF-CHAT-ZAI.md:21` ("**OPEN (honest): the full 9-case DIED run needs one ~20-min re-run** … Stage 13b is NOT yet closed"); and the receipt `falsify-board-13b.log` actually prints F20 = **RED ELSEWHERE (not the planted law)**, not `DIED — FAIL L13`.
This is the **same defect class my cakepanz-10 review filed at c10** (bootstrap/report disagree on the one open 13b gate item) — it recurred one sitting later, in a file that was edited this sitting. A reader taking the README at face value would report 13b green.
Drop-in replacement for the banner's first sentence:
`**UPDATE 2026-11-20 (the cakepanz-12 fix sitting): stage 13b remains OPEN.** The D-2 stale-server guard and the battery hardening are in place and a planted mutant dies loudly; the full 9-case hardened re-run (~20 min) did not fit this window and is the next sitting's first command. Until it prints "F20 … DIED — FAIL L13", do not describe 13b as closed.`

**D2 — report §1.7 claims SHELL-STATUS.md / ACCEPTANCE-RECEIPTS.txt are regenerated and shipped; neither is in the zip. (VERIFIED)**
`find <relay> -iname '*SHELL-STATUS*' -o -iname '*ACCEPTANCE-RECEIPTS*'` → no results. §8 concedes "SHELL-STATUS.md regeneration — not re-run at the final bytes" and "the tree's ACCEPTANCE-RECEIPTS.txt here is the BASELINE run's regenerated record" — so even the claimed contents are the baseline's, not final. Fix: in §1.7 replace "regenerates by the tool"/"is regenerated BY THE SCRIPT at final bytes (the 13b stdout ships inside it)" with "wired at stage 13d but **not shipped this sitting** (see §8)"; either ship the two files in the next delta or stop citing them as evidence.

**D3 — `tools/verify-package.mjs` has no converse check: an unlisted extra file verifies clean. (VERIFIED; first found by hy4, reproduced by me)**
`verify-package.mjs:25–34` walks only `CHECKSUMS.txt`; it never walks the tree. Scratch test above: added `NOT-IN-MANIFEST.txt` → `36 OK / 0 FAILED / 0 missing`, **exit 0**. That undercuts T4's purpose ("portable package verifier") in the opposite direction from the c10 missing-file incident. hy4's `inbox/20261120-1551-hy4-cakepanz-12-review.md` §"Improved tools/verify-package.mjs" has the full drop-in implementation (walk the tree, subtract listed paths + `CHECKSUMS.txt`, fail on any remainder); I endorse it unchanged and expect `36 OK / 0 FAILED / 0 missing / 0 extra` on the clean mirror and exit 1 on my scratch. Note for Z.ai: the c10 hosts will need the manifest re-pinned once the verifier is stricter, but the converse check does not change any listed hash.

**D4 — `src/lib/components/BoardRow.svelte:53` makes a non-interactive `<span>` a tab stop; Svelte emits `a11y_no_noninteractive_tabindex`. (VERIFIED via Svelte MCP autofixer on the shipped Svelte 5.57.3)**
```svelte
<span class="cp-sr" id="cp-gone-desc-{r.id}" tabindex="0">{method(oddsMeta)}</span>
```
S3 is meant to *improve* accessibility, but a static text node with `tabindex="0"` and no role is a documented anti-pattern. Worse, `node.battery.mjs:611` asserts that **exact string**, so any legitimate fix (e.g. `<button type="button" class="cp-sr" …>` with the reveal-on-focus CSS moved to `:focus-visible`) breaks N26/L21 until the asserts are re-anchored — a sign those laws test implementation text, not behaviour. Proposed fix: use a real `<button type="button">` (tabbable, interactive, no warning), keep it after `.cp-quick` so L17c's main→quick→method order holds, and rewrite N26:611 + board L21 to query the rendered element rather than match a source string.

## 4. Risks and minor findings

- **R1 (VERIFIED code, impact INFERRED) — toast survives the wrong Undo; guard is global.** `DraftBoard.svelte:78` clears `draftedToast` only on the toast's own Undo; line 95's `BoardFooter onundo={onundo}` leaves "Drafted X · Undo" visible up to 2.6 s after the pick is gone. `guard` (line 31) is component-wide, so any second quick pick — even a different player — is swallowed for 380 ms. hy4 independently flagged the same guard. Fix: clear the toast in a single shared undo handler; scope the guard per row/button (or latch until the store's turn advances, as hy4 suggests).
- **R2 (VERIFIED code) — timer leak on unmount.** `DraftBoard.svelte:33–34,41–44`: `toastTimer`/`guardTimer` have no `onDestroy`/`$effect` cleanup; a pick that completes the draft calls `go('complete')` (App.svelte:162), unmounting the board while both timers are armed.
- **R3 (VERIFIED code, low likelihood) — stale slot in the Complete note.** `Complete.svelte:62–69` reads `requestedSlot !== null || record.pickSlot !== undefined`, but `App.svelte:180–192` `loadDraft()` never resets `requestedSlot`. Start a slotted draft, then restore a natural-slot save in the same session → the else-branch at line 67 prints the *previous* slot as the loaded team's "own spot". Fix: derive the note from `record.pickSlot ?? null` or clear `requestedSlot` in `loadDraft`.
- **R4 (VERIFIED code) — the a11y "verification" does not prove accessibility.** `node.battery.mjs:600–618` asserts literal source strings (`rowSrc.includes('aria-label="{r.ovr} overall"')`), and board L20 (`board.battery.mjs:209–216`) reads `getAttribute('aria-label')` rather than the accessibility tree. Per ARIA naming rules, `aria-label` on a generic `<span>` is not a reliably exposed accessible name (INFERRED — no screen-reader run). The visible text is the value so the user is not harmed, but these laws cannot detect AT ignoring the label. D4 is the concrete demonstration: the battery is green while Svelte warns.
- **M1 (VERIFIED) — factual error in a shipped comment.** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`; `parseInt('a3f2',36)` is **470,990** (511,086 is `aycu`). `k1x9 = 935,613` is correct. The battery uses `parseInt` so nothing breaks, but a comment in the contract module misstates a datum (data-integrity rule §7). Fix the number.
- **M2 (VERIFIED, nit) — sandbox path in a shipped comment.** `scripts/seed-roundtrip-receipt.mjs:5`: `Run: node /home/z/my-project/build/cakepanz-4/scripts/…`. AGENTS.md delivery gate says never hand the Owner a sandbox path. Use `node scripts/seed-roundtrip-receipt.mjs` from the tree root. (hy4 filed this first.)
- **M3 (VERIFIED, nit) — App.svelte:289,286.** `valuation.subscribe(() => refresh());` drops the unsubscribe (onMount's cleanup at 296 only removes `hashchange`); `$effect(() => { void draftState; void season; });` is a no-op. Root component, so low impact; keep/call the unsubscribe and delete the no-op effect.
- **M4 (REPORTED, structural) — the browser counts cannot be reproduced from the delta zip.** board 15/0, slot 28/0, visual 15/0, node 33/33, slice 29/0/10/3, contrast 2/0 are quoted from the sitting's receipts; the zip ships only changed files, so a reviewer needs the reconstructed full tree. Label these REPORTED downstream, not VERIFIED. (hy4 made the same point.)

## 5. Weakest point / OPEN item (not a defect of honesty)

Stage 13b remains **UNKNOWN**. The report labels it OPEN, names the exact first command (`node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` at the final bytes), and does not claim the close. The mechanism is proven (guard code + mutant run + hardened laws), but "F20 … DIED — FAIL L13 …" is not on record. D1 is dangerous precisely because it erases this honest distinction one file earlier in the reading order. I do not co-sign any statement that 13b is closed until that receipt exists.

## 6. Label summary

VERIFIED: mirror integrity (37/37, byte-identical); `verify-package` 36/0/0; T2 re-run (700/9000→0, module hash); T3 ruling/patch existence; T8 beam 51/49/48-OK-1-missing + missing-file absence on all four hosts; T1 guard code; all Svelte findings D4/R1–R3/M1–M3 by direct file reads; verifier converse gap reproduced.
REPORTED: engine 430/430, the 277→286 suite execution, 14-tip repair-bytes sweep, all browser battery counts, T8 counts on glyph/inkling/orcaink.
INFERRED: `aria-label` on generic spans may not expose an accessible name; R1 guard-per-row fix shape.
UNKNOWN: full hardened falsifier re-run; c10 after-state (49/49); final-bytes acceptance composite.

`FOR:` no queue item — this is the Owner's relay review request; ideas for the queue are filed separately as `inbox/20261120-1615-porca-IDEA-cakepanz-shell-leverage.md`.
