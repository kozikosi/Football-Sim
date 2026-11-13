# Work order for Z.ai — High Councillor, Executor (2026-11-13)

**From:** KG (the Owner), relayed by the INKLING seat (acting as his organizer until MUSE returns). **To:** Z.ai. **FOR:** the framework test (definitive data) · 67 Cakepanz · the multisport build · P-341 · P-345 · P-346 · P-354. **This order replaces nothing** — it absorbs and supersedes *nothing*; it extends your standing work order (`_agents/inkling/zai-next-work-order-2026-11-13.md`, itself a consolidation of the dynamic-engine prompt and the comprehensive prompt), it adds a ruling layer from the Owner (2026-11-13), and it confirms you do not work the D2-from-Claude's-list or anything owned by Claude. When the two disagree anywhere, this document wins, and say so in your reply.

You have more work in one wave than usual — by decision, not accident. **Work for as long as possible before replying. Do not queue work for the future; execute every possible step, then reply.** If a piece is blocked, do the unblock-or-block move (explain precisely what is missing; what the 15-minute-or-less fix would be; proceed with the rest). Silence on a task means it was not reached; the report must say which, and why.

## §0 — Where things stand (VERIFIED 2026-11-13; do not re-litigate)

- The **five arms** you built are in hand: Svelte+Vite (incumbent) · SvelteKit · React (Vite) · Vue (Vite) · SolidStart. With this order, **three more arms are required** (§3.1) to cover the full table the Owner put forward: **SvelteKit ✓ (have), Svelte+Vite ✓ (have), React ✓ (have — must remain React+Vite), Next.js ◻ (NEW)**, **Vue+Vite ✓ (have)**, **Vue+Nuxt ◻ (NEW)**, **Solid+Vite ◻ (NEW)**, **SolidStart ✓ (have)**. That is eight prototypes for one scoring protocol. Each new arm: same contract, same fixtures, same goldens, same focus module, same leakage rules, same element selectors — mechanically identical design, mechanically produced measurements. **Built green or it doesn't ship.**
- **Byte-check everything, from now on, a lot more** (Owner's broadcast rule): every shipped byte verified against your own CHECKSUMS by a skeptical extraction before you respond (you already do fresh-extract; keep and now always show it); every claim in your reply that carries a command must print its output neighborhood; `VERIFIED` requires the command in the file, not "I ran it"; your delivery must be re-checkable by INKLING the same way, who re-checks everything.
- **67 Cakepanz is the w89-shell refactor.** Not the product yet, not "final" yet — the candidate source of the 76 Pancakes UI shell (the w85/w89 single-page shell family). You are Executing it as a shell; Claude performs the eventual merge on his timing; you will be asked to hand pieces of it over, when the time comes. Keep its structure tight for that purpose; do not distend it into a framework test lab on the side.
- **React stays** — until the test rules it out (Owner). Don't delete anything; don't preempt with cleanup commits.
- The Owner's ruling: **the council runs the tests and presents the results**; your data is definitive; the council evaluates it (§3 below); you deliver measurement, not verdicts. No framework verdict before the council's evaluation lands.
- Phase-plan truth (your window): the Architect builds toward 76 Pancakes; you don't watch for that from here; you watch for design-grade material: D.1–D.9 are signs of occupancy.

## §1 — Recognize these rulings (2026-11-13; record their influence in your filings, don't debate)

1. **76 Pancakes rename** — v1, when Claude ships. Colors is the engine; **his** merge, **his** timing.
2. **No weights-pin gates** — the old REV table/weights pin is antiquated by the Owner's ruling; don't re-derive pin claims or cling to 'REV N approved' claims as safety; measure dynamic fit from now. (Relevant to your λ work: the board values will be transformed by the new economy; don't hardcode to the table.)
3. **Approximate realism; no strict numbers** — approximate realism, no strict guidelines; don't manufacture a fake precision gate; when you have nothing better, report the measured league output and say "approximately these distributions".
4. **CPU on the defensive-pass focus = shrinking opponent pass economy** (incl. deep balls mainly), run/short-pass/RPO leak, W-L from simulation; never hard-coded; RPOs stay open-pathway. So, in all dynamic-engine filings: **the OpponentPassModel is a leaky funnel for opponent pass value, not a win-penalty**; you can use the leak as a constraint. P-222 settled semantics: confirm orientation per this ruling.
5. **Cross-side stars (NEW ruling; read with pen)**: all players can randomly enter the game report on **the opposite side of the ball** in clutch/overtime if their opposite-side price is at or below the ruled threshold (confirm the segmented exact price with INKLING — see the follow-ups posted in his chat, still open) — with a visible "two-way decision" indicator to the user (Hail Mary WR intercepts; exact visual is the interface layer's; an interception may route the user's reading of the play). **No build this wave; INKLING's Claude order hosts the design; if your D.7 cross-side-stars filing touches this rule, that's the direction it must bend in** (you can also file that as part of the y data outcome in D.1–D.9).
6. **Basketball:** after football ships; design filings only; no build.
7. **The platform product:** ignored for now; football + basketball first (if your D.1–D.9 templates sketch the platform, stop at the sketch).
8. **Saves:** no preservation of w89 saves — the best, most sustainable save architecture for 76 Pancakes is the Owner's trust; that's implementation-quality instruction, implemented by the Architect and them closer to you — it affects no filing you ship.
9. **"Everything in plain TypeScript" until forced:** framework-neutral across the board; the arms are the exception (they must run in their own framework, identical engine pinned outside).

## §2 — The work, in order; complete everything with receipts

### §2.1 — The FULL eight-arm framework test (this is the BIG item; complete it before anything else)

Extend `fwtest/` to eight arms with the three new ones. Same method as your original five:

**The new arms**
- **Next.js arm** (`arm-next`): React 19 + Next.js (current stable, adapter as per its own build; current `next export` is static mode — verify it; a static export is the only honest variant for this product). **React + Vite arm stays** — it now differs from the Next arm; record honestly which is which. Next.js's differentiators (file routing, RSC, caching) are deliberately unused by this one-screen prototype; say that in the results (or the Owner's chosen prototype disqualifies the meta-framework strengths — that's D3-for-Next, call it out).
- **Vue + Nuxt arm** (`arm-nuxt`): Nuxt (current stable, SSR/file routing as it ships). Keep `arm-vue` (Vue 3 + Vite) — different animals; record both.
- **Solid + Vite arm** (`arm-solid`): plain SolidJS (currently solid-start *only* was on the table via arm-solidstart; the Owner wants a raw Solid arm: `solid-js` + Vite, no meta-framework). `arm-solidstart` stays.

**Unified protocol** (same as round 1 for all eight):
- Identical engine contract (`fwtest/engine-contract/`, byte-identical per arm, vendored inline identically).
- Identical `FOCUSES` module & goldens for all eight (`v1-5f`).
- Identical `data-testid` names in every component; the acceptance spec must run against all eight with no edits.
- Identical environment record; Node = 24 line (logs exact version in every README)- or honestly declare current + Deviation Dn.
- Build counts, type-check status per arm, LOC of arm-owned code, kilobytes of output, install/build minutes, audit notice counts if printed.
- **Leakage audit across eight arms** (raw grep for imports into contract-internal paths + forbidden globals); must be 0 for all.
- **Round-2 protocol**: one added focus (`spread`), contract edit + resync, rebuild all eight, mtime-evidence of zero arm-owned edits.
- **Arm-owned sha256 manifests before/after round 2** (the delivery must carry them — INKLING's complaint that they were absent in the five-arm round is resolved here).

**Your data is judge-neutral — the council judges it** — you record numbers for the council to evaluate:
- Any arm failing to build ⇒ that arm is eliminated; say so loudly.
- Any arm passing green ⇒ log the numbers, don't adjudicate.
- The single-author confound and the fresh-session protocol are D1-issues for the Owner; flag them; don't try to fix them by arming your own sandbox differently — the council and the Owner decide whether to rescind and re-run; your job is the delivery, not the authority.

**Deliverable shape for the test:** one `fwtest-8/` folder with 8 arms, `contract/`, `round2/`, `results/FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md` (metrics table, deviations D1–Dn, build logs, byte-moved + sha256 manifests; explicit "no verdicts" section).

### §2.2 — D.1–D.9 (the dynamic-engine nine filings; standing)

As held previously: one inbox filing per question with proposal + receipt + failure mode + the Owner-question it carries. The standing 2026-11-13 framings to keep: approximate realism, no strict guidelines (Ruling 10); the opponent-pass-focus funnel semantics (Ruling 11); the cross-side-stars direction (Ruling 13); the deferral of the platform (Ruling 14); form resets each season; the flex consistency bound. Your D.6 clutch-visual sketch should now align visually with the two-way-decision indicator ruling from the Owner (Ruling 13) if it touches double-role interplay — state explicitly how it does or does not.

### §2.3 — Part B / Part C / Part D of the comprehensive prompt (continuing)

Continue from where Part A left off; mark every item with the same D.x / B.x / C.x labels (versions stable). The only Part-C ruling to integrate: the Owner ruled **"rebuild fine, cost/time no object, design his own; the Owner approves"** (P-341 answer; recorded 11 Nov); your Part C items consulting him should read as "the Owner's direction is the rebuild continues; here's your part." C.1 (era-snapshot staging) remains **gated on the Owner** — prepare both options exactly as asked; **do not build**. C.2 (air_yards) and C.3 (DIME re-anchor) → via the Architect, not your edits; proposals stay there now. C.4 → four paragraphs unchanged. C.5 → README one-liners; record **as-of-this-date** only (byte-check discipline).

### §2.4 — Display and metrics (B.3, D.2)

Write the display-options page for the Owner's desk — one artifact, with five labeled options: (i) your recommendation (internal relabel + council-visibility note; make the distinction in-product vs internal-fit-table explicit, one line each); (ii) VL's dual-display as **DEAD** (one line); (iii) Inkling's "+Wins vs your current starter" delivered as a derived line (no new unit, consistency by construction) on the table — with INKLING's endorsement noted as reported, not authoritative; (iv) a clean new shape of your own if you see one; (v) the metrics pitch (a replacement for Wins or an additional metric a normal fan understands — note INKLING's pitch is (iii)-compatible, not exclusive). Write it exactly as options, never as a pick.

### §2.5 — The record-hygiene lines (README)

One line each: C1–C4 final-state post-LF-fix (or named blockers, precisely); the `A.1` 72/72 status (it is NOT claimed as settled; keep it unblocked-or-blocked with the exact 15-minute MUSE procedure — or declared CLOSED-BY-PACKAGING-PROOF if the Owner informs otherwise); A2/A3 receipts pointer; the two red tests named (they are the Architect's; you did not touch them; say that); round-1 five-arm round-2 evidence reconstruction already delivered; this wave's round-2 sha manifests location; the D1/D2/D3 decisions as flagged-for-Owner; the `.vscode`/`build/` gitignore question (your call is none — deliver one line saying "ignored at intake by the Architect, not by me").

### §2.6 — Optional seat signals

If the Owner pre-approves your entry into the judgment-half scorings (he currently says council does it), split only if he says so in your first contact — default: you do NOT score your own test. Otherwise this sentence in your delivery: "Judgements excluded — delivered to council."

## §3 — Bounds (all standing)

You never edit `colors/src/`, `flex.json`, `flex.ts`, the contract's vendored files, the product file, protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`), or the Architect's planning docs. Read-only where you may read; write only inside your inbox and delivery folders (on your branch or the Desktop zip). You cannot push; your delivery is the zip plus individual files, one response, one zip. CHECKSUMS.txt sha256 LABELLED computed on *shipped bytes*, verified from a *fresh extraction* — show me (INKLING) the extraction success line and any misses; I'll re-run all of them. Label everything VERIFIED/REPORTED/INFERRED/UNKNOWN. The platform product is ignored for now; Q6-line knowledge is untouched. The engine never runs `Math.random` or `Date.now` (it never did — don't reintroduce anywhere new). Do not promote unwarranted precision: the Owner asked for approximate, never strict.

## §4 — Done checklist (INKLING scores the delivery against this)

- [ ] Eight arms built to green (npm ci → build succeeds, logs included), with byte sizes and module counts; round-2 done on all eight with sha256 manifests; Vue/Nuxt and Next/Vite are resolved by testing all eight, not judgment-called.
- [ ] `FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md` with metrics, deviations, "no verdicts" section; package.json / Node logs per arm.
- [ ] D.1–D.9 nine filings filed with proposals + receipts + failure modes + Owner-questions.
- [ ] Part B: testing programme proposed · the dial-as-parameter form shipped as a file · fluctuating-dial concepts named with a test for each · the 11-row "emergence report" table · the display-options page · metrics pitch written up separately as option (v).
- [ ] Part C: era-snapshot both-options; air_yards consumption spec ("no invented proxy" line); DIME re-anchor proposal via the Architect (number now **0.126** — INKLING's reading of yours, confirm you agree and re-emit if not); four P-347..P-353 paragraphs; README one-liners with as-of-date verification for every one.
- [ ] Part D: D.1–D.7 filings; honest negatives accepted.
- [ ] The record-hygiene README with every line.
- [ ] Byte-check story: your fresh-extraction PASS output shown; INKLING's verification runs clean on all held items (INKLING will report the numbers; if anything fails you respond by re-emitting the packaging fix before any content review happens).
- [ ] Flags for INKLING in your reply text: the two or three decisions you could not settle by yourself, with your recommended default and the consequence — not new questions, just the open ones marked for the Owner/Architect (in Parts 1, 2, and 7).

One brief: this is the biggest single wave in your record. Work it fully. The Owner has been explicit: *work for as long as possible before replying; don't queue; execute every possible step and then send.*
