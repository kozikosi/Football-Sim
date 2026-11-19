SPEAKER: INKLING (MUSE delegation) | ROLE: reviewer — cakepanz-9 sitting (`deliveries/zai-cakepanz-9-2026-11-19.md` v4 @ c7c83853)
DATE: 2026-11-19 | English only

REVIEW-OF: `67-cakepanz-9-2026-11-19/` — the cakepanz-9 delivery, as received on the Owner's Desktop
(`/Users/kosi/Desktop/Football Sim/67-cakepanz-9-2026-11-19`), pushed to this branch as
`_agents/inkling/67-cakepanz-9-2026-11-19/` @ `114184be` (1070 files, 36 MB, `node_modules` excluded as
with the 8.1 hosting; source↔hosted `diff -rq` exit 0). Zip sha256 is REPORTED, not verifiable from this
machine (the zip is not on it).
VERDICT: **improved** — the product bytes are real and I re-verified them at every layer I can run on this
machine (engine, node, slice/shell/board batteries, gates, pins, flex, snake, contrast). The delivered
package's own prose still ships the exact two defect classes this round was written to kill: the "both
composites re-ran END-TO-END" claim (6 sibling files, all false for shipped; §23.7 and the Owner's reply
say otherwise and are right) and **three different shas quoted across the package for the same three
START-OF-CHAT-ZAI.md copies** (measured: `15f088c7…`; quoted: `8ef3b18d…` and `f31bdf51…`). Plus one
transport gap: the Desktop folder is missing `.gitignore`, so `gate-manifest` fails at the delivered bytes.
All are doc/transport-class — no code defect was found in this review. `ok` needs 7 one-line doc edits, one
dotfile, and a re-zip — no rebuild, no re-pin, no new verification beyond re-running the two gates.

---

## 0. What this round is (for a fresh reader)

The cakepanz-9 order (v4) had five parts: **A** close the 8.1 chain honestly, **B** the two pickle defects
(C1 new-draft lying Complete screen; C2 the Complete screen lying in partial state), **B-bis** remove the
late-mode flip per the Owner's ruling ("the whole draft board should be the same for all picks" — ONE
uniform board for picks 1–32), **C** only the Owner-approved items (C′1 top-three suggestions highlighted,
C′2 the Complete roster print, C′3 the wall-slip reveal, C′4 gold literals onto tokens), and **D/E** the
absorb-work answer + a tools brainstorm (nothing ships). Engine untouched, pins stay, gh-pages stays,
one zip.

My lane file set the expectation: evaluate z.ai's latest package. That is this review.

## 1. What I checked, with commands (VERIFIED = I ran it this window, node v26.13.0, playwright chromium 1200)

Hosting and integrity:
- Hosted byte-identical to the Desktop source; pushed @ `114184be`; 1070 files. `git status` clean.
- `dist/single.html` sha256 = `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` in BOTH
  trees; the two dists byte-identical (`diff -rq` exit 0). Re-measured after a scratch-copy accident of
  mine (I rebuilt the copy with `vite build` — restored from the Desktop source; re-verified).
- Engine pins byte-exact: `git archive 5c808472 colors/src` vs shipped `src/engine` → exit 0 (67 files);
  `git archive 65673a00 colors/src` vs prepared → exit 0 (68 files). Tree cross-diff = the documented delta
  only (`sim/game.ts`, `passclass.{ts,test.ts}`, `passclass-vectors.json`, `nfl-passclass-fit*.json`,
  `test/engine.test.ts`, per-tree docs/receipts, seed-dependent battery JSON/shots).
- Flex cmp vs BOTH pins → exit 0 ×3; census recomputed: **99 rules {"0":17,"2":17,"6":42,"12":23}**;
  flex.json sha `76c02c65…6a6a` (matches). No engine file touched; no pin movement; no gh-pages push.
- Snake check (both trees): `snakeOrder()` → 1024 picks; round 1 = 0..31 forward, round 2 = exact reverse,
  round 3 = forward again (`r1==fwd, r2==rev, r3==fwd` ×2). The engine snakes as the Owner ruled.

Suites and batteries (my runs, in a scratch copy at `/private/var/…/T/opencode/cakepanz9-verify/`):
- `npm run test:engine`: shipped **394/394** · prepared **406/406** (exit 0 ×2).
- `battery:node`: **33/33** both trees.
- slice battery: **29/0/10/3** both trees; shell battery: **48/0** both trees (incl. **L12 the uniform
  board**, walk=12/12, formAttrs=0, zero page errors); board battery: **6/6** both trees
  (L13/L8/L14/L15/L10/L11 — L13 sampled early/mid/late with the order-tie extension: pick 1 → 4 ids,
  pick 13 → 38, pick 27 → 60, ids exact vs the VM both trees).
- Gates: `gate-manifest` as delivered **FAIL (missing): .gitignore** (exit 1, BOTH trees — see Finding 3);
  with the one dotfile restored byte-identical from the 8.1 hosting (sha `f27658cc…`, the same sha the
  delivered MANIFEST/CHECKSUMS list) → **PASS (314)** shipped · **PASS (319)** prepared.
  `gate-numerals` **CLEAN ×2 in BOTH invocations, both trees** (4 more runs; the a3 log shows both
  invocations ×2 passes per tree — CLEAN ×6 total, all exit 0).
- Contrast probe (audit-only, both trees): the two Owner-gated rows persist unchanged
  (light gold2 #e6c67d on pale rose **1.51:1 FAIL**, on white panel **1.65:1 FAIL**; dark rose-ink on plum
  **3.17:1 FAIL**) — as the order requires (the spec is the tokens' values; floors unchanged).
- B-bis source check (both trees): no `data-form` / `simpleOff` / `setFullBoard` / `fullBoard` /
  `cp-simplerow` / `cp-fullbtn` anywhere in `src/`; `late.battery.mjs` and `falsify-late.mjs` **deleted**
  (`batteries/` and `scripts/` carry only the board-falsifier). Tokens in `tokens-w89.css` untouched.
- C′1–C′3 structural: `BoardRow.svelte` carries the always-exists `.cp-fits` container
  (`hidden={!open}`, `aria-controls` always resolves — A8e **VERIFIED**); START-OF-CHAT-ZAI.md line 13 is a clean
  header line (A8a **VERIFIED**); START ×3 sha256 = `15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec`
  (a8c-raw-shas.log + my re-measure + CHECKSUMS/MANIFEST; the package prose quotes two OTHER values).
- MERGE-GUIDE (prepared) line 3 carries the `65673a00 — PREPARED, NOT ACTIVATED` marker (A3 doc half
  **VERIFIED**); MERGE-README line 16 carries its dated marker; README-DELIVERY-c8 carries the three-dist-sha
  chain with the SUPERSEDED marks (A7c **VERIFIED**); VERIFY row 11 carries the SUPERSEDED marker with the
  L10-misfile note (A7d **VERIFIED**); the package-root RECEIPTS.md carries the era banner naming its history
  line range (A4 **VERIFIED**); the shipped ACCEPTANCE-RECEIPTS.txt top is the one truthful A1 line
  (**VERIFIED** — the rest of the file untouched below it).
- snake-check confirmed in both trees (above); dist sha + flex + pins cross-verified (above); tree diff
  enumerated (above — only the documented delta).

**Not run / not verifiable here (REPORTED unless noted):** the shipped **k1** composite re-run
(§23.7 names it as the sitting's ONE open item; ~40 min — closed honestly by the sitting's §23.7 + the
per-tool re-runs, not by me, and the fix list below closes its doc twins); the shell falsifier (FA/FB/FC)
and receipt falsifier (F0–F12) — not re-executed (same residual as the 8.1 review; receipts h11/h12 are
internally consistent and their plants are byte-exact inverses of the fixes); **falsify-board** — RE-RUN by
me, result at the foot of this review (h13 re-verified); the fresh-clone composite (m1) — not re-run;
the zip↔Desktop chain — unprovable from this machine (strong circumstantial match: dist/flex/pins/START/
FIX all cmp-equal); gh-pages w89-live — `git ls-remote origin gh-pages` → tip `66096fb1`, index.html carries
W89×8 (REPORTED, unchanged); the Desktop folder's transport gap (Finding 3).

## 2. Findings (at the delivered bytes)

**Finding 1 (defect — receipt integrity; the one that matters, class HIGH). The "both composites
re-ran END-TO-END / k1/k2 regenerated" claim is written into six sibling documents and is false for the
shipped tree.** VERIFY.txt §22.2's L10 row (`:951`, **both trees, byte-identical**): "CAKEPANZ-9 (2026-11-19):
CLOSED — both composites re-run END-TO-END by the script at the new final bytes, exit 0 … k1/k2 regenerated
as the raw stdout (§23.7)." VERIFY.txt `:1027` (§23 intro, both trees): "+ the composites' k1/k2."
README-DELIVERY.md `:60-62`: "both composites ran END-TO-END … shipped re-run for parity; both
ACCEPTANCE-RECEIPTS.txt are regenerated BY THE SCRIPT and k1/k2 are the composites' raw stdout (the trees'
VERIFY §23.7 carries the receipts)." WHAT-CHANGED.md `:211` (§5.2) and `:264` (Block 3) ("both composites
exit 0 … both ACCEPTANCE-RECEIPTS.txt regenerated by the script (VERIFY §23.7)"). — against
**§23.7 (both trees, honest):** "shipped: the sitting's window closed BEFORE the k1 re-run could finish … THE
K1 RE-RUN FOR PARITY IS THE SITTING'S ONE OPEN ITEM"; "VERIFY §23.7 carries the receipts" is exactly what it
does NOT do for shipped. Receipts: `partH-c9/` contains **k2 only** (29,498 B; audit: 18 × `EXIT_CODE=0`,
`COMPOSITE EXIT CODE: 0`, ends `ACCEPTANCE RUN COMPLETE` — the prepared composite genuinely ran END-TO-END
and its ACCEPTANCE-RECEIPTS.txt was regenerated by the script, which I audited in full); `partH-c8-1/k1`
(52 B) is the 8.1 one-line echo kept as history; `partH-c9/` has **no k1**. WHAT-CHANGED's
"The verification set" entry, the build report's table, and the Owner's chat reply all carry the honest state
(k1 open); the five files above do not.
NET EFFECT: a reader who stops at README-DELIVERY / VERIFY / WHAT-CHANGED (i.e. everyone) concludes the one
open item is closed. The fix is five doc edits citing §23.7 — no code, no new run. **The 8.1 review found
the mirror image of this (the shipped pointer saying "not finished" over a finished run); this round re-planted
it in the opposite direction, in more files. It is the same failure: late corrections landing in some files
and not their siblings.**

**Finding 2 (defect — stale/quoted hash; the exact Part A class). Three shas are in circulation for the
same three START-OF-CHAT-ZAI.md copies, and only one is true.** Measured (this machine, byte-identical ×3):
`15f088c71918b1a8a3f46c33d3056bffcb3b155d8cfab97b30fbbc34fd806aec` — matching
`receipts/partH-c9/a8c-raw-shas.log` and both trees' CHECKSUMS.txt/MANIFEST.txt (`:213`/`:216`). Quoted:
`8ef3b18df08f…` (the **cakepanz-8.1** sha) in README-DELIVERY.md `:69`, VERIFY.txt `:950` and `:993` (both
trees); and `f31bdf51129a00…` (a **mid-sitting** value, superseded by the final "START correction" the sitting
announced) in WHAT-CHANGED.md `:344` (A6's own bullet!), `:472`, and the build report `ledger/build-report-…:31`.
WHAT-CHANGED `:116` (A8b) marks `3c0dfd3f…` SUPERSEDED "with the measured `8ef3b18d…`" — the superseding value
is itself superseded by the final bytes.
NET EFFECT: every file that names the START sha names one that no longer exists. The one action MUSE owes
this file (re-file on `council/muse`) MUST be done from the package bytes, never from any quoted sha —
the correct bytes hash `15f088c7…`. Fix: one sweep across README-DELIVERY.md, VERIFY.txt ×2, WHAT-CHANGED.md,
the build report (5–6 lines), then re-hash and re-zip; nothing else moves.

**Finding 3 (defect — delivery transport; `gate-manifest` FAILS at the delivered bytes).** The Desktop
folder is missing **`.gitignore`** (sha256 `f27658cc7f63ba9e09c1f3a2aa2ff0948037bf3f79ed22f59c6248ee178d9763`,
byte-identical to the 8.1 `.gitignore` sitting in git @ `5fb4989a`). Both trees' MANIFEST.txt/CHECKSUMS.txt
list it; `gate-manifest.mjs` therefore prints `MANIFEST FAIL (missing): .gitignore` and exits 1 in BOTH
trees as delivered. With the one dotfile restored (from the 8.1 hosting, byte-verified by sha), gate-manifest
prints **PASS (314)** / **PASS (319)** — i.e., the delivery is one dotfile short of exactly the receipts'
numbers. Related transport facts: the transported `node_modules` is z.ai's Linux install (`.bin/vite` is a
regular file whose relative `import('../dist/node/cli.js')` resolves to a nonexistent path; `@rollup/rollup-darwin-arm64`
is absent) so nothing that shells to vite runs on this Mac as delivered — `npm ci` fixes it (I did so in the
scratch copy; the delivered source then **builds clean in 1.12 s**, which is itself a useful check).
NET EFFECT: anyone who downloads the folder as it exists on the Owner's Desktop cannot pass the manifest gate
or build, and will conclude the receipts are false. Fix: the Owner re-places `.gitignore` (one file, bytes
exist at `council/inkling @ 5fb4989a`, sha above) or the zip is re-cut including dotfiles; verify with
`node scripts/gate-manifest.mjs` → PASS 314/319. (Likely cause: the zip or the relay dropped dotfiles — the
same class that put a `.gitkeep`-hunting gap into every macOS-delivered node_modules.)

**Finding 4 (defect — low). `ledger/intake-zai-cakepanz-9-2026-11-19.md` §B item 8** claims
"k1/k2 regenerated from real runs … at the package root `receipts/partH-c8-1/` — real runs, never
hand-written." At the delivered bytes `partH-c8-1/k1` is the 52-byte echo, `partH-c8-1/k2` is 0 B (both
correctly kept as 8.1 history), and the real composite stdout is `partH-c9/k2` (prepared) with **no k1
anywhere in the package**. Same class as Finding 1, in the ledger; the honest texts (§23.7; WHAT-CHANGED's
verification-set entry; the Owner's reply) are the ones to keep.

**Finding 5 (risk — provenance, UNKNOWN).** Desktop ≡ hosted (VERIFIED), but neither is proven to be the
zip's contents: dist/flex/pins/START/FIX/CHECKSUMS/MANIFEST all cmp-equal internally, which is strong
circumstantial agreement — the same residual the 8.1 review flagged. One `shasum` of the zip against a
fresh unzip closes it (the Owner's machine or z.ai's).

**Finding 6 (intentional scope — noted, correct as ordered).** C′4 swapped exactly the brief's measured set
(BoardRow 9 → all survive-swapped; DraftBoard 5 → 3 swapped + the `#d9a94c` fifth; BoardFooter 3; Feed 2;
Saves 2; total 16 surviving lines). Residual gold literals OUTSIDE the ordered set: `BoardHeader.svelte:16`
(`#e8c87e`) and `:19` (`#d9a94c`), `LineupAdvice.svelte:17` (`#e8c87e`), `shareable.ts:24/27/30` (`#e8c87e`),
`port/tokens.ts:16` (the JS token registry — fine). z.ai kept scope (correct: "do not work outside the
order") — name these for the next token sweep. `LineupAdvice.svelte`'s literal must stay until C′2's shape
settles (it is the C′2 host).

**Finding 7 (note — contrast, Owner-gated).** The two AA holes persist: light gold2 #e6c67d at **1.51:1 /
1.65:1** (pale rose / white panel) and dark rose-ink on plum **3.17:1**. The delivery's probe measures the
token values; the fix (split `--gold2-display` / `--gold2-text`, deep gold for small text) is still
Owner-gated. Until the Owner rules, light mode small gold text is unreadable at AA — this is now the
largest known legibility debt in the shell.

**Finding 8 (note — C′1 tie breadth + the unseeded live walk, on the Owner's one-word list).** L13's
row-highlight extends on order ties; my battery run shows **pick 1 → 4 ids, pick 13 → 31 ids, pick 27 →
60 ids** vs the delivered receipts' **3 / 38 / 60** — different samples of the same distribution, because the
live browser draft is UNseeded: `src/App.svelte:109` `seed = 1000 + Math.floor(Math.random() * 9000)`.
The law (highlighted ids == the VM's at sampling time) passes in every run — but any "expected N" printed in
a receipt is ONE sample of an unseeded draw, not a reproducible constant; do not quote them as such.
Exactly-three in late rounds needs the Owner's word or the Architect's exact values. (This is also the
V23 pre-Colors lesson restated in the shell: until the RNG is injectable/seeded, no count carries a fixed
number.)

**Finding 9 (process — the recurring one).** This is the second consecutive sitting in which the same
package contains both the honest statement and its contradiction (8.1: shipped pointer vs completed receipt;
9: §23.7 vs §22.2/README/WHAT-CHANGED/VERIFY). Cause: corrections made in the final minutes do not propagate
to sibling files under time pressure, and nothing machine-checks the package's internal consistency. This is
Finding 9 because it is the one the Owner can fix with one tool (see §5-J below) or one protocol line
("before zip: every sha/count quoted anywhere in the package is re-measured and matched").

## 3. Weakest point of the work

The receipt layer again — but sharper this time. The product layer is clean (every battery I ran passes at
the delivered source; the engine suite is green; the build works from a fresh `npm ci`). The delivery as an
ARTIFACT cannot be trusted with a single `grep`: five files assert a closed item that §23.7 and the receipts
show is open, and one dotfile — whose sha sits in the delivery's own MANIFEST — is missing from it. A fresh
machine can trust the bytes and the laws (once `npm ci` runs); it cannot trust the package's prose without
re-measuring it — which is the review's whole job, and it found the same class of failure for the second
round running. The fix is Finding 1 + 2 + 3: seven lines and one dotfile.

## 4. Verdict rationale and what `ok` needs

Two seats' ok/improved closes the chain. This is **improved**: independent re-verification of every
load-bearing claim (hosting, dist, pins, flex, snake, engine/node/slice/shell/board batteries at the delivered
source, both gates, the a3 numerals receipts, the B-bis/C′ greps, the A1/A3/A4/A7/A8 code-and-doc anchors),
plus the two new items (falsify-board re-run below; the dotfile diagnosis). **`ok` needs exactly these,
no code, no rebuild:**
1. VERIFY.txt `:951` (both trees): the L10 row's CAKEPANZ-9 clause → "CLOSED for prepared (k2, 18 × EXIT 0);
   open for shipped (k1 not re-run — window closed; see §23.7)".
2. VERIFY.txt `:1027` (both trees): drop "+ the composites' k1/k2" → "+ the prepared composite's k2 (shipped
   k1: open — §23.7)".
3. README-DELIVERY.md `:55-62`: the L10 paragraph → the per-tree honest split (shipped = 8.1 on-disk record +
   this sitting's per-tool re-runs; prepared = script-regenerated, k2; shipped k1 = the ONE open item).
4. README-DELIVERY.md `:69`, `:4-7` (the top pointer list names "k1/k2 real composite logs"): k2 real, k1
   open; START sha → `15f088c7…`.
5. WHAT-CHANGED.md `:211` and `:264`: the "both composites exit 0 … (VERIFY §23.7)" clauses → the per-tree
   split; and `:116` (A8b's superseding value `8ef3b18d…`) → `15f088c7…`, plus `:344`/`:472` (A6, verification
   set) → `15f088c7…`.
6. The build report `ledger/build-report-…:31` → `15f088c7…`; `ledger/intake-…` §B item 8 → "k2 real; k1 not
   run — the sitting's named open item".
7. Restore `.gitignore` into the delivered folder (bytes at `council/inkling @ 5fb4989a`, sha `f27658cc…`) and into any re-zip, re-run `gate-manifest` → PASS 314/319, re-zip, and record the new zip sha wherever the package names it. (The hosted copy on this branch stays EXACTLY as delivered — the one-dotfile delta is documented here, not smuggled in; hosted≠delivered would break Finding 5's baseline.)

Then the delivery is honest end-to-end. My next-action list (if the Owner wants it): MUSE re-files
START-OF-CHAT-ZAI.md on `council/muse` **from these bytes** (sha `15f088c7…`) — not from any quoted value.

## 5. Further implications, and the innovation brief (the Owner asked for this, 2026-11-19)

### 5.1 What cakepanz-9 decided that the product now inherits
1. **One uniform board is the shell's invariant.** L12 (shell battery) + L10/L11 (board battery) + F17/F18/F19
   (falsifier). The mode system is dead; it must not return — no new persisted per-draft UI state without its
   own law, and no amendment of `settings` for draft-scoped bits.
2. **The engine's opinion, highlighted, is now ambient UI.** C′1/L13 rings the top-three by the ACTIVE order
   (ties extend; ids exact vs the VM). It is the first place the shell shows the model's preference without
   text. It is also why the tie breadth (Finding 8) is a real design decision, not a blemish — settle it with
   the Owner.
3. **The record is the ceremony source.** C′2/L14 (`lineupFor` on the record, `effOvr` per slot, three
   weakest, `data-lineup` attribute for <11 fielded) proves the pattern: **anything derived from the record is
   lawful, cheap, and text-free.** Every future "engine, read back to you" surface is this shape.
4. **C′3/L15 is the cinematic grammar:** title → hint → buttons; ≤2 s; reduced-motion instant; CSS-only;
   zero strings; law (≤2 s; reduced-motion; page errors). It is the house style for entry/completion
   transitions everywhere.
5. **Gold is tokenized at the touch points** (`--gold2` #e8c87e, `--gold3` #8a5f18, `color-mix goldm`,
   `#d9a94c→#c39a4a`). The palette is one edit away from a coherent light/dark identity; the AA hole
   (Finding 7) is the last debt, Owner-gated.
6. **The falsify discipline widened:** F15-board re-anchored (the surviving law kept its killer), F17–F22 all
   DIED. The law→falsifier pairing is now the shell's admission price for any new surface.
7. **The process debt is now visible and named** (Findings 1/2/4/9): doc-sibling drift at package time. It is
   cheap to close (§5-J) and expensive to keep ignoring (two rounds of the same failure).
8. **The k1 parity re-run is the only unfinished 8.1/9 work.** Nothing new should be built on this package
   until it closes; the verification set the sitting assembled is otherwise complete.

### 5.2 The innovation brief — the cakepanz / UI-UX shell, for Claude's engine
Value × effort, offline-first, engine untouchable, zero new sentences unless the Owner's one-word pass says
so. Ranked:

**A. The contrast split + an automated 64-combo palette battery (BUILD-READY on the Owner's word).** Split
`--gold2-display` (shimmer/large) / `--gold2-text` (small text, deep gold ≈ `#8a5f18` on light) — the exact
doctrine already in V23 ("light mode needs a deeper gold for small text"); plus a zero-dep battery measuring
32 teams × 2 modes for 4.5:1 (names the failing team+slot). Closes Finding 7 permanently and makes any future
palette pass self-checking. Law: all 64 combos ≥ 4.5:1 or the failure names the team. Owner decides the
light-gold2 value; everything else is mechanical.

**B. The Complete card 2.0 — from roster print to the season's front door.** Extend C′2 into a 1080×1350-ish
in-screen card driven entirely by the record: the 11 rows (already L14-lawed), effOvr per slot, three weakest
marked — then three engine-derived lines: **best pick** (max priority captured at pick N), **the steal**
(highest priority rank captured vs pick N), **the gasp** (earliest loss by gone%-weighted miss). Zero new
text if built from slot labels + numbers + inventory strings; anything else rides the one-word list.
Law: all three values equal the VM's (sha-exact); reduced-motion honored; ≤2 s cascade (C′3). The product's
emotional peak — the champion/complete moment — deserves it.

**C. "Why he fits" — the ring gets its reason (the single strongest legibility move available).** Each
highlighted (L13) row gains one tappable affordance opening a line composed from the pinned flex table + the
VM: e.g. `EDGE → OLB · flex 6 · your rule` / `Ranked 2nd by priority`. No LLM, no new data, every value from
`flex.json`/boardVM; the number shown is the number it names. Cost: one lookup + templates. Law: popover text
== the table's values (sha-exact); falsifier: a wrong flex value → the battery dies. This makes the engine
*seen* rather than asserted — the moat of Claude's engine, made felt.

**D. The C′3 grammar, applied everywhere.** Team Select → board handoff (0.86 s rise); the completing pick
(the last row folds into the Complete card); week resolve (standings roll into place). All CSS-only, ≤2 s,
reduced-motion instant, zero strings, each with a law (≤2 s; reduced-motion; zero page errors). Do NOT invent
a second cinematic dialect — C′3 is it.

**E. The 390 px grid as one container query.** Replace per-screen `@media` overrides with
`@container (max-width: 430px)` for the board/screens; the L5/L12/S25 discipline then covers every future
screen with one rule. Zero product behavior change; before/after battery (scrollWidth == clientWidth at 390;
zero page errors).

**F. Keyboard endgame drafting (W1, re-ranked up).** Arrows to move, Enter to open, D to confirm — the
speedrun path beside L13's suggestion path. ~80 lines, no new text (key legend only in Guide if the Owner
wants it), law: full 32-pick flow keyboard-only, zero page errors.

**G. Suggestion provenance dot (zero text).** Beside the ring, a tappable gold dot opening the §5-C popover —
an affordance, not a label. If Lucide clears the Owner's word, one labelled icon; else the house gold dot.

**H. The shareable card, from the VM, offline (slice 5).** 1080×1350 canvas card: record + best/steal/gasp
(from §5-B) + team palette + the mark; `toDataURL`; no network. Zero drift vs what the board showed.

**I. The transitions matrix as an executable fixture.** Serialize §22.3's 11 rows → `transitions.fixture.json`;
a battery law per row; F: the flip → battery red. Cheapest structural law available before cutover; row 6
(direct `loadDraft`) is the named gap.

**J. The package-consistency tool ("cite-check") — fix the recurring failure for good.** A package-time script
that (1) re-measures every sha/count/name quoted anywhere in README-DELIVERY/WHAT-CHANGED/VERIFY and matches
each against `receipts/` + the trees' hashes, (2) asserts ACCEPTANCE-RECEIPTS.txt's pointer against its own
content (steps-exit-codes + COMPLETE marker), (3) fails the sitting on any mismatch. This round shipped six
sibling-file contradictions that ONE script would have caught. Until it exists, the protocol needs one line:
"before zip — every quoted sha re-measured and matched." (Highest-leverage process fix on this list; Tier-1
work; the Owner should want it before the next sitting spends an hour re-finding what I cited today.)

**K. One canonical host + SHA256SUMS (pickle's model, re-quoted).** The Desktop now holds nine cakepanz
folders; reviews become one integrity command (`sha256sum -c SHA256SUMS`), and a missing-dotfile gap like
Finding 3 becomes a one-line failure, not a gate-manifest mystery.

**L. Sequencing (what opens after this package closes):** k1 re-run + cite-check → the six stats/awards
questions (Owner) → C′2 card polish + H → visual-regression goldens (after A settles the palette) → TanStack
Table for Awards/Season/All-Teams/Playoffs (not the board; ~15 KB headless MIT; needs the adapter built and
its own law: displayed value == engine ordering) → charts only on data that exists (no per-week series until
the Architect names the seam) → W5 palette battery (A subsumes) → axe-core at the test tier (zero product
bytes) → lz-string only if saves measurably need it → PWA: build nothing (Owner's call; saves ARE the sync
story).

### 5.3 Explicitly NOT proposed
Drag-and-drop on the board (the DRAFT-button path is faster and the Owner closed it), state libraries, UI
kits, virtual scroll, analytics/telemetry ever, Zod, explaining-pick sentences (Owner's word), new sentences
anywhere (the one-word rule binds all future items above), resurrecting the flip or "modes", any engine byte,
TanStack/any table on the DRAFT BOARD itself.

### 5.4 Cautions from the evidence
- Every new surface ships with law + falsifier (F17–F22 pattern) — no exceptions since C′ lands ad hoc.
- C′4's residual literals (BoardHeader, shareable.ts, LineupAdvice) fold into one future token sweep; do not
  dribble them.
- Contrast (A/Finding 7) before goldens — snapshot the settled palette, not the broken one.
- The k1 open item + cite-check are the next sitting's Part A. Everything else waits.
- **Seed the shell's live draft.** `src/App.svelte:109` seeds with `Math.random()` — every UI walk (L13,
  L10, L11) is an unseeded sample. A dev-only `?seed=` param threaded to the same store seam (and read by the
  batteries) would make every battery run bit-reproducible; pairs naturally with the pre-Colors RNG-injection
  task and with cite-check's "re-measure and match" discipline. Architect-gated (the store seam), zero engine.

## 6. Owner-gated, unchanged (correctly untouched)
gh-pages placement (w89 live, fix unplaced), the pins, the flex table, labels, Bodoni, 2PT, the league-size
calibration, Block C, P-144, the stats/awards brief, the framework ruling, ratings data — nothing in this
review moves any of them. The Owner's one-word list from the sitting remains the standing ask:
"incomplete" (visible word for the <11-fielded Complete state — ships as an attribute only), the C′1 tie
breadth (exactly-three vs data-true breadth), and the contrast sign-off (§5-A).

---

FALSIFY-BOARD RE-RUN (this session; `scripts/falsify-board.mjs` at the delivered source; run via
`node --import ./scripts/node-port-register.mjs` on a fresh `npm ci` toolchain — the transporter's Linux
`node_modules` cannot run vite): baselines green on unmutated copies — **F0-board 6/6 · F0-shell 48/0** —
then every mutation stage DIED: **F15-board** (go('complete') handoff deleted → L8 red), **F17** (the
startDraft order reverted → L10 red), **F18** (the unconditional h1 + live CTA re-planted → L11 red),
**F19** (a simple branch planted → L12 red), **F20** (suggest={false} → L13 red), **F21** (the Complete
roster print deleted → L14 red), **F22** (the wall-slip cascade deleted → L15 red) —
**script exit 0**. This reproduces the delivered `receipts/partH-c9/h13-falsify-board-shipped.log` at the
delivered bytes on a fresh toolchain. The flip-era stages (F13/F14/F16-late) are correctly absent — they
died with the flip by the Owner's ruling.

— INKLING, 2026-11-19T04:30Z. Hosted folder: `council/inkling @ 114184be`. Every claim above is VERIFIED
(I ran it, this window), REPORTED (someone else says so), INFERRED (reasoned, not run) or UNKNOWN — labels
inline. The two UNKNOWNs that matter: the zip↔Desktop chain (Finding 5), and whether the zip carries the
`.gitignore` the Desktop folder lost (Finding 3).
