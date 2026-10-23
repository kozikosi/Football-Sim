# The expansion programme has three proposals on disk — and they conflict in one place

**MiniMax (S-1900–1999) · 20 Oct 2026 · after reading GPT's `CO_ARCHITECT_REPORT_(GPT).md` and
`proposals/multisport-platform-gpt/` (branch `gpt/multisport-strategy-proposal` @ 5ad4dde), Beam's
`_multi-sport/` (18 files) and v21 roadmap, and Ultra's architecture review, Round-2/3/4 reviews and
v21 vision, in full.**

Three seats have independently built a multi-sport expansion structure. They agree on almost
everything. They disagree on the one thing that determines whether the 1,200-player rating effort is
done once or twice.

---

## 1. The three proposals

|                             | **Beam** — `_multi-sport/`                                                                | **GPT** — `proposals/multisport-platform-gpt/`                                                                     | **MiniMax** — `SIM-PLATFORM/`                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Engine topology             | **fork per sport**: each sport forks a stripped "engine template" and owns its own engine | **shared shell + separate sport engines** (`packages/sports/<sport>/engine`)                                       | **one engine, many packs**: a profile-driven engine, packs = profile + pool                         |
| Data schema                 | per-sport records (NFL: the 10 fields; NBA: adds pts/reb/ast/fg/tp/ft)                    | five explicit layers: source observation → normalized record → transformation → mode adjustment → simulation input | one shared record shape for all sports (the NFL's 10 fields) + provenance + era                     |
| Where the shared part lives | `shared/` (a template each sport copies)                                                  | `packages/simulation-contracts/`, `packages/web-components/`                                                       | `engine/` (written once, byte-pinned)                                                               |
| Output                      | one `sim.html` per sport (single file)                                                    | an `apps/web` shell + packages (multi-file)                                                                        | one single-file HTML per pack, built from parts                                                     |
| Migration                   | extract a template, then copy it per sport                                                | the target tree is "a map of responsibilities, not a request to create empty folders today"                        | staged: dataset indirection first (no extraction), engine extraction when the second pack forces it |
| Questions for the Owner     | 39 (`QUESTIONS-FOR-OWNER.md`, tagged, answerable by append)                               | a bank + a generator (`owner-questions.json` + `tools/generate_owner_questions.py`)                                | 53 + a generator (`question-bank.json` + `tools/owner-questions.mjs`)                               |
| Data method                 | rubric, sources, validation rules, submission template                                    | layered provenance, uncertainty made visible, rating transformations documented                                    | calibration set per rater, two independent raters, median, provenance, a validator                  |

## 2. Where they agree (this matters — the consensus is real)

- The **priority order** is the Owner's: current NFL (protected, V21 first) → NFL all-time → NBA
  current → NBA all-time → the rest.
- The **pool target** is ~1,200 per sport, as a _candidate_ target, not a launch gate.
- **Current players stay eligible in an all-time pool at about −5**, and the treatment is a
  _configurable adjustment_, not a permanent edit to a rating. (GPT states it most precisely; Beam
  proposes the same plus era tiers; I read the Owner's sentence literally and left the era question
  open.)
- **NBA needs its own maths** — no NFL position weights translated into basketball.
- **Data must carry provenance and be validated before it enters a sim.**
- **The NFL sim is protected**: the expansion may not destabilise the current build or the V21 work.
- **The Owner is the channel for conceptual questions**, and questions must carry a recommended default.

## 3. Where they conflict — and it is one decision, not many

**The engine topology.** Beam forks the engine per sport; GPT splits it into a shared shell plus one
engine per sport; I propose one profile-driven engine that every pack uses. All three agree the NFL
sim must not be broken, and all three agree a _cloned_ app is expensive — but they answer "how do the
sports share code" differently, and the answer decides:
- where the shared code lives, and who may change it;
- whether the harness, the gates and the fixes are written once or N times;
- **which record schema the 1,200 all-time ratings are written into** (mine and Beam's differ; GPT's
  layered model accommodates both);
- what "add a sport" costs: a profile + a pool (mine), a template copy (Beam), or a new package
  (GPT).

**The second conflict is organisational, and it is already costing us:** three question banks with
large overlap (Beam 39, GPT's, mine 53), three contribution systems, three claim boards, and two
identical artefacts (mine and GPT's both ship a question generator; mine and Beam's both ship a
dataset schema). The Architect's own guidance — _ask at most ~5 questions per brief, one canonical
facts file, one assembled-build gate_ — is the rule we are all breaking, in the same week, on the
same topic.

## 4. What the data work needs before the decision (and can start now)

Good news: the three proposals agree on the **method**, and the method is not blocked by the
architecture question.
- A **rubric** with anchors on the existing 60–99 scale (all three agree the scale must not move, or
  the existing `slotWins` / `modelWeights` maths breaks).
- A **30-player calibration set** per rater.
- **Two independent raters per player**, the median recorded, a third rater where the spread exceeds 5.
- **Provenance on every record** and a **validator** before the pool enters a pack.

Those four artefacts are identical under all three proposals. They are the long pole (1,200 records ×
2 raters). They can be produced while the architecture decision is being made, and they will not be
wasted whichever way the decision goes — _provided_ the record schema is decided first, or the pool is
produced as a **portable CSV/JSON with named fields** (name, pos, team, era, ovr, six attributes,
provenance) that any of the three structures can import. That is the one thing to enforce now.

## 5. My recommendation, in one line each

1. **One canonical expansion home.** The three folders are merged into one, chosen by the Owner, with
   the other two's content mapped in (nothing is deleted; the loser's content is either adopted or
   marked historical). A folder per proposal is a folder per _decision_, and there is one decision.
2. **One question channel, one bank, one answer log** — with the Architect's five-question-per-batch
   discipline applied to whatever is sent to Claude.
3. **One data protocol, one schema, one validator**, shared by every sport, with the _sport-specific_
   fields (NBA's shooting splits) as an optional extension block rather than a separate schema.
4. **The engine topology decided by the Owner and the Architect** — and my recommendation is the
   staged one: keep one engine, make the sport a _profile_, and cut the seam only when the second
   pack exists. Cost of being wrong: if a fork per sport turns out to be right, the seam work is
   wasted but nothing else is; if one engine turns out to be wrong, the migration cost is bounded by
   the profile boundary and the protected-symbol gate.
5. **The all-time NFL rating method starts now** (rubric + calibration), because it is agreed by all
   three proposals and it is the longest pole.

## 6. The question I will put to the Owner (one, not a batch)

> **Which single expansion structure is canonical — and therefore: one shared engine with sport
> profiles (my recommendation), a shared shell with one engine per sport (GPT), or a forked engine
> per sport (Beam)?**

Everything else — the rating method, the claim board, the validator, the question bank — is either
agreed or trivial to merge. This is the question that must be answered before the 1,200 records are
written, because it decides what they are written into.

## 7. What this note is not

It is not a ruling and it does not touch anyone's files: Beam's `_multi-sport/`, GPT's branch and
Ultra's lane are read-only to me. The comparisons and hashes in it are receipts; the recommendation
is mine and is open to being wrong.
