== the two de-gated tests — by name, with the exact reason each fails (Bounds; NOT touched — the Architect's call) ==

1. lineup.test.ts — the test asserts EXACT OVR LOSSES across the flex comparison (losing 2400/2700 in the flex weights). Why it fails on new pins: the P-318 seam (architect commit 7f95bc2, 'draft, lineup and board spend a measured provider, not SLOTS[].weight') replaced the static SLOTS[].weight table with the measured provider — the exact-loss numbers the test pins were computed from the OLD table, so any pin >= P-318 produces different flex deltas. Passes on pins < P-318, fails on pins >= it.

2. versions.test.ts (the stamp-pin test) — demands the OLD stamp string nfl1.14a4e9333e888a. Why it fails on new pins: the engine version stamp moved with the engine; any pin after the stamp change produces a different engineVersion string, so the exact-match assertion fails. Passes on pins at/before the stamped one, fails after.

The ruling (Bounds, verbatim): 'The ruling is: fix them, not carry them. Who fixes them is the Architect's call; you are not inside colors/.' — this seat did NOT touch them, did NOT re-gate them, and files them here so the next Architect sitting can regenerate both assertions from the CURRENT pin's own outputs.
