# Soccer Competition Scope Proposal

**Status:** Dated starting list for future review, not a permanent ranking contract.

The Owner requested current and all-time simulations for soccer leagues ranked above MLS and MLS itself. This proposal interprets that as the men’s domestic league competitions in ranks 1 through 17 of the Opta ranking snapshot reproduced on September 20, 2026. Opta’s published methodology compares league strength using average team power and the strength of the leading teams; the ranking is dynamic and should be rechecked before implementation. [Opta methodology overview](https://theanalyst.com/articles/strongest-football-leagues-in-the-world-opta-power-rankings) · [September 2026 ranking snapshot](https://en.as.com/soccer/mls-snubbed-again-opta-analysts-ranking-of-the-worlds-best-leagues-is-raising-eyebrows-f202609-n/?outputType=amp)

## Provisional competition list

| Rank | Competition | Country / scope | Stable key proposal |
|---:|---|---|---|
| 1 | Premier League | England | eng-premier |
| 2 | Bundesliga | Germany | ger-bundesliga |
| 3 | LaLiga | Spain | esp-laliga |
| 4 | Serie A | Italy | ita-serie-a |
| 5 | Ligue 1 | France | fra-ligue-1 |
| 6 | Campeonato Brasileiro Série A | Brazil | bra-serie-a |
| 7 | Belgian Pro League | Belgium | bel-pro-league |
| 8 | Liga Profesional | Argentina | arg-liga-profesional |
| 9 | Primeira Liga | Portugal | por-primeira |
| 10 | EFL Championship | England | eng-championship |
| 11 | Ekstraklasa | Poland | pol-ekstraklasa |
| 12 | Danish Superliga | Denmark | den-superliga |
| 13 | Liga MX | Mexico | mex-liga-mx |
| 14 | Süper Lig | Türkiye | tur-super-lig |
| 15 | Eliteserien | Norway | nor-eliteserien |
| 16 | Eredivisie | Netherlands | ned-eredivisie |
| 17 | Major League Soccer (MLS) | United States / Canada | usa-mls |

Under this snapshot, the intended portfolio is 17 current and 17 all-time league experiences. The EFL Championship is included because the Owner’s boundary is rank-based, even though it is a second-tier league. Other second-tier competitions should not be added unless they meet the approved rule or the Owner explicitly chooses them.

## Required clarification before implementation

1. Does “top leagues” mean this dated Opta ranking, another ranking, or a curated product list?
2. Are these men’s domestic leagues only? Should women’s leagues be a separate portfolio?
3. Are domestic cups and continental competitions excluded from the initial definition?
4. Should every country get a league configuration when it qualifies, or should the Owner curate a fixed catalog?
5. What is the soccer equivalent of the existing draft workflow? Soccer recruitment is commonly organized through transfers, academies, and contracts; a fantasy-style draft may be a game mode rather than a real-world roster mechanism.
6. How should promotion/relegation and changing league membership work in current and all-time seasons?
7. What defines an all-time pool: all eligible players across the competition’s history, selected seasons, club-level peak, or another scope?

## Implementation guidance

Use stable competition keys and versioned configuration. Keep a ranking snapshot with source, retrieval date, and method. Do not derive live production scope from a daily changing ranking. Revalidate the list when work begins, record any changed inclusions in a decision record, and let a single soccer engine serve multiple league configurations only where their rules truly match.

Do not create 34 separate engines. Start with one representative current league and its all-time counterpart, prove the data and rules boundary, then expand the competition catalog.
