# S15 Closeout Review — porca (2026-11-21)

**SPEAKER:** porca | **ROLE:** General advisor | **TASK:** Review `zai-s15-closeout-2026-11-21` (Owner-requested push + review) | **DATE:** 2026-11-21T16:27Z

**Label key:** **V** = I ran/read it this sitting (receipt named) · **R** = reported by z.ai/another seat (cited) · **I** = reasoned · **U** = not established.

## 0. What I did (V)

- **Pushed the folder:** Copied `/Users/kosi/Desktop/Football Sim/zai-s15-closeout-2026-11-21` (19M, 508 files) into this worktree, committed `7f3b1a9d2` (`Publish zai-s15-closeout-2026-11-21 folder (Owner request)`), pushed to `origin/council/porca`. V: `git rev-parse HEAD`=`7f3b1a9d2`, `git push origin council/porca` → `6b63c44c5..7f3b1a9d2`.
- **Compared to in-repo WIP:** `diff -rq` between the closeout folder and `67-cakepanz-15-WIP-2026-11-21` shows substantive differences (batteries, scripts, src, dist, receipts, docs, new deliverables). V: diff output captured this sitting.
- **Read key artifacts:** `deliveries/zai-s15-closeout-handover-2026-11-21.md`, `deliveries/zai-s15-intake-ledger-2026-11-21.md` (present), `VERIFY-§26-append.txt` tail, `README.md`, `SHELL-STATUS.md`, `DELIVERY-DECISIONS.md`, key source/battery/script files listed below. V: file reads.

## 1. Verified claims (spot checks, V)

| Claim | Evidence | Verdict |
|---|---|---|
| Engine stamp truthful (no stale `ENGINE_PIN` literal) | `src/App.svelte` imports `engineVersion` from seam; `metaNow()` returns `engineVersion: engineVersion()`; grep for `ENGINE_PIN` in App.svelte returns nothing. | **V — holds in tree** |
| `vite.config.js` base is `'/'` | `zai-s15-closeout-2026-11-21/vite.config.js:9: base: '/'`. | **V** |
| distfile inlines both `/assets/` and `./assets/` | `scripts/distfile.mjs` comment + regex handles both root-relative and legacy forms. | **V** |
| Brag text reconciled to P-209 shape, Owner ask "Can you go 20-0?" | `src/lib/port/bragText.ts`: `VITE_BRAG_URL` from `import.meta.env`, `hasBragLink()`, season text uses `Can you go 20-0?${link ? ' ' + link : ''}`; comment cites Owner verbatim vs briefing paraphrase conflict. | **V — holds in tree** |
| No download binding in share path | `src/lib/bindings/shareDownload.ts` absent; Share screen imports `bragText.ts`, no download affordance. | **V** |
| Toast-truth fix (L31) | `DraftBoard.svelte`: `quickDraft` awaits `onpick`, reads row name before await, toasts only when `landed !== false`; comment cites 0305/L31. | **V** |
| dispatchAsync migrated | `App.svelte` has `dispatchAsync` for START/PICK/UNDO/LOAD with `busy` flag; grep shows 5 hits. | **V** |
| a11y: method is native button | `BoardRow.svelte` uses `<button type="button" class="cp-sr" ...>` (natively focusable, no tabindex). | **V** |
| verify-package dual-width + converse mirror | `tools/verify-package.mjs` accepts 32/64 hex, picks sha256/md5 by length; converse mirrors regen-manifest exclusions (meta, receipts, shots, node_modules, engine-node). | **V — code reads as claimed** |
| Falsifiers F27–F31 present | `scripts/falsify-board.mjs` contains F27–F31 cases with by-name die reports. | **V — present in tree** |
| N36/N37/S34/S35/L31 laws present | Grep confirms N36/N37 in node battery, S34/S35 in shell battery, L31 in board battery. | **V — present in tree** |
| Closeout receipt layer exists | `deliveries/receipts/partH-s15/` has 29 files including baseline-preedit-composite-stopped-13b.log, attempt2-killed-midrun log, attempt3-interrupted-step12 log, F27-F29 child logs. | **V** |

## 2. What the closeout got right (V/R)

- **Honest receipt discipline.** The handover and §26.9 are unusually clear about what is and is not done: attempt 1 found a real F27 tautology (fresh probe fix), attempt 2 was self-killed because a brag-text fix landed mid-run, attempt 3 stopped at step 12 by budget. The gaps are named, not smoothed over. V: logs/append match the narrative.
- **The F27 tautology find is valuable.** Probing "exactly on the three" in a post-walk state where display-rounded ties mark every row is a real test-design defect. Re-homing to a fresh pick-1 board is the right fix class (test the property, not a contaminated state). V: baseline log present; I: fix is sound.
- **Conflict reporting instead of silent choice.** The "20-0" vs "undefeated" ask-line conflict is cited against Owner verbatim and the shipped slogan; P-209 placement conflict is reported, not resolved by fiat. This is the right behavior for a seat. V: bragText.ts comment + handover §0.
- **No engine/pin/ratings/protected-constant edits claimed.** The closeout states fence receipts and `src/engine` hash unchanged. I did not re-run the full fence, but the claim is specific and auditable. R: closeout receipt; U: I did not independently re-hash `src/engine` at this sitting.

## 3. Risks, gaps, and things to verify before anyone treats this as "done" (V/I)

1. **Composite incomplete at the closeout bytes.** Attempt 3 recorded steps 1–12 EXIT_CODE=0 but steps 13–17b did not run in that sitting. The handover says "resume at step 12/13b, no edits since attempt 3 step 1". That is a strong claim but it is **U until re-run**. Before cutover/make-live reliance, a fresh uninterrupted `bash scripts/acceptance-run.sh` at the exact closeout bytes must complete and be filed. **V:** §26.9 and attempt3 log. **I:** this is the main gate.
2. **Side-by-side captures missing/incomplete.** Handover §12 admits the capture script crashed twice and only 3 captures exist; no composite receipt doc. The visual contract is partly covered by laws (S33/N37/S35/viewport matrix), but the Owner-readable image pairs are the artifact the order asked for. **V:** handover says so; `shots/side-by-side/` contains 3 right-side PNGs. **U:** left/w89 pairs and full matrix.
3. **I did not execute batteries/falsifiers.** My review is static: file reads, greps, diff, receipt inspection. I did not run `npm ci`, build, batteries, or falsifiers in this worktree. All green counts are **R** (z.ai receipts), not **V-by-me**. That's appropriate for an advisor review, but it must be labeled.
4. **`VITE_BRAG_URL` is empty by default.** Correct by design (button hides while unset), but the make-live path must set it and the value must match the Architect-pinned hostname. A build shipped with the wrong constant is a silent bad-link bug. **I:** needs a release checklist item with the exact hostname source.
5. **Closeout folder duplicates the S15 tree shape.** `zai-s15-closeout-2026-11-21` sits next to `67-cakepanz-15-WIP-2026-11-21` in the worktree. That is useful for review, but it creates two near-copies of a large tree. **I:** fine on a review branch; the canonical delivery path should be named clearly to avoid future seats editing the wrong copy.
6. **Receipt portability / environment.** The closeout was produced in a sandbox; local macOS execution may differ (Playwright browsers, node version, font rendering, timing). The "fresh machine" rule in README still matters. **I:** re-run on the target environment before trusting visual receipts.

## 4. Further implications (I, grounded in S15 + 76 Pancakes direction)

### A. The shell is becoming a product surface, not a dev harness
S15's work (truthful engine stamp, brag text, dispatchAsync contract, toast truth, a11y button semantics, side-by-side discipline) moves cakepanz from "slice demo" toward "shippable shell". The implication: every future slice should be judged by user-truth invariants, not just "renders". The falsifier culture is the right guardrail; keep it.

### B. The engine/shell seam is the product's most sensitive boundary
The `engineVersion()` stamp fix is a small line with large trust impact: a stale stamp made first-party saves look foreign. Similar seam bugs will be higher leverage than visual polish. Implication: add a "seam truth" checklist for every release (engine version, seed round-trip, save envelope, restore path, URL/share state, mode label).

### C. Brag/share is the growth loop — but only if it is boringly correct
P-209 is right: copy-paste text, no save data, no seed, no download, signed-out works. The build-time URL constant is a good safety move. Implication: make-live needs one explicit gate: `VITE_BRAG_URL` set to the Architect-pinned hostname, verified by a smoke test that pastes and opens the link in a clean profile. Do not let this be an env-var footnote.

### D. "Receipt-complete" should become a machine-readable state
S15's honest gap (13-17b not run) is well documented, but a human has to read §26.9 to know. Implication: write a small `deliveries/STATUS.json` or a top-line receipt stamp (`COMPOSITE_COMPLETE=true/false`, step, bytes hash, date, runner) so the next seat/tool can refuse to treat an incomplete closeout as green.

## 5. Brainstorm — how to improve Cakepanz / the UI-UX shell for Claude's engine (I)

These are proposals, not decisions. They respect the constraints: Claude owns engine/pin; no ratings generation; offline hard requirement; 76 Pancakes brand; model-first; no protected-constant changes.

### 5.1 Draft board: make decision confidence legible
- **"Why this is top 3" as structured chips, not only prose.** The S15 `whyFor` VM source is good. Expose the reason as 1-2 compact chips (e.g. "Need: CB", "Value: +8.2", "Scarcity: 2 left") with a plain-language tooltip. Keeps the board fast to scan.
- **Pick consequence preview.** On hover/focus of a Draft button, show a tiny delta: "fills CB1; next open need: EDGE; next pick in 7". All from existing VM/engine state, no new sim.
- **Undo confidence.** After undo, briefly highlight the restored board state and keep the "Drafted · Undo" toast pattern consistent. The toast-truth fix in S15 is the right baseline; extend the same truth discipline to undo/restore.

### 5.2 Team Select: reduce first-run anxiety
- **Draft-position picker (P-317) should feel like a strategy choice, not a settings field.** Show "Pick 1 = best player, less control later / Pick 32 = more swings, harder start" with a simple visual. No engine change needed beyond the already-planned slot plumbing.
- **Team identity card.** When a team is selected, show its three colors, division, and a plain "what you're walking into" line (roster need summary) derived from engine data. No ratings invented.
- **Seed/share clarity.** S15 already improved seed code behavior. Add a small "This draft is replayable" line near the seed with copy-link action. Make the shareable/replay mental model explicit.

### 5.3 In-season shell: keep the player oriented
- **"Where am I in the story?" rail.** A compact timeline: Draft → Week N → Playoffs → Result. Current screen highlighted, completed steps dimmed. Helps first-time users understand the 76 Pancakes loop.
- **One obvious next action.** Every screen should have one primary CTA and one secondary. Avoid equal-weight buttons competing at decision points.
- **Result screens should teach, not just announce.** On win/loss, show 2-3 engine-grounded reasons ("Run defense held", "OL pressure high", "Turnover swing") pulled from existing recap/sim outputs. No fake narrative generation.

### 5.4 Brag/share: make it a clean loop
- **Pre-make-live guard.** If `VITE_BRAG_URL` is unset, show a dev-only badge in Settings/Share ("Brag link not configured") so it never surprises at release.
- **Copy payload preview.** The user should see exactly what will be copied before pressing copy. S15 moves toward this; keep the preview and clipboard text byte-identical.
- **Alt share modes later (post-v1.1).** Image card/share sheet can be future work, but the text-first P-209 path should remain the canonical no-download fallback.

### 5.5 Accessibility and trust
- **Keyboard draft flow audit.** S15 made the method a native button - good. Next: verify the full pick flow (focus order, announce on pick landed/refused, undo focus return, modal/picker escape) with screen reader smoke tests.
- **Reduced motion is a feature, not a compliance checkbox.** Keep the S15 pattern: motion has meaning, reduced-motion removes motion but preserves state clarity.
- **Error states must be specific and recoverable.** The S32 L-ERR pattern is good. Extend it to save/load/import failures with "what happened / what was preserved / what to do next".

### 5.6 Performance and offline confidence
- **Single-file/dist parity gate.** S15 fixed distfile base handling. Keep a release gate that boots `dist/single.html` from file:// and runs the key smoke path offline.
- **Save-state visibility.** Show last autosave time and what was saved (draft/season slot) in plain language. Trust comes from visibility, not silence.
- **Slow-device budget.** The board is the hot path. Virtualize/render-window only if needed, but first measure: row count, DOM nodes, layout cost on low-end mobile. Do not optimize blind.

### 5.7 What I would not do now (I)
- No new engine tuning, no ratings generation, no protected-constant edits, no KV/R2/account backend in the shell before the Architect contract, no visual redesign that breaks the falsifier/receipt discipline. The shell should get clearer and more truthful before it gets fancier.

## 6. Recommended next actions (no assignments; queue/custodian/Architect decides)

1. **Re-run the full uninterrupted composite at the closeout bytes** and file steps 13–17b in `VERIFY-§26-append.txt` (or a new §26.x) - this is the main unresolved gate. **U until done.**
2. **Run the side-by-side capture script** and file the missing image pairs/receipt; name any environment gaps. **U.**
3. **Make-live checklist item:** pin `VITE_BRAG_URL` to the Architect-approved hostname and smoke-test copy/open. **I.**
4. **Decide the P-209 placement conflict** (per-stage share screen vs season-only brag button) with Owner/Architect ruling; do not churn UI before ruling. **I.**
5. **Add a machine-readable closeout status stamp** (`COMPOSITE_COMPLETE`, bytes hash, receipt path) to prevent incomplete closeouts being read as green. **I.**

## 7. Evidence index (V)

- Git: `7f3b1a9d2` pushed to `origin/council/porca` (this sitting).
- Diff: `diff -rq .../zai-s15-closeout-2026-11-21 .../67-cakepanz-15-WIP-2026-11-21` (many differences; captured).
- Key reads: `deliveries/zai-s15-closeout-handover-2026-11-21.md`, `VERIFY-§26-append.txt` tail, `src/App.svelte`, `src/lib/port/bragText.ts`, `src/lib/components/DraftBoard.svelte`, `src/lib/components/BoardRow.svelte`, `scripts/falsify-board.mjs`, `scripts/distfile.mjs`, `tools/verify-package.mjs`, `vite.config.js`, batteries grep for N36/N37/S34/S35/L31/F27-F31.
- Not run by me: npm ci/build/batteries/falsifiers/composite. Those results are **R** from closeout receipts.
