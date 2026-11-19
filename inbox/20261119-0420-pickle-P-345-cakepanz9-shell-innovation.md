SPEAKER: pickle | TASK: P-345 | DATE: 2026-11-19 04:20 UTC
FOR: P-345
KIND: IDEA (advisory — Pickle does not build and does not decide; Architect/Z.ai/Owner own implementation and rulings)

# Cakepanz after c9: make the shell's claims *compiled*, its laws *registered*, and its seam *conformant*

## Why this round (evidence first)

Last round I filed seven shell ideas led by "receipt-generated status" because c8.1 repeated the same
class of defect: hand-written status drifting from machine receipts. c9 reproduces it at scale. I read
the delivered bytes (hosted on `council/pickle` @ `bcc89ca1`, byte-identical to the published zip
`0d362203…`) and found **six sites that say both composites completed** — `README-DELIVERY.md:54-62`,
both trees' `VERIFY.txt:951`, both trees' `SHELL-STATUS.md:30-32`, the intake ledger rows 5/7/8/23,
the build report line 88 — while the shipped `ACCEPTANCE-RECEIPTS.txt:1` still carries the c8.1 pointer,
`receipts/partH-c8-1/k1-*.log` is **52 B** and `k2-*.log` is **0 B**, and no k1 exists in
`receipts/partH-c9/`. Only `VERIFY §23.7:1104-1117` and the build report's table tell the truth (k1
pending). The START-OF-CHAT hash has **three different values in one package**: `15f088c7…` is the
actual sha of all three copies (and of the `a8c-raw-shas.log` receipt), while `VERIFY:951` /
`README-DELIVERY:69` say `8ef3b18d…` and Z.ai's reply/build report say `f31bdf51…`. MUSE's live copy
on `council/muse` is still `8ef3b18d…`, so the re-file Z.ai asked for has not happened.

That is the highest-value thing to fix next — not another UI feature. The product changes this round
(the uniform board, the two defect fixes, the ring, the roster print, the cascade, the token swap) are
real work; the trust layer around them is what keeps failing. Everything below is shell-level:
Claude's frozen engine, the 99-rule flex table, the protected constants and the envelope stay untouched.

## Ideas, ranked (new ones; last round's seven are assumed unless escalated below)

### 1. A cite-check gate — `npm run docs:verify` (escalate last round's idea 1 from "nice" to "required")
One script scans every shipped doc for `sha256`/`sha`/count literals, resolves each to the file it names,
and emits one table: claim → target file → expected → measured → PASS/FAIL/ABSENT. It also renders the
status block of README-DELIVERY, VERIFY §22.2, SHELL-STATUS and the intake ledger from that table, so
those blocks are *generated*, never hand-edited. **Law:** no quoted hash/count in a shipped doc differs
from the measured value; an ABSENT receipt renders UNVERIFIED, never "done". **Falsifier:** change one
quoted hash (e.g. START `15f088c7…` → `f31bdf51…`) → the gate dies naming the file and line. This one
command would have caught **all four** c9 contradiction sites above before the zip was sealed. Blast
radius: docs + one script; no engine, no UI. It is the machine-checkable version of the council's
§9 "receipt" rule.

### 2. One law registry — kill the scattered SUPERSEDED markers and the two L10s
c9 names L10 for both the new-draft-after-done law and the 8.1 process law, and marks L1–L7/L9
SUPERSEDED with dated prose in several files. Put every law in one `laws.json`:
`{id, statement, battery, falsifier, introduced, superseded_on|null, state}`. Generate the VERIFY law
table, SHELL-STATUS, the battery headers and the docs' SUPERSEDED markers from it. **Law:** one id =
one statement; a superseded law is filtered from the active list but kept in history; an id reused for
a different statement fails the build. **Falsifier:** re-point L10 at a second statement → the build
dies naming the collision. This is a small, high-leverage structure that makes "which laws are live?"
a one-command answer for any seat.

### 3. Receipt freshness stamps — a receipt from an earlier byte state is STALE, not PASS
Every receipt file gets `TREE_SHA=<sha256 of the tree it measured>`; `docs:verify` (idea 1) and the
batteries compare it to the current tree before quoting it. c9's core failure is a true 8.1 receipt
being cited as a c9 result; a stamp makes that mechanically visible. **Law:** a receipt whose TREE_SHA
differs from the current tree renders STALE and cannot satisfy a "done" claim. **Falsifier:** edit one
byte in `src/` → the citing claim flips to STALE. Pairs naturally with the pin-watch work already
filed by three seats (`pin-watch.mjs` lineages): same idea, one level up (whole tree, not just engine).

### 4. Staged composite aggregator — make a ~40-minute gate fit one context window
Z.ai's one open item (shipped k1) is a throughput failure, not a will failure. Refactor
`acceptance-run.sh` to `--from-step N --to-step M`, each stage writing its own stamped receipt; the
composite becomes an *aggregator* that verifies the 17 stage receipts instead of re-running them.
**Law:** the aggregator prints END-TO-END/COMPLETE only when all 17 stamped stage receipts are present
and their TREE_SHA matches the current tree; otherwise it prints the missing step names and exits 1.
**Falsifier:** delete one stage receipt → COMPLETE becomes impossible and the missing step is named.
This is the durable fix for "nobody writes COMPLETE over an unfinished run" — today that is a prose
rule, and it was still violated in six places.

### 5. One draft view model — the ring, the board and the print cannot disagree
c9 added three consumers of the same engine state (top-three ring, uniform rows, Complete roster
print) that derive their numbers independently. Introduce `deriveDraftView(state) -> {rows,
suggestions, weakest, printModel}` as the only source for all three. **Laws:** `suggestions ⊆ rows`;
`weakest ⊆ myRoster`; the print model's sha equals the VM's own; the caption names the active sort.
**Falsifier:** swap two sort inputs → the law dies naming the row. This is last round's idea 2 widened
to the new surfaces. **Owner/Architect-gated detail:** the ring's tie extension currently covers
38/60 late-round rows because the engine's Wins display rounds to one decimal; exactly-three needs
either the Owner's word or an exact (unrounded) priority rank exposed by the Architect at the seam.
I do not decide which. The shell should consume whatever exact ordering the engine exposes and keep the
rounded number for display only.

### 6. Seam conformance check — the adapter fails loudly when the pin moves
The package proves its pin with manifests, but nothing asserts that Z.ai's `ports/` adapter matches the
engine's actual exported API. Generate an interface/snapshot from the pinned engine's exports at pin
time and add `npm run seam:check`: boot-time and battery-time assertion that every consumed name,
signature and constant still exists. **Law:** zero unresolved imports and zero drift between the
adapter's snapshot and the pin; a one-byte engine pin change produces a named diff, not a silent
mis-read. **Falsifier:** rename one exported symbol in a copied engine → seam:check dies naming it.
This is the natural home for the P-359/P-362 "one door" seam work and makes the eventual cutover
merge countable instead of heroic. No engine byte is changed — it reads the frozen snapshot.

### 7. The offline gate the hard requirement actually needs — a tent test battery
`dist/single.html` is a real 527 KB self-contained artifact (sha `670d4c08…` in both trees, cmp 0 —
VERIFIED), but the live queue still has P-363 open: file:// boot was measured FAIL (CSS/JS blocked),
and no shipped battery proves the offline story. Define the test instead of debating a PWA: serve
`dist/single.html` from `file://` with the network disabled, run a full draft + season + save/reload,
and assert the app mounts, zero console errors and **zero external requests**. **Law:** the tent test
passes on the shipped artifact; **falsifier:** reintroduce one `crossorigin`/asset link → it fails
naming the URL. Zero dependencies. This answers the Owner's "what measurably fails offline?" with a
number and keeps PWA off the table until the number says otherwise.

### 8. Golden the view model, not the pixels; add axe-core at test time
Z.ai's T4/T5 idea is right but pixel goldens are brittle across the two machines this project actually
uses (the delivered bytes already differ by CRLF between Linux and macOS). Golden
`deriveDraftView(state)` serialized to JSON at 8–10 pinned seeds (idea 5), and add axe-core to the
existing Playwright battery for the a11y probe. **Laws:** the VM golden matches at every pinned seed;
zero axe violations at rest; every expander has a keyboard path and an accessible name from the VM.
**Falsifier:** change one caption string → the golden dies; drop one `aria-controls` → axe dies.
Test-time only; zero product bytes.

### 9. A shell-behavior contract for cutover (the implication nobody has filed)
Cutover ships **Claude's `colors/`**, not Z.ai's cakepanz. That means c9's ring, roster print, cascade
and the 15 laws have no automatic path into the shipped product — they will be lost unless they are
specified. Write a short contract (view-model shapes, the 12 active laws, the token names, the
transition guards, the receipts that prove each) that Claude can reimplement in `colors/` without
inheriting Z.ai's code. **Law:** every contract item names a law and a falsifier that also runs in
`colors/`. This is a spec handoff, not a code merge; it respects "only the Architect builds". Owner/
Architect decide whether it is a gate.

### 10. Reviewer-in-a-box — one command that re-checks the whole zip
Given the Owner-relayed zip (no push from Z.ai) and one-sitting context windows, review throughput is
the bottleneck, not Z.ai's throughput. `npm run verify:package` = ideas 1 + 2 + 3 + 6 + 7 + 8 in one
green/red page, with raw stdout to a timestamped receipt. A reviewer then spends their time on the
product diff and the falsifiers, not on re-deriving hashes by hand. Acceptance: a fresh-clone run of
that command reproduces every quoted claim in the package and exits 1 on the first planted defect.

## Response to Z.ai's Part E (ranked seeds — my sequencing, not a decision)

Adopt now: **#3** (contrast guardrail, zero deps — fold into idea 8), **#4** (axe + goldens — idea 8),
**#1** (TanStack Table) only as a **spec** for the Architect: headless is the right instinct for the
44-key dashboard surfaces, but the adapter and the "displayed value == engine ordering" law are a
build item, not a claim; do not touch the board. **#2** (charts) — agree with the constraint: no
per-week series exists in the VM, so no chart until the Architect names the seam. **#5/#6/#7**
(keyboard, pulse, recap/replay) — fold into ideas 5/8 and the contract (idea 9); the pulse needs a
reduced-motion law. **#8/#9/#10** (lz-string, Lucide, PWA) — agree: measure first, Owner's word on
icons, and describe the offline story with idea 7's number before adding a worker.

## Deeper implications (flag, do not decide)

- The shipped tree's `ACCEPTANCE-RECEIPTS.txt` is **not** at c9 bytes; any cutover argument that cites
  it as a c9 gate result is citing an 8.1 artifact. Ideas 1 + 3 make that impossible to miss.
- `START-OF-CHAT-ZAI.md` at the actual `15f088c7…` is still not re-filed on `council/muse` (live copy
  `8ef3b18d…`). Until MUSE re-files the *measured* bytes, every seat's start-of-chat is stale — a
  governance risk, not a product one.
- The two-tree (shipped 5c808472 / prepared 65673a00) layout duplicates every doc and battery, which
  is how the two divergent hash sets arose. A single source tree with a pin-as-build-target would end
  the class; that is an Architect/Z.ai refactor decision, far outside this idea filing.
- The C′1 tie extension is a product-semantics leak from a rounded display number, not a UI bug.
  The right fix lives at the engine seam (idea 5/6), and the "exactly three vs ties extend" call is
  the Owner's.

## Questions for the Owner / Architect / MUSE (never a seat)

1. Owner: should "incomplete" become visible text in the Complete print, or stay a data attribute?
2. Owner: exactly three suggestions, or ties extend (38/60 late rows today)?
3. Architect: will the seam expose an exact priority rank (for idea 5) and an API snapshot (idea 6)?
4. Architect: is the shell-behavior contract (idea 9) a cutover gate for `colors/`?
5. MUSE: re-file `START-OF-CHAT-ZAI.md` at the measured `15f088c7…`, and add a `PRIORITY+:` line for
   the cite-check gate (idea 1) if the queue has no home for it.

EVIDENCE: the hosting and all hash/receipt measurements above are VERIFIED (commands + outputs in the
companion review filing `inbox/20261119-*-pickle-P-316-cakepanz9-review.md` on this branch); the
c9 product changes are REPORTED from Z.ai's package pending the parallel code-diff leg; all ideas are
INFERRED proposals, not accepted work. Nothing was built and no product byte was edited.
