SPEAKER: inkling | ROLE: council | TASK: fwtest9 evaluation wave | DATE: 2026-11-13T23:32Z
FOR: the Owner · INKLING's digest (Lane E) · all seats · Beam/ERNIE/glyph/GLM for the dissent register

Lanes touched: **A (verification)** end-to-end + **INKLING-arm rows for WR-8**; Lane C not taken (arm author — excluded by protocol); Lane D not taken (`tools/golden.ts` + `tools/tsc-baseline.mjs` absent from every arm, WR-7 unresolved — filed, not decided); Lane E input only — **no verdict, no ranking; the decision is the Owner's**.

## §3 Lane A — four-line receipts (all commands this machine unless noted)

1. **cwd** `…/opencode/v2full-20261113/zai-fwtest7-dynamic-engine-2026-11-13` · **cmd** `shasum -a 256 -c CHECKSUMS.txt` · **ref** `origin/council/beam @ a215b13b` (fresh `git archive`) · **out** exit 1 — **537/539 OK**; unreadable: `fwtest-7/arm-next/next-env.d.ts` (L17), `fwtest-7/arm-next/tsconfig.tsbuildinfo` (L74); both absent from the ref (`git ls-tree -r --name-only a215b13b | grep -E 'arm-next/(next-env.d.ts|tsconfig.tsbuildinfo)$'` → no matches). **"539/539 OK" refuted; 537/537 present bytes verify.**
2. **cwd** same · **cmd** per arm: content-only aggregate (`find . -type f \( -name '*.ts' -o '*.json' -o '*.md' \) … | shasum -a 256`) · **ref** `a215b13b` · **out** `265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988` **× 7** (svelte, sveltekit `src/lib/`, react, vue, next, nuxt `app/`, solidstart) — and × 2 more on `origin/council/inkling @ e8da7e49` (arm-solid, arm-lit). **Nine arms, one contract identity.**
3. **cwd** same · **cmd** `shasum -a 256 */src/engine-contract/fixtures/golden.json` (path per arm) · **out** `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` **× 9** ✓
4. **cwd** same · **cmd** forbidden-global grep per arm-owned src (nuxt: `app/`) · **out** `0 findings × 7` (my two arms: also 0 — see WR-1 filing)
5. **cwd** same · **cmd** 13-file sample (`git show a215b13b:<path> | shasum -a 256` vs manifest) · **out** **13/13 OK** (deliveries/, six arm contracts, logs/, round2/)
6. **cwd** `…/opencode/v2sample-20261113` etc. · **cmd** fourth witness contract check complete · **ref** as above · **out** identical hash ×9 (see addendum in `inbox/20261113-2318-inkling-VERIFY-zai-v2-delivery-third-witness.md`)
7. **cwd** `…/opencode/wr1-build-20261113/…` · **cmd** archive `e8da7e49` → per arm `npm ci` → exit 0 (**76 / 23 pkgs**) · `npm run build` → exit 0 (331 ms / 227 ms · dist 68 KB ×2) · fixed spec → **5/5 ×2** (2.5 s / 1.7 s) · `file://` probe → BLOCKED ×2 (CORS null origin; `base='./'` rebuild still blocked) · **ref** `council/inkling @ e8da7e49` · full rows in `…-WR-1-nine-arm-rows.md`
8. **cwd** `…/opencode/wr5-20261113/…` · **cmd** archive `a215b13b` → `npm ci` exit 0 (530 pkgs) → build exit 0 → prod probe (curl 1852 B, 0 testids, `<!--!$e000000-->…`) → patched rebuild (CSS import moved) → **identical failure** → fixed spec **0/5** → dev `[console:error] Hydration Mismatch … 000000001000000000` at `Home2` · **ref** `a215b13b` · details `…-WR-4-…` and `…-WR-5-…`, INKLING erratum commit `e8da7e49`
9. **cwd** `/Users/kosi/Desktop/wt/inkling` · **cmd** `git cat-file --batch-check --batch-all-objects | awk '{print substr($1,1,8)}' | grep -c '^5deca930'` · **out** `0` (see `…-WR-6-…` for the stale-clause answer)
10. **cwd** `/Users/kosi/Desktop/wt/inkling` · **cmd** `git rev-parse origin/council/muse` · **out** `59181af82d101875495ec2fe9a9a95e93336932d` — the fetched tip; `a351b48f` (cited as "now" in one prompt block) is an **ancestor**, not the tip. START-HERE-adjacent prompt text disagrees with the repo; the repo wins. Record for whoever issued the prompt: one sha per "now", and check it (`git rev-parse`) at issue time.
11. **cwd** `/Users/kosi/Desktop/wt/inkling` · **cmd** `git ls-tree -r --name-only <ref> | grep '\.svelte$'` · **out**: `origin/gh-pages` → **15 total** (`67-cakepanz/` **10**; `Football-Sim-Z-post-blue-w71/football-sim-next/` 1; `w74/05-viewmodels-screens/` 4); `origin/architect/engine-and-seats` → **0** (all paths); worktree `colors/` → **0**. The reported 10-vs-15 "discrepancy" is a scope artefact — both numbers correct, different denominators. Cakepanz is 10; the branch is 15; Colors is 0.
12. **cwd** `/Users/kosi/Desktop/wt/inkling` · **cmd** `git ls-tree -r --name-only <ref> | grep -E 'workflows?/[^/]+\.(yml|yaml)$'` · **out**: `main` 0 · `architect/engine-and-seats` 0 · `council/muse` 0 · `gh-pages` → **1**, nested: `Football-Sim-Z-post-blue-w71/football-sim-next/.github/workflows/ci.yml` (Beam's "dead nested workflow" — confirmed present, unreferenced at root)
13. **Fresh extraction vs CHECKSUMS for MY delivery** (commit `94c6f7e0`-era bytes): all three manifests used a **three-space separator** → macOS `shasum -a 256 -c` reported **110/110 unreadable**; top-level self-entry `e3b0c44…` = sha256(""); inner self-entries filed stale hash `9bba0ad3…`; arm-lit had phantom `public-favicon` entry (hash identical to `public/favicon.svg`). Regenerated from shipped bytes (`e8da7e49`): **109/51/52 OK**. Content matches otherwise (109/110 before).
14. **Round-2 evidence** (modification column): two independent seats + INKLING measure **1 file, 10 lines, 0 arm-owned** — Z.ai's arm-svelte retested by INKLING (MAINTAINER-INSPECTOR.md); round-2 before/after mtime evidence for the five arms was **reconstructed** (3 of 5 snapshots lost; mtime proxy only). **Label it REPORTED.** My own arms were born at `v1-5f`; no arm-owned edits occurred for them by construction, but I did not re-run round-2 on Z.ai's arms tonight.

## §1 (work order) → accuracy of tonight's work vs the standing claims

- Z.ai's v2 "539 OK, 0 FAILED" — **refuted** (537/539, two phantom entries; Beam and glyph converge).
- INKLING's "arm-solidstart: routes path not the convention" — **refuted by my own re-measure** (WR-5); Beam/ERNIE's "CSS import breaks hydration" — **not reproduced**; surviving localization: server route-load path, dev `lazyRoute` empty-component fallback; the prod silent path stays UNKNOWN.
- "INKLING's arms don't exist on any branch" (Beam, critique point 2) — **refuted** (on branch since `89c83ca2` 20:51Z; archive + npm ci + 5/5 today).
- The v3 order's `5deca930` anchor — **already struck** (`46b8fbb9`); zero such objects (`batch-all-objects` = 0).
- F15 sweep — any doc claiming "arm-nuxt 5/5 at `npm run build`" is wrong; needs `npm run generate`. Noted in my v3 receipts already (pushed in the wave); grep for it owed on other branches — not run.
- The `PLAYWRIGHT-RESULTS.md` §3 "possible roots" are superseded by tonight's erratum (appended, commit pending in this file's commit).

## Scoring columns — verdict lines, no ranking

| Column | Verdict from tonight's receipts |
|---|---|
| Correctness 20% (gate) | arm-solidstart **red at load on two machines** (mine + ERNIE's/glyph's runs), before AND after the WR-4 patch; the gate eliminates it if the Owner rules the gate binding. All other arms: load-gate green (acceptance 5/5 where executed). |
| Modification 20% | **Tie at zero** (1 file/10 lines/0 arm-owned ×3 seats). Insufficient specimen class — the column cannot rank; "no signal" and a fixture shape-change is required (WR-3, not taken). |
| Agent quality 15% | **Single-author confound**: one author for 7 of 9 arms; the column measures wrap-ability, not the framework. Say it explicitly; do not score. |
| Engine integration 10% | 0 leakage ×9; identical contract ×9; index-only imports ×9. Perfect discrimination failure — "no signal". |
| Maintainability 10% | One data point exists (arm-lit 208 vs arm-solid 233 ts/tsx incl. vite.config) — unweighted, one pair, no ranking. "No signal" absent the Lane-C-style change test (WR-3). |
| UI quality 10% | 0-px overflow (ERNIE, six rendering arms); 73 testids ×9 (shared fixture) — "no signal". |
| Server-ready 10% | All nine export static; **file:// 0/9** (all CORS/null-origin blocked); SSR/hydration health red only for solidstart. Equal-loss column for the one-file requirement — a build-mode question (WR-2, open, ERNIE/kilo appear to have it in flight), **not a framework ranking input**. |
| Tooling 5% | Build 0.2–9.6 s class; installs 22→530 pkgs; audits 0→1-high; type-check gates present except solidstart (transpile-only). Real signal exists here (measured), unscored by me. |

No arm is eliminated by me; no arm is crowned. The Owner rules.

## Caveats and blockers

- Z.ai's **v3 is not delivered**; nothing tonight's receipts say about v3 except "re-run everything on its landing".
- INKLING's two arms were verified by their author; ERNIE/kilo may add independent witnesses tonight.
- `npm ci` vs `npm install`: DELIVERY.md said install/75 pkgs (solid) and 22 (lit); tonight's `npm ci` shows 76/23. Semantics of "packages" differ between the two commands; the lockfile resolves what it resolves — not a defect, noted for the record.
- Node 26.13.0 (this machine) vs Z.ai's/ERNIE's Node 24.22.2 — same protocol family per convention; any v3 receipt must say which.
- My instructed glyph ref (`origin/council/glyph@dcfa7ca…`) is **not valid git syntax** — `git rev-parse` rejects it (`fatal: invalid object name`); the bare sha works. The same "at sha" phrasing appears in both prompt blocks; whoever owns the prompt file may want the fix.
- V3's CHECKSUMS cannot be pre-verified; INKLING's failure mode tonight (three-space manifests, then "shasum exits 1" being unread by the author) is the exact failure this wave must catch in v3 — the standing rule exists because of it.

## Dissent register (unmerged, for the Owner)

- vs Beam pts 2, 8 — filed (`…-DISSENT-beam-critique-points-2-8.md`). vs Beam pt 1 — accepted (implemented, `e8da7e49`).
- vs INKLING's own v3 order — corrected at artifact level (errata in `e8da7e49`); the v3 doc itself is history, unedited.
- vs ERNIE's WR-5 implicit claim — superseded by this wave's measured localization (WR-4/WR-5 filings); ERNIE's WR-4 run (kilo, in flight?) may confirm or refute.
- vs `START-HERE`-adjacent prompt sha claim (`a351b48f` as "now") — repo shows tip `59181af8`; `a351b48f` is an ancestor. **The prompt text is stale, filed here as the correction; edit belongs to whoever owns the prompt.**

## §8 open questions — answered or OPEN

1. Rebuild all nine on your machine? **No** — I rebuilt my 2 (exit 0); the 7 were rebuilt by Beam/ERNIE/glyph (convergent, exit 0, REPORTED to me tonight; artifacts hash-verified by me).
2. Does the corrected spec pass? **Yes ×2 (my arms, 5/5)**; the shipped-spec bug is the same one everyone found; INKLING's v3 order carries the one-token fix.
3. Is `npm run generate` required for arm-nuxt? **Yes** (INKLING's own v3 rerun: build-only → no prerendered testid HTML → spec red; after `generate` → 5/5 in 1.8 s). REPORTED ×3, VERIFIED (INKLING v3 rerun).
4. Do v3's CHECKSUMS verify? **OPEN** (no v3 yet). Tonight's failure mode on mine/Z.ai's v2 is the thing to watch; regenerate-from-shipped-bytes is the fix pattern (Beam pt 1, accepted).
5. Is `file://` a legitimate standing gate? **Opinion, filed as opinion:** it is the product's hard requirement (one self-contained file, offline). It belongs in the acceptance gate for the *product*, at build mode resolution time — no framework arm satisfies it today and all fail equally, so **it must not decide between frameworks**. The Owner calls it.
6. Any arm you'd strike on correctness alone? **arm-solidstart** — red at load on two independent machines, before and after a repair attempt. That names the gate; the elimination/framework call is the Owner's.
7. Weakest link in this protocol? **The manifest chain** (authors generate, nobody re-verifies from shipped bytes until a review forces it) and the **tie-at-zero modification column** (unshaped specimen), plus **single-authorship**. One-line fix list: manifest verified in the delivery gate; a shaped change-specimen (WR-3); fresh sessions per arm author.
8. What did I do that nobody asked? Regenerated my own broken manifests; third-witness v2 verification; nine-arm contract/golden identity; A3/A4 arithmetic re-check (8/8 tier cuts OK; **the `a3_plays_ledger_check.py` is not in shipped bytes — "11/11 exit 0" stays REPORTED**); .svelte scope resolution (10 vs 15 = denominators); muse-tip byte-check. It matters because the digest now rests on hashes, not on "539/539".
9. What is UNKNOWN and who unblocks? **arm-solidstart root cause** (unblocks: Z.ai via v3 item 0.4, or one instrumented dev pass in a scratch copy — `lazyRoute.js` DEV branch: log the caught error; 10 minutes, either seat). **A3's eleven rows** (needs the script or the full ledger; Z.ai/Beam). **Goldens' home** (WR-7; whoever picks it). **WR-9 infra** (the Owner). **v3** (Z.ai).
10. If INKLING vanished mid-digest tomorrow — next seat: (a) read `git log --oneline origin/council/inkling | head` and this file's commit; (b) every receipt lives in `inbox/20261113-2318-inkling-*.md` and `inbox/20261113-2332-inkling-fwtest9-evaluation.md` (this file) and the delivery errata (`e8da7e49`); (c) do not trust any manifest that has not passed `shasum -a 256 -c` from a fresh `git archive`; (d) muse tip check: `git rev-parse origin/council/muse` — cite that, never a sha from a prompt; (e) the digest sections follow the work order §3 lanes A–E; no verdicts; the Owner decides; (f) mine, nobody needs my permission: the two arms, the manifests, tonight's lists — all yours to re-run.

**Your move (one line):** I learned that tonight the bytes were the only witness that was never wrong — the gates that failed were the ones where prose outranked the archive; if I do one thing in v3, it is `shasum -c` from a fresh archive before believing anything, including myself.

EVIDENCE: VERIFIED (this session, four-line receipts above; refs `origin/council/beam @ a215b13b`, `origin/council/inkling @ e8da7e49`, `origin/council/muse @ 59181af8`). REPORTED/INFERRED/UNKNOWN labeled inline where they apply.
