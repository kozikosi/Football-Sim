SPEAKER: MUSE | ROLE: Council Advisor | DATE: 2026-11-02T20:40:00Z

# TRIAGE: the 69 reviewed old-shell items — keep vs retire for Colors v1

**Method:** ran Claude's `tools/council.mjs` (with a one-line fix — see §4) against the real branches. 69 items at REVIEWED status. Each judged on one question: *does this constrain Colors v1 (new engine + Z.ai's new shell), or does it describe the old Pre-Colors HTML?*

## Recommendation: KEEP 23, RETIRE 46

### KEEP — still requirements for Colors v1 (23)

**Engine / math (9)** — these constrain the model, not the shell:
P-013 (weights recalibration), P-190 (math phase), P-191 (return-game data), P-192 (run-side terms), P-193 (flex guide), P-195 (acceptance tests E1–E9), P-196 (DIME evidence), P-198 (architecture review), P-206 (overtime rules)

**Owner design laws & brand (9)** — product identity, shell-independent:
P-043 (no star system), P-046 (no green in pick priority), P-058 (gold shimmer buttons), P-064 (no permanent green bubbles), P-077 (shimmering "Can you go 20-0"), P-078 (team-palette pick colors), P-111 (one typography), P-117 ("Can you go 20-0?" placement rule), P-185 (dark-team readability)

**Feature requirements (5)** — what the product must do, regardless of shell:
P-007 (game animation 30–60s, Skip, reduced-motion), P-114 ("Play the <opponent>" primary action), P-115 (animation refinements), P-122 (playoff/clutch drama), P-123 (elimination → Super Bowl page)

*That's 23 — engine (9) + design laws (9) + features (5).*

### RETIRE — old-shell-specific (46)

Page redesigns and component tweaks written against the Pre-Colors HTML that Z.ai's shell replaces outright: P-009, P-018, P-019, P-020, P-021, P-022, P-023, P-040, P-041, P-042, P-044, P-045, P-067, P-068, P-069, P-071, P-072, P-073, P-074, P-075, P-076, P-100, P-101, P-102, P-103, P-104, P-108, P-110, P-112, P-116, P-118, P-119, P-120, P-121, P-124, P-125, P-158, P-162, P-163, P-165, P-166, P-168, P-010, P-014, P-047, P-048.

**Why bulk-retire is safe:** every one of these says "change X in Football-Sim-PreColors.html" (or its Z-post-blue descendant). Colors v1 doesn't contain that file. Keeping them as "requirements" would mean demanding Z.ai's new shell replicate old-shell layouts the Owner already asked to move past — several (P-018–P-023, P-119) are literally "redesign this old page," which the new shell does by existing.

**Principles worth preserving (not as build items):** P-119's "draft critique fully visual, no paragraphs" and P-022's "gold shimmer champion celebration" encode Owner taste that should inform Z.ai's new designs — but as standing directives, not as tickets against a dead file. Recommend folding these into the design guidance, not the queue.

### What this needs from the Owner

One call: **bulk-retire the 46, keep the 23?** Under the new protocol, P0/P1 items need two seats or the Architect to retire — so this triage is the evidence; it still needs a second seat (or Claude) to concur, or your direct order.

## §4 — Tool bug found while doing this (for Claude)

`tools/council.mjs` `loadState()` picks the architect branch with `refs.find(r => /^origin\/architect\//)` — `for-each-ref` sorts alphabetically, so with three architect branches it picks `origin/architect/council-framework`, which has no table, and silently falls back to the stale `origin/council/base` queue. My first board run showed the *old* queue (P-001 live, 151 items). One-line fix: prefer `origin/architect/engine-and-seats` explicitly:

```js
const arch = refs.find((r) => r === 'origin/architect/engine-and-seats') || refs.find((r) => /^origin\/architect\//.test(r));
```

With the fix: 170 live, 0 retired, 69 REVIEWED — matching your count exactly. This is the "no seat has run it yet" bug you predicted. The triage above was done against the corrected board.
