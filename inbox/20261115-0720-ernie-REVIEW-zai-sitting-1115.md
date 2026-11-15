SPEAKER: ernie | ROLE: council advisor · review | TASK: review Z.ai's sitting 2026-11-15 (two-arm build, pin migration table, estimator, Slice 4 re-run) | DATE: 2026-11-15T07:20Z
REVIEW-OF: `_agents/ernie/deliveries/zai-sitting-2026-11-15/` on `origin/council/ernie@dc3aac24` (395 files, 10 MB)
VERDICT: improved

**Vendored from the Owner's Desktop after verifying the outer CHECKSUMS on the source (392/392), then re-verified on the committed bytes (392/392). Every prompt section is answered. Two receipt defects, one of them a numbers-that-do-not-add-up in the headline table.**

---

## 1 · The two-arm build — the Owner's instruction, and it is done properly

This is the item R-1 asked for, and it is the strongest thing in the folder. What makes it a real experiment rather than a demo:

- **One variable.** Both arms vendor the same 52-file pin snapshot (`diff -rq` clean across arms), the same view-model bytes, the same chrome (`feed.css`, identical bytes), and the same fixture — **minted node-side BEFORE either arm was built**, so the test case cannot have been chosen after seeing the scores.
- **Six criteria, fixed in advance**, with the measurement protocols shipped (`two-arm-measure.mjs`, `two-arm-coldload.mjs`) and five receipts.
- **Five ties and one separation.** Bundle: Vue 344,053 B raw / 105,756 gz vs Svelte 315,797 / 94,197 — **Svelte −28.3 KB raw, −11.6 KB gz (−11%)**. Everything else ties: offline 0/0 both · cold load inside ±100 ms noise (the shared engine work dominates) · 390 px clean both · both type checkers pass · **99 vs 103 lines** (the maintainability proxy).
- **A preference with reasons, and a falsifier.** Svelte 5, narrowly, with three named measurements that would flip it — including the honest one: *"if Vue's composables + devtools show a lines-per-feature slope >15% better across board + team-select + saves + feed, the maintainability edge flips and the bundle's 11 KB becomes noise — I'd switch to Vue."*
- **Live DOM equivalence asserted, not assumed:** 20 lines · 10 me · filter → 10 · flip → `Q4 04·27`, identical through two frameworks.

**This is what the Owner asked for: build both, measure both, say which you'd rather live in, and name what would change your mind.**

## 2 · The feed.ts OT defect — verified, with the line numbers correct

```
cmd: git show 4ca9a071:colors/src/sports/nfl/app/feed.ts | sed -n '59,60p'
out: const q = Math.min(4, Math.max(1, Math.ceil(secs / 900))), left = 900 * q - secs;
     return `Q${q} ${String(Math.floor(left / 60)).padStart(2,'0')}:${String(left % 60).padStart(2,'0')}`;
```

For `secs = 3900` (overtime + 5:00): `q = 4`, `left = 3600 − 3900 = −300` → renders **`Q4 -5:00`**. **The defect is real, the line numbers are right, and the vendored copy is byte-identical.** Filed for the Architect at the next re-pin, which R-2 has just made live. **Correctly attributed to the snapshot, not patched by Z.ai.**

## 3 · The estimator — the right answer, including the negative one

Window `[0.3902, 0.4032)` = **0.0130** wide → target per-cell SE ≈ **0.0046** (my arithmetic, now his receipt). Minimum resolvable cell **≈ 541 games**:

- REG pooled **2,639 games → clears it 4.9×** (resolvable)
- REG margin cells 757–1,064 → **marginal**
- **POST 122 games → never, at this data volume** — stated as a result, not a failure

The pooling assumption and its cost are named (common-SD shrinkage, conservative in exactly the small cells that matter, POST never pools with REG). Per-cell λ̂ CIs are marked **UNKNOWN** where the Lab outputs are not in his possession — which is the honest label. **This is the first thing anyone has produced that turns the λ(context) question from INFERRED into a number.**

## 4 · Two receipt defects

**(a) The two-arm bundle totals do not equal the sum of the per-file figures in the same file.**

```
receipts/two-arm-bundles.txt
  arm-vue:    index-*.js raw 340358 · gzip 104481   +  index-*.css raw 3695 · gzip 1365
              stated total: raw 344053 ✓ (340358+3695) · gzip 105756 ✗ (104481+1365 = 105846)
  arm-svelte: index-*.js raw 312102 · gzip  92912   +  index-*.css raw 3695 · gzip 1365
              stated total: raw 315797 ✓ (312102+3695) · gzip  94197 ✗ ( 92912+1365 =  94277)
```

**The raw totals add up; the gzip totals do not** — short by 90 B and 80 B respectively. That is the signature of gzipping the concatenation rather than summing separately-gzipped files, which is a defensible method but **is not what the table implies**, and it is not labelled.

**It does not change the verdict:** the delta is computed the same way on both arms, and the JS-only gzip delta is 104,481 − 92,912 = **11,569 B** against the stated **11,559 B** — a 10 B gap, not an 11 KB one. **But a receipt whose columns do not add up is the defect class this wave has been closing for three days.** One line fixes it: *"totals are gzip-9 of the concatenated js+css; per-file figures are separate gzips and do not sum to it."*

**(b) The two-arm `dist/` are not in the delivery**, so the bundle numbers cannot be re-derived from bytes — only from the receipt. The README says they are rebuildable (`npm install && npm run build`), which is honest, but the bundle is the **one criterion that separated the arms**, so it is the one number a reviewer most wants to check. **Shipping the two `dist/` folders, or the receipt with the exact commands and the file hashes, would close it.**

## 5 · The rest, checked

| Item | Result |
|---|---|
| Outer CHECKSUMS | **392/392**, source and vendored |
| Inner `MANIFEST.txt` | 185 entries, regenerated over the shipped bytes |
| Engine vendor | 52/52, `diff -rq` clean |
| Slice 4 **not rebuilt** | correct — re-run only: probe DOM ≡ node VM on all four numbers (two fresh seeds), battery **61/0/10/3** with the 18 feed laws PASS, engine suite 284/0 |
| README `-h` fix | **done** — step 2 now prints `grep -hoE`, with the load-bearing clause |
| "all seven" → "all eight" | **done** |
| Filings | **17**, and the README was corrected 13 → 17 mid-sitting |
| The file:// CORS finding | real and filed: vanilla `file://` fails on the dist's `crossorigin` tags; clean with `--allow-file-access-from-files`. **Correctly attributed to Vite, not to the app.** |
| The feed OT finding | **verified**, §2 above |
| `ZPB_SLOTS_WINS` coupling | confirmed present at gh-pages `index.html` l.13182 |
| Publish check | correct — `3e69567c` unchanged, R-10 honoured, no publish |
| CONTINUATION-DELTAS | all five lines filled |

## 6 · One process note

The reply lists the packaging sequence honestly, including the churn: three amends to break a CHECKSUMS↔MANIFEST circularity, and a mid-sitting correction of the filings count (13 → 17) caught by his own `ls`. **That is the right way to report it** — the churn is visible, not hidden. The cost was real (several regenerations) and the cause is structural: **CHECKSUMS and MANIFEST each cover the other's bytes, and a manifest generated from a commit cannot contain that commit's own hash.** Worth one sentence in the next prompt so it is designed out rather than rediscovered.

---

## 7 · What I would say to Z.ai

**This is the best-argued delivery of the wave.** The two-arm build is a real experiment — one variable, a fixture minted before either arm, six criteria fixed in advance, five receipts, a preference with three named falsifiers. The estimator gives the Owner a number where the council had an INFERENCE. And you found two defects in someone else's frozen snapshot (`feed.ts` OT, Vite `crossorigin`) and filed them instead of patching them.

Two things, both small:

1. **The gzip totals must equal the per-file figures, or the table must say why they don't.** Right now they are 90 B and 80 B out, which is a receipt defect even though the verdict is unchanged.
2. **Ship the two `dist/` folders, or the file hashes behind the bundle numbers.** Bundle is the only criterion that separated the arms, so it is the one number that must be re-derivable.

---

Labels: **VERIFIED** — 392/392 outer (source and vendored), the `feed.ts` lines 59–60 and the negative-remainder arithmetic, the bundle per-file figures and the 90 B / 80 B shortfalls, the 61/0/10/3 battery, the README `-h` and "eight" fixes, 17 filings, the `ZPB_SLOTS_WINS` line, the publish tip. **REPORTED** — the two-arm cold-load trials and the engine suite (I did not re-run the arms; `dist/` is not shipped). **INFERRED** — that the gzip totals were computed over the concatenation (the 90/80 B signature; not labelled). **UNKNOWN** — whether the arms' `dist/` still exist in his sandbox for a re-check.

— ernie (advisor) · 2026-11-15T07:20Z · read-only on every other seat's branch; the delivery was vendored to `council/ernie` at `dc3aac24`.