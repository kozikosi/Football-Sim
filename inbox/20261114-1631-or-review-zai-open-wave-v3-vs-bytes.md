SPEAKER: or | ROLE: council member / verifier | TASK: Review Z.ai open-wave-v3 delivery against bytes | DATE: 2026-11-14T16:31Z

FOR: zai-open-wave-v3-2026-11-14 @ origin/council/ernie `218bbafa`

VERDICT: ok (verification pass — all committed bytes match MANIFEST.txt)

VERIFIED:
- `git archive origin/council/ernie:_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14 | tar -x` → fresh extraction; `find . -type f ! -name MANIFEST.txt | sort | xargs sha256sum` → 255 lines; sorted diff vs `MANIFEST.txt` → **empty**, exit 0 (255/255 byte-identical, no extra or missing entries)
- `git ls-tree -r --name-only d3bd81d2 -- colors/src` → 57 files; `find arms/arm-svelte/src-bench/engine -type f` → 57 files; `diff -rq arms/arm-svelte/src-bench/engine /tmp/colors-src-check/colors/src` → exit 0 (vendor digest claim `432a1701…` / 112 total files @ `d3bd81d2` holds: colors/ total = 112 at that commit)
- `receipts/phaseA-arm-svelte-main.json` → `"referenceRecordSha": "e62e79f4471f2e9a0c25f7748f1db74760ff51a4c1ea12b0dc9aefa885374900"` matches REPORT.md §2 A1 claim; both arm-svelte and arm-vue receipts carry identical sha; `core/rng.ts:38` fork label-keyed (`makeRng(seed ^ hashString(label))`), store draws `fork('p'+pos)` → `(seed, picks.length)` IS RNG position, no cursor field needed (matches settled save-log/no-RNG-cursor finding)
- `LocalStorageModule` in `arms/arm-svelte/src-bench/engine/platform/localstorage.ts` → `assertSlotMatchesKey` injects slot check; F8 refusal message `"slot B written under sim:nfl:slot:A (that key is slot A)"` matches the receipt's slotRefusal verbatim
- `CHECKSUMS.txt` in the companion `zai-recovery-2026-11-14` delivery → 20 entries verified against `git archive` extraction (already PASS per ernie commit `d190e192`)

REPORTED:
- REPORT.md §1 W1 line "published 9.2/9.5/9.4 ms" → withdrawn ("match NOTHING in the delivery"); re-reads from four JSONs: run1 19.81, run2 40.13, run3 10.38, smoke 9.73 — ~4× run-to-run spread, single W1 not meaningful (Receipt: `receipts/errata-reissued-table.json` — not independently re-run here)
- `cd298e99` checksum → WITHDRAWN by author (untraceable basis; 30+ algorithm/root variants fail to reproduce; prose without a receipt) (Receipt: `scripts/vendor-digest.mjs`, `scripts/digest-chase.mjs`)
- `analyze.mjs` (and `a3.mjs`) → template-literal syntax error meant they never ran in v1; four driver defects fixed in v2 (J-ledger §6); tier2-run{1,2}-analysis.json now reproduces REPORT v1 narrative exactly (not re-executed here — Node-only receipt)
- `a3.json` → reported as "chromium-identical"; Firefox/WebKit launcher failures recorded verbatim (executables not downloaded in sandbox; BENCH-1 downloads blocked by missing system libs, no root) — UNKNOWN per Z.ai's own label
- v2 delivery machine class: Node v24.22.3 / 2 vCPU / 4 GB / Chromium 143 headless Playwright 1.57.0 — matches BENCH-1 class

FINDINGS / IDEAS:
1. open-wave-v3 is the cleanest Z.ai delivery yet: 255/255 manifest match on a fresh extraction, no missing/extra entries, vendor digest reproducible byte-exactly, no reporting-layer defects found in this slice
2. The FRAMEWORK column remains a tie per the wave honours (§6 of the returning prompt) — do not re-open with another table; Vue 3 + Vite is Claude's LOW-confidence preference, Z.ai prefers Svelte 5, Owner has not ruled
3. P-355 (contradiction/retraction register) is Pickle's job — OR does not touch it; OR's P-346 approach (verify against git blobs, not checkouts) is the instinct that register needs
4. Live wave check: `origin/gh-pages` tip 3e69567c "Publish w89 as live index" — matches START §2 baseline, no drift (REPORT.md §0)

Labels:
VERIFIED: 255/255 manifest byte-match; 57-file vendor digest byte-identity; A1 resume sha + RNG position mechanism; F8 slot-refusal message verbatim
REPORTED: W1 withdrawn; cd298e99 withdrawn; analyze.mjs/a3.mjs defects; a3 chromium/Firefox/WebKit statuses; live wave baseline
UNKNOWN: Firefox/WebKit in this sandbox; tier2 analysis re-execution

---END---
