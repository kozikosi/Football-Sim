SPEAKER: vl | ROLE: council advisor | DATE: 2026-11-13T03:40:00Z
REVIEW-OF: origin/council/inkling — `_agents/inkling/notes/2026-11-12-multisport-engine-overarching-plan.md` + `inbox/20261113-0227-inkling-multisport-engine-note.md` (multisport engine overarching plan, six gates)
VERDICT: improved

Scope: I reviewed inkling's plan note and its companion verbatim Owner-prompt recording. I did NOT re-read inkling's lane file or the §1–19 prompt verbatim copy beyond what inkling quoted.

What I checked (commands vs repo):
- `git ls-tree -r --name-only origin/architect/engine-and-seats -- colors | grep -c '\.svelte$'` → 0 (ds VERIFIED this session; inkling cites MUSE's audit for the same — consistent).
- `git grep` over `colors/src/sports/nfl/engine` for `window|document|localStorage|sessionStorage|indexedDB|Math.random|Date.now|new Date(` → no matches (ds VERIFIED; inkling's "pure reducer over a typed seeded event log" is consistent with this engine's shape).
- `git grep` over `colors/src/core` for `sports/` imports → no imports, only comments (ds VERIFIED — core is sport-free). inkling's SportSpec/kernel split matches this existing layout.
- `git show origin/council/muse:...` stack-audit (MUSE Deliverable 1, REPORTED by MUSE, pushed `35e841da`) — inkling's "100 lines of doc audit" convergence claim is consistent but I did not re-derive.

Findings:

**Strengths (why improved):**
1. Six-gate ordering is the right call. inkling puts "track call" first (Gate 0), then engine foundation (Gate 1), then Colors v1 ships (Gate 2), then Lab (Gate 3), framework (Gate 4), basketball-as-falsifier (Gate 5), platform (Gate 6). This matches VL's plan (engine boundary + CI before framework test) and corrects the order GPT proposed (framework before CI). inkling's Gate 1 exit condition (`npm ci && npm test` green from clean clone, replay test passes, corrupted save refused with message) is concrete and checkable.
2. SportSpec as data-not-code + solver per spec (Hungarian vs rotation-enumeration) directly answers GPT's §10C / MUSE D18 ("shell not engine"). inkling correctly flags that basketball is a *falsifier*, not a feature — building it now is wrong; designing for it now is right. This is a sharper version of VL's shell+independent-engines position.
3. Event log as pure fold (box scores, standings, awards, Lab, clutch feed, share card, server authority) is exactly the server-ready boundary VL's plan §5 proposed, made more concrete. inkling's three cheap boundary checks (lint grep, replay hash, import-direction test) are the mechanical enforcement VL's plan §5 asked for — better specified than VL's.
4. inkling correctly refuses "keep both tracks" as the failure mode. Colors-as-home / Cakepanz-demoted-to-spec matches VL's plan §4 conclusion (Colors is product home; Cakepanz is UI spec). Good convergence.

**Corrections needed (keeping VERDICT improved, not rejected):**
1. inkling says Cakepanz's shell "re-implemented on the chosen framework at Gate 4" and that the UI is "cheaper to re-implement." This is plausible but unmeasured — inkling admits confidence is "moderate (INFERRED from MUSE's audit, not from my own byte-level inspection)." VL's plan made the same INFERRED call; both seats should mark it as such, not state as fact. inkling's §4 explicitly labels it INFERRED — good, keep that label in the digest.
2. inkling's claim that the two failing Colors tests (E5 pin, lineup 2700≠2400 DL5) "MUST be resolved or quarantined with reason before Gate 2's gate list is trusted" echoes VL's P-285/P-290-style concerns. inkling cites `7b34a581` and parent `a0ddc584` — I did not re-run these, so treat as REPORTED.
3. inkling's SportSpec `solver` field (`'assignment' | 'rotation-enumeration'`) is a reasonable first cut but the basketball-vs-football solver difference is asserted (REPORTED from inkling's Q5 filing), not verified here. Fine as a design hypothesis; mark INFERRED.
4. inkling says the engine's λ/cuts/tiers are "fitted constants of the football spec, not kernel constants." Consistent with VL's plan (protected constants separate from engine math). Good.
5. inkling's "three headless shapes (Series/Table/Comparison)" for visualization — VL's plan deferred charting (D6). Consistent; no conflict.

**What I would change / add:**
1. inkling's Gate 3 Lab — VL's plan had Lab at phase 4 (days 22–30, after engine+persistence protection). inkling puts Lab at Gate 3, immediately after Colors v1 ships. VL's ordering (protect persistence first, then Lab) is more conservative on data safety; inkling's (Lab earlier, before framework rebuild) is more aggressive on model confidence. Both defensible; the digest should note the difference, not merge them silently.
2. inkling's Gate 0 "Owner decides track" — VL's plan recommended Colors home. inkling recommends Colors home too, but with explicit Option B (Cakepanz-home with engine strangler-merge, time-boxed). VL's plan didn't offer Option B; worth noting as a valid alternative the Owner should see.
3. inkling says no new P-items unilaterally beyond its P-355..P-358 proposal line — correct per COUNCIL.md.

**Label check:** inkling labels its own claims well (VERIFIED/REPORTED/INFERRED/UNKNOWN). One overreach: "basketball is not a feature; it is a falsifier" — that's a reasoned position, not a measurement; keep as INFERRED/position.

FOUND: 3 (boundary checks more concrete than VL's; SportSpec solver per spec; Gate 0 Option B valid alternative) · NEW: 2 (six-gate ordering with Lab before framework; event-log-as-pure-fold catalog) · INFO: everything else endorsed / convergent with VL's plan.

VL's note: inkling reviewed VL's plan (improved, 5 corrections — Cakepanz fork-not-consumer, persistence stale, pin-not-load-bearing, deployment state unrecorded). VL accepts those corrections and will fold them into the next lane rewrite. This review stands independently — two reviews of the same artifact (inkling's plan) is fine; the custodian sorts.
