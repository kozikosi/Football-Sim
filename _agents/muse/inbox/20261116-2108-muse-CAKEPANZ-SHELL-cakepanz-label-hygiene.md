SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist — Part 17, label hygiene (FOR: P-345 vs R-13) | DATE: 2026-11-16T21:08Z
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 17 — Label hygiene: the FOR: P-345 vs R-13 mislabels

## Verdict (VERIFIED — each file read, not taken from any seat's filing)

The prompt's count is half right. **Inkling: 8 files mislabelled — confirmed exactly as claimed.** **Ernie: only 2 of the 4 claimed files are mislabelled** — the other 2 are legitimately P-345, and Ernie's own label-hygiene filing (`inbox/20261116-0219-ernie-label-hygiene.md`, FOR: R-13) already says so. The prompt's "4 Ernie files" is a stale numeral; the corrected total is **10 flags (8 Inkling + 2 Ernie)**, of which 5 are whole-file mislabels and 5 are partial (framework-comparison sections inside a mixed filing).

No renumbering is performed here. No file is edited. This is the corrections list for the coordinator's bulletin entry, per the task.

Background (VERIFIED): P-345 is the play-level innovation round (λ / play-level design); the framework comparison (Vue 3 vs Svelte 5, fresh-start arms, settle rule, offline boot) files under "framework comparison (R-13)" and has no P-row. Both seats had already self-filed hygiene notes this session — Inkling's `inbox/20261116-0510-inkling-label-hygiene.md` and Ernie's `inbox/20261116-0219-ernie-label-hygiene.md` on their own branches. I re-read every candidate file myself; my classifications below agree with Inkling's filing on all 8 and with Ernie's filing on all 4 (including the 2 keeps).

Method (VERIFIED): `git grep -l "FOR: P-345" origin/council/inkling` (30 files) and `origin/council/ernie` (8 files); then `git ls-tree` + first-`FOR:`-line dump of every `inbox/*.md` on both branches, then a read of the head + framework-content grep of each candidate. The 24 Inkling inbox files carrying `FOR: P-345` break down as: 15 legitimately λ/play-level, 1 innovation-round keep (`20261114-1723-inkling-answer-innovate.md` — framework ruling appears only as an Owner-blocked item), and the 8 below. The 4 Ernie inbox files carrying `FOR: P-345` break down as: 2 keeps and the 2 below. The three `inbox-20261114-zai-p345-axis-table.md` copies in the deliveries are Z.ai's λ axis table — genuinely P-345, not flags.

## Corrections list — council/inkling (8 files)

| # | File (branch `origin/council/inkling`, dir `inbox/`) | Current FOR: line (verbatim) | Correction | Basis (my read) |
|---|---|---|---|---|
| 1 | `20261115-1330-inkling-P-345-fresh-start-experiments.md` | `FOR: P-345 (the framework comparison — see labeling note below)` | `FOR: framework comparison (R-13)` — whole file | Design review of the fresh-start Vue vs Svelte experiments (Rev 2 prompt). Task line: "fresh-start Vue vs Svelte experiments — design review". Self-flags the mislabel in-file. |
| 2 | `20261115-1342-inkling-authoring-sitting-review.md` | `FOR: P-345 (the framework comparison — same labeling note as my Rev 2 design review: the live queue's P-345 is the play-level innovation round; this delivery belongs to the framework-comparison line of work; flagging, not renumbering).` | `FOR: framework comparison (R-13)` — whole file | Review of Z.ai's authoring-sitting delivery (fresh-start evidence; arm-vs-arm engine identity, pool ledger). Self-flags the mislabel in-file. |
| 3 | `20261115-1510-inkling-REVIEW-ernie-offline-file.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — whole file | Review of Ernie's offline/file:// experiment; arm boot replication (vanilla `file://` fails both arms identically; `dist-file` route C/S builds; identical content hashes). Task line names the P-345 round, content is framework-round evidence. |
| 4 | `20261115-1535-inkling-REVIEW-ernie-compare-cards.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — whole file | Review of Ernie's Vue-vs-Svelte player-cards comparison (both arms build exit 0, byte-identical hashes, delta table). Pure arm-vs-arm comparison. |
| 5 | `20261115-1130-inkling-direction-brainstorm.md` | `FOR: P-345 (the Owner's direction/innovation round) — answering as INKLING's own filing, not relayed.` | `FOR: framework comparison (R-13)` — **for the framework sections only**; the rest stays P-345/direction | MIXED. Carries arms/parity/slice-5-both-arms/framework-race material ("Slice 5 player cards, both arms, Vue first", "Parity, not pause — until the Owner rules", framework-race framing) inside a direction filing. |
| 6 | `20261115-1154-inkling-direction-innovation.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — **for the framework sections only** (Q3 "Vue 3 + Vite or Svelte 5 + Vite?", framework proxies, boot medians, 0 `.svelte` files in Colors, React-dependency hygiene under R-9); the rest stays P-345/direction | MIXED. Q3 and the proxies section are framework-comparison work; the Q1–Q8 direction answers are the innovation round. |
| 7 | `20261115-1240-inkling-testing-innovation.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — **for the arm measurements only** (Vue vs Svelte boot replication n=6, single-file artefact, file:// boot analysis); the rest stays P-345 | MIXED. Task line: "testing + innovation (P-345 round 2)"; the boot-replication block (vue 7597… vs svelte, "svelte faster 4/6") is framework-round evidence. |
| 8 | `20261115-1303-inkling-testing-innovation-round2.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — **for Split 2 only** ("the settle rule for the Vue vs Svelte pick", ≥15% time-to-green on ≥2/3 pairs); Split 1 (platform smallest version) stays P-345/direction | MIXED. Task line names both splits; only Split 2 is framework-comparison work. |

## Corrections list — council/ernie (2 files mislabelled, 2 keeps)

| # | File (branch `origin/council/ernie`, dir `inbox/`) | Current FOR: line (verbatim) | Correction | Basis (my read) |
|---|---|---|---|---|
| 1 | `20261115-1302-ernie-testing-innovation-round2.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — whole file | Task line: "P-345 r2 follow-up — which platform surface first, which settle rule settles Vue vs Svelte". Part 2 is entirely the framework settle rule (Glyph's ≥15%, Ernie's sign test, the proposed paired variance-relative rule). The whole subject is R-13's question. |
| 2 | `20261115-1225-ernie-testing-innovation.md` | `FOR: P-345` | `FOR: framework comparison (R-13)` — **for the framework-reconcile section only**; the pool-ledger (A5) and A6 fork-semantics sections stay P-345/engine | MIXED. Task line: "P-345 round 2 — the testing still owed, the innovations to develop, the framework reconcile, the settled constants to re-measure". The reconcile section (Vue/Svelte boot replication, R-9 react/react-dom still declared, packaging-route mount deltas) is framework work; the ledger/fork sections are engine work. |

### Ernie files the prompt counts that are NOT mislabels (verified keeps)

| File | Current FOR: line | Why it stays P-345 |
|---|---|---|
| `20261114-0115-ernie-A3-A4-notes-to-everyone.md` | `FOR: P-345 · ALL` | A3 plays-ledger corrections + A4, executed from source (running A3's script). Engine/draft-data work; the only "framework" hit is a file path containing `zai-framework-test-systems-parta` — a path, not framework-comparison content. The `· ALL` is a distribution note. |
| `20261114-0130-ernie-cross-side-stars-design-note.md` | `FOR: P-345` | Phase 5 product design note on the Owner's cross-side-stars ruling (where the numbers come from, determinism, one inconsistency with an existing ruling). Play-level engine design. Its one framework mention is a passing note that the fwtest fixture cannot measure the feature — not framework-comparison work. |

## What unblocks / exact artifact / how to verify

- **Unblocks:** the record — the queue/custodian view of what belongs to the framework-comparison line (R-13) vs the play-level innovation round (P-345). A reviewer counting R-13 evidence from `FOR:` lines currently misses 10 files.
- **Artifact:** this filing (the corrections list). The coordinator puts it in the bulletin entry; no seat edits the pushed files.
- **Verify/apply:** `git grep -l "FOR: P-345" origin/council/inkling -- inbox/` and the same on `origin/council/ernie`, then read each file's TASK line and check the subject against the classification above. The correction itself is a label change the Owner/custodian applies (or leaves as a flag — the seats' own filings both say "flagging, not renumbering").

## Self-lint: stale numerals in my own filings this round (Part 17's second duty)

Checked every number quoted in my three companion filings against its source, this session:

- **Pin filing:** 52 files (s5 snapshot — `find src/engine -type f | wc -l`); 57 files (gh-pages snapshot); 6 differing + 5 only-in-`d3bd81d2` = 11 diff lines (both directions); QB→FS 10 (s5 `flex.ts:10`) vs 12 (`d3bd81d2` `flex.ts:11`); gh-pages tip `66096fb1`. All re-verified from the `git archive` extracts.
- **Style-laws filing:** `feedVM.ts:114-115` (2PT/2PT FAIL — both s5 and Ernie deliveries, same lines); `recap.ts:107-108` (2-Pt Conv); `Feed.svelte:108` (gold `.cp-me`); `Saves.svelte:73` (`· rev`); zero hits for the period grep and the "expected scoring"/"before kickoff"/"sudden death" greps. All re-verified from the same extracts.
- **This filing:** 8 Inkling + 2 Ernie = 10 flags (not the prompt's 12); 5 whole-file + 5 partial. Counts derived from the `FOR:`-line dumps above, not from any seat's filing.
- **D3 filing (companion):** baseline 363/0 full suite and 12/0 sim-slice at `86f22d10`; four mutation runs — numbers in that file only, with the commands attached.

One numeral corrected in the course of this part: the prompt's "4 Ernie files" → 2. The prompt's "8 Inkling files" stands as claimed.

## Labels

- VERIFIED: every FOR: line quoted above (read from `git show origin/council/<seat>:inbox/<file>`); the subject-matter classifications (each file's TASK line + content grep read by MUSE this session).
- REPORTED: that Inkling's and Ernie's own hygiene filings exist and agree with these classifications — I read them, but the classifications above are my own reads, not citations of theirs.
- INFERRED: that mixed files should be flagged per-section rather than refiled whole — a filing convention, not a measured fact; the Owner/custodian decides whether a partial flag counts as one flag or two.
- UNKNOWN: whether the custodian wants the labels changed in place on the pushed branches or left as flags in the bulletin entry — the seats' own filings both assume flag-only, and I do not override that.
