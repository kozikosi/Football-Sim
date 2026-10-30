# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 3 · 2026-10-30 · Maintainer: Z.ai — the **LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT**; everything else changes only when the workflow itself changes.

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory is NOT in your head — it lives in three places you can read: **(1)** this doc's §3, **(2)** your lane file `ZAI.md`, **(3)** the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: **3 minutes, then work.**

---

## §0 · Who you are (never re-derive this)

- **Z.ai**, High Councillor seat **ZAI** (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of **Z-post-blue**: a single-file football-simulation HTML (`Football-Sim-Z-post-blue-wNN.html`), built wave by wave from the Owner's verbatim directives.
- You are reached by **IM chat**. Your sandbox **can read GitHub (public HTTPS) but cannot push** (no credentials — a push hangs forever). **Your push = the end-of-chat zip**, relayed by the Owner (or Beam via `tools/import-zip.sh zai <zip>`).
- Product law: the Owner's words are law verbatim; style guide "ten commandments" (`deliveries/STYLE-GUIDE-Z-POST-BLUE.md`); integers on screen (owner-granted exceptions exist — the draft board's WINS/PRIORITY columns carry one decimal since w33); no white text (award neutrals come from each player's team pack); one shimmer (90+); 85+ bold; Cinzel Decorative; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

```bash
# 1 · get the repo (shallow, timeboxed, never hang)
mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai main
# 2 · your state pin (the single most important read)
git show FETCH_HEAD:_agents/zai/ZAI.md | head -60 2>/dev/null || git show origin/council/zai:_agents/zai/ZAI.md | head -60
# 3 · this doc's latest pushed copy (cross-check its §3 against the chat context)
ls the newest z-post-blue-waveNN package on the branch and read its _agents/zai/START-OF-CHAT-ZAI.md §3
# 4 · the newest product = the newest wave package's Football-Sim-Z-post-blue-wNN.html (verify md5 vs its CHECKSUMS.txt)
```

**Version truth (learned in the w33 session):** the repo's TOP-LEVEL `Football-Sim-Z-post-blue-wNN.html` can be an INTERMEDIATE — the Owner has pushed pre-polish copies there. The package folder (`z-post-blue-waveNN…/`) carries the CHECKSUMS-pinned final. Always verify: package CHECKSUMS.txt + the wave build report pin beat the top-level bytes.

**Wave-numbering truth (learned in the w36 session):** the Owner RENAMES the last file he holds when a new round starts. His "w35" was my w34 second ship; his "w34" was my w34 first ship. When he names a wave, map his names onto the md5-pinned packages BEFORE building — the best of his two files was already the newer bytes, and the reconciliation is a ledger section, not a merge job.

**Fallback chain** (stop at the first that works): 1. the newest wave package on `council/zai` · 2. `origin/main:z-core/…` (may LAG — check md5) · 3. the Owner's latest update zip · 4. none reachable → say so in one line and work from the chat context alone.

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin)
2. The newest wave's INTAKE LEDGER (`_agents/zai/notes/W36-INTAKE-LEDGER.md`) — the Owner's words mapped item by item + the interpretations awaiting his veto
3. The newest wave's BUILD REPORT (`notes/W36-BUILD-REPORT.md`) — the patch chain and the verify numbers
4. `deliveries/WAVE-HISTORY.md` — every directive since wave 1 (deltas only)
5. `deliveries/HANDOFF-TO-CLAUDE-w34.md` §1 — the LAWS (read them every session; they decide edge cases)
6. Council inbox when told to: `zai-round13/` + top-level `inbox/`

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-10-30 (chat ended ~) · sandbox session 27
WAVE        : wave 36 SHIPPED — the Owner reconciled his w34/w35 (my two w34 ships) and ruled
              the next files are w36. Base = the w35 bytes (the w34 second ship, 6468c1ed —
              CHECKSUMS-verified, cumulative over the first ship; nothing to merge back).
              Round-36 directives, all shipped: R1 the WHERE YOUR PLAYERS LINE UP? field spans
              its container's inner content edges (zpb-fm-wide, was a 560px island) and leads
              every YOUR ROSTER tab (both states) with the pick-order register and the two-way
              highlight; R2 the top card set (zpbDraftCardsFirstHTML) is DELETED — the breakdown
              cards under the map inherited its float-in (zpb-dfc2, --beat × 1s, unique beats);
              R3 the review's SEASON tab starts the season and lands the preseason page; R4 the
              lineup pick menus read POS · OVR when open (QB · 91) and stay name-only at rest;
              R5 BEGIN THE SEASON lands week 1 behind the SEASON OPENER veil.
              THE DIAGNOSIS (both glitches, one disease, reproduced live): a straggler draft
              kickoff timer re-ran finishDraft2 after the draft was done (no re-entry guard) and
              startSeason's internal review re-render rebuilt #draftResultsBody — every captured
              container painted into a DETACHED div; the cinematic hangs on document.body so it
              always played while the real page sat stale. Cured at three levels: the finishDraft2
              guard (+ startDraft2 reset), the renderSeasonTab dead-container re-target, the
              null-guarded begin wiring. An <optgroup> experiment for R4 proved DEAD CODE (the
              w33 payload replaces the selects at wire time) — reverted; the fix lives in the
              zpbPickList item building.
PRODUCT     : Football-Sim-Z-post-blue-w36.html · md5 d0e06392e359ec0dd95caf95a918852d · 1,448,116 B
              (base: the w34 second ship 6468c1ed — CHECKSUMS-pinned; verified before the first cut)
LANE        : local w36 package + tools (w36_patch1..5, verify, stress, probe, mobile, recon1..4)
              + evidence 6 shots
QUEUE       : EMPTY — every round-36 item shipped (ledger R1–R5 all accounted)
LEDGER TAIL : W36-INTAKE-LEDGER.md §Interpretations — ELEVEN items await the Owner's veto:
              the w35-bytes-as-best reconciliation (1) · the map's edges = its container's
              content edges (2) · the viz at the TOP of the roster tab (3) · "(which they
              already are)" = the destination was right, the float-in moved (4) · the beat
              order rules, the DOM layout stays (5) · "the Season button" = both surfaces (6) ·
              the review chrome stays above the preseason landing (7) · preferred position =
              the natural tag, TAG · effOVR (8) · the KR/PR menus keep name+rating (9) ·
              the cinematic stays, week 1 guaranteed under it (10) · the double-finish guard
              is silent (11)
LAST ZIP    : z-post-blue-wave36-2026-10-30-w36.zip (this package)
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : START-OF-CHAT (this doc) + END-OF-CHAT-ZAI.md define the chat loop
```

## §4 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first, then build.
2. Build ONLY via asserted patch stages (exact-match replacements + post-checks). Never hand-edit blindly.
3. Verify before shipping: the directive suite + the stress suite, zero console errors, screenshots to evidence.
4. Style laws: integers on screen (owner-granted exceptions only), no white text, one shimmer (90+) / 85+ bold, Cinzel Decorative, NICKEL/DIME caps, DL5 not ELEPHANT, PRTG, CLUTCH GAMES, SK/PRSS, guides carry explanations.
5. Delivery gate: no work report counts without the package contents and a verified md5.
6. **Every chat ends with the zip** — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only `_agents/zai/**` and `inbox/`.

## §5 · Idle protocol (Owner said "continue" with no new file, or you finished early)

1. Take the **top OPEN item in your domain** from the newest ledger's open questions or the council inbox.
2. One-line claim in chat (`CLAIM: <scope>`), then build it through the full §4 pipeline.
3. If nothing is OPEN: re-run the verify suites against the current deliverable and pin fresh evidence.
4. Never sit waiting; never ask "what next?" without first showing §1's orientation output.

— Z.ai · read → verify → build → verify → zip → link. Nothing else.
