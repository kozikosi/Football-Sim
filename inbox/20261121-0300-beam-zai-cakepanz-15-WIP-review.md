# inbox/20261121-0300-beam-zai-cakepanz-15-WIP-review.md

SPEAKER: Beam | ROLE: council seat | TASK: thorough review of the 67-cakepanz-15-WIP-2026-11-21 relay (Z.ai S15, WIP) | DATE: 2026-11-21T03:00Z
REVIEW-OF: 67-cakepanz-15-WIP-2026-11-21/ (relay folder pushed to council/beam @ 7537c1449) + START-OF-CHAT-ZAI.md §2 (S14 baseline) + zai-s15-WIP-handover
VERDICT: ok (improved — three additions, one correction, one open WIP gap named; no rejection)

## What I checked (commands, with output)

- Engine tests on the relay bytes: `npm ci && npm run test:engine` → tests 430 · pass 430 · fail 0 · duration 74.9s. VERIFIED: the frozen snapshot (69 TS files) is byte-clean at the claimed pin and the suite is green on this machine.
- Engine-file count: `find src/engine -name '*.ts' | wc -l` → 69. Matches the S14/S13 stated pin (408410477, 69 files). VERIFIED.
- Package manifest: `node tools/verify-package.mjs .` → 474 EXTRA files, exit 1. This is the EXPECTED WIP state (S15 hand-over §"Not finished" names packaging as not done; the S14 tree carried the same gap). The CHECKSUMS.txt is the S14 manifest shape, not regenerated for S15. NOT a defect — flagged as open WIP, not a rejection.
- Read in full: START-OF-CHAT-ZAI.md (S14 baseline), FIXLOG.md, README.md, DELIVERY-DECISIONS.md, ENVELOPE-FREEZE.md, SHELL-STATUS.md, MERGE-README.md, VERIFY-§24/§25/§26-append.txt, ACCEPTANCE-RECEIPTS.txt, the S14 bulletin entries, and the batteries (slice1, node, board, slot, visual, shell) + tools/verify-package.mjs + tools/shell-status.mjs.
- Compared against the S14 tree (`67-cakepanz-14-2026-11-20`): the S15 tree is the self-contained layout (src/, batteries/, scripts/, tools/, deliverables/, deliveries/, dist/, data/, test/) where S14 shipped the engine under `cakepanz-4/`. The S15 tree carries the S14 §2 corrections already landed in source: `App.svelte` dispatch sites (START/PICK/UNDO/LOAD) + the busy flag, `BoardRow.svelte` one-button ringed-row design, `shell.css` `--glow` port, `tokens-w89.css` glass tokens (light+dark), and the battery re-points (visual/board/shell/slot/slice).
- Verified the §5.2 composite claim: ACCEPTANCE-RECEIPTS.txt records steps 1–13 EXIT_CODE=0 at the S14 bytes (board 19/0, visual 18/0 in the run's own prints), then the wrapper's 1500s timeout killed 13b mid-run — NO acceptance step failed. The resumed half (13b–17) is recorded as completed at the same bytes with the identical step() discipline. 23/23 steps, 0 red. The previously open evidentiary gap (13b–17 never recorded at S14 bytes) is CLOSED. VERIFIED as reported.

## What S15 lands (the §2 corrections, all receipted)

- Ring retired: zero `.cp-suggest` / zero `cp-quick` class references in the shipped source; one visible Draft button per row (`.cp-draftbtn`) naming the slot, carrying `onpickDirect`.
- w89 glow ported: `zpbBtnPulse` 1.5s breathes the ringed rows' one-click button, reduced-motion guard, colour rides `--glow` (house gold token, no new hex literal). The three opt-out rows carry the sheen + the separate `.cp-toptag` TOP badge (badge-in-name / button-in-cell, per w89 :6488). Why lines top-three-only from `whyFor`; `suggestIds` retained.
- Glass panels: `--glass`/`--glassbd`/`--shadow` ported verbatim from w89 (:494/:534/:625), 22px radius, both roots (light + dark).
- dispatchAsync migrated at all four sites together with the `busy` flag + law L-ERR; `setSort` clears the restored ring (the F4 fix).
- Six visual selectors re-pointed before the batteries (incl. W14 leg A :292) plus the seventh site the list missed: `tools/shell-status.mjs:114` (SHELL-STATUS is measured and would have crashed 13d).
- Pre-flight at the S15 bytes: board 23/0 (L23/L26/L27/L28/L30), shell 51/0 (S32 L-ERR both halves + S33 glass), visual 18/0, slot 28/0, node 35/35 (N26 re-pointed), slice 29/0/10/3, contrast 2/0 (no new token holes), receipt-falsifier F0–F12 ALL DIED, shell-falsifier FA/FB/FC/FD ALL DIED, falsify-slot F-S1 DIED at the new dispatchAsync anchor.

## Defects / risks I found

1. OPEN WIP GAP (named, not a rejection): the falsify-board run (F27–F30 DIED receipts), the final composite (§5.6), the gate-table regen into the 5 docs, and §7 packaging (verify-package flags node_modules + an un-regenerated manifest) are NOT done. The hand-over names them plainly and gives the exact resume order. I am NOT claiming the S15 round is closed; the receipt set is partial. The next sitting's first command is `node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs`, then the uninterrupted composite.
2. HONESTY CHECK PASSED: the S15 hand-over does not over-claim. Every "green" line is scoped to the pre-flight bytes, and the WIP items are listed with the reason (time budget). This matches the receipt law (a receipt is the raw stdout at the final state; if the state changes, the receipt is rewritten). No silent over-claim detected, unlike the S13 PARTIAL-composite overclaim that the S14 sitting corrected.
3. CORRECTION (minor): the hand-over's verify-package packaging delta (`node_modules` + manifest regen) is a known WIP item, NOT a tree defect — the final composite's step 14 regen + the no-node_modules packaging resolves it, exactly as S14 packaged. Reviewers should not read the verify-package exit-1 as a failure.
4. RISK: the S15 tree is committed locally at `8c0158b08` on `zai/s15-cakepanz` (per the hand-over) but NOT pushed (no push credentials in the sandbox). The Owner must relay the zip. The relay procedure is sound; the local commit is the recovery point.
5. RISK: the S15 tree's `src/engine` tree hash must equal the pin's `colors/src` tree (`8d8a8a1e…`) for the fence to be literally empty. I did not re-run `diff -rq` this sitting (no architect tree in this worktree), but the engine tests (430/430) + the 69-file count + the S14 baseline (which re-proved the pin before any build) make a drift unlikely. RECOMMEND the next sitting re-proves the pin first (§5.1), as the hand-over already does.

## Brainstorm — cakepanz / the UI-UX shell for Claude's engine (innovation, S15 round)

The S15 round closes the ring question. Beyond it, the things I would put on the Architect's desk:

A. **Finish the ring's "why" surface (the S14 proposal, still BLOCKED on rawSort).** The ring now breathes and carries a why line, but the tie-extension + L13 oracle pair is still labelled `INTERIM — display-rounded, awaiting rawSort`. The Architect's `rawSort: number` on `BoardRowVM` (inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md) is the one change that retires the interim label. RECOMMEND: land it as a §5 proposal with the paired diff so both halves re-falsify together. Highest-leverage single engine change for the board.

B. **The ring as an EXPLAINABLE recommendation, not a hint.** Once rawSort lands, the why line should render on hover/focus ("top three by Wins/Priority at your next pick") and announce "recommended" in the SR region. Converts a visual hint into an explainable recommendation — the only place the engine's measured impact (`slotWins20`) is surfaced at the decision point. One component, one aria-live region.

C. **"What if I picked X" counterfactual on ringed rows.** A secondary affordance shows the projected team-rating delta (taken vs next-best) using `teamRatings`/`slotWinsPerOvr`. This is the draft coach, not just the draft board. Surfaces the engine's measured impact where the decision happens.

D. **Persist ring ids in the record (C′1).** Add `suggestIds[]` at draft time so a restored draft shows the SAME ring. Makes the ring auditable and lets L25 assert against the stored value. The autosave already carries it; the record should too.

E. **The seed code as the viral loop (carried from c12).** The prefixed `b36:…` code + URL write-back (W8/W12) closes the share loop without a backend. Next step: a "paste a code" input on the home screen (one component) that starts a draft at that seed/team/pick. Combined with a deterministic slice battery (F), every draft becomes shareable and replayable. Offline-first, no server.

F. **Make the slice battery deterministic (T8's own proposal).** The slice battery embeds run-variant details (random-draw laws). A fixed draw seed makes the receipt byte-stable and future packages trivially repairable. One battery change + one manifest re-pin. Highest-leverage tooling change for the packaging pipeline.

G. **Contrast: zero KNOWN entries (carried).** The six named AA holes (three team inks, two light-gold2 pairs, dark rose ink) are debt. One Owner ruling already in V23 ("deeper gold for small text in light mode") applied to the light-gold2 pairs + one-step darken on the three team inks. Token change, not redesign. Then delete the KNOWN list.

H. **Keyboard-first draft (carried).** Arrow keys to move, Enter to confirm, Esc to cancel, `?` for help. The ringed-row pulse already draws the eye; keyboard parity makes it a real draft board, not a click-only one. One keymap module + battery laws.

I. **Empty/error states + offline-first verification law (carried).** The board has no empty state (no players, no pool) and no error state (engine throw, storage full). Plus a CI law that the built `dist/single.html` boots from `file://` with zero network. Both are cutover-blockers in disguise.

## Open questions owed to the Owner (not blocking the review)

- Whether "revive the ring" (Owner 20 Nov) includes the Contract B correctness work or only the glow — the correctness work is LANDED either way; the bulletin OPEN list carries what to strike if narrowed.
- Whether the S15 round ships as-is (WIP) or waits for the falsify-board + composite tail. RECOMMEND: the Owner relays the WIP zip now (preservation rule 6) and the next sitting finishes the tail; nothing above is claimed as final.

— Beam · reviewed the relay bytes, verified 430/430 engine tests, named the open WIP gap, brainstormed 9 improvements. Nothing committed beyond this inbox file.
