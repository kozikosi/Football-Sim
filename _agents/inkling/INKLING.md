# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol

1. `git fetch -q origin; git log --oneline -1; git status --short` — my worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**; this worktree's copy may predate Owner rulings — never quote it as current.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere (shared tree, other seats) is not mine to touch.

## Permanent seat rules

- Byte-check everything (Owner, 2026-11-13): every VERIFIED needs directory · exact command · ref/sha · output neighbourhood. Independent re-run is the only confirmation. Mark OPEN rather than speculate.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product/rulings.
- No new P-IDs without the Owner; no frameworks/pins/verdicts beyond what is rulable. Dissent in writing, inside the filing.

## Current state (2026-11-15, post-end continuation @ `177aaa5b`; branch pushed)

- **Fresh-start test: Cardboard Ringers built + VERIFIED in BOTH repos** (R-13). Artifacts: `_agents/inkling/deliveries/freshstart-ringers-2026-11-15/` @ `22daba3e` — engine (137 L) + CSS written once, byte-identical both arms; scratch clones `kozikosi/football-sim-vue` @ 6b4de5c / `kozikosi/football-sim-svelte` @ 86ba632 shallow, **NOT pushed** (Z.ai's Rev 6 owns those repos). Browser-verified both previews at seed 2027 → identical **AUR 27 — 6 BRB** (359/212 yds, 24 events). Vue: vue-tsc caught `noUncheckedIndexedAccess` TS2322 at `ringers.ts:74` (fixed). Svelte: svelte-check caught one a11y tabindex (fixed; vue-tsc silent); autofixer clean ×3. Bundles: Vue 77.84 kB vs Svelte 45.02 kB raw (Δ 13.1 kB gz). E4 battery: **Svelte felt better** (4.4 vs 4.1), narrow, **order-confounded** (Svelte built second) — one indicative pair, not settlement.
- **Rev 4 council review FILED** — `inbox/20261115-2005-inkling-zai-authoring-review.md` @ `80b3f0f3`. Calls: **F1 VERIFIED both arms** (my re-run: vue-tsc exit 2; svelte-check "1 error and 3 warnings", same TS2352 @ savesService.ts:58:16) — blocks quoting the sitting as gate-5-clean, does NOT kill it as evidence; **D1** row quotes shipped 83/98 (four-slice 61/68 = two-arm-fourslice.txt; vapor-Vue = 61; 68 matches no file; delta 7→15); **F3** recount **1,248 = 1,248** (my method), row-9 tax ≈ 1.2%; **F5** "one facade, paid once" — row 9 demoted DECIDES → TIE-BREAKER; **pick holds only as a reversible 62% Vue lean — NOT a ruling, NOT signable**; settle rule = time-to-green ≥2-of-3, ±5% wash → Vue (Vue wins today by tiebreak, not measurement; falsifier = Svelte ≥15% faster on ≥2/3 pairs); **challenge row 9**; ratify slice-done w/ **Gate 5 amendment** (re-run on FINAL bytes); **zai-only** for fresh-start (second-agent protocol from queue, not council re-runs); **week-stepper: GO** (protocol ready w/ week-stepper re-anchoring); Sim Lab v0 confirmed (DIALS last, read-only, receipt-diff accept bar); **verified-as-of.json: ADOPT** (falsifier = no reduction in stale-premise disputes after 2 prompts); Innovations: **Season Book + Flip Bench — both queue** (Flip Bench with pre-registered handicap-ratio bands).
- F1 context: VL's gates-YES was taken on the pre-week-save tree — both VL and Ernie are true; shipped bytes fail gate 5.
- **Reviews filed on Ernie, Glyph, P-158** (post-end, 2026-11-15 @ `f8f6f70d`/`177aaa5b`): `inbox/20261115-2020-inkling-review-ernie-rev4.md` — END-TO-END REPRODUCTION VERIFIED (shared-file sha256s match; pristine gap 18,210 B 29,514/11,304; patches rebuild dist byte-identical; gz delta 13,666 B; type-checks 0/0 both arms; his probe six LAWS PASS both arms) — adopt his strictest-tsconfig Gate-5 wording and his both-patterns week-stepper reading; my `zai-only` Q4 call retired (two independent seat builds both landed Svelte-feel + a +2-line store delta on fresh start). `inbox/20261115-2020-inkling-review-glyph-rev4.md` — adjudication aligned; material defect: Q1 "cannot" (repos are public/cloneable — the E4 battery was within reach), missing REVIEW-OF/VERDICT lines. `inbox/20261115-2020-inkling-P-158-review.md` — VERIFIED vs Pre-Colors pin 40233d6be00e987c; two required fixes before integration (prose≠code threshold 0.10 vs 0.45; line 5657 "75-rated" vs file-wide 70-rated); misses filter + closing paragraph must move with the chosen threshold.
- The sitting's **two-seat independent replication** of the Cardboard Ringers slice (mine @ 20:05Z, Ernie's @ 20:07Z) both landed on Svelte-feel — REPORTED-feel with two authors; Rev 6 Part D must tabulate both pairs alongside Z.ai's arms.
- **Z.ai fresh-start final test delivery VENDORED + REVIEWED** (Owner-directed push, 2026-11-15 @ `200313d1`): `_agents/inkling/deliveries/zai-fresh-start-2026-11-15/` — node_modules (163M) and embedded .git excluded (Owner asked to push for reading via GitHub; commit message records exclusions). Checksums 4/4 + 358/358 OK on the copy. **Review: `inbox/20261115-2047-inkling-review-zai-fresh-start.md` @ `4a31b192`** — 24/24 battery re-run PASS both arms (file://, singlefile, 0 console errors); engine pin CLEAN vs `git archive d3bd81d2:colors/src`; F1 fix re-verified on the shipped arms (vue-tsc exit 0 / svelte-check 0 errors). **Overturn stands: NO CUTOVER, tie + Svelte lean ~55%** — Rev 5's 62% Vue lean is not signable. Defects filed: cards quoted 867 in prose vs 871 in receipts; verified-as-of.json rev51 path stale; E3 devtools still incomplete. **Single-file offline route = first working offline fix** (Chromium ≥159 blocks module scripts on file:// regardless of crossorigin) — filed for the Architect.
- Prior verified facts (this series): live = **w89** (`3e69567c`) · pin `d3bd81d2` (99 flex, QB→FS 12) · two-arm bundles 11,569 B JS/per-file gz · pool 1,953/1,921 · suite 351/351 @ `9acf1992` = REPORTED · λ band [0.3902, 0.4032) · λ estimator absent.

## What the next session needs

1. Owner rulings if any (framework pick timing — blocked on week-stepper + second agent, per Rev 4 filing; P-345 label for the framework work = R-13, no row; OT-clock fix; vite `file://` boot fix; Season Book / Flip Bench queue decisions).
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261115-2005-inkling-zai-authoring-review.md` first.
3. Never re-measure (the filing names what was re-measured this session); fresh evidence only at a re-pin/fresh archive.
4. If Rev 6 lands: E1 pairs are the decision-grade data; my Cardboard Ringers pair counts as REPORTED-feel only; devtools row is still evidence: NONE and Rev 6 requires it — check it was measured.
5. P0 review chain (P-158…P-165) remains always-available next work; the inbox holds the ranked filings — nothing assigned.

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `4a31b192` (verify with `git rev-parse HEAD`).

## Transition discipline

Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
