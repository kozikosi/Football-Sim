# w71 — Strategy answers: framework, sync, repo timing, debt v2, N5, and the portfolio design

**From:** Z.ai (executor seat) · **To:** Muse (Owner) · **Date:** 2026-11-05
**Context verified before writing:** Owner's 4 Nov rulings on the architect branch
(`d1ba864`: faithful rebuild · repo at Colors v1 · no users · CI-created tags · public ·
Cloudflare primary) and the Architect's Q1–Q12 review (`bb98635`). This doc builds on those
rulings and never contradicts them silently. Labels: **[V]** verified in-repo this session,
**[R]** reported (commit/note, not re-checked), **[I]** inferred, **[M]** my measured number.

---

## §A — The portfolio piece, designed (the "don't take the prompt literally" answer)

The prompt asks six questions. The portfolio asks one: **what does a hiring manager see in
90 seconds, and what does a senior engineer see in 30 minutes?** Every queued item should
serve one of those two views. Here is the design that makes them compose.

**The one-liner (README headline):**
> A deterministic, fully-tested football simulation — rebuilt from a proven 1.8 MB hand-made
> game into a modern typed codebase, with the receipts: 300+ tests, golden fixtures, an
> invariant-checked model, CI-pinned artifacts, and a council-audited development process.

**The 90-second funnel (each step exists to pass a threshold):**

| Step | What they see | The artifact that delivers it | State |
|---|---|---|---|
| 1. Live demo, instant play | A beautiful, fast football game that works on a phone | Cloudflare Pages static build | w70 lineage is the aesthetic; Colors v1 is the rebuild target |
| 2. README numbers | "deterministic seeds · N tests · 15 KB shell · zero console errors" | scaffold CI + engine stats | toolchain proven [M this wave] |
| 3. Model Report | *This studio candidate measures his game like a scientist* — outcome distributions vs real-NFL bands | **N4 Outcome Lab** | **v0 shipped this wave** |
| 4. Council exhibit | *This candidate runs AI-assisted development with governance, audits, and honesty about failures* | **N1 docs/council/** | outline shipped this wave, pending your review |
| 5. The archive | 70 waves of history, debt inventories, pins — depth for the 30-minute reader | old repo, read-only | exists |

**Signal ranking for sports-gaming employers (2K, EA), strongest first:**

1. **Deterministic seeded simulation with invariant CI** — rare, hard, directly game-relevant. The engine + Outcome Lab is this signal.
2. **A shipped, polished, playable demo** — finish quality. The w68 aesthetic law ("match what we cultivated") is this signal. Never trade this for engineering purity.
3. **Full-stack closure** — sync API (Workers + D1) shows product sense beyond the canvas: save anywhere, continue anywhere.
4. **Quantitative validation vs real NFL data** — the Model Report + nflverse calibration. Studio interviewers respect anyone who brings distributions, not vibes.
5. **The multi-agent process story** — genuinely 2026-relevant; the council exhibit makes it credible instead of buzzwordy.
6. **Framework choice** — the weakest signal of the six. Nobody was ever hired for Svelte; people are hired for the judgment shown in the writeup.

**What "fully fledged" adds beyond the current queue (small, high-visibility):**
- **Brag shareables (N2, re-scoped)**: a canvas-rendered season-summary PNG — crest, record,
  Super Bowl result, award winners, team-of-the-year — via download + Web Share API. This is
  the phone-era moment and it doubles as free marketing when shared. Position: **v1.1,
  alongside sync** (both are "the season as an artifact" features; sync moves it between your
  devices, the shareable moves it to the internet). Not replay URLs — that idea is dropped
  per your correction; the `datasetId` envelope field it would have needed survives because
  sync needs it anyway (§E.5).
- **A performance budget in CI**: bundle-size ceiling + boot-to-interactive time budget,
  failing the build on regression. One YAML block; turns "fast" from an adjective into a
  receipt.
- **The 20-0 mode as a named feature** in the demo's feature list — it's memorable in
  interviews ("the owner demanded a mode to chase 20-0, so we built the endgame screen with
  its own contrast battery"). Charm is a differentiator; keep it.

## §B — Q1: Framework. The case for Svelte 5 + Vite + TypeScript (and the honest caveats)

**Recommendation: Svelte 5 + Vite + TypeScript, decided before the first slice, frozen at
the first slice.** This is a real recommendation, and I'll give you the counter-case fairly.

**1. The engine seam already speaks Svelte. [V]** The engine's `store.ts` implements the
Svelte store contract (subscribe/unsubscribe) — it was designed that way. React consumption
needs a `useSyncExternalStore` wrapper (~6 lines, fine); Svelte consumption is native
`$store` auto-subscription, zero adapter. I proved the seam end-to-end this wave: a Svelte 5
component driving a contract store through START/PICK/UNDO with zero adapter code — build
green, 4/4 tests, browser-verified, in `football-sim-next/` (§G).

**2. The numbers from this wave's proof build [M]:** total JS shipped **15.05 KB gzip**
(runtime + app + store), CSS 1.77 KB, build 0.13 s, tests 0.64 s. A React + Vite equivalent
carries react+react-dom (~45–55 KB gzip) before a line of game code. The portfolio headline
writes itself: *1.8 MB single file → a ~15 KB shell over a typed engine.* On a phone on
cellular, that's the difference the demo makes every single load.

**3. Reactivity shape fits the architecture.** Claude's view-model layer (11 enumerated VMs,
2 built [R]) produces frozen projections consumed by dumb components. Svelte's
compiler-driven reactivity binds to exactly this without the memo/callback/dependency-array
discipline React requires to stay fast — that discipline is where React apps ship their two
classic bugs (stale closures, dep-array misses). Fewer correctness taxes on every screen is
worth real tokens across a 20-screen port, especially with me writing the volume.

**4. Scoped styles + tokens.** The COLORS-V1 token law (no raw hex, contrast-gated pairs)
maps 1:1 onto Svelte scoped styles + CSS custom properties; the w70 fixes (scoped ink pairs,
theme-aware neutrals) port as token rules, as the w70 ledger already noted.

**5. The Cloudflare Workers factor — it changes nothing about the frontend, and it argues
against SvelteKit.** The sync API is fetch+JSON from any framework. SvelteKit's server value
was already set aside as dead weight for a client-only game; with a separate Workers API
(which you want for other reasons: independent deploy, the portfolio's full-stack story,
free-tier isolation), Kit's remaining value shrinks further. Static Svelte+Vite → Pages,
Workers → API: two clean deployables, both Cloudflare-native, both free-tier. If you someday
wanted the API inside the frontend repo as Kit server routes, migrating ~5 endpoints is a
day — the door stays open.

**6. The React counter-case, honestly:**
- *Name recognition is real.* Kosi's instinct isn't wrong: more job posts say React. But game
  studios hire on C++/engines/math/demonstrated shipping; the web framework is a rounding
  error on a games portfolio, while the demo, the engine, and the rigor are the resume.
  "Why Svelte?" is an interview *invitation* — and the answer (measured bundle, store
  contract fit, reactivity model) demonstrates exactly the judgment the job wants. Every
  React portfolio looks the same; a Svelte portfolio with a written rationale gets remembered.
- *Team unfamiliarity is real.* Nobody in the council has shipped a large Svelte 5 app.
  Mitigation: the architecture confines Svelte to thin components over VMs — a small,
  repeatable pattern surface, and the volume seat (me) carries it. The risk is bounded by
  the architecture, not by anyone's Svelte depth.
- *The reversibility argument is the decision's real insurance:* store + VMs + engine are
  framework-agnostic by design; components are thin. Porting the shell Svelte→React after a
  change of heart is a bounded chore (days), not a rewrite (the engine never moves). But the
  cost asymmetry matters: flipping today costs half a day; flipping after the first slice
  costs every screen twice. **Decide before the first slice; freeze it there.**

**Bottom line:** Svelte 5 + Vite + TS. If your gut still says React after this — because a
specific job list you're targeting says React — that is a legitimate tiebreak, and I'll
execute React without complaint; the scaffold's pipeline survives the choice unchanged,
which is exactly why I built it framework-separable.

## §C — Q2: Repo timing — your 4 Nov ruling is right; here are the three amendments

⚠ **First, a flag:** this question may already be answered. Your 4 Nov note on the architect
branch rules: *"wait until Colors v1 exists, then cut over to a fresh repo with no history
mirror; old repo stays as read-only archive."* This prompt re-asks the question, so the
prompts likely crossed in flight. I affirm that ruling — with the portfolio-timeline caveat
below and three amendments that capture most of the early-repo upside at near-zero risk:

1. **The toolchain is proven in advance (done this wave, §G).** Cutover day stops being a
   pipeline project; it's merge-scaffold + tag v0.1.0. The scaffold lives framework-separable
   so it doesn't care what the final framework call is.
2. **Freeze the cutover checklist now** (one page, kept in the new repo's seed): README
   skeleton, CONTRACT.md/PINS.md pointers (the Architect's Q3/Q10 list), the
   old-Pages-redirect plan (his shared-localStorage-origin finding is real: same
   `github.io` host = shared storage; the old site must redirect or switch off at cutover),
   and the first-tag checklist. The move then executes in one sitting, on your go.
3. **The interim public face is the old repo** — it's already a portfolio: live demo (w68–w70
   on gh-pages), the debt inventory, and now the Model Report. If a hard application deadline
   lands before Colors v1, the pre-frozen checklist is the escape hatch that lets us cut over
   early in one day instead of two weeks.

Why not earlier (agreeing with the ruling): the new repo's first public commit should be a
complete, playable, beautiful slice — a hiring manager who clicks in should never see a
half-ported skeleton; contract churn (E1–E5, Step 9 are still landing weekly [R]) should
settle into the old repo's history, not the exhibit's; and one source of truth until cutover
spares a 20-seat council a coordination tax it doesn't need.

## §D — Q3: Debt inventory v2 — timeline (v2a shipped this wave)

- **v2a — done this wave.** The storage dump harness + first evidence: fresh boot writes zero
  keys; `zpb:theme`/`zpb:tab` shapes captured; the envelope law verified statically
  (validator requires exactly kind/schemaVersion/engineVersion/dataVersion/slot/savedAt/
  payload — **no sport field**, matching VL's migration note); the live autosave envelope
  literal extracted (w65 law); slot-key family mapped (`zpb:st:slot:{A,B,C}` + `:bak|:tmp|:del`).
  This **closes the Architect's Q4 open item** ("is the slot value already an envelope?" —
  yes, by construction) and **satisfies his P0 dependency** ("real w68 dumps — depends on
  Z.ai"). Full details: `inbox/20261105-w71-debt-inventory-v2a.md`.
- **v2b — screen × state matrix** (13 screens × empty/populated/error/390px/dark+light),
  in batches alongside porting; error cells synthesized by injecting corrupt/quota states —
  which doubles as the Architect's golden migration material.
- **v2c — per-wave diff review w34→w70** for accidental features (ZPB34 layer, depth-chart
  overflow, tab-restore edge).
- **Blocks nothing; gates port order.** Matrix cells will surface "port-first" screens (the
  ones with live behavioral debt) — that ordering is v2's whole point.

## §E — Q6: The sync plan (cross-device save sync, zero recurring cost)

**Sequencing first: your rebuild-first instinct is right, no pushback.** Sync is cleanly
additive: a leaf module over the storage layer, never imported by engine or app state, UI
treats it as a background service (synced/pending/offline), the game is fully playable with
airplane mode on. Building sync first would tax the one thing that matters (Colors v1) to
serve the least-used feature. Two cheap decisions ride NOW so v1.1 is a pure add:
1. **Add `datasetId` (a uuid minted at "new season") to the save envelope header.** It rides
   the already-approved migration (copy verbatim + add `sport:"nfl"`), costs nothing, and
   spares a second format migration later. Multi-device identity needs it; versioning needs
   it (the surviving shard of N2); do it while the envelope is already being touched.
2. **All persistence routes through the typed storage module** (already the plan) — sync then
   hooks the same module as a third replication target beside the localStorage slots.

**E.1 API surface (minimal, five endpoints):**

| Endpoint | Body → Response | Notes |
|---|---|---|
| `POST /v1/pair` | `{code, deviceName}` → `{token}` | code = 6-digit, 10-min TTL, generated by an already-paired device |
| `POST /v1/saves` | envelope + `baseRev` → `{rev}` or `409 {serverMeta}` | upsert one slot; server assigns monotonic `rev` |
| `GET /v1/saves` | — → `[{slot, rev, savedAt, deviceId, engineVersion, dataVersion, sha256}]` | headers only, no payloads; cheap diff for pull decisions |
| `GET /v1/saves/{slot}?rev=N` | → envelope | default = latest; N = point-in-time |
| `GET /v1/saves/{slot}/history` | → `[{rev, savedAt, deviceId}]` | last 20 revs; recovery = GET at old rev |

**E.2 Conflict resolution — last-write-wins with history and a three-button prompt.**
True 3-way merge of two diverged season saves is meaningless (frozen-state envelopes — you
can't interleave two timelines). So: client tracks `baseRev` (last rev it pulled for that
slot). Push with `baseRev < serverRev` → `409` + server meta → one dialog: **"This slot
changed on <device> at <time>" — Keep mine / Use theirs / Keep both** (the loser lands in a
scratch slot). Nothing is ever silently destroyed; every accepted write appends a rev; the
history endpoint *is* the backup (20-rev retention). For a single-user system this is the
whole correct design — merge UIs are how you spend a week building a bug.

**E.3 Auth — device pairing, not accounts.** Given your 4 Nov ruling ("no users other than
me"), the honest threat model is "randoms who find the URL," not "determined attackers."
- An **enrollment secret** (Worker env var) gates pairing entirely: without it, the API is a
  404 machine to the world.
- Pairing: laptop shows a 6-digit code (10-min TTL) → phone enters code + device name → both
  hold a random 32-byte bearer token (stored hashed in D1).
- Zero email provider, zero OAuth dance, zero passwords, zero third-party dependencies —
  ~30 lines of Worker code. A magic link (Resend free tier, 100/day) is the alternative if
  you'd rather have email in the loop, but it adds a third party and deliverability risk for
  a system with exactly one human. My vote: pairing.

**E.4 Infrastructure & cost (all free tier, as of late 2026 — to re-verify at build):**
Workers free ≈ 100k req/day; D1 free ≈ 5 GB storage + 5M row-reads/day. Payload ≈ 90 KB/draft
save [R: Architect's saves.ts note]. One user syncing three slots dozens of times a day is
**three orders of magnitude** inside every limit. Two tables: `devices(token_hash, name,
created_at)`, `saves(slot, rev, envelope_json, saved_at, device_id)` with `PRIMARY KEY(slot,
rev)`. Token-per-token rate limit to stay inside free tiers even if the URL leaks. Deployment:
`api/` folder in the new repo (one clone = the full-stack story), its own wrangler config
(skeleton already in the scaffold), CI deploys it on your explicit trigger, same as Pages.

**E.5 What sync must NOT do (law proposals):** never block boot on network; never write to
slots directly (it mirrors through the storage module); never carry NFL-shaped logic (the
payload is an opaque versioned blob — this is what makes basketball sync free later, §F);
never be the only copy (local-first, cloud is a mirror).

## §F — Q5: N5 (basketball) timing — unchanged by sync, and that's a feature

Post-interface-freeze, as originally placed. The two features don't interact: sync operates
at the envelope level (already gaining `sport:"nfl"` in the approved migration; §E.5 keeps
payloads opaque), N5 operates at the `sports/` level — the whole point of the exercise is
`git diff --stat core/` coming back **empty**. Sequencing therefore: interface freeze →
Colors v1 → sync v1.1 → N5 slice. Two notes for the record: (1) licensing — the Architect
flagged Madden/2K ratings licensing as an open legal question [U] for any public basketball
data; N5 ships with original data only until you rule otherwise. (2) Portfolio calculus —
for 2K-targeted applications, N5 is your second-sport proof; but per unit of effort, the
Model Report + polish + sync carry more signal than a thin basketball slice. N5's trigger
should be "after v1.1, when you want the 2K-specific story," not a date.

## §G — Q4: Project scaffold — proven this wave, ahead of the contracts

Yes — ready before Claude's contracts land, and already built. `football-sim-next/`
(delivered in the zip):

- Svelte 5.57 + Vite 8 + TypeScript + Vitest: **typecheck 0 errors, 4/4 tests, build 15.05 KB
  gzip JS total**, browser-verified (contract store → component, zero console errors). [M]
- GitHub Actions: install → typecheck → test → build → sha256 pin → **draft** Release on tag
  (implements your decision 4: CI creates tags/releases; go-live stays a deliberate Owner
  act, per the Architect's Q11 shape). Pages deploy is a separate `workflow_dispatch` job —
  it needs two repo secrets only you can create (`CLOUDFLARE_API_TOKEN`,
  `CLOUDFLARE_ACCOUNT_ID`); that's the 2-minute Owner step. Everything else needs nothing.
- `api/` Worker skeleton (`/v1/health`, D1 binding declared) — the sync plan's home, present
  but unimplemented, respecting the sequencing.
- `README-SCAFFOLD.md` documents all of it, including the framework-separability argument
  (the pipeline survives a React flip unchanged — by design).

**To be explicit about what "proven" means today:** build, typecheck, tests, artifact hashing,
and the workflow files are verified in-sandbox; the actual Cloudflare push requires your
token (free account, two secrets, one click). The moment the new repo exists, CI takes over
and my sandbox drops out of the loop — which is the goal.

## §H — Cross-seat notes for the Architect (delivered this wave, no response required)

1. **His P0 dependency is satisfied** (the storage dump) — see §D and
   `inbox/w71-storage-dump/`. His Q4 slot-shape open item is closed: envelope by construction.
2. **Two Outcome Lab findings want his ruling** (never engine changes from my seat):
   home win rate 54.7–55.4% vs his 53.2±1.5 band across ALL three populations (engine default
   `HOME_FIELD=1.7` in every run); parity band 3.0–3.5 holds on his synthetic population
   (SD 3.10) but not on drafted-Madden leagues (SD 2.20) — a population/design question, not
   a bug report. Full data + a constant-sensitivity offer:
   `colors/tools/outcomelab/FINDINGS-for-architect.md`.
3. **Invariant spec precision:** "mean wins = 8.5 exactly" is unreachable with ties; the
   sweep checks `8.5 − tiedGames/32` (exact, holds). Worth one line in Q7's final form.
4. One housekeeping call for him: the sweep imports `test/nfl/fixture.ts` to avoid
   duplicating league construction — if tools shouldn't import from `test/`, I'll copy the
   15-line builder instead.

— Z.ai, executor seat · w71 package (strategy + tooling; no product HTML this wave)
