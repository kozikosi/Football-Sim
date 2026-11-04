# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 22 · 2026-11-04 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 19 the w62 merge; REV 20 the w63 double round; REV 21 w65; §3 carries wave 66 — the Owner's two UI/UX rounds, P-232 closed for real, P-174 shipped, the WAVE/CLAIMS header convention.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55, w56 = w56).**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the shimmer is the W45 SWEEP — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — **w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the quarter clock rides var(--text); the look-gate releases on ONE clock (.zpb-seen, never :not([data-zseen])); the awards lead "#X Y"; the matchup bars never ride var(--border); "/ g" reads "PER GAME"; the Super Bowl is PLAYED (the storm waits for the whistle); the bracket @ obeys the card width; the unit report card singles nobody out** — **w53/WM (standing, the Owner's w54): the touch polish (no text inflation, no grey tap flash, no double-tap delay), the 38px tap floors on phones, the rankings containment (compress-first)** — **w55 (standing): THE PHONE LAWS — the wrap never shrink-to-fits its widest child (width:100% ≤1024px); the box score is ONE table on the phone (linescore/tsstat keep display:table, data-nostack); the phone draft card's tap-floor Draft button ~38px; the star face-off pairs go ONE PER LINE ≤640px; the review key-player name leads its own line; the SB champion crest STACKS above the centered wordmark ≤740px; the tab is remembered (zpb:tab — save skips while parsing, the last body script restores); the honors carry the FIRST beats of the season-in-badges rail (appearance order = vertical order, the 1s pace untouched); the Dime is CHANGEABLE in the lineup editor (select[data-lineup="CB4"], the same staged picker)** — **w56 (standing): THE LABEL LAWS — the phone draft card's mini labels are BACK (POS · TEAM · WINS · GONE · PRIORITY · FILLS; the w55 retirement is reversed by the Owner's own directive) and the card reads in THREE lines (name · OVR chip · Draft / pos · team · wins · gone / priority · fills) — the OVR chip and the Priority value share NO column and NO row; the card's OVR number and plain stat values wear the row's one-ink law (txM light / txd dark — the dc-name pattern verbatim), never the wrapper's inherited ink; the EMPTY Dime row is clean (the wash rides the player, `d&&` guard — the pre-selection bracket is dead); the draft review's 20-0 stage is SLIM (zpb-stageintro-slim, min-height:0 — the home hero keeps its 42vh) and HOW YOUR DRAFT RANKS sits 8px under it; the score-line phone centering must re-state the w47 sides law at MATCHING specificity (0,3,0 !important) or the away name hangs right; the phone bracket is a VERTICAL FUNNEL (display:contents + order via the zpb-trnd-* round classes — inert on desktop; rounds read WC→Div→Champ→SB, AFC first); the pick grades are CARDS + BADGES (zpb-pg-*, no table, same data)**; the w57 (standing) laws — THE PLAYER CARDS READ CLEAN TO THEIR LEFT EDGE (no accent bar, no inset bar, no cards-view bar; the washes stay) · THE PREVIEW KEY PLAYERS FACE OFF TWO ACROSS AT EVERY WIDTH (the cards compress; the review's Key Players keep their one-per-line law) · NAMES NEVER BREAK LETTER-BY-LETTER (break-word, never anywhere, on the name carriers; the replay's play text takes its own row ≤480px) · THE BOX SCORE'S OT CELL COMES FROM otOf ALONE · THE RUN CINE FLOWS INTO THE STORM (mount first, fade second) · THE REVIEW BADGES PACE ×0.6s PER BEAT · Cinzel Decorative; explanations live in the Guide** — **w66 (standing): THE ROUND-2 LAWS — the mid-window board law (761–1120px reads the w57 two-line card; the rail stacks below 861px; a Draft button can never clip the panel edge) · EVERY Draft button pulses; the top-3 priority Draft buttons wear the filled team-gradient sheen (zpb-ctabig, the Play-the-X treatment, that team's colors) · the field map + flex chips ride the TEAM theme at 0.5 ink, never pure black, never the fixed site yellow (light ≥4.0:1, dark ≥4.5:1, all 32 teams measured) · RETURN TO AUTO LINEUP stays hidden until the lineup is actually touched (roster._zpbTouched) · the fills cell reads ONE label ("FS (-10 FLEX)") inside the custom zpb-slotdd/zpb-slotpop dropdown (Cinzel, the homepage team-picker principles) — the raw slotsel is retired · the roster summary is TWO team-tinted Cinzel badges (zpb-rbadge) · THE CARDS ARE THE MASTER CLOCK — 0.3s per beat, ZERO gap, the map/depth follow the card timeline on every surface · the comparison dropdowns enhance into the custom family (zpbEnhanceCmpSel — recurse OPTGROUP children; the native select's purple wave is dead) · SIM GAME · SIM SEASON · BACK TO SEASON live on the top panel's UPPER LINE (zpbSimTabsHost/zpbBtsHost); the footer doors and the standalone Back-to-Season panel are retired · ONE SIM PLAYOFFS door (the upper line) · SIM PLAYOFFS RUNS SILENTLY (the during-the-game cinematic never fires; __zpbSimRestRun guards the panels) and ends at the SHARED zpbPlayoffEndScreen — the Super Bowl screen only when you made it, the solemn elimination cine (round, opponent, score, the SB final, the champion, no confetti) when you didn't · the COTY "YOU" shimmers gold with the honors · player PROFILE NAMES persist (zpbProfStore, localStorage zpbPlayerProfiles, editable from the Browser, the 0.5-ink suffix) · RUN IT BACK (SAME ROSTER retired) whose caution names the mechanism (preseason, same roster, season erased — zpbCaution opts)

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave66-2026-11-04-w66/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

**Fallback chain** (stop at the first that works):
1. `origin/council/zai:_agents/zai/…` (primary — updated by import-zip/seat-save)
2. The newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations)
3. **The Owner's own branches: `council/vl` has carried the newest product bytes (`Football-Sim-Z-post-blue-w54.html` was found there at w55); `council/uk` has carried the session docs. Check BOTH before saying a wave is missing** — the w54 hunt failed once because only council/zai was searched.
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (notes/W5x-INTAKE-LEDGER.md in the last zip) — the Owner's words, item by item · the storage chat adds the Architect's contract + the Phase 0 plan (inbox/20261101-2323-zai-storage-phase0.md)
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: `git show origin/council/base:AGENTS.md` (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-04 (chat ended ~) · sandbox session (web chat, w66 — a resume; work/
              survived, so the recovery cost nothing)
WAVE        : wave 66 SHIPPED — the Owner's two UI/UX rounds (9 items + N1–N10), P-232
              closed for real (the lineup is natural-first at every layer), P-174 shipped
              (the Player Browser is an infinite scroll), and Claude's packing-list
              convention followed: the file opens WAVE: w66 / CLAIMS: before <!DOCTYPE>
PRODUCT     : Football-Sim-Z-post-blue-w66.html · md5 41d2cb10ab3608fcc879816e61e20002 ·
              1,780,103 bytes (w65 1,741,540 → +38,563 via the TWENTY-ONE-step asserted
              chain zpb_w66.py → zpb_w66u.py; each step asserts the previous md5, exact
              anchors, post-checks; the w65 baseline byte is pinned md5
              948f789da6d3ccf064104212ec748f3a; the chain re-runs byte-stable)
LAWS ADDED  : THE MID-WINDOW BOARD LAW (761–1120px reads the w57 two-line card; the 340px
              rail stacks below 861px — the unconditional override is dead; no Draft
              button ever clips the panel edge) · EVERY DRAFT BUTTON PULSES + the top-3
              priority buttons wear the filled team-gradient sheen · THE FIELD MAP IS
              TEAM-THEMED at 0.5 ink (no pure black, no fixed site yellow; light ≥4.0:1,
              dark ≥4.5:1, 32 teams × 2 modes measured) · RETURN TO AUTO LINEUP (hidden
              until the lineup is touched) · WEAKEST · THE PREGAME MARQUEE CLEARS THE
              REPLAY HEADER LINE at every width · THE REGULAR-REVIEW SEASON REVIEW PANEL
              (no playoff sim required) + the TRY AGAIN panel (filled, shimmering, own
              panel) · P-232 NATURAL-FIRST AT EVERY LAYER (Hungarian over natural slots
              only; in-unit-only fills via ZPB_AUTO_UNITS; cpuPick in-unit; the stuck-pick
              escapes RETIRED — a pick with no legal landing passes, the slot sits honestly
              empty; the pool has 53 TEs for 96 TE slots — honesty beats flexing) ·
              P-174 INFINITE SCROLL (#pbSentinel, IntersectionObserver, rootMargin 160px;
              no PREV/NEXT, no PAGE X OF Y) · N1 THE FILLS DROPDOWN (zpb-slotdd/
              zpb-slotpop — one label "FS (-10 FLEX)", Cinzel, the homepage picker's
              principles, retargets the pick) · N2 THE TWO ROSTER BADGES (zpb-rbadge) ·
              N3 THE CARDS ARE THE MASTER CLOCK (0.3s per beat, zero gap; map/depth
              follow) · N4 the aside sentence deleted · N5 THE COMPARISON DROPDOWNS
              ENHANCE (zpbEnhanceCmpSel — recurse OPTGROUP children; the purple wave is
              dead) · N6 THE UPPER LINE (SIM GAME · SIM SEASON · BACK TO SEASON next to
              NEW DRAFT / 100 SEASONS; the footer doors + the standalone panel retired;
              Back to Season brightened) · N7 ONE SIM PLAYOFFS door · N8 SIM PLAYOFFS RUNS
              SILENTLY (during-the-game cine never fires; the shared zpbPlayoffEndScreen:
              the SB screen only when you made it, the solemn elimination cine — round,
              opponent, score, SB final, champion, no confetti — when you didn't) · N9 the
              COTY "YOU" shimmers gold + PLAYER PROFILE NAMES persist (zpbProfStore) ·
              N10 RUN IT BACK (the caution names the mechanism via zpbCaution opts)
BATTERIES   : all green on the shipped bytes — nodecheck 23 blocks SYNTAX OK · w66_r2 37/0
              (34/0 on its review-door branch — path-dependent legs) · w66_owner 48/0 ·
              w66_teams 15/0 (contrast 64 pairs, the P-232 audit × 32 teams, the clearance
              sweep × 6 sizes) · ink/cmp2/geom probes exit 0 · the battery caught THREE
              real regressions during the build (the review page's ${user} scope, a
              DT→TE3 escape — caught twice, the review-door end screen) — all fixed IN the
              chain (steps 18–21), re-run clean
LANE        : local work/w66 in the sandbox; nothing committed (no git credentials)
QUEUE       : EMPTY — both Owner rounds shipped whole, P-232 + P-174 verified
LEDGER TAIL : notes/W66-INTAKE-LEDGER.md — both rounds verbatim. Flagged readings the
              Owner approved by silence: N3 "synced to the cards" = the cards are the
              clock (the map/depth follow, never the reverse) · N8 "everything transmitted
              on the superbowl victory page" = the SB final + champion + MVP ride the
              solemn screen too · N9 "build out the feature" = the name field + persistence
              only (the full profiles track is future work) · the auto-lineup "smoothing"
              the Owner mentioned is NOTED, not built — Claude may take it over
LAST ZIP    : z-post-blue-wave66-2026-11-04-w66.zip
NEXT ACTION : whatever the Owner sends next · WATCH: the w66 visual evidence includes a
              LIVE-draft N2 shot (w66-roster-badges.png) — the badges render on the roster
              re-render, and the draft room hides itself once the draft completes (switch
              to the SIMULATOR tab + click a roster view to re-render) · the WAVE/CLAIMS
              header is now PERMANENT (Claude's convention): every future wave appends its
              claims there, mechanism named, and only QA marks them done
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 21 → REV 22:
              §3 rewritten; §0 carries the w66 standing clause)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check `council/vl` — it has carried the Owner's shared tree). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: the Owner's w54 = `512d1885…` (1,584,527 B) · wave 55 = `49161f11…` (1,592,738 B) · wave 56 = `42af55f7…` (1,600,958 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts in `tools/`, the `zpb_w56.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file).
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess: the w55/w56 root causes (the flex-wrap shrink-to-fit, the display:block table split, the unguarded wash, the specificity fight) were all invisible until a live probe measured them.**
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
