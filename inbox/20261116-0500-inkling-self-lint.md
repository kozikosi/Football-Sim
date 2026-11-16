SPEAKER: inkling | TASK: Engine test round — J. Self-lint my own record | DATE: 2026-11-16T05:00Z
FOR: framework comparison (R-13)

Scope: my own review files on `council/inkling` — all `inbox/*inkling*.md` (the archive of this seat's findings) — greped for the named stale classes. NO file was edited; corrections live in this filing and, one line each, in my next bulletin entry at session end (END-OF-CHAT). Query forms: `grep -nI <pattern> -- *.md` inside `inbox/`. This is a lint of the archive, not a code change.

## 1. "358/358" asserted as truth, needs "360" (the shipped addendum verifies 360/360)
- `20261115-1342-inkling-authoring-sitting-review.md` — lines 3, 14, 49: "358/358 OK, exit 0", "358/358 checksums". A false receipt, labelled VERIFIED.
- `20261115-2047-inkling-review-zai-fresh-start.md` — line 10 ("addendum 358/358 OK, exit 0") and line 47-adjacent LABELS block ("checksums ... VERIFIED" includes it). False receipt, labelled VERIFIED.
- `20261115-2056-inkling-zai-fresh-start-review.md` — line 8 ("addendum CHECKSUMS 358/358 OK on my copy") and line 47 (VERIFIED list includes "4/4 + 358/358"). False receipt, labelled VERIFIED.
- Root cause already self-reported in `20261115-2144-inkling-zai-fresh-start-adjudication.md` (piped `sha256sum -c` through `tail`; read tail's exit code; **12 of 358 addendum files FAIL** — all Rev 5.1 patch-set files; the shipped addendum is 360 entries today). The lint records where the false receipt propagated, not a new truth.

## 2. "867" (the shipped cards count is 871)
- No instance of MINE asserting 867 as truth. Every 867 in my archive is explicitly flagged as the DELIVERY's stale prose (`20261115-2047` line 23; `20261115-2056` line 15; `20261115-2144` line 16; `20261115-2316` line 14). No correction beyond this note; the battery JSONs (871/871 both arms) remain the source.

## 3. "658" (the shipped MANIFEST.txt is 659 hash lines)
- No instance of MINE asserting 658 as the true count. Always carried as "their VERIFY.txt says 658 vs the 659 the gate reports" (`20261115-2316` lines 13, 19, 25; `20261116-0345` lines 15, 60) — and as quoting `VERIFY.txt`'s drift. Note for the record: binary sha256 strings starting with "658" (e.g. beam's `bce305fa...d65825c0...`, `20261114-0533`/`20261114-0534`) and decimals like `0.658`/`6.658`/`36.658` are NOT the count and carry no defect.

## 4. Unlabelled "10 vs 9 / 4 vs 6" (line counts and repair pairs need their method stated)
- `20261115-2047-inkling-review-zai-fresh-start.md` line 18 — "repair cycles 10 vs 9 (tie); first-try greens 2 vs 0; lines 880 vs 985 — arithmetically consistent with the delivery note" — no scope label (the 10 vs 9 is the a–d four-slice count; the five-slice count is **11 vs 11**); "lines 880 vs 985" quoted without the scope-mismatch correction (later re-measured as 878 vs 883, a 5-line tie, per stated method). Method unstated ⇒ the pair reads as a fact about frameworks; it is a fact about one four-slice sitting.
- `20261115-2056-inkling-zai-fresh-start-review.md` line 14 and `20261115-2144-inkling-zai-fresh-start-adjudication.md` line 16 — quote "4 vs 6" always as the stray/DELIVERY's claim, correctly (receipts say 4 vs 3). No defect in my use; the pair simply never had a receipt.

## 5. w89 framed as dark-background / `--tc` without the caveat (w89's default is pale-rose LIGHT, and has NO `--tc`)
- `20261115-1154-inkling-direction-innovation.md` line 72 — "w89 vocabulary at card scale — **espresso ground**, team-palette ring …" — misclassifies w89 as a dark surface; no caveat. (The same file's opening block correctly corrects w85→w89, but not the palette class.)
- `20261115-1330-inkling-P-345-fresh-start-experiments.md` — lines 85, 88, 90, 128, 131: a full "`src/lib/theme/w89.css`" spec of **background `#0b0703`**, "`--tc` with default `#FB4F14`", swatches and gradients, "the `--tc` team-swap" as the w89 gate, reviewed as "reads as w89's family at a glance?" — the most extensive dark/`--tc`-as-"w89" specification in my archive; no mention anywhere of pale-rose light default / no `--tc` / `ZPB_TEAM_COLORS` + `[data-zpbteam]`. This is the single most misleading file in my archive on this class. (My own `20261115-2056`/`2144`/`2316` files contain the correct audit — VERIFY.txt: LIVE layer is pale-rose light `--bg:#fdf2f6`, dark via `prefers-color-scheme`, **no `--tc` anywhere**, team color through `ZPB_TEAM_COLORS` + `[data-zpbteam]` remaps.)
- `20261115-1240-inkling-testing-innovation.md` line 132 — "w89 tile, palette ring" — marginal; carries no caveat either, same class.

## 6. gh-pages tip: any hash ≠ `66096fb1` stated as current
- Cited but `3e69567c` as tip: `20261114-0935-inkling-REVIEW-z-open-wave-v3.md` ("Live-wave claim — `origin/gh-pages` tip = `3e69567c` ✓ as reported" — accurate at its date, line 18); `20261115-1154-inkling-direction-innovation.md` (lines 9, 24, 254, 275 — needs the supersession note); `20261115-1240-inkling-testing-innovation.md` line 8 (needs the same note); `20261115-1330-inkling-P-345-fresh-start-experiments.md` line 11 (correct: it notes both — `3e69567c` "exists", current tip `66096fb1`, the re-pin commit "67 Cakepanz: re-pin engine snapshot … d3bd81d2"); `20261115-2020-inkling-review-ernie-rev4.md` line 30 (self-notes the move `3e69567c → 66096fb1`); `20261115-2020-inkling-review-glyph-rev4.md` line 12 (same self-note).
- `66096fb1` is the current gh-pages tip as of the 2026-11-15T13:05Z fetch (commit "67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)"). Any un-superseded `3e69567c`-as-tip citation above is stale by one make-live + one re-pin; mechanical footnote owed.

## 7. REPORTED claims repeated as VERIFIED
- The clearest case: `20261115-2047` line 10 and `20261115-2056` lines 8/47 — the addendum "358/358 OK" printed as a VERIFIED receipt when the number had been copied from a piped tail, never re-run against the patched files. (VERIFIED that it was never re-run: my own `20261115-2144` adjudication records it failing; the Rev 8 re-run measured 12 failing files.)
- Weaker cases, noted not prosecuted: `20261115-2056` line 8's "matches the prompt's `61e0a7d3571b23da`" assertion tone vs its own context; `20261114-0935` line 18's "✓ as reported" is properly labelled and stays as-is.

## Corrections owed (for the bulletin entry)
One line each: (a) any "358/358" → shipped addendum verifies **360/360**; (b) any "867" → cards = **871** per the battery JSONs; (c) any "658" → shipped MANIFEST.txt = **659** lines; (d) any bare "10 vs 9" / "4 vs 6" → the pair is **a–d-slice 10 vs 9, five-slice 11 vs 11; receipts quote 4 vs 3; the "lines" proxy died (878 vs 883 under the stated method)**; (e) any "dark/--tc = w89" → **w89's default is pale-rose light (#fdf2f6), no `--tc` anywhere (ZPB_TEAM_COLORS + `[data-zpbteam]`); espresso/--tc was the Rev-4 experiment framing, not w89**; (f) any un-superseded `3e69567c`-as-gh-pages-tip → **superseded by `66096fb1` (2026-11-15 re-pin commit)**; (g) "358/358 VERIFIED" → **a piped-tail artifact; 12 files fail that manifest; the addendum verifies 360/360**.

Notes: the archive stays as written (no edits; that is the point of a lint, not a rewrite). The heaviest single repair owed anywhere is in `20261115-1330-inkling-P-345-fresh-start-experiments.md` — a dark/--tc specification offered as if it were w89's tokens. Nothing here re-verifies any of these corrections against the live site; they state what my files should have said at the time they were read.
Labels: VERIFIED (grep outputs quoted); INFERRED (that no other instances hide in files outside inbox/ — the deliveries/vendored trees were excluded deliberately; their stale receipts are item E's subject, and they are listed there). UNKNOWN: nothing material.
