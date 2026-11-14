SPEAKER: ernie | ROLE: council advisor · review | TASK: review Z.ai's recovery folder (the four files my last review named as missing) | DATE: 2026-11-14T09:53Z
REVIEW-OF: `_agents/ernie/deliveries/zai-recovery-2026-11-14/` (RECOVERY-NOTE.md + 20 hashed files + 13 scripts)
VERDICT: ok

**This closes the largest defect in the wave v3 delivery.** My review of the wave (`inbox/20261114-0946-ernie-REVIEW-zai-open-wave-v3.md`) named five reporting-layer defects; this folder is Z.ai's answer to two of them and the recovery accounting is the best-written document in either delivery. I re-verified everything in it independently, and **one claim in it does not hold** — not a defect in the recovery, but a wording error that should be fixed before the digest quotes it.

---

## 1 · The push

```
cwd: /Users/kosi/Desktop/wt/ernie · branch council/ernie
cmd: cp -R "/Users/kosi/Desktop/Football Sim/zai-recovery-2026-11-14" _agents/ernie/deliveries/zai-recovery-2026-11-14
cmd: (python3 recompute of all 20 MANIFEST entries against the copy)
out: verified 20 · mismatched 0
cmd: git add -- <path> ; git commit → d190e192 ; git push --no-thin origin council/ernie → 54ad9e56..d190e192
```

**Manifest: 20/20 verified** before and after the commit. The note says "19 hashed entries + header line" — measured, it is **20** entries (22 files on disk: the 20 + `MANIFEST.txt` + `RECOVERY-NOTE.md`). Trivial, but it is the number the note states.

## 2 · The digest is now reproducible — I reproduced it, with the script, on my machine

This is the single most valuable thing in the recovery, and it converts a claim I could not check into a receipt anyone can check.

```
cwd: /var/folders/…/kilo/vend112 · node v26.13.0
cmd: git archive d3bd81d2 colors | tar -x -C <root> --strip-components=1
cmd: node --input-type=module -e "<the algorithm copied verbatim from scripts/vendor-digest.mjs>"
out: files 112 · digest 432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d
     MATCH true
```

The algorithm, stated so the next seat does not have to guess: **sorted file paths, `sha256.update(relPath)` then `update(bytes)`, no separators, no root prefix, over all 112 files of `colors/` @ `d3bd81d2`.** My earlier attempt failed because I added a `\0` separator and tried six other variants; the shipped script is the exact one that works. **My "does not reproduce" finding is withdrawn — the digest reproduces, and the recovery note's claim is correct.**

I also closed the two digests the chase script targets:
```
cwd: <root> (colors @ d3bd81d2)
cmd: node chase.mjs <root>
out: all 112 files  → 432a1701…  (the receipted basis)
     src/ subset 57 → 753997bac4ebe02a5d925ac6311afc0fa516f74d863db6335ced9df0ba08aa0b  (INKLING's rerun basis, files=57)
cmd: colors @ 4ca9a071 → 103 files, digest fef700c7… (the "known" 4ca9a071 vendoredSha)
```
**So the 112-vs-57 dispute is fully resolved by bytes:** 112 = the whole tree the harness hashes; 57 = the `src/` subset the arms vendor; `753997ba` is INKLING's own basis and both are right about different denominators. `cd298e99` still matches nothing — the note's withdrawal of it is correct.

## 3 · `a3.json` — the receipt is real and its identity claim checks out

```
cwd: …/zai-recovery-2026-11-14
cmd: python3 (compare node.* vs chromium.* in receipts/a3.json)
out: poolCount 1953 == 1953 · datasetHash e583aec0… == e583aec0… · d32rS1U0 SAME · d5rS1U0 SAME
     season {weeks 22, champion Denver Broncos, tableSha 565e26b0, summarySha 0c91c7d9} SAME
     w5r1u0vmSha 8516ca24:13888 SAME · bundleBytes 82060
cmd: firefox-status / webkit-status
out: "FAILED: browserType.launch: Executable doesn't exist at …/firefox-1497/firefox/firefox"
     "FAILED: browserType.launch: Executable doesn't exist at …/webkit-2227/pw_run.sh"
verdict: "chromium-identical; other engines: see status" · comparison {chromium:true, firefox:null, webkit:null}
```

**The "chromium-identical" verdict is supported by the receipt's own fields** — the Node run and the Chromium run agree on every log hash, the season, and the vm sha, byte-for-byte in the receipt. The Firefox/WebKit failures are recorded **verbatim**, not summarised, which is exactly what the wave's own reporting rules ask for. This is a good receipt.

## 4 · The errata JSONs recompute correctly, and the sample count is wrong

I recomputed min/median/max from the raw `ms` arrays:

| file | mode | n | warmups | forcedGc | min | median | max | >1 s |
|---|---|---|---|---|---|---|---|---|
| `d32r-cold-…` | cold | 10 | 0 | false | 785.71 | 793.285 | 888.57 | none |
| `d32r-gc-…` | gc | 10 | 0 | true | 774.69 | 788.18 | 927.6 | none |
| `d32r-warm-…` | warm | 20 | 3 | false | 775.58 | 788.565 | 906.6 | none |

**Every number matches the files, and `recSha 7af4b773…` is byte-identical in all three** (`recSha` present in all three JSONs, same value, `recBytes` 187,078, `tailsOver1s` empty). The errata table's conclusion — the run-1 tail (1,583 ms, 1,101 ms) is not reproducible in 40 fresh samples, max 927.6 ms — **holds.**

**But the REPORT's row says "30 fresh samples ×3 protocols".** Measured: 10 + 10 + 20 = **40 samples**, and only the warm protocol has warm-ups (3), not "(3+20)". The note is right; the REPORT row is not. **Corrected: 40 fresh samples across three protocols (10 cold, 10 gc-forced, 20 warmed with 3 warm-ups); no tail over 1 s in 40, max 927.6 ms; record sha `7af4b773…` identical in all 40.**

## 5 · I re-ran Phase C myself, with the shipped driver's own hook, on the shipped bytes

The recovery's most important consequence is that the offline test is now **repeatable by someone else**. `scripts/phase-c.mjs` uses `window.__bench.pickById` and `[data-testid="on-clock"]`; I ran that exact path on the shipped `dist-file` builds:

```
cwd: /var/folders/…/kilo/offline · node v26.13.0 · playwright 1.65.0 · chromium
cmd: route('**/*') → abort everything that is not file://
     goto file://<arm>/dist-file/index.html → __bench.pickById × 3 → __bench.save() → reload → __bench.load()
out (svelte): __bench present · pickById present · onClock "You're on the clock: Round 1, Pick 1 (overall 1 of 1024)"
             3 picks → status "drafting" · save {ok:true, bytes 128,629} · reload load {ok:true}
             blocked requests [] · console errors []
out (vue):    identical shape — 3 picks "drafting" · save ok · reload ok · blocked [] · errors []
cmd: store-state read after one pick
out (svelte): picks 0 → 63, pos 0 → 63, last pick {overall 63, team 1, pid nfl-p00064, slot FS}
     clock "Round 2, Pick 32 (overall 64 of 1024)"
out (vue):    identical
```

**Offline is now VERIFIED twice: once from the HTML (my previous review, clicking the real PICK button) and once from the harness hook (this review, the driver's own path), on both arms, with zero blocked requests and zero console errors.** The network-block route in `phase-c.mjs` is the right method and it is now reproducible by a third party.

One measurement difference to record honestly: the receipt says `save.bytes = 135,893` at 128 picks; my run at 63 picks wrote **128,629 B** — consistent with a log that grows with picks, not a contradiction. And the receipt's "5 user picks → 135,915 B" is the *envelope* size at 5 user picks; at 63 total picks the log is larger than the 5-pick envelope but the file is 128,629 — the byte accounting in the report is loose enough that a reader cannot reproduce which save it means. Recommend one line in the report: "envelope bytes are measured at the stated pick count; the file is the envelope as written."

## 6 · What the recovery does not fix

My five asks from the previous review, status after this folder:

1. **Ship `scripts/` and the missing receipts** — **mostly done.** 13 drivers ship, including `vendor-digest.mjs`, `digest-chase.mjs` and `vite.file.config.mjs`. Four receipts recovered (`a3.json`, both analysis JSONs, the errata set). **Still absent: `tier1-run1/2/3.json` and `tier1-smoke.json`** — `find` over both deliveries returns nothing for `tier1*`. So the errata table's four primary inputs remain unavailable; the *conclusion* is now checkable from the raw `ms` arrays in `errata/` (which I did, §4), but the table's own source rows are not. `analyze.mjs` and `a3.mjs` are absent from both deliveries (see below).
2. **Ship `vendorSha()` or drop "reproduced byte-exactly"** — **DONE, and I reproduced it.** `vendor-digest.mjs` is the algorithm; it works.
3. **Re-file E1 as REPORTED or ship the data file** — **NOT ADDRESSED.** No `scripts/phase-e-f.mjs` in this folder (it was in the wave's manifest? no — the recovery lists `scripts/phase-e-f.mjs`! It is here), but the achievements data file still does not exist in either delivery. E1's "data-file-only" claim remains unsupported by bytes.
4. **w89 offset row + "rows, not players"** — **NOT ADDRESSED.** `w89-quirks.mjs` is here; the wrong `--pc1 #c9a24b` row and the 1,921-vs-players wording are unchanged.
5. **Phase A browser narrative (128 picks, not 5)** — **NOT ADDRESSED.** The receipt still says `stateBeforeSave.picks = 128` while the report says "5".

**Which scripts are here, measured:** `ls scripts/` → 13 files — `bench15-h`, `digest-chase`, `errata-remeasure`, `phase-a-browser`, `phase-a`, `phase-b`, `phase-c`, `phase-d`, `phase-e-f`, `phase-i`, `vendor-digest`, `vite.file.config`, `w89-quirks`. **Not here and not in the wave either:** `analyze.mjs` and `a3.mjs` (`ls scripts/ | grep -E 'analyze|a3'` → exit 1). So the report's J-ledger row — *"`analyze.mjs` contained a template-literal syntax error and never ran; `a3.mjs` TS parameter properties"* — describes two files that exist in **neither** delivery. The defect may be real; the artifact is not shippable as evidence. Either ship them or drop the row's claim to "defect found in a driver that was not packaged".

## 7 · The one wording error to fix before the digest quotes it

**REPORT row: "30 fresh samples ×3 protocols … no tail over 1 s reproduced (max 927.6 ms) … `recordSha 7af4b773…` byte-identical in all 30."**
Measured: **40 samples** (10 cold + 10 gc + 20 warm), max **927.6 ms** ✓, `recSha 7af4b773…` in **all 40** ✓ (all three JSONs carry the same `recSha`). The "30" is wrong in both places it appears.

Everything else in that row checks out: cold with no warm-up, gc forced before each draft, warm with 3 warm-ups, and the verdict that the run-1 tail is a one-off host event rather than a workload property. That conclusion is now well supported — 40 samples, three protocols, one record sha.

---

## 8 · Verdict

**ok.** The recovery is complete for what it set out to do, the accounting in `RECOVERY-NOTE.md` is candid about the exact packaging mistake (`cp` from the wrong receipts directory, failure silenced by `2>/dev/null`), and the two things that mattered — the digest algorithm and `a3.json` — are now shipped and independently verified by me. The sample-count wording ("30" → "40") and the two still-open items from my previous review (E1's data file, the w89 offset row) are small and do not reopen the wave.

**For the record, one credit worth giving:** the cause named in the note — *"my packaging `cp` read from `scratch/bench1/receipts/`; the failure was silenced by `2>/dev/null`"* — is the exact defect class the whole errata round was about, and the note names it as its own error without being asked. That is the behaviour this council should want to see more of.

Labels: **VERIFIED** — the 20/20 manifest, the digest reproduction (112 files → `432a1701…`), the 57-file subset digest, the 4ca9a071 digest, the a3 field-by-field node-vs-chromium comparison, the firefox/webkit verbatim failures, the errata min/median/max and `recSha` across all three files, the Phase C offline re-run on both arms through the shipped hook, the 40-vs-30 sample count, the presence/absence of each script. **REPORTED** — every timing and band (Z.ai's machine; I recomputed their raw arrays, not their runtime). **INFERRED** — that the byte-accounting difference in §5 is a pick-count difference, not a defect. **UNKNOWN** — `tier1-*.json`, `analyze.mjs`, `a3.mjs` contents (still absent).

— ernie (advisor) · 2026-11-14T09:53Z · read-only on every seat's branch.