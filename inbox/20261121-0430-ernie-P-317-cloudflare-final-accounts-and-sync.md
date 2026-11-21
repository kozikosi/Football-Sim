SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: final Cloudflare + architecture recommendation, with the four account/sync factors folded in (account creation & security · cross-device save sync · conflicting offline changes · migrating local saves online) | DATE: 2026-11-21T04:30Z
FOR: the Owner (decision) · TO-ARCHITECT (`claude/cloudflare-decision-2026-11-21.md`, v8, runbook)

Supersedes the platform half of my `inbox/20261121-0420-…`; adds the four factors and one new
constraint nobody has stated. No implementation, no decision changed.

## 0 · The punchline first

The four factors do **not** decide Pages vs Workers — both can host a static bundle and both can bind
D1/KV/DO (Pages needs DOs in a *separate* Worker; Workers has them natively). What the four factors
*do* decide is one thing the current plan has not treated as a decision at all:

> **The deployment origin is a data-migration decision.** `localStorage` is scoped per origin
> (scheme + host + port). Every save, every setting, every "restore" lives under the origin that
> wrote it. Move from `foo.pages.dev` to `foo.com` and **every existing player's saves appear
> deleted** — not corrupted, not synced, simply unreachable.

So the real long-term consequence of the hosting choice is not the product name on it; it is that
**you get one origin, and you should launch on the final one.** That is a stronger argument for buying
the domain *before* the first public send than the portfolio argument was, and it is the only
irreversible thing in this whole discussion.

Corollary for previews: a Pages/Workers **preview URL is a different origin**, so "restore my saved
draft" cannot be tested on a preview — previews are for review, never for data. Worth writing into
the visual-acceptance spec so nobody files a bug about it later.

## 1 · The four factors, each with what it costs now vs later

### (1) Account creation and account security

- **Now: build no auth.** Two free options, and they serve different purposes:
  - **No account at all — a sync code** (see §2). This is the v1 answer: identity is a short code,
    like the seed code the app already prints (`b36:a3f2`).
  - **Cloudflare Access + One-Time PIN** for a *private beta* URL only: verified **$0, up to 50
    seats**, email OTP as an identity provider, policies by email address, no code written by us.
    It is real security with zero engineering — but it *gates* the host, so it must never be put in
    front of the public demo. Use it for a `beta.` subdomain if you want a closed test.
- **The portfolio-visible part is the threat model, not the login.** One `THREAT-MODEL.md` page —
  what is stored (opaque saves, no PII), what is never stored (no email, no payment, no telemetry),
  what the client can and cannot be trusted for (a leaderboard needs server-side replay validation),
  and what the token custody is — reads as senior and costs an afternoon. Most candidates have no
  answer to "how would you store my data".
- **Free-only note:** Zero Trust Free requires a card on file even at $0. No charge, but the Owner
  should know before he starts that step.

### (2) Synchronizing saves across devices

The good news is architectural and already true: **a save is a deterministic action log, not an opaque
blob.** The envelope is `{ seed, picks[], pickSlot?, engineVersion, dataVersion, saveId, saveRevision,
createdAt, savedAt }`. Same seed + same ordered picks = **bit-identical state**, because the engine is
deterministic. That means:

- **Sync is rebase, not merge.** Compare logs, replay the missing suffix, done.
- **No account is required for v1.** A short **sync code** maps to a server-side log; paste it on the
  other device and the log replays. That is cross-device sync with zero auth surface, and it is a
  genuinely nice demo ("your draft, on any device, with a 6-character code").
- **Accounts become an upgrade, not a prerequisite** — attach a code to an identity later. This
  dependency order (capability first, identity second) is the correct one and it is also the cheapest.
- Server cost: one D1 row per revision. Free tier is ample. **This is the first thing that justifies
  a backend at all**, and it justifies it for a *feature*, not for infrastructure's sake.

### (3) Resolving conflicting offline changes

Two different conflicts, and conflating them is the classic mistake:

- **Divergent drafts** (both devices drafted from the same seed, different picks) → **fork, never
  merge.** A draft is an authored history; there is no correct merge of two histories. Keep both as
  separate saves and let the user choose. This is *exactly* the rule the Owner already set when he
  rejected What-If / alternate history ("keep the canonical history") — divergent drafts **are**
  alternate histories, so forking is the consistent model, not a compromise.
- **Concurrent edits to one save** (settings, lineup advice, notes) → last-write-wins on
  `saveRevision` + `savedAt`, keep both, mark the loser, never overwrite silently.
- **Design rules that cost nothing now:** every save keeps a stable `saveId` and a monotonic
  `saveRevision` (both already exist); no code path may overwrite a save without a visible
  "two versions exist" choice; and the deterministic log lets the *server* validate an offline
  action log later (which is also the anti-cheat path for any leaderboard).
- Portfolio line that is actually true here: **"conflict-free by construction — divergent drafts fork
  rather than merge"**. That is a stronger claim than "CRDTs", and it costs no new machinery.

### (4) Migrating local saves into reconnection with online

- **Make it idempotent and keyed by what already exists:** `saveId` is already a client-generated UUID
  in the envelope, so migration is a `PUT /saves/{saveId}` — re-uploading is a no-op, no duplicates.
- **`engineVersion` / `dataVersion` already let the server refuse or flag an old-engine save** instead
  of silently mis-rendering it. That is the same drift machinery the saves panel already uses.
- **UI:** "Link this device" → upload local saves → show the sync code. One button, one POST.
- **Blocker to fix first — my D5.** `App.svelte:83` stamps `67-cakepanz@d3bd81d2` into every save
  while the engine is `408410477`. The moment a server compares stamps, **every save this build writes
  is "from another build"**, and migration will flag the user's own data as foreign. Fix the stamp
  (and add the law that asserts envelope stamp == running stamp) *before* any sync exists, or the
  first migration will be a support ticket.
- **The origin problem (§0) is factor 4's hardest case.** Export/import is the only mitigation that
  works without a server, and it is free: one "Download my saves" / "Load a save file" pair over the
  existing JSON envelopes. Build that early; it also happens to be what a reviewer will try first.

## 2 · Does this change Pages vs Workers? Yes — modestly, and now for a real reason

| consideration | effect |
|---|---|
| Both host the static bundle free and unlimited | neutral |
| Both bind D1 / KV / R2 | neutral |
| **Durable Objects**: Workers ✅ · Pages 🟡 (must be a *separate* Worker, bound with `script_name`) | favours Workers for §2–§4 + future multiplayer |
| Pages' one unique advantage (custom domain outside Cloudflare) | neutralised by the default "move nameservers" |
| Cloudflare's own guidance for new projects | favours Workers |

**Recommendation: Workers + Direct Upload** (`wrangler deploy dist`, one config file, no secrets in
the repo), with **Pages + Direct Upload** only in the branch where the domain's DNS cannot move.
Release control stays Direct Upload, triggered by the Owner after the side-by-side — never
push-to-publish. That part of the current plan is right and survives.

## 3 · What to build now (free, static, portfolio-visible) vs park

**Build now, in this order:**
1. **A domain, on the final origin, before the first public send** (~$10–15/yr — the only spend, and
   now justified twice: portfolio polish *and* origin stability).
2. **Save export / import** (one file download/upload over existing envelopes) — free, and it is the
   answer to §0 and factor 4 before any server exists.
3. **Fix the engine stamp (D5) + the law that guards it** — blocks factor 4 otherwise.
4. **`THREAT-MODEL.md`** — the security answer, written not coded.
5. **`ARCHITECTURE.md` + a `/verify` page** — the engineering story, made legible.

**Park, but keep the seams clean (free optionality):**
accounts · D1 · Durable Objects · multiplayer · cloud saves · shared leagues. The optionality is
already paid for: pure engine (the layer test enforces no DOM/clock/`Math.random` in
`core`/`sim`/`app`/`view`), the `port/` layer as the single place a sync adapter attaches, and
versioned save envelopes. **Nothing needs to be built for the door to stay open — it is open.**

## 4 · Final recommendation, one line each

- **Platform:** Workers + Direct Upload (Pages only if DNS can't move).
- **Origin:** decide it now, buy the domain, launch there, never move.
- **Accounts:** none in v1; a sync code carries identity; Cloudflare Access + OTP if you want a
  closed beta (≤50 seats, $0); accounts later *upgrade* a code.
- **Sync:** rebase the deterministic action log; no merge, ever.
- **Conflicts:** fork divergent drafts, LWW for metadata, never silent overwrite.
- **Migration:** idempotent `PUT` by existing `saveId`; refuse foreign `engineVersion`; ship
  export/import first.
- **Don't build:** any of the stateful infrastructure until a *feature* demands it — the first one
  that will is cross-device sync, and it is a feature users can see.

— ERNIE (advisor; signs as ERNIE, never as another seat)