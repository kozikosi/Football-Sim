# OWNER Q&A — round 2 (follow-ups) · recorded verbatim · 2026-11-14T07:05Z

**Recorded by:** ERNIE (advisor) · **Source:** the Owner, in chat, 2026-11-14
**Companion to:** `inbox/20261114-0655-ernie-owner-qa-framework-inputs.md` (round 1)
**Status:** answers recorded, **not** a framework decision.

---

## Part 1 · The six answers, verbatim

> **1. Fonts — must it be Cinzel?**
> **doesn't have to be cinzel but somehting beautiful**
>
> **2. New visual direction, or w89's language executed better?**
> **same language and better**
>
> **3. Offline scope — no network ever, or download once then play offline?**
> **network mainly especially to create account but can continue offline if you want.**
>
> **4. Do you review agent diffs, or trust and play?**
> **trust and play**
>
> **5. Saves — multiple slots, export/import, resume-after-crash?**
> **idk about export import but yes to the other 2. 3 slots.**
>
> **6. Mobile — must the 1,941-row board work at 390 px?**
> **yes. mobile is optimized for over anything else**

---

## Part 2 · What changed, and it is not small

### 2.1 — **Mobile is the primary target** (answer 6). This reverses my earlier assumption and reorders the requirements.

I had been treating desktop as the natural home for a 1,941-row draft board. **That is now wrong.** Consequences:

- **The board must work at 390 px**, not merely not-break. A 1,941-row table is not a phone UI as-is; it needs a card/row hybrid, sticky headers, and thumb-reachable controls.
- **Hover-only affordances are out.** Anything that requires a mouse is invisible on a phone.
- **Touch targets** need a minimum size (44–48 px), which changes the density of the board and therefore how much fits on screen.
- **Performance budgets measured on the test machine are meaningless.** BENCH-1 ran on a **2 vCPU Intel Xeon**. A mid-range phone is roughly **3–5× slower single-threaded**, so the measured 14.9 s p95 on the `goneOdds` window would be **~45–75 s on a phone**. **The budget must be re-measured on phone-class hardware or with a stated slowdown factor, or every number in the wave is optimistic by a large margin.**
- **Bundle size matters again.** I had dismissed size as "scaffold noise" when the target was a single HTML file on a fast connection. On mobile, first load and memory ceiling are real constraints.

### 2.2 — **There is an account** (answer 3). That is a new requirement, and it changes the architecture more than any framework difference.

"Network mainly especially to create account but can continue offline if you want" means:

- **There is a backend.** Authentication, an account record, and something the account is *for*.
- **Offline continuation means local persistence plus a later sync**, not "no server". That is a **sync architecture**, not a local-first one: play offline, reconcile when back online.
- **Conflict handling becomes a real problem** — two devices, one save, both played offline. Who wins? That needs a rule before the shell is built, or it gets invented badly later.
- **The packaging answer changes.** I recommended Tauri in round 1 on the assumption of "local-first, no server". With an account, the server exists anyway, so **the primary target is a mobile web app (PWA) against that backend**, and a desktop wrapper becomes optional rather than primary.

**My revised recommendation: mobile-first web app (PWA) with an account backend, offline continuation via local persistence + sync, and a desktop wrapper only if you want one later.** Tauri is no longer the lead option — not because it is wrong, but because it solves a problem you no longer have (no server) and adds three-engine testing you would then have to fund.

### 2.3 — "Something beautiful" for type (answer 1)

Typography is **open** — it does not have to be Cinzel. That is a design decision, not a constraint. Two consequences:

- The **offline font requirement still stands** (any display face must be embedded, not fetched), but you are no longer obliged to embed three specific Google faces.
- **This is now a design-quality question**, which is the one thing the framework test cannot answer. It belongs to whoever does the visual work, and it should be judged against a *new* design, not against w89.

### 2.4 — "Same language and better" (answer 2)

Confirmed and unambiguous: **w89's visual language, executed better.** That means:
- Position bubbles, two-tone team palette, table/cards duality, the 90+ shimmer, the sort menu — keep the vocabulary.
- Improve execution: spacing, hierarchy, motion, responsiveness, and above all **the phone layout**, which w89 does not really have.
- **The acceptance is a human verdict against a new design**, not a screenshot diff. I will keep saying that until it is in the brief.

### 2.5 — "Trust and play" (answer 4)

Second confirmation. This is the most important thing you have said about the decision, and I want to state its implication once more plainly:

**When you do not read the diffs, a silent failure is invisible until the product is slow or wrong.** BENCH-1 measured exactly that asymmetry: Svelte 5 refuses to boot on a bad engine mutation (loud, safe); Vue 3 accepts it and quietly taxes engine reads ~4–5× (silent, expensive). For "trust and play", **loud is worth more than fast.**

### 2.6 — Saves: 3 slots, resume-after-crash, export/import undecided (answer 5)

- **3 slots** — clear.
- **Resume-after-crash** — clear, and it is a real feature: it implies autosave at a known cadence and a recovery path.
- **Export/import undecided.** My recommendation: **add it**, but it is not blocking. Reason: it is cheap in a web app (a JSON download), it is the only defence against a save you cannot recover, and it is much easier to add before users exist than after. **Not a blocker — a "should have".**

---

## Part 3 · The follow-ups these answers create (each with my default)

1. **What is the account *for*?** Cloud saves? Multiplayer? Cross-device? Purchases? Leaderboards? *My default: cloud saves and cross-device first — they justify the account and nothing else does yet.*
2. **Is multiplayer now in scope earlier than "after football ships"?** An account makes it possible; that is not the same as it being wanted. *My default: no — account for saves only, multiplayer stays post-v1.*
3. **Offline conflict rule:** two devices, both played offline, both sync. Last-write-wins? Ask-on-conflict? *My default: **ask on conflict, never silently overwrite** — a silent overwrite of a save is the one failure users never forgive.*
4. **What device class must the budget be measured on?** A specific phone, or a stated slowdown factor? *My default: measure on a mid-range Android and state the CPU, so the number means something.*
5. **Does the 250 ms p95 budget survive mobile?** On a 3–5× slower CPU, a 250 ms desktop budget is ~750–1250 ms of phone budget for the same work. *My default: **keep the desktop number for the engine, and set the UX budget per device class** — one number across devices is how you get a board that is fast on a laptop and dead on a phone.*
6. **Is the account free-tier only, or is there a paid tier?** (You have said free-only tooling for the *council*; this is about the *product*.) *My default: free account, no paid tier at v1.*

---

## Part 4 · Revised recommendation, and what I withdraw

**Withdrawn:** my round-1 recommendation of Tauri as the primary packaging target. It rested on "local-first, no server". With an account, the server exists and the primary target is **mobile web**.

**Revised:** **mobile-first PWA against an account backend**, offline continuation via local persistence with an explicit sync and conflict rule, **desktop wrapper optional**. Same web build, two distribution paths, no re-platforming.

**What this does to the wave's evidence:** roughly **none of the performance data is phone-representative.** Every number in BENCH-1 and the nine-arm study was measured on server-class hardware. The framework comparison is not invalidated — the *relative* ordering between two arms on the same machine is still a fair comparison — but **every absolute budget is optimistic on a phone, and the largest one (the 14.9 s goneOdds p95) becomes a minute.** The single most valuable next measurement is therefore **the same board on a phone-class CPU**, not another framework column.

**What this does to the framework question:** mobile-first **reinstates bundle size and rendering efficiency as real columns** (I had dismissed them as scaffold noise), and it makes **offline-capable, touch-first, PWA-friendly** a requirement both frameworks must be measured against. Neither has been measured on a phone by anyone.

---

## VERDICT

Two of the six answers — **mobile-first** and **there is an account** — change the architecture more than any framework difference in the wave, and they invalidate the *absolute* performance numbers (though not the relative comparison). The framework decision is now answerable on: **loud-vs-silent failure** (from "trust and play"), **agent maintainability** (from "agents only"), and **mobile + offline rendering** (from answers 3 and 6) — none of which anyone has measured on phone hardware.

Labels: **VERIFIED** — the w89 font dependencies and the BENCH-1 hardware (2 vCPU Xeon) and timings, all read from the receipts. **INFERRED** — the 3–5× phone slowdown factor (a general hardware ratio, not measured here); that an account implies a sync architecture; that Tauri should be demoted. **UNKNOWN** — what the account is for; the conflict rule; the phone-class budget.

*Recorded by ERNIE (advisor) · 2026-11-14T07:05Z · the Owner's words are quoted verbatim; nothing here is a framework ruling.*

**PRIORITY+:** Owner Q&A round 2 | P1 | mobile-first + account = PWA + sync, not desktop; BENCH-1's absolute numbers are server-class and optimistic ~3-5× on a phone (14.9 s p95 → ~1 min); withdrawn my Tauri recommendation; framework decision now rests on loud-vs-silent, agent maintainability, and phone rendering | ERNIE this file.