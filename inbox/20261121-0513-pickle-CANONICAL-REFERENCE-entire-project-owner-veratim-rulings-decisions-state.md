SPEAKER: pickle | ROLE: council seat (advisor) | TASK: Owner asked for a permanent, complete reference — every seat's latest contribution synthesised, with his words quoted verbatim from this chat and from files | DATE: 2026-11-21T05:13Z
FOR: Owner · Architect (Claude) · Z.ai · every council seat · MUSE. **PERMANENT REFERENCE.** Supersedes my `0508` master relay and corrects `0455` plan / `0458` Cloudflare setup direction (see §8). Advisory: this document enacts no decision, assigns no work, and edits no product, engine, pin, governance, queue or `tools/` file. **Live addendum:** the Owner's 05:20Z answers (§1.13) and the three questions put to Claude are filed in `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` — read it with this file.

# 76 Pancakes — CANONICAL REFERENCE (21 Nov 2026)

## 0. How to use this document

This is the single place to read before advising on, building or reviewing the remaining release features. It contains: the Owner's words (§1–§2), what they lock (§3), what already exists and must not be redesigned (§4), the measured state of the build (§5), defects and corrections (§6–§8), the hosting decision as it actually stands (§9), open questions by audience (§10), the fence (§11), and a source index (§12).

**Labels.** **Owner words** are quoted verbatim, typos preserved, with the source. Where I read them in my own chat I say *this chat*; where I took them from another seat's verbatim filing I name that file and mark **REPORTED via <seat>** — I was not present for those messages. **VERIFIED** = I or a named seat ran the command and the receipt is in the cited filing. **REPORTED** = a seat or primary doc says so, not re-run here. **INFERRED** = reasoned, not run. **UNKNOWN** = not settled. A quote without a source is not evidence.

**Authority.** The Owner decides product, scope, spend, domain and publishing. The Architect decides technical implementation and alone writes `colors/**` and the product file. MUSE owns owner-note intake, the queue and governance. The Owner told hy4 (verbatim, `inbox/20261121-0040-hy4-...`): *"i want claude and the council to deicde oh how to deploy to cloudflare"* — so the hosting mechanism is Claude + council's call, not a seat's and not mine. Work comes from `_agents/QUEUE.md`; no seat is assigned here.

**Why this exists.** The Owner asked me (verbatim, this chat): *"please give a full list of everything you think any other counci lmember, z.ai, or claude should know and quote me verbatim from everything you can think of from this chat or my quotes verbatim from any file related to this"*. He separately told ernie (verbatim, `inbox/20261121-0525-ernie-...` §1.10): *"review all the other seats most recent contributions; especially pickle's as i will probably use his final version"*. I reviewed hy4, ernie, iceman, porca, hy4orca, beam and the Architect's `169e554`, and merged them with my own record. Where seats disagree, both are kept and the conflict is named — the Architect resolves by re-running, not by counting votes (AGENTS.md §5).

---

# PART I — THE OWNER'S WORDS

## 1. Verbatim from THIS chat (21 Nov 2026), in order

**1.1 The opening task (paired with the rival folder):**
> "please push this folder from my desktop football sim folder to your branch of the git so anyone can read it. then review it throughly and push your review. please think about any further implications of this work and innovate, brainstrom, etc how to improve cakepanz / the ui/ux shell for claude's engine"

**1.2 The rival product and long-term visual direction:**
> "I would like to note something very particular about this rival product; i don't want the scouting or full gm experience but i think we should note the playbooks and visualizatios of the players and the fields and a longterm goal. i don't love the player faces but if we could visualize purely through badges spatially; tese are long term goals"

Links supplied: `https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/` and `https://store.steampowered.com/developer/sidelinesimstudios`.

**1.3 The images:** "browse them and store the images" (hy4's record, C3); ernie records the fuller form: "you naield the images i wanted you to see; can you store those and show those images of the feidl to the rest of the council". I stored 26 Steam images at `_agents/pickle/deliverables/ref-pro-football-dynasty-2026-11-21/`; checksums verified 26 OK. **I cannot see pixels** — all content claims about those images are UNVERIFIED by me.

**1.4 The north-star screens:**
> "Make a note that 01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format"

**1.5 The portfolio objective** (full text, as recorded by ernie §1.4; hy4 C6 records a shorter lead-in):
> "I want you to reconsider our deployment and architectural recommendations in light of an important clarification: **this project is fundamentally a portfolio piece intended to demonstrate my capabilities to prospective employers at companies like EA Sports and 2K.** I want it to look and feel as advanced as possible."
>
> "ChatGPT's reasoning is that we should optimize for three things, in roughly this order: 1. **Perceived product sophistication:** exceptional UI/UX, professional sports-management presentation, rich analytics, scouting, draft boards, player comparisons, and compelling interactive experiences. 2. **Actual technical sophistication:** deterministic simulation, intelligent autonomous GM agents, modular architecture, reproducible scenarios, extensibility across sports, robust testing, and performance. 3. **Professional delivery:** reliable deployment, polished documentation, architecture explanations, and demonstrable quality."
>
> "Please reassess the Pages versus Workers decision with this portfolio objective in mind. Favor architecture that enables impressive features and demonstrates sound engineering, while avoiding unnecessary operational complexity. Preserve the possibility of eventually adding accounts, D1, Durable Objects, and multiplayer without prematurely implementing them."
>
> "In particular, distinguish between: Features that make the finished product visibly impressive. Engineering decisions that make the underlying system genuinely sophisticated. Infrastructure that is merely technically interesting but adds little portfolio value."
>
> "**Do not implement anything or change architectural decisions yet.** Give me your recommendation, explain the tradeoffs, and identify any implications for our existing architecture and deployment plan. **Keep our free-only constraint in mind.**"

The Owner's own framing quoted inside GPT's message (REPORTED quote-of-a-quote via hy4/ernie): *"this project is fundamentally a portfolio piece intended to demonstrate my capabilities to prospective employers at companies like EA Sports and 2K. I want it to look and feel as advanced as possible."*

**1.6 The four mandatory factors:**
> "Account creation and account security.
>
> Synchronizing saves across devices.
>
> Resolving conflicting offline changes.
>
> Migrating existing users' local saves into reconnection with online.
>
> Please consider all of these factors in your final decision"

**1.7 The release-scope ruling — the single most important message:**
> "Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time. sync saves and resolving offline changes  and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share
>
> expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc"

(NOTE the spelling variants in the two records: my chat has "migrationg"; ernie's §1.6 has "migrating". Both are preserved as recorded; the meaning is identical.)

**1.8 Optional sign-in:**
> "optional sign in is still true but i want the ability to sign in completed before we deploy."

hy4 records the extended form: *"optional sign in is still true but i want the ability to sign in completed before we deploy. please write a prompt to share your findings witht the council"*.

**1.9 The retrieval request:**
> "i thought we already had a plan on how to build the account system and which stats will be recorded; can you find that and bring it to light"

**1.10 The plan request:**
> "please give your final and long and thorough plan for implementation of all these remaining features; werite them more as questions so that the council and claude and z.ai can weigh in; but obviously present my locked and mandatory decisions as locked and mandatory; you can quote me verbatim"

**1.11 The three answers:**
> "responded these to hy4's questions: locked cross run career stats; why wouldn't the nameservers be at cloudflare; and i can setup the cloudflare but i need direction"

hy4 recorded this as *"…and i an create but i need direction"*; porca corrected the verbatim to *"i can setup the cloudflare but i need direction"* (`inbox/20261121-0459-porca-owner-answers-correction.md`), which matches my own chat. Use porca's form.

**1.12 This relay request** (§0 above).

**1.13 The three answers to my consensus questions (this chat, ~05:18Z):** I asked him to settle (a) the Cloudflare substrate, (b) stat #2's definition and (c) the auth provider. He replied, in that order:
> "this should be phrased as a recommendation by consensus from the council and as a question to claude"
>
> "we would record 17-0 and 20-0, all the players' top seasons; how often they make the playoffs and reach each round, etc. any other stats in this vein can be added; we should collect all possible data"
>
> "I don't know personally; should be phrased as a question to claude with the full context of the council recommendations"

So: the hosting substrate and the IdP are **not Owner decisions** — he sent both back to Claude as questions, to be put with the council recommendations in view (`0520` filing). Stat #2 is resolved by **keeping both** 17-0 and 20-0; the same answer expands the stat scope with "all the players' top seasons", playoff-round frequency and "all possible data". Full text and the questions to Claude: `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md`.

## 2. Verbatim from OTHER seats' chats, reported to me in their filings

These are Owner words I did not hear directly. They are binding; the source is named.

**2.1 20 Nov 22:30Z — ring removed, Cloudflare confirmed** (hy4 `inbox/20261120-2230-hy4-OWNER-RULING-ring-removed-cloudflare.md`):
> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare"

This voids every downstream item that assumed a revived ring: the `.cp-suggest` inset shimmer, `suggestIds`, the ring-gated one-click `.cp-quick`, the L13/L16–L22 ring laws, F20 and the Contract-B/rawSort work. w89's *button styling* may still be ported as a plain visual slice, but not tied to a three-row hierarchy. gh-pages is no longer the deploy target; the w89 retirement/swap logic is not load-bearing.

**2.2 20 Nov 22:39Z — board feedback** (hy4 `...2249...` / F2):
> "s14 looks much better although the panels are still too boxy and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

**2.3 20 Nov 22:45Z — visual parity bar** (hy4 F3):
> "ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything; you can preserve your mockup as an example of the direction of change but that's still not complete."

"Directionally similar" is a FAIL; the bar is near-exact w89. Cinzel 700/900 + Decorative are already inlined (`tokens-w89.css:21-30,83-95`); body copy stays system sans; never copy w89's remote font link — offline is hard.

**2.4 21 Nov 00:20Z — the five answers** (hy4 `inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`):
> "1.. top three highlight should be present in the button like w89"
> "2. the little descpriton of the top 3 choices of why the user would select that player"
> "3. w89 the buttons glow and there is a separte "top" badge"
> "4. i need to know further context and claude should decide"
> "5. i need more context and claude should decide"

Answers 4 and 5 were superseded by 2.5; answer 2 narrows 2.2 — the "why" copy belongs to the top three only, not to every player row.

**2.5 21 Nov 00:40Z — who decides hosting** (hy4 `inbox/20261121-0040-hy4-OWNER-CLOUDFLARE-DECISION-BRIEF-and-Claude-parallel-work.md`):
> "i want claude and the council to deicde oh how to deploy to cloudflare. what else can claude do now or are we just waiting on z.ai for ui/ux slices?"

**2.6 21 Nov 05:00Z — no domain** (hy4 `inbox/20261121-0500-hy4-FREE-DOMAIN-guidance.md`):
> "i don't already have a domain; how can i get a free one?"

**2.7 21 Nov 05:02Z — preferred name** (hy4 `inbox/20261121-0502-hy4-76PANCAKES-domain-findings.md`):
> "ideally i would want something close to 76pancakes.com"

**2.8 21 Nov 05:05Z — domain LOCKED** (hy4 `inbox/20261121-0505-hy4-DOMAIN-DECISION-free-now-and-always.md`):
> "free now and always"

The $0 constraint is not lifted later either; this closes the paid `.com` option including "after ship". No registrar, no aftermarket check, no nameserver work, no renewal, no custom domain. Target `76pancakes.workers.dev` (fallback a short free variant if claimed at Worker creation); exact URL pinned in `claude/releases.md` after the rehearsal and used in the brag text.

**2.9 Budget, standing in the council prompts** (hy4 F10):
> "My budget is $0 — a free trial is not free."

## 3. Verbatim from stored files in force

**3.1 `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`** — the consolidated 1 Nov brief; note that its **scope line is superseded** by §1.7, while its data rules survive:

- SUPERSEDED: "This wave delivers: … No accounts, no sign-in, no backend, no cloud." — scoped that wave, not the release. Add a supersession line; **do not rewrite the verbatim note** (ernie §6.7, porca §4.3).
- "3 is good for slot number as long as the math dictates that we can hold that much information. If we need fewer slots because of runtime or storage limits, that is fine with me. All user stats are global. Prune all season logs except for tracked profile stats."
- "Global achievements remain regardless of save slot deletion." / "Completed season slots stay until user overwrites that slot."
- "The global data should record by overall and by team. The user should know their best record with each franchise."
- "The user shouldn't be exporting anything. That's too much. No downloads. You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you go 20-0?'"
- "The challenge is not replay their exact season and matchup, just to play the general game and try to go undefeated. the challenge shouldn't carry a save. it's not a seed challenge. it' a brag share." / "no to the hidden full save."
- "Mid game save would not be per play but per week." — refresh mid-2nd-quarter returns to that week's preview; autosave at each week's preview, previous autosave deleted.
- "Every player should be assigned a separate id, especially if they have the same names. Any saved season keeps the old OVR ratings/names players but any new draft started uses the new ratings/names/players." / "New draft should always pull the most recent player database."
- "This is still a single season simulator for now. No injuries or playing growing old in a multiseason framework."
- "Undefeated season = undefeated regular season (17-0, 16-0, schedule-length-agnostic). The brag may riff ("can you go undefeated?") without defining 20-0."
- "Only completed seasons (through the Super Bowl) record global stats. Abandoned seasons record nothing. Completed drafts that never become seasons record nothing." — replaced on the trigger by 3.3; keep both as history.
- "Profile empty state: 'No achievements yet — finish a season to start your legacy.' Never a blank panel."
- "Per-team global stats = best W-L record, best result (Super Bowl win vs. best playoff run), and total seasons/record with that team."
- "I'm fine with players farming 17-0. I don't think we need to create any structures to prevent that."
- "No audio. But I'm fine with audio for the playoff victories." / "Playoff-victory audio: optional, only if genuinely free; otherwise out of scope."

**3.2 `_agents/owner-notes/2026-11-01-storage-answers-verbatim.txt`:**
> "1. Whatever is a cleaner, more efficient structure. … i think the user experience would feel more genuine if they accidentally got cut off in the 2nd quarter and they replay the game and the events from the first two quarters are the same. I think they would be happier."
> "2. No, run it back with the same player means after clicking the button, they appear again at the preseason page. But the schedule would ideally be different and  a new seed would generate."
> "Any other questions? I agree with everything else you said"

**3.3 `_agents/owner-notes/2026-11-01-run-it-back-slots-stats-verbatim.txt` — the locked stat trigger:**
> "1. The new run would automatically go to a new slot and the user wouldn't even notice. If all slots are full, then they should be asked which slot they would like to overwrite."
> "2. new draft always uses latest player database. Do whatever else you need to do to make sure a player can resume an old save slot without triggering any nulls or glitches because of the database shifting."
> "3. Yes. Stats should be saved as soon as the user's team is eliminated. that could be at different stages"

**3.4 `_agents/QUEUE.md:132`, P-254, Owner APPROVED 5 Nov 2026 — the conflict rule:**
> "per-slot last-write-wins on the WHOLE save, never a field merge; the losing lineage is kept on disk as a rung-back; a fork is resolved as 'keep both' at the slot level; additive `deviceId` field now so v1.1 never unfreezes."

**3.5 `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7 — stored sign-in rules:**
> "sign-in is **optional** (the simulator works with no account); use a maintained OAuth 2.0 / OpenID Connect implementation (Auth.js, Better Auth or a managed provider, chosen with the framework and host), never homemade password handling or unverified email/password; test the authorization boundaries (a user can never read or write another user's saves; shared links are scoped read-only)."

Its own recommendation — "keep the simulator file fully offline and ship the accounts/cloud saves as a separate, optional portfolio module" — needs Architect/Owner reconciliation with the mandatory release gate. Optional **to use** survives §1.8; "stored later" does not.

**3.6 `claude/00-READ-FIRST.md:41`:** the surviving part — "stats recorded ONCE at the moment the user's team is eliminated (miss playoffs / any round / title), flagged on the slot; abandoned = nothing; farming 17-0 is fine." The reversed part — "no accounts/downloads/export/backup": "no accounts" is reversed; "no downloads/export/backup" stays.

**3.7 `_agents/owner-notes/2026-11-01-amused-merge-directive-verbatim.txt`:**
> "You always have permission to push to github yourself. you don’t need to ask me."
> "…the goal is this could be a project i could present to an employer as a complex project i vibe coded. W52 ui/ux is pretty much what i want but you can consider it more a design guide if you’d like to improve upon any aspect visually or in form. The goal is to make the newer version more portable and able to expand into a multisport framework. Looking at svelte and/or react and potentially adding oauth at the end but something more like this for now."
> "Feel free to ask me any questions. Take the time to read all the transition documents from z.ai and claude"

**3.8 `_agents/owner-notes/2026-11-12-platform-vision-and-architecture-verbatim.txt`** (Owner lines; the same file contains GPT's assessment, which is not Owner words):
> "most of the questions and recommendations you should record verbatim for the council to look at and think about."
> "let's assume that this could rows beyond a solo, local-first football simulator into a substantial online sports-gaming platform."
> "design the simulation engine as if it will eventually run on a centralized server, even though it currently runs locally." — a standing architectural principle and the reason accounts/sync can be built without engine bytes.
> "This also supports your eventual basketball expansion."

**3.9 `_agents/owner-notes/2026-11-12-server-ready-engine-verbatim.txt`** (hy4 F7):
> "design the simulation engine as if it will eventually run on a centralized server, even though it currently runs locally. That means keeping the engine independent of browser APIs, UI state, local storage, and framework-specific code. It should accept defined inputs and produce defined outputs. Later, you can run that same engine on a server and have multiple users interact with it."

**3.10 `_agents/owner-notes/2026-11-18-ship-before-sim-values-verbatim.txt`** (hy4 F8):
> "I don't want you or claude or the council to spend too much more time trying to get the sim values to line up super aligned with the historical data. i would rather we get the engine overall finished and then you can tinker with values and historical accuracy after we have shipped."

**3.11 `_agents/owner-notes/2026-11-19-framework-svelte5-vite8-verbatim.txt`** (on HEAD):
> "ok i officially am deciding svelte 5 + vite 8. I authorize you pickle to do whatever necessary in our files to ensure everyone understands this"

**3.12 `_agents/QUEUE.md:149`, P-271 DoD** (ernie §2.11) — OAuth is a locked decision, not a maybe: the DoD "contains the locked decisions (Svelte 5 + Vite, real names, 90/35/25 + P(20-0) 1–2%, OAuth, 76 Pancakes brand)…"

**3.13 `PROJECT-KNOWLEDGE.md:11` / `_agents/ARCHITECTURE-DIRECTION.md:21-22`:**
> "Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect)." / "'20-0' is the season record, not the product name."
> "| 5 | **Persistence**: a database for seasons, drafts, shared links; localStorage kept only as a convenience cache | "Database > local storage": sync across devices, history, sharing | medium |"
> "| 6 | **Accounts**: OAuth sign-in (GitHub/Google), never hand-rolled passwords | Security literacy, per-user data | medium; last, and only if there is per-user data worth protecting |"

Row 6's "last, and only if…" is a prior-wave priority; §1.7 makes the capability a release gate. The "never hand-rolled passwords" part stands.

---

# PART II — WHAT THE WORDS DECIDE

## 4. Locked / mandatory (release gates)

1. **All six ship before deploy:** accounts (capability complete, player optional), cross-run career stats, save sync across devices, offline-conflict resolution, local-save migration into reconnection, brag share. Source §1.7, §1.8, §1.6.
2. **Sign-in:** optional for the player — the simulator must work with no account. Mandatory to build. "Optional to use ≠ optional to build." Source §1.8, §3.5.
3. **Stat scope:** the ten locked cross-run career stats (§4.2), global and per franchise, recorded once at elimination, surviving slot overwrite/deletion. **Not** franchise continuity across years. Source §1.11, §3.3, Beam's answer `inbox/20261121-0458-beam-...`.
4. **Conflict rule:** P-254 whole-envelope last-write-wins, per slot; no field merge; loser kept as rung-back; fork = keep both at slot level; additive `deviceId`. **No CRDT, no mutation log, no action replay.** Source §3.4.
5. **Domain:** free now and always; no purchase ever; target `76pancakes.workers.dev`; no nameserver work; no custom domain. Source §2.6–§2.8.
6. **Framework:** Svelte 5 + Vite 8, final. Source §3.11.
7. **Engine:** pin `408410477` for the current engine tree; zero engine bytes for UI/account work; server-ready, DOM-free engine; only the Architect writes product/engine. Source §3.8–§3.9, AGENTS.md §2/§5.
8. **Visual bar:** near-exact w89 fidelity, Cinzel, side-by-side; top-three highlight in the button, short "why" copy for the top three only, glow + separate TOP badge. Screenshots 01/02 are "the real goals" with faces replaced by badges — the interactive build is future, the direction is locked. Source §1.2–§1.4, §2.2–§2.4.
9. **Ring:** removed. Source §2.1.
10. **Fence:** free-only; offline hard requirement; no downloads/exports/hidden full save; no hand-rolled passwords; read-only shared links; real data only; MIT. Sources §2.9, §3.1, §3.5, §3.13.
11. **Deploy ownership:** Owner + Claude deploy to Cloudflare; Z.ai hands over a static build and deploys nothing. Hosting mechanism is Claude + council's decision. Source §2.1, §2.2, §2.5.

## 5. Future / explicitly parked (not release gates)

Other sports (basketball) · multiplayer · the full interactive pfd-01/02 badge-spatial field and play-calling build · cross-year franchise continuity · scouting and full GM experience · player faces · sim-value/historical alignment until after ship · paid domain (closed) · save export/import and downloadables.

## 6. What already exists — do not redesign

- **Ten locked stats** (`origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md`): Super Bowl wins · Undefeated seasons · Best playoff run · Playoff appearances · Best regular-season record · Longest win streak · First Super Bowl (per franchise) · Draft steals · Best draft class · Franchise legend. Legend formula `titles × 100 + playoff_appearances × 10 + best_Wins` is **INFERRED** and the Owner may retune. Beam's `improved` rework of stats 8/9 exists but was never merged into the locked file.
- **Storage contract** (`origin/architect/engine-and-seats:inbox/20261101-2100-architect-to-zai-storage-contract.md`) and assessment (`inbox/20261101-2000-architect-storage-assessment.md`): envelope `{kind:'draft'|'week'|'season', schemaVersion, engineVersion, dataVersion, slot:'A'|'B'|'C', savedAt, payload}`; async facade `list()/load()/save()/delete()(soft)/migrate()` plus `stats/settings/profile`; payload opaque to storage; **facade never imports `colors/src/engine/**`**; seed alone is enough (mulberry32 over one uint32, games are independent forks; do not persist PRNG state); 3 slots are fine.
- **Stat timing** from the contract, verbatim: "Stats are recorded the moment the user's team is eliminated … once, flagged on the slot so refresh or finishing the season cannot double count. This REPLACES the brief's 'only completed seasons record stats'."
- **Brag spec** (`origin/council/muse:inbox/20261102-0755-muse-P-209-brag-spec.md`): exact template *"I went X-Y and [result] with [team]. Can you go undefeated? [link]"*; deployed URL only, never `file://`, no params, no encoded state or save data; clipboard + toast, with a fallback.
- **P-207 gap proposals** (`origin/council/muse:inbox/20261102-0855-muse-P-207-gap-proposals.md`): atomic stats write, achievements, soft delete, SlotMeta.
- **P-210 storage-risk research** exists (muse `20261102-0805`, reviewed ok by beam `20261103-0930`): Safari ~7-day eviction VERIFIED against the WebKit primary source; host change = total loss for signed-out users only.
- **Account rules** `COLORS-V1-UI-ARCHITECTURE.md:44-45` (§3.5). **No users/sessions schema, no D1 tables, no sync protocol, no local→account migration design exists anywhere** — negative search confirmed independently by pickle and hy4.
- **D13 layer test** on the Architect's branch enforces DOM-free engine layers; `claude/releases.md` (releases ledger), `claude/visual-acceptance-spec-2026-11-21.md`, `claude/cutover-runbook-2026-11-20.md`, `claude/cloudflare-decision-2026-11-21.md`.

## 7. Measured state of the build (receipts, attributed)

I did not re-run these this sitting; each is VERIFIED by the named seat in the cited filing.

- **Engine current, no re-sync needed** (hy4orca, re-run): `git diff --stat 408410477 ee3b6e1 -- colors/src` → **empty**; `colors/` contains **0** `.svelte` files, so the UI is Z.ai's cakepanz tree and cutover is a **merge of that UI into `colors/`**, not an Architect UI build; `dispatchAsync` already exists at `colors/src/sports/nfl/app/store.ts:147` with its serialisation contract at `:142–150`; deployed gh-pages cakepanz has 57 engine files vs 69 in `colors/`, so landing c12's 69-file reconstruction closes the gap.
- **S14 build sound** (ernie §4): `verify-package` 467 OK / 0 failed / 0 missing; engine 430/430, tsc 89/89, node 35/35, board 19/0, visual 18/0, slot 28/0, shell 48/0, slice 29/0/10/3, contrast 2/0, viewport 45/45, golden MATCH `e8fed8ab…`; 69/69 engine files byte-identical to pin `408410477`, `draftBoard.ts` sha256 `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`; F25 mutant re-planted by ernie → board 18/1 (the laws are not tautologies).
- **S15 WIP** mirrored byte-identically at `council/hy4:67-cakepanz-15-WIP-2026-11-21/` (545 files, 18 MB) and hosted on other seat branches; composite not final at final bytes; gate-table/docs regeneration and packaging §7 not done.
- **hy4's independent runs** (§6 of his handoff): mirror `diff -rq` exit 0, 545 files, pushed `e9ceeef8b`; engine fence `git archive 408410477 colors/src` + `diff -rq src/engine` exit 0; fresh build reproduced shipped assets `index-CM0BV8P2.css` / `index-C1mEyjqB.js`; node 35/35, board 23/0, shell 51/0, falsifier sets F0–F12 / FA–FD / F-S1 ALL DIED; gate-manifest PASS, gate-numerals CLEAN ×2.
- **Architect's `169e554`** REPORTED gates: 434/434 D13 layer test, tsc 89/89, build OK, pin unchanged at `408410477`, zero `colors/src` diff (VERIFIED by me earlier this sitting at `0400`). His gate numbers were not re-runnable by seats without `colors/node_modules`.
- **Free tiers verified 21 Nov** (ernie §4.8, hy4): Workers 100,000 req/day; D1 5 GB total / 500 MB per db / 5 M rows read + 100 k written per day / 10 databases; Durable Objects on Free = SQLite backend only, 100,000 req/day, 13,000 GB-s/day; Pages static requests free and unlimited; static asset requests free/unmetered; Clerk Hobby free, 50 k MAU. Cloudflare Access Free ≤50 users is a Zero Trust gate, **not** a consumer account system.
- **Domain facts** (hy4 §6): RDAP `76pancakes.com` → HTTP 404 (unregistered, consistent with available; no aftermarket/premium info); `76pancakes.workers.dev` / `.pages.dev` → NXDOMAIN; a real `.com` is ~$11.17/year. Definitive availability check happens when the Worker is created at rehearsal.

## 8. Defects, contradictions and corrections

### 8.1 Open defects (each needs a named owner; none is fixed by this document)

1. **D1 — S15 checksum format** (hy4 §5, ernie §5.1): `CHECKSUMS.txt` is sha256 but `tools/verify-package.mjs` parses md5 → exit 1 / 474 EXTRA; `regen-manifest.mjs` writes 64-hex sha256 while the verifier expects 32-hex md5. After regen, `gate-manifest` passes but `verify-package` fails with 467 EXTRA. **The composite cannot reach "ACCEPTANCE RUN COMPLETE" with green gates.** Z.ai owns the fix (one digest policy, then re-run steps 14–17).
2. **Stat #2 contradiction — RESOLVED by the Owner (§1.13), not by a seat default**: P-208's #2 is "Undefeated seasons (20-0)" (17-0 regular + 3 playoff wins), while the Owner's 1 Nov words define undefeated as the **regular season**, "without defining 20-0". ernie's recorded default was "undefeated regular season" + an 11th "Perfect season (20-0)". The Owner now says *"we would record 17-0 and 20-0"* — **keep both**. His same answer expands scope: *"all the players' top seasons; how often they make the playoffs and reach each round, etc. any other stats in this vein can be added; we should collect all possible data"*. Two sub-questions remain for Claude (`0520` Q-STATS 1–3): whose "players' top seasons" (run players — derivable — vs individual NFL careers, which need a re-pin), and how "collect all possible data" reconciles with the locked prune rule and awards-not-derivable (defect 14). Do not re-ask the Owner to choose between 17-0 and 20-0.
3. **D5 — stale engine stamp** (ernie §5.3): `src/App.svelte:83` is `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the **previous** pin — while the shipped engine is `408410477`. `metaNow()` stamps it into autosaves and manual slots; `Saves.svelte:80` prints "this save came from build 67-cakepanz@d3bd81d2 (running: nfl1.1ac56c28928eff)". Fix before any server compares `engine_version`, or every save arrives flagged foreign.
4. **H2 — pin-watch watches a dead pin** (ernie §5.4): `SNAPSHOT.md:10` records `65673a00` as superseded by `408410477`, while CI's pin-watch still watches `65673a0`. Also `AGENTS.md:44-46,73` and `PROJECT-KNOWLEDGE.md:18` still say `d3bd81d2` — MUSE/Architect to reconcile the four pin values (`65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine, `4ca9a071` stale base copy).
5. **D4 — share notice overpromises** (ernie §5.5): the W14 law asserts the local save is untouched before START; one START later the autosave holds the shared link's draft (probe: seed `7874343` / 43 picks → `935613` / 20). Manual slots A/B/C are the only recovery.
6. **D3 — stale `SHELL-STATUS.md`** (ernie §5.6, hy4 §5): regenerated against an intermediate dist; pinned hash `8c9ef26b…`/389211 B vs shipped `c05faa33…`/390846 B; still says "ring". Step 13d regenerates it; the composite never reached 13d.
7. **F4 — retired selector** (hy4 §5): `scripts/probe-w14.mjs:32` still clicks `.cp-suggest .cp-quick`, removed with the ring.
8. **Cutover docs describe the removed ring** (hy4 §5): S14 counts and ring language survive in docs that gates will read.
9. **13b README says CLOSED but the report says OPEN** (hy4orca §3.2): the single blocking doc defect; several seats confirmed it independently.
10. **Verifier has no converse check** (hy4 §5, hy4orca §1.5): an unlisted extra file currently verifies clean. Add the converse test.
11. **Two seed defects** (hy4orca §3.6): restore does not write the seed back to the URL (`App.svelte:183` sets `seed`, only write is `:120` in `startDraft`); the second draft in a tab replays the same seed because `?seed=` written by `startDraft` is re-read by `parseSeed()`. Also `parseSeedCode` is lenient (`b36:1.5` → 1).
12. **Source-string laws** (porca D4 via hy4orca §2): `<span tabindex="0">` at `BoardRow.svelte:53` triggers Svelte's `a11y_no_noninteractive_tabindex`, and the law at `node.battery.mjs:611` pins that exact source string — a legitimate `<span>`→`<button>` fix breaks the law. Laws that test text, not behaviour, are brittle; reconcile together.
13. **L23 glow law conflicts with v8** (ernie §7.1): today's pulse is only on the top three (`shell.css:181`) and L23 asserts exactly that; v8's "every Draft button pulses, top three skip" turns L23 FAIL and board 19 → 18/1. Either rewrite L23 or retire it by name and move the floor to 18. "Every Draft button" is three selectors (`.cp-quick`, `.cp-chip`, `.cp-chip.cp-primary`) and chips only exist in expanded rows — say which control pulses. The sheen already exists (`BoardRow.svelte:136`, `cp-suggest-shimmer`) — keep, don't add.
14. **Awards and pins are not derivable** from today's payloads (beam's A2 audit, via porca §5.2): MVPs / Pro Bowls / all-pro are not in any payload; a favourites map `saveId→[pid]` is absent. If the locked stats need them, Claude must extend the schema; do not invent them.
15. **Missing payload home** (P-259 F2 via hy4 §4): no place for player stats / awards / unit grades.
16. **Two copies of the rival images** (ernie §6.6): glyph's `_reference/rivals/` (with `MANIFEST.tsv`) is canonical; the duplicate in delivery folders should be deleted, not both kept.
17. **iceman's C4 heading is wrong** (ernie §5.7): it says "Multi-season stat tracking (MANDATORY TO RELEASE)" which contradicts his own Q14 and §1.11. The mandatory item is **cross-run career stats**.

### 8.2 Withdrawn claims — do not repeat them

- **Mine:** accounts/sync/conflicts/migration are future (0410/0415) → WITHDRAWN, §1.7. A CRDT/mutation log for conflicts → WITHDRAWN, P-254 governs. The stored "optional sign-in" rule is superseded → OVERSTATED AND WITHDRAWN. "An account is required to play" → answered no, §1.8. "Stats beyond a single season means franchise continuity" → answered no, §1.11. **My `play.`-subdomain recommendation in `0455` Q13 and the "add site / move nameservers" steps in `0458` are STRUCK** by §2.6–§2.8: there is no domain and it will never be purchased. My `0508` relay marked Q4 "closed → nameservers at Cloudflare → one Worker"; the practical resolution is stronger — **no custom domain at all**, so no nameserver work; see §9.
- **hy4's:** accounts/sync as future (`0414`/`0417`) → withdrawn; "optional sign-in superseded" → withdrawn; deterministic action-log replay → withdrawn; "P-208 needs a third review" → wrong, the live tool uses floor 2 + 10% governor (AGENTS.md's three-confirmation prose is MUSE drift); per-row "relevance band" idea → withdrawn by the Owner's 0020 answers.
- **ernie's:** P-208 open → WITHDRAWN, it is titled "locked: 10 stats"; P-210 open → WITHDRAWN, research + review exist; paid domain recommendation → WITHDRAWN under §2.8; origin warning too broad → corrected: host change destroys local saves for signed-out users **only**, so it is safe only after accounts ship.
- **hy4orca's:** T8 "BLOCKED on bytes not on disk" → SUPERSEDED, the bytes exist (6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`); T8 is READY.
- **Beam's:** earlier S14 review used the wrong tree → rejected unless re-filed.

---

# PART III — THE HOSTING DECISION AS IT STANDS

## 9. Cloudflare: what is decided, what is not

**Decided by the Owner:** Cloudflare, not gh-pages (§2.1); free-only, no domain purchase ever, target free platform hostname (§2.6–§2.9); Claude + council decide the mechanism (§2.5); Owner + Claude deploy (§2.2).

**The Architect's written decision** (`origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md`, commit `169e554`) says: **Cloudflare Pages + explicit Direct Upload** (`wrangler pages deploy dist --project-name <name>`), no Git auto-deploy, no secrets in the repo, a rehearsal first, an explicit Owner "go" before make-live, and a `releases.md` row written before each upload. Its stated reasons for Pages over Workers static assets were: (a) "the product is a static SPA with no server code" and (b) "Workers cannot serve a domain whose nameservers are not on Cloudflare, and the domain is U."

**Both premises are gone.** Server code is mandatory (§1.7–§1.8), and there will be no custom domain at all (§2.8), so the nameserver constraint cannot bite. hy4, porca and ernie independently recommend revising the decision to **Workers Static Assets + a thin Worker**: one Worker serves the built `dist/` and the future auth/sync routes; the free `workers.dev` hostname needs no registrar or DNS; Pages drops out. porca's target: D1 for account/save metadata and pointers, R2 for immutable snapshots and share artifacts, D1 **never** KV for saves (KV is for sessions), explicit `wrangler deploy` gate after "go", no Git auto-deploy.

**The Owner's current word (§1.13, ~05:18Z):** asked to choose the substrate, he answered *"this should be phrased as a recommendation by consensus from the council and as a question to claude"*. He has **not** picked a substrate; he sent it back to Claude with the four seats' recommendations in view. The full question-to-Claude — consensus basis, both void premises, what stays settled — is `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` Q-HOST. This is a delegation, not a deadlock and not a seat decision.

**RATIFIED by the Architect, 05:33Z (`a17c323de`), superseding all earlier "open" wording — this is now the decision, not advice.** Claude ruled on all three questions in `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md`, read in full this sitting:

- **Q-HOST:** **Workers Static Assets + one thin Worker**, D1 **only** at v1 — **no KV, no R2, no Durable Objects**. Pages dropped. Explicit `wrangler deploy` after the Owner's "go", no Git auto-deploy. He accepted the council's reasoning (both Pages premises void) and made two corrections to our text: (1) the hostname is **not** `76pancakes.workers.dev` — Workers addresses are `<worker>.<account-subdomain>.workers.dev`, so the target is **`play.76pancakes.workers.dev`** (account subdomain `76pancakes`, Worker `play`), closest free variant if taken, exact string pinned in `releases.md` at rehearsal; (2) D1 only — Better Auth holds sessions in D1, a row holds up to 2 MB, and R2 is revisited only if a measured envelope nears that. Decision doc, runbook and `releases.md` amended in the same commit. Known limit recorded, not fixed: version skew after rollback. **§9's earlier "not yet ratified" and `0508`/`0513` Q4 hostname text are SUPERSEDED.**
- **Q-STATS:** the user's **own run players** (not NFL careers — that would need ageing/retirement and a re-pin); one ledger row per run, aggregates maximised, **logs stay pruned**; legend weights 100/10/1 confirmed INFERRED for v1. Most requested stats are derivable today; three need small `colors/src/app` payload fields (`playerLines`, `pickOverall`, `seed`/`seeding`), which are pin bytes and wait for **one deliberate re-pin sitting after the Z.ai merge** — seam golden `e8fed8ab…` must still hold. League awards deferred. He corrected beam A2: the engine *does* produce per-player lines and awards (`awards.ts`, `boxscore.ts`), they are merely dropped by the current prune; sparse lines measured 2,291 bytes for 27 players.
- **Q-AUTH:** **Better Auth inside the same Worker**, D1 for users/accounts/sessions; **GitHub at v1**, Google only if a spike passes. **Clerk rejected** — its production guide requires a domain the Owner owns, which "free now and always" rules out. Auth.js is now part of Better Auth, so "Auth.js or Better Auth" is one choice. D1-via-Kysely on Workers and Google on a `workers.dev` origin are UNKNOWN until a rehearsal spike; fallback `@auth/core` with its D1 adapter; GitHub-only if Google fails. Owner provisions the GitHub OAuth App and sets two Worker secrets himself after the hostname is pinned.

Invariants that survive the ratification: no secret in repo, bundle or chat; pinned build hash in `releases.md` before upload; rehearsal before make-live; rollback row, never a rewritten row. Z.ai builds **no** wrangler config and deploys nothing — his hand-over changes only to root-relative asset URLs (`base: '/'`), relative `/api/...` fetches, no `_redirects`/`_headers`, no hard-coded host.

**What the Owner must provision regardless** (hy4 `0457` §2, endorsed by porca): a free Cloudflare account (Free plan, no card), note the **Account ID** (an identifier, not a secret), create a free auth tenant (hy4's default Clerk Hobby — 50 k MAU, no card; code-owned Auth.js/Better Auth is the alternative permitted by §3.5), hand over the publishable key and the secret key **only via a secure channel**, and confirm the Free plans. Do **not** add a site, move nameservers or buy a domain — §2.8 struck those steps. The Architect owns the Worker, D1 schema/migrations, R2 buckets and deploy command.

---

# PART IV — OPEN QUESTIONS BY AUDIENCE

## 10. Who needs to answer what

No assignments. Work comes from `node tools/council.mjs next` on `origin/council/muse`. Answers go in `inbox/` with `FOR: Q<n>` (or the queue ID) and are reviewed by three different seats.

**Owner (only the Owner can close these):**
- Q3 **Hostname** — confirm `76pancakes.workers.dev` as the target; if claimed at creation, accept a short free variant (hy4's RDAP/NXDOMAIN checks cannot reserve it). Default: take the closest free variant; record the exact string in `releases.md`. "free now and always" is already locked; this is a naming detail.
- Q4 **Achievements** — ship the API stub with no invented list? Default yes.
- Q5 **Account deletion** — out of scope for v1, documented honestly? Default yes.
- Q6 **Brag form** — text only (P-209) or also a PNG card? Default text only; a card is post-v1.
- Q7 **Legend weights 100/10/1** — INFERRED; keep for v1? Default keep, labelled.
- **Closed this sitting (§1.13, §9):** former Q1 (stat #2) → **resolved by Owner**, record both 17-0 and 20-0 plus the wider directive; former Q2 (auth provider) and the hosting substrate → **delegated by Owner to Claude, and now RULED by him at `a17c323de` (§9)**. Do not re-ask the Owner any of the three, and do not re-open the Architect's rulings as if they were still open questions. The three questions and their answers are preserved in `0520` (questions) and `0533` (rulings).

**Architect (Claude) — technical decisions, no Owner wait needed:**
- **Answered 05:33Z** (`0533`, §9) — hosting, stat scope and IdP are RULED; no action pending. Carry the consequences: `account-sync-contract-2026-11-21.md` (tables, routes, revision/deviceId, write budget, Q8–Q12) before plan before build; fix D5/H2 before any server compares `engine_version`; one stats-fields re-pin sitting after the Z.ai merge with seam golden `e8fed8ab…` unchanged; the rehearsal spike for Better Auth/Kysely-D1 and Google-on-workers.dev.
- Ratify or amend the Cloudflare decision (§9); design the account/session schema and how the envelope attaches to an account; decide migration idempotency and undo.
- P-254 mechanics: `deviceId`, revision, rung-back depth, keep-both UI; LWW tie-break (hy4orca's earlier three-way-merge idea is withdrawn — P-254 already decides it).
- Q8 **Stat authority** — server recomputes from accepted envelopes, client cache updated atomically? Default yes.
- Q9 **Session lifetime** — long-lived refresh, offline play always works, re-auth only on successful reconnect? Default yes.
- Q10 **Preferences scope** — device-local vs account-scoped.
- Q11 **`engineVersion` replay policy** (P-217 shows OPEN/auto-retire) — refuse replay of older envelopes with an honest message, keep the bytes? Default yes. **Do not let P-217 auto-retire unanswered** — the plan needs it.
- Q12 **Abuse caps** — cap envelope size at the measured 3-slot budget, rate-limit sync; add API schema version, D1 migration version, save schema version and auth-provider fingerprint to receipts.
- Fix D5 and H2 first (§8.1): every `engineVersion` question depends on the stamp being true. The `dispatchAsync` contract and seam exports are already published and slices 1–5 are BUILT — Z.ai's work is close-out and hand-over (`0537`), not new slices. Keep the pin frozen.
- Record Playwright honestly: "not verified in the Architect's sandbox; verified by seats at 1.57.0 / chromium-1255" rather than "no browser run is verified" (his 1.65.1 pin cannot run there).

**Z.ai:** slices 1–5 are **BUILT** (my `0110` §0 and `0301` byte review — do **not** rebuild them). Close-out only: fix the D1 digest-format defect (one policy in `regen-manifest.mjs`/CHECKSUMS and `verify-package.mjs`), falsify F27–F30 with named DIED-by-name child logs, uninterrupted final composite at final bytes, docs/gate regen from receipts, `verify-package.mjs` clean, the filed side-by-side (must include a panel-bearing season screen — `.cp-panel` renders only there), fix the stale `ENGINE_PIN` in `App.svelte:83` and the one-click toast risk, then the Cloudflare-ready static `dist/` hand-over with root-relative assets and relative `/api/...` calls. Retire w89 at make-live. Do not implement the account system, worker config, D1 schema or deploy — those are the Architect's; do not edit engine bytes or the pin. A full self-contained order is in `inbox/20261121-0537-pickle-TO-ZAI-final-full-order-S15-closeout-and-handover.md` (this sitting).

**MUSE:** file every 21 Nov Owner ruling verbatim in `_agents/owner-notes/` (§1–§2), sort into the queue, add `PRIORITY+` rows, add one **supersession** line (not a rewrite) to the 1 Nov brief and `PROJECT-KNOWLEDGE.md`, re-rank P-208/P-209 and cite P-210 as done, re-point the pin-watch, reconcile the four pin values and the tool-floor/prose drift, and retire duplicate rival images. **VERIFIED gap:** the three 1 Nov storage notes are on HEAD and `architect/engine-and-seats` but ABSENT on `origin/council/muse` (`git cat-file -e` check this sitting).

**Every seat:** review existing plans instead of redesigning them; label claims; falsify every new law (it must be able to die); no seat writes `Football-Sim-*.html`, `colors/**`, another seat's lane or any verbatim note; no force-push, no stash, no images in lanes; end the chat with `node tools/preserve.mjs check`, commit, push your own `council/<seat>` and verify with `git ls-remote`.

## 11. The fence — restated

- **Do not build the account system before the contract exists.** Contract → plan → build, as the storage wave did.
- **Do not touch:** `Football-Sim-*.html`, `colors/src/**`, the engine, the pin, protected constants, `AGENTS.md` / `CLAUDE.md` / `biome.json` / `tools/`, `QUEUE.md`, `CHRONICLE.md`, another seat's lane or inbox, any verbatim Owner note.
- **No field-level save merge. No CRDT. No mutation log.** P-254 governs.
- **No downloads, no export/import, no hidden full save.** The brag is text plus a bare URL.
- **Free-only**, no paid tier, no secret in repo/bundle/chat; **no domain purchase, ever**.
- **The game stays fully playable offline with no account.** Sign-in is additive, never a gate.
- **Release gates:** six capabilities with passing receipts; two-device/offline-conflict/migration/share/auth-boundary/read-only-link test matrix; user A cannot read or write user B's saves; rehearsed rollback; a Verifier who wrote none of it signs off.
- A gate PASS is not product acceptance; an implemented change is not an accepted one (AGENTS.md §3/§5).

## 12. Source index

**My filings:** `inbox/20261121-0324-pickle-OWNER-RULINGS-rival-pfdynasty-longterm-visual.md` · `...0358-...screenshots-01-02...` · `...0410-pickle-COUNSEL-cloudflare-portfolio-reassessment.md` · `...0415-pickle-FINAL-cloudflare-counsel-accounts-sync.md` · `...0420-pickle-RELEASE-SCOPE-RULING-accounts-mandatory.md` · `...0430-pickle-RETRIEVAL-existing-account-and-stats-plan.md` · `...0447-pickle-PROMPT-to-council-signin-optional-but-ship-complete.md` · `...0455-pickle-FINAL-PLAN-remaining-mandatory-features.md` (Q1–Q17) · `...0458-pickle-CLOUDFLARE-setup-direction.md` (partly struck) · `...0508-pickle-MASTER-RELAY-all-owner-words-and-decisions.md` (superseded by this file) · `...0513-pickle-CANONICAL-REFERENCE-...` (this file) · `...0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` (live addendum: §1.13 answers + three questions to Claude) · `...0537-pickle-TO-ZAI-final-full-order-S15-closeout-and-handover.md` (self-contained Z.ai order).

**Seat relays reviewed:** `origin/council/hy4:inbox/20261121-0507-hy4-MASTER-HANDOFF-everything-to-know.md` (+ its `0040`, `0457`, `0500`, `0502`, `0505`, `2230` filings) · `origin/council/ernie:inbox/20261121-0525-ernie-P-317-FULL-BRIEFING-everything-to-know.md` · `origin/council/iceman:inbox/20261121-0500-iceman-plan-remaining-features-questions-for-council-claude-zai.md` · `origin/council/porca:inbox/20261121-0508-porca-FULL-HANDOFF-accounts-sync-stats-brag.md` (+ `0459`) · `origin/council/hy4orca:inbox/20261120-1622-hy4orca-seat-reviews-roundup.md` and `...1623-...cutover-lane-answer.md` · `origin/council/beam:inbox/20261121-0458-beam-answer-stats-beyond-single-season.md`.

**Architect:** `origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md` · `claude/releases.md` · `claude/cutover-runbook-2026-11-20.md` · `claude/visual-acceptance-spec-2026-11-21.md` · `claude/zai-work-order-v8-2026-11-21.md` · `colors/test/nfl/layers.test.ts` (commit `169e554`).

**Owner notes / locked artifacts:** the file paths in §3 · `origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md` · `...0755-muse-P-209-brag-spec.md` · `...0855-muse-P-207-gap-proposals.md` · `origin/architect/engine-and-seats:inbox/20261101-2000-architect-storage-assessment.md` · `...2100-architect-to-zai-storage-contract.md`.

## 13. One-line version

> **Ship before deploy — optional for the player, mandatory to build — on the frozen engine pin `408410477`, free-only and offline-first, with no domain ever (target `play.76pancakes.workers.dev`, corrected by Claude 05:33Z): cross-run career stats (P-208's ten — the Owner resolved stat #2 on 21 Nov: record BOTH 17-0 and 20-0 — scoped by Claude to the user's own run players, aggregates maximised, logs pruned, with three payload fields awaiting one re-pin sitting after the Z.ai merge), maintained OIDC sign-in (Better Auth in the Worker, GitHub v1), whole-envelope per-slot LWW with rung-back and keep-both (P-254), idempotent local-save migration, and a text-plus-bare-URL brag share. Host = one Worker with Static Assets, D1 only, explicit `wrangler deploy` after the Owner's "go". The ring is removed; 01/02-with-badges is the visual goal; Z.ai owns the shell and S15 close-out, Claude owns the engine, the merge and the three rulings in `0533`, MUSE owns the record, and a Verifier who wrote none of it signs off.**

— pickle (council seat; advisor). This is a record, not a ruling. Owner words govern; the Architect decides technical matters; nothing here authorises a seat to implement anything.

## 14. Filed corrections to my own earlier work

- `0508` master relay: **superseded by this file** — it lacked the domain rulings (§2.6–§2.8), the stat #2 contradiction, D5/H2/D1 and the cutover-lane facts, and its Q13 recommendation was wrong.
- `0455` plan Q13: the `play.` subdomain recommendation is **struck**; Q13 now resolves to a free `workers.dev` hostname.
- `0458` Cloudflare setup direction: the "add site / move nameservers / check MX" steps are **struck** (no domain). The free Cloudflare account, Account ID handover, Clerk Hobby tenant, secure secret handling and "no secrets in the repo" guidance stand.
- `0520` three questions to Claude: **live addendum to this file** — records the Owner's §1.13 answers and puts hosting substrate, expanded stat scope and IdP to him with full council context. It decides nothing; the Architect rules.
- `0513` §9 and §10 said the hosting substrate was "not yet ratified" and carried `76pancakes.workers.dev`: **superseded by Claude's `a17c323de` / `0533`** (Workers + one thin Worker, D1 only, `play.76pancakes.workers.dev`, Better Auth). Corrected in place this sitting so the permanent reference stays authoritative.
