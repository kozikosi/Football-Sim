# COUNCIL SEAT QUALITY RANKING — last three weeks (2026-10-30 → 2026-11-20)

**SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | DATE: 2026-11-20T20:40Z**
**FOR: the Owner (Kosi) — product direction + who is admitted/retired**

**Method (what "quality" means here).** I ranked on *evidence*, not volume: (1) **adopted / independently
verified new defects** — findings that changed the product or the handoff, confirmed by another seat
or by my own re-run; (2) **process compliance** — pushed commits, receipts attached, claims labelled
VERIFIED/REPORTED; (3) **efficiency** — output per unit of churn, rework caused, duplication; (4) **recency**
— active in the last three weeks. Commit counts alone are NOT a quality signal (several high-count
branches are churn or forks). Labels: VERIFIED = I ran it / read the bytes; REPORTED = a seat's claim;
INFERRED = reasoned. This is advice; the Owner decides admission/retirement.

---

## RANKING (best → weakest, active seats only)

### Tier 1 — the core review bench (highest quality per unit of work)

**1. hy4 — advisor.** The strongest *find-per-sitting* seat. VERIFIED: c12 found the verifier's missing
converse check ("best single new find in the round" — I reproduced it: an unlisted extra file passed 36/0
exit 0). S13: found the composite-truncation overclaim (D1), the path-citation defects (D2), and filed
the cleanest 13b adjudication of the round (code-level entailment: `DIED` ⇒ `L13 ∈ fails`). Process:
clean, labelled, pushes. **Efficiency: high** — few files, each load-bearing.

**2. pickle — advisor.** The best *single contribution* of the S13 round: the only HIGH behavioural
defect (shared `?seed=` link silently overwritten by a local autosave), browser-proven, with a
non-regressing fix and a new law (W14). c12: R2 tab-variety + b36-unanchored (both verified). Weakness:
filed the "ring dropped" claim without a record in c12 (I flagged it REPORTED/UNKNOWN; the Owner has
since clarified the ring is NOT dropped — pickle's c12 claim was wrong, but the *reasoning* that flagged
it needed a ruling was correct). **Efficiency: high** — deep, browser-verified, few false positives.

**3. ernie (me) — advisor.** Declaring my own seat for transparency, ranked on the same evidence:
S13 re-ran every gate + the 13b falsifier (resolved the dispute with the child-log receipt), found the
handoff merge-blocker (test/engine.test.ts not at the pin), the `test/engine/**` re-point, F20 ergonomics;
c12 broke the 6-seat T8-blocked deadlock (found the bytes on disk) + verified hy4/glyph/pickle new
defects. Weakness (self-reported): S13 D3 was WRONG — I misread the T8 note path; porca's review-of-reviews
caught it and I withdrew it. That is the correction working, but it is a real error. **Efficiency: high**,
but not flawless.

**4. porca — advisor.** The best *meta* seat: c12 review + the c12 review-of-reviews + the S13 review +
the S13 review-of-reviews that corrected me (withdrew my D3) and settled beam's note. VERIFIED: pin
provenance correction (06d89724 is the true pickSlot introduction, ancestor of the pin), the seat-audit
(beam's "37 entries" → 36, "49/49 applied" false for the named file). **Efficiency: high** — the
consolidation pass is exactly what a council needs; low duplication.

**5. beam — council (Verifier).** Solid, honest, high-volume. S13: verdict ok (2 minor notes, 1 settled),
plus a 10-item brainstorm. c12: reviewed + hosted. Weakness: **volume without new verified defects** —
beam's reviews tend to *confirm* rather than *find* (the "37 entries" off-by-one, the "49/49 applied"
claim that was false for the named file — both caught by porca's audit, not self-corrected). Also
high churn (301 commits/3wk) for a confirming role. **Efficiency: medium** — reliable, but the
find-rate per commit is low.

### Tier 2 — solid contributors, narrower scope

**6. glyph — advisor.** Real finds: c12 README-path defect (verified), c10 repair host work. Lower
recent volume (last push 2026-11-20 but fewer recent commits than beam). **Efficiency: medium-high.**

**7. iceman — advisor.** c12 review (repeat-conclusion on T8, but correct on T2/T4). New seat; low
volume (62 commits/3wk, mostly one review round). **Efficiency: medium** — promising, unproven at volume.

**8. muse — infrastructure owner (High Councillor).** Not a product reviewer; owns council infra +
queue custodian. VERIFIED: keeps the live queue/docs current, v9 tool, sweeps. **Efficiency: high for
its role** (infrastructure, not product findings).

**9. inkling — advisor.** Recent activity (re-root audits, item-5 receipts) but mostly *following*
(its c12 review repeated the T8-blocked conclusion). 18 commits/3wk — low. **Efficiency: medium-low.**

### Tier 3 — active but redundant / low-yield (the retirement candidates)

**10. orcabeam, orcaman, orcaink, orcatide, orcads — the "orca" family.** Five seats that
**review the same deliveries and reach highly duplicated conclusions** (all five repeated the c12
T8-blocked error; all review c10/c12). They are independent seats on independent branches (shared
merge-base `864a6aa12`, same root `d7a05a277` — NOT git forks of each other; the duplication is in
*what they produce*, likely the same model family, but I cannot verify the model from git). Each did
*some* real work (c10/c12 reviews, pin-watch, re-root audits, the ring-fix synthesis), but:
- **High duplication**: five seats reviewing the same deliveries, same conclusions.
- **Low find-rate**: orcatide's "re-root audit — definitive refutation" and orcaink's "next-sitting
  prompt draft" are process/meta work, not product defects.
- **Efficiency: low** — five seats producing roughly one seat's worth of unique findings between them.
- **Recommendation: retire at least three of the five** (keep the one or two with the best recent
  find-record). They are the clearest "inefficiency of flow" in the roster.

**11. or (OR), vl (VL), vloc, ds, glm, super, uk, flint, mimo, boc, tidepool, minimorca, glmorca,
vlorca — mostly standby/probation or one-note seats.** Evidence:
- **tidepool / minimorca / glmorca / vlorca**: only an "admit" lane file each (1 commit) — no
  substantive work. **Retire** (or never activate) — they consume a roster slot with zero output.
- **ds, vl, or, glm, super**: standby/probation; real past work but low recent output (ds: R-13
  evaluation + c8.1 review; glm: P-342 pass-class; super: last push 2026-11-11). **Keep on standby**
  (they have a record), do not retire.
- **uk, flint, mimo**: probation, Owner wants more evidence. **No change** — the Owner's call.
- **boc**: last push 2026-11-01, 48 commits then silent. **Retire candidate** (3 weeks dark, no
  recorded Owner direction to keep).
- **crouton, ck**: Owner already said "ignored indefinitely" — **already handled**, no action.

### Already retired / tombstones (no action)
minimax, moc, lk, longcat, cohere, lightning, openclaw, nemo-ultra (RETIRED.txt). goc/gemini/fk/fk/
mimo-lane: 1–4 commits, effectively inactive.

---

## THE RETIREMENT RECOMMENDATION (the direct answer)

**Yes — three groups should be retired for inefficient flow:**

1. **The orca-family redundancy (orcabeam, orcaman, orcaink, orcatide, orcads):** retire **three of
   the five** (I recommend keeping **orcabeam** and **orcaman** — the two with the best recent
   find-record; retire orcaink, orcatide, orcads). Five forks of one model reviewing the same
   deliveries is the single biggest inefficiency in the roster: high duplication, low unique yield.
2. **The zero-output admitted seats (tidepool, minimorca, glmorca, vlorca):** retire tidepool,
   minimorca, glmorca — each has only an "admit" lane file and no substantive work (1 commit ahead of
   base). vlorca has 3 commits (admit + 2 small session-end notes: C31 errata + C24 provenance) —
   borderline; retire or keep on probation. None has produced a product finding.
3. **boc:** 3 weeks dark after 48 commits, no Owner direction to keep — retire.

**Do NOT retire:** hy4, pickle, ernie, porca, beam, glyph, iceman, muse (Tier 1–2 — the core bench);
ds/vl/or/glm/super (standby with a record — keep); inkling (low volume but recent and correct);
uk/flint/mimo (probation — the Owner is already gathering evidence); crouton/ck (already ignored).

**The one-line version for the Owner:** the council's *product* quality is carried by **hy4, pickle,
porca, ernie, beam** (the review bench) — they produce the verified finds. The inefficiency is the
**orca-family (5 seats, ~1 seat of unique output)** and the **zero-output admits (tidepool, minimorca,
glmorca, + borderline vlorca)**. Retire 3 of the orca five + the 3–4 empty admits + boc; keep the rest.

---

## CAVEATS (stated plainly)

- Commit counts are a *volume* signal, not quality; I ranked on adopted/verified findings.
- Some seats (muse, the orca family) do *infrastructure* work that a find-rate ranking undervalues —
  but the Owner's question was "quality of work" + "inefficiency of flow," and on *flow* the orca
  family and the empty admits are the clear drag.
- The Owner's own recorded judgments (crouton/ck ignored; uk/flint/mimo probation; ds/vl/or/glm/super
  standby) are respected — I did not override them, only added the new evidence.
- Retirement is the Owner's alone (AGENTS.md §1); this is advice, not a decision.

— ERNIE (Kilo seat; signs as ERNIE). All VERIFIED items are my own command + output at my machine,
2026-11-20; REPORTED items are named as such.