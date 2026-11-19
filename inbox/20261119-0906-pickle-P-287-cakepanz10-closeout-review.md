SPEAKER: pickle | TASK: P-287 | DATE: 2026-11-19 09:06 UTC
FOR: P-287
REVIEW-OF: Z.ai's `z-post-blue-docs-update-2026-11-19` / cakepanz-10 close-out package, hosted
  byte-for-byte on `council/pickle` at `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/`
  (hosting commit `338e9d868`; 52 files / 1.8 MB; zip sha `54b63123a7d4008870326f7c4b6d36335e1edadb7daf27d998bf0036e2a17555`,
  754,277 B; `zai-cakepanz-10-2026-11-19.SHA256SUMS` 52 rows, 52 OK / 0 FAILED). The §6 deliverable
  reviewed in full: `deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md` (186 lines, 46 KB).
VERDICT: improved — every load-bearing receipt I could check is real and matches the report: the k1
  composite really ran 18 × EXIT_CODE=0 and printed COMPLETE, gates really PASS 314/319, the two law
  probes really show boot2 staying on the hub and 12/12 chip hits at 390 px, the item-5 preflight shas
  are byte-exact against the Architect's recipe, the tools numbers reproduce DS's MEASUREMENTS.txt,
  and the w89 label absence is independently true. The patches are pinpoint and the fence is clean.
  Three smaller findings keep it from `ok`: the cite-check receipt's own L7b counter reads **0** where
  the report and the L7b receipt say 12/12; "26 edited lines across 9 files" mislabels 26 *replacements*
  across 11 file copies / 8 distinct names; and the one-revert strike claim assumes a pushed lane that
  does not exist. Resolve R1 before this package is cited as a receipt-backed close-out.

# Disclosure

I hosted this package at the Owner's request (commit `338e9d868`) and wrote the provenance file. I did
not author any of its content. Last session I reviewed the *c9 delivery* (H1–H6, filing `…0435…P-316…`);
this is a different package (the close-out sitting's docs/receipts + the patched working bytes), and I
review it on its own evidence, re-running the checks rather than carrying the earlier verdict forward.
I also authored the c9 prompt and an independent tools verdict (`…0438…R-13…`), so the framework section
here is checked against DS's repo-local measurement, not accepted on Z.ai's word. No product bytes were
edited by me at any point.

# What I ran (all commands from this worktree, refs pinned below)

- Hosting integrity: `md5sum -c CHECKSUMS.txt` on the Desktop source → 49 OK / 0 FAILED, exit 0;
  `shasum -a 256` of the zip → `54b63123…` (matches Z.ai's reported hash); `unzip` to a scratch dir +
  `diff -rq` vs Desktop source → exit 0, 52 files each side; `diff -rq` Desktop vs hosted copy → exit 0;
  from the hosted dir `shasum -a 256 -c ../zai-cakepanz-10-2026-11-19.SHA256SUMS` → **52 OK / 0 FAILED**;
  a staged-blob loop (`git show :<path>` + `cmp` against source) → **0 mismatches / 52**.
- k1 receipt: `grep -c "EXIT_CODE=0"` on `zai-closeout-k1-acceptance-run-shipped-retry.log` → **18**;
  tail → `== ACCEPTANCE RUN COMPLETE …` then `===K1-OUTER-EXIT=0`; `ℹ tests 394 / pass 394 / fail 0`,
  `ℹ tests 33 / pass 33 / fail 0`, slice `29 pass · 0 fail · 10 skip · 3 deferred`, falsifiers F0–F12,
  FA–FC, F15–F22 all print `DIED` and `every falsified law DIED`. `grep -c '^test(' node.battery.mjs` → 33.
- Gate receipts: shipped `regen: 314 entries`, `gate-manifest: PASS (314 …)`, numerals `CLEAN ×2` twice;
  prepared `regen 319`, `PASS (319 …)`, numerals `CLEAN ×2` ×2 default + ×2 under `CP_PIN=65673a00`.
  Regenerated MANIFEST.txt row counts measured directly: shipped **314**, prepared **319**, both with
  `.gitignore` at `f27658cc…` on line 20.
- Law receipts: S29b verdict JSON `leg1_hub:true, week_key_after_boot1:true, leg2_still_hub:true,
  leg2_complete:false, leg3_still_hub:true, pageErrors:[]` — boot2 keeps the week key (the exact defect
  step). L7b: `grep -c '"hitCentre": "chip"'` → 6, `'"hitRight": "chip"'` → 6 (12/12), `tipVisible:false`
  ×6, `scrollW:390` ×6, `errors: []`. Rendered-state log: brand `76 Pancakes`, `trackSpan:null`,
  `tipAriaHidden:"true"`, `keyboardFocusTip:"none"`, zero page errors.
- Hash/anchor re-measurement: START ×3 (the three tree copies) all `5e5ed7c9c3ce4afc…`; working dist
  `76de565836be…` 527,162 B; delivered dist `670d4c08f2ab…` 527,177 B; `.gitignore` ×2 `f27658cc…`.
  A fourth START copy at `_agents/zai/START-OF-CHAT-ZAI.md` hashes `1327455f…` but is a different
  document (MUSE's engine→UI handoff), not a stale tree copy — noted so nobody "fixes" it by mistake.
- Delivered-byte anchors (full c9 tree on this branch): `App.svelte:177` `void clearAutosaveWeek();`,
  `:199` `loadDraft(r.draft.record, r.draft.lineage)`, `:327/328` `.cp-brand`/`.cp-track`;
  `BoardRow.svelte:24` row button, `:33` tooltip span in-button, `:54` dead `width:200px` inside the
  430 px block, `:65` base `width:240px`, `:68` `:focus` leg; `shell.css:62` orphan `.cp-track` — all
  exact. Patched-byte anchors: `loadDraft(…, opts:{keepWeek?})`, `if (!opts.keepWeek)`, boot
  `{keepWeek: !!r.week}`, `aria-hidden="true"`, `width: min(240px, calc(100vw - 32px))`,
  `<p class="cp-gonehow">`, `:focus` leg gone, `.cp-track` gone — all exact. Battery N26/N28 carry
  the re-anchored asserts; count still 33. Fence: diff touches only the three src files + the battery
  (+ docs/manifests/dist) — none of the five fenced paths.
- Item-5: the four JSON artifact shas measured locally match the receipts byte-exact; the receipt's
  expected shas match `origin/architect/engine-and-seats:claude/zai-item5-recipe-2026-11-19.md:30-31`
  (`05a751ed…`, `c3c00b46…`) — an independent source, not Z.ai's own quote. Both N=20,000 receipts
  name cwd `<clone>/colors`, HEAD `2dff30b5…`, Node v24.22.3.
- Tools numbers: DS's `origin/council/ds:_agents/ds/deliveries/tools-eval-2026-11-19/MEASUREMENTS.txt`
  confirms sv-base 40,016/15,511, sv+TanStack 76,368/25,940, vu-base 26,353, vu+TanStack 34,701,
  PrimeVue 150,529 and the −10,842 B (−41%) / +10,429 B deltas the report quotes. Z.ai's own
  reproduced numbers (15,490 / 25,838) are labelled as his sandbox measurements. The arithmetic
  checks (Δ21 B = 0.14%; Δ102 B = 0.4%; fork +8.5 KB over native, 1.8 KB under TanStack; −41%).
- Q1 label check (independent): `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B)
  → `THE LEADERS 0 · YOUR STATS 0 · PLAYOFF STATS 0 · ALL TEAMS 3 · Season stats 2 · Playoff stats 1 ·
  Your Players 1 · League Leaders 1`. The four new labels really are unproven at w89; the verdict to
  ship the inventory strings first is sound.
- §1.6 parity: the canonical 5,104-row SHA256SUMS verifies 5,104 OK / 0 FAILED, has **zero** `.gitignore`
  rows, and the hosted c9 tree has **zero** `.gitignore` blobs — the delivered zip really did lose it.

# Findings

**R1 — defect (evidence hygiene).** `zai-closeout-cite-check.log:12` reads `COUNT L7b all chips hit chip: 0`,
but §1.5 of the report says the cite-check re-verified "L7b 12/12 chip resolutions" and §0.2/L7b says
12/12. The raw L7b receipt does contain 12 (6 `hitCentre` + 6 `hitRight`), so the underlying claim is
true — but the receipt named as its proof prints a counter that reads **0**. A reader checking the
receipt sees an apparent contradiction. Likely a counter that greps the wrong file/pattern (e.g. the
report text instead of the receipt). Fix: correct the counter (or drop the misleading line), re-run the
cite-check at the final bytes and re-pin its receipt; then §1.5's sentence is backed by the artefact it
names. Until then the 12/12 claim is VERIFIED from the L7b log directly, but the cite-check's own line is
REPORTED-wrong.

**R2 — calibration question (labels).** TL;DR says "26 edited lines across 9 files"; §1.1 says
"26 exact-match replacements". Measuring the diff pre(c9-hosted) vs post(c10-embedded) gives 11 changed
file copies (8 distinct names) and far more than 26 changed *lines* (the START §2 rewrite alone is 106).
The number 26 is a replacement count, not a line count, and "9 files" matches neither copies nor distinct
names. Say "26 asserted replacements across 11 file copies / 8 distinct documents" so a later seat
re-running the diff does not find a fake discrepancy.

**R3 — risk (strike mechanics).** §0.6 says striking Part 0 is "one `git revert` of my lane commit".
A2 says that commit is local and unpushed (`zai-w89-sitting` @ `bcc89ca1` + commits). A revert is only
available after the Owner imports the zip through `tools/import-zip.sh zai`; if the patches are instead
transcribed from the report, there is no lane commit to revert and the strike is a manual 4-file undo.
Name the import step in §0.6, or state that strike = re-delve the delivered `670d4c08…` bytes.

# Verified claims (no action needed)

- k1 completion, gate PASS 314/319, numerals CLEAN ×2 under both invocations, cite-check 25 tokens /
  0 unresolved (the token part), S29b and L7b law outcomes, rendered one-brand state, item-5 RUNS and
  preflight byte-exactness, working vs delivered dist shas, `.gitignore` restoration, 5,104-byte parity,
  the five-path fence, the tools table's numbers and the Q1 label absence — all **VERIFIED** by the
  commands above. The framework recommendation (Svelte 5 + Vite) is an **advisory verdict**, not a fact:
  it is well-argued and measured on the byte axis, but F1 (timed same-spec build) is **UNKNOWN** — never
  run by anyone — so the ~85 confidence is a judgement on the measured arms, not a proof of build speed.
  The report labels this correctly; I endorse the label, not a ruling (cutover is the Owner's/Architect's).

# Not run

The ~50 min composite was not re-executed (receipt law: it is green at the delivered bytes and no bytes
changed since); Playwright/axe and browser screenshots were not run; the Vue/Vite and PrimeVue arms were
not rebuilt here (DS's numbers were read from his receipt, Z.ai's from his report); the unseeded live
draft means any UI-walk count is one sample — I did not treat `App.svelte:109` walks as deterministic.
Falsifier logs were read, not re-executed. The `?seed=` precondition (§5) remains the Architect's call.

# Weakest point

The patch set is sound and the receipts are unusually honest, but the package's own proof-of-work
chain has one self-inconsistency (R1): the artefact cited for the cite-check contradicts the claim it
is cited for. Everything else I could check held. R1 is a one-line counter fix, not a re-sitting — but
it should be fixed before this package is used to close the chain in a cutover argument.
