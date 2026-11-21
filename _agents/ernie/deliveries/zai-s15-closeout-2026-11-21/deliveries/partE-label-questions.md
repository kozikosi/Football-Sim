# Part E — the label questions (REPORTED, not decided) · Z.ai · cakepanz-6 · 2026-11-18

Owner ruling owed on each row below. NOTHING was changed to favor either term; the only edit this
sitting is the mechanical one at the bottom (one constant, same displayed value).

## The value-label question — two live terms, none ruled

| term | where it lives (measured this sitting) |
|---|---|
| **"Value"** | w89's pick-analysis column header (the live product, gh-pages w89.html). NOT in the shell. |
| **"Model Value"** | the shell's only value term — `src/lib/valuation.ts` `MEASURED_LABEL` / `MODE_LABEL.measured`; rendered by ModeSwitch.svelte (the three mode buttons), TeamSelect.svelte:46 and Cards.svelte:38 / Complete.svelte:31 / App.svelte:304/307 (the provenance lines "Every number … reads **Model Value**"), Settings.svelte:41 (the mode echo), Guide.svelte (the numbers section — now read from MODE_LABEL, no hardcode). |
| ~~"Engine Value"~~ | **ruled OUT as user-facing by the Owner (2026-11-17).** Appears NOWHERE: no .svelte file, no label value (N24 asserts both — the law greps every rendered surface and MODE_LABEL's values). It is not a live option and is not presented as one. |

The one-touch property (the mechanical piece done this sitting): the term is now a SINGLE constant,
`export const MEASURED_LABEL = 'Model Value' as const` (valuation.ts), consumed by MODE_LABEL —
one change flips it everywhere, the displayed value is unchanged. The Guide's prose now reads
MODE_LABEL too (its hardcode was the last place a ruling would have missed).

## The two-point chip question — also untouched

| surface | chip |
|---|---|
| w89's feed | **"2-Pt Conv"** — 11 UI occurrences in the live w89.html (measured: `grep -c "2-Pt Conv"` = 11) |
| the shell's feed chips | **"2PT" / "2PT FAIL"** — `src/lib/port/feedVM.ts:100-101` (CONV_BADGE: two → "2PT", two_fail → "2PT FAIL") |
| the engine recap copy | **"2-Pt Conv good/failed"** — `src/engine/sports/nfl/engine/recap.ts:107-108` (rides the feed's detail line unchanged) |

Both live exactly as delivered; the Owner rules which surface (if either) moves.

## The carry-forward line (the prompt's "stale-looking but necessary" report)

- **The dark `--text` non-fix** rides forward unchanged (dark ink = the light plum #8e5566 on
  #1e1119, 3.17:1 — w89's own live behavior, faithfully reproduced; the Owner ruling is still owed
  and the takeover does NOT touch --text). I still disagree that a defect should ship unpatched,
  but it is the Owner's call and the shell reproduces the live product honestly — carrying it.
- **The light gold2 1.65:1 default pair** rides forward unchanged for the same reason (the
  takeover's SOLVED accents all read ≥3:1 — the contrast table receipt in `deliveries/partA/`
  — so the default-palette pair is now the only failing light text pair left).
- **Bodoni Moda stays OUT of the bundle** (the Owner ruling owed); the wordmark leads with w89's
  exact family stack so machines that carry Bodoni Moda locally see w89's brand verbatim, and the
  INLINED Cinzel Decorative is the guaranteed offline face. Named difference (D-4 verdict): on a
  bare machine w89 falls back to Georgia; this shell falls back to the inlined Cinzel Decorative —
  deliberately better inside "as far as the inlined faces allow", stated here so it is not a
  silent substitution.
