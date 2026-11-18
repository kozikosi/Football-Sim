SPEAKER: INKLING (MUSE delegation) | TASK: cakepanz-8.1 delivery review — the cakepanz-8 review-closure round
(Z.ai's sitting of `deliveries/zai-cakepanz-8.1-2026-11-18.md` v2 @ `596bd94f`) as delivered to the Owner's Desktop,
hosted for review on this branch, with commands and receipts
DATE: 2026-11-18T23:44Z · English only

REVIEW-OF: `67-cakepanz-8.1-2026-11-18/` (the Owner's Desktop delivery — pushed to this branch as
`_agents/inkling/67-cakepanz-8.1-2026-11-18/` @ `5fb4989a`, 910 files; the source folder is byte-identical to the
hosted copy — `diff -rq` exit 0; zip hash `eb570c71…e4aa4e` REPORTED by z.ai's sitting message, not re-verifiable
from here)
VERDICT: **improved** — the five user-facing fixes are real and verified at the delivered bytes; the engine, pins and
flex are byte-identical to the Architect's pins; every load-bearing green claim re-verified by my own runs. The
remaining defects are receipt/doc-hygiene items — one of them (finding 1) is the exact class this round was written
to kill, and it is fixable with four doc-only edits away from `ok`.

---

## 0. What this round is (for a fresh reader)

cakepanz-8 shipped with a dead control (the simple row's "one click away" detail did not exist), a mode choice lost on
refresh, a completing-pick → stale-board trap, a red numerals gate wearing a green receipt, and one hash naming its own
previous bytes. The 8.1 order (v2) closed all of it: Block 1 (the five fixes), Block 2 (receipt/doc hygiene), Block 3
(three new laws L7–L9 + a process law L10 + falsifiers F14–F16). One item was honestly left open by the sitting: the
`acceptance-run.sh` end-to-end composite (L10). That story is not what the delivered bytes show — see finding 1.

## 1. What I checked, with commands (VERIFIED = I ran it in this window)

Hosting and integrity:
- Pushed `67-cakepanz-8.1-2026-11-18/` to this branch (`_agents/inkling/67-cakepanz-8.1-2026-11-18/` @ `5fb4989a`,
  910 files; `engine-node/` and `deliveries/receipts/slice1-battery.json` excluded by the delivered trees' own
  `.gitignore`, as intended; `git status` clean after hosting). Source-vs-hosted `diff -rq` exit 0; spot-cmp on
  VERIFY.txt/README-DELIVERY.md/WHAT-CHANGED.md — identical.
- **Trees differ only where they must:** `src/engine/sports/nfl/sim/game.ts` differs, `sim/passclass.ts` exists only in
  the prepared tree (both match the documented engine delta); `src/` outside the engine is identical between the trees;
  `dist/` byte-identical between the trees (`4ce69205b72a…057a`).

Engine and pins (the load-bearing product claims):
- shipped `src/engine` == `git archive 5c808472 colors/src` → exit 0 (67 files); prepared `src/engine` ==
  `git archive 65673a00 colors/src` → exit 0 (68 files); cross-diffs are exactly the two documented files. **Pins VERIFIED,
  nothing moved.**
- flex.ts `70d1bb9c…` identical ×2 trees (the c8 canary value); flex.json `76c02c65…6a6a` identical ×2 trees; census
  re-computed from the table: **99 rules {"0":17,"2":17,"6":42,"12":23}**, SS>NICKEL=0 FB>TE=2 FB>RB=2 C>OG=6 OG>C=2
  QB>FS=12 — matches the order's expected table.

Builds and suites (my own runs, node v26.13.0):
- `npm ci` then `npm run test:engine`: shipped **394/394**, prepared **406/406** (≈40 s each).
- `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs`: **33/33** both trees.
- `node scripts/gate-manifest.mjs`: **PASS (314)** shipped, **PASS (319)** prepared (regen not re-run by me; gate re-run).
- `node scripts/gate-numerals.mjs`: shipped (default CP_PIN) **CLEAN**, prepared (default CP_PIN) **CLEAN** — see finding 3
  for the documented-prepared-invocation caveat.
- `npm run distfile` in a scratch copy of each tree → `dist/single.html` recomputes to **exactly
  `4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a`** in BOTH trees — byte-reproducible build, VERIFIED.

Browser legs (my own runs, playwright chromium-1200, preview servers on 4611/4612, then closed):
- Shell battery: **47/0** both trees (S1a–S31).
- Slice battery: **29 pass · 0 fail · 10 loud skips · 3 deferred** both trees.
- Late battery: **9/9** both trees — including L8 driven through the real UI to the user's 32nd pick (lands on Complete;
  hash door `#/board` → `#/complete`), L9 (reload → FULL, restoredPicks=12; NEW draft → the 11th-pick flip re-offers),
  L4 (VM sha equal across the flip), L2 (shown number tracks WINS/PRIO sort), L7 (detail one click away).

Docs and receipts (read in full where named):
- `VERIFY.txt §22` present in both trees (identical bytes): §22.1 numerals receipts, §22.2 citation audit, §22.2b
  three-copy byte-identity, §22.3 the 11-row transitions matrix (row 6's direct-loadDraft leg NAMED and flagged for the
  next round, per the order), §22.4 absence-law pointer.
- START-OF-CHAT-ZAI.md ×3 = sha `8ef3b18df08f…` (byte-identical, re-measured); FIX-RECEIPT.md ×3 = sha `1b9bea5f…`
  (byte-identical, re-measured) — both match the quoted §22.2 values.
- `ACCEPTANCE-RECEIPTS.txt` in both trees — read in full and diffed against the cakepanz-8 copy; see finding 1.
- `receipts/partH-c8-1/` — present (h*, m1, b0, **k1/k2**); see finding 1.
- `WHAT-CHANGED.md` — 8.1 section read in full; the absence-law audit table is real; the L9 false-green catch is recorded
  honestly (the battery's store-dispatch pick path skipped `autosaveDraftNow`; F16 returned TAUTOLOGY; fixed by landing one
  real UI pick before the reload).

**Not run by me (REPORTED, not VERIFIED):** the falsifier set (F0-late, F13–F16, receipt/shell falsifiers — receipts h8/h9/
h10b are internally consistent and their plants are byte-exact inverses of the fixes, but I did not execute them); the A2
mutation (h18); the fresh-clone composite (m1); `bash scripts/acceptance-run.sh` end-to-end (see finding 1 — its shipped
output exists and I audited it statically; the prepared composite is genuinely unfinished). The Desktop folder is the
delivered bytes by z.ai's account; the zip's sha256 is REPORTED, not verified (the zip is not on this machine).

## 2. Findings (at the delivered bytes)

**Finding 1 (defect — receipt integrity; the one that matters). The shipped `ACCEPTANCE-RECEIPTS.txt` is the completed
final-state acceptance run, mislabeled by the pointer on top of it.** The §5.2 pointer (added in the final-minutes sprint)
says: "The 8.1 sitting's composite … was STARTED at the final bytes but could not complete … this file below is the
cakepanz-7-era record, kept as history." At the delivered bytes that is true of the **prepared** tree only:

- The **shipped** file contains the 8.1-only steps (3: "expect 33/33 … N28 RESUME law + N29 DONE-DRAFT law"; 8b; 13b running
  F14–F16 → DIED), final-state numbers ("found 0 vulnerabilities", node battery 33/33, shell 47/0, late 9/9 with restoredPicks=12),
  ends `== ACCEPTANCE RUN COMPLETE — every step exit 0 ==`, and carries **18 × `EXIT_CODE=0`, 0 × `EXIT_CODE=1`**.
- `receipts/partH-c8-1/k1-acceptance-run-shipped.log` contains exactly one line: `acceptance run complete → ACCEPTANCE-RECEIPTS.txt`
  — the script's own final echo. The script redirects each step's stdout into the file; the outer stdout is only that line. The
  shipped composite therefore **ran to completion at (post-sweep) final bytes**; k1 is its completion receipt.
- The **prepared** file ends at step 8b (`== 8b. the late-draft battery …` then the pasted 9/9 stdout is absent — the file stops
  at the step banner), 8 × `EXIT_CODE=0`, 0 × FAIL — consistent with the time-cutoff kill. k2 is **0 bytes**. The prepared pointer
  is honest.

So the delivered package simultaneously asserts "L10 is the round's one open item" (README-DELIVERY line 38; WHAT-CHANGED §5.2;
VERIFY §22's L10 flag; both pointers) and **ships the shipped tree's completed acceptance receipt** labelled "the cakepanz-7-era
record … when it completes". The §5.2 law ("do not ship a red or self-contradicting receipt; both current copies must go") was
applied to the wrong copy and the right one kept a contradicting tail. NET EFFECT: **L10 is closed for the shipped tree, open
for the prepared tree** — one sentence fix per doc, plus either removing the pointer from the shipped file or rewriting it to
"the final-state run IS this file (all steps exit 0); the prepared sibling died at step 8b (k2 empty), finish it next sitting".

**Finding 2 (defect — doc honesty, same bytes).** `README-DELIVERY.md` contradicts itself within 50 lines: line 9 (Verdict)
asserts "the numerals gate runs CLEAN, the acceptance script completes end-to-end", while line 38–45 says the script "could not
complete inside this sitting's time budget". Line 9 is true only of the shipped tree and false of the prepared tree; line 38 is
true only of the prepared tree and false of the shipped tree. Same scope error in WHAT-CHANGED (§5.2, L10 entries) and VERIFY §22.
One honest sentence per file fixes it.

**Finding 3 (defect — gate contract, LOW–MED).** `gate-numerals.mjs` was verified only under the default CP_PIN=5c808472 in both
trees (h21, h23, m1; and my re-run). The script's own inline contract — "the prepared copy names 65673a00; run with
CP_PIN=65673a00 there" — **fails**: `MERGE-GUIDE.md` contains **0** occurrences of `65673a00` (all other gated files pass — README 4,
SNAPSHOT 4, MERGE-README 4, SHELL-STATUS.md 1, VERIFY.txt 14). So "CLEAN ×2 both trees" is VERIFIED under the default invocation
and **not** under the documented prepared one. Cheapest fix (one line, zero meaning change): MERGE-GUIDE's pin line gains
"(prepared sibling: 65673a00 — NOT activated)"; or teach the gate a per-tree mode; or record the CP_PIN used in §22.2. As written,
the receipt set cannot catch a prepared-tree that stopped naming its own pin.

**Finding 4 (defect — doc hygiene, LOW).** `RECEIPTS.md` (package root) prints final-state numbers from the c7 sitting under
"(at the final state)" headers — gates "PASS (**311**/316 entries)" (final: **314/319**), shell battery "**46 pass · 0 fail**"
(final: **47/0**), node battery "tests 31 / pass 31" (final: **33/33**) — and sits **outside** `gate-numerals.mjs`'s FILES list
(README.md, SNAPSHOT.md, MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md, VERIFY.txt), so nothing catches it. The file's own title
is "ERNIE · cakepanz-7 review receipts" and the partH-c8-1 index at its foot does not carry a banner telling the reader the top half
is superseded history. One banner line (or add RECEIPTS.md to the gate's FILES list — a tooling call for Architect/MUSE) closes it.

**Finding 5 (risk — provenance, UNKNOWN).** The Desktop folder == the hosted copy (verified byte-wise), but neither is **proven**
to be the zip's contents: every internal cross-check that could tie them together passed (dist sha, flex sha, pin bytes, three-copy
cmp ×3, START-OF-CHAT ×3, §22.2 values), which is strong circumstantial evidence, not proof. The zip sha `eb570c71…e4aa4e` is
REPORTED. If the Owner wants a hard chain, re-hash the Desktop folder against the unzip of the zip once — one command.

**Finding 6 (intentional simplification — noted, fine as-is).** `Hub.svelte`'s parenthesized `cp-played` is equivalent to
`n < season.slot` (the first clause is subsumed by the second); the parentheses state the intended `(a && b) || c` and change
nothing. `BoardRow.svelte` carries WINS/PRIO/OVR captions rather than the order's suggested GONE% — the order's caption list
named a sort that does not exist; z.ai captioned the ACTUAL sorts and said why in WHAT-CHANGED §4.5. Both correct; neither needs
action. (The caption titles are honest and the L2 battery asserts the WINS/PRIO walk.)

**Finding 7 (observation — the round's real lesson).** The L9 false green is the most valuable event of the sitting: the battery's
store-dispatch pick path skipped the autosave, the reload restored a 0-pick draft, myPicks=0, the board was trivially FULL — L9
passed for the wrong reason, and F16 caught it returning TAUTOLOGY. The fix (one real UI pick before the reload + a restoredPicks
guard) is in the bytes; my re-run prints `after reload: form=full restoredPicks=12`. A false green is worse than a red — one level
up from the absence-law lesson, exactly the right place to learn it, and it is now pinned by F16 + L9.

**Finding 8 (notes — Owner-gated, unchanged, correctly untouched).** gh-pages fix STILL NOT PLACED (the two-file zip); the prepared
re-pin NOT activated; Block C not started; the league-size calibration flag (hy4: 12-team → the simple form lands with ~4 rounds
left) still open for the Owner; overall-320 vs user's-10th still the Owner's; the three-choice card / Complete roster print /
simpleRows module / "Explain my next pick" / wall-slip reveal / visual-regression harness — all filed for the next round, none
built here, correctly.

## 3. Weakest point of the work

The **receipt layer**, not the product layer. The 8.1 code is real, minimal, and verified in my hands; the delivery's own final
state then shipped a receipt pair (finding 1) that contradicts itself in-file — the precise "confident prose over a red/contradictory
receipt" class the order was written to kill, surfacing in the last 30 minutes of a time-boxed sitting. A fresh machine can trust
the bytes and the laws; it cannot trust the "L10 open" banner without opening `RECEIPTS.txt` and `k1` itself — which is exactly the
work a reviewer should not have to do. The fix is wording, but the lesson is structural: the acceptance script must self-declare
what it did and did not finish (a trailing JSON line), and the §5.2 pointer must be applied by the tool on non-zero exit — never
by hand under time pressure.

## 4. Verdict rationale and what `ok` needs

Two seats' ok/improved closes the chain. This one is **improved**: it independently re-verified every load-bearing claim (pins,
flex, dist, suites, all four battery families, gates, three-copy cmps), confirmed the five fixes at the bytes, and found four
doc-class defects including the one receipt that contradicts itself across two files. **`ok` needs four doc-only edits** (no code,
no new verification beyond re-running gate-numerals + the cmp ×3):
1. Correct the shipped `ACCEPTANCE-RECEIPTS.txt` pointer (it IS the completed run; cite it as such) — or delete it.
2. Scope README-DELIVERY's two receipt claims per tree (shipped complete / prepared open at 8b).
3. The MERGE-GUIDE one-line `65673a00` mention (or the gate's per-tree mode).
4. The RECEIPTS.md superseded banner.

## 5. Further implications of this round, and where cakepanz goes next (the innovation brief the Owner asked for)

**What 8.1 decided that the product now inherits (design consequences):**

1. **Draft-scoped state is now living in the settings document** (`fullBoard` + `startDraft`'s reset + `loadDraft`'s non-clear).
   Settings.json is a *global* store; THIS round made it carry a *per-draft* boolean. It works today because there is exactly one
   such bit; it will not stay clean — the next draft-scoped preference (e.g. "keep the flip silent this draft") will breed beside it
   and a crashed draft leaves zombie prefs forever. **Proposal (for the Architect, not this zip):** a tiny `draftPrefs` object beside
   the autosave meta (pickle's §4.3 alternate route, which was explicitly available with the Architect's ack) — settings stays
   global, draft state stays with the draft, and the reload-restore law (L9) gains a natural home. One migration line, zero engine.
2. **L4's pattern (frozen-state VM-sha equality across a mode flip) is now the shell's mode-system template.** Any future simplified
   or themed "modes" (rookie mode, GM mode, analyst mode) must ship with (a) a VM-sha law, (b) a presence law, (c) a falsifier. The
   8.1 round is the proof-of-concept that presentation layers can be made provably engine-neutral — do not let the cutover reintroduce
   unproven modes.
3. **The transitions matrix (VERIFY §22.3) is the right artifact and it must become executable.** Eleven rows, one flagged gap (row 6:
   the direct `loadDraft` leg). If the shell had a `transitions.battery` consuming that matrix as a fixture — one law per row — a
   screen flip could never ship unlawed again. This is the cheapest structural win available before cutover: the matrix exists, it is
   honest, and it is currently prose.
4. **The absence-law rule (every `=== 0` ships with a presence pair or an honest scope label) is the most transferable thing this
   round produced** — it generalizes to any DOM/test suite and it is what caught nothing this round (it was written *after* the
   blindness). Propose it as a standing law for the Colors v1 cutover gate, not a cakepanz custom.
5. **The acceptance script should be the cutover's CI smoke.** It already stages the whole user journey (npm ci → build → preview →
   UI batteries → falsifiers → gates) and ends green at final bytes for the shipped tree. The missing piece for CI is the self-declared
   status line (finding in §3): `acceptance-run.sh` writing `{"result":"ok"|"fail-at:<step>","tree":"shipped|prepared"}` as its last
   stdout line, plus the §5.2 pointer applied by the tool itself on non-zero exit. Until then, the L10 law cannot be enforced — it can
   only be remembered.

**Ranked ideas for the shell (value × effort; all offline-first, engine untouched, presentation only unless named):**

A. **The flip deserves ceremony.** At the user's 10th pick (the 8.1 flip), give the board a one-time "Rookie wall" moment: a
   reduced-motion-aware 3 s shimmer line ("The board simplifies — you know this roster now") shown once per draft via the same
   persistence mechanism 4.3 used (`seenFlip` in settings/draftPrefs). The simple mode already exists; this makes the mode *felt*.
   Cost: one component + one boolean. Law: L-pair template from L1.
B. **Make Complete the season's front door, with three engine-derived lines.** After the completing pick (post-L8, the one screen
   every user reaches): "Your best pick (by value) · the steal of the draft (latest pick by priority) · the gasp (earliest pick by
   gone%-weighted loss)". All three are deterministic reads of the record + boardVM — no new math, no invented data. Today Complete
   is a provenance stamp + three buttons; this makes the draft's ending an event, which is the product's whole emotional contract.
C. **Deep-link every board term to its live definition.** One `cp-tip` registry; every advice line on the board ("gone%",
   "priority", "fits") gains a one-sentence tooltip interpolating the LIVE number ("replayed N times between your picks") — the same
   comprehension ruling the fitlbl and Guide serve, delivered at the point of need. The Guide screen stays, but nobody needs it.
   Cost: one registry + string templates; zero engine; zero new data.
D. **Design at 390 px first; let it breathe at 1180.** Formalize the phone grid as a CSS container query (`@container (max-width: 430px)`)
   rather than per-screen media-query overrides; the L5/S25b laws pin it. The simple row's grid (1fr 44px 72px 56px) is already
   phone-plausible — this turns it from accident into architecture.
E. **"Explain my next pick" — the model becomes legible.** For the top candidate row only: one sentence composed from template +
   engine numbers ("Ranked 2nd by priority · 71% gone before you · fills your WR2"). NO LLM, NO new data — a formatter over boardVM +
   flex + priority, the exact thing L2 asserts on. This is the single strongest "Claude's engine, felt" feature the shell can add
   without touching the engine, and it strengthens every screen's honesty (the number shown is the number it shows).
F. **The gold palette has an AA hole and it is fixable today.** Light `--gold2 #e6c67d` on pale rose is 1.51:1 (the delivery's own
   contrast receipt shows it). Split the token: `--gold2-display` (shimmer/large only) and `--gold2-text` (small text — deep gold,
   e.g. `#8a5f18`, mirroring the V23 doctrine's "deeper gold for small text"). One tokens edit; the "no orange, no orange-drift, gold
   legible on rose" class dies permanently. Owner word wins if he rules otherwise — flag it, do not invent wording.
G. **Shareables from the VM, not from a mock.** Slice 5 wants share cards; the shell already has a byte-stable dist and deterministic
   VMs — render a 1080×1350 canvas card offline from the draft record (record + best pick + the 20-0? stamp) with `toDataURL`.
   No fetch, no network, unsigned exports fine. It ships the Owner's marketing surface from the same data the board showed — zero
   drift, zero cost.
H. **The "20-0?" stamp as a season-long stake.** A persistent low-key chip on Season surfaces ("20-0? · week 6 · 1 loss down" /
   "20-0? intact") — honest stakes, from the record alone. It is the product's name as a felt object, and it costs one component.
   When the season dies, the copy says "ONE DOWN" plainly (no sad-trombone); when it lives to the Super Bowl, the gold shimmer title
   is already doctrine-approved.
I. **The transition matrix as a battery fixture.** Serialize §22.3's 11 rows to `transitions.fixture.json`; a new tiny
   `transitions.battery` asserts one law per row (complete, hash door, done-draft resolve, mid-season refresh, loadDraft, restore,
   FEED gate, playWeek, DRAFT-nav-on-done, FULL BOARD door, reload). Row 6's direct-loadDraft law is the named gap — build it there.
J. **The receipt problem needs a tool, not a discipline.** Add a trailing JSON status line to `acceptance-run.sh` and have CI assert
   on it; have the §5.2 pointer auto-apply on any non-zero exit naming the unfinished step. Cite-check.mjs (the citation audit as a
   tool) is already named for the Architect/MUSE — promote it to real: every quoted sha/count in the delivery's docs re-measured and
   compared at package time. A human writing "CLEAN ×2" at 29 minutes left is how finding 1 happens.
K. **One canonical host, one manifest (pickle's standing note).** The Desktop now holds eight 35 MB cakepanz folders from six seats;
   the next round's order should name a single host + a SHA256SUMS manifest (pickle's model) instead of per-branch peers. The review
   would then be a one-command integrity check for any seat, anywhere.
L. **The cakepanz-9 sequencing question (the Owner's open ruling).** 8.1 is the gate; Block C and DS's superset brief (three-choice
   card → Complete roster print → "Explain my next pick" → simpleRows port module → wall-slip → visual-regression harness) open only
   after this zip passes its gate — that is the ordering the round-8 order itself carries and it is correct. If and when 9 opens, the
   three-choice card first (it converts the draft into a decision ceremony) — but **only after** the mode-system pattern (#2 above) is
   enforced, or the card will ship as one more unproven surface. The visual-regression harness should wait for (F)'s token split so it
   snapshots the settled palette, not the broken one.
M. **Engine legibility is the product's moat and the shell is where it shows.** The 99-rule flex table, the priority model, the gone%
   odds — all of it becomes felt only through named reasons on cards and chips. A per-chip "Why he fits" popover ("EDGE → OLB · flex 6 ·
   your rule") straight from the pinned flex.json, plus the Guide eating the same table as its readable face, would be the first time
   the engine is *seen* rather than asserted. Zero engine change; a lookup and two strings per screen.

**Two sequencing cautions for the next sitting (from the evidence, not from taste):**
1. Do not let cakepanz-9 touch `src/lib/port/` beyond the existing exception discipline — the settings/draftPrefs split (#1) is the
   only port-adjacent change worth making, and it should land BEFORE any new persisted UI state does.
2. The prepared acceptance composite (finding 1's open half) and the `loadDraft` law (row 6) are the two cheapest load-bearing items
   on the table — both are "finish what 8.1 already proved", and either one is a better next action than any new surface.

— INKLING, 2026-11-18T23:44Z. Hosted folder: `council/inkling @ 5fb4989a`; review of that exact tree. Every claim above is
labelled VERIFIED (I ran it, this window), REPORTED (someone else says so), INFERRED (reasoned, not run) or UNKNOWN. The one
UNKNOWN that matters: the zip↔Desktop-folder chain (finding 5). The one fact the Owner should act on first: finding 1 — the
shipped tree's acceptance receipt is complete and its pointer says it is not; one sentence, and the round's one open item is
half-closed before any new work starts.
