# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 18 · 2026-11-06 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 17 lives in the w73 package; §3 carries the wave-75 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55). The base of every wave = the LATEST wave file (highest w-number with a product HTML) on gh-pages, verified by listing — w74 shipped docs/lab only, so w75 built on w73.**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- **Since w72 the project has two tracks:** (a) the Z-post-blue shell waves (visual laws below govern anything touching them) and (b) the **Colors rebuild** — now named **76 Pancakes** (Owner, w75 chat: "the new final product name for the svelte app"); w75 is "a final w version for the transition". The Owner's directives arrive verbatim in chat or through Muse briefings and owner-notes on the Architect's branch; the intake-ledger rule is unchanged.
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the look-gate releases on ONE clock (.zpb-seen); the awards lead "#X Y"; the Super Bowl is PLAYED; the unit report card singles nobody out — w53/WM: the touch polish, the 38px tap floors, the rankings containment — w55: THE PHONE LAWS — the wrap never shrink-to-fits, the box score is ONE table on the phone, the tab is remembered (zpb:tab), Cinzel Decorative; explanations live in the Guide — **w75 (standing, the Owner's round): the chip law is the TOGGLE MODEL — the position buttons start all OFF while the board is FULL, a lit button keeps its group on the board, a dark one keeps it off, every button off (the default) is the full board, ALL lights all 14 — the selected chip is a FILLED button (the accent + the deep-coffee on-gold ink) in both themes — the four preseason explainers are PLAIN (the WHAT-DO-THESE-TERMS-MEAN pattern, no box) — "2 point conversion" on the preseason page and in the guide; badges and in-season labels keep "2-Pt" — the fills read "x (-y)", never the word FLEX, and the draft board never side-scrolls (measured) — the rating DISPLAY scale is median-centered (`zpbDR`: database median OVR + the raw delta; the backend math untouched) — DRAFT COMMAND CENTER on the shared review (every room below B best→worst as small report cards, no gauges; CUTDOWN DAY = below 80 OVR × kicker-or-higher on the win math × a season under the average line; the CUT badge fades in and out) — BACK TO <STAGE> rides the top and bottom of all five footer pages while the simulator has started — the pregame player cards go LIGHT in light mode (the W68 dark gradient stays in dark) — the award names read `--nm60` (the 0.60 preset) in light, the 0.50 law stays in dark — the guide ladder shows all 32 slots — OFFENSIVE GUARD, never just Guard, in every name label.**

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai architect/engine-and-seats main gh-pages
    git ls-tree -r origin/gh-pages --name-only | grep -E "Football-Sim-Z-post-blue-w[0-9]+\.html$"   # the LATEST wave file — verify by listing, never hardcode
    git show origin/council/zai:z-post-blue-wave75-2026-11-06-w75/_agents/zai/START-OF-CHAT-ZAI.md 2>/dev/null | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'

**Fallback chain** (stop at the first that works):
1. `origin/council/zai:_agents/zai/…` (primary — updated by import-zip/seat-save)
2. The newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations)
3. **The Owner's own branches: `council/vl` has carried the newest product bytes; the Architect's work lives on `architect/engine-and-seats`. Check ALL before saying a wave is missing.**
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST package's INTAKE LEDGER (`20261106-w75-intake-ledger.md` in the w75 zip) — the Owner's words, item by item, with the veto flags
3. The latest UPDATE-README.md / build report / answers doc — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law (shell track)
5. Colors-track law: `architect/engine-and-seats:_agents/owner-notes/` (verbatim Owner rulings) + `inbox/`; council rules on shared machinery: `git show origin/council/base:AGENTS.md`

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-06 (chat ended ~) · sandbox session 30 (recovered once mid-chat — the sandbox
              kept /home/z/my-project whole; the clone, the w73 base and the ledger survived)
WAVE        : wave 75 SHIPPED = the Owner's full w73 review, the final shell wave before the
              76 Pancakes transition. Sixteen asks, all shipped (see the build report): the filled
              selected chip · the toggle chip law (buttons off / board full / on=on off=off) · the
              plain preseason headers · 2 point conversion · (x teams run it) gone · SIM SEASON
              neutral like SIM GAME · light-mode pregame cards (no dark panels) · the box score in
              the score's border · the 0.60 award preset (txM60/--nm60) · the per-round playoff
              cinematics recovered on SIM PLAYOFFS (the storm waits for the last Continue) ·
              DRAFT COMMAND CENTER (rooms below B best→worst, no gauges; CUTDOWN DAY, the pulsing
              CUT badge) · the median-centered rating display scale (76) · BACK TO <STAGE> on the
              five footer pages · the 32-slot guide ladder (TE3 #30, DIME #32) · OFFENSIVE GUARD ·
              the fills "x (-y)" with no FLEX and no side scroll.
ANSWERS     : Muse's w75 briefing answered (20261106-zai-answers-to-muse-w75.md) — M1/M6/M7/M9/
              M11/M14 done in-doc (the BUILD-1+2 verdict: APPROVE AS DRAFTS, DO NOT MERGE YET;
              the reproduction commands + the two-cluster slot-handling hypothesis stated);
              M2–M5/M8 blocked one line each with pre-registrations (the Lab harness is not
              runnable in this sandbox).
PRODUCT     : Football-Sim-Z-post-blue-w75.html · md5 9f990ab74fb0acba9e55b82395e60647 ·
              1,826,882 bytes (base: w73 8b72bf725406637790c0457be3e8d97a, 1,818,133 B, re-verified)
PROOF       : 134 pass / 0 fail — w75 battery 65 (the chip law, the command center, the scale,
              the round cinematics, the bars, the ladder, the cards, no pan at 1280/390, dot law 0)
              · w69 owner 33 · w69 dropdowns 14 · w68 names 14 · w67 teams 8 — all re-pointed at
              the w75 bytes · zero page errors · 25 script blocks node-checked · screenshots in
              the package shots/
LANE        : local zai lane @ wave-75 (the zip carries it; nothing pushed — sandbox cannot)
QUEUE       : the Owner's veto points (the slot-picker −10 FLEX chip · the cutdown 40% games
              floor · the scale's translation door) · the Lab pre-registrations (M2–M5) wait for
              a runnable harness · 76 Pancakes cutover is the Architect-led move
LEDGER TAIL : 20261106-w75-intake-ledger.md §flags — 7 interpretations flagged for veto
LAST ZIP    : z-post-blue-wave75-2026-11-06-w75.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 18: §1 gains the
              list-first wave discovery — the LATEST wave file is found by listing gh-pages,
              never hardcoded; §0 carries the w75 standing laws)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check gh-pages first — the w56–w75 builds live there; w74 carried no product HTML). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 52 = `40613b81…` (1,585,036 B) · the Owner's w54 = `512d1885…` (1,584,527 B) · w70 parity anchor = `79c4a934…` (1,806,245 B) · wave 73 = `8b72bf72…` (1,818,133 B) · **wave 75 = `9f990ab7…` (1,826,882 B)**.

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts, the `zpb_w75.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file). On the Colors track: the Architect owns `colors/src`; the executor seat ships tools/inbox/answers, never engine edits.
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess** — probe the live page for the numbers the build leans on (the w75 ladder/median probe is the pattern to copy).
4. Style guide ten commandments + the do-not-regress ledger + §0's standing laws (shell track). Integers only. No white text.
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
