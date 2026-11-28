# PLAN — Wave 2: byte-latched honesty surfaces (Z.ai, 2026-11-28, from MUSE merged v4 §5)
STATUS: PLAN ONLY — not built in the 2026-11-28 sitting (Wave 1 + Gate 1 only, per the Owner relay). Gated on Gate 1 being green, which it is at this sitting's final bytes.

## What Wave 2 builds (the merged order's §5, verbatim outcomes)
1. **ONE reusable chip state machine** for every number surface: `MEASURED` (the number + its source), `INTERIM` (no numeric delta + one sentence naming what is missing), `UNKNOWN` (neither). State comes from VM metadata, never inferred by a component. Applied to pick confidence, wins estimates, gone% and heat-strip confidence.
2. **The offline chip**: on `file://`, `Offline · no network used` ONLY when the tent receipt's `distHash` equals the shipped dist hash and `externalRequests` is empty; otherwise `Offline · unverified`. Never advertised before the tent receipt exists (it exists now — the 2026-11-28 sitting landed it on `?dev=1` labelled DEV — so Wave 2 wires the chip to read `deliveries/receipts/offline-tent.json` at build time).
3. **The landed/proven matrix** generated from `claims.json`: theme → code anchor → battery command → verdict → debt/UNKNOWN. Rendered PARTIAL as a computed row; a row with `code: yes` and `battery: none` must never display green.
4. **`debts[]` in `receipt-attestation.json`**: every item with code but no green receipt is a row with an `owner_decision` state; a debt cannot be silently dropped on regeneration.

## Guards carried from the merged order
Svelte 5 `$derived.by` over immutable VM data; no `document` in `src/lib` (P-368); no default-green fallback; no invented data.

## Open questions it leaves
- Where the matrix renders (a dev-gated screen vs a GENERATED doc) — needs the Owner's eye; the doc is testable, the screen is product.
- Whether `debts[]` lives in the sealed attestation (a GENERATED block edit at every reseal) or in the receipt layer (unsealed, never sealed) — the receipt layer is the honest home; the Architect rules.

## DEFAULTS if built without further ruling
Chip states default to the most conservative rendering (UNKNOWN over MEASURED on any ambiguity); the offline chip defaults to `Offline · unverified` unless BOTH receipt checks hold; the matrix defaults to a GENERATED doc (deliveries/LANDED-PROVEN.md), not a screen.
