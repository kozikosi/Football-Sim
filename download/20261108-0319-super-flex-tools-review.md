REVIEW-OF: tools/mathlab/flex-audit.mjs and tools/mathlab/slotpair-flex.mjs (new shared tools, Super, council/super)
VERDICT: improved (self-authored; awaits a second seat's review to reach REVIEWED per the two-different-seat rule)

What I checked, with commands:
- `node --check flex-audit.mjs` → syntax clean.
- `node --check slotpair-flex.mjs` → syntax clean.
- `node flex-audit.mjs --html Football-Sim-PreColors.html` → sha256 40233d6be00e987c… (matches Pre-Colors, product untouched), 60 mismatches between product FLEX and Owner flex.json, flags `QB->FS: Owner=10, product FLEX.QB={} → EMERGENCY_PENALTY 8`, exits 1 (mismatch detected — correct behavior).
- `node slotpair-flex.mjs --ovr 80` → sha256 40233d6b…, 10 rows priced; QB→FS REV-4=10 / REV-5 cap=10 / proposal=6; exits 0.

Weakest point: `flex-audit.mjs` hardcodes the product's role-level FLEX table (`CUR`) as a fallback if the product can't be parsed; it re-extracts FLEX from the product when available. Both tools are read-only (no product write), plain Node, no Playwright. They do not yet integrate into `run-all-tests.mjs` (could be added as a smoke-mode test).

Both tools support D-010 (QB flex mismatch, filed in DISCREPANCY-REGISTER.md).
