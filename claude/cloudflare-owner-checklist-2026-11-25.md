# Cloudflare setup: your checklist (Owner)

Written 27 Nov 2026 (T5). **Nothing has been created, connected or deployed.** Labels: V checked here, R reported, I inferred, U unknown.
Local results behind this: `claude/cloudflare-local-rehearsal-2026-11-27.md`.

**Rules for every step:** never paste a password, secret or token into a chat, a file or a commit. When you paste command output back to me, delete any line showing an account ID or your email.

## Part A. Any time (web browser; publishes nothing)

1. **Cloudflare account.** Sign up at `dash.cloudflare.com/sign-up`, free plan, verify the email. Turn on two-factor sign-in.
2. **Address.** In *Workers & Pages*, set your `workers.dev` subdomain to `76pancakes`. If it is taken, pick the closest free one. The site will be `https://play.<subdomain>.workers.dev`.
   **Send me:** the subdomain, spelled exactly.
3. **GitHub sign-in app** (needs step 2). `github.com/settings/developers` → *OAuth Apps* → *New OAuth App*:
   - Application name: `76 Pancakes`
   - Homepage URL: `https://play.<subdomain>.workers.dev`
   - Authorization callback URL: `https://play.<subdomain>.workers.dev/api/auth/callback/github`

   Register it and stop there. You copy its two values in step 10. **Send me:** "done".

Dashboard menu names may differ slightly from the ones above (U).

## Part B. Saying "go"

Write **"go: rehearsal"** in chat. That covers a trial deploy only; the launch needs a separate **"go: make live"**. I record each in `claude/rulings/` the same day.

Before you agree, two facts about the rehearsal:
- Its address is public to anyone who knows it, **including the player data file** `/dataset/nfl.json`.
- It runs the colors build, whose page title still says `20-0` and which has **no sign-in button** (V). Before step 5, I add a temporary check page with the button and automatic save tests, used only in the rehearsal.

## Part C. Commands (on your computer)

Needed: Git, the current Node 22 (22.18 or newer), and a copy of the private repo. Run from the repo folder, one line at a time. The build and data lines in step 6 were dry-run here (V); `git pull` and `npm ci` were not, and no Cloudflare command has been run against a real account (U).

4. ```
   git switch architect/engine-and-seats
   git pull
   cd server
   npm ci
   npx wrangler@4.168.0 login
   ```
5. ```
   npx wrangler@4.168.0 d1 create play
   ```
   If it offers to edit a config file for you, answer no. **Send me:** the `database_id` it prints (not a secret).
   I then put it and your address into `server/wrangler.jsonc`, switch on the per-user rate limit there, write the `claude/releases.md` row, and push.
6. Build the site and put the player data beside it. The data goes through a folder outside the repo, and the site is deployed from `server/dist` (never committed):
   ```
   cd ..
   git pull
   cd colors
   npm ci
   npm run build
   cd ..
   node -e "const fs=require('fs');fs.rmSync('server/dist',{recursive:true,force:true});fs.cpSync('colors/dist','server/dist',{recursive:true})"
   node -e "const fs=require('fs');fs.mkdirSync('../pancakes-data',{recursive:true});for(const f of ['madden27-ratings','free-agents-old-ratings','player-ids'])fs.copyFileSync('data/nfl/'+f+'.csv','../pancakes-data/'+f+'.csv')"
   node tools/release-assemble.mjs --dist server/dist --dataset ../pancakes-data --log ../pancakes-data/dataset-log.md
   ```
   **Send me:** the output of the last command (file fingerprints only, no player data).
7. ```
   cd server
   npx wrangler@4.168.0 d1 migrations apply play --remote
   ```
8. ```
   npx wrangler@4.168.0 deploy
   ```
   If it refuses because of `ratelimits`, send me the message; I take that line out and you run it again. **Send me:** the address and version ID it prints.
9. Make the session secret. Copy the line this prints, paste it only at the prompt in step 10, and store it nowhere else (a new one later signs everyone out):
   ```
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
10. Each command asks for one value. In your GitHub app, copy the *Client ID* and use *Generate a new client secret*.
    ```
    npx wrangler@4.168.0 secret put BETTER_AUTH_SECRET
    npx wrangler@4.168.0 secret put GITHUB_CLIENT_ID
    npx wrangler@4.168.0 secret put GITHUB_CLIENT_SECRET
    ```

I probably cannot run these for you: this cloud workspace has no Cloudflare login and its network is limited (I; not tested, because nothing may connect to Cloudflare before "go").

## Part D. Checks after the deploy (together)

| # | Check | Pass |
|---|---|---|
| 1 | `/api/health` | shows `"ok":true` |
| 2 | `/dataset/nfl.json` | shows data text, **not the game page**. Locally a missing file is answered with the game page, so a skipped step 6 can look like success |
| 3 | The site on your phone | the game loads and plays |
| 4 | Check page: sign in with GitHub, save, open on a second device | the save arrives |
| 5 | Dashboard → the `play` Worker → *Metrics* | CPU time and the "Exceeded CPU Time Limits" error count. **This is the open risk** (below) |
| 6 | Deploy a second throwaway build, then `npx wrangler@4.168.0 rollback` | record what the dashboard and a tab left open did |

## The open risk: processor time

The free plan allows **10 ms of processor time per request** (V, [Cloudflare limits](https://developers.cloudflare.com/workers/platform/limits/)). On this test machine a save of about 90K characters costs about 10 ms to upload, and one near the 256 KB maximum about 12 to 18 ms (V, local; Cloudflare's machines differ, so U). Cloudflare tolerates occasional overruns but stops a Worker that overruns consistently (V, same page). Only check 5 can answer this.

If it fails: (a) I cut more, mainly by having the server store a save without opening it, which changes the sync contract; or (b) the paid plan, minimum $5 a month ([pricing](https://developers.cloudflare.com/workers/platform/pricing/)). (b) breaks your "free now and always" rule, so only you can choose it.

## Not ready for launch yet (not needed for the rehearsal)

- The game has no sign-in or sync screens; Z.ai wires them after the merge.
- The contract says `/api/health` should report a database that is behind the code. Not built (V).
- Google sign-in is not set up. GitHub only.
