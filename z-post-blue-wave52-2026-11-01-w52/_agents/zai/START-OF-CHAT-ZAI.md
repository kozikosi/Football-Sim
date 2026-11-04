# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 13 · 2026-11-01 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 12 lives in the w51 package; §3 carries the wave-52 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives.
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — **w41: every 90+ shimmers** — **w43: the shimmer is the CONSTANT deep gold on every surface** — **w48: the shimmer is the W45 SWEEP (`zpbshmsweep`, deep gold breathing to --gold2)** — **w49: the comparison lu-cell/pcard sweep breathes PALE to MID gold (`--gold2`↔`--goldm`); the ANCHOR name shimmers inside the chip** — **w50 (standing): the ANCHOR PANEL FOLLOWS THE TEAM (`zpbAnchorVars`), the rose gold is the FALLBACK frame; NO BLACK TEXT ANYWHERE — the site light ink is the halfway rose #8e5566** — **w51 (standing): the DRAFT button's ink is the halfway rose on default (--text) and the team's 0.50 ink under the takeover (--tTxM/--tTxMd); the gold franchise pill is the CONTINUE color on EVERY Continue button; NICKEL and DIME share one map row (both l=339); the TO/INT/FF boxes wear the BENEFICIARY'S color** — **w52 (standing): THE DOT LAW — every DISPLAYED colon and semicolon renders as the middle dot (`·`, the runtime sweep)** — **w52 (standing): THE QUARTER CLOCK RIDES var(--text) — the same neutral team ink the word FINAL wears at the top of the during-game scene; the w50/w51 CREAM LAW IS RETIRED (--zcream keeps no !important, its token survives unused)** — **w52 (standing): THE LOOK-GATE RELEASES ON ONE CLOCK — the map's look releases EVERY breakdown group and depth zone in scope (select by .zpb-seen class state, NEVER by :not([data-zseen]) — data-zseen means OBSERVED, not SEEN); the mirror law: cards first → the map follows; the skip release includes the depth zones** — **w52 (standing): THE AWARDS — the position is the FIRST badge as "#X Y" (rank at the position by rating), the plaintext position under the name is GONE, chip borders are SOLID ONLY, every statistical champion carries his badges with the stat he won leading, "Scrimmage" is gone from the TD title, COTY reads "YOU" for the user's team, and the MVP/OPOY/DPOY sentences are retired in favor of badges** — **w52 (standing): THE MATCHUP-MATH BARS — the track is the quiet ink wash (never var(--border): the takeover repaints it as the franchise hairline); the home fill anchors to its outer edge (margin-left:auto)** — **w52 (standing): THE ADVANCED STATS — every "/ g" reads "PER GAME" and every number wears ONE ink (the good/bad state lives on the card border)** — **w52 (standing): THE SUPER BOWL IS PLAYED — when the user's team is in it, the during-game cinematic OPENS first (__zpbSBReplayHold) and the winner storm mounts only at the whistle (the replay's close releases it); the SB pregame wears the cup, the LIVE banner, three bursts, fourteen embers, and the game earns the HALFTIME SHOW card at the 3rd-quarter mark** — **w52 (standing): THE BRACKET @ — un-played tree cards read their own width: compressed → the @ on its OWN line, roomy (≥190px) → @ and both teams on ONE line (per-card container queries)** — **w52 (standing): THE UNIT REPORT CARD IS UNIT ANALYSIS — the backs read as ALL backs, the corps as the whole corps, the kicker's numbers carry no name; no player is singled out**; Cinzel Decorative; the ink pair --txM light / --txd dark is the site's neutral team text ink; the during-game replay's `color:inherit` law is beaten only by two-class score rules — never re-widen them; **the theme default follows the computer (prefers-color-scheme) and a device with no signal boots dark**; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave52-2026-11-01-w52/_agents/zai/ZAI.md | head -60
    git show origin/council/zai:z-post-blue-wave52-2026-11-01-w52/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

Fallback chain: (1) origin/council/zai:_agents/zai/… (2) the newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations) (3) the Owner's latest z-post-blue-*-update-<date>.zip (4) none reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. _agents/zai/ZAI.md (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (_agents/zai/notes/W5x-INTAKE-LEDGER.md) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: git show origin/council/base:AGENTS.md and _agents/START-OF-CHAT.md (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-01 (chat ended ~) · sandbox session 24
WAVE        : wave 52 SHIPPED (the Owner's round-52: the LOOK-GATE SYNC — the map's look
              releases every card group and depth zone on ONE clock, the data-zseen filter that
              matched nothing is dead, the mirror law holds, the skip release covers the zones;
              the quarter clock rides var(--text) — the cream retires; COTY reads YOU and the
              ratings sentence is gone; the awards lead with the #X Y position badge and no
              plaintext position; solid chip borders only; the champions carry their badges with
              the winning stat leading and "Scrimmage" is gone from the TD title; the matchup-math
              track never rides the takeover and the fills face off — all 32 teams, both themes;
              every "/ g" reads "PER GAME" with one ink for every advanced number; the bye week's
              top game is the most likely opponent; the featured-game sentence is gone; the SUPER
              BOWL IS PLAYED first with the storm waiting for the whistle — plus the cup, the LIVE
              banner, three bursts, fourteen embers and a HALFTIME SHOW; the bracket @ obeys the
              card width; the unit report card singles out nobody)
PRODUCT     : Football-Sim-Z-post-blue-w52.html · md5 40613b81de26b5ed9c67bdcc0637ac6f ·
              1,585,036 bytes (base: the w51 bytes e40732a2… · the Owner's zip is truth)
LANE        : local zai/lane @ wave-52 (the zip carries the lane; nothing pushed — sandbox cannot)
QUEUE       : EMPTY — the round-52 directive shipped whole (M1..M14 in notes/W52-INTAKE-LEDGER.md)
LEDGER TAIL : notes/W52-INTAKE-LEDGER.md §veto — (1) the w50/w51 cream law is retired by his own
              round-52 words — the clock rides var(--text), never re-widen the cream, (2) the w33
              (R34) "the SB does not open the during-game cinematic" is retired the same way —
              the game leads when he is in it, (3) the w51 battery's R1a assert is rewritten to
              the new clock law, (4) the look-gate's data-zseen filter is retired — releases
              select by .zpb-seen state only
LAST ZIP    : z-post-blue-wave52-2026-11-01-w52.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : START/END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 12 → REV 13: §0 carries
              the w52 amendments)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) ZAI.md "Current work" on council/zai, (c) the newest wave package's CHECKSUMS.txt. If a copy's md5 ≠ §3's and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: w52 = 40613b81… (1,585,036 B) · w51 = e40732a2… (1,571,506 B) · w50 = babc5dc1… (1,559,883 B) · w49 = 6bf627b0… (1,548,598 B) · w48 = d8b64fd7… (1,546,441 B) · w47 = eef6b938… (1,548,267 B).

## §5 · The w52 mechanics (what the next session must not re-derive)

- The M1 sync lives in the w42 look-gate observer (`<script id="zpb-w42">`): on a map look, `_zpbSyncSweep` walks to the nearest ancestor holding `.zpb-dbk-g` OR `.zpb-dz` (body is the final scope) and releases EVERY group/zone whose class list lacks `zpb-seen`, stamping the MAP'S OWN `--dfc-cine` value; a 900ms failsafe re-sweep reuses the same value. The mirror branch does the same for `.zpb-fm` when a group/zone is seen first. `zpbReleaseLookGate` (the skip path) includes `.zpb-dz.zpb-seen`.
- The clock law: `.zrl-t{color:var(--text,var(--sub))}` + the w50 block's `.zpb-replay .zrl-t{color:var(--text)}` (NO !important — the replay's inherit chain agrees). Under the takeover --text reads --tTx/--tTxd. --zcream exists but nothing uses it; never restore it.
- The SB flow: `simulatePlayoffRound('superbowl')` sets `__zpbSBReplayHold` before opening the replay (and frees it immediately if no overlay mounted); the replay's `close()` releases the hold and fires `zpbPostSuperBowlCine()` if `__zpbSBFinPending`; the complete-view hook also holds while the flag is live. The SB intro extras ride `isSB`: `.zpb-intro-cup`, `.zpb-intro-banner`, three `.zpb-intro-fx`, fourteen embers, two grand flashes at INTRO_MS−1500/−900. The halftime card mounts inside `showCard` when `isSB && qq===3` (the seq beat stretches to 4300ms).
- The champions' chips: `zpbStatChipsHTML(rec, winKey)` — the `_lead` map puts the winning chip first (labels: PASSY/RUSHY/RECY/zpb-splain/TD/SK/INT/TKL/RETY/FG); the RETY chip appends whenever `st.retYds` exists. `posRankOf(c)` ranks within `honorCandidates` by `_rating` per pos.
- The bar fix: `.zpb-mbar{background:color-mix(in srgb, var(--text) 13%, var(--panel2))}` + `.zpb-mc-h .zpb-mbar i{margin-left:auto}` — note getComputedStyle resolves the auto margin to a px value in headless probes; assert geometry (fill offset > 4px on a partial bar), not the literal 'auto'.
- The bracket @: `.zpb-tree .bracket-game{container-type:inline-size}` + `@container (min-width:190px)` flips `.zpb-tatline` between block (stacked, the @ centered on its own line) and flex (one line). Assert with `(card.offsetWidth >= 190) === (display === 'flex')`.
- Battery map: `w52_syncbattery.js` (the M1 law) · `w52_live.js` (M2..M14 — drives a rigged season: playGame is wrapped BEFORE simRestOfSeason so the user runs the table; ONE install only — a second wrap recurses) · `w51reg_live.js` (the standing laws; R1a is the w52 clock law now) · `w52_evidence.js` (32 teams × 2 themes) · `w52_mobile.js` (390px — click tabDraftBtn before scrolling to the review map, or the view stays hidden and the observer never fires) · `w52_nodecheck.js`.

## §6 · Idle protocol

On "continue" with no new directive: run the standing chores (`w52_syncbattery.js`, `w52_live.js`, `w51reg_live.js`, `w52_nodecheck.js`, the mobile check), re-verify the anchors in §4, and report "nothing assigned — standing by" in one line. Do NOT start unsolicited waves.
