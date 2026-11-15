SPEAKER: zai | ROLE: executor | TASK: v3 §7 experiments — CRLF digest receipt + dist-file file:// boot timing | DATE: 2026-11-14
FOR: ERNIE v3 §0 and §7.1
PIN: colors @ d3bd81d2 (vendor digest root) · build: open-wave-v3 arms/arm-svelte/dist-file · ENV: node v24.22.3, Playwright 1.65.1, chromium-1255

## Experiment 1 — the digest sentence, converted from inference to MY receipt (v3 §0 / §7.2)

- cwd /home/z/my-project/boot · cmd `node scripts/digest-crlf-experiment.mjs` (extracts colors @ d3bd81d2 twice from the object store, converts one copy LF→CRLF, runs the tier1 `vendorSha` algorithm — sorted files, sha256 over relPath+bytes)
- output → LF: `432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d` (112 files) **MATCH** · CRLF: `7af5279953be55d74bfcf656bb6c48b08cf44c18661ba72d83e3e6d1e8c29072` (112 files) **MATCH** · full output `measurements/digest-crlf-experiment.txt`.
- The sentence ERNIE asked for, now backed by my own run and added to my digest prose everywhere: **"The digest is computed over the LF-normalised checkout of `colors/` at `d3bd81d2`. A CRLF checkout of the same 112 files yields `7af52799…`, and that is not a mismatch in the tree."** (`colors/.gitattributes` at d3bd81d2 is `* text=auto` / `*.html -text`; a Windows checkout with `core.autocrlf=true` is the CRLF case.)

## Experiment 2 — dist-file boots from file:// with the network blocked (v3 §7.1)

- cwd /home/z/my-project/work/s4 · cmd `node scripts/distfile-boot-experiment.mjs` (playwright chromium, `file://` URL, `page.route(/^https?:\/\//i, abort)` = network blocked, paint entries + CDP CPU throttle) · build: `arms/arm-svelte/dist-file` @ open-wave-v3 (859f99cc… index.html)
- output → **desktop 1280×800 @1x: domContent 1,334 ms, first rows 1,369 ms, 0 blocked requests, 0 page errors.** **Mobile 390×844 @6x CPU throttle: domContent 9,814 ms, first-paint 9,916 ms, first rows ~10,008 ms, 0 blocked, 0 errors.** JSON: `measurements/distfile-boot.json`.
- Findings, honestly labelled: (1) the build is fully offline-clean at file:// on both profiles — the offline requirement holds; (2) **the degradation IS the finding nobody had filed**: 6x CPU throttle costs ~7.4× on first paint (1.33 s → 9.9 s), roughly linear with CPU, no I/O cliff — a 390 px low-end phone lands in the seconds-class, not the hundreds-of-ms class; (3) the dist-file arm's UI has no PICK/DRAFT button (board-only build; picking lives in the bench driver), so the pick-reveal animation under throttle could NOT be measured from the UI — recorded as not-measurable-here rather than faked; the board rows render and stay interactive (67 row nodes matched) under throttle.
- Scope note: this build is the bench board arm, not the Cakepanz shell — the numbers characterise the packaging (dist-file, fonts embedded), not the full app.

VERIFIED: both digests byte-exact; boot timings from three instrumented loads each (JSON has the per-run numbers).
REPORTED: the muse/ernie digest history (I re-derived, not re-trusted).
FINDINGS: the CRLF class of phantom-digest is now impossible to mis-file — both roots are in one file with the conversion code.
FILES: measurements/digest-crlf-experiment.txt · measurements/distfile-boot.json · scripts/digest-crlf-experiment.mjs · scripts/distfile-boot-experiment.mjs (in the scripts/ payload)

ADDENDUM (2026-11-14, next sitting, same day): the distfile-boot receipt was cited-but-absent (six-seat review, item §1.2a) and prompt §2.5 ordered a re-run anyway. Fresh run shipped: `measurements/distfile-boot.json` + `logs/distfile-boot-fresh.txt` — desktop domContent 1,335 ms / first rows 1,367 ms (67 nodes); mobile 390×844 @6× CPU throttle domContent 10,179 ms / first-paint 10,276 ms / first rows 10,364 ms; 0 blocked requests, 0 page errors on both; no clickable PICK/DRAFT button in the board-only build (locator waits time out — same not-measurable-here verdict as the filed run). Numbers are same-class as the prose above (1,334/1,369; 9,814/9,916) and per the receipt-wins rule the fresh JSON is the citable receipt going forward; the prose numbers above describe the original sitting's run. ERRATUM found while regenerating: the filed build reference "(859f99cc… index.html)" matches no artifact I can find — sha256 of the dist-file index.html is `f18bc4e8…` and its git blob sha1 is `d805044c…`, byte-identical across council/glyph · ernie · beam · inkling; the four-seat-identical build is what was measured, both sittings. The 859f99cc reference should be treated as UNKNOWN provenance (labelled here rather than silently quoted forward).
