# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 24 · 2026-11-04 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 23 carried wave 67; REV 24 carries wave 68 — the full-name floor, THE DASH/DOT LAW, the golden celebration, the Super Bowl-page path, the continue gate, the victory page.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one.**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — the shimmer is the W45 SWEEP — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the gold franchise pill is the CONTINUE color — NICKEL and DIME share one map row — **w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the quarter clock rides var(--text); the look-gate releases on ONE clock (.zpb-seen); the awards lead "#X Y"; the matchup bars never ride var(--border); "/ g" reads "PER GAME"; the Super Bowl is PLAYED; the bracket @ obeys the card width; the unit report card singles nobody out** — **w53/WM (standing): the touch polish, the 38px tap floors on phones, the rankings containment (compress-first)** — **w55 (standing): THE PHONE LAWS — the wrap never shrink-to-fits its widest child; the box score is ONE table on the phone (data-nostack); the tab is remembered (zpb:tab); the honors carry the FIRST beats of the season-in-badges rail; the Dime is CHANGEABLE in the lineup editor** — **w56 (standing): THE LABEL LAWS — the phone draft card's mini labels are BACK; the card reads in THREE lines; the one-ink law (txM light / txd dark)** — **w57 (standing): THE PLAYER CARDS READ CLEAN TO THEIR LEFT EDGE · THE KEY PLAYERS FACE OFF TWO ACROSS AT EVERY WIDTH · NAMES NEVER BREAK LETTER-BY-LETTER · THE BOX SCORE'S OT CELL COMES FROM otOf ALONE · THE RUN CINE FLOWS INTO THE STORM · Cinzel Decorative; explanations live in the Guide** — **w60 (standing): the pregame star pairs are FACE-OFF ROWS IN FLOW (the % lanes retired; the stars container clips, the stage never covers the static screen)** — **w66 (standing): THE ROUND-2 LAWS — the mid-window board law (761–1120px reads the w57 two-line card; the rail stacks below 861px) · EVERY Draft button pulses; the top-3 wear the filled team-gradient sheen · the field map + flex chips ride the TEAM theme at 0.5 ink · RETURN TO AUTO LINEUP stays hidden until touched · the fills cell reads ONE label inside the custom zpb-slotdd/zpb-slotpop dropdown · the roster summary is TWO team-tinted Cinzel badges · THE CARDS ARE THE MASTER CLOCK (the map/depth follow the card timeline) · the comparison dropdowns enhance into the custom family · SIM GAME · SIM SEASON · BACK TO SEASON live on the top panel's UPPER LINE · ONE SIM PLAYOFFS door that RUNS SILENTLY and ends at the SHARED zpbPlayoffEndScreen · the COTY "YOU" shimmers gold · player PROFILE NAMES persist (zpbProfStore) · RUN IT BACK with the mechanism-naming caution** — **w67 (standing): THE EQUAL-SIZE LAWS — the two homepage dropdown bubbles are ONE fixed box (#draftSetup --zpbSelW 260×46, the measured w27 fit full→city→abbr via .zpb-fit-t/.zpb-fit-t2, never clipped, never two lines) · #playerTable is data-nostack (the browser keeps the smaller narrower table at every width) and the phone-stacker counts columns COLSPAN-AWARE (a colspan=N sentinel row reads as N — the measure/toggle flash loop is dead) · ONE reveal clock: the cards, the map and the depth ride the SEASON-IN-BADGES PACE (0.6s per beat, .55s entrances) — the pace the Owner chose over 0.8s · the pregame star cards read the NEUTRAL halfway ink on their always-dark stage (--tnd; the 90+ shimmer sweeps tnd→cream, never the light-tuned --zrb) and the kp-title/kp-shm/matchup-bars swap to --zrbd in dark (all 32 teams measured, light and dark) · the pregame stage ENDS AT THE FOOTER (the mount clamps the intro's bottom inset to the footer's height; the ≤740/≤660 tiers compress the static block so no row clips) · the upper line is ONE left-aligned cluster (NEW DRAFT · 100 SEASONS · SIM GAME · SIM SEASON · BACK TO SEASON; the 20-0 line far right; the 100-SEASONS door wears the SIM GAME size — patch the LIVE add100Button reassignment, not the w65 wrapper) · SIM PLAYOFFS rides BELOW the big-button law — BEGIN PLAYOFFS is the big pill** — **w68 (standing): THE FULL-NAME + DASH/DOT LAWS — the name ladder measures the TRUE available line for flex children (parent − siblings − gaps; a carrier NEVER measures its own shrunken box — the CL lock is dead, the scan is stateless and self-healing) and at window ≥ 1025px the FULL name is the floor (vertical allowed; last names/initials only below 1025px — the w60 narrow law stands) · THE DASH/DOT LAW: W-L-T records and single-game scores read DASHES ("10-6-1", "31-17", "tied 14-10 at the half"), any other data keeps the middle dot; the w50 blanket digit-dash-digit convert is RETIRED (it ate the shared digit: 10-6-1 printed 10·6-1) — the badges, the tiles, the replay story, the season-in-words, the retrospectives and the SB/round-card separators all read dashes at source · the season-awards summary paragraph is GONE (the counts sentence + its honor lines — the award cards speak) · THE GOLDEN CELEBRATION: every award card / All-Pro / Pro Bowl / All-Playoff chip whose winner is the user's wears zpb-mygold (the golden border + the outer glow, both) and the name shimmers for ANY award; the shonor rail cards glow · the run-ends screen is RETIRED (zpbPlayoffElimCine + .zpb-pofin left the file) — zpbPlayoffEndScreen ALWAYS mounts the Super Bowl page · THE CONTINUE GATE: every sim-playoffs round card waits for its gold Continue (the 3400ms auto-advance retired); the last Continue flows into the SB page (mount first, fade second) · THE VICTORY PAGE (zpbSuperBowlVictoryCine): when the champion is the USER's team the SB page's Continue mounts it BEFORE the storm fades (opaque from the first frame) — twin god-ray wheels masked around the crest, team-gold confetti, embers, the breathing glow, the crest through three burst rings, the huge shimmering wordmark, the dash-law score, the MVP line, the gold Continue on the 0.6s cadence; its Continue plays the SUPER BOWL CHAMPIONS reward and releases; a LOST Super Bowl releases directly with no victory page**

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin gh-pages council/zai main
    git show origin/gh-pages:z-post-blue-wave68-2026-11-04-w68/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

**Fallback chain** (stop at the first that works):
1. **origin/gh-pages** — the Owner's pushes land here; the newest wave package folder (`z-post-blue-wave<N>-…`) carries this doc, ZAI.md, END-OF-CHAT, the intake ledger, the build report, the tools and the shots. **gh-pages has carried the newest product bytes since w56 — check it FIRST, council/zai lags (it still topped at w55 at the start of the w67 chat).**
2. `origin/council/zai:_agents/zai/…` (the seat lane, updated by import-zip/seat-save — may LAG)
3. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
4. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (notes/W6x-INTAKE-LEDGER.md in the last wave package) — the Owner's words, item by item
3. The latest UPDATE-README + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: `git show origin/council/base:AGENTS.md` (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-04 (chat ended ~) · sandbox session (web chat, w68)
WAVE        : wave 68 SHIPPED — the Owner's seven UI items (full names at full size, THE
              DASH/DOT LAW, the season-awards summary retired, the golden celebration for
              the user's award winners, the run-ends screen replaced by the Super Bowl
              page, the per-round continue gate, the new user-wins-the-Super-Bowl page)
PRODUCT     : Football-Sim-Z-post-blue-w68.html · md5 22bc00ab8cc244da7ba8030a5a67c8da ·
              1,796,935 bytes (w67 1,786,217 → +10,718 via the EIGHT-step asserted chain
              zpb_w68.py → zpb_w68f.py + the repair zpb_w68b3.py + the polish zpb_w68b4.py;
              each step asserts the previous md5, exact anchors, post-checks; the w67
              baseline byte is pinned md5 ecf2b295b97739b88e7f60068b588b84)
LAWS ADDED  : THE FULL-NAME + DASH/DOT LAWS (see §0's w68 clause) — the ladder's true-line
              avail (the CL lock dead) + the >=1025px full-name floor · the dash/dot law
              (records + game scores dash, everything else dot; the w50 convert retired —
              it ate the shared digit) · the awards summary paragraph retired · the
              zpb-mygold celebration · zpbPlayoffEndScreen always the SB page (the elim
              cine + .zpb-pofin left the file) · the per-round Continue gate (the 3400ms
              auto-advance retired) · the victory page with its own SB-Continue handoff
BATTERIES   : all green on the shipped bytes — nodecheck 24 blocks SYNTAX OK · w68_owner
              44/0 (three full runs) · w68_names 14/0 · w67_owner 40/0 (standing,
              re-pointed; path-dependent legs 39-41) · w67_teams 8/0 (standing, re-pointed)
              · zero page errors on every leg
LANE        : local work/w68 in the sandbox; nothing committed (no git credentials)
QUEUE       : EMPTY — all seven items shipped whole
LEDGER TAIL : notes/W68-INTAKE-LEDGER.md — all seven items verbatim. Flagged readings the
              Owner may overrule: "full size" = window >= 1025px (the no-side-scroll
              breakpoint; below it the w60 narrow rungs stay lawful) · the turnover-battle
              count, the projected ratings pairs and the 100-seasons ranges KEEP the dot
              (they are "other data" — say the word and any of them joins the dash law) ·
              the victory page mounts AFTER the SB page's Continue (the SB page stays the
              recurring page; the victory page is the second act when the champion is the
              user's team) · the golden celebration covers the awards panel, the
              All-Pro/Pro Bowl/All-Playoff chips and the honor rail (not the roster table)
LAST ZIP    : z-post-blue-wave68-2026-11-04-w68.zip
NEXT ACTION : whatever the Owner sends next · WATCH: w66/w67/w68 live on gh-pages — check
              it FIRST (council/zai lagged at w55) · the batteries caught THREE real
              defects this wave (the live tile renderer's dot, a swallowed style-block
              closer, the too-loud ray wash) — trust the probes over green checks · the
              ladder's avail() must measure the true line for ANY new flex-carrier (never
              the element's own width) · renderRegularAwardsHTML has TWO definitions —
              the later assignment wins; patch the LIVE one (and keep the shadowed copy
              in sync)
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 23 → REV 24:
              §3 rewritten; §0 carries the w68 standing clause; §1's pointer to w68)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (**gh-pages has carried the newest bytes since w56**). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 67 = `ecf2b295…` (1,786,217 B) · wave 68 = `22bc00ab…` (1,796,935 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts in `tools/`, the `zpb_w68.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file).
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess: the w68 tile dot, the swallowed style closer and the loud ray wash were all invisible until the batteries caught them.**
4. Style guide ten commandments + the do-not-regress ledger + §0's standing laws. Integers only. No white text.
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** (see END-OF-CHAT-ZAI.md) — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only `_agents/zai/**` and `inbox/` (council convention).

## §6 · Idle protocol (Owner said "continue" with no new file, or you finished early)

1. Read `PRIORITIES.md` (§1.4) → take the **top OPEN item in your domain** (product build/design/verify).
2. One-line claim in chat (`CLAIM: <ID> · <scope>`), then build it through the full §5 pipeline.
3. If nothing in your domain is OPEN: run one standing chore — reconcile your intake ledger against `PRIORITIES.md` for drift, or re-run the verify suites against the current deliverable and pin fresh evidence.
4. Never sit waiting; never ask "what next?" without first showing §1's orientation output.

## §7 · First reply template (4 lines, then work)

```
READ : ZAI.md (council/zai) · this doc §3 · <anything else actually read>
STATE: wave <N> · md5 <first8>… · queue <state> · last zip <name>
PLAN : <what you will do this chat, one line>
```

— Z.ai · read → verify → build → verify → zip → link. Nothing else.
