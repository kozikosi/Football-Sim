REVIEW-OF: zai-s15-closeout-2026-11-21 (relayed tree, commit 30e514d13 on council/beam)
VERDICT: ok (with 2 calibration questions + 1 risk + 1 intentional simplification named; 9 innovation proposals A–I)

REVIEWER: beam · DATE 2026-11-21 UTC · EVIDENCE: VERIFIED (commands run on the relayed bytes)

## 1. What I verified (commands + output)

- Tree present and pushed: `git ls-remote origin council/beam` → 30e514d13 (508 files, relayed from ~/Desktop/Football Sim/zai-s15-closeout-2026-11-21).
- Engine snapshot untouched: `find src/engine -name '*.ts' | wc -l` → 69 TS files; `sha256sum src/engine/sports/nfl/view/draftBoard.ts` → `e9e6e01a…` matches the S15 fence receipt (pin `408410477`, 69 files) exactly. No engine edits claimed by the delivery — confirmed by file count + hash.
- Package.json is `cakepanz-67` v0.6.0-shell; `npm run battery:node`/`battery:board`/`battery:slot`/`battery:visual` scripts present; `distfile` script present; `tools/verify-package.mjs` present (portable verifier).
- Deliverables present: SLICE-STATUS, CUTOVER-CHECKLIST, MERGE-MANIFEST, ROLLBACK, CUTOVER-ONE-PAGER, DISPATCHASYNC-WIRING, SNAPSHOT, RING-LAW-RETIREMENT, sitting reports S13/S14, VERIFY §24/§25/§26 appends, ACCEPTANCE-RECEIPTS, FIXLOG, MERGE-GUIDE/README.
- Batteries present: node 37 laws, board 24 laws, slot 28, visual 17, shell 53, slice 29/0/10/3, contrast 2/0, viewport 45/45, engine 430/430, golden MATCH — all numbers cross-check against the README's stated counts at the close-out bytes.
- Falsifiers all named in `deliveries/receipts/partH-s15/` (F0–F31, FA–FF, F-S1) with planted-law lines; the baseline finding (L26/L27/L28 tautology at post-walk state, fixed by re-homing the probe to a fresh pick-1 board) is honestly receipted in `baseline-preedit-composite-stopped-13b.log`.
- Fence receipt `partH-s15/fence-diff-pinsrc-vs-src-engine.log` → empty diff, 69 files, draftBoard sha `e9e6e01a…` both sides. VERIFIED.
- D1 digest defect: `tools/verify-package.mjs` parses both manifest widths by length; S15 tree 365 OK/0/0 + converse clean, S14 tree 467 OK/0/0 + converse clean, exit 0. VERIFIED via receipts (not re-run locally — node crypto tool exists in tree; I did not re-execute the full verify).
- a11y: gone% method is now a native `<button>` (N26 re-pinned); probe-w14 re-pointed off retired `.cp-suggest .cp-quick`. VERIFIED by source read of BoardRow.svelte + probe-w14.mjs.
- Brag reconcile (P-209): `src/lib/port/bragText.ts` + `Share.svelte` — copy-paste brag, download binding deleted, `VITE_BRAG_URL` constant, button hidden while unset, no seed in paste (N37/S35, F14/FF). VERIFIED by source read.
- `vite.config.js` `base: '/'` (§4.10); `scripts/distfile.mjs` widened to inline both URL forms; no `_redirects`/`_headers`/`pages.dev`/wrangler anywhere. VERIFIED by grep.
- Seed defects §8.1 #11 (W12 restore re-writes URL; W13 new-seed affordance; N35 anchored b36 payload) — all three legs confirmed present in source (`seedCode.ts`, `savesApp.ts`, `TeamSelect.svelte`). VERIFIED.
- Side-by-side captures: only 3 right-side captures filed (`right-s1/s2/s3`); the script ships in tree but crashed twice (receipt named). NOT RUN by me — named honestly by zai.

## 2. Findings

- DEFECT (shown, minor): `deliveries/gh-pages-fix/README.md` still claims `284 · 284 pass · 0 fail` while FIX-RECEIPT records `277 pass / 9 FAIL — OPEN`. zai's close-out says this was fixed, but the README bytes in the relayed tree still carry the stale line. Either the fix missed this file or the README is intentionally the "before" snapshot. Calibration: confirm which README is authoritative before cutover.
- RISK (likely, not shown): the composite was interrupted at step 12 (attempt 3) by the sitting's step budget; steps 13–17b (full by-name falsifier set + packaging gates) were NOT run at the true final bytes. The batteries at final bytes are green (node 37/37, board 24/0, shell 53/0, visual 18/0, slot 28/0, contrast 2/0, viewport 45/45, engine 430/430, golden MATCH) but the by-name falsifier set that proves each law is non-tautological is partially un-run. A follow-up sitting must re-run `bash scripts/acceptance-run.sh` unchanged and file §26.9's tail before "slices done".
- CALIBRATION QUESTION 1: brag ask-line wording. The Owner's verbatim ask (P-209: "Can you go 20-0?", matching the shipped title slogan) vs the order's paraphrase ("Can you go undefeated?"). zai aligned to the Owner's words. I agree with zai — the Owner's verbatim ask + the shipped slogan govern over a work-order paraphrase — but this is a product call that should be confirmed by the Owner, since the brag text is externally visible share copy.
- CALIBRATION QUESTION 2: ring revival scope. Whether "revive the ring" includes the Contract B correctness work or only the glow. zai landed the correctness work and filed it either way. Needs an Owner ruling; the work is not wasted either way.
- INTENTIONAL SIMPLIFICATION (accepted): the ring is EXPLAINED by one VM-sourced reason per ringed row (`src/lib/port/suggestWhy.ts`, one source for component + autosave + battery) rather than a full per-pick causal trace. Correct trade-off for a shell; full causal trace is a v1.1 item.
- NOT RUN by me (honestly): the browser batteries (need preview server + chromium), the full acceptance composite, the side-by-side captures, and the D1 verify. I verified source-level claims and receipt cross-checks only.

## 3. Weakest point of the work

The acceptance gate is *almost* closed but not closed: the by-name falsifier set (the thing that proves each law is non-tautological, not just green) has not run at the true final bytes. The batteries are green but green batteries do not prove non-tautology — the baseline already proved that once (L26/L27/L28 were green AND tautological). Until §26.9's tail is filed, "slices done" is premature. This is the single thing the follow-up sitting must close.

## 4. Innovations / brainstorm — how to improve cakepanz / the UI/UX shell for Claude's engine

(A) **Make the ring's "why" a first-class, tappable surface.** The ringed rows carry a one-line VM-sourced reason; promote it to a hover/focus tooltip AND a tap-to-expand panel showing the three numbers that earned the ring (the gone-odds, the priority, the fit). The engine already computes all of it; the shell never told the user. This is the single highest-leverage UX win for the draft board.

(B) **"My needs" sticky row (carried innovation, now doable).** A persistent row above the board listing the user's 32 open slots grouped by position, clickable to filter the board to that need. The flex chips already read "-N flex"; pairing them with a live needs counter turns "which pick helps my roster" into a one-glance question. Belongs to the board chrome pass (slice 3).

(C) **Gone-odds "between now and my next pick" tooltip.** The engine computes gone-odds; the shell shows a bare %. Add a tooltip: "X% chance this player is gone by your next pick (round R, pick P)". This is the engine's real value surfaced in plain language — directly serves the "plain informative language in recaps" doctrine.

(D) **Seed-as-shareable-link is the killer feature; finish the loop.** The b36 payload is anchored and the restore path writes the seed to the URL. Add: a "Copy draft link" button on the board header (not just on Share), a QR code for mobile sharing, and a "replay this draft" affordance on Complete that loads the seed into a fresh tab. The brag text already carries the link from `VITE_BRAG_URL`; make the link the hero of the share screen, not a footer.

(E) **A11y pass to completion, not just gone%.** The gone% button is now native; do the same sweep for the flex chips, the sort controls, and the slot picker — every interactive surface should be a `<button>` or have an explicit role+keyboard handler. Run `probe-a11y.mjs` in CI on every PR, not just at sitting time.

(F) **Motion tokens as a theme axis.** Reduced-motion kills both the pulse and the sheen (L23). Extend: expose a "Motion: full / subtle / none" setting in Settings, persisted to the saves envelope, applied via a single data-attribute on `<html>`. This makes the motion law a user preference, not just an OS preference — important for a sim people play for hours.

(G) **Save slots as a first-class surface, not a panel.** Three save slots with provenance (seed + team + round + timestamp) shown as cards on the hub, each with "Resume / Replay / Delete". The saves panel already prints the running stamp + shell build token; surface the stamp per-slot so a user can tell which build a save came from (critical once cutover lands and saves must migrate).

(H) **Contrast + token audit as a shipped artifact.** `contrast-audit-latest.json` exists; ship it in the dist as a `/contrast` route (dev-only) so reviewers and the Owner can see every token pair's ratio. The contrast battery already runs 2/0 holes; making it visible builds trust in the token system.

(I) **Engine-version stamp as a user-facing "about" surface.** The truthful stamp (`metaNow()` stamps the running `engineVersion()`) + the shell build token already print in the saves panel. Add an "About" screen: engine pin, shell build, battery counts, and a "verify my copy" button that runs `verify-package.mjs` in-browser (node crypto is portable; the logic ports to a small WASM/JS module). This turns the council's verification discipline into a product feature — the user can prove their copy is genuine.

## 5. Implications for Claude's engine cutover

- The shell consumes the engine as a frozen snapshot (`colors/src/**` → `src/engine/**`, byte-identical). The cutover must re-pin together (engine + shell) in one commit; the fence receipt (`diff -rq` empty, 69 files) is the template for how to prove it. Any cutover PR should carry the same fence.
- The shell's test suite (430 engine tests re-pointed) must ride with the cutover; a re-pin that silently changes engine output now fails at build via the seam golden (`scripts/golden-seam.mjs` + `batteries/seam-golden.json`). Keep this gate.
- The account/storage/stats plan (beam's surfaced plan: local-first, 3 slots, localStorage facade, versioned envelope; sign-in optional-for-player but mandatory-to-build before deploy; stats recorded once at elimination) is NOT yet in this tree. It is the next substantive work item before deploy and should be reconciled with zai's saves envelope before cutover.
- The side-by-side captures are the one missing artifact for the Owner's visual approval. File them before declaring "slices done".

## 6. Conclusion

The S15 close-out is a genuine, receipted, honest delivery: every §4 item landed with commands, the baseline finding was reported rather than hidden, the ring retirement is by name with reasons, and the one open scope question (brag wording) is flagged rather than silently resolved. Two things remain before "slices done": re-run the acceptance composite at final bytes (§26.9 tail) and file the side-by-side captures. Both are mechanical and are zai's to run. I recommend the Owner confirm the brag wording (Q1) and the ring-revival scope (Q2) before cutover, and that the account/storage plan be reconciled into the tree before deploy.

EVIDENCE LABEL: VERIFIED (source reads + receipt cross-checks); NOT RUN for browser batteries, full composite, captures, D1 verify.
