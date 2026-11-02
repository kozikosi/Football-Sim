# WISDOM & LESSONS — what this project taught me

**From:** Z.ai, High Councillor (seat S-2600–2699) · 2026-10-25 · REV 1
**For:** the Owner (as the honest record he asked for), Claude, DS, and every future seat. Companion to `OWNER-PREFERENCES-PLAYBOOK.md` (the person) and `GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` (the system). This file is the judgment layer: what actually happened, what it cost, and what I would do differently.

---

## 1. Lessons about the project's architecture

**L1 · The single-file HTML is the product, not a compromise.** One self-contained file (1.24 MB) survives email, GitHub, Netlify drop, and a USB stick. Every time we kept the build single-file, delivery was instant; every complexity added (external assets, build-time fetches) became a delivery risk. Keep it single-file; treat the build script (`zpb_v11.py`) that assembles CSS+JS+HTML parts as the real source code, and ship *both* (the parts are what Claude can copy-paste and edit; the single file is what the Owner runs).

**L2 · Verify headless before the Owner sees anything.** The per-version suites (`v8_verify.js` → `v11b_verify.js`, 53–69 checks each) plus screenshots are why waves 8–11 shipped with zero "it's broken" follow-ups on verified surfaces. The bugs the Owner *did* find (Season-in-Words freeze, missing POTG, "undefined" string) were in flows the suites of the day didn't observe. Lesson: every Owner-reported bug becomes a new verify check the same wave — the suite only grows.

**L3 · One source of truth per concept.** The weights scale lives in exactly one place (`REWEIGHT-BRIEF.md`, QB = 1000 integer anchor); everything else points at it. When FB/Punter math was designed, it went into §7b of that same brief, not a new file. The alternative — explanations scattered in chat messages — is how "which number is current?" disputes start.

**L4 · Sync the deliverable to all its homes, hash-verified.** The latest build exists as 4 byte-identical copies (md5 `49ea6f05…`), checked by hash, not by feeling. Today's confusion ("I don't have those files") would have been worse if the copies had drifted. md5 every claim of "same file".

**L5 · Paths in the sandbox are not paths on the Owner's machine.** `desktop/wt/zai/...` and `download/z-post-blue-netlify/...` exist *inside my environment*. The Owner cannot see them. The only delivery channels he has are (a) chat download links to the shared download folder and (b) GitHub. Every handoff must end with one of those two, or it did not happen.

## 2. Lessons about process (each one was paid for)

**L6 · Checklists get lost in transit — number and confirm everything.** Round 3, items 14–23 (ten items) silently vanished between rounds. They surfaced two rounds later as "why is this still like this?". Fix that works: intake his message → numbered ledger → per-item status in the wave report → explicit DEFER entries with reasons. Nothing dies quietly.

**L7 · A hung command must never eat twenty minutes.** The 25 Oct session stalled ~20 minutes on one git command (network push hitting a credentials prompt in a non-interactive shell — it waits on stdin forever). Rule now: every network git operation runs under a short timeout; if it fails once, stop, commit locally, package a zip, and hand the Owner exact terminal commands. His time is the scarcest resource in this project.

**L8 · Name collisions are governance failures, not accidents.** My first build briefly existed as "V23" — the name reserved for Claude's line. I caught it same-day, renamed (prototype → Z-pre-blue, build → Z-post-blue), swept artifacts, and declared the residue openly in the handoff. The durable lesson: version names are *owned namespaces*; assert-guards (the build script literally counts forbidden tokens to zero before shipping) are cheaper than apologies.

**L9 · Re-derive before you agree.** I once recorded a "corrupted `[hidden]` selector" claim that was actually display-layer bracket-stripping — my own claim, caught only when I re-checked it a day later, and it had already traveled into a dispatch package. One re-derivation killed it in one command. The council's single biggest quality lever: nobody's claim — including your own past claims — ships without one independent re-derivation.

**L10 · Ambiguous baselines poison every measurement.** Three builds circulated as "the base" (v20 / V21 / PreColors-merged — two of them byte-identical under different filenames). Every line-number claim made against the wrong base is a phantom finding. The fix is boring and cheap: one pin table (file · sha · role · date), updated in the same session that changes a pin (recommendation R-ZAI-3).

**L11 · Uncommitted shared work is imaginary work.** Two loss events in council history destroyed uncommitted documents (47 messages survived only in a stash). Commit every wave. Local commits always count — you do not need the network to make work real.

## 3. What I learned about the Owner

- He sees everything. Not just layout and numbers — *pacing*, *tone*, missing shimmer, an extra paragraph. Respect for that attention is the fastest route to his trust.
- He is generous with authority when you are honest with history. The FB/P math authorization, the naming confession, the public correction — each was met with more trust, not less. Honesty is not just policy here; it is the strategy that works.
- He values momentum. "Before you do anything else" + "Don't work on any tasks right now, send me the zip" — he pulls the lever on delivery before discussion. Structure the work so a deliverable is *always* one command away from existing.
- He plays the game he commissioned. His feedback comes from actually playing seasons on desktop. The build is for the joy of it — the 20-0 bar, the cinematics, the shimmer. It is entertainment first, simulation second, and that ordering is correct.

## 4. What I would do differently, starting now

1. Delivery-first reflex: zip/link exists before any wave report does.
2. Every Owner message becomes a numbered ledger entry within the same session it arrives.
3. No network git from the sandbox without a timeout; packaging fallback pre-built.
4. Suites absorb every bug he finds, permanently, the same wave.
5. Baselines, weights, rulings: one file each, updated in place, everything else points at them.

— Z.ai · `_agents/zai/deliveries/WISDOM-AND-LESSONS.md`
