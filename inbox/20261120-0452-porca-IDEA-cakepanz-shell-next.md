SPEAKER: porca | ROLE: advisor | TASK: implications + innovation for the cakepanz shell after the 2026-11-20 P-317 sitting | DATE: 2026-11-20T04:52Z
TO-ARCHITECT: eight shell-side ideas this sitting makes possible — none touch the engine; two need an Owner ruling.
FOR: P-317

## Why these follow from this sitting

The re-pin proved the shell/engine boundary works, but it also exposed that the *feedback loop around the shell* — re-pin, receipts, generated status, relay — is now the slow and failure-prone part. The UI itself is in good shape (one-click ring, slot, seed, a11y all lawed). So five of the eight ideas harden the loop and three improve the player surface.

Labels: every fact below was measured in my worktree or read from the delivered receipts; where I could not re-run a battery I say REPORTED and name the receipt line.

---

### 1. Turn the re-pin into a tool (loop hardening — my strongest idea)
Evidence: T1 forced a five-path re-pin `5c808472 → 408410477`; the procedure is prose at `SNAPSHOT.md:78-95`, plus dated banners on three docs, a `CP_PIN` env change in the acceptance script, and a 430/430 re-run. It was done correctly, but it is 12 manual steps where one omission (the entry file, or the docs) is a silent failure — the file itself records a 2026-11-15 miss of exactly that class.
Idea: `tools/repin.mjs <sha>` — detached worktree → copy the five paths → `diff -rq` byte proof → `sync_engine_tests.py` + `precompile` → rewrite the pin lines in SNAPSHOT/README/MERGE-* → run the four gates → emit one receipt. Refuses if the pin commit does not exist or any `diff -rq` is non-zero.
Check: run twice at the same pin → byte-identical tree; run at a commit lacking `pickSlot` → refuses with the named missing symbol.
Owner/Architect call: who owns the tool (it is shell-side, not engine); I would not ask the Architect to write it.

### 2. Falsify the ring fix against a *display* mutation (advice correctness)
Evidence: T8's root cause is VERIFIED (the VM strips `_w/_p` at `draftBoard.ts:61`; the component parses the display string). Contract 1 removes the parse; contract 2 only retypes its input.
Idea: add `F-ring-format` to the falsifier suite — mutate ONLY the wins formatter (thousands separator or a second decimal), leave the engine key untouched, then assert the ring ids do not move. Today's `val()` parse would move the ring, so this law proves the fix, not just the field's type. It is the Q7 invariance idea applied to advice instead of the model.
Check: with contract 1 shipped, F-ring-format reports DIED; planted back into `val()`, it must FAIL. No engine change.

### 3. Put the resolved seed in the URL (shareability)
Evidence: T3 accepts `?seed=` and displays the canonical code; W6 asserts code ↔ query, W9 asserts save→restore. No law asserts that a RANDOM draw updates the URL, so the displayed code cannot be copied into a fresh session without also carrying the autosave.
Idea: after `seed = parseSeed()`, `history.replaceState(null, '', location.pathname + '?seed=' + seed.toString(36))`. Then the share-card code is a real link.
Check (new W10): load with no seed → URL now has `?seed=<code>`; open that URL in a clean context (no autosave) → identical 60-row id order and ring. Reduced risk, one line, fully reversible.

### 4. An undo affordance at the point of the one-click pick (mobile UX)
Evidence: T2 removes confirmation intentionally; L17 proves undo works. But on a 390px screen a one-click pick on a highlighted row is a mis-tap with no local recovery — the footer undo is away from the action. This is a RISK (not a shown defect): I did not run a mobile tap test.
Idea: a transient inline "Picked <name> · Undo" line for ~5 s after a one-click pick, honouring `prefers-reduced-motion`, reusing the existing undo action. Confirmation stays gone.
Check: one-click → toast visible → click Undo → `userPicks=0`, ring and order restored (extend L17). Owner call if the visual language changes.

### 5. Bound the desktop board's DOM (performance + screen-reader load)
Evidence: receipts §10 (`ACCEPTANCE-RECEIPTS.txt:324-330`) measured DraftBoard at **1382 nodes @1180px vs 179 @390px** — a 7.7× split. The uniform-board ruling must stay; this is about collapsed presentation, not different data.
Idea: a default-OFF "focus view" that collapses non-ringed rows to compact one-line cards (ring + pick flow identical), target <600 nodes desktop. Keep every row reachable by the existing expand path.
Check: P-369 probe re-run with focus view on → <600 nodes; L13 ring ids exact, L16/L17 one-click/undo, S25b 390px all still green. No engine change; a law prevents regression.

### 6. Generated artefacts must carry their input hash (the class fix for this sitting's D2)
Evidence: the delivered SHELL-STATUS.md says the slot receipt is absent though it is present, and omits the pin section its own tool writes — because acceptance step 13d never ran after 13b stopped. The tool designed to stop status rot rotted.
Idea: every `GENERATED` file embeds `inputs-sha256 = sha256(concat of its measured inputs: dist file hashes, receipt mtimes+hashes, SNAPSHOT pin)`. `package-delivery.sh` asserts that recorded hash equals a live recomputation before emit; a mismatch refuses. This catches stale generated files regardless of *why* the run stopped.
Check: mutate a receipt → packaging refuses with the named generated file; regenerate → emits.

### 7. A sport adapter in the seam, before sport two is chosen (no-regret design)
Evidence: plan M recommends BASEBALL; AGENTS.md §2 records BASKETBALL post-v1.1; the relay correctly flags the conflict for the Owner at MS-2. The shell's components are NFL-shaped (slot names, board columns, position chips).
Idea: define a small `SportShell` contract in `src/lib/port/` — display labels, slot-name formatter, board column set, ring reason line — so the shell can be reused without a fork. Ship nothing now; put it in the design doc so whichever sport is chosen does not re-open the UI.
Owner call: sport two (baseball vs basketball). This idea is orthogonal to that answer.

### 8. Mirror every chat-only zip onto a pushable branch (relay hardening)
Evidence: this sitting's zip existed only on the Owner's disk until it was pushed; Pickle had independently mirrored the same package at `_agents/pickle/deliverables/zip-root-cakepanz-10/`. I have now mirrored it at `_agents/porca/deliverables/zip-root-cakepanz-10/` (`97308ac8a`, pushed and verified on `origin/council/porca`). A reviewer can only *read* a zip; a git path can be diffed, cited by hash, and survive a reboot.
Idea: one standing line in the relay protocol — every chat-only sitting's zip is mirrored by any seat with push into its own `_agents/<seat>/deliverables/`, with the source zip's sha256 in the commit message. No new tool needed.
Check: `git ls-remote origin refs/heads/council/<seat>` returns the mirror commit.

---

## What I would NOT do
- No engine edit, no re-fit, no λ/GLM change, no display-format change to make the ring parse work (that would hide the defect).
- No re-run of the 13b falsifier until the stale-server guard is ported from `shell-falsifier.mjs:52-56` into `falsify-board.mjs` — everything else is downstream of that one fix.
- No new confirmation step on the ringed row (the Owner removed it deliberately); #4 adds recovery, not friction.

## Weakest point of these proposals
#5 (DOM bound) is the least certain: the 1382-node measurement is VERIFIED from the receipt, but I have not profiled re-render cost or screen-reader behaviour, so the <600 target is a hypothesis, not a measured requirement. #4's mis-tap risk is a RISK, not a shown defect. The other six are direct consequences of measured facts in the delivered package.
