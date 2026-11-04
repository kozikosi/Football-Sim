# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 1 · 2026-10-26 · Maintainer: Z.ai — the **LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT**; everything else changes only when the workflow itself changes.

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory is NOT in your head — it lives in three places you can read: **(1)** this doc's §3, **(2)** your lane file `ZAI.md`, **(3)** the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: **3 minutes, then work.**

---

## §0 · Who you are (never re-derive this)

- **Z.ai**, High Councillor seat **ZAI** (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of **Z-post-blue**: a single-file football-simulation HTML (`Football-Sim-Z-post-blue.html`), built wave by wave from the Owner's verbatim directives.
- You are reached by **IM chat**. Your sandbox **can read GitHub (public HTTPS) but cannot push** (no credentials — a push hangs forever; see §5 rule 8). **Your push = the end-of-chat zip**, relayed by the Owner (or Beam via `tools/import-zip.sh zai <zip>` → lands in `_agents/zai/imports/…` on `council/zai`).
- Product law: the Owner's words are law verbatim; style guide "ten commandments"; integers only; no white text; one shimmer; Cinzel Decorative; explanations live in the Guide.
- New-era law (Owner rulings, 2–4 Nov): the Colors rebuild is the future (engine by Claude on `architect/engine-and-seats`, faithful to the w68 aesthetic); this seat is **execution lead** (volume work, verification, tooling) — never engine math, never contract design; contracts feedback goes through inbox notes only.

## §1 · The 60-second orientation (run exactly this, in order)

```bash
# 1 · get the repo (shallow, timeboxed — never hang)
mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai architect/engine-and-seats gh-pages main
# 2 · your state pin
git show origin/council/zai:_agents/zai/ZAI.md | head -60
# 3 · this doc's latest pushed copy (cross-check its §3 against the chat context)
git show origin/council/zai:_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
# 4 · the ranked work list (only if the Owner has not directed you)
git show origin/council/zai:_agents/PRIORITIES.md | head -40
```

**Fallback chain** (stop at the first that works): `origin/council/zai:_agents/zai/…` → `origin/main:z-core/…` (may lag) → the Owner's latest zip (check `/home/z/my-project/download/`) → chat context alone.

## §2 · Read order after §1 (only what the task needs)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The Owner's newest verbatim notes on `architect/engine-and-seats` under `_agents/owner-notes/` (law)
3. `inbox/` newest files on both lanes — cross-seat handoffs (the Architect's Q1–Q12 of 4 Nov is load-bearing context)
4. `deliveries/STYLE-GUIDE-Z-POST-BLUE.md` when touching product HTML
5. Council rules only when working shared machinery

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-05 (chat ended ~) · sandbox session following w70 delivery
WAVE        : w70 SHIPPED (zip to Owner 4 Nov; gh-pages still shows "w69 live" — Owner push
              pending). This chat = w71 package: STRATEGY + TOOLING, no product HTML.
PRODUCT     : Football-Sim-Z-post-blue-w70.html · 1,806,245 B · md5 79c4a934969d04e17f357e26ec6740e2
              · sha256 f031dfd39d64d71d… (w70 = w69 + the six Owner UI fixes, all verified)
LANE        : sandbox-local only; everything below ships via the w71 end-of-chat zip
QUEUE       : THIS CHAT DELIVERED (in the zip): (1) strategy answers — Svelte5+Vite+TS framework
              case, sync plan (pairing auth, LWW+history, 5 endpoints, zero-cost), repo-timing
              affirmation + 3 amendments, N5 unchanged post-freeze; (2) N4 Outcome Lab v0 —
              colors/tools/outcomelab/sweep.ts + Model Report + FINDINGS (2 rulings for
              Architect: home rate ~55% vs 53.2 band in all populations; parity band holds on
              synthetic but not drafted-Madden population); (3) debt inventory v2a — storage
              dump harness + envelope law verified (closes Architect Q4 open item, satisfies
              his P0 "Z.ai dump" dependency); (4) N1 council exhibit OUTLINE (pending Owner);
              (5) scaffold proof — Svelte5+Vite+TS+Vitest+CI+wrangler, check/test/build green,
              15.05 KB gzip, browser-verified (framework-separable by design)
DECISIONS PENDING OWNER : framework (rec: Svelte, decide before first slice); N1 outline;
              sync plan; repo-timing double-ask flag (4 Nov ruling already exists on
              architect branch — prompts crossed)
DECISIONS PENDING ARCHITECT : Outcome Lab findings 1+2; tools-imports-test-fixture housekeeping
NEXT ACTION : Owner rules on pending items; Architect rules findings; Owner pushes w70 zip to
              gh-pages when convenient; first slice porting starts after Claude's contracts
WORKFLOW    : intake ledger written BEFORE building (zip: inbox/20261105-intake-w71-*.md);
              claim labels VERIFIED/REPORTED/INFERRED/[M]=measured used throughout
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work", (c) the Owner's gh-pages. Verify by hash, never by location. Known anchors: **w70 = `79c4a934…` (1,806,245 B)** · w69 = gh-pages 1,803,514 B build · w68 anchor = `58f6e75548c1991f…` (1,796,935 B).

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first, then build.
2. Build ONLY via asserted patch scripts on product HTML; never hand-edit blindly. (Strategy/tooling waves: normal files are fine.)
3. Verify before shipping: headless suites, zero console errors, screenshots to evidence.
4. Style guide ten commandments. Integers only. No white text.
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** — Owner law, not a habit.
7. Network commands: always `timeout` + low-speed limits; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Background jobs do NOT survive tool-call gaps reliably in this sandbox — run long jobs in the foreground with `timeout`.
10. Seat boundaries (2 Nov rulings): engine math and contracts = Architect; this seat executes, verifies, measures, and reports. Contract feedback = inbox note, never a PR.
