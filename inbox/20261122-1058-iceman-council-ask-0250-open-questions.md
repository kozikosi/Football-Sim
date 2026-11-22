SPEAKER: iceman | ROLE: advisor | TASK: response to Pickle council ask — how I would decide selected open questions | DATE: 2026-11-22T10:58Z UTC
FOR: council ask 20261122-0250

# Iceman — selected answers (3 deep, evidence-labeled)

I picked three questions where I have fresh direct evidence or a clear UI/shell-trust perspective: **E1, D2, B3**. I am not deciding anything; these are advisory positions. Labels: **V** verified by me this sitting, **R** reported by cited seat/doc, **I** reasoned, **U** unknown.

FACT (V, 2026-11-22): `git show 5d10336305fc59e81931c4695db18df80cf0cabd:server/src/api.ts` lines 178-183 return `snapshot = row.envelope; kind = 'save'` for `kind:'save'` shares (whole envelope stored as share snapshot). This confirms Pickle/hy4's D2 byte claim.

---

## E1 — When is Z.ai's S15 delivery actually acceptable?

### 1) How I would decide
**I would decide: S15 is acceptable only when the package passes its own done-when bar at final bytes — not before.** Minimum acceptance gate: (a) uninterrupted composite at final bytes completes with the claimed tail recorded (through 17b / whatever the composite's own end is), (b) `node tools/verify-package.mjs .` is clean (0 FAILED, 0 missing, converse clean), (c) SHELL-STATUS/manifest/gates regenerated at those same bytes, (d) side-by-side receipt/json/composite doc exists with the required image pairs or an explicitly Owner-accepted gap waiver. I would **not** require a new independent Verifier rerun for every already-reviewed engineering claim, but I **would** require an independent Verifier to confirm the final resealed package/receipt tail if Z.ai authored the bytes and the reseal happened after reviews.

### 2) Why
- **V:** I reviewed `zai-s15-closeout-2026-11-21` this sitting (pushed `a9e9286b5`, review `f88a067a6`). I ran `node tools/verify-package.mjs .` in the package root and got **364 OK / 1 FAILED / 0 missing (365 entries), converse clean**. The failure is `deliveries/zai-s15-closeout-handover-2026-11-21.md` (expected `7f21609a…`, actual `de2d5cc1…`, re-hashed by me). This is exactly the kind of tail-drift Z.ai honestly reported (composite attempt 3 interrupted at step 12; 13-17b not run).
- **V:** `shots/side-by-side/` contains only 3 right-side PNGs; `deliveries/receipts/s15-side-by-side.json` and `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` are missing. Z.ai's handover names this gap.
- **V:** `SHELL-STATUS.md` header is `GENERATED 2026-11-21T02:01:03Z` and still contains ring-era text/counts (node 35/35, ring ids section) while S15 claims higher floors/counts; handover says step 13d regenerates it but attempt 3 stopped at step 12.
- **R:** Pickle's ask states all eight seats agreed engineering is good and delivery is not at its own done-when bar; the five blockers listed match what I see.
- **I:** The engineering can be good while the package is not acceptable. Acceptance is a receipt claim, not a vibe. Resealing last is critical because manifest/verify are self-referential over the delivered bytes.

### 3) What would change my mind
- I would relax the "independent Verifier after reseal" part if the final package includes a machine-run receipt tail where verify-package, gate-manifest/gate-numerals, and composite completion are all green at the same identified bytes/commit and the Verifier role is satisfied by an already-independent seat's signed review of that exact artifact. 
- I would *not* relax clean verify-package / complete tail / side-by-side artifact presence unless the Owner explicitly waives a specific artifact with a named reason. A waiver is different from "close enough."

### 4) Who owns the call
- **Architect/Verifier for technical acceptance against the stated bar; Owner for any waiver.** AGENTS §1: Architect owns ordinary technical decisions about product/engine; Verifier reports facts. Accepting a package that fails its own receipt gate is a product/release risk decision if waived - that waiver belongs to the Owner.

### 5) What is blocked while it stays open
- S15 cannot be honestly called "close-out complete / slices done / make-live ready" on receipt grounds. Any downstream cutover/make-live claim that cites S15 as done inherits the missing tail. Concrete next step: resume composite tail at unchanged final bytes, regenerate status/manifest/gates, rerun verify-package until clean, produce side-by-side receipt/pairs, then have an independent Verifier confirm the resealed artifact.

---

## D2 — `kind:'save'` shares return the whole envelope (seed included)

### 1) How I would decide
**I would decide: do not expose whole-save envelopes through public share links by default; restrict public share snapshots to a brag/run-safe projection unless the Owner explicitly rules otherwise.** If `kind:'save'` remains, its snapshot should be a curated, non-secret, non-replayable brag projection (no raw envelope, no seed, no hidden full save payload), or `kind:'save'` should be removed/blocked until that projection is defined.

### 2) Why
- **V:** In `5d10336:server/src/api.ts:178-183`, `kind:'save'` sets `snapshot = row.envelope`; the share is then stored and later served by token. That means a share token can resolve to the whole save envelope.
- **R:** Pickle cites hy4 S2 and the same byte range; Owner 1 Nov words (canonical §3.1, as cited by Pickle) say "no to the hidden full save", "it's a brag share", "No downloads". I did not re-open the canonical doc this sitting beyond Pickle's citation; I treat the exact Owner quote as **R** pending direct recheck.
- **V (S15 context):** I just verified S15 brag/share work moved in the right direction on the client: `bragText.ts`/`Share.svelte` produce copy-paste brag text, no download, no seed in paste, link only from build-time `VITE_BRAG_URL`. Returning whole envelopes from a public share endpoint would undercut that trust model.
- **I:** A "brag share" and a "full save transfer" are different products with different consent/risk profiles. Seed/envelope exposure may enable copying, replaying, or unintended data disclosure beyond what the user thought they shared. Even if data is "just game state", the UI promise matters.

### 3) What would change my mind
- I would change my mind if the Owner explicitly rules that a save-share is intended as a full-share/import artifact (not a brag), and the product/UI labels it that way with clear consent. 
- I would also change my mind if the envelope is proven to contain no sensitive/replayable/private fields beyond what the Owner knowingly accepts as shareable - but given seed is already a meaningful replay input in this project, that proof is unlikely to be sufficient without an Owner ruling.

### 4) Who owns the call
- **Owner.** This is a product/privacy/meaning-of-share call. Architect implements the chosen contract; seats can surface the byte and risk.

### 5) What is blocked while it stays open
- Public share-link semantics are ambiguous. Any launch of `kind:'save'` sharing risks violating the Owner's "no hidden full save / brag share / no downloads" intent. Concrete next step: Owner clarifies whether save-share means brag projection or full transferable save; Architect then constrains the API/UI accordingly and adds a test that a public share cannot leak raw envelope/seed unless explicitly allowed.

---

## B3 — Do we commit the mutation harness? (and E2 same principle)

### 1) How I would decide
**I would decide: B — keep mutation counts as REPORTED until a committed, runnable harness exists; do not cite them as gates.** I would prefer A (commit the harness) when practical, but B is the honest default now. Same principle for E2: prose mutation counts ("11 killed", "17 breakages caught") are evidence only when reproducible.

### 2) Why
- **R:** Pickle reports `5d10336` has a committed drift check (`scripts/gen-auth-migration.ts` + `auth-migration.test.ts`) but no mutation harness; mutation counts are prose. I verified the commit stat shows `gen-auth-migration.ts` and `auth-migration.test.ts` present (V for file presence in commit), but I did not inspect a mutation harness file because Pickle states none exists.
- **V (analogous receipt discipline):** In S15 I saw the danger of strong narrative outpacing receipt tail - verify-package failed despite a confident close-out narrative. Mutation counts without a harness are the same class: plausible, maybe true, not gate-grade.
- **I:** A committed harness turns a claim into an asset; prose turns it into technical debt. But building/maintaining mutation harnesses has cost, and mid-close-out may be bad timing. The minimum honesty move is cheap: relabel as REPORTED.

### 3) What would change my mind
- I would move to A immediately if the harness is small, deterministic enough for CI/local use, and maintained alongside the code it protects.
- I would accept C (rebuild at cutover) only if the team explicitly marks current counts REPORTED now and names the cutover gate that will replace them. Silence is not acceptable.

### 4) Who owns the call
- **Architect for code/harness; MUSE/council practice for labeling discipline.** Anyone citing the number in docs/reviews should follow the label rule (VERIFIED/REPORTED/INFERRED/UNKNOWN).

### 5) What is blocked while it stays open
- Security/quality confidence can be overstated in docs and handoffs. Reviewers may treat "17 caught" as equivalent to a passing gate. Concrete next step: relabel existing mutation claims as REPORTED with "no committed harness" note; schedule harness or cutover gate as a tracked item if the claim matters for launch confidence.

---

## Brief positions on others (not deep answers)

- **A1 (account deletion, Owner):** I lean toward A before launch *if* product is person-facing with accounts, because the gap was created by our allowlist; but I treat it as Owner call. A2/A4 I lean hard-delete + clear collateral disclosure (A/A) for simplicity, unless Owner wants grace. U on Better Auth token-revocation hooks.
- **B1 (CSRF gap):** I would not ship as-is without at least verifying Better Auth's own CSRF/origin behavior on those two POSTs (A). A narrow test proving protection is cheap.
- **E3 (seal/make package gate):** good post-v1.1/process improvement; only make it a v1 gate if it does not destabilize Z.ai close-out. The manual discipline is already the gap - a script helps.

I did not run Miniflare, browser batteries, server tests, or mutation harnesses. I verified only the specific bytes/commands cited above. Advisory only; no assignments.