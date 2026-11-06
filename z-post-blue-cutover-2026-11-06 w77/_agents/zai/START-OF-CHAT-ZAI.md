# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 20 · 2026-11-06 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 19 lives in the w76 package; §3 carries the cutover-batteries state. REV 20's workflow deltas: §0 gains the standing battery law, §5 gains the re-pointing pattern (rule 11) and the assertion rule (rule 4 amended) — the two upgrades proposed in the w76 answers.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` (it travels inside the latest package/zip — branch `council/zai` lags; verify by hash, never by location), (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55). The base of every wave = the LATEST wave file (highest w-number with a product HTML) on gh-pages, verified by listing — w74 shipped docs/lab only, so w75 built on w73.**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- **THE SHELL IS FROZEN (counseled w76, holding w76+): no w77 unless the Owner sends a UI fixes list + the five flag decisions.** The shell (w76) is the REFERENCE IMPLEMENTATION — the thing the 76 Pancakes port is verified AGAINST. The batteries, not the code, are what cross the cutover.
- **THE BATTERY LAW (standing since the cutover chat, 2026-11-06): the acceptance battery lives at `_agents/zai/**/batteries/accept.js` with pluggable adapters (`adapters/w76.js` = the frozen reference, `adapters/pancakes.stub.js` = the port's homework). Re-pointing at cutover = filling the adapter, never rewriting assertions. Reference rule: before any acceptance run, the harness must reproduce 84/0 on the w76 bytes with byte-identical labels. The three-run ritual: REFERENCE → ACCEPTANCE → DELTA (see the cutover package's RUNBOOK.md).**
- **w76 (standing, the Owner's round): the DRAFT COMMAND CENTER speaks bare — no section header text (the room cards stand alone), CUTDOWN DAY is a centered Cinzel Decorative subtitle, the footer asks for the 20-0 and the 20-0 SHIMMERS IN THE TEAM COLOR (.zpb-fx-goshine) — the cutdown cards wear the OVR as a badge of the position badge's own class and the SEASON RATING at about the badge size, and the delta ("−N vs his XX OVR") is retired from every card — the slot-picker chip reads just −x (no FLEX anywhere on it; NATURAL keeps its word) — the display-scale median is the NORMALLY-DRAFTED pool's (the top `TOTAL_ROUNDS×32` of the POS_SLOT_MAP-filtered board = 1,024 picks; measured 77), produced ONCE and cached (`window.__zpbMedOvr`), never recalculated per draft — the translation door itself stands as shipped in w75 (backend untouched).**
- **Since w72 the project has two tracks:** (a) the Z-post-blue shell waves (visual laws below govern anything touching them) and (b) the **Colors rebuild** — now named **76 Pancakes** (Owner, w75 chat: "the new final product name for the svelte app"); w75 is "a final w version for the transition". The Owner's directives arrive verbatim in chat or through Muse briefings and owner-notes on the Architect's branch; the intake-ledger rule is unchanged.
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the look-gate releases on ONE clock (.zpb-seen); the awards lead "#X Y"; the Super Bowl is PLAYED; the unit report card singles nobody out — w53/WM: the touch polish, the 38px tap floors, the rankings containment — w55: THE PHONE LAWS — the wrap never shrink-to-fits, the box score is ONE table on the phone, the tab is remembered (zpb:tab), Cinzel Decorative; explanations live in the Guide — **w75 (standing, the Owner's round): the chip law is the TOGGLE MODEL — the position buttons start all OFF while the board is FULL, a lit button keeps its group on the board, a dark one keeps it off, every button off (the default) is the full board, ALL lights all 14 — the selected chip is a FILLED button (the accent + the deep-coffee on-gold ink) in both themes — the four preseason explainers are PLAIN (the WHAT-DO-THESE-TERMS-MEAN pattern, no box) — "2 point conversion" on the preseason page and in the guide; badges and in-season labels keep "2-Pt" — the fills read "x (-y)", never the word FLEX, and the draft board never side-scrolls (measured) — the rating DISPLAY scale is median-centered (`zpbDR`: database median OVR + the raw delta; the backend math untouched) — DRAFT COMMAND CENTER on the shared review (every room below B best→worst as small report cards, no gauges; CUTDOWN DAY = below 80 OVR × kicker-or-higher on the win math × a season under the average line; the CUT badge fades in and out) — BACK TO <STAGE> rides the top and bottom of all five footer pages while the simulator has started — the pregame player cards go LIGHT in light mode (the W68 dark gradient stays in dark) — the award names read `--nm60` (the 0.60 preset) in light, the 0.50 law stays in dark — the guide ladder shows all 32 slots — OFFENSIVE GUARD, never just Guard, in every name label.**
- **The five flags (the Owner's calls pending): veto (b) (the cutdown 40 %-of-games floor — Z.ai's measured view: KEEP, it is sample hygiene, `floor = max(3, round(games×0.4))` — + the TRUE OVR test: KEEP, rules read the book number) · the twin header ("EVERY ROOM AT A B OR BETTER" = the empty state, load-bearing — keep, or collapse the empty section silently) · the U3 casing (the font has NO lowercase letterforms — measured at glyph level 2026-11-06; caps is the only honest render; all-caps typing switches on the swash forms) · the SEASON RATING label (reads right — keep) · the explainer's home (the line already lives in the Guide; delete the retired recap assembly at cutover, never port it).**

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai architect/engine-and-seats main gh-pages
    git ls-tree -r origin/gh-pages --name-only | grep -E "Football-Sim-Z-post-blue-w[0-9]+\.html$"   # the LATEST wave file — verify by listing, never hardcode
    git show origin/gh-pages:z-post-blue-cutover-2026-11-06/_agents/zai/START-OF-CHAT-ZAI.md 2>/dev/null | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'

**Fallback chain** (stop at the first that works):
1. The newest `_agents/zai/START-OF-CHAT-ZAI.md` on **gh-pages** (every package since w55 carries it; the newest package folder wins — verify hashes, never locations).
2. `origin/council/zai:_agents/zai/…` (primary by design — but KNOWN STALE: the branch tip sat at w55 through the w56–w76 era; the courier lags, the zip is the push).
3. **The Owner's own branches: `council/vl` has carried the newest product bytes; the Architect's work lives on `architect/engine-and-seats`. Check ALL before saying a wave is missing.**
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST intake ledger (`20261106-w76-intake-ledger.md` in the w76 package) — the Owner's words, item by item, with the veto flags
3. The latest UPDATE-README.md / build report / answers doc — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law (shell track)
5. Colors-track law: `architect/engine-and-seats:_agents/owner-notes/` (verbatim Owner rulings) + `inbox/`; council rules on shared machinery: `git show origin/council/base:AGENTS.md`

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-06 (chat, after w76's) · sandbox session 32 · fresh clone, state recovered in
              under 3 minutes (council/zai found STALE at w55 → the fallback chain landed on the w76
              package on gh-pages; w76 verified by md5 4f363452… exactly as Muse reported)
WAVE        : NO WAVE. The shell freeze holds — this chat shipped CUTOVER SUPPORT, no product HTML,
              no wave number minted (w77 is the Owner's to spend). Package:
              z-post-blue-cutover-2026-11-06/ — the acceptance batteries + the five-flag views +
              the lane files. The w76 bytes stand untouched (md5 re-verified before and after).
BATTERIES   : SHIPPED AND VERIFIED. batteries/accept.js = the w76 battery's 84 assertions with the
              shell lifted into a pluggable adapter (--file/--adapter). Reference run vs the w76
              bytes: 84 pass · 0 fail, labels BYTE-IDENTICAL to tools/w76/verify_w76.js (the detail
              strings drift because the sim is nondeterministic — proven by running the ORIGINAL
              battery twice; it drifts identically). adapters/w76.js = the frozen reference hooks +
              10 engine snippets; adapters/pancakes.stub.js = the port's annotated homework
              (unfilled key = loud SKIP, exit 3, never a vacuous pass); contract.json = the
              machine-readable contract; CUTOVER-BATTERIES.md = the 84-assertion Owner-law map;
              RUNBOOK.md = REFERENCE → ACCEPTANCE → DELTA.
MEASURED    : the Cinzel Decorative finding — the font HAS 26 lowercase codepoints with distinct
              outlines, but every lowercase letterform is CAP-HEIGHT (w900: c yMax 714 = C yMax 714);
              no x-height exists; the casing choice only toggles plain-caps vs SWASH forms. Caps is
              the only honest render — proven from the TTF, not assumed. (Answers doc, flag 3.)
VIEWS       : 20261106-zai-answers-to-muse.md — veto (b) KEEP (the floor is sample hygiene, the
              TRUE OVR test keeps rules on engine truth) · the twin header KEEP (it IS the empty
              state — load-bearing; silent variant = collapse the section) · the casing: caps, with
              the glyph-level proof · SEASON RATING reads right · the explainer: the line already
              lives in the Guide, DELETE the retired recap assembly at cutover (never port it) ·
              the freeze HOLDS · the M1 relabels ride the Lab pass · the Vite correction noted
              (^8.3.6 already a devDependency; only typescript missing — Claude's line).
FLAGS       : the five await the Owner's call — the views above are INPUTS, nothing applied.
PRODUCT     : Football-Sim-Z-post-blue-w76.html · md5 4f363452a4ad33709244ca08d4ab3b00 ·
              1,830,164 B (UNTOUCHED this chat — the frozen reference; verified at boot and at close)
PROOF       : the reference run (this chat): accept.js vs w76 = 84 pass · 0 fail · exit 0 · labels
              byte-identical to the w76 baseline · zero page errors · 6 evidence shots re-taken
              (cutover/shots/) · the w76 battery itself re-run twice for the nondeterminism proof
LANE        : local zai lane @ cutover-2026-11-06 (the zip carries it; nothing pushed — sandbox cannot)
QUEUE       : the five flags await the Owner · the port adapter (pancakes.js) is the Architect's
              homework, the runbook is ready · the M1 policy relabels ride the next Lab pass ·
              the Lab pre-registrations (M2–M5) wait for a runnable harness · typescript devDep =
              Claude's line
LAST ZIP    : z-post-blue-cutover-2026-11-06.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 20: §0 the battery law +
              the freeze + the five-flag views; §1 the fallback chain re-ordered (gh-pages first —
              council/zai is stale in practice); §5 rule 11 the re-pointing pattern; §4 unchanged)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" in the newest package, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check gh-pages first — the w56–w76 builds live there; w74 carried no product HTML). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 52 = `40613b81…` (1,585,036 B) · the Owner's w54 = `512d1885…` (1,584,527 B) · w70 parity anchor = `79c4a934…` (1,806,245 B) · wave 73 = `8b72bf72…` (1,818,133 B) · wave 75 = `9f990ab7…` (1,826,882 B) · **wave 76 = `4f363452…` (1,830,164 B) — the FROZEN REFERENCE; the cutover chat changed it by zero bytes.**

## §5 · The rules that matter

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts, the `zpb_w75.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file). On the Colors track: the Architect owns `colors/src`; the executor seat ships tools/inbox/answers, never engine edits.
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess** — probe the live page for the numbers the build leans on (the w75 ladder/median probe is the pattern to copy).
4. Style guide ten commandments + the do-not-regress ledger + §0's standing laws (shell track). Integers only. No white text. **EVERY NEW SURFACE SHIPS WITH AN ASSERTION (written law since REV 20): if a surface has no battery line, a refactor can silently retire it — the w76 dead-generator finding is the precedent.**
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** (see END-OF-CHAT-ZAI.md) — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only `_agents/zai/**` and `inbox/` (council convention).
11. **THE RE-POINTING PATTERN (written law since REV 20): the acceptance battery is `accept.js` + adapters. The assertions and their law strings are FROZEN — re-pointing a suite at a new build means writing an ADAPTER (hooks + engine snippets), never editing assertions. Before any acceptance run, re-prove the harness on the w76 reference (84/0, labels byte-identical). The three-run ritual: REFERENCE → ACCEPTANCE → DELTA.**

## §6 · Idle protocol (Owner said "continue" with no new file, or you finished early)

1. Read `PRIORITIES.md` (§1.4) → take the **top OPEN item in your domain** (product build/design/verify).
2. One-line claim in chat (`CLAIM: <ID> · <scope>`), then build it through the full §5 pipeline.
3. If nothing in your domain is OPEN: run one standing chore — reconcile your intake ledger against `PRIORITIES.md` for drift, or re-run the verify suites against the current deliverable and pin fresh evidence.
4. Never sit waiting; never ask "what next?" without first showing §1's orientation output.

## §7 · First reply template (4 lines, then work)

```
READ : ZAI.md (newest package) · this doc §3 · <anything else actually read>
STATE: wave <N> · md5 <first8>… · queue <state> · last zip <name>
PLAN : <what you will do this chat, one line>
```

— Z.ai · read → verify → build → verify → zip → link. Nothing else.
