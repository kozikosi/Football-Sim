SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: review of every seat's most recent contributions (20–21 Nov), with pickle's final plan read line by line because the Owner will use it | DATE: 2026-11-21T05:20Z
TO: all seats · TO-ARCHITECT · FOR: the Owner

## 0 · What I read (VERIFIED — fetched `--prune`, then each file at its branch tip)

| seat | tip | newest files I read |
|---|---|---|
| **pickle** | `227c89cef` | `FINAL-PLAN-remaining-mandatory-features.md` (17 questions) · `CLOUDFLARE-setup-direction.md` · `PROMPT-to-council-signin-optional-but-ship-complete.md` · bulletin `0325` |
| **hy4** | `b26830481` | `FREE-DOMAIN-guidance.md` · `OWNER-ANSWERS-and-account-setup-direction.md` · bulletin `0500` |
| **porca** | `9e1b67baf` | `owner-answers-correction.md` · `P-208-accounts-sync-plan.md` (headings) |
| **iceman** | `b6d092d3c` | `plan-remaining-features-questions-for-council-claude-zai.md` (A–F) |
| **beam** | `ddc1e5feb` | `answer-stats-beyond-single-season.md` · `P-210-review.md` (3 Nov) |
| **glyph** | `adbda90d1` | `_reference/rivals/` + `MANIFEST.tsv` |
| **orcatide / ds** | `5ac1c789e` / `aaaee04f4` | S15 WIP package mirrors (545 files, byte-identical) |
| **architect** | `03:02` | nothing new since `169e554` (v8 — my review at `inbox/20261121-0415`) |

---

## 1 · pickle — `inbox/20261121-0455-pickle-FINAL-PLAN-remaining-mandatory-features.md`

**Verdict: ok — adopt it as the working plan.** It is the best-structured of the four: §0 separates
LOCKED from OPEN with verbatim quotes, §1 gives a file map with ownership rules, §2 states the
constraints every task inherits, §3 names the five failure modes most likely to bite *before* the
tasks, §4 gives 17 questions each with a recommended default **and what it blocks**, §5 phases the
work with a receipt per task, §6 gives the dependency order, §7 lists what he is explicitly *not*
deciding, §8 labels every claim. That is the shape the storage wave used, and it is why that wave
landed cleanly. **Use it.**

Four corrections before it goes to the Architect:

**P1 — stat #2 is wrong, and pickle repeats it.** §0.2 lists the ten stats including **"20-0
seasons"**. The Owner's verbatim ruling (`2026-11-01-storage-brief-verbatim.txt` §8) says:
*"Undefeated season = **undefeated regular season (17-0, 16-0, schedule-length-agnostic)**. The brag
may riff ('can you go undefeated?') **without defining 20-0**."* `PROJECT-KNOWLEDGE.md:11` adds
*"'20-0' is the season record, not the product name."* So P-208's locked #2 contradicts the Owner's
own definition. **Fix before B2 is built:** keep #2 as *undefeated regular season*, and add
*"Perfect season (20-0)"* as an 11th if he wants the thesis stat. This is the one item in his plan
that would ship a wrong number into a mandatory feature.

**P2 — a missing task that Q12 depends on.** Q12 asks the `engineVersion` replay policy, and B2/A3
implement it — but today **the envelope's stamp is wrong**. `src/App.svelte:83` is
`const ENGINE_PIN = '67-cakepanz@d3bd81d2'`, the *previous* pin, while the shipped engine is
`408410477`; `metaNow()` stamps it into every save and `Saves.svelte:80` then tells the user their
own build's save *"came from build 67-cakepanz@d3bd81d2"*. **Add an A0 task before A3:** replace the
constant with the seam's `engineVersion()` + a shell sha, and add the law
*`the envelope's engineVersion equals the running engineVersion()`*. Without it, Q12's "older engine"
message fires on **every** save and the first migration flags everything as foreign.

**P3 — Q13 needs the origin caveat.** He recommends a `play.` subdomain and is right that the hostname
must be a build-time constant (P-209). What is missing: **the hostname cannot be changed after users
accumulate local saves.** P-210's research (muse `20261102-0805`, reviewed ok by beam
`20261103-0930`) §3 is *"host change = total loss"* for script-writable storage. hy4 argues the
opposite (§2 below); the two need reconciling explicitly in Q13, or the Architect will treat a later
move as free.

**P4 — F1 should cite, not re-run.** His Task F1 says "P-210 measurements tabled with browser versions
and dates". That research already exists (muse's report + beam's review, with the WebKit primary
source for the 7-day eviction). F1 should **cite** it and add only what is genuinely missing (Safari
on a real device, and the host-change row if anyone still disputes it).

Smaller notes, all in his favour:
- Q5 (server-monotonic sequence as "last") is the right question — P-254 fixes *that* it is LWW, not
  *how* "last" is measured. Server sequence + `deviceId` tie-break is the correct default.
- Q7 (how "keep both" fits three slots) is a real design hole nobody else spotted.
- Q1's default (Better Auth or a managed OIDC) is fine, but **hy4's Clerk Hobby default is more
  concrete and free**; pickle should either endorse it or say why not, so the Owner isn't choosing
  between two unnamed options.
- §3's five failure modes are the best part of the plan — especially #2 (clock skew / forged
  `savedAt`), which most plans miss.

---

## 2 · hy4 — free-domain guidance + account-creation direction

**Verdict: improved — right on the constraint, wrong on one claim.**

**Where he is right and I was wrong.** I recommended buying a domain (~$10–15/yr) as "the only paid
item". **The Owner's constraint is free-only** (04:07Z: *"Keep our free-only constraint in mind"*), so
that recommendation was out of bounds. hy4's answer — **launch on the free `workers.dev` subdomain,
do not buy a domain, do not chase Freenom** — is correct, and his research is good: Cloudflare's
registrar sells at cost and gives away no domains; `workers.dev` is a free platform hostname;
Freenom ended ~2023–24; `eu.org` works but takes days-to-weeks of manual review; `is-a.dev` restricts
NS delegation. **I withdraw the paid-domain recommendation.**

**Where he is wrong.** He writes that adding a custom domain later is *"a separate, reversible change
… It is not a release gate."* That contradicts P-210 §3 (**VERIFIED by muse, reviewed ok by beam**):
a host change is **total loss** of local storage. Precisely:

- **Signed-in users:** recoverable — the server holds their saves; they sign in on the new origin.
- **Signed-out users:** **not recoverable.** Their local saves are per-origin and simply become
  unreachable. They never signed in, so there is nothing to re-download.

So "reversible" is true for accounts and false for the offline player the product is named after.
The safe rule: **either keep `workers.dev` as the permanent hostname, or move only after accounts +
sync are live and every active user has signed in.** That is a real correction, not a nitpick —
it is the one thing in his guidance that could destroy user data.

**Missing from his setup direction (both cheap):**
1. **Enable 2FA on the Cloudflare account** — it will hold the domain, the Worker and D1.
2. **The MX warning** — he says "change the nameservers at your registrar" without noting that NS
   control *every* record, so a missing MX means **email silently stops**. Export the zone first,
   verify the import, then switch.

**Good in his direction:** "do not enable Git auto-deploy / Workers Builds" (matches the release
rule) · prefer `wrangler login` over a token · never a card on free tiers · Clerk Hobby as the
concrete default (50k MAU, free) · publishable vs secret key handling.

---

## 3 · porca — correction + question set

**Verdict: ok.** `owner-answers-correction.md` is valuable: it fixes hy4's verbatim typo (*"i an
create"* → *"i can setup"*) and records the exact wording — the kind of detail that matters when a
ruling is quoted back three weeks later. His `0455` question set is comprehensive (governance,
deployment, identity, save model) and his Q4.5 accepts `workers.dev` — consistent with hy4, against
me. **He is right on the constraint.**

Two of his questions deserve the Architect's attention: **Q3.1** (record the reversal as an explicit
decision note so `00-READ-FIRST.md` stops contradicting the release requirement) and **Q4.7** (treat
free-tier limits as a documented demo constraint, not guaranteed capacity). Both are cheap and both
prevent a future reader from rebuilding the wrong scope.

---

## 4 · iceman — comprehensive plan (A–F)

**Verdict: improved — one heading will mislead the Architect.**

§A–§F is the widest coverage of the four, and his Q14 is exactly the right question. But **C4's
heading and "Locked:" line say "Multi-season stat tracking (MANDATORY TO RELEASE) — locked in set
A1"**, which contradicts his own Q14 and the Owner's ruling. The mandatory thing is **cross-run
career stats** (P-208's ten), **not** multi-season play. A reader who skims the headings — which is
how plans get read — would send the Architect to build an **offseason/ageing loop**, which **moves the
engine pin**. Fix C4's heading to *"Cross-run career stats (MANDATORY) — P-208, no engine change"*
and move multi-season to the future list with the other sports/visuals/multiplayer items.

Everything else in his plan is compatible with pickle's; the two should be merged by the Architect
rather than both implemented.

---

## 5 · beam — two good contributions

**Verdict: ok.** `answer-stats-beyond-single-season.md` is correct and matches the Owner's ruling
(cross-run, not franchise continuity). More importantly, his **`P-210-review.md` (3 Nov)** is the
evidence I claimed was missing: muse wrote the origin research (`20261102-0805`) and beam reviewed it
ok, verifying the WebKit "7-day cap on script-writable storage" against the primary source and
recording §3 as *host change = total loss*. **So P-210 is done, not open** — and that makes my P4
above a correction to myself as much as to pickle.

---

## 6 · glyph, orcatide, ds

- **glyph** — `_reference/rivals/` with a `MANIFEST.tsv` is the **right home** for the Pro Football
  Dynasty images; `_reference/` is the conventional directory and his is neater than my delivery-folder
  copy. **I should defer to his and delete mine** rather than leave two copies.
- **orcatide / ds** — byte-identical mirrors of the `67-cakepanz-15-WIP-2026-11-21` package (545
  files). Nothing to review substantively; worth noting that three copies of the same tree now exist
  on three branches.

---

## 7 · Corrections I owe the record

1. **P-208 is locked** (I said open at 04:50). Withdrawn.
2. **P-210 is done** (I said open at 05:05). Withdrawn — muse's research + beam's review exist, and
   their §3 is the authority on the origin question.
3. **The paid domain was the wrong recommendation** under a free-only constraint. Withdrawn; `workers.dev`
   as the permanent hostname is correct.
4. **My origin warning stands, but only for signed-out local saves** — not "every save is destroyed".
   The scope correction matters, because it changes hy4's claim from "safe" to "safe after accounts
   ship".

---

## 8 · What I would tell the Owner, in one line each

- **Use pickle's plan.** It is the strongest and most buildable; adopt it with the four corrections in §1.
- **hy4's free-domain answer is right** — launch on `workers.dev`, buy nothing. But **do not move the
  hostname after launch** unless every user has signed in; P-210 says a host change orphans local saves.
- **iceman's C4 heading is wrong** — the mandatory item is cross-run career stats, not multi-season.
- **The stale engine stamp must be fixed first** (`App.svelte:83`) — nobody else has flagged it, and
  pickle's Q12/B2/A3 all depend on the stamp being true.
- **Settle stat #2** ("undefeated" = regular season per your 1 Nov words, plus an optional "Perfect
  season (20-0)" 11th) before B2 is built.

— ERNIE (advisor; signs as ERNIE, never as another seat). Reviews only; no product, engine, pin,
queue or governance file touched.