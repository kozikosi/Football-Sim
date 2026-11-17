SPEAKER: glyph | ROLE: council | TASK: Glyph seat prompt to Z.ai — Cakepanz-6 (67 Cakepanz shell beauty/wiring/receipt fixes) | DATE: 2026-11-17T23:55Z
FOR: P-366, P-367, R-13

# Z.ai — Cakepanz-6 (Glyph brief): wire team takeover, close beauty/receipt/pin defects, keep rulings and engine untouched

## Audience and precedence
- **To:** Z.ai (Executor, 67 Cakepanz / 76 Pancakes shell). **From:** Glyph (`council/glyph`).
- **Precedence:** Owner message in chat > this prompt > `origin/council/muse` live queue/docs > your judgement. Flag conflicts explicitly.
- **Delivery:** one complete zip/response, no push, receipts separated by part. Label claims `VERIFIED|REPORTED|INFERRED|UNKNOWN`. State Node version and N for any filed rate/mean.

## Hard boundaries
- **Do not edit engine/snapshots/packs content/flex/design/product files/ratings/protected constants.** No `passClass`, no `passGap` (GLM off; 4th-down outcome fix is Architect work).
- **Do not activate prepared re-pin** (`65673a00` stays prepared; shipped `5c808472`).
- **Do not decide Owner rulings:** dark `--text`, Bodoni Moda, displayed value label choice (note: **“Engine Value” is ruled OUT for users, 2026-11-17**), 2PT chip wording, gh-pages push.
- **No injuries/ratings invention/CDN.** Keep offline inlining. Plain TS below render layer in `src/lib/**`.

## Baseline (reviewed)
- Shipped engine snapshot == `5c808472` (67 files), prepared == `65673a00` (68, incl. `passclass.ts`). Engine tests 394/394 and 406/406; node batteries 26/26 on Node 26 (Glyph rerun). Shipped manifest PASS 316, numerals clean. Prepared numerals clean but **manifest FAIL exit 1** (hash mismatches: `batteries/node.battery.mjs`, `scripts/gate-numerals.mjs`, `scripts/receipt-falsifier.mjs`, `scripts/swap-test.mjs`, `SNAPSHOT.md`; unlisted `scripts/pack-hash-cite.mjs`). Pack cite `pack53:0e78e4db382f9f`.
- Aesthetic: prepared vs shipped no aesthetic diffs (engine-only re-pin). Team takeover currently unwired in effect (stops set, remap blocks empty/no `var(--zpb*)` consumers), typography/brand/slogan diverge from w89 in key places.

## Work required (M unless noted)

### 1) Wire team takeover (headline)
- Implement mode-aware `[data-zpbteam]` remaps (light/system-dark/explicit-dark) consuming `--zpb-t1/t2/t3` to retint accents/golds/hairlines/panel accents/surfaces materially (w89/Owner intent), per-team. **Never tint `--zcream`. Do not change dark `--text`. No `--tc`.**
- Replace hardcoded accent hex on surfaces that must follow team (audit board/team-select/feed/chrome). Document stop→token mapping per mode.
- **Law + falsifier** (e.g. N23): ≥3 accent tokens change with team and `--zcream` unchanged; falsifier must be able to die. Report new contrast failures if introduced (do not silently “fix” ruled values).
- **Screenshots:** 1180px & 390px, light & dark, two teams (dark-primary + bright), showing takeover.

### 2) Typography/brand/slogan parity (no Bodoni decision)
- Inline Cinzel 700/900 and Cinzel Decorative 700/900 (woff2/base64, offline); declare weights; report byte delta. **Do not add Bodoni (W).**
- Body/prose uses system sans token (w89-like 14px stack); keep display faces for headings/brand/chrome. Align wordmark as far as inlined faces allow; name residual delta.
- Add “Can you go 20-0?” with shimmer on appropriate surfaces (home/guide/meta/title as faithful to w89) — state placements. Screenshots 1180/390 light+dark.

### 3) Manifest/receipts/docs/pins integrity
- Fix prepared manifest: reconcile hashes/unlisted files until `gate-manifest` PASS and numerals CLEAN (same commit as any prepared change); paste outputs. Keep shipped gates green.
- Fix D-3-class docs in both trees: node-battery count 26, manifest count = gate-printed 316 (not hand-written), narrow VERIFY §11 grep scope to `src/lib, src/App.svelte, batteries` and explicitly note `scripts/gamelog-fixture.mjs` is proof script (shell still never enables node), clarify SHELL-STATUS OT workaround receipt, resolve/document `packHash` import/SNAPSHOT “sixth difference” if present.
- Correct pin statements: shipped `5c808472`, prepared `65673a00` (68/406) across README/MERGE-README/VERIFY/SNAPSHOT notes to match bytes. Stage gh-pages correction artifact (README/checksums/pin lines + file-count/hash receipt) for Owner — no push.
- Re-run `swap-test.mjs` both directions and ship logs under cited names (or fix citations). Add “`npx playwright install chromium` once” fresh-machine note. Re-run/receipt falsifiers (F0 green, F1–F8 die, moved-anchor guard fails loudly with file/anchor) and D-1 fresh-clone flow where claimed.

### 4) Labels/chips (W/report-only)
- Do not change displayed label/chip. Report locations of “Value”/“Model Value” and confirm **“Engine Value” absent from UI**. 2PT vs “2-Pt Conv” reported only. Centralizing label to one constant without display change is allowed if noted.

## Acceptance/receipts (paste all)
- Pins/byte identity evidence; engine tests + node batteries (both trees, note Node versions); manifest/numerals/pack-hash-cite; falsifier full outputs; swap logs; fresh-clone/npm-ci notes; slice/shell batteries and 390px walk if run; screenshots for takeover and typography; `passClass/passGap` absence in shell path/default-off sanity.

## Close-out
End with **BLOCKED**, **OPEN** (Owner decisions), **NEXT** (1–3 actions) and a one-line stale-looking-but-necessary/disagreements note.
