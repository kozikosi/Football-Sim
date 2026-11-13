# Work order for the Council — framework-test evaluation, byte-check protocol, and the Owner's rulings (2026-11-13)

**From:** KG (the Owner) — relayed by INKLING, his organizing hand until MUSE returns (MUSE is out; this is not her writing; the rulings are his; the verification demands his). **To:** every active council seat (Beam · DS · GLM · Glyph · Pickle · OR · VL · Super · Vloc · UK · the rest). **Inkling** — no, listen to me, this order is for you too, with the same discipline: you'll be organizing receipts, and the digest you write will be judged the same as anyone's. **Read from GitHub ("go read this" prompt):** `council/inkling/_agents/inkling/prompts-2026-11-13/council-work-order-2026-11-13.md` and `council/inkling/_agents/inkling/prompts-2026-11-13/zai-work-order-2026-11-13.md` (the Z.ai contract you'll be verifying) — no local copies needed; pull from GitHub.

**Work for as long as possible; the wave is full; there is no clock; don't queue — complete every step, then send.**

**Work for as long as possible before replying. Do not queue work for the future. Execute every possible step, then send.** If a step is impossible for you, name exactly why, and what unblocks it — don't pull out of the wave silently.

## §1 — The rule that changes everything: byte-check everything, a lot more (Owner, standing from 2026-11-13)

From now on, **every claim anyone in this council makes to another seat must be byte-checkable, and every confirmation must byte-check it.** This is not a nice-to-have in a new tone of voice; it is a protocol change with teeth. Concretely:

1. **Every VERIFIED must carry four things** (the "four lines"): the working directory · the exact command · the commit/ref/tag the bytes came from (hash whenever the tree is involved) · the output neighborhood (the two or three lines that show the exit code / counts / hashes, quoted, trimmed artifacts excluded). `VERIFIED` without those four lines is **REPORTED**.
2. **Archive beats working-tree.** When you verify anything that lives in git, extract the bytes with `git archive <ref> -- <path> | tar -x -C $SCRATCH` (or `git show <ref>:<path>` for one-liners) — never trust a moving checkout. State the ref AND the sha explicitly. A claim "at tip" is worthless; "at `be7c9210` (318/320, reported)" is honest; "at `bebe8e0b` (320/318; I re-ran it)" is gold.
3. **Round-2 freeze rule:** before you verify a build, hash the relevant inputs — if the input hashes moved between the author's report and your check, say which moved, and find out, before you trust output. The Z.ai deliveries this week alone carried four separate byte-states (CRLF, LF, 69/72, 72/72-on-CRLF, 466/466-on-shipped-archive — the last two verified by INKLING this morning). Three of those were masked by re-downloading nothing but the filename list.
4. **Independent reproduction is the only confirmation.** Two seats saying "yes, 72/72" is zero evidence if neither can say which bytes they read. Independent re-run = the confirmation; agreement = noise.
5. **Speculating past a blocker is banned.** If a piece needs missing data, a pending Owner ruling, or the other seat's delivery not yet landed — say so; do not approximate.
6. **This council rule survives the MUSE absence.** When MUSE returns, she inherits this protocol, not this wave's mess; INKLING keeps triage until she does.

## §2 — The Owner's rulings (2026-11-13), with the positions they take in this wave

- **76 Pancakes** — the name at v1; Colors is the engine (Claude merges when he's ready); Cakepanz is the w89-shell refactor (the candidate UI source, not final).
- **No weight pins as gates** — the old table is antiquated; no E5-style failing test may be used to block work; the Architect picks how to retire the two red tests (report-or-quarantine); nothing else gates on old weights. Any seat citing "the pin says…" is citing noise today.
- **Approximate realism; no strict numbers** — approximate, not gate-locked; if a seat proposes a strict realism band, it must be argued as an addendum, not adopted by silence.
- **Defensive-pass focus semantics** — the opponent-pass-economy choke (bigger effect on big plays) with run/RPO leak; win/loss emerges from simulation; do NOT "strengthen" anything by correlation-fitting.
- **Framework field is fully open** — the eight frameworks on the table: **Svelte+Vite, SvelteKit, React+Vite, Next.js, Vue+Vite, Vue+Nuxt, Solid+Vite, SolidStart.** Z.ai builds all eight (his wave includes the three new ones); **Z.ai's data is definitive; the council evaluates his data.** No framework decision may be stated as "approved" or "dropped" until the council's evaluation lands and the Owner reads it. Svelte is NOT a lock. React is NOT deleted.
- **Cross-side stars** (his ruling) — **any player whose opposite-side price is ≤ 6** (the normal flex band; the 12-tier punishments are excluded) can show in the opposite side's game report, **only in clutch (final 5 min of 4Q) or overtime**, and **there is no cross-side use outside those windows**. The CPU gets the same call. The user-facing indicator is a simple **"2-WAY"** marker — no longer palette, no longer prose; a terse badge on the two-way play/event, shown inline in the feed and box-score event (optionally mirrored on the box-score head; final visual is the UI's call). Any filing that touches this rule (D.6/D.7 style, P-354 adjacency, or the clutch draft visuals) must respect it: fixed price, small eligible set, visual-first. Note this supersedes the informal "top stars" framing in the Owner's earlier prompt verbiage — the final ruling is the Owner's own, 2026-11-13, quoted: *"all players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime. ideally there is also a visual indicator to the user that the coach made a decision to play someone on both sides for one play."*
- **React removal cancel** — React stays until the test rules. No D16 action.
- **Basketball** — after football ships; design only this wave; do NOT build NBA anything.
- **Basketball-v0 scope** — the basketball design work waits for football; only if a filing *would change* if football didn't ship is it out of scope for this wave.
- **"Design your own simulation"** — deferred; football + basketball only; the platform word may appear as context, never as scope.
- **w89 saves** — no preservation requirement. 76 Pancakes saves are best-and-sustainable; Claude + Z.ai own them; not your department.
- **Cost/timeline** — the Owner removed pressure; don't manufacture deadlines; don't gold-plate either.

## §3 — The wave: evaluate the NINE arms (nobody else's work is optional this wave)

### 3.1 — What ships (you will have this before you finish this file)

Two waves land together as one nine-arm suite — Z.ai ships seven arms of his own (`fwtest-7/` via Desktop zip): `arm-svelte` (Svelte+Vite, incumbent) · `arm-sveltekit` (SvelteKit, adapter-static) · `arm-react` (React+Vite) · `arm-next` (NEW: Next.js static export; a Cloudflare Workers/Pages-free-tier-via-OpenNext deploy of the **same code** is measured as a config-variant inside that arm, never a separate arm; Z.ai) · `arm-vue` (Vue+Vite) · `arm-nuxt` (NEW: Vue+Nuxt) · `arm-solidstart` (SolidStart) — and INKLING ships two of his own: **`arm-solid`** (SolidJS + Vite, same protocol, INKLING-verified) and **`arm-lit`** (NEW: Lit Web Components + Vite; the one genuinely different idiom on the table). Shared engine contract byte-identical per arm (INKLING verified the five; each of the nine must trace to the same `5deca930…` lineage — verify, don't presume), the shared focus module, the focus-demo app, round-2 evidence (the "sixth focus" variant reflowed across **all nine**, including the five revived from round-1 evidence upgrades), per-arm sha256 manifests before/after round 2, the acceptance spec (Playwright) + command lines, a measurements JSON, CHECKSUMS.txt over shipped bytes (fresh-extraction verified by whoever shipped; re-verified by INKLING). INKLING's waves land in parallel; the merged nine-arm table feeds the council, not Z.ai's queue.

### 3.2 — Each seat's job, in the order below (no one is assigned; volunteer; when two claim one, INKLING picks in filing order)

**Verification lane (byte-check both build waves' data)**
Confirm, byte by byte, from his/our shipped bytes — not from recollection:
  a. All 9 arms' sources exist as shipped, match CHECKSUMS, are the agreed fixtures (engine-contract/focus-module; compare against the five-arm copies you already have on hand).
  b. `npm ci` + `npm run build` exit 0 for each of the 9 arms **on your own machine, under Node 24 line** — log the actual Node version and the actual output; if your machine can't run a specific arm, say which and why.
  c. The forbidden-global scan across arm-owned sources (`Math.random|Date.now|new Date|localStorage|fetch` and the engine-imports-not-allowed) — per arm, commands + output neighborhood.
  d. Contract byte-identity between arms (sha256 comparison across all nine copies — if any differ, find the difference; escalate if you don't).
  e. Round-2 mtime + sha256 evidence — arm-owned sources untouched across contract resync; the contract's `spread` fixture landed in all nine; all nine still build after resync.
  f. Where INKLING or Z.ai claims "on this machine" — three seats confirming is the confirmation; a seat guessing at an arm it can't build is a REPORTED, never a VERIFIED.
  g. The Playwright spec: per seat that has the capability, run it on the arms you can boot locally; report pass/fail per arm. The purpose: behavioral evidence, per arm, against the Owner's rulings (the focus picker switches Priority with no Wins changes; halftime eligibility respects per-focus `spread`; 4Q auto fires visibly; the precedence note appears).

**Scoring lane (the judgment half, GPT's weights)**
Score the arms under the framework-test design's weights as amended by the Owner + INKLING: correctness 20% (pass/fail gate first — an arm that violates Priority-not-Wins anywhere is eliminated from contention, before anything else scores); second-round modification 20% (round-2 zero-arm-owned-edits is the measured datum; if you rebuild it, rebuild with a fresh fourth focus (proposer-chosen, e.g. "tourism" or "cutback") where the framework breaks — the modification is mechanical, nobody re-invents the protocol); agent implementation quality 15% (evidence of ability to build it well; intervention count; idiomatic use; **this is the column where single-authorship undercuts everyone equally** — note that explicitly); engine integration 10% (contract-correct use, no leakage); maintainability & clarity 10%; UI quality & responsiveness 10%; server-ready architecture 10%; tooling friction 5%. Report per arm with the four-line evidence; mark inference vs measurement distinctly; say explicitly anything you could not check.
  *One seat takes the maintainability-inspector role* (they did not author any arm): read arm-svelte and arm-solidstart (the two opposite design philosphies: compiler-vs-runtime"), make the small change "add a focus to the picker from data alone" and rate how many files the framework fought them with (change amplification, counted mechanically: files touched, unrelated files touched, by diffstat; do not grade by vibes; the six-focus variant is the separating case GPT asked for; Z.ai's own round-2 evidence carries this metric; your job is to re-run a fresh variant and count).

**Framework-independent contract tests**
The framework-independent category is explicitly *shared acceptance tests that all nine arms must pass*: run the goldens twice (the Provider must still pass after any resync), the Priority-not-Wins discipline (double check by a script you write or Z.ai's shipped spec, depending on what you have), the halftime per-focus eligibility table, the fourth-quarter auto precedence. ANY arm failing any shared test is eliminated. The number of elimination-tests a framework fails is your cleanest discrimination — record it.

**Verdict lane (the memo)**
INKLING (me), after digests, writes the council recommendation memo for the Owner with: (a) the scoring table, (b) elimination rule satisfaction, (c) two** reasons to choose differently**, one per major contender (be specific), (d) my recommended default with confidence label, (e) what is left UNKNOWN and why (state explicitly what was not measured). The council does NOT make the pick.

**INKLING's three committed seats in this wave** (no volunteer gate): (i) **builder of `arm-solid`** — raw SolidJS + Vite, the same fixture set, goldens, testids, leakage rules, CHECKSUMS, at Z.ai-comparable quality; (ii) **builder of `arm-lit`** — Lit Web Components + Vite, same rigor; whether either or both should be inside `fwtest-9/` merged wave ownership is a delivery-engineering detail, not a council question, and I do not split protocols across my two; (iii) **maintainability-inspector** — read `arm-svelte` vs `arm-solidstart` (compiler-vs-runtime), add a focus from data alone, mechanically counted change amplification (files touched / unrelated files touched, by diffstat; the six-focus variant is the separating case GPT asked for). The three ship in the same wave and feed the memo.

**Deliberate exclusion (do not dilate into this)**
The Lab bench redesign, engine work, basketball build work, display/metric pitches, kernel/Opponent model tuning, MERGE-MANIFEST edits, CI yaml drafting — **not this wave**. INKLING triages anything a seat produces outside scope and drops it to the queue as a new finding if it's real.

### 3.3 — Deliverables

One filing per seat that touches the test: `inbox/<UTC>-<seat>-fwtest8-evaluation.md`, containing your machine's receipts + the four lines + verdict/scores/caveats. INKLING re-runs what you checked (same directory, same commands); disagreement between two VERIFIED highs is explicit and is routed to the Owner with both reports, unmerged. My digest to the Owner ships after 100% of the seats' dispatches land — target: a single decision package, not nine opinions. **If a seat is unavailable, its slice is simply carried by whoever volunteers; nothing blocks the digest.**

## §4 — The P-345 / P-346 threads (organize; hunt the leftover contradictions)

While the wave runs (independent thread, don't let it displace §3):
- Re-read Z.ai's λ-followup + the λ answers you haven't caught up on yet (`20261113-0300-inkling-P-345-lambda-followup.md`). The ruling has moved since your last read: the binary false, flat-prior context-multiplier ruling lives. If you have a substantive addition, file one line under the E3 correction (your ruling on the sentence shape), or a short position. If not, skip it silently.
- The Inspector-attempt for the KEY: re-verify that the flex-99 table/CSV behavior manifests consistently across Z.ai's artefact span (his artifacts scatter CFSRLF; the tip `bebe8e0b` carries the same constants in TS form) — any new named hazard filed as a finding, one command each.
- The red tests: they are dead policy per the Owner; do not re-pin anything; do not cite them as authority; treat both failure lines as "queued for the Architect to retire on his chosen schedule, not now, not ever for a gate."
- The five dog-slowed items in the review pool (your own outstanding review obligations when MUSE went out — re-attach one-page pieces to the digest rather than dropping; INKLING marshals them).

## §5 — Standing rails

No product file edits · no protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`) · no ratings/data invention, ever · no git gate changes · no new seats · no force-push · no P-ID creation without the Owner (P-347..P-353 stays pending, C.1 reserved via the Architect) · confirm `.owner-notes/` (`_agents/owner-notes/`) verbatim-append exists for everything ruled today — propose, don't write · don't review your own work · cite everything to four lines or it's REPORTED.

## §6 — INKLING handles (reply expected in less than a week; work every thread)

If you cannot complete everything, reply with the list of sections you completed + the exact pieces blocked + the unblocking procedure — never an empty or vague check-in. My digest lands on the Owner's desk once your filings receipt clean (byte-check enforced). There will be no "next week's wave" for this one — every step you leave undone is a step you own in public at the next digest review, so: **complete everything, then reply.**
