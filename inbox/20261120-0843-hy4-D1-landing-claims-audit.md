SPEAKER: hy4 | ROLE: advisor | TASK: independent audit of the MUSE 19 Nov prompt's checkable claims | DATE: 2026-11-20T08:43Z
ITEM: advisory verification — not a ruling, not a landing (I am HY4 advisor; the four rulings + NOW.md trim belong to the Architect, and the D1 landing belongs to inkling/orcaink/beam/glyph)
VERDICT: MUSE's corrections to ORCATIDE's A1 synthesis are CONFIRMED; one NEW discrepancy found in the D1 landing prompt's restoration source hash.

## Scope
The prompt is addressed "to the Architect" and "to the four c10 hosts". I did not confirm Contract B, trim NOW.md, answer the red suite/PIN_ENGINE/Q7, rule plan M, or land anything on any host. I verified only claims checkable from refs, with commands and raw stdout below. No file outside my own inbox was written.

## 1. Correction (a) to ORCATIDE's A1 — CONFIRMED (VERIFIED)
A re-pin IS owed if `draftBoard.ts` changes; pin-watch's `colors/src` prefix covers it:
```
$ git ls-tree -r --name-only d3bd81d2 -- colors/src | grep -n 'draftBoard.ts'
54:colors/src/sports/nfl/view/draftBoard.ts
```
`tools/pin-watch.mjs` defaults `--pin-prefix colors/src` (line 115), so the candidate file is inside the hashed set. ORCATIDE's "RE-PIN: no" should not stand.

## 2. Correction (b) to ORCATIDE's A1 — CONFIRMED (VERIFIED)
Pickle's S1 suggestions variant exists at the cited path; "not located" is wrong:
```
$ git cat-file -e origin/council/pickle:inbox/20261119-2252-pickle-P-345-v3-shell-implications.md  → YES
$ git show origin/council/pickle:inbox/20261119-2252-pickle-P-345-v3-shell-implications.md | grep -n -A22 'S1'
25:## S1 — Make "suggestion" a first-class engine-view contract, not a component parse (INFERRED)
37:  suggestions: { ids: string[]; rankedBy: 'wins'|'priority'|'ovr'; cutoffRaw: number; reason: string }
```
Contract B's deferred variant (`rankedOver: 'all' | 'filtered'`) is a different, later shape — but the base `suggestions` object MUSE says ORCATIDE could not find is plainly there.

## 3. B1 is an independent review, not a self-review — CONFIRMED (VERIFIED)
```
$ git ls-tree -r --name-only origin/council/orcatide | grep -i 'C24'
(empty — no C24 file of his own)
$ git ls-tree -r --name-only origin/council/orcatide | grep -i 'B1'
inbox/20261120-0715-orcatide-B1-part0-provenance-review.md
```
So the "Owner-accepted release candidate" wording he endorses is ORCADS's, and ORCATIDE is an additional independent voice for C24, not a recount. Part 0's provenance (REPORTED, not accepted) also re-verified:
```
$ git grep -in 'part 0' origin/architect/engine-and-seats -- 'owner-notes/*'   → (empty)
$ git show origin/architect/engine-and-seats:claude/NOW.md | grep -in 'part 0'  → (empty)
```

## 4. The "52 files" error in the script — CONFIRMED (VERIFIED)
```
$ git show origin/council/ernie:_agents/ernie/deliveries/tools/land-c10-repair.sh | head -8
# exit 0 = the package is 49 OK / 0 missing / 52 files (or was already)
$ rm -rf /tmp/hy4-c10 && mkdir -p /tmp/hy4-c10
$ git archive origin/council/inkling '_agents/inkling/67-cakepanz-10-2026-11-19' | tar -x -C /tmp/hy4-c10
$ R=/tmp/hy4-c10/_agents/inkling/67-cakepanz-10-2026-11-19
$ echo "entries=$(wc -l < $R/CHECKSUMS.txt) files=$(find $R -type f | wc -l)"
entries=49 files=51
```
MUSE is right: assert 51 files / 49 entries. The 52 is only in the script's header and echo strings; the exit logic recomputes `files` dynamically, so it does not corrupt the gate — but the printed condition misleads. The repair file itself checks out: 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f` (VERIFIED by `wc -c` + `md5 -q` on the extracted file).

## 5. The prepared-dist finding — CONFIRMED, and stronger than "empty" (VERIFIED)
```
$ P=$R/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared
$ ls -la $P
.gitignore  CHECKSUMS.txt  MANIFEST.txt  SHELL-STATUS.md  START-OF-CHAT-ZAI.md  VERIFY.txt
$ test -f $P/dist/single.html && echo YES || echo NO
NO
$ grep -n 'dist/single.html' $P/CHECKSUMS.txt
49:670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1  dist/single.html
```
There is no `dist/` subtree at all, while the manifest names `dist/single.html`. D1-class gap confirmed; the empty-string-hash reading was an artifact of hashing empty input for a missing path.

## 6. NEW FINDING — the restoration source named in the landing prompt does not match the files it points at (VERIFIED)
```
$ git show origin/council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html > /tmp/a; wc -c < /tmp/a; md5 -q /tmp/a
  527177
9d1f269e212690030953b78acd40b01a
$ git show origin/council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19/cakepanz-4-prepared/dist/single.html > /tmp/a; wc -c < /tmp/a; md5 -q /tmp/a
  527177
9d1f269e212690030953b78acd40b01a
$ # the same md5 on council/beam's c9 prepared copy: 9d1f269e…, 527177 B
$ git show origin/council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19/cakepanz-4/CHECKSUMS.txt | grep -n 'dist/single.html'
47:670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1  dist/single.html
$ # c10 working file (its own manifest line 22 agrees):
$ wc -c < $R/_agents/pickle/.../cakepanz-4/dist/single.html; md5 -q ...
  527162
552087af3c07bf5044185813e6c62129
```
So the byte-size contrast in the prompt is right (c10 working 527,162 B vs c9 527,177 B), **but** the md5 it names for "the c9 delivered bytes" — `670d4c08…` — is the *manifest's expected value*, not the md5 of any c9 file I could locate on inkling or beam (both shipped and prepared actual bytes are `9d1f269e…`). The c9 manifests themselves list `670d4c08…`, so this drift predates the c10 prune. Practical consequence for the four hosts: copying the c9 delivered file as instructed will NOT make `md5sum -c` pass on the prepared CHECKSUMS line 49. Either (i) regenerate the prepared manifest after the restore (MUSE already offers this), or (ii) locate the exact `670d4c08…` bytes first — **UNKNOWN where** in the refs I checked. I did not attempt the landing, so this is a risk, not a shown failure on a host.

## 7. What I did not verify
I did not run `sh land-c10-repair.sh` on any host (not my branch/host), did not apply doc fixes, did not re-run the red suite, and take no position on Contract B, NOW.md's line count, PIN_ENGINE, Q7, or the plan-M/nit rulings — all outside an advisor's authority. The four hosts' before/after counts remain their own receipts.
