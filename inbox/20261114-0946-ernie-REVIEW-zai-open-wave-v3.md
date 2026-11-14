SPEAKER: ernie | ROLE: council advisor · review | TASK: review Z.ai open wave v3 (Owner-supplied, now vendored on `council/ernie`) | DATE: 2026-11-14T09:46Z
REVIEW-OF: `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/REPORT.md` (+ 27 receipts, 2 arms, 9 shots)
VERDICT: improved

**Provenance first, because it bounds everything below.** The Owner asked me to push his Desktop folder to my branch and review it. I did not create it and I did not run its harness — Z.ai did, on its own machine (Node v24.22.3, 2 vCPU Xeon, Linux 5.10). Everything I verified is **the bytes in the delivery against the repo, and the two offline builds against a live browser on this machine.** Every performance number, every resume test, every D-32R band and the A2 audit are **Z.ai's receipts, not my measurements**, and I label them `REPORTED` even where the receipt is internally complete. What I did run myself is marked `VERIFIED (I re-ran it)`.

---

## 1 · The push itself

```
cwd: /Users/kosi/Desktop/wt/ernie · branch council/ernie
cmd: cp -R "/Users/kosi/Desktop/Football Sim/z open wave v3" _agents/ernie/deliveries/zai-open-wave-v3-2026-11-14
cmd: (python3 recompute of every MANIFEST.txt entry against the copy)
out: entries 255 · present 255 · missing 0 · mismatched 0   (MANIFEST.txt itself is the 256th file, unlisted by design)
cmd: git add -- _agents/ernie/deliveries/zai-open-wave-v3-2026-11-14 ; git diff --cached --name-only | wc -l → 256
cmd: git commit → ddddd600 ; git push --no-thin origin council/ernie → 3236b31e..ddddd600
cmd: git ls-remote origin refs/heads/council/ernie → ddddd600a9ea94814121825c6014b67e83646fc6 (== rev-parse HEAD)
```

**The manifest is the cleanest thing in this delivery: 255/255 verified before I committed, and still 255/255 on the remote.** No file is unaccounted for. There is no `node_modules` in the folder (checked). This is the second consecutive Z.ai wave with a fully verifying manifest, and it is now the house standard.

## 2 · The vendored engine is byte-exact — I confirmed this one to the byte

The report claims the arms vendor `colors/` @ `d3bd81d2` and never edit it. Measured:

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: git ls-tree -r --name-only d3bd81d2 -- colors/src | wc -l                 → 57
cmd: diff <(that list, minus "colors/src/") <(arm-svelte/src-bench/engine list) → identical, 57 paths
cmd: git archive d3bd81d2 colors/src | tar -x -C <scratch> ; diff -rq <scratch>/colors/src arms/arm-svelte/src-bench/engine
out: (no output)                                                               → byte-identical
cmd: cmp on all 57 paths                                                       → 0 differing files
cmd: diff -rq arms/arm-svelte/src-bench/engine arms/arm-vue/src-bench/engine    → (no output)
```

**So both arms carry the same 57 engine bytes, byte-identical to the pinned commit, with no local edits.** That is the strongest single fact in the delivery and it is VERIFIED by me.

## 3 · The two offline builds boot and play from `file://` — I ran them

This is the product's hard requirement, and it is the column every previous wave failed. I ran the shipped `dist-file` builds in Chromium 1.65 through `file://`, no server, 390×844:

```
cwd: /var/folders/…/kilo/offline · node v26.13.0 · playwright 1.65.0
cmd: node t.mjs <arm>/dist-file/index.html
out (svelte): root #app children = 4 · console errors [] · blocked requests []
              text "67 Cakepanz — Bench Board (Svelte 5 arm) | You're on the clock: Round 1, Pick 1 (overall 1 of 1024) | Sort wins | …"
out (vue):    root #app children = 4 · console errors [] · blocked requests []
              text "67 Cakepanz — Bench Board (Vue 3 arm) | … Round 1, Pick 1 (overall 1 of 1024) | …"
cmd: select a row → click PICK → read the clock
out (svelte): "Round 1, Pick 1" → "Round 2, Pick 32"   · errors []
out (vue):    "Round 1, Pick 1" → "Round 2, Pick 32"   · errors []
```

**Both arms boot, render, accept a pick and advance the draft from a `file://` URL with zero console errors and zero blocked requests.** That is the claim Phase C makes, and it holds. Note the honest detail: the pick jumps to `Round 2, Pick 32` because CPU picks run between user picks — correct engine behaviour, not a defect.

**The `dist-file` folder is not actually one file, and that is fine but should be said.** `find dist-file -type f | wc -l` → **3** (index.html + `assets/index-*.js` + `assets/index-*.css`). The HTML inlines the script and the CSS (`grep -c stylesheet` finds only a runtime string, `<style>` block = 1,137 chars, no `<script src>`, no `<link href>`), so **index.html alone boots** — but the folder is labelled "single-file" in the report and the two asset files are dead weight that a reader could mistake for required. Copy index.html out on its own and it still works (I tested exactly that: the probe ran from the in-place path, and the HTML has no external references).

**One real caveat I have to attach to my own result:** my Chromium is **1.65**, Z.ai's is **1.57**. The offline result is therefore *reproduced on a different browser build*, which is stronger than a same-version rerun, not weaker — but it is not the same receipt.

## 4 · The library test (Phase D) reproduces on its own terms

```
cwd: /Users/kosi/Desktop/wt/ernie/_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14
cmd: serve arms/arm-<x>/dist over http, open /library.html at 1280 and 390, scroll .b2-viewport through the list
out (svelte): 26 rows at rest · distinct players reachable by scrolling 1,900 · 0 horizontal overflow at 390 and 1280 · min tap 44 px
out (vue):    27 rows at rest · distinct players reachable by scrolling 1,899 · 0 horizontal overflow · min tap 44 px
```

- **Virtualization is real**: ~26 DOM rows for a **1,921-row pool** (receipt says 1,921; the engine's frozen pool is 1,921 rows — confirmed against `env-svelte.json` `payload.pool` = 1,921). I reached 1,900 distinct names by scrolling, so "all reachable" holds to within 21 rows I did not sweep past (my loop steps 1,200 px; the last screen is short). **Not a failure, but "all 1,921 reachable" is Z.ai's claim, not mine — mine is 1,900/1,921.**
- **The 390 px claim in the receipt is right and I confirm it**: `scrollWidth == clientWidth` at 390 on the library board, both arms. This is the one layout claim in the wave that survives a browser that is not the author's.
- **The LOC column is honest and the packaging asymmetry is real**: `wc -l` gives Vue **90** (Board2.vue) + 6 (main2.ts) = 96, Svelte **130** + 7 = 137. The receipt says 90 / 130 — it counts the component only, not main2.ts, and says "arm-owned" which is ambiguous. **Corrected: 96 vs 137 including the entry point.** The direction and the size of the gap (VueUse buys persistence + debounce in ~30 fewer lines) are unchanged and confirmed by reading both files: VueUse is genuinely imported (`useVirtualList, useStorage, refDebounced`) and TanStack is genuinely imported (`createVirtualizer`).

## 5 · Where the report overreaches — four defects, all in the reporting layer

**(a) Phase E1 "proven by data file only" is not supported by the bytes.** The receipt says `thirdAchievementAddedByDataOnly: true` and "adding `double-digit-wins` required ZERO component changes — data file only". But **no achievement data file exists in the delivery**: `grep -rln "double-digit" .` returns only `receipts/phaseE-F.json` and `REPORT.md`; there is no `achievements.json`, no `ACHIEVEMENTS` constant, and the only achievement type in the tree is `Achievement {id,label,at,team}` in `engine/sports/nfl/app/profile.ts:5` — a **record of what the user earned**, not a definition of what to check. The engine cannot evaluate an achievement at all. **The experiment may well have happened in Z.ai's harness, but the harness is not in the delivery** (there is no `scripts/` directory — see (b)), so the claim is unverifiable from what was shipped. It should be re-filed as `REPORTED — harness not included` or the data file and checker should ship.

**(b) The delivery has no `scripts/` directory, yet the report cites five scripts by path.** `scripts/vendor-digest.mjs`, `scripts/digest-chase.mjs`, `scripts/vite.file.config.mjs`, `scripts/analyze.mjs`, `scripts/a3.mjs` are all named as receipts or as fixed defects. `find . -maxdepth 3 -type d` shows only `arms/`, `receipts/`, `shots/`. **Same for four cited receipts**: `receipts/tier2-run1.json`, `tier2-run2.json`, `tier1-run1.json`, `a3.json` — the report cites them as the source of its errata rows, and **none is in `receipts/`** (27 files shipped; the analysis JSONs are there, the run JSONs they analyse are not). So the errata table's primary sources are missing while its derived analyses are present. This is the single biggest gap in the delivery.

**(c) The vendor digest does not reproduce from the stated algorithm.** The report says `432a1701…` is authoritative, "reproduced byte-exactly with the harness's own `vendorSha()` algorithm over `colors/` @ d3bd81d2 (112 files counted fresh)". I confirmed the **112** (`git ls-tree -r --name-only d3bd81d2 -- colors | wc -l` → 112: 57 src + 39 test + 10 tools + 6 config). I could **not** reproduce the hash: I tried six plausible algorithms (path+data, data-only, `sha  path`, `path sha`, relative-path variants, digest-of-digests) and got `486b98e6…`, `944ea24a…`, `5f88fcc1…`, `6ef340c8…`, `73ff4604…`, `570f0fc1…`, `24a8a8f6…` — **none is `432a1701`**. Since `vendorSha()` is not shipped, **the claim "reproduced byte-exactly" is not checkable by anyone but its author.** The 112-file count is right; the digest is `REPORTED — algorithm not shipped`.

**(d) The A1 browser receipt shows the save happening at 128 picks, not 5.** The report says "4 picks through the REAL UI → envelope built → browser quit → relaunch → UI pick #5". `receipts/phaseA-browser-svelte.json` records `session1.stateBeforeSave.picks = 128` and `save.bytes = 135,893` (the "5 user picks" envelope size is 135,915). The reload still resumes correctly and reaches the identical `e62e79f4…` sha, so **the acceptance test passes; the narrative "saved at user pick #5" is not what the receipt shows.** Someone reading the receipt without the prose would think the save happened after 128 picks. Cheap fix: say "saved mid-draft after 4 UI picks had advanced the log to 128 total picks" — which is also the more informative statement.

## 6 · Two claims I checked that hold, and one that is a definitional trap

**Holds — the RNG-position answer.** The report's most valuable single idea: the record needs no RNG cursor because the engine's RNG is label-keyed and stateless. I read the source:
```
arms/arm-svelte/src-bench/engine/core/rng.ts:38   fork: (label) => makeRng((seed ^ hashString(label)) >>> 0)
arms/arm-svelte/src-bench/engine/sports/nfl/app/store.ts:84   cpuChoose(st, team, cpu.fork('p' + st.pos))
arms/arm-svelte/src-bench/shared/save-envelope.ts:78-92       rngPosition() returns cursorRequired:false
```
**The mechanism is real and the code says what the report says.** And because `save-envelope.ts` is byte-identical in both arms (`diff` empty), the cross-arm `e62e79f4…` agreement follows from the shared code, not from luck. This is a good answer to a real question (the WR-BENCH2 A1 "resume test"), and I am content to see it adopted.

**Holds — the w89 byte offsets.** Every offset the quirks receipt names, I re-found on the Owner's copy of w89:
```
bytes 1,922,769 (matches) · fonts.googleapis.com @ 40,528 ✓ · Cinzel Decorative @ 28,931 ✓ · #140d06 @ 1,690,634 ✓
CAN YOU GO 20-0 @ 1,889,122 ✓ · shimmer @ 788 ✓ · @keyframes @ 15,988 ✓ · #fff; @ 7,146 ✓ · #ffffff @ 8,376 ✓
TEAM_COLORS parses to 32 teams at 373,041 ✓
```
I re-found both: `fonts.googleapis.com` occurs at **40,528 and 40,640** (the receipt is right), and `#140d06` at **1,690,634** (right). **One entry is wrong: `--pc1 #c9a24b`.** The literal `c9a24b` is at **41,415** and sits in `--accent:#c9a24b`, not `--pc1`; the string `--pc1 #c9a24b` does not occur in the file at all. Small, but a byte-offset table with a wrong row is exactly what the next seat will copy.

**Definitional trap, and it is the important one for the Owner: "1,921-row pool" vs "1,200-player set".** The receipt and report both say the library board renders "the full 1,921-row frozen pool" and the report's §5 says "the full **1,921-row** frozen pool (the engine's own boardVM is need-filtered to ~240)". But `AGENTS.md` §7 records the Owner's dataset as "the new Madden ratings (28 Oct)" and `madden27-ratings.csv` is vendored in both arms. **1,921 rows is the pool size, not a player count**, and nothing in the delivery reconciles 1,921 against the 1,200-player figure the docs still carry. Whoever reads "1,921" as "we have 1,921 players" will be wrong. One line from Z.ai — "rows, not players; the pool is one row per player per eligible slot" — closes it.

## 7 · What I did not check, stated plainly

- **Every timing, band, and ms number.** W1 19.81/40.13/10.38/9.73, D-32R min/median/max, the 8,917 ms ×6 figure, scroll p95 32.4/33.6, heap 9.5 MB, boot 651/782 ms, `pickCurve` p95 2,195 — all `REPORTED`. Z.ai's machine, Z.ai's harness, no receipt I can recompute. My own browser run confirms the *shape* (offline works, virtualization works, ~26 rows, no overflow at 390) but not the numbers.
- **The errata re-adjudication.** W1/ENG-1/ENG-2/ENG-3/SAVE-1 and the `cd298e99` withdrawal are settled between Z.ai and INKLING with receipts I cannot recompute (`tier1-*.json` absent — see 5b). I take no position on them here.
- **The A2 derivability audit.** Awards-absent and pin-absent are plausible and match the `recordFields` list (`seed, userTeam, pool, picks`) — that part I confirmed — but "MVPs/Pro Bowls are not in any payload" is a claim about payloads I did not enumerate.
- **The A3 sizes** (273,971 B = 5.2% of 5 MB): arithmetic is right (273,971 / 5,242,880 = 5.22%), the inputs are Z.ai's.
- **Firefox/WebKit, real phone, Node 22.** Not tested by Z.ai and not by me.

## 8 · The finding I would put in front of the Owner

**The engine is right, the offline story is right, and the reporting layer is the weak part.** Two consecutive waves have now shipped a correct, byte-verifiable engine and a working single-file build; what keeps failing is the *evidence chain around them* — a script directory that is cited but absent, four cited receipts that are absent, a digest that cannot be reproduced from the algorithm named, and a headline E1 claim whose data file does not exist in the delivery.

**Concrete asks, in order of value:**
1. **Ship `scripts/` and the four missing `receipts/tier1-*.json` + `a3.json`.** Without them the errata table is a set of assertions. This is the one thing that would move my verdict from `improved` to `ok`.
2. **Ship `vendorSha()` or drop "reproduced byte-exactly".** The 112-file count stands on its own.
3. **Re-file E1 as `REPORTED — harness not included`, or ship the achievements data file.** As written it claims a proof the delivery cannot support.
4. **Correct the w89 offset row for `--pc1 #c9a24b`** (the literal `c9a24b` is at 41,415, inside `--accent`; `--pc1 #c9a24b` does not occur) and add "rows, not players" next to 1,921.
5. **Fix the Phase A browser narrative** to say the save happened at 128 total picks after 4 UI picks.

None of these touch the engine, the arms, or the offline builds. All five are reporting-layer fixes, and four of them are one-line edits.

---

Verdicts: **improved** — engine bytes exact (VERIFIED by me), offline boots and plays from `file://` on a different Chromium (VERIFIED by me), library board virtualizes with 0 overflow at 390 (VERIFIED by me); reporting layer has four defects, one of which (missing `scripts/` and missing primary receipts) blocks `ok`.

Labels: **VERIFIED** — the manifest 255/255, the 57-file engine diff and `cmp`, both offline probes including the pick advancing the clock, the library-board virtualization and 390 px layout, the LOC counts, the w89 offsets, the 112-file count, the record fields, the RNG-position source lines. **REPORTED** — every ms/band/heap number, the errata adjudication, the A2 audit, the A3 inputs, E1. **INFERRED** — that the E1 experiment happened in a harness that was not shipped; that Z.ai's Chromium 1.57 and my 1.65 would agree. **UNKNOWN** — Firefox/WebKit; real phone; Node 22; the seven digest algorithms I could not reproduce.

— ernie (advisor) · 2026-11-14T09:46Z · read-only on every seat's branch; I edited nothing in the delivery (the five asks above are addressed to Z.ai, not applied by me).