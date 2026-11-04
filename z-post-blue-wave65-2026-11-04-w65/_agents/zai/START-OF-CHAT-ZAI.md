# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 21 · 2026-11-04 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 18 w61; REV 19 the w62 merge; REV 20 the w63 double round; §3 carries wave 65 — the Owner's 25-item UI/UX round, Claude's weight sync, the Muse QA four.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55, w56 = w56).**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the shimmer is the W45 SWEEP — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — **w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the quarter clock rides var(--text); the look-gate releases on ONE clock (.zpb-seen, never :not([data-zseen])); the awards lead "#X Y"; the matchup bars never ride var(--border); "/ g" reads "PER GAME"; the Super Bowl is PLAYED (the storm waits for the whistle); the bracket @ obeys the card width; the unit report card singles nobody out** — **w53/WM (standing, the Owner's w54): the touch polish (no text inflation, no grey tap flash, no double-tap delay), the 38px tap floors on phones, the rankings containment (compress-first)** — **w55 (standing): THE PHONE LAWS — the wrap never shrink-to-fits its widest child (width:100% ≤1024px); the box score is ONE table on the phone (linescore/tsstat keep display:table, data-nostack); the phone draft card's tap-floor Draft button ~38px; the star face-off pairs go ONE PER LINE ≤640px; the review key-player name leads its own line; the SB champion crest STACKS above the centered wordmark ≤740px; the tab is remembered (zpb:tab — save skips while parsing, the last body script restores); the honors carry the FIRST beats of the season-in-badges rail (appearance order = vertical order, the 1s pace untouched); the Dime is CHANGEABLE in the lineup editor (select[data-lineup="CB4"], the same staged picker)** — **w56 (standing): THE LABEL LAWS — the phone draft card's mini labels are BACK (POS · TEAM · WINS · GONE · PRIORITY · FILLS; the w55 retirement is reversed by the Owner's own directive) and the card reads in THREE lines (name · OVR chip · Draft / pos · team · wins · gone / priority · fills) — the OVR chip and the Priority value share NO column and NO row; the card's OVR number and plain stat values wear the row's one-ink law (txM light / txd dark — the dc-name pattern verbatim), never the wrapper's inherited ink; the EMPTY Dime row is clean (the wash rides the player, `d&&` guard — the pre-selection bracket is dead); the draft review's 20-0 stage is SLIM (zpb-stageintro-slim, min-height:0 — the home hero keeps its 42vh) and HOW YOUR DRAFT RANKS sits 8px under it; the score-line phone centering must re-state the w47 sides law at MATCHING specificity (0,3,0 !important) or the away name hangs right; the phone bracket is a VERTICAL FUNNEL (display:contents + order via the zpb-trnd-* round classes — inert on desktop; rounds read WC→Div→Champ→SB, AFC first); the pick grades are CARDS + BADGES (zpb-pg-*, no table, same data)**; the w57 (standing) laws — THE PLAYER CARDS READ CLEAN TO THEIR LEFT EDGE (no accent bar, no inset bar, no cards-view bar; the washes stay) · THE PREVIEW KEY PLAYERS FACE OFF TWO ACROSS AT EVERY WIDTH (the cards compress; the review's Key Players keep their one-per-line law) · NAMES NEVER BREAK LETTER-BY-LETTER (break-word, never anywhere, on the name carriers; the replay's play text takes its own row ≤480px) · THE BOX SCORE'S OT CELL COMES FROM otOf ALONE · THE RUN CINE FLOWS INTO THE STORM (mount first, fade second) · THE REVIEW BADGES PACE ×0.6s PER BEAT · Cinzel Decorative; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave65-2026-11-04-w65/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
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
DATE/TIME   : 2026-11-04 (chat ended ~) · sandbox session (web chat, w65 — resumed once
              after a stall; the sandbox kept work/, so the recovery cost nothing)
WAVE        : wave 65 SHIPPED — three rounds in one build: the Owner's 25-item UI/UX
              list, Claude's de60e05 weight sync (UI-displayed values), the Muse w64 QA
              four (P-232 FLEX REV 4, the restore, the pager, the preseason heading)
PRODUCT     : Football-Sim-Z-post-blue-w65.html · md5 948f789da6d3ccf064104212ec748f3a ·
              1,741,540 bytes (w64 1,716,179 → +25,361 via the NINE-step asserted chain
              zpb_w65.py → b → c → d → e → f → g → h → i; every step asserts the
              previous md5, exact anchors, and post-checks; the w64 baseline byte is
              pinned md5 8b601f06ad2938960a636f53e709148d)
LAWS ADDED  : THE UNIVERSAL BACK TO SEASON (a glowing team-ink door at the TOP and the
              BOTTOM of every page with a live season — roster, compare, 100 seasons,
              every footer page; the bottom bar hides on the season tab itself) · THE
              HEADER SIM DOORS (SIM GAME + SIM SEASON ride the tab row at ONE size — the
              SIM GAME size, align-self keeps the tall tabs from stretching them; the
              doors follow the phase: SIM SEASON only while phase==='regular' — never on
              the Super Bowl review; SIM PLAYOFFS playoffs-only) · THE COMPARISON TAB
              REBUILT (one header panel copied from the footer page: two pill dropdowns
              + the X vs Y score between; ≤760px the score takes its own centered line
              FIRST — both surfaces share the law; the huge filters panel retired) ·
              THE HONEST RESTORE (boot with a save in slot A → a RESTORE SAVED SEASON
              chip in the team ink; the envelope carries the draft pickRounds; w63-era
              saves restore too) · THE PAGER UN-HIDDEN (an old display:none law killed
              it; PREV · PAGE X OF 20 · NEXT lives) · ALL TEAMS / ALL POSITIONS / SEARCH
              PLAYER NAME (the dot face replaced; no ellipses) · THE DISPLAYED WEIGHTS =
              CLAUDE'S de60e05 TABLE (Position Rankings buttons, the Guide tier viz +
              per-slot table, the MODEL preset; 1 unit = 0.00254 wins over 70→90) ·
              THE FLEX TABLE IS REV 4 (P-232 closed: QB flexes ONLY to FS -10; the
              auto-fill obeys the flex table too — no flat -9) · THE DEPTH BEATS 0.12s
              (fade .3s; the formation map keeps its 1s law; the 90+ escape-hatch floor
              retired — fillers land right after the drafted beats) · THE ST PANE
              LEFT-ALIGNED (grid like O/D, the horizontal lines back) · THE FOOTER SITS
              IN FLOW (the sticky thumb-reach law retired; real margins around it) ·
              THE PREGAME MARQUEE SITS LOW (≤600px: the logos + key players clear the
              header lines) · THE SIM PLAYOFFS WARNING (the A9 format, YES-first, gated
              on your team being alive) · THE SEASON REVIEW PANEL (no arrow, centered,
              glowing, its own panel; the SB review never offers SIM SEASON; the review
              door always lands on the review page — even after the 100 seasons) · THE
              DRAFT BOARD BAR IS DEAD IN EVERY THEME (scoped #draftTable2) · the
              roster-locked sentence and the empty Week-1 stats panel retired · START
              PRESEASON rides the bottom of the post-draft page · the 100-seasons hero
              + badge row wear the advanced badges (12+ win seasons, playoff trips that
              became titles, turnovers per game, sacks per game)
BATTERIES   : 205/205 on the shipped bytes — nodecheck 19/19 · w65_round 59/59 (NEW:
              the 25-item round, probe-first) · verify 13/13 · mobile 41/41 · live 7/7 ·
              storage 7/7 · sweep 13/13 · cine 27/27 · owner 19/19
LANE        : local work/w65 in the sandbox; nothing committed (no git credentials)
QUEUE       : EMPTY — all three rounds shipped whole
LEDGER TAIL : notes/W65-INTAKE-LEDGER.md — the flagged interpretations (Owner-approved
              by silence): "move the footer down" = unstick + real margins · the depth
              speed = the per-beat cadence (the map's 1s law stands) · the Week-1 stats
              gate = zero GAMES PLAYED (returns Week 2+) · the playoffs warning = your
              team alive in the bracket · the 100-season badges = the four the
              aggregate carries (PA/g and the point swing are NOT in the aggregate —
              say the word and the aggregate grows)
LAST ZIP    : z-post-blue-wave65-2026-11-04-w65.zip
NEXT ACTION : whatever the Owner sends next; watch the w65 visual checks caught THREE
              late defects (a comment living inside a template literal rendered as page
              text, the sim-tabs host stretching SIM GAME, the tab line stretching SIM
              SEASON) — trust screenshots over green checks
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 20 → REV 21:
              §3 rewritten; §0's standing laws carry unchanged)
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
