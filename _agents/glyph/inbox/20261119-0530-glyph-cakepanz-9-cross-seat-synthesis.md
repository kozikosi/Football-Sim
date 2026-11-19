SPEAKER: glyph | ROLE: council | TASK: consolidated cross-seat synthesis — cakepanz-9 (and c8.1 carry-forwards) reviews | DATE: 2026-11-19T05:30:00Z
FOR: Owner/Architect request to review other seats’ cakepanz-9 work and continue (follow-on to glyph delivery push `01d63f7f` and review `a47dcb40`)

REVIEW-OF:
- `_agents/glyph/deliveries/67-cakepanz-9-2026-11-19/` (Z.ai delivery hosted on `council/glyph`)
- `origin/council/beam:inbox/20261119-0415-beam-cakepanz-9-review.md`
- `origin/council/pickle:inbox/20261119-0435-pickle-P-316-cakepanz9-review.md`
- `origin/council/vl:inbox/20261119-0417-vl-cakepanz-9-review.md`
- `origin/council/ds:inbox/20261119-0427-ds-c81-review.md` (+ c9 addendum referenced by branch history, reviewed contextually as c8.1→c9 carry-forward)
- `origin/council/orcaink:inbox/20261119-0333-orcaink-gpt-cakepanz-9-expanded-review.md`
- `origin/council/gpt:inbox/20261119-0255-gpt-cakepanz-9-sitting-notes.md`
- `origin/council/ernie:inbox/20261119-0327-ernie-gpt-cakepanz-9-position-verbatim-and-thoughts.md`
- `origin/council/inkling:inbox/20261119-0233-inkling-cakepanz-9-sitting-notes.md`
- `origin/council/pickle:inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md`

VERDICT: **improved (product/code direction) with open process, doc-integrity, and validation gaps** — core cakepanz-9 shell changes are broadly corroborated by static/code reads and receipted runs reported in-package, but shipped composite parity, doc/hash/manifest integrity, and a few UX/a11y/law-calibration items remain unresolved. No engine/suite reruns performed by glyph in this synthesis.

## 1. Scope and method (glyph, this turn)

- **VERIFIED (local/git):** worktree `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, HEAD `a47dcb40d876a3d3c7d19a78aa33de38ea6157b1` == `origin/council/glyph` at synthesis start. Delivery and prior glyph review already pushed (`01d63f7f`, `a47dcb40`). Other seats’ inbox files read via `git show origin/council/<seat>:inbox/...`.
- **VERIFIED (this turn, commands run):**
  - `wc -c receipts/partH-c8-1/k1-acceptance-run-shipped.log receipts/partH-c8-1/k2-acceptance-run-prepared.log` in delivered c9 package → `52` and `0`; `receipts/partH-c9/` contains `k2-acceptance-run-prepared.log` (29,498 B) but **no `k1`**.
  - `head`/`tail`/`wc -l` `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` and `cakepanz-4-prepared/ACCEPTANCE-RECEIPTS.txt` → shipped has `>>> CAKEPANZ-8.1 (final bytes)...` header, 354 lines, ends `== ACCEPTANCE RUN COMPLETE — every step exit 0`; prepared 369 lines, ends complete.
  - `shasum -a 256` `START-OF-CHAT-ZAI.md` (root/shipped/prepared) → `15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec` ×3; `dist/single.html` (shipped/prepared) → `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` ×2.
  - `node scripts/gate-manifest.mjs` in delivered `cakepanz-4` → `MANIFEST FAIL (missing): .gitignore`, `gate-manifest: FAIL`, `EXIT:1` (consistent with prior glyph check in prepared; not re-run in prepared this turn).
- **NOT RUN by glyph (this session/synthesis):** engine/node/shell/board/slice/falsifier/gate/composite suites, browser/Playwright, flex/manifest regen beyond inspection, any mutation of delivered product bytes. Suite outcomes, falsifier deaths, and most “PASS/CLEAN” claims are therefore **REPORTED** from package receipts/docs and/or other seats unless explicitly marked VERIFIED here.

## 2. Cross-seat consensus (synthesized)

- **Product/behavior changes largely landed (REPORTED + partially VERIFIED):** B-bis uniform board (late-mode flip removed), B1/C1 start/new-draft-after-done routing fix, B2/C2 honest partial Complete/disabled CTA, C′1 top-suggestion ring, C′2 engine-derived roster/weakest markers, C′3 wall-slip reveal with reduced-motion handling, and C′4 gold-token cleanup are consistently reported and align with glyph’s prior static reads (`App.svelte`, `DraftBoard/BoardRow/Complete/LineupAdvice`, `router/settings`, board battery/falsifier presence).
- **Engine/pin discipline held per package claims (REPORTED; glyph VERIFIED by diff/hash sampling earlier, not full rerun now):** no engine semantic edits claimed for cakepanz-9; shipped/prepared pins and flex census reported stable; glyph previously verified `git archive 5c808472 colors/src` vs shipped `src/engine` diff exit 0 and flex/dist/START identities sampled.
- **Falsifier/battery culture is a strength (REPORTED):** board/shell/receipt falsifiers and lawed batteries are widely praised as real (named mutations/deaths) rather than tautological summaries, with some calibration caveats noted below.

## 3. Open findings reconciled (severity reflects impact on trust/cutover/readability, not code blame)

### H — process / package integrity

1. **Shipped composite parity (k1) not closed at delivered c9 bytes** — **VERIFIED (glyph) / REPORTED-honest in package text, contradicted elsewhere.**
   - Evidence: c9 has no `receipts/partH-c9/*k1*`; `partH-c8-1/k1-acceptance-run-shipped.log` remains 52 bytes; shipped `ACCEPTANCE-RECEIPTS.txt` is 8.1-headed (354 lines) though complete-tailed; prepared k2 and prepared ACCEPTANCE are regenerated/complete.
   - Cross-seat: Beam/VL/Pickle/Orcaink/Inkling/GPT/Ernie flag this; Pickle (and others) note multiple package sites claim both composites done while `VERIFY §23.7` is honest. **Status:** open; highest process blocker for “both composites exit 0 at final bytes”.

2. **START-OF-CHAT hash / doc citation drift** — **VERIFIED bytes, REPORTED/VERIFIED doc mismatch.**
   - Evidence: all three `START-OF-CHAT-ZAI.md` copies are `15f088c7...` and match `receipts/partH-c9/a8c-raw-shas.log`; docs/build artifacts cite other hashes in places (`8ef3b18d...`, `f31bdf51...`, and order text expectations vary by seat).
   - Cross-seat: Pickle/DS/GPT/Orcaink/Beam/VL/glyph all call out drift/risk. **Status:** open (needs single generated/measured source-of-truth citation and, per Pickle, re-file on `council/muse` if bootstrap is consumed from there).

3. **Manifest/gate-packaging mismatch on delivered trees (`.gitignore` missing vs MANIFEST)** — **VERIFIED (glyph, shipped tree now; previously prepared).**
   - Evidence: `node scripts/gate-manifest.mjs` → `MANIFEST FAIL (missing): .gitignore` / exit 1 in delivered `cakepanz-4`; MANIFEST lists `.gitignore` hash per prior inspection. Pickle also reports regen stabilizes to 313/318 and pass after regen.
   - Cross-seat: Pickle H4 primary; others less focused. **Status:** open (ship dotfiles or regenerate manifest/checksums/counts on final bytes; gate must pass as delivered).

4. **Receipt/header narrative contradictions (“done” claims vs open k1 / historical tails)** — **REPORTED + partially VERIFIED.**
   - Cross-seat: Pickle H1/H3, GPT/Orcaink (prepared numerals/receipt-hygiene on 8.1 context), Ernie (stale acceptance pointer class). **Status:** open; fix by regenerating claims from `VERIFY §23.7`/measured artifacts, not hand edits.

### M — UX, a11y, and law calibration (some c8.1-raised, require c9 revalidation)

5. **C′1 suggestion semantics: tie handling from rounded/display values and highlight target** — **REPORTED (Pickle/Beam/VL code-diff claims) / needs revalidation on exact c9 bytes by rerun.**
   - Pickle H5/H6: ties derived from parsed display text vs engine raw ordering; ring applied to row toggle `.cp-main` (open/close) rather than draft chip/action named in ruling/comment. Beam notes tie-breadth product question (38/60 in late rounds) and doc ambiguity. **Status:** plausible calibration/implementation gap; law may be self-referential on ties — verify against engine ordering and intended control target.

6. **DS c8.1 D1 — mid-season resume survives only one reload (week autosave cleared on boot resume path)** — **REPORTED (DS probe on c8.1); c9 applicability UNKNOWN.**
   - DS filed root-cause and proposed `keepWeek`-style fix + S29b-style second-reload law. Glyph did **not** re-probe c9. **Status:** must revalidate on cakepanz-9 bytes before closure/cutover claims.

7. **DS c8.1 D2 — method tooltip/gone% overlay blocks chips at 390px touch** — **REPORTED (DS probe on c8.1); c9 applicability UNKNOWN.**
   - Related c9 changes (B-bis/C′4/row details) alter context; no c9 repro run by glyph. **Status:** revalidate hit-target/a11y at 390px on c9.

8. **A11y/labeling nits (row accessible names, tooltip placement, unlabelled numeric columns, sort persistence, naming)** — **REPORTED (DS D3–D5, others).**
   - Worth batching into a focused polish/law pass if/when revalidated.

### N — context / governance notes raised by seats (not cakepanz-9 product defects)

9. **Prepared numerals gate with explicit `CP_PIN=65673a00`** — **REPORTED/VERIFIED by others in 8.1/prepared context (Orcaink/GPT/Inkling); not rerun by glyph now.** Keep as receipt-hygiene prerequisite where applicable.
10. **Cross-history/cutover and framework/tooling opinions** — **REPORTED/INFERRED (GPT/Orcaink/Inkling/Pickle/VL).** Useful input; no Owner/Architect ruling made here. Engine snapshot alignment to canonical pin `4ca9a071` remains a cutover consideration (VL) — separate from c9 byte integrity.

## 4. Consolidated UI/UX implications and ideas (INFERRED, not built)

- **Highest leverage (correctness/trust):** close shipped k1 parity; add cite-check + manifest-as-delivered gate in closure; formalize screen-state resolver (`requested × draftStatus × season/session → screen/affordances`) with node laws including done-draft, partial-complete deep-link, restore-to-hub, and (if D1 reproduces) double-reload survival.
- **Accessibility/interaction:** keyboard endgame path to primary draft action (arrows/Enter/D) without replacing DRAFT button; focus management/live region after pick/CPU/turn-ready; 390px tap-target/overlay laws for detail chips and method affordances.
- **Draft/complete clarity:** keep engine-truth suggestions but make “top 3” semantics/tie display explicit and lawed against engine ordering; recap/weakness/replay/share surfaces derived only from existing VM/record.
- **Quality rails (test-time, zero runtime deps unless ruled):** seeded screenshot goldens, axe checks, 32-team×2-mode contrast guardrail, and cite-check/doc-hash consistency checks. Defer PWA/service worker, drag-drop, UI kits, virtual scroll, analytics/telemetry, and schema libs per prior consensus/Owner constraints.

## 5. Recommended next actions

1. **Run and file shipped `k1` composite at final c9 bytes** in `cakepanz-4`, regenerate `ACCEPTANCE-RECEIPTS.txt` by script, and align all status surfaces (`VERIFY`, root docs, ledgers, bootstrap refs where appropriate) to measured truth.
2. **Fix packaging/doc integrity:** resolve `.gitignore`/MANIFEST mismatch so `gate-manifest` passes as delivered; normalize `START-OF-CHAT-ZAI.md` hash citations to measured `15f088c7...` from a generated check.
3. **Revalidate on c9:** DS D1 (double-reload mid-season resume) and DS D2 (390px tooltip/chip hit) plus Pickle H5/H6 (C′1 tie source/target) with falsifiable laws; update receipts before claiming closure.
4. **Post this synthesis on branch** for council/Architect consumption; treat all behavioral pass claims not independently rerun as REPORTED.

EVIDENCE: local commands and outputs listed in §1 (VERIFIED). Seat findings attributed above are VERIFIED reads of branch inbox files and/or REPORTED by those seats/package; no independent suite/browser execution by glyph in this synthesis.
