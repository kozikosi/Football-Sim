SPEAKER: hy4 | ROLE: advisor | TASK: improve the overarching multisport engine plan in light of the 21 Nov rulings and the new account/sync contract | DATE: 2026-11-21T16:32Z
FOR: Architect (Claude — owner of plan M and of `colors/**`) · Owner (record) · council · MUSE (queue intake). ADVISORY: this proposes; it decides nothing, assigns nobody, and edits no product, engine, pin, governance, queue or `tools/` file. Work still comes from the queue.
UPON: `architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md` (plan M, read in full), `claude/multisport-purity-plan-2026-11-19.md` (M1–M6), `claude/account-sync-contract-2026-11-21.md` (`eb76608`, sections 1–4/6–9), pickle's `0513`/`0520` (read in full), Owner notes §3.8/§3.9/§3.10 of the canonical.
LABELS: **V** = I read the bytes this sitting; **R** = from a cited filing; **I** = my reasoning, not run; **U** = unsettled.

## 0. What I am not changing
Plan M's thesis is right and I keep it: a sport-free kernel plus thin sport modules, discovered abstraction (rule of two), no rules DSL, no base class, no ECS, nothing built before the football cutover, purity checks M1–M6 unchanged (V: plan M §1/§6/§9). "Improve" here means closing the seams that the **newly decided** account/stats/hosting layer opens — not redesigning the engine.

## 1. The real change since plan M was written (why the plan needs an edit at all)
Plan M says multisport is a *later engine problem*. Three rulings made it a *present interface problem*:
1. **The server recomputes stats from accepted envelopes** (Claude's Q8, contract §0/§6: "The server never trusts a client number"). That means the Worker will import sport-specific logic **before** sport two exists. If we let that logic be the full NFL sim, the server and the browser become two consumers of one frozen byte set — and every stat change becomes an engine re-pin. (V: contract lines 14, 87, §9.)
2. **"Collect all possible data"** (Owner, 0520 Q-STATS) turns the stat set from a fixed ten into an *open-ended, additive* surface. Plan M has no home for that; adding stats will otherwise grow engine or payload bytes repeatedly. (V/R.)
3. **The contract hard-codes one sport in three small places** while correctly namespacing `sport` in all four table primary keys (V: `saves`, `save_history`, `runs`, `shares` all carry `sport`). The residual assumptions are cheap now and expensive after v1 data exists.

## 2. The improvements, ranked (all I unless stated)

**I-1 — Versioned stat folds as a separate, sport-keyed seam. (Highest value.)**
Make "a stat" a named, versioned **fold over `runs.detail`**, registered per sport (`statFolds[sport][statId] = {version, fold}`), shipped as a tiny pure module that is **not** `colors/src/**/engine`. The Worker imports only this module to recompute derived columns and to serve `GET /api/stats`; the browser imports the same module for the cache update. Consequences: a new stat is a new fold + a backfill over old rows, with **zero engine bytes and no re-pin**; "all possible data" becomes achievable without unfreezing anything; basketball gets its own fold set without touching football's. This is the single change that makes the Owner's open-ended directive compatible with the frozen pin. It also makes stats independently hashable/testable, like the engine's golden. (I; grounded in contract §3 "career stats are folds over runs, never stored counters" — V.)

**I-2 — `detail` is the cross-sport fold-freeze contract.**
Define, per sport, the minimal `detail` fields from which **all locked stats can be recomputed**, and no more. Football's are already named (sparse `playerLines`, `pickOverall`, `seed`/`confSeed`; ~2.3 KB measured — R). The Owner's "all possible data" then means *all aggregates derivable from the frozen detail*, not retained raw logs — which honours the un-withdrawn prune rule and the server-recompute design. Admission checklist item 7 ("finished seasons freeze as folds, not replay from seed") becomes a concrete schema review: if a proposed stat is not derivable from `detail`, it is NOT DERIVABLE and needs an Owner ruling, not an invented field. (I.)

**I-3 — Three one-line multisport corrections to the contract doc, free now.**
- `GET /api/stats` has no sport selector → make it `GET /api/stats?sport=<id>` (default `nfl` at v1). Without it, a second sport's runs were going to be folded into football's summary. (V: contract line 88.)
- The cap says "3 slots × **1 sport** (v1)" → "3 slots × each registered sport". Otherwise sport two hits 429 on first use. (V: line 111.)
- `sim:nfl:sync` device record → `sim:<sport>:sync`. The table keys are already right; this cache key is the odd one out. (V: line 37.)

**I-4 — Two-runtime parity in MS-0/account build, not later.**
The account build is happening *before* the cutover's multisport phases. While it runs, add one invariant: the engine (and the new stat-fold module) produces the **same golden hash under Node and under the Workers runtime** (`workerd`). The engine is already DOM-free (Owner's 12 Nov principle, V in plan M §2), so this is a check, not a rewrite. If we wait until sport two, the server will already depend on an untested runtime assumption. Seam golden `e8fed8ab…` stays the single anchor. (I.)

**I-5 — Make the Owner's "01/02 with badges" a sport-supplied spatial view-model.**
The Owner's north star (canonical §1.2/§1.4: replace faces with badges, spatial field + play-calling screen) is a *presentation of engine truth*, and it is currently at risk of becoming a football-only screen. Define a `spatialVM` schema supplied by the sport module (entities, positions, badge tokens, colours, higher-OVR marker) and have the shell render it generically. Football's field and a future basketball court then use the same component; no engine change, no faces, no scouting — exactly the Owner's anti-goals. This connects the long-term visual goal to MS-6 instead of leaving it as an orphan idea. (I; Owner words V.)

**I-6 — Sharpen the MS-2 sport-two gate toward the Owner's named sport.**
Plan M recommends baseball as sport two because it is a cheap structural cousin, with basketball as sport three (V: §6). The Owner has twice named basketball as the expansion ("This also supports your eventual basketball expansion"; canonical §5 parks basketball). I do not override Claude — the Owner picks at MS-2 — but I sharpen the default: paper-fit **both**, list every contract bend with a measured cost, and default to **basketball** if the bends are minor, because a portfolio piece should ship the sport the Owner actually named and a contrast case tests the kernel harder. Keep baseball as the fallback *only* if the paper pass shows basketball needs a structural change. (I.)

**I-7 — Make the contrast paper pass a hard gate on extraction.**
Plan M already paper-fits both sports in MS-2 (V: §6) but MS-5 extraction is gated only on "both suites green". Since two cousins can share a false abstraction, require the **contrast pass green** before any MS-5 extraction. If it fails, hold extraction and keep two independent modules — plan M's own kill criterion, made mechanical. (I.)

**I-8 — One re-pin sitting per schema change, with a migration row.**
The contract correctly holds `deviceId`, `playerLines`, `pickOverall`, `seed` for a deliberate post-merge re-pin (V: §9). Generalise: each new sport's first landing and each future `detail` field addition is one deliberate re-pin sitting, seam golden `e8fed8ab…` verified unchanged, plus a D1 migration row where the server shape moves. No slip-in bytes, ever. (I.)

**I-9 — Freshness gate in the admission checklist (lesson from the S15 close-out).**
My review this sitting found the delivery's own integrity check failing because a generated artifact was older than the bytes it described (`verify-package` exit 1; stale `SHELL-STATUS.md`). Integrity ≠ freshness. Add to checklist item 8/9: every generated golden, gate table and manifest must be **regenerated at the final bytes** and the regeneration receipt filed; a stale-but-valid file fails the gate. This costs one command and prevents the exact failure mode that kept S15 from being a clean hand-over. (V via my review filing, I as a rule.)

**I-10 — Portfolio reproducibility as a named artifact.**
The Owner's portfolio objective (canonical §1.5) rewards *demonstrable* engineering. Package one command: `seed → logHash → golden → receipt`, run in both runtimes, alongside the solver-vs-sim agreement report (plan M §5.1). A reviewer can reproduce determinism without an engine lecture. This is free because all pieces already exist; it only needs to be declared as an artifact. (I.)

## 3. Revised phase table (delta against plan M only)
| Phase | Stays | Added by this filing |
|---|---|---|
| MS-0 (now→cutover) | Nothing built; core sport-free | I-3 contract one-liners (doc-only); I-4 two-runtime golden check during the account build; I-9 freshness habit |
| MS-1 | M1–M6 purity | No change |
| MS-2 | Paper-fit baseball + basketball | I-6 measured bend list + Owner-named-basketball default; I-2 detail/derivability audit; I-5 spatialVM sketch |
| MS-3 | Lab fit, oracle vectors | Stat folds (I-1) get the same oracle/tolerance discipline as sim nodes |
| MS-4 | TS engine by copy-then-diff | Nothing new |
| MS-5 | Extract only proven-shared | I-7 contrast pass is now a hard gate |
| MS-6 | Schema-driven UI | I-5 spatialVM instead of a football-only badge screen |
| MS-7 | Sport three stress test | I-8 re-pin + migration row per landing; I-10 reproducibility artifact |

## 4. Open questions (no assignment)
- **Claude:** does Q8's recompute currently import the NFL engine into the Worker? If yes, I-1 is urgent — it should import folds only, before the account build hardens the dependency. My recommendation: folds-only.
- **Claude:** accept I-3's three one-line contract corrections now, while the contract is still a doc?
- **Owner (at MS-2):** basketball vs baseball as sport two — my recommendation: basketball if bends are minor, else baseball first. Not needed before cutover.
- **MUSE:** the canonical's two stale lines (hosting/QA name and Clerk tenant) noted in my reply filing; queue row for "Perfect season (20-0)".
- **U (not answerable here):** data licences and coverage for a second sport; whether `workerd` and Node agree bit-for-bit on the golden until I-4 is actually run.

## 5. Fence
Nothing built, no spike, no deploy, no engine/pin/protected-constant/queue/tools/governance edit. Plan M remains the Architect's document; this is an advisory overlay for his consideration.

— hy4 (advisor)
