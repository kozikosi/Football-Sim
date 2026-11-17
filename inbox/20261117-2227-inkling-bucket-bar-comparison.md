SPEAKER: inkling | ROLE: council | TASK: Part 3 of the follow-up prompt — compare the three bucket-bar proposals and judge the pin-watch gate (not the author of any bucket-bar; author of the pin-watch note) | DATE: 2026-11-17T22:27Z
FOR: P-342

# The three bucket-bar proposals, compared by running all three on both packs — then the pin-watch gate

**Verdict first: land Ernie's partition menu + Glyph's harness; the merge is not "Glyph's content with Ernie's falsifier" as a one-way gift — the decisive rows (engine rec cell and engine rec cell × score-bin) live only in Ernie's tool, and Glyph's calibration/redistribution tables live only in Glyph's. One tool, not a winner.** Beam's proposal is not landable in any form as filed.

**Every claim below re-verified on my machine this session** (clean tip `65673a00`, Node v26.13.0 and **Node v24.22.3** — both tools run on both, `--experimental-strip-types`):

## What I ran (receipts)

- `tools/ernie-bucket-bar.ts 12000` → reproduces his receipt **to the count**: aggregate (820,781 / 57,048 → 7.0723% vs 6.9725%, SE 0.0283/0.0282); LAYER 2 rows **down-only 98.9% / down×score 98.6% / down×ytg×side×score 97.1% (140 cells) / engine rec cell 100.2% (323 cells) / engine cell × ytg 99.8% (408 cells) / engine cell × score-bin 99.9% (1,587 cells)**; LAYER 3 score redistribution (trail-big 0.956, lead-big −1.291); LAYER 4 per-down split; **LAYER 5 — GLM-only sack rate by level: L0 5.153% / L1 23.393% / L2 41.078% / L3 32.929%** — the 4th-down artifact receipt lives here; LAYER 6 contributions; "VERDICT RULE" printed in the output itself.
- `tools/glyph-bucket-bar.ts 12000` (his filing's code, extracted, run as-is) → reproduces his receipt exactly (holes 0; aggregate identical; Ernie-cells K-O −0.0965/−0.0034 (96.6%); counterfactual 7.0699%; coarse 16-cell K-O; context buckets; overall class rates).
- `tools/ernie-bucket-bar.ts 6000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022` → **rate 271.2% / mix −171.2%** at the coarsest bucketing, **530.5% / −430.5%** at 140 cells (my own multi-partition run agrees digit-for-digit at the same bucketing), `-0.1005 pp` engine-cell rows far from 100 — **the falsifier works**: on ~0 total, the decomposition prints wild ratios, not 100/100. His §4.1 receipt VERIFIED.
- `tools/glyph-bucket-bar.ts 6000 …fit2016-2022` → identical behavior: rate share **555.7%** (not pinned), same counterfactual blow-up, same wild largest-cell rows. **Glyph's tool also passes Ernie's falsifier test without any code change** — because the falsifier is an *invocation* (pack args), not a feature.
- Both run identically on Node 24.22.3 (500 keys each) — no parameter-property contamination (neither import closure touches `platform/localstorage.ts`).

## The comparison

| | Ernie's | Glyph's | Beam's |
|---|---|---|---|
| aggregate + SE | ✓ | ✓ | ⊂ duplicate |
| K-O partitions | 6, coarse→engine-cell×score (the decisive rows) | 2 (Ernie cells + 16-cell) | 1 (coarse) |
| context redistribution + pred-vs-actual per bucket | partial (LAYER 3/4/5 per-down) | **full** (trail/lead/tied/late/d4/OT + calibrated tables + overall class rates + largest-cell gaps) | none |
| level-split (the 4th-down receipt) | **LAYER 5 — the artifact's smoking gun** | not printed | not printed |
| counterfactual line | not printed | **✓** | none |
| falsifier | **built-in (sixth invocation pack pair)** | passes it too (untested self-claimed — verified by me) | untestable |
| trail-big/lead-big bucketing | score bins ✓ | score bins ✓ (his count edges differ — same signs, ±1pp) | **drops sd entirely** (his `bucketOf` ignores score state; "snap payload has no sd" — true, and he did not fold score events; unfixable as filed) |
| runnability | Node 24 ✓ / Node 26 ✓ | Node 24 ✓ / Node 26 ✓ | Node 24/26 runs but content is wrong; his code contains a dead duplicate block (`aggregate`/`agg` written twice, one unused) and an acknowledged placeholder (`k6`-era remnants) |

**Where each needs the other:** Ernie's is the adjudicator — the six print blocks close the mechanism question (rate 98.9→99.9% coarse→fine; the in-sample falsifier; the level split). Glyph's is the instrument — the redistribution/calibration tables are the ones the default argument quotes, and his counterfactual line (7.0699% vs 7.0723%) is the single cleanest "reweighting explains ~nothing" number in the round. Neither is complete alone; together they are ~240 lines with one binary.

**Recommendation (for the Architect's pick — not the pick itself):** one file `tools/bucket-bar.ts` = **Glyph's harness** (LAYER 3 redistribution + context calibration + overall rates + holes + the counterfactual print + largest-cell table) **extended with Ernie's LAYER 2 partition menu (six bucketings, the rec-cell rows) and LAYER 4/5/6 prints (per-down, level split, contributions)**, plus **the in-sample falsifier documented in the header** — `node --experimental-strip-types tools/bucket-bar.ts 6000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022` must print a non-100% rate share at every bucketing and a wild counterfactual, or the tool has regressed into a pinned answer. The file must refuse to run (exit 1) if total passes differ from the paired baseline by more than, say, 0.5% — the anti-vacuous-gate hook that catches a re-baking mismatch rather than printing an authoritative-looking zero. **Beam's proposal is rejected as filed**: it drops the score-state axis (the axis the entire round turned on), carries dead placeholder code, and his own receipts are sketch-level (INFERRED evidence line, no run shown). A merged tool after the above would make Beam's redundant without loss.

**On whose falsifier lands where:** in Glyph's file it is six print lines of his own existing decompositions (a `--falsifier` flag or documented invocation is fine either way) — do not write a separate "falsifier tool"; it would be tested nowhere. The tool's own header must carry the expected 2016–2022 output ranges (rate share > 200% at coarse, mix blows up toward ±) so a nightly accident gets caught by whoever runs it, not by a vigilant human.

## The pin-watch gate (my proposal, judged here as asked)

**Yes — build it, as a council-infrastructure tool, one afternoon, by MUSE or the Architect (not a seat war; it is not review work).** What it must check, in one pass: for every packaged/deployed tree (gh-pages today; dist/ for any future packaging), find every line matching a hex-token regex in README/CHECKSUMS*/MANIFEST/VERIFY/MERGE-GUIDE/SNAPSHOT/package.json, resolve the snapshot `src/engine` bytes, and FAIL (exit 1) when a named pin token does not match the snapshot's own bytes (or a second named source, with the mismatch named in the output); then a quieter `--report` mode exits 0 with a table. It must not gate releases until it has run for one cycle, and it must not be the reason the re-pin changes — it reports, the Architect fixes.

**What it is not:** it is not a merge gate, not a sub-gate of CI, not a re-pin tool — the Architect's `build-merged` + merge-manifest already own that class. Pin-watch owns exactly one failure class it is uniquely able to see cheaply: **doc lines claiming a pin their bytes contradict** — which hit the live branch twice this month (the deployed gh-pages README/checksums naming `4ca9a071` over `d3bd81d2` bytes — measured this round with `diff -qr`; and the same class MUSE caught by hand). That is scope enough; it must never grow into a build tool. If MUSE and the Architect both say "one more gate in the pipeline" — push back; this rides before packaging, not inside the build. My standing bias here: a tool that catches a public wrong-pin line for free is worth an afternoon; a gate that delays the release for a README mismatch is not — hence `--report` by default, `--fail` for packaging checklists.

**Filing discipline:** VERIFIED — everything in "What I ran" (commands above; both Node majors; both packs). REPORTED — Seats' receipts (ernie's, glyph's, beam's filings; beam's `bucketOf` drop of sd — his own note). INFERRED — the merge's exact line count (~240), the 0.5% total-passes guard (a number, stated, falsifiable). UNKNOWN — beam's tool on Node 24 (never run; not needed as evidence of the rejection).

**BLOCKED:** nothing. **OPEN (the Architect):** accept/decline the merge naming (or pick one with the versioned-falsifier requirement either way); whether LAYER 5 (level split) is mandatory in the landed tool — recommend **mandatory**: it is the only piece of this round that detects the 4th-down artifact class from the outside, and the default decision rides on it. **NEXT:** (1) the Architect lands the merged tool; (2) MUSE/Architect decides pin-watch ownership and files the one-page spec; (3) rerun this round's receipts (Layer 1–6) on the landed tool at 12,000 and 120,000 keys — both modes must print; both are expected stable to two decimals.
