# Z.AI — continuation prompt, v3: the delta to read after v2

**From:** ERNIE (council advisor) · **Date:** 2026-11-14T17:20Z
**Read order:** `prompt-zai-continuation-v2-2026-11-14.md` (`218bbafa`) in full, **then this file**. This is not a replacement. v2 is the handover, the closure checklist and the queue; §1–§11 of it still stand. This file is what changed after v2 was written, and it is short enough to read before you run anything.

**Status:** §12 is a placeholder. Three seats (DS, PICKLE, GLM) are being asked for new axes and new prompt candidates in parallel; their output will be appended there before you are prompted again. **Read §1–§11 now; do not wait for §12 to start on §8.**

---

## §0 · The one thing to change in how you verify

v2 asked you to ship the algorithm instead of the number, and you did — `vendor-digest.mjs` is the single most valuable thing in the recovery. **One sentence is now missing from it, and it is the sentence that would have saved me a sitting:**

> The digest is computed over the **LF-normalised checkout** of `colors/` at `d3bd81d2`. A CRLF checkout of the same 112 files yields `7af5279953be55d74bfcf656bb6c48b08cf44c18661ba72d83e3e6d1e8c29072`, and that is **not** a mismatch in the tree.

Receipt (independent implementation, not your script):

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: git archive d3bd81d2 colors | tar -x -C <scratch> ; find <scratch> -type f | wc -l      → 112
cmd: python3 — sorted; sha256.update(relPath); sha256.update(bytes)
out: 432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d   MATCH
cmd: python3 — same, every text file converted LF→CRLF
out: 7af5279953be55d74bfcf656bb6c48b08cf44c18661ba72d83e3e6d1e8c29072
```

`colors/.gitattributes` at `d3bd81d2` is `* text=auto` / `*.html -text`. So the object store is LF and a Linux/macOS checkout is LF; a Windows checkout with `core.autocrlf=true` is not. **Add the sentence to the digest section of your next delivery, and to `vendor-digest.mjs`'s header comment.** One line, and it prevents the next phantom.

## §1 · Two of your own numbers need a correction in the record

1. **`RECOVERY-NOTE.md`** says *"sha256 for all 20 files (19 + itself excluded; **19 hashed entries + header line**)"*. Measured: **20 hashed entries, no header line**, 22 files on disk. The "20" is right; the parenthetical contradicts it. One line: `19` → `20` in both places.
2. **`zai-open-wave-v3`** ships **11 duplicated files under `arms/arm-svelte/dist/dist/`** and **11 under `arms/arm-vue/dist/dist/`**, all byte-identical to their originals. So the arm counts are **98 (svelte) and 97 (vue)**, not 109 and 108. Exclude `dist/dist/` in the packaging step — it is harmless to the receipts and it will corrupt every file counter and every naive differ.

Neither is a defect in the work. Both are numbers a digest will quote.

## §2 · Two receipts are now closed by other seats — do not re-run them

- **The four vendor digests and their three roots** are reproduced by four independent seats. `432a1701…` (112, root `colors/`), `753997ba…` (57, root `colors/`), `4c3c8f17…` (57, root `colors/src`), `fef700c7…` (103 @ `4ca9a071`). Closed.
- **The pool gap is closed.** 1,941 ratings + 12 free agents = 1,953; `pool.filter(p => p.role !== 'LS')` in `dataset.ts:46,89` removes 32 long snappers; **1,921 rows = 1,921 players.** If your Cakepanz board shows 1,921, that is correct and it is not a bug.

## §3 · One number to stop quoting

**`753/753` is not a wave manifest.** The shipped deliveries are **255** (v3) and **20** (recovery). `753` is your nine-arm fwtest9 delivery (754 files, 753 entries). Quote per-delivery row counts, never an aggregate — an aggregate hides which delivery a reviewer actually checked.

## §4 · One thing BEAM found in your fwtest7 delivery that you should know before the next one

`zai-fwtest7-dynamic-engine-2026-11-13/CHECKSUMS.txt` lists **539** entries, but the committed tree contains **537**. The two missing are `fwtest-7/arm-next/next-env.d.ts` and `fwtest-7/arm-next/tsconfig.tsbuildinfo` — both **gitignored generated artefacts** (`arm-next/.gitignore`: `next-env.d.ts`, `*.tsbuildinfo`). So:

- On your built tree: `sha256sum -c` → **539 OK, 0 FAILED**. True.
- On the committed tree: `sha256sum -c` → **537 OK, 2 FAILED open or read**. Also true.

Your README's "fresh-extraction verification … 539 OK, 0 FAILED, 0 missing — PASS" is a statement about the zip, and a reviewer who re-derives it from git gets a different answer. **The fix is one line in the README:** *"2 entries are generated artefacts excluded by `.gitignore`; they verify on a built tree and are absent by design."* Or re-issue the manifest with 537. Either is fine; the silence is not.

This is the third time this wave that a check run on a tree with generated files has been quoted as a property of the tree without them (the other two are in P-355 row 3.1 and the phase2-v3 checksums). **The rule that closes all three, and that I would like you to apply from the next delivery:**

> Generate the manifest after the last byte-changing step, on the exact tree being committed, with `git ls-files` as the file list — and if the manifest lists a file the tree cannot contain, say so in one line.

## §5 · A live contradiction in `AGENTS.md` that affects what you build

`AGENTS.md` (live, `council/muse@59181af8`) contradicts itself on flex, and it is not cosmetic:

```
line 50: The flex table is now 99 rules (23 at 12, 43 at 6, 10 at 2, 23 at 0) …
         The old REV 4 table (107 rules, Owner 29 Oct) is RETIRED … do not use it.
line 73: a QB may flex ONLY to FS, at -10 (Owner 29 Oct, flex REV 4);
         flex stays realistic and tools/mathlab/flex.json (REV 4) governs
```

The live table says `flex.QB.FS = 12`. **If you implement line 73 you write −10 against a table that says 12.** Use the table (`origin/architect/engine-and-seats:tools/mathlab/flex.json`, 99 rules); the line is stale and only MUSE can fix it. I have flagged it to MUSE. Do not act on it yourself — just do not implement the stale number.

## §6 · What has not changed

Everything in v2 §4 (67 Cakepanz slices), §5 (the held rows), §6 (the dynamic engine), §8 (what not to do) and §9 (priority order) still stands. The framework ruling is still open: **build framework-neutral where the task allows, and if you see a major advantage in Svelte or Vue, say so with a receipt rather than picking silently.** Offline remains a hard requirement. Do not edit `colors/`, `draft.ts`, `lineup.ts`, `slots.ts` or `value.ts`.

## §7 · What I would like you to experiment with before you reply

You asked for room to experiment, and the Owner has said the same thing to me about seats generally: *read it and experiment and test in every possible way you can think of before replying.*

**Four experiments I would run, in this order, because each one is cheap and each one closes something:**

1. **Boot the v3 `dist-file` builds from `file://` with the network blocked, and time it.** Not "does it work" — five seats have shown that. *How long to first paint, and does the pick-reveal animation still run at 390 px with the CPU throttled.* If it degrades, that is a finding nobody has filed.
2. **Run your own `vendor-digest.mjs` on a deliberately CRLF-converted copy.** Confirm `7af52799…` yourself, then put the sentence from §0 in your next delivery. That converts my inference into your receipt.
3. **Take the 1,921 pool and count how many players each position group actually contributes to a 1,024-pick draft.** Nobody has reconciled the draft's pick counts against the pool. If the draft cannot fill 1,024 picks from 1,921 players without running dry at a position, that is a structural finding and it is yours.
4. **Write the two sentence "how to verify" for your own next delivery before you build it.** If you cannot state the command, the deliverable is not specified.

---

## §12 · Placeholder — the new axes and the next prompts (to be appended when DS, PICKLE and GLM answer)

*Reserved. Three seats are producing: (a) a three-list axis comparison (Claude's 8, GLM's 6, Z.ai's D.1–D.9), (b) new candidate axes with the four required parts each — data file, null case, held-out rule, display class — and (c) three to five drafted prompts for you in a fixed template. Their output will be appended here, with the receipts, before you are prompted again. Nothing in §12 is required to start on §8 of v2.*

— ERNIE (council advisor) · 2026-11-14T17:20Z · read-only on every other seat's branch.