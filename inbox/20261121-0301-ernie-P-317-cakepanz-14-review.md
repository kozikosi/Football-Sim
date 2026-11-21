SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: independent review of Z.ai's cakepanz-14 S14 delivery — the ring revival, the P0 link/autosave fix, the receipt-accuracy set | DATE: 2026-11-21T03:10Z

REVIEW-OF: `_agents/ernie/deliveries/zai-cakepanz-14-2026-11-20/cakepanz-14/` (Z.ai's S14 tree, 468 files,
  18 MB, hosted read-only on my branch; delivered `CHECKSUMS.txt` 467 entries, md5)
VERDICT: **improved**
WHAT I RAN: node v26.13.0. `tools/verify-package.mjs` (pristine) · `npm ci` · `npm run test:engine` ·
  `battery:node` · `battery:board` · `battery:visual` · `battery:slot` · `shell.battery.mjs` ·
  `battery` (slice) · `contrast.battery.mjs` · `viewport-matrix.mjs` · `golden-seam.mjs` ·
  `gate-manifest.mjs` · `regen-manifest.mjs` · **my own F25 mutant** (re-planted in a scratch copy) ·
  **my own save-recovery and stamp probes** · `git cat-file` / `git ls-tree` / `git archive` against
  the pin. Raw stdout: `_agents/ernie/deliveries/ernie-cakepanz-14-rerun-receipts-2026-11-21/`.

## 0 · What I confirmed (VERIFIED — reproduced at my machine, not read from the prose)

| claim | my receipt |
|---|---|
| 467 OK / 0 FAILED / 0 missing + converse clean, exit 0 | `01-verify-package.txt` |
| engine **430/430** · node **35/35** | `02-gates.txt` |
| board **19/0** — L24 `Wins/Priority/OVR:array-exact`, L23 `zpbBtnPulse/1.5s`, L25 `why 3/3 · persisted · restored · moved` | `02-gates.txt` |
| visual **18/0** — W12 `url===store`, W13 `pinned=1 cleared=true`, W14 both directions | `02-gates.txt` |
| slot **28/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** (3 named team holes, 0 new token holes) · viewport **45/45, 0 overflow, 0 errors** · golden **MATCH** `e8fed8ab…` | `02-gates.txt` |
| engine byte-identical to the pin: 69/69 files, `draftBoard.ts` sha256 `e9e6e01a…` both sides; no drift at the Architect's head (`7d8d71c3`) | `03-engine-fence.txt` |
| D1 was right: the pin has **no** `colors/test/engine.test.ts` (60 files under `colors/test/`); the handoff now says GENERATED/regenerated, `test/engine/**` re-pointed | `03-engine-fence.txt` + `MERGE-MANIFEST.md:23,44` |
| the seedCode comment is correct now: `parseInt('a3f2',36)===470990`, `(511086).toString(36)==='aycu'` | `src/lib/port/seedCode.ts:15-17` |
| all four standalone batteries carry `assertFreshServer` | `batteries/*.mjs` |
| **not a tautology** — I re-planted the F25 mutant myself: board **18 pass / 1 fail**, `FAIL L25 … persisted=false · ring===stored=false` | `02-gates.txt` §8 |
| offline: `dist/single.html` has **no external refs**; both woff2 faces are `data:font/woff2;base64`; shell S26–S28 file:// clean | `02-gates.txt` |
| L23's colour is token-borne (`--glow: color-mix(in srgb, var(--goldm) 28%, transparent)`), no new hex; `zpbstarglow` correctly NOT ported | `shell.css:5,172-183` |

The D-2 guard earned its keep on my own machine: another seat's preview already owned :4179 and
served *its* build (`index-CqNg1gtO.js` vs my `index-BZF5JLE6.js`). Without `assertFreshServer` my
first run would have been a green read over the wrong bytes.

## 1 · Defects (each shown by a command, not inferred)

**D1 — BLOCKER for the composite: the shipped tree cannot pass both of its own manifest gates.**
`gate-manifest.mjs` FAILS on the delivered bytes:

```
MANIFEST FAIL (unlisted): scripts/fresh-server.mjs
MANIFEST FAIL (unlisted): scripts/probe-w14.mjs
MANIFEST FAIL (unlisted): src/lib/port/suggestWhy.ts
gate-manifest: FAIL                                                     (exit 1)
```

and after the composite's step 14 (`regen-manifest.mjs`) the *other* verifier fails, because the two
tools disagree on the digest algorithm — `regen-manifest.mjs` writes **sha256** (64 hex) into
`CHECKSUMS.txt`, `verify-package.mjs` parses **md5** (32 hex):

```
$ node scripts/regen-manifest.mjs   → regen: 357 entries
$ node scripts/gate-manifest.mjs    → gate-manifest: PASS (357 entries …)   (exit 0)
$ node tools/verify-package.mjs .   → verify-package: 467 EXTRA file(s) …   (exit 1)
$ head -1 CHECKSUMS.txt | awk '{print length($1)}'   → 64
```

467 EXTRA = *every file*, because nothing matches the 32-hex regex and the listed-set is empty. So
the composite **cannot** reach "ACCEPTANCE RUN COMPLETE" with green gates: step 14 breaks
verify-package; skipping it leaves gate-manifest red. Fix is one policy line (pick md5 **or** sha256;
teach the other tool to accept it) + re-run 14–17. Root cause is a contradiction inside the same
zip: the README says "the portable verify is `verify-package.mjs`", `regen-manifest.mjs`'s header
says "regenerate CHECKSUMS.txt (sha256 …)".

**D2 — the composite is PARTIAL and three of its step labels are stale (self-declared, confirmed).**
`ACCEPTANCE-RECEIPTS.txt` has 16 × `EXIT_CODE=0`, stops at the step-13b header with nothing under
it, never says "ACCEPTANCE RUN COMPLETE", steps 14–17 absent. Also `acceptance-run.sh:41` "expect
**16/0**" (tree 19/0), `:43` "expect **17/0**" (tree 18/0), `:52` "F0-board clean baseline **16/0**"
(tree 19/0). Cosmetic for the counts; not cosmetic for the missing tail.

**D3 — `SHELL-STATUS.md` ships describing a build that is not in the box.** Measured (T6) and pinned
(`68ad7c9e…`), but its own stamp is `GENERATED 2026-11-20T18:26:53Z` and it hashes
`index-Bymoqk0d.js — 389211 B — 8c9ef26b…` / `single.html — 533812 B` while the shipped `dist/` is
`index-BZF5JLE6.js — 390846 B — c05faa33…` / `single.html — 536259 B`. Step 13d regenerates it; the
composite never reached 13d. **Defect today, self-healing at the next composite** — name it in the
hand-over note rather than silently fixing it.

**D4 — the W14 notice promises more than the code keeps: one START later the autosave is gone.**
W14 asserts the notice, the untouched autosave and the URL *before* START. Past it:

```
A. MY SAVE            : savedSeed 7874343 · 43 picks · board
B. FRIEND LINK        : savedSeed 7874343 · 43 picks · team  notice "shared link opened; your local save is untouched"
C. AFTER START ON LINK: savedSeed  935613 · 20 picks · board   ← the autosave now holds the LINK's draft
D. STRIP ?seed= BY HAND: savedSeed  935613 · 20 picks · board  ← my 43-pick save does not come back
pageErrors: 0
```

Correction to my first pass: the shell **does** have manual draft slots (`Saves.svelte` → A/B/C,
`saveDraftSlot`/`loadDraftSlot`), so a user who saved to a slot can recover. The *autosave* cannot —
and nothing on the link path offers the slot. So the sentence is true when shown and false ten
seconds later. Cheapest honest fixes: (a) reword to "…will be replaced when you start this draft";
(b) before the linked draft autosaves, copy the current autosave into slot A (one call, machinery
already there) — then the promise is literally true and the Saves panel is the recovery path; (c) the
full fix is a second autosave slot. Counter-argument, stated fairly: an autosave mirrors *current
state* by design and a visitor who starts a draft has expressed intent — which is why I file the
wording (a) as the defect and (b) as the one-line improvement.

**D5 — NEW, and in product bytes, not docs: the shell stamps a stale pin into every save and then
warns the user about its own build.** `src/App.svelte:83` is
`const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the *previous* pin (the shipped engine is
`408410477`). `metaNow()` writes it into every autosave and every manual slot envelope, and
`Saves.svelte:80` renders `olderBuildNote(sum, engineVersion())` against the *running* engine stamp
(`nfl1.<hash53>`, here `nfl1.1ac56c28928eff`). They can never match, so the panel says:

```
slot A now: Slot A DRAFT · rev 21 20 picks · Chicago Bears … this save came from build
  67-cakepanz@d3bd81d2 (running: nfl1.1ac56c28928eff) — logged picks hold; un-made picks may differ
slot A envelope engineVersion: 67-cakepanz@d3bd81d2
```

i.e. every save the running build writes is flagged as foreign, and the recorded provenance is a pin
that is not the shipped one. This is the same defect class the sitting's P1 "receipt-accuracy set"
fixed in prose, still live in the product. Fix: derive the stamp from the seam
(`engineVersion()` for the engine stamp, plus a shell build sha) or at minimum set the constant to
the real pin `408410477`; then re-run the node battery (the envelope shape is asserted there).

**D6 — calibration, not a defect:** L13 and the tie extension are still display-rounded and the law
text says so; the `rawSort` proposal is correctly marked `BLOCKED (engine half)` with a matching
paired diff. Recorded so "ring restored" is not read as "ring correct on ties".

**D7 — governance tension I will not resolve from inside the tree (decision boundary).** My lane
holds the Owner's 2026-11-20T23:38Z ruling *"remove the ring"*; the live S15 order lists both
*"top-three stays / why copy stays"* and *"remove-ring-and-panels"*. Those cannot all hold. My
recommended narrow reading (drop the gold highlight/pulse if that is what "remove the ring" meant;
keep the ordered top-three and the `why` line as information) is the only one that satisfies both
sentences — but it is the Architect's call with the verbatim text, not my paraphrase.

## 2 · The weakest point of this work

The evidence is stronger than the packaging. Every law it claims is real — I broke one myself and
watched it die by name — but the package's own closure tools (D1) disagree, so the composite that
would prove closure has never run to the end, and two files in the same zip state different digest
policies. Worse, the same "the stamp says something the bytes do not" habit survives in the product
(D5): a reviewer who trusts the prose gets a green tree; a reviewer who runs step 15, or saves a
draft, gets a contradiction.

## 3 · Verdict

**improved.** Product, laws, receipts and the engine fence are sound and independently reproduced.
D1 blocks the composite (fix the digest policy, re-run 14–17, re-host). D2/D3 are paperwork the
re-run heals. D4 needs one Owner-level decision (note vs one-line auto-slot) — I supply the snippet.
D5 is a small, high-value product fix with a two-line change and a node-battery re-run.
D6 is labelled honestly; D7 is the Owner's/Architect's.

— ERNIE (advisor; signs as ERNIE, never as another seat)