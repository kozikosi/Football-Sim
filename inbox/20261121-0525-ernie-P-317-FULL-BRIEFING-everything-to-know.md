SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: the complete briefing — everything every seat, Z.ai and the Architect needs to know, with the Owner's words quoted verbatim | DATE: 2026-11-21T05:25Z
TO: ALL council seats · TO-ARCHITECT (Claude) · TO-Z.AI · FOR: the Owner
STATUS: self-contained. Read this and you do not need the chat it came from.

---

# READ THIS FIRST — the state of the project, in the Owner's words

**How to use this document.** §1 is the Owner speaking **in this session** (21 Nov, 02:00–05:07Z),
quoted exactly. §2 is the Owner speaking **from the files**, quoted exactly with paths. §3 is what
changed. §4 is what I verified by running it. §5 is what is broken. §6 corrects the record. §7 says
what each role must know. §8 is what is still open. §9 is the fence.

Where I paraphrase, I say so. Where I quote, it is verbatim, including the Owner's own spelling.

---

## 1 · THE OWNER IN THIS SESSION — verbatim, timestamped

**1.1 · The task that opened the session (21 Nov, ~02:5xZ):**
> *"please push this folder from my desktop football sim folder to your branch of the git so anyone
> can read it. then review it throughly and push your review. please think about any further
> implications of this work and innovate, brainstrom, etc how to improve cakepanz / the ui/ux shell
> for claude's engine"*

**1.2 · The rival-product note (03:22Z) — verbatim, including the two URLs:**
> *"I would like to note something very particular about this rival product; i don't want the
> scouting or full gm experience but i think we should note the playbooks and visualizatios of the
> players and the fields and a longterm goal. i don't love the player faces but if we could visualize
> purely through badges spatially; tese are long term goals*
>
> *https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/*
>
> *https://store.steampowered.com/developer/sidelinesimstudios"*

**1.3 · The images (03:33Z):**
> *"you naield the images i wanted you to see; can you store those and show those images of the feidl
> to the rest of the council"*

**1.4 · The portfolio framing (04:07Z) — this is the objective everything else serves:**
> *"I want you to reconsider our deployment and architectural recommendations in light of an important
> clarification: **this project is fundamentally a portfolio piece intended to demonstrate my
> capabilities to prospective employers at companies like EA Sports and 2K.** I want it to look and
> feel as advanced as possible."*
>
> *ChatGPT's reasoning is that we should optimize for three things, in roughly this order:*
> *1. **Perceived product sophistication:** exceptional UI/UX, professional sports-management
> presentation, rich analytics, scouting, draft boards, player comparisons, and compelling interactive
> experiences.*
> *2. **Actual technical sophistication:** deterministic simulation, intelligent autonomous GM agents,
> modular architecture, reproducible scenarios, extensibility across sports, robust testing, and
> performance.*
> *3. **Professional delivery:** reliable deployment, polished documentation, architecture
> explanations, and demonstrable quality."*
>
> *"Please reassess the Pages versus Workers decision with this portfolio objective in mind. Favor
> architecture that enables impressive features and demonstrates sound engineering, while avoiding
> unnecessary operational complexity. Preserve the possibility of eventually adding accounts, D1,
> Durable Objects, and multiplayer without prematurely implementing them."*
>
> *"In particular, distinguish between: Features that make the finished product visibly impressive.
> Engineering decisions that make the underlying system genuinely sophisticated. Infrastructure that is
> merely technically interesting but adds little portfolio value."*
>
> *"**Do not implement anything or change architectural decisions yet.** Give me your recommendation,
> explain the tradeoffs, and identify any implications for our existing architecture and deployment
> plan. **Keep our free-only constraint in mind.**"*

**1.5 · The four mandatory factors (04:26Z):**
> *"Account creation and account security.*
>
> *Synchronizing saves across devices.*
>
> *Resolving conflicting offline changes.*
>
> *Migrating existing users' local saves into reconnection with online.*
>
> *Please consider all of these factors in your final decision"*

**1.6 · The scope ruling (04:35Z) — the single most important message in this document:**
> *"Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create
> an account and be able to track their stats beyond a single season; this has been in the directive
> for a long time. sync saves and resolving offline changes  and migrating local saves into
> reconnection across devices are also a mandatory features before deployment; also noted since the
> beginning. these are not future possibilites; these are all mandatory to release along with the brag
> share*
>
> *expansion into other sports, and more interactive visuals like the photos and project i had you
> look at are more future goals. along with potentially mutliplayer, etc"*

**1.7 · Sign-in (04:47Z):**
> *"optional sign in is still true but i want the ability to sign in completed before we deploy."*

**1.8 · The request for a plan (04:53Z):**
> *"Please now give your final and long and thorough plan for implementation of all these remaining
> features; werite them more as questions so that the council and claude and z.ai can weigh in; but
> obviously present my locked and mandatory decisions as locked and mandatory; you can quote me
> verbatim"*

**1.9 · The three answers to hy4 (04:58Z):**
> *"responded these to hy4's questions: locked cross run career stats; why wouldn't the nameservers be
> at cloudflare; and i can setup the cloudflare but i need direction"*

**1.10 · The review request (05:01Z):**
> *"review all the other seats most recent contributions; especially pickle's as i will probably use
> his final version"*

---

## 2 · THE OWNER FROM THE FILES — verbatim, with sources

**2.1 · Offline (PROJECT-KNOWLEDGE.md:11):**
> *"Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect)."*
> …and, same line: *"'20-0' is the season record, not the product name."*

**2.2 · Persistence and accounts (`_agents/ARCHITECTURE-DIRECTION.md:21-22`):**
> *"| 5 | **Persistence**: a database for seasons, drafts, shared links; localStorage kept only as a
> convenience cache | "Database > local storage": sync across devices, history, sharing | medium |"*
>
> *"| 6 | **Accounts**: OAuth sign-in (GitHub/Google), never hand-rolled passwords | Security
> literacy, per-user data | medium; last, and only if there is per-user data worth protecting |"*

**2.3 · The sign-in rules (`_agents/COLORS-V1-UI-ARCHITECTURE.md` §7, from the Owner's 1 Nov note):**
> *"sign-in is **optional** (the simulator works with no account); use a maintained OAuth 2.0 / OpenID
> Connect implementation (Auth.js, Better Auth or a managed provider), never homemade password
> handling or unverified email/password; test the authorization boundaries (a user can never read or
> write another user's saves; shared links are scoped read-only)."*
>
> And the same section's own recommendation: *"keep the simulator file fully offline and ship the
> accounts/cloud saves as a separate, optional portfolio module that talks to the same save record."*

**2.4 · The storage brief (`_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`), §2:**
> *"3 is good for slot number"* ·
> *"All user stats are global. Prune all season logs except for tracked profile stats."* ·
> *"Global achievements remain regardless of save slot deletion."* ·
> *"Completed season slots stay until user overwrites that slot."* ·
> *"The global data should record by overall and by team. The user should know their best record with
> each franchise."*

**2.5 · Same file, §2 on sharing:**
> *"The user shouldn't be exporting anything. That's too much. No downloads."* ·
> *"You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you
> go 20-0?'"* ·
> *"The challenge is not replay their exact season and matchup, just to play the general game and try
> to go undefeated. the challenge shouldn't carry a save. it's not a seed challenge. it' a brag
> share."* ·
> *"a copy and paste link on a clipboard is fine if that works but i don't want the user downloading
> anything."* ·
> *"no to the hidden full save."*

**2.6 · Same file, §2 on lifecycle and identity:**
> *"This is still a single season simulator for now. No injuries or playing growing old in a
> multiseason framework."* ·
> *"Every player should be assigned a separate id, especially if they have the same names. Any saved
> season keeps the old OVR ratings/names players but any new draft started uses the new
> ratings/names/players."* ·
> *"I don't know if there are stable ids. If not, then we should create. New draft should always pull
> the most recent player database."*

**2.7 · Same file, §8 — the settled definitions:**
> *"Only completed seasons (through the Super Bowl) record global stats. Abandoned seasons record
> nothing. Completed drafts that never become seasons record nothing."* ·
> *"Undefeated season = undefeated regular season (17-0, 16-0, schedule-length-agnostic). The brag may
> riff ("can you go undefeated?") without defining 20-0."* ·
> *"Mid game save would not be per play but per week."* ·
> *"Profile empty state: "No achievements yet — finish a season to start your legacy." Never a blank
> panel."*

**2.8 · Same file, §1 — the scope that is now superseded (recorded so nobody builds to it):**
> *"No accounts, no sign-in, no backend, no cloud. No file downloads, no export/import screens, no
> hidden full-save backup"* … and §9: *"No accounts, no downloads, no cloud, no redesign."*
> **← This was the storage wave's scope. It is superseded by §1.6 above. Nothing in the repo says so
> yet.**

**2.9 · The answers (`_agents/owner-notes/2026-11-01-storage-answers-verbatim.txt`):**
> *"1. Whatever is a cleaner, more efficient structure. I'm fine with players farming 17-0… but i
> think the user experience would feel more genuine if they accidentally got cut off in the 2nd
> quarter and they replay the game and the events from the first two quarters are the same."*
>
> *"2. No, run it back with the same player means after clicking the button, they appear again at the
> preseason page. But the schedule would ideally be different and a new seed would generate."*

**2.10 · The conflict rule (`_agents/QUEUE.md:132`, P-254, Owner APPROVED 2026-11-05):**
> *"per-slot last-write-wins on the **WHOLE** save, never a field merge; the losing lineage is kept on
> disk as a rung-back; a fork is resolved as 'keep both' at the slot level; additive `deviceId` field
> now so v1.1 never unfreezes."*

**2.11 · OAuth is locked (`_agents/QUEUE.md:149`, P-271 DoD):**
> *"…contains the locked decisions (Svelte 5 + Vite, real names, 90/35/25 + P(20-0) 1–2%, OAuth, 76
> Pancakes brand)…"*

**2.12 · The ten locked stats (`inbox/20261102-0745-muse-P-208-stat-list.md`, on `council/muse`):**
> Super Bowl wins · Undefeated seasons · Best playoff run · Playoff appearances · Best regular-season
> record · Longest win streak · First Super Bowl (per franchise) · Draft steals · Best draft class ·
> Franchise legend — *"titles × 100 + playoff_appearances × 10 + best_Wins"* with the note
> *"INFERRED: the legend formula weights (100/10/1) — reasonable but the Owner may retune."*
> **Note the #2 wording in that file: "seasons finishing 20-0 (17-0 regular + 3 playoff wins)" —
> this contradicts §2.7 above. See §5.2.**

**2.13 · Brag spec (P-209, `_agents/QUEUE.md:94`):**
> *"Exact text template, deployed game URL (never file://, no params, no encoded state), clipboard +
> toast behavior, fallback when clipboard unavailable. No save data in the share, ever."*

---

## 3 · WHAT CHANGED IN THIS SESSION (the state transition)

| before | after | authority |
|---|---|---|
| accounts/sync/conflicts/migration/brag were "future" | **MANDATORY before deploy** | 1.6 |
| sign-in optional; capability unspecified | **optional for the player, complete at deploy** | 1.7 |
| stats scope ambiguous | **cross-run career stats** (P-208's ten), no multi-season | 1.9 |
| nameservers undecided | **nameservers at Cloudflare** → **Workers**, not Pages | 1.9 |
| hosting plan provisional | Owner will **create the Cloudflare account**; needs direction | 1.9 |
| no domain | **free-only stands** → `workers.dev` is acceptable | 1.4 + hy4/porca |

---

## 4 · WHAT I VERIFIED BY RUNNING IT (VERIFIED — receipts in `_agents/ernie/deliveries/ernie-cakepanz-14-rerun-receipts-2026-11-21/`)

**4.1 · The S14 build is sound.** `verify-package` 467 OK / 0 FAILED / 0 missing, converse clean, exit 0.
**4.2 · Engine 430/430 · node 35/35 · board 19/0 · visual 18/0 · slot 28/0 · shell 48/0 · slice
29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH `e8fed8ab…`.**
**4.3 · The engine is byte-identical to the pin:** 69/69 files, `draftBoard.ts` sha256
`e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`, pin `408410477`.
**4.4 · The laws are not tautologies:** I re-planted the F25 mutant myself → board 18/1,
`FAIL L25 … persisted=false · ring===stored=false`.
**4.5 · The engine has ONE season:** `simulateSeason(teams, rng, {year, prevRank, homeField})`, plus
`seasonrun.ts`. **No offseason, ageing, retirement or draft class.**
**4.6 · The engine is DOM-free TS** (the layer test enforces it) → **the same engine can run on a
Worker**, so replay validation later is free.
**4.7 · The save envelope already carries** `saveId`, `createdAt`, `saveRevision`, `engineVersion`,
`dataVersion` — build the account layer on those, do not replace them.
**4.8 · Free tiers (verified 21 Nov):** Workers 100,000 req/day · D1 5 GB total / 500 MB per db /
5 M rows read + 100 k written per day / 10 dbs · Durable Objects on free = **SQLite backend only**,
100,000 req/day, 13,000 GB-s/day · Pages static requests free and unlimited.
**4.9 · Cloudflare's own matrix:** *"Unlike Pages, Workers does not support any domain whose
nameservers are not managed by Cloudflare"* → with nameservers moving, **Workers** is correct.
**4.10 · P-210's research exists** (muse `20261102-0805`, reviewed ok by beam `20261103-0930`): Safari
7-day eviction VERIFIED against the WebKit primary source; **§3 host change = total loss.**

---

## 5 · WHAT IS BROKEN (each with file:line and a receipt)

**5.1 · D1 — the merge blocker (Z.ai's tree).** The shipped tree cannot pass both of its own manifest
gates. `node scripts/gate-manifest.mjs` → `MANIFEST FAIL (unlisted): scripts/fresh-server.mjs ·
scripts/probe-w14.mjs · src/lib/port/suggestWhy.ts` (exit 1). After `regen-manifest.mjs`,
`gate-manifest` PASSES but `tools/verify-package.mjs` fails with **467 EXTRA**, because
`regen-manifest.mjs` writes **sha256 (64 hex)** into `CHECKSUMS.txt` while `verify-package.mjs` parses
**md5 (32 hex)**. **The composite cannot reach "ACCEPTANCE RUN COMPLETE" with green gates.**

**5.2 · Stat #2 contradicts the Owner.** P-208's locked #2 is *"Undefeated seasons (20-0)"* — 17-0
regular + 3 playoff wins — while §2.7 says undefeated = **regular season**, *"without defining 20-0"*.
**Recommendation: keep #2 as "undefeated regular season", add "Perfect season (20-0)" as an 11th.**

**5.3 · D5 — the stale engine stamp (product bytes, mine).** `src/App.svelte:83` is
`const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the **previous** pin — while the shipped engine is
`408410477`. `metaNow()` stamps it into every autosave and manual slot, and `Saves.svelte:80` then
prints: *"this save came from build 67-cakepanz@d3bd81d2 (running: nfl1.1ac56c28928eff)"*.
**This must be fixed before any server compares `engine_version`**, or every save this build writes
arrives flagged foreign.

**5.4 · H2 — the pin-watch points at a dead pin.** `SNAPSHOT.md:10` records `65673a00` as
**superseded** by `408410477`, while CI's pin-watch still watches `65673a0`.

**5.5 · D4 — the share notice overpromises.** The W14 law asserts the local save is untouched *before*
START. One START later the autosave holds the link's draft (probe: seed `7874343` / 43 picks →
`935613` / 20), and manual slots A/B/C are the only recovery.

**5.6 · D3 — `SHELL-STATUS.md` ships describing an earlier build** than the `dist/` in the box
(pinned hash `8c9ef26b…`/389211 B vs shipped `c05faa33…`/390846 B). Step 13d regenerates it; the
composite never reached 13d.

**5.7 · iceman's C4 heading is wrong.** It says *"Multi-season stat tracking (MANDATORY TO
RELEASE)"*, contradicting his own Q14 and §1.9. The mandatory item is **cross-run career stats**.

---

## 6 · CORRECTIONS TO THE RECORD (mine and others')

1. **P-208 is locked, not open.** I said open at 04:50Z; `inbox/20261102-0745-muse-P-208-stat-list.md`
   is titled *"V1 career stat list (locked: 10 stats)"*. **Withdrawn.**
2. **P-210 is done, not open.** I said open at 05:05Z; muse's research + beam's review exist. **Withdrawn.**
3. **The paid domain was the wrong recommendation.** The Owner's constraint is **free-only** (1.4).
   **Withdrawn** — `workers.dev` as the permanent hostname is correct (hy4, porca).
4. **My origin warning was too broad.** A host change destroys local saves **for signed-out users
   only**; signed-in users are recoverable from the server. The scope correction matters because it
   turns hy4's "reversible" into "safe only after accounts ship".
5. **hy4's verbatim had a typo** — *"i an create"* — corrected by porca to *"i can setup"*. Use porca's.
6. **Two seats now hold the rival images.** glyph's `_reference/rivals/` (with `MANIFEST.tsv`) is the
   conventional home; my delivery-folder copy is the duplicate and should be deleted, not both kept.
7. **The 1 Nov brief's "no accounts" line is superseded but not marked.** Whoever fixes it must add a
   supersession line, not rewrite the verbatim note.

---

## 7 · WHAT EACH ROLE MUST KNOW

### 7.1 · Claude (Architect) — you own the product, the engine and the pin

- **The mandatory set is now product scope, not infrastructure:** accounts, cross-run career stats,
  save sync, offline-conflict resolution, local→account migration, brag share — all before deploy
  (§1.6, §1.7). **The pin stays `408410477`**; §1.9 settles that career stats are cross-run, so no
  offseason model is needed for v1. If you judge a multi-season model is required for *player* career
  totals, that is a **scheduled re-pin sitting**, not a slip-in.
- **Fix D5 first** (§5.3). Every question pickle's plan asks about `engineVersion` policy depends on
  the stamp being true.
- **Write the account + sync contract.** It does not exist (verified across four refs). Pickle's
  §1 file map and §4 Q1–Q17 are the questions; §5's phases A–G are the sequence. Your v8
  (`169e554`) remains the build order for the UI.
- **Your own v8 claims I confirmed by reading the S14 tree:** `cp-quick` (`BoardRow.svelte:47`) is the
  only immediate-draft control; the main button only expands (`:25`); non-ringed rows have chips only
  (`:63,65`); `rawSort` is absent from `src/engine/` (comments only); floors 19/18/28 reproduce.
- **The glow inversion kills a law.** Today's pulse is only on the top three
  (`shell.css:181`), and **L23** asserts exactly that. v8's "every Draft button pulses, top three
  skip" turns L23 FAIL and board 19 → 18/1. Either rewrite L23 or retire it by name and move the floor
  to 18.
- **"Every Draft button" is three selectors** (`.cp-quick`, `.cp-chip`, `.cp-chip.cp-primary`) and chips
  only exist inside an expanded row — so pulsing them is invisible on 29 of 32 rows. Say which control
  pulses.
- **The sheen already exists** on the top three (`BoardRow.svelte:136` `cp-suggest-shimmer`) — keep,
  don't add; only the badge is new.
- **Pin bookkeeping:** `65673a0` is superseded (`SNAPSHOT.md:10`); `App.svelte:83` is the stale one.
- **Playwright:** your 1.65.1 pin cannot run in your sandbox, but the seats ran the full suite today
  at **1.57.0** with `chromium-1255`. Record "not verified in the Architect's sandbox; verified by
  seats at 1.57.0", not "no browser run is verified".

### 7.2 · Z.ai — you own the cakepanz shell and the S15 build

- **D1 is yours to close** (§5.1): one digest policy, then re-run composite steps 14–17. Until then
  "ACCEPTANCE RUN COMPLETE" is unreachable.
- **Do not implement the account system yet.** Pickle's plan (adopt it) puts Phase A (the seam) and
  Phase B (local storage, stats, brag) in your lane against the frozen P-207 contract, and the
  account/sync phases in the Architect's. Your S15 slices 3–5 stay yours.
- **The stat #2 fix (§5.2)** changes one row of P-208 — cheap to absorb now, expensive after B2.
- **The fresh-server guard works.** Another seat's preview owned `:4179` and served a different build
  (`index-CqNg1gtO.js` vs `index-BZF5JLE6.js`); `assertFreshServer` caught it. Keep that discipline.
- **Rival reference images** are glyph's in `_reference/rivals/`; do not re-host.

### 7.3 · MUSE — infrastructure and queue

- **Record the reversal** (porca Q3.1): add one supersession line to
  `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` and to `PROJECT-KNOWLEDGE.md:11`
  (which already says "sync-on-reconnect") — **do not rewrite the verbatim**.
- **Re-rank to release-blocking:** P-208 (locked, done), P-209 (brag spec), P-210 (done — cite it),
  and the account/sync/migration work that has no queue row yet.
- **Re-point the pin-watch** (`65673a0` → `408410477`).
- **The `AGENTS.md` pin line still says `d3bd81d2`** (AGENTS.md:44-46, 73; PROJECT-KNOWLEDGE.md:18) —
  it should read `408410477` once the Architect confirms.
- **Two copies of the rival images** exist; glyph's is canonical.

### 7.4 · Every seat

- **Read `_agents/QUEUE.md` and take work; do not wait to be assigned.** (AGENTS.md §1)
- **Label every claim** VERIFIED / REPORTED / INFERRED / UNKNOWN. A claim with no command is INFERRED.
- **No seat writes `Football-Sim-*.html` or `colors/**`.** Ideas and snippets go in your own `inbox/`.
- **Never force-push, never stash.** Run `node tools/preserve.mjs check` at the end of a session.
- **The S14 tree is hosted read-only** at
  `_agents/ernie/deliveries/zai-cakepanz-14-2026-11-20/cakepanz-14/` — read it, don't rebuild it.

### 7.5 · The Owner — the five decisions still yours

1. **Stat #2:** is "undefeated" the regular season (your 1 Nov words), or 20-0? (Recommendation:
   regular season + an optional "Perfect season (20-0)" 11th.)
2. **Auth provider:** hy4's concrete default is **Clerk Hobby** (free, 50k MAU); pickle's is
   "Better Auth or a managed OIDC". Either satisfies §2.3 — pick one so the Architect can build.
3. **The hostname:** `workers.dev` permanently (free), or a custom domain later (only safe after
   accounts ship and every user is signed in).
4. **Brag share:** text only (P-209), or also a PNG card (post-v1 unless you want it in).
5. **Whether "stats beyond a single season" includes the players** — you answered cross-run career
   stats (§1.9); if you also want player career totals, that needs the engine offseason model and a
   deliberate re-pin.

---

## 8 · STILL OPEN (with the default I would take)

| # | question | my default |
|---|---|---|
| Q1 | auth implementation + providers | managed OIDC (Clerk Hobby free tier), GitHub+Google, no hand-rolled credentials |
| Q2 | does an account own saves, or does a device identity bind later | device `deviceId` first (P-254), account binds at sign-in |
| Q3 | D1 vs KV vs both | D1 for saves/stats/prefs, KV for sessions |
| Q5 | what breaks a LWW tie | server-monotonic `(userId, slot)` sequence, `deviceId` tie-break, client `savedAt` for display |
| Q6 | rung-back depth and location | server `save_revisions` (last N) + one local copy; N = 30 days |
| Q7 | how "keep both" fits three slots | server-side fork record surfaced as a one-time choice; three playable slots stay three |
| Q8 | stat authority | server recomputes from accepted envelopes; client cache updated atomically |
| Q9 | session lifetime | long-lived refresh, offline play always works, re-auth only on successful reconnect |
| Q11 | achievements | ship the API stub, no invented list |
| Q12 | `engineVersion` policy | refuse replay of older envelopes, show an honest message, keep the bytes |
| Q13 | brag URL | `workers.dev` or the final hostname as a build-time constant; button hidden when unset |
| Q15 | account deletion | out of scope for v1, documented honestly |
| Q16 | abuse caps | cap envelope size at the measured 3-slot budget, rate-limit sync |
| Q17 | review process | one round, answers in `inbox/` with `FOR: Q<n>` |

---

## 9 · THE FENCE (restated so nobody has to guess)

- **Do not build the account system before the contract exists.** Contract → plan → build, as the
  storage wave did.
- **Do not touch:** `Football-Sim-*.html`, `colors/src/**`, the engine, the pin, protected constants,
  `AGENTS.md` / `CLAUDE.md` / `biome.json` / `tools/`, `QUEUE.md`, `CHRONICLE.md`, another seat's lane
  or inbox, any verbatim Owner note.
- **No field-level save merge. No CRDT. No mutation log.** P-254 governs.
- **No downloads, no export/import, no hidden full save.** The brag share is text, never a file.
- **Free-only.** Nothing in this plan may require a paid tier.
- **The game must stay fully playable offline with no account.** Sign-in is additive, never a gate.
- No force-push, no stash, no images in lanes. Push your own `council/<seat>` and verify with
  `git ls-remote`.

---

## 10 · THE ONE-LINE VERSION, IF YOU READ NOTHING ELSE

> **Ship the account capability before deploy — optional for the player, mandatory to build — on the
> existing engine pin (`408410477`), free-only, offline-first; career stats are cross-run (P-208, with
> #2 defined as the regular season); sign-in is OAuth/OIDC via a maintained provider; saves sync by
> whole-envelope LWW with a rung-back and keep-both (P-254); migration is an idempotent upload by the
> existing `saveId`; the brag is text plus a bare URL; the host is one Worker with static assets on
> Cloudflare, and the hostname does not change after users arrive.**

— ERNIE (advisor; signs as ERNIE, never as another seat). This briefing is advice: it assigns nothing,
approves nothing, moves no pin and writes no product file.