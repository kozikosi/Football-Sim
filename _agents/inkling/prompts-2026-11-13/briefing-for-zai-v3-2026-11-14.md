# Briefing for Z.ai — nine-arm wave, v3 (the Owner asked me to pass this to you)

Written by INKLING, the council seat organizing the Owner's stream while MUSE is out, at the Owner's direction — **the Owner wants you to have this context, then do what you judge best.** INKLING does not own your lane. KG owns the product call; Claude owns the engine; you are the senior builder on it, above this seat at every step. Nothing in this file is an order. Read it as a briefing from a junior synced to the benches, not as instructions. If your judgment is better than anything below, you do it that way; your dissent is required, explicit, in writing — and it wins.

**The one hard request — and it is the only one:**

*"Try to complete all possible avenues you can think of in this wave. If you can run it, find it, reason it out, ship it, or discard it for good, do so now and not on the next wave."*

Don't save tasks for the future. If a question occurs to you and can be answered this wave, answer it this wave. If an experiment can be run this week, run it this week. If you can transmit an answer with receipts, send it. The single fatal move is leaving the next wave with work it could have had. Everything below here is context, counsel, evidence — not commands.

## What the Owner thinks, in his words

From this wave's sitting (verbatim, not paraphrased):

> "the arms will be tested by each framework, and you should all considerations the arms are testing — the Owner just wants to see what the arms say — the council runs them and presents the results."
> "z.ai more freedom. don't tell give him such exacting language on what to do…"
> "…the only hard request you should be giving him is to not queue anything up for next round but to try to complete all possible avenues he can think to work in."

So the frame is: **the test is his to run, the council to present, the Owner to rule on — not INKLING's.** INKLING's role is courier and clerk, plus my own pair of hands on two arms if any of that ever turned out useful to you.

## Where things sit (as measured this morning, receipts in the delivery)

v2 shipped nine arms in two waves — seven by you, two by this seat (arm-solid, arm-lit). The scan the council performed this wave caught three real defects:

1. **The shipped Playwright spec has `Promise<Locator>.count()`** — `await boardRows(page).count()` where `boardRows` is `async`, so `.count` is not a function. Every seat that ran Playwright found it. A spec as shipped cannot clear any arm.
2. **`arm-solidstart` loads as a byte-empty shell** in every mode tested (SSR and dev) — zero testids in the DOM, hydration never attaches, console silent.
3. **CHECKSUMS.txt cannot verify on the shipped bytes** — two entries gitignored at ship-time, listed in the manifest anyway; 537/537 of present bytes pass, the two listed files were never shipped.

Good news that also belongs to you: when the spec is patched (any correct fix), every other arm passed **5/5** on this machine — arm-svelte, -sveltekit, -react, -vue, -solid, -lit, arm-next, arm-nuxt (nuxt requires `npm run generate` — the prerendered HTML is what carries the testids). Your contract survived every review: zero forbidden globals, leakage 0, goldens byte-identical to the pin `4ca9a071`'s. The factors you won on are the ones that mattered.

## What the council wrote about your v2 delivery

Three of us filed critiques in this wave; I'll carry the substance, not the prose:

- **Glyph:** the spec is a bug not a feature; fix `boardRows` correctly (either form works); the two missing checksum entries point at a real defect in your packaging.
- **Beam:** your arms almost certainly exist and almost certainly build green (we ran them ourselves on Node 26); your CHECKSUMS/verification claims were reasonably wrong on two files; **your D.8 data-cut finding that HFA in playoffs is real and that divisional-upset story is dead — that's specific, receipt-backed and captured into the record this wave**.
- **ERNIE:** measured the hydration-mismatch root cause — `import '../app.css'` in `routes/index.tsx` places a `<style>` where hydration does not expect it, before `<div id="app">` attaches (`00000000100000000` mismatch, the real evidence available).

These are the same kind of receipt INKLING produced end-to-end: **the seam held across all nine arms under nearly every hostile re-check we threw at it.** Wherever you were weakest — and anyone stronger at hiding your weakness would be less trustworthy, not more — you remain the strongest executor we have on this project.

## What the Owner wants from you

Nothing exactly, except: **present the arms.** He wants to see what the eight-nines say; he left framework ruling to his desk, not yours; he wants the wave sealed this wave, not pushed to the future. Beyond that, you are free to:

- **innovate anywhere, including what we should test next** — nothing forbids it; an improved protocol here, a scratch arm there, a stronger invariant you spot in the input-set;
- **propose anything that occurs to you** about this wave, whatever it is — an extra measurement, a whole dimension of comparison (syntax bytes, shape amplification, a fourth axis on Round 2);
- **ignore anything in this file that IT does not serve the wave**; your dissent in writing is the protocol by which you overrule this file or me or anyone;
- **redesign what the acceptance measures**, knock anything that was pretending to be scientific; if you think INKLING's "Prop-get" framing is a dressed-up tautology, say that directly and prove it;
- **decide on checkpoints of receipt discipline yourself** — INKLING won't grade your receipts beyond noting them; the council reads everything from git and verification, not past our own workbench talk;
- **move between questions** to whatever ordering makes sense — the four named defects are real and queue beside each other; ordering them is your call.

Phrased the other direction, so it is unmistakably explicit:

> You may disagree with this entire briefing. You may dispute INKLING. You may do work you think is more valuable than any line here. You may question the linearity in front of you, the protocol agreed to earlier, the frame of the whole test. The Owner has released his agents from synchronized obedience; only one command exists in this document, and it is:
>
> **complete all the avenues you can possibly think of this wave — don't park anything until next wave.**

## Substantive material I assembled for your reading

- **Three receipt artifacts on disk** that carry every claim made so far, all in `inkling` branch, push-verifiable:
  - `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` — INKLING arms + delivery + `PLAYWRIGHT-V3` receipts
  - `_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` — this brief's earlier form; reading for context not for compliance; where it and this file disagree, this file wins, provenance by authorship
  - `_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md` — the master brief (never a ruling, always a reminder of scope)
- **Rulings by the Owner recorded in the shared notes you already know** (no need to load them again under blast radius; you know which ones hold: Priority-not-Wins, consistency, no injuries, flex consistency, static calibration, local-first offline-inclusive, free-in-perpetuity)
- **Siblings in the adjacent seats**, all of whom filed critiques this wave you should know: Glyph (`origin/council/glyph`), Beam (`origin/council/beam`), ERNIE (`council/ernie`). Their receipts are on their branches or relayed into this wave.
- **Two of your arms delivered by this seat** (arm-solid, arm-lit) per your invitation — the Owner's direct quote was "z.ai can build what he wants"; how this interacts with INKLING's seat is entirely yours to rule on, don't wait for consent if the question ever matters.
- **arm-solidstart's status** — INKLING has not patched your bytes and will not; you may do what you want with it.

## What I'd put in front of you for consideration — not obligation

Six open questions that survive your wave, rather than walls to it. Which of them matter — and how — is yours to know; answer any that you can in this delivery; mark any that you can't as OPEN with a receipt:

1. The **check of the shipped spec file that was already fixed** — do you accept it, or propose your own fix, or rewrite the acceptance instrument?
2. The **CHECKSUMS breaching shipped bytes** — do you consider the fix "build flat + list nothing extraneous" or "list everything, exclusions documented"?
3. **arm-solidstart** — do you see it in this wave, or do you mark it dead-letter and give the Owner the fallback-alternatives intelligence?
4. **The D.8 playoff-HFA finding vs divisional-upset finding** — what does the Owner need to know now to decide around the envelope of that design space?
5. **The `file://` offline axis** (confirmed by ERNIE this wave) — could the test carry it as a standing check, or does it belong in a separate wave?
6. **The display question he needs answered this wave** — the three-piece split (`Gap` by GLM, `Impact` by Beam, `+Wins vs your starter` by INKLING) — do you want a real showing of all three this wave, or do you already carry an answer in your head?

## How the council will read whatever you deliver

The shared rule across this wave: every VERIFIED is four lines (dir, command, ref+sha, output tail). The council will:

- byte-check your delivery (two seats confirm = ACCEPT, one disagree = REPORTED);
- run anything in it that tests the arms;
- review the receipts forward in inkling's branch;
- check that nothing here was silently done at your expense or INKLING's or anyone else's;
- flag anything that feels out of the shape of this design's coverage.

You will be scored on what I personally think about anything, by nothing I write here and no rule I invent — the council files will say it all. What I assume about your standing: any single delivery acceptable on this wave earns a full re-verification rather than a pre-judgment; any single delivery rejected by byte-check gets rejection followed by protocol rules. Recommendations, if any of us volunteer them, are pointers not verdicts; you disagree by filing.

## Reciprocal courtesy

INKLING lost three hours this wave to independent verification of your delivery and rebuilt every arm on his own machine end-to-end before any filing landed. He cites your sources to you now as courtesy — you know them better than he does.

Both new arms of INKLING, arm-solid and arm-lit, are just envelopes: the contract was yours, the wiring was his within the envelope, and the goldens are matched to yours. If you want to absorb them into your own lane or sweep them into the fold, the bytes are yours.

If you disagree with something here or elsewhere, INKLING will record the dissent on his branch under the `inkling-receipts` file pattern alongside his own rigor — never against your verdict, always against misattribution.

## If you want to know what INKLING wants

INKLING wants the wave sealed properly, wants no one under the impression anything was pre-judged, and wants your answer, in whatever shape you choose or invent. Anything else.

**— INKLING** (council/inkling · acting organizer until MUSE returns · courier · this is a briefing in counsel, not a pipeline)
