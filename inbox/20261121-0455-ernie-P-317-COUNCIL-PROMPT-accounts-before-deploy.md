SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: council prompt — the account/sign-in system is release-blocking; what already exists, what is missing, and the work that closes it | DATE: 2026-11-21T04:55Z
TO: all council seats (self-contained — read only this and the files it names) · TO-ARCHITECT · TO-MUSE

---

# COUNCIL PROMPT — ship the account system: what exists, what is missing, what to do

**From:** the Owner's directive of 2026-11-21, relayed by ernie.
**Status:** release-blocking. Not a future capability.

## 0 · The ruling, verbatim

> *"Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create
> an account and be able to track their stats beyond a single season; this has been in the directive
> for a long time. sync saves and resolving offline changes and migrating local saves into
> reconnection across devices are also a mandatory features before deployment; also noted since the
> beginning. these are not future possibilites; these are all mandatory to release along with the
> brag share. expansion into other sports, and more interactive visuals like the photos and project i
> had you look at are more future goals. along with potentially mutliplayer, etc."* (2026-11-21T04:35Z)

> *"optional sign in is still true but i want the ability to sign in completed before we deploy."*
> (2026-11-21T04:47Z)

**Read those two together.** Sign-in is **optional for the user** — the game must stay fully playable
with no account, offline, forever (that is the "tent-in-the-woods" product rule) — and sign-in must be
**implemented and working before deploy**. Additive, never a gate.

## 1 · What already exists (VERIFIED — I read each of these today)

The council already planned most of this. Nobody needs to re-derive it.

| what | source | content |
|---|---|---|
| the principle | `PROJECT-KNOWLEDGE.md:11` | *"Offline is a hard requirement (tent-in-the-woods test; **local-first, sync-on-reconnect**)"* |
| persistence + accounts | `_agents/ARCHITECTURE-DIRECTION.md:21-22` | a **database** for seasons/drafts/shared links, localStorage as cache, **sync across devices**; **Accounts: OAuth sign-in (GitHub/Google), never hand-rolled passwords** |
| the conflict rule | `_agents/QUEUE.md:132` (**P-254**) | **Owner APPROVED 2026-11-05:** per-slot **last-write-wins on the WHOLE save, never a field merge**; the **losing lineage kept as a rung-back**; **a fork resolves as "keep both" at the slot level**; additive **`deviceId`** field now |
| OAuth is locked | `_agents/QUEUE.md:149` (P-271 DoD) | "OAuth" listed among the locked decisions |
| the store shape | `inbox/20261101-2100-architect-to-zai-storage-contract.md:12` | global stores: **profile, settings, stats overall AND by franchise, achievements; keyed by franchise, never by slot** |
| settled stat definitions | `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` §8 | per-team = best W-L, best result, total seasons/record; **undefeated = regular season**; **only completed seasons record**; achievements survive overwrite |
| the stat candidates | `inbox/20261102-0607-muse-storage-priorities-proposal.md` (on `council/muse`) | 10 candidates: Super Bowl wins · undefeated seasons · best playoff run · runner-up finishes · first Super Bowl · longest win streak · draft steals · best draft class · most-drafted players · franchise legend |

## 2 · What is missing (VERIFIED — I searched the whole repo; none of it exists)

1. **Account data model** — no `accounts`/`users` shape, no profile fields. The storage contract keys
   stats *"by franchise"*; with an account the key becomes **(account, franchise)** — unwritten.
2. **Auth flow** — OAuth is *chosen*, but no provider decision, no session/token handling, no
   "signed out but playing" state machine.
3. **Sync API contract** — no endpoints, no revision semantics, no push/pull shape. P-254 gives the
   *rule*; it does not give the wire format, and its rung-back is *"kept on disk"* — that needs a
   server-side counterpart or the loser's lineage dies with the device.
4. **Migration path** — nothing written for local save → account (the Owner's mandatory feature).
5. **P-208** (lock the v1 career stat list) — **still open, filed 1 Nov, 20 days stale.**
6. **P-209** (brag share text + behaviour spec) — **still open**, P2.
7. **P-210** (storage-origin / browser-risk measurements) — **still open**, P2 — and now
   load-bearing, because it is the origin-scoped-storage risk that decides the domain question.

## 3 · The collision that must be recorded first

`_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` says twice:

> *"No accounts, no sign-in, no backend, no cloud."* (§1) … *"No accounts, no downloads, no cloud, no
> redesign."* (§9)

That was the **scope of the November storage wave**, and it is **superseded** by the ruling in §0.
Nothing in the repo says so. A seat reading that brief today will build to the dead rule.

**Task for MUSE (infrastructure, standing permission):** add **one supersession line** to the brief's
header and to `PROJECT-KNOWLEDGE.md:11` (which already says "sync-on-reconnect" but reads as if the
wave had no accounts). **Do not rewrite the brief** — it is the verbatim Owner note. Also re-rank
`P-208`, `P-209`, `P-210` to **release-blocking** (they are P1/P2/P2).

## 4 · The work — four independent pieces (no assignments; take what you can do)

> Work comes from `_agents/QUEUE.md` (`node tools/council.mjs next`, v9, from `origin/council/muse`).
> Later seats **review**; three different seats confirm → REVIEWED ✓✓✓. If the tool returns a stale
> pre-Colors item, say so in your bulletin and take the item below that matches your lane.

### 4a · Draft the account + sync contract (the missing spec)

The single highest-value artefact. Write it in the same shape as the storage contract
(`inbox/20261101-2100-architect-to-zai-storage-contract.md`): envelope → facade → what not to touch.
It must cover, with exact field names:

- **the account**: id, display name, created_at, and *nothing else unless it is used* (no email in
  the game database — the IdP owns identity);
- **the link**: `deviceId` (P-254) → account, and how a device with local saves attaches;
- **the save record**: `saveId` (already exists), `account_id`, `revision`, `updated_at`,
  `engine_version` (already exists), payload;
- **sync semantics**: push/pull by revision; what happens on a 409; who wins (P-254: LWW on the whole
  save);
- **the rung-back, both sides**: disk (P-254) *and* server, and what the UI says;
- **fork = keep both** at slot level, and what the second copy is called;
- **migration**: idempotent `PUT` by the existing `saveId` (re-upload is a no-op), what happens to a
  save whose `engine_version` differs, and the "Link this device" screen's states;
- **the offline contract**: the game is complete with no account; the app must never imply a cloud
  save exists when signed out;
- **the brag share**: URL only, no params, no encoded state, no save data (P-209);
- **explicit non-goals**: no multiplayer, no cross-sport, no leaderboard until replay validation exists.

**Do not implement it.** File it as `inbox/<UTC>-<seat>-P-317-account-sync-contract.md` and say
plainly which lines are yours vs which come from P-254/AGENTS.

### 4b · Make the career-stat list decision-ready (unblocks P-208)

P-208 needs the Owner to choose, so the council's job is to remove every reason to hesitate. For
**each of the ten candidates**: exact definition · update trigger (elimination rule) · display home
(screen) · data required (which engine field) · per-team provenance format · whether it passes the
**"earned"** filter · and whether it needs the multi-season loop (§5 below).

Then state a **recommended v1 set of 8–10** with the ones you would cut and why. The Owner locks it in
one sitting from that page. File as `inbox/<UTC>-<seat>-P-208-stat-list-decision-page.md`.

### 4c · The brag share spec (P-209) — small and independent

Exact text template (the Owner's words: *"I went x-y. Can you go 20-0?"* — **a brag share, not a seed
challenge**), the deployed URL rule (never `file://`, never localhost, no params, no encoded state),
clipboard + toast, and the fallback when the clipboard is unavailable. **No save data in the share,
ever.**

### 4d · P-210 — the origin/browser measurements (now load-bearing)

Someone with a browser should measure, with versions and dates, and file a table (not opinions):
does storage survive `file://` in Chrome/Firefox/Safari · does Safari evict script-written storage
after ~7 days · **exactly what happens to saves on a host/domain change**. That last row decides
whether the domain must be final before launch. (My own finding today: saves are per-origin, so a
`*.pages.dev` → custom-domain move orphans them — that is a hypothesis to measure, not a result.)

## 5 · The hidden dependency: "stats beyond a single season"

Verified today in the engine (`src/engine/sports/nfl/engine/`): there is **one season**
(`simulateSeason(teams, rng, {year, prevRank, homeField})`) plus `seasonrun.ts` for week-stepping.
**No offseason, no ageing, no retirement, no draft class.**

Two routes, and the choice is the Architect's:

- **(a) shell-side accumulation** — the shell loops seasons and the account accumulates career totals
  by player id. **No engine bytes change; the pin stays `408410477`.**
- **(b) an engine offseason model** — real ageing/retirement/draft classes. **That moves the pin** and
  needs a scheduled re-pin sitting, not a slip-in during a release push.

Any stat that claims a *career* must say which route it assumes. Seats must not silently assume (b).

## 6 · Facts from this session that affect the work (VERIFIED)

- **`src/App.svelte:83`** — `const ENGINE_PIN = '67-cakepanz@d3bd81d2'`, the **previous** pin, while
  the shipped engine is `408410477`. `metaNow()` stamps it into every save, and
  `Saves.svelte:80` then warns the user that their own build's save *"came from build
  67-cakepanz@d3bd81d2"*. **Fix before any server compares `engine_version`**, or every save this
  build writes is flagged foreign on first contact.
- **`SNAPSHOT.md:10`** records `65673a00` as **superseded** by `408410477`, while CI's pin-watch still
  watches `65673a0` (MUSE's file).
- **The engine is pure TS with no DOM** (the layer test enforces it), so the **same engine can run on
  the server** — replay validation later costs nothing extra. Worth designing for now.
- The save envelope already carries `saveId`, `createdAt`, `saveRevision`, `engineVersion`,
  `dataVersion` — the contract should build on those, not replace them.

## 7 · Hard fence

- **Do not build the account system yet.** The spec (4a) comes first; the storage wave set the
  precedent (contract → plan → build) and it is why that wave landed cleanly.
- **Do not edit**: `Football-Sim-*.html`, `colors/src/**`, the engine, the pin, protected constants,
  `AGENTS.md` / `CLAUDE.md` / `biome.json` / `tools/`, `QUEUE.md`, `CHRONICLE.md`, another seat's
  lane or inbox, the storage contract (Architect's), or any verbatim Owner note.
- **Do not implement** against a contract that does not exist. Propose, measure, specify.
- No force-push, no stash, no images in lanes, no dated/merged copies in the root. Commit and push
  **your own** `council/<seat>` branch and verify with `git ls-remote`.

## 8 · How to file

`inbox/<UTC yyyymmdd-hhmm>-<seat>-<ID>-<slug>.md`, first line
`SPEAKER: … | TASK: …`, then `FOR: <ID>` and either the §5 patch form or the spec. Label every claim
**VERIFIED** (you ran it, receipt in the text) · **REPORTED** · **INFERRED** · **UNKNOWN**. A claim
without a command is INFERRED.

## 9 · What "done" looks like

1. The 1 Nov brief's "no accounts" line is superseded in writing (MUSE).
2. A single account + sync contract exists, encoding P-254, the offline contract and the migration
   path (4a).
3. The career-stat list is a one-page decision the Owner can lock in five minutes (4b), and every
   career stat names route (a) or (b) from §5.
4. P-209 and P-210 are closed with receipts.
5. The stale engine stamp (D5) is fixed with a law that guards it.
6. Then, and only then, the Architect builds — and the first deployable build can sign in.

— ERNIE (advisor; signs as ERNIE, never as another seat). This prompt is advice: it creates no
assignments and decides nothing. The Owner may amend it; the Architect owns the product.