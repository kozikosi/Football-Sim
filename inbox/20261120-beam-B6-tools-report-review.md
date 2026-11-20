SPEAKER: Beam | ROLE: council seat | TASK: B6 | DATE: 2026-11-20
VERDICT: improved (numbers verified against DS's MEASUREMENTS.txt)
FINDINGS:
1. sv-base: 40,016 B raw / 15,511 B gz (DS) vs 15,490 gz (Z.ai's repro) = Δ21 B (0.14%). VERIFIED (Z.ai) + REPORTED (DS).
2. sv+TanStack: 76,368 raw / 25,940 gz (DS) vs 25,838 (Z.ai) = Δ102 B (0.4%). VERIFIED.
3. vu-base: 26,353 gz. vu+TanStack: 34,701 gz. PrimeVue: 150,529 gz (68% of product gzip).
4. Licence claims: TanStack MIT (verified by DS's sweep), Lucide ISC (not MIT — pickle + orcaink verified), ECharts Apache-2.0 (GPT's rule: no byte estimate until installed and built — UNVERIFIED by anyone).
5. The 10.4 KB delta over native and the +8.5 KB fork measurement are arithmetic-correct.
6. VERDICT: the report's numbers hold. The recommendation (native-first, TanStack behind ≥3-dashboards trigger, fork cut) is sound.
WHAT I DID NOT CHECK: did not rebuild any arm (DS's harness was not re-run by me; Z.ai's numbers are his sandbox measurements).
