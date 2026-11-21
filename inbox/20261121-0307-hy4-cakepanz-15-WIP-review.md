SPEAKER: hy4 | ROLE: advisor | TASK: thorough review of the 67-cakepanz-15-WIP-2026-11-21 delivery | DATE: 2026-11-21T03:07Z
FOR: Owner · MUSE · Architect (Claude) · Z.ai relay. Review of a WIP checkpoint; no assignment, no product/engine edits.

REVIEW-OF: `67-cakepanz-15-WIP-2026-11-21/` as mirrored on `council/hy4 @ e9ceeef8b` from the Owner's desktop folder (545 files, 18 MB).
SCOPE: the S15 diff, its hand-over, its receipts, the engine fence, the w89 parity claims and the §7 packaging state.
VERDICT: **ok on the claims — NOT ACCEPTABLE as a final delivery.** The hand-over is honest about being WIP; every claim I could check is true. But five blocking gaps (one a concrete packaging defect the planned final composite will *not* fix) stand between this tree and acceptance.
FOUND: 13 · NEW: 10 (5 blocking, 4 advisory, 1 governance).

## 0 · Commands I actually ran (all VERIFIED this sitting unless labelled)

| claim | command | result |
|---|---|---|
| mirror fidelity + publish | `cp -a <desktop folder> <worktree>; diff -rq …; git add -- …; git push origin council/hy4; git ls-remote …` | `DIFF_EXIT=0`, 545 files; push `793bb6384..e9ceeef8b`; ls-remote = local HEAD `e9ceeef8b…` |
| engine fence | `git archive 408410477 colors/src \| tar -x …; diff -rq …/colors/src …/src/engine` | **exit 0** — the delivery carries the pin byte-for-byte; `git cat-file -t 408410477` = commit, its `colors/src` tree `8d8a8a1e…` |
| rebuild reproduces shipped dist | fresh `npm run build` + `node scripts/distfile.mjs` in a temp copy | asset names reproduced exactly: `index-CM0BV8P2.css`, `index-C1mEyjqB.js`, `single.html` 525.5 KB, "no external refs: true" |
| node battery | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | **35 pass / 0 fail** |
| slice battery | same register, `batteries/slice1.battery.mjs` | **29 pass / 0 fail / 10 skip / 3 deferred** |
| contrast guardrail | `batteries/contrast.battery.mjs` | **2 pass / 0 fail**, 3 KNOWN holes, 0 new |
| visual battery (browser) | fresh preview on an unused port + `batteries/visual.battery.mjs` | **18 pass / 0 fail**, seeds a3f2/k1x9 |
| board / shell / slot batteries (browser) | same fresh preview, each via `node-port-register.mjs` | **board 23 pass / 0 fail** · **shell 51 pass / 0 fail** · **slot 28 pass / 0 fail / 0 skip** |
| receipt falsifier F0–F12 | `node scripts/receipt-falsifier.mjs` in a clean temp copy | F0 baseline OK; **F1–F12 ALL DIED** by name; "every falsified law DIED"; exit 0 |
| gate-manifest / gate-numerals / gate-table | the three scripts in `scripts/` | PASS (359 entries, dist covered, converse clean) · CLEAN ×2 · gate-table emits S14 counts (see F5) |
| S14-bytes composite receipts | `grep -c 'EXIT_CODE=0' ACCEPTANCE-RECEIPTS.txt; grep 'EXIT_CODE=' \| grep -v '=0'` | **23** zero-exit lines, **no** non-zero, banner "ACCEPTANCE RUN COMPLETE". The §5.2 gap is genuinely closed |
| w89 glow bytes | `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` :12849–12855 | `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s…}`, `.zpb-ctabig{animation:none}` — S15's shell.css:189–199 ports this correctly (every `.cp-draftbtn` pulses, `.cp-istop` opts out, reduced-motion kills both) |
| w89 glass bytes | w89 :494/:534/:625 vs `tokens-w89.css:53-55,123-124,198` | `--glass/--glassbd/--shadow` verbatim in both modes; `.panel` structure 22px + blur(14px) saturate(1.2) |
| dispatchAsync migration | read `src/engine/**/store.ts:142-154` and `src/App.svelte:163,199,212,250` | `dispatchAsync` serialises calls; all four shell sites await it, `busy` guards, `error = st.error ?? ''` at each; `setSort` clears `savedSuggest` (:221) |
| selector re-point | grep `visual.battery.mjs` + `tools/shell-status.mjs` | six `.cp-top3 .cp-draftbtn` sites (:102/179/203/210/234/296) + the seventh at `shell-status.mjs:114` |

## 1 · What is genuinely done (not collapsed into "accepted")

- The **three Owner 0020 rulings** are in the bytes: top-three highlight lives in the button (`.cp-draftbtn` names the slot), why copy rides only the marked rows, and glow is separated from a `.cp-toptag` TOP badge placed in the name cell (w89 :6488 pattern).
- The **glow-scope inversion is corrected** — this was the defect in both my v8 relay and Claude's `dfdb887`; S15 ports w89's "every button pulses, top three graduate to sheen" faithfully.
- **dispatchAsync is migrated at all four sites together** with a busy gate and the self-clearing-error law; the `as any` is gone; the pickle F4 sort-after-restore fix is present.
- **The engine fence is untouched and byte-proven.** Zero edits to `src/engine/**`, pin, ratings or protected constants.
- The hand-over's "NOT DONE" list matches reality. This is a good-faith WIP checkpoint, not an overclaim.

## 2 · BLOCKING findings

**F1 — the shipped CHECKSUMS.txt cannot be read by its own verifier (NEW, packaging, VERIFIED).**
`CHECKSUMS.txt` holds 64-hex **sha256** digests; `tools/verify-package.mjs:29,46` parses only 32-hex **md5** (`/^([0-9a-f]{32})\s\s?(.+)$/`). Command: `node tools/verify-package.mjs .` → every line `UNPARSEABLE`, **`474 EXTRA file(s) … exit 1`**. The S14 mirror's CHECKSUMS is md5 and verified 467/467; S15 switched format when `scripts/regen-manifest.mjs` (composite step 14) wrote it with `sha256`, while `tools/package-delivery.sh:60` emits md5. **The planned final composite re-runs step 14 and will reproduce sha256 again — it cannot repair this.** Fix: give each format one owner (`MANIFEST.txt` sha256 for gate-manifest; `CHECKSUMS.txt` md5 for verify-package), or teach verify-package both digests. Until then §7 packaging cannot pass.

**F2 — the S15 final pipeline is unrun (declared, VERIFIED).** `ACCEPTANCE-RECEIPTS.txt` is the **S14-bytes** run (23/23, honest banner); the S15 pre-flight batteries are green but `falsify-board` (F27–F30 must DIE), the final composite, gate-table/doc regen and §7 packaging are absent. `gate-table.mjs` itself prints "S15 measured (the final bytes …)" over S14 numbers — a misleading label until the final composite lands. Acceptance must wait for the uninterrupted run.

**F3 — `SHELL-STATUS.md` ships stale measurements (NEW, VERIFIED).** It was regenerated at `2026-11-21T02:01:03Z` but reports `dist/assets/index-BXNAqTAg.css` / `index-BZF5JLE6.js` — neither exists in `dist/` (actual: `index-CM0BV8P2.css` / `index-C1mEyjqB.js`, reproduced exactly by my fresh build). So it measured an **intermediate build**, not the shipped bytes. Its "ring at a fixed seed … 4 rows" section also keeps the retired "ring" name even though `shell-status.mjs:114` was re-pointed to `.cp-top3` (the four are tie-extended top rows, C′1). The file is listed in `CHECKSUMS.txt:114`, so the integrity gate certifies stale bytes: **integrity is not freshness**. Composite step 13d regenerates it; the final tree must ship a copy regenerated *after* the final build, and the generator label should say "top-three rows" not "ring".

**F4 — `scripts/probe-w14.mjs:32` still clicks the retired classes (NEW, VERIFIED).** It uses `.cp-rows .cp-row.cp-suggest .cp-quick`, but L28 asserts zero `cp-suggest` and zero `cp-quick` nodes — the locator can never match. It is not called by `acceptance-run.sh`, which is why the six-selector sweep missed it, yet `deliverables/MERGE-MANIFEST.md:21` lists it among the tooling that moves to `colors/scripts/` on merge. Re-point to `.cp-top3 .cp-draftbtn` or retire it as superseded by the visual battery's W14.

**F5 — the cutover docs describe the S14 design (declared + quantified, VERIFIED).** `CUTOVER-CHECKLIST.md:20/22/23` = 16/0, 17/0, 48/0; `CUTOVER-ONE-PAGER.md:31/33/34` = 16/0, 17/0, 48/0; `SLICE-STATUS-2026-11-20.md:16` still says "the ring on the top-3", "Tab order main→quick→method" and node 33/33 / board 15/0. These are not just stale counts — they instruct a builder to run and expect the retired design. §4 regen from the final receipts is required.

## 3 · Non-blocking findings (advisory)

- **F6 — "top three only" is ambiguous in code.** `suggestIdsOf` (`suggestWhy.ts:29-41`) extends the highlight/why lines to 4+ rows on display-rounded ties; L25/L26 assert `>=3` and set equality, so all tied rows get a TOP badge and reason. The Owner's 0020 answer says "why copy for the top three only"; C′1 says "more than three only on a tie". Both readings exist; the battery prose says "exactly the three" while the code says "three plus ties". Needs an Owner/Architect ruling, not a silent change.
- **F7 — the reason line is generic and uses "value" language.** `suggestWhy.ts:22` = "best value at {slot}", :24 = "most Wins left". V23 §3 removes "Value here" from every visual (background calculation only) — the exact banned phrase is absent, so this is advisory, but "why would I select *this player*" is not answered by a board-metric label. My 0020 filing read the Owner's answer alongside w89's why-chip (`:9840`: plan text, percentage, `the math's pick` / `−X.X pts vs. best`); if that reading stands, this copy needs a revision sourced from the VM. **REPORTED/INFERRED** — the Owner's verbatim words were "the little descpriton of the top 3 choices of why the user would select that player."
- **F8 — a11y: the reason is not attached to the decision.** `BoardRow.svelte:63`'s `.cp-why` has no `id`, and the Draft button (`:55`) has `aria-label` but no `aria-describedby`; a screen-reader user never hears the reason before picking. The gone% method already uses the right pattern (`:46`/`:69`). Also `.cp-why` uses a hardcoded `#c8a48f` (`:112`), which stays rose under team takeover.
- **F9 — build warnings.** A fresh `vite build` warns `a11y_no_noninteractive_tabindex` at `BoardRow.svelte:69` (the intentional T4 focus target) and an unused `.cp-sorttoggle` in `BoardFooter.svelte:23`. Not defects; explain or clear before cutover.

## 4 · Open governance question (not S15's fault)

Three live documents name three different engine pins with three different `colors/src` trees: `AGENTS.md` → `4ca9a071` (tree `388da6e1`), live `PROJECT-KNOWLEDGE.md` → `d3bd81d2` (tree `b07ad73d`), delivery `SNAPSHOT.md` → `408410477` (tree `8d8a8a1e`, byte-matching the delivered engine). All three commits exist. Z.ai is internally consistent and byte-proven against its own SNAPSHOT; the drift is MUSE's per my standing context. **At cutover, which pin is the single truth?** This needs a MUSE/Architect ruling before the two histories are reconciled.

## 5 · What I did not run / limits

I ran the browser batteries on a fresh preview using beam's Playwright + browser cache in a **temp copy**, not the mirrored folder (the mirror stays byte-clean). The D-2 stale-server guard correctly refused my first attempt on a port held by another seat. I did **not** run `falsify-board` (F27–F30, ~35–45 min), the fast falsifiers, or the full composite in this sitting; those remain z.ai's resume steps and I do not claim them. No product, engine, pin, governance, queue or mirror file was edited.

## 6 · Resume order (z.ai's order, with my additions)

1. `node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` at the S15 bytes (F27–F30 must DIE).
2. The uninterrupted composite, no wrapper timeout, ending "ACCEPTANCE RUN COMPLETE" at the final bytes.
3. **F1 fix first, then** gate-table/doc regen into the five docs (my F5) and the regenerated `SHELL-STATUS.md` (my F3).
4. §7 packaging: verify-package must exit 0 *before* the zip; re-point or retire `probe-w14.mjs` (my F4); side-by-side shots; selector note.
5. Push test (owner relays); pin-drift ruling (§4).
