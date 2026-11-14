# REPORT — Z.ai · the open-license wave (BENCH-2 product round + BENCH-1 errata) · 2026-11-14

**Authority:** INKLING open-license v2 (`council/inkling` e88efc2, tip a94b67c) + ERNIE work order of record (`council/ernie` 8a083ecd, 257 lines). Owner's 2026-11-14 rulings applied: no scope guard (imagination licensed); framework picked on agent-build efficiency; Android product performance is a precondition.
**Engine:** vendored verbatim @ d3bd81d2 (digest `432a1701…`, 112 files — see §2). Never edited.
**Labels:** VERIFIED = I ran it, receipt in `receipts/`. REPORTED = someone else's claim. INFERRED = reasoned, not run. UNKNOWN = not checked.
**Machine:** Node v24.22.3 · npm 11.19.1 · 2 vCPU Xeon · 4 GB · Linux 5.10.134 · Chromium 143 headless via Playwright 1.57.0 (sandbox-cached build 1200). **Same machine class as BENCH-1 (2 vCPU / 4 GB) and same Node pin.**
**Live wave check (START §3):** `origin/gh-pages` tip 3e69567c "Publish w89 as live index" — w89 live, matches START §2 baseline. No drift.

---

## 1 · The errata (done first, all closed)

| Item | Verdict | Receipt |
|---|---|---|
| W1 published "9.2/9.5/9.4 ms" | **9.5 and 9.4 match NOTHING in the delivery** — withdrawn. Honest sums re-read from the four JSONs: run1 19.81 (19.345+0.468), run2 40.13 (32.465+7.667), run3 10.38 (9.853+0.524), smoke 9.73 (9.240+0.490). ~4× run-to-run spread: a single W1 number is not meaningful. | `receipts/errata-reissued-table.json` |
| ENG-1 D-32R "792–873 ×3" | Band withdrawn. Per-run min/median/max (n=10): run1 772.36/812.00/1583.09 (outliers 1583.09, 1101.23), run2 771.90/789.63/821.69, run3 785.71/807.46/840.22, smoke 785.06/799.11/902.82. | same |
| ENG-2/ENG-3 | **Receipted under `timings.W4`** (INKLING right, Ernie's "no entry" wrong): seasonMs 335.3/339.9/349.9/341.5; p95GameMs 0.075–0.079. Cited, not re-added. | same |
| SAVE-1 | **187,078–187,079 B** (u0/u31), confirmed ×20 each in the histogram. | same |
| Vendor digest | **`432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d` (files=112) is authoritative** — reproduced byte-exactly with the harness's own `vendorSha()` algorithm over `colors/` @ d3bd81d2 (112 files counted fresh). 112 vs 57: 112 = the whole vendored tree (src+tests+tools+config) the harness hashes; 57 = the subset the arms actually vendor into `src-bench/engine` (counted fresh, 57 each, byte-identical to their `colors/src` counterparts — `diff -rq` empty, all 57 paths map 1:1). **`cd298e99` is WITHDRAWN by the author (me): basis untraceable** — 30+ algorithm/root variants fail to reproduce it; it was prose without a receipt. INKLING's `753997ba` is their own rerun basis, not the harness's. | `scripts/vendor-digest.mjs`, `scripts/digest-chase.mjs`, diff receipts in §"digest" |
| D-32R outliers (investigation, warm-up protocol) | 30 fresh samples ×3 protocols on this machine — cold (no warm-up), gc-forced before every draft, warmed (3+20) — **no tail over 1 s reproduced** (max 927.6 ms). `recordSha 7af4b773…` byte-identical to the receipted hash in all 30. Verdict: the run-1 tail looks like a one-off host event (co-tenancy/JIT-GC), not a workload property; the warm-up protocol is adopted regardless. | `receipts/d32r-{cold,gc,warm}-*.json` |
| `receipts/a3.json` (absent in v1) | **NOW SHIPPED — real run.** Verdict: **chromium-identical** (full workload bundle byte-identical Node 24 ≡ Chromium 143); Firefox/WebKit launcher failures recorded VERBATIM (executables not downloaded for this Playwright; BENCH-1's older downloads blocked by missing system libs, no root). A3 stays "chromium-identical; other engines UNKNOWN". | `receipts/a3.json` |
| `*-analysis.json` (absent in v1) | **NOW SHIPPED** — root cause found: the shipped `analyze.mjs` contained a template-literal syntax error and **never ran** (same class for `a3.mjs`: TS parameter properties/`(window as any)` in `.mjs`). Four driver defects found and fixed (see §6 J-ledger). Per-run analyses reproduce REPORT v1's narrative exactly: run1 vue sort r16-u31 5,077 vs svelte 1,599 → "svelte faster (ratio 3.18)"; run2 **TIE (ratio 1.01)**, PICKCURVE p95 2,195.62 vs 2,194.47, G5 600/600. Tie-rule enforcement at analysis time: now PROVEN by artifact. | `receipts/tier2-run{1,2}-analysis.json` |

**One-line for the relay (INKLING §5):** rows W1/ENG-1/ENG-2/ENG-3/SAVE-1 now carry min/median/max per run with receipts; UX-1/UX-2 still unsignable as drafted; A2 Node-22 UNKNOWN; analysis-time tie rule APPLIED (artifacts shipped); run2 G5 parity held; vendor digest = `432a1701` (algorithm stated), `cd298e99` withdrawn; a3.json shipped as **chromium-identical**, Firefox/WebKit UNKNOWN verbatim.

## 2 · PHASE A — save envelope + resume (the highest-value lane)

**A1 RESUME TEST — PASS on both shells, at TWO levels.**
- Level 1 (process relaunch, Node): reference full draft (greedy user, seed 1) → save envelope at user pick #5 → **fresh process** parses envelope, LOADs, applies the pending pick, completes → **final record sha `e62e79f4471f…` byte-identical** to reference, 1,024 picks, both arms, cross-arm identical.
- Level 2 (browser relaunch — the real product path): 4 picks through the REAL UI → envelope built via the engine's own contract and written to `sim:nfl:slot:A` through `LocalStorageModule` → **browser process quit** → relaunch on a persistent profile → LOAD → UI pick #5 → greedy to completion → **same sha `e62e79f4…`**, 0 console errors, F8 mis-slot refusal fired through the real storage module. Receipts: `receipts/phaseA-*-main.json`, `phaseA-browser-*.json`, `resume-*.json`.
- **RNG position (the acceptance question): the record does NOT need a cursor field.** The engine's RNG is label-keyed and stateless (`core/rng.ts` fork(label) = makeRng(seed ^ hashString(label))); the store draws CPU picks from `fork('p' + pos)` — **(seed, picks.length) IS the RNG position**. `rngPosition()` in the shipped `save-envelope.ts` states it on the record. The save is a LOG (every pick), not a snapshot — that is WHY resume is exactly reproducible.
- **A2 derivability audit (field → present in the 187,078 B record?):** draft log (pick index/round/pos/player/slot) — **present** (`picks[]` + frozen pool) → tendencies computable ✓. Season results per season — **present in SeasonPayload** (table, userResults, champion, userOutcome) but **AWARDS ARE NOT**: MVPs / Pro Bowls / all-pro are not in any payload → achievements beyond champion/record need an awards field (Claude's schema). Usage counts — derivable from draft log + rosters ✓. **User pin field — ABSENT** (a favourites map saveId→[pid] must be added). Brag share — derivable from SeasonPayload + profile identity ✓.
- **A3 sizes:** draft envelope 128,651 B (start) → 135,915 (5 user picks) → 187,418 (full); week-9 envelope 62,373 B (team ratings dominate); season envelope 8,060 B; **draft + week-9 + 3 seasons = 273,971 B = 5.2% of a 5 MB localStorage** — no storage wall at three seasons.

## 3 · PHASE G — conflict rule under deliberately wrong clocks (4/4 PASS, both arms)

Recommended rule (the engine's `saveRevision` already exists): **highest monotonic saveRevision wins; wall clock only breaks a genuine revision tie; the loser is RETAINED under `slot:X:bak` and the user is told exactly once.** Tests: device with revision 7 and a 2019 clock beats revision 3 with a correct clock ✓; revision-tie → newer savedAt ✓; loser recoverable from bak + notice written once ✓; different saveIds refused as conflicts (keep both) ✓. `shared/sync-rule.ts` shipped identical in both arms.

## 4 · PHASES B / C / I — phone-class, offline, shell determinism

- **B (stated basis: CDP-imposed slowdown, not a borrowed average):** goneOdds r1-u0 sort: desktop 1,214.8 ms → ×4 6,331/6,597 → ×6 **8,917/8,715 ms**; PICK#1→paint ×6 ≈ **9.0 s** (the UX-1 phone number — the desktop 250 ms budget is missed ~36× at ×6, engine-side, both arms equal); slow-3G first load **7.0–7.5 s**; scroll p95 at 390×844 **~32 ms**; DOM rows 60 of 1,941. **Finding: the 8-column board overflows 390 px by 66–74 px (both arms)** → Phase H fix shipped (below).
- **C (offline, for real):** the arms make **ZERO external requests** on first load (no fonts, no CDN). Vite's default build cannot boot from `file://` (two real causes receipted: ES-module CORS on origin null + `crossorigin` attr) → shipped a **single-file tent-test build** (`dist-file`, config in `scripts/vite.file.config.mjs`): `file://` boots, 3 picks, save, reload-resume, **zero console errors, zero blocked requests**. The w89 PRODUCT page offline: **exactly 1 error, verbatim: "Failed to load resource: net::ERR_FAILED"** (the Google-fonts fetch) — the known tent-test risk confirmed; w89 needs embedded type.
- **I (shell determinism):** same seed + same inputs → 2 runs × 2 arms → **byte-identical DOM text run-vs-run on both arms** (5 checkpoints incl. sort/filter switches) and identical record shas. Cross-arm: identical modulo the arm-title line and **one trailing whitespace character** in Svelte's toolbar labels (framework template policy) — noted, not hidden.

## 5 · PHASE D — the library test (Ernie WR-BENCH2 spec, four columns, never summed)

Feature identical both arms: the full **1,921-row frozen pool** (the engine's own boardVM is need-filtered to ~240 — the pool board reads `draft.pool` directly), virtualized, 4 sorts (ovr/spd/str/name), position+team filters, debounced search, persisted sort/filter/scroll/stars, w89 vocabulary (position bubbles pos+ovr concatenated, 32-team palette extracted from the live w89 bytes, 90+ shimmer, espresso ground, **Cinzel EMBEDDED** as woff2, zero network).

| Column | Vue 3 + **@vueuse/core 15.0.0** | Svelte 5 + **@tanstack/svelte-virtual 3.13.52** |
|---|---|---|
| Integration cost | 90 LOC arm-owned + 105 shared CSS; 1 dep | 130 LOC arm-owned (persistence + debounce hand-rolled, ~30 lines) + same CSS; 1 dep |
| Behavioural correctness | virtualized (27 DOM rows of 1,921) ✓ · all 1,921 reachable ✓ · sort verified (99s desc) ✓ · pos/team filters ✓ · debounce ✓ · sort+scroll restored exactly ✓ | 26 DOM rows ✓ · all reachable ✓ · sort ✓ · filters ✓ · debounce ✓ · persistence ✓ |
| Render perf | scroll p95 **32.4 ms**, 0 long tasks, heap 9.5 MB, 286 DOM nodes | scroll p95 **33.6 ms**, 0 long tasks, heap 10.1 MB, 286 nodes |
| Style fidelity | screenshots `shots-d/board2-vue-{1280,390}.png` — same verdict as Svelte: reads as w89 (bubbles, palette, shimmer, espresso, Cinzel); mobile 390 clean (0 horizontal, 44 px taps) | screenshots `shots-d/board2-svelte-{1280,390}.png` |

**Verdict: a TIE on every column that matters** — exactly what Ernie predicted ("TanStack has a Svelte adapter"). The one real difference is packaging: **VueUse is one library that also covers storage/debounce (90 vs 130 LOC)**; Svelte's counterpart needed ~30 honest lines. This measures library breadth, not framework capability — say that, per Ernie §4.

## 6 · BENCH-1.5 — Pick Reveal (both arms) + the Phase J defect ledger

**The reveal works identically in both arms** — on PICK, the w89 moment: fxpop card entrance, fxshine sweep on the pos bubble, fxglow ring, R{round}.{pick} label, COMMITTED word; espresso ground; unmounts after the 1.5 s beat; the moment repeats on the next pick. Screenshot receipts `shots-reveal/reveal-{vue,svelte}-390.png`. Pure CSS + one overlay — no library needed (the conventional hint `@vueuse/motion` was NOT required).

**Phase J pilot (the Svelte 5 shell, one sitting, honest counts):** pilot window 09:05:30Z start (receipt `/tmp` timestamp + this log):
| # | Class | What happened | Repair cycles |
|---|---|---|---|
| 1 | unnecessary code | wrote a redundant duplicated if/else branch in pick(); simplified on write | 0 (caught at write) |
| 2 | **type error not caught** | Svelte template referenced `posList` while the const was `POSITIONS` — **the Svelte build shipped it and the page threw `ReferenceError` at boot**; caught by the driver's boot check, fixed, rebuilt | 1 repair cycle |
| 3 | silent wrong output (mine, driver) | A1 browser test run 1: `chromium.launch()` hands session 2 a FRESH profile → localStorage empty → the test silently degraded to a full replay and "passed" with a fake-identical sha. Caught by inspecting the load result; fixed with launchPersistentContext | 1 |
| 4 | stale derived value (Svelte) | TanStack items rendered rows beyond the filtered length → `undefined` reads → effect_update_depth_exceeded (first from my `$effect` reading the store it wrote, then stale windows) | 2 |
| 5 | unnecessary file/state | stale persisted state shape from Board2 v1 poisoned v2 runs → bumped storage key + shape guard | 1 |
| 6 | test passed when it should not | Phase D "first12 = 60s" assertion read the list BOTTOM (reachability walk never scrolled back) — the app was right, the driver read the tail; fixed the driver | 1 |
| 7 | type error not caught (BENCH-1 debt) | shipped-but-never-run drivers: `analyze.mjs` template-literal syntax error; `a3.mjs` TS-in-mjs ×2 + an evaluate race + insecure-context crypto.subtle | 4 repairs total |
| Totals | **defects 7** (silent wrong output 1 · type error not caught 3 · stale derived 1 · unnecessary file/state 1 · test-passed-falsely 1) · **repair cycles 10** · final state: all suites green (see MANIFEST) |

## 7 · PHASE H + the filter-vocabulary defect

- Mobile CSS shipped identically to both bench boards (≥44 px targets, ≤430 px column collapse, wrap toolbar). Board2 (the new full-pool board) measures clean: **0 horizontal overflow, 44 px min tap targets at 360/390**.
- Honest gap: on the OLD bench board the driver still measured a 19 px min tap target at 390 despite the CSS being in the bundle — **UNKNOWN, not resolved in this window**; the Board2 measurements show the same CSS law achieving 44 px, so the law is right and one selector is mis-measured or mis-applied. Receipted as-is.
- **Filter-vocabulary defect (found by the A1 browser test): the bench board's POSITIONS select (OT/OG/EDGE/ILB/SS/FS/HB/FB/K/P) can never match the rows' engine pos tokens (LT/RT/LG/RG/LEDG/REDG/MIKE/WILL/SAM/DT/…) — options like EDGE select zero rows.** FIXED in both arms (select now carries the pool's own vocabulary), verified by `bench15-H.json filterVocabFixed=true`.

## 8 · PHASE E — achievements as data, tendencies, best seasons, favourites

- **E1:** checker reads the DATA FILE (`{id,title,condition,tier}`); the Owner's two first (`champion`, `20-0`); **adding a third (`double-digit-wins`) required zero component changes — data-file only. PROVEN.**
- **E2 (five core signals, real draft log, seed 777):** early-round preference: mode of first-2-round picks · reach rate **3.1%** (picks of sub-70 consensus) · run/pass balance computed over the built roster · trade frequency **0 by design** (the engine draft has no trades) · draft-vs-FA: 32 draft picks; FA feeds the pool freeze. No signal is fabricated.
- **E3:** best-seasons formula **visible**: `wins + playoffWins + champion flag`, wins as tiebreak — printed, not opaque.
- **E4:** most-used (starters) · most-drafted (log) · **user-pinned: NOT AVAILABLE — the record has no pin field** (the A2 gap, named).

## 9 · PHASE F — the brag-share card

Self-contained client-side card (`receipts/brag-card.html`, 58 KB, **fonts embedded base64**, zero network), w89 vocabulary: espresso ground, champion team palette (from the live w89 colour table), champagne-gold shimmer bubble (fxshine), Cinzel/Cinzel Decorative embedded. Screenshot `shots-reveal/brag-card-1080.png`. Honest gap: the demo season's table-row lookup for the champion rendered the record as 0-0 (cosmetic data-binding gap in the demo generator, receipted; the engine data itself is correct — champion Denver Broncos verified).

## 10 · w89-quirks (byte-offset token extraction, as ordered)

`w89-quirks.md` + `w89-quirks.json`: fonts.googleapis fetch at bytes 40528/40640; Cinzel/Bodoni tokens; espresso ground `#140d06` + `--pc1 #c9a24b` (byte 1690634); `.ub` rule; fxpop/fxshine/fxglow keyframes verbatim; the 32-team colour table at byte 373041 (1,769 B object, parsed 32/32 teams); the CAN YOU GO 20-0 jingle at byte 1889122.

## 11 · What I could NOT check, and why (Ernie §K)

1. **Firefox/WebKit A3** — executables not downloaded for the sandbox's Playwright; BENCH-1's downloads blocked by missing system libs (no root). Recorded verbatim in `a3.json`.
2. **A2 (Node 22)** — not installed; only Node 24.22.3. UNKNOWN, as before.
3. **Real phone** — none in the sandbox; the phone-class basis is the CDP-imposed factor (stated in §4-B).
4. **The 19 px tap-target reading on the old bench board** — unresolved this window (CSS present in bundle; Board2 measures 44 px with the same law).
5. **UX-1/UX-2 ratification** — still the Owner's (the engine goneOdds window, unchanged by this round).
6. `cd298e99`'s original computation — basis untraceable; withdrawn (see §1).

## 12 · The framework answer (Owner-asked in chat; per ruling a94b67c: agent-build efficiency)

Answered in the chat reply, evidence-only, from this wave's receipts — not ranked in the package files (boundary §0.1 kept inside the artifacts).
