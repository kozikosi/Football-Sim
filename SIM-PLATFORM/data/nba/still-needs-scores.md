# NBA — who still needs a score, and what the pool still needs beyond that

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: answer the Owner's question on the all-time NBA list | DATE: 2026-10-21T09:30:00Z**

## What is already rated

| set | size | file |
|---|---:|---|
| current NBA (2027 ratings) | **538** players, all rated | `nba-2027-owner-ratings.json` (sha256 `9724ebee51e1db0f…`) |
| NBA all-time (the Owner's new list) | **100 player-seasons = 87 distinct people**, all rated | `nba-alltime-top100-owner.json` (sha256 `08d99c9cbed77fc4…`) |

**The all-time list is player-seasons, not players** — and that is the useful part, because the Owner's
direction says person identity and player-season stay distinct. 100 rows cover 87 people; ten appear
more than once (LeBron ×3, Durant ×3, Kawhi ×3; Shaq, Kareem, Wilt, Erving, Oscar, Moses Malone and
Anthony Davis ×2 — each row a different peak-era team). The all-time list also **carries position
candidates** (`SG / SF`, `PF / C`, `PG / N` …) and **country and height** — which the 2027 current list
does not have. So:

* **the 2027 list gives you OVR for the current league**, and no positions;
* **the all-time list gives you OVR, positions and context for the top 87**, and no franchise.

## So: which players do you still need to assign scores to?

1. **The all-time pool beyond the top 87.** At your target of 1,500–2,000 candidates per sport, the
   all-time NBA pool still needs **~1,100–1,900 more people** scored. The 87 you just sent are the
   ceiling of that pool, not a sample of it — nothing below them is rated yet.
2. **From the council's intake: 285 candidate names are still unrated.** Of those:
   * **39 are full names** — a ready-made first batch: Ben Simmons, Blake Griffin, Grant Hill, Bill
     Cartwright, Byron Scott, Danny Manning, Darryl Dawkins, Elden Campbell, Charlie Scott, Chris Ford,
     Dennis Scott, Earl Monroe, Bailey Howell, Brian Taylor, David Wesley, BJ Armstrong, Brendon Haywood,
     Dick Barnett, Michael Ray, and the rest of the list in `still-needs-scores.json`.
   * **377 are a single token** — first names or nicknames from the source (`Kareem`, `Magic`, `Lebron`,
     `Wemby`, `Penny`, `Admiral`, `Divac` …). These cannot be scored until someone resolves them to a
     person; a curator pass is needed first, because a wrong resolution scores the wrong player.
3. **Five rows in the intake are not players at all** and my extractor wrongly listed them as
   candidates: `Starting Five`, `Basic Draft`, `Best Duos`, `Reddit Goat Calcukator`, `Top Peak NBA`.
   They are now filtered out of the work list and should be removed from the intake.

## What the NBA pack needs besides scores

* **Franchises for all 538** (today's franchises, per your direction) — the current list has none.
* **A position source for the other 451 current players** — the all-time list covers 87; the 2K export
  is the natural source for the rest. Without positions, a draft selects nobody (the validator says so
  in as many words: *0 of 450 slots fillable*).
* **Confirmation of two columns in the all-time list** — see below.
* **The roster and rotation shape** (you floated "up to 10 per team", computer-managed rotations first):
  30 × 10 = 300 slots, or 30 × 15 = 450.

## One thing I need you to confirm (I inferred it, and I did not bake it in)

Your all-time rows carry **three numbers**. I read them as **OVR · three-point shooting · defence**,
because the reading fits every case that can be checked against a known 2K-style profile:

| player | OVR | c2 | c3 | reading |
|---|---:|---:|---:|---|
| Shaquille O'Neal | 99 | **26** | **98** | cannot shoot, elite rim defender |
| Stephen Curry | 98 | **99** | **36** | elite shooter, poor defender |
| Steve Nash | 96 | **94** | **25** | elite shooter, poor defender |
| Chris Paul | 97 | **83** | **27** | good shooter, poor defender |
| Jalen Brunson | 93 | **86** | **35** | good shooter, poor defender |
| Tony Parker | 95 | **89** | **30** | good shooter, poor defender |
| Wilt Chamberlain | 98 | **43** | **85** | poor shooter, great defender |
| Larry Bird | 99 | **98** | **45** | elite shooter, poor defender |
| Michael Jordan | 99 | **83** | **95** | good shooter, elite defender |

Both columns run 25–99, which is the 2K attribute scale. **I have labelled them `three_point_shooting`
and `defence` with an `INFERRED` marker in the file, not as facts** — so if the reading is wrong, the
label is visible rather than baked in. Your call.

## Also done, as you asked

**Diacritics added** to everyone who needs them, in both files — Jokić, Şengün, Porziņģis, Buzeliņš,
Vučević, Topić, Bogdanović, Valančiūnas, Nurkić, Schröder, Jović, Salaün, Traoré — and three nicknames
expanded to their legal names for the person record: Earvin "Magic" Johnson, Nathaniel "Nate" Archibald,
John Alexander "Jo Jo" White. The 2027 pool's source spelling is kept in `name_source` so nothing is
lost.

**Peak years: discarded** as you instructed — `peak_year` is null on every player-season, and the team
is recorded as peak-era context only.
