# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 2 · 2026-10-28 · Maintainer: Z.ai — the **LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT**; everything else changes only when the workflow itself changes.

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory is NOT in your head — it lives in three places you can read: **(1)** this doc's §3, **(2)** your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, **(3)** the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: **3 minutes, then work.**

---

## §0 · Who you are (never re-derive this)

- **Z.ai**, High Councillor seat **ZAI** (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of **Z-post-blue**: a single-file football-simulation HTML (`Football-Sim-Z-post-blue.html`), built wave by wave from the Owner's verbatim directives.
- You are reached by **IM chat**. Your sandbox **can read GitHub (public HTTPS) but cannot push** (no credentials — a push hangs forever; see §5 rule 8). **Your push = the end-of-chat zip**, relayed by the Owner (or Beam via `tools/import-zip.sh zai <zip>` → lands in `_agents/zai/imports/…` on `council/zai`).
- Product law: the Owner's words are law verbatim; style guide "ten commandments" (`deliveries/STYLE-GUIDE-Z-POST-BLUE.md`); integers only; no white text; one shimmer; Cinzel Decorative; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

```bash
# 1 · get the repo (shallow, two refs only — timeboxed, never hang)
mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
# 2 · your state pin (the single most important read)
git show origin/council/zai:_agents/zai/ZAI.md | head -60
# 3 · this doc's latest pushed copy (cross-check its §3 against what the chat context says)
git show origin/council/zai:_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
# 4 · the ranked work list (only if the Owner has not directed you)
git show origin/council/zai:_agents/PRIORITIES.md | head -40
```

**Fallback chain** (stop at the first that works):
1. `origin/council/zai:_agents/zai/…` (primary — updated by import-zip/seat-save)
2. `origin/main:z-core/…` (the Owner's manual push; may LAG — check md5s, see §4)
3. The Owner's latest `z-post-blue-*-update-<date>.zip` — it contains this doc, `ZAI.md`, the handoff, the intake ledger and every deliverable; ask the chat context for its filename, or list `/home/z/my-project/download/`.
4. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. `_agents/OWNER-ROUND-8-INTAKE.md` — the intake ledger; every Owner line must land here before building (add a §, map every item, flag interpretations)
3. `deliveries/HANDOFF-FOR-CLAUDE.md` §0-latest — wave deltas (deeper history only on demand)
4. `deliveries/STYLE-GUIDE-Z-POST-BLUE.md` + `deliveries/REWEIGHT-BRIEF.md` — design law / weights law (§-references suffice unless you touch them)
5. Council rules when working on shared machinery: `git show origin/council/base:AGENTS.md` and `_agents/START-OF-CHAT.md` (their worktree protocol does NOT apply to your sandbox — you clone, you don't `../wt/<name>`)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-10-28 (later session) · sandbox session 22 (web chat)
WAVE        : wave 30 SHIPPED this chat (w29 was the Owner-confirmed baseline:
              my delivered w29 zip, md5 7286495b…, byte-verified before building)
PRODUCT     : Football-Sim-Z-post-blue-w30.html · md5 8d8e1a4bfb0d91849f110071868fc756 ·
              1,367,386 B · built via 61 asserted patch edits (tools/w30_patch*.py in the
              w30 zip) · view layer + the safety-victim engine record — scoreboard math
              untouched
LANE        : zip delivery only (sandbox cannot push); Owner relays / imports
QUEUE       : NEXT WAVE = w31 (Owner law: every html/zip name ENDS with the wave tag).
              All ~26 round-30 directives landed (sage-teal anchor chips, 85+ bold law
              global, AGI/COD/INJ/AWR removed + narrowed browser, name+OVR one line,
              series 7 default, comparison full names + right-aligned Team B + wide menus,
              CBs over the LOS opposite the WRs, Nickel left of Mike, Dime stacked at the
              Nickel, shape key (DT2 square / ILB2+SAM triangles / backs circles), X.Y in
              Cinzel Decorative unbolded, DIME standard row, TE3/WR4/DL5 everywhere +
              DL glossary, postdraft cine −2 s, quarter cards unconditional with 1 s
              dwell, team-colored pbp + beneficiary-colored boxes, X [FF] Y one line, no
              FR on the live screen, X [INT][TD] Y pick-six, X [SAF] Y with victims,
              dark-color lift on the game screen, CAR not C, never SKS, dropdown titles
              caps, shuffled schedule with divisional home+away, SIM GAME button).
              8 interpretations flagged for veto in notes/W30-INTAKE-LEDGER.md
LAST ZIP    : z-post-blue-wave30-2026-10-28-w30.zip (product + intake ledger + build
              report + patch/verify chain + 13 evidence screenshots + this doc + ZAI.md)
NEXT ACTION : Owner plays w30; relay vetoes on the interpretations; TE3/WR4/DL5 math is
              Claude's lane (display slots render empty until then); any build directive
              = intake-ledger first; verify chain = jsdom 83/83 + season stress 25/25 +
              agent-browser screenshots (all green on final bytes)
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md define the chat loop; §3 rewritten this chat```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) `git show origin/main:z-core/01-html/Football-Sim-Z-post-blue.html | md5sum`. If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 19 = `1215639c…` · wave 13 = `0cef8bf7…` (1,247,161 B) · wave 11b = `49ea6f05…` (1,237,864 B) · baseline PreColors = `40233d6b…` (657,486 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts in `_agents/zai/tools/`, e.g. `zpb_v13.py` pattern: asserted exact replacements + payloads + post-checks). Never hand-edit blindly.
3. Verify before shipping: headless suites (v13/v10/v11/v11-B in `tools/`), zero console errors, screenshots to evidence.
4. Style guide ten commandments + 16-item do-not-regress ledger. Integers only. No white text.
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** (see END-OF-CHAT-ZAI.md) — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths (`/home/z/my-project/…`) exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
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
