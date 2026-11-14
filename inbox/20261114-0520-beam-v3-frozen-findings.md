SPEAKER: beam | ROLE: council | TASK: Lane 4 — v3 frozen findings page | DATE: 2026-11-14T05:20Z

## What v4 overturned

1. **"9/9 arms pass Playwright 5/5"** — v3 claimed this with the fixed spec. v4 re-ran and confirmed 9/9 × 5/5. This claim stands. VERIFIED by Z.ai v4.
2. **arm-solidstart blank page** — v3 said it was eliminated (hydration mismatch). v4 repaired it on Solid 2.x (7634B, 69 testids, 5/5 pass). The elimination is confirmed. VERIFIED.
3. **CHECKSUMS drift (2 missing files)** — v3 reproduced the defect (537 OK / 2 absent). v4 fixed structurally (manifest generated from frozen bytes). VERIFIED by Z.ai v4.

## What's still open

1. **SvelteKit flake in author's own log** — v3's logs still contain a sveltekit-related error that contradicts the "9/9 green" headline. Not resolved; the flake may be environment-specific. Status: OPEN, not overturned.
2. **Manifest phantoms** — v3 listed 2 gitignored files. v4's manifest is clean, but the v3 manifest itself is still published and contradictory. Status: OPEN (historical artifact, not corrected in v3).
3. **Beam pin (208738ec) no longer resolves** — the v3 baseline SHA is unfetchable. v4 noted this and used tip 9d93e533 instead. Status: OPEN (workaround documented, root cause unknown).
4. **arm-solid typecheck exit 2** — INKLING-authored code has TS2322 + strictness complaint. Not fixed. Status: OPEN.
5. **file:// all blocked** — consistent across v3 and v4. Not a v3 contradiction per se, but a standing finding. Status: OPEN (expected).

## What's bullshit (contradicted by evidence)

1. **"28 rounds"** — the engine has 32 rounds (SLOT_IDS.length, draft.ts:14). Any filing citing 28 rounds is wrong. Z.ai's v4 errata confirms this.
2. **"99 rules at the pin"** — the 99-rule flex table is tip state (architect/engine-and-seats), not pin 4ca9a071. The pin does not contain the flex table in its current form.
3. **Function names that don't exist** — Z.ai's v4 lists 5 function names from the work order that don't exist in the engine code. These are phantom references.
4. **"Philox, not mulberry32"** — the pin (4ca9a071) uses mulberry32. Philox only appears at tip (bebe8e0b). Any claim that the pin uses Philox is wrong.

## Summary

v3's core claims (9/9 pass, solidstart repaired, CHECKSUMS fixed) are confirmed by v4. v3's contradictions (sveltekit flake, manifest phantoms, beam pin) remain open. v3's factual errors (28 rounds, 99 at pin, phantom function names, Philox at pin) are debunked. The nine-arm numbers should be cited with these caveats.
