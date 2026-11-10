# UPDATE-README — Z.ai lane · 2026-11-10

## What this chat shipped

**Flex-price derivation ZAI-D1 ("load-bearing deficit")** — designed, implemented, fitted, and filed. Read-only throughout: no engine bytes, no table bytes, no branch touched, snapshot stays `4ca9a071`, nothing built into the app (directive boundaries honored).

- **Design + fit:** `_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md` — tier(M + 0.4·S) over 17 scoped duties; NEED/HAVE split; **no D term, no overrides, no U-deltas (0 fiat rows)**. Fit vs the live 99-rule table: **95 exact / 3 off-by-one / 1 hard / tier-error 5**. Inkling P-322 re-verified on his own prototype first: 88/11/0 (floor off), 93/6/0 (floor on). Four residuals, each named and explained (2 hub rows, 1 policy row, 1 knife-edge).
- **Implementation:** `_agents/zai/tools/zai_flex_derive.py` (read-only; emits full 99-row diff, λ ablation, cut refit, quasi-metric scan, DL5 pricing). Outputs in `tools/results/` (+ frozen live-table snapshot for reproduction).
- **Hard cases:** all six Inkling 0-residuals derived by construction; cross-side floor as policy; DL5 priced under the Owner's blitzer reframing as a NEED profile (EDGE 0, DT 2, OLB/ILB 2, OT/OG 6, SS/TE 12).
- **Findings:** the live table is a directed quasi-metric — its 13 triangle violations are exactly the Owner's hand-set premium rows; cross-side prices are binary 6/12 and all 16 twelves are independently derivable.
- **IDEAs filed (not built):** `imports/IDEAS-2026-11-10.md` — UI reasoning display; mathlab quasi-metric audit tool; NEED-first slot authoring; tier-12 semantics; premium ledger. IDEA-3/IDEA-4 need Owner rulings.

## Decisions the Owner owes

1. Relay ZAI-D1 to the council vs Inkling's P-322 (both verified; mine fits better with fewer inputs).
2. Rule on IDEA-3 (NEED-first authoring for new slots — would replace the min-of-neighbors DL5 rule).
3. Rule on IDEA-4 (tier 12 = "prohibitive" semantics).

## Verification

- Script re-run from a clean shell against the frozen live snapshot: same 95/3/1/5. `results/zai-d1-diff.md` regenerated.
- Inkling's `flexderive.mjs` (unchanged, from `architect/engine-and-seats`) re-run against the same flex.json: 88/11/0 and 93/6/0 reproduce — comparison is apples-to-apples.
- Zip verified by `unzip -t` and `md5sum -c CHECKSUMS.txt` in a clean temp extract (see CHECKSUMS.txt).

## Changelog (§4, one line per chat)

- 2026-11-10 — flex-derivation ZAI-D1 shipped (design + read-only implementation + fit 95/3/1/5 vs Inkling 88/11/0; IDEAs 1–5 filed; no product bytes touched).
- 2026-10-28 — stack advisory shipped (free-tier laws; SvelteKit-vs-Next decision rule; 4-rule free-tier audit).
