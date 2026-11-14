# OWNER Q&A — round 4 (achievements, brag shares, account) · recorded verbatim · 2026-11-14T07:20Z

**Recorded by:** ERNIE (advisor) · **Source:** the Owner, in chat, 2026-11-14
**Companions:** rounds 1–3 (`…0655`, `…0705`, `…0712`)
**Status:** recorded as a reinforcement of the Owner's values. **Not** a framework decision.

---

## The six answers, verbatim

> **1. What counts as an achievement?**
> **playoff wins and 20-0**
>
> **2. Which drafting-tendency signals?**
> **all**
>
> **3. Best seasons ranked by what?**
> **record, mvps, pro bowls, etc**
>
> **4. "Favourite player" = most-used, most-drafted, or pinned?**
> **all**
>
> **5. Profile private or shared?**
> **can be shared. brag shares after completed season**
>
> **6. Is the account optional?**
> **yes**

---

## What this locks in

### 1 · Achievements start narrow and legible

**"Playoff wins and 20-0."** That is a deliberately small, understandable starting set — not a 200-badge meta-game. Two consequences:

- **Legibility beats volume.** An achievement the Owner can state in one breath ("playoff wins", "20-0") is one a user understands without a tooltip. Prefer a small set of *earned, legible* achievements over a large set of opaque ones.
- **20-0 is the product's own identity** (AGENTS.md: "20-0 is the season record, not the product name"). An achievement for it is on-brand and should probably be the rarest, most prominent one.

### 2 · "All" tendency signals — which makes the save schema mandatory, not optional

The Owner wants **all** signals. That is the right answer and the most expensive one:

- **All signals** means the record must retain enough to derive: early-round position preference · reach rate · run/pass balance · trade frequency · draft-vs-free-agency · positional value at each pick · whether the pick was a need or best-available · and more as they occur to him.
- **This confirms the round-3 conclusion and removes the option of deferring it.** A "snapshot only" save makes *every* tendency underivable. **The draft log is now a hard requirement, not a nice-to-have.**

### 3 · "Best seasons" ranked on record, MVPs, Pro Bowls

- Those three are **engine outputs that already exist** (regular-season record, `computeRegularSeasonAwards` for MVP, Pro Bowl selections) — so ranking is cheap **if seasons are retained**.
- **It requires season history retention**, which reinforces the same save-schema conclusion: retain every season, per team, with awards.
- Ranking method (composite vs lexicographic) is still open — my default from round 3 stands: a **visible composite with wins as tiebreak**, because an opaque score is worse than a simple one.

### 5 · "Favourite player = all" + **brag shares after a completed season**

This is the answer that changes scope most:

- **All three favourite notions** — most-used, most-drafted, and user-pinned — are wanted. They need the draft log *and* usage tracking *and* a pin field.
- **"Brag shares after completed season" is a new feature with a real surface.** It implies:
  - a **shareable end-of-season card** (record, awards, a few headline stats, the profile identity);
  - **share text/image generation** on the client (free, offline-capable — no server render);
  - and it is the first feature with a **public-facing artefact**, which means the profile identity and the visual language must be presentable outside the app.

**This is the one item I would add to Z.ai's next round immediately**, because it is (a) concrete, (b) testable, (c) entirely client-side, and (d) the first thing that exercises the *design* rather than the framework.

### 6 · "Yes" — the account is optional

Confirmed. **Play offline with no account; sign in for sync and profile.** That keeps the backend small, keeps the offline path first-class, and avoids an account wall on a single-player sim.

---

## What the four rounds now say, in one paragraph

**Mobile-first. Account optional, for saves + cross-device + profile. Offline-continuable. Free forever. Multiplayer after basketball. Agent-maintained, and you trust and play.** The record must retain enough to derive achievements, tendencies and season history — which makes the **save schema the single most urgent architectural item**, ahead of any framework question.

Labels: **VERIFIED** — all six answers quoted verbatim; the engine functions that already produce record/MVP/Pro Bowl (`computeRegularSeasonAwards`). **INFERRED** — that "all signals" and "brag shares" make the draft log and season history mandatory; that a client-side share card is the right shape. **UNKNOWN** — the best-season composite formula; the exact share-card contents.

*Recorded by ERNIE (advisor) · 2026-11-14T07:20Z · the Owner's words verbatim; nothing here is a framework ruling.*