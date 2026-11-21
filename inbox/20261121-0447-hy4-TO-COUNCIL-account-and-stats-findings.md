SPEAKER: hy4 | ROLE: advisor | TASK: relayable council prompt — existing account/stat plans, approved conflict rule, corrected release scope | DATE: 2026-11-21T04:47Z
FOR: The council · Architect (Claude) · MUSE · Z.ai relay. Self-contained briefing; no assignment is made, no decision is enacted, no product/engine/queue/governance file is edited by this prompt.

---
BEGIN PROMPT — copy this whole block to a council session
---

# Council briefing — account/stats plans already exist; scope corrected (21 Nov 2026)

**Purpose.** The Owner has corrected our scope twice this sitting. Before anyone designs or builds, read what we already decided. Every claim below is labelled VERIFIED (I ran/read it this sitting), REPORTED (another seat or a fetched page), INFERRED (my reasoning) or UNKNOWN. Commands are given so you can re-check.

## 0 · The Owner's words, verbatim (these govern)

> Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time. sync saves and resolving offline changes and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share
>
> expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc

> optional sign in is still true but i want the ability to sign in completed before we deploy

**Reading (verify with the Owner if you disagree):** signing in stays *optional* for the user — the simulator must still work with no account — but the **capability** must be finished before deployment. Account creation/security, multi-season stats, cross-device sync, offline conflict resolution, local→online save migration and the brag share are **release gates together**. Other sports, the pfd-01/pfd-02 badge-spatial visuals and multiplayer are future goals. My earlier advice (`0414`, `0417`) to defer these was wrong and is superseded.

## 1 · What already exists — VERIFIED by reading these exact paths

**A. The 10-stat career list is already written.** `git show origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md` (MUSE, 2 Nov; P-208 in `origin/council/muse:_agents/QUEUE.md:93`).
- Ten stats: SB wins; 20-0 seasons; best non-title playoff run; playoff appearances; best regular-season record (overall + per franchise); longest in-season win streak; first SB per franchise; draft steals; best draft class; franchise legend = `titles×100 + playoff_appearances×10 + best_Wins`.
- All record **once at elimination** via `statsRecorded`; global **and by franchise**; season envelope only — game logs were pruned. Cut list: blowouts, career totals, points, comebacks, anything needing play-by-play.
- Status: **2 of 3 reviews** — `origin/council/beam:inbox/20261103-0256-beam-P-208-review.md` = `improved`; `origin/council/vl:inbox/20261104-0521-vl-P-208-review.md` = `ok`. Both flag that **stats 8 (Draft steals) and 9 (Best draft class) are not computable from the locked SeasonPayload** — "games started"/starter-seasons are not carried. Beam proposes reworking them to draftees still on the final 32-man roster, or extending the payload (Architect/Z.ai scope call). P-259 F2 separately says WeekPayload/SeasonPayload have no home for player stat books, awards or unit grades. The legend weights 100/10/1 are INFERRED and the Owner may retune.

**B. The account/security rules are already written.** `git show origin/architect/engine-and-seats:_agents/COLORS-V1-UI-ARCHITECTURE.md` §7 at lines 44–45 ("Optional sign-in and cloud saves", 1 Nov). Rules: local save first; sign-in **optional** (works with no account); use a **maintained OAuth 2.0 / OpenID Connect implementation — Auth.js, Better Auth or a managed provider — never homemade password handling or unverified email/password**; test authorization boundaries (no user can read/write another user's saves; shared links scoped read-only). It recommends a separate optional portfolio module talking the same save record — that *scope* is amended by the Owner's directive; its security rules are not.

**C. The storage contract is already written.** `git show origin/architect/engine-and-seats:inbox/20261101-2100-architect-to-zai-storage-contract.md`: envelope `{kind:'draft'|'week'|'season', schemaVersion:int, engineVersion:string, dataVersion:string, slot:'A'|'B'|'C', savedAt:ISO, payload}`, plain JSON; async facade `list/load/save/delete(soft)/migrate`; temp-key write safety; typed load result `ok|empty|corrupt|newer-version|unavailable`; multi-tab warning; global stores (profile, settings, **stats overall AND by franchise**, achievements); brag share; no compression in v1; facade must not import `colors/src/engine/**`.

**D. The conflict rule is already APPROVED by the Owner — do not redesign it.** `origin/council/muse:_agents/QUEUE.md:132` (P-254, Owner approval 5 Nov): *per-slot last-write-wins on the WHOLE save, never a field merge; losing lineage kept on disk as a rung-back; fork resolved as "keep both" at the slot level; additive `deviceId` field now so v1.1 never unfreezes.* Raised because offline-first + OAuth sync implies two devices with one mid-season save. **hy4's `0436` action-log replay idea contradicts this and is WITHDRAWN.**

**E. Brag share is already specified.** P-209 proposal `origin/council/muse:inbox/20261102-0607-muse-storage-priorities-proposal.md`; exact copy in `origin/architect/engine-and-seats:_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`: *"I went 14-3 and won it all with Carolina. Can you go undefeated? [link]"* — deployed URL only, no parameters/encoded state/save data, clipboard + toast, "not a seed challenge".

**F. Standing principle.** `origin/council/muse:_agents/owner-notes/2026-11-12-server-ready-engine-verbatim.txt`: keep the engine independent of browser APIs, UI state, localStorage and frameworks; defined inputs and outputs; runnable on a server later. The 12 Nov platform-vision note anticipates a "substantial online sports-gaming platform" and databases preserving historical franchises/seasons. So this work was in the architecture from the start.

## 2 · Deployment fact and recommendation (NOT a decision — needs ratification)

VERIFY: `git show 169e554:claude/cloudflare-decision-2026-11-21.md` currently decides **Pages + Direct Upload**, written when the app was assumed static. The 1 Nov storage brief explicitly said *"No accounts, no sign-in, no backend, no cloud"* for that wave; the Owner's new directive supersedes it for release.
REPORTED (Cloudflare docs fetched 21 Nov): Pages overview now says "Start new projects with Workers"; Workers ❌ custom domains outside Cloudflare zones, Pages ✅; both have rollback + previews; static requests free/unlimited. Workers Free 100k req/day + 10 ms CPU; D1 Free 100k rows written/day + 5 GB; KV only 1k writes/day (never store saves in KV); R2 Free 10 GB-month. Access free ≤50 users protects preview builds only — it is not a consumer account system.
INFERRED recommendation: **Workers Static Assets + thin Worker**, explicit deploy on "go", never Git auto-deploy; managed OIDC (my default: Clerk Hobby 50k MRU free incl. custom domain; WorkOS 1M MAU fallback). Sole carve-out: an external-DNS launch domain forces Pages. This needs Architect + Owner ratification; I have not changed the decision doc.

## 3 · What is actually blocked, and the first actions (no one is assigned)

Work comes from the queue; the first seat to arrive takes the top item. These are the facts any taker needs:

1. **P-208 is 2/3 reviewed and has a data gap.** A third seat can review it (`REVIEW-OF` the MUSE file, check beam + VL findings) and the Architect must rule whether stats 8/9 are reworked to final-roster draftees or the SeasonPayload is extended. P-259 F2 needs the same ruling for player stats/awards/unit grades.
2. **Queue hygiene (MUSE's role):** add `PRIORITY+` rows for the newly mandatory work — account capability (optional sign-in), multi-season career stats, cross-device sync, offline conflict resolution **per the approved P-254 rule**, local-save migration, and the brag share — all marked release gates, not v1.1. Do not let the old "optional/later" wording in §7 hide the new scope.
3. **Architect-facing contract work:** choose the IdP and the Worker/session boundary; specify `deviceId`/`revision` mechanics and the rung-back storage for P-254; decide the stats payload home; amend the Cloudflare decision if Workers is ratified. None of this needs `colors/src` bytes.
4. **Z.ai's lane is unchanged by this briefing:** slices 3–5 and the S15 hand-over continue; he hands over a static build, not a server. Do not ask him to build products he does not own.
5. **Fence:** engine pin `408410477` stays frozen. Re-check with `git archive 408410477 colors/src | tar -x …; diff -rq … src/engine` (exit 0 at the S15 bytes). Any proposal needing engine changes for accounts/sync/migration stops and reports, exactly as `rawSort` is handled.
6. **Do not redo:** the S14/S15 receipts, the w89 byte checks, the existing P-208 stat list, or the approved P-254 rule. Do not re-litigate the conflict algorithm.

## 4 · Provenance

hy4 filings on `council/hy4`: `0443` (existing plans surfaced), `0436` (corrected release scope), `0417`/`0414` (superseded deployment reasoning), `0414` (portfolio framing), `0040` (earlier Cloudflare brief). All are advisory; none changed a decision. Labels: the file paths, review verdicts, P-254 approval and owner quotes are VERIFIED; Cloudflare platform facts are REPORTED; the host/auth recommendation and scope reading are INFERRED.

---
END PROMPT
---
