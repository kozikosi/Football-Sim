# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 18 · 2026-11-03 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 13 lives in the w52 package; REV 14's §3 was lost with the paused chat; REV 15 carried w55; REV 16 carried w56 and lives in the w56 package; REV 17 carried w57 and lives in the w57 package; §3 carries the wave-59 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55, w56 = w56).**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the shimmer is the W45 SWEEP — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — **w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the quarter clock rides var(--text); the look-gate releases on ONE clock (.zpb-seen, never :not([data-zseen])); the awards lead "#X Y"; the matchup bars never ride var(--border); "/ g" reads "PER GAME"; the Super Bowl is PLAYED (the storm waits for the whistle); the bracket @ obeys the card width; the unit report card singles nobody out** — **w53/WM (standing, the Owner's w54): the touch polish (no text inflation, no grey tap flash, no double-tap delay), the 38px tap floors on phones, the rankings containment (compress-first)** — **w55 (standing): THE PHONE LAWS — the wrap never shrink-to-fits its widest child (width:100% ≤1024px); the box score is ONE table on the phone (linescore/tsstat keep display:table, data-nostack); the phone draft card's tap-floor Draft button ~38px; the star face-off pairs go ONE PER LINE ≤640px; the review key-player name leads its own line; the SB champion crest STACKS above the centered wordmark ≤740px; the tab is remembered (zpb:tab — save skips while parsing, the last body script restores); the honors carry the FIRST beats of the season-in-badges rail (appearance order = vertical order, the 1s pace untouched); the Dime is CHANGEABLE in the lineup editor (select[data-lineup="CB4"], the same staged picker)** — **w56 (standing): THE LABEL LAWS — the phone draft card's mini labels are BACK (POS · TEAM · WINS · GONE · PRIORITY · FILLS; the w55 retirement is reversed by the Owner's own directive) and the card reads in THREE lines (name · OVR chip · Draft / pos · team · wins · gone / priority · fills) — the OVR chip and the Priority value share NO column and NO row; the card's OVR number and plain stat values wear the row's one-ink law (txM light / txd dark — the dc-name pattern verbatim), never the wrapper's inherited ink; the EMPTY Dime row is clean (the wash rides the player, `d&&` guard — the pre-selection bracket is dead); the draft review's 20-0 stage is SLIM (zpb-stageintro-slim, min-height:0 — the home hero keeps its 42vh) and HOW YOUR DRAFT RANKS sits 8px under it; the score-line phone centering must re-state the w47 sides law at MATCHING specificity (0,3,0 !important) or the away name hangs right; the phone bracket is a VERTICAL FUNNEL (display:contents + order via the zpb-trnd-* round classes — inert on desktop; rounds read WC→Div→Champ→SB, AFC first); the pick grades are CARDS + BADGES (zpb-pg-*, no table, same data)**; the w57 (standing) laws — THE PLAYER CARDS READ CLEAN TO THEIR LEFT EDGE (no accent bar, no inset bar, no cards-view bar; the washes stay) · THE PREVIEW KEY PLAYERS FACE OFF TWO ACROSS AT EVERY WIDTH (the cards compress; the review's Key Players keep their one-per-line law) · NAMES NEVER BREAK LETTER-BY-LETTER (break-word, never anywhere, on the name carriers; the replay's play text takes its own row ≤480px) · THE BOX SCORE'S OT CELL COMES FROM otOf ALONE · THE RUN CINE FLOWS INTO THE STORM (mount first, fade second) · THE REVIEW BADGES PACE ×0.6s PER BEAT · Cinzel Decorative; explanations live in the Guide — **w59 (standing): the CB4 SPOT READS DIME EVERYWHERE (LABELS + GROUP_DEFS; the hover title still resolves) · THE PHONE RANKING CARDS READ AS CARDS (no label column: the posrank/madden card is `#N · crest · team · score` on ONE line with the names flowing beneath; the browser card is TWO lines — name · pos chip · OVR / team · SPD · STR; cards never grow as the window shrinks) · THE UNIT COMPARISON NEVER STACKS (data-nostack; its own graduated law, padding/font steps 1024/760/480, full width at every size; both instances) · THE CINEMATIC LOCK (during ANY fixed overlay the page behind is dead: pointer-events:none + inert on the body wrappers; the overlays stay live; a 300ms invisible click shield swallows the one stray click after the last close) · THE SHIMMER CLIP LAW (every background-shorthand override re-declares background-clip:text !important inside itself — the w57 solid-gold-block fix) · THE DRAFT CARD IS THE W57 TWO-LINE LABELED CARD (the w56 three-line law is REVOKED by the Owner's ruling; the merge block zpb-w59-merge-css carries it) · THE SYSTEM-LIGHT SCORE LAW (the browser's score cells ride --nu in both themes; the bare :root:not([data-theme=\"light\"]) dark inks are DEAD — never reintroduce un-scoped theme variants)**.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave59-2026-11-02-w59/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
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
DATE/TIME   : 2026-11-03 early (HST) · sandbox sessions 30–31 (session 30 built all of w59
              then lost its reply to a context overflow BEFORE the close; session 31 found
              the work intact in the worktree, re-verified it from the bytes, and closed)
WAVE        : wave 59 SHIPPED (the Owner's nine; w59 = w58's line + the best of w57) —
              (1) the CB4 spot reads DIME (LABELS + GROUP_DEFS, site-wide harmonized);
              (2) the Position Rankings phone cards read NATURAL — `#N · crest · team ·
              score` on one line, names flowing beneath, the label column dead; (3) the
              Madden phone cards take the draft-card treatment (the `#` renders itself,
              the word labels retire, ANCHOR/LEAK + bar beneath); (4) the browser card
              reads TWO lines (name · pos chip · OVR / team · SPD · STR; six lines →
              two; the cards-never-grow-as-the-window-shrinks law) PLUS the system-light
              MELT fixed (a malformed bare :root:not([data-theme="light"]) rule painted
              the dark pale ink #f6d3c1 on light pages; the bare variants removed, the
              scoped pair governs, the cells ride --nu both themes); (5) the unit
              comparison NEVER stacks — data-nostack + its own graduated law (steps at
              1024/760/480, full width at every size, both instances); (6) THE CINEMATIC
              LOCK — during ANY fixed overlay the page behind is dead twice over
              (pointer-events:none + inert on the body wrappers; overlays stay live; the
              fast-forward untouched; a 300ms invisible click shield swallows the one
              stray click after the last close — the Owner's simmed-a-season accident
              replayed in the battery and is now impossible); (7) THE BEST OF W57
              MERGED — w58 was built from w56 without w57 (the bytes proved it), so the
              whole w57 draft round rides in w59: the TWO-LINE LABELED phone draft card
              (the w56 three-line law REVOKED by the Owner's ruling), the priority ink,
              the contrast pass, the marquee pinned top, the badge cascade −0.25s
              composing ×0.6s (calc(var(--beat,0)*.6s - .25s)), the 1.17rem badges, the
              deeper muted inks; (8) THE GOLD SHIMMER FIXED, not reverted — w57's
              background-shorthand override reset background-clip to border-box (solid
              gold blocks over names); the override re-declares background-clip:text
              !important inside itself; the sweep survives, names read, both themes;
              (9) every view × 1920/1280/1024/768/600/390/320: zero pan, zero errors
STORAGE     : Phase 0 unchanged inside w59 (the module + UI kit on ?storage=1). THE
              ARCHITECT'S E3 NOTE ARRIVED (architect/engine-and-seats:
              inbox/20261102-0200-architect-E3-week-stepping.md, relayed by the Owner
              after session 30 cut): startSeason/fixtures/playWeek week-stepping, JSON
              clean, finished state <150K chars, same-game-on-refresh via the forked
              seed, run-it-back by year+run; GameScore gains optional htd/atd; week
              payload scores/schedule = RunState fields. MY RECEIPT + what it unblocks:
              inbox/20261103-0000-zai-w59-receipt-and-e3-ack.md — the wiring commit
              STAYS PARKED until E3b (RunState↔WeekPayload mapping) + E1 (stable ids);
              the UI asks that franchise/year/run/week/phase stay first-class in the
              week payload (asked in the receipt)
PRODUCT     : Football-Sim-Z-post-blue-w59.html · md5 889e531b9418fa7a2604d3e8ab4d23b4 ·
              1,679,013 chars (1,680,808 bytes) (base: the Owner's w58 7d1e07dd…
              1,661,434 B; delta +19,316; the generator re-run reproduces the md5)
LANE        : local work/zai-w57 (the branch NAME predates the wave counter; HEAD = the
              w59 close) committed; the push NOT attempted (§5 rule 8 — the zip is the
              delivery); the Owner holds w57+w58 on gh-pages
QUEUE       : EMPTY — the Owner's nine shipped whole
LEDGER TAIL : notes/W59-INTAKE-LEDGER.md §veto — (1) the w56 three-line phone draft card
              law is REVOKED (w57's two-line labeled card is the law), (2) DIME rides
              the site-wide LABELS law (the Owner scoped it to the rankings page; the
              change harmonizes, not widens), (3) the cinematic lock covers EVERY fixed
              overlay the site mounts, (4) the fast-forward click is untouched (the lock
              guards the page BEHIND), (5) the 300ms post-cinematic click shield is
              build-side insurance for the exact accident (swallows at most one click)
LAST ZIP    : z-post-blue-wave59-2026-11-02-w59.zip
NEXT ACTION : the storage wiring waits for the Architect's E3b mapping + E1 ids (the
              receipt names the five header fields the UI needs first-class); on
              "continue" with no new file → §6 idle protocol
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 17 → REV 18:
              §0 carries the w59 laws; §1's self-path points at the w59 package)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check `council/vl` — it has carried the Owner's shared tree). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: the Owner's w54 = `512d1885…` (1,584,527 B) · wave 55 = `49161f11…` (1,592,738 B) · wave 56 = `42af55f7…` (1,600,958 B) · the Owner's w57 (the earlier unpushed round) = `765ee5cf…` (1,611,548 B, gh-pages) · the Owner's w58 (= my w57 bytes) = `7d1e07dd…` (1,661,434 B, gh-pages) · wave 59 = `889e531b…` (1,680,808 B).

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
