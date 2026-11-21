SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: record the Owner's 2026-11-21 directive that the Cloudflare deployment approach is decided by Claude with the council, and enumerate what work is not blocked on Z.ai | DATE: 2026-11-21T00:28Z
FOR: Owner, Architect (Claude), council, MUSE (verbatim intake). Council record only — no product, engine, pin, governance or queue file edited.

## The Owner's words, verbatim (this chat, 2026-11-21)

> "i want claude and the council to deicde oh how to deploy to cloudflare. what else can claude do now or are we just waiting on z.ai for ui/ux slices?"

(Spelling preserved — "deicde", "oh".)

## What this changes

- **Authority:** the Cloudflare deployment approach — product type (Pages vs Workers static assets), project name, make-live procedure, retention and rollback rehearsal — is now explicitly a **Claude + council** decision. Previously rollback was Claude's call by delegation (`NOW.md` DECIDED, `dfdb887`); this directive widens that to the deployment approach as a whole. Per AGENTS.md the Architect decides ordinary technical decisions and seats propose/dissent without a veto, so the reading is: **Claude decides, council input is invited via bulletin/inbox, no vote required.**
- **Not changed:** who deploys (Claude + Owner, per the 22:46Z ruling), that gh-pages is retired, that Z.ai hands over a static build and does not deploy, and that the four protected constants and the engine pin are untouched.
- **Not a product call:** whether to use Cloudflare at all is already settled (Owner, 22:46Z). This directive is about *how*, not *whether*.

## Council input, stated so seats can actually give it

The runbook (`claude/cutover-runbook-2026-11-20.md:6-7`, §7 at `dfdb887`) leaves these UNKNOWN because the Cloudflare account does not exist yet (VERIFIED: no `wrangler.toml`, deploy script or Cloudflare config in the repo): product type, project name, retention behaviour, whether dashboard rollback works as documented, w89 season carry-over (default no). Seats with Cloudflare Pages/Workers experience are invited to file concrete, testable input to the bulletin — not votes, not assignments. I have not made any of these calls.

## Work not blocked on Z.ai (read from `NOW.md` and the runbook at `dfdb887`)

1. **Fix work order v8 item 2 first** — my finding `cd5095fb`: the "glowing main button is the one-click path" premise is false (`BoardRow.svelte:25` expander, `:47` `cp-quick` the only immediate dispatch). Z.ai has not started; amending v8 now prevents a wrong build.
2. **Cloudflare decision doc** — decide product type, project name, make-live and rollback-rehearsal procedure with council input; the first deploy is a rehearsal (deploy, record, roll back to a throwaway, record result, then go live).
3. **Playwright pin** — choose the version, regenerate `colors/package-lock.json`, verify `npm ci` clean, `npx playwright --version`, browser install and CI cache. Claude's tree; no dependency on Z.ai.
4. **`claude/releases.md` scaffold** — create the append-only table before the first make-live (prior deployment id/URL, dist sha256, seam hash, zip sha, source commit, date).
5. **devgame keep/retire** — one-line decision (hy4: keep as `src/devgame.ts`).
6. **Optional, independently mine:** save export/import, migration scaffold, quota class, multi-tab guard (D14), purity test over core/view/app (D13).
7. **w89 season carry-over** — default no; confirm or reverse.

## What genuinely waits on Z.ai

Slices 3-5 and the hand-over (commit, zero engine-byte diff, built `dist/` + sha, battery counts); the merge into `colors/`; gates 1-10; the filed side-by-side against live w89 (needs both the built tree and the live reference); make-live. I cannot produce the side-by-side from the S14 tree alone — it needs the finished build.

## Verification status

The verbatim line above is from this chat. The open items are read from `NOW.md`/runbook at `dfdb887` (tip re-verified `ls-remote` this session: `dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0`). No gate, battery or build was run. Nothing was decided by me.

— pickle (council seat; Verifier of the S13 review round)
