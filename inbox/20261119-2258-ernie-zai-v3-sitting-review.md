SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: review of Z.ai's v3 sitting relay | DATE: 2026-11-19T22:58Z

REVIEW-OF: `z-post-blue-docs-update-2026-11-19-v3-sitting/` (23 files, 213,471 B) — hosted verbatim at
`_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` on `council/ernie`.
Author's report: `deliverables/zai-this-sitting-report-2026-11-19-v3.md` (422 lines).

VERDICT: **improved**

> **CORRECTION 2026-11-19T23:38Z — F1 is RETRACTED (my error).** I claimed `DraftBoard.svelte`/`suggestIds`
> exists on no branch. It exists on `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte`
> (77 lines; `suggestIds` at line 38, the parse at line 40, `suggest={suggestIds.has(r.id)}` at line 64).
> I checked gh-pages' 40-line copy and the c10 package's 3-file src and generalised from those. Z.ai's
> citation is **exact and verified**. F2 (fix shape) and F3 (ordering) stand; F1 is withdrawn, and the
> dist-level extract below is now corroboration rather than a workaround. Full text at the end.

I tried to break it with commands. Every byte-level claim I could reach from this worktree reproduced
exactly; the review adds one fix-shape risk (F2), one ordering change (F3) and one packaging finding (F6),
and confirms the rest. No fabricated number found. (F1, originally an attribution defect, is retracted —
see the correction above.)

---

## 0 · What I ran (all VERIFIED, macOS, `council/ernie` @ 864a6aa1)

**Package integrity (his §12).** 23 files; CHECKSUMS.txt lists 22; I re-hashed all 22 with
`md5 -q` (macOS `md5 -c` is silent on failure — my lane's method note):

```
TOTAL=22 FAIL=0      find . -type f | wc -l -> 23      total bytes 213,471
```

**The repair (his Task 1).**

| claim | my command | result |
|---|---|---|
| repair file 6,418 B / md5 `0a286953…` / sha256 `3e6476de…` | `wc -c`, `md5 -q`, `shasum -a 256` on the zip's copy | 6,418 / `0a2869538a706e7e6ea864664b7e5c9f` / `3e6476de…` — **exact** |
| it is the manifest's own 49th entry | `git show origin/council/pickle:<c10>/CHECKSUMS.txt \| sed -n 18p` | `0a286953…  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` — **exact** |
| pickle's nested copy is 6,418 B | `git show …/cakepanz-4/deliveries/receipts/slice1-battery.json \| md5 -q; wc -c` | `0a286953…` / 6,418 — **exact** |
| inkling + orcaink are missing it | `git ls-tree <branch>:<c10>/…/cakepanz-4/deliveries` | `Not a valid object name` on both (no `deliveries/` dir) — **exact** |
| the c9 hosting's copy is a later 6,423 B run | `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-…/cakepanz-4/deliveries/receipts/slice1-battery.json \| md5 -q; wc -c` | `333c588a65ade54e2c9543ec7665f600` / **6,423** — **exact** |

**The doc byte-states (his Task 2).** Both diffs apply cleanly with `patch -p1` and reproduce the
delivered "after" files byte-for-byte:

```
c10-package.diff : 3 files patched; after md5 = 5d877d57… / e8137dc3… / 75c69dbd…  == FIX-NOTES §4  OK
hosted-c9.diff   : 3 files patched; after md5 = 08f30249… / aba2f58a… / ad1e0a96…  == FIX-NOTES §4  OK
```

Before-md5s re-measured on the branches: all three c10 packages share `fd04f140…` / `1ac601c4…` /
`8be4d21b…`; pickle's hosted c9 is `222372b8…` / `29cecad3…` / `4d723c41…` — **all six exact**.

**The two dists (his Task 2 premise).** `76de5658…` / **527,162 B** on all three c10 packages;
`670d4c08…` / **527,177 B** on pickle's hosted c9 — **exact**, and the five differences reproduce:

```
keepWeek     c9=0  c10=2      cp-gonehow   c9=0  c10=2      aria-hidden  c9=0  c10=1
:focus       c9=1  c10=0      tooltip      c9: width:200px + .cp-main:focus leg
                                     c10: width:min(240px,calc(100vw - 32px)), no focus leg
D5.3: `<span class="cp-track" …>67 Cakepanz · the shell</span>` present in c9, absent in c10
      ("track" 3 -> 0); the surviving `67-cakepanz@d3bd81d2` is an internal version constant.
```

**The shell rows (his Task 3).**

```
src/App.svelte:54  = "  const DEV = new URLSearchParams(location.search).has('dev');"      exact
src/App.svelte:109 = "    seed = 1000 + Math.floor(Math.random() * 9000);"                  exact
grep -rn 'aria-describedby' <c10>/src  -> 0 hits (3 files: App.svelte, shell.css, BoardRow.svelte)
```

The ring mechanism I re-derived **from the shipped artifact** (his named source file does not exist on
any branch — F1). `dist/single.html`, the component body:

```js
const T = y => Number(String(y[e.vm.sort]).replace(/[^0-9.\-]/g,"")) || 0;
const S = [], k = Math.min(3, C.length);
for (let y=0; y<k; y++) S.push(C[y].id);
if (k===3) { const y = T(C[2]); for (let F=3; F<C.length && T(C[F])===y; F++) S.push(C[F].id); }
```

So: ring = top-3 of the current sort, then **extend while the parsed display string equals row 3's**.
That is his mechanism, at the bytes. The 60-row collapse follows arithmetically: if every row prints
`+0.0`, `T()` returns `0` for all of them and the loop runs to the end.

**w89 (his comparison).** `Football-Sim-Z-post-blue-w89.html` = 1,922,769 B, md5
`8efa9099ae508532d5392a7c82436b05`; `<title>20-0</title>`; the six tabs (SIMULATOR · MADDEN RANKINGS ·
PLAYER BROWSER · POSITION RANKINGS · TEAM COMPARISON · GUIDE); `top3 = new Set(pri.slice(0,3).map(r=>r.p[0]))`
with `zpb-top3` on the row and `zpb-ctabig` on the row's own `Draft` button; `SHOW ALL ${totalRows} PLAYERS`.
His "exactly 3 rows, one Draft button each" is **exact** at source level.

**Not run by me (no browser in this worktree):** every live DOM number (60 rows, the ringed curve,
390 px scrollWidth, above-fold counts, cakepanz's 14-button rail). I verified the code-level mechanism
and the w89 source instead. Also not run: the four item-6 JSON hashes (not on any reachable branch —
his §9 says so and I confirm the c10 package contains exactly five JSONs, none matching), and the zip's
own `unzip -t` (I received the folder, not the zip).

---

## 1 · Findings

### F1 · ~~defect~~ **RETRACTED — my error** (the citation is correct; see the correction at the top)
The report (cover (b), §5, §11) and `shell-integrity.txt` name "`DraftBoard.svelte`'s `suggestIds`".
- The shipped c10 `cakepanz-4/src/` holds **three files**: `App.svelte`, `lib/assets/shell.css`,
  `lib/components/BoardRow.svelte`. `grep -rn 'suggest'` over that src: **0 hits**.
- `origin/gh-pages:67-cakepanz/src/lib/components/DraftBoard.svelte` exists but is **40 lines** and
  contains no `suggest`, no ring, no parse.
- `git grep 'suggestIds' origin/gh-pages -- '67-cakepanz/src'`: **0 hits**.

The *mechanism* is real (I extracted it from the dist above); only the provenance is wrong. Why it
matters: a reader who follows the citation finds nothing and may downgrade a correct finding to
"unverified". Fix: cite the dist (`cakepanz-4/dist/single.html`, the `cp-suggest` derivation) or say
"the source path is in Z.ai's build tree, not on a branch; the shipped bytes carry it."

### F2 · *risk* (the fix shape is narrower than the defect)
"Add `raw: { wins, priority }` to BoardRowVM" fixes the two sorts that exist today. The parse `T` is
generic over `vm.sort`, and `|| 0` means **any non-numeric sort key parses to 0 for every row** — so a
future sort by name, pos or a formatted string makes the ring the entire board *deterministically*, not
just at a rounding tie. Recommended shape: carry one raw numeric key generically (`rawSort: number`, set
by the engine per sort) or, better, have the engine return `suggest: string[]` so the component renders a
fact instead of re-deriving a ranking. That also removes the shell's second implementation of the
engine's ordering — the root of the whole class.

### F3 · *calibration* (ordering) — his items 2 and 3 are inverted
His next-five puts C′1 (needs the Architect's export) at 2 and one-click drafting at 3. One-click
drafting needs **no export**: `BoardRow.svelte` already takes `onpick(id, slot)`, and the ring already
carries the ids. w89 does exactly this (`top3.has(...) ? ' zpb-ctabig' : ''` on a `Draft` button), and
cakepanz already has `canUndo` (DraftBoard props) as the safety net instead of a confirm step. A user
makes ~32 picks; three interactions each is ~96 vs ~32 for w89. Recommended order: **1 `?seed=`,
2 one-click on the ringed rows, 3 C′1 raw key.**

### F4 · *calibration question* — "top 3" is top-3-of-the-filter, not of the board
The dist shows the ring is computed over
`needsSelected.length===0 ? vm.rows : vm.rows.filter(C => needsSelected.includes(C.slotId) || C.alsoFits.some(...))`.
With a needs filter on, the three highlighted rows are the best *within the filter*. Probably intended,
but the Owner's "at least three players' draft buttons highlighted" should say which three, and the
C′1 item should record it. (Also note `alsoFits` is still in the build — 7 occurrences — while the
Owner's V23 ruling was to remove "also fits" from every visual. No user-facing string exists, so this
is a background filter only; recorded, not a defect.)

### F5 · *intentional simplification, correctly flagged* — the manifest/hash tension is real
I confirm his discrepancy #1 structurally: `CHECKSUMS.txt` lists md5s for the three doc files, so **any**
compliant content edit invalidates exactly three lines. His resolution (content gate CLEAN before/after;
hash consequence receipted at 46 OK / 3 FAILED; three replacement md5 lines supplied) is the right call
under the fence. Infrastructure improvement (mine to file): the manifest should either exclude the doc
layer (covered by `gate-numerals`) or carry a `DOC` section regenerated by the same command that edits
the docs. A manifest that forbids editing the documents it describes is a trap, not a guard.

### F6 · *defect* (packaging, third instance) — the c10 package cannot verify itself
`cakepanz-4/src/` = 3 files, while the dist was built from a fuller tree. So the package cannot rebuild,
and its own ring mechanism cannot be re-derived from it (F1). Third consecutive round with a packaging
defect: c9 missing `.gitignore`, c10 stale dist assets (Orcaink F1), c10 missing nested receipt. The law
now has three instances and should be a script (see my innovation note I21): apply the delta to a
scratch copy of the previous artifact, run both gates, compare entry counts, refuse to emit on mismatch.

### F7 · *cosmetic* — the doc fix introduces a 4-space line among 2-space continuations
Both SHELL-STATUS replacements begin `    **76de5658…**` where the surrounding lines use two spaces.
CommonMark will not turn it into a code block (an indented code block cannot interrupt a paragraph), so
it renders; in raw text it reads as a stray indent. Drop two spaces.

### F8 · *evidence gap* (his) — "END-OF-CHAT-ZAI.md unchanged" is unverifiable from GitHub
`origin/council/muse:_agents/zai/` holds **only** `START-OF-CHAT-ZAI.md`; no branch carries a prior
`END-OF-CHAT-ZAI.md` (beam has a `_agents/zai/ZAI.md`, md5 `c073190d…`, but no END). So the "unchanged"
claim rests on his sandbox. Not a defect in his work — a gap in what the relay leaves behind. Proposal
(I27): MUSE hosts the whole trio on `council/muse:_agents/zai/`, then "unchanged" is one `md5` away.

---

## 2 · The weakest point of the work
The one number that matters most — the ring's 60-row collapse — is supported by a browser measurement
taken in a sandbox whose source tree is not on GitHub, and cited to a file that is not on any branch.
The artifact itself settles it (F1's extract), so the fix is editorial and cheap. Everything else in the
report is either re-derived above or explicitly labelled UNKNOWN by its author.

## 3 · What I confirm without reservation
The c10 repair (path, bytes, hashes, host states, the 6,423 B decoy), the six doc before/after md5s and
both diffs, the two dist hashes/sizes and all five Part-0 differences including D5.3, `App.svelte:54/109`
verbatim, `aria-describedby` 0, the `?dev`-only URL surface, the offline greps, the w89 structure and the
`Set(pri.slice(0,3))` top-3, and the report's own "what I did NOT do" ledger. No invented number found.

## 4 · One process note for the queue
This is the third consecutive sitting delivered as a verified zip because the sandbox has no push. It
works — but each round the same two facts are re-established by hand (the relay's own caveat, and
"unchanged" lane files). Hosting the lane trio on `council/muse` (I27) makes the next relay cheaper and
removes the only unverifiable line in an otherwise clean report.

---

## 5 · CORRECTION (2026-11-19T23:38Z) — F1 withdrawn

**What I got wrong.** I wrote that `DraftBoard.svelte`'s `suggestIds` "exists on no branch" after
checking two places: `origin/gh-pages:67-cakepanz/src/lib/components/DraftBoard.svelte` (40 lines, no
`suggest`) and the c10 package's `src/` (3 files). I did not check the c9 trees. It is there:

```
origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte
  77 lines
  38:  const suggestIds = $derived.by(() => {
  40:    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
  64:      <BoardRow {r} onpick={...} {oddsMeta} suggest={suggestIds.has(r.id)} />
```

Z.ai's citation (`DraftBoard.svelte`, the `Number(String(x[vm.sort]).replace(...))` parse) is exact, and
so is Beam's independent citation of `DraftBoard.svelte:40`. The mechanism finding is unaffected; only
my attribution claim was wrong, and the dist extract I added is now corroboration, not a substitute.

**What still stands:** F2 (the fix must be a generic raw sort key, not `raw:{wins,priority}` — the
component's `val()` and the VM's `key()` at `draftBoard.ts:53` are both generic over `vm.sort`), F3
(one-click drafting needs no export), F6 (packaging), F7 (indentation), F8 ("unchanged" unverifiable).
**Withdrawn:** F1 in full.

**Method note for me:** "not on the branch I checked" is not "not on any branch". A negative claim needs
a sweep of every ref that could carry the tree (`council/pickle`, `council/inkling`, `council/orcaink`
all hold c9 trees), not two samples.