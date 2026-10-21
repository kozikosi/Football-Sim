SPEAKER: MIMO | ROLE: Council reviewer (assignee of DS) | TASK: SOCCER-CUTOFF-DECISION — decision-ready one-pager | DATE: 2026-10-21 (UTC)

Completes `_agents/mimo/notes/owner-soccer-ranking-options.md` (12,709 B, this round): options paper → choosable cut. State pin VERIFIED: branch `gpt/council-reliability-scorecard`; artifact `NFL Draft Simulator merged.html` = `merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` — shasum'd identical this session (DS's pin matches).

Reading rule for this page: every cell is what I read this session (source + retrieval date) or UNKNOWN. The circulating "IFFHS MLS 40th, 426.75 pts" stays REPORTED and appears in no table: my Wikipedia IFFHS fetch contains no MLS position and no points (grep `MLS|426|Major League` on the saved fetch → zero matches, 2026-10-21).

## 1. Ranked table — Opta Power Rankings basis (only candidate whose list demonstrably contains MLS and whose positions I actually read)

Source for every row: Opta Power Rankings as published by GiveMeSport ("Best leagues in world football ranked", last updated Aug 2, 2026; article points to theanalyst.com Opta power-rankings as original), retrieved 2026-10-21. The retrieved text publishes ordinal positions only — no power-ranking values — so the value column is UNKNOWN throughout.

| Pos | League | Country | Metric value | Source | Version/date |
|---|---|---|---|---|---|
| 1–10 | 10 rows not individually shown (fetch truncated) | — | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 11 | Ekstraklasa | Poland | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 12 | Superligaen | Denmark | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 13 | J1 League | Japan | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 14 | Süper Lig | Türkiye | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 15 | Eredivisie | Netherlands | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 16 | Primera A (Apertura) | Colombia | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| — | **== CUT LINE == MLS sits below this row: exact position UNKNOWN, bounded [17,30] (article places Colombia 16th above "MLS"; MLS stated "included" in the top 30)** | | | | |
| 17 | Super League (article renders "Brack Super League") | Switzerland | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 18 | Prva HNL | Croatia | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 19 | Eliteserien | Norway | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 20 | Liga Pro | Ecuador | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| in top 20 | Championship (2nd tier) | England | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 36 | Premiership | Scotland | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |
| 37 | Saudi Pro League | Saudi Arabia | UNKNOWN | Opta via GiveMeSport | snapshot 2026-08-02 |

Rows displayed: 15 (cap). Full published list = 30 entries; positions 1–10 and 21–35 not retrieved (page fetch truncated — the article's "full table of 30" section did not come through); 36/37 read from the same article's prose. MLS exact position UNKNOWN ∈ [17,30]. IFFHS position for MLS: UNKNOWN primary (REPORTED secondary, conflicting 40th vs top-10).

## 2. Marked cut
The rule inside the table is the cut: everything strictly above MLS **plus MLS** — the Owner's target set. It cannot be frozen: MLS's exact position is UNKNOWN on the only readable source, so the operational cut is "P leagues where P ∈ [17,30], pending one re-retrieval."

## 3. Resulting sim count
- Sims: N = P leagues incl. MLS → current + all-time = **2P = 34–60 simulations** (IFFHS-reported 40th, if true: 80).
- Pools — two readings, both live on the board:
  - **Reading A** (per league-version; DS's phrasing here): **2P = 34–60 pools** × 1,500–2,000 = **51,000–120,000 candidate records**.
  - **Reading B** (Owner's "per sport" wording): **2 pools total** (one current-soccer, one all-time) — ceiling 1,500–2,000 ÷ P leagues ⇒ **at most 50–118 players per league**; whether any league sim can run on that is UNKNOWN (per-sim player requirement undefined in anything I read). Pool scope must be settled with the cut: one reading starves the sims, the other triples the data budget.

## 4. The three candidate sources

| Source | What it actually measures (as read) | Cadence | Licensing/availability | Second-tier coverage → cut stability |
|---|---|---|---|---|
| IFFHS "Strongest National League" | Annual strongest-league list; method UNKNOWN — Wikipedia documents DPA refusing to publish IFFHS rankings plus published methodology criticism; my fetch holds no ordered table, no points (VERIFIED by grep 2026-10-21) | Annual, January editions (REPORTED via citation list; 2025 edition REPORTED released 2026-01-16) | iffhs.com under reconstruction, "rankings will return in full" (VERIFIED 2026-10-21); current table not obtainable; reuse terms UNKNOWN | UNKNOWN (INFERRED top flights only, from the title). Cut stability: unassessable while the primary table is unobtainable |
| Opta Power Rankings (The Analyst; via GiveMeSport) | "Average power ranking for every team in the respective division", team power ranking = each club's standing in Opta's algorithm (VERIFIED read); algorithm internals UNKNOWN | Article snapshot 2026-08-02 (VERIFIED); underlying rankings continuous (INFERRED) | Proprietary Opta data republished in media; article readable; no machine-readable table; reuse of the numbers UNKNOWN | YES, covers second tiers — Championship inside the top 20 (VERIFIED; exact position UNKNOWN). Cut stability: **NOT stable until an explicit tier rule** ("top flights only" vs include tier-2) — the cut moves by ≥1 league on that rule alone |
| World Football Elo → league aggregation | INFERRED (match-results Elo aggregated to leagues; Ultra's version REPORTED via bulletin M-138: cutoff ≥1700 ≈ 180 clubs). No Elo league table read this session | INFERRED continuous | INFERRED public; no archived snapshot exists (UNKNOWN) | UNKNOWN. Cut stability: no cut exists to be stable — nothing reproducible has been produced |

## 5. Cost of choosing wrong (quantified)

| Cut came from | Truth turns out to be | Leagues moved | Pools redone (×2 versions) | Records re-prepared |
|---|---|---|---|---|
| Opta (MLS ∈ [17,30]) | an IFFHS-style 40th | 10–23 | 20–46 | 30,000–92,000 (×1,500–2,000) |
| IFFHS (reported 40th) | Opta's actual MLS position | 10–23 | 20–46 | 30,000–92,000 |
| any source + tier rule wrong (Championship counted) | top-flights-only intended | ≥1 (Championship read; other tier-2s inside 21–30 UNKNOWN) | 2–6 | 3,000–12,000 |
| Elo chosen today | any actual list | UNKNOWN — no Elo cut exists | UNKNOWN | UNKNOWN (the unquantifiability is the cost: no seat could re-measure it) |

## 6. Recommendation (three sentences)
Do not freeze the cut today: use the Opta/GiveMeSport 2026-08-02 snapshot as the working basis — the only candidate that demonstrably contains MLS and whose positions I actually read — and re-retrieve its full 30-league table first, to pin MLS exactly (bounded [17,30]) and to apply an explicit top-flights-only tier rule before any pool work starts. Keep IFFHS as the citable cross-check only when iffhs.com returns with its real table (under reconstruction — VERIFIED 2026-10-21; its MLS position remains a REPORTED conflict), and treat Elo as UNVERIFIED until an archived snapshot exists. The asymmetry decides it: a wrong cut strands 20–46 pools (30,000–92,000 records) plus the tier-rule ambiguity, while the re-retrieval that prevents it is one fetch — and the pool-scope question (§3) reaches the Owner in the same pass as source + cutoff.

---
Compliance: read-only on builds/pools/PRs; writes confined to `_agents/mimo/`; no ratings, no pool contents, no implementation; no git operations; external claims labeled REPORTED with source + date; unread sources never presented as verified.
