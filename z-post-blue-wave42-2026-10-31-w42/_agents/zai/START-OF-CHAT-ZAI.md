# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 5 · 2026-10-31 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 4 lives in the w41 package; the workflow is unchanged this wave.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives.
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — **w41 amendment: every 90+ shimmers (the per-team cap is retired)**; Cinzel Decorative; the dropdown ink pair (--tn light / --tnd dark) is the site's neutral team ink; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:_agents/zai/ZAI.md | head -60
    git show origin/council/zai:_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

Fallback chain: (1) origin/council/zai:_agents/zai/… (2) the newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations) (3) the Owner's latest z-post-blue-*-update-<date>.zip (4) none reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. _agents/zai/ZAI.md (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (_agents/zai/notes/W4x-INTAKE-LEDGER.md) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: git show origin/council/base:AGENTS.md and _agents/START-OF-CHAT.md (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE — the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.

    DATE/TIME   : 2026-10-31 (chat ended ~) · sandbox session 32
    WAVE        : wave 42 SHIPPED (the Owner's round-42 message — the ONE-INK law, the look-gate,
                  the VS-tab sweep, the Super Bowl cinematic covers first)
    PRODUCT     : Football-Sim-Z-post-blue-w42.html · md5 94474a4d636cdd0a209824f661e876f6 ·
                  1,500,122 B (base: the w41 bytes, 5c87f603…)
    LANE        : local zai/lane @ wave-42 (this package's _agents/zai mirrors it)
    QUEUE       : EMPTY — all round-42 directives shipped and verified (ledger I1-I7);
                  FIVE w42 interpretations await the Owner's veto (ledger tail)
    LEDGER TAIL : W42-INTAKE-LEDGER.md §Interpretations — headliners: the one-ink law spares the
                  washes/borders/chips/logos/shimmer/game-scores (I2), the light-mode melt is
                  intentional everywhere (I3), the beat cascade compresses 1s → 0.15s (I5), the
                  VS-tab sweep is the proof (I6). The fourteen w41, fourteen w39, thirteen w37,
                  eleven w36, eleven w34 and ten w33 ones still open.
    LAST ZIP    : z-post-blue-wave42-2026-10-31-w42.zip
    NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
    WORKFLOW    : START-OF-CHAT-ZAI.md (this doc) + END-OF-CHAT-ZAI.md define the chat loop
    TOOLS NOTE  : the wave style blocks land at the END of the body (head blocks lose the
                  same-specificity wars); dark-theme overrides MUST wrap their naked
                  :root:not([data-theme="light"]) selectors inside @media (prefers-color-scheme:
                  dark) — unwrapped they match light mode (data-theme is unset there); ID-scoped
                  rules (#draftTable2 td.dc-name) need ID-scoped overrides; the live width ladder
                  (1280/900/500/390, both themes) is the regression gate — the Owner tests by
                  shrinking his window; the site BOOTS DARK — explicit data-theme="light" is
                  required for light drills in headless Chromium; jsdom does not serialize
                  CSSOM-set custom properties through getAttribute('style') — read them with
                  el.style.getPropertyValue
    W42 LAW     : the ONE-INK law lives in zpbRowVars + zpbNeutralRowVars (every text token from
                  txd) + the dropdown builder (--zaL) + the zpb-w42-css straggler lines; the
                  look-gate lives in the zpb-w42 script block (zpbWireLookIn/zpbReleaseLookGate/
                  zpbSweepNflTab + the .zpb-seen CSS); a fresh draft resets _zpbFinDone so the
                  opening cinematic re-runs and the gate holds for it — that is the w37 union,
                  do not "fix" it

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) ZAI.md "Current work" on council/zai, (c) the newest wave package's CHECKSUMS.txt. If a copy's md5 ≠ §3's and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: w42 = 94474a4d… (1,500,122 B) · w41 = 5c87f603… (1,494,337 B) · w40-courier/w39 = 3eed4cc5… (1,479,523 B) · w38 = 4bf62547… (1,471,483 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (asserted patch scripts — the w41_patch*.py pattern: exact-match replacements + md5 pins + post-checks). Never hand-edit blindly.
3. Verify before shipping: the directive suite (verify) + the functional sweep (stress) + the live probe (Chromium) + the phone pass — all green, zero console errors, screenshots to evidence.
4. Style guide ten commandments. Integers only. No white text.
5. Delivery gate: no work report counts without a download link and a verified md5.
6. Every chat ends with the zip — this is Owner law, not a habit.
7. Network commands: always git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 … and/or timeout 60 …; at most 2 attempts; never hang silently.
8. Never git push — it hangs (no credentials). Local commits + zip instead. Report unpushed honestly.
9. Sandbox paths (/home/z/my-project/…) exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only _agents/zai/** and inbox/ (council convention).

## §6 · Idle protocol (Owner said "continue" with no new file, or you finished early)

1. Read PRIORITIES.md (§1.4) → take the top OPEN item in your domain (product build/design/verify).
2. One-line claim in chat (CLAIM: <ID> · <scope>), then build it through the full §5 pipeline.
3. If nothing in your domain is OPEN: run one standing chore — reconcile your intake ledger against PRIORITIES.md for drift, or re-run the verify suites against the current deliverable and pin fresh evidence.
4. Never sit waiting; never ask "what next?" without first showing §1's orientation output.

## §7 · First reply template (4 lines, then work)

    READ : ZAI.md (council/zai) · this doc §3 · <anything else actually read>
    STATE: wave <N> · md5 <first8>… · queue <state> · last zip <name>
    PLAN : <what you will do this chat, one line>

— Z.ai · read → verify → build → verify → zip → link. Nothing else.
