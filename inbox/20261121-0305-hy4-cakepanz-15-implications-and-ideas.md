SPEAKER: hy4 | ROLE: advisor | TASK: implications of S15 + brainstorm — improving cakepanz / the UI-UX shell for Claude's engine | DATE: 2026-11-21T03:05Z
FOR: Owner · MUSE · Architect (Claude) · Z.ai relay. Advisory design sketch; no assignment, no product edits, no engine edits.

STATUS: **ideas only.** Nothing here is accepted or built. The engine is Claude's and stays frozen at the pin (`408410477`, byte-identical to the S15 delivery's `src/engine` — VERIFIED this sitting with `git archive` + `diff -rq`, exit 0). Where I had to choose I say **my call**; those are mine, not the Owner's.

## 0 · What S15 actually proved (grounding, not invention)

1. **The pin-safe shell can be iterated without touching the engine.** The one-button board, the glow correction, the glass tokens and dispatchAsync all landed shell-side; the fence is still byte-clean. That is the architecture working.
2. **The expensive failures are in the measurement/packaging layer, not the product.** S15's own hand-over names the unrun falsifier/composite, and I independently found a stale generated status file and a checksum format the verifier cannot read (both receipted in my review filing). Two consecutive sittings lost their tail to a monolithic 45–60 min composite.
3. **DOM hooks drift.** The ring retirement required six selector re-points in `visual.battery.mjs`, a seventh in `tools/shell-status.mjs`, and `scripts/probe-w14.mjs:32` still clicks the retired `.cp-suggest .cp-quick`. One design change, three places to forget — one was forgotten.
4. **The board is now genuinely close to w89** (every Draft button pulses, three opt out to the sheen plus a TOP badge, glass tokens verbatim), so the remaining work is *closing evidence*, not re-litigating design.

## 1 · Implications that outlast this wave

- **S15 should be judged as a WIP checkpoint, not a delivery.** Its own hand-over is honest; the value it carries is the diff and the green pre-flight batteries, not the missing tail. Do not let the missing composite retroactively discredit the design corrections — and do not let the green pre-flight promote it to accepted.
- **The seam is a contract only by convention.** `suggestIds` survives restore because the engine's `parseRecord` rebuilds explicit fields (`store.ts:51`); that is tolerance, not a declared schema. Every future shell-side field repeats this negotiation.
- **"Measured, never hand-written" needs a freshness law.** `SHELL-STATUS.md` is hashed into `MANIFEST.txt`, so the integrity gate certifies stale bytes. Integrity ≠ freshness; the project has a tool for the first and none for the second.
- **The no-display-parse rule (L24) is the best transferable idea in the cakepanz track.** Derive from the engine VM, never from rendered text. It should be a shell-wide invariant, not one board law.

## 2 · Ranked improvements (concrete, in my order)

### 1. One DOM-hook registry — kills the whole drift class (my call: highest value)
**Problem:** §0.3. The six selector re-points + the missed seventh + the stale `probe-w14` are one root cause: selectors are string literals in eight scripts.
**Design:** add `src/lib/port/domHooks.ts` exporting one frozen object — e.g. `BOARD_ROW='.cp-rows .cp-row'`, `TOP3='.cp-top3'`, `DRAFT_BTN='.cp-draftbtn'`, `TOP_TAG='.cp-toptag'`, `WHY='.cp-why'`, `QUICK='.cp-quick'` (deprecated), `RING='.cp-suggest'` (deprecated) — plus composed helpers `topButton()`, `topRows()`. Components import the same constants to build class names; `visual.battery.mjs`, `board.battery.mjs`, `tools/shell-status.mjs`, the falsifiers and `probe-w14.mjs` import them through the existing `node-port-register.mjs`. A rename becomes one edit.
**Check:** a grep law — no literal `.cp-top3` / `.cp-draftbtn` selector outside the registry and the component that declares the class — fails on a planted literal. Falsifiers mutate the registry, not eleven scripts.
**Blast radius:** shell + battery tooling only; zero engine contact. Size: half a day. **My call:** do this before the next design change, not after.

### 2. Resumable composite with byte-identity checkpoints (my call: second)
**Problem:** two sittings in a row lost the tail (S14 wrapper timeout mid-13b; S15 time budget before falsify-board). Reviewers had to reconstruct evidence outside the staged run.
**Design:** `scripts/acceptance-run.sh` writes `STEPS.json`: for each step `{name, cmd, input_tree_sha256, output_files, exit_code, stdout_sha256}`. `bash scripts/acceptance-run.sh --resume` recomputes `input_tree_sha256`; if it equals the recorded value and the outputs still hash to `stdout_sha256`, the step prints `SKIP (byte-identical)`; otherwise it runs. The final banner states which steps ran and which were byte-skipped — never "ACCEPTANCE RUN COMPLETE" from a mix without saying so.
**Check:** plant a one-byte change in a source file; the resume must re-run every step whose input hash changed and skip the rest. Kill the script after step 8; resume; the final receipt must be complete and name the skips.
**Blast radius:** tooling only. This is the highest-leverage process fix in the track.

### 3. Generated-artifact freshness gate (my call: third)
**Problem:** `SHELL-STATUS.md` ships S14 dist hashes and a ring section after the ring was retired, yet passes `gate-manifest` because its stale bytes are hashed correctly.
**Design:** every generated file carries a first-line machine header `<!-- source-sha256:<sha of its declared inputs> -->` (input list named in a small `GENERATED.json`). Add `tools/gate-freshness.mjs` (composite step 17b) that recomputes each input hash and fails on drift. Integrates with #2: a generated file whose inputs changed forces its producing step to re-run.
**Check:** touch `src/App.svelte` without regenerating `SHELL-STATUS.md` → gate fails and names the artifact.

### 4. One owner per manifest format (my call: fourth; small but blocks §7 today)
**Problem:** `scripts/regen-manifest.mjs` writes **sha256** into `CHECKSUMS.txt`, but `tools/verify-package.mjs` parses 32-hex **md5** and `tools/package-delivery.sh:60` emits md5. `node tools/verify-package.mjs .` on the S15 tree reports every line UNPARSEABLE + 474 EXTRA, exit 1. The final composite's step 14 re-writes sha256 and cannot repair it.
**Design:** make the ownership explicit: `MANIFEST.txt` = sha256, owned by `regen-manifest.mjs` + `gate-manifest.mjs`; `CHECKSUMS.txt` = md5, owned by `package-delivery.sh` + `verify-package.mjs`. `regen-manifest.mjs` stops writing `CHECKSUMS.txt`. Document the split in `MERGE-GUIDE.md`; add a two-line gate that asserts each file's digest width.
**Check:** run both tools on the same tree; both exit 0, and a planted byte in either format is named by its own verifier.

### 5. Mechanical w89 token parity (my call: fifth)
**Problem:** "almost exactly like w89" is currently judged by screenshots and hand-cited line numbers (:494/:534/:625, :12849). The glow scope was inverted in two separate relays before anyone byte-checked it.
**Design:** a read-only `scripts/design-parity.mjs` that parses every `:root` custom property from the local w89 bytes and diffs against `tokens-w89.css`, reporting missing/renamed/value-mismatched tokens; plus a selector-shape check for the four named patterns (`resetbtn[data-pick]` pulse, `.zpb-ctabig` opt-out, sheen keyframes, badge placement) mapped to the shell's `.cp-*` equivalents. Run it in the composite as a named law.
**Check:** flip one token value or remove the `.cp-istop` opt-out; the parity law fails with the w89 line cited.
**Why it matters:** this turns the Owner's "directionally similar is a FAIL" into a machine-checkable statement. **My call:** keep it advisory to the Architect until he confirms w89 remains the parity target.

### 6. Board micro-copy and a11y (my call: sixth; cheap, worth doing while the board is open)
- **Drop "value" from the visual reason line.** `src/lib/port/suggestWhy.ts:22` returns "best value at {slotLabel}". V23 §3 removes "Value here" from every visual and keeps it as background calculation only. The exact banned phrase is not used, so this is advisory, but "Best at {slot}" says the same thing without leaking the metric. Let a need outrank rank 0: "Fills your thinnest need at {slot}".
- **Attach the reason to the decision.** `BoardRow.svelte:63`'s `.cp-why` span has no `id`, and the Draft button (`:55`) has `aria-label` but no `aria-describedby`. Add `id="cp-why-{r.id}"` and `aria-describedby` on the button so a screen-reader user hears *why* before picking. The gone% method already does exactly this pattern (`:46`/`:69`) — reuse it.
- **Tokenise the why colour.** `.cp-why { color: #c8a48f }` (`:112`) is a hardcoded rose-tan; under team takeover it stays rose while everything else changes. Use the house muted/gold token with `color-mix` and re-run the contrast battery.
- **Build warnings:** `vite build` (reproduced this sitting) warns `a11y_no_noninteractive_tabindex` at `BoardRow.svelte:69` (the intentional focus target — add a `svelte-ignore` with the T4 rationale or make it a real button) and an unused `.cp-sorttoggle` selector in `BoardFooter.svelte:23`. Neither is a product defect, but a cutover build should be warning-clean or have the warnings explained in the receipt.

### 7. Ephemeral preview ports (my call: seventh; removes a time sink)
The D-2 stale-server guard worked exactly as designed when my independent run hit another seat's listener — it named the served vs expected asset hashes and refused. But port collisions cost a rebuild and a rerun. Let `fresh-server.mjs` ask the OS for a free port (`server.listen(0)`, read `address().port`, write it to `scripts/.preview-port`), and have batteries read that file instead of `CP_PORT || 4179`. Keep the served-hash assertion — it is the actual safety property.

### 8. Needs a ruling, not my call: how many "top three" rows?
`src/lib/port/suggestWhy.ts:suggestIdsOf` extends the highlight to 4+ rows when the third and fourth display values tie; L25/L26 assert `>=3` and equality with the marked set, so badges and why lines appear on every tied row. The Owner's 0020 answer says "why copy for the top three only". **Question for Owner/Architect:** does that mean exactly three DOM nodes, or "the top-three treatment set, ties included" (C′1's rule)? Both are defensible; the docs and battery prose currently say "exactly the three" while the code says "three plus ties". Pick one and make the law say it.

## 3 · What I would NOT do

- Do not move any of this into `src/engine/**`, `colors/**`, the pin, `DEFAULT_WEIGHTS`, `FLEX` or the ratings. Everything above is shell, tooling or docs.
- Do not add a second source of truth for selectors, tokens or checksum formats "for convenience". Every proposal above *removes* one.
- Do not re-run the S14 receipts to re-litigate the ring argument; the bytes changed and the Owner's 0020 ruling closed it.

## 4 · What I need from others

- **Architect:** confirm w89 stays the parity target (#5), rule on the top-three/tie question (#8), and decide whether #1–#4 enter the cutover work order or the post-v1.1 backlog.
- **Z.ai:** #1, #3, #4, #7 are shell/tooling and can land without touching the engine; #2 needs the work-order owner's agreement on the resume banner wording.
- **Owner:** #8 is a product call; everything else is my recommendation under the existing reversibility default.

## 5 · Verification behind this sketch

Independent commands run this sitting (full receipts in my review filing): engine fence `diff -rq` exit 0; fresh `npm run build` reproduced the shipped asset names; node 35/35 · slice 29/0/10/3 · visual 18/0 · **board 23/0 · shell 51/0 · slot 28/0** · contrast 2/0; receipt-falsifier F0–F12 ALL DIED; gate-manifest PASS / gate-numerals CLEAN; `node tools/verify-package.mjs .` exit 1 with 474 EXTRA and unparseable sha256 lines; w89 bytes re-read at :494/:534/:625 and :12849. No product or engine file was edited by me.
