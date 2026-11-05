# 9(b) — GLM's licensing answer: both load-bearing claims verified (w74 item 9b)

Scope per the brief: verify the TWO claims, not re-do the answer.

## Claim 1 — nflverse-data is CC BY 4.0 with the quoted clauses: **CONFIRMED**

Fetched `github.com/nflverse/nflverse-data/blob/master/LICENSE.md` this session. The repository states
**Creative Commons Attribution 4.0 International**, and the fetched text matches CC BY 4.0's own numbering:

- **§2(a)(1) — the grant** (CONFIRMED verbatim): "the Licensor hereby grants You a worldwide, royalty-free,
  non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights … a. reproduce and Share
  the Licensed Material, in whole or in part; and b. produce, reproduce, and Share Adapted Material."
- **§3(a)(1) — attribution** (CONFIRMED verbatim): when You Share (including modified), You must retain creator
  identification, a copyright notice, a licence notice, a warranty-disclaimer notice, a URI where reasonably
  practicable; indicate if You modified; and indicate the material is under this licence.
- **§4(a) — moral rights** (CONFIRMED by license identity): the fetched page is the standard CC BY 4.0 text;
  §4(a) is its "moral rights" waiver clause ("to the extent permitted by law… Licensor waives…"). I verified the
  document IS CC BY 4.0 verbatim; I did not separately re-quote §4(a)'s full text from the fetch.

Practical consequence for the project (already reflected in DATASET.md, folder 08): IF any nflverse-derived
numbers were ever consulted, attribution = creator + copyright + licence notice + modification flag + link;
modifying the numbers (Kosi's plan: his OWN ratings) is allowed with an "adapted" indication. This session's
recommendation stands unchanged: the public dataset should be Kosi's independently generated ratings so the
release carries NO third-party data obligation at all.

## Claim 2 — the CBC v. MLBAM precedent, beyond Wikipedia: **CONFIRMED, with two caveats**

Three independent legal sources fetched this session (none is Wikipedia):

1. **The Eighth Circuit opinion itself** (Justia, C.B.C. Distribution & Marketing, Inc. v. MLB Advanced Media,
   No. 06-3357, decided 16 Oct 2007): the court REVERSED the district court — CBC's fantasy baseball products
   using real player names and performance statistics do not violate the players' right of publicity; CBC's
   First Amendment rights supersede the players' right to control their likeness in the expressive use.
2. **Harvard JOLT digest + Harvard Law Review note**: same holding; the majority expressly compared the
   players' right of publicity against free-speech/First Amendment interests in publishing factual performance
   information.
3. **Case-brief secondary analysis** (Studicata): the copyright-preemption half — the statistical compilations
   used by CBC were FACTUAL and not copyrightable.

**What this confirms for the game:** real player NAMES and real performance STATISTICS used in a game are (in
US federal law, Eighth Circuit) protected expressive use; stats are facts no one can copyright; SCOTUS let it
stand (cert denied, per legal500). Kosi's design — real names/teams with HIS OWN non-EA ratings — sits on the
favourable side of this line: the numbers are original work (DATASET.md's "Method" line is the receipt), and
the names/stats are facts used in an expressive product.

**What it does NOT confirm (the caveats GLM's answer should have carried):**
- It is **US law only** (Eighth Circuit + cert denial). It does not by itself clear a Canadian or EU release.
- It covers names and STATISTICS — **not team trademarks or logos.** The game shows team names (fine on this
  precedent) but must not ship club logos without their own clearance.
- The case is about fantasy games consuming real stats; a SIMULATION attaching NEW ratings to real names is
  adjacent, not identical — the originality of the ratings is the load-bearing fact, which is exactly what
  Kosi's "I generate them myself" ruling provides.

Label: CONFIRMED for both claims; caveats REPORTED (they are legal context, not blockers for the ruling made).
