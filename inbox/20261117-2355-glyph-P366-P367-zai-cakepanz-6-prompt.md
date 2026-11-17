SPEAKER: glyph | ROLE: council | TASK: long-form prompt to Z.ai — Cakepanz-6 (beauty/wiring/receipt-fixes for 67 Cakepanz) | DATE: 2026-11-17T23:55Z
FOR: P-366, P-367, R-13

# Prompt for Z.ai — 67 Cakepanz sitting 6 (Glyph): wire the team takeover, fix the beauty/receipt defects, keep pins and rulings honest

**From:** Glyph (council seat, `council/glyph`). **To:** Z.ai (Executor for 67 Cakepanz / 76 Pancakes shell). **Base reviewed:** `67-cakepanz-5-2026-11-17/cakepanz-4` (shipped, engine pin `5c808472`) and `cakepanz-4-prepared` (prepared re-pin to `65673a00`, **NOT activated**). **Reference:** `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B, live index per fetch/refs) and shipped/prepared shell assets. **Scope:** UI/shell/receipts/docs only. No engine edits, no Owner rulings, no activation.

This prompt synthesizes council review of other seats’ work this round (Beam/Ernie/Inkling/Glyph/Muse filings and the merged Cakepanz-6 prompt on `origin/council/muse`). Treat it as a thorough seat-level brief; if it conflicts with the Owner’s message in your chat, the Owner wins and you must flag the conflict in your delivery. **Precedence:** Owner message > this prompt > live queue/docs on `origin/council/muse` > your judgement.

---

## 0) Non-negotiables (hard law)

- **M = mechanical (do it). W = waiting on Owner (report only, do not touch).** Silence is not approval.
- **Do not edit the engine or engine snapshots/packs/flex/design/product HTML/ratings/protected constants** (`colors/src`, `src/engine/**`, `flex.json`, `design.json`, `data/packs/**` contents except hash/manifest citations as required, product files). If a fix requires engine changes, file a §5-style request (file + anchor + old→new + why + safe-alone + how-to-check) — do not patch around it.
- **Do not activate the prepared re-pin.** `cakepanz-4-prepared` stays prepared (`65673a00`); shipped stays `5c808472` unless the Owner explicitly orders activation.
- **Do not enable the pass-class GLM node.** No `passClass`, no `passGap`, not default, not behind a flag, not in shipped fixtures. The node is opt-in/off-by-default; 4th-down transition behavior is under Architect fix/re-measure (outcome-first: `inc:downs`/drives/downs), so shell must remain bit-for-bit on the pools path.
- **Do not decide labels/chips/palette rulings.** Report live terms/locations; pick nothing (instant-rejection risk).
- **No injuries. No ratings invention. No CDN/network dependency introduced.** Keep offline/self-contained improvements.
- **Plain TypeScript below the render layer** (`src/lib/**` framework-idiom-neutral per standing ruling). Do not re-open framework choice.
- **Push nothing in this chat flow; deliver as one zip/response with all steps complete and receipts separated by part.** Label every claim `VERIFIED` / `REPORTED` / `INFERRED` / `UNKNOWN`.
- **No machine-only receipts:** gates must run from a clean clone context (`npm ci && npm run ...`) where feasible; name Node version and environment for every run. State **N** for any rate/mean you file (debug runs are not filed numbers).

---

## 1) Verified ground truth (Cakepanz-5, council rechecks)

**Pins/snapshots (VERIFIED):**
- Shipped `cakepanz-4/src/engine` byte-identical to `origin/architect/engine-and-seats@5c808472:colors/src` (67 engine TS files). Prepared `cakepanz-4-prepared/src/engine` byte-identical to `@65673a00:colors/src` (68 engine TS files, includes `sports/nfl/sim/passclass.ts`; `sim/game.ts` differs vs 5c808472 as expected for re-pin). Flex tables identical across compared pins/copies as reported by multiple seats.
- Packs (VERIFIED static): shipped has 2 pool packs; prepared has 4 packs (2 pools + 2 passclass) matching tip as filed. Prepared is engine/test-carrier re-pin, not an aesthetic fork.

**Feasible reruns (Glyph, Node v26.13.0, temp copy, no `npm ci`; REPORTED where not rerun):**
- Shipped + prepared: `node --test --experimental-strip-types test/engine.test.ts` passed as claimed (**394/394**, **406/406**). `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` **26/26** on both (auto-generated `src/engine-node` 67/68 files, 1 transformed `platform/localstorage.ts`; `src/engine-node` gitignored).
- Shipped: `node scripts/gate-manifest.mjs` **PASS (316, exit 0)**; `gate-numerals` **CLEAN×2**.
- Prepared: `gate-numerals` CLEAN; **`gate-manifest` FAIL exit 1** with hash mismatches for `batteries/node.battery.mjs`, `scripts/gate-numerals.mjs`, `scripts/receipt-falsifier.mjs`, `scripts/swap-test.mjs`, `SNAPSHOT.md` and **unlisted** `scripts/pack-hash-cite.mjs` (see F-4). **This is a live integrity defect in prepared and must be fixed.**
- `scripts/pack-hash-cite.mjs data/packs/nfl-pools-fit2023-2025.json` → `pack53:0e78e4db382f9f` (inv1) on both.
- Receipt-falsifiers observed all-die in rerun attempts noted during review (REPORTED from run notes; re-run and paste full stdout/exit in your delivery).
- Not rerun by Glyph (REPORTED by Z.ai/other seats): `npm ci` fresh-clone matrix details, distfile/build, slice battery 29/0/10/3 in-browser, shell battery 46/0, M3 swap both directions with cited logs, `probe-saves-states.mjs`, default-off 60-game byte-identity control set, screenshots — **you must (re)produce and receipt these where claimed**.

**Aesthetic parity baseline (VERIFIED static, no screenshots from Glyph):** prepared vs shipped shell aesthetic assets show **no aesthetic diffs** (engine-only re-pin). Comparisons below are against w89.

---

## 2) Findings to fix (ranked)

### F-1 (M, headline) — Team takeover is declared but not wired (0% effective palette retint)
**Evidence (VERIFIED static):**
- `src/lib/port/tokens.ts` `teamRemap()` returns `{ attr, vars: { '--zpb-t1', '--zpb-t2', '--zpb-t3' } }`.
- `src/lib/bindings/tokensApply.ts` sets `[data-zpbteam]` and applies those 3 vars to `:root`.
- `src/lib/assets/tokens-w89.css` `[data-zpbteam]` remap blocks are empty (comments only). `grep -rn "var(--zpb" src/` finds no CSS consumers outside token definitions/assignment plumbing. Board/surfaces use hardcoded/static accent hex values in places — result: selecting a team does not retint the UI as required.

**Required fix:**
1. Implement **mode-aware** team remaps in the three `[data-zpbteam]` blocks (light, system-dark explicit, `data-theme="dark"` explicit) so team selection changes the accent/palette surfaces materially in line with w89/Owner intent (“every team’s color changes almost every aspect of the color palette”), while preserving never-recolor neutrals and accessibility.
2. Map `--zpb-t1/t2/t3` to consumed tokens/surfaces (at minimum: gold/accent family + hairlines/borders + panel/raised accent surfaces as appropriate). **Keep `--zcream` never tinted.** Do **not** “fix” the dark `--text` value (W). Do **not** introduce `--tc`. If any remap creates a new contrast failure, **report it with measured pairs** and do not silently change ruled token values.
3. Remove/avoid hardcoded board accent hex where a token/remap should drive it (audit board/team-select/feed/chrome for static gold/rose values that must follow team).
4. Make the mapping choice explicit in your filing (which stop drives which token, per mode, and why) — computed accessible tones are acceptable if documented and deterministic; no new runtime library/CDN.

**Acceptance (must ship):**
- `grep -c "var(--zpb" src/lib/assets/tokens-w89.css` (or relevant token file) **> 0** and runtime-visible: selecting teams changes accent surfaces in light and dark.
- Screenshots at **1180px and 390px**, **light and dark**, **two teams** (one dark-primary palette, one bright/high-chroma palette), before/after or clearly showing takeover — saved in delivery. A claim without pixels is `INFERRED` at best.
- Add a **law + falsifier** (e.g. N23): “picking a team changes at least three accent tokens and `--zcream` is unchanged” (and falsifier that can fail by planting a wrong/no-op mapping). Paste stdout/exit.

### F-2 (M) — Typography/brand strays vs w89 (high-visibility)
**Evidence (VERIFIED static):**
- **Fonts inlined:** `tokens-w89.css` ships `@font-face` Cinzel **700** and Cinzel Decorative **700** only; no Bodoni Moda; no 900. `.cp-brand`/CSS requests heavier weights in places → browser falls back/faux-bold behavior risk. w89 loads Cinzel 700/900, Cinzel Decorative 700/900, Bodoni Moda 500/600/700 (but via fonts; shell must remain offline-inlined — **do not revert to Google Fonts**).
- **Body font:** body/copy uses Cinzel/display stack (`--font-ui`/Cinzel) instead of w89’s 14px system sans for body copy.
- **Wordmark:** “76 Pancakes” uses Cinzel Decorative/gold styling differing from w89 brand treatment.
- **Slogan:** “Can you go 20-0?” (with shimmer on `20-0` / w89 treatment) missing from shell surfaces where w89 shows it.

**Required fix (mechanical, no Bodoni decision):**
1. Inline **Cinzel 700 and 900** and **Cinzel Decorative 700 and 900** (woff2/base64, offline), declare explicit weights; keep existing faces if harmless. Report added bytes in `VERIFY.md`/receipt. **Bodoni Moda remains W** (do not inline or remove-by-ruling; align wordmark as far as inlined Cinzel faces allow and name any residual difference).
2. Introduce/use a body font token for prose/body copy: system sans stack at w89-equivalent size/line-height (e.g. `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif, 14px` equivalent), keep Cinzel/Decorative for headings/brand/chrome as appropriate. Verify at 1180px/390px light+dark (screenshots).
3. Add the slogan “Can you go 20-0?” with appropriate shimmer/styling consistent with w89 on the relevant home/guide/meta/title surfaces (state exact placements). This is a product/brand line present in w89 — add faithfully; if Owner objects, flag but ship the faithful parity implementation unless instructed otherwise in-chat.
4. Align wordmark family/weight/spacing/color as closely as possible with inlined faces; list any remaining delta.

### F-3 (M) — Labels and 2-point chip (REPORT ONLY — do not change values)
**Evidence (VERIFIED static):**
- Value labels: w89 uses **“Value”**; shell uses **“Model Value”** (`valuation.ts`, Team Select, Guide). **“Engine Value” is ruled OUT as a user-facing label by the Owner (2026-11-17)** — must not appear to user and is not an option.
- 2-point: w89 feed/UI uses **“2-Pt Conv”**; shell feed chips use **“2PT”/“2PT FAIL”** (`feedVM.ts`), while recap strings use “2-Pt Conv” in places.
**Required action:** Do **not** change displayed label or chip text. Report the two live terms and all locations, and confirm “Engine Value” is absent from user-facing UI. Mechanical allowed: centralize valuation label into **one constant** (no displayed-value change) so a future ruling is one edit — note if done.

### F-4 (M) — Prepared-tree manifest/integrity and stale receipt counts/docs (both trees as applicable)
**Evidence (VERIFIED/REPORTED):**
- **Prepared `gate-manifest` FAIL (exit 1):** hash mismatches `batteries/node.battery.mjs`, `scripts/gate-numerals.mjs`, `scripts/receipt-falsifier.mjs`, `scripts/swap-test.mjs`, `SNAPSHOT.md`; unlisted `scripts/pack-hash-cite.mjs`; numerals CLEAN. **Shipped manifest PASS 316.**
- **Doc/count staleness (D-3 class):** `README.md` node-battery law count stale (24 vs 26) in places; `VERIFY.txt` manifest count states 310 vs gate prints 316; `VERIFY.txt §11` grep scope overstates (claims scripts covered but `scripts/gamelog-fixture.mjs` intentionally contains `passClass/passGap` — substantive claim “shell never enables node” true, scope text must be narrowed). `SHELL-STATUS` OT workaround row lacks receipt pointer. Prepared vs shipped has undeclared `packHash` import-only drift in `batteries/node.battery.mjs` while `SNAPSHOT.md` claims “shipped + five paths” (name any sixth difference or eliminate drift).

**Required fix:**
1. **Reconcile prepared manifest/checksums to actual bytes** in the same commit as any prepared-tree change: run `node scripts/gate-manifest.mjs` and `node scripts/gate-numerals.mjs` on prepared, fix manifest entries/unlisted files/hashes until **PASS**; paste full output/exit. Do not hand-edit counts without re-running gates.
2. Apply doc fixes to **both** trees where text exists (and keep prepared/shipped consistent except intentional pin differences): README battery count **26**; VERIFY manifest count/line = **gate-printed 316** (paste gate line); narrow §11 scope to `src/lib, src/App.svelte, batteries` and explicitly note `scripts/gamelog-fixture.mjs` is the proof script that passes the option on purpose; clarify SHELL-STATUS OT workaround with receipt location or remove opaque parenthetical; resolve/document `packHash`/SNAPSHOT sixth-difference.
3. **If you regenerate `MANIFEST.txt`/`CHECKSUMS*` for any reason, re-run manifest/numerals gates in the same commit and paste outputs.** No document may name a number the tool does not print.

### F-5 (M) — Pin-line honesty and gh-pages staging note
**Evidence (VERIFIED/REPORTED):**
- Shipped tree must truthfully state `5c808472`; prepared must truthfully state `65673a00` (68 files/406 tests context) wherever pin/docs/headers appear — and **SNAPSHOT.md is currently the accurate prepared doc; others have been reported stale in prior reviews**: audit and correct README/MERGE-README/VERIFY/P-360 notes in prepared so they match bytes/tests/pin (without activating).
- Deployed `67-cakepanz` on `origin/gh-pages` has been reported to name wrong pin in README/checksums vs bytes (`d3bd81d2` bytes vs older named pin, file-count mismatch). You cannot push gh-pages: **stage a zip/folder + exact replacement lines and file-count/hash receipt** for Owner placement (or note BLOCKED with exact artifact).

**Required fix:** Correct pin statements in shipped/prepared delivery artifacts you own; produce gh-pages correction artifact/instructions with evidence. Never state a pin your bytes do not match.

### F-6 (M) — M3 logs, fresh-clone docs, and falsifier portability receipts
**Evidence (REPORTED):** VERIFY cites swap logs (`swap-rehearsal-5c808472.log`, `swap-m3-oldpin.log`) that may be missing/misnamed; fresh machine needs `npx playwright install chromium` once before browser batteries.
**Required fix:** Re-run `swap-test.mjs` both directions and ship logs under cited names (or correct citations to actual filenames). Add the one-time Playwright browser install note to delivery docs. Re-run and receipt F2/F3 falsifiers and D-1 fresh-clone flow as applicable with settled targets and Node-major notes (Node 24 rows if available are REPORTED/VERIFIED by you with `node -v`; do not claim Node 24 if not run).

---

## 3) Owner-ruling / W items (do not do; report status)

- **Dark `--text` token fix** (w89 reproduces 3.17:1 issue in dark contexts) — W.
- **Bodoni Moda inclusion/brand-face final choice** — W (Cinzel 700/900 inlining is M; Bodoni is not).
- **Displayed value label choice** between “Value” and “Model Value” — W (and “Engine Value” is **forbidden to users**).
- **2-point chip wording** “2-Pt Conv” vs “2PT/2PT FAIL” — W.
- **Prepared re-pin activation / making 65673a00 the shipped default** — W (Owner/Architect decision).
- **Enabling pass-class GLM / passGap** — W/forbidden for this sitting.
- **gh-pages push** — you stage artifacts only.

---

## 4) Concrete verification checklist (paste commands + stdout + exit + Node version)

Run in each relevant tree/clone as specified and separate receipts by part:

1. **Pins/bytes:** `git archive`/`diff -rq` or equivalent evidence for shipped==5c808472 (67 files) and prepared==65673a00 (68 files) where applicable; `find src/engine -type f | wc -l` as helpful.
2. **Suites/batteries:** `node --test --experimental-strip-types test/engine.test.ts`; `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs`; shipped+prepared `node scripts/gate-manifest.mjs`; `node scripts/gate-numerals.mjs`; `node scripts/pack-hash-cite.mjs data/packs/nfl-pools-fit2023-2025.json`.
3. **Falsifiers:** receipt-falsifier (F0 green, F1–F8 die, moved-anchor guard exits 1 with file/anchor named), shell falsifiers as available — full outputs.
4. **Fresh clone:** `npm ci` (from clean) + relevant batteries/build; note Playwright install step.
5. **Browser/visual:** slice + shell batteries (counts as claimed), 390px walk, screenshots for F-1 takeover and F-2 typography/body/wordmark/slogan at 1180px & 390px, light & dark, two teams.
6. **Default-off sanity:** confirm no `passClass/passGap` usage in shipped shell path; any harness checks you run must show pools/default behavior unchanged.
7. **Doc/gate consistency:** every cited count in README/VERIFY/SNAPSHOT/MANIFEST-derived claims matches tool output you paste.

---

## 5) Delivery shape (required)

- One zip (or one clearly structured response bundle) containing: `cakepanz-4/` and `cakepanz-4-prepared/` (as applicable), per-part receipt folders, screenshots, logs (including M3 logs under cited/correct names), and a top-level `VERIFY`/summary.
- For each part: what changed, files touched, commands run, key output, exit codes, and `VERIFIED/REPORTED/INFERRED/UNKNOWN`.
- End with: **BLOCKED** (who/what), **OPEN** (Owner decisions needed), **NEXT** (top 1–3 concrete actions).
- Include a one-line **“stale-looking but necessary / disagreements”** note (carry-overs you were asked to keep; objections with evidence for Owner).

## 6) Known review context (do not re-litigate; use to guide fixes)

- Team takeover unwired and prepared manifest FAIL are cross-seat findings requiring code+manifest/doc correction.
- “Engine Value” user-facing label is **out** (Owner 2026-11-17); do not propose it to users.
- 4th-down GLM fix must be validated on **outcome metrics** (Architect scope) — not your change, but informs “do not enable passClass”.
- Beam D3 assertion proposal was rejected as filed elsewhere; irrelevant to shell except do not copy bad assertion shapes into any shell tests.

Build the shell faithfully, make every receipt survive falsification, and leave rulings to the Owner.
