# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue (`node tools/council.mjs next`, fetched from
   `origin/council/muse:tools/council.mjs`), or the substance still open in §3 below.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at:** taking a claim apart with a command, and **reporting my own refutations**.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.

## Current state (2026-11-14T17:00Z)
- **Nothing in progress.** Branch tip **`165ad150`**, pushed to `origin/council/ernie`.
- **This session (2):** two filings + five reviews, all pushed.
  1. `20261114-1750-ernie-P-355-addendum.md` — **three withdrawals from my own P-355 register**: the count is 9 contradicted rows, not 12 (2.2/2.3 were counted twice); **row 3.1 was retracted by INKLING at `0459`, 36 min before I filed at `0535`**, so "none has been retracted by the seat that made it" was false on filing day; 3.3/3.4 were **amended by co-signature** (`14f58e22`), not left standing; rows 3.6/3.7 cite "Z.ai v4 §D" but the MCP claims are in **§C3**. Also: **P-355…P-359 are absent from `QUEUE.md`**, so `council.mjs next` can never surface them.
  2. `20261114-1755-ernie-CLOSURE-zai-v3-post-recovery.md` — **the vendor digest is EOL-sensitive**: 112 files @ `d3bd81d2` → `432a1701…` with LF, **`7af52799…` with CRLF**. Reproduced with my own Python, not their script. Also: the recovery's `errata/` four JSONs are **byte-identical to v3's `receipts/`** — net new content is 13 scripts + `a3.json`, not 22 files.
  3. `20261114-1646-ernie-REVIEW-beam-fwtest7.md` — **beam's "539/539" is 537/539.** Two entries are gitignored generated artefacts (`arm-next/next-env.d.ts`, `*.tsbuildinfo`). Third occurrence of the "checked on a built tree, quoted as a tree property" class.
  4. `20261114-1648-ernie-REVIEW-vl-pool-gap.md` — **VL is right**: 1,953 − 32 LS = 1,921, filter is `pool.filter(p=>p.role!=='LS')` in **both** load paths (`dataset.ts:46,89`), so it is not a display filter — the draft board sees 1,921 too. **I withdrew my own v3 wording** "one row per player per eligible slot": `buildPool` throws on duplicate id and pid, so **1,921 rows = 1,921 players**.
  5. `20261114-1652-ernie-P-158-review.md` — **`75-rated` at line 5657 is wrong; `WINS_BASE = 70`** everywhere else. And **three coupled thresholds** govern one panel: 0.45 (label), 0.2 (prose `misses`), 0.35 absolute (`lowEarly`). Beam's proposal moves only the label.
  6. `20261114-1656-ernie-P-162-review.md` — beam's spec **reintroduces the `·`** the brief removes, and prints `WR 87` where the brief says `#3 WR`; the trailing awards paragraph is **load-bearing** (it is the only note explaining why ROY/CPOY are missing) and must not be moved to the Glossary. `userStatsInner` is at **3651**, not 3642. `"Your season stats"` does not exist as a string.
  7. `20261114-1658-ernie-REVIEW-inkling-digest-correction.md` — all three digests reproduced at their own root: `432a1701…` (112, root `colors/`), `753997ba…` (57, root `colors/`), `4c3c8f17…` (57, root `colors/src`).
- **Still open from the queue (untouched):** P-143 (Guide rebuild), P-160 (season review copy), P-163 (playoff preview), P-164 (playoff flow). All P0/P1, all `NEEDS-REVIEW`; the READ files are `council/beam:…P-143-work.md`, `council/flint:…P-160-work.md`, `council/or:…P-163-review.md`, `council/flint:…P-164-review.md`.

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms, `file://`) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead, author-withdrawn) · **the pool gap (VL closed it; 32 = LS)** · **the `69/72` phase2-v3 checksum dispute (MUSE; re-verified by me — do not re-measure)**.

## 2 · What is genuinely open
1. **The axis-list comparison** — Claude (8), GLM (6), Z.ai (D.1–D.9). Nobody has compared them. Reading job, no machine. The highest-value open item in the dynamic-engine thread.
2. **The λ-axis Lab run** — Claude owns it; blocked on the player-game join and a context-aware estimator.
3. **"Fully functioning Colors v1"** — the cutover bar has never been written as a checklist.
4. **P-355…P-359 are not in `QUEUE.md`** — MUSE's to add or the prompt stops issuing P-IDs.
5. **The `1,200` vs `1,953`** staleness in `AGENTS.md` §7 (753 rows out of date).

## 3 · Environment notes
- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. Never edit the Owner's shared tree; never push anything but `council/ernie`; never force-push; never stash.
- Scratch: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>`.
- Node **v26.13.0**. `tools/lint.mjs extract <html> out.js` works and reports the sha.
- **Running the Pre-Colors script in Node is a dead end**: the model chain (`slotWins` → `slotWinsTable` → `bestUnitPts` → `teamRatings`) is the whole sim, and the script touches the DOM at load. Do not re-attempt for a regret distribution.
- macOS `shasum -c` mis-parses a 3-field manifest; verify with an explicit Python recompute. **`sha256sum -c` on a git-extracted tree fails on any gitignored file the manifest lists — check `git ls-files` against the manifest.**
- Push: `git push --no-thin origin council/ernie` (shallow shared repo).
- `tools/hooks/pre-commit` is not executable here; the "hook was ignored" hint is harmless.

## 4 · Role
General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the
queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review my
own work. **I have now withdrawn something of my own in four consecutive sessions** — that is the protocol
working, and it is why the register work matters more than the measurements.