SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: final implementation plan for the remaining release-blocking features — written as questions for the council, the Architect and Z.ai, with the Owner's locked decisions quoted and marked LOCKED | DATE: 2026-11-21T05:05Z
TO: all council seats · TO-ARCHITECT (Claude) · TO-Z.AI · FOR: the Owner (decisions marked DECIDE)

---

# THE REMAINING WORK, AS QUESTIONS

**How to read this.** §1 is **LOCKED** — the Owner's own words, not up for debate. §2 is **MANDATORY**
— must exist and work before deploy. §3 is the plan, written as numbered questions: each has a
recommended default so it can be answered in one line, and a note on what is blocked until it is.
Nothing here assigns work to a seat; it is the specification the work needs.

Labels: **LOCKED** (Owner's words) · **MANDATORY** (release-blocking) · **VERIFIED** (I ran/read it)
· **INFERRED** · **OPEN** (a question).

---

## 1 · LOCKED — the Owner's decisions, verbatim

> **On accounts and scope (2026-11-21T04:35Z):**
> *"Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create
> an account and be able to track their stats beyond a single season; this has been in the directive
> for a long time. sync saves and resolving offline changes and migrating local saves into
> reconnection across devices are also a mandatory features before deployment; also noted since the
> beginning. these are not future possibilites; these are all mandatory to release along with the
> brag share. expansion into other sports, and more interactive visuals like the photos and project i
> had you look at are more future goals. along with potentially mutliplayer, etc."*

> **On sign-in (2026-11-21T04:47Z):**
> *"optional sign in is still true but i want the ability to sign in completed before we deploy."*

> **On offline (PROJECT-KNOWLEDGE.md:11):**
> *"Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect)."*

> **On identity (COLORS-V1-UI-ARCHITECTURE.md §7, from the Owner's 1 Nov note):**
> sign-in is **optional** (the simulator works with no account); use a **maintained OAuth 2.0 / OpenID
> Connect implementation (Auth.js, Better Auth or a managed provider)**; **never homemade password
> handling**; **test the authorization boundaries** (a user can never read or write another user's
> saves; shared links are scoped **read-only**).

> **On saves, slots, stats (2026-11-01-storage-brief-verbatim.txt, §2 and §8):**
> *"3 is good for slot number"* · *"All user stats are global. Prune all season logs except for
> tracked profile stats."* · *"Only completed seasons (through the Super Bowl) record global stats.
> Abandoned seasons record nothing. Completed drafts that never become seasons record nothing."* ·
> *"Global achievements remain regardless of save slot deletion."* · *"Undefeated season = undefeated
> regular season (17-0, 16-0, schedule-length-agnostic)."*

> **On lifecycle (same brief):**
> *"This is still a single season simulator for now. No injuries or playing growing old in a
> multiseason framework. The user can run it back with the same players with ideally a different
> schedule and matchups but this is not right now developing into a multiseason build."*

> **On downloads and sharing (same brief):**
> *"The user shouldn't be exporting anything. That's too much. No downloads."* ·
> *"no to the hidden full save."* ·
> *"You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you
> go 20-0?'"* · *"The challenge is not replay their exact season and matchup… it's a brag share."*

> **On mid-game saves (same brief):**
> *"Mid game save would not be per play but per week… the autosave would reset to the game preview for
> that same week."*

> **On player identity (same brief):**
> *"Every player should be assigned a separate id, especially if they have the same names. Any saved
> season keeps the old OVR ratings/names players but any new draft started uses the new
> ratings/names/players."*

> **On the conflict rule (P-254, Owner APPROVED 2026-11-05, `_agents/QUEUE.md:132`):**
> **per-slot last-write-wins on the WHOLE save, never a field merge**; the **losing lineage is kept as
> a rung-back**; **a fork is resolved as "keep both" at the slot level**; an **additive `deviceId`
> field now** so v1 never unfreezes.

> **On the stat list (P-208, locked 2026-11-02, `inbox/20261102-0745-muse-P-208-stat-list.md`):**
> ten stats — Super Bowl wins · undefeated seasons · best playoff run · playoff appearances · best
> regular-season record · longest win streak · first Super Bowl (per franchise) · draft steals · best
> draft class · franchise legend (`titles×100 + playoff_apps×10 + best_Wins`, weights **INFERRED**).
> **One conflict to resolve — see Q9.**

**Nothing in §1 is a question.** If a proposal contradicts §1, it is wrong, not novel.

---

## 2 · MANDATORY — release-blocking, no deploy without them

| # | capability | status today |
|---|---|---|
| M1 | **Sign in / create an account** (optional for the player, complete at deploy) | no schema, no auth flow (VERIFIED: searched, nothing exists) |
| M2 | **Stats beyond a single season** (career, per §1's definition of undefeated etc.) | spec locked (P-208); no storage, no account key |
| M3 | **Save sync across devices** | nothing |
| M4 | **Resolve conflicting offline changes** | rule locked (P-254); no mechanics |
| M5 | **Migrate local saves into an account** | nothing |
| M6 | **Brag share** | nothing (P-209 spec still open) |
| M7 | **The capability works in a deployed build** (not a branch) | no backend exists |

---

## 3 · THE PLAN, AS QUESTIONS

### A. Accounts and identity (M1)

**A1. Which identity provider — and does the council accept "managed" over "in-repo"?**
`COLORS-V1-UI-ARCHITECTURE.md` §7 names Auth.js, Better Auth **or a managed provider**. A managed
provider (Clerk/Auth0/Supabase) moves password security, recovery and rate-limiting out of the repo;
Auth.js/Better Auth keeps it in-repo on Workers.
*Recommended default:* **a managed provider with a free tier**, because "account security" is the one
area where in-repo code is a liability, and the free tier covers launch.
*Blocked meanwhile:* the `accounts` table shape and the session callback.
*Decide:* Architect (technical), Owner (if a provider means a third-party dependency).

**A2. What is the minimum account record?**
*Recommended default:* `{ id, display_name, created_at, last_seen_at }` — **no email in the game
database**; the IdP owns identity. Everything else is derived.
*Question for the council:* is a display name needed at v1 at all, or is it only needed for **brag
share** attribution (see F2)? If only for sharing, it could be optional and prompted at share time.

**A3. What does "signed out" look like — a state or a mode?**
*Recommended default:* signed-out is the **default** state (today's behaviour, untouched); signing in
is an upgrade that **attaches** the existing local saves to the account. The UI must never imply a
cloud save exists while signed out.
*Question:* does the council agree the app should be able to say, honestly, "this device is not backed
up"? (I think yes — silence reads as a cloud save that isn't there.)

**A4. Where do accounts live architecturally — inside the product, or the "separate module" of
`COLORS-V1-UI-ARCHITECTURE.md` §7?**
§7 recommends *"keep the simulator file fully offline and ship the accounts/cloud saves as a separate,
optional portfolio module that talks to the same save record."*
*Recommended default:* **one product, two layers** — the static app stays offline-first and a thin
`sync/` module owns every network call, so the offline path never imports it. That satisfies §7 and
keeps M1–M7 honest.
*Question:* does the Architect want the `sync/` module inside the shell tree or a separate package?

**A5. Session lifetime and revocation.**
*Recommended default:* short-lived session, refresh token owned by the IdP; sign-out revokes server
side. *Question:* does anyone need "sign out everywhere"? (Nice, cheap, and reads well — but not v1
unless it's free.)

---

### B. Stats beyond a single season (M2)

**B1. What does "beyond a single season" mean — the user's career, or the players'?**
This is the single most consequential question in the document.
- *Reading 1 — the user's career across runs:* **already specified and locked** (P-208). Buildable
  now, **no engine change**, pin stays `408410477`.
- *Reading 2 — the players' career totals across seasons:* **impossible today** (VERIFIED: the engine
  has one `simulateSeason`, no offseason, ageing, retirement or draft class). Requires the engine
  offseason model → **the pin moves**.
- *Reading 3 — franchise continuity across years:* same as reading 2, one level up.
*Recommended default:* **Reading 1 for v1**, with Reading 2/3 as a **scheduled post-v1 engine
sitting** — not a slip-in during the release push.
*Decide:* **Owner.** (My §4 recommendation to him: confirm Reading 1 in one sentence.)

**B2. Does the locked stat list need its stat #2 corrected before build?**
The locked #2 is *"Undefeated seasons (20-0)"* — 17-0 regular + 3 playoff wins. §1's verbatim ruling
says undefeated = **regular season** (17-0, schedule-length-agnostic) and *"the brag may riff without
defining 20-0"*. `PROJECT-KNOWLEDGE.md:11` adds *"'20-0' is the season record, not the product name."*
*Recommended default:* keep #2 as **"Undefeated regular season"** per the ruling, and add
**"Perfect season (20-0)"** as an 11th stat. Satisfies both texts; one extra row.
*Decide:* **Owner** (a definition, not a preference).

**B3. Where does per-account stat storage key from?**
P-208 says *"per franchise"*; the storage contract says *"keyed by franchise, never by slot"*. With an
account the key must become **(account, franchise)**.
*Recommended default:* `(account_id, franchise)` rows + one derived "overall" view. *Question for the
Architect:* does that break the locked envelope, or is it purely a server-side concern? (I believe the
latter — the envelope stays local, the account view is derived.)

**B4. Which stats need data the season envelope does not carry?**
P-208 claims the envelope suffices (final table, results, playoff results, champion, frozen roster).
*Question for the Architect:* does the **week** envelope's `statsRecorded` flag plus the **season**
envelope give you games-started per player for **draft steals** (#8) and **best draft class** (#9)?
If not, which is the smallest addition — and does it change the envelope freeze?
*Blocked meanwhile:* nothing else; this is a build-time detail.

**B5. When does a stat become visible — only at elimination, or progressively?**
*Recommended default:* **only at elimination** (§1: *"Only completed seasons … record global stats"*).
*Question:* does the council want a "provisional" profile state during a season (e.g. "on pace for
your best record")? It is a nice touch and costs nothing but must never write a stat.

---

### C. Save sync across devices (M3)

**C1. What is the unit of sync — the whole slot, or a revision stream?**
P-254 fixes the **conflict rule** (LWW on the whole save) but not the transport.
*Recommended default:* **push/pull by `revision`** on the whole slot record — matches P-254 exactly and
avoids inventing a log. Recompute is always possible from `{seed, picks}` because the engine is
deterministic, but **nothing needs to be stored** for v1.
*Question:* does the council agree that a **revision counter + whole-record LWW** is enough for v1,
with replay-based validation deferred? (I think yes; it is the smallest thing that satisfies §1.)

**C2. What does the sync endpoint set look like?**
*Recommended default (3 routes):* `PUT /saves/{saveId}` (idempotent upsert, 409 on stale revision)
· `GET /saves?since=<rev>` (pull) · `DELETE /saves/{saveId}` (soft delete).
*Question for the Architect:* does that fit the Worker + D1 shape, or does he want a single
`POST /sync` batch? (Batch is fewer round-trips on a phone; 3 routes are simpler to reason about.)

**C3. How large is a save, and does D1's row size matter?**
VERIFIED: a season envelope is on the order of 10²–10³ KB (the Architect's own assessment puts 3 slots
at 15–28% of a 5 MB localStorage budget).
*Question:* store the payload as **one JSON column** or split into columns? *Recommended default:*
one JSON column — the envelope is opaque to the server, which only indexes `(account, saveId, revision,
updated_at)`.

**C4. What is the free-tier ceiling, and what happens when it is hit?**
VERIFIED: Workers 100,000 requests/day; D1 5 GB total / 5 M rows read / 100 k rows written per day;
Durable Objects free = SQLite backend only, 100,000 requests/day.
*Question:* does the council accept **fail-closed** on quota (the save stays local, the UI says "cloud
save unavailable — your local save is safe")? I recommend yes, and the same sentence should be used
everywhere.

**C5. Does a sync need to work when the user is offline for a long time?**
*Recommended default:* yes — offline edits accumulate locally and sync on reconnect (that is
§1's *"sync-on-reconnect"*), with the conflict rule of §D applied at reconnect.
*Question:* how many pending local revisions before the app warns? (Default: 1 — the first unsynced
revision shows a quiet "not yet synced" chip.)

---

### D. Offline conflicts and the rung-back (M4)

**D1. Where does the rung-back live now that there is a server?**
P-254 says the losing lineage is *"kept on disk as a rung-back"*. With an account there must also be a
server-side copy, or the loser's lineage dies with the device.
*Recommended default:* **both** — local rung-back on the device (P-254, unchanged) **and** a
server-side `save_revisions` row for the superseded revision, retained N days.
*Question:* what is N? (Default 30 days; cheap, and it makes "I lost my season" recoverable.)

**D2. What exactly does "keep both at the slot level" mean in the UI?**
*Recommended default:* on a fork, both slots are kept and the user is shown **one** question:
"Two versions of Slot A exist — keep both?" with *Keep both* as the default and the second labelled
`Slot A · from <device> · <date>`. **Never** an automatic overwrite.
*Question for the council:* is a **slot-level** copy enough, or does a fork need a named "branch"
concept? (I strongly recommend against branches for v1 — they are the "alternate history" the Owner
already rejected.)

**D3. Does the server ever auto-resolve?**
*Recommended default:* **never for drafts** (a draft is authored history; P-254's "keep both" applies).
For **metadata** (settings, display name) last-write-wins is fine and silent.
*Question:* does the council agree with that split? It is the one place I would want an explicit
"no" if someone disagrees, because silent draft merges are unrecoverable.

**D4. What is the honest message when a conflict happened while the user was away?**
*Recommended default:* a one-time, non-blocking notice on load: *"Two versions of Slot A were found.
Nothing was overwritten."* — and it never re-appears once acknowledged.

---

### E. Local → account migration (M5)

**E1. Is migration idempotent by `saveId`?**
*Recommended default:* **yes** — `PUT /saves/{saveId}` keyed by the `saveId` that already exists in
every envelope, so re-running the upload is a no-op and no duplicates can be created.
*Question:* does the council agree the **envelope** (not a new migration record) is the source of
truth? I think yes — it is the smallest correct design.

**E2. What happens to a save whose `engine_version` differs from the server's?**
*Recommended default:* store it, flag it (`foreign_engine`), and **never** silently re-stamp. Show
"…saved with an older engine version" in the slot list. This is the same drift machinery the Saves
panel already uses.
*Blocker:* **the stale engine stamp (D5, §H1) must be fixed first**, or every save this build writes
arrives flagged foreign.

**E3. What does the "Link this device" screen say, in every state?**
*Recommended default (5 states):* idle ("N local saves, not backed up") · uploading (progress) ·
done ("N saves linked — sign-in required to see them elsewhere") · partial ("N of M linked; the rest
are from an older engine") · failed ("could not reach the server; your saves are still on this
device").
*Question:* does the council want the count on the button ("Link 3 saves")? It reads honest and costs
one string.

**E4. Can a user attach a **second** device to the same account?**
*Recommended default:* yes — sign in on device 2, pull, done. The `deviceId` (P-254) records which
device last wrote each revision so the UI can say "from your phone".
*Question:* does anyone need device **naming** ("Kosi's laptop")? Cheap, useful for the conflict
message, optional for v1.

**E5. What happens on sign-out — does local data survive?**
*Recommended default:* **yes, always.** Signing out never deletes local saves; it only stops syncing.
The app must never imply otherwise.

---

### F. Brag share (M6)

**F1. What is the exact text template?**
§1: *"You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you
go 20-0?'"* and *"it's a brag share."*
*Recommended default:*
`I went 14-3 and won it all with Carolina. Can you go undefeated? <deployed URL>`
— with the record and the franchise filled from the completed season, the URL **bare** (no params, no
encoded state, no save data), per P-209.
*Question:* does the council want the **result** in the text (`"and won it all"` / `"lost the
Divisional round"`), or only the record? (I recommend the result — it is the brag.)

**F2. Does a brag carry an identity?**
*Recommended default:* **no account required.** If signed in, append nothing (privacy) or the display
name if A2 kept one. The brag must work signed-out — it is the most shared artefact the product has.

**F3. Clipboard fallback and confirmation.**
*Recommended default:* copy → toast; if the clipboard is unavailable, show the text in a selectable
box (never a download, per §1).
*Question:* does the council want a **share card image** (PNG) as well as text? It is the one thing
that would make the brag travel well — but it is extra scope, so I would defer it to post-v1 unless
the Owner wants it in.

---

### G. Deployment, domain, origin, release gate (M7)

**G1. Which platform?**
VERIFIED (Cloudflare docs, 2026-11-21): Workers is the strategic platform; Pages is the only one that
can serve a domain whose nameservers are **not** on Cloudflare; both host static assets free and
unlimited; Durable Objects are native on Workers and a **separate Worker** on Pages.
*Recommended default:* **Workers + Direct Upload** (`wrangler deploy dist`), Pages only if the DNS
cannot move.
*Decide:* **Owner** (the domain), then Architect (the config).

**G2. Is the origin final before launch?**
This is the sleeper issue. VERIFIED: `localStorage` is scoped per origin, so a `*.pages.dev` → custom
domain move **orphans every local save**; with accounts, a host change also moves the session cookie
domain.
*Recommended default:* **buy the domain, deploy to the final origin, never move.** The only paid item
in the whole plan (~$10–15/yr) and now a correctness requirement, not polish.
*Decide:* **Owner.**

**G3. What is the release gate — and who fires it?**
*Recommended default:* **Direct Upload triggered by the Owner after the side-by-side parity check**;
never push-to-publish. A rehearsal deploy with a throwaway rollback happens first.
*Question:* does the council want a **recorded** pre-deploy checklist (like `_agents/TEST-ORDERS/`) so
the gate is reproducible? (I do — it is the difference between "shipped" and "was deployed once".)

**G4. What does the first deployed build have to prove about accounts?**
*Recommended default (acceptance):* sign up → sign in → link a local save → see it on a **second
device/browser profile** → make an offline edit → reconnect → conflict path exercised → brag copied →
sign out → local saves still present. Ten steps, each with an expected result, run on the deployed
origin (not localhost).
*Question:* does the council agree this is the M7 acceptance test?

**G5. Does the deploy need a `/verify` page?**
*Recommended default:* **yes** — a static page that hashes the served bundle and prints pin · shell
sha · golden seam · gate counts, match/no-match. It is the most legible piece of engineering in the
product and costs one page. *Question:* is that scope creep for v1, or part of "polished delivery"?

---

### H. Two blockers to clear before any of the above works (not optional)

**H1. The stale engine stamp (VERIFIED, mine).**
`src/App.svelte:83` is `const ENGINE_PIN = '67-cakepanz@d3bd81d2'` — the **previous** pin — while the
shipped engine is `408410477`. `metaNow()` stamps it into every save and `Saves.svelte:80` then warns
the user that their **own** build's save *"came from build 67-cakepanz@d3bd81d2"*.
*Recommended default:* replace with the seam's `engineVersion()` + a shell sha, and add a law
**`N36: the envelope's engineVersion equals the running engineVersion()`**.
*Question:* does the Architect want the shell sha injected at build time (Vite define) or read from a
generated constant? Either; the law is the point.

**H2. The pin-watch points at a dead pin (VERIFIED, MUSE's file).**
`SNAPSHOT.md:10` records `65673a00` as **superseded** by `408410477`, while CI's pin-watch still
watches `65673a0`.
*Recommended default:* re-point the watch to `408410477`. *Question:* is that MUSE's or CI's file?

**H3. P-210 (origin/browser risks) — still open, now load-bearing.**
*Recommended default:* measure, with versions and dates: `file://` storage survival per browser ·
Safari 7-day eviction · **exactly what happens to saves on a host/domain change**. That last row
decides G2.

---

## 4 · SEQUENCING (the critical path)

```
Phase 0  (blocks everything)
  H1 stale engine stamp + its law · H2 pin-watch · H3 origin measurements
  Owner: G1 domain decision · G2 origin decision · B1 stats meaning · B2 stat #2 definition

Phase 1  (the account spine — M1, M3, M5)
  A1 provider · A2 record · A3 signed-out state · A4 sync module boundary
  → schema + auth + "Link this device" + PUT/GET by revision

Phase 2  (conflicts — M4)
  D1 rung-back both sides · D2 keep-both UI · D3 never auto-merge drafts · D4 notice

Phase 3  (stats — M2)
  B3 account-scoped stat rows · B4 envelope sufficiency · B5 visibility
  → profile panel: overall + per franchise, with provenance

Phase 4  (brag — M6)
  F1 template · F2 identity · F3 clipboard + fallback

Phase 5  (legibility + release)
  G5 /verify · ARCHITECTURE.md · THREAT-MODEL.md · G3 recorded checklist
  → rehearsal deploy → side-by-side parity → Owner's make-live (G4 acceptance)
```

**Phase 0 has four Owner decisions in it.** Everything else can proceed in parallel once A1–A4 are
answered. **Nothing in Phase 1 should start before H1 is fixed**, or the first migration will flag
every save as foreign.

---

## 5 · FENCES (unchanged, restated so nobody has to guess)

- **Do not build the account system before the contract exists.** The storage wave's order —
  contract → plan → build — is why it landed cleanly. The Architect owns the contract; seats propose.
- **Do not touch:** `Football-Sim-*.html`, `colors/src/**`, the engine, the pin, protected constants,
  `AGENTS.md` / `CLAUDE.md` / `biome.json` / `tools/`, `QUEUE.md`, `CHRONICLE.md`, another seat's lane
  or inbox, any verbatim Owner note.
- **Do not move the pin** to get a feature. If "stats beyond a single season" is Reading 2/3 (B1),
  the re-pin is a **scheduled sitting**, not a slip-in.
- **No downloads, no export/import** (§1). The brag share is text, never a file.
- **No silent overwrites** (P-254). **No CRDT, no mutation log** — the rule is whole-save LWW with a
  rung-back.
- No force-push, no stash, no images in lanes. Push your own `council/<seat>`, verify with
  `git ls-remote`.

---

## 6 · WHAT I WOULD DO FIRST, IF IT WERE MINE

1. **Send the Owner four one-line questions:** B1 (stats meaning) · B2 (stat #2 definition) · G1/G2
   (domain + final origin) · F3 (share card in or out). Those four unblock Phases 0–4.
2. **Fix H1** (the stale stamp) the same day — it is two lines plus a law, and it poisons every
   migration until it is gone.
3. **Then** have the Architect write the account + sync contract (§3 A/C/D/E) in the storage
   contract's shape. It is the only document standing between "we know what we want" and "we can
   build it without a rewrite".
4. **Then** Phase 1 as one vertical slice — sign up, link, see it elsewhere — because that slice
   proves the riskiest assumption (that the offline-first envelope survives an account) before any
   polish is spent.

---

## 7 · ANSWERS NEEDED, BY ROLE (nothing here assigns work — it names who decides)

**Owner (DECIDE):** B1 · B2 · G1 · G2 · F3 · whether "stats beyond a single season" includes the
players (B1 reading 2/3).
**Architect (Claude):** A1 · A2 · A4 · B3 · B4 · C1 · C2 · D1 · D3 · E1 · E2 · H1 · H2.
**Council seats (weigh in):** A3 · A5 · B5 · C3 · C4 · C5 · D2 · D4 · E3 · E4 · E5 · F1 · G3 · G4 ·
G5 · H3. Propose, measure, dissent — three different seats per item.
**Z.ai (build-side):** C2/C3 feasibility against the Worker+D1 shape · E3's five states · F1's
template · G4's ten acceptance steps — as implementation notes on the contract, not as a parallel
spec.

---

— ERNIE (advisor; signs as ERNIE, never as another seat). This plan is advice: it assigns nothing,
approves nothing and moves no pin. The Owner decides; the Architect owns the product and the engine.