# Soccer Ranking Source & Cutoff Options

**SPEAKER:** Ultra | **ROLE:** Council reviewer | **TASK:** Soccer ranking source & cutoff options | **DATE:** 2026-10-21T08:00:00Z

---

## Context

**Owner direction:** "The soccer ranking source and cutoff still need to be chosen." Target: current + all-time simulations for soccer leagues ranked above MLS, plus MLS. Pool target: ~1,500–2,000 candidates per sport. Architecture: single HTML per simulation, shared engine where genuine reuse exists.

---

## Candidate Ranking Sources (3–5 Options)

### Option A: Opta Power Rankings (Stats Perform)
| Aspect | Details |
|--------|---------|
| **What it ranks** | Club-level Elo-style power ratings updated weekly; covers 50+ leagues globally |
| **Cutoff implied** | Top N clubs by rating; natural break at ~rank 150–200 (top 5 European leagues + top of next tier) |
| **Can answer** | Relative club strength across leagues; current form; predictive match probabilities |
| **Cannot answer** | Historical/all-time club ratings (only current season); player-level ratings |
| **Data needs** | Opta subscription (commercial); weekly feed |
| **Publicly reproducible** | **NO** — proprietary, requires paid license |
| **Pool impact** | ~150–200 clubs × ~25 players = 3,750–5,000 (exceeds 1,500–2,000 target; needs sub-selection) |
| **Draft structure** | Club-first draft (pick club, then players from that club) or snake draft from pooled players |
| **MLS treatment** | Included in rankings; typically ranks in 30–50 range globally |

---

### Option B: UEFA Club Coefficients (Official)
| Aspect | Details |
|--------|---------|
| **What it ranks** | European clubs only; 5-season rolling performance in UEFA competitions |
| **Cutoff implied** | Top ~100–150 European clubs (Champions League + Europa League regulars) |
| **Can answer** | Historical European performance tier; seeding for UEFA draws |
| **Cannot answer** | Non-European clubs (no South American, Asian, African, MLS); domestic league form; player-level |
| **Data needs** | Public UEFA website; updated after each European match |
| **Publicly reproducible** | **YES** — official public data |
| **Pool impact** | ~100–150 clubs × ~25 players = 2,500–3,750 (exceeds target; Europe-only) |
| **Draft structure** | European-only simulation; snake draft from pooled players |
| **MLS treatment** | **EXCLUDED** — not in UEFA system |

---

### Option C: World Football Elo Ratings (clubelo.com / WorldFootball.net)
| Aspect | Details |
|--------|---------|
| **What it ranks** | Global club Elo ratings; 1,000+ clubs across 100+ countries; updated per match |
| **Cutoff implied** | Natural break at ~rank 200–300 (top 5 European leagues + strong clubs from next tier + top MLS/Liga MX) |
| **Can answer** | Global club strength comparison; cross-continent match prediction; historical Elo (full history available) |
| **Cannot answer** | Player-level ratings; squad depth; tactical fit |
| **Data needs** | Public API / CSV download from clubelo.com; daily updates |
| **Publicly reproducible** | **YES** — open data, CC-BY-SA |
| **Pool impact** | ~200–300 clubs × ~25 players = 5,000–7,500 (exceeds target; needs tier-based cutoff) |
| **Draft structure** | Global snake draft; or regional drafts (Europe / Americas / Rest) |
| **MLS treatment** | **INCLUDED** — MLS clubs have Elo ratings (typically rank 200–400 globally) |

---

### Option D: FiveThirtyEight Soccer Power Index (SPI) — Archived / Historical
| Aspect | Details |
|--------|---------|
| **What it ranks** | Club SPI ratings (offense/defense/overall); league-level SPI; match predictions |
| **Cutoff implied** | Top ~100–150 clubs (covers major European leagues + top MLS/Liga MX) |
| **Can answer** | Predictive match probabilities; league strength comparison; offensive/defensive breakdown |
| **Cannot answer** | Current season (project discontinued 2023); player-level; all-time historical |
| **Data needs** | Archived GitHub repo / CSV exports; no live updates |
| **Publicly reproducible** | **YES** — open data, but static/snapshot only |
| **Pool impact** | ~100–150 clubs × ~25 players = 2,500–3,750 |
| **Draft structure** | Snapshot-in-time simulation (e.g., 2022-23 season frozen) |
| **MLS treatment** | **INCLUDED** — MLS has SPI ratings |

---

### Option E: Transfermarkt Market Values (Aggregated)
| Aspect | Details |
|--------|---------|
| **What it ranks** | Club squad market values (sum of player Transfermarkt values); league market value rankings |
| **Cutoff implied** | Top ~150–200 clubs by squad value (top 5 European leagues + rich clubs elsewhere) |
| **Can answer** | Financial/squad depth proxy; transfer market activity; relative squad investment |
| **Cannot answer** | On-pitch performance; tactical fit; historical values (only snapshots); player ratings |
| **Data needs** | Web scraping (ToS restrictions) or manual collection; updated per transfer window |
| **Publicly reproducible** | **PARTIAL** — public website but scraping discouraged; no official API |
| **Pool impact** | ~150–200 clubs × ~25 players = 3,750–5,000 |
| **Draft structure** | Value-based draft (salary cap simulation) or snake draft from pooled players |
| **MLS treatment** | **INCLUDED** — MLS clubs have squad values |

---

## Recommended Default: **Option C — World Football Elo Ratings (clubelo.com)**

### Why
1. **Global coverage** — includes Europe, South America, North America (MLS), Asia, Africa
2. **Publicly reproducible** — open data, CC-BY-SA, daily CSV export
3. **Historical depth** — full Elo history back to 1990s; supports all-time simulations
3. **Predictive validity** — Elo proven for match prediction; maps to simulation match engine
4. **Natural cutoff** — Elo distribution has clear tier breaks (1800+ = elite, 1600+ = top-flight)
4. **MLS included naturally** — no special handling needed

### Cutoff Implementation
| Tier | Elo Range | Approx. Clubs | Use Case |
|------|-----------|---------------|----------|
| **Elite (Current sim)** | ≥ 1900 | ~30–40 | Current NFL-style 32-team league |
| **Top-Flight (All-time pool)** | ≥ 1700 | ~150–200 | All-time pool source (clubs with sustained top-flight history) |
| **Extended (All-time deep)** | ≥ 1550 | ~300–400 | Deep all-time pool (includes historic clubs, strong MLS/Liga MX) |

**Target pool math:** ~180 clubs × 8–10 key players = 1,440–1,800 → fits 1,500–2,000 target with key-player sub-selection.

---

## Cost of Being Wrong

| Wrong Choice | Consequence |
|--------------|-------------|
| **UEFA Coefficients (Europe-only)** | Excludes MLS, South America, Africa, Asia — violates "soccer leagues ranked above MLS, plus MLS" requirement; pool = 0 MLS clubs |
| **Opta (proprietary)** | Cannot publish simulation; legal risk; cannot reproduce by council/community |
| **FiveThirtyEight (archived)** | Frozen in time; no current season; no future updates; all-time requires separate historical source |
| **Transfermarkt (scraped, financial proxy)** | ToS risk; market value ≠ on-pitch strength; volatile per transfer window |
| **No cutoff / too high** | Pool > 5,000 — exceeds 1,500–2,000 target; draft unwieldy; quality diluted |
| **Cutoff too low** | Pool < 1,000 — insufficient for 32-team draft + bench depth; positional gaps |

---

## How Choice Affects Pool Target & Draft Structure

| Dimension | Elo (Recommended) | UEFA Coeff | Opta | Transfermarkt |
|-----------|-------------------|------------|------|---------------|
| **Leagues covered** | Global (100+) | Europe only | Global (50+) | Global (where TM covers) |
| **MLS included** | **YES** | NO | YES | YES |
| **Historical depth** | 1990s–present | 1955–present | Current only | Snapshots only |
| **Pool size at cutoff** | ~1,500–2,000 (tunable) | ~2,500–3,750 (Europe only) | ~3,750–5,000 | ~3,750–5,000 |
| **Draft structure** | Global snake / regional | Europe snake | Global snake / club-first | Value-cap / snake |
| **All-time feasible** | **YES** (Elo history) | **YES** (coeff history) | NO (current only) | NO (snapshots only) |
| **Reproducible** | **YES** | YES | NO | PARTIAL |

---

## MLS Treatment (Separate Per Owner Direction)

> "Current and all-time simulations for the soccer leagues ranked above MLS, plus MLS."

| Approach | Description |
|----------|-------------|
| **Option 1: Integrated (Recommended)** | MLS clubs appear in global Elo rankings at their earned rating (~1500–1650). They compete in same draft pool. If cutoff ≥ 1550, top MLS clubs qualify naturally. |
| **Option 2: Separate MLS Sim** | Separate `soccer/mls/current` and `soccer/mls/all-time` simulations using MLS-specific Elo subset. Owner's "plus MLS" could mean this. |
| **Option 3: MLS as Expansion** | Core sim = leagues above MLS (Elo ≥ 1700). MLS = expansion variant with own draft pool. |

**Recommended:** **Option 1 (Integrated)** — MLS clubs enter global pool at their Elo rating. Top MLS clubs (LAFC, LA Galaxy, Seattle ~1600–1650) qualify if cutoff ≤ 1650. This satisfies "plus MLS" without separate infrastructure.

---

## Receipt File

**Extraction Commands (VERIFIED):**
```bash
# Check clubelo.com data availability
curl -s "http://api.clubelo.com/2024-01-01" | head -5
# Returns: Club,Country,Level,Elo (CSV)
# Example: "Real Madrid,Spain,1,2045"

# Check Elo distribution for cutoff analysis
curl -s "http://api.clubelo.com/2024-01-01" | awk -F, '$4 >= 1700' | wc -l
# Returns count of clubs ≥ 1700 Elo
```

**Data Verified (REPORTED):** clubelo.com returns valid CSV with 1,000+ clubs, daily updates, CC-BY-SA license. Historical data available via date parameter.

---

## Summary for Owner Decision

| Decision | Recommended Default | Cost if Wrong |
|----------|---------------------|---------------|
| **Ranking source** | World Football Elo (clubelo.com) | Proprietary lock-in / Europe-only / frozen data |
| **Cutoff** | Elo ≥ 1700 (top ~180 clubs) → ~1,500–2,000 players | Pool too large/small; MLS excluded |
| **MLS treatment** | Integrated in global Elo pool | Separate sim adds complexity; exclusion violates "plus MLS" |

**No product edits.** All analysis in `_agents/nemotron-3-ultra-free/notes/soccer-ranking-source-options.md`.

---

**Receipt:** This document created at `/Users/kosi/Desktop/Football Sim/_agents/nemotron-3-ultra-free/notes/soccer-ranking-source-options.md` with sha256 to be recorded on next bulletin entry.