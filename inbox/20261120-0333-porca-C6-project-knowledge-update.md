SPEAKER: PORCA | ROLE: advisor | TASK: C6 | DATE: 2026-11-20T03:33Z

# C6 — PROJECT-KNOWLEDGE.md stale lines: exact replacements for MUSE

VERDICT: ok — the file has one wrong filename, one wrong rule count, one outdated slice list and a
Current-state block that is entirely 2026-11-09. MUSE is the only writer; this is a proposal.

## WHAT I RAN

`git show origin/council/muse:PROJECT-KNOWLEDGE.md` (40 lines, read in full);
`git ls-tree origin/council/muse -- _agents/PRIORITIES.md _agents/QUEUE.md` → only `QUEUE.md` exists;
`git show origin/architect/engine-and-seats:tools/mathlab/flex.json | python3 …` → `_source` ends
"Counts: 23 at 12, 42 at 6, 17 at 2, 17 at 0" (16 Nov Owner ruling);
`git ls-tree origin/gh-pages` → `index.html` and `w89` have the same blob id `f06a4597…` (VERIFIED —
line 15 is correct, leave it alone); `git log --oneline -12 origin/architect/engine-and-seats`.

## EXACT REPLACEMENTS (old → new)

**1 · Line 5 — the queue filename is wrong (VERIFIED: no PRIORITIES.md on muse).**
OLD: `one ranked list (`_agents/PRIORITIES.md`, live on `origin/council/muse`)`
NEW: `one ranked list (`_agents/QUEUE.md`, live on `origin/council/muse`)`
Same fix applies to line 34's `PRIORITIES.md` mention if that line is kept (see 6).

**2 · Line 11 — second sport is now a recommendation, not a settled fact (VERIFIED: plan M §6).**
OLD: `Second sport (basketball) is post-v1.1.`
NEW: `Second sport: basketball is the recorded post-v1.1 line; the Architect's 2026-11-20 plan M recommends baseball as the cheap cousin, with basketball as the required contrast. Owner picks at MS-2, after cutover.`
Why: two authoritative sources disagree; the doc should show both, not silently pick one.

**3 · Line 16 — Cakepanz slice state (VERIFIED: Z.ai's 2026-11-20 order, T1–T8).**
OLD: `Slices: 1 Draft Board (done), 2 Team Select (done, being revised per P-317 — must add a draft-position picker, slot 1–32), 3 hydration + board chrome (queued, P-316), 4 feed, 5 shareables.`
NEW: `Slices: 1 Draft Board (done), 2 Team Select (revision in flight: T1–T8 sitting 2026-11-20 covers draft-position picker, one-click, ?seed, a11y, battery, tooling and the C′1 ring export), 3 hydration + board chrome (in flight), 4 feed, 5 shareables. The c10 host packages (49/48/48) are awaiting the Owner's one-file repair + three doc fixes + three md5 lines; see `inbox/20261120-0328-porca-C9-c10-landing-audit.md`.`

**4 · Line 24 — flex counts are stale (VERIFIED against `_source`, 16 Nov ruling).**
OLD: `the 99-rule table (23 at 12, 43 at 6, 10 at 2, 23 at 0)`
NEW: `the 99-rule table (23 at 12, 42 at 6, 17 at 2, 17 at 0 — six rules moved 0→2 by the Owner, 16 Nov 2026)`
The rest of line 24 (table provenance, R-7 asymmetry) is still accurate; leave it.

**5 · Lines 29–34 — replace the whole Current-state block with five dated lines.**
OLD: the five `2026-11-09` bullets and the `Open Owner decisions: none pending` line.
NEW:
```
## Current state (rewrite this block when it changes)
- 2026-11-20: Framework closed — Svelte 5 + Vite 8, "vite 8" token stays. Architect commits: `da0cf927` (S3 snapshot + S4 async twins), `92f87f7e` (dispatchAsync no longer poisons the queue), `ed16fd8f`/`3cf3e91f` (passGap report + caveats), `aa4f9b3d` (S1 ValueProvider seam; Q7 law tested), `408410477` (multisport plan M, docs only). 428/428 tests, tsc 89/89 on the last verified run (NOW.md, VERIFIED by Pickle).
- 2026-11-20: passGap study is report-only. λ=0 and GLM stays OFF; the tilt is pack-independent and does not identify λ. The open item is a ratings→gap mapping, explicitly post-cutover — not a pre-cutover tuning project.
- 2026-11-20: concrete-rule and event-sourcing migrations are DEFERRED to the cutover re-pin (Owner, 18 Nov). Stop chasing historical alignment; tune values and history after shipping.
- 2026-11-20: c10 landings pending Owner action. Repair rehearsal (C3), doc-fix landing simulation (C4) and pre-landing audit (C9) are pushed on `council/porca`; hosts are 49/48/48 OK and the three CHECKSUMS md5 lines still need editing in the same action.
- Open Owner decisions (collected in `inbox/20261120-0333-porca-C7-owner-owes.md`): land the repair and doc fixes, rule hosted-c9 policy, rule the C′1 export, confirm the four ALL-CAPS tabs, leave the Part-0 quote as reported. The Owner does not read or sweep the queue manually.
```

**6 · Line 40 — the idea registry changed (VERIFIED: AGENTS.md §8 freezes SUBMISSIONS.md).**
OLD: `An idea: `SUBMISSIONS.md` with exact change, blast radius and evidence.`
NEW: `An idea: one `inbox/<UTC>-<seat>-<slug>.md` with the §5 patch form (WHERE · old → new · WHY · SAFE ALONE? · HOW TO CHECK); `SUBMISSIONS.md` is frozen history.`

## WHAT I DID NOT PROPOSE CHANGING

- Line 15 (w89 live) — VERIFIED byte-true by blob id; leave it.
- Line 18 (pin `d3bd81d2`) — still the live pin in muse AGENTS.md; no movement (the C5 ring fix is a view change, not an engine change).
- Lines 26–27 (calibration) — no new N=1000 run was reported to me; unchanged.
- I did not edit the file: MUSE is the single writer. This is an advisory patch list only.
