# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 10 · 2026-11-01 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 9 lives in the w48 package; §3 carries the wave-49 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives.
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — **w41 amendment: every 90+ shimmers (the per-team cap is retired)** — **w43 amendment: the 90+ shimmer is the CONSTANT deep gold (--zshim → --gold3) on every surface and every team; the only exceptions are the two Super Bowl champion surfaces (their own colors, --zshimL/D) and the decorative stars** — **w47 amendment RETIRED BY w48: the constant gold is LITERAL again AS THE W45 SWEEP — the synchronized glow (`zpbshimglow`) and the static-fill overrides are gone; the shimmer is the w45/46 gradient sweep (`zpbshmsweep`, --zshim breathing to --gold2) on every surface and every team** — **w48 amendment RETIRED BY w49: the ANCHOR-chip exception is gone — the chip's name wears the tier law again (90+ sweeps INSIDE the chip on the chip's own deep→mid sweep), and the chip's frame is the W49 ROSE GOLD (border #e2bfae · fill #f9ece4 · ink #6b4634 light; the dark plum untouched)** — **w49 amendment (standing): the comparison lu-cell/pcard sweep breathes PALE to MID gold (`--gold2`↔`--goldm`) — the deep-gold head is retired from that surface because the far side of the matchup read it as flat ink (his Raiders report; the strip's head sat exactly where the right team's glyphs rest) — the generic `.zpb-shm` sweep (deep gold, cream bands, `fxshine`) stands everywhere else** — **w47 amendment (standing, as amended by w49): the Madden rankings light-mode chip is now the ROSE GOLD family, not the gold family (his "delicate rose gold, just barely not white"), dark untouched** — **w44 amendment: an All-Pro FIRST-TEAM name is gold wherever its name is listed in the honors surfaces (the Pro Bowl placement included), fed by the `ap1Names` register**; Cinzel Decorative; the ink pair --txM light / --txd dark is the site's neutral team text ink (**w43 amendment: light reads txM** — **w44 amendment: light's txM is the HALFWAY INK, a 0.50 mix of the page's warm ink and the team's crayola anchor, clamped to L 0.30–0.52 with a 0.22 chroma floor** — **w47 amendment: dark gets its own halfway `txMd` (0.50 mix of the dark page ink and the crayola anchor, L 0.60–0.86, chroma floor 0.25, 4.5:1 vs #181114) — the during-game screen's team ink rides txMd in dark, so DEN reads DEN, not cream; the neutral text stays neutral**); the during-game replay's `color:inherit` law is beaten only by two-class score rules (`.zpb-replay span.zpb-slsc-*`) — never re-lower them; **the theme default follows the computer (prefers-color-scheme) and a device with no signal boots dark — the w32-era unguarded dark selectors must never come back**; the depth-chart rows on the review tab ride the map's beats (w47); the lineup editor's bar reads ↶ UNDO · APPLY THE CHANGES (n) · RETURN TO MODEL LINEUP · REVERT CHANGES and the base-defense toggle stages beside a lineup editor (w47); explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave44-2026-10-31-w44/_agents/zai/ZAI.md | head -60
    git show origin/council/zai:z-post-blue-wave44-2026-10-31-w44/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

Fallback chain: (1) origin/council/zai:_agents/zai/… (2) the newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations) (3) the Owner's latest z-post-blue-*-update-<date>.zip (4) none reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. _agents/zai/ZAI.md (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (_agents/zai/notes/W4x-INTAKE-LEDGER.md) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: git show origin/council/base:AGENTS.md and _agents/START-OF-CHAT.md (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-01 (chat ended ~) · sandbox session 21
WAVE        : wave 49 SHIPPED (the Owner's round-49: the expansion — every 90+ player on every
              page in the shimmering gold; the comparison's far side fixed; the anchor chip's
              frame goes delicate rose gold)
PRODUCT     : Football-Sim-Z-post-blue-w49.html · md5 6bf627b017c1e26281e2bb4fa70d4a60 · 1,548,598 chars
              (base: the w48 bytes d8b64fd7… · the Owner's zip is truth)
LANE        : local zai/lane @ wave-49 (the zip carries the lane; nothing pushed — sandbox cannot)
QUEUE       : EMPTY — the round-49 directive shipped whole (O1 in notes/W49-INTAKE-LEDGER.md)
LEDGER TAIL : notes/W49-INTAKE-LEDGER.md §veto — (1) the w48 chip exception is retired by his
              own words; the rose fill he ordered is what keeps the gold name readable,
              (2) the lu-cell sweep no longer byte-matches w46 — the keyframes, timing and
              gold family are unchanged, only the strip's stops moved and the deep head left
              the surface, (3) --goldm is NEW (light #ad7f2e / dark #c39a4a); champion
              surfaces (--zshimL/D) untouched
LAST ZIP    : z-post-blue-wave49-2026-11-01-w49.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : START/END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 9 → REV 10: §0 carries
              the w49 amendments, the w48 chip exception marked retired)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) ZAI.md "Current work" on council/zai, (c) the newest wave package's CHECKSUMS.txt. If a copy's md5 ≠ §3's and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: w49 = 6bf627b0… (1,548,598 chars) · w48 = d8b64fd7… (1,546,441 B) · w47 = eef6b938… (1,548,267 B) · w46 = aca7fe4f… (1,526,836 chars) · w45 = 9990aa03… (1,522,726 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (asserted patch scripts — the zpb_v4x.py pattern: exact-match replacements + md5 pins + post-checks; a two-stage chain is fine when later copies override earlier ones). Never hand-edit blindly.
3. Verify before shipping: the directive suite (live, Chromium, both themes) + the functional sweep (stress, jsdom) + the prior-wave regression suites — all green (documented superseded audits excepted), zero console errors, screenshots to evidence.
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
