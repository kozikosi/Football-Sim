# OWNER Q&A — round 3 (the account, saves, and what the record must hold) · recorded verbatim · 2026-11-14T07:12Z

**Recorded by:** ERNIE (advisor) · **Source:** the Owner, in chat, 2026-11-14
**Companion to:** `…0655-ernie-owner-qa-framework-inputs.md` (round 1) · `…0705-ernie-owner-qa-round2.md` (round 2)
**Status:** answers recorded, **not** a framework decision.

---

## Part 1 · The six answers, verbatim

> **1. What is the account for?**
> **Saves, cross-device, and achievements, showing your best seasons and favorite players, drafting tendencies, unit preferences,  etc**
>
> **2. Is multiplayer in scope earlier now?**
> **Not too concerned with multiplayer now but can build after basketball**
>
> **3. Offline conflict rule?**
> **have answered a lot of these questions elsewhere but user always play most recent progress**
>
> **4. Which device class must the budget be measured on?**
> **yes**
>
> **5. Does the 250 ms budget survive mobile?**
> **z.ai and claude optimize**
>
> **6. Free account only, or a paid tier?**
> **free only, forever most likely**

---

## Part 2 · The answer that changes the data model

### 2.1 — Achievements, best seasons, favourite players, drafting tendencies, unit preferences

This is the most consequential answer in three rounds, because it is **not a save format — it is a second product.**

- **Achievements** require a rule engine over play history ("go 20-0", "win a Super Bowl with a drafted QB", "draft five Pro Bowlers in one class").
- **Best seasons** require every season to be *retained and ranked*, not just the current one.
- **Favourite players** require a *player identity that survives across saves* — which means the player pool needs stable IDs, or "favourite" resets every draft.
- **Drafting tendencies** require the *decisions*, not the outcome: which positions you took and when, whether you reached, your run/pass balance, whether you traded.
- **Unit preferences** require the *scheme and personnel* you favoured, tracked over time.

**The architecture consequence, and it is urgent:** **the save/record schema must be designed to derive all of this later.** If the app stores a final snapshot and nothing else, none of these five features is computable afterwards. This is a decision that has to be made **before the save format hardens**, and it belongs to Claude, not to a framework.

**What the record therefore needs (beyond round 2's four fields):**

| Field | Why |
|---|---|
| engine version · dataset hash · RNG position · view state | round 2 — resumability |
| **a monotonic progress counter** | the conflict rule (§2.2) |
| **the draft log** (pick index, position, player id, round, reach) | drafting tendencies |
| **season results history** (per season, per team) | best seasons, achievements |
| **scheme / personnel selections over time** | unit preferences |
| **stable player ids** | favourite players across saves |

**None of this is a framework question.** All of it is engine-and-save architecture, and it is much cheaper to design now than to retrofit once users have saves.

### 2.2 — Conflict rule: "user always play most recent progress" (VERIFIED as a rule, with one edge case)

Recorded as given. My reading, and the one thing that needs pinning down:

- **"Most recent progress" cannot be wall-clock.** Two devices playing offline have two different clocks, and either can be wrong. Wall-clock last-write-wins is the rule that silently destroys a save.
- **It must be a monotonic counter in the record** — "progress", not "time". The save with the higher progress wins; wall clock breaks a genuine tie.
- **The remaining edge case:** both devices offline, both advance from the same base, and each has progress the other lacks. "Most recent progress" then *loses* work. That is not a sync, it is an overwrite.

**My recommendation: highest progress wins by default, but never silently discard a higher-value save — keep the loser as a recoverable slot and say so once.** That is the one place I would spend engineering time on accounts, because it is the failure a user never forgives.

### 2.3 — Multiplayer after basketball (VERIFIED)

Confirms the sequence: **football → basketball → multiplayer.** That is consistent with `AGENTS.md` §2 ("second sport after v1.1") and it means the account's v1 job is **saves + profile**, not play. Good — it keeps the backend small.

### 2.4 — "Free only, forever most likely" (VERIFIED)

This is a business constraint with a technical consequence: **the account backend is a permanent cost centre with no revenue.** That argues for:

- the **cheapest possible auth** (no custom auth server if a free tier suffices);
- **not over-building** the profile system in v1 — the achievements/tendencies engine is a lot of content, and it should be a **data file**, not code, so it can grow without a release;
- **no paid infrastructure** anywhere in the path.

### 2.5 — "z.ai and claude optimize" (answers 4 and 5)

Recorded: the device-class question is delegated, and the two builders are to optimise for mobile.

**The one thing I would insist on:** optimisation without a measurement target is guessing. They should either **state the CPU they measured on**, or **apply a stated slowdown factor** to the server-class numbers. Otherwise "we optimised" means "we made it faster on our machine", which is the same mistake the whole wave made with the 14.9 s `goneOdds` p95.

---

## Part 3 · Follow-ups these answers create (each with my default)

1. **What counts as an achievement?** A starter list is needed, or it becomes unbounded content. *My default: 20–30 achievements at v1, stored as a data file (id, title, condition, tier), so content can grow without a code change.*
2. **Which drafting-tendency signals?** *My default: five — early-round position preference, reach rate (pick vs consensus rank), run/pass balance of the roster built, trade frequency, and favourite source (draft vs free agency).*
3. **"Best seasons" ranked by what?** Wins? Championships? A composite? *My default: a composite the Owner can see and understand, with wins as the tiebreak — an opaque score is worse than a simple one.*
4. **Does "favourite player" mean most-drafted, most-used, or user-pinned?** *My default: both derived (most-used) and pinned (user choice) — they are different features with the same label.*
5. **Is the profile visible to others, or private?** *My default: private at v1 — no sharing surface until there is a reason.*
6. **Does the account gate anything, or is it optional?** *My default: optional — play offline with no account; sign in for sync and profile. An account wall on a single-player sim is a conversion killer.*

---

## Part 4 · What this changes in the plan

**For Claude (architecture) — this is now the top item:**
1. **The save/record schema** with the six fields above, designed to make achievements and tendencies derivable. **Do this before the format hardens.**
2. **The progress counter** as the conflict authority (not wall clock).
3. **A stable player identity** across saves — or "favourite player" resets every draft.
4. **The achievement/tendency engine as data, not code.**

**For Z.ai (benchmarks):**
1. **WR-BENCH2** (filed) — the VueUse library test.
2. **The resume test** — save → quit → reload → resume → identical next pick.
3. **A phone-class measurement** — the one number the whole wave lacks, and the one "z.ai and claude optimize" depends on.

**For the council:**
- **P-356 / P-357** remain the columns your answers make decisive (maintainability, agent defect rate).
- **The save schema is now a product requirement**, not a technical detail — it should be reviewed before it is built, not after.

---

## VERDICT

Three rounds of answers have produced a coherent picture: **mobile-first, account-backed (saves + profile), offline-continuable, free forever, multiplayer after basketball, agent-maintained, and you trust and play.** The framework decision now rests on loud-vs-silent failure, agent maintainability, and phone-class rendering — none measured on phone hardware.

**The urgent item is not a framework question:** the **save/record schema** must be designed to carry the draft log, season history, scheme selections and stable player ids, or the achievements/tendencies/profile features you just asked for are not computable later.

Labels: **VERIFIED** — all six answers quoted verbatim; the sequencing against `AGENTS.md` §2. **INFERRED** — that achievements require the record fields listed; that wall-clock conflict resolution is unsafe; that free-forever argues for a minimal backend. **UNKNOWN** — what counts as an achievement; which tendency signals; how "best seasons" is ranked; whether the profile is private.

*Recorded by ERNIE (advisor) · 2026-11-14T07:12Z · the Owner's words are quoted verbatim; nothing here is a framework ruling.*

**PRIORITY+:** Owner Q&A round 3 | P1 | achievements/tendencies/profile require a save schema that carries draft log + season history + scheme selections + stable player ids, decided BEFORE the format hardens; conflict rule needs a monotonic progress counter, not wall clock; free-forever means a minimal backend | ERNIE this file.