SPEAKER: inkling | ROLE: ratification packet | TASK: the decision handoff, one page | DATE: 2026-11-14 | Audience: KG (Owner)

# Ratification packet — BENCH-1 (corrected to receipts; read me, sign me, move on)

Everything below was re-derived this pass from `z bench1 run v1` bytes (published at `council/inkling @ 37c15d12`, byte-identical to the twin deliveries); no number cited from the summary text. Labels: VERIFIED (commands re-run this pass) / REPORTED (seat receipts agree) / INFERRED / UNKNOWN.

**The one sentence you needed all week, at the top:** the copy says W1/ENG-1/ENG-2/ENG-3/SAVE-1 all pass by wide margins under every verification; the two UX rows are not ratifiable until the goneOdds cost is addressed (or you waive); A3 and the analysis-time tie-rule stay UNKNOWN; the Owner's signature sets the acceptance boundary, nothing else. INKLING does not sign and does not rank shells.

## The rows, annotated, per-run truths (`z bench1 run v1/receipts/tier1-run{1,2,3}.json`)

| Row | Ratify | Receipt anchor | Note |
|---|---|---|---|
| W1 pool parse+freeze ≤ 250 ms | **yes** | 19.81 / 40.13 / 10.38 / 9.73 (smoke); ≤ 250 ms holds at every data point incl. rerun 6.30 | ~6–12× headroom; runtime depends on Node/npm version pair — codify “≤ 250 ms” holds at Node ≥ 22.6 (type-stripping) |
| ENG-1 D-32R full draft ≤ 10 s | **yes** | r1 772.4/816.1/1583.1 · r2 771.9/791.9/821.7 · r3 785.7/809.7/840.2 · INKLING-rerun 624.0/676.7/951.7 | ≤ 10 s holds in every run with margin; one warm-up tail (warm-up recommended before any re-measure) |
| SAVE-1 record ≤ 250 KB | **yes** | 187,078/187,079 B (u31 +1 byte), stable ×30 | 75% of budget, no variance of consequence |
| ENG-2 season ≤ 10 s | **yes** | `timings.W4.seasonMs` 335.3 / 339.9 / 349.9 / stagger (inkling rerun 257.3) | ~28–29× headroom; engine nowhere close to budget |
| ENG-3 one game p95 ≤ 20 ms | **yes** | ~0.075–0.079 ms across runs | >200× headroom; robust |
| UX-1 PICK→paint ≤ 100/250 ms | **no (hold)** | both arms, corrected wiring: p50 ≈145.4 ms ceiling ~2,194 ms p95; >1 s at 11 of 32 user picks (both arms identical set [2,4,6,…,22]) | engine goneOdds cost; not wiring; a signature here blesses the wrong thing |
| UX-2 sort/filter ≤ 50/100 ms | **no (hold)** | 60-row cells 62–63 ms (empty odds window = parity) vs 1,204–7,415 ms (full window) | same news as UX-1, same fix path — engine, not frameworks |

## The standing UNKNOWN bins (write them down wherever this packet goes)

- `receipts/a3.json` — never shipped; cross-engine float parity is UNKNOWN;
- `receipts/*-analysis.json` — the bootstrap-CI/tie-rule application at analysis time is UNKNOWN;
- Node 22 (A2) — never run anywhere in this wave; two-machine cross-check covered Node 24 vs 26, not this one;
- The engine-vendor digest basis — three values on the record (`432a1701` / `cd298e99` / `753997bac4`); content identity proven (three independent `diff` passes + byte-identical records), basis untraceable from inside the package;
- Analyzed vs ratified deltas — everything here was verified against raw bytes; nothing has been ratified by anyone but you.

## What a signature changes

Five budget acceptances land for every future build that meets them (CI warnings run-only; no one has to fail a build for them yet). Once signed, the two UX rows can be re-opened by anyone; your word decides then. Sign this way:

> "Ratified rows W1/ENG-1/ENG-2/ENG-3/SAVE-1 as written on 2026-11-14; UX-1 and UX-2 returned for engine-backed resolution (when `selectBoard`'s goneOdds window answers, the budgets reopen); A3/A2 and analysis-time application remain UNKNOWN on the record. No verdict on the framework is implied or given in this packet. The engine's goneOdds window question is routed to the Architect (`inbox/20261114-0709-inkling-architect-goneodds-ask.md`) as a product-performance matter, independent of any framework decision."

Copy that text above into your own words if you sign; nothing here is auto-binding.

— inkling (receipts complete; votes not offered)
