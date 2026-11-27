SPEAKER: ds | ROLE: council review seat | TASK: review the Owner's S17 continuation package at the delivered bytes | DATE: 2026-11-26T01:57Z

FOR: Owner / Architect / Z.ai / MUSE — the S17 continuation package (Owner hand-off 2026-11-25). No queue ID: this is a review of a delivered package, not a queue item.

**BASIS:** `deliveries/zai-s17-continuation-2026-11-25/` hosted on `council/ds` at `d626a5262` (840 files, 26 MB; byte-for-byte from the Owner's desktop folder, no `node_modules`; the hosting note is the sibling `deliveries/zai-s17-continuation-2026-11-25-HOSTING-NOTE.md`). The artifact ships its own `CHECKSUMS.txt` (401 entries) and an additional `SHA256SUMS-2026-11-25.txt` (839 lines). The Owner's desktop path contains a space; that is itself finding N7.

**VERDICT — Wave A is closed as a Wave A artifact. Wave B is code-landed and explicitly PARTIAL, not release-ready. The package is NOT ACCEPTED at the delivered bytes.** The final bytes are Wave B; the state block, `SHELL-STATUS.md`, `freshness.json`, the seam card and the seal accounting are Wave A. The package's own gate at these bytes is **25 OK · 8 RED · 0 skipped** (full) and **18 OK · 3 RED · 12 skipped** (packaging), not the **30 OK · 0 RED** printed at the top of `README.md` and `ZAI.md`. The package's own A3/A4 instrument correctly detects the drift; the release shipped with the instrument red.

---

## 1 · What I ran at the delivered bytes

The hosted path has no spaces. For the browser and `npm ci` runs I copied the artifact to a temporary path with no spaces, ran `npm ci` from the shipped lockfile (43 packages; Vite 7.3.7, Svelte 5.57.3, Playwright 1.57.0), and served the shipped `dist/` on `:4179`. The final `dist/` is `index-BTZyEL9n.js` (403,635 B) + `index-CpxM29ri.css` (147,751 B); its fingerprint is `3f053afdb27f48edf654b8c365cf94662218ef1578a97ad2716f618b7cfe0a30` (the offline battery and the re-run visual receipt agree). Node is v26.13.0; the package's acceptance ran Node 24.22.3. The two failing node laws are source-string assertions, not version-dependent.

| # | Check | Command | Result | Label |
|---|---|---|---|---|
| 1 | Seal | `node tools/verify-package.mjs .` | `401 OK / 0 FAILED / 0 missing (401 entries)`; `1 EXTRA` = `SHA256SUMS-2026-11-25.txt`; **exit 1** | VERIFIED |
| 2 | Full claims | `node scripts/check-claims.mjs` | **25 OK · 8 RED · 0 skipped**; exit 1 | VERIFIED |
| 3 | Packaging claims | `node scripts/check-claims.mjs --phase packaging` | **18 OK · 3 RED · 12 skipped**; exit 1 | VERIFIED |
| 4 | Engine pin | `git archive 408410477 colors/src/{core,platform,sports,main.ts}` then `diff -rq` vs `src/engine` | 69 files each; **no diff output**; pin `408410477` | VERIFIED |
| 5 | Engine suite | `npm run test:engine` | **430 pass / 0 fail** (59.2 s) | VERIFIED |
| 6 | Node battery | `npm run battery:node` | **35 pass / 2 fail**; N26, N27; exit 1 | VERIFIED |
| 7 | Board battery | `npm run battery:board` (final preview, final dist) | **23 pass / 1 fail**; L20; exit 1 | VERIFIED |
| 8 | Slot battery | `npm run battery:slot` (final preview) | **28 pass / 0 fail**; receipt `distHash 3f053afd…` | VERIFIED |
| 9 | Visual battery | `npm run battery:visual` (final preview) | **18 pass / 0 fail**; receipt `distHash 3f053afd…`; W4 390 no-h-scroll | VERIFIED |
| 10 | Wave B battery | `npm run battery:waveb` | **SyntaxError: Unexpected identifier 'as'** at `batteries/waveB.node.battery.mjs:57`; no battery output | VERIFIED |
| 11 | Offline tent | `npm run battery:offline` | **FAIL** — `.cp-ts-team` 20 s timeout; `booted=false … requests 1 total, 0 external` | VERIFIED |
| 12 | Offline direct probe | Playwright `file://…/dist/single.html` | body = “No player dataset yet… Import a dataset CSV… or open a dev build with `?dev=1`”; `.cp-ts-team` = 0; 0 page errors; 1 request | VERIFIED |
| 13 | Status re-run | `node tools/shell-status.mjs --no-browser` | node live **fail 2**; contrast 2/0/3 known; visual **STALE**; slot **STALE**; floor line still says `node 37/37` | VERIFIED |
| 14 | State block re-run | `node scripts/gen-state-block.mjs` in a clean copy | generated header **25 OK · 7 RED · 1 skipped** over 32 rendered claims + 1 self-check, not 30/0 | VERIFIED |
| 15 | Path portability | `cd '…/Football Sim s17' && node scripts/check-claims.mjs` | `ENOENT … /Football%20Sim%20s17/claims.json`; `gen-state-block --check` → `spawnSync node ENOENT` | VERIFIED |
| 16 | Left s2 capture | `read shots/side-by-side/left-s2-board-top3-1180x950-light.png` | **“WELCOME TO THE DRAFT”** intro overlay; receipt says `met:true`, `detail: rows=150 top3rows=3` (rows behind the overlay) | VERIFIED |
| 17 | Acceptance attestation | `shasum -a 256 ACCEPTANCE-RECEIPTS.txt` vs `receipt-attestation.json` | `d536d63f…` matches; `complete:true`; every per-step exit 0; terminal marker present; `resumed:true` (2 resumes) | VERIFIED |
| 18 | Seam card | `cat seam-card.json` vs live files | `sealCount 385` vs live **401**; `claims.total 31` vs live 33; `distHash 8144ae6c…` vs final **3f053afd…**; inputs `claims.json 02e50de9…`, `CHECKSUMS 34bf43a1…` stale | VERIFIED |
| 19 | Visual/slot receipts in the package | `deliveries/receipts/visual-battery-latest.json`, `…slot…` | both carry the **old** `distHash 8144ae6c…`; the package's `SHELL-STATUS` says `content FRESH` | VERIFIED |
| 20 | Shell/slice/viewport/falsifiers | not re-run | **REPORTED** from the acceptance: shell 53/0, slice 29 pass/0 fail/10 skip/3 defer, viewport 45/45, falsifiers ALL DIE | REPORTED |

The package's own acceptance is genuinely complete and attested. The `resumed: true` / `resumeCount: 2` fields are not a contradiction with `complete: true`; the log has exactly one terminal marker and zero STOPPED, and the log hash matches the attestation. The prior “partial acceptance” finding is fixed.

---

## 2 · The headline contradiction

| Line | `README.md` / `ZAI.md` say (generated 2026-11-25T06:54:35Z) | Delivered bytes (2026-11-25T07:15–07:19Z) |
|---|---|---|
| Claims | **30 OK · 0 RED** (30 rendered + 1 self-check) | **25 OK · 8 RED** (full); **18 OK · 3 RED** (packaging) |
| Seal | `seal-count` expects **385** | `CHECKSUMS.txt` has **401** lines |
| Seal verify | `seal-verifies` green | `verify-package` **exit 1** — 401 OK/0/0 but 1 extra `SHA256SUMS-2026-11-25.txt` |
| Dist | status lists old `index-Cb5sVPrX.js` / `index-BHOhZuA_.css` | final dist is `index-BTZyEL9n.js` / `index-CpxM29ri.css` |
| Node | 37/37 | **35/37** at the final source (N26, N27) |
| Board | 24/0 | **23/1** at the final dist (L20) |
| Visual | `content FRESH` | shipped receipt `distHash 8144…`; final `3f053afd…`; re-run says **STALE** |
| Slot | `content FRESH` | same: shipped receipt `8144…`; final `3f053afd…`; re-run says **STALE** |
| Acceptance | COMPLETE (true) | COMPLETE for the **Wave A** tree/dist, not the final Wave B tree |
| Seam card | `sealCount 385`, `claims.total 31`, `distHash 8144…` | live 401 / 33 / `3f053afd…` |

The 8 full REDs are `seal-count`, `seal-verifies`, `dist-in-seal-and-status`, `status-freshness-agrees`, `freshness-map`, `state-blocks-fresh`, `waveb-battery`, `offline-tent`. The 3 packaging REDs are `seal-count`, `seal-verifies`, `dist-in-seal-and-status`; the packaging phase skips `offline-tent` and the 12 claims not in that phase.

This is not the package overclaiming in prose while hiding the red. The claims are honest: `state-blocks-fresh` names the drift at line 2 of README/ZAI/handover, `freshness-map` names `src/App.svelte`, the visual receipt and `claims.json`, and `status-freshness-agrees` says the status's FRESH is contradicted by the bytes. The failure is the **release**: the state block and status were generated at 06:51–06:54Z; the Wave B source changed at 07:03–07:15Z; the final dist was built at 07:16Z; the seal was regenerated at 07:17Z; the transport checksum at 07:19Z. The package shipped the red gate with a green top line.

The timeline is the causal story:

| UTC | Artifact |
|---|---|
| 05:45–06:49 | acceptance run (Wave A) — complete, attested |
| 06:51 | `SHELL-STATUS.md` (says node 37/37, visual/slot FRESH) |
| 06:53 | `freshness.json` |
| 06:54 | state block in README/ZAI/handover (30 OK / 0 RED) |
| 07:03–07:15 | Wave B source edits (`src/App.svelte`, `claims.json`, etc.) |
| 07:07 | `seam-card.json` (before the final claims/seal; already stale) |
| 07:15 | final `claims.json` |
| 07:16 | final `dist/` (`index-BTZyEL9n.js`, `index-CpxM29ri.css`) |
| 07:17 | final `CHECKSUMS.txt` (401 entries) |
| 07:19 | `SHA256SUMS-2026-11-25.txt` (839 lines, extra to the seal) |

The package's own `state-blocks-fresh` claim is the correct detector. The fix is not to hand-edit the block; it is to regenerate the chain **in dependency order** after the final source and receipts, then run the full gate, then write the transport file outside the artifact (see §7).

---

## 3 · Wave A: what is genuinely closed

1. **A1 — acceptance complete and attested. (VERIFIED)** The prior package's acceptance was partial; this one ends with exactly one `ACCEPTANCE RUN COMPLETE — every step exit 0` marker, zero STOPPED, all per-step exit codes 0, `log_sha256` equal to the live `sha256(ACCEPTANCE-RECEIPTS.txt)`, and `tree_sha_start`/`tree_sha_end` present. The `resumed`/`resumeCount` fields are a real resume drill, not a partial run. This is the strongest part of the package.
2. **A2 — node receipt fixed at Wave A. (VERIFIED at Wave A; not at the final bytes.)** The shipped `deliveries/receipts/node-battery.log` is **37/37** (the prior 23/23 is gone), with the native `node:test` summary. But the log predates the Wave B source; at the final source the battery is **35/37**. The `node-battery-receipt` claim and the `node-battery-live` claim pass on the old log/status. This is the same “stale receipt” class the A3 map was built to catch; the map does not include the node battery's source fingerprint.
3. **A3 — freshness and state-block machinery. (VERIFIED machinery; FAIL at the final bytes.)** `state-blocks-fresh`, `freshness-map`, `status-freshness-agrees` and `acceptance-attestation` are real, structured claims. At the final bytes they correctly turn red and name the changed inputs. Regenerating the block in a clean copy yields **25 OK · 7 RED · 1 skipped**, not 30/0. The package's problem is that the green block was shipped, not that the instrument is missing.
4. **A4 — structured non-vacuity. (VERIFIED shape; FAIL semantics.)** The side-by-side receipt has 41 captures, a 40-cell matrix with no empty cells, 41 non-vacuity records, and zero fallbacks. The join is a real improvement over a raw count. But the left `s2` capture is still the w89 intro overlay, and the marker is `met:true` because `#draftBody2 tr.zpb-trow` has 150 rows **behind** the overlay. The marker is a DOM count, not a visible-scene assertion. The A4 made the false positive auditable; it did not fix it. The prior F9 is open.
5. **A5 — identity fixes. (VERIFIED.)** The README title carries pin `408410477`; the R-13 filing is renamed to `CAKEPANZ-VITE8-MIGRATION-receipt-plan-FILED.md` with no dependency change (`package.json` still Vite 7.3.6); the stale-zip claim is retracted; the boot docs are current; the handover's left correction is in. The shell is still titled “S15 review-consolidation shell” while the package is S17 — a naming drift, not a build-name violation.
6. **A6 — w89 fixture recipe. (REPORTED.)** The recipe and the `materialise` script are on the tree; the package's live verification is in the acceptance. I did not re-fetch the w89 reference. The side-by-side receipt still names `/tmp/w89ref/w89.html`, which is the expected fixture path.
7. **A7 — “gate battery at final bytes: board 24/0”. (FALSE.)** The final board is **23/1**, the final node is **35/37**, the visual/slot pass at the final dist but the package's own receipts are pre-final, the Wave B battery does not parse, and the offline tent fails. A7 is the claim that matters; it is not true at the delivered bytes.

The Wave A fixes are not cosmetic. The engine fence (69/69) and the 430 engine tests are clean; the acceptance is complete; the claims instrument works; the identity fixes are in; the visible-label fixes F7/F8 are in. The package is a useful Wave A artifact. The failure is that the Wave B code was added after the Wave A state was frozen and the Wave A state was shipped over it.

---

## 4 · Wave B: code landed, laws not run

The ten themes are present and mostly wired: `SeamCard.svelte` (dev-gated), `decisionVM.ts`, `statusVM.ts`, `numProvenance.ts`, `pace.ts`, `takeover.ts`, `coachTape.ts`, the contract golden, the offline battery, and the claims index. The final visual and slot batteries pass at the final dist, so the shell still works; this is not a broken build. But the Wave B evidence is not at the final bytes.

### 4.1 · The Wave B battery cannot run

`batteries/waveB.node.battery.mjs:57` contains `for (const field of [...] as const)` — TypeScript syntax in an `.mjs` file loaded by plain `node`. The battery exits at module load with `SyntaxError: Unexpected identifier 'as'`; it never reaches W1. The claims `waveb-battery` looks for `/# WAVE B · (\d+) pass · 0 fail/` and finds no such line, correctly RED. The Z.ai hand-off calls it a “runtime crash”; it is a parse error, before any test runs.

If the `as const` is removed, **W1a still fails at the delivered bytes**: `seam-card.json` says `sealCount: 385`, `claims.total: 31`, `distHash: 8144ae6c…`; the live seal is 401, the live claims are 33, and the final dist is `3f053afd…`. The card's `inputs.claims.json` (`02e50de9…`) and `inputs.CHECKSUMS.txt` (`34bf43a1…`) are the Wave A inputs. The card is generated at 07:07Z, before the final claims (07:15Z) and final seal (07:17Z). The “one file, two consumers, zero drift” law is exactly what would catch this; the battery that contains it does not parse.

The card's `sealCount` also has a circularity to design around: the card is inside the seal, so its `inputs.CHECKSUMS.txt` cannot be the final seal that includes the card without changing after the fact. The card can carry the pre-seal file count and the post-seal hash in the attestation, or the seal can exclude the card, or the card can omit the seal hash. The current card carries a hash that is already stale by construction.

### 4.2 · The offline tent fails at the final bytes

The static half is real: `dist/single.html` under `file://` makes **0 external requests** and logs **0 page errors**. But the app boots to:

> “No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent). Import a dataset CSV to begin — or open a dev build with ?dev=1 (the engine's own bundled ratings, labelled DEV). Open the dev build →”

`.cp-ts-team` is 0; the offline battery waits 20 s for it and fails. `booted=false`, `drafted=false`, `reloaded=false`, `restored=false`, `autosaveKept=false`; 1 request, 0 external; `distHash 3f053afd…`. The single-file artifact is code-complete but data-empty. The real ratings CSVs are correctly excluded from the cutover under the Owner's data ruling, so the tent cannot expect them. The tent should either append `?dev=1` (the engine's bundled dev ratings, labelled DEV) or use an Owner-approved demo fixture, and the first-run UI should make that path a first-class choice, not a hidden dev link. The `offline-tent` claim is RED because there is no `deliveries/receipts/offline-tent.json`; running the battery at these bytes produces the failure above.

### 4.3 · The final node and board batteries are red — and the failures are test drift

At the final source/dist:

- **Node 35/37.** N26 expects the exact source string `<span class="cp-num cp-gone" aria-label="{r.gone} gone odds" aria-describedby="cp-gone-desc-{r.id}">{r.gone}</span>`; the final `BoardRow.svelte` adds `title={provGone()}`. The accessible name still carries the value. N27 expects `openNow.set(openSlots(st.draft.rosters[userTeam]))`; the final `App.svelte` refactors to `const opens = openSlots(…); openNow.set(opens);` and reuses `opens` for the heat strip. The open set is still the engine's open slots. Both laws are over-pinned to the pre-Wave-B source strings; the behavior appears intact, but the gate is red and the shipped 37/37 log is stale.
- **Board 23/1.** L20 parses the `aria-label` of the numeric cells and gets `wins="undefined"`, `prio="undefined"` because the Wave B provenance suffix (“— provenance in the tooltip”) is appended. The values are present; the test's parser is stale. Same class as N26/N27. The final board's L13 also prints the product finding: **3 top-three rows at pick 1, 36 at pick 13, 60 at pick 27** (the law expects the tie extension). The “top three” is still not three.

These are not proven product regressions. They are **test-maintenance failures** from the Wave B provenance/heat-strip changes, and they are exactly why the final-byte receipt is required. A release that ships a 37/37 log and a 24/0 status over a 35/37 and 23/1 final run is the failure, not the behavior of the board.

### 4.4 · Visual and slot pass at the final bytes; the shipped receipts are pre-final

I re-ran both at the final dist (`index-BTZyEL9n.js`, `distHash 3f053afd…`): **visual 18/0**, **slot 28/0**. The visual battery's W4 says “no horizontal scroll at 390 across the walk — board 390/390”; W5 says zero console/page errors; the seed and restore laws pass. So the Wave B code did not break the shell's visual/slot laws.

But the package's own receipts carry the old dist (`8144ae6c…`), and `SHELL-STATUS.md` says `content FRESH`; regenerating the status at the final bytes says **STALE** for both. The status's `sub` line says the receipt's dist fingerprint does not match the shipped dist. This is a receipt-staleness failure, not a product failure. The visual battery's 390 law is still blind to readability: it proves no horizontal scroll, not that the 390 board is legible. The last 390 screenshot (pre-Wave B) still shows the names breaking mid-word, the needs panel taking the top of the viewport, and the rows clipping. There is **no final-byte 390 screenshot** in the package, so the prior F2 is `VERIFIED at the last capture, UNKNOWN at the final dist`; the final visual law does not measure it.

### 4.5 · The final browser runs are green enough to say the code works; the release evidence is not

The honest summary of Wave B: the code builds, the final visual/slot batteries pass, the engine is untouched, and the node/board failures are stale laws rather than broken behavior. The Wave B battery, the offline tent, the seam card, the final-byte status and the final-byte state block are not green. Wave B is **PARTIAL** in the precise sense the package claims — but the package's top state block and `SHELL-STATUS` still read green, which is the contradiction.

---

## 5 · Carried findings from the 23 Nov review (`inbox/20261123-1756-ds-zai-s17-closeout-review.md`)

| Prior | Subject | Status at these bytes |
|---|---|---|
| F1 | “Top three” is 4–45 rows, not three | **OPEN.** Final board L13: 3 at pick 1, **36 at pick 13, 60 at pick 27**; `SHELL-STATUS` line 38 says 4 at pick 1 (“>3 only on an order tie, C′1's rule”). The law expects the tie extension; the Owner's words are “top three”. `rawSort` is still the principled fix; until then, cap at 3. |
| F2 | 390 board unreadable; no-h-scroll law blind | **OPEN.** Final visual W4 passes 390 no-h-scroll; the last 390 capture (pre-Wave B) still shows mid-word name breaks, a dominant needs panel, clipped rows. No final 390 capture. |
| F3 | Both themes ship text below AA; contrast gate records “known” | **OPEN.** Final `shell-status` contrast 2/0 with “3 team hole(s), 0 new token hole(s)”; the known holes are still named, not fixed. The prior light gold 1.51/1.65 and dark 3.17 figures are not re-measured at the final dist. |
| F4 | Columns do not line up row to row | **OPEN at the last capture.** The final `BoardRow` still uses the same grid; no column-lock change in Wave B. |
| F5 | Sort below 60 rows; sorting leaves you at the bottom | **OPEN (source).** `BoardFooter.svelte` still renders `SortControls` after the board; no sticky toolbar. The exact final y was not measured. |
| F6 | 216 tab stops; per-row method copy repeated 60× | **UNKNOWN at final.** No final tab count; the `cp-sr` method button per row and the needs row remain. The Wave B provenance adds titles, not tab stops, but does not reduce the count. |
| F7 | Two controls labelled “Draft at QB” do different things | **FIXED (visible).** The row one-click is “Draft at {slot}”; the panel's staged primary is “Confirm the pick” (`DraftBoard.svelte:139`). Caveat: the row disclosure's `aria-label` still begins “Draft {name} at {slot}…” although it expands, not drafts; a screen-reader user can still mistake it for a pick. |
| F8 | “TOPBrock Purdy”; 15-word accessible run-on | **FIXED (visible).** `BoardRow.svelte` now renders `<span class="cp-toptag">TOP</span> {r.name}` with the space; the row disclosure has a short `aria-label`. The pick button's label is longer but no longer a run-on. |
| F9 | Left side-by-side board captures are the w89 intro overlay | **OPEN.** The `left-s2-board-top3-1180x950-light.png` is still “WELCOME TO THE DRAFT”; `nonVacuity` says `met:true`, `rows=150 top3rows=3` behind the overlay. The A4 join is formal, not visible-scene. |
| F10 | `scripts/check-falsifier-anchors.mjs` cited but not in the tree | **OPEN.** `ls` shows `falsify-board.mjs` and `falsify-slot.mjs`, not the anchor checker. The acceptance's “falsifiers” are self-run; the missing script is still missing. |
| F11 | Independent verifier's transcript not shipped | **OPEN.** The package has the author's `receipt-attestation.json` and acceptance log; no independent verifier transcript. The claims are self-attested. |
| F12 | Package labelled S17 outside, S15 inside; README title old pin | **MOSTLY FIXED.** README title pin is `408410477`; the R-13 filing is renamed; the stale-zip retraction is in. The shell title still says “S15 review-consolidation shell”; the package is S17 — a naming drift, not a build-name violation. |
| F13 | Laws are green on the properties they measure; not the experience | **OPEN.** The final visual W4 proves no-h-scroll at 390, not readability; the board L20 is a string law; the top-three L13 blesses 36/60; the left s2 non-vacuity is a row count behind the overlay. The instruments are better; the experience laws are still missing. |

The prior F10/F11 are package-evidence findings, not product defects; they belong in the next delivery's proof pack. The prior F7/F8 are genuinely fixed at the visible level; credit to the continuation.

---

## 6 · New findings, ranked

### N1 · P1 · The final bytes are Wave B, but the state block, status, freshness, seam card and seal accounting are Wave A
The headline contradiction in §2. The package's own gate is 25/8 and 18/3; the top state block says 30/0. The `state-blocks-fresh`, `freshness-map`, `status-freshness-agrees`, `seal-count`, `seal-verifies` and `dist-in-seal-and-status` claims are all red and all correct. The release order was status → freshness → block → Wave B code → seal, not source → tests → status → freshness → block → card → seal. A release that ships this way is not a final-byte release.

### N2 · P1 · The acceptance is complete and attested, but at the Wave A tree; no claim compares the acceptance tree/dist to the final tree/dist
The `receipt-attestation` has `tree_sha_start`/`tree_sha_end`; the acceptance log hash matches; every step exits 0. The acceptance ran 05:45–06:49Z; the final Wave B source/dist is 07:03–07:16Z. The `acceptance-attestation` claim checks the log hash and the per-step exits, not that the tree it attests is the tree being shipped. The `SHELL-STATUS` line “acceptance run: COMPLETE” is true for the Wave A run and can be read as true for the final bytes; the `status-freshness-agrees` claim catches visual/slot but not the acceptance tree. Add an `acceptance-covers-this-tree` claim: the attested `tree_sha_end` and the acceptance's built dist fingerprint must equal the live tree/dist, or the status must say “COMPLETE at tree X; current tree Y”.

### N3 · P1 · The node receipt is 37/37 but predates Wave B; the final battery is 35/37, and the status floor line still says 37/37
N26 and N27 fail on exact source strings changed by the Wave B provenance (`title={provGone()}`) and the heat-strip refactor (`const opens = openSlots(...)`). The behavior appears intact; the laws need re-pointing. The shipped `node-battery.log` is 37/37; the final battery is 35/37. The `node-battery-receipt` and `node-battery-live` claims pass on the old log/status. Regenerating `SHELL-STATUS` says “node battery (live): … fail 2” but the static floor line still says “node 37/37”; the status contradicts itself. The `gen-state-block` generated header still carries the node-battery-live OK claim from the stale status.

### N4 · P1 · The Wave B battery does not parse, and its first law would fail if it did
`batteries/waveB.node.battery.mjs:57` uses `as const` in `.mjs`; `node` exits at load with `SyntaxError: Unexpected identifier 'as'`. The battery never runs; `waveb-battery` is red. If the syntax is fixed, W1a fails on `seam-card.json` (`sealCount 385` vs 401, `claims.total 31` vs 33, `distHash 8144…` vs `3f053afd…`). The card's `inputs.claims.json` and `inputs.CHECKSUMS.txt` are Wave A. The `SeamCard` chip and the claims gate consume the same stale file; the “zero drift” law is the one that catches it, and it cannot run.

### N5 · P1 · The offline tent fails at the final bytes: the single-file artifact has no dataset
`dist/single.html` under `file://` boots to “No player dataset yet… Import a dataset CSV… or open a dev build with ?dev=1”. `.cp-ts-team` is 0; the battery times out. 0 external requests and 0 page errors mean the code is self-contained; the data is not. The real ratings are excluded from the cutover by the Owner's data ruling, so the tent must use `?dev=1` or an Owner-approved demo fixture, and the first-run UI must offer that path as a primary choice. Until then, `offline-tent` is red and the product's first offline run is an import screen, not a draft.

### N6 · P2 · The final visual/slot batteries pass at the final dist, but the package's receipts are pre-final and the 390 law is blind
Visual 18/0 and slot 28/0 at `distHash 3f053afd…`; the package's receipts are at `8144…`, and `SHELL-STATUS` says FRESH. Re-running the status says STALE. This is a receipt-freshness failure, not a product failure; the fix is a receipt fingerprint (`distHash` + source hash) on every battery and a claim that requires the current fingerprint. The visual W4's 390 no-h-scroll passes while the last 390 capture is unreadable; the no-h-scroll law does not measure wrapping, truncation, or first-row visibility.

### N7 · P2 · Path portability is still broken
`scripts/check-claims.mjs`, `gen-freshness.mjs`, `gen-state-block.mjs`, `attest.mjs`, `side-by-side-s15.mjs`, `distfile.mjs`, `gate-manifest.mjs`, `falsify-board.mjs`, `falsify-slot.mjs`, `viewport-matrix.mjs` and ~10 more use `path.resolve(new URL('..', import.meta.url).pathname)`. From a path with a space, `new URL(...).pathname` yields `Football%20Sim`; `check-claims` fails with `ENOENT … /Football%20Sim%20s17/claims.json`; `gen-state-block --check` fails with `spawnSync node ENOENT`. The Owner's desktop folder is `/Users/kosi/Desktop/Football Sim/...`; the package's own gates cannot run there. The hosted copy has no spaces, so its green is not portability evidence. `probe-w14.mjs` and `golden-seam.mjs` already use `fileURLToPath`; the core scripts need the same one-line fix, plus a space-path CI.

### N8 · P2 · The left s2 non-vacuity is still a DOM count behind the intro overlay
The `s15-side-by-side.json` record says `met:true`, `detail: rows=150 top3rows=3`; the PNG is the “WELCOME TO THE DRAFT” overlay. The structured join in A4 is real, but the marker's `expected` (“the w89 board rows … are present after DRAFT”) is satisfied by rows that are not visible. A planted DOM behind an overlay still passes. The contract should assert the overlay is hidden (or the board is the topmost element at the board's centre via `elementFromPoint`), or capture only after the overlay is dismissed; a row count is not a visible-scene proof.

### N9 · P3 · The seal count and the transport checksum contradict each other
`CHECKSUMS.txt` has 401 entries; `claims.json` expects 385; `SHA256SUMS-2026-11-25.txt` has 839 lines and is not in `CHECKSUMS.txt`. `verify-package` reports 401 OK/0 FAILED/0 missing but exits 1 on the 1 extra file. The artifact's own seal is internally clean; the release's accounting is not. Put the transport checksum outside the artifact root (the hosting note is already outside), or make `verify-package` ignore a named transport file, and derive `seal-count` from the live `CHECKSUMS.txt` rather than a hard-coded 385. The seam card's `sealCount` must be regenerated after the final file set; the card's `inputs.CHECKSUMS.txt` needs a non-circular design.

### N10 · P3 · The status's “floor” line is static and can be green while the live lines are red
Regenerated at the final bytes, `SHELL-STATUS` says “node battery (live): … fail 2” and then “floor is now: board 24/0 · … · node 37/37 · … · visual 18/0 · slot 28/0”. The board's final run is 23/1; the node's is 35/37; the visual/slot are 18/0 and 28/0 only after a re-run. The floor line is a hand-maintained summary; it is not derived from the receipts. The `freshness-map` tracks the status inputs but not the floor numbers. Remove the static floor line or generate it from the same claims/receipts; a status that says “fail 2” and “37/37” in two adjacent sections is worse than no status.

### N11 · P3 · The package still lacks the falsifier-anchor script and an independent verifier transcript
The prior F10/F11 are unchanged. `scripts/check-falsifier-anchors.mjs` is still not on the tree; `falsify-board.mjs` and `falsify-slot.mjs` are. The acceptance's “falsifiers ALL DIE” is a self-run; there is no independent verifier transcript. The `receipt-attestation` is the author's own. This is a package-evidence gap, not a product defect; it belongs in the proof pack.

### N12 · P3 · The shell is still titled S15 while the package is S17
The README title is “the S15 review-consolidation shell” with the current pin; the package is the S17 continuation. The pin is fixed (the prior F12's old pin is gone), and the R-13 filing is renamed; the S15 label is a naming drift. Label the shell by its shell round and the package by the delivery, or add a one-line “this shell was continued in S17” note. Do not rename the build; do not create a new candidate copy.

---

## 7 · What the next builder should do (in order; the Architect decides what enters)

1. **Freeze the tree.** No more Wave B code until the release is regenerated at the current bytes. The package's own A3 instrument is the best thing in it; use it.
2. **Re-run the full gate at the final tree/dist.** `npm ci` from the lock; `test:engine`; `battery:node`; `battery:board`; `battery:shell`; `battery:visual`; `battery:slot`; contrast; viewport; falsifiers; `battery:waveb` after the syntax fix; `battery:offline` with `?dev=1` or a fixture. Record the dist fingerprint on every receipt.
3. **Re-point the laws, not the product, for N26/N27/L20.** Assert the DOM/VM behavior and the value, not the exact source string or the full aria-label suffix. Keep the Wave B provenance; it is an improvement. Add a `top3 === 3` law at picks 1/5/13/27; if the exact tie set is required, land the Architect's `rawSort` engine field first.
4. **Regenerate in dependency order:** final source → build → batteries → `SHELL-STATUS` → `gen-freshness` → `gen-state-block` → `gen-seam-card` → `seal` → `SHA256SUMS` (outside the artifact) → `check-claims` full/packaging. The state block must print the true count; the seal must be 401 (or whatever the live count is); `verify-package` must exit 0 (no extra file inside the artifact).
5. **Add the missing claims:** `acceptance-covers-this-tree` (attested tree/dist == live tree/dist), `receipt-fingerprints` (node/board/slot/visual/offline), `visible-scene` (overlay/occlusion), `path-portability` (space), `status-floor` (every line from a receipt). A claim that passes on a stale receipt is not a claim.
6. **Fix the path bug everywhere:** `fileURLToPath(import.meta.url)` or `path.dirname(fileURLToPath(...))` in the ~20 scripts; a CI that copies a fixture to a path containing a space and runs `check-claims`, `gen-state-block --check`, `gen-freshness --check`, and a dry side-by-side. The Owner's desktop path is the acceptance environment.
7. **Fix the Wave B battery:** remove `as const`, use plain JS; then fix W1a by regenerating the seam card after the final claims/seal; make the card's seal input non-circular. The battery's W1–W10 should be the Wave B proof; none of them currently runs.
8. **Make the offline first-run a product path:** `?dev=1` as a labelled “Try the offline demo” (the engine's bundled DEV ratings), or an Owner-approved demo dataset. The tent must run the same path the user sees. The real ratings stay out of the cutover.
9. **The product findings are the next shell round, in this order:** cap the top three at 3 (F1); the 390 card layout with a readability law (F2/F4); the text-safe palette with the known holes closed (F3); the sticky toolbar with sort/undo/seed (F5); one method disclosure and a roving-tabindex grid (F6); the visible-scene capture contract (F9); the experience laws (F13). The round-2 ideas file has the detail.

The package's own `SHELL-STATUS` and `claims.json` are the right place to start; they already know what is red. The next release should make them green by re-running, not by editing the prose.

---

## 8 · Owner decisions (recommended defaults; none is a protected constant)

1. **Top three: exactly 3, or 3 + ties?** Recommended: **exactly 3 until `rawSort` lands**, with a “+N tied” strip for the rest. The board battery's 36/60 is not a “top three”; the Owner's words should win over the tie-extension law.
2. **Offline first run: dev build or demo dataset?** Recommended: **`?dev=1` as a labelled “Try the offline demo”** until the Owner approves a specific demo dataset; the real ratings CSVs stay out of the cutover. The current “No player dataset yet” screen is honest but not a draft.
3. **Acceptance: must a Wave B package carry a Wave B acceptance?** Recommended: **yes.** A Wave A acceptance can be complete and attested and still not certify Wave B bytes. The `acceptance-covers-this-tree` claim is the minimum.
4. **Shell title:** keep the shell round name and add “continued in S17”; do not rename the build. Recommended: a one-line note, no new file name.
5. **Next shell round:** final-byte release gate first, phone card second, top-three cap third. Recommended: the gate is cheap and unblocks trust; the phone card is the highest user value; the cap is a small product change with a big semantic win.

---

## 9 · What is good, and what is not

**Good:** the engine is untouched and byte-identical to `408410477` (69/69; 430/430). The acceptance is complete, attested and resumable; the prior partial acceptance is fixed. The node receipt is 37/37 at Wave A; the prior 23/23 is fixed. The freshness/state/status claims are real and correctly red at the final bytes; they are the package's best feature. The identity fixes (README pin, R-13 filing, stale-zip retraction, boot docs, handover correction) are in. The visible F7/F8 label fixes are in. The Wave B code builds, and the final visual/slot batteries pass (18/0, 28/0) at the final dist; the shell is not broken. The A4 structured join is a real improvement in evidence shape, even though its marker semantics are still weak. The self-description “Wave B explicitly PARTIAL” is honest; the package does not hide the partial state in the claims.

**Not:** the delivered bytes are Wave B under a Wave A state block/status/seal/card. The package's own gate is 25/8 and 18/3; the top line says 30/0. The final node is 35/37 and the board is 23/1; the failures are stale laws, but the gate is red. The Wave B battery does not parse; its first law would fail on the stale seam card. The offline tent fails because the single-file artifact has no dataset. The visual/slot receipts are pre-final and the status says FRESH. The left s2 capture is still the intro overlay; the non-vacuity says true. The path bug makes the Owner's desktop path un-runnable. The prior product findings F1–F6, F9, F13 are open; the “top three” is 3/36/60, the 390 board is still unreadable at the last capture, and the contrast holes are still named rather than fixed.

**Verdict:** **Wave A: closed.** **Wave B: PARTIAL — code landed, laws not run, final-byte state not regenerated.** **Package: not accepted at the delivered bytes.** The next move is a final-byte release gate and a re-run, not more features. The shell round-2 ideas are in `inbox/20261126-0157-ds-cakepanz-shell-round2-ideas.md`.

---

## 10 · Evidence notes

- The package was hosted at `deliveries/zai-s17-continuation-2026-11-25/` at `d626a5262`; the hosting note is the sibling `deliveries/zai-s17-continuation-2026-11-25-HOSTING-NOTE.md`. Nothing inside the artifact was edited. The extra `SHA256SUMS-2026-11-25.txt` is part of the delivered bytes; the review does not remove it.
- The `verify-package` 401/0/0 result is at the hosted path; the 1 extra is the transport checksum. The seal's 401 entries are the artifact's inner seal, not the 839-line transport file.
- The claims output is exactly `25 OK · 8 RED · 0 skipped` (full) and `18 OK · 3 RED · 12 skipped` (packaging). The `gen-state-block` clean-copy header is `25 OK · 7 RED · 0 skipped/not-in-phase across the 32 rendered claims, plus 1 self-check row`; the 8th full RED (`offline-tent`) is the checker-threw/skip in the block renderer. Either way, the block is not 30/0.
- The final browser runs used `npm ci` from the shipped lockfile and `vite preview` on `:4179`; the final dist is `index-BTZyEL9n.js` + `index-CpxM29ri.css`; the visual/slot receipts carry `distHash 3f053afd…`; the package's receipts carry `8144ae6c…`.
- The node failures are at the final source; the board failure is at the final dist. The exact failing strings and the final source lines are in §4.3.
- The offline direct probe printed: body “No player dataset yet…”; `.cp-ts-team` 0; `SCRIPTS 1 MODULES 1`; `ERRORS []`; `requests 1 total, 0 external`; `distHash 3f053afd…`. The app's “Open the dev build →” link is the intended `?dev=1` path.
- The left s2 PNG is `shots/side-by-side/left-s2-board-top3-1180x950-light.png`; the receipt says `met:true`, `detail: rows=150 top3rows=3`. The visible image is the “WELCOME TO THE DRAFT” overlay.
- The path-portability error is `ENOENT … /Football%20Sim%20s17/claims.json`; the `gen-state-block --check` error is `spawnSync node ENOENT`. The hosted path has no spaces, so its pass is not portability evidence.
- The acceptance attestation: `ACCEPTANCE-RECEIPTS.txt` sha256 `d536d63f0cf5a0c8149cf4e604663ac2b9f3da14b60159a5e0fe27bbf9c3baeb`; `receipt-attestation.json` records the same `log_sha256`; `complete:true`; all per-step exit codes 0; the terminal marker is present. The acceptance is at the Wave A tree, not the final Wave B tree.
- I did not re-run the shell 53/0, slice 29/0/10/3, viewport 45/45, the full acceptance, the w89 fixture materialisation, the falsifier scripts, or the final 390 screenshot. Those remain `REPORTED` from the package, not `VERIFIED` by me. The final 390 readability is `UNKNOWN` at the final dist; the last capture is `VERIFIED` unreadable.
