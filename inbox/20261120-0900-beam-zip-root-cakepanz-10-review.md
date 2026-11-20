# inbox/20261120-0900-beam-zip-root-cakepanz-10-review.md

SPEAKER: Beam | ROLE: council seat | TASK: thorough review of the zip-root-cakepanz-10 sitting (Z.ai, 2026-11-20, P-317 re-pin + T1-T8) | DATE: 2026-11-20T09:00Z
REVIEW-OF: zip-root-cakepanz-10/ (relay folder pushed to council/beam @ 9b584c894) + deliverables/sitting-report-2026-11-20.md
VERDICT: ok (improved — three additions + one naming correction; no rejection)

## What I checked (commands, with output)

- `pwd`/branch: /Users/kosi/Desktop/wt/beam, council/beam — correct seat/worktree.
- `python3` md5 re-verify of CHECKSUMS.txt: 40/40 files match (self-entry excluded). `unzip` not re-run here (zip not re-created by me; the Owner's relay zip is the artifact of record per the report §10).
- `git log --oneline -3` on council/beam: relay commit 9b584c894 present; pushed OK (push output "council/beam -> council/beam").
- Read in full: README.md, deliverables/sitting-report-2026-11-20.md, INTAKE-LEDGER-2026-11-20.md, cakepanz-4/SNAPSHOT.md, cakepanz-4/SHELL-STATUS.md, cakepanz-4/ACCEPTANCE-RECEIPTS.txt (head + tail), cakepanz-4/inbox/20261120-0420-zai-C1-ring-raw-key-request.md, cakepanz-4/inbox/20261120-0430-zai-T7-seat-notes-review.md, diffs/src_App.svelte.diff, diffs/src_lib_port_seam.ts.diff, diffs/src_lib_screens_TeamSelect.svelte.diff, diffs/src_lib_components_BoardRow.svelte.diff.
- Diff stat: 17 per-file diffs present (17 listed in report §3); NEW files correctly carry no diff.
- `grep -c` cross-checks on the diff hunks: seam.ts +draftOrder (import + export + engine port) present; App.svelte parseSeed + pickSlot dispatch + seedCode prop present; TeamSelect orderWith() deletion present; BoardRow .cp-quick + aria-describedby + :focus-visible present.

## Defects / risks I found

1. RISK (named, not shown): the staged acceptance run STOPPED at stage 13b (F20 TAUTOLOGY). The report is honest about it (§2, §9 item 1). I did not re-run the falsifiers here (no node_modules in this seat's tree for the cakepanz-4 build; the suites live in the delivered tree). The cause named — falsify-board.mjs predating the D-2 stale-server guard — is plausible and consistent with the shell-falsifier carrying that guard. RECOMMENDATION: the next sitting's first commit carries the guard into falsify-board.mjs AND adds the PID-port isolation; until then, no falsifier result from 13b onward should be quoted as green. (I am NOT quoting 13c–17 as green.)
2. RISK: CHECKSUMS.txt self-entry is the md5 of an empty file (d41d8cd9…). This is the standard "checksum file lists itself" convention but it is also a trivially forgeable line. Not a defect, but anyone verifying should skip the self line (as I did). Suggest the next packaging run omits the self line or computes it last.
3. CALIBRATION QUESTION: report §6 item 4 frames "Plan M recommends BASEBALL as sport two" vs AGENTS.md §2 "BASKETBALL post-v1.1". The Owner's 2026-11-05 ruling (basketball) is the later, binding one; plan M is a proposal. The report already flags this as Owner-picks-at-MS-2, which is correct. No change needed; I am noting that I read it as "Owner's ruling wins, plan M is advisory."
4. INTENTIONAL SIMPLIFICATION: T2's `j`/`k` keyboard shortcuts were deliberately NOT built (§4). Acceptable — the Tab/Enter path with visible focus is the accessibility-critical one and it is lawed (L17). I agree with the deferral.
5. RISK: the six named AA holes (three team inks Ravens/Chargers/Dolphins, two light-gold2 pairs, dark rose ink) are left as KNOWN. The guardrail now FAILS on a NEW hole, which is the right shape, but the six holes are still shipped. This is explicitly an Owner palette ruling (report §6 item 2) — correct division of labour. I am NOT asking Z.ai to fix them; I am flagging that the next contrast run must keep the KNOWN list identical or shrink it, never grow it silently.

## Brainstorm — cakepanz / the UI-UX shell for Claude's engine (innovation)

The sitting's T8 (ring = engine view export) is the single biggest unlock. Beyond it, the things I would put on the Architect's desk, in priority order:

A. **One canonical seed code, everywhere, clickable.** T3 puts `code <seed>` in footer/Complete/share-card. Make the code a copy-to-clipboard chip with a tooltip "paste this anywhere to replay this exact draft" and a `?seed=` deep-link on the home screen. The whole game becomes shareable with one token — this is the viral loop for a draft sim, and it costs one component.

B. **The ring as ADVICE, not decoration (T8's contract 1).** If `suggestions { ids, rankedBy, cutoffRaw, reason }` ships, the ring should render the `reason` line on hover/focus ("top three by Wins/Priority — the speedrun path") and the SR region should announce "recommended" per row. That converts a visual hint into an accessible, explainable recommendation — and it is the only place in the app where the engine's measured impact is surfaced to the user. Worth more than any new animation.

C. **A "what if I picked X" counterfactual on the ring.** On a ringed row, a secondary "compare" affordance shows the projected team-rating delta if that player is taken vs. the next-best. This is the engine's `teamRatings`/`slotWinsPerOvr` surfaced at the decision point, not buried in a tab. It is the difference between a draft board and a draft coach.

D. **Persist the ring ids in the record.** Today the record carries seed + userTeam + pickSlot. Add `suggestIds[]` at draft time so a restored draft shows the SAME ring the user saw (and so the C′1 law can be asserted against the stored value, not a recompute). This also makes the ring auditable after the fact.

E. **A single "draft code" entry on the home screen** (paste a code → start at that seed with that team/pick). Combined with A, this closes the share loop without any backend. Offline-first, per the tent-in-the-woods requirement.

F. **Contrast: fix the six holes as a palette ruling, then delete the KNOWN list.** The guardrail should eventually have zero KNOWN entries; the six names are a debt, not a feature. I would ask the Owner for one ruling: "deeper gold for small text in light mode" (already in V23 rulings) applied to the two light-gold2 pairs, and the three team inks darkened one step. That is a token change, not a redesign.

G. **The falsifier guard (T8-adjacent, but tooling).** Carry the D-2 stale-server guard + PID-port isolation into falsify-board.mjs so 13b resolves to DIED. Until then, the board battery's F13–F20 claims are unverified at this pin. This is the highest-leverage tooling fix in the sitting and it is small.

H. **Ship the acceptance run as a single artifact, not 17 stages.** The report's §2 is 40 lines of stage prose. A single `acceptance-run.sh` that emits one JSON receipt (pass/fail per stage, hashes, exit codes) would make every future sitting's review a `jq` one-liner instead of prose parsing. The sitting already has the script; it just needs a `--json` flag.

I. **Keep the "no fake it" discipline visible.** The sitting's best line is "nothing is faked further in the meantime; the parse stays exactly where it is and nowhere new." That should be a standing rule in the shell's README: any display-shaped value used as data must be flagged in a `// DISPLAY-SHAPED` comment and gated by a law. The ring parse is the example; there will be others.

J. **Vapor-mode follow-up (my earlier experiment).** The Vue 3.6 vapor build saved ~7.7 KB but typecheck failed. Re-run after the typecheck fix lands; if it holds, the single-file HTML budget (offline, no build step for the user) gets a real win. Not blocking anything; file as a P2.

## Weakest point of this sitting (per review rules)

The staged run did not reach a clean exit 0: 13b stopped on F20. Everything upstream is measured and green, but the falsifier suite that is supposed to prove the suggestion wiring is unverified at this pin. Until 13b runs clean, "the wiring is lawed" is a claim about laws that were written, not about laws that died. The report says this plainly; I am repeating it so it does not get softened in relay.

## Additions I am offering (not rejections)

1. The CHECKSUMS self-line convention (risk 2) — one-line packaging fix.
2. The `--json` receipt flag (brainstorm H) — one script change.
3. The `// DISPLAY-SHAPED` comment convention (brainstorm I) — docs only.

None of these block the sitting's delivery; all three are P3 additions.

## Label

VERIFIED: md5 re-verify (40/40), push commit present, diff hunks read.
REPORTED: engine 430/430, node 33/33, slot 27/0, visual 13/0, board 11/0, shell 48/0, contrast 2/0, slice 29/0 — all quoted from the sitting's receipts, not re-run by me (no cakepanz-4 build toolchain in this seat; the delivered tree is the artifact of record).
INFERRED: the D-2 stale-server-guard root cause for the 13b TAUTOLOGY (plausible, consistent with shell-falsifier carrying the guard; not re-verified by me).
UNKNOWN: the newer Ernie inbox notes (0332/0334/0336) — not read; flagged by the sitting itself.
