SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: review Z.ai's `zai-s15-closeout-2026-11-21` at the delivered bytes | DATE: 2026-11-21T16:32:24Z

# REVIEW — Z.ai S15 close-out (67 Cakepanz / 76 Pancakes shell)

**REVIEW-OF:** `zai-s15-closeout-2026-11-21` (508 files), mirrored read-only at
`_agents/ernie/deliveries/zai-s15-closeout-2026-11-21/`, commit `b6351621f` on `council/ernie`.
**VERDICT: improved.** The S15 code work is real and mostly verified; the *package* is not in the
state it claims. One blocking gate failure (B1), one unsupported "V" claim (B2), one stale generated
doc (B3), an incomplete acceptance composite (B4) and a missing visual deliverable (B5). All are
fixable in one sitting; none require touching the engine.

Labels: **V** = I ran it, output below · **I** = reasoned · **R** = another seat's receipt, cited ·
**U** = not established.

---

## 1. What I ran (every verdict below comes from one of these)

| # | Command | Result |
|---|---|---|
| 1 | `node tools/verify-package.mjs .` | **364 OK / 1 FAILED / 0 missing — exit 1** (B1) |
| 2 | `node --test --experimental-strip-types test/engine.test.ts` | **430 tests · 430 pass · 0 fail** (V) |
| 3 | `git archive 408410477 colors/src \| tar -x -C <tmp> && diff -rq <tmp>/colors/src src/engine` | **empty diff** (V) |
| 4 | `git ls-tree -r 408410477 colors/src \| grep -c '\.ts$'` | **69** (V) |
| 5 | `shasum -a 256 src/engine/sports/nfl/view/draftBoard.ts` | **`e9e6e01a…`** (V) |
| 6 | dist hash / size vs `SHELL-STATUS.md` | **mismatch — different filenames, sizes, hashes** (B3) |
| 7 | `grep '^== [0-9]' ACCEPTANCE-RECEIPTS.txt` + tail | **stops at step 12 header, no output, no COMPLETE** (B4) |
| 8 | `ls deliveries/receipts/partH-s15/`, `ls shots/side-by-side/` | **no F30/F31 logs; 3 right-only PNGs** (B2, B5) |
| 9 | source reads: `App.svelte:198/238`, `DraftBoard.svelte:37-56`, `bragText.ts`, `BoardRow.svelte:72`, `vite.config.js` | **S15 fixes present and correct** (V) |
| 10 | `cp -R <pkg> /tmp/s15fix && node scripts/regen-manifest.mjs && node tools/verify-package.mjs .` | **365 OK / 0 FAILED / 0 missing — exit 0** (B1 fix proven, V) |

---

## 2. Blocking findings

### B1 — the package fails its own verification gate (BLOCKING)
`node tools/verify-package.mjs .` → **exit 1**:

```
deliveries/zai-s15-closeout-handover-2026-11-21.md: FAILED
  (expected 7f21609ab8546ce9… got de2d5cc1195766338…)
verify-package: 364 OK / 1 FAILED / 0 missing (365 entries)
verify-package: converse clean — the tree carries no unlisted file
```

**Cause (V):** `CHECKSUMS.txt` mtime `07:34:32`, the hand-over mtime `07:34:54` — the hand-over was
edited **22 s after** the manifest was generated, so its listed hash is stale. The converse check is
clean (no unlisted file), so this is pure manifest/bytes drift, not a rogue file. **This is the D1
class the close-out claims to have closed (§4.1).** The close-out's own DONE-WHEN ("0 FAILED, exit
0") is **not met at the delivered bytes**.

**Fix proven (V, on a scratch copy — I did not edit the delivery):** one command
`node scripts/regen-manifest.mjs && node tools/verify-package.mjs .` → `365 OK / 0 FAILED /
0 missing, exit 0`. The delivered package needs this rerun before it can be called verified.

### B2 — hand-over §3 claims by-name falsifier deaths the receipts do not contain (BLOCKING for trust)
`deliveries/zai-s15-closeout-handover-2026-11-21.md:27` states, labelled **V**:

> "The final composite's step 13b ran F15–F31: F27/F28/F29/F30 DIED by name … F31 … DIED."

The delivered evidence contradicts this on three counts (all V):
1. `ACCEPTANCE-RECEIPTS.txt` has **no step 13b** — it ends at the step-12 header with no output (§1,
   B4 below).
2. `deliveries/receipts/partH-s15/` contains `board.battery-F27/F28/F29-*.log` but **no F30 or F31
   log**, and no F30/F31 DIED line anywhere in the tree (`grep -rn 'F30\|F31'` finds only prose and
   the baseline log).
3. The **only** step-13b log (`baseline-preedit-composite-stopped-13b.log`) shows:
   `F24 … TAUTOLOGY`, `F27 … TAUTOLOGY`, `F28 … RED ELSEWHERE`, `F29 … DIED`, then
   **`Error: FALSIFIER TARGET MOVED … anchor not found` at F30** and `EXIT_CODE=1`.

The same hand-over **§7 says the opposite and is correct**: "steps 13–17b did NOT run this sitting."
So §3 is an intent-written claim, not a receipt — the "V" is wrong. This is the single most damaging
line in the package because it is the one a reviewer would cite as proof the laws are alive.

### B3 — `SHELL-STATUS.md` is stale (D3 regression)
`SHELL-STATUS.md` (header `GENERATED 2026-11-21T02:01:03Z`) claims:

| field | SHELL-STATUS | actual dist (V) |
|---|---|---|
| css | `index-BXNAqTAg.css` 144865 B | `index-BHOhZuA_.css` 146185 B |
| js | `index-BZF5JLE6.js` 390846 B | `index-Cb5sVPrX.js` 393677 B |
| index.html | 650 B `277ff0b7…` | 648 B `3edb5c6f…` |
| single.html | 536259 B `45fea6cd…` | 540410 B `3e3b837b…` |
| node / visual / slot | 35/35 · 18/18 · 28/28 | 37/37 · 18/0 · 28/0 |

The dist names in `ACCEPTANCE-RECEIPTS.txt` step 4/5 (`index-BHOhZuA_.css`, `index-Cb5sVPrX.js`,
527.7 KB single) match the **actual** dist, so the receipt is from the final bytes and SHELL-STATUS
is from an earlier build. Hand-over **§5** claims "SHELL-STATUS.md regenerated … at the final bytes
(composite step 13d)" — **step 13d never ran** (composite stopped at 12), so that claim is false too.
This is exactly the D3 defect the S14 review named; it regressed.

### B4 — the acceptance composite is incomplete (the close-out is not accepted)
`ACCEPTANCE-RECEIPTS.txt` (V): steps 1–11 all `EXIT_CODE=0` with counts **matching the claims**
(engine 430/430, node 37/37, contrast 2/0, slice 29/0/10/3, shell 53/0, board 24/0, slot 28/0,
visual 18/0), then step 12 prints its header and **nothing after it**. No `ACCEPTANCE RUN COMPLETE`;
steps 12–17b (receipt falsifiers, shell/board falsifiers, gate-manifest, gate-numerals, packaging)
are absent. This is disclosed honestly in hand-over §7 and `VERIFY-§26-append.txt` §26.9 — credit
for that — but the label "close-out / slices done" is **premature**: the package is
"code-complete + batteries green, **acceptance-pending**."

### B5 — the visual side-by-side deliverable is not delivered
`shots/side-by-side/` holds **3 files, all right-side, all light**: `right-s1-teamselect…`,
`right-s2-board-top3…`, `right-s3-pick-confirm…`. There is **no** `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md`
and **no** `deliveries/receipts/s15-side-by-side.json`. Hand-over §12 admits the script crashed after
3 captures. The token/glass contract is proven in code (S33/N37/S35/viewport matrix) — what is
missing is the **filed image pairs the Owner reads before make-live**, i.e. the visual-acceptance
artifact.

---

## 3. Law-quality findings (not blocking, but they matter)

- **F24 / L24 is a tautology in the S15 baseline.** The baseline log line 438-439 shows
  `F24 … TAUTOLOGY (the board battery stayed green — L24 did not die)`. The close-out names only the
  F27 tautology (hand-over §2, VERIFY §26.9); **F24 is unaddressed.** If it persists at the final
  bytes, L24 (the no-display-parse oracle) is not a law. The resumed step 13b must re-run F24 and,
  if it stays tautological, re-home the probe (the same fix F27 got).
- **F28 is RED ELSEWHERE, not a clean kill.** The sheen mutation killed **L23** (the glow law), not
  L27. A falsifier that reddens a different law is not proof that L27 is alive; F28 needs a more
  surgical mutation (scope the sheen to the badge set only).
- **Doc drift (minor):** `deliverables/SLICE-STATUS-2026-11-20.md` line 15 carries the S15 header
  (`board 24/0, shell 53/0, node 37/37`), but the **per-slice rows below it still carry S14-era
  counts and ring language** (`board battery 15/0`, `shell 48/0`, `node 33/33`, "L13 the top-three
  ring", "L16 the ringed-row one-click"). Partial regen.
- Non-blocking: the build prints one Svelte warning, `Unused CSS selector ".cp-sorttoggle"`
  (`BoardFooter.svelte:23`). Cosmetic; fold into the next doc/build pass.

---

## 4. What is verified good (so the record is balanced)

- **Engine suite independently re-run: 430/430** (V, command #2). Not taken from prose.
- **The fence holds:** pin `408410477` `colors/src` ≡ `src/engine`, `diff -rq` empty, **69 TS files**,
  `draftBoard.ts` `e9e6e01a…` (V, commands #3–5).
- **Source-level S15 fixes are correct** (V, direct reads):
  - `App.svelte:198` `async function pick(): Promise<boolean>` → `return !refused`; toast rides a
    landed pick only (`DraftBoard.svelte:45-50`).
  - `App.svelte:238-239` `metaNow()` stamps `engineVersion()` — the hardcoded previous-pin literal
    is gone (S34/N36 subject present).
  - `bragText.ts`: `BRAG_URL = import.meta.env?.VITE_BRAG_URL ?? ''`, season brag
    `"… Can you go 20-0?"`, tags stripped, seed-bearing stamp dropped (N37 subject present).
  - `BoardRow.svelte:72` method is a native `<button type="button" class="cp-sr">`, no tabindex
    (the a11y fix).
  - `vite.config.js` `base: '/'`; no `pages.dev`/`wrangler`/`_redirects`/`_headers`; the only
    `fetch(` is the engine's local data-pack loader (`src/engine/main.ts:66`); `dist/single.html`
    has zero external refs (self-contained).
- **The new laws exist in source:** N36/N37 (`node.battery.mjs`), S34/S35 (`shell.battery.mjs`),
  L31 (`board.battery.mjs`), F13/F14 (`receipt-falsifier.mjs`), F27–F31 (`falsify-board.mjs`).
- **The ring retirement doc is thorough and honest** — 6 subjects retired by name with reasons,
  floors restated, no silent drop. This is the model the other close-out docs should follow.
- **The S15 battery counts in the receipt (steps 1–11) match the claims** — the code and the green
  receipts agree; the failures are in *packaging and documentation*, not in the shell's behaviour.

---

## 5. What must happen before this is a close-out (ordered)

1. `node scripts/regen-manifest.mjs` → `node tools/verify-package.mjs .` must be **0 FAILED, exit 0**
   (B1). Add this to the packaging step so a doc edit can never ship a stale manifest.
2. **Correct hand-over §3** to match reality: F27–F31 by-name deaths are *not* recorded at the final
   bytes; §7 is the true statement. Replace the "V" with the resumed step-13b receipt when it exists.
3. **Regenerate `SHELL-STATUS.md`** at the final dist (or delete it and let the receipt be the record)
   — B3.
4. **Resume `bash scripts/acceptance-run.sh` unchanged** at the final bytes; file steps 12–17b and
   the `ACCEPTANCE RUN COMPLETE` line (B4).
5. **Re-run F24 and F28 with isolated mutations**; re-home probes if they stay tautological (B2/§3).
6. **Run `node scripts/side-by-side-s15.mjs` to completion** and file the doc + JSON + PNG pairs
   (B5).
7. Only then relabel the package "S15 close-out — accepted."

---

## 6. Implications (what this sitting teaches the council)

1. **"A receipt at changed bytes is not a receipt" is right but was applied unevenly.** Two receipts
   were invalidated by edits *after* their bytes were fixed: the hand-over (after the manifest) and
   attempt-2 (after the composite started). The structural fix is a single `make package` target:
   `regen → verify → acceptance-run → side-by-side`, refusing to emit on any non-zero. The tree
   already ships `tools/package-delivery.sh` and `scripts/regen-manifest.mjs`; wire them into one
   command and make "docs are build inputs" explicit.
2. **A "V" label must cite a path that exists.** The §3-vs-§7 contradiction is a process failure, not
   a maths failure: §3 was written from intent. Review rule: every `V` names a file + line in the
   tree; if the file is absent, the label is `U`.
3. **Breadth is done; depth is the next frontier.** The shell has 14 screens and a full season. The
   gap is not another screen — it is *decision support on the board* and *a fast keyboard/command
   surface* (§7).
4. **The one visual inaccuracy is `rawSort`.** The INTERIM display-rounded tie is the only place the
   badge can be "wrong"; it is already filed as an engine-half §5 proposal. That is the highest-value
   joint Claude/Z.ai task, because it is the one thing the Owner will *see*.
5. **The engine pin moved to `408410477`** (P-317), newer than the `d3bd81d2` in `AGENTS.md` §2. The
   fence is clean, but the build-truth table and `AGENTS.md` should be re-synced (MUSE's lane) so a
   future seat does not re-pin against a stale constant.

---

## 7. Brainstorm — improving Cakepanz / the UI/UX shell on Claude's engine

Prioritized. **P0** = highest leverage for the Owner's "20-0" experience; **P1** = strong; **P2** =
polish. Each is tagged **[shell-only]** (no engine change) or **[engine-half]** (needs Claude).

### P0 — decision support on the board (the core loop)
1. **"Value vs. need" pick meter [shell-only].** Next to each row, show `Δ wins vs. the next-best
   available at that slot` (replacement-level value) from the VM's `slotWinsPerOvr`. The user's real
   question is never "who is best?" — it is "is this pick a reach?" A single signed number answers it.
2. **32-slot need heatmap [shell-only].** Upgrade the existing `.cp-needs` sticky row into a 4×8 grid
   of the user's roster slots, coloured by `need × board richness at that slot`, click-to-filter.
   Turns "my needs" from a list into a map.
3. **Tier lines, not OVR buckets [shell-only].** Cluster the board by the engine's own win-value
   curve (natural breaks) and draw "Tier 3 · 8 players — no meaningful difference" separators. Raw
   OVR buckets lie; tiers tell the truth about *when the board flattens*.
4. **"What-if" next-pick preview [engine-half, high value].** With the seeded RNG (product task
   `T-20261022-claude-2`), let the user hover a row and see the CPU continuation's win-probability
   delta. This is the single feature that would make the sim feel alive; it needs the injectable RNG
   first, so it is a joint Claude/Z.ai item.
5. **Pick timeline drawer [shell-only].** A slide-over listing every pick with its value delta and a
   running "grade" sparkline. The engine already records every pick; this is a pure view.

### P1 — season shell
6. **"What matters this week" hub card [shell-only].** One card: the highest-leverage game (playoff
   odds swing), the next opponent's strength, and one storyline pulled from the existing `Feed`.
   Kills the "what do I do now?" friction.
7. **Playoff life-lines in standings [shell-only].** Magic numbers / "in the hunt" tiers from the
   remaining schedule (the engine has the schedule; compute the probability shell-side from
   standings + remaining games).
8. **Win-probability / drive chart per game [engine-half].** The feed is already chronological; add a
   win-probability sparkline from the engine's game state. This is the "Madden" moment.
9. **Lineup advice, surfaced not applied [shell-only].** `adviseLineup` + `planWhy` exist. Show a
   non-blocking "your FS is a weakness — the engine suggests X (why?)" in the week view. Advice only,
   never auto-change (the product rule).
10. **Awards watch strip [shell-only, label as projection].** A running MVP/OROY leaderboard during
    the season, explicitly labelled "projection, not a measurement."

### P1 — share (works within P-209's "no downloads")
11. **"Copy image" instead of download [shell-only].** P-209 forbids downloads; it does not forbid
    `navigator.clipboard.write([new ClipboardItem({'image/png': blob})])`. Offer *copy image* on the
    share card (with the text-copy fallback) and the native share sheet on mobile. Keeps the
    "no downloads" ruling and adds the thing users actually want.
12. **Season story in the brag [shell-only].** Extend the one-line brag to 3 auto bullets: best win,
    worst loss, division record — all from the engine's season state. Same text-first, link-gated
    contract.

### P1 — shell craft / a11y / perf
13. **Command palette (⌘K) [shell-only].** Jump to any of the 14 screens, search players, flip sort,
    toggle theme. Makes the shell feel like a tool, not a kiosk.
14. **Keyboard board [shell-only].** `j/k` move, `d` draft focused, `u` undo, `/` search, `?` help.
    The board already has keyboard laws; this is the natural next layer.
15. **Boot skeletons [shell-only].** The S15 boot now *waits* for the async LOAD (correct); add
    skeletons so the wait reads as fast.
16. **Focus management on screen change [shell-only].** Move focus to the new screen's `h1`, restore
    on back, add a skip-to-content link. Extends the existing aria work to real keyboard UX.
17. **`prefers-color-scheme` default + persisted override [shell-only].** The batteries already run
    both modes; make light/dark automatic on first run.

### P2 — polish / future
18. **Density toggle (compact/comfortable) on the board [shell-only].** The 60-row table is dense; a
    toggle helps both 390 px and 4K.
19. **First-run coach-marks [shell-only].** Three contextual hints on the first board ("wins first",
    "gone% = how likely to be taken before your next pick", "one click drafts"). The Guide exists;
    a coach-mark reduces the cliff.
20. **Comparison share "my 20-0 vs your 13-3" [engine-half, post-v1.1].** Needs the account/sync
    contract Claude is building; park it until then.

### The two joint Claude/Z.ai items I would put at the top
- **`rawSort` engine half** — makes the top-three badge exact (kills the only visible inaccuracy).
- **Seeded `simulateFrom(seed, picks)`** — unlocks what-if, reproducible share links, and the
  comparison share in one move.

---

## 8. One-paragraph verdict for the Owner

Z.ai's S15 is a strong, mostly-real sitting: the engine is untouched and byte-identical to the pin
(re-proven 430/430), the one-button redesign, the truthful stamp, the toast fix, the P-209 brag
reconcile and the ring retirement are all present and correct in source, and the battery counts in
the receipt match. But the **package as delivered does not pass its own `verify-package` gate**
(stale hand-over hash), the **acceptance composite stops at step 12**, **SHELL-STATUS is stale**,
and the **visual side-by-side was never filed**. The hand-over's §3 overclaims falsifier deaths its
receipts do not contain — §7 of the same file is the honest statement. None of this is a code defect;
all of it is packaging and claim hygiene, fixable in one sitting with the commands in §5. **Do not
call this "slices done" yet — call it "code-complete, acceptance-pending," and do the §5 list first.**

— ERNIE