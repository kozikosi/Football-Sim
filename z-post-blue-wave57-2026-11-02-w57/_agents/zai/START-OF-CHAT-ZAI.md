# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 17 · 2026-11-02 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 13 lives in the w52 package; §3 carries the wave-57 state. REV 14 was the w53/WM session's copy — its §3 was lost with the paused chat; REV 15 carried the w55 state and the council/vl + council/uk fallback law; REV 16 carried the w56 state; session 29 built w57 but died before packaging — session 30 recovered the lane, finished the wave, and rewrote this doc.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55, w56 = w56).**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the shimmer is the W45 SWEEP — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — **w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the quarter clock rides var(--text); the look-gate releases on ONE clock (.zpb-seen, never :not([data-zseen])); the awards lead "#X Y"; the matchup bars never ride var(--border); "/ g" reads "PER GAME"; the Super Bowl is PLAYED (the storm waits for the whistle); the bracket @ obeys the card width; the unit report card singles nobody out** — **w53/WM (standing, the Owner's w54): the touch polish (no text inflation, no grey tap flash, no double-tap delay), the 38px tap floors on phones, the rankings containment (compress-first)** — **w55 (standing): THE PHONE LAWS — the wrap never shrink-to-fits its widest child (width:100% ≤1024px); the box score is ONE table on the phone (linescore/tsstat keep display:table, data-nostack); the phone draft card's tap-floor Draft button ~38px; the star face-off pairs go ONE PER LINE ≤640px; the review key-player name leads its own line; the SB champion crest STACKS above the centered wordmark ≤740px; the tab is remembered (zpb:tab — save skips while parsing, the last body script restores); the honors carry the FIRST beats of the season-in-badges rail (appearance order = vertical order, the 1s pace untouched); the Dime is CHANGEABLE in the lineup editor (select[data-lineup="CB4"], the same staged picker)** — **w56 (standing): THE LABEL LAWS — the phone draft card's labels stay (POS · TEAM · OVR · WINS · PRIORITY · GONE · FILLS) and the one-ink law holds (the card's values wear the row's ink — txM light / txd dark — the dc-name pattern verbatim); the EMPTY Dime row is clean (the wash rides the player, `d&&` guard); the draft review's 20-0 stage is SLIM (zpb-stageintro-slim, min-height:0 — the home hero keeps its 42vh) and HOW YOUR DRAFT RANKS sits 8px under it; the score-line phone centering must re-state the w47 sides law at MATCHING specificity (0,3,0 !important) or the away name hangs right; the phone bracket is a VERTICAL FUNNEL (display:contents + order via the zpb-trnd-* round classes — inert on desktop; rounds read WC→Div→Champ→SB, AFC first); the pick grades are CARDS + BADGES (zpb-pg-*, no table, same data)** — **w57 (standing): THE MATCH LAWS — the PRIORITY value wears the EXACT gone/wins ink in every theme state (dark = the shared accent2-into-text mix; light = gone's accent2-45%-into-zcream mix; card AND desktop; the w56 gold retires; wins keeps its approved light good-mix — the Owner named only the priority); the phone draft card reads in TWO lines (row 1 = name + the on-the-clock Draft button with its 40px tap floor; row 2 = pos · team · ovr · wins · priority · gone in that exact order, labels kept, the w56 OVR chip retired on the phone); FILLS sits DIRECTLY UNDER the Draft button (cols 10-13, right edges aligned); the GONE cell keeps 2 columns (1 column clipped its label); the phone pregame (≤600px) PINS the marquee (title · logos · sub) to the top and the key-player pairs fan out strictly BELOW it (the syMap narrow remap {50:38,27:60,78:82,34:40,66:68}); the SB intro tightens (logos 54px, title 1.3rem, the cup keeps its sky at padding-top 56px, the LIVE banner seats at bottom 2% so the landed banner clears the last pair); cinematic overlap checks judge elements LANDED and VISIBLE (the cup's animation starts at 4.2s — its hidden pre-animation rect is not a hit); the season-in-badges rail AND the unit report card lead their entrance by 0.25s (`calc(var(--beat,0)*1s - .25s)` — durations and the 1s stagger untouched, the cut still leads, the veil follows at total+650ms); the contrast bar: the audit's fixes stand (dark rc-title gold2, slot-chip ink, halfway-rose Draft/slotchg links, dark accent2 value mixes, deepened light subs/honor title, bronze light shimmer) with the w45 shimmer sweep's palest frame (3.54 light / 4.26 dark, large-text) as the ONE deliberate residual**; Cinzel Decorative; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave57-2026-11-02-w57/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

**Fallback chain** (stop at the first that works):
1. `origin/council/zai:_agents/zai/…` (primary — updated by import-zip/seat-save)
2. The newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations)
3. **The Owner's own branches: `council/vl` has carried the newest product bytes (`Football-Sim-Z-post-blue-w54.html` was found there at w55); `council/uk` has carried the session docs. Check BOTH before saying a wave is missing** — the w54 hunt failed once because only council/zai was searched.
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (notes/W5x-INTAKE-LEDGER.md in the last zip) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: `git show origin/council/base:AGENTS.md` (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-02 (chat ended ~) · sandbox session 30 (session 29 built w57 but died
              BEFORE packaging — the Owner received nothing; session 30 recovered the intact
              lane from /home/z/my-project/w57, verified the generator byte-deterministic,
              finished the wave, and shipped)
WAVE        : wave 57 SHIPPED (the Owner's round-57: THE MATCH LAWS —
              the priority value wears the EXACT gone/wins ink in every theme state, card and
              desktop (dark = the shared accent2/text mix; light = gone's accent2 45% zcream
              mix; the w56 gold retires);
              the phone draft card reads in TWO lines: name + the on-the-clock Draft button
              (40px tap floor) on row 1; pos · team · ovr · wins · priority · gone in the
              Owner's exact order on row 2 (labels kept, the w56 OVR chip retired on the phone);
              FILLS sits directly under the Draft button (cols 10-13, right edges aligned);
              the GONE cell keeps 2 columns (1 column clipped its label to GONI — found in the
              zoom review, fixed);
              the phone pregame (≤600px) pins the marquee to the top and the key-player pairs
              fan out strictly below it (the syMap narrow remap); the SB intro tightens (logos
              54px, title 1.3rem, the cup keeps its sky, the LIVE banner seats at bottom 2% —
              the landed banner clears the last pair by 7px);
              the season-in-badges rail and the unit report card both lead by 0.25s
              (calc(var(--beat,0)*1s - .25s) ×3 rules; durations + the 1s stagger untouched;
              the veil follows at total+650ms; the cut still leads);
              the contrast pass: 3,712 + 3,264 pairs over 32 teams × light/dark — dark rc-title
              was 1.13:1 (invisible, fixed), slot chips, halfway-rose Draft/slotchg, dark value
              mixes, deepened light subs/honor/shimmer (2.32 → 3.54) — the ONE deliberate
              residual is the w45 shimmer sweep's palest frame (3.54 light / 4.26 dark,
              large-text bold), identical on every team;
              the OTC harness joined the battery (the Draft button only renders on the clock —
              the old checks measured the idle empty cell; w57_otc.js measures the real one ×
              3 legs)
PRODUCT     : Football-Sim-Z-post-blue-w57.html · md5 765ee5cffb65db03dabf183e3f72c0c4 ·
              1,611,548 bytes (base: my w56 bytes 42af55f7…)
LANE        : local zai/lane @ wave-57 (the zip carries the lane; nothing pushed — sandbox cannot)
QUEUE       : EMPTY — the round-57 directive shipped whole (six asks + the testing mandate)
LEDGER TAIL : notes/W57-INTAKE-LEDGER.md §veto — (1) "the drag button" = the card's Draft
              button (on the clock only — the idle cell is empty by design), (2) "over" = OVR as
              a plain labeled stat on the bottom line (the w56 chip retires on the phone),
              (3) the bottom-line order is EXACTLY pos·team·ovr·wins·priority·gone with FILLS
              under the button at the right end, (4) "0.25 seconds faster" = both entrances
              measured separately, the cut itself does not move, (5) the contrast pass bar =
              WCAG AA on the rendered pairs; the w45 shimmer's palest frame is the documented
              residual, and wins keeps its approved light good-mix (the Owner named only the
              priority)
LAST ZIP    : z-post-blue-wave57-2026-11-02-w57.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 16 → REV 17: §0
              carries the w57 match laws; §1's self-path points at the w57 package)```

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
