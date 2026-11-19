# Z.ai — this sitting's report — 2026-11-19 · v3

Seat: Z.ai · Executor of Z-post-blue and 67 Cakepanz · English only · every claim labelled.
Controlling order: ERNIE's v3.0 (`deliveries/zai-next-sitting-prompt-2026-11-19.md` @ blob
`34d9b02517009aa3ea91b40a0d5a89467220a234` — VERIFIED exact match before work started). Labels:
VERIFIED (I ran it; output quoted or named) / REPORTED (someone named says it) / INFERRED
(reasoned) / UNKNOWN (no evidence).

## 1 · TL;DR — three lines

(a) **Did:** the c10 one-file repair is packaged and scratch-verified 49/49 on both hosts with a
byte-exact inertness proof; the three stale doc lines are rewritten in my own words for two
byte-states with gate receipts; the shell-integrity pass is measured live (27 pick states in a
headless browser); the vapor receipts are read and accepted; all four hygiene items and all four
§7 extras are done; one verified zip.
(b) **Found:** the C′1 ring's mechanism is proven (the ring extends on the parsed DISPLAY string —
all 60 rows display `+0.0` wins at the pick-27 state), so the fix needs the raw `{wins, priority}`
on BoardRowVM (an engine-view export or re-pin) — the Architect's; a second copy of the stale
sentence exists where it is TRUE at its own bytes (inkling/orcaink's own c9 folders — reported, not
edited); the c9 hosting's `slice1-battery.json` is a LATER battery re-run (6,423 B) than the bytes
the c10 manifest names (6,418 B).
(c) **Owner owes:** apply the repair + doc fixes to the hosts (exact paths + three manifest lines
provided); rule the C′1 export; nothing else is blocked on the Owner — the fence held throughout.

## 2 · Identity + environment

- Seat: Z.ai (High Councillor). Date: 2026-11-19. Started cold per the bootstrap order
  (`council/muse:_agents/zai/START-OF-CHAT-ZAI.md`, 109 lines — read in full; the `council/zai`
  copy was not used).
- node **v24.22.3** (VERIFIED, `node -v`) — the same version recorded for my previous sitting; the
  order's author ran v26.13.0. The vapor numbers are therefore REPORTED-from-ERNIE on a different
  platform; nothing this sitting depends on them beyond the receipt read.
- Sandbox: linux x64, blob-less partial clone of `kozikosi/Football-Sim`; fetched `council/ernie`,
  `council/pickle`, `council/inkling`, `council/orcaink`, `council/muse`,
  `architect/engine-and-seats` (VERIFIED `80eb432` is an ancestor of that branch's tip `deb6275f`;
  used read-only, nothing executed from it).
- Scratch paths (mine alone): `/home/z/my-project/fs` (the clone), `/home/z/my-project/work/{p10,
  i10, o10, p9, i10-fresh, o10-fresh, p9-scratch, zipbuild}`.
- Could NOT do: git push (no credentials — never attempted); a GUI display (used headless
  Chromium via agent-browser instead — the order assumed no browser; noted where it changes a
  receipt's letter); re-verify the item-6 JSONs (see §9).

## 3 · Task 1 — the c10 repair (one file, two hosts)

**Before-states (VERIFIED — extracted with `git archive` from each branch, then in the package root:)**

| host | command | result |
|---|---|---|
| pickle's c10 (`origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19`) | `find . -type f \| wc -l` → `52`; `md5sum -c CHECKSUMS.txt` | **49 OK**, exit 0 |
| inkling's c10 (`origin/council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19`) | same | **48 OK / 1 FAILED open or read** (the FAILED entry is `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`); 51 files |
| orcaink's c10 (`origin/council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19`) | same | **48 OK / 1 FAILED open or read** (same entry); 51 files |

All three exactly as the order predicted (§0.2, §2).

**The repair artifact (in this zip):** `deliverables/repair/slice1-battery.json` — **6,418 B**,
md5 **`0a2869538a706e7e6ea864664b7e5c9f`** (== `CHECKSUMS.txt:18` in all three packages),
sha256 **`3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`** (all VERIFIED with
`wc -c`, `md5sum`, `sha256sum`). REMEDY.md carries the exact destination path, the verify commands,
and the expected 49/49.

**Provenance finding (VERIFIED):** the only manifest-true bytes reachable on GitHub are inside
pickle's own c10 package (the nested path). The c9 hosting's copy of the same path on
`council/pickle` is **6,423 B / md5 `333c588a65ade54e2c9543ec7665f600`** — a LATER battery re-run
(diff shows two `detail` strings changed: "71→76 flex chips", "Patrick Mahomes→Joe Burrow" — the
same battery, different run). The repair imports the 6,418 B bytes the manifest names, NOT the
hosting's newer bytes.

**After-state in scratch copies (VERIFIED — `i10-fresh` and `o10-fresh`, freshly re-extracted from
git before the repair):**

- `md5sum -c CHECKSUMS.txt` → **49 OK** on both; `find . -type f | wc -l` → **52** on both.
- Inertness: a path-joined before/after sha256 comparison over every file (script
  `verify_inertness.sh`) shows **exactly ONE path added** (the slice1-battery.json) and **ZERO
  pre-existing files changed** on both hosts.
- The k1 log (`receipts/partH-c9/zai-closeout-k1-acceptance-run-shipped-retry.log`) is one of the
  49 verified entries; VERIFIED it ends **18 × `EXIT_CODE=0`, "ACCEPTANCE RUN COMPLETE",
  `K1-OUTER-EXIT=0`** (`grep -c "EXIT_CODE=0"` → 18; total EXIT_CODE lines also 18).
- The four item-6 JSON sha256s (§0.1): **NOT re-verifiable here** — see §9 ("what I did NOT do").
  The zero-changed proof above covers the intent (nothing but the one file was touched).

## 4 · Task 2 — the three stale doc lines, in my words

**What I measured first (VERIFIED — all numbers mine, this sitting):**

| fact | command | result |
|---|---|---|
| the c10 package's dist | `sha256sum` + `wc -c` | `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964`, 527,162 B |
| the c9 hosting's dist (the delivered artifact) | same | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1`, 527,177 B |
| the hosted prepared tree's dist | same | `670d4c08…`, 527,177 B |
| D1 keepWeek | `grep -o keepWeek \| wc -l` on both dists | 0 → 2 |
| D2 gonehow | `grep -o cp-gonehow \| wc -l` | 0 → 2 |
| D2 tooltip | rule greps | old: `.cp-gonetip.svelte-q412k{width:200px}` override + a `.cp-main.svelte-q412k:focus .cp-gonetip` leg; new: `width:min(240px,calc(100vw - 32px))`, no focus leg |
| D3 aria-hidden | `grep -o aria-hidden \| wc -l` | 0 → 1 |
| D2 focus leg / :focus | `grep -o :focus \| wc -l` | 1 → 0 |

**The three sites (VERIFIED locations and bytes):**

1. `…/zai-cakepanz-9-2026-11-19/cakepanz-4/SHELL-STATUS.md` lines 29–30 — the sentence
   `**670d4c08…**, byte-identical across both / trees (the 8.1 sha 4ce69205…057a is superseded by
   this round's code edits).`
2. `…/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/SHELL-STATUS.md` lines 29–30 — same sentence.
3. `…/zai-cakepanz-9-2026-11-19/ledger/build-report-zai-cakepanz-9-2026-11-19.md` line 28 — the row
   `| dist/single.html | 670d4c08… | byte-identical (cmp exit 0) | measured ×2 |` (the table's
   columns are `| Claim | Shipped | Prepared | Receipt |`, so the delivered artifact's hash sat in
   the SHIPPED column — that is what made it false).

**My replacement sentences (full text in `deliverables/doc-fixes/FIX-NOTES.md`; the before/after
pairs verbatim):**

- SHELL-STATUS ×2 — after:
  `**76de5658…** (527,162 B) is the Part-0-patched working dist and the Owner-accepted release
  candidate (the ruling of 2026-11-19); the c9 sitting's delivered artifact **670d4c08…**
  (527,177 B) is the pre-Part-0 build kept as history — the two differ by exactly the four Part-0
  fixes (the D1 keepWeek, D2 tooltip, D3 aria-hidden and D5.3 branding fixes) and are NOT
  byte-identical (the 8.1 sha 4ce69205…057a is superseded by this round's code edits).`
  (full hashes in the file). Why it is true: both hashes and both sizes measured this sitting on
  the named files; the four-fix difference measured by the greps above; the release-candidate role
  is the Owner's Part-0 ruling (REPORTED); the superseded-8.1 note is carried over from the
  original line unchanged. It states roles, not local file states, so it is true wherever pasted.
  It is NOT Ernie's worked example — mine keeps the 8.1 parenthetical, adds the measured fix list,
  and says "kept as history" instead of "pre-Part-0 history" in the sentence body.
- build-report row — after: `| dist/single.html | 76de5658… — 527,162 B, the Part-0-patched working
  dist, the Owner-accepted release candidate (2026-11-19) | 670d4c08… — 527,177 B, the c9 delivered
  artifact, pre-Part-0 history | NOT byte-identical: the two builds differ by the four Part-0 fixes
  (sha256sum ×2 + cmp exit 1, measured 2026-11-19) |` (the Shipped column now names the build the
  package actually carries — cmp exit 1 is the measured verdict I can stand behind, since I compared
  the two builds' bytes this sitting).

**Edited files delivered** (two byte-states — the three c10 packages share one byte-state
`fd04f140…/1ac601c4…/8be4d21b…`; pickle's hosted c9 is a second `222372b8…/29cecad3…/4d723c41…`;
all six edited files + two diffs in `deliverables/doc-fixes/`):

| file | before md5 | after md5 |
|---|---|---|
| c10 `cakepanz-4/SHELL-STATUS.md` | `fd04f140a6b241e89046507a00ed89f3` | `5d877d57f1b6556c8c987edb059b19c6` |
| c10 `cakepanz-4-prepared/SHELL-STATUS.md` | `1ac601c436b12b60629973e5ee27237c` | `e8137dc3e61e086977f4cc06e087ae8b` |
| c10 `ledger/build-report…md` | `8be4d21b5e61a8e731abb2f220448ee2` | `75c69dbd8f63692ae457eefaf662859e` |
| hosted-c9 `cakepanz-4/SHELL-STATUS.md` | `222372b8342ed050273b2b6202cfd768` | `08f30249faeae37eb2198a1668c10db6` |
| hosted-c9 `cakepanz-4-prepared/SHELL-STATUS.md` | `29cecad3ff502a1afafd43163def3602` | `aba2f58ae13f0d0fa08a41feababb3de` |
| hosted-c9 `ledger/build-report…md` | `4d723c4185348d5e8ff43b23f35f5325` | `ad1e0a967dda4ddc1a53cf8497cc6131` |

**Gates after the edit (VERIFIED, run in scratch trees):**

- `node scripts/gate-numerals.mjs` (shipped tree, default pin): **CLEAN ×2, exit 0** — BOTH before
  (unedited baseline) and after my edit. `CP_PIN=65673a00 node scripts/gate-numerals.mjs`
  (prepared tree): **CLEAN ×2, exit 0** — before and after. My edit introduces no stale pin, no
  placeholder marker, no numerals break.
- The hash gates' honest consequence: c10 `md5sum -c CHECKSUMS.txt` after repair + doc edits →
  **46 OK / 3 FAILED** — the three FAILED entries are EXACTLY my three edited files (receipted in
  both `i10-fresh` and `o10-fresh`). The c9 layer's `gate-manifest.mjs`: baseline fails ONLY on the
  pre-existing missing `.gitignore` (the known delivered-zip parity finding); after my edit it adds
  exactly one line, `MANIFEST FAIL (hash): SHELL-STATUS.md`. The three replacement md5 lines (and
  the two MANIFEST sha256 lines) for whoever applies the edits are in FIX-NOTES §6. I did not
  regenerate or re-cut anything (the fence).

**A fourth site, handled per the rule (§3.5 / §8.10 — reported, not silently fixed):** the SAME
sentence exists in inkling's and orcaink's OWN c9 folders
(`_agents/<seat>/67-cakepanz-9-2026-11-19/…`, file bytes identical to pickle's hosting). There the
sentence is **true at its own bytes** — I measured BOTH tree dists in those copies at
`670d4c08…` / 527,177 B — but it describes the pre-Part-0 state. VERIFIED, REPORTED; not edited
(see §9). Other mentions of `670d4c08…` (the c9 tools report, START-OF-CHAT copies) are correct
usage and were left alone; VERIFY.txt's "byte-identical" rows are about the 8.1 sha
`4ce69205…` (a dated receipt, true at its own bytes); MERGE-README's is about flex.json.

## 5 · Task 3 — the shell-integrity pass (measure, don't fix)

Full receipts with commands: `deliverables/shell-integrity/shell-integrity.txt`. Summary (all
VERIFIED unless stated):

| row | question | answer |
|---|---|---|
| 1 · C′1 ring | rows / ringed at picks 1, 13, 27; ring order? | Live headless-browser draft (1180×900, dev build, Buffalo Bills slot 1): **rows=60 at EVERY state**; ringed=3 at pick 1 (indices 0,1,2 — the intended top-3), 31 at my pick-13 state, **60 at the pick-27 state**; **contiguousFromTop=true at all 27 measured states**. ERNIE's readings (3/46/60) confirmed in pattern; the mid-draft value differs per run because the draft is unseeded. Mechanism (VERIFIED): `suggestIds` ranks on the PARSED DISPLAY STRING; at the pick-27 state the sort is Wins and all 60 rows display `+0.0` (measured: `{"+0.0": 60}`). w89 comparison (VERIFIED): w89 rings EXACTLY 3 rows, each with its own glowing Draft button. |
| 2 · `?seed=` seam | live and unseeded? | VERIFIED: `src/App.svelte:109` = `seed = 1000 + Math.floor(Math.random() * 9000);` exactly. URL-parameter read: exactly ONE — `App.svelte:54` `const DEV = new URLSearchParams(location.search).has('dev');` — a dev flag; **nothing pins the seed** (no `?seed` anywhere). |
| 3 · aria-describedby | count in shipped src | VERIFIED: **0** (grep over the package's whole `src/`). D3 is half-done: tooltip `aria-hidden` landed (BoardRow.svelte:33), the row↔detail association does not exist. |
| 4 · offline story | CDN refs / inline module / absolute assets | VERIFIED by grep: no `http` script/link refs; one inline `<script type="module">`, no `<link>` at all; `/assets/` absolute-path count 0; the only URL-ish attribute is relative `href="?dev=1"`. Incidental (extra evidence, not the ordered receipt): both dists DID boot from `file://` in the headless browser during row 1. |

## 6 · Task 4 — the vapor receipts (read; not re-run)

Confirm receipt: I read `deliverables/vapor-mode-experiment-2026-11-19/RESULTS.txt` (63 lines, the
file the order ships) in full.

The number, in my own words (REPORTED-from-ERNIE — Ernie ran it on macOS/Node 26.13.0; I did not
re-run): on one identical 6-column row surface with no CSS, the emitted JS bundle gzipped to
**13,154 B for Svelte 5.58.0, 26,294 B for Vue 3.6.0-rc.15 vdom, and 31,498 B for Vue vapor** —
vapor is **2.39× Svelte** (31,498/13,154 = 2.394, re-derived VERIFIED) and **19.8% bigger than
vdom** (31,498/26,294 = 1.1979, re-derived VERIFIED). The registered 5 KB falsifier died at 17–18
KB over (the receipt says 17 KB; 31,498 − 13,154 = 18,344 B ≈ 17.9 KiB — VERIFIED arithmetic; the
verdict is unaffected). The receipt also shows vapor genuinely engaged (`__vapor:!0`, zero
`createVNode`, the component starting at byte 82,514 of 83,040 — 99.3% runtime, VERIFIED arithmetic
from the receipt's own numbers) and records the trap that plugin-level `vapor:true` silently did
nothing.

What I would do with it: exactly what the order says — the last technical argument for a Vue track
is closed; the framework is Svelte 5 + Vite 8 and there is no measured reason to revisit it. Vapor
stays a post-v1.1 idea for a MEASURED per-page runtime problem (its win was always DOM
elimination, which this experiment did not measure). I will not cite it as open and will not use it
as a framework argument in either direction.

## 7 · Task 5 — the four hygiene items

1. **Retire the Vue arm — archive, don't delete.** Recommendation: move the Vue arm to `_archive/`
   with a pointer file naming what it holds and why it is kept. Why: the arm contains a full copy
   of the engine (REPORTED-from-ERNIE: 6,157 lines, `src/engine/sports/nfl/…`), the standing
   evidence that the engine's portability claim (M1–M5) was real. Deleting it would destroy the
   only in-tree proof. I did not move anything (no push; other seats' lanes are fenced).
2. **D1 remedy recorded in the queue** — the one-line entry, ready to file by ERNIE or the Owner
   (I hold no inbox write):
   *"D1 closed — the c10 package is intact at 6,418 B / `0a286953…` on `council/pickle`; inkling and
   orcaink are 48/49; fix = one-file re-import at the manifest's own path; no re-cut."*
   (One refinement from this sitting's measurement: the only 6,418 B copy on GitHub is inside
   pickle's c10 package; the c9 hosting's copy is a later 6,423 B re-run — the repair file rides my
   zip so nobody has to hunt.)
3. **C′1 recorded as a product item, not a bug** — as I would want to receive it: measurement
   (rows=60 at every state; ringed=3 → up to 60; contiguous-from-top always), root cause (the ring
   extends on the parsed DISPLAY string — `DraftBoard.svelte` suggestIds; all 60 rows display
   `+0.0` wins at the pick-27 state), the one-line fix shape (rank on the raw value) and its
   precondition (the raw `{ wins, priority }` must be on BoardRowVM — an engine-view export or a
   re-pin), and the battery blind spot (L13 rebuilds its expectation with the same rounded parse the
   component uses — REPORTED-from-ERNIE, consistent with the code I read). In
   `deliverables/shell-integrity/shell-integrity.txt` and the report.
4. **`?seed=` noted as the highest-leverage shell item** — the only URL parameter is `?dev`
   (App.svelte:54); the seed line is App.svelte:109. It is the precondition for deterministic
   battery runs and any paired what-if feature. First item of
   `deliverables/shell-next-five.md`.

## 8 · The optional tasks (7.1–7.4) — done

- **7.1 `deliverables/plain-language-part0.md`** — the Owner's four bullets (D1/D2/D3/D5.3), one
  sentence of plain English each with the symptom and the now-behavior; no hashes in the bullets;
  the two-build footnote at the bottom.
- **7.2 `deliverables/w89-vs-cakepanz.md`** — the structural table, MEASURED this sitting in the
  headless browser at 1180×900 and 390×844 on both shells (nav shapes, row anatomy, board sizes,
  rows above the fold, the suggestion affordances, horizontal-scroll checks). No aesthetics.
- **7.3 `deliverables/shell-next-five.md`** — the proposal: (1) `?seed=` seam, (2) C′1 raw-value
  ranking (needs the engine export), (3) one-click drafting on suggested rows (the w89 affordance),
  (4) the aria-describedby half of D3, (5) the four ALL-CAPS tab strings at cutover. Each grounded
  in a file/line read this sitting. Nothing built.
- **7.4 the one-paragraph "state of the shell"** — at the top of the rewritten START-OF-CHAT §2
  (in this zip, `_agents/zai/START-OF-CHAT-ZAI.md`) and mirrored in ZAI.md: the shell works
  (batteries green, autosave laws landed, no 390 px overflow on either shell), the ring's defect is
  measured and mechanized, the seed seam is the highest-leverage open item, the C′1 export and the
  fence-check spec are blocked on the Architect, and the four tab strings are blocked on cutover.

## 9 · What I did NOT do, and why (mandatory)

- **No push, no credential helper, no token request** — §8.1. The zip is the delivery.
- **No re-cut of the c10 zip; no regeneration of any c10 manifest, MANIFEST.txt, or receipt** —
  §2.5/§8.2-3. The repair is one added file; the doc fixes ride as files/diffs with the three
  replacement manifest lines provided for whoever applies them.
- **No src/, dist/, package.json, engine, pin, protected-constant, product HTML, governance, or
  queue-row edits; no other seat's lane or inbox** — §8.4/§8.9. My writes: my zip staging tree and
  scratch copies only. The one file imported is the 6,418 B receipt file, exactly as §0.2 directs.
- **Did not re-run item-5 or item-6** — §8.5; both are done and receipted. Consequence: the "four
  item-6 JSON sha256s unchanged" check (§2.7) is NOT verifiable from any reachable branch — those
  receipts rode the previous sitting's zip; the c10 package contains exactly five JSONs, none
  matching the four hashes (checked by hashing every JSON in the package). I substituted the
  stronger proof that the repair touched nothing but the one added file (path-joined sha256
  before/after, zero changed), and I flag this limitation plainly rather than pretend the check ran.
- **Did not re-run the vapor experiment** — §8.6; receipts read and accepted only.
- **Did not reopen the framework** — §8.7. Svelte 5 + Vite 8 final; package.json untouched
  (VERIFIED — my writes never touched product paths).
- **Did not fix the C′1 ring** — §8.8; measured only. The fix needs an engine-view export; named
  for the Architect (cover §2 and shell-integrity.txt).
- **Did not silently fix a fourth stale line** — §8.10; the two extra copies (inkling/orcaink's own
  c9 folders) are REPORTED with the byte-truth table, and the same diff is offered for the Owner to
  apply if he wants every copy to carry the role wording.
- **Did not invent a number** — §8.11; every hash/byte count here came from a command quoted or
  named in this report or the zip's receipts. The two numbers I could NOT measure (the four item-6
  hashes; the Part-0 ACCEPT quote's original wording) are labeled UNKNOWN/REPORTED, not guessed.
- **Did not edit inkling's or orcaink's own c9 folders** — same fence as above; reported instead
  (their sentence is byte-true at their own bytes; the choice belongs to the Owner/Architect).

## 10 · Discrepancy block

1. **§3.7 ("after editing, the receipts must still pass") vs §8.3 ("do not regenerate the c10
   manifests").** Quoted both sides: §3.7 — *"After editing, the receipts must still pass. Re-run
   whatever gate applies to the doc layer in your scratch tree and record it. If a gate fails
   because of your edit, your edit is wrong — fix the edit, not the gate."* §8.3 — *"Do not
   regenerate the c10 manifests. They are correct. Adding the missing file makes them true."*
   What I saw: editing document bytes necessarily changes their md5s, and the c10 CHECKSUMS.txt
   lists those md5s — so ANY compliant doc edit makes three manifest lines stale; no wording can
   avoid it. Resolution (recorded, not silently picked): the doc-layer CONTENT gate passes before
   and after (gate-numerals CLEAN ×2 ×2 invocations, exit 0 ×4 — VERIFIED); the hash-manifest
   consequence is receipted exactly (46 OK / 3 FAILED = the three edited files; gate-manifest adds
   exactly one hash FAIL on the edited file over its baseline), and FIX-NOTES §6 provides the three
   surgical replacement lines so whoever applies the fixes restores the manifests with a line
   update rather than a regeneration. I held §8.3 for my own actions (nothing regenerated).
   Flagging it because the order's two clauses cannot both be literally true of the same edit.
2. **§0.4 said the three stale places are "the only three" (VERIFIED at the package's bytes) —
   true, and incomplete from GitHub-wide view.** I found the same sentence in pickle's hosted c9
   (false at its own bytes — its shipped dist is `76de5658…`, measured) and in inkling's and
   orcaink's own c9 folders (true at their own bytes — both dists `670d4c08…` there, measured).
   Per §3.5 I fixed the false one (hosted-c9 fix files) and reported the byte-true ones. No
   contradiction with the order — its claim was scoped to the package — recorded so nobody
   rediscoverd it by surprise.
3. **§4.4's premise "you have no browser and no display" does not hold in this sandbox** — I have
   a headless browser (agent-browser). I kept ROW 4's formal receipt as greps (the letter of the
   order) and used the browser for §4.1's measurement (which the order DID ask for) plus extra
   verification (the 27-pick curve, the w89 comparison, the file:// boot observation, labeled
   incidental). The §4.1 measurements are therefore VERIFIED rather than UNKNOWN — strictly more
   evidence than the order expected, none of it contradicting it (my readings match Ernie's where
   the state is deterministic: rows=60 everywhere, ringed=3 at pick 1, 60 at pick 27, order
   contiguous).
4. **The relay's own caveat, kept REPORTED:** the cover says its Part-0 ACCEPT quote is *"from
   Ernie's report of what you said to him, not from a verbatim note of my own."* I started cold
   this chat; I hold no independent record of that quote and nothing I measured contradicts it.
   Label: UNKNOWN from my seat. If the wording is wrong, the cover's correction procedure applies
   before anyone relays it onward.
5. **No other mismatches.** Every other prediction I could test matched exactly: the v3.0 blob sha;
   the three hosts' before-states (49/48/48, 52/51/51 files); the two dist hashes and sizes; the
   five measured differences; k1's 18 × EXIT_CODE=0; the vapor receipt's numbers; the `?seed=`
   line; the aria-describedby count. The `80eb432` context commit exists on the named branch.

## 11 · What the Owner owes

Per open item, with a recommended default and what stays blocked meanwhile. (No invented items —
these are the ones the order and the rulings name.)

1. **Apply the repair + doc fixes to the hosts** (the one push-shaped action my zip cannot do).
   Default: follow `deliverables/repair/REMEDY.md` (copy one file, expect 49/49 ×2) and
   `deliverables/doc-fixes/FIX-NOTES.md` §5–§6 (copy three files per byte-state + update the three
   CHECKSUMS md5 lines in the same action). Blocked meanwhile: the inkling/orcaink hosts keep
   verifying 48/49 and the package keeps contradicting itself on the two dists.
2. **Rule the C′1 engine-view export** (`raw: { wins, priority }` on BoardRowVM) — the Architect
   owns it; the Owner's w89 preference is the direction. Default: approve the export at the next
   re-pin (d3bd81d2 is already the newest snapshot — the export can ride it). Blocked meanwhile:
   the ring keeps ringing up to 60 rows; w89's look stays unreachable.
3. **Correct the relay's Part-0 quote if my seat's UNKNOWN is wrong** (discrepancy §10.4) before
   the prompt is relayed onward. Default: leave as-is — nothing contradicts it. Blocked meanwhile:
   nothing.
4. **Product track, at cutover (no Owner word needed now, recording per cover §2):** C′1 visual
   match to w89; the four stats tabs SEASON STATS / PLAYOFF STATS / YOUR PLAYERS / LEAGUE LEADERS
   (ALL CAPS). Blocked meanwhile: the fence (product edits are not this sitting's).

## 12 · Zip contents + verification

Zip name: `z-post-blue-docs-update-2026-11-19-v3-sitting.zip`. Contents (paths inside the zip):

```
UPDATE-README.md
CHECKSUMS.txt
_agents/zai/END-OF-CHAT-ZAI.md          (unchanged — e52c0ddb…)
_agents/zai/START-OF-CHAT-ZAI.md        (§2 rewritten with this sitting's state)
_agents/zai/ZAI.md                      (lane file rewritten)
deliverables/OWNER-INTAKE-2026-11-19-v3.md
deliverables/plain-language-part0.md
deliverables/shell-next-five.md
deliverables/w89-vs-cakepanz.md
deliverables/zai-this-sitting-report-2026-11-19-v3.md   (this file)
deliverables/doc-fixes/FIX-NOTES.md
deliverables/doc-fixes/c10-package.diff
deliverables/doc-fixes/hosted-c9.diff
deliverables/doc-fixes/c10-package/cakepanz-4/SHELL-STATUS.md
deliverables/doc-fixes/c10-package/cakepanz-4-prepared/SHELL-STATUS.md
deliverables/doc-fixes/c10-package/ledger/build-report-zai-cakepanz-9-2026-11-19.md
deliverables/doc-fixes/hosted-c9/cakepanz-4/SHELL-STATUS.md
deliverables/doc-fixes/hosted-c9/cakepanz-4-prepared/SHELL-STATUS.md
deliverables/doc-fixes/hosted-c9/ledger/build-report-zai-cakepanz-9-2026-11-19.md
deliverables/repair/REMEDY.md
deliverables/repair/slice1-battery.json
deliverables/shell-integrity/shell-integrity.txt
deliverables/vapor-mode-experiment-2026-11-19/RESULTS.txt
```

Verification outputs (pasted from the final build; run in a fresh extract to /tmp/zipverify):

**`unzip -t` — exit 0, all 23 entries OK:**

```
Archive:  /home/z/my-project/download/z-post-blue-docs-update-2026-11-19-v3-sitting.zip
    testing: UPDATE-README.md         OK
    testing: _agents/zai/END-OF-CHAT-ZAI.md   OK
    testing: _agents/zai/START-OF-CHAT-ZAI.md   OK
    testing: _agents/zai/ZAI.md       OK
    testing: deliverables/OWNER-INTAKE-2026-11-19-v3.md   OK
    testing: deliverables/doc-fixes/FIX-NOTES.md   OK
    testing: deliverables/doc-fixes/c10-package.diff   OK
    testing: deliverables/doc-fixes/c10-package/cakepanz-4-prepared/SHELL-STATUS.md   OK
    testing: deliverables/doc-fixes/c10-package/cakepanz-4/SHELL-STATUS.md   OK
    testing: deliverables/doc-fixes/c10-package/ledger/build-report-zai-cakepanz-9-2026-11-19.md   OK
    testing: deliverables/doc-fixes/hosted-c9.diff   OK
    testing: deliverables/doc-fixes/hosted-c9/cakepanz-4-prepared/SHELL-STATUS.md   OK
    testing: deliverables/doc-fixes/hosted-c9/cakepanz-4/SHELL-STATUS.md   OK
    testing: deliverables/doc-fixes/hosted-c9/ledger/build-report-zai-cakepanz-9-2026-11-19.md   OK
    testing: deliverables/plain-language-part0.md   OK
    testing: deliverables/repair/REMEDY.md   OK
    testing: deliverables/repair/slice1-battery.json   OK
    testing: deliverables/shell-integrity/shell-integrity.txt   OK
    testing: deliverables/shell-next-five.md   OK
    testing: deliverables/vapor-mode-experiment-2026-11-19/RESULTS.txt   OK
    testing: deliverables/w89-vs-cakepanz.md   OK
    testing: deliverables/zai-this-sitting-report-2026-11-19-v3.md   OK
    testing: CHECKSUMS.txt            OK
No errors detected in compressed data of /home/z/my-project/download/z-post-blue-docs-update-2026-11-19-v3-sitting.zip.
```

**`md5sum -c CHECKSUMS.txt` — 22/22 OK, exit 0 (every file the manifest lists):**

```
UPDATE-README.md: OK
_agents/zai/END-OF-CHAT-ZAI.md: OK
_agents/zai/START-OF-CHAT-ZAI.md: OK
_agents/zai/ZAI.md: OK
deliverables/OWNER-INTAKE-2026-11-19-v3.md: OK
deliverables/doc-fixes/FIX-NOTES.md: OK
deliverables/doc-fixes/c10-package.diff: OK
deliverables/doc-fixes/c10-package/cakepanz-4-prepared/SHELL-STATUS.md: OK
deliverables/doc-fixes/c10-package/cakepanz-4/SHELL-STATUS.md: OK
deliverables/doc-fixes/c10-package/ledger/build-report-zai-cakepanz-9-2026-11-19.md: OK
deliverables/doc-fixes/hosted-c9.diff: OK
deliverables/doc-fixes/hosted-c9/cakepanz-4-prepared/SHELL-STATUS.md: OK
deliverables/doc-fixes/hosted-c9/cakepanz-4/SHELL-STATUS.md: OK
deliverables/doc-fixes/hosted-c9/ledger/build-report-zai-cakepanz-9-2026-11-19.md: OK
deliverables/plain-language-part0.md: OK
deliverables/repair/REMEDY.md: OK
deliverables/repair/slice1-battery.json: OK
deliverables/shell-integrity/shell-integrity.txt: OK
deliverables/shell-next-five.md: OK
deliverables/vapor-mode-experiment-2026-11-19/RESULTS.txt: OK
deliverables/w89-vs-cakepanz.md: OK
deliverables/zai-this-sitting-report-2026-11-19-v3.md: OK
```
