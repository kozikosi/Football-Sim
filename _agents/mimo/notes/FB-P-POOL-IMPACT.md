SPEAKER: MIMO | ROLE: Council reviewer (assignee of DS, broadcast #12 support) | TASK: FB-P-POOL-IMPACT — the arithmetic for Owner #12 | DATE: 2026-10-21 (UTC)

Pin: branch `gpt/council-reliability-scorecard` @ 4558e81 · `NFL Draft Simulator merged.html` = `merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (shasum'd identical this session — VERIFIED). Owner's #12 words as broadcast (REPORTED via broadcast): FB and P become draft-board slots; RB/FB/TE play FB at no flex cost; K/P play P at no draft cost; underlying math is Claude's. Complements BOC's spec (`_agents/boc/notes/FB-P-SLOT-FOUNDATIONS.md`, M-306) — this paper is the pool arithmetic only.

## Vocabulary first (VERIFIED by reading l.924–975 of the pinned artifact)

The build's position codes differ from the Owner's words in one place that matters: **there is no `RB` code — running backs are `HB`** (`NATURAL_SLOT_MAP.HB = ['RB1','RB2']`, l.932). `NATURAL_SLOT_MAP` has **no `FB` key and no `P` key** (l.931–943), `FLEX` has none either (l.940–952), and `POS_SLOT_MAP` is built from those keys (l.962–970) — so **FB and P records are undraftable by construction today**, exactly "not drafted by design". `SLOT_FAMILY` (l.930) maps RB1/RB2→'RB', TE1/TE2→'TE' — the family matching the FLEX entries rely on. The Owner's "RB" therefore means the build's **HB** throughout this paper.

## (a) Eligibility counts from the pool — command and verbatim output

```
python3 PLAYERS-parser  (regex on the `const PLAYERS = [` array of each file; records are
["Name","POS","Full Team Name",ovr,…] — double-quoted, full team names, not 2–3-letter codes)

=== NFL Draft Simulator merged.html ===
PLAYERS records: 1200
histogram: {'WR': 151, 'CB': 141, 'DT': 125, 'HB': 89, 'LEDG': 71, 'REDG': 58, 'SS': 54,
 'TE': 53, 'FS': 53, 'MIKE': 43, 'RG': 43, 'WILL': 43, 'QB': 40, 'LT': 39, 'RT': 39,
 'LG': 38, 'K': 32, 'P': 32, 'C': 31, 'LS': 12, 'FB': 8, 'SAM': 5}
n(HB)=89 n(FB)=8 n(TE)=53 n(K)=32 n(P)=32 n(LS)=12
drop-list P+FB+LS = 52

=== NFL Draft Simulator.html ===   (identical histogram, 1200 records — same pool)
```

**Confirm/correct the swap's measurement: CONFIRMED.** FB = **8**, P = **32** — my independent count on both the pinned artifact and the live build matches the pool-swap measurement (REPORTED, three seats: MOC's re-run + Pickle M-113 + Beam M-89). **Correction by addition:** the swap's 52 dropped records are **P 32 + FB 8 + LS 12** — the assignment quoted two of the three positions. Cross-check: MiniMax's `SIM-PLATFORM/data/schema/current-pool-distribution.md` per-position table matches my counts exactly on every draftable position (WR 151 … SAM 5) — VERIFIED agreement, two independent measurements. Both files carry the **un-swapped 1,200-record pool** today (the 52-drop exists only in the swap variant builds).

## (b) Eligibility under the Owner's free-play rules — arithmetic

- **FB slot eligible (RB→HB + FB + TE, "no flex cost" = penalty 0 for all three):** `89 (HB) + 8 (FB) + 53 (TE) = **150 players**`.
- **P slot eligible (K + P, "no draft cost"):** `32 (K) + 32 (P) = **64 players**`.
- Contrast with today: FB/P eligibility is **0** for every drafted slot (no map keys). The free rules do not merely add two slots — they re-route 150 and 64 existing records into new draftable demand.

## (c) Pick economy at the new round count — command and verbatim output

```
python3 pick-economy   (teams × rounds; pct = picks/pool; und = pool − picks; c/p = pool/picks)

-- football 32-team (26 = current baseline, 27 = +FB round, 28 = +FB +P rounds)
  teams=32 rounds=26: picks=832 pct1500=55.5% pct2000=41.6% und1500=668 und2000=1168 cand/pick@1500=1.80
  teams=32 rounds=27: picks=864 pct1500=57.6% pct2000=43.2% und1500=636 und2000=1136 cand/pick@1500=1.74
  teams=32 rounds=28: picks=896 pct1500=59.7% pct2000=44.8% und1500=604 und2000=1104 cand/pick@1500=1.67
-- NBA-continuation 30-team reading (literal rerun of the M1 table's team count)
  teams=30 rounds=27: picks=810 pct1500=54.0% pct2000=40.5% und1500=690 und2000=1190 cand/pick@1500=1.85
  teams=30 rounds=28: picks=840 pct1500=56.0% pct2000=42.0% und1500=660 und2000=1160 cand/pick@1500=1.79
```

Against football's **real** pool (1,148 draftable today): 832 → **72.5%** (undrafted 316), 864 → **75.3%** (284), 896 → **78.0%** (252). Reconciliation note: MiniMax's doc reports both "surplus 316" and "~370 undrafted" — both correct: `1,148 − 832 = 316` draftable-undrafted, `1,200 − 832 = 368 ≈ 370` counting the 52 never-drafted records (VERIFIED arithmetic).

**Does the pool still never bind? — At the total level, yes.** The worst case (28 rounds, current draftable pool) consumes 78.0% and leaves 252 undrafted; against the Owner's 1,500–2,000 target the shares stay ≤59.7%. **But the binding risk has moved from the total to the per-position economy** — which is (d).

## (d) Sufficiency — what the pool supports and what it cannot

**Punters (P slot demand = 32, one per team):**
- Natural P supply = **32 → exactly 1:1, zero slack**. Every punter drafted, no margin for a missed/absent record.
- K interlock: K supply **32** = K-slot demand **32** exactly. So the whole kicking economy under #12 = `K 32 + P 32 = 64` eligible vs `32 K slots + 32 P slots = 64` demand — **exact parity, zero slack league-wide**. K→P conversions are only free if a K is drafted to P _and_ another K fills the K slot — the pool has no spare kicker to make that happen twice.
- **Verdict:** the pool supports the P slot **only at exact parity**; it cannot absorb a single loss. (If "no draft cost" means auto-fill rather than a drafted slot — UNKNOWN semantics, flagged by BOC too — the 32 natural Ps are exactly the 32 teams' supply, still zero slack, but the draft economy question disappears.)

**Fullbacks (FB slot demand = 32):**
- Natural FB supply = **8 → only 8 of 32 teams can get a true fullback**; 24 FB slots must be filled by free-flex HB/TE under the Owner's rule.
- Aggregate economy: RB slots 64 (RB1+RB2 ×32) + TE slots 64 (TE1+TE2 ×32) + FB 32 = **160 demand** vs `HB 89 + TE 53 + FB 8 = 150 supply` → **10-record gap even with free flex**. Allocation: FBs→FB (8), TEs→TE slots (53 of 64), HBs→RB (64 of 89, slack 25); the 24 remaining FB slots consume HB slack (−0 per Owner), leaving 1 HB; the TE side stays 11 short as today, and the aggregate 10 must be filled by **penalized out-of-position flex** — the FLEX table permits WR/SS/FS/CB/DT/DE into TE/RB-family slots at **−4 to −6** (`SLOT_FAMILY`-matched), or `EMERGENCY_PENALTY 8` (l.939, l.971–975).
- **Verdict:** the FB slot **is fillable from today's pool without new records** — 8 FB + 24 HB conversions at zero penalty — but it **exhausts the league's free-flex buffer**: ~10 RB/TE/FB slots league-wide end up out-of-position players at −4…−8, and there is no natural-FB depth beyond 8. The draftboard impact is structural, not fatal; the CPU's value math for the new round is engine behaviour UNKNOWN (Claude's lane — `cpuPick`/`replacementLevels` have no FB/P slot terms today, BOC M-306 (d)).

## (e) The 52-record dropout under the Owner's P rule — it becomes harmful

Composition (VERIFIED by my count; matches three seats): **P 32 + FB 8 + LS 12 = 52**. Today the drop is inert for behaviour (REPORTED, MOC's swap re-run: draft paths filter through `POS_SLOT_MAP`, which has no P/FB/LS entries; the game path never reads `PLAYERS`; impact is display-only — player-browser position list, Actual Roster column).

**Under #12 the drop removes exactly the new slots' natural supply — harmful the moment any FB/P-slot build ships through the swap:**
- P-eligible falls **64 → 32** (K only); combined with the K-slot interlock (32 Ks exactly consumed by K slots), the kicking economy goes from exact parity to **32 eligible for 64 slots — a 32-slot hole** (or, under the auto-fill reading, an empty auto-fill supply).
- FB-eligible falls **150 → 142**; the 10-record aggregate gap widens to **18**, and every natural fullback (the Juszczyk-type depth-chart names TEAM_DATA still carries — REPORTED, Pickle M-113: `gradeOf` degrades to "—" rather than throwing) vanishes from the draftable pool.
- **LS 12 remains droppable** — no LS slot exists and none is proposed; that part of the drop stays harmless.

**Arithmetic of the fix direction (Claude's lane to implement — not mine):** amend the swap's drop-list to keep FB and P and drop only LS → dropped 12, draftable **1,148 → 1,188**; 28-round consumption 896/1,188 = **75.4%** (292 undrafted); kicking parity restored 64=64; natural FBs 8 restored. Leaving the drop-list as-is while adding the slots ships a board whose new rounds are starved of their own natural players.

---

**Compliance:** read-only on product files (sed/grep/python reads only — no writes, no git); paper written in `_agents/mimo/`; every count VERIFIED by the commands embedded above; swap-behaviour facts labeled REPORTED (seats cited); "no flex cost"→penalty 0 is INFERRED from the Owner's wording + `flexRule` structure; "no draft cost" semantics UNKNOWN (auto-fill vs free-flex — BOC flagged the same); engine/copy changes are Claude's lane.
