SPEAKER: pickle | ROLE: Council Adviser | TASK: P-287 | DATE: 2026-11-19 22:52 UTC
FOR: P-287
REVIEW-OF: z-post-blue-docs-update-2026-11-19-v3-sitting — full package, hosted byte-for-byte at
  `_agents/pickle/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` on `council/pickle`
  (host commit `f1b6afa4d`, ls-remote verified). Primary document reviewed:
  `deliverables/zai-this-sitting-report-2026-11-19-v3.md` (422 lines).
VERDICT: **improved** — the four tasks and their core receipts are sound; two real defects found,
  both in the delivery layer (one in FIX-NOTES, one in the report's byte-truth classification).
  No product bytes, engine, pin, protected constant, governance or queue file was edited.

## Disclosure

I hosted these bytes at the Owner's request and wrote that folder's `.PROVENANCE.md` and
`SHA256SUMS.txt`. I authored **none** of Z.ai's package content. Every claim below is labelled
VERIFIED (I ran the command and quote the output), REPORTED (Z.ai's receipt, not re-run by me), or
INFERRED. "Not run" is stated where it applies.

## What I ran and confirmed (all VERIFIED unless labelled)

- **Package integrity:** `diff -rq <source> <hosted>` exit 0; `md5sum -c CHECKSUMS.txt` → 22/22 OK;
  my own `shasum -a 256 -c SHA256SUMS.txt` → 23/23 OK. 23 files / 252 KB.
- **Repair artifact:** `wc -c` → **6,418** B; `md5` → `0a2869538a706e7e6ea864664b7e5c9f`;
  `shasum -a 256` → `3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`.
  Matches the report §3, REMEDY.md, and c10 `CHECKSUMS.txt` **line 18** (a line number the report
  gets slightly wrong in one place — see N1).
- **Provenance:** nested c10 copy on `council/pickle` → 6,418 B / `0a286953…` (manifest-true);
  standalone c9 hosting's copy → **6,423 B / `333c588a65ade54e2c9543ec7665f600`** (later re-run).
  Both exactly as the report says. The repair imports the right bytes.
- **Before-states** (`git archive` → extract → `md5sum -c` in each package root): pickle c10
  **49 OK / 52 files**; inkling c10 **48 OK / 51 files**; orcaink c10 **48 OK / 51 files**. On both
  hosts the sole failure is `md5sum: _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/
  deliveries/receipts/slice1-battery.json: No such file or directory` and the `receipts/` directory
  is absent. Exactly as reported.
- **Two dists:** c10 package `cakepanz-4/dist/single.html` → 527,162 B /
  `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964`; c9 hosted → 527,177 B /
  `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1`. Both match §4.
- **Stale lines + md5 table:** the three stale sentences exist verbatim at the named sites. All six
  "before" md5s (`fd04f140…`, `1ac601c4…`, `8be4d21b…`, `222372b8…`, `29cecad3…`, `4d723c41…`) and
  all six delivered "after" md5s (`5d877d57…`, `e8137dc3…`, `75c69dbd…`, `08f30249…`, `aba2f58a…`,
  `ad1e0a96…`) match the report §4 table byte-for-byte. The replacement role-wording is present.
- **k1 log:** `grep -c 'EXIT_CODE=0'` → 18; total `grep -c 'EXIT_CODE='` → 18; tail shows
  `ACCEPTANCE RUN COMPLETE` and `===K1-OUTER-EXIT=0`. Matches §3.
- **Vapor numbers present in RESULTS.txt:** 13,154 / 26,294 / 31,498 B gz, 2.39×, +19.8%,
  `__vapor:!0`. Read only — the experiment itself was not re-run by me (Z.ai labels it
  REPORTED-from-ERNIE; I concur with that label).
- **Shell code anchors (at the c9 hosted tree + c10 package src):** `App.svelte:54` is the only
  `URLSearchParams` read (`?dev`); `App.svelte:109` is `seed = 1000 + Math.floor(Math.random()*9000)`;
  `grep -rn aria-describedby <src>` → 0; `BoardRow.svelte` tooltip carries `aria-hidden`. All match §5.

## D1 (defect, shown) — FIX-NOTES §5's `patch -p1` instruction is wrong

`deliverables/doc-fixes/FIX-NOTES.md` §5 says:

> (or `patch -p1 < doc-fixes/c10-package.diff` from the c9 subtree root — the diff's headers are
> already relative to `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/`.)

Both clauses are wrong. The diff headers are `a/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/
cakepanz-4/SHELL-STATUS.md`; with `-p1` the path `_agents/pickle/…` is still present, so it must be
run from a directory **containing** `_agents/`. From the c9 subtree root it fails:

```
patch -p1 < doc-fixes/hosted-c9.diff   # from .../zai-cakepanz-9-2026-11-19/
→ No file found--skip this patch? [y]  / 1 out of 1 hunks ignored  (×3)
```

I confirmed both correct routes: `patch -p1 < c10-package.diff` from the **c10 package root**
(`…/67-cakepanz-10-2026-11-19/`) applies all three files and produces exactly the delivered md5s
(`5d877d57…`, `e8137dc3…`, `75c69dbd…`); the `cp` commands in the same section are correct as
written. Same defect applies to the hosted-c9 line ("the same way from the c9 root").

**Improved text for §5** (replace the parenthetical):

> (Or `patch -p1 < doc-fixes/c10-package.diff` **from the c10 package root** — i.e. the directory
> that contains `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/`. From the c9 subtree root
> instead use `patch -p5` (five path components to strip: `a/_agents/pickle/deliveries/`). Both
> routes were run this review and produce exactly the delivered md5s. The diff headers are NOT
> relative to the c9 subtree root.)
>
> For pickle's hosted c9, apply `doc-fixes/hosted-c9/…` with `patch -p1` **from the repo root** (or
> `patch -p5` from the c9 subtree root); the `cp` commands above are correct and unambiguous.

Impact: low (the primary `cp` route works and the replacement files are byte-correct), but a reader
following the shortcut literally gets "No file found" and may conclude the diff is broken.

## D2 (defect, shown) — report §10.2's byte-truth claim for pickle's hosted c9 is falsified

§10.2 says: *"I found the same sentence in pickle's hosted c9 (**false at its own bytes — its
shipped dist is `76de5658…`, measured**) and in inkling's and orcaink's own c9 folders (true at
their own bytes — both dists `670d4c08…` there, measured). Per §3.5 I fixed the false one
(hosted-c9 fix files) and reported the byte-true ones."*

I measured all four dists directly:

| tree | shipped dist | prepared dist | stale sentence at its own bytes? |
|---|---|---|---|
| c10 package nested c9 (`council/pickle`) | 76de5658… / 527,162 B | (none shipped in package) | **false** |
| standalone hosted c9 (`council/pickle`) | **670d4c08… / 527,177 B** | **670d4c08… / 527,177 B** | **true** |
| inkling's / orcaink's own c9 | 670d4c08… | 670d4c08… | true |

So §10.2's `76de5658…` for pickle's hosted c9 is wrong — that is the *c10 package's nested copy*.
The standalone hosted c9's shipped dist is `670d4c08…`, which is also what the report's own §4
table says. The sentence in `hosted-c9/cakepanz-4/SHELL-STATUS.md` line 29 —
`**670d4c08f2ab…**, byte-identical across both` — is **true at those bytes** (both trees carry
that exact dist). This also makes the report's §4 remark that "the build-report row's
'byte-identical' was already false at the hosted c9 bytes" false: at the hosted c9 bytes that row
is literally true.

Consequence: Z.ai edited one byte-true copy (the hosted c9, via `hosted-c9.diff`) while reporting
— and deliberately not editing — two other byte-true copies (inkling's/orcaink's). The fix files
themselves remain valid: the new role-based wording is true everywhere, so applying it to a
byte-true copy changes a true sentence into a different true sentence (more informative, cites
both dists' roles). The defect is in the report's **classification and justification**, not in the
replacement bytes. The policy inconsistency (edit one byte-true copy, report the others) needs the
Owner's/Architect's call on whether consistency argues for offering the same diff to inkling and
orcaink or for withdrawing the hosted-c9 fix.

**Improved text for §10.2** (replace the hosted-c9 clause):

> "…I found the same sentence in pickle's **standalone hosted c9** (true at its own bytes — I
> measured BOTH tree dists there at `670d4c08…` / 527,177 B, matching my own §4 table) and in
> inkling's and orcaink's own c9 folders (also true at their own bytes — both dists `670d4c08…`
> there). The `76de5658…` / 527,162 B dist belongs to the **c10 package's nested c9 copy**, where
> the sentence IS false; that is the byte-state the c10-package fix targets. I supplied fixes for
> both byte-states and flag the policy question — three byte-true copies exist (hosted c9 +
> inkling's + orcaink's own c9); I edited one and reported two. No byte-true copy was misdescribed
> as false after this correction."

## R1 (strengthening, not a defect) — the exact root-cause line

The report says the raw values "are not on the VM" and that the fix needs an engine-view export or
re-pin, but does not cite where. I found it. In the c9 hosted tree,
`src/engine/sports/nfl/view/draftBoard.ts`:

- line 22: `wins: string; priority: string; gone: string;` — VM fields are display strings;
- line 49: `wins: signed(showDecimal('wins', w)), priority: signed(showDecimal('priority', pr))`
  — populated from formatted strings;
- line 50: each row is built with `_w: w, _p: pr` — the raw 1e-9-grid numbers ARE computed;
- line 53: the sort key uses `r._p` / `r._w` correctly;
- **line 61: `rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r)` — the raw values are
  explicitly stripped before the VM is returned.**

Consequently `DraftBoard.svelte`'s `suggestIds` (line 40:
`Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,''))`) can only parse the display string — hence
the `+0.0` → 60-row ring. **My initial alternative hypothesis (a shell-only fix using `_w`/`_p`)
is falsified by line 61.** Z.ai's re-pin conclusion is correct. Recommend the report cite
`draftBoard.ts:61` as the precise root-cause line; it turns an INFERRED claim into a VERIFIED one.

## N1 (nit) — a line number

REMEDY.md:33 and report §3 say the repair md5 "== `CHECKSUMS.txt:18` in all three c10 packages" —
true for the c10 packages (verified). In the *v3 zip's own* `CHECKSUMS.txt` the repair file is
line **17**, not 18. No action needed if the qualifier "c10 packages" is kept in mind.

## Not run (stated plainly)

- No headless-browser draft / 27-pick ring curve — I verified the deterministic anchors (rows=60,
  ring=3 at pick 1, the display-string mechanism and the strip line) at the code level, but the
  intermediate ringed counts (Z.ai's 31 at pick 13, 60 at pick 27) remain REPORTED-from-Z.ai.
- No `gate-numerals.mjs` / `gate-manifest.mjs` run (those scripts are not in the c10 package subset;
  they live in the full c9 tree). The report's "CLEAN ×2 before and after" and "46 OK / 3 FAILED"
  gate receipts are REPORTED, not re-run by me. I verified the six file md5s the manifest
  consequence depends on.
- No item-5 / item-6 / vapor re-run; no c10 inertness script re-run (I re-derived the before-states
  and the missing file directly instead). The Part-0 ACCEPT quote remains UNKNOWN from my seat.

## Weakest point of the work

The report's strongest claims are byte-level and I confirmed them; its weakest link is the
browser-only C′1 *measurement* (unseeded, not independently re-run by me) plus D2's byte-truth
classification error — which, while not touching the fix bytes, undermines the report's claim that
it consistently classified the four stale-line sites.

## Bottom line

Four tasks delivered; repair and doc-fix bytes correct; dist hashes, before-states, manifest lines
and shell anchors all VERIFIED. Two delivery-layer defects (D1 apply instruction, D2 byte-truth
classification) need correction before the package is relayed onward. One strengthening (R1) makes
the C′1 root cause fully VERIFIED. Verdict **improved**; the fixes are text edits to the report and
FIX-NOTES, not a re-cut of any package (the fence holds).
