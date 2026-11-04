# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 25 · 2026-11-05 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 24 carried wave 68; REV 25 carries wave 69 — the on-gold shine, the effective-paint map ink, the true-ovr tier, the house select padding, the pick-list family, the award crests.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one.**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — the shimmer is the W45 SWEEP — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the gold franchise pill is the CONTINUE color — NICKEL and DIME share one map row — **w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the quarter clock rides var(--text); the look-gate releases on ONE clock (.zpb-seen); the awards lead "#X Y"; the matchup bars never ride var(--border); "/ g" reads "PER GAME"; the Super Bowl is PLAYED; the bracket @ obeys the card width; the unit report card singles nobody out** — **w53/WM (standing): the touch polish, the 38px tap floors on phones, the rankings containment (compress-first)** — **w55 (standing): THE PHONE LAWS — the wrap never shrink-to-fits its widest child; the box score is ONE table on the phone (data-nostack); the tab is remembered (zpb:tab); the honors carry the FIRST beats of the season-in-badges rail; the Dime is CHANGEABLE in the lineup editor** — **w56 (standing): THE LABEL LAWS — the phone draft card's mini labels are BACK; the card reads in THREE lines; the one-ink law (txM light / txd dark)** — **w57 (standing): THE PLAYER CARDS READ CLEAN TO THEIR LEFT EDGE · THE KEY PLAYERS FACE OFF TWO ACROSS AT EVERY WIDTH · NAMES NEVER BREAK LETTER-BY-LETTER · THE BOX SCORE'S OT CELL COMES FROM otOf ALONE · THE RUN CINE FLOWS INTO THE STORM · Cinzel Decorative; explanations live in the Guide** — **w60 (standing): the pregame star pairs are FACE-OFF ROWS IN FLOW (the stars container clips, the stage never covers the static screen)** — **w66 (standing): THE ROUND-2 LAWS — the mid-window board law · EVERY Draft button pulses; the top-3 wear the filled team-gradient sheen · the field map + flex chips ride the TEAM theme at 0.5 ink · RETURN TO AUTO LINEUP stays hidden until touched · the fills cell reads ONE label inside the custom zpb-slotdd/zpb-slotpop dropdown · the roster summary is TWO team-tinted Cinzel badges · THE CARDS ARE THE MASTER CLOCK · the comparison dropdowns enhance into the custom family · SIM GAME · SIM SEASON · BACK TO SEASON live on the top panel's UPPER LINE · ONE SIM PLAYOFFS door that RUNS SILENTLY and ends at the SHARED zpbPlayoffEndScreen · the COTY "YOU" shimmers gold · player PROFILE NAMES persist (zpbProfStore) · RUN IT BACK with the mechanism-naming caution** — **w67 (standing): THE EQUAL-SIZE LAWS — the two homepage dropdown bubbles are ONE fixed box (--zpbSelW 260×46) · #playerTable is data-nostack and the phone-stacker counts columns COLSPAN-AWARE · ONE reveal clock (the SEASON-IN-BADGES PACE, 0.6s per beat) · the pregame star cards read the NEUTRAL halfway ink on their always-dark stage and the kp-title/kp-shm/matchup-bars swap to --zrbd in dark (all 32 teams measured, light and dark) · the pregame stage ENDS AT THE FOOTER · the upper line is ONE left-aligned cluster (the 20-0 line far right) · SIM PLAYOFFS rides BELOW the big-button law** — **w68 (standing): THE FULL-NAME + DASH/DOT LAWS — the name ladder measures the TRUE available line for flex children and at window ≥ 1025px the FULL name is the floor (last names/initials only below 1025px) · THE DASH/DOT LAW: W-L-T records and single-game scores read DASHES, any other data keeps the middle dot (the w50 blanket convert is RETIRED) · the season-awards summary paragraph is GONE · THE GOLDEN CELEBRATION: every user award card / All-Pro / Pro Bowl / All-Playoff chip whose winner is the user's wears zpb-mygold and the name shimmers for ANY award; the honor rail cards glow · the run-ends screen is RETIRED — zpbPlayoffEndScreen ALWAYS mounts the Super Bowl page · THE CONTINUE GATE: every sim-playoffs round card waits for its gold Continue · THE VICTORY PAGE (zpbSuperBowlVictoryCine) mounts before the storm fades when the champion is the user's team** — **w69 (standing): THE READABILITY LAWS — the ctabig shine sweeps the ON-GOLD ink family (--tOn through an 82/18 glint of --tOn2, the pack's other on-gradient candidate; never the gold ramp the button is painted with) · the field map's ink is solved against the EFFECTIVE paint (the bubble tint at its real alpha — 18% off / 16% def — over the glass panel over the page, both themes; the offense tint follows the takeover's --g2) and 32 teams × 2 modes are measured FROM THE PIXELS · the review page's card names ride the TRUE-OVR tier law (window.zpbTrueOvr — the book rows carry the flex-penalized ovr; the award cards' names join the ladder, the AP1-gold overlay retires from the cards, the chips keep their laws, the coach's YOU keeps the w66 shimmer, the POTG keeps the w19 shimmer) · the bare base select carries the house 12px left padding (the preseason trio aligned) · the lineup editor's pick lists read Cinzel in the team's 0.50 ink with the tier law on the rows and the compare-family hover (the wash + the 3px glide) · the award lines carry the CREST before the name (the All-Pro/Pro-Bowl/All-Playoff chips, the COTY line, the round cards' crest+dash+crest; the written name is the no-crest fallback; the SB-MVP separator reads the dash)**

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin gh-pages council/zai main
    git show origin/gh-pages:z-post-blue-wave69-2026-11-05-w69/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

**Fallback chain** (stop at the first that works):
1. **origin/gh-pages** — the Owner's pushes land here; the newest wave package folder (`z-post-blue-wave<N>-…`) carries this doc, ZAI.md, END-OF-CHAT, the intake ledger, the build report, the tools and the shots. **gh-pages has carried the newest product bytes since w56 — check it FIRST (council/zai lagged at w55).**
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
DATE/TIME   : 2026-11-05 (chat ended ~) · sandbox session (web chat, w69)
WAVE        : wave 69 SHIPPED — the Owner's six readability items (the 20-0 pill ink,
              the field map's effective-paint ink + the 32-team pixel sweep, the review
              cards' true-ovr tier law, the preseason dropdown alignment, the dropdown
              player-name family (Cinzel + ink + tier + hover) over every menu, the award
              crests before the names)
PRODUCT     : Football-Sim-Z-post-blue-w69.html · md5 881248cfec19429c3a50326606da7244 ·
              1,803,514 bytes (w68 1,796,935 → +6,579 via the EIGHT-step asserted chain
              zpb_w69.py → zpb_w69h.py; each step asserts the previous md5, exact anchors,
              post-checks; the w68 baseline byte is pinned md5 22bc00ab8cc244da7ba8030a5a67c8da;
              the chain re-runs byte-stable — re-verified end-of-chat)
LAWS ADDED  : THE READABILITY LAWS (see §0's w69 clause) — the on-gold shine sweep ·
              the effective-paint map ink · the true-ovr tier (zpbTrueOvr) · the 12px house
              select padding · the pick-list family · the crest-first award lines
BATTERIES   : all green on the shipped bytes — nodecheck 24 blocks SYNTAX OK · w69_owner
              33/0 (three full runs) · w69_dropdowns 14/0 (every dropdown opened live) ·
              w69_map 3/0 (32 teams × 2 modes FROM THE PIXELS, 64/64 ≥4.5:1) · w67_owner
              41/0 (standing, re-pointed) · w67_teams 8/0 (standing, re-pointed) ·
              w68_names 14/0 (standing, re-pointed) · zero page errors on every leg
LANE        : local work/w69 in the sandbox; nothing committed (no git credentials)
QUEUE       : EMPTY — all six items shipped whole
LEDGER TAIL : notes/W69-INTAKE-LEDGER.md — all six items verbatim. Flagged readings the
              Owner may overrule: the card-name ladder rules the user's award names too
              (the glow stays on the card; say the word and user names shimmer regardless
              of OVR) · the chips keep the AP1/any-award shimmer laws · the POTG keeps its
              shimmer · the field map's 90+ tier classes are INERT on these bytes (the
              bubbles pass effOvr an object — nothing regressed; say the word and the
              map's 90+ names join the shimmer) · the offense bubble's ink follows --g2
LAST ZIP    : z-post-blue-wave69-2026-11-05-w69.zip
NEXT ACTION : whatever the Owner sends next · WATCH: the newest bytes live on gh-pages —
              check it FIRST · the batteries caught THREE real product defects this wave
              (the ladder ate the COTY crest, the raw glint stop read 2.52:1, the tier read
              the flex-penalized ovr) — trust the probes over green checks · the w60 name
              ladder OWNS the name <b>'s content: never plant anything inside a name
              carrier — plant SIBLINGS · the book rows carry the flex-penalized ovr: any
              new tier/check must read zpbTrueOvr · zpbSeriesSelectHTML is dead code ·
              renderRegularAwardsHTML has TWO definitions — the later assignment wins ·
              the map's empty middot bubbles (.zpb-empty) carry no ink law — exempt them
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 24 → REV 25:
              §3 rewritten; §0 carries the w69 standing clause; §1's pointer to w69)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (**gh-pages has carried the newest bytes since w56**). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 68 = `22bc00ab…` (1,796,935 B) · wave 69 = `881248cf…` (1,803,514 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts in `tools/`, the `zpb_w69.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file).
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess: the w69 root causes (the ladder's b-ownership, the flex-penalized ovr, the cream-on-cream glint) were invisible until the batteries caught them.**
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
