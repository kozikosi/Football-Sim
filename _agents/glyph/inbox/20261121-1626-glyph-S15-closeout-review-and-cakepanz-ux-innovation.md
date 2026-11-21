SPEAKER: glyph | ROLE: advisor | TASK: S15 closeout package review + Cakepanz/Claude-engine UI-UX implications | DATE: 2026-11-21T16:26Z

FOR: zai-s15-closeout-2026-11-21 (Owner-relayed close-out; no PRIORITIES queue ID claimed)

## Scope / evidence labels
- **VERIFIED** = command/file I ran/read in this chat.
- **REPORTED** = claimed by S15 docs/receipts; not rerun by glyph.
- **INFERRED** = implication/idea from verified+reported evidence.
- **UNKNOWN** = not established here.

## Package pushed (Owner request)
- **VERIFIED**: copied `/Users/kosi/Desktop/Football Sim/zai-s15-closeout-2026-11-21` into glyph worktree and pushed on `origin/council/glyph`.
- **VERIFIED** commit: `d5a1af1bea7d1cafd7ba6189a16e96ce2455161a` (`glyph: add zai-s15-closeout-2026-11-21 package from Desktop for council review`, 508 files, 58252 insertions).
- **VERIFIED** package path: `zai-s15-closeout-2026-11-21/` at repo root on `council/glyph`.

## Verification I ran (glyph)
| Check | Command | Result | Label |
|---|---|---:|---|
| Package manifest verify | `cd zai-s15-closeout-2026-11-21 && node tools/verify-package.mjs .` | `364 OK / 1 FAILED / 0 missing (365 entries)`, converse clean; FAILED: `deliveries/zai-s15-closeout-handover-2026-11-21.md` expected `7f21609a...a153` got `de2d5cc1...9533` | VERIFIED |
| Numeral gate | `cd zai-s15-closeout-2026-11-21 && node scripts/gate-numerals.mjs` | `CLEAN ×2` | VERIFIED |
| Engine fence vs pin | `git diff --name-only 408410477 -- zai-s15-closeout-2026-11-21/src/engine` (69 files listed) + Python byte compare of 69 files against `408410477:colors/src` | `pin_count 69 snap_count 69 diff_count 0` | VERIFIED |
| Engine pin object exists | `git cat-file -t 408410477` | `commit` | VERIFIED |
| Stamp/truth anchor | `grep -n "metaNow\|engineVersion" src/App.svelte` | `metaNow()` stamps `engineVersion()`; no `ENGINE_PIN` literal seen; window debug exposes `engineVersion` | VERIFIED |
| Brag/P-209 anchors | `grep` + read `src/lib/port/bragText.ts`, `src/lib/screens/Share.svelte` | `VITE_BRAG_URL` build-time constant; season text `Can you go 20-0?`; clipboard+toast+selectable text fallback; no download binding in Share screen | VERIFIED |
| Ring retirement anchors | `grep -rn "cp-suggest\|cp-quick" src/lib/components src/lib/assets` | hits only in comments naming retirement (BoardRow/shell.css); active classes include `cp-draftbtn`, `cp-istop`, `cp-toptag`, `cp-why` | VERIFIED |
| Side-by-side artifacts | `ls shots/side-by-side`; `ls deliveries/S15-SIDE-BY-SIDE-2026-11-21.md deliveries/receipts/s15-side-by-side.json` | only 3 PNGs present (`right-s1/s2/s3 *1180x950-light*`); md/json missing | VERIFIED |
| Verify tool hygiene | read `tools/verify-package.mjs` | S15 D1 comment block duplicated at lines 9 and 15 | VERIFIED |

## What I did NOT run
- **UNKNOWN/NOT RUN by glyph**: `npm ci`, `npm run build`, `npm run test:engine`, board/shell/node/slot/visual/contrast batteries, falsifier suites, full acceptance composite, Playwright side-by-side capture. I did not rerun the 430/430, 37/37, 24/0, 53/0, 18/0, 28/0, 29/0/10/3, 2/0, 45/45, falsifier-all-die claims.

## Findings (review)

### Blockers / integrity gaps
1. **VERIFIED — Package self-verification fails now.** `verify-package.mjs` fails on `deliveries/zai-s15-closeout-handover-2026-11-21.md` hash mismatch while claiming converse clean. This directly contradicts handover/README/S15 claims of clean verify on the S15 tree. **Implication:** the delivered zip/tree is not internally consistent at the bytes glyph received; either CHECKSUMS or handover was edited after manifest generation. **Fix:** regenerate manifest/checksums at final bytes, rerun `node tools/verify-package.mjs .`, and update handover/VERIFY with the new receipt.
2. **VERIFIED — Side-by-side proof is incomplete.** Handover §12 admits script crash and missing filed image pairs; filesystem confirms only 3 right-side captures and missing `S15-SIDE-BY-SIDE-2026-11-21.md` / `s15-side-by-side.json`. **Implication:** visual-parity acceptance is not audit-complete; token/law coverage exists in code claims but Owner-readable compare artifacts are missing. **Fix:** rerun `node scripts/side-by-side-s15.mjs` at final bytes and file receipt + composite doc + full pair set (or explicitly narrow scope with Owner/Architect ruling).

### Honest-but-important reported gaps
3. **REPORTED (self-admitted) — Final composite incomplete.** `VERIFY-§26-append §26.9` and handover state attempt 3 stopped mid step 12 (receipt falsifiers F0-F4 died, F4 logged); steps 13-17b not run; by-name full falsifier-at-final-bytes remains a resume item. This is honestly documented, but it means "final composite green" is not established. **Implication:** do not present S15 as fully close-out-complete until resumed composite tail is recorded at unchanged bytes.
4. **REPORTED — Earlier baseline found real tautology.** F27-F28/L26-L28 probe was tautological post-walk; re-homed to fresh pick-1 board. Good catch. **Implication:** every new "exactly on top three" law needs a context where non-top-three rows exist and are selectable; future UI mutations should preserve this probe shape.

### Positive/grounded observations
5. **VERIFIED — Engine fence clean.** S15 `src/engine` is byte-identical to pin `408410477` (69/69 files). No engine/UI drift evidence.
6. **VERIFIED — Key S15 product-intent anchors are present.** Dynamic `engineVersion()` stamp in `metaNow()`; brag uses build-time `VITE_BRAG_URL`, Owner verbatim "Can you go 20-0?", no download path in Share screen, clipboard+selectable fallback; ring selectors retired from active markup/CSS and replaced by `cp-draftbtn/cp-istop/cp-toptag/cp-why`.
7. **VERIFIED — Verify tool has dual-width digest parsing and converse walk exclusions.** This addresses the stated D1 class; the duplicate comment is minor noise, not a behavioral bug by reading.

## Further implications (Cakepanz / UI-UX shell for Claude's engine)

### A. Trust & receipt UX (make correctness visible, not buried)
- **INFERRED**: Add a small "Build & Proof" drawer in Settings/About: engine pin, shell build token, manifest verify status, last composite receipt timestamp/hash, and "receipt incomplete" warning when composite tail missing. This turns S15's honesty discipline into user/admin-visible trust.
- **INFERRED**: Surface save-envelope provenance where users feel it: on Saves rows/cards show `engineVersion` + created time + "from another build" note before load. The stamp fix is backend-correct; UI should expose it plainly.
- **Risk/check**: avoid noisy debug chrome in player mode; gate behind Settings/Dev or a subtle info icon.

### B. One-button draft clarity (keep the S15 gain, reduce cognitive load)
- **INFERRED**: The one-button model is strong. Add a compact legend once per session ("TOP = one of your top three priorities now; pulse = draftable now") dismissible and remembered locally. S15 moved meaning into badge/why/sheen; first-time users still need a one-sentence decode.
- **INFERRED**: Make "why" copy actionable, not just descriptive: include the tradeoff ("Best value now; fills WR need; RB higher upside but lower need"). Keep it VM-sourced and deterministic.
- **INFERRED**: On narrow/mobile, ensure Draft button + why + TOP badge never wrap into ambiguous tap targets; keep min 44px tap height and test 390px with long names.

### C. Share/brag as a safe virality loop (P-209 aligned)
- **VERIFIED base**: No-download, copy-paste, build-time URL, hidden broken-link behavior is the right safety shape.
- **INFERRED**: Add "Copy image alt text / accessible brag" variant only if needed; default plain text is best. Also add a tiny "Preview exactly what will be copied" highlight when copy succeeds.
- **INFERRED**: For pre-make-live builds, show explicit muted note: "Public link appears after launch; brag text copies without a link." Prevents confusion when season button is hidden.
- **INFERRED**: Add a "Share card" visual composition only as client-side canvas/png if Owner wants image sharing later, but keep it behind explicit action and never auto-download; preserve P-209 no-surprise rule.

### D. Save/restore continuity (the shell should feel unlosable)
- **INFERRED**: S15 fixed restore-to-URL and new-seed affordance; extend with a visible "Resume where you left off" banner on boot when autosave exists (Draft/Season/Complete), with one-click resume and one-click start fresh. This makes W12/W13/N28/N29 user-legible.
- **INFERRED**: Add conflict copy for shared-link vs local autosave in UI language users understand: "Opened a shared draft link. Your local draft is safe." Include buttons: "Keep shared link" / "Load my local draft". Current behavior is correct; make choice explicit.

### E. Claude-engine-facing shell contract (for cutover/merge)
- **INFERRED**: Treat `src/lib/port/*` + selector note as the shell-to-engine contract. Claude should be able to swap engine snapshot while preserving: `boardVM` rows/order/suggestIds, `engineVersion()`, envelope meta, and stable selectors (`cp-draftbtn`, `cp-istop`, `cp-toptag`, `cp-why`, `cp-bragtext`, `cp-error`).
- **INFERRED**: Add a tiny "contract smoke" script that imports only port/seam and asserts required fields/types used by S15 UI. This catches re-pin drift before UI batteries.
- **INFERRED**: Keep engine pin visible in dev/proof UI and in save metadata; never regress to hardcoded stamp literals.

### F. Performance & feel (without changing engine truth)
- **INFERRED**: Virtualize long draft rows only if needed; current 60-row board is small, but season/feed/history screens can grow. Measure before adding complexity.
- **INFERRED**: Preserve reduced-motion behavior as a first-class law (already present). Extend to any future share/transition animations.
- **INFERRED**: Add "instant feedback, truthful completion" pattern everywhere: button shows pending state, toast/status only after committed result. S15 L31 is the right pattern; reuse for saves/import/export/copy.

### G. Accessibility & auditability
- **INFERRED**: Keep native interactive elements (the S15 method span→button fix is good). Add a quick axe/role sweep in CI for top screens, but keep Playwright law tests as source of truth for product behaviors.
- **INFERRED**: Ensure all status toasts use `role=status`/aria-live politely and errors use assertive where appropriate; avoid duplicate announcements.
- **INFERRED**: For color/contrast, keep the contrast battery's "known holes named, no new holes" rule; expose known holes in a dev report, not user-facing blame.

## Innovation backlog (small, testable, engine-safe)
1. **"Why this pick?" drawer** — click TOP/why to expand a plain-English breakdown from VM data: rank delta, need fit, slot value, risk/gone odds. No engine change; uses existing boardVM/goneOdds.
2. **Pick compare mode** — select two rows, show side-by-side value/need/risk. Useful for one-button UX where expand is secondary.
3. **Session timeline strip** — Draft → Week → Season → Awards with "resume" markers from saves; makes shell state legible.
4. **Receipt badge** — tiny footer badge: "Verified build" / "Verification incomplete" driven by packaged receipt state. Honest by design.
5. **Share rehearsal mode** — before make-live, show exact copied text and a disabled "link ships at launch" pill; after make-live with `VITE_BRAG_URL`, show full brag.
6. **Portable proof pack** — one command generates a concise human proof page (key receipts, hashes, gate counts, missing artifacts) for Owner review; avoids reading raw logs.

## Recommended next actions (not assigned)
- Regenerate S15 CHECKSUMS/manifest at final bytes, fix handover hash mismatch, rerun `verify-package` clean.
- Resume composite from step 12/13b at unchanged bytes; file full tail in VERIFY §26.9.
- Complete side-by-side capture set and file receipt/composite doc (or get explicit scope ruling).
- If desired, convert this review's A-F into PRIORITIES proposals with exact anchors/snippets; glyph can draft them as inbox proposals on request.
