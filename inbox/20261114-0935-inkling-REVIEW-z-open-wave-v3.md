SPEAKER: inkling | ROLE: review of Z.ai's open wave v3 (published this session at `908fbdb8`) | TASK: "push this folder … then review it" | DATE: 2026-11-14T09:35Z
REVIEW-OF: `z open wave v3/` (256 files, 6.5 MB, MANIFEST 255/255 OK — VERIFIED by re-hash from the copied tree)
VERDICT: improved — the byte-level claims verify; three receipts the report cites are absent from the delivery; path citations need a map

**Scope note:** the push itself FAILED server-side (see end); this review is on the local bytes @ `908fbdb8`, byte-identical to the Desktop handoff folder. Labels: VERIFIED (re-run this pass) · INFERRED · REPORTED · UNKNOWN.

## What VERIFIED (each re-run)

1. **MANIFEST** — `sha256sum -c MANIFEST.txt` → all 255 listed files OK, exit 0, zero FAILED. Folder = 256 files (255 + MANIFEST). No secrets, no `.git`, no node_modules, largest blob 882 KB (VERIFIED via `ls-tree -l`).
2. **Engine vendoring, the strongest claim in the report** — both arms' `src-bench/engine/` trees are **byte-identical to `colors/src` @ `origin/architect/engine-and-seats @ d3bd81d2`**: `diff -rq` both arms → exit 0, zero files, 57 files each (VERIFIED). The arms did **not** touch the engine.
3. **`files=112`** — `git ls-tree -r origin/architect/engine-and-seats -- colors/ | wc -l` → **112** (57 src + 39 test + 10 tools + 6 config). The harness's "112-file tree" is exactly the `colors/` file count at d3bd81d2. The digest **value** itself is UNKNOWN (see defect 2), but the count is real, not prose.
4. **Analysis artifacts** — `receipts/tier2-run{1,2}-analysis.json` exist and parse: run1 r16-u31 sort vue 5077.03 vs svelte 1598.87 (ratio ≈3.18) ✓; both runs `g5: {failures: [], crossArmMismatches: 0, samples: 600}` → **G5 600/600 ×2** ✓; run2 `TIE`, ratio 1.01 ✓. Also: **the `select` cell p95 is 64.67 (vue) / 64.19 (svelte)** — independent third confirmation that UX-3 fails its 50 ms spec budget, matching the packet errata.
5. **Errata table `receipts/errata-reissued-table.json`** — W1 sums 19.81/40.13/10.38/9.73; D-32R per-run min/median/max and outliers 1583.09/1101.23; `W4_seasonMs` 335.3/339.9/349.9/341.5; p95 0.075–0.079; recordBytes 187,078/187,079 — **matches INKLING's independent re-derivation from the v1 receipts exactly**.
6. **A1 resume** — `receipts/resume-{vue,svelte}.json`: identical `recordSha e62e79f4471f…`, 1,024 picks, `ok: true`, and the `rngPos` block states position-keyed forks with `cursorRequired: false` — the A1 story on the bytes is consistent (cross-arm sha identity VERIFIED).
7. **w89-quirks** — gh-pages tip is `3e69567c` ("Publish w89 as live index"), extracted `index.html` = **1,922,769 bytes** (matches the quirks header); every cited byte offset re-measured exactly: `fonts.googleapis` @40528/40640 · `ZPB_TEAM_COLORS` @373041 (~32 teams, ": [" ×32) · `#140d06` @1690634 · jingle @1889122 · `fxpop/fxshine/fxglow` present · `--pc1` @1690603/1691173 (same rule region). The quirks doc's own numbers are real.
8. **team-palette.json** — parses, **32 teams** ✓. **`bench15-H.json`** — `filterVocabFixed: true` present in **both** arms (nested; grep VERIFIED) ✓. **brag-card.html** — 58,091 B, base64-embedded fonts ✓ (the claimed "58 KB" holds). **spike**: analysis-time tie-rule enforcement exists as artifact, not assertion ✓ (run1 3.18 → "svelte faster"; run2 1.01 → "TIE" — the rule demonstrably fired on both sides).
9. **Phase C w89 single offline error** — consistent with the quirks (fonts.googleapis @40528/40640 is the only external fetch; no other external URLs expected — INFERRED, not independently re-driven).
10. **Live-wave claim** — `origin/gh-pages` tip = `3e69567c` ✓ as reported.

## Defects / gaps (each actionable)

1. **`receipts/a3.json` is claimed NOW SHIPPED and is ABSENT.** REPORT §1 row 7 and §11-1 both rest on it ("chromium-identical; Firefox/WebKit UNKNOWN"). Not in the folder, not in MANIFEST. Either the artifact exists and was left behind, or the row overstates. **Row must not be cited to the Owner until the file ships or the row is downgraded to REPORTED.**
2. **`scripts/vendor-digest.mjs` and `scripts/digest-chase.mjs` are cited as the digest receipts and are ABSENT.** The `cd298e99`-withdrawal story is structurally sound (authors can renounce; the count-112 consistency check passes), but **the 432a1701 value cannot be reproduced from the delivery** — no algorithm, no script. The vendor digest stays **INFERRED/REPORTED**, not VERIFIED, until the script ships or an independent seat reproduces the hash (candidate recipe: sha256 over the sorted-path file list of `colors/` @ d3bd81d2 — needs the actual algorithm before anyone bakes a different one).
3. **`scripts/vite.file.config.mjs` absent** — the tent-test `dist-file` build config the report credits for the offline story is not in the delivery (the **output** `dist-file/` is present and manifest-verified, so the claim is credible — but not reproducible).
4. **Path hygiene — the report cites at least eight paths that do not exist as written:** `shots-d/…` and `shots-reveal/…` (actual: `shots/…`), `w89-quirks.{md,json}` (actual: `receipts/…`), `shared/sync-rule.ts` / `save-envelope.ts` / `core/rng.ts` (actual: `arms/<arm>/src-bench/…`), `scripts/…` (defect 2/3), `phaseA-*-main.json` (actual: `receipts/phaseA-*-main.json`). Anyone executing the report's receipts verbatim stalls on the first seven. Fix = one path map, or relative-to-root rewrite.
5. **START-OF-CHAT-ZAI-section2-update.md references "log in the zip"** — the Phase-J 7-defect / 10-cycle log is not in the folder (the zip was never shipped either). Flag so nobody hunts for it.
6. **w89-quirks header names `Football-Sim-Z-post-blue-w89.html`** — on gh-pages it is `index.html` (tip 3e69567c); byte count and offsets match exactly, filename mismatch only. Cosmetic.
7. **`cd298e99` withdrawn by the author** — credit for honest renunciation; the withdrawal is not corroborated by a receipt either (it's a confession, not a measurement) — both sides of the v1 digest story remain REPORTED until defect 2 closes.
8. **`a3.json` verdict itself is unverifiable** — "chromium-identical" rests entirely on the missing file (defect 1). The claim MAY be true; nothing here can confirm it.
9. **§12 framework answer lives outside the package** ("answered in the chat reply") — by design (boundary kept), but note it: the package contains **no framework verdict**, and any chat summary that implies one is out-of-band and unverifiable from these bytes.

## Weakest point of the work (as filed)

Self-consistency of a self-reported delivery. Every structural claim that CAN be checked cheaply passed (1–10 above — including the two hardest ones, the 57-file byte-identity and the byte-offset quirks). Everything checkable that is MISSING is missing in exactly one pattern: **the three artifacts that can't be executed cheaply** (browser-run A3, the digest harness, the vite config). That pattern is a coverage gap, not evidence of invention — but it means the delivery's "errata all closed" line is **not** signable as written.

## Verdict rationale

`improved`, not `rejected`: the delivery's verifiable core is excellent and consistent with every independent measurement taken across this wave (v1 receipts, tier2 analysis, the 2,195.62 vs 2,194.47 tie, the 64–66 ms select cell). `not ok`, because defects 1–3 cite receipts that do not exist — for a delivery whose entire purpose this wave was receipts-vs-prose, that is the one class of defect it cannot afford.

**Ask (for the Owner / Z.ai, via whoever relays):** ship (a) `receipts/a3.json`, (b) `scripts/vendor-digest.mjs` + `scripts/digest-chase.mjs`, (c) `scripts/vite.file.config.mjs`, or amend the three report rows to REPORTED; add a one-line path map or root the citations. No new measurement is requested; the gap is coverage, not method.

## Push status (not part of the review, for the Owner)

Commit `908fbdb8` (256 files, `z open wave v3/` at root, Owner-ordered publish) is **local only** — two `git push origin council/inkling` attempts were rejected server-side with the SAME error:
`remote: error: unable to write file /data/repositories/…/objects/ghq_…/pack/pack-d0a588f4d556cadbf364f0aeb88a2e2cc9b2eda1.pack: No such file or directory` / `fatal: unable to rename temporary '*.pack' file` → `! [remote rejected] council/inkling (failed)`.
This is the same class of server-side failure that kept the v1 publish local until relayed (37c15d12 reached `origin/council/inkling` only later). Options: (1) the Owner relays the push from the Desktop handoff folder (the bytes are byte-identical to `908fbdb8`), (2) the server-side filesystem issue is cleared and a retry lands, (3) it stays local — visible to nobody. `git ls-remote origin refs/heads/council/inkling` = `cebd30f5…` (pre-publish) as of this writing.

— inkling (review; votes not offered; no seats instructed; Z.ai's work is Z.ai's — the defects above are coverage notes, not blame)
