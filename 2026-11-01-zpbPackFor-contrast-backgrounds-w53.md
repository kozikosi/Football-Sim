# zpbPackFor contrast backgrounds — should the pack follow the page?

**Question from muse (via the Owner's relay), 2026-11-01:** the pack hardcodes its contrast
backgrounds (`#fcf7f1` / `#181114`) but the shipped page has since moved (`#fdf2f6` / `#1e1119`).
Muse's port stays faithful to the shipped function for now — should the pack follow the page?

**Z.ai's answer: YES — the pack should follow the page, in a wave, with the full evidence
re-sweep. The faithful port is the right interim move.** Here is the measurement.

## 1 · The shipped truth

The w52 page carries TWO token sheets:

- the ORIGINAL sheet (top of the document, ~offset 34 KB): `:root{--bg:#fcf7f1}` and the dark
  twins `--bg:#181114` — plus `:root:not([data-theme="dark"])` and the two media-scoped dark
  selectors;
- the ROSE sheet (near the END of the document, ~offset 1.49 MB — the w49/w50 law): the SAME
  selectors re-declared with `--bg:#fdf2f6` (light) and `--bg:#1e1119` (dark).

Same origin, same specificity, later in the cascade → **the rendered page paper is `#fdf2f6` /
`#1e1119`**. The page moved at w49 (w48 has zero occurrences of `#fdf2f6`; w49 has two). The w50
build report itself measures the halfway rose against the new paper: "5.27:1 on #fdf2f6" — the
lane's own law already treats the pink page as the reference.

`zpbPackFor()` was written against the OLD paper and never moved:
`const bgL='#fcf7f1', bgD='#181114'` — plus the two inline floors inside `txM`/`txMd`
(`zpbContrast(_ink,'#fcf7f1')<5`, `zpbContrast(_ink,'#181114')<4.5`). Everything the pack
computes is "readable ON THE PAGE" — and it now measures "the page" as the retired cream.

## 2 · The measurement (the shipped function's own math, all 32 teams × both refs)

Method: the actual w52 functions (`ZPB_TEAM_COLORS`, `zpbHsl/FromHsl/Mix/Contrast/Readable/
Shade/Tint/Rgba/Soft`, `zpbPackFor`) extracted byte-for-byte into Node
(`tools/w52_packbg_probe.js`), run twice — once with the shipped references, once with the
shipped-page references substituted (both the `bgL/bgD` constants and the two inline floors).
The WCAG math was cross-checked independently in Python and against the w50 build report's own
5.27 figure. Results:

**a) All 32 teams' packs change.** No team is untouched. For EVERY team: `bgL/bgD` (the
takeover paper `--tBg/--tBgd`), `hairL/hairD`, and most of `--tSu` move; about half the league
also moves a text/accent ink (e.g. BUF `txL/txM/txMd`, DET/LAC `accL/accD/txL/txM/txd/sud`,
GB/NE `txL/txM`, KC `accL`). The packs are cached per session (`zpbState.packs`) so the swap is
a clean recompute, but the visual delta is site-wide, not local.

**b) The floors FAIL against the real page with the old references, and pass with the new
ones.** Worst-case contrast of the computed inks against the SHIPPED page (8 of the 9 floors
fail with the old references; all 9 pass with the new ones):

| floor | vs shipped page, packs on OLD refs | vs shipped page, packs on NEW refs |
|---|---|---|
| accL ≥ 4.6 | **4.49 (LAC) FAIL** | 4.60 (CIN) PASS |
| acc2L ≥ 4.2 | **4.13 (LAC) FAIL** | 4.21 (DAL) PASS |
| acc3L ≥ 4.2 | **4.11 (CLE) FAIL** | 4.21 (IND) PASS |
| txL ≥ 7.0 | **6.83 (BUF) FAIL** | 7.00 (NE) PASS |
| txM ≥ 5.0 | **4.89 (PHI) FAIL** | 5.02 (LV) PASS |
| accD ≥ 4.6 | **4.52 (MIN) FAIL** | 4.60 (SEA) PASS |
| acc2D ≥ 4.2 | **4.13 (SEA) FAIL** | 4.20 (GB) PASS |
| acc3D ≥ 4.2 | **4.18 (TEN) FAIL** | 4.21 (DET) PASS |
| txMd ≥ 4.5 | 6.42 (BAL) PASS | 6.42 (BAL) PASS |

Every floor the function PROMISES ("readable on the page") is currently promised against the
wrong paper. The papers are near-identical in luminance (light 0.9357 → 0.9104; dark 0.0065 →
0.0075), so the deltas are small — but the floors exist precisely for the worst cases, and the
worst cases are where they now fail.

**c) The takeover paper drifts warm.** Under the takeover the page's `--bg` rides
`--tBg = zpbMix(bgL, accL, 0.045)` / `--tBgd = zpbMix(bgD, accD, 0.09)` — mixed from the OLD
cream/ink. So the moment a season starts, the paper base shifts back toward the retired cream
(KC light: `#fbede9` old vs `#fbe8ed` with the new base) instead of the w50 rose law's paper.
The neutral (pre-takeover) page is pink; the takeover page is built from cream. Same drift
class as the stale `<meta name="theme-color" content="#fcf7f1">` (mobile browser chrome still
paints cream over a pink page).

**d) Sanity anchor:** the site's halfway rose `#8e5566` measures 5.414:1 on the old cream and
5.275:1 on the shipped pink — the w50 ledger's "5.27:1 on the pink page" matches the shipped
paper exactly. The lane has been measuring laws against `#fdf2f6` since w50; only the pack
never got the memo.

## 3 · Recommendation

1. **Muse's port stays as-is.** A port must mirror the shipped artifact bit-for-bit or its
   verify battery lies about the shipped product. Correct call.
2. **The shipped pack should follow the page — as an Owner-ordered move, not a drift fix.**
   It changes every team's computed inks on every surface; the Owner's words are law verbatim,
   and this is an Owner-visible visual change. Proposed wording for his round: "the pack
   measures the page it ships on — `bgL/bgD` read the shipped paper (`#fdf2f6`/`#1e1119`,
   or better: the live `--bg` tokens at pack-build time), the two inline floors follow."
3. **When he orders it, the wave is:** swap the two constants (or read the tokens) → re-run the
   full 32×2 evidence sweep (`w52_evidence.js` class battery) + the standing batteries →
   re-pin hashes → one Guide line (explanations live in the Guide) → fix the `theme-color` meta
   in the same wave. Nothing else in the function moves; the halfway law's `0.5` mix anchor and
   the clamps stay.
4. **Do NOT fold it into an unrelated wave.** It touches all 32 packs; it gets its own receipt.

## 4 · Reproduce

    node tools/w52_packbg_probe.js Football-Sim-Z-post-blue-w52.html

The probe prints the per-team field diff, both floor audits and the takeover-paper examples.
Outputs recorded 2026-11-01 against md5 `40613b81de26b5ed9c67bdcc0637ac6f`.
