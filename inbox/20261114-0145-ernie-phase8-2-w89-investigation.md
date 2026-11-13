SPEAKER: ernie | ROLE: council | TASK: Phase 8.2 — w89 investigation (read-only; no saves preserved) | DATE: 2026-11-14T01:45Z
FOR: ALL

The work order says: "Open w89 in a browser. Check saves, determinism, tests." I did it read-only, from the shipped bytes, with Playwright. **Three findings, one of which is a naming correction the record needs.**

## 1 · The live file is not any archived build (VERIFIED — correction candidate)

```
cwd:     /Users/kosi/Desktop/wt/ernie
command: git rev-parse origin/gh-pages ; git show origin/gh-pages:index.html | wc -c ; md5 ; grep -o 'Math\.random' | wc -l
ref+sha: origin/gh-pages @ 3e69567cd1aa8130cdf74e4bd71488954b58050b
output:  index.html = 1,922,769 B
         md5    = 8efa9099ae508532d5392a7c82436b05
         sha256 = dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c
         title  = "20-0"   ·   62 Math.random sites   ·   25 localStorage sites
```

Then I md5'd every archived wave file and the two backups:

```
w44 da3fc202237d7dddba37a7429ea6266d · w49 6bf627b017c1e26281e2bb4fa70d4a60 · w51 e40732a235aa621002bc268c59b36bd0
w56 42af55f794180910f1f9086fe0c68a3d · w57 765ee5cffb65db03dabf183e3f72c0c4 · w85(2) eb91abd22f335e34f6898dcff5e6dde6
index-backup-pre-w85.html 79c4a934969d04e17f357e26ec6740e2
live index.html            8efa9099ae508532d5392a7c82436b05   ← matches NONE of them
```

**So the live site cannot be named.** AGENTS.md §2 says "Live `index.html` is w85 — a wave is 'live' only when `index.html` is replaced with it". On the bytes, **the live `index.html` is not `Football-Sim-Z-post-blue-w85 (2).html`** (different md5), and it is not the `pre-w85` backup either. It is a **fourth distinct build** with no name in the tree.

This matters for §2's own law — *"A name is bound to one sha256. If the bytes differ, it is not that build."* — and it is exactly the class of defect the naming table exists to prevent. **Correction I am proposing (MUSE's to apply, not mine):** the live row should read "live `index.html` md5 `8efa9099…` (1,922,769 B, title `20-0`) — **no wave file in the tree matches; unnamed build**", and w85 should be described as "the last *named* wave, `eb91abd2…`".

## 2 · Saves: nothing is written on a fresh visit (VERIFIED)

```
cwd:     $S/pwrun (Playwright 1.64.1, chromium)
command: serve $S/w89 → BASE_URL=http://localhost:4351 npx playwright test w89.spec.ts
ref+sha: the extracted live index.html (sha256 dbb8c27a…)
output:  localStorage before load: {} (0 keys)
         after load + clicking "Draft": {} (0 keys), changedKeys: []
         console errors: 0   ·   data-testid: 0   ·   body innerHTML 2,266,523 chars
         rendered: 14 position buttons — QB1000, RB375, WR1200, TE450, OT800, OG650, C150,
                   EDGE1100, DT800, LB560, CB800, SS310, FS310, K100
```

**The file contains 25 `localStorage` references but writes nothing on load or on Draft.** So there is **no auto-restore on a fresh visit** — a visitor always starts clean. That is consistent with the Owner's ruling (no w89 save preservation): there is nothing being auto-created that a migration would have to carry. It does **not** prove the save paths are empty — a Save/Continue action would exercise them — but I did not test those, because the Owner's instruction is not to preserve w89 saves, and I was not going to write save data to probe a path nobody is keeping.

## 3 · Determinism: w89 is unseeded at runtime (VERIFIED — the strongest datum here)

```
cwd:     $S/pwrun
command: page.addInitScript wrapping Math.random and Date.now with counters, then click "Draft"
ref+sha: live index.html (sha256 dbb8c27a…)
output:  before the click: Math.random 0 calls, Date.now 0 calls
         after  the click: Math.random 8,808 calls, Date.now 2 calls
         delta: 8,808 RNG calls for ONE draft action
```

**One draft is not reproducible.** 8,808 draws from ambient `Math.random()` per action, plus 2 `Date.now()` reads.

This is the runtime confirmation of AGENTS.md §3's structural claim ("the product has 56–58 `Math.random()` sites and no seed, so runs are not repeatable"). The site count was known; **the call volume per action was not**, and it is the number that sizes the work:

- **For `T-20261022-claude-2` (injectable RNG):** a seeding refactor must make **~8.8k call sites per draft action** deterministic. That is not "swap one function" — it is "every draw goes through one keyed stream", or the refactor is cosmetic and drafts still will not replay.
- **For the framework decision:** it does not change anything. w89 is neither Colors nor Cakepanz's engine; it is the live site, and its determinism gap is a product-engine fact, not a framework one.
- **For any before/after claim about w89:** impossible today, exactly as §3 says. Do not publish a w89 outcome delta until the RNG lands.

## What I did NOT check (so nobody assumes I did)

- No Save/Continue path (Owner: no w89 save preservation).
- No full-season simulation (would take far longer than a draft click; the RNG count per *season* would be the real number and I did not measure it).
- No visual/390 px check of w89 — it is not a framework arm and the Owner has ruled the framework question separately.
- No test suite: w89 is one self-contained HTML file with **0 `data-testid`** and no test harness in the tree. There is nothing to run. That is itself the "tests" answer: **w89 has no tests, and cannot have any without test IDs.**

## VERDICT

Phase 8.2 **answered from the bytes**. Live file identified by sha256/md5; **it matches no archived build, so the "live = w85" line is not byte-verifiable**; saves: nothing written on a fresh visit; determinism: **unseeded, 8,808 RNG calls per draft**, which sizes the RNG task and forbids any before/after claim about w89 today. No tests exist.

Labels: **VERIFIED** — every command, hash and count above. **INFERRED** — that a Save action would exercise the 25 localStorage sites (I did not press it). **UNKNOWN** — RNG calls per full season; the save payload shape; whether the live file is newer than every archived wave (the git log says which commit published it, but a commit date is not a build identity).

*Filed by ERNIE (advisor) · 2026-11-14T01:45Z · read-only; no w89 save was created, read or preserved; no file in `gh-pages` was touched.*

**PRIORITY+:** Phase 8.2 w89 investigation | P2 | live index.html matches NO archived build (md5 8efa9099); no auto-restore (0 localStorage keys on fresh visit); unseeded at runtime (8,808 Math.random per draft); no tests, 0 data-testid | ERNIE this file.