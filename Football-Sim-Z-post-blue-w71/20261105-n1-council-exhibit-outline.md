# docs/council/ — the council exhibit (N1) — OUTLINE DRAFT

**Status: PENDING OWNER REVIEW — nothing here is final; nothing ships until Muse rules.**
**Author:** Z.ai · 2026-11-05 · Approved direction: "showing my early weaknesses is actually an asset."
**Audience:** hiring managers and senior engineers who click past the README.
**Purpose:** show, with receipts, how this project was built by a structured multi-agent
council under an Owner — and that the process had real quality control (including auditing
our own claims). In 2026, "can you run AI-assisted development without it becoming slop" is
a hiring question. This exhibit is the answer.

## Design principles (draft)

1. **Receipts, not claims.** Every statement links to a commit, a file, or a verbatim note.
2. **The incident is a feature.** The w69 ledger claimed six fixes, two shipped. w70 found it,
   audited it, documented it, fixed it. That story is told plainly — it demonstrates the
   verification culture, which is the actual hire signal.
3. **Curated, small, honest.** ~6 files, each readable in under 3 minutes. Not an archive
   dump — the archive (old repo) stays linked for the deep-divers.
4. **No live-council secrets.** No prompt-injection fodder, no credentials, no raw prompts
   beyond what illustrates process. Public-repo safety review before anything lands.

## Proposed file set

| File | Contents | Length |
|---|---|---|
| `docs/council/README.md` | What the council is: Owner + Architect (Claude, engine/contracts) + Executor (Z.ai, waves/verification) + advisors. One diagram: directive → intake ledger → build → verify → ship → audit. The three laws (Owner's word is law verbatim; every claim labeled VERIFIED/REPORTED/INFERRED; every chat ends with a pinned, hashed artifact). | ~400 words + 1 diagram |
| `docs/council/timeline.md` | The compressed history: w52–w70 executor waves, the Colors rebuild decision, engine milestones E1–E5 with commit hashes, the 272-test milestone. Table format, one line per event, each line hash-linked. | ~60 rows |
| `docs/council/how-a-wave-ships.md` | One worked example, end to end: the w70 wave (six UI directives) — verbatim directive → intake ledger mapping → implementation → contrast battery (15/15) → headless smoke → ledger → the audit that found w69's ledger overclaimed → the fix. This file carries the incident story. | ~800 words |
| `docs/council/incidents.md` | Honest register: the w69 ledger incident (found by audit, fixed w70), the forkSeed tie-break golden shift (caught by tests), known open debts (debt inventory link). Format: what happened / how detected / what changed. | ~5 entries |
| `docs/council/seat-protocol.md` | The seat system in brief: what each seat owns, what it may not touch (engine math vs UI), how decisions are recorded (DECISIONS.md / verbatim notes), how seats hand work to each other (inbox files). Links to the live protocol docs in the archive. | ~400 words |
| `docs/council/metrics.md` | Generated, not hand-written (per the Architect's versioning law): waves shipped, tests passing, invariant report status, debt items open/closed, artifact sizes w52→w70. A small CI job or script emits this so it can't rot. | generated |

## Open questions for the Owner (block shipping, not drafting)

1. **Naming:** does the public repo's exhibit use seat names ("Claude", "Z.ai") or role names
   ("Architect", "Executor")? Public repo + named models reads as a process demo; role names
   read cleaner to employers who don't know the council.
2. **Depth of the archive link:** link the whole old repo, or only curated artifacts
   (BASELINES, CHRONICLE, the debt inventory)?
3. **The 20-0 story:** the Owner's "go 20-0" context is charming but internal — include as
   color in `how-a-wave-ships.md`, or keep the exhibit strictly engineering?
4. **Cadence:** ship the exhibit with the fresh repo's first commit (my recommendation), or
   incrementally on the current gh-pages first?

## What I need to draft the content

Nothing — once Muse rules on the outline, drafting is ~1 session (the receipts all exist:
commits, hashes, verbatim notes, the w70 audit). The metrics file's generator script is a
small add to the scaffold's CI.

— Z.ai, executor seat
