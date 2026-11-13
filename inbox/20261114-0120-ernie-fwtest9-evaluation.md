SPEAKER: ernie | ROLE: council | TASK: fwtest9 evaluation wave | DATE: 2026-11-14T01:20Z

**Lanes touched:** A (verification) · C (maintainability) · D (contract identity) · E (inputs to the digest — not the digest) · F2 (`file://` gate) · F4 (round-2 resync of INKLING's arms) · F8 (doc-sync receipt).
**Not touched:** B (scoring — I produce no scores), F12 (no YAML), F16 (not my question).
**Dissent:** one, filed below, against the wave's framing of `arm-solidstart` — not against INKLING's honesty, against the word "framework".

---

## §1 — Four-line receipts (VERIFIED unless marked)

**R1 · The nine arms are now nine measurements, not seven wearing a nine name.**
```
cwd:     /Users/kosi/Desktop/wt/ernie
command: git archive origin/council/inkling -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/{arm-solid,arm-lit,CHECKSUMS.txt} | tar -x -C $S
ref+sha: origin/council/inkling @ 94c6f7e06b63e7f686dcfdd07501c2023b2b2fed
output:  arm-solid npm run build exit 0 (43,464 B JS / 4,104 B CSS, 341 ms) · spec 5/5 (1.9 s)
         arm-lit   npm run build exit 0 (44,145 B JS / 4,270 B CSS, 281 ms) · spec 5/5 (2.0 s)
         both: 69 testids / 32 rows / 0 focus at rest / 0 px @390 / 0 console errors
         manifest: 110 listed, 106 OK, 3 missing only because I did not extract those paths,
                   1 mismatch = CHECKSUMS.txt hashing itself as the empty string
```

**R2 · `file://` is a build step, not a framework axis (F2, and §8 Q5).**
```
cwd:     $S/wr2-singlefile (scratch copy; arm bytes untouched)
command: npm i -D vite-plugin-singlefile@2.3.4 ; add viteSingleFile() + build.cssCodeSplit=false + build.assetsInlineLimit=100_000_000 ; npm run build
ref+sha: origin/council/beam @ 16cf462918861e00e1b86fe237099bced85c98fe
output:  arm-svelte → dist/index.html 74.33 kB, alone in an empty dir: 69 testids, 32 rows, focus "3"→"-1", 0 console errors, spec 5/5 (2.7 s)
         arm-vue    → dist/index.html 95.34 kB, alone in an empty dir: same, spec 5/5 (1.2 s)
```

**R3 · `arm-solidstart`: both filed causes refuted; the fault is SSR lazy-route resolution.**
```
cwd:     $S/{ss,ss-fixed,ss-spa,ss-probe} (four scratch copies of the arm)
command: npm ci ; npm run build ; node .output/server/index.mjs ; Playwright probe with console+pageerror+network capture
ref+sha: origin/council/beam @ 16cf462918861e00e1b86fe237099bced85c98fe
output:  as shipped: 1852 B HTML, #app children 0, 0 testids, 0 console errors, 0 failed requests, spec 0/5
         dev error: "Hydration Mismatch. Unable to find DOM nodes for hydration key: 00000000100000000 <style></style>" at renderAsset → lazyRoute
         CSS-import move (my old cause): still #app 0, still 0/5  → REFUTED
         non-fragment root (test):      still 1852 B, still 0    → REFUTED
         server log: "App() called" + "route module evaluated", NO "Home() called" on the server
         entry-server instrument: "event=true routes=array:1 keys=…,manifest,assets,router,routes,complete"
         defineConfig({ ssr: false }): #app 2 children, 69 testids, 32 rows, 0 errors, spec 5/5 (1.7 s)
```

**R4 · Contract identity across all nine arms (Lane D, F4).**
```
cwd:     $S/{wr1-ernie,ctrl,vue}
command: diff -rq <canonical>/src <arm>/src/engine-contract/src ; find … | xargs shasum | shasum
ref+sha: canonical from origin/council/beam @ 16cf4629 ; INKLING arms @ 94c6f7e0
output:  diff lines 0 (arm-solid, arm-lit, arm-svelte control) ; tree sha256 265ea8c6c509200b…fe5988 in every case
         file count 41 per arm (standalone contract 43; tools/golden.ts + tools/tsc-baseline.mjs never vendored)
         golden.json sha256 0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5
```
This is the F4 answer: INKLING's arms carry the contract byte-identically, so an absorb by Z.ai cannot have drifted it — **the resync is preserved, verified from the bytes, not from a manifest**.

**R5 · A3's checker runs green (not asked this wave, but it gates an A-item).**
```
cwd:     $S/a3
command: git archive origin/council/vl -- …/parta/a3_plays_ledger_check.py | tar -x -C $S ; python3 a3_plays_ledger_check.py
ref+sha: origin/council/vl (Z.ai pass-through)
output:  "ALL 11 ROWS REPRODUCE" — exit 0 (C>OG 5.13→6, OLB>FS 11.74→12, FB>TE 4.74→6, TE>FS 13.64→12)
```

---

## §8 — the ten questions, answered or marked OPEN

1. **Cold rebuild of all nine?** I built **nine** (seven from `council/beam` v2 + two from `council/inkling`). **Build exit 0 for 9/9.** Cold `npm ci` exit 0 for all nine I touched. Node v26.13.0, npm 11.20.0.
2. **Corrected spec?** **8/9 at 5/5** on my machine (`arm-solidstart` 0/5). I additionally found *why* it is red (R3), which the wave record did not have.
3. **`npm run generate` for arm-nuxt?** **Yes, required** — `build` alone does not prerender; `generate` produces `.output/public`. My ledger row says so. I have no receipt for any in-repo doc claiming 5/5 at `build`, so I file **no** F15 correction; if such a doc exists, it is not on any branch I read.
4. **CHECKSUMS?** v2 delivery: **537 OK / 2 FAILED** (two gitignored entries) — my earlier receipt stands. INKLING's solid/lit delivery: **106/106 present bytes OK**, one structural defect (the manifest lists itself with the empty-string hash, so it can never verify on any machine).
5. **`file://` a standing gate?** **No — as a *framework* column it is not a gate, and I can prove the column is empty for the wrong reason.** It is a build-step question (R2). My recommendation: replace the column with *"single-file build achievable? yes/no + one-line recipe"*, which is answerable in minutes per arm, instead of *"does the shipped config happen to inline everything"*, which measures the author's config rather than the framework.
6. **Any arm to strike on correctness?** **I name none, and I dissent from the framing that would.** `arm-solidstart` fails the correctness gate **as shipped, in SSR mode** (R3). On the same component tree in SPA mode it is 5/5 and indistinguishable from the rest. "Eliminate the arm" and "eliminate the stack" are different claims and the bytes only support the first.
7. **Weakest link in the protocol?** Three, all structural, none about anyone's diligence:
   - **It assumes a uniform root container.** Eight arms mount `#app`; `arm-lit` mounts `<framework-arm>`. Any check written as `#app.children.length` returns `-1` (absent) for one arm and `0` (empty) for another, and those are different facts. The receipt field should be *"root container children — name the container"*.
   - **It has no uniform typecheck.** Each arm ships its own tsconfig and they disagree about the vendored contract (arm-next sets `strict:false` and says why; arm-solid/arm-lit set neither and report 143 contract-wide errors). "Typecheck: clean" is not comparable across the nine as currently run, and I would not let it near a score.
   - **It measures the author's config, not the framework** — which is exactly how `file://` produced "0 of 7 offline" as a fact about frameworks when it was a fact about default Vite output.
8. **What I did that nobody asked for?** I moved the CSS import in `arm-solidstart` **to test my own published root cause**, it failed, and I filed my own refutation in the same document as INKLING's. It matters because a wave where seats defend their first diagnosis produces two causes for one red; a wave where they test their own produces one.
9. **UNKNOWN after my pass, and who unblocks it:**
   - The exact line in `@solidjs/start@1.5.1` where the lazy route fails to resolve. **Unblocked by:** anyone willing to patch a dependency in a scratch copy (I stopped short; it is not my call to fork a framework).
   - `file://` behaviour for the **six** stacks I did not single-file (sveltekit, react, next, nuxt, solidstart, lit). **Unblocked by:** whoever owns the offline column, two lines each.
   - Whether the A3 `measured` column is measurement or claim. **Unblocked by:** Z.ai committing the *measurer* (only the checker is in the repo).
   - Whether `arm-lit` is in the set at all — the Owner named **8** stacks, the wave has **9** arms. **Unblocked by:** the Owner.
10. **If INKLING vanished mid-digest?** Tell the next seat: **read `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md`, not the nine prose filings** — one append-only row per arm with the same columns and four-line receipts. Then do the two things the ledger cannot do: single-file the six remaining stacks, and re-run `arm-solidstart` in SPA mode so the correctness row stops being read as a framework verdict.

---

## Verdict lines, per scoring column (measurements only — no scores, no ranking)

| Column | My verdict |
|---|---|
| Correctness (acceptance spec) | **9/9 built · 8/9 at 5/5 · `arm-solidstart` 0/5 in SSR, 5/5 in SPA.** Not a framework elimination. |
| Round-2 drift | **0 arm-owned files changed, verified by sha256 manifests** (v2); INKLING's arms carry the identical contract tree `265ea8c6…`. |
| Contract identity | **9/9 identical (41 files, `265ea8c6…`)** — the only column with no dissent and no gap. |
| `file://` / offline | **0/9 as shipped · 2/2 achievable single-file (svelte, vue) · 6 UNKNOWN.** Column is mis-specified, not empty. |
| Modification / change-amplification | **tie at zero** (1 file, 10 lines, 0 arm-owned) — still true; the fixture needs a **shape** change (WR-3), not another row. |
| UI / responsiveness | **no signal** as measured — all arms render the same fixture; 0 px overflow everywhere I looked. |
| Engine integration | **no signal** — all nine consume the same 41-file contract. |
| Typecheck | **not comparable** (per-arm configs disagree). Do not score. |

## Caveats and blockers

- **Blocking nothing:** Z.ai's v3 delivery has not landed on any branch I can read. When it does, two seats should byte-check it from `git archive`, never a live checkout.
- **Blocking the digest:** the six untested offline stacks, and the `@solidjs/start` line. Neither blocks the *measurement*, both block a complete table.
- **No unblocking ruling needed for anything I filed**, except Q4/Q9's last item (does `arm-lit` belong), which is the Owner's.

## One "your move" line

**Re-run your own published cause before you defend it.** The most useful thing I produced this wave was not a green row — it was a red one: my own CSS diagnosis, tested, dead.

## Dissent register

- **Against the wave's framing of `arm-solidstart`** (filed in full as `inbox/20261114-0005-…` and `-0010-…`): "the arm fails" is supported; "the framework fails" is not. SPA mode passes the same tree.
- **Against my own prior claim**, on the record: the CSS-import root cause (mine) is refuted by my test. I withdraw it.
- **Against INKLING's prior claim**, on the record: `src/routes/` is the convention path and is registered; the route module is evaluated on both sides. Withdrawn.
- **Against the ledger's "73 testids" line** (mine, corrected in the ledger): at rest it is **69** on all three arms I measured.

---

**Filing:** this file. **Ledger rows appended** for arm-solid, arm-lit, and a solidstart SPA row. **Nothing applied to any arm, contract, or `colors/`.**
**Blockers named:** none for my lanes. **Next seat:** single-file the six remaining stacks; then the digest can stop saying "0 of 9".

*ERNIE (advisor) · council/ernie · 2026-11-14T01:20Z · every receipt above is mine; A4/λ numbers are REPORTED and excluded from this file on purpose.*