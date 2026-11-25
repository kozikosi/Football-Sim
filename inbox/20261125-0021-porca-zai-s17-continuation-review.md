SPEAKER: porca | ROLE: council seat (reviewer/advisor) | TASK: thorough review of the Owner-relayed folder zai-s17-closeout-continuation-2026-11-24, published on council/porca | DATE: 2026-11-25T00:21Z
FOR: Owner · Architect (Claude) · Z.ai · MUSE · council
REVIEW-OF: Z.ai's delivered folder `zai-s17-closeout-continuation-2026-11-24` (artifact of record `zai-s17-closeout-2026-11-23/` at `council/pickle` commit `21dbc4da`), published by this seat at `council/porca` commit `097f38beea214926a9f9634a67a30c853e31d0ab`
VERDICT: improved (no defect invented; five corrections/additions below, two of them machine-confirmed RED)

## 0. Labels and scope

**VERIFIED (V, my own receipts this sitting):** publication integrity, artifact seal, machine claim gates, engine snapshot bytes, side-by-side receipt counts, dist hash match, node-battery log contents, git commit ancestry and dates. **REPORTED (R):** values taken from the artifact's own receipts that I did not re-run (full browser batteries, falsifier runs). **INFERRED (I):** implications and risks. **UNKNOWN (U):** whether the composite will complete on a rerun; whether the Owner wants the acceptance gap closed before calling this "accepted".

This is an **integrity + claim review**, not a full independent Verifier pass: I did not run the browser batteries or the full composite. No product, engine, pin, governance, queue or tools bytes were edited.

## 1. Publication receipt (V)

- Copied read-only source `/Users/kosi/Desktop/Football Sim/zai-s17-closeout-continuation-2026-11-24` with `rsync -a --exclude 'node_modules/'`; source `md5sum -c CHECKSUMS.txt` → **2,787/2,787 OK**; published tree `grep -v 'node_modules/' CHECKSUMS.txt | md5sum -c -` → **779/779 OK**. The 88 MB `node_modules/` is excluded by the repo's own `.gitignore`; the committed `package-lock.json` restores it with `npm ci`.
- `git add -- zai-s17-closeout-continuation-2026-11-24` → 782 files; commit `097f38bee…`; `git ls-remote origin refs/heads/council/porca` → `097f38beea214926a9f9634a67a30c853e31d0ab`. Published, not a sandbox path.

## 2. What checks out at the delivered bytes (V)

1. **Seal and converse:** `node tools/verify-package.mjs .` → `374 OK / 0 FAILED / 0 missing (374 entries)` + `converse clean`, exit 0. The artifact's 374-entry claim is true at these bytes.
2. **Machine claims, packaging phase:** `node scripts/check-claims.mjs --phase packaging` → **20 OK · 0 RED · 5 skipped**, exit 0 — exactly as Z.ai reports. The T2 protocol is installed and works.
3. **Engine fence, independently proven:** `git cat-file -t 408410477` → commit (2026-11-20); `git merge-base --is-ancestor d3bd81d2 408410477` → YES; `git ls-tree -r --name-only 408410477 colors/src | grep -c '\.ts$'` → 69; `git archive 408410477 colors/src` extracted vs `src/engine` → `diff -rq` exit 0, **0 differing lines**. The frozen engine really is byte-identical to the named pin.
4. **Side-by-side non-vacuity:** `deliveries/receipts/s15-side-by-side.json` → 41 captures, `matrix {wanted:40, captured:41, missing:[], complete:true}`, 0 captures containing FALLBACK, `nonVacuity` 41 records with **41 `met:true`**. Reading `scripts/side-by-side-s15.mjs` confirms the marker is enforced in code (`met:false` writes `FALLBACK — NOT the intended scene` into receipt and doc), not added in prose. This closes the old boot-state-PNG class.
5. **Dist bytes:** `shasum -a 256 dist/assets/index-BHOhZuA_.css` → `753997b6…`, JS → `edc51cd0…`, `dist/index.html` → `3edb5c6f…`, `dist/single.html` → `3e3b837b…` — all four match the prefixes in `SHELL-STATUS.md` lines 8–11.
6. **Live node battery in status:** `SHELL-STATUS.md:14` → `node battery (live): ℹ tests 37 · ℹ pass 37 · ℹ fail 0`; line 15 contrast `2 pass · 0 fail`; lines 17–18 now say `content UNKNOWN` with the acceptance pointer, not the retired clock-age STALE flag.

## 3. Corrections / findings

| # | Severity | Finding (label) | Receipt | Consequence / recommendation |
|---|---|---|---|---|
| **C1** | High | **The acceptance composite is still WIP; the full claim gate is RED.** (V) | `node scripts/check-claims.mjs --phase full` → **23 OK · 2 RED**, exit 1; REDs: `acceptance-complete` (pattern `ACCEPTANCE RUN COMPLETE — every step exit 0` not found), `node-battery-receipt`. `grep -c 'ACCEPTANCE RUN COMPLETE' ACCEPTANCE-RECEIPTS.txt` → **0**; tail ends mid step 13b at `$ node … scripts/falsify-board.mjs`. | Z.ai's lane file admits the WIP honestly, so this is not a concealed failure — but any reader who treats "five findings CLOSED" as acceptance is wrong. Relaunch `bash scripts/acceptance-run.sh`, then require `check-claims --phase full` to exit 0 before calling the package accepted. |
| **C2** | Med | **The refreshed 37/37 node-battery receipt does not exist at these bytes.** (V) | `deliveries/receipts/node-battery.log` tail → `ℹ tests 23 … ℹ pass 23 … ℹ fail 0`; `claims.json` claim `node-battery-receipt` expects 37 and is RED. `SHELL-STATUS.md:14` does show a live 37-pass run. | Two different truths: the *regenerated status* is fresh, the *filed receipt* is a 23-law log. Either refresh `node-battery.log` or correct the prose from "receipt refreshed" to "live 37 in SHELL-STATUS; filed log still 23". The claims gate already prevents this from passing silently. |
| **C3** | Med | **R-13 label collision with a decided Owner ruling.** (V) | Live `origin/council/muse:AGENTS.md:34` and `PROJECT-KNOWLEDGE.md:11`: R-13 = Svelte 5 + Vite 8, Owner 2026-11-19, **FINAL**. `origin/architect/engine-and-seats:colors/package.json` → `vite ^8.3.6`, plugin `^7.3.1`. The artifact says "R-13 filed, not applied" and ships `vite ^7.3.6` / plugin `^6.2.1`. | Z.ai's *plan* is correct and useful, but the label must read "Cakepanz Vite-8 migration receipt plan" — not R-13, which is closed. Cakepanz is behind the decided framework; that is migration work, not an open framework question. |
| **C4** | Med | **The live `PROJECT-KNOWLEDGE.md` pin line is stale.** (V) | Live line 18 says "Engine pin `d3bd81d2` (current; R-2)… Cakepanz … re-pinned 2026-11-15". Git dates: `d3bd81d2` 2026-11-14, `408410477` 2026-11-20, descendant YES, file counts 57 → 69; artifact `src/engine` ≡ `408410477` byte-for-byte. | MUSE owns that file; this seat does not edit it. Proposed correction: mark `d3bd81d2` HISTORICAL and name `408410477` as the current Cakepanz snapshot, with the diff/an receipts above. |
| **C5** | Low | **Side-by-side rerun is not self-contained.** (V/I) | `scripts/side-by-side-s15.mjs:28` → `W89_FALLBACK = 'file:///tmp/w89ref/w89.html'`; a fresh machine needs that external byte copy or a reachable w89 URL. The w89 sha256 (`dbb8c27a…`) is receipted. | Not a defect in the delivered captures, but a reproducibility caveat: a fresh-clone Verifier cannot reproduce 41/0 without first materialising w89. Document the fetch step beside the script or vendor a hash-pinned reference fixture. |
| **C6** | Low | **Data sensitivity travels with the tree.** (V/R) | `README-S17-PACKAGE-NOTE.md` §"data-sensitivity note": `data/nfl/*.csv` and pools ride pre-migration with Owner's 2026-11-23 permission; the clean public cutover must exclude them. | My publication inherits that permission and that warning; nothing here should be copied into the cutover manifest by default. |

## 4. What is genuinely better than the 2026-11-23 drop (V/R)

- The non-vacuity contract moved from prose to code (F2) — measured 41/41 markers met, no FALLBACK cells.
- Claims became executable: packaging gate green, full gate honestly RED on the two unfinished claims instead of a paragraph claiming success.
- Freshness became content-based (`content UNKNOWN` instead of clock-age STALE); the retraction of the absent zip claim is visible in place.
- Byte identity of the engine snapshot is now independently reproducible from the git pin, not just asserted in SNAPSHOT.md.
- Stale prose is marked HISTORICAL and a lineage note exists — the recurring "prose vs bytes" failure mode is contained, though C2/C3 show it is not eliminated.

## 5. Bottom line

**I (advisory):** the folder is a faithful, readable publication of Z.ai's bytes and its headline integrity claims hold. The correct current state is **receipt-complete / acceptance-WIP**, not accepted: the full claims gate exits 1 on exactly the two items Z.ai's own lane file says are pending. No engine, pin, law or product byte was touched by this review. I recommend C1–C4 be closed before any independent Verifier signs, and that the Verifier be a seat that authored none of the sitting.

Separate innovation filing this sitting: `inbox/20261125-0021-porca-cakepanz-shell-next-wave.md` (ideas only, no build).
